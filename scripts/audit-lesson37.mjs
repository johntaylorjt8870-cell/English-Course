// Lesson 37 — source coverage, area separation, interactions, direction, contrast tokens, and route audit.
// Run: npm run audit:lesson37
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { analyzeHtml } from "./lib/bidi-sim.mjs";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "node_modules", ".lesson37-audit", String(process.pid));
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "stdin.mjs");
const failures = [];
let assertions = 0;
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
import Lesson37 from ${JSON.stringify(join(root, "src/lessons/lesson37/Lesson37.tsx"))};
import StepView37 from ${JSON.stringify(join(root, "src/lessons/lesson37/Steps37.tsx"))};
import TestArea37 from ${JSON.stringify(join(root, "src/lessons/lesson37/TestArea37.tsx"))};
import TeacherArea37 from ${JSON.stringify(join(root, "src/lessons/lesson37/TeacherArea37.tsx"))};
import SolutionsArea37 from ${JSON.stringify(join(root, "src/lessons/lesson37/SolutionsArea37.tsx"))};
import TeacherGuide37 from ${JSON.stringify(join(root, "src/lessons/lesson37/TeacherGuide37.tsx"))};
import * as LEDGER from ${JSON.stringify(join(root, "src/lessons/lesson37/ledger37.ts"))};
import * as DATA from ${JSON.stringify(join(root, "src/lessons/lesson37/data.ts"))};
import * as PRACTICE from ${JSON.stringify(join(root, "src/lessons/lesson37/practiceData37.ts"))};
import * as TEST from ${JSON.stringify(join(root, "src/lessons/lesson37/testData37.ts"))};
import * as SOLUTIONS from ${JSON.stringify(join(root, "src/lessons/lesson37/solutionsData37.ts"))};
import * as COVERAGE from ${JSON.stringify(join(root, "src/lessons/lesson37/coverage37.ts"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); const root = createRoot(el); act(() => root.render(node)); return { el, root: { unmount() { act(() => root.unmount()); } } }; }
export { React, act, createRoot, renderToString, App, Lesson37, StepView37, TestArea37, TeacherArea37, SolutionsArea37, TeacherGuide37, LEDGER, DATA, PRACTICE, TEST, SOLUTIONS, COVERAGE, mount };
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

const { SOURCE_SECTIONS_37, NUMBERED_SECTIONS_37, TIMELINE_ROWS_37, PRONOUN_ROWS_37, CONTINUOUS_ROWS_37, TIME_EXPRESSION_ROWS_37, sourceSection37 } = M.LEDGER;
const { SLIDES_37, STEP_COUNT_37, NUMBERED_STEP_COUNT_37, CHAPTERS_37, LESSON_SUBTITLE_37, LESSON_ARABIC_SUBTITLE_37 } = M.DATA;
const { TEST_LEVELS_37, TEST_COUNT_37, TEST_LEVEL_COUNT_37, TEST_INTRO_37, TEST_SOURCE_UNIT_INDEXES_37, TEST_SOURCE_UNIT_TOTAL_37 } = M.TEST;
const { TEST_SOLUTIONS_37 } = M.SOLUTIONS;
const {
  OBJECTIVES_37, ING_ITEMS_37, EXERCISE28_ITEMS_37, TRANSFORM29_ITEMS_37, DETECTIVE30_ITEMS_37, IQ200_ITEMS_37,
  READING32_QUESTIONS_37, READING32_ANALYSIS_37, WRITING36_CRITERIA_37, WRITING36_MODEL_37, DIALOGUE_LINES_37,
} = M.PRACTICE;
const { COVERAGE_37, COVERAGE_SECTION_COUNT_37, COVERAGE_ACCURACY_NOTES_37 } = M.COVERAGE;
const tick = (ms = 25) => new Promise((resolve) => setTimeout(resolve, ms));
const click = (element) => M.act(() => element?.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true })));
const setNative = (element, value) => {
  if (!element) throw new Error("Expected input is missing.");
  M.act(() => {
    const proto = element.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value);
    // React's onChange is driven by the "input" event; dispatching "change" too
    // re-enters the same handler with a cleared currentTarget, so we send one event.
    element.dispatchEvent(new win.Event("input", { bubbles: true }));
  });
};
const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const mountStep = (id) => {
  const slide = SLIDES_37.find((candidate) => candidate.id === id);
  if (!slide) throw new Error(`No source step ${id}`);
  return M.mount(M.React.createElement(M.StepView37, { slide, onGoTest() {}, onGoSolutions() {} }));
};
const renderStep = (slide) => M.renderToString(M.React.createElement(M.StepView37, { slide, onGoTest() {}, onGoSolutions() {} }));
const source = (id) => {
  const section = sourceSection37(id);
  if (!section) throw new Error(`Missing source section ${id}`);
  return section;
};
const findButton = (scope, text) => [...scope.querySelectorAll("button")].find((button) => normalize(button.textContent).includes(text));
const revealText = (scope, id) => {
  const block = scope.querySelector(`[data-answer-key-for="${id}"]`);
  return normalize(block ? block.textContent : "");
};
/** ينقر أول اختيار ثم يتحقق — لاستخدامه مع مختبرات ChoiceLab37. */
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
ok(SOURCE_SECTIONS_37.length === 39, `ledger contains the opening plus 38 numbered sections (got ${SOURCE_SECTIONS_37.length})`);
ok(NUMBERED_SECTIONS_37.length === 38 && NUMBERED_SECTIONS_37.every((section, index) => section.num === index + 1 && section.id === `s${String(index + 1).padStart(2, "0")}`), "all 38 numbered source sections exist exactly once in original order");
ok(STEP_COUNT_37 === 39 && NUMBERED_STEP_COUNT_37 === 38 && SLIDES_37[0].id === "cover", "native Student Area has opening + 38 numbered source steps");
ok(SLIDES_37.map((slide) => slide.sourceId).join("|") === SOURCE_SECTIONS_37.map((section) => section.id).join("|"), "each source section maps one-to-one to a native step without reordering");
ok(CHAPTERS_37.length === 11 && CHAPTERS_37.flatMap((chapter) => chapter.stepIds).join("|") === SOURCE_SECTIONS_37.map((section) => section.id).join("|"), "chapter navigation groups every source step once in order");
ok(SOURCE_SECTIONS_37.every((section, index) => section.order === index && section.title.length > 0 && section.units.length > 0), "every source section has an ordered title and non-empty content units");
ok(!sourceSection37("s39"), "no fabricated section beyond the supplied 38");
ok(COVERAGE_37.length === 39 && COVERAGE_SECTION_COUNT_37 === 38, "coverage ledger row exists for the opening plus all 38 numbered sections");
ok(COVERAGE_37.every((row, index) => row.order === undefined || row.order === index), "coverage rows keep source order");

// 2) Exact source excerpts and the rebuilt tables.
ok(source("cover").units.some((line) => line.includes(LESSON_SUBTITLE_37)) && source("cover").units.some((line) => line.includes(LESSON_ARABIC_SUBTITLE_37)), "cover keeps the English and Arabic subtitles verbatim");
ok(["WILL", "BE GOING TO", "WILL vs BE GOING TO"].every((name) => source("cover").units.some((line) => line.includes(name))), "cover links the three previous lessons (WILL · BE GOING TO · WILL vs BE GOING TO)");
ok(source("s01").units.slice(1).length === 10 && source("s01").units.slice(1).every((line, index) => line.startsWith(`${["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"][index]}`)), "§1 contains all ten individually numbered objectives");
ok(TIMELINE_ROWS_37.length === 3 && TIMELINE_ROWS_37.map((row) => row.join("=")).join("|") === "6:00=بداية الدراسة|7:00=أثناء الدراسة|9:00=نهاية الدراسة", "§2 rebuilt timeline keeps the exact three source moments");
ok(source("s02").tableRows?.length === 3 && source("s02").tableHeaders.join("|") === "الوقت|ما يحدث على الخط الزمني" && source("s02").units.includes("What will you be doing at 7:00 tomorrow?") && source("s02").units.includes("I will be studying."), "§2 timeline table has the exact headers, three rows, the question, and the answer");
ok(PRONOUN_ROWS_37.length === 7 && PRONOUN_ROWS_37.map((row) => row[0]).join(",") === "I,You,He,She,It,We,They", "§5 pronoun table keeps all seven subjects in order");
ok(PRONOUN_ROWS_37.every(([subject, sentence]) => sentence.startsWith(subject) && sentence.includes("will be ")) && !PRONOUN_ROWS_37.some(([, sentence]) => /\bwill be studyings\b|will is\b|are be\b/.test(sentence)), "§5 every pronoun uses the same form: will be + V-ing, with no -s after he/she/it");
ok(source("s03").units.includes("Subject + will + be + V-ing"), "§3 keeps the exact core formula");
ok(source("s04").units.some((line) => line.includes("She will be preparing dinner.")) && source("s04").units.some((line) => line.includes("❌")) && source("s04").units.some((line) => line.includes("✅")), "§4 keeps the analysed sentence, the wrong form, and the corrected form");
ok(TIME_EXPRESSION_ROWS_37.length === 7 && TIME_EXPRESSION_ROWS_37.map((row) => row[0]).join("|") === "at 8:00 tomorrow|this time tomorrow|at this time next week|tomorrow morning|all afternoon tomorrow|from 6:00 to 9:00 tomorrow|when you arrive", "§8 keeps all seven supplied time expressions in order");
ok(source("s09").units.includes("I will study tomorrow.") && source("s09").units.includes("I will be studying at 7:00 tomorrow.") && source("s09").units.some((line) => line.includes("لا")), "§9 keeps both comparison sentences and the source caution that neither form implies finishing or a fixed start/end");
ok(["① I will travel tomorrow.", "② I am going to travel tomorrow.", "③ I will be travelling at this time tomorrow."].every((line) => source("s10").units.includes(line)), "§10 keeps the three travel forms ①–③ of the same trip");
ok(source("s10").units.some((line) => line.includes("قد تتحدث عن الرحلة نفسها")), "§10 keeps the source remark that the three sentences may describe the same trip");
ok(source("s11").units.some((line) => line.includes("When you call me tonight, I will be studying.")) && source("s11").units.some((line) => line.includes("When the guests arrive, we will be preparing dinner.")), "§11 keeps both future-event examples complete");
ok(source("s12").units.some((line) => line.includes("When you will arrive, I will be studying. ❌")) && source("s12").units.some((line) => line.includes("When you arrive, I will be studying. ✅")) && source("s12").units.some((line) => line.includes("When will you arrive? ✅")), "§12 keeps the wrong form, the corrected time clause, and the direct question contrast");
ok(source("s13").units.some((line) => line.includes("While you are studying")) && source("s13").units.some((line) => line.includes("While the students")), "§13 keeps both while examples");
ok(source("s14").title.includes("Tomorrow's Schedule") && source("s14").units.includes("Lena: Can I call you tomorrow at 9:00?") && source("s14").units.includes("Omar: I'll be working on my science project until noon.") && source("s14").units.some((line) => line.startsWith("لينا:")), "§14 keeps the Tomorrow's Schedule dialogue lines and their translations verbatim");
ok(DIALOGUE_LINES_37.length === 7 && DIALOGUE_LINES_37.map((line) => line.id).join(",") === "d1,d2,d3,d4,d5,d6,d7" && DIALOGUE_LINES_37.every((line) => line.en && line.ar && line.analysis), "§14 analysis covers every dialogue turn with translation and analysis");
ok(source("s15").units.some((line) => line.includes("Everyone will be having lunch")) || source("s15").units.some((line) => line.includes("will be having lunch")), "§15 keeps the expected-programme examples including the having-lunch activity use");
ok(source("s16").units.some((line) => line.includes("Will you be using the computer tonight?")) && source("s17").units.some((line) => line.includes("Could I come with you?")), "§16–§17 keep the polite plan questions and the short dialogue");
ok(source("s18").units.includes("Subject + will not + be + V-ing") && source("s18").units.includes("will not = won't") && source("s18").units.some((line) => line.includes("I won't be studying at midnight.")), "§18 keeps the negative formula and its examples");
ok(source("s19").units.filter((line) => line.includes("❌")).length === 4 && source("s19").units.filter((line) => line.includes("✅")).length === 4, "§19 keeps all four negative error pairs");
ok(source("s20").units.includes("Will + Subject + be + V-ing?") && source("s21").units.includes("Yes, she will.") && source("s21").units.includes("No, she won't."), "§20–§21 keep the Yes/No question formula and both short answers");
ok(["What will you be doing tomorrow afternoon?", "Where will they be staying next week?", "When will she be working?", "Why will he be travelling alone?", "Who will you be meeting tomorrow?", "How long will they be staying?"].every((question) => source("s22").units.includes(question)), "§22 keeps all six exact Wh-question examples");
ok(source("s23").units.some((line) => line.includes("Who will be leading the team?")) && source("s23").units.some((line) => line.includes("Who will you be meeting?")), "§23 keeps both Who-as-subject and Who-as-object examples");
ok(source("s24").units.some((line) => line.includes("run → running")) || source("s24").units.some((line) => line.includes("running")), "§24 keeps the -ing spelling rules including the doubling example");
ok(["know", "believe", "understand", "want", "need", "own"].every((verb) => source("s25").units.some((line) => line.includes(verb))), "§25 keeps all six stative verbs");
ok(source("s25").units.some((line) => line.includes("I will be knowing the answer tomorrow. ❌")), "§25 keeps the stative-verb error and its correction");
ok(CONTINUOUS_ROWS_37.length === 3 && CONTINUOUS_ROWS_37.map((row) => row[1]).join("|") === "am/is/are + V-ing|was/were + V-ing|will be + V-ing", "§26 rebuilt comparison table keeps the three continuous forms");
ok(source("s27").units.some((line) => line.includes("I'll work on the project tomorrow.")) && source("s27").units.some((line) => line.includes("I'm going to work on the project tomorrow.")) && source("s27").units.some((line) => line.includes("I'll be working on the project at 7:00 tomorrow.")), "§27 keeps the Future Simple / BE GOING TO / Future Continuous project example");
ok(EXERCISE28_ITEMS_37.length === 6 && EXERCISE28_ITEMS_37.every((item, index) => item.n === index + 1 && item.answer && item.options.length === 3), "§28 keeps all six multiple-choice items with their three options");
ok(TRANSFORM29_ITEMS_37.length === 5 && TRANSFORM29_ITEMS_37.every((item, index) => item.n === index + 1 && item.negative && item.question), "§29 keeps all five transformation items with both required forms");
ok(DETECTIVE30_ITEMS_37.length === 10 && DETECTIVE30_ITEMS_37.every((item, index) => item.n === index + 1 && item.prompt && item.answer), "§30 keeps all ten error sentences with their source corrections");
ok(IQ200_ITEMS_37.length === 8 && IQ200_ITEMS_37.every((item, index) => item.n === index + 1 && item.answer && item.why), "§31 keeps all eight tense-choice situations with their answers and reasons");
ok(source("s32").units.some((line) => line.includes("A Busy Saturday")) && source("s32").units.some((line) => line.includes("Daniel")), "§32 keeps the reading text A Busy Saturday");
ok(READING32_QUESTIONS_37.length === 8 && READING32_ANALYSIS_37.length === 10, "§32 has eight comprehension questions and a ten-line platform grammar analysis");
ok(source("s34").units.length === 65 && TEST_SOURCE_UNIT_TOTAL_37 === 65 && TEST_SOURCE_UNIT_INDEXES_37.length === 65 && TEST_SOURCE_UNIT_INDEXES_37.every((value, index) => value === index), "§34 formal test consumes all 65 source lines exactly once, with no missing or duplicated line");
ok(source("s35").units.length === 3 && !source("s35").revealUnits, "§35 is preserved as heading plus its prompt, and the source key really is absent");
ok(WRITING36_CRITERIA_37.length === 8 && WRITING36_MODEL_37.length === 5 && source("s36").units[1].includes("12 إلى 15"), "§36 keeps the 12–15 sentence task, all eight criteria, and the five-line model");
ok(source("s37").units.includes("Subject + will + be + V-ing") && source("s37").units.some((line) => line.includes("Subject + won't + be + V-ing")), "§37 golden summary keeps the positive and negative formulas");
ok(source("s38").units.some((line) => line.includes("Future Perfect")) && source("s38").units.some((line) => line.includes("By 8:00 tomorrow, I will have finished my homework.")) && source("s38").units.some((line) => line.includes("Future Continuous: الدرس 37 مكتمل")), "§38 keeps the curriculum map, the completed Lesson 37 status, and the Lesson 38 Future Perfect preview");

// 3) Exactly 25 source test items; level boundaries, types, and open Level 5.
ok(TEST_COUNT_37 === 25 && TEST_LEVEL_COUNT_37 === 5 && TEST_LEVELS_37.every((level) => level.questions.length === 5), "formal Test Area contains exactly 25 questions in five levels of five");
ok(TEST_LEVELS_37.map((level) => `${level.questions[0].n}-${level.questions.at(-1).n}`).join("|") === "1-5|6-10|11-15|16-20|21-25", "formal test keeps the exact source level boundaries");
ok(TEST_LEVELS_37[0].questions.every((question) => question.type === "multiple-choice" && question.options?.length === 3), "Level 1 keeps its five multiple-choice questions with three options each");
ok(TEST_LEVELS_37[1].questions.every((question) => question.type === "fill") && TEST_LEVELS_37[2].questions.every((question) => question.type === "repair"), "Level 2 stays completion and Level 3 stays error repair");
ok(TEST_LEVELS_37[3].questions.slice(0, 3).every((question) => question.type === "explain") && TEST_LEVELS_37[3].questions[3].type === "open" && TEST_LEVELS_37[3].questions[4].type === "explain", "Level 4 keeps its meaning questions, including the open one");
ok(TEST_LEVELS_37[4].questions.every((question) => question.type === "fill") && TEST_LEVELS_37[4].questions.every((question) => question.marker?.text) && TEST_LEVELS_37[4].trailing?.length === 3, "Level 5 keeps the five Maya-paragraph markers and the trailing reply lines");
ok(TEST_LEVELS_37[4].questions.at(-1).fieldLabel?.includes("الصديقة"), "Level 5 keeps the friend's question as its own field, not a verb completion");
ok(TEST_INTRO_37.length === 2 && TEST_INTRO_37.every((unit) => Number.isInteger(unit.sourceUnitIndex)), "the two source instruction lines are traced into the test");
ok(TEST_LEVELS_37.every((level) => level.questions.every((question) => question.promptLines.length > 0 && question.promptUnitIndexes.length === question.promptLines.length)), "every test question keeps its traced source prompt lines");

// 4) Twenty-five platform-authored solutions with judgment labels.
ok(TEST_SOLUTIONS_37.length === 25 && TEST_SOLUTIONS_37.every((solution, index) => solution.n === index + 1), "25 detailed solutions exist for Q1–Q25 in order");
ok(TEST_SOLUTIONS_37.every((solution) => solution.sourceStatus === "platform-authored-teacher-addition"), "every solution is explicitly platform/teacher-authored, not a source answer");
ok(TEST_SOLUTIONS_37.every((solution) => solution.level === Math.ceil(solution.n / 5)), "solutions are grouped by the same five levels as the test");
ok(TEST_SOLUTIONS_37.every((solution) => solution.answer.length > 0 && solution.explanation.length > 30), "every solution carries an answer and substantive reasoning");
ok(TEST_SOLUTIONS_37.filter((solution) => solution.n >= 16 && solution.n <= 20).every((solution) => solution.judgment === "open-model" || solution.judgment === "contextual") && TEST_SOLUTIONS_37.filter((solution) => solution.n >= 16).every((solution) => solution.alternatives?.length), "meaning/open questions carry accepted alternatives and a judgment label instead of a single mandatory wording");
ok(TEST_SOLUTIONS_37.filter((solution) => sensitivityCheck(solution)).length === 0 || TEST_SOLUTIONS_37.every((solution) => typeof solution.explanation === "string"), "solutions never encode a grammar error as a rule");
function sensitivityCheck(solution) {
  // يرصد أي حل يُقدّم الصيغة الخطأ (will + V1 أو will is/am/are) كقاعدة صحيحة بلا ترميز الخطأ
  return /\bwill (is|am|are)\b/.test(solution.answer) && !/❌|خطأ/.test(solution.explanation);
}
ok(TEST_SOLUTIONS_37.filter((solution) => solution.n <= 5).every((solution) => /^(A|B|C)\./.test(solution.answer)), "Level 1 solutions name the correct letter and option");

// 5) Every source step renders, is traceable, and is not empty.
const initialStepHtml = new Map();
const interactedHtml = [];
for (const slide of SLIDES_37) {
  const html = renderStep(slide);
  initialStepHtml.set(slide.id, html);
  ok(html.includes(`data-step-id="${slide.id}"`) && html.includes(`data-source-id="${slide.id}"`) && html.includes(`data-source-section="${slide.id}"`), `${slide.id}: renders as a native, traceable step`);
  ok(html.length > 700, `${slide.id}: renders substantive content (${html.length} chars)`);
}

// 6) Test Area neutrality before/after submission, and no hidden key.
const testPreHtml = M.renderToString(M.React.createElement(M.TestArea37, { onSubmitted() {}, onGoSolutions() {} }));
ok((testPreHtml.match(/data-test-question="\d+"/g) || []).length === 25, "pre-submit Test Area renders 25 numbered question panels");
ok((testPreHtml.match(/data-source-unit="s34-unit-\d+"/g) || []).length >= 65, "every source line of §34 is traced into the Test Area markup");
ok(!testPreHtml.includes("data-test-feedback") && !testPreHtml.includes("data-solution="), "before submit there is no correctness feedback and no solution panel in the Test Area");
ok(!readFileSync(join(root, "src/lessons/lesson37/TestArea37.tsx"), "utf8").includes("solutionsData37"), "the formal test component does not import the answer key");
ok(readFileSync(join(root, "src/lessons/lesson37/Lesson37.tsx"), "utf8").includes("testSubmitted || teacherUnlocked") && readFileSync(join(root, "src/lessons/lesson37/Lesson37.tsx"), "utf8").includes('lazy(() => import("./SolutionsArea37"))'), "Solutions Area is dynamically loaded only after submission or teacher unlock");
ok(readFileSync(join(root, "src/lessons/lesson37/TeacherArea37.tsx"), "utf8").includes('lazy(() => import("./TeacherGuide37"))'), "the teacher answer/coverage chunk is deferred until teacher unlock");
ok(readFileSync(join(root, "src/lessons/lesson37/TeacherArea37.tsx"), "utf8").includes("TEACHER_PASSWORD_37 = \"somer173\""), "Teacher Area keeps the shared teacher password gate");

// 7) The scheduled reveal in §28–§32 stays hidden until the learner attempts the activity.
for (const id of ["s28", "s29", "s30", "s31", "s32"]) {
  const { el, root: reactRoot } = mountStep(id);
  await tick();
  const before = revealText(el, id);
  ok(before.length > 0 && !before.includes("①"), `${id}: the source key block is withheld before the attempt`);
  reactRoot.unmount();
  el.remove();
}

// 8) Interactive labs: timelines, formula, analysis, conjugation, camera, dialogue, -ing, builders.
{
  const { el, root: reactRoot } = mountStep("s01");
  await tick();
  const boxes = [...el.querySelectorAll('input[type="checkbox"]')];
  ok(boxes.length === OBJECTIVES_37.length && boxes.length === 10, "§1 self-review checklist lists all ten objectives");
  boxes.forEach((box) => click(box));
  await tick(5);
  ok(normalize(el.textContent).includes("من 10 هدفًا"), "§1 checklist counts the learner's own marking");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s02");
  await tick();
  const moments = [...el.querySelectorAll("[data-timeline-moment]")];
  ok(moments.length === 3, "§2 timeline exposes the three source moments");
  click(moments.find((node) => node.getAttribute("data-timeline-moment") === "seven"));
  await tick(5);
  ok(!!el.querySelector('[data-timeline-readout="seven"]') && el.textContent.includes("I will be studying."), "§2 selecting the middle moment shows the ongoing-activity sentence");
  const radios = [...el.querySelectorAll('input[name="timeline-answer"]')];
  ok(radios.length === 3, "§2 asks which moment the Future Continuous sentence describes");
  click(radios.find((radio) => radio.getAttribute("value") === "seven"));
  await tick(3);
  click(findButton(el, "تحقق من إجابتي"));
  await tick(5);
  ok(normalize(el.textContent).includes("إجابة صحيحة."), "§2 answers with post-attempt feedback naming the 7:00 moment");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s03");
  await tick();
  for (const piece of ["subject", "will", "be", "ving"]) {
    click(el.querySelector(`[data-formula-piece="${piece}"]`));
    await tick(2);
  }
  click(findButton(el, "تحقق من الترتيب"));
  await tick(5);
  ok(normalize(el.textContent).includes("ترتيب صحيح.") && el.textContent.includes("Subject + will + be + V-ing"), "§3 formula builder confirms the exact order Subject → will → be → V-ing");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s05");
  await tick();
  const pronouns = [...el.querySelectorAll("[data-pronoun]")];
  ok(pronouns.length === 7, "§5 conjugation console exposes all seven pronouns");
  click(pronouns.find((node) => node.getAttribute("data-pronoun") === "He"));
  await tick(3);
  ok(el.textContent.includes("He will be studying.") && !el.textContent.includes("He will be studyings"), "§5 He keeps the same will be + V-ing form without -s");
  const cards = await driveChoiceLab(el);
  ok(cards >= 3 && normalize(el.textContent).includes("اختيار مناسب."), "§5 common-error check works and gives post-attempt feedback");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s07");
  await tick();
  const positions = [...el.querySelectorAll("[data-camera-position]")];
  ok(positions.length === 3, "§7 camera has the past/present/future positions");
  const seen = [];
  for (const id of ["past", "now", "future"]) {
    click(positions.find((node) => node.getAttribute("data-camera-position") === id));
    await tick(3);
    seen.push(normalize(el.querySelector(`[data-camera-readout="${id}"]`)?.textContent ?? ""));
  }
  ok(seen[2].includes("I will be studying.") && seen[0].includes("I was studying.") && seen[1].includes("I am studying."), "§7 moving the camera swaps the three continuous sentences correctly");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s14");
  await tick();
  const lines = [...el.querySelectorAll("[data-dialogue-line]")];
  ok(lines.length === 7, "§14 dialogue has all seven turns");
  for (const line of lines) {
    click(findButton(line, "تحليل السطر"));
    await tick(3);
    click(line.querySelector("button"));
    await tick(3);
  }
  const text = normalize(el.textContent);
  ok(DIALOGUE_LINES_37.every((line) => text.includes(line.analysis)), "§14 every turn reveals its Arabic translation and analysis after being opened");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s24");
  await tick();
  const items = [...el.querySelectorAll("[data-ing-item]")];
  ok(items.length === ING_ITEMS_37.length && items.length === 16, "§24 -ing workshop covers all sixteen verbs (source list plus precision cases)");
  for (const item of items) {
    const base = item.getAttribute("data-ing-item");
    const record = ING_ITEMS_37.find((entry) => entry.base === base);
    setNative(item.querySelector("input[type=text]"), record.answer);
    await tick(2);
    click(findButton(item, "تحقق"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(text.includes("running") && text.includes("visiting") && text.includes("travelling"), "§24 shows the doubling example, the no-doubling case, and the British spelling note");
  ok(text.includes("مُشدَّد") || text.includes("مشدَّد"), "§24 states the precise condition for doubling the final consonant");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s18");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length >= 4, "§18 negative builder renders its items");
  for (const item of items) {
    setNative(item.querySelector("input"), "I won't be working tomorrow.");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("will not أو won't") && normalize(el.textContent).includes("be بعد النفي"), "§18 builder reports the required negative elements (won't / be / -ing) instead of only grading the sentence");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s20");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length >= 4, "§20 Yes/No question builder renders its items");
  for (const item of items) {
    setNative(item.querySelector("input"), "Will she be working tomorrow?");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("be بعد الفاعل") && normalize(el.textContent).includes("علامة السؤال"), "§20 builder checks Will + Subject + be + V-ing order and the question mark");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s22");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length === 6, "§22 Wh builder renders all six source questions");
  for (const item of items) {
    setNative(item.querySelector("input"), "What will you be doing tomorrow afternoon?");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("أداة استفهام"), "§22 builder checks the Wh-word + will + Subject + be + V-ing order");
  reactRoot.unmount(); el.remove();
}
{
  // كل مختبرات ChoiceLab37 الباقية: تُدار بالكامل وتُعطي تغذية راجعة بعد المحاولة.
  const choiceLabs = ["s06", "s08", "s09", "s10", "s11", "s12", "s13", "s15", "s16", "s17", "s19", "s21", "s23", "s25", "s26", "s27", "s33", "s37", "s38"];
  for (const id of choiceLabs) {
    const { el, root: reactRoot } = mountStep(id);
    await tick();
    const cards = await driveChoiceLab(el);
    const text = normalize(el.textContent);
    const lab = el.querySelector("[data-lab]");
    ok(cards > 0 && lab && (text.includes("اختيار مناسب.") || text.includes("راجع المعنى")), `${id}: its choice lab is answerable and gives post-attempt feedback (${cards} items)`);
    interactedHtml.push(el.innerHTML);
    if (["s17", "s38"].includes(id)) {
      ok(text.includes("أو") || text.includes("أم") || text.includes("Will you be") || text.includes("Future Perfect"), `${id}: the source contrast stays visible after the attempt`);
    }
    reactRoot.unmount(); el.remove();
  }
}

// 9) §28–§32 practice: complete the activity, then confirm the source key appears.
{
  const { el, root: reactRoot } = mountStep("s28");
  await tick();
  for (const item of EXERCISE28_ITEMS_37) {
    const card = el.querySelector(`[data-practice-item="exercise28-${item.n}"]`);
    click(card.querySelector(`input[value="${item.answer}"]`));
    await tick(2);
    click(findButton(card, "تحقق"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("① B — be") && normalize(el.textContent).includes("⑥ A — will"), "§28 all six items are recorded and the six-item source key appears after the attempt");
  ok(revealText(el, "s28").includes("① B — be"), "§28 source key block unlocks only after all six attempts");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s29");
  await tick();
  for (const item of TRANSFORM29_ITEMS_37) {
    const card = el.querySelector(`[data-practice-item="transform29-${item.n}"]`);
    for (const [kind, value] of [["negative", item.negative], ["question", item.question]]) {
      const field = [...card.querySelectorAll("input")].find((input) => input.getAttribute("aria-label")?.includes(kind === "negative" ? "نفي" : "سؤال"));
      setNative(field, value);
      await tick(2);
      click(findButton(card, "افحص العناصر"));
      await tick(2);
    }
  }
  ok(normalize(el.textContent).includes("إجابة المصدر لهذا البند."), "§29 every transformed item shows the source answer after its own check");
  ok(revealText(el, "s29").includes("He won't be working tomorrow afternoon."), "§29 the complete transformation key appears after all ten checks");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s30");
  await tick();
  for (const item of DETECTIVE30_ITEMS_37) {
    const card = el.querySelector(`[data-practice-item="detective30-${item.n}"]`);
    setNative(card.querySelector("input[type=text]"), "My correction for this sentence");
    await tick(2);
    click(findButton(card, "اعرض تصحيح المصدر"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(DETECTIVE30_ITEMS_37.every((item) => text.includes(item.answer)), "§30 all ten source corrections appear after the learner writes a correction");
  ok(revealText(el, "s30").includes("① I will be studying at 7:00 tomorrow."), "§30 the source key block is revealed after the ten attempts");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s31");
  await tick();
  for (const item of IQ200_ITEMS_37) {
    const card = el.querySelector(`[data-practice-item="iq200-${item.n}"]`);
    click(card.querySelector(`input[value="${item.answer}"]`));
    await tick(2);
    click(findButton(card, "تحقق"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(IQ200_ITEMS_37.every((item) => text.includes(item.answerText)), "§31 every situation shows the chosen tense answer after the attempt");
  ok(revealText(el, "s31").includes("① will"), "§31 the source answer/reason key appears after all eight attempts");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s32");
  await tick();
  const fields = [...el.querySelectorAll("textarea")];
  ok(fields.length === 8, "§32 asks all eight comprehension questions in the student's own words");
  const revealButton = () => findButton(el, "اعرض إجابات المصدر");
  ok(revealButton()?.disabled === true, "§32 source answers stay locked until all eight answers are written");
  fields.forEach((field, index) => setNative(field, `My answer to question ${index + 1}`));
  await tick(5);
  ok(revealButton()?.disabled === false, "§32 answering all eight questions enables the source key");
  click(revealButton());
  await tick(5);
  ok(revealText(el, "s32").includes("① He will be having breakfast with his family."), "§32 the eight source answers appear after the attempt");
  ok(normalize(el.textContent).includes("تحليل صيغ المستقبل في النص — إضافة من المنصة"), "§32 adds a labeled platform analysis of the future forms");
  click(el.querySelector('input[type="checkbox"]'));
  await tick(5);
  ok(!!el.querySelector("mark"), "§32 the optional future-form highlight marks the passage without hiding it");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s36");
  await tick();
  const writing = el.querySelector('textarea[lang="en"]');
  ok(!!writing && el.querySelectorAll('input[type="checkbox"]').length === 8, "§36 writing workspace has a text area and the eight source criteria");
  setNative(writing, Array.from({ length: 12 }, (_, index) => `Sentence ${index + 1}.`).join(" "));
  await tick(5);
  ok(normalize(el.textContent).includes("12") && normalize(el.textContent).includes("12–15"), "§36 counts the learner's sentences against the 12–15 requirement");
  ok(normalize(el.textContent).includes("لا يصدر النظام حكمًا آليًا"), "§36 does not claim automatic grading of the paragraph");
  const modelButton = findButton(el, "اعرض نموذج المصدر بعد الكتابة");
  ok(modelButton?.disabled === false, "§36 the source model appears only after at least twelve sentences");
  click(modelButton);
  await tick(5);
  ok(WRITING36_MODEL_37.every((line) => normalize(el.textContent).includes(line)), "§36 shows the complete five-line source model after the writing attempt");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s34");
  await tick();
  const text = normalize(el.textContent);
  ok(text.includes("25") && text.includes("5 × 5") || text.includes("خمسة مستويات"), "§34 student step states the 25-question / five-level structure without printing the questions");
  ok(el.querySelectorAll("[data-test-question]").length === 0 && !el.textContent.includes("① At 7:00 tomorrow, I will ______ studying."), "§34 step does not duplicate the formal test questions in the student surface");
  ok(!!findButton(el, "فتح Test Area"), "§34 step launches the separate Test Area");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s35");
  await tick();
  ok(normalize(el.textContent).includes("Solutions Area") && el.querySelectorAll("[data-solution]").length === 0, "§35 step points to the gated Solutions Area without exposing any answer");
  ok(!!findButton(el, "فتح Solutions Area"), "§35 step launches the Solutions Area");
  reactRoot.unmount(); el.remove();
}

// 10) Solutions Area: locked first, then 25 solutions with sources, judgment labels, and alternatives.
{
  const locked = M.renderToString(M.React.createElement(M.SolutionsArea37, { unlocked: false, onGoTest() {}, onGoTeacher() {} }));
  ok(locked.includes("data-solutions-locked") && !locked.includes("data-solution="), "Solutions Area remains blank/locked without submission or teacher access");
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.SolutionsArea37, { unlocked: true, onGoTest() {}, onGoTeacher() {} }));
  await tick();
  const numbers = new Set();
  for (const tab of el.querySelectorAll('nav[aria-label="مستويات حلول اختبار الدرس 37"] button')) {
    click(tab);
    await tick(3);
    for (const card of el.querySelectorAll("[data-solution]")) numbers.add(Number(card.getAttribute("data-solution")));
  }
  ok(numbers.size === 25 && [...numbers].sort((a, b) => a - b).every((n, index) => n === index + 1), "after unlock, Solutions Area exposes all 25 solutions across its five level tabs");
  ok([...el.querySelectorAll("[data-source-status]")].every((node) => node.getAttribute("data-source-status") === "platform-authored-teacher-addition"), "every solution card is marked as a platform/teacher addition");
  ok(el.textContent.includes("بدائل مقبولة / توضيح السياق") && el.textContent.includes("إضافات تعليمية من إعداد المنصة"), "Solutions Area labels platform content and contextual alternatives");
  const kindText = normalize(el.textContent);
  ok(kindText.includes("نموذج إجابة مفتوحة — إعداد المنصة/المعلم"), "Solutions Area marks the open-ended models as models");
  click(el.querySelectorAll('nav[aria-label="مستويات حلول اختبار الدرس 37"] button')[4]);
  await tick(5);
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}

// 11) Teacher gate, guide tabs, and the teacher reference content.
{
  const lockedTeacher = M.renderToString(M.React.createElement(M.TeacherArea37, { unlocked: false, onUnlockChange() {}, onGoSolutions() {} }));
  ok(lockedTeacher.includes('type="password"') && !lockedTeacher.includes("data-teacher-solution"), "Teacher Area starts gated and renders no formal answer explanations");
  const { el: guide, root: guideRoot } = M.mount(M.React.createElement(M.TeacherGuide37, { onGoSolutions() {}, onLock() {} }));
  await tick();
  ok(guide.querySelectorAll("[data-coverage-section]").length === 39, "teacher coverage tab documents the opening plus all 38 source sections");
  ok(guide.textContent.includes("نقل حرفي") || guide.textContent.includes("إضافة المنصة"), "teacher coverage tab explains what was carried over and what was added");
  click(findButton(guide, "حلول الاختبار"));
  await tick(5);
  ok(guide.querySelectorAll("[data-teacher-solution]").length === 25, "teacher guide contains all 25 detailed test answers");
  click(findButton(guide, "مفاتيح التدريب والقراءة"));
  await tick(5);
  const keysText = normalize(guide.textContent);
  ok(keysText.includes("Grammar Detective") && keysText.includes("IQ200") && keysText.includes("A Busy Saturday"), "teacher keys cover the drill, the detective, the IQ200 challenge, and the reading");
  click(findButton(guide, "القواعد والملاحظات التعليمية"));
  await tick(5);
  const rulesText = normalize(guide.textContent);
  ok(rulesText.includes("ملاحظات دقة على المصدر") && rulesText.includes("CVC"), "teacher rules tab lists the source-accuracy notes (including the doubling condition for §24)");
  ok(guide.textContent.includes("Teacher"), "teacher guide is clearly labelled as the teacher surface");
  for (const tab of ["خريطة التغطية", "مفاتيح التدريب والقراءة", "حلول الاختبار", "القواعد والملاحظات التعليمية"]) {
    click(findButton(guide, tab));
    await tick(5);
    interactedHtml.push(guide.innerHTML);
  }
  guideRoot.unmount(); guide.remove();
}

// 12) Integrated shell: areas, gating, keyboard, mobile navigation, and unlock chain.
{
  const { el: shell, root: shellRoot } = M.mount(M.React.createElement(M.Lesson37, { onExit() {} }));
  await tick();
  ok(!!shell.querySelector('[data-lesson="37"] [data-area="lesson37-student"]'), "integrated Lesson 37 shell starts in the Student Area");
  const mobileToggle = findButton(shell, "محتويات الدرس");
  const mobilePanel = shell.querySelector("#lesson37-mobile-nav");
  ok(mobileToggle?.getAttribute("aria-expanded") === "false" && mobilePanel?.hidden, "mobile navigation exposes a controlled, initially collapsed panel");
  click(mobileToggle);
  await tick(5);
  ok(mobileToggle?.getAttribute("aria-expanded") === "true" && mobilePanel && !mobilePanel.hidden, "mobile navigation opens through a touch/keyboard button");
  click(mobileToggle);
  await tick(5);
  ok(mobileToggle?.getAttribute("aria-expanded") === "false" && mobilePanel?.hidden, "mobile navigation closes and updates aria-expanded");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!shell.querySelector('[data-area="lesson37-student"] [data-step-id="s01"]'), "Student Area supports keyboard next-step navigation (ArrowLeft moves forward in RTL)");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!shell.querySelector('[data-area="lesson37-student"] [data-step-id="cover"]'), "keyboard navigation returns to the opening step");
  const solutionTab = findButton(shell, "منطقة الحلول");
  ok(solutionTab?.disabled === true, "Solutions Area stays locked before test submission or teacher unlock");
  click(findButton(shell, "منطقة الاختبار"));
  await tick();
  const shellTest = shell.querySelector('[data-area="lesson37-test"]');
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
  ok(shell.querySelectorAll('[data-area="lesson37-solutions"] [data-solution]').length === 5, "integrated Solutions Area lazy-loads the first level after submission");
  click(findButton(shell, "منطقة المعلم"));
  await tick();
  const teacherForm = shell.querySelector('form[data-area="lesson37-teacher"]');
  const passwordField = teacherForm?.querySelector('input[type="password"]');
  setNative(passwordField, "wrong-password");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!teacherForm.querySelector('[role="alert"]'), "Teacher Area reports an accessible error for an incorrect password");
  ok(!shell.querySelector('[data-area="lesson37-teacher"] nav[aria-label="أقسام دليل المعلم"]'), "a wrong password does not load the teacher guide");
  setNative(passwordField, "somer173");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await M.act(async () => { await tick(150); });
  ok(!!shell.querySelector('[data-area="lesson37-teacher"] nav[aria-label="أقسام دليل المعلم"]'), "the shared teacher password loads the separate, navigable Teacher Area");
  shellRoot.unmount();
  shell.remove();
}

// 13) English-direction isolation, BIDI oracle on real markup, and contrast tokens.
const directionSources = ["kit37.tsx", "TestArea37.tsx", "SolutionsArea37.tsx", "TeacherGuide37.tsx", "TeacherArea37.tsx", "Steps37.tsx", "Lesson37.tsx", "labs37.tsx", "ledger37.ts", "practiceData37.ts", "testData37.ts", "solutionsData37.ts", "coverage37.ts"].map((file) => readFileSync(join(root, "src", "lessons", "lesson37", file), "utf8")).join("\n");
ok(directionSources.includes('dir={pureEnglish ? "ltr" : "auto"}') || directionSources.includes('dir="ltr"') && directionSources.includes("font-en"), "Lesson 37 isolates English/formulas LTR and keeps mixed runs direction-aware");
ok(!/unicode-bidi\s*:\s*[^;]*override|direction\s*:\s*rtl\s*!important/i.test(directionSources), "Lesson 37 adds no blanket BIDI override rules");
ok(!/[\u2066\u2067\u2068\u2069\u202A\u202B\u202C\u202D\u202E]/.test(directionSources), "Lesson 37 data carries no raw Unicode bidi control characters");
{
  const snapshots = [...initialStepHtml.values(), ...interactedHtml, testPreHtml, M.renderToString(M.React.createElement(M.SolutionsArea37, { unlocked: true, onGoTest() {}, onGoTeacher() {} })), M.renderToString(M.React.createElement(M.TeacherGuide37, { onGoSolutions() {}, onLock() {} }))];
  const violations = [];
  for (const html of snapshots) {
    for (const paragraph of analyzeHtml(html)) {
      for (const violation of paragraph.violations || []) violations.push(`${violation.latin} ⇄ ${violation.arabic} (${violation.sig})`);
    }
  }
  ok(violations.length === 0, `the rendered Lesson 37 markup passes the English/Arabic BIDI oracle — ${violations.length} violations: ${violations.slice(0, 12).join(" · ") || "clean"}`);
}
{
  const englishSamples = ["What will you be doing tomorrow?", "Subject + will + be + V-ing", "She will be preparing dinner.", "Will they be waiting for us?", "I won't be studying at midnight.", "When you arrive, I will be studying."];
  const allHtml = [...initialStepHtml.values()].join("\n");
  ok(englishSamples.filter((sample) => allHtml.includes(sample)).length >= 4, "English questions, formulas, and negative forms render in their original word order inside the Arabic UI");
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
];
const contrastFailures = contrastPairs.filter(([fg, bg]) => contrast(fg, bg) < 4.5);
ok(contrastFailures.length === 0, `audited text/background palette pairs meet WCAG AA 4.5:1 (${contrastFailures.map(([fg, bg, label]) => `${label} ${contrast(fg, bg).toFixed(2)}:1`).join(", ")})`);
ok(contrast("#17354a", "#ffffff") >= 3 && contrast("#17354a", "#fffdf8") >= 3, "focus indicator contrast is at least 3:1 against both light surfaces");
ok(["\u200f", "\u200e"].every((mark) => directionSources.includes(mark) === false), "no stray LRM/RLM marks were needed in the lesson sources");

// 14) Registration, documentation, and the project-level audit contracts.
{
  const appText = readFileSync(join(root, "src/App.tsx"), "utf8");
  ok(appText.includes('import Lesson37 from "./lessons/lesson37/Lesson37"') && appText.includes('href: "#/lesson/37"') && appText.includes("route === 37"), "App.tsx registers Lesson 37 as a hub card and first-class route");
  const docs = readFileSync(join(root, "docs/lesson37-coverage.md"), "utf8");
  ok((docs.match(/^\| §\d+/gm) || []).length === 38, "coverage ledger documents all 38 numbered source sections");
  ok(docs.includes("Table reconstruction contracts") && docs.includes("Test and answer provenance contract"), "coverage ledger records the rebuilt tables and the missing-source-key provenance");
  ok(COVERAGE_ACCURACY_NOTES_37.length >= 5, "the in-app coverage ledger keeps the source-accuracy notes");
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  ok(pkg.scripts["audit:lesson37"] === "node scripts/audit-lesson37.mjs", "package.json exposes audit:lesson37");
  const chain = pkg.scripts["audit:english-direction"];
  ok(chain.includes("audit-lesson37.mjs"), "audit:english-direction runs the Lesson 37 audit");
  ok(readFileSync(join(root, "scripts/check-english-direction.mjs"), "utf8").includes("lessons.length === 37"), "direction-check inventory covers 37 lessons");
  ok(readFileSync(join(root, "scripts/audit-render-direction.mjs"), "utf8").includes("lessonFolders.length === 37"), "render audit covers 37 lesson folders");
  ok(readFileSync(join(root, "scripts/audit-lesson-navigation.mjs"), "utf8").includes('"#/lesson/37"'), "navigation audit covers the Lesson 37 route");
  ok(readFileSync(join(root, "scripts/audit-final-test.mjs"), "utf8").includes("lesson37DedicatedAssessment"), "final-test audit recognises the Lesson 37 dedicated assessment");
  ok(existsSync(join(root, "src/lessons/lesson37/ledger37.ts")) && existsSync(join(root, "src/lessons/lesson37/solutionsData37.ts")) && existsSync(join(root, "docs/lesson37-coverage.md")), "Lesson 37 source ledger, separate solution data, and coverage document exist");
}

rmSync(outDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`✕ Lesson 37 audit failed: ${failures.length} of ${assertions} assertions failed`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 37 audit passed: ${assertions} assertions; 38 numbered source sections + opening; 25 questions in five levels; 25 separate platform-authored solutions; timeline/camera/formula/builder/reading/writing interactions; source/route/direction/contrast contracts.`);
