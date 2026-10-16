import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { build } from 'esbuild';
import { createHash } from 'node:crypto';

const dir = 'node_modules/.lesson42-audit';
mkdirSync(dir, { recursive: true });
await build({
  stdin: {
    contents: `export * from './src/lessons/lesson42/ledger42';
export * from './src/lessons/lesson42/practiceData42';
export * from './src/lessons/lesson42/testData42';
export * from './src/lessons/lesson42/solutionsData42';
export * from './src/lessons/lesson42/practiceNotes42';
export * from './src/lessons/lesson42/coverage42';`,
    resolveDir: process.cwd(),
  },
  outfile: `${dir}/data.mjs`, bundle: true, platform: 'node', format: 'esm',
});
const data = await import(`../${dir}/data.mjs?${Date.now()}`);
let checks = 0;
const ok = (condition, message) => { checks++; assert.ok(condition, message); };

const {
  SOURCE_SECTIONS_42: sections, PRACTICE_42: practice, TEST_LEVELS_42: levels, TEST_QUESTIONS_42: questions,
  TEST_SOLUTIONS_42: solutions, COVERAGE_42: coverage, COVERAGE_ACCURACY_NOTES_42: notes,
  COVERAGE_PLATFORM_ADDITIONS_42: additions, STATIONS_42: stations, NEXT_LESSON_42: next,
  NUMBER_MARKS_42: marks, testComplete42,
} = data;

// ---------------- 1) source ledger integrity ----------------
ok(sections.length === 45, 'opening plus 44 sections');
ok(sections.every((s, i) => s.num === i && s.lines.length > 0), 'sections ordered and substantive');
const manifest = JSON.parse(readFileSync('docs/lesson42-source-manifest.json', 'utf8'));
ok(manifest.length === 45, 'source manifest lists 45 sections');
const totalUnits = sections.reduce((a, s) => a + s.lines.length, 0);
for (const [i, section] of sections.entries()) {
  const hash = createHash('sha256').update(section.lines.join('\n')).digest('hex');
  ok(hash === manifest[i].sha256 && section.lines.length === manifest[i].units, `section ${i}: frozen source inventory unchanged`);
  ok(coverage[i].units.length === section.lines.length, `section ${i} coverage includes every line`);
  ok(new Set(section.units.map(u => u.id)).size === section.units.length, `section ${i} distinct units`);
}
ok(totalUnits === 932, `all 932 source lines carried as units (got ${totalUnits})`);
ok(!/[\u202a-\u202e\u2066-\u2069]/.test(readFileSync('src/lessons/lesson42/source42.ts', 'utf8')), 'no bidi control characters in source');
ok(!sections.some(section => section.lines.some(line => /[A-Za-z0-9]\u061f(\s*$|\s+[A-Za-z0-9(])/.test(line))), 'no Arabic question mark ends an English sentence (punctuation normalization; Arabic sentences quoting English keep ؟)');
ok(!/[\u{1F1E6}-\u{1F1FF}]{2}/u.test(readFileSync('src/lessons/lesson42/source42.ts', 'utf8')), 'no regional-indicator flag emoji anywhere in the lesson');

// ---------------- 2) practice banks (§§34–39) ----------------
const expected = { 34: 8, 35: 5, 36: 5, 37: 5, 38: 10, 39: 10 };
for (const [section, count] of Object.entries(expected)) {
  const items = practice.filter(p => p.section === Number(section));
  ok(items.length === count, `§${section} count`);
  ok(new Set(items.map(p => p.id)).size === count, `§${section} unique items`);
  items.forEach((item, i) => {
    ok(item.number === i + 1, 'source item order');
    ok(item.prompt && item.sourceAnswer && data.practiceReason42(item.section, item.number), 'prompt, source answer and authored reason all exist');
  });
}
ok(practice.length === 43, `43 practice items in total (got ${practice.length})`);
ok(practice.filter(p => p.section === 38).every(p => p.parts.join(',') === 'repair,reason'), 'all ten detective repairs require repair AND reason');
ok(practice.filter(p => p.section === 37).every(p => p.options.length === 2), 'all five able-to items keep both options');
ok(practice.filter(p => p.section === 39).every(p => p.parts.join(',') === 'answer'), 'reading questions use one answer field');
// source §38 and §39 keys must match the ledger exactly (source lines carry a ①–⑩ marker)
for (const item of practice.filter(p => p.section === 38 || p.section === 39)) {
  ok(sections[item.section].lines.some(l => l.includes(item.sourceAnswer.split('\n')[0])), `${item.id}: key line present verbatim in source §${item.section}`);
}

// ---------------- 3) final test: 25 questions / five levels ----------------
ok(levels.length === 5 && levels.every(l => l.questions.length === 5), 'exactly five levels of five');
ok(questions.length === 25 && new Set(questions.map(q => q.id)).size === 25, 'exactly 25 distinct final questions');
ok(questions[6].fields.length === 2, 'Q7 retains two blanks');
ok(levels[4].context.length === 7, 'level 5 keeps the dialogue context with five blanks');
ok(solutions.length === 25 && solutions.every((s, i) => s.number === i + 1 && s.answer && s.reason), '25 detailed ordered keys');
// every §41 source key is represented in the solutions
const source41 = sections[41].lines;
for (const key of ['A — can.', 'B — could.', 'B — Could.', "A — couldn't.", 'B — be able to.', "⑥ can't.", 'Can you play.', '⑧ could.', 'were able to.', 'will be able to.', 'He can swim very well.', 'Can you help me?', 'She could play the piano when she was young.', 'I will be able to finish the project tomorrow.', 'Could you repeat the question?', '㉑ Can.', "㉒ couldn't.", '㉓ Could.', '㉔ could.', '㉕ will be able to.']) {
  ok(source41.some(line => line.includes(key)), `source §41 key preserved: ${key}`);
  ok(solutions.some(s => String(s.answer).includes(key.replace(/[⑥-⑳㉑-㉕]\s*/, '').replace(/\.$/, ''))), `solution matches source key: ${key}`);
}
// every §40 prompt appears in the test data
const read42 = name => readFileSync(`src/lessons/lesson42/${name}`, 'utf8');
const promptText = levels.flatMap(l => [l.title, ...l.context, ...l.questions.flatMap(q => [...q.lines, ...q.options])]).join('\n') + read42('TestArea42.tsx');
for (const line of sections[40].lines) {
  if (line === 'الأسئلة:' || line.startsWith('المستوى') || line.startsWith('أكمل الحوار') || line.startsWith('25 سؤالًا')) continue;
  const clean = marks.includes(line[0]) ? line.slice(1).trim() : line;
  ok(promptText.includes(clean), `test preserves source: ${clean.slice(0, 60)}`);
}
ok(!testComplete42({}), 'empty test cannot submit');
const complete = Object.fromEntries(questions.flatMap(q => q.fields.map((_, i) => [`${q.id}-${i}`, 'attempt'])));
ok(testComplete42(complete), 'completed test can submit');
delete complete['q7-1'];
ok(!testComplete42(complete), 'Q7 second blank required');

// ---------------- 4) answer isolation and gating ----------------
const read = name => readFileSync(`src/lessons/lesson42/${name}`, 'utf8');
const testGraph = await build({ entryPoints: ['src/lessons/lesson42/TestArea42.tsx'], write: false, bundle: true, metafile: true, platform: 'browser', format: 'esm' });
ok(!Object.keys(testGraph.metafile.inputs).some(p => /solutionsData|TeacherGuide|practiceData|ledger42|source42/.test(p)), 'test dependency graph contains no source ledger, keys or teacher modules');
ok(!/sourceAnswer|correctAnswer|correct:|solutionsData|answerKey/.test(read('testData42.ts')), 'student test data has no key fields');
ok(/lazy\(\s*\(\)\s*=>\s*import\('\.\/SolutionsArea42'\s*\)/.test(read('Lesson42.tsx')), 'lazy solutions');
ok(/area\s*===\s*'solutions'\s*&&\s*unlocked/.test(read('Lesson42.tsx')), 'solutions render gated');
ok(/unlocked\s*=\s*submitted\s*\|\|\s*teacher/.test(read('Lesson42.tsx')), 'submission or teacher authorization');
ok(/testComplete42\(answers\)/.test(read('Lesson42.tsx')), 'submit revalidates completeness');
ok(/setAnswers\(\{\s*\}\)[^;]*;\s*setSubmitted\(false\)/.test(read('Lesson42.tsx')), 'reset clears answers and submission');
ok(/lazy\(\s*\(\)\s*=>\s*import\('\.\/TeacherGuide42'\s*\)/.test(read('TeacherArea42.tsx')), 'lazy teacher guide');
ok(!/section42\(41\)\.lines/.test(read('Steps42.tsx')), 'student steps never render the §41 answer key');
const oldPassword = readFileSync('src/lessons/lesson40/TeacherArea40.tsx', 'utf8').match(/TEACHER_PASSWORD_40 = "([^"]+)"/)[1];
ok(read('TeacherArea42.tsx').includes(`TEACHER_PASSWORD_42 = '${oldPassword}'`), 'existing teacher mechanism preserved');
ok(read('kit42.tsx').includes("import { Rich }") && /dir=\{english\s*\?\s*'ltr'/.test(read('kit42.tsx')), 'shared mixed BIDI + explicit English direction');
ok(!/Show source|نص المصدر الحرفي|data-source-reveal/i.test(read('Steps42.tsx')), 'no student raw-source reveal');
ok(read('labs42.tsx').includes('ليس تقييمًا لقواعد كتابتك') && read('labs42.tsx').includes('ليس تصحيحًا آليًا'), 'writing counter and practice comparison are honestly labelled');

// ---------------- 5) registration and roadmap ----------------
const app = readFileSync('src/App.tsx', 'utf8');
ok(app.includes('route === 42') && app.includes('href: "#/lesson/42"'), 'route + hub card');
ok(!app.includes('route === 44') && !existsSync('src/lessons/lesson44'), 'no Lesson 44 implementation');
ok(next.status === 'planned-not-implemented', 'Lesson 42 keeps its frozen roadmap entry');
ok(stations.length === 10 && stations.every((s, i) => s.start === (i === 0 ? 0 : stations[i - 1].end + 1)), 'stations tile every step once in order');
ok(stations[stations.length - 1].end === 44, 'last station ends at the final step');
ok(notes.length >= 8 && additions.length >= 8, 'coverage ledger records accuracy notes and platform additions');

// ---------------- 6) WCAG AA contrast for every token pairing ----------------
function luminance(hex) {
  const rgb = hex.match(/\w\w/g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
const pairs = [
  ['1C1A17', 'F4F1EA'], ['1C1A17', 'FFFFFF'], ['5B554B', 'F4F1EA'], ['5B554B', 'FFFFFF'],
  ['E9E3D6', '14110D'], ['C9C1B0', '241F18'], ['C2410C', 'FFFFFF'], ['C2410C', 'F4F1EA'],
  ['9A3412', 'FDECE1'], ['A21CAF', 'FFFFFF'], ['86198F', 'FBEAFB'], ['A21CAF', 'FBEAFB'],
  ['FFFFFF', '14110D'], ['F5B301', '14110D'], ['F5B301', '241F18'], ['14663C', 'E6F3EB'],
  ['A4133C', 'FCEAEF'], ['3F4A54', 'EEF1F4'], ['5B554B', 'FDECE1'], ['5B554B', 'FBEAFB'],
  ['5B554B', 'E6F3EB'], ['5B554B', 'FCEAEF'], ['5B554B', 'EEF1F4'], ['FFFFFF', 'C2410C'],
  ['FFFFFF', 'A21CAF'], ['FFFFFF', '14663C'], ['FFFFFF', 'A4133C'], ['9A3412', 'F4F1EA'],
  ['9A3412', 'FFFFFF'], ['86198F', 'FFFFFF'], ['14663C', 'FFFFFF'], ['A4133C', 'FFFFFF'], ['3F4A54', 'FFFFFF'],
];
for (const [fg, bg] of pairs) {
  const l = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  ok((l[0] + .05) / (l[1] + .05) >= 4.5, `${fg}/${bg} >=4.5:1`);
}

// ---------------- 7) scope guard ----------------
const integration = new Set(['package.json', 'src/App.tsx', 'scripts/audit-final-test.mjs', 'scripts/audit-lesson-navigation.mjs',
  'scripts/audit-lesson31.mjs', 'scripts/audit-lesson37.mjs', 'scripts/audit-lesson38.mjs', 'scripts/audit-lesson39.mjs',
  'scripts/audit-lesson40.mjs', 'scripts/audit-lesson41.mjs', 'scripts/audit-render-direction.mjs', 'scripts/check-english-direction.mjs', 'scripts/audit-bidi-mixed.mjs']);
const resolveBase = () => {
  for (const candidate of ['HEAD', 'origin/main', 'main']) {
    try { execFileSync('git', ['rev-parse', '--verify', '--quiet', candidate], { stdio: 'ignore' }); return candidate; } catch { /* try next */ }
  }
  return null;
};
const base = resolveBase();
const changed = base
  ? [...new Set([...execFileSync('git', ['diff', '--name-only', base], { encoding: 'utf8' }).split('\n'),
    ...execFileSync('git', ['ls-files', '--others', '--exclude-standard'], { encoding: 'utf8' }).split('\n')].filter(Boolean))]
  : [...execFileSync('git', ['ls-files', '--others', '--exclude-standard'], { encoding: 'utf8' }).split('\n').filter(Boolean)];
ok(changed.every(path => integration.has(path) || path.startsWith('src/lessons/lesson42/') || path.startsWith('src/lessons/lesson43/') || path.startsWith('docs/lesson42-') || path.startsWith('docs/lesson43-')
  || /^scripts\/audit-lesson42(?:-dom|-browser)?\.mjs$/.test(path) || /^scripts\/lesson42-coverage-doc\.mjs$/.test(path) || /^scripts\/audit-lesson43(?:-dom|-browser)?\.mjs$/.test(path) || /^scripts\/lesson43-coverage-doc\.mjs$/.test(path)), `no unrelated modified files (${changed.filter(p => !integration.has(p) && !p.startsWith('src/lessons/lesson42') && !p.startsWith('src/lessons/lesson43') && !p.startsWith('docs/lesson42') && !p.startsWith('docs/lesson43')).join(', ')})`);
ok(!changed.some(path => /^src\/lessons\/lesson(?:[1-9]|[1-3][0-9]|40|41)\//.test(path)), 'Lessons 1–41 source remains untouched');

console.log(`Lesson 42 static/data audit passed: ${checks} assertions; 45 sections (${totalUnits} units), ${practice.length} practice items, 25 test questions, ${testGraph ? '' : ''}${solutions.length} detailed keys, ${pairs.length} contrast pairs.`);
