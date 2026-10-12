// Lesson 36 — source coverage, area separation, interactions, direction, contrast tokens, and route audit.
// Run: npm run audit:lesson36
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "node_modules", ".lesson36-audit", String(process.pid));
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
import Lesson36 from ${JSON.stringify(join(root, "src/lessons/lesson36/Lesson36.tsx"))};
import StepView36 from ${JSON.stringify(join(root, "src/lessons/lesson36/Steps36.tsx"))};
import TestArea36 from ${JSON.stringify(join(root, "src/lessons/lesson36/TestArea36.tsx"))};
import TeacherArea36 from ${JSON.stringify(join(root, "src/lessons/lesson36/TeacherArea36.tsx"))};
import SolutionsArea36 from ${JSON.stringify(join(root, "src/lessons/lesson36/SolutionsArea36.tsx"))};
import TeacherGuide36 from ${JSON.stringify(join(root, "src/lessons/lesson36/TeacherGuide36.tsx"))};
import * as LEDGER from ${JSON.stringify(join(root, "src/lessons/lesson36/ledger36.ts"))};
import * as DATA from ${JSON.stringify(join(root, "src/lessons/lesson36/data.ts"))};
import * as PRACTICE from ${JSON.stringify(join(root, "src/lessons/lesson36/practiceData36.ts"))};
import * as TEST from ${JSON.stringify(join(root, "src/lessons/lesson36/testData36.ts"))};
import * as SOLUTIONS from ${JSON.stringify(join(root, "src/lessons/lesson36/solutionsData36.ts"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); const root = createRoot(el); act(() => root.render(node)); return { el, root: { unmount() { act(() => root.unmount()); } } }; }
export { React, act, createRoot, renderToString, App, Lesson36, StepView36, TestArea36, TeacherArea36, SolutionsArea36, TeacherGuide36, LEDGER, DATA, PRACTICE, TEST, SOLUTIONS, mount };
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

const { SOURCE_SECTIONS_36, NUMBERED_SECTIONS_36, TABLE_HEADERS_36, TABLE_ROWS_36, sourceSection36 } = M.LEDGER;
const { SLIDES_36, STEP_COUNT_36, NUMBERED_STEP_COUNT_36, CHAPTERS_36 } = M.DATA;
const { TEST_LEVELS_36, TEST_36, TEST_COUNT_36, TEST_LEVEL_COUNT_36, TEST_INTRO_36 } = M.TEST;
const { TEST_SOLUTIONS_36 } = M.SOLUTIONS;
const { DETECTIVE_ITEMS_36, EXERCISE18_ITEMS_36, DIALOGUE19_ITEMS_36, READING_QUESTIONS_36, READING_ANSWERS_36, READING_ANALYSIS_36, WRITING_CRITERIA_36, WRITING_MODEL_36 } = M.PRACTICE;
const tick = (ms = 25) => new Promise((resolve) => setTimeout(resolve, ms));
const click = (element) => M.act(() => element?.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true })));
const setNative = (element, value) => {
  if (!element) throw new Error("Expected input is missing.");
  M.act(() => {
    const proto = element.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : element.tagName === "SELECT" ? win.HTMLSelectElement.prototype : win.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value);
    element.dispatchEvent(new win.Event("input", { bubbles: true }));
    element.dispatchEvent(new win.Event("change", { bubbles: true }));
  });
};
const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const textOf = (html) => {
  const element = document.createElement("div");
  element.innerHTML = html;
  return normalize(element.textContent);
};
const mountStep = (id) => {
  const slide = SLIDES_36.find((candidate) => candidate.id === id);
  if (!slide) throw new Error(`No source step ${id}`);
  return M.mount(M.React.createElement(M.StepView36, { slide, onGoTest() {}, onGoSolutions() {} }));
};
const source = (id) => {
  const section = sourceSection36(id);
  if (!section) throw new Error(`Missing source section ${id}`);
  return section;
};
const findButton = (scope, text) => [...scope.querySelectorAll("button")].find((button) => normalize(button.textContent).includes(text));
const renderStep = (slide) => M.renderToString(M.React.createElement(M.StepView36, { slide, onGoTest() {}, onGoSolutions() {} }));

// 1) Numbered source sections, introduction, source order, and navigation mapping.
ok(SOURCE_SECTIONS_36.length === 27, `ledger contains the opening plus 26 numbered sections (got ${SOURCE_SECTIONS_36.length})`);
ok(NUMBERED_SECTIONS_36.length === 26 && NUMBERED_SECTIONS_36.every((section, index) => section.num === index + 1 && section.id === `s${String(index + 1).padStart(2, "0")}`), "all 26 numbered source sections exist exactly once in original order");
ok(STEP_COUNT_36 === 27 && NUMBERED_STEP_COUNT_36 === 26 && SLIDES_36[0].id === "cover", "native Student Area has opening + 26 numbered source steps");
ok(SLIDES_36.map((slide) => slide.sourceId).join("|") === SOURCE_SECTIONS_36.map((section) => section.id).join("|"), "each source section maps one-to-one to a native step without reordering");
ok(CHAPTERS_36.length === 8 && CHAPTERS_36.flatMap((chapter) => chapter.stepIds).join("|") === SOURCE_SECTIONS_36.map((section) => section.id).join("|"), "chapter navigation groups every source step once in order");
ok(SOURCE_SECTIONS_36.every((section, index) => section.order === index && section.title.length > 0 && section.units.length > 0), "every source section has an ordered title and non-empty content units");

// 2) Exact source excerpts and the repaired §3 table contract.
const expectedOpening = [
  "Mastering Future Decisions & Predictions",
  "إتقان التعبير عن المستقبل — المقارنة الشاملة والتطبيق العملي 🚀",
  "المستوى: تأسيسي متقدم — IQ200",
  "في الدرس 34 تعلمنا Future Simple باستخدام WILL، وفي الدرس 35 تعلمنا BE GOING TO.",
];
ok(expectedOpening.every((line, index) => source("cover").units[index] === line), "cover preserves title/subtitle/level and the Lesson 34–35 bridge verbatim");
ok(source("s01").units.slice(1).length === 10 && source("s01").units.slice(1).every((line, index) => line.startsWith(`${["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"][index]}`)), "§1 contains all ten individually numbered objectives");
ok(source("s02").units.includes("I will buy a new computer.") && source("s02").units.includes("I'm going to buy a new computer.") && source("s02").units.includes("Then I'll buy a new computer.") && source("s02").units.includes("I'm going to buy a new computer next month."), "§2 preserves both computer forms, both contexts, and both context sentences");
ok(TABLE_HEADERS_36.join("|") === "الموقف|الصيغة النموذجية" && TABLE_ROWS_36.length === 8 && source("s03").tableRows.length === 8, "§3 repaired comparison table has the exact two headers and eight source rows");
ok(TABLE_ROWS_36.every((row, index) => row[0] === ["قرار اتُّخذ في لحظة الكلام", "خطة أو نية موجودة مسبقًا", "وعد", "عرض مساعدة لحظي", "توقع مبني على رأي أو اعتقاد", "توقع نبرز فيه دليلًا حاضرًا", "سؤال عن استعداد شخص للقيام بشيء", "سؤال عن خطة أو نية شخص"][index]), "§3 table retains every original category in order");
ok(TABLE_ROWS_36.map((row) => row[1]).join("|") === "WILL|BE GOING TO|WILL|WILL|WILL|BE GOING TO|WILL|BE GOING TO", "§3 table retains the exact intended forms");
ok(["tomorrow", "tonight", "next week", "next month", "next year", "soon", "later"].every((term) => source("s10").units.some((line) => line.includes(term))), "§10 preserves all seven supplied time expressions");
ok(source("s11").units.includes("Subject + will + V1") && source("s11").units.includes("Subject + am/is/are + going to + V1") && source("s11").units.includes("Will + Subject + V1?"), "§11 exact positive and question formulas remain source units");

const expectedReading = [
  "The Robotics Competition",
  "Maya and Daniel are preparing for a national robotics competition.",
  "They decided two months ago to build a robot that can collect plastic waste from public parks.",
  "Maya says:",
  "\"We're going to finish the main structure this weekend. Then we're going to test the sensors.\"",
  "Daniel looks at the robot.",
  "\"Oh no! One of the wheels is loose.\"",
  "Maya replies:",
  "\"I'll fix it.\"",
  "Daniel examines the battery.",
  "\"Look at the battery indicator! It's almost empty. The robot is going to stop working.\"",
  "Maya says:",
  "\"You're right. I'll connect the charger.\"",
  "Their teacher enters the laboratory.",
  "\"Do you think your robot will win the competition?\"",
  "Daniel smiles.",
  "\"I think it will perform very well, but we still need more practice.\"",
  "The teacher says:",
  "\"I'm sure you'll learn a lot from this experience.\"",
];
ok(M.PRACTICE.READING_PASSAGE_36.slice(1).join("\n") === expectedReading.join("\n"), "§21 complete Robotics Competition passage and punctuation match the supplied source exactly");
ok(READING_QUESTIONS_36.length === 7 && READING_ANSWERS_36.length === 7 && READING_ANALYSIS_36.length === 8, "§21 has seven comprehension questions, seven answers, and eight grammar-analysis items");
ok(DETECTIVE_ITEMS_36.length === 10 && DETECTIVE_ITEMS_36.every((item, index) => item.n === index + 1 && item.prompt === source("s17").units[index + 1] && item.answers.length > 0), "§17 all ten original errors have a prompt and at least one accepted correction");
ok(EXERCISE18_ITEMS_36.length === 8 && EXERCISE18_ITEMS_36.every((item, index) => item.n === index + 1 && item.answer && item.explanation), "§18 all eight guided questions have a source answer and explanation");
ok(DIALOGUE19_ITEMS_36.length === 4 && DIALOGUE19_ITEMS_36.every((item, index) => item.n === index + 1 && item.answer && item.explanation), "§19 all four dialogue blanks have answers and explanations");
ok(WRITING_CRITERIA_36.length === 8 && WRITING_MODEL_36.length === 4 && source("s24").units[1].includes("12 إلى 15"), "§24 preserves the 12–15 sentence task, eight criteria, and four model lines");
ok(source("s25").units.includes("Subject + will + V1") && source("s25").units.includes("Subject + am/is/are + going to + V1") && source("s25").units.at(-1).includes("الفرق بين حفظ القاعدة"), "§25 golden summary contains both formulas and its concluding learning principle");
ok(source("s26").units.some((line) => line.includes("Present Perfect Continuous")) && source("s26").units.some((line) => line.includes("Past Perfect Continuous")) && source("s26").units.includes("⑨ Future Simple — WILL: مكتمل.") && source("s26").units.includes("الدرس 37: Future Continuous — المستقبل المستمر") && source("s26").units.includes("At 8:00 tomorrow, I will be studying.") && source("s26").units.at(-1).includes("المستوى التالي"), "§26 preserves the curriculum systems, completion status, exact Lesson 37 preview, and transition");

// 3) Exactly 25 source test items; the question-type/level boundaries are unchanged.
ok(TEST_COUNT_36 === 25 && TEST_36.length === 25, `formal Test Area contains exactly 25 questions (got ${TEST_COUNT_36})`);
ok(TEST_LEVEL_COUNT_36 === 5 && TEST_LEVELS_36.length === 5 && TEST_LEVELS_36.every((level) => level.questions.length === 5), "formal test has five original levels with five questions apiece");
ok(TEST_LEVELS_36.map((level) => `${level.questions[0].n}-${level.questions.at(-1).n}`).join("|") === "1-5|6-10|11-15|16-20|21-25", "formal test keeps exact source level boundaries");
ok(TEST_LEVELS_36[0].questions.every((question) => question.type === "multiple-choice") && TEST_LEVELS_36[1].questions.every((question) => question.type === "fill") && TEST_LEVELS_36[2].questions.every((question) => question.type === "repair") && TEST_LEVELS_36[3].questions.every((question) => question.type === "explain") && TEST_LEVELS_36[4].questions.every((question) => question.type === "open"), "formal test preserves MC, fill, repair, contextual explanation, and open-ended types");
ok(TEST_LEVELS_36[0].questions.every((question) => question.options?.length === 2) && TEST_LEVELS_36[4].questions.every((question) => !question.options), "Level 1 retains its choices; Level 5 remains open-response, not multiple choice");
ok(TEST_INTRO_36.length === 2 && TEST_36.every((question, index) => question.n === index + 1 && question.promptLines.length > 0), "formal test instruction/source prompt mapping is complete and ordered");
ok(TEST_SOLUTIONS_36.length === 25 && TEST_SOLUTIONS_36.every((solution, index) => solution.n === index + 1 && solution.sourceStatus === "platform-authored-teacher-addition"), "25 detailed solutions exist and are explicitly platform-authored, not source answers");
ok(TEST_SOLUTIONS_36.filter((solution) => solution.n >= 21).every((solution) => solution.judgment === "open-model" && solution.alternatives?.length), "all five open-ended test solutions provide models and acceptable alternatives");
ok(TEST_SOLUTIONS_36.filter((solution) => [1, 2, 3, 4, 5, 8, 9, 10, 13, 14, 15, 16, 17, 18, 19, 20].includes(solution.n)).every((solution) => solution.explanation.length > 30), "context-sensitive solutions include substantive reasoning and note overlap/alternatives");

// 4) Every source step renders; student/test/solutions/teacher remain distinct.
const initialStepHtml = new Map();
for (const slide of SLIDES_36) {
  const html = renderStep(slide);
  initialStepHtml.set(slide.id, html);
  ok(html.includes(`data-step-id="${slide.id}"`) && html.includes(`data-source-id="${slide.id}"`), `${slide.id}: renders as a native, traceable step`);
  if (slide.id !== "s22") ok(html.includes(`data-source-section="${slide.id}"`), `${slide.id}: its source section is identifiable in Student Area`);
}
const testPreHtml = M.renderToString(M.React.createElement(M.TestArea36, { onSubmitted() {}, onGoSolutions() {} }));
ok((testPreHtml.match(/data-test-question="\d+"/g) || []).length === 25, "pre-submit Test Area renders 25, and only 25, numbered question panels");
ok((testPreHtml.match(/data-source-unit="s22-unit-\d+"/g) || []).length === source("s22").units.length, "every source unit in §22 is traced to the Test Area output");
ok(!testPreHtml.includes("data-solution=") && !testPreHtml.includes("data-test-feedback="), "before submit there is no solution panel or correctness feedback in the Test Area");
ok(!readFileSync(join(root, "src/lessons/lesson36/TestArea36.tsx"), "utf8").includes("solutionsData36"), "formal test component does not import the formal answer key");
ok(readFileSync(join(root, "src/lessons/lesson36/Lesson36.tsx"), "utf8").includes("testSubmitted || teacherUnlocked") && readFileSync(join(root, "src/lessons/lesson36/Lesson36.tsx"), "utf8").includes("lazy(() => import(\"./SolutionsArea36\"))"), "Solutions Area is dynamically loaded only after submission or teacher unlock");
ok(readFileSync(join(root, "src/lessons/lesson36/TeacherArea36.tsx"), "utf8").includes("lazy(() => import(\"./TeacherGuide36\"))"), "teacher answer/coverage chunk is deferred until teacher unlock");

// §3 is a real accessible table; English forms are isolated LTR.
const tableHtml = initialStepHtml.get("s03");
ok((tableHtml.match(/<tr/g) || []).length === 9 && (tableHtml.match(/scope="col"/g) || []).length === 2 && (tableHtml.match(/scope="row"/g) || []).length === 8, "§3 renders an accessible table with two column headers and eight row headers");
ok(tableHtml.includes("dir=\"ltr\"") && tableHtml.includes("WILL") && tableHtml.includes("BE GOING TO"), "§3 table isolates the English forms LTR");
const formulasHtml = initialStepHtml.get("s11");
ok(formulasHtml.includes("Subject + will + V1") && formulasHtml.includes("Subject + am/is/are + going to + V1") && formulasHtml.includes("dir=\"ltr\""), "§11 formulas render in English LTR order");

// 5) Try the context-first labs; answer lines appear only after each activity attempt.
const contextIds = ["s02", "s04", "s05", "s07", "s14", "s15", "s16"];
const postInteractionTexts = new Map();
for (const id of contextIds) {
  const { el, root: reactRoot } = mountStep(id);
  await tick();
  const activityCard = [...el.querySelectorAll("section")].find((node) => node.textContent.includes("نشاط تفاعلي من إعداد المنصة"));
  ok(!!activityCard, `${id}: context activity is rendered and labeled as platform interaction`);
  const fieldsets = [...activityCard.querySelectorAll("fieldset")];
  for (const fieldset of fieldsets) {
    const radio = fieldset.querySelector('input[type="radio"]');
    click(radio);
    await tick(5);
    click(findButton(fieldset, "تحقق من اختياري"));
    await tick(5);
  }
  const text = normalize(el.textContent);
  postInteractionTexts.set(id, text);
  ok(fieldsets.length === M.PRACTICE.CONTEXT_LABS_36[id].length && text.includes("اختيار مناسب للسياق") || fieldsets.length === M.PRACTICE.CONTEXT_LABS_36[id].length && text.includes("أقل ملاءمة"), `${id}: each context prompt can be answered and receives post-attempt feedback`);
  const hiddenIndexes = {
    s02: [3, 5, 6, 7, 8, 12, 13, 14, 18, 19, 20, 21, 22],
    s04: [4, 5, 10, 12, 18, 19, 20, 22, 23],
    s05: [3, 5, 9, 11, 15, 18, 19],
    s07: [0, 1, 5, 9, 10, 11, 12, 13, 14, 15],
    s14: [21, 22, 23, 24, 25, 26],
    s15: [4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18],
    s16: [3, 4, 7, 8, 11, 12, 15, 16],
  }[id];
  ok(hiddenIndexes.every((index) => text.includes(source(id).units[index])), `${id}: source lines withheld before the attempt appear after the activity`);
  reactRoot.unmount();
  el.remove();
}

// 6) Error repair, eight guided items, Sara/Adam blanks, reading, and writing workspace.
{
  const { el, root: reactRoot } = mountStep("s17");
  await tick();
  ok(!normalize(el.textContent).includes(source("s17").revealUnits[1]), "Grammar Detective source key is hidden before an attempt");
  for (const item of DETECTIVE_ITEMS_36) {
    const card = el.querySelector(`[data-practice-item="detective-${item.n}"]`);
    const field = card.querySelector("input[type=text]");
    setNative(field, "My correction");
    click(findButton(card, "اعرض التصحيح المقبول"));
    await tick(3);
  }
  ok(el.querySelectorAll("[data-practice-item^='detective-']").length === 10, "Grammar Detective renders all ten repair items");
  const detectiveText = normalize(el.textContent);
  ok(source("s17").revealUnits.every((line) => detectiveText.includes(line)), "after attempts, all ten correction answers, alternatives, and glass explanation appear");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s18");
  await tick();
  ok(!normalize(el.textContent).includes(source("s18").revealUnits[1]), "eight-item practice key is hidden before attempts");
  for (const item of EXERCISE18_ITEMS_36) {
    const card = el.querySelector(`[data-practice-item="choose-${item.n}"]`);
    click(card.querySelector('input[type="radio"]'));
    await tick(3);
    click(findButton(card, "تحقق من الاختيار"));
    await tick(3);
  }
  ok(el.querySelectorAll("[data-practice-item^='choose-']").length === 8, "choose-the-form practice has exactly eight contexts");
  ok(source("s18").revealUnits.every((line) => normalize(el.textContent).includes(line)), "after attempts, all eight source answers and explanations are available");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s19");
  await tick();
  ok(!normalize(el.textContent).includes(source("s19").revealUnits[1]), "Sara/Adam answer key is hidden before the four responses");
  const fields = [...el.querySelectorAll("[data-step-id='s19'] input[type=text]")];
  fields.forEach((field, index) => setNative(field, ["I'm going to visit", "I'll remind", "will give", "will add"][index]));
  await tick(5);
  click(findButton(el, "عرض مفتاح الإجابة والتفسيرات"));
  await tick(5);
  ok(fields.length === 4 && source("s19").revealUnits.every((line) => normalize(el.textContent).includes(line)), "all four dialogue blanks unlock the complete answer key and evidence/WILL explanation");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s21");
  await tick();
  ok(!normalize(el.textContent).includes(source("s21").revealUnits[1]), "reading answers are hidden before comprehension attempt");
  ok(el.querySelectorAll("[data-source-section='s21'] [data-source-unit^='s21-unit-']").length >= source("s21").units.length, "complete passage and all seven question source units render");
  const fields = [...el.querySelectorAll("textarea")];
  fields.forEach((field) => setNative(field, "Student response"));
  await tick(5);
  click(findButton(el, "عرض إجابات الفهم والتحليل النحوي"));
  await tick(5);
  ok(fields.length === 7 && source("s21").revealUnits.every((line) => normalize(el.textContent).includes(line)), "after seven responses, all seven reading answers and eight grammar analyses appear");
  const highlight = el.querySelector('input[type="checkbox"]');
  click(highlight);
  await tick(5);
  ok(!!el.querySelector("mark"), "optional future-form reading highlight is operable and does not hide the passage");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s20");
  await tick();
  const fields = [...el.querySelectorAll("textarea")];
  fields.forEach((field, index) => setNative(field, index === 0 ? "A: Nobody prepared dinner. B: I'll prepare dinner." : "A: What is your plan? B: I'm going to prepare dinner."));
  await tick(5);
  click(findButton(el, "عرض النموذج الأصلي بعد المحاولة"));
  await tick(5);
  ok(fields.length === 2 && source("s20").units.slice(3, 6).every((line) => normalize(el.textContent).includes(line)) && source("s20").units.slice(9, 12).every((line) => normalize(el.textContent).includes(line)), "context-writing workspace reveals both original model contexts only after the learner writes");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s24");
  await tick();
  const writing = el.querySelector('textarea[lang="en"]');
  setNative(writing, Array.from({ length: 12 }, (_, index) => `Sentence ${index + 1}.`).join(" "));
  await tick(5);
  ok(normalize(el.textContent).includes("12 / المطلوب 12–15") && el.querySelectorAll('input[type="checkbox"]').length === 8, "writing workspace counts sentences and provides the original eight-item self-review checklist");
  ok(normalize(el.textContent).includes("لا يصدر النظام حكمًا آليًا"), "writing workspace does not claim objective automatic grading");
  reactRoot.unmount(); el.remove();
}

// 7) Formal test: neutral before submit, exactly 25, no feedback; separate key after submit.
{
  let submitted = false;
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.TestArea36, { onSubmitted() { submitted = true; }, onGoSolutions() {} }));
  await tick();
  const testRoot = el.querySelector('[data-area="lesson36-test"]');
  ok(testRoot.querySelectorAll("[data-test-question]").length === 25 && testRoot.querySelectorAll("fieldset[data-test-question]").length === 25, "formal assessment renders exactly 25 fieldset questions");
  ok(testRoot.querySelectorAll("[data-test-feedback]").length === 0 && !testRoot.querySelector("[data-solution]"), "no correctness/score feedback or answer panel is visible before submission");
  const inputs = [...testRoot.querySelectorAll("[data-test-question]")];
  for (const card of inputs) {
    const radio = card.querySelector('input[type="radio"]');
    if (radio) click(radio);
    else {
      const field = card.querySelector("input[type=text], textarea");
      setNative(field, "Student response for question " + card.getAttribute("data-test-question"));
    }
  }
  await tick(10);
  const submit = findButton(testRoot, "إرسال الاختبار");
  ok(inputs.length === 25 && submit && !submit.disabled, "all 25 answers enable submission without revealing any result");
  ok(testRoot.querySelectorAll("[data-test-feedback]").length === 0, "fully answered but unsubmitted test remains neutral");
  click(submit);
  await tick(10);
  ok(submitted && testRoot.querySelectorAll("[data-test-feedback]").length === 0 && !testRoot.querySelector("[data-solution]"), "submission records completion but still gives no immediate correctness/score feedback");
  ok(testRoot.textContent.includes("لا يوجد تصحيح فوري"), "post-submit test state points to separate solutions rather than embedding a key");
  reactRoot.unmount(); el.remove();
}
{
  const locked = M.renderToString(M.React.createElement(M.SolutionsArea36, { unlocked: false, onGoTest() {}, onGoTeacher() {} }));
  ok(locked.includes("data-solutions-locked") && !locked.includes("data-solution="), "Solutions Area remains blank/locked without submission or teacher access");
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.SolutionsArea36, { unlocked: true, onGoTest() {}, onGoTeacher() {} }));
  await tick();
  const allSolutionNumbers = new Set();
  for (const tab of el.querySelectorAll('nav[aria-label="مستويات حلول اختبار الدرس 36"] button')) {
    click(tab);
    await tick(3);
    for (const card of el.querySelectorAll("[data-solution]")) allSolutionNumbers.add(Number(card.getAttribute("data-solution")));
  }
  ok(allSolutionNumbers.size === 25 && [...allSolutionNumbers].sort((a, b) => a - b).every((n, index) => n === index + 1), "after unlock, Solutions Area exposes all 25 detailed solutions across its five level tabs");
  ok(el.textContent.includes("إضافات تعليمية من إعداد المنصة") && el.textContent.includes("بدائل مقبولة"), "Solutions Area labels teacher-authored content and contextual alternatives");
  reactRoot.unmount(); el.remove();
}

// 8) Teacher gate, navigable areas, and complete source-to-step documentary ledger.
{
  const lockedTeacher = M.renderToString(M.React.createElement(M.TeacherArea36, { unlocked: false, onUnlockChange() {}, onGoSolutions() {} }));
  ok(lockedTeacher.includes('type="password"') && !lockedTeacher.includes("data-teacher-solution"), "Teacher Area starts gated and does not render formal answer explanations");
  const { el: shell, root: shellRoot } = M.mount(M.React.createElement(M.Lesson36, { onExit() {} }));
  await tick();
  ok(!!shell.querySelector('[data-lesson="36"] [data-area="lesson36-student"]'), "integrated Lesson 36 shell starts in the Student Area");
  const mobileToggle = findButton(shell, "محتويات الدرس");
  const mobilePanel = shell.querySelector("#lesson36-mobile-nav");
  ok(mobileToggle?.getAttribute("aria-expanded") === "false" && mobileToggle?.getAttribute("aria-controls") === "lesson36-mobile-nav" && mobilePanel?.hidden, "mobile navigation exposes a controlled, initially collapsed panel");
  click(mobileToggle);
  await tick();
  ok(mobileToggle?.getAttribute("aria-expanded") === "true" && mobilePanel && !mobilePanel.hidden, "mobile navigation opens through a touch/keyboard button");
  click(mobileToggle);
  await tick();
  ok(mobileToggle?.getAttribute("aria-expanded") === "false" && mobilePanel?.hidden, "mobile navigation closes and updates aria-expanded");
  const leftKey = new win.KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true });
  M.act(() => document.body.dispatchEvent(leftKey));
  await tick();
  ok(!!shell.querySelector('[data-area="lesson36-student"] [data-step-id="s01"]'), "Student Area supports keyboard next-step navigation");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })));
  await tick();
  ok(!!shell.querySelector('[data-area="lesson36-student"] [data-step-id="cover"]'), "Student Area keyboard navigation returns to the opening step");
  const solutionTab = findButton(shell, "منطقة الحلول");
  ok(solutionTab?.disabled, "Solutions Area stays locked before test submission or teacher unlock");
  click(findButton(shell, "منطقة الاختبار"));
  await tick();
  const shellTest = shell.querySelector('[data-area="lesson36-test"]');
  const shellQuestions = [...shellTest.querySelectorAll("[data-test-question]")];
  for (const card of shellQuestions) {
    const radio = card.querySelector('input[type="radio"]');
    if (radio) click(radio);
    else setNative(card.querySelector("input[type=text], textarea"), `response ${card.getAttribute("data-test-question")}`);
  }
  await tick(10);
  click(findButton(shellTest, "إرسال الاختبار"));
  await tick(10);
  ok(shellQuestions.length === 25 && !findButton(shell, "منطقة الحلول")?.disabled, "submitting the integrated 25-question test unlocks Solutions Area");
  click(findButton(shell, "منطقة الحلول"));
  await M.act(async () => { await tick(80); });
  ok(shell.querySelectorAll('[data-area="lesson36-solutions"] [data-solution]').length === 5, "integrated Solutions Area lazy-loads the first gated level after submission");
  click(findButton(shell, "منطقة المعلم"));
  await tick();
  const teacherForm = shell.querySelector('form[data-area="lesson36-teacher"]');
  const passwordField = teacherForm?.querySelector('input[type="password"]');
  setNative(passwordField, "wrong-password");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!teacherForm.querySelector('[role="alert"]'), "Teacher Area reports an accessible error for an incorrect password");
  setNative(passwordField, "somer173");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await M.act(async () => { await tick(100); });
  ok(!!shell.querySelector('[data-area="lesson36-teacher"] nav[aria-label="أقسام دليل المعلم"]'), "valid teacher unlock loads the separate, navigable Teacher Area");
  shellRoot.unmount(); shell.remove();
  const { el: guideRoot, root: guideReactRoot } = M.mount(M.React.createElement(M.TeacherGuide36, { onGoSolutions() {}, onLock() {} }));
  await tick();
  click(findButton(guideRoot, "خريطة التغطية"));
  await tick();
  ok(guideRoot.querySelectorAll("[data-coverage-section]").length === 26, "teacher coverage tab is structured across all 26 numbered sections");
  click(findButton(guideRoot, "حلول الاختبار"));
  await tick();
  ok(guideRoot.querySelectorAll("[data-teacher-solution]").length === 25, "teacher guide contains 25 detailed, separately labeled test answers");
  click(findButton(guideRoot, "مفاتيح التدريب والقراءة"));
  await tick();
  ok(guideRoot.textContent.includes("توقع منفي") && guideRoot.textContent.includes("التحليل النحوي"), "teacher guidance includes guided/dialogue explanations and reading analysis");
  guideReactRoot.unmount(); guideRoot.remove();
  const appText = readFileSync(join(root, "src/App.tsx"), "utf8");
  ok(appText.includes('import Lesson36 from "./lessons/lesson36/Lesson36"') && appText.includes('href: "#/lesson/36"') && appText.includes("route === 36"), "App.tsx registers Lesson 36 as a hub card and first-class route");
  const docs = readFileSync(join(root, "docs/lesson36-coverage.md"), "utf8");
  ok((docs.match(/^\| §\d+/gm) || []).length === 26, "coverage ledger documents all 26 numbered source sections");
  ok(docs.includes("Table reconstruction contract") && docs.includes("Test and answer provenance contract"), "coverage ledger records malformed-table repair and missing-source-key provenance");
}

// 9) English-direction conventions and high-contrast color pairs used by Lesson 36.
const directionSources = [
  readFileSync(join(root, "src/lessons/lesson36/kit36.tsx"), "utf8"),
  readFileSync(join(root, "src/lessons/lesson36/TestArea36.tsx"), "utf8"),
  readFileSync(join(root, "src/lessons/lesson36/Steps36.tsx"), "utf8"),
  readFileSync(join(root, "src/lessons/lesson36/Lesson36.tsx"), "utf8"),
].join("\n");
ok(directionSources.includes("dir={pureEnglish ? \"ltr\" : \"auto\"}") && directionSources.includes("dir=\"ltr\"") && directionSources.includes("font-en"), "Lesson 36 isolates pure English/formulas LTR and keeps mixed runs direction-aware");
ok(!/unicode-bidi\s*:\s*[^;]*override|direction\s*:\s*rtl\s*!important/i.test(directionSources), "Lesson 36 does not add blanket BIDI override rules");
function channel(hex) { const value = parseInt(hex, 16) / 255; return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4; }
function luminance(hex) { const clean = hex.replace("#", ""); return 0.2126 * channel(clean.slice(0, 2)) + 0.7152 * channel(clean.slice(2, 4)) + 0.0722 * channel(clean.slice(4, 6)); }
function contrast(fg, bg) { const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a); return (values[0] + 0.05) / (values[1] + 0.05); }
const contrastPairs = [
  ["#24343b", "#ffffff", "main text on white"], ["#24343b", "#fffdf8", "main text on warm surface"],
  ["#24343b", "#f5f3ed", "main text on lesson background"], ["#24343b", "#fbfaf6", "main text on nested surface"],
  ["#24343b", "#eef4f0", "main text on selected surface"], ["#24343b", "#edf5ee", "main text on feedback surface"],
  ["#43575a", "#ffffff", "secondary text on white"], ["#43575a", "#fffdf8", "secondary text on warm surface"],
  ["#43575a", "#f3f5f2", "secondary text on neutral surface"], ["#43575a", "#fbfaf6", "secondary text on warm card"],
  ["#53676a", "#ffffff", "muted text on white"], ["#53676a", "#f7faf8", "muted text on pale green"],
  ["#17354a", "#ffffff", "navy text on white"], ["#17354a", "#fffdf8", "navy text on warm white"],
  ["#28533b", "#edf5ee", "success text on feedback surface"], ["#76531e", "#fbf6eb", "amber text on callout"],
  ["#18333b", "#fbfdfc", "English text on reading surface"], ["#8d3832", "#ffffff", "teacher validation error on white"],
  ["#ffffff", "#17354a", "white on navy header"], ["#ffffff", "#245f62", "white on primary button"],
  ["#f0ddb6", "#17354a", "pale accent on navy header"], ["#596965", "#f5f5f2", "disabled button text"], ["#596965", "#ece9e1", "disabled primary-button text"],
  ["#17354a", "#ffffff", "focus ring on white"], ["#24343b", "#f4e8c3", "highlighted reading text"],
];
const contrastFailures = contrastPairs.filter(([fg, bg]) => contrast(fg, bg) < 4.5);
ok(contrastFailures.length === 0, `audited text/background palette pairs meet WCAG AA 4.5:1 (${contrastFailures.map(([fg, bg, label]) => `${label} ${contrast(fg, bg).toFixed(2)}:1`).join(", ")})`);
ok(contrast("#17354a", "#ffffff") >= 3 && contrast("#17354a", "#fffdf8") >= 3, "focus indicator contrast is at least 3:1 against both light surfaces");

// 10) Source-to-area assertions and output summary.
const lessonSource = readFileSync(join(root, "src/lessons/lesson36/Lesson36.tsx"), "utf8");
ok(lessonSource.includes('data-area="lesson36-student"') && lessonSource.includes("<TestArea36") && lessonSource.includes("SolutionsArea36") && lessonSource.includes("<TeacherArea36"), "Student, Test, Solutions, and Teacher areas are wired as distinct shell surfaces");
ok(existsSync(join(root, "src/lessons/lesson36/ledger36.ts")) && existsSync(join(root, "src/lessons/lesson36/solutionsData36.ts")) && existsSync(join(root, "scripts/audit-lesson36.mjs")), "Lesson 36 source ledger, separate solution data, and audit script exist");

rmSync(outDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`✕ Lesson 36 audit failed: ${failures.length} of ${assertions} assertions failed`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 36 audit passed: ${assertions} assertions; 26 numbered source sections + opening; 25 questions in five levels; 25 separate solutions; guided practice/reading/writing interactions; source/route/direction/contrast contracts.`);
