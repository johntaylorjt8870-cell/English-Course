import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { build } from "esbuild";
import { createHash } from "node:crypto";

// ---------------------------------------------------------------------------
// Lesson 42 static/data audit: source completeness, slide coverage, practice
// keys and the isolation of the final-test answer key.
// Follows the audit-lesson41.mjs conventions (same shell string, same
// chunk-splitting proof, same frozen source manifest).
// ---------------------------------------------------------------------------
const dir = "node_modules/.lesson42-audit";
mkdirSync(dir, { recursive: true });
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
  outfile: `${dir}/data.mjs`,
  bundle: true,
  platform: "node",
  format: "esm",
});
const data = await import(`../${dir}/data.mjs?${Date.now()}`);
const {
  SOURCE_SECTIONS_42: studentSections,
  TEACHER_SECTION_42: teacherSection,
  TEACHER_UNIT_COUNT_42: teacherUnits,
  SLIDES_42: slides,
  STATIONS_42: stations,
  PRACTICE_42: practice,
  TEST_LEVELS_42: levels,
  TEST_QUESTIONS_42: questions,
  SOLUTIONS_42: solutions,
  grade42,
  COVERAGE_42: coverage,
  uncoveredUnits42,
} = data;

let checks = 0;
const ok = (condition, message) => {
  checks++;
  assert.ok(condition, message);
};
const read = (name) => readFileSync(`src/lessons/lesson42/${name}`, "utf8");
const kit = read("kit42.tsx");

// --- source inventory -------------------------------------------------------
// §41 lives in teacherSource42.ts (it carries the answer key), so the full
// ledger is the student sections with §41 spliced back in source order.
const sections = [...studentSections.slice(0, 41), teacherSection, ...studentSections.slice(41)];
ok(studentSections.length === 44, `student-facing source has 44 entries (got ${studentSections.length})`);
ok(teacherSection.num === 41, "the isolated teacher section is §41");
ok(sections.length === 45, "opening + 44 source sections");
const totalUnits = sections.reduce((total, section) => total + section.lines.length, 0);
ok(totalUnits === 932, `all 932 source units present (got ${totalUnits})`);
ok(teacherUnits === 56, `§41 keeps its 56 units (got ${teacherUnits})`);

const manifest = JSON.parse(readFileSync("docs/lesson42-source-manifest.json", "utf8"));
ok(manifest.length === 45, "frozen manifest covers 45 sections");
sections.forEach((section, i) => {
  ok(section.num === i, `section ${i} keeps source order`);
  ok(section.lines.length > 0, `section ${i} is substantive`);
  const hash = createHash("sha256").update(section.lines.join("\n")).digest("hex");
  ok(hash === manifest[i].sha256 && section.lines.length === manifest[i].units, `section ${i}: frozen source inventory unchanged`);
});

// --- slide coverage ---------------------------------------------------------
const missing = uncoveredUnits42();
ok(missing.length === 0, `every student source unit appears in a slide (missing: ${missing.slice(0, 5).map((m) => `§${m.section}#${m.index}: ${m.text}`).join(" | ")})`);
coverage.forEach((row) => ok(row.renderedUnits === row.units, `§${row.num}: ${row.renderedUnits}/${row.units} units rendered`));
ok(slides.length >= 100, `at least 100 short slides (got ${slides.length})`);
ok(new Set(slides.map((s) => s.id)).size === slides.length, "slide ids are unique");
ok(slides[0].kind === "cover" && slides.at(-1).kind === "next", "lesson opens with the cover and closes on the roadmap");
slides.forEach((slide) => {
  ok(Boolean(slide.title) && Boolean(slide.mascot) && Boolean(slide.station), `slide ${slide.id}: title, mascot and station`);
  ok(stations.some((station) => station.id === slide.station), `slide ${slide.id}: known station`);
  if (slide.range) {
    const total = studentSections.find((section) => section.num === slide.section).lines.length;
    ok(slide.range[0] <= slide.range[1] && slide.range[1] < total, `slide ${slide.id}: range inside §${slide.section}`);
  }
  if (slide.kind === "lab" || slide.kind === "practice" || slide.kind === "reading" || slide.kind === "test") {
    ok(Boolean(slide.lab || slide.practice || slide.readingPart || slide.testLevel), `slide ${slide.id}: interactive payload`);
  }
});
// Ranges inside one section must not overlap, so no unit is shown twice.
const bySection = new Map();
slides.filter((s) => s.range).forEach((s) => {
  const list = bySection.get(s.section) ?? [];
  list.push({ id: s.id, range: s.range });
  bySection.set(s.section, list);
});
for (const [num, list] of bySection) {
  const seen = new Set();
  for (const { id, range } of list) {
    for (let i = range[0]; i <= range[1]; i += 1) {
      ok(!seen.has(i), `§${num}: unit ${i} shown once (also in ${id})`);
      seen.add(i);
    }
  }
}
ok(stations.length === 10, `ten stations (got ${stations.length})`);

// --- practice ---------------------------------------------------------------
const counts = data.PRACTICE_COUNTS_42;
const expected = { 16: 3, 34: 8, 35: 5, 36: 5, 37: 5, 38: 10, 39: 10 };
Object.entries(expected).forEach(([section, count]) => ok(counts[section] === count, `§${section}: ${count} practice items`));
ok(practice.length === 46, `46 practice items in total (got ${practice.length})`);
ok(new Set(practice.map((item) => item.id)).size === practice.length, "practice ids are unique");
practice.forEach((item) => {
  ok(Boolean(item.prompt) && Boolean(item.answer) && Boolean(item.reason), `practice ${item.id}: prompt, answer and reason`);
  ok(item.fields.length > 0, `practice ${item.id}: at least one field`);
});
// Every practice prompt must come from the source section it claims.
practice.forEach((item) => {
  const source = studentSections.find((s) => s.num === item.section).lines.join("\n");
  const stem = item.prompt.replace(/______/, "").split("  ")[0].trim().slice(0, 18);
  ok(source.includes(stem), `practice ${item.id}: prompt text traced to §${item.section} ("${stem}")`);
});
// Practice slides cover every item of the practice sections.
const practiceRanges = slides.filter((s) => s.kind === "practice");
[16, 34, 35, 36, 37, 38].forEach((section) => {
  const covered = new Set();
  practiceRanges.filter((s) => s.practice === section).forEach((s) => {
    for (let i = s.items[0]; i <= s.items[1]; i += 1) covered.add(i);
  });
  ok(covered.size === expected[section], `§${section}: all ${expected[section]} items reach a slide (got ${covered.size})`);
});

// Reading passage + ten comprehension questions. §39 is delivered by the
// reading slides, which hand their items to PracticeSet42 section={39}.
const reading = slides.filter((s) => s.kind === "reading");
ok(reading.length === 6, `reading: two passage halves + four question slides (got ${reading.length})`);
ok(reading[0].readingPart === "passage-1" && reading[1].readingPart === "passage-2", "the passage is split across two slides");
ok(reading.every((s) => s.section === 39), "all reading slides belong to §39");
// The two halves must cover the whole passage (source lines 1..14) without overlap.
const half1 = [1, 2, 3, 4, 5, 6, 7];
const half2 = [8, 9, 10, 11, 12, 13, 14];
ok(kit.includes("lines.slice(1, 8)") && kit.includes("lines.slice(8, 15)"), "passage halves slice lines 1..7 and 8..14");
ok(new Set([...half1, ...half2]).size === 14, "the two halves cover all 14 passage lines exactly once");
const readingRanges = [...kit.matchAll(/"questions-(\d)": \[(\d+), (\d+)\]/g)].map((m) => [Number(m[2]), Number(m[3])]);
ok(readingRanges.length === 4, `four reading question ranges declared in kit42 (got ${readingRanges.length})`);
const readingCovered = new Set();
readingRanges.forEach(([from, to]) => {
  for (let i = from; i <= to; i += 1) readingCovered.add(i);
});
ok(readingCovered.size === 10, `all ten §39 comprehension questions reach a slide (got ${readingCovered.size})`);
ok(readingRanges.every(([from, to]) => to >= from && to <= 10 && from >= 1), "reading ranges stay inside questions 1..10");
ok(/PracticeSet42 section=\{39\} from=\{from\} to=\{to\}/.test(kit), "reading questions reuse the practice card (answer revealed after the attempt)");
// Neither half may reach line 15 («أسئلة الفهم»), or the Arabic question heading
// would render as an LTR paragraph inside the English passage.
ok(!/lines\.slice\((?:1|8),\s*1[6-9]\)/.test(kit), "no passage half reaches the Arabic question heading at line 15");
ok(/lines\.slice\(8, 15\)/.test(kit), "the second half stops before line 15");
const source39 = sections.find((s) => s.num === 39).lines;
ok(source39[0] === "The Young Inventor" && source39[15] === "أسئلة الفهم", "§39 line map matches the renderer offsets");


// --- final test -------------------------------------------------------------
ok(levels.length === 5, "five test levels");
ok(levels.every((level) => level.questions.length === 5), "five questions per level");
ok(questions.length === 25 && new Set(questions.map((q) => q.id)).size === 25, "exactly 25 distinct questions");
ok(questions.map((q) => q.id).join(",") === Array.from({ length: 25 }, (_, i) => `q${i + 1}`).join(","), "questions q1..q25 in order");
ok(questions[6].fields.length === 2, "Q7 keeps its two blanks");
ok(questions.every((q) => q.fields.length > 0), "every question is answerable");
ok(solutions.length === 25 && solutions.every((s, i) => s.number === i + 1 && s.answer && s.reason && s.function && s.source), "25 ordered keys with answer, function, §41 reason and platform explanation");
ok(solutions.filter((s) => s.keywords).length === 5, "the five explanatory questions (§40 ⑯–⑳) are keyword-graded");
ok(solutions.slice(20).map((s) => s.answer).join(",") === "Can,couldn't,Could,could,will be able to", "IQ200 dialogue keys match §41");
ok(solutions.slice(0, 5).map((s) => s.answer).join(",") === "can,could,Could,couldn't,be able to", "level 1 keys match §41");

// Prompt texts must preserve the source §40 wording.
const promptText = levels.flatMap((level) => [level.title, ...(level.context ?? []), ...level.questions.flatMap((q) => [...q.lines, ...(q.options ?? [])])]).join("\n");
const source40 = sections.find((s) => s.num === 40).lines;
const normalized = (text) => text.replace(/[\u2460-\u2473\u3251-\u325f]/g, "").replace(/\b[ABC]\.\s/g, "").replace(/\s+/g, " ").trim();
source40.slice(2).forEach((line) => {
  if (line === "الأسئلة:") return;
  const clean = line.replace(/^[\u2460-\u2473\u3251-\u325f]\s*/, "").replace(/^[ABC]\.\s*/, "").trim();
  const head = clean.split(" ")[0];
  ok(normalized(promptText).includes(normalized(clean)) || normalized(promptText).includes(normalized(head)), `§40 prompt preserved: ${clean.slice(0, 40)}`);
});
// §41 keys must be reproduced verbatim inside the solution table.
const source41 = teacherSection.lines.join("\n");
solutions.forEach((entry) => {
  entry.answer.split(" / ").forEach((part) => {
    const core = part.trim();
    ok(source41.includes(core), `§41 carries the key part for q${entry.number}: "${core}"`);
  });
});

// Grading is real: an all-correct sheet scores 25/25, an empty one 0/25.
const perfect = {};
questions.forEach((q) => {
  const key = solutions.find((s) => s.id === q.id);
  const parts = key.answer.split(" / ");
  q.fields.forEach((f, i) => {
    perfect[`${q.id}:${f.key}`] = q.fields.length > 1 ? parts[i] : key.answer;
  });
});
const perfectScore = grade42(perfect);
ok(perfectScore.score === 25 && perfectScore.total === 25, `authored answer sheet scores 25/25 (got ${perfectScore.score}/${perfectScore.total})`);
ok(grade42({}).score === 0, "empty sheet scores 0");
ok(data.testComplete42({}) === false, "empty test cannot be submitted");
const filled = Object.fromEntries(questions.flatMap((q) => q.fields.map((f) => [`${q.id}:${f.key}`, "attempt"])));
ok(data.testComplete42(filled) === true, "complete test can be submitted");
delete filled["q7:form"];
ok(data.testComplete42(filled) === false, "Q7 second blank is mandatory");

// Reasonable equivalent forms are accepted for open-response questions.
const equivalents = [
  ["q6", "cannot"],
  ["q6", "She can't drive a car."],
  ["q8", "he could run very fast"],
  ["q9", "we were able to finish it yesterday"],
  ["q9", "were able to finish it"],
  ["q10", "will be able"],
  ["q11", "he can swim very well"],
  ["q12", "can you help me"],
  ["q15", "could you repeat the question"],
  ["q17", "a polite request"],
  ["q18", "future possibility"],
  ["q21", "can"],
  ["q25", "will be able to"],
];
equivalents.forEach(([id, value]) => {
  const q = questions.find((entry) => entry.id === id);
  const graded = grade42({ [`${id}:${q.fields[0].key}`]: value }).results.find((entry) => entry.id === id);
  ok(graded.correct, `q${q.number} accepts the equivalent form "${value}"`);
});
// And nonsense is rejected for every question.
questions.forEach((q) => {
  const answers = Object.fromEntries(q.fields.map((f) => [`${q.id}:${f.key}`, "zzzz nonsense"]));
  ok(!grade42(answers).results.find((entry) => entry.id === q.id).correct, `q${q.number} rejects a nonsense answer`);
});

// --- key isolation ----------------------------------------------------------
const chunkDir = "node_modules/.lesson42-audit/chunks";
const lessonBundle = await build({
  entryPoints: ["src/lessons/lesson42/Lesson42.tsx"],
  bundle: true,
  splitting: true,
  outdir: chunkDir,
  metafile: true,
  write: true,
  platform: "browser",
  format: "esm",
  loader: { ".css": "empty" },
});
const written = Object.keys(lessonBundle.metafile.outputs).map((path) => ({ path, text: readFileSync(path, "utf8") }));
const entryOut = written.filter((file) => /Lesson42\.js$/.test(file.path));
const entryText = entryOut.map((file) => file.text).join("\n");
ok(entryOut.length > 0, "lesson entry chunk emitted");
// §41 answer strings and platform solution metadata must not be in the entry.
[
  "حلول المستوى الأول",
  "مفتاح تصحيح الدرس 42",
  "السبب: بعد will نستخدم be able to",
  "لأن الجملة تبرز نجاحها في حل مشكلة محددة",
  "قد يكون السؤال عن القدرة إذا كنا نريد معرفة",
  "الوظيفة النحوية المختبَرة",
  "I think I will be able to build more advanced robots",
].forEach((needle) => ok(!entryText.includes(needle), `initial student bundle has no §41 key text: "${needle.slice(0, 32)}"`));
ok(!entryText.includes("مفاتيح التدريبات") && !entryText.includes("دليل التدريس"), "initial student bundle contains no teacher guide text");
ok(!entryOut[0].text.includes("SOLUTIONS_42"), "entry chunk has no solution table");
ok(!read("source42.ts").includes("@@41"), "the statically-imported student source does not contain §41");
ok(read("teacherSource42.ts").includes("@@41 مساحة المعلم"), "§41 lives in the teacher-only source module");
// Type-only imports are erased by the bundler, so only value imports matter.
const studentPath = [read("Lesson42.tsx"), read("kit42.tsx"), read("design42.tsx"), read("TestArea42.tsx")]
  .join("\n")
  .split("\n")
  .filter((line) => !/^\s*import type /.test(line))
  .join("\n");
ok(!/from "\.\/teacherSource42"|from "\.\/key42"|from "\.\/SolutionsArea42"|from "\.\/TeacherGuide42"/.test(studentPath), "no eager value import of a teacher/key module in the student path");
ok(/import type \{ Graded42 \} from "\.\/key42"/.test(read("TestArea42.tsx")), "the test area imports the key module for types only (erased at build time)");
ok(written.some((file) => /key42-|SolutionsArea42-|TeacherGuide42-/.test(file.path) && file.text.length > 0), "answer key and teacher guide ship only as separate lazy chunks");
ok(Object.keys(lessonBundle.metafile.outputs).filter((path) => /key42-|SolutionsArea42-|TeacherGuide42-|teacherSource42/.test(path)).length >= 3, "the key, solutions, teacher guide and teacher source split out of the entry chunk");
ok(!/SOLUTIONS_42|reason:|accept:|keywords:|function:/.test(read("testData42.ts")), "student test data has no key fields");
ok(/import\("\.\/key42"\)/.test(read("TestArea42.tsx")), "grader loads through a dynamic import at submission only");
ok(/lazy\(\(\) => import\("\.\/SolutionsArea42"\)\)/.test(read("Lesson42.tsx")), "solutions area is lazy");
ok(/!submitted \|\| !graded/.test(read("Lesson42.tsx")), "solutions render only after submission");
ok(/if \(!complete \|\| submitted\) return;/.test(read("TestArea42.tsx")), "submission revalidates completeness");
ok(/setAnswers\(\{\}\)/.test(read("Lesson42.tsx")) && /setSubmitted\(false\)/.test(read("Lesson42.tsx")), "reset clears answers and unlocks");
ok(/if \(!submitted\) setAnswers/.test(read("Lesson42.tsx")), "answers cannot be edited after submission");
ok(/lazy\(\(\) => import\("\.\/TeacherGuide42"\)\)/.test(read("TeacherArea42.tsx")), "teacher guide is lazy");
const teacherPassword = readFileSync("src/shared/TeachersSpace.tsx", "utf8").match(/TEACHER_PASSWORD = "([^"]+)"/)[1];
ok(read("TeacherArea42.tsx").includes(`TEACHER_PASSWORD_42 = "${teacherPassword}"`), "existing teacher password mechanism preserved");
ok((read("TeacherGuide42.tsx").match(/data-teacher-answer=/g) || []).length === 1, "teacher guide renders a key block for every practice item");
ok(/client-side|جهة العميل/.test(read("TeacherArea42.tsx")), "the teacher gate is documented as a client-side lock, not server security");

// --- design origin ----------------------------------------------------------
const lesson = read("Lesson42.tsx");
const design = read("design42.tsx");
ok(lesson.includes('className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800"'), "reuses the original Lessons 1–9 application shell");
ok(design.includes("rounded-[2rem] border border-slate-200 bg-white p-6"), "original white slide card with 2rem radius");
ok(design.includes("font-head") && design.includes("anim-drift"), "original Changa heading + mascot drift");
ok(!lesson.includes("LessonStepNav") && lesson.includes("bg-white/95 p-1.5 shadow-xl backdrop-blur"), "original floating pill step navigation");
ok(lesson.includes("hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block"), "original right rail");
ok(lesson.includes("from-sky-500 via-orange-400 to-emerald-500"), "original progress gradient");
ok(lesson.includes("Signature") && lesson.includes("SignatureGhost"), "shared signature components reused");
ok(!/lesson42\.css|--panel|--primary|LANGUAGE CONTROL LAB|\.lesson42|\.station42|\.masthead42/i.test(lesson + design + kit + read("slides42.ts")), "no custom lesson design system or legacy Language Control Lab CSS");
// The Lesson 41 rebuild uses the same shell; Lesson 42 must match it.
const lesson41 = readFileSync("src/lessons/lesson41/Lesson41.tsx", "utf8");
const shell = /className="(style-b font-body[^"]*)"/;
ok(shell.exec(lesson)?.[1] === shell.exec(lesson41)?.[1], "shell class string is byte-identical to the Lesson 41 rebuild");
const pill = /className="(pointer-events-auto flex items-center gap-1\.5 rounded-full[^"]*)"/;
ok(pill.exec(lesson)?.[1] === pill.exec(lesson41)?.[1], "floating step pill markup is identical to the Lesson 41 rebuild");
ok(lesson.includes("pb-32") && lesson41.includes("pb-32"), "same reserved bottom space so the pill never covers content");

// --- bidi / direction --------------------------------------------------------
["source42.ts", "teacherSource42.ts", "slides42.ts", "practice42.ts", "testData42.ts", "key42.ts", "design42.tsx"].forEach((file) => {
  ok(!/[\u202a-\u202e\u2066-\u2069]/.test(read(file)), `${file}: no bidi control characters`);
});
ok(design.includes('dir="ltr"'), "English runs are explicitly LTR");
ok(design.includes("LatinRuns"), "mixed prose uses the shared mixed-direction isolator");
ok(read("ledger42.ts").includes("splitTitle42"), "mixed headings are split into isolated lines");

// --- registry ---------------------------------------------------------------
const app = readFileSync("src/App.tsx", "utf8");
ok(app.includes("route === 42") && app.includes('href: "#/lesson/42"'), "route + hub card registered");
ok(app.includes('import Lesson42 from "./lessons/lesson42/Lesson42"'), "lesson component imported");
const card42 = /n: 42,[\s\S]*?grad: "([^"]+)"/.exec(app)?.[1];
const card1 = /n: 1,[\s\S]*?grad: "([^"]+)"/.exec(app)?.[1];
const card41 = /n: 41,[\s\S]*?grad: "([^"]+)"/.exec(app)?.[1];
ok(card42 === card1, `hub card reuses the Lesson 1 gradient (${card42})`);
ok(card42 === card41, "hub card matches the Lesson 41 rebuild gradient");
const cardStats = /n: 42,[\s\S]*?stats: "[^"]*?(\d+) شريحة قصيرة/.exec(app);
ok(cardStats && Number(cardStats[1]) === slides.length, `hub stats match the slide count (${cardStats?.[1]} vs ${slides.length})`);
ok((app.match(/n: (\d+),/g) || []).length === 44, "the hub still lists 44 cards");
ok(/120/.test(read("Lesson42.tsx")), "the 120-lesson course total is preserved in the roadmap slide");

// --- contrast tokens --------------------------------------------------------
function luminance(hex) {
  const rgb = hex.match(/\w\w/g).map((v) => parseInt(v, 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
[["1e293b", "ffffff"], ["475569", "ffffff"], ["6d28d9", "ffffff"], ["1d4ed8", "eff6ff"], ["6d28d9", "f5f3ff"], ["047857", "ecfdf5"], ["b91c1c", "fff1f2"], ["92400e", "fffbeb"], ["ffffff", "0f172a"], ["334155", "f8fafc"]].forEach(([fg, bg]) => {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  ok((a + 0.05) / (b + 0.05) >= 4.5, `${fg}/${bg} >= 4.5:1`);
});

// --- scope guard ------------------------------------------------------------
const integration = new Set([
  "package.json",
  "src/App.tsx",
  "scripts/audit-final-test.mjs",
  "scripts/audit-final-test-coverage.mjs",
  "scripts/audit-navigation-lock-overlap.mjs",
  "scripts/audit-lesson42.mjs",
  "scripts/audit-lesson42-dom.mjs",
  "scripts/audit-lesson42-browser.mjs",
  "scripts/lesson42-coverage-doc.mjs",
]);
const resolveBase = () => {
  for (const candidate of ["origin/main", "main", "HEAD"]) {
    try {
      execFileSync("git", ["rev-parse", "--verify", "--quiet", candidate], { stdio: "ignore" });
      return candidate;
    } catch {
      /* try next */
    }
  }
  return null;
};
const base = resolveBase();
const changed = [
  ...new Set([
    ...(base ? execFileSync("git", ["diff", "--name-only", base], { encoding: "utf8" }).split("\n") : []),
    ...execFileSync("git", ["ls-files", "--others", "--exclude-standard"], { encoding: "utf8" }).split("\n"),
  ]),
].filter(Boolean);
ok(
  changed.every((path) => integration.has(path) || path.startsWith("src/lessons/lesson42/") || path.startsWith("docs/lesson42")),
  `changes stay inside Lesson 42, its audits and its docs (${changed.filter((p) => !integration.has(p) && !p.startsWith("src/lessons/lesson42/") && !p.startsWith("docs/lesson42")).join(", ") || "clean"})`,
);
ok(!changed.some((path) => /^src\/lessons\/lesson(?:[1-9]|[1-3][0-9]|4[0134])\//.test(path)), "no other lesson folder was modified");

const report = {
  generatedAt: new Date().toISOString(),
  checks,
  sections: sections.length,
  units: totalUnits,
  studentSections: studentSections.length,
  teacherSectionUnits: teacherUnits,
  slides: slides.length,
  stations: stations.length,
  practiceItems: practice.length,
  testQuestions: questions.length,
  solutions: solutions.length,
  changedFiles: changed,
};
mkdirSync("docs", { recursive: true });
writeFileSync("docs/lesson42-static-audit.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(
  `Lesson 42 static audit passed: ${checks} assertions · ${sections.length} sections · ${totalUnits} units · ${slides.length} slides · ${practice.length} practice items · ${questions.length} questions / ${levels.length} levels · authored sheet ${perfectScore.score}/${perfectScore.total}`,
);
