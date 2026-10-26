# Lesson 39 rebuild — implementation and verification report

**Branch:** `arena/23897842-english-course` · **Base:** `main` @ `f98bc311fc4e7b1600c987eee79489f0cd4acefb` · **PR:** opened against `main`, not merged.
**Scope:** Lesson 39 only (`src/lessons/lesson39/**`, `src/App.tsx` card 39, `scripts/audit-lesson39*.mjs`, `docs/lesson39-*`, one `package.json` script).

## 1. What was rebuilt

The previous Lesson 39 ("Time Grid") is replaced end-to-end by **مرصد الزمن المستقبلي / The Future Time Observatory**:
night-blue, teal and violet with gold accents, an instrument panel per step, a 16-station rail, and a
completely different interaction model from Lesson 38's achievement finish line.

| File | Role |
|---|---|
| `data.ts` | 75 step specifications, 16 stations, station membership, subtitle constants, derived exports (`SLIDES_39`, `STEP_COUNT_39`, `STATIONS_39`) |
| `ledger39.ts` | **Unchanged** verbatim source (40 records: opening + §1…§39, 651 units, 5 tables, 37 key lines) |
| `kit39.tsx` | Local design-system primitives: `Instrument39`, `ActionButton39`, `Feedback39`, `Formula39`, `SourceLine39`, `Table39`, `RevealPanel39`, `ChoiceText39`, `PlatformNote39` |
| `labs39.tsx` | All interactive instruments (timeline, calculator, formula builder, anatomy bench, pronoun matrix, `for`/`since` sorter, builders, dialogue deck, FP/FPC comparator, stative deck, practice decks, reading, writing, ladder, curriculum) |
| `Steps39.tsx` | One step = one goal; header, source block, instrument, answer gate |
| `Lesson39.tsx` | Shell wiring only (no rail, nav or lock re-implementation) |
| `TestArea39.tsx` | 25-question test: one question at a time, level tabs, submission gate |
| `testData39.ts` / `testKey39.ts` / `solutionsData39.ts` | Question bank / grading / keys — three separate modules |
| `TeacherArea39.tsx`, `TeacherGuide39.tsx` | Password gate (`somer173`, the repository's existing teacher password) + guide |
| `coverage39.ts` | Section→step coverage rows surfaced in the teacher console |
| `lesson39.css` | All `obs-` styles; nothing global |
| `src/App.tsx` | Card 39 stats + gradient only |

Deleted: `stepManifest39.ts` (the old hand-maintained manifest, superseded by `data.ts`).

## 2. Content preservation

- The source ledger is byte-frozen; the audit fails if it changes.
- Every ledger unit is claimed by exactly one step (or by the Test area for §35), cross-checked as an index
  multiset per section — not by section title.
- Source key lines (§29–§32, §34) render only after an attempt on that step, behind an explicit answer gate.
- No section was summarised away, and no "show the whole source" button exists
  (`scripts/audit-source-reveal.mjs` bans `<details>`/`<summary>` in student files, and the banned literal
  phrase does not appear anywhere in Lesson 39 code).
- Additions are labelled: platform explanations carry `إضافة تعليمية من المنصة`; the 25 test keys are marked
  platform-authored because the source's §36 is a stub.

## 3. Answer isolation design

1. `testData39.ts` holds questions/options only — no answer fields (audit asserts the exact key set of every
   question object).
2. `testKey39.ts` is imported **dynamically inside the submit handler**; nothing else imports it.
3. `solutionsData39.ts` is imported only by `SolutionsArea39`, which is a lazy chunk mounted after submission
   or after teacher unlock.
4. The test chunk (`TestArea39`) is itself lazy; the audit walks its static import edges and fails if
   `testKey39`, `solutionsData39`, `TeacherGuide39` or `SolutionsArea39` appear.
5. Pre-submit DOM assertions: no explanation text, no full-sentence answer, no `data-answer-key-for`,
   no `data-question-feedback`, no `data-grade-summary`.
6. **Leak proof (run, then reverted):** injecting `import { TEST_SOLUTIONS_39 } from "./solutionsData39"` into
   `TestArea39.tsx` plus a pre-submit render of the answer failed the audit with
   `solutionsData39 must stay out of the test chunk`; a second injection that embedded a real explanation
   string in the question header failed with `no explanation text may appear in the pre-submit test DOM`.
   Both injections were reverted and the audit re-run green (see results below).
7. Submission is one-shot: the button disappears and all inputs freeze, so a second submit cannot double-count.
8. Browser evidence: the network log shows `testKey39-*.js` and `solutionsData39-*.js` are requested only
   after the submission click, never during the 75 learning steps.

## 4. Visual identity

- Local tokens only (`--obs-*`), scoped under `.obs39`; no global theme, no shared-shell edits.
- Night-blue/teal/violet surfaces, gold accent for "achievement", cyan for "duration", CSS timeline with
  glowing nodes, duration counters, and an "achievement vs duration" comparator.
- Motion respects `prefers-reduced-motion`; every interactive element has a visible
  `focus-visible` ring; the theme is dark-only by design and all text was measured against its real background.
- Accessibility: text contrast measured in real Chromium (≥ 4.5:1 for body, ≥ 3:1 for large text) on the
  header, rail, main content of sampled steps, test area, solutions area and teacher console.

## 5. Lock and navigation

The lesson does not re-implement navigation: it hands `onPrev/onNext` to `Lesson1Shell`, so the shared
lock pill and the step navigation stay in the same host. The browser audit measures the real bounding boxes
of the lock button, Previous and Next at 1920×1080, 1280×800, 768×900 and 375×812 — overlap area is `0` in
every case, on the landing slide and on all 75 steps.

## 6. Commands and real results

Commands are the repository's real scripts; nothing is invented.

| Command | Result |
|---|---|
| `npm ci` | pass |
| `npm run build` | **PASS** — built in ~9 s; the pre-existing `>500 kB` chunk warning remains |
| `node scripts/audit-lesson39.mjs` (`npm run audit:lesson39`) | **PASS** — 75 steps, 16 stations, 40 source records, every unit/table/key line mapped once, 25 questions in 5×5, 25 keys, 25/25 model score, 0/25 nonsense (5 human-review), alternatives accepted, pre-submit DOM answer-free, answer modules outside the initial **and** test chunk graphs |
| `node scripts/audit-lesson39-browser.mjs` (`npm run audit:lesson39-browser`) | **PASS** — 615 checks, 4 viewports, 75 steps crawled, 0 page errors |
| `npm run check:english-direction` | **PASS** — 59/59 assertions |
| `node scripts/audit-render-direction.mjs` | **PASS** — 1466 assertions |
| `ONLY=39 node scripts/audit-bidi-mixed.mjs` | **PASS** — 0 strict, 0 alts for Lesson 39 |
| `node scripts/audit-bidi-mixed.mjs` (all lessons) | **FAIL** — 4 strict, all pre-existing in **Lesson 38** (`. BY` / `. V3` headings, `At أم By` rail item). Lesson 39 contributes 0. |
| `node scripts/audit-lesson-navigation.mjs` | **PASS** — 176/176, no console errors, no overflow at 1024/768/375 |
| `node scripts/audit-navigation-lock-overlap.mjs` | **105/106** — the single failure is Lesson 36 (`tab button "منطقة الطالب" must exist`), pre-existing and out of scope |
| `node scripts/audit-final-test.mjs` | **1248/1253** — 5 failures, all Lesson 35 |
| `node scripts/audit-final-test-coverage.mjs` | **630/633** — 3 failures, all Lesson 35 |
| `node scripts/audit-source-reveal.mjs` | **62/63** — the failure is `src/lessons/lesson38/Steps38.tsx` (`<details>/<summary>`), pre-existing |

Old failures were **not** fixed, and not hidden: they are listed above with their owning lesson.

## 7. Visual evidence

`docs/lesson39-visual/` (regenerated by the browser audit, verified answer-free before submission):

- `{1920x1080,1280x800,768x900,375x812}-lesson-landing.png`
- `…-interactive-timeline.png` (start → future measurement point)
- `…-comparison-fp-fpc.png` (Future Perfect vs Future Perfect Continuous)
- `…-long-content-slide.png` (dialogue step with an expanded turn)
- `…-test-before-submit.png` (no score, no feedback, no key)
- `…-solutions-locked.png` (locked solutions before submission)
- `…-results-after-submit.png` (score + per-question feedback after the audit's own submission)
- `375x812-lock-and-nav.png`, `768x900-lock-and-nav.png` (lock pill + navigation on small screens)
- `verification.json` — 615 checks, 0 failures, per-viewport overflow and lock/nav overlap = 0

## 8. Risks and limits

- This is a **static client application**: lazy chunks and the client-side teacher password are not a server
  authorisation boundary. Anyone who deliberately inspects the network can fetch a lazy chunk. The audit
  proves the app never loads or renders answers before submission; it cannot make a static bundle secret.
- The numeric result counts *matching* answers and flags conceptual answers as **human review**; it is not a
  definitive grade.
- Test answers live in React state for the visit: a page reload starts a fresh attempt. The writing draft uses
  `sessionStorage` (`l39-writing`).
- The Lesson 38 BIDI findings, Lesson 35 final-test findings and the Lesson 36 tab finding remain open and are
  out of this PR's scope by instruction.
