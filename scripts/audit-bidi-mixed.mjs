// ============================================================
// Mixed Arabic/English BIDI audit (rendered-markup simulator).
//
// Mounts the real <App/> in jsdom for every lesson, clicks through each
// lesson's steps, and inspects every unique rendered snapshot with the
// Unicode Bidirectional Algorithm (bidi-js). It flags an English run that
// is paired with Arabic by a separator (e.g. "already = بالفعل") when the
// visual order puts the Arabic before the English.
//
//   node scripts/audit-bidi-mixed.mjs                 # check vs baseline
//   node scripts/audit-bidi-mixed.mjs --write-baseline
//   ONLY=6,27 node scripts/audit-bidi-mixed.mjs       # subset (no ratchet)
//
// Rules:
//   - Lessons 6, 27–32: zero violations (minus ALLOWLIST below).
//   - Lessons 1–26: per-lesson count must not exceed scripts/bidi-baseline.json.
// Limitations: the crawler clicks "التالي" only and never answers quizzes,
// so answer feedback is not measured here; it is covered by the lesson audits.
// ============================================================
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { analyzeHtml } from "./lib/bidi-sim.mjs";

const req = createRequire(import.meta.url);
const esbuild = req("esbuild");
const { JSDOM } = req("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASELINE_FILE = join(root, "scripts", "bidi-baseline.json");
const STRICT = new Set([6, 27, 28, 29, 30, 31, 32]);
// Known heuristic false positives (rendered as separate pill boxes, not
// mixed text). Keyed by "<lesson>|<latin>|<arabic>". Keep this list short.
const ALLOWLIST = new Set([
  "L6|plaies|قبل y حرف علة (a) ← نضيف s فقط: plays",
  "L6|I usually play football every day|لكن في الكلام الطبيعي يكفي أحدهما حسب المعنى",
]);
const LESSONS = process.env.ONLY ? process.env.ONLY.split(",").map(Number) : Array.from({ length: 32 }, (_, i) => i + 1);
const WRITE = process.argv.includes("--write-baseline");

// ---------------- crawler ----------------
async function loadApp() {
  // Inside node_modules so the bundle resolves the project's packages.
  const dir = join(root, "node_modules", ".bidi-audit");
  mkdirSync(dir, { recursive: true });
  const outFile = join(dir, `app-${process.pid}.mjs`);
  await esbuild.build({
    absWorkingDir: root,
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

async function crawl(M) {
  const dom = new JSDOM(`<!doctype html><html dir="rtl"><body></body></html>`, { url: "http://localhost/", pretendToBeVisual: true });
  const win = dom.window;
  for (const k of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "KeyboardEvent", "HTMLInputElement", "HTMLTextAreaElement", "getComputedStyle", "localStorage", "sessionStorage", "requestAnimationFrame", "cancelAnimationFrame", "MutationObserver", "CustomEvent", "HashChangeEvent", "Text", "Comment", "DocumentFragment", "HTMLDivElement", "SVGElement", "DOMParser", "Audio", "HTMLAudioElement"]) {
    if (win[k] !== undefined) Object.defineProperty(globalThis, k, { value: win[k], configurable: true });
  }
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  const stub = (o, k, v) => { if (!o[k]) o[k] = v; };
  stub(win.Element.prototype, "scrollTo", () => {});
  stub(win.Element.prototype, "scrollIntoView", () => {});
  stub(win, "scrollTo", () => {});
  stub(win, "matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
  stub(win, "IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
  stub(win, "ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  globalThis.window.speechSynthesis = globalThis.window.speechSynthesis || { speak() {}, cancel() {}, getVoices: () => [] };
  win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  const tick = (ms = 15) => new Promise((r) => setTimeout(r, ms));
  const NEXT_RX = /التالي|التالية|Next/;
  const findNext = () => [...document.querySelectorAll("button")].find((b) => !b.disabled && NEXT_RX.test(b.textContent || "") && !/السابق/.test(b.textContent || ""));
  const snapshots = {};
  for (const n of LESSONS) {
    win.location.hash = `#/lesson/${n}`;
    document.body.innerHTML = "<div id=root></div>";
    const root = document.getElementById("root");
    const r = M.createRoot(root);
    M.flushSync(() => r.render(M.React.createElement(M.App)));
    win.dispatchEvent(new win.HashChangeEvent("hashchange"));
    await tick(40);
    let prev = null;
    const seen = new Set();
    snapshots[n] = [];
    for (let i = 0; i < 200; i++) {
      const html = root.innerHTML;
      if (html === prev) break;
      prev = html;
      if (!seen.has(html)) { seen.add(html); snapshots[n].push(html); }
      const b = findNext();
      if (!b) break;
      b.click();
      await tick(15);
    }
    M.flushSync(() => r.unmount());
  }
  return snapshots;
}

async function main() {
  const M = await loadApp();
  const snaps = await crawl(M);
  const counts = {};
  const uniq = [];
  for (const n of LESSONS) {
    const seen = new Map();
    for (const html of snaps[n]) {
      for (const r of analyzeHtml(html)) {
        for (const v of r.violations) {
          const kind = r.visual === "(row)" ? "row" : "para";
          const key = `${kind}|${v.latin}|${v.arabic}`;
          if (!seen.has(key)) seen.set(key, { kind, latin: v.latin, arabic: v.arabic, sig: v.sig || "" });
        }
      }
    }
    counts[`L${n}`] = seen.size;
    for (const v of seen.values()) uniq.push({ lesson: n, ...v });
  }
  const total = uniq.length;
  const failures = [];
  const allowed = [];
  const current = {};
  for (const n of LESSONS) current[`L${n}`] = 0;
  for (const u of uniq) {
    const { kind, latin, arabic } = u;
    const id = `L${u.lesson}|${latin}|${arabic}`;
    if (ALLOWLIST.has(id)) { allowed.push(id); continue; }
    current[`L${u.lesson}`]++;
    if (STRICT.has(u.lesson)) failures.push(`${kind} ${id}  [${u.sig}]`);
  }
  console.log(JSON.stringify(current));
  console.log(`unique violations: ${total - allowed.length} (allowlisted: ${allowed.length})`);

  if (WRITE) {
    const base = {};
    for (const n of LESSONS) if (!STRICT.has(n)) base[`L${n}`] = current[`L${n}`];
    writeFileSync(BASELINE_FILE, JSON.stringify(base, null, 2) + "\n");
    console.log(`wrote ${BASELINE_FILE}`);
    return;
  }
  const ratchet = [];
  if (existsSync(BASELINE_FILE) && !process.env.ONLY) {
    const base = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));
    for (const n of LESSONS) {
      if (STRICT.has(n)) continue;
      const b = base[`L${n}`] ?? 0;
      if (current[`L${n}`] > b) ratchet.push(`L${n}: ${current[`L${n}`]} > baseline ${b}`);
    }
  }
  for (const f of failures) console.error(`✕ ${f}`);
  for (const r of ratchet) console.error(`✕ ratchet ${r}`);
  if (failures.length || ratchet.length) {
    console.error(`\nBIDI audit FAILED: ${failures.length} strict, ${ratchet.length} ratchet`);
    process.exit(1);
  }
  console.log("BIDI audit passed");
}

main().catch((e) => { console.error(e); process.exit(1); });
