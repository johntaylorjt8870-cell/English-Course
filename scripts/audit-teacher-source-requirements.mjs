import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

// ============================================================
// Exact source requirements for every unresolved teacher-provenance record.
//
// All 74 records stay OPEN. This environment contains no textbook PDF, scan or
// image (trackedMedia is empty), so no page number, printed question number or
// question↔answer mapping may be inferred. Instead of guessing, this file
// states precisely what has to be supplied for each individual record, which
// identifiers inside it must match, and what is compared once it arrives.
//
//   node scripts/audit-teacher-source-requirements.mjs
//   node scripts/audit-teacher-source-requirements.mjs --require-closed
// ============================================================
const PROVENANCE = 'docs/audits/teacher-provenance.json';
assert(existsSync(PROVENANCE), 'run `npm run audit:teacher-provenance` first');
const provenance = JSON.parse(readFileSync(PROVENANCE, 'utf8'));
const ACCEPTED = ['pdf', 'png', 'jpg', 'jpeg', 'webp', 'tiff', 'heic', 'docx'];

const pad = (n) => String(n).padStart(2, '0');
const escape = (x) => String(x ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');

function requiredSource(row) {
  const refs = row.knownReferenceNumbers ?? [];
  const canonical = row.knownCanonicalQuestions ?? [];
  const itemLevel = refs.length > 0;
  const identifiers = itemLevel
    ? refs.flatMap((r) => (r.segments ?? []).length ? [r.id] : [r.id])
    : canonical.map((q) => q.id);
  const canonicalPaths = [...new Set([
    ...(row.canonicalLocations ?? []).map((l) => `${l.file}:${l.line}`),
    ...canonical.flatMap((q) => (q.sourcePath ? [q.sourcePath] : [])),
  ])];
  const heading = row.sourceItem && !row.sourceItem.startsWith('Original record') ? row.sourceItem : null;
  const dir = `docs/sources/lesson${pad(row.lesson)}/`;

  const common = {
    status: 'NOT SUPPLIED',
    acceptedFormats: ACCEPTED,
    deliveryPath: dir,
    deliveryRequirement: `Files must be committed under \`${dir}\` so \`git ls-files\` reports them; the gate re-reads the tracked-file list and will not accept a path that is only present on disk.`,
    pageMetadata: {
      field: 'sourcePage',
      currentValue: row.sourcePage ?? null,
      rule: 'Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.',
    },
    printedNumbering: {
      field: 'printedQuestionNumber',
      currentValue: null,
      rule: itemLevel
        ? `Must equal the printed item number on the scan for each of: ${refs.map((r) => `${r.id}↔${r.referenceNumber}`).join(', ')}.`
        : 'Not applicable until the textbook items behind this lesson-level record are identified.',
    },
  };

  if (itemLevel) {
    return {
      ...common,
      recordScope: `Item-level record for the teacher answer group «${heading}» — ${refs.length} numbered answers.`,
      requiredFiles: [
        {
          role: 'textbook exercise page',
          path: `${dir}${row.originalId}-exercise.<${ACCEPTED.join('|')}>`,
          mustShow: [
            heading ? `the printed exercise heading «${heading}»` : 'the printed exercise heading this record transcribes',
            `every printed item number ${refs.map((r) => r.referenceNumber).join(', ')}`,
            'the printed page number',
            'the full wording of each item, legible enough to compare character-for-character',
          ],
        },
        {
          role: 'teacher answer key page',
          path: `${dir}${row.originalId}-key.<${ACCEPTED.join('|')}>`,
          mustShow: [
            `an answer entry for each printed item number ${refs.map((r) => r.referenceNumber).join(', ')}`,
            'the printed page number of the key',
            'any printed reasoning/solution text, if the key supplies one',
          ],
        },
      ],
      requiredIdentifiers: identifiers,
      comparisonTargets: refs.map((r) => ({
        identifier: r.id,
        printedNumber: r.referenceNumber,
        transcribedSegments: r.segments,
        canonicalLocation: canonicalPaths[0] ?? 'not located in canonical lesson data',
        toVerify: ['printed wording vs transcribedSegments (character-for-character)', 'printed item number vs printedNumber', 'key answer vs the canonical answer for this item', 'key reasoning vs the platform explanation (labelled separately if the key has none)'],
      })),
    };
  }

  if (row.lesson === 2) {
    return {
      ...common,
      recordScope: `Lesson-level record with ${canonical.length} mapped canonical questions but no identified textbook items.`,
      requiredFiles: [
        {
          role: 'textbook exercise page(s) behind the Lesson 2 teacher area',
          path: `${dir}L2-textbook-key-exercise.<${ACCEPTED.join('|')}>`,
          mustShow: [
            'the printed exercise(s) whose answers the Lesson 2 teacher area reproduces',
            'the printed question and sub-question numbers for all 29 mapped items',
            'the printed page number(s)',
          ],
        },
        {
          role: 'teacher answer key page(s)',
          path: `${dir}L2-textbook-key-key.<${ACCEPTED.join('|')}>`,
          mustShow: ['an answer entry for each of the 29 printed items', 'the printed page number(s)'],
        },
        {
          role: 'explicit source-to-canonical mapping',
          path: `${dir}L2-textbook-key-mapping.json`,
          mustShow: ['for each canonical id below: the printed question number, the printed page number, and the original wording'],
        },
      ],
      requiredIdentifiers: identifiers,
      comparisonTargets: canonical.map((q) => ({
        identifier: q.id,
        canonicalPrompt: q.prompt,
        canonicalPath: q.sourcePath,
        currentlyMissing: q.missing,
        toVerify: ['printed wording vs canonicalPrompt', 'printed question number vs printedQuestionNumber', 'printed page vs sourcePage', 'key answer vs the certified Lesson 2 answer (29/29 verified against canonical data, 0/29 against the original)'],
      })),
    };
  }

  return {
    ...common,
    recordScope: 'Lesson-level record that does not identify any textbook exercise or question.',
    blockingIssue: 'There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.',
    requiredFiles: [
      {
        role: 'identification of the textbook items this record refers to',
        path: `${dir}${row.originalId}-identification.<${ACCEPTED.join('|')}>`,
        mustShow: [
          'the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover',
          'the printed page number(s)',
          'enough of the surrounding page to confirm the edition and exercise',
        ],
      },
      {
        role: 'teacher answer key page(s) for those items',
        path: `${dir}${row.originalId}-key.<${ACCEPTED.join('|')}>`,
        mustShow: ['an answer entry for each identified printed item number', 'the printed page number of the key'],
      },
    ],
    requiredIdentifiers: [],
    identifiersUnavailableBecause: 'No textbook item is identified by this record, and canonical lesson data (examples, exercises, assessment keys) is not evidence of textbook identity.',
    comparisonTargets: [],
    evidenceAlreadyInspected: (row.evidence ?? []).map((e) => ({ file: e.file, sha256: e.sha256, kind: e.kind })),
  };
}

const VERIFICATION_PROCEDURE = [
  '1. Wording — transcribe the printed item text from the supplied scan and compare it character-for-character with the transcribed segment or canonical prompt recorded for that identifier.',
  '2. Numbering — confirm the printed item number equals the reference number recorded for that identifier; record it in printedQuestionNumber.',
  '3. Page metadata — transcribe the printed page number verbatim into sourcePage. Never derive it from a section index, lesson number or exercise ordinal.',
  '4. Answer correspondence — compare the answer key’s entry for each printed number with the canonical answer the app shows, including option order and any negation.',
  '5. Reasoning — if the key supplies reasoning, compare it with the explanation shown in the teacher space; if it does not, keep the platform text explicitly labelled “Platform Explanation” and record that the original reasoning is unavailable.',
  '6. Closure — set verificationResult to RESOLVED only when steps 1–5 pass for every identifier of that record, and attach the supplied file path with its sha256. A record with no identifiers cannot be closed at all.',
];

const rows = provenance.rows.map((row) => ({
  originalId: row.originalId,
  lesson: row.lesson,
  verificationResult: row.verificationResult,
  sourceItem: row.sourceItem,
  identifiersRequired: (row.knownReferenceNumbers?.length ? row.knownReferenceNumbers.map((r) => r.id) : (row.knownCanonicalQuestions ?? []).map((q) => q.id)).length,
  requiredSource: requiredSource(row),
  verificationProcedure: VERIFICATION_PROCEDURE,
  closureBlockedBecause: [
    'verificationResult is UNRESOLVED',
    provenance.trackedMedia.length === 0 ? 'no original textbook media file is tracked in this repository' : null,
    !(row.knownReferenceNumbers?.length) && row.lesson !== 2 ? 'the record identifies no textbook item, so no mapping can be attempted — identification is required first' : null,
    row.lesson === 2 ? 'the 29 canonical questions are mapped to lesson data but to no textbook item, page or printed number' : null,
    row.knownReferenceNumbers?.length ? `${row.knownReferenceNumbers.length} numbered answers are transcribed but never compared against a printed key` : null,
    'sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan',
  ].filter(Boolean),
}));

const supplied = rows.filter((r) => r.requiredSource.status !== 'NOT SUPPLIED');
const report = {
  base: provenance.base,
  scope: 'Exact source requirement per unresolved teacher-provenance record. All records remain open; nothing here infers a page number, a printed question number or a question↔answer mapping.',
  trackedOriginalMedia: provenance.trackedMedia,
  acceptedFormats: ACCEPTED,
  records: rows.length,
  closed: provenance.closed,
  unresolved: provenance.unresolved,
  suppliedThisRun: supplied.length,
  identifiersRequiredTotal: rows.reduce((n, r) => n + r.identifiersRequired, 0),
  recordsWithoutAnyIdentifier: rows.filter((r) => r.identifiersRequired === 0).length,
  verificationProcedure: VERIFICATION_PROCEDURE,
  rows,
};
writeFileSync('docs/audits/teacher-source-requirements.json', JSON.stringify(report, null, 2) + '\n');

let md = '# Teacher provenance — exact source required per unresolved record\n\n';
md += `All **${rows.length}** original records remain **UNRESOLVED** (${provenance.closed} closed). Original textbook media tracked in this repository: **${provenance.trackedMedia.length}** file(s). Accepted formats: ${ACCEPTED.map((f) => '`' + f + '`').join(', ')}, committed under the per-lesson path shown below so \`git ls-files\` reports them.\n\n`;
md += `Identifiers that must be matched once the source arrives: **${report.identifiersRequiredTotal}**. Records that identify no textbook item at all (and therefore cannot be mapped, only identified first): **${report.recordsWithoutAnyIdentifier}**.\n\n`;
md += 'No page number, printed question number or question↔answer mapping is inferred anywhere in this file.\n\n';
md += '## Verification procedure applied to every record\n\n';
for (const step of VERIFICATION_PROCEDURE) md += `- ${step}\n`;
md += '\n## Per-record requirement\n\n| Original ID | Lesson | Scope | Supply | Identifiers to match | Closure blocked because |\n|---|---:|---|---|---:|---|\n';
for (const r of rows) {
  const files = r.requiredSource.requiredFiles.map((f) => `\`${f.path}\``).join('<br>');
  md += `| ${r.originalId} | ${r.lesson} | ${escape(r.requiredSource.recordScope)} | ${files} | ${r.identifiersRequired} | ${escape(r.closureBlockedBecause.join('; '))} |\n`;
}
md += '\n## What each supplied file must show\n\n';
for (const r of rows) {
  md += `### ${r.originalId} (Lesson ${r.lesson})\n\n`;
  for (const f of r.requiredSource.requiredFiles) {
    md += `- **${f.role}** → \`${f.path}\`\n`;
    for (const m of f.mustShow) md += `  - ${escape(m)}\n`;
  }
  if (r.requiredSource.blockingIssue) md += `- ⚠ ${escape(r.requiredSource.blockingIssue)}\n`;
  md += `- Page metadata: transcribe the printed page into \`sourcePage\` (currently \`${r.requiredSource.pageMetadata.currentValue}\`). ${escape(r.requiredSource.pageMetadata.rule)}\n`;
  if (r.requiredSource.comparisonTargets?.length) {
    md += `- Identifiers to compare (${r.requiredSource.comparisonTargets.length}):\n`;
    for (const t of r.requiredSource.comparisonTargets.slice(0, 40)) {
      md += `  - \`${t.identifier}\`${t.printedNumber ? ` ↔ printed number ${t.printedNumber}` : ''}${t.canonicalPrompt ? ` — ${escape(t.canonicalPrompt.slice(0, 60))}` : ''}${t.transcribedSegments ? ` — ${escape(t.transcribedSegments[0]?.slice(0, 60) ?? '')}` : ''}\n`;
    }
    if (r.requiredSource.comparisonTargets.length > 40) md += `  - … and ${r.requiredSource.comparisonTargets.length - 40} more (full list in \`docs/audits/teacher-source-requirements.json\`)\n`;
  }
  md += '\n';
}
writeFileSync('docs/audits/TEACHER-SOURCE-REQUIREMENTS.md', md);

console.log(`teacher source requirements: ${rows.length} records, ${report.identifiersRequiredTotal} identifiers to match, ${report.recordsWithoutAnyIdentifier} records with no identifiable item, ${provenance.trackedMedia.length} original media files tracked`);
const blockers = [
  report.unresolved > 0 ? `${report.unresolved} of ${report.records} provenance records remain UNRESOLVED` : null,
  provenance.trackedMedia.length === 0 ? 'no original textbook media is tracked in this repository, so no record can be closed' : null,
  report.identifiersRequiredTotal > 0 ? `${report.identifiersRequiredTotal} identifiers still need wording, numbering, page metadata and answer correspondence verified against a supplied source` : null,
].filter(Boolean);
if (process.argv.includes('--require-closed')) {
  if (blockers.length) {
    console.error('Teacher provenance closure gate FAILED:');
    for (const b of blockers) console.error(`  ✕ ${b}`);
    process.exit(1);
  }
  console.log('Teacher provenance closure gate PASSED');
} else {
  console.log('Requirements written. Closure gate is evaluated with --require-closed and currently fails:');
  for (const b of blockers) console.error(`  ✕ ${b}`);
}
