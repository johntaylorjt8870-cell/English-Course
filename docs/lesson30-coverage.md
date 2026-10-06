# Lesson 30 coverage ledger — مراجعة شاملة لنظام الماضي

## Architecture

Lesson 30 is a **native multi-step interactive lesson** built on the same modern
pattern as Lessons 27/28/29: one step at a time, persistent progress bar and
step counter, desktop step rail grouped by section, mobile drawer, Previous/Next
pill controls, keyboard navigation (arrows + space), and four separate areas:

- **Student Lesson Area** — 46 navigable steps (`data-area="student-lesson"`)
- **Test Area** — 20 newly authored questions (`data-area="l30-test"`)
- **Test Solutions** — explanatory, gated until submit/teacher (`data-area="l30-solutions"`)
- **Teacher Area** — password `somer173` (`data-area="l30-teacher"`)

Files: `src/lessons/lesson30/data.ts` (authoritative source ledger + test +
teacher data) and `src/lessons/lesson30/Lesson30.tsx` (shell, steps, labs,
test/solutions/teacher). Registered in `src/App.tsx` (hub card + `#/lesson/30`).

There are exactly **46 steps**: cover (1), opening (2), objectives (3),
numbered source sections ①–㊵ (4–43), final summary (44), golden rule (45),
IQ200 final challenge (46).

English is isolated LTR via `LatinRuns`, `dir="ltr"` + `unicode-bidi: isolate`
(project CSS); the Arabic shell is RTL.

## Source coverage map

| Source section | Step | Interactive experience |
| --- | --- | --- |
| العنوان + سطر IQ200 | 1 (cover) | Four-lens overview cards |
| الافتتاح «وصلنا الآن…» | 2 | — (ledger text) |
| 🎯 أهداف الدرس (10) | 3 | — |
| ① النظام الكامل | 4 | ClassifyLab — classify the 4 door sentences |
| ② آلة اختيار الزمن | 5 | **TenseMachineLab** — answer the 4 questions, machine computes the tense |
| ③ Past Simple | 6 | Platform note on event chains |
| ④ Past Continuous | 7 | — |
| ⑤ Past Perfect | 8 | — |
| ⑥ Past Perfect Continuous | 9 | — |
| ⑦ الخط الزمني الكامل (Maya) | 10 | **OrderLab** — order the 4 station events |
| ⑧ لماذا Past Simple مهم | 11 | — |
| ⑨ أضف الخلفية | 12 | — |
| ⑩ أضف Past Perfect | 13 | — |
| ⑪ أضف PPC | 14 | **DetectiveLab** — tag all 5 verbs of the full story |
| ⑫ أربع عدسات زمنية | 15 | ClassifyLab — which camera shot each sentence |
| ⑬ PS vs PP | 16 | **HadFlipLab** — toggle `had`, answer "who was first?" |
| ⑭ PC vs PPC | 17 | FocusPickLab (bus) |
| ⑮ PP vs PPC | 18 | FocusPickLab (kitchen) |
| ⑯ النتيجة أم النشاط؟ | 19 | FocusPickLab (wall) |
| ⑰ لا تعتمد على كلمة واحدة | 20 | ClassifyLab — 3 `yesterday` sentences |
| ⑱ when لا يعني زمنًا واحدًا | 21 | ClassifyLab — 4 `When I arrived, Tom…` |
| ⑲ while | 22 | — |
| ⑳ before و after | 23 | Platform note (before ≠ always PP) |
| ㉑ by the time | 24 | — |
| ㉒ already | 25 | — |
| ㉓ still | 26 | — |
| ㉔ Grammar Detective | 27 | **DetectiveLab** — rescue-team passage |
| ㉕ اختبار 1 (5 أسئلة) | 28 | **SourceQuizLab** — answer all, then check (source key revealed) |
| ㉖ اختبار 2 (3 أسئلة معنى) | 29 | SourceQuizLab with source notes |
| ㉗ لا يوجد زمن واحد صحيح | 30 | Platform note on meaning-driven choice |
| ㉘ ثلاثة أحداث (Nora) | 31 | DetectiveLab — Nora sentence |
| ㉙ الخوارزمية خلال ثانيتين | 32 | TenseMachineLab (second run) |
| ㉚ Boss Battle (Sam) | 33 | DetectiveLab — Sam story (incl. `was` as verb-to-be PS) |
| ㉛ خط الزمن | 34 | Platform note on reading the timeline |
| ㉜ اختبار 3 — صحح الأخطاء (6) | 35 | **ErrorFixLab** — pick the correct fix; source ② note preserved verbatim with labeled platform explanation of the She→I shift |
| ㉝ السؤال الخادع | 36 | SourceQuizLab (single trick question + source caveat) |
| ㉞ سؤال أصعب | 37 | **MeaningMatchLab** — match each intended meaning to B/C/D |
| ㉟ focus | 38 | FocusPickLab — 4 angles of the house |
| ㊱ القصة السينمائية (Lina) | 39 | DetectiveLab — 6 verbs |
| ㊲ لماذا هذه القصة قوية؟ | 40 | — |
| ㊳ FINAL BOSS | 41 | **StoryWriterLab (boss)** — real pattern analyzer requires all 4 tenses |
| ㊴ الاختبار النهائي (8) | 42 | SourceQuizLab — all 8 with source answers/notes |
| ㊵ التحدي الأكبر | 43 | **StoryWriterLab (challenge)** — counts 4 PS / 3 PC / 3 PP / 2 PPC, 12 sentences, and the 8 required words |
| 🧠 الملخص النهائي | 44 | — |
| 🏆 القاعدة الذهبية الكبرى | 45 | — |
| 🚀 IQ200 FINAL CHALLENGE | 46 | DetectiveLab — analyze first, source answer revealed after check |

Every ledger line of the supplied source is rendered inside its step via the
`Lines` renderer (English lines in LTR boxes, Arabic lines RTL, arrows/`↓`
preserved). No source section was dropped, shortened, or re-ordered.

## Deliberate deviations (documented, none hidden)

1. **GB flag emoji removed from the title** — the repository-wide
   `check:english-direction` guard bans the GB flag everywhere (same convention
   applied to Lessons 17–29). Title text is otherwise verbatim.
2. **Bold markers** (`**…**`) are stripped (project ledger convention: "بدون **").
3. **㉜-② distractor options** in the ErrorFixLab are platform-authored (marked
   in the lab intro); the correct option and the caution note are the source's
   verbatim correction, and the She→I subject shift of the source is preserved
   and explained in a labeled *Platform Explanation*.
4. All *Platform Explanations* are visually tagged (`🛠️ Platform Explanation —
   شرح من المنصة، ليس من نص المصدر`).

## Test / Solutions / Teacher

- **Test**: exactly 20 newly authored questions — 9 single, 3 true/false,
  2 multi-select, 2 ordering, 2 matching, 2 error-spotting. No feedback,
  scores, or coloring before **إنهاء الاختبار** (Submit is disabled until all
  20 are answered); after submit: score, correct/incorrect counts, summary.
  **↺ إعادة** resets answers, submitted state, score, and feedback.
- **Test Solutions**: independent area, grouped 5-at-a-time, each with the
  correct answer, *why* the rule applies, and the likely trap. Gated until the
  test is submitted or the teacher area is unlocked (same policy as Lesson 27).
- **Teacher Area**: unlocked by `somer173` only. Contains lesson overview and
  objectives, prerequisites, core concepts, 9 teaching-note blocks, detailed
  solutions for all source exercises (㉕ ㉖ ㉜ ㉝ ㉞ + the four detective
  passages + final challenge), two writing rubrics (㊳, ㊵), and 8 common-mistake
  blocks. It is not a copy of the Test Solutions.

## Validation

- `npm run build` ✓
- `npm run check:english-direction` ✓ (1477 assertions, 30 lessons; lesson
  count updated 29→30 — minimal necessary change)
- `npm run audit:english-direction` ✓ (render audit lesson-folder count updated
  29→30; includes `scripts/audit-lesson30.mjs`, 137 checks)
- `node scripts/interaction-test.mjs` ✓ (558 passed — Lessons 1–26 regression)
- SSR smoke render of Lesson 30 ✓ (cover, 46-step counter, areas, LTR isolation)
- `git diff --check` ✓
