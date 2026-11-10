// Lesson 61: implementation snapshot integrity, keys, integration and western digits.
// The snapshot was generated from the implementation, not from an independent source.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import esbuild from "esbuild";
import ts from "typescript";

const require = createRequire(import.meta.url);
let checks = 0;
const failures = [];
function ok(condition, message) { checks++; if (!condition) failures.push(message); }
async function load(path) {
  const source = readFileSync(path, "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}
async function bundle(path) {
  const result = await esbuild.build({ entryPoints: [path], bundle: true, write: false, format: "cjs", platform: "node", target: "node22", loader: { ".css": "empty" }, external: ["react", "react/jsx-runtime", "react-dom"] });
  const module = { exports: {} };
  new Function("require", "module", "exports", result.outputFiles[0].text)(require, module, module.exports);
  return module.exports;
}
function walk(path) { return statSync(path).isDirectory() ? readdirSync(path).flatMap((name) => walk(join(path, name))) : [path]; }
const content = await load("src/lessons/lesson61/content61.ts");
const practice = await load("src/lessons/lesson61/practice61.ts");
const final = await load("src/lessons/lesson61/test61.ts");
const labs = await bundle("src/lessons/lesson61/labs61.tsx");
const lesson = await bundle("src/lessons/lesson61/Lesson61.tsx");
const kit = await bundle("src/lessons/lesson61/kit61.tsx");
const shared = await bundle("src/shared/finalTest.tsx");
const golden = JSON.parse(readFileSync("scripts/fixtures/lesson61-content-snapshot.json", "utf8"));
const snapshots = { theory: content.THEORY_61, errors: content.ERRORS_61, procedures: content.PROCEDURES_61, solved: content.SOLVED_61, dialogue: content.DIALOGUE_61, reading: content.READING_61, writing: content.WRITING_61, speaking: content.SPEAKING_61, summary: content.SUMMARY_61, practices: practice.PRACTICES_61, original: practice.ORIGINAL_TEST_61 };
for (const [key, value] of Object.entries(snapshots)) ok(JSON.stringify(value) === JSON.stringify(golden[key]), `Complete ${key} text, examples, translations, answers and explanations match the implementation snapshot (not independent source verification)`);

const scenes = lesson.LESSON_61_SCENES;
const ids = scenes.map((s) => s.id);
ok(scenes.length === 61 && new Set(ids).size === scenes.length, `61 unique navigable scenes (${scenes.length})`);
ok(content.THEORY_61.length === 22, "22 teaching scenes including the bridge");
for (const entry of content.THEORY_61) ok(ids.includes(entry.id), `Theory scene ${entry.id} is reachable`);
const sectionScenes = { 1: ["yes-intro", "yes-rule", "yes-be", "yes-do", "yes-perfect", "yes-modals", "if-whether"], 2: ["wh-intro", "wh-order", "wh-where", "wh-what", "wh-how", "wh-subject"], 3: ["command", "ordered-instructed", "negative-command", "warning-advice"], 4: ["request", "negative-request"], 5: ["suggestions"], 6: ["say-tell-ask"], 7: ["errors"], 8: ["procedures"], 9: ["solved"], 10: ["dialogue", "dialogue-reported"], 11: ["reading", "comprehension"], 12: practice.PRACTICES_61.map((g) => g.id), 13: ["original-1", "original-2", "original-3", "original-4", "original-5", "original-key"], 14: ["writing"], 15: ["speaking"], 16: ["summary"] };
for (const [section, required] of Object.entries(sectionScenes)) ok(required.every((id) => ids.includes(id)), `Section ${section} renders in its required scenes`);
ok(lesson.LESSON_61_SOURCE_SECTION_COUNT === 16, "All 16 source sections declared");
const pairs = content.THEORY_61.flatMap((s) => s.blocks.filter((b) => b.type === "pairs").flatMap((b) => b.items));
const lines = content.THEORY_61.flatMap((s) => s.blocks.filter((b) => b.type === "lines").flatMap((b) => b.items));
ok(pairs.length === 56 && pairs.every((p) => p.direct && p.reported && p.ar), `56 direct/reported pairs retain translations (${pairs.length})`);
ok(lines.length === 34 && lines.every((l) => l.en && l.ar), `34 English/Arabic lines retained (${lines.length})`);
ok(content.ERRORS_61.length === 7 && content.ERRORS_61.every((e) => e.wrong && e.right && e.why), "All 7 rules, examples, corrections and reasons exist");
ok(content.PROCEDURES_61.length === 4 && content.PROCEDURES_61.map((p) => p.steps.length).join() === "6,6,4,4" && content.PROCEDURES_61.every((p) => p.direct && p.result && p.ar), "All four conversion routes and source steps/results/translations exist");
ok(content.SOLVED_61.length === 8 && content.SOLVED_61.every((e) => e.direct && e.reported && e.ar), "8 comprehensive bilingual worked examples");
ok(content.DIALOGUE_61.direct.length === 9 && content.DIALOGUE_61.reported.length === 9 && [...content.DIALOGUE_61.direct, ...content.DIALOGUE_61.reported].every((l) => l.en && l.ar) && content.DIALOGUE_61.notes.length === 6, "Complete 9-turn bilingual dialogue, 9-entry bilingual retelling and 6 notes");
ok(content.READING_61.paragraphs.length === 7 && content.READING_61.paragraphs.every((l) => l.en && l.ar) && content.READING_61.questions.length === 7 && content.READING_61.questions.every((q) => q.q && q.qar && q.a && q.aar), "Reading: 7 bilingual paragraphs and 7 bilingual questions/answers");
ok(content.WRITING_61.requirements.length === 7 && content.WRITING_61.model.length === 5 && content.WRITING_61.model.every((l) => l.en && l.ar), "Writing task, 7 requirements and complete bilingual model");
ok(content.SPEAKING_61.questions.length === 5 && content.SPEAKING_61.questions.every((l) => l.en && l.ar) && content.SPEAKING_61.pairs.length === 3, "Speaking task, 5 bilingual questions and 3 examples");
ok(content.SUMMARY_61.length === 9 && content.SUMMARY_61.every((s) => s.title && s.formula && s.note), "All 9 summary rules and final distinctions");

const groups = practice.PRACTICES_61;
ok(groups.length === 8 && groups.map((g) => g.items.length).join() === "6,6,6,6,8,8,8,7", "All 8 practice groups and all 55 individual sentences");
ok(practice.PRACTICE_COUNT_61 === 55 && groups.every((g) => g.instruction && g.items.every((q) => q.prompt && q.answer && q.why)), "Each practice item has a prompt, answer and explanation");
ok(Boolean(groups[7].paragraph) && groups[7].model.length === 6 && groups[7].model.every((l) => l.en && l.ar), "Full paragraph, complete six-line model and translation retained");
for (const group of groups) for (const [i, q] of group.items.entries()) if (q.options) ok(q.options.includes(q.answer) && (q.accept || []).every((a) => q.options.includes(a)), `${group.id} item ${i + 1}: every accepted option belongs to the choices`);
const original = practice.ORIGINAL_TEST_61;
ok(original.length === 25 && original.every((q, i) => q.n === i + 1), "Original test numbered consecutively from 1 to 25");
ok(original.map((q) => q.section).join() === Array.from({ length: 25 }, (_, i) => Math.floor(i / 5) + 1).join(), "Five original test groups have exactly five questions each in order");
// Preserve occurrences by number and order, including legitimate repeated wording;
// this is a drift check against the implementation snapshot, not source proof.
ok(JSON.stringify(original.map(({ n, prompt }) => ({ n, prompt }))) === JSON.stringify(golden.original.map(({ n, prompt }) => ({ n, prompt }))), "Every numbered original prompt, including repetitions, matches the implementation snapshot");
ok(original.every((q) => q.prompt && q.answer && q.why), "Each implemented question has an attached local key and explanation");
for (const q of original.filter((q) => q.options)) ok(q.options.includes(q.answer) && (q.accept || []).every((a) => q.options.includes(a)), `Original question ${q.n} matches its keyed choice and any valid alternative`);
ok(original[23].answer === "B. not to" && original[23].accept.includes("C. to not"), "Question 24 keeps its local key and accepts both grammatical forms");
ok(groups[4].items[3].answer === "C. not to" && groups[4].items[3].accept.includes("B. to not"), "Practice 5 question 4 keeps its local key and accepts both grammatical forms");
ok(groups[4].items[1].answer === "A. was" && groups[4].items[1].accept.includes("B. am"), "Practice 5 question 2 accepts present readiness without mandatory backshift");
ok(original[21].answer === "B. had" && original[21].accept.includes("A. have"), "Question 22 accepts a still-relevant present perfect without mandatory backshift");
// Exercise the actual lesson matcher for all 55 practice and 25 test items.
// The implementation snapshot above catches a changed key; these checks also
// reject blank data, incomplete alternatives, blank answers and wrong choices.
const present61 = (value) => typeof value === "string" && value.trim().length > 0;
const attempts61 = [...groups.flatMap((group) => group.items.map((item, i) => ({ item, tag: `${group.id} item ${i + 1}` }))), ...original.map((item) => ({ item, tag: `original question ${item.n}` }))];
for (const { item, tag } of attempts61) {
  const alternatives = item.accept ?? [];
  const complete = present61(item.prompt) && present61(item.answer) && present61(item.why) && Array.isArray(alternatives) && alternatives.every(present61);
  ok(complete && kit.matches61(item.answer, item.answer, alternatives) && alternatives.every((answer) => kit.matches61(answer, item.answer, alternatives)) && !kit.matches61("", item.answer, alternatives) && !kit.matches61("This is not an accepted answer.", item.answer, alternatives), `${tag}: complete prompt/key/explanation, reviewed alternatives, and wrong or blank answers rejected`);
  if (item.options) {
    const optionsComplete = Array.isArray(item.options) && item.options.length >= 2 && item.options.every(present61) && new Set(item.options.map((option) => option.trim())).size === item.options.length;
    const wrongOptions = optionsComplete && Array.isArray(alternatives) && present61(item.answer) ? item.options.filter((option) => !kit.matches61(option, item.answer, alternatives)) : [];
    ok(optionsComplete && Array.isArray(alternatives) && item.options.includes(item.answer) && alternatives.every((answer) => item.options.includes(answer)) && wrongOptions.length > 0 && wrongOptions.every((option) => !kit.matches61(option, item.answer, alternatives)), `${tag}: choices and accepted keys are complete; a wrong choice is rejected`);
  }
}
ok(kit.matches61("He asked me whether I was tired.", "He asked me if I was tired."), "Equivalent reporting linkers are accepted");
ok(!kit.matches61("He told them to ask him whether they had a question.", "He told them to ask him if they had a question."), "Conditional if is not mechanically replaced by whether");

const labIds = ["yes-converter", "wh-rebuilder", "order-detector", "command-studio", "negative-lab", "intent-detector", "advice-suggestion", "verb-control", "conversation", "error-detective"];
ok(labs.LABS_61.length === 10 && labIds.every((id) => labs.LABS_61.some((l) => l.id === id) && ids.includes(id)), "All 10 required interactive labs registered and reachable");
for (const l of labs.LABS_61) {
  ok(l.cases.length > 0 && l.cases.every((c) => c.prompt && c.context && c.answer && c.why && c.decisions.length > 0 && c.decisions.every((d) => d.label && d.why && d.correct.length > 0 && d.correct.every((a) => d.options.includes(a)))), `${l.id}: every case has a prompt, decision, valid choices, written target and explanation`);
}
ok(labs.LABS_61.find((l) => l.id === "error-detective").cases.length === 7, "Detective covers the seven source checks");
ok(labs.LABS_61.find((l) => l.id === "conversation").cases.length === 10, "Conversation transformer covers all turns, including both final instructions");

const test = final.TEST_61;
ok(test.length === 15 && lesson.LESSON_61_FINAL_TEST_COUNT === 15, "Independent shared FinalTest bank has exactly 15 questions");
const correct = {};
for (const [i, q] of test.entries()) {
  ok(Boolean(q.ar && q.why && q.concept), `FinalTest question ${i + 1} has prompt, explanation and concept`);
  if (q.type === "single") { ok(q.answer >= 0 && q.answer < q.options.length, `FinalTest question ${i + 1} choice key in range`); correct[i] = { kind: "single", value: q.answer }; }
  if (q.type === "error") { ok(q.answer >= 0 && q.answer < q.segments.length, `FinalTest question ${i + 1} error key in range`); correct[i] = { kind: "error", value: q.answer }; }
  if (q.type === "tf") correct[i] = { kind: "tf", value: q.answer };
  if (q.type === "multi") { ok(q.answers.length > 0 && q.answers.every((a) => a >= 0 && a < q.options.length), `FinalTest question ${i + 1} multi key in range`); correct[i] = { kind: "multi", value: q.answers }; }
  if (q.type === "typed") { ok(q.accept.length > 0 && q.accept.every(Boolean), `FinalTest question ${i + 1} typed key exists`); correct[i] = { kind: "typed", value: q.accept[0] }; }
  if (q.type === "order") correct[i] = { kind: "order", value: q.items.map((_, n) => n) };
  if (q.type === "match") correct[i] = { kind: "match", value: q.pairs.map((_, n) => n) };
  ok(Boolean(shared.expectedAnswerText(q)), `FinalTest question ${i + 1} has a rendered teacher key`);
}
ok(shared.gradeFinalTest(test, correct).score === 15, "Shared grader scores the actual 15 teacher-key answers as 15/15");
ok(new Set(test.map((q) => `${q.ar}|${q.en || ""}|${q.concept}`)).size === 15, "FinalTest has no duplicate questions");
ok(["single", "typed", "order", "error", "match", "tf", "multi"].every((type) => test.some((q) => q.type === type)), "FinalTest uses supported and varied question types");

const app = readFileSync("src/App.tsx", "utf8");
const lessonSource = readFileSync("src/lessons/lesson61/Lesson61.tsx", "utf8");
const previous = readFileSync("src/lessons/lesson60/Lesson60.tsx", "utf8");
const teacher = readFileSync("src/lessons/lesson61/TeacherArea61.tsx", "utf8");
const css = readFileSync("src/lessons/lesson61/lesson61.css", "utf8");
ok(/import Lesson61 from/.test(app) && /href: "#\/lesson\/61"/.test(app) && /route === 61\) page = <Lesson61 onExit=\{goHome\}/.test(app), "App, hub and hash router register Lesson 61");
ok(/href="#\/lesson\/61"/.test(previous) && /location\.hash = "\/lesson\/61"/.test(previous), "Lesson 60 links and navigates forward to 61");
ok(/href="#\/lesson\/60"/.test(lessonSource) && /onExit/.test(lessonSource) && !/#\/lesson\/62/.test(lessonSource + app), "Lesson 61 links back to 60 and index without a ghost 62 link");
ok(/<FinalTest lesson=\{61\} questions=\{TEST_61\}/.test(lessonSource) && /hidden=\{current\.id !== "final-test"\}/.test(lessonSource), "Shared FinalTest stays mounted across scene navigation");
const sharedSource = readFileSync("src/shared/finalTest.tsx", "utf8");
ok(/isolateProgress/.test(lessonSource) && /isolateProgress = false/.test(sharedSource) && /<bdi dir="ltr">\{answered\}/.test(sharedSource), "Only opted-in lessons change the shared test's direction-isolated progress labels");
ok(/<FinalTestAnswerKey lesson=\{61\} questions=\{TEST_61\}/.test(teacher) && /TEACHER_PASSWORD_61 = "somer173"/.test(teacher), "Teacher gate and shared 15-answer key use the existing contract");
ok(/MemoryProvider61/.test(lessonSource) && /useMemory61/.test(lessonSource), "Practice and task progress live above keyed scenes");
ok(!/max-w-(?:3xl|4xl|5xl|6xl)/.test(lessonSource) && !/main\s*>\s*\.pop\s*\{\s*max-width/.test(css), "Lesson honors the shared layout width guard");
const ledger = readFileSync("src/lessons/lesson61/source-ledger.md", "utf8");
const ledgerRows = ledger.split("## Forty requested trace points")[1].split("## Measurable inventory")[0].match(/^\| \d+ \|/gm) || [];
ok(ledgerRows.length === 40, `Source Ledger documents all 40 requested trace points (${ledgerRows.length})`);
ok(ledger.includes("source corrections and contextual decisions (pending comparison)"), "Provisional source corrections and contextual interpretations documented");

// Scan all new lesson files (including CSS and documentation), fixtures, test
// scripts, and unchanged shared components which can render in this lesson.
// Unicode escapes are intentional: the audit source itself stays digit-clean.
const forbidden = /[\u0660-\u0669\u06f0-\u06f9\u2460-\u24ff\u2776-\u2793\u3248-\u324f\u3251-\u325f\u32b1-\u32bf\u{1f10b}-\u{1f10c}]/u;
ok(["\u0660", "\u06f0", "\u2460", "\u3248", "\u{1f10b}", "\u{1f10c}"].every((digit) => forbidden.test(digit)) && !forbidden.test("0123456789"), "Digit guard detects Arabic-Indic, Persian and circled numerals including supplementary-plane forms");
const digitFiles = [...walk("src/lessons/lesson61"), "scripts/fixtures/lesson61-content-snapshot.json", "scripts/audit-lesson61.mjs", "scripts/audit-final-test.mjs", "scripts/shots-lesson61.mjs", "scripts/audit-lesson61-browser.mjs", "scripts/lib/lesson61-browser.mjs", "src/App.tsx", "src/shared/Lesson1Shell.tsx", "src/shared/finalTest.tsx", "src/shared/bidi.tsx", "src/shared/lessonKit.tsx", "src/shared/SitePasswordGate.tsx", "src/shared/Signature.tsx"];
for (const path of digitFiles) ok(!forbidden.test(readFileSync(path, "utf8")), `Western digits only: ${path}`);

if (failures.length) { console.error(`Lesson 61 static audit FAILED: ${failures.length} / ${checks}`); for (const failure of failures) console.error(`  - ${failure}`); process.exitCode = 1; }
else { console.log(`Lesson 61 structural and snapshot checks: ${checks}/${checks} passed · 16 sections · 61 scenes · 10 labs · 55 practice items · 25 original + 15 shared-test questions.`); console.log("Western digits static audit: PASS — no Arabic-Indic digits or circled numerals in Lesson 61 source, CSS, fixtures, integration or shared UI components."); }
console.error("SOURCE FIDELITY: UNVERIFIED — the current fixture is an implementation snapshot, not an independent transcription of the user-provided source.");
if (!process.exitCode) process.exitCode = 2;
