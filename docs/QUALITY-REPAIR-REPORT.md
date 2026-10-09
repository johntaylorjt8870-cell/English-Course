# RTL, assessment verification, and teacher workspace repair

## Status and scope

**Draft / not ready to merge.** This is a verified repair of several shared defects, not a claim that the entire requested system-wide audit is complete. In particular, the existing mixed-BIDI audit still reports legacy violations (see the results below). The baseline and negative controls have not been relaxed. Embedded lesson activities also need a complete, individually enumerated behavioral inventory before calling Goal 2 exhaustive.

- Base: `1f879216d96edea741e4b28db8b58449bb98adaf`, the merge of PR #40. `origin/main` was fetched and matched this base.
- Session branch: `arena/8744e70e-english-course` (Arena fixes the session branch).
- Draft PR: https://github.com/johntaylorjt8870-cell/English-Course/pull/41 — do not merge or delete the branch.
- Source wording, answer values and existing ledgers are preserved. This iteration adds stable IDs to Lesson 2 exercise metadata; it does not rewrite its questions or answers.
- Commit status: the continuation implementation and evidence are recorded together on this branch; its exact SHA is recorded in the PR #41 progress comment. Previously verified commits `b762e4e` and `68595c7` are retained.

## Continuation from `aea5289` — current iteration (supersedes numbers below)

**Status: NOT COMPLETE. Draft PR #41 must stay open and unmerged.** This iteration made verified progress on the activity denominator (new permanent gate), re-verified the whole pipeline with exact counts, and classified every remaining BIDI case from its actual rendered evidence. **No BIDI finding was resolved in this iteration, no activity instance was added to the verified set, and no provenance gap was closed.** Counts below are exact.

### Branch and PR state

- This work is on the session branch `arena/3b39333f-english-course`, created from `aea5289`. PR #41's head is `arena/8744e70e-english-course` at `aea5289`; this work does not change that PR's head, and no PR was opened or merged.
- Environment repair (not repository content): the clone was shallow, so `ee70138`, `59ba597` and other historical commits were absent. `git fetch --unshallow origin` restored them. Before that, four suites exited 1 with `fatal: invalid object name` (`audit:browser`, `audit:assessments`, `audit:lesson2-activities`, `audit:teacher-provenance`). Those failures were environmental, not regressions; after the fetch they pass or fail on their real content.

### 1. BIDI — 24 open findings: 0 resolved this iteration

Denominator (unchanged from the scene review): **48 original → 24 repaired (prior iterations) → 24 open**, 0 matching exceptions. Full per-record classification with oracle visual order: [`docs/audits/bidi-open-classification.json`](audits/bidi-open-classification.json).

| Class | Open | Case IDs (lesson) | Evidence from the current rendered oracle | Owner decision required |
|---|---:|---|---|---|
| C1 neutral attribution | 7 | L10 plays (`1f1841687ac3c5ed`), L12 `+ y` (`5d2600af3fc51a3a`), L16 book (`562538031bc27572`), L16 their (`f9237450d963f0c6`), L17 `+ 's` (`4eb0b06b0eb57373`), L24 few (`db0737a7ecea1a9a`), L24 little (`d77b545c7e96f088`) | The sentence period or `+` sits between the English isolate and the Arabic sentence. The oracle counts it as part of the Latin span. Wrapping the Arabic sentence in an RTL span (tested on L10 and L16) leaves the oracle result unchanged. | Approve an explicit oracle attribution rule, or accept the current placement. Not weakened here. |
| C2 native select | 1 | L4 `96ed9167e8093a85` | The oracle concatenates unselected `<option>` text (`Verb to beArticle`). Only the selected value is displayed. | Approve measuring the displayed value only, with Chromium proof. |
| C3 independent tags | 2 | L8 `079db2a35ac08a74` (`do / does` ‖ النفي), L18 `ad2b68b306713fc6` (`some / any` ‖ الأسماء…) | Separate topic pills in an RTL flex row. The row oracle treats adjacent independent tags as a translation pair. | Classify as independent tags with an explicit contract, or change tag order in layout. |
| C4 Arabic connective / contrast flow | 13 | L10 `831dc6b412dd91e2`; L18 `b54105dc01804489`; L20 ×6 (`60de322313989b5f` this, that, these, those, my new camera, children's bicycles); L22 `18a83403b0994ab2`; L23 ×2 (`99286d6e998604cf`, `0d4d768034b4d07e`); L26 ×2 (`63dd1e6803e58088`, `5115d4dba8ae89f4`) | An English item is followed by an Arabic connective inside one sentence (مع، و، ولم نقل، وليس، لكن). RTL logical order is correct for the sentence, but the English=Arabic pair policy expects English on the left. | Choose: accept RTL sentence reading order for these flows (oracle contract change), or require an English-first layout (source/layout change). |
| C5 cross-clause dash | 1 | L7 `915a29c9e3a772cb` | `النفي: don't — السؤال: Do...?` The dash joins one clause's English to the next clause's label. Raw text is flagged. Routing it through `LatinRuns` clears the pair violation but leaves `Do...?` visually beside `don't`, away from its label. The wording check forbids reordering the DOM text. | Approve a clause-level regrouping or a visual reorder. |

Why none were applied: each class needs a policy decision that the repository does not contain (a rule for neutral attribution, for hidden options, for tag semantics, for Arabic sentence direction, or for clause grouping). Each class is reproducible from `bidi-after.json` and the harness. Waiving any of them would weaken the audit, which this brief forbids. Reproduce: `npm run audit:bidi-scenes`, which passed in this iteration: `unique violations: 24 (allowlisted: 0)`, 48/48 scenes measured at 1180px and 390px, 24/24 repaired cases still pass their contracts. The 24 open are not repaired and remain blocking.

### 2. Activity denominator (Lessons 1–32) — permanent gate added; certification NOT complete

New reconciliation and gate: `npm run audit:activity-denominator` (`scripts/audit-activity-denominator.mjs`, artifact [`docs/audits/activity-denominator.json`](audits/activity-denominator.json)). It joins the source census, the initial-state runtime observations, and the behavioral artifact, and it fails while any source site is unresolved, unaccounted, or in a lesson without a verified instance. It is kept out of the aggregate audit chains so those stay green; it is wired into nothing else until it passes.

| Measure | Count |
|---|---:|
| Source census: templates / JSX control sites | **875 / 1,681** |
| Runtime observation: groups / control occurrences / sites observed | 1,346 / 7,861 / **859** |
| Source sites unobserved (unresolved, not dismissed) | **822** |
| Source sites unaccounted for (not in census or observation) | 0 |
| Verified behavioral instances / questions | **5 / 29** (Lesson 2 only) |
| Excluded with recorded reason | 0 |
| Runtime activity instances discovered | **not established** |
| Lessons with a verified instance | 1 / 32 |

Per-lesson (source sites / observed / unobserved / verified):

| Lesson | Src sites | Observed | Unobserved | Verified |
|---|---:|---:|---:|---:|
| App/shell | 70 | 16 | 54 | 0 |
| 1 | 29 | 12 | 17 | 0 |
| 2 | 21 | 10 | 11 | **5 (29 q)** |
| 3 | 35 | 19 | 16 | 0 |
| 4 | 31 | 19 | 12 | 0 |
| 5 | 35 | 23 | 12 | 0 |
| 6 | 33 | 21 | 12 | 0 |
| 7 | 24 | 12 | 12 | 0 |
| 8 | 40 | 27 | 13 | 0 |
| 9 | 28 | 16 | 12 | 0 |
| 10 | 35 | 22 | 13 | 0 |
| 11 | 44 | 33 | 11 | 0 |
| 12 | 44 | 33 | 11 | 0 |
| 13 | 49 | 24 | 25 | 0 |
| 14 | 32 | 12 | 20 | 0 |
| 15 | 32 | 19 | 13 | 0 |
| 16 | 28 | 17 | 11 | 0 |
| 17 | 48 | 18 | 30 | 0 |
| 18 | 54 | 43 | 11 | 0 |
| 19 | 41 | 27 | 14 | 0 |
| 20 | 61 | 49 | 12 | 0 |
| 21 | 52 | 41 | 11 | 0 |
| 22 | 33 | 22 | 11 | 0 |
| 23 | 52 | 35 | 17 | 0 |
| 24 | 23 | 17 | 6 | 0 |
| 25 | 86 | 27 | 59 | 0 |
| 26 | 83 | 63 | 20 | 0 |
| 27 | 86 | 52 | 34 | 0 |
| 28 | 91 | 49 | 42 | 0 |
| 29 | 76 | 31 | 45 | 0 |
| 30 | 66 | 22 | 44 | 0 |
| 31 | 110 | 25 | 85 | 0 |
| 32 | 109 | 3 | 106 | 0 |

Scope limits: the 1,346 observation groups come from one initial-state crawl with no answer, reset, or repeat states. The 5 verified instances (Lesson 2) are the only per-instance behavioral certifications. Lessons 1 and 3–32 have **no** per-instance behavioral tests. The 822 unobserved sites are not classified as shell, conditional, or dead; that reconciliation is still required.

### 3. Teacher-source provenance — 74 open, 0 closed

[`docs/audits/teacher-provenance.json`](audits/teacher-provenance.json) retains all 74 original IDs: **27 lesson-level** (`…-textbook-key`, one per lesson, Lessons 1–26 and 29) and **47 item-level** (`l27-source-*`, `l28-source-*`, `l30-source-*`, …). Results: **0 closed, 74 UNRESOLVED.**

What was checked: the repository has 0 tracked PDF/image/document assets; a filesystem search of the sandbox found none for `*.pdf`, `*.docx`, `*.pptx`, or `*textbook*`/`*teacher*` outside the repo's own code. Lesson 2's record includes `sourcePage: null` and `printedQuestionNumber: null`, the only page-related fields, so no textbook page metadata exists in any record. Canonical indices and derived ledgers are not independent proof of original identity and were not treated as such.

Exact missing evidence to close any gap: (a) the original textbook page scans or a reliable transcription with item mapping; (b) for each item, the printed question/sub-question number and page; (c) the original wording, matched to the repository text; (d) confirmation that each teacher answer group corresponds to that exact original item. **Please provide the original source material; without it these 74 cannot be closed honestly.**

### 4. Verification run (this iteration, base `aea5289`)

| Check | Result | Exact count / scope |
|---|---|---|
| `npm run build` | PASS | size warning only (3.9 MB JS) |
| `check:english-direction` | PASS | 1,617 assertions; 59/59 BIDI rendering |
| `audit:english-direction` | PASS | render 1,454; Lessons 24, 26–32; Final Test 854; coverage 579; source-reveal 60; BIDI ratchet passed with 24 unresolved, 0 exceptions |
| `audit:lesson-navigation` | PASS | 90 passed, 0 failed |
| `audit:assessments` | PASS | interaction 963 passed/0 failed; Final Test 854 checks |
| `audit:browser` | PASS | Chromium 153.0.8010.0; 54 browser scenarios / 38 primary assessments; 7 teacher gates |
| `audit:lesson2-activities` | PASS | 5/5 instances; 29/29 questions; 29/29 gated references |
| `audit:bidi-scenes` | PASS | 48/48 scenes measured at 1180px and 390px; 24 repaired contracts pass; 24 open |
| `audit:teacher-source` | PASS | inventory/drift only |
| `audit:teacher-provenance` (discovery) | PASS | 74 records reconciled |
| `audit:teacher-provenance -- --require-closed` | **FAIL, exit 1** | 74 unresolved |
| `audit:activity-denominator` (new) | **FAIL, exit 1** | 822 unresolved; 31 lessons unverified |
| `audit:activity-inventory --require-verified` | **FAIL, exit 1** | 875 templates not behaviorally verified |
| TypeScript explicit comparison vs `1f879216…` | **Typecheck FAILS** | current **178** diagnostics (exit 2); base **179** (exit 2); **0 added, 1 removed** |

No assessment, navigation, or BIDI audit threshold, negative control, allowlist, or baseline was changed in this iteration.

### Blockers preventing completion (PR #41 stays draft)

1. BIDI: 24 open findings; 0 repaired in this iteration. Five classes need owner decisions (section 1).
2. Activity denominator: 822 unresolved source sites; 5 of 875 templates behaviorally verified (Lesson 2 only); runtime instances not established.
3. Provenance: 74 of 74 original gaps open; original source material not available.
4. TypeScript: still fails (178 vs 179 base; 0 new normalized diagnostics).

Reproduce: `npm run audit:bidi-scenes`, `npm run audit:activity-denominator`, `node scripts/audit-teacher-provenance.mjs --require-closed`, `node scripts/audit-typecheck-baseline.mjs`, and the existing commands listed in the earlier sections.

## Continuation from `ee70138` — latest verified status

**Partial repair; all three global acceptance gates remain blocked.** This section supersedes numerical status in the historical sections below. Work stays on the existing session branch and OPEN/DRAFT PR #41; no merge or new PR.

### A. 24 additional BIDI repairs; 24 findings remain open

| Category | At ee70138 | Current | Repaired |
|---|---:|---:|---:|
| Paragraph/pair | 32 | 10 | 22 |
| Row | 16 | 14 | 2 |
| Alternatives | 0 | 0 | 0 |
| Total | **48** | **24** | **24** |

The full unchanged oracle reports **zero new findings and zero matching exceptions**. No threshold, negative control, baseline, or allowlist was relaxed. The historic 68-case ledger now records 44 repairs and 24 open cases. Passing the existing ratchet is not zero-defect certification.

- Before production edits, `test-bidi-scene-repairs.mjs` exited **1** against the actual pre-repair scenes. All 24 selected cases reproduced their defect at at least one tested width.
- Audit-only source instrumentation traced **48/48** originals to exact rendered source hosts/functions. Saved original App DOM fixtures are retained as compressed negative controls, not regenerated from current code.
- Chromium **153.0.8010.0**, production CSS, desktop **1180px** and narrow **390px**: all **24/24** repaired cases now pass at both widths. The test also retains all **48/48** cases and checks unchanged normalized rendered wording at both widths.
- The `-ed` / `-ING` repair is in the existing shared parser: an attached leading hyphen remains part of its Latin suffix. Other changes send complete semantic labels through `LatinRuns`, or group existing English/Arabic fields using `EnAr`. No new direction helper, local CSS override, source-data rewrite, or activity behavior change.
- Geometry compares overlapping vertical glyph rectangles, not identical top coordinates across different font sizes. Evidence consists of real-browser glyph positions from actual App step snapshots, **not** browser-driven certification of every interactive state. Animations are frozen at their final state.

Every original ID, exact source/component, severity, root-cause assessment, disposition, and per-lesson total is in [BIDI-SCENE-REVIEW.md](audits/BIDI-SCENE-REVIEW.md) / [bidi-scene-review.json](audits/bidi-scene-review.json). Before/after individual character rectangles are in `bidi-scene-geometry-{before,after}.json`.

**Remaining 24 are not waived.** They include prior-sentence punctuation mistaken for a Latin prefix, a native-select cross-option target, independent topic pills, Arabic question/contrast/conjunction flows, and unresolved mixed formula/rail punctuation boundaries. These are individually described, not blanket false-positive exemptions. Native option ranges are zero and the narrow rail is hidden: neither is proof of correct rendering. Unsafe semantic reinterpretations were left open rather than forcing every Arabic sentence into LTR.

Reproduce from the current checkout:

```sh
npm run audit:bidi-scenes
npm run check:english-direction
npm run audit:english-direction
```

The first command rebuilds, remeasures immutable pre-fix scenes, checks all 24 negative controls, crawls the current real App for **all 48 original targets including repaired cases**, measures the new scenes, asserts the repair contracts and wording preservation, and writes the per-case review. Missing scenes fail rather than disappearing from the denominator.

### B. Whole-course activity certification remains unfinished

**No additional activity instance was behaviorally certified in this continuation.** The verified Lesson 2 five-instance / 29-question suite was preserved and rerun successfully. Existing primary-assessment coverage remains 54 browser scenarios over 38 assessments, not exhaustive embedded-activity coverage.

The source census contains **875 component templates / 1,681 control sites**. A three-pass reach crawl (`scripts/audit-activity-reach.mjs`, npm `audit:activity-reach`) now runs over all Lessons 1–32: a next-only step count, a fresh-mount in-step click pass per step, and a bounded navigation BFS (depth ≤2, ≤40 states per lesson). It observed **962 distinct source sites** across **53,671 observation groups / 300,198 control occurrences**. Written to [activity-reach.json](audits/activity-reach.json) and unioned into [activity-denominator.json](audits/activity-denominator.json).

Whole-course denominator, exact: **1,681 census sites = 962 observed + 719 unobserved + 0 unaccounted; 0 excluded-with-reason; 5 verified instances / 29 questions (Lesson 2 only); 1 of 32 lessons with a verified instance.** Runtime-discovered activity instances: not established.

Coverage limits that keep this from being a complete denominator:
- Navigation BFS stopped at 40 states with queue remaining (`navQueueRemaining > 0`) in Lessons 1, 3, 7, 8, 9, 18, 19, 28, 29, 30, 31, and 32. Lessons 1, 2, 5, and 29 also hit the per-step click budget, so some in-step controls were not clicked.
- Lesson 17's Next keeps changing the DOM, so its walk hits the 200-step cap.
- Lesson 27 reaches only one navigation state (queue empty). Its navigation controls were not found by the candidate selector, so it is not established whether its controls are fully covered.
- The navigation BFS starts only from step 0 and does not revisit deeper steps.
- No exclusion rule has been applied. The 719 unobserved sites are unresolved, not excluded.

`node scripts/audit-activity-inventory.mjs --require-verified` was rerun and **fails (exit 1)**. `node scripts/audit-activity-denominator.mjs` also **fails**: 719 unresolved sites and 31 lessons without a verified instance. The census drift gate still detects changed/new source controls, but it is not the requested permanent per-instance behavioral gate. A stable runtime/source instance registry, justified exclusions, empty/partial/complete and repeat/reset/isolation/keyboard tests in real lesson shells, and a reconciled denominator remain required. This blocker is not closed by the refreshed inventory or passing shared assessment tests.

### C. All 74 original provenance records itemized; none closed

`audit-teacher-provenance.mjs` reconciles all original IDs against `ee70138`, records exact known teacher-group references or the explicit lack of identified textbook items, canonical source locations, source/data/derived-ledger hashes and exports, known answer-reference numbers, missing question/subquestion/page evidence, solution-verification limits, and the required next action.

- **74 original records / 0 closed / 74 unresolved.**
- Original PDF/image/document candidates among **tracked repository files: 0**. This is not a claim about external or untracked materials.
- Existing 47 teacher answer groups / 113 numbered answer references and Lesson 2's 29 canonical links remain distinct from original-question verification.
- No page, printed question number, original wording, or textbook-to-solution correspondence was inferred from canonical indices.
- [TEACHER-PROVENANCE.md](audits/TEACHER-PROVENANCE.md) and [teacher-provenance.json](audits/teacher-provenance.json) retain every original ID and its evidence/result/remaining action. Lesson-level gaps that lack an exact source-question identity explicitly remain unidentified.

```sh
node scripts/audit-teacher-source.mjs
node scripts/audit-teacher-provenance.mjs
node scripts/audit-teacher-provenance.mjs --require-closed # expected FAIL, 74 unresolved
```

The provenance discovery check is reproducible; it does not automatically close gaps. Closure still needs original source material and reviewed question/solution/numbering/navigation evidence, retaining the original IDs.

### Fresh final verification

| Check | Result and scope |
|---|---|
| Production build | PASS; size warning remains |
| English direction/source checks and rendering regressions | PASS; 59/59 rendering assertions, negative controls preserved |
| Complete BIDI crawl | Ratchet PASS; **24 open findings**, not zero defects |
| All-original-scene repair suite | PASS; 48 retained scenes, 24 reproduced pre-fix failures and 24 post-fix passes, two widths |
| Existing Chromium BIDI suite | PASS, including its negative control |
| Lesson navigation | PASS, 90 checks |
| Lessons 24, 26–32; final-test/coverage/source-reveal audits | PASS via `audit:english-direction` |
| Assessment suites | PASS within existing scope: 54 browser scenarios / 38 assessments; 7 teacher gates; Final Test 854 checks |
| Lesson 2 full-shell activities | PASS: 5/5 activities, 29 questions, 29/29 gated canonical references |
| Whole-course activity certification | **FAIL / denominator unknown** |
| Teacher-source census and provenance discovery | PASS as inventory/drift checks; **74 original-source gaps unresolved** |
| Strict provenance closure | **FAIL**, exit 1 |
| Explicit tsc comparison vs `1f879216…` | Current **178** diagnostics / base **179**; both compiler exits **2**; **0 new normalized / 1 removed**. Typecheck still FAILS |

Existing Lesson 2 feedback timing, Space-shortcut guard, canonical navigation and authentication were not modified. Full production diff was reviewed for wording/data/auth/behavior changes. Duplicate React-key warnings, existing type errors, and build-size warnings remain disclosed. This is **not complete, not merge-ready, and not exhaustive behavioral or textbook-source certification**.

## Historical follow-up to `59ba597` (superseded status)

**Historical partial implementation, not completion of the three requested blockers.** The latest continuation above supersedes this snapshot. The remaining 48 BIDI cases have not all received individual component/severity/geometry review; the whole-course behavioral registry and the 74 teacher provenance gaps are not finished. No merge-readiness claim is made.

### 1. BIDI: 20 of the 68 starting findings repaired; 48 remain

The unchanged full crawl now reports **32 paragraph/pair + 16 row + 0 alternatives = 48 unresolved**, with **zero matching exceptions and zero new findings**. No threshold, oracle, negative control, or allowlist was relaxed. [`bidi-review.json`](audits/bidi-review.json) retains all 68 starting cases under stable IDs: 20 have a repaired root cause/component and evidence; 48 explicitly remain OPEN with incomplete individual review. [`BIDI-REMAINING.md`](audits/BIDI-REMAINING.md) gives every remaining case and per-lesson counts; [`bidi-after.json`](audits/bidi-after.json) retains exact logical/visual evidence.

Repairs:

- **Shared enclosure segmentation:** `pushLatin` previously left *all* text following an unmatched opening bracket outside isolation, so `(a أو an)` could not become one alternatives group. Only the unmatched boundary now stays in the RTL context; subsequent English is segmented normally. No source text changes are involved.
- **Complete semantic phrases:** Lesson 1 role labels, Lesson 2 introductions, Lesson 9 time-word definitions, Lesson 12 conditional/read and suffix captions, and Lesson 13 equation/objective captions now reach the existing parser as complete units instead of unrelated fragments.
- **Label/gloss grouping:** Lesson 4 `ArtBlock`/`VowelLab` and Lesson 24 `TimeSensor`/`MeaningDetector` use existing `EnAr`, retaining the original label and explanation.

Chromium Range evidence is persisted in [`bidi-boundary-geometry.json`](audits/bidi-boundary-geometry.json). Tests include brackets/braces/parentheses, quotes, marked and unmarked choices, and 760px/280px layouts, as well as joined label/equation fixtures. The **actual renderer from `59ba597`** is compiled as a negative control and reproduces reversed `a`/`an` character positions. Existing punctuation, `استخدام Had.`, Arabic punctuation, quotation, highlight and wrapping tests remain. This is targeted geometry, not exhaustive geometry for all affected rendered course states.

Reproduce: `node scripts/test-bidi-browser.mjs` after the build; `node scripts/audit-bidi-mixed.mjs --report docs/audits/bidi-after.json`; `node scripts/report-bidi-progress.mjs`.

### 2. Embedded activity behavior: five concrete instances verified

[`lesson2-behavior.json`](audits/lesson2-behavior.json) records **5/5 named Lesson 2 source-exercise instances, covering 29/29 questions**:

| Stable activity ID | Type / policy | Questions | Evidence |
|---|---|---:|---|
| `l02-pronoun-choice` | Multiple choice; delayed check | 5 | automated verified |
| `l02-be-choice` | Completion by choice; delayed check | 7 | automated verified |
| `l02-correction-reveal` | Source-directed guided correction reveal | 5 | automated verified |
| `l02-be-completion` | Completion by choice; delayed check | 7 | automated verified |
| `l02-pronoun-reveal` | Source-directed guided transformation reveal | 5 | automated verified |

The three graded exercises previously disclosed correctness immediately after selection. Each now has one labeled bottom check, disabled until complete, neutral draft selection, locked submitted choices, a result announcement, and a bottom restart that clears drafts/results. Guided exercises preserve their explicit source instruction to reveal an answer rather than pretending they are graded tests; both now have restart controls.

The audit verifies empty/partial/full attempts, correct and all-wrong grading, no pre-submit color/tick/result leakage (including accessibility snapshots), repeated submission, repeated reset, sibling DOM isolation, named controls and keyboard activation. It also traverses the **actual Lesson 2 shell** to each of the five instances and tests Space activation/reset. This caught a real additional bug: global Space navigation swallowed native button activation. The shared `isInteractiveKeyTarget` guard, integrated in Lesson 2, prevents that interference. Other lesson keyboard handlers are **not** certified by this fix.

Three negative controls compile the original `59ba597` Lesson 2 component and reproduce its immediate-feedback leaks. `audit:lesson2-activities` compares discovered source exercise IDs to the explicit tested contract list; an added exercise without a contract fails. Both `audit:assessments` and `audit:browser` include this suite.

**Global denominator limitation:** five verified exercise instances are not five of 875 activities. The current census has **875 control/component templates / 1,681 source sites**; those are not unique student activity instances. The initial crawl has **1,346 owner/task/step group observations / 7,861 control occurrences**, with **822 source sites unobserved**. Global instance identity, policy classification, and complete behavior coverage remain unfinished. The whole-course strict certification gate remains failing; source census records stay OPEN rather than being relabeled from these five tests. Existing 38-primary-assessment tests remain a separate coverage scope.

### 3. Teacher mapping: real question navigation added, provenance still open

Behind the **unchanged existing authentication branch**, Lesson 2's Teacher Area now has a separate source-exercise destination with direct selection of **29/29 canonical question records** from all five exercises. It uses the same canonical objects, not copied question/answer text. Every original question field, option value and answer index is available in the authenticated detail. Final answers are visible at a glance, with expanded completion/reasoning. Added reasoning is explicitly labeled **Platform Explanation**; original hints remain intact.

Question ordinals are explicitly identified as local data order, **not invented printed numbering**. Source pages and printed question numbers remain unknown. The new teacher-only file follows the existing `TeacherArea2.tsx` convention; the source-reveal rule was not modified. Tests verify failed/locked gates mount no reference browser, valid unlock, every question selection, collapsed/keyboard-openable details, and exact preservation of all original fields.

Coverage denominators, deliberately kept separate:

- New Lesson 2 canonical mappings: **29/29 questions**, across **5/5 exercises**, directly navigable and browser-tested.
- Verified external textbook page/printed-question mappings for those records: **0/29**. Each is listed with its exact prompt/source path and missing provenance in the source coverage artifact.
- Existing banks: **47/47 groups** losslessly accounted for and **113/113 explicitly numbered reference items** indexed; this still does not establish complete original-question provenance.
- Original reported mapping gaps: **74/74 remain open at the original gap-record level**. Lesson 2's gap is now partially resolved for canonical retrieval and itemized for its remaining external provenance. The other reported gaps have not all been individually resolved/reviewed in this iteration. No global original-textbook-question denominator is established.

Reproduce: `npm run audit:teacher-source` and `npm run audit:lesson2-activities`. The main artifact is [`teacher-source-coverage.json`](audits/teacher-source-coverage.json).

### Verification and remaining work

Production build, all existing direction/render/lesson/source-reveal/navigation/assessment audits, the new five-instance behavioral audit, teacher checks, and fresh current/base TypeScript comparison are rerun for this iteration. The passing pipeline and exact counts are persisted in [`verification-latest.json`](audits/verification-latest.json), and recorded in the PR progress comment: direction 1,617; render 1,454; BIDI assertions 59; navigation 90; legacy interaction 963; Final Test 854; final coverage 579; source-reveal 60; Chromium primary-assessment scenarios 54, plus the five-instance Lesson 2 suite. TypeScript remains failing at **178 current / 179 baseline diagnostics**, with **0 new normalized diagnostics**; a passing comparison is not a clean typecheck.

A transient Chromium launch SIGSEGV occurred between suites; the affected geometry suite subsequently passed on a fresh launch. An initial source-reveal failure correctly identified the new teacher-only file's nonstandard placement/name; it was corrected to the existing TeacherArea convention with the audit unchanged, and gate/non-mounting tests rerun.

Still required: individual review and resolution of the remaining **48 BIDI findings**, globally enumerated per-instance activity contracts/tests (not merely these five), and confident original-source mapping of the **74 open gap records**. PR #41 remains draft, open and unmerged. The work requested in this follow-up is **not fully complete**.

---

## Earlier continuation snapshot (superseded by the current results above)

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
