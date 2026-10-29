// Lesson 46: coverage, polarity/tense-aware grading, and retryable UI tests.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const { JSDOM } = require("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "node_modules/.lesson46-audit", `audit-${process.pid}.mjs`);
mkdirSync(dirname(out), { recursive: true });
await esbuild.build({ absWorkingDir: root, stdin: { contents: `
  import React from 'react'; export {React};
  export {createRoot} from 'react-dom/client'; export {flushSync} from 'react-dom';
  export * from './src/lessons/lesson46/data.ts';
  export * from './src/lessons/lesson46/practiceData46.ts';
  export * from './src/lessons/lesson46/practiceKey46.ts';
  export * from './src/lessons/lesson46/retry46.ts';
  export {MODEL_46} from './src/lessons/lesson46/Practice46.tsx';
  export * from './src/lessons/lesson46/testData46.ts';
  export * from './src/lessons/lesson46/testKey46.ts';
  export {default as Lesson46} from './src/lessons/lesson46/Lesson46.tsx';
  export {default as TestArea46} from './src/lessons/lesson46/TestArea46.tsx';
  export {default as TeacherArea46} from './src/lessons/lesson46/TeacherArea46.tsx';
  export {default as TeacherGuide46} from './src/lessons/lesson46/TeacherGuide46.tsx';
`, resolveDir: root, loader: "tsx" }, bundle: true, platform: "node", format: "esm", jsx: "automatic", packages: "external", loader: { ".css": "empty" }, outfile: out, logLevel: "silent" });
const M = await import(pathToFileURL(out).href);
rmSync(out, { force: true });
let checks = 0;
const failures = [];
const ok = (condition, message) => { checks++; if (!condition) { failures.push(message); console.error(`✕ ${message}`); } };

ok(M.LESSON_STEP_COUNT_46 === 39, `39 steps, got ${M.LESSON_STEP_COUNT_46}`);
ok(M.STATIONS_46.length === 18, `18 stations, got ${M.STATIONS_46.length}`);
ok(new Set(M.SLIDES_46.map((s) => s.id)).size === 39, "slide IDs unique");
for (const station of M.STATIONS_46) ok(M.SLIDES_46.some((s) => s.station === station.id), `station ${station.id} represented`);
for (const kind of ["cover", "goals", "doors", "timeline", "comparison", "dialogue", "practice", "reading", "readingQuestions", "test", "teacher", "writing", "summary", "roadmap"]) ok(M.SLIDES_46.some((s) => s.kind === kind), `${kind} slide exists`);
ok(M.SLIDES_46.filter((s) => s.kind === "dialogue").length === 5, "five real-life labs");
ok(M.READING_46.length === 7 && M.READING_QUESTIONS_46.length === 10, "complete reading and ten comprehension questions");
const modelSentences = M.MODEL_46.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
ok(modelSentences.length >= 12 && modelSentences.length <= 15, "writing model has 12–15 sentences");
for (const [name, regex, minimum] of [
  ["mustn't", /\bmustn't\b/g, 2], ["present have to", /\b(?:don't|doesn't) have to\b/g, 2],
  ["present needn't", /\bneedn't\b(?! have)/g, 2], ["present need to", /\b(?:don't|doesn't) need to\b/g, 2],
  ["past have to", /\bdidn't have to\b/g, 1], ["past need to", /\bdidn't need to\b/g, 1],
  ["past action", /\bneedn't have\b/g, 2], ["future have to", /\bwon't have to\b/g, 1], ["future need to", /\bwon't need to\b/g, 1],
]) ok((M.MODEL_46.match(regex) || []).length >= minimum, `writing model meets ${name} requirement`);
for (const [set, size] of Object.entries({ "detective-a": 5, "detective-b": 5, p32: 5, p33: 5, p34: 5, p35: 6, p36: 5 })) ok(M.PRACTICE_SETS_46[set].length === size, `${set} has ${size} questions`);
const practices = Object.values(M.PRACTICE_SETS_46).flat();
ok(new Set(practices.map((p) => p.id)).size === practices.length, "practice IDs unique");
for (const p of practices) ok(Boolean(M.PRACTICE_KEYS_46[p.id]), `practice key exists: ${p.id}`);
ok(M.TEST_QUESTIONS_46.length === 25 && M.TEST_SOLUTIONS_46.length === 25, "25 prompts and 25 independent keys");
ok(new Set(M.TEST_QUESTIONS_46.map((q) => q.id)).size === 25 && new Set(M.TEST_SOLUTIONS_46.map((q) => q.id)).size === 25, "question/key IDs unique");
for (let level = 1; level <= 5; level++) ok(M.TEST_QUESTIONS_46.filter((q) => q.level === level).length === 5, `level ${level}: five questions`);
for (const q of M.TEST_QUESTIONS_46) {
  ok(Boolean(M.TEST_SOLUTIONS_46.find((s) => s.id === q.id)), `${q.id} has key`);
  ok(!("answer" in q) && !("correct" in q) && !("model" in q), `${q.id} exposes no key in prompt data`);
}
const dataSource = readFileSync(join(root, "src/lessons/lesson46/testData46.ts"), "utf8");
const areaSource = readFileSync(join(root, "src/lessons/lesson46/TestArea46.tsx"), "utf8");
const guideSource = readFileSync(join(root, "src/lessons/lesson46/TeacherGuide46.tsx"), "utf8");
ok(!/TEST_SOLUTIONS_46|modelAnswer|gradeTest46/.test(dataSource), "student test data has no key");
ok(areaSource.includes('import("./testKey46")') && areaSource.includes('import("./testKey46?retry")'), "key has submit-only dynamic primary and retry paths");
ok(!/import\s+\{[^}]*gradeTest46/.test(areaSource), "student area has no runtime static key import");
ok(!/import\s+\{[^}]*TEST_SOLUTIONS_46/.test(guideSource), "teacher guide receives submitted result without importing key");

const positives = {
  q1: ["a"], q2: ["b"], q3: ["a"], q4: ["c"], q5: ["b"],
  q6: ["mustn't", "MUST NOT", "You must not enter this room.", "mustn’t enter this room"],
  q7: ["doesn't need to", "needn't", "doesn't have to", "She need not bring her laptop today.", "She doesn't have to bring her laptop today.", "She needn't bring her laptop."],
  q8: ["didn't have to", "did not need to", "We didn't have to work yesterday.", "We didn't need to work yesterday.", "We didn't have to work."],
  q9: ["won't have to", "will not need to", "He won't need to attend the meeting tomorrow.", "He won't have to attend the meeting."],
  q10: ["needn't have bought", "I need not have bought another ticket.", "I bought another ticket but I didn't need one.", "I bought another ticket unnecessarily.", "I bought another ticket but I didn't have to."],
  q11: ["You mustn't enter.", "You must not enter", "You are not allowed to enter."],
  q12: ["She doesn't have to come.", "She needn't come.", "She does not need to come."],
  q13: ["He needn't worry.", "He doesn't need to worry.", "He does not have to worry."],
  q14: ["I needn't have gone there.", "I need not have gone there", "I needn't have gone."],
  q15: ["We didn't need to pay.", "We did not have to pay."],
  q16: ["b"], q17: ["b"], q18: ["a"], q19: ["b"], q20: ["a"],
  q21: ["mustn't", "must not", "You mustn't touch the exhibits.", "Students must not touch the exhibits."],
  q22: ["don't have to", "needn't", "do not need to", "No, you don't have to.", "No, you don't need to bring notebooks."],
  q23: ["needn't have", "need not have", "You needn't have bought it.", "You needn't have bought a notebook."],
  q24: ["won't have to", "will not need to", "No, you won't have to pay tomorrow.", "You won't have to pay."],
  q25: ["needn't", "don't need to", "don't have to", "We needn't hurry to buy tickets today.", "We don't need to hurry."],
};
const negatives = {
  q1: ["b", "c", "mustn't"], q2: ["a", "c"], q3: ["b", "c"], q4: ["a", "b"], q5: ["a", "c"],
  q6: ["don't have to", "must", "You must not", "You must not enter another room", "you don't have to enter this room", "not must"],
  q7: ["mustn't", "does need to", "She needn't", "She needn't bring her phone today", "She needs to bring her laptop today", "She doesn't need to bring her laptop yesterday"],
  q8: ["had to", "don't have to", "We didn't have to", "We didn't have to work tomorrow", "needn't have worked", "We did not work yesterday"],
  q9: ["mustn't", "has to", "He won't have to", "He won't have to attend the meeting yesterday", "didn't have to"],
  q10: ["didn't need to", "didn't need to buy", "needn't have buy", "I needn't have", "I needn't have bought a ticket", "I needn't have not bought another ticket", "I didn't buy another ticket"],
  q11: ["You mustn't to enter", "You don't have to enter", "You must enter", "You must not leave", "You mustn't"],
  q12: ["She doesn't has to come", "She mustn't come", "She has to come", "She needn't leave", "She doesn't have to"],
  q13: ["He needn't to worry", "He mustn't worry", "He needs to worry", "He needn't"],
  q14: ["I needn't have went there", "I didn't need to go there", "I shouldn't have gone there", "I needn't have not gone there", "I needn't have gone somewhere else"],
  q15: ["We didn't needed to pay", "We needed to pay", "We mustn't pay", "We didn't pay", "We didn't need to"],
  q16: ["a", "c", "same meaning"], q17: ["a", "c", "different meanings"], q18: ["b", "c", "not necessary but did not buy"], q19: ["a", "c", "did not buy"], q20: ["b", "c", "same meaning"],
  q21: ["don't have to", "needn't", "must", "You must not", "You must not sell the exhibits"],
  q22: ["mustn't", "do", "have to", "must", "don't", "You do not have to bring a phone"],
  q23: ["didn't need to", "shouldn't have", "needn't", "You needn't have", "You needn't have sold it", "You needn't have bought a phone", "You needn't have not bought it"],
  q24: ["mustn't", "didn't have to", "won't has to", "You won't have to", "You won't have to pay yesterday"],
  q25: ["mustn't", "must", "need", "We needn't", "We needn't hurry to buy tickets yesterday", "We needn't not hurry"],
};
for (const q of M.TEST_QUESTIONS_46) {
  ok(positives[q.id]?.length > 0 && negatives[q.id]?.length > 0, `${q.id} has acceptance and rejection cases`);
  for (const value of positives[q.id] || []) ok(M.gradeQuestion46(q, value), `${q.id} accepts ${JSON.stringify(value)}`);
  for (const value of [...(negatives[q.id] || []), "", "  "]) ok(!M.gradeQuestion46(q, value), `${q.id} rejects ${JSON.stringify(value)}`);
}
const perfectAnswers = Object.fromEntries(M.TEST_QUESTIONS_46.map((q) => [q.id, positives[q.id][0]]));
const perfect = M.gradeTest46(perfectAnswers);
ok(perfect.score === 25 && perfect.total === 25, "perfect submission scores 25/25");
ok(Object.values(perfect.byLevel).every((level) => level.score === 5 && level.total === 5), "five scores each 5/5");
ok(M.gradeTest46({}).score === 0, "blank submission scores zero");
for (const q of M.TEST_QUESTIONS_46) {
  const changed = { ...perfectAnswers, [q.id]: negatives[q.id][0] };
  const report = M.gradeTest46(changed);
  ok(report.score === 24 && report.byQuestion[q.id] === false, `${q.id} counted exactly once when wrong`);
}
// Exercise choice questions: check every displayed option, including both valid alternatives.
for (const p of practices.filter((p) => p.options)) {
  for (const option of p.options) ok(M.gradePractice46(p.id, option) === M.PRACTICE_KEYS_46[p.id].choices.includes(option), `${p.id} option ${option} graded fairly`);
  ok(!M.gradePractice46(p.id, ""), `${p.id} blank rejected`);
}
const practicePositive = {
  d1: "You mustn't enter this room.", d2: "She doesn't have to come today.", d3: "He needn't worry.", d4: "We didn't need to pay.", d5: "She needn't have bought another ticket.",
  d6: "You mustn't touch this machine.", d7: "He won't have to work tomorrow.", d8: "She doesn't need to come early.", d9: "I needn't have gone there.", d10: "You needn't bring your laptop tomorrow.",
  "p34-1": "Yesterday, I didn't have to work.", "p34-2": "She didn't need to bring her laptop last week.", "p34-3": "We won't have to come early tomorrow.", "p34-4": "He won't need to buy another ticket next month.", "p34-5": "I needn't have bought that expensive bag.",
  "p36-1": "You don't need to come tomorrow.", "p36-2": "She is not allowed to cheat.", "p36-3": "I bought a ticket but I didn't need one.", "p36-4": "He needn't wait.", "p36-5": "She won't have to work tomorrow.",
};
const practiceNegative = {
  d1: "You don't have to enter this room.", d2: "She mustn't come today.", d3: "He needs to worry.", d4: "We needed to pay.", d5: "She needn't have buy another ticket.",
  d6: "You don't have to touch this machine.", d7: "He won't has to work tomorrow.", d8: "She doesn't need come early.", d9: "I didn't need to go there.", d10: "You mustn't bring your laptop tomorrow.",
  "p34-1": "I didn't have to", "p34-2": "She needed to bring her laptop last week", "p34-3": "We won't have to", "p34-4": "He won't need to buy another ticket last month", "p34-5": "I didn't need to buy that expensive bag",
  "p36-1": "You mustn't come tomorrow.", "p36-2": "She doesn't have to cheat.", "p36-3": "I didn't need to buy a ticket.", "p36-4": "He mustn't wait.", "p36-5": "She won't has to work tomorrow.",
};
for (const p of practices.filter((p) => !p.options)) {
  ok(M.gradePractice46(p.id, practicePositive[p.id] ?? ""), `${p.id} accepts correct rewrite`);
  ok(!M.gradePractice46(p.id, practiceNegative[p.id] ?? ""), `${p.id} rejects wrong rewrite / polarity`);
  ok(!M.gradePractice46(p.id, ""), `${p.id} rejects blank`);
}
for (const [id, answer] of [["p34-1", "I didn't have to work"], ["p34-2", "She didn't need to bring her laptop"], ["p34-3", "We won't have to come early"], ["p34-4", "He won't need to buy another ticket"]]) ok(M.gradePractice46(id, answer), `${id} accepts a full sentence with implied time`);
for (const alt of ["You don't have to come tomorrow", "You needn't come tomorrow", "There is no need for you to come tomorrow"]) ok(M.gradePractice46("p36-1", alt), `p36-1 accepts ${alt}`);
for (const alt of ["I needn't have bought a ticket", "I bought a ticket but it wasn't necessary", "I bought a ticket unnecessarily"]) ok(M.gradePractice46("p36-3", alt), `p36-3 accepts ${alt}`);
for (const wrong of ["I didn't need to buy a ticket", "I needn't have not bought a ticket", "I shouldn't have bought a ticket", "I bought a ticket because it was necessary"]) ok(!M.gradePractice46("p36-3", wrong), `p36-3 rejects ${wrong}`);

const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/#/lesson/46", pretendToBeVisual: true });
for (const key of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "HTMLInputElement", "HTMLTextAreaElement", "getComputedStyle", "localStorage", "MutationObserver"]) if (dom.window[key]) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
dom.window.Element.prototype.scrollIntoView = () => {};
dom.window.Element.prototype.scrollTo = () => {};
dom.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
const retryUrl = M.retryModuleUrl46(new Error("Failed to fetch dynamically imported module: http://localhost/assets/testKey46-abc.js"), "testKey46", 2);
ok(Boolean(retryUrl) && new URL(retryUrl).origin === "http://localhost" && new URL(retryUrl).searchParams.has("lesson46Retry"), "retry URL is same-origin and cache-busted");
ok(M.retryModuleUrl46(new Error("https://other.example/assets/testKey46-abc.js"), "testKey46", 1) === null, "retry rejects foreign origins");
ok(M.retryModuleUrl46(new Error("http://localhost/assets/TeacherGuide46-abc.js"), "testKey46", 1) === null, "retry rejects the wrong module");
const tick = (ms = 25) => new Promise((r) => setTimeout(r, ms));
const host = document.createElement("div"); document.body.appendChild(host);
const reactRoot = M.createRoot(host);
M.flushSync(() => reactRoot.render(M.React.createElement(M.Lesson46)));
for (let i = 0; i < M.LESSON_STEP_COUNT_46; i++) {
  ok((host.textContent || "").includes(`${i + 1} / 39`), `slide ${i + 1} renders with correct counter`);
  const issues = auditRenderedStudentCopy(host);
  ok(issues.length === 0, `slide ${i + 1} contains no editorial/source labels: ${JSON.stringify(issues)}`);
  if (M.SLIDES_46[i].kind === "test") {
    ok(!host.querySelector("[data-test-result], [data-question-feedback]"), "test hides results and correction initially");
    ok(host.querySelectorAll("[data-test-q]").length === 25, "test renders all 25 questions");
  }
  if (M.SLIDES_46[i].kind === "teacher") ok(Boolean(host.querySelector("[data-teacher-locked]")) && !host.querySelector("[data-teacher-guide]"), "teacher inaccessible before submission");
  if (i < M.LESSON_STEP_COUNT_46 - 1) M.flushSync(() => host.querySelector('[data-step-nav="next"]').click());
}
ok(host.textContent.includes("46 / 120") && host.textContent.includes("LESSON 47"), "course progress and next lesson present");
M.flushSync(() => reactRoot.unmount()); host.remove();

let loadCount = 0;
const testHost = document.createElement("div"); document.body.appendChild(testHost);
const testRoot = M.createRoot(testHost);
const loader = async (retry) => {
  loadCount++;
  if (loadCount === 1) throw new Error("simulated offline chunk");
  ok(retry, "key retry switches to independent retry URL");
  await tick(20);
  return { gradeTest46: M.gradeTest46 };
};
function Harness() {
  const [answers, setAnswers] = M.React.useState(perfectAnswers);
  const [result, setResult] = M.React.useState(null);
  return M.React.createElement(M.TestArea46, { answers, result, keyLoader: loader,
    onChangeAnswer: (id, value) => setAnswers((prev) => ({ ...prev, [id]: value })),
    onSubmitResult: setResult, onReset: () => { setAnswers({}); setResult(null); } });
}
M.flushSync(() => testRoot.render(M.React.createElement(Harness)));
ok(loadCount === 0 && !testHost.querySelector("[data-test-result], [data-question-feedback]"), "no key load or correction on initial test render");
M.flushSync(() => testHost.querySelector("[data-test-submit]").click()); await tick();
ok(loadCount === 1 && Boolean(testHost.querySelector("[data-test-error]")), "first failed load shows retryable error");
ok(!testHost.querySelector("[data-test-result]") && !testHost.querySelector("[data-test-submit]").disabled, "failure keeps test unsubmitted and enables retry");
ok(testHost.querySelector('input[aria-label="إجابة السؤال 10"]').value === perfectAnswers.q10, "failed load preserves typed answers");
M.flushSync(() => { const submit = testHost.querySelector("[data-test-submit]"); submit.click(); submit.click(); });
await tick(60);
ok(loadCount === 2, "rapid duplicate submit invokes loader once");
ok((testHost.querySelector("[data-test-result]")?.textContent || "").includes("25 / 25"), "retry grades retained answers 25/25");
ok(testHost.querySelectorAll("[data-question-feedback]").length === 25, "25 feedback items only after submission");
M.flushSync(() => testHost.querySelector("[data-test-reset]").click());
ok(!testHost.querySelector("[data-test-result]") && testHost.querySelector("[data-test-submit]").disabled, "retake clears score and requires answers");
ok(!testHost.querySelector('input[aria-label="إجابة السؤال 10"]').value, "retake clears typed answers");
M.flushSync(() => testRoot.unmount()); testHost.remove();

let guideLoads = 0;
const teacherHost = document.createElement("div"); document.body.appendChild(teacherHost);
const teacherRoot = M.createRoot(teacherHost);
const guideLoader = async (retry) => { guideLoads++; if (guideLoads === 1) throw new Error("simulated teacher chunk failure"); ok(retry, "teacher retry switches URL"); return { default: M.TeacherGuide46 }; };
M.flushSync(() => teacherRoot.render(M.React.createElement(M.TeacherArea46, { result: perfect, unlocked: true, onUnlock() {}, onLock() {}, loader: guideLoader })));
await tick();
ok(Boolean(teacherHost.querySelector("[data-teacher-error]")) && !teacherHost.querySelector("[data-teacher-guide]"), "teacher chunk failure isolated with retry UI");
M.flushSync(() => teacherHost.querySelector("[data-teacher-error] button").click()); await tick();
ok(guideLoads === 2 && teacherHost.querySelectorAll("[data-teacher-q]").length === 25, "teacher retry loads 25 detailed solutions");
ok(perfect.score === 25 && perfectAnswers.q10 === "needn't have bought", "teacher failure leaves student result and answers untouched");
M.flushSync(() => teacherRoot.unmount()); teacherHost.remove();

if (failures.length) { console.error(`\nLesson 46 audit FAILED: ${failures.length} of ${checks} assertions.`); process.exit(1); }
console.log(`Lesson 46 audit passed: ${checks} assertions, 0 failures.`);
