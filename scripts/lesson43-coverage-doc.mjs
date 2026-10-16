// Regenerates docs/lesson43-coverage.md from the lesson's own data modules, so
// the published coverage document can never drift from the shipped lesson.
//   node scripts/lesson43-coverage-doc.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';

mkdirSync('node_modules/.lesson43-audit', { recursive: true });
await build({
  stdin: {
    contents: `export * from './src/lessons/lesson43/ledger43';\nexport * from './src/lessons/lesson43/practiceData43';\nexport * from './src/lessons/lesson43/testData43';\nexport * from './src/lessons/lesson43/solutionsData43';\nexport * from './src/lessons/lesson43/coverage43';`,
    resolveDir: process.cwd(),
  },
  outfile: 'node_modules/.lesson43-audit/data.mjs', bundle: true, platform: 'node', format: 'esm',
});
const data = await import('../node_modules/.lesson43-audit/data.mjs?' + Date.now());
const { SOURCE_SECTIONS_43: sections, COVERAGE_43: coverage, COVERAGE_ACCURACY_NOTES_43: notes,
  COVERAGE_PLATFORM_ADDITIONS_43: additions, PRACTICE_43: practice, TEST_QUESTIONS_43: questions,
  TEST_SOLUTIONS_43: solutions, STATIONS_43: stations } = data;

const cell = text => String(text).replace(/\|/g, '\\|').replace(/\n/g, '<br/>');
const out = [];
out.push('# Lesson 43 — source-to-implementation coverage');
out.push('');
out.push('Source: complete lesson supplied in the conversation. `source43.ts` preserves the text with the normalization documented below. No external missing source was reconstructed as a quotation.');
out.push('');
out.push('## Mapping rules');
out.push('');
out.push('- Opening plus §§1–37 are 38 native steps in source order; §33 routes to the independent test, §34 to protected teacher access.');
out.push('- Each unit below is one normalized source line, not merely a section heading. Ordinary lines render through Steps43/Lines43. Tables combine contiguous pipe-separated lines into rows with headers.');
out.push('- Numbered practice prompts and options map to the attempt-gated practice engines; source keys appear only after the student writes an attempt. §27 accepts MAY or MIGHT wherever the source allows both. TeacherGuide43 includes every prompt, key and platform-authored explanation.');
out.push('- §26 dialogue renders turn-by-turn and its eight analyzed uses drive the Context Detective. §32 passage is rendered in full before its ten question cards. §35 criteria are checkbox labels; the model paragraph is a separately labelled platform reference.');
out.push('- §33 options and question subparts are independently represented in testData43; the test module imports no solution, source-ledger or teacher data.');
out.push('- §34 is the full 25-key correction list. It is never rendered inside a student step: it lives behind the existing teacher gate and in the post-submission solutions area.');
out.push('- Eleven learning-station markers are attached to the first step of their station, rather than as separate decorative separators.');
out.push('- Decorative separator bars and heading emoji/GB flags were removed. Blank lines collapsed; table cells joined with ` | `. No instructional example, dialogue turn or numbered item was removed.');
out.push('- Source spelling and variety notes are retained, including the §31 ⑧ answer that keeps both the grammatical form and the daily-default rewrite.');
out.push('');
out.push('## Source inventory');
out.push('');
out.push(`- ${sections.length} sections (opening + 37 numbered), ${sections.reduce((a, s) => a + s.lines.length, 0)} normalized units.`);
out.push(`- ${practice.length} attempt-bound practice items (§§27–32), ${questions.length} final-test questions in five levels, ${solutions.length} detailed keys.`);
out.push(`- ${stations.length} stations: ${stations.map(s => `${s.name} ${s.en} (${s.start}–${s.end})`).join(' · ')}.`);
out.push('- Frozen inventory: `docs/lesson43-source-manifest.json` (per-section unit counts and SHA-256 of the normalized lines).');
out.push('');
out.push('## Item and subpart coverage');
out.push('');
out.push('| Source | Items | Implementation | Subparts / solutions |');
out.push('|---|---:|---|---|');
for (const row of coverage) {
  if (!row.items.length) continue;
  out.push(`| §${row.number} | ${row.items.length} | ${row.destination} | ${cell(row.items.map(i => `${i.id} [${i.parts.join(', ')}]`).join('; '))} → ${row.answerLocation} |`);
}
out.push('');
out.push('## Documented source-accuracy notes');
out.push('');
for (const note of notes) out.push(`- ${note}`);
out.push('');
out.push('## Platform-authored additions (not source text)');
out.push('');
for (const addition of additions) out.push(`- ${addition}`);
out.push('');
out.push('## Every normalized source unit');
for (const row of coverage) {
  const section = sections[row.number];
  out.push('');
  out.push(`### ${row.id} — ${section.title}`);
  out.push('');
  out.push(`Destination: **${row.destination}**. Answer/explanation destination: **${row.answerLocation}**.`);
  out.push('');
  out.push('| Unit | Source content |');
  out.push('|---|---|');
  for (const unit of row.units) out.push(`| ${unit.id} | ${cell(unit.text)} |`);
}
out.push('');
writeFileSync('docs/lesson43-coverage.md', out.join('\n'));
console.log(`docs/lesson43-coverage.md written: ${out.length} lines, ${sections.length} sections, ${sections.reduce((a, s) => a + s.lines.length, 0)} units.`);
