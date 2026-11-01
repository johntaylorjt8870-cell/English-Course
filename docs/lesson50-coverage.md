# Lesson 50 — coverage and verification

Lesson 50: **DEDUCTION & SPECULATION — الاستنتاج والتخمين في الحاضر والماضي** («عدسة الاستنتاج / THE DEDUCTION LENS»), lesson 50/120, Phase 3. 46 slides / 20 stations. Writing and the smart review are placed **before** the final test so the test is the last assessed station.

## Station map

| Station | Slides | Covers |
|---|---|---|
| opening | cover, objectives, evidence room | certainty-gauge preview, NOW vs PAST pair, outcomes, real-life deduction contexts |
| certainty | concept, scale, lab | deduction vs speculation; MUST / MAY-MIGHT-COULD / CAN'T; 4 evidence scenes (interactive) |
| must-now | must-be, must-verb | MUST+V1; MUST BE + adjective / noun / place / V-ing; no ‑S after MUST |
| maybe-now | may/might/could | present + future possibility; MAY vs MIGHT nuance; COULD ability vs possibility |
| cant-now | can't now | negative deduction now; first CAN'T vs MUSTN'T contrast |
| cases-now | ahmad case, books case | 10 graded hypotheses over two evidence scenes (interactive) |
| past | past deduction, past possibility | MODAL + HAVE + V3; CAN'T/COULDN'T HAVE + V3 (rain, exam, cake, theft…) |
| lens | lens lab, lens table | 7 now↔past pairs with per-pair lens toggle; comparison table; BEEN; form errors |
| ongoing | past continuous | HAVE BEEN + V-ing vs finished event |
| could | could lab | classify 6 sentences into the 4 uses of COULD (interactive) |
| decision | decision lab | 3-step wizard: time → certainty → finished/continuous (interactive) |
| mistakes | errors 1–2, can't × mustn't | six classic errors as corrections; deduction vs prohibition; MUST vs HAVE TO |
| dialogue | dialogue | "What Must Have Happened?" — 9 turns + 6-row function analysis |
| reading | text, hunt, questions | "The Strange Noise" (9 paragraphs) + Arabic translation; 5-form hunt; 7 Q&A |
| practice | 7 sets | choose 6, complete 8, classify 6, correct 8, translate 8, detective 6, dialogue 5 = **47 graded items** |
| writing | writing, speaking | "What Might Have Happened?" 10–12 sentences + live quota checker + labelled model; 2-minute speaking with linkers |
| review | golden review | smart summary table + five core sentences + self-check |
| final-test | final test | **25 questions: 10 MCQ + 5 completion + 5 correction + 5 translation** (last assessed station) |
| teacher | teacher area | gated behind a submitted result + password |
| progress | dashboard, next lesson | real progress only; Lesson 51 teaser; 50/120 = 41.67% |

All source points are covered: certainty degrees with approximate-percentages warning, MAY vs MIGHT nuance, COULD ability vs possibility, CAN'T vs MUSTN'T, MUST vs HAVE TO, missed-opportunity COULD HAVE, continuous past deduction, the 3-step decision routine, six error corrections, full dialogue + analysis table, full reading + translation + 7 Q&A, five practice sets (36 items) + two application sets (11 items), writing model presented as a model only, speaking task.

## Answer-key protection and grading

- `testData50.ts` contains prompts only (no answers, no `modelAnswer`). Solutions live in `testKey50.ts`, which is imported **only inside `submit()`** (dynamic import with a validated `?retry` fallback on chunk failure). No reveal-answers control, no key in `window`/DOM before submission.
- Single submission: a ref + state guard blocks duplicates; inputs lock after submit; "محاولة جديدة" resets locally and clears stored answers.
- Results show score, correct answers, per-question explanations, and a wrong-answer review list with remediation routes.
- Free-text grading (`normalize50` + per-question exact/alternative lists): apostrophes are preserved, so **can't ≠ can** and **couldn't ≠ could**. Equivalent modals (may/might/could), both orders of "at home/home now", optional objects and full-sentence completions are accepted where the tense and certainty stay identical. Ungrammatical answers containing the right modal are rejected (e.g. `must have raining`, `she knew` for a present modal blank).
- Documented source traps, handled deliberately:
  1. Practice Ex1 Q3 in the supplied text had an impossible key; the evidence (three reminders) only supports **can't have forgotten** — graded as such.
  2. Final Q1 option C and Q8 options B/C are verbatim ungrammatical distractors; graded by option id so they can never score.
  3. Final Q17 / Practice Ex4 Q3 accept **two** correct corrections (past event `can't have gone to school yesterday` and continuous `can't be going to school now`).
  4. The writing model (8 sentences) is labelled as a model; the student target remains 10–12 sentences.

## Verification (run on 2026-11-01, branch `arena/0d4fb323-english-course`)

- `npm run build` — production build passes; Lesson 50 chunks (`testKey50`, `TeacherGuide50`, retry variants) emitted.
- Strict `tsc --noEmit` over `src/lessons/lesson50/*` — 0 diagnostics. (The repo has no `tsc` script; this was run ad hoc with the project flags.)
- `npm run audit:lesson50` — **639 assertions, 0 failures**: content coverage, key separation greps, perfect/alternative/negative grading matrices for all 25 test questions and 47 practice items, retry/jsdom render of all 46 slides, student-copy audit (no source labels), duplicate-submit guard, teacher isolation.
- `npm run audit:lesson50-browser` — **670 assertions, 0 failures** (Playwright): all slides at desktop, interactions, locked key before submit, 25/25 and 23/25 grading, retry paths, teacher flow, viewports 1280/768/375/320 with no horizontal overflow or lock/nav overlap.
- Shared audits updated for Lesson 50: `audit-lesson-navigation` (50 lessons, final window 41–50, `#/lesson/50` route) — **224 passed, 0 failed**; `audit-final-test` (Lesson 50 dedicated-assessment block); `audit-navigation-lock-overlap` (Lesson 50 added to representative set — its own checks pass); lesson-count expectations in `check-english-direction` (49→50) and `audit-render-direction` (49→50 folders).
- `npm run check:english-direction` — passes (1747 checks + 59/59 bidi rendering). `audit-render-direction` — 1471 assertions pass. `ONLY=50 audit-bidi-mixed` — passes.
- Regression: Lesson 47 (773), Lesson 48 (724), Lesson 49 (652) audits pass unchanged.
- Not run: the long `audit:english-direction` chain end-to-end (each link was run individually instead; the chain stops at a pre-existing failure, see below) and `audit:navigation-lock-browser` (regenerates the stored browser report).

## Visual check

Screenshots from the browser audit (`node_modules/.lesson50-browser/`) were inspected at 1280/768/375/320px: cover, certainty gauge + lab, lens lab, dialogue, reading, writing, golden review, final test, teacher area, dashboard, next lesson. No overlap between the site-lock button, previous/next controls, and test submit; no clipped text or horizontal scroll; Arabic RTL with isolated English LTR throughout. (Emoji render as boxes only in the audit Chromium, which lacks a color-emoji font.)

## Pre-existing failures (not attributed to Lesson 50)

Verified identical on untouched `main` (git worktree at `b90e4ea`) and left untouched per scope:

- `audit-final-test` — 5 failures, all Lesson 35 teacher-key (main: 5/1263; with L50: 5/1265 — the two new Lesson-50 assertions pass).
- `audit-final-test-coverage` — same Lesson 35 cluster.
- `audit-source-reveal` — 1 failure: `<details>` in `src/lessons/lesson38/Steps38.tsx`.
- `audit-navigation-lock-overlap` — 1 failure: Lesson 36 student-tab (main: 110 passed/1 failed; with L50: 111/1).
- `audit-bidi-mixed` (full run) — 4 strict violations in Lesson 38 (Lesson 50 alone passes).

Lesson 50 changes are additive (new `src/lessons/lesson50/` + registration in `src/App.tsx` + audit scripts + docs + two lesson-count expectation updates) and do not modify Lessons 1–49 or shared components.

## Known limits

- Percentages on the certainty scale are labelled in-app as approximate teaching aids, not linguistic constants.
- No audio or automatic speaking assessment is claimed; the speaking station is a guided self/peer task.
- The site-lock and teacher gates follow the existing project behaviour (client-side); unchanged by this lesson.
