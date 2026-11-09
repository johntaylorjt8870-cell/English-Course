# Lesson 60 — Source Ledger

**Lesson:** Reported Speech — Statements · الكلام المنقول — الجمل الخبرية
**Source:** the lesson text supplied with the task (seventeen sections + 39 numbered topics +
8 exercise sets + original 25-question test with key + writing/speaking tasks + final summary +
quick comprehension check).
**Purpose of this file:** prove that every section, topic, example, table and exercise of the
source is actually *rendered* in the application, and record every place where the source itself
was inconsistent and how it was fixed. It is a provenance document, never student-facing copy.

Student screens never say «المصدر» or «§N»; the section and topic numbers below exist only here.
(The task brief asked for a `docs/lesson60-source.md` plan file; the fidelity plan was authored
directly into the typed modules, so this ledger carries its provenance role instead — recorded as
a deliberate deviation, mirroring how lesson 59 ships a single ledger.)

---

## 1. Section-by-section coverage

| Source part | Content | Where it renders |
|---|---|---|
| Opening | Bridge from previous lessons, daily-life framing, seven goals ①–⑦ | Step 1 (`s1` → `Section1`, `OPENING60`) |
| §1 · topic 1 | Direct Speech definition, quotation marks, 3 examples with echoes | Step 1 (`s1`, `DIRECT_60`, 3 `Bubble60` direct) |
| §1 · topic 2 | Reported Speech definition, 3 direct/reported pairs with change chips, quick comparison, Arabic-translation caution | Step 2 (`s2` → `Section2`, `REPORTED_60`) |
| §2 · topic 3 | `said` rule + structure `Subject + said + (that)`, 4 pairs, *that* is optional note (`Ali said he was busy.`) | Step 3 (`s3` → `Section3`, `SAID_60`) |
| §2 · topic 4 | `told` rule + structure `told + Person + (that)`, 4 pairs, said✓/told✓ vs «said me»/«told that» contrast, comparison rows, memory trick | Step 4 (`s4` → `Section4`, `TOLD_60`) |
| §3 · topic 5 | Backshift idea — why tense moves one step back, worked `am → was` example, caution that it is not absolute | Step 5 (`s5` → `Section5`, `BACKSHIFT_INTRO_60`) |
| §3 · topic 6 | Present Simple → Past Simple (`am/is→was`, `are→were`, `V1→V2`) with examples | Step 6 (`s6` → `TenseSlide`, `TENSE_LESSONS_60[0]`) |
| §3 · topic 7 | Present Continuous → Past Continuous | Step 7 (`s7`, `TENSE_LESSONS_60[1]`) |
| §3 · topic 8 | Present Perfect → Past Perfect | Step 8 (`s8`, `TENSE_LESSONS_60[2]`) |
| §3 · topic 9 | Past Simple → Past Perfect | Step 9 (`s9`, `TENSE_LESSONS_60[3]`) |
| §3 · topic 10 | Past Continuous → Past Perfect Continuous | Step 10 (`s10`, `TENSE_LESSONS_60[4]`) |
| §3 · topic 11 | Future Simple `will → would`, incl. `you → me` and `tomorrow → the following day` | Step 11 (`s11`, `TENSE_LESSONS_60[5]`) |
| §3 · topic 12 | Comprehensive Backshift table (12 rows incl. "Past Perfect stays"), 13-item shorthand, **must warning**: obligation → `had to` ↔ deduction stays | Step 12 (`s12` → `Section12`, `BACKSHIFT_TABLE_60`) |
| §4 · topic 13 | Why pronouns change, anchor example, 8-row mapping table (with «بحسب السياق»), context warning, 5 contextual examples incl. `You → I` and `You → he` | Step 13 (`s13` → `Section13`, `PRONOUNS_60`) |
| §5 · topic 14 | Tomorrow-scenario, 13 time rows, 4 time examples, 5 place/movement rows (`come→go`, `bring→take`), 3 place examples, non-algorithmic note | Step 14 (`s14` → `Section14`, `TIME_PLACE_60`) |
| §6 · topic 15 | 10-row modal table (`shall → should/would`; five modals stay), 5 examples incl. `You → we` and kept `should/could` | Step 15 (`s15` → `Section15`, `MODALS_60`) |
| §7 · topic 16 | General facts / scientific truths keep present tense (Earth revolves; water boils; plants need sunlight) | Step 16 (`s16` → `Section16`, `EXCEPTIONS_60.facts`) |
| §7 · topic 17 | Still-true speech may keep present tense (lives/works in Ankara), both options allowed, choice depends on emphasis | Step 17 (`s17` → `Section17`, `EXCEPTIONS_60.stillTrue`) |
| §7 · topic 18 | `says / tells` present reporting verb → usually no Backshift; `says … is tired` examples + contrast | Step 18 (`s18` → `Section18`, `EXCEPTIONS_60.presentVerb`) |
| §8 · topic 19 | 8-step systematic conversion + fully worked Ahmed example (6 stages) → "there that day" result | Step 19 (`s19` → `Section19`, `STEPS_60`) |
| §9 · topic 20 | Ten varied solved examples covering all six tenses, can/may/must, and a scientific truth | Step 20 (`s20` → `Section20`, `SOLVED_60`) |
| §10 · topics 21–27 | Seven common errors: pronoun, «said me», missing Backshift, double-backshifting Past Perfect, tomorrow kept, shifting a scientific fact, «told that» | Step 21 (`s21` → `Section21`, `ERRORS_60`, wrong✕→right✓→why, alt accepted forms) |
| §11 · topic 28 | `At School` dialogue — 8 turns with Arabic, 4-line reported retell, 4 comprehension Q&A | Step 22 (`s22` → `Section22`, `DIALOGUE_60` + `ReportedLines60`) |
| §12 · topic 29 | `A Conversation About a School Project` — 5 paragraphs EN + 5 AR translations, 7-word gloss, 8 comprehension Q&A | Step 23 (`s23` → `Section23`, `READING_60`) |
| §13 · topic 30 | Eight exercise sets with full instructions, all items, solutions and reasons (`Attempt60` check-then-reveal) | Steps 24–31 (`p1`…`p8` → `PracticeSet60`, `PRACTICES_60` = 59 items: 10·10·8·10·5·5·10·1) |
| §14 · topics 31–34 | Original 25-question test in four sections (اختر 1–10 · حوّل 11–15 · صحّح 16–20 · أكمل 21–25) | Step 32 (`s24` → `OriginalTestSection60`, `ORIGINAL_TEST_60`) |
| §15 · topic 35 | Full key to the original test — 25 answers with explanations (see §3 below for the numbering fix) | Step 33 (`s25` → `OriginalKeySection60`) |
| — | Shared final test, 15 questions, mixed types (single/error/match/tf/typed/order/multi), gating handled by shared component | Step 34 (`final-test` → `FinalTest lesson={60}`, `TEST_60`) |
| §16 · topic 36 | Writing task `What My Friend Told Me` — instruction, 8 ready structures, 5-paragraph model + Arabic | Step 35 (`s27` → `Section27`, `WRITING_60`) |
| §16 · topic 37 | Speaking task — prompt, 4-line model with Arabic, extra 3-person drill | Step 36 (`s28` → `Section28`, `SPEAKING_60`) |
| §17 · topic 38 | Final summary — six rule groups (distinction, said/told, tenses, pronouns, time&place, exceptions) | Step 37 (`s29` → `Section29`, `SUMMARY_60`) |
| §17 · topic 39 | Quick comprehension check — 10 questions with revealable answers | Step 38 (`s30` → `Section30`, `QUICK_CHECK_60`) |

Lesson map: 11 stations, **47 steps** in the rail (39 literal steps + the 8 generated practice
steps `p1…p8`). Nine interactive labs (`explorer`, `studio`, `timeline`, `saidtold`, `pronouns`,
`timeshift`, `detector`, `detective`, `challenges`) plus teacher area and the closing station sit
after the source sections.

Labs are not filler: each is driven by the same data the sections render
(`REPORTED_60`, `STUDIO_60`, `BACKSHIFT_TABLE_60`, `TOLD_60`, `MAPPER_60`, `TIME_PLACE_60`,
`ERRORS_60`, `CHALLENGES`), so a student who finishes the sections can verify every rule by hand —
with check-first gating identical to the written exercises.

## 2. Counts verified by `scripts/audit-lesson60.mjs`

- Practice: **8 groups / 59 items** (10 · 10 · 8 · 10 · 5 · 5 · 10 · 1)
- Original test: **25** questions in 4 sections, each with answer + explanation
- Shared final test: **15** questions (`test60.ts`; one 5-pair matching item, one typed item
  accepting `had to` variants, one ordering item, one multi-select, one true/false, one error item)
- Dialogue 8 turns / 4 questions · Reading 5+5 paragraphs / 8 questions / 7 gloss entries
- Backshift table 12 rows / 13 shorthand · Pronoun table 8 rows · Time 13 rows · Place 5 rows ·
  Modals 10 rows · Solved examples 10 · Errors 7 · Quick check 10 · Summary 6 groups
- Writing model 5 paragraphs EN/AR · Speaking model 4 lines EN/AR

## 3. Source issues found and how they were handled

1. **Answer-key heading is numbered "35" while its items start again at ①.**
   The source jumps from topic 34 (last test section) to a key headed «35» whose answers are numbered
   ①–㉕. Fix: the topic number **35 is kept** for the key (station `s25`), but the key items are
   **renumbered 1–25 to match the questions** they answer (recorded in `practice60.ts` header and
   in `ORIGINAL_TEST_SECTIONS_60`). No answer was reworded or dropped.
2. **Topics 31–34 are not literally numbered in the source.**
   The source presents the test as four titled sections without topic numbers. Fix: the UI labels
   the four blocks ٣١–٣٤ explicitly so the 39-topic numbering stays continuous (declaration lives
   in `OriginalTestSection60`; the ledger records the mapping).
3. **`must` is taught with two behaviours.**
   The source itself splits obligation (→ `had to`) from deduction (stays). The table row carries the
   «غالبًا عند التعبير عن الالتزام» caveat, and `Section12` renders both branches from
   `BACKSHIFT_TABLE_60.mustWarning` instead of stating a flat rule.
4. **Pronoun and time/place tables are taught as context-dependent, not mechanical.**
   Rows carry «بحسب السياق» / «غالبًا بحسب اتجاه النقل» notes, the source warnings render as
   `l60-warn` callouts, and the labs (`PronounMapper60`, `TimePlaceLab60`) include self-reporter
   and unchanged-context scenarios so the exception logic is exercised, not just stated.

## 4. Deliberate presentation decisions (not source changes)

- Mixed Arabic/English blocks use `unicode-bidi: plaintext` on rail labels and `LatinRuns`
  isolation elsewhere; numeric ranges (`١–٤`, `٢١–٢٧`, `٣١–٣٤`) are wrapped in `<bdi dir="ltr">`
  because the en dash is bidi-neutral and would otherwise reverse inside an Arabic paragraph.
- Change chips always carry a type label (TENSE/PRONOUN/TIME/PLACE/MODAL/VERB/FORM) plus the
  `from → to` pair, so colour is never the only signal.
- Answer feedback appears only after an explicit check in every exercise, lab and dialogue/reading
  Q&A; the shared final test reveals correctness only after submission (its `why` field never
  renders pre-submit).
- The closing station links back to lesson 59 and states plainly that lesson 60 is the last
  registered lesson, with **no link to any lesson 61**; lesson 59's own closing station was updated
  to link forward here (both directions asserted by the audits).
