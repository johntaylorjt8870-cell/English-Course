# Lesson 61 — Source Ledger

**Source status: unavailable.** No independent original Lesson 61 text or attachment was found in the current workspace. This ledger maps only the current implementation to intended topics; it does not prove that a source item exists, was preserved, or was corrected. Every section, example, translation, practice, original-test question, key, explanation, and correction below remains **unverified against the original**. The fixture `scripts/fixtures/lesson61-content-snapshot.json` was generated from the implementation; it detects later drift but is not independent source evidence. An authoritative original file is required for a line-by-line comparison and an independent coverage ledger. This document is not student-facing copy.

## Section map

| Section | Intended coverage (pending verification) | Application scene IDs / data |
|---|---|---|
| Opening | Lesson 60 bridge, direct/reported statement and central word-order idea | `bridge`, `content61.ts:THEORY_61` |
| 1 | Yes/No definition, linking, be, do/does/did, perfect, modals, if/whether | `yes-intro`, `yes-rule`, `yes-be`, `yes-do`, `yes-perfect`, `yes-modals`, `if-whether` |
| 2 | WH words, declarative order, where/when/why, what/which/whose, how forms, WH as subject | `wh-intro`, `wh-order`, `wh-where`, `wh-what`, `wh-how`, `wh-subject` |
| 3 | Commands, told, ordered, instructed, negative commands, warned and advised | `command`, `ordered-instructed`, `negative-command`, `warning-advice` |
| 4 | Requests, intent and negative requests | `request`, `negative-request` |
| 5 | Suggestions, both structures and suggest/advise contrast | `suggestions` |
| 6 | Say, tell, ask and the five comparison examples | `say-tell-ask` |
| 7 | Seven important checks including end punctuation | `errors`, `ERRORS_61`, `error-detective` |
| 8 | Four current conversion routes, steps and results | `procedures`, `PROCEDURES_61` |
| 9 | All 8 worked examples and Arabic translations | `solved`, `SOLVED_61` |
| 10 | Full direct dialogue, translation, reported retelling, translation and 6 notes | `dialogue`, `dialogue-reported`, `DIALOGUE_61`; `conversation` adds practice |
| 11 | Full bilingual reading and all 7 bilingual questions and answers | `reading`, `comprehension`, `READING_61` |
| 12 | All 8 original practice sets and explanations | `practice-1` through `practice-8`, `PRACTICES_61` |
| 13 | Full original 25-question test, key and 25 explanations | `original-1` through `original-5`, `original-key`, `ORIGINAL_TEST_61` |
| 14 | Writing instructions, 7 requirements, full model and translation | `writing`, `WRITING_61` |
| 15 | Speaking instructions, 5 bilingual questions and 3 examples | `speaking`, `SPEAKING_61` |
| 16 | All 9 final summary rules, examples and distinction list | `summary`, `SUMMARY_61` |

## Forty requested trace points

| Item | Topic | Visible location and data |
|---|---|---|
| 1 | Reported Yes/No Questions | `yes-intro`; `THEORY_61` |
| 2 | if/whether and basic rule | `yes-rule`, `if-whether`; `THEORY_61` |
| 3 | be questions | `yes-be`; `THEORY_61` |
| 4 | Do/Does/Did questions | `yes-do`; `THEORY_61` |
| 5 | Have/Has questions | `yes-perfect`; `THEORY_61` |
| 6 | Can/Will/May questions | `yes-modals`; `THEORY_61` |
| 7 | If vs Whether | `if-whether`; `THEORY_61` |
| 8 | Reported WH-Questions | `wh-intro`, `wh-order`; `THEORY_61` |
| 9 | WH tools and translations | `wh-intro`; `THEORY_61` |
| 10 | Statement word order | `wh-order`, `order-detector`; `THEORY_61`, `LABS_61` |
| 11 | Where/When/Why | `wh-where`; `THEORY_61` |
| 12 | What/Which/Whose | `wh-what`; `THEORY_61` |
| 13 | How combinations | `wh-how`; `THEORY_61` |
| 14 | WH-word as subject | `wh-subject`, `wh-rebuilder`; `THEORY_61`, `LABS_61` |
| 15 | Commands and instructions | `command`, `ordered-instructed`; `THEORY_61` |
| 16 | told + object + to | `command`, `command-studio`; `THEORY_61`, `LABS_61` |
| 17 | ordered | `ordered-instructed`, `command-studio` |
| 18 | instructed | `ordered-instructed`, `command-studio` |
| 19 | Negative commands | `negative-command`, `negative-lab` |
| 20 | warned | `warning-advice`, `negative-lab`, `advice-suggestion` |
| 21 | advised | `warning-advice`, `advice-suggestion` |
| 22 | Reported requests | `request`, `intent-detector` |
| 23 | asked + object + to | `request`, `intent-detector` |
| 24 | Negative requests | `negative-request` |
| 25 | Reported suggestions | `suggestions`, `advice-suggestion` |
| 26 | suggested + verb-ing | `suggestions`, `advice-suggestion` |
| 27 | suggested that + subject + (should) | `suggestions`, `advice-suggestion` |
| 28 | suggest vs advise | `suggestions`, `advice-suggestion` |
| 29 | Say/Ask/Tell | `say-tell-ask`, `verb-control` |
| 30 | Seven important rules | `errors`, `error-detective`; `ERRORS_61` |
| 31 | Four conversion routes and their internal steps | `procedures`; `PROCEDURES_61` |
| 32 | Eight comprehensive worked examples | `solved`; `SOLVED_61` |
| 33 | Complete dialogue, Arabic, retelling and notes | `dialogue`, `dialogue-reported`; `DIALOGUE_61` |
| 34 | A School Visit and translation | `reading`; `READING_61.paragraphs` |
| 35 | Seven comprehension questions and answers | `comprehension`; `READING_61.questions` |
| 36 | All 8 practice groups, questions, solutions and explanations | `practice-1` through `practice-8`; `PRACTICES_61` |
| 37 | Original 25 questions, keys and explanations | `original-1` through `original-5`, `original-key`; `ORIGINAL_TEST_61` |
| 38 | Writing task and bilingual model | `writing`; `WRITING_61` |
| 39 | Speaking task and examples | `speaking`; `SPEAKING_61` |
| 40 | Nine summary rules | `summary`; `SUMMARY_61` |

## Measurable inventory and interaction

- 61 navigable scenes are generated from the material, including a cover and map, 22 theory scenes, 10 original labs, 8 practice scenes, 5 original-test scenes, the original key, shared FinalTest, tasks, teacher area and conclusion.
- Theory contains 56 direct/reported pairs and 34 bilingual standalone lines; the 8 comprehensive solved examples are additional. The dialogue has 9 bilingual direct turns and 9 bilingual reported entries; the reading has 7 bilingual paragraphs and 7 bilingual questions/answers.
- Practice groups contain 6, 6, 6, 6, 8, 8, 8 and 7 independently attempted items: 55 total. The eighth group also contains a paragraph and a 6-line bilingual model. Whether these are complete and faithful to the original is unverified.
- The implemented purported original test has 25 consecutively numbered entries in 5 groups of 5. Each object carries its own local answer and explanation, preventing a separate key from shifting; their correspondence to the source is unverified. The student key is gated per attempted item; the teacher key is behind the unchanged presentation gate.
- The separate shared `FinalTest` bank has 15 questions; the same bank is passed to `FinalTestAnswerKey`. It stays mounted while switching scenes so answers and submission status persist. Lesson-scoped memory also preserves practice, lab, writing and speaking progress when navigating.
- Labs: `yes-converter`, `wh-rebuilder`, `order-detector`, `command-studio`, `negative-lab`, `intent-detector`, `advice-suggestion`, `verb-control`, `conversation`, `error-detective`. Each requires choices and written input, gates feedback until checking, explains, permits retry and shows checked-case progress.

## Proposed source corrections and contextual decisions (pending comparison)

The following describe local implementation decisions only. Whether any differs from, preserves, or corrects the original must be determined after the original is supplied.

1. **Dialogue addressee:** the current direct dialogue addresses Adam. Its local retelling uses “The teacher also told him not to make any noise while his classmates were working”; the Arabic retelling and sixth dialogue note likewise refer to Adam. The corresponding original wording and any proposed correction remain unverified.
2. **Ability versus request:** the current dialogue uses “Can you show us your pictures?” and renders an ability reading as “asked him if he could show them his pictures.” A note gives “asked him to show them his pictures” when context instead indicates a request.
3. **Two grammatical options:** local practice 5 question 4 and the purported original test question 24 offer `not to` and `to not`. The local primary key selects `not to`; both grammatical forms are accepted. The original choices and key must still be compared directly.
4. **Practice 6 question 7:** the local primary answer uses “to get”; “to take” is also accepted and explained. Its relation to the original remains unverified.
5. **Practice 2 question 6:** the local prompt uses “The man,” the local primary answer uses “He,” and the explicit “The man asked me …” alternative is also accepted. Source wording remains unverified.
6. **Context-dependent references:** the local examples use `there`, `that`, `the following day` and pronoun changes, with a note that speaker, addressee, time and place determine the reference. Matching treats `if` and `whether` as equivalent only after a reporting `asked`, not in the conditional instruction in practice 8.
7. **Question mark rule:** the lesson explains the full stop for complete declarative reports and notes that a genuinely interrogative main clause may end in a question mark. The seventh detective case asks for punctuation. The original rule and example remain unverified.
8. **Optional reporting verbs:** local examples include `ordered` for a firm instruction and `warned` for a presumed warning. `told` is also accepted where the bare wording does not imply firmness or danger.
9. **Practice 8 conditional:** the local paragraph includes “If you have a question, ask me.” Its `if` is conditional, not a Yes/No reporting linker; the local model reports the instruction as “told them to ask him if they had a question.”
10. **Optional backshift in current multiple-choice items:** practice 5 question 2 retains its local `A. was` key and now also accepts `B. am` when readiness remains current; purported original question 22 retains `B. had` and also accepts `A. have` when the result remains current. Both explanations were clarified; prompts and primary keys were not changed. These are local scientific/contextual corrections, not claims about the unavailable source. The implementation snapshot was changed only for these two entries; see `docs/lesson61-evidence/lesson61/snapshot-backshift-review.diff`.
11. **Shared-test question 4:** its instruction now explicitly requests the ordinary basic form and usual backshift, so the key `played` is not presented as proof that emphatic `did play` is always ungrammatical. The shared 15-question bank is separate from the purported original test.
12. **Interactive and teacher consistency:** the command lab now explains that `that` versus `this` depends on the reporting context, matching its accepted alternatives. The teacher area shows all locally accepted practice and original-test alternatives; this does not change the existing password or establish source fidelity.
