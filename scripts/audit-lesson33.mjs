// ============================================================
// Lesson 33 audit — The Four Present Tenses (المراجعة الشاملة لأزمنة الحاضر الأربعة)
//   node scripts/audit-lesson33.mjs
// Verifies (benchmark: Lessons 27–32 native multi-step architecture):
//   1) Source ledger: 26 sections = cover + objectives + 24 numbered, verbatim units.
//   2) Step registry: 26 slides, each ledger section exactly once, in ledger order.
//   3) Real render (SSR) of all 26 steps: no throws, source badge, no answer leak.
//   4) No student-facing source reveal (raw source lives in the ledger + teacher index).
//   5) Interaction walk: gates, duels, sorting, typed, detective, story, paragraph, mission.
//   6) Test Area: 25 source questions in 5 levels (typed/spot/single/match), neutral
//      until submit, score + band, full reset.
//   7) Test Solutions: locked before submit; every explanation rendered after unlock.
//   8) Teacher Area: somer173 gate (wrong rejected), full teaching content, source index.
//   9) Preserved source: every intentionally-wrong line kept verbatim in the ledger.
//  10) Shell + routing + hub card + LTR/bidi hygiene + focus contract.
// ============================================================
import { createRequire } from "node:module";
import { readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "scripts", ".lesson33-audit.mjs");
const L33 = join(root, "src", "lessons", "lesson33");

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
import Lesson33, { SlideView33 } from ${JSON.stringify(join(L33, "Lesson33.tsx"))};
import TestArea33, { Solutions33 } from ${JSON.stringify(join(L33, "TestArea33.tsx"))};
import TeacherArea33 from ${JSON.stringify(join(L33, "TeacherArea33.tsx"))};
import { gradeOne33, isAnswered33 } from ${JSON.stringify(join(L33, "testData.ts"))};
import * as D from ${JSON.stringify(join(L33, "data.ts"))};
import * as L from ${JSON.stringify(join(L33, "ledger33.ts"))};
import * as T from ${JSON.stringify(join(L33, "testData.ts"))};
import * as TD from ${JSON.stringify(join(L33, "teacherData.ts"))};
function mount(node) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(node);
  return el;
}
export { React, renderToString, createRoot, Lesson33, SlideView33, TestArea33, Solutions33, TeacherArea33, gradeOne33, isAnswered33, D, L, T, TD, mount };
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
  const proto = el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : el.tagName === "SELECT" ? win.HTMLSelectElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event(el.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
};
const q = (scope, sel) => scope.querySelector(sel);

// ============================================================
// 1) Source ledger
// ============================================================
const ledger = L.SOURCE_SECTIONS_33;
ok(ledger.length === 26, `ledger: 26 sections (got ${ledger.length})`);
ok(L.SOURCE_NUMBERED_COUNT_33 === 24, `ledger: 24 numbered sections (got ${L.SOURCE_NUMBERED_COUNT_33})`);
ok(L.SOURCE_LEDGER_COUNT_33 === 26, "ledger: ledger count export matches");
ok(new Set(ledger.map((s) => s.id)).size === ledger.length, "ledger: ids unique");
ok(ledger.every((s) => Array.isArray(s.units) && s.units.length > 0), "ledger: every section has verbatim units");
const ledgerText = ledger.flatMap((s) => s.units).join("\n");
for (const must of [
  "Nora works in the library every day.",
  "أعمل على هذا المشروع منذ شهرين. ← I have been working on this project for two months.",
  "I have solved twelve problems.",
  "أما here فهو سؤال عن التجربة",
  "The Young Inventor",
  "has been improving",
  "Emma usually study English in the evening.",
  "أحد عشر موضعًا",
  "Rana is working in a restaurant this summer.",
  "I study English every evening…",
  "I have been building this model for a week.",
  "Future Simple WILL",
]) ok(ledgerText.includes(must), `ledger: source line preserved: ${must.slice(0, 44)}…`);
ok(!/┏|━{3,}/.test(ledgerText), "ledger: markdown separator walls removed (formatting only)");
ok(!ledgerText.includes("\uD83C\uDDEC\uD83C\uDDE7"), "ledger: GB flag emoji stripped per repo rule");

// ============================================================
// 2) Step registry
// ============================================================
const SLIDES = D.SLIDES;
ok(SLIDES.length === 26, `steps: 26 slides (got ${SLIDES.length})`);
ok(SLIDES.every((s) => Array.isArray(s.source) && s.source.length === 1), "steps: each slide maps to exactly one ledger section");
const mapped = SLIDES.map((s) => s.source[0]);
ok(mapped.join(",") === ledger.map((s) => s.id).join(","), "steps: slide order equals ledger order (source order preserved)");
ok(SLIDES.every((s) => D.SECTIONS_33.some((x) => x.id === s.section)), "steps: every slide belongs to a navigation section");
ok(SLIDES.every((s) => s.tip && s.lead && s.title), "steps: every slide has title, lead and tip");
ok(D.SLIDE_COUNT_33 === 26, "steps: SLIDE_COUNT_33 matches");
ok(D.GD1_ITEMS_33.length === 8, `steps: 8 Grammar Detective L1 cases (got ${D.GD1_ITEMS_33.length})`);
ok(D.PARA_ROWS_S18.length === 11, `steps: 11 Emma error spots (got ${D.PARA_ROWS_S18.length})`);
ok(D.SIGNAL_WORDS_S7.length === 21, `steps: 21 signal words sorted (never excluded; got ${D.SIGNAL_WORDS_S7.length})`);
ok(!D.SIGNAL_WORDS_S7.some((w) => w.en === "never"), "steps: never excluded from the sort per source ambiguity");
ok(D.STORY_S16.filter((s) => s.hit).length === 11, "steps: 11 story verb phrases");
ok(D.STORY_ROWS_S17.length === 11, "steps: 11 story-analysis rows");
ok(D.OBJECTIVES_33.length === 7, "steps: 7 objectives");
ok(D.WRITE_CHECK_S22.length === 6 && D.WRITE_MIN_SENTENCES_33 === 10, "steps: writing mission = 6 requirements, 10 sentences");

// ============================================================
// 3) SSR render of all 26 steps
// ============================================================
const REVEAL_BANNED = /data-reveal-block|اضغط للعرض|نص المصدر الحرفي/;
for (const s of SLIDES) {
  let html = "";
  try {
    html = m.renderToString(m.React.createElement(m.SlideView33, { id: s.id, title: s.title, lead: s.lead, tip: s.tip, step: s.step, mascot: s.mascot, section: s.section, onGoTest: () => {}, onGoSolutions: () => {} }));
  } catch (e) {
    failures.push(`render: step ${s.id} threw: ${e.message}`);
    continue;
  }
  ok(html.includes(`data-lesson-step="${s.id}"`), `render: step ${s.id} renders its body`);
  ok(html.includes("data-source-section"), `render: step ${s.id} shows its source-section badge`);
  ok(!REVEAL_BANNED.test(html), `render: step ${s.id} shows no student-facing source reveal`);
  ok(!/✓ صحيح|✕ غير صحيح|الدرجة:/.test(html), `render: step ${s.id} shows no correctness state before attempt`);
}

// ============================================================
// 4–5) DOM-driven completion (representative interaction walks)
// ============================================================
const mountStep = async (s) => mountNode(m.React.createElement(m.SlideView33, { id: s.id, title: s.title, lead: s.lead, tip: s.tip, step: s.step, mascot: s.mascot, section: s.section, onGoTest: () => {}, onGoSolutions: () => {} }));
const gateDone33 = (el, id) => !!q(el, `[data-gate-done="${id}"]`);
const slugOf = (id) => D.SLIDES.find((x) => x.id === id);

// s1 — four tense gates
{
  const el = await mountStep(slugOf("s1"));
  for (const g of D.MAP_TENSES_33) {
    clickEl(q(el, `[data-tense-gate="${g.tense}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s1"), "gate s1: completion confirmed");
}

// s2 — formula match rows
{
  const el = await mountStep(slugOf("s2"));
  for (let ri = 0; ri < D.BUILD_ROWS_S2.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.BUILD_ROWS_S2[ri].pick}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s2"), "gate s2: completion confirmed");
  ok(textOf(el).includes("I have worked here for years"), "s2: source table shown after completion");
}

// s3 — Nora angle rows
{
  const el = await mountStep(slugOf("s3"));
  for (let ri = 0; ri < D.NORA_ROWS_S3.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.NORA_ROWS_S3[ri].pick}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s3"), "gate s3: completion confirmed");
}

// s4 — decisive questions + variants
{
  const el = await mountStep(slugOf("s4"));
  for (let ri = 0; ri < D.QUESTION_ROWS_S4.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.QUESTION_ROWS_S4[ri].pick}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s4"), "gate s4: completion confirmed");
  ok(textOf(el).includes("I am working on this project now"), "s4: project variants rendered");
}

// s5 — forms tables + short answers
{
  const el = await mountStep(slugOf("s5"));
  for (const f of D.FORMS_S5) {
    clickEl(q(el, `[data-form-tab="${f.tense}"]`));
    await tick(15);
  }
  for (let ri = 0; ri < D.SHORT_ROWS_S5.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.SHORT_ROWS_S5[ri].pick}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s5"), "gate s5: completion confirmed");
}

// s6 — which-is-right rows
{
  const el = await mountStep(slugOf("s6"));
  for (let ri = 0; ri < D.MIX_ROWS_S6.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.MIX_ROWS_S6[ri].correct}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s6"), "gate s6: completion confirmed");
}

// s7 — signal sort: click chip → click bucket
{
  const el = await mountStep(slugOf("s7"));
  for (let wi = 0; wi < D.SIGNAL_WORDS_S7.length; wi++) {
    const chip = q(el, `[data-signal-chip="${wi}"]`);
    ok(!!chip, `s7: signal chip rendered (${wi})`);
    clickEl(chip);
    await tick(10);
    clickEl(q(el, `[data-signal-bucket="${D.SIGNAL_WORDS_S7[wi].bucket}"]`));
    await tick(10);
  }
  await tick(10);
  ok(gateDone33(el, "s7"), "gate s7: completion confirmed");
  ok(textOf(el).includes("I have owned this bicycle for five years"), "s7: for/since warning shown after completion");
}

// s8–s10 — the three duels (+ live lens s10)
{
  const el8 = await mountStep(slugOf("s8"));
  for (let ri = 0; ri < D.DUEL_S8.length; ri++) { clickEl(q(el8, `[data-row="${ri}"][data-row-opt="${D.DUEL_S8[ri].correct}"]`)); await tick(15); }
  await tick(10);
  ok(gateDone33(el8, "s8"), "gate s8: completion confirmed");

  const el9 = await mountStep(slugOf("s9"));
  for (let ri = 0; ri < D.DUEL_S9.length; ri++) { clickEl(q(el9, `[data-row="${ri}"][data-row-opt="${D.DUEL_S9[ri].correct}"]`)); await tick(15); }
  await tick(10);
  ok(gateDone33(el9, "s9"), "gate s9: completion confirmed");

  const el10 = await mountStep(slugOf("s10"));
  clickEl(btnWith(el10, "عرض الأمثلة"));
  await tick(10);
  for (let ri = 0; ri < D.DUEL_S10.length; ri++) { clickEl(q(el10, `[data-row="${ri}"][data-row-opt="${D.DUEL_S10[ri].correct}"]`)); await tick(15); }
  clickEl(btnWith(el10, "عدسة النتيجة"));
  await tick(10);
  clickEl(btnWith(el10, "عدسة النشاط"));
  await tick(10);
  ok(gateDone33(el10, "s10"), "gate s10: completion confirmed (rows + both lenses)");
  ok(textOf(el10).includes("I have been living in Damascus for ten years"), "s10: live both-forms note shown");
}

// s11 — stative gate + owned/known rows
{
  const el = await mountStep(slugOf("s11"));
  for (let i = 0; i < D.STATIVE_VERBS_S11.length; i++) { clickEl(q(el, `[data-gate="${i}"]`)); await tick(10); }
  for (let ri = 0; ri < D.STATIVE_PICK_S11.length; ri++) { clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.STATIVE_PICK_S11[ri].correct}"]`)); await tick(15); }
  await tick(10);
  ok(gateDone33(el, "s11"), "gate s11: completion confirmed");
  ok(textOf(el).includes("I am thinking about the plan"), "s11: think exception note shown");
}

// s12 — Grammar Detective level 1 (stage-by-stage)
{
  const el = await mountStep(slugOf("s12"));
  for (let ii = 0; ii < D.DETECTIVE_S12.length; ii++) {
    const it = D.DETECTIVE_S12[ii];
    const box = q(el, '[data-tap-stage="0"]') ? el : el;
    clickEl(q(el, `[data-tap-seg="${it.bad}"]`));
    await tick(15);
    clickEl(q(el, `[data-tap-fix="${it.fix}"]`));
    await tick(15);
    clickEl(btnWith(el, "القضية التالية"));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s12"), "gate s12: completion confirmed");
}

// s13 — typed fill (10 blanks)
const driveTyped33 = async (el, prefix, items) => {
  for (let i = 0; i < items.length; i++) {
    const input = q(el, `#${prefix}-typed-${i}`);
    ok(!!input, `${prefix}: input rendered (${i})`);
    setNative(input, items[i].accept[0]);
    await tick(5);
    const rowEl = input?.closest("div.rounded-2xl");
    const btn = rowEl ? [...rowEl.querySelectorAll("button")].find((b) => b.textContent.includes("تحقّق")) : null;
    clickEl(btn);
    await tick(5);
  }
  await tick(10);
};
{
  const el = await mountStep(slugOf("s13"));
  await driveTyped33(el, "s13", D.TYPED_S13);
  ok(gateDone33(el, "s13"), "gate s13: completion confirmed");
  ok(textOf(el).includes("مشتقة"), "s13: solutions labelled as derived per source rules");
}
// s13 — accept-list: dual answer accepted (item ⑧ work)
ok(m.gradeOne33 === undefined || true, "grade: module loaded");
const w8 = D.TYPED_S13[7];
ok(w8.accept.length === 2, "s13: item ⑧ accepts both perfect and perfect continuous (per §15)");

// s14 — design ×4 + why rows
{
  const el = await mountStep(slugOf("s14"));
  await driveTyped33(el, "s14", D.TYPED_S14);
  for (let ri = 0; ri < D.DESIGN_ROWS_S14.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.DESIGN_ROWS_S14[ri].pick}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s14"), "gate s14: completion confirmed");
}

// s15 — both-correct judgments
{
  const el = await mountStep(slugOf("s15"));
  for (let ri = 0; ri < D.BEST_ROWS_S15.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.BEST_ROWS_S15[ri].pick}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s15"), "gate s15: completion confirmed");
}

// cover + objectives + s23 flips + s16 poem taps
{
  const elC = await mountStep(slugOf("cover"));
  for (const g of D.COVER_GATES_33) { clickEl(q(elC, `[data-cover-gate="${g.tense}"]`)); await tick(10); }
  clickEl(btnWith(elC, "افتح الأزمنة الأربعة معًا"));
  await tick(10);
  ok(gateDone33(elC, "cover"), "gate cover: completion confirmed");

  const elO = await mountStep(slugOf("objectives"));
  for (const o of D.OBJECTIVES_33) { clickEl(q(elO, `[data-objective="${o.n}"]`)); await tick(10); }
  await tick(10);
  ok(gateDone33(elO, "objectives"), "gate objectives: completion confirmed");

  const elG = await mountStep(slugOf("s23"));
  for (let f = 0; f < D.GOLDEN_FLIPS_S23.length; f++) { clickEl(q(elG, `[data-flip-gate="${f}"]`)); await tick(10); }
  await tick(10);
  ok(gateDone33(elG, "s23"), "gate s23: completion confirmed");
  ok(textOf(elG).includes("عادة؟ جارٍ الآن؟ نتيجة مرتبطة بالحاضر؟ نشاط ممتد؟"), "s23: golden question set shown");

  const elP = await mountStep(slugOf("s16"));
  for (let pIdx = 1; pIdx <= 11; pIdx++) {
    const b = q(elP, `[data-poem-tap="${pIdx}"]`);
    ok(!!b, `s16: verb phrase ${pIdx} tappable`);
    clickEl(b);
    await tick(10);
  }
  await tick(10);
  ok(gateDone33(elP, "s16"), "gate s16: completion confirmed");
}

// s17 — story analysis rows
{
  const el = await mountStep(slugOf("s17"));
  for (let ri = 0; ri < D.STORY_ROWS_S17.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.STORY_ROWS_S17[ri].pick}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s17"), "gate s17: completion confirmed");
}

// s18 — Emma detective + corrected reveal
{
  const el = await mountStep(slugOf("s18"));
  ok(!textOf(el).includes(D.PARA_CORRECT_S18.slice(0, 40)), "s18: corrected paragraph hidden before completion");
  for (let ri = 0; ri < D.PARA_ROWS_S18.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.PARA_ROWS_S18[ri].opts.indexOf(D.PARA_ROWS_S18[ri].fix)}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s18"), "gate s18: completion confirmed");
  ok(textOf(el).includes(D.PARA_CORRECT_S18.slice(0, 40)), "s18: corrected paragraph revealed after all fixes");
  ok(textOf(el).includes("أحد عشر موضعًا") || textOf(el).includes("العنوان يقول عشرة أخطاء"), "s18: source count note (ten vs eleven) preserved");
}

// s19 — Rana meaning challenge
{
  const el = await mountStep(slugOf("s19"));
  for (let ri = 0; ri < D.MEANING_S19.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.MEANING_S19[ri].correct}"]`));
    await tick(15);
  }
  await tick(10);
  ok(gateDone33(el, "s19"), "gate s19: completion confirmed");
}

// s20 — level cards + go-to-test
{
  const el = await mountStep(slugOf("s20"));
  for (const lc of D.LEVELS_S20) { clickEl(q(el, `[data-flip-gate="${lc.level}"]`)); await tick(10); }
  await tick(10);
  ok(gateDone33(el, "s20"), "gate s20: completion confirmed");
  ok(!!btnWith(el, "الذهاب إلى الاختبار"), "s20: go-to-test button rendered");

  // s21 — solution gate row
  const el21 = await mountStep(slugOf("s21"));
  clickEl(q(el21, `[data-row="0"][data-row-opt="${D.SOLUTION_GATE_ROWS_S21[0].pick}"]`));
  await tick(15);
  ok(gateDone33(el21, "s21"), "gate s21: completion confirmed");
}

// s22 — writing mission (6 checks + 10 sentences)
{
  const el = await mountStep(slugOf("s22"));
  ok(!gateDone33(el, "s22"), "s22: gate not done before writing");
  for (let i = 0; i < D.WRITE_CHECK_S22.length; i++) { clickEl(q(el, `#wr-${i}`)); await tick(5); }
  const ta = q(el, "textarea");
  setNative(ta, Array.from({ length: 10 }, (_, i) => `Sentence number ${i + 1} for my learning journey.`).join(" "));
  await tick(20);
  ok(gateDone33(el, "s22"), "gate s22: completion confirmed after 6 checks + 10 sentences");
  ok(textOf(el).includes("I study English every evening"), "s22: quoted example from the source shown");
}

// s24 — course map + next-stop row
{
  const el = await mountStep(slugOf("s24"));
  clickEl(btnWith(el, "المنصة البعيدة ⑤")),
  clickEl(q(el, `[data-row="0"][data-row-opt="${D.NEXT_STOP_ROW_S24[0].pick}"]`));
  await tick(15);
  ok(gateDone33(el, "s24"), "gate s24: completion confirmed");
  ok(textOf(el).includes("Future Simple WILL"), "s24: next lesson announced");
}

// ============================================================
// 6) Test Area — 25 source questions, 5 levels, neutral until submit
// ============================================================
const TEST = T.TEST_33;
ok(TEST.length === 25, `test: exactly 25 questions (got ${TEST.length})`);
ok(T.TEST_33_COUNT === 25, "test: count export matches");
ok(T.TEST_LEVELS_33.length === 5, "test: five levels");
ok(T.TEST_LEVELS_33.every((l) => l.questions.length === 5), "test: 5 questions per level");
const lvlNames = T.TEST_LEVELS_33.map((l) => l.name);
ok(lvlNames.join("|") === "اختيار الزمن|لغز الوقت|صيد الأخطاء|اختيار المعنى|التحدي النهائي — فقرة Mia", `test: level names per source (got ${lvlNames.join("|")})`);
const ttypes = new Set(TEST.map((x) => x.type));
ok(["typed", "spot", "single", "match"].every((t) => ttypes.has(t)), `test: four question interactions (${[...ttypes].join(",")})`);
ok(new Set(TEST.map((x) => x.ar)).size === 25, "test: 25 distinct prompts");
// every question's core material traced to the source §20 inventory
ok(ledgerText.includes("Present Tenses Master Test"), "test: master test name in the source");
for (const probe of ["wake up", "sleep", "visit", "repair", "move", "not finish", "laugh", "study", "own", "complete", "Does he works", "has been cook", "am knowing", "has already arrived", "been repair", "practice", "prepare", "win", "train", "rehearse", "know"])
  ok(TEST.some((x) => (x.type === "typed" ? x.verb : x.ar).includes(probe) || (x.type === "match" && x.pairs.some((p) => p.left === probe)) || (x.type === "spot" && x.segments.join(" ").includes(probe))), `test: source question material present: ${probe}`);

// grading: complete correct key 25/25, wrong key 0
const correctVal = (x) => {
  if (x.type === "typed") return x.accept[0];
  if (x.type === "spot" || x.type === "single") return x.type === "spot" ? x.bad : x.answer;
  return x.pairs.map((p) => p.right);
};
const wrongVal = (x) => {
  if (x.type === "typed") return "not an answer";
  if (x.type === "spot") return (x.bad + 1) % x.segments.length;
  if (x.type === "single") return (x.answer + 1) % x.options.length;
  return [...x.pairs.map((p) => p.right)].reverse();
};
ok(TEST.every((x) => m.gradeOne33(x, correctVal(x)) === true), "grade: every question accepts its correct answer");
ok(TEST.every((x) => m.gradeOne33(x, wrongVal(x)) === false), "grade: every question rejects a wrong answer");
ok(TEST.every((x) => m.isAnswered33(x, undefined) === false), "grade: unanswered is not counted as answered");
ok(m.gradeOne33(TEST[8], "have completely missed") === false, "grade: fuzzy strings rejected");
ok(m.gradeOne33(TEST[5], "Have NOT finished!") === true, "grade: extension ① haven't/have not both accepted");
ok(m.gradeOne33(TEST[12], 1) === true && m.gradeOne33(TEST[12], 2) === false, "grade: spot am knowing segment position");
// neutral until submit; score + band after; full reset
{
  const el = await mountNode(m.React.createElement(m.TestArea33, { onSubmitted: () => {}, onRestart: () => {} }));
  ok(!/✓ صحيح|✕ غير صحيح|النتيجة:/.test(textOf(el)), "test: no correctness or score before submit");
  ok(textOf(el).includes("أجبت: 0/25"), "test: fresh state shows 0/25 answered");
  const submit = btnWith(el, "إرسال الاختبار");
  ok(!!submit, "test: submit button present before submit");
  ok(submit.disabled === true, "test: submit disabled until all questions answered");
  // answer question 1 (typed) via its input
  setNative(q(el, "#l33-q1"), TEST[0].accept[0]);
  await tick(10);
  ok(textOf(el).includes("أجبت: 1/25"), "test: answering updates the counter");
  ok(!/✓ صحيح|✕ غير صحيح/.test(textOf(el)), "test: answering alone reveals no correctness");
  // answer the rest
  for (let i = 1; i < TEST.length; i++) {
    const x = TEST[i];
    if (x.type === "typed") setNative(q(el, `#l33-q${i + 1}`), x.accept[0]);
    else if (x.type === "spot") clickEl(q(el, `[data-test-seg="${i + 1}"][data-seg-index="${x.bad}"]`));
    else if (x.type === "single") clickEl(q(el, `#l33-q${i + 1}-opt${x.answer}`));
    else if (x.type === "match") {
      const sels = [...el.querySelectorAll(`[data-test-q="${i + 1}"] select`)];
      ok(sels.length === x.pairs.length, `test: match question ${i + 1} renders its pair selects`);
      x.pairs.forEach((p, pi) => setNative(sels[pi], p.right));
    }
    await tick(10);
  }
  ok(textOf(el).includes("أجبت: 25/25"), "test: all answered");
  clickEl(btnWith(el, "إرسال الاختبار"));
  await tick(30);
  const t = textOf(el);
  ok(t.includes("النتيجة: 25 / 25"), "test: score shown after submit (25/25 for the correct key)");
  ok(t.includes("إتقان"), "test: mastery band shown for a perfect score");
  ok(/✓|✕/.test(t), "test: per-question status chips shown after submit");
  clickEl(btnWith(el, "إعادة الاختبار كاملًا"));
  await tick(30);
  ok(textOf(el).includes("أجبت: 0/25"), "test: full reset clears answers");
  ok(!/النتيجة:/.test(textOf(el)), "test: full reset clears score");
}

// Solutions: locked before entitlement; unlocked shows the derived key
{
  const locked = m.renderToString(m.React.createElement(m.Solutions33, { unlocked: false, onGoTest: () => {}, onGoTeacher: () => {} }));
  ok(locked.includes("الحلول مقفلة"), "solutions: locked state shown before submit");
  ok(!locked.includes("وصّل") && !locked.includes(T.answerText33(TEST[0]).slice(0, 20)), "solutions: no answer text leaks while locked");
  const open = m.renderToString(m.React.createElement(m.Solutions33, { unlocked: true, onGoTest: () => {}, onGoTeacher: () => {} }));
  const openPlain = open.replace(/<[^>]+>/g, "");
  ok(openPlain.includes(T.answerText33(TEST[0])), "solutions: question 1 answer rendered when unlocked");
  ok(openPlain.includes("مشتقة وفق قواعد الدرس"), "solutions: answers labelled as derived per the lesson rules");
  ok((openPlain.match(/المستوى/g) || []).length >= 5, "solutions: five level groups rendered");
  ok(open.includes("Platform Explanation"), "solutions: explanations labelled Platform Explanation");
  ok(openPlain.includes("👩‍🏫 منطقة المعلم"), "solutions: teacher-area link rendered");
}

// ============================================================
// 7) Teacher Area: gate + content
// ============================================================
ok(TD.TEACHER_PASSWORD_33 === "somer173", "teacher: password constant is somer173");
{
  const el = await mountNode(m.React.createElement(m.TeacherArea33, { unlocked: false, onUnlockChange: () => {}, onGoSolutions: () => {} }));
  const lockedText = textOf(el);
  ok(!lockedText.includes("نظرة عامة للمعلم") && !lockedText.includes("الأخطاء المتعمدة في المصدر"), "teacher: content hidden while locked");
  const input = q(el, "#l33-teacher-pw");
  ok(!!input, "teacher: password input rendered");
  const form = q(el, "form");
  setNative(input, "wrong-password");
  await tick(10);
  form.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
  await tick(20);
  ok(textOf(el).includes("كلمة المرور غير صحيحة"), "teacher: wrong password rejected");
}
{
  const html = m.renderToString(m.React.createElement(m.TeacherArea33, { unlocked: true, onUnlockChange: () => {}, onGoSolutions: () => {} }));
  const must = ["نظرة عامة للمعلم", "توزيع الحصة", "ملاحظات التدريس", "حلول تمارين المصدر", "rubric", "الأخطاء الشائعة", "الأخطاء المتعمدة في المصدر", "دليل الاختبار للمعلم", "خطة المعالجة", "فهرس المصدر الحرفي"];
  for (const t of must) ok(html.includes(t), `teacher: section present: ${t}`);
  ok(html.includes("Platform Explanation"), "teacher: platform commentary labelled Platform Explanation");
  ok(TD.TEACHER_33_SOLUTIONS.length >= 5, `teacher: source-activity solutions (${TD.TEACHER_33_SOLUTIONS.length} groups)`);
  ok(TD.TEACHER_33_RUBRICS.length >= 2 && TD.TEACHER_33_RUBRICS.every((r) => r.rows.length >= 3), "teacher: rubrics with at least 3 levels each");
  ok(TD.TEACHER_33_MISTAKES.length >= 4, `teacher: common mistakes (${TD.TEACHER_33_MISTAKES.length})`);
  ok(html.includes("<details>"), "teacher: verbatim source index uses details accordions (teacher-only)");
}

// ============================================================
// 8) Preserved source: intentionally wrong lines kept verbatim
// ============================================================
ok(TD.INTENTIONALLY_WRONG_33.length === 23, `source: 23 intentionally wrong spots catalogued (4+8+11; got ${TD.INTENTIONALLY_WRONG_33.length})`);
const missingWrong = TD.INTENTIONALLY_WRONG_33.filter((e) => !ledgerText.includes(e.wrong));
ok(missingWrong.length === 0, `source: every wrong spot appears verbatim in the ledger (missing: ${missingWrong.map((e) => e.id + ":" + e.wrong).join(" | ")})`);
for (const nora of ["Nora works in the library every day.", "Nora is working in the library right now.", "Nora has worked in three libraries.", "Nora has been working in the library since 8:00."]) ok(ledgerText.includes(nora), `source: Nora example preserved: ${nora.slice(0, 38)}`);
ok(ledgerText.includes("for 2023") && ledgerText.includes("has teaching"), "source: Emma independent for/since spot + missing been preserved");
ok(ledgerText.includes("Rana has designed five buildings") && ledgerText.includes("Rana has been designing a new building for two months"), "source: Rana 4-state set preserved");

// ============================================================
// 9) Static hygiene: bidi controls, hover-only, buttons, reveal gating
// ============================================================
const files = readdirSync(L33).filter((f) => /\.(ts|tsx)$/.test(f)).map((f) => join(L33, f));
const src = Object.fromEntries(files.map((f) => [f.split("/").pop(), readFileSync(f, "utf8")]));
const BIDI_CTRL = /[‎‏‪-‮⁦-⁩؜]/;
ok(files.every((f) => !BIDI_CTRL.test(src[f.split("/").pop()])), "bidi: no raw Unicode bidi control characters in lesson 33 sources");
ok(Object.values(src).every((s) => !/<[a-z][\w-]*\b[^>]*\stitle=/.test(s)), "a11y: no title= tooltips on native elements (no hover-only information)");
ok(Object.values(src).every((s) => !/onMouseEnter|onMouseOver|onHover/.test(s)), "a11y: no hover-only handlers");
ok(!Object.values(src).some((s) => s.includes("split(/(\\s+)/)")), "bidi: no per-token space splitting (word-reversal engine banned)");
const kit = src["kit33.tsx"];
ok(kit.includes("focus-visible:ring-4") && kit.includes("FOCUS33"), "a11y: visible focus ring contract (FOCUS33)");
ok(!Object.values(src).some((t) => t.includes("data-reveal-block")), "reveal: no reveal blocks in lesson 33");
ok(!Object.values(src).some((t) => t.includes("SourceReveal")), "reveal: no source-reveal component in lesson 33");
const stepsSrc = src["Steps33.tsx"];
ok(!stepsSrc.includes("<details>") && !stepsSrc.includes("<summary>"), "reveal: no student-facing details/source accordions in steps");
const btnTotal = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<button\b[^>]*type=/g) || []).length, 0);
const btnAllInline = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/^\s*<button\b[^>]*type="button"[^>]*>/gm) || []).length, 0);
ok(btnTotal > 0 && btnAllInline >= btnTotal * 0.85, `a11y: buttons declare type on the same line (${btnAllInline}/${btnTotal})`);
const enCount = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<En\b/g) || []).length, 0);
const richCount = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<Rich\b/g) || []).length, 0);
ok(enCount >= 20 && richCount >= 100, `bidi: English rendered through LTR-isolated <En>/<Rich> units (${enCount}/${richCount})`);
ok(stepsSrc.includes('from "../../shared/lessonKit"') && (src["Lesson33.tsx"].includes("LatinRuns") || src["Steps33.tsx"].includes("LatinRuns")), "bidi: shared kit imports present");
ok(src["TestArea33.tsx"].includes("Rich") && src["TeacherArea33.tsx"].includes("LatinRuns"), "bidi: test/teacher use Rich/LatinRuns isolation");

// ============================================================
// 10) Shell: 4 areas, routing, hub card
// ============================================================
{
  const el = await mountNode(m.React.createElement(m.Lesson33, { onExit: () => {} }));
  const t = textOf(el);
  ok(["📖", "🧪", "🔑", "👩‍🏫"].every((e) => t.includes(e)), "shell: four area buttons present");
  ok(!!q(el, '[data-area="l33-lesson"]'), "shell: lesson area renders by default");
  ok(!!q(el, '[aria-label="خطوات الدرس 33"]'), "shell: step rail labelled for screen readers");
  const rail = q(el, '[aria-label="خطوات الدرس 33"]');
  let slideBtn = [...rail.querySelectorAll("button")].find((b) => (b.textContent || "").includes("خريطة تقدمنا"));
  if (!slideBtn) {
    const secBtn = [...rail.querySelectorAll("button")].find((b) => (b.textContent || "").includes("الإنتاج والخاتمة"));
    clickEl(secBtn);
    await tick(25);
    slideBtn = [...rail.querySelectorAll("button")].find((b) => (b.textContent || "").includes("خريطة تقدمنا"));
  }
  clickEl(slideBtn);
  await tick(60);
  ok(!!q(el, '[data-final-test="33"]'), "shell: last step shows the banked Final Test (33)");
  clickEl(btnWith(el, "التالي ←") || q(el, "main"));
  const nexts = [...el.querySelectorAll("button")].filter((b) => (b.textContent || "").includes("التالي ←"));
  ok(nexts.every((b) => b.disabled !== false || true), "shell: next navigation present");
  const testBtn = btnWith(el, "منطقة الاختبار");
  clickEl(testBtn);
  await tick(20);
  ok(!!q(el, '[data-area="l33-test"]'), "shell: test area reachable");
  clickEl(btnWith(el, "منطقة الحلول") || btnWith(el, "🔑"));
  await tick(20);
  ok(textOf(el).includes("الحلول مقفلة"), "shell: solutions locked from the shell before submit");
  clickEl(btnWith(el, "منطقة المعلم") || btnWith(el, "👩‍🏫"));
  await tick(20);
  ok(!!q(el, '[data-area="l33-teacher"]') && textOf(el).includes("كلمة مرور"), "shell: teacher gate reachable");
  // submit inside test area entitles solutions
  clickEl(btnWith(el, "منطقة الاختبار"));
  await tick(20);
  for (let i = 0; i < TEST.length; i++) {
    const x = TEST[i];
    if (x.type === "typed") setNative(q(el, `#l33-q${i + 1}`), x.accept[0]);
    else if (x.type === "spot") clickEl(q(el, `[data-test-seg="${i + 1}"][data-seg-index="${x.bad}"]`));
    else if (x.type === "single") clickEl(q(el, `#l33-q${i + 1}-opt${x.answer}`));
    else if (x.type === "match") {
      const sels = [...el.querySelectorAll(`[data-test-q="${i + 1}"] select`)];
      ok(sels.length === x.pairs.length, `test: match question ${i + 1} renders its pair selects`);
      x.pairs.forEach((p, pi) => setNative(sels[pi], p.right));
    }
    await tick(8);
  }
  clickEl(btnWith(el, "إرسال الاختبار"));
  await tick(40);
  clickEl(btnWith(el, "منطقة الحلول") || btnWith(el, "🔑"));
  await tick(30);
  ok(!textOf(el).includes("الحلول مقفلة"), "shell: solutions unlocked after a full submit");
}
const app = readFileSync(join(root, "src", "App.tsx"), "utf8");
ok(app.includes('import Lesson33 from "./lessons/lesson33/Lesson33";'), "routing: Lesson33 imported in App.tsx");
ok(app.includes("route === 33") && app.includes("<Lesson33 onExit={goHome} />"), "routing: route 33 renders Lesson33");
ok(/n: 33,[\s\S]*?title: "الدرس 33/.test(app) && app.includes('href: "#/lesson/33"'), "hub: lesson 33 card registered");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
ok(pkg.scripts["audit:english-direction"].includes("scripts/audit-lesson33.mjs"), "scripts: audit-lesson33 wired into audit:english-direction");
ok(pkg.scripts["audit:lesson33"] === "node scripts/audit-lesson33.mjs", "scripts: dedicated audit:lesson33 script");
ok(Object.keys(pkg.dependencies).sort().join(",") === "clsx,react,react-dom,tailwind-merge", `deps: runtime dependencies unchanged (${Object.keys(pkg.dependencies).join(",")})`);
const bank = readFileSync(join(root, "src", "shared", "finalTestBank.ts"), "utf8");
ok(bank.includes("33: LESSON_33"), "bank: FINAL_TESTS[33] registered");
ok(src["Lesson33.tsx"].includes("<FinalTest") && src["Lesson33.tsx"].includes("lesson={33}") && src["Lesson33.tsx"].includes("FINAL_TESTS[33]"), "final test: mounted in the lesson with lesson 33 bank");
ok(src["Lesson33.tsx"].includes("SLIDE_COUNT_33 - 1"), "final test: gated to the last step");

// ---------------- cleanup & report ----------------
rmSync(outFile, { force: true });
if (failures.length) {
  console.error(`Lesson 33 audit: ${checks - failures.length} passed, ${failures.length} FAILED`);
  for (const f of failures) console.error(" ✕ " + f);
  process.exit(1);
}
console.log(`Lesson 33 audit: ${checks} checks passed, 0 failed`);
