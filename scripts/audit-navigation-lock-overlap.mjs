// ============================================================
// Automated Regression Suite: Navigation ("التالي") vs Site-Lock ("قفل الموقع")
//
// Verifies:
//   1. Shared navigation/control area renders both "التالي" and "قفل الموقع"
//      in normal layout flow (never overlapping fixed bottom-4 left-4).
//   2. Zero coordinate overlap at desktop (1440px), laptop (1280px),
//      tablet (768px), and mobile (375px) widths (via real-Chromium
//      verification artifact and layout flow computation).
//   3. Lessons 34 & 35 mobile drawer clearance at 768×900 and 375×812 when
//      scrolled to the bottom of the page.
//   4. Multi-tab area transitions across Lessons 31, 32, 33, 34, 35–39, 40,
//      41, and 44 always leave exactly 1 visible "قفل الموقع" button (checking
//      computed styles and hidden ancestors) and zero stale host attributes.
//   5. RTL/LTR direction and long labels wrap without overlap.
//   6. Clicking "التالي" advances the lesson step as expected.
//   7. Clicking "قفل الموقع" locks the site, clears storage, and shows
//      the password gate ("الموقع محمي").
//   8. Representative lessons across all generations use the normal-flow layout path,
//      and existing site-lock, final-test, solutions, and teacher-guide protections
//      remain intact.
// ============================================================
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const req = createRequire(import.meta.url);
const esbuild = req("esbuild");
const { JSDOM } = req("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let passed = 0;
const failures = [];
function check(label, fn) {
  try {
    fn();
    passed++;
  } catch (err) {
    failures.push(`${label}: ${err.message}`);
  }
}

// ---------------- 1. Static & CSS invariants ----------------
const gateSrc = readFileSync(join(root, "src/shared/SitePasswordGate.tsx"), "utf8");
const navSrc = readFileSync(join(root, "src/shared/LessonStepNav.tsx"), "utf8");
const indexCss = readFileSync(join(root, "src/index.css"), "utf8");
const l32Src = readFileSync(join(root, "src/lessons/lesson32/Lesson32.tsx"), "utf8");
const l32Css = readFileSync(join(root, "src/lessons/lesson32/lesson32.css"), "utf8");
const l33Src = readFileSync(join(root, "src/lessons/lesson33/Lesson33.tsx"), "utf8");
const l33Css = readFileSync(join(root, "src/lessons/lesson33/lesson33.css"), "utf8");

check("SitePasswordGate keeps password CloseYourEyes173 intact", () => {
  assert.ok(gateSrc.includes('const SITE_PASSWORD = "CloseYourEyes173"'));
  assert.ok(gateSrc.includes('const STORAGE_KEY = "englishwithsomer-site-unlocked"'));
});

check("SitePasswordGate no longer uses fixed bottom-4 left-4 overlay and handles attribute mutations", () => {
  assert.ok(!gateSrc.includes("fixed bottom-4 left-4"));
  assert.ok(gateSrc.includes("SiteLockButton"));
  assert.ok(gateSrc.includes("findStepNavHost"));
  assert.ok(gateSrc.includes('r.type === "attributes"'));
  assert.ok(gateSrc.includes("clearSlot"));
});

check("Shared LessonStepNav component exists and renders SiteLockButton in normal flex flow", () => {
  assert.ok(navSrc.includes("lesson-step-nav"));
  assert.ok(navSrc.includes("SiteLockButton"));
  assert.ok(navSrc.includes("useRegisterInlineLockHost"));
});

check("Lessons 32 and 33 use shared LessonStepNav and normal-flow .l32-fab / .l33-fab", () => {
  assert.ok(l32Src.includes("LessonStepNav"));
  assert.ok(l33Src.includes("LessonStepNav"));
  assert.ok(!/\.l32-fab\s*\{[^}]*position:\s*absolute/s.test(l32Css));
  assert.ok(!/\.l33-fab\s*\{[^}]*position:\s*absolute/s.test(l33Css));
});

check("index.css defines shared normal-flow flex rules and Lessons 34–35 mobile drawer clearance", () => {
  assert.ok(indexCss.includes(".lesson-step-nav"));
  assert.ok(indexCss.includes(".lesson-step-nav__end"));
  assert.ok(indexCss.includes("flex-wrap: wrap"));
  assert.ok(indexCss.includes("[data-site-lock-host]"));
  assert.ok(indexCss.includes("#l34-main"));
  assert.ok(indexCss.includes("#l35-main"));
});

// ---------------- 2. Real-browser bounding-box, drawer-clearance & tab-transition report ----------------
const reportPath = join(root, "docs/navigation-fix-visual/verification.json");
check("Real-browser verification report exists with 0 failures across viewports, Lessons 34–35 drawer clearance, and Lessons 31–44 tab transitions", () => {
  assert.ok(existsSync(reportPath), "docs/navigation-fix-visual/verification.json must exist");
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  assert.equal(report.failures.length, 0, `browser report failures: ${report.failures.join("; ")}`);
  assert.equal(report.consoleErrors.length, 0, `browser console errors: ${report.consoleErrors.join("; ")}`);

  const requiredViewports = ["1440x900", "1280x800", "768x900", "375x812"];
  const requiredLessons = [33, 32, 31, 1, 2, 44];
  for (const lesson of requiredLessons) {
    for (const vp of requiredViewports) {
      const m = report.measurements.find((entry) => entry.lesson === lesson && entry.viewport === vp);
      assert.ok(m, `missing measurement for lesson ${lesson} at ${vp}`);
      assert.equal(m.overlap, 0, `lesson ${lesson} at ${vp} has overlap=${m.overlap}`);
      assert.ok(m.horizontalGap >= 8 || m.verticalGap >= 6, `lesson ${lesson} at ${vp} has insufficient spacing`);
      assert.ok(m.nextClickableAtCenter, `lesson ${lesson} at ${vp} Next button not clickable at center`);
      assert.ok(m.lockClickableAtCenter, `lesson ${lesson} at ${vp} Lock button not clickable at center`);
      assert.ok(m.scrollWidth <= m.clientWidth, `lesson ${lesson} at ${vp} overflows horizontally`);
      assert.ok(existsSync(join(root, m.screenshot)), `missing screenshot ${m.screenshot}`);
    }
  }

  // Verify Lessons 34 & 35 mobile/tablet drawer clearance at 768x900 and 375x812
  assert.ok(Array.isArray(report.drawerClearance) && report.drawerClearance.length === 4, "must include 4 drawerClearance measurements (L34 & L35 at 768x900 & 375x812)");
  for (const dc of report.drawerClearance) {
    assert.equal(dc.drawerLockOverlap, 0, `L${dc.lesson} @ ${dc.viewport} drawer vs Lock overlap=${dc.drawerLockOverlap}`);
    assert.equal(dc.drawerNextOverlap, 0, `L${dc.lesson} @ ${dc.viewport} drawer vs Next overlap=${dc.drawerNextOverlap}`);
    assert.equal(dc.lockNextOverlap, 0, `L${dc.lesson} @ ${dc.viewport} Lock vs Next overlap=${dc.lockNextOverlap}`);
    assert.ok(dc.verticalClearancePx >= 24, `L${dc.lesson} @ ${dc.viewport} insufficient vertical clearance (${dc.verticalClearancePx}px)`);
    assert.ok(existsSync(join(root, dc.screenshot)), `missing screenshot ${dc.screenshot}`);
  }

  // Verify real-browser tab transitions across Lessons 31, 32, 33, 34, 35–39, 40, 41, 44
  assert.ok(Array.isArray(report.tabTransitions) && report.tabTransitions.length >= 36, "must include real-browser tab transition checks");
  for (const tt of report.tabTransitions) {
    assert.equal(tt.totalLockCount, 1, `L${tt.lesson} @ ${tt.viewport} [tab=${tt.activeTab}] totalLockCount=${tt.totalLockCount}`);
    assert.equal(tt.visibleLockCount, 1, `L${tt.lesson} @ ${tt.viewport} [tab=${tt.activeTab}] visibleLockCount=${tt.visibleLockCount}`);
    assert.equal(tt.hiddenHostCount, 0, `L${tt.lesson} @ ${tt.viewport} [tab=${tt.activeTab}] hiddenHostCount=${tt.hiddenHostCount}`);
    assert.ok(tt.lockBox && tt.lockBox.width > 0 && tt.lockBox.height > 0, `L${tt.lesson} @ ${tt.viewport} [tab=${tt.activeTab}] invalid lockBox`);
  }

  // Verify LTR and long-label edge cases in real-browser report
  assert.ok(report.edgeCases.length >= 4, "must include LTR and long-label edge-case measurements");
  for (const ec of report.edgeCases) {
    assert.equal(ec.overlap, 0, `edge case L${ec.lesson} ${ec.viewport}${ec.labelSuffix} overlap=${ec.overlap}`);
    assert.ok(ec.scrollWidth <= ec.clientWidth, `edge case L${ec.lesson} ${ec.viewport}${ec.labelSuffix} overflow`);
  }
});

// ---------------- 3. Live DOM + Computed Visibility & Multi-Tab Verification ----------------
async function buildBundle() {
  const dir = join(root, "node_modules", ".nav-lock-audit");
  mkdirSync(dir, { recursive: true });
  const outFile = join(dir, `app-${process.pid}.mjs`);
  await esbuild.build({
    absWorkingDir: root,
    stdin: {
      contents: `export { default as App } from ${JSON.stringify(join(root, "src/App.tsx"))};
export { createRoot } from "react-dom/client";
import React from "react"; export { React };
export { flushSync } from "react-dom";`,
      resolveDir: root,
      loader: "tsx",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: outFile,
    jsx: "automatic",
    packages: "external",
    logLevel: "error",
    loader: { ".woff2": "empty" },
  });
  const mod = await import(pathToFileURL(outFile).href);
  rmSync(outFile, { force: true });
  return mod;
}

const M = await buildBundle();
const dom = new JSDOM(`<!doctype html><html lang="ar" dir="rtl"><head></head><body><div id="root"></div></body></html>`, {
  url: "http://localhost/#/",
  pretendToBeVisual: true,
});
const win = dom.window;
for (const k of [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "Element",
  "Node",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "HTMLInputElement",
  "HTMLTextAreaElement",
  "getComputedStyle",
  "localStorage",
  "sessionStorage",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "MutationObserver",
  "CustomEvent",
  "HashChangeEvent",
  "Text",
  "Comment",
  "DocumentFragment",
  "HTMLDivElement",
  "SVGElement",
  "DOMParser",
  "Audio",
  "HTMLAudioElement",
]) {
  if (win[k] !== undefined) Object.defineProperty(globalThis, k, { value: win[k], configurable: true });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = false;
win.Element.prototype.scrollTo = () => {};
win.Element.prototype.scrollIntoView = () => {};
win.scrollTo = () => {};
win.matchMedia = () => ({
  matches: false,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
});
win.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
win.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.window.speechSynthesis = { speak() {}, cancel() {}, getVoices: () => [] };

const tick = (ms = 25) => new Promise((r) => setTimeout(r, ms));
const rootEl = document.getElementById("root");
const reactRoot = M.createRoot(rootEl);

function isNodeVisible(el) {
  if (!el) return false;
  let cur = el;
  while (cur) {
    if (cur.hidden || cur.getAttribute("aria-hidden") === "true" || cur.classList?.contains("hidden")) {
      return false;
    }
    const st = win.getComputedStyle(cur);
    if (st.display === "none" || st.visibility === "hidden" || parseFloat(st.opacity) === 0) {
      return false;
    }
    cur = cur.parentElement;
  }
  return true;
}

async function navigateTo(hash) {
  win.location.hash = hash;
  win.dispatchEvent(new win.HashChangeEvent("hashchange"));
  await tick(35);
}

win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
M.flushSync(() => reactRoot.render(M.React.createElement(M.App)));
await tick(35);

const REPRESENTATIVE_LESSONS = [1, 2, 14, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];

for (const n of REPRESENTATIVE_LESSONS) {
  await navigateTo(`#/lesson/${n}`);
  check(`Lesson ${n} [tab=student]: renders both "التالي" and 1 visible "قفل الموقع" inside a shared normal-flow navigation bar`, () => {
    const allLockBtns = [...document.querySelectorAll("[data-site-lock-button='true']")];
    const visLockBtns = allLockBtns.filter(isNodeVisible);
    assert.equal(allLockBtns.length, 1, `Lesson ${n}: expected 1 total lock button, found ${allLockBtns.length}`);
    assert.equal(visLockBtns.length, 1, `Lesson ${n}: expected 1 visible lock button, found ${visLockBtns.length}`);
    const lockBtn = visLockBtns[0];

    const navHost = lockBtn.closest("[data-lesson-step-nav='true'], [data-site-lock-host]");
    assert.ok(navHost, `Lesson ${n}: Lock button must reside inside a normal-flow navigation host`);
    assert.ok(isNodeVisible(navHost), `Lesson ${n}: navigation host must be visible`);

    const searchScope = navHost.closest("footer, nav, div.justify-between") || navHost;
    const nextBtn = [...searchScope.querySelectorAll("button")].find((b) => {
      if (!isNodeVisible(b)) return false;
      const t = (b.textContent || "").trim();
      if (t.includes("السابق") || t.includes("الدرس التالي")) return false;
      return t.includes("التالي") || t.includes("الخطوة التالية") || b.getAttribute("data-step-nav") === "next";
    });
    assert.ok(nextBtn, `Lesson ${n}: expected a visible Next step button inside the same normal-flow navigation host as Lock`);
    assert.ok(!lockBtn.className.includes("fixed"), `Lesson ${n}: Lock button must not use position:fixed`);
  });
}

// Multi-tab transition verification across Lessons 31, 32, 33, 34, 35–39, 40, 41, 44
const TAB_TRANSITION_SCENARIOS = [
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
  { lesson: 44, tabs: ["الاختبار", "المعلم", "التعلّم"] },
];

for (const scenario of TAB_TRANSITION_SCENARIOS) {
  await navigateTo(`#/lesson/${scenario.lesson}`);
  for (const tabLabel of scenario.tabs) {
    const tabBtn = [...document.querySelectorAll("button")].find(
      (b) => !b.disabled && (b.textContent || "").replace(/\s+/g, " ").includes(tabLabel),
    );
    check(`Lesson ${scenario.lesson} [tab=${tabLabel}]: tab switch preserves 1 visible "قفل الموقع" button and cleans stale hosts`, () => {
      assert.ok(tabBtn, `Lesson ${scenario.lesson}: tab button "${tabLabel}" must exist`);
      M.flushSync(() => tabBtn.click());
    });
    await tick(25);
    check(`Lesson ${scenario.lesson} [tab=${tabLabel}]: visibility & host state after transition`, () => {
      const allLocks = [...document.querySelectorAll("[data-site-lock-button='true']")];
      const visLocks = allLocks.filter(isNodeVisible);
      assert.equal(allLocks.length, 1, `Lesson ${scenario.lesson} [tab=${tabLabel}]: expected 1 total lock button, got ${allLocks.length}`);
      assert.equal(visLocks.length, 1, `Lesson ${scenario.lesson} [tab=${tabLabel}]: expected 1 visible lock button, got ${visLocks.length}`);
      const hiddenHosts = [...document.querySelectorAll("[data-site-lock-host]")].filter((h) => !isNodeVisible(h));
      assert.equal(hiddenHosts.length, 0, `Lesson ${scenario.lesson} [tab=${tabLabel}]: expected 0 hidden [data-site-lock-host] elements, got ${hiddenHosts.length}`);
    });
  }
}

// Lesson 41 is a single ordered step flow (original Lessons 1–9 shell): it has no
// area tabs, so its Lock-button behaviour is verified through step transitions.
await navigateTo("#/lesson/41");
check('Lesson 41: step flow keeps exactly one visible "قفل الموقع" button next to "التالي ←"', () => {
  const navHost = document.querySelector("[data-site-lock-host]");
  assert.ok(navHost, "Lesson 41: expected a normal-flow lock host");
  assert.equal([...document.querySelectorAll("[data-site-lock-button='true']")].filter(isNodeVisible).length, 1, "Lesson 41: expected one visible lock button");
  assert.ok((navHost.textContent || "").includes("التالي"), "Lesson 41: lock host must share the step navigation bar");
});
check('Lesson 41: advancing a step re-docks the lock button without overlap', () => {
  const before = document.querySelector(".pointer-events-auto button:last-child");
  assert.ok(before, "Lesson 41: expected a Next button");
  M.flushSync(() => before.click());
  const navHost = document.querySelector("[data-site-lock-host]");
  assert.ok(navHost, "Lesson 41: lock host survives the step change");
  assert.equal([...document.querySelectorAll("[data-site-lock-button='true']")].filter(isNodeVisible).length, 1, "Lesson 41: still exactly one visible lock button");
  assert.equal([...document.querySelectorAll("[data-site-lock-host]")].filter((h) => !isNodeVisible(h)).length, 0, "Lesson 41: no hidden lock hosts");
});

// Check Next-step progression and Lock-site behavior on Lesson 33
await navigateTo("#/lesson/33");
check('Lesson 33: clicking "التالي ←" advances from step 1 to step 2 while keeping "قفل الموقع" docked', () => {
  const chipBefore = document.querySelector(".l33-chip")?.textContent || "";
  assert.ok(chipBefore.includes("1"), `expected step 1 before click, got "${chipBefore}"`);
  const nextBtn = document.querySelector(".l33-fab-next");
  assert.ok(nextBtn, "expected .l33-fab-next button");
  M.flushSync(() => nextBtn.click());
  const chipAfter = document.querySelector(".l33-chip")?.textContent || "";
  assert.ok(chipAfter.includes("2"), `expected step 2 after click, got "${chipAfter}"`);
  const lockBtn = document.querySelector("[data-site-lock-button='true']");
  assert.ok(lockBtn && isNodeVisible(lockBtn) && document.querySelector("[data-lesson-step-nav='true']")?.contains(lockBtn));
});

check('Lesson 33: final test and solutions remain locked before completing the test, and teacher guide requires password', () => {
  const tabBtns = [...document.querySelectorAll(".l33-tab")];
  const solTab = tabBtns.find((b) => (b.textContent || "").includes("منطقة الحلول"));
  assert.ok(solTab, "solutions tab must exist");
  M.flushSync(() => solTab.click());
  assert.ok(
    document.querySelector("[data-solutions-locked='true']") || document.body.textContent?.includes("مقفلة"),
    "solutions area must remain locked before completing the final test",
  );
  const teacherTab = tabBtns.find((b) => (b.textContent || "").includes("منطقة المعلم"));
  assert.ok(teacherTab, "teacher tab must exist");
  M.flushSync(() => teacherTab.click());
  assert.ok(
    document.querySelector("#l33-teacher-pw") && document.body.textContent?.includes("كلمة مرور المعلم"),
    "teacher guide must remain password-protected",
  );
});

check('Global SitePasswordGate: clicking "قفل الموقع" clears unlock state and renders the password screen', () => {
  const lockBtn = document.querySelector("[data-site-lock-button='true']");
  assert.ok(lockBtn && isNodeVisible(lockBtn), "expected visible [data-site-lock-button='true']");
  M.flushSync(() => lockBtn.click());
  assert.equal(win.localStorage.getItem("englishwithsomer-site-unlocked"), null, "unlock storage must be cleared");
  const title = document.querySelector("#site-gate-title")?.textContent?.trim();
  assert.equal(title, "الموقع محمي", `expected password screen title "الموقع محمي", got "${title}"`);
});

M.flushSync(() => reactRoot.unmount());

console.log(`Navigation vs Lock-Site Regression Audit: ${passed} checks passed, ${failures.length} failed.`);
if (failures.length > 0) {
  for (const f of failures) console.error(` ✕ ${f}`);
  process.exit(1);
}
