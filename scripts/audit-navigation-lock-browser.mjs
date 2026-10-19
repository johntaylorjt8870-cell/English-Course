// ============================================================
// Real-Chromium visual, bounding-box, tab-lifecycle, and mobile-drawer
// verification for the global "التالي" vs "قفل الموقع" navigation fix.
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
//   - Lessons 34 & 35 (mobile fixed step-drawer clearance at 768×900 & 375×812)
//   - Lessons 31, 32, 33, 35, 36, 37, 38, 39, 41, 44 (multi-tab transitions across
//     student/lesson, test, solutions, and teacher views)
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
const drawerClearance = [];
const tabTransitions = [];
const edgeCases = [];
const interactions = {};

function ok(condition, message) {
  checks++;
  if (!condition) failures.push(message);
}

function computeOverlap(a, b) {
  if (!a || !b) return 0;
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

async function measureControls(lesson, vp, activeTab = "student", labelSuffix = "") {
  const data = await page.evaluate(() => {
    const isVisible = (el) => {
      if (!el) return false;
      let cur = el;
      while (cur) {
        if (cur.hidden || cur.getAttribute("aria-hidden") === "true") return false;
        const st = getComputedStyle(cur);
        if (st.display === "none" || st.visibility === "hidden" || parseFloat(st.opacity) === 0) return false;
        cur = cur.parentElement;
      }
      return el.getClientRects().length > 0;
    };

    const allLockBtns = [...document.querySelectorAll("[data-site-lock-button='true']")];
    const lockBtns = allLockBtns.filter(isVisible);
    const nextBtns = [...document.querySelectorAll("button")].filter((b) => {
      if (!isVisible(b)) return false;
      const txt = (b.textContent || "").replace(/\s+/g, " ").trim();
      if (txt.includes("السابق") || txt.includes("الدرس التالي")) return false;
      return txt.includes("التالي") || txt.includes("الخطوة التالية") || b.getAttribute("data-step-nav") === "next";
    });

    const nextBtn = nextBtns[nextBtns.length - 1] || null;
    const lockBtn = lockBtns[0] || null;
    const navContainer =
      (nextBtn && nextBtn.closest("footer, nav, [data-lesson-step-nav], [data-site-lock-host]")) ||
      nextBtn;

    if (navContainer) {
      navContainer.scrollIntoView({ block: "nearest", inline: "nearest" });
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
      totalLockCount: allLockBtns.length,
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

  const ctx = `L${lesson} @ ${vp.name} [tab=${activeTab}]${labelSuffix}`;
  ok(data.totalLockCount === 1 && data.lockCount === 1, `${ctx}: exactly 1 visible "قفل الموقع" button (visible=${data.lockCount}, total=${data.totalLockCount})`);
  ok(!!data.nextBox, `${ctx}: "التالي" button is rendered and visible`);
  ok(!!data.lockBox, `${ctx}: "قفل الموقع" button is rendered and visible`);
  ok(data.sharedHost, `${ctx}: "التالي" and "قفل الموقع" share the normal-flow navigation container`);
  ok(data.scrollWidth <= data.clientWidth, `${ctx}: no horizontal overflow (${data.scrollWidth} <= ${data.clientWidth})`);

  if (data.nextBox && data.lockBox) {
    const overlap = computeOverlap(data.nextBox, data.lockBox);
    const gap = computeGap(data.nextBox, data.lockBox);
    ok(overlap === 0, `${ctx}: zero bounding-box overlap (overlap=${overlap})`);
    ok(
      data.nextBox.width > 0 &&
        data.nextBox.height > 0 &&
        data.nextBox.x >= 0 &&
        data.nextBox.right <= data.clientWidth + 1 &&
        data.nextBox.y >= 0 &&
        data.nextBox.bottom <= data.clientHeight + 1,
      `${ctx}: "التالي" fully within viewport (${JSON.stringify(data.nextBox)})`,
    );
    ok(
      data.lockBox.width > 0 &&
        data.lockBox.height > 0 &&
        data.lockBox.x >= 0 &&
        data.lockBox.right <= data.clientWidth + 1 &&
        data.lockBox.y >= 0 &&
        data.lockBox.bottom <= data.clientHeight + 1,
      `${ctx}: "قفل الموقع" fully within viewport (${JSON.stringify(data.lockBox)})`,
    );
    ok(data.nextClickableAtCenter, `${ctx}: "التالي" is unobstructed at its center point`);
    ok(data.lockClickableAtCenter, `${ctx}: "قفل الموقع" is unobstructed at its center point`);
    ok(data.lockBox.position !== "fixed" && data.nextBox.position !== "fixed", `${ctx}: neither button uses position:fixed`);

    return {
      lesson,
      viewport: vp.name,
      activeTab,
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
  // ---------------- 1. Multi-viewport geometry across representative lessons ----------------
  for (const item of LESSONS) {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${baseUrl}${item.hash}`, { waitUntil: "domcontentloaded" });
      await page.locator(item.waitSelector).first().waitFor({ timeout: 20000 });
      await page.waitForTimeout(150);

      if (item.stepAdvanceFirst) {
        const startBtn = page.locator(".lesson44 .heroActions44 button").first();
        if ((await startBtn.count()) > 0 && (await startBtn.isVisible())) {
          await startBtn.click();
          await page.waitForTimeout(120);
        }
      }

      const m = await measureControls(item.lesson, vp, "student");
      const shotPath = `${outDir}/lesson${item.lesson}-${vp.name}.png`;
      await page.screenshot({ path: shotPath, fullPage: false, animations: "disabled" });
      if (m) {
        m.screenshot = shotPath;
        measurements.push(m);
      }

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

  // ---------------- 2. Lessons 34 & 35 mobile/tablet drawer clearance after scrolling to bottom ----------------
  for (const lesson of [34, 35]) {
    for (const vp of [VIEWPORTS[2], VIEWPORTS[3]]) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${baseUrl}#/lesson/${lesson}`, { waitUntil: "domcontentloaded" });
      await page.locator(`[data-lesson="${lesson}"]`).first().waitFor({ timeout: 20000 });
      await page.waitForTimeout(350);

      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
      await page.waitForTimeout(100);

      const dData = await page.evaluate(() => {
        const isVisible = (el) => {
          if (!el) return false;
          let cur = el;
          while (cur) {
            if (cur.hidden || cur.getAttribute("aria-hidden") === "true") return false;
            const st = getComputedStyle(cur);
            if (st.display === "none" || st.visibility === "hidden" || parseFloat(st.opacity) === 0) return false;
            cur = cur.parentElement;
          }
          return el.getClientRects().length > 0;
        };

        const rectOf = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            x: Math.round(r.x),
            y: Math.round(r.y),
            width: Math.round(r.width),
            height: Math.round(r.height),
            right: Math.round(r.right),
            bottom: Math.round(r.bottom),
            text: (el.textContent || "").replace(/\s+/g, " ").trim(),
          };
        };

        const checkHit = (el, box) => {
          if (!el || !box) return false;
          const cx = Math.min(window.innerWidth - 1, Math.max(1, box.x + box.width / 2));
          const cy = Math.min(window.innerHeight - 1, Math.max(1, box.y + box.height / 2));
          const topEl = document.elementFromPoint(cx, cy);
          return !!topEl && (topEl === el || el.contains(topEl) || topEl.contains(el));
        };

        const drawerBtn = document.querySelector("div.fixed.bottom-3.left-3 button");
        const lockBtns = [...document.querySelectorAll("[data-site-lock-button='true']")].filter(isVisible);
        const lockBtn = lockBtns[0] || null;
        const nextBtn = [...document.querySelectorAll("button")].filter(
          (b) => isVisible(b) && (b.textContent || "").includes("التالي ←"),
        )[0] || null;

        const drawerBox = rectOf(drawerBtn);
        const lockBox = rectOf(lockBtn);
        const nextBox = rectOf(nextBtn);

        return {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          clientHeight: window.innerHeight,
          visibleLockCount: lockBtns.length,
          drawerVisible: isVisible(drawerBtn),
          drawerBox,
          lockBox,
          nextBox,
          drawerClickable: checkHit(drawerBtn, drawerBox),
          lockClickable: checkHit(lockBtn, lockBox),
          nextClickable: checkHit(nextBtn, nextBox),
        };
      });

      const ctx = `L${lesson} @ ${vp.name} [tab=lesson, scrolled-bottom]`;
      const drawerLockOverlap = computeOverlap(dData.drawerBox, dData.lockBox);
      const drawerNextOverlap = computeOverlap(dData.drawerBox, dData.nextBox);
      const lockNextOverlap = computeOverlap(dData.lockBox, dData.nextBox);
      const verticalClearancePx =
        dData.drawerBox && dData.lockBox
          ? dData.drawerBox.y - Math.max(dData.lockBox.bottom, dData.nextBox ? dData.nextBox.bottom : 0)
          : null;

      ok(dData.visibleLockCount === 1, `${ctx}: exactly 1 visible lock button (got ${dData.visibleLockCount})`);
      ok(dData.drawerVisible && !!dData.drawerBox, `${ctx}: mobile step-drawer button is visible`);
      ok(!!dData.lockBox && !!dData.nextBox, `${ctx}: both Next and Lock buttons are visible at bottom of lesson`);
      ok(drawerLockOverlap === 0, `${ctx}: zero overlap between mobile drawer button and "قفل الموقع" (overlap=${drawerLockOverlap})`);
      ok(drawerNextOverlap === 0, `${ctx}: zero overlap between mobile drawer button and "التالي ←" (overlap=${drawerNextOverlap})`);
      ok(lockNextOverlap === 0, `${ctx}: zero overlap between "قفل الموقع" and "التالي ←" (overlap=${lockNextOverlap})`);
      ok(dData.drawerClickable, `${ctx}: mobile drawer button is clickable at its center`);
      ok(dData.lockClickable, `${ctx}: "قفل الموقع" is clickable at its center`);
      ok(dData.nextClickable, `${ctx}: "التالي ←" is clickable at its center`);
      ok(dData.scrollWidth <= dData.clientWidth, `${ctx}: no horizontal overflow (${dData.scrollWidth} <= ${dData.clientWidth})`);

      const shotPath = `${outDir}/lesson${lesson}-${vp.name}-bottom.png`;
      await page.screenshot({ path: shotPath, fullPage: false, animations: "disabled" });

      drawerClearance.push({
        lesson,
        viewport: vp.name,
        activeTab: "lesson",
        drawerBox: dData.drawerBox,
        lockBox: dData.lockBox,
        nextBox: dData.nextBox,
        drawerLockOverlap,
        drawerNextOverlap,
        lockNextOverlap,
        verticalClearancePx,
        screenshot: shotPath,
      });
    }
  }

  // ---------------- 3. Multi-tab transitions across Lessons 31, 32, 33, 35–39, 41, 44 ----------------
  const TAB_SCENARIOS = [
    { lesson: 31, tabs: ["منطقة الاختبارات", "حلول الاختبارات", "منطقة المعلم", "الدرس"] },
    { lesson: 32, tabs: ["منطقة الاختبار", "حلول الاختبار", "منطقة المعلم", "الدرس"] },
    { lesson: 33, tabs: ["منطقة الاختبار", "منطقة الحلول", "منطقة المعلم", "خطوات الدرس"] },
    { lesson: 34, tabs: ["منطقة الاختبار", "منطقة الحلول", "منطقة المعلم", "خطوات الدرس"] },
    { lesson: 35, tabs: ["منطقة الاختبار", "منطقة الحلول", "منطقة المعلم", "خطوات الدرس"] },
    { lesson: 36, tabs: ["منطقة الاختبار", "منطقة المعلم", "منطقة الطالب"] },
    { lesson: 37, tabs: ["منطقة الاختبار", "منطقة المعلم", "منطقة الطالب"] },
    { lesson: 38, tabs: ["منطقة الاختبار", "منطقة المعلم", "منطقة الطالب"] },
    { lesson: 39, tabs: ["منطقة الاختبار", "منطقة المعلم", "منطقة الطالب"] },
    { lesson: 40, tabs: ["منطقة الاختبار", "مساحة المعلم", "منطقة الطالب"] },
    { lesson: 41, tabs: ["الاختبار", "المعلم", "التعلّم"] },
    { lesson: 44, tabs: ["الاختبار", "المعلم", "التعلّم"] },
  ];

  await page.setViewportSize({ width: 1280, height: 800 });
  for (const scenario of TAB_SCENARIOS) {
    await page.goto(`${baseUrl}#/lesson/${scenario.lesson}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(220);

    for (const tabLabel of scenario.tabs) {
      const tabBtn = page.locator("button").filter({ hasText: tabLabel }).first();
      await tabBtn.waitFor({ timeout: 10000 });
      await tabBtn.click();
      await page.waitForTimeout(100);

      const state = await page.evaluate(() => {
        const isVisible = (el) => {
          if (!el) return false;
          let cur = el;
          while (cur) {
            if (cur.hidden || cur.getAttribute("aria-hidden") === "true") return false;
            const st = getComputedStyle(cur);
            if (st.display === "none" || st.visibility === "hidden" || parseFloat(st.opacity) === 0) return false;
            cur = cur.parentElement;
          }
          return el.getClientRects().length > 0;
        };

        const allLocks = [...document.querySelectorAll("[data-site-lock-button='true']")];
        const visLocks = allLocks.filter(isVisible);
        const lockBtn = visLocks[0] || null;
        if (lockBtn) lockBtn.scrollIntoView({ block: "nearest", inline: "nearest" });
        const r = lockBtn ? lockBtn.getBoundingClientRect() : null;
        const hiddenHosts = [...document.querySelectorAll("[data-site-lock-host]")].filter((h) => !isVisible(h));

        return {
          totalLockCount: allLocks.length,
          visibleLockCount: visLocks.length,
          hiddenHostCount: hiddenHosts.length,
          lockBox: r
            ? {
                x: Math.round(r.x),
                y: Math.round(r.y),
                width: Math.round(r.width),
                height: Math.round(r.height),
                right: Math.round(r.right),
                bottom: Math.round(r.bottom),
              }
            : null,
          hostTag: lockBtn?.parentElement?.className || "",
        };
      });

      const ctx = `L${scenario.lesson} @ 1280x800 [tab=${tabLabel}]`;
      ok(
        state.totalLockCount === 1 && state.visibleLockCount === 1,
        `${ctx}: exactly 1 visible "قفل الموقع" button after tab switch (visible=${state.visibleLockCount}, total=${state.totalLockCount})`,
      );
      ok(
        !!state.lockBox && state.lockBox.width > 0 && state.lockBox.height > 0,
        `${ctx}: visible "قفل الموقع" button has non-zero geometry (${JSON.stringify(state.lockBox)})`,
      );
      ok(
        state.hiddenHostCount === 0,
        `${ctx}: no stale [data-site-lock-host] left on hidden containers (got ${state.hiddenHostCount})`,
      );

      tabTransitions.push({
        lesson: scenario.lesson,
        viewport: "1280x800",
        activeTab: tabLabel,
        ...state,
      });
    }
  }

  // ---------------- 4. Edge cases: LTR direction + Long labels at 375px and 1280px ----------------
  for (const vp of [VIEWPORTS[1], VIEWPORTS[3]]) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${baseUrl}#/lesson/33`, { waitUntil: "domcontentloaded" });
    await page.locator(".lesson33").waitFor();
    await page.waitForTimeout(120);

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
    const ltrResult = await measureControls(33, vp, "student", "-ltr");
    if (ltrResult) edgeCases.push(ltrResult);

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
    const longResult = await measureControls(33, vp, "student", "-long-labels");
    if (longResult) {
      const shotPath = `${outDir}/lesson33-${vp.name}-long-labels.png`;
      await page.screenshot({ path: shotPath, fullPage: false, animations: "disabled" });
      longResult.screenshot = shotPath;
      edgeCases.push(longResult);
    }
  }

  // ---------------- 5. Interactive behavior verification in real browser ----------------
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
    drawerClearance,
    tabTransitions,
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
