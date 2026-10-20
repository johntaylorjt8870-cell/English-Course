# Lesson 38 — Future Perfect: source-coverage ledger

## Base and provenance

- Planned lesson route: `#/lesson/38`.
- Lesson title: **Lesson 38 — Future Perfect**.
- English subtitle: **By Tomorrow, I Will Have Finished!**.
- Arabic subtitle: **إتقان التعبير عن الإنجاز قبل نقطة مستقبلية — IQ200 🚀**.
- Level: **تأسيسي متقدم — IQ200**.
- Source of truth: the complete Lesson 38 text supplied in the implementation request.
- The supplied material has an unnumbered opening that bridges Lesson 37 (Future Continuous) and then **36 numbered source sections**. Sections keep their numbers 1–36 and receive IDs `s01`–`s36`; the opening is the separate `cover` step.
- Native student sequence: `cover`, then the 36 source sections **in source order**, split into **58 short steps**. No section is dropped and no step is a duplicate: dense sections are split into an explanatory half and a practice half (`s02` → `s02a`/`s02b`, `s30` → `s30a`/`s30b`, …). Chapters group them: ARRIVAL (cover, s01), THE FORM (s02–s05), DEADLINES (s06–s09), TWO EVENTS (s10–s13), CONTROL (s14–s19), COMPARE (s20–s25), PRACTICE (s26–s31), READ & TEST (s32–s34), WRAP UP (s35–s36).
- Section 33 is the *Future Perfect Master Test*: all **25** questions live once in the dedicated Test Area. Its student step is a launch step that keeps the source section visible and points to the test; it does not duplicate the questions.
- Section 34 (Teacher solutions area) contains only the heading and «عرض الحلول التفصيلية». The source supplies **no** answer key, so all 25 answers and explanations are **platform/teacher additions**, kept in `src/lessons/lesson38/solutionsData38.ts`, marked `platform-authored-teacher-addition`, and shown only in the gated Solutions/Teacher surfaces.

## Pre-implementation source audit notes

See `docs/lesson38-source-readability.md`. Summary:

1. **No PDFs, page images, or scans** were in the repository. The authority is the complete 36-section text in the implementation request.
2. **§2 timeline** mixed `MONDAY · WEDNESDAY · FRIDAY` with `اليوم · إنهاء المشروع · نقطة المرجع المستقبلية`. Rebuilt as a three-row table with those exact six tokens.
3. **§5 pronoun table**, **§8 AT vs BY**, **§9 expressions**, **§19 V3 tables**, **§22 future comparison**, and **§24 perfect map** lost column rules in the dump and were rebuilt without adding or rewording cells.
4. **§33** has 25 questions and **no key**. **§34** is a stub («عرض الحلول التفصيلية»).
5. Lesson 37’s preview `By 8:00 tomorrow, I will have finished my homework.` is a bridge only. Lesson 38’s own opening uses `By 8:00 tomorrow, I will have finished studying.`

## Terminology and precision contract

- Tense name: **Future Perfect (المستقبل التام)**.
- Core form: `Subject + will + have + V3`. Negation: `Subject + will not / won't + have + V3`. Yes/No: `Will + Subject + have + V3?`. Wh: `Wh-word + will + Subject + have + V3?`. Short answers: `Yes, I will.` / `No, I won't.` (no repetition of `have + V3`).
- `have` never becomes `has` after `will`.
- `by` = not later than; it does not force the action to finish at that exact moment.
- Future time clauses with `by the time` take Present Simple, not `will`.
- `by` does not automatically forbid Future Simple (§31).
- `at` vs `by` is a teaching contrast, not a ban (§8).

## Coverage ledger — all 36 numbered sections and the introduction

The in-app ledger is `src/lessons/lesson38/coverage38.ts` (37 rows). Every row's `location` is **derived at runtime** from `SLIDES_38` (`coverageLocation38`), so a coverage row and the step map can never drift: the table below names the source section; where a section is split, the derived location lists every step that carries it (`§2 → الخطوات 3 · 4`). A compact copy:

| Source | Native location | Transfer | Platform addition |
|---|---|---|---|
| المقدمة | cover | verbatim | Deadline Lab cover + Lesson 37 bridge cards |
| §1 أهداف الدرس | s01 | verbatim | 10-item self-checklist |
| §2 الفكرة الأساسية | s02 | table-rebuilt | Monday/Wednesday/Friday timeline lab |
| §3 القاعدة | s03 | verbatim | Formula builder Subject + will + have + V3 |
| §4 التحليل | s04 | verbatim | Sentence dissection + have vs has |
| §5 التصريف | s05 | table-rebuilt | Conjugation console (7 pronouns) |
| §6 الاستخدام الأول | s06 | verbatim | Four-item meaning lab |
| §7 BY | s07 | verbatim | Does by mean exactly at that time? |
| §8 AT vs BY | s08 | table-rebuilt | At 8:00 vs By 9:00 lab |
| §9 تعبيرات شائعة | s09 | table-rebuilt | Nine-expression matching |
| §10 الاستخدام الثاني | s10 | verbatim | Two-event lab |
| §11 BY THE TIME | s11 | verbatim | Present Simple vs will in the time clause |
| §12 BY vs BEFORE | s12 | verbatim | Inclusive deadline vs before |
| §13 The School Exhibition | s13 | verbatim | Six-turn dialogue reader |
| §14 النفي | s14 | verbatim | Negative builder |
| §15 معنى النفي | s15 | verbatim | Negation is about the deadline |
| §16 Yes/No | s16 | verbatim | Question builder |
| §17 Short answers | s17 | verbatim | Short-answer lab |
| §18 Wh | s18 | verbatim | Five Wh builders |
| §19 V3 | s19 | table-rebuilt | 15-verb V3 workshop |
| §20 FS vs FP | s20 | verbatim | Focus lab |
| §21 FC vs FP | s21 | verbatim | Ongoing vs completed |
| §22 ثلاثة أزمنة | s22 | table-rebuilt | write in three futures |
| §23 مختبر الزمن | s23 | verbatim | Cook dinner from three angles |
| §24 الأزمنة التامة | s24 | table-rebuilt | Present/Past/Future Perfect map |
| §25 أخطاء شائعة | s25 | verbatim | Seven error pairs as a lab |
| §26 Planning a Big Event | s26 | verbatim | Nine-turn dialogue (includes Future Continuous) |
| §27 التدريب الأول | s27 | verbatim | 6 MC + source key after attempt |
| §28 التدريب الثاني | s28 | verbatim | 6 completions + source key |
| §29 التدريب الثالث | s29 | verbatim | 8 tense choices + detailed key |
| §30 Grammar Detective | s30 | verbatim | 10 repairs + source key |
| §31 IQ200 | s31 | verbatim | Both-sentences-correct lab |
| §32 Reading | s32 | verbatim | 7 comprehension + form analysis |
| §33 Master Test | s33 + Test Area | key-missing-in-source | Independent 25-question test |
| §34 مساحة المعلم | s34 + Solutions/Teacher | key-missing-in-source | 25 platform-authored solutions |
| §35 Writing | s35 | verbatim | 12–15 sentence workspace |
| §36 الملخص | s36 | verbatim | Summary match lab |

## Table reconstruction contracts

**§2 — timeline**

| اليوم | ما يحدث على الخط الزمني |
|---|---|
| MONDAY | اليوم |
| WEDNESDAY | إنهاء المشروع |
| FRIDAY | نقطة المرجع المستقبلية |

**§5 — pronouns**

I / You / He / She / We / They → `will have finished.` · It → `It will have stopped.`

**§8 — AT vs BY**

| التعبير | ما الذي نركز عليه؟ |
|---|---|
| At 8:00 | ماذا سيكون جاريًا عند الثامنة؟ |
| By 9:00 | ما الذي سيكون قد اكتمل بحلول التاسعة؟ |

**§9 — nine time expressions** in source order: by tomorrow, by next week, by next year, by 10:00, by the end of the day, by the end of the month, by then, before Friday, by the time you arrive.

**§19 — V3** five regular + ten irregular triples, exact source verbs.

**§22 — three futures:** will + V1 · will be + V-ing · will have + V3.

**§24 — three perfects:** have/has + V3 · had + V3 · will have + V3.

## Editorial correction

§23 of the supplied text read «ستخبز أو تعد العشاء غدًا» opposite `cook dinner`. «تخبز» means *bake*, not *cook*, so the rendered line is «ستُعِدّ العشاء غدًا» (with the source wording quoted in the teacher accuracy note and in the implementation report). Nothing else in the source text was reworded.

## Test and answer provenance contract

- Source Master Test = **25** questions in five groups of five.
- `testData38.ts` consumes every source line of §33 **once**; the five level headings are rendered from their traced source units.
- **Before submission** the Test Area renders no score, no ✓/✕, no explanation and no key: the grading module (`testKey38.ts` → `solutionsData38.ts`) is loaded with `await import(...)` only inside `submit()`, so it is a separate lazy chunk and is absent from the initial student bundle.
- **After submission** every question is graded in place (model answer, rule, why the chosen option is wrong, accepted alternatives) and the Solutions/Teacher surfaces unlock.
- The Test Area never imports the solutions module statically; the shared kit imports neither. This is asserted in `scripts/audit-lesson38.mjs` (new `SECTION 6) Answer protection`).
- All 25 solutions are platform-authored teacher additions.
- Q23 (`At 3:00 on Thursday, the team ______ (test) the system.`) is Future Continuous (`will be testing`) — the paragraph’s at-vs-by trap.

## الاتجاه والتباين

English/formulas go through `Rich` / `LatinRuns` or `dir="ltr"` + `font-en`. No Unicode bidi controls, no blanket `direction: rtl !important`. Contrast is measured on rendered markup in `scripts/audit-lesson38.mjs`.

## File list

| Path | Role |
|---|---|
| `src/lessons/lesson38/ledger38.ts` | Verbatim source ledger (cover + §1–§36) |
| `src/lessons/lesson38/data.ts` | Step map: 58 short steps, 9 chapters, source ranges |
| `src/lessons/lesson38/coverage38.ts` | In-app coverage + accuracy notes |
| `src/lessons/lesson38/practiceData38.ts` | Interactive lab items and source keys |
| `src/lessons/lesson38/kit38.tsx` | Deadline Lab chrome, SourceCard, tables, buttons |
| `src/lessons/lesson38/labs38.tsx` | Student-area labs |
| `src/lessons/lesson38/Steps38.tsx` | Native step renderer |
| `src/lessons/lesson38/Lesson38.tsx` | Four-area shell |
| `src/lessons/lesson38/testData38.ts` | 25-question Master Test (source §33) |
| `src/lessons/lesson38/TestArea38.tsx` | Formal test; no key before or after submit |
| `src/lessons/lesson38/solutionsData38.ts` | 25 platform-authored solutions |
| `src/lessons/lesson38/SolutionsArea38.tsx` | Gated solutions |
| `src/lessons/lesson38/TeacherArea38.tsx` | Password `somer173` |
| `src/lessons/lesson38/TeacherGuide38.tsx` | Coverage / keys / solutions / rules |
| `src/lessons/lesson38/testKey38.ts` | Grader (dynamic import only) |
| `src/lessons/lesson38/lesson38.css` | Finish Line Studio design tokens |
| `docs/lesson38-source-readability.md` | Pre-implementation source audit |
| `docs/lesson38-coverage.md` | This ledger |
| `scripts/audit-lesson38.mjs` | Lesson 38 audit |

## Validation (jsdom / Node — not a visual browser)

- `npm run audit:lesson38` — **315 assertions** (source coverage, no source line rendered twice, 58-step map, 25×5 test, 25 solutions, grader regression 25/25 and 0/25, labs, answer protection, teacher gate, BIDI, computed contrast, responsive contract).
- `npm run check:english-direction` — 59/59 BIDI rendering assertions.
- `node scripts/audit-lesson-navigation.mjs` — hub window 29–38.
- `node scripts/audit-final-test.mjs` — dedicated Lesson 38 Master Test.
- `ONLY=38 node scripts/audit-bidi-mixed.mjs` — 0 violations.
- `npm run build` — production Vite build.

### Real-browser pass (headless Chromium, dev server on `0.0.0.0`)

58 steps were walked at 390×844, 768×1024, 1280×800 and 1920×1080 (clicking the in-app next control, measuring each step):

| Viewport | Steps | Median step height | Max step height | Steps > 2000 px | Horizontal overflow |
|---|---|---|---|---|---|
| 390×844 (mobile) | 58 | 1595 px | 2610 px (`s22`) | 13 | 0 px |
| 768×1024 (tablet) | 58 | 1222 px | 1960 px | 0 | 0 px |
| 1280×800 (laptop) | 58 | 1222 px | 1960 px | 0 | 0 px |
| 1920×1080 (desktop) | 58 | 1195 px | 1960 px | 0 | 0 px |

No page errors and no console errors on any viewport. On mobile the steps above 2000 px are the comparison tables, the 15-verb V3 workshop, the two workshop steps (30أ/30ب are split, 29أ/29ب are split) and the writing workspace; they are long because the source lists are long, not because of padding — the tables scroll inside their own container and no other content was shortened to fit. Screenshots were inspected at each viewport (cover, timeline lab, dialogue, V3 table, practice, reading, test launch, summary); the mobile title wrap that broke `Future Perfect` mid-phrase was fixed by rendering the English half of mixed headings as its own LTR line (`Title38`).
