import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import * as esbuild from "esbuild";
import { JSDOM } from "jsdom";
const dir = "node_modules/.audit39";
fs.mkdirSync(dir, { recursive: true });
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
  TEST_LEVELS_39: levels,
  TEST_SOLUTIONS_39: solutions,
} = M;
assert.equal(sections.length, 40);
assert.equal(new Set(S.map((s) => s.sourceId)).size, 40);
assert(S.length >= 70 && S.length <= 125);
assert.equal(new Set(S.map((s) => s.id)).size, S.length);
const original = execFileSync(
  "git",
  ["show", "10d8939:src/lessons/lesson39/ledger39.ts"],
  { encoding: "utf8" },
);
assert.equal(
  fs.readFileSync("src/lessons/lesson39/ledger39.ts", "utf8"),
  original,
  "Source ledger must remain byte-for-byte unchanged",
);
const manifest = [];
for (const section of sections) {
  const pages = S.filter((s) => s.sourceId === section.id);
  const expected = section.units.map((_, i) => i);
  const actual = pages.flatMap((s) => s.page.units).sort((a, b) => a - b);
  assert.deepEqual(
    actual,
    section.id === "s35" ? [0, 1] : expected,
    section.id + " unit coverage",
  );
  assert.equal(
    pages.filter((s) => s.page.table).length,
    section.tableRows ? 1 : 0,
  );
  assert.equal(
    pages.filter((s) => s.page.extraTable).length,
    section.extraTableRows ? 1 : 0,
  );
  assert.deepEqual(
    pages.flatMap((s) => s.page.reveal || []).sort((a, b) => a - b),
    section.revealUnits?.map((_, i) => i) || [],
    section.id + " answer coverage",
  );
  for (const s of pages) {
    const html = M.renderToStaticMarkup(
      M.createElement(M.Step, { slide: s, onGoTest() {}, onGoSolutions() {} }),
    );
    const d = new JSDOM(html).window.document;
    for (const i of s.page.units)
      assert.equal(
        d.querySelectorAll(`[data-source-unit="${section.id}-unit-${i}"]`)
          .length,
        1,
        s.id + " rendered source atom",
      );
    manifest.push({
      id: s.id,
      source: section.id,
      units: s.page.units,
      reveal: s.page.reveal || [],
      table: !!s.page.table,
    });
  }
}
assert.equal(levels.length, 5);
assert.deepEqual(
  levels.map((l) => l.questions.length),
  [5, 5, 5, 5, 5],
);
assert.deepEqual(
  levels.flatMap((l) => l.questions.map((q) => q.n)),
  Array.from({ length: 25 }, (_, i) => i + 1),
);
assert.equal(solutions.length, 25);
assert(solutions.every((s) => s.answer && s.explanation.length > 40));
// Test data owns every source atom exactly once (intro + all five levels).
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
);
const model = Object.fromEntries(solutions.map((s) => [s.n, s.answer]));
assert.equal(M.gradeTest39(model).correct, 25);
const wrong = M.gradeTest39(
  Object.fromEntries(solutions.map((s) => [s.n, "nonsense"])),
);
assert.equal(wrong.correct, 0);
assert.equal(wrong.review, 5);
assert.equal(
  M.gradeTest39({ ...model, 8: "will not have been traveling" }).correct,
  25,
);
assert.equal(M.gradeTest39({ ...model, 7: "will have worked" }).correct, 25);
const testHtml = M.renderToStaticMarkup(
  M.createElement(M.Test, { onSubmitted() {}, onGoSolutions() {} }),
);
assert(!testHtml.includes("data-question-feedback"));
assert(!testHtml.includes("data-grade-summary"));
assert(!testHtml.includes("platform-authored-teacher-addition"));
// Follow static edges only, proving the initial student module graph excludes the protected key.
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
const entry = Object.keys(outputs).find((k) =>
  outputs[k].entryPoint?.endsWith("Lesson39.tsx"),
);
const visited = new Set();
function walk(k) {
  if (visited.has(k)) return;
  visited.add(k);
  for (const edge of outputs[k].imports)
    if (edge.kind !== "dynamic-import" && outputs[edge.path]) walk(edge.path);
}
walk(entry);
const initial = [...visited].flatMap((k) => Object.keys(outputs[k].inputs));
assert(
  !initial.some((p) =>
    /testKey39|solutionsData39|TeacherGuide39|SolutionsArea39/.test(p),
  ),
  "No protected answer modules in static graph",
);
fs.writeFileSync(
  "docs/lesson39-step-coverage.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `PASS Lesson 39: ${S.length} steps; 40 source records; all source units/tables/37 practice answers mapped once; 25 test atoms/questions/teacher keys; 25/25 model, 0/25 nonsense (5 human-review); alternatives; initial DOM and static bundle graph answer-free.`,
);
