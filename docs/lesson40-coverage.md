# Lesson 40 — The Temporal Command Center: Source-to-Step Coverage Ledger

This rebuild preserves `src/lessons/lesson40/ledger40.ts` byte-for-byte unchanged (`git diff HEAD -- src/lessons/lesson40/ledger40.ts` is empty) and uses the audited student-safe projection `src/lessons/lesson40/studentLedger40.ts` (identical to `ledger40.ts` except §26 retains only its two student-facing introductory units `[0–1]`, keeping all 62 answer-key units `[2–63]` out of the eager student bundle).

All **30 source records** (`cover` + numbered sections `§1`–`§29`) map across **11 stations** and **54 focused interactive steps** in `SLIDES_40`, plus the dedicated **25-question Final Exam** (`TestArea40` / `testData40.ts`), **Deferred Solutions Area** (`SolutionsArea40` / `solutionsData40.ts`), and **Teacher Space** (`TeacherArea40` / `TeacherGuide40.tsx`). No student-facing UI contains a "show literal source text" disclosure or editorial provenance labels (`مصدر`, `المصدر`, `§N`, filenames).

| Source unit | Implemented step IDs & zero-based `units[]` ranges | Preserved content & interactive laboratory |
|---|---|---|
| Opening (`cover`) | `cover-01` `[0–8]`, `cover-02` `[9–14]` | Full English/Arabic title, subtitle (`The Future Tenses Grand Challenge 🚀`), `تأسيسي متقدم — IQ200` level, bridge across Lessons 34–39 (distinguishing the 6 learning stations from the 5 principal future forms), plus **Lab B** (5-channel Horizon Selector) and intent check. |
| §1 | `s01-01` `[0–5]`, `s01-02` `[6–10]` | All 10 mastery objectives (`①`–`⑩`) with interactive self-readiness checklist. |
| §2 | `s02-01` `[0–16]`, `s02-02` `[17–31]` | All 6 diagnostic future-selection questions, examples, Arabic translations, and target forms + **Lab A** (6-Question Future Selector Console & scenario router). |
| §3 | `s03-01` `[0]` + reconstructed 5-row Golden Table | All 5 principal future forms, formulas, meanings, and explicit Lesson 36 comparison note + Golden Table structure/meaning quiz. |
| §4 | `s04-01` `[0–11]`, `s04-02` `[12–19]` | All 5 angles on `study` (`①`–`⑤`), translations, focus notes, and key discovery + **Lab C** (5-Angle Sentence Lab with `study` & `prepare`). |
| §5 | `s05-01` `[0–14]`, `s05-02` `[15–26]` | Round 1 (`WILL` vs `BE GOING TO`), all 4 scenarios, and real-world overlap note + **Lab D** (Decision, Evidence & Overlap Lab). |
| §6 | `s06-01` `[0–10]`, `s06-02` `[11–18]` | Round 2 (`Future Continuous`), 6:00–7:30 online lesson window, examples, and polite `Will you be using...?` inquiry + **Lab B** time-window simulator. |
| §7 | `s07-01` `[0–7]`, `s07-02` `[8–16]` | Round 3 (`Future Perfect`), Friday project completion deadline, examples, and backward-from-deadline checkpoint lab. |
| §8 | `s08-01` `[0–9]`, `s08-02` `[10–16]` | Round 4 (`Future Perfect Continuous`), Sara's 2:00–6:00 four-hour training timeline, examples, and **Lab B** duration accumulator. |
| §9 | `s09-01` `[0–14]`, `s09-02` `[15]` + reconstructed 3-row comparison table | Core comparison: Adam's 4:00–8:00 project (`At 6:00` / `By 8:00` completion / `By 8:00 ... for four hours`) + **Lab E** (Adam 3-Lens Comparator & governing-question matcher). |
| §10 | `s10-01` `[0–7]`, `s10-02` `[8–13]` | Deep conceptual check: `Future Perfect Continuous` emphasizes duration up to the reference point rather than proving the work is unfinished; result vs duration contrast. |
| §11 | `s11-01` `[0–17]`, `s11-02` `[18–22]` | All 8 time expressions, `by Friday` (`will finish` vs `will have finished`), and `for ten years` (`will have worked` vs `will have been working`) nuance lab. |
| §12 | `s12-01` `[0–17]`, `s12-02` `[18–25]` | Future time clauses (`when`, `before`, `after`, `as soon as`, `until`, `by the time`) taking `Present Simple`, error trap (`When you will arrive`), and direct question `When will you arrive?` + **Lab G**. |
| §13 | `s13-01` `[0–14]` | `WHEN` vs `BY THE TIME` around a single guest-arrival anchor across `Future Continuous`, `Future Perfect`, and `Future Perfect Continuous` + **Lab G** viewpoint switcher. |
| §14 | `s14-01` `[0–12]`, `s14-02` `[13–20]` | `FOR` (duration) vs `SINCE` (starting point) across future forms and stative verb `know` (`I'll have known`, never `*will have been knowing`) + **Lab F** sorter & stative check. |
| §15 | `s15-01` `[0]` + reconstructed `write` table, `s15-02` `[1–12]` | 5-form `write` table and all 5 structural errors/corrections + **Lab H** (Interactive Auxiliary + Verb Chip Formula Builder & Trap Repair). |
| §16 | `s16-01` `[0–11]`, `s16-02` `[12–27]` | Complete Dialogue 1 (`The Science Competition` — Liam & Maya), line-by-line tense/function inspector with optional Arabic translation support, and semantic role analysis (**Lab I**). |
| §17 | `s17-01` `[0–7]`, `s17-02` `[8–16]` + `revealUnits[0–6]` | Complete Dialogue 2 (`A Family Trip` — Father, Sara, Omar) and 6-item classification challenge; formative `revealUnits` unlock only after completing all 6 items (**Lab I**). |
| §18 | `s18-01` `[0–18]`, `s18-02` `[19–30]` | All 5 signal-free real-life scenarios and explanations + **Lab J** (Context-Only Inference Lab). |
| §19 | `s19-01` `[0–13]`, `s19-02` `[14–26]` + `revealUnits[0–6]` | Practice 1: all 6 MCQ items with immediate explanatory feedback; full answer summary unlocks after all 6 items are attempted (**Lab K**). |
| §20 | `s20-01` `[0–9]` + `revealUnits[0–8]` | Practice 2: all 8 sentence completions accepting contractions and contextually valid alternatives; `revealUnits` unlock after checking all 8 items (**Lab K**). |
| §21 | `s21-01` `[0–11]` + `revealUnits[0–10]` | Grammar Detective: all 10 error-correction sentences accepting dual valid fixes (e.g., item 1); `revealUnits` unlock after checking all 10 items (**Lab K**). |
| §22 | `s22-01` `[0–15]` | IQ200 Multiple Valid Answers section (`will finish` / `will have finished`; `am going to study` / `will study`) + nuance comparison lab. |
| §23 | `s23-01` `[0–15]`, `s23-02` `[]` + `revealUnits[0–8]` | Complete reading passage (`Building the Future Learning Centre`) with tense-highlighting lens and all 8 comprehension questions; `revealUnits` unlock after attempting all 8 questions (**Lab L**). |
| §24 | `s24-01` `[0–17]` | All 6 reading grammar-analysis items and writer's-intent takeaway (**Lab L**). |
| §25 | `s25-01` `[0–1]` launch step; full `[0–64]` in `testData40.ts` / `TestArea40.tsx` | All 25 Grand Exam questions across 5 levels (`5 × 5`: MCQ, Completion, Error Correction, Meaning/Reasoning, and `The Big School Project` Q21–25). Zero answer fields in `testData40.ts` or pre-submit DOM. |
| §26 | `s26-01` `[0–1]` gateway step; full `[0–63]` in deferred `SolutionsArea40` / `TeacherGuide40` | All 25 official solutions, concise reasons, extended explanations, accepted alternatives, and human-review routing for Level 4 (`Q16–20`). |
| §27 | `s27-01` `[0–12]`, `s27-02` `[13–20]` | Full Writing Mission (`My Future Learning Journey`, 15–18 sentences, all 10 constraints, 6-sentence model starter, non-copy warning) + **Lab M** (Writing Studio with live sentence counter, structural detectors, and 10-point self-check). |
| §28 | `s28-01` `[0–21]`, `s28-02` `[22–44]` | All 5 Golden Summary cards and overarching Golden Rule check. |
| §29 | `s29-01` `[0–18]`, `s29-02` `[19–31]` | Complete 15-station curriculum progress map (Present, Past, Future) and Lesson 41 (`Master Auxiliary Verbs`) preview with live link to `#/lesson/41`. |
