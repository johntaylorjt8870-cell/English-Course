// Lesson 47: coverage, meaning-aware grading, and retryable UI tests.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const { JSDOM } = require("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "node_modules/.lesson47-audit", `audit-${process.pid}.mjs`);
mkdirSync(dirname(out), { recursive: true });
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
  import React from 'react'; export {React};
  export {createRoot} from 'react-dom/client'; export {flushSync} from 'react-dom';
  export * from './src/lessons/lesson47/data.ts';
  export * from './src/lessons/lesson47/practiceData47.ts';
  export * from './src/lessons/lesson47/practiceKey47.ts';
  export * from './src/lessons/lesson47/retry47.ts';
  export {MODEL_47} from './src/lessons/lesson47/Practice47.tsx';
  export * from './src/lessons/lesson47/testData47.ts';
  export * from './src/lessons/lesson47/testKey47.ts';
  export {default as Lesson47} from './src/lessons/lesson47/Lesson47.tsx';
  export {default as TestArea47} from './src/lessons/lesson47/TestArea47.tsx';
  export {default as TeacherArea47} from './src/lessons/lesson47/TeacherArea47.tsx';
  export {default as TeacherGuide47} from './src/lessons/lesson47/TeacherGuide47.tsx';
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
const ok = (condition, message) => { checks++; if (!condition) { failures.push(message); console.error(`✕ ${message}`); } };

/* ---------- shape and coverage ---------- */
ok(M.LESSON_STEP_COUNT_47 === 46, `46 steps, got ${M.LESSON_STEP_COUNT_47}`);
ok(M.STATIONS_47.length === 15, `15 stations, got ${M.STATIONS_47.length}`);
ok(new Set(M.SLIDES_47.map((s) => s.id)).size === 46, "slide IDs unique");
for (const station of M.STATIONS_47) ok(M.SLIDES_47.some((s) => s.station === station.id), `station ${station.id} represented`);
for (const kind of ["cover", "goals", "lanes", "lesson", "comparison", "dialogue", "practice", "wordOrder", "reading", "readingQuestions", "test", "teacher", "writing", "summary", "roadmap"]) {
  ok(M.SLIDES_47.some((s) => s.kind === kind), `${kind} slide exists`);
}
ok(M.SLIDES_47.filter((s) => s.kind === "dialogue").length === 3, "three real-life dialogues");
ok(M.READING_47.length === 9 && M.READING_QUESTIONS_47.length === 10, "complete reading and ten comprehension questions");
ok(M.WORD_ORDER_47.length === 3 && M.WORD_ORDER_47.every((t) => t.answer.length === t.shuffled.length), "three word-order tasks with complete banks");
for (const task of M.WORD_ORDER_47) {
  ok(task.answer.join(" ") === [...task.answer].join(" "), `${task.id} has a readable answer order`);
  ok(task.answer.map((x) => x).sort().join("|") === task.shuffled.map((x) => x).sort().join("|"), `${task.id} bank contains exactly the answer tokens`);
}
ok(M.SLIDES_47[M.LESSON_STEP_COUNT_47 - 1].id === "course-progress", "course progress is the final slide");
ok(M.SLIDES_47.findIndex((s) => s.id === "final-test") > 0, "final test is present");

/* ---------- writing model ---------- */
const modelSentences = M.MODEL_47.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
ok(modelSentences.length >= 12 && modelSentences.length <= 15, `writing model has 12–15 sentences (got ${modelSentences.length})`);
const modelLower = M.MODEL_47.toLowerCase().replace(/[’‘]/g, "'");
for (const [name, regex, minimum] of [
  ["would like", /\b(?:i'd|would|she'd|he'd|we'd|they'd)\s+like\b/g, 3],
  ["would rather", /\b(?:i'd|would|she'd|he'd|we'd|they'd)\s+rather\b/g, 2],
  ["rather not", /\brather\s+not\b/g, 1],
  ["would you like", /\bwould\s+you\s+like\b/g, 1],
  ["would you mind", /\bwould\s+you\s+mind\s+[a-z]+ing\b/g, 1],
  ["polite acceptance", /(?:yes,?\s*please|i'd love to|we'd love)/g, 1],
]) ok((modelLower.match(regex) || []).length >= minimum, `writing model meets ${name} requirement`);
ok(/\brather\b[^.?!]*\bthan\b/.test(modelLower), "writing model contains rather … than");
ok(/\brather\s+(?:my\s+friends|you|he|she|they|we)\s+(?:arrived|stayed|joined|left|came|went)\b/.test(modelLower), "writing model contains rather + subject + past simple");

/* ---------- practice inventory ---------- */
for (const [set, size] of Object.entries({ contractions: 4, "like-vs-rather": 4, "lab-restaurant": 1, "lab-weekend": 1, "lab-classroom": 1, "mind-answers": 3, "modal-map": 4, "detective-a": 6, "detective-b": 6, p31: 5, p32: 5, p33: 5, p34: 5, p35: 6 })) {
  ok(M.PRACTICE_SETS_47[set]?.length === size, `${set} has ${size} questions`);
}
const practices = Object.values(M.PRACTICE_SETS_47).flat();
ok(new Set(practices.map((p) => p.id)).size === practices.length, "practice IDs unique");
for (const p of practices) ok(Boolean(M.PRACTICE_KEYS_47[p.id]), `practice key exists: ${p.id}`);
for (const set of ["lab-restaurant", "lab-weekend", "lab-classroom"]) ok(M.SLIDES_47.some((s) => s.labId === set), `${set} is reachable from a dialogue`);
for (const logic of ["contractions", "like-vs-rather", "mind-answers", "modal-map"]) ok(M.SLIDES_47.some((s) => s.practiceSet === logic), `${logic} practice is rendered by a slide`);

/* ---------- assessment inventory ---------- */
ok(M.TEST_QUESTIONS_47.length === 25 && M.TEST_SOLUTIONS_47.length === 25, "25 prompts and 25 independent keys");
ok(new Set(M.TEST_QUESTIONS_47.map((q) => q.id)).size === 25 && new Set(M.TEST_SOLUTIONS_47.map((q) => q.id)).size === 25, "question/key IDs unique");
for (let level = 1; level <= 5; level++) ok(M.TEST_QUESTIONS_47.filter((q) => q.level === level).length === 5, `level ${level}: five questions`);
for (const q of M.TEST_QUESTIONS_47) {
  ok(Boolean(M.TEST_SOLUTIONS_47.find((s) => s.id === q.id)), `${q.id} has key`);
  ok(!("answer" in q) && !("correct" in q) && !("model" in q), `${q.id} exposes no key in prompt data`);
}
const dataSource = readFileSync(join(root, "src/lessons/lesson47/testData47.ts"), "utf8");
const areaSource = readFileSync(join(root, "src/lessons/lesson47/TestArea47.tsx"), "utf8");
const guideSource = readFileSync(join(root, "src/lessons/lesson47/TeacherGuide47.tsx"), "utf8");
ok(!/TEST_SOLUTIONS_47|modelAnswer|gradeTest47/.test(dataSource), "student test data has no key");
ok(areaSource.includes('import("./testKey47")') && areaSource.includes('import("./testKey47?retry")'), "key has submit-only dynamic primary and retry paths");
ok(!/import\s+\{[^}]*gradeTest47/.test(areaSource), "student area has no runtime static key import");
ok(!/import\s+\{[^}]*TEST_SOLUTIONS_47/.test(guideSource), "teacher guide receives submitted result without importing key");

/* ---------- grading: acceptance and rejection ---------- */
const positives = {
  q1: ["b"], q2: ["a"], q3: ["c"], q4: ["b"], q5: ["a"],
  q6: ["walk", "walk than take the bus", "I'd rather walk than take the bus.", "I would rather walk than take the bus."],
  q7: ["to learn", "to learn French", "She'd like to learn French.", "She would like to learn French."],
  q8: ["waiting", "waiting a moment", "Would you mind waiting a moment?"],
  q9: ["go", "go out tonight", "We'd rather not go out tonight.", "We would rather not go out tonight."],
  q10: ["stayed", "you stayed here", "I'd rather you stayed here.", "I would rather you stayed here."],
  q11: ["I'd like some water.", "I would like some water.", "I’d like some water"],
  q12: ["She'd like a new book.", "She would like a new book."],
  q13: ["I'd rather stay home.", "I would rather stay home."],
  q14: ["Would you mind helping me?", "would you mind helping me"],
  q15: ["I'd like you to help me.", "I would like you to help me."],
  q16: ["a"], q17: ["a"], q18: ["a"], q19: ["a"], q20: ["a"],
  q21: ["Would", "would", "Would you like to visit the museum tomorrow?", "would you like to visit the museum tomorrow"],
  q22: ["go", "I'd rather go in the morning.", "I would rather go in the morning.", "rather go in the morning"],
  q23: ["to book", "me to book", "Would you like me to book the tickets?", "would you like me to book the tickets"],
  q24: ["checking", "checking the opening hours", "Would you mind checking the opening hours too?"],
  q25: ["joined", "Daniel joined us", "I'd rather Daniel joined us as well.", "I would rather Daniel joined us."],
};
const negatives = {
  q1: ["a", "c"], q2: ["b", "c"], q3: ["a", "b"], q4: ["a", "c"], q5: ["b", "c"],
  q6: ["to walk", "walking", "walked", "walking than take the bus", "to walk than take the bus"],
  q7: ["learn", "learning", "to learning", "She'd like learn French."],
  q8: ["to wait", "wait", "waited", "Would you mind to wait a moment?"],
  q9: ["to go", "going", "went", "We'd rather not to go out tonight."],
  q10: ["stay", "stays", "staying", "I'd rather you stay here."],
  q11: ["I'd like some tea.", "I would to like some water.", "I'd like water to.", "I like some water."],
  q12: ["She would likes a new book.", "She'd likes a new book.", "She would like a new books."],
  q13: ["I'd rather to stay home.", "I'd rather staying home.", "I'd rather stayed home."],
  q14: ["Would you mind to help me?", "Would you mind help me?"],
  q15: ["I'd like you help me.", "I'd like you helping me."],
  q16: ["b", "c"], q17: ["b", "c"], q18: ["b", "c"], q19: ["b", "c"], q20: ["b", "c"],
  q21: ["will", "do", "would not", "Do you like to visit the museum tomorrow?"],
  q22: ["to go", "going", "went", "I'd rather to go in the morning."],
  q23: ["book", "booking", "you book the tickets", "Would you like me book the tickets?"],
  q24: ["to check", "check", "checked", "Would you mind to check the opening hours?"],
  q25: ["join", "joins", "joining", "I'd rather Daniel join us."],
};
for (const q of M.TEST_QUESTIONS_47) {
  ok(positives[q.id]?.length > 0 && negatives[q.id]?.length > 0, `${q.id} has acceptance and rejection cases`);
  for (const value of positives[q.id] || []) ok(M.gradeQuestion47(q, value), `${q.id} accepts ${JSON.stringify(value)}`);
  for (const value of [...(negatives[q.id] || []), "", "  "]) ok(!M.gradeQuestion47(q, value), `${q.id} rejects ${JSON.stringify(value)}`);
}

// Meaning-aware regressions: the two constructions that are most often confused.
const q6 = M.TEST_QUESTIONS_47.find((q) => q.id === "q6");
const q10 = M.TEST_QUESTIONS_47.find((q) => q.id === "q10");
const q14 = M.TEST_QUESTIONS_47.find((q) => q.id === "q14");
for (const good of ["walk", "I'd rather walk than take the bus."]) ok(M.gradeQuestion47(q6, good), `q6 accepts the would-rather base form: ${good}`);
for (const bad of ["to walk", "walking", "walked", "I'd like to walk than take the bus."]) ok(!M.gradeQuestion47(q6, bad), `q6 rejects the would-like shape or wrong form: ${bad}`);
for (const good of ["stayed", "I'd rather you stayed here."]) ok(M.gradeQuestion47(q10, good), `q10 accepts would rather + subject + past simple: ${good}`);
for (const bad of ["stay", "I'd rather you stay here.", "I'd rather stay here."]) ok(!M.gradeQuestion47(q10, bad), `q10 rejects a one-subject or base-form answer: ${bad}`);
for (const good of ["Would you mind helping me?", "would you mind helping me"]) ok(M.gradeQuestion47(q14, good), `q14 accepts mind + V-ing: ${good}`);
for (const bad of ["Would you mind to help me?", "Would you mind help me?"]) ok(!M.gradeQuestion47(q14, bad), `q14 rejects mind + to/V1: ${bad}`);

const perfectAnswers = Object.fromEntries(M.TEST_QUESTIONS_47.map((q) => [q.id, positives[q.id][0]]));
const perfect = M.gradeTest47(perfectAnswers);
ok(perfect.score === 25 && perfect.total === 25, "perfect submission scores 25/25");
ok(Object.values(perfect.byLevel).every((level) => level.score === 5 && level.total === 5), "five scores each 5/5");
ok(M.gradeTest47({}).score === 0, "blank submission scores zero");
ok(M.gradeTest47({ ...perfectAnswers, q6: "I'd rather walk than take the bus.", q10: "I'd rather you stayed here.", q14: "Would you mind helping me?" }).score === 25, "requested alternative answers score 25/25 together");
ok(M.gradeTest47({ ...perfectAnswers, q6: "I'd rather to walk than take the bus.", q10: "I'd rather you stay here.", q14: "Would you mind to help me?" }).score === 22, "the three common errors are each marked wrong");
for (const q of M.TEST_QUESTIONS_47) {
  const changed = { ...perfectAnswers, [q.id]: negatives[q.id][0] };
  const report = M.gradeTest47(changed);
  ok(report.score === 24 && report.byQuestion[q.id] === false, `${q.id} counted exactly once when wrong`);
}

/* ---------- practice grading ---------- */
for (const p of practices.filter((item) => item.options)) {
  for (const option of p.options) ok(M.gradePractice47(p.id, option) === M.PRACTICE_KEYS_47[p.id].choices.includes(option), `${p.id} option ${option} graded fairly`);
  ok(!M.gradePractice47(p.id, ""), `${p.id} blank rejected`);
}
const practicePositive = {
  d1: "I'd like some tea.", d2: "She'd like a new book.", d3: "I'd like to study English.", d4: "Would you like to join us?",
  d5: "I'd rather stay home.", d6: "She'd rather read than watch television.", d7: "Would you rather walk or drive?",
  d8: "I'd rather you stayed here.", d9: "Would you mind opening the window?", d10: "Would he like some coffee?",
  d11: "I'd rather not go out tonight.", d12: "I'd like you to help me.",
  "p31-1": "to drink", "p31-2": "to visit", "p31-3": "to join", "p31-4": "to become", "p31-5": "to learn",
  "p32-1": "stay", "p32-2": "read", "p32-3": "walk", "p32-4": "go", "p32-5": "study",
  "p33-1": "Would you like some tea?", "p33-2": "Would she like to join us?", "p33-3": "Would they rather stay home?",
  "p33-4": "Would you rather travel by train?", "p33-5": "Would he like a new notebook?",
  "p34-1": "opening", "p34-2": "helping", "p34-3": "waiting", "p34-4": "closing", "p34-5": "explaining",
};
const practiceNegative = {
  d1: "I would to like some tea.", d2: "She would likes a new book.", d3: "I'd like study English.", d4: "Would you like join us?",
  d5: "I'd rather to stay home.", d6: "She'd rather reading than watching television.", d7: "Would you rather to walk or drive?",
  d8: "I'd rather you stay here.", d9: "Would you mind to open the window?", d10: "Does he would like some coffee?",
  d11: "I wouldn't rather go out tonight.", d12: "I'd like you help me.",
  "p31-1": "drink", "p31-2": "visit", "p31-3": "join", "p31-4": "become", "p31-5": "learn",
  "p32-1": "to stay", "p32-2": "reading", "p32-3": "walking", "p32-4": "to go", "p32-5": "studied",
  "p33-1": "Do you like some tea?", "p33-2": "Does she like to join us?", "p33-3": "Would they rather to stay home?",
  "p33-4": "Would you rather to travel by train?", "p33-5": "Does he would like a new notebook?",
  "p34-1": "to open", "p34-2": "help", "p34-3": "to wait", "p34-4": "closed", "p34-5": "explain",
};
for (const p of practices.filter((item) => !item.options)) {
  ok(M.gradePractice47(p.id, practicePositive[p.id] ?? ""), `${p.id} accepts correct rewrite`);
  ok(!M.gradePractice47(p.id, practiceNegative[p.id] ?? ""), `${p.id} rejects wrong rewrite / meaning`);
  ok(!M.gradePractice47(p.id, ""), `${p.id} rejects blank`);
}
for (const alt of ["I'd like some tea.", "I would like some tea.", "I’d like some tea"]) ok(M.gradePractice47("d1", alt), `d1 accepts ${alt}`);
for (const wrong of ["I'd like some water.", "I like some tea.", "I'd like tea."]) ok(!M.gradePractice47("d1", wrong), `d1 rejects ${wrong}`);
for (const alt of ["I'd rather you stayed here.", "I would rather you stayed here."]) ok(M.gradePractice47("d8", alt), `d8 accepts ${alt}`);
for (const wrong of ["I'd rather you stay here.", "I'd rather stay here.", "I'd rather you staying here."]) ok(!M.gradePractice47("d8", wrong), `d8 rejects ${wrong}`);
for (const alt of ["Would you mind opening the window?", "Would you mind opening the window"]) ok(M.gradePractice47("d9", alt), `d9 accepts ${alt}`);
for (const wrong of ["Would you mind to open the window?", "Would you mind open the window?"]) ok(!M.gradePractice47("d9", wrong), `d9 rejects ${wrong}`);
for (const alt of ["opening", "opening the window", "Would you mind opening the window?"]) ok(M.gradePractice47("p34-1", alt), `p34-1 accepts ${alt}`);
for (const wrong of ["to open", "open", "opened"]) ok(!M.gradePractice47("p34-1", wrong), `p34-1 rejects ${wrong}`);

/* ---------- retry + jsdom ---------- */
const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/#/lesson/47", pretendToBeVisual: true });
for (const key of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "HTMLInputElement", "HTMLTextAreaElement", "getComputedStyle", "localStorage", "MutationObserver"]) {
  if (dom.window[key]) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
dom.window.Element.prototype.scrollIntoView = () => {};
dom.window.Element.prototype.scrollTo = () => {};
dom.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
const retryUrl = M.retryModuleUrl47(new Error("Failed to fetch dynamically imported module: http://localhost/assets/testKey47-abc.js"), "testKey47", 2);
ok(Boolean(retryUrl) && new URL(retryUrl).origin === "http://localhost" && new URL(retryUrl).searchParams.has("lesson47Retry"), "retry URL is same-origin and cache-busted");
ok(M.retryModuleUrl47(new Error("https://other.example/assets/testKey47-abc.js"), "testKey47", 1) === null, "retry rejects foreign origins");
ok(M.retryModuleUrl47(new Error("http://localhost/assets/TeacherGuide47-abc.js"), "testKey47", 1) === null, "retry rejects the wrong module");
const tick = (ms = 25) => new Promise((resolve) => setTimeout(resolve, ms));
const host = document.createElement("div");
document.body.appendChild(host);
const reactRoot = M.createRoot(host);
M.flushSync(() => reactRoot.render(M.React.createElement(M.Lesson47)));
for (let i = 0; i < M.LESSON_STEP_COUNT_47; i++) {
  ok((host.textContent || "").includes(`${i + 1} / 46`), `slide ${i + 1} renders with correct counter`);
  const issues = auditRenderedStudentCopy(host);
  ok(issues.length === 0, `slide ${i + 1} contains no editorial/source labels: ${JSON.stringify(issues)}`);
  if (M.SLIDES_47[i].kind === "test") {
    ok(!host.querySelector("[data-test-result], [data-question-feedback]"), "test hides results and correction initially");
    ok(host.querySelectorAll("[data-test-q]").length === 25, "test renders all 25 questions");
    ok(host.querySelector("[data-test-submit]").disabled, "submit disabled until all questions are answered");
  }
  if (M.SLIDES_47[i].kind === "teacher") ok(Boolean(host.querySelector("[data-teacher-locked]")) && !host.querySelector("[data-teacher-guide]"), "teacher inaccessible before submission");
  if (i < M.LESSON_STEP_COUNT_47 - 1) M.flushSync(() => host.querySelector('[data-step-nav="next"]').click());
}
ok(host.textContent.includes("47 / 120") && host.textContent.includes("LESSON 48"), "course progress and next lesson present");
M.flushSync(() => reactRoot.unmount());
host.remove();

let loadCount = 0;
const testHost = document.createElement("div");
document.body.appendChild(testHost);
const testRoot = M.createRoot(testHost);
const loader = async (retry) => {
  loadCount++;
  if (loadCount === 1) throw new Error("simulated offline chunk");
  ok(retry, "key retry switches to independent retry URL");
  await tick(20);
  return { gradeTest47: M.gradeTest47 };
};
const allTypedExceptOne = { ...perfectAnswers };
function Harness() {
  const [answers, setAnswers] = M.React.useState(perfectAnswers);
  const [result, setResult] = M.React.useState(null);
  return M.React.createElement(M.TestArea47, {
    answers,
    result,
    keyLoader: loader,
    onChangeAnswer: (id, value) => setAnswers((previous) => ({ ...previous, [id]: value })),
    onSubmitResult: setResult,
    onReset: () => { setAnswers({}); setResult(null); },
  });
}
M.flushSync(() => testRoot.render(M.React.createElement(Harness)));
ok(loadCount === 0 && !testHost.querySelector("[data-test-result], [data-question-feedback]"), "no key load or correction on initial test render");
M.flushSync(() => testHost.querySelector("[data-test-submit]").click());
await tick();
ok(loadCount === 1 && Boolean(testHost.querySelector("[data-test-error]")), "first failed load shows retryable error");
ok(!testHost.querySelector("[data-test-result]") && !testHost.querySelector("[data-test-submit]").disabled, "failure keeps test unsubmitted and enables retry");
ok(testHost.querySelector('input[aria-label="إجابة السؤال 10"]').value === allTypedExceptOne.q10, "failed load preserves typed answers");
M.flushSync(() => { const submit = testHost.querySelector("[data-test-submit]"); submit.click(); submit.click(); });
await tick(60);
ok(loadCount === 2, "rapid duplicate submit invokes loader once");
ok((testHost.querySelector("[data-test-result]")?.textContent || "").includes("25 / 25"), "retry grades retained answers 25/25");
ok(testHost.querySelectorAll("[data-question-feedback]").length === 25, "25 feedback items only after submission");
M.flushSync(() => testHost.querySelector("[data-test-reset]").click());
ok(!testHost.querySelector("[data-test-result]") && testHost.querySelector("[data-test-submit]").disabled, "retake clears score and requires answers");
ok(!testHost.querySelector('input[aria-label="إجابة السؤال 10"]').value, "retake clears typed answers");
M.flushSync(() => testRoot.unmount());
testHost.remove();

let guideLoads = 0;
const teacherHost = document.createElement("div");
document.body.appendChild(teacherHost);
const teacherRoot = M.createRoot(teacherHost);
const guideLoader = async (retry) => {
  guideLoads++;
  if (guideLoads === 1) throw new Error("simulated teacher chunk failure");
  ok(retry, "teacher retry switches URL");
  return { default: M.TeacherGuide47 };
};
M.flushSync(() => teacherRoot.render(M.React.createElement(M.TeacherArea47, { result: perfect, unlocked: true, onUnlock() {}, onLock() {}, loader: guideLoader })));
await tick();
ok(Boolean(teacherHost.querySelector("[data-teacher-error]")) && !teacherHost.querySelector("[data-teacher-guide]"), "teacher chunk failure isolated with retry UI");
M.flushSync(() => teacherHost.querySelector("[data-teacher-error] button").click());
await tick();
ok(guideLoads === 2 && teacherHost.querySelectorAll("[data-teacher-q]").length === 25, "teacher retry loads 25 detailed solutions");
ok(perfect.score === 25 && allTypedExceptOne.q10 === "stayed", "teacher failure leaves student result and answers untouched");
M.flushSync(() => teacherRoot.unmount());
teacherHost.remove();

if (failures.length) { console.error(`\nLesson 47 audit FAILED: ${failures.length} of ${checks} assertions.`); process.exit(1); }
console.log(`Lesson 47 audit passed: ${checks} assertions, 0 failures.`);
