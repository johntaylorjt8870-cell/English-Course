# Lesson 42 — design origin and component reuse

## Decision

Lesson 42 keeps the platform's **original visual identity** (Lessons 1–3), not the per-lesson identity used by the 38–40 rebuild. No new tokens, no lesson-scoped stylesheet, no custom CSS file: the lesson is assembled from the same Tailwind classes and shared components the first lessons already use. Lessons 38–40 were consulted for **code architecture only** (separate modules, lazy assessment split, gated teacher area, audit chain). Lesson 41 — the most recent rebuild on the original identity — is the direct structural reference.

The previous Lesson 42 implementation (a separate `lesson42.css` "Language Control Lab" identity with `.station42` / `.masthead42` / `.token42` classes) was **removed**, along with `Steps42.tsx`, `labs42.tsx`, `practiceData42.ts`, `practiceNotes42.ts`, `solutionsData42.ts` and `tools42.tsx`.

## References inspected before writing code

| Reference | What was reused | Evidence in this build |
|---|---|---|
| `src/lessons/lesson1/Lesson1.tsx` (1147 lines) | Application shell `style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800` (L1069), right rail `hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block` (L1077), floating step pill `rounded-full border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur` (L1115) | `Lesson42.tsx` uses the same shell string, the same `w-72` rail markup and the same floating pill. `scripts/audit-lesson42.mjs` asserts the shell and pill class strings are **byte-identical to the Lesson 41 rebuild** |
| `src/lessons/lesson1/Lesson1.tsx` (L376, L377, L382, L386, L413) | Slide card `rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-10`, drifting mascot `absolute left-6 top-5 text-5xl anim-drift md:text-6xl`, `font-head` step badge on `bg-slate-900`, `font-head` title, cover mascot `text-7xl anim-drift` | `design42.tsx` → `Frame42`, `Num42`, `Cover42` reproduce these primitives |
| `src/lessons/lesson41/` (the previous rebuild on this identity) | Module split (`ledger` / `slides` / `kit` / `testData` / `key` / `SolutionsArea` / `TeacherArea` / `TeacherGuide` / `coverage`), submit gating, lazy-chunk strategy, `pb-32` bottom clearance, `ArrowLeft`=next / `ArrowRight`=prev | Mirrored 1:1 with the `41`→`42` suffix. The one structural addition is the §41 source split (see below) |
| `src/index.css` | `--ink`/`--paper` tokens, `.font-head` (Changa) `.font-en` (Fredoka) `.font-body` (Tajawal), `.pop`/`.tada` animations, `.site-lock-btn` | Imported unchanged; **no additions for Lesson 42** |
| `src/shared/LessonStepNav.tsx`, `SitePasswordGate.tsx`, `Signature.tsx`, `bidi.tsx` | Site lock button contract (`data-site-lock-button`), attribution signature, `LatinRuns` bidi isolation | Reused as-is; gate password unchanged |
| `docs/lesson38-rebuild-report.md` … `lesson40-rebuild-report.md` | Module layout and audit architecture only | `lesson42/` mirrors the same split |

## Visual system (inherited, not invented)

- **Surface:** `bg-[#f4f6fb]` app canvas, white `rounded-[2rem]` slide card with `border-slate-200` and the early-lesson soft shadow.
- **Type:** Changa headings (`.font-head`), Tajawal body (`.font-body`), Fredoka for English examples (`.font-en`, always inside `dir="ltr"`).
- **Accent:** `violet-600` for primary interaction, `slate-900` for the step badge and primary buttons, and the tints already used by the early lessons (`sky`, `orange`, `emerald`) for CAN / COULD / BE ABLE TO groupings.
- **Motion:** the original `pop`/`anim-drift` classes only (`pop pop-1…5`); `prefers-reduced-motion` respected by `index.css`.
- **Proportions:** desktop-first; rail visible from `lg`, mobile uses the same bottom-sheet index as the early lessons. Verified at 1280×800 and 1920×1080.

## Interaction vocabulary

| Interaction | Component | Behaviour |
|---|---|---|
| Practice answer + key | `PracticeCard42` / `PracticeSet42` | «قارن إجابتي بالحل» stays disabled until every field of that item is filled; the key and the reason then render in a ✓/✕ card |
| Sentence builder (§3) | `BuildLab42` | Subject + modal + verb-form choices; a wrong verb form names the broken V1 rule, the correct build confirms it |
| Form / short answers / WH-questions / time markers | `FormLab42`, `ShortLab42`, `WhLab42`, `TimeLab42` | Stepwise, stateful; each choice gates the next reveal |
| General ability vs specific success | `AbleLab42` | Classifier over `could` / `was able to` / `couldn't` |
| Permission vs request | `PermissionLab42`, `ResponseLab42` | Function classification with instant feedback |
| Possibility & suggestion | `PossibilityLab42` | Present vs future possibility discrimination |
| Error repair / meaning in context / mixed adventure | `RepairLab42`, `MeaningLab42`, `AdventureLab42` | Multi-item, stateful |
| Final test | `TestArea42` → lazy `key42` → `SolutionsArea42` | 25 questions, submit only on the last page of level 5, score on the result slide |
| Teacher area | `TeacherArea42` → lazy `TeacherGuide42` | Existing `somer173` mechanism, 25 detailed solutions + 46 practice keys |

No decorative or dead buttons: every control above changes state, and each audit exercises them (see `lesson42-implementation-report.md`).

## Hub card

`src/App.tsx` is a shared file, so Lesson 42 keeps its existing card entry and only corrects its values: `stats` now reports the real 144 slides / 44 sections / 17 labs / 25 questions, `en` is "From Ability to Polite Communication", the emoji is 🚀, and `grad` is **`from-sky-500 to-emerald-500` — the exact gradient of Lesson 1 and of the Lesson 41 rebuild**. `scripts/audit-lesson42.mjs` asserts all three gradients are equal, and `scripts/audit-lesson42-browser.mjs` re-checks the rendered gradient on the live hub.

## Answer-key protection (structural, not stylistic)

Lesson 42's source is unusual: **§41 of the supplied document is the final-test answer key itself.** Because `ledger42.ts` → `source42.ts` is statically imported by the student bundle, keeping §41 in the student source shipped the complete key inside `dist/assets/index-*.js`. This was verified, not assumed: a baseline build of `HEAD` contains §41's reason strings, and the current build does not.

The fix is a **physical split**: §41 now lives in `teacherSource42.ts`, imported only by the lazy `TeacherGuide42`. Reassembly of the two files is byte-identical to the original `source42.ts` (all 45 section hashes still match `docs/lesson42-source-manifest.json`).

This is client-side separation, not server-side security, and the UI says so in both the locked and unlocked states of the teacher gate.

## Deliberate departures

- **Accessibility:** meta labels use `slate-500` instead of `slate-400`, and the cover tiles use `sky-700` / `violet-700` so that all text clears WCAG AA 4.5:1. Palette family and layout are unchanged otherwise. Measured contrast values are in `docs/lesson42-implementation-report.md`.
- **Slide count over density:** the lesson is split into **144** short slides rather than shrinking type or compressing sections. Every slide declares an explicit inclusive `range` of source units, and `uncoveredUnits42()` is asserted empty.
- **Direction separators:** where the original Lesson 1 chrome joins a Latin token to Arabic text with `·` or `—`, Lesson 42 uses `•`. Both are in the BIDI oracle's separator set, which flags "Latin + separator + Arabic" pairs in an RTL paragraph; Lesson 42 is in that audit's strict set, so the chrome uses a non-separator bullet. Teaching content is unaffected — it goes through `Text42` / `LatinRuns`.
