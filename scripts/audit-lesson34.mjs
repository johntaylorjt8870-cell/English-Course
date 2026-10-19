// ============================================================
// Lesson 34 audit — Future Simple (المستقبل البسيط باستخدام will)
//   node scripts/audit-lesson34.mjs
// Verifies (benchmark: Lessons 27–33 native multi-step architecture):
//   1) Source ledger: 40 sections = cover + objectives + 38 numbered, verbatim.
//      (المصدر نفسه يتخطّى الرمز ㊰ — الترقيم محفوظ كما ورد.)
//   2) Step registry: 40 slides, each ledger section exactly once, in ledger order.
//   3) Real render (SSR) of all 40 steps: no throws, source badge, no answer leak.
//   4) No student-facing source reveal (raw source lives in the ledger + teacher index).
//   5) Interaction walk: timeline, functions, objectives, formula, chips, pairs,
//      typed fills, detective, IQ200 situations, story hunt, flips, writing mission.
//   6) Test Area: 25 source questions in 5 levels (single/typed/spot/write),
//      neutral until submit, score + band, full reset.
//   7) Test Solutions: locked before submit; every explanation rendered after unlock.
//   8) Teacher Area: somer173 gate (wrong rejected), full teaching content, source index.
//   9) Preserved source: 29 intentionally-wrong spots kept verbatim in the ledger.
//  10) Shell + routing + hub card + bank registration + LTR/bidi hygiene + focus contract.
// ============================================================
import { createRequire } from "node:module";
import { readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "scripts", ".lesson34-audit.mjs");
const outCss = join(root, "scripts", ".lesson34-audit.css");
const L34 = join(root, "src", "lessons", "lesson34");

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
import Lesson34, { SlideView34 } from ${JSON.stringify(join(L34, "Lesson34.tsx"))};
import TestArea34, { Solutions34 } from ${JSON.stringify(join(L34, "TestArea34.tsx"))};
import TeacherArea34 from ${JSON.stringify(join(L34, "TeacherArea34.tsx"))};
import { gradeOne34, isAnswered34 } from ${JSON.stringify(join(L34, "testData.ts"))};
import * as D from ${JSON.stringify(join(L34, "data.ts"))};
import * as L from ${JSON.stringify(join(L34, "ledger34.ts"))};
import * as T from ${JSON.stringify(join(L34, "testData.ts"))};
import * as TD from ${JSON.stringify(join(L34, "teacherData.ts"))};
function mount(node) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(node);
  return el;
}
export { React, renderToString, createRoot, Lesson34, SlideView34, TestArea34, Solutions34, TeacherArea34, gradeOne34, isAnswered34, D, L, T, TD, mount };
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
  const proto =
    el.tagName === "TEXTAREA"
      ? win.HTMLTextAreaElement.prototype
      : el.tagName === "SELECT"
        ? win.HTMLSelectElement.prototype
        : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event(el.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
};
const q = (scope, sel) => scope.querySelector(sel);

// ============================================================
// 1) Source ledger
// ============================================================
const ledger = L.SOURCE_SECTIONS_34;
ok(ledger.length === 40, `ledger: 40 sections (got ${ledger.length})`);
ok(L.SOURCE_NUMBERED_COUNT_34 === 38, `ledger: 38 numbered sections (got ${L.SOURCE_NUMBERED_COUNT_34})`);
ok(L.SOURCE_LEDGER_COUNT_34 === 40, "ledger: ledger count export matches");
ok(new Set(ledger.map((s) => s.id)).size === ledger.length, "ledger: ids unique");
ok(ledger.every((s) => Array.isArray(s.units) && s.units.length > 0), "ledger: every section has verbatim units");
// الترقيم المحفوظ كما ورد في المصدر (①…㉟ ثم ㊱…㊳ — الرمز ㊰ غير مستخدم)
const romans = ledger.map((s) => s.roman).filter(Boolean);
ok(romans[0] === "①" && romans[romans.length - 1] === "㊳", "ledger: roman range ①…㊳ preserved");
ok(romans.includes("㉟") && !romans.includes("㊰"), "ledger: source skips ㊰ verbatim (no renumbering)");
const ledgerText = ledger.flatMap((s) => [s.title, ...s.units]).join("\n");
for (const must of [
  "The Future Starts Here!",
  "Subject + will + V1 + Rest",
  "القاعدة الذهبية الأولى",
  "She will goes. ❌",
  "He will studied. ❌",
  "They will playing. ❌",
  "I will to travel. ❌",
  "He doesn't will travel. ❌",
  "They will don't come. ❌",
  "She won't goes. ❌",
  "I will not to leave. ❌",
  "The computer won't start, although I've tried several times.",
  "Shall I + V1...?",
  "will not = won't",
  "Yes, I will. ✅",
  "No, she won't. ✅",
  "Wh-word + will + Subject + V1?",
  "Who will help us?",
  "Who will you help?",
  "I am meeting my teacher tomorrow.",
  "هذه فروق تعليمية شائعة وليست حدودًا مطلقة",
  "I will visited my friend. ❌",
  "will be",
  "The School Project",
  "Future Simple Master Test",
  "A Decision That Changed Everything",
  "I'll participate!",
  "My Predictions and Promises",
]) ok(ledgerText.includes(must), `ledger: source line preserved: ${must.slice(0, 44)}…`);
ok(!/┏|━{3,}/.test(ledgerText), "ledger: markdown separator walls removed (formatting only)");
ok(!ledgerText.includes("\uD83C\uDDEC\uD83C\uDDE7"), "ledger: GB flag emoji stripped per repo rule");

// ============================================================
// 2) Step registry
// ============================================================
const SLIDES = D.SLIDES;
ok(SLIDES.length === 40, `steps: 40 slides (got ${SLIDES.length})`);
ok(SLIDES.every((s) => Array.isArray(s.source) && s.source.length === 1), "steps: each slide maps to exactly one ledger section");
const mapped = SLIDES.map((s) => s.source[0]);
ok(mapped.join(",") === ledger.map((s) => s.id).join(","), "steps: slide order equals ledger order (source order preserved)");
ok(SLIDES.every((s) => D.SECTIONS_34.some((x) => x.id === s.section)), "steps: every slide belongs to a navigation section");
ok(SLIDES.every((s) => s.tip && s.lead && s.title), "steps: every slide has title, lead and tip");
ok(D.SLIDE_COUNT_34 === 40, "steps: SLIDE_COUNT_34 matches");
ok(D.OBJECTIVES_34.length === 9, `steps: 9 objectives (got ${D.OBJECTIVES_34.length})`);
ok(D.PRONOUN_FORMS_34.length === 7, `steps: 7 pronoun forms (got ${D.PRONOUN_FORMS_34.length})`);
ok(D.USE_CARDS_S5.length === 6, `steps: 6 will uses (got ${D.USE_CARDS_S5.length})`);
ok(D.CONTRACTIONS_34.length === 7, `steps: 7 contractions (got ${D.CONTRACTIONS_34.length})`);
ok(D.WH_WORDS_S19.length === 8, `steps: 8 Wh-words (got ${D.WH_WORDS_S19.length})`);
ok(D.TIME_WORDS_S21.length === 11, `steps: 11 time expressions (got ${D.TIME_WORDS_S21.length})`);
ok(D.MC_ROWS_S28.length === 6, `steps: 6 foundational drill items (got ${D.MC_ROWS_S28.length})`);
ok(D.TRANSFORM_ROWS_S29.length === 5, `steps: 5 transform items (got ${D.TRANSFORM_ROWS_S29.length})`);
ok(D.DETECTIVE_S30.length === 10, `steps: 10 Grammar Detective cases (got ${D.DETECTIVE_S30.length})`);
ok(D.IQ_SITUATIONS_S31.length === 4, `steps: 4 IQ200 situations (got ${D.IQ_SITUATIONS_S31.length})`);
ok(D.STORY_HITS_S32 === 10, `steps: 10 will phrases in the story (got ${D.STORY_HITS_S32})`);
ok(D.COMPREHENSION_S32.length === 7, `steps: 7 reading questions (got ${D.COMPREHENSION_S32.length})`);
ok(D.STORY_ANALYSIS_S32.length === 6, `steps: 6 grammatical-analysis lines (got ${D.STORY_ANALYSIS_S32.length})`);
ok(D.TENSE_COMPARE_S33.length === 6, `steps: 6 tense-comparison rows (got ${D.TENSE_COMPARE_S33.length})`);
ok(D.LEVELS_S34.length === 5, `steps: 5 master-test levels (got ${D.LEVELS_S34.length})`);
ok(D.WRITE_CHECK_S36.length === 8, `steps: 8 writing requirements (got ${D.WRITE_CHECK_S36.length})`);
ok(D.WRITE_MIN_SENTENCES_36 === 10 && D.WRITE_MAX_SENTENCES_36 === 12, "steps: writing mission = 10–12 sentences");
ok(D.GOLDEN_FLIPS_S37.length === 5, `steps: 5 golden flips (got ${D.GOLDEN_FLIPS_S37.length})`);
ok(D.COURSE_MAP_S38.length === 2 && D.FUTURE_ROADMAP_S38.length === 7, "steps: course map + 7-step future roadmap");
// ============================================================
// 3) SSR render of all 40 steps
// ============================================================
const REVEAL_BANNED = /data-reveal-block|اضغط للعرض|نص المصدر الحرفي/;
const ANSWER_LEAK = /✓ صحيح|✕ غير صحيح|النتيجة: \d/;
for (const s of SLIDES) {
  let html = "";
  try {
    html = m.renderToString(
      m.React.createElement(m.SlideView34, {
        id: s.id,
        title: s.title,
        lead: s.lead,
        tip: s.tip,
        step: s.step,
        mascot: s.mascot,
        section: s.section,
        onGoTest: () => {},
        onGoSolutions: () => {},
      }),
    );
  } catch (e) {
    failures.push(`render: step ${s.id} threw: ${e.message}`);
    continue;
  }
  ok(html.includes(`data-lesson-step="${s.id}"`), `render: step ${s.id} renders its body`);
  ok(html.includes("data-source-section"), `render: step ${s.id} shows its source-section badge`);
  ok(!REVEAL_BANNED.test(html), `render: step ${s.id} shows no student-facing source reveal`);
  ok(!ANSWER_LEAK.test(html), `render: step ${s.id} shows no correctness state before attempt`);
}
// لا حلول تمارين المصدر مسرّبة في SSR لخطوات التمارين
{
  const probe = (sid) => {
    const s = SLIDES.find((x) => x.id === sid);
    return m.renderToString(
      m.React.createElement(m.SlideView34, {
        id: s.id, title: s.title, lead: s.lead, tip: s.tip, step: s.step, mascot: s.mascot, section: s.section,
        onGoTest: () => {}, onGoSolutions: () => {},
      }),
    );
  };
  const s28 = probe("s28");
  ok(!s28.includes("① B — travel"), "s28: exercise answers hidden before the attempt");
  ok(!s28.includes("التفسير المشترك"), "s28: shared explanation hidden before the attempt");
  const s29 = probe("s29");
  ok(!s29.includes("He won't buy a new backpack."), "s29: transform solutions hidden before the attempt");
  ok(!s29.includes("Will he buy a new backpack?"), "s29: transform solutions hidden before the attempt");
  const s30 = probe("s30");
  ok(!s30.includes("He will go to the market."), "s30: detective solutions hidden before the attempt");
  const s31 = probe("s31");
  ok(!s31.includes("I'll help you pick them up."), "s31: IQ200 solutions hidden before the attempt");
  const s32 = probe("s32");
  ok(!/①\s*He is thirteen/.test(s32), "s32: reading solutions hidden before the attempt");
  ok(!/\d\.\s*Daniel/.test(s32), "s32: no student-facing source accordion");
  const s7 = probe("s7");
  ok(!s7.includes("I'll help you."), "s7: challenge solution hidden before the attempt");
  const s10 = probe("s10");
  ok(!s10.includes("لأننا نتحدث عن احتمال مستقبلي"), "s10: IQ200 answer reason hidden before the attempt");
}

// ============================================================
// 3b) Restored source passages must reach the rendered student UI
//     (not merely exist in the ledger). Uses normalized SSR text so the
//     check survives <En>/<Rich> LTR-run splitting and React's
//     <!-- --> separators.
// ============================================================
{
  const plain = (h) =>
    h
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
  const probePlain = (sid) => {
    const s = SLIDES.find((x) => x.id === sid);
    return plain(
      m.renderToString(
        m.React.createElement(m.SlideView34, {
          id: s.id, title: s.title, lead: s.lead, tip: s.tip, step: s.step, mascot: s.mascot, section: s.section,
          onGoTest: () => {}, onGoSolutions: () => {},
        }),
      ),
    );
  };
  const countOf = (h, n) => h.split(n).length - 1;

  // A) the cover must not truncate the source enumeration
  const cover = probePlain("cover");
  ok(
    cover.includes("عندما يتخذ قرارًا، أو يقدم وعدًا، أو يتوقع حدوث شيء، أو يعرض المساعدة على شخص آخر."),
    "cover: source enumeration rendered in full (no truncation)",
  );
  // B) the cover must render the teaching-approach passage
  ok(
    cover.includes("سنحافظ على أسلوبنا التعليمي: شرح متدرج، أمثلة متنوعة، مقارنة دقيقة، اكتشاف الأخطاء، تدريبات تطبيقية، وتحديات IQ200."),
    "cover: teaching-approach passage rendered on the cover",
  );
  // C) the objectives step must render the source introduction before the nine objectives
  const objectives = probePlain("objectives");
  ok(objectives.includes("بنهاية الدرس ستكون قادرًا على:"), "objectives: source introduction rendered before the objectives");
  ok(
    objectives.indexOf("بنهاية الدرس ستكون قادرًا على:") < objectives.indexOf("فهم معنى Future Simple"),
    "objectives: introduction precedes the first objective",
  );

  // ---- progressive disclosure must start collapsed ----
  // SentenceList34 renders a "touch to reveal" placeholder per item while closed;
  // if `open` ever defaults to true the placeholders vanish (and answers leak).
  const REVEAL_PH = "المس لكشف الترجمة";
  const s8 = probePlain("s8");
  const s8Items = D.PROMISE_EXAMPLES_S8.length + D.PROMISE_PHRASES_S8.length + D.PROMISE_USES_S8.length;
  ok(countOf(s8, REVEAL_PH) === s8Items, `disclosure: s8 sentence lists start collapsed (${s8Items} placeholders, got ${countOf(s8, REVEAL_PH)})`);
  for (const [sid, items] of [
    ["s9", D.PREDICTION_EXAMPLES_S9],
    ["s11", D.OFFER_EXAMPLES_S11],
    ["s15", D.NEG_EXAMPLES_S15],
    ["s17", D.QUESTION_EXAMPLES_S17],
    ["s25", D.BE_EXAMPLES_S25],
  ]) {
    const t = probePlain(sid);
    ok(countOf(t, REVEAL_PH) === items.length, `disclosure: ${sid} sentence list starts collapsed (${items.length} placeholders, got ${countOf(t, REVEAL_PH)})`);
  }

  // FlipCards34 shows the card face while closed and the answer back once flipped;
  // if `flipped` ever defaults to true the answers leak into the first render.
  const s37 = probePlain("s37");
  ok(
    D.GOLDEN_FLIPS_S37.every((c) => s37.includes(c.face)),
    "disclosure: s37 golden-flip faces are rendered",
  );
  ok(
    D.GOLDEN_FLIPS_S37.filter((c) => !/^الإجابة القصيرة$/.test(c.back)).every((c) => !s37.includes(c.back)),
    "disclosure: s37 golden-flip answers hidden until the card is flipped",
  );
  const s34 = probePlain("s34");
  ok(
    D.LEVELS_S34.every((c) => !s34.includes(c.back)),
    "disclosure: s34 master-test level answers hidden until the card is flipped",
  );
}

// ============================================================
// 4–5) DOM-driven completion (interaction walks)
// ============================================================
const mountStep = async (s) =>
  mountNode(
    m.React.createElement(m.SlideView34, {
      id: s.id, title: s.title, lead: s.lead, tip: s.tip, step: s.step, mascot: s.mascot, section: s.section,
      onGoTest: () => {}, onGoSolutions: () => {},
    }),
  );
const gateDone34 = async (el, id) => {
  for (let i = 0; i < 25; i++) {
    if (q(el, `[data-gate-done="${id}"]`)) return true;
    await tick(20);
  }
  return false;
};
const slugOf = (id) => D.SLIDES.find((x) => x.id === id);
const driveRows = async (el, rows, key) => {
  for (let ri = 0; ri < rows.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${rows[ri][key]}"]`));
    await tick(15);
  }
  await tick(10);
};
const clickAll = async (el, sel) => {
  const nodes = [...el.querySelectorAll(sel)];
  for (const n of nodes) {
    clickEl(n);
    await tick(8);
  }
  await tick(10);
  return nodes.length;
};
const drivePairs = async (el, pairs) => {
  for (let ri = 0; ri < pairs.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="1"]`));
    await tick(15);
  }
  await tick(10);
};

// cover — timeline moments + the four will functions
{
  const el = await mountStep(slugOf("cover"));
  for (const mm of D.TIMELINE_COVER_34) clickEl(q(el, `[data-moment="${mm.tense}"]`));
  await tick(10);
  for (const fn of D.COVER_FUNCTIONS_34) clickEl(q(el, `[data-function="${fn.n}"]`));
  await tick(10);
  ok(await gateDone34(el, "cover"), "gate cover: completion confirmed (timeline + functions)");
  ok(textOf(el).includes("PAST"), "cover: timeline axis rendered");
}

// objectives — nine self-reported goals
{
  const el = await mountStep(slugOf("objectives"));
  for (const o of D.OBJECTIVES_34) clickEl(q(el, `[data-objective="${o.n}"]`));
  await tick(10);
  ok(await gateDone34(el, "objectives"), "gate objectives: completion confirmed");
}

// s1 — what is the future? (three moment rows)
{
  const el = await mountStep(slugOf("s1"));
  await driveRows(el, D.MOMENT_ROWS_S1, "pick");
  ok(await gateDone34(el, "s1"), "gate s1: completion confirmed");
}

// s2 — Subject + will + V1 + Rest (formula parts + five match rows)
{
  const el = await mountStep(slugOf("s2"));
  for (let i = 0; i < 7; i++) clickEl(q(el, `[data-formula-part="${i}"]`));
  await tick(10);
  await driveRows(el, D.RULE_ROWS_S2, "pick");
  ok(await gateDone34(el, "s2"), "gate s2: completion confirmed (formula + rows)");
  ok(textOf(el).includes("Subject") && textOf(el).includes("V1"), "s2: formula board rendered");
}

// s3 — will with every pronoun (chips + which-is-right)
{
  const el = await mountStep(slugOf("s3"));
  for (const p of D.PRONOUN_FORMS_34) clickEl(q(el, `[data-pronoun="${p.p}"]`));
  await tick(10);
  await driveRows(el, D.PRONOUN_PICK_S3, "correct");
  ok(await gateDone34(el, "s3"), "gate s3: completion confirmed");
  ok(textOf(el).includes("They will"), "s3: pronoun form rendered after the tap");
}

// s4 — golden rule one (verb chips + error pairs)
{
  const el = await mountStep(slugOf("s4"));
  for (const v of D.GOLDEN_VERBS_34) clickEl(q(el, `[data-verb="${v.v1}"]`));
  await tick(10);
  await drivePairs(el, D.ERROR_PAIRS_S4);
  ok(await gateDone34(el, "s4"), "gate s4: completion confirmed");
}

// s5 — the six uses of will
{
  const el = await mountStep(slugOf("s5"));
  for (const u of D.USE_CARDS_S5) clickEl(q(el, `[data-use="${u.n}"]`));
  await tick(10);
  ok(await gateDone34(el, "s5"), "gate s5: completion confirmed");
  ok(textOf(el).includes("I'll carry that box for you."), "s5: offer example rendered after the tap");
}

// s6 — decisions made at the moment of speaking
{
  const el = await mountStep(slugOf("s6"));
  for (let i = 0; i < D.MOMENT_EXCHANGES_S6.length; i++) clickEl(q(el, `[data-exchange="${i}"]`));
  await tick(10);
  ok(await gateDone34(el, "s6"), "gate s6: completion confirmed");
  ok(textOf(el).includes("I'll open the door."), "s6: moment decision revealed");
}

// s7 — At Home dialogue + challenge typed fill
{
  const el = await mountStep(slugOf("s7"));
  for (let i = 0; i < D.DIALOGUE_HOME_S7.length; i++) clickEl(q(el, `[data-dialogue="${i}"]`));
  await tick(10);
  ok(!(await gateDone34(el, "s7")), "s7: gate not done before the challenge answer");
  const input = q(el, "#s7-typed-0");
  ok(!!input, "s7: challenge input rendered");
  setNative(input, D.CHALLENGE_S7.accept[0]);
  await tick(10);
  const row = input.closest("div.rounded-2xl");
  clickEl([...row.querySelectorAll("button")].find((b) => b.textContent.includes("تحقّق")));
  await tick(15);
  ok(await gateDone34(el, "s7"), "gate s7: completion confirmed (dialogue + typed answer)");
  ok(textOf(el).includes("I'll help you."), "s7: source solution revealed after the correct answer");
}

// s8 — promises (examples + phrases + uses)
{
  const el = await mountStep(slugOf("s8"));
  const shown = await clickAll(el, "[data-sentence]");
  ok(shown === D.PROMISE_EXAMPLES_S8.length + D.PROMISE_PHRASES_S8.length + D.PROMISE_USES_S8.length, `s8: every promise sentence tappable (got ${shown})`);
  ok(await gateDone34(el, "s8"), "gate s8: completion confirmed");
}

// s9 — predictions (examples + cues)
{
  const el = await mountStep(slugOf("s9"));
  for (let i = 0; i < D.PREDICTION_EXAMPLES_S9.length; i++) clickEl(q(el, `[data-sentence="${i}"]`));
  await tick(10);
  for (const c of D.PREDICTION_CUES_S9) clickEl(q(el, `[data-cue="${c}"]`));
  await tick(10);
  ok(await gateDone34(el, "s9"), "gate s9: completion confirmed");
}

// s10 — fact vs prediction + IQ200 row (answer stays gated)
{
  const el = await mountStep(slugOf("s10"));
  for (let i = 0; i < D.FACT_VS_PREDICT_S10.length; i++) clickEl(q(el, `[data-sentence="${i}"]`));
  await tick(10);
  ok(!(await gateDone34(el, "s10")), "s10: gate not done before the IQ200 answer");
  await driveRows(el, [D.IQ_FACT_ROW_S10], "pick");
  ok(await gateDone34(el, "s10"), "gate s10: completion confirmed");
}

// s11 / s12 / s13 — offers, shall, willingness & refusal
{
  const el11 = await mountStep(slugOf("s11"));
  for (let i = 0; i < D.OFFER_EXAMPLES_S11.length; i++) clickEl(q(el11, `[data-sentence="${i}"]`));
  await tick(10);
  ok(await gateDone34(el11, "s11"), "gate s11: completion confirmed");

  const el12 = await mountStep(slugOf("s12"));
  for (let i = 0; i < D.SHALL_EXAMPLES_S12.length; i++) clickEl(q(el12, `[data-sentence="${i}"]`));
  await tick(10);
  ok(await gateDone34(el12, "s12"), "gate s12: completion confirmed");

  const el13 = await mountStep(slugOf("s13"));
  const total13 = D.WILLINGNESS_S13.length + D.REFUSAL_S13.length;
  for (let i = 0; i < total13; i++) clickEl(q(el13, `[data-sentence="${i}"]`));
  await tick(10);
  await driveRows(el13, D.REFUSAL_ROWS_S13, "pick");
  ok(await gateDone34(el13, "s13"), "gate s13: completion confirmed");
}

// s14 — contractions (table chips + examples)
{
  const el = await mountStep(slugOf("s14"));
  for (const c of D.CONTRACTIONS_34) clickEl(q(el, `[data-contraction="${c.short}"]`));
  await tick(10);
  for (let i = 0; i < D.CONTRACTION_EXAMPLES_34.length; i++) clickEl(q(el, `[data-sentence="${i}"]`));
  await tick(10);
  ok(await gateDone34(el, "s14"), "gate s14: completion confirmed");
  ok(textOf(el).includes("I'll help you."), "s14: contraction comparison rendered");
}

// s15 — negation (formula + examples)
{
  const el = await mountStep(slugOf("s15"));
  for (let i = 0; i < 5; i++) clickEl(q(el, `[data-formula-part="${i}"]`));
  await tick(10);
  for (let i = 0; i < D.NEG_EXAMPLES_S15.length; i++) clickEl(q(el, `[data-sentence="${i}"]`));
  await tick(10);
  ok(await gateDone34(el, "s15"), "gate s15: completion confirmed");
}

// s16 — negation error pairs
{
  const el = await mountStep(slugOf("s16"));
  await drivePairs(el, D.NEG_ERROR_PAIRS_S16);
  ok(await gateDone34(el, "s16"), "gate s16: completion confirmed");
}

// s17 — question form (formula + examples)
{
  const el = await mountStep(slugOf("s17"));
  for (let i = 0; i < 8; i++) clickEl(q(el, `[data-formula-part="${i}"]`));
  await tick(10);
  for (let i = 0; i < D.QUESTION_EXAMPLES_S17.length; i++) clickEl(q(el, `[data-sentence="${i}"]`));
  await tick(10);
  ok(await gateDone34(el, "s17"), "gate s17: completion confirmed");
}

// s18 — short answers
{
  const el = await mountStep(slugOf("s18"));
  await driveRows(el, D.SHORT_ROWS_S18, "pick");
  ok(await gateDone34(el, "s18"), "gate s18: completion confirmed");
  ok(textOf(el).includes("Yes, I will. ✅"), "s18: right/wrong short answers rendered");
}

// s19 — Wh questions board
{
  const el = await mountStep(slugOf("s19"));
  for (const w of D.WH_WORDS_S19) clickEl(q(el, `[data-wh="${w.w}"]`));
  await tick(10);
  ok(await gateDone34(el, "s19"), "gate s19: completion confirmed");
  ok(textOf(el).includes("Where will they stay?"), "s19: Wh example rendered after the tap");
}

// s20 — WHO as the subject
{
  const el = await mountStep(slugOf("s20"));
  for (const w of D.WHO_COMPARE_S20) clickEl(q(el, `[data-who="${w.en}"]`));
  await tick(10);
  ok(await gateDone34(el, "s20"), "gate s20: completion confirmed");
  ok(textOf(el).includes("هنا Who هي الفاعل نفسه."), "s20: subject analysis revealed");
}

// s21 — time expressions + examples
{
  const el = await mountStep(slugOf("s21"));
  for (const w of D.TIME_WORDS_S21) clickEl(q(el, `[data-word="${w.en}"]`));
  await tick(10);
  for (let i = 0; i < D.TIME_EXAMPLES_S21.length; i++) clickEl(q(el, `[data-sentence="${i}"]`));
  await tick(10);
  ok(await gateDone34(el, "s21"), "gate s21: completion confirmed");
}

// s22 — signal words do not control the form
{
  const el = await mountStep(slugOf("s22"));
  await driveRows(el, D.CUE_WARNING_ROWS_S22, "pick");
  ok(await gateDone34(el, "s22"), "gate s22: completion confirmed");
  ok(textOf(el).includes("I am meeting my teacher tomorrow."), "s22: Present Continuous arrangement example rendered");
}

// s23 — will vs be going to (situations + rows)
{
  const el = await mountStep(slugOf("s23"));
  for (let i = 0; i < D.GOING_TO_SITUATIONS_S23.length; i++) clickEl(q(el, `[data-going="${i}"]`));
  await tick(10);
  await driveRows(el, D.GOING_TO_ROWS_S23, "pick");
  ok(await gateDone34(el, "s23"), "gate s23: completion confirmed");
  ok(textOf(el).includes("ليست حدودًا مطلقة"), "s23: source caveat preserved verbatim");
}

// s24 — will with the past (error pairs + irregular chain)
{
  const el = await mountStep(slugOf("s24"));
  await drivePairs(el, D.PAST_ERROR_PAIRS_S24);
  for (const c of D.IRREGULAR_CHAIN_S24) clickEl(q(el, `[data-chain="${c.v1}"]`));
  await tick(10);
  ok(await gateDone34(el, "s24"), "gate s24: completion confirmed");
  ok(textOf(el).includes("will go"), "s24: irregular chain revealed (will go)");
}

// s25 — will be (examples + error pairs)
{
  const el = await mountStep(slugOf("s25"));
  for (let i = 0; i < D.BE_EXAMPLES_S25.length; i++) clickEl(q(el, `[data-sentence="${i}"]`));
  await tick(10);
  await drivePairs(el, D.BE_ERROR_PAIRS_S25);
  ok(await gateDone34(el, "s25"), "gate s25: completion confirmed");
}

// s26 — comparison with verb to be
{
  const el = await mountStep(slugOf("s26"));
  for (const r of D.BE_TABLE_S26) clickEl(q(el, `[data-be-row="${r.pronoun}"]`));
  await tick(10);
  ok(await gateDone34(el, "s26"), "gate s26: completion confirmed");
  ok(textOf(el).includes("They will be busy."), "s26: future form rendered after the tap");
}

// s27 — The School Project (dialogue + use analysis)
{
  const el = await mountStep(slugOf("s27"));
  for (let i = 0; i < D.DIALOGUE_PROJECT_S27.length; i++) clickEl(q(el, `[data-dialogue="${i}"]`));
  await tick(10);
  await driveRows(el, D.USE_ANALYSIS_S27, "pick");
  ok(await gateDone34(el, "s27"), "gate s27: completion confirmed");
}

// s28 — foundational drill (single choice, answers gated)
{
  const el = await mountStep(slugOf("s28"));
  for (let ri = 0; ri < D.MC_ROWS_S28.length; ri++) {
    clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.MC_ROWS_S28[ri].answer}"]`));
    await tick(15);
  }
  await tick(10);
  ok(await gateDone34(el, "s28"), "gate s28: completion confirmed");
  ok(textOf(el).includes("بعد will يأتي الفعل الأساسي V1."), "s28: per-item explanation revealed after the attempt");
}

// s29 — transform drill (five negations + five questions)
{
  const el = await mountStep(slugOf("s29"));
  for (let i = 0; i < D.TRANSFORM_ROWS_S29.length; i++) {
    const neg = q(el, `#tr34-neg-${i}`);
    const qq = q(el, `#tr34-q-${i}`);
    ok(!!neg && !!qq, `s29: both inputs rendered (${i})`);
    setNative(neg, D.TRANSFORM_ROWS_S29[i].negAccept[0]);
    await tick(5);
    const row = neg.closest("div.rounded-2xl");
    clickEl([...row.querySelectorAll("button")].find((b) => b.textContent.includes("تحقّق")));
    await tick(5);
    setNative(qq, D.TRANSFORM_ROWS_S29[i].qAccept[0]);
    await tick(5);
    const row2 = qq.closest("div.rounded-2xl");
    clickEl([...row2.querySelectorAll("button")].find((b) => b.textContent.includes("تحقّق")));
    await tick(5);
  }
  await tick(10);
  ok(await gateDone34(el, "s29"), "gate s29: completion confirmed (5 negations + 5 questions)");
  ok(textOf(el).includes("Sara won't be ready."), "s29: source solution for sentence 4 revealed");
  ok(textOf(el).includes("ولم نستخدم is"), "s29: be-not-is note preserved");
}

// s30 — Grammar Detective (ten cases, stage by stage)
{
  const el = await mountStep(slugOf("s30"));
  for (const it of D.DETECTIVE_S30) {
    clickEl(q(el, `[data-tap-seg="${it.bad}"]`));
    await tick(15);
    clickEl(q(el, `[data-tap-fix="${it.fix}"]`));
    await tick(15);
    const boxText = textOf(q(el, "[data-tap-stage]"));
    ok(boxText.includes(it.corrected), `s30 case ${it.n}: solved state renders the exact corrected sentence`);
    clickEl(btnWith(el, "القضية التالية"));
    await tick(15);
  }
  await tick(10);
  ok(await gateDone34(el, "s30"), "gate s30: completion confirmed");
}

// s31 — IQ200 situations (typed → check → reveal)
{
  const el = await mountStep(slugOf("s31"));
  for (let i = 0; i < D.IQ_SITUATIONS_S31.length; i++) {
    const input = q(el, `#iq34-${i}`);
    ok(!!input, `s31: situation input rendered (${i})`);
    setNative(input, D.IQ_SITUATIONS_S31[i].accept[0]);
    await tick(5);
    const row = input.closest("div.rounded-2xl");
    clickEl([...row.querySelectorAll("button")].find((b) => b.textContent.includes("تحقّق")));
    await tick(5);
    ok(textOf(el).includes("إجابتك مطابقة للإجابة الممكنة"), `s31: situation ${i} accepted the source answer`);
    clickEl(btnWith(el, "كشف الإجابة الممكنة من المصدر"));
    await tick(10);
  }
  await tick(10);
  ok(await gateDone34(el, "s31"), "gate s31: completion confirmed");
  ok(textOf(el).includes("I'll help you pick them up."), "s31: source solution revealed");
}

// s32 — Reading Challenge (story hunt + comprehension)
{
  const el = await mountStep(slugOf("s32"));
  ok(!(await gateDone34(el, "s32")), "s32: gate not done before the story hunt");
  for (let pIdx = 1; pIdx <= D.STORY_HITS_S32; pIdx++) {
    const b = q(el, `[data-poem-tap="${pIdx}"]`);
    ok(!!b, `s32: will phrase ${pIdx} tappable`);
    clickEl(b);
    await tick(10);
  }
  await tick(10);
  await driveRows(el, D.COMPREHENSION_S32, "answer");
  ok(await gateDone34(el, "s32"), "gate s32: completion confirmed");
  ok(textOf(el).includes("He is thirteen years old."), "s32: reading answers revealed after the attempt");
}

// s33 — tense comparison (rows + table rows)
{
  const el = await mountStep(slugOf("s33"));
  for (const r of D.TENSE_COMPARE_S33) clickEl(q(el, `[data-tense-row="${r.tense}"]`));
  await tick(10);
  await driveRows(el, D.TENSE_COMPARE_ROWS_S33, "pick");
  ok(await gateDone34(el, "s33"), "gate s33: completion confirmed");
  ok(textOf(el).includes("I will solve the problem tomorrow."), "s33: future row revealed");
}

// s34 — master test level cards + go-to-test
{
  const el = await mountStep(slugOf("s34"));
  for (const lc of D.LEVELS_S34) clickEl(q(el, `[data-flip-gate="${lc.level}"]`));
  await tick(10);
  ok(await gateDone34(el, "s34"), "gate s34: completion confirmed");
  ok(!!btnWith(el, "الذهاب إلى الاختبار"), "s34: go-to-test button rendered");
}

// s35 — teacher-space gate row
{
  const el = await mountStep(slugOf("s35"));
  await driveRows(el, D.SOLUTION_GATE_ROWS_S35, "pick");
  ok(await gateDone34(el, "s35"), "gate s35: completion confirmed");
  ok(textOf(el).includes("الحلول مقفلة حتى إرسال الاختبار"), "s35: solutions-locked notice rendered");
}

// s36 — Final Boss writing mission (8 checks + 10–12 sentences)
{
  const el = await mountStep(slugOf("s36"));
  ok(!(await gateDone34(el, "s36")), "s36: gate not done before writing");
  for (let i = 0; i < D.WRITE_CHECK_S36.length; i++) clickEl(q(el, `#wr-${i}`));
  await tick(5);
  const ta = q(el, "textarea");
  ok(!!ta, "s36: writing textarea rendered");
  setNative(ta, Array.from({ length: 10 }, (_, i) => `Sentence number ${i + 1} about my future plans.`).join(" "));
  await tick(25);
  ok(await gateDone34(el, "s36"), "gate s36: completion confirmed after 8 checks + 10 sentences");
  ok(textOf(el).includes("My Predictions and Promises"), "s36: writing title from the source rendered");
}

// s37 — golden summary (flips + use chips)
{
  const el = await mountStep(slugOf("s37"));
  for (let i = 0; i < D.GOLDEN_FLIPS_S37.length; i++) clickEl(q(el, `[data-flip-gate="${i}"]`));
  await tick(10);
  for (let i = 0; i < D.GOLDEN_USES_S37.length; i++) clickEl(q(el, `[data-use-chip="${i}"]`));
  await tick(10);
  ok(await gateDone34(el, "s37"), "gate s37: completion confirmed");
  ok(textOf(el).includes("القاعدة الذهبية"), "s37: golden rule banner rendered");
}

// s38 — course map + next stop
{
  const el = await mountStep(slugOf("s38"));
  await driveRows(el, [D.NEXT_STOP_ROW_S38], "pick");
  ok(await gateDone34(el, "s38"), "gate s38: completion confirmed");
  ok(textOf(el).includes("BE GOING TO"), "s38: next lesson announced");
}

// ============================================================
// 6) Test Area — 25 source questions, 5 levels, neutral until submit
// ============================================================
const TEST = T.TEST_34;
ok(TEST.length === 25, `test: exactly 25 questions (got ${TEST.length})`);
ok(T.TEST_34_COUNT === 25, "test: count export matches");
ok(T.TEST_LEVELS_34.length === 5, "test: five levels");
ok(T.TEST_LEVELS_34.every((l) => l.questions.length === 5), "test: 5 questions per level");
const lvlNames = T.TEST_LEVELS_34.map((l) => l.name);
ok(lvlNames.join("|") === "البناء الصحيح|أكمل الجمل|حدد الاستخدام|صحح الأخطاء|IQ200", `test: level names per source (got ${lvlNames.join("|")})`);
const ttypes = new Set(TEST.map((x) => x.type));
ok(["single", "typed", "spot", "write"].every((t) => ttypes.has(t)), `test: four question interactions (${[...ttypes].join(",")})`);
ok(new Set(TEST.map((x) => x.ar)).size === 25, "test: 25 distinct prompts");
ok(ledgerText.includes("Future Simple Master Test"), "test: master test name in the source");
for (const probe of [
  "He will ______ the instructions carefully.",
  "We ______ be late.",
  "______ Sara join the competition?",
  "They will ______ happy.",
  "I ______ you tomorrow.",
  "I think the exam ______ easy. (be)",
  "Don't worry. I ______ you. (help)",
  "She ______ anyone your secret. (not / tell)",
  "______ they ______ early? (arrive)",
  "We ______ the same mistake again. (not / make)",
  "I'll carry your suitcase.",
  "I promise I'll return the money.",
  "I think electric cars will become more common.",
  "The computer won't start, although I've tried several times.",
  "Someone is knocking. I'll check the door.",
  "He will studies harder.",
  "Will she comes tomorrow?",
  "I won't to forget.",
  "They will are successful.",
  "Does your father will help us?",
])
  ok(TEST.some((x) => x.ar.includes(probe)), `test: source question present verbatim: ${probe.slice(0, 40)}…`);
// مستوى IQ200 الكتابي: مواقف المصدر الخمسة محفوظة
for (const probe of ["صديقك عطشان", "لن تتأخر مجددًا", "التكنولوجيا ستغيّر طريقة تعلمنا", "سيشارك في المسابقة", "متى ستبدأ الرحلة؟"])
  ok(TEST.some((x) => x.ar.includes(probe)), `test: IQ200 writing situation preserved: ${probe}`);

// grading: complete correct key 25/25, wrong key 0
const correctVal = (x) => {
  if (x.type === "typed" || x.type === "write") return x.accept[0];
  if (x.type === "spot") return x.bad;
  return x.answer;
};
const wrongVal = (x) => {
  if (x.type === "typed" || x.type === "write") return "not an answer";
  if (x.type === "spot") return (x.bad + 1) % x.segments.length;
  return (x.answer + 1) % x.options.length;
};
ok(TEST.every((x) => m.gradeOne34(x, correctVal(x)) === true), "grade: every question accepts its correct answer");
ok(TEST.every((x) => m.gradeOne34(x, wrongVal(x)) === false), "grade: every question rejects a wrong answer");
ok(TEST.every((x) => m.isAnswered34(x, undefined) === false), "grade: unanswered is not counted as answered");
ok(m.gradeOne34(TEST[5], "will be") === true && m.gradeOne34(TEST[5], "'ll be") === true, "grade: typed item 6 accepts will be and 'll be");
ok(m.gradeOne34(TEST[6], "I'll help") === false, "grade: fuzzy strings rejected");
ok(m.gradeOne34(TEST[2], 1) === true && m.gradeOne34(TEST[2], 0) === false, "grade: single item 3 (Will) position");
ok(m.gradeOne34(TEST[15], 2) === true, "grade: spot item 16 (studies) position");
// spot answer keys render the exact corrected sentence (item 18 deletes «to»)
const spotKeys34 = [
  [15, "He will study harder. (الخطأ: studies ← الصواب: study)"],
  [16, "Will she come tomorrow? (الخطأ: comes ← الصواب: come)"],
  [17, "I won't forget. (الخطأ: to ← الصواب: حذف الكلمة)"],
  [18, "They will be successful. (الخطأ: are ← الصواب: be)"],
  [19, "Will your father help us? (الخطأ: Does ← الصواب: Will)"],
];
for (const [qi, key] of spotKeys34) ok(T.answerText34(TEST[qi]) === key, `test: spot item ${qi + 1} answer key renders exactly`);
ok(!T.answerText34(TEST[17]).includes("won't  forget"), "test: spot item 18 key keeps no double space after deleting to");
// neutral until submit; score + band after; full reset
{
  const el = await mountNode(m.React.createElement(m.TestArea34, { onSubmitted: () => {}, onRestart: () => {} }));
  ok(!/✓ صحيح|✕ غير صحيح|النتيجة:/.test(textOf(el)), "test: no correctness or score before submit");
  ok(textOf(el).includes("أجبت: 0/25"), "test: fresh state shows 0/25 answered");
  const submit = btnWith(el, "إرسال الاختبار");
  ok(!!submit, "test: submit button present before submit");
  ok(submit.disabled === true, "test: submit disabled until all questions answered");
  for (let i = 0; i < TEST.length; i++) {
    const x = TEST[i];
    if (x.type === "typed" || x.type === "write") setNative(q(el, `#l34-q${i + 1}`), x.accept[0]);
    else if (x.type === "spot") clickEl(q(el, `[data-test-seg="${i + 1}"][data-seg-index="${x.bad}"]`));
    else if (x.type === "single") clickEl(q(el, `#l34-q${i + 1}-opt${x.answer}`));
    await tick(10);
  }
  ok(textOf(el).includes("أجبت: 25/25"), "test: all answered");
  clickEl(btnWith(el, "إرسال الاختبار"));
  await tick(40);
  const t = textOf(el);
  ok(t.includes("النتيجة: 25 / 25"), "test: score shown after submit (25/25 for the correct key)");
  ok(t.includes("إتقان"), "test: mastery band shown for a perfect score");
  ok(/✓|✕/.test(t), "test: per-question status chips shown after submit");
  ok(t.includes("سؤال كتابة حرّة"), "test: level-5 human-grading notice rendered");
  clickEl(btnWith(el, "إعادة الاختبار كاملًا"));
  await tick(30);
  ok(textOf(el).includes("أجبت: 0/25"), "test: full reset clears answers");
  ok(!/النتيجة:/.test(textOf(el)), "test: full reset clears score");
}

// Solutions: locked before entitlement; unlocked shows the derived key
{
  const locked = m.renderToString(m.React.createElement(m.Solutions34, { unlocked: false, onGoTest: () => {}, onGoTeacher: () => {} }));
  ok(locked.includes("الحلول مقفلة"), "solutions: locked state shown before submit");
  ok(!locked.includes(T.answerText34(TEST[0]).slice(0, 20)), "solutions: no answer text leaks while locked");
  const open = m.renderToString(m.React.createElement(m.Solutions34, { unlocked: true, onGoTest: () => {}, onGoTeacher: () => {} }));
  const unescapeHtml = (h) =>
    h
      .replace(/<[^>]+>/g, "")
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  const openPlain = unescapeHtml(open);
  ok(openPlain.includes(T.answerText34(TEST[0])), "solutions: question 1 answer rendered when unlocked");
  ok(openPlain.includes("I won't forget. (الخطأ: to ← الصواب: حذف الكلمة)"), "solutions: item 18 detailed key renders the exact corrected sentence");
  ok(openPlain.includes("مشتق وفق قواعد الدرس"), "solutions: answers labelled as derived per the lesson rules");
  ok((openPlain.match(/المستوى/g) || []).length >= 5, "solutions: five level groups rendered");
  ok(open.includes("Platform Explanation"), "solutions: explanations labelled Platform Explanation");
  ok(openPlain.includes("👩‍🏫 منطقة المعلم"), "solutions: teacher-area link rendered");
}

// ============================================================
// 7) Teacher Area: gate + content
// ============================================================
ok(TD.TEACHER_PASSWORD_34 === "somer173", "teacher: password constant is somer173");
{
  const el = await mountNode(m.React.createElement(m.TeacherArea34, { unlocked: false, onUnlockChange: () => {}, onGoSolutions: () => {} }));
  const lockedText = textOf(el);
  ok(!lockedText.includes("نظرة عامة للمعلم") && !lockedText.includes("الأخطاء المتعمدة في المصدر"), "teacher: content hidden while locked");
  const input = q(el, "#l34-teacher-pw");
  ok(!!input, "teacher: password input rendered");
  const form = q(el, "form");
  setNative(input, "wrong-password");
  await tick(10);
  form.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
  await tick(20);
  ok(textOf(el).includes("كلمة المرور غير صحيحة"), "teacher: wrong password rejected");
}
{
  const html = m.renderToString(m.React.createElement(m.TeacherArea34, { unlocked: true, onUnlockChange: () => {}, onGoSolutions: () => {} }));
  const must = ["نظرة عامة للمعلم", "توزيع الحصة", "ملاحظات التدريس", "حلول تمارين المصدر", "rubric", "الأخطاء الشائعة", "الأخطاء المتعمدة في المصدر", "دليل الاختبار للمعلم", "خطة المعالجة", "فهرس المصدر الحرفي"];
  for (const t of must) ok(html.includes(t), `teacher: section present: ${t}`);
  ok(html.includes("Platform Explanation"), "teacher: platform commentary labelled Platform Explanation");
  ok(TD.TEACHER_34_SOLUTIONS.length >= 5, `teacher: source-activity solutions (${TD.TEACHER_34_SOLUTIONS.length} groups)`);
  ok(TD.TEACHER_34_RUBRICS.length >= 2 && TD.TEACHER_34_RUBRICS.every((r) => r.rows.length >= 3), "teacher: rubrics with at least 3 levels each");
  ok(TD.TEACHER_34_MISTAKES.length >= 4, `teacher: common mistakes (${TD.TEACHER_34_MISTAKES.length})`);
  ok(html.includes("<details>"), "teacher: verbatim source index uses details accordions (teacher-only)");
  // كل حلول تمارين المصدر موجودة نصًا في السجل
  for (const sol of ["① B — travel", "He won't buy a new backpack.", "Won't we be late?", "He will go to the market.", "I think AI will become more important in education.", "He is thirteen years old."])
    ok(ledgerText.includes(sol), `teacher: source solution traceable to the ledger: ${sol.slice(0, 40)}…`);
}

// ============================================================
// 8) Preserved source: intentionally wrong spots kept verbatim
// ============================================================
ok(TD.INTENTIONALLY_WRONG_34.length === 29, `source: 29 intentionally wrong spots catalogued (4+4+6+10+5; got ${TD.INTENTIONALLY_WRONG_34.length})`);
const verbatimWrong = TD.INTENTIONALLY_WRONG_34.filter((e) => !e.derived);
const missingWrong = verbatimWrong.filter((e) => !ledgerText.includes(e.wrong));
ok(missingWrong.length === 0, `source: every verbatim wrong spot appears in the ledger (missing: ${missingWrong.map((e) => e.id + ":" + e.wrong).join(" | ")})`);
const derivedWrong = TD.INTENTIONALLY_WRONG_34.filter((e) => e.derived);
ok(derivedWrong.length === 6, `source: §㉘ wrong spots are built from the source options (${derivedWrong.length})`);
ok(
  derivedWrong.every((e) => {
    const m = /الاختيار الصحيح ([A-C]) — (.+)\.$/.exec(e.note);
    return !!m && ledgerText.includes(`${m[1]} — ${m[2]}`);
  }),
  "source: every derived wrong spot corrects to a source answer key line",
);
const pairsPreserved = TD.INTENTIONALLY_WRONG_34.filter((e) => !e.derived);
for (const e of pairsPreserved) {
  const sec = e.section.split(" ")[0];
  ok(ledgerText.includes(e.wrong), `source: ${sec} wrong pair preserved: ${e.wrong}`);
  if (sec === "§㉟") {
    // the test prints only the faulty sentence — the correction lives in the teacher answer key
    ok(ledgerText.includes(e.wrong), `source: §㉟ faulty sentence preserved: ${e.wrong}`);
  } else {
    ok(ledgerText.includes(e.right), `source: ${sec} right pair preserved: ${e.right}`);
  }
}
ok(ledgerText.includes("I will visited my friend. ❌") && ledgerText.includes("She will bought a new laptop. ❌"), "source: §㉔ past-error examples preserved");
ok(ledgerText.includes("Daniel: I'll participate!") && ledgerText.includes("Teacher: Don't worry. I'll help you with the difficult parts."), "source: Daniel story will phrases preserved");

// ============================================================
// 9) Static hygiene: bidi controls, hover-only, buttons, reveal gating
// ============================================================
const files = readdirSync(L34).filter((f) => /\.(ts|tsx)$/.test(f)).map((f) => join(L34, f));
const src = Object.fromEntries(files.map((f) => [f.split("/").pop(), readFileSync(f, "utf8")]));
const BIDI_CTRL = /[\u200e\u200f\u202a-\u202e\u2066-\u2069\u061c]/;
ok(files.every((f) => !BIDI_CTRL.test(src[f.split("/").pop()])), "bidi: no raw Unicode bidi control characters in lesson 34 sources");
ok(Object.values(src).every((s) => !/<[a-z][\w-]*\b[^>]*\stitle=/.test(s)), "a11y: no title= tooltips on native elements (no hover-only information)");
ok(Object.values(src).every((s) => !/onMouseEnter|onMouseOver|onHover/.test(s)), "a11y: no hover-only handlers");
ok(!Object.values(src).some((s) => s.includes("split(/(\\s+)/)")), "bidi: no per-token space splitting (word-reversal engine banned)");
const kit = src["kit34.tsx"];
ok(kit.includes("focus-visible:ring-4") && kit.includes("FOCUS34"), "a11y: visible focus ring contract (FOCUS34)");
ok(!Object.values(src).some((t) => t.includes("data-reveal-block")), "reveal: no reveal blocks in lesson 34");
ok(!Object.values(src).some((t) => t.includes("SourceReveal")), "reveal: no source-reveal component in lesson 34");
const stepsSrc = src["Steps34.tsx"];
ok(!stepsSrc.includes("<details>") && !stepsSrc.includes("<summary>"), "reveal: no student-facing details/source accordions in steps");
const btnTotal = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<button\b[^>]*type=/g) || []).length, 0);
const btnAllInline = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/^\s*<button\b[^>]*type="button"[^>]*>/gm) || []).length, 0);
ok(btnTotal > 0 && btnAllInline >= btnTotal * 0.85, `a11y: buttons declare type on the same line (${btnAllInline}/${btnTotal})`);
const enCount = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<En\b/g) || []).length, 0);
const richCount = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<Rich\b/g) || []).length, 0);
ok(enCount >= 20 && richCount >= 100, `bidi: English rendered through LTR-isolated <En>/<Rich> units (${enCount}/${richCount})`);
ok(stepsSrc.includes('from "../../shared/lessonKit"') && (src["Lesson34.tsx"].includes("LatinRuns") || stepsSrc.includes("LatinRuns")), "bidi: shared kit imports present");
ok(src["TestArea34.tsx"].includes("Rich") && src["TeacherArea34.tsx"].includes("LatinRuns"), "bidi: test/teacher use Rich/LatinRuns isolation");

// ============================================================
// 10) Shell: 4 areas, routing, hub card
// ============================================================
{
  const el = await mountNode(m.React.createElement(m.Lesson34, { onExit: () => {} }));
  const t = textOf(el);
  ok(["📖", "🧪", "🔑", "👩‍🏫"].every((e) => t.includes(e)), "shell: four area buttons present");
  ok(!!q(el, '[data-area="l34-lesson"]'), "shell: lesson area renders by default");
  ok(!!q(el, '[aria-label="خطوات الدرس 34"]'), "shell: step rail labelled for screen readers");
  const rail = q(el, '[aria-label="خطوات الدرس 34"]');
  let slideBtn = [...rail.querySelectorAll("button")].find((b) => (b.textContent || "").includes("خريطة تقدم المنهج"));
  if (!slideBtn) {
    const secBtn = [...rail.querySelectorAll("button")].find((b) => (b.textContent || "").includes("الخاتمة"));
    clickEl(secBtn);
    await tick(25);
    slideBtn = [...rail.querySelectorAll("button")].find((b) => (b.textContent || "").includes("خريطة تقدم المنهج"));
  }
  clickEl(slideBtn);
  await tick(60);
  ok(!!q(el, '[data-final-test="34"]'), "shell: last step shows the banked Final Test (34)");
  const testBtn = btnWith(el, "منطقة الاختبار");
  clickEl(testBtn);
  await tick(20);
  ok(!!q(el, '[data-area="l34-test"]'), "shell: test area reachable");
  clickEl(btnWith(el, "منطقة الحلول") || btnWith(el, "🔑"));
  await tick(20);
  ok(textOf(el).includes("الحلول مقفلة"), "shell: solutions locked from the shell before submit");
  clickEl(btnWith(el, "منطقة المعلم") || btnWith(el, "👩‍🏫"));
  await tick(20);
  ok(!!q(el, '[data-area="l34-teacher"]') && textOf(el).includes("كلمة مرور"), "shell: teacher gate reachable");
  // submit inside test area entitles solutions
  clickEl(btnWith(el, "منطقة الاختبار"));
  await tick(20);
  for (let i = 0; i < TEST.length; i++) {
    const x = TEST[i];
    if (x.type === "typed" || x.type === "write") setNative(q(el, `#l34-q${i + 1}`), x.accept[0]);
    else if (x.type === "spot") clickEl(q(el, `[data-test-seg="${i + 1}"][data-seg-index="${x.bad}"]`));
    else if (x.type === "single") clickEl(q(el, `#l34-q${i + 1}-opt${x.answer}`));
    await tick(8);
  }
  clickEl(btnWith(el, "إرسال الاختبار"));
  await tick(40);
  clickEl(btnWith(el, "منطقة الحلول") || btnWith(el, "🔑"));
  await tick(30);
  ok(!textOf(el).includes("الحلول مقفلة"), "shell: solutions unlocked after a full submit");
}
const app = readFileSync(join(root, "src", "App.tsx"), "utf8");
ok(app.includes('import Lesson34 from "./lessons/lesson34/Lesson34";'), "routing: Lesson34 imported in App.tsx");
ok(app.includes("route === 34") && app.includes("<Lesson34 onExit={goHome} />"), "routing: route 34 renders Lesson34");
ok(/n: 34,[\s\S]*?title: "الدرس 34/.test(app) && app.includes('href: "#/lesson/34"'), "hub: lesson 34 card registered");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
ok(pkg.scripts["audit:english-direction"].includes("scripts/audit-lesson34.mjs"), "scripts: audit-lesson34 wired into audit:english-direction");
ok(pkg.scripts["audit:lesson34"] === "node scripts/audit-lesson34.mjs", "scripts: dedicated audit:lesson34 script");
ok(Object.keys(pkg.dependencies).sort().join(",") === "clsx,react,react-dom,tailwind-merge", `deps: runtime dependencies unchanged (${Object.keys(pkg.dependencies).join(",")})`);
const bank = readFileSync(join(root, "src", "shared", "finalTestBank.ts"), "utf8");
ok(bank.includes("34: LESSON_34"), "bank: FINAL_TESTS[34] registered");
ok(src["Lesson34.tsx"].includes("<FinalTest") && src["Lesson34.tsx"].includes("lesson={34}") && src["Lesson34.tsx"].includes("FINAL_TESTS[34]"), "final test: mounted in the lesson with lesson 34 bank");
ok(src["Lesson34.tsx"].includes("SLIDE_COUNT_34 - 1"), "final test: gated to the last step");
const bankQ = 15;
{
  const block = /const LESSON_34: FinalTestQuestion\[\] = \[([\s\S]*?)\n\];/.exec(bank);
  ok(!!block, "bank: LESSON_34 block present");
  const bankQ = block ? (block[1].match(/type: "/g) || []).length : 0;
  ok(bankQ >= 12 && bankQ <= 15, `bank: LESSON_34 ships 12–15 questions (got ${bankQ})`);
  ok(block ? (block[1].match(/concept: "/g) || []).length === bankQ : false, "bank: every question carries a concept key");
  ok(block ? (block[1].match(/why: "/g) || []).length === bankQ : false, "bank: every question carries an explanation");
}

// ---------------- cleanup & report ----------------
rmSync(outFile, { force: true });
rmSync(outCss, { force: true });
if (failures.length) {
  console.error(`Lesson 34 audit: ${checks - failures.length} passed, ${failures.length} FAILED`);
  for (const f of failures) console.error(" ✕ " + f);
  process.exit(1);
}
console.log(`Lesson 34 audit: ${checks} checks passed, 0 failed`);
