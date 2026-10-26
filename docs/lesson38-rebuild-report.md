# Lesson 38 rebuild — Future Achievement Observatory

## Identity

- **Future Achievement Observatory / مرصد الإنجاز المستقبلي**
- Chart-paper canvas, night navy, brass stations, forest completion.
- Distinct from Lesson 37 (sky/horizon cyan) and from the previous Finish Line Studio rebuild.
- Renders through the real shared `Lesson1Shell` (`data-l35-shell="lesson-1"`). No bespoke rail, step bar, or site-lock.

## Structure

- 9 chapters, **60 short steps** (opening + 36 numbered source sections split into teaching stations + a two-step future map for lessons 39–48).
- The 39–48 map is a closing station, not a new numbered lesson inside lesson 38.
- Four areas: student, test, solutions (gated), teacher (password `somer173`).
- Source ledger: `src/lessons/lesson38/ledger38.ts` (cover + s01–s36 + roadmap).
- Coverage ledger: `src/lessons/lesson38/coverage38.ts` (38 rows).

## Final test

- 25 questions, five levels of five, source prompts traced to §33.
- TestArea loads `testKey38` only on submit (dynamic import).
- `solutionsData38` is never imported by TestArea or the kit.
- Solutions Area is lazy and locked until submit or teacher unlock.
- Open items (16–20) are meaning-scored with alternatives; they are not treated as a hard machine verdict.

## Answer isolation (client-side)

Verified by `npm run audit:lesson38`:

1. Pre-submit Test Area has no score, feedback, or «الإجابة النموذجية».
2. Student steps + pre-submit DOM contain none of the 25 solution explanations.
3. Positive control: injecting Q23’s explanation is detected.
4. File mutation: adding `import … solutionsData38` into TestArea is detected, then the file is restored.
5. After submit, score and 25 feedback blocks appear; Solutions Area then exposes 25 answers across five tabs.

**Limit:** hiding keys from the student UI reduces accidental leakage. It is not a substitute for server-side verification if that is required later.

## Tests run locally

| Command | Result |
|---|---|
| `npm run build` | passed |
| `npm run audit:lesson38` | passed, **335 / 335** |
| `npm run audit:lesson38-browser` | passed, **69 / 69** |
| `npm run check:english-direction` | passed, 1701 assertions, 44 lessons |
| `npm run audit:lesson-navigation` | passed, 176 / 176 |
| `npm run audit:navigation-lock` | **102 passed, 4 failed** — failures are Lesson 36 (missing student-area tab label) and Lesson 39 (missing area tabs). Not Lesson 38. |
| `node scripts/audit-final-test.mjs` | **5 / 1253 failed** — all five failures are Lesson 35 password/key surface. Not Lesson 38. |

CI was not run in this session.

## Viewports (reviewed screenshots)

`docs/lesson38-visual/` — pre-submit only, no answer keys:

- `1920x1080-cover.png`
- `1280x800-cover.png`, `1280x800-step-s03b.png`, `1280x800-step-s08.png`, `1280x800-step-s32.png`, `1280x800-test-neutral.png`, `1280x800-solutions-locked.png`
- `768x900-cover.png`, `768x900-drawer-open.png`
- `375x812-cover.png`, `375x812-drawer-open.png`
- `verification.json` (booleans + overflow/overlap metadata; no answers)

Reviewed: RTL shell, lock sits with Previous/Next with no overlap, no horizontal overflow, observatory identity, test 0/25 with no model answers, solutions locked.

## Out of scope / leftover

- Lesson 35 final-test audit failures (pre-existing).
- Lesson 36 / 39 navigation-lock tab failures (pre-existing).
- `audit:english-direction` (the long chain of every lesson audit) was not run in full; `check:english-direction` was.
