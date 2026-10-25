// ============================================================
// Lesson 35 — Future Garden Studio audit
//
// Verifies, against the real rendered lesson (jsdom):
//   1. the 39-entry source ledger (cover + §1–§38) and 61-step map;
//   2. every long source unit is present in the rendered student lesson;
//   3. all supplied exercise keys (8 + 8 + 6 + 8), reading keys and
//      Final Boss requirements/model;
//   4. the 25-question / five-level test is neutral before submit,
//      graded after submit, and its solutions stay gated;
//   5. submitted test state survives tab navigation;
//   6. the teacher area is password-gated and contains the complete
//      25-question key, exercise keys, reading key and shared FinalTest key;
//   7. the site-lock and Previous/Next controls coexist in one nav;
//   8. no Knowledge Card (or renamed equivalent) exists;
//   9. the route renders and English stays LTR-isolated.
//
// Run: npm run audit:lesson35
// ============================================================
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "node_modules", ".lesson35-audit");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `audit-${process.pid}.mjs`);

const failures = [];
let checks = 0;
const ok = (condition, message) => {
  checks++;
  if (!condition) failures.push(message);
};

const { JSDOM } = await import("jsdom");
const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
const win = dom.window;
for (const key of [
  "window", "document", "navigator", "Element", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement",
  "HTMLSelectElement", "HTMLButtonElement", "Event", "MouseEvent", "KeyboardEvent", "Node", "getComputedStyle",
  "CSS", "MutationObserver", "HashChangeEvent", "requestAnimationFrame", "cancelAnimationFrame", "SVGElement",
  "DocumentFragment", "Text", "Comment", "DOMParser",
]) {
  if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
}
if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};
if (!win.Element.prototype.scrollIntoView) win.Element.prototype.scrollIntoView = () => {};
win.scrollTo = () => {};
win.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
globalThis.IS_REACT_ACT_ENVIRONMENT = false;

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React from "react";
import { createRoot } from "react-dom/client";
import App from ${JSON.stringify(join(root, "src/App.tsx"))};
import Lesson35 from ${JSON.stringify(join(root, "src/lessons/lesson35/Lesson35.tsx"))};
import { SOURCE_SECTIONS_35 } from ${JSON.stringify(join(root, "src/lessons/lesson35/ledger35.ts"))};
import * as DATA from ${JSON.stringify(join(root, "src/lessons/lesson35/data.ts"))};
import * as PRACTICE from ${JSON.stringify(join(root, "src/lessons/lesson35/practiceData.ts"))};
import * as TEST from ${JSON.stringify(join(root, "src/lessons/lesson35/testData.ts"))};
import * as TEST_KEY from ${JSON.stringify(join(root, "src/lessons/lesson35/testKey35.ts"))};
import { FINAL_TESTS } from ${JSON.stringify(join(root, "src/shared/finalTestBank.ts"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); const root = createRoot(el); root.render(node); return { el, root }; }
export { React, createRoot, App, Lesson35, SOURCE_SECTIONS_35, DATA, PRACTICE, TEST, TEST_KEY, FINAL_TESTS, mount };
`,
    resolveDir: root,
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outdir: outDir,
  entryNames: "audit-[hash]",
  chunkNames: "chunks/[name]-[hash]",
  splitting: true,
  jsx: "automatic",
  packages: "external",
  loader: { ".woff2": "empty" },
  logLevel: "silent",
});
const entryFile = readdirSync(outDir).filter((name) => /^audit-.*\.js$/.test(name)).sort().at(-1);
if (!entryFile) throw new Error("Lesson 35 audit bundle entry was not generated");
const M = await import(pathToFileURL(join(outDir, entryFile)).href);

const { SOURCE_SECTIONS_35 } = M;
const { SLIDES_35, SLIDE_COUNT_35, STAGES_35 } = M.DATA;
const tick = (ms = 15) => new Promise((resolve) => setTimeout(resolve, ms));
const click = (element) => element?.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
const setNative = (element, value) => {
  const proto = element.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : element.tagName === "SELECT" ? win.HTMLSelectElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value);
  element.dispatchEvent(new win.Event(element.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
};
const plain = (text) => (text || "").replace(/[\u200e\u200f\u202a-\u202e\u00a0]/g, " ").replace(/\s+/g, " ").trim();
const loose = (text) => plain(text).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const sourceFor = (id) => SOURCE_SECTIONS_35.find((section) => section.id === id);

// ---------------------------------------------------------------- 1) ledger + step map
ok(SOURCE_SECTIONS_35.length === 39, `source ledger keeps cover + 38 sections (got ${SOURCE_SECTIONS_35.length})`);
ok(new Set(SOURCE_SECTIONS_35.map((section) => section.id)).size === 39, "source ledger ids are unique");
ok(SOURCE_SECTIONS_35.every((section, index) => section.order === index && section.units.length > 0), "source ledger is ordered and non-empty");

ok(SLIDE_COUNT_35 === 61 && SLIDES_35.length === 61, `lesson has 61 short steps (got ${SLIDE_COUNT_35})`);
ok(new Set(SLIDES_35.map((step) => step.id)).size === SLIDE_COUNT_35, "step ids are unique");
ok(SLIDES_35.every((step) => STAGES_35.some((stage) => stage.id === step.stage)), "every step belongs to a declared stage");
ok(STAGES_35.length === 5, "five learning stages");
ok(STAGES_35.every((stage) => SLIDES_35.some((step) => step.stage === stage.id)), "no empty stage");
ok(SLIDES_35.every((step) => step.sources.every((id) => !!sourceFor(id))), "every step cites existing ledger sections");
ok(SLIDES_35.every((step) => step.title && step.title.length > 3), "every step has a meaningful title");

const referenced = new Set(SLIDES_35.flatMap((step) => step.sources));
for (const section of SOURCE_SECTIONS_35) {
  if (section.id === "s35") continue; // teacher-only heading, asserted in the teacher area
  ok(referenced.has(section.id), `source section ${section.id} is mapped to at least one student step`);
}
ok(referenced.has("s34"), "the 25-question test section is mapped to the test bridge");
ok(!referenced.has("s35"), "§35 stays out of the student steps");

// ---------------------------------------------------------------- 2) supplied exercise keys
const detective = M.PRACTICE.DETECTIVE_ITEMS_35;
const auxiliary = M.PRACTICE.AUXILIARY_ITEMS_35;
const transforms = M.PRACTICE.TRANSFORMATION_ITEMS_35;
const decisions = M.PRACTICE.DECISION_PRACTICE_ITEMS_35;
ok(detective.length === 8, "Grammar Detective keeps 8 items");
ok(auxiliary.length === 8, "am/is/are drill keeps 8 items");
ok(transforms.length === 6, "GOING TO transformation drill keeps 6 items");
ok(decisions.length === 8, "WILL/GOING TO situations keep 8 items");
ok(detective.every((item, index) => item.prompt === sourceFor("s28").units[index + 1] && item.answer === sourceFor("s28").revealUnits[index + 1]), "Detective prompts + source keys are verbatim and aligned");
ok(auxiliary.every((item, index) => item.prompt === sourceFor("s29").units[index + 1] && item.answer === sourceFor("s29").revealUnits[index + 1]), "auxiliary prompts + source keys are verbatim and aligned");
ok(transforms.every((item, index) => item.prompt === sourceFor("s30").units[index + 1] && item.answer === sourceFor("s30").revealUnits[index + 1]), "transformation prompts + source keys are verbatim and aligned");
ok(decisions.every((item, index) => item.answer === sourceFor("s31").revealUnits[1 + index * 2] && item.explanation === sourceFor("s31").revealUnits[2 + index * 2]), "all eight situation answers and source explanations are preserved");
ok(M.PRACTICE.READING_QUESTIONS_35.length === 7 && M.PRACTICE.READING_ANSWERS_35.length === 7, "reading keeps 7 questions and 7 answers");
ok(M.PRACTICE.READING_ANALYSIS_35.length === 5, "reading keeps all 5 grammar-analysis lines");
ok(M.PRACTICE.FINAL_BOSS_REQUIREMENTS_35.length === 8, "Final Boss keeps all 8 requirements");
ok(M.PRACTICE.FINAL_BOSS_REQUIREMENTS_35.every((line, index) => line === sourceFor("s36").units[4 + index]), "Final Boss requirements are verbatim");
ok(M.PRACTICE.FINAL_BOSS_MODEL_35.length === 4 && M.PRACTICE.FINAL_BOSS_MODEL_35.join("|") === sourceFor("s36").units.slice(13, 17).join("|"), "Final Boss model paragraph is complete");

// ---------------------------------------------------------------- 3) the 25-question test
ok(M.TEST.TEST_35_COUNT === 25 && M.TEST.TEST_35.length === 25, "test has exactly 25 questions");
ok(M.TEST.TEST_LEVEL_COUNT_35 === 5 && M.TEST.TEST_LEVELS_35.every((level) => level.questions.length === 5), "test has five levels of five questions");
ok(M.TEST.TEST_35.every((question, index) => question.n === index + 1), "test questions are numbered 1–25 in order");
ok(M.TEST.TEST_LEVELS_35.map((level) => level.title).join("|") === [2, 23, 29, 36, 43].map((index) => sourceFor("s34").units[index]).join("|"), "all five level titles match the supplied source");
ok(M.TEST_KEY.TEST_35.every((question) => question.why && question.why.length > 20 && question.concept && question.trap), "every question has an explanation, concept and trap");
ok(M.TEST_KEY.TEST_35.filter((question) => question.type === "write").every((question) => question.patterns.length >= 2 && question.modelAnswers.length >= 1), "production questions have model answers and structural checks");
ok(M.TEST_KEY.TEST_SOLUTIONS_35.length === 25 && M.TEST_KEY.TEST_SOLUTIONS_35.every((solution) => solution.sourceStatus === "platform-derived"), "25 solutions are labelled platform-derived");
const studentTestSource = readFileSync(join(root, "src/lessons/lesson35/testData.ts"), "utf8");
ok(!/correctText|modelAnswers|TEST_SOLUTIONS_35|\"answer\"\s*:/m.test(studentTestSource), "student question data contains no final-test answers, models, or solution objects");
const lesson35Source = readFileSync(join(root, "src/lessons/lesson35/Lesson35.tsx"), "utf8");
ok(lesson35Source.includes('lazy(() => import("./TestArea35"))') && lesson35Source.includes('lazy(() => import("./SolutionsArea35"))') && lesson35Source.includes('lazy(() => import("./TeacherArea35"))'), "assessment/teacher surfaces are route-deferred instead of preloaded in the Lesson 35 shell");
const testAreaSrc = readFileSync(join(root, "src/lessons/lesson35/TestArea35.tsx"), "utf8");
ok(!testAreaSrc.includes("SolutionsArea35") && !testAreaSrc.includes("TEST_SOLUTIONS_35"), "test area does not import the solutions data");
const solutionsSrc = readFileSync(join(root, "src/lessons/lesson35/SolutionsArea35.tsx"), "utf8");
ok(solutionsSrc.includes("data-solution=") && solutionsSrc.includes("unlocked"), "solutions area renders keyed solutions behind its gate");

// ---------------------------------------------------------------- 4) no Knowledge Card
const lessonFiles = readdirSync(join(root, "src/lessons/lesson35"));
const allLessonSource = lessonFiles.filter((file) => /\.(tsx?|css)$/.test(file)).map((file) => readFileSync(join(root, "src/lessons/lesson35", file), "utf8")).join("\n");
ok(!/بطاقة\s*المعرفة|Knowledge\s*Card/i.test(allLessonSource), "no Knowledge Card (or Arabic equivalent) exists in Lesson 35");

// ---------------------------------------------------------------- 5) mounted lesson walk + rendered-text coverage
const mounted = M.mount(M.React.createElement(M.Lesson35, { onExit() {} }));
const host = mounted.el;
await tick(60);
const stepRoot = () => host.querySelector("[data-step-id]");
const nextButton = () => [...host.querySelectorAll("button")].find((button) => (button.textContent || "").trim() === "التالي ←");
const prevButton = () => [...host.querySelectorAll("button")].find((button) => (button.textContent || "").trim() === "→ السابق");

ok(stepRoot()?.getAttribute("data-step-id") === "cover", "lesson opens on the cover step");
ok(prevButton()?.disabled === true, "Previous is disabled on the first step");
const locks = host.querySelectorAll("[data-site-lock-button='true']");
ok(locks.length === 1, `exactly one site-lock button is rendered (got ${locks.length})`);
ok(!!locks[0]?.closest("[data-lesson-step-nav='true']"), "the site-lock button lives inside the shared step navigation");
ok(locks[0]?.closest("[data-lesson-step-nav='true']")?.contains(nextButton()), "Next and the site lock share one normal-flow navigation host");

const lessonTexts = {};
const allStudentText = [];
let renderedSteps = 0;
for (let i = 0; i < SLIDE_COUNT_35; i++) {
  const current = stepRoot();
  ok(!!current, `step ${i + 1} renders a step container`);
  if (!current) break;
  const expected = SLIDES_35[i];
  ok(current.getAttribute("data-step-id") === expected.id, `step ${i + 1} renders ${expected.id}`);
  const panelText = plain(host.querySelector('[data-area="l35-lesson"]')?.textContent || "");
  lessonTexts[expected.id] = panelText;
  allStudentText.push(panelText);
  renderedSteps++;
  if (i < SLIDE_COUNT_35 - 1) {
    const next = nextButton();
    if (!next) {
      ok(false, `Next button is missing at step ${i + 1}`);
      break;
    }
    click(next);
    await tick(6);
  }
}
ok(renderedSteps === SLIDE_COUNT_35, `all 61 steps are reachable with Next (rendered ${renderedSteps})`);
ok(host.querySelectorAll('[data-final-test="35"]').length === 1, "the shared 15-question FinalTest mounts once on the final step");
ok(Array.isArray(M.FINAL_TESTS[35]) && M.FINAL_TESTS[35].length === 15, "shared course bank still has its 15-question Lesson 35 entry");

// Dialogue turns keep the speaker in the turn label ("Nora"/"Adam"), so the
// Arabic source line is compared without its leading speaker prefix.
const DIALOG_SPEAKER = /^(?:نورا|آدم)\s*:\s*/;
const studentCorpus = loose(allStudentText.join(" "));
const skippedCoverage = new Set(["s34", "s35"]);
let coveredUnits = 0;
let displayableUnits = 0;
for (const section of SOURCE_SECTIONS_35) {
  if (skippedCoverage.has(section.id)) continue;
  for (const unit of section.units) {
    const expectedUnit = loose(unit.replace(DIALOG_SPEAKER, ""));
    if (!expectedUnit) continue; // punctuation-only layout artifacts are not instructional units
    displayableUnits++;
    if (studentCorpus.includes(expectedUnit)) coveredUnits++;
    else ok(false, `source ${section.id} unit is not rendered in the student lesson: ${unit.slice(0, 70)}`);
  }
}
ok(coveredUnits === displayableUnits, `every displayable student source unit is rendered (${coveredUnits}/${displayableUnits})`);

// Revealed keys are checked against their dataset rather than the neutral render.
ok(sourceFor("s28").revealUnits.length === 9 && sourceFor("s29").revealUnits.length === 9 && sourceFor("s30").revealUnits.length === 7, "source keys keep their complete supplied length");
ok(sourceFor("s33").revealUnits.length === 14, "reading key + analysis keep all 14 supplied lines");

// Interactive practice: one check reveals the source key, editing re-hides it.
const goToStep = (id) => {
  const railButton = host.querySelector(`[data-step-nav="${id}"]`);
  if (railButton) click(railButton);
};
// Expand every stage group once so its step buttons exist.
for (const button of host.querySelectorAll(".fg35-group__btn")) {
  if (button.getAttribute("aria-expanded") !== "true") click(button);
}
await tick(20);
goToStep("detective-1");
await tick(20);
ok(stepRoot()?.getAttribute("data-step-id") === "detective-1", "the step rail jumps directly to Grammar Detective");
const detectiveCard = host.querySelector('[data-step-id="detective-1"] [data-practice-item="1"]');
ok(!!detectiveCard, "Detective item 1 renders");
ok(!detectiveCard.textContent.includes(sourceFor("s28").revealUnits[1]), "the source correction is hidden before the attempt");
setNative(detectiveCard.querySelector("input"), "She is going to study tonight");
click([...detectiveCard.querySelectorAll("button")].find((button) => (button.textContent || "").trim() === "تحقق"));
await tick(10);
ok(detectiveCard.textContent.includes(sourceFor("s28").revealUnits[1]), "checking reveals the verbatim source correction");
setNative(detectiveCard.querySelector("input"), "She going to study tonight");
await tick(10);
ok(!detectiveCard.textContent.includes(sourceFor("s28").revealUnits[1]), "editing a checked answer re-hides the key");

// Full interactive reveal coverage: every supplied exercise/reading key is
// checked in the actual student component after its dedicated reveal action.
const visitStep = async (id) => { goToStep(id); await tick(12); };
for (const item of detective) {
  await visitStep(item.n <= 4 ? "detective-1" : "detective-2");
  const card = host.querySelector(`[data-step-id] [data-practice-item="${item.n}"]`);
  setNative(card.querySelector("input"), item.answer);
  click([...card.querySelectorAll("button")].find((button) => (button.textContent || "").includes("تحقق")));
  await tick(5);
  ok(loose(card.textContent).includes(loose(item.answer)), `student reveal: Detective ${item.n} displays its keyed correction`);
  ok(loose(card.textContent).includes(loose("الحلول")), `student reveal: Detective ${item.n} includes the reveal heading`);
}
for (const item of auxiliary) {
  await visitStep(item.n <= 4 ? "aux-1" : "aux-2");
  const card = host.querySelector(`[data-step-id] [data-option-drill="${item.n}"]`);
  const correctOption = item.answer.replace(/^[①-⑳]\s*/, "");
  click([...card.querySelectorAll("button")].find((button) => loose(button.textContent) === loose(correctOption)));
  await tick(10);
  ok(loose(card.textContent).includes(loose(item.answer)), `student reveal: am/is/are item ${item.n} displays ${item.answer}`);
  ok(loose(card.textContent).includes(loose("الحلول")), `student reveal: am/is/are item ${item.n} includes the solution heading`);
}
for (const item of transforms) {
  await visitStep(item.n <= 3 ? "transform-1" : "transform-2");
  const card = host.querySelector(`[data-step-id] [data-practice-item="${item.n}"]`);
  setNative(card.querySelector("textarea"), item.answer);
  click([...card.querySelectorAll("button")].find((button) => (button.textContent || "").includes("تحقق")));
  await tick(5);
  ok(loose(card.textContent).includes(loose(item.answer)), `student reveal: transformation ${item.n} displays its keyed form`);
  ok(loose(card.textContent).includes(loose("الحلول")), `student reveal: transformation ${item.n} includes its source heading`);
}
for (const item of decisions) {
  await visitStep(item.n <= 4 ? "scenarios-1" : "scenarios-2");
  const card = host.querySelector(`[data-step-id] [data-scenario="${item.n}"]`);
  const target = item.answer === "won't" ? "won't" : item.answer.includes("going to") ? "be going to" : "will";
  click([...card.querySelectorAll("button")].find((button) => loose(button.textContent) === loose(target)));
  await tick(5);
  ok(loose(card.textContent).includes(loose(item.answer)), `student reveal: situation ${item.n} shows ${item.answer}`);
  ok(loose(card.textContent).includes(loose(item.explanation)), `student reveal: situation ${item.n} shows its source rationale`);
  ok(loose(card.textContent).includes(loose("الحلول المفصلة")), `student reveal: situation ${item.n} includes the detailed-solutions heading`);
}
for (const [index, answer] of M.PRACTICE.READING_ANSWERS_35.entries()) {
  await visitStep(index < 4 ? "comprehension-1" : "comprehension-2");
  const card = host.querySelector(`[data-step-id] [data-reading-q="${index + 1}"]`);
  click([...card.querySelectorAll("button")].find((button) => (button.textContent || "").includes("أظهر الإجابة")));
  await tick(5);
  ok(loose(card.textContent).includes(loose(answer)), `student reveal: reading answer ${index + 1} is displayed after its reveal button`);
  ok(loose(card.textContent).includes(loose("الحلول")), `student reveal: reading answer ${index + 1} includes the solutions heading`);
}
await visitStep("reading-analysis");
const analysisCorpus = loose(host.querySelector('[data-step-id="reading-analysis"]')?.textContent || "");
ok(analysisCorpus.includes(loose("التحليل النحوي")), "student display: reading grammar-analysis heading appears");
for (const [index, line] of M.PRACTICE.READING_ANALYSIS_35.entries()) {
  ok(analysisCorpus.includes(loose(line)), `student display: reading grammar analysis ${index + 1} is present`);
}
const revealUnitCount = ["s28", "s29", "s30", "s31", "s33"].reduce((total, id) => total + sourceFor(id).revealUnits.length, 0);
ok(revealUnitCount === 56, `all supplied revealed-answer units are catalogued (${revealUnitCount}/56)`);

// ---------------------------------------------------------------- 6) test state machine
const tab = (area) => host.querySelector(`[data-area-tab="${area}"]`);
ok(!!tab("test") && !!tab("solutions") && !!tab("teacher") && !!tab("lesson"), "the four area tabs exist");
const tabLabels = ["test", "solutions", "teacher", "lesson"].map((area) => (tab(area).textContent || "").trim());
ok(tabLabels[0].includes("منطقة الاختبار") && tabLabels[1].includes("منطقة الحلول") && tabLabels[2].includes("منطقة المعلم") && tabLabels[3] === "خطوات الدرس", "area tabs expose the expected labels");

// Solutions are locked before submission.
click(tab("solutions"));
await tick(1000);
ok((host.querySelector('[data-area="lesson35-solutions"]')?.textContent || "").includes("منطقة الحلول مقفلة"), "solutions stay locked before the test is submitted");
ok(host.querySelectorAll("[data-solution]").length === 0, "no solution is rendered while locked");

click(tab("test"));
await tick(1000);
const testRoot = () => host.querySelector('[data-area="lesson35-test"]');
ok(testRoot()?.querySelectorAll("[data-test-q]").length === 25, "the test area renders 25 question cards");
ok(testRoot()?.querySelector("[data-test-submit]")?.disabled === true, "submit is disabled before all answers exist");
ok(testRoot()?.querySelectorAll("[data-test-feedback]").length === 0, "no per-question answer or explanation before submission");
ok(host.querySelectorAll("[data-site-lock-button='true']").length === 1, "exactly one site-lock button after switching to the test tab");

for (const question of M.TEST_KEY.TEST_35) {
  const card = testRoot().querySelector(`[data-test-q="${question.n}"]`);
  if (question.type === "single") click(card.querySelectorAll('[role="radio"]')[question.answer]);
  else if (question.type === "write") setNative(card.querySelector("textarea"), question.modelAnswers[0]);
  else setNative(card.querySelector("input"), question.accept[0]);
  await tick(1);
}
await tick(20);
ok(testRoot().querySelector("[data-test-submit]")?.disabled === false, "submit enables once all 25 questions are answered");
ok(testRoot().querySelectorAll("[data-test-feedback]").length === 0, "completed-but-unsubmitted answers still show no feedback");
click(testRoot().querySelector("[data-test-submit]"));
await tick(40);
const feedback = testRoot().querySelectorAll("[data-test-feedback]");
ok(feedback.length === 25, `one submit reveals feedback for all 25 questions (got ${feedback.length})`);
ok((testRoot().textContent || "").includes("25 / 25"), "the score counts all 25 questions (20 objective + 5 structurally verified)");
click(tab("solutions"));
await tick(30);
const solutionsRoot = host.querySelector('[data-area="lesson35-solutions"]');
ok(!!solutionsRoot && solutionsRoot.querySelectorAll("[data-solution]").length === 25, "after submission the solutions area renders all 25 solutions");
ok((solutionsRoot?.textContent || "").includes("Platform-derived") || (solutionsRoot?.textContent || "").includes("حل مستنتج"), "solutions are labelled as platform-derived");
click(tab("test"));
await tick(20);
ok((testRoot().textContent || "").includes("25 / 25"), "submitted score and feedback survive navigating to solutions and back");

// ---------------------------------------------------------------- 7) teacher area
click(tab("teacher"));
await tick(1000);
const teacherRoot = () => host.querySelector('[data-area="lesson35-teacher"]');
ok(!!teacherRoot()?.querySelector('input[type="password"]'), "teacher area starts behind a password gate");
ok(teacherRoot()?.querySelectorAll("[data-teacher-solution]").length === 0, "teacher solutions are absent before unlock");
setNative(teacherRoot().querySelector('input[type="password"]'), "wrong-password");
click([...teacherRoot().querySelectorAll("button")].find((button) => (button.textContent || "").includes("دخول المعلم")));
await tick(25);
ok(!!teacherRoot().querySelector('[role="alert"]'), "a wrong teacher password is rejected");
setNative(teacherRoot().querySelector('input[type="password"]'), "somer173");
click([...teacherRoot().querySelectorAll("button")].find((button) => (button.textContent || "").includes("دخول المعلم")));
await tick(60);
ok(teacherRoot().querySelectorAll("[data-teacher-solution]").length === 25, "teacher unlock reveals all 25 detailed solutions");
ok((teacherRoot().textContent || "").includes("مفتاح تصحيح الاختبار النهائي — الدرس 35"), "teacher area keeps the supplied §35 heading");
ok(teacherRoot().querySelectorAll("[data-ft-key-item]").length === 15, "teacher area keeps the shared FinalTest answer key");
ok((teacherRoot().textContent || "").includes("الفخ"), "teacher solutions include common-trap notes");
ok(host.querySelectorAll("[data-site-lock-button='true']").length === 1, "exactly one site-lock button in the teacher area");

// ---------------------------------------------------------------- 8) printed/rendered content details
const corpus = loose(host.textContent || "");
ok(corpus.includes(loose("مفتاح تصحيح الاختبار النهائي — الدرس 35")), "§35 heading is present after unlocking the teacher area");
for (const unit of sourceFor("s35").units) ok(corpus.includes(loose(unit)), `§35 unit is preserved: ${unit.slice(0, 40)}`);

// test-area source coverage
const testCorpus = loose(testRoot().textContent || "");
for (const unit of sourceFor("s34").units) {
  ok(testCorpus.includes(loose(unit)), `§34 unit appears in the rendered test: ${unit.slice(0, 48)}`);
}

// English isolation: every rendered English example is LTR
const ltrExamples = [...host.querySelectorAll(".fg35-en")].filter((element) => /[A-Za-z]/.test(element.textContent || ""));
ok(ltrExamples.length > 20, `English examples are rendered in quantity (${ltrExamples.length})`);
const badLtr = ltrExamples.filter((element) => getComputedStyle(element).direction !== "ltr");
ok(badLtr.length === 0, `every English example is LTR-isolated (offenders: ${badLtr.slice(0, 3).map((element) => element.outerHTML.slice(0, 120)).join(" | ")})`);
ok(host.querySelector('[data-lesson="35"]')?.getAttribute("dir") === "rtl", "the lesson shell remains RTL");

// ---------------------------------------------------------------- 9) route
win.location.hash = "#/lesson/35";
const appMount = M.mount(M.React.createElement(M.App));
await tick(60);
ok(!!appMount.el.querySelector('[data-lesson="35"]'), "#/lesson/35 renders Lesson 35 through App.tsx");
ok(!appMount.el.querySelector('[data-final-test="35"]'), "the route opens before the shared final assessment step");
appMount.root.unmount();
appMount.el.remove();

mounted.root.unmount();
host.remove();

// ---------------------------------------------------------------- files
ok(existsSync(join(root, "src/lessons/lesson35/Lesson35.tsx")), "Lesson35.tsx exists");
ok(existsSync(join(root, "src/lessons/lesson35/lesson35.css")), "the scoped Future Garden Studio stylesheet exists");
ok(existsSync(join(root, "docs/lesson35-coverage.md")), "the coverage ledger exists");

if (failures.length) {
  console.error(`✕ Lesson 35 audit failed (${failures.length} failing assertions of ${checks})`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 35 audit passed (${checks} assertions): 39 source sections, 61 short steps, full exercise/reading/writing keys, 25-question five-level test with gated solutions, password-gated teacher area, one normal-flow site lock, and full §34/§35 rendering.`);
