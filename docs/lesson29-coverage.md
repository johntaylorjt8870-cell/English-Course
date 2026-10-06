# Lesson 29 coverage ledger — native corrective implementation

## Architecture

Lesson 29 now uses the same native full-screen lesson pattern as Lessons 27 and
28: one step at a time, a persistent progress bar and counter, desktop step rail,
mobile drawer, Previous/Next controls, keyboard arrows/space navigation, and four
separate areas (Student Lesson, Test, Solutions, Teacher).

The implementation intentionally keeps the existing site-password infrastructure
and does not change Lessons 1–28 or shared routing. Teacher access remains
`somer173`; the global site password remains `CloseYourEyes173` in the existing
site gate.

There are exactly **48 navigable steps**:

- opening cover and objectives: steps 1–2
- numbered source sections ①–㊹: steps 3–46
- final summary plus four-tense recap: step 47
- final IQ200 rescue-team challenge: step 48

The source ledger in `src/lessons/lesson29/data.ts` remains authoritative and all
44 numbered sections are rendered in source order. The final summary, four-tense
comparison, and final challenge are also rendered. English content is passed
through `LatinRuns` and explicit LTR containers; Arabic UI remains RTL.

## Source coverage map

| Source | Coverage |
| --- | --- |
| ①–⑤ | definition, timeline, golden formula, invariant `had`, and role of `been` |
| ⑥–⑦ | Past Perfect versus Past Perfect Continuous |
| ⑧–⑪ | `for`, `since`, contrast, and IQ200 distinction |
| ⑫–⑭ | examples and Past Continuous versus Past Perfect Continuous |
| ⑮–⑱ | completion/activity, visible effect, and non-continuation nuance |
| ⑲–㉑ | stative verbs and regular `-ing` spelling |
| ㉒–㉘ | negative, questions, short answers, Wh questions, `how long`, `for`, `since` |
| ㉙–㉟ | four-tense comparison, study comparison, detective, IQ200, and meaning rules |
| ㊱–㊵ | source exercises, error correction, tense selection, and Smart Tense Challenge |
| ㊶–㊷ | complete Mia story and story timeline |
| ㊸–㊹ | Boss Battle and final IQ200 rule |
| Final material | summary, four-tense recap, and rescue-team final challenge |

## Interactive learning

The student steps include genuine stateful interactions for:

1. Four-Tense Timeline Lab
2. Formula Builder
3. FOR vs SINCE Lab
4. Four-Tense Comparator
5. Result vs Duration Lab
6. Stative Verb Trap
7. interactive source-exercise correction and selection
8. Mia Story Timeline
9. Boss Battle
10. Final IQ200 Challenge

Platform additions are explicitly labelled **Platform Explanation**. The notes
preserve the source nuances: Past Perfect Continuous need not continue until the
later event, `for` does not automatically force PPC, and stative `know` uses
`I had known him for years`.

## Test, solutions, and teacher areas

- Test Area contains exactly 20 newly authored questions from the existing
  Lesson 29 data, including single choice, true/false, multi-select, ordering,
  matching, error analysis, chronology, and meaning-based selection.
- No score or correctness feedback is shown before Submit. Submit reveals the
  score; Reset clears answers, submission, score, and state.
- Test Solutions is separate and gated until test submission or teacher unlock;
  it contains 20 detailed solution records with explanations and traps.
- Teacher Area is separate and password-protected with `somer173`. It includes
  overview, objectives, prerequisites, grammar notes, exercise support, story
  analysis, Boss Battle guidance, misconceptions, and test-solution access.

## Validation

- `npm run build` — passed; Vite emitted only the existing large-bundle warning.
- `npm run check:english-direction` — passed (1,470 assertions).
- `node scripts/audit-lesson29.mjs` — passed (72 checks).
- `node scripts/audit-lesson27.mjs` — passed (274 assertions).
- `node scripts/audit-lesson28.mjs` — passed (330 assertions).
- `node scripts/interaction-test.mjs` — passed (558 tests).
- `git diff --check` — passed.
- Browser visual verification — not performed; no visual browser claim is made.

## Corrective files

- `src/lessons/lesson29/Lesson29.tsx`
- `scripts/audit-lesson29.mjs`
- this coverage ledger
