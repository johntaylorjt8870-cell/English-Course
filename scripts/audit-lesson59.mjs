// ============================================================
// Lesson 59 — تدقيق المحتوى والقواعد والتغطية (ثابت)
//
// يتحقق من:
//   1) تسجيل الدرس في الراوتر والفهرس والتنقل من الدرس 58.
//   2) تغطية المصدر: 11 قسمًا · 33 موضوعًا · 9 تدريبات · 25 سؤالًا.
//   3) وجود كل جملة/ترجمة/قاعدة محورية بنصّها (لا عناوين فقط).
//   4) الحلول: كل بند له إجابة وسبب، وأعداد المجموعات 10/10/8/8/5/8/6/10/5.
//   5) مفتاح الاختبار الأصلي: 25 إجابة مع تفسير، و5 مجموعات مطابقة للمصدر.
//   6) FinalQuiz المشترك: 15 سؤالًا، مغطاة للمفاهيم، ولا كشف قبل التصحيح
//      (منطق isCorrect/grading في المكوّن المشترك)، و10 أسئلة أصلية إضافية
//      معروضة في محطة المراجعة (لا سؤال مفقود).
//   7) التدقيق اللغوي: be/have been، مطابقة have/has، V3 الشاذة، ونفي/سؤال.
//   8) لا تسريب نصوص مصدرية للمتعلم (عناوين «المصدر/القسم رقم»).
//
//   node scripts/audit-lesson59.mjs
// ============================================================
import assert from "node:assert/strict";
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

const content = await load("src/lessons/lesson59/content59.ts");
const practice = await load("src/lessons/lesson59/practice59.ts");
const test = await load("src/lessons/lesson59/test59.ts");
const lessonSrc = readFileSync("src/lessons/lesson59/Lesson59.tsx", "utf8");
const labsSrc = readFileSync("src/lessons/lesson59/labs59.tsx", "utf8");
const app = readFileSync("src/App.tsx", "utf8");
const finalTestSrc = readFileSync("src/shared/finalTest.tsx", "utf8");
const css = readFileSync("src/lessons/lesson59/lesson59.css", "utf8");

/* ---------- 1) التكامل مع التطبيق ---------- */
ok(/import Lesson59 from "\.\/lessons\/lesson59\/Lesson59"/.test(app), "App imports Lesson 59");
ok(/route === 59\) page = <Lesson59 onExit=\{goHome\}/.test(app), "App routes #/lesson/59 to Lesson59");
ok(/href: "#\/lesson\/59"/.test(app), "course hub has a card pointing at #/lesson/59");
ok(/n: 59,/.test(app), "hub card carries lesson number 59");
ok(!/#\/lesson\/60/.test(app), "hub/router do not invent a lesson 60 route");
ok(/href="#\/lesson\/58"/.test(lessonSrc) && /location\.hash = "\/lesson\/58"/.test(lessonSrc), "lesson 59 links back to lesson 58");
// لا يُسمح برابط إلى درس غير مسجّل: الدرس 59 هو آخر درس في الفهرس الآن.
ok(!/lesson\/60/.test(lessonSrc), "lesson 59 never links to a lesson 60 that does not exist");
ok(/l59-endnote/.test(lessonSrc) && /آخر درس مسجّل/.test(lessonSrc), "lesson 59 states plainly that it is the last registered lesson");
ok(!/href="#\/lesson\/(?!58|57)/.test(lessonSrc), "no forward link to an unregistered lesson anywhere in the lesson");
ok(/<FinalTest lesson=\{59\} questions=\{TEST_59\}/.test(lessonSrc), "shared FinalTest is mounted for lesson 59");
ok(!/quizBank/.test(lessonSrc), "no second quiz system was introduced");
ok(/navId: slide\.id/.test(lessonSrc), "each step is addressable in the shell rail");

/* ---------- 2) غلاف الدرس والمحطات ---------- */
const literalStepIds = [...lessonSrc.matchAll(/\{ id: "([a-z0-9-]+)", station:/g)].map((m) => m[1]);
const generatedPractice = /id: `p\$\{i \+ 1\}`/.test(lessonSrc) ? practice.PRACTICES_59.length : 0;
const stepIds = [...literalStepIds, ...practice.PRACTICES_59.map((_, i) => `p${i + 1}`)];
ok(literalStepIds.length + generatedPractice >= 50, `substantial step count (${literalStepIds.length + generatedPractice})`);
ok(new Set(stepIds).size === stepIds.length, "step ids are unique");
for (const required of ["cover", "s1", "final-test", "teacher", "progress", "explorer", "builder", "timeline", "detective", "engine", "causative", "errors", "contrast", "drill", "v3"]) {
  ok(stepIds.includes(required), `step "${required}" exists`);
}
for (let i = 1; i <= 9; i += 1) ok(stepIds.includes(`p${i}`), `practice step p${i} exists`);
ok(lessonSrc.includes("LESSON_59_SOURCE_SECTION_COUNT = 11"), "declares 11 source sections");
ok(lessonSrc.includes("LESSON_59_SOURCE_TOPIC_COUNT = 33"), "declares 33 numbered source topics");

/* ---------- 3) تغطية المصدر ---------- */
ok(content.OPENING59.modals.length === 8, "opening lists all eight modals");
ok(content.OPENING59.advanced.length === 5, "opening lists the five advanced structures");
ok(content.BASIC_RULE_59.formula === "Modal Verb + be + V3", "basic rule formula retained exactly");
ok(content.BASIC_RULE_59.correct.length === 6 && content.BASIC_RULE_59.wrong.length === 3, "all six correct and three wrong forms retained");
ok(content.BASIC_RULE_59.pairs.length === 4, "four opening active/passive pairs retained");
ok(content.MODAL_LESSONS_59.length === 5, "sections 2–6 (CAN/COULD/MUST/SHOULD/MAY-MIGHT) present");
ok(content.MODAL_LESSONS_59.map((m) => m.n).join(",") === "2,3,4,5,6", "topics 2–6 keep their source numbering");
const canLesson = content.MODAL_LESSONS_59[0];
ok(canLesson.usages.length === 3, "CAN keeps its three uses (ability/possibility/permission)");
ok(canLesson.pairs.length === 2, "CAN active/passive pairs retained");
ok(canLesson.negative.examples.length === 2 && canLesson.question.examples.length === 2, "CAN negative and question examples retained");
ok(content.MODAL_LESSONS_59[1].compare.rows.length === 2, "CAN vs COULD comparison retained");
ok(content.MODAL_LESSONS_59[2].pairs.length === 4, "MUST keeps four passive models");
ok(content.MODAL_LESSONS_59[2].warning.includes("must not be opened"), "must/mustn't contrast retained");
ok(content.MODAL_LESSONS_59[3].pairs.length === 4, "SHOULD keeps four passive models");
ok(content.MODAL_LESSONS_59[4].usages.length === 2, "MAY and MIGHT examples both retained");
ok(content.MODAL_LESSONS_59[4].compare.note.length > 40, "MAY vs MIGHT nuance retained");
ok(content.OBLIGATION_59.length === 2, "HAVE TO and OUGHT TO present");
ok(content.OBLIGATION_59[0].agreement.rows.length === 2, "have/has selection rule retained");
ok(content.OBLIGATION_59[0].negative.note.includes("عدم الضرورة"), "don't have to ≠ prohibition retained");
ok(JSON.stringify(content.OBLIGATION_59[1].question).includes("Ought the problem to be discussed"), "ought-to question formality note retained");
ok(content.PERFECT_RULE_59.formula === "Modal + have been + V3", "modal perfect formula retained");
ok(content.PERFECT_LESSONS_59.length === 4, "topics 10–13 present");
ok(content.PERFECT_LESSONS_59.every((item) => item.negative.examples.length >= 1), "every perfect lesson has a negative example");
ok(content.PERFECT_LESSONS_59[0].pairs.length === 4, "SHOULD HAVE BEEN keeps four pairs");
ok(content.PERFECT_LESSONS_59[1].pairs.length === 4, "COULD HAVE BEEN keeps four pairs");
ok(content.PERFECT_LESSONS_59[2].lines.length === 4, "MUST HAVE BEEN keeps four deduction examples");
ok(content.PERFECT_LESSONS_59[2].contrast.rows.length === 2, "must be vs must have been contrast retained");
ok(content.PERFECT_LESSONS_59[2].negative.note.includes("can't have been"), "can't have been natural negative retained");
ok(content.PERFECT_LESSONS_59[3].lines.length === 4, "MAY/MIGHT HAVE BEEN keeps four examples");
ok(content.ADVANCED_59.length === 3, "NEEDS / SUPPOSED / EXPECTED present");
ok(content.ADVANCED_59[0].contrast.rows.length === 2, "needs to be vs needs repairing retained");
ok(content.ADVANCED_59[1].lines.length === 4 && content.ADVANCED_59[2].lines.length === 4, "supposed/expected examples retained");
ok(content.CAUSATIVE_59.lines.length === 5 && content.CAUSATIVE_59.extra.length === 3, "causative models and extra examples retained");
ok(content.CAUSATIVE_59.contrast.rows.length === 2, "causative vs plain passive retained");
ok(content.RULE_TABLE_59.length === 15, "master rule table keeps all fifteen rows");
ok(content.REPORT_LADDER_59.length === 7, "The report ladder keeps seven contrasts");
ok(content.TRANSFORM_STEPS_59.length === 8, "eight transformation steps retained");
ok(content.TRANSFORM_DEMOS_59.length === 3, "CAN / SHOULD HAVE / MUST HAVE demos retained");
ok(content.ERRORS_59.length === 7 && content.ERRORS_59.map((e) => e.n).join(",") === "21,22,23,24,25,26,27", "seven common mistakes with source numbering");
ok(content.DIALOGUE_59.length === 9, "office dialogue keeps all nine turns");
ok(content.DIALOGUE_QA_59.length === 7, "dialogue comprehension keeps seven questions");
ok(content.READING_59.paragraphs.length === 5 && content.READING_59.translation.length === 5, "reading has five paragraphs in English and Arabic");
ok(content.READING_59.qa.length === 8, "reading comprehension keeps eight questions");
ok(content.WRITING_59.structures.length === 6, "writing task lists the six required structures");
ok(content.WRITING_59.model.length === 10 && content.WRITING_59.modelAr.length === 10, "writing model and translation retained");
ok(content.SPEAKING_59.lines.length === 7, "speaking task keeps seven sentences");
ok(content.SUMMARY_59.present.length === 8 && content.SUMMARY_59.past.length === 5 && content.SUMMARY_59.advanced.length === 4, "final summary keeps 8/5/4 structures");
ok(content.SUMMARY_59.differences.length === 8, "summary keeps the eight meaning differences");
ok(content.SUMMARY_59.golden.present === "Modal + be + V3" && content.SUMMARY_59.golden.past === "Modal + have been + V3", "golden rule retained");
ok(content.V3_LEDGER_59.length >= 25, "V3 ledger is complete enough to audit");

/* ---------- 4) التدريبات والحلول ---------- */
ok(practice.PRACTICES_59.length === 9, "nine practice groups");
ok(
  practice.PRACTICES_59.map((g) => g.items.length).join(",") === "10,10,8,8,5,8,6,10,5",
  `practice item counts match the source (${practice.PRACTICES_59.map((g) => g.items.length).join(",")})`
);
ok(practice.PRACTICE_TOTALS_59 === 70, `70 practice prompts in total (${practice.PRACTICE_TOTALS_59})`);
for (const group of practice.PRACTICES_59) {
  ok(group.items.every((item) => item.answer && item.answer.trim().length > 0), `${group.id}: every item has an answer`);
  ok(group.items.every((item) => item.why && item.why.trim().length > 10), `${group.id}: every item has an explanation`);
  ok(group.items.every((item) => !item.options || item.options.includes(item.answer)), `${group.id}: choice answers exist in their option lists`);
}
ok(practice.PRACTICES_59[4].items.every((item) => item.options && item.options.length === 3), "meaning exercise keeps three Arabic options per item");
ok(practice.PRACTICES_59[8].items.every((item) => item.options && item.options.length === 3), "dialogue completion keeps three options per gap");
ok(practice.PRACTICES_59[6].items[0].answer === "The work must not be left unfinished.", "negation exercise keeps the source's first model answer");

/* ---------- 5) الاختبار الأصلي ---------- */
ok(practice.ORIGINAL_TEST_59.length === 25, "original test keeps 25 questions");
const sections = practice.ORIGINAL_TEST_59.reduce((map, q) => ((map[q.section] = (map[q.section] ?? 0) + 1), map), {});
ok(sections["اختر الإجابة الصحيحة"] === 10, "10 multiple-choice items (Q1–10)");
ok(sections["حوّل إلى Passive"] === 5, "5 active→passive items (Q11–15)");
ok(sections["حوّل إلى Active"] === 3, "3 passive→active items (Q16–18)");
ok(sections["صحّح الخطأ"] === 4, "4 error-correction items (Q19–22)");
ok(sections["الترجمة"] === 3, "3 translation items (Q23–25)");
ok(practice.ORIGINAL_TEST_59.every((q) => q.answer && q.why), "every original question has a keyed answer and explanation");
ok(practice.ORIGINAL_TEST_59.every((q, i) => q.n === i + 1), "original question numbering is 1…25 in order");
ok(practice.ORIGINAL_TEST_59[10].answer === "The environment must be protected.", "Q11 key matches the source");
ok(practice.ORIGINAL_TEST_59[23].answer === "The results are expected to be announced tomorrow.", "Q24 key matches the source");
ok(practice.ORIGINAL_TEST_59[24].answer === "The documents must have been stolen.", "Q25 key matches the source");

/* ---------- 6) الاختبار المشترك ---------- */
ok(test.TEST_59.length === 15, `shared FinalTest has 15 questions (${test.TEST_59.length})`);
ok(test.TEST_59.every((q) => q.why && q.concept), "every final-test item has why + concept");
const types = new Set(test.TEST_59.map((q) => q.type));
ok(types.size >= 4, `final test uses several question types (${[...types].join(", ")})`);
ok(test.TEST_59.some((q) => q.type === "typed"), "final test includes production (typed) items");
ok(test.TEST_59.some((q) => q.type === "match"), "final test includes a meaning-matching item");
const concepts = test.TEST_59.map((q) => q.concept).join(" | ");
for (const concept of ["Modal + be + V3", "SHOULD HAVE BEEN", "MUST HAVE BEEN", "NEEDS TO BE", "BE EXPECTED TO BE", "HAVE TO", "DON'T HAVE TO", "HAVE / GET SOMETHING DONE", "OUGHT TO", "BE SUPPOSED TO BE"]) {
  ok(concepts.includes(concept), `final test covers: ${concept}`);
}
ok(finalTestSrc.includes("const [corrected, setCorrected] = useState(false)"), "shared engine keeps a single correction flag");
ok(finalTestSrc.includes("data-ft-verdict={correct ? \"correct\" : \"wrong\"}"), "verdict markup is rendered only in the corrected block");
ok(/corrected && \(/.test(finalTestSrc), "verdict block is gated behind correction");
ok(lessonSrc.includes("data-l59-final-test") && lessonSrc.includes("hidden={slide.id !== \"final-test\"}"), "final test stays mounted but hidden outside its step (state preserved)");

/* ---------- 7) 10 أسئلة أصلية إضافية ---------- */
const extraBlock = lessonSrc.slice(lessonSrc.indexOf("function OriginalExtraChallenge"));
const extraIds = [...extraBlock.slice(0, 400).matchAll(/\d+/g)].map((m) => Number(m[0]));
ok(lessonSrc.includes("const extra = [1, 2, 3, 6, 7, 9, 10, 12, 20, 22];"), "ten remaining original questions are surfaced in review");
ok(extraIds.length >= 10, "extra review lists at least ten question numbers");
ok(/ORIGINAL_TEST_59\.filter\(\(q\) => extra\.includes\(q\.n\)\)/.test(lessonSrc), "extra review reuses the original bank (no duplication)");

/* ---------- 8) التدقيق اللغوي ---------- */
const allText = [JSON.stringify(content), JSON.stringify(practice), JSON.stringify(test)].join("\n");
for (const must of [
  "can be done",
  "must be completed",
  "should be checked",
  "may be used",
  "might be needed",
  "could be repaired",
  "should have been repaired",
  "could have been prevented",
  "must have been stolen",
  "may have been cancelled",
  "needs to be repaired",
  "is supposed to be submitted",
  "is expected to be announced",
  "had my car repaired",
]) {
  ok(allText.includes(must), `exact source structure present: ${must}`);
}
for (const v3 of ["stolen", "broken", "worn", "sent", "signed", "written", "built", "made", "cut"]) {
  ok(allText.includes(v3), `V3 form present: ${v3}`);
}
ok(content.OBLIGATION_59[0].pairs[1].why.includes("machine مفرد"), "have/has agreement is explained against the NEW subject");
ok(test.TEST_59.filter((q) => JSON.stringify(q).includes("must have been")).length >= 1, "must be vs must have been is tested");
ok(test.TEST_59.filter((q) => JSON.stringify(q).includes("doesn't have to")).length >= 1, "don't have to vs mustn't is tested");
ok(!/must has been/.test(allText.replace(/must has been checked/g, "")), "no bare 'must has been' outside the audited error example");
const answerText = [
  ...practice.PRACTICES_59.flatMap((g) => g.items.map((i) => `${i.answer} ${i.why}`)),
  ...practice.ORIGINAL_TEST_59.map((q) => `${q.answer} ${q.why}`),
  ...test.TEST_59.flatMap((q) => [q.why, JSON.stringify(q.accept ?? []), JSON.stringify(q.options ?? [])]),
].join("\n");
ok(!/should have completed\b/.test(answerText), "no un-passivised 'should have completed' as a correct answer");
ok(!/\bcan is\b/.test(answerText), "no 'can is' as a correct answer");
// be/have been agreement inside source answers
const passiveAnswers = [
  ...practice.PRACTICES_59.flatMap((g) => g.items.map((i) => i.answer)),
  ...practice.ORIGINAL_TEST_59.map((q) => q.answer),
];
ok(passiveAnswers.every((a) => !/\b(has|have) be (?!en)/.test(a)), "no 'has be' / 'have be' in answers");
ok(passiveAnswers.every((a) => !/\bmust\s+(?!not\b|be\b|have\b)[a-z]+ed\b/.test(a) || a.includes("must be")), "no must + V3 without be in answers");

/* ---------- 9) الواجهة تعرض المحتوى فعليًا ---------- */
ok(/MODAL_LESSONS_59\.map/.test(lessonSrc) === false && /MODAL_LESSONS_59\[0\]/.test(lessonSrc), "each modal section is mounted explicitly");
ok(/PRACTICES_59\[index\]/.test(lessonSrc), "practice groups are rendered from the bank");
ok(/PracticeSet59 group=\{group\}/.test(lessonSrc), "practice renderer is wired");
ok(/DIALOGUE_59\.map/.test(lessonSrc) && /DIALOGUE_QA_59\.map/.test(lessonSrc), "dialogue and its questions render");
ok(/READING_59\.paragraphs\.map/.test(lessonSrc) && /READING_59\.translation\.map/.test(lessonSrc) && /READING_59\.qa\.map/.test(lessonSrc), "reading, translation and questions render");
ok(/RULE_TABLE_59\.map/.test(lessonSrc), "master table renders");
ok(/REPORT_LADDER_59\.map/.test(lessonSrc), "report ladder renders");
ok(/TRANSFORM_STEPS_59\.map/.test(lessonSrc) && /TRANSFORM_DEMOS_59\.map/.test(lessonSrc), "transformation steps and demos render");
ok(/ERRORS_59\.map/.test(lessonSrc) && /ERRORS_59\.map/.test(labsSrc), "mistakes render in the lesson and in the lab");
ok(/WRITING_59\.model\.map/.test(lessonSrc) && /WRITING_59\.modelAr\.map/.test(lessonSrc), "writing model and translation render");
ok(/SPEAKING_59\.lines\.map/.test(lessonSrc), "speaking sentences render");
ok(/SUMMARY_59\.present\.map/.test(lessonSrc) && /SUMMARY_59\.differences\.map/.test(lessonSrc), "summary sections render");
ok(/ORIGINAL_TEST_59\.map/.test(lessonSrc), "original test renders to the student interface");
ok(/ORIGINAL_TEST_59\.map/.test(readFileSync("src/lessons/lesson59/TeacherArea59.tsx", "utf8")), "teacher area exposes the original key");
ok(/data-teacher-area="59"/.test(readFileSync("src/lessons/lesson59/TeacherArea59.tsx", "utf8")), "teacher area is addressable for audits");
ok(/somer173/.test(readFileSync("src/lessons/lesson59/TeacherArea59.tsx", "utf8")), "teacher gate uses the platform password");
ok(/TEACHER_PASSWORD_59/.test(readFileSync("src/lessons/lesson59/TeacherArea59.tsx", "utf8")), "teacher password is a named constant");

/* ---------- 10) لا تسريب نصوص مصدرية للمتعلم ---------- */
const studentCopy = lessonSrc.replace(/teacher[\s\S]*?<\/Lesson1Shell>/, "");
ok(!/القسم\s*[0-9٠-٩]+\s*:/.test(studentCopy), "student copy does not use numbered 'القسم N:' labels");
ok(!/§\s*\d/.test(studentCopy), "student copy has no section symbols");
ok(!/source-ledger|ledger/.test(studentCopy), "student copy exposes no ledger wording");

/* ---------- 11) RTL/LTR + accessible interactions ---------- */
ok(/dir="ltr"/.test(readFileSync("src/lessons/lesson59/kit59.tsx", "utf8")), "English is isolated LTR");
ok(/unicode-bidi: plaintext/.test(css), "mixed Arabic/English headings use plaintext bidi");
ok(/aria-pressed=/.test(readFileSync("src/lessons/lesson59/kit59.tsx", "utf8")), "options expose aria-pressed state");
ok(/aria-label/.test(labsSrc), "labs label their control groups");
ok(/:focus-visible/.test(css), "focus-visible styling is defined");
ok(/prefers-reduced-motion/.test(css), "reduced-motion support is defined");
ok(/dir=\{choiceDir\(options\)\}/.test(readFileSync("src/lessons/lesson59/kit59.tsx", "utf8")), "choice rows follow the script of their options");

console.log(
  `\nLesson 59 audit: ${checks - failures.length}/${checks} checks passed · ` +
    `${practice.PRACTICES_59.length} practice groups/${practice.PRACTICE_TOTALS_59} items · ` +
    `${practice.ORIGINAL_TEST_59.length} original questions · ${test.TEST_59.length} shared-test questions · ${stepIds.length} steps.`,
);
if (failures.length) {
  console.error(`\n${failures.length} failure(s):\n${failures.map((f) => `- ${f}`).join("\n")}`);
  process.exitCode = 1;
}
