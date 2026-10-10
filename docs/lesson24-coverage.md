# Lesson 24 coverage ledger — Quantifiers · Quantity Lab

## Scope and fidelity contract

Lesson 24 (`الدرس 24: Quantifiers — أدوات الكمية` — 🧪 QUANTITY LAB) has been
rebuilt as a native multi-step lesson following the established course pattern
(Lesson 23 rail/step shell + the Lesson 26–28 step-frame primitives from
`src/shared/lessonKit.tsx`). The delivery is presentation-only: **no lesson
content was rewritten, re-worded, summarized, or dropped**.

| Ledger item | Result |
| --- | --- |
| Authoritative source sections | **64** (`SOURCE_SECTIONS` / `SOURCE_NUMBERED_COUNT`, unchanged) |
| Native steps | **32** — 1 cover + 30 lesson steps + 1 quiz step (`STEPS_24` / `STEP_COUNT_24`), grouped in **11** phases |
| Source units mapped | **64 / 64** — every unit is claimed by exactly one step (audited at data level) |
| Units rendered per step | every unit keeps its own heading box with `data-source-section` 01–64, exactly once, inside its own step |
| Interactive lab boards | **27** `data-lab` boards (`l24-hero`, `l24-command`, `l24-mapDiagram`, `l24-offers`, `l24-timeSensor`, `l24-vsBoard`, `l24-fewMeters`, `l24-littleMeters`, `l24-whyA`, `l24-quickRule`, `l24-detector`, `l24-thereMachine`, `l24-testTubes`, `l24-training1`…`l24-training5`, `l24-detectiveBoard`, `l24-iq200Board`, `l24-meaningChallenge`, `l24-missionDeck`, `l24-miniTest`, `l24-answerKey`, `l24-goldenRule`, `l24-roadmapTimeline`, `l24-finalQuiz`) |
| In-lesson exercises preserved | **9** `data-exercise` stations: `l24-training-1`…`l24-training-5`, `l24-detective`, `l24-iq200`, `l24-meaning`, `l24-mini` |
| Delayed-reveal contract | unchanged: neutral selection (no ✓/✕), «تحقق من الإجابات» locked until every item is answered, reveal only after check, `↺ إعادة` returns to neutral |
| Final quiz | the shared `FinalQuiz lesson={24}` (12 questions from `quizBank`) stays the last step, ending in the shared Teacher's Space (`somer173`) |
| Step rail | grouped by phase, numbered steps, active state, mobile drawer (`lg:hidden`) |
| Step chrome | header phase + step title, progress bar, `data-slide-counter` (`n / 32`), floating «→ السابق / التالي ←» |
| Keyboard | ArrowLeft → next, ArrowRight → previous, Space → next (ignored inside INPUT/SELECT/TEXTAREA/BUTTON and while the drawer is open) |
| Direction & BIDI | RTL Arabic shell with strictly isolated LTR English via `En`, `LatinRuns`, `dir="ltr"`; no global bidi change |
| New runtime dependencies | **None** |
| Source edits | `src/lessons/lesson24/data.ts` was **appended only** (+507 lines, 0 deletions); the 21 lab/helper components of `Lesson24.tsx` (drills, boards, meters, mission deck, answer key, roadmap, `SourceUnit`…) are **byte-identical** to the pre-refactor file |
| Removed old scroll harness | `Zone`, `ZoneNav`, `scrollToZone`, `ZONE_BG` sticky zone nav — replaced by the step rail; `BridgeCard` + `Hero` live on as the cover step |
| Shared files touched | this document, `scripts/audit-lesson24.mjs` (extended), one visibility guard in `scripts/audit-final-test-coverage.mjs` (see below), plus the `audit-lesson24` count rows in `docs/lesson28-coverage.md` and `docs/final-test-coverage.md` |

### Mounting model (documented deviation from Lessons 27/28)

Lessons 27/28 render one `SlideViewNN` at a time. Lesson 24 keeps **all 32 step
sections mounted** and hides the inactive ones with `hidden`, because the shared
`scripts/interaction-test.mjs` mounts the whole `Lesson24` component and asserts
the full DOM contract (9 stations + all 64 `data-source-section` markers) without
navigating steps. The learner-visible behaviour is still strictly one step at a
time, and lab state survives step navigation.

`scripts/audit-final-test-coverage.mjs` recognises a lesson's final quiz by the
«أجب عنها كلها» intro sentence of the shared `FinalQuiz`. Because Lesson 24 keeps
that quiz mounted inside its (hidden) last step, the gate now ignores a detected
quiz region that still sits inside a `[hidden]` subtree: a quiz inside a hidden
step is not “shown at the start of the lesson”. With that one-line visibility
guard the gate reports Lesson 24 as `32 / 32` — the quiz is only counted when its
step is actually reached — and the whole `npm run audit:english-direction` chain
stays at exit 0. All other legacy lessons render their quiz outside any hidden
subtree, so their results are unchanged.

## Step map

| # | id | kind | phase | step title | lab boards | source units |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `cover` | cover | البداية | الدرس 24: Quantifiers — أدوات الكمية | `l24-hero` | — |
| 2 | `opening` | lesson | البداية | LAB ENTRY — بوابة المختبر — ماذا أخذنا من الدرس 23 | — | `opening` |
| 3 | `command` | lesson | البداية | QUANTIFIER COMMAND CENTER — غرفة قيادة أدوات الكمية — أربعة قرارات قبل أي جملة | `l24-command` | `objectives` |
| 4 | `concept` | lesson | المفهوم | WHAT IS A QUANTIFIER — أولًا: ما معنى Quantifier؟ | — | `what` |
| 5 | `map` | lesson | المفهوم | QUANTIFIER MAP — خريطة أدوات الكمية — أي أداة تسكن أي عمود؟ | `l24-mapDiagram` | `map`, `full-map` |
| 6 | `some` | lesson | المختبرات | SOME LAB — مختبر SOME — كمية غير محددة لكنها موجودة | — | `some`, `some with countable`, `some with uncountable`, `some and exact number`, `some positive sentences` |
| 7 | `any` | lesson | المختبرات | ANY LAB — مختبر ANY — أرض الأسئلة والنفي | — | `any`, `any in questions`, `any in negatives` |
| 8 | `somevsany` | lesson | المختبرات | SOME VS ANY — SOME مقابل ANY — والفرق الذي لا تقوله القاعدة المختصرة | `l24-offers` | `some-any`, `juice comparison`, `some offers and requests` |
| 9 | `many` | lesson | المقارنات | MANY — ③ MANY | — | `many`, `many examples`, `many errors` |
| 10 | `much` | lesson | المقارنات | MUCH — ④ MUCH | `l24-timeSensor` | `much`, `much examples`, `time special meaning` |
| 11 | `manymuch` | lesson | المقارنات | MANY VS MUCH — MANY مقابل MUCH — عددٌ مقابل مقدار | `l24-vsBoard` | `many-much`, `many versus much` |
| 12 | `lot` | lesson | الأدوات | A LOT OF · LOTS OF — خزان الكمية الكبيرة — تعمل مع النوعين | — | `alot`, `lots`, `a lot countable`, `a lot uncountable`, `a lot versus many much`, `a lot of versus lots of` |
| 13 | `few` | lesson | الأدوات | A FEW VS FEW — ميزان المعدود: a few مقابل few — حرف يصنع المعنى | `l24-fewMeters` | `afew`, `few`, `a few meaning`, `a few positive feeling`, `few meaning`, `a few versus few` |
| 14 | `little` | lesson | الأدوات | A LITTLE VS LITTLE — ميزان غير المعدود: a little مقابل little | `l24-littleMeters` | `alittle`, `little`, `a little meaning`, `little meaning`, `a little versus little` |
| 15 | `whya` | lesson | الأدوات | WHY «A» MATTERS — لماذا حرف a مهمّ لهذه الدرجة؟ | `l24-whyA` | `iq-explain`, `why a matters`, `smart question` |
| 16 | `wall` | lesson | الأدوات | REFERENCE WALL — جدار الأمثلة — اسم واحد، خمس أدوات | `l24-quickRule`, `l24-detector` | `combined`, `combined examples`, `battle`, `fast-reference meanings` |
| 17 | `there` | lesson | الربط | THERE IS · THERE ARE — آلة الكمية الموجودة — is أم are؟ | `l24-thereMachine` | `there`, `is are warning` |
| 18 | `lab` | lesson | الربط | LANGUAGE LABORATORY — مختبر اللغة — أربع عيّنات تحت المجهر | `l24-testTubes` | `lab` |
| 19 | `training1` | lesson | التدريب | TRAINING STATIONS — محطات التدريب الخمس · المحطة ① | `l24-training1` | `training1` |
| 20 | `training2` | lesson | التدريب | TRAINING STATIONS — محطات التدريب الخمس · المحطة ② | `l24-training2` | `training2` |
| 21 | `training3` | lesson | التدريب | TRAINING STATIONS — محطات التدريب الخمس · المحطة ③ | `l24-training3` | `training3` |
| 22 | `training4` | lesson | التدريب | TRAINING STATIONS — محطات التدريب الخمس · المحطة ④ | `l24-training4` | `training4` |
| 23 | `training5` | lesson | التدريب | TRAINING STATIONS — محطات التدريب الخمس · المحطة ⑤ | `l24-training5` | `training5` |
| 24 | `detective` | lesson | التحليل | ANALYSIS BENCH — 🕵️ Grammar Detective | `l24-detectiveBoard` | `detective` |
| 25 | `iq200` | lesson | التحليل | IQ200 CHALLENGE — 🚀 IQ200 Challenge | `l24-iq200Board` | `iq200` |
| 26 | `meaning` | lesson | التحليل | MEANING CHALLENGE — 🧠 تحدي المعنى | `l24-meaningChallenge` | `meaning` |
| 27 | `boss` | lesson | المهمة | FINAL BOSS — RESTAURANT — المهمة النهائية — مطعم Quantity Lab | `l24-missionDeck` | `boss` |
| 28 | `mini` | lesson | المهمة | MINI FINAL TEST — الاختبار النهائي المصغر — 8 أسئلة | `l24-miniTest` | `mini` |
| 29 | `answers` | lesson | الإجابات | ANSWER KEY — مفتاح الإجابات — خمس حزم تدريب | `l24-answerKey` | `answers` |
| 30 | `summary` | lesson | الخاتمة | GOLDEN SUMMARY — الخلاصة النهائية والقاعدة الذهبية | `l24-goldenRule` | `summary` |
| 31 | `roadmap` | lesson | الخاتمة | ROADMAP — مسارنا الآن — الخطوة التالية في منظومة الأزمنة | `l24-roadmapTimeline` | `roadmap` |
| 32 | `quiz` | quiz | الخاتمة | FINAL QUIZ — QUANTIFIERS — الاختبار النهائي — 12 سؤالًا جديدة مع الشرح ومساحة المعلم | `l24-finalQuiz` | — |

## Verification gates (actual runs)

| Gate | Result |
| --- | --- |
| `npm run build` | ✓ vite build ok (bundled JS ≈ 3.94 MB; only the standing chunk-size warning) |
| `node scripts/audit-lesson24.mjs` | ✓ **206 assertions** (was 165 — the original 165 are untouched, +41 step-architecture checks: plan integrity, one-unit-one-step, per-step ledger + labs, rail/counter/progress, exercise ids, quiz no-leak, RTL/LTR isolation) |
| `node scripts/interaction-test.mjs` | ✓ **558 passed / 0 failed** (unchanged expectations: 9 stations, 64 markers, neutral → check → reveal → reset for every station, `#zone-quiz` no-leak) |
| `npm run check:english-direction` | ✓ 1617 assertions, 32 lessons |
| `node scripts/audit-bidi-mixed.mjs` | ✓ Lesson 24 without-block clean (2 allowlisted baseline pairs unchanged, 0 alternates) |
| `ONLY=24 node scripts/audit-bidi-mixed.mjs` | ✓ L24 = 5 flagged / 0 alternates (baseline ratchet for L24 is 65 — the refactor lowers it) |
| `node scripts/audit-final-test-coverage.mjs` | ✓ 579 checks (Lesson 24 detected as `32 / 32`; see the mounting-model note) |
| `npm run audit:english-direction` | ✓ exit 0 — full chain: render-direction 1454, lesson 24 206, lesson 26 164, lesson 27 363, lesson 28 328, lesson 29 84, lesson 30 486, lesson 31 724, lesson 32 307, final-test 854, final-test coverage 579, source-reveal 60, BIDI audit passed |

## Known limitations

- **No visual/browser verification was performed.** Verification is static
  (SSR + jsdom audits and the existing interaction harness); no screenshot or
  manual browser pass exists for this refactor.
- Inactive steps stay in the DOM (`hidden`), so the SSR/DOM snapshot always
  carries the complete 64-unit ledger — this is a deliberate choice of the
  shared-test contract described above, not an oversight.
- The old zone headings survive as step `en`/`title` labels; the legacy zone ids
  `zone-manymuch`, `zone-few`, `zone-training` and `zone-analysis` no longer
  exist as single steps because their content is now split into the
  finer-grained `many`/`much`/`manymuch`, `few`/`little`, `training1`–`training5`,
  `detective` and `iq200` steps.
