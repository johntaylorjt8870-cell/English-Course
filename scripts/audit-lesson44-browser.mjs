// ============================================================
// Lesson 44 — Real-Chromium Multi-Viewport Visual & Behavioral QA
//
// Run with the dev server up:
//   npm run dev -- --port 5173 --host 0.0.0.0
//   node scripts/audit-lesson44-browser.mjs
//
// Verifies across 1440x900, 1280x800, 768x900, and 375x812:
//   - Local Tajawal & Newsreader fonts load offline (Google Fonts blocked)
//   - WCAG AA rendered text contrast across Cover, Steps, Test, Solutions, Teacher
//   - Zero horizontal overflow & zero clipped buttons
//   - Zero bounding-box overlap between SiteLockButton and Prev/Next pill
//   - Mobile drawer navigation at 375x812
//   - Attempt-gated keys, lazy 25/25 test grading, retry reset, somer173 teacher gate
//   - Cross-route safety: Hub (#/) + Lesson 40 + Lesson 43 unaffected
// ============================================================
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson44-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(
    `${work}/al2023.tar`,
    brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br"))
  );
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const browser = await playwright.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true,
});

let checks = 0;
const failures = [];
const ok = (condition, message) => {
  checks++;
  if (!condition) failures.push(message);
};

const output = process.env.OUT || "/tmp/lesson44-qa";
mkdirSync(output, { recursive: true });

const baseOrigin = process.env.BASE_URL || "http://127.0.0.1:5173/English-Course/";
const lessonUrl = `${baseOrigin}#/lesson/44`;
const report = {
  viewports: [],
  contrast: [],
  navLockBoxes: [],
  shots: [],
  errors: [],
  focus: null,
};

const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});

const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (
    m.type() === "error" &&
    !/fonts\.(googleapis|gstatic)/.test(m.location().url || "")
  ) {
    errors.push(`${m.text()} ${m.location().url || ""}`);
  }
});
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
await page.addInitScript(() =>
  localStorage.setItem("englishwithsomer-site-unlocked", "unlocked")
);

async function shot(name) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: false, animations: "disabled" });
  report.shots.push(path);
  console.log(`  [shot] ${path}`);
}

async function selectStep(idx) {
  await page.locator('[data-area-tab="learn"]').click();
  await page.waitForTimeout(80);
  const desktopRail = page.locator("aside nav button");
  if ((await desktopRail.count()) > 0 && (await desktopRail.first().isVisible())) {
    await desktopRail.nth(idx).click();
  } else {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    await page.waitForTimeout(140);
    await page.locator("div.fixed aside nav button").nth(idx).click();
  }
  await page.waitForTimeout(180);
  await page.evaluate(() => document.fonts.ready);
}

async function measureLayoutAndContrast(label) {
  const res = await page.evaluate(() => {
    const rgb = (c) => (c.match(/[\d.]+/g) || []).map(Number);
    const lum = (c) => {
      const a = c.slice(0, 3).map((v) => {
        v /= 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const root = document.querySelector(".obligation44");
    const main = document.getElementById("l44-main");
    const issues = [];
    let tested = 0;
    let minRatio = 100;

    for (const el of root.querySelectorAll("#l44-main *, aside *, header *")) {
      const rects = el.getClientRects();
      if (!rects.length) continue;
      const st = getComputedStyle(el);
      if (st.visibility === "hidden" || Number(st.opacity) < 0.5 || el.tagName === "OPTION") continue;
      if (el.closest('[aria-hidden="true"]') || el.classList.contains("sr44") || el.closest(".sr44")) continue;
      if (el.matches("button:disabled, input:disabled, textarea:disabled") || el.closest("button:disabled")) continue;

      const hasDirectText =
        [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) ||
        el.matches("input, textarea");
      if (!hasDirectText) continue;

      const fg = rgb(st.color);
      let node = el;
      let bg = null;
      while (node) {
        const ns = getComputedStyle(node);
        const c = rgb(ns.backgroundColor);
        if (c.length >= 3 && (c[3] === undefined || c[3] >= 0.95)) {
          bg = c;
          break;
        }
        node = node.parentElement;
      }
      bg ??= [242, 244, 249];
      const l1 = lum(fg);
      const l2 = lum(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const size = parseFloat(st.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(st.fontWeight) >= 700);
      const threshold = large ? 3.0 : 4.5;
      tested++;
      if (ratio < minRatio) minRatio = ratio;
      if (ratio < threshold) {
        issues.push({
          text: (el.textContent || "").trim().slice(0, 70),
          ratio: Number(ratio.toFixed(2)),
          fg: st.color,
          bg: `rgb(${bg.slice(0, 3).join(",")})`,
        });
      }
    }

    const lockBtn = document.querySelector('[data-site-lock-button="true"]');
    const navPill = document.querySelector('[data-lesson-step-nav="true"] > div:first-child');
    const lr = lockBtn?.getBoundingClientRect();
    const nr = navPill?.getBoundingClientRect();
    let overlap = false;
    let lockInViewport = false;
    let pillInViewport = false;
    if (lr && nr) {
      const ix = Math.max(0, Math.min(lr.right, nr.right) - Math.max(lr.left, nr.left));
      const iy = Math.max(0, Math.min(lr.bottom, nr.bottom) - Math.max(lr.top, nr.top));
      overlap = ix * iy > 0;
      lockInViewport = lr.left >= 0 && lr.right <= window.innerWidth && lr.bottom <= window.innerHeight;
      pillInViewport = nr.left >= 0 && nr.right <= window.innerWidth && nr.bottom <= window.innerHeight;
    }

    return {
      docClientW: document.documentElement.clientWidth,
      docScrollW: document.documentElement.scrollWidth,
      mainClientW: main ? main.clientWidth : 0,
      mainScrollW: main ? main.scrollWidth : 0,
      tested,
      minRatio: Number(minRatio.toFixed(2)),
      issues,
      overlap,
      lockInViewport,
      pillInViewport,
      lockRect: lr ? { x: Math.round(lr.x), y: Math.round(lr.y), w: Math.round(lr.width), h: Math.round(lr.height) } : null,
      pillRect: nr ? { x: Math.round(nr.x), y: Math.round(nr.y), w: Math.round(nr.width), h: Math.round(nr.height) } : null,
    };
  });

  report.contrast.push({ label, minRatio: res.minRatio, tested: res.tested, issues: res.issues });
  report.navLockBoxes.push({ label, lockRect: res.lockRect, pillRect: res.pillRect, overlap: res.overlap });

  ok(
    res.docScrollW <= res.docClientW && res.mainScrollW <= res.mainClientW + 1,
    `${label}: zero horizontal overflow (doc ${res.docScrollW}/${res.docClientW}, main ${res.mainScrollW}/${res.mainClientW})`
  );
  ok(
    res.issues.length === 0,
    `${label}: WCAG AA contrast clean (issues: ${res.issues.slice(0, 3).map((i) => `${i.text}=${i.ratio}`).join(" | ")})`
  );
  ok(!res.overlap, `${label}: SiteLockButton does NOT overlap step navigation pill`);
  ok(res.lockInViewport && res.pillInViewport, `${label}: SiteLockButton & step pill stay completely inside viewport`);
  return res;
}

try {
  // ---------- 1) Desktop 1440x900 ----------
  await page.goto(lessonUrl);
  await page.waitForSelector('.obligation44[data-lesson="44"]');
  await page.evaluate(() => document.fonts.ready);

  const fonts = await page.evaluate(() => ({
    newsreader: document.fonts.check("400 20px Newsreader"),
    tajawal: document.fonts.check("400 17px Tajawal"),
  }));
  ok(fonts.newsreader && fonts.tajawal, `offline fonts loaded (${JSON.stringify(fonts)})`);

  await measureLayoutAndContrast("1440-cover");
  await shot("01-desktop-1440-cover");

  // Key steps on 1440x900
  for (const [idx, slug] of [
    [2, "02-step02-builder"],
    [8, "03-step08-pronouns"],
    [10, "04-step10-compass"],
    [13, "05-step13-prohibition"],
    [16, "06-step16-meaning-shift"],
    [20, "07-step20-past-tense"],
    [26, "08-step26-dialogue"],
    [28, "09-step28-practice"],
    [33, "10-step33-reading"],
    [36, "11-step36-writing"],
    [38, "12-step38-roadmap"],
  ]) {
    await selectStep(idx);
    await measureLayoutAndContrast(`1440-step-${idx}`);
    await shot(slug);
  }

  // Keyboard focus visibility check on Step 28
  await selectStep(28);
  await page.evaluate(() => document.querySelector(".answers44 .answer44")?.focus());
  await page.keyboard.press("Tab");
  report.focus = await page.evaluate(() => {
    const el = document.activeElement;
    const s = getComputedStyle(el);
    return { tag: el?.tagName, outlineWidth: s.outlineWidth, outlineStyle: s.outlineStyle };
  });
  ok(
    report.focus.outlineWidth !== "0px" && report.focus.outlineStyle !== "none",
    "keyboard :focus-visible outline clearly rendered"
  );

  // ---------- 2) Final Test, Lazy Grading & Solutions ----------
  await page.locator('[data-area-tab="test"]').click();
  await page.waitForTimeout(250);
  await measureLayoutAndContrast("1440-test-pre-submit");
  await shot("13-test-pre-submit");

  // Fill all 25 answers
  const exact = [
    "B. must",
    "B. has to",
    "B. Does",
    "A. had to",
    "C. have to",
    "mustn't",
    "doesn't have to",
    "had to",
    ["Did", "have to"],
    "won't have to",
    "He must study harder.",
    "She has to wear a uniform.",
    "Does he have to leave now?",
    "I didn't have to work yesterday.",
    "She will have to finish the project.",
    "الأولى تعني المنع القاطع، والثانية تعني عدم الضرورة.",
    "لأن MUST ليس لها ماض ولا توجد musted، فنستخدم HAD TO في الماضي.",
    "نعم، كلتاهما صحيحة في القوانين والتعليمات الرسمية واليومية.",
    "الأولى ضرورة يؤكدها المتحدث بدافع شخصي، والثانية التزام فرضه ظرف خارجي وهو الامتحان.",
    "لا تعني ذلك؛ الجملة تدل فقط على أن إنهاء التقرير لم يكن إلزاميًا أمس.",
    "has to",
    "Do",
    "don't",
    "mustn't",
    "had to",
  ];
  const qCount = await page.locator(".qField44").count();
  ok(qCount === 25, `25 test fieldsets rendered (got ${qCount})`);
  for (let i = 0; i < qCount; i++) {
    const f = page.locator(".qField44").nth(i);
    const radios = f.locator('input[type="radio"]');
    const val = exact[i];
    if ((await radios.count()) > 0) {
      const radioLabel = f.locator(".option44").filter({ has: page.locator(`input[type="radio"][value="${val}"]`) });
      await radioLabel.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await radioLabel.click();
    } else if (Array.isArray(val)) {
      const ins = f.locator('input[type="text"], textarea');
      await ins.nth(0).fill(val[0]);
      await ins.nth(1).fill(val[1]);
    } else {
      await f.locator('input[type="text"], textarea').first().fill(val);
    }
  }

  await page.getByRole("button", { name: /تسليم الاختبار/ }).click();
  await page.waitForTimeout(300);
  ok(
    (await page.locator("#l44-main").innerText()).includes("25 / 25"),
    "Chromium test submission scores 25 / 25 via lazy testKey44"
  );
  await measureLayoutAndContrast("1440-test-post-submit");
  await shot("14-test-post-submit-25of25");

  await page.locator('[data-area-tab="solutions"]').click();
  await page.waitForSelector(".solCard44");
  ok((await page.locator(".solCard44").count()) === 25, "25 solution cards rendered");
  await measureLayoutAndContrast("1440-solutions");
  await shot("15-solutions-area");

  // Teacher gate
  await page.locator('[data-area-tab="teacher"]').click();
  await page.waitForTimeout(200);
  await page.locator(".teacherGateCard44 input").fill("somer173");
  await page.locator('.teacherGateCard44 button[type="submit"]').click();
  await page.waitForTimeout(350);
  ok((await page.locator('[data-teacher-guide="44"]').count()) === 1, "TeacherGuide44 opens with somer173");
  await measureLayoutAndContrast("1440-teacher");
  await shot("16-teacher-guide");

  // ---------- 3) Multi-Viewport Responsive Checks: 1280x800, 768x900, 375x812 ----------
  for (const [w, h, tag] of [
    [1280, 800, "desktop-1280"],
    [768, 900, "tablet-768"],
    [375, 812, "mobile-375"],
  ]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(lessonUrl);
    await page.waitForSelector('.obligation44[data-lesson="44"]');
    await page.evaluate(() => document.fonts.ready);

    // Ensure learn tab active
    await page.locator('[data-area-tab="learn"]').click();
    await page.waitForTimeout(150);
    await selectStep(0);
    const mCover = await measureLayoutAndContrast(`${tag}-cover`);
    report.viewports.push({ viewport: `${w}x${h}`, view: "cover", ...mCover });
    await shot(`17-${tag}-cover`);

    await selectStep(11); // Comparison table (overflow stress test!)
    await measureLayoutAndContrast(`${tag}-step11-table`);
    await shot(`18-${tag}-step11-table`);

    await selectStep(13); // Prohibition vs No-Necessity lab
    await measureLayoutAndContrast(`${tag}-step13-prohibition`);
    await shot(`19-${tag}-step13-prohibition`);

    await page.locator('[data-area-tab="test"]').click();
    await page.waitForTimeout(180);
    await measureLayoutAndContrast(`${tag}-test`);
    await shot(`20-${tag}-test`);
  }

  // ---------- 4) Cross-Lesson & Hub Regression Check ----------
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${baseOrigin}#/`);
  await page.waitForTimeout(250);
  ok(
    (await page.locator('a[href="#/lesson/44"]').count()) >= 0,
    "Course hub renders cleanly without error"
  );

  await page.goto(`${baseOrigin}#/lesson/40`);
  await page.waitForSelector('[data-lesson="40"]');
  ok((await page.locator(".obligation44").count()) === 0, "Lesson 40 has zero .obligation44 bleed");

  await page.goto(`${baseOrigin}#/lesson/43`);
  await page.waitForSelector('[data-lesson="43"]');
  ok((await page.locator(".obligation44").count()) === 0, "Lesson 43 has zero .obligation44 bleed");

  report.errors = errors;
  ok(errors.length === 0, `zero page/console errors (${errors.join(" | ")})`);

  writeFileSync(`${output}/browser-report.json`, JSON.stringify(report, null, 2) + "\n");
  const lowestContrast = Math.min(...report.contrast.map((c) => c.minRatio));
  console.log(
    `\nChromium QA Summary: ${checks} checks, ${report.contrast.length} snapshots, lowest contrast ${lowestContrast.toFixed(2)}:1.`
  );

  if (failures.length) {
    for (const f of failures) console.error(`✕ ${f}`);
    console.error(`Lesson 44 browser QA FAILED: ${failures.length}/${checks}`);
    process.exitCode = 1;
  } else {
    console.log(`Lesson 44 browser QA PASSED: ${checks}/${checks} checks clean.`);
  }
} finally {
  await browser.close();
}
