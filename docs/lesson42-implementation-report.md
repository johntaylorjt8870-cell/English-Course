# Lesson 42 — CAN & COULD · implementation report

- **Branch:** `arena/298cfecf-english-course` (this session's branch, off `main` @ `9d81faf`)
- **Pull request:** [#54 — feat: add Lesson 42 — CAN & COULD Interactive Language Lab](https://github.com/johntaylorjt8870-cell/English-Course/pull/54) — opened from this branch, **left open and unmerged**. The branch is not merged, closed or deleted.
- **Final commit:** `ceb8647be92c2f8f3a17e2d9bada283b6c5e31f3` (`feat: add Lesson 42 — CAN & COULD Interactive Language Lab`) is the implementation commit; the follow-up documentation commit on the same branch records this PR link. `git log` on the branch lists both.

## 1. Full visual identity — "Language Control Lab"

Lesson 42 ships its own identity, distinct from Lesson 41's "Sentence Engine Studio": a warm-paper canvas (`#F4F1EA`), dark instrument panels (`#14110D`), monospace readouts, and two semantic signal channels — orange **CAN** (`#C2410C`) and fuchsia **COULD** (`#A21CAF`). All selectors are scoped beneath `.lesson42`; shared components, global typography and Lessons 1–41 are untouched. Ten stations, per-station section navigation, panel tones per pedagogical function, and responsive behaviour at 1200 / 850 / 500px. Details and the full token table: `docs/lesson42-design.md`.

## 2. All 44 source sections covered

- 45 sections (opening + §§1–44), **932 normalized units**, preserved in `src/lessons/lesson42/source42.ts` and mapped unit-by-unit in `docs/lesson42-coverage.md`.
- Frozen inventory with per-section unit counts and SHA-256 digests: `docs/lesson42-source-manifest.json`.
- Documented normalization only: decorative bars and blank lines removed, table cells joined with ` | `, Arabic question marks at the end of English sentences normalized to `?`, and one flag emoji removed from the roadmap line because the repository forbids flag emoji. No example, dialogue, exercise or numbered item was removed or reworded. On the one source ambiguity (the Arabic gloss «هل يمكنك إعادة السؤال؟» against `Could you repeat the question?`) the text is preserved as written and the mismatch is recorded in the coverage ledger rather than silently corrected.

## 3. Interactive components A–H

| # | Component | Where |
|---|---|---|
| A | Modal Meaning Lab (meaning from context, not the word alone) | §32 + `ChoiceLab42` on 20 steps |
| B | Sentence Builder (Subject + CAN/COULD + V1, names the broken rule) | §4, `BuilderLab42` |
| C | Politeness Studio (permission vs requests, `I` vs `you`) | §20, §22 |
| D | Past Ability vs Specific Success (`could` / `was able to` / `managed to`) | §17 |
| E | Context Detective (one sentence, two functions) | §21, §32 |
| F | Error Repair (diagnose, then fix) | §31 |
| G | Reading Challenge *The Young Inventor* + 10 comprehension questions | §39 |
| H | Writing Mission (12–15 sentences, 10-item checklist) | §42 |

Additional engines: CAN/COULD switch console (§0), transformation console for negative/question (§8, §9, §14, §15), dialogue renderer, goal cards, golden summary and roadmap.

## 4. Independent final test — 25 questions, five levels

`TestArea42` renders all 25 questions in five levels (§40) with no answer, key or reasoning visible before submission: the test module imports no solution, source-ledger, practice or teacher data (verified by dependency-graph analysis), the submit button is disabled until every field including Q7's second blank is answered, submission is re-validated on click, and the detailed solutions mount only after submission. Reset clears every field and relocks the solutions area. Explanatory questions are compared by meaning; the UI states there is no automatic scoring for them.

## 5. Teacher solutions area behind the existing password mechanism

§41's full 25-key list is never rendered in a student step. It appears in `SolutionsArea42` (after submission) and in `TeacherArea42`, gated by the same password constant used by `TeacherArea40`/`TeacherArea41` (`somer173`), with the delivery guide lazy-loaded only after a correct password. The inherited limitation is documented, not rebuilt: the gate is an educational client-side lock, not server security, and a determined user can read the bundle — this is stated in the teacher guide and in this report.

## 6. Source Ledger + Coverage Audit

- `src/lessons/lesson42/ledger42.ts` — 45 ordered sections, every unit an object with a stable id.
- `src/lessons/lesson42/coverage42.ts` — 44 coverage rows, plus documented accuracy notes and platform-addition lists.
- `docs/lesson42-coverage.md` (1311 lines) — generated from the shipped data by `scripts/lesson42-coverage-doc.mjs`, so it cannot drift.
- `scripts/audit-lesson42.mjs` — 418 assertions: section order, per-unit coverage, manifest hashes, practice counts (8/5/5/5/10/10 = 43), test shape, key lineage against §41, dependency-graph isolation, gating, registration, contrast, and the scope guard.

## 7. Grammar accuracy review

Every modal rule was checked against the supplied source and against standard usage: no `cans`/`coulds`, no `to` after the modal, no `do`-support, V1 after the modal, `can't`/`couldn't` placement, `will be able to` for future ability, and the `could` (general past ability) vs `was able to` (specific past success) contrast with the explicit caveat that `couldn't` is natural even for specific situations. The platform-authored explanations are separated from source text in the UI and in `TeacherGuide42`; no answer key was invented — every key is a source line or a clearly labelled platform reasoning.

## 8. Responsive and accessibility checks (actually run)

- **jsdom DOM/BIDI audit** (`scripts/audit-lesson42-dom.mjs`): 1892 assertions — all 45 steps reachable, `data-source-section` correct on every step, ARIA targets resolve, accessible names on every control, eight interactive engines exercised, attempt-gated keys, complete-test submission/reset, locked teacher access, and 14 targeted BIDI cases.
- **Real Chromium** (`scripts/audit-lesson42-browser.mjs`, `@sparticuz/chromium` + `playwright-core`): **334 checks, 0 failures, 0 console/page errors**, 99 rendered states measured for WCAG AA contrast (minimum 4.59:1), zero horizontal overflow, ARIA targets resolving, 19 screenshots in `docs/lesson42-visual/` at 1280×900 and 375×812.
- **Full-course BIDI crawl** (`scripts/audit-bidi-mixed.mjs`, Lesson 42 added to the strict set): **0 violations**.
- **Navigation audit**: 160 passed, 0 failed, including the new Lesson 42 hub card, route and window shift.

## 9. Honest check report

| Check | Command | Result |
|---|---|---|
| TypeScript (strict) | `./node_modules/.bin/tsc --noEmit … src/App.tsx` | **182 errors, none in `lesson42` and none in `src/App.tsx`** — all in pre-existing lessons (`lesson21/data.ts` alone accounts for 152). The stored baseline file records 179; the 3-error difference sits in `lesson10`, `lesson18` and `lesson20`, all byte-identical to the parent commit, so it pre-dates this work. No `tsconfig.json` exists; the flags mirror the earlier baseline run. |
| ESLint | — | **not available**: the repository has no ESLint config or script; nothing was claimed |
| Unit/behaviour tests | `npm run audit:english-direction`, `npm run audit:lesson-navigation`, `npm run check:english-direction` | all pass, including Lesson 42 static (418) and DOM (1892) audits |
| Production build | `npm run build` | success in ~7.3s; `SolutionsArea42` and `TeacherGuide42` split into lazy chunks |
| Browser verification | `node scripts/audit-lesson42-browser.mjs` | 334 checks, 0 failures (see §8) |

Known pre-existing observations (not caused by this work, not fixed): 182 TypeScript errors across the repo (179 in the stored baseline, the extra 3 in files unchanged since the parent commit); a Google Fonts request fails in this sandbox (no outbound access) and falls back to local fonts; no ESLint configuration exists; the teacher gate is a client-side lock.

## 10. Delivery constraints

- PR [#54](https://github.com/johntaylorjt8870-cell/English-Course/pull/54) opened from `arena/298cfecf-english-course` and **left open and unmerged**; the branch is not merged, closed or deleted.
- **Lesson 43 is not implemented.** It exists only as §44 roadmap prose; `NEXT_LESSON_42.status` is `planned-not-implemented`, no `src/lessons/lesson43` exists, and no route points at it. The guards that previously asserted "no Lesson 42" now assert "no Lesson 43".
- No redesign of Lessons 1–41: only registry/audit inventory files were touched (`package.json`, `src/App.tsx`, and the audit scripts whose lesson-count assertions had to move from 41 to 42).
- No fabricated answer keys, no automatic scoring claims for free writing, no correct-answer reveal before an attempt, and no platform-authored text presented as textbook content.

## Files

- Lesson module: `src/lessons/lesson42/` (18 files — shell, steps, kit, tools, labs, data, test, solutions, teacher, coverage, CSS).
- Audits: `scripts/audit-lesson42.mjs`, `scripts/audit-lesson42-dom.mjs`, `scripts/audit-lesson42-browser.mjs`, `scripts/lesson42-coverage-doc.mjs`.
- Docs: `docs/lesson42-coverage.md`, `docs/lesson42-source-manifest.json`, `docs/lesson42-design.md`, `docs/lesson42-visual/` (19 screenshots + `verification.json`).
- Integration: `package.json` (`audit:lesson42`, added to `audit:english-direction`), `src/App.tsx` (import, hub card, route).
