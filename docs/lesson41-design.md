# Lesson 41 — design origin and component reuse

## Decision

Lesson 41 keeps the platform's **original visual identity** (Lessons 1–3), not the per-lesson identity used by the 38–40 rebuild. No new tokens, no lesson-scoped stylesheet, no custom CSS file: the lesson is assembled from the same Tailwind classes and shared components the first lessons already use. Lessons 38–40 were consulted for **code architecture only** (separate modules, lazy assessment split, gated teacher area, audit chain).

## References inspected before writing code

| Reference | What was reused | Evidence in this build |
|---|---|---|
| `src/lessons/lesson1/Lesson1.tsx` (1147 lines) | Application shell: `style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800` (L1069), right rail `hidden w-72 … border-l border-slate-200 bg-white/80 backdrop-blur` (L1077), floating step pill `rounded-full border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur` (L1115) | `Lesson41.tsx` uses the same shell string, the same `w-72` rail markup and the same floating pill (class list is byte-identical) |
| `src/lessons/lesson1/Lesson1.tsx` (L100, L377, L382, L386, L413) | Slide card `relative rounded-[2rem] border border-slate-200 bg-white p-6 … md:p-10`, drifting mascot `absolute left-6 top-5 text-5xl anim-drift md:text-6xl`, `font-head` step badge on `bg-slate-900`, `font-head` title, cover mascot `text-7xl anim-drift` | `design.tsx` → `Frame41`, `Num41`, `Cover41` reproduce these primitives |
| `src/lessons/lesson2/Lesson2.tsx`, `src/lessons/lesson3/Lesson3.tsx` | Same card/pill/tone vocabulary across the early lessons (Lesson 3 uses the identical shell with `bg-[#f7f8fc]`), `pop` entrance animations, slate/white surfaces, violet accent for interactive state | Same palette and `pop pop-1…5` staging in Lesson 41 |
| `src/index.css` | `--ink`/`--paper` tokens, `.font-head` (Changa) `.font-en` (Fredoka) `.font-body` (Tajawal), `.pop`/`.tada` animations, `.site-lock-btn` | Imported unchanged; no additions for Lesson 41 |
| `src/shared/LessonStepNav.tsx`, `SitePasswordGate.tsx`, `Signature.tsx`, `bidi.tsx` | Site lock button contract (`data-site-lock-button`), attribution signature, `LatinRuns` bidi isolation | Reused as-is; gate password unchanged |
| `docs/lesson38-rebuild-report.md`, `docs/lesson39-rebuild-report.md`, `docs/lesson40-rebuild-report.md` | Module layout and audit architecture only | `lesson41/` module set mirrors the same split (data / kit / test / key / solutions / teacher / coverage) |

## Visual system (inherited, not invented)

- Surface: `bg-[#f4f6fb]` app canvas, white `rounded-[2rem]` slide card with `border-slate-200` and the early-lesson soft shadow.
- Type: Changa headings (`.font-head`), Tajawal body (`.font-body`), Fredoka for English examples (`.font-en`, always inside `dir="ltr"`).
- Accent: `violet-600` for primary interaction, `slate-900` for the step badge and primary buttons, and the engine tints already used by the early lessons (`sky` = BE, `orange` = DO, `emerald` = HAVE).
- Motion: the original `pop`/`anim-drift` classes only; `prefers-reduced-motion` respected by `index.css`.
- Proportions: desktop-first; rail visible from `lg`, mobile uses the same bottom-sheet index as the early lessons.

## Interaction vocabulary

| Interaction | Component | Behaviour |
|---|---|---|
| Practice answer + key | `PracticeCard41` / `PracticeSet41` | «قارن إجابتي بالحل» stays disabled until every field of that item is filled; the key and the reason then render in a ✓/✕ card |
| Role discrimination (6 items) | `RoleLab41` | Per-sentence رئيسي/مساعد choice with instant feedback |
| Engine function from context | `EngineLab41` | Engine tabs + 6 context sentences; options come from the chosen engine's real function list |
| BE builder, DO question/negation machine, HAVE tense chain, first-auxiliary analyser | `BeLab41`, `DoLab41`, `HaveLab41`, `ChainLab41` | Stepwise, stateful; each step gates the next (e.g. the question builder unlocks only after the correct first auxiliary) |
| Final test | `TestArea41` → lazy `key41` → `SolutionsArea41` | 25 questions, submit only on the last page of level 5, score on the result slide |
| Teacher area | `TeacherArea41` → lazy `TeacherGuide41` | Existing `somer173` mechanism, 25 detailed solutions + 66 practice keys |

No decorative or dead buttons: every control above changes state, and each audit exercises them (see `lesson41-validation.md`).

## Hub card

`src/App.tsx` is a shared file, so Lesson 41 keeps its existing card entry and only corrects its values: `stats` now reports the real 120 slides, and `grad` was changed from a lesson-specific `from-[#101c32] to-[#4338a5]` (the navy/indigo identity of the old 38–40-style build) to **`from-sky-500 to-emerald-500` — the exact gradient of Lesson 1**. The audit asserts that the rendered gradient equals Lesson 1's on the live hub.

## Deliberate departures (accessibility only)

- Meta labels use `slate-500` instead of `slate-400`, and the cover engine tiles use `sky-700` / `orange-800` / `emerald-800` with full-opacity bold captions so that all text clears WCAG AA 4.5:1 (measured in Chromium with the corrected `oklch`-aware resolver: 5.86:1, 7.37:1, 7.61:1). Palette family and layout are unchanged otherwise.
- Slides were split (120 total) instead of shrinking type: the tallest card is 1140 px at 1280×800.
