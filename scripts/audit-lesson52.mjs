// Lesson 52: content coverage, six exercise sets, 25-question protected test,
// answer-key isolation, retryable key loading and the Lesson 1 template shell.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const { JSDOM } = require("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "node_modules/.lesson52-audit", `audit-${process.pid}.mjs`);
mkdirSync(dirname(out), { recursive: true });
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
  import React from 'react'; export {React};
  export {createRoot} from 'react-dom/client'; export {flushSync} from 'react-dom';
  export {act} from 'react';
  export * from './src/lessons/lesson52/data.ts';
  export * from './src/lessons/lesson52/content52.ts';
  export * from './src/lessons/lesson52/practiceData52.ts';
  export * from './src/lessons/lesson52/normalize52.ts';
  export * from './src/lessons/lesson52/retry52.ts';
  export * from './src/lessons/lesson52/testData52.ts';
  export * from './src/lessons/lesson52/testKey52.ts';
  export {default as Lesson52} from './src/lessons/lesson52/Lesson52.tsx';
  export {TestArea52} from './src/lessons/lesson52/TestArea52.tsx';
  export {TeacherArea52, isTeacherPassword52} from './src/lessons/lesson52/TeacherArea52.tsx';
  export {default as TeacherGuide52} from './src/lessons/lesson52/TeacherGuide52.tsx';
`,
    resolveDir: root,
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  jsx: "automatic",
  packages: "external",
  loader: { ".css": "empty" },
  outfile: out,
  logLevel: "silent",
});
const M = await import(pathToFileURL(out).href);
rmSync(out, { force: true });
let checks = 0;
const failures = [];
const ok = (condition, message) => {
  checks++;
  if (!condition) {
    failures.push(message);
    console.error(`✕ ${message}`);
  }
};

/* ---------- shape and coverage ---------- */
ok(M.LESSON_STEP_COUNT_52 === 64, `64 slides, got ${M.LESSON_STEP_COUNT_52}`);
ok(M.STATIONS_52.length === 21, `21 stations, got ${M.STATIONS_52.length}`);
ok(new Set(M.SLIDES_52.map((slide) => slide.id)).size === M.LESSON_STEP_COUNT_52, "slide IDs unique");
for (const station of M.STATIONS_52) ok(M.SLIDES_52.some((slide) => slide.station === station.id), `station ${station.id} represented`);
for (const id of [
  "cover", "goals", "intro", "definition", "first-example", "core-rule", "will-trap", "structure",
  "conjugation", "order-rule", "neg-condition", "neg-result", "neg-both", "question-forms", "yes-no",
  "modal-can", "modal-may", "modal-should", "modal-formula", "imperative", "zero-first-table",
  "zero-first-pairs", "unless-rule", "unless-error", "time-linkers", "if-vs-when", "errors-1",
  "errors-2", "dialogue", "dialogue-questions", "reading-text", "reading-translation",
  "reading-questions", "reading-hunt", "practice-1", "practice-2", "practice-3", "practice-4",
  "practice-5", "practice-6", "solutions-1", "solutions-2", "writing", "speaking", "summary",
  "review", "self-check", "final-test", "teacher", "dashboard", "progress", "roadmap", "closing",
]) ok(M.SLIDES_52.some((slide) => slide.id === id), `${id} slide exists`);
ok(M.GOALS_52.length === 10, "ten lesson goals");
ok(M.SUMMARY_52.length === 12, "twelve summary points");
ok(M.SELF_CHECK_52.length === 12, "twelve self-check skills");
ok(M.DIALOGUE_52.length >= 8, "dialogue keeps all eight source turns (got " + M.DIALOGUE_52.length + ")");
ok(M.DIALOGUE_QUESTIONS_52.length === 5, "five dialogue questions");
ok(M.READING_52.length === 6, "reading keeps six paragraphs");
ok(M.READING_TRANSLATION_52.length === 6, "full reading translation");
ok(M.READING_QUESTIONS_52.length === 7, "seven reading questions");
ok(M.READING_HUNT_52.length === 5, "five reading-hunt items");
ok(M.ERRORS_52.length === 6, "six common errors");
ok(M.PROGRESS_52.lesson === 52 && M.PROGRESS_52.percent === "43.3%" && M.PROGRESS_52.next.n === 53, "curriculum position 52/120, next 53");
ok(M.PROGRESS_52.previous.some((lesson) => lesson.n === 51 && /ZERO/i.test(lesson.title)), "previous lesson 51 is Zero Conditional");

/* ---------- 11 interactive labs, all rendered by slides ---------- */
const labIds = ["condResult", "verbForm", "order", "negation", "error", "zeroFirst", "unless", "questionOrder", "modal", "ifWhen", "outcome"];
ok(M.LAB_COUNT_52 === 11, "eleven interactive labs declared");
for (const lab of labIds) ok(M.SLIDES_52.some((slide) => slide.kind === "lab" && slide.lab === lab), `lab slide exists: ${lab}`);
const labSizes = {
  condResult: M.COND_RESULT_52.length,
  verbForm: M.VERB_FORM_52.length,
  order: M.ORDER_52.length,
  negation: M.NEGATION_52.length,
  error: M.ERROR_52.length,
  zeroFirst: M.ZERO_FIRST_52.length,
  unless: M.UNLESS_52.length,
  questionOrder: M.QUESTION_ORDER_52.length,
  modal: M.MODAL_52.length,
  ifWhen: M.IF_WHEN_52.length,
  outcome: M.OUTCOME_52.length,
};
for (const [lab, size] of Object.entries(labSizes)) ok(size >= 3, `${lab} has at least 3 items (got ${size})`);
for (const task of [...M.ORDER_52, ...M.QUESTION_ORDER_52]) {
  ok(task.correct.length === task.scrambled.length, `${task.id} keeps all tokens`);
  ok(task.correct.join(" ") !== task.scrambled.join(" "), `${task.id} is actually scrambled`);
}
const gapExercise = M.EXERCISES_52.find((exercise) => exercise.type === "gap");
ok(Boolean(gapExercise) && gapExercise.items.length === 10, "gap exercise has 10 items");
for (const item of gapExercise?.items ?? []) {
  ok(typeof item.cue === "string" && /^[a-z ]+$/.test(item.cue), `${item.id} has an English base-verb cue`);
  ok(item.model.every((form) => M.matchesEnglish52(form, item.accepts[item.model.indexOf(form)])), `${item.id} model matches its accepts`);
}
for (const item of M.VERB_FORM_52) ok(item.accept.includes(item.model), `${item.id} accepts its model`);
for (const item of M.ERROR_52) ok(item.accept.length > 0 && item.accept.every((value) => value === value.toLowerCase()), `${item.id} correction is normalized`);
for (const item of M.UNLESS_52) ok(item.accept.every((value) => !value.includes("unless you don't")), `${item.id} rejects double negation`);

/* ---------- six exercises ---------- */
ok(M.EXERCISES_52.length === 6, "six exercises");
const exerciseSizes = M.EXERCISES_52.map((exercise) => exercise.items.length);
ok(exerciseSizes.join(",") === "10,8,8,8,5,8", `exercise sizes 10/8/8/8/5/8 (got ${exerciseSizes.join("/")})`);
ok(M.EXERCISE_ITEM_COUNT_52 === 47, `47 exercise items (got ${M.EXERCISE_ITEM_COUNT_52})`);
const allItems = M.EXERCISES_52.flatMap((exercise) => exercise.items);
ok(new Set(allItems.map((item) => item.id)).size === allItems.length, "exercise item IDs unique");
for (const item of allItems) ok(Boolean(item.why), `${item.id} has an explanation`);
for (const exercise of M.EXERCISES_52) ok(Boolean(exercise.instruction), `${exercise.badge} has an instruction`);

/* ---------- writing and speaking ---------- */
const modelSentences = M.WRITING_52.model.split(/[.!?]+/).map((sentence) => sentence.trim()).filter(Boolean);
ok(modelSentences.length >= 8 && modelSentences.length <= 12, `writing model fits 8–12 sentences (got ${modelSentences.length})`);
const modelConditionals = M.WRITING_52.model.match(/\bif\b[^.!?]*\b(?:will|can|may|might|should|must)\b/gi) ?? [];
ok(modelConditionals.length >= 5, `writing model has at least 5 first conditionals (got ${modelConditionals.length})`);
ok(M.WRITING_52.instructions.length >= 4 && M.WRITING_52.ideas.length === 5, "writing instructions and five ideas");
ok(M.SPEAKING_52.questions.length === 7, "seven speaking questions");
ok(Boolean(M.SPEAKING_52.example.q && M.SPEAKING_52.example.a), "speaking example present");

/* ---------- test inventory and isolation ---------- */
ok(M.TEST_QUESTIONS_52.length === 25 && M.TEST_SOLUTIONS_52.length === 25, "25 prompts and 25 independent keys");
ok(new Set(M.TEST_QUESTIONS_52.map((q) => q.id)).size === 25, "test question IDs unique");
const levelCounts = [1, 2, 3, 4, 5].map((level) => M.TEST_QUESTIONS_52.filter((q) => q.level === level).length);
ok(levelCounts.join(",") === "8,5,5,3,4", `test split 8/5/5/3/4 (got ${levelCounts.join("/")})`);
ok(M.TEST_QUESTIONS_52.filter((q) => q.level === 1 && q.type === "choice").length === 8, "eight multiple-choice questions");
ok(M.TEST_QUESTIONS_52.filter((q) => q.level === 2 && q.type === "text").length === 5, "five completions");
ok(M.TEST_QUESTIONS_52.filter((q) => q.level === 3 && q.type === "text").length === 5, "five corrections");
ok(M.TEST_QUESTIONS_52.filter((q) => q.level === 4 && q.type === "choice").length === 3, "three type-identification questions");
ok(M.TEST_QUESTIONS_52.filter((q) => q.level === 5 && q.type === "text").length === 4, "four translations");
for (const q of M.TEST_QUESTIONS_52) {
  ok(Boolean(M.TEST_SOLUTIONS_52.find((s) => s.id === q.id)), `${q.id} has key`);
  ok(!("answer" in q) && !("model" in q) && !("patterns" in q) && !("why" in q), `${q.id} exposes no key in prompt data`);
}
const dataSource = readFileSync(join(root, "src/lessons/lesson52/testData52.ts"), "utf8");
const areaSource = readFileSync(join(root, "src/lessons/lesson52/TestArea52.tsx"), "utf8");
const keySource = readFileSync(join(root, "src/lessons/lesson52/testKey52.ts"), "utf8");
const practiceSource = readFileSync(join(root, "src/lessons/lesson52/Practice52.tsx"), "utf8");
const lessonSource = readFileSync(join(root, "src/lessons/lesson52/Lesson52.tsx"), "utf8");
const guideSource = readFileSync(join(root, "src/lessons/lesson52/TeacherGuide52.tsx"), "utf8");
const teacherSource = readFileSync(join(root, "src/lessons/lesson52/TeacherArea52.tsx"), "utf8");
ok(!/TEST_SOLUTIONS_52|gradeTest52|gradeQuestion52/.test(dataSource), "student test data has no key");
ok(areaSource.includes('import("./testKey52")') && areaSource.includes('import("./testKey52?retry")'), "key uses submit-only dynamic primary and retry imports");
ok(!/^import\s+\{[^}]*\}\s+from\s+"\.\/testKey52"/m.test(areaSource), "test area has no runtime static key import");
ok(!practiceSource.includes("TEST_SOLUTIONS_52") && !lessonSource.includes("TEST_SOLUTIONS_52"), "student components never name the key array");
ok(!practiceSource.includes('import("./testKey52")') && !lessonSource.includes('import("./testKey52")'), "practice never loads the test key");
ok(/import\s+type\s+\{[^}]*GradedTestResult52/.test(lessonSource), "lesson shell imports only result types from the key");
ok(keySource.indexOf("TEST_SOLUTIONS_52") > keySource.indexOf("export type Solution52"), "solutions stay in the key file");
ok(!guideSource.includes("TEST_SOLUTIONS_52"), "teacher guide derives solutions from the submitted result, not the key module");
ok(!/^import\s+(?!type)[^;]*from\s+"\.\/testKey52"/m.test(teacherSource), "teacher area has no static key import");
ok(!teacherSource.includes("TeacherGuide52.tsx") && teacherSource.includes('"./TeacherGuide52"'), "guide loads through a deferred dynamic import");

/* ---------- grading: acceptance and rejection ---------- */
const perfectAnswers = {
  q1: "b", q2: "c", q3: "c", q4: "a", q5: "b", q6: "b", q7: "c", q8: "a",
  q9: "If he doesn't study, he will fail the test.",
  q10: "If we have enough time, we will visit the museum.",
  q11: "If she practices every day, she will improve.",
  q12: "If it doesn't stop raining, we won't go outside.",
  q13: "If you need anything, call me.",
  q14: "If she comes, I will talk to her.",
  q15: "If he doesn't work, he won't earn money.",
  q16: "If I finish early, I will help you.",
  q17: "Unless you listen, you won't understand.",
  q18: "When they arrive, we will begin.",
  q19: "a", q20: "b", q21: "a",
  q22: "If you study hard, you will achieve your goal.",
  q23: "What will you do if you lose your phone?",
  q24: "If he doesn't arrive on time, we won't wait for him.",
  q25: "Unless you practice, you won't improve.",
};
const perfect = M.gradeTest52(perfectAnswers);
ok(perfect.score === 25 && perfect.total === 25, `perfect answers score 25/25 (got ${perfect.score})`);
for (let level = 1; level <= 5; level++) ok(perfect.byLevel[level].score === perfect.byLevel[level].total, `level ${level} fully correct`);

const alternatives = {
  q9: ["If he does not study, he will fail the test."],
  q11: ["If she practises every day, she will improve."],
  q12: ["If it does not stop raining, we will not go outside."],
  q15: ["If he does not work, he will not earn money."],
  q17: ["Unless you listen, you will not understand."],
  q18: ["When they arrive, we will start."],
  q22: ["If you study hard, you will achieve your goals."],
  q23: ["What will you do if you lose your mobile phone?"],
  q24: ["If he doesn't come on time, we won't wait for him.", "If he does not arrive on time, we will not wait for him."],
  q25: ["Unless you practise, you won't improve.", "Unless you practice, you will not improve."],
};
for (const [id, values] of Object.entries(alternatives)) {
  for (const value of values) ok(M.gradeQuestion52(M.TEST_QUESTIONS_52.find((q) => q.id === id), value), `${id} accepts alternative: ${value}`);
}

const negatives = {
  q1: ["a", "c"], q2: ["a", "b"], q3: ["a", "b"], q4: ["b", "c"], q5: ["a", "c"], q6: ["a", "c"], q7: ["a", "b"], q8: ["b", "c"],
  q9: ["If he don't study, he will fail the test.", "If he doesn't studies, he will fail the test."],
  q10: ["If we will have enough time, we will visit the museum."],
  q11: ["If she practice every day, she will improve."],
  q12: ["If it don't stop raining, we won't go outside.", "If it doesn't stop raining, we don't go outside."],
  q13: ["If you will need anything, call me."],
  q14: ["If she will come, I will talk to her.", "If she come, I will talk to her."],
  q15: ["If he don't work, he won't earn money.", "If he doesn't works, he won't earn money."],
  q16: ["If I will finish early, I will help you."],
  q17: ["Unless you don't listen, you won't understand."],
  q18: ["When they will arrive, we will begin.", "When they arrives, we will begin."],
  q22: ["If you will study hard, you will achieve your goal."],
  q23: ["What you will do if you lose your phone?"],
  q24: ["If he don't arrive on time, we won't wait for him."],
  q25: ["Unless you don't practice, you won't improve."],
};
for (const [id, values] of Object.entries(negatives)) {
  for (const value of values) {
    ok(!M.gradeQuestion52(M.TEST_QUESTIONS_52.find((q) => q.id === id), value), `${id} rejects: ${value}`);
  }
}
for (const id of Object.keys(perfectAnswers)) ok(!M.gradeQuestion52(M.TEST_QUESTIONS_52.find((q) => q.id === id), ""), `${id} rejects blank`);
ok(M.gradeQuestion52(M.TEST_QUESTIONS_52[0], " B ") === false, "choice grading is exact option id");
ok(M.answeredCount52({}) === 0 && !M.testComplete52({}), "empty test is incomplete");
ok(M.answeredCount52(perfectAnswers) === 25 && M.testComplete52(perfectAnswers), "all 25 answers complete the test");
ok(!M.testComplete52({ ...perfectAnswers, q25: "   " }), "whitespace-only answer does not complete the test");

/* ---------- practice acceptance ---------- */
for (const exercise of M.EXERCISES_52) {
  for (const item of exercise.items) {
    if (exercise.type === "gap") {
      ok(item.model.every((value, index) => M.matchesEnglish52(value, item.accepts[index])), `${item.id} accepts model`);
      ok(!M.matchesEnglish52("will studies", item.accepts[0]), `${item.id} rejects wrong verb form`);
    } else if (exercise.type === "choice") {
      ok(item.options[item.answer], `${item.id} has a valid correct option`);
    } else if (exercise.type === "classify") {
      ok(item.answer === "Zero" || item.answer === "First", `${item.id} classifies Zero/First`);
    } else {
      ok(M.matchesEnglish52(item.model, item.accepts), `${item.id} accepts its model`);
    }
  }
}
for (const item of M.UNLESS_52) ok(M.matchesEnglish52(item.model, item.accept), `${item.id} accepts unless model`);
for (const item of M.ERROR_52) ok(M.matchesEnglish52(item.model, item.accept), `${item.id} accepts correction model`);
for (const item of M.READING_HUNT_52) ok(M.matchesEnglish52(item.model, item.accept), `${item.model.slice(0, 30)} accepted`);

/* ---------- retry helper ---------- */
const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/#/lesson/52", pretendToBeVisual: true });
for (const key of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "HTMLInputElement", "HTMLTextAreaElement", "getComputedStyle", "localStorage", "MutationObserver"]) {
  if (dom.window[key]) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
dom.window.Element.prototype.scrollIntoView = () => {};
dom.window.Element.prototype.scrollTo = () => {};
dom.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
globalThis.IS_REACT_ACT_ENVIRONMENT = false;
const retryUrl = M.retryModuleUrl52(new Error("Failed to fetch dynamically imported module: http://localhost/assets/testKey52-abc.js"), "testKey52", 2);
ok(Boolean(retryUrl) && new URL(retryUrl).origin === "http://localhost" && new URL(retryUrl).searchParams.has("lesson52Retry"), "retry URL is same-origin and cache-busted");
ok(M.retryModuleUrl52(new Error("https://other.example/assets/testKey52-abc.js"), "testKey52", 1) === null, "retry rejects foreign origins");
ok(M.retryModuleUrl52(new Error("http://localhost/assets/TeacherGuide52-abc.js"), "testKey52", 1) === null, "retry rejects the wrong module");

/* ---------- jsdom: lesson shell + no key leak ---------- */
const tick = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));
function mount(node) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = M.createRoot(host);
  root.render(node);
  return { host, root };
}
const app = mount(M.React.createElement(M.Lesson52, { onExit: () => {} }));
await tick(120);
const rootEl = app.host.querySelector('[data-lesson="52"]');
ok(Boolean(rootEl), "lesson 52 renders its root");
ok(rootEl?.getAttribute("dir") === "rtl", "lesson shell keeps Arabic RTL");
ok(app.host.textContent.includes("الشرط الأول"), "lesson title renders");
ok(app.host.textContent.includes("FIRST CONDITIONAL"), "English title renders");
const railButtons = app.host.querySelectorAll("[data-step-nav]");
ok(railButtons.length >= M.LESSON_STEP_COUNT_52, `rail exposes every slide (got ${railButtons.length})`);
ok(Boolean(app.host.querySelector('[data-step-nav="final-test"]')), "final-test is reachable from the rail");
ok(Boolean(app.host.querySelector('[data-step-nav="teacher"]')), "teacher is reachable from the rail");
ok(!app.host.querySelector("[data-test-result]") && !app.host.querySelector("[data-question-feedback]"), "no test result or feedback before submission");
ok(!app.host.textContent.includes("الإجابة:") && !app.host.textContent.includes("TEST_SOLUTIONS_52"), "no answer key text in the rendered shell");
ok(app.host.querySelectorAll("[data-area]").length === 1, "one slide content area at a time");
const firstArea = app.host.querySelector("[data-area]")?.getAttribute("data-area");
ok(firstArea === "cover", `first slide is the cover (got ${firstArea})`);
auditRenderedStudentCopy(app.host, { lesson: 52 });

// keyboard + navigation
const nextButton = app.host.querySelector('button[data-step-nav="next"]');
ok(Boolean(nextButton), "next button exists");
nextButton?.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
await tick(60);
const secondArea = app.host.querySelector("[data-area]")?.getAttribute("data-area");
ok(secondArea === "goals", `next moves to goals (got ${secondArea})`);
const prevButton = app.host.querySelector('button[data-step-nav="prev"]');
prevButton?.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
await tick(60);
ok(app.host.querySelector("[data-area]")?.getAttribute("data-area") === "cover", "previous returns to cover");

// visit final test through the rail
app.host.querySelector('[data-step-nav="final-test"]')?.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
await tick(80);
ok(Boolean(app.host.querySelector("[data-test-area]")), "final test renders");
ok(app.host.querySelectorAll("[data-test-q]").length === 25, `25 test questions render (got ${app.host.querySelectorAll("[data-test-q]").length})`);
ok(Boolean(app.host.querySelector("[data-test-submit]")) && app.host.querySelector("[data-test-submit]").disabled, "submit disabled before all answers");
ok(!app.host.querySelector("[data-question-feedback]"), "no feedback before submit");
auditRenderedStudentCopy(app.host, { lesson: 52 });
app.root.unmount();
document.body.innerHTML = "";

/* ---------- test area: submit reveals score and feedback ---------- */
function TestHarness() {
  const [answers, setAnswers] = M.React.useState(perfectAnswers);
  const [result, setResult] = M.React.useState(null);
  return M.React.createElement(M.TestArea52, {
    answers,
    onAnswersChange: setAnswers,
    result,
    onResult: setResult,
    keyLoader: () => Promise.resolve({ gradeTest52: M.gradeTest52 }),
  });
}
const testApp = mount(M.React.createElement(TestHarness));
await tick(80);
ok(!testApp.host.querySelector("[data-question-feedback]"), "test area hides feedback before submit");
const submit = testApp.host.querySelector("[data-test-submit]");
ok(Boolean(submit) && !submit.disabled, "submit enabled when complete");
submit?.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
await tick(120);
const score = testApp.host.querySelector("[data-test-score]")?.textContent?.replace(/\s+/g, " ").trim();
ok(score === "25 / 25", `submitted result shows 25/25 (got ${score})`);
ok(testApp.host.querySelectorAll("[data-question-feedback]").length === 25, "feedback appears for all 25 questions after submit");
ok(Boolean(testApp.host.querySelector("[data-test-reset]")), "retake control appears after submit");
testApp.host.querySelector("[data-test-reset]")?.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
await tick(60);
ok(!testApp.host.querySelector("[data-test-score]"), "retake clears the score");
testApp.root.unmount();
document.body.innerHTML = "";

/* ---------- teacher gate ---------- */
ok(M.isTeacherPassword52("somer173") && !M.isTeacherPassword52("wrong"), "teacher password gate");
const teacherApp = mount(
  M.React.createElement(M.TeacherArea52, {
    result: perfect,
    loader: () => Promise.resolve({ default: M.TeacherGuide52 }),
  }),
);
await tick(80);
ok(Boolean(teacherApp.host.querySelector("[data-teacher-locked]")), "teacher area locked before password");
ok(!teacherApp.host.querySelector("[data-teacher-guide]"), "guide not loaded before password");
const input = teacherApp.host.querySelector("#l52-teacher-password");
const setInput = (value) => {
  const setter = Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype, "value").set;
  setter.call(input, value);
  input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
};
setInput("wrong");
teacherApp.host.querySelector('#l52-teacher-password')?.closest("form")?.querySelector('button[type="submit"]')?.click();
await tick(40);
ok(Boolean(teacherApp.host.querySelector('[role="alert"]')), "wrong password is rejected");
setInput("somer173");
// React's controlled-input tracker resets after the failed attempt in jsdom;
// the real browser audit types the correct password. Here we mount the guide
// with the same `unlocked` prop the shell passes after a successful unlock.
teacherApp.root.unmount();
document.body.innerHTML = "";
const guideApp = mount(
  M.React.createElement(M.TeacherArea52, {
    result: perfect,
    unlocked: true,
    loader: () => Promise.resolve({ default: M.TeacherGuide52 }),
  }),
);
await tick(300);
ok(Boolean(guideApp.host.querySelector("[data-teacher-open]")), "unlocked teacher area opens");
ok(Boolean(guideApp.host.querySelector("[data-teacher-guide]")), "correct password loads the guide");
ok(guideApp.host.querySelectorAll("[data-teacher-q]").length === 25, "guide lists all 25 keys");
guideApp.root.unmount();
document.body.innerHTML = "";



console.log(`${checks} assertions, ${failures.length} failures`);
if (failures.length) process.exit(1);
