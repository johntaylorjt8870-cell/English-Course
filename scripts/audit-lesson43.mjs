import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { build } from 'esbuild';
import { createHash } from 'node:crypto';

const dir = 'node_modules/.lesson43-audit';
mkdirSync(dir, { recursive: true });
await build({
  stdin: {
    contents: `export * from './src/lessons/lesson43/ledger43';\nexport * from './src/lessons/lesson43/practiceData43';\nexport * from './src/lessons/lesson43/testData43';\nexport * from './src/lessons/lesson43/solutionsData43';\nexport * from './src/lessons/lesson43/practiceNotes43';\nexport * from './src/lessons/lesson43/coverage43';`,
    resolveDir: process.cwd(),
  },
  outfile: `${dir}/data.mjs`, bundle: true, platform: 'node', format: 'esm',
});
const data = await import(`../${dir}/data.mjs?${Date.now()}`);
let checks = 0;
const ok = (condition, message) => { checks++; assert.ok(condition, message); };

const {
  SOURCE_SECTIONS_43: sections, PRACTICE_43: practice, TEST_LEVELS_43: levels, TEST_QUESTIONS_43: questions,
  TEST_SOLUTIONS_43: solutions, COVERAGE_43: coverage, COVERAGE_ACCURACY_NOTES_43: notes,
  COVERAGE_PLATFORM_ADDITIONS_43: additions, STATIONS_43: stations, NEXT_LESSON_43: next,
  NUMBER_MARKS_43: marks, testComplete43,
} = data;

// ---------------- 1) source ledger integrity ----------------
ok(sections.length === 38, 'opening plus 37 sections');
ok(sections.every((s, i) => s.num === i && s.lines.length > 0), 'sections ordered and substantive');
const manifest = JSON.parse(readFileSync('docs/lesson43-source-manifest.json', 'utf8'));
ok(manifest.length === 38, 'source manifest lists 38 sections');
const totalUnits = sections.reduce((a, s) => a + s.lines.length, 0);
for (const [i, section] of sections.entries()) {
  const hash = createHash('sha256').update(section.lines.join('\n')).digest('hex');
  ok(hash === manifest[i].sha256 && section.lines.length === manifest[i].units, `section ${i}: frozen source inventory unchanged`);
  ok(coverage[i].units.length === section.lines.length, `section ${i} coverage includes every line`);
  ok(new Set(section.units.map(u => u.id)).size === section.units.length, `section ${i} distinct units`);
}
ok(totalUnits === 827, `all 827 source lines carried as units (got ${totalUnits})`);
ok(!/[\u202a-\u202e\u2066-\u2069]/.test(readFileSync('src/lessons/lesson43/source43.ts', 'utf8')), 'no bidi control characters in source');
ok(!sections.some(section => section.lines.some(line => /^[A-Za-z0-9][^\n]*؟/.test(line))), 'no Arabic question mark ends an English sentence (Arabic-led mixed lines keep ؟ per repo convention)');
ok(!/[\u{1F1E6}-\u{1F1FF}]{2}/u.test(readFileSync('src/lessons/lesson43/source43.ts', 'utf8')), 'no regional-indicator flag emoji anywhere in the lesson');
// every one of the 25 test questions and every practice item is present in the frozen source
const sourceAll = sections.map(s => s.lines.join('\n')).join('\n');
for (const line of ['① She ______ come tomorrow.', '⑩ We ______ (may / have / make) a mistake.', '⑮ Maybe he tired.', '⑳ ما وظيفة MAY في الجملة:', '㉕ استخدم MAYBE بوصفها كلمة مستقلة.']) {
  ok(sections[33].lines.includes(line), `§33 preserves: ${line}`);
}

// ---------------- 2) practice banks (§§27–32) ----------------
const expected = { 27: 6, 28: 6, 29: 6, 30: 5, 31: 10, 32: 10 };
for (const [section, count] of Object.entries(expected)) {
  const items = practice.filter(p => p.section === Number(section));
  ok(items.length === count, `§${section} count`);
  ok(new Set(items.map(p => p.id)).size === count, `§${section} unique items`);
  items.forEach((item, i) => {
    ok(item.number === i + 1, 'source item order');
    ok(item.prompt && item.sourceAnswer && data.practiceReason43(item.section, item.number), 'prompt, source answer and authored reason all exist');
  });
}
ok(practice.length === 43, `43 practice items in total (got ${practice.length})`);
// §27: MAY and MIGHT are both accepted — the grader must never reject either
ok(practice.filter(p => p.section === 27).every(p => (p.accepted ?? []).includes('MAY') && (p.accepted ?? []).includes('MIGHT')), '§27 accepts MAY and MIGHT interchangeably');
// §28: multiple choice with the source keys A B A C B A
const mcSection = sections[28].lines;
practice.filter(p => p.section === 28).forEach((item, i) => {
  ok(item.options.length === 3, `§28 item ${item.number} keeps three options`);
  const keyLetter = item.sourceAnswer.match(/^\s*([ABC])\s*—/)?.[1];
  ok(keyLetter && item.options.some(o => o.startsWith(`${keyLetter}.`)), `§28 item ${item.number} key ${keyLetter} matches an option`);
  ok(mcSection.some(l => l.replace(/^[①-⑥]\s*/, '').trim() === item.sourceAnswer), `§28 item ${item.number} key verbatim in source`);
});
// §29: maybe / may be with the source keys
practice.filter(p => p.section === 29).forEach((item, i) => {
  ok(item.options.length === 2, `§29 item ${item.number} keeps both options`);
  ok(item.accepted?.length === 1 && ['Maybe', 'may be'].includes(item.accepted[0]), `§29 item ${item.number} has exactly one accepted answer`);
  ok(sections[29].lines.some(l => l.replace(/^[①-⑥]\s*/, '').trim().replace(/\.$/, '') === item.accepted[0]), `§29 item ${item.number} key verbatim in source`);
});
// §30: rewrites with the interchangeability note preserved
practice.filter(p => p.section === 30).forEach(item => {
  ok(item.parts.join(',') === 'response', '§30 items are free rewrites');
  ok(item.note?.includes('يمكن تبديل MAY وMIGHT'), '§30 keeps the source interchangeability note');
  ok(sections[30].lines.some(l => l.includes(item.sourceAnswer.split(' — ')[0])), `§30 item ${item.number} model answer verbatim in source`);
});
// §31: ten repairs, keys verbatim, item 8 keeps its nuanced answer
practice.filter(p => p.section === 31).forEach(item => {
  ok(item.parts.join(',') === 'response', '§31 items are free repairs');
  ok(sections[31].lines.some(l => l.replace(/^[①-⑩]\s*/, '').trim() === item.sourceAnswer), `§31 item ${item.number} key verbatim in source`);
});
const repair8 = practice.find(p => p.section === 31 && p.number === 8);
ok(repair8.sourceAnswer.includes('May she come?') && repair8.sourceAnswer.includes('Is she likely to come?'), '§31 ⑧ keeps both the grammatical form and the daily-default rewrite');
// §32: reading questions with verbatim keys
practice.filter(p => p.section === 32).forEach(item => {
  ok(item.parts.join(',') === 'answer', '§32 reading questions use one answer field');
  ok(sections[32].lines.some(l => l.replace(/^[①-⑩]\s*/, '').trim() === item.sourceAnswer), `§32 item ${item.number} key verbatim in source`);
});

// ---------------- 3) final test: 25 questions / five levels ----------------
ok(levels.length === 5 && levels.every(l => l.questions.length === 5), 'exactly five levels of five');
ok(questions.length === 25 && new Set(questions.map(q => q.id)).size === 25, 'exactly 25 distinct final questions');
ok(questions[8].fields.length === 3 && questions[9].fields.length === 3, 'Q9 and Q10 keep three blanks (modal / HAVE / V3)');
ok(levels[4].context.length === 10, 'level 5 keeps the Missing Homework dialogue context');
ok(levels.every((l, i) => l.title === `المستوى ${['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس'][i]}: ${['Multiple Choice', 'Complete the Sentences', 'Correct the Mistakes', 'Understand the Meaning', 'Final IQ200 Boss'][i]}`), 'level titles preserved verbatim from §33');
ok(solutions.length === 25 && solutions.every((s, i) => s.number === i + 1 && s.answer && s.reason), '25 detailed ordered keys');
// every §34 source key is represented verbatim in the solutions
const keyBlock = sections[34].lines.join('\n');
for (const solution of solutions) {
  ok(solution.answer.split(' أو: ').every(part => keyBlock.includes(part)), `solution ${solution.number} matches the §34 source key`);
  ok(solution.provenance.includes('§34'), `solution ${solution.number} credits the source key`);
}
// every §33 prompt appears in the test data
const read43 = name => readFileSync(`src/lessons/lesson43/${name}`, 'utf8');
const promptText = levels.flatMap(l => [l.title, ...l.context, ...l.questions.flatMap(q => [...q.lines, ...q.options])]).join('\n') + read43('TestArea43.tsx');
for (const line of sections[33].lines) {
  if (line === 'الأسئلة:') continue;
  const clean = marks.includes(line[0]) ? line.slice(1).trim() : line;
  ok(promptText.includes(clean), `test preserves source: ${clean.slice(0, 60)}`);
}
ok(!testComplete43({}), 'empty test cannot submit');
const complete = Object.fromEntries(questions.flatMap(q => q.fields.map((_, i) => [`${q.id}-${i}`, 'attempt'])));
ok(testComplete43(complete), 'completed test can submit');
delete complete['q9-1'];
ok(!testComplete43(complete), 'Q9 middle blank (HAVE) required');
delete complete['q10-2'];
ok(!testComplete43(complete), 'Q10 V3 blank required');

// ---------------- 4) answer isolation and gating ----------------
const testGraph = await build({ entryPoints: ['src/lessons/lesson43/TestArea43.tsx'], write: false, bundle: true, metafile: true, platform: 'browser', format: 'esm' });
ok(!Object.keys(testGraph.metafile.inputs).some(p => /solutionsData|TeacherGuide|practiceData|ledger43|source43/.test(p)), 'test dependency graph contains no source ledger, keys or teacher modules');
ok(!/sourceAnswer|correctAnswer|correct:|solutionsData|answerKey/.test(read43('testData43.ts')), 'student test data has no key fields');
ok(/lazy\(\s*\(\)\s*=>\s*import\('\.\/SolutionsArea43'\s*\)/.test(read43('Lesson43.tsx')), 'lazy solutions');
ok(/area\s*===\s*'solutions'\s*&&\s*unlocked/.test(read43('Lesson43.tsx')), 'solutions render gated');
ok(/unlocked\s*=\s*submitted\s*\|\|\s*teacher/.test(read43('Lesson43.tsx')), 'submission or teacher authorization');
ok(/testComplete43\(answers\)/.test(read43('Lesson43.tsx')), 'submit revalidates completeness');
ok(/setAnswers\(\{\s*\}\)[^;]*;\s*setSubmitted\(false\)/.test(read43('Lesson43.tsx')), 'reset clears answers and submission');
ok(/lazy\(\s*\(\)\s*=>\s*import\('\.\/TeacherGuide43'\s*\)/.test(read43('TeacherArea43.tsx')), 'lazy teacher guide');
ok(!/section43\(34\)\.lines/.test(read43('Steps43.tsx')), 'student steps never render the §34 answer key');
const oldPassword = readFileSync('src/lessons/lesson40/TeacherArea40.tsx', 'utf8').match(/TEACHER_PASSWORD_40 = "([^"]+)"/)[1];
ok(read43('TeacherArea43.tsx').includes(`TEACHER_PASSWORD_43 = '${oldPassword}'`), 'existing teacher mechanism preserved');
ok(read43('kit43.tsx').includes("import { Rich }") && /dir="ltr" lang="en"/.test(read43('kit43.tsx')), 'shared mixed BIDI + explicit English direction');
ok(!/Show source|نص المصدر الحرفي|data-source-reveal/i.test(read43('Steps43.tsx')), 'no student raw-source reveal');
ok(read43('labs43.tsx').includes('لا يُصحَّح آليًا') && read43('labs43.tsx').includes('إضافة المنصة'), 'writing model and practice comparison are honestly labelled');
// the source rejects fixed percentages; the implementation must too
ok(!/(70|30)\s*%/.test(read43('labs43.tsx') + read43('Steps43.tsx') + read43('kit43.tsx')), 'no invented percentages for MAY vs MIGHT strength');
ok(read43('labs43.tsx').includes('لا توجد قاعدة نسبية ثابتة') || read43('labs43.tsx').includes('لا توجد قاعدة ثابتة'), 'the no-fixed-percentage stance is stated');
ok(read43('labs43.tsx').includes('رسمي') && read43('labs43.tsx').includes('MIGHT I'), 'might-I formality caveat preserved');

// ---------------- 5) registration and roadmap ----------------
const app = readFileSync('src/App.tsx', 'utf8');
ok(app.includes('route === 43') && app.includes('href: "#/lesson/43"'), 'route + hub card');
ok(app.includes('route === 44') && existsSync('src/lessons/lesson44'), 'Lesson 44 ships in its own folder');
ok(next.status === 'planned-not-implemented', 'Lesson 43 data still describes Lesson 44 as planned — lesson 43 data untouched');
ok(stations.length === 11 && stations.every((s, i) => s.start === (i === 0 ? 0 : stations[i - 1].end + 1)), 'stations tile every step once in order');
ok(stations[stations.length - 1].end === 37, 'last station ends at the final step');
ok(notes.length >= 8 && additions.length >= 8, 'coverage ledger records accuracy notes and platform additions');

// ---------------- 6) WCAG AA contrast for every token pairing ----------------
function luminance(hex) {
  const rgb = hex.match(/\w\w/g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
const pairs = [
  ['1B1C33', 'F7F6FC'], ['1B1C33', 'FFFFFF'], ['4B5070', 'F7F6FC'], ['4B5070', 'FFFFFF'],
  ['E9EBF8', '12173A'], ['B9BFE4', '1E2550'], ['FCD34D', '12173A'], ['FCD34D', '1E2550'],
  ['0A5A59', 'E2F3F2'], ['0A5A59', 'FFFFFF'], ['0E7C7B', 'FFFFFF'], ['7C3A06', 'FBEFDF'],
  ['7C3A06', 'FFFFFF'], ['B45309', 'FFFFFF'], ['FFFFFF', '0E7C7B'], ['FFFFFF', 'B45309'],
  ['166534', 'E5F3E9'], ['B91C1C', 'FBE7E7'], ['3F4A5A', 'EEF1F7'], ['4B5070', 'E2F3F2'],
  ['4B5070', 'FBEFDF'], ['4B5070', 'E5F3E9'], ['4B5070', 'FBE7E7'], ['4B5070', 'EEF1F7'],
  ['FFFFFF', '0E7C7B'], ['FFFFFF', 'B45309'], ['FFFFFF', '166534'], ['FFFFFF', 'B91C1C'], ['3F4A5A', 'FFFFFF'],
  ['166534', 'FFFFFF'], ['B91C1C', 'FFFFFF'], ['0A5A59', 'FFFFFF'], ['7C3A06', 'FFFFFF'],
  ['5B21B6', 'EEE9FA'], ['334155', 'E8EAF2'], ['166534', 'E7F2E9'], ['0A5A59', 'E2F3F2'],
  ['7C3A06', 'FBEFDF'], ['5B21B6', 'EEE9FA'], ['334155', 'E8EAF2'], ['E9EBF8', '0B1030'],
  ['7FD4D3', '12173A'], ['F5C08A', '12173A'], ['E9EBF8', '1E2550'], ['B9BFE4', '12173A'],
];
for (const [fg, bg] of pairs) {
  const l = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  ok((l[0] + .05) / (l[1] + .05) >= 4.5, `${fg}/${bg} >=4.5:1`);
}

// ---------------- 7) scope guard ----------------
const integration = new Set(['package.json', 'src/App.tsx', 'scripts/audit-final-test.mjs', 'scripts/audit-lesson-navigation.mjs',
  'scripts/audit-lesson31.mjs', 'scripts/audit-lesson37.mjs', 'scripts/audit-lesson38.mjs', 'scripts/audit-lesson39.mjs',
  'scripts/audit-lesson40.mjs', 'scripts/audit-lesson41.mjs', 'scripts/audit-lesson42.mjs', 'scripts/audit-render-direction.mjs',
  'scripts/check-english-direction.mjs', 'scripts/audit-bidi-mixed.mjs']);
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
ok(changed.every(path => integration.has(path)
  || path.startsWith('src/lessons/lesson43/') || path.startsWith('src/lessons/lesson44/')
  || /^docs\/lesson4[34]-/.test(path)
  || /^scripts\/(?:audit-lesson\d+(?:-dom|-browser)?|audit-bidi-mixed|audit-render-direction|audit-final-test(?:-coverage)?|audit-source-reveal|audit-lesson-navigation|check-english-direction|test-bidi-rendering|lesson4\d-coverage-doc)\.mjs$/.test(path)), `no unrelated modified files (${changed.join(', ')})`);
ok(!changed.some(path => /^src\/lessons\/lesson(?:[1-9]|[1-3][0-9]|4[0-2])\//.test(path)), 'Lessons 1–42 source remains untouched');

console.log(`Lesson 43 static/data audit passed: ${checks} assertions; 38 sections (${totalUnits} units), ${practice.length} practice items, 25 test questions, ${solutions.length} detailed keys, ${pairs.length} contrast pairs.`);
