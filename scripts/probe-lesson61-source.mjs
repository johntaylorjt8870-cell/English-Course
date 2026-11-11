// Deliberate negative probes for the independent source audit. Mutations occur
// only in a freshly-created temporary copy, never in the checkout or source.
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";

const checkout = process.cwd();
const sandbox = mkdtempSync("/tmp/lesson61-source-probes-");
const files = ["docs/lesson61-source.md", "scripts/audit-lesson61-source.mjs", "scripts/lib/lesson61-source.mjs", "src/lessons/lesson61/content61.ts", "src/lessons/lesson61/practice61.ts", "src/lessons/lesson61/Lesson61.tsx"];
for (const path of files) { mkdirSync(dirname(join(sandbox, path)), { recursive: true }); copyFileSync(join(checkout, path), join(sandbox, path)); }
symlinkSync(join(checkout, "node_modules"), join(sandbox, "node_modules"), "dir");
const outputDir = mkdtempSync(resolve("docs/lesson61-evidence/source-fidelity/source-probes-run-"));
console.log(`Per-probe logs: ${outputDir}`);
const digest = (text) => createHash("sha256").update(text).digest("hex");
const original = Object.fromEntries(files.map((path) => [path, readFileSync(join(sandbox, path), "utf8")]));
function replaceOnce(input, before, after) {
  if (input.split(before).length !== 2) throw new Error(`Mutation must match once: ${before}`);
  return input.replace(before, after);
}
const content = "src/lessons/lesson61/content61.ts", practice = "src/lessons/lesson61/practice61.ts";
const probes = [
  { name: "practice-source-prompt", path: practice, before: 'He asked me, "Are you hungry?"', after: 'He asked me, "Are you thirsty?"', expected: "Practice 1.1: source prompt" },
  { name: "exam-graded-key", path: practice, before: 'answer: "B. I was going", displayAnswer: "B. I was going."', after: 'answer: "A. was I going", displayAnswer: "B. I was going."', expected: "Exam 21: the actual graded key matches the source" },
  { name: "exam-displayed-key", path: practice, before: 'displayAnswer: "B. not to."', after: 'displayAnswer: "C. to not."', expected: "Exam 24: original primary key and punctuation" },
  { name: "invalid-mc-alternative", path: practice, before: 'accept: ["B. am"]', after: 'accept: ["B. am", "C. be"]', expected: "Practice 5.2: accepted MC alternatives" },
  { name: "exam-source-explanation", path: practice, before: "لأن Present Perfect أصبح Past Perfect.", after: "لا يوجد تفسير.", expected: "Exam 22: complete original explanation" },
  { name: "arabic-reading-translation", path: content, before: "في يوم الاثنين الماضي، زارت مجموعة من الطلاب مركزًا للعلوم برفقة معلمهم.", after: "في يوم الاثنين الماضي، لم يزر الطلاب المركز.", expected: "Reading paragraph 1: source English and Arabic" },
  { name: "wh-subject-pair", path: content, before: "He asked who had broken the window.", after: "He asked who he had broken the window.", expected: "direct/reported pair is associated correctly" },
  { name: "dialogue-source-addressee", path: content, before: "The teacher also told the students not to make any noise while their classmates were working.", after: "The teacher also told the children not to make any noise while their classmates were working.", expected: "Dialogue reported 9: original English and Arabic" },
  { name: "paragraph-as-seven-items", path: practice, before: '    items: [{\n      prompt:', after: '    items: [{ prompt: "invented task", answer: "invented answer", why: "invented" }, {\n      prompt:', expected: "Eight exercise groups contain 6, 6, 6, 6, 8, 8, 8 and one complete paragraph" },
  { name: "summary-distinction", path: content, before: "Warning: warned + object + not to.", after: "Warning: warned + object + to.", expected: "Summary distinction 8: source line" },
  { name: "wh-word-translation", path: content, before: '{ en: "Who", ar: "من" }', after: '{ en: "Who", ar: "متى" }', expected: "WH vocabulary 1: source line" },
  { name: "procedure-step-detail", path: content, before: "نحدد أداة السؤال: Where.", after: "نحدد مكان الفاعل: Where.", expected: "Procedure 2, step 1: original instructional detail" },
  { name: "solved-concept-label", path: content, before: "{ kind: \"الأمر\", direct: 'The mother said to the children", after: "{ kind: \"النهي\", direct: 'The mother said to the children", expected: "Solved example 4: source concept label" },
  { name: "say-recipient-explanation", path: content, before: "عند ذكر الشخص الذي وُجّه إليه الكلام مع say، نستخدم عادةً to قبل هذا الشخص.", after: "لا حاجة لذكر الشخص.", expected: "Say explains how to mention the recipient with to" },
  { name: "dialogue-conclusion", path: content, before: "هذا الحوار يجمع بين الأسئلة والأوامر والنواهي في موقف واحد.", after: "هذا الحوار يقتصر على الأسئلة.", expected: "Dialogue retains the source's concluding observation" },
  { name: "museum-speaking-instruction", path: content, before: "تخيل أنك تتحدث مع صديقك عن زيارة قمت بها إلى متحف.", after: "تخيل أنك تتحدث عن رحلة إلى حديقة.", expected: "Speaking instruction 1: original detail" },
  { name: "practice-specific-instruction", path: practice, before: "حوّل الجمل إلى الكلام المنقول، واختر الفعل بحسب معنى الموقف.", after: "اذكر اسم الفاعل فقط.", expected: "Practice 3: original instruction at line" },
  { name: "tell-command-formula-label", path: content, before: "في الأوامر نستخدم to، وفي النواهي نستخدم not to.", after: "في الأوامر نستخدم not to، وفي النواهي نستخدم not to.", expected: "Tell command source label is attached to its formula" },
  { name: "group-attempt-instruction", path: "src/lessons/lesson61/Lesson61.tsx", mutate: (text) => {
      const source = "حاول حل كل مجموعة قبل قراءة الحلول.";
      if (text.split(source).length !== 3) throw new Error("Expected both group-instruction renderings");
      return text.replaceAll(source, "اقرأ الحلول قبل المحاولة.");
    }, expected: "The original instruction to attempt each group before reading solutions is visible" },
  { name: "summary-example-association", path: content, mutate: (text) => {
      const a = 'reported: "He asked if I was happy."', b = 'reported: "He asked where I lived."';
      return replaceOnce(replaceOnce(replaceOnce(text, a, 'reported: "__PROBE_SWAP__"'), b, a), 'reported: "__PROBE_SWAP__"', b);
    }, expected: "Summary structure 1: all source formulas and its paired example remain together" },
  { name: "source-byte-tampering", path: "docs/lesson61-source.md", mutate: (text) => `${text}\n`, expected: "Attachment SHA-256 is unchanged" },
];
let failed = 0;
for (const probe of probes) {
  const path = join(sandbox, probe.path);
  try {
    const changed = probe.mutate ? probe.mutate(original[probe.path]) : replaceOnce(original[probe.path], probe.before, probe.after);
    writeFileSync(path, changed);
    const result = spawnSync(process.execPath, ["scripts/audit-lesson61-source.mjs"], { cwd: sandbox, encoding: "utf8", timeout: 60000, maxBuffer: 8 * 1024 * 1024 });
    const output = (result.stdout || "") + (result.stderr || "") + (result.error ? `\n${result.error.stack}\n` : "");
    writeFileSync(join(outputDir, `${probe.name}.log`), output);
    const ok = result.status === 1 && output.includes(probe.expected);
    if (!ok) failed++;
    console.log(`${ok ? "PASS" : "FAIL"} ${probe.name}: exit=${result.status}; expected source diagnostic ${output.includes(probe.expected) ? "present" : "MISSING"}`);
  } finally { writeFileSync(path, original[probe.path]); }
}
for (const path of files) {
  if (digest(readFileSync(join(sandbox, path), "utf8")) !== digest(original[path])) throw new Error(`Isolated file was not restored: ${path}`);
}
console.log(`${probes.length - failed}/${probes.length} deliberate mutations rejected; isolated copies restored byte-for-byte. Checkout files were never mutated.`);
if (failed) process.exitCode = 1;
