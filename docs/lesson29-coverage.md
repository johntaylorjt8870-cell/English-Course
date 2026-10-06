# Lesson 29 coverage ledger — Past Perfect Continuous

## Fidelity and integration

Lesson 29 is additive. Lessons 1–28 were not rewritten. The lesson is registered
in `src/App.tsx` at `#/lesson/29`, with a hub card, and uses the existing React,
RTL shell, `LatinRuns`, password, and area-separation conventions. No new
runtime dependency was added.

The source ledger in `src/lessons/lesson29/data.ts` contains all numbered
sections **①–㊹** in source order. The student view renders the cover, objectives,
all 44 numbered sections, the final summary, four-tense comparison, and final
rescue-team challenge. English strings are isolated through `LatinRuns` and
explicit `dir="ltr"` containers. The existing no-flag branding validation is
respected; the source title is preserved without adding a country-flag emoji to
the application chrome.

## Numbered source map

| Sections | Implementation |
| --- | --- |
| ①–⑤ | Source-ledger cards: definition, timeline, formula, invariant `had`, role of `been` |
| ⑥–⑩ | Source-ledger cards plus Past Perfect/Continuous focus lab and FOR/SINCE lab |
| ⑪–⑮ | Source-ledger cards plus duration/point and completion/activity interactions |
| ⑯–㉑ | nuance, visible effect, non-continuation, stative verbs, and -ing spelling cards |
| ㉒–㉘ | negatives, questions, short answers, Wh questions, `how long`, `for`, and `since` |
| ㉙–㉟ | four-tense comparison, Daniel Grammar Detective, IQ200 choices, and stative trap |
| ㊱–㊵ | all three source exercises, source answers, meaning selection, and Smart-Time Challenge |
| ㊶–㊷ | complete Mia story, analysis, and meaningful story timeline map |
| ㊸–㊹ | Boss Battle, decision process, final summary, and rescue-team four-tense challenge |

No source exercise is substituted. Source answer wording is retained in the
ledger and teacher notes; platform feedback is clearly presented as interaction
scaffolding rather than replacement curriculum.

## Interactive mapping

1. **Four-Tense Timeline Lab** — same `study` verb, four viewpoints.
2. **Duration vs point-in-time** — source ⑬–⑭ contrast is presented through the
   timeline lab and source cards.
3. **Past Perfect vs Past Perfect Continuous Switch** — bicycle completion vs
   repair activity/duration.
4. **FOR vs SINCE Lab** — six duration/starting-point sorting controls.
5. **Timeline builder** — start → continue → past point is represented in the
   source timeline and duration lab.
6. **Result / Cause Lab** — wet clothes and muddy ground source examples are
   retained and discussed in ⑯–⑱.
7. **Stative Verb Trap** — `had known` vs `had been knowing` in ⑲ and ㉟.
8. **-ING Formation Lab** — the interactive lesson includes the source spelling
   transformations and feedback is only produced after a selection.
9. **Grammar Detective** — Daniel gym sentence and tense roles in ㉛.
10. **Four-Tense Story Map** — Mia story labels for seven verb phrases.
11. **Smart-Time Challenge** — coach/practice questions in ㊵.
12. **Boss Battle** — all three source choices in ㊸.

## Test Area

`TEST_29` contains exactly **20 newly authored questions**, with single choice,
true/false, multi-select, ordering, matching, form, meaning, chronology,
stative verbs, `for`/`since`, negative/question/short-answer, and mixed four-tense
reasoning. Before submission there is no score, correctness feedback, solution
text, or answer-key UI. Submit reveals the score; Reset clears answers,
submission, score, and returns to 0/20.

## Test Solutions

`TEST_29_SOLUTIONS` provides exactly 20 gated solution entries. Each includes a
correct answer, a tense/timeline explanation, and a common trap. The area is
locked until Test submission or Teacher Area unlock and has a distinct
`data-area="lesson29-solutions"` marker.

## Teacher Area

`Teacher Area` is distinct and protected by `somer173`. It includes the overview,
all 10 objectives, detailed notes for form, meaning, timeline, effects, `for`,
`since`, stative verbs, spelling, questions and short answers, four-tense
comparison, common mistakes, source-exercise solution notes for ㊱–㊵ and ㊸,
story/timeline evaluation notes, and a link to Test Solutions. Locked teacher
content is not rendered before unlock.

## Validation and regression

- `npm run build` — passed. Vite emitted only the existing large-bundle warning.
- `npm run check:english-direction` — passed (1,470 assertions; 29 lesson inventory).
- `node scripts/audit-lesson29.mjs` — passed (63 checks).
- `node scripts/audit-lesson28.mjs` — passed (330 assertions).
- Existing direction/audit chain was extended minimally with Lesson 29 audit.
- Lessons 1–28 source directories and routes remain present; Lesson 28 audit and
  direction regression pass. The global site password remains in the existing
  `SitePasswordGate`; Teacher password is unchanged (`somer173`).
- Runtime browser preview QA was not claimed in this ledger; automated build,
  render-direction, source, and Lesson 28 regression checks were run.

## Files changed for Lesson 29

- `src/lessons/lesson29/data.ts`
- `src/lessons/lesson29/Lesson29.tsx`
- `src/App.tsx`
- `scripts/check-english-direction.mjs`
- `scripts/audit-lesson29.mjs`
- `package.json`
- `docs/lesson29-coverage.md`
