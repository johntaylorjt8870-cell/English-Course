// Lesson 38 — source coverage, area separation, interactions, direction, contrast tokens, and route audit.
// Run: npm run audit:lesson38
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { analyzeHtml } from "./lib/bidi-sim.mjs";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "node_modules", ".lesson38-audit", String(process.pid));
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
import Lesson38 from ${JSON.stringify(join(root, "src/lessons/lesson38/Lesson38.tsx"))};
import StepView38 from ${JSON.stringify(join(root, "src/lessons/lesson38/Steps38.tsx"))};
import TestArea38 from ${JSON.stringify(join(root, "src/lessons/lesson38/TestArea38.tsx"))};
import TeacherArea38 from ${JSON.stringify(join(root, "src/lessons/lesson38/TeacherArea38.tsx"))};
import SolutionsArea38 from ${JSON.stringify(join(root, "src/lessons/lesson38/SolutionsArea38.tsx"))};
import TeacherGuide38 from ${JSON.stringify(join(root, "src/lessons/lesson38/TeacherGuide38.tsx"))};
import * as LEDGER from ${JSON.stringify(join(root, "src/lessons/lesson38/ledger38.ts"))};
import * as DATA from ${JSON.stringify(join(root, "src/lessons/lesson38/data.ts"))};
import * as PRACTICE from ${JSON.stringify(join(root, "src/lessons/lesson38/practiceData38.ts"))};
import * as TEST from ${JSON.stringify(join(root, "src/lessons/lesson38/testData38.ts"))};
import * as SOLUTIONS from ${JSON.stringify(join(root, "src/lessons/lesson38/solutionsData38.ts"))};
import * as COVERAGE from ${JSON.stringify(join(root, "src/lessons/lesson38/coverage38.ts"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); const root = createRoot(el); act(() => root.render(node)); return { el, root: { unmount() { act(() => root.unmount()); } } }; }
export { React, act, createRoot, renderToString, App, Lesson38, StepView38, TestArea38, TeacherArea38, SolutionsArea38, TeacherGuide38, LEDGER, DATA, PRACTICE, TEST, SOLUTIONS, COVERAGE, mount };
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
  // Lesson 44 bundles its own local font subsets; jsdom never renders them.
  loader: { ".woff2": "empty" },
  logLevel: "silent",
});
const M = await import(pathToFileURL(outFile).href);

const { SOURCE_SECTIONS_38, NUMBERED_SECTIONS_38, TIMELINE_ROWS_38, PRONOUN_ROWS_38, AT_BY_ROWS_38, TIME_EXPRESSION_ROWS_38, REGULAR_V3_ROWS_38, IRREGULAR_V3_ROWS_38, FUTURE_ROWS_38, PERFECT_ROWS_38, sourceSection38 } = M.LEDGER;
const { SLIDES_38, STEP_COUNT_38, NUMBERED_STEP_COUNT_38, CHAPTERS_38, LESSON_SUBTITLE_38, LESSON_ARABIC_SUBTITLE_38 } = M.DATA;
const { TEST_LEVELS_38, TEST_COUNT_38, TEST_LEVEL_COUNT_38, TEST_INTRO_38, TEST_SOURCE_UNIT_INDEXES_38, TEST_SOURCE_UNIT_TOTAL_38 } = M.TEST;
const { TEST_SOLUTIONS_38 } = M.SOLUTIONS;
const {
  OBJECTIVES_38, EXERCISE27_ITEMS_38, FILL28_ITEMS_38, TENSE29_ITEMS_38, DETECTIVE30_ITEMS_38,
  READING32_QUESTIONS_38, READING32_ANALYSIS_38, WRITING35_CRITERIA_38, WRITING35_MODEL_38,
  DIALOGUE_LINES_38, DIALOGUE2_LINES_38, V3_ITEMS_38, ERROR_ITEMS_38,
} = M.PRACTICE;
const { COVERAGE_38, COVERAGE_SECTION_COUNT_38, COVERAGE_ACCURACY_NOTES_38 } = M.COVERAGE;
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
const mountStep = (id) => {
  const slide = SLIDES_38.find((candidate) => candidate.id === id);
  if (!slide) throw new Error(`No source step ${id}`);
  return M.mount(M.React.createElement(M.StepView38, { slide, onGoTest() {}, onGoSolutions() {} }));
};
const renderStep = (slide) => M.renderToString(M.React.createElement(M.StepView38, { slide, onGoTest() {}, onGoSolutions() {} }));
const source = (id) => {
  const section = sourceSection38(id);
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
ok(SOURCE_SECTIONS_38.length === 37, `ledger contains the opening plus 36 numbered sections (got ${SOURCE_SECTIONS_38.length})`);
ok(NUMBERED_SECTIONS_38.length === 36 && NUMBERED_SECTIONS_38.every((section, index) => section.num === index + 1 && section.id === `s${String(index + 1).padStart(2, "0")}`), "all 36 numbered source sections exist exactly once in original order");
ok(STEP_COUNT_38 === 37 && NUMBERED_STEP_COUNT_38 === 36 && SLIDES_38[0].id === "cover", "native Student Area has opening + 36 numbered source steps");
ok(SLIDES_38.map((slide) => slide.sourceId).join("|") === SOURCE_SECTIONS_38.map((section) => section.id).join("|"), "each source section maps one-to-one to a native step without reordering");
ok(CHAPTERS_38.length === 11 && CHAPTERS_38.flatMap((chapter) => chapter.stepIds).join("|") === SOURCE_SECTIONS_38.map((section) => section.id).join("|"), "chapter navigation groups every source step once in order");
ok(SOURCE_SECTIONS_38.every((section, index) => section.order === index && section.title.length > 0 && section.units.length > 0), "every source section has an ordered title and non-empty content units");
ok(!sourceSection38("s37"), "no fabricated section beyond the supplied 36");
ok(COVERAGE_38.length === 37 && COVERAGE_SECTION_COUNT_38 === 36, "coverage ledger row exists for the opening plus all 36 numbered sections");

// 2) Exact source excerpts and the rebuilt tables.
ok(source("cover").units.some((line) => line.includes(LESSON_SUBTITLE_38)) && source("cover").units.some((line) => line.includes("IQ200")), "cover keeps the English subtitle and IQ200 tagline");
ok(source("cover").units.includes("At 8:00 tomorrow, I will be studying.") && source("cover").units.includes("By 8:00 tomorrow, I will have finished studying."), "cover keeps the Lesson 37 bridge pair (studying, not homework)");
ok(source("s01").units.slice(1).length === 10 && source("s01").units.slice(1).every((line, index) => line.startsWith(`${["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"][index]}`)), "§1 contains all ten individually numbered objectives");
ok(TIMELINE_ROWS_38.length === 3 && TIMELINE_ROWS_38.map((row) => row.join("=")).join("|") === "MONDAY=اليوم|WEDNESDAY=إنهاء المشروع|FRIDAY=نقطة المرجع المستقبلية", "§2 rebuilt timeline keeps the exact three source moments");
ok(source("s02").units.includes("Will your project be ready by Friday?") && source("s02").units.includes("Yes. I will have finished it by Friday."), "§2 keeps the teacher question and the Future Perfect answer");
ok(PRONOUN_ROWS_38.length === 7 && PRONOUN_ROWS_38.map((row) => row[0]).join(",") === "I,You,He,She,It,We,They", "§5 pronoun table keeps all seven subjects in order");
ok(PRONOUN_ROWS_38[4][1] === "It will have stopped." && PRONOUN_ROWS_38.every(([, sentence]) => sentence.includes("will have ")), "§5 every pronoun uses will have + V3, and It uses stopped");
ok(source("s03").units.includes("Subject + will + have + V3"), "§3 keeps the exact core formula");
ok(source("s04").units.some((line) => line.includes("She will have completed the experiment by noon.")) && source("s04").units.some((line) => line.includes("She will has finished. ❌")), "§4 keeps the analysed sentence and the has error");
ok(AT_BY_ROWS_38.length === 2 && AT_BY_ROWS_38[0][0] === "At 8:00" && AT_BY_ROWS_38[1][0] === "By 9:00", "§8 rebuilt AT vs BY table keeps the two source rows");
ok(TIME_EXPRESSION_ROWS_38.length === 9 && TIME_EXPRESSION_ROWS_38.map((row) => row[0]).join("|") === "by tomorrow|by next week|by next year|by 10:00|by the end of the day|by the end of the month|by then|before Friday|by the time you arrive", "§9 keeps all nine supplied time expressions in order");
ok(source("s11").units.some((line) => line.includes("By the time you will arrive, I will have finished. ❌")) && source("s11").units.some((line) => line.includes("By the time you arrive, I will have finished. ✅")), "§11 keeps the wrong will-in-time-clause and the corrected Present Simple");
ok(source("s13").title.includes("The School Exhibition") && DIALOGUE_LINES_38.length === 6, "§13 keeps The School Exhibition with six turns");
ok(source("s14").units.includes("Subject + will not + have + V3") && source("s14").units.includes("will not = won't"), "§14 keeps the negative formula");
ok(source("s16").units.includes("Will + Subject + have + V3?") && source("s17").units.includes("Yes, I will.") && source("s17").units.includes("No, I won't."), "§16–§17 keep the Yes/No formula and short answers");
ok(["What will you have completed by Friday?", "How many books will she have read by the end of the month?", "Where will they have travelled by the end of the year?", "How much money will you have saved by next summer?", "When will he have finished the project?"].every((question) => source("s18").units.includes(question)), "§18 keeps all five exact Wh-question examples");
ok(REGULAR_V3_ROWS_38.length === 5 && IRREGULAR_V3_ROWS_38.length === 10 && IRREGULAR_V3_ROWS_38.some((row) => row[0] === "go" && row[2] === "gone"), "§19 rebuilt V3 tables keep five regular and ten irregular verbs");
ok(source("s19").units.some((line) => line.includes("I will have wrote the report. ❌")) && source("s19").units.some((line) => line.includes("She will have went home. ❌")), "§19 keeps the wrote/went error pairs");
ok(FUTURE_ROWS_38.map((row) => row[1]).join("|") === "will + V1|will be + V-ing|will have + V3", "§22 comparison table keeps the three future forms");
ok(PERFECT_ROWS_38.map((row) => row[1]).join("|") === "have/has + V3|had + V3|will have + V3", "§24 perfect map keeps the three perfect forms");
ok(source("s25").units.filter((line) => line.includes("❌")).length === 7 && source("s25").units.filter((line) => line.includes("✅")).length === 7, "§25 keeps all seven error pairs");
ok(ERROR_ITEMS_38.length === 7 && ERROR_ITEMS_38.map((item) => item.prompt).join("|") === "She will has finished.|I will have finish.|They will have went home.|He won't has arrived.|Will she has completed the work?|By the time you will arrive, I will have finished.|I will have be ready.", "§25 diagnosis lab covers all seven source error sentences in order");
ok(DIALOGUE2_LINES_38.length === 9 && source("s26").units.some((line) => line.includes("I'll be checking the sound system.")), "§26 keeps the nine-turn festival dialogue including Future Continuous");
ok(EXERCISE27_ITEMS_38.length === 6 && EXERCISE27_ITEMS_38.every((item, index) => item.n === index + 1 && item.answer && item.options.length === 3), "§27 keeps all six multiple-choice items");
ok(FILL28_ITEMS_38.length === 6 && FILL28_ITEMS_38[4].answer === "Will you have saved", "§28 keeps all six completions including the question form");
ok(TENSE29_ITEMS_38.length === 8 && TENSE29_ITEMS_38[5].answer === "future-continuous" && TENSE29_ITEMS_38[6].answer === "future-perfect", "§29 keeps the eight tense choices and the ⑥/⑦ contrast");
ok(DETECTIVE30_ITEMS_38.length === 10 && DETECTIVE30_ITEMS_38[6].answer === "He will be ready by 8:00.", "§30 keeps all ten error sentences including will be ready");
ok(source("s31").units.includes("I will finish the project by Friday.") && source("s31").units.includes("I will have finished the project by Friday."), "§31 keeps both grammatical by-Friday sentences");
ok(source("s32").units.some((line) => line.includes("Building a Smarter City")) && READING32_QUESTIONS_38.length === 7 && READING32_ANALYSIS_38.length === 5, "§32 keeps the reading text, seven questions, and five-form analysis");
ok(source("s33").units.length === 60 && TEST_SOURCE_UNIT_TOTAL_38 === 60 && TEST_SOURCE_UNIT_INDEXES_38.length === 60 && TEST_SOURCE_UNIT_INDEXES_38.every((value, index) => value === index), "§33 formal test consumes all 60 source lines exactly once");
ok(source("s34").units.length === 3 && !source("s34").revealUnits, "§34 is preserved as heading plus its prompt, and the source key really is absent");
ok(WRITING35_CRITERIA_38.length === 8 && WRITING35_MODEL_38.length === 5 && source("s35").units[1].includes("12 إلى 15"), "§35 keeps the 12–15 sentence task, all eight criteria, and the five-line model");
ok(source("s36").units.includes("Subject + will + have + V3") && source("s36").units.some((line) => line.includes("Subject + won't + have + V3")), "§36 golden summary keeps the positive and negative formulas");

// 3) Exactly 25 source test items.
ok(TEST_COUNT_38 === 25 && TEST_LEVEL_COUNT_38 === 5 && TEST_LEVELS_38.every((level) => level.questions.length === 5), "formal Test Area contains exactly 25 questions in five levels of five");
ok(TEST_LEVELS_38.map((level) => `${level.questions[0].n}-${level.questions.at(-1).n}`).join("|") === "1-5|6-10|11-15|16-20|21-25", "formal test keeps the exact source level boundaries");
ok(TEST_LEVELS_38[0].questions.every((question) => question.type === "multiple-choice" && question.options?.length === 3), "Level 1 keeps its five multiple-choice questions with three options each");
ok(TEST_LEVELS_38[1].questions.every((question) => question.type === "fill") && TEST_LEVELS_38[2].questions.every((question) => question.type === "repair"), "Level 2 stays completion and Level 3 stays error repair");
ok(TEST_LEVELS_38[3].questions[3].type === "open" && TEST_LEVELS_38[4].questions.every((question) => question.marker?.text), "Level 4 keeps an open item and Level 5 keeps the five paragraph markers");
ok(TEST_LEVELS_38[4].questions.at(-1).fieldLabel?.includes("المعلم"), "Level 5 keeps the teacher's question as its own field");
ok(TEST_INTRO_38.length === 2 && TEST_LEVELS_38.every((level) => level.questions.every((question) => question.promptLines.length > 0 && question.promptUnitIndexes.length === question.promptLines.length)), "every test question keeps its traced source prompt lines");

// 4) Twenty-five platform-authored solutions.
ok(TEST_SOLUTIONS_38.length === 25 && TEST_SOLUTIONS_38.every((solution, index) => solution.n === index + 1), "25 detailed solutions exist for Q1–Q25 in order");
ok(TEST_SOLUTIONS_38.every((solution) => solution.sourceStatus === "platform-authored-teacher-addition"), "every solution is explicitly platform/teacher-authored");
ok(TEST_SOLUTIONS_38.every((solution) => solution.level === Math.ceil(solution.n / 5)), "solutions are grouped by the same five levels as the test");
ok(TEST_SOLUTIONS_38.every((solution) => solution.answer.length > 0 && solution.explanation.length > 30), "every solution carries an answer and substantive reasoning");
ok(TEST_SOLUTIONS_38.filter((solution) => solution.n >= 16 && solution.n <= 20).every((solution) => solution.judgment === "open-model" || solution.judgment === "contextual") && TEST_SOLUTIONS_38.filter((solution) => solution.n >= 16).every((solution) => solution.alternatives?.length), "meaning/open questions carry accepted alternatives");
ok(TEST_SOLUTIONS_38.filter((solution) => solution.n <= 5).every((solution) => /^(A|B|C)\./.test(solution.answer)), "Level 1 solutions name the correct letter and option");
ok(TEST_SOLUTIONS_38[22].answer.includes("will be testing"), "Q23 (At 3:00) is solved as Future Continuous, not Future Perfect");

// 5) Every source step renders.
const initialStepHtml = new Map();
const interactedHtml = [];
for (const slide of SLIDES_38) {
  const html = renderStep(slide);
  initialStepHtml.set(slide.id, html);
  ok(html.includes(`data-step-id="${slide.id}"`) && html.includes(`data-source-id="${slide.id}"`) && html.includes(`data-source-section="${slide.id}"`), `${slide.id}: renders as a native, traceable step`);
  ok(html.length > 700, `${slide.id}: renders substantive content (${html.length} chars)`);
}

// 6) Test Area neutrality.
const testPreHtml = M.renderToString(M.React.createElement(M.TestArea38, { onSubmitted() {}, onGoSolutions() {} }));
ok((testPreHtml.match(/data-test-question="\d+"/g) || []).length === 25, "pre-submit Test Area renders 25 numbered question panels");
ok((testPreHtml.match(/data-source-unit="s33-unit-\d+"/g) || []).length >= 60, "every source line of §33 is traced into the Test Area markup");
ok(!testPreHtml.includes("data-test-feedback") && !testPreHtml.includes("data-solution="), "before submit there is no correctness feedback and no solution panel in the Test Area");
ok(!readFileSync(join(root, "src/lessons/lesson38/TestArea38.tsx"), "utf8").includes("solutionsData38"), "the formal test component does not import the answer key");
ok(readFileSync(join(root, "src/lessons/lesson38/Lesson38.tsx"), "utf8").includes("testSubmitted || teacherUnlocked") && readFileSync(join(root, "src/lessons/lesson38/Lesson38.tsx"), "utf8").includes('lazy(() => import("./SolutionsArea38"))'), "Solutions Area is dynamically loaded only after submission or teacher unlock");
ok(readFileSync(join(root, "src/lessons/lesson38/TeacherArea38.tsx"), "utf8").includes('lazy(() => import("./TeacherGuide38"))'), "the teacher answer/coverage chunk is deferred until teacher unlock");
ok(readFileSync(join(root, "src/lessons/lesson38/TeacherArea38.tsx"), "utf8").includes('TEACHER_PASSWORD_38 = "somer173"'), "Teacher Area keeps the shared teacher password gate");

// 7) Reveal in §27–§30 and §32 stays hidden until the attempt.
for (const id of ["s27", "s28", "s29", "s30", "s32"]) {
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
  ok(boxes.length === OBJECTIVES_38.length && boxes.length === 10, "§1 self-review checklist lists all ten objectives");
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
  click(moments.find((node) => node.getAttribute("data-timeline-moment") === "friday"));
  await tick(5);
  ok(!!el.querySelector('[data-timeline-readout="friday"]') && el.textContent.includes("I will have finished it by Friday."), "§2 selecting Friday shows the Future Perfect sentence");
  const radios = [...el.querySelectorAll('input[name="timeline-answer"]')];
  ok(radios.length === 3, "§2 asks which day the Future Perfect sentence describes");
  click(radios.find((radio) => radio.getAttribute("value") === "friday"));
  await tick(3);
  click(findButton(el, "تحقق من إجابتي"));
  await tick(5);
  ok(normalize(el.textContent).includes("إجابة صحيحة."), "§2 answers with post-attempt feedback naming Friday");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s03");
  await tick();
  for (const piece of ["subject", "will", "have", "v3"]) {
    click(el.querySelector(`[data-formula-piece="${piece}"]`));
    await tick(2);
  }
  click(findButton(el, "تحقق من الترتيب"));
  await tick(5);
  ok(normalize(el.textContent).includes("ترتيب صحيح.") && el.textContent.includes("Subject + will + have + V3"), "§3 formula builder confirms Subject → will → have → V3");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s05");
  await tick();
  const pronouns = [...el.querySelectorAll("[data-pronoun]")];
  ok(pronouns.length === 7, "§5 conjugation console exposes all seven pronouns");
  click(pronouns.find((node) => node.getAttribute("data-pronoun") === "He"));
  await tick(3);
  ok(el.textContent.includes("He will have finished.") && !el.textContent.includes("He will has"), "§5 He keeps will have + V3 without has");
  const cards = await driveChoiceLab(el);
  ok(cards >= 3 && normalize(el.textContent).includes("اختيار مناسب."), "§5 common-error check works and gives post-attempt feedback");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s13");
  await tick();
  const lines = [...el.querySelectorAll("[data-dialogue-line]")];
  ok(lines.length === 6, "§13 dialogue has all six turns");
  for (const line of lines) {
    click(findButton(line, "تحليل السطر"));
    await tick(3);
  }
  const text = normalize(el.textContent);
  ok(DIALOGUE_LINES_38.every((line) => text.includes(line.analysis)), "§13 every turn reveals its Arabic translation and analysis after being opened");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s19");
  await tick();
  const items = [...el.querySelectorAll("[data-v3-item]")];
  ok(items.length === V3_ITEMS_38.length && items.length === 15, "§19 V3 workshop covers all fifteen source verbs");
  for (const item of items) {
    const base = item.getAttribute("data-v3-item");
    const record = V3_ITEMS_38.find((entry) => entry.base === base);
    setNative(item.querySelector("input[type=text]"), record.answer);
    await tick(2);
    click(findButton(item, "تحقق"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(text.includes("written") && text.includes("gone") && text.includes("built"), "§19 shows written, gone, and built after the attempt");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s14");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length >= 4, "§14 negative builder renders its items");
  for (const item of items) {
    setNative(item.querySelector("input"), "I won't have finished by 5:00.");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("will not أو won't") && normalize(el.textContent).includes("have بعد النفي"), "§14 builder reports the required negative elements");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s16");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length >= 4, "§16 Yes/No question builder renders its items");
  for (const item of items) {
    setNative(item.querySelector("input"), "Will he have arrived by noon?");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("have بعد الفاعل") && normalize(el.textContent).includes("علامة السؤال"), "§16 builder checks Will + Subject + have + V3 order");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s18");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length === 5, "§18 Wh builder renders all five source questions");
  for (const item of items) {
    setNative(item.querySelector("input"), "What will you have completed by Friday?");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("أداة استفهام"), "§18 builder checks the Wh-word + will + Subject + have + V3 order");
  reactRoot.unmount(); el.remove();
}
{
  const choiceLabs = ["s06", "s07", "s08", "s09", "s10", "s11", "s12", "s15", "s17", "s20", "s21", "s22", "s23", "s24", "s25", "s31", "s36"];
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

// 9) Practice keys after attempt.
{
  const { el, root: reactRoot } = mountStep("s27");
  await tick();
  for (const item of EXERCISE27_ITEMS_38) {
    const card = el.querySelector(`[data-practice-item="exercise27-${item.n}"]`);
    click(card.querySelector(`input[value="${item.answer}"]`));
    await tick(2);
    click(findButton(card, "تحقق"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("① B — have") && normalize(el.textContent).includes("⑥ C — prepared"), "§27 all six items are recorded and the source key appears after the attempt");
  ok(revealText(el, "s27").includes("① B — have"), "§27 source key block unlocks only after all six attempts");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s28");
  await tick();
  for (const item of FILL28_ITEMS_38) {
    const card = el.querySelector(`[data-practice-item="fill28-${item.n}"]`);
    setNative(card.querySelector("input"), item.answer);
    await tick(2);
    click(findButton(card, "تحقق"));
    await tick(2);
  }
  ok(revealText(el, "s28").includes("① will have finished"), "§28 the complete fill key appears after all six checks");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s29");
  await tick();
  for (const item of TENSE29_ITEMS_38) {
    const card = el.querySelector(`[data-practice-item="tense29-${item.n}"]`);
    click(card.querySelector(`input[value="${item.answer}"]`));
    await tick(2);
    click(findButton(card, "تحقق"));
    await tick(2);
  }
  ok(TENSE29_ITEMS_38.every((item) => normalize(el.textContent).includes(item.answerText)), "§29 every situation shows the chosen tense answer after the attempt");
  ok(revealText(el, "s29").includes("① will be studying"), "§29 the source answer/reason key appears after all eight attempts");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s30");
  await tick();
  for (const item of DETECTIVE30_ITEMS_38) {
    const card = el.querySelector(`[data-practice-item="detective30-${item.n}"]`);
    setNative(card.querySelector("input[type=text]"), "My correction for this sentence");
    await tick(2);
    click(findButton(card, "اعرض تصحيح المصدر"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(DETECTIVE30_ITEMS_38.every((item) => text.includes(item.answer)), "§30 all ten source corrections appear after the learner writes a correction");
  ok(revealText(el, "s30").includes("① I will have finished the work by Friday."), "§30 the source key block is revealed after the ten attempts");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s32");
  await tick();
  const fields = [...el.querySelectorAll("textarea")];
  ok(fields.length === 7, "§32 asks all seven comprehension questions in the student's own words");
  const revealButton = () => findButton(el, "اعرض إجابات المصدر");
  ok(revealButton()?.disabled === true, "§32 source answers stay locked until all seven answers are written");
  fields.forEach((field, index) => setNative(field, `My answer to question ${index + 1}`));
  await tick(5);
  ok(revealButton()?.disabled === false, "§32 answering all seven questions enables the source key");
  click(revealButton());
  await tick(5);
  ok(revealText(el, "s32").includes("① A model of a future city."), "§32 the seven source answers appear after the attempt");
  ok(normalize(el.textContent).includes("تحليل صيغ المستقبل في النص — إضافة من المنصة"), "§32 adds a labeled platform analysis of the future forms");
  click(el.querySelector('input[type="checkbox"]'));
  await tick(5);
  ok(!!el.querySelector("mark"), "§32 the optional future-form highlight marks the passage without hiding it");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s35");
  await tick();
  const writing = el.querySelector('textarea[lang="en"]');
  ok(!!writing && el.querySelectorAll('input[type="checkbox"]').length === 8, "§35 writing workspace has a text area and the eight source criteria");
  setNative(writing, Array.from({ length: 12 }, (_, index) => `Sentence ${index + 1}.`).join(" "));
  await tick(5);
  ok(normalize(el.textContent).includes("12") && normalize(el.textContent).includes("12–15"), "§35 counts the learner's sentences against the 12–15 requirement");
  ok(normalize(el.textContent).includes("لا يصدر النظام حكمًا آليًا"), "§35 does not claim automatic grading of the paragraph");
  const modelButton = findButton(el, "اعرض نموذج المصدر بعد الكتابة");
  ok(modelButton?.disabled === false, "§35 the source model appears only after at least twelve sentences");
  click(modelButton);
  await tick(5);
  ok(WRITING35_MODEL_38.every((line) => normalize(el.textContent).includes(line)), "§35 shows the complete five-line source model after the writing attempt");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s33");
  await tick();
  const text = normalize(el.textContent);
  ok(text.includes("25") && (text.includes("5 × 5") || text.includes("خمسة مستويات")), "§33 student step states the 25-question / five-level structure without printing the questions");
  ok(el.querySelectorAll("[data-test-question]").length === 0 && !el.textContent.includes("① By tomorrow, I will ______ finished."), "§33 step does not duplicate the formal test questions in the student surface");
  ok(!!findButton(el, "فتح Test Area"), "§33 step launches the separate Test Area");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s34");
  await tick();
  ok(normalize(el.textContent).includes("Solutions Area") && el.querySelectorAll("[data-solution]").length === 0, "§34 step points to the gated Solutions Area without exposing any answer");
  ok(!!findButton(el, "فتح Solutions Area"), "§34 step launches the Solutions Area");
  reactRoot.unmount(); el.remove();
}

// 10) Solutions Area.
{
  const locked = M.renderToString(M.React.createElement(M.SolutionsArea38, { unlocked: false, onGoTest() {}, onGoTeacher() {} }));
  ok(locked.includes("data-solutions-locked") && !locked.includes("data-solution="), "Solutions Area remains blank/locked without submission or teacher access");
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.SolutionsArea38, { unlocked: true, onGoTest() {}, onGoTeacher() {} }));
  await tick();
  const numbers = new Set();
  for (const tab of el.querySelectorAll('nav[aria-label="مستويات حلول اختبار الدرس 38"] button')) {
    click(tab);
    await tick(3);
    for (const card of el.querySelectorAll("[data-solution]")) numbers.add(Number(card.getAttribute("data-solution")));
  }
  ok(numbers.size === 25 && [...numbers].sort((a, b) => a - b).every((n, index) => n === index + 1), "after unlock, Solutions Area exposes all 25 solutions across its five level tabs");
  ok([...el.querySelectorAll("[data-source-status]")].every((node) => node.getAttribute("data-source-status") === "platform-authored-teacher-addition"), "every solution card is marked as a platform/teacher addition");
  const firstCard = el.querySelector("[data-solution]");
  ok(!!firstCard && firstCard.querySelectorAll("[data-solution-details]").length === 0 && normalize(firstCard.textContent).includes("الإجابة النموذجية"), "solution cards start collapsed with the answer visible");
  const cardToggle = firstCard ? findButton(firstCard, "إظهار الشرح والبدائل") : null;
  ok(!!cardToggle && cardToggle.getAttribute("aria-expanded") === "false" && cardToggle.getAttribute("aria-controls") === `solution-38-details-${firstCard.getAttribute("data-solution")}`, "each solution card has an accessible expand control");
  click(cardToggle);
  await tick(3);
  ok(firstCard.querySelectorAll("[data-solution-details]").length === 1 && normalize(firstCard.textContent).includes("التفسير:") && cardToggle.getAttribute("aria-expanded") === "true", "expanding one card reveals its explanation");
  click(cardToggle);
  await tick(3);
  ok(firstCard.querySelectorAll("[data-solution-details]").length === 0, "the same control collapses the card again");
  click(findButton(el, "فتح كل الشروح"));
  await tick(3);
  ok([...el.querySelectorAll("[data-solution]")].every((card) => card.querySelector("[data-solution-details]")), "the level control expands every card in the current level at once");
  click(el.querySelectorAll('nav[aria-label="مستويات حلول اختبار الدرس 38"] button')[4]);
  await tick(5);
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}

// 11) Teacher gate and guide.
{
  const lockedTeacher = M.renderToString(M.React.createElement(M.TeacherArea38, { unlocked: false, onUnlockChange() {}, onGoSolutions() {} }));
  ok(lockedTeacher.includes('type="password"') && !lockedTeacher.includes("data-teacher-solution"), "Teacher Area starts gated and renders no formal answer explanations");
  const { el: guide, root: guideRoot } = M.mount(M.React.createElement(M.TeacherGuide38, { onGoSolutions() {}, onLock() {} }));
  await tick();
  ok(guide.querySelectorAll("[data-coverage-section]").length === 37, "teacher coverage tab documents the opening plus all 36 source sections");
  click(findButton(guide, "حلول الاختبار"));
  await tick(5);
  ok(guide.querySelectorAll("[data-teacher-solution]").length === 25, "teacher guide contains all 25 detailed test answers");
  click(findButton(guide, "مفاتيح التدريب والقراءة"));
  await tick(5);
  const keysText = normalize(guide.textContent);
  ok(keysText.includes("Grammar Detective") && keysText.includes("Building a Smarter City"), "teacher keys cover the detective and the reading");
  click(findButton(guide, "القواعد والملاحظات التعليمية"));
  await tick(5);
  const rulesText = normalize(guide.textContent);
  ok(rulesText.includes("ملاحظات دقة على المصدر"), "teacher rules tab lists the source-accuracy notes");
  for (const tab of ["خريطة التغطية", "مفاتيح التدريب والقراءة", "حلول الاختبار", "القواعد والملاحظات التعليمية"]) {
    click(findButton(guide, tab));
    await tick(5);
    interactedHtml.push(guide.innerHTML);
  }
  guideRoot.unmount(); guide.remove();
}

// 12) Integrated shell.
{
  const { el: shell, root: shellRoot } = M.mount(M.React.createElement(M.Lesson38, { onExit() {} }));
  await tick();
  ok(!!shell.querySelector('[data-lesson="38"] [data-area="lesson38-student"]'), "integrated Lesson 38 shell starts in the Student Area");
  const mobileToggle = findButton(shell, "محتويات الدرس");
  const mobilePanel = shell.querySelector("#lesson38-mobile-nav");
  ok(mobileToggle?.getAttribute("aria-expanded") === "false" && mobilePanel?.hidden, "mobile navigation exposes a controlled, initially collapsed panel");
  click(mobileToggle);
  await tick(5);
  ok(mobileToggle?.getAttribute("aria-expanded") === "true" && mobilePanel && !mobilePanel.hidden, "mobile navigation opens");
  click(mobileToggle);
  await tick(5);
  ok(mobileToggle?.getAttribute("aria-expanded") === "false" && mobilePanel?.hidden, "mobile navigation closes");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!shell.querySelector('[data-area="lesson38-student"] [data-step-id="s01"]'), "Student Area supports keyboard next-step navigation (ArrowLeft moves forward in RTL)");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!shell.querySelector('[data-area="lesson38-student"] [data-step-id="cover"]'), "keyboard navigation returns to the opening step");
  const solutionTab = findButton(shell, "منطقة الحلول");
  ok(solutionTab?.disabled === true, "Solutions Area stays locked before test submission or teacher unlock");
  click(findButton(shell, "منطقة الاختبار"));
  await tick();
  const shellTest = shell.querySelector('[data-area="lesson38-test"]');
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
  ok(shell.querySelectorAll('[data-area="lesson38-solutions"] [data-solution]').length === 5, "integrated Solutions Area lazy-loads the first level after submission");
  click(findButton(shell, "منطقة المعلم"));
  await tick();
  const teacherForm = shell.querySelector('form[data-area="lesson38-teacher"]');
  const passwordField = teacherForm?.querySelector('input[type="password"]');
  setNative(passwordField, "wrong-password");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!teacherForm.querySelector('[role="alert"]'), "Teacher Area reports an accessible error for an incorrect password");
  ok(!shell.querySelector('[data-area="lesson38-teacher"] nav[aria-label="أقسام دليل المعلم"]'), "a wrong password does not load the teacher guide");
  setNative(passwordField, "somer173");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await M.act(async () => { await tick(150); });
  ok(!!shell.querySelector('[data-area="lesson38-teacher"] nav[aria-label="أقسام دليل المعلم"]'), "the shared teacher password loads the separate Teacher Area");
  shellRoot.unmount();
  shell.remove();
}

// 13) English-direction isolation, BIDI oracle, contrast.
let renderedSnapshots = [];
const directionSources = ["kit38.tsx", "TestArea38.tsx", "SolutionsArea38.tsx", "TeacherGuide38.tsx", "TeacherArea38.tsx", "Steps38.tsx", "Lesson38.tsx", "labs38.tsx", "ledger38.ts", "practiceData38.ts", "testData38.ts", "solutionsData38.ts", "coverage38.ts"].map((file) => readFileSync(join(root, "src", "lessons", "lesson38", file), "utf8")).join("\n");
ok(directionSources.includes('dir={pureEnglish ? "ltr" : "auto"}') || (directionSources.includes('dir="ltr"') && directionSources.includes("font-en")), "Lesson 38 isolates English/formulas LTR");
ok(!/unicode-bidi\s*:\s*[^;]*override|direction\s*:\s*rtl\s*!important/i.test(directionSources), "Lesson 38 adds no blanket BIDI override rules");
ok(!/[\u2066\u2067\u2068\u2069\u202A\u202B\u202C\u202D\u202E]/.test(directionSources), "Lesson 38 data carries no raw Unicode bidi control characters");
{
  const snapshots = [...initialStepHtml.values(), ...interactedHtml, testPreHtml, M.renderToString(M.React.createElement(M.SolutionsArea38, { unlocked: true, onGoTest() {}, onGoTeacher() {} })), M.renderToString(M.React.createElement(M.TeacherGuide38, { onGoSolutions() {}, onLock() {} }))];
  renderedSnapshots = snapshots;
  const violations = [];
  for (const html of snapshots) {
    for (const paragraph of analyzeHtml(html)) {
      for (const violation of paragraph.violations || []) violations.push(`${violation.latin} ⇄ ${violation.arabic} (${violation.sig})`);
    }
  }
  ok(violations.length === 0, `the rendered Lesson 38 markup passes the English/Arabic BIDI oracle — ${violations.length} violations: ${violations.slice(0, 12).join(" · ") || "clean"}`);
}
{
  const englishSamples = ["Subject + will + have + V3", "She will have completed the experiment by noon.", "Will he have arrived by noon?", "They will have completed the project.", "By the time you arrive, I will have finished."];
  const allHtml = [...initialStepHtml.values()].join("\n");
  ok(englishSamples.filter((sample) => allHtml.includes(sample)).length >= 4, "English questions, formulas, and negative forms render in their original word order");
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
  const uiFiles = ["Lesson38.tsx", "Steps38.tsx", "labs38.tsx", "kit38.tsx", "TestArea38.tsx", "SolutionsArea38.tsx", "TeacherGuide38.tsx", "TeacherArea38.tsx"];
  const uiSources = uiFiles.map((file) => readFileSync(join(root, "src", "lessons", "lesson38", file), "utf8"));
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
  const read38 = (file) => readFileSync(join(root, "src", "lessons", "lesson38", file), "utf8");
  for (const file of ["Lesson38.tsx", "Steps38.tsx", "labs38.tsx", "TestArea38.tsx", "SolutionsArea38.tsx", "TeacherGuide38.tsx", "kit38.tsx"]) {
    ok(/sm:|lg:|md:/.test(read38(file)), `${file}: reflows at a breakpoint instead of one fixed desktop layout`);
  }
  ok(read38("kit38.tsx").includes("overflow-x-auto") && read38("TeacherGuide38.tsx").includes("overflow-x-auto"), "wide source/coverage tables live inside horizontally scrollable containers");
  ok(["Lesson38.tsx", "kit38.tsx", "labs38.tsx", "Steps38.tsx"].every((file) => read38(file).includes("min-w-0")), "flex rows carrying long mixed text can shrink (min-w-0)");
  ok(!/w-\[\d{3,}px\]/.test(directionSources) && !/whitespace-nowrap/.test(directionSources), "no fixed pixel width and no nowrap rule can force horizontal overflow");
  const shell = read38("Lesson38.tsx");
  ok(/role="progressbar"/.test(shell) && /aria-valuemax=\{STEP_COUNT_38\}/.test(shell), "the student shell exposes a real progress indicator");
  ok((shell.match(/role="progressbar"/g) || []).length >= 2, "the progress indicator is present in both the desktop rail and the mobile header");
}

// 14) Registration.
{
  const appText = readFileSync(join(root, "src/App.tsx"), "utf8");
  ok(appText.includes('import Lesson38 from "./lessons/lesson38/Lesson38"') && appText.includes('href: "#/lesson/38"') && appText.includes("route === 38"), "App.tsx registers Lesson 38 as a hub card and first-class route");
  const docs = readFileSync(join(root, "docs/lesson38-coverage.md"), "utf8");
  ok(docs.includes("§36") && docs.includes("Table reconstruction contracts") && docs.includes("Test and answer provenance contract"), "coverage ledger records rebuilt tables and missing-source-key provenance");
  ok(COVERAGE_ACCURACY_NOTES_38.length >= 5, "the in-app coverage ledger keeps the source-accuracy notes");
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  ok(pkg.scripts["audit:lesson38"] === "node scripts/audit-lesson38.mjs", "package.json exposes audit:lesson38");
  const chain = pkg.scripts["audit:english-direction"];
  ok(chain.includes("audit-lesson38.mjs"), "audit:english-direction runs the Lesson 38 audit");
  ok(readFileSync(join(root, "scripts/check-english-direction.mjs"), "utf8").includes("lessons.length === 44"), "direction-check inventory covers 44 lessons");
  ok(readFileSync(join(root, "scripts/audit-render-direction.mjs"), "utf8").includes("lessonFolders.length === 44"), "render audit covers 44 lesson folders");
  ok(readFileSync(join(root, "scripts/audit-lesson-navigation.mjs"), "utf8").includes('"#/lesson/38"'), "navigation audit covers the Lesson 38 route");
  ok(readFileSync(join(root, "scripts/audit-final-test.mjs"), "utf8").includes("lesson38DedicatedAssessment"), "final-test audit recognises the Lesson 38 dedicated assessment");
  ok(existsSync(join(root, "src/lessons/lesson38/ledger38.ts")) && existsSync(join(root, "src/lessons/lesson38/solutionsData38.ts")) && existsSync(join(root, "docs/lesson38-coverage.md")), "Lesson 38 source ledger, separate solution data, and coverage document exist");
}

rmSync(outDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`✕ Lesson 38 audit failed: ${failures.length} of ${assertions} assertions failed`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 38 audit passed: ${assertions} assertions; 36 numbered source sections + opening; 25 questions in five levels; 25 separate platform-authored solutions; timeline/formula/builder/reading/writing interactions; source/route/direction/contrast contracts.`);
