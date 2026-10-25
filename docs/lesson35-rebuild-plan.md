# Lesson 35 — reusable Lesson 1 shell and verification

## Architecture and source fidelity

- `src/shared/Lesson1Shell.tsx` now contains the shell, grouped index, mobile drawer, progress header, and floating controls formerly implemented inside `src/lessons/lesson1/Lesson1.tsx`.
- Lesson 1 and Lesson 35 both render through this same component. Lesson 1 continues to provide its own original slides, labels, navigation callbacks, and slide content; Lesson 35 supplies its own 61-step groups, lesson content, and area actions. The rail and control markup/class sequence was moved from Lesson 1 rather than recreated for Lesson 35.
- Lesson 35 retains all 38 numbered source sections plus the cover in `ledger35.ts`: 656 regular units and 56 separately tracked reveal units, mapped to 61 short steps. The audit checks displayable student units and revealed answers.
- The 25-item test key remains in `testKey35.ts`, excluded from the initial key chunk and dynamically fetched only on submission. Detailed solutions are present in the teacher area. This is client-side code-splitting, not server-side security.
- The only lesson source files changed for shell reuse are Lesson 1 and Lesson 35. No other lessons or existing shared components were modified; the new reusable shell was added as one shared component.

## Visual and behavioral verification

- Lesson 1 was rendered before and after extraction under the same Chromium setup at 1920×1080, 1280×800, 768×900, and 375×812. ImageMagick `compare -metric AE` reports **0 differing pixels at all four sizes**. Reference captures are in `docs/lesson1-visual-reference/`; post-extraction captures and metrics are in `docs/lesson1-after-shell/`.
- Lesson 35 was manually inspected at those same four sizes; captures are in `docs/lesson35-rebuild-visual/`. It shares the extracted shell and controls while retaining its own lesson-specific content surfaces.
- The one-off Lesson 1 Chromium interaction run passed: desktop next/keyboard navigation, mobile drawer open/select/close at both mobile sizes, and the single shared site lock.

## Test results

- `npm run audit:lesson35`: PASS, 387 assertions.
- `npm run audit:lesson35-browser`: PASS, 60/60 across the four viewports, navigation, reveal/gating flows, contrast sampling, and test-key chunk timing.
- `npm run audit:lesson-navigation`: PASS, 176 assertions.
- `npm run check:english-direction`: PASS, 1,701 direction assertions across 44 lessons plus 59 BIDI rendering assertions.
- `npm run build`: PASS; Vite retains the large main-bundle warning (~5.97 MB minified).
- `npm run audit:navigation-lock`: 101 checks passed; 5 failures remain in Lesson 38/39 area navigation. Their lesson files, `SitePasswordGate.tsx`, and the audit script are byte-identical to `main` (`git diff --quiet main -- ...` passed), so these are baseline failures; no repair was made outside the requested scope. The run also prints duplicate-key warnings and a JSDOM `attachEvent` error.
- `git diff --check`: PASS.
