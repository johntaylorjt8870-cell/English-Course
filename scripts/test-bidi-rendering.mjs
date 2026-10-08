// ============================================================
// BIDI rendering regression tests (no browser needed).
//
// Renders the real shared helpers (LatinRuns, EnAr) from src/shared/bidi.tsx
// with react-dom/server, then checks the visual order with the shared
// simulator (scripts/lib/bidi-sim.mjs). Negative controls prove the oracle
// flags the raw bug (e.g. "بالفعل already =") so passing results are not
// vacuous.
//
//   node scripts/test-bidi-rendering.mjs
// ============================================================
import { createRequire } from "node:module";
import { mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { analyzeHtml } from "./lib/bidi-sim.mjs";

const req = createRequire(import.meta.url);
const esbuild = req("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const dir = join(root, "node_modules", ".bidi-audit");
mkdirSync(dir, { recursive: true });
const outFile = join(dir, `bidi-helpers-${process.pid}.mjs`);
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `export { LatinRuns, EnAr } from "./src/shared/bidi.tsx";
export { renderToStaticMarkup } from "react-dom/server";
import React from "react"; export { React };`,
    resolveDir: root, loader: "tsx",
  },
  bundle: true, platform: "node", format: "esm", outfile: outFile, jsx: "automatic",
  packages: "external", logLevel: "error",
});
const H = await import(pathToFileURL(outFile).href);
rmSync(outFile, { force: true });
const { LatinRuns, EnAr, renderToStaticMarkup: ssr, React } = H;
const h = React.createElement;

let checks = 0;
const failures = [];
function ok(cond, msg) {
  checks++;
  if (cond) console.log(`✓ ${msg}`);
  else { failures.push(msg); console.error(`✕ ${msg}`); }
}

// Wrap a fragment in an RTL line, like a lesson paragraph.
const line = (inner) => `<div dir="rtl">${inner}</div>`;
// Simulator summary for one HTML fragment.
function inspect(html) {
  const res = analyzeHtml(line(html));
  let pairs = 0, viol = [];
  for (const r of res) { pairs += r.pairs; for (const v of r.violations) viol.push(v); }
  return { pairs, viol };
}

// ---- positive: rendered by the shared helpers, must read English-first ----
const mixedCases = [
  ["already = بالفعل", "LatinRuns"],
  ["Past Perfect = حدث قبل حدث آخر", "LatinRuns"],
  ["had + V3 → الفعل الثالث", "LatinRuns"],
  ["S + have/has + V3 — المضارع التام", "LatinRuns"],
  ["S + had + V3 — الماضي التام", "LatinRuns"],
  ["for 3 years (مدة)", "LatinRuns"],
  ["since 2020 (وقت محدد ومنتهٍ)", "LatinRuns"],
  ["V1 · V2 · V3 — الأفعال الثلاثة", "LatinRuns"],
  ["play → plays (بعد y)", "LatinRuns"],
  ["(already) = بالفعل", "LatinRuns"],
  ["eat / ate / eaten — أكل", "LatinRuns"],
  ["Past Simple — الماضي البسيط", "LatinRuns"],
  ["I have lived here since 2020. = أنا أعيش هنا منذ 2020", "LatinRuns"],
  ["✅ plays — صحيح", "LatinRuns"],
  ["had + V2 ❌ — خطأ", "LatinRuns"],
  ["«The Mysterious Door» — الباب الغامض", "LatinRuns"],
];
for (const [text] of mixedCases) {
  const html = ssr(h(LatinRuns, { text }));
  const { pairs, viol } = inspect(html);
  ok(pairs >= 1, `pair detected: "${text}"`);
  ok(viol.length === 0, `no visual violation: "${text}"`);
}

// ---- positive: EnAr English + Arabic gloss with explicit separator ----
const enArCases = [
  { en: "already", sep: "=", ar: "بالفعل" },
  { en: "had + V3", sep: "—", ar: "الماضي التام" },
  { en: "Past Perfect", sep: "=", ar: "حدث منذ زمن طويل جدًا؟" },
];
// EnAr is an LTR flex row (not an RTL paragraph), so the paragraph oracle does
// not apply: assert the structure instead: one LTR group, English before Arabic.
for (const c of enArCases) {
  const html = ssr(h(EnAr, c));
  const group = /^<span dir="ltr" class="ltr-pair[^"]*">/.test(html);
  const enAt = html.indexOf(c.en.replace(/&/g, "&amp;"));
  const arAt = html.indexOf(c.ar);
  ok(group, `EnAr renders one LTR group: "${c.en}"`);
  ok(enAt >= 0 && arAt > enAt, `EnAr English precedes Arabic: "${c.en} ${c.sep} ${c.ar}"`);
}

// ---- isolation: English is inside an LTR group, and no Unicode controls are injected into data ----
{
  const html = ssr(h(LatinRuns, { text: "already = بالفعل" }));
  ok(/dir="ltr"/.test(html) && /already/.test(html), 'LatinRuns wraps "already" in dir="ltr"');
  ok(!/[\u2066-\u2069\u202A-\u202E\u200E\u200F]/.test(html), "LatinRuns injects no Unicode bidi controls");
}

// ---- negative controls: the raw bug must be detected ----
const badControls = [
  "already = بالفعل",
  "I have lived here since 2020. = أنا أعيش هنا منذ 2020",
];
for (const raw of badControls) {
  const { viol } = inspect(`<span>${raw}</span>`);
  ok(viol.length >= 1, `negative control flagged (raw): "${raw}"`);
}

// ---- Lesson-6-style data: text that must be English-first (no false positive on Arabic-only) ----
{
  const { viol } = inspect(ssr(h(LatinRuns, { text: "أنا أحب القراءة كل يوم" })));
  ok(viol.length === 0, "Arabic-only sentence: no violation");
}

console.log(`\n${checks - failures.length}/${checks} BIDI rendering assertions passed`);
if (failures.length) {
  console.error(`${failures.length} failed`);
  process.exit(1);
}
