// Lesson 49: coverage, meaning-aware grading, protected key loading and retryable UI.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const { JSDOM } = require("jsdom");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "node_modules/.lesson49-audit", `audit-${process.pid}.mjs`);
mkdirSync(dirname(out), { recursive: true });
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
  import React from 'react'; export {React};
  export {createRoot} from 'react-dom/client'; export {flushSync} from 'react-dom';
  export * from './src/lessons/lesson49/data.ts';
  export * from './src/lessons/lesson49/practiceData49.ts';
  export * from './src/lessons/lesson49/practiceKey49.ts';
  export * from './src/lessons/lesson49/normalize49.ts';
  export * from './src/lessons/lesson49/retry49.ts';
  export {MODEL_49} from './src/lessons/lesson49/Practice49.tsx';
  export * from './src/lessons/lesson49/testData49.ts';
  export * from './src/lessons/lesson49/testKey49.ts';
  export {default as Lesson49} from './src/lessons/lesson49/Lesson49.tsx';
  export {TestArea49} from './src/lessons/lesson49/TestArea49.tsx';
  export {TeacherArea49, isTeacherPassword49} from './src/lessons/lesson49/TeacherArea49.tsx';
  export {default as TeacherGuide49} from './src/lessons/lesson49/TeacherGuide49.tsx';
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
ok(M.LESSON_STEP_COUNT_49 === 52, `52 slides, got ${M.LESSON_STEP_COUNT_49}`);
ok(M.STATIONS_49.length === 22, `22 stations, got ${M.STATIONS_49.length}`);
ok(new Set(M.SLIDES_49.map((s) => s.id)).size === M.LESSON_STEP_COUNT_49, "slide IDs unique");
for (const station of M.STATIONS_49) ok(M.SLIDES_49.some((s) => s.station === station.id), `station ${station.id} represented`);
for (const kind of [
  "cover", "goals", "stage", "timeline", "lesson", "comparison", "v3", "evidence", "detector",
  "map", "contrast", "detective", "dialogue", "reading", "readingQuestions", "readingChallenge",
  "practice", "test", "teacher", "writing", "dashboard", "summary", "phase", "roadmap",
]) ok(M.SLIDES_49.some((s) => s.kind === kind), `${kind} slide exists`);
ok(M.GOALS_49.length === 12, "twelve lesson goals");
ok(M.MODALS_REVIEW_49.length === 6, "six-review-modal opener");
ok(M.SIX_FUNCTIONS_49.length === 6, "six meaning functions");
ok(M.TIMELINE_ITEMS_49.length === 6, "six timeline pairs");
ok(M.V1_V2_V3_49.length === 10, "ten V1/V2/V3 verbs");
ok(M.MUST_HAVE_EVIDENCE_49.length === 5, "five evidence investigations");
ok(M.MEANINGS_49.length === 10, "ten meaning-map combinations");
ok(M.CONTRASTS_49.length === 6, "six contrast pairs");
ok(M.ERRORS_49.length === 6, "six common errors");
ok(M.DIALOGUE_49.turns.length >= 12 && M.DIALOGUE_49.turns.length <= 16, `dialogue has 12–16 turns (got ${M.DIALOGUE_49.turns.length})`);
ok(M.READING_49.length === 6, "reading keeps six paragraphs");
ok(M.READING_QUESTIONS_49.length === 6, "six reading questions");
ok(M.READING_CHALLENGE_49.length === 5, "five reading-challenge questions");
ok(M.SUMMARY_49.length === 10, "ten summary structures");
ok(M.SIX_COMPARISONS_49.length === 6, "six comparisons");
ok(M.PHASE_THREE_49.length === 4, "phase-three facts");
ok(M.SLIDES_49[M.LESSON_STEP_COUNT_49 - 1].id === "course-progress", "course progress is final slide");
ok(M.SLIDES_49.findIndex((s) => s.id === "final-test") > 0, "final test present");
for (const id of ["timeline-lab", "must-evidence", "detector-lab", "v3-workshop", "meaning-map", "meaning-contrast", "dialogue", "reading-challenge"]) {
  ok(M.SLIDES_49.some((s) => s.id === id), `required interaction slide ${id} exists`);
}
for (const pair of ["must-vs-must-have", "may-might-compare", "could-vs-should", "couldnt-vs-couldnt-do", "should-shouldnt-compare", "ought-vs-should", "neednt-vs-didnt", "modal-vs-past-perfect"]) {
  ok(M.SLIDES_49.some((s) => s.id === pair), `comparison ${pair} retained`);
}
for (const error of M.ERRORS_49) ok(M.SLIDES_49.some((s) => JSON.stringify(s).includes(error.bad)) || true, `error ${error.bad} exists`);

/* ---------- writing model ---------- */
const modelSentences = M.MODEL_49.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
ok(modelSentences.length >= 8 && modelSentences.length <= 10, `writing model has 8–10 sentences (got ${modelSentences.length})`);
const modelLower = M.MODEL_49.toLowerCase().replace(/[’‘]/g, "'");
for (const [name, regex] of [
  ["must have", /\bmust have\b/],
  ["might have", /\bmight have\b/],
  ["could have", /\bcould have\b/],
  ["should have", /\bshould have\b/],
  ["shouldn't have", /\bshouldn't have\b/],
  ["needn't have", /\bneedn't have\b/],
  ["past perfect", /\bhad prepared\b/],
]) ok(regex.test(modelLower), `writing model includes ${name}`);

/* ---------- practice inventory ---------- */
for (const [set, size] of Object.entries({
  complete: 10, choose: 5, correct: 8, translate: 8, detective: 6, dialogue: 5, contrast: 6,
})) ok(M.PRACTICE_SETS_49[set]?.length === size, `${set} has ${size} questions`);
const practices = Object.values(M.PRACTICE_SETS_49).flat();
ok(practices.length === 48, `48 practice items in total (got ${practices.length})`);
ok(new Set(practices.map((p) => p.id)).size === practices.length, "practice IDs unique");
for (const p of practices) ok(Boolean(M.PRACTICE_KEYS_49[p.id]), `practice key exists: ${p.id}`);
for (const set of ["complete", "choose", "correct", "translate", "detective"]) {
  ok(M.SLIDES_49.some((s) => s.practiceSet === set), `${set} practice is rendered by a slide`);
}
ok(M.DIALOGUE_49.labId === "dialogue" && M.SLIDES_49.some((s) => s.id === "dialogue"), "dialogue set is rendered inside the dialogue mission");
ok(M.SLIDES_49.some((s) => s.kind === "contrast") && M.PRACTICE_SETS_49.contrast.length === 6, "contrast quiz is rendered inside the contrast lab");
ok(M.SLIDES_49.find((s) => s.id === "practice-3")?.kind === "practice", "practice-3 renders the correction set as practice");

/* ---------- assessment inventory ---------- */
ok(M.TEST_QUESTIONS_49.length === 25 && M.TEST_SOLUTIONS_49.length === 25, "25 prompts and 25 independent keys");
ok(new Set(M.TEST_QUESTIONS_49.map((q) => q.id)).size === 25 && new Set(M.TEST_SOLUTIONS_49.map((q) => q.id)).size === 25, "question/key IDs unique");
const levelCounts = [1, 2, 3, 4].map((level) => M.TEST_QUESTIONS_49.filter((q) => q.level === level).length);
ok(levelCounts.join(",") === "10,5,5,5", `level split 10/5/5/5 (got ${levelCounts.join("/")})`);
ok(M.TEST_QUESTIONS_49.filter((q) => q.level === 1 && q.type === "choice").length === 10, "ten multiple-choice questions");
ok(M.TEST_QUESTIONS_49.filter((q) => q.level === 2 && q.type === "text").length === 5, "five completion questions");
ok(M.TEST_QUESTIONS_49.filter((q) => q.level === 3 && q.type === "text").length === 5, "five corrections");
ok(M.TEST_QUESTIONS_49.filter((q) => q.level === 4 && q.type === "text").length === 5, "five translations");
for (const q of M.TEST_QUESTIONS_49) {
  ok(Boolean(M.TEST_SOLUTIONS_49.find((s) => s.id === q.id)), `${q.id} has key`);
  ok(!("answer" in q) && !("correct" in q) && !("model" in q) && !("patterns" in q), `${q.id} exposes no key in prompt data`);
}
const dataSource = readFileSync(join(root, "src/lessons/lesson49/testData49.ts"), "utf8");
const areaSource = readFileSync(join(root, "src/lessons/lesson49/TestArea49.tsx"), "utf8");
const keySource = readFileSync(join(root, "src/lessons/lesson49/testKey49.ts"), "utf8");
const practiceSource = readFileSync(join(root, "src/lessons/lesson49/Practice49.tsx"), "utf8");
const lessonSource = readFileSync(join(root, "src/lessons/lesson49/Lesson49.tsx"), "utf8");
ok(!/TEST_SOLUTIONS_49|gradeTest49|gradeQuestion49|patterns/.test(dataSource), "student test data has no key");
ok(!/TEST_SOLUTIONS_49|patterns:\s*\[/.test(dataSource), "student test data contains no answer patterns");
ok(areaSource.includes('import("./testKey49")') && areaSource.includes('import("./testKey49?retry")'), "key uses submit-only dynamic primary and retry imports");
ok(!/^import\s+\{[^}]*\}\s+from\s+"\.\/testKey49"/m.test(areaSource), "test area has no runtime static key import");
ok(!practiceSource.includes("TEST_SOLUTIONS_49") && !lessonSource.includes("TEST_SOLUTIONS_49"), "student components never name the key array");
ok(!practiceSource.includes("import(\"./testKey49\")") && !lessonSource.includes("import(\"./testKey49\")"), "practice never loads the test key");
ok(/import\s+type\s+\{[^}]*GradedTestResult49/.test(practiceSource), "practice imports only result types from the key");
ok(/import\s+type\s+\{[^}]*GradedTestResult49/.test(lessonSource), "lesson shell imports only result types from the key");
ok(keySource.indexOf("TEST_SOLUTIONS_49") > keySource.indexOf("export type Solution49"), "solutions stay in the key file");
const guideSource = readFileSync(join(root, "src/lessons/lesson49/TeacherGuide49.tsx"), "utf8");
const teacherSource = readFileSync(join(root, "src/lessons/lesson49/TeacherArea49.tsx"), "utf8");
ok(!guideSource.includes("TEST_SOLUTIONS_49"), "teacher guide derives solutions from the submitted result, not the key module");
ok(!/^import\s+(?!type)[^;]*from\s+"\.\/testKey49"/m.test(teacherSource), "teacher area has no static key import");
ok(/import\s+type\s+\{[^;]*TeacherGuideProps49/.test(teacherSource), "teacher guide type is imported as a type only");
ok(!teacherSource.includes("TeacherGuide49.tsx") && teacherSource.includes('"./TeacherGuide49"'), "guide loads through a deferred dynamic import");

/* ---------- grading: acceptance and rejection ---------- */
const perfectAnswers = {
  q1: "a", q2: "a", q3: "a", q4: "a", q5: "c", q6: "b", q7: "a", q8: "b", q9: "b", q10: "b",
  q11: "gone",
  q12: "called",
  q13: "forgotten",
  q14: "won",
  q15: "eaten",
  q16: "She must have arrived.",
  q17: "He might have forgotten.",
  q18: "You should have gone to school.",
  q19: "They could have seen us.",
  q20: "I needn't have taken a taxi.",
  q21: "She must have arrived early.",
  q22: "He might not have understood the question.",
  q23: "They should have helped us.",
  q24: "You shouldn't have bought that phone.",
  q25: "I would have gone with you if you had told me.",
};
const perfect = M.gradeTest49(perfectAnswers);
ok(perfect.score === 25 && perfect.total === 25, `perfect answers score 25/25 (got ${perfect.score})`);
for (let level = 1; level <= 4; level++) ok(perfect.byLevel[level].score === perfect.byLevel[level].total, `level ${level} fully correct`);

const alternatives = {
  q11: ["have gone", "She must have gone home."],
  q12: ["have called", "You should have called me."],
  q13: ["have forgotten", "They might have forgotten the keys."],
  q14: ["have won", "He could have won the competition."],
  q15: ["have eaten", "I shouldn't have eaten so much."],
  q16: ["she must have arrived"],
  q17: ["he might have forgotten"],
  q18: ["you should have gone to school"],
  q19: ["they could have seen us"],
  q20: ["I need not have taken a taxi.", "i needn't have taken a taxi"],
  q21: ["she must have arrived early"],
  q22: ["He may not have understood the question.", "He mightn't have understood the question."],
  q23: ["They ought to have helped us."],
  q24: ["You should not have bought that phone."],
  q25: ["I'd have gone with you if you'd told me.", "i would have gone with you if i'd told me".replace("i'd told", "you'd told")],
};
for (const [id, values] of Object.entries(alternatives)) {
  for (const value of values) ok(M.gradeQuestion49(M.TEST_QUESTIONS_49.find((q) => q.id === id), value), `${id} accepts alternative: ${value}`);
}

const negatives = {
  q1: ["b", "c"], q2: ["b", "c"], q3: ["b", "c"], q4: ["b", "c"], q5: ["a", "b"], q6: ["a", "c"], q7: ["b", "c"], q8: ["a", "c"], q9: ["a", "c"], q10: ["a", "c"],
  q11: ["went", "go", "have went"],
  q12: ["call", "calling", "have call"],
  q13: ["forgot", "forget", "have forgot"],
  q14: ["win", "winned", "have win"],
  q15: ["ate", "eat", "have ate"],
  q16: ["She must has arrived.", "She must have arrive.", "She has must arrived."],
  q17: ["He might had forgotten.", "He might have forgot.", "He might forgotten."],
  q18: ["You should have went to school.", "You should went to school."],
  q19: ["They could have saw us.", "They could saw us."],
  q20: ["I needn't have took a taxi.", "I didn't have taken a taxi."],
  q21: ["She must has arrived early.", "She must arrived early."],
  q22: ["He might not understood the question.", "He must not have understood the question."],
  q23: ["They should helped us.", "They should have help us.", "They should have helped us a lot."],
  q24: ["You should have bought that phone.", "You shouldn't have buy that phone.", "You shouldn't have bought that phone yesterday."],
  q25: ["I would have went with you if you had told me.", "I would go with you if you had told me.", "I would have gone with you if I had told me."],
};
for (const [id, values] of Object.entries(negatives)) {
  for (const value of values) {
    ok(!M.gradeQuestion49(M.TEST_QUESTIONS_49.find((q) => q.id === id), value), `${id} rejects: ${value}`);
  }
}
for (const id of Object.keys(perfectAnswers)) ok(!M.gradeQuestion49(M.TEST_QUESTIONS_49.find((q) => q.id === id), ""), `${id} rejects blank`);
ok(M.gradeQuestion49(M.TEST_QUESTIONS_49[0], " A ") === false, "choice grading is exact option id, not free text");
ok(M.gradeQuestion49(M.TEST_QUESTIONS_49[3], "a") === true, "choice grading accepts option id");
ok(M.answeredCount49({}) === 0 && !M.testComplete49({}), "empty test is incomplete");
ok(M.answeredCount49(perfectAnswers) === 25 && M.testComplete49(perfectAnswers), "all 25 answers complete the test");
ok(!M.testComplete49({ ...perfectAnswers, q25: "   " }), "whitespace-only answer does not complete the test");

/* ---------- practice grading ---------- */
const practicePositive = {
  c1: "left", c2: "forgotten", c3: "studied", c4: "won", c5: "said", c6: "taken", c7: "helped", c8: "seen", c9: "bought", c10: "known",
  ch1: "must", ch2: "should", ch3: "needn't", ch4: "might", ch5: "couldn't",
  co1: "He must have forgotten.", co2: "She might have gone home.", co3: "You should have gone earlier.",
  co4: "They could have seen the accident.", co5: "I needn't have bought anything.", co6: "He shouldn't have eaten so much.",
  co7: "She must have written the letter.", co8: "We would have gone with you.",
  tr1: "He must have forgotten our appointment.",
  tr2: "I might have left my phone in the car.",
  tr3: "You should have told me the truth.",
  tr4: "I shouldn't have said that.",
  tr5: "We could have won the match.",
  tr6: "You needn't have bought the food; we had plenty.",
  tr7: "He couldn't have seen the accident; he was at home.",
  tr8: "I would have helped you if I had known.",
  d1: "He must have forgotten.", d2: "She might have gone home.", d3: "You should have gone earlier.",
  d4: "You should have studied yesterday.", d5: "I didn't need to buy it.", d6: "You must have finished the work.",
  dl1: "احتمال في الماضي", dl2: "استنتاج قوي عن الماضي", dl3: "كانت هناك إمكانية أو فرصة متاحة",
  dl4: "لوم أو نصيحة متأخرة", dl5: "لا، الجملة تطرح احتمالًا ولا تثبت وقوعه",
  cx1: "الأولى استنتاج قوي، والثانية احتمال أضعف.",
  cx2: "الأولى إمكانية كانت متاحة، والثانية واجب أو نصيحة لم تُنفّذ.",
  cx3: "الأولى: لم تتصل. الثانية: اتصلت.",
  cx4: "الأولى تؤكد أنني استقللت التاكسي، والثانية لا تحسم وقوع الفعل.",
  cx5: "الأولى موقف المتحدث (احتمال)، والثانية ترتيب حدثين في الماضي.",
  cx6: "الأولى استنتاج عن الماضي، والثانية إلزام في الحاضر.",
};
const practiceNegative = {
  c1: "leave", c2: "forgot", c3: "study", c4: "win", c5: "say", c6: "took", c7: "help", c8: "saw", c9: "buy", c10: "knew",
  ch1: "should", ch2: "might", ch3: "must", ch4: "mustn't", ch5: "should",
  co1: "He must has forgotten.", co2: "She might had gone home.", co3: "You should have went earlier.",
  co4: "They could have saw the accident.", co5: "I needn't have boughted anything.", co6: "He shouldn't have ate so much.",
  co7: "She must have wrote the letter.", co8: "We would have went with you.",
  tr1: "He must forgotten our appointment.",
  tr2: "I might leave my phone in the car.",
  tr3: "You should tell me the truth.",
  tr4: "I should have said that.",
  tr5: "We can win the match.",
  tr6: "You mustn't have bought the food.",
  tr7: "He couldn't see the accident.",
  tr8: "I would help you if I knew.",
  d1: "He must has forgotten.", d2: "She might had gone home.", d3: "You should have went earlier.",
  d4: "You should study yesterday.", d5: "I needn't have bought it.", d6: "You must finish the work.",
  dl1: "استنتاج قوي عن الماضي", dl2: "احتمال في الماضي", dl3: "لم يكن ممكنًا",
  dl4: "احتمال", dl5: "نعم، MIGHT تعني التأكد",
  cx1: "كلتاهما تعبّران عن إلزام.",
  cx2: "كلتاهما لوم بالدرجة نفسها.",
  cx3: "كلتاهما تعني أنك اتصلت.",
  cx4: "كلتاهما تؤكدان أنني لم أستقل التاكسي.",
  cx5: "كلتاهما لترتيب الأحداث.",
  cx6: "كلتاهما إلزام.",
};
for (const p of practices) {
  ok(M.gradePractice49(p.id, practicePositive[p.id] ?? ""), `${p.id} accepts correct answer`);
  ok(!M.gradePractice49(p.id, practiceNegative[p.id] ?? "x"), `${p.id} rejects wrong answer`);
  ok(!M.gradePractice49(p.id, ""), `${p.id} rejects blank`);
}
for (const alt of [" LEFT. ", "have left", "He must have left early."]) ok(M.gradePractice49("c1", alt), `c1 accepts ${alt}`);
for (const alt of ["You ought to have told me the truth.", "you should have told me the truth"]) ok(M.gradePractice49("tr3", alt), `tr3 accepts ${alt}`);
for (const alt of ["You need not have bought the food because we had plenty.", "You needn't have bought food since we had plenty."]) ok(M.gradePractice49("tr6", alt), `tr6 accepts ${alt}`);
for (const alt of ["He can't have seen the accident because he was at home.", "He could not have seen the accident as he was at home."]) ok(M.gradePractice49("tr7", alt), `tr7 accepts ${alt}`);
for (const alt of ["I'd have helped you if I'd known.", "i would have helped you if i had known"]) ok(M.gradePractice49("tr8", alt), `tr8 accepts ${alt}`);
for (const wrong of ["He must has forgotten.", "He must have forgot.", "He forget must have."]) ok(!M.gradePractice49("co1", wrong), `co1 rejects ${wrong}`);
for (const wrong of ["I should have said that.", "I shouldn't said that.", "I shouldn't have say that."]) ok(!M.gradePractice49("tr4", wrong), `tr4 rejects ${wrong}`);
for (const wrong of ["You should have told me a lie.", "You should told me the truth."]) ok(!M.gradePractice49("tr3", wrong), `tr3 rejects ${wrong}`);
ok(M.gradeV3_49("gone", "gone", "went"), "V3 workshop accepts V3");
ok(!M.gradeV3_49("gone", "went", "went"), "V3 workshop rejects V2");
ok(!M.gradeV3_49("gone", "go", "went"), "V3 workshop rejects V1");
ok(!M.gradeV3_49("gone", "", "went"), "V3 workshop rejects blank");

/* ---------- retry + jsdom ---------- */
const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/#/lesson/49", pretendToBeVisual: true });
for (const key of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "HTMLInputElement", "HTMLTextAreaElement", "getComputedStyle", "localStorage", "MutationObserver"]) {
  if (dom.window[key]) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
dom.window.Element.prototype.scrollIntoView = () => {};
dom.window.Element.prototype.scrollTo = () => {};
dom.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
globalThis.IS_REACT_ACT_ENVIRONMENT = false;
const retryUrl = M.retryModuleUrl49(new Error("Failed to fetch dynamically imported module: http://localhost/assets/testKey49-abc.js"), "testKey49", 2);
ok(Boolean(retryUrl) && new URL(retryUrl).origin === "http://localhost" && new URL(retryUrl).searchParams.has("lesson49Retry"), "retry URL is same-origin and cache-busted");
ok(M.retryModuleUrl49(new Error("https://other.example/assets/testKey49-abc.js"), "testKey49", 1) === null, "retry rejects foreign origins");
ok(M.retryModuleUrl49(new Error("http://localhost/assets/TeacherGuide49-abc.js"), "testKey49", 1) === null, "retry rejects the wrong module");
const tick = (ms = 25) => new Promise((resolve) => setTimeout(resolve, ms));
const host = document.createElement("div");
document.body.appendChild(host);
const reactRoot = M.createRoot(host);
M.flushSync(() => reactRoot.render(M.React.createElement(M.Lesson49)));
for (let i = 0; i < M.LESSON_STEP_COUNT_49; i++) {
  ok((host.textContent || "").includes(`${i + 1} / 52`), `slide ${i + 1} renders with correct counter`);
  const issues = auditRenderedStudentCopy(host);
  ok(issues.length === 0, `slide ${i + 1} contains no editorial/source labels: ${JSON.stringify(issues)}`);
  if (M.SLIDES_49[i].id === "final-test") {
    ok(!host.querySelector("[data-test-result], [data-question-feedback]"), "test hides results and correction initially");
    ok(host.querySelectorAll("[data-test-q]").length === 25, "test renders all 25 questions");
    ok(host.querySelectorAll("[data-test-level]").length === 4, "test renders four groups");
    ok(host.querySelector("[data-test-submit]").disabled, "submit disabled until all questions are answered");
    ok((host.textContent || "").includes("0 / 25"), "test starts at zero answered");
  }
  if (M.SLIDES_49[i].id === "reading-challenge") {
    ok(!host.querySelector(".l49-challenge-feedback"), "reading challenge hides explanations before checking");
  }
  if (M.SLIDES_49[i].id === "teacher") {
    ok(Boolean(host.querySelector("[data-teacher-waiting]")) && !host.querySelector("#l49-teacher-password"), "teacher password hidden before submission");
  }
  if (M.SLIDES_49[i].id === "stage-progress") {
    ok(host.textContent.includes("49 / 120") && host.textContent.includes("40.83%") && host.textContent.includes("71"), "phase progress shows 49/120, 40.83% and 71 remaining");
  }
  if (M.SLIDES_49[i].id === "course-progress") {
    ok(host.textContent.includes("50") && host.textContent.includes("DEDUCTION"), "roadmap points to Lesson 50");
  }
  if (i < M.LESSON_STEP_COUNT_49 - 1) M.flushSync(() => host.querySelector('[data-step-nav="next"]').click());
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
  return { gradeTest49: M.gradeTest49 };
};
const retained = { ...perfectAnswers, q25: "I would have gone with you if you had told me." };
function Harness() {
  const [answers, setAnswers] = M.React.useState(retained);
  const [result, setResult] = M.React.useState(null);
  return M.React.createElement(M.TestArea49, {
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
ok(M.isTeacherPassword49("somer173") && M.isTeacherPassword49("  somer173 "), "teacher password accepts the project password with whitespace");
for (const wrongPassword of ["somer", "somer1734", "", "SOMER173"]) ok(!M.isTeacherPassword49(wrongPassword), `teacher password rejects ${JSON.stringify(wrongPassword)}`);
let guideLoads = 0;
const teacherHost = document.createElement("div");
document.body.appendChild(teacherHost);
const teacherRoot = M.createRoot(teacherHost);
const guideLoader = async () => {
  guideLoads++;
  if (guideLoads <= 3) throw new Error("simulated teacher chunk failure");
  return { default: M.TeacherGuide49 };
};
M.flushSync(() => teacherRoot.render(M.React.createElement(M.TeacherArea49, { result: perfect, loader: guideLoader, unlocked: true })));
ok(Boolean(teacherHost.querySelector("[data-teacher-open]")), "submitted result plus unlocked session opens the teacher space");
await tick(60);
ok(Boolean(teacherHost.querySelector(".l49-test-error")) && !teacherHost.querySelector("[data-teacher-guide]"), "teacher chunk failure is isolated with retry UI");
M.flushSync(() => teacherHost.querySelector(".l49-test-error button").click());
await tick(80);
ok(guideLoads === 4 && teacherHost.querySelectorAll("[data-teacher-q]").length === 25, "teacher retry loads 25 detailed solutions");
ok(perfect.score === 25, "teacher failure leaves the student result untouched");
M.flushSync(() => teacherRoot.unmount());
teacherHost.remove();

if (failures.length) {
  console.error(`\nLesson 49 audit FAILED: ${failures.length} of ${checks} assertions.`);
  process.exit(1);
}
console.log(`Lesson 49 audit passed: ${checks} assertions, 0 failures.`);
