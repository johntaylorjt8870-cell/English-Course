# Lesson 36 — rebuild plan, design, and verification

Lesson: **36 — WILL vs BE GOING TO** (`#/lesson/36`), level *تأسيسي متقدم — IQ200*.
Scope of this rebuild: the lesson folder `src/lessons/lesson36/`, one new audit script, and the Lesson 36 documents. No shared file, other lesson, or app-wide rule is modified.

## 1. Architecture

- `Lesson36.tsx` renders the real `src/shared/Lesson1Shell.tsx` (`rootDataShell="lesson-1"`), the same shell Lessons 1 and 35 use. Rail, mobile drawer, progress header, floating prev/next, and the site-lock slot all come from the shared component; there is no local shell, rail, or duplicate navigation inside `lesson36/`.
- Content model: `ledger36.ts` (verbatim source, answer/analysis lines as `revealUnits`, reconstructed table rows) → `content36.ts` (`U()`/`K()` refs, block types, `refsOfSlide`, `textOf`) → `deckA36.ts`/`deckB36.ts`/`deckC36.ts` (36 short steps) → `deck36.ts` (assembled deck, 10 stages, `deckCoverage36()`/`revealCoverage36()` proof).
- Rendering: `Steps36.tsx` (block renderer, direction-safe text) + `labs36.tsx` (ten interactive laboratories) + `kit36.tsx` (presentation kit on the shared design system).
- Assessment: `testData36.ts` (the 25 supplied questions) → `TestArea36.tsx` (gated UI) → dynamic `import("./solutionsData36")` + `import("./grading36")` only on submit. `SolutionsArea36.tsx` and `TeacherArea36.tsx`/`TeacherGuide36.tsx` are separate `lazy()` chunks.

## 2. Source fidelity

- Every learner-facing line of the supplied lesson is transcribed once into `ledger36.ts`: the unnumbered opening plus numbered sections 1–26 (27 ledger sections in total). Nothing is paraphrased except where the source is a heading plus a promise with no body (§23), and that gap is documented verbatim below and in `docs/lesson36-coverage.md`.
- Section order, section identity, and every sub-item order are preserved. Dense sections are split into consecutive steps (`s04a`/`s04b`, `s05a`/`s05b`, `s09a`/`s09b`, `s11a`/`s11b`, `s14a`/`s14b`, `s21a`/`s21b`, `s25a`/`s25b`) but never reordered.
- The audit compares the rendered DOM of all 36 steps, plus every lab in its post-attempt state, against the ledger line by line. Inline blanks (`Sara: … ______ (visit) …`) are verified as prompt segments around the live input, because the input splits the string in the DOM.

## 3. Corrections and gaps log

| Item | Supplied source | What the rebuild did | Why |
|---|---|---|---|
| Section 3 table | Table syntax is malformed; two headers and eight category/form pairs are recoverable | Rendered as one semantic `<table>` with `scope="col"` headers and `scope="row"` categories, exactly eight rows, no invented rows | The only faithful reading of the malformed block; adding rows would invent teaching |
| Section 23 key | Heading `مفتاح تصحيح الاختبار النهائي — الدرس 36`, one instruction, and `عرض الحلول التفصيلية`; **no answers** | 25 platform-authored solutions in `solutionsData36.ts`, each with answer, explanation, judgment type, and alternatives; gated behind submission/teacher password | The source promises detailed solutions it does not contain; leaving it empty would break the promise |
| Section 23 wording | No statement that the key is platform-authored | Key module header and the teacher guide state it; student copy does not show provenance labels | Provenance stays internal, per `LESSON_WORKFLOW.md` |
| `&amp;` in the title | `Mastering Future Decisions &amp; Predictions` | Rendered as a literal `&` | The entity is an artifact of the prompt, not teaching content |
| Overlap statements (§7, §15, §17 ⑧) | Source explicitly keeps both forms grammatical in evidence contexts | Labs accept alternatives and say "الدليل يرجّح، ولا يمنع"; no single-answer enforcement | The user's rule: never force one right answer where both forms are valid |
| `She is going to travel.` in the bundle | This sentence also exists in Lesson 35 | Bundle search for Lesson 36 keys excludes that string and instead checks Lesson 36-specific markers | It is Lesson 35's own teaching line, not a Lesson 36 key leak |

No source wording was silently corrected. The only editorial change is the punctuation of dialogue speaker labels: the source writes `Lina: Oh no! …`, which the dialogue renderer displays as a speaker chip plus the body; the chip renders `Lina:` so the rendered text still contains the source string.

## 4. Learning design and interactions

36 steps in 10 stages (الانطلاق، السؤال الذهبي والخريطة، القرار مقابل الخطة، التوقع والدليل، الوعود والأسئلة، البناء والصيغ، الحوار والتداخل، المختبرات والتدريب، القراءة والتقييم، الكتابة والختام). Every step shows its stage and position; the cover carries the lesson `h1`, every other step an `h2`.

| Interaction | Step | What the learner does | Feedback |
|---|---|---|---|
| Decision laboratory (`cook`, `study`) | `s05a`, `s05b` | Chooses "قرار لحظي" or "خطة مسبقة" for each situation | After checking: the supplied explanation, not colour alone |
| Prediction lens | `s07` | Switches between the belief lens and the evidence lens, then answers one comparison question | Explains that evidence favours *going to* without banning *will* |
| Context laboratory (`travel`, four situations) | `s16` | Picks the form **and** writes a one-sentence reason before checking | Source explanation plus the nuance line |
| Grammar Detective | `s17` | Repairs all ten supplied error sentences in a text field | Source corrections, alternatives, and the glass nuance appear only after the attempt; typo-tolerant comparison |
| Guided choice practice | `s18` | Chooses WILL / BE GOING TO for eight contexts | Source answer plus the supplied label |
| Sara / Adam dialogue completion | `s19` | Fills four blanks inline | Matched-answer status, answer form and explanation; alternatives accepted |
| Context writing | `s20` | Writes one sentence for each of the two meanings before seeing the models | Both source model contexts, then a non-judging prompt |
| Reading challenge | `s21a`/`s21b` | Reads the LTR passage, optionally highlights future forms, answers seven questions | Seven answers plus eight grammar analyses after all seven attempts |
| Writing Mission | `s24` | Writes 12–15 sentences with an eight-item self-review checklist and a live sentence counter | Model opening, non-judging feedback (no automated grade) |
| Formal Master Test | test area | 25 questions in the original five levels | Nothing before submit; full feedback after submit; retry clears everything |

Keyboard: native inputs and buttons throughout, visible `focus-visible` ring, shell-level arrows/space/Home/End, Escape closes panels and the mobile drawer.
Screen readers: `fieldset`/`legend`, labelled inputs, `role="status"`/`aria-live` feedback, `aria-pressed` toggles, progress bars with `aria-valuenow`, no colour-only status (every state also has an icon and text).

## 5. Direction and student copy

- The shell is `dir="rtl"`; English is isolated with the shared `En` component (`dir="ltr" lang="en"`) and, for mixed Arabic lines, a run-level isolator (`dir="ltr" lang="en"`, `unicode-bidi: isolate`) that preserves every source character including the spaces around the Latin run.
- Arabic-only lines are never forced into an LTR island, so punctuation and numbers keep their source order.
- No `direction: rtl !important` or bidi override is injected by the lesson.
- Student-visible copy contains no `Source`, `source section`, `§N`, `القسم N`, `ledger`, or file names; the audit runs the shared `findEditorialSourceLabels` helper over the rendered lesson, test, and solutions surfaces.

## 6. Answer-key separation

- `TestArea36.tsx` has no static import of the key or of the grader; both are fetched only inside `submit()`.
- `SolutionsArea36`/`TeacherArea36` are `lazy()` routes; the solutions entry is `aria-disabled` until the test is submitted or the teacher password is entered.
- The production build emits `solutionsData36-*.js` as its own chunk. The entry chunk and the test chunk contain no key markers. The browser audit asserts, over the real network responses, that the key chunk is **not** requested before submission and **is** requested after it.
- Teacher password: `somer173` (`TEACHER_PASSWORD_36`), the project's existing teacher password.
- **Evidence hygiene:** the Q22 model answer is used inside the audit only as an in-memory sentinel. `docs/lesson36-rebuild-visual/verification.json` stores booleans and non-answer metadata (which stage requested the key chunk, whether the sentinel appeared in loaded JavaScript) and never the answer text, a sample solution, the key module marker, or the teacher password. The audit re-reads the file it just wrote and fails if any of those values appear; a mutation test (temporarily adding the answer to the summary) makes exactly that assertion fail.

## 7. Test results (all commands run in this branch)

| Command | Result |
|---|---|
| `npm run build` | PASS; `index-*.js` ≈ 5.98 MB (pre-existing large-bundle warning), plus `TestArea36-*`, `SolutionsArea36-*`, `solutionsData36-*`, `TeacherArea36-*`, `TeacherGuide36-*` chunks |
| `npm run audit:lesson36` | PASS — 795 assertions |
| `npm run check:english-direction` | PASS — 1,701 direction assertions across 44 lessons + 59 BIDI rendering assertions |
| `npm run audit:lesson-navigation` | PASS — 176 checks, 0 failed |
| `node scripts/audit-final-test.mjs` | 1,248 / 1,253; the same 5 Lesson 35 failures exist on `main` (see below) |
| `node scripts/audit-final-test-coverage.mjs` | 630 / 633; the same 3 Lesson 35 failures exist on `main` |
| `npm run audit:lesson36-browser` (new) | PASS — 94 / 94 across 1920×1080, 1280×800, 768×900, 375×812 |

Note: `npm run audit:final-test` and `npm run audit:final-test-coverage` are not registered as npm scripts in this repository; the scripts were run directly. Their failures are byte-identical on a clean `main` worktree (`git worktree add /tmp/main-baseline main`), so they are baseline Lesson 35 failures, not regressions, and were not fixed here (out of scope).

## 8. Browser verification

`scripts/audit-lesson36-browser.mjs` drives the built app in Chromium (`@sparticuz/chromium` + `playwright-core`, same setup as the Lesson 35 browser audit) and writes captures plus a sanitised `verification.json` to `docs/lesson36-rebuild-visual/`.

Per viewport (1920×1080, 1280×800, 768×900, 375×812):
- RTL shell, shared canvas colour `rgb(244, 246, 251)`, no horizontal overflow;
- rail present only at ≥1024px and exactly 288px wide; mobile index button only below that;
- centred content ≤ 896px; no clipped headings or paragraphs;
- floating prev/next never overlapping the site-lock button;
- zero WCAG AA contrast failures in the rendered lesson (oklch colours converted to sRGB before measuring);
- keyboard focus visibly ringed on an in-lesson control;
- mobile drawer opens, navigates to a chosen step, and closes.

Flow checks: locked solutions entry does not open the key; the in-page test header reports `0/25` → `25/25`; the submit control lives at the end of the test (not floating over question cards); test renders 25 questions with submit blocked; answering all 25 still reveals nothing; submission shows the objective score and all 25 feedback panels; the key chunk is fetched only then; all 25 solutions are reachable through the five level tabs; the teacher password rejects a wrong value and reveals 25 keys + 27 coverage rows; RTL arrows move one step each way; one shared site-lock button; no console errors; no student-visible source labels.

## 9. Limitations

- The teacher password and the gating are client-side; this is code-splitting and UI gating, not server-side secrecy (same model as the other lessons).
- `npx tsc --noEmit` cannot run: the repository has no root `tsconfig.json` (TS5057). Type safety is covered by the Vite/esbuild build plus the runtime audits.
- Levels 4–5 of the test are open-ended by design and are never auto-scored; the platform key gives models and acceptable alternatives.
- Screenshots are Chromium/headless captures; other engines were not exercised.
