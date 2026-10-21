# Lesson 40 — Timeline Command Lab: source-to-step coverage ledger

This rebuild keeps the unchanged `ledger40.ts` as the source of truth. The eager student application uses an audited safe projection (`studentLedger40.ts`) that is identical except for §26, where only the two student-facing introduction units are retained; the full answer-bearing source is loaded by deferred solution/teacher surfaces. The 29 source sections plus the supplied opening are mapped below to **110 focused steps**. Student/test/teacher surfaces are distinct; source sections §25 and §26 remain routed to their dedicated areas rather than copied into ordinary learning steps.

Every numbered range is a zero-based inclusive `units[]` range from the corresponding section in `src/lessons/lesson40/ledger40.ts`. The three reconstructed source tables are emitted once in the stated step. Original answer `revealUnits` are bound to activity steps and mount only after the learner submits an attempt; the longer §21 and §23 answer sets are divided into two separate feedback groups.

| Source unit | Implemented step IDs and source-unit ranges | Preserved content / presentation |
|---|---|---|
| Opening | `cover-01` [0–5], `cover-02` [6–11], `cover-03` [12–14] | Title, Arabic title, subtitle, level, complete bridge from Lessons 34–39, six learning stations (the six stations/five principal forms distinction), review framing and instructional plan. |
| §1 | `s01-01` [0–5], `s01-02` [6–10] | All ten original objectives. |
| §2 | `s02-01` [0–5], `s02-02` [6–11], `s02-03` [12–17], `s02-04` [18–23], `s02-05` [24–29], `s02-06` [30–31] | Six diagnostic questions and all examples, Arabic translations, and target forms. The six-question decision console is keyboard-operable and reveals one route at a time. |
| §3 | `s03-01` [0] + source table | All five principal forms, formulas, meanings, and the Lesson 36 comparison note. WILL vs BE GOING TO remains a comparison between two of five forms, not a sixth principal form. |
| §4 | `s04-01` [0–5], `s04-02` [6–11], `s04-03` [12–17], `s04-04` [18–19] | All five study examples, translations, focus explanations, and key meaning distinction; interactive five-lens timeline. |
| §5 | `s05-01` [0–5], `s05-02` [6–11], `s05-03` [12–17], `s05-04` [18–23], `s05-05` [24–26] | Model WILL/GOING TO contrast, all four situations, explanations, and overlap caution. |
| §6 | `s06-01` [0–5], `s06-02` [6–11], `s06-03` [12–17], `s06-04` [18] | Online lesson scenario, time window, all three examples/translations, and laptop availability question. |
| §7 | `s07-01` [0–5], `s07-02` [6–11], `s07-03` [12–16] | Friday project deadline, Wednesday expectation, all three examples/translations, and completion/result focus. |
| §8 | `s08-01` [0–5], `s08-02` [6–11], `s08-03` [12–16] | Sara's 2:00–6:00 four-hour training timeline, all examples/translations, and duration emphasis. |
| §9 | `s09-01` [0–5], `s09-02` [6–11], `s09-03` [12–15] + source table | Adam's 4:00–8:00 project, all three sentences, and all three question-to-form rows; interactive reference timeline. |
| §10 | `s10-01` [0–5], `s10-02` [6–11], `s10-03` [12–13] | Full distinction: FPC itself does not say whether activity stops or remains unfinished; completion/result vs duration/continuity. |
| §11 | `s11-01` [0–5], `s11-02` [6–11], `s11-03` [12–17], `s11-04` [18–22] | All time expressions, both Friday-report examples, both work-duration examples, and non-mechanical marker principle. |
| §12 | `s12-01` [0–5], `s12-02` [6–11], `s12-03` [12–17], `s12-04` [18–23], `s12-05` [24–25] | All six conjunctions, all examples, wrong/correct `when` contrast, direct “When will you arrive?” distinction; active repair choice. |
| §13 | `s13-01` [0–5], `s13-02` [6–11], `s13-03` [12–14] | All three arrival examples and the activity/result/duration reference-point distinction. |
| §14 | `s14-01` [0–5], `s14-02` [6–11], `s14-03` [12–17], `s14-04` [18–20] | FOR/SINCE rule and every example, both Future Perfect Continuous and Future Perfect uses, stative KNOW contrast. Interactive choice. |
| §15 | `s15-01` [0–5], `s15-02` [6–11], `s15-03` [12] + source table | Complete five-form WRITE table, all five incorrect constructions and all five corrected forms. |
| §16 | `s16-01` [0–5], `s16-02` [6–11], `s16-03` [12–17], `s16-04` [18–23], `s16-05` [24–27] | Complete Science Competition dialogue, all source translation/analysis and IQ200 insight. Existing source retains original supplied language; platform bilingual assists remain explicitly platform-authored where identified by source-audit. |
| §17 | `s17-01` [0–4], `s17-02` [5–9], `s17-03` [10–14], `s17-04` [15–16] + six `revealUnits` | Complete Family Trip dialogue and all six classification tasks/answers. Dialogue turns include separate platform Arabic translation. Answers and explanations appear only after a typed attempt. |
| §18 | `s18-01` [0–5], `s18-02` [6–11], `s18-03` [12–17], `s18-04` [18–23], `s18-05` [24–29], `s18-06` [30] | All five context-first situations, example sentences, and explanations. |
| §19 | `s19-01` [0–5], `s19-02` [6–11], `s19-03` [12–17], `s19-04` [18–23], `s19-05` [24–26] + six `revealUnits` | All six multiple-choice questions and detailed answers. Answer key stays closed until an attempt. |
| §20 | `s20-01` [0–5], `s20-02` [6–9] + eight `revealUnits` | All eight fill-ins and explanations, including contextual alternatives and the three distinct arrival-reference meanings. |
| §21 | `s21-01` [0–5], `s21-02` [6–11] + twelve `revealUnits` | All ten Grammar Detective items and corrections/reasons, including accepted alternatives in item 1. |
| §22 | `s22-01` [0–5], `s22-02` [6–11], `s22-03` [12–15] | Both multi-answer comparisons and explanation that open context may admit more than one grammatical form. |
| §23 | `s23-01` [0–5], `s23-02` [6–11], `s23-03` [12–17], `s23-04` [18–23], `s23-05` [24–29] + eight `revealUnits` | Complete Future Learning Centre passage, all eight comprehension questions and answers. Reading answers are withheld until a typed attempt. |
| §24 | `s24-01` [0–5], `s24-02` [6–11], `s24-03` [12–17] | Full six-sentence grammatical analysis and final learning principle. |
| §25 | `s25-01` [0–1] launch/instructions; complete §25 source units [0–64] consumed once by `testData40.ts` / Test Area | Exactly 25 source questions in five groups of five: MCQ, fill, correction, conceptual, and five Big School Project blanks. The Q21–25 stems are the five story gaps. No answer key is in the test data. |
| §26 | `s26-01` [0–1] student pointer; complete §26 source key loaded in `SolutionsArea40` / `TeacherGuide40` | All 25 source solutions and reasons, kept out of ordinary student lesson rendering and dynamically loaded solution/teacher surfaces. |
| §27 | `s27-01` [0–5], `s27-02` [6–11], `s27-03` [12–17], `s27-04` [18–20] | Full 15–18 sentence Writing Mission, all ten requirements, six-sentence guided opening, and “do not copy” instruction. |
| §28 | `s28-01` [0–6], `s28-02` [7–13], `s28-03` [14–20], `s28-04` [21–27], `s28-05` [28–34], `s28-06` [35–41], `s28-07` [42–44] | All five formulas, functions, examples, and final decision principle. |
| §29 | `s29-01` [0–5], `s29-02` [6–11], `s29-03` [12–17], `s29-04` [18–23], `s29-05` [24–29], `s29-06` [30–31] | Complete present/past/future milestones and Lesson 41 preview. Final step links to the existing `#/lesson/41` route found in `src/App.tsx`; no Lesson 41 implementation details were invented. |

## Atomic coverage and protection notes

- The executable `npm run audit:lesson40` checks each step's exact `unitIndexes` and rendered `data-source-unit` markers; it also compares the student-safe projection against the canonical ledger and checks the source tables and dedicated assessment/teacher routes.
- After `npm run build`, `node scripts/audit-lesson40-build.mjs` verifies that a representative final-test answer literal is absent from the initial JavaScript entry and remains in a non-entry answer chunk. The Chromium audit separately verifies those deferred modules are requested only after the relevant UI action.
- Original `ledger40.ts` is intentionally not edited. `git diff HEAD -- src/lessons/lesson40/ledger40.ts` must remain empty.
- Source practice answers from §§17, 19, 20, 21 and 23 are source-provided, not final-test answers. They remain absent from initial DOM until a learner types and submits an attempt.
- The final-test question bank and the answer/teacher modules are separate. The test module contains no key. A static client application cannot provide server-grade confidentiality: public code chunks and the password gate can be inspected by a determined user. The application does defer the solution/teacher modules until their corresponding UI is unlocked/loaded.
