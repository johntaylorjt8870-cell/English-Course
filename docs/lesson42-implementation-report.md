# Lesson 42 — implementation and verification report

**Lesson:** 42 — CAN & COULD: Ability, Possibility, Permission & Polite Requests
**Branch:** `arena/798e32bc-english-course`
**Status:** rebuilt on the original Lesson 1 / Lesson 41 visual identity. No open Lesson 42 PR existed when this work started, so this branch and its PR are new; nothing was discarded or duplicated.

---

## 1. What was rebuilt

The previous Lesson 42 (PR #54, merged 2026-10-16) shipped a **separate "Language Control Lab" identity** — its own `lesson42.css` with `.station42` / `.masthead42` / `.token42` / `.panel42` classes. That contradicts the requirement to match Lessons 1–3 and Lesson 41, so it was removed:

| Removed | Replaced by |
|---|---|
| `lesson42.css` (270 lines) | shared `src/index.css`, no lesson stylesheet |
| `Steps42.tsx` (231 lines) | `design42.tsx` + `Lesson42.tsx` slide renderer |
| `labs42.tsx` (356 lines) | `kit42.tsx` labs on the shared primitives |
| `tools42.tsx` (195 lines) | `kit42.tsx` |
| `practiceData42.ts`, `practiceNotes42.ts`, `solutionsData42.ts` | `practice42.ts`, `key42.ts` |

New module set (16 files) mirrors Lesson 41 1:1: `source42.ts`, `teacherSource42.ts`, `ledger42.ts`, `design42.tsx`, `practice42.ts`, `testData42.ts`, `key42.ts`, `slides42.ts`, `kit42.tsx`, `TestArea42.tsx`, `SolutionsArea42.tsx`, `TeacherArea42.tsx`, `TeacherGuide42.tsx`, `Lesson42.tsx`, `coverage42.ts`, `data.ts`.

`scripts/audit-lesson42.mjs` asserts the shell class string and the floating step-pill markup are **byte-identical to the Lesson 41 rebuild**, and that the hub-card gradient equals Lesson 1's and Lesson 41's.

## 2. Source coverage

- **45 source blocks** (cover + §§1–44), **932 normalized units**, **0 uncovered**.
- **144 slides** across **10 learning stations**; **46 practice items**; **25 final-test questions** in **5 levels**.
- Frozen inventory `docs/lesson42-source-manifest.json` is **unchanged from `origin/main`**, and every one of the 45 section SHA-256 hashes still matches it. No teaching point, example, table, dialogue, key or writing requirement was rewritten, summarized or dropped.
- Tables in §§5, 16 and 19 render as real `<table>` rows.

### Documented changes from the supplied source (all technical, none educational)

1. **§41 moved to `teacherSource42.ts`.** §41 of the supplied document *is* the final-test answer key. Because `ledger42.ts` → `source42.ts` is statically imported by the student bundle, leaving §41 there shipped the complete key inside `dist/assets/index-*.js`. Verified both ways: a baseline build of `HEAD` **contains** §41's reason strings; the current build **does not**. Reassembly of the two files reproduces the original byte-for-byte (all 45 hashes match).
2. **35 slide `range` upper bounds corrected.** Thirty-five slides declared an inclusive upper bound one past the end of their section (e.g. `[14, 19]` for a 19-line section). `sectionLines42` slices `range[1] + 1`, so the phantom index rendered nothing and no content was lost, but the ranges were arithmetically wrong and inflated the coverage table to `19 / 18`. Two of them (`s28-rule`, `next-close`) pointed *only* at a phantom index and now render their intended real unit.
3. **§39 passage slice narrowed.** `slice(1, 16)` pulled line 15 («أسئلة الفهم», an Arabic heading) into the LTR English passage. Now `slice(1, 8)` + `slice(8, 15)` across two slides.
4. **Ten over-tall slides split, not compressed** (see §4).

No source section was renumbered and no original section label was changed.

## 3. Final test and Teacher Area isolation

- **25 questions / 5 levels**: MCQ (1–5), fill-in (6–10), error correction (11–15), meaning & context (16–20), IQ200 dialogue (21–25). Q7 keeps its two blanks.
- `testData42.ts` (student) contains **no** `SOLUTIONS_42`, `reason:`, `accept:`, `keywords:` or `function:` field.
- `key42.ts` is loaded **only** through `await import("./key42")` inside `TestArea42.handleSubmit`, guarded by `if (!complete || submitted) return;`. The one other reference is `import type { Graded42 }`, which the bundler erases.
- `SolutionsArea42` and `TeacherGuide42` are `lazy(...)`; the guide mounts only after `password.trim() === "somer173"`.
- Built evidence: `dist/assets/` emits `key42-*.js`, `SolutionsArea42-*.js` and `TeacherGuide42-*.js` as **separate** chunks, and five §41-unique strings are **absent** from `dist/assets/index-*.js`.

**Protection model, stated plainly:** this is a **client-side** separation, not server-side security. Anyone who can read the built bundle can read the keys. The teacher gate says exactly that in the UI, in both its locked and unlocked states (previously the note appeared only while locked).

## 4. Slide-height work

The first browser run found 10 slides above the 1200px card target that Lesson 41 meets (its tallest is 1140px). Per the "split rather than compress" requirement, they were split — content preserved in full:

| Was | Height | Now |
|---|---:|---|
| `lab-build` (4 tasks) | 1630px | `lab-build-1` / `lab-build-2` |
| `lab-adventure` (7 rows) | 1611px | `lab-adventure-1` / `-2` |
| `lab-repair` (4 tasks) | 1602px | `lab-repair-1` / `-2` |
| `p38-1` (4 two-field items) | 1417px | `p38-1` [1,2] / `p38-2` [3,4] |
| `test-l5-a` / `-b` | 1417 / 1338px | `test-l5-a` / `-b` / `-c` |
| `lab-able` (6 rows) | 1254px | `lab-able-1` / `-2` |
| `write-criteria` | 1239px | `write-criteria` (source list) + `write-checklist` (interactive tracker) |
| `lab-time` (5 rows) | 1223px | `lab-time-1` / `-2` |
| `read-passage` (14 lines) | 1220px | `read-passage-1` / `-2` |

Slide count went **135 → 144**; labs **12 → 17**; hub-card stats updated to match. Coverage stayed at **0 uncovered units** and the audit's "each unit shown once" check caught (and I fixed) a duplicate introduced by the `write-criteria` split.

## 5. Defects found and fixed in my own rebuild

| Defect | Evidence | Fix |
|---|---|---|
| WH word-order lab could **never** accept a correct answer — tokens carry no `?` but `task.answer` does | `node -e` reproduction: `"What can you do" === "What can you do?"` → `false` | normalise the trailing `?` on both sides; DOM audit now asserts `✓ صحيح` appears and `✕ راجع` does not |
| 47 BIDI strict violations (Lesson 42 is in the audit's strict set) | `ONLY=42 node scripts/audit-bidi-mixed.mjs` | `Text42`/`LatinRuns` isolation in the header, rail, `Panel42` title and section label; non-separator bullets in chrome; `basis-full` on the test counter |
| Teacher-gate security note only rendered while locked | reading `TeacherArea42.tsx` | hoisted into `SecurityNote42`, rendered in both states |
| 35 off-by-one slide ranges, 2 of them rendering nothing | coverage row `19 / 18` | bounds corrected |
| §39 Arabic heading inside the LTR passage | source line map | slice narrowed |

Audit-harness defects were also corrected **without weakening assertions**: the browser script probed `input[type="radio"]` where `PracticeCard42` renders `aria-pressed` buttons, and probed the string `الإجابة الصحيحة`, which is the *source level heading*, not a key marker — replaced with the markers only the graded key can produce (`شرح المنصة`, `سبب §41 كما ورد في المصدر`, `الوظيفة النحوية المختبَرة`, `[data-solution-id]`).

`scripts/audit-final-test.mjs` also still asserted the removed Lesson 42 conventions (`"id": "q1"` quoted keys); its Lesson 42 block was aligned with the Lesson 41 block, which is the repo's current convention. That took it from 2 failures to **1253 checks passed**.

## 6. Verification — commands and actual results

| Command | Result |
|---|---|
| `node scripts/audit-lesson42.mjs` | **passed: 1669 assertions** · 45 sections · 932 units · 144 slides · 46 practice · 25 Q / 5 levels · authored sheet 25/25 |
| `node scripts/audit-lesson42-dom.mjs` | **passed: 6260 assertions** · 144 slides navigated · practice gating, pair blanks, lab builder, WH lab, writing counter, test submit/reset, reading cards, teacher gate, 12 BIDI cases |
| `npx tsc --noEmit --strict … src/App.tsx` | **186 errors — identical to the recorded baseline**, 0 in lesson42/lesson41/App.tsx, `diff` vs baseline empty |
| `npm run build` | **✓ built in 8.16s**; `key42`, `SolutionsArea42`, `TeacherGuide42` emitted as separate lazy chunks |
| §41 leak check on `dist/assets/index-*.js` | **all 5 probe strings absent** |
| `node scripts/audit-final-test.mjs` | **✓ 1253 checks** |
| `node scripts/audit-final-test-coverage.mjs` | **✓ 633 checks** |
| `node scripts/audit-bidi-mixed.mjs` (full repo) | **3 strict violations, all Lesson 38 — identical to baseline**; Lesson 42 = 0 |
| `node scripts/audit-navigation-lock-overlap.mjs` | **101 passed / 5 failed — identical to baseline**; Lesson 42 appears in neither list |
| `node scripts/audit-lesson-navigation.mjs` | **176 passed / 0 failed** |
| `node scripts/audit-source-reveal.mjs` | **FAILED (1/63) — identical to baseline** (`<details>/<summary>` in `lesson38/Steps38.tsx`) |
| `node scripts/lesson42-coverage-doc.mjs` | `docs/lesson42-coverage.md`: 45 sections · 932 units · 144 slides · uncovered 0 · **manifest matches** |
| frozen-manifest hash check | **45/45 sections match, 932 units, 0 mismatches** |

### Pre-existing failures (not regressions)

All four remaining failures exist at the recorded baseline and none involve Lesson 42:

1. `audit-source-reveal.mjs` — 1/63, `lesson38/Steps38.tsx`.
2. `audit-bidi-mixed.mjs` — 3 strict, all `button.fp38-stepnav-item`.
3. `audit-navigation-lock-overlap.mjs` — 5, Lessons 38–39.
4. `tsc --strict` — 186 errors, 153 of them in `lesson21`.

One structural note: `audit-lesson41.mjs`, `audit-lesson43.mjs` and `audit-lesson44.mjs` each end with a **scope guard** that fails when the working tree contains another lesson's in-flight work. Running the `audit:english-direction` chain therefore stops at Lesson 41's guard while Lesson 42 changes are uncommitted. That is inherent to how those guards are written, not a Lesson 42 defect; every one of those lessons' *content* assertions passes before the guard runs, and each was run individually above.

## 7. Browser verification

`scripts/audit-lesson42-browser.mjs` drives real Chromium (`playwright-core` + `@sparticuz/chromium`) against the Vite dev server at `http://127.0.0.1:5173/English-Course/#/lesson/42`, at **1280×800** and **1920×1080**. It walks every slide, measures contrast from **computed** colours with an `oklch`-aware resolver, checks element geometry for overlap, exercises keyboard navigation, typing, practice gating, labs, reading, the final test and the teacher gate, and asserts the lazy chunks are not requested before submission/unlock.

Results are recorded in §8 below.

## 8. Browser results

_(filled in from the run that follows the slide-height fixes)_

## 9. Limitations

- **Fonts:** the sandbox cannot reach `fonts.googleapis.com`, so Chromium falls back to system fonts. Every console error observed is that single blocked request, which the harness filters by URL. Typography *families* are therefore not visually confirmed; layout, spacing, colour and geometry are.
- **Client-side gating only** — see §3.
- The `tsc` baseline of 186 errors is pre-existing and out of scope; it was used as a regression yardstick, not fixed.
