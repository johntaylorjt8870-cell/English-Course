# Lesson 27 coverage ledger — Past Perfect — الماضي التام

## Scope and fidelity contract

Lesson 27 (`الدرس 27: Past Perfect — الماضي التام`) is added to the existing
course. Nothing in Lessons 1–26 was rewritten, restyled, or shortened: the
only shared-file changes are the lesson card + route registration in
`src/App.tsx`, the teacher-gate password rotation in
`src/shared/TeachersSpace.tsx` (`63971` → `somer173`), and validation-script
registration. The site password (`CloseYourEyes173`) is unchanged.

| Ledger item | Result |
| --- | --- |
| Authoritative source sections | **53** (`SOURCE_SECTIONS`: 44 numbered ①–㊹ in source order + 9 unnumbered: cover, bridge, objectives, golden, words, rule, map, finalrule, closing) |
| Source headings rendered on-slide | **53** — every source-mapped slide renders its own heading box carrying the `data-source-section="N"` marker |
| Slides | **56**: cover + objectives + 42 lesson slides + 11 in-lesson exercises + closing |
| Interactive lab visualizations | **37** `data-en-seq` boards: 24 lesson labs (`l27-timeline`, `l27-order-quiz`, `l27-sara`, `l27-had-grid`, `l27-verbs-regular`, `l27-verbs-irregular`, `l27-v2v3`, `l27-teacher-switch`, `l27-ali`, `l27-pairs-a`, `l27-pairs-b`, `l27-short-flip`, `l27-side-by-side`, `l27-lina-switch`, `l27-before`, `l27-after`, `l27-bytime`, `l27-emma-detective`, `l27-need-toggle`, `l27-iq-stepper`, `l27-emma-cinema`, `l27-liam`, `l27-john-switch`, `l27-dance`) + 11 exercise boards (`l27-ex-v3`, `l27-ex-hadhave`, `l27-ex-simple-perfect`, `l27-ex-noah`, `l27-ex-errors`, `l27-ex-transform`, `l27-ex-museum`, `l27-ex-order`, `l27-ex-boss`, `l27-ex-final10`, `l27-ex-story`) + cover/closing |
| Nine required interactive experiences | **9**: Timeline (`l27-timeline`), V1/V2/V3 table (`l27-verbs-regular`/`l27-verbs-irregular`/`l27-v2v3`), tense switch (`l27-teacher-switch`/`l27-lina-switch`/`l27-john-switch`), event ordering (`l27-order-quiz`/`l27-ali`), 3-tense cinema (`l27-emma-cinema`), detective (`l27-emma-detective` + `l27-ex-museum`), error hunt (`l27-ex-errors`), boss battle (`l27-ex-boss`), story builder (`l27-ex-story`) |
| In-lesson exercises | **11** (`v3`, `hadhave`, `simplePerfect`, `noah`, `errors`, `transform`, `museum`, `orderChal`, `boss`, `final10`, `story`) |
| Test Area questions | **20** newly authored (`TEST_27`, numbered 1–20): 15 single + 1 tf + 1 multi + 1 order + 1 match + 1 spot — Lesson 27 does **not** use the shared 12-question `FinalQuiz` |
| Test solutions | **20** detailed solutions (`Solutions27`), gated until submit or teacher unlock |
| Teacher area | `somer173`-gated: overview + 16 teaching notes + 10 activity solutions + 8 story-rubric requirements + 8 common mistakes + solutions entry |
| Intentional source errors preserved verbatim | **10** (`INTENTIONALLY_WRONG_27`) |
| New runtime dependencies | **None** |
| Branding | `EnglishwithSomeR` only; no country-flag branding added |

## Source-section to implementation map

| # | id | Authoritative source heading | Slide implementation | Presentation or interaction |
| ---: | --- | --- | --- | --- |
| 0 | cover | الغلاف — الدرس 27 | `Cover27` | Lesson identity: THE FLASHBACK DIRECTOR. |
| 1 | bridge | الافتتاح — 🧠 IQ200 | `BlockView` units 0–7 | Bridge from Past Simple / Past Continuous / when–while; visual question 📸🎥⏪. |
| 2 | objectives | 🎯 أهداف الدرس | `Objectives27` | All 10 objectives ①–⑩. |
| 3 | s1 | ① 🧠 ما هو Past Perfect؟ | `TimelineLab` + `OrderQuizLab` | Interactive timeline (event vs flashback) + train-arrival order quiz. |
| 4 | s2 | ② 🔥 الفكرة الذهبية | `BlockView` units 0–14 | «كان قد فعل» — the golden idea, then quiz. |
| 5 | s3 | ③ 🕰️ خط الزمن | `SaraDiagramLab` | Sara/cinema timeline diagram. |
| 6 | s4 | ④ ⭐ كيف نكوّن Past Perfect؟ | `HadGridLab` | had + V3 grid: had never changes. |
| 7 | s5 | ⑤ 🧱 ما هو V3؟ | `VerbRegularLab` + `VerbIrregularLab` | V1→V2→V3 table: 14 source verbs, regular vs irregular. |
| 8 | s6 | ⑥ 🚨 لا تخلط بين V2 و V3 | `V2V3Lab` | V2-vs-V3 sorter. |
| 9 | s7 | ⑦ 🧠 لماذا نحتاج Past Perfect أصلًا؟ | `TeacherSwitchLab` | Teacher-arrived switch: with/without had. |
| 10 | s8 | ⑧ 🎯 مثال ذكي جدًا | `AliOrderLab` | Ali/restaurant event ordering. |
| 11 | s9 | ⑨ 🟢 الجملة المثبتة | `BlockView` | Subject + had + V3 affirmative board. |
| 12 | s10 | ⑩ 🔥 مع الأفعال غير المنتظمة | `PairsLab` ×2 (`pairsA`/`pairsB`) | eat/go/see + take/write/break pairs. |
| 13 | s11 | ⑪ ❌ النفي | `BlockView` | hadn't + V3. |
| 14 | s12 | ⑫ 🚨 انتبه! | `BlockView` | V3 after hadn't too. |
| 15 | s13 | ⑬ ❓ الأسئلة | `BlockView` | Had + Subject + V3? |
| 16 | s14 | ⑭ 🗣️ الإجابات القصيرة | `ShortFlipLab` | Yes, I had. / No, I hadn't. flip cards. |
| 17 | s15 | ⑮ 🧠 الفرق بين Past Simple و Past Perfect | `SideBySideLab` | Side-by-side scene comparison. |
| 18 | s16 | ⑯ 🔥 المقارنة الأهم | `LinaSwitchLab` | Lina left vs Lina had left switch. |
| 19 | s17 | ⑰ ⏱️ before | `WordOrderLab` (`beforeLab`) | before clause-order lab. |
| 20 | s18 | ⑱ 🔄 after | `WordOrderLab` (`afterLab`) | after clause-order lab. |
| 21 | s19 | ⑲ ⏳ by the time | `WordOrderLab` (`bytimeLab`) | by the time lab. |
| 22 | s20 | ⑳ ⭐ already | `BlockView` | already board. |
| 23 | s21 | ㉑ ⚡ just | `BlockView` | just board. |
| 24 | s22 | ㉒ 🧠 never | `BlockView` | never board. |
| 25 | s23 | ㉓ 🏆 المثال الأسطوري | `BlockView` | Daniel/airport legendary example. |
| 26 | s24 | ㉔ 🕵️ Grammar Detective | `EmmaDetectiveLab` | Emma/dinner tense detective. |
| 27 | s25 | ㉕ 🔥 هل يعني دائمًا «كان قد»؟ | `BlockView` | Meaning nuance board. |
| 28 | s26 | ㉖ 🧠 لا يعني «حدث منذ زمن طويل» | `BlockView` | Myth-busting board. |
| 29 | s27 | ㉗ 🚨 ليس مطلوبًا دائمًا | `BlockView` | When Simple suffices. |
| 30 | s28 | ㉘ 🧩 الترتيب واضح أصلًا | `NeedToggleLab` | Need-it / skip-it toggle. |
| 31 | s29 | ㉙ 🧠 قاعدة IQ200 | `IqStepperLab` | Four-step IQ rule stepper. |
| 32 | s30 | ㉚ 🧪 تدريب 1 — اختر الفعل الصحيح | `ExV3` (`McqDrill`, `EX27_V3`) | 5 source questions; source answers started/eaten/gone/written/seen. |
| 33 | s31 | ㉛ 🧪 تدريب 2 — had أو have؟ | `ExHadHave` (`McqDrill`, `EX27_HADHAVE`) | 4 prompts; answers derived from the source rule (platform-tagged). |
| 34 | s32 | ㉜ 🧪 تدريب 3 — Simple أم Perfect؟ | `ExSimplePerfect` (`McqDrill`, `EX27_SIMPLE_PERFECT`) | 5 questions; platform-tagged contexts disambiguate meaning. |
| 35 | s33 | ㉝ 🧠 تدريب IQ200 — رتّب الأحداث | `ExNoah` (`EX27_NOAH`) | Noah order: B first, then A. |
| 36 | s34 | ㉞ 🧠 تدريب IQ200 — اكتشف الخطأ | `ExErrors` (`EX27_ERRORS` + `EX27_ERROR_SPOTS`) | Tap the wrong segment, then fix: 5 source errors. |
| 37 | s35 | ㉟ 🔥 تحدي التحويل | `ExTransform` (`EX27_TRANSFORM`) | Merge two events into a Past Perfect sentence (2 challenges + worked example). |
| 38 | s36 | ㊱ 🕵️ Grammar Detective — المستوى المتقدم | `ExMuseum` (`DETECTIVE_27`) | Classify all 6 museum verbs by tense + role. |
| 39 | s37 | ㊲ 🎬 القصة السينمائية | `EmmaCinemaLab` | Emma/key: 🎥 background · 📸 event · ⏪ flashback. |
| 40 | s38 | ㊳ 🧠 الفرق بين الأزمنة الثلاثة | `LiamSceneLab` | Liam 8:00 three-tense scene. |
| 41 | s39 | ㊴ 🏆 تحدي IQ200 الحقيقي | `ExOrderChal` (`ORDER_27_CHALLENGE`) | Order A–D; both context-compatible orders accepted (see nuance below). |
| 42 | s40 | ㊵ 🧠 سؤال صعب جدًا | `JohnSwitchLab` | John left vs had left meaning switch. |
| 43 | s41 | ㊶ 🚀 IQ200 — اكتشف المشكلة؟ | `DancePrecisionLab` | had danced vs was dancing precision lab. |
| 44 | s42 | ㊷ ⚔️ Boss Battle | `ExBoss` (`BOSS_27`) | Both supplied battles (sleeping / had left). |
| 45 | s43 | ㊸ 🧪 الاختبار النهائي | `ExFinal10` (`McqDrill`, `EX27_FINAL`) | 10 source questions; Q2 typo corrected (see below). |
| 46 | s44 | ㊹ 🏆 المهمة النهائية — Build the Story | `ExStory` | Learner writes ≥10 sentences: 3 tenses, when/while/before-after, chronology; starter sentence display-only. |
| 47 | golden | 🧠 الملخص الذهبي | `BlockView` | Golden summary board. |
| 48 | words | ⭐ الكلمات المهمة | `BlockView` | Key-words board. |
| 49 | rule | 🧠 القاعدة التي يجب ألا تنساها | `BlockView` | had ← V3 rule board. |
| 50 | map | 🗺️ خطة الأزمنة التي وصلنا إليها | `BlockView` | Tense-map board. |
| 51 | finalrule | 🧠 IQ200 FINAL RULE | `BlockView` | Final-rule board. |
| 52 | closing | الخاتمة — LESSON 27 COMPLETE | `Closing27` | Lesson closing + entry to the Test Area. |

## Source typo correction — Section ㊸ Question ②

The supplied source prints the same option twice for question ②
(`She had ______ her keys before she left the house.`):

- Original (kept verbatim in the ledger, `SOURCE_SECTIONS`, and in this doc):
  A) find · **B) found · C) found**
- Minimal correction (exercise data `EX27_FINAL` + student UI only):
  A) find · B) found · **C) founded** — exactly one correct answer (`found`).

The correction is recorded in `TYPO_S43_Q2` (`original: [find, found, found]`,
`corrected: [find, found, founded]`, `answer: 1`), disclosed to learners in a
platform-tagged note on the drill
(`Source typo correction — Section ㊸ Question ②: …`), and enforced by
`scripts/audit-lesson27.mjs` (ledger keeps the typo · drill has exactly one
correct option · record round-trips). The teacher area repeats the disclosure
in the ㊸ activity solution.

## Section ㊴ — context-dependent ordering nuance

The source note (kept verbatim in the ledger, the student reveal, and the
teacher area) states that events ① and ② may precede or surround the entry
moment depending on context, so meaning — not trigger words alone — decides.
The challenge therefore accepts **both** context-compatible orders
(`ORDER_27_CHALLENGE.accept`: `[B, C, A, D]` and `[C, B, A, D]`), shows the
nuance note after checking either way, and the audit asserts both acceptance
paths plus nuance rendering.

## Delayed-reveal contract (audited)

- Selection is neutral (`bg-slate-900`) everywhere; checking is disabled until
  every prompt is answered.
- No score, no correctness colors, no explanations, no answer data attributes,
  and no answer-bearing ARIA labels exist anywhere (including hidden DOM)
  before the check/submit action; solutions render zero answers before
  entitlement (submit or teacher unlock).
- After checking, each drill reveals its verbatim source answer block inside
  `data-reveal-block`; the Test Area reveals per-question marking +
  explanations; reset restores the fully neutral state.
- In-lesson drills keep platform-derived answers/contexts behind a
  `Platform Explanation` tag so supplied source content stays distinguishable.

## Validation log (2026-10-06, branch `arena/179148f7-english-course`)

| Gate | Result |
| --- | --- |
| `npm run build` | ✓ built in ~5s |
| `npm run check:english-direction` | ✓ 1394 assertions, 27 lessons |
| `node scripts/audit-render-direction.mjs` | ✓ 1449 assertions |
| `node scripts/audit-lesson24.mjs` | ✓ 165 assertions |
| `node scripts/audit-lesson26.mjs` | ✓ 164 assertions |
| `node scripts/audit-lesson27.mjs` | ✓ 274 assertions |
| `node scripts/interaction-test.mjs` | ✓ 558 passed, 0 failed |

No existing audit was weakened: Lesson 27 additions to shared scripts extend
inventories (27 folders, routes 1–27, `somer173`) while Lessons 1–26 keep the
shared 12-question quiz path; the Lesson 27 leak detector matches the Lesson
26 precedent (Arabic-answer reveals), documented here because English verb
labels and tense names are themselves the question buttons.
