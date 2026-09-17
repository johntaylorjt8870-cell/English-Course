# Lesson 22 coverage ledger — Prepositions of Place

## Scope and fidelity contract

**Lesson:** الدرس 22: `Prepositions of Place`

**Arabic title:** حروف الجر للمكان — in / on / under / next to / behind / in front of / between / وغيرها

**Experience name:** `THE POSITION LAB`

The supplied Lesson 22 material is represented as source data in
`src/lessons/lesson22/data.ts`. The lesson does not replace the supplied
material with a shortened summary: source headings, the opening connection to
Lesson 21, all 13 core prepositions (in, on, under, above, below, behind,
in front of, next to, near, between, opposite, inside, outside), the
discrimination pairs (in/on, above/on, above/below, behind/in front of,
next to/near, above/over, under/below, between/among), the There is / There are
connection, Where questions, full answers (long and short), pronoun bridge,
possessive-noun bridge, multiple-preposition builder, people positions, the full
bedroom description, all 10 Grammar Detective errors and corrections, the three
Challenges, both IQ200 challenges, the Science Lab Final Boss, the True/False
scene, the important "don't memorize translation" conceptual note, the Golden
Summary, the eight final compound examples, and the 1–22 roadmap are retained
as structured data and rendered by `Lesson22.tsx`.

| Ledger item | Result |
| --- | --- |
| Authoritative numbered/named source sections | **42** (`SOURCE_NUMBERED_COUNT`) |
| `SOURCE_SECTIONS` headings | **42**, in source order |
| Planned slide sequence | **46**: cover + opening + objectives + 36 source-mapped slides (incl. challenges + note) + summary + final examples + roadmap + shared final quiz + closing |
| Source-mapped slides | **40** with `sourceIndex` |
| Dedicated source practice experiences | **8**: Detective, Challenge 1, Challenge 2, Challenge 3, IQ200 Challenge, IQ200 Challenge 2, Final Boss (Science Lab), True/False |
| Interactive Position Lab visualizations | **17**: opening recall, position overview, in, on, in/on compare, under, above, below, behind, in-front-of, next-to, near, between, opposite, inside/outside, map, there-is/there-are/where/answers, pronoun/possessive/multi/people/over-under/between-among, room builder |
| Shared final quiz questions | **12** (`QUIZZES[22]`) |
| New runtime dependencies | **None** |

## Source-section to implementation map

All source slides carry `sourceIndex` and render a `data-source-section`
marker. The slide data is in `SLIDES` in `data.ts`; the named renderers are in
`src/lessons/lesson22/Lesson22.tsx`.

| # | Authoritative source heading | Source data / slide implementation | Presentation or interaction |
| ---: | --- | --- | --- |
| 0 | الافتتاح — ربط مع الدرس السابق | `OpeningRecall()` | There is a book on the table / There are three chairs connection + on/in key. |
| 1 | 🎯 أهداف الدرس | `Objectives()` → `OBJECTIVES_22` | All 10 objectives with preposition chip list for objective 2 and 6. |
| 2 | 🧠 1. ما هو Preposition؟ | `PositionOverview()` | Preposition definition + the "book on the table" anchor + `on` relationship + 13-position visualization selector. |
| 3 | 🧠 2. IN = في / داخل | `InLab()` | Inside-box visual + 4 core examples + 7 extra in-phrases. |
| 4 | 🧠 3. ON = على سطح | `OnLab()` + `InOnCompare()` | Surface visual + 4 examples + interactive in/on side-by-side compare. |
| 5 | 🧠 4. UNDER = تحت | `UnderLab()` | Under visual (cat under table) + 4 examples. |
| 6 | 🧠 5. ABOVE = فوق / أعلى من | `AboveLab()` | Above (clock/door) visual + 3 examples + ABOVE vs ON reveal panel. |
| 7 | 🧠 6. BELOW = أسفل / تحت مستوى شيء | `BelowLab()` | Below visual + 3 examples + above↔below pair (clock/picture). |
| 8 | 🧠 7. BEHIND = خلف | `BehindLab()` | Behind visual (car/house) + 4 examples. |
| 9 | 🧠 8. IN FRONT OF = أمام | `InFrontLab()` | Behind/in-front-of cat comparison + 3 examples. |
| 10 | 🧠 9. NEXT TO = بجانب | `NextToLab()` | Next-to visual + 4 examples. |
| 11 | 🧠 10. NEAR = بالقرب من | `NearLab()` | Side-by-side next-to vs near visual with distance + 3 examples. |
| 12 | 🧠 11. BETWEEN = بين شيئين | `BetweenLab()` | Between A↔B visual + `between A and B` formula + 3 examples. |
| 13 | 🧠 12. OPPOSITE = مقابل | `OppositeLab()` | Opposite (bank/school across street) visual + 3 examples. |
| 14/15 | 🧠 13. INSIDE / 🧠 14. OUTSIDE | `InsideOutsideLab()` | Toggle inside/outside visual + 2 inside examples + 3 outside examples + inside↔outside pair. |
| 16 | 🧠 15. أهم الكلمات في خريطة واحدة | `PrepositionMap()` | All 13 prepositions listed as Arabic-English pairs. |
| 17 | 🧠 16. الآن نربطها بـ There is | `ThereIsConnection()` | The book is on the table → There is a book on the table bridge + 5 There-is examples. |
| 18 | 🧠 17. مع الجمع (There are) | `ThereAreConnection()` | 5 There-are examples + number/noun/preposition/place formula strip. |
| 19 | 🧠 18. الأسئلة: Where? | `WhereQuestions()` | Wh-family + Where is/Where are board + 4 examples. |
| 20 | 🧠 19. الإجابة | `AnswersBoard()` | 4 full Q&A pairs + short-answer reveal panel + academic-style note. |
| 21 | 🧠 20. سؤال وجواب كامل | `FullQA()` | All 4 full dialogues (Sara, Omar, children, dog). |
| 22 | 🧠 21. ربط Prepositions بالضمائر | `PronounsBoard()` | Ali→He, Sara→She, The dog→It, The children→They bridge + 4 examples. |
| 23 | 🧠 22. ربطها بالملكية | `PossessiveBoard()` | Omar's bag, Sara's phone, children's shoes, students' books + Possessive+Question+Pronoun+Preposition chain. |
| 24 | 🧠 23. أكثر من حرف جر في جملة واحدة | `MultiPrepBuilder()` | Three source sentences (small box, two chairs, cat) + IQ200 visual chain (TABLE→CHAIR→BALL). |
| 25 | 🧠 24. Prepositions مع الأشخاص | `PeoplePositionLab()` | 4 people examples (Ali, Lina, teacher, child). |
| 26 | 🧠 25. Above / Over | `AboveOverExplainer()` | Both lamp sentences preserved + "use above safely" note. |
| 27 | 🧠 26. Under / Below | `UnderBelowExplainer()` | Side-by-side cards (under spatially / below a level) with source examples. |
| 28 | 🧠 27. BETWEEN vs AMONG | `BetweenAmongLab()` | Between/among pair cards + 2 source examples + "we'll return to among later" note. |
| 29 | 🧠 28. وصف غرفة كاملة | `RoomSceneBuilder()` | Interactive bedroom scene builder (8 sentences, toggle to build) + rules notice strip. |
| 30 | 🕵️ Grammar Detective | `DetectiveEx()` | All 10 supplied mistakes with input fields + reveal solution panel carrying the full Arabic explanation (including context note for ① and note ⑥ alternative "in the classroom"). |
| 31 | 🧩 Challenge 1 — أكمل | `Challenge1Ex()` | 5 fill-in-the-blank (in/on/under/behind/next to) with click feedback. |
| 32 | 🧩 Challenge 2 — اختر الكلمة الصحيحة | `Challenge2Ex()` | 5 two-choice items with the exact source stems. |
| 33 | 🧩 Challenge 3 — Where? | `Challenge3Ex()` | 5 full-sentence answer inputs (book/cat/children/bicycle/shoes) with check+reveal. |
| 34 | 🚀 IQ200 Challenge | `IQ200A()` | Full 8-sentence large-desk scene + 7 where-questions with reveal answers. |
| 35 | 🧠 IQ200 Challenge 2 | `IQ200B()` | 8 Arabic-cued multiple-choice items covering in / on / under / behind / in front of / next to / between / opposite. |
| 36 | 🏆 FINAL BOSS | `FinalBossEx()` | 11 Arabic clues (science lab scene) + 12-requirement checklist (There is/are, in/on/under/next to/behind/in front of/above, adjective, regular plural, irregular plural) + textarea paragraph writer with sentence counter. |
| 37 | 🎮 تحدي "صح أم خطأ؟" | `TrueFalseEx()` | Six scene sentences + six questions with reveal answers. |
| 38 | 🧠 نقطة مهمة جدًا | `ImportantNote()` | "Don't memorize translation — memorize word + scene + example" panel with crossed-out "under = تحت فقط" + kept example "The cat is under the table." |
| 39 | 🏆 الخلاصة الذهبية | `Summary()` | 13-word grid + Where is/Where are questions + There is/There are formulas. |
| 40 | 🔥 أمثلة نهائية مركبة | `FinalExamples()` | All 8 source compound sentences + integration note. |
| 41 | 🗺️ خريطة المنهج حتى الآن | `Roadmap()` | Full 1–22 roadmap with Lesson 22 highlighted + closing paragraph (some/any/much/many/a lot of/few/little preview). |

## Exact examples, locations, and intentional errors preserved

The implementation explicitly retains, among others:

- Core prepositions with their source examples:
  - in: bag, drawer, classroom, box, room, house, car, garden, kitchen, city, country.
  - on: table, desk, wall, shelf.
  - under: table, bed, chair, desk.
  - above: door, sofa, table.
  - below: zero, clock, window.
  - behind: house, door, school, garage.
  - in front of: house, students, school.
  - next to: table, park, Lina, bed.
  - near: house, station, river.
  - between: boxes, bank/library, Ali/Omar.
  - opposite: school, hotel, park.
  - inside: house, bag.
  - outside: house, garage, classroom.
- Full bedroom scene (8 sentences): bed, lamp, small table beside lamp, two books on table, bag under table, picture above bed, two shoes near door, window behind bed.
- IQ200 desk scene (8 sentences): large desk near window, computer on desk, two books next to computer, small box under desk, three pencils inside box, chair in front of desk, backpack behind chair, two pictures above desk.
- 11-clue Science Lab Final Boss.
- The Golden Summary list of all 13 prepositions.
- Eight final compound examples including `The children's shoes are near the door.` and `The school is between the library and the park.`

The following intentional errors are deliberately preserved as mistakes in the
Grammar Detective exercise (and listed in `INTENTIONALLY_WRONG_22`):

| Intentional source error | Supplied correction |
| --- | --- |
| `The book is in the table.` | Context: on the table vs in the drawer/table. |
| `The cat is on the box.` (intended inside) | `The cat is in the box.` |
| `There is two books under the desk.` | `There are two books under the desk.` |
| `Where are the phone?` | `Where is the phone?` |
| `Where is the keys?` | `Where are the keys?` |
| `The children are behind the classroom.` (intended inside) | `The children are inside / in the classroom.` |
| `There are a lamp on the desk.` | `There is a lamp on the desk.` |
| `The bag is next the chair.` | `The bag is next to the chair.` |
| `The school is between the park.` | `The school is between the park and the library.` |
| `The teacher is front of the students.` | `The teacher is in front of the students.` |

## Shared final quiz and Teacher's Space

Lesson 22 uses the existing shared implementation:

```tsx
<FinalQuiz lesson={22} accent="bg-teal-700" />
```

The twelve new records live only in `src/shared/quizBank.ts` under `QUIZZES[22]`.
They cover:

| Quiz coverage | Questions |
| --- | --- |
| in / on / under basic meanings | 1–3 |
| between with "and" | 4 |
| Where is / Where are (Wh-word + singular/plural) | 5–6 |
| in front of (vs behind) | 7 |
| above vs on | 8 |
| opposite | 9 |
| There is with singular location | 10 |
| Pronoun answer with possessive subject | 11 |
| Multiple prepositions in one sentence | 12 |

Because the shared `FinalQuiz` and `TeachersSpace` are reused unchanged, the
existing lifecycle remains intact.

## Direction and rendering safeguards

- Lesson shell is Arabic `dir="rtl"`.
- All English phrases, options, formula strips, diagrams, inputs, and
  constructed examples use explicit LTR isolation via the `En` wrapper
  (`dir="ltr"`), `ltr-row` CSS classes, and `LatinRuns` from
  `src/shared/bidi.tsx`.
- No flag branding is introduced; the course brand remains `EnglishwithSomeR`.
- The author's decorative marker in the source is not used as site branding;
  the cover explicitly does not render any country-flag branding.

## Registration

Only Lesson 22 registration was added to `src/App.tsx`:

- Import of `Lesson22` (plus `SLIDES as L22_SLIDES`) consistent with
  Lessons 1–21.
- One hub card with `#/lesson/22` and dynamic `L22_SLIDES.length` statistics.
- One `route === 22` branch.

`scripts/check-english-direction.mjs` was updated from a fixed `21` lesson
expectation to `22` and now also asserts the Lesson 22 data/tsx presence, the
shared FinalQuiz reuse, App registration (import/SLIDES/card/route), and the
12-item `QUIZZES[22]` block. No existing lesson assertion was changed or
removed. `scripts/audit-render-direction.mjs` was not modified and continues
to verify Lessons 1–21.

## Validation record

Commands:

```bash
npm run build
npm run check:english-direction
npm run audit:english-direction
node scripts/interaction-test.mjs
```

Final validation run on 2026-09-17 (UTC):

- `npm run build` passed (80 modules transformed).
- `npm run check:english-direction` passed **1121 assertions** across all
  **22 lessons**, including the new Lesson 22 data/tsx/quiz/registration
  checks.
- `npm run audit:english-direction` passed **896 assertions** covering the
  existing Lessons 1–21 SSR render, source indices, representative English
  units, locked Teacher's Space, and branding rules.
- `node scripts/interaction-test.mjs` passed **189 assertions** across the
  shared quizzes of lessons 1, 10, 13, 17, 19, 20, and 21: neutral pre-check
  state, full feedback after checking, reset, Teacher's Space locked/wrong
  password / unlock behaviour.
- Build output produces a single dist bundle; no runtime errors in
  production-mode rendering.
