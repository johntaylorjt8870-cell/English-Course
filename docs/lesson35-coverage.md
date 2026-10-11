# Lesson 35 — Future Lab source-coverage ledger

**Status:** implemented and verified. The complete source-order ledger preceded the lesson implementation; final coverage and interaction checks are recorded below.

**Authoritative source:** the complete user-provided “Lesson 35: BE GOING TO — Future Plans, Intentions & Predictions” in the task conversation. Source order is retained: unnumbered cover/introduction, then numbered sections 1–38. Markdown divider bars are presentation separators only. Table-shaped material in sections 4 and 24 will be rendered as semantic tables.

**Implementation contract:** `src/lessons/lesson35/ledger35.ts` stores the verbatim source units; `src/lessons/lesson35/data.ts` maps each ledger id to exactly one native student step, in order; `Steps35.tsx` presents the step and its activity; exercises reveal their source answer keys only after learner action. Additions authored to explain source keys are labeled as platform/teacher explanations. Test answers are teacher-authored because the supplied section 35 contains a heading and “عرض الحلول التفصيلية” but no actual detailed answers.

| Source location | Ledger id | Planned exact implementation location | Coverage notes |
|---|---|---|---|
| Title, subtitle, level, Lesson 34 bridge, five WILL uses, reason for adding BE GOING TO | `cover` | `ledger35.ts` → `cover`; `data.ts` → `cover`; `Steps35.tsx` → Future Lab opening | Keep complete introduction and the five prior-lesson uses. |
| §1 Learning objectives | `s1` | `ledger35.ts` → `s1`; `Steps35.tsx` → objective map | All ten objectives. |
| §2 Meaning / programming intention / question and answer | `s2` | `Steps35.tsx` → meaning discovery | Exact sentence, translation, explanation, and initial-intention insight. |
| §3 Core construction and grammatical-role analysis | `s3` | `Steps35.tsx` → progressive formula + inspectable role annotations | Keep all four role definitions and both additional examples. |
| §4 am / is / are table and all seven subject examples; unchanged V1 | `s4` | `Steps35.tsx` → auxiliary selector + semantic table | All seven rows and all seven source examples. |
| §5 V1 golden rule, six correct forms, four errors, dictionary sentence, V2/V3 explanation | `s5` | `Steps35.tsx` → V1 contrast panel | Full correct/incorrect list and explanation. |
| §6 Affirmative formula and five examples with Arabic translations | `s6` | `Steps35.tsx` → sentence builder + source example bank | Builder is a real keyboard-operable form; all five supplied examples remain visible. |
| §7 Six contractions, four examples, informal *gonna* note and formal-writing/test warning | `s7` | `Steps35.tsx` → contraction studio | Standard spelling warning remains explicit. |
| §8 Prior plans, Layla scenario and four translated examples | `s8` | `Steps35.tsx` → intention timeline | The earlier decision/history is shown before the speaking moment. |
| §9 No 100% guarantee; example; intention ≠ guarantee; no minute-by-minute detail required | `s9` | `Steps35.tsx` → plan-certainty checkpoint | Preserve both qualifications. |
| §10 Complete Weekend Plans dialogue, Arabic translation and four grammar-analysis points | `s10` | `Steps35.tsx` → conversation studio | Full dialogue retained; reveal control may progressively reveal lines without deleting access to the complete transcript. |
| §11 Evidence-based prediction explanation, dark clouds and running child examples | `s11` | `Steps35.tsx` → evidence lab | Show “present evidence → reasonable future prediction”; do not claim exclusivity. |
| §12 Four evidence examples and shared inference | `s12` | `Steps35.tsx` → visual evidence cards | Glass, storm, team, door: every English sentence and Arabic translation. |
| §13 WILL prediction vs evidence emphasis and overlap caveat | `s13` | `Steps35.tsx` → side-by-side nuance panel | Preserve the explicit warning that evidence does not prohibit WILL and forms can overlap. |
| §14 Negative formula, four examples/translations, contractions, I-form, final example | `s14` | `Steps35.tsx` → control room / negative transformation | All examples and translations. |
| §15 Three common negative errors/corrections and rule | `s15` | `Steps35.tsx` → error contrast | Keep DO/DOES warning and the supplied basic negation caveat. |
| §16 Yes/No question formula and four examples/translations | `s16` | `Steps35.tsx` → question inversion interaction | Preserve formula and every example. |
| §17 Three answer pairs, agreement note, WILL short-answer warning | `s17` | `Steps35.tsx` → short-answer matcher | Pair each prompt and answer; keep the warning. |
| §18 WILL vs GOING TO questions, both examples and context note | `s18` | `Steps35.tsx` → question-intent comparison | Neither grammatical question is labeled universally wrong. |
| §19 WH formula and six questions/translations | `s19` | `Steps35.tsx` → WH question builder/reference | All six forms retained. |
| §20 WHO as subject vs object; both questions and explanations | `s20` | `Steps35.tsx` → revealable WHO comparison | Make subject/object roles explicit. |
| §21 Nine time expressions with Arabic meanings, three example translations, non-compulsion warning | `s21` | `Steps35.tsx` → time-expression table | Keep tomorrow/tonight/next week/next month/next summer/this weekend/in two days/soon/in the future. |
| §22 GOING TO + BE, four examples/translations and V1 correction | `s22` | `Steps35.tsx` → be-inspection panel | Preserve all four forms and the incorrect/correct pair. |
| §23 There is/There are future forms, four examples/translations, curriculum-link note | `s23` | `Steps35.tsx` → existence comparison | Preserve singular/plural positive, negative and question forms. |
| §24 WILL vs BE GOING TO comparison table, six typical meanings and non-absolute rule | `s24` | `Steps35.tsx` → semantic comparison table | Every row preserved; typical uses, not mutually exclusive boundaries. |
| §25 Two complete bakery scenarios and decision-timing explanation | `s25` | `Steps35.tsx` → decision-history simulator | Both original contexts and translations are shown. |
| §26 Cars opinion and tilted-cup evidence scenarios | `s26` | `Steps35.tsx` → prediction simulator | Both English examples, translations and reasons. |
| §27 Motion “going to the library” vs future “going to read”; park examples and context qualification | `s27` | `Steps35.tsx` → construction-or-motion sort | All four English/Arabic examples and final caveat retained. |
| §28 Eight Grammar Detective errors and eight supplied corrections | `s28` | `Steps35.tsx` → itemized correction lab; `TeacherArea35.tsx` → worked answers | Learner submits each correction before source correction appears. Teacher reasoning is labeled authored. |
| §29 Eight AM / IS / ARE blanks and complete supplied key | `s29` | `Steps35.tsx` → auxiliary drill; `TeacherArea35.tsx` → key | All eight items; answers gated until check. |
| §30 Six GOING TO transformations and complete supplied key | `s30` | `Steps35.tsx` → transformation lab; `TeacherArea35.tsx` → key | Preserve exact supplied target strings; answers gated until check. |
| §31 Eight WILL / GOING TO situations, all eight keys and the supplied detailed explanations | `s31` | `Steps35.tsx` → decision simulator / practice; `TeacherArea35.tsx` → keyed explanations | Preserve each scenario, answer, and original reason. Allow nuance only where the source says forms overlap. |
| §32 School festival: all three WILL/BE GOING TO examples, acceptability and five reasoning questions | `s32` | `Steps35.tsx` → both-forms decision panel | Preserve examples and questions; explicitly distinguish prediction, plan, and announcement context. |
| §33 “A Big Plan for the School”: every paragraph, all dialogue, seven comprehension Q&As and five grammar-analysis points | `s33` | `Steps35.tsx` → reading studio; `TeacherArea35.tsx` → reading key | Full passage is visible in original paragraph order; comprehension keys reveal after attempt; all analysis points kept. |
| §34 Future Plans Master Test — five levels and questions 1–25 | `s34` | `testData.ts` → 25 questions/five levels; `TestArea35.tsx` → submitted test | Exact source wording and intended meaning; submit-all behavior, no per-question correctness before submit. |
| §35 Detailed solutions heading + “عرض الحلول التفصيلية” only | `s35` | `ledger35.ts` → source units; `Solutions35`/`TeacherArea35.tsx` → clearly labeled teacher-authored solutions | Source does not contain the promised answer content. Do not represent authored solutions as verbatim source. |
| §36 Final Boss writing task, all eight enumerated requirements, 12–15 target and complete model paragraph/caution | `s36` | `Steps35.tsx` → writing workspace/checklist | Student composes their own paragraph; model remains a model, not auto-filled work. |
| §37 Complete Golden Summary: formulas, all examples/translations, two uses, four WILL/GOING TO comparison examples and nuance | `s37` | `Steps35.tsx` → golden reference | Every supplied summary line and example is present. |
| §38 Complete curriculum map, Lesson 36 connection, later Future tenses, and final key insight | `s38` | `Steps35.tsx` → curriculum map/closing | Preserve all present/past/future list items and Lesson 36 description; end on meaning/context insight. |

## Final source audit record

- Source sections expected: **39** (cover + numbered sections 1–38).
- Native steps expected: **39**, one-to-one and source ordered.
- Complete supplied exercises: Grammar Detective 8; AM/IS/ARE 8; transformations 6; WILL vs BE GOING TO 8.
- Test expected: **25 questions across exactly five levels**.
- Test solution source status: the supplied §35 contains no answer list or explanations. The final answer key and explanations are teacher-authored from §34 questions and the supplied grammar rules, and must be labeled accordingly.
- Unresolved source ambiguity expected: none beyond the §35 missing answer text, which is an explicit omission rather than a reason to infer source wording.

| Verification | Result |
|---|---|
| Ledger sections mapped exactly once | Pass — 39 source entries map to 39 native lesson steps in order |
| All source units render to student/teacher/test surfaces | Pass — all source units checked across step panels, the 25-question test, solution notes and teacher source ledger |
| Exercise prompts/keys preserved and feedback gated | Pass — learner feedback is action-gated; teacher source keys stay behind the teacher gate |
| Test has 25 questions and five levels | Pass — five levels, 25 items; written responses remain for human review |
| RTL/LTR and route/interactions | Pass — native navigation, keyboard-operable controls, hash route, isolated LTR English, and shared FinalTest verified |
| `npm run audit:lesson35` | Pass — 229 assertions |
| Requested repository checks | Pass — production build, English-direction check, Lesson 35 navigation audit, full English-direction audit, and `git diff --check` |
