# Lesson 28 coverage ledger — Past Perfect vs Past Simple

## Scope and fidelity contract

Lesson 28 (`الدرس 28: Past Perfect vs Past Simple` — 🧠 IQ200 ترتيب الأحداث في
الماضي باحتراف) is added to the existing course. Nothing in Lessons 1–27 was
rewritten, restyled, or shortened: the only shared-file changes are the lesson
card + route registration in `src/App.tsx` and validation-script inventory
extensions (`scripts/check-english-direction.mjs`,
`scripts/audit-render-direction.mjs`, `package.json`). The teacher-area password
remains `somer173` and the site password remains `CloseYourEyes173`.

Lesson 27 is the reference implementation: Lesson 28 reuses its area
architecture (Student Lesson / Test Area / Test Solutions / Teacher Area), its
delayed-reveal contract, its LTR isolation primitives, and its audit pattern.
No parallel competing architecture was introduced.

| Ledger item | Result |
| --- | --- |
| Authoritative source sections | **47** (`SOURCE_SECTIONS`: 40 numbered ①–㊵ in source order + 7 unnumbered: cover, bridge, objectives, summary, golden, iqfinal, closing) |
| Source headings rendered on-slide | **47** — every ledger section renders its own heading box carrying the `data-source-section` marker, exact-once vs `SLIDES` (audited) |
| Native steps (rendered sequentially) | **47**: 40 mapped content steps `S1_FirstQuestion`…`S40_ExStory` (①–㊵) + 7 structural steps (cover, bridge, objectives, summary, golden, iqfinal, closing) — `SLIDES` ↔ ledger exact-once |
| Interactive lab visualizations | **31** `data-en-seq` Lab boards (28 pedagogical labs ①–㊳ + `l28-ex-boss` ㊴ + `l28-ex-story` ㊵ + `l28-ex-iqfinal`) + **8** `SourceReveal`-gated in-lesson exercise reveal blocks (`ex30`–`ex35`, `ex39`, `iqfinal`) |
| Ten required interactive experiences | **10** (see the map below) |
| In-lesson exercises | **9** (`choose`, `firstEvent`, `errors`, `johnMary`, `sarahTom`, `daniel`, `boss`, `iqFinal`, `story`) |
| Test Area questions | **20** newly authored (`TEST_28`, numbered 1–20): 10 single + 3 tf + 2 multi + 2 order + 1 match + 2 spot — not a copy of ㉚–㊴ |
| Final Test (end of lesson) | **15** platform-authored questions (`finalTestBank.ts` → `LESSON_28`) spanning all seven types — no correctness, score, or explanation while answering; the single «تصحيح الاختبار» action reveals score + review + explanations, with a full reset. Separate from the 20-question Test Area; answer key lives in the Teacher Area |
| Test solutions | **20** detailed solutions (`Solutions28`), gated until submit or teacher unlock |
| Teacher area | `somer173`-gated: overview (theme, core skill, Lesson-27 link) + 10 objectives + 13 teaching notes + 8 activity solutions + story rubric + 7 common mistakes + solutions entry |
| Intentional source errors preserved verbatim | **13** (`INTENTIONALLY_WRONG_28`) |
| New runtime dependencies | **None** |
| Branding | `EnglishwithSomeR` only; no country-flag branding added |

## The ten required interactive experiences

| Required experience | Implementation |
| --- | --- |
| 1. Timeline Reasoning Lab | `l28-first-question` — order the train/arrival events, then name each tense |
| 2. Simple vs Perfect Switch | `l28-maya-switch` (⑦) + `l28-why-perfect` (⑩) — switch interpretations and see the order change |
| 3. Before / After Lab | `l28-before-lab` (⑨) + `l28-after-lab` (⑪) — both forms correct; Past Perfect emphasizes, never mandates |
| 4. Three-Tense Timeline Lab | `l28-wallet-layers` (⑱) — label was walking / realized / had forgotten on the timeline |
| 5. Time Machine / Back Reference Lab | `l28-step-back` (㉘) + `l28-sequence-backref` (㉗) + `l28-time-machine` (⑳) |
| 6. Grammar Detective | `l28-cave-detective` (㉙) — the explorer/cave passage, five verbs classified |
| 7. Error Hunt | `S32_ExErrors` (㉜, reveal `ex32`) — had went / had ate / had saw / Did he had…? / didn't had… |
| 8. Three-Event Logic Challenge | `S35_ExDaniel` (㉟, reveal `ex35`) — earliest / ongoing / main / later in the laboratory scene |
| 9. Boss Battle | `l28-ex-boss` (㊴) — the exact source challenge, three options, answer B |
| 10. Story Builder | `l28-ex-story` (㊵) — self-authored "The Missing Backpack", live counters, no auto-generation |

Supporting labs: `l28-compare-direct` (④), `l28-old-myth` (⑤),
`l28-timeline-shop` (⑥), `l28-necklace` (⑧), `l28-rule-lab` (⑫),
`l28-bytime` (⑬), `l28-already` (⑭), `l28-just` (⑮), `l28-ps-plus-pp` (⑯),
`l28-three-tense` (⑰), `l28-station` (⑲), `l28-cases3` (㉖),
`l28-logic-test` (㊱), `l28-alex-scene` (㊲), `l28-meaning-rule` (㊳),
`l28-ex-iqfinal` (IQ200 FINAL).

## Source-section to implementation map

| # | id | Authoritative source heading | Slide implementation | Presentation or interaction |
| ---: | --- | --- | --- | --- |
| 0 | cover | الغلاف — الدرس 28 | Cover step | Lesson identity: THE TIMELINE MASTER. |
| 1 | bridge | الافتتاح — 🧠 IQ200 | Bridge step | Bridge from Lesson 27: the five governing questions. |
| 2 | objectives | 🎯 أهداف الدرس | Objectives step | All 10 objectives ①–⑩. |
| 3 | s1 | ① 🧠 أول سؤال: ماذا حدث أولًا؟ | `S1_FirstQuestion` | Timeline Reasoning Lab: order the train events, name the tenses. |
| 4 | s2 | ② 📸 Past Simple | `S2_OneEvent` | One isolated event → Past Simple is sufficient. |
| 5 | s3 | ③ ⏪ Past Perfect | `S3_OlderEvent` | Event before another past event. |
| 6 | s4 | ④ 🔥 المقارنة المباشرة | `S4_Compare` | One-event vs two-event toggle (lost my key). |
| 7 | s5 | ⑤ 🧠 ليس «قديم جدًا» | `S5_OldMyth` | ❌/✅ myth check: had visited vs visited. |
| 8 | s6 | ⑥ 🕰️ خط الزمن | `S6_Timeline` | The shop had closed → I arrived → NOW. |
| 9 | s7 | ⑦ 🎯 متى يكون مفيدًا جدًا؟ | `S7_Camera` | Daniel left vs had left — one word flips the order. |
| 10 | s8 | ⑧ ⚡ اختبار سريع للعقل | `S8_Necklace` | Which happened first: taken / opened. |
| 11 | s9 | ⑨ ⭐ before | `S9_BeforeNotAlways` | Both sentences correct; before already orders events. |
| 12 | s10 | ⑩ 🧠 لماذا نستخدمه إذن؟ | `S10_WhyPerfect` | Emphasizing the earlier event. |
| 13 | s11 | ⑪ 🔄 after | `S11_AfterAfter` | Both after-forms correct; same order. |
| 14 | s12 | ⑫ 🧠 قاعدة مهمة جدًا | `S12_NoMagic` | No magic words — ask the temporal relationship. |
| 15 | s13 | ⑬ ⏳ by the time | `S13_ByTime` | Movie/fire completed-before visualizations. |
| 16 | s14 | ⑭ 🔥 already | `S14_Already` | had already + V3 (Lina / stadium). |
| 17 | s15 | ⑮ ⚡ just | `S15_Just` | Very close events, fixed order. |
| 18 | s16 | ⑯ 🧠 Past Simple + Past Perfect | `S16_PsPlusPp` | Airport flight + Sara refrigerator scenes. |
| 19 | s17 | ⑰ 🎥 أضف Past Continuous | `S17_ThreeTensesIntro` | The three-tense system + wallet sentence. |
| 20 | s18 | ⑱ 🧠 تحليل الجملة السابقة | `S18_WalletLayers` | Three-Tense Timeline Lab: label each verb layer. |
| 21 | s19 | ⑲ 🔥 ثلاثة أحداث في الماضي | `S19_Station` | Station story: PP / PS / PC roles revealed. |
| 22 | s20 | ⑳ 🧩 قاعدة «آلة الزمن» | `S20_TimeMachine` | Emma kitchen: oldest / ongoing / narrative points. |
| 23 | s21 | ㉑ 🚨 had went | `S21_ErrWent` | go → went → gone. |
| 24 | s22 | ㉒ 🚨 had ate | `S22_ErrAte` | eat → ate → eaten. |
| 25 | s23 | ㉓ 🚨 had saw | `S23_ErrSaw` | see → saw → seen. |
| 26 | s24 | ㉔ 🚨 Did you had…? | `S24_ErrDid` | Had + subject + V3? |
| 27 | s25 | ㉕ 🚨 didn't had… | `S25_ErrDidnt` | hadn't + V3 / had not + V3. |
| 28 | s26 | ㉖ 🧠 Past Simple أم Past Perfect؟ | `S26_Cases3` | All three cases (Paris 2024 / before France / photos). |
| 29 | s27 | ㉗ 🔥 sequence vs back reference | `S27_SeqBackref` | Morning chain vs backpack flashback. |
| 30 | s28 | ㉘ 🧠 الرجوع خطوة إلى الوراء | `S28_StepBack` | Time Machine: step back from «I arrived home.» |
| 31 | s29 | ㉙ 🕵️ Grammar Detective | `S29_CaveDetective` | Explorer/cave passage — five verbs classified. |
| 32 | s30 | ㉚ 🧪 تمرين 1 | `S30_ExChoose` (`EX28_CHOOSE`, instant-feedback rows + `SourceReveal seq="ex30"`) | 5 source questions; source answers had started / had finished / visited / had gone / were playing. |
| 33 | s31 | ㉛ 🧪 تمرين 2 — حدد الحدث الأول | `S31_ExFirstEvent` (`EX28_FIRST_EVENT` + `SourceReveal seq="ex31"`) | All 3 source sentences with earlier/later events preserved. |
| 34 | s32 | ㉜ 🧪 تمرين 3 — صحح الأخطاء | `S32_ExErrors` (`EX28_ERRORS` + `EX28_ERROR_SPOTS` + `SourceReveal seq="ex32"`) | Tap the wrong segment, then fix: 5 source errors + source corrections. |
| 35 | s33 | ㉝ 🚀 IQ200 Challenge | `S33_ExJohnMary` (`EX28_JOHN_MARY` + `LOGIC_NOTE_S33` + `SourceReveal seq="ex33"`) | Source question/options/answer preserved + platform Source Logic Note (see below). |
| 36 | s34 | ㉞ 🧠 تحدي أصعب | `S34_ExSarahTom` (`EX28_SARAH_TOM` + `SourceReveal seq="ex34"`) | Sarah/Tom challenge, source answer B, logic explained after checking. |
| 37 | s35 | ㉟ 🔥 IQ200 — ثلاثة أحداث | `S35_ExDaniel` (`EX28_DANIEL` + `SourceReveal seq="ex35"`) | Daniel laboratory: earliest / ongoing / later over the 4 source verbs. |
| 38 | s36 | ㊱ 🧠 اختبار المنطق الزمني | `S36_LogicTest` | read vs was reading — a meaningful semantic distinction. |
| 39 | s37 | ㊲ 🎬 بناء مشهد كامل | `S37_AlexScene` (`ALEX_SCENE_28`) | The full Alex scene; all 8 source tense classifications. |
| 40 | s38 | ㊳ 🧠 قاعدة متقدمة جدًا | `S38_MeaningRule` | Meaning first: ongoing / ordinary / earlier → three tenses. |
| 41 | s39 | ㊴ ⚔️ Boss Battle | `S39_ExBoss` (`BOSS_28` + `SourceReveal seq="ex39"`) | Exact source challenge: 3 options, answer B, full explanation. |
| 42 | s40 | ㊵ 🏆 التحدي النهائي | `S40_ExStory` | Self-authored "The Missing Backpack" — all 10 requirements tracked live. |
| 43 | summary | 🧠 ملخص الدرس | Summary step | Past Simple / Past Continuous / Past Perfect conceptual summary. |
| 44 | golden | 🏆 القاعدة الذهبية | Golden step | Ask the order of the events — the three patterns. |
| 45 | iqfinal | 🧠 IQ200 FINAL CHALLENGE | iqfinal step (`IQFINAL_28` + reveal units, `SourceReveal seq="iqfinal"`) | Airport scene: classify all four parts; full reveal with the conceptual conclusion. |
| 46 | closing | الخاتمة — LESSON 28 COMPLETE | Closing step | Lesson closing + entry to the Test Area. |

## Source-logic clarification — Section ㉝ (IQ200 Challenge, John / Mary)

The supplied source is preserved verbatim in the ledger (`SOURCE_SECTIONS`,
`EX28_JOHN_MARY`) and rendered to the student exactly as supplied:

- Question: أي جملة تعني أن John وصل أولًا؟
- A. `When John arrived, Mary had left.`
- B. `When Mary arrived, John had left.`
- Source answer: **A** (kept in `revealUnits` together with the source's own
  reasoning lines, including «إذن John لم يصل أولًا.»)

**The logical issue.** The precise temporal readings are:

- A: `Mary had left → John arrived` — Mary left first, then John arrived.
- B: `John had left → Mary arrived` — John left first, then Mary arrived.

Therefore **neither sentence establishes “John arrived first”** in the literal
sense unless additional context is assumed; the source's question wording and
answer are logically insufficient. The source's internal reasoning («Mary left
أولًا… إذن John لم يصل أولًا») is internally consistent but does not support
the original question stem.

**Platform handling (Lesson 27 typo-policy equivalent: preserve source,
disclose the correction).** The original question, options, and answer remain
untouched in the ledger and in the student drill. After checking, the student
sees the source answer and then a clearly marked
`🛠️ Platform Explanation — ملاحظة منطقية من المنصة · Source Logic Note`
(`LOGIC_NOTE_S33.clarification`) stating both readings precisely and explaining
that the claim «John arrived first» is not established by either sentence. The
teacher area repeats the disclosure in the ㉝ activity solution, and
`scripts/audit-lesson28.mjs` enforces: the ledger keeps the original wording,
the logic note carries both `Mary left ← John arrived` and
`John left ← Mary arrived`, and the note renders with its Platform tag only
after the student checks their answer.

## Delayed-reveal contract (audited)

- Selection is neutral (`bg-slate-900`) everywhere; checking is disabled until
  every prompt is answered.
- No score, no correctness colors, no explanations, no answer data attributes,
  and no answer-bearing ARIA labels exist anywhere (including hidden DOM)
  before the check/submit action; Test Solutions render zero answers before
  entitlement (submit or teacher unlock).
- After checking, each drill reveals its verbatim source answer block inside
  `data-reveal-block`; the Test Area reveals per-question marking +
  explanations; reset restores the fully neutral state.
- ㉞ keeps its answer lines in `revealUnits` so the Sarah/Tom verdict is not
  visible before checking; ㊵ story requirements stay visible (they are the
  task spec), while the story itself is never generated by the platform.

## Test Area structure (20 questions)

`TEST_28` — newly authored; none of ㉚–㊴ re-used with cosmetic edits.

| Conceptual distribution | Questions |
| --- | --- |
| Past Simple vs Past Perfect | 1, 4, 10, 13, 16 |
| before / after / by the time | 3, 8, 15 |
| Error correction (form) | 2, 7, 9, 17 |
| already / just / never | 8, 19 |
| Three-event timelines (ordering) | 5, 12 |
| Sequence vs back reference | 11, 16 |
| Meaning-based tense selection | 6, 13, 18, 20 |
| Mixed tense analysis | 14, 19, 20 |

Types: 10 single · 3 tf · 2 multi · 2 order · 1 match · 2 spot (error
analysis). Every question carries `why` (+ optional `trap`) rendered only in
the Solutions area after entitlement.

## Teacher Area structure

`TeacherArea28` (password `somer173`):

- **Overview** — lesson theme, core skill, and the relationship to Lesson 27
  (Lesson 27 built the machine; Lesson 28 turns it into a decision).
- **Objectives** — all 10 lesson objectives.
- **Teaching Notes (13)** — Past Simple, Past Perfect, Past Continuous, event
  ordering, sequence vs back reference, before, after, by the time, already,
  just, never, when, timeline reasoning.
- **Activity Solutions (8)** — detailed teacher-facing solutions for
  ㉚, ㉛, ㉜, ㉝ (incl. the source-logic disclosure), ㉞, ㉟, ㊱, ㊴ — reasoning,
  not only answer letters.
- **Story Rubric** — tense coverage, chronology, connectors, logical coherence,
  meaningful Past Perfect / Past Continuous, grammatical accuracy.
- **Common Mistakes (7)** — had + V2; unnecessary Past Perfect; missing Past
  Perfect when clarity requires it; before/after ≠ mandatory Past Perfect;
  ongoing vs completed confusion; trigger-word memorization; sequence vs back
  reference confusion.
- **Test Solutions access** — direct entry to the 20 unlocked solutions.

## Validation log (2026-10-07, branch `arena/c889b064-english-course` — native multi-step rebuild)

The area was rebuilt from the source-unit content viewer into a native
multi-step interactive lesson (47 steps ↔ 47 ledger entries, exact-once,
interaction-as-explanation) on the Lesson 27/29 teaching-kit pattern;
`SOURCE_SECTIONS` remains a fidelity ledger only, never rendered as a dump.

| Gate | Result |
| --- | --- |
| `npm run build` | ✓ built in ~4.4s |
| `npm run check:english-direction` | ✓ 1477 assertions, 30 lessons |
| `node scripts/audit-render-direction.mjs` | ✓ 1452 assertions |
| `node scripts/audit-lesson24.mjs` | ✓ 206 assertions |
| `node scripts/audit-lesson26.mjs` | ✓ 164 assertions |
| `node scripts/audit-lesson27.mjs` | ✓ 165 checks |
| `node scripts/audit-lesson28.mjs` | ✓ 328 assertions (rewritten for the native walk: per-click state captures, post-walk reveal presence, whitespace-tolerant solutions verification, ledger-phrase split) |
| `node scripts/audit-lesson29.mjs` | ✓ 75 checks |
| `node scripts/audit-lesson30.mjs` | ✓ 137 checks |
| `node scripts/interaction-test.mjs` | ✓ 558 passed, 0 failed |

No existing audit was weakened: the validations chains (`check:english-direction`,
render audit, per-lesson audits 24/26/27/29/30, interaction test) pass untouched;
only Lesson 28's own audit, data, and render files changed. Lessons 1–26 keep
the shared quiz path, Lessons 27/29 keep their structured assessments, and
Lesson 28 ships its rebuilt student / test / solutions / teacher areas —
all audited separately.
