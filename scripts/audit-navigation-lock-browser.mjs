// ============================================================
// Real-Chromium visual & bounding-box verification for the global
// "التالي" vs "قفل الموقع" navigation fix across lessons and viewports.
//
// Viewports verified:
//   - 1440×900 (desktop)
//   - 1280×800 (laptop)
//   - 768×900  (tablet)
//   - 375×812  (375px mobile width)
//
// Representative lessons verified across architectural generations:
//   - Lesson 33 (LessonStepNav shared bar — previously overlapped at bottom-left)
//   - Lesson 32 (LessonStepNav shared bar — previously used bottom: 4.75rem hack)
//   - Lesson 31 (legacy pill nav — previously overlapped at 375px mobile)
//   - Lesson 1  (earliest shared pill nav generation)
//   - Lesson 2  (footer nav generation)
//   - Lesson 44 (latest studio stepNav44 generation)
//
// Also verifies:
//   - RTL and LTR direction switching in real browser layout
//   - Long Arabic + English button labels in real browser layout (wrapping without overlap)
//   - Clicking "التالي" advances the lesson step
//   - Clicking "قفل الموقع" locks the site and returns to the password screen
// ============================================================
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.nav-fix-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(
    `${work}/al2023.tar`,
    brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")),
  );
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const browser = await playwright.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true,
});

const outDir = "docs/navigation-fix-visual";
const l33Dir = "docs/lesson33-visual";
mkdirSync(outDir, { recursive: true });
mkdirSync(l33Dir, { recursive: true });

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173/English-Course/";

const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x900", width: 768, height: 900 },
  { name: "375x812", width: 375, height: 812 },
];

const LESSONS = [
  { lesson: 33, hash: "#/lesson/33", waitSelector: ".lesson33", stepAdvanceFirst: false },
  { lesson: 32, hash: "#/lesson/32", waitSelector: ".lesson32", stepAdvanceFirst: false },
  { lesson: 31, hash: "#/lesson/31", waitSelector: ".lesson31", stepAdvanceFirst: false },
  { lesson: 1, hash: "#/lesson/1", waitSelector: "#l1-main, main", stepAdvanceFirst: false },
  { lesson: 2, hash: "#/lesson/2", waitSelector: "footer", stepAdvanceFirst: false },
  { lesson: 44, hash: "#/lesson/44", waitSelector: ".lesson44 .stepNav44", stepAdvanceFirst: true },
];

let checks = 0;
const failures = [];
const measurements = [];
const edgeCases = [];
const interactions = {};

function ok(condition, message) {
  checks++;
  if (!condition) failures.push(message);
}

function computeOverlap(a, b) {
  const xOverlap = Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x));
  const yOverlap = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));
  return Number((xOverlap * yOverlap).toFixed(2));
}

function computeGap(a, b) {
  const dx = Math.max(0, Math.max(a.x - b.right, b.x - a.right));
  const dy = Math.max(0, Math.max(a.y - b.bottom, b.y - a.bottom));
  return { horizontalGap: Math.round(dx), verticalGap: Math.round(dy) };
}

const page = await browser.newPage({ viewport: VIEWPORTS[0], reducedMotion: "reduce" });
const consoleErrors = [];
page.on("pageerror", (e) => consoleErrors.push(e.message));
page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const url = msg.location().url || "";
  if (/fonts\.(googleapis|gstatic)\.com/.test(url)) return;
  consoleErrors.push(`${msg.text()} ${url}`);
});
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));

async function measureControls(lesson, vp, labelSuffix = "") {
  const data = await page.evaluate(() => {
    const isVisible = (el) => {
      if (!el) return false;
      const st = getComputedStyle(el);
      if (st.display === "none" || st.visibility === "hidden" || parseFloat(st.opacity) === 0) return false;
      return el.getClientRects().length > 0;
    };

    const lockBtns = [...document.querySelectorAll("button")].filter(
      (b) => isVisible(b) && ((b.textContent || "").includes("قفل الموقع") || b.getAttribute("aria-label") === "قفل الموقع"),
    );
    const nextBtns = [...document.querySelectorAll("button")].filter((b) => {
      if (!isVisible(b)) return false;
      const txt = (b.textContent || "").replace(/\s+/g, " ").trim();
      if (txt.includes("السابق") || txt.includes("الدرس التالي")) return false;
      return txt.includes("التالي") || txt.includes("الخطوة التالية") || b.getAttribute("data-step-nav") === "next";
    });

    const nextBtn = nextBtns[nextBtns.length - 1] || null;
    const lockBtn = lockBtns[0] || null;

    if (nextBtn) {
      nextBtn.scrollIntoView({ block: "nearest", inline: "nearest" });
    }

    const rectOf = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const st = getComputedStyle(el);
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        width: Math.round(r.width),
        height: Math.round(r.height),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom),
        position: st.position,
        text: (el.textContent || "").replace(/\s+/g, " ").trim(),
      };
    };

    const nextBox = rectOf(nextBtn);
    const lockBox = rectOf(lockBtn);

    // Hit-test center of each button to confirm neither is occluded by another control
    const checkHit = (el, box) => {
      if (!el || !box) return false;
      const cx = Math.min(window.innerWidth - 1, Math.max(1, box.x + box.width / 2));
      const cy = Math.min(window.innerHeight - 1, Math.max(1, box.y + box.height / 2));
      const topEl = document.elementFromPoint(cx, cy);
      return !!topEl && (topEl === el || el.contains(topEl) || topEl.contains(el));
    };

    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientHeight: window.innerHeight,
      lockCount: lockBtns.length,
      nextBox,
      lockBox,
      nextClickableAtCenter: checkHit(nextBtn, nextBox),
      lockClickableAtCenter: checkHit(lockBtn, lockBox),
      sharedHost:
        !!nextBtn &&
        !!lockBtn &&
        (nextBtn.closest("[data-lesson-step-nav], [data-site-lock-host], nav, footer") ===
          lockBtn.closest("[data-lesson-step-nav], [data-site-lock-host], nav, footer")),
    };
  });

  ok(data.lockCount === 1, `L${lesson} @ ${vp.name}${labelSuffix}: exactly 1 visible "قفل الموقع" button (got ${data.lockCount})`);
  ok(!!data.nextBox, `L${lesson} @ ${vp.name}${labelSuffix}: "التالي" button is rendered and visible`);
  ok(!!data.lockBox, `L${lesson} @ ${vp.name}${labelSuffix}: "قفل الموقع" button is rendered and visible`);
  ok(data.sharedHost, `L${lesson} @ ${vp.name}${labelSuffix}: "التالي" and "قفل الموقع" share the normal-flow navigation container`);
  ok(data.scrollWidth <= data.clientWidth, `L${lesson} @ ${vp.name}${labelSuffix}: no horizontal overflow (${data.scrollWidth} <= ${data.clientWidth})`);

  if (data.nextBox && data.lockBox) {
    const overlap = computeOverlap(data.nextBox, data.lockBox);
    const gap = computeGap(data.nextBox, data.lockBox);
    ok(overlap === 0, `L${lesson} @ ${vp.name}${labelSuffix}: zero bounding-box overlap (overlap=${overlap})`);
    ok(
      data.nextBox.width > 0 &&
        data.nextBox.height > 0 &&
        data.nextBox.x >= 0 &&
        data.nextBox.right <= data.clientWidth + 1 &&
        data.nextBox.y >= 0 &&
        data.nextBox.bottom <= data.clientHeight + 1,
      `L${lesson} @ ${vp.name}${labelSuffix}: "التالي" fully within viewport (${JSON.stringify(data.nextBox)})`,
    );
    ok(
      data.lockBox.width > 0 &&
        data.lockBox.height > 0 &&
        data.lockBox.x >= 0 &&
        data.lockBox.right <= data.clientWidth + 1 &&
        data.lockBox.y >= 0 &&
        data.lockBox.bottom <= data.clientHeight + 1,
      `L${lesson} @ ${vp.name}${labelSuffix}: "قفل الموقع" fully within viewport (${JSON.stringify(data.lockBox)})`,
    );
    ok(data.nextClickableAtCenter, `L${lesson} @ ${vp.name}${labelSuffix}: "التالي" is unobstructed at its center point`);
    ok(data.lockClickableAtCenter, `L${lesson} @ ${vp.name}${labelSuffix}: "قفل الموقع" is unobstructed at its center point`);
    ok(data.lockBox.position !== "fixed" && data.nextBox.position !== "fixed", `L${lesson} @ ${vp.name}${labelSuffix}: neither button uses position:fixed`);

    return {
      lesson,
      viewport: vp.name,
      labelSuffix,
      clientWidth: data.clientWidth,
      scrollWidth: data.scrollWidth,
      nextBox: data.nextBox,
      lockBox: data.lockBox,
      overlap,
      ...gap,
      nextClickableAtCenter: data.nextClickableAtCenter,
      lockClickableAtCenter: data.lockClickableAtCenter,
    };
  }
  return null;
}

try {
  for (const item of LESSONS) {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${baseUrl}${item.hash}`, { waitUntil: "domcontentloaded" });
      await page.locator(item.waitSelector).first().waitFor({ timeout: 20000 });
      await page.waitForTimeout(150);

      if (item.stepAdvanceFirst) {
        // On Lesson 44 step 1 ("01 أهداف الدرس"), the step nav is near the bottom of the viewport
        const startBtn = page.locator(".lesson44 .heroActions44 button").first();
        if ((await startBtn.count()) > 0 && (await startBtn.isVisible())) {
          await startBtn.click();
          await page.waitForTimeout(120);
        }
      }

      const m = await measureControls(item.lesson, vp);
      const shotPath = `${outDir}/lesson${item.lesson}-${vp.name}.png`;
      await page.screenshot({ path: shotPath, fullPage: false, animations: "disabled" });
      if (m) {
        m.screenshot = shotPath;
        measurements.push(m);
      }

      // Update docs/lesson33-visual/ cover screenshots as well
      if (item.lesson === 33) {
        const l33Map = {
          "1440x900": `${l33Dir}/01-cover-1440.png`,
          "1280x800": `${l33Dir}/02-cover-1280.png`,
          "768x900": `${l33Dir}/03-cover-768.png`,
        };
        if (l33Map[vp.name]) {
          await page.screenshot({ path: l33Map[vp.name], fullPage: false, animations: "disabled" });
        }
      }
    }
  }

  // ---------------- Edge cases: LTR direction + Long labels at 375px and 1280px ----------------
  for (const vp of [VIEWPORTS[1], VIEWPORTS[3]]) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${baseUrl}#/lesson/33`, { waitUntil: "domcontentloaded" });
    await page.locator(".lesson33").waitFor();
    await page.waitForTimeout(120);

    // 1. Switch navigation bar to LTR with English labels
    await page.evaluate(() => {
      const nav = document.querySelector("[data-lesson-step-nav='true']");
      if (nav) nav.setAttribute("dir", "ltr");
      const prev = document.querySelector("[data-step-nav='prev']");
      const next = document.querySelector("[data-step-nav='next']");
      const lock = document.querySelector("[data-site-lock-button='true']");
      if (prev) prev.textContent = "← Previous Step";
      if (next) next.textContent = "Continue to Next Step →";
      if (lock) lock.textContent = "🔒 Lock Course Site";
    });
    await page.waitForTimeout(80);
    const ltrResult = await measureControls(33, vp, "-ltr");
    if (ltrResult) edgeCases.push(ltrResult);

    // 2. Restore RTL and inject very long Arabic + English labels to verify safe wrapping without overlap
    await page.evaluate(() => {
      const nav = document.querySelector("[data-lesson-step-nav='true']");
      if (nav) nav.setAttribute("dir", "rtl");
      const prev = document.querySelector("[data-step-nav='prev']");
      const next = document.querySelector("[data-step-nav='next']");
      const lock = document.querySelector("[data-site-lock-button='true']");
      if (prev) prev.textContent = "→ الانتقال إلى الخطوة السابقة في مراجعة الأزمنة";
      if (next) next.textContent = "الانتقال إلى الخطوة التالية: Present Perfect Continuous ←";
      if (lock) lock.textContent = "🔒 قفل الموقع والعودة إلى شاشة الحماية";
    });
    await page.waitForTimeout(80);
    const longResult = await measureControls(33, vp, "-long-labels");
    if (longResult) {
      const shotPath = `${outDir}/lesson33-${vp.name}-long-labels.png`;
      await page.screenshot({ path: shotPath, fullPage: false, animations: "disabled" });
      longResult.screenshot = shotPath;
      edgeCases.push(longResult);
    }
  }

  // ---------------- Interactive behavior verification in real browser ----------------
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${baseUrl}#/lesson/33`, { waitUntil: "domcontentloaded" });
  await page.locator(".lesson33").waitFor();
  await page.waitForTimeout(120);

  const stepBefore = await page.locator(".l33-chip").first().textContent();
  await page.locator(".l33-fab-next").click();
  await page.waitForTimeout(100);
  const stepAfter = await page.locator(".l33-chip").first().textContent();
  ok(
    stepBefore?.includes("1") && stepAfter?.includes("2"),
    `interaction: clicking "التالي ←" advances Lesson 33 from step 1 to step 2 ("${stepBefore}" -> "${stepAfter}")`,
  );
  interactions.nextStep = { before: stepBefore, after: stepAfter };

  // Click "قفل الموقع" and verify the password gate screen renders and storage is cleared
  await page.locator("[data-site-lock-button='true']").click();
  await page.locator("#site-gate-title").waitFor({ timeout: 10000 });
  const gateTitle = (await page.locator("#site-gate-title").textContent())?.trim();
  const storageAfterLock = await page.evaluate(() => localStorage.getItem("englishwithsomer-site-unlocked"));
  ok(gateTitle === "الموقع محمي", `interaction: clicking "قفل الموقع" shows the lock screen ("${gateTitle}")`);
  ok(storageAfterLock === null, `interaction: clicking "قفل الموقع" clears unlock storage (got ${storageAfterLock})`);
  interactions.lockSite = { gateTitle, storageAfterLock };

  ok(consoleErrors.length === 0, `no console or page errors (${consoleErrors.join(" | ")})`);
} finally {
  const report = {
    browser: await browser.version(),
    baseUrl,
    viewports: VIEWPORTS,
    checks,
    failures,
    consoleErrors,
    measurements,
    edgeCases,
    interactions,
  };
  writeFileSync(`${outDir}/verification.json`, `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
}

console.log(`Navigation vs Lock-Site Browser Verification: ${checks} checks, ${failures.length} failures.`);
if (failures.length) {
  for (const f of failures) console.error(` ✕ ${f}`);
  process.exit(1);
}
