// ============================================================
// Lesson 44 — Static, Ledger, Grading & Scope Audit
// (The Obligation Command Center — MUST & HAVE TO)
//
//   node scripts/audit-lesson44.mjs
// ============================================================
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";
import { build } from "esbuild";

mkdirSync("node_modules/.lesson44-audit", { recursive: true });
await build({
  stdin: {
    contents: `export * from './src/lessons/lesson44/ledger44';
export * from './src/lessons/lesson44/teacherSource44';
export * from './src/lessons/lesson44/data';
export * from './src/lessons/lesson44/practiceData44';
export * from './src/lessons/lesson44/practiceNotes44';
export * from './src/lessons/lesson44/testData44';
export * from './src/lessons/lesson44/testKey44';
export * from './src/lessons/lesson44/solutionsData44';
export * from './src/lessons/lesson44/coverage44';`,
    resolveDir: process.cwd(),
  },
  outfile: "node_modules/.lesson44-audit/data.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "error",
});

const data = await import(`../node_modules/.lesson44-audit/data.mjs?${Date.now()}`);
let checks = 0;
const ok = (condition, message) => {
  checks++;
  assert.ok(condition, message);
};

const {
  SOURCE_SECTIONS_44: sections,
  STATIONS_44: stations,
  DUTY_CHANNELS_44: channels,
  NEXT_LESSON_44: next,
  TEACHER_SECTIONS_44: teacherSections,
  LESSON_TITLE_44: title,
  LESSON_STEP_COUNT_44: stepCount,
  LESSON_SECTION_COUNT_44: sectionCount,
  LESSON_IDENTITY_44: identity,
  STEP_DESCRIPTORS_44: descriptors,
  PRACTICE_44: practice,
  checkPracticeAnswer44,
  practiceReason44,
  TEST_LEVELS_44: levels,
  TEST_QUESTIONS_44: questions,
  TEST_QUESTION_COUNT_44: questionCount,
  TEST_SOLUTIONS_44: solutions,
  testComplete44,
  gradeTest44,
  COVERAGE_44: coverage,
  COVERAGE_ACCURACY_NOTES_44: notes,
  COVERAGE_PLATFORM_ADDITIONS_44: additions,
  station44,
  unitId44,
} = data;

// ---------------- 1) Authoritative Source Ledger ----------------
const FROZEN_LINE_COUNTS = [
  27, 13, 21, 21, 14, 18, 19, 17, 21, 18, 18, 13, 18, 14, 16, 16, 19, 18, 15, 18,
  15, 16, 13, 15, 18, 15, 18, 26, 27, 17, 12, 12, 17, 39, 62, 3, 24, 43, 16,
];
ok(sections.length === 39, `39 source sections (cover + 1..38), got ${sections.length}`);
ok(sections.every((s, i) => s.num === i), "sections are numbered 0–38 in order");
ok(
  sections.every((s, i) => s.lines.length === FROZEN_LINE_COUNTS[i]),
  `every section keeps its exact source line count (got ${sections.map((s) => s.lines.length).join(",")})`
);
const totalUnits = sections.reduce((sum, s) => sum + s.lines.length, 0);
ok(totalUnits === 762, `762 student source lines carried as units (got ${totalUnits})`);
ok(
  teacherSections.length === 1 && teacherSections[0].num === 35 && teacherSections[0].lines.length === 49,
  `teacherSource44 carries the full 49-line Teacher Space section (got ${teacherSections[0]?.lines.length})`
);
ok(
  sections.every(
    (s) =>
      s.units.length === s.lines.length &&
      new Set(s.units.map((u) => u.id)).size === s.units.length
  ),
  "each section exposes one distinct unit per line"
);
ok(
  sections.every((s) =>
    s.units.every((u) => u.text === s.lines[Number(u.id.split("-u")[1]) - 1])
  ),
  "unit ids map 1:1 to their source line"
);
ok(
  !readFileSync("src/lessons/lesson44/source44.ts", "utf8").match(/[\u202a-\u202e\u2066-\u2069]/),
  "no Unicode BIDI control characters in source44.ts"
);
ok(unitId44(0, 0) === "cover-u1" && unitId44(27, 0) === "s27-u1", "unitId44 convention preserved");

// ---------------- 2) Stations, Channels & Step Descriptors ----------------
ok(stations.length === 13, `13 learning stations (got ${stations.length})`);
ok(
  stations.every((s, i) => s.start === (i === 0 ? 0 : stations[i - 1].end + 1)),
  "stations tile steps 0..38 without gaps or overlaps"
);
ok(stations[stations.length - 1].end === 38, "final station ends at step 38");
ok(station44(0) === stations[0] && station44(38) === stations[12], "station44 maps steps cleanly");
ok(stepCount === 39 && sectionCount === 39 && descriptors.length === 39, "39 step descriptors");
ok(
  Object.keys(channels).length === 7 &&
    ["charter", "must", "haveto", "prohibit", "optional", "past", "future"].every((k) => k in channels),
  "all 7 Obligation Command Center semantic channels registered"
);
ok(
  title === "MUST & HAVE TO" && identity === "The Obligation Command Center",
  "lesson identity set to The Obligation Command Center"
);
ok(next.status === "planned-not-implemented" && next.label.includes("45"), "Lesson 45 stays planned only");

// ---------------- 3) Practice Bank §§28–32 & Flexible Evaluator ----------------
ok(practice.length === 25, `25 practice items (got ${practice.length})`);
ok([28, 29, 30, 31, 32].every((n) => practice.filter((p) => p.section === n).length === 5), "5 items per exercise section");
ok(
  practice.every((p) => checkPracticeAnswer44(p, p.sourceAnswer)),
  "checkPracticeAnswer44 accepts every canonical sourceAnswer"
);
ok(
  checkPracticeAnswer44(practice.find((p) => p.id === "p29-1"), "must not") &&
    checkPracticeAnswer44(practice.find((p) => p.id === "p29-2"), "do not have to"),
  "checkPracticeAnswer44 accepts valid uncontracted & full-sentence forms"
);
ok(
  practice.every((p) => practiceReason44(p.section, p.number) !== "راجع القاعدة في هذا القسم."),
  "every practice item has a dedicated grammar explanation"
);

// ---------------- 4) Final Test Data Separation & Lazy Grading Engine ----------------
const rawTestData = readFileSync("src/lessons/lesson44/testData44.ts", "utf8");
const rawTestArea = readFileSync("src/lessons/lesson44/TestArea44.tsx", "utf8");
ok(!/solutionsData44|Source key:|gradeTest44/.test(rawTestData), "testData44 contains zero answer keys or grading logic");
ok(!/solutionsData44|Source key:/.test(rawTestArea), "TestArea44 does not import solutionsData44");
ok(/import\(["']\.\/testKey44["']\)/.test(rawTestArea), "TestArea44 lazy-loads testKey44 only on submit");

ok(levels.length === 5 && questionCount === 25 && questions.length === 25, "5 levels and 25 test questions");
ok(questions[8].fields.length === 2, "Q9 exposes two explicit auxiliary/verb fields");
ok(
  questions.slice(20, 25).every((q) => q.lines.length >= 1),
  "Level 5 questions Q21–Q25 display their dialogue lines inline"
);
const fullDummy = Object.fromEntries(questions.flatMap((q) => q.fields.map((_, i) => [`${q.id}-${i}`, "x"])));
ok(testComplete44(fullDummy), "testComplete44 requires every field");
const missingOne = { ...fullDummy };
delete missingOne["q25-0"];
ok(!testComplete44(missingOne), "missing any single field keeps test incomplete");

// Canonical 25/25 score check
const canonicalAnswers = {
  "q1-0": "B. must",
  "q2-0": "B. has to",
  "q3-0": "B. Does",
  "q4-0": "A. had to",
  "q5-0": "C. have to",
  "q6-0": "mustn't",
  "q7-0": "doesn't have to",
  "q8-0": "had to",
  "q9-0": "Did",
  "q9-1": "have to",
  "q10-0": "won't have to",
  "q11-0": "He must study harder.",
  "q12-0": "She has to wear a uniform.",
  "q13-0": "Does he have to leave now?",
  "q14-0": "I didn't have to work yesterday.",
  "q15-0": "She will have to finish the project.",
  "q16-0": "الأولى تعني المنع القاطع، والثانية تعني عدم الضرورة والاختيار.",
  "q17-0": "لأن MUST ليس لها ماض ولا توجد musted، فنستخدم HAD TO في الماضي.",
  "q18-0": "نعم، كلتاهما صحيحة في القوانين والتعليمات الرسمية واليومية.",
  "q19-0": "الأولى ضرورة يؤكدها المتحدث بدافع شخصي، والثانية التزام فرضه ظرف خارجي وهو الامتحان.",
  "q20-0": "لا تعني ذلك؛ الجملة تدل فقط على أن إنهاء التقرير لم يكن إلزاميًا أمس.",
  "q21-0": "has to",
  "q22-0": "Do",
  "q23-0": "don't",
  "q24-0": "mustn't",
  "q25-0": "had to",
};
const perfectReport = gradeTest44(canonicalAnswers);
ok(perfectReport.score === 25 && perfectReport.total === 25, `canonical answers score 25/25 (got ${perfectReport.score}, wrong: ${perfectReport.wrongIds.join(",")})`);

// Equivalent valid forms check
const altAnswers = {
  ...canonicalAnswers,
  "q6-0": "must not",
  "q7-0": "does not have to",
  "q9-1": "have to pay",
  "q10-0": "will not have to",
  "q16-0": "First is forbidden/prohibition, second is not necessary/optional",
  "q17-0": "Because must has no past form, so we use had to",
  "q18-0": "Yes, both can be used in rules and regulations",
  "q19-0": "First is personal speaker emphasis, second is an external exam requirement",
  "q20-0": "No, it only means finishing was not obligatory; they might have finished it",
  "q21-0": "has to arrive",
  "q22-0": "Do we",
  "q23-0": "don't have to",
  "q24-0": "must not",
  "q25-0": "had to bring",
};
const altReport = gradeTest44(altAnswers);
ok(altReport.score === 25, `valid equivalent forms also score 25/25 (got ${altReport.score})`);

const emptyReport = gradeTest44({});
ok(emptyReport.score === 0, "empty answers score 0/25");

ok(solutions.length === 25, "25 structured solutions in solutionsData44");
ok(
  solutions.every((s, i) => s.id === `q${i + 1}` && s.number === i + 1 && s.answer && s.reason),
  "solutions align 1:1 with Q1–Q25"
);

// ---------------- 5) Coverage Matrix ----------------
ok(coverage.length === 39, "coverage matrix covers all 39 sections");
ok(notes.length >= 5 && additions.length >= 4, "coverage documents accuracy notes and interactive labs");

// ---------------- 6) Architecture, Shell, CSS & Scope Guard ----------------
const lessonFile = readFileSync("src/lessons/lesson44/Lesson44.tsx", "utf8");
ok(/import Lesson1Shell/.test(lessonFile), "Lesson44 mounts on shared Lesson1Shell");
ok(/rootDataLesson=\{44\}/.test(lessonFile), "Lesson44 sets rootDataLesson={44}");
ok(/lazy\(\(\) => import\(["']\.\/TestArea44["']\)\)/.test(lessonFile), "TestArea44 is lazy-loaded");
ok(/lazy\(\(\) => import\(["']\.\/SolutionsArea44["']\)\)/.test(lessonFile), "SolutionsArea44 is lazy-loaded");
ok(/lazy\(\(\) => import\(["']\.\/TeacherArea44["']\)\)/.test(lessonFile), "TeacherArea44 is lazy-loaded");

const teacherFile = readFileSync("src/lessons/lesson44/TeacherArea44.tsx", "utf8");
ok(/TEACHER_PASSWORD_44 = ["']somer173["']/.test(teacherFile), "existing client-side teacher password preserved");

const css = readFileSync("src/lessons/lesson44/lesson44.css", "utf8");
ok(css.includes(".obligation44") && !/(^|\n)\s*body\s*\{/.test(css), "CSS strictly scoped under .obligation44");
ok(css.includes("prefers-reduced-motion: reduce"), "CSS supports prefers-reduced-motion");

// WCAG AA contrast verification for Obligation Command Center palette
const lum = (hex) => {
  const rgb = hex
    .match(/\w\w/g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const PAIRS = [
  ["0F1D33", "F2F4F9"],
  ["1E314D", "FFFFFF"],
  ["354968", "FFFFFF"],
  ["465A78", "FFFFFF"],
  ["FFFFFF", "122138"],
  ["1B3488", "EEF2FF"],
  ["09594E", "EAF8F5"],
  ["991B1B", "FEF2F2"],
  ["5521B5", "F5F3FF"],
  ["7A3E06", "FEF7EC"],
  ["0B4A6F", "EFF8FF"],
  ["0D5C38", "ECFDF3"],
  ["78350F", "FFFBEB"],
];
for (const [fg, bg] of PAIRS) {
  const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
  const ratio = (hi + 0.05) / (lo + 0.05);
  ok(ratio >= 4.8, `WCAG AA contrast #${fg}/#${bg} = ${ratio.toFixed(2)}:1 >= 4.8:1`);
}

// Strict Scope Guard: ONLY Lesson 44 files, Lesson 44 audit scripts, and Lesson 44 docs may be modified!
const baseRef = (() => {
  for (const ref of ["origin/main", "main", "HEAD"]) {
    try {
      execFileSync("git", ["rev-parse", "--verify", "--quiet", ref], { stdio: "ignore" });
      return ref;
    } catch {
      /* next */
    }
  }
  return null;
})();
const changedFiles = [
  ...new Set(
    [
      ...(baseRef
        ? execFileSync("git", ["diff", "--name-only", baseRef], { encoding: "utf8" }).split("\n")
        : []),
      ...execFileSync("git", ["ls-files", "--others", "--exclude-standard"], {
        encoding: "utf8",
      }).split("\n"),
    ].filter(Boolean)
  ),
];
const allowedLesson44Scope = (p) =>
  p.startsWith("src/lessons/lesson44/") ||
  /^scripts\/audit-lesson44(?:-dom|-browser)?\.mjs$/.test(p) ||
  /^docs\/lesson44-[\w-]+\.md$/.test(p);

ok(
  changedFiles.every(allowedLesson44Scope),
  `strict scope guard: only Lesson 44 files touched (unexpected: ${changedFiles.filter((p) => !allowedLesson44Scope(p)).join(", ")})`
);

console.log(
  `Lesson 44 static audit passed: ${checks} assertions; 39 sections / ${totalUnits} student units + 35 teacher units, 13 stations, 25 practice items, 25 test questions + lazy grading verified, strict scope clean.`
);
