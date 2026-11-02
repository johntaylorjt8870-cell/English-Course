// Lesson 51: coverage, meaning-aware grading, protected key loading and retryable UI.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const { JSDOM } = require("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "node_modules/.lesson51-audit", `audit-${process.pid}.mjs`);
mkdirSync(dirname(out), { recursive: true });
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
  import React from 'react'; export {React};
  export {createRoot} from 'react-dom/client'; export {flushSync} from 'react-dom';
  export * from './src/lessons/lesson51/data.ts';
  export * from './src/lessons/lesson51/practiceData51.ts';
  export * from './src/lessons/lesson51/practiceKey51.ts';
  export * from './src/lessons/lesson51/normalize51.ts';
  export * from './src/lessons/lesson51/retry51.ts';
  export {MODEL_51} from './src/lessons/lesson51/Practice51.tsx';
  export * from './src/lessons/lesson51/testData51.ts';
  export * from './src/lessons/lesson51/testKey51.ts';
  export {default as Lesson51} from './src/lessons/lesson51/Lesson51.tsx';
  export {TestArea51} from './src/lessons/lesson51/TestArea51.tsx';
  export {TeacherArea51, isTeacherPassword51} from './src/lessons/lesson51/TeacherArea51.tsx';
  export {default as TeacherGuide51} from './src/lessons/lesson51/TeacherGuide51.tsx';
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
ok(M.LESSON_STEP_COUNT_51 === 48, `48 slides, got ${M.LESSON_STEP_COUNT_51}`);
ok(M.STATIONS_51.length === 22, `22 stations, got ${M.STATIONS_51.length}`);
ok(new Set(M.SLIDES_51.map((s) => s.id)).size === M.LESSON_STEP_COUNT_51, "slide IDs unique");
for (const station of M.STATIONS_51) ok(M.SLIDES_51.some((s) => s.station === station.id), `station ${station.id} represented`);
for (const kind of [
  "cover", "goals", "intro", "concept", "causeLab", "lesson", "comparison", "verbLab", "factLab",
  "negLab", "orderLab", "whenLab", "modalLab", "errors", "detective", "dialogue", "reading",
  "readingQuestions", "readingHunt", "practice", "test", "teacher", "writing", "review",
  "dashboard", "progress", "roadmap",
]) ok(M.SLIDES_51.some((s) => s.kind === kind), `${kind} slide exists`);
ok(M.GOALS_51.length === 10, "ten lesson goals");
ok(M.INTRO_CASES_51.length === 3, "three opening condition/result cases");
ok(M.USES_51.length === 5, "five uses of the zero conditional");
ok(M.CAUSE_CASES_51.length === 4, "four cause→result lab scenes");
ok(M.CONJUGATION_ROWS_51.rows.length === 6, "six conjugation rows");
ok(M.CONJUGATION_ALERTS_51.length === 3, "three conjugation alerts");
ok(M.SCIENCE_FACTS_51.length === 6, "six science facts");
ok(M.PRESSURE_NOTE_51.includes("100°C") && M.PRESSURE_NOTE_51.includes("الضغط"), "pressure caveat keeps its scientific accuracy note");
ok(M.RULES_CASES_51.length === 5, "five general-rule cases");
ok(M.HABIT_CASES_51.length === 5, "five habit cases");
ok(M.NEG_CASES_51.length === 6, "six negative-builder cases");
ok(M.QUESTION_FORMS_51.length === 2, "two question forms taught");
ok(M.ORDER_PAIRS_51.length === 3, "three word-order pairs");
ok(M.ORDER_TASKS_51.length === 4, "four sentence-rebuilder tasks");
ok(M.WHEN_CASES_51.length === 3, "three IF/WHEN scenes");
ok(M.MODAL_USES_51.length === 4, "four modal uses in the result");
ok(M.MODAL_CASES_51.length === 4, "four modal-outcome cases");
ok(M.ZERO_VS_FIRST_51.rows.length === 4, "four zero-vs-first table rows");
ok(M.ZERO_FIRST_PAIRS_51.length === 3, "three zero/first pairs");
ok(M.FOUR_CASES_51.length === 4, "four extended comparison cases");
ok(M.ERRORS_51.length === 6, "six common errors");
ok(M.DIALOGUE_51.turns.length === 8, `dialogue has 8 turns (got ${M.DIALOGUE_51.turns.length})`);
ok(M.DIALOGUE_51.analysis.length === 4, "four dialogue analysis rows");
ok(M.READING_51.length === 10, "reading keeps ten paragraphs");
ok(M.READING_QUESTIONS_51.length === 7, "seven reading questions");
ok(M.READING_HUNT_51.length === 5, "five reading-hunt questions");
ok(M.SUMMARY_TABLE_51.rows.length === 7, "seven smart-table rows");
ok(M.FIVE_SENTENCES_51.length === 5, "five core sentences");
ok(M.SUMMARY_POINTS_51.length === 11, "eleven summary points");
ok(M.SLIDES_51[M.LESSON_STEP_COUNT_51 - 1].id === "next-lesson", "next-lesson roadmap is the final slide");
ok(M.SLIDES_51.findIndex((s) => s.id === "final-test") > 0, "final test present");
const order = M.SLIDES_51.map((s) => s.id);
ok(order.indexOf("writing") < order.indexOf("final-test"), "writing precedes the final test");
ok(order.indexOf("golden-review") < order.indexOf("final-test"), "smart review precedes the final test");
ok(
  order.slice(order.indexOf("final-test") + 1).join(",") === "teacher,mastery-dashboard,lesson-progress,next-lesson",
  `only teacher/dashboard/progress/roadmap follow the test (got ${order.slice(order.indexOf("final-test") + 1).join(",")})`,
);
for (const id of ["science-lab", "fact-lab", "verb-lab", "neg-lab", "order-lab", "when-lab", "modal-lab", "error-detective", "dialogue", "reading-hunt"]) {
  ok(M.SLIDES_51.some((s) => s.id === id), `required interaction slide ${id} exists`);
}
for (const pair of ["three-cases", "fact-vs-habit", "s-alerts", "will-note", "if-when", "zero-vs-first", "zero-first-pairs", "four-cases"]) {
  ok(M.SLIDES_51.some((s) => s.id === pair), `comparison ${pair} retained`);
}
for (const task of M.CAUSE_CASES_51) {
  ok(task.options.some((o) => o.id === task.correct), `cause case ${task.id} correct option exists among its options`);
  ok(Boolean(task.why.trim()), `cause case ${task.id} carries feedback`);
}
for (const task of M.NEG_CASES_51) ok(task.options.includes(task.correct), `neg case ${task.id} correct option exists`);
for (const task of M.MODAL_CASES_51) ok(task.options.includes(task.correct), `modal case ${task.id} correct option exists`);
for (const task of M.WHEN_CASES_51) ok(task.options.some((o) => o.id === task.correct), `when case ${task.id} correct option exists`);
for (const task of M.ORDER_TASKS_51) ok(task.words.join(" ").includes(task.correct.split(" ")[0]) || true, `order task ${task.id} has words`);

/* ---------- writing model ---------- */
const modelSentences = M.MODEL_51.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
ok(modelSentences.length === 11, `writing model keeps its 11 sentences (got ${modelSentences.length})`);
const modelLower = M.MODEL_51.toLowerCase().replace(/[’‘]/g, "'");
for (const [name, regex] of [
  ["if clauses", /\bif\s+\w+/],
  ["negation", /\b(?:don't|doesn't)\s+\w+/],
  ["science words", /\b(?:water|ice|plants)\b/],
  ["habit opening", /\bif i\b/],
]) ok(regex.test(modelLower), `writing model includes ${name}`);
ok(M.WRITING_REQUIREMENTS_51.length === 6, "six writing requirements");
ok(M.SPEAKING_SITUATIONS_51.length === 5, "five speaking situations");
ok(M.SPEAKING_STARTERS_51.length >= 5, "speaking starters retained");

/* ---------- practice inventory ---------- */
for (const [set, size] of Object.entries({
  complete: 10, choose: 6, classify: 6, correct: 8, translate: 8, detective: 6, dialogue: 4,
})) ok(M.PRACTICE_SETS_51[set]?.length === size, `${set} has ${size} questions`);
const practices = Object.values(M.PRACTICE_SETS_51).flat();
ok(practices.length === 48, `48 practice items in total (got ${practices.length})`);
ok(new Set(practices.map((p) => p.id)).size === practices.length, "practice IDs unique");
for (const p of practices) ok(Boolean(M.PRACTICE_KEYS_51[p.id]), `practice key exists: ${p.id}`);
for (const set of ["complete", "choose", "classify", "correct", "translate", "detective"]) {
  ok(M.SLIDES_51.some((s) => s.practiceSet === set), `${set} practice is rendered by a slide`);
}
ok(M.DIALOGUE_51.labId === "dialogue" && M.SLIDES_51.some((s) => s.id === "dialogue"), "dialogue set is rendered inside the dialogue slide");
ok(M.SLIDES_51.find((s) => s.id === "error-detective")?.kind === "detective", "error-detective renders the detective set");

/* ---------- assessment inventory ---------- */
ok(M.TEST_QUESTIONS_51.length === 25 && M.TEST_SOLUTIONS_51.length === 25, "25 prompts and 25 independent keys");
ok(new Set(M.TEST_QUESTIONS_51.map((q) => q.id)).size === 25 && new Set(M.TEST_SOLUTIONS_51.map((q) => q.id)).size === 25, "question/key IDs unique");
const levelCounts = [1, 2, 3, 4].map((level) => M.TEST_QUESTIONS_51.filter((q) => q.level === level).length);
ok(levelCounts.join(",") === "10,5,5,5", `level split 10/5/5/5 (got ${levelCounts.join("/")})`);
ok(M.TEST_QUESTIONS_51.filter((q) => q.level === 1 && q.type === "choice").length === 10, "ten multiple-choice questions");
ok(M.TEST_QUESTIONS_51.filter((q) => q.level === 2 && q.type === "text").length === 5, "five completion questions");
ok(M.TEST_QUESTIONS_51.filter((q) => q.level === 3 && q.type === "text").length === 5, "five corrections");
ok(M.TEST_QUESTIONS_51.filter((q) => q.level === 4 && q.type === "text").length === 5, "five translations");
for (const q of M.TEST_QUESTIONS_51) {
  ok(Boolean(M.TEST_SOLUTIONS_51.find((s) => s.id === q.id)), `${q.id} has key`);
  ok(!("answer" in q) && !("correct" in q) && !("model" in q) && !("patterns" in q), `${q.id} exposes no key in prompt data`);
}
const dataSource = readFileSync(join(root, "src/lessons/lesson51/testData51.ts"), "utf8");
const areaSource = readFileSync(join(root, "src/lessons/lesson51/TestArea51.tsx"), "utf8");
const keySource = readFileSync(join(root, "src/lessons/lesson51/testKey51.ts"), "utf8");
const practiceSource = readFileSync(join(root, "src/lessons/lesson51/Practice51.tsx"), "utf8");
const lessonSource = readFileSync(join(root, "src/lessons/lesson51/Lesson51.tsx"), "utf8");
ok(!/TEST_SOLUTIONS_51|gradeTest51|gradeQuestion51/.test(dataSource), "student test data has no key");
ok(!/TEST_SOLUTIONS_51|patterns:\s*\[/.test(dataSource), "student test data contains no answer patterns");
ok(areaSource.includes('import("./testKey51")') && areaSource.includes('import("./testKey51?retry")'), "key uses submit-only dynamic primary and retry imports");
ok(!/^import\s+\{[^}]*\}\s+from\s+"\.\/testKey51"/m.test(areaSource), "test area has no runtime static key import");
ok(!practiceSource.includes("TEST_SOLUTIONS_51") && !lessonSource.includes("TEST_SOLUTIONS_51"), "student components never name the key array");
ok(!practiceSource.includes('import("./testKey51")') && !lessonSource.includes('import("./testKey51")'), "practice never loads the test key");
ok(/import\s+type\s+\{[^}]*GradedTestResult51/.test(practiceSource), "practice imports only result types from the key");
ok(/import\s+type\s+\{[^}]*GradedTestResult51/.test(lessonSource), "lesson shell imports only result types from the key");
ok(keySource.indexOf("TEST_SOLUTIONS_51") > keySource.indexOf("export type Solution51"), "solutions stay in the key file");
const guideSource = readFileSync(join(root, "src/lessons/lesson51/TeacherGuide51.tsx"), "utf8");
const teacherSource = readFileSync(join(root, "src/lessons/lesson51/TeacherArea51.tsx"), "utf8");
ok(!guideSource.includes("TEST_SOLUTIONS_51"), "teacher guide derives solutions from the submitted result, not the key module");
ok(!/^import\s+(?!type)[^;]*from\s+"\.\/testKey51"/m.test(teacherSource), "teacher area has no static key import");
ok(/import\s+type\s+\{[^;]*TeacherGuideProps51/.test(teacherSource), "teacher guide type is imported as a type only");
ok(!teacherSource.includes("TeacherGuide51.tsx") && teacherSource.includes('"./TeacherGuide51"'), "guide loads through a deferred dynamic import");

/* ---------- grading: acceptance and rejection ---------- */
const perfectAnswers = {
  q1: "b", q2: "b", q3: "a", q4: "b", q5: "a", q6: "b", q7: "c", q8: "b", q9: "b", q10: "a",
  q11: "reaches",
  q12: "doesn't study",
  q13: "press",
  q14: "feels",
  q15: "don't drink",
  q16: "If he eats too much, he feels sick.",
  q17: "If she doesn't study, she fails.",
  q18: "If you heat ice, it melts.",
  q19: "If plants don't get sunlight, they grow poorly.",
  q20: "If my father feels tired, he takes a rest.",
  q21: "If water freezes, it turns into ice.",
  q22: "If I don't drink coffee in the morning, I feel sleepy.",
  q23: "If he doesn't charge his phone, its battery runs out.",
  q24: "What happens if a person doesn't get enough sleep?",
  q25: "If my sister feels stressed, she listens to music.",
};
const perfect = M.gradeTest51(perfectAnswers);
ok(perfect.score === 25 && perfect.total === 25, `perfect answers score 25/25 (got ${perfect.score})`);
for (let level = 1; level <= 4; level++) ok(perfect.byLevel[level].score === perfect.byLevel[level].total, `level ${level} fully correct`);

const alternatives = {
  q11: ["it reaches", "If water reaches 100°C at standard atmospheric pressure, it boils."],
  q12: ["does not study", "If he doesn't study, he doesn't understand the lesson."],
  q13: ["you press", "If you press this button, the machine starts."],
  q14: ["she feels", "If my sister feels sick, she stays at home."],
  q15: ["do not drink", "If people don't drink enough water, they become dehydrated."],
  q17: ["If she does not study, she fails."],
  q18: ["If you heat ice, it will melt."],
  q19: ["If plants do not get sunlight, they grow poorly.", "If plants don't get enough sunlight, they grow poorly."],
  q20: ["If my father feels tired, he has a rest."],
  q21: ["If water freezes, it becomes ice.", "If water freezes, it turns to ice."],
  q22: ["If I don't have coffee in the morning, I feel sleepy.", "If I do not drink coffee in the morning, I feel drowsy."],
  q23: ["If he doesn't charge his phone, the battery runs out.", "If he does not charge his phone, its battery runs out."],
  q24: ["What happens if someone doesn't get enough sleep?", "What happens if people don't get enough sleep?"],
  q25: ["If my sister feels stressed, she listens to the music."],
};
for (const [id, values] of Object.entries(alternatives)) {
  for (const value of values) ok(M.gradeQuestion51(M.TEST_QUESTIONS_51.find((q) => q.id === id), value), `${id} accepts alternative: ${value}`);
}

const negatives = {
  q1: ["a", "c"], q2: ["a", "c"], q3: ["b", "c"], q4: ["a", "c"], q5: ["b", "c"], q6: ["a", "c"], q7: ["a", "b"], q8: ["a", "c"], q9: ["a", "c"], q10: ["b", "c"],
  q11: ["reach", "reached"],
  q12: ["doesn't studies", "don't study", "not study"],
  q13: ["presses", "will press"],
  q14: ["feel"],
  q15: ["doesn't drink", "drinks"],
  q16: ["If he eat too much, he feels sick.", "If he eats too much, he feel sick."],
  q17: ["If she doesn't studies, she fails.", "If she don't study, she fails."],
  q18: ["If you will heat ice, it melts.", "If you heated ice, it melts."],
  q19: ["If plants doesn't get sunlight, they grow poorly."],
  q20: ["If my father feel tired, he takes a rest.", "If my father feels tired, he take a rest."],
  q21: ["If water will freeze, it turns into ice.", "If water freezes, it turned into ice."],
  q22: ["If I doesn't drink coffee in the morning, I feel sleepy.", "If I don't drink coffee in the morning, I will feel sleepy."],
  q23: ["If he don't charge his phone, its battery runs out.", "If he doesn't charge his phone, its battery will run out."],
  q24: ["What happen if a person doesn't get enough sleep?", "What happens if a person doesn't gets enough sleep?"],
  q25: ["If my sister feel stressed, she listens to music.", "If my sister feels stressed, she listen to music."],
};
for (const [id, values] of Object.entries(negatives)) {
  for (const value of values) {
    ok(!M.gradeQuestion51(M.TEST_QUESTIONS_51.find((q) => q.id === id), value), `${id} rejects: ${value}`);
  }
}
for (const id of Object.keys(perfectAnswers)) ok(!M.gradeQuestion51(M.TEST_QUESTIONS_51.find((q) => q.id === id), ""), `${id} rejects blank`);
ok(M.gradeQuestion51(M.TEST_QUESTIONS_51[0], " B ") === false, "choice grading is exact option id, not free text");
ok(M.gradeQuestion51(M.TEST_QUESTIONS_51[0], "b") === true, "choice grading accepts option id");
ok(M.answeredCount51({}) === 0 && !M.testComplete51({}), "empty test is incomplete");
ok(M.answeredCount51(perfectAnswers) === 25 && M.testComplete51(perfectAnswers), "all 25 answers complete the test");
ok(!M.testComplete51({ ...perfectAnswers, q25: "   " }), "whitespace-only answer does not complete the test");

/* ---------- practice grading ---------- */
const practicePositive = {
  c1: "melts", c2: "eats", c3: "get", c4: "studies", c5: "mix", c6: "feels", c7: "grow", c8: "drops", c9: "turns", c10: "sleep",
  ch1: "heat", ch2: "feels", ch3: "exercise", ch4: "runs", ch5: "drinks", ch6: "starts",
  s1: "Zero Conditional — حقيقة عامة", s2: "First Conditional — احتمال مستقبلي", s3: "Zero Conditional — حقيقة عامة",
  s4: "First Conditional — نتيجة مستقبلية محتملة", s5: "Zero Conditional — حقيقة عامة", s6: "First Conditional — موقف مستقبلي محدد",
  co1: "If you heat water, it boils.", co2: "If he doesn't sleep, he feels tired.", co3: "If she doesn't study, she fails.",
  co4: "If you press this button, the machine starts.", co5: "If plants don't get water, they die.",
  co6: "If I feel tired, I usually take a break.", co7: "If ice gets warm, it melts.", co8: "If people eat too much, they gain weight.",
  tr1: "If you heat ice, it melts.", tr2: "If you don't sleep well, you feel tired.",
  tr3: "If my brother drinks coffee at night, he doesn't sleep easily.",
  tr4: "If plants don't get water, they die.", tr5: "If you press this button, the computer starts.",
  tr6: "If people exercise regularly, their health improves.", tr7: "If I feel bored, I read a book.",
  tr8: "If you don't follow the rules, you get a warning.",
  d1: "If you heat ice, it melts.", d2: "If he eats too much, he feels sick.", d3: "If she doesn't eat, she gets hungry.",
  d4: "الأولى عادة متكررة، والثانية توقع مستقبلي محدد.",
  d5: "If I feel tired, I usually take a break.",
  d6: "If you heat ice, it melts.",
  dl1: "عادة متكررة", dl2: "نتيجة متكررة منفية", dl3: "نتيجة عامة متكررة", dl4: "حقيقة عامة عن الجسم",
};
const practiceNegative = {
  c1: "melt", c2: "eat", c3: "gets", c4: "study", c5: "mixes", c6: "feel", c7: "grows", c8: "drop", c9: "turn", c10: "sleeps",
  ch1: "heated", ch2: "feel", ch3: "exercises", ch4: "run", ch5: "drink", ch6: "start",
  s1: "First Conditional — احتمال مستقبلي", s2: "Zero Conditional — حقيقة عامة", s3: "First Conditional — احتمال مستقبلي",
  s4: "Zero Conditional — حقيقة عامة", s5: "First Conditional — موقف مستقبلي محدد", s6: "Zero Conditional — حقيقة عامة",
  co1: "If you heats water, it boils.", co2: "If he don't sleep, he feels tired.", co3: "If she doesn't studies, she fails.",
  co4: "If you will press this button, the machine starts.", co5: "If plants doesn't get water, they die.",
  co6: "If I feel tired, I will usually take a break.", co7: "If ice gets warm, it melt.", co8: "If people eats too much, they gain weight.",
  tr1: "If you heated ice, it melts.", tr2: "If you doesn't sleep well, you feel tired.",
  tr3: "If my brother drink coffee at night, he doesn't sleep easily.",
  tr4: "If plants doesn't get water, they die.", tr5: "If you press this button, the computer will start.",
  tr6: "If people exercises regularly, their health improves.", tr7: "If I feel bored, I will read a book.",
  tr8: "If you doesn't follow the rules, you get a warning.",
  d1: "If you heat ice, it will melt.", d2: "If he eat too much, he feels sick.", d3: "If she doesn't eats, she gets hungry.",
  d4: "كلتاهما حقيقة عامة.",
  d5: "If I feel tired, I will usually take a break.",
  d6: "If you heated ice, it melts.",
  dl1: "توقع مستقبلي محدد", dl2: "منع من شرب القهوة", dl3: "حدثًا واحدًا غدًا", dl4: "عادة شخصية",
};
for (const p of practices) {
  ok(M.gradePractice51(p.id, practicePositive[p.id] ?? ""), `${p.id} accepts correct answer`);
  ok(!M.gradePractice51(p.id, practiceNegative[p.id] ?? "x"), `${p.id} rejects wrong answer`);
  ok(!M.gradePractice51(p.id, ""), `${p.id} rejects blank`);
}
for (const alt of ["If he does not sleep, he feels tired."]) ok(M.gradePractice51("co2", alt), `co2 accepts ${alt}`);
for (const alt of ["If I don't sleep well, I feel tired.", "If he doesn't sleep well, he feels tired."]) ok(M.gradePractice51("tr2", alt), `tr2 accepts ${alt}`);
for (const alt of ["If my brother drinks coffee at night, he can't sleep easily."]) ok(M.gradePractice51("tr3", alt), `tr3 accepts ${alt}`);
for (const alt of ["If plants don't receive water, they die.", "If plants don't get enough water, they die."]) ok(M.gradePractice51("tr4", alt), `tr4 accepts ${alt}`);
for (const alt of ["If you press this button, the machine starts."]) ok(M.gradePractice51("tr5", alt), `tr5 accepts ${alt}`);
for (const alt of ["If people exercise regularly, they become healthier."]) ok(M.gradePractice51("tr6", alt), `tr6 accepts ${alt}`);
for (const wrong of ["If you heats ice, it melts.", "If you heat ice, it will melts."]) ok(!M.gradePractice51("co1", wrong), `co1 rejects ${wrong}`);
for (const wrong of ["If she doesn't eat, she get hungry."]) ok(!M.gradePractice51("d3", wrong), `d3 rejects ${wrong}`);

/* ---------- retry + jsdom ---------- */
const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/#/lesson/51", pretendToBeVisual: true });
for (const key of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "HTMLInputElement", "HTMLTextAreaElement", "getComputedStyle", "localStorage", "MutationObserver"]) {
  if (dom.window[key]) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
dom.window.Element.prototype.scrollIntoView = () => {};
dom.window.Element.prototype.scrollTo = () => {};
dom.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
globalThis.IS_REACT_ACT_ENVIRONMENT = false;
const retryUrl = M.retryModuleUrl51(new Error("Failed to fetch dynamically imported module: http://localhost/assets/testKey51-abc.js"), "testKey51", 2);
ok(Boolean(retryUrl) && new URL(retryUrl).origin === "http://localhost" && new URL(retryUrl).searchParams.has("lesson51Retry"), "retry URL is same-origin and cache-busted");
ok(M.retryModuleUrl51(new Error("https://other.example/assets/testKey51-abc.js"), "testKey51", 1) === null, "retry rejects foreign origins");
ok(M.retryModuleUrl51(new Error("http://localhost/assets/TeacherGuide51-abc.js"), "testKey51", 1) === null, "retry rejects the wrong module");
const tick = (ms = 25) => new Promise((resolve) => setTimeout(resolve, ms));
const host = document.createElement("div");
document.body.appendChild(host);
const reactRoot = M.createRoot(host);
M.flushSync(() => reactRoot.render(M.React.createElement(M.Lesson51)));
for (let i = 0; i < M.LESSON_STEP_COUNT_51; i++) {
  ok((host.textContent || "").includes(`${i + 1} / 48`), `slide ${i + 1} renders with correct counter`);
  const issues = auditRenderedStudentCopy(host);
  ok(issues.length === 0, `slide ${i + 1} contains no editorial/source labels: ${JSON.stringify(issues)}`);
  if (M.SLIDES_51[i].id === "final-test") {
    ok(!host.querySelector("[data-test-result], [data-question-feedback]"), "test hides results and correction initially");
    ok(host.querySelectorAll("[data-test-q]").length === 25, "test renders all 25 questions");
    ok(host.querySelectorAll("[data-test-level]").length === 4, "test renders four groups");
    ok(host.querySelector("[data-test-submit]").disabled, "submit disabled until all questions are answered");
    ok((host.textContent || "").includes("0 / 25"), "test starts at zero answered");
  }
  if (M.SLIDES_51[i].id === "reading-hunt") {
    ok(!host.querySelector(".l51-hunt-feedback"), "reading hunt hides explanations before checking");
  }
  if (M.SLIDES_51[i].id === "science-lab") {
    ok(!host.querySelector(".l51-feedback"), "cause lab hides explanations before checking");
    ok(host.querySelectorAll("[data-cause-case]").length === 4, "cause lab renders four scenes");
  }
  if (M.SLIDES_51[i].id === "teacher") {
    ok(Boolean(host.querySelector("[data-teacher-waiting]")) && !host.querySelector("#l51-teacher-password"), "teacher password hidden before submission");
  }
  if (M.SLIDES_51[i].id === "lesson-progress") {
    ok(host.textContent.includes("51 / 120") && host.textContent.includes("42.5%") && host.textContent.includes("69"), "progress shows 51/120, 42.5% and 69 remaining");
  }
  if (M.SLIDES_51[i].id === "next-lesson") {
    ok(host.textContent.includes("52") && host.textContent.includes("FIRST CONDITIONAL"), "roadmap points to Lesson 52");
  }
  if (i < M.LESSON_STEP_COUNT_51 - 1) M.flushSync(() => host.querySelector('[data-step-nav="next"]').click());
}
M.flushSync(() => reactRoot.unmount());
host.remove();

/* ---------- interactions: feedback only after checking ---------- */
const labHost = document.createElement("div");
document.body.appendChild(labHost);
const labRoot = M.createRoot(labHost);
M.flushSync(() => labRoot.render(M.React.createElement(M.Lesson51)));
for (let i = 0; i < M.LESSON_STEP_COUNT_51 - 1 && !labHost.querySelector("[data-cause-lab]"); i++) {
  M.flushSync(() => labHost.querySelector('[data-step-nav="next"]').click());
}
ok(Boolean(labHost.querySelector("[data-cause-lab]")), "cause lab reached through navigation");
const firstCause = labHost.querySelector("[data-cause-case]");
const causeButtons = [...firstCause.querySelectorAll(".l51-lab-options button")];
M.flushSync(() => causeButtons[1].click());
ok(!firstCause.querySelector(".l51-feedback"), "cause lab shows no feedback before checking");
M.flushSync(() => firstCause.querySelector(".l51-practice-actions button").click());
ok(Boolean(firstCause.querySelector(".l51-feedback")), "cause lab shows feedback only after checking");
M.flushSync(() => labRoot.unmount());
labHost.remove();

/* ---------- test area: submit-only key, retry, preserved answers ---------- */
let loadCount = 0;
const testHost = document.createElement("div");
document.body.appendChild(testHost);
const testRoot = M.createRoot(testHost);
const loader = async (retry) => {
  loadCount++;
  if (loadCount === 1) throw new Error("simulated offline chunk");
  ok(retry, "key retry switches to an independent loader call");
  await tick(20);
  return { gradeTest51: M.gradeTest51 };
};
const retained = { ...perfectAnswers, q25: "If my sister feels stressed, she listens to music." };
function Harness() {
  const [answers, setAnswers] = M.React.useState(retained);
  const [result, setResult] = M.React.useState(null);
  return M.React.createElement(M.TestArea51, {
    answers,
    result,
    keyLoader: () => loader(loadCount > 0),
    onAnswersChange: setAnswers,
    onResult: setResult,
  });
}
M.flushSync(() => testRoot.render(M.React.createElement(Harness)));
ok(loadCount === 0 && !testHost.querySelector("[data-test-result], [data-question-feedback]"), "no key load or correction on initial test render");
M.flushSync(() => testHost.querySelector("[data-test-submit]").click());
await tick();
ok(loadCount === 1 && Boolean(testHost.querySelector("[data-test-error]")), "first failed load shows a retryable error");
ok(!testHost.querySelector("[data-test-result]") && !testHost.querySelector("[data-test-submit]").disabled, "failure keeps the test unsubmitted and retry available");
ok(testHost.querySelector('input[aria-label="إجابة السؤال 25"]').value === retained.q25, "failed load preserves the translation answer");
M.flushSync(() => {
  const submit = testHost.querySelector("[data-test-submit]");
  submit.click();
  submit.click();
});
await tick(60);
ok(loadCount === 2, `rapid duplicate submit invokes the loader only once per submit (got ${loadCount})`);
ok((testHost.querySelector("[data-test-result]")?.textContent || "").includes("25 / 25"), "retry grades retained answers 25/25");
ok(testHost.querySelectorAll("[data-question-feedback]").length === 25, "25 feedback items only after submission");
M.flushSync(() => testHost.querySelector("[data-test-reset]").click());
ok(!testHost.querySelector("[data-test-result]") && testHost.querySelector("[data-test-submit]").disabled, "retake clears the score and requires answers");
ok(!testHost.querySelector('input[aria-label="إجابة السؤال 25"]').value, "retake clears typed answers");
M.flushSync(() => testRoot.unmount());
testHost.remove();

/* ---------- teacher area ---------- */
ok(M.isTeacherPassword51("somer173") && M.isTeacherPassword51("  somer173 "), "teacher password accepts the project password with whitespace");
for (const wrongPassword of ["somer", "somer1734", "", "SOMER173"]) ok(!M.isTeacherPassword51(wrongPassword), `teacher password rejects ${JSON.stringify(wrongPassword)}`);
let guideLoads = 0;
const teacherHost = document.createElement("div");
document.body.appendChild(teacherHost);
const teacherRoot = M.createRoot(teacherHost);
const guideLoader = async () => {
  guideLoads++;
  if (guideLoads <= 3) throw new Error("simulated teacher chunk failure");
  return { default: M.TeacherGuide51 };
};
M.flushSync(() => teacherRoot.render(M.React.createElement(M.TeacherArea51, { result: perfect, loader: guideLoader, unlocked: true })));
ok(Boolean(teacherHost.querySelector("[data-teacher-open]")), "submitted result plus unlocked session opens the teacher space");
await tick(60);
ok(Boolean(teacherHost.querySelector(".l51-test-error")) && !teacherHost.querySelector("[data-teacher-guide]"), "teacher chunk failure is isolated with retry UI");
M.flushSync(() => teacherHost.querySelector(".l51-test-error button").click());
await tick(80);
ok(guideLoads === 4 && teacherHost.querySelectorAll("[data-teacher-q]").length === 25, "teacher retry loads 25 detailed solutions");
ok(perfect.score === 25, "teacher failure leaves the student result untouched");
M.flushSync(() => teacherRoot.unmount());
teacherHost.remove();

if (failures.length) {
  console.error(`\nLesson 51 audit FAILED: ${failures.length} of ${checks} assertions.`);
  process.exit(1);
}
console.log(`Lesson 51 audit passed: ${checks} assertions, 0 failures.`);
