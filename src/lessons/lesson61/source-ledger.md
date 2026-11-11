# Lesson 61 — Source Ledger

**Source status: supplied and independently reviewed.** The complete user attachment is preserved byte-for-byte at `docs/lesson61-source.md` (SHA-256 `456d20ff43b48178435b07bfb01c70553a2b9d3c887d51378418bcbbe316bff8`). The item-level original/initial/final ledger, including explanations and documented corrections, is `docs/lesson61-content-review.md`. `node scripts/audit-lesson61-source.mjs` compares the source itself, not an implementation-generated snapshot; `scripts/fixtures/lesson61-content-snapshot.json` remains a separate drift check.

## Section map

| Section | Verified coverage | Application scene IDs / data |
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
| 9 | All 8 worked examples, their source concept labels and Arabic translations | `solved`, `SOLVED_61` |
| 10 | Full direct dialogue, translation, reported retelling, translation and 6 notes | `dialogue`, `dialogue-reported`, `DIALOGUE_61`; `conversation` adds practice |
| 11 | Full bilingual reading and all 7 bilingual questions and answers | `reading`, `comprehension`, `READING_61` |
| 12 | All 8 original practice sets and explanations | `practice-1` through `practice-8`, `PRACTICES_61` |
| 13 | Full original 25-question test, key and 25 explanations | `original-1` through `original-5`, `original-key`, `ORIGINAL_TEST_61` |
| 14 | Writing instructions, 7 requirements, full model and translation | `writing`, `WRITING_61` |
| 15 | Speaking instructions, 5 bilingual questions and 3 examples | `speaking`, `SPEAKING_61` |
| 16 | All 8 final summary structures and examples, plus 9 distinctions | `summary`, `SUMMARY_61`, `SUMMARY_DISTINCTIONS_61` |

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
| 40 | Eight summary structures and nine distinctions | `summary`; `SUMMARY_61`, `SUMMARY_DISTINCTIONS_61` |

## Verified inventory and interaction

- The source has 16 sections. The 8 exercise groups contain 6, 6, 6, 6, 8, 8, 8 and 1 complete paragraph: 49 source tasks, with 7 parts inside the final paragraph. The original 25 questions, answers and explanations remain separate from the shared 15-question FinalTest.
- The paragraph retains the full six-part bilingual source model. The learner writes one paragraph and confirms its 7 parts before viewing the model; this is self-review, not automatic semantic grading. Other exercise solutions wait until the whole group has been attempted. The source-exam key waits for all 25 attempts; the shared FinalTest remains gated until submission.
- The source's teacher `he` example remains visible, with neutral `they` and explicit context. The dialogue preserves the original `the students` / `them` model and explains the conditional Adam-only `him` alternative. Contextual corrections, accepted alternatives and exact previous wording are documented in the detailed review.
- The original teacher password and presentation-only gate remain unchanged. The 10 interactive labs and 38 cases, lesson memory and navigation remain in place. Western digits are used in the interface; the byte-identical source document retains its original circled numerals.
