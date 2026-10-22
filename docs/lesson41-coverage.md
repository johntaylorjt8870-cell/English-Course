# Lesson 41 — source-to-implementation coverage

**Status:** rebuilt and verified. Source = the complete 40-section Arabic lesson supplied in the conversation (opening + §§1–40).

- Source blocks: **41** (cover, §1–§40).
- Normalized source units: **883** — all rendered exactly once (uncovered: **0**).
- Slides: **120** across **8** learning stations (الانطلاق، ما الفعل المساعد؟، محرك BE، محرك DO، محرك HAVE، سلسلة المساعدات، التطبيق العملي، الإتقان).
- Practice items: **66** (§§30–35), each with an attempt-gated answer and explanation.
- Final test: **25** questions in **5** levels (§36), teacher key + 25 detailed solutions (§37).

## Mapping rules

- One section never collapses into a single slide: each slide declares an explicit `range` of source units, so a section grows in slide count instead of shrinking its content.
- `SOURCE_SECTIONS_41` in `ledger41.ts` holds the transcription (one array entry per normalized line). `coveredIndexes41()` returns the units each slide renders, and `uncoveredUnits41()` must stay empty (asserted by `scripts/audit-lesson41.mjs`).
- Tables, dialogue turns, five-sentence comparisons and bullet lists keep their structure: `Frame41` + `SourceLines41` (auto/objectives/steps/dialogue) + `NumberCards41` + `Panel41`.
- Numbered practice prompts (§§30–35) map to `PracticeCard41`; the key appears only after the student presses «قارن إجابتي بالحل», and the same keys feed `TeacherGuide41` behind the teacher gate.
- §36 renders through `TestArea41` only; the grader (`key41.ts`), the solutions (`SolutionsArea41.tsx`) and the teacher guide (`TeacherGuide41.tsx`) are separate lazy chunks that are not part of the student bundle or the study DOM.

## Section → slide map

| § | Section | Units rendered / source | Slides | Where answers live |
|---|---|---:|---|---|
| 0 | الدرس 41: Master Auxiliary Verbs | 19 / 19 | `cover`, `s0-five`, `s0-why`, `s0-system` | داخل الشريحة |
| 1 | أهداف الدرس | 11 / 11 | `s1-a`, `s1-b` | داخل الشريحة |
| 2 | ما الفعل المساعد أصلًا؟ | 29 / 29 | `s2-term`, `s2-compare`, `s2-roles`, `s2-have` | داخل الشريحة |
| 3 | Main Verb vs Auxiliary Verb | 27 / 27 | `s3-a`, `s3-b`, `s3-c`, `lab-roles` | داخل الشريحة |
| 4 | المحركات الثلاثة الكبرى | 8 / 8 | `s4-table`, `s4-note`, `lab-engines` | داخل الشريحة |
| 5 | عائلة BE الكاملة | 27 / 27 | `s5-family`, `s5-table`, `s5-examples` | داخل الشريحة |
| 6 | الوظيفة الأولى: BE بوصفه فعلًا رئيسيًا | 20 / 20 | `s6-main`, `s6-examples`, `s6-formula` | داخل الشريحة |
| 7 | الوظيفة الثانية: BE بوصفه فعلًا مساعدًا في الأزمنة المستمرة | 24 / 24 | `s7-main`, `s7-perfect`, `s7-common` | داخل الشريحة |
| 8 | لماذا نقول IS STUDYING وليس IS STUDY؟ | 11 / 11 | `s8-ving` | داخل الشريحة |
| 9 | لا تستخدم DO مع BE في الأسئلة العادية | 19 / 19 | `s9-question`, `s9-more`, `s9-three`, `lab-be` | داخل الشريحة |
| 10 | الوظيفة الثالثة: BE في المبني للمجهول — نظرة تمهيدية | 17 / 17 | `s10-passive`, `s10-formula` | داخل الشريحة |
| 11 | عائلة DO | 11 / 11 | `s11-family`, `s11-key` | داخل الشريحة |
| 12 | الوظيفة الأولى: DO في أسئلة Present Simple | 23 / 23 | `s12-question`, `s12-examples`, `s12-s` | داخل الشريحة |
| 13 | الوظيفة الثانية: DO في نفي Present Simple | 19 / 19 | `s13-negative`, `s13-examples` | داخل الشريحة |
| 14 | DID في الماضي البسيط | 21 / 21 | `s14-did`, `s14-examples`, `lab-do` | داخل الشريحة |
| 15 | لماذا لا نستخدم DO في جميع الأسئلة؟ | 22 / 22 | `s15-why`, `s15-golden` | داخل الشريحة |
| 16 | الوظيفة الثالثة: DO للتأكيد — Emphatic DO | 27 / 27 | `s16-emphatic`, `s16-dialogue`, `s16-forms` | داخل الشريحة |
| 17 | DO بوصفه فعلًا رئيسيًا | 24 / 24 | `s17-main`, `s17-double` | داخل الشريحة |
| 18 | عائلة HAVE | 9 / 9 | `s18-family`, `s18-v3` | داخل الشريحة |
| 19 | الوظيفة الأولى: HAVE في الأزمنة التامة | 21 / 21 | `s19-perfect`, `s19-map` | داخل الشريحة |
| 20 | HAVE في الأزمنة التامة المستمرة | 18 / 18 | `s20-continuous`, `s20-analysis` | داخل الشريحة |
| 21 | HAVE بوصفه فعلًا رئيسيًا | 20 / 20 | `s21-main`, `s21-compare`, `lab-have` | داخل الشريحة |
| 22 | السؤال والنفي مع HAVE: الفرق المهم | 21 / 21 | `s22-question`, `s22-table` | داخل الشريحة |
| 23 | مختبر التمييز: HAVE رئيسي أم مساعد؟ | 14 / 14 | `p23-1`, `p23-2` | بطاقة التدريب بعد المحاولة + TeacherGuide41 |
| 24 | هل يمكن أن تحتوي الجملة على أكثر من فعل مساعد؟ | 17 / 17 | `s24-many`, `s24-analysis` | داخل الشريحة |
| 25 | قاعدة الفعل المساعد الأول — The First Auxiliary Rule | 24 / 24 | `s25-rule`, `s25-examples`, `s25-note`, `lab-chain` | داخل الشريحة |
| 26 | المقارنة الكبرى: خمس جمل، خمسة أسئلة | 11 / 11 | `s26-table`, `s26-note` | داخل الشريحة |
| 27 | خوارزمية اختيار الفعل المساعد الصحيح | 24 / 24 | `s27-algorithm`, `s27-first`, `s27-second` | داخل الشريحة |
| 28 | حوار تطبيقي: The Grammar Detective Club | 30 / 30 | `s28-dialogue`, `s28-translation`, `s28-analysis` | داخل الشريحة |
| 29 | الأخطاء العشرة الأكثر شيوعًا | 20 / 20 | `s29-a`, `s29-b` | بطاقة التدريب بعد المحاولة + TeacherGuide41 |
| 30 | التدريب الأول: حدد الفعل المساعد | 19 / 19 | `p30-1`, `p30-2`, `p30-3` | بطاقة التدريب بعد المحاولة + TeacherGuide41 |
| 31 | التدريب الثاني: اختر الفعل المساعد الصحيح | 41 / 41 | `p31-1`, `p31-2`, `p31-3` | بطاقة التدريب بعد المحاولة + TeacherGuide41 |
| 32 | التدريب الثالث: حوّل الجمل إلى أسئلة | 17 / 17 | `p32-1`, `p32-2`, `p32-3` | بطاقة التدريب بعد المحاولة + TeacherGuide41 |
| 33 | التدريب الرابع: حوّل الجمل إلى النفي | 17 / 17 | `p33-1`, `p33-2`, `p33-3` | بطاقة التدريب بعد المحاولة + TeacherGuide41 |
| 34 | التدريب الخامس: الفعل الرئيسي أم الفعل المساعد؟ | 18 / 18 | `p34-1`, `p34-2`, `p34-3` | بطاقة التدريب بعد المحاولة + TeacherGuide41 |
| 35 | Reading Challenge — A Busy School Week | 39 / 39 | `read-passage`, `read-q-1`, `read-q-2`, `read-q-3`, `read-q-4` | بطاقة التدريب بعد المحاولة + TeacherGuide41 |
| 36 | الاختبار النهائي — Auxiliary Verbs Master Test | 70 / 70 | `test-l1`, `test-l2-a`, `test-l2-b`, `test-l3-a`, `test-l3-b`, `test-l4-a`, `test-l4-b`, `test-l4-c`, `test-l5-a`, `test-l5-b`, `test-result` | TestArea41 ثم SolutionsArea41 (بعد التسليم) |
| 37 | مساحة المعلم — الحلول التفصيلية للاختبار | 3 / 3 | `teacher` | TeacherArea41 + SolutionsArea41 (محمية) |
| 38 | Writing Mission — The Auxiliary Challenge | 23 / 23 | `write-editor`, `write-criteria`, `write-model` | داخل الشريحة |
| 39 | الملخص الذهبي — The Three Engines | 32 / 32 | `summary-be`, `summary-do`, `summary-have` | داخل الشريحة |
| 40 | خريطة التقدم والمحطة القادمة | 16 / 16 | `next-progress`, `next-can`, `next-close` | داخل الشريحة |

## Learning stations

| Station | Slides | Source sections |
|---|---:|---|
| 🚀 الانطلاق (`start`) | 6 | 0, 1 |
| 🔎 ما الفعل المساعد؟ (`what`) | 11 | 2, 3, 4 |
| 🏗️ محرك BE (`be`) | 16 | 5, 6, 7, 8, 9, 10 |
| ❓ محرك DO (`do`) | 17 | 11, 12, 13, 14, 15, 16, 17 |
| ⏳ محرك HAVE (`have`) | 11 | 18, 19, 20, 21, 22 |
| 🔗 سلسلة المساعدات (`chains`) | 16 | 24, 25, 26, 27, 28, 29 |
| ✍️ التطبيق العملي (`practice`) | 22 | 23, 30, 31, 32, 33, 34, 35 |
| 🏆 الإتقان (`mastery`) | 21 | 36, 37, 38, 39, 40 |

## Practice sets (attempt-gated: §30–§35 plus the §23 and §29 discrimination labs)

| § | Items | Item ids | Fields |
|---|---:|---|---|
| 23 | 6 | `p23-1`, `p23-2`, `p23-3`, `p23-4`, `p23-5`, `p23-6` | الوظيفة |
| 29 | 10 | `p29-1`, `p29-2`, `p29-3`, `p29-4`, `p29-5`, `p29-6`, `p29-7`, `p29-8`, `p29-9`, `p29-10` | التصحيح + السبب |
| 30 | 8 | `p30-1`, `p30-2`, `p30-3`, `p30-4`, `p30-5`, `p30-6`, `p30-7`, `p30-8` | الفعل المساعد + الفعل الرئيسي |
| 31 | 8 | `p31-1`, `p31-2`, `p31-3`, `p31-4`, `p31-5`, `p31-6`, `p31-7`, `p31-8` | الفعل المساعد |
| 32 | 8 | `p32-1`, `p32-2`, `p32-3`, `p32-4`, `p32-5`, `p32-6`, `p32-7`, `p32-8` | السؤال |
| 33 | 8 | `p33-1`, `p33-2`, `p33-3`, `p33-4`, `p33-5`, `p33-6`, `p33-7`, `p33-8` | النفي |
| 34 | 8 | `p34-1`, `p34-2`, `p34-3`, `p34-4`, `p34-5`, `p34-6`, `p34-7`, `p34-8` | الوظيفة |
| 35 | 10 | `p35-1`, `p35-2`, `p35-3`, `p35-4`, `p35-5`, `p35-6`, `p35-7`, `p35-8`, `p35-9`, `p35-10` | إجابتك |

## Final test pages (§36)

| Page | Level | Questions | Kind |
|---|---:|---|---|
| `test-l1` | 1 | 1–5 | Multiple Choice |
| `test-l2-a` | 2 | 6–8 | Complete the Sentences |
| `test-l2-b` | 2 | 9–10 | Complete the Sentences |
| `test-l3-a` | 3 | 11–13 | Correct the Mistakes |
| `test-l3-b` | 3 | 14–15 | Correct the Mistakes |
| `test-l4-a` | 4 | 16–17 | Understand the Function |
| `test-l4-b` | 4 | 18–19 | Understand the Function |
| `test-l4-c` | 4 | 20 | Understand the Function |
| `test-l5-a` | 5 | 21–23 | Final IQ200 Boss |
| `test-l5-b` | 5 | 24–25 | Final IQ200 Boss |

## Slide kinds in use

| Kind | Slides | Component |
|---|---:|---|
| lesson | 69 | `Frame41` + `SourceLines41` / `NumberCards41` / `Panel41` |
| practice | 17 | `PracticeSet41` + `PracticeCard41` |
| test | 10 | `TestArea41` |
| lab | 6 | `RoleLab41`, `EngineLab41`, `BeLab41`, `DoLab41`, `HaveLab41`, `ChainLab41` |
| reading | 5 | `Reading41` |
| writing | 3 | `WritingMission41` |
| summary | 3 | `GoldenSummary41` |
| next | 3 | `NextSteps41` |
| cover | 1 | `Cover41` |
| five | 1 | `FiveSentences41` |
| testResult | 1 | `TestResult` + lazy `SolutionsArea41` |
| teacher | 1 | `TeacherArea41` (+ lazy `TeacherGuide41`) |

## Notes carried over from the source

- §37 in the source contains only its heading and a display placeholder. It is not silently filled with invented “original” text: the page renders the protected teacher access, the 25 detailed solutions (correct answer + why + teaching explanation) and the 66 practice keys are platform-authored and labelled as such.
- §38 model paragraph has eight sentences and lacks a DID example although the criteria list asks for it. The model is kept as supplied, with an explicit note that it is a partial reference; the criteria remain the requirement.
- §15 wording about DO as a main verb is kept but clarified in the slide copy (see `lesson41-source-audit.md`).
