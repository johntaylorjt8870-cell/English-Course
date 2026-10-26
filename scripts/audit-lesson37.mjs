// ============================================================
// Lesson 37 — Future Horizon (Bright Time Observatory) audit
//
// يتحقق من التجربة المصيَّرة فعليًا (jsdom) لا من العناوين فقط:
//   1. دفتر المصدر: المقدمة + 38 قسمًا مرقّمًا، وكل قسم يظهر في خطوة واحدة أو أكثر؛
//   2. خريطة الخطوات: 49 خطوة قصيرة، فصول تغطي كل خطوة مرة واحدة، وترتيب المصدر محفوظ؛
//   3. نقل المحتوى: أسطر المصدر الحرفية والجداول المُعاد بناؤها؛
//   4. الاختبار: 25 سؤالًا / 5 مستويات، وكل سطر من §34 مستهلك مرة واحدة؛
//   5. محرّك التصحيح: 25/25 للنماذج، 0/25 للفراغ، وقبول الصيغ المكافئة؛
//   6. الحياد قبل الإرسال: لا درجة ولا ✓/✕ ولا تفسير ولا استيراد لمفتاح الحلول؛
//   7. بعد الإرسال: نتيجة + تفسير وسبب لكل سؤال؛
//   8. الفصل بين الطالب والاختبار والحلول والمعلم، وبوابة كلمة المرور؛
//   9. عدم وجود Knowledge Card، وقفل موقع واحد، وتنقل سابق/تالي؛
//  10. عزل RTL/LTR، ومُحلِّل BIDI على HTML المصيَّر، وتباين WCAG AA محسوب؛
//  11. التسجيل في App.tsx وpackage.json والوثائق.
//
// Run: npm run audit:lesson37
// ============================================================
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
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
import * as GRADING from ${JSON.stringify(join(root, "src/lessons/lesson37/grading37.ts"))};
import * as SOLUTIONS from ${JSON.stringify(join(root, "src/lessons/lesson37/solutionsData37.ts"))};
import Lesson1Shell from ${JSON.stringify(join(root, "src/shared/Lesson1Shell.tsx"))};
import * as COVERAGE from ${JSON.stringify(join(root, "src/lessons/lesson37/coverage37.ts"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); const root = createRoot(el); act(() => root.render(node)); return { el, root: { unmount() { act(() => root.unmount()); } } }; }
export { React, act, createRoot, renderToString, Lesson37, StepView37, TestArea37, TeacherArea37, SolutionsArea37, TeacherGuide37, Lesson1Shell, LEDGER, DATA, PRACTICE, TEST, GRADING, SOLUTIONS, COVERAGE, mount };
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

const { SOURCE_SECTIONS_37, NUMBERED_SECTIONS_37, TIMELINE_ROWS_37, PRONOUN_ROWS_37, CONTINUOUS_ROWS_37, TIME_EXPRESSION_ROWS_37, sourceSection37 } = M.LEDGER;
const { SLIDES_37, STEP_COUNT_37, CHAPTERS_37, LESSON_SUBTITLE_37, LESSON_ARABIC_SUBTITLE_37 } = M.DATA;
const { TEST_LEVELS_37, TEST_37, TEST_COUNT_37, TEST_LEVEL_COUNT_37, TEST_INTRO_37, TEST_SOURCE_UNIT_INDEXES_37, TEST_SOURCE_UNIT_TOTAL_37 } = M.TEST;
const { gradeTest37, gradeQuestion37, MEANING_BASED_37 } = M.GRADING;
const { ANSWER_SPECS_37, TEST_SOLUTIONS_37 } = M.SOLUTIONS;
const {
  OBJECTIVES_37, ING_ITEMS_37, EXERCISE28_ITEMS_37, TRANSFORM29_ITEMS_37, DETECTIVE30_ITEMS_37, IQ200_ITEMS_37,
  READING32_QUESTIONS_37, READING32_ANALYSIS_37, WRITING36_CRITERIA_37, WRITING36_MODEL_37, DIALOGUE_LINES_37,
  POLITE_ITEMS_37, MEANING_LAB_37, MOMENT_ITEMS_37, TIME_EXPRESSION_ITEMS_37, TWO_EVENTS_ITEMS_37,
  WHEN_ITEMS_37, WHILE_ITEMS_37, ROUTINE_ITEMS_37, NEGATIVE_ERROR_ITEMS_37, SHORT_ANSWER_ITEMS_37,
  WHO_ROLE_ITEMS_37, STATE_VERB_ITEMS_37, CONTINUOUS_SELECT_37, ADVANCED33_ITEMS_37,
} = M.PRACTICE;
const { COVERAGE_37, COVERAGE_SECTION_COUNT_37, COVERAGE_ACCURACY_NOTES_37 } = M.COVERAGE;

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
const decodeEntities = (value) =>
  String(value ?? "")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const normalize = (value) => decodeEntities(value).replace(/\s+/g, " ").trim();
const source = (id) => {
  const section = sourceSection37(id);
  if (!section) throw new Error(`Missing source section ${id}`);
  return section;
};
const renderStep = (slide) => M.renderToString(M.React.createElement(M.StepView37, { slide, onGoTest() {}, onGoSolutions() {} }));
const mountStep = (slide) => M.mount(M.React.createElement(M.StepView37, { slide, onGoTest() {}, onGoSolutions() {} }));
const findButton = (scope, text) => [...scope.querySelectorAll("button")].find((button) => normalize(button.textContent).includes(text));

/* ---------------------------------------------------------------- 1) المصدر والخطوات */
ok(SOURCE_SECTIONS_37.length === 39, `ledger keeps the opening + 38 numbered sections (got ${SOURCE_SECTIONS_37.length})`);
ok(
  NUMBERED_SECTIONS_37.length === 38 && NUMBERED_SECTIONS_37.every((section, index) => section.num === index + 1 && section.id === `s${String(index + 1).padStart(2, "0")}`),
  "all 38 numbered source sections exist once, in original order",
);
ok(!sourceSection37("s39"), "no fabricated section beyond the supplied 38");
ok(SOURCE_SECTIONS_37.every((section, index) => section.order === index && section.title && section.units.length > 0), "every section is ordered, titled, and non-empty");

ok(STEP_COUNT_37 === 58 && SLIDES_37.length === 58, `the student sequence has 58 short steps (got ${STEP_COUNT_37})`);
ok(new Set(SLIDES_37.map((slide) => slide.id)).size === STEP_COUNT_37, "step ids are unique");
ok(SLIDES_37.every((slide, index) => slide.step === index + 1), "step numbers follow the rendered order");
ok(SLIDES_37.every((slide) => sourceSection37(slide.sourceId)), "every step cites an existing source section");
ok(
  SLIDES_37.every((slide, index) => index === 0 || slide.sourceOrder >= SLIDES_37[index - 1].sourceOrder),
  "source order is never reverted across every step",
);
const coveredSources = new Set(SLIDES_37.map((slide) => slide.sourceId));
ok(coveredSources.size === 39, `all 39 source entries are represented by at least one step (got ${coveredSources.size})`);
ok(CHAPTERS_37.length === 11, `eleven navigation chapters (got ${CHAPTERS_37.length})`);
ok(
  CHAPTERS_37.flatMap((chapter) => chapter.stepIds).join("|") === SLIDES_37.map((slide) => slide.id).join("|"),
  "chapters group every step exactly once and in order",
);
ok(CHAPTERS_37.every((chapter) => chapter.stepIds.length > 0), "no empty chapter");
const splitSections = [...new Set(SLIDES_37.filter((slide) => slide.part !== "full").map((slide) => slide.sourceId))];
ok(splitSections.length >= 8, `long sections are split across short steps (${splitSections.length} split sections: ${splitSections.join(", ")})`);
ok(
  splitSections.every((id) => SLIDES_37.filter((slide) => slide.sourceId === id && slide.part !== "full").length === 2),
  "each split section has exactly an A and a B step",
);

/* ---------------------------------------------------------------- 2) محتوى المصدر الحرفي */
ok(source("cover").units.some((line) => line.includes(LESSON_SUBTITLE_37)) && source("cover").units.some((line) => line.includes(LESSON_ARABIC_SUBTITLE_37)), "cover keeps the English and Arabic subtitles");
ok(["WILL", "BE GOING TO", "WILL vs BE GOING TO"].every((name) => source("cover").units.some((line) => line.includes(name))), "cover links the three previous lessons");
ok(
  source("s01").units.slice(1).length === 10 &&
    source("s01").units.slice(1).every((line, index) => line.startsWith("①②③④⑤⑥⑦⑧⑨⑩"[index])),
  "§1 keeps all ten numbered objectives",
);
ok(
  TIMELINE_ROWS_37.map((row) => row.join("=")).join("|") === "6:00=بداية الدراسة|7:00=أثناء الدراسة|9:00=نهاية الدراسة",
  "§2 timeline keeps the exact three source moments",
);
ok(PRONOUN_ROWS_37.map((row) => row[0]).join(",") === "I,You,He,She,It,We,They", "§5 pronoun table keeps the seven subjects");
ok(TIME_EXPRESSION_ROWS_37.length === 7, "§8 keeps all seven time expressions");
ok(CONTINUOUS_ROWS_37.map((row) => row[1]).join("|") === "am/is/are + V-ing|was/were + V-ing|will be + V-ing", "§26 comparison table keeps the three continuous forms");
ok(source("s03").units.includes("Subject + will + be + V-ing"), "§3 keeps the exact core formula");
ok(source("s12").units.some((line) => line.includes("When you will arrive, I will be studying. ❌")), "§12 keeps the wrong time-clause form");
ok(source("s12").units.some((line) => line.includes("When will you arrive? ✅")), "§12 keeps the direct-question contrast");
ok(source("s19").units.filter((line) => line.includes("❌")).length === 4, "§19 keeps the four negative error pairs");
ok(source("s25").units.filter((line) => line.includes("❌")).length === 2, "§25 keeps both stative-verb errors");
ok(source("s34").units.length === 65, `§34 has its 65 source lines (got ${source("s34").units.length})`);
ok(source("s35").units.length === 3 && !source("s35").revealUnits, "§35 is preserved as heading + prompt, and the source key really is absent");
ok(source("s36").units[1].includes("12 إلى 15"), "§36 keeps the 12–15 sentence task");
ok(source("s38").units.some((line) => line.includes("By 8:00 tomorrow, I will have finished my homework.")), "§38 keeps the Lesson 38 preview example");

/* ---------------------------------------------------------------- 3) الاختبار والتصحيح */
ok(TEST_COUNT_37 === 25 && TEST_LEVEL_COUNT_37 === 5, "the formal test has 25 questions in 5 levels");
ok(TEST_LEVELS_37.every((level) => level.questions.length === 5), "each level has exactly five questions");
ok(TEST_LEVELS_37.map((level) => `${level.questions[0].n}-${level.questions[level.questions.length - 1].n}`).join("|") === "1-5|6-10|11-15|16-20|21-25", "level boundaries are 1-5 · 6-10 · 11-15 · 16-20 · 21-25");
ok(TEST_37.every((question, index) => question.n === index + 1), "questions are numbered Q1–Q25 in order");
ok(TEST_SOURCE_UNIT_TOTAL_37 === 65 && TEST_SOURCE_UNIT_INDEXES_37.length === 65 && TEST_SOURCE_UNIT_INDEXES_37.every((value, index) => value === index), "every §34 line is consumed exactly once");
ok(TEST_LEVELS_37[0].questions.every((question) => question.options?.length === 3), "Level 1 keeps three options per question");
ok(TEST_LEVELS_37[4].questions.at(-1).fieldLabel?.includes("الصديقة"), "Level 5 keeps the friend's question as its own field");
ok(TEST_INTRO_37.length === 2, "the two source instruction lines are traced");

const modelAnswers = Object.fromEntries(
  TEST_37.map((question) => {
    if (question.options) {
      const letter = TEST_SOLUTIONS_37.find((solution) => solution.n === question.n).answer.slice(0, 1);
      return [question.n, letter];
    }
    return [question.n, TEST_SOLUTIONS_37.find((solution) => solution.n === question.n).answer];
  }),
);
const full = gradeTest37(TEST_37, modelAnswers, ANSWER_SPECS_37);
ok(full.correctCount === 25 && full.percentage === 100, `the grading key grades its 25 model answers as 25/25 (got ${full.correctCount}/25)`);
ok(
  TEST_37.filter((question) => !full.results[question.n].isCorrect).length === 0,
  `no model answer is rejected by its own key (${TEST_37.filter((question) => !full.results[question.n].isCorrect).map((q) => q.n).join(", ") || "clean"})`,
);
const empty = gradeTest37(TEST_37, {}, ANSWER_SPECS_37);
ok(empty.correctCount === 0, `empty answers grade 0/25 (got ${empty.correctCount})`);
ok(gradeQuestion37(TEST_37[5], "the children will be sleeping", ANSWER_SPECS_37).isCorrect, "Q6 accepts the full-sentence equivalent");
ok(gradeQuestion37(TEST_37[8], "She will not be working at 5:00 tomorrow.", ANSWER_SPECS_37).isCorrect, "Q9 accepts 'will not' as an equivalent of won't");
ok(gradeQuestion37(TEST_37[10], "I will study tomorrow morning.", ANSWER_SPECS_37).isCorrect, "Q11 accepts the minimal repair without be");
ok(gradeQuestion37(TEST_37[13], "When he arrives, I will be sleeping.", ANSWER_SPECS_37).isCorrect, "Q14 accepts the full repaired sentence");
ok(!gradeQuestion37(TEST_37[13], "When he will arrive, I will be sleeping.", ANSWER_SPECS_37).isCorrect, "Q14 rejects the uncorrected time clause");
ok(gradeQuestion37(TEST_37[15], "الأولى حدث مستقبلي عام والثانية نشاط جارٍ عند الساعة 8:00", ANSWER_SPECS_37).isCorrect, "Q16 grades meaning, not wording");
ok(gradeQuestion37(TEST_37[17], "لا، نستخدم present simple بعد when الزمنية", ANSWER_SPECS_37).isCorrect, "Q18 grades the 'no' answer in Arabic + English");
ok(!gradeQuestion37(TEST_37[5], "will be work", ANSWER_SPECS_37).isCorrect, "Q6 rejects the wrong V-ing form");
ok(TEST_SOLUTIONS_37.length === 25 && TEST_SOLUTIONS_37.every((solution, index) => solution.n === index + 1), "25 detailed solutions exist in order");
ok(TEST_SOLUTIONS_37.every((solution) => solution.sourceStatus === "platform-authored-teacher-addition"), "every solution is labelled platform/teacher-authored");
ok(TEST_SOLUTIONS_37.every((solution) => solution.answer && solution.explanation.length > 30), "every solution carries an answer and reasoning");
/* ---- عقد مفتاح التصحيح: 25 سؤالًا ↔ 25 مدخلًا في المفتاح ---- */
ok(Object.keys(ANSWER_SPECS_37).length === 25 && TEST_37.every((question) => ANSWER_SPECS_37[question.n]), "the grading key has exactly one entry per test question (25/25)");
ok(
  TEST_SOLUTIONS_37.every((solution) => TEST_37.some((question) => question.n === solution.n) && ANSWER_SPECS_37[solution.n]),
  "every teacher-key entry maps onto an existing test question and onto the grading key",
);
ok(
  TEST_SOLUTIONS_37.every((solution) => solution.answer === ANSWER_SPECS_37[solution.n].modelAnswer && solution.explanation === ANSWER_SPECS_37[solution.n].explanation),
  "the solutions area and the teacher key read one single source of truth (no divergent answers)",
);
ok(MEANING_BASED_37.size === 5 && [...MEANING_BASED_37].join(",") === "16,17,18,19,20", "the five meaning questions are declared as meaning-based, not string-matched");
ok(
  gradeTest37(TEST_37, Object.fromEntries(TEST_37.map((q) => [q.n, "no idea"])), ANSWER_SPECS_37).results[16].status === "review",
  "an empty meaning answer is sent to review rather than silently scored",
);
ok(TEST_LEVEL_LEVELS_ALIGNED_37(), "the five levels of the teacher key mirror the five test levels");
function TEST_LEVEL_LEVELS_ALIGNED_37() {
  return TEST_SOLUTIONS_37.every((solution) => solution.level === Math.min(5, Math.ceil(solution.n / 5)));
}

/* ---- عزل الإجابات: لا استيراد ثابت للمفتاح في أي مسار طالب ---- */
{
  const read37 = (file) => readFileSync(join(root, "src/lessons/lesson37", file), "utf8");
  for (const file of ["Lesson37.tsx", "Steps37.tsx", "labs37.tsx", "testData37.ts", "kit37.tsx", "data.ts"]) {
    ok(!/from\s+"\.\/solutionsData37"/.test(read37(file)), `${file}: never imports the answer key statically`);
  }
  ok(!/modelAnswer:\s*"/.test(read37("grading37.ts")) && !/check:\s*\(raw\)\s*=>/.test(read37("grading37.ts")), "grading37.ts carries comparison logic only — no answer text, no per-question check");
  ok((read37("TestArea37.tsx").match(/import\("\.\/solutionsData37"\)/g) || []).length === 1, "the test area opens the key through exactly one deferred dynamic import");
  ok(/import\("\.\/solutionsData37"\)/.test(read37("TestArea37.tsx")) && !/from\s+"\.\/solutionsData37"/.test(read37("TestArea37.tsx")), "the deferred import is the only way the test reaches the key");
}


/* ---- wiring: كل مختبر مربوط بمعرّف خطوة حقيقي، وكل خطوة مختبر تُصيَّر مختبرها ---- */
const stepsSource37 = readFileSync(join(root, "src/lessons/lesson37/Steps37.tsx"), "utf8");
const labCaseIds = [...stepsSource37.matchAll(/case "([a-z0-9]+)":/g)].map((match) => match[1]);
const slideIds37 = new Set(SLIDES_37.map((slide) => slide.id));
const orphanLabCases = [...new Set(labCaseIds)].filter((id) => !slideIds37.has(id));
ok(orphanLabCases.length === 0, `every laboratory is wired to a real step id (orphans: ${orphanLabCases.join(", ") || "none"})`);
const labStepIds37 = new Set(labCaseIds);
ok(labStepIds37.size >= 30, `the sequence mounts ${labStepIds37.size} interactive laboratories`);

/* ---------------------------------------------------------------- 4) كل خطوة تُصيَّر */
const initialHtml = new Map();
for (const slide of SLIDES_37) {
  const html = renderStep(slide);
  initialHtml.set(slide.id, html);
  ok(
    html.includes(`data-step-id="${slide.id}"`) && html.includes(`data-source-id="${slide.sourceId}"`) && html.includes(`data-source-section="${slide.sourceId}"`),
    `${slide.id}: renders as a traceable step`,
  );
  ok(html.length > 600, `${slide.id}: renders substantive content (${html.length} chars)`);
  if (labStepIds37.has(slide.id)) {
    ok(html.includes("data-lab="), `${slide.id}: its interactive laboratory is mounted (a stale step id would drop it silently)`);
  }
  // hooks `data-lab` فريدة داخل الخطوة الواحدة، فلا يعتمد أي تأكيد على أول تطابق عشوائي.
  const labHooks = [...html.matchAll(/data-lab="([^"]+)"/g)].map((match) => match[1]);
  ok(new Set(labHooks).size === labHooks.length, `${slide.id}: its data-lab hooks are unique inside the step (${labHooks.join(", ") || "none"})`);
}
const allStepsHtml = [...initialHtml.values()].join("\n");
const corpus = normalize(allStepsHtml.replace(/<[^>]+>/g, " "));
const missingUnits = [];
for (const section of SOURCE_SECTIONS_37) {
  // §34 questions live once in the formal Test Area; §35 is the teacher gate.
  if (section.id === "s34" || section.id === "s35") continue;
  const stepsForSection = SLIDES_37.filter((slide) => slide.sourceId === section.id);
  const renderedForSection = normalize(stepsForSection.map((slide) => initialHtml.get(slide.id).replace(/<[^>]+>/g, " ")).join(" "));
  for (const unit of section.units) {
    if (unit.length < 12) continue;
    const needle = normalize(unit).replace(/\s+/g, "");
    if (!renderedForSection.replace(/\s+/g, "").includes(needle)) missingUnits.push(`${section.id}: ${unit.slice(0, 60)}`);
  }
}
ok(missingUnits.length === 0, `every non-test source unit (>=12 chars) is rendered inside its own source steps (${missingUnits.length} missing: ${missingUnits.slice(0, 6).join(" · ")})`);
ok(
  SOURCE_SECTIONS_37.filter((section) => section.id === "s34").every((section) => section.units.length === 65) &&
    TEST_37.length === 25 &&
    TEST_LEVELS_37.every((level) => level.questions.every((question) => question.promptUnitIndexes.length > 0)),
  "§34 content lives in the 25-question Test Area instead of being duplicated in a student step",
);

/* لا Knowledge Card ولا مكافئ */
{
  const files = readdirSync(join(root, "src/lessons/lesson37"));
  const lessonSource = files.filter((file) => /\.(tsx?|css)$/.test(file)).map((file) => readFileSync(join(root, "src/lessons/lesson37", file), "utf8")).join("\n");
  ok(!/بطاقة\s*المعرفة|Knowledge\s*Card/i.test(lessonSource), "Lesson 37 contains no Knowledge Card (or renamed equivalent)");
  ok(!/data-knowledge|knowledge-card|knowledgeCard/i.test(lessonSource), "Lesson 37 contains no knowledge-card component id");
}

/* ---------------------------------------------------------------- 5) الاختبار: محايد ثم يصحّح */
const testPreHtml = M.renderToString(M.React.createElement(M.TestArea37, { onSubmitted() {}, onGoSolutions() {} }));
ok((testPreHtml.match(/data-test-question="\d+"/g) || []).length === 25, "pre-submit Test Area renders 25 numbered question panels");
ok(!testPreHtml.includes("data-test-feedback") && !testPreHtml.includes("data-test-score"), "before submit there is no feedback and no score block");
ok(!/الإجابة النموذجية|النتيجة/.test(testPreHtml), "before submit no model answer or result text is rendered");
ok(new Set((testPreHtml.match(/data-source-unit="s34-unit-\d+"/g) || [])).size >= 58, "the question, option, marker and trailing lines of §34 are all traced into the Test Area markup");
ok((readFileSync(join(root, "src/lessons/lesson37/TestArea37.tsx"), "utf8").match(/solutionsData37/g) || []).length === 1 && !/from\s+"\.\/solutionsData37"/.test(readFileSync(join(root, "src/lessons/lesson37/TestArea37.tsx"), "utf8")), "the test component reaches the key only through one deferred dynamic import (never a static one)");
ok(!readFileSync(join(root, "src/lessons/lesson37/testData37.ts"), "utf8").includes("solutionsData37"), "the test data never imports the answer key");

/** يُرسل النموذج وينتظر انتهاء التحميل المؤجل للمفتاح داخل act. */
const submitAndSettle = async (el) => {
  const submitButton = el.querySelector("[data-test-submit]") ?? findButton(el, "إرسال الاختبار");
  await M.act(async () => {
    submitButton.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
    for (let i = 0; i < 40 && !el.querySelector("[data-test-feedback]"); i += 1) await tick(10);
  });
  await tick(20);
};

{
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.TestArea37, { onSubmitted() {}, onGoSolutions() {} }));
  await tick();
  const cards = [...el.querySelectorAll("[data-test-question]")];
  ok(cards.length === 25, `mounted Test Area exposes 25 question fieldsets (got ${cards.length})`);
  const submitButton = findButton(el, "إرسال الاختبار");
  ok(submitButton?.disabled === true, "submission stays disabled until all 25 are answered");
  ok(normalize(el.textContent).includes("لا يمكن الإرسال الآن"), "an incomplete paper shows the Arabic 'cannot submit yet' message");
  ok(/الأسئلة غير المجابة:\s*1/.test(normalize(el.textContent)), "the incomplete notice lists the still-unanswered question numbers");
  for (const question of TEST_37) {
    const card = el.querySelector(`[data-test-question="${question.n}"]`);
    if (question.options) {
      const radio = [...card.querySelectorAll('input[type="radio"]')].find((input) => input.getAttribute("value") === modelAnswers[question.n]);
      click(radio);
    } else {
      setNative(card.querySelector("input[type=text], textarea"), modelAnswers[question.n]);
    }
    await tick(2);
  }
  await tick(5);
  ok(findButton(el, "إرسال الاختبار")?.disabled === false, "answering all 25 enables submission");
  ok(!el.querySelector("[data-test-feedback]") && !el.querySelector("[data-test-score]"), "a fully answered but unsubmitted paper still shows no correction");
  await submitAndSettle(el);
  ok(el.querySelectorAll("[data-test-feedback]").length === 25, "after submit each of the 25 questions gets its own feedback block");
  const scoreText = normalize(el.querySelector("[data-test-score]")?.textContent ?? "");
  ok(/25\s*\/\s*25/.test(scoreText) && scoreText.includes("100"), `after submit the score reads 25/25 · 100% (got "${scoreText.slice(0, 60)}")`);
  ok(el.textContent.includes("الإجابة النموذجية:") && el.textContent.includes("السبب:"), "after submit the model answer and the reason are shown");
  ok(el.querySelectorAll("[data-test-feedback]").length === 25 && !el.querySelector("[data-solution]"), "the test never embeds the solutions-area cards");
  ok(el.querySelector('[data-test-feedback="16"]')?.textContent.includes("إجابة مقبولة بالمعنى"), "the meaning questions are labelled as meaning-evaluated, not string matches");

  // إعادة الاختبار: تمسح الإجابات والتصحيح معًا
  click(findButton(el, "إعادة الاختبار"));
  await tick(10);
  ok(!el.querySelector("[data-test-feedback]") && !el.querySelector("[data-test-score]"), "retry clears every feedback block and the score");
  const inputsAfterRetry = [...el.querySelectorAll("[data-test-question] input")];
  ok(inputsAfterRetry.length > 0 && inputsAfterRetry.every((input) => (input.type === "radio" ? !input.checked : input.value === "")), "retry empties all 25 answers");
  ok(findButton(el, "إرسال الاختبار")?.disabled === true, "retry returns the test to the un-submittable neutral state");
  reactRoot.unmount();
  el.remove();
}
{
  // إجابات خاطئة: النتيجة 0 مع تغذية راجعة لكل سؤال.
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.TestArea37, { onSubmitted() {}, onGoSolutions() {} }));
  await tick();
  for (const question of TEST_37) {
    const card = el.querySelector(`[data-test-question="${question.n}"]`);
    if (question.options) click(card.querySelector('input[type="radio"]'));
    else setNative(card.querySelector("input[type=text], textarea"), "wrong answer");
    await tick(2);
  }
  await submitAndSettle(el);
  const lowScore = normalize(el.querySelector("[data-test-score]")?.textContent ?? "");
  ok(/[0-3]\s*\/\s*25/.test(lowScore), `a paper of wrong answers scores near zero (got "${lowScore.slice(0, 24)}")`);
  ok(el.querySelectorAll("[data-test-feedback]").length === 25, "wrong answers still get 25 explanations");
  reactRoot.unmount();
  el.remove();
}

/* ---------------------------------------------------------------- 6) الحلول والمعلم */
{
  const locked = M.renderToString(M.React.createElement(M.SolutionsArea37, { unlocked: false, onGoTest() {}, onGoTeacher() {} }));
  ok(locked.includes("data-solutions-locked") && !locked.includes("data-solution="), "Solutions Area is locked and blank before submission / teacher access");
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.SolutionsArea37, { unlocked: true, onGoTest() {}, onGoTeacher() {} }));
  await tick();
  const seen = new Set();
  for (const tab of el.querySelectorAll('nav[aria-label="مستويات حلول اختبار الدرس 37"] button')) {
    click(tab);
    await tick(3);
    for (const card of el.querySelectorAll("[data-solution]")) seen.add(Number(card.getAttribute("data-solution")));
  }
  ok(seen.size === 25, `after unlock all 25 solutions are reachable (got ${seen.size})`);
  ok([...el.querySelectorAll("[data-source-status]")].every((node) => node.getAttribute("data-source-status") === "platform-authored-teacher-addition"), "every solution card is labelled as platform/teacher-authored");
  const first = el.querySelector("[data-solution]");
  ok(!!first && normalize(first.textContent).includes("الإجابة النموذجية"), "solution cards show the answer immediately");
  ok(!!first && first.querySelectorAll("[data-solution-details]").length === 0, "solution reasoning starts collapsed");
  click(findButton(first, "إظهار الشرح والبدائل"));
  await tick(3);
  ok(!!first && first.textContent.includes("التفسير:"), "expanding reveals the reasoning");
  reactRoot.unmount();
  el.remove();
}
{
  const lockedTeacher = M.renderToString(M.React.createElement(M.TeacherArea37, { unlocked: false, onUnlockChange() {}, onGoSolutions() {} }));
  ok(lockedTeacher.includes('type="password"') && !lockedTeacher.includes("data-teacher-solution"), "Teacher Area starts gated with no answer content in the markup");
  ok(readFileSync(join(root, "src/lessons/lesson37/TeacherArea37.tsx"), "utf8").includes('TEACHER_PASSWORD_37 = "somer173"'), "Teacher Area keeps the shared teacher password");
  ok(readFileSync(join(root, "src/lessons/lesson37/TeacherArea37.tsx"), "utf8").includes('lazy(() => import("./TeacherGuide37"))'), "the teacher guide chunk is deferred until unlock");

  const { el: guide, root: guideRoot } = M.mount(M.React.createElement(M.TeacherGuide37, { onGoSolutions() {}, onLock() {} }));
  await tick();
  ok(guide.querySelectorAll("[data-coverage-section]").length === 39, "teacher coverage tab documents the opening + 38 sections");
  ok(COVERAGE_37.length === 39 && COVERAGE_SECTION_COUNT_37 === 38, "coverage ledger has 39 rows (opening + 38)");
  ok(COVERAGE_37.every((row) => row.location && row.location !== "—"), "every coverage row points at its rendered step(s)");
  ok(COVERAGE_ACCURACY_NOTES_37.length >= 5, "source-accuracy notes are kept in the coverage ledger");
  click(findButton(guide, "حلول الاختبار"));
  await tick(5);
  ok(guide.querySelectorAll("[data-teacher-solution]").length === 25, "teacher guide contains all 25 test solutions");
  const solutionsText = normalize(guide.textContent);
  ok(solutionsText.includes("السبب") && solutionsText.includes("الإجابة"), "each teacher solution states the answer and the reason");
  click(findButton(guide, "مفاتيح التدريب والقراءة"));
  await tick(5);
  const keysText = normalize(guide.textContent);
  ok(
    keysText.includes("Grammar Detective") && keysText.includes("IQ200") && keysText.includes("A Busy Saturday") && keysText.includes("التحويلات"),
    "teacher keys cover the exercise, the detective, IQ200, the transformations, and the reading",
  );
  click(findButton(guide, "القواعد وملاحظات المعلم"));
  await tick(5);
  const rulesText = normalize(guide.textContent);
  ok(rulesText.includes("ملاحظات دقة على المصدر") && rulesText.includes("CVC"), "teacher rules tab lists the source-accuracy notes");
  ok(rulesText.includes("أخطاء يُتوقع تكرارها") && rulesText.includes("معايير مراجعة إنتاج الطالب"), "teacher notes include expected errors and writing review criteria");
  guideRoot.unmount();
  guide.remove();
}

/* ---------------------------------------------------------------- 7) الغلاف والتنقل */
{
  const { el, root } = M.mount(M.React.createElement(M.Lesson37, { onExit() {} }));
  await tick();
  ok(!!el.querySelector('[data-lesson="37"] [data-area="lesson37-student"]'), "the shell opens in the Student Area");
  const locks = el.querySelectorAll("[data-site-lock-button='true']");
  ok(locks.length === 1, `exactly one site-lock button is rendered (got ${locks.length})`);
  ok(!!locks[0]?.closest("[data-lesson-step-nav='true']"), "the site lock lives inside the shared step navigation");
  const nav = locks[0]?.closest("[data-lesson-step-nav='true']");
  ok(!!nav?.querySelector('[data-step-nav="prev"]') && !!nav?.querySelector('[data-step-nav="next"]'), "Previous and Next live in the same normal-flow navigation");
  ok(el.querySelector('[data-step-nav="prev"]')?.disabled === true, "Previous is disabled on the first step");
  ok(!!el.querySelector('[data-step-nav="next"]'), "Next is available on the first step");
  const shellProgress = [...el.querySelectorAll("header div")].filter((node) => /width:\s*[\d.]+%/.test(node.getAttribute("style") || ""));
  ok(shellProgress.length >= 1, `the shared shell header renders the step progress bar (got ${shellProgress.length})`);
  ok(normalize(el.textContent).includes("1 / 58"), "the shared shell counter shows 1 / 58 on the first step");
  const next = el.querySelector('[data-step-nav="next"]');
  click(next);
  await tick(5);
  ok(!!el.querySelector('[data-step-id="s01"]'), "Next advances to the second step");
  click(el.querySelector('[data-step-nav="prev"]'));
  await tick(5);
  ok(!!el.querySelector('[data-step-id="cover"]'), "Previous returns to the opening step");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!el.querySelector('[data-step-id="s01"]'), "ArrowLeft advances in the RTL layout");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!el.querySelector('[data-step-id="cover"]'), "ArrowRight goes back");
  ok(el.querySelector('[data-area-tab="solutions"]')?.textContent.includes("🔒"), "the Solutions tab is marked locked before submission");
  await M.act(async () => {
    el.querySelector('[data-area-tab="teacher"]').dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
    for (let i = 0; i < 30 && !el.querySelector("#l37-teacher-password"); i += 1) await tick(10);
  });
  ok(!!el.querySelector('[data-area="lesson37-teacher"]') && !!el.querySelector("#l37-teacher-password"), "the Teacher Area is a separate surface reachable from its own tab and starts password-gated");
  click(el.querySelector('[data-area-tab="lesson"]'));
  await tick(4);
  root.unmount();
  el.remove();
}

/* ---------------------------------------------------------------- 8) RTL / LTR وBIDI */
{
  const violations = [];
  for (const html of [...initialHtml.values(), testPreHtml]) {
    for (const paragraph of analyzeHtml(html)) {
      for (const violation of paragraph.violations || []) violations.push(`${violation.latin} ⇄ ${violation.arabic}`);
    }
  }
  ok(violations.length === 0, `rendered lesson markup passes the English/Arabic BIDI oracle (${violations.length} violations: ${violations.slice(0, 20).join(" · ") || "clean"})`);
  ok(allStepsHtml.includes('dir="ltr"') && allStepsHtml.includes("font-en"), "English runs are LTR-isolated in the rendered output");
  ok(["What will you be doing at 7:00 tomorrow?", "Subject + will + be + V-ing", "She will be preparing dinner.", "Will she be studying at 8:00?"].filter((sample) => allStepsHtml.includes(sample)).length >= 3, "source English sentences keep their word order");
  ok(!/[\u2066\u2067\u2068\u2069\u202A-\u202E]/.test(allStepsHtml), "no raw Unicode bidi control characters leak into the markup");
  ok(corpus.includes("ماذا ستكون تفعل"), "Arabic explanation stays in the RTL flow");
}

/* ---------------------------------------------------------------- 9) التباين المحسوب */
function channel(hex) {
  const value = parseInt(hex, 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}
function luminance(hex) {
  const clean = hex.replace("#", "");
  return 0.2126 * channel(clean.slice(0, 2)) + 0.7152 * channel(clean.slice(2, 4)) + 0.0722 * channel(clean.slice(4, 6));
}
function contrast(fg, bg) {
  const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
const PALETTE_PAIRS_37 = [
  ["#0f172a", "#ffffff", "body ink on white"],
  ["#0f172a", "#f8fbff", "body ink on tinted surface"],
  ["#0f172a", "#f0f9ff", "body ink on sky tint"],
  ["#0f172a", "#e0f2fe", "body ink on sky chip"],
  ["#0f172a", "#ccfbf1", "body ink on teal chip"],
  ["#0f172a", "#f0fdfa", "body ink on teal surface"],
  ["#0f172a", "#fef3c7", "body ink on amber surface"],
  ["#1e293b", "#ffffff", "secondary ink on white"],
  ["#1e293b", "#f8fbff", "secondary ink on tinted surface"],
  ["#334155", "#ffffff", "muted ink on white"],
  ["#334155", "#f8fbff", "muted ink on tinted surface"],
  ["#334155", "#e0f2fe", "muted ink on sky chip"],
  ["#0c4a6e", "#ffffff", "deep sky on white"],
  ["#0c4a6e", "#e0f2fe", "deep sky on sky chip"],
  ["#0c4a6e", "#f8fbff", "deep sky on tinted surface"],
  ["#0369a1", "#ffffff", "sky eyebrow on white"],
  ["#0369a1", "#f8fbff", "sky eyebrow on tinted surface"],
  ["#1d4ed8", "#ffffff", "electric blue on white"],
  ["#1e40af", "#dbeafe", "electric ink on electric chip"],
  ["#115e59", "#ffffff", "teal ink on white"],
  ["#115e59", "#ccfbf1", "teal ink on teal chip"],
  ["#115e59", "#f0fdfa", "teal ink on teal surface"],
  ["#92400e", "#fef3c7", "amber ink on amber chip"],
  ["#9a3412", "#ffedd5", "coral ink on coral chip"],
  ["#9f1239", "#ffe4e6", "rose ink on rose chip"],
  ["#5b21b6", "#f3e8ff", "violet ink on violet chip"],
  ["#ffffff", "#0f766e", "white on teal button"],
  ["#ffffff", "#0c4a6e", "white on deep-sky header"],
  ["#ffffff", "#1d4ed8", "white on electric button"],
  ["#475569", "#f1f5f9", "disabled text on disabled surface"],
  ["#475569", "#f8fbff", "disabled text on tinted surface"],
];
const contrastFailures = PALETTE_PAIRS_37.filter(([fg, bg]) => contrast(fg, bg) < 4.5);
ok(contrastFailures.length === 0, `the lesson palette meets WCAG AA 4.5:1 (${contrastFailures.map(([fg, bg, label]) => `${label} ${contrast(fg, bg).toFixed(2)}`).join(", ")})`);
{
  // فحص محسوب على HTML المصيَّر: لكل عنصر نصي مباشر، أقرب لون نص + أقرب خلفية.
  const PALETTE = { white: "#ffffff", "slate-900": "#0f172a", "sky-100": "#e0f2fe", "teal-100": "#ccfbf1" };
  const colorOf = (token) => {
    const hex = token.match(/(?:^|:)(?:text|bg)-\[#([0-9a-fA-F]{6})\]/);
    if (hex) return "#" + hex[1].toLowerCase();
    const named = token.match(/(?:^|:)(?:text|bg)-(slate-900|sky-100|teal-100)$/);
    if (named) return PALETTE[named[1]];
    if (/(?:^|:)text-white$/.test(token)) return PALETTE.white;
    if (/(?:^|:)bg-white$/.test(token)) return PALETTE.white;
    return null;
  };
  const nearest = (element, kind, stop) => {
    let node = element;
    while (node && node !== stop) {
      const tokens = String(node.className || "").split(/\s+/);
      for (const pass of [false, true]) {
        for (const token of tokens) {
          if (token.includes(":") !== pass) continue;
          const value = colorOf(token);
          if (value && (kind === "text" ? /(?:^|:)text-/.test(token) : /(?:^|:)bg-/.test(token))) return value;
        }
      }
      node = node.parentElement;
    }
    return null;
  };
  const measured = [];
  for (const html of initialHtml.values()) {
    const holder = win.document.createElement("div");
    holder.innerHTML = html;
    for (const element of holder.querySelectorAll("*")) {
      const directText = [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim().length > 1);
      if (!directText) continue;
      if (element.closest("svg") || element.getAttribute("aria-hidden") === "true") continue;
      const text = nearest(element, "text", holder);
      const bg = nearest(element, "bg", holder);
      if (!text || !bg) continue;
      measured.push({ value: contrast(text, bg), text, bg, sample: (element.textContent || "").trim().slice(0, 42) });
    }
  }
  const below = measured.filter((record) => record.value < 4.5);
  for (const record of below.slice(0, 8)) console.log(`      ${record.value.toFixed(2)}:1 · ${record.text} على ${record.bg} · «${record.sample}»`);
  ok(measured.length > 300, `computed contrast covers a meaningful number of text nodes (${measured.length})`);
  ok(below.length === 0, `computed contrast over the rendered steps: every measured text node reaches 4.5:1 (${below.length} below of ${measured.length})`);
}
{
  const distDir = join(root, "dist", "assets");
  if (existsSync(distDir)) {
    const css = readdirSync(distDir).filter((file) => file.endsWith(".css")).map((file) => readFileSync(join(distDir, file), "utf8")).join("\n");
    ok(css.includes(".fh37-token") && css.includes(".fh37-timeline"), "the lesson's own stylesheet is emitted in the built bundle");
  } else {
    console.log("  ↳ dist/assets غير موجود — شغّل npm run build لفحص CSS المبنية");
  }
  ok(readFileSync(join(root, "src/lessons/lesson37/lesson37.css"), "utf8").includes("prefers-reduced-motion"), "reduced-motion is respected in the lesson stylesheet");
}

/* ---------------------------------------------------------------- 10) الطول والاستجابة (بنية) */
{
  const read37 = (file) => readFileSync(join(root, "src/lessons/lesson37", file), "utf8");
  for (const file of ["Lesson37.tsx", "Steps37.tsx", "labs37.tsx", "TestArea37.tsx", "SolutionsArea37.tsx", "TeacherGuide37.tsx", "kit37.tsx"]) {
    ok(/sm:|lg:|md:/.test(read37(file)), `${file}: reflows at a breakpoint`);
  }
  ok(read37("TeacherGuide37.tsx").includes("overflow-x-auto") && read37("kit37.tsx").includes("overflow-x-auto"), "wide tables scroll horizontally instead of clipping");
  ok(read37("Lesson37.tsx").includes("rootDataLesson={37}") && read37("Lesson37.tsx").includes("rootDir=\"rtl\"") && read37("Lesson37.tsx").includes("min-w-0"), "the shell is RTL-scoped and lets long mixed rows shrink");
  ok(!/whitespace-nowrap/.test(read37("labs37.tsx")), "no nowrap rule can force horizontal overflow");
  const stepText = (id) => normalize(initialHtml.get(id).replace(/<[^>]+>/g, " ")).length;
  const lengths = SLIDES_37.map((slide) => ({ id: slide.id, chars: stepText(slide.id) }));
  const longest = [...lengths].sort((a, b) => b.chars - a.chars).slice(0, 6);
  console.log(`  ↳ أطول الخطوات نصًّا: ${longest.map((entry) => `${entry.id} (${entry.chars})`).join(" · ")}`);
  ok(longest[0].chars < 3200, `no step exceeds the density budget (longest ${longest[0].id}: ${longest[0].chars} chars)`);
  const median = [...lengths].sort((a, b) => a.chars - b.chars)[Math.floor(lengths.length / 2)];
  console.log(`  ↳ وسيط كثافة الخطوة: ${median.chars} حرفًا`);
}

/* ------------------------------------------------ 10ب) الهيكل المشترك وحياد المحتوى */
{
  const read37 = (file) => readFileSync(join(root, "src/lessons/lesson37", file), "utf8");
  const lessonSrc = read37("Lesson37.tsx");
  ok(/import Lesson1Shell[^;]*from "\.\.\/\.\.\/shared\/Lesson1Shell"/.test(lessonSrc), "Lesson 37 renders through the real shared `Lesson1Shell` component");
  ok(!/<aside|<nav/.test(lessonSrc), "Lesson 37 keeps no bespoke sidebar or navigation markup of its own");
  ok(!/data-lesson-step-nav/.test(lessonSrc) && !/SiteLockButton/.test(lessonSrc), "the lesson does not re-implement the shared step navigation or the site lock");
  ok(lessonSrc.includes("railFooter") && lessonSrc.includes("groups=") && lessonSrc.includes("onSelectStep"), "the rail, chapters and step selection are supplied to the shared shell through its prop contract");
  ok(readFileSync(join(root, "src/shared/Lesson1Shell.tsx"), "utf8").includes("useRegisterInlineLockHost(true)"), "the shell itself still hosts the inline site-lock button");

  // لا ترقيم مصدر داخلي ولا وسوم تدقيق في أي سطح يراه الطالب
  const studentSurface = [...initialHtml.values()].join("\n") + testPreHtml;
  ok(!/§\s*\d/.test(studentSurface), "no internal source numbering (§) appears in student steps or the test");
  ok(!/HORIZON 37|data-source-status="platform/.test(studentSurface), "no audit or source-ledger labels leak into student-facing markup");
  ok(!/أقسام المصدر|خطوات الطالب|coverage|ledger/i.test(studentSurface), "no bookkeeping phrases ('source sections', 'student steps', coverage) are shown to the learner");
  ok(!/النص الأصلي|نص المصدر الحرفي|اضغط للعرض/.test(studentSurface), "no literal-source reveal control exists on the student side");

  // لا تسريب إجابات في المسار الأولي — بكاشف واحد ومضبوط موجبًا حتى لا يكون أعمى.
  const explanationsIn = (surface) =>
    TEST_SOLUTIONS_37.filter((solution) => normalize(surface).includes(normalize(solution.explanation))).map((solution) => solution.n);
  const leakedExplanations = explanationsIn(studentSurface);
  ok(leakedExplanations.length === 0, `no test answer explanation reaches the student steps or the pre-submit test (${leakedExplanations.join(", ") || "none"} leaked)`);
  // مؤشران للتسريب: إجابة Q24 النموذجية (لا ترد في متن الدرس) وشرح Q22 الطويل الفريد.
  // إجابة Q22 القصيرة نفسها ترد في أمثلة الدرس، فلا تصلح مؤشرًا.
  const modelAnswersInLesson = TEST_SOLUTIONS_37.filter((solution) => normalize(studentSurface).includes(normalize(solution.answer))).map((solution) => solution.n);
  ok(!modelAnswersInLesson.includes(24), `the Q24 model answer stays out of the lesson text, so it can act as a leak sentinel (present: ${modelAnswersInLesson.join(", ")})`);
  const positiveControl = explanationsIn(`${studentSurface}${TEST_SOLUTIONS_37[3].explanation}`);
  ok(
    positiveControl.length === 1 && positiveControl[0] === 4,
    `positive control: the very same detector flags a deliberately injected answer explanation (got ${JSON.stringify(positiveControl)})`,
  );
  ok(!/ANSWER_SPECS_37|SOLUTION_NOTES_37/.test(studentSurface), "the rendered student surface never contains key identifiers");

  // كل مختبر تفاعلي مذكور في الخطوات
  const stepsSrc = read37("Steps37.tsx");
  const labsSrc = read37("labs37.tsx");
  const labExports = [...labsSrc.matchAll(/export function (\w+Lab37|ObjectivesChecklist37|ReadingAnalysis37)\b/g)].map((match) => match[1]);
  // BuildLab37 وChoiceLab37 عنصران عامّان يُستخدمان داخل مختبرات أخرى.
  const genericLabs = new Set(["BuildLab37", "ChoiceLab37"]);
  const missingLabs = labExports.filter((name) => !genericLabs.has(name) && !stepsSrc.includes(`<${name}`));
  ok(labExports.length >= 30 && missingLabs.length === 0, `every lesson-37 lab component is mounted in a step (${labExports.length} labs, missing: ${missingLabs.join(", ") || "none"})`);
  ok((stepsSrc.match(/return <\w+Lab37/g) || []).length >= 10, "the labs are wired as learner interactions inside the step sequence");
}

/* ---------------------------------------------------------------- 11) التسجيل والوثائق */
{
  const appText = readFileSync(join(root, "src/App.tsx"), "utf8");
  ok(appText.includes('import Lesson37 from "./lessons/lesson37/Lesson37"') && appText.includes('href: "#/lesson/37"') && appText.includes("route === 37"), "App.tsx registers Lesson 37 as a hub card and route");
  const docs = readFileSync(join(root, "docs/lesson37-coverage.md"), "utf8");
  ok((docs.match(/^\| §\d+/gm) || []).length === 38, "coverage document lists the 38 numbered sections");
  ok(docs.includes("**58**") && docs.includes("Table reconstruction"), "coverage document records the step count and the rebuilt tables");
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  ok(pkg.scripts["audit:lesson37"] === "node scripts/audit-lesson37.mjs", "package.json exposes audit:lesson37");
  ok((pkg.scripts["audit:english-direction"] || "").includes("audit-lesson37.mjs"), "audit:english-direction runs the Lesson 37 audit");
  ok(existsSync(join(root, "src/lessons/lesson37/lesson37.css")), "the lesson stylesheet exists");
}

rmSync(outDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`✕ Lesson 37 audit failed: ${failures.length} of ${assertions} assertions failed`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(
  `✓ Lesson 37 audit passed: ${assertions} assertions · 38 numbered sections + opening · ${STEP_COUNT_37} short steps · 25 graded questions in five levels · 25 platform-authored solutions · gated areas · RTL/LTR + computed contrast.`,
);
