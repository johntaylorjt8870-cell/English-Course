# Lesson 58 — Source Ledger and Coverage Audit

Reference: the complete lesson text supplied in the implementation request. Source fidelity is organized as the same 21 numbered instructional units; interactive stations are additions, not replacements.

| # | Required source section | In-app location | Coverage |
|---:|---|---|---|
| 1 | Quick recap: `Object + be + V3`, what changes, room example and Arabic translation | Source station “١ · تذكير سريع…” (`s1`) | Full rule, explanation, bilingual example |
| 2 | Present Simple Passive | `s2` | Use cases; full agreement table; 4 active/passive pairs + translations/reasons; negative and questions |
| 3 | Past Simple Passive | `s3` | Use; was/were agreement; 4 pairs; negative/questions; is/was contrast |
| 4 | Future Simple Passive | `s4` | Formula/use; 4 pairs; negative, contraction, questions; be-after-will note |
| 5 | Present Continuous Passive | `s5` | Formula/use; 4 pairs; being explanation/contrast; negative/questions |
| 6 | Past Continuous Passive | `s6` | Formula/use; 4 pairs; simple-vs-continuous contrast; negative/questions |
| 7 | Present Perfect Passive | `s7` | Formula/use; has/have table; 4 pairs; new-subject agreement; negative/questions |
| 8 | Past Perfect Passive | `s8` | Formula/use; both pairs; negative/question |
| 9 | Core tense comparison | `s9` | All 7 comparison rows and the three road examples, translations and meanings |
| 10 | Seven Active→Passive steps and complete worked example | `s10` | All seven stages, exact worker/school demonstration, build→built warning |
| 11 | Old agent and optional by | `s11` | All 4 source examples and the three removal conditions |
| 12 | Verbs not usually passivized | `s12` | All 6 verbs, both examples/translations and direct-object explanation |
| 13 | Common errors | `s13`; interactive practice 6; Error Detective lab | All 6 listed conceptual errors and all 8 source exercise errors + corrections/reasons |
| 14 | Workshop dialogue and Q&A | `s14` | All 10 dialogue turns/translations; 5 questions and answerable solutions |
| 15 | Reading passage, translation, comprehension | `s15` | All 5 English paragraphs, all 5 Arabic paragraphs, 7 questions/answers/translations |
| 16 | Nine exercises with detailed solutions | `p1`–`p9` | 9/9 groups; 59/59 prompts and keyed answers/explanations; answers reveal after Check |
| 17 | Original 25-question final test | `s17` | 25/25 prompts, options where supplied, preserved order and source grouping |
| 18 | Original test answer key | `s18` | 25/25 answers and explanations; individually revealed after learner action |
| 19 | Writing task and model | `s19` | Full 8–10 sentence task, five ideas, all 7 model sentences and all Arabic model lines |
| 20 | Speaking task | `s20` | Full role-play instruction; all 6 prompts/translations; learner reveals translation on demand |
| 21 | Final summary | `s21` | All 7 tense formulas; 3 key reminders; all 5 source room examples/translations |

## Added learning stations

- Tense Selector Lab; transformation engine with delayed stages; Being vs Been challenge; seven-tense comparison; eight-item Error Detective; Active/Passive reverse switch that distinguishes an explicit agent from an unknown one; Final Challenge.
- The platform Final Test is the existing shared `FinalTest` component with 15 representative items. The 25 original source questions remain separately reviewable above; the non-selected original items are therefore not discarded.

## Coverage audit facts

- Source sections: **21/21** represented as learner-facing stations, separately from the opening cover and additional labs.
- Practice groups: **9/9**, total source practice questions **59**.
- Original test: **25/25** prompts; **25/25** keyed answers and explanations.
- Shared final quiz: **15** questions; **0** immediate per-selection correctness feedback by shared component contract.
- Dialogue: **10** turns, **5** comprehension questions. Reading: **5** paragraphs in English and Arabic, **7** comprehension questions.
- V3 forms explicitly audited: build/built, write/written, steal/stolen, send/sent, make/made, speak/spoken, break/broken, complete/completed, repair/repaired.

## Source notes / divergences

- No grammar-rule expansion beyond the seven source tenses.
- Section numbering keeps the user-provided sequence. An extra shared 15-question Final Test slide and seven additional labs are added without replacing source sections.
- Source English examples and Arabic translations are carried in the content module and rendered within isolated LTR wrappers; Arabic explanation remains RTL.
- The reverse-conversion exercise's proposed `Someone` is explicitly labeled as a possible inferred subject, not established fact, matching the source caveat.
- The source's two near-identical reader-facing error sets are kept in their respective sections: the six conceptual errors and all eight exercise-six sentences.
- The attached source's use of «تم الإعلان»/equivalent passive translations is retained; no semantic change was made.
