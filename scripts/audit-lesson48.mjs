// Lesson 48: coverage, meaning-aware grading, protected key loading and retryable UI.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const { JSDOM } = require("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "node_modules/.lesson48-audit", `audit-${process.pid}.mjs`);
mkdirSync(dirname(out), { recursive: true });
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
  import React from 'react'; export {React};
  export {createRoot} from 'react-dom/client'; export {flushSync} from 'react-dom';
  export * from './src/lessons/lesson48/data.ts';
  export * from './src/lessons/lesson48/practiceData48.ts';
  export * from './src/lessons/lesson48/practiceKey48.ts';
  export * from './src/lessons/lesson48/normalize48.ts';
  export * from './src/lessons/lesson48/retry48.ts';
  export {MODEL_48} from './src/lessons/lesson48/Practice48.tsx';
  export * from './src/lessons/lesson48/testData48.ts';
  export * from './src/lessons/lesson48/testKey48.ts';
  export {default as Lesson48} from './src/lessons/lesson48/Lesson48.tsx';
  export {default as TestArea48} from './src/lessons/lesson48/TestArea48.tsx';
  export {default as TeacherArea48} from './src/lessons/lesson48/TeacherArea48.tsx';
  export {default as TeacherGuide48} from './src/lessons/lesson48/TeacherGuide48.tsx';
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
ok(M.LESSON_STEP_COUNT_48 === 52, `52 steps, got ${M.LESSON_STEP_COUNT_48}`);
ok(M.STATIONS_48.length === 18, `18 stations, got ${M.STATIONS_48.length}`);
ok(new Set(M.SLIDES_48.map((s) => s.id)).size === M.LESSON_STEP_COUNT_48, "slide IDs unique");
for (const station of M.STATIONS_48) ok(M.SLIDES_48.some((s) => s.station === station.id), `station ${station.id} represented`);
for (const kind of ["cover", "goals", "cases", "lesson", "map", "comparison", "dialogue", "practice", "contrast", "detective", "decision", "situations", "dashboard", "reading", "readingQuestions", "test", "teacher", "writing", "summary", "phase", "roadmap"]) {
  ok(M.SLIDES_48.some((s) => s.kind === kind), `${kind} slide exists`);
}
ok(M.SLIDES_48.filter((s) => s.kind === "dialogue").length === 3, "three real-life dialogues");
ok(M.GOALS_48.length === 11, "eleven review goals from the source");
ok(M.CASES_48.length === 7, "seven opening situations");
ok(M.MODALS_48.length === 13, "thirteen modal entries in the meaning map");
ok(M.CONTRAST_48.length === 6, "six meaning-contrast laboratories");
ok(M.DECISION_MAP_48.length === 10, "ten decision-map branches");
ok(M.DETECTIVE_48.length === 12, "twelve detective errors");
ok(Object.keys(M.DIALOGUES_48).length === 3, "three dialogue objects");
ok(M.READING_48.length === 14, "complete reading text (14 paragraphs)");
ok(M.READING_QUESTIONS_48.length === 15, "fifteen comprehension questions");
ok(M.SUMMARY_48.length === 18, "eighteen golden-summary rows");
ok(M.FIVE_COMPARISONS_48.length === 5, "five comparisons");
ok(M.SLIDES_48[M.LESSON_STEP_COUNT_48 - 1].id === "course-progress", "course progress is the final slide");
ok(M.SLIDES_48.some((s) => s.id === "phase-complete"), "phase-two completion slide exists");
ok(M.SLIDES_48.findIndex((s) => s.id === "final-test") > 0, "final test is present");
const sourceText = readFileSync(join(root, "src/lessons/lesson48/data.ts"), "utf8");
for (const marker of ["OUGHT TO", "WAS / WERE ABLE TO", "NEEDN'T HAVE + V3", "WOULD RATHER + SUBJECT + PAST SIMPLE", "WOULD YOU MIND + V-ing", "Decision Map", "MODAL PERFECT"]) {
  ok(sourceText.includes(marker) || M.SLIDES_48.some((s) => JSON.stringify(s).includes(marker)), `source axis retained: ${marker}`);
}

/* ---------- writing model ---------- */
const modelSentences = M.MODEL_48.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
ok(modelSentences.length >= 15 && modelSentences.length <= 20, `writing model has 15–20 sentences (got ${modelSentences.length})`);
const modelLower = M.MODEL_48.toLowerCase().replace(/[’‘]/g, "'");
for (const [name, regex] of [
  ["can", /\bcan\b/],
  ["could", /\bcould\b/],
  ["may / might", /\b(?:may|might)\b/],
  ["may i", /\bmay\s+i\b/],
  ["must", /\bmust\b/],
  ["have to", /\b(?:have|has|had)\s+to\b/],
  ["mustn't", /\bmustn't\b/],
  ["don't have to", /\b(?:don't|do not)\s+have\s+to\b/],
  ["should", /\bshould\b/],
  ["ought to", /\bought\s+to\b/],
  ["would like", /\b(?:i'd|would)\s+like\b/],
  ["would rather", /\b(?:i'd|would)\s+rather\b/],
  ["rather than", /\brather\b[^.?!]*\bthan\b/],
  ["could you", /\bcould\s+you\b/],
  ["would you mind + ing", /\bwould\s+you\s+mind\s+[a-z]+ing\b/],
]) ok(regex.test(modelLower), `writing model includes ${name}`);

/* ---------- practice inventory ---------- */
for (const [set, size] of Object.entries({
  rule: 5,
  ability: 4,
  possibility: 4,
  necessity: 4,
  prohibition: 4,
  advice: 4,
  desire: 4,
  future: 4,
  "detective-a": 6,
  "detective-b": 6,
  "lab-school": 1,
  "lab-trip": 1,
  "lab-home": 1,
  say: 10,
  forms: 6,
  contrast: 5,
})) ok(M.PRACTICE_SETS_48[set]?.length === size, `${set} has ${size} questions`);
const practices = Object.values(M.PRACTICE_SETS_48).flat();
ok(practices.length === 69, `69 practice items in total (got ${practices.length})`);
ok(new Set(practices.map((p) => p.id)).size === practices.length, "practice IDs unique");
for (const p of practices) ok(Boolean(M.PRACTICE_KEYS_48[p.id]), `practice key exists: ${p.id}`);
for (const set of ["lab-school", "lab-trip", "lab-home"]) ok(M.SLIDES_48.some((s) => s.dialogue && M.DIALOGUES_48[s.dialogue].labId === set), `${set} is reachable from a dialogue`);
for (const logic of ["rule", "ability", "possibility", "necessity", "prohibition", "advice", "desire", "future", "say", "forms"]) {
  ok(M.SLIDES_48.some((s) => s.practiceSet === logic), `${logic} practice is rendered by a slide`);
}
ok(Boolean(M.SKILL_OF_SET_48["detective-a"]) && M.SKILL_OF_SET_48["detective-a"] === M.SKILL_OF_SET_48["detective-b"], "detective sets share one dashboard skill");

/* ---------- assessment inventory ---------- */
ok(M.TEST_QUESTIONS_48.length === 25 && M.TEST_SOLUTIONS_48.length === 25, "25 prompts and 25 independent keys");
ok(new Set(M.TEST_QUESTIONS_48.map((q) => q.id)).size === 25 && new Set(M.TEST_SOLUTIONS_48.map((q) => q.id)).size === 25, "question/key IDs unique");
const levelCounts = [1, 2, 3, 4, 5].map((level) => M.TEST_QUESTIONS_48.filter((q) => q.level === level).length);
ok(levelCounts.join(",") === "10,5,5,4,1", `level split 10/5/5/4/1 (got ${levelCounts.join("/")})`);
ok(M.TEST_QUESTIONS_48.filter((q) => q.level === 1 && q.type === "choice").length === 10, "level one is ten multiple-choice questions");
ok(M.TEST_QUESTIONS_48.filter((q) => q.level === 2 && q.type === "text").length === 5, "level two is five completion questions");
ok(M.TEST_QUESTIONS_48.filter((q) => q.level === 3 && q.type === "text").length === 5, "level three is five corrections");
ok(M.TEST_QUESTIONS_48.filter((q) => q.level === 4 && q.type === "choice").length === 4, "level four is four meaning questions");
ok(M.TEST_QUESTIONS_48.filter((q) => q.level === 5).length === 1, "level five is a single dialogue question");
for (const q of M.TEST_QUESTIONS_48) {
  ok(Boolean(M.TEST_SOLUTIONS_48.find((s) => s.id === q.id)), `${q.id} has key`);
  ok(!("answer" in q) && !("correct" in q) && !("model" in q) && !("patterns" in q), `${q.id} exposes no key in prompt data`);
}
const dataSource = readFileSync(join(root, "src/lessons/lesson48/testData48.ts"), "utf8");
const areaSource = readFileSync(join(root, "src/lessons/lesson48/TestArea48.tsx"), "utf8");
const guideSource = readFileSync(join(root, "src/lessons/lesson48/TeacherGuide48.tsx"), "utf8");
ok(!/TEST_SOLUTIONS_48|modelAnswer|gradeTest48|patterns/.test(dataSource), "student test data has no key");
ok(areaSource.includes('import("./testKey48")') && areaSource.includes('import("./testKey48?retry")'), "key has submit-only dynamic primary and retry paths");
ok(!/import\s+\{[^}]*gradeTest48/.test(areaSource), "student area has no runtime static key import");
ok(!/import\s+\{[^}]*TEST_SOLUTIONS_48/.test(guideSource), "teacher guide receives submitted result without importing key");
ok(!/import\s+(?!type)[^;]*from "\.\/testKey48"/.test(guideSource), "teacher guide has no value import from the key");
ok(!/TEST_SOLUTIONS_48/.test(guideSource), "teacher guide never names the solutions array");

/* ---------- grading: acceptance and rejection ---------- */
const perfectAnswers = {
  q1: "b", q2: "a", q3: "b", q4: "b", q5: "b", q6: "a", q7: "b", q8: "c", q9: "a", q10: "b",
  q11: "could",
  q12: "might",
  q13: "must",
  q14: "needn't",
  q15: "to learn",
  q16: "He must study harder.",
  q17: "Can she drive?",
  q18: "You don't have to come early.",
  q19: "I'd rather travel by train.",
  q20: "Would you mind waiting here?",
  q21: "a", q22: "a", q23: "a", q24: "a",
  q25: "may, may, have to, should, could, needn't, would",
};
const perfect = M.gradeTest48(perfectAnswers);
ok(perfect.score === 25 && perfect.total === 25, `perfect answers score 25/25 (got ${perfect.score})`);
for (let level = 1; level <= 5; level++) ok(perfect.byLevel[level].score === perfect.byLevel[level].total, `level ${level} fully correct`);

const alternatives = {
  q11: ["I could swim very well.", "When I was young, I could swim very well."],
  q12: ["may", "could", "She may be at home.", "she might be at home but i'm not certain"],
  q13: ["have to", "We have to finish this task today."],
  q14: ["don't have to", "You don't have to hurry."],
  q15: ["to learn another language", "I'd like to learn another language."],
  q16: ["he must study harder"],
  q17: ["can she drive"],
  q18: ["You needn't come early.", "you do not have to come early"],
  q19: ["I would rather travel by train.", "i'd rather travel by train"],
  q20: ["Would you mind waiting here?", "would you mind waiting here"],
  q25: [
    "May, may, have to, should, could, needn't, would",
    "may,may,have to,should,could,needn't,would",
    "May; may; have to; should; Could; needn't; would",
    "May  may  have to  should  could  needn't  would",
    "Maya: May I come in? Teacher: Of course, you may. Maya: I have to finish my project today. Teacher: You should divide it into smaller tasks. Maya: Could you help me? Teacher: You needn't worry. Maya: I would like to learn.",
    "could, can, must, could, would, don't have to, 'd",
  ],
};
for (const [id, values] of Object.entries(alternatives)) {
  for (const value of values) ok(M.gradeQuestion48(M.TEST_QUESTIONS_48.find((q) => q.id === id), value), `${id} accepts alternative: ${value}`);
}

const negatives = {
  q1: ["a", "c"], q2: ["b", "c"], q3: ["a", "c"], q4: ["a", "c"], q5: ["a", "c"], q6: ["b", "c"], q7: ["a", "c"], q8: ["a", "b"], q9: ["b", "c"], q10: ["a", "c"],
  q11: ["can", "could swim", "would"],
  q12: ["must", "mustn't", "have to"],
  q13: ["should", "mustn't", "needn't"],
  q14: ["mustn't", "should", "must"],
  q15: ["learn", "learning", "to learning"],
  q16: ["He must to study harder.", "He must studies harder.", "He can study harder."],
  q17: ["Does she can drive?", "Can she drives?", "She can drive?"],
  q18: ["You mustn't come early.", "You don't have to came early."],
  q19: ["I'd rather to travel by train.", "I'd rather travelling by train."],
  q20: ["Would you mind to wait here?", "Would you mind wait here?"],
  q21: ["b", "c"], q22: ["b", "c"], q23: ["b", "c"], q24: ["b", "c"],
  q25: [
    "may, may, have to, should, could, mustn't, would",
    "may, may, should, should, could, needn't, would",
    "must, may, have to, should, could, needn't, would",
    "may, may, have to, should, could, needn't",
    "may, have to, may, should, could, needn't, would",
    "",
  ],
};
for (const [id, values] of Object.entries(negatives)) {
  for (const value of values) {
    ok(!M.gradeQuestion48(M.TEST_QUESTIONS_48.find((q) => q.id === id), value), `${id} rejects: ${value}`);
  }
}
for (const id of Object.keys(perfectAnswers)) ok(!M.gradeQuestion48(M.TEST_QUESTIONS_48.find((q) => q.id === id), ""), `${id} rejects blank`);
ok(M.gradeQuestion48(M.TEST_QUESTIONS_48[0], " B ") === false, "choice grading is exact option id, not free text");
ok(M.gradeQuestion48(M.TEST_QUESTIONS_48[3], "b") === true, "choice grading tolerates surrounding whitespace");
ok(M.answeredCount48({}) === 0 && !M.testComplete48({}), "empty test is incomplete");
ok(M.answeredCount48(perfectAnswers) === 25 && M.testComplete48(perfectAnswers), "all 25 answers complete the test");
ok(!M.testComplete48({ ...perfectAnswers, q25: "   " }), "whitespace-only answer does not complete the test");

/* ---------- practice grading ---------- */
const practicePositive = {
  r1: "can", r2: "finish", r3: "Can", r4: "He must study harder.", r5: "She ought to respect her teacher.",
  a1: "could", a2: "was able to", a3: "May", a4: "Can she drive?",
  p1: "might", p2: "may not", p3: "May", p4: "It might rain tomorrow.",
  n1: "has to", n2: "had to", n3: "Do", n4: "He has to study every day.",
  pr1: "mustn't", pr2: "don't have to", pr3: "needn't", pr4: "You needn't come early.",
  ad1: "should", ad2: "ought to", ad3: "should", ad4: "You should study harder.",
  de1: "stay", de2: "closing", de3: "like", de4: "I'd rather you stayed here.",
  f1: "will", f2: "would", f3: "will", f4: "He will help you.",
  d1: "She can speak French.", d2: "He must finish his homework.", d3: "Can she swim?",
  d4: "You don't have to come early.", d5: "He doesn't have to work today.", d6: "It might rain tomorrow.",
  d7: "You should study harder.", d8: "I'd rather stay home.", d9: "Would you mind helping me?",
  d10: "She ought to respect her parents.", d11: "He has to study every day.", d12: "May I come in?",
  "lab-school": "إنهاء كل شيء اليوم غير ممنوع، لكنه ليس ضروريًا.",
  "lab-trip": "احتمال أن تكون الغرف ممتلئة.",
  "lab-home": "منع صريح.",
  s1: "can", s2: "might", s3: "mustn't", s4: "needn't", s5: "should", s6: "May", s7: "Could",
  s8: "rather", s9: "like", s10: "don't have to",
  fo1: "can", fo2: "might", fo3: "have to", fo4: "to learn", fo5: "could", fo6: "has",
  c1: "الأولى منع، والثانية عدم ضرورة.",
  c2: "الأولى نصيحة، والثانية إلزام أقوى.",
  c3: "كلتاهما احتمال، وMIGHT قد تكون أكثر تحفظًا في بعض السياقات دون نسب ثابتة.",
  c4: "الأولى قدرة في الحاضر، والثانية قدرة عامة في الماضي.",
  c5: "الأولى رغبة، والثانية تفضيل بين خيارين.",
};
const practiceNegative = {
  r1: "cans", r2: "to finish", r3: "Does", r4: "He must to study harder.", r5: "She ought respect her teacher.",
  a1: "can", a2: "can", a3: "Must", a4: "Does she can drive?",
  p1: "has to", p2: "may", p3: "Should", p4: "It might rains tomorrow.",
  n1: "have to", n2: "must", n3: "Must", n4: "He has to studies every day.",
  pr1: "don't have to", pr2: "mustn't", pr3: "should", pr4: "You mustn't come early.",
  ad1: "should to", ad2: "ought", ad3: "must", ad4: "You should to study harder.",
  de1: "to stay", de2: "to close", de3: "rather", de4: "I'd rather you stay here.",
  f1: "would", f2: "will", f3: "could", f4: "He wills help you.",
  d1: "She cans speak French.", d2: "He must to finish his homework.", d3: "Does she can swim?",
  d4: "You mustn't come early.", d5: "He don't have to work today.", d6: "It might rains tomorrow.",
  d7: "You should to study harder.", d8: "I'd rather to stay home.", d9: "Would you mind to help me?",
  d10: "She ought respect her parents.", d11: "He has to studies every day.", d12: "May I to come in?",
  "lab-school": "إنهاء كل شيء اليوم ممنوع تمامًا.",
  "lab-trip": "منع حجز الغرف.",
  "lab-home": "عدم ضرورة.",
  s1: "must", s2: "mustn't", s3: "don't have to", s4: "mustn't", s5: "must", s6: "Should", s7: "Should",
  s8: "like", s9: "rather", s10: "mustn't",
  fo1: "cans", fo2: "must", fo3: "should", fo4: "learn", fo5: "can", fo6: "have",
  c1: "كلتاهما منع.", c2: "كلتاهما نصيحة.", c3: "MAY تعني 70% وMIGHT تعني 30% دائمًا.",
  c4: "كلتاهما قدرة في الحاضر.", c5: "كلتاهما تفضيل.",
};
for (const p of practices) {
  ok(M.gradePractice48(p.id, practicePositive[p.id] ?? ""), `${p.id} accepts correct answer`);
  ok(!M.gradePractice48(p.id, practiceNegative[p.id] ?? "x"), `${p.id} rejects wrong answer`);
  ok(!M.gradePractice48(p.id, ""), `${p.id} rejects blank`);
}
for (const alt of ["I'd rather you stayed here.", "I would rather you stayed here."]) ok(M.gradePractice48("de4", alt), `de4 accepts ${alt}`);
for (const wrong of ["I'd rather you stay here.", "I'd rather stay here.", "I'd rather you staying here."]) ok(!M.gradePractice48("de4", wrong), `de4 rejects ${wrong}`);
for (const alt of ["needn't", "don't have to", "need not", "do not have to"]) ok(M.gradePractice48("pr4", alt), `pr4 accepts ${alt}`);
for (const wrong of ["mustn't", "shouldn't", "may not"]) ok(!M.gradePractice48("pr4", wrong), `pr4 rejects ${wrong}`);
for (const alt of ["May", "could", "Can"]) ok(M.gradePractice48("s6", alt), `s6 accepts ${alt}`);
for (const wrong of ["Must", "Should", "Have"]) ok(!M.gradePractice48("s6", wrong), `s6 rejects ${wrong}`);
ok(!M.gradePractice48("d1", "She can speak French and she sings"), "detective rewrite rejects extra meaning");

/* ---------- retry + jsdom ---------- */
const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/#/lesson/48", pretendToBeVisual: true });
for (const key of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "HTMLInputElement", "HTMLTextAreaElement", "getComputedStyle", "localStorage", "MutationObserver"]) {
  if (dom.window[key]) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
dom.window.Element.prototype.scrollIntoView = () => {};
dom.window.Element.prototype.scrollTo = () => {};
dom.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
globalThis.IS_REACT_ACT_ENVIRONMENT = false;
const retryUrl = M.retryModuleUrl48(new Error("Failed to fetch dynamically imported module: http://localhost/assets/testKey48-abc.js"), "testKey48", 2);
ok(Boolean(retryUrl) && new URL(retryUrl).origin === "http://localhost" && new URL(retryUrl).searchParams.has("lesson48Retry"), "retry URL is same-origin and cache-busted");
ok(M.retryModuleUrl48(new Error("https://other.example/assets/testKey48-abc.js"), "testKey48", 1) === null, "retry rejects foreign origins");
ok(M.retryModuleUrl48(new Error("http://localhost/assets/TeacherGuide48-abc.js"), "testKey48", 1) === null, "retry rejects the wrong module");
const tick = (ms = 25) => new Promise((resolve) => setTimeout(resolve, ms));
const host = document.createElement("div");
document.body.appendChild(host);
const reactRoot = M.createRoot(host);
M.flushSync(() => reactRoot.render(M.React.createElement(M.Lesson48)));
for (let i = 0; i < M.LESSON_STEP_COUNT_48; i++) {
  ok((host.textContent || "").includes(`${i + 1} / 52`), `slide ${i + 1} renders with correct counter`);
  const issues = auditRenderedStudentCopy(host);
  ok(issues.length === 0, `slide ${i + 1} contains no editorial/source labels: ${JSON.stringify(issues)}`);
  if (M.SLIDES_48[i].id === "final-test") {
    ok(!host.querySelector("[data-test-result], [data-question-feedback]"), "test hides results and correction initially");
    ok(host.querySelectorAll("[data-test-q]").length === 25, "test renders all 25 questions");
    ok(host.querySelectorAll("[data-test-level]").length === 5, "test renders five levels");
    ok(host.querySelector("[data-test-submit]").disabled, "submit disabled until all questions are answered");
  }
  if (M.SLIDES_48[i].id === "teacher") {
    ok(Boolean(host.querySelector("[data-teacher-locked]")) && !host.querySelector("[data-teacher-guide]"), "teacher inaccessible before submission");
    ok(!host.querySelector("#l48-teacher-password"), "teacher password field hidden before submission");
  }
  if (M.SLIDES_48[i].id === "phase-complete") {
    ok(host.textContent.includes("8 / 8") && host.textContent.includes("48 / 120") && host.textContent.includes("72"), "phase completion shows 8/8, 48/120 and 72 remaining");
  }
  if (M.SLIDES_48[i].id === "course-progress") {
    ok(host.textContent.includes("LESSON 49") && host.textContent.includes("MODAL PERFECT"), "roadmap points to Lesson 49");
  }
  if (i < M.LESSON_STEP_COUNT_48 - 1) M.flushSync(() => host.querySelector('[data-step-nav="next"]').click());
}
ok(host.textContent.includes("48 / 120") && host.textContent.includes("40%"), "course progress states 48/120 and 40%");
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
  ok(retry, "key retry switches to the independent retry URL");
  await tick(20);
  return { gradeTest48: M.gradeTest48 };
};
const retained = { ...perfectAnswers, q25: "may, may, have to, should, could, needn't, would" };
function Harness() {
  const [answers, setAnswers] = M.React.useState(retained);
  const [result, setResult] = M.React.useState(null);
  return M.React.createElement(M.TestArea48, {
    answers,
    result,
    keyLoader: loader,
    onChangeAnswer: (id, value) => setAnswers((previous) => ({ ...previous, [id]: value })),
    onSubmitResult: setResult,
    onReset: () => {
      setAnswers({});
      setResult(null);
    },
  });
}
M.flushSync(() => testRoot.render(M.React.createElement(Harness)));
ok(loadCount === 0 && !testHost.querySelector("[data-test-result], [data-question-feedback]"), "no key load or correction on initial test render");
M.flushSync(() => testHost.querySelector("[data-test-submit]").click());
await tick();
ok(loadCount === 1 && Boolean(testHost.querySelector("[data-test-error]")), "first failed load shows a retryable error");
ok(!testHost.querySelector("[data-test-result]") && !testHost.querySelector("[data-test-submit]").disabled, "failure keeps the test unsubmitted and retry available");
ok(testHost.querySelector('input[aria-label="إجابة السؤال 25"]').value === retained.q25, "failed load preserves the dialogue answer");
M.flushSync(() => {
  const submit = testHost.querySelector("[data-test-submit]");
  submit.click();
  submit.click();
});
await tick(60);
ok(loadCount === 2, "rapid duplicate submit invokes the loader once");
ok((testHost.querySelector("[data-test-result]")?.textContent || "").includes("25 / 25"), "retry grades retained answers 25/25");
ok(testHost.querySelectorAll("[data-question-feedback]").length === 25, "25 feedback items only after submission");
M.flushSync(() => testHost.querySelector("[data-test-reset]").click());
ok(!testHost.querySelector("[data-test-result]") && testHost.querySelector("[data-test-submit]").disabled, "retake clears the score and requires answers");
ok(!testHost.querySelector('input[aria-label="إجابة السؤال 25"]').value, "retake clears typed answers");
M.flushSync(() => testRoot.unmount());
testHost.remove();

/* ---------- teacher area ---------- */
let guideLoads = 0;
const teacherHost = document.createElement("div");
document.body.appendChild(teacherHost);
const teacherRoot = M.createRoot(teacherHost);
const guideLoader = async (retry) => {
  guideLoads++;
  if (guideLoads === 1) throw new Error("simulated teacher chunk failure");
  ok(retry, "teacher retry switches URL");
  return { default: M.TeacherGuide48 };
};
M.flushSync(() => teacherRoot.render(M.React.createElement(M.TeacherArea48, { result: perfect, unlocked: true, onUnlock() {}, onLock() {}, loader: guideLoader })));
await tick();
ok(Boolean(teacherHost.querySelector("[data-teacher-error]")) && !teacherHost.querySelector("[data-teacher-guide]"), "teacher chunk failure is isolated with retry UI");
M.flushSync(() => teacherHost.querySelector("[data-teacher-error] button").click());
await tick();
ok(guideLoads === 2 && teacherHost.querySelectorAll("[data-teacher-q]").length === 25, "teacher retry loads 25 detailed solutions");
ok(perfect.score === 25, "teacher failure leaves the student result untouched");
M.flushSync(() => teacherRoot.unmount());
teacherHost.remove();

if (failures.length) {
  console.error(`\nLesson 48 audit FAILED: ${failures.length} of ${checks} assertions.`);
  process.exit(1);
}
console.log(`Lesson 48 audit passed: ${checks} assertions, 0 failures.`);
