# Lesson 41 — validation record

All numbers below come from commands actually executed in this branch. Commands that could not be executed are listed under **Limitations** instead of being claimed.

## Environment

- Repo: `johntaylorjt8870-cell/English-Course`, branch `arena/e4c38820-english-course`, base `2e2c64a7d798bddc3d189d65355fa0a8be1f5a62` (`main`).
- Node 22.22.3, Vite 7.3.2, React 19, Tailwind v4.
- Real browser: `playwright-core` + `@sparticuz/chromium` installed with `--no-save` (not committed); the audit script extracts the packaged libraries into `node_modules/.lesson41-browser`.
- Dev server used by the browser audit: `npm run dev -- --port 5174 --host 0.0.0.0`, URL `http://127.0.0.1:5174/English-Course/#/lesson/41`.

## Results

| Check | Command | Result |
|---|---|---|
| TypeScript (strict) | `npx tsc --noEmit --jsx react-jsx --module esnext --target es2022 --moduleResolution bundler --strict --skipLibCheck src/lessons/lesson41/Lesson41.tsx` | **0 errors** |
| Production build | `npm run build` | **exit 0**, built in 9.6 s (only the repo-wide >500 kB chunk warning) |
| Static / data audit | `node scripts/audit-lesson41.mjs` | **passed — 891 assertions**, 41 sections, 883 source units (0 uncovered), 120 slides, 66 practice items, 25 questions / 5 levels, authored answer sheet 25/25 |
| DOM audit (React + JSDOM) | `node scripts/audit-lesson41-dom.mjs` | **passed — 4231 assertions**, all 120 slides navigated, practice gating, chain builder, test submit/reset, teacher gate, 10 BIDI cases |
| Real Chromium audit | `node scripts/audit-lesson41-browser.mjs` | **passed — 1701 checks, 0 failures, 0 page errors** at 1280×800 and 1920×1080 |
| English direction | `node scripts/check-english-direction.mjs` | **passed** (1701 assertions, 44 lessons) |
| Final-test cross-lesson audit | `node scripts/audit-final-test.mjs` | **passed** (1253 checks) |
| Source-reveal audit | `node scripts/audit-source-reveal.mjs` | **1 failure — pre-existing** (`src/lessons/lesson38/Steps38.tsx` uses `<details>`); reproduces on a pristine `origin/main` worktree |
| Mixed-BIDI audit | `node scripts/audit-bidi-mixed.mjs` | **3 strict violations — pre-existing**, all in Lesson 38 |
| Navigation / lock overlap | `node scripts/audit-navigation-lock-overlap.mjs` | **101 passed / 5 failed — pre-existing** (Lesson 38 lock visibility ×2, Lesson 39 tab labels ×3) |

### What the Chrome audit asserts on every slide (both viewports)

- step counter matches the expected `n / 120`;
- no horizontal document overflow and no clipped readable element;
- the floating step pill never overlaps the site-lock button;
- the pill covers **no** interactive control at maximum scroll (128 px reserved under it);
- every `aria-controls` / `aria-labelledby` / `aria-describedby` target exists;
- every visible text node clears WCAG AA (4.5:1, or 3:1 for large text) — measured by resolving Tailwind v4 `oklch()` colours through a canvas back to sRGB;
- layout metrics: tallest card **1188 px**, no card over the 1200 px target, at either viewport.

### Interaction smoke test (real Chromium, desktop 1280×800)

1. Practice §30 item 1: «قارن إجابتي بالحل» disabled → type `is` + `reading` → enabled → key `is → reading` and the reason appear.
2. Chain lab: «كوّن سؤالًا» disabled → choose `She studies.` → pick `لا يوجد` → builder unlocks → renders `Does she study?`.
3. Final test: level 1 shows 5 questions, no key text and no solution nodes in the DOM → answer all 25 across the 10 test pages → submit appears only on the last page → after submit the score renders and exactly 25 `data-solution-id` blocks mount.
4. Teacher gate: wrong password shows `role="alert"`; `somer173` mounts the lazy guide with 66 practice-key blocks.
5. JSDOM additionally covers reset (answers cleared, results re-locked) and keyboard/step navigation on all 120 slides.

### Solution-leak evidence

`scripts/audit-lesson41.mjs` bundles `Lesson41.tsx` with esbuild and inspects the emitted chunks:

- the entry chunk contains none of the solution strings (`تكرر التطابق`, the Q20 key text) and no `SOLUTIONS_41` symbol;
- exactly three independent lazy chunks exist — grader (`key41`), solutions (`SolutionsArea41`), teacher guide (`TeacherGuide41`);
- `testData41.ts` has no `reason:`, `accept:` or `keywords:` fields;
- `TestArea41.tsx` imports the grader only through `await import("./key41")` inside the submit handler;
- the solutions area renders only when `submitted && graded`; reset clears answers and re-locks.

## Limitations (honest scope)

- The Chromium audit runs against the Vite dev server, not a served production build.
- `docs/lesson41-visual/1280-*.png` / `1920-*.png` are headless Chromium screenshots with `reducedMotion: "reduce"`; fonts load from Google Fonts, and the sandbox blocks that request, so the screenshots fall back to local font stacks. Layout, colour and contrast measurements are unaffected, but glyph shapes in the PNGs differ from a networked browser.
- Teacher access is the platform's existing client-side gate, not server-side authorisation: the lazy chunks are not in the initial bundle, but a determined user can fetch them once known.
- Free-text practice answers are compared after the attempt (self-review), matching the platform convention; they are not auto-graded as correct/incorrect beyond the authored accepted answers.
- The five failures in `audit-source-reveal`, `audit-bidi-mixed` and `audit-navigation-lock-overlap` are pre-existing Lesson 38/39 issues, reproduced on an untouched `origin/main` worktree; fixing them is outside Lesson 41 scope.

## Source issues found and handled (no silent deletion)

| Source | Issue | Handling |
|---|---|---|
| §37 | Contains only the heading and “عرض الحلول التفصيلية” — no actual key | Page renders protected access plus platform-authored 25 solutions and 66 practice keys, explicitly labelled as platform-authored |
| §38 | Model paragraph is 8 sentences (brief asks 12–15), has emphatic `do` but no `did`, no questions | Model kept verbatim, labelled as a partial reference; the ten criteria remain the requirement |
| §15 | DO described as “فعل رئيسي بمعنى يُنجز” without distinguishing `do` + object vs full lexical `do` | Kept, with one clarifying sentence added in the slide (not a rewrite of the source line) |
| §27 | Algorithm treats linking BE as a “main verb” yet BE still forms questions directly | Slide explains that “main” here means “not an auxiliary of another verb”, so the First Auxiliary Rule still applies |
