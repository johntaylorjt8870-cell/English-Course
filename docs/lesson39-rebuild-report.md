# Lesson 39 rebuild — implementation and verification

## Read-only audit / scope

- Base/current main at audit: `10d8939a880e1d9f57dbef07e83e7d6b85e47318`.
- Working branch: `arena/eeda3134-english-course`; initial working tree clean.
- Read README, LESSON_WORKFLOW, existing direction documentation, Lesson 39 source audit/coverage and implementation, Lesson 38 implementation/assessment key and audit infrastructure. No AGENTS.md was found under the workspace/repository search.
- Checked `git fetch origin main`, recent local history, `gh pr list --state all --limit 12` and open PRs. #71 (Lesson 38) is merged; no Lesson 39–40 PR was open. Unrelated open PRs #69 and #41 were not altered.
- Lesson 39 was already registered at `#/lesson/39`; Lesson 40 is also already registered. App/router and shared code needed **no changes**.
- Changed only Lesson 39 files, its audits, and its documentation/evidence. No earlier lessons, global styles, package manifests or lockfile changed.

## Implementation

**Time Grid** is a violet/cyan measuring workspace with compact brand header, chapter rail, direct step selector, keyboard previous/next, semantic color legend, rule tiles, paired bilingual dialogue turns, a clock timeline and focused tasks. It is not Lesson 38's Finish Line Studio.

116 learning steps (40 previously). This deliberately exceeds 70–85: 30 original grammar exercise questions have independent attempt/answer steps; explanations, reading segments and bilingual exchanges are separated. It preserves all source text instead of compressing or deleting it. See the atomic ledger in [coverage](lesson39-coverage.md) and [JSON](lesson39-step-coverage.json).

Interactions include formula ordering/removal/reset, grammar-role selection, duration calculation, for/since and aspect choices, affirmative/negative/question construction checks, correction/answer comparison after an attempt, and a session-saved writing workspace. Builder checks are structural checks, not claims to understand arbitrary English. Writing's sentence count is approximate, with no automated claim of grammatical completeness.

Final test remains exactly 25 questions, five levels of five. It now shows one question at a time, saves answers while moving through the test/areas during the visit, and enables submission only after 25 nonblank responses. Feedback is loaded only after submission. Every question then has a model answer, explanation and applicable alternatives. Non-matching conceptual responses are marked **human review**, not incorrectly rejected by brittle keyword heuristics. Exact model conceptual responses can be recognized automatically. The displayed number is an auto-accepted count, not a definitive human grade.

Teacher area uses the existing repository password gate, and contains all 25 detailed solutions. The old placeholder in the supplied source is not presented as a complete key. Teacher-added Q7/Q23 accuracy corrections are documented in coverage.

## Answer isolation and limitations

- `testData39.ts` contains only questions/options, no key.
- `testKey39.ts` and `solutionsData39.ts` are excluded from the initial static student graph; import of the key occurs inside the submission handler. Type-only imports do not ship the key.
- Solutions and teacher guide are lazy imports, mounted only after submission/unlock. Audit inspects the module graph and initial DOM; Chromium observes network requests during all learning steps and all 25 unanswered/answered-but-unsubmitted questions.
- No official score, correctness flags, or final explanations appear before submission.
- Like Lesson 38, this is a **static client application**, not a server authorization boundary. A technically determined person can fetch public lazy chunks or inspect the existing client-side password gate. True teacher-only secret storage would require an authenticated backend, outside this narrowly scoped rebuild. No CSS hiding is used to protect official answers.
- Source practice intentionally repeats two test items; isolation cannot prevent a learner from knowing answers already taught by the source.
- Test responses reset on reload; they persist across area/question navigation in the mounted lesson. Writing is sessionStorage-saved. Neither feature is a remote gradebook.

## Commands and real results

| Command | Result |
|---|---|
| `npm ci --silent` | Passed |
| `npm run build` | Passed; existing >500kB chunk warning remains |
| `npm run audit:lesson39` | Passed: byte-identical source; all atoms/tables/37 source keys mapped; 116 steps; 25 questions in 5×5; 25 complete teacher keys; neutral pre-submit DOM; static graph isolation |
| `npm run check:english-direction` | Passed; 59/59 BIDI rendering assertions |
| `node scripts/audit-render-direction.mjs` | Passed; 1,466 assertions |
| `npm run audit:lesson-navigation` | Passed; 176 assertions |
| `npx tsc --noEmit --jsx react-jsx --moduleResolution bundler --module esnext --target es2022 --allowSyntheticDefaultImports --skipLibCheck src/lessons/lesson39/Lesson39.tsx` | Passed; Lesson 39 dependency graph |
| `node scripts/audit-lesson39-browser.mjs` | Passed; 1,274 checks, 0 failures, 0 page exceptions |
| `node scripts/audit-bidi-mixed.mjs` | **Failed repository-wide**: 3 strict findings, all in unchanged Lesson 38 navigation (`BY`, regular `V3`, irregular `V3` labels). Lesson 39 has zero strict findings. Existing unrelated React warnings also appear for older lessons. No unrelated fix attempted. |

Scoring checks inside `audit:lesson39`: all 25 models accepted; deliberately nonsensical responses yield zero accepted answers and five review-required concepts; American travelling/traveling and expanded negatives accepted; valid Future Perfect alternative accepted. Browser completes all 25 questions and checks all 25 post-submit feedback panels. Teacher guide has 25 solution articles; all five Solutions levels reveal five explanations each.

Browser tooling was installed with `npm install --no-save --package-lock=false playwright-core @sparticuz/chromium`; no dependency changes were committed. Reproduce with that command, build, `npm run preview -- --host 0.0.0.0 --port 4173`, then the browser audit. Early harness runs exposed a Playwright numeric option-label ambiguity and single-process Chromium context lifecycle issue; those were corrected and the full final run was rerun successfully. No failed attempt is being counted as a pass.

## Actual Chromium desktop audit

Every one of 116 steps was rendered, measured and screenshotted at both sizes: **232 initial-step screenshots**. The script also activates all practice choices, source-answer reveals and the formula builder, measures expanded heights, tests all 25 test questions before/after submit, rejects an invalid teacher password, unlocks the teacher guide, and opens all five solution levels. Raw screenshots are generated under `.arena/lesson39-screens` (not committed); representative evidence and the complete measurement/check report are under `docs/lesson39-visual`.

| Viewport | Initial median | Initial p90 | Initial max | Expanded practice max |
|---|---:|---:|---:|---:|
| 1280×800 | 614.34px | 846.53px | 977.56px | 1025.67px |
| 1920×1080 | 626.34px | 856.53px | 986.56px | 1034.67px |

Tallest initial steps: `s33-1`, `s26-1`, `s24-1`; at 1280 next is `s15-1`, at 1920 next is `s17-2`. Full top-eight lists are in verification.json. No initial or expanded practice step exceeds the preferred 1200px bound. No horizontal page overflow was detected. Source text is 17px; compact source labels are 15px. RTL shell and LTR isolated elements were checked on every step.

The first visual pass flagged `s02-2` above 1200px. It was repaired with a horizontal source timeline, removal of a redundant repeated calculation, shorter source-label treatment, and meaningful splits of continuation/stative/advanced comparison sections. No text was removed or made tiny. The original source timeline's NOW label has no specified clock time; the future reference and starting point are explicitly distinguished.

Manual image review was **representative, not all 232 screenshots**: 1280 formula builder, advanced comparison/tallest step, timeline before and after repair, test feedback before/after removing its overlapping sticky submission footer; 1920 Long Study Day paired dialogue and stative-verbs step. Final measurement run has no >1200px flagged learning steps. Native desktop rendering only; no mobile/manual device or cross-browser claim. Google font hosts are outside this sandbox's allowed egress, so evidence may use local fallback fonts.

## Merge guidance

Recommend owner review of the representative screenshots, source ledger, conceptual grading/review policy, and the inherited static-site security limitation before manual merge. The wider BIDI audit remains red only for Lesson 38; do not imply the entire repository suite is green. No merge or branch deletion was performed.
