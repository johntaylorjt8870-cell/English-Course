// Bounded reach crawl for embedded activity controls (Lessons 1–32).
//
// The initial crawl (audit-bidi-mixed.mjs --activity-report) only clicks "التالي".
// Controls behind tabs, rail slides, choices, reveal/check/reset buttons, and
// conditional panels are therefore never observed. This script explores those
// states by replay: each state is reached by a fresh mount of the real App and a
// recorded click path. States are deduplicated by rendered DOM. Clicking is
// audit-only; no production source is modified.
//
// Output: docs/audits/activity-reach.json (observations + reached sites per lesson).
// Budget per lesson is explicit (MAX_STATES / MAX_DEPTH) and recorded in the output,
// so an unexplored remainder is reported as unresolved, never dropped.
import { createRequire } from "node:module";
import { mkdirSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { activityInstrumentation, observeActivities } from "./lib/activity-observation.mjs";

const req = createRequire(import.meta.url);
const esbuild = req("esbuild");
const { JSDOM } = req("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "docs", "audits", "activity-reach.json");
const LESSONS = process.env.ONLY ? process.env.ONLY.split(",").map(Number) : Array.from({ length: 32 }, (_, i) => i + 1);

// Controls whose activation leaves the lesson or the audited shell.
const EXIT_RX = /الرئيسية|خروج|رجوع للقائمة|جميع الدروس|Home|Exit|Logout|تسجيل الخروج|قفل|Lock|فتح في|mailto|http|^\s*[→←]\s*$/i;
const CANDIDATE_SEL = 'button, [role="button"], [role="tab"], summary, input[type="checkbox"], input[type="radio"]';

async function loadApp() {
  const dir = join(root, "node_modules", ".bidi-audit");
  mkdirSync(dir, { recursive: true });
  const outFile = join(dir, `reach-${process.pid}.mjs`);
  await esbuild.build({
    absWorkingDir: root,
    plugins: [activityInstrumentation(root)],
    stdin: {
      contents: `export { default as App } from ${JSON.stringify(join(root, "src/App.tsx"))};
export { createRoot } from "react-dom/client";
import React from "react"; export { React };
export { flushSync } from "react-dom";`,
      resolveDir: root, loader: "tsx",
    },
    bundle: true, platform: "node", format: "esm", outfile: outFile, jsx: "automatic",
    packages: "external", logLevel: "error",
  });
  const mod = await import(pathToFileURL(outFile).href);
  rmSync(outFile, { force: true });
  return mod;
}

function setupDom() {
  const dom = new JSDOM(`<!doctype html><html dir="rtl"><body></body></html>`, { url: "http://localhost/", pretendToBeVisual: true });
  const win = dom.window;
  for (const k of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "KeyboardEvent", "HTMLInputElement", "HTMLTextAreaElement", "getComputedStyle", "localStorage", "sessionStorage", "requestAnimationFrame", "cancelAnimationFrame", "MutationObserver", "CustomEvent", "HashChangeEvent", "Text", "Comment", "DocumentFragment", "HTMLDivElement", "SVGElement", "DOMParser", "Audio", "HTMLAudioElement"]) {
    if (win[k] !== undefined) Object.defineProperty(globalThis, k, { value: win[k], configurable: true });
  }
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  const stub = (o, k, v) => { if (!o[k]) o[k] = v; };
  // React's legacy input-event polyfill calls attachEvent/detachEvent on focus changes;
  // jsdom lacks them and the thrown error left later roots broken. Audit-only shim.
  stub(win.Element.prototype, "attachEvent", () => {});
  stub(win.Element.prototype, "detachEvent", () => {});
  stub(win.Element.prototype, "scrollTo", () => {});
  stub(win.Element.prototype, "scrollIntoView", () => {});
  stub(win, "scrollTo", () => {});
  stub(win, "matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
  stub(win, "IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
  stub(win, "ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  globalThis.window.speechSynthesis = globalThis.window.speechSynthesis || { speak() {}, cancel() {}, getVoices: () => [] };
  win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  return win;
}

const tick = () => new Promise((r) => setTimeout(r, 0));
const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 16);

// Candidate controls in the lesson main area, in DOM order, excluding exits and disabled ones.
function candidates(document, rootEl) {
  return [...rootEl.querySelectorAll(CANDIDATE_SEL)].filter((el) => {
    if (el.disabled || el.getAttribute("aria-disabled") === "true") return false;
    if (el.closest("[hidden]")) return false;
    const label = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim();
    if (EXIT_RX.test(label)) return false;
    return true;
  });
}

async function main() {
  const M = await loadApp();
  const win = setupDom();
  const document = win.document;
  const perLesson = {};
  const allObservations = [];
  const NEXT_RX = /التالي|التالية|Next|السابق|Prev/;
  const MAX_CLICKS_PER_STEP = Number(process.env.MAX_CLICKS_PER_STEP || 60);
  const MAX_STEPS = 200;

  // Fresh mount of one lesson, optionally advanced `advance` times with next-only clicks.
  const mount = async (lesson, advance) => {
    win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
    win.location.hash = `#/lesson/${lesson}`;
    document.body.innerHTML = "<div id=root></div>";
    const rootEl = document.getElementById("root");
    const r = M.createRoot(rootEl);
    M.flushSync(() => r.render(M.React.createElement(M.App)));
    win.dispatchEvent(new win.HashChangeEvent("hashchange"));
    await tick();
    let reached = 0;
    for (let j = 0; j < advance; j++) {
      const nextBtn = nextButton(rootEl);
      if (!nextBtn) break;
      const before = rootEl.innerHTML;
      nextBtn.click();
      await tick();
      if (rootEl.innerHTML === before) break;
      reached++;
    }
    return { rootEl, r, reached };
  };
  const nextButton = (rootEl) => [...rootEl.querySelectorAll("button")].find((b) => !b.disabled && /التالي|التالية|Next/.test(b.textContent || "") && !/السابق/.test(b.textContent || ""));
  // In-step candidates: non-navigation controls in the lesson body (not the rail/aside, not next/prev).
  const inStep = (rootEl) => candidates(document, rootEl).filter((el) => {
    if (el.closest("aside,nav")) return false;
    const label = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim();
    return !NEXT_RX.test(label);
  });
  const keyOf = (el) => `${el.tagName}|${(el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80)}`;

  // Navigation controls that open other slides/panels: side rails, drawers, and menu openers.
  const NAV_HINT_RX = /القائمة|الدروس|فهرس|درس|مسار|الأقسام|الخطوات|menu|drawer|index|contents|مجلد|قسم/i;
  const navCandidates = (rootEl) => candidates(document, rootEl).filter((el) => {
    const label = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim();
    if (NEXT_RX.test(label)) return false;
    return !!el.closest("aside,nav") || NAV_HINT_RX.test(label);
  });
  const NAV_DEPTH = 2;
  const NAV_STATES = Number(process.env.NAV_STATES || 40);

  for (const lesson of LESSONS) {
    // Pass 1: count steps with the same next-only rule as the initial crawl.
    const probe = await mount(lesson, MAX_STEPS);
    const stepCount = probe.reached + 1;
    M.flushSync(() => probe.r.unmount());

    // Pass 2: each step from a clean state; sequential in-step clicks with a snapshot after each.
    const lessonObs = [];
    const observed = new Set();
    let clicks = 0;
    let budgetHit = false;
    for (let i = 0; i < stepCount; i++) {
      const st = await mount(lesson, i);
      const { rootEl, r } = st;
      let sub = 0;
      const snap = () => {
        sub++;
        const obs = observeActivities(document, lesson, `${i + 1}.${sub}`, { includeAside: true });
        lessonObs.push(...obs);
        for (const o of obs) for (const c of o.controls) observed.add(c.site);
      };
      snap();
      const clicked = new Set();
      let local = 0;
      for (;;) {
        const el = inStep(rootEl).find((x) => !clicked.has(keyOf(x)));
        if (!el) break;
        if (local >= MAX_CLICKS_PER_STEP) { budgetHit = true; break; }
        clicked.add(keyOf(el));
        el.click();
        await tick();
        clicks++; local++;
        snap();
      }
      M.flushSync(() => r.unmount());
    }
    // Pass 3: bounded BFS over navigation controls (depth ≤ NAV_DEPTH, ≤ NAV_STATES states).
    // Each reached state gets the same in-step pass as Pass 2.
    const navSeen = new Set();
    const navQueue = [[]];
    let navStates = 0;
    while (navQueue.length && navStates < NAV_STATES) {
      const path = navQueue.shift();
      const st = await mount(lesson, 0);
      const { rootEl, r } = st;
      let ok = true;
      for (const k of path) {
        const list = navCandidates(rootEl);
        if (k >= list.length) { ok = false; break; }
        list[k].click();
        await tick();
      }
      if (!ok) { M.flushSync(() => r.unmount()); continue; }
      const h = createHash("sha256").update(rootEl.innerHTML).digest("hex");
      if (navSeen.has(h)) { M.flushSync(() => r.unmount()); continue; }
      navSeen.add(h);
      navStates++;
      let sub = 0;
      const snap = () => {
        sub++;
        const obs = observeActivities(document, lesson, `nav${navStates}.${sub}`, { includeAside: true });
        lessonObs.push(...obs);
        for (const o of obs) for (const c of o.controls) observed.add(c.site);
      };
      snap();
      const clickedNav = new Set();
      let local = 0;
      for (;;) {
        const el = inStep(rootEl).find((x) => !clickedNav.has(keyOf(x)));
        if (!el) break;
        if (local >= MAX_CLICKS_PER_STEP) { budgetHit = true; break; }
        clickedNav.add(keyOf(el));
        el.click();
        await tick();
        clicks++; local++;
        snap();
      }
      if (path.length < NAV_DEPTH) {
        const n = navCandidates(rootEl).length;
        for (let k = 0; k < Math.min(n, 30); k++) navQueue.push([...path, k]);
      }
      M.flushSync(() => r.unmount());
    }
    allObservations.push(...lessonObs);
    perLesson[lesson] = { steps: stepCount, navStates, navQueueRemaining: navQueue.length, clicks, observedSites: observed.size, budgetHit };
    console.log(`L${lesson}: steps ${stepCount}, nav states ${navStates}, clicks ${clicks}, observed sites ${observed.size}${budgetHit ? " (per-step click budget reached)" : ""}`);
  }

  mkdirSync(dirname(OUT), { recursive: true });
  // Compact artifact: per-site first observation plus raw counts. Full DOM-level snapshots are not committed
  // (a full dump exceeded GitHub's 100 MB file limit).
  const siteFirst = new Map();
  for (const g of allObservations) for (const c of g.controls) if (!siteFirst.has(c.site)) siteFirst.set(c.site, { lesson: g.lesson, step: g.step, owner: g.owner, taskId: g.taskId });
  const rawControlOccurrences = allObservations.reduce((n, g) => n + g.controls.length, 0);
  writeFileSync(OUT, JSON.stringify({
    scope: "Audit-only reach walk: for every lesson step, a fresh mount advances with next-only clicks; then every non-navigation control in that step is clicked once in DOM order with a snapshot after each click. Plus a bounded navigation BFS (depth 2) with the same in-step pass. Discovers controls that appear after prior clicks. Not a full state-space search; no behavioral correctness is asserted. Stores the first observation per site and raw counts; full snapshots are not committed.",
    budget: { MAX_CLICKS_PER_STEP, NAV_STATES: Number(process.env.NAV_STATES || 40), NAV_DEPTH: 2 },
    perLesson,
    observedSiteCount: siteFirst.size,
    rawSnapshotCount: allObservations.length,
    rawControlOccurrences,
    observedSites: [...siteFirst.entries()].sort((x, y) => x[0].localeCompare(y[0])).map(([site, f]) => ({ site, ...f })),
  }, null, 1) + "\n");
  console.log(`reach: ${siteFirst.size} distinct source sites observed; ${allObservations.length} snapshots; wrote ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
