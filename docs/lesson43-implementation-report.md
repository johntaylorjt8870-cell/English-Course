# Lesson 43 — MAY & MIGHT · implementation report

- **Branch:** `arena/242e9f78-english-course` (this session's branch, off `main` @ `8beb42a`).
- **Pull request:** opened from this branch, **left open and unmerged** (see the PR link recorded in the final commit message). The branch is not merged, closed or deleted. PR #54 (Lesson 42) is untouched.

## 1. Full visual identity — "The Probability Observatory — مختبر الاحتمالات اللغوي"

Lesson 43 ships its own identity, distinct from Lesson 42's Language Control Lab: a deep-indigo night canvas (`#0B1030`), light observation-deck cards (`#F7F6FC`), dark instrument panels (`#12173A` / `#1E2550`), and two parallel semantic channels — teal **MAY** (`#0E7C7B`) and amber **MIGHT** (`#B45309`) — drawn as co-equal observation bands, never as a ranked scale, because the source refuses percentage rankings. All selectors are scoped beneath `.lesson43`; shared components, global typography and Lessons 1–42 are untouched. Eleven stations, per-station section navigation, panel tones per pedagogical function, responsive behaviour at 1200 / 850 / 500px. Details and the full token table: `docs/lesson43-design.md`.

## 2. All 37 source sections covered

- 38 sections (opening + §§1–37), **827 normalized units**, preserved in `src/lessons/lesson43/source43.ts` and mapped unit-by-unit in `docs/lesson43-coverage.md`.
- Frozen inventory with per-section unit counts and SHA-256 digests: `docs/lesson43-source-manifest.json`.
- Documented normalization only: decorative separator bars and heading emoji/flag glyphs removed, blank lines collapsed, table cells joined with ` | `, and Arabic question marks at the end of English-led lines normalized to `?` (Arabic-led mixed lines keep `؟` per repository convention). No example, dialogue turn, exercise or numbered item was removed or reworded.
- **Source-vs-implementation audit:** no discrepancy found — every section, example, question and answer in the supplied text is represented. The one source ambiguity (§31 ① "She mays come tomorrow." → key "She may come tomorrow.") is preserved exactly as written, with the correction as the key.

## 3. The nine required interactions

| # | Interaction | Where |
|---|---|---|
| 1 | Probability Explorer (qualitative five-band spectrum, no percentages) | §2 |
| 2 | Modal Sentence Builder | §3 |
| 3 | Context Detective (11-turn dialogue, eight analyzed uses) | §26 |
| 4 | Permission Studio (formality ladder + five scenarios) | §15–17 |
| 5 | Maybe / May Be Lab (six dual-labeled items) | §18–19 |
| 6 | Past Possibility Analyzer (MAY HAVE / MIGHT HAVE + V3) | §20–23 |
| 7 | Error Repair (ten attempt-gated repairs) | §31 |
| 8 | Reading Challenge (full passage + ten attempt-gated questions) | §32 |
| 9 | Writing Mission (ten-item checklist, persisted; model paragraph labelled as a platform addition; no automatic prose grading — stated in the UI) | §35 |

Practice banks: 43 attempt-bound items — §27 ×6 (MAY and MIGHT both accepted wherever the source allows), §28 ×6 (multi-choice with full-line source keys), §29 ×6, §30 ×5 (rewrite + reason, both fields required), §31 ×10 (via Error Repair), §32 ×10 (via Reading Challenge). All keys are source lines; every practice key is gated behind a student attempt.

## 4. Independent final test — 25 questions, five levels

`TestArea43` renders all 25 questions in five levels (§33): 5 multiple-choice, 5 fill-in, 5 error-correction, 5 meaning-matching and 5 missing-homework dialogue items (the dialogue items carry multiple required fields per question). The test module imports no solution, source-ledger, practice or teacher data. The submit button is disabled until every field — including the middle HAVE field of Q9 — is answered; submission is re-validated on click; the 25 detailed solutions mount only after submission. Reset clears every field and relocks the solutions area. MAY/MIGHT interchangeability is honored in grading wherever the source allows both.

## 5. Separate student / test / solutions / teacher zones

- **Student area:** 38 steps with prev/next, a visit counter (explicitly labelled "خطوات زرتها — لا تعني الإتقان"), and answer state preserved across navigation via the lesson workspace.
- **Test area:** independent, as above.
- **Solutions area:** lazy-loaded chunk, unlocked only after test submission; 25 detailed keys plus the §34 teacher note.
- **Teacher area:** gated by the existing site mechanism with the same password constant as Lessons 40–42 (`somer173`); the delivery guide (including every practice key and platform-authored reasoning) lazy-loads only after a correct password. The inherited limitation is documented, not rebuilt: the gate is an educational client-side lock, not server security, and a determined user can read the bundle — this is stated in the teacher guide.

## 6. Source Ledger + Coverage Audit

- `src/lessons/lesson43/ledger43.ts` — 38 ordered sections, every unit an object with a stable id.
- `src/lessons/lesson43/coverage43.ts` — 38 coverage rows with per-unit destinations, plus documented accuracy notes and platform-addition lists.
- `docs/lesson43-coverage.md` (1157 lines) — generated from the shipped data by `scripts/lesson43-coverage-doc.mjs`, so it cannot drift.
- `scripts/audit-lesson43.mjs` — 510 assertions: section order, per-unit coverage, manifest hashes, practice counts (6/6/6/5/10/10 = 43), test shape, key lineage against §34, dependency-graph isolation, gating, registration, contrast, and the scope guard.

## 7. Grammar accuracy review

Every modal rule was checked against the supplied source: MAY makes uncertainty visible rather than guaranteeing; WILL does not always guarantee; MAY is not always stronger than MIGHT (the overlap is large and MIGHT may suggest more caution contextually); no invented percentages (the source rejects 70%/30% and so does the implementation — asserted in the audit); `may not` (uncertainty or denied permission, context decides) is kept distinct from `must not` (prohibition); `might I` is presented as formal/archaic, not the daily default for permission; the §28 "Does she may come?" correction offers the meaning-dependent alternative question form rather than forcing one rewrite. Platform-authored additions are labelled «إضافة المنصة» in the UI and listed in the coverage document; they are never attributed to the source.

## 8. Visual and interaction checks (actually run)

- **jsdom DOM/BIDI audit** (`scripts/audit-lesson43-dom.mjs`): 1665 assertions — 38-step navigation, labels/ARIA, nine interactive engines, attempt-gated practice keys, complete-test submission/reset, locked teacher access, sixteen targeted BIDI cases.
- **Real Chromium** (`scripts/audit-lesson43-browser.mjs`, `@sparticuz/chromium` + `playwright-core`): **297 checks, 0 failures, 0 console/page errors**; 85 rendered states measured for WCAG AA contrast (observed minimum **5.015:1**), zero horizontal overflow, ARIA targets resolving, lazy-chunk request guards (solutions/teacher data requested only when legitimately unlocked), test fill/submit/reset, teacher gate with the password read from `TeacherArea40.tsx`, 21 screenshots in `docs/lesson43-visual/` at 1280×900 and 375×812.
- **Full-course BIDI crawl** (`scripts/audit-bidi-mixed.mjs`, Lesson 43 in the strict set): **0 violations** (both the classic English=Arabic pair oracle and the alternatives oracle).
- **Navigation audit:** 168 passed, 0 failed, including the Lesson 43 hub card, route and window shift.

## 9. Honest check report

| Check | Command | Result |
|---|---|---|
| Production build | `npm run build` | ✓ passes |
| English-direction sweep | `node scripts/check-english-direction.mjs` | ✓ 1694 assertions, 43 lessons |
| BIDI rendering smoke test | `node scripts/test-bidi-rendering.mjs` | ✓ 59/59 |
| Lesson 43 static/data | `node scripts/audit-lesson43.mjs` | ✓ 510 assertions |
| Lesson 43 DOM/BIDI | `node scripts/audit-lesson43-dom.mjs` | ✓ 1665 assertions |
| Lesson 43 browser | `node scripts/audit-lesson43-browser.mjs` (dev server on :5173) | ✓ 297 checks, 0 failures |
| Full course chain | `npm run audit:english-direction` | ✓ every lesson audit, final-test, source-reveal and BIDI audits pass |
| Coverage document | `node scripts/lesson43-coverage-doc.mjs` | ✓ generated, 1157 lines |

Known environment limitations, stated honestly: ESLint is not configured in this repository so no lint claim is made; `npx tsc --noEmit` is unusable here (no root tsconfig) — type safety is enforced by the production build; the sandbox cannot reach Google Fonts, so the browser audit aborts those requests and measures computed styles with system fallback fonts (recorded under `externalNetworkErrors` in `verification.json`); pre-existing TypeScript errors in lessons outside lesson43 are untouched and unreported here.

## 10. Shared-file changes (minimal)

`src/App.tsx` (registration + route 43), `package.json` (audit script entries), barrier/scope-guard extensions in the existing audit scripts (`audit-lesson41/42.mjs` allowlists, `audit-bidi-mixed.mjs` strict set + crawl list, `audit-lesson-navigation.mjs`, `audit-final-test.mjs`, `check-english-direction.mjs`, `audit-render-direction.mjs`, `audit-lesson31/37/38/39/40.mjs` counters), plus the new lesson-43 files and docs. No Lesson 1–42 source, test count or key was modified.
