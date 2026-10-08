# Lesson 31 coverage ledger — Present Perfect · المضارع التام

## Scope and fidelity contract

Lesson 31 (`الدرس 31: Present Perfect — المضارع التام` — 🌉 IQ200 THE PRESENT
BRIDGE) is a **native multi-step interactive lesson** built on the approved
Lesson 6 UX benchmark and the rebuilt Lessons 27/28/29/30 system: one clear
idea per step, no raw source dumps, interaction-as-explanation, and immediate
feedback + `why` for every in-lesson answer. The change set is confined to
Lesson 31 plus the shared registries it must touch: `src/lessons/lesson31/`
(new `data.ts` + `Lesson31.tsx`), `src/App.tsx` (route + hub card),
`scripts/audit-lesson31.mjs` (new), `scripts/check-english-direction.mjs`
(31-lesson inventory + Lesson 31 fidelity block),
`scripts/audit-render-direction.mjs` (31 lesson folders + routing loop),
`package.json` (audit chain), and this doc. No other lesson file was edited.
The teacher-area password remains `somer173` (never re-created).

`SOURCE_SECTIONS` is the fidelity/coverage ledger only: it is never rendered as
raw lines and never drives slide generation. Every step renders from semantic
components (`Frame`, `En`, `Rich`, `PartsLine`, `Lab`, `McqRow`, `TapOrder`,
`TwoStepFix`, `SortBuckets`, `PairMatch`, `RevealCards`, `CueSwitch`,
`BridgeTrack`, `FormulaStrip`, `WriteArena`) and carries its ledger title as a
`data-source-section` chip (audited exact-once vs `SLIDES`). English is
isolated LTR (`En` / `LatinRuns`, `dir="ltr"` + `unicode-bidi: isolate`); the
Arabic shell stays RTL. Platform-added explanations are always tagged
`Platform Explanation`.

| Ledger item | Result |
| --- | --- |
| Authoritative source sections | **50** (`SOURCE_SECTIONS`: 45 numbered ①–㊺ in source order + 5 unnumbered: `cover`, `opening`, `objectives`, `pspp`, `map`) |
| Source headings rendered on-slide | **50** — every step carries its ledger title as a `data-source-section` chip, exact-once vs `SLIDES` (audited) |
| Native steps (rendered sequentially) | **50**: cover + opening + objectives + 45 mapped steps ①–㊺ + the unnumbered `pspp` panel + `map` — `SLIDES` ↔ ledger exact-once |
| Interactive lab visualizations | **112** distinct `data-en-seq` lab boards + **47** completion-gated `SourceReveal` summary blocks |
| Signature interactive experiences | **10** (see below) |
| In-lesson practice | **Immediate feedback + why everywhere** — no solve-all-then-check in the student area; gated source summaries appear only after completing each interaction |
| Test Area questions | **20** newly authored (`TEST_31`, numbered 1–20): 9 single + 2 tf + 3 multi + 2 order + 2 match + 2 spot — real tap/spot UI, neutral until submit |
| Test difficulty mix | **6 Basic · 7 Medium · 4 Advanced · 3 Thinking** (`TEST_31_LEVEL_COUNTS`, audited) |
| Test solutions | **20** explanatory solutions (answer + why + trap), grouped by level, locked until test submit or teacher unlock |
| Teacher area | `somer173`-gated: overview (9 objectives + 4 prerequisites + 3 core briefs) + 14 teaching notes + 9 source-activity solution blocks + 2 rubrics + 10 common mistakes + the 19-entry intentionally-wrong inventory + the 50-section source index + solutions entry |
| Intentional source errors preserved verbatim | **19** (`INTENTIONALLY_WRONG_31`: ④ V2-after-have ×4, ⑤ forgot, ⑧ in-2022, ⑩ double negative, ㉛–㉞ famous errors, ㉟ detective ×8) |
| Source visuals | **2** source timelines (`DIAGRAMS_31`) kept verbatim as labelled `See textbook/reference` art — never guessed or redrawn |
| New runtime dependencies | **None** |
| Branding | `EnglishwithSomeR` only; no country-flag branding added |

## The ten signature interactive experiences

| # | Experience | Implementation |
| --- | --- | --- |
| 1 | Present Bridge | `l31-cover` + `BridgeTrack` — the ⏮ → 🌉 → ⏺ track under every use: past event, bridge, now |
| 2 | have/has selector | `l31-s3-helpers` (③) — 7 subjects, instant why per subject |
| 3 | V3 machine + wrong-form hunter | `l31-s4-v3` (④) — 8 verb triples + the 4 intentionally wrong `have went / has ate / have saw / has wrote` forms with explicit distractors |
| 4 | Sentence builder (tap-to-order) | `l31-s5-build-1/2`, `l31-s15-order` — scrambled chunks tapped in order, each tap corrected instantly |
| 5 | Time-cue switch | `l31-s7-switch`, `l31-s17-period`, `l31-s18-today`, `l31-s28-compare`, `l31-s40-transform` — add/remove the time phrase and watch the tense verdict change live |
| 6 | Classification buckets | `l31-s6-classify` (experience vs finished time), `l31-s16-buckets` (already vs yet), `l31-s19-classify` (for vs since) |
| 7 | Two-step error fix | `l31-s8-fix`, `l31-s31..s34-fix` (㉛–㉞) and the 8-sentence `l31-s35-detect` (㉟): tap the wrong segment, then pick the fix — 19 source errors in total |
| 8 | Tense detective / boss battle | `l31-s36-smart` (㊱ 8 cue pairs), `l31-s39-boss` (㊴ Lina story: tense per verb), `l31-s43-boss4` (㊸ four sentences, four tenses) |
| 9 | Angle-of-view labs | `l31-s37-iq` (㊲ Maya/Daniel), `l31-s38-deeper` (㊳ the plane question), `l31-s44-map` (㊹ the four-lens big map) |
| 10 | Real-writing arena | `l31-s42-write` (㊷) — 7 real "write about yourself" starters with live pattern checks, hint + model per line |

Supporting labs: `l31-opening` (bridge cards), `l31-objectives` (checkable
goals), `l31-s1-formula`, `l31-s2-bridge`, `l31-s9-build` (ever), `l31-s10-trap`
(never without `not`), `l31-s11-result`, `l31-pspp-pair`, `l31-s12-words`,
`l31-s13-already`, `l31-s14-match` (just), `l31-s20-for`, `l31-s21-since`,
`l31-s22-track` (continuation), `l31-s23-negative`, `l31-s24-questions`,
`l31-s25-match` (short answers), `l31-s26-wh`, `l31-s27-howlong`,
`l31-s29-triple`, `l31-s30-timeline` (source art as reference),
`l31-s41-forsince`, `l31-s45-summary` (uses + 10 words + golden rule),
`l31-map-curriculum`.

## Source-section to implementation map

| # | id | Authoritative source heading | Step | Presentation or interaction |
| ---: | --- | --- | --- | --- |
| — | cover | الغلاف — الدرس 31: Present Perfect — المضارع التام | غلاف (1) | Bridge hero + lens preview + motto `⏮ Past event → 🌉 bridge → NOW`. |
| — | opening | الافتتاح — نكمل من الدرس 30 ونبني على V3 | افتتاح (2) | Tap-to-reveal cards of what is already built (V2/V3, past system) + the new promise. |
| — | objectives | 🎯 أهداف الدرس | أهداف (3) | the source goal list turned into 12 checkable goals with a live counter. |
| 1 | s1 | ① 🧠 ما هو Present Perfect؟ | `S1_WhatStep` | Definition + `Subject + have/has + V3` strip + two instant questions; completion reveal keeps the source definition and example. |
| 2 | s2 | ② ⭐ لماذا اسمه Present Perfect؟ | `S2_WhyNameStep` | Why the name: past event + present relevance; bridge visual; instant why. |
| 3 | s3 | ③ 🧩 have أم has؟ | `S3_HaveHasStep` | 7-row have/has selector (I/You/We/They/He/She/It) with the source examples; completion reveal lists the rule. |
| 4 | s4 | ④ 🧠 ماذا يأتي بعد have/has؟ | `S4_V3Step` | 8-verb V3 chart (base/V2/V3) + the 4 intentionally wrong V2 forms (`I have went.` …) each with explicit distractors and correction. |
| 5 | s5 | ⑤ 🏗️ الجملة المثبتة | `S5_PositiveStep` | Guided builders for two source sentences + 4 V3 completions; completion reveal keeps all 6 full source sentences. |
| 6 | s6 | ⑥ 🔥 أول استخدام: التجربة في الحياة | `S6_ExperienceStep` | Life-experience vs finished-time classification + reveal of the 5 source examples. |
| 7 | s7 | ⑦ ⚠️ وهنا يظهر الفرق الخطير مع Past Simple | `S7_ContrastStep` | Cue switch on `I visited Italy in 2023` ↔ `I have visited Italy`; the tense verdict updates live. |
| 8 | s8 | ⑧ 🕵️ Grammar Detective | `S8_DetectiveStep` | London-2022 two-step fix + 2 instant questions (both statements kept, meaning difference explained). |
| 9 | s9 | ⑨ ⭐ ever = هل سبق أن...؟ | `S9_EverStep` | Build `Have you ever …?` + ever position lab + short-answer pair; the 4 source questions and the helicopter extra are kept. |
| 10 | s10 | ⑩ ⭐ never = لم يسبق أبدًا | `S10_NeverStep` | never cards + the `I haven't never seen it. ❌` trap lab; reveal keeps all 4 source sentences. |
| 11 | s11 | ⑪ 🔥 الاستخدام الثاني: نتيجة موجودة الآن | `S11_ResultStep` | Result lab: each sentence + its present result (wallet/glasses/keys/door) + instant why. |
| — | pspp | 📸 Past Simple vs Present Perfect | `S_PsPpStep` | Dedicated pair panel: `I lost my keys yesterday.` (متى؟) ↔ `I have lost my keys.` (ما المشكلة الآن؟). |
| 12 | s12 | ⑫ ⭐ الاستخدام الثالث: شيء حدث مؤخرًا وله علاقة بالحاضر | `S12_RecentStep` | just/already/recently/lately word bank + 5 source sentences + just-lab. |
| 13 | s13 | ⑬ ⭐ already = بالفعل | `S13_AlreadyStep` | already placement + 5 reveal cards with source translation; completion reveal keeps the meaning note. |
| 14 | s14 | ⑭ ⭐ just = للتو | `S14_JustStep` | Matching: the 5 `just` sentences ↔ their meanings; completion reveal keeps the summary line. |
| 15 | s15 | ⑮ ⭐ yet = بعد / حتى الآن | `S15_YetStep` | Build the `yet?` question + the 3 negatives; reveal keeps all 3 full negative sentences. |
| 16 | s16 | ⑯ 🧠 الفرق بين already و yet | `S16_AlreadyYetStep` | Sorting buckets (already / yet) over the 4 source sentences + completion reveal. |
| 17 | s17 | ⑰ ⭐ الاستخدام الرابع: فترة زمنية لم تنتهِ بعد | `S17_PeriodStep` | Period switch (`today … this year`) forcing a choice against the closed `last week`; 3 source examples. |
| 18 | s18 | ⑱ ⚠️ لا تعتمد على كلمة واحدة فقط | `S18_TodayStep` | Today-pair cue switch: `two exercises today` ↔ `the test today at 9:00` — the same word, two tenses. |
| 19 | s19 | ⑲ ⭐ for و since مع Present Perfect | `S19_ForSinceStep` | Classify the 6 source items into for/since buckets + the golden rule note. |
| 20 | s20 | ⑳ 🧩 Present Perfect + for | `S20_ForStep` | for-bank + the 4 source sentences + duration reasoning per line. |
| 21 | s21 | ㉑ 🧩 Present Perfect + since | `S21_SinceStep` | since-bank + the 4 source sentences + start-point reasoning per line. |
| 22 | s22 | ㉒ 🔥 لماذا نستخدم Present Perfect هنا؟ | `S22_ContinuationStep` | Continuation track `start → ─────→ NOW`; reveal keeps the source reason and the example. |
| 23 | s23 | ㉓ ⭐ النفي | `S23_NegativeStep` | haven't/hasn't machine over all 6 source negatives, each with live why. |
| 24 | s24 | ㉔ 🧠 الأسئلة Yes/No | `S24_QuestionStep` | 6 yes/no questions with the `Have/Has + subject + V3?` build; reveal keeps the source list. |
| 25 | s25 | ㉕ ⭐ الإجابات القصيرة | `S25_ShortStep` | Matching question ↔ short answer (4 pairs) + reveal keeping the full answer table. |
| 26 | s26 | ㉖ 🧠 Wh Questions | `S26_WhStep` | Wh-word selector with the 6 source questions; reveal keeps the shared pattern. |
| 27 | s27 | ㉗ 🔥 السؤال العبقري: How long? | `S27_HowLongStep` | How-long lab with both source answers (for six years / since 2020). |
| 28 | s28 | ㉘ ⚔️ Present Perfect vs Past Simple | `S28_BigCompareStep` | The movie pair + probe `متى؟` ↔ `هل شاهدته من قبل؟`; completion reveal keeps both readings. |
| 29 | s29 | ㉙ 🔥 مقارنة ثلاثية: Past Simple / Present Perfect / Past Perfect | `S29_TripleStep` | Matching the 3 museum sentences to their tense + reason; `TRIPLE_RULES_31` recap. |
| 30 | s30 | ㉚ 🧠 خط زمني خارق | `S30_TimelineStep` | Tap the 2 timeline nodes (`had started` → `arrived`) + **both source diagrams rendered verbatim as `See textbook/reference`**. |
| 31 | s31 | ㉛ 🚨 خطأ شهير جدًا | `S31_FamousStep` | `I have seen him yesterday.` two-step fix + the source note that `I have seen him before` stays correct. |
| 32 | s32 | ㉜ 🚨 خطأ آخر | `S32_FamousStep` | `She has went home.` two-step fix + `go → went → gone` instant why. |
| 33 | s33 | ㉝ 🚨 خطأ ثالث | `S33_FamousStep` | `Did you have finished your homework?` two-step fix + "no did with Present Perfect". |
| 34 | s34 | ㉞ 🚨 خطأ رابع | `S34_FamousStep` | `He doesn't have finished.` two-step fix + `hasn't + V3`. |
| 35 | s35 | ㉟ 🕵️ Grammar Detective | `S35_DetectiveStep` | 8-sentence detective with live counter; final reveal lists all 8 corrected source sentences. |
| 36 | s36 | ㊱ 🧠 تحدي الاختيار الذكي | `S36_SmartStep` | 8 cue-driven choices (yesterday/already/…); completion reveal lists the 8 answers derived from the data. |
| 37 | s37 | ㊲ 🔥 IQ200 — هل تستطيع اكتشاف المعنى؟ | `S37_IQStep` | Maya/Daniel angle cards + 2 meaning questions + the source angle-of-view note. |
| 38 | s38 | ㊳ 🧠 تحدي أعمق | `S38_DeeperStep` | The plane question: experience vs specific 2022 event — both sentences valid, meanings differ. |
| 39 | s39 | ㊴ 🏆 Boss Challenge | `S39_BossLinaStep` | Lina's story + tense picker for all 6 verbs (last year vs this year reason cards). |
| 40 | s40 | ㊵ 🚀 IQ200 — حوّل الجملة | `S40_TransformStep` | Remove `in 2021` by tapping, then choose the transformation; banned past-time cues listed. |
| 41 | s41 | ㊶ 🧩 تحدي for / since | `S41_ForSinceStep` | 5-sentence drill with live attempt/correct counters + the golden rule. |
| 42 | s42 | ㊷ 🔥 تحدي نهائي | `S42_FinalChallengeStep` | Writing arena: 7 real-answer starters with pattern checks, hints and models. |
| 43 | s43 | ㊸ 🏆 Final Boss — أربع جمل، أربعة معانٍ | `S43_FinalBossStep` | Matching the 4 sentences (`ate / was eating / had eaten / have eaten`) to tense + meaning. |
| 44 | s44 | ㊹ 🧠 الخريطة الكبرى التي يجب أن تحفظها | `S44_BigMapStep` | Four-lens map switcher (📸 🎥 ⏪ 🌉) with a source example per lens. |
| 45 | s45 | ㊺ ⭐ ملخص الدرس 31 | `S45_SummaryStep` | Formula + 5 uses + 10 key words + golden rule (`GOLDEN_31`) with ✅/❌ pair. |
| — | map | 🗺️ خريطة المنهج حتى الآن | خريطة (50) | Curriculum map: Present/Past stations (we-are-here marker) + next station + future system, then the test entry. |

## Textbook exercises and how they are represented

| Source exercise | Representation |
| --- | --- |
| ⑧ Grammar Detective (London 2022) | `S8_DetectiveStep` — two-step fix + 2 instant questions (source texts kept). |
| ㉕ / ㉖ short answers + wh-questions | `S25_ShortStep` / `S26_WhStep` — matching + wh selector over the exact source items. |
| ㉛ ㉜ ㉝ ㉞ four famous errors | `S31–S34_FamousStep` — each a two-step fix (wrong segment → fix option) + a quick check, with the source caution note. |
| ㉟ Grammar Detective (8 sentences) | `S35_DetectiveStep` — all 8 items as two-step fixes with a live counter and an all-8 correction reveal. |
| ㊱ Smart choice (8 pairs) | `S36_SmartStep` — 8 instant-why questions using the source stems and options. |
| ㊲ ㊳ IQ200 angle-of-view | `S37_IQStep` / `S38_DeeperStep` — both sentences always kept, the meaning difference is the answer. |
| ㊴ Boss Challenge (Lina story) | `S39_BossLinaStep` — tense picker for the 6 verbs + `last year`/`this year` reason cards. |
| ㊵ Transformation (`I visited Japan in 2021.`) | `S40_TransformStep` — tap to delete the time phrase, then choose the Present Perfect form. |
| ㊶ for / since (5 sentences) | `S41_ForSinceStep` — instant for/since picker per sentence with live counters. |
| ㊷ Write about yourself (7 starters) | `S42_FinalChallengeStep` — real inputs with live pattern checks, hint + model per starter. |
| ㊸ Final Boss (4 sentences / 4 meanings) | `S43_FinalBossStep` — real matching interaction (tenses deliberately shuffled). |
| ㊹ Big map (4 lenses) | `S44_BigMapStep` — lens switcher, all four source examples kept. |
| ㊺ Summary | `S45_SummaryStep` — formula, 5 uses, 10 words, golden rule. |

Repetitive source material is kept (never condensed away): all 45 numbered
sections and the 5 unnumbered panels have their own step, and repeated
structures (for/since lists, negative list, short answers, wh-questions,
already/just/yet examples) keep every source item as its own data entry.

## Test / Solutions / Teacher map

- **Test Area** (`TestArea31`): exactly 20 newly authored questions (9 single,
  2 tf, 3 multi, 2 order, 2 match, 2 spot) with the 6/7/4/3 difficulty split;
  ordering is tap-to-build with a real removal control, matching is per-left
  chip groups, spot selects a real segment, multi-select is a real toggle set.
  Nothing about correctness, score, explanation or colour appears before
  submit; submit unlocks only at 20/20; after submit the score, correct/wrong
  counts, per-question `why` + trap are shown; reset clears answers, ordering,
  matching selections, submission state, score and solution visibility.
- **Solutions** (`Solutions31`): locked panel until test submit or teacher
  unlock; then all 20 solutions grouped into Basic / Medium / Advanced /
  Thinking chunks with answer + why + trap and the restated stem.
- **Teacher** (`TeacherArea31`, `somer173`): overview (objectives,
  prerequisites, core), the 50-step teaching sequence, difficult concepts,
  14 teaching notes, 9 source-activity solution blocks, rubrics, 10 common
  mistakes, the 19-entry intentionally-wrong inventory, the 50-section source
  index, and a link to the test solutions. A wrong password shakes and leaks
  nothing.

## Verification performed (automated/static only — no live browser session)

- `npm run build` — production build passes.
- `node scripts/check-english-direction.mjs` — 1610 assertions, 31 lessons
  (includes the new Lesson 31 fidelity block: ledger/step registry, preserved
  intentionally-wrong lines, diagram reference, four-area shell, routing).
- `npm run audit:english-direction` — render audit + Lessons 24/26/27/28/29/30
  audits + `audit-lesson31.mjs` (717 assertions: ledger exact-once coverage,
  all 50 steps server-rendered, interaction walk to completion, immediate
  feedback contract, gated source summaries, preserved source phrases,
  no-reversal checks, dataset fidelity, 20-question test flow with
  neutral→submit→reset, solutions lock, teacher gate).
- `node scripts/interaction-test.mjs` — 558 passed, 0 failed (Lessons 1–26
  unchanged).
- Not performed: no manual browser/visual pass was run, so no visual claim is
  made beyond the automated renders, BIDI isolation checks and interaction
  walks listed above.
