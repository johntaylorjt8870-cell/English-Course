# Lesson 41 — baseline validation (pre-implementation)

> Historical preflight checkpoint, retained as recorded. Implementation is now covered by `lesson41-validation.md`; the “not implemented” statements below describe the earlier checkpoint only.

These results describe unchanged application code at `e7a2e473c0c1062a42d723af18c80e0048ddd159`. They do **not** establish Lesson 41 completion or a visual pass.

| Command | Exit | Result |
|---|---:|---|
| `npm ci` | 0 | Lockfile installation succeeded |
| `npm run build` | 0 | Existing application builds; bundle-size warning |
| `npm run audit:lesson40` | 0 | Latest existing lesson audit passed |
| `npm run check:english-direction` | 0 | Direction check passes; 59/59 BIDI rendering assertions |
| `npm run audit:lesson-navigation` | 0 | 144 assertions passed; no console warnings |
| `node scripts/audit-render-direction.mjs` | 0 | 1,462 assertions passed; pre-existing React special-key warning |
| `node scripts/audit-source-reveal.mjs` | 0 | 63 checks passed |
| `node scripts/audit-final-test.mjs` | 0 | 1,246 checks passed; pre-existing duplicate-key warnings |
| `node scripts/audit-final-test-coverage.mjs` | 0 | 633 checks passed; pre-existing JSDOM scrollTo warnings |
| `node scripts/audit-bidi-mixed.mjs` | 0 | Passed; pre-existing JSDOM scrollTo warnings |
| `npm run audit:lesson38` | 0 | 267 assertions passed; calculated contrast checks pass |
| `npm run audit:lesson39` | 0 | 357 assertions passed; calculated contrast checks pass |
| `npx tsc --noEmit --jsx react-jsx --module esnext --target es2022 --moduleResolution bundler --allowSyntheticDefaultImports --skipLibCheck src/main.tsx` | 2 | 179 existing diagnostics; full output in `lesson41-baseline-typescript.txt` |

The batch shell call stopped waiting after 200 seconds. The process completed afterward; its final JSON result and Lesson 39 log were inspected before recording exit 0. No timed-out audit was rerun or reported as passed from a partial result.

## Not run / not implemented

- `audit:lesson41`: command and implementation do not exist yet.
- Scoped Lesson 41 TypeScript check: no Lesson 41 modules yet.
- Post-implementation comparison: not applicable; application source remains unchanged.
- Lint/generic test command: none declared in package.json.
- Real-browser inspection: **not performed**. No Chromium/Chrome executable was found by PATH or the limited standard-directory search; no browser provisioning attempt was made. This does not prove a browser cannot be installed. Existing JSDOM and calculated-contrast results are not visual evidence.
- No Lesson 41 screenshots, interaction checks, rendered contrast results, or completed item-level coverage exist yet.

## Required real-browser verification after implementation

1. Start Vite bound to 0.0.0.0; open `/English-Course/#/lesson/41` through the preview host. Use the existing site gate.
2. At 1280px and 375px, inspect cover, each station, all exercise layouts, reading and writing steps. Check scrollWidth against clientWidth and capture screenshots.
3. Tab through navigation, engine selector, builders, attempt feedback and test fields; check focus visibility and keyboard-only operation.
4. Verify all 25 completed answers are required before submission. Confirm no score/key/feedback before submission and no solution request until access is unlocked. Reset must clear answers and relock solutions absent teacher authorization.
5. Check wrong teacher credentials, successful unlock, relock, and teacher/student transitions. Inspect network loading, not only hidden DOM.
6. Inspect Arabic/English punctuation and target examples: Does she study?; She hasn't finished.; She will have been studying.; Did he do the experiment?; Has she been studying?
7. Inspect hover, focus, selected, disabled, locked, error and success states at real font sizes; test reduced-motion preference.

## Delivery status

Only preflight documentation has been produced. Lesson 41 is **not implemented**, no PR has been opened, and the requested definition of done remains unmet. No PR has been merged, no branch has been deleted, and no Lesson 42 route/card/folder has been added.
