# Lesson 40 — source audit and accuracy notes

## Source-of-truth and preservation

The complete supplied lesson is stored in `src/lessons/lesson40/ledger40.ts` (opening + sections 1–29), with original source answer units (`revealUnits`) separated for §§17, 19, 20, 21 and 23. The original ledger is not changed by this rebuild. The eager student bundle reads the mechanically audited `studentLedger40.ts` projection instead: it matches the canonical ledger except that §26 is limited to its two student-facing introduction units. The complete §26 source is imported only by deferred solution/teacher surfaces; the production entry-bundle audit confirms a representative final-test answer literal is absent from the initial entry. `docs/lesson40-coverage.md` maps every source unit to a lesson step or its dedicated Test/Teacher surface. The automated `npm run audit:lesson40` verifies source order, projection parity, one-time unit coverage, question inventory, and per-step rendered source markers; `node scripts/audit-lesson40-build.mjs` checks the emitted production bundle.

Formatting-only reconstruction: the Golden Table (§3), Adam comparison (§9), and WRITE formation table (§15) are represented as structured rows because the supplied text lost its column boundaries. Their wording and five-form distinction are retained. No substantive source claim was silently rewritten.

## Section-by-section audit

| Source | Audit result |
|---|---|
| Opening + §1 | Complete title/level/course bridge and all ten objectives. The source describes six learning stations across Lessons 34–39, but five principal forms; Lesson 36 is the WILL vs BE GOING TO comparison, not a sixth form. |
| §§2–5 | Six decision questions, all source examples/translations, five-form comparison, five study perspectives, four WILL/GOING TO situations, and the real-world overlap caution retained. |
| §§6–10 | Online-lesson availability scenario; deadline/result examples; Sara's four-hour training; Adam's three-way focus; explicit warning that Future Perfect Continuous alone does not prove activity stops or stays unfinished. |
| §§11–15 | All time markers and valid alternatives; temporal clauses with the six listed conjunctions; WHEN vs BY THE TIME; FOR vs SINCE and stative KNOW; all five WRITE formulas, five wrong forms and five corrections. |
| §§16–18 | Full Science Competition and Family Trip source dialogue text, the full source translations/grammatical explanations that appear in the ledger, the six Family Trip answer units, and all five scenario choices. The interface adds separate Arabic dialogue translations from lesson platform data; these are additional support, not a replacement for source wording. |
| §§19–24 | All 6 multiple choice, 8 fill-ins, 10 error-detection prompts, explanations/answer units, both multiple-answer examples, complete learning-centre reading and its 8 question/answer pairs, and all six reading tense-analysis items are preserved. Exercise answers mount only after a written attempt. |
| §§25–26 | Assessment source has 65 units and exactly 25 questions in five levels of five. Test data contains the question text only. Teacher source §26 has 64 units and 25 answer/solution entries; it is rendered only in the solution/teacher surfaces. |
| §§27–29 | Full Writing Mission (15–18 sentences, ten requirements, six-sentence guided opening), five-form Golden Summary, present/past/future milestones, and complete Lesson 41 preview preserved. |

## Grammar accuracy controls carried through

- WILL: spontaneous decisions, offers, promises, and predictions; its function depends on context.
- BE GOING TO: prior plans/intentions and evidence-based predictions; do not treat the distinction from WILL as an absolute boundary.
- Future Continuous = `will be + V-ing`, activity in progress at a future reference time.
- Future Perfect = `will have + V3`, completed result by a future point.
- Future Perfect Continuous = `will have been + V-ing`, duration/continuity to a future point; it does not itself entail that the activity remains unfinished or ends.
- Contexts can admit Future Perfect and Future Perfect Continuous with different emphasis. Time markers are clues rather than mechanical tense triggers.
- `for` is a duration; `since` marks a starting point. Stative `know` (knowledge meaning) is not normally continuous.
- Future temporal clauses after `when`, `before`, `after`, `as soon as`, `until`, and `by the time` normally use Present Simple; a direct question such as “When will you arrive?” is different.
- Test teacher notes list accepted alternatives; conceptual questions are marked for teacher/self review, not brittle keyword-based grading.

## Current routing and provenance

The source preview of Lesson 41 remains unchanged. The current repository has a real Lesson 41 implementation and the established route `#/lesson/41`; the Lesson 40 final step links to that route. No Lesson 41 teaching details were invented beyond the provided preview.

An Arabic translation for each dialogue turn is platform-authored support, not source text. Final-test explanation expansions and alternative answer lists are platform-authored and labelled as such in the solution materials. The client-side teacher password and dynamic chunks provide UI/module separation only; this static application has no server authorization boundary.
