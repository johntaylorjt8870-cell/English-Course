// ============================================================
// Lesson 44 — static/data audit (English Learning Studio).
//
// Verifies the source ledger, the practice/test/solutions banks, the coverage
// matrix, navigation registration and the scope guard. Interaction, gating and
// rendered-markup contracts are asserted separately by audit-lesson44-dom.mjs.
//
//   node scripts/audit-lesson44.mjs
// ============================================================
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { build } from 'esbuild';

mkdirSync('node_modules/.lesson44-audit', { recursive: true });
await build({
  stdin: {
    contents: `export * from './src/lessons/lesson44/ledger44';
export * from './src/lessons/lesson44/data';
export * from './src/lessons/lesson44/practiceData44';
export * from './src/lessons/lesson44/practiceNotes44';
export * from './src/lessons/lesson44/testData44';
export * from './src/lessons/lesson44/solutionsData44';
export * from './src/lessons/lesson44/coverage44';`,
    resolveDir: process.cwd(),
  },
  outfile: 'node_modules/.lesson44-audit/data.mjs', bundle: true, platform: 'node', format: 'esm', logLevel: 'error',
});
const data = await import(`../node_modules/.lesson44-audit/data.mjs?${Date.now()}`);
let checks = 0;
const ok = (condition, message) => { checks++; assert.ok(condition, message); };

const {
  SOURCE_SECTIONS_44: sections, STATIONS_44: stations, NEXT_LESSON_44: next,
  LESSON_TITLE_44: title, LESSON_STEP_COUNT_44: stepCount, LESSON_SECTION_COUNT_44: sectionCount,
  LESSON_IDENTITY_44: identity, PRACTICE_44: practice, practiceReason44,
  TEST_LEVELS_44: levels, TEST_QUESTIONS_44: questions, TEST_QUESTION_COUNT_44: questionCount,
  TEST_SOLUTIONS_44: solutions, testComplete44,
  COVERAGE_44: coverage, COVERAGE_ACCURACY_NOTES_44: notes, COVERAGE_PLATFORM_ADDITIONS_44: additions,
  station44, unitId44,
} = data;

// ---------------- 1) source ledger ----------------
// Frozen inventory: cover (0) + §§1–38, with the exact line count per section.
// A change here means source text moved or disappeared, which is a regression.
const FROZEN_LINE_COUNTS = [
  27, 13, 21, 21, 14, 18, 19, 17, 21, 18, 18, 13, 18, 14, 16, 16, 19, 18, 15, 18,
  15, 16, 13, 15, 18, 15, 18, 26, 27, 17, 12, 12, 17, 39, 62, 3, 24, 43, 15,
];
ok(sections.length === 39, `39 source sections (cover + §§1–38), got ${sections.length}`);
ok(sections.every((s, i) => s.num === i), 'sections are numbered 0–38 in order');
ok(sections.every(s => s.title.trim().length > 0 && s.lines.length > 0), 'every section has a title and lines');
ok(sections.every((s, i) => s.lines.length === FROZEN_LINE_COUNTS[i]), 'every section keeps its exact source line count');
const totalUnits = sections.reduce((sum, s) => sum + s.lines.length, 0);
ok(totalUnits === 761, `761 source lines carried as units (got ${totalUnits})`);
ok(sections.every(s => s.units.length === s.lines.length && new Set(s.units.map(u => u.id)).size === s.units.length), 'each section exposes one distinct unit per line');
ok(sections.every(s => s.units.every(u => u.text === s.lines[Number(u.id.split('-u')[1]) - 1])), 'unit ids map to their own source line');
ok(sections.every(s => s.id === (s.num ? `s${String(s.num).padStart(2, '0')}` : 'cover')), 'section ids follow the sNN/cover convention');
ok(!/[\u202a-\u202e\u2066-\u2069]/.test(readFileSync('src/lessons/lesson44/source44.ts', 'utf8')), 'no bidi control characters in source');
ok(unitId44(0, 0) === 'cover-u1' && unitId44(27, 0) === 's27-u1', 'unitId44 names the cover and numbered sections');

// ---------------- 2) chapters tile the source once ----------------
ok(stations.length === 13, `13 learning chapters (got ${stations.length})`);
ok(stations.every((s, i) => s.start === (i === 0 ? 0 : stations[i - 1].end + 1)), 'chapters tile the steps once, in order');
ok(stations[stations.length - 1].end === 38, 'the last chapter ends on the final source section');
ok(stations.every(s => s.name.trim() && s.en.trim()), 'every chapter has an Arabic name and an English label');
ok(station44(0) === stations[0] && station44(38) === stations[12] && station44(13) === stations[4], 'station44 maps steps to their chapter');
ok(stepCount === 39 && sectionCount === 39, 'lesson exposes 39 student steps');
ok(title === 'MUST & HAVE TO' && identity === 'English Learning Studio', 'lesson identity is the English Learning Studio');
ok(next.status === 'planned-not-implemented' && next.label.includes('45'), 'Lesson 45 stays a planned station');

// ---------------- 3) practice bank §§28–32 ----------------
ok(practice.length === 25, `25 practice items (got ${practice.length})`);
ok([28, 29, 30, 31, 32].every(n => practice.filter(p => p.section === n).length === 5), 'five practice items per exercise section');
ok(practice.every(p => p.prompt.trim() && p.sourceAnswer.trim() && p.parts.length > 0), 'every practice item has a prompt, a source key and a task label');
ok(new Set(practice.map(p => p.id)).size === practice.length, 'practice ids are unique');
ok(practice.every(p => p.id === `p${p.section}-${p.number}`), 'practice ids follow p<section>-<number>');
ok(practice.every(p => /^[A-E]\.|^[a-z']|^[A-Z]/.test(p.sourceAnswer)), 'practice keys keep their source form');
ok(practice.every(p => p.options.every(o => /^[A-E]\. /.test(o))), 'choice options keep the source letter prefix');
ok(practice.filter(p => p.section === 28).every(p => p.options.length === 2), '§28 exercise 1 is a two-option choice as supplied');
ok(practice.filter(p => p.section >= 29).every(p => p.options.length === 0), '§29–§32 are completion/transformation items as supplied');
ok(practice.every(p => practiceReason44(p.section, p.number) !== 'راجع القاعدة في هذا القسم.'), 'every practice key has a specific grammar explanation');

// ---------------- 4) final test + solutions ----------------
ok(levels.length === 5, `five test levels (got ${levels.length})`);
ok(questionCount === 25 && questions.length === 25, `exactly 25 test questions (got ${questionCount})`);
ok(new Set(questions.map(q => q.id)).size === 25, 'test question ids are unique');
ok(questions.every((q, i) => q.number === i + 1), 'test questions are numbered 1–25 in order');
ok(questions.every(q => q.lines.length > 0 && q.fields.length > 0), 'every question has source lines and at least one answer field');
ok(questions.every(q => q.fields.every(f => f.trim().length > 0)), 'every answer field has a label');
ok(levels.map(l => l.questions.length).join(',') === '5,5,5,5,5', 'each level holds five questions');
ok(levels[4].context.length > 0, 'level five keeps its source context block');
ok(solutions.length === 25, `25 separate solutions (got ${solutions.length})`);
ok(solutions.every(s => s && typeof s.answer === 'string' && s.answer.trim() && typeof s.reason === 'string' && s.reason.trim()), 'each solution holds its source key and reasoning');
ok(solutions.every((s, i) => s.id === `q${i + 1}` && s.number === i + 1), 'solutions map one-to-one to the 25 questions');
ok(solutions.every(s => s.reason.includes('Source key:')), 'every solution names the source key explicitly');
ok(solutions.every(s => s.provenance.includes('§34')), 'every solution states where the key comes from');
ok(questions.every(q => q.fields.every((_, i) => !testComplete44({ [`${q.id}-${i}`]: 'x' }))), 'a single answer never completes the test');
const fullAnswers = Object.fromEntries(questions.flatMap(q => q.fields.map((_, i) => [`${q.id}-${i}`, 'x'])));
ok(testComplete44(fullAnswers), 'the test completes only when every field is answered');
const almost = { ...fullAnswers }; delete almost['q25-0'];
ok(!testComplete44(almost), 'one missing field keeps the test incomplete');

// ---------------- 5) coverage ledger ----------------
ok(coverage.length === 39, 'coverage ledger has one row per source section');
ok(coverage.every((row, i) => row.number === i && row.id === sections[i].id), 'coverage rows follow the source order');
ok(coverage.every((row, i) => row.units.length === sections[i].lines.length), 'coverage carries every source unit');
ok(coverage.every((row, i) => row.units.every((u, k) => u.text === sections[i].lines[k])), 'coverage unit text matches the source line');
ok(coverage.every(row => row.destination.trim().length > 0 && row.answerLocation.trim().length > 0), 'every row names its destination and where its key lives');
ok(coverage.filter(row => row.number >= 28 && row.number <= 32).every(row => row.items.length === 5), 'practice rows list all five exercised items');
ok(coverage[34].items.length === 25 && coverage[34].items.every((item, i) => item.id === questions[i].id), 'the test row lists all 25 questions');
ok(notes.length >= 8, 'coverage records the source-accuracy notes');
ok(additions.some(a => a.includes('English Learning Studio')) && additions.some(a => a.includes('Newsreader')), 'coverage records the new visual identity and its local fonts');
ok(notes.some(a => a.includes('§28–33') || a.includes('§§28–33')), 'coverage records the practice/reading key gating');

// ---------------- 6) registration, gates and scope ----------------
const app = readFileSync('src/App.tsx', 'utf8');
ok(app.includes('route === 44') && app.includes('href: "#/lesson/44"'), 'App.tsx routes and links Lesson 44');
ok(/import Lesson44/.test(app), 'App.tsx imports Lesson44');
const lesson = readFileSync('src/lessons/lesson44/Lesson44.tsx', 'utf8');
ok(/const unlocked = submitted \|\| teacher/.test(lesson), 'solutions unlock on submission or teacher access only');
ok(/if \(!submitted\) setAnswers/.test(lesson), 'answers are immutable after submission');
ok(/lazy\(\(\) => import\('\.\/SolutionsArea44'\)\)/.test(lesson), 'solutions bundle is lazy — no hidden DOM before submit');
ok(/if \(testComplete44\(answers\)\)/.test(lesson), 'submit re-validates completeness');
const teacher = readFileSync('src/lessons/lesson44/TeacherArea44.tsx', 'utf8');
ok(/TEACHER_PASSWORD_44 = 'somer173'/.test(teacher), 'existing teacher password preserved');
ok(/lazy\(\(\) => import\('\.\/TeacherGuide44'\)\)/.test(teacher), 'teacher guide is lazy behind the password');
const steps = readFileSync('src/lessons/lesson44/Steps44.tsx', 'utf8');
ok(!/Show source|نص المصدر الحرفي|data-source-reveal/i.test(steps), 'no raw source reveal in the student area');
const css = readFileSync('src/lessons/lesson44/lesson44.css', 'utf8');
ok(css.includes('.lesson44') && !/(^|\n)\s*body\s*\{/.test(css), 'styles stay scoped under .lesson44');
ok(!/gradient\(/.test(css) && !/backdrop-filter:\s*blur\((?!8px)/.test(css), 'no decorative gradients or heavy glass effects');
ok(!/#000000|#0{3,6}\b|black/.test(css), 'no black/near-black token');

// WCAG AA contrast for the Studio palette (rendered checks live in the DOM audit).
const lum = hex => {
  const rgb = hex.match(/\w\w/g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
};
const PAIRS = [
  ['17316B', 'FFF8EC'], ['42516D', 'FFF8EC'], ['5A6780', 'FFF8EC'], ['2448D8', 'FFF8EC'],
  ['087F68', 'FFF8EC'], ['C63F27', 'FFF8EC'], ['5B4B99', 'FFF8EC'], ['8A5A00', 'FFF8EC'],
  ['17316B', 'FFFFFF'], ['42516D', 'FFFFFF'], ['5A6780', 'FFFFFF'],
  ['1B37B8', 'E9EDFF'], ['06604F', 'E2F2EC'], ['9A2F1C', 'FCEAE4'], ['5B4B99', 'F2ECFF'], ['8A5A00', 'FFF1D2'],
  ['1B6B3A', 'E7F4EA'], ['A3260F', 'FCE7E1'], ['FFFFFF', '17316B'], ['FFFFFF', '2448D8'],
  ['FFFFFF', '087F68'], ['FFFFFF', 'C63F27'], ['17316B', 'FBF0DE'],
];
for (const [fg, bg] of PAIRS) {
  const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
  ok((hi + .05) / (lo + .05) >= 4.5, `contrast ${fg}/${bg} >= 4.5:1`);
}

// Scope guard: the lesson, its evidence and the minimum integration points.
const integration = new Set([
  'package.json', 'src/App.tsx', 'scripts/audit-final-test.mjs', 'scripts/audit-final-test-coverage.mjs',
  'scripts/audit-source-reveal.mjs', 'scripts/audit-bidi-mixed.mjs', 'scripts/audit-render-direction.mjs',
  'scripts/check-english-direction.mjs', 'scripts/test-bidi-rendering.mjs', 'scripts/audit-lesson-navigation.mjs',
  'scripts/audit-lesson39.mjs', 'scripts/audit-lesson40.mjs', 'scripts/audit-lesson41.mjs',
  'scripts/audit-lesson42.mjs', 'scripts/audit-lesson43.mjs',
]);
const resolveBase = () => {
  for (const candidate of ['HEAD', 'origin/main', 'main']) {
    try { execFileSync('git', ['rev-parse', '--verify', '--quiet', candidate], { stdio: 'ignore' }); return candidate; } catch { /* try next */ }
  }
  return null;
};
const base = resolveBase();
const changed = [...new Set([
  ...(base ? execFileSync('git', ['diff', '--name-only', base], { encoding: 'utf8' }).split('\n') : []),
  ...execFileSync('git', ['ls-files', '--others', '--exclude-standard'], { encoding: 'utf8' }).split('\n'),
].filter(Boolean))];
// The lesson ships with its own audits and with the course-wide inventory
// updates they need (the suite asserted "43 lessons" before Lesson 44).
const inScope = path => integration.has(path)
  || path.startsWith('src/lessons/lesson44/')
  || path.startsWith('docs/lesson44-')
  || /^scripts\/(?:audit-[\w-]+|check-english-direction|test-bidi-rendering)\.mjs$/.test(path);
ok(changed.every(inScope), `no unrelated modified files (${changed.filter(p => !inScope(p)).join(', ')})`);
ok(!changed.some(path => /^src\/lessons\/lesson(?:[1-9]|[1-3][0-9]|4[0-3])\//.test(path)), 'Lessons 1–43 source remains untouched');

console.log(`Lesson 44 static audit passed: ${checks} assertions; 39 source sections / ${totalUnits} lines, 13 chapters, 25 practice items, 25 test questions, 25 solutions. Render/interaction contracts run in audit-lesson44-dom.mjs.`);
