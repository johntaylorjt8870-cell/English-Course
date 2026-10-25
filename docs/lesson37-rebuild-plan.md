# Lesson 37 — Future Continuous · rebuild plan (rebuild-in-place)

## Baseline (before the rebuild)

| Item | Baseline |
| --- | --- |
| Branch | `main` @ `daaf9401` (PR #83, Lesson 36, merged) |
| Working tree | clean |
| `npm run build` | passes (`index-*.js` ≈ 5.98 MB, gzip ≈ 1.42 MB; chunk-size warning pre-existing and unchanged) |
| `npm run audit:lesson37` | 246 assertions pass |
| `npm run audit:lesson37-browser` | 170/170 checks pass (1440×900 · 1280×800 · 768×900 · 375×812) |
| `npm run check:english-direction` | passes (59/59 BIDI assertions) |
| `npm run audit:lesson-navigation` | 176 passed, 0 failed |

## What was wrong with the baseline

1. **The lesson did not use the shared shell.** `Lesson37.tsx` hand-rolled its own
   `aside` rail, header, mobile drawer, progress bars and footer navigation.
   Lesson 36 (the merged reference) renders through `src/shared/Lesson1Shell.tsx`.
2. **Source bookkeeping leaked into the student UI.** `§34`, `§2 · الخط الزمني`,
   `HORIZON 37` and a "من المصدر · المقدمة" panel (with "أقسام المصدر / خطوات الطالب")
   were visible to the learner.
3. An extra mobile progress bar duplicated the shell header progress.

## What the rebuild does

* `Lesson37.tsx` is rewritten as a thin state host around `Lesson1Shell`
  (same prop contract as Lesson 36): 11 rail chapters, shared progress header,
  shared mobile drawer, shared `data-lesson-step-nav` bar with the site lock,
  previous/next labels in Arabic and the same keyboard model.
* Lesson-specific identity stays in the lesson: `lesson37.css` is extended with
  the *Future Horizon Observatory* horizon band, timeline track, camera
  viewfinder and `--fh37-*` tokens; the palette stays lesson-37 only.
* All `§NN` / `HORIZON 37` / source-ledger labels are removed from
  learner-facing surfaces (step headers, lab eyebrows, test badge). Source
  traceability survives as `data-source-id` / `data-source-section` attributes
  and in the teacher coverage map.
* Test, solutions and teacher areas stay lazy; the answer key keeps loading
  only through the deferred `solutionsData37` chunk after submission or the
  teacher password.
* Interaction state is preserved across area switches (test is mounted once,
  hidden while the learner is in the lesson).

## Files

| File | Reason |
| --- | --- |
| `src/lessons/lesson37/Lesson37.tsx` | replace bespoke shell with `Lesson1Shell` |
| `src/lessons/lesson37/data.ts` | rail/chapter metadata with icons + English labels |
| `src/lessons/lesson37/Steps37.tsx` | remove source-bookkeeping labels; denser step header |
| `src/lessons/lesson37/labs37.tsx` | lab eyebrows describe the activity, not the source number |
| `src/lessons/lesson37/TestArea37.tsx` | neutral test header (no §/ledger labels) |
| `src/lessons/lesson37/lesson37.css` | shell integration + observatory visuals |
| `scripts/audit-lesson37.mjs` | shell assertions, no-leak assertions, lab coverage |
| `scripts/audit-lesson37-browser.mjs` | 1920×1080 added, isolation sentinels, retry, drawer |
| `docs/lesson37-coverage.md` | regenerated coverage/fidelity report |

Not touched: `src/App.tsx` (route `#/lesson/37` and its registration were already correct), `src/shared/*`, Lessons 1/35/36 and every other lesson.

## Outcome (verified)

| Gate | Result |
| --- | --- |
| `npm run build` | ✓ |
| `npm run audit:lesson37` | ✓ 328 assertions |
| `npm run audit:lesson37-browser` | ✓ 578/578 across 1920×1080 · 1280×800 · 768×900 · 375×812 |
| `ONLY=37 node scripts/audit-bidi-mixed.mjs` | ✓ 0 violations |
| `npm run check:english-direction` | ✓ 59/59 |
| `npm run audit:lesson-navigation` | ✓ 176 passed / 0 failed |
| `node scripts/audit-final-test.mjs` | ✕ 5/1253 — all pre-existing Lesson 35 items, identical on a clean `git stash` baseline |

Screenshots: `docs/lesson37-visual/` (covers at all four viewports, representative steps at
1920/1280/375, mobile drawer, neutral/graded test, solutions, teacher locked/open).
The answer key never appears in those artifacts: the browser audit asserts that
`verification.json` contains no model answer, no explanation and no teacher password.
