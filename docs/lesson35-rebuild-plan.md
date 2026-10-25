# Lesson 35 rebuild — current status and verification

## Scope and source fidelity

- Work stays on `arena/3a2ffbd8-english-course`, based on `cf9ca953eb2560291ef3fca436e628a932867efd`.
- Lesson 35 retains its 38 numbered source sections plus cover in `ledger35.ts`: 656 regular units and 56 separately tracked reveal units, mapped to 61 short steps. The audit verifies all displayable student units and answers after their reveal actions.
- Student work remains answer-gated. The 25-item final-test key is split into `testKey35.ts` and dynamically fetched on submit; detailed test solutions remain in the teacher area. This is client-side deferral, not server-side security.
- Existing student-answer normalization, reveal feedback, and provenance cleanup remain local to Lesson 35. No shared component or other lesson was edited.

## Lesson 1 reuse limitation (not complete)

Lesson 1's rail and floating controls are private implementation details inside `src/lessons/lesson1/Lesson1.tsx`; it exports only the complete Lesson 1 page. The user instruction both requires reuse of those exact components and prohibits changing Lesson 1 or shared components. Those constraints cannot both be met without permission to extract/export reusable shell components. To respect the no-other-lesson constraint, Lesson 35 currently uses the existing shared `Signature`, `SignatureGhost`, and `SiteLockButton` with a Lesson-1-matched shell DOM/class structure; its index and step buttons are still Lesson-35-local implementations. Therefore **literal component reuse and guaranteed zero visual drift are not claimed**. The Lesson 35 index now follows Lesson 1's always-expanded section listing and the shell was visually compared at each required viewport. A strict direct-reuse requirement remains unresolved.

## Verification run

- `npm run audit:lesson35`: PASS, 387 assertions, including full section/unit coverage, practice/reveal answers, test keys, teacher gate, and navigation lock.
- `npm run audit:lesson35-browser`: PASS, 60/60 checks at 1920×1080, 1280×800, 768×900, and 375×812. Checks include navigation, reveal/gating flows, contrast sampling, absence of the complete `testKey35` JS chunk before submission, and its fetch only after submit.
- `npm run build`: PASS; Vite reports the existing large main-bundle warning (~5.97 MB minified).
- Manual screenshot review compared Lesson 1 and Lesson 35 at the four required sizes. Reference captures are in `docs/lesson1-visual-reference/`; Lesson 35 captures and `verification.json` are in `docs/lesson35-rebuild-visual/`. The shell geometry/RTL rail placement follows the reference, but the screenshots do not establish pixel-identical content styling.
- `npm run check:english-direction`: PASS, 1,701 direction assertions across 44 lessons plus 59 BIDI rendering assertions.
- `npm run audit:lesson-navigation`: PASS, 176 assertions after replacing a stale assertion that required the removed alternate-brand shell with a positive RTL/Lesson-1-shell structure assertion.
- `npm run audit:navigation-lock`: 101 checks passed, 5 failed in untouched Lesson 38/39 area-navigation cases; output also includes duplicate-key and JSDOM `attachEvent` errors. These failures are outside Lesson 35 and remain unmodified/unconfirmed against baseline.
- `git diff --check`: PASS.

## Branch / review status

No PR is open for this branch. This session will not push or open a PR, so the required reviewable PR has **not** been created and the task is not complete. Do not represent it as complete until both the exact shell-component reuse constraint and the PR handoff are resolved.
