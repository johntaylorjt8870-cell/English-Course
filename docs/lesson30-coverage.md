# Lesson 30 coverage ledger — مراجعة شاملة لنظام الماضي

## Scope and fidelity contract

Lesson 30 (`الدرس 30: مراجعة شاملة لنظام الماضي` — 🧠 IQ200 Past Simple +
Past Continuous + Past Perfect + Past Perfect Continuous) is a **native
multi-step interactive lesson** rebuilt on the approved Lessons 27/28/29 +
Lesson 6 system: one clear idea per step, no raw source dumps, and
interaction-as-explanation with immediate feedback + why for every in-lesson
answer. Nothing in any other lesson was touched: the change set is exactly
`src/lessons/lesson30/Lesson30.tsx` (rewrite),
`src/lessons/lesson30/data.ts` (additive slide registry + solutions +
intentionally-wrong inventory only — `SOURCE_SECTIONS`, `TEST_30`, and all
teacher data unchanged), `scripts/audit-lesson30.mjs` (rewrite), and this doc.
The teacher-area password remains `somer173`.

`SOURCE_SECTIONS` is the fidelity/coverage ledger only: it is never rendered
as raw lines. Every step renders from semantic components (`Frame`,
`SentenceCard`, `PartsLine`, `Lab`, `McqRow`, `DetectiveQuiz`, `TapOrder`,
`TenseMachine`, `FixItem`, `StoryLive`) and carries a `data-source-section`
chip naming its ledger section (audited exact-once). English is isolated LTR
(`En` / `LatinRuns`, `dir="ltr"`); the Arabic shell is RTL with strict BIDI
isolation. Platform-added explanations are always tagged
`Platform Explanation`.

| Ledger item | Result |
| --- | --- |
| Authoritative source sections | **46** (`SOURCE_SECTIONS`: 40 numbered ①–㊵ in source order + 6 unnumbered: cover, opening, objectives, summary, golden, final) |
| Source headings rendered on-slide | **46** — every step carries its ledger title as a `data-source-section` chip, exact-once vs `SLIDES` (audited) |
| Native steps (rendered sequentially) | **46**: cover + opening + objectives + 40 mapped steps ①–㊵ + summary + golden + final — `SLIDES` ↔ ledger exact-once |
| Interactive lab visualizations | **60+** distinct `data-en-seq` lab boards + **17** completion-gated `SourceReveal` summary blocks |
| Signature interactive experiences | **10** (see below) |
| In-lesson practice | **Immediate feedback + why everywhere** — no solve-all-then-check in the student area; gated source summaries appear only after completing each interaction |
| Test Area questions | **20** newly authored (`TEST_30`, numbered 1–20): 9 single + 3 tf + 2 multi + 2 order + 2 match + 2 spot — real tap/spot UI, neutral until submit |
| Test solutions | **20** explanatory solutions (answer + why + trap), gated until test submit or teacher unlock |
| Teacher area | `somer173`-gated: overview (6 objectives + 4 prerequisites + 3 core briefs) + 9 teaching notes + 9 activity solutions + 2 rubrics + 8 common mistakes + solutions entry |
| Intentional source errors preserved verbatim | **6** (`INTENTIONALLY_WRONG_30`, ㉜ wrong→right pairs) |
| New runtime dependencies | **None** |
| Branding | `EnglishwithSomeR` only; no country-flag branding added |

## The ten signature interactive experiences

| # | Experience | Implementation |
| --- | --- | --- |
| 1 | Tense Machine | `l30-s2` (+`l30-s2-machine`, ②) — pick a door sentence, answer the 4 questions نعم/لا, the verdict updates live |
| 2 | Had Switch | `l30-s13` (⑬) — toggle `had` on/off: Sara/I order flips live on the timeline + «who first?» re-asks itself |
| 3 | Guided ordering | `l30-s3-order` (③ Leo chain), `l30-s7-order` (⑦ Maya station), `l30-s8-order` (⑧ backbone) — tap events in time order, each tap corrected instantly |
| 4 | Tense Detective | `l30-s10/s11/s24/s28/s30/s36/final-detect` — classify every verb with 4 lens chips, instant why per verb, source verdict on completion |
| 5 | Two-step Error Fix | `l30-s32` (㉜) — tap the wrong segment first, then pick the fix; 6 source errors incl. the She→I caution |
| 6 | Focus / Trick labs | `l30-s14–s16` (bus/kitchen/wall), `l30-s33` (for-an-hour toggle flips the answer), `l30-s34/s35` (meaning/focus pick the tense) |
| 7 | Word-trap labs | `l30-s17` (yesterday ×3 tenses), `l30-s18` (when ×4 tenses), `l30-s19` (while patterns), `l30-s20` (before toggle — both forms correct) |
| 8 | Sam timeline | `l30-s31` (㉛) — tap each node (had been working / had finished / was driving / rang) to reveal its tense + role |
| 9 | FINAL BOSS arena | `l30-s38-write` (㊳) — complete the firefighters story; live analyzer tracks starter + 4 tenses as you type |
| 10 | Mystery-day challenge | `l30-s40-write` (㊵) — 12 sentences with live counters (4 PS / 3 PC / 3 PP / 2 PPC + 8 required words) |

Supporting labs: `l30-cover` (lens preview), `l30-opening` (system cards),
`l30-objectives` (checkable goals), `l30-s1` (match-the-question),
`l30-s5` (find the flashback), `l30-s6` (state vs activity), `l30-s9`
(background + event), `l30-s12` (four cameras + shoot), `l30-s21` (by-the-time
deadlines), `l30-s22` (already spot), `l30-s23` (still lab), `l30-s25/26/39`
(source quizzes with instant why), `l30-s27` (meaning picks tense),
`l30-s29` (two-second algorithm stepper), `l30-s37` (tense functions),
`l30-summary` / `l30-golden` (review lenses).

## Source-section to implementation map

| # | id | Authoritative source heading | Slide implementation | Presentation or interaction |
| ---: | --- | --- | --- | --- |
| 0 | cover | الغلاف — الدرس 30 | Cover step | Control-room hero + 4-lens preview + stats. |
| 1 | opening | الافتتاح — وصلنا الآن إلى نقطة مهمة جدًا | Opening step | Tap-to-reveal system cards + control-system rule. |
| 2 | objectives | 🎯 أهداف الدرس | Objectives step | 10 checkable goals with live counter. |
| 3 | s1 | ① 🧠 النظام الكامل | `S1_SystemStep` | Match each door sentence to its question; summary on completion. |
| 4 | s2 | ② 🧠 لا تحفظ الزمن... اسأل أربعة أسئلة | `S2_MachineStep` | Tense Machine: sentence picker + live verdict. |
| 5 | s3 | ③ 📸 Past Simple | `S3_PSStep` | Guided Leo chain + «why no had?» instant quiz. |
| 6 | s4 | ④ 🎥 Past Continuous | `S4_PCStep` | Scene-or-event classification ×4. |
| 7 | s5 | ⑤ ⏪ Past Perfect | `S5_PPStep` | Anatomy + find-the-flashback tap lab. |
| 8 | s6 | ⑥ ⏪🎥 Past Perfect Continuous | `S6_PPCStep` | Anatomy + state-vs-activity labs + tense fingerprint note. |
| 9 | s7 | ⑦ 🕰️ الخط الزمني الكامل | `S7_MayaStep` | Guided Maya ordering + overlap platform note. |
| 10 | s8 | ⑧ 🧠 لماذا Past Simple مهم جدًا؟ | `S8_BackboneStep` | Guided 5-event backbone builder. |
| 11 | s9 | ⑨ 🎥 أضف الخلفية | `S9_BackgroundStep` | Anatomy + background/event labs + famous formula. |
| 12 | s10 | ⑩ ⏪ أضف Past Perfect | `S10_AddPPStep` | 3-layer detective (find the flashback). |
| 13 | s11 | ⑪ ⏪🎥 أضف Past Perfect Continuous | `S11_AddPPCStep` | 6-verb full-story detective. |
| 14 | s12 | ⑫ 🔥 أربع عدسات زمنية | `S12_LensesStep` | Four cameras + shoot-with-the-right-camera quiz. |
| 15 | s13 | ⑬ 🧠 Past Simple vs Past Perfect | `S13_HadSwitchStep` | Had Switch: live timeline flip + self-updating quiz. |
| 16 | s14 | ⑭ 🧠 Past Continuous vs Past Perfect Continuous | `S14_FocusBusStep` | Focus matching: what vs since-when (bus). |
| 17 | s15 | ⑮ 🧠 Past Perfect vs Past Perfect Continuous | `S15_KitchenStep` | Result vs process matching (kitchen). |
| 18 | s16 | ⑯ ⭐ قاعدة «النتيجة أم النشاط؟» | `S16_ResultActivityStep` | Rule cards + painted-wall focus labs. |
| 19 | s17 | ⑰ 🚨 لا تعتمد على كلمة واحدة | `S17_YesterdayStep` | Yesterday ×3 tenses + golden reveal. |
| 20 | s18 | ⑱ 🧠 «when» لا يعني زمنًا واحدًا | `S18_WhenStep` | Tom ×4 tenses + meaning-rules reveal. |
| 21 | s19 | ⑲ 🧠 «while» | `S19_WhileStep` | Parallel-vs-interrupt patterns + mental image. |
| 22 | s20 | ⑳ 🧠 before و after | `S20_BeforeAfterStep` | Form switch: both correct, same order. |
| 23 | s21 | ㉑ ⏳ by the time | `S21_ByTheTimeStep` | Deadline formula + tap-the-completed-part ×3. |
| 24 | s22 | ㉒ 🧠 already | `S22_AlreadyStep` | Anatomy + already placement spot. |
| 25 | s23 | ㉓ 🧠 still | `S23_StillStep` | still = continuity + duration-vs-moment labs. |
| 26 | s24 | ㉔ 🕵️ Grammar Detective | `S24_RescueStep` | Rescue-passage detective + source analysis. |
| 27 | s25 | ㉕ 🧪 اختبار 1 — اختر الزمن | `S25_Quiz1Step` | 5 instant-why questions + answer key on completion. |
| 28 | s26 | ㉖ 🧪 اختبار 2 — اختر حسب المعنى | `S26_Quiz2Step` | Ahmed ×3 meanings + key on completion. |
| 29 | s27 | ㉗ 🧠 IQ200 — لا يوجد زمن واحد «صحيح» دائمًا | `S27_NoSingleStep` | Meaning-picks-tense ×3 + reveal. |
| 30 | s28 | ㉘ 🔥 IQ200 — ثلاثة أحداث | `S28_NoraStep` | Nora 4-relation detective. |
| 31 | s29 | ㉙ 🧠 كيف تختار الزمن خلال ثانيتين؟ | `S29_AlgoStep` | 4-step algorithm stepper + why-it-works note. |
| 32 | s30 | ㉚ ⚔️ Boss Battle — اكتشف الزمن من القصة | `S30_SamStep` | Sam 5-verb battle (was-trap included). |
| 33 | s31 | ㉛ 🧠 خط الزمن | `S31_TimelineStep` | Tappable Sam timeline nodes. |
| 34 | s32 | ㉜ 🧪 اختبار 3 — صحح الأخطاء | `S32_FixStep` | Two-step fix ×6 + shared-fingerprint note. |
| 35 | s33 | ㉝ 🚀 IQ200 — السؤال الخادع | `S33_TrickStep` | Duration toggle flips the answer live. |
| 36 | s34 | ㉞ 🧠 سؤال أصعب | `S34_HarderStep` | Meaning-first ×3 + angle-of-view reveal. |
| 37 | s35 | ㉟ 🧠 مستوى متقدم: focus | `S35_FocusStep` | 4 focus angles + completion reveal. |
| 38 | s36 | ㊱ 🎬 تمرين القصة السينمائية | `S36_LinaStep` | Lina 6-verb cinema detective. |
| 39 | s37 | ㊲ 🧠 لماذا هذه القصة قوية؟ | `S37_FunctionsStep` | Tap-a-tense function cards + real-writing note. |
| 40 | s38 | ㊳ 🏆 FINAL BOSS | `S38_BossStep` | Firefighters arena with live analysis. |
| 41 | s39 | ㊴ 🏆 الاختبار النهائي | `S39_FinalExamStep` | 8 instant-why questions + key on completion. |
| 42 | s40 | ㊵ 🧠 التحدي الأكبر | `S40_ChallengeStep` | Mystery-day arena with live quotas. |
| 43 | summary | 🧠 الملخص النهائي | Summary step | 4-lens recap cards with source examples. |
| 44 | golden | 🏆 القاعدة الذهبية الكبرى | Golden step | Tap-to-reveal question→tense + golden rule. |
| 45 | final | 🚀 IQ200 FINAL CHALLENGE | Final step | Lab detective + full-system recap + test entry. |

## Test / Solutions / Teacher map

- **Test Area** (`TestArea30`): exactly 20 questions (9 single incl. 5 meaning-driven
  + 3 tf + 2 multi + 2 order + 2 match + 2 spot). Matching is per-left chip
  groups and ordering is tap-to-build — no `<select>` or manual text. Fully
  neutral until submit; submit unlocks only at 20/20; score + coloring + why +
  trap after submit; reset clears everything.
- **Solutions** (`Solutions30`): locked panel until test submit or teacher
  unlock; then all 20 answers with why + trap and restated stems.
- **Teacher** (`TeacherArea30`, `somer173`): overview + 9 teaching notes + 9
  detailed source-activity solutions (㉕ ㉖ ㉜ ㉝ ㉞ ㉔ ㉚ ㊱ final) + 2 rubrics
  (㊳ ㊵) + 8 common mistakes + solutions link. Wrong password shakes and leaks
  nothing.
