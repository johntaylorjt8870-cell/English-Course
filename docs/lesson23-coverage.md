# Lesson 23 coverage ledger — Countable & Uncountable Nouns

## Scope and fidelity contract

Lesson 23 (`الدرس 23: Countable & Uncountable Nouns` — الأسماء المعدودة وغير
المعدودة) is added to the existing course. Nothing in Lessons 1–22 was
rewritten, restyled, or shortened: the only shared-file changes are quiz
registration, App registration, and validation-script registration.

| Ledger item | Result |
| --- | --- |
| Authoritative source sections | **57** (`SOURCE_SECTIONS`, indices 0–56, source order) |
| `SOURCE_SECTIONS` headings rendered on-slide | **57** — every source-mapped slide renders its own heading box, which carries the `data-source-section="N"` marker |
| Slides | **60**: cover + 57 source-mapped slides + shared final quiz + closing |
| Source-mapped slides | **57** (each `sourceIndex` 0–56 appears exactly once) |
| Dedicated source practice experiences | **8**: Training ①, Training ②, Training ③, Training ④, Grammar Detective, IQ200 Challenge, Thinking Challenge, FINAL BOSS |
| Interactive lab visualizations | **56** `data-en-seq` boards: 44 source-mapped lesson labs (`l23-opening`, `l23-machine`, `l23-magic-test`, `l23-two-forms`, `l23-water`, `l23-rice`, `l23-chicken`, `l23-coffee`, `l23-there-bridge`, `l23-there-golden`, `l23-kitchen`, `l23-some`, `l23-some-any`, `l23-how-many`, `l23-how-much`, `l23-battle`, `l23-money`, `l23-information`, `l23-advice`, `l23-furniture`, `l23-homework`, `l23-three-test`, `l23-common-errors`, `l23-many-much`, …) + Golden Summary / Magic Table / Seven Rules / Roadmap boards + the 8 practice boards |
| Shared final quiz questions | **12** (`QUIZZES[23]`) |
| Intentional source errors preserved verbatim | **41** (`INTENTIONALLY_WRONG_23`) |
| English units of the supplied source present verbatim | **312 / 312** unique English units, in the source files and in the rendered lesson |
| New runtime dependencies | **None** |
| Branding | `EnglishwithSomeR` only; no country-flag branding added |

## Source-section to implementation map

| # | Authoritative source heading | Source data / slide implementation | Presentation or interaction |
| ---: | --- | --- | --- |
| 0 | الافتتاح — ربط مع الدروس السابقة | `OpeningRecall()` | `There is a book on the desk.` / `There are three chairs…` bridge into counting, plus the lesson's key words. |
| 1 | 🎯 أهداف الدرس | `Objectives()` → `OBJECTIVES_23` | All ten objectives ①–⑩ with the countable/uncountable chip strip. |
| 2 | 🧠 أولًا: ما معنى Countable؟ | `CountingMachine()` | 12-word selector feeding a COUNTING MACHINE panel: each word shows its `one …` / `two …` forms with ✅ or ❌, plus the `1 · 2 · 3 …` number strip. |
| 3 | ⭐ أمثلة على Countable Nouns | `CountableExamples()` | All 15 supplied `a book / two books`-style example pairs, unmodified. |
| 4 | 🧠 الاختبار السحري | `MagicTest()` | The supplied question «هل أستطيع وضع رقم قبله؟» with a word selector and number chips (1, 2, 3, 5, 10, 20) that build `N + word ✅`. |
| 5 | 🔥 Countable لها شكلان | `TwoForms()` | Singular ↔ plural toggle over the supplied forms (`a book` → `two books`, …). |
| 6 | 🧠 تذكر | `RememberBoard()` | `a / an + singular countable noun` board with all supplied examples. |
| 7 | 🚨 الآن المفاجأة — Uncountable Nouns | `UncountableIntro()` | All 12 supplied uncountable words + the Arabic explanation of why they are not counted. |
| 8 | 💧 مثال الماء | `WaterLab()` | Material ↔ units toggle. Both groups stay rendered: the crossed-out `one water / two waters / three waters`, the "we say" `some water`, and the unit expressions `a bottle of water / two bottles of water / three bottles of water` + the smart note. |
| 9 | 🍚 مثال الأرز | `RiceLab()` | Material ↔ units toggle: crossed-out `one rice / two rices / three rices`, `some rice`, and `a bag of rice / two bags of rice / three bags of rice` + the smart note. |
| 10 | 🧠 الفرق الأساسي | `CoreDifference()` | Countable = count the thing itself / Uncountable = count the amount, with both formula strips. |
| 11 | ⭐ مقارنة ذكية | `SmartCompare()` | The supplied side-by-side countable/uncountable comparison rows. |
| 12 | 🚨 قاعدة مهمة جدًا (a / an) | `AanRule()` | `a / an` only with singular countable; uncountable takes no `a / an`; every supplied right and wrong example kept. |
| 13 | 🧠 لماذا؟ | `WhyRule()` | The Arabic "why" explanation with the `a water ❌` / `some water ✅` pair. |
| 14 | ⭐ لكن انتبه! (المطعم) | `RestaurantException()` | The restaurant/portions exception exactly as supplied. |
| 15 | 🧠 الأسماء غير المعدودة غالبًا لا تأخذ جمعًا | `NoPluralRule()` | No-plural rule with `informations ❌`, `advices ❌`, `furnitures ❌`, `homeworks ❌` kept intact. |
| 16 | 🔥 كلمات مهمة جدًا يجب حفظها | `ImportantWords()` | All 17 supplied must-memorize words with their Arabic glosses. |
| 17 | 🧠 لكن هنا يجب أن نكون أذكياء — chicken | `ChickenContext()` | Animal ↔ meat toggle: `a chicken / two chickens` (countable) versus `some chicken` (meat, uncountable), plus the supplied explanation. |
| 18 | 🥤 مثال آخر: coffee | `CoffeeContext()` | `a coffee / two coffees` (cups in a café) versus `some coffee` (the drink), as supplied. |
| 19 | 🧠 قاعدة المستوى الأساسي | `BasicLevelRule()` | The basic-level rule board exactly as supplied. |
| 20 | 🔗 العلاقة مع There is / There are | `ThereBridge()` | The bridge from Lesson 22 `There is / There are` to countable/uncountable with all supplied examples. |
| 21 | ⭐ قاعدة ذهبية (There is / There are) | `ThereGoldenRule()` | `There is + singular / uncountable`, `There are + plural` with `There is some milk.`, `Is there any milk?`, `There isn't any milk.` |
| 22 | 🧪 لنحلل المطبخ | `KitchenAnalysis()` | The kitchen analysis rows (apples, eggs, milk, water, rice, cheese …) exactly as supplied. |
| 23 | 🧠 الآن: some | `SomeLab()` | Meaning, use, and position of `some` with the supplied formula. |
| 24 | ⭐ أمثلة some | `SomeExamples()` | All supplied `some …` examples. |
| 25 | 🚨 انتبه — some book / some books | `SomeAttention()` | The `some book` vs `some books` warning kept verbatim, wrong form struck through. |
| 26 | 🧠 some أمام نوعين | `SomeTwoTypes()` | `some` in front of plural countable and in front of uncountable, both groups. |
| 27 | 🔥 الآن any | `AnyLab()` | `any` in questions and negatives with all supplied examples. |
| 28 | ⭐ مقارنة some / any | `SomeAnyCompare()` | Countable/uncountable highlight toggle; all six supplied rows are rendered at once (three `some`, three `any`). |
| 29 | 🧠 الآن نصل إلى سؤالين مهمين جدًا | `TwoQuestionsIntro()` | The two-question introduction with the supplied Arabic explanation. |
| 30 | 🔢 How many? | `HowManyLab()` | `How many + plural countable noun` formula, all supplied questions, including the kept-wrong `How much books do you have?` |
| 31 | 💧 How much? | `HowMuchLab()` | `How much + uncountable noun` formula, all supplied questions, including the kept-wrong `How many water do you drink?` |
| 32 | 🧠 مفتاح خارق | `SuperKey()` | The supplied "super key" (many → countable, much → uncountable) with examples. |
| 33 | ⚔️ المعركة الكبرى | `BigBattle()` | Word selector plus a `many` / `much` gate: the student picks the gate, then the sentence and the correct answer are revealed (selection first, feedback on press). |
| 34 | ⭐ أمثلة متقدمة قليلًا | `AdvancedExamples()` | All supplied advanced examples (`How many children are in the park?`, `How much money do you have?`, …). |
| 35 | 🧠 نقطة مهمة جدًا عن money | `MoneyLab()` | `money` uncountable / `coins`, `dollars` countable, with `I have three money. ❌` kept wrong. |
| 36 | 🧠 نقطة مهمة جدًا عن information | `InformationLab()` | `a piece of information`, `two pieces of information`, `an information ❌`, `informations ❌`, `I need an information. ❌` |
| 37 | 🧠 نقطة مهمة جدًا عن advice | `AdviceLab()` | `a piece of advice`, `two pieces of advice`, `advices ❌`, `an advice ❌`, `She gave me an advice. ❌` |
| 38 | 🪑 نقطة مهمة عن furniture | `FurnitureLab()` | `a piece of furniture`, `three pieces of furniture`, `a furniture ❌`, `furnitures ❌` |
| 39 | 📝 نقطة مهمة عن homework | `HomeworkLab()` | `homework` uncountable, `homeworks ❌`, `a homework ❌` |
| 40 | 🧠 Countable vs Uncountable — وجهًا لوجه | `FaceToFace()` | The face-to-face comparison table rows exactly as supplied. |
| 41 | ⭐ كيف أختبر أي كلمة؟ | `ThreeQuestionTest()` | The three supplied test questions with a word selector running each word through `one? two? natural plural?` |
| 42 | 🧠 لكن هناك فخ! | `TrapNote()` | The trap note verbatim, wrong forms struck through. |
| 43 | 🚨 أخطاء شائعة جدًا | `CommonErrors()` | All six supplied common errors with their corrections. |
| 44 | 🧠 IQ200: لا تحفظ «much = غير معدود» فقط! | `ManyMuchIQ()` | The IQ200 many/much point with all supplied sentences. |
| 45 | 🔥 تدريب ① — Countable أم Uncountable؟ | `Training1Ex()` | 12 words from the source. Neutral selection → «تحقق من الإجابات» → per-item marks + score + reset. |
| 46 | 🔥 تدريب ② — a/an أم some؟ | `Training2Ex()` | 8 supplied items, same neutral-check-feedback lifecycle. |
| 47 | 🔥 تدريب ③ — There is أم There are؟ | `Training3Ex()` | 8 supplied sentences, same lifecycle. |
| 48 | 🔥 تدريب ④ — How many أم How much؟ | `Training4Ex()` | 8 supplied questions, same lifecycle. |
| 49 | 🕵️ Grammar Detective | `DetectiveEx()` | All 10 supplied sentences; the student first classifies the noun, then decides correct/wrong; the reveal panel keeps every supplied correction (1, 3, 5, 7, 9 wrong; 2, 4, 6, 8, 10 correct). |
| 50 | 🚀 IQ200 Challenge | `IQ200Ex()` | All 8 supplied sentences; only ⑧ `He gave me two pieces of advice.` is correct. See "Derived content" for ①–⑦. |
| 51 | 🧠 تحدي التفكير | `ThinkingEx()` | 6 supplied quantities; the student writes a `There is / There are` sentence for each, with check + reveal. |
| 52 | 🏆 FINAL BOSS | `FinalBossEx()` | 8 room items (`FINAL_BOSS_23_ITEMS`), 8 description sentences (`FINAL_BOSS_23_SENTENCE_TARGET`), 2 `How many` + 2 `How much` questions drawn from `FINAL_BOSS_23_QUESTION_BANK`, and the 6 `FINAL_BOSS_23_REQUIREMENTS`. |
| 53 | 🧠 الخلاصة الذهبية | `GoldenSummary()` | Every Golden Summary line preserved. |
| 54 | ⭐ الجدول السحري | `MagicTable()` | The magic table rows (countable / uncountable / unit expressions) in an LTR-isolated table. |
| 55 | 🔥 أهم 7 قواعد في الدرس | `SevenRules()` | All seven rules, in order. |
| 56 | 🗺️ أين وصلنا في المنهج؟ | `Roadmap()` | Full roadmap 1–23 with Lesson 23 highlighted + the supplied next-lesson preview line `some / any / much / many / a lot of / lots of / a few / few / a little / little` (shown whole and as chips). |

Slides 58 and 59 are the shared final quiz (`<FinalQuiz lesson={23} />`) and the
closing card; the cover (slide 0) carries the lesson title, subtitle, and
`EnglishwithSomeR` branding.

## Exact examples, locations, and intentional errors preserved

Every intentional wrong example below is rendered exactly as supplied (struck
through where the source marks it wrong, never silently corrected). They are
also enumerated in `INTENTIONALLY_WRONG_23` (41 entries) and asserted by the
render audit.

| Intentional source error | Supplied correction / status in the lesson |
| --- | --- |
| `a water` | `some water` / `a bottle of water` |
| `a milk` | `some milk` / `a glass of milk` |
| `a rice` | `some rice` / `a bag of rice` |
| `one water`, `two waters`, `three waters` | `some water`, `two bottles of water`, … |
| `one rice`, `two rices`, `three rices` | `some rice`, `three bags of rice`, … |
| `I have a water.` | `I have some water.` |
| `I have three money.` | `I have three dollars / some money.` |
| `some informations`, `informations`, `an information`, `I need an information.`, `I need two informations.` | `a piece of information`, `two pieces of information` |
| `some advices`, `advices`, `an advice`, `She gave me an advice.`, `He gave me an advice.` | `a piece of advice`, `two pieces of advice` |
| `some furnitures`, `furnitures`, `a furniture`, `She has a furniture.` | `a piece of furniture`, `three pieces of furniture` |
| `a homework`, `homeworks` | `some homework` (homework is uncountable) |
| `some book` | `some books` (plural countable) |
| `There are some water`, `There are some water in the glass.` | `There is some water in the glass.` |
| `There are some milk in the fridge.` | `There is some milk in the fridge.` |
| `There is two apples on the table.` | `There are two apples on the table.` |
| `There is some books in my bag.` | `There are some books in my bag.` |
| `She bought three bread.` | `She bought three loaves of bread.` |
| `How much books do you have?`, `How much chairs are there?` | `How many books …?`, `How many chairs …?` |
| `How many water do you drink?`, `How many rice do we need?` | `How much water …?`, `How much rice …?` |
| `I have two waters.` | `I have two bottles of water.` (Grammar Detective ①) |
| `I need three informations.` | `I need three pieces of information.` (Detective ⑦) |

## Derived content (authored around the source, flagged)

These items are **not** verbatim from the supplied source; they were written so
that an interaction can give feedback, and each one restates a rule that *is*
in the source. Everything else in the lesson is verbatim.

| Item | What was authored | Source rule it restates |
| --- | --- | --- |
| IQ200 Challenge ①–⑦ | The Arabic correction/explanation shown for the seven wrong sentences (the source supplies the sentences and marks ⑧ as the only correct one). | Sections 12, 15, 21, 36, 37, 38, 43. |
| FINAL BOSS `model` sentences | One model sentence per room item, revealed only after «تحقق من الإجابات». | Sections 21, 30, 31, 34 (There is/are, How many/much patterns). |
| `FINAL_BOSS_23_QUESTION_BANK` | 3 `How many` + 3 `How much` questions (the lesson requires 2 + 2 from the source). | Sections 30, 31. |
| Training ①–④ `why` notes | The short Arabic reason shown after checking. | Sections 2, 12, 21, 30–32. |
| Arabic UI copy | Slide subtitles, lab labels, buttons, rail section names. | Interface only — no source sentence was altered. |

## Shared final quiz and Teacher's Space

Lesson 23 uses the existing shared implementation:

```tsx
<FinalQuiz lesson={23} accent="bg-indigo-700" />
```

The twelve new records live only in `src/shared/quizBank.ts` under
`QUIZZES[23]`. They cover:

| Quiz coverage | Questions |
| --- | --- |
| Uncountable noun identification (`furniture`) | 1 |
| `a` / `an` with singular countable | 2 |
| Wrong sentence detection (`I need a rice.`) | 3 |
| `any` in a question | 4 |
| `any` in a negative | 5 |
| `There is` with uncountable | 6 |
| `There are` with plural countable | 7 |
| `How much` with uncountable | 8 |
| `How many` with plural countable | 9 |
| `much` + uncountable `information` (correct sentence) | 10 |
| Unit expressions (`two bottles of water`) | 11 |
| `a piece of advice` | 12 |

Because the shared `FinalQuiz` and `TeachersSpace` are reused unchanged, the
existing lifecycle stays intact: no answer key is exposed before the student
presses «تحقق من الإجابات», and Teacher's Space stays locked behind password
`63971`.

## Direction and rendering safeguards

- Lesson shell is Arabic `dir="rtl"` (`id="l23-main"`).
- All English words, sentences, formulas, options, tables, chips, and built
  sentences are LTR-isolated through the `En` wrapper (`dir="ltr"` +
  `direction: ltr` + `.font-en`), the `ltr-row` class, and `LatinRuns` from
  `src/shared/bidi.tsx`. Arabic-only labels are never wrapped in LTR, so
  trailing ✓/✗ marks keep their side.
- Subject → Verb → Object order holds in every rendered board; `a book`,
  `an apple`, `two books`, `five cars`, `some water`, `a bottle of water`,
  `There is a book on the desk.`, `How many books do you have?`,
  `a piece of information`, and the rest of the sensitive list are asserted
  verbatim, and reversed forms (`water some`, `apple an`, `books are a`) are
  asserted absent, including across stripped element boundaries.
- Each `data-en-seq` board renders its English runs in a fixed order, checked
  per board in the render audit.
- No flag branding is introduced; the course brand remains `EnglishwithSomeR`.

## Registration

Only Lesson 23 registration was added to `src/App.tsx`:

- Import of `Lesson23` (plus `SLIDES as L23_SLIDES`), consistent with
  Lessons 1–22.
- One hub card with `#/lesson/23` and dynamic `L23_SLIDES.length` statistics.
- One `route === 23` branch.

`src/shared/quizBank.ts` gained only the `23: [...]` block (12 questions).
`src/shared/FinalQuiz.tsx`, `src/shared/TeachersSpace.tsx`,
`src/shared/SitePasswordGate.tsx`, and `src/shared/bidi.tsx` are untouched.

Validation scripts were extended, not relaxed:

- `scripts/check-english-direction.mjs`: lesson inventory `22 → 23`; 15 new
  `["lesson23", …]` `LTR_SPOTS` entries (Cover, SourceLine, FormulaStrip,
  CountingMachine, MagicTest, WaterLab, ThereGoldenRule, HowManyLab,
  HowMuchLab, BigBattle, InformationLab, MagicTable, GoldenSummary, Drill,
  FinalBossEx); the Lesson 22 quizBank slice bounded by `23: [`; and a full
  Lesson 23 fidelity block (source-section count, slide count, every exercise
  type, intentional-error strings, App/quiz registration, reversed-order
  scans). No earlier assertion was changed or removed.
- `scripts/audit-render-direction.mjs`: Lesson 23 components are bundled and
  SSR-rendered; a full-course coverage block was added (23 lesson folders,
  `LessonN.tsx`/`data.ts` presence, App route per lesson, `QUIZZES[n]`
  non-empty), plus the Lesson 23 block: every slide renders, is >200 chars,
  contains `dir="ltr"`, and carries `data-source-section` when
  `sourceIndex !== undefined`; `L23_SLIDES.length` and
  `L23_SOURCE_SECTIONS.length` checks; all 8 exercise types; every supplied
  English unit and every `INTENTIONALLY_WRONG_23` entry in the plain text;
  `QUIZZES[23].length === 12`; per-board `data-en-seq`; full-lesson render
  keeps `dir="rtl"` with `dir="ltr"` islands; no GB flag; branding intact.
- `scripts/interaction-test.mjs`: lesson list extended to include 22 and 23,
  and Lesson 23 slides are mounted in jsdom to assert the neutral →
  check → feedback lifecycle of every exercise.

## Validation record

Commands:

```bash
npm run build
npm run check:english-direction
npm run audit:english-direction
node scripts/interaction-test.mjs
```

Final validation run on 2026-09-18 (UTC):

- `npm run build` passed (`✓ built in 4.02s`); output is a single-file dist
  bundle (`dist/assets/index-*.js` ≈ 2272.85 kB / gzip ≈ 510.45 kB,
  CSS ≈ 122.72 kB). The only build message is the pre-existing
  "chunks are larger than 500 kB" advisory, which also applied before this
  lesson.
- `npm run check:english-direction` passed **1314 assertions** across all
  **23 lessons** (baseline before Lesson 23: 1121 / 22 lessons).
- `npm run audit:english-direction` passed **1381 assertions** (baseline:
  1043), including the Lesson 23 SSR block and the new full-course coverage
  block.
- `node scripts/interaction-test.mjs` passed **372 assertions, 0 failed**
  (baseline: 189), of which **154** are Lesson 23 slide-level interaction
  assertions; lessons 1, 10, 13, 17, 19, 20, 21, 22, 23 all pass the shared
  quiz lifecycle checks (neutral pre-check state, `أجبت عن N / N`, post-check
  marks/explanations/score/lock, `border-emerald-300`, reset, wrong password
  `99999` rejected, `63971` unlock with `Unlocked` + `الإجابة الصحيحة`).
- Source-fidelity sweep: **312 / 312** unique English units extracted from the
  supplied source are present in `src/lessons/lesson23/data.ts` +
  `src/lessons/lesson23/Lesson23.tsx` **and** in the SSR-rendered output of
  all 60 slides (the earlier gap — quantifier preview line,
  `three bottles of water`, `two/three bags of rice`, `There is some milk.`,
  `Is there any milk?`, `There isn't any milk.` — was closed by rendering
  both sides of the Water/Rice toggles and both `some`/`any` groups at once).
- Lessons 1–22: no content file was modified. `git diff --stat` shows changes
  only in `src/App.tsx`, `src/shared/quizBank.ts`, and the three validation
  scripts; `src/lessons/lesson1…lesson22/` is untouched.
