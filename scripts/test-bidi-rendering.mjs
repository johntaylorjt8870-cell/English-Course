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

// ---- parenthetical clause: «English (عربي …)» stays in the RTL flow ----
// A "(" joins English to its Arabic gloss only when the gloss fills the paren
// («for 3 years (مدة)» above). When the paren opens a whole Arabic clause —
// «play → plays (بعد y)», «when / while (الدرسان 25 و26)» — gluing the first
// Arabic word to the English tears the paren apart: the "(" ends up on the
// far edge of the LTR isolate, next to the wrong words, and the rest of the
// clause («25 و26)», « y)») is stranded outside it. Both parens must stay out
// of the isolates so the browser mirrors them in place and the clause reads in
// RTL order: English → ( → عربي … → ).
const parenClauseCases = [
  "play → plays (بعد y)",
  "الفرق بينهما + when / while (الدرسان 25 و26).",
  "حدث ماضٍ واحد: Yesterday, I visited… (بلا had).",
];
const enRunsOf = (html) => [...html.matchAll(/<span dir="ltr" class="[^"]*">([^<]*)<\/span>/g)].map((x) => x[1]);
for (const text of parenClauseCases) {
  const html = ssr(h(LatinRuns, { text }));
  const { viol } = inspect(html);
  const runs = enRunsOf(html).filter((r) => /[A-Za-z]/.test(r));
  ok(viol.length === 0, `parenthetical clause reads in order: "${text}"`);
  ok(runs.length > 0 && runs.every((r) => !/[()]/.test(r)), `parens stay outside the LTR isolates: "${text}"`);
}
// Controls: the paren's on-screen seat is what the fix is about. Swallowed by
// the isolate, "(" is parked at the isolate's far edge — visually after the
// whole English sentence, next to the Arabic label it does not belong to.
// Left in the RTL flow it sits between the sentence and its own content.
{
  const visualOf = (html) => analyzeHtml(line(html)).map((r) => r.visual).join("");
  const raw = `<span dir="ltr" class="font-en">: Yesterday, I visited… (</span>بلا<span dir="ltr" class="font-en"> had).</span>`;
  const bad = visualOf(raw);
  ok(bad.indexOf("(") > bad.indexOf("Yesterday"), `negative control flagged (paren swallowed by the isolate): "(" lands after the sentence — ${JSON.stringify(bad)}`);
  const good = visualOf(ssr(h(LatinRuns, { text: "حدث ماضٍ واحد: Yesterday, I visited… (بلا had)." })));
  ok(good.indexOf("(") < good.indexOf("Yesterday") && good.indexOf("(") > good.indexOf("had"), `positive control: "(" stays beside its own content — ${JSON.stringify(good)}`);
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

// ---- positive: «English A أم English B؟» must keep the written order ----
// The alternatives oracle (scripts/lib/bidi-sim.mjs) flags a reversed pair, so
// these cases fail if the group is split into two isolates again.
const altCases = [
  "IQ200 — had danced أم was dancing؟",
  "المقارنة الأهم — Lina left أم had left؟",
  "تدريب 3 — Past Simple أم Past Perfect؟",
  "هل أستخدم Present Simple أم Present Continuous؟",
  "hadn't + V3 أو had not + V3 — لا did أبدًا.",
  "ثمانية أزواج: Present Perfect أم Past Simple — المعنى يحسم.",
  "before أو after",
];
for (const text of altCases) {
  const html = ssr(h(LatinRuns, { text }));
  const { viol } = inspect(html);
  ok(viol.length === 0, `alternatives order kept: "${text}"`);
}
{
  const html = ssr(h(LatinRuns, { text: "IQ200 — had danced أم was dancing؟" }));
  const group = /^<span dir="ltr" class="ltr-pair[^"]*">/.test(html);
  const firstAt = html.indexOf("IQ200 — had danced");
  const connectorAt = html.indexOf("أم");
  const secondAt = html.indexOf("was dancing");
  ok(group, "alternatives render as one LTR group");
  ok(firstAt >= 0 && connectorAt > firstAt && secondAt > connectorAt, "alternatives keep A ← أم ← B order in the markup");
}
// Negative control: the old split rendering (two isolates) must be flagged.
{
  const raw = `<span dir="ltr" class="font-en">IQ200 — had danced</span> أم <span dir="ltr" class="font-en">was dancing</span>؟`;
  const { viol } = inspect(raw);
  ok(viol.length >= 1, "negative control flagged (split alternatives): \"IQ200 — had danced أم was dancing؟\"");
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
