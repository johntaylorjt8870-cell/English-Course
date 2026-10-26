# Lesson 44 Rebuild Audit Report — MUST & HAVE TO

## 1. Architectural Scope & Shared-File Isolation
- **Shell**: Lesson 44 (`src/lessons/lesson44/Lesson44.tsx`) mounts directly on the shared `Lesson1Shell` (`src/shared/Lesson1Shell.tsx`) with `rootDataLesson={44}` and `rootDataShell="lesson-1"`.
- **Zero Shared Modifications**: `src/shared/Lesson1Shell.tsx`, `src/shared/SitePasswordGate.tsx`, `src/shared/bidi.tsx`, `src/shared/lessonKit.tsx`, `src/App.tsx`, `src/index.css`, `package.json`, `vite.config.ts`, and Lessons `1`–`43` remain completely untouched.
- **Scoped CSS**: All Lesson 44 styling in `src/lessons/lesson44/lesson44.css` is strictly namespaced under `.obligation44` with offline `.woff2` subsets of `Tajawal` and `Newsreader`.

## 2. Visual Identity — The Obligation Command Center (`مركز قيادة الإلزام والضرورة`)
Lesson 44 introduces an architectural **Obligation Command Center** visual language distinct from Lessons 40–43, built around **6 semantic duty channels** differentiated simultaneously by inline vector iconography (`Glyph44`), border geometry, English formula badge, Arabic semantic tag, and WCAG AA+ contrast (`>= 7.32:1` lowest measured rendered contrast in Chromium):
1. **`must` (`MUST + V1`)**: Scale icon, solid indigo frame (`#1B3488` on `#EEF2FF`).
2. **`haveto` (`HAVE / HAS TO + V1`)**: Clipboard icon, solid emerald-teal frame (`#09594E` on `#EAF8F5`).
3. **`prohibit` (`MUSTN'T + V1`)**: Prohibition ring icon, double-weight crimson border (`#991B1B` on `#FEF2F2`).
4. **`optional` (`DON'T / DOESN'T HAVE TO`)**: Open-choice dashed circle icon, **dashed** violet border (`#5521B5` on `#F5F3FF`).
5. **`past` (`HAD TO / DIDN'T HAVE TO`)**: Rewind icon, **dotted** amber-bronze border (`#7A3E06` on `#FEF7EC`).
6. **`future` (`WILL / WON'T HAVE TO`)**: Forward icon, deep sky border (`#0B4A6F` on `#EFF8FF`).

## 3. Source Fidelity & Student-Copy Hygiene
- **39 Sections Preserved (`cover` + `s01`–`s38`)**: All `762` student-facing curriculum lines in `source44.ts` map `1:1` to rendered `data-source-unit` anchors across all 39 steps (`0`–`38`), verified automatically by `audit-lesson44-dom.mjs`.
- **49 Teacher Space Lines (`@@35`)**: Stored in `src/lessons/lesson44/teacherSource44.ts` and lazy-loaded exclusively inside `TeacherGuide44.tsx`.
- **Zero Student Provenance Leaks**: Every rendered student snapshot passes `auditRenderedStudentCopy` (`scripts/lib/student-copy-audit.mjs`) with zero raw source dumps, zero `<details>`/`<summary>` source toggles, and zero technical provenance labels (`source`, `ledger`, `Source key:`, filenames, `§N`, `القسم N`).

## 4. Assessment Answer Protection & Honest Technical Disclosure
- **`testData44.ts`**: Contains ONLY the 25 questions, options, inline dialogue prompts (`Q21`–`Q25`), and field labels (including two-field `Q9`: `الفعل المساعد` + `الصيغة`). Zero answer keys, hints, or explanations exist in `testData44.ts` or in the pre-submit DOM.
- **Lazy Client-Side Grading (`testKey44.ts`)**: `TestArea44.tsx` dynamically imports `./testKey44` (`await import("./testKey44")`) **only** when all 25 questions are answered and submitted, emitting a separate Vite bundle chunk (`dist/assets/testKey44-*.js`).
- **Flexible Equivalence Grading**: Accepts contracted and uncontracted forms (`mustn't` / `must not`, `doesn't have to` / `does not have to`, `didn't have to` / `did not have to`, `won't have to` / `will not have to`), blank-only and full-sentence answers, `Q9` split or combined answers, and bilingual conceptual explanations on `Q16`–`Q20`.
- **Teacher Gate (`somer173`)**: Reuses the established client-side password convention (`somer173`) to lazy-load `TeacherGuide44.tsx`.
- **Honest Security Scope**: Both dynamic chunk separation (`testKey44.ts` / `SolutionsArea44.tsx`) and the client-side teacher password gate (`TeacherArea44.tsx`) are pedagogical client-side UI boundaries in a static Vite SPA—they prevent pre-submit DOM/UI spoilers for learners, not server-side cryptographic access control.

## 5. Executed Verification Suite
| Check | Command | Outcome |
| --- | --- | --- |
| TypeScript (`strict`) | `npx tsc --noEmit ... src/lessons/lesson44/*.{ts,tsx}` | Passed (`0` errors) |
| Production Build | `npm run build` | Passed (`TestArea44`, `testKey44`, `SolutionsArea44`, `TeacherArea44`, `TeacherGuide44` emitted as separate lazy chunks) |
| Lesson 44 Static & Scope Audit | `npm run audit:lesson44` | Passed (`59` assertions) |
| Lesson 44 DOM, Copy, BIDI & Answer-Hiding Audit | `npm run audit:lesson44-dom` | Passed (`3,357` assertions across `49` snapshots; `762` student + `49` teacher units; `0` BIDI violations) |
| English Direction & Flag Audit | `npm run check:english-direction` | Passed (`1,701` assertions + `59/59` BIDI rendering tests) |
| Lesson Navigation Hub Audit | `npm run audit:lesson-navigation` | Passed (`176/176` assertions) |
| Lesson 44 Mixed BIDI Crawler | `ONLY=44 node scripts/audit-bidi-mixed.mjs` | Passed (`L44: 0` classic, `0` `alts`) |
| Real-Chromium Multi-Viewport QA | `node scripts/audit-lesson44-browser.mjs` | Passed (`122/122` checks across `1440×900`, `1280×800`, `768×900`, `375×812`; `0` overflow; `0` pill/lock overlap; `7.32:1` min contrast) |
