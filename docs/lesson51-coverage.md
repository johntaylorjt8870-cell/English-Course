# Lesson 51 — coverage and verification

Lesson 51: **ZERO CONDITIONAL — الشرط الصفري** («THE LAW OF CAUSE & EFFECT — مختبر السبب والنتيجة»), lesson 51/120, Phase 3. 48 slides / 22 stations. Writing and the smart review are placed **before** the final test so the test is the last assessed station.

## Station map

| Station | Slides | Covers |
|---|---|---|
| opening | cover, objectives | lab identity, IF = condition → result preview, outcomes |
| intro | intro, three cases | IF as condition→result; three condition/result cards (heated ice, morning alarm, rain) |
| definition | definition, five uses | definition; scientific facts, general rules, habits, instructions, repeated results |
| formula | core rule, conjugation, S/ES alerts, verb lab, will note | `IF + PRESENT SIMPLE, PRESENT SIMPLE`; all six pronoun rows; S/ES with He/She/It in **both** clauses; 6-item conjugation lab (interactive); where WILL belongs |
| facts | science facts, pressure note, science lab | water boils at 100°C **at standard atmospheric pressure** (caveat kept); ice melts, metals absorb heat, plants need light; 4-reaction cause→result lab (interactive) |
| rules-habits | general rules, habits, fact-vs-habit, fact lab | general rule/results, habits, zero-vs-first "General Fact or Future Event?" lab (interactive) |
| negative | negative condition, negative result, neg lab | condition/result/both negatives; V1 after DOESN'T; 6-case negative builder (interactive) |
| questions | question forms | What happens if…? / What do you do if…? with inversion and V1 |
| order | order rule, order lab | IF-first vs result-first + comma rule; 4-sentence rebuilder (interactive) |
| if-when | if vs when, when lab | focus difference (condition vs expected timing), not interchangeable; 3-scene lab (interactive) |
| modals | modals, modal lab | CAN/MUST/SHOULD/MAY/MIGHT in the result; modals don't make a sentence zero-conditional by themselves; base pattern stays in the IF clause; 4-case outcome lab (interactive) |
| zero-vs-first | table, pairs, four cases | WILL is not "always wrong" (`If you heat ice, it will melt` is contextually valid but not the canonical general-truth form); 3 zero/first pairs; brief Second/Third preview (no full teaching) |
| mistakes | errors wall, error detective | six common errors as corrections + 6-item detective set (interactive) |
| dialogue | dialogue | "Healthy Habits" — Adam & Sara, 8 turns + 4-row function analysis + 4-item mission (interactive) |
| reading | text, questions, hunt | "The Science Club Experiment" (10 paragraphs) + full Arabic translation; 7 Q&A with hidden models; 5-form hunt (interactive) |
| practice | 5 sets | complete 10, choose 6, classify 6, correct 8, translate 8, detective 6, dialogue 4 = **48 graded items** |
| writing | writing, speaking | "My Everyday Habits and General Facts" 10–12 sentences (3 habits, 3 science facts, 2 health, 2 study, ≥1 negative) + live quota checker + labelled model; 2-minute speaking "What Happens If…?" with 5 situations and 8 starters |
| review | golden review | smart summary table (7 rows) + five core sentences + 11-point summary + self-check |
| final-test | final test | **25 questions: 10 MCQ + 5 completion + 5 correction + 5 translation** (last assessed station) |
| teacher | teacher area | gated behind a submitted result + password |
| progress | dashboard, lesson progress, next lesson | real progress only; Lesson 52 (FIRST CONDITIONAL) roadmap; 51/120 = 42.5% |

All source points are covered: IF = condition→result framing, definition + five uses, the core rule with all pronouns and S/ES alerts, scientific/natural facts with the **standard atmospheric pressure** caveat, general rules/results, habits, negatives (condition/result/both; V1 after DOESN'T), both question forms, IF-first vs result-first with the comma rule, IF vs WHEN focus difference, modals in the result (with the "modals don't automatically make it zero-conditional" warning), zero-vs-first with the dual-correction policy on `If you heat ice, it melts / it will melt`, brief Second/Third comparison, six common errors, full dialogue + analysis, full reading + translation + 7 Q&A, five practice sets (38 items) + two application sets (10 items), writing model presented as a model only, speaking task without fake voice assessment.

## Answer-key protection and grading

- `testData51.ts` contains prompts only (no answers, no `modelAnswer`). Solutions live in `testKey51.ts`, which is imported **only inside `submit()`** (dynamic import with a validated `?retry` fallback on chunk failure). No reveal-answers control, no key in `window`/DOM before submission.
- Single submission: a ref + state guard blocks duplicates; inputs lock after submit; "محاولة جديدة" resets locally and clears stored answers.
- Grading is meaning-aware: `normalizeEnglish51` (NFKC, lowercase, unified apostrophes, punctuation strip, whitespace collapse — never reorders or drops negation) plus regex alternates for `don't/do not`, `doesn't/does not`, accepted synonyms (`turns into/turns to/becomes`, `get/receive`, `run out of/run out`), and the q18 dual correction (`it melts` / `it will melt`). Ungrammatical variants (`doesn't gets`, `If water freeze`, `battery run out`, `he eat`) are rejected even when they share words with the model.
- Teacher guide (`TeacherGuide51.tsx`) derives everything from the submitted `result.solutions`; it never imports `TEST_SOLUTIONS_51`. Teacher space is password-gated and the guide chunk loads only after the password.

## Verified by real runs

| Command | Result |
|---|---|
| `npm run build` | passes |
| `npx tsc --noEmit --strict … src/lessons/lesson51/*` | 0 diagnostics |
| `npm run audit:lesson51` | 667 assertions, 0 failures (shape, 24 axes, grading accept/reject incl. blank + case + alternatives, jsdom slide walk with `auditRenderedStudentCopy` per slide, retry harness, double-submit guard, password, guide retry) |
| `npm run audit:lesson51-browser` | 699 assertions, 0 failures (Chromium: every slide at 1280/768/375/320 — no overflow, no lock/nav overlap, controls hittable, RTL preserved; fonts `Deck51Arabic`+`Deck51Latin` local; no key/guide request before submit; 3 real failed key requests → retryable error → 25/25 with accepted alternatives; retake re-locks teacher; meaning-changing/ungrammatical answers graded 23/25 with corrections; progress 51/120 · 42.5% · 69; roadmap Lesson 52) |
| `node scripts/audit-final-test.mjs` | Lesson 51 dedicated block passes; only the 5 pre-existing L35 failures remain (same on clean `main`) |
| `npm run audit:lesson-navigation` | 232 passed, 0 failed (51-lesson windows incl. `42–51`, route 51 renders `data-lesson="51"` + "ZERO CONDITIONAL") |

## Security proof (from `audit:lesson51-browser`)

- Answering all 25 questions issues **no** request for `testKey51` or `TeacherGuide51` scripts (instrumented `page.on("request")`).
- Three deliberately aborted `testKey51` chunk requests surface `[data-test-error]` with no score and preserved answers (q25 checked); rapid double-submit after recovery adds exactly one fresh request.
- First key fetch happens only after the first Submit click; before that the key never enters the bundle graph as a static import (`import("./testKey51")` inside `submit()` only).
- Teacher slide shows `[data-teacher-waiting]` with no password field before submission; wrong password is rejected; the guide chunk fetches only after `somer173` and contains 25 `[data-teacher-q]` entries.
