# RTL, assessment verification, and teacher workspace repair

## Status and scope

**Draft / not ready to merge.** This is a verified repair of several shared defects, not a claim that the entire requested system-wide audit is complete. In particular, the existing mixed-BIDI audit still reports legacy violations (see the results below). The baseline and negative controls have not been relaxed. Embedded lesson activities also need a complete, individually enumerated behavioral inventory before calling Goal 2 exhaustive.

- Base: `1f879216d96edea741e4b28db8b58449bb98adaf`, the merge of PR #40. `origin/main` was fetched and matched this base.
- Session branch: `arena/8744e70e-english-course` (Arena fixes the session branch).
- Draft PR: https://github.com/johntaylorjt8870-cell/English-Course/pull/41 — do not merge or delete the branch.
- No lesson data bank, source ledger, source mapping, or textbook answer was changed.
- Commit status: the continuation implementation and evidence are recorded together on this branch; its exact SHA is recorded in the PR #41 progress comment. Previously verified commits `b762e4e` and `68595c7` are retained.

## Continuation verification — 2026-10-09

**Still incomplete / still draft.** The following supersedes the original counts below. The pass/fail distinction is important: unchanged historical ratchets pass, but they do not certify zero BIDI defects or complete interaction coverage.

### Direction repair and exact remaining debt

| Audit category | Before continuation | After continuation |
|---|---:|---:|
| Mixed paragraph/pair findings | 198 | 46 |
| Separately authored English/Arabic row findings | 430 | 21 |
| Alternative-order findings | 21 | 1 |
| Unresolved total | **649** | **68** |
| Matching historical exceptions | 1 | 0 |

The original exception entry was not broadened; the shared verdict repair removed its observed warning. No new waiver, threshold increase, oracle relaxation, or deletion of a negative control was used.

- Exact before/after records, including logical text, simulated visual text, selectors and per-lesson/category counts: [`bidi-before.json`](audits/bidi-before.json), [`bidi-after.json`](audits/bidi-after.json).
- Human-readable table for **each of Lessons 1–32** and all 68 exact remaining cases: [`BIDI-REMAINING.md`](audits/BIDI-REMAINING.md).
- The residual cases remain explicitly **OPEN**, not classified away as harmless. In particular, fragments such as Lesson 20's `this | في السؤال الأول؟` need interpretation as part of the entire Arabic sentence; forcing every neighboring span into LTR is not a safe general repair. Native-option text, vertical bilingual diagrams, the `(a أو an)` boundary, and dynamic explanatory text need their own source-intent/layout decisions. The crawl does not prove source punctuation is malformed and does not justify rewriting it.

Verified root-cause repairs in this continuation:

1. **DOM grouping:** source/LabPanel labels and Arabic headings were unrelated RTL flex siblings. They now use the existing `EnAr` semantic pair. `EnAr.ar` accepts a React node as well as a string so existing styled explanations can remain intact. Deliberately vertical diagrams retain their vertical structure.
2. **Inheritance:** local `En` implementations delegate to shared `En`; mixed Arabic strings are passed through the existing parser instead of forcing Arabic inside an LTR font wrapper. Pure English remains isolated.
3. **Unshared verdict rendering:** legacy verdicts delegate to the existing shared verdict, which groups the English example with its gloss/reason. No answer or reason is changed.
4. **Boundary grouping:** combined section/title rails are parsed together rather than isolating their two halves independently. Raw mixed captions/callouts use `LatinRuns`/`Rich`. React-node renderers are never interpolated into source strings; an intermediate coercion error was detected and repaired before final verification.
5. **Native controls:** the new teacher reference options stay text-only, with explicit direction; no invalid span markup was placed inside options.

The Chromium Range regressions now additionally cover exact `استخدام Had.` (period right of `d`), `EnAr` label/gloss order, an Arabic gloss supplied to shared `En`, and a combined rail heading. Existing punctuation/enclosure/quote/highlight/280px tests and the orphan-period negative control still pass. **These are targeted fixtures and interface tests, not exhaustive character geometry for every lesson, every correction state, or native dropdown rendering.**

### Activity inventory — discovery is not certification

- [`activity-inventory.json`](audits/activity-inventory.json) and [`ACTIVITY-INVENTORY.md`](audits/ACTIVITY-INVENTORY.md): **874 component/control templates, 1,673 JSX control sites**, including delegated events, all 32 lessons and shared shells. Records contain source/line/column, handler and data-binding evidence, check/reset evidence, native keyboard properties, and explicitly unverified behavioral fields.
- `npm run audit:activity-inventory` detects manifest drift. A fingerprint of **all TS/TSX source and data** also invalidates the census when a data-bound activity changes without changing its JSX control template. Regeneration is a review step, not permission to label the contract verified.
- [`activity-observations.json`](audits/activity-observations.json): audit-only instrumentation records initial rendered controls across the complete step crawl. **1,346 owner/task/step group observations and 7,853 control occurrences** were observed; **820 source sites were not observed** in this initial-state traversal and are listed individually for reconciliation. These groups can contain multiple unlabeled task instances and are **not** a certified count of unique activities. Conditional controls, answers, alternate branches, teacher states and data-bound instance boundaries remain incomplete.
- All 874 behavioral contracts remain OPEN. `--require-verified` deliberately fails. The existing 38-primary-assessment suite and its passing tests have not been substituted for this wider inventory.
- A concrete remaining policy/behavior review is Lesson 2's embedded `MC` and `Fill`: their current selection handlers reveal correctness immediately and have no separate whole-activity bottom submission/reset contract. They are not certified as meeting the requested delayed-assessment policy. Immediate-feedback demonstrations and graded tasks must be distinguished explicitly before changing all such components.
- Complete empty/partial/full/repeated submission, accessibility-tree no-leak, independent reset/restart, and keyboard contracts for every embedded activity remain a blocker. The previously repaired primary-assessment behavior, Lesson 27/29 parent entitlement and Lesson 32 footer continue to pass their regression tests.

### Question-level teacher reference

The existing gated textbook/source destinations in Lessons **27, 28, 30, 31 and 32** now have an exercise/reference selector, a printed-item-number selector and answer search. The first source answer segment is immediately visible; further source segments are expandable. Unnumbered context and a full-original-reference disclosure preserve every line. Selecting another group clears item/search filters. This uses the existing authentication and does not mount protected content early.

- [`teacher-source-coverage.json`](audits/teacher-source-coverage.json): **47 source groups, 113 explicitly numbered reference items**. Indexing asserts lossless line reconstruction and preserves the source data verbatim. Array positions are not passed off as original question numbers.
- **74 exact mapping gaps remain:** 47 groups lack an explicit original-question/page mapping; 27 lessons (1–26 and 29) do not have these teacher source-solution banks. The artifact lists each gap and every contextual/unmapped line. This does not imply those lessons have no material elsewhere, or that the 113 references constitute complete textbook coverage.
- Unknown page and question text are visibly described as unknown. No authoritative reasoning is invented, shortened or relabeled as textbook content. This browser does not add platform-authored solutions; existing Platform Explanation distinctions elsewhere remain unchanged.
- Chromium now selects **every group and numbered item**, exercises details via keyboard, verifies all original lines, tests no-result search and filter clearing, and checks successful/failed authentication. Final Test keys, modern Test Area keys, source references and preparation remain distinct destinations.

### Reverification and readiness

Production build and the existing direction, render, Lessons 24/26/27–32, Final Test, final coverage, source-reveal, navigation and interaction audits were rerun. Counts: direction 1,617; render 1,454; BIDI regression 59; L24 165; L26 164; L27 363; L28 328; L29 84; L30 486; L31 724; L32 307; Final Test 854; final coverage 579; source-reveal 60; navigation 90; legacy interaction 963. The Chromium assessment suite now passes **54 scenarios** including seven actual teacher gates. Source-index and census-drift checks pass.

`node scripts/audit-typecheck-baseline.mjs` re-extracts the exact base source using `git archive` and runs identical explicit TypeScript flags on both trees. [`typecheck-comparison.json`](audits/typecheck-comparison.json) stores complete diagnostics: **current 178 / base 179, zero new normalized diagnostics, one removed**. Both typechecks exit 2. The comparison gate passing does **not** mean TypeScript passes. A transient new undefined-variable diagnostic was caught and corrected during the continuation.

Remaining release blockers are the **68 unresolved mixed findings**, incomplete state/geometry coverage, OPEN embedded-activity contracts, exact teacher source mappings, and the failing full typecheck. Existing duplicate-key/nested-button/build-size warnings are disclosed, not claimed resolved. PR **#41 stays open, draft and unmerged** on the existing session branch; no other branch or PR is used.

## Diagnosis before implementation

Inspected `bidi.tsx` (`LatinRuns`, `EnAr`, `splitMixedText`, `mergeAlternatives`), shared and local `En`/`Rich`/lesson shells, legacy `FinalQuiz`/`TeachersSpace`, the shared modern `FinalTest`, all six separate Test Areas, their solutions, and teacher gates. Ran the existing direction/BIDI suite against the starting implementation before changing application code.

The initial mixed audit passed its historical thresholds but reported **806 non-allowlisted violations**. This is existing debt, not a clean visual bill of health.

### Reproduced failure classes

| Class | Reproduction / before | Root cause | Change / after |
|---|---|---|---|
| English punctuation outside its run | `نستخدم [[had]].` became a highlighted LTR `had` followed by a period in the RTL parent; Chromium measured the period left of the word | Legacy `Rich` split markup before direction grouping | Parse highlight ranges before run segmentation. Keep `had.` in one isolate, decorate only the original marked occurrence inside it. Period measures right of `d` |
| Brackets split across isolates | `حدث [بلا had].` isolated `had].` even though `[` belonged to the Arabic clause | Shared unbalanced-enclosure logic handled only parentheses | Matching stack handles `()`, `[]`, `{}`; the Arabic enclosure stays outside the English isolate |
| Opening quotation stranded | `«had» — شرح` put the opening quote outside the English/gloss group | `tryPair` trimmed opening quote characters; straight quotes also interrupted backward scanning | Preserve opening quote characters and admit straight quotes in English material; quote geometry surrounds the English word |
| Missing mixed renderer | Lesson 8 raw `Rich` fragments; legacy quiz `ar`/`why`; raw mixed labels, explanations, and shell headings | Inconsistent DOM construction bypassed the shared layer | Delegate local Rich rendering to marked `LatinRuns`; route raw text through existing `LatinRuns` / exported existing `mixedText` |
| Font utility overriding Arabic | A `font-en` element explicitly marked `dir="rtl"` computed as LTR | Global `!important` font utility direction overrode the explicit Arabic direction | Explicit `[dir="rtl"]` wins; English descendants retain their own isolates |
| Invalid native-option markup (caught during implementation) | Inline run spans cannot be children of native `<option>` | Native select options have text-only constraints | These options keep unchanged text with native `dir="ltr"`, not nested run markup |

No demonstrated source punctuation mistake was “corrected” by rewriting lesson data. No distributed Unicode directional controls were inserted. The parser still cannot infer every possible author's intent from ambiguous text; semantic grouping remains necessary for separately authored DOM siblings.

### Shared-layer and integration changes

- `src/shared/bidi.tsx`: enclosure stack, quote boundaries, optional marked-text decoration inside the already-segmented runs. Highlight offsets preserve repeated unmarked occurrences and Arabic emphasis.
- `src/shared/lessonKit.tsx`: existing `Rich` delegates marked content; existing `mixedText` is exported for legacy shells rather than inventing another direction helper.
- Legacy lesson Rich implementations delegate to the same parser, retaining their caller-facing API. Raw mixed paragraphs, labels, hints, and shell text are routed through existing helpers without changing their strings.
- `src/shared/FinalQuiz.tsx`: prompts and correction reasons use `LatinRuns`; result announcements are live; a programmatic submit also checks completion.
- `src/index.css`: explicit RTL precedence, wrapping for mixed pairs and teacher content, visible keyboard focus in the workspace.
- `EnAr` and the Lesson 27 alternatives grouping contract were preserved.

### Rendered verification

A real **headless Chromium 153.0.8010.0** was used, not only jsdom or source checks. `scripts/test-bidi-browser.mjs` uses DOM Ranges and character coordinates against the built CSS. It checks periods, commas, colons, semicolons, question/exclamation marks, quotes, brackets, English alternatives, arrows/equality/slashes, highlight boundaries, Arabic punctuation, explicit RTL precedence, and wrapping at 280px. It includes an orphaned-period negative control that must fail the geometry oracle. Lesson 27's `IQ200 — had danced أم was dancing؟` has a geometric regression.

This is targeted browser coverage, **not a screenshot/geometry audit of every course state**. Existing `bidi-js` rendered-markup audits still crawl all lessons. Correction and protected teacher paths are additionally exercised by the assessment and lesson audits. The new `--details` switch on `audit-bidi-mixed.mjs` makes remaining violations inspectable without changing thresholds.

## Assessment inventory

All **38 primary assessments already had submission controls** at the baseline. No evidence supported adding a new check button to every component. The real fixes are clearer intent, reset/correction-state integrity, feedback rendering, and accessibility.

| Experiences | Questions each | Existing action / policy | Repair and verification |
|---|---:|---|---|
| FinalQuiz, lessons 1–16 | 12 | Final `تحقق من الإجابات`, disabled until this quiz is complete; delayed correction | Retained; all 16 behavioral runs plus browser inventory |
| FinalQuiz, lesson 17 | 14 | Same independent policy | Retained; behavioral run and browser inventory |
| FinalQuiz, lessons 18–26 | 12 | Same independent policy | Retained; all 9 behavioral runs plus browser inventory |
| End-of-lesson FinalTest, lessons 27–32 | 15 | `تصحيح الاختبار`; shared modern final-test engine | Retained, distinct from the 20-question Test Area; six-lesson behavioral/key audit |
| Separate Test Area 27 | 20 | `إنهاء الاختبار`, all answered first | Explicit `تحقق من الإجابات` added to label; completion guidance, pressed states, result announcement; submit/reset notify parent entitlement |
| Separate Test Area 28 | 20 | `إنهاء الاختبار`, all answered first | Clear check wording; existing delayed-correction behavior retained |
| Separate Test Area 29 | 20 | `تسليم الاختبار`, all answered first | Clear check wording; reset now notifies parent to relock solutions |
| Separate Test Areas 30–31 | 20 | `إنهاء الاختبار`, all answered first | Clear `تصحيح الاختبار` wording; immediate-feedback teaching activities are unchanged |
| Separate Test Area 32 | 20 | Header and footer submit; unanswered submission intentionally allowed and graded wrong | Clear check wording; footer now also shows score and restart, not just “sent”; existing policy retained |

### Functional defects found

1. **Lesson 27 solutions crashed:** the UI read `sol.explanation`, but the canonical mapped data supplies `sol.why`. Corrected the binding, not the data. The corresponding existing audit assertion now checks the real field; its strength was not reduced. This also removes one pre-existing TypeScript diagnostic.
2. **Lesson 27 parent correction entitlement was not tied to submission/reset.** Added `onCheckedChange` and stopped using teacher unlock to permanently set student test entitlement. Teacher access still independently authorizes solutions while unlocked.
3. **Lesson 29 reset cleared local answers/results but not parent `testDone`.** Its existing callback now takes a boolean; submit passes true, reset false.
4. **Lesson 32 bottom result offered only “sent” while restart was at the top.** Score and a working restart are now present at the bottom as well.
5. Legacy mixed correction text bypassed isolation, and legacy results lacked a live announcement.

### Behavioral coverage

- `interaction-test.mjs` now runs every legacy lesson 1–26, not only an 11-lesson sample: **963 assertions** covering selection versus correction, score/reasons, locking, reset, invalid/valid teacher passwords, and legacy embedded exercises already in that harness.
- Existing shared Final Test audit: **854 assertions**, including all six 15-question tests, multiple question types, correction/reset, and protected keys.
- Existing full lesson Final Test coverage audit: **579 checks**, traversing lesson navigation and verifying one Final Test per lesson, complete teacher keys, and distinct modern Test Areas.
- New Chromium assessment audit: **54 scenarios**. Inventories all 38 primary final actions, checks that the action follows the last question, scrolls it into view at 390px, exercises keyboard submission, submits/resets one legacy test while a sibling's DOM remains unchanged, completes all questions in Test Areas 27 and 29 to 20/20 and verifies reset callbacks, checks partial submission/reset in Test Area 32, and tests seven actual teacher gates plus workspace navigation and detail disclosure.
- Existing lesson audits 28, 30, 31, 32 retain their richer per-type correct/wrong submission and reset paths. The lesson 27 audit retains its IQ200/teacher checks.

**Inventory limitation:** this enumerates primary assessments, not every small lesson-specific exercise/game/question group. Existing exercise audits cover many immediate-feedback and delayed-check activities, but there is not yet an exhaustive new per-activity behavioral manifest for every legacy lesson. Immediate-feedback teaching activities must not be silently converted into delayed tests; this PR does not do that.

## Teacher workspace

`TeacherWorkspace` is a presentation component mounted **inside** the existing successful-authentication branches. Explicit section metadata, not text scraping, determines navigation.

- Compact lesson dashboard and an existing-route lesson selector, with a return link to the lesson list.
- Current lesson and selected section identified; keyboard-operable section buttons with `aria-current`/`aria-controls`.
- Distinct available categories: textbook/source solutions and references; assessment answer keys; teaching preparation.
- End-of-lesson Final Test keys and separate 20-question Test Area keys are separate destinations.
- Existing teaching notes, source-solution groups, rubrics, misconceptions, remediation, and ledgers are preserved in their applicable lessons. No entire-course answer dump.
- Essential final answers remain visible. Legacy options/reasoning and modern Final Test reasons/concepts/traps use native disclosure. `TeachingDetails` collapses modern Test Area explanations **only inside the teacher workspace**; student correction layouts remain unchanged.
- All 20 explanations are present for each modern teacher key; browser tests check disclosure completeness, invalid-password non-mounting, valid unlock, category switching, and final-key row counts.
- Lesson 29 only exposes categories for material it actually has; no textbook solutions or page numbers were fabricated. Legacy spaces retain their existing final-test-key material rather than pretending to contain textbook solution banks.

**Remaining IA limitation:** the new source-reference browser indexes printed item numbers and retains existing source-authored activity groups and their original lines. They are not all normalized into a uniform question/answer/reason/page schema because that metadata is not consistently present. Full question-by-question textbook retrieval, page-reference completeness, and a human teaching-usability review remain outstanding. The selector uses existing lesson routes; after switching lessons, the teacher opens that lesson's Teacher Area and its existing gate.

### Authentication and fidelity

- Established teacher passwords and comparison rules are unchanged.
- Failed/locked gates do not mount the workspace, keys, or explanations. Hidden sections exist only after successful authentication.
- Existing client-side/static-site security limitation remains: answer data and password checks ship in the JavaScript bundle. This is a UI access gate, not server-side protection.
- No data bank, ledger, source mapping, or textbook source file changed. Existing source-fidelity and literal-source-reveal audits remain in place.

## Quality results and limitations

Commands to reproduce:

```sh
npm ci
npm run build
npm run check:english-direction
npm run audit:english-direction
npm run audit:lesson-navigation
npm run audit:assessments
npm run audit:browser
npm run audit:teacher-source
npm run audit:activity-inventory
node scripts/audit-typecheck-baseline.mjs
node scripts/audit-bidi-mixed.mjs --report docs/audits/bidi-after.json --activity-report docs/audits/activity-observations.json
```

Browser audits require the build CSS. `audit:browser` builds it first; `audit:assessments` should be run after `npm run build`. Browser tooling is pinned, dev-only, and uses the npm-distributed Chromium binary. The included library bootstrap targets Linux; it is not a cross-platform browser installer.

Verified results:

- Production build passes (existing large-chunk warning remains).
- Existing English-direction/rendering checks pass; existing 59 BIDI assertions and their negative controls remain intact.
- Lesson audits 27–32 pass; source-reveal audit passes (60 checks).
- Lesson navigation passes (90 checks).
- Legacy interaction, shared final-test, all-lesson final-test coverage, and new browser tests pass as detailed above.
- Full mixed-BIDI audit passes its **unchanged historical thresholds**, but the last complete run still reports **68 non-allowlisted findings**, down from 649 at the start of this continuation (806 before the original shared repair). Strict Lessons 6 and 27–32 remain at zero. This is a blocker to claiming Goal 1 fully complete, not an acceptable definition of “fixed.”
- `git diff --check` passes; no unrelated data rewrites or generated browser bundles are included.
- There is no project `tsconfig.json` / full typecheck script. An explicit `tsc --noEmit --jsx react-jsx --moduleResolution bundler --module esnext --target es2022 --lib es2022,dom --allowSyntheticDefaultImports --skipLibCheck src/main.tsx` fails: **178 diagnostics**, versus 179 with identical flags on the base source. Diagnostic comparison found no new diagnostic messages; the removed diagnostic is Lesson 27's invalid `explanation` field. **Full TypeScript validation did not pass.**
- Pre-existing duplicate React keys, a legacy nested-button warning, dependency advisories, and build-size warnings remain outside this focused repair.

### Required follow-up before marking ready

1. Resolve or individually validate the remaining legacy mixed-BIDI findings, especially separately authored English/Arabic DOM siblings and legacy rail/label surfaces; audit full browser layouts and correction states rather than relying on the baseline allowance.
2. Complete an individually enumerated embedded-activity inventory, including submission/reset isolation and screen-reader checks beyond the primary assessments.
3. Finish uniform question-level textbook retrieval where source references permit it, without inventing missing metadata or shortening authoritative content.
4. Human review on narrow screens and assistive technology; browser keyboard tests are not a full screen-reader certification.
