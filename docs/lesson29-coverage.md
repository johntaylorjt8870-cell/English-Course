# Lesson 29 coverage ledger — interactive rebuild (Lesson-6 quality bar)

## Architecture

Lesson 29 was rebuilt as a fully interactive lesson following the Lesson 6
benchmark: one idea per step, the interaction itself carries the explanation
(no raw text dumps with a widget bolted on), role-colored sentence dissection,
a semantic four-tense visual system, and instant practice feedback with the
reason — while the final test keeps the neutral no-feedback-until-submit rule.

The shell keeps the native full-screen lesson pattern: persistent progress bar
and counter, desktop step rail grouped by section, mobile drawer, Previous/Next
controls, RTL keyboard navigation, and four separate areas (Student Lesson,
Test, Solutions, Teacher). Teacher access remains `somer173`; the global site
password remains `CloseYourEyes173` in the existing site gate. Lessons 1–28 and
30 are untouched; the only shared addition is a small teaching kit in
`src/shared/lessonKit.tsx` (Frame, SentenceCard, PartsLine, Note, Verdict,
platform-explanation tag) reused verbatim-style from the Lesson 6 patterns.

There are exactly **48 navigable steps**:

- opening cover and objectives: steps 1–2
- numbered source sections ①–㊹: steps 3–45 (sections ㉗+㉘ — `for`/`since`
  on the timeline — are taught together in one interactive timeline step)
- final summary, four-tense recap, and the final IQ200 rescue-team challenge:
  steps 46–48

## Source fidelity

The source ledger in `src/lessons/lesson29/data.ts` (`SOURCE_SECTIONS`) remains
the authoritative, unmodified fidelity reference. It is **never rendered as a
raw dump**: every source sentence, rule, and example is embedded inside the
step widget that teaches it. Each step shows a small "📜 from the source" chip
naming the source section(s) it covers (`SLIDE_SOURCE` mapping). Anything the
platform adds beyond the source is wrapped in a clearly labeled
"Platform Explanation" panel. Exercise answers that the source prints inline
(sections ㊱–㊳) are no longer leaked: the source answer line is revealed only
after the learner has attempted every item (`SourceReveal`).

## Semantic four-tense visual system

A single `TENSES` design record drives colors, icons and metaphors everywhere:

| Tense | Color | Metaphor |
| --- | --- | --- |
| Past Simple | orange 📸 | a single snapshot |
| Past Continuous | sky 🎥 | a scene filmed at that moment |
| Past Perfect | violet ⏪ | a finished result before the moment |
| Past Perfect Continuous | teal ⏳ | a running duration up to the moment |

Role colors in sentence dissection: subject = sky, `had` = violet,
`been` = fuchsia, verb-ing = teal, duration = amber, past event = orange.

## Step → source coverage map

| Steps | Source sections | Experience |
| --- | --- | --- |
| cover, objectives | cover, objectives | cover + goals (with transparency note) |
| s1–s2 | ①–② | concept + interactive three-marker timeline |
| s3 | ③ | **Formula Builder** — click-assemble `S + had + been + V-ing`, then 5 dissected examples |
| s4–s5 | ④–⑤ | `had` never changes (all pronouns) · why `been` (three-piece anatomy) |
| s6–s7 | ⑥–⑦ | result-vs-activity **FlipPair** comparisons |
| s8–s9 | ⑧–⑨ | **Duration Lab** — swap `for`/`since` duration chips inside live sentences |
| s10 | ⑩ | **FOR vs SINCE Lab** — sorting game with instant feedback |
| s11–s12 | ⑪–⑫ | IQ200 question-method + dissected example gallery |
| s13–s18 | ⑬–⑱ | tense-pair comparators (PC vs PPC, PP vs PPC, visible effect, nuances) |
| s19 | ⑲ | **Stative Verb Trap** — floating stative verbs + the `had known` fix |
| s20–s21 | ⑳–㉑ | regular verbs · `-ing` spelling rules (tabbed) |
| s22–s26 | ㉒–㉖ | negative, questions, short answers, Wh-, How long — formula strips + dissection |
| s2728 | ㉗+㉘ | timeline step with `for`/`since` toggle |
| s29–s30 | ㉙–㉚ | **Four-Tense Comparator** grid + **Four-Tense Timeline Lab** (one example, four lenses) |
| s31–s32 | ㉛–㉜ | **Grammar Detective** — classify each verb in Daniel/scientists sentences |
| s33–s35 | ㉝–㉟ | IQ200 cards (red eyes, both-possible, "don't use it just because of `for`") |
| s36–s38 | ㊱–㊳ | real exercises: MCQ with instant why, for/since set, **tap-the-wrong-segment** error fixing — source answers revealed only after attempting |
| s39–s40 | ㊴–㊵ | choose-tense-from-meaning + smart-tense decision stepper |
| s41–s42 | ㊶–㊷ | **Mia Story Timeline** — detective pass + dual story map |
| s43–s44 | ㊸–㊹ | **Boss Battle** duels + final IQ200 rule checklist |
| summary, fourtense, final | summary, four-tense, final | final summary · four-tense recap · **Final IQ200 Challenge** (rescue team) |

## Test, solutions, teacher

- The Test Area has the dedicated 20-question `TEST_29` (single choice,
  true/false, multi-select, ordering, matching). Answers stay neutral —
  no correctness styling or feedback — until the single Submit action;
  then score, per-question review, and reset are available.
- The Solutions Area (`TEST_29_SOLUTIONS`, one unique explanation per
  question) unlocks after finishing the test or via teacher access.
- The Teacher Area remains locked behind `somer173`.

## Verification

- `node scripts/audit-lesson29.mjs` — 75 checks pass (ledger integrity,
  verbatim source phrases, widget labels, 4 areas, 20-question test,
  solutions mapping, 48-step counter, progress bar, platform-explanation
  labeling).
- `npm run check:english-direction` and `npm run audit:english-direction`
  pass for all 30 lessons (regression on 24/26/27/28/30 included).
- `node scripts/interaction-test.mjs` — 558 passed.
- `npm run build` succeeds; standalone `tsc --strict` on
  `Lesson29.tsx` + `lessonKit.tsx` is clean.
