# Lesson 27 coverage ledger — Past Perfect — الماضي التام

## Scope and fidelity contract

Lesson 27 (`الدرس 27: Past Perfect — الماضي التام`) has been rebuilt as a native
multi-step interactive lesson adhering to the Lesson 6 and Lesson 29 benchmark.
`SOURCE_SECTIONS` serves as the authoritative fidelity/coverage ledger and is
never rendered as a raw text dump. Every pedagogical concept is delivered
through interactive explanation, sentence anatomy, and immediate feedback.

| Ledger item | Result |
| --- | --- |
| Authoritative source sections | **53** (`SOURCE_SECTIONS`: 44 numbered ①–㊹ in source order + 9 unnumbered: cover, bridge, objectives, golden, words, rule, map, finalrule, closing) |
| Source headings mapped to steps | **53** — every source-mapped step renders its own semantic frame carrying the `sourceTag` / `data-source-section` marker |
| Native Steps | **53** focused steps with multi-step rail navigation, step counter (`data-slide-counter`), progress bar, and keyboard navigation |
| Interactive lab visualizations | **32+** `data-en-seq` boards across concepts, comparisons, drills, and story studio |
| Key interactive teaching experiences | Interactive Timeline (`l27-timeline`), Sara Cinema Simulator (`l27-sara`), Had Formula Grid (`l27-had-grid`), 14 Source Verbs Library (`l27-verbs-regular`), V2 vs V3 Trap Sorter (`l27-v2v3`), Teacher Meaning Switcher (`l27-teacher-switch`), Ali Restaurant Scenario (`l27-ali`), Irregular Pairs Explorer (`l27-pairs-a`), Short Answers Flip Cards (`l27-short-flip`), Side-by-Side Comparison (`l27-side-by-side`), Lina Departure Switcher (`l27-lina-switch`), Clause-Order Labs (`l27-before`, `l27-after`, `l27-bytime`), Emma Detective (`l27-emma-detective`), Clear Sequence Toggle (`l27-need-toggle`), IQ200 Stepper (`l27-iq-stepper`), Drills 1–3 (`l27-ex-v3`, `l27-ex-hadhave`, `l27-ex-simple-perfect`), Noah Ordering (`l27-ex-noah`), Error Hunter (`l27-ex-errors`), Sentence Transformation (`l27-ex-transform`), Museum Advanced Detective (`l27-ex-museum`), Emma 3-Camera Cinema (`l27-emma-cinema`), Liam 3-Lens Scene (`l27-liam`), Classroom Event Ordering (`l27-ex-order`), John Arrival/Departure Switch (`l27-john-switch`), Dance Precision Lab (`l27-dance`), Boss Battle (`l27-ex-boss`), In-Lesson Final 10-Q Drill (`l27-ex-final10`), and Story Studio (`l27-ex-story`) |
| Practice drills | Real-time immediate feedback with explanation and source answer reveal |
| Test Area questions | **20** newly authored questions (`TEST_27`, numbered 1–20) across structured types (single, tf, multi, order, match, spot) with strict anti-leak gating and full reset |
| Final Test (end of lesson) | **15** platform-authored questions (`finalTestBank.ts` → `LESSON_27`) spanning all seven types — no correctness, score, or explanation while answering; the single «تصحيح الاختبار» action reveals score + review + explanations, with a full reset. Separate from the 20-question Test Area; answer key lives in the Teacher Area |
| Test solutions | **20** detailed solutions (`Solutions27`), gated until submit or teacher unlock, explaining why the answer is right and warning against common traps |
| Teacher area | `somer173`-gated: overview + 16 teaching notes + 10 activity solutions + story rubric + 8 common mistakes + test solutions access |
| Intentional source errors preserved verbatim | **10** (`INTENTIONALLY_WRONG_27`) for pedagogical error-detection drills |
| New runtime dependencies | **None** |
| Direction & BIDI | RTL Arabic shell with strictly isolated LTR English strings via `LatinRuns` and `En` |

## Source-section to implementation map

| # | id | Authoritative source heading | Step implementation | Presentation or interaction |
| ---: | --- | --- | --- | --- |
| 0 | cover | الغلاف — الدرس 27 | `CoverStep` | Lesson identity: THE FLASHBACK DIRECTOR + 3-Camera Preview. |
| 1 | bridge | الافتتاح — 🧠 IQ200 | `BridgeStep` | Bridge from Past Simple / Past Continuous / when–while to Past Perfect. |
| 2 | objectives | 🎯 أهداف الدرس | `ObjectivesStep` | All 10 objectives with interactive checklist. |
| 3 | s1 | ① 🧠 ما هو Past Perfect؟ | `S1Timeline` | Interactive timeline (event 1 vs event 2) + train arrival. |
| 4 | s2 | ② 🔥 الفكرة الذهبية | `S2GoldenIdea` | «كان قد فعل» — interactive sentence player with Arabic translations. |
| 5 | s3 | ③ 🕰️ خط الزمن | `S3SaraDiagram` | Sara / cinema timeline simulator. |
| 6 | s4 | ④ ⭐ كيف نكوّن Past Perfect؟ | `S4HadGrid` | Subject + had + V3: pronoun selector showing `had` remains identical. |
| 7 | s5 | ⑤ 🧱 ما هو V3؟ | `S5VerbTable` | 14 source verbs library: regular vs irregular. |
| 8 | s6 | ⑥ 🚨 لا تخلط بين V2 و V3 | `S6V2V3Trap` | V2 vs V3 trap analyzer (`had gone` ✅ vs `had went` ❌). |
| 9 | s7 | ⑦ 🧠 لماذا نحتاج Past Perfect أصلًا؟ | `S7TeacherSwitch` | Teacher arrival switcher: with/without `had` flips the timeline. |
| 10 | s8 | ⑧ 🎯 مثال ذكي جدًا | `S8AliOrder` | Ali & restaurant scenario. |
| 11 | s9 | ⑨ 🟢 الجملة المثبتة | `S9Affirmative` | Affirmative sentence builder & dissected sentence cards with anatomy. |
| 12 | s10 | ⑩ 🔥 مع الأفعال غير المنتظمة | `S10IrregularPairs` | Irregular verb pairs: eat, go, see, take, write, break. |
| 13 | s11 | ⑪ ❌ النفي | `S11Negative` | hadn't + V3 with full/contracted toggle. |
| 14 | s12 | ⑫ 🚨 انتبه! | `S12NegativeV3Trap` | V3 after hadn't too (`hadn't seen` ✅ vs `hadn't saw` ❌). |
| 15 | s13 | ⑬ ❓ الأسئلة | `S13Questions` | Had + Subject + V3? question cards with anatomy. |
| 16 | s14 | ⑭ 🗣️ الإجابات القصيرة | `S14ShortAnswers` | Yes, I had. / No, I hadn't. flip cards. |
| 17 | s15 | ⑮ 🧠 الفرق بين Past Simple و Past Perfect | `S15SideBySide` | Side-by-side comparison: finished vs had finished. |
| 18 | s16 | ⑯ 🔥 المقارنة الأهم | `S16LinaSwitch` | Lina left vs Lina had left interactive switcher. |
| 19 | s17 | ⑰ ⏱️ before | `S17BeforeLab` | `before` rule: [Past Perfect] + before + [Past Simple]. |
| 20 | s18 | ⑱ 🔄 after | `S18AfterLab` | `after` rule: After + [Past Perfect] → [Past Simple]. |
| 21 | s19 | ⑲ ⏳ by the time | `S19ByTimeLab` | `by the time` rule + concert/doctor examples. |
| 22 | s20 | ⑳ ⭐ already | `S20Already` | `already` placement between had and V3. |
| 23 | s21 | ㉑ ⚡ just | `S21Just` | `just` for immediate preceding events. |
| 24 | s22 | ㉒ 🧠 never | `S22Never` | `never` for experiences absent up to a past moment. |
| 25 | s23 | ㉓ 🏆 المثال الأسطوري | `S23DanielLegend` | Daniel & airport legendary example. |
| 26 | s24 | ㉔ 🕵️ Grammar Detective | `S24EmmaDetective` | Emma & dinner detective question. |
| 27 | s25 | ㉕ 🔥 هل يعني دائمًا «كان قد»؟ | `S25Nuance` | Meaning nuance and sequence focus. |
| 28 | s26 | ㉖ 🧠 لا يعني «حدث منذ زمن طويل» | `S26MythBuster` | Myth buster: relative sequence, not time distance. |
| 29 | s27 | ㉗ 🚨 ليس مطلوبًا دائمًا | `S27NotAlwaysNeeded` | When Past Simple is enough (single past event). |
| 30 | s28 | ㉘ 🧩 الترتيب واضح أصلًا | `S28OrderClear` | `and then` vs `after` toggle. |
| 31 | s29 | ㉙ 🧠 قاعدة IQ200 | `S29IqStepper` | 4-step decision flowchart. |
| 32 | s30 | ㉚ 🧪 تدريب 1 — اختر الفعل الصحيح | `S30PracticeV3` | 5 source questions with immediate feedback + reason. |
| 33 | s31 | ㉛ 🧪 تدريب 2 — had أو have؟ | `S31PracticeHadHave` | 4 prompts with immediate feedback + platform tag. |
| 34 | s32 | ㉜ 🧪 تدريب 3 — Simple أم Perfect؟ | `S32PracticeSimplePerfect` | 5 questions with contextual disambiguation + platform tag. |
| 35 | s33 | ㉝ 🧠 تدريب IQ200 — رتّب الأحداث | `S33Noah` | Noah station ordering: B then A. |
| 36 | s34 | ㉞ 🧠 تدريب IQ200 — اكتشف الخطأ | `S34ErrorHunter` | Tap the wrong word in 5 sentences + live fix reveals. |
| 37 | s35 | ㉟ 🔥 تحدي التحويل | `S35Transform` | Sentence merger & transformer (2 exercises + worked example). |
| 38 | s36 | ㊱ 🕵️ Grammar Detective — المستوى المتقدم | `S36MuseumDetective` | Classify 6 verbs from museum heist into 3 tenses. |
| 39 | s37 | ㊲ 🎬 القصة السينمائية | `S37EmmaCinema` | Emma & mysterious key: 🎥 background · 📸 event · ⏪ flashback. |
| 40 | s38 | ㊳ 🧠 الفرق بين الأزمنة الثلاثة | `S38LiamScene` | Liam 8:00 three-tense scene. |
| 41 | s39 | ㊴ 🏆 تحدي IQ200 الحقيقي | `S39OrderChallenge` | Order classroom events A–D (accepts B,C,A,D & C,B,A,D). |
| 42 | s40 | ㊵ 🧠 سؤال صعب جدًا | `S40JohnSwitch` | John left vs had left micro-switch. |
| 43 | s41 | ㊶ 🚀 IQ200 — اكتشف المشكلة؟ | `S41DancePrecision` | had danced vs was dancing precision lab. |
| 44 | s42 | ㊷ ⚔️ Boss Battle | `S42BossBattle` | Two Boss Battles (sleeping / train left). |
| 45 | s43 | ㊸ 🧪 الاختبار النهائي | `S43Final10` | 10 source questions with immediate feedback & typo fix note. |
| 46 | s44 | ㊹ 🏆 المهمة النهائية — Build the Story | `S44StoryStudio` | Story Studio with live requirements validator for "The Mysterious Door". |
| 47 | golden | 🧠 الملخص الذهبي | `GoldenSummary` | Golden summary of affirmative, negative, question, short answers. |
| 48 | words | ⭐ الكلمات المهمة | `WordsSummary` | Key time words and conjunctions cards. |
| 49 | rule | 🧠 القاعدة التي يجب ألا تنساها | `KeyRule` | `had → V3` rule and core verb triplets. |
| 50 | map | 🗺️ خريطة الأزمنة التي وصلنا إليها | `TenseMap` | Full course roadmap from Present Simple to Past Perfect. |
| 51 | finalrule | 🧠 IQ200 FINAL RULE | `FinalRule` | Three-camera thinking: 📸 🎥 ⏪. |
| 52 | closing | الخاتمة — LESSON 27 COMPLETE | `ClosingStep` | Lesson completion + entry button to Test Area. |

## Source typo correction — Section ㊸ Question ②

The supplied source prints the same option twice for question ②
(`She had ______ her keys before she left the house.`):

- Original (kept verbatim in the ledger, `SOURCE_SECTIONS`, and in this doc):
  A) find · **B) found · C) found**
- Minimal correction (exercise data `EX27_FINAL` + student UI):
  A) find · B) found · **C) founded** — exactly one correct answer (`found`).

The correction is recorded in `TYPO_S43_Q2`, disclosed to learners in a
platform-tagged note on the drill, and enforced by `scripts/audit-lesson27.mjs`.

## Section ㊴ — context-dependent ordering nuance

The challenge accepts both context-compatible orders (`[B, C, A, D]` and `[C, B, A, D]`),
shows the nuance note after checking either way, and explains why meaning takes precedence over rigid formulas.
