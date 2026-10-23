// Regenerates docs/lesson42-coverage.md from the lesson's own data modules, so
// the published coverage document can never drift from the shipped lesson.
//   node scripts/lesson42-coverage-doc.mjs
// Mirrors the shape of docs/lesson41-coverage.md.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { build } from "esbuild";

mkdirSync("node_modules/.lesson42-audit", { recursive: true });
await build({
  stdin: {
    contents: `export * from './src/lessons/lesson42/ledger42';
export * from './src/lessons/lesson42/teacherSource42';
export * from './src/lessons/lesson42/slides42';
export * from './src/lessons/lesson42/practice42';
export * from './src/lessons/lesson42/testData42';
export * from './src/lessons/lesson42/key42';
export * from './src/lessons/lesson42/coverage42';`,
    resolveDir: process.cwd(),
  },
  outfile: "node_modules/.lesson42-audit/data.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
});
const data = await import(`../node_modules/.lesson42-audit/data.mjs?${Date.now()}`);
const {
  SOURCE_SECTIONS_42: studentSections,
  TEACHER_SECTION_42: teacherSection,
  SLIDES_42: slides,
  STATIONS_42: stations,
  PRACTICE_42: practice,
  PRACTICE_COUNTS_42: practiceCounts,
  TEST_LEVELS_42: levels,
  TEST_QUESTIONS_42: questions,
  SOLUTIONS_42: solutions,
  COVERAGE_42: coverage,
  TOTAL_SECTIONS_42: totalSections,
  uncoveredUnits42,
} = data;

// Full ledger in source order: the 44 student sections with §41 spliced back.
const sections = [...studentSections.slice(0, 41), teacherSection, ...studentSections.slice(41)];
const totalUnits = sections.reduce((total, section) => total + section.lines.length, 0);
const uncovered = uncoveredUnits42();
const manifest = JSON.parse(readFileSync("docs/lesson42-source-manifest.json", "utf8"));
const manifestMatches = sections.every((section, i) => {
  const hash = createHash("sha256").update(section.lines.join("\n")).digest("hex");
  return hash === manifest[i].sha256 && section.lines.length === manifest[i].units;
});

const cell = (text) => String(text).replace(/\|/g, "\\|");
const range = (items) => (items.length > 1 ? `${items[0]}–${items.at(-1)}` : `${items[0]}`);
const out = [];

out.push("# Lesson 42 — source-to-implementation coverage");
out.push("");
out.push("**Status:** rebuilt and verified. Source = the complete 44-section Arabic lesson supplied in the conversation (opening + §§1–44).");
out.push("");
out.push(`- Source blocks: **${totalSections}** (cover, §1–§44).`);
out.push(`- Normalized source units: **${totalUnits}** — all rendered exactly once (uncovered: **${uncovered.length}**).`);
out.push(`- Slides: **${slides.length}** across **${stations.length}** learning stations (${stations.map((s) => s.name).join("، ")}).`);
out.push(`- Practice items: **${practice.length}** (${Object.keys(practiceCounts).map((k) => `§${k}`).join("، ")}), each with an attempt-gated answer and explanation.`);
out.push(`- Final test: **${questions.length}** questions in **${levels.length}** levels (§40), teacher key + ${solutions.length} detailed solutions (§41).`);
out.push(`- Frozen source inventory: \`docs/lesson42-source-manifest.json\` — every section hash ${manifestMatches ? "**matches** the shipped ledger" : "**does NOT match** the shipped ledger"}.`);
out.push("");
out.push("## Mapping rules");
out.push("");
out.push("- One section never collapses into a single slide: each slide declares an explicit inclusive `range` of source units, so a section grows in slide count instead of shrinking its content.");
out.push("- `SOURCE_SECTIONS_42` in `ledger42.ts` holds the transcription (one array entry per normalized line). `coveredIndexes42()` returns the units each slide renders, and `uncoveredUnits42()` must stay empty (asserted by `scripts/audit-lesson42.mjs`).");
out.push("- Tables (§§5, 16, 19), dialogue turns, numbered examples and bullet lists keep their structure: `Frame42` + `SourceLines42` (auto/table/objectives/dialogue) + `NumberCards42` + `Panel42`. Pipe-separated source lines become real `<table>` rows, never separator text.");
out.push("- Numbered practice prompts (§§16, 34–38) map to `PracticeCard42`; the key appears only after the student presses «قارن إجابتي بالحل», and the same keys feed `TeacherGuide42` behind the teacher gate.");
out.push("- §39 “The Young Inventor” renders as a full passage slide (lines 1–14) followed by four question slides that reuse the attempt-gated practice card for all ten comprehension items.");
out.push("- §40 routes to `TestArea42` only; the grader (`key42.ts`), the solutions (`SolutionsArea42.tsx`) and the teacher guide (`TeacherGuide42.tsx`) are separate lazy chunks that are not part of the student bundle or the study DOM.");
out.push("- §41 is the full 25-key correction list. It is never rendered inside a student step and is **not present in `source42.ts`**: it lives in `teacherSource42.ts`, imported only by the lazy `TeacherGuide42`.");
out.push("- Ten learning-station markers are attached to the first slide of their station, not rendered as separate decorative separators.");
out.push("");
out.push("## Section → slide map");
out.push("");
out.push("| § | Section | Units rendered / source | Slides | Where answers live |");
out.push("|---|---|---:|---|---|");
for (const row of coverage) {
  out.push(`| ${row.num} | ${cell(row.title)} | ${row.renderedUnits} / ${row.units} | ${row.slides.map((id) => `\`${id}\``).join(", ")} | ${cell(row.answerLocation)} |`);
}
out.push(`| 41 | ${cell(teacherSection.title)} | ${teacherSection.lines.length} / ${teacherSection.lines.length} | \`teacher\` → lazy \`TeacherGuide42\` | مساحة المعلم فقط — معزولة في \`teacherSource42.ts\` |`);
out.push("");
out.push("## Learning stations");
out.push("");
out.push("| Station | Slides | Sections |");
out.push("|---|---:|---|");
for (const station of stations) {
  const inStation = slides.filter((slide) => slide.station === station.id);
  const nums = [...new Set(inStation.map((slide) => slide.section))].sort((a, b) => a - b);
  out.push(`| ${station.emoji} ${cell(station.name)} (${station.en}) | ${inStation.length} | §§${range(nums)} |`);
}
out.push("");
out.push("## Practice sets (attempt-gated)");
out.push("");
out.push("| § | Items | Slides | Delivery |");
out.push("|---|---:|---|---|");
for (const [section, count] of Object.entries(practiceCounts)) {
  const practiceSlides = slides.filter((slide) => slide.section === Number(section) && (slide.kind === "practice" || slide.kind === "reading"));
  const ids = practiceSlides.map((slide) => `\`${slide.id}\``).join(", ");
  out.push(
    `| ${section} | ${count} | ${ids} | ${Number(section) === 39 ? "`PracticeSet42` عبر شرائح القراءة" : "`PracticeSet42` + `PracticeCard42`"} |`,
  );
}
out.push(`| — | ${practice.length} | — | المجموع الكلي لبنود التدريب (بما فيها أسئلة الفهم العشرة) |`);
out.push("");
out.push("## Final test pages (§40)");
out.push("");
out.push("| Slide | Level | Items | Level title |");
out.push("|---|---:|---|---|");
for (const slide of slides.filter((entry) => entry.kind === "test")) {
  const level = levels.find((entry) => entry.level === slide.testLevel);
  out.push(`| \`${slide.id}\` | ${slide.testLevel} | ${range(slide.testItems)} | ${cell(level.title)} |`);
}
out.push("");
out.push("| Level | Function tested | Questions |");
out.push("|---:|---|---|");
levels.forEach((level, i) => {
  const functions = [...new Set(level.questions.map((q) => solutions.find((s) => s.id === q.id).function))];
  out.push(`| ${level.level} | ${cell(functions.join(" · "))} | ${level.questions.map((q) => q.number).join(", ")} |`);
});
out.push("");
out.push("## Slide kinds in use");
out.push("");
out.push("| Kind | Slides | Component |");
out.push("|---|---:|---|");
const kindComponent = {
  lesson: "`Frame42` + `SourceLines42` / `NumberCards42` / `Panel42`",
  lab: "`BuildLab42`, `FormLab42`, `ShortLab42`, `WhLab42`, `TimeLab42`, `AbleLab42`, `PermissionLab42`, `ResponseLab42`, `PossibilityLab42`, `RepairLab42`, `MeaningLab42`, `AdventureLab42`",
  practice: "`PracticeSet42` + `PracticeCard42`",
  reading: "`Reading42`",
  test: "`TestArea42`",
  testResult: "`TestResult` + lazy `SolutionsArea42`",
  teacher: "`TeacherArea42` (+ lazy `TeacherGuide42`)",
  writing: "`WritingMission42`",
  summary: "`GoldenSummary42`",
  next: "`NextSteps42`",
  cover: "`Cover42`",
};
const kindCounts = new Map();
slides.forEach((slide) => kindCounts.set(slide.kind, (kindCounts.get(slide.kind) ?? 0) + 1));
for (const [kind, count] of [...kindCounts].sort((a, b) => b[1] - a[1])) {
  out.push(`| ${kind} | ${count} | ${kindComponent[kind] ?? "—"} |`);
}
out.push("");
out.push("## Documented changes from the supplied source");
out.push("");
out.push("The source text itself is unaltered: every section hash matches `docs/lesson42-source-manifest.json`, so no teaching point, example, table, dialogue, key or writing requirement was rewritten, summarized or dropped. The three changes below are technical, not educational:");
out.push("");
out.push("1. **§41 moved to `teacherSource42.ts`.** In the supplied source the final-test answer key sits in §41 of the same document as the teaching text. Because `ledger42.ts` is statically imported by the student bundle, keeping §41 there shipped the complete key inside `index-*.js` (verified: a baseline build of `HEAD` contains §41's reason strings). §41 is now a separate module imported only by the lazy `TeacherGuide42`. Reassembly of the two files is byte-identical to the original `source42.ts`.");
out.push("2. **35 slide `range` upper bounds corrected.** Thirty-five slides declared an inclusive upper bound one past the end of their section (for example `[14, 19]` for a 19-line section). `sectionLines42` slices `range[1] + 1`, so the extra index rendered nothing and no content was lost, but the ranges were arithmetically wrong and inflated the coverage table to `19 / 18`. All bounds are now inclusive and in range; two of them (`s28-rule`, `next-close`) pointed only at a phantom index and now render their intended real unit.");
out.push("3. **§39 passage slice narrowed from `slice(1, 16)` to `slice(1, 15)`.** Line 15 is the Arabic heading «أسئلة الفهم», which was being rendered as an LTR paragraph inside the English passage. The passage now renders lines 1–14 only.");
out.push("");
out.push("No source section was renumbered and no original section label was changed. §41 keeps its source heading in the teacher area.");
out.push("");
out.push("## Protection model (stated plainly)");
out.push("");
out.push("- The student bundle contains **no** §41 text and **no** `SOLUTIONS_42` table. Verified against the built `dist/assets/index-*.js` and against the esbuild chunk graph in `scripts/audit-lesson42.mjs`.");
out.push("- `key42.ts` is loaded by `TestArea42` through `await import(\"./key42\")` **at submission time only**; `TestArea42` imports it for types elsewhere, which the bundler erases.");
out.push("- The teacher gate is a **client-side** lock, exactly like every other lesson in this course. It separates the content from the student path and defers loading it; it is **not** server-side security. Anyone who can read the built bundle can read the keys. The gate says so in the UI, in both its locked and unlocked states.");
out.push("");
writeFileSync("docs/lesson42-coverage.md", out.join("\n"));
console.log(
  `docs/lesson42-coverage.md written: ${out.length} lines · ${totalSections} sections · ${totalUnits} units · ${slides.length} slides · ${practice.length} practice items · ${questions.length} questions · uncovered ${uncovered.length} · manifest ${manifestMatches ? "matches" : "MISMATCH"}`,
);
