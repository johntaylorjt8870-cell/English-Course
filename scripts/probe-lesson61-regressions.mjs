// Verify that registration/link and shared FinalTest guards reject concrete
// invalid data. All mutations are made in a new temporary copy, not the checkout.
import { cpSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";

const checkout = process.cwd();
const sandbox = mkdtempSync("/tmp/lesson61-regression-probes-");
cpSync("src", join(sandbox, "src"), { recursive: true });
cpSync("scripts", join(sandbox, "scripts"), { recursive: true });
cpSync("package.json", join(sandbox, "package.json"));
symlinkSync(join(checkout, "node_modules"), join(sandbox, "node_modules"), "dir");
const logDir = mkdtempSync(resolve("docs/lesson61-evidence/source-fidelity/regression-probes-run-"));
console.log(`Per-probe logs: ${logDir}`);
const files = {
  app: "src/App.tsx", lesson60: "src/lessons/lesson60/Lesson60.tsx", shared: "src/lessons/lesson61/test61.ts",
};
const originals = Object.fromEntries(Object.entries(files).map(([key, path]) => [key, readFileSync(join(sandbox, path), "utf8")]));
const digest = (str) => createHash("sha256").update(str).digest("hex");
function once(input, before, after) {
  if (input.split(before).length !== 2) throw new Error(`Expected exactly one mutation target: ${before}`);
  return input.replace(before, after);
}
function removeLine(input, marker) {
  const lines = input.split("\n");
  if (lines.filter((line) => line.includes(marker)).length !== 1) throw new Error(`Expected one line: ${marker}`);
  return lines.filter((line) => !line.includes(marker)).join("\n");
}
const routeGuard = "lesson 61 exists and has exactly one real import, hub card and route";
const probes = [
  { name: "missing-route", file: "app", script: "scripts/audit-lesson60.mjs", before: "route === 61) page = <Lesson61", after: "route === 61) page = <MissingLesson61", expected: routeGuard },
  { name: "missing-import", file: "app", script: "scripts/audit-lesson60.mjs", before: 'import Lesson61 from "./lessons/lesson61/Lesson61"', after: 'import Lesson61 from "./lessons/lesson61/NoSuchLesson"', expected: routeGuard },
  { name: "missing-card", file: "app", script: "scripts/audit-lesson60.mjs", before: 'href: "#/lesson/61"', after: 'href: "#/lesson/62"', expected: routeGuard },
  { name: "ghost-onward-link", file: "lesson60", script: "scripts/audit-lesson60.mjs", before: 'href="#/lesson/61"', after: 'href="#/lesson/62"', expected: "lesson 60 links and navigates to registered lesson 61; every lesson target exists and is registered" },
  { name: "shared-valid-wrong-key", file: "shared", script: "scripts/audit-final-test.mjs", before: 'answer: 0, why: "السؤال من نوع Yes/No', after: 'answer: 1, why: "السؤال من نوع Yes/No', expected: "L61 q1: answer matches the manually reviewed grammatical key" },
  { name: "shared-out-of-range-key", file: "shared", script: "scripts/audit-final-test.mjs", before: 'answer: 0, why: "السؤال من نوع Yes/No', after: 'answer: 99, why: "السؤال من نوع Yes/No', expected: "L61 q1: answer index is in range" },
  { name: "shared-missing-explanation", file: "shared", script: "scripts/audit-final-test.mjs", before: 'why: "السؤال من نوع Yes/No فنستخدم if ثم ترتيب I was."', after: 'why: ""', expected: "L61 q1: prompt, explanation, concept and trap exist" },
  { name: "shared-missing-question", file: "shared", script: "scripts/audit-final-test.mjs", mutate: (text) => removeLine(text, '  { type: "multi", ar: "اختر جميع الصيغ'), expected: "L61: the actual shared bank contains 15 reviewed questions (got 14)" },
  { name: "shared-invalid-typed-alternative", file: "shared", script: "scripts/audit-final-test.mjs", before: 'accept: ["to sit"]', after: 'accept: ["to sit", "sits"]', expected: "L61 q5: every accepted typed response was reviewed" },
  { name: "shared-wrong-multi-key", file: "shared", script: "scripts/audit-final-test.mjs", before: "answers: [0, 1, 3]", after: "answers: [0, 1, 2]", expected: "L61 q15: answer matches the manually reviewed grammatical key" },
];
let failed = 0;
for (const probe of probes) {
  const file = join(sandbox, files[probe.file]);
  try {
    writeFileSync(file, probe.mutate ? probe.mutate(originals[probe.file]) : once(originals[probe.file], probe.before, probe.after));
    const result = spawnSync(process.execPath, [probe.script], { cwd: sandbox, encoding: "utf8", timeout: 120000, maxBuffer: 16 * 1024 * 1024 });
    const output = (result.stdout || "") + (result.stderr || "") + (result.error ? `\n${result.error.stack}\n` : "");
    writeFileSync(join(logDir, `${probe.name}.log`), output);
    // The normal shared audit already has five inherited Lesson 35 failures;
    // this probe succeeds only if the targeted additional diagnostic is present.
    const ok = result.status === 1 && output.includes(probe.expected);
    if (!ok) failed++;
    console.log(`${ok ? "PASS" : "FAIL"} ${probe.name}: exit=${result.status}; target diagnostic ${output.includes(probe.expected) ? "present" : "MISSING"}`);
  } finally { writeFileSync(file, originals[probe.file]); }
}
for (const [key, path] of Object.entries(files)) {
  if (digest(readFileSync(join(sandbox, path), "utf8")) !== digest(originals[key])) throw new Error(`Isolated file not restored: ${key}`);
}
console.log(`${probes.length - failed}/${probes.length} registration, link and shared-test mutations rejected; isolated copies restored byte-for-byte. Checkout files were never mutated.`);
if (failed) process.exitCode = 1;
