// ============================================================
// Lesson 54 — Third Conditional: static/data regression audit
//   node scripts/audit-lesson54.mjs
// ============================================================
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");

let checks = 0;
const failures = [];
function check(label, fn) {
  try { fn(); checks++; } catch (err) { failures.push(`${label}: ${err.message}`); }
}

const dir = await mkdtemp(join(tmpdir(), "lesson54-audit-"));
try {
  const outfile = join(dir, "data.mjs");
  await esbuild.build({
    stdin: {
      contents: `
        export * from "./src/lessons/lesson54/content54.ts";
        export * from "./src/lessons/lesson54/practiceData54.ts";
        export * from "./src/lessons/lesson54/testData54.ts";
        export * from "./src/lessons/lesson54/testKey54.ts";
        export { SLIDES_54 } from "./src/lessons/lesson54/Lesson54.tsx";
      `,
      resolveDir: root,
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile,
    logLevel: "silent",
    loader: { ".css": "empty" },
  });
  const m = await import(pathToFileURL(outfile));
  const {
    PAGES_54, DIALOGUE_54, DIALOGUE_QA_54, READING_54, READING_AR_54, READING_QA_54,
    WRITING_PROMPTS_54, WRITING_START_54, WRITING_MODEL_54, SPEAKING_54, REVIEW_54,
    REVIEW_TABLE_54, SUMMARY_54, COMPLETED_54, ROADMAP_54,
    PRACTICE_54, PRACTICE_ANSWER_GROUPS_54, TEST_QUESTIONS_54, TEST_LEVELS_54,
    TEST_SOLUTIONS_54, gradeTest54, normalize54, SLIDES_54,
  } = m;

  // ---- 1) بنية الشرائح وكل الأقسام الـ27 ----
  check("unique slide ids", () => assert.equal(new Set(SLIDES_54.map((s) => s.id)).size, SLIDES_54.length));
  check("slide count >= 39", () => assert.ok(SLIDES_54.length >= 39, `got ${SLIDES_54.length}`));
  const markers = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳","㉑","㉒","㉓","㉔","㉕","㉖","㉗"];
  const sections = SLIDES_54.map((s) => s.section).join(" ");
  for (const marker of markers) check(`section ${marker} present`, () => assert.ok(sections.includes(marker), marker));
  check("27 numbered sections", () => assert.equal(markers.length, 27));
  check("source pages cover ①–⑯", () => {
    const pageSections = new Set(PAGES_54.map((p) => p.section));
    for (const marker of markers.slice(0, 16)) assert.ok([...pageSections].some((s) => s.startsWith(marker)), marker);
  });
  check("every page has blocks", () => assert.ok(PAGES_54.every((p) => p.blocks.length > 0)));
  check("formulas are LTR plain-text blocks", () => {
    const formulas = PAGES_54.flatMap((p) => p.blocks.filter((b) => b.kind === "formula"));
    assert.ok(formulas.length >= 8, `got ${formulas.length}`);
    assert.ok(formulas.every((b) => typeof b.text === "string" && b.text.trim().length > 0));
  });

  // ---- 2) المحادثة والقراءة ----
  check("dialogue lines", () => assert.equal(DIALOGUE_54.length, 10));
  check("dialogue comprehension", () => assert.equal(DIALOGUE_QA_54.length, 6));
  check("dialogue Q&A all answered", () => assert.ok(DIALOGUE_QA_54.every((x) => x.q && x.a)));
  check("reading English + Arabic", () => { assert.equal(READING_54.length, 7); assert.equal(READING_AR_54.length, 6); });
  check("reading comprehension", () => assert.equal(READING_QA_54.length, 8));
  check("reading Q&A all answered", () => assert.ok(READING_QA_54.every((x) => x.q && x.a)));

  // ---- 3) ⑲ التدريبات: 8 تدريبات / 58 سؤالًا + ⑳ الإجابات ----
  check("8 practice groups", () => assert.equal(PRACTICE_54.length, 8));
  check("practice item counts", () => assert.deepEqual(PRACTICE_54.map((g) => g.items.length), [10, 8, 8, 5, 5, 4, 10, 8]));
  check("58 practice questions", () => assert.equal(PRACTICE_54.reduce((a, g) => a + g.items.length, 0), 58));
  check("every practice item has an answer", () => assert.ok(PRACTICE_54.every((g) => g.items.every((i) => i.prompt && i.answer))));
  check("answer groups mirror practices", () => {
    assert.equal(PRACTICE_ANSWER_GROUPS_54.length, 8);
    assert.deepEqual(PRACTICE_ANSWER_GROUPS_54.map((g) => g.answers.length), [10, 8, 8, 5, 5, 4, 10, 8]);
    PRACTICE_54.forEach((g, gi) => g.items.forEach((item, i) => assert.equal(PRACTICE_ANSWER_GROUPS_54[gi].answers[i].answer, item.answer)));
  });
  check("explanations preserved", () => assert.ok(PRACTICE_54.some((g) => g.items.some((i) => i.explanation))));

  // ---- 4) ㉑–㉒ الاختبار النهائي ومفتاحه ----
  check("25 test questions", () => assert.equal(TEST_QUESTIONS_54.length, 25));
  check("five levels with counts 8/5/5/3/4", () => assert.deepEqual(TEST_LEVELS_54.map((l) => TEST_QUESTIONS_54.filter((q) => q.level === l.level).length), [8, 5, 5, 3, 4]));
  check("25 solutions", () => assert.equal(TEST_SOLUTIONS_54.length, 25));
  check("ids aligned", () => assert.deepEqual(TEST_QUESTIONS_54.map((q) => q.id), TEST_SOLUTIONS_54.map((s) => s.id)));
  check("every solution has a reason", () => assert.ok(TEST_SOLUTIONS_54.every((s) => s.model && s.why)));
  const modelAnswers = Object.fromEntries(TEST_SOLUTIONS_54.map((s) => [s.id, s.choice ?? s.model]));
  check("model answers score 25/25", () => assert.equal(gradeTest54(modelAnswers).score, 25));
  check("total is 25", () => assert.equal(gradeTest54(modelAnswers).total, 25));
  check("empty answers score 0", () => assert.equal(gradeTest54({}).score, 0));
  for (const q of TEST_QUESTIONS_54) {
    const wrong = q.type === "choice" ? "z" : "not an answer";
    check(`wrong ${q.id} scores 24`, () => assert.equal(gradeTest54({ ...modelAnswers, [q.id]: wrong }).score, 24, q.id));
  }
  for (const [id, alt] of Object.entries({
    q9: "If he had studied harder, he would have gotten better grades.",
    q10: "If we had left earlier, we wouldn't have missed the train.",
    q13: "If they hadn't invited us, we wouldn't have come to the party.",
    q16: "If he hadn't forgotten his wallet, he would have paid.",
    q19: "Second", q20: "Third Conditional", q21: "First",
    q22: "If I had woken up earlier, I would have arrived on time.",
    q24: "What would you have done if you had failed the test?",
  })) check(`alternative ${id} scores 25`, () => assert.equal(gradeTest54({ ...modelAnswers, [id]: alt }).score, 25, `${id}: ${normalize54(alt)}`));
  check("review flag for unmatched free text", () => {
    const r = gradeTest54({ ...modelAnswers, q25: "a totally different sentence" });
    assert.equal(r.results.find((x) => x.question.id === "q25").needsReview, true);
  });

  // ---- 5) ㉓–㉗ المهام والمراجعة والملخص والتقدم ----
  check("writing prompts + start + model", () => { assert.equal(WRITING_PROMPTS_54.length, 6); assert.equal(WRITING_START_54.length, 4); assert.ok(WRITING_MODEL_54.includes("If I had")); });
  check("speaking 7 questions", () => assert.equal(SPEAKING_54.length, 7));
  check("review pairs + table", () => { assert.equal(REVIEW_54.length, 4); assert.equal(REVIEW_TABLE_54.rows.length, 4); });
  check("summary 12 rules", () => assert.equal(SUMMARY_54.length, 12));
  check("completed lessons include 54", () => assert.equal(COMPLETED_54.length, 6));
  check("roadmap mixed conditional example", () => assert.ok(ROADMAP_54[0].en.includes("would be a doctor now")));

  // ---- 6) القواعد المعمارية ----
  const lesson54 = read("src/lessons/lesson54/Lesson54.tsx");
  const lesson1 = read("src/lessons/lesson1/Lesson1.tsx");
  const app = read("src/App.tsx");
  check("uses the original Lesson1Shell", () => assert.ok(lesson54.includes('from "../../shared/Lesson1Shell"')));
  check("uses the ORIGINAL SlideFrame from Lesson1", () => assert.ok(lesson54.includes('import { SlideFrame } from "../lesson1/Lesson1"')));
  check("Lesson1 exports SlideFrame (body untouched)", () => assert.ok(lesson1.includes("export function SlideFrame({")));
  check("no Lesson 1 duplicate frame created", () => assert.ok(!/function SlideFrame54|const SlideFrame54|SlideFrame52/.test(lesson54)));
  check("no <details>/<summary> in student UI", () => assert.ok(!/<details|<summary/.test(lesson54)));
  check("no source-reveal panel", () => assert.ok(!/نص\s+المصدر\s+الحرفي|اضغط\s+للعرض|source-reveal|data-reveal-source/.test(lesson54)));
  check("formula rendered as LTR text", () => assert.ok(lesson54.includes('data-formula="54"') && lesson54.includes('dir="ltr" lang="en" data-formula')));
  check("answer key imported only on submit", () => {
    const area = read("src/lessons/lesson54/TestArea54.tsx");
    assert.ok(area.includes('import("./testKey54")'));
    assert.ok(!area.includes("TEST_SOLUTIONS_54"));
  });
  check("App registers route 54", () => assert.ok(app.includes("route === 54") && app.includes('import Lesson54 from "./lessons/lesson54/Lesson54"')));
  check("App registers hub card 54", () => assert.ok(app.includes('n: 54,') && app.includes('href: "#/lesson/54"')));
  check("next lesson 55 link", () => assert.ok(lesson54.includes('href="#/lesson/55"')));
  check("progress 54 / 120 and 45%", () => assert.ok(lesson54.includes("54 / 120") && lesson54.includes("45%")));
  check("local answer persistence", () => assert.ok(read("src/lessons/lesson54/usePersistent54.ts").includes("localStorage")));
  check("lesson54.css scoped to .lesson54", () => {
    const css = read("src/lessons/lesson54/lesson54.css");
    assert.ok(css.includes(".lesson54 "));
    assert.ok(css.includes("#l54-main { margin-bottom: 5rem; }"));
  });
  check("shared architecture files untouched", () => {
    const { execFileSync } = require("node:child_process");
    const diff = execFileSync("git", ["diff", "main", "--", "src/shared", "src/index.css"], { cwd: root, encoding: "utf8" });
    assert.equal(diff.trim(), "");
  });
  check("Lesson1 change is export-only", () => {
    const { execFileSync } = require("node:child_process");
    const diff = execFileSync("git", ["diff", "main", "--", "src/lessons/lesson1/Lesson1.tsx"], { cwd: root, encoding: "utf8" });
    assert.equal(diff.split("\n").filter((l) => /^[+-]/.test(l) && !/^[+-]{3}/.test(l)).length, 2);
    assert.ok(diff.includes("+export function SlideFrame({"));
  });
} finally {
  await rm(dir, { recursive: true, force: true });
}

if (failures.length) {
  console.error(`✕ Lesson 54 audit FAILED (${checks} passed, ${failures.length} failed)`);
  for (const f of failures) console.error("  -", f);
  process.exit(1);
}
console.log(`✓ Lesson 54 audit passed: ${checks} assertions, 0 failures`);
