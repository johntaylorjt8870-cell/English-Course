// ============================================================
// Lesson 35 coverage + test + route + interaction audit
// Run: npm run audit:lesson35
// ============================================================
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
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
]) {
  if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
}
if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};
if (!win.Element.prototype.scrollIntoView) win.Element.prototype.scrollIntoView = () => {};
win.scrollTo = () => {};
win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
globalThis.IS_REACT_ACT_ENVIRONMENT = false;

await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import App from ${JSON.stringify(join(root, "src/App.tsx"))};
import Lesson35 from ${JSON.stringify(join(root, "src/lessons/lesson35/Lesson35.tsx"))};
import StepView35 from ${JSON.stringify(join(root, "src/lessons/lesson35/Steps35.tsx"))};
import TestArea35, { Solutions35 } from ${JSON.stringify(join(root, "src/lessons/lesson35/TestArea35.tsx"))};
import TeacherArea35 from ${JSON.stringify(join(root, "src/lessons/lesson35/TeacherArea35.tsx"))};
import * as LEDGER from ${JSON.stringify(join(root, "src/lessons/lesson35/ledger35.ts"))};
import * as DATA from ${JSON.stringify(join(root, "src/lessons/lesson35/data.ts"))};
import * as PRACTICE from ${JSON.stringify(join(root, "src/lessons/lesson35/practiceData.ts"))};
import * as TEST from ${JSON.stringify(join(root, "src/lessons/lesson35/testData.ts"))};
import { FINAL_TESTS } from ${JSON.stringify(join(root, "src/shared/finalTestBank.ts"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); const root = createRoot(el); root.render(node); return { el, root }; }
export { React, createRoot, renderToString, App, Lesson35, StepView35, TestArea35, Solutions35, TeacherArea35, LEDGER, DATA, PRACTICE, TEST, FINAL_TESTS, mount };
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
  // Lesson 44 bundles its own local font subsets; jsdom never renders them.
  loader: { ".woff2": "empty" },
  logLevel: "silent",
});
const M = await import(pathToFileURL(outFile).href);
rmSync(outFile, { force: true });

const { SOURCE_SECTIONS_35 } = M.LEDGER;
const { SLIDES_35, SLIDE_COUNT_35, SECTIONS_35 } = M.DATA;
const tick = (ms = 20) => new Promise((resolve) => setTimeout(resolve, ms));
const click = (element) => element?.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
const setNative = (element, value) => {
  const proto = element.tagName === "SELECT" ? win.HTMLSelectElement.prototype : element.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value);
  element.dispatchEvent(new win.Event(element.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
};
const findButton = (scope, text) => [...scope.querySelectorAll("button")].find((button) => (button.textContent || "").replace(/\s+/g, " ").includes(text));
const sourceFor = (id) => SOURCE_SECTIONS_35.find((section) => section.id === id);
const sourceIndexSet = (html) => new Set([...html.matchAll(/data-source-unit="(\d+)"/g)].map((match) => Number(match[1])));

// 1) Source ledger ↔ native steps: one-to-one, ordered, traceable.
ok(SOURCE_SECTIONS_35.length === 39, `ledger contains cover + sections 1–38 (got ${SOURCE_SECTIONS_35.length})`);
ok(new Set(SOURCE_SECTIONS_35.map((section) => section.id)).size === 39, "ledger IDs are unique");
ok(SOURCE_SECTIONS_35.every((section, index) => section.order === index && section.units.length > 0), "ledger units are non-empty and remain in source order");
ok(SLIDE_COUNT_35 === 39 && SLIDES_35.length === 39, `native lesson has 39 steps (got ${SLIDE_COUNT_35})`);
ok(SLIDES_35.map((slide) => slide.sourceId).join("|") === SOURCE_SECTIONS_35.map((section) => section.id).join("|"), "every source section maps to exactly one native step in order");
ok(SECTIONS_35.length === 13 && new Set(SLIDES_35.map((slide) => slide.section)).size === 13, "13 Future Lab scenes organize the 39 source-order steps");
ok(SLIDES_35.every((slide, index) => slide.sourceOrder === index && slide.id === SOURCE_SECTIONS_35[index].id), "step/source IDs and source-order indices match");

// 2) Exact answer-key coverage and explicit source-vs-authored labels.
const checksFor = [
  ["Grammar Detective", M.PRACTICE.DETECTIVE_ITEMS_35, "s28"],
  ["auxiliary drill", M.PRACTICE.AUXILIARY_ITEMS_35, "s29"],
  ["transformations", M.PRACTICE.TRANSFORMATION_ITEMS_35, "s30"],
];
for (const [label, items, id] of checksFor) {
  const section = sourceFor(id);
  ok(items.length === section.units.length - 1, `${label}: all prompts have a paired key`);
  ok(items.every((item, index) => item.prompt === section.units[index + 1] && item.answer === section.revealUnits[index + 1]), `${label}: prompts and supplied keys are verbatim/source-aligned`);
}
ok(M.PRACTICE.DETECTIVE_ITEMS_35.length === 8, "Grammar Detective has 8 items");
ok(M.PRACTICE.AUXILIARY_ITEMS_35.length === 8, "am/is/are drill has 8 items");
ok(M.PRACTICE.TRANSFORMATION_ITEMS_35.length === 6, "transformation exercise has 6 items");
ok(M.PRACTICE.DECISION_PRACTICE_ITEMS_35.length === 8, "WILL / BE GOING TO context practice has 8 items");
ok(M.PRACTICE.DECISION_PRACTICE_ITEMS_35.every((item, index) => item.answer === sourceFor("s31").revealUnits[1 + index * 2] && item.explanation === sourceFor("s31").revealUnits[2 + index * 2]), "all eight decision answers and source explanations are preserved");
ok(M.PRACTICE.READING_QUESTIONS_35.length === 7 && M.PRACTICE.READING_ANSWERS_35.length === 7 && M.PRACTICE.READING_ANALYSIS_35.length === 5, "reading keeps 7 questions, 7 source answers, and 5 source analyses");
ok(M.PRACTICE.FINAL_BOSS_REQUIREMENTS_35.length === 8 && M.PRACTICE.FINAL_BOSS_REQUIREMENTS_35.every((line, index) => line === sourceFor("s36").units[4 + index]), "Final Boss keeps all eight exact requirements");
ok(M.PRACTICE.FINAL_BOSS_MODEL_35.join("|") === sourceFor("s36").units.slice(13, 17).join("|"), "Final Boss model paragraph is preserved in full and source order");

// 3) The supplied 25-question test, five source-based levels, and authored solutions.
ok(M.TEST.TEST_35_COUNT === 25 && M.TEST.TEST_35.length === 25, "source Master Test has exactly 25 questions");
ok(M.TEST.TEST_LEVEL_COUNT_35 === 5 && M.TEST.TEST_LEVELS_35.length === 5 && M.TEST.TEST_LEVELS_35.every((level) => level.questions.length === 5), "Master Test has exactly five levels of five questions");
ok(M.TEST.TEST_35.every((question, index) => question.n === index + 1 && question.sourceSupplied === true), "test question order and source provenance are explicit");
ok(M.TEST.TEST_35.every((question) => question.sourceUnits.length >= question.promptLines.length && question.sourceUnits.every((unit) => Number.isInteger(unit) && unit >= 0 && unit < sourceFor("s34").units.length)), "every test prompt and source option has a valid ledger index");
ok(M.TEST.TEST_SOLUTIONS_35.length === 25 && M.TEST.TEST_SOLUTIONS_35.every((solution, index) => solution.n === index + 1 && solution.sourceStatus === "teacher-authored"), "all test questions have clearly teacher-authored solutions");
ok(M.TEST.TEST_LEVELS_35.every((level) => Number.isInteger(level.titleSourceUnit) && sourceFor("s34").units[level.titleSourceUnit] === level.title), "all five test-level labels map to the supplied source");
const solutionsHtml = M.renderToString(M.React.createElement(M.Solutions35, { unlocked: true, onGoTest() {}, onGoTeacher() {} }));
ok((solutionsHtml.match(/data-solution="\d+"/g) || []).length === 25, "Solutions Area renders all 25 source-test solutions");
ok(solutionsHtml.includes("لا يورد مفتاح الأسئلة") && solutionsHtml.includes("إعداد تعليمي من المعلم/المنصة"), "missing §35 answer text is disclosed; authored solutions are not mislabeled as source");
const lockedSolutionsHtml = M.renderToString(M.React.createElement(M.Solutions35, { unlocked: false, onGoTest() {}, onGoTeacher() {} }));
ok(lockedSolutionsHtml.includes("منطقة الحلول مقفلة") && !lockedSolutionsHtml.includes("data-solution="), "Solutions Area is gated before submission/teacher unlock");

// 4) Shared course FinalTest integration: data-only addition, 15 questions, existing renderer.
ok(Array.isArray(M.FINAL_TESTS[35]) && M.FINAL_TESTS[35].length === 15, "shared FinalTest bank has a 15-question Lesson 35 entry");
ok(!M.FINAL_TESTS[34].some((question) => JSON.stringify(question).includes("BE GOING TO")), "Lesson 34 shared assessment data is unchanged by Lesson 35 registration");
const finalAuditText = readFileSync(join(root, "src/shared/finalTest.tsx"), "utf8");
ok(finalAuditText.includes("data-final-test={lesson}"), "shared FinalTest component remains the existing renderer");
const appText = readFileSync(join(root, "src/App.tsx"), "utf8");
ok(appText.includes("import Lesson35") && appText.includes("route === 35") && appText.includes("#/lesson/35"), "Lesson 35 is registered as a first-class course route/card");
ok(!appText.includes("data-lesson=\"35\""), "Future Lab visual scope is implemented inside Lesson35, not in the shared app shell");

// 5) Render each source-order step, verify its source section and visible source units.
const stepRenders = new Map();
for (const slide of SLIDES_35) {
  const html = M.renderToString(M.React.createElement("div", { dir: "rtl" }, M.React.createElement(M.StepView35, { slide, onGoTest() {}, onGoSolutions() {} })));
  const section = sourceFor(slide.sourceId);
  ok(html.includes(`data-step-id="${slide.id}"`) && html.includes(`data-source-id="${slide.sourceId}"`), `${slide.id}: native step rendered`);
  ok(html.includes(`data-source-section="${slide.sourceId}"`), `${slide.id}: renders its traceable source section`);
  if (slide.id !== "s34") {
    const indices = sourceIndexSet(html);
    const missing = section.units.map((_, index) => index).filter((index) => !indices.has(index));
    ok(missing.length === 0, `${slide.id}: every non-answer source unit is represented in the student step${missing.length ? ` (missing ${missing.join(",")})` : ""}`);
  }
  if (["s28", "s29", "s30", "s31", "s33"].includes(slide.id)) {
    const answerLines = section.revealUnits || [];
    ok(!answerLines.some((line) => line.length > 10 && html.includes(line)), `${slide.id}: source answer key is absent before the learner attempts the task`);
  }
  ok(!/<details|<summary/.test(html), `${slide.id}: no collapsible source drawer in the student step`);
  stepRenders.set(slide.id, html);
}
const testAreaHtml = M.renderToString(M.React.createElement(M.TestArea35, { onSubmitted() {}, onRestart() {} }));
const allTestSourceUnits = new Set([...sourceIndexSet(stepRenders.get("s34")), ...sourceIndexSet(testAreaHtml)]);
const missingTestUnits = sourceFor("s34").units.map((_, index) => index).filter((index) => !allTestSourceUnits.has(index));
ok(missingTestUnits.length === 0, `all 50 §34 test-source units render across the lesson intro and test area${missingTestUnits.length ? ` (missing ${missingTestUnits.map((index) => `${index}:${sourceFor("s34").units[index]}`).join("; ")})` : ""}`);
ok(!testAreaHtml.includes("data-test-feedback="), "test render is neutral before submit (no correctness feedback)");
ok(testAreaHtml.includes("data-test-submit") && testAreaHtml.includes("25 سؤالًا، خمسة مستويات"), "dedicated Test Area has one delayed-submit control and the 25-Q scope");

// 6) Mounted shell, previous/next, scene rail, input builder, practice gates, test feedback, solutions, teacher gate.
const mounted = M.mount(M.React.createElement(M.Lesson35, { onExit() {} }));
const host = mounted.el;
await tick(50);
const activeStep = () => host.querySelector("[data-step-id]");
const navigateToStep = async (id) => {
  const target = SLIDES_35.find((slide) => slide.id === id);
  if (!host.querySelector(`[data-step-nav="${id}"]`)) {
    click(host.querySelector(`[aria-controls="l35-scene-list-${target.section}"]`));
    await tick();
  }
  click(host.querySelector(`[data-step-nav="${id}"]`));
  await tick();
};
ok(activeStep()?.getAttribute("data-step-id") === "cover", "shell opens on cover step");
const nextButton = () => [...host.querySelectorAll("button")].find((button) => (button.textContent || "").trim() === "التالي ←");
const previousButton = () => [...host.querySelectorAll("button")].find((button) => (button.textContent || "").trim() === "→ السابق");
ok(previousButton()?.disabled === true, "previous is disabled on first step");
click(nextButton());
await tick();
ok(activeStep()?.getAttribute("data-step-id") === "s1", "Next advances exactly one native step");
click(previousButton());
await tick();
ok(activeStep()?.getAttribute("data-step-id") === "cover", "Previous returns to the preceding step");
await navigateToStep("s10");
ok(activeStep()?.getAttribute("data-step-id") === "s10", "scene rail jumps directly to the selected step");
ok(host.querySelector('[data-lesson="35"]')?.getAttribute("dir") === "rtl" && activeStep()?.querySelector('[dir="ltr"]'), "Arabic shell remains RTL and includes isolated English LTR content");

// Auxiliary selector and sentence builder are native, operable controls.
await navigateToStep("s4");
const s4 = host.querySelector('[data-step-id="s4"]');
click(findButton(s4, "He"));
await tick();
ok(s4.textContent.includes("is going to"), "auxiliary selector returns is for He");
await navigateToStep("s6");
const s6 = host.querySelector('[data-step-id="s6"]');
const selects = [...s6.querySelectorAll("select")];
setNative(selects.find((select) => select.getAttribute("aria-label") === "Subject"), "I");
setNative(selects.find((select) => select.getAttribute("aria-label") === "am is are"), "am");
setNative(selects.find((select) => select.getAttribute("aria-label") === "Base verb V1"), "learn");
setNative(selects.find((select) => select.getAttribute("aria-label") === "Rest of sentence"), "how to cook");
click(findButton(s6, "ابنِ الجملة"));
await tick();
ok(s6.textContent.includes("I am going to learn how to cook."), "sentence builder assembles a valid LTR sentence");

// Source exercise keys only appear after item checks; correcting a response re-locks the full key.
await navigateToStep("s28");
let s28 = host.querySelector('[data-step-id="s28"]');
ok(!s28.textContent.includes(sourceFor("s28").revealUnits[1]), "Grammar Detective source answer is hidden before attempt");
const firstPracticeInput = s28.querySelector('input[id="s28-answer-1"]');
setNative(firstPracticeInput, "She is going to study tonight.");
click(findButton(s28, "تحقق"));
await tick();
ok(s28.textContent.includes(sourceFor("s28").revealUnits[1]), "checking an exercise item reveals its source key and feedback");
setNative(firstPracticeInput, "She going to study tonight.");
await tick();
ok(!s28.textContent.includes("مفتاح المصدر — بعد المحاولة"), "editing a checked item re-locks the all-items source-key reveal");

// Reading answers remain delayed until all seven responses are entered.
await navigateToStep("s33");
const s33 = host.querySelector('[data-step-id="s33"]');
ok(!s33.textContent.includes(sourceFor("s33").revealUnits[1]), "reading key is hidden before learner attempt");
for (const field of s33.querySelectorAll("textarea")) setNative(field, "A complete learner response.");
click(findButton(s33, "تحقق من الفهم واعرض الإجابات"));
await tick();
ok(s33.textContent.includes(sourceFor("s33").revealUnits[1]) && s33.textContent.includes(sourceFor("s33").revealUnits.at(-1)), "reading key and all grammar notes reveal after all seven responses");

// The source Master Test is separate from the shared 15-Q course FinalTest.
for (const button of host.querySelectorAll("[data-area-nav]")) {
  if ((button.textContent || "").includes("منطقة الاختبار")) { click(button); break; }
}
await tick();
const testRoot = host.querySelector('[data-area="lesson35-test"]');
ok(!!testRoot && testRoot.querySelectorAll("[data-test-q]").length === 25, "dedicated Test Area contains exactly 25 questions");
ok(testRoot.querySelector("[data-test-submit]")?.disabled === true && testRoot.querySelectorAll("[data-test-feedback]").length === 0, "no correctness feedback before full submit");
for (const question of M.TEST.TEST_35) {
  const card = testRoot.querySelector(`[data-test-q="${question.n}"]`);
  if (question.type === "single") click(card.querySelectorAll('[role="radio"]')[question.answer]);
  else if (question.type === "write") setNative(card.querySelector("textarea"), question.answer);
  else setNative(card.querySelector("input[type=text]"), question.answer);
}
await tick();
ok(testRoot.querySelector("[data-test-submit]")?.disabled === false, "submit activates only after all 25 items have a response");
ok(testRoot.querySelectorAll("[data-test-feedback]").length === 0, "completed but unsubmitted answers still have no feedback");
click(testRoot.querySelector("[data-test-submit]"));
await tick();
ok(testRoot.querySelectorAll("[data-test-feedback]").length === 20, "one submit reveals objective feedback for questions 1–20");
ok(testRoot.textContent.includes("النتيجة الموضوعية: 20 / 20") && testRoot.textContent.includes("للمراجعة البشرية"), "test scores objective questions and flags free responses for human review");

for (const button of host.querySelectorAll("[data-area-nav]")) {
  if ((button.textContent || "").includes("منطقة الحلول")) { click(button); break; }
}
await tick();
const solutionsRoot = host.querySelector('[data-area="lesson35-solutions"]');
ok(!!solutionsRoot && solutionsRoot.querySelectorAll("[data-solution]").length === 25, "after submit, separate Solutions Area shows all 25 authored explanations");

// Teacher area is separately password-protected and contains teacher-only exercise/source material.
for (const button of host.querySelectorAll("[data-area-nav]")) {
  if ((button.textContent || "").includes("منطقة المعلم")) { click(button); break; }
}
await tick();
const teacherRoot = host.querySelector('[data-area="lesson35-teacher"]');
ok(!!teacherRoot && !!teacherRoot.querySelector('input[type="password"]'), "Teacher Area starts behind its password gate");
ok(!teacherRoot.querySelector("[data-ft-key]") && !teacherRoot.textContent.includes("معرضة للخطأ"), "teacher answers do not leak before unlock");
const teacherForm = teacherRoot.querySelector("form");
setNative(teacherRoot.querySelector('input[type="password"]'), "wrong-password");
teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
await tick();
ok(!!teacherRoot.querySelector('[role="alert"]'), "wrong teacher password is rejected");
setNative(teacherRoot.querySelector('input[type="password"]'), "somer173");
teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
await tick();
ok(!!teacherRoot.querySelector("[data-ft-key]") && teacherRoot.querySelectorAll("[data-ft-key-item]").length === 15, "teacher unlock reveals the shared FinalTest key, not a copied renderer");
ok(teacherRoot.querySelectorAll("details").length === 39 && teacherRoot.textContent.includes("مفتاح أصلي وارد في المصدر"), "teacher source ledger exposes all 39 source sections and original answer keys");

// Shared FinalTest appears once and only at the last lesson step.
click(host.querySelector('[data-step-nav="cover"]'));
await tick();
ok(host.querySelectorAll('[data-final-test="35"]').length === 0, "shared FinalTest is not inserted at the lesson opening");
for (let count = 0; count < SLIDE_COUNT_35 - 1; count++) {
  click(nextButton());
  await tick(1);
}
ok(activeStep()?.getAttribute("data-step-id") === "s38", "linear previous/next navigation reaches the final source step");
ok(host.querySelectorAll('[data-final-test="35"]').length === 1, "one shared FinalTest mounts after the final lesson step");
ok(host.querySelector('[data-final-test="35"] [data-ft-submit]')?.disabled === true, "shared FinalTest keeps its delayed-submit interaction");

// Route coverage through the real hash router, not a direct component-only mount.
win.location.hash = "#/lesson/35";
const appMount = M.mount(M.React.createElement(M.App));
await tick(50);
ok(!!appMount.el.querySelector('[data-lesson="35"]'), "#/lesson/35 renders the Lesson 35 Future Lab through App.tsx");
ok(!appMount.el.querySelector('[data-final-test="35"]'), "route opens before the shared final assessment step");
appMount.root.unmount();
host.remove();
mounted.root.unmount();

if (!existsSync(join(root, "src/lessons/lesson35/Lesson35.tsx"))) ok(false, "Lesson35.tsx exists");
if (!existsSync(join(root, "docs/lesson35-coverage.md"))) ok(false, "source-coverage ledger exists");

if (failures.length) {
  console.error(`✕ Lesson 35 audit failed (${failures.length}/${checks})`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 35 audit passed (${checks} assertions): 39 source steps, complete coverage/key lineage, 25-Q five-level test, separate solutions/teacher areas, route, RTL/LTR, interactions, and shared FinalTest integration.`);
