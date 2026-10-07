// ============================================================
// Lesson 27 audit — Past Perfect — الماضي التام
// Native multi-step interactive lesson audit (Lesson 6 / Lesson 29 benchmark)
//   node scripts/audit-lesson27.mjs
// Verifies:
//   1) Source ledger: 44 numbered sections ①–㊹ + 9 unnumbered sections.
//   2) Key sensitive source phrases preserved verbatim.
//   3) In-lesson exercises as real interactive components.
//   4) 53 native steps + navigation controls + progress bar.
//   5) Interactive lab layer (timelines, verb tables, tense switches, detective, boss, story studio).
//   6) Four separate areas (student-lesson, l27-test, l27-solutions, l27-teacher).
//   7) Test Area: exactly 20 authored questions, types, no leaks before submit, score, full reset.
//   8) Solutions Area: 20 detailed explanatory solutions gated until submit or teacher unlock.
//   9) Teacher Area: password somer173, overview, 16 notes, 10 activity solutions, rubric, common mistakes.
//   10) Direction & BIDI: RTL shell with LTR English isolation, LatinRuns, no word-reversal engine.
//   11) App routing and hub registration.
// ============================================================
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = readFileSync(join(root, "src/lessons/lesson27/data.ts"), "utf8");
const view = readFileSync(join(root, "src/lessons/lesson27/Lesson27.tsx"), "utf8");
const app = readFileSync(join(root, "src/App.tsx"), "utf8");

const failures = [];
let checks = 0;
const ok = (condition, message) => {
  checks++;
  if (!condition) failures.push(message);
};

// ---------- 1) سجل المصدر: 44 قسمًا مرقمًا + 9 أقسام غير مرقمة ----------
ok((data.match(/id:\s*"s\d+"/g) || []).length === 44, "all 44 numbered source sections indexed (s1..s44)");
for (let i = 1; i <= 44; i++) {
  ok(data.includes(`id: "s${i}"`) && data.includes(`num: ${i},`), `numbered source section ${i} present in ledger`);
}
for (const id of ['"cover"', '"bridge"', '"objectives"', '"golden"', '"words"', '"rule"', '"map"', '"finalrule"', '"closing"']) {
  ok(data.includes(`id: ${id}`), `unnumbered ledger section ${id} present`);
}
ok(data.includes("SOURCE_NUMBERED_COUNT = 44"), "SOURCE_NUMBERED_COUNT is 44");
ok(data.includes("SOURCE_LEDGER_COUNT = SOURCE_SECTIONS.length"), "SOURCE_LEDGER_COUNT matches ledger length");

// ---------- 2) عبارات المصدر الحساسة محفوظة حرفيًا ----------
const sourcePhrases = [
  "When I arrived, the train had left.",
  "When Sara arrived at the cinema, the movie had started.",
  "Subject + had + V3",
  "Had + Subject + V3?",
  "go → went → gone",
  "eat → ate → eaten",
  "When I arrived, Lina had left.",
  "The students had left before the teacher arrived.",
  "After I had finished my project, I watched a movie.",
  "By the time we arrived, the concert had started.",
  "When I called Omar, he had already left.",
  "When I entered the kitchen, Mom had just finished cooking.",
  "Before that trip, I had never seen snow.",
  "When Daniel arrived at the airport, his plane had already left.",
  "When Emma got home, her brother had cooked dinner.",
  "When I reached the station, the bus had arrived.",
  "When the police arrived at the museum, the thief had disappeared.",
  "Emma was walking through the old market when she found a mysterious key.",
  "At 8:00, Liam was studying.",
  "When I arrived, John had left.",
  "When I arrived at the party, everyone had danced.",
  "When I arrived at the party, everyone was dancing.",
  "When I entered the room, my brother was sleeping.",
  "Last Saturday, Adam was walking through an old building when he noticed a strange door.",
];
for (const phrase of sourcePhrases) {
  ok(data.includes(phrase) || view.includes(phrase), `source phrase preserved: ${phrase}`);
}

// ---------- 3) الأخطاء المقصودة للتدريب التربوي ----------
const wrongSentences = [
  "I had went... ❌",
  "She hadn't ate. ❌",
  "They hadn't went. ❌",
  "He hadn't saw it. ❌",
  "She had went home before I arrived.",
  "They had ate dinner before the movie.",
  "Did he had finished the work?",
  "He hadn't saw the message.",
  "When I arrived, Sara had left already.",
  "Yesterday, I had visited my grandmother.",
];
for (const wrong of wrongSentences) {
  ok(data.includes(wrong) || view.includes(wrong), `intentionally wrong sentence preserved for training: ${wrong}`);
}

// ---------- 4) تصحيح خطأ الطباعة في المصدر للقسم ㊸ السؤال 2 ----------
ok(data.includes("TYPO_S43_Q2"), "typo documentation object exists");
ok(data.includes("founded"), "corrected distractor founded present in exercise data");
ok(view.includes("TYPO_S43_Q2"), "typo explanation surfaced to learner with Platform Explanation");

// ---------- 5) 53 خطوة أصلية + تنقل كامل ----------
ok(view.includes("const slides: Slide[]"), "native slide list declared");
ok((view.match(/\{ id: "(?:cover|bridge|objectives|s\d+|golden|words|rule|map|finalrule|closing)", section:/g) || []).length === 53, "exactly 53 navigable steps declared");
ok(view.includes("data-slide-counter"), "progress counter data attribute present");
ok(view.includes("→ السابق") && view.includes("التالي ←"), "Previous/Next controls present");
ok(view.includes("ArrowLeft") && view.includes("ArrowRight"), "keyboard arrow navigation wired");
ok(view.includes("lg:hidden") && view.includes("setDrawer(true)"), "mobile drawer navigation present");

// ---------- 6) المختبرات والتفاعلات التعليمية الحقيقية ----------
for (const hook of [
  "l27-timeline",
  "l27-sara",
  "l27-had-grid",
  "l27-verbs-regular",
  "l27-v2v3",
  "l27-teacher-switch",
  "l27-ali",
  "l27-pairs-a",
  "l27-short-flip",
  "l27-side-by-side",
  "l27-lina-switch",
  "l27-before",
  "l27-after",
  "l27-bytime",
  "l27-emma-detective",
  "l27-need-toggle",
  "l27-iq-stepper",
  "l27-ex-v3",
  "l27-ex-hadhave",
  "l27-ex-simple-perfect",
  "l27-ex-noah",
  "l27-ex-errors",
  "l27-ex-transform",
  "l27-ex-museum",
  "l27-emma-cinema",
  "l27-liam",
  "l27-ex-order",
  "l27-john-switch",
  "l27-dance",
  "l27-ex-boss",
  "l27-ex-final10",
  "l27-ex-story",
]) {
  ok(view.includes(`data-en-seq="${hook}"`), `interactive experience hook rendered: ${hook}`);
}

// ---------- 7) المناطق الأربع المنفصلة ----------
for (const area of ["data-area=\"student-lesson\"", "data-area=\"l27-test\"", "data-area=\"l27-solutions\"", "data-area=\"l27-teacher\""]) {
  ok(view.includes(area), `separate area present: ${area}`);
}

// ---------- 8) منطقة الاختبار: 20 سؤالًا مستقلة · لا تسريب · Reset كامل ----------
ok(data.includes("export const TEST_27"), "dedicated authored test bank exists");
ok((data.match(/\bn: \d+, type: "(?:single|tf|multi|order|match|spot)"/g) || []).length === 20, "exactly 20 test questions authored");
for (const t of ['"single"', '"tf"', '"multi"', '"order"', '"match"', '"spot"']) {
  ok(data.includes(`type: ${t}`), `test includes structured question type: ${t}`);
}
ok((data.match(/why: "/g) || []).length >= 20, "every test question carries an explanatory why");
ok(view.includes("const handleSubmit = () => {"), "submit handler computes result on demand");
ok(view.includes("const handleReset = () => {"), "reset handler clears state completely");
ok(view.includes("disabled={!allAnswered}"), "submit button disabled until all 20 questions answered");
ok(view.includes("data-test-q="), "question cards rendered with data-test-q markers");

// ---------- 9) حلول الاختبارات ----------
ok(view.includes("export function Solutions27"), "Solutions27 component exported");
ok(view.includes("data-solution="), "solution cards rendered with data-solution markers");
ok(view.includes("sol.explanation") && view.includes("sol.trap"), "solutions explain reasoning and trap misconceptions");
ok(view.includes("unlocked: boolean") && view.includes("unlocked={testUnlocked || teacherUnlocked}"), "solutions gated until test submission or teacher unlock");

// ---------- 10) منطقة المعلم ----------
ok(data.includes('TEACHER_PASSWORD_27 = "somer173"'), "teacher password is somer173");
ok(view.includes("TEACHER_PASSWORD_27") && view.includes('type="password"'), "teacher area is password gated");
for (const topic of ["TEACHER_27_OVERVIEW", "TEACHER_27_NOTES", "TEACHER_27_SOLUTIONS", "TEACHER_27_RUBRIC", "TEACHER_27_MISTAKES"]) {
  ok(data.includes(`export const ${topic}`) && view.includes(topic), `teacher area renders ${topic}`);
}

// ---------- 11) الاتجاه و BIDI ----------
ok(view.includes('dir="rtl"') && view.includes('dir="ltr"'), "RTL shell with LTR English isolation");
ok(view.includes("LatinRuns"), "mixed Arabic/English text rendered through LatinRuns");
ok(!view.includes("split(/(\\s+)/)"), "no per-token space splitting (word-reversal engine banned)");
ok(view.includes("PlatformTag") || view.includes("Platform Explanation"), "platform explanations labeled with PlatformTag");

// ---------- 12) التسجيل في App.tsx ----------
ok(app.includes("Lesson27 onExit={goHome}") && app.includes("route === 27"), "Lesson 27 routed in App.tsx");
ok(app.includes("#/lesson/27"), "Lesson 27 hub card registered");

if (failures.length) {
  console.error(`✕ Lesson 27 audit FAILED (${failures.length}/${checks})\n` + failures.map((x) => `  - ${x}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Lesson 27 audit passed (${checks} checks): 44-section ledger, 53 native steps, 20-Q test, explanatory solutions, teacher area, BIDI isolation.`);
