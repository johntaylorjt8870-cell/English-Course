// Lesson 50: coverage, meaning-aware grading, protected key loading and retryable UI.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const { JSDOM } = require("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "node_modules/.lesson50-audit", `audit-${process.pid}.mjs`);
mkdirSync(dirname(out), { recursive: true });
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
  import React from 'react'; export {React};
  export {createRoot} from 'react-dom/client'; export {flushSync} from 'react-dom';
  export * from './src/lessons/lesson50/data.ts';
  export * from './src/lessons/lesson50/practiceData50.ts';
  export * from './src/lessons/lesson50/practiceKey50.ts';
  export * from './src/lessons/lesson50/normalize50.ts';
  export * from './src/lessons/lesson50/retry50.ts';
  export {MODEL_50} from './src/lessons/lesson50/Practice50.tsx';
  export * from './src/lessons/lesson50/testData50.ts';
  export * from './src/lessons/lesson50/testKey50.ts';
  export {default as Lesson50} from './src/lessons/lesson50/Lesson50.tsx';
  export {TestArea50} from './src/lessons/lesson50/TestArea50.tsx';
  export {TeacherArea50, isTeacherPassword50} from './src/lessons/lesson50/TeacherArea50.tsx';
  export {default as TeacherGuide50} from './src/lessons/lesson50/TeacherGuide50.tsx';
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
ok(M.LESSON_STEP_COUNT_50 === 46, `46 slides, got ${M.LESSON_STEP_COUNT_50}`);
ok(M.STATIONS_50.length === 20, `20 stations, got ${M.STATIONS_50.length}`);
ok(new Set(M.SLIDES_50.map((s) => s.id)).size === M.LESSON_STEP_COUNT_50, "slide IDs unique");
for (const station of M.STATIONS_50) ok(M.SLIDES_50.some((s) => s.station === station.id), `station ${station.id} represented`);
for (const kind of [
  "cover", "goals", "intro", "concept", "certaintyLab", "lesson", "comparison", "cases", "lensLab",
  "couldLab", "decision", "errors", "detective", "dialogue", "reading", "readingQuestions", "readingHunt",
  "practice", "test", "teacher", "writing", "review", "dashboard", "progress", "roadmap",
]) ok(M.SLIDES_50.some((s) => s.kind === kind), `${kind} slide exists`);
ok(M.GOALS_50.length === 10, "ten lesson goals");
ok(M.ROOM_CLUES_50.length === 3, "three room-scene verdicts");
ok(M.CERTAINTY_LEVELS_50.length === 3, "three certainty stops");
ok(M.CERTAINTY_CASES_50.length === 4, "four certainty-gauge scenes");
ok(M.AHMAD_ROWS_50.length === 5, "five Ahmed certainty rows");
ok(M.BOOKS_ROWS_50.length === 4, "four books-carrier rows");
ok(M.CASE_TASKS_50.length === 4, "four evidence-board tasks");
ok(M.LENS_PAIRS_50.length === 7, "seven present/past lens pairs");
ok(M.COULD_USES_50.length === 4, "four uses of COULD");
ok(M.COULD_LAB_50.length === 6, "six COULD classification items");
ok(M.ERRORS_50.length === 6, "six common errors");
ok(M.DIALOGUE_50.turns.length === 9, `dialogue has 9 turns (got ${M.DIALOGUE_50.turns.length})`);
ok(M.DIALOGUE_50.analysis.length === 6, "six dialogue analysis rows");
ok(M.READING_50.length === 9, "reading keeps nine paragraphs");
ok(M.READING_QUESTIONS_50.length === 7, "seven reading questions");
ok(M.READING_HUNT_50.length === 5, "five reading-hunt questions");
ok(M.SUMMARY_TABLE_50.rows.length === 6, "six smart-table rows");
ok(M.FIVE_SENTENCES_50.length === 5, "five core sentences");
ok(M.SUMMARY_POINTS_50.length === 11, "eleven summary points");
ok(M.SLIDES_50[M.LESSON_STEP_COUNT_50 - 1].id === "next-lesson", "next-lesson roadmap is the final slide");
ok(M.SLIDES_50.findIndex((s) => s.id === "final-test") > 0, "final test present");
// The final test is the last assessed station: writing and smart review precede it,
// and only teacher / dashboard / progress / roadmap follow it.
const order = M.SLIDES_50.map((s) => s.id);
ok(order.indexOf("writing") < order.indexOf("final-test"), "writing precedes the final test");
ok(order.indexOf("golden-review") < order.indexOf("final-test"), "smart review precedes the final test");
ok(
  order.slice(order.indexOf("final-test") + 1).join(",") === "teacher,mastery-dashboard,lesson-progress,next-lesson",
  `only teacher/dashboard/progress/roadmap follow the test (got ${order.slice(order.indexOf("final-test") + 1).join(",")})`,
);
for (const id of ["certainty-lab", "ahmad-case", "books-case", "lens-lab", "could-lab", "decision-lab", "dialogue", "reading-hunt"]) {
  ok(M.SLIDES_50.some((s) => s.id === id), `required interaction slide ${id} exists`);
}
for (const pair of ["maybe-nuance", "cant-vs-mustnt", "lens-table", "done-vs-doing", "bag-case"]) {
  ok(M.SLIDES_50.some((s) => s.id === pair), `comparison ${pair} retained`);
}
for (const task of [...M.CERTAINTY_CASES_50, ...M.CASE_TASKS_50]) {
  ok(task.options.some((o) => o.id === task.correct), `case ${task.id} correct option exists among its options`);
  ok(Boolean(task.why.trim()), `case ${task.id} carries feedback`);
}
for (const item of M.COULD_LAB_50) ok(M.COULD_USES_50.some((u) => u.id === item.correct), `could-lab ${item.id} maps to a taught use`);

/* ---------- writing model ---------- */
const modelSentences = M.MODEL_50.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
ok(modelSentences.length === 8, `writing model keeps its 8 sentences (got ${modelSentences.length})`);
const modelLower = M.MODEL_50.toLowerCase().replace(/[’‘]/g, "'");
for (const [name, regex] of [
  ["must be", /\bmust be\b/],
  ["might be", /\bmight be\b/],
  ["could have", /\bcould have\b/],
  ["must have", /\bmust have\b/],
  ["can't have", /\bcan't have\b/],
  ["might have", /\bmight have\b/],
]) ok(regex.test(modelLower), `writing model includes ${name}`);

/* ---------- practice inventory ---------- */
for (const [set, size] of Object.entries({
  choose: 6, complete: 8, classify: 6, correct: 8, translate: 8, detective: 6, dialogue: 5,
})) ok(M.PRACTICE_SETS_50[set]?.length === size, `${set} has ${size} questions`);
const practices = Object.values(M.PRACTICE_SETS_50).flat();
ok(practices.length === 47, `47 practice items in total (got ${practices.length})`);
ok(new Set(practices.map((p) => p.id)).size === practices.length, "practice IDs unique");
for (const p of practices) ok(Boolean(M.PRACTICE_KEYS_50[p.id]), `practice key exists: ${p.id}`);
for (const set of ["choose", "complete", "classify", "correct", "translate", "detective"]) {
  ok(M.SLIDES_50.some((s) => s.practiceSet === set), `${set} practice is rendered by a slide`);
}
ok(M.DIALOGUE_50.labId === "dialogue" && M.SLIDES_50.some((s) => s.id === "dialogue"), "dialogue set is rendered inside the dialogue slide");
ok(M.SLIDES_50.find((s) => s.id === "error-detective")?.kind === "detective", "error-detective renders the detective set");

/* ---------- assessment inventory ---------- */
ok(M.TEST_QUESTIONS_50.length === 25 && M.TEST_SOLUTIONS_50.length === 25, "25 prompts and 25 independent keys");
ok(new Set(M.TEST_QUESTIONS_50.map((q) => q.id)).size === 25 && new Set(M.TEST_SOLUTIONS_50.map((q) => q.id)).size === 25, "question/key IDs unique");
const levelCounts = [1, 2, 3, 4].map((level) => M.TEST_QUESTIONS_50.filter((q) => q.level === level).length);
ok(levelCounts.join(",") === "10,5,5,5", `level split 10/5/5/5 (got ${levelCounts.join("/")})`);
ok(M.TEST_QUESTIONS_50.filter((q) => q.level === 1 && q.type === "choice").length === 10, "ten multiple-choice questions");
ok(M.TEST_QUESTIONS_50.filter((q) => q.level === 2 && q.type === "text").length === 5, "five completion questions");
ok(M.TEST_QUESTIONS_50.filter((q) => q.level === 3 && q.type === "text").length === 5, "five corrections");
ok(M.TEST_QUESTIONS_50.filter((q) => q.level === 4 && q.type === "text").length === 5, "five translations");
for (const q of M.TEST_QUESTIONS_50) {
  ok(Boolean(M.TEST_SOLUTIONS_50.find((s) => s.id === q.id)), `${q.id} has key`);
  ok(!("answer" in q) && !("correct" in q) && !("model" in q) && !("patterns" in q), `${q.id} exposes no key in prompt data`);
}
const dataSource = readFileSync(join(root, "src/lessons/lesson50/testData50.ts"), "utf8");
const areaSource = readFileSync(join(root, "src/lessons/lesson50/TestArea50.tsx"), "utf8");
const keySource = readFileSync(join(root, "src/lessons/lesson50/testKey50.ts"), "utf8");
const practiceSource = readFileSync(join(root, "src/lessons/lesson50/Practice50.tsx"), "utf8");
const lessonSource = readFileSync(join(root, "src/lessons/lesson50/Lesson50.tsx"), "utf8");
ok(!/TEST_SOLUTIONS_50|gradeTest50|gradeQuestion50|patterns/.test(dataSource), "student test data has no key");
ok(!/TEST_SOLUTIONS_50|patterns:\s*\[/.test(dataSource), "student test data contains no answer patterns");
ok(areaSource.includes('import("./testKey50")') && areaSource.includes('import("./testKey50?retry")'), "key uses submit-only dynamic primary and retry imports");
ok(!/^import\s+\{[^}]*\}\s+from\s+"\.\/testKey50"/m.test(areaSource), "test area has no runtime static key import");
ok(!practiceSource.includes("TEST_SOLUTIONS_50") && !lessonSource.includes("TEST_SOLUTIONS_50"), "student components never name the key array");
ok(!practiceSource.includes('import("./testKey50")') && !lessonSource.includes('import("./testKey50")'), "practice never loads the test key");
ok(/import\s+type\s+\{[^}]*GradedTestResult50/.test(practiceSource), "practice imports only result types from the key");
ok(/import\s+type\s+\{[^}]*GradedTestResult50/.test(lessonSource), "lesson shell imports only result types from the key");
ok(keySource.indexOf("TEST_SOLUTIONS_50") > keySource.indexOf("export type Solution50"), "solutions stay in the key file");
const guideSource = readFileSync(join(root, "src/lessons/lesson50/TeacherGuide50.tsx"), "utf8");
const teacherSource = readFileSync(join(root, "src/lessons/lesson50/TeacherArea50.tsx"), "utf8");
ok(!guideSource.includes("TEST_SOLUTIONS_50"), "teacher guide derives solutions from the submitted result, not the key module");
ok(!/^import\s+(?!type)[^;]*from\s+"\.\/testKey50"/m.test(teacherSource), "teacher area has no static key import");
ok(/import\s+type\s+\{[^;]*TeacherGuideProps50/.test(teacherSource), "teacher guide type is imported as a type only");
ok(!teacherSource.includes("TeacherGuide50.tsx") && teacherSource.includes('"./TeacherGuide50"'), "guide loads through a deferred dynamic import");

/* ---------- grading: acceptance and rejection ---------- */
const perfectAnswers = {
  q1: "a", q2: "b", q3: "b", q4: "a", q5: "a", q6: "a", q7: "a", q8: "a", q9: "b", q10: "a",
  q11: "be",
  q12: "taken",
  q13: "be",
  q14: "working",
  q15: "playing",
  q16: "She must have left.",
  q17: "He can't have gone to school.",
  q18: "They might have seen us.",
  q19: "He must have been sleeping.",
  q20: "She can't be the manager. She's only a student.",
  q21: "They must be at home now.",
  q22: "She might have left her phone in the car.",
  q23: "He can't have been driving at that time.",
  q24: "She might be talking to her mother now.",
  q25: "He must have been studying when I called him.",
};
const perfect = M.gradeTest50(perfectAnswers);
ok(perfect.score === 25 && perfect.total === 25, `perfect answers score 25/25 (got ${perfect.score})`);
for (let level = 1; level <= 4; level++) ok(perfect.byLevel[level].score === perfect.byLevel[level].total, `level ${level} fully correct`);

const alternatives = {
  q11: ["must be", "He must be very tired."],
  q12: ["have taken", "They might have taken the wrong road."],
  q13: ["can't be", "She cannot be serious."],
  q14: ["been working", "He must have been working all night."],
  q15: ["be playing", "The children could be playing outside."],
  q17: ["He can't be going to school.", "He cannot have gone to school."],
  q20: ["She can't be the manager.", "she cannot be the manager she is only a student"],
  q21: ["They must be home now."],
  q22: ["She may have forgotten her phone in the car.", "She could have left her phone in the car."],
  q23: ["He couldn't have been driving the car at that time.", "He can't have been driving at that moment."],
  q24: ["She may be speaking to her mother now.", "She could be talking with her mother now."],
  q25: ["He must have been studying when I phoned him.", "he must have been studying when i called"],
};
for (const [id, values] of Object.entries(alternatives)) {
  for (const value of values) ok(M.gradeQuestion50(M.TEST_QUESTIONS_50.find((q) => q.id === id), value), `${id} accepts alternative: ${value}`);
}

const negatives = {
  q1: ["b", "c"], q2: ["a", "c"], q3: ["a", "c"], q4: ["b", "c"], q5: ["b", "c"], q6: ["b", "c"], q7: ["b", "c"], q8: ["b", "c"], q9: ["a", "c"], q10: ["b", "c"],
  q11: ["been", "is", "have been"],
  q12: ["took", "take", "taking"],
  q13: ["been", "is"],
  q14: ["work", "worked"],
  q15: ["play", "played"],
  q16: ["She must has left.", "She must have leave.", "She has must left."],
  q17: ["He can't be went to school.", "He can't gone to school.", "He mustn't have gone to school."],
  q18: ["They might have saw us.", "They might saw us."],
  q19: ["He must have been sleep.", "He must have been slept."],
  q20: ["She mustn't be the manager.", "She can't is the manager."],
  q21: ["They must be at home.", "They must have been at home now.", "They must at home now."],
  q22: ["She might left her phone in the car.", "She must have left her phone in the car.", "She might have leave her phone in the car."],
  q23: ["He can't be driving at that time.", "He can't have drove at that time.", "He must have been driving at that time."],
  q24: ["She might talk to her mother now.", "She might be talking to her mother.", "She must be talking to her mother now."],
  q25: ["He must be studying when I called him.", "He must have studied when I called him.", "He must have been study when I called him."],
};
for (const [id, values] of Object.entries(negatives)) {
  for (const value of values) {
    ok(!M.gradeQuestion50(M.TEST_QUESTIONS_50.find((q) => q.id === id), value), `${id} rejects: ${value}`);
  }
}
for (const id of Object.keys(perfectAnswers)) ok(!M.gradeQuestion50(M.TEST_QUESTIONS_50.find((q) => q.id === id), ""), `${id} rejects blank`);
ok(M.gradeQuestion50(M.TEST_QUESTIONS_50[0], " A ") === false, "choice grading is exact option id, not free text");
ok(M.gradeQuestion50(M.TEST_QUESTIONS_50[1], "b") === true, "choice grading accepts option id");
ok(M.answeredCount50({}) === 0 && !M.testComplete50({}), "empty test is incomplete");
ok(M.answeredCount50(perfectAnswers) === 25 && M.testComplete50(perfectAnswers), "all 25 answers complete the test");
ok(!M.testComplete50({ ...perfectAnswers, q25: "   " }), "whitespace-only answer does not complete the test");

/* ---------- practice grading ---------- */
const practicePositive = {
  ch1: "must", ch2: "can't", ch3: "can't", ch4: "must", ch5: "can't", ch6: "might",
  c1: "be", c2: "be studying", c3: "left", c4: "finished", c5: "waiting", c6: "playing", c7: "be", c8: "know",
  s1: "الحاضر — استنتاج قوي", s2: "الماضي — احتمال", s3: "الحاضر — نفي قوي",
  s4: "الماضي — استنتاج قوي", s5: "الحاضر — احتمال لنشاط مستمر", s6: "الماضي — نفي قوي",
  co1: "He must be tired.", co2: "She might have forgotten.", co3: "They can't have gone home.",
  co4: "He must have seen the accident.", co5: "She might be sleeping now.", co6: "They must have been playing football.",
  co7: "He can't be the teacher.", co8: "She can't have gone there.",
  tr1: "He must be sleeping now.", tr2: "She might be in the library.", tr3: "They can't know the answer.",
  tr4: "She must have left early.", tr5: "He might have been waiting for us.",
  tr6: "He can't have bought this car; it's too expensive for him.",
  tr7: "The children might be playing in the garden now.", tr8: "They must have been working when I called them.",
  d1: "He can't be at home.", d2: "She must have forgotten.", d3: "He might have gone.",
  d4: "الأولى استنتاج عن حالته، والثانية إلزام.",
  d5: "الأولى ربما تكون مريضة الآن، والثانية ربما كانت مريضة في الماضي.",
  d6: "فرصة كانت متاحة ولم تحدث.",
  dl1: "استنتاج عن الحاضر", dl2: "احتمال لنشاط مستمر الآن", dl3: "استنتاج قوي عن الماضي",
  dl4: "احتمال عن الماضي", dl5: "استنتاج سلبي قوي عن الماضي",
};
const practiceNegative = {
  ch1: "can't", ch2: "must", ch3: "mustn't", ch4: "can't", ch5: "must", ch6: "mustn't",
  c1: "been", c2: "study", c3: "leave", c4: "finish", c5: "wait", c6: "play", c7: "been", c8: "knows",
  s1: "الماضي — احتمال", s2: "الحاضر — احتمال", s3: "الماضي — نفي قوي",
  s4: "الحاضر — استنتاج قوي", s5: "الماضي — احتمال", s6: "الحاضر — نفي قوي",
  co1: "He must to be tired.", co2: "She might has forgotten.", co3: "They can't be went home.",
  co4: "He must have saw the accident.", co5: "She might be slept now.", co6: "They must have been play football.",
  co7: "He mustn't be the teacher.", co8: "She can't have went there.",
  tr1: "He must sleep now.", tr2: "She must be in the library.", tr3: "They mustn't know the answer.",
  tr4: "She must left early.", tr5: "He might be waiting for us.",
  tr6: "He must have bought this car; it's too expensive for him.",
  tr7: "The children must be playing in the garden now.", tr8: "They must be working when I called them.",
  d1: "He may be at home.", d2: "She must be forgotten.", d3: "He might have went.",
  d4: "كلتاهما إلزام.",
  d5: "كلتاهما تتحدثان عن الآن.",
  d6: "احتمال أنها فازت فعلًا.",
  dl1: "إلزام بأن يكون مشغولًا", dl2: "قدرة ماضية", dl3: "أمر بالذهاب الآن",
  dl4: "منع", dl5: "احتمال أنه نسي",
};
for (const p of practices) {
  ok(M.gradePractice50(p.id, practicePositive[p.id] ?? ""), `${p.id} accepts correct answer`);
  ok(!M.gradePractice50(p.id, practiceNegative[p.id] ?? "x"), `${p.id} rejects wrong answer`);
  ok(!M.gradePractice50(p.id, ""), `${p.id} rejects blank`);
}
for (const alt of ["They can't be going home.", "they cannot have gone home"]) ok(M.gradePractice50("co3", alt), `co3 accepts ${alt}`);
for (const alt of ["She may be in the library.", "She could be at the library."]) ok(M.gradePractice50("tr2", alt), `tr2 accepts ${alt}`);
for (const alt of ["He must be asleep now."]) ok(M.gradePractice50("tr1", alt), `tr1 accepts ${alt}`);
for (const alt of ["He couldn't have bought this car because it is too expensive for him."]) ok(M.gradePractice50("tr6", alt), `tr6 accepts ${alt}`);
for (const wrong of ["He can't be the teacher yesterday.", "He mustn't be the teacher."]) ok(!M.gradePractice50("co7", wrong), `co7 rejects ${wrong}`);
for (const wrong of ["She might be sleeping.", "She might have been sleeping now."]) ok(!M.gradePractice50("tr5", wrong), `tr5 rejects ${wrong}`);

/* ---------- retry + jsdom ---------- */
const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/#/lesson/50", pretendToBeVisual: true });
for (const key of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "HTMLInputElement", "HTMLTextAreaElement", "getComputedStyle", "localStorage", "MutationObserver"]) {
  if (dom.window[key]) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
dom.window.Element.prototype.scrollIntoView = () => {};
dom.window.Element.prototype.scrollTo = () => {};
dom.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
globalThis.IS_REACT_ACT_ENVIRONMENT = false;
const retryUrl = M.retryModuleUrl50(new Error("Failed to fetch dynamically imported module: http://localhost/assets/testKey50-abc.js"), "testKey50", 2);
ok(Boolean(retryUrl) && new URL(retryUrl).origin === "http://localhost" && new URL(retryUrl).searchParams.has("lesson50Retry"), "retry URL is same-origin and cache-busted");
ok(M.retryModuleUrl50(new Error("https://other.example/assets/testKey50-abc.js"), "testKey50", 1) === null, "retry rejects foreign origins");
ok(M.retryModuleUrl50(new Error("http://localhost/assets/TeacherGuide50-abc.js"), "testKey50", 1) === null, "retry rejects the wrong module");
const tick = (ms = 25) => new Promise((resolve) => setTimeout(resolve, ms));
const host = document.createElement("div");
document.body.appendChild(host);
const reactRoot = M.createRoot(host);
M.flushSync(() => reactRoot.render(M.React.createElement(M.Lesson50)));
for (let i = 0; i < M.LESSON_STEP_COUNT_50; i++) {
  ok((host.textContent || "").includes(`${i + 1} / 46`), `slide ${i + 1} renders with correct counter`);
  const issues = auditRenderedStudentCopy(host);
  ok(issues.length === 0, `slide ${i + 1} contains no editorial/source labels: ${JSON.stringify(issues)}`);
  if (M.SLIDES_50[i].id === "final-test") {
    ok(!host.querySelector("[data-test-result], [data-question-feedback]"), "test hides results and correction initially");
    ok(host.querySelectorAll("[data-test-q]").length === 25, "test renders all 25 questions");
    ok(host.querySelectorAll("[data-test-level]").length === 4, "test renders four groups");
    ok(host.querySelector("[data-test-submit]").disabled, "submit disabled until all questions are answered");
    ok((host.textContent || "").includes("0 / 25"), "test starts at zero answered");
  }
  if (M.SLIDES_50[i].id === "reading-hunt") {
    ok(!host.querySelector(".l50-hunt-feedback"), "reading hunt hides explanations before checking");
  }
  if (M.SLIDES_50[i].id === "teacher") {
    ok(Boolean(host.querySelector("[data-teacher-waiting]")) && !host.querySelector("#l50-teacher-password"), "teacher password hidden before submission");
  }
  if (M.SLIDES_50[i].id === "lesson-progress") {
    ok(host.textContent.includes("50 / 120") && host.textContent.includes("41.67%") && host.textContent.includes("70"), "progress shows 50/120, 41.67% and 70 remaining");
  }
  if (M.SLIDES_50[i].id === "next-lesson") {
    ok(host.textContent.includes("51") && host.textContent.includes("ZERO CONDITIONAL"), "roadmap points to Lesson 51");
  }
  if (i < M.LESSON_STEP_COUNT_50 - 1) M.flushSync(() => host.querySelector('[data-step-nav="next"]').click());
}
M.flushSync(() => reactRoot.unmount());
host.remove();

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
  return { gradeTest50: M.gradeTest50 };
};
const retained = { ...perfectAnswers, q25: "He must have been studying when I called him." };
function Harness() {
  const [answers, setAnswers] = M.React.useState(retained);
  const [result, setResult] = M.React.useState(null);
  return M.React.createElement(M.TestArea50, {
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
ok(M.isTeacherPassword50("somer173") && M.isTeacherPassword50("  somer173 "), "teacher password accepts the project password with whitespace");
for (const wrongPassword of ["somer", "somer1734", "", "SOMER173"]) ok(!M.isTeacherPassword50(wrongPassword), `teacher password rejects ${JSON.stringify(wrongPassword)}`);
let guideLoads = 0;
const teacherHost = document.createElement("div");
document.body.appendChild(teacherHost);
const teacherRoot = M.createRoot(teacherHost);
const guideLoader = async () => {
  guideLoads++;
  if (guideLoads <= 3) throw new Error("simulated teacher chunk failure");
  return { default: M.TeacherGuide50 };
};
M.flushSync(() => teacherRoot.render(M.React.createElement(M.TeacherArea50, { result: perfect, loader: guideLoader, unlocked: true })));
ok(Boolean(teacherHost.querySelector("[data-teacher-open]")), "submitted result plus unlocked session opens the teacher space");
await tick(60);
ok(Boolean(teacherHost.querySelector(".l50-test-error")) && !teacherHost.querySelector("[data-teacher-guide]"), "teacher chunk failure is isolated with retry UI");
M.flushSync(() => teacherHost.querySelector(".l50-test-error button").click());
await tick(80);
ok(guideLoads === 4 && teacherHost.querySelectorAll("[data-teacher-q]").length === 25, "teacher retry loads 25 detailed solutions");
ok(perfect.score === 25, "teacher failure leaves the student result untouched");
M.flushSync(() => teacherRoot.unmount());
teacherHost.remove();

if (failures.length) {
  console.error(`\nLesson 50 audit FAILED: ${failures.length} of ${checks} assertions.`);
  process.exit(1);
}
console.log(`Lesson 50 audit passed: ${checks} assertions, 0 failures.`);
