# Lesson 41 — implementation and validation report

## Delivered scope

- Native ordered flow: opening + §§1–40, **41 steps** with chapter/section navigation and explicitly labelled visited-step progress.
- **883 normalized source units**, hashed source manifest, per-unit coverage document; **66 practice items** with all required subparts and full teacher explanations.
- Stateful BE/DO/HAVE explorer; role identification including both DO occurrences; BE and DO laboratories; perfect/perfect-continuous composition; first-auxiliary analyzer including do-support; ten repair/reason challenges; full reading passage and ten questions; writing area with approximate sentence count, ten source criteria, separate original partial model; complete golden summary and roadmap.
- Independent **25-question, five-level** final test, with **26 response fields** because Q8 retains both blanks. Free-text answers use the established post-submission comparison pattern, not misleading automatic grading.
- Test dependency graph has no ledger/practice keys/solutions/teacher imports. Final keys and guide load only through gated lazy paths. Submission is revalidated; reset clears responses and relocks solutions unless teacher authorization remains active.
- Teacher access uses the existing password mechanism without changing the password. Shared Signature supplies attribution/contact.
- Lesson-local visual generation, token documentation, real Chromium screenshots and verification. No application source for Lessons 1–40 changed; no Lesson 42 folder, card or route.

## Source provenance and caveats

§37 contains no actual detailed final key: Q1–20 keys and all explanatory notes are labelled platform-authored. Q21–25 auxiliary keys come from the implementation brief. §38 model remains the original eight sentences, with an explicit note that it is partial and lacks DID emphasis and the two required questions. British possessive HAVE alternatives, linking BE, and the scope of the introductory passive rule are documented rather than silently “corrected.”

The source manifest protects the checked-in transcription against later omissions/changes. It is not an independent OCR/original-document oracle: initial fidelity rests on transcription of the supplied conversation and the disclosed normalization, with all units available for reviewer comparison.

## Actual validation commands

| Command | Exit | Result |
|---|---:|---|
| `npm run audit:lesson41` | 0 | 460 source/data/scope assertions + 1,231 DOM/BIDI/interaction assertions passed. |
| `npm run check:english-direction` | 0 | 1,680 direction assertions across 41 lessons; 59/59 BIDI-rendering cases passed. |
| `npm run audit:lesson-navigation` | 0 | 152 assertions passed, including actual Lesson 41 route/card and last-window checks. |
| `node scripts/audit-render-direction.mjs` | 0 | 1,463 assertions passed; existing React special-key warning remains. |
| `node scripts/audit-source-reveal.mjs` | 0 | 63 checks passed; no student raw-source reveal control introduced. |
| `node scripts/audit-final-test.mjs` | 0 | 1,248 checks passed; independent Lesson 41 assessment registered. Existing duplicate-key warnings in older lessons remain. |
| `node scripts/audit-final-test-coverage.mjs` | 0 | 633 checks passed for its existing coverage; Lesson 41 behavior is covered by the targeted audit, not claimed as part of the older generic suite. |
| `node scripts/audit-bidi-mixed.mjs` | 0 | Passed under existing baseline rules; legacy non-strict findings are not fixed by this PR. |
| `npm run audit:lesson38` | 0 | 267 assertions passed. |
| `npm run audit:lesson39` | 0 | 357 assertions passed. |
| `npm run audit:lesson40` | 0 | 1,055 assertions passed; old source roadmap preserved. |
| `npm run build` | 0 | Production build succeeds; existing large-bundle warning remains. |
| `npx tsc --noEmit --jsx react-jsx --module esnext --target es2022 --moduleResolution bundler --allowSyntheticDefaultImports --skipLibCheck src/lessons/lesson41/Lesson41.tsx` | 0 | Lesson 41 plus its imported shared dependencies: no diagnostics. |
| `npx tsc --noEmit --jsx react-jsx --module esnext --target es2022 --moduleResolution bundler --allowSyntheticDefaultImports --skipLibCheck src/main.tsx` | 2 | 179 pre-existing diagnostics; output byte-for-byte identical to the preserved baseline. |
| `npm run audit:english-direction` | 0 | Entire existing audit chain plus Lesson 41 static/DOM checks completed, not a partial run. Legacy mixed-BIDI report contains 785 unique findings under existing baseline rules. |
| `node scripts/audit-lesson41-browser.mjs` | 0 | Actual Chromium: 347 checks, zero assertion failures; 26 screenshots; external blocked Google Fonts request documented separately. |
| `git diff --check` | 0 | No whitespace errors. |

`npm ci` exited 0 before implementation validation. Optional `npm install --no-save --package-lock=false playwright-core @sparticuz/chromium` exited 0 for browser verification; package-lock and application dependencies are unchanged. The repository has no lint command, generic test command or tsconfig; explicit TypeScript commands above are used.

Machine results: `lesson41-validation-results.json`. Whole-repository diagnostic baseline: `lesson41-baseline-typescript.txt` (preserved unchanged). Browser details: `lesson41-visual-verification.md` and `lesson41-visual/verification.json`.

## Integration failures found and resolved

The initial post-implementation run failed assertions that assumed exactly 40 lessons, expected the last hub window to end at 40, denied a Lesson 41 route, or did not recognize its independent test. These were genuine integration failures, not claimed as baseline passes. A second navigation attempt initially placed the new test after unmounting the fixture; the fixture ordering was corrected and the full navigation audit now passes. The full chain then revealed the same inventory assumption in the Lesson 31 audit; its two course-inventory assertions were updated. All final commands above completed with actual exit statuses.

Necessary existing-script changes are limited to:
- `check-english-direction` and `audit-render-direction`: 41-folder/course inventory and route coverage.
- `audit-lesson-navigation`: keep existing Lesson 40 behavior, add Lesson 41 route/current/window checks.
- `audit-final-test`: recognize and verify Lesson 41's independent 25-question/five-level shape.
- `audit-lesson31`, `audit-lesson37`, `audit-lesson38`, `audit-lesson39`, `audit-lesson40`: update meta-assertions about course inventory; old future-route prohibitions now guard Lesson 42. No original lesson-content, direction, reveal or contrast assertion is removed.
- `package.json`: add the targeted audit and include it in the existing full chain.

## Remaining limitations — not blockers disguised as passes

- Existing 179 TypeScript errors remain untouched. This PR introduces no additional diagnostics.
- Existing global large-bundle and older React/JSDOM warnings remain. The legacy mixed-BIDI checker passes its established baseline, not zero findings across the whole course.
- Teacher access is the platform's existing **client-side pedagogical gate**, not server-backed authorization. Lazy loading prevents ordinary premature access; a determined user can inspect public JavaScript assets.
- Student activity/writing/test state lasts for the mounted lesson session, not across a reload. The UI does not claim saved cloud progress or grammatical auto-evaluation.
- Writing sentence count is punctuation-based and approximate; the rubric requires human assessment.
- Browser coverage is Chromium at the stated widths; screen-reader, Safari/Firefox and physical-device certification are not claimed. The existing external Google Fonts request is blocked in this sandbox; the new lesson uses its own local font stack.

## Review entry points

1. Open `#/lesson/41` (Vite preview base: `/English-Course/#/lesson/41`).
2. Review `lesson41-coverage.md` for every source unit and numbered item, and `lesson41-source-audit.md` for source ambiguities.
3. Review `lesson41-design.md` and `lesson41-visual-verification.md` for the scoped design and actual evidence.
4. Exercise the incomplete-test lock, complete submission, reset/relock, and protected teacher guide.
5. Merge is intentionally left to the repository owner. No PR has been merged and no branch has been deleted.
