# Lesson 39 — Source Audit (قبل التنفيذ)

**Prepared before implementation.** This report records what source material was actually available for Lesson 39 (Future Perfect Continuous), what could be read, what had to be reconstructed, what the platform added, and what remains unverifiable.

## 1. Source read confirmation

Searched the working tree (excluding `.git` and `node_modules`) for Lesson 39 artefacts:

| Kind | Result |
|---|---|
| PDFs named for Lesson 39 / Future Perfect Continuous | **None** |
| Page images / screenshots / crops (png, jpg, jpeg, webp) | **None in the repository at all** |
| Separate `.md` / `.txt` source dumps for Lesson 39 | **None** before this work |
| Official answer key for the §35 Master Test | **None** — §36 in the source is a stub (heading + «عرض الحلول التفصيلية») |
| Lesson 38 leftover preview | Lesson 38's closing map names Lesson 39 as the next tense; the Lesson 39 opening bridges back with `By 8:00, I will have finished my homework.` That line is a pedagogical bridge, **not** a Lesson 39 textbook page. |

**Authority used:** the complete Lesson 39 text supplied in the implementation request (opening + 39 numbered sections, introduced by `━━━━━━━━` headings). Same provenance pattern as Lessons 37 and 38: complete numbered source text in the request, no scanned pages, no publisher file.

No claim in this PR is verified against a textbook, a PDF, a scan, or an official answer key, because none was available.

## 2. Structure inventory

- Unnumbered **opening** (title `How Long Will You Have Been Learning?`, Arabic tagline, Lesson 38 bridge, "last main tense of the future system") → the `cover` step.
- **Numbered sections 1–39** in source order → `s01`–`s39`. No number is skipped; there is no §40 in this source.
- Ledger totals: **40 steps**, **688 source lines**, **5 reconstructed tables**, **2 dialogues** (§15 with 8 lines, §28 with 10 lines).
- Section kinds: explanation (§3, §4, §6–§9, §12–§14, §19–§24, §26), comparison (§10, §16–§18, §25), lab-style source (§11 duration calculations), dialogue (§15, §28), error gallery (§27), guided practice (§29–§32), judgment task (§33), reading (§34), test (§35), solutions stub (§36), production (§37), summary (§38), curriculum map (§39).

### Exercise inventory — 62 numbered items

| Source | Items | Type | Source key supplied? |
|---|---|---|---|
| §29 | 6 | multiple choice — choose the correct form | **Yes** (①–⑥) |
| §30 | 6 | completion with Future Perfect Continuous | **Yes** (①–⑥) |
| §31 | 8 | tense choice: Future Perfect or Future Perfect Continuous | **Yes** (①–⑧) |
| §32 | 10 | Grammar Detective — find and correct the error | **Yes** (①–⑩) |
| §34 | 7 | reading comprehension — *The Long Journey* | **Yes** (①–⑦) |
| §35 | 25 | Master Test — five levels of five (①–⑤, ⑥–⑩, ⑪–⑮, ⑯–⑳, ㉑–㉕) | **No** |
| **Total** | **62** | | 37 source keys + 25 platform solutions |

§37 (Writing Mission) is a production task: **8 requirements** plus a guidance model (5 model paragraphs). It is deliberately **not** counted among the 62 numbered items, and it is not turned into a scored rubric because the source supplies none.

## 3. Provenance split — tracked separately in `coverage39.ts` and `practiceData39.ts`

| Category | Count / location | Provenance |
|---|---|---|
| Source English examples | every `en` run inside `ledger39.ts` units (688 lines) | `origin: "source"` |
| Source Arabic translations | §29–§32 items, §34 passage answers, §15 dialogue lines (source units 10–17 supply the Arabic) | `origin: "source"` |
| Tables / comparisons | §2 timeline, §5 pronouns, §10 for/since, §16 FP-vs-FPC, §25 three perfect continuous | source cells, **table-rebuilt** layout |
| Exercises + subquestions | 62 numbered items (§29, §30, §31, §32, §34, §35) | source |
| Source answer keys | 37 keys (§29 6, §30 6, §31 8, §32 10, §34 7) rendered as reveal units | source, revealed only after the student answers |
| Platform-authored additions | all interactive labs, all 25 Master Test solutions, §28 Arabic dialogue translations, §34 six-form analysis, writing-mission grading guidance, teacher guide | `origin: "platform"` / `data-source-status="platform-authored-teacher-addition"` |
| Grammar corrections / qualifications | §7, §9, §10, §14, §16, §18, §26, §33 notes (see §5 below) | platform notes **next to** the source text, never replacing it |
| Unverifiable items | see §6 below | flagged, not invented |

Dialogue provenance is tracked on **two** axes, because the two dialogues differ:

- **§15 *The Long Study Day*** — 8 lines. The English lines *and* their Arabic renderings come from the source (`origin: "source"`); the role analysis is source-supplied for lines 5, 7, 8 (`analysisOrigin: "source"`) and platform-authored for the rest.
- **§28 *The Marathon Training*** — 10 lines. The source gives the English dialogue and a four-part analysis but **no Arabic translation**, so all 10 Arabic renderings are platform additions (`origin: "platform"`), while the analysis of lines 5, 7, 8, 9, 10 is source-supplied (`analysisOrigin: "source"`). The closing line's speaker is the source's own `ملخص الحوار`.

`labs39.tsx` renders both provenance sentences in the dialogue badge, and `TeacherGuide39.tsx` lists them in the provenance tab, so a teacher can see which Arabic text is source and which is platform.

## 4. Visual / legibility issues in the supplied text

1. **Five tables lost their column rules** in the dump (rows arrived as consecutive lines). Rebuilt with the same cells, same order, no rewording: §2 (`NOW ─ 4:00 ─ 5:00 ─ 6:00 ─ 7:00 ─ 8:00` + three descriptions), §5 (7 pronoun rows), §10 (4 for/since pairs), §16 (4 question→tense rows, header keeps **غالبًا**), §25 (3 tenses × 3 columns).
2. **A GB flag emoji** opened the source title line. Repository rule: no flag emoji in lesson UI or ledger text — the emoji is dropped, the rest of the line is kept verbatim. `scripts/audit-lesson39.mjs` asserts the ledger contains no such emoji.
3. **§35 numbering** mixes ①–⑳ with ㉑–㉕. Rendered as Q1–Q25 in the Test Area while the source symbols stay visible in the §35 launch step.
4. **§2's timeline** gives no role for `NOW`; it is labelled `لحظة الكلام — قبل نقطة المرجع` as a platform clarification (recorded in the coverage accuracy note), and the source's own calculation (4:00 → 8:00 = 4 ساعات) is displayed unchanged.

## 5. Deliberate source content preserved (taught, never silently "fixed")

- **§27 أخطاء شائعة جدًا** — the wrong forms (`will has been`, `will have being`, `will have been study`, `Will you has been`, …) are shown as errors on purpose.
- **§32 Grammar Detective** — all 10 broken sentences are shown broken first; the source's corrections (including ⑥ dropping `will` from the time clause and ⑦ turning `worked` into `working`) are the reveal keys.
- **§33 IQ200** — pairs where **both** tenses are grammatical (`will have worked` / `will have been working`, `lived` / `been living`) are kept as "both correct" judgments; the source's point is that signal words do not mechanically select a tense.
- **§26 أفعال الحالة** — the source marks continuous forms with stative verbs as «❌ في الاستعمال المعتاد» (unusual in normal usage), **not** as absolute errors. That qualification is preserved verbatim because it is linguistically accurate.
- **§29 / §35 overlap** — items ① and ② of §29 reappear verbatim as Q1 and Q2 of the §35 Level 1. This duplication is **in the source**. Both occurrences are kept in source order, the overlap is announced inside the §29 step, and the audit asserts exactly two overlapping prompts so the duplication cannot silently grow.
- **§34 key vs passage** — the passage contains **two** Future Perfect Continuous sentences, while the source key for ⑦ names one (`By noon, we will have been travelling for six hours.`). The key is kept verbatim; a platform nuance (`READING34_CHECK_39` id `two-fpc-sentences`) explains the difference.

### Grammar qualifications added transparently (platform notes, source text untouched)

- **Form invariants:** `will have been + V-ing` — `have` never becomes `has` after `will`; `been` never becomes `being`. Enforced by the formula builder and asserted across all rendered examples.
- **No "FP = stopped / FPC = not stopped":** §7 and §18 are the source's own rejection of that shortcut; the lesson keeps the distinction as *result vs duration*, and §18's title question («هل FPC يعني أن العمل لم ينتهِ؟») is answered from the source text.
- **`for` does not force FPC** (§33) and **`by the time` + Present Simple** is a future-time-clause rule, not a mechanical ban on every `by the time` (§14 note: past narrative takes past forms).
- **§9** `By noon, I will have been working since 7:00.` is correct but states only the starting point; a platform note adds that the clearer way to state duration is `for five hours`, and that `by` + `since` together is less common. The source sentence is unchanged.
- **§10** `I will have been studying since 5:00.` has no explicit future reference point; a platform note says the reference is understood from context. The source sentence is unchanged.
- **Time math verified numerically** (not assumed): §2 4:00→8:00 = 4 h · §11 three cases = 4 h (3:00→7:00), 6 h (8 a.m.→2 p.m.), 6 months (January→July, same-month-day assumption stated by the source) · §15 3:00→8:00 = 5 h · §28 3 + 1 = 4 months · §34 6:00 a.m.→noon = 6 h and 6:00 a.m.→6:00 p.m. = 12 h, with 11:00 before noon (no contradiction).
- **Subject/auxiliary order** in every question verified letter by letter: `How long will you/she/they have been …?`, `Will you have been learning …?`, and Boss Q25 `How long will you have been developing these projects by next month?`

## 6. Ambiguities and unverifiable items (flagged, not invented)

- **§35 has no answer key.** All 25 answers and explanations are platform-authored teacher additions, labelled `platform-authored-teacher-addition` in `solutionsData39.ts` and surfaced only in the gated Solutions/Teacher areas. They are **غير قابل للتحقق** against an official key because no official key exists in the source or the repository; they were derived from the lesson's own rules and checked item by item.
- **Q18 is an open-model item** (`judgment: "open-model"`): the source asks for an explanation, so the platform supplies a model answer rather than a single correct string. Marked as such in the solutions data.
- **§37 has no rubric.** The 8 requirements and the guidance model are source; the grading guidance in the Teacher Area is platform-authored and labelled so.
- **§34's passage authorship** (a platform-style reading text inside the supplied lesson) cannot be checked against any publisher; it is treated as source text because it arrived in the source dump.
- **§39's curriculum map** states the course sequence (Lessons 34–39 forms) and names **Lesson 40 — Future Tenses Master Review** as *planned*. Whether Lesson 40 exists elsewhere is **غير قابل للتحقق** here; it is **not implemented** in this PR, carries `[data-next-lesson="planned-not-implemented"]`, has no route, no hub card, and no navigation depends on it.
- **§28's missing Arabic** is a source gap, not a translation discrepancy: the platform translation is labelled `origin: "platform"` everywhere it appears.

## 7. Source-to-lesson mapping strategy

- One native step per source unit: `cover`, then `s01`–`s39` (40 steps), grouped into 13 chapters **for navigation only** — source order is never rearranged.
- Every step carries `data-step-id`, `data-source-id`, and `data-source-section` so the audit can tie rendered DOM back to a ledger section.
- §35 is a **launch step**: it keeps the source section visible and points to the dedicated Test Area (`lesson39-test`), which renders the 25 questions in five levels of five with no correctness mark before or after submission and no import of the solutions module.
- §36 maps to the **Solutions Area** (locked until submission or teacher unlock) and the **Teacher Area** (existing mechanism, password `somer173` — no new secret was invented or exposed).
- Practice (§29–§34) and the Master Test (§35) stay distinct surfaces; nothing is recycled between them beyond the two documented source overlaps.

## 8. What was actually verified, and how

| Check | Tool | Scope |
|---|---|---|
| Ledger completeness, source strings, table cells | `scripts/audit-lesson39.mjs` §1–§2 | 40 sections, 688 lines, 5 tables |
| Exercise counts and keys | §3–§4, §9 | 62 items, 37 source keys |
| Rendered DOM of every step and area | §5, §7, §8, §10–§12 | jsdom render of Student/Test/Solutions/Teacher |
| Test neutrality and isolation | §6, §12 | no answer leakage, no solutions import in Test Area |
| Direction, BIDI, contrast | §13, §13b | computed contrast on rendered markup, overflow/responsive checks |
| Registration | §14 | `App.tsx`, `package.json`, global direction/navigation/final-test audits, both docs |

**Not verified:** real-browser visual rendering. This environment has no browser; build success, HTTP 200, and jsdom rendering are **not** visual verification, and no screenshots were produced or fabricated. Mobile/desktop layout is checked programmatically (overflow, wrap, tap-target sizes), not visually.
