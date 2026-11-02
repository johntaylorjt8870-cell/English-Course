# Lesson 52 — coverage and verification

Lesson 52: **FIRST CONDITIONAL — الشرط الأول** («Future Possibilities — If + Present Simple, Will + V1»), lesson 52/120, Phase 3. **64 slides / 21 stations / 11 interactive labs / 6 exercises (47 items) / 25-question final test**. Writing, speaking and the smart review come **before** the final test so the test is the last assessed station.

The presentation layer is a literal clone of Lesson 1 (`Lesson1Shell` + the exact `Lesson1.tsx` class strings carried into `kit52.tsx`), not a new design. Only teaching content, topic illustrations and the condition/result tone mapping are new.

## Station map

| Station | Slides | Covers |
|---|---|---|
| opening | cover, goals, intro, definition, first-example, cond-lab | future-possibility identity; IF = condition → result; real future examples; definition and five uses; 4-item condition-vs-result lab (interactive) |
| rule | core rule, will trap | `IF + PRESENT SIMPLE, WILL + V1`; why `will` never follows `if` in the normal first conditional |
| build | structure, conjugation, verb lab | sentence formation; six pronoun rows (affirmative/negative); 6-item conjugation workshop (interactive) |
| order | order rule, order lab | IF-first vs result-first, comma rule; 4-sentence rebuilder preserving every token (interactive) |
| negative | negative condition, negative result, both, neg lab | three negative shapes; V1 after doesn't/don't; 6-case negative builder (interactive) |
| questions | question forms, yes/no, question-order lab | What/Where/Who/Will questions, inversion and V1; 4-question word-order rebuilder (interactive) |
| modals | can, may/might, should/must, modal formula, modal lab, outcome lab | can / may / might / should / must in the result; IF clause stays present simple; 4-case modal lab + 4-case future-outcome lab (interactive) |
| imperative | imperative | imperative result (`If you need anything, call me.`) with no subject |
| zero-vs-first | table, pairs, zero-first lab | Zero = general truth, First = one future possibility; 3 contrast pairs; 6-sentence Zero/First discriminator (interactive) |
| unless | unless rule, unless error, unless lab | `unless = if not`; never add a second negative; 5 unless rewrites (interactive) |
| time | time linkers, if vs when, if-when lab | when / as soon as / before / after / until; IF = condition, WHEN = expected timing; 3-context IF/WHEN lab (interactive) |
| mistakes | errors 1–3, errors 4–6, error lab | six common errors (will after if, s after doesn't, missing will, double negative with unless, if/when confusion, wrong verb form); 8-item error detector (interactive) |
| dialogue | dialogue, dialogue questions | «Planning for the Weekend» — 10 turns + 5 comprehension questions with hidden models |
| reading | text, translation, questions, hunt | «Preparing for the School Competition» + full Arabic translation + 7 Q&A + 5-form hunt (interactive) |
| practice | practice 1–6, solutions 1–2 | complete 10, choose 8, correct 8, classify 8, unless rewrite 5, translate 8 = **47 graded items**, every item with `why`; answers + explanations on two separate slides |
| writing | writing, speaking | «My Plans for the Future» 8–12 sentences with ≥5 first conditionals (labelled model has 8 sentences/6 conditionals); 2-minute speaking task with 7 questions and 8 starters |
| review | summary, review, self-check | lesson summary, golden review table + core sentences, 8-point self-check |
| final-test | final test | **25 questions: 8 MCQ + 5 completion + 5 correction + 3 classify + 4 translation** (last assessed station) |
| teacher | teacher area | gated behind a submitted result + password; guide built only from `result.solutions` |
| progress | dashboard, progress, roadmap, closing | real progress only; 52/120 = 43.3%, 68 remaining; Lesson 53 (SECOND CONDITIONAL) roadmap |

## All 24 source axes

1. Definition and uses (future possibility, warning, promise, threat, offer, advice) — definition + five cards.
2. Core rule `If + Present Simple, will + V1` — formula card and step breakdown.
3. Formation and conjugation — structure + six pronoun rows + S/ES alert.
4. Clause order and punctuation — order rule + comma shown only when IF comes first.
5. Negation in the condition — `doesn't/don't + V1`.
6. Negation in the result — `will not / won't`.
7. Negation in both clauses — combined example.
8. What / Where / Who / Will questions — question-form slide.
9. Yes/No questions beginning with Will — separate slide.
10. Modal verbs in the result — can, may, might, should, must (4 slides + 2 labs).
11. Imperative result — dedicated slide.
12. Zero vs First comparison — table + three pairs + lab.
13. Unless — rule, double-negative trap, rewrite lab.
14. Time linkers — when, as soon as, before, after, until.
15. If vs When — focus difference + lab.
16. Six common errors — two error walls + detector lab.
17. Dialogue «Planning for the Weekend» + 5 questions.
18. Reading «Preparing for the School Competition» + full translation + 7 questions + 5-form hunt.
19. Exercise 1 — 10 gap-fill items.
20. Exercise 2 — 8 MCQ items.
21. Exercise 3 — 8 error corrections.
22. Exercise 4 — 8 classify items.
23. Exercise 5 — 5 unless rewrites; Exercise 6 — 8 translations; answers with explanations on solutions 1–2.
24. 25-question final test + answer key + explanations; writing, speaking, summary, progress 52/120 and Lesson 53 navigation.

## Answer-key protection and grading

- `testData52.ts` contains prompts, options and `data-test-*` hooks only. No answers, no `modelAnswer`, no solutions import.
- The key lives in `testKey52.ts` (`TEST_SOLUTIONS_52`, `gradeQuestion52`, `gradeTest52`) and reaches the page only through `import("./testKey52")` inside `submit()`, with `retry52.ts` for chunk failures. The student bundle never statically imports the key.
- Single submission is guarded; inputs lock after submit; «محاولة جديدة» clears answers/score and re-locks the teacher area.
- Grading normalises case, punctuation, apostrophes and whitespace; accepts `doesn't/does not`, `won't/will not`, `practice/practise`, `begin/start`, `arrive/come`, `goal/goals`, `phone/mobile phone`; rejects `will` after IF, `doesn't studies`, missing will, `Unless … don't`, inverted question order and blank answers.
- The teacher guide (`TeacherGuide52.tsx`) derives everything from the submitted `result.solutions`; it never imports the solutions constant.

## Verified by real runs

| Command | Result |
|---|---|
| `npm run build` | ✓ built (only the repo-wide >500 kB chunk warning) |
| `npx tsc --noEmit --strict --jsx react-jsx --module esnext --moduleResolution bundler --target es2022 --skipLibCheck src/lessons/lesson52/*.tsx src/lessons/lesson52/*.ts` | 0 diagnostics |
| `npm run audit:lesson52` | **485 assertions, 0 failures** (64 slides / 21 stations / 11 labs / 6 exercises = 47 items / 25-question key isolation / accept–reject / retry harness / jsdom slide walk with student-copy leak audit / test + teacher rendering) |
| `npm run audit:lesson52-browser` | **2342 checks, 0 failures** (Chromium: every slide at 1280/768/375/320 — no horizontal overflow, no lock/nav overlap, next/prev hit-testable, RTL preserved, drawer navigation; no key/guide request before submit; 25/25; two grammar errors graded 23/25 with corrections; retake clears score and re-locks teacher; correct password loads 25 keys; progress 52/120 · 43.3% · 68) |
| `node scripts/audit-final-test.mjs` | Lesson 52 dedicated block passes; only the 5 pre-existing L35 failures remain (same on clean `main`) |
| `npm run audit:lesson-navigation` | 240 passed, 0 failed (52-lesson windows incl. `43–52`, route 52 renders `data-lesson="52"` + "FIRST CONDITIONAL") |
| `npm run check:english-direction` | passes (52-lesson inventory) |

### Repo-wide pre-existing failures (unchanged by this branch)

Verified against the untouched `main` commit `13cb9e3` in a separate worktree:

| Audit on `main` | Baseline failure | Status here |
|---|---|---|
| `audit-final-test.mjs` | 5 Lesson 35 assertions | unchanged (L52 block passes) |
| `audit-final-test-coverage.mjs` | 3 Lesson 35 assertions | unchanged |
| `audit-source-reveal.mjs` | `<details>` in `lesson38/Steps38.tsx` | unchanged |
| `audit-bidi-mixed.mjs` | 4 strict Lesson 38 cases | unchanged |
| `audit-navigation-lock-overlap.mjs` | 1 Lesson 36 tab assertion | unchanged |
| `audit-lesson41.mjs` | hub stats 71 vs 120 slides | unchanged (pre-existing) |

`audit-lesson33.mjs`, `audit-lesson42.mjs` and `audit-lesson44.mjs` end with a **branch-scope guard** that diffs the whole branch against `main` and requires every changed path to belong to that lesson. They pass on clean `main` (Lesson 33: 1533/0) but by construction cannot pass on a branch that adds another lesson. Lesson 42's stale `47 cards` assertion was updated to `52`; its scope guard remains the only failure there.

## Security proof

- Answering all 25 questions issues **no** request for `testKey52` or `TeacherGuide52`.
- The first key request happens only after the Submit click.
- Before submission there is no feedback element and no key in the DOM; after submission feedback with model, `why`, accepted alternatives and rejected patterns appears for all 25.
- Teacher slide shows `[data-teacher-waiting]` with no password field until a result exists; wrong password rejected; the guide chunk fetches only after `somer173`.

## Screenshots

`docs/lesson52-visual/` — desktop 1280×900 and mobile 375×812: cover, core rule, zero/first table, exercise 1, final test, progress; `desktop-01-cover.png` is the direct Lesson 1 comparison shot.
