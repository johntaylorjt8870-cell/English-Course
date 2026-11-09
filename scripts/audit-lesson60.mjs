// ============================================================
// Lesson 60 — تدقيق المحتوى والقواعد والتغطية (ثابت)
//
// يتحقق من:
//   1) تسجيل الدرس في الراوتر والفهرس، والتنقل من الدرس 59، وعدم وجود 61.
//   2) تغطية المصدر: 17 قسمًا · 39 موضوعًا · 8 تدريبات (59 بندًا) · اختبار 25 سؤالًا.
//   3) الجداول الأربعة (Backshift 12 · الضمائر 8 · الزمان 13 · المكان 5 · الناقصة 10).
//   4) الاستثناءات الثلاثة بنصوصها، وتنبيه must (التزام ↔ استنتاج).
//   5) الحلول: كل بند له إجابة وسبب؛ مفتاح الاختبار الأصلي 1–25 مطابق للأسئلة.
//   6) FinalTest المشترك: 15 سؤالًا بأنواع متنوعة بلا كشف مسبق (التصحيح في المكوّن المشترك).
//   7) الهوية البصرية الجديدة لدرس 60 (لا تلوين درس 59) + الوصولية في CSS.
//   8) لا تسريب نصوص مصدرية للمتعلم ولا عبارات محظورة.
//
//   node scripts/audit-lesson60.mjs
// ============================================================
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
  if (!cond) console.log(`✗ ${msg}`);
};

async function load(path) {
  const src = readFileSync(path, "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}

const content = await load("src/lessons/lesson60/content60.ts");
const practice = await load("src/lessons/lesson60/practice60.ts");
const test = await load("src/lessons/lesson60/test60.ts");
const lessonSrc = readFileSync("src/lessons/lesson60/Lesson60.tsx", "utf8");
const labsSrc = readFileSync("src/lessons/lesson60/labs60.tsx", "utf8");
const teacherSrc = readFileSync("src/lessons/lesson60/TeacherArea60.tsx", "utf8");
const lesson59Src = readFileSync("src/lessons/lesson59/Lesson59.tsx", "utf8");
const app = readFileSync("src/App.tsx", "utf8");
const css = readFileSync("src/lessons/lesson60/lesson60.css", "utf8");

/* ---------- 1) التكامل مع التطبيق ---------- */
ok(/import Lesson60 from "\.\/lessons\/lesson60\/Lesson60"/.test(app), "App imports Lesson 60");
ok(/route === 60\) page = <Lesson60 onExit=\{goHome\}/.test(app), "App routes #/lesson/60 to Lesson60");
ok(/href: "#\/lesson\/60"/.test(app), "course hub has a card pointing at #/lesson/60");
ok(/n: 60,/.test(app), "hub card carries lesson number 60");
ok(app.indexOf('href: "#/lesson/59"') < app.indexOf('href: "#/lesson/60"'), "lesson 60 card comes right after lesson 59 in the hub");
ok(/import Lesson59[^\n]*\nimport Lesson60/.test(app), "Lesson60 import follows Lesson59 import");
ok(!/#\/lesson\/61/.test(app), "hub/router never invent a lesson 61 route");
ok(/href="#\/lesson\/59"/.test(lessonSrc) && /location\.hash = "\/lesson\/59"/.test(lessonSrc), "lesson 60 links back to lesson 59");
ok(!/lesson\/61/.test(lessonSrc + labsSrc + teacherSrc), "no link to a lesson 61 that does not exist anywhere in the lesson");
ok(/href="#\/lesson\/60"/.test(lesson59Src) && /location\.hash = "\/lesson\/60"/.test(lesson59Src), "lesson 59 links forward to lesson 60");
ok(/<FinalTest lesson=\{60\} questions=\{TEST_60\}/.test(lessonSrc), "shared FinalTest is mounted for lesson 60");
ok(!/quizBank/.test(lessonSrc), "no second quiz system was introduced");
ok(/navId: slide\.id/.test(lessonSrc), "each step is addressable in the shell rail");

/* ---------- 2) غلاف الدرس والمحطات ---------- */
const literalStepIds = [...lessonSrc.matchAll(/\{ id: "([a-z0-9-]+)", station:/g)].map((m) => m[1]);
const stepIds = [...literalStepIds, ...practice.PRACTICES_60.map((_, i) => `p${i + 1}`)];
ok(literalStepIds.length + 8 >= 45, `substantial step count (${literalStepIds.length + 8})`);
ok(new Set(stepIds).size === stepIds.length, "step ids are unique");
for (const required of [
  "cover", "s1", "s2", "s3", "s4", "s5", "s12", "s13", "s14", "s15", "s16", "s17", "s18", "s19", "s20",
  "s21", "s22", "s23", "s24", "s25", "final-test", "s27", "s28", "s29", "s30",
  "explorer", "studio", "timeline", "saidtold", "pronouns", "timeshift", "detector", "detective", "challenges",
  "teacher", "progress",
]) {
  ok(stepIds.includes(required), `step "${required}" exists`);
}
for (let i = 1; i <= 8; i += 1) ok(stepIds.includes(`p${i}`), `practice step p${i} exists`);
ok(lessonSrc.includes("LESSON_60_SOURCE_SECTION_COUNT = 17"), "declares 17 source sections");
ok(lessonSrc.includes("LESSON_60_SOURCE_TOPIC_COUNT = 39"), "declares 39 numbered source topics");
ok(/data-l60-cover/.test(lessonSrc), "cover carries the studio data hook");

/* ---------- 3) الافتتاحية والأساس ---------- */
ok(content.OPENING60.goals.length === 7, "opening keeps the seven goals");
ok(content.DIRECT_60.examples.length === 3, "Direct Speech keeps its three quoted examples");
ok(content.DIRECT_60.examples.every((e) => e.en.includes('"')), "every Direct example keeps its quotation marks");
ok(content.DIRECT_60.quoteRule.includes('"'), "quotation-mark rule retained");
ok(content.REPORTED_60.pairs.length === 3, "three direct/reported pairs retained");
ok(content.REPORTED_60.pairs[0].changes?.some((c) => c.kind === "pronoun" && c.from === "I" && c.to === "he"), "first pair records the I→he pronoun shift");
ok(content.REPORTED_60.pairs.every((p) => p.changes?.some((c) => c.kind === "tense")), "every pair records a tense shift");
ok(content.REPORTED_60.compare.length === 3, "three quick-compare rows retained");
ok(content.REPORTED_60.arabicNote.includes("الترجمة العربية"), "Arabic-translation caution retained");

/* ---------- 4) said / told ---------- */
ok(content.SAID_60.examples.length === 4, "SAID keeps four examples");
ok(content.SAID_60.thatNote.both.length === 2 && content.SAID_60.thatNote.both[1] === "Ali said he was busy.", "that-omission pair retained verbatim");
ok(content.TOLD_60.examples.length === 4, "TOLD keeps four examples");
ok(
  content.TOLD_60.examples.every((p) => p.reported.includes("told ") && !/\btold that\b/.test(p.reported)),
  "every TOLD example names a person directly after told",
);
ok(content.SAID_60.examples.every((p) => !/said me\b/.test(p.reported)), "no SAID example ever shows the banned 'said me' form");
ok(content.TOLD_60.contrast.wrong1 === "He said me that he was tired." && content.TOLD_60.contrast.wrong2 === "He told that he was tired.", "both wrong forms retained for contrast");
ok(content.TOLD_60.compareRows.length === 3, "said / said to / told comparison rows retained");
ok(content.TOLD_60.memory.length === 2 && content.TOLD_60.memory[1].includes("الشخص"), "memory trick retained");

/* ---------- 5) Backshift ---------- */
ok(content.TENSE_LESSONS_60.length === 6, "six tense-conversion lessons present");
ok(content.TENSE_LESSONS_60.map((m) => m.n).join(",") === "6,7,8,9,10,11", "topics 6–11 keep their source numbering");
ok(content.TENSE_LESSONS_60[0].ruleFrom.includes("am / is → was"), "Present Simple rule shorthand retained");
ok(content.TENSE_LESSONS_60[5].examples.some((p) => p.reported.includes("would")), "will→would examples present");
ok(content.BACKSHIFT_TABLE_60.rows.length === 12, "comprehensive table keeps all twelve rows");
const staysPP = content.BACKSHIFT_TABLE_60.rows.find((r) => r.from === "Past Perfect");
ok(staysPP && staysPP.to === "Past Perfect" && staysPP.note === "يبقى كما هو", "Past Perfect stays as-is, with the explicit note");
const mustRow = content.BACKSHIFT_TABLE_60.rows.find((r) => r.from === "must");
ok(mustRow.to === "had to" && mustRow.note.includes("الالتزام"), "must→had to carries the obligation caveat");
ok(content.BACKSHIFT_TABLE_60.shorthand.length === 13, "thirteen shorthand pairs for memorisation");
ok(content.BACKSHIFT_TABLE_60.mustWarning.obligation.reported.includes("had to leave early"), "obligation branch: must→had to");
ok(content.BACKSHIFT_TABLE_60.mustWarning.deduction.reported.includes("she must be tired"), "deduction branch: must stays as-is");

/* ---------- 6) الضمائر والزمان والمكان والناقصة ---------- */
ok(content.PRONOUNS_60.table.length === 8, "pronoun table keeps eight rows");
const youRow = content.PRONOUNS_60.table.find((r) => r.direct === "You");
ok(youRow.reported.includes("I / he") && youRow.note === "بحسب السياق", "You row keeps its context-dependent note");
ok(content.PRONOUNS_60.warning.includes("سياق") || content.PRONOUNS_60.warning.includes("يعتمد"), "pronoun context warning retained");
ok(content.PRONOUNS_60.examples.length === 5, "five contextual pronoun examples");
ok(content.PRONOUNS_60.examples.some((p) => p.changes?.some((c) => c.from === "You" && c.to === "I")), "You→I example present");
ok(content.PRONOUNS_60.examples.some((p) => p.changes?.some((c) => c.from === "You" && c.to === "he")), "You→he example present");
ok(content.TIME_PLACE_60.timeRows.length === 13, "thirteen time rows retained");
ok(content.TIME_PLACE_60.timeRows.some((r) => r.direct === "now" && r.reported === "then"), "now→then present");
ok(content.TIME_PLACE_60.timeExamples.length === 4, "four time examples");
ok(content.TIME_PLACE_60.placeRows.length === 5, "five place/movement rows (incl. come→go and bring→take)");
ok(content.TIME_PLACE_60.placeRows.some((r) => r.direct === "come" && r.reported === "go"), "come→go movement shift present");
ok(content.TIME_PLACE_60.placeRows.some((r) => r.direct === "bring" && r.reported === "take"), "bring→take movement shift present");
ok(content.TIME_PLACE_60.placeExamples.length === 3, "three place examples");
ok(content.TIME_PLACE_60.note.includes("ليست آلية"), "time/place non-algorithmic note retained");
ok(content.MODALS_60.rows.length === 10, "ten modal rows retained");
ok(content.MODALS_60.rows.filter((r) => r.note === "تبقى كما هي").length === 5, "five invariant modals explicitly marked");
ok(content.MODALS_60.rows.some((r) => r.direct === "shall"), "shall→should/would row present");
ok(content.MODALS_60.examples.length === 5, "five modal examples");
ok(content.MODALS_60.examples.some((p) => p.changes?.some((c) => c.from === "should" && c.to === "should")), "kept-should example present");
ok(content.MODALS_60.examples.some((p) => p.changes?.some((c) => c.from === "You" && c.to === "we")), "modal example with You→we context shift present");

/* ---------- 7) الاستثناءات والخطوات والأمثلة ---------- */
ok(content.EXCEPTIONS_60.facts.examples.length === 3, "scientific facts keep three examples");
ok(content.EXCEPTIONS_60.facts.anchor.reported.includes("revolves"), "Earth revolves keeps its tense");
ok(content.EXCEPTIONS_60.stillTrue.anchor.also.includes("lived in Ankara"), "still-true alternative form shown");
ok(content.EXCEPTIONS_60.stillTrue.second.reported.includes("works at a hospital"), "second still-true example keeps present");
ok(content.EXCEPTIONS_60.presentVerb.examples.length === 2, "says examples retained");
ok(content.EXCEPTIONS_60.presentVerb.examples.every((p) => p.reported.includes("says that")), "says reporting keeps present tense");
ok(content.STEPS_60.steps.length === 8, "eight conversion steps");
ok(content.STEPS_60.worked.stages.length === 6, "worked example has six stages");
ok(content.STEPS_60.worked.result === "Ahmed told me that he was studying English there that day.", "worked result is the exact source sentence");
ok(content.STEPS_60.worked.summary.length === 5, "five change chips in the worked summary");
ok(content.SOLVED_60.length === 10, "ten solved varied examples");
ok(content.SOLVED_60.some((s) => s.tense === "حقيقة علمية"), "the tenth solved example is the scientific fact");
ok(content.ERRORS_60.length === 7 && content.ERRORS_60.map((e) => e.n).join(",") === "21,22,23,24,25,26,27", "seven common mistakes with source numbering");
ok(content.ERRORS_60.every((e) => e.wrong && e.right && e.why.length > 20), "every error has wrong + right + explanation");
ok(content.ERRORS_60.filter((e) => e.rightAlt).map((e) => e.n).join(",") === "22,27", "said/told errors keep their accepted alternatives");

/* ---------- 8) الحوار والقراءة ---------- */
ok(content.DIALOGUE_60.turns.length === 8, "dialogue keeps eight turns");
ok(content.DIALOGUE_60.reported.length === 4, "reported retell keeps four lines");
ok(content.DIALOGUE_60.reported.some((l) => l.en.includes("had to revise all the lessons")), "teacher told-line keeps must→had to in context");
ok(content.DIALOGUE_60.qa.length === 4, "dialogue comprehension keeps four questions");
ok(content.READING_60.paragraphs.length === 5 && content.READING_60.translation.length === 5, "reading keeps 5 EN + 5 AR paragraphs");
ok(content.READING_60.gloss.length === 7, "seven gloss entries");
ok(content.READING_60.qa.length === 8, "reading comprehension keeps eight questions");
ok(content.READING_60.paragraphs.some((p) => p.includes("the following week")), "reading shows reported time shift inside a real passage");

/* ---------- 9) التدريبات ---------- */
ok(practice.PRACTICES_60.length === 8, "eight practice sets retained");
ok(JSON.stringify(practice.PRACTICES_60.map((g) => g.items.length)) === JSON.stringify([10, 10, 8, 10, 5, 5, 10, 1]), "practice sizes 10·10·8·10·5·5·10·1");
ok(practice.PRACTICE_TOTALS_60 === 59, "practice totals 59 items");
ok(
  practice.PRACTICES_60.every((g) => g.items.every((i) => i.prompt && i.answer && i.why)),
  "every practice item has prompt + answer + explanation",
);
ok(practice.PRACTICES_60.every((g) => g.instruction.length > 10), "every practice set keeps its instruction");

/* ---------- 10) الاختبار الأصلي ---------- */
ok(practice.ORIGINAL_TEST_60.length === 25, "original test keeps 25 questions");
ok(practice.ORIGINAL_TEST_60.map((q) => q.n).join(",") === Array.from({ length: 25 }, (_, i) => i + 1).join(","), "original numbering runs 1–25 without gaps");
ok(practice.ORIGINAL_TEST_SECTIONS_60.length === 4, "four original sections present");
const sectionSizes = practice.ORIGINAL_TEST_SECTIONS_60.map((s) => practice.ORIGINAL_TEST_60.filter((q) => q.section === s).length);
ok(JSON.stringify(sectionSizes) === JSON.stringify([10, 5, 5, 5]), "sections split 10·5·5·5 (اختر/حوّل/صحّح/أكمل)");
ok(practice.ORIGINAL_TEST_60.every((q) => q.answer && q.why), "every original question has answer + explanation");
ok(practice.ORIGINAL_TEST_60.slice(10, 15).every((q) => q.ar), "transformation questions keep their Arabic model translation");
ok(practice.ORIGINAL_TEST_60.find((q) => q.n === 9).answer === "boils", "q9 keeps the scientific-fact answer 'boils'");
ok(practice.ORIGINAL_TEST_60.find((q) => q.n === 16).why.includes("told me"), "q16 alternative answer preserved inside the explanation");

/* ---------- 11) الاختبار النهائي المشترك ---------- */
ok(test.TEST_60.length === 15, "shared final test has exactly fifteen questions");
ok(test.TEST_60_COUNT === 15, "declared count matches the bank");
const types = test.TEST_60.reduce((acc, q) => ((acc[q.type] = (acc[q.type] || 0) + 1), acc), {});
ok(Object.keys(types).length >= 5, `question types are mixed (${Object.keys(types).join("/")})`);
for (const allowed of ["single", "error", "match", "tf", "typed", "order", "multi"]) delete types[allowed];
ok(Object.keys(types).length === 0, "every question type is supported by the shared component");
ok(test.TEST_60.every((q) => q.why && q.why.length > 10), "every final-test question carries its explanation in why");
const matchQ = test.TEST_60.find((q) => q.type === "match");
ok(matchQ && (matchQ.pairs?.length === 5), "matching item has five pairs");
const typedQ = test.TEST_60.find((q) => q.type === "typed");
ok(typedQ && (typedQ.accept || []).some((a) => a.includes("had to")), "typed item accepts had-to variants");
ok(test.TEST_60.every((q, i) => test.TEST_60.findIndex((x) => x.ar === q.ar && (x.en ?? "") === (q.en ?? "")) === i), "final-test questions are unique by stem + example");

/* ---------- 12) الهوية والوصولية ---------- */
ok(css.includes("#221a38") && css.includes("#f8f4ea") && css.includes("#c26a1b"), "new studio palette (ivory paper + deep-plum booth + amber accent)");
ok(!css.includes("#070f1d") && !css.includes("#ffc45c"), "lesson 59 identity colours were not copied");
ok(css.includes(":focus-visible"), "keyboard focus styling present");
ok(css.includes("prefers-reduced-motion"), "reduced-motion support present");
ok(!/\.l59-/.test(css), "no lesson-59 classnames leaked into the lesson-60 stylesheet");
ok(css.includes("plain") || css.includes("plaintext"), "bidi isolation present in rail/labels");
ok(lessonSrc.includes('mainId="l60-main"'), "main column carries the l60 id used by layout audits");

/* ---------- 13) المختبرات ---------- */
for (const lab of ["explorer", "studio", "timeline", "saidtold", "pronouns", "timeshift", "exceptions", "errors", "challenges"]) {
  ok(new RegExp(`id="${lab}"`).test(labsSrc), `lab "${lab}" mounts via LabShell id`);
}
ok(labsSrc.includes('data-l60-lab={id}'), "LabShell tags every lab with data-l60-lab");
ok(/تحقّق/.test(labsSrc), "labs keep check-first gating");
ok(labsSrc.includes("PracticeSet60") && labsSrc.includes("PracticeKey60"), "practice set + teacher key components present");

/* ---------- 14) فضاء المعلم ---------- */
ok(teacherSrc.includes('data-teacher-area="60"'), "teacher area is tagged for lesson 60");
ok(teacherSrc.includes('"somer173"'), "teacher gate uses the course password");
ok(teacherSrc.includes("<FinalTestAnswerKey lesson={60}"), "shared answer key mounted for lesson 60");
ok(teacherSrc.includes("ORIGINAL_TEST_60") && teacherSrc.includes("PRACTICES_60"), "teacher file keeps original-test and practice keys");

/* ---------- 15) نسخ المتعلم — عبارات محظورة ---------- */
const banned = ["نص المصدر الحرفي", "اضغط للعرض", "أظهر النص الأصلي", "SourceReveal32", "source-reveal", "show source", "view textbook text", "§"];
for (const phrase of banned) {
  ok(!lessonSrc.includes(phrase) && !labsSrc.includes(phrase), `student copy is free of “${phrase}”`);
}
ok(!/القسم \d+:/.test(lessonSrc + labsSrc), "no raw «القسم N:» source labels leak into student screens");
ok(!/lesson\/61/.test(lessonSrc), "student copy never mentions lesson 61");

console.log(`\nLesson 60 static audit: ${checks - failures.length}/${checks} passed`);
if (failures.length) {
  console.error(failures.map((f) => `- ${f}`).join("\n"));
  process.exitCode = 1;
}
