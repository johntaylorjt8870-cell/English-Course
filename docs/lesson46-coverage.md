# Lesson 46 — coverage and verification

Route: `#/lesson/46`. The lesson contains 39 short slides grouped into 18 stations; it reuses `Lesson1Shell`, its navigation and site lock, and the shared bidirectional-text helper. All lesson styling and behavior are local to `src/lessons/lesson46/`.

## Station map

| Station | Slide IDs / retained learning content |
| --- | --- |
| Three doors | `cover`, `goals`, `three-doors` |
| Prohibition | `mustnt-signs`, `mustnt-form` |
| No obligation | `no-obligation`, `doesnt-have`, `have-questions` |
| No necessity: modal | `neednt-form`, `neednt-or-have` |
| No necessity: ordinary verb | `ordinary-need`, `need-contrast` |
| Past necessity | `past-necessity`, `past-two-outcomes` |
| Unnecessary past action | `unnecessary-action`, `v3-passport` |
| Necessity vs judgment | `neednt-vs-shouldnt` |
| Future necessity | `future-necessity` |
| Comparison and timeline | `master-map`, `master-time` |
| Real-life labs | `trip-lab`, `library-lab`, `airport-lab`, `museum-lab`, `laboratory-lab` |
| Grammar detective | `detective-a`, `detective-b`: ten corrections |
| Graduated practice | `practice-32` through `practice-36`: five sets |
| Reading | `reading`, `reading-questions`: school technology fair and ten questions |
| Assessment and teacher | `final-test`, `teacher`: 25 questions in five levels of five |
| Writing | `writing`: 12–15 sentences, required constructions, Arabic reflection, optional 14-sentence model |
| Golden summary | `golden-summary` |
| Course roadmap | `course-progress`: 46/120; Lesson 47 is WOULD, WOULD LIKE & WOULD RATHER |

The material distinguishes prohibition from lack of obligation and does not infer permission from the latter. It explains that `didn't need to` / `didn't have to` do not by themselves establish whether the action occurred, whereas `needn't have + V3` normally implies that it did. `shouldn't have` expresses a negative judgment, and the future forms use `won't have/need to`.

## Assessment and loading

Student prompts live in `testData46.ts`; answers, explanations and grading live in `testKey46.ts`, loaded only upon submission. The teacher guide is a separate deferred module, available after a submission and the existing client-side teacher gate. Submission and guide load failures preserve the in-memory answers/result and expose retry controls; duplicate submission is blocked. In browsers that expose the failed same-origin module URL, retries use a fresh query string to avoid cached module failures; a separately bundled retry entry is the fallback. The production Chromium audit exercises two consecutive failures followed by success for each module.

This is a static client-side site: deferred loading and the existing password are presentation conveniences, **not server-side security**. Browser state is in memory and is not promised across a page reload. Typed answers use bounded, normalized patterns rather than full natural-language understanding, so a correct but unforeseen paraphrase may need manual review; writing checks are advisory, not semantic grading.

## Design system (rebuilt to Lesson 1's baseline)

Lesson 46 is now styled by a single scoped system in `src/lessons/lesson46/lesson46.css` (`.lesson46` only) that mirrors Lesson 1 rather than patching the previous "field notes" look: the same Changa/Rubik families, one `2rem` sheet per slide with `p-6 → p-10` padding and Lesson 1's shadow, a dark number chip + violet station badge + floating emoji + `clamp()` heading, the `pop-1..6`-style staggered entry (disabled under `prefers-reduced-motion`), and fixed semantic colours per meaning (rose = prohibition, sky = no obligation, emerald = no necessity, violet = comparison). English runs are isolated `dir="ltr"` panels through `shared/bidi` with the Arabic translation beneath; the cover opens on three illustrated doors and the comparison stations use a map and a timeline rather than prose. No shared component, stylesheet, dependency or route was changed.

## Reproducible checks

- `npm run build` then `npm run audit:lesson46-browser`: production Chromium, all 39 slides, desktop/mobile/tablet, key isolation, two-failure retry, grading/reset, teacher gate, lock, keyboard focus, representative contrast and overflow.
- `npm run audit:lesson46`: content, all 25 questions with positive and negative cases, practice keys and jsdom state/failure handling.
- `npx tsc --noEmit --jsx react-jsx --module esnext --target es2022 --moduleResolution bundler --allowSyntheticDefaultImports --skipLibCheck src/lessons/lesson46/*.ts src/lessons/lesson46/*.tsx`: lesson-local type check (the repository has no project typecheck configuration).
- `npm run check:english-direction`, `ONLY=46 node scripts/audit-bidi-mixed.mjs`, `npm run audit:lesson-navigation`, `npm run audit:lesson45`, `npm run audit:lesson45-browser`.
- Manual and automated visual sweep of all 39 slides at 1280/768/375/320 px: no document or card overflow, no clipped or sub-11px text, no zero-width blocks, no console errors, and no answer or key visible before submission.

Latest run of the Lesson 46 suite: `audit:lesson46` 766/0, `audit:lesson46-browser` 564/0, `check:english-direction` 59/59, `audit-bidi-mixed` 0 violations, `audit:lesson-navigation` 192/0, production build clean.

On baseline `main` commit `13484a98f1e4216714ec8b20b2a1aeaf01dfd865`, separate checks confirmed older Lesson 35 final-test/teacher-gate failures, a Lesson 36 lock-audit selector failure, four Lesson 38 strict bidi findings and one source-reveal finding, a Lesson 41 audit card-stat lookup error, and 272 full-project ad hoc TypeScript errors. Old inventory assertions in the Lesson 31, 38 and 42 audit scripts were updated to require all 46 lessons/cards rather than their stale count of 44; no checks were removed. Some older lesson audits also enforce a historical lesson-specific Git change scope, so they reject a legitimate Lesson 46 change; their guards were not relaxed. See the PR report for command results and remaining baseline failures.
