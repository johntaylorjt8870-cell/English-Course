# Lesson 42 — source-to-implementation coverage

**Status:** rebuilt and verified. Source = the complete 44-section Arabic lesson supplied in the conversation (opening + §§1–44).

- Source blocks: **45** (cover, §1–§44).
- Normalized source units: **932** — all rendered exactly once (uncovered: **0**).
- Slides: **145** across **10** learning stations (الانطلاق، محطة CAN، محطة COULD، COULD أم ABLE TO، الاستئذان، الطلبات المهذبة، الإمكانية والاحتمال، تراكيب متقدمة، التطبيق العملي، الإتقان).
- Practice items: **46** (§16، §34، §35، §36، §37، §38، §39), each with an attempt-gated answer and explanation.
- Final test: **25** questions in **5** levels (§40), teacher key + 25 detailed solutions (§41).
- Frozen source inventory: `docs/lesson42-source-manifest.json` — every section hash **matches** the shipped ledger.

## Mapping rules

- One section never collapses into a single slide: each slide declares an explicit inclusive `range` of source units, so a section grows in slide count instead of shrinking its content.
- `SOURCE_SECTIONS_42` in `ledger42.ts` holds the transcription (one array entry per normalized line). `coveredIndexes42()` returns the units each slide renders, and `uncoveredUnits42()` must stay empty (asserted by `scripts/audit-lesson42.mjs`).
- Tables (§§5, 16, 19), dialogue turns, numbered examples and bullet lists keep their structure: `Frame42` + `SourceLines42` (auto/table/objectives/dialogue) + `NumberCards42` + `Panel42`. Pipe-separated source lines become real `<table>` rows, never separator text.
- Numbered practice prompts (§§16, 34–38) map to `PracticeCard42`; the key appears only after the student presses «قارن إجابتي بالحل», and the same keys feed `TeacherGuide42` behind the teacher gate.
- §39 “The Young Inventor” renders as a full passage slide (lines 1–14) followed by four question slides that reuse the attempt-gated practice card for all ten comprehension items.
- §40 routes to `TestArea42` only; the grader (`key42.ts`), the solutions (`SolutionsArea42.tsx`) and the teacher guide (`TeacherGuide42.tsx`) are separate lazy chunks that are not part of the student bundle or the study DOM.
- §41 is the full 25-key correction list. It is never rendered inside a student step and is **not present in `source42.ts`**: it lives in `teacherSource42.ts`, imported only by the lazy `TeacherGuide42`.
- Ten learning-station markers are attached to the first slide of their station, not rendered as separate decorative separators.

## Section → slide map

| § | Section | Units rendered / source | Slides | Where answers live |
|---|---|---:|---|---|
| 0 | الدرس 42: CAN & COULD | 18 / 18 | `cover`, `s0-scene`, `s0-why`, `s0-bridge` | داخل الشريحة |
| 1 | أهداف الدرس | 11 / 11 | `s1-a`, `s1-b` | داخل الشريحة |
| 2 | ما العلاقة بين درسنا السابق ودرس اليوم؟ | 25 / 25 | `s2-bridge`, `s2-family`, `s2-why-modal` | داخل الشريحة |
| 3 | القاعدة الأساسية للأفعال الناقصة | 22 / 22 | `s3-formula`, `s3-examples`, `s3-golden`, `lab-build-1`, `lab-build-2` | داخل الشريحة |
| 4 | لماذا لا نضيف S بعد CAN? | 17 / 17 | `s4-why-no-s`, `s4-compare`, `lab-form` | داخل الشريحة |
| 5 | التصريف مع جميع الضمائر | 12 / 12 | `s5-table`, `s5-note` | داخل الشريحة |
| 6 | الاستخدام الأول: القدرة الحالية — Present Ability | 21 / 21 | `s6-intro`, `s6-kinds` | داخل الشريحة |
| 7 | موقف تطبيقي: The Talent Show | 18 / 18 | `s7-dialogue`, `s7-translation`, `s7-question` | داخل الشريحة |
| 8 | النفي باستخدام CAN'T | 20 / 20 | `s8-formula`, `s8-examples`, `s8-note` | داخل الشريحة |
| 9 | السؤال باستخدام CAN | 21 / 21 | `s9-question`, `s9-examples`, `s9-careful` | داخل الشريحة |
| 10 | الإجابات القصيرة | 18 / 18 | `s10-short-a`, `s10-short-b`, `lab-short` | داخل الشريحة |
| 11 | أسئلة WH مع CAN | 18 / 18 | `s11-wh`, `s11-subject`, `lab-wh` | داخل الشريحة |
| 12 | الاستخدام الأول: القدرة العامة في الماضي | 17 / 17 | `s12-intro`, `s12-compare` | داخل الشريحة |
| 13 | لا تربط COULD بالماضي دائمًا! | 15 / 15 | `s13-warn`, `s13-more` | داخل الشريحة |
| 14 | النفي باستخدام COULDN'T | 16 / 16 | `s14-formula`, `s14-examples`, `s14-note` | داخل الشريحة |
| 15 | السؤال باستخدام COULD | 13 / 13 | `s15-question`, `s15-short` | داخل الشريحة |
| 16 | CAN vs COULD — مقارنة القدرة | 14 / 14 | `s16-table`, `p16-1`, `lab-time-1`, `lab-time-2` | بطاقة التدريب بعد المحاولة + TeacherGuide42 |
| 17 | الفرق المتقدم الذي يميز الطالب المتمكن | 18 / 18 | `s17-intro`, `s17-two`, `s17-rule` | داخل الشريحة |
| 18 | أمثلة إضافية على الفرق | 16 / 16 | `s18-examples`, `s18-negative`, `lab-able-1`, `lab-able-2` | داخل الشريحة |
| 19 | كيف نعبر عن القدرة في المستقبل؟ | 19 / 19 | `s19-formula`, `s19-careful`, `s19-map` | داخل الشريحة |
| 20 | طلب الإذن — Asking for Permission | 21 / 21 | `s20-intro`, `s20-examples`, `s20-difference` | داخل الشريحة |
| 21 | حوار تطبيقي: In the Classroom | 19 / 19 | `s21-dialogue`, `s21-translation`, `s21-note`, `lab-permission` | داخل الشريحة |
| 22 | تقديم الطلبات — Making Requests | 19 / 19 | `s22-intro`, `s22-examples` | داخل الشريحة |
| 23 | هل COULD تعني الماضي في الطلبات؟ | 15 / 15 | `s23-answer`, `s23-compare` | داخل الشريحة |
| 24 | كيف نجيب عن الطلبات بصورة طبيعية؟ | 27 / 27 | `s24-responses`, `s24-difference`, `lab-response` | داخل الشريحة |
| 25 | حوار تطبيقي: At the Library | 14 / 14 | `s25-dialogue`, `s25-analysis` | داخل الشريحة |
| 26 | CAN للتعبير عن الإمكانية العامة | 15 / 15 | `s26-can`, `s26-analysis` | داخل الشريحة |
| 27 | COULD للتعبير عن الاحتمال | 15 / 15 | `s27-could`, `s27-note` | داخل الشريحة |
| 28 | CAN vs COULD في الإمكانية | 14 / 14 | `s28-compare`, `s28-more`, `s28-rule` | داخل الشريحة |
| 29 | COULD لتقديم الاقتراحات | 19 / 19 | `s29-suggest`, `s29-difference`, `s29-dialogue`, `lab-possibility` | داخل الشريحة |
| 30 | الفرق بين CAN وBE ABLE TO | 14 / 14 | `s30-can-able`, `s30-why` | داخل الشريحة |
| 31 | الأخطاء العشرة الأكثر شيوعًا | 26 / 26 | `s31-errors-a`, `s31-errors-b`, `s31-rule`, `lab-repair-1`, `lab-repair-2` | داخل الشريحة |
| 32 | مختبر المعاني: جملة واحدة قد تحمل أكثر من وظيفة | 17 / 17 | `s32-meaning`, `s32-second`, `lab-meaning` | داخل الشريحة |
| 33 | الحوار الشامل: The School Adventure | 22 / 22 | `s33-dialogue`, `s33-analysis`, `lab-adventure-1`, `lab-adventure-2` | داخل الشريحة |
| 34 | التدريب الأول: اختر CAN أو COULD | 18 / 18 | `p34-1`, `p34-2`, `p34-3` | بطاقة التدريب بعد المحاولة + TeacherGuide42 |
| 35 | التدريب الثاني: حوّل إلى النفي | 11 / 11 | `p35-1`, `p35-2` | بطاقة التدريب بعد المحاولة + TeacherGuide42 |
| 36 | التدريب الثالث: حوّل إلى السؤال | 11 / 11 | `p36-1`, `p36-2` | بطاقة التدريب بعد المحاولة + TeacherGuide42 |
| 37 | التدريب الرابع: COULD أم WAS/WERE ABLE TO? | 29 / 29 | `p37-1`, `p37-2` | بطاقة التدريب بعد المحاولة + TeacherGuide42 |
| 38 | Grammar Detective — اكتشف الأخطاء | 22 / 22 | `p38-1`, `p38-2`, `p38-3`, `p38-4` | بطاقة التدريب بعد المحاولة + TeacherGuide42 |
| 39 | Reading Challenge — A New Skill | 37 / 37 | `read-passage-1`, `read-passage-2`, `read-q-1`, `read-q-2`, `read-q-3`, `read-q-4` | بطاقة التدريب بعد المحاولة + TeacherGuide42 |
| 40 | الاختبار النهائي — CAN & COULD Master Test | 60 / 60 | `test-l1-a`, `test-l1-b`, `test-l2-a`, `test-l2-b`, `test-l3-a`, `test-l3-b`, `test-l4-a`, `test-l4-b`, `test-l4-c`, `test-l5-a`, `test-l5-b`, `test-l5-c`, `test-l5-d`, `test-result` | TestArea42 ثم SolutionsArea42 (بعد التسليم) |
| 42 | Writing Mission — My Abilities: Past, Present & Future | 25 / 25 | `write-editor`, `write-criteria`, `write-checklist`, `write-model` | داخل الشريحة |
| 43 | الملخص الذهبي — CAN & COULD | 41 / 41 | `summary-can`, `summary-could`, `summary-forms`, `summary-advanced` | داخل الشريحة |
| 44 | خريطة تقدم المنهج والمحطة القادمة | 16 / 16 | `next-progress`, `next-may`, `next-close` | داخل الشريحة |
| 41 | مساحة المعلم — الحلول التفصيلية للاختبار النهائي | 56 / 56 | `teacher` → lazy `TeacherGuide42` | مساحة المعلم فقط — معزولة في `teacherSource42.ts` |

## Learning stations

| Station | Slides | Sections |
|---|---:|---|
| 🚀 الانطلاق (Orientation & the V1 Rule) | 19 | §§0–5 |
| 💪 محطة CAN (Present Ability) | 17 | §§6–11 |
| ⏳ محطة COULD (Past Ability) | 12 | §§12–16 |
| 🔬 COULD أم ABLE TO (General vs Specific) | 10 | §§17–19 |
| 🚪 الاستئذان (Asking for Permission) | 7 | §§20–21 |
| 🤝 الطلبات المهذبة (Can You vs Could You) | 9 | §§22–25 |
| 🌍 الإمكانية والاحتمال (Possibility & Suggestion) | 11 | §§26–29 |
| 🧠 تراكيب متقدمة (Meaning, Errors & Context) | 14 | §§30–33 |
| ✍️ التطبيق العملي (Practice & Reading) | 20 | §§16–39 |
| 🏆 الإتقان (Assessment & Writing) | 26 | §§40–44 |

## Practice sets (attempt-gated)

| § | Items | Slides | Delivery |
|---|---:|---|---|
| 16 | 3 | `p16-1` | `PracticeSet42` + `PracticeCard42` |
| 34 | 8 | `p34-1`, `p34-2`, `p34-3` | `PracticeSet42` + `PracticeCard42` |
| 35 | 5 | `p35-1`, `p35-2` | `PracticeSet42` + `PracticeCard42` |
| 36 | 5 | `p36-1`, `p36-2` | `PracticeSet42` + `PracticeCard42` |
| 37 | 5 | `p37-1`, `p37-2` | `PracticeSet42` + `PracticeCard42` |
| 38 | 10 | `p38-1`, `p38-2`, `p38-3`, `p38-4` | `PracticeSet42` + `PracticeCard42` |
| 39 | 10 | `read-passage-1`, `read-passage-2`, `read-q-1`, `read-q-2`, `read-q-3`, `read-q-4` | `PracticeSet42` عبر شرائح القراءة |
| — | 46 | — | المجموع الكلي لبنود التدريب (بما فيها أسئلة الفهم العشرة) |

## Final test pages (§40)

| Slide | Level | Items | Level title |
|---|---:|---|---|
| `test-l1-a` | 1 | 1–3 | المستوى الأول: اختر الإجابة الصحيحة |
| `test-l1-b` | 1 | 4–5 | المستوى الأول: اختر الإجابة الصحيحة |
| `test-l2-a` | 2 | 6–8 | المستوى الثاني: أكمل الجمل |
| `test-l2-b` | 2 | 9–10 | المستوى الثاني: أكمل الجمل |
| `test-l3-a` | 3 | 11–13 | المستوى الثالث: صحح الأخطاء |
| `test-l3-b` | 3 | 14–15 | المستوى الثالث: صحح الأخطاء |
| `test-l4-a` | 4 | 16–17 | المستوى الرابع: فهم المعنى |
| `test-l4-b` | 4 | 18–19 | المستوى الرابع: فهم المعنى |
| `test-l4-c` | 4 | 20–20 | المستوى الرابع: فهم المعنى |
| `test-l5-a` | 5 | 21–22 | المستوى الخامس: Final IQ200 Boss |
| `test-l5-b` | 5 | 23–23 | المستوى الخامس: Final IQ200 Boss |
| `test-l5-c` | 5 | 24–24 | المستوى الخامس: Final IQ200 Boss |
| `test-l5-d` | 5 | 25–25 | المستوى الخامس: Final IQ200 Boss |

| Level | Function tested | Questions |
|---:|---|---|
| 1 | القدرة الحالية مع CAN · ثبات الفعل الناقص مع جميع الضمائر · القدرة العامة في الماضي مع COULD · الطلب المهذب بـ Could you...? · بناء السؤال بلا do-support · النفي في الماضي couldn't · التقابل مع but I can · القدرة المستقبلية will be able to | 1, 2, 3, 4, 5 |
| 2 | النفي can't / cannot + V1 · بناء السؤال: CAN/COULD + Subject + V1 · COULD للقدرة العامة في الماضي · was/were able to للنجاح في موقف ماضٍ محدد · القدرة المستقبلية will be able to + V1 | 6, 7, 8, 9, 10 |
| 3 | لا يوجد cans — ثبات الفعل الناقص · بناء السؤال بلا do-support · COULD + V1 لا V2 · will be able to بدل will can · لا to بعد COULD | 11, 12, 13, 14, 15 |
| 4 | التمييز بين القدرة الحالية والقدرة العامة في الماضي · COULD للطلب المهذب في الحاضر · COULD للاحتمال المستقبلي · was able to لإبراز النجاح في موقف ماضٍ محدد · المعنى يحدده السياق: قدرة أم طلب | 16, 17, 18, 19, 20 |
| 5 | سؤال عن القدرة الحالية · عدم القدرة في الماضي couldn't · طلب المساعدة بصورة مهذبة Could you...? · تقديم اقتراح We could... · القدرة المستقبلية will be able to | 21, 22, 23, 24, 25 |

## Slide kinds in use

| Kind | Slides | Component |
|---|---:|---|
| lesson | 82 | `Frame42` + `SourceLines42` / `NumberCards42` / `Panel42` |
| lab | 17 | `BuildLab42`, `FormLab42`, `ShortLab42`, `WhLab42`, `TimeLab42`, `AbleLab42`, `PermissionLab42`, `ResponseLab42`, `PossibilityLab42`, `RepairLab42`, `MeaningLab42`, `AdventureLab42` |
| practice | 14 | `PracticeSet42` + `PracticeCard42` |
| test | 13 | `TestArea42` |
| reading | 6 | `Reading42` |
| summary | 4 | `GoldenSummary42` |
| writing | 3 | `WritingMission42` |
| next | 3 | `NextSteps42` |
| cover | 1 | `Cover42` |
| testResult | 1 | `TestResult` + lazy `SolutionsArea42` |
| teacher | 1 | `TeacherArea42` (+ lazy `TeacherGuide42`) |

## Documented changes from the supplied source

The source text itself is unaltered: every section hash matches `docs/lesson42-source-manifest.json`, so no teaching point, example, table, dialogue, key or writing requirement was rewritten, summarized or dropped. The three changes below are technical, not educational:

1. **§41 moved to `teacherSource42.ts`.** In the supplied source the final-test answer key sits in §41 of the same document as the teaching text. Because `ledger42.ts` is statically imported by the student bundle, keeping §41 there shipped the complete key inside `index-*.js` (verified: a baseline build of `HEAD` contains §41's reason strings). §41 is now a separate module imported only by the lazy `TeacherGuide42`. Reassembly of the two files is byte-identical to the original `source42.ts`.
2. **35 slide `range` upper bounds corrected.** Thirty-five slides declared an inclusive upper bound one past the end of their section (for example `[14, 19]` for a 19-line section). `sectionLines42` slices `range[1] + 1`, so the extra index rendered nothing and no content was lost, but the ranges were arithmetically wrong and inflated the coverage table to `19 / 18`. All bounds are now inclusive and in range; two of them (`s28-rule`, `next-close`) pointed only at a phantom index and now render their intended real unit.
3. **§39 passage slice narrowed from `slice(1, 16)` to `slice(1, 15)`.** Line 15 is the Arabic heading «أسئلة الفهم», which was being rendered as an LTR paragraph inside the English passage. The passage now renders lines 1–14 only.

No source section was renumbered and no original section label was changed. §41 keeps its source heading in the teacher area.

## Protection model (stated plainly)

- The student bundle contains **no** §41 text and **no** `SOLUTIONS_42` table. Verified against the built `dist/assets/index-*.js` and against the esbuild chunk graph in `scripts/audit-lesson42.mjs`.
- `key42.ts` is loaded by `TestArea42` through `await import("./key42")` **at submission time only**; `TestArea42` imports it for types elsewhere, which the bundler erases.
- The teacher gate is a **client-side** lock, exactly like every other lesson in this course. It separates the content from the student path and defers loading it; it is **not** server-side security. Anyone who can read the built bundle can read the keys. The gate says so in the UI, in both its locked and unlocked states.
