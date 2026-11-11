// Source-fidelity audit: source is the user's complete attachment, NOT the
// implementation-generated drift snapshot. Compare content within its section,
// then check source pairs, translations, individual practices and exam keys.
import { readFileSync } from "node:fs";
import ts from "typescript";
import {
  SOURCE_PATH_61, SOURCE_SHA256_61, normalizeSource61 as norm, readSource61,
  sourcePairs61, sourcePractices61, sourceExam61, sourceDialogue61, sourceReading61,
  sourceErrors61, sourceProcedures61, sourceWriting61, sourceSpeaking61, sourceSummary61, sourceDistinctions61,
  sourceBilingualTheory61, sourceWhVocabulary61, sourceSolved61,
} from "./lib/lesson61-source.mjs";

async function load(path) {
  const source = readFileSync(path, "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== "--source" || !args[1])) {
  throw new Error("Usage: node scripts/audit-lesson61-source.mjs [--source /path/to/original.md]");
}
const sourcePath = args[1] ?? SOURCE_PATH_61;
const content = await load("src/lessons/lesson61/content61.ts");
const practice = await load("src/lessons/lesson61/practice61.ts");
const source = readSource61(sourcePath);
const failures = []; let checks = 0;
function ok(condition, message) { checks++; if (!condition) failures.push(message); }
const same = (a, b) => norm(a ?? "") === norm(b ?? "");
const contains = (a, b) => Boolean(norm(b ?? "")) && norm(a ?? "").includes(norm(b));
function strings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}
function candidates(value) {
  if (Array.isArray(value)) return value.flatMap(candidates);
  if (!value || typeof value !== "object") return [];
  const result = [];
  if (typeof value.direct === "string" && typeof (value.reported ?? value.result) === "string") result.push({ ...value, reported: value.reported ?? value.result });
  if (typeof value.wrong === "string" && typeof value.right === "string") result.push({ direct: value.wrong, reported: value.right });
  return [...result, ...Object.values(value).flatMap(candidates)];
}
function bilingualCandidates(value) {
  if (Array.isArray(value)) return value.flatMap(bilingualCandidates);
  if (!value || typeof value !== "object") return [];
  const result = [];
  if (typeof value.en === "string" && typeof value.ar === "string") result.push({ en: value.en, ar: value.ar });
  if (typeof value.direct === "string" && typeof value.directAr === "string") result.push({ en: value.direct, ar: value.directAr });
  if (typeof value.reported === "string" && typeof value.ar === "string") result.push({ en: value.reported, ar: value.ar });
  // Some bilingual examples are integrated into one rendered prose block.
  if (typeof value.text === "string") result.push({ en: value.text, ar: value.text });
  return [...result, ...Object.values(value).flatMap(bilingualCandidates)];
}
const scopes = [
  content.THEORY_61.filter((scene) => scene.section === 0),
  ...Array.from({ length: 6 }, (_, i) => content.THEORY_61.filter((scene) => scene.section === i + 1)),
  content.ERRORS_61, content.PROCEDURES_61, content.SOLVED_61, content.DIALOGUE_61, content.READING_61,
  practice.PRACTICES_61, practice.ORIGINAL_TEST_61, content.WRITING_61, content.SPEAKING_61,
  [content.SUMMARY_61, content.SUMMARY_DISTINCTIONS_61],
];
ok(source.hash === SOURCE_SHA256_61, `Attachment SHA-256 is unchanged (${source.hash})`);
ok(source.sections.length === 17 && source.sections.slice(1).every((section) => section.length > 0), "Opening and all 16 ordered source sections exist");
ok(source.lines.some((line) => line.text === "- Suggestion: suggested + ing أو suggested that.") && source.lines.filter((line) => line.text).at(-1)?.text === "```", "Source was read through its final distinction and closing fence");

// Check every substantive English-only source line, with repetitions and within
// the relevant source section. Dedicated positional checks below prevent one
// repeated line elsewhere in the section from masking a missing question/key.
let englishLines = 0;
for (const [section, lines] of source.sections.entries()) {
  const available = strings(scopes[section]);
  for (const line of lines) {
    let value = line.text;
    if (!/[A-Za-z]/.test(value) || /[\u0600-\u06ff]/u.test(value) || value.length < 12) continue;
    value = value.replace(/^\d{1,2}\.\s+/, "").replace(/^[①-⑳]\s*/u, "");
    const normalized = norm(value);
    if (normalized.length < 12 || /^(direct|reported) speech/u.test(normalized)) continue;
    if (section === 0 && line.line === 7) continue; // title is composed from adjacent JSX elements
    englishLines++;
    ok(available.some((text) => contains(text, value)), `Section ${section}, source line ${line.line}: English item missing: ${value}`);
  }
}
const lessonJsx = readFileSync("src/lessons/lesson61/Lesson61.tsx", "utf8");
ok(/Reported<br\s*\/>\s*<em>Questions<\/em><br\s*\/>\s*&amp; Commands/.test(lessonJsx), "Opening English title is rendered despite the line break");
ok(lessonJsx.includes(source.lines[8].text), "Opening Arabic source title is rendered on the cover");

let translations = 0;
for (let section = 0; section <= 9; section++) {
  const lines = source.sections[section]; const available = strings(scopes[section]);
  for (let i = 0; i < lines.length; i++) if (lines[i].text === "الترجمة:") {
    const next = lines.slice(i + 1).find((line) => line.text);
    if (!next) continue;
    translations++;
    ok(available.some((text) => contains(text, next.text)), `Section ${section}, source line ${next.line}: Arabic translation missing: ${next.text}`);
  }
}
// English examples immediately followed by Arabic do not use a translation
// label in the source, so check their association separately and positionally.
const bilingual = sourceBilingualTheory61(source);
ok(bilingual.length === 28, `All 28 standalone bilingual theory examples were parsed (${bilingual.length})`);
for (const item of bilingual) {
  ok(bilingualCandidates(scopes[item.section]).some((candidate) => contains(candidate.en, item.en) && contains(candidate.ar, item.ar)),
    `Section ${item.section}, source lines ${item.line}/${item.arLine}: standalone example retains its own Arabic translation`);
}
const vocabulary = sourceWhVocabulary61(source);
ok(vocabulary.length === 12, `All 12 WH-word glosses were parsed (${vocabulary.length})`);
const whLines = content.THEORY_61.find((scene) => scene.id === "wh-intro")?.blocks.find((block) => block.type === "lines")?.items ?? [];
for (const [i, item] of vocabulary.entries()) {
  ok(Boolean(whLines[i] && same(whLines[i].en, item.en) && same(whLines[i].ar, item.ar)),
    `WH vocabulary ${i + 1}: source line ${item.line} retains the word and its own Arabic gloss in order`);
}

const pairs = sourcePairs61(source);
ok(pairs.length === 65, `All 65 source direct/reported occurrences were parsed (${pairs.length})`);
for (const pair of pairs) {
  const match = candidates(scopes[pair.section]).find((item) => same(item.direct, pair.direct) && same(item.reported, pair.reported));
  ok(Boolean(match), `Section ${pair.section}, source line ${pair.line}: direct/reported pair is associated correctly`);
  if (pair.directAr) ok(Boolean(match && contains(match.directAr, pair.directAr)), `Source line ${pair.line}: direct Arabic translation stays with its example`);
  if (pair.ar) ok(Boolean(match && contains(match.ar, pair.ar)), `Source line ${pair.line}: reported Arabic translation stays with its example`);
}

const errors = sourceErrors61(source);
ok(errors.length === 7 && content.ERRORS_61.length === 7, "Seven original error rules are individually represented");
for (const [i, item] of errors.entries()) {
  const target = content.ERRORS_61[i];
  ok(Boolean(target && same(target.wrong, item.direct.text) && same(target.right, item.reported.text) && target.why), `Error rule ${i + 1}: original incorrect/direct and corrected/reported forms are associated in order`);
  if (item.alternative) ok(same(target?.alternative, item.alternative.text), `Error rule ${i + 1}: source alternative is retained`);
  if (item.reason) ok(contains(target?.why, item.reason.text), `Error rule ${i + 1}: source explanation is retained`);
}
const procedures = sourceProcedures61(source);
ok(procedures.length === 4 && procedures.map((item) => item.steps.length).join() === "6,6,4,4", "The four source procedures retain 6, 6, 4 and 4 steps");
// Reviewed anchors must appear in BOTH the original step and the corresponding
// implementation step; this permits concise Arabic paraphrase without reducing
// a procedure to just its heading or number of steps.
const stepAnchors = [
  [["نحدد نوع السؤال", "Do", "Yes/No"], ["نستخدم asked"], ["نضيف if أو whether"], ["نحذف Do"], ["نغير الضمير", "you", "I"], ["نغير الزمن عند الحاجة", "speak", "spoke"]],
  [["نحدد أداة السؤال", "Where"], ["نستخدم asked"], ["نحتفظ", "Where"], ["نحذف ترتيب السؤال"], ["نضع الفاعل قبل الفعل"], ["نغير الزمن والضمائر حسب السياق"]],
  [["نحدد أن الجملة أمر"], ["نستخدم told"], ["نذكر الشخص الذي تلقى الأمر", "us"], ["نستخدم to", "الفعل الأساسي"]],
  [["نحدد أن الجملة نهي"], ["نستخدم told"], ["نذكر الشخص"], ["نستخدم not to", "الفعل الأساسي"]],
];
for (const [i, item] of procedures.entries()) {
  const target = content.PROCEDURES_61[i];
  ok(Boolean(target && same(target.direct, item.direct.text) && same(target.result, item.result.text) && same(target.ar, item.translation.text) && target.steps.length === item.steps.length), `Procedure ${i + 1}: direct, full step count, result and Arabic translation`);
  for (const [j, step] of item.steps.entries()) {
    const original = step.parts.map((part) => part.text).join(" ");
    ok(stepAnchors[i][j].every((anchor) => contains(original, anchor) && contains(target?.steps[j], anchor)), `Procedure ${i + 1}, step ${j + 1}: original instructional detail at source line ${step.line}`);
  }
}
const solved = sourceSolved61(source);
ok(solved.length === 8 && content.SOLVED_61.length === 8, "Eight comprehensive source examples are represented");
for (const [i, item] of solved.entries()) {
  const target = content.SOLVED_61[i];
  ok(Boolean(target && same(target.kind, item.label) && same(target.direct, item.direct) && same(target.reported, item.reported) && same(target.ar, item.ar)), `Solved example ${i + 1}: source concept label, direct, reported and Arabic at lines ${item.labelLine}/${item.line}`);
}

const dialogue = sourceDialogue61(source);
ok(dialogue.direct.length === 9 && dialogue.reported.length === 9 && dialogue.notes.length === 6, "Source dialogue has 9 direct turns, 9 reported entries and 6 observations");
for (const key of ["direct", "reported"]) for (const [i, item] of dialogue[key].entries()) {
  const target = content.DIALOGUE_61[key][i];
  ok(Boolean(target && same(target.en, item.en) && same(target.ar, item.ar)), `Dialogue ${key} ${i + 1}: original English and Arabic at source lines ${item.line}/${item.arLine}`);
}
for (const [i, note] of dialogue.notes.entries()) {
  const parts = note.text.split(" تحولت إلى ");
  ok(parts.length === 2 && parts.every((part) => contains(content.DIALOGUE_61.notes[i], part)), `Dialogue observation ${i + 1}: both original forms retained`);
}
const dialogueConclusion = source.sections[10].find((line) => line.text.startsWith("هذا الحوار يجمع"));
ok(Boolean(dialogueConclusion && contains(content.DIALOGUE_61.context, dialogueConclusion.text)), "Dialogue retains the source's concluding observation about questions, commands and prohibitions");
const reading = sourceReading61(source);
ok(reading.paragraphs.length === 7 && reading.questions.length === 7, "The reading has seven paragraphs and seven source questions");
ok(same(content.READING_61.title, reading.title.text) && same(content.READING_61.titleAr, reading.titleAr.text), "Reading retains both original titles");
for (const [i, item] of reading.paragraphs.entries()) {
  const target = content.READING_61.paragraphs[i];
  ok(Boolean(target && same(target.en, item.en) && same(target.ar, item.ar)), `Reading paragraph ${i + 1}: source English and Arabic`);
}
for (const [i, item] of reading.questions.entries()) {
  const target = content.READING_61.questions[i];
  ok(Boolean(target && ["q", "qar", "a", "aar"].every((key) => same(target[key], item[key]))), `Reading question ${i + 1}: original question, answer and both translations`);
}

const groups = sourcePractices61(source);
const practiceIntro = source.sections[12].find((line) => line.text.includes("حاول حل كل مجموعة قبل قراءة الحلول"));
ok(Boolean(practiceIntro && lessonJsx.includes("حاول حل كل مجموعة قبل قراءة الحلول")), "The original instruction to attempt each group before reading solutions is visible");
const expectedCounts = [6, 6, 6, 6, 8, 8, 8, 1];
ok(practice.PRACTICES_61.length === 8 && practice.PRACTICES_61.map((group) => group.items.length).join() === expectedCounts.join() && practice.PRACTICE_COUNT_61 === 49, "Eight exercise groups contain 6, 6, 6, 6, 8, 8, 8 and one complete paragraph");
ok(groups.filter((group) => group.instruction).length === 4, "All four explicit source practice instructions were parsed");
for (const [i, group] of groups.entries()) {
  if (group.instruction) ok(contains(practice.PRACTICES_61[i]?.instruction, group.instruction.text), `Practice ${i + 1}: original instruction at line ${group.instruction.line}`);
}
for (let g = 0; g < 7; g++) {
  const src = groups[g]; const target = practice.PRACTICES_61[g];
  ok(src.questions.length === expectedCounts[g] && src.answers.length === expectedCounts[g], `Source practice ${g + 1}: exact question and solution counts`);
  for (let i = 0; i < expectedCounts[g]; i++) {
    const question = src.questions[i]; const answer = src.answers[i]; const item = target.items[i];
    const opts = question.parts.slice(1).map((line) => line.text).filter((text) => /^[A-C]\.\s/.test(text));
    ok(Boolean(item && same(item.prompt, question.parts[0].text)), `Practice ${g + 1}.${i + 1}: source prompt at line ${question.line}`);
    ok(Boolean(item && (item.displayAnswer ?? item.answer) === answer.parts[0].text), `Practice ${g + 1}.${i + 1}: source answer, including punctuation, at line ${answer.line}`);
    ok(Boolean(item && same(item.answer, answer.parts[0].text)), `Practice ${g + 1}.${i + 1}: the actual graded key matches the source, not only the displayed key`);
    if (opts.length) {
      ok(Boolean(item?.options && item.options.length === opts.length && opts.every((option, n) => same(item.options[n], option))), `Practice ${g + 1}.${i + 1}: every original choice, in order`);
      const additional = g === 4 && i === 1 ? ["B. am"] : g === 4 && i === 3 ? ["B. to not"] : [];
      ok(JSON.stringify((item.accept ?? []).map(norm).sort()) === JSON.stringify(additional.map(norm).sort()), `Practice ${g + 1}.${i + 1}: accepted MC alternatives are exactly the independently reviewed grammatical alternatives`);
    }
    if (g === 3) ok(Boolean(item?.ar && same(item.ar, answer.parts[1]?.text)), `Practice 4.${i + 1}: Arabic translation of solution`);
    if ([0, 1, 4, 5].includes(g)) {
      const details = answer.parts.slice(1).map((line) => line.text).filter((text) => !["التحويل:", "الخطأ:", "الصحيح:", "أو:", "ملاحظة:"].includes(text));
      for (const detail of details) ok([item.why, ...(item.accept ?? [])].some((value) => contains(value, detail)), `Practice ${g + 1}.${i + 1}: original explanation or alternative: ${detail}`);
    }
    if (g === 6 && i === 7) ok((item.accept ?? []).some((answer) => same(answer, "My friend suggested that we should play football.")), "Practice 7.8 retains the source alternative");
  }
}
ok(contains(practice.PRACTICES_61[2].postscript, "استخدمنا ordered في الأمر الحازم، وwarned عندما كان الكلام تحذيرًا من تصرف قد يسبب مشكلة."), "Practice 3 retains the original group-level ordered/warned explanation");
const paragraph = groups[7]; const paragraphTarget = practice.PRACTICES_61[7];
ok(same(paragraph.prompt, paragraphTarget.paragraph) && same(paragraph.prompt, paragraphTarget.items[0]?.prompt), "Practice 8 retains the complete original paragraph as one prompt");
ok(paragraph.model.length === 6 && paragraphTarget.model?.length === 6 && paragraph.model.every((line, i) => same(line.en, paragraphTarget.model[i].en) && same(line.ar, paragraphTarget.model[i].ar)), "Practice 8 retains the complete six-part model and all Arabic translations");
ok(same(paragraph.model.map((line) => line.en).join(" "), paragraphTarget.items[0].answer) && same(paragraph.model.map((line) => line.ar).join(" "), paragraphTarget.items[0].ar), "Teacher key contains the complete original paragraph model and translation");
const quoted = paragraph.prompt.match(/"([\s\S]+)"/)?.[1] ?? "";
const components = quoted.match(/[^.!?]+[.!?]/g)?.map((part) => part.trim()) ?? [];
ok(components.length === 7 && paragraphTarget.checklist?.length === 7 && components.every((part, i) => same(part, paragraphTarget.checklist[i])), "The paragraph checklist covers the seven original sentences without inventing seven separate exercises");

const exam = sourceExam61(source);
ok(exam.questions.length === 25 && exam.answers.length === 25 && practice.ORIGINAL_TEST_61.length === 25, "Source exam has exactly 25 prompts and 25 keyed explanations");
for (let i = 0; i < 25; i++) {
  const question = exam.questions[i]; const answer = exam.answers[i]; const item = practice.ORIGINAL_TEST_61[i];
  const opts = question.parts.slice(1).map((line) => line.text).filter((text) => /^[A-C]\.\s/.test(text));
  const explanation = answer.parts.slice(1).map((line) => line.text).find((text) => !text.startsWith("القسم "));
  ok(Number(question.number) === i + 1 && Number(answer.number) === i + 1 && item?.n === i + 1 && item.section === Math.floor(i / 5) + 1, `Exam ${i + 1}: numbering and original section`);
  ok(Boolean(item && same(item.prompt, question.parts[0].text)), `Exam ${i + 1}: original prompt at line ${question.line}`);
  ok(Boolean(item && (item.displayAnswer ?? item.answer) === answer.parts[0].text), `Exam ${i + 1}: original primary key and punctuation at line ${answer.line}`);
  ok(Boolean(item && same(item.answer, answer.parts[0].text)), `Exam ${i + 1}: the actual graded key matches the source, not only the displayed key`);
  ok(Boolean(item?.why && explanation && contains(item.why, explanation)), `Exam ${i + 1}: complete original explanation`);
  if (opts.length) {
    ok(Boolean(item?.options && item.options.length === opts.length && opts.every((option, n) => same(item.options[n], option))), `Exam ${i + 1}: original choices in order`);
    const additional = i === 21 ? ["A. have"] : i === 23 ? ["C. to not"] : [];
    ok(JSON.stringify((item.accept ?? []).map(norm).sort()) === JSON.stringify(additional.map(norm).sort()), `Exam ${i + 1}: accepted MC alternatives are exactly the independently reviewed grammatical alternatives`);
  }
}

const writing = sourceWriting61(source); const speaking = sourceSpeaking61(source); const distinctions = sourceDistinctions61(source);
ok(same(content.WRITING_61.instruction, writing.instruction?.text) && writing.requirements.length === 7 && content.WRITING_61.requirements.length === 7, "Writing: 8–12 sentence instruction and seven source requirements");
ok(same(content.WRITING_61.title, writing.title.text) && same(content.WRITING_61.titleAr, writing.titleAr.text), "Writing model retains both original titles");
for (const [i, item] of writing.requirements.entries()) ok(same(content.WRITING_61.requirements[i], item.parts[0].text), `Writing requirement ${i + 1}`);
ok(writing.model.length === 5 && content.WRITING_61.model.length === 5, "Writing model contains all five bilingual paragraphs");
for (const [i, item] of writing.model.entries()) ok(same(content.WRITING_61.model[i]?.en, item.en) && same(content.WRITING_61.model[i]?.ar, item.ar), `Writing model ${i + 1}: English and Arabic`);
ok(speaking.questions.length === 5 && speaking.pairs.length === 3 && speaking.instructions.length === 3, "Speaking: complete museum-task instruction, five source questions and three source examples");
for (const [i, item] of speaking.instructions.entries()) ok(contains(content.SPEAKING_61.instruction, item.text), `Speaking instruction ${i + 1}: original detail at source line ${item.line}`);
for (const [i, item] of speaking.questions.entries()) ok(same(content.SPEAKING_61.questions[i]?.en, item.en) && same(content.SPEAKING_61.questions[i]?.ar, item.ar), `Speaking question ${i + 1}: original English and Arabic`);
for (const [i, item] of speaking.pairs.entries()) ok(same(content.SPEAKING_61.pairs[i]?.direct, item.direct) && same(content.SPEAKING_61.pairs[i]?.reported, item.reported), `Speaking example ${i + 1}: direct and reported`);
const summary = sourceSummary61(source);
ok(summary.length === 8 && content.SUMMARY_61.length === 9 && distinctions.length === 9 && content.SUMMARY_DISTINCTIONS_61.length === 9, "Summary includes eight structures and nine separately retained distinctions");
for (const [i, item] of summary.entries()) {
  const target = content.SUMMARY_61[i];
  ok(Boolean(target && item.formulas.length && item.formulas.every((formula) => contains(target.formula, formula.text)) && same(target.direct, item.direct?.text) && same(target.reported, item.reported?.text)), `Summary structure ${i + 1}: all source formulas and its paired example remain together`);
}
for (const [i, item] of distinctions.entries()) ok(same(content.SUMMARY_DISTINCTIONS_61[i], item.text), `Summary distinction ${i + 1}: source line ${item.line}`);

// Explicit scientific/context checks: primary source wording remains visible,
// but uncertain gender, backshift, intent and demonstratives are not universalised.
const teacherScene = content.THEORY_61.find((scene) => scene.id === "yes-modals");
const teacherPair = candidates(teacherScene).find((item) => item.direct.includes("May I use your dictionary?"));
ok(Boolean(teacherPair && teacherPair.reported === "The teacher asked us whether he might use our dictionary." && teacherPair.alternative === "The teacher asked us whether they might use our dictionary." && teacherPair.note.includes("لا يحدد") && teacherPair.note.includes("الإذن")), "Source he is retained without assuming the teacher's gender; singular they and permission are explained");
ok(content.DIALOGUE_61.reported[8].en.includes("told the students") && content.DIALOGUE_61.notes[5].includes("told them") && content.DIALOGUE_61.context.includes("إذا استمر") && content.DIALOGUE_61.context.includes("told him"), "Original dialogue addressee and conditional Adam alternative are both explicit");
ok(practice.PRACTICES_61[4].items[1].accept?.includes("B. am") && practice.PRACTICES_61[4].items[3].accept?.includes("B. to not") && practice.ORIGINAL_TEST_61[21].accept?.includes("A. have") && practice.ORIGINAL_TEST_61[23].accept?.includes("C. to not"), "Source MC keys are preserved while contextual present tense and grammatical split infinitives are accepted");
ok(practice.PRACTICES_61[5].items[6].accept?.includes("The doctor advised her to take more rest."), "Minimum-change correction to practice 6.7 is accepted alongside the source answer");
ok(content.READING_61.context.includes("يلتبس") && content.WRITING_61.context.includes("بحسب السياق"), "Reading pronoun and writing-model request ambiguity are explained without replacing the source");
const subjectScene = content.THEORY_61.find((scene) => scene.id === "wh-subject");
const warningScene = content.THEORY_61.find((scene) => scene.id === "warning-advice");
const sayScene = content.THEORY_61.find((scene) => scene.id === "say-tell-ask");
ok(strings(subjectScene).some((value) => value.includes("في معظم الأسئلة نحتاج إلى إعادة ترتيب الكلمات") && value.includes("Who أو What هي الفاعل")), "WH subject case explicitly contrasts normal reordering with a WH subject");
ok(strings(warningScene).some((value) => value.includes("عند النهي عن شيء في النصيحة") && value.includes("advised + object + not to")), "Negative advice retains the original teaching context alongside the example");
ok(strings(sayScene).some((value) => value.includes("الشخص الذي وُجّه إليه الكلام") && value.includes("say") && value.includes("to قبل")), "Say explains how to mention the recipient with to");
const formulas = sayScene?.blocks.filter((block) => block.type === "formula") ?? [];
ok(formulas.some((block) => contains(block.en, "tell + someone + to + verb") && contains(block.ar, "في الأوامر نستخدم to")), "Tell command source label is attached to its formula");
ok(formulas.some((block) => contains(block.en, "tell + someone + not to + verb") && contains(block.ar, "في النواهي نستخدم not to")), "Tell prohibition source label is attached to its formula");
ok(formulas.some((block) => contains(block.en, "ask + WH-word + sentence") && contains(block.ar, "في أسئلة WH نحتفظ بأداة السؤال")), "Ask WH-question source label is attached to its formula");
ok(formulas.some((block) => contains(block.en, "ask + someone + to + verb") && contains(block.ar, "في الطلبات نستخدم to")), "Ask request source label is attached to its formula");
ok(!lessonJsx.includes("نص المصدر الحرفي — اضغط للعرض"), "No standalone source-reveal panel is added to the student interface");

if (failures.length) {
  console.error(`Lesson 61 source audit FAILED: ${failures.length} / ${checks}`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Lesson 61 independent source audit: ${checks}/${checks} passed.`);
  console.log(`Source ${sourcePath} SHA-256 ${source.hash}; ${source.lines.length} parsed lines; 16 sections, ${englishLines} English source-line occurrences, ${translations} labelled Arabic translations, ${pairs.length} associated direct/reported occurrences, ${bilingual.length} standalone bilingual examples and ${vocabulary.length} WH-word glosses.`);
  console.log("Source inventory: 7 rules; 4 procedures (20 steps); 8 solved examples; dialogue 9 + 9 + 6 notes; reading 7 bilingual paragraphs + 7 bilingual Q&A; exercises 6/6/6/6/8/8/8/1; source exam 25; writing 7 requirements + 5 bilingual model paragraphs; speaking 5 questions + 3 examples; 8 structures + 9 distinctions.");
}
