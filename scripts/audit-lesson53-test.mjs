// Focused audit for Lesson 53 test and practice data.
import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
const dir = await mkdtemp(join(tmpdir(), "lesson53-"));
let checks = 0;
function check(fn) { fn(); checks++; }
try {
  const outfile = join(dir, "audit.mjs");
  await build({ stdin: { contents: `export * from './src/lessons/lesson53/testData53.ts'; export * from './src/lessons/lesson53/testKey53.ts'; export * from './src/lessons/lesson53/practiceData53.ts'; export * from './src/lessons/lesson53/content53.ts';`, resolveDir: process.cwd() }, bundle: true, platform: "node", format: "esm", outfile, logLevel: "silent" });
  const { TEST_QUESTIONS_53: qs, TEST_LEVELS_53: levels, TEST_SOLUTIONS_53: key, gradeTest53: grade, PRACTICE_53: practice, PAGES_53: pages, DIALOGUE_53: dialogue, DIALOGUE_QA_53: dialogueQA, READING_53: reading, READING_QA_53: readingQA, SPEAKING_53: speaking } = await import(pathToFileURL(outfile));
  check(() => assert.equal(qs.length, 25));
  check(() => assert.equal(practice.length, 8));
  check(() => assert.equal(new Set(pages.filter((page) => /^[①-⑭]/.test(page.section)).map((page) => page.section)).size, 14));
  check(() => assert.equal(dialogue.length, 9));
  check(() => assert.equal(dialogueQA.length, 6));
  check(() => assert.equal(reading.length, 6));
  check(() => assert.equal(readingQA.length, 7));
  check(() => assert.equal(speaking.length, 8));
  check(() => assert.deepEqual(practice.map((group) => group.items.length), [10, 8, 8, 5, 5, 10, 5, 8]));
  check(() => assert.ok(practice.every((group) => group.items.every((item) => item.prompt && item.answer))));
  check(() => assert.deepEqual(levels.map((level) => qs.filter((q) => q.level === level.level).length), [8, 5, 5, 3, 4]));
  check(() => assert.deepEqual(qs.map((q) => q.id), key.map((answer) => answer.id)));
  const answers = Object.fromEntries(key.map((solution) => [solution.id, solution.choice ?? solution.model]));
  const full = grade(answers);
  check(() => assert.equal(full.score, 25));
  check(() => assert.equal(full.total, 25));
  check(() => assert.equal(grade({}).score, 0));
  for (const q of qs) {
    const wrong = grade({ ...answers, [q.id]: q.type === "choice" ? "z" : "not an answer" });
    check(() => assert.equal(wrong.score, 24, q.id));
  }
  for (const [id, alternative] of Object.entries({
    q9: "I'd travel around the world if I had a plane.",
    q11: "If they did not live so far away, we'd visit them.",
    q12: "If I were you, I would not accept that offer.",
    q16: "He'd have more free time if he didn't work.",
    q19: "Zero", q20: "Second conditional", q21: "First",
    q22: "I'd study harder if I were you.",
    q23: "What would you do if you found a bag filled with money?",
    q24: "She could work in Spain if she spoke Spanish.",
    q25: "If we did not have an exam tomorrow, we'd sleep late.",
  })) check(() => assert.equal(grade({ ...answers, [id]: alternative }).score, 25, id));
  for (const [id, wrong] of Object.entries({ q9: "If I have a plane, I would travel around the world", q11: "If they didn't lived so far away, we would visit them", q16: "If he didn't worked, he would have more free time", q18: "She would buys a house if she had enough money", q20: "First Conditional", q24: "If she spoke Spanish, she will work in Spain", q25: "If we had an exam tomorrow, we'd sleep late" })) {
    check(() => assert.equal(grade({ ...answers, [id]: wrong }).score, 24, id));
  }
  console.log(`${checks} checks passed`);
} finally { await rm(dir, { recursive: true, force: true }); }
