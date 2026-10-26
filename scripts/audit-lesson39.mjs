// ============================================================
// Lesson 39 — content / test / isolation audit
//
// يثبت هذا التدقيق أربعة أشياء لا يمكن إثباتها بالعين:
//   1) نص المصدر لم يُمسّ: بصمة sha256 لملف ledger39.ts مطابقة للبصمة المسجّلة،
//      وكل سطر مصدري (unit) يظهر في خطوة واحدة بالضبط، وكل جدول مرة واحدة.
//   2) كل خطوة تُرسم فعليًا: نُصيّر `Steps39` لكل slide ونتأكد من وجود
//      `data-source-unit` الخاص بكل سطر، ومن ظهور أسطر المفتاح في خطوات
//      الكشف فقط (§29 · §30 · §31 · §32 · §34).
//   3) الاختبار النهائي: 25 سؤالًا في 5 مستويات، معرّفات ثابتة، مفتاح واحد
//      لكل سؤال، و25 شرحًا، ولا أثر لأي إجابة في DOM الاختبار قبل التسليم.
//   4) العزل: رسم الوحدات الساكنة من `Lesson39.tsx` لا يصل إلى testKey39
//      ولا solutionsData39 ولا TeacherGuide39/SolutionsArea39.
//
//   node scripts/audit-lesson39.mjs
// ============================================================
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import * as esbuild from "esbuild";
import { JSDOM } from "jsdom";

const dir = "node_modules/.audit39";
fs.mkdirSync(dir, { recursive: true });

/** بصمة نص المصدر المعتمد (ledger39.ts) — لا تُحدَّث إلا بتغيير مصدر مسموح. */
const LEDGER_SHA256 = "d0b59de16211c8914df92e90f3b1de7cf61d6f22c2da42231005b92e156eee4e";

const ledger = fs.readFileSync("src/lessons/lesson39/ledger39.ts");
assert.equal(
  crypto.createHash("sha256").update(ledger).digest("hex"),
  LEDGER_SHA256,
  "ledger39.ts must stay byte-for-byte identical to the audited source ledger",
);

await esbuild.build({
  stdin: {
    contents: `export * from './src/lessons/lesson39/data';export * from './src/lessons/lesson39/ledger39';export * from './src/lessons/lesson39/testData39';export * from './src/lessons/lesson39/testKey39';export * from './src/lessons/lesson39/solutionsData39';export {default as Step} from './src/lessons/lesson39/Steps39';export {default as Test} from './src/lessons/lesson39/TestArea39';export {renderToStaticMarkup} from 'react-dom/server';export {createElement} from 'react';`,
    resolveDir: process.cwd(),
  },
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  outfile: dir + "/audit.mjs",
  logLevel: "silent",
});
const M = await import("../" + dir + "/audit.mjs?" + Date.now());
const dom = new JSDOM("", { url: "http://localhost" });
globalThis.sessionStorage = dom.window.sessionStorage;

const {
  SLIDES_39: S,
  SOURCE_SECTIONS_39: sections,
  STATIONS_39: stations,
  STEP_COUNT_39: stepCount,
  TEST_LEVELS_39: levels,
  TEST_SOLUTIONS_39: solutions,
} = M;

// ---------------------------------------------------------- 1) المصدر
assert.equal(sections.length, 40, "ledger must expose 40 source records (cover + §1…§39)");
assert.equal(stepCount, S.length);
assert.equal(stepCount, 75, "Lesson 39 ships exactly 75 learning steps");
assert.equal(new Set(S.map((s) => s.id)).size, S.length, "step ids are unique");
assert.equal(new Set(S.map((s) => s.rail)).size, S.length, "rail labels are unique");
assert.equal(stations.length, 16, "16 observatory stations");
assert.deepEqual(
  stations.flatMap((st) => st.stepIds).sort(),
  S.map((s) => s.id).sort(),
  "every step belongs to exactly one station",
);
for (const s of S) {
  assert(s.title.trim() && s.subtitle.trim() && s.rail.trim(), `${s.id} has header copy`);
  assert(s.units.length > 0, `${s.id} renders at least one source unit`);
}

const manifest = [];
for (const section of sections) {
  const pages = S.filter((s) => s.sourceId === section.id);
  assert(pages.length > 0, section.id + " appears in at least one step");
  const expected = section.units.map((_, i) => i).sort((a, b) => a - b);
  const actual = pages.flatMap((s) => s.units).sort((a, b) => a - b);
  if (section.id === "s35") {
    // أسطر الاختبار الرسمي تُعرض داخل منطقة الاختبار (25 سؤالًا) لا في الخطوات،
    // وتُدقَّق واحدًا واحدًا مع atoms الاختبار أدناه.
    assert.deepEqual(actual, [0, 1, 2], "test section shows only its opening lines in the lesson");
  } else {
    assert.deepEqual(actual, expected, section.id + " source units covered exactly once");
  }
  assert.equal(
    pages.filter((s) => s.table).length,
    section.tableRows ? 1 : 0,
    section.id + " table rendered once",
  );
  assert.equal(
    pages.filter((s) => s.extraTable).length,
    section.extraTableRows ? 1 : 0,
    section.id + " extra table rendered once",
  );
  assert.deepEqual(
    pages.flatMap((s) => s.reveal).sort((a, b) => a - b),
    section.revealUnits?.map((_, i) => i).sort((a, b) => a - b) || [],
    section.id + " answer-key lines covered once",
  );
  for (const s of pages) {
    const html = M.renderToStaticMarkup(
      M.createElement(M.Step, { slide: s, onGoTest() {}, onGoSolutions() {}, onGoTeacher() {} }),
    );
    const d = new JSDOM(html).window.document;
    for (const i of s.units) {
      assert.equal(
        d.querySelectorAll(`[data-source-unit="${section.id}-unit-${i}"]`).length,
        1,
        `${s.id} renders source atom ${section.id}-unit-${i}`,
      );
    }
    assert.equal(
      d.querySelectorAll(`[data-source-section="${section.id}"]`).length,
      1,
      s.id + " has one source block",
    );
    if (s.reveal.length) {
      // قبل المحاولة: لا سطر واحد من مفتاح المصدر في DOM، وبوابة صريحة بدلًا منه.
      assert.equal(
        d.querySelectorAll("[data-answer-key-for]").length,
        0,
        `${s.id} must not render its source key before an attempt`,
      );
      for (const i of s.reveal) {
        assert.equal(
          d.querySelectorAll(`[data-source-unit="${section.id}-reveal-${i}"]`).length,
          0,
          `${s.id} must hide reveal atom ${i} until the learner attempts`,
        );
      }
      assert(
        /ANSWER GATE|حلول المصدر مقفلة/.test(d.body.textContent || ""),
        `${s.id} shows the answer gate instead of the key`,
      );
    }
    manifest.push({
      id: s.id,
      step: s.step,
      station: s.station,
      source: section.id,
      units: s.units,
      reveal: s.reveal,
      table: !!s.table,
      extraTable: !!s.extraTable,
      instrument: s.instrument,
    });
  }
}

// ---------------------------------------------------------- 2) الاختبار
assert.equal(levels.length, 5);
assert.deepEqual(levels.map((l) => l.questions.length), [5, 5, 5, 5, 5]);
assert.deepEqual(
  levels.flatMap((l) => l.questions.map((q) => q.n)),
  Array.from({ length: 25 }, (_, i) => i + 1),
  "question ids are stable and unique 1…25",
);
assert.equal(solutions.length, 25);
assert(solutions.every((s) => s.answer && s.explanation.length > 40));
assert.equal(M.TEST_COUNT_39, 25);
assert.equal(M.TEST_LEVEL_COUNT_39, 5);

const testAtoms = M.TEST_INTRO_39.map((x) => x.sourceUnitIndex);
for (const l of levels) {
  testAtoms.push(l.titleUnitIndex);
  if (l.instructionUnitIndex != null) testAtoms.push(l.instructionUnitIndex);
  for (const q of l.questions) {
    testAtoms.push(...q.promptUnitIndexes);
    q.options?.forEach((o) => testAtoms.push(o.sourceUnitIndex));
    if (q.marker) testAtoms.push(q.marker.sourceUnitIndex);
  }
  l.trailing?.forEach((x) => testAtoms.push(x.sourceUnitIndex));
}
assert.deepEqual(
  testAtoms.sort((a, b) => a - b),
  sections.find((s) => s.id === "s35").units.map((_, i) => i),
  "the formal test consumes every §35 source line once",
);

// لا مفتاح في بيانات الاختبار: الأسماء المسموحة فقط.
const allowedQuestionKeys = new Set([
  "n", "type", "promptLines", "promptUnitIndexes", "options", "marker", "fieldLabel",
]);
for (const q of levels.flatMap((l) => l.questions)) {
  for (const k of Object.keys(q)) assert(allowedQuestionKeys.has(k), `unexpected test field: ${k}`);
  for (const o of q.options ?? []) assert.deepEqual(Object.keys(o).sort(), ["label", "sourceUnitIndex", "text"]);
}
assert(!/answer|explanation|correct|key\b/i.test(JSON.stringify(levels)), "no key material in testData39");

const model = Object.fromEntries(solutions.map((s) => [s.n, s.answer]));
assert.equal(M.gradeTest39(model).correct, 25);
const wrong = M.gradeTest39(Object.fromEntries(solutions.map((s) => [s.n, "nonsense"])));
assert.equal(wrong.correct, 0);
assert.equal(wrong.review, 5);
assert.equal(M.gradeTest39({ ...model, 8: "will not have been traveling" }).correct, 25);
assert.equal(M.gradeTest39({ ...model, 7: "will have worked" }).correct, 25);

const testHtml = M.renderToStaticMarkup(
  M.createElement(M.Test, { onSubmitted() {}, onGoSolutions() {} }),
);
assert(!testHtml.includes("data-question-feedback"));
// لا أثر لأي مادة من مفتاح التصحيح في DOM الاختبار قبل التسليم.
// تُفحص (أ) كل التفسيرات — لا تظهر في نص أي سؤال، (ب) الإجابات الجملية
// الكاملة — أما إجابات الاختيار من متعدد («B. been») فهي نفس نص الخيارات
// المشروعة، فيغطيها فحص حزمة الوحدات أدناه لا فحص النص.
const explanationSentinels = solutions.map((entry) => entry.explanation).filter((text) => text.length >= 30);
const sentenceAnswers = solutions
  .map((entry) => entry.answer)
  .filter((answer) => answer.length >= 12 && !/^[A-D]\.\s/.test(answer));
assert(explanationSentinels.length === 25, "every solution carries an explanation sentinel");
assert(sentenceAnswers.length >= 8, "enough full-sentence answers to test the pre-submit DOM");
const leakedExplanations = explanationSentinels.filter((text) => testHtml.includes(text));
assert.deepEqual(leakedExplanations, [], "no explanation text may appear in the pre-submit test DOM");
const leakedAnswers = sentenceAnswers.filter((answer) => testHtml.includes(answer));
assert.deepEqual(leakedAnswers, [], "no full-sentence answer may appear in the pre-submit test DOM");
assert(!testHtml.includes("data-answer-key-for"), "the test must not mount a source-key block");
assert(!testHtml.includes("data-grade-summary"));
assert(!/will have been \+ V-ing/.test(testHtml.replace(/[^A-Za-z+ -]/g, "")), "no per-question answer copy");
assert(!testHtml.includes("platform-authored-teacher-addition"));

// ---------------------------------------------------------- 3) العزل الساكن
const graph = await esbuild.build({
  entryPoints: ["src/lessons/lesson39/Lesson39.tsx"],
  bundle: true,
  splitting: true,
  format: "esm",
  platform: "browser",
  jsx: "automatic",
  write: false,
  outdir: dir + "/graph",
  metafile: true,
  logLevel: "silent",
});
const outputs = graph.metafile.outputs;
const entry = Object.keys(outputs).find((k) => outputs[k].entryPoint?.endsWith("Lesson39.tsx"));
assert(entry, "Lesson39.tsx is the bundle entry");
const visited = new Set();
function walk(k) {
  if (visited.has(k)) return;
  visited.add(k);
  for (const edge of outputs[k].imports) if (edge.kind !== "dynamic-import" && outputs[edge.path]) walk(edge.path);
}
walk(entry);
const initial = [...visited].flatMap((k) => Object.keys(outputs[k].inputs));
for (const banned of ["testKey39", "solutionsData39", "TeacherGuide39", "SolutionsArea39", "TeacherArea39"])
  assert(!initial.some((p) => p.includes(banned)), `${banned} must stay out of the initial student graph`);
// بنك الأسئلة نفسه يُحمَّل عند فتح منطقة الاختبار فقط (lazy)، والمهم أن الإجابات ليست في أي مسار أوّلي.

// حزمة الاختبار تُحمَّل عند فتح منطقة الاختبار — أي استيراد ساكن للمفتاح
// داخلها يجعل الأسئلة تجلب الإجابات قبل التسليم، ولذلك تُفحص حزمتها وحدها.
const testChunk = Object.keys(outputs).find((k) => Object.keys(outputs[k].inputs).some((p) => p.endsWith("TestArea39.tsx")));
assert(testChunk, "TestArea39.tsx is bundled as its own chunk");
const testVisited = new Set();
(function walkTest(k) {
  if (testVisited.has(k)) return;
  testVisited.add(k);
  for (const edge of outputs[k].imports) if (edge.kind !== "dynamic-import" && outputs[edge.path]) walkTest(edge.path);
})(testChunk);
const testInputs = [...testVisited].flatMap((k) => Object.keys(outputs[k].inputs));
for (const banned of ["testKey39", "solutionsData39", "TeacherGuide39", "SolutionsArea39"])
  assert(
    !testInputs.some((p) => p.includes(banned)),
    `${banned} must stay out of the test chunk (it is fetched before submission)`,
  );

const tracked = execFileSync("git", ["status", "--porcelain", "src/lessons/lesson39/ledger39.ts"], { encoding: "utf8" });
assert.equal(tracked.trim(), "", "ledger39.ts has no working-tree edits");

fs.writeFileSync("docs/lesson39-step-coverage.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `PASS Lesson 39: ${stepCount} steps · ${stations.length} stations · ${sections.length} source records · every source unit/table/key-line mapped once · 25 questions in 5×5 · 25 keys · 25/25 model · 0/25 nonsense (5 human-review) · alternatives accepted · pre-submit DOM answer-free · answer modules outside the initial bundle graph.`,
);
