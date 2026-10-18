# Lesson 31 coverage ledger — Present Perfect · المضارع التام

## Scope and fidelity contract (rebuild 2026-10)

Lesson 31 (`الدرس 31: Present Perfect — المضارع التام` — 🌉 IQ200 THE PRESENT
BRIDGE) was **visually and pedagogically rebuilt** on top of its approved
native multi-step system, using Lesson 1 as the design reference and the
Lesson 30 post-PR-#59 compact header as the shell rule:

* **Shell (Lesson 1 spirit):** full-screen `h-screen` layout — desktop step
  rail (all 50 steps grouped by source section), mobile drawer with focus
  trap + `Escape` + focus return, floating prev/next pill, and the four area
  tabs. The page itself never scrolls; only the lesson scroller does.
* **Compact header (PR #59 rule):** the header shows *only* a step counter
  (`خطوة N من 50`), a progress bar with `role="progressbar"`, and the four
  area tabs (with the 🔒 indicator on Solutions). It never repeats the step
  title, lead or tip — those live once inside the step frame. The cover step
  renders **outside** the step frame so its title/lead/tip are not doubled.
* **Visual identity (scoped `lesson31.css`, no shared file touched):**
  turquoise/aqua = Present Perfect · coral = Past Simple · violet = Past
  Perfect · gold = NOW / current results. The same tone tags every tense in
  explanations, examples, labs, the test and the teacher area. Arabic stays
  RTL; every English run is an atomic LTR isolate (`inline-block`, scoped)
  so mixed titles can never split mid-isolate across lines.
* **Typography:** the project's own stacks — `Changa`/`Rubik` for Arabic
  headings/body (Style B, as in Lesson 1) and `Rubik`/`Fredoka` for English,
  all loaded from the existing `index.html` font link; no new network
  dependency and sane fallbacks if a family is unavailable.
* **Fidelity:** `SOURCE_SECTIONS` (45 numbered ①–㊺ + 5 unnumbered) remains
  the coverage ledger only; every step still maps to exactly one ledger
  section, and every source example/solution/intentionally-wrong line is
  still rendered verbatim through semantic components.
* **Change set:** `src/lessons/lesson31/{Lesson31.tsx,data.ts,lesson31.css}`,
  `scripts/audit-lesson31.mjs` (artifact cleanup), `scripts/audit-lesson31-browser.mjs`
  (new, optional real-Chromium verification) and this doc. No other lesson
  file, shared component or stylesheet was modified.

| Ledger item | Result |
| --- | --- |
| Authoritative source sections | **50** (`SOURCE_SECTIONS`: 45 numbered ①–㊺ + 5 unnumbered: `cover`, `opening`, `objectives`, `pspp`, `map`) |
| Source headings rendered on-slide | **50** — every step carries its ledger title as a `data-source-section` chip, exact-once vs `SLIDES` (audited) |
| Native steps (rendered sequentially) | **50**: cover + opening + objectives + 45 mapped steps ①–㊺ + the unnumbered `pspp` panel + `map` |
| Signature interactive experiences | **12** (see below) |
| In-lesson practice | Immediate feedback + `why` everywhere; gated source summaries appear only after completing each interaction |
| Test Area questions | **20** newly authored (`TEST_31`): 9 single + 2 tf + 3 multi + 2 order + 2 match + 2 spot; 6 Basic · 7 Medium · 4 Advanced · 3 Thinking |
| Final Test (end of lesson) | **15** platform-authored questions (`finalTestBank.ts` → `LESSON_31`); no correctness/score/explanation before the single correction; key lives in the Teacher Area |
| Test solutions | **20** explanatory solutions (answer + why + trap), grouped by level, locked until test submit or teacher unlock |
| Teacher area | `somer173`-gated: overview, 50-step teaching sequence, difficult concepts, 14 notes, 9 source-solution blocks, 2 rubrics, 10 mistakes, the 19-entry intentionally-wrong inventory, the 50-section index |
| New runtime dependencies | **None** |
| Branding | `EnglishwithSomeR` / shared `Signature` rendered **once** in the shell; not duplicated inside lesson content |

## Visual identity & colour semantics

| Concept | Colour | Where it appears |
| --- | --- | --- |
| Present Perfect (الزمن البطل) | turquoise / aqua (`#0f766e` family) | step chips, builder slots, timeline bridge, lens chips, rail active item, test/solutions accents |
| Past Simple (الماضي المنتهي) | coral / orange (`#c2410c` family) | comparison cards, timeline X marker when fixed, lens chips |
| Past Perfect (الماضي الأقدم) | violet (`#6d28d9`) | triple-comparison lens, V3/formula accents |
| NOW / النتائج الحالية | gold / amber (`#b45309`) | NOW pulse marker, result zone, current-result chips |

Contrast: every visible text node on its own background meets WCAG AA
(≥4.5:1, ≥3:1 for large text) measured in real Chromium — including the
graded test state; the only shared elements excluded from measurement are
the platform-wide WhatsApp signature bar and the watermark ghost (identical
on all 44 lessons and out of scope by design).

## The signature interactive experiences (12)

| # | Experience | Implementation |
| --- | --- | --- |
| 1 | **Interactive timeline (two viewpoints)** | `TimelineLab31` at `pspp`: the student switches `I lost my keys yesterday.` ↔ `I have lost my keys.` and watches the bridge to NOW open/close, the X marker move, the NOW result zone fade, and the question each sentence answers (`متى؟` vs `ما المشكلة الآن؟`) |
| 2 | **Tense comparison lab (2-way → 3-way)** | `CompareLab31` at `s28`: lens switcher (Present Perfect / Past Simple) plus a toggle that adds Past Perfect; each lens swaps focus, rule, probe question, source example and a mini timeline |
| 3 | **Sentence builder** | `BuilderLab31` at `s5`: subject → have/has (wrong helper explained live) → V3 (the V2 trap explained) → positive/negative/question; the built sentence renders live with role slots |
| 4 | **Signal-word board** | `SignalBoard31` at `s12`: all ten cue words (ever…since) explorable with meaning, usual position, formula and source examples; a Platform Explanation states cues never replace context |
| 5 | Present Bridge | `l31-cover` + `BridgeTrack` — ⏮ → 🌉 → ⏺ under every use |
| 6 | have/has selector | `l31-s3-helpers` (③) — 7 subjects, instant why per subject |
| 7 | V3 machine + wrong-form hunter | `l31-s4-v3` (④) — 8 verb triples + the 4 intentionally wrong forms |
| 8 | Two-step error fix | `l31-s8-fix`, `l31-s31..s34-fix`, the 8-sentence `l31-s35-detect` (㉟): tap the wrong segment, then pick the fix — solutions never shown before the attempt |
| 9 | Boss text analyzer | `BossTextAnalyzer31` at `s39`: the Lina story stays verbatim; each verb phrase is a tappable chip that reveals its tense + reason |
| 10 | Final Boss analysis | `BossAnalysis31` at `s43`: pick the tense per sentence, then open "التحليل" for the reason + mini timeline — a correct pick is never just a colour |
| 11 | Real-writing arena | `l31-s42-write` (㊷) — 7 real starters with live pattern checks |
| 12 | Classification / matching / cue-switch kit | `SortBuckets`, `PairMatch`, `CueSwitch`, `TapOrder` across ⑥⑯⑲㉑㉕㊱㊶ |

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

## Verification performed — real browser (Chromium, headless)

`node scripts/audit-lesson31-browser.mjs` (optional, provisioned with
`npm install --no-save playwright-core @sparticuz/chromium`, dev server on
:5173). 89 assertions, all passing; screenshots + `report.json` in
`docs/lesson31-visual/`:

* **Viewports:** 1440×900 (laptop, primary), 1280×800, 1024×768, 768×1024,
  375×812 — no horizontal overflow anywhere; the shell stays exactly one
  screen tall (no page-level scroll) at every size.
* **Compact header:** measured height ≤120px on laptop; asserts the header
  shows the step counter + progress + four tabs and does **not** repeat the
  step title; Solutions tab shows 🔒 before entitlement.
* **Contrast:** every visible text node vs its own background (oklch-aware
  parser + gradient stops, worst-case) at every stop: cover, timeline,
  compare lab, builder, signal board, detective, Final Boss, test area,
  graded test, teacher area, all viewports — 0 issues.
* **Interactions verified live:** timeline viewpoint switch changes the
  bridge width (0% ↔ 78%) and the NOW zone; compare lab grows 2→3 lenses and
  swaps the example; builder rejects `have` with *She* and `went` as V3, then
  builds `She has gone home.` / `She hasn't gone home.` / `Has she gone
  home?`; signal board opens *yet* with position + source example; detective
  hides corrections until the two-step attempt; Boss analyzer explains
  `joined` via *last year*; Final Boss opens reason + timeline; 20/20 test
  answers unlock submit and only then reveal the score; solutions stay locked;
  wrong teacher password rejected, `somer173` opens the full area + key.
* **Keyboard/a11y:** Tab focus ring visible (3px outline, `:focus-visible`),
  drawer traps focus, `Escape` closes it and returns focus to the index
  button, `aria-pressed`/`aria-expanded`/`role="progressbar"`/`aria-live`
  present, hover and disabled states verified as real style changes.
* **Console:** zero page/console errors across the whole run.
* **Known environment limitation:** the sandbox Chromium has no emoji font,
  so mascots/emoji render as tofu boxes in the screenshots; on real machines
  they render normally (no code dependency on them). Google Fonts is blocked
  in the sandbox, so screenshots use the fallback stack — the shipped
  `index.html` still requests the project fonts.

## Verification performed (automated/static)

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
- `node scripts/audit-lesson31-browser.mjs` — 89 real-Chromium assertions
  (contrast, overflow, header height, interactions, gates, keyboard) — see
  the browser section above.
- `npm run audit:lesson-navigation` — 176 passed, 0 failed.
- `npm run audit:english-direction` — the whole chain (Lessons 24–44 audits,
  Final Test audits, source-reveal audit, BIDI audit) passes with Lesson 31
  rebuilt.
- `git diff --check` — clean; the change set touches only Lesson 31 files,
  its audit scripts, its visual evidence folder and this doc.
