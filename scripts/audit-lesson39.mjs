// Lesson 39 — source coverage, area separation, interactions, direction, contrast tokens, and route audit.
// Run: npm run audit:lesson39
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { analyzeHtml } from "./lib/bidi-sim.mjs";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "node_modules", ".lesson39-audit", String(process.pid));
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "stdin.mjs");
const failures = [];
let assertions = 0;
// Capture React/jsdom console noise (duplicate keys, DOM nesting, act warnings,
// controlled-input warnings) so a clean console is an asserted contract, not luck.
const consoleNoise = [];
for (const level of ["error", "warn"]) {
  const original = console[level].bind(console);
  console[level] = (...args) => {
    consoleNoise.push(`${level}: ${args.map((value) => String(value)).join(" ").slice(0, 220)}`);
    original(...args);
  };
}
const ok = (condition, message) => {
  assertions++;
  if (!condition) failures.push(message);
};

const { JSDOM } = await import("jsdom");
const dom = new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body></body></html>', { url: "http://localhost/", pretendToBeVisual: true });
const win = dom.window;
for (const key of [
  "window", "document", "navigator", "Element", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement",
  "HTMLSelectElement", "HTMLButtonElement", "HTMLAnchorElement", "Event", "MouseEvent", "KeyboardEvent", "Node",
  "getComputedStyle", "CSS", "MutationObserver", "HashChangeEvent", "requestAnimationFrame", "cancelAnimationFrame",
  "SVGElement", "Text", "Comment", "DocumentFragment",
]) if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
win.scrollTo = () => {};
if (!win.Element.prototype.scrollIntoView) win.Element.prototype.scrollIntoView = () => {};
win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import App from ${JSON.stringify(join(root, "src/App.tsx"))};
import Lesson39 from ${JSON.stringify(join(root, "src/lessons/lesson39/Lesson39.tsx"))};
import StepView39 from ${JSON.stringify(join(root, "src/lessons/lesson39/Steps39.tsx"))};
import TestArea39 from ${JSON.stringify(join(root, "src/lessons/lesson39/TestArea39.tsx"))};
import TeacherArea39 from ${JSON.stringify(join(root, "src/lessons/lesson39/TeacherArea39.tsx"))};
import SolutionsArea39 from ${JSON.stringify(join(root, "src/lessons/lesson39/SolutionsArea39.tsx"))};
import TeacherGuide39 from ${JSON.stringify(join(root, "src/lessons/lesson39/TeacherGuide39.tsx"))};
import * as LEDGER from ${JSON.stringify(join(root, "src/lessons/lesson39/ledger39.ts"))};
import * as DATA from ${JSON.stringify(join(root, "src/lessons/lesson39/data.ts"))};
import * as PRACTICE from ${JSON.stringify(join(root, "src/lessons/lesson39/practiceData39.ts"))};
import * as TEST from ${JSON.stringify(join(root, "src/lessons/lesson39/testData39.ts"))};
import * as SOLUTIONS from ${JSON.stringify(join(root, "src/lessons/lesson39/solutionsData39.ts"))};
import * as COVERAGE from ${JSON.stringify(join(root, "src/lessons/lesson39/coverage39.ts"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); const root = createRoot(el); act(() => root.render(node)); return { el, root: { unmount() { act(() => root.unmount()); } } }; }
export { React, act, createRoot, renderToString, App, Lesson39, StepView39, TestArea39, TeacherArea39, SolutionsArea39, TeacherGuide39, LEDGER, DATA, PRACTICE, TEST, SOLUTIONS, COVERAGE, mount };
`,
    resolveDir: root,
    loader: "tsx",
  },
  bundle: true,
  splitting: true,
  platform: "node",
  format: "esm",
  outdir: outDir,
  outExtension: { ".js": ".mjs" },
  chunkNames: "chunks/[name]-[hash]",
  jsx: "automatic",
  packages: "external",
  logLevel: "silent",
});
const M = await import(pathToFileURL(outFile).href);

const {
  SOURCE_SECTIONS_39, NUMBERED_SECTIONS_39, TIMELINE_ROWS_39, PRONOUN_ROWS_39,
  FOR_SINCE_ROWS_39, GOLDEN_COMPARE_ROWS_39, PERFECT_CONTINUOUS_ROWS_39, sourceSection39,
} = M.LEDGER;
const { SLIDES_39, STEP_COUNT_39, NUMBERED_STEP_COUNT_39, CHAPTERS_39, LESSON_SUBTITLE_39, LESSON_ARABIC_SUBTITLE_39 } = M.DATA;
const { TEST_LEVELS_39, TEST_COUNT_39, TEST_LEVEL_COUNT_39, TEST_INTRO_39, TEST_SOURCE_UNIT_INDEXES_39, TEST_SOURCE_UNIT_TOTAL_39 } = M.TEST;
const { TEST_SOLUTIONS_39 } = M.SOLUTIONS;
const {
  OBJECTIVES_39, TIMELINE_MOMENTS_39, DURATION_CASES_39, FOR_SINCE_SORT_39, STATIVE_VERBS_39,
  EXERCISE29_ITEMS_39, FILL30_ITEMS_39, TENSE31_ITEMS_39, DETECTIVE32_ITEMS_39, ERROR_ITEMS_39,
  READING34_QUESTIONS_39, READING34_ANALYSIS_39, READING34_JOURNEY_39, WRITING37_CRITERIA_39, WRITING37_MODEL_39,
  DIALOGUE_LINES_39, DIALOGUE2_LINES_39, PAIRED_EXAMPLES_39, SUMMARY_MATCH_39, CURRICULUM_MAP_39, NEXT_LESSON_39,
} = M.PRACTICE;
const { COVERAGE_39, COVERAGE_SECTION_COUNT_39, COVERAGE_ACCURACY_NOTES_39, COVERAGE_PLATFORM_ADDITIONS_39 } = M.COVERAGE;
const tick = (ms = 25) => new Promise((resolve) => setTimeout(resolve, ms));
const click = (element) => M.act(() => element?.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true })));
const setNative = (element, value) => {
  if (!element) throw new Error("Expected input is missing.");
  M.act(() => {
    const proto = element.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value);
    element.dispatchEvent(new win.Event("input", { bubbles: true }));
  });
};
const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
// React SSR escapes ' as &#x27; and wraps mixed runs in markup, so text searches
// on rendered HTML must decode entities and drop tags first.
const decodeEntities = (value) =>
  String(value ?? "").replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const textOf = (html) => decodeEntities(String(html ?? "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const mountStep = (id) => {
  const slide = SLIDES_39.find((candidate) => candidate.id === id);
  if (!slide) throw new Error(`No source step ${id}`);
  return M.mount(M.React.createElement(M.StepView39, { slide, onGoTest() {}, onGoSolutions() {} }));
};
const renderStep = (slide) => M.renderToString(M.React.createElement(M.StepView39, { slide, onGoTest() {}, onGoSolutions() {} }));
const source = (id) => {
  const section = sourceSection39(id);
  if (!section) throw new Error(`Missing source section ${id}`);
  return section;
};
const findButton = (scope, text) => [...scope.querySelectorAll("button")].find((button) => normalize(button.textContent).includes(text));
const revealText = (scope, id) => {
  const block = scope.querySelector(`[data-answer-key-for="${id}"]`);
  return normalize(block ? block.textContent : "");
};
const driveChoiceLab = async (scope) => {
  const cards = [...scope.querySelectorAll("[data-lab-item]")];
  for (const card of cards) {
    const radio = card.querySelector('input[type="radio"]');
    if (radio) click(radio);
    await tick(3);
    click(findButton(card, "تحقق من اختياري"));
    await tick(3);
  }
  return cards.length;
};

// 1) Numbered source sections, introduction, source order, and navigation mapping.
ok(SOURCE_SECTIONS_39.length === 40, `ledger contains the opening plus 39 numbered sections (got ${SOURCE_SECTIONS_39.length})`);
ok(
  NUMBERED_SECTIONS_39.length === 39 &&
    NUMBERED_SECTIONS_39.every((section, index) => section.num === index + 1 && section.id === `s${String(index + 1).padStart(2, "0")}`),
  "all 39 numbered source sections exist exactly once in original order",
);
ok(STEP_COUNT_39 === 40 && NUMBERED_STEP_COUNT_39 === 39 && SLIDES_39[0].id === "cover", "native Student Area has opening + 39 numbered source steps");
ok(
  SLIDES_39.map((slide) => slide.sourceId).join("|") === SOURCE_SECTIONS_39.map((section) => section.id).join("|"),
  "each source section maps one-to-one to a native step without reordering",
);
ok(
  CHAPTERS_39.length === 13 && CHAPTERS_39.flatMap((chapter) => chapter.stepIds).join("|") === SOURCE_SECTIONS_39.map((section) => section.id).join("|"),
  "chapter navigation groups every source step once in order",
);
ok(SOURCE_SECTIONS_39.every((section, index) => section.order === index && section.title.length > 0 && section.units.length > 0), "every source section has an ordered title and non-empty content units");
ok(!sourceSection39("s40"), "no fabricated section beyond the supplied 39");
ok(COVERAGE_39.length === 40 && COVERAGE_SECTION_COUNT_39 === 39, "coverage ledger row exists for the opening plus all 39 numbered sections");
ok(COVERAGE_ACCURACY_NOTES_39.length >= 6 && COVERAGE_PLATFORM_ADDITIONS_39.length >= 30, "coverage ledger records the source-accuracy notes and the platform additions");
{
  // Lesson 40 is named in §39 as planned only — it must not exist or be linked.
  ok(!existsSync(join(root, "src/lessons/lesson40")), "Lesson 40 is not implemented in this change");
  const appText = readFileSync(join(root, "src/App.tsx"), "utf8");
  ok(!appText.includes("#/lesson/40") && !/route === 40/.test(appText), "no route or hub card points at the planned Lesson 40");
  ok(NEXT_LESSON_39.status === "planned-not-implemented" && NEXT_LESSON_39.label.includes("الدرس 40"), "§39 keeps Lesson 40 as a planned, not implemented, next station");
  const curriculumHtml = renderStep(SLIDES_39.find((slide) => slide.id === "s39"));
  const curriculumText = textOf(curriculumHtml);
  ok(
    !curriculumHtml.includes('href="#/lesson/40"') &&
      curriculumText.includes("لم يُنفَّذ الدرس 40") &&
      curriculumText.includes("Future Tenses Master Review") &&
      curriculumHtml.includes('data-next-lesson="planned-not-implemented"'),
    "the curriculum map names Lesson 40 as planned without hardcoding navigation to it",
  );
}

// 2) Exact source excerpts and the rebuilt tables.
ok(source("cover").units.some((line) => line.includes(LESSON_SUBTITLE_39)) && source("cover").units.some((line) => line.includes("IQ200")), "cover keeps the English subtitle and IQ200 tagline");
ok(
  source("cover").units.includes("By 8:00, I will have finished my homework.") &&
    source("cover").units.includes("By 8:00, I will have been studying for three hours."),
  "cover keeps the Lesson 38 bridge pair (finished homework → been studying)",
);
const GB_FLAG_EMOJI = "\u{1F1EC}\u{1F1E7}"; // written as an escape so this script itself never contains the emoji
ok(
  !readFileSync(join(root, "src/lessons/lesson39/ledger39.ts"), "utf8").includes(GB_FLAG_EMOJI) &&
    !readFileSync(join(root, "src/lessons/lesson39/data.ts"), "utf8").includes(GB_FLAG_EMOJI),
  "no flag emoji survives in the lesson ledger or titles (repository rule)",
);
ok(source("s01").units.slice(1).length === 10 && source("s01").units.slice(1).every((line, index) => line.startsWith(`${["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"][index]}`)), "§1 contains all ten individually numbered objectives");
ok(OBJECTIVES_39.length === 10 && OBJECTIVES_39.every((objective, index) => source("s01").units.includes(objective)), "the objectives checklist reproduces the ten source objectives verbatim");
ok(
  TIMELINE_ROWS_39.length === 6 && TIMELINE_ROWS_39.map((row) => row[0]).join(",") === "NOW,4:00,5:00,6:00,7:00,8:00" &&
    TIMELINE_ROWS_39[5][1] === "نقطة المرجع المستقبلية",
  "§2 rebuilt timeline keeps the six source moments ending at the future reference point",
);
ok(
  source("s02").units.includes("4 ساعات.") && source("s02").units.includes("By 8:00, Samer will have been studying English for four hours."),
  "§2 keeps the four-hour calculation and Samer's sentence",
);
ok(TIMELINE_MOMENTS_39.length === 6 && TIMELINE_MOMENTS_39.at(-1).durationText === "4:00 → 8:00 = 4 ساعات.", "the duration timeline lab measures four hours from 4:00 to 8:00");
ok(source("s03").units.includes("Subject + will + have + been + V-ing"), "§3 keeps the exact core formula");
ok(
  source("s04").units.includes("She will have been studying for three hours by 9:00.") &&
    source("s04").units.some((line) => line.includes("She will has been studying. ❌")) &&
    source("s04").units.includes("لأن will يتبعها الفعل الأساسي have، وليس has."),
  "§4 keeps the seven-part analysis sentence and the has/have warning",
);
ok(
  PRONOUN_ROWS_39.length === 7 && PRONOUN_ROWS_39.map((row) => row[0]).join(",") === "I,You,He,She,It,We,They" &&
    PRONOUN_ROWS_39[4][1] === "It will have been working." && PRONOUN_ROWS_39.every(([, sentence]) => sentence.includes("will have been ")),
  "§5 pronoun table keeps all seven subjects with will have been + V-ing",
);
ok(!PRONOUN_ROWS_39.some(([, sentence]) => /will has|have being/.test(sentence)), "§5 never conjugates has after will and never writes have being");
ok(
  source("s08").units.includes("for + مدة زمنية.") &&
    source("s08").units.includes("for two hours = لمدة ساعتين.") &&
    source("s09").units.includes("منذ نقطة زمنية محددة.") &&
    source("s09").units.includes("since 2020 = منذ عام 2020."),
  "§8–§9 keep the for-duration / since-starting-point rules with their source example pairs",
);
ok(FOR_SINCE_ROWS_39.length === 4 && FOR_SINCE_ROWS_39.every((row) => row[0].startsWith("for ") && row[1].startsWith("since ")), "§10 rebuilt for/since table keeps four duration/starting-point pairs");
ok(FOR_SINCE_SORT_39.length === 8 && FOR_SINCE_SORT_39.filter((item) => item.kind === "for").length === 4, "the §10 sorting board covers all eight source expressions");
ok(
  DURATION_CASES_39.length === 3 && DURATION_CASES_39.map((item) => item.duration).join(",") === "4,6,6" &&
    DURATION_CASES_39.every((item) => item.referenceValue - item.startValue === item.duration),
  "§11 duration lab keeps the source math: 3→7 = 4 hours, 8 a.m.→2 p.m. = 6 hours, January→July = 6 months",
);
ok(
  DURATION_CASES_39.every((item) => source("s11").units.includes(item.sentence)) &&
    source("s11").units.includes("ملاحظة: نفترض في المثال أن المقارنة تتم بين التاريخ نفسه من الشهرين."),
  "§11 keeps the three source sentences and the same-date assumption note",
);
ok(source("s12").units.includes("بحلول / في موعد لا يتجاوز."), "§12 keeps the exact meaning of by");
ok(
  source("s13").units.includes("By the time you arrive, I will have been studying for two hours.") &&
    source("s14").units.includes("By the time you will arrive, I will have been studying for two hours. ❌") &&
    source("s14").units.includes("By the time + Subject + Present Simple, Subject + will have been + V-ing."),
  "§13–§14 keep the by-the-time examples, the rejected will form, and the Present Simple structure",
);
ok(
  source("s14").units.some((line) => line.includes("By the time you will arrive, I will have been studying for two hours. ❌")) &&
    source("s14").units.some((line) => line.includes("By the time you arrive, I will have been studying for two hours. ✅")),
  "§14 keeps the will/no-will error pair inside the future time clause",
);
ok(source("s15").title.includes("The Long Study Day") && DIALOGUE_LINES_39.length === 8, "§15 keeps The Long Study Day with eight turns");
ok(DIALOGUE_LINES_39.every((line) => source("s15").units.includes(line.ar)), "§15 Arabic translations are the source's own translations, reproduced verbatim");
ok(DIALOGUE_LINES_39.filter((line) => line.analysisOrigin === "source").length === 3, "§15 keeps exactly the three source analyses and labels the rest as platform additions");
ok(source("s16").units.includes("Subject + will have + V3") && source("s16").units.includes("Subject + will have been + V-ing"), "§16 keeps both compared formulas");
ok(
  GOLDEN_COMPARE_ROWS_39.length === 4 && source("s16").tableHeaders?.some((header) => header.includes("غالبًا")),
  "§16 golden comparison is rebuilt as a table and keeps the «غالبًا» qualification in its header",
);
ok(PAIRED_EXAMPLES_39.length === 3, "§17 paired-examples lab covers the three source pairs (books, bridge, learning English)");
ok(
  ["By Sunday, she will have read three books.", "By Sunday, she will have been reading for ten hours.", "By next year, they will have built the bridge.",
   "By next year, they will have been building the bridge for three years.", "By June, I will have completed the English course.",
   "By June, I will have been learning English for two years."].every((line) => source("s17").units.includes(line)),
  "§17 keeps all six paired sentences with their Arabic translations",
);
ok(
  source("s18").units.includes("Future Perfect = انتهى.") && source("s18").units.includes("Future Perfect Continuous = لم ينتهِ.") &&
    source("s18").units.includes("بل الفرق الأساسي:") && source("s18").units.includes("Future Perfect يبرز الإنجاز أو النتيجة.") &&
    source("s18").units.includes("Future Perfect Continuous يبرز مدة النشاط أو امتداده."),
  "§18 keeps the rejected «finished / not finished» framing and the real distinction",
);
ok(source("s19").units.includes("Subject + will not + have + been + V-ing") && source("s19").units.includes("Subject + won't + have + been + V-ing"), "§19 keeps the negative formula in both forms");
ok(source("s21").units.includes("Will + Subject + have + been + V-ing?") && source("s22").units.includes("Yes, I will.") && source("s22").units.includes("No, I won't."), "§21–§22 keep the Yes/No formula and short answers");
ok(source("s23").units.includes("How long + will + Subject + have + been + V-ing?"), "§23 keeps the How long formula with will before the subject");
ok(
  PERFECT_CONTINUOUS_ROWS_39.map((row) => row[1]).join("|") === "have/has been + V-ing|had been + V-ing|will have been + V-ing",
  "§25 three-way comparison keeps Present/Past/Future Perfect Continuous forms",
);
ok(
  ["know", "believe", "understand", "want", "need", "own"].every((verb) => source("s26").units.includes(verb)) && STATIVE_VERBS_39.length === 6,
  "§26 keeps all six stative verbs",
);
ok(
  source("s26").units.some((line) => line.includes("By next year, I will have known her for ten years. ✅")) &&
    source("s26").units.some((line) => line.includes("By next year, I will have been knowing her for ten years. ❌ في الاستعمال المعتاد.")),
  "§26 keeps the know/being-knowing pair with the «in normal use» qualification verbatim",
);
ok(source("s26").units.includes("كلتا الجملتين صحيحتان.") && source("s26").units.some((line) => line.includes("live وwork")), "§26 keeps the live/work exception where both tenses are correct");
ok(source("s27").units.filter((line) => line.includes("❌")).length === 7 && source("s27").units.filter((line) => line.includes("✅")).length === 7, "§27 keeps all seven error pairs");
ok(
  ERROR_ITEMS_39.length === 7 &&
    ERROR_ITEMS_39.map((item) => item.prompt).join("|") ===
      "① She will has been studying. — اختر التصحيح.|② I will have being working. — اختر التصحيح.|③ They will have been work for three hours. — اختر التصحيح.|④ He won't has been waiting. — اختر التصحيح.|⑤ Will she have being studying? — اختر التصحيح.|⑥ By the time you will arrive, I will have been waiting. — اختر التصحيح.|⑦ I will have been knowing him for ten years. — اختر التصحيح.",
  "§27 diagnosis lab covers all seven source error sentences in order",
);
ok(source("s28").title.includes("The Marathon Training") && DIALOGUE2_LINES_39.length === 10, "§28 keeps The Marathon Training with ten turns");
ok(
  DIALOGUE2_LINES_39.every((line) => line.origin === "platform") &&
    DIALOGUE2_LINES_39.slice(0, 9).every((line) => source("s28").units.includes(`${line.speaker}: ${line.en}`)) &&
    DIALOGUE2_LINES_39[9].speaker === "ملخص الحوار" &&
    ["Future Perfect Continuous", "Future Perfect", "Future Simple"].every(
      (tense) => source("s28").units.includes(tense) && DIALOGUE2_LINES_39[9].en.includes(tense),
    ),
  "§28 keeps the source's nine English turns verbatim (speaker + line), labels every Arabic translation as a platform addition, and composes the closing summary from the source's three tense names",
);
ok(DIALOGUE2_LINES_39.filter((line) => line.analysisOrigin === "source").length === 5, "§28 keeps the four source analyses plus the closing summary and labels the rest");
ok(EXERCISE29_ITEMS_39.length === 6 && EXERCISE29_ITEMS_39.every((item, index) => item.n === index + 1 && item.options.length === 3), "§29 keeps all six multiple-choice items");
ok(source("s29").revealUnits?.length === 6 && source("s29").revealUnits?.[0] === "① B — been", "§29 keeps its six-line source key");
ok(FILL30_ITEMS_39.length === 6 && FILL30_ITEMS_39[4].answer === "Will you have been learning", "§30 keeps all six completions including the question form");
ok(source("s30").revealUnits?.length === 6 && source("s30").revealUnits?.[3] === "④ won't have been waiting", "§30 keeps its six-line source key");
ok(TENSE31_ITEMS_39.length === 8 && TENSE31_ITEMS_39[0].answer === "future-perfect" && TENSE31_ITEMS_39[1].answer === "future-perfect-continuous", "§31 keeps the eight tense choices starting with the articles pair");
ok(source("s31").revealUnits?.length === 8 && source("s31").revealUnits?.every((line) => line.includes("—")), "§31 keeps its eight-line key with the Arabic rationale");
ok(DETECTIVE32_ITEMS_39.length === 10 && DETECTIVE32_ITEMS_39[5].answer === "We will have known each other for ten years.", "§32 keeps all ten error sentences including the stative-verb repair");
ok(source("s32").revealUnits?.length === 10, "§32 keeps its ten-line source key");
ok(
  source("s33").units.includes("إذن وجود for لا يفرض Future Perfect Continuous دائمًا.") &&
    source("s33").units.includes("لا تجعل الكلمات الدالة تتحكم بك بصورة آلية."),
  "§33 IQ200 keeps the rule that for does not force the continuous form",
);
ok(source("s34").units.some((line) => line.includes("A Journey Across the Country")) && READING34_QUESTIONS_39.length === 7 && READING34_ANALYSIS_39.length === 6, "§34 keeps the reading text, seven questions, and a six-form platform analysis");
ok(
  READING34_JOURNEY_39.map((stop) => stop.hours).join(",") === "0,5,6,12" &&
    source("s34").revealUnits?.[2] === "③ For six hours." && source("s34").revealUnits?.[4] === "⑤ For twelve hours.",
  "§34 journey clock matches the source math: 6 a.m.→noon = 6 hours, 6 a.m.→6 p.m. = 12 hours",
);
ok(source("s35").units.length === 58 && TEST_SOURCE_UNIT_TOTAL_39 === 58 && TEST_SOURCE_UNIT_INDEXES_39.length === 58 && TEST_SOURCE_UNIT_INDEXES_39.every((value, index) => value === index), "§35 formal test consumes all 58 source lines exactly once");
ok(source("s36").units.length === 3 && !source("s36").revealUnits, "§36 is preserved as heading plus its prompt, and the source key really is absent");
ok(WRITING37_CRITERIA_39.length === 8 && WRITING37_MODEL_39.length === 5 && source("s37").units[1].includes("12 إلى 15"), "§37 keeps the 12–15 sentence task, all eight criteria, and the five-line model");
ok(WRITING37_CRITERIA_39.every((criterion) => source("s37").units.includes(criterion)) && WRITING37_MODEL_39.every((line) => source("s37").units.includes(line)), "§37 criteria and model lines reproduce the source verbatim");
ok(source("s38").units.includes("Subject + will + have + been + V-ing") && source("s38").units.includes("Subject + won't + have + been + V-ing"), "§38 golden summary keeps the positive and negative formulas");
ok(SUMMARY_MATCH_39.length === 7, "§38 summary lab covers the seven golden-summary rules");
ok(
  source("s39").units.filter((line) => /^[①②③④⑤⑥] /.test(line)).length === 6 &&
    CURRICULUM_MAP_39.length === 6 && CURRICULUM_MAP_39.map((item) => item.lesson).join(",") === "34,35,36,37,38,39",
  "§39 curriculum map keeps the six future forms and maps them to Lessons 34–39",
);
ok(source("s39").units.some((line) => line.includes("الدرس 40: Future Tenses Master Review")), "§39 keeps the Lesson 40 master-review station as written in the source");
{
  // Exercise inventory: 6 + 6 + 8 + 10 + 7 + 25 = 62 numbered items.
  const inventory = EXERCISE29_ITEMS_39.length + FILL30_ITEMS_39.length + TENSE31_ITEMS_39.length + DETECTIVE32_ITEMS_39.length + READING34_QUESTIONS_39.length + TEST_COUNT_39;
  ok(inventory === 62, `exercise inventory totals 62 numbered items (got ${inventory})`);
  // Practice vs Master Test: the source itself repeats §29 ①② in §35 ①②; nothing else may overlap.
  const practicePrompts = [
    ...EXERCISE29_ITEMS_39.map((item) => item.prompt),
    ...FILL30_ITEMS_39.map((item) => item.prompt),
    ...TENSE31_ITEMS_39.map((item) => item.prompt),
    ...DETECTIVE32_ITEMS_39.map((item) => item.prompt),
  ];
  const testPrompts = M.TEST.TEST_39.flatMap((question) => question.promptLines);
  const overlap = practicePrompts.filter((prompt) => testPrompts.includes(prompt));
  ok(overlap.length === 2 && overlap[0].includes("By 8:00, I will have ______ studying") && overlap[1].includes("She will have been ______ for five hours"), `only the two source-repeated items overlap between practice and the Master Test (${overlap.length})`);
  ok(
    COVERAGE_39.find((row) => row.id === "s29").accuracyNote?.includes("① و②") && COVERAGE_39.find((row) => row.id === "s35").accuracyNote?.includes("Q1 وQ2"),
    "the coverage ledger documents the source-level repetition between §29 and §35",
  );
}

// 3) Exactly 25 source test items.
ok(TEST_COUNT_39 === 25 && TEST_LEVEL_COUNT_39 === 5 && TEST_LEVELS_39.every((level) => level.questions.length === 5), "formal Test Area contains exactly 25 questions in five levels of five");
ok(TEST_LEVELS_39.map((level) => `${level.questions[0].n}-${level.questions.at(-1).n}`).join("|") === "1-5|6-10|11-15|16-20|21-25", "formal test keeps the exact source level boundaries");
ok(TEST_LEVELS_39[0].questions.every((question) => question.type === "multiple-choice" && question.options?.length === 3), "Level 1 keeps its five multiple-choice questions with three options each");
ok(TEST_LEVELS_39[1].questions.every((question) => question.type === "fill") && TEST_LEVELS_39[2].questions.every((question) => question.type === "repair"), "Level 2 stays completion and Level 3 stays error repair");
ok(TEST_LEVELS_39[3].questions[2].type === "open" && TEST_LEVELS_39[3].questions.filter((question) => question.type === "explain").length === 4, "Level 4 keeps four conceptual items plus the open question about for + Future Perfect (Q18)");
ok(TEST_LEVELS_39[4].questions.every((question) => question.marker?.text), "Level 5 keeps the five paragraph markers ㉑–㉕");
ok(TEST_LEVELS_39[4].questions.at(-1).fieldLabel?.includes("المدير"), "Level 5 keeps the principal's question as its own field");
ok(TEST_LEVELS_39[4].trailing?.length === 1 && TEST_LEVELS_39[4].trailing?.[0].text === "الأسئلة:", "Level 5 keeps the source's «الأسئلة:» line as trailing context");
ok(
  TEST_INTRO_39.length === 2 &&
    TEST_LEVELS_39.every((level) => level.questions.every((question) => question.promptLines.length > 0 && question.promptUnitIndexes.length === question.promptLines.length)),
  "every test question keeps its traced source prompt lines",
);
ok(
  TEST_LEVELS_39[4].questions.map((question) => question.promptLines.at(-1)).join("|") ===
    "By then, the students ______ (work) on their projects for six months.|Maya ______ (complete) three experiments by the end of the month.|At 10:00 on the celebration day, Daniel ______ (present) his new invention.|By the time the visitors arrive, the teachers ______ (prepare) the exhibition for several hours.|\"How long ______ you ______ (develop) these projects by next month?\"",
  "the Boss passage keeps its five gaps in source order, including the Future Continuous gap at 10:00",
);

// 4) Twenty-five platform-authored solutions.
ok(TEST_SOLUTIONS_39.length === 25 && TEST_SOLUTIONS_39.every((solution, index) => solution.n === index + 1), "25 detailed solutions exist for Q1–Q25 in order");
ok(TEST_SOLUTIONS_39.every((solution) => solution.sourceStatus === "platform-authored-teacher-addition"), "every solution is explicitly platform/teacher-authored");
ok(TEST_SOLUTIONS_39.every((solution) => solution.level === Math.ceil(solution.n / 5)), "solutions are grouped by the same five levels as the test");
ok(TEST_SOLUTIONS_39.every((solution) => solution.answer.length > 0 && solution.explanation.length > 30), "every solution carries an answer and substantive reasoning");
ok(
  TEST_SOLUTIONS_39.filter((solution) => solution.n >= 16 && solution.n <= 20).every((solution) => solution.judgment === "open-model" || solution.judgment === "contextual" || solution.judgment === "grammatical-only") &&
    TEST_SOLUTIONS_39.filter((solution) => solution.n >= 16).every((solution) => solution.alternatives?.length),
  "meaning/open questions carry accepted alternatives",
);
ok(TEST_SOLUTIONS_39[17].judgment === "open-model", "Q18 is graded as an open model answer");
ok(TEST_SOLUTIONS_39.filter((solution) => solution.n <= 5).every((solution) => /^(A|B|C)\./.test(solution.answer)), "Level 1 solutions name the correct letter and option");
{
  const answers = Object.fromEntries(TEST_SOLUTIONS_39.map((solution) => [solution.n, solution.answer]));
  ok(answers[21].includes("will have been working"), "Boss Q21 is solved as Future Perfect Continuous (will have been working)");
  ok(answers[22].includes("will have completed"), "Boss Q22 is solved as Future Perfect (will have completed)");
  ok(answers[23].includes("will be presenting") && !answers[23].includes("been"), "Boss Q23 (At 10:00) is solved as Future Continuous, not a perfect form");
  ok(answers[24].includes("will have been preparing"), "Boss Q24 keeps by the time + Present Simple with Future Perfect Continuous");
  ok(
    normalize(answers[25]) === "How long will you have been developing these projects by next month?",
    `Boss Q25 keeps the exact question word order (got «${answers[25]}»)`,
  );
  ok(/^how long will you have been developing/i.test(answers[25]) && !/how long you will/i.test(answers[25]), "Boss Q25 places will before the subject");
  ok(
    TEST_SOLUTIONS_39.every((solution) => !/will has\b|have being\b/i.test(solution.answer)),
    "no solution answer contains the has/being errors this lesson forbids",
  );
}

// 5) Every source step renders.
const initialStepHtml = new Map();
const interactedHtml = [];
for (const slide of SLIDES_39) {
  const html = renderStep(slide);
  initialStepHtml.set(slide.id, html);
  ok(
    html.includes(`data-step-id="${slide.id}"`) && html.includes(`data-source-id="${slide.id}"`) && html.includes(`data-source-section="${slide.id}"`),
    `${slide.id}: renders as a native, traceable step`,
  );
  ok(html.length > 700, `${slide.id}: renders substantive content (${html.length} chars)`);
}

// 6) Test Area neutrality.
const testPreHtml = M.renderToString(M.React.createElement(M.TestArea39, { onSubmitted() {}, onGoSolutions() {} }));
ok((testPreHtml.match(/data-test-question="\d+"/g) || []).length === 25, "pre-submit Test Area renders 25 numbered question panels");
ok((testPreHtml.match(/data-source-unit="s35-unit-\d+"/g) || []).length >= 58, "every source line of §35 is traced into the Test Area markup");
ok(!testPreHtml.includes("data-test-feedback") && !testPreHtml.includes("data-solution="), "before submit there is no correctness feedback and no solution panel in the Test Area");
ok(!readFileSync(join(root, "src/lessons/lesson39/TestArea39.tsx"), "utf8").includes("solutionsData39"), "the formal test component does not import the answer key");
ok(
  readFileSync(join(root, "src/lessons/lesson39/Lesson39.tsx"), "utf8").includes("testSubmitted || teacherUnlocked") &&
    readFileSync(join(root, "src/lessons/lesson39/Lesson39.tsx"), "utf8").includes('lazy(() => import("./SolutionsArea39"))'),
  "Solutions Area is dynamically loaded only after submission or teacher unlock",
);
ok(readFileSync(join(root, "src/lessons/lesson39/TeacherArea39.tsx"), "utf8").includes('lazy(() => import("./TeacherGuide39"))'), "the teacher answer/coverage chunk is deferred until teacher unlock");
ok(readFileSync(join(root, "src/lessons/lesson39/TeacherArea39.tsx"), "utf8").includes('TEACHER_PASSWORD_39 = "somer173"'), "Teacher Area keeps the shared teacher password gate without adding a new password");

// 7) Reveal in §29–§32 and §34 stays hidden until the attempt.
for (const id of ["s29", "s30", "s31", "s32", "s34"]) {
  const { el, root: reactRoot } = mountStep(id);
  await tick();
  const before = revealText(el, id);
  ok(before.length > 0 && !before.includes("①"), `${id}: the source key block is withheld before the attempt`);
  reactRoot.unmount();
  el.remove();
}

// 8) Interactive labs.
{
  const { el, root: reactRoot } = mountStep("s01");
  await tick();
  const boxes = [...el.querySelectorAll('input[type="checkbox"]')];
  ok(boxes.length === OBJECTIVES_39.length && boxes.length === 10, "§1 self-review checklist lists all ten objectives");
  boxes.forEach((box) => click(box));
  await tick(5);
  ok(normalize(el.textContent).includes("من 10 هدفًا"), "§1 checklist counts the learner's own marking");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s02");
  await tick();
  const moments = [...el.querySelectorAll("[data-timeline-moment]")];
  ok(moments.length === 6, "§2 timeline exposes the six source moments");
  click(moments.find((node) => node.getAttribute("data-timeline-moment") === "ref-8"));
  await tick(5);
  ok(
    !!el.querySelector('[data-timeline-readout="ref-8"]') &&
      el.textContent.includes("4:00 → 8:00 = 4 ساعات.") &&
      el.textContent.includes("By 8:00, Samer will have been studying English for four hours."),
    "§2 selecting 8:00 shows the four-hour duration and the source sentence",
  );
  const radios = [...el.querySelectorAll('input[name="timeline-answer"]')];
  ok(radios.length === 6, "§2 asks at which moment the duration is measured");
  click(radios.find((radio) => radio.getAttribute("value") === "ref-8"));
  await tick(3);
  click(findButton(el, "تحقق من إجابتي"));
  await tick(5);
  ok(normalize(el.textContent).includes("إجابة صحيحة."), "§2 answers with post-attempt feedback naming the 8:00 reference point");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s03");
  await tick();
  for (const piece of ["subject", "will", "have", "been", "ving"]) {
    click(el.querySelector(`[data-formula-piece="${piece}"]`));
    await tick(2);
  }
  click(findButton(el, "تحقق من الترتيب"));
  await tick(5);
  ok(
    normalize(el.textContent).includes("ترتيب صحيح.") && el.textContent.includes("Subject + will + have + been + V-ing"),
    "§3 formula builder confirms Subject → will → have → been → V-ing",
  );
  const wrong = mountStep("s03");
  await tick();
  for (const piece of ["subject", "will", "been", "have", "ving"]) {
    click(wrong.el.querySelector(`[data-formula-piece="${piece}"]`));
    await tick(2);
  }
  click(findButton(wrong.el, "تحقق من الترتيب"));
  await tick(5);
  ok(normalize(wrong.el.textContent).includes("الترتيب يحتاج مراجعة."), "§3 formula builder rejects a wrong order with review feedback");
  wrong.root.unmount(); wrong.el.remove();
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s04");
  await tick();
  const parts = [...el.querySelectorAll("[data-part]")];
  ok(parts.length === 7, "§4 exposes all seven structural roles");
  for (const part of parts) {
    click(part);
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(text.includes("جزء ثابت من التركيب") && text.includes("التصريف الثالث من be") && text.includes("النقطة المستقبلية التي نقيس عندها المدة"), "§4 every role explains its function after being opened");
  click(el.querySelector('input[name="parts-have-has"][value="have"]'));
  await tick(3);
  click(findButton(el, "تحقق من اختياري"));
  await tick(5);
  ok(normalize(el.textContent).includes("اختيار مناسب."), "§4 have/has check accepts will have been studying");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s05");
  await tick();
  const pronouns = [...el.querySelectorAll("[data-pronoun]")];
  ok(pronouns.length === 7, "§5 conjugation console exposes all seven pronouns");
  for (const pronoun of ["He", "She", "It"]) {
    click(pronouns.find((node) => node.getAttribute("data-pronoun") === pronoun));
    await tick(3);
  }
  ok(
    !!el.querySelector('[data-conjugation-readout="It"]') && el.textContent.includes("It will have been working.") && !el.textContent.includes("will has"),
    "§5 It keeps will have been + V-ing without has",
  );
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s10");
  await tick();
  const items = [...el.querySelectorAll("[data-sort-item]")];
  ok(items.length === FOR_SINCE_SORT_39.length && items.length === 8, "§10 sorting board lists the eight source expressions");
  for (const item of items) {
    const record = FOR_SINCE_SORT_39.find((entry) => entry.id === item.getAttribute("data-sort-item"));
    click(item.querySelector(`[data-sort-value="${record.kind}"]`));
    await tick(2);
  }
  click(findButton(el, "تحقق من الفرز"));
  await tick(5);
  ok(normalize(el.textContent).includes("الفرز صحيح بالكامل."), "§10 sorting board confirms the correct for/since split");
  const cards = await driveChoiceLab(el);
  ok(cards === 3 && normalize(el.textContent).includes("اختيار مناسب."), "§10 for/since question lab is answerable");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s11");
  await tick();
  const cases = [...el.querySelectorAll("[data-duration-case]")];
  ok(cases.length === DURATION_CASES_39.length && cases.length === 3, "§11 duration lab renders the three source cases");
  for (const node of cases) {
    const record = DURATION_CASES_39.find((entry) => entry.id === node.getAttribute("data-duration-case"));
    click(node.querySelector(`[data-duration-point="start"][data-duration-value="${record.startValue}"]`));
    await tick(2);
    click(node.querySelector(`[data-duration-point="reference"][data-duration-value="${record.referenceValue}"]`));
    await tick(2);
    click(findButton(node, "احسب المدة"));
    await tick(3);
  }
  const text = normalize(el.textContent);
  ok(
    text.includes("4 ساعات") && text.includes("6 ساعات") && text.includes("6 أشهر") &&
      text.includes("By 7:00, Ahmad will have been studying for four hours.") &&
      text.includes("By 2:00 p.m., Layla will have been working for six hours.") &&
      text.includes("By July, the students will have been working on the project for six months."),
    "§11 computes 4 hours, 6 hours, and 6 months and shows the matching source sentences",
  );
  ok(text.includes("المدة مطابقة لحساب المصدر."), "§11 confirms the computed duration against the source math");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s15");
  await tick();
  const lines = [...el.querySelectorAll("[data-dialogue-line]")];
  ok(lines.length === 8, "§15 dialogue has all eight turns");
  for (const line of lines) {
    click(findButton(line, "تحليل السطر"));
    await tick(3);
  }
  const text = normalize(el.textContent);
  ok(DIALOGUE_LINES_39.every((line) => text.includes(line.analysis)), "§15 every turn reveals its Arabic translation and analysis after being opened");
  ok(text.includes("الترجمة العربية لهذا السطر من نص المصدر."), "§15 states that the translations come from the source");
  const cards = await driveChoiceLab(el);
  ok(cards === 2 && text.includes("3:00"), "§15 comprehension checks are answerable, including the five-hour calculation");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s26");
  await tick();
  const verbs = [...el.querySelectorAll("[data-stative-verb]")];
  ok(verbs.length === STATIVE_VERBS_39.length && verbs.length === 6, "§26 stative board exposes all six source verbs");
  for (const verb of verbs) {
    click(verb);
    await tick(2);
  }
  ok(
    !!el.querySelector('[data-stative-readout="own"]') &&
      normalize(el.textContent).includes("By next year, I will have known her for ten years.") &&
      normalize(el.textContent).includes("By 2030, I will have owned this house for ten years."),
    "§26 shows the correct Future Perfect form for every stative verb",
  );
  const cards = await driveChoiceLab(el);
  ok(cards === 3 && normalize(el.textContent).includes("اختيار مناسب."), "§26 judgement lab accepts will have known over will have been knowing");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s19");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length === 3, "§19 negative builder renders its three items");
  for (const item of items) {
    setNative(item.querySelector("input"), "By 6:00, I won't have been studying for three hours.");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(text.includes("won't أو will not") && text.includes("have been بعد النفي") && text.includes("لا يوجد has أو being"), "§19 builder reports the required negative elements");
  ok(text.includes("العناصر المطلوبة ظاهرة في إجابتك.") && text.includes("إجابة المصدر:"), "§19 builder confirms the elements and reveals the source answer");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s21");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length === 3, "§21 Yes/No question builder renders its three items");
  for (const item of items) {
    setNative(item.querySelector("input"), "Will you have been studying for three hours by 8:00?");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(text.includes("يبدأ السؤال بـ Will") && text.includes("الفاعل بعد will") && text.includes("علامة السؤال"), "§21 builder checks Will + Subject + have been + V-ing order");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s23");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length === 3, "§23 How long builder renders its three items");
  for (const item of items) {
    setNative(item.querySelector("input"), "How long will you have been studying by 8:00?");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("يبدأ السؤال بـ How long will"), "§23 builder checks How long + will + Subject + have been + V-ing");
  const wrong = mountStep("s23");
  await tick();
  const wrongItem = wrong.el.querySelector("[data-build-item]");
  setNative(wrongItem.querySelector("input"), "How long you will have been studying by 8:00?");
  await tick(2);
  click(findButton(wrongItem, "افحص العناصر"));
  await tick(5);
  ok(normalize(wrong.el.textContent).includes("راجع العناصر الناقصة"), "§23 builder rejects How long + Subject + will word order");
  wrong.root.unmount(); wrong.el.remove();
  reactRoot.unmount(); el.remove();
}
{
  const choiceLabs = ["s06", "s07", "s08", "s09", "s12", "s13", "s14", "s16", "s17", "s18", "s20", "s22", "s24", "s25", "s27", "s28", "s33", "s38"];
  for (const id of choiceLabs) {
    const { el, root: reactRoot } = mountStep(id);
    await tick();
    const cards = await driveChoiceLab(el);
    const text = normalize(el.textContent);
    const lab = el.querySelector("[data-lab]");
    ok(cards > 0 && lab && (text.includes("اختيار مناسب.") || text.includes("راجع المعنى")), `${id}: its choice lab is answerable and gives post-attempt feedback (${cards} items)`);
    interactedHtml.push(el.innerHTML);
    reactRoot.unmount(); el.remove();
  }
}
{
  const { el, root: reactRoot } = mountStep("s39");
  await tick();
  const forms = [...el.querySelectorAll("[data-curriculum-form]")];
  ok(forms.length === 6, "§39 curriculum map exposes the six completed future forms");
  for (const form of forms) {
    click(form);
    await tick(2);
  }
  ok(
    !!el.querySelector('[data-curriculum-readout="future-perfect-continuous"]') &&
      normalize(el.textContent).includes("Subject + will have been + V-ing"),
    "§39 shows the Future Perfect Continuous pattern when its card is opened",
  );
  ok(!!el.querySelector('[data-next-lesson="planned-not-implemented"]') && el.querySelectorAll('a[href*="lesson/40"]').length === 0, "§39 names Lesson 40 as planned without linking to it");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}

// 9) Practice keys after attempt.
{
  const { el, root: reactRoot } = mountStep("s29");
  await tick();
  for (const item of EXERCISE29_ITEMS_39) {
    const card = el.querySelector(`[data-practice-item="exercise29-${item.n}"]`);
    click(card.querySelector(`input[value="${item.answer}"]`));
    await tick(2);
    click(findButton(card, "تحقق"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("① B — been") && normalize(el.textContent).includes("⑥ B — learning"), "§29 all six items are recorded and the source key appears after the attempt");
  ok(revealText(el, "s29").includes("① B — been"), "§29 source key block unlocks only after all six attempts");
  ok(normalize(el.textContent).includes("تكرار من المصدر نفسه") || normalize(el.textContent).includes("يردان حرفيًا"), "§29 tells the learner that ① and ② reappear in the Master Test as written in the source");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s30");
  await tick();
  for (const item of FILL30_ITEMS_39) {
    const card = el.querySelector(`[data-practice-item="fill30-${item.n}"]`);
    setNative(card.querySelector("input"), item.answer);
    await tick(2);
    click(findButton(card, "تحقق"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("مطابق لمفتاح المصدر."), "§30 accepts the exact source completions");
  ok(revealText(el, "s30").includes("① will have been studying"), "§30 the complete fill key appears after all six checks");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s31");
  await tick();
  for (const item of TENSE31_ITEMS_39) {
    const card = el.querySelector(`[data-practice-item="tense31-${item.n}"]`);
    click(card.querySelector(`input[value="${item.answer}"]`));
    await tick(2);
    click(findButton(card, "تحقق"));
    await tick(2);
  }
  ok(TENSE31_ITEMS_39.every((item) => normalize(el.textContent).includes(item.answerText)), "§31 every pair shows the chosen tense answer after the attempt");
  ok(revealText(el, "s31").includes("① will have written"), "§31 the source answer/rationale key appears after all eight attempts");
  ok(normalize(el.textContent).includes("لا نقول إن Future Perfect يعني أن العمل انتهى"), "§31 restates that the lesson never teaches finished/not-finished as the difference");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s32");
  await tick();
  for (const item of DETECTIVE32_ITEMS_39) {
    const card = el.querySelector(`[data-practice-item="detective32-${item.n}"]`);
    setNative(card.querySelector("input[type=text]"), "My correction for this sentence");
    await tick(2);
    click(findButton(card, "اعرض تصحيح المصدر"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(DETECTIVE32_ITEMS_39.every((item) => text.includes(item.answer)), "§32 all ten source corrections appear after the learner writes a correction");
  ok(revealText(el, "s32").includes("① I will have been studying for three hours."), "§32 the source key block is revealed after the ten attempts");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s34");
  await tick();
  const stops = [...el.querySelectorAll("[data-journey-point]")];
  ok(stops.length === READING34_JOURNEY_39.length && stops.length === 4, "§34 journey clock exposes the four source moments");
  for (const stop of stops) {
    click(stop);
    await tick(2);
  }
  const journeyText = normalize(el.textContent);
  ok(journeyText.includes("6 ساعة") || journeyText.includes("المدة المنقضية منذ الانطلاق: 12 ساعة."), "§34 journey clock reports the elapsed hours from 6:00 a.m.");
  const fields = [...el.querySelectorAll("textarea")];
  ok(fields.length === 7, "§34 asks all seven comprehension questions in the student's own words");
  const revealButton = () => findButton(el, "اعرض إجابات المصدر");
  ok(revealButton()?.disabled === true, "§34 source answers stay locked until all seven answers are written");
  fields.forEach((field, index) => setNative(field, `My answer to question ${index + 1}`));
  await tick(5);
  ok(revealButton()?.disabled === false, "§34 answering all seven questions enables the source key");
  click(revealButton());
  await tick(5);
  ok(revealText(el, "s34").includes("① At 6:00 in the morning."), "§34 the seven source answers appear after the attempt");
  ok(normalize(el.textContent).includes("تحليل صيغ المستقبل في النص — إضافة من المنصة"), "§34 adds a labeled platform analysis of the future forms");
  ok(normalize(el.textContent).includes("النص يتضمن جملتين بصيغة Future Perfect Continuous"), "§34 documents that the passage has two FPC sentences while the source key names one");
  click(el.querySelector('input[type="checkbox"]'));
  await tick(5);
  ok(!!el.querySelector("mark"), "§34 the optional future-form highlight marks the passage without hiding it");
  const cards = await driveChoiceLab(el);
  ok(cards === 3 && normalize(el.textContent).includes("اختيار مناسب."), "§34 time-math verification lab is answerable");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s37");
  await tick();
  const writing = el.querySelector('textarea[lang="en"]');
  ok(!!writing && el.querySelectorAll('input[type="checkbox"]').length === 8, "§37 writing workspace has a text area and the eight source criteria");
  setNative(writing, Array.from({ length: 12 }, (_, index) => `Sentence ${index + 1}.`).join(" "));
  await tick(5);
  ok(normalize(el.textContent).includes("12") && normalize(el.textContent).includes("12–15"), "§37 counts the learner's sentences against the 12–15 requirement");
  ok(normalize(el.textContent).includes("لا يصدر النظام حكمًا آليًا"), "§37 does not claim automatic grading of the paragraph");
  const modelButton = findButton(el, "اعرض نموذج المصدر بعد الكتابة");
  ok(modelButton?.disabled === false, "§37 the source model appears only after at least twelve sentences");
  click(modelButton);
  await tick(5);
  ok(WRITING37_MODEL_39.every((line) => normalize(el.textContent).includes(line)), "§37 shows the complete five-line source model after the writing attempt");
  ok(normalize(el.textContent).includes("إضافة من المنصة لدعم المراجعة الذاتية"), "§37 labels the per-line form annotations as a platform addition");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s35");
  await tick();
  const text = normalize(el.textContent);
  ok(text.includes("25") && text.includes("خمسة مستويات"), "§35 student step states the 25-question / five-level structure without printing the questions");
  ok(
    el.querySelectorAll("[data-test-question]").length === 0 && !text.includes("① By 8:00, I will have ______ studying for three hours."),
    "§35 step does not duplicate the formal test questions in the student surface",
  );
  ok(!!findButton(el, "فتح Test Area"), "§35 step launches the separate Test Area");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s36");
  await tick();
  ok(normalize(el.textContent).includes("Solutions Area") && el.querySelectorAll("[data-solution]").length === 0, "§36 step points to the gated Solutions Area without exposing any answer");
  ok(!!findButton(el, "فتح Solutions Area"), "§36 step launches the Solutions Area");
  reactRoot.unmount(); el.remove();
}

// 10) Solutions Area.
{
  const locked = M.renderToString(M.React.createElement(M.SolutionsArea39, { unlocked: false, onGoTest() {}, onGoTeacher() {} }));
  ok(locked.includes("data-solutions-locked") && !locked.includes("data-solution="), "Solutions Area remains blank/locked without submission or teacher access");
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.SolutionsArea39, { unlocked: true, onGoTest() {}, onGoTeacher() {} }));
  await tick();
  const numbers = new Set();
  for (const tab of el.querySelectorAll('nav[aria-label="مستويات حلول اختبار الدرس 39"] button')) {
    click(tab);
    await tick(3);
    for (const card of el.querySelectorAll("[data-solution]")) numbers.add(Number(card.getAttribute("data-solution")));
  }
  ok(numbers.size === 25 && [...numbers].sort((a, b) => a - b).every((n, index) => n === index + 1), "after unlock, Solutions Area exposes all 25 solutions across its five level tabs");
  ok([...el.querySelectorAll("[data-source-status]")].every((node) => node.getAttribute("data-source-status") === "platform-authored-teacher-addition"), "every solution card is marked as a platform/teacher addition");
  const firstCard = el.querySelector("[data-solution]");
  ok(!!firstCard && firstCard.querySelectorAll("[data-solution-details]").length === 0 && normalize(firstCard.textContent).includes("الإجابة النموذجية"), "solution cards start collapsed with the answer visible");
  const cardToggle = firstCard ? findButton(firstCard, "إظهار الشرح والبدائل") : null;
  ok(
    !!cardToggle && cardToggle.getAttribute("aria-expanded") === "false" &&
      cardToggle.getAttribute("aria-controls") === `solution-39-details-${firstCard.getAttribute("data-solution")}`,
    "each solution card has an accessible expand control",
  );
  click(cardToggle);
  await tick(3);
  ok(firstCard.querySelectorAll("[data-solution-details]").length === 1 && normalize(firstCard.textContent).includes("التفسير:") && cardToggle.getAttribute("aria-expanded") === "true", "expanding one card reveals its explanation");
  click(cardToggle);
  await tick(3);
  ok(firstCard.querySelectorAll("[data-solution-details]").length === 0, "the same control collapses the card again");
  click(findButton(el, "فتح كل الشروح"));
  await tick(3);
  ok([...el.querySelectorAll("[data-solution]")].every((card) => card.querySelector("[data-solution-details]")), "the level control expands every card in the current level at once");
  click(el.querySelectorAll('nav[aria-label="مستويات حلول اختبار الدرس 39"] button')[4]);
  await tick(5);
  const bossText = normalize(el.textContent);
  ok(bossText.includes("will have been working") && bossText.includes("will be presenting"), "the Boss level explains why Q21 is continuous and Q23 is Future Continuous");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}

// 11) Teacher gate and guide.
{
  const lockedTeacher = M.renderToString(M.React.createElement(M.TeacherArea39, { unlocked: false, onUnlockChange() {}, onGoSolutions() {} }));
  ok(lockedTeacher.includes('type="password"') && !lockedTeacher.includes("data-teacher-solution"), "Teacher Area starts gated and renders no formal answer explanations");
  const { el: guide, root: guideRoot } = M.mount(M.React.createElement(M.TeacherGuide39, { onGoSolutions() {}, onLock() {} }));
  await tick();
  ok(guide.querySelectorAll("[data-coverage-section]").length === 40, "teacher coverage tab documents the opening plus all 39 source sections");
  ok(!!guide.querySelector("[data-teacher-audit-summary]") && normalize(guide.textContent).includes("ملخص الفحص الآلي"), "teacher coverage tab carries the automated-audit summary");
  click(findButton(guide, "حلول الاختبار"));
  await tick(5);
  ok(guide.querySelectorAll("[data-teacher-solution]").length === 25, "teacher guide contains all 25 detailed test answers");
  click(findButton(guide, "مفاتيح التدريب والقراءة"));
  await tick(5);
  const keysText = normalize(guide.textContent);
  ok(keysText.includes("Grammar Detective") && keysText.includes("A Journey Across the Country") && keysText.includes("The Marathon Training"), "teacher keys cover the detective, the reading, and both dialogues");
  click(findButton(guide, "القواعد والمفاهيم الخاطئة"));
  await tick(5);
  ok(guide.querySelectorAll("[data-misconception]").length >= 10 && normalize(guide.textContent).includes("ملاحظات دقة على المصدر"), "teacher rules tab lists the misconceptions and the source-accuracy notes");
  click(findButton(guide, "تصحيح مهمة الكتابة"));
  await tick(5);
  const gradingText = normalize(guide.textContent);
  ok(
    gradingText.includes("سلم التقدير المقترح") && gradingText.includes("خطوات التصحيح المقترحة") && WRITING37_CRITERIA_39.every((criterion) => gradingText.includes(normalize(criterion))),
    "teacher grading tab carries the writing rubric, the correction steps, and all eight source criteria",
  );
  ok(gradingText.includes("لا يصحّح مهمة الكتابة آليًا"), "teacher grading tab states that the system does not grade the paragraph automatically");
  for (const tab of ["خريطة التغطية", "مفاتيح التدريب والقراءة", "حلول الاختبار", "القواعد والمفاهيم الخاطئة", "تصحيح مهمة الكتابة"]) {
    click(findButton(guide, tab));
    await tick(5);
    interactedHtml.push(guide.innerHTML);
  }
  guideRoot.unmount(); guide.remove();
}

// 12) Integrated shell.
{
  const { el: shell, root: shellRoot } = M.mount(M.React.createElement(M.Lesson39, { onExit() {} }));
  await tick();
  ok(!!shell.querySelector('[data-lesson="39"] [data-area="lesson39-student"]'), "integrated Lesson 39 shell starts in the Student Area");
  const mobileToggle = findButton(shell, "محتويات الدرس");
  const mobilePanel = shell.querySelector("#lesson39-mobile-nav");
  ok(mobileToggle?.getAttribute("aria-expanded") === "false" && mobilePanel?.hidden, "mobile navigation exposes a controlled, initially collapsed panel");
  click(mobileToggle);
  await tick(5);
  ok(mobileToggle?.getAttribute("aria-expanded") === "true" && mobilePanel && !mobilePanel.hidden, "mobile navigation opens");
  click(mobileToggle);
  await tick(5);
  ok(mobileToggle?.getAttribute("aria-expanded") === "false" && mobilePanel?.hidden, "mobile navigation closes");
  const stepButtons = [...shell.querySelectorAll("[data-step-nav]")];
  ok(stepButtons.length > 0 && stepButtons.some((button) => button.getAttribute("data-step-nav") === "cover"), "chapter navigation exposes step buttons for the opening step");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!shell.querySelector('[data-area="lesson39-student"] [data-step-id="s01"]'), "Student Area supports keyboard next-step navigation (ArrowLeft moves forward in RTL)");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!shell.querySelector('[data-area="lesson39-student"] [data-step-id="cover"]'), "keyboard navigation returns to the opening step");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "End", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!shell.querySelector('[data-step-id="s39"]') && shell.querySelector('[role="progressbar"]')?.getAttribute("aria-valuenow") === String(STEP_COUNT_39), "End jumps to the last source step and the progress indicator reports 40/40");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "Home", bubbles: true, cancelable: true })));
  await tick(5);
  const solutionTab = findButton(shell, "منطقة الحلول");
  ok(solutionTab?.disabled === true, "Solutions Area stays locked before test submission or teacher unlock");
  click(findButton(shell, "منطقة الاختبار"));
  await tick();
  const shellTest = shell.querySelector('[data-area="lesson39-test"]');
  const shellQuestions = [...shellTest.querySelectorAll("[data-test-question]")];
  ok(shellQuestions.length === 25, "integrated Test Area renders the 25 formal questions");
  const submit = findButton(shellTest, "إرسال الاختبار");
  ok(submit?.disabled === true, "submission stays disabled until all 25 questions are answered");
  for (const card of shellQuestions) {
    const radio = card.querySelector('input[type="radio"]');
    if (radio) click(radio);
    else setNative(card.querySelector("input[type=text], textarea"), `response ${card.getAttribute("data-test-question")}`);
  }
  await tick(10);
  ok(findButton(shellTest, "إرسال الاختبار")?.disabled === false, "all 25 answers enable the submission button");
  click(findButton(shellTest, "إرسال الاختبار"));
  await tick(10);
  ok(normalize(shellTest.textContent).includes("لا يوجد تصحيح فوري"), "after submission the Test Area states that there is no immediate correction");
  ok(shellTest.querySelectorAll("[data-test-feedback]").length === 0 && !shellTest.querySelector("[data-solution]"), "even after submission the Test Area contains no score, key, or explanation");
  ok(findButton(shell, "منطقة الحلول")?.disabled === false, "submitting the test unlocks the Solutions Area");
  click(findButton(shell, "منطقة الحلول"));
  await M.act(async () => { await tick(120); });
  ok(shell.querySelectorAll('[data-area="lesson39-solutions"] [data-solution]').length === 5, "integrated Solutions Area lazy-loads the first level after submission");
  click(findButton(shell, "منطقة المعلم"));
  await tick();
  const teacherForm = shell.querySelector('form[data-area="lesson39-teacher"]');
  const passwordField = teacherForm?.querySelector('input[type="password"]');
  setNative(passwordField, "wrong-password");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!teacherForm.querySelector('[role="alert"]'), "Teacher Area reports an accessible error for an incorrect password");
  ok(!shell.querySelector('[data-area="lesson39-teacher"] nav[aria-label="أقسام دليل المعلم"]'), "a wrong password does not load the teacher guide");
  setNative(passwordField, "somer173");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await M.act(async () => { await tick(150); });
  ok(!!shell.querySelector('[data-area="lesson39-teacher"] nav[aria-label="أقسام دليل المعلم"]'), "the shared teacher password loads the separate Teacher Area");
  shellRoot.unmount();
  shell.remove();
}
// 13) English-direction isolation, BIDI oracle, contrast.
let renderedSnapshots = [];
const directionSources = ["kit39.tsx", "TestArea39.tsx", "SolutionsArea39.tsx", "TeacherGuide39.tsx", "TeacherArea39.tsx", "Steps39.tsx", "Lesson39.tsx", "labs39.tsx", "ledger39.ts", "practiceData39.ts", "testData39.ts", "solutionsData39.ts", "coverage39.ts"].map((file) => readFileSync(join(root, "src", "lessons", "lesson39", file), "utf8")).join("\n");
ok(directionSources.includes('dir={pureEnglish ? "ltr" : "auto"}') || (directionSources.includes('dir="ltr"') && directionSources.includes("font-en")), "Lesson 39 isolates English/formulas LTR");
ok(!/unicode-bidi\s*:\s*[^;]*override|direction\s*:\s*rtl\s*!important/i.test(directionSources), "Lesson 39 adds no blanket BIDI override rules");
ok(!/[\u2066\u2067\u2068\u2069\u202A\u202B\u202C\u202D\u202E]/.test(directionSources), "Lesson 39 data carries no raw Unicode bidi control characters");
{
  const snapshots = [...initialStepHtml.values(), ...interactedHtml, testPreHtml, M.renderToString(M.React.createElement(M.SolutionsArea39, { unlocked: true, onGoTest() {}, onGoTeacher() {} })), M.renderToString(M.React.createElement(M.TeacherGuide39, { onGoSolutions() {}, onLock() {} }))];
  renderedSnapshots = snapshots;
  const violations = [];
  for (const html of snapshots) {
    for (const paragraph of analyzeHtml(html)) {
      for (const violation of paragraph.violations || []) violations.push(`${violation.latin} ⇄ ${violation.arabic} (${violation.sig})`);
    }
  }
  ok(violations.length === 0, `the rendered Lesson 39 markup passes the English/Arabic BIDI oracle — ${violations.length} violations: ${violations.slice(0, 12).join(" · ") || "clean"}`);
}
{
  const englishSamples = [
    "Subject + will + have + been + V-ing",
    "Subject + won't + have + been + V-ing",
    "She will have been studying for three hours by 9:00.",
    "Will you have been studying for three hours by 8:00?",
    "They won't have been waiting for long when we arrive.",
    "By the time you arrive, I will have been studying for two hours.",
    "By the time she comes, we will have been waiting for an hour.",
    "How long will you have been learning English by next year?",
  ];
  const allHtml = [...initialStepHtml.values()].join("\n");
  const allText = textOf(allHtml);
  const foundSamples = englishSamples.filter((sample) => allText.includes(sample));
  ok(
    foundSamples.length === englishSamples.length,
    `English formulas, negatives, time clauses, and questions render in their original word order (${foundSamples.length}/${englishSamples.length}: ${englishSamples.filter((sample) => !foundSamples.includes(sample)).join(" | ") || "all found"})`,
  );
  ok(allHtml.includes('dir="ltr"') && allHtml.includes("font-en"), "LTR isolation is applied to English runs in the rendered output");
}
function channel(hex) { const value = parseInt(hex, 16) / 255; return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4; }
function luminance(hex) { const clean = hex.replace("#", ""); return 0.2126 * channel(clean.slice(0, 2)) + 0.7152 * channel(clean.slice(2, 4)) + 0.0722 * channel(clean.slice(4, 6)); }
function contrast(fg, bg) { const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a); return (values[0] + 0.05) / (values[1] + 0.05); }
const contrastPairs = [
  ["#24343b", "#ffffff", "main text on white"], ["#24343b", "#fffdf8", "main text on warm surface"],
  ["#24343b", "#f5f3ed", "main text on lesson background"], ["#24343b", "#fdfcf8", "main text on lab surface"],
  ["#24343b", "#f7f8f5", "main text on hover surface"], ["#24343b", "#eef4f0", "main text on selected surface"],
  ["#24343b", "#edf5ee", "main text on feedback surface"], ["#43575a", "#ffffff", "secondary text on white"],
  ["#43575a", "#fffdf8", "secondary text on warm surface"], ["#43575a", "#f3f5f2", "secondary text on neutral surface"],
  ["#43575a", "#fbfaf6", "secondary text on warm card"], ["#53676a", "#ffffff", "muted text on white"],
  ["#53676a", "#f7faf8", "muted text on pale green"], ["#53676a", "#fdfcf8", "muted text on lab card"],
  ["#17354a", "#ffffff", "navy text on white"], ["#17354a", "#fffdf8", "navy text on warm white"],
  ["#28533b", "#edf5ee", "success text on feedback surface"], ["#76531e", "#fbf6eb", "amber text on callout"],
  ["#18333b", "#fbfdfc", "English text on reading surface"], ["#8d3832", "#ffffff", "error text on white"],
  ["#ffffff", "#17354a", "white on navy header"], ["#ffffff", "#245f62", "white on primary button"],
  ["#f0ddb6", "#17354a", "pale accent on navy header"], ["#596965", "#f5f5f2", "disabled button text"],
  ["#596965", "#ece9e1", "disabled primary-button text"], ["#24343b", "#f4e8c3", "highlighted reading text"],
  ["#17354a", "#ffffff", "focus ring on white"],
  ["#ffffff", "#1d5053", "white on the primary-button hover surface"],
  ["#ffffff", "#7a5516", "white on the amber camera band"],
  ["#fdf1d8", "#7a5516", "pale chip text on the amber camera band"],
  ["#245f62", "#ffffff", "accent text on white"],
  ["#245f62", "#eef4f0", "accent text on pale green hover"],
  ["#6a4d16", "#fbf6eb", "amber text on amber surface"],
  ["#24343b", "#e6ebe7", "main text on neutral surface hover"],
  ["#24343b", "#e8e5dc", "main text on warm divider surface"],
  ["#24343b", "#edf2ee", "main text on pale mint surface"],
  ["#24343b", "#eef2f6", "main text on pale blue surface"],
  ["#24343b", "#fbefed", "main text on pale rose surface"],
  ["#24343b", "#fffdf6", "main text on warm cream surface"],
  ["#28533b", "#b8d6c0", "success text on progress track"],
  ["#28533b", "#d9eadc", "success text on pale green chip"],
  ["#43575a", "#edf2ee", "secondary text on pale mint surface"],
];
const contrastFailures = contrastPairs.filter(([fg, bg]) => contrast(fg, bg) < 4.5);
ok(contrastFailures.length === 0, `audited text/background palette pairs meet WCAG AA 4.5:1 (${contrastFailures.map(([fg, bg, label]) => `${label} ${contrast(fg, bg).toFixed(2)}:1`).join(", ")})`);
ok(contrast("#17354a", "#ffffff") >= 3 && contrast("#17354a", "#fffdf8") >= 3, "focus indicator contrast is at least 3:1 against both light surfaces");
ok(["\u200f", "\u200e"].every((mark) => directionSources.includes(mark) === false), "no stray LRM/RLM marks were needed in the lesson sources");
{
  const uiFiles = ["Lesson39.tsx", "Steps39.tsx", "labs39.tsx", "kit39.tsx", "TestArea39.tsx", "SolutionsArea39.tsx", "TeacherGuide39.tsx", "TeacherArea39.tsx"];
  const uiSources = uiFiles.map((file) => readFileSync(join(root, "src", "lessons", "lesson39", file), "utf8"));
  const hexes = (source, kind) => [...source.matchAll(new RegExp(`${kind}-\\[#([0-9a-fA-F]{6})\\]`, "g"))].map((match) => "#" + match[1].toLowerCase());
  const textColors = new Set(uiSources.flatMap((source) => hexes(source, "text")));
  const bgColors = new Set(uiSources.flatMap((source) => hexes(source, "bg")));
  if (uiSources.some((source) => /text-white/.test(source))) textColors.add("#ffffff");
  const auditedForegrounds = new Set(contrastPairs.map(([fg]) => fg));
  const auditedBackgrounds = new Set(contrastPairs.map(([, bg]) => bg));
  const missingText = [...textColors].filter((color) => !auditedForegrounds.has(color));
  const missingBg = [...bgColors].filter((color) => !auditedBackgrounds.has(color));
  ok(missingText.length === 0, `every text colour used in the lesson is covered by an audited contrast pair (${missingText.join(", ") || "complete"})`);
  ok(missingBg.length === 0, `every background colour used in the lesson is covered by an audited contrast pair (${missingBg.join(", ") || "complete"})`);
  const faint = uiSources.filter((source) => /text-(?:slate|gray|zinc|neutral|stone)-(?:200|300|400)\b|text-(?:white|black)\/\d+|opacity-\d+/.test(source)).length;
  ok(faint === 0, "the lesson uses no faint text");
  const classChunks = [];
  for (const source of uiSources) {
    for (const match of source.matchAll(/className=\{?"([^"]+)"/g)) classChunks.push(match[1]);
    for (const match of source.matchAll(/className=\{`([^`]+)`\}/g)) classChunks.push(match[1]);
    for (const match of source.matchAll(/"([^"`]*?(?:text|bg|border|ring|from|to)-\[#[0-9a-fA-F]{6}\][^"`]*?)"/g)) classChunks.push(match[1]);
  }
  const colorClasses = new Set();
  for (const chunk of classChunks) {
    for (const token of chunk.split(/\s+/)) {
      if (/(?:^|:)(?:text|bg|border|ring|from|to)-\[#[0-9a-fA-F]{6}\]$/.test(token)) colorClasses.add(token);
    }
  }
  {
    const PALETTE = { "slate-900": "#0f172a" };
    const colorOf = (token) => {
      const palette = token.match(/(?:^|:)(?:text|bg)-([a-z]+-\d{2,3})$/);
      if (palette && PALETTE[palette[1]]) return PALETTE[palette[1]];
      const hex = token.match(/(?:^|:)(?:text|bg)-\[#([0-9a-fA-F]{6})\]/);
      if (hex) return "#" + hex[1].toLowerCase();
      if (/(?:^|:)text-white$/.test(token)) return "#ffffff";
      if (/(?:^|:)bg-white$/.test(token)) return "#ffffff";
      return null;
    };
    const alphaOf = (token) => token.match(/(?:^|:)bg-(white|black)\/(\d+)$/);
    const nearest = (element, kind, stop) => {
      let node = element;
      while (node && node !== stop) {
        const tokens = String(node.className || "").split(/\s+/);
        for (const pass of [false, true]) {
          for (const token of tokens) {
            if (token.includes(":") !== pass) continue;
            const value = colorOf(token);
            if (value && (kind === "text" ? /(?:^|:)text-/.test(token) : /(?:^|:)bg-/.test(token))) return { value, token, node };
          }
        }
        node = node.parentElement;
      }
      return null;
    };
    const measured = [];
    for (const snapshotHtml of renderedSnapshots) {
      const holder = win.document.createElement("div");
      holder.innerHTML = snapshotHtml;
      for (const element of holder.querySelectorAll("*")) {
        const directText = [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim().length > 1);
        if (!directText) continue;
        if (element.closest("svg") || element.getAttribute("aria-hidden") === "true") continue;
        const text = nearest(element, "text", holder);
        let bg = nearest(element, "bg", holder);
        if (!text || !bg) continue;
        const alpha = alphaOf(bg.token);
        if (alpha && bg.node.parentElement) {
          const under = nearest(bg.node.parentElement, "bg", holder);
          if (under) {
            const ratio = Number(alpha[2]) / 100;
            const blend = (fgHex, bgHex) => {
              const parse = (hex) => [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
              const [r1, g1, b1] = parse(fgHex);
              const [r2, g2, b2] = parse(bgHex);
              return "#" + [r1, g1, b1].map((value, index) => Math.round(value * ratio + [r2, g2, b2][index] * (1 - ratio)).toString(16).padStart(2, "0")).join("");
            };
            bg = { value: blend(alpha[1] === "white" ? "#ffffff" : "#000000", under.value), token: bg.token, node: bg.node };
          }
        }
        const pair = [text.value, bg.value];
        const value = contrast(pair[0], pair[1]);
        measured.push({ value, text: text.value, bg: bg.value, token: text.token + " / " + bg.token, sample: (element.textContent || "").trim().slice(0, 48) });
      }
    }
    const computedFailures = measured.filter((record) => record.value < 4.5);
    console.log(`  ↳ فحص التباين المحسوب على HTML المصيَّر: ${measured.length} عنصرًا نصيًا · ${computedFailures.length} دون 4.5`);
    for (const record of computedFailures.slice(0, 12)) console.log(`      ${record.value.toFixed(2)}:1 · ${record.token} · «${record.sample}»`);
    ok(computedFailures.length === 0, `computed-style contrast over the rendered lesson markup: every direct text node reaches 4.5:1 against the nearest background (${computedFailures.length} below, ${measured.length} measured)`);
  }
  const distDir = join(root, "dist", "assets");
  if (existsSync(distDir)) {
    const css = readdirSync(distDir).filter((file) => file.endsWith(".css")).map((file) => readFileSync(join(distDir, file), "utf8")).join("\n");
    const escaping = (token) => token.split("").map((char) => ("[]#.:/%(),\"'".includes(char) ? "\\" + char : char)).join("");
    const notEmitted = [...colorClasses].filter((token) => !css.includes("." + escaping(token)));
    ok(notEmitted.length === 0, `every colour utility the lesson uses exists in the built CSS (${notEmitted.join(", ") || colorClasses.size + " classes verified"})`);
  } else {
    console.log("  ↳ dist/assets غير موجود — تُخطّى مقارنة فئات الألوان مع CSS المبنية (شغّل npm run build أولًا)");
  }
}

// 13b) Responsive/overflow contract.
{
  const read39 = (file) => readFileSync(join(root, "src", "lessons", "lesson39", file), "utf8");
  for (const file of ["Lesson39.tsx", "Steps39.tsx", "labs39.tsx", "TestArea39.tsx", "SolutionsArea39.tsx", "TeacherGuide39.tsx", "kit39.tsx"]) {
    ok(/sm:|lg:|md:/.test(read39(file)), `${file}: reflows at a breakpoint instead of one fixed desktop layout`);
  }
  ok(read39("kit39.tsx").includes("overflow-x-auto") && read39("TeacherGuide39.tsx").includes("overflow-x-auto"), "wide source/coverage tables live inside horizontally scrollable containers");
  ok(["Lesson39.tsx", "kit39.tsx", "labs39.tsx", "Steps39.tsx"].every((file) => read39(file).includes("min-w-0")), "flex rows carrying long mixed text can shrink (min-w-0)");
  ok(!/w-\[\d{3,}px\]/.test(directionSources) && !/whitespace-nowrap/.test(directionSources), "no fixed pixel width and no nowrap rule can force horizontal overflow");
  const shell = read39("Lesson39.tsx");
  ok(/role="progressbar"/.test(shell) && /aria-valuemax=\{STEP_COUNT_39\}/.test(shell), "the student shell exposes a real progress indicator");
  ok((shell.match(/role="progressbar"/g) || []).length >= 2, "the progress indicator is present in both the desktop rail and the mobile header");
  ok(/focus-visible:ring-2/.test(read39("kit39.tsx")) && /disabled:cursor-not-allowed/.test(read39("kit39.tsx")), "shared focus and disabled states stay defined in the lesson kit");
}

// 14) Registration.
{
  const appText = readFileSync(join(root, "src/App.tsx"), "utf8");
  ok(
    appText.includes('import Lesson39 from "./lessons/lesson39/Lesson39"') && appText.includes('href: "#/lesson/39"') && appText.includes("route === 39"),
    "App.tsx registers Lesson 39 as a hub card and first-class route",
  );
  ok(/n: 39,[\s\S]{0,400}How Long Will You Have Been Learning\?/.test(appText), "the Lesson 39 hub card carries the source opening title");
  const docs = readFileSync(join(root, "docs/lesson39-coverage.md"), "utf8");
  ok(
    docs.includes("§39") && docs.includes("Table reconstruction contracts") && docs.includes("Test and answer provenance contract"),
    "coverage ledger records rebuilt tables and missing-source-key provenance",
  );
  const auditDoc = readFileSync(join(root, "docs/lesson39-source-audit.md"), "utf8");
  ok(
    auditDoc.includes("62") && auditDoc.includes("Lesson 40") && auditDoc.includes("غير قابل للتحقق") && auditDoc.includes("will have been"),
    "source audit document records the exercise inventory, the planned Lesson 40, unverifiable items, and the form invariants",
  );
  ok(COVERAGE_ACCURACY_NOTES_39.length >= 6, "the in-app coverage ledger keeps the source-accuracy notes");
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  ok(pkg.scripts["audit:lesson39"] === "node scripts/audit-lesson39.mjs", "package.json exposes audit:lesson39");
  const chain = pkg.scripts["audit:english-direction"];
  ok(chain.includes("audit-lesson39.mjs"), "audit:english-direction runs the Lesson 39 audit");
  ok(readFileSync(join(root, "scripts/check-english-direction.mjs"), "utf8").includes("lessons.length === 39"), "direction-check inventory covers 39 lessons");
  ok(readFileSync(join(root, "scripts/audit-render-direction.mjs"), "utf8").includes("lessonFolders.length === 39"), "render audit covers 39 lesson folders");
  ok(readFileSync(join(root, "scripts/audit-lesson-navigation.mjs"), "utf8").includes('"#/lesson/39"'), "navigation audit covers the Lesson 39 route");
  ok(readFileSync(join(root, "scripts/audit-final-test.mjs"), "utf8").includes("lesson39DedicatedAssessment"), "final-test audit recognises the Lesson 39 dedicated assessment");
  ok(
    existsSync(join(root, "src/lessons/lesson39/ledger39.ts")) && existsSync(join(root, "src/lessons/lesson39/solutionsData39.ts")) &&
      existsSync(join(root, "docs/lesson39-coverage.md")) && existsSync(join(root, "docs/lesson39-source-audit.md")),
    "Lesson 39 source ledger, separate solution data, and both documents exist",
  );
}

ok(
  consoleNoise.length === 0,
  `Lesson 39 renders and interacts with a clean console (no React key/nesting/act warnings) — got ${consoleNoise.length}: ${consoleNoise.slice(0, 4).join(" | ") || "none"}`,
);

rmSync(outDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`✕ Lesson 39 audit failed: ${failures.length} of ${assertions} assertions failed`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 39 audit passed: ${assertions} assertions; 39 numbered source sections + opening; 62 exercise items incl. a 25-question test in five levels; 25 separate platform-authored solutions; timeline/formula/duration/builder/dialogue/stative/reading/writing interactions; source/route/direction/contrast contracts.`);
