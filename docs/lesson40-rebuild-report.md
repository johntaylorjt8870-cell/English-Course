# Lesson 40 rebuild — verification report

## Outcome

Lesson 40 was rebuilt as **Future Tenses Grand Challenge — Timeline Command Lab**: a laptop-first 110-step review of the five principal future forms, based on the complete supplied opening and sections 1–29. The 110 focused steps fall within the requested 85–110 target. Six diagnostic questions are used as decision prompts, not presented as six tenses. Source language, translations, examples, dialogues, exercises, source answers/explanations, final assessment, Writing Mission, Golden Summary, curriculum map and the Lesson 41 preview are mapped in [`lesson40-coverage.md`](lesson40-coverage.md).

The original `src/lessons/lesson40/ledger40.ts` remains unchanged. The student bundle uses `studentLedger40.ts`, an automatically asserted source projection identical to the original except §26 is limited to its two student-facing introduction units. The complete §26 source and expanded answer materials live behind deferred solution/teacher UI paths. The assessment contains 25 questions (five levels of five), and the teacher guide provides 25 complete solutions. The 20 objective/model-match items are model-scored; five conceptual responses are routed for human review with a manual rubric.

## Automated checks

| Check | Result |
|---|---|
| `npm run audit:lesson40` | **PASS — 2,145 assertions**, 110 steps, all 29 numbered sections, 25 assessment questions and 25 complete teacher solutions. Includes exact source-projection parity and confirms `ledger40.ts` is unchanged. |
| `npm run build` | **PASS**. Vite reports a large project entry chunk (about 5.89 MB minified) warning; the application build completes successfully. |
| `node scripts/audit-lesson40-build.mjs` | **PASS — 6 checks**. Representative exact answer text is absent from the initial entry and present only in a non-entry answer chunk. |
| Lesson 40 TypeScript check | **PASS** when explicitly checking all `src/lessons/lesson40` TypeScript/TSX files with ES2022, DOM/DOM.Iterable, React JSX and bundler resolution. This repository has no `tsconfig.json`. |
| `npm run check:english-direction` | **PASS — 1,701 English-direction assertions across 44 lessons; 59/59 BIDI rendering assertions.** |
| `npm run audit:lesson-navigation` | **PASS — 176 checks.** Lesson 40 route and step navigation work in the hub/router. |
| `git diff --check` | **PASS.** |

## Chromium and visual evidence

`node scripts/audit-lesson40-browser.mjs` ran actual Chromium at **1280×800** and **1920×1080** and passed **1,205 checks, 0 failures**. It walked all 110 steps and checked viewport height, RTL/LTR, horizontal overflow, control overlap/reachability, keyboard navigation, test submission, solution unlock, teacher password gate, and module requests.

| Viewport | Median step | p90 | Tallest initial step | Tallest expanded practice | >1,200 px | Overflow / overlap / unreachable |
|---|---:|---:|---:|---:|---:|---:|
| 1280×800 | 576.1 px | 835.5 px | 1,177.9 px | 1,189.2 px | 0 | 0 / 0 / 0 |
| 1920×1080 | 576.1 px | 835.5 px | 1,177.9 px | 1,189.2 px | 0 | 0 / 0 / 0 |

The network evidence records `SolutionsArea40.tsx` and `solutionsData40.ts` loading only after test submission, and `TeacherGuide40.tsx` only after teacher-password acceptance. The emitted production entry also excludes the representative answer phrase. These checks establish UI and module separation, **not confidentiality against a determined user**: this is a static client application, and its password gate is not server authorization.

Screenshots and step-level measurements are in [`lesson40-visual/`](lesson40-visual/):

- `1280-cover-01.png` and `1920-cover-01.png` — opening/identity and controls.
- `1280-s17-02.png` and `1920-s17-02.png` — bilingual dialogue, classification prompt and deferred feedback surface.
- `1280-solutions-unlocked.png`, `1280-teacher-open.png`, and `1280-test-q25.png` — solution, teacher and final-test views.
- `1280-s29-06.png` and `1920-s29-06.png` — final curriculum/Lesson 41 preview step.
- `height-audit.json` — per-step evidence and deferred-module network log; `height-audit.md` — summary.

Representative screenshots were reviewed after the final browser run. Layout, dialogue translation, answer presentation and navigation are legible at both target sizes. **Known visual limitation:** the Chromium audit environment lacks a usable emoji font, so emoji in the supplied/source identity render as missing-glyph boxes in the screenshots. The source text is preserved; no large emoji-font dependency was added solely to alter this environment-specific fallback.

## Wider repository checks and unrelated failures

- An explicit project-wide TypeScript run exits with **180 errors in unchanged files outside Lesson 40**; the Lesson 40 error count is **0**, and the targeted Lesson 40 TypeScript check passes. The wider errors include existing type issues in lessons 10, 11, 14, 18, 21, 24, 27, 28, 30–32, 43, shared UI and lesson 6. Since no `tsconfig.json` exists, compiler flags are supplied on the command line.
- `npm run audit:english-direction` stops in the Lesson 39 audit because it tries to `git show 10d8939:src/lessons/lesson39/ledger39.ts`, but that Git object is absent in this checkout. Its earlier audits through Lesson 38 pass; Lesson 40 is independently covered by its dedicated audit and the project English-direction check.
- `node scripts/audit-source-reveal.mjs` reports **1 unrelated failure** (a `<details>/<summary>` in unchanged `src/lessons/lesson38/Steps38.tsx`).
- `node scripts/audit-navigation-lock-overlap.mjs` reports **105 passed / 5 unrelated failures**, affecting existing Lesson 38 lock-button state and missing Lesson 39 tabs; Lesson 40 is not among those failures.
- `node scripts/audit-bidi-mixed.mjs` reports **3 strict failures**, all in unchanged Lesson 38 step-navigation labels. It reports **0 Lesson 40 violations** after the Lesson 40 direct-navigation labels were made Arabic-only.

No unrelated lesson or shared/global implementation was modified to mask these project-wide issues.

## Source accuracy and scope notes

- WILL vs BE GOING TO remains a contextual comparison between two of five principal forms. Marker expressions are clues, not mechanical tense rules; legitimate alternatives and overlap are retained.
- Teacher-expanded alternatives, scoring feedback and the Arabic dialogue translations are identified as platform-authored support rather than source text.
- The supplied Lesson 41 preview is preserved and links to the existing `#/lesson/41` route. No additional Lesson 41 content was invented.
- Only Lesson 40 implementation, its dedicated audits/evidence, and Lesson 40 source/coverage documentation were changed. No answer content was put into the original source ledger beyond its pre-existing text, and that file remains byte-for-byte unchanged.

## Branch and review status

The rebuild is committed on the Arena-assigned branch `arena/0126a99a-english-course` as `a4a2349` (`Rebuild Lesson 40 future tense grand challenge`). [Pull request #73](https://github.com/johntaylorjt8870-cell/English-Course/pull/73) targets `main` and is **open, unmerged** for review.
