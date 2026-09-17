# Lesson 20 coverage ledger — Demonstratives

## Scope and fidelity contract

**Lesson:** الدرس 20: `Demonstratives / This / That / These / Those`

**Arabic title:** أسماء الإشارة: هذا، هذه، هؤلاء، أولئك

**Experience name:** `DEMONSTRATIVE CONTROL CENTER`

The supplied Lesson 20 material is represented as source data in
`src/lessons/lesson20/data.ts`. The lesson does not replace the supplied
material with a shortened summary: source headings, explanations, examples,
intentional errors, corrections, exercises, Final Boss dialogue/questions,
Speed Game, Golden Test, sentence builder, summary, and roadmap are retained
as structured data and rendered by `Lesson20.tsx`.

| Ledger item | Result |
| --- | --- |
| Authoritative numbered source sections | **41** (`SOURCE_NUMBERED_COUNT`) |
| `SOURCE_SECTIONS` headings | **41**, in source order |
| Planned slide sequence | **44**: cover + 41 source-mapped slides + shared final quiz + closing |
| Source-mapped slides | **41** (`sourceIndex: 0…40`) |
| Dedicated source practice experiences | **9**: Detective, Challenge 1, Challenge 2, IQ200, IQ200 Challenge 2, Final Boss, Speed Game, Golden Test, sentence builder |
| Shared final quiz questions | **12** (`QUIZZES[20]`) |
| New dependencies | **None** |

## Source-section to implementation map

All source slides carry `sourceIndex` and render a `data-source-section`
marker. The slide data is in `SLIDES` in `data.ts`; the named renderer below is
in `src/lessons/lesson20/Lesson20.tsx`.

| # | Authoritative source heading | Source data / slide implementation | Presentation or interaction |
| ---: | --- | --- | --- |
| 1 | أهداف الدرس | `OBJECTIVES_20` → `Objectives()` | Nine stated outcomes. |
| 2 | الفكرة الأساسية | `CORE_IDEA_20` → `CoreIdeaBoard()` | Select the number or distance radar input. |
| 3 | النظام السحري | `MAGIC_SYSTEM_20` → `MagicSystemBoard()` | Four-zone near/far × singular/plural signal map. |
| 4 | احفظها بهذه الطريقة | `MEMORY_20` → `MemoryCards()` | Reveal-and-hide memory cards. |
| 5 | مثال بسيط جدًا | `SIMPLE_EXAMPLES_20` → `NearFarScene()` | Choose a book scene to inspect its signal. |
| 6 | الجدول الأساسي | `BASIC_TABLE_20` → `BasicTable()` | LTR control table. |
| 7 | This | `THIS_20` → generic block renderer + `DemonstrativeRadar()` | Full explanation, examples, intentional error/correction, selectable radar. |
| 8 | That | `THAT_20` → generic block renderer | Full explanation and four supplied examples. |
| 9 | These | `THESE_20` → generic block renderer + `TheseMachine()` | Full examples and singular-to-plural transformation. |
| 10 | Those | `THOSE_20` → generic block renderer | Full examples. |
| 11 | الآن لدينا النظام كاملًا | `COMPLETE_SYSTEM_20`, `BE_CONNECTIONS_20` → `BeMachine()` | Demonstrative-to-`is`/`are` connector. |
| 12 | العلاقة مع درس الجمع | `PLURAL_CONNECTION_20` → `PluralBridge()` | Selectable singular/plural and irregular-plural bridge. |
| 13 | ماذا عن الأشياء غير العاقلة؟ | `PEOPLE_20` → `PeopleBoard()` | Objects and people examples. |
| 14 | This/That + اسم | `NOUN_FORM_20` → `NounPronounBoard()` | Name-form side of the name/pronoun switch. |
| 15 | This/That كضمير | `PRONOUN_FORM_20` → `QuestionBuilder(mode="pronoun")` | Pronoun questions, answers, and rules. |
| 16 | الأسئلة | `QUESTIONS_20` → `QuestionBuilder(mode="questions")` | Four question forms and selectable examples. |
| 17 | الإجابات القصيرة | `SHORT_ANSWERS_20` → `AnswerBridge()` | This/That → It and These/Those → They bridge. |
| 18 | IQ200 Connection | `IQ200_CONNECTION_20` → `IQConnectionBoard()` | Decomposes the supplied integrated sentence. |
| 19 | This + Possessive Adjective | `POSSESSIVE_ADJECTIVE_20` → `PossessiveAdjectiveLab()` | Four ownership examples. |
| 20 | This + Possessive Noun | `POSSESSIVE_NOUN_20` → `PossessiveNounLab()` | Revealable possessive-noun examples. |
| 21 | This vs These | `THIS_THESE_20` → `ThisTheseComparator()` | One/more-than-one comparison and supplied wrong forms. |
| 22 | That vs Those | `THAT_THOSE_20` → `ThatThoseComparator()` | Far singular/plural comparison. |
| 23 | لا تحفظها منفصلة! | slide blocks → `FourZoneMap()` | Full 2×2 visual map. |
| 24 | كيف تختار الكلمة؟ | `TWO_QUESTION_ENGINE_20` → `DecisionEngine()` | Answer two questions and see the demonstrative result. |
| 25 | مثال IQ200 | `IQ200_EXAMPLE_20` → `IQDecisionCards()` | Four selectable real-world decisions. |
| 26 | هل "بعيد" يعني فقط المسافة؟ | `CONTEXT_DISTANCE_20` → `ContextLab()` | Context-distance correction/reveal. |
| 27 | This يمكن أن تشير إلى الوقت أيضًا | `TIME_CONNECTION_20` → `TimeLab()` | Selectable time-reference cards. |
| 28 | النفي | `NEGATIVE_20` → `NegativeMachine()` | Four negative examples and `is`/`are` link. |
| 29 | الأسئلة مع الملكية | `WHOSE_20` → `WhoseLab()` | Select a `Whose` form and its response. |
| 30 | Grammar Detective | `GRAMMAR_DETECTIVE_20` → `DetectiveEx()` / `CorrectionLab()` | Eight supplied errors, typed corrections, check and reveal. |
| 31 | Challenge 1 — اختر الكلمة | `CHALLENGE1_20` → `Challenge1Ex()` | Six demonstrative choices with score. |
| 32 | Challenge 2 — أكمل بـ is أو are | `CHALLENGE2_20` → `Challenge2Ex()` | Eight `is`/`are` decisions with score. |
| 33 | IQ200 Challenge | `IQ200_CHALLENGE_20` → `IQ200Ex()` | Four typed outputs, check and reveal. |
| 34 | IQ200 Challenge 2 | `IQ200_CHALLENGE2_20` → `IQ200BEx()` / `CorrectionLab()` | Six supplied corrections. |
| 35 | FINAL BOSS | `FINAL_BOSS_20` → `FinalBossEx()` | Eight-line Maya/Noah dialogue and eight revealable source questions/answers. |
| 36 | لعبة السرعة | `SPEED_GAME_20` → `SpeedGameEx()` | Place all four words in near/far × singular/plural zones; reset available. |
| 37 | الاختبار الذهبي | `GOLDEN_TEST_20` → `GoldenTestEx()` | Eight recall fields, check, answer reveal, and reset. |
| 38 | تحدي بناء الجمل | `SENTENCE_BUILDER_20` → `SentenceBuilderEx()` | Six token-based sentence builds, check, model reveal, and clear action. |
| 39 | الخلاصة | `SUMMARY_20` → `Summary()` | Both axes, final system, noun rule, and `Verb to be` rule. |
| 40 | المستوى الذي وصلنا إليه | `LEVEL_REACHED_20` → `Reached()` | Integrated achievement sentences and previous-topic list. |
| 41 | خريطة المنهج | `ROADMAP_20`, `ROADMAP_CLOSING_20` → `Roadmap()` | Full 1–20 curriculum roadmap with Lesson 20 highlighted. |

## Exact examples, ownership forms, and intentional errors

`SOURCE_FIDELITY_MARKERS_20` indexes the full retained source vocabulary and
examples. The implementation explicitly retains, among others:

- `apple / apples`, `book / books`, `child / children`, `woman / women`, and
  `man / men` in the teaching maps and practice.
- `This is Ali's notebook.`, `That is Sara's bicycle.`,
  `These are the boys' shoes.`, and `Those are the children's toys.`
- The Final Boss phrases `It's my new camera.`,
  `That's my brother's telescope.`, and
  `Those are the children's bicycles.`
- The ownership-practice form `Those ___ the students' bags.` with its
  supplied `are` answer.

The following intentional errors are deliberately preserved in
`INTENTIONALLY_WRONG_20` and visibly presented as errors in the instructional
or correction activities. Their supplied corrections are stored separately and
can be revealed:

| Intentional source error | Supplied correction shown separately |
| --- | --- |
| `This books ❌` | `These books. ✅` |
| `This children ❌` | `These children` / source correction activity |
| `These child ❌` | `This child` / source correction activity |
| `Those car is red ❌` | `That car is red.` |
| `This are my shoes ❌` | `These are my shoes.` |
| `That are my friends ❌` | `Those are my friends.` |

The Grammar Detective keeps all eight source error/correction pairs, and IQ200
Challenge 2 keeps all six source correction pairs. Neither set is silently
corrected in the data.

## Shared final quiz and Teacher’s Space

Lesson 20 uses the existing shared implementation, not a new quiz component:

```tsx
<FinalQuiz lesson={20} accent="bg-cyan-700" />
```

The twelve new records live only in `src/shared/quizBank.ts` under `QUIZZES[20]`.
They cover:

| Quiz coverage | Questions |
| --- | --- |
| Demonstrative selection by singular/plural and near/far | 1–4 |
| `is` / `are` with irregular plural `children` | 4 |
| Questions and short answers (`What are those?`, `they are`) | 5–6 |
| Possessive adjective / possessive noun | 7–8, 12 |
| Intentional-error corrections | 9–10 |
| Ownership with irregular plural `children's` | 11 |
| Integrated demonstrative + ownership example | 12 |

Because the shared `FinalQuiz` and `TeachersSpace` are reused unchanged, the
existing lifecycle remains intact: choices are neutral and changeable before
checking; feedback, score, explanation, and lock appear only after checking;
reset clears the attempt. The shared Teacher’s Space answer key remains hidden
until the existing password gate accepts `63971`.

## Direction and rendering safeguards

- The lesson shell is Arabic `dir="rtl"`.
- All English phrases, options, formula strips, token banks, dialogue units,
  tables, and input values use explicit LTR isolation through `En`, `dir="ltr"`,
  LTR CSS, or `LatinRuns` from `src/shared/bidi.tsx`.
- New targeted direction/render checks SSR-render every one of the 44 slides,
  verify source indices `0…40`, verify representative English phrases and the
  Final Boss order, and verify the Control Center maps and controls.
- No flag branding is introduced; the course brand remains `EnglishwithSomeR`.

## Registration

Only Lesson 20 registration was added to `src/App.tsx`:

- Lazy-free import of `Lesson20` consistent with Lessons 1–19.
- One hub card with `#/lesson/20` and dynamic `L20_SLIDES.length` statistics.
- One `route === 20` branch.

No existing lesson route, Lesson 1–19 content module, existing quiz entry, or
course branding was changed.

## Validation record

The implementation is covered by the repository commands below:

```bash
npm run build
npm run check:english-direction
npm run audit:english-direction
```

Final validation run on 2026-09-17 (UTC):

- `npm run build` passed (75 transformed modules).
- `npm run check:english-direction` passed **1,096 assertions** across all
  **20 lessons**.
- `npm run audit:english-direction` passed **601 assertions**, including
  SSR rendering of all 44 Lesson 20 slides and the representative Lesson 10
  route.
- A direct TypeScript check of `Lesson20.tsx` and its dependencies passed with
  the repository's installed TypeScript compiler.
- The Vite preview started on `0.0.0.0:5173` and served the course base path.

The targeted audits verify 44 renderable slides, 41 ordered source mappings,
all 9 practice modes, 12 shared-quiz records, LTR order in the four-zone map,
Speed Game word bank, sentence-builder token compatibility, and the complete
Final Boss dialogue order. The render audit also verifies the locked Teacher’s
Space does not render the answer key.
