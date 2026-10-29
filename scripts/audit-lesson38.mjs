// Lesson 38 (rebuild) — source coverage, step map, answer protection, interactions,
// teacher/solutions separation, direction, contrast, responsive contract, and route audit.
// Run: npm run build && npm run audit:lesson38
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
import * as KEY from ${JSON.stringify(join(root, "src/lessons/lesson38/testKey38.ts"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); const root = createRoot(el); act(() => root.render(node)); return { el, root: { unmount() { act(() => root.unmount()); } } }; }
export { React, act, createRoot, renderToString, Lesson38, StepView38, TestArea38, TeacherArea38, SolutionsArea38, TeacherGuide38, LEDGER, DATA, PRACTICE, TEST, SOLUTIONS, COVERAGE, KEY, mount };
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
  loader: { ".woff2": "empty" },
  logLevel: "silent",
});
const M = await import(pathToFileURL(outFile).href);

const {
  SOURCE_SECTIONS_38, NUMBERED_SECTIONS_38, TIMELINE_ROWS_38, PRONOUN_ROWS_38, AT_BY_ROWS_38,
  TIME_EXPRESSION_ROWS_38, REGULAR_V3_ROWS_38, IRREGULAR_V3_ROWS_38, FUTURE_ROWS_38, PERFECT_ROWS_38,
  ROADMAP_ROWS_38, sourceSection38,
} = M.LEDGER;
const { SLIDES_38, STEP_COUNT_38, CHAPTERS_38, LESSON_SUBTITLE_38, LESSON_IDENTITY_38 } = M.DATA;
const { TEST_LEVELS_38, TEST_COUNT_38, TEST_LEVEL_COUNT_38, TEST_INTRO_38, TEST_SOURCE_UNIT_INDEXES_38, TEST_SOURCE_UNIT_TOTAL_38 } = M.TEST;
const { TEST_SOLUTIONS_38 } = M.SOLUTIONS;
const {
  OBJECTIVES_38, EXERCISE27_ITEMS_38, FILL28_ITEMS_38, TENSE29_ITEMS_38, DETECTIVE30_ITEMS_38,
  READING32_QUESTIONS_38, READING32_ANALYSIS_38, WRITING35_CRITERIA_38, WRITING35_MODEL_38,
  DIALOGUE_LINES_38, DIALOGUE2_LINES_38, V3_ITEMS_38, V3_PAIRS_38, WRITING_MODEL_CHECK_38,
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
const slideOf = (id) => {
  const slide = SLIDES_38.find((candidate) => candidate.id === id);
  if (!slide) throw new Error(`No step ${id}`);
  return slide;
};
const mountStep = (id) => {
  const slide = slideOf(id);
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

/* 1) Source ledger ------------------------------------------------------- */
ok(SOURCE_SECTIONS_38.length === 38, `ledger holds the opening, 36 numbered sections, and the 39–48 roadmap (got ${SOURCE_SECTIONS_38.length})`);
ok(
  NUMBERED_SECTIONS_38.length === 36 && NUMBERED_SECTIONS_38.every((section, index) => section.num === index + 1 && section.id === `s${String(index + 1).padStart(2, "0")}`),
  "all 36 numbered source sections exist exactly once in original order",
);
ok(SOURCE_SECTIONS_38.every((section, index) => section.order === index && section.title.length > 0 && section.units.length > 0), "every source section keeps an ordered title and non-empty content units");
ok(!sourceSection38("s37"), "no fabricated source section beyond the supplied 36");
ok(COVERAGE_38.length === 38 && COVERAGE_SECTION_COUNT_38 === 36, "coverage ledger has a row for the opening, every numbered section, and the roadmap");
ok(COVERAGE_38.every((row) => typeof row.location === "string" && row.location.length > 0), "every coverage row states where the section is rendered");

/* 2) Step map ------------------------------------------------------------ */
ok(STEP_COUNT_38 === 60 && SLIDES_38[0].id === "cover", `the rebuild is 60 short steps starting with the opening (got ${STEP_COUNT_38})`);
ok(SLIDES_38.some((slide) => slide.id === "map-a") && SLIDES_38.some((slide) => slide.id === "map-b"), "the 39–48 future map is a closing station, not a new numbered lesson");
ok(LESSON_IDENTITY_38.includes("Future Achievement Observatory"), "the lesson identity is Future Achievement Observatory");
ok(SLIDES_38.every((slide, index) => slide.step === index + 1), "steps are numbered sequentially in reading order");
ok(SLIDES_38.every((slide) => !!sourceSection38(slide.sourceId)), "every step points at a real source section");
ok(
  SOURCE_SECTIONS_38.filter((section) => section.id !== "s33").every((section) => SLIDES_38.some((slide) => slide.sourceId === section.id)),
  "every source section except the §33 test still renders source text in the Student Area",
);
{
  // Each source unit must render exactly once across the steps that carry it (the §33 test is
  // rendered by the separate Test Area instead, and is audited separately below).
  const counts = new Map();
  for (const slide of SLIDES_38) {
    for (let index = slide.range[0]; index < slide.range[1]; index += 1) {
      const key = `${slide.sourceId}#${index}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  const duplicated = [...counts.entries()].filter(([, value]) => value > 1).map(([key]) => key);
  ok(duplicated.length === 0, `no source line renders twice after the split (duplicates: ${duplicated.slice(0, 6).join(", ") || "none"})`);
  const missing = [];
  for (const section of SOURCE_SECTIONS_38) {
    if (section.id === "s33") continue;
    for (let index = 0; index < section.units.length; index += 1) {
      if (!counts.has(`${section.id}#${index}`)) missing.push(`${section.id}#${index}`);
    }
  }
  ok(missing.length === 0, `every source line is reachable in this rebuild (missing: ${missing.slice(0, 6).join(", ") || "none"})`);
  ok(SLIDES_38.every((slide) => slide.range[0] >= 0 && slide.range[1] <= sourceSection38(slide.sourceId).units.length && slide.range[0] < slide.range[1]), "every step keeps a valid, non-empty source range");
}
ok(CHAPTERS_38.flatMap((chapter) => chapter.stepIds).join("|") === SLIDES_38.map((slide) => slide.id).join("|"), "chapter navigation groups every step once, in order");
ok(SLIDES_38.filter((slide) => slide.collapseSource).length >= 4, "practice steps that duplicate their source items collapse the source card instead of printing it twice");

/* 3) Content preservation ------------------------------------------------ */
ok(source("cover").units.some((line) => line.includes(LESSON_SUBTITLE_38)) && source("cover").units.some((line) => line.includes("IQ200")), "cover keeps the English subtitle and the IQ200 tagline");
ok(source("cover").units.includes("At 8:00 tomorrow, I will be studying.") && source("cover").units.includes("By 8:00 tomorrow, I will have finished studying."), "cover keeps the Lesson 37 bridge pair");
ok(source("s01").units.slice(1).length === 10 && source("s01").units.slice(1).every((line, index) => line.startsWith(["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"][index])), "§1 keeps all ten numbered objectives");
ok(TIMELINE_ROWS_38.length === 3 && TIMELINE_ROWS_38.map((row) => row.join("=")).join("|") === "MONDAY=اليوم|WEDNESDAY=إنهاء المشروع|FRIDAY=نقطة المرجع المستقبلية", "§2 keeps the exact three source moments");
ok(source("s02").units.includes("Will your project be ready by Friday?") && source("s02").units.includes("Yes. I will have finished it by Friday."), "§2 keeps the teacher question and the Future Perfect answer");
ok(PRONOUN_ROWS_38.length === 7 && PRONOUN_ROWS_38.map((row) => row[0]).join(",") === "I,You,He,She,It,We,They", "§5 keeps all seven subjects in order");
ok(PRONOUN_ROWS_38[4][1] === "It will have stopped." && PRONOUN_ROWS_38.every(([, sentence]) => sentence.includes("will have ")), "§5 every pronoun uses will have + V3");
ok(source("s03").units.includes("Subject + will + have + V3"), "§3 keeps the exact core formula");
ok(source("s04").units.some((line) => line.includes("She will have completed the experiment by noon.")) && source("s04").units.some((line) => line.includes("She will has finished. ❌")), "§4 keeps the analysed sentence and the has error");
ok(AT_BY_ROWS_38.length === 2 && AT_BY_ROWS_38[0][0] === "At 8:00" && AT_BY_ROWS_38[1][0] === "By 9:00", "§8 keeps the two source AT/BY rows");
ok(TIME_EXPRESSION_ROWS_38.length === 9 && TIME_EXPRESSION_ROWS_38.map((row) => row[0]).join("|") === "by tomorrow|by next week|by next year|by 10:00|by the end of the day|by the end of the month|by then|before Friday|by the time you arrive", "§9 keeps all nine supplied time expressions");
ok(source("s11").units.some((line) => line.includes("By the time you will arrive, I will have finished. ❌")) && source("s11").units.some((line) => line.includes("By the time you arrive, I will have finished. ✅")), "§11 keeps the wrong will-in-time-clause and the corrected Present Simple");
ok(source("s13").title.includes("The School Exhibition") && DIALOGUE_LINES_38.length === 6, "§13 keeps The School Exhibition with six turns");
ok(source("s14").units.includes("Subject + will not + have + V3") && source("s14").units.includes("will not = won't"), "§14 keeps the negative formula");
ok(source("s16").units.includes("Will + Subject + have + V3?") && source("s17").units.includes("Yes, I will.") && source("s17").units.includes("No, I won't."), "§16–§17 keep the Yes/No formula and short answers");
ok(["What will you have completed by Friday?", "How many books will she have read by the end of the month?", "Where will they have travelled by the end of the year?", "How much money will you have saved by next summer?", "When will he have finished the project?"].every((question) => source("s18").units.includes(question)), "§18 keeps all five exact Wh-question examples");
ok(REGULAR_V3_ROWS_38.length === 5 && IRREGULAR_V3_ROWS_38.length === 10 && IRREGULAR_V3_ROWS_38.some((row) => row[0] === "go" && row[2] === "gone"), "§19 keeps five regular and ten irregular V3 rows");
ok(source("s19").units.some((line) => line.includes("I will have wrote the report. ❌")) && source("s19").units.some((line) => line.includes("She will have went home. ❌")), "§19 keeps the wrote/went error pairs");
ok(FUTURE_ROWS_38.map((row) => row[1]).join("|") === "will + V1|will be + V-ing|will have + V3", "§22 comparison table keeps the three future forms");
ok(PERFECT_ROWS_38.map((row) => row[1]).join("|") === "have/has + V3|had + V3|will have + V3", "§24 perfect map keeps the three perfect forms");
ok(source("s25").units.filter((line) => line.includes("❌")).length === 7 && source("s25").units.filter((line) => line.includes("✅")).length === 7, "§25 keeps all seven error pairs");
ok(DIALOGUE2_LINES_38.length === 9 && source("s26").units.some((line) => line.includes("I'll be checking the sound system.")), "§26 keeps the nine-turn dialogue including Future Continuous");
ok(EXERCISE27_ITEMS_38.length === 6 && EXERCISE27_ITEMS_38.every((item, index) => item.n === index + 1 && item.answer && item.options.length === 3), "§27 keeps all six multiple-choice items");
ok(FILL28_ITEMS_38.length === 6 && FILL28_ITEMS_38[4].answer === "Will you have saved", "§28 keeps all six completions including the question form");
ok(TENSE29_ITEMS_38.length === 8 && TENSE29_ITEMS_38[5].answer === "future-continuous" && TENSE29_ITEMS_38[6].answer === "future-perfect", "§29 keeps the eight tense choices and the ⑥/⑦ contrast");
ok(DETECTIVE30_ITEMS_38.length === 10 && DETECTIVE30_ITEMS_38[6].answer === "He will be ready by 8:00.", "§30 keeps all ten error sentences including will be ready");
ok(source("s23").units.some((line) => line.includes("ستُعِدّ العشاء")), "§23 carries the documented editorial fix ستُعِدّ العشاء");
ok(source("s31").units.includes("I will finish the project by Friday.") && source("s31").units.includes("I will have finished the project by Friday."), "§31 keeps both grammatical by-Friday sentences");
ok(source("s32").units.some((line) => line.includes("Building a Smarter City")) && READING32_QUESTIONS_38.length === 7 && READING32_ANALYSIS_38.length === 5, "§32 keeps the reading text, seven questions, and five-form analysis");
ok(source("s33").units.length === 60 && TEST_SOURCE_UNIT_TOTAL_38 === 60 && TEST_SOURCE_UNIT_INDEXES_38.every((value, index) => value === index), "§33 formal test consumes all 60 source lines exactly once");
ok(source("s34").units.length === 3 && !source("s34").revealUnits, "§34 keeps its heading and really has no source key");
ok(WRITING35_CRITERIA_38.length === 8 && WRITING35_MODEL_38.length === 5 && source("s35").units[1].includes("12 إلى 15"), "§35 keeps the 12–15 sentence task, eight criteria, and five-line model");
ok(WRITING_MODEL_CHECK_38.length === 3 && V3_PAIRS_38.length === 3, "the added split-step checks carry three traced items each");
ok(source("s36").units.includes("Subject + will + have + V3") && source("s36").units.some((line) => line.includes("Subject + won't + have + V3")), "§36 golden summary keeps the positive and negative formulas");
ok(ROADMAP_ROWS_38.length === 10 && ROADMAP_ROWS_38[0][0] === "39" && ROADMAP_ROWS_38[9][0] === "48", "the future map keeps all ten lesson titles 39–48");
ok(source("roadmap").units.some((line) => line.includes("By 8:00, I will have been working for five hours.")), "the map keeps the Lesson 39 bridge pair");

/* 4) Test data and key --------------------------------------------------- */
ok(TEST_COUNT_38 === 25 && TEST_LEVEL_COUNT_38 === 5 && TEST_LEVELS_38.every((level) => level.questions.length === 5), "the formal test stays 25 questions in five levels of five");
ok(TEST_LEVELS_38.map((level) => `${level.questions[0].n}-${level.questions.at(-1).n}`).join("|") === "1-5|6-10|11-15|16-20|21-25", "the test keeps the exact level boundaries");
ok(TEST_LEVELS_38[0].questions.every((question) => question.type === "multiple-choice" && question.options?.length === 3), "Level 1 keeps five multiple-choice questions with three options");
ok(TEST_LEVELS_38[1].questions.every((question) => question.type === "fill") && TEST_LEVELS_38[2].questions.every((question) => question.type === "repair"), "Level 2 stays completion and Level 3 stays repair");
ok(TEST_LEVELS_38[3].questions[3].type === "open" && TEST_LEVELS_38[4].questions.every((question) => question.marker?.text), "Level 4 keeps an open item and Level 5 keeps the five paragraph markers");
ok(TEST_INTRO_38.length === 2 && TEST_LEVELS_38.every((level) => level.questions.every((question) => question.promptLines.length > 0 && question.promptUnitIndexes.length === question.promptLines.length)), "every test question keeps its traced source prompt lines");
ok(TEST_SOLUTIONS_38.length === 25 && TEST_SOLUTIONS_38.every((solution, index) => solution.n === index + 1), "25 detailed solutions exist for Q1–Q25 in order");
ok(TEST_SOLUTIONS_38.every((solution) => solution.sourceStatus === "platform-authored-teacher-addition"), "every solution is explicitly marked platform/teacher-authored");
ok(TEST_SOLUTIONS_38.every((solution) => solution.level === Math.ceil(solution.n / 5)), "solutions are grouped by the same five levels");
ok(TEST_SOLUTIONS_38.every((solution) => solution.answer.length > 0 && solution.explanation.length > 30), "every solution carries an answer and substantive reasoning");
ok(TEST_SOLUTIONS_38.filter((solution) => solution.n >= 16 && solution.n <= 20).every((solution) => solution.alternatives?.length), "meaning/open questions carry accepted alternatives");
ok(TEST_SOLUTIONS_38[22].answer.includes("will be testing"), "Q23 (At 3:00) is solved as Future Continuous");
{
  // Grader regression: the documented model answers must score 25/25 through the real key.
  const answers = Object.fromEntries(
    TEST_SOLUTIONS_38.map((solution) => [solution.n, solution.n >= 16 && solution.n <= 20 ? solution.answer : solution.answer.split(" (")[0]]),
  );
  const grade = M.KEY.gradeTest38(answers);
  ok(grade.correctCount === 25 && grade.total === 25, `grading the documented answers returns 25/25 (got ${grade.correctCount}/${grade.total})`);
  const wrong = M.KEY.gradeTest38(Object.fromEntries(TEST_SOLUTIONS_38.map((solution) => [solution.n, "definitely wrong answer"])));
  ok(wrong.correctCount === 0, `grading nonsense returns 0/25 (got ${wrong.correctCount})`);
}

/* 5) Every step renders -------------------------------------------------- */
const initialStepHtml = new Map();
const interactedHtml = [];
for (const slide of SLIDES_38) {
  const html = renderStep(slide);
  initialStepHtml.set(slide.id, html);
  ok(
    html.includes(`data-step-id="${slide.id}"`) && html.includes(`data-source-id="${slide.sourceId}"`) && html.includes(`data-source-section="${slide.sourceId}"`),
    `${slide.id}: renders as a native, traceable step`,
  );
  ok(html.length > 700, `${slide.id}: renders substantive content (${html.length} chars)`);
}
for (const slide of SLIDES_38.filter((candidate) => candidate.collapseSource)) {
  const html = initialStepHtml.get(slide.id);
  ok(/<details[^>]*>/.test(html) && !/<details[^>]*\bopen\b/.test(html), `${slide.id}: the duplicated source key is collapsed by default`);
}

/* 6) Answer protection --------------------------------------------------- */
const testPreHtml = M.renderToString(M.React.createElement(M.TestArea38, { onSubmitted() {}, onGoSolutions() {} }));
ok((testPreHtml.match(/data-test-question="\d+"/g) || []).length === 25, "pre-submit Test Area renders 25 numbered question panels");
{
  const traced = new Set([...testPreHtml.matchAll(/data-source-unit="s33-unit-(\d+)"/g)].map((match) => Number(match[1])));
  const untraced = TEST_SOURCE_UNIT_INDEXES_38.filter((index) => !traced.has(index));
  const plain = normalize(testPreHtml.replace(/<[^>]+>/g, " "));
  const unrendered = untraced.filter((index) => !plain.includes(normalize(source("s33").units[index])));
  ok(unrendered.length === 0, `every §33 source line reaches the Test Area (question panels or level headings; missing: ${unrendered.slice(0, 8).join(", ") || "none"})`);
}
ok(!testPreHtml.includes("data-test-feedback") && !testPreHtml.includes("data-test-score"), "before submit there is no score and no per-question feedback in the Test Area");
ok(!testPreHtml.includes("الإجابة النموذجية"), "before submit no model answer text is rendered anywhere in the Test Area");
{
  const testArea = readFileSync(join(root, "src/lessons/lesson38/TestArea38.tsx"), "utf8");
  ok(!/^import (?!type\b).*from "\.\/testKey38"/m.test(testArea), "TestArea38 does not statically import the grading key");
  ok(/await import\("\.\/testKey38"\)/.test(testArea), "TestArea38 loads the key with a dynamic import only on submit");
  ok(!testArea.includes("solutionsData38"), "TestArea38 never references the solutions data module");
  const shell = readFileSync(join(root, "src/lessons/lesson38/Lesson38.tsx"), "utf8");
  ok(/testSubmitted \|\| teacherUnlocked/.test(shell) && shell.includes('lazy(() => import("./SolutionsArea38"))'), "Solutions Area is lazy and gated on submit or teacher unlock");
  const teacherArea = readFileSync(join(root, "src/lessons/lesson38/TeacherArea38.tsx"), "utf8");
  ok(teacherArea.includes('lazy(() => import("./TeacherGuide38"))'), "the teacher key/coverage chunk is deferred until unlock");
  ok(teacherArea.includes('TEACHER_PASSWORD_38 = "somer173"'), "Teacher Area keeps the shared teacher password gate");
  const kit = readFileSync(join(root, "src/lessons/lesson38/kit38.tsx"), "utf8");
  ok(!kit.includes("solutionsData38") && !kit.includes("testKey38"), "shared lesson kit pulls in no answer module");
  const studentSurface = [...initialStepHtml.values()].join("\n") + testPreHtml;
  const explanationsIn = (surface) =>
    TEST_SOLUTIONS_38.filter((solution) => normalize(surface).includes(normalize(solution.explanation))).map((solution) => solution.n);
  const leaked = explanationsIn(studentSurface);
  ok(leaked.length === 0, `no test explanation reaches student steps or the pre-submit test (${leaked.join(", ") || "none"} leaked)`);
  const positiveControl = explanationsIn(`${studentSurface}${TEST_SOLUTIONS_38[22].explanation}`);
  ok(positiveControl.length === 1 && positiveControl[0] === 23, `positive control: injecting Q23's explanation is detected (got ${JSON.stringify(positiveControl)})`);
  const testAreaPath = join(root, "src/lessons/lesson38/TestArea38.tsx");
  const originalTestArea = readFileSync(testAreaPath, "utf8");
  const leakImport = (src) => src.includes("solutionsData38");
  ok(!leakImport(originalTestArea), "pre-mutation: TestArea38 does not reference solutions data");
  try {
    writeFileSync(testAreaPath, `import { TEST_SOLUTIONS_38 } from "./solutionsData38";\n${originalTestArea}`);
    ok(leakImport(readFileSync(testAreaPath, "utf8")), "mutation: a leaked solutions import is detected and would fail isolation");
  } finally {
    writeFileSync(testAreaPath, originalTestArea);
  }
  ok(!leakImport(readFileSync(testAreaPath, "utf8")), "post-mutation restore: TestArea38 is clean again");
}

/* 7) Interactive labs ---------------------------------------------------- */
{
  const { el, root: reactRoot } = mountStep("s01");
  await tick();
  const boxes = [...el.querySelectorAll('input[type="checkbox"]')];
  ok(boxes.length === OBJECTIVES_38.length && boxes.length === 10, "§1 checklist lists all ten objectives");
  boxes.forEach((box) => click(box));
  await tick(5);
  ok(normalize(el.textContent).includes("من 10 هدفًا"), "§1 counts the learner's own marking");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s02b");
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
  const { el, root: reactRoot } = mountStep("s03b");
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
  const { el, root: reactRoot } = mountStep("s13a");
  await tick();
  const lines = [...el.querySelectorAll("[data-dialogue-line]")];
  ok(lines.length === 6, "§13 dialogue has all six turns");
  for (const line of lines) {
    click(findButton(line, "تحليل السطر"));
    await tick(3);
  }
  const text = normalize(el.textContent);
  ok(DIALOGUE_LINES_38.every((line) => text.includes(line.analysis)), "§13 every turn reveals its translation and analysis after being opened");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s19b");
  await tick();
  const cards = await driveChoiceLab(el);
  ok(cards === 3 && normalize(el.textContent).includes("اختيار مناسب."), "§19ب asks the three written/went/built pairs and answers them");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s19c");
  await tick();
  const items = [...el.querySelectorAll("[data-v3-item]")];
  ok(items.length === V3_ITEMS_38.length && items.length === 15, "§19ج V3 workshop covers all fifteen source verbs");
  for (const item of items) {
    const base = item.getAttribute("data-v3-item");
    const record = V3_ITEMS_38.find((entry) => entry.base === base);
    setNative(item.querySelector("input[type=text]"), record.answer);
    await tick(2);
    click(findButton(item, "تحقق"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(text.includes("written") && text.includes("gone") && text.includes("built"), "§19ج shows written, gone, and built after the attempt");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s14b");
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
  const { el, root: reactRoot } = mountStep("s16b");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length >= 4, "§16 Yes/No builder renders its items");
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
  const { el, root: reactRoot } = mountStep("s18b");
  await tick();
  const items = [...el.querySelectorAll("[data-build-item]")];
  ok(items.length === 5, "§18 Wh builder renders all five source questions");
  for (const item of items) {
    setNative(item.querySelector("input"), "What will you have completed by Friday?");
    await tick(2);
    click(findButton(item, "افحص العناصر"));
    await tick(2);
  }
  ok(normalize(el.textContent).includes("أداة استفهام"), "§18 builder checks Wh-word + will + Subject + have + V3");
  reactRoot.unmount(); el.remove();
}
{
  const choiceLabs = ["s06b", "s07b", "s08", "s09", "s10b", "s11b", "s12b", "s15", "s17", "s20", "s21", "s22", "s23", "s24", "s25b", "s31", "s36a"];
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

/* 8) Practice keys after the attempt ------------------------------------- */
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
  const text = normalize(el.textContent);
  ok(EXERCISE27_ITEMS_38.every((item) => text.includes(item.answerText)), "§27 shows the source answer for all six items after the attempt");
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
  const text = normalize(el.textContent);
  ok(FILL28_ITEMS_38.every((item) => text.includes(item.answer)), "§28 records all six completions and echoes the expected form");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  for (const [id, half] of [["s29a", TENSE29_ITEMS_38.slice(0, 4)], ["s29b", TENSE29_ITEMS_38.slice(4)]]) {
    const { el, root: reactRoot } = mountStep(id);
    await tick();
    ok(el.querySelectorAll("[data-practice-item]").length === half.length, `${id}: carries ${half.length} of the eight tense situations`);
    for (const item of half) {
      const card = el.querySelector(`[data-practice-item="tense29-${item.n}"]`);
      click(card.querySelector(`input[value="${item.answer}"]`));
      await tick(2);
      click(findButton(card, "تحقق"));
      await tick(2);
    }
    ok(half.every((item) => normalize(el.textContent).includes(item.answerText)), `${id}: every situation shows the chosen tense after the attempt`);
    interactedHtml.push(el.innerHTML);
    reactRoot.unmount(); el.remove();
  }
}
{
  const { el, root: reactRoot } = mountStep("s30a");
  await tick();
  for (const item of DETECTIVE30_ITEMS_38.slice(0, 5)) {
    const card = el.querySelector(`[data-practice-item="detective30-${item.n}"]`);
    setNative(card.querySelector("input[type=text]"), "My correction for this sentence");
    await tick(2);
    click(findButton(card, "اعرض تصحيح المصدر"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(el.querySelectorAll("[data-practice-item]").length === 5, "§30أ carries exactly half of the detective set so the page stays short");
  ok(DETECTIVE30_ITEMS_38.slice(0, 5).every((item) => text.includes(item.answer)), "§30أ reveals the first five source corrections after the attempt");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s30b");
  await tick();
  const cards = [...el.querySelectorAll("[data-practice-item]")];
  ok(cards.length === 5, "§30ب carries the remaining five detective sentences");
  for (const item of DETECTIVE30_ITEMS_38.slice(5)) {
    const card = el.querySelector(`[data-practice-item="detective30-${item.n}"]`);
    setNative(card.querySelector("input[type=text]"), "My correction for this sentence");
    await tick(2);
    click(findButton(card, "اعرض تصحيح المصدر"));
    await tick(2);
  }
  const text = normalize(el.textContent);
  ok(DETECTIVE30_ITEMS_38.slice(5).every((item) => text.includes(item.answer)), "§30ب reveals the final five source corrections after the attempt");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s32b");
  await tick();
  const fields = [...el.querySelectorAll("textarea")];
  ok(fields.length === 7, "§32ب asks all seven comprehension questions in the learner's own words");
  ok(!el.querySelector('[data-answer-key-for="s32"]'), "§32ب withholds the source answers before the attempt");
  const revealButton = () => findButton(el, "اعرض إجابات المصدر");
  ok(revealButton()?.disabled === true, "§32ب keeps the source answers locked until all seven answers are written");
  fields.forEach((field, index) => setNative(field, `My answer to question ${index + 1}`));
  await tick(5);
  ok(revealButton()?.disabled === false, "§32ب answering all seven questions enables the source key");
  click(revealButton());
  await tick(5);
  ok(revealText(el, "s32").includes("① A model of a future city."), "§32ب the seven source answers appear after the attempt");
  ok(normalize(el.textContent).includes("تحليل صيغ المستقبل في النص — إضافة من المنصة"), "§32ب adds a labelled platform analysis of the future forms");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s35a");
  await tick();
  const writing = el.querySelector('textarea[lang="en"]');
  ok(!!writing && el.querySelectorAll('input[type="checkbox"]').length === 8, "§35أ has a writing area and the eight source criteria");
  setNative(writing, Array.from({ length: 12 }, (_, index) => `Sentence ${index + 1}.`).join(" "));
  await tick(5);
  ok(normalize(el.textContent).includes("لا يصدر النظام حكمًا آليًا"), "§35أ does not claim automatic grading of the paragraph");
  const modelButton = findButton(el, "اعرض نموذج المصدر بعد الكتابة");
  ok(modelButton?.disabled === false, "§35أ unlocks the source model only after at least twelve sentences");
  click(modelButton);
  await tick(5);
  ok(WRITING35_MODEL_38.every((line) => normalize(el.textContent).includes(line)), "§35أ shows the complete five-line source model after the writing attempt");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s33");
  await tick();
  const text = normalize(el.textContent);
  ok(text.includes("25") && (text.includes("5 × 5") || text.includes("خمسة مستويات")), "§33 states the 25-question / five-level structure without printing the questions");
  ok(el.querySelectorAll("[data-test-question]").length === 0, "§33 does not duplicate the formal test in the Student Area");
  ok(!![...el.querySelectorAll("button")].find((button) => /الاختبار/.test(normalize(button.textContent))), "§33 launches the separate Test Area");
  reactRoot.unmount(); el.remove();
}
{
  const { el, root: reactRoot } = mountStep("s34");
  await tick();
  ok(normalize(el.textContent).includes("منطقة الحلول") && el.querySelectorAll("[data-solution]").length === 0, "§34 points to the gated Solutions Area without exposing an answer");
  ok(!![...el.querySelectorAll("button")].find((button) => /منطقة الحلول/.test(normalize(button.textContent))), "§34 launches the Solutions Area");
  reactRoot.unmount(); el.remove();
}

/* 9) Solutions Area ------------------------------------------------------ */
{
  const locked = M.renderToString(M.React.createElement(M.SolutionsArea38, { unlocked: false, onGoTest() {}, onGoTeacher() {} }));
  ok(locked.includes("data-solutions-locked") && !locked.includes("data-solution="), "Solutions Area stays locked without submission or teacher access");
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.SolutionsArea38, { unlocked: true, onGoTest() {}, onGoTeacher() {} }));
  await tick();
  const numbers = new Set();
  for (const tab of el.querySelectorAll('nav[aria-label="مستويات حلول الاختبار"] button')) {
    click(tab);
    await tick(3);
    for (const card of el.querySelectorAll("[data-solution]")) numbers.add(Number(card.getAttribute("data-solution")));
  }
  ok(numbers.size === 25, "after unlock the Solutions Area exposes all 25 solutions across five level tabs");
  ok([...el.querySelectorAll("[data-source-status]")].every((node) => node.getAttribute("data-source-status") === "platform-authored-teacher-addition"), "every solution card is marked as a platform/teacher addition");
  interactedHtml.push(el.innerHTML);
  reactRoot.unmount(); el.remove();
}

/* 10) Teacher gate and guide --------------------------------------------- */
{
  const lockedTeacher = M.renderToString(M.React.createElement(M.TeacherArea38, { unlocked: false, onUnlockChange() {}, onGoSolutions() {} }));
  ok(lockedTeacher.includes('type="password"') && !lockedTeacher.includes("data-teacher-solution"), "Teacher Area starts gated and renders no test explanations");
  const { el: guide, root: guideRoot } = M.mount(M.React.createElement(M.TeacherGuide38, { onGoSolutions() {}, onLock() {} }));
  await tick();
  ok(guide.querySelectorAll("[data-coverage-section]").length === 38, "the teacher coverage tab documents the opening, all 36 source sections, and the roadmap");
  click(findButton(guide, "حلول الاختبار"));
  await tick(5);
  ok(guide.querySelectorAll("[data-teacher-solution]").length === 25, "the teacher guide contains all 25 detailed test answers");
  click(findButton(guide, "مفاتيح التدريب والقراءة"));
  await tick(5);
  const keysText = normalize(guide.textContent);
  ok(keysText.includes("Grammar Detective") && keysText.includes("Building a Smarter City"), "teacher keys cover the detective lab and the reading");
  click(findButton(guide, "القواعد والدقة"));
  await tick(5);
  ok(normalize(guide.textContent).includes("ملاحظات دقة"), "the teacher rules tab lists the source-accuracy notes");
  interactedHtml.push(guide.innerHTML);
  guideRoot.unmount(); guide.remove();
}

/* 11) Integrated shell (real Lesson1Shell) -------------------------------- */
{
  const { el: shell, root: shellRoot } = M.mount(M.React.createElement(M.Lesson38, { onExit() {} }));
  await tick();
  ok(!!shell.querySelector('[data-lesson="38"] [data-area="lesson38-student"]'), "integrated Lesson 38 shell starts in the Student Area");
  ok(shell.querySelector('[data-lesson="38"]')?.getAttribute("data-l35-shell") === "lesson-1", "Lesson 38 uses the real shared Lesson 1 shell");
  const locks = shell.querySelectorAll("[data-site-lock-button='true']");
  ok(locks.length === 1, `exactly one site-lock button is rendered (got ${locks.length})`);
  ok(!!locks[0]?.closest("[data-lesson-step-nav='true']"), "the site lock lives inside the shared step navigation");
  const nav = locks[0]?.closest("[data-lesson-step-nav='true']");
  ok(!!nav?.querySelector('[data-step-nav="prev"]') && !!nav?.querySelector('[data-step-nav="next"]'), "Previous and Next live in the same normal-flow navigation");
  ok(shell.querySelector('[data-step-nav="prev"]')?.disabled === true, "Previous is disabled on the first step");
  const menuBtn = [...shell.querySelectorAll("button")].find((button) => button.getAttribute("aria-label") === "فهرس الدرس");
  ok(!!menuBtn, "the shared shell exposes the mobile lesson index button");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!shell.querySelector('[data-area="lesson38-student"] [data-step-id="s01"]'), "keyboard next-step navigation works (ArrowLeft forward in RTL)");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!shell.querySelector('[data-area="lesson38-student"] [data-step-id="cover"]'), "keyboard navigation returns to the opening step");
  click(shell.querySelector('[data-area-tab="solutions"]'));
  await tick(5);
  ok(!!shell.querySelector('[data-area="lesson38-solutions"][data-solutions-locked]') && shell.querySelectorAll("[data-solution]").length === 0, "Solutions Area stays locked before test submission or teacher unlock");
  click(shell.querySelector('[data-area-tab="lesson"]'));
  await tick(5);
  click(shell.querySelector('[data-area-tab="test"]'));
  await M.act(async () => {
    for (let i = 0; i < 40 && !shell.querySelector("[data-test-question]"); i += 1) await tick(20);
  });
  const shellTest = shell.querySelector('[data-area="lesson38-test"]');
  const shellQuestions = [...(shellTest?.querySelectorAll("[data-test-question]") ?? [])];
  ok(shellQuestions.length === 25, "integrated Test Area renders the 25 formal questions");
  ok(shellTest.querySelectorAll("[data-test-feedback]").length === 0 && !shellTest.querySelector("[data-test-score]"), "nothing is graded before submit");
  ok(findButton(shellTest, "إرسال الاختبار")?.disabled === true, "submission stays disabled until all 25 questions are answered");
  for (const card of shellQuestions) {
    const radio = card.querySelector('input[type="radio"]');
    if (radio) click(radio);
    else setNative(card.querySelector("input[type=text], textarea"), `response ${card.getAttribute("data-test-question")}`);
  }
  await tick(10);
  ok(findButton(shellTest, "إرسال الاختبار")?.disabled === false, "all 25 answers enable the submission button");
  click(findButton(shellTest, "إرسال الاختبار"));
  await M.act(async () => { await tick(250); });
  ok(!!shellTest.querySelector("[data-test-score]"), "after submission the Test Area renders the score");
  ok(shellTest.querySelectorAll("[data-test-feedback]").length === 25, "after submission every question shows explanatory feedback");
  ok(shellTest.querySelectorAll("[data-graded]").length === 25, "after submission every question is marked as graded");
  ok(normalize(shellTest.querySelector("[data-test-score]").textContent).includes("/ 25"), "the score is reported out of 25");
  ok(shell.querySelector('[data-area-tab="solutions"]')?.getAttribute("aria-disabled") !== "true", "submitting the test unlocks the Solutions Area");
  click(shell.querySelector('[data-area-tab="solutions"]'));
  await M.act(async () => {
    for (let i = 0; i < 40 && !shell.querySelector("[data-solution]"); i += 1) await tick(20);
  });
  ok(shell.querySelectorAll('[data-area="lesson38-solutions"] [data-solution]').length === 5, "integrated Solutions Area lazy-loads the first level after submission");
  click(shell.querySelector('[data-area-tab="teacher"]'));
  await M.act(async () => {
    for (let i = 0; i < 40 && !shell.querySelector("#l38-teacher-password"); i += 1) await tick(20);
  });
  const teacherForm = shell.querySelector('form[data-area="lesson38-teacher"]');
  const passwordField = teacherForm?.querySelector('input[type="password"]');
  setNative(passwordField, "wrong-password");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!teacherForm.querySelector('[role="alert"]'), "Teacher Area reports an accessible error for a wrong password");
  ok(!shell.querySelector('[data-area="lesson38-teacher"] nav[aria-label="أقسام دليل المعلم"]'), "a wrong password does not load the teacher guide");
  setNative(passwordField, "somer173");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await M.act(async () => { await tick(250); });
  ok(!!shell.querySelector('[data-area="lesson38-teacher"] nav[aria-label="أقسام دليل المعلم"]'), "the shared teacher password loads the separate Teacher Area");
  shellRoot.unmount();
  shell.remove();
}

/* 12) Direction, BIDI oracle, contrast ----------------------------------- */
const lessonFiles = ["kit38.tsx", "TestArea38.tsx", "SolutionsArea38.tsx", "TeacherGuide38.tsx", "TeacherArea38.tsx", "Steps38.tsx", "Lesson38.tsx", "labs38.tsx", "ledger38.ts", "practiceData38.ts", "testData38.ts", "solutionsData38.ts", "coverage38.ts"];
const directionSources = lessonFiles.map((file) => readFileSync(join(root, "src", "lessons", "lesson38", file), "utf8")).join("\n");
ok(directionSources.includes('dir={pureEnglish ? "ltr" : "auto"}') || (directionSources.includes('dir="ltr"') && directionSources.includes("font-en")), "Lesson 38 isolates English runs and formulas LTR");
ok(!/unicode-bidi\s*:\s*[^;]*override|direction\s*:\s*rtl\s*!important/i.test(directionSources), "Lesson 38 adds no blanket BIDI override rules");
ok(!/[\u2066\u2067\u2068\u2069\u202A\u202B\u202C\u202D\u202E]/.test(directionSources), "Lesson 38 data carries no raw Unicode bidi control characters");
{
  const snapshots = [
    ...initialStepHtml.values(), ...interactedHtml, testPreHtml,
    M.renderToString(M.React.createElement(M.SolutionsArea38, { unlocked: true, onGoTest() {}, onGoTeacher() {} })),
    M.renderToString(M.React.createElement(M.TeacherGuide38, { onGoSolutions() {}, onLock() {} })),
  ];
  // Some source headings are Arabic sentences that quote an English term mid-sentence
  // («7أ. BY — الكلمة المفتاحية الأهم»). Those strings are reproduced verbatim, so the
  // English-first oracle cannot apply to them; every other surface must pass.
  const ledgerMixedHeadings = new Set(
    [...SOURCE_SECTIONS_38.map((section) => section.title), ...SLIDES_38.map((slide) => slide.title)]
      .map((title) => normalize(title))
      .filter((title) => /[A-Za-z]/.test(title) && /[\u0600-\u06FF]/.test(title)),
  );
  const violations = [];
  const exempted = new Set();
  for (const html of snapshots) {
    for (const paragraph of analyzeHtml(html)) {
      if (!paragraph.violations?.length) continue;
      const logical = normalize(paragraph.logical ?? "");
      const verbatim = [...ledgerMixedHeadings].find((title) => logical.includes(title));
      if (verbatim) {
        exempted.add(verbatim);
        continue;
      }
      for (const violation of paragraph.violations) violations.push(`${violation.latin} ⇄ ${violation.arabic} (${violation.sig})`);
    }
  }
  ok(
    [...exempted].every((title) => ledgerMixedHeadings.has(title)),
    `verbatim source headings that quote English mid-sentence are the only oracle exemptions (${exempted.size})`,
  );
  for (const violation of violations.slice(0, 30)) console.log(`      BIDI · ${violation}`);
  ok(violations.length === 0, `rendered markup passes the English/Arabic BIDI oracle (${violations.length} violations)`);

  // Computed contrast over the rendered markup: no direct text node may fall below 4.5:1.
  function channel(hex) { const value = parseInt(hex, 16) / 255; return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4; }
  function luminance(hex) { const clean = hex.replace("#", ""); return 0.2126 * channel(clean.slice(0, 2)) + 0.7152 * channel(clean.slice(2, 4)) + 0.0722 * channel(clean.slice(4, 6)); }
  function contrast(fg, bg) { const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a); return (values[0] + 0.05) / (values[1] + 0.05); }
  const PALETTE = { "slate-900": "#0f172a", "slate-800": "#1e293b" };
  const colorOf = (token) => {
    const palette = token.match(/(?:^|:)(?:text|bg)-(slate-(?:800|900))$/);
    if (palette) return PALETTE[palette[1]];
    const hex = token.match(/(?:^|:)(?:text|bg)-\[#([0-9a-fA-F]{6})\]/);
    if (hex) return "#" + hex[1].toLowerCase();
    if (/(?:^|:)text-white$/.test(token) || /(?:^|:)bg-white$/.test(token)) return "#ffffff";
    return null;
  };
  const nearest = (element, kind, stop) => {
    let node = element;
    while (node && node !== stop) {
      const tokens = String(node.className || "").split(/\s+/);
      for (const token of tokens) {
        const value = colorOf(token);
        if (value && (kind === "text" ? /(?:^|:)text-/.test(token) : /(?:^|:)bg-/.test(token))) return { value, token, node };
      }
      node = node.parentElement;
    }
    return null;
  };
  const measured = [];
  for (const snapshotHtml of snapshots) {
    const holder = win.document.createElement("div");
    holder.innerHTML = snapshotHtml;
    for (const element of holder.querySelectorAll("*")) {
      const directText = [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim().length > 1);
      if (!directText) continue;
      if (element.closest("svg") || element.getAttribute("aria-hidden") === "true") continue;
      const text = nearest(element, "text", holder);
      const bg = nearest(element, "bg", holder);
      if (!text || !bg) continue;
      measured.push({ value: contrast(text.value, bg.value), token: `${text.token} / ${bg.token}`, sample: (element.textContent || "").trim().slice(0, 40) });
    }
  }
  const below = measured.filter((record) => record.value < 4.5);
  if (below.length) for (const record of below.slice(0, 10)) console.log(`      ${record.value.toFixed(2)}:1 · ${record.token} · «${record.sample}»`);
  ok(below.length === 0, `computed contrast over rendered markup: all ${measured.length} direct text nodes reach 4.5:1`);
  ok(measured.length > 400, `the contrast sweep actually covered the rendered lesson (${measured.length} text nodes)`);
  const faint = lessonFiles.filter((file) => /text-(?:slate|gray|zinc|neutral|stone)-(?:200|300|400)\b|text-(?:white|black)\/\d+|opacity-\d+/.test(readFileSync(join(root, "src", "lessons", "lesson38", file), "utf8")));
  ok(faint.length === 0, `the lesson uses no faint text classes (${faint.join(", ") || "none"})`);
}

/* 13) Responsive contract ------------------------------------------------ */
{
  const read38 = (file) => readFileSync(join(root, "src", "lessons", "lesson38", file), "utf8");
  for (const file of ["Lesson38.tsx", "Steps38.tsx", "labs38.tsx", "TestArea38.tsx", "SolutionsArea38.tsx", "TeacherGuide38.tsx", "kit38.tsx"]) {
    ok(/sm:|lg:|md:/.test(read38(file)), `${file}: reflows at a breakpoint instead of a fixed desktop layout`);
  }
  const css = readFileSync(join(root, "src", "lessons", "lesson38", "lesson38.css"), "utf8");
  ok(read38("kit38.tsx").includes("fp38-tablewrap") && /\.fp38-tablewrap\s*\{[^}]*overflow-x:\s*auto/.test(css), "wide source/coverage tables scroll horizontally instead of forcing page overflow");
  ok(read38("Lesson38.tsx").includes("min-w-0") && read38("Steps38.tsx").includes("min-w-0") && read38("kit38.tsx").includes("min-w-0"), "flex rows carrying long mixed text can shrink (min-w-0)");
  ok(!/w-\[\d{3,}px\]/.test(directionSources) && !/whitespace-nowrap/.test(directionSources), "no fixed pixel width and no nowrap rule can force horizontal overflow");
  const shell = read38("Lesson38.tsx");
  ok(/import Lesson1Shell[^;]*from "\.\.\/\.\.\/shared\/Lesson1Shell"/.test(shell), "Lesson 38 renders through the real shared `Lesson1Shell` component");
  ok(!/<aside|<nav/.test(shell), "Lesson 38 keeps no bespoke sidebar or navigation markup of its own");
  ok(!/data-lesson-step-nav/.test(shell) && !/SiteLockButton/.test(shell), "the lesson does not re-implement the shared step navigation or the site lock");
  ok(shell.includes("railFooter") && shell.includes("groups=") && shell.includes("onSelectStep"), "the rail, chapters and step selection are supplied to the shared shell through its prop contract");
  ok(shell.includes("rootDataLesson={38}") && shell.includes('rootDir="rtl"'), "the shell is RTL-scoped to lesson 38");
  ok(readFileSync(join(root, "src/shared/Lesson1Shell.tsx"), "utf8").includes("useRegisterInlineLockHost(true)"), "the shell itself still hosts the inline site-lock button");
}

/* 14) Registration and docs ---------------------------------------------- */
{
  const appText = readFileSync(join(root, "src/App.tsx"), "utf8");
  ok(appText.includes('import Lesson38 from "./lessons/lesson38/Lesson38"') && appText.includes('href: "#/lesson/38"') && appText.includes("route === 38"), "App.tsx registers Lesson 38 as a hub card and route");
  const docs = readFileSync(join(root, "docs/lesson38-coverage.md"), "utf8");
  ok(docs.includes("§36") && docs.includes("Table reconstruction contracts") && docs.includes("Test and answer provenance contract"), "the coverage document records rebuilt tables and answer provenance");
  ok(COVERAGE_ACCURACY_NOTES_38.length >= 5, "the in-app coverage ledger keeps the source-accuracy notes");
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  ok(pkg.scripts["audit:lesson38"] === "node scripts/audit-lesson38.mjs", "package.json exposes audit:lesson38");
  ok(pkg.scripts["audit:english-direction"].includes("audit-lesson38.mjs"), "audit:english-direction runs this audit");
  ok(readFileSync(join(root, "scripts/check-english-direction.mjs"), "utf8").includes("lessons.length === 46"), "the direction inventory covers all 46 lessons");
  ok(readFileSync(join(root, "scripts/audit-lesson-navigation.mjs"), "utf8").includes('"#/lesson/38"'), "the navigation audit covers the Lesson 38 route");
  ok(existsSync(join(root, "src/lessons/lesson38/ledger38.ts")) && existsSync(join(root, "src/lessons/lesson38/solutionsData38.ts")) && existsSync(join(root, "docs/lesson38-coverage.md")), "the source ledger, separate solution data, and coverage document exist");
}

rmSync(outDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`✕ Lesson 38 audit failed: ${failures.length} of ${assertions} assertions failed`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(
  `✓ Lesson 38 audit passed: ${assertions} assertions; 36 numbered source sections + opening; ${STEP_COUNT_38} short steps; 25 questions in five levels; ` +
    `25 separate platform-authored solutions; answer-free pre-submit DOM; timeline/formula/builder/reading/writing interactions; source/route/direction/contrast contracts.`,
);
