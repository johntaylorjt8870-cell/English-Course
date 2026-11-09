# Lesson 59 — Source Ledger

**Lesson:** Advanced Passive — With Modals and Advanced Structures
**Source:** the lesson text supplied with the task (eleven sections + 25-question test + writing/speaking tasks).
**Purpose of this file:** prove that every section, topic, example and exercise of the source is
actually *rendered* in the application, and record every place where the source itself was wrong and
how it was fixed. It is a provenance document, never student-facing copy.

Student screens never say «المصدر» or «§N»; the section numbers below exist only here.

---

## 1. Section-by-section coverage

| Source part | Content | Where it renders |
|---|---|---|
| §1 | `Modal + be + V3` base rule, no third form, `be` never changes | Step 2 (`s1` → `Section1`): rule, 6 correct forms, 3 wrong forms, four opening pairs |
| §1 | CAN — ability / possibility / permission, `can be done` | Step 3 (`s2` → `ModalSection59` with three usage tabs) |
| §1 | COULD — past ability, present possibility, `could be repaired` | Step 4 (`s3`) |
| §1 | MUST — necessity, prohibition (`must not`), question form | Step 5 (`s4`, incl. `l59-block--neg` + warning) |
| §1 | SHOULD — advice / recommendation | Step 6 (`s5`) |
| §1 | MAY / MIGHT — possibility, may-might difference | Step 7 (`s6`, compare table) |
| §2 | HAVE TO / HAS TO — `has to` agreement, negative, question, no-necessity vs prohibition | Step 8 (`s7` → `obligationSection("have-to")`, `agreement` block) |
| §2 | OUGHT TO — moral duty, compared with SHOULD | Step 9 (`s8` → `obligationSection("ought-to")`) |
| §3 | `Modal + have been + V3`; present vs past passive | Step 10 (`s9` → `Section9`, console scene + timebar) |
| §3 | SHOULD HAVE BEEN — regret/criticism | Step 11 (`s10` → `PerfectSection`) |
| §3 | COULD HAVE BEEN — missed possibility | Step 12 (`s11`) |
| §3 | MUST HAVE BEEN — strong deduction; contrast with MUST BE | Step 13 (`s12`, deduction pairs + contrast rows) |
| §3 | MAY / MIGHT HAVE BEEN — past possibility | Step 14 (`s13`) |
| §4 | NEEDS TO BE — vs `needs repairing` | Step 15 (`s14` → `AdvancedSection("needs-to-be")`) |
| §4 | BE SUPPOSED TO BE — expectation/arrangement, negative + question | Step 16 (`s15`) |
| §4 | BE EXPECTED TO BE — vs `will be` | Step 17 (`s16`) |
| §4 | HAVE / GET SOMETHING DONE — causative vs passive | Step 18 (`s17` → `CausativeSection` + contrast rows) |
| §5 | Rule table of fifteen structures | Step 19 (`s18` → `RuleTableSection`, 15 rows) |
| §5 | `The report …` meaning discrimination | Step 20 (`s19` → `ReportLadderSection`, 7 rungs) |
| §6 | Eight-step active→passive procedure + CAN / SHOULD HAVE / MUST HAVE demos | Step 21 (`s20` → `TransformSection`) |
| §7 | Seven common mistakes with correction and reason | Step 22 (`s21` → `ErrorsSection`) |
| §8 | `At the Office` dialogue + full translation + 7 Q&A | Step 23 (`s22` → `DialogueSection`) |
| §9 | `Modern Technology and Safety` reading + Arabic + 8 Q&A | Step 24 (`s23` → `ReadingSection`) |
| §10 | Nine exercise groups (all items, answers, explanations) | Steps 25–33 (`p1`…`p9` → `PracticeSet59`) |
| §10 | Original 25-question test (10 MC · 5 A→P · 3 P→A · 4 error · 3 translation) | Step 34 (`s24` → `ORIGINAL_TEST_59`) |
| §10 | Full key of the original test | Step 35 (`s25` → `PracticeKey59`) |
| §10 | Remaining original items kept as extra review | Step 37 (`s26`) |
| §11 | Writing task `Rules for a Safe School` (six structures + model + translation) | Step 38 (`s27`) |
| §11 | Speaking task — factory manager, 7 sentences + translations + write five new ones | Step 39 (`s28`) |
| §11 | Final summary: all rules, key contrasts, Golden Rule | Step 40 (`s29`, console scene) |

Lesson map: 11 stations, **52 steps** in the rail (43 literal steps + the 9 generated practice
steps `p1…p9`). Ten interactive labs (`explorer`, `builder`, `timeline`,
`detective`, `engine`, `causative`, `errors`, `contrast`, `drill`, `v3`) plus teacher area and the
closing station sit after the source sections.

## 2. Counts verified by `scripts/audit-lesson59.mjs`

- Practice: **9 groups / 70 items** (10 · 10 · 8 · 8 · 5 · 8 · 6 · 10 · 5)
- Original test: **25** questions, each with answer + explanation
- Shared final test: **15** questions (`test59.ts`, including one 5-pair matching item)
- Dialogue 9 turns / 7 questions · Reading 5 paragraphs / 8 questions
- Rule table 15 rows · Report ladder 7 · Transform 8 steps + 3 demos · Errors 7
- V3 ledger 29 verbs (20 regular + 9 irregular) · Writing model 10 sentences · Speaking 7 sentences

## 3. Source errors found and how they were handled

The rule here was: never silently reword, never drop an example, keep the source's teaching goal,
apply the smallest correction, and document it.

1. **Practice 7, item 1 — negation of `must`.**
   The source sentence is `The work must be completed.` and its model answer is
   `The work must not be left unfinished.`
   A literal `The work must not be completed.` reverses the meaning (prohibition of the work)
   instead of negating the obligation. The item now accepts the source model answer
   (`must not be left unfinished`) and states in its explanation that
   `must not be completed` means prohibition, while `doesn't have to be completed` would express
   absence of necessity — the source's own second, differently-meaning alternative.
   No item was removed.

2. **`stableBe` / `why` wording (§3).** The source English gloss could be read as if `be` itself
   changes in the perfect passive. The rendered copy now states explicitly that the modal carries
   the tense and `be` never becomes `is / are / was / were`
   (`ولا تتحوّل أبدًا إلى is أو are أو was أو were`), preserving the intended contrast.

3. **Duplicate `lead` props** in the obligation and perfect section components were removed; the
   duplicate never reached students but obscured which sentence was authoritative.

4. **Builder subject options** contained a duplicate entry; the list is de-duplicated so two
   identical chips can no longer appear.

5. **Advanced-scene kicker** carried only an Arabic label; it now also carries the English structure
   name so the scene header names the structure it teaches.

## 4. Deliberate presentation decisions (not source changes)

- Mixed Arabic/English blocks use `unicode-bidi: plaintext`; Arabic and Latin text never share a
  bidirectional run. Numeric ranges (`1–6`, `٢١–٢٧`) are wrapped in `<bdi dir="ltr">` because the
  en dash is bidi-neutral and would otherwise reverse the range inside an Arabic paragraph.
- The rail label is one text unit; the station number already shows in the badge.
- Structural slot colours (subject / modal / be-have been / V3 / object / past) always keep their
  English label, so colour is never the only signal.
- Answer feedback appears only after an explicit check in every exercise and lab, and the shared
  final test reveals correctness only after submission.
- The closing station states plainly that lesson 59 is the last lesson registered in the hub and
  therefore has **no link to a lesson 60**.
