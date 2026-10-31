# Lesson 49 — coverage and verification

Route: `#/lesson/49`. The lesson has **52 slides in 22 stations**, **48 practice items in 7 sets**, and a **25-question final test (10 / 5 / 5 / 5)**. It reuses `Lesson1Shell`, the shared navigation, the site lock and `splitMixedText`; lesson code and CSS live in `src/lessons/lesson49/`, with only registration and audit extensions outside it.

## Station map

| Station | Slides / retained content |
| --- | --- |
| Opening | `cover`, `goals`, `stage-three`, `timeline-lab`, `six-functions`: 12 goals, Phase 3 opening, six interactive timeline items and the six functions |
| Core rule | `core-formula`, `have-not-has`, `v3-table`, `v3-workshop`, `common-errors`: `MODAL + HAVE + V3`, no `HAS`/`HAD` after the modal, a V3 table, eight workshop verbs and six common errors |
| Present vs past | `present-past`, `detector-lab`: `Modal + V1` for present/future vs `Modal + HAVE + V3` for past, plus an eight-item meaning detector |
| MUST HAVE | `must-have`, `must-evidence`, `must-vs-must-have`: strong deduction from evidence, five evidence cards and a MUST / MUST HAVE contrast |
| MAY / MIGHT HAVE | `may-have`, `may-might-compare`: past possibility without invented percentages and a meaning contrast |
| COULD HAVE | `could-have`, `could-vs-should`: past possibility and an unclaimed opportunity, contrasted with SHOULD HAVE |
| COULDN'T HAVE | `couldnt-have`, `couldnt-vs-couldnt-do`: impossible-past deduction vs `COULDN'T + V1` |
| SHOULD (N'T) HAVE | `should-have`, `shouldnt-have`, `should-shouldnt-compare`: regret, late advice and criticism of a past action |
| OUGHT TO HAVE | `ought-to-have`, `ought-vs-should`: moral duty / late advice and the SHOULD alternative |
| NEEDN'T HAVE | `neednt-have`, `neednt-vs-didnt`: an action done unnecessarily vs `DIDN'T NEED TO + V1` |
| WOULD HAVE | `would-have`: an unreal past result, explicitly linked forward to Lesson 54 without teaching the third conditional |
| Modal Perfect vs Past Perfect | `past-perfect`, `modal-vs-past-perfect`: structural and meaning differences, six stored comparisons |
| Negation / questions | `negation`, `questions`: negative forms, questions and short answers |
| Meaning map | `meaning-map`, `meaning-contrast`: 10 combinations, each with function, Arabic meaning, example, context clue and contrast |
| Common errors | `errors-wall`, `grammar-detective`: six errors and six real correction challenges |
| Dialogue | `dialogue`: “WHAT HAPPENED YESTERDAY?”, 14 turns, optional Arabic translation, function analysis and five checks |
| Reading | `reading`, `reading-questions`, `reading-challenge`: “The Missing Project”, six paragraphs, six comprehension questions and a five-question challenge |
| Practice | `practice-1` … `practice-4`: 10 completion, 5 choice, 8 correction, 8 translation, plus 6 detective, 5 dialogue and 6 contrast items |
| Final test | `final-test`: exactly 25 questions in four groups |
| Teacher | `teacher`: gated teacher space, deferred 25-solution guide |
| Writing / speaking | `writing`: “A Day Full of Mistakes”, 8–10 sentences, six required structures, advisory checker, model answer and six speaking questions |
| Summary / course | `mastery-dashboard`, `golden-summary`, `stage-progress`, `course-progress`: dashboard, 10-form + 6-contrast summary, Phase 3 completion, 49/120 = 40.83%, 71 remaining, next Lesson 50 — DEDUCTION & SPECULATION |

## Answer-key protection and grading

`testData49.ts` contains student prompts only. `testKey49.ts` contains solutions, accepted patterns, alternatives and rejection notes. `TestArea49.tsx` imports the key type only at module level and calls `import("./testKey49")` **inside `submit()`**; before submission there is no solution object in props, state, JSON or DOM. The browser audit records **zero requests for the key or teacher-guide chunks before submit**.

`TeacherArea49.tsx` is controlled by the lesson shell, resets its lock on retake, and only renders the deferred `TeacherGuide49` module after a graded result and the project teacher password (`somer173`). The guide imports only the result type and derives its explanations from `result.solutions`.

Accepted: case, spacing and punctuation differences; `should have` / `ought to have` where both preserve meaning; stated translation alternatives. Rejected: `HAS`/`HAD` after a modal, V1/V2 where V3 is required, and a wrong sentence that merely contains the right modal. Retry keeps the 25 answers, and a failed key load keeps the answers while exposing a retry.

## Verification (run on 2026-11-01, branch `arena/7b5962cb-english-course`)

| Command | Result |
| --- | --- |
| `npm run build` | **passed** (~10.8 s); only the pre-existing >500 kB chunk-size warning. Separate key and teacher-guide chunks are emitted. |
| strict `tsc --noEmit` over `src/lessons/lesson49/*.ts{,x}` | **0 diagnostics** (the repo has no root `tsconfig.json`; `npm run build` remains the project TypeScript gate). |
| `npm run check:english-direction` | **1740 assertions, 49 lessons** passed; **59/59** bidi rendering assertions passed. |
| `node scripts/audit-render-direction.mjs` | **1471 assertions** passed. |
| `node scripts/audit-lesson-navigation.mjs` | **216 passed, 0 failed** (ends at 40–49; `#/lesson/49` renders and stays current). |
| `node scripts/audit-lesson49.mjs` | **652 assertions, 0 failures**. |
| `node scripts/audit-lesson49-browser.mjs` | **753 assertions, 0 failures**; 3 console messages are the deliberately failed key requests. |
| `node scripts/audit-final-test.mjs` | 1263 assertions, **5 failed** — all pre-existing Lesson 35 key/password checks. |
| `node scripts/audit-final-test-coverage.mjs` | **3/633 failed** — all pre-existing Lesson 35. |
| `node scripts/audit-source-reveal.mjs` | **1/63 failed** — pre-existing `<details>` in `lesson38/Steps38.tsx`. |
| `node scripts/audit-bidi-mixed.mjs` | **4 strict failures, all Lesson 38**; Lesson 49 = **0 violations** (`ONLY=49` passes). |
| `node scripts/audit-navigation-lock-overlap.mjs` | 110 passed, **1 failed** — pre-existing Lesson 36 teacher tab. |
| `node scripts/audit-lesson47.mjs` / `audit-lesson48.mjs` | **773/0** and **724/0** — no regression. |
| `audit-lesson47-browser.mjs` / `audit-lesson48-browser.mjs` | **662/0** and **754/0** — no regression. |

`audit-lesson49` covers the inventory (52 slides, 22 stations, unique IDs, every slide kind), 12 goals, the 10-form map, six contrasts, 14 dialogue turns, the six-paragraph reading and its six questions/challenge, 48 practice items with correct/wrong/blank grading, accepted alternatives, rejection of grammatical errors containing the right modal, the 25-question 10/5/5/5 shape, no key in student data, submit-only key import, retry URL safety, full jsdom rendering, the locked teacher, preserved answers on a simulated key failure, single-flight submission, and feedback only after submission.

`audit-lesson49-browser` runs the built `dist/` at the GitHub Pages base path in Chromium: all 52 slides at 1280/768/375/320 with overflow, lock/navigation overlap, hit-testing and RTL checks; timeline, evidence, V3 workshop, detector, meaning map (10), contrast lab (6), dialogue (14 translations), reading (6 paragraphs + 6 questions + challenge); writing checklist 6/6 and sentence counter; dashboard `— / 25`, `1 / 6`, `1 / 1`; 25 questions in four groups; submit disabled until complete; teacher waiting state before submit; partial-answer persistence; **three real key-chunk failures followed by 25/25 and 25 feedback blocks**; alternatives for q22/q23/q25; teacher guide after `somer173` with 25 explanations; retake re-lock; wrong answers → **23/25**; phase/roadmap/site lock; and the 768/375/320 walks.

Perfect-answer map used by the audit (`gradeTest49` → 25/25): q1–q4 `a`, q5 `c`, q6 `b`, q7 `a`, q8–q10 `b`, q11 `gone`, q12 `called`, q13 `forgotten`, q14 `won`, q15 `eaten`, q16 “She must have arrived.”, q17 “He might have forgotten.”, q18 “You should have gone to school.”, q19 “They could have seen us.”, q20 “I needn't have taken a taxi.”, q21 “She must have arrived early.”, q22 “He might not have understood the question.”, q23 “They ought to have helped us.” (also accepts “should have”), q24 “You should not have bought that phone.”, q25 “I would have gone with you if you had told me.” The wrong-answer case (q1 option 2 + q16 “She must has arrived.”) scores **23/25**.

## Visual check

Chromium screenshots were inspected at **1280, 768, 375 and 320 px** for the cover, core formula, meaning map, comparisons, practice, dialogue, reading, final test, result, teacher area and Phase 3 summary, in addition to the automated walk of every slide at all four sizes. No horizontal overflow, no lock/next/previous overlap, and the lock stays in the bottom pill at 320 px (icon form below 340 px). Screenshots are produced under `node_modules/.lesson49-browser/` and are not committed.

## Pre-existing failures (not attributed to Lesson 49)

Lesson 36 teacher tab in the navigation-lock audit; four bidi strict cases and the `<details>` source reveal in Lesson 38; five Lesson 35 final-test key checks (three in the coverage audit); and git-scope guards in Lessons 33/41/42/43/44 that fail on unmerged branches. The umbrella `npm run audit:english-direction` was not completed because it halts at the Lesson 33 guard; no guard was modified or bypassed.

## Known limits

- The site is client-only. Deferred loading and the password are presentation conveniences, **not server-side security**.
- Grading is normalisation plus bounded, anchored patterns, not full natural-language understanding; an unforeseen but correct paraphrase may need manual review.
- The writing/speaking checker is explicitly advisory: sentence count and required structures only, not fluency or full meaning.
- State is in memory; a reload is not promised to preserve answers.
- The teacher-guide network-failure retry is covered statically only; the real browser abort test was removed after it could not be isolated reliably.
- Screenshots and extracted Chromium live under `node_modules/`, so they are not part of the commit.
