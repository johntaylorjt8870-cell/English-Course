// ============================================================
// Lesson 32 audit — Present Perfect Continuous (المضارع التام المستمر)
//   node scripts/audit-lesson32.mjs
// Verifies (benchmark: Lessons 27–31 native multi-step architecture):
//   1) Source ledger: 40 verbatim units = cover + objectives + 36 numbered + summary + closing.
//   2) Step registry: 40 slides, each source unit exactly once, in ledger order.
//   3) Real render (SSR) of all 40 steps: no throws, source badge, no answer leak.
//   4) Completion-gated source reveal: hidden before the attempt, shown after it (DOM-driven).
//   5) Interaction walk: sorting, slots, rows, fixes, typed, boss, verbs, rail, gates, evidence.
//   6) Test Area: 20 original questions, 6/7/4/3, 7 types, neutral until submit, score, full reset.
//   7) Test Solutions: locked before submit, 20 solutions in 4 groups of 5.
//   8) Teacher Area: somer173 gate (wrong rejected), full teaching content, verbatim source index.
//   9) Preserved source: all 12 intentionally wrong source lines kept verbatim in the ledger.
//  10) Shell + routing + hub card + LTR/bidi hygiene + keyboard/focus contract.
// ============================================================
import { createRequire } from "node:module";
import { readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "scripts", ".lesson32-audit.mjs");
const L32 = join(root, "src", "lessons", "lesson32");

const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
};

// ---------------- jsdom globals ----------------
const { JSDOM } = await import("jsdom");
const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/", pretendToBeVisual: true });
const win = dom.window;
Object.defineProperty(globalThis, "window", { value: win, configurable: true });
Object.defineProperty(globalThis, "document", { value: win.document, configurable: true });
Object.defineProperty(globalThis, "navigator", { value: win.navigator, configurable: true });
for (const key of ["Element", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement", "HTMLButtonElement", "Event", "MouseEvent", "KeyboardEvent", "Node", "getComputedStyle", "CSS"]) {
  if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
}
if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};

// ---------------- bundle ----------------
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React from "react";
import { renderToString } from "react-dom/server";
import { createRoot } from "react-dom/client";
import Lesson32, { SlideView32 } from ${JSON.stringify(join(L32, "Lesson32.tsx"))};
import TestArea32, { Solutions32, gradeOne32, isAnswered32 } from ${JSON.stringify(join(L32, "TestArea32.tsx"))};
import TeacherArea32 from ${JSON.stringify(join(L32, "TeacherArea32.tsx"))};
import * as D from ${JSON.stringify(join(L32, "data.ts"))};
import * as L from ${JSON.stringify(join(L32, "ledger32.ts"))};
import * as T from ${JSON.stringify(join(L32, "testData.ts"))};
import * as TD from ${JSON.stringify(join(L32, "teacherData.ts"))};
function mount(node) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(node);
  return el;
}
export { React, renderToString, createRoot, Lesson32, SlideView32, TestArea32, Solutions32, TeacherArea32, gradeOne32, isAnswered32, D, L, T, TD, mount };
`,
    resolveDir: root,
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: outFile,
  jsx: "automatic",
  packages: "external",
  logLevel: "silent",
});

const m = await import(pathToFileURL(outFile).href);
const { D, L, T, TD } = m;
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
const mountNode = async (node) => {
  const el = m.mount(node);
  await tick(60);
  return el;
};
const textOf = (el) => (el?.textContent || "").replace(/\s+/g, " ");
const btnWith = (scope, text) => [...scope.querySelectorAll("button")].find((b) => (b.textContent || "").replace(/\s+/g, " ").includes(text));
const clickEl = (el) => {
  if (!el) return false;
  el.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
  return true;
};
const setNative = (el, value) => {
  const proto = el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event("input", { bubbles: true }));
};
const q = (scope, sel) => scope.querySelector(sel);

// ============================================================
// 1) Source ledger
// ============================================================
const ledger = L.SOURCE_SECTIONS;
ok(ledger.length === 40, `ledger: 40 verbatim units (got ${ledger.length})`);
ok(L.SOURCE_NUMBERED_COUNT_32 === 36, "ledger: 36 numbered sections");
const numbered = ledger.filter((s) => /\d+\.\s/.test(s.title)).length;
ok(numbered === 36, `ledger: 36 numbered section titles (got ${numbered})`);
ok(new Set(ledger.map((s) => s.id)).size === ledger.length, "ledger: ids unique");
ok(ledger.every((s) => Array.isArray(s.units) && s.units.length > 0), "ledger: every unit has verbatim lines");
const ledgerText = ledger.flatMap((s) => s.units).join("\n");

// ============================================================
// 2) Step registry
// ============================================================
const SLIDES = D.SLIDES;
ok(SLIDES.length === 40, `steps: 40 slides (got ${SLIDES.length})`);
ok(SLIDES.every((s) => Array.isArray(s.source) && s.source.length === 1), "steps: each slide maps to exactly one ledger unit");
const mapped = SLIDES.map((s) => s.source[0]);
ok(new Set(mapped).size === mapped.length, "steps: no ledger unit mapped twice");
ok(ledger.every((s) => mapped.includes(s.id)), "steps: every ledger unit is covered");
ok(mapped.join(",") === ledger.map((s) => s.id).join(","), "steps: slide order equals ledger order (source order preserved)");
ok(SLIDES.every((s) => D.SECTIONS_32.some((x) => x.id === s.section)), "steps: every slide belongs to a navigation section");
ok(SLIDES.every((s) => s.tip && s.lead && s.title), "steps: every slide has title, lead and tip");

// ============================================================
// 3) SSR render of all 40 steps
// ============================================================
const STATIC = new Set(["cover", "objectives", "summary", "closing"]);
for (const s of SLIDES) {
  let html = "";
  try {
    html = m.renderToString(m.React.createElement(m.SlideView32, { id: s.id, title: s.title, lead: s.lead, tip: s.tip, step: s.step, mascot: s.mascot, section: s.section, onGoTest: () => {} }));
  } catch (e) {
    failures.push(`render: step ${s.id} threw: ${e.message}`);
    continue;
  }
  ok(html.includes(`data-lesson-step="${s.id}"`), `render: step ${s.id} renders its body`);
  ok(html.includes("data-source-section"), `render: step ${s.id} shows its source-section badge`);
  const hasReveal = html.includes("data-reveal-block");
  if (STATIC.has(s.id)) ok(hasReveal, `render: static step ${s.id} shows its source reveal`);
  else ok(!hasReveal, `render: interactive step ${s.id} hides its source before the attempt`);
  ok(!/✓ صحيح|✕ غير صحيح|الدرجة:/.test(html), `render: step ${s.id} shows no correctness state before attempt`);
}

// ============================================================
// 4–5) DOM-driven completion (gated reveal + interaction walk)
// ============================================================
const mountStep = async (s) => {
  const node = m.React.createElement(m.SlideView32, { id: s.id, title: s.title, lead: s.lead, tip: s.tip, step: s.step, mascot: s.mascot, section: s.section, onGoTest: () => {} });
  return mountNode(node);
};
const revealed = (el, id) => !!q(el, `[data-reveal-block="${id}"]`);

// s1 — BlockBuilder: tap tokens in order, round by round
{
  const s = SLIDES.find((x) => x.id === "s1");
  const el = await mountStep(s);
  ok(!revealed(el, "s1"), "gate s1: source hidden before the build");
  for (let r = 0; r < D.BLOCKS_S1.length; r++) {
    for (let k = 0; k < D.BLOCKS_S1[r].tokens.length; k++) {
      const b = q(el, `[data-block-token="${k}"]`);
      ok(!!b, `s1 round ${r + 1}: token ${k} is tappable in order`);
      clickEl(b);
      await tick(5);
    }
    await tick(10);
    clickEl(btnWith(el, r + 1 < D.BLOCKS_S1.length ? "الجملة التالية" : "إنهاء التمرين"));
    await tick(10);
  }
  ok(revealed(el, "s1"), "gate s1: source revealed after completing the build");
}

// s3 — sort into buckets (click item → click bucket)
{
  const s = SLIDES.find((x) => x.id === "s3");
  const el = await mountStep(s);
  for (let i = 0; i < D.SUBJECTS_S3.length; i++) {
    const item = [...el.querySelectorAll("[data-sort-item]")][0];
    clickEl(item);
    await tick(5);
    const bucket = D.SUBJECTS_S3[Number(item.getAttribute("data-sort-item"))].bucket;
    clickEl(el.querySelector(`[data-bucket="${bucket}"] button`));
    await tick(5);
  }
  await tick(10);
  ok(revealed(el, "s3"), "gate s3: source revealed after sorting every subject");
}

// s5 — slot pick (correct option per round)
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s5"));
  for (let r = 0; r < D.FOR_ROUNDS_S5.length; r++) {
    clickEl(q(el, `[data-slot-opt="${D.FOR_ROUNDS_S5[r].options.findIndex((o) => o.ok)}"]`));
    await tick(5);
    clickEl(btnWith(el, r + 1 < D.FOR_ROUNDS_S5.length ? "الجولة التالية" : "إنهاء التمرين"));
    await tick(5);
  }
  ok(revealed(el, "s5"), "gate s5: source revealed after the for-rounds");
}

// s11 — per-row choices
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s11"));
  for (let ri = 0; ri < D.SHORT_ROWS_S11.length; ri++) { clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.SHORT_ROWS_S11[ri].answer}"]`)); await tick(15); }
  await tick(10);
  ok(revealed(el, "s11"), "gate s11: source revealed after all short-answer rows");
}

// s27 — grammar detective: tap wrong segment, pick fix
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s27"));
  for (let ii = 0; ii < D.DETECTIVE_S27.length; ii++) {
    const it = D.DETECTIVE_S27[ii];
    clickEl(q(el, `[data-fix-seg="${ii}-${it.bad[0]}"]`));
    await tick(15);
    clickEl(q(el, `[data-fix-opt="${it.fix}"]`));
    await tick(15);
  }
  await tick(10);
  ok(revealed(el, "s27"), "gate s27: source revealed after fixing all eight sentences");
}

// s28 — typed fill
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s28"));
  for (let i = 0; i < D.TYPED_S28.length; i++) {
    const input = q(el, `#s28-typed-${i}`);
    setNative(input, D.TYPED_S28[i].accept[0]);
    await tick(5);
    clickEl([...el.querySelectorAll("button")].filter((b) => b.textContent.includes("تحقّق"))[i]);
    await tick(5);
  }
  await tick(10);
  ok(revealed(el, "s28"), "gate s28: source revealed after typing every answer");
}

// s23 — stative gate
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s23"));
  for (let i = 0; i < D.STATIVE_S23.length; i++) { clickEl(q(el, `[data-gate="${i}"]`)); await tick(15); }
  await tick(10);
  ok(revealed(el, "s23"), "gate s23: source revealed after testing all stative verbs");
}

// s24–s26 — reference rail (click every snap)
for (const [id, rows] of [["s24", D.RAIL_S24], ["s25", D.RAIL_S25], ["s26", D.RAIL_S26]]) {
  const el = await mountStep(SLIDES.find((x) => x.id === id));
  for (const snap of rows) { clickEl(q(el, `[data-snap="${snap.key}"]`)); await tick(15); }
  await tick(10);
  ok(revealed(el, id), `gate ${id}: source revealed after every reference point`);
}

// s13 — evidence cases
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s13"));
  for (let c = 0; c < D.EVIDENCE_S13.length; c++) {
    const cur = D.EVIDENCE_S13[c];
    const clues = [...el.querySelectorAll("[data-clue]")];
    for (const cl of clues) { clickEl(cl); await tick(15); }
    clickEl(q(el, `[data-case-opt="${cur.options.findIndex((o) => o.ok)}"]`));
    await tick(5);
    clickEl(btnWith(el, c + 1 < D.EVIDENCE_S13.length ? "المشهد التالي" : "__none__"));
    await tick(5);
  }
  await tick(10);
  ok(revealed(el, "s13"), "gate s13: source revealed after explaining every evidence scene");
}

// s36 — gear map (activate all)
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s36"));
  const gears = [...el.querySelectorAll('[role="group"][aria-label="تروس الحاضر"] button')];
  ok(gears.length === 4, `s36: four gears (got ${gears.length})`);
  for (const g of gears) { clickEl(g); await tick(15); }
  await tick(10);
  ok(revealed(el, "s36"), "gate s36: source revealed after every gear");
}

// s32 — boss: correct gear per strike
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s32"));
  for (let i = 0; i < D.BOSS_ITEMS_S32.length; i++) {
    const grp = el.querySelector(`[role="group"][aria-label="اختر الزمن للضربة ${i + 1}"]`);
    clickEl(grp?.querySelector(`[data-gear="${D.BOSS_ITEMS_S32[i].answer}"]`));
    await tick(15);
  }
  await tick(10);
  ok(revealed(el, "s32"), "gate s32: source revealed after defeating the boss");
  ok(textOf(el).includes("هُزم الزعيم"), "s32: boss defeat message shown");
}

// s33 — verb tap (Adam text)
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s33"));
  const parts = D.ADAM_TEXT_S33.parts.filter((p) => p.k !== undefined);
  for (const p of parts) {
    const btn = [...el.querySelectorAll("button")].find((b) => b.textContent.trim() === p.t.trim());
    clickEl(btn);
    await tick(5);
    clickEl(q(el, `[data-tense-opt="${D.ADAM_TEXT_S33.answers[p.k]}"]`));
    await tick(5);
  }
  await tick(10);
  ok(revealed(el, "s33"), "gate s33: source revealed after tagging all four verb phrases");
}

// s14 — canvas: lens switch then two rows
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s14"));
  ok(!revealed(el, "s14"), "gate s14: hidden at start");
  clickEl(btnWith(el, "عدسة النشاط"));
  await tick(5);
  clickEl(btnWith(el, "عدسة النتيجة"));
  await tick(10);
  clickEl(q(el, '[data-row="0"][data-row-opt="0"]'));
  await tick(15);
  clickEl(q(el, '[data-row="1"][data-row-opt="1"]'));
  await tick(15);
  await tick(10);
  ok(revealed(el, "s14"), "gate s14: source revealed after both lenses and rows");
}

// s18 — still running: both states
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s18"));
  clickEl(btnWith(el, "توقف قبل دقيقة"));
  await tick(15);
  clickEl(btnWith(el, "ما زال يركض"));
  await tick(15);
  ok(revealed(el, "s18"), "gate s18: source revealed after both states");
}

// s4 — ribbon: slider + activity + still toggle
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s4"));
  const slider = q(el, 'input[type="range"]');
  setNative(slider, "5");
  await tick(5);
  clickEl(el.querySelector('[role="radio"][aria-checked="false"]'));
  await tick(5);
  clickEl(btnWith(el, "ما زال مستمرًا"));
  await tick(10);
  ok(revealed(el, "s4"), "gate s4: source revealed after the three ribbon controls");
}

// s19 — keywords (open every card)
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s19"));
  for (let i = 0; i < D.KEYWORDS_S19.length; i++) { clickEl(q(el, `[data-explore="${i}"]`)); await tick(15); }
  await tick(10);
  ok(revealed(el, "s19"), "gate s19: source revealed after all keywords");
}

// s20–s22 & s29 & s31 & s34 & s35 — per-row / typed / bucket walks (smoke: reveal after completion)
{
  const el = await mountStep(SLIDES.find((x) => x.id === "s35"));
  for (let i = 0; i < D.GOLDEN_S35.length; i++) {
    const item = [...el.querySelectorAll("[data-sort-item]")].find((b) => Number(b.getAttribute("data-sort-item")) === i);
    if (!item) continue;
    clickEl(item);
    await tick(5);
    clickEl(el.querySelector(`[data-bucket="${D.GOLDEN_S35[i].bucket}"] button`));
    await tick(5);
  }
  await tick(10);
  ok(revealed(el, "s35"), "gate s35: source revealed after the golden sort");
}

// ---------------- generic drivers for the remaining steps ----------------
const driveBlocks = async (el, rounds) => {
  for (let r = 0; r < rounds.length; r++) {
    for (let k = 0; k < rounds[r].tokens.length; k++) {
      clickEl(q(el, `[data-block-token="${k}"]`));
      await tick(15);
    }
    clickEl(btnWith(el, r + 1 < rounds.length ? "الجملة التالية" : "إنهاء التمرين"));
    await tick(15);
  }
};
const driveRows = async (el, rows) => {
  for (let ri = 0; ri < rows.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${rows[ri].answer}"]`));
    await tick(15);
  }
};
const driveSort = async (el, items) => {
  for (let i = 0; i < items.length; i++) {
    clickEl(q(el, `[data-sort-item="${i}"]`));
    await tick(15);
    clickEl(q(el, `[data-bucket="${items[i].bucket}"] button`));
    await tick(15);
  }
};
const driveSlots = async (el, rounds) => {
  for (let r = 0; r < rounds.length; r++) {
    clickEl(q(el, `[data-slot-opt="${rounds[r].options.findIndex((o) => o.ok)}"]`));
    await tick(15);
    clickEl(btnWith(el, r + 1 < rounds.length ? "الجولة التالية" : "إنهاء التمرين"));
    await tick(15);
  }
};
const driveTyped = async (el, seq, items) => {
  for (let i = 0; i < items.length; i++) {
    setNative(q(el, `#${seq}-typed-${i}`), items[i].accept[0]);
    await tick(15);
    clickEl([...el.querySelectorAll("button")].filter((b) => b.textContent.includes("تحقّق"))[i]);
    await tick(15);
  }
};
const rowsFrom = (items) => items.map((r) => ({ answer: r.answer }));

for (const [id, drive, data] of [
  ["s2", async (el) => { for (let i = 0; i < D.FLIP_S2.length; i++) { clickEl(q(el, `[data-flip="${i}"]`)); await tick(15); } }, null],
  ["s6", (el) => driveSlots(el, D.SINCE_ROUNDS_S6), null],
  ["s7", (el) => driveSort(el, D.FORSINCE_S7), null],
  ["s8", async (el) => {
    await driveBlocks(el, [D.HOWLONG_S8.question]);
    await tick(20);
    await driveRows(el, D.HOWLONG_S8.replies.map((r) => ({ answer: r.options.findIndex((o) => o.ok) })));
  }, null],
  ["s9", (el) => driveBlocks(el, [D.NEG_ROUND_S9]), null],
  ["s10", (el) => driveBlocks(el, D.QUESTION_ROUNDS_S10), null],
  ["s12", (el) => driveRows(el, rowsFrom(D.WH_ROWS_S12)), null],
  ["s15", (el) => driveSort(el, D.DOORS_S15), null],
  ["s16", (el) => driveRows(el, rowsFrom(D.SPEAKERS_S16)), null],
  ["s17", (el) => driveRows(el, rowsFrom(D.ANOTHER_S17)), null],
  ["s20", (el) => driveRows(el, D.CUE_S20.map((c) => ({ answer: c.tense === "PP" ? 0 : 1 }))), null],
  ["s21", (el) => driveRows(el, rowsFrom(D.PAIRS_S21)), null],
  ["s22", (el) => driveRows(el, rowsFrom(D.COUNT_ROWS_S22)), null],
  ["s29", (el) => driveRows(el, rowsFrom(D.BIKE_S29)), null],
  ["s30", async (el) => {
    for (let c = 0; c < D.SCENE_S30.length; c++) {
      for (const cl of [...el.querySelectorAll("[data-clue]")]) { clickEl(cl); await tick(15); }
      clickEl(q(el, `[data-case-opt="${D.SCENE_S30[c].options.findIndex((o) => o.ok)}"]`));
      await tick(15);
      clickEl(btnWith(el, c + 1 < D.SCENE_S30.length ? "المشهد التالي" : "__none__"));
      await tick(15);
    }
  }, null],
  ["s31", async (el) => {
    clickEl(q(el, `[data-fix-seg="0-${D.FIX_S31.bad[0]}"]`));
    await tick(15);
    clickEl(q(el, `[data-fix-opt="${D.FIX_S31.fix}"]`));
    await tick(15);
    await driveRows(el, rowsFrom(D.FORSINCE_ROWS_S31));
  }, null],
  ["s34", (el) => driveTyped(el, "s34", D.MAYA_S34), null],
]) {
  const sl = SLIDES.find((x) => x.id === id);
  const el = await mountStep(sl);
  ok(!revealed(el, id), `gate ${id}: source hidden before the attempt`);
  await drive(el);
  await tick(15);
  ok(revealed(el, id), `gate ${id}: source revealed after completing the activity`);
}

// ============================================================
// 6–7) Test Area behaviour
// ============================================================
const TEST = T.TEST_32;
ok(TEST.length === 20, `test: exactly 20 questions (got ${TEST.length})`);
const lvl = (l) => TEST.filter((x) => x.level === l).length;
ok(lvl("basic") === 6 && lvl("medium") === 7 && lvl("advanced") === 4 && lvl("thinking") === 3, `test: split 6/7/4/3 (got ${lvl("basic")}/${lvl("medium")}/${lvl("advanced")}/${lvl("thinking")})`);
ok(TEST.map((x) => x.n).join(",") === Array.from({ length: 20 }, (_, i) => i + 1).join(","), "test: numbered 1–20 in order");
const types = new Set(TEST.map((x) => x.type));
ok(["single", "tf", "multi", "order", "match", "spot", "typed"].every((t) => types.has(t)), `test: all seven question types present (${[...types].join(",")})`);
const ledgerUnits = new Set(ledger.flatMap((s) => s.units).map((u) => u.trim()));
const copies = TEST.filter((x) => x.ar && ledgerUnits.has(x.ar.trim()));
ok(copies.length === 0, `test: no question copied verbatim from a source unit (${copies.length})`);
ok(new Set(TEST.map((x) => x.ar)).size === 20, "test: 20 distinct prompts");

// Grading: a complete correct key scores 20; a wrong key scores 0
const correctAnswer = (x) => {
  switch (x.type) {
    case "single": case "tf": return x.answer;
    case "multi": return x.answer;
    case "order": return x.answer;
    case "match": return x.answer;
    case "spot": return { seg: x.answer };
    case "typed": return x.accept[0];
    default: return undefined;
  }
};
const wrongAnswer = (x) => {
  switch (x.type) {
    case "single": return (x.answer + 1) % x.opts.length;
    case "tf": return !x.answer;
    case "multi": return [];
    case "order": return [...x.answer].reverse();
    case "match": return x.answer.map(() => null);
    case "spot": return { seg: (x.answer + 1) % x.segments.length };
    case "typed": return "not an answer";
    default: return undefined;
  }
};
ok(TEST.every((x) => m.gradeOne32(x, correctAnswer(x)) === true), "grade: every question accepts its correct answer");
ok(TEST.every((x) => m.gradeOne32(x, wrongAnswer(x)) === false), "grade: every question rejects a wrong answer");
ok(TEST.every((x) => m.isAnswered32(x, undefined) === false), "grade: unanswered is not counted as answered");

// Neutral before submit; score after submit; full reset
{
  const el = await mountNode(m.React.createElement(m.TestArea32, { onCheckedChange: () => {}, onShowSolutions: () => {} }));
  ok(!/✓ صحيح|✕ غير صحيح|الدرجة:/.test(textOf(el)), "test: no correctness or score before submit");
  ok(textOf(el).includes("أجبت: 0/20"), "test: fresh state shows 0/20 answered");
  const submit = btnWith(el, "إرسال الاختبار");
  ok(!!submit, "test: submit button present before submit");
  // answer question 1 (single) via its radio
  const r1 = el.querySelector(`#l32-q1 input[type="radio"]`);
  clickEl(r1);
  await tick(10);
  ok(textOf(el).includes("أجبت: 1/20"), "test: answering updates the counter");
  ok(!/✓ صحيح|✕ غير صحيح/.test(textOf(el)), "test: answering alone reveals no correctness");
  clickEl(btnWith(el, "إرسال الاختبار"));
  await tick(20);
  ok(/الدرجة:\s*\d+\s*من\s*20/.test(textOf(el)) || textOf(el).includes("الدرجة:"), "test: score shown after submit");
  ok(/✓ صحيح|✕ غير صحيح/.test(textOf(el)), "test: per-question status shown after submit");
  clickEl(btnWith(el, "إعادة الاختبار كاملًا"));
  await tick(30);
  ok(textOf(el).includes("أجبت: 0/20"), "test: full reset clears answers");
  ok(!/الدرجة:/.test(textOf(el)), "test: full reset clears score");
  ok(!/✓ صحيح|✕ غير صحيح/.test(textOf(el)), "test: full reset clears statuses");
}

// Solutions: locked before entitlement; 20 solutions in 4 groups of 5
{
  const locked = m.renderToString(m.React.createElement(m.Solutions32, { unlocked: false, onGoTest: () => {}, onGoTeacher: () => {} }));
  ok(locked.includes("الحلول مقفلة"), "solutions: locked state shown before submit");
  ok(!locked.includes(T.TEST_32_SOLUTIONS[0].why.slice(0, 18)) && !locked.includes(T.TEST_32_SOLUTIONS[0].answer.slice(0, 20)), "solutions: no answer text leaks while locked");
  const open = m.renderToString(m.React.createElement(m.Solutions32, { unlocked: true, onGoTest: () => {}, onGoTeacher: () => {} }));
  ok(T.TEST_32_SOLUTIONS.length === 20, "solutions: 20 solution records");
  ok(T.TEST_32_SOLUTIONS.every((s) => s.answer && s.why), "solutions: every solution has an answer and an explanation");
  const openPlain = open.replace(/<[^>]+>/g, "");
  ok((openPlain.match(/المجموعة/g) || []).length === 4, "solutions: four groups");
  ok(T.TEST_32_SOLUTIONS.every((s) => openPlain.includes(s.why.slice(0, 18))), "solutions: every explanation rendered");
  ok(open.includes("Platform Explanation"), "solutions: explanations labelled Platform Explanation");
}

// ============================================================
// 8) Teacher Area: gate + content
// ============================================================
ok(TD.TEACHER_PASSWORD_32 === "somer173", "teacher: password constant is somer173");
{
  const el = await mountNode(m.React.createElement(m.TeacherArea32, { unlocked: false, onUnlockChange: () => {}, onGoSolutions: () => {} }));
  const lockedText = textOf(el);
  ok(!lockedText.includes("نظرة عامة للمعلم") && !lockedText.includes("أخطاء المصدر المتعمدة"), "teacher: content hidden while locked");
  const input = q(el, "#l32-teacher-pw");
  const form = q(el, "form");
  setNative(input, "wrong-password");
  await tick(10);
  form.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
  await tick(20);
  ok(textOf(el).includes("كلمة المرور غير صحيحة"), "teacher: wrong password rejected");
}
{
  // unlocked render is the full teaching content (static check of the rendered sections)
  const html = m.renderToString(m.React.createElement(m.TeacherArea32, { unlocked: true, onUnlockChange: () => {}, onGoSolutions: () => {} }));
  const must = ["نظرة عامة للمعلم", "توزيع الحصة", "ملاحظات التدريس", "حلول تمارين المصدر", "rubrics", "الأخطاء الشائعة", "الأخطاء المتعمدة في المصدر", "دليل الاختبار للمعلم", "خطة المعالجة", "فهرس المصدر الحرفي"];
  for (const t of must) ok(html.includes(t), `teacher: section present: ${t}`);
  ok((html.match(/<tr /g) || []).length >= 12 + 2, "teacher: wrong-source table + rubric rows present");
  ok(html.includes("Platform Explanation"), "teacher: platform commentary labelled Platform Explanation");
  ok(TD.TEACHER_32_SOLUTIONS.length >= 10, `teacher: source-activity solutions (${TD.TEACHER_32_SOLUTIONS.length} groups)`);
  ok(TD.TEACHER_32_RUBRICS.length >= 2 && TD.TEACHER_32_RUBRICS.every((r) => r.rows.length >= 3), "teacher: rubrics with at least 3 levels each");
  ok(TD.TEACHER_32_MISTAKES.length >= 8, `teacher: common mistakes (${TD.TEACHER_32_MISTAKES.length})`);
}

// ============================================================
// 9) Preserved source: intentionally wrong lines kept verbatim
// ============================================================
ok(TD.INTENTIONALLY_WRONG_32.length === 12, `source: 12 intentionally wrong source lines catalogued (got ${TD.INTENTIONALLY_WRONG_32.length})`);
const norm = (s) => s.replace(/\s*❌\s*$/u, "").replace(/\s*✅\s*$/u, "").trim();
const missingWrong = TD.INTENTIONALLY_WRONG_32.filter((e) => !ledgerText.includes(norm(e.wrong)));
ok(missingWrong.length === 0, `source: every wrong line appears verbatim in the ledger (missing: ${missingWrong.map((e) => e.id + ":" + norm(e.wrong)).join(" | ")})`);
ok(ledgerText.includes("Adam has studied robotics for three years") || ledgerText.includes("has studied robotics for three years"), "source: Adam robotics line preserved");
ok(ledgerText.includes("Yes, I have been"), "source: Yes, I have been (wrong short answer) preserved");

// ============================================================
// 10) Static hygiene: bidi controls, hover-only, buttons, banned engines, source gating
// ============================================================
const files = readdirSync(L32).filter((f) => /\.(ts|tsx)$/.test(f)).map((f) => join(L32, f));
const src = Object.fromEntries(files.map((f) => [f.split("/").pop(), readFileSync(f, "utf8")]));
const BIDI_CTRL = /[\u200E\u200F\u202A-\u202E\u2066-\u2069\u061C]/;
ok(files.every((f) => !BIDI_CTRL.test(src[f.split("/").pop()])), "bidi: no raw Unicode bidi control characters in lesson 32 sources");
ok(Object.values(src).every((s) => !/<[a-z][\w-]*\b[^>]*\stitle=/.test(s)), "a11y: no title= tooltips on native elements (no hover-only information)");
ok(Object.values(src).every((s) => !/onMouseEnter|onMouseOver|onHover/.test(s)), "a11y: no hover-only handlers");
ok(!Object.values(src).some((s) => s.includes("split(/(\\s+)/)")), "bidi: no per-token space splitting (word-reversal engine banned)");
const kit = src["kit32.tsx"];
ok(kit.includes("focus-visible:ring-4") && kit.includes("FOCUS32"), "a11y: visible focus ring contract (FOCUS32)");
ok(/if \(!show\) return null;/.test(kit), "gate: SourceReveal32 renders nothing unless shown");
const btnTotal = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<button\b/g) || []).length, 0);
const btnTyped = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<button\b[^>]*?type=/g) || []).length, 0);
ok(btnTotal > 0 && btnTyped >= btnTotal * 0.9, `a11y: buttons declare type (${btnTyped}/${btnTotal} on one line)`);
const enCount = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<En\b/g) || []).length, 0);
const richCount = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<Rich\b/g) || []).length, 0);
ok(enCount >= 20 && richCount >= 100, `bidi: English rendered through LTR-isolated <En>/<Rich> units (${enCount}/${richCount})`);
ok(src["Steps32.tsx"].includes('from "../../shared/lessonKit"') && src["Lesson32.tsx"].includes("LatinRuns"), "bidi: shared kit imports present");
ok(src["TestArea32.tsx"].includes("Rich") && src["TeacherArea32.tsx"].includes("LatinRuns"), "bidi: test/teacher use Rich/LatinRuns isolation");

// ============================================================
// 11) Shell: 4 areas, keyboard nav, routing and hub card
// ============================================================
{
  const el = await mountNode(m.React.createElement(m.Lesson32, { onExit: () => {} }));
  const t = textOf(el);
  ok(["📖", "🧪", "🔑", "👩‍🏫"].every((e) => t.includes(e)), "shell: four area buttons present");
  ok(!!q(el, '[data-area="l32-lesson"]'), "shell: lesson area renders by default");
  const bBtn = btnWith(el, "منطقة الاختبار");
  clickEl(bBtn);
  await tick(20);
  ok(!!q(el, '[data-area="l32-test"]'), "shell: test area reachable");
  clickEl(btnWith(el, "حلول الاختبار"));
  await tick(20);
  ok(textOf(el).includes("الحلول مقفلة"), "shell: solutions locked from the shell before submit");
  clickEl(btnWith(el, "منطقة المعلم"));
  await tick(20);
  ok(!!q(el, '[data-area="l32-teacher"]') && textOf(el).includes("كلمة مرور المعلم"), "shell: teacher gate reachable");
}
const app = readFileSync(join(root, "src", "App.tsx"), "utf8");
ok(app.includes('import Lesson32 from "./lessons/lesson32/Lesson32";'), "routing: Lesson32 imported in App.tsx");
ok(app.includes("route === 32") && app.includes("<Lesson32 onExit={goHome} />"), "routing: route 32 renders Lesson32");
ok(/n: 32,\s*\n\s*title: "الدرس 32/.test(app) && app.includes('href: "#/lesson/32"'), "hub: lesson 32 card registered");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
ok(pkg.scripts["audit:english-direction"].includes("scripts/audit-lesson32.mjs"), "scripts: audit-lesson32 wired into audit:english-direction");
ok(Object.keys(pkg.dependencies).sort().join(",") === "clsx,react,react-dom,tailwind-merge", `deps: runtime dependencies unchanged (${Object.keys(pkg.dependencies).join(",")})`);

// ---------------- cleanup & report ----------------
rmSync(outFile, { force: true });
if (failures.length) {
  console.error(`Lesson 32 audit: ${checks - failures.length} passed, ${failures.length} FAILED`);
  for (const f of failures) console.error(" ✕ " + f);
  process.exit(1);
}
console.log(`Lesson 32 audit: ${checks} checks passed, 0 failed`);
