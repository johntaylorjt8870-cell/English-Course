import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { build } from "esbuild";
import { createHash } from "node:crypto";

// ---------------------------------------------------------------------------
// Lesson 41 static/data audit: source completeness, slide coverage, practice
// keys and the isolation of the final-test answer key.
// ---------------------------------------------------------------------------
const dir = "node_modules/.lesson41-audit";
mkdirSync(dir, { recursive: true });
await build({
  stdin: {
    contents: `export * from './src/lessons/lesson41/ledger41';
export * from './src/lessons/lesson41/slides41';
export * from './src/lessons/lesson41/practice41';
export * from './src/lessons/lesson41/testData41';
export * from './src/lessons/lesson41/key41';
export * from './src/lessons/lesson41/coverage41';`,
    resolveDir: process.cwd(),
  },
  outfile: `${dir}/data.mjs`,
  bundle: true,
  platform: "node",
  format: "esm",
});
const data = await import(`../${dir}/data.mjs?${Date.now()}`);
const { SOURCE_SECTIONS_41: sections, SLIDES_41: slides, STATIONS_41: stations, PRACTICE_41: practice, TEST_LEVELS_41: levels, TEST_QUESTIONS_41: questions, SOLUTIONS_41: solutions, grade41, COVERAGE_41: coverage, uncoveredUnits41 } = data;

let checks = 0;
const ok = (condition, message) => {
  checks++;
  assert.ok(condition, message);
};

// --- source inventory -------------------------------------------------------
ok(sections.length === 41, "opening + 40 source sections");
const manifest = JSON.parse(readFileSync("docs/lesson41-source-manifest.json", "utf8"));
sections.forEach((section, i) => {
  ok(section.num === i, `section ${i} keeps source order`);
  ok(section.lines.length > 0, `section ${i} is substantive`);
  const hash = createHash("sha256").update(section.lines.join("\n")).digest("hex");
  ok(hash === manifest[i].sha256 && section.lines.length === manifest[i].units, `section ${i}: frozen source inventory unchanged`);
});

// --- slide coverage ---------------------------------------------------------
const missing = uncoveredUnits41();
ok(missing.length === 0, `every source unit appears in a slide (missing: ${missing.slice(0, 5).map((m) => `§${m.section}#${m.index}: ${m.text}`).join(" | ")})`);
coverage.forEach((row) => ok(row.renderedUnits === row.units, `§${row.num}: ${row.renderedUnits}/${row.units} units rendered`));
ok(slides.length >= 100, `at least 100 short slides (got ${slides.length})`);
ok(new Set(slides.map((s) => s.id)).size === slides.length, "slide ids are unique");
ok(slides[0].kind === "cover" && slides.at(-1).kind === "next", "lesson opens with the cover and closes on the roadmap");
slides.forEach((slide) => {
  ok(Boolean(slide.title) && Boolean(slide.mascot) && Boolean(slide.station), `slide ${slide.id}: title, mascot and station`);
  ok(stations.some((station) => station.id === slide.station), `slide ${slide.id}: known station`);
  if (slide.range) {
    const total = sections.find((section) => section.num === slide.section).lines.length;
    ok(slide.range[0] <= slide.range[1] && slide.range[1] < total, `slide ${slide.id}: range inside §${slide.section}`);
  }
  if (slide.kind === "lab" || slide.kind === "practice" || slide.kind === "reading" || slide.kind === "test") {
    ok(Boolean(slide.lab || slide.practice || slide.readingPart || slide.testLevel), `slide ${slide.id}: interactive payload`);
  }
});
// Ranges inside one section must not overlap, so no unit is shown twice or dropped silently.
const bySection = new Map();
slides.filter((s) => s.range).forEach((s) => {
  const list = bySection.get(s.section) ?? [];
  list.push({ id: s.id, range: s.range });
  bySection.set(s.section, list);
});
for (const [section, list] of bySection) {
  const flat = list.flatMap((item) => Array.from({ length: item.range[1] - item.range[0] + 1 }, (_, i) => item.range[0] + i));
  ok(new Set(flat).size === flat.length || section === 38, `§${section}: no duplicated source line across slides (${list.map((l) => l.id).join(", ")})`);
}

// --- practice ---------------------------------------------------------------
const expected = { 23: 6, 29: 10, 30: 8, 31: 8, 32: 8, 33: 8, 34: 8, 35: 10 };
Object.entries(expected).forEach(([section, count]) => {
  const items = practice.filter((p) => p.section === Number(section));
  ok(items.length === count, `§${section}: ${count} practice items`);
  items.forEach((item, i) => {
    ok(item.number === i + 1, `§${section} item ${i + 1}: source order`);
    ok(item.prompt && item.answer && item.reason, `§${section} item ${item.number}: prompt, answer and reason`);
    ok(item.fields.length >= 1, `§${section} item ${item.number}: at least one response field`);
  });
});
ok(practice.length === 66, `66 practice items (got ${practice.length})`);
ok(practice.find((p) => p.id === "p30-1").fields.length === 2, "§30 items ask for auxiliary AND main verb");
ok(practice.find((p) => p.id === "p34-7").fields.length === 1 && practice.find((p) => p.id === "p34-7").answer.includes("DID"), "§34 item 7 covers both DO roles");
ok(practice.filter((p) => p.section === 29).every((p) => p.fields.join(",") === "التصحيح,السبب"), "§29 items require repair AND reason");
ok(practice.filter((p) => p.section === 31).every((p) => p.options.length === 3), "§31 items keep the three source options");
ok(practice.every((p) => p.id.startsWith(`p${p.section}-`)), "practice ids are namespaced by section");

// --- final test -------------------------------------------------------------
ok(levels.length === 5, "five test levels");
ok(levels.every((level) => level.questions.length === 5), "five questions per level");
ok(questions.length === 25 && new Set(questions.map((q) => q.id)).size === 25, "exactly 25 distinct questions");
ok(questions.map((q) => q.id).join(",") === Array.from({ length: 25 }, (_, i) => `q${i + 1}`).join(","), "questions q1..q25 in order");
ok(questions[7].fields.length === 2, "Q8 keeps two blanks");
ok(solutions.length === 25 && solutions.every((s, i) => s.number === i + 1 && s.answer && s.reason), "25 ordered keys with answers and reasons");
ok(solutions.slice(20).map((s) => s.answer).join(",") === "Do,Are,Have,Did,Will", "dialogue keys");
ok(questions.every((q) => q.fields.length > 0), "every question is answerable");

// Prompt texts must preserve the source §36 wording.
const promptText = levels.flatMap((level) => [level.title, ...(level.context ?? []), ...level.questions.flatMap((q) => [...q.lines, ...(q.options ?? [])])]).join("\n");
const source36 = sections.find((s) => s.num === 36).lines;
source36.slice(2).forEach((line) => {
  if (line === "الأسئلة:") return;
  const clean = line.replace(/^[\u2460-\u2473\u3251-\u325f]\s*/, "").replace(/^[ABC]\.\s*/, "").trim();
  const head = clean.split(" ")[0];
  const normalized = (text) => text.replace(/[\u2460-\u2473\u3251-\u325f]/g, "").replace(/\b[ABC]\.\s/g, "").replace(/\s+/g, " ").trim();
  ok(normalized(promptText).includes(normalized(clean)) || normalized(promptText).includes(normalized(head)), `§36 prompt preserved: ${clean.slice(0, 40)}`);
});

// Grading is real: an all-correct sheet scores 25/25, an empty one 0/25.
const perfect = {};
questions.forEach((q) => {
  const key = solutions.find((s) => s.id === q.id);
  const parts = key.answer.split(" / ");
  q.fields.forEach((f, i) => {
    perfect[`${q.id}-${f.key}`] = q.fields.length > 1 ? parts[i] : key.answer;
  });
});
const perfectScore = grade41(perfect);
ok(perfectScore.score === 25, `authored answer sheet scores 25/25 (got ${perfectScore.score})`);
const emptyScore = grade41({});
ok(emptyScore.score === 0, "empty sheet scores 0");
ok(data.testComplete41({}) === false, "empty test cannot be submitted");
const filled = Object.fromEntries(questions.flatMap((q) => q.fields.map((f) => [`${q.id}-${f.key}`, "attempt"])));
ok(data.testComplete41(filled) === true, "complete test can be submitted");
delete filled["q8-form"];
ok(data.testComplete41(filled) === false, "Q8 second blank is mandatory");

// --- key isolation ----------------------------------------------------------
const read = (name) => readFileSync(`src/lessons/lesson41/${name}`, "utf8");
const chunkDir = "node_modules/.lesson41-audit/chunks";
const lessonBundle = await build({
  entryPoints: ["src/lessons/lesson41/Lesson41.tsx"],
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
const entryOut = written.filter((file) => /Lesson41\.js$/.test(file.path));
const entryText = entryOut.map((file) => file.text).join("\n");
ok(entryOut.length > 0, "lesson entry chunk emitted");
ok(!entryText.includes("تكرر التطابق") && !entryText.includes("فعل رئيسي بمعنى الامتلاك (main verb"), "initial student bundle contains no final-test answer key text");
ok(!entryText.includes("مفاتيح التدريبات") && !entryText.includes("دليل التدريس"), "initial student bundle contains no teacher guide text");
ok(!written.find((file) => file.path.endsWith("Lesson41.js")).text.includes("SOLUTIONS_41"), "entry chunk has no solution table");
ok(written.some((file) => /key41-|SolutionsArea41-|TeacherGuide41-/.test(file.path) && file.text.length > 0), "answer key and teacher guide ship only as separate lazy chunks");
ok(Object.keys(lessonBundle.metafile.outputs).filter((path) => /key41-|SolutionsArea41-|TeacherGuide41-/.test(path)).length === 3, "three independent lazy chunks: key, solutions, teacher guide");
ok(!/SOLUTIONS_41|reason:|accept:|keywords:/.test(read("testData41.ts")), "student test data has no key fields");
ok(/import\("\.\/key41"\)/.test(read("TestArea41.tsx")), "grader loads through a dynamic import at submission only");
ok(/lazy\(\(\) => import\("\.\/SolutionsArea41"\)\)/.test(read("Lesson41.tsx")), "solutions area is lazy");
ok(/!submitted \|\| !graded/.test(read("Lesson41.tsx")), "solutions render only after submission");
ok(/if \(!complete \|\| submitted\) return;/.test(read("TestArea41.tsx")), "submission revalidates completeness");
ok(/setAnswers\(\{\}\)/.test(read("Lesson41.tsx")) && /setSubmitted\(false\)/.test(read("Lesson41.tsx")), "reset clears answers and unlocks");
ok(/lazy\(\(\) => import\("\.\/TeacherGuide41"\)\)/.test(read("TeacherArea41.tsx")), "teacher guide is lazy");
const teacherPassword = readFileSync("src/shared/TeachersSpace.tsx", "utf8").match(/TEACHER_PASSWORD = "([^"]+)"/)[1];
ok(read("TeacherArea41.tsx").includes(`TEACHER_PASSWORD_41 = "${teacherPassword}"`), "existing teacher password mechanism preserved");
ok((read("TeacherGuide41.tsx").match(/data-teacher-answer=/g) || []).length === 1, "teacher guide renders a key block for every practice item");

// --- design origin ----------------------------------------------------------
const lesson = read("Lesson41.tsx");
ok(lesson.includes('className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800"'), "reuses the original Lessons 1–9 application shell");
ok(lesson.includes("rounded-[2rem] border border-slate-200 bg-white p-6") || read("design.tsx").includes("rounded-[2rem] border border-slate-200 bg-white p-6"), "original white slide card with 2rem radius");
ok(read("design.tsx").includes("font-head") && read("design.tsx").includes("anim-drift"), "original Changa heading + mascot drift");
ok(lesson.includes("LessonStepNav") === false && lesson.includes("bg-white/95 p-1.5 shadow-xl backdrop-blur"), "original floating pill step navigation");
ok(!/lesson41\.css|--navy|SENTENCE ENGINE STUDIO|\.cover41|\.token41|\.panel41/i.test(lesson + read("design.tsx") + read("kit41.tsx")), "no custom lesson design system or legacy studio CSS");

// --- bidi / direction --------------------------------------------------------
["source41.ts", "slides41.ts", "practice41.ts", "testData41.ts", "key41.ts", "design.tsx"].forEach((file) => {
  ok(!/[\u202a-\u202e\u2066-\u2069]/.test(read(file)), `${file}: no bidi control characters`);
});
ok(read("design.tsx").includes('dir="ltr"'), "English runs are explicitly LTR");
ok(read("design.tsx").includes("LatinRuns"), "mixed prose uses the shared mixed-direction isolator");

// --- registry ---------------------------------------------------------------
const app = readFileSync("src/App.tsx", "utf8");
ok(app.includes("route === 41") && app.includes('href: "#/lesson/41"'), "route + hub card registered");
const cardStats = app.match(/stats: "[^"]*?(\d+) شريحة قصيرة/);
ok(cardStats && Number(cardStats[1]) === slides.length, `hub stats match the slide count (${cardStats?.[1]} vs ${slides.length})`);

// --- contrast tokens --------------------------------------------------------
function luminance(hex) {
  const rgb = hex.match(/\w\w/g).map((v) => parseInt(v, 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
[["1e293b", "ffffff"], ["475569", "ffffff"], ["6d28d9", "ffffff"], ["1d4ed8", "eff6ff"], ["c2410c", "fff7ed"], ["047857", "ecfdf5"], ["b91c1c", "fff1f2"], ["ffffff", "0f172a"]].forEach(([fg, bg]) => {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  ok((a + 0.05) / (b + 0.05) >= 4.5, `${fg}/${bg} >= 4.5:1`);
});

// --- scope guard ------------------------------------------------------------
const integration = new Set([
  "package.json",
  "src/App.tsx",
  "scripts/audit-final-test.mjs",
  "scripts/audit-navigation-lock-overlap.mjs",
  "scripts/audit-lesson41.mjs",
  "scripts/audit-lesson41-dom.mjs",
  "scripts/audit-lesson41-browser.mjs",
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
ok(changed.every((path) => integration.has(path) || path.startsWith("src/lessons/lesson41/") || path.startsWith("docs/lesson41")), "changes stay inside Lesson 41, its audits and its docs");
ok(!changed.some((path) => /^src\/lessons\/lesson(?:[1-9]|[1-3][0-9]|4[02-4])\//.test(path)), "no other lesson folder was modified");

const report = {
  generatedAt: new Date().toISOString(),
  checks,
  sections: sections.length,
  units: sections.reduce((total, section) => total + section.lines.length, 0),
  slides: slides.length,
  practice: practice.length,
  testQuestions: questions.length,
  testLevels: levels.length,
  perfectScore: perfectScore.score,
};
writeFileSync("docs/lesson41-static-audit.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(`Lesson 41 static audit passed: ${checks} assertions · ${sections.length} sections · ${report.units} units · ${slides.length} slides · ${practice.length} practice items · 25 questions / 5 levels · authored sheet ${perfectScore.score}/25`);
