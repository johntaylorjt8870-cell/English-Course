// Regenerates docs/lesson42-coverage.md from the lesson's own data modules, so
// the published coverage document can never drift from the shipped lesson.
//   node scripts/lesson42-coverage-doc.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';

mkdirSync('node_modules/.lesson42-audit', { recursive: true });
await build({
  stdin: {
    contents: `export * from './src/lessons/lesson42/ledger42';
export * from './src/lessons/lesson42/practiceData42';
export * from './src/lessons/lesson42/testData42';
export * from './src/lessons/lesson42/solutionsData42';
export * from './src/lessons/lesson42/coverage42';`,
    resolveDir: process.cwd(),
  },
  outfile: 'node_modules/.lesson42-audit/data.mjs', bundle: true, platform: 'node', format: 'esm',
});
const data = await import('../node_modules/.lesson42-audit/data.mjs?' + Date.now());
const { SOURCE_SECTIONS_42: sections, COVERAGE_42: coverage, COVERAGE_ACCURACY_NOTES_42: notes,
  COVERAGE_PLATFORM_ADDITIONS_42: additions, PRACTICE_42: practice, TEST_QUESTIONS_42: questions,
  TEST_SOLUTIONS_42: solutions, STATIONS_42: stations } = data;

const cell = text => String(text).replace(/\|/g, '\\|').replace(/\n/g, '<br/>');
const out = [];
out.push('# Lesson 42 — source-to-implementation coverage');
out.push('');
out.push('Source: complete lesson supplied in the conversation. `source42.ts` preserves the text with the normalization documented below. No external missing source was reconstructed as a quotation.');
out.push('');
out.push('## Mapping rules');
out.push('');
out.push('- Opening plus §§1–44 are 45 native steps in source order; §40 routes to the independent test, §41 to protected teacher access.');
out.push('- Each unit below is one normalized source line, not merely a section heading. Ordinary lines render through Steps42/Lines42. Tables combine contiguous pipe-separated lines into rows with headers.');
out.push('- Numbered practice prompts and options map to PracticeCard42; source keys appear only after the student writes an attempt. TeacherGuide42 includes every prompt, key and platform-authored explanation.');
out.push('- §39 passage is rendered in full before its ten question cards. §42 criteria are checkbox labels; the original model is a separately labelled optional reference.');
out.push('- §40 options and question subparts are independently represented in testData42; the test module imports no solution, source-ledger or teacher data.');
out.push('- §41 is the full 25-key correction list. It is never rendered inside a student step: it lives behind the existing teacher gate and in the post-submission solutions area.');
out.push('- Ten learning-station markers are attached to the first step of their station, rather than as separate decorative separators.');
out.push('- Decorative separator bars and heading emoji/GB flags were removed. Blank lines collapsed; table cells joined with ` | `; Arabic question marks at the end of English sentences normalized to `?`. No instructional example or numbered item was removed.');
out.push('- Source spelling and variety notes are retained. The §42 model is eight sentences, not a fully compliant submission — see the accuracy notes.');
out.push('');
out.push('## Source inventory');
out.push('');
out.push(`- ${sections.length} sections (opening + 44 numbered), ${sections.reduce((a, s) => a + s.lines.length, 0)} normalized units.`);
out.push(`- ${practice.length} attempt-bound practice items (§§34–39), ${questions.length} final-test questions in five levels, ${solutions.length} detailed keys.`);
out.push(`- ${stations.length} stations: ${stations.map(s => `${s.name} ${s.en} (${s.start}–${s.end})`).join(' · ')}.`);
out.push('- Frozen inventory: `docs/lesson42-source-manifest.json` (per-section unit counts and SHA-256 of the normalized lines).');
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
writeFileSync('docs/lesson42-coverage.md', out.join('\n'));
console.log(`docs/lesson42-coverage.md written: ${out.length} lines, ${sections.length} sections, ${sections.reduce((a, s) => a + s.lines.length, 0)} units.`);
