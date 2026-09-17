# Lesson 21 coverage ledger — There is / There are

## Scope and fidelity contract

**Lesson:** الدرس 21: `There is / There are`

**Arabic title:** يوجد / توجد — وصف وجود الأشياء والأشخاص

**Experience name:** `SCENE DETECTIVE LAB`

The supplied Lesson 21 material is represented as source data in
`src/lessons/lesson21/data.ts`. The lesson does not replace the supplied
material with a shortened summary: source headings, explanations, examples,
intentional errors, corrections, the 10-mistake Grammar Detective, the four
challenges, both IQ200 challenges, the kitchen investigation, the Final Boss
mysterious room, the Golden Summary, the mind map, and the roadmap are
retained as structured data and rendered by `Lesson21.tsx`.

| Ledger item | Result |
| --- | --- |
| Authoritative numbered source sections | **48** (`SOURCE_NUMBERED_COUNT_21`) |
| `SOURCE_SECTIONS` headings | **48**, in source order |
| Planned slide sequence | **51**: cover + 48 source-mapped slides + shared final quiz + closing |
| Source-mapped slides | **48** (`sourceIndex: 0…47`) |
| Dedicated source practice experiences | **9**: Detective, Solutions, Challenge 1, Challenge 2, Challenge 3, Challenge 4, IQ200, IQ200 Challenge 2 (kitchen investigation), Final Boss |
| Shared final quiz questions | **12** (`QUIZZES[21]`) |
| New runtime dependencies | **None** (`jsdom` added as a devDependency for the interaction test only) |

## Source-section to implementation map

All source slides carry `sourceIndex` and render a `data-source-section`
marker. The slide data is in `SLIDES` in `data.ts`; the named renderers are in
`src/lessons/lesson21/Lesson21.tsx`.

| # | Authoritative source heading | Source data / slide implementation | Presentation or interaction |
| ---: | --- | --- | --- |
| 0 | أهداف الدرس | `OBJECTIVES_21` → `Objectives()` | Stated outcomes list. |
| 1 | ما معنى There is / There are؟ | `MEANING_21` → `MeaningBoard()` + `ExistenceDetector()` | ONE / MORE → is / are detector. |
| 2 | لماذا نحتاج هذه القاعدة؟ | `WHY_21` → `WhyRuleBoard()` | Full rule rationale. |
| 3 | الفرق في طريقة التفكير | `THINKING_21` → `ThinkingBoard()` | Singular/plural thinking split. |
| 4 | There is + اسم مفرد | `SINGULAR_EXAMPLES_21` → `SingularExamples()` | Named examples (cat, computer, tree, apple, dog). |
| 5 | انتبه إلى A / AN | `AN_21` → `AanDetector()` | a/an detector over dog, bird, orange, umbrella + wrong/kept forms. |
| 6 | There are + الجمع | `PLURAL_EXAMPLES_21` → `PluralExamples()` | Plural examples. |
| 7 | هنا نستخدم كل ما تعلمناه عن الجمع | `IRREGULAR_21` → `IrregularPanel()` | children / women / mice singular↔plural panel with the `لكن:` note. |
| 8 | There is + المكان | `PLACE_21` → `LocationLab()` | in / on / under / near / behind / in front of / next to / between lab. |
| 9 | There are + المكان | `PLURAL_PLACE_21` → `PluralLocation()` | Plural-place examples. |
| 10 | تركيب الجملة | `CONSTRUCTION_21` → `ConstructionMachine()` | There is / There are sentence machine. |
| 11 | النفي | `NEGATIVE_21` → `NegativeTransformer()` | Full and contracted negative forms, both shown. |
| 12 | الاختصارات | `CONTRACTIONS_21` → `ContractionsBoard()` | isn't / aren't board. |
| 13 | الأسئلة | `QUESTIONS_21` → `QuestionMachine()` | Is there…? / Are there…? question machine. |
| 14 | Short Answers | `SHORT_ANSWERS_21` → `ShortAnswerBridge()` | Yes, there is / Yes, there are bridge. |
| 15 | خطأ مهم | `IMPORTANT_MISTAKE_21` → `MistakeSpot()` | `Yes, it is. ❌` → `Yes, there is. ✅`. |
| 16 | There is vs It is | `IS_VS_IT_21` → `IsVsItIsLab()` | Three-lab comparison set, first lab. |
| 17 | There is vs This is | `THIS_VS_THERE_21` → `ThisVsThereLab()` | Three-lab comparison set, second lab. |
| 18 | Some مع There are | `SOME_21` → `SomePluralBoard()` | some with plural positive sentences. |
| 19 | Any مع النفي والأسئلة | `ANY_21` → `AnySystem()` | some / any three-state system. |
| 20 | Some مع المفرد؟ | `SOME_SINGULAR_21` → `SomeSingularBoard()` | Some with singular countables only. |
| 21 | الأرقام | `NUMBERS_21` → `QuantityLab()` | one / two / seven / twenty chair counts + `There is two chairs. ❌` warning. |
| 22 | الكميات الكبيرة | `BIG_QUANTITIES_21` → `BigQuantities()` | Many / a lot of with `There are many students.` |
| 23 | الأماكن الكبيرة | `BIG_PLACES_21` → `RoomBuilder()` | Room / scene builder over the room item set. |
| 24 | وصف مشهد | `SCENE_21` → `SceneDescription()` | Room scene description. |
| 25 | سؤال وجواب داخل وصف المكان | `SCENE_QA_21` → `SceneQA()` | The six supplied question/answer pairs. |
| 26 | IQ200: وصف ثم تحقيق | `INVESTIGATION_21` → `Investigation()` | Scene investigation board. |
| 27 | There is + غير المعدود | `UNCOUNTABLE_21` → `UncountableIntro()` | water / milk / rice / money / information intro only. |
| 28 | There is مع a/an وsome | `A_AN_SOME_21` → `AnSomeCompare()` | a/an and some comparison. |
| 29 | ترتيب الجملة | `ORDER_21` → `OrderBoard()` | Sentence order board. |
| 30 | ربطه بدرس الصفات | `ADJECTIVE_LINK_21` → `AdjectiveLink()` | Adjective connection. |
| 31 | ربطه بملكية الأسماء | `POSSESSION_LINK_21` → `PossessionLink()` | Sara's house, Ali's bag, Sara's phone, children's toys. |
| 32 | ربطه بـ This / That / These / Those | `DEMONSTRATIVE_LINK_21` → `DemonstrativeLink()` | Demonstrative connection lab. |
| 33 | الفرق في مثال واحد | `SCENE_CHAIN_21` → `SceneChain()` | Three-step scene chain. |
| 34 | أخطاء شائعة جدًا | `COMMON_ERRORS_21` → `ErrorDetector()` | "DON'T SAY IT!" — all seven errors with their corrections. |
| 35 | Grammar Detective | `GRAMMAR_DETECTIVE_21` → `DetectiveEx()` | All ten supplied mistakes on the detective board. |
| 36 | الحل | `SOLUTIONS_21` → `SolutionsEx()` | Numbered solutions. |
| 37 | Challenge 1 — أكمل | `CHALLENGE1_21` → `Challenge1Ex()` | Complete the sentence with is / are. |
| 38 | Challenge 2 — اختر | `CHALLENGE2_21` → `Challenge2Ex()` | Choose the correct option. |
| 39 | Challenge 3 — حوّل إلى النفي | `CHALLENGE3_21` → `TransformEx` (negative) | Six typed negative transformations, check and reveal. |
| 40 | Challenge 4 — حوّل إلى سؤال | `CHALLENGE4_21` → `TransformEx` (question) | Six typed question transformations, check and reveal. |
| 41 | IQ200 Challenge | `IQ200_CHALLENGE_21` → `IQ200Ex()` | one/three children, one/four women, one/five mice + six sentences + 3→question + 3→negative. |
| 42 | IQ200 Challenge 2 | `KITCHEN_21` → `KitchenEx()` | Kitchen investigation: the six source questions plus the two new ones. |
| 43 | FINAL BOSS | `FINAL_BOSS_21` → `FinalBossEx()` | Eight-fact mysterious room → eight-sentence paragraph with a/an, some, isn't/aren't, two places, an adjective, and an irregular plural. |
| 44 | الخلاصة الذهبية | `GOLDEN_SUMMARY_21` → `Summary()` | Golden Summary. |
| 45 | الخريطة العقلية | `MINDMAP_21` → `MindMap()` | Mind map. |
| 46 | الربط مع ما تعلمناه | `FINAL_SYSTEM_21` → `Reached()` | The full integration sentence with its word-by-word breakdown, incl. `near Sara's house`. |
| 47 | خريطة المنهج | `ROADMAP_21`, `ROADMAP_CLOSING_21` → `Roadmap()` | Full 1–21 curriculum roadmap with Lesson 21 highlighted. |

## Exact examples, locations, and intentional errors

`SOURCE_FIDELITY_MARKERS_21` indexes the full retained source vocabulary and
examples. The implementation explicitly retains, among others:

- The singular set `cat, computer, tree, apple, dog` and the a/an set
  `bird, orange, umbrella`.
- The irregular plural set `child → children`, `woman → women`, `mouse → mice`
  with `three children in the park`, `two women outside`, and
  `four mice under the table`.
- The full location set `in / on / under / near / behind / in front of /
  next to / between`, including `There is a cat behind the sofa.`
- The ownership set `Sara's house`, `Ali's bag`, `Sara's phone`, and
  `children's toys`.
- The uncountable intro set `water, milk, rice, money, information`.

The following intentional errors are deliberately preserved in
`INTENTIONALLY_WRONG_21` and visibly presented as errors in the
instructional, detective, or correction activities. Their supplied
corrections are stored separately and are shown alongside:

| Intentional source error | Supplied correction shown separately |
| --- | --- |
| `There is dog. ❌` | `There is a dog. ✅` |
| `There is apple. ❌` | `There is an apple. ✅` |
| `There are a book. ❌` | `There is a book. ✅` |
| `There is two books. ❌` | `There are two books. ✅` |
| `There is many students. ❌` | `There are many students. ✅` |
| `Is there two chairs? ❌` | `Are there two chairs? ✅` |
| `Are there a computer? ❌` | `Is there a computer? ✅` |
| `Yes, it is. ❌` | `Yes, there is. ✅` |
| `There are a water bottle. ❌` | `There is a water bottle. ✅` |

The Grammar Detective keeps all ten source mistake/correction pairs, including
`There isn't any chairs here.` and `There aren't a chair in the room.`.
Nothing in the data is silently corrected: the wrong forms stay wrong and
their corrections stay separate.

## Shared final quiz and Teacher's Space

Lesson 21 uses the existing shared implementation, not a new quiz component:

```tsx
<FinalQuiz lesson={21} accent="bg-emerald-700" />
```

The twelve new records live only in `src/shared/quizBank.ts` under
`QUIZZES[21]`. They cover:

| Quiz coverage | Questions |
| --- | --- |
| `There is` with singular countables and a/an | 1–3 |
| `There are` with plural and irregular plurals (children) | 4–5 |
| Negative forms `isn't` / `aren't` and any | 6–7 |
| Questions `Is there…?` / `Are there…?` and short answers | 8–9 |
| some / any and uncountable with `There is` | 10–11 |
| Integrated There is / There are scene sentence | 12 |

Because the shared `FinalQuiz` and `TeachersSpace` are reused unchanged, the
existing lifecycle remains intact: choices are neutral and changeable before
checking; feedback, score, explanation, and lock appear only after checking;
reset clears the attempt. The shared Teacher's Space answer key remains hidden
until the existing password gate accepts `63971`.

## Direction and rendering safeguards

- The lesson shell is Arabic `dir="rtl"`.
- All English phrases, options, formula strips, clue panels, dialogue units,
  and input values use explicit LTR isolation through `En`, `dir="ltr"`,
  LTR CSS, or `LatinRuns` from `src/shared/bidi.tsx`.
- New targeted direction/render checks in `scripts/audit-render-direction.mjs`
  SSR-render all 51 slides, verify source indices `0…47`, verify the ~180
  representative English source units (including every intentional wrong and
  its correction), the Final Boss clue order, the Golden Summary order, the
  mind map order, the locked Teacher's Space, and the full lesson render.
- No flag branding is introduced; the course brand remains `EnglishwithSomeR`.

## Registration

Only Lesson 21 registration was added to `src/App.tsx`:

- Lazy-free import of `Lesson21` (plus `SLIDES as L21_SLIDES`) consistent
  with Lessons 1–20.
- One hub card with `#/lesson/21` and dynamic `L21_SLIDES.length` statistics.
- One `route === 21` branch.

`scripts/check-english-direction.mjs` now counts 21 lessons and bounds the
Lesson 20 quiz-bank slice at the Lesson 21 block. No existing lesson route,
Lesson 1–20 content module, existing quiz entry, STEP 3/STEP 4 behavior, bidi
architecture, or course branding was changed.

## Validation record

The implementation is covered by the repository commands below:

```bash
npm run build
npm run check:english-direction
npm run audit:english-direction
node scripts/interaction-test.mjs
```

Final validation run on 2026-09-17 (UTC):

- `npm run build` passed (77 transformed modules).
- `npm run check:english-direction` passed **1,103 assertions** across all
  **21 lessons**.
- `npm run audit:english-direction` passed **896 assertions**, including
  SSR rendering of all 51 Lesson 21 slides and the representative
  Lesson 10 route.
- `node scripts/interaction-test.mjs` passed **189 assertions** across the
  shared quizzes of lessons 1, 10, 13, 17, 19, 20, and 21: neutral pre-check
  state (no correct marks, explanations, or answer key before «تحقق من
  الإجابات»), full feedback and option lock after checking, reset back to
  neutral, Teacher's Space locked initially, wrong password rejected with no
  leak, and `63971` unlocking the same answer key.
- A blank-slide sweep over all 51 Lesson 21 slides found no slide below the
  minimum text threshold (smallest slide: 175 text characters).

The targeted audits verify 51 renderable slides, 48 ordered source mappings,
all 9 practice modes, the ten Grammar Detective mistakes, the twelve
shared-quiz records, LTR order in the Golden Summary and mind map, the
kitchen investigation scene lines, the complete Final Boss clue set, and the
locked Teacher's Space not rendering the answer key.
