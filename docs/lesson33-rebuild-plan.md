# Lesson 33 rebuild — change plan (written before implementation)

Branch: `arena/dff41d64-english-course` · base `b28ea44` (`main`) · target `main` · PR stays open, unmerged.

## 1. State verified before touching any file

| Check | Result |
|---|---|
| Working tree | clean, on `arena/dff41d64-english-course`, HEAD `b28ea44` (merge of PR #78) |
| Lesson 33 today | already exists: `src/lessons/lesson33/` = 10 files (Lesson33 / Steps33 / TestArea33 / TeacherArea33 / kit33 / data / ledger33 / teacherData / testData / lesson33.css) |
| Source used by the current build | **a different revision** of Lesson 33. Its ledger holds `Nora works in the library every day.`, `Emma usually study English in the evening.`, `Rana is working in a restaurant this summer.`, `I have been building this model for a week.` — none of these appear in the material supplied for this rebuild (`Nora works in a library.`, `Emma usually is walking to university…`, `He is working in a restaurant this summer.`, `I have been building a model for three hours.`) |
| Conclusion | this is a genuine content + visual rebuild, not a re-skin: the supplied text becomes the authoritative ledger |
| `npm install` / `npm run build` | clean (build ✓ in ~9 s) |
| Baseline audits (before my change) | `audit-lesson33` ✓ 365 · `audit-lesson41` ✓ 891 · `audit-lesson41-dom` ✓ 4282 · `audit-final-test` ✓ 1253 · `audit-final-test-coverage` ✓ 633 · `audit-lesson-navigation` ✓ 176 · `check:english-direction` ✓ 1701 — **already failing before this PR:** `audit-source-reveal` (1/63, `lesson38/Steps38.tsx` `<details>`), `audit-bidi-mixed` (3 strict, all Lesson 38), `audit-navigation-lock-overlap` (Lesson 39 tab buttons missing) |

## 2. Registration / shared-contract inventory (must keep working, must not be edited)

Lesson 33 is wired into four shared surfaces. They are **contracts**, so the rebuild keeps every hook they read:

| Shared file | What it requires from Lesson 33 | Kept by |
|---|---|---|
| `src/App.tsx` | `import Lesson33`, `route === 33`, hub card `n: 33` + `href: "#/lesson/33"` | unchanged route/href; card `stats`/`emoji`/`grad` corrected to the rebuilt lesson (Lesson 41 precedent) |
| `src/shared/finalTest.tsx` + `finalTestBank.ts` | `<FinalTest lesson={33} questions={FINAL_TESTS[33]}>` on the last slide, `<FinalTestAnswerKey lesson={33}>` inside the teacher area, gate `index === SLIDE_COUNT_33 - 1` | both mounts kept, `SLIDE_COUNT_33` name kept, bank **not** modified |
| `src/shared/LessonStepNav.tsx` + `SitePasswordGate.tsx` | `LessonStepNav` in `Lesson33.tsx`, exactly one visible `[data-site-lock-button]` per area, no hidden `[data-site-lock-host]`, `.l33-fab` not `position:absolute`, `.l33-chip` shows the step number, `.l33-fab-next` advances, `.l33-tab` × 4 with labels `خطوات الدرس / منطقة الاختبار / منطقة الحلول / منطقة المعلم`, `[data-solutions-locked='true']`, `#l33-teacher-pw` + text `كلمة مرور المعلم`, root class `.lesson33` | all class names, labels and ids preserved |
| `scripts/check-english-direction.mjs` | `src/lessons/lesson33/data.ts` must exist, no per-token `split(/(\s+)/)` | `data.ts` kept as a re-export module |

Consequence: the four-area shell (lesson / test / solutions / teacher) stays. The rebuild changes the **visual identity and the content layer**, not the platform hooks.

## 3. Design decision

Adopt the **Lesson 1 / Lesson 41 platform identity** — `bg-[#f4f6fb]` canvas, white `rounded-[2rem]` slide cards, Changa `.font-head` titles, Fredoka `.font-en` English, drifting mascot, `pop` staging, floating pill step navigation, right-hand station rail — and drop the dark navy "PRESENT LAB" stylesheet look.

Lesson-33-specific identity on top of it: **«مختبر أزمنة الحاضر الأربعة» (THE FOUR-PRESENT LAB)** — one fixed colour lens per tense, reused everywhere (cards, tables, chips, test levels, story highlights):

| Tense | Lens | Colour family |
|---|---|---|
| Present Simple | 🔁 العادة | `sky` |
| Present Continuous | ▶️ النشاط الجاري | `amber` |
| Present Perfect | ✅ الإنجاز | `emerald` |
| Present Perfect Continuous | ⏳ النشاط الممتد | `violet` |

Lesson 41 uses sky/orange/emerald for BE/DO/HAVE and violet as its single interaction accent, so the four-lens system is visually distinct from it while sharing the same primitives and surfaces.

## 4. Architecture (mirrors Lesson 41's module split, namespaced `33`)

```
src/lessons/lesson33/
  source33.ts      verbatim supplied text, @@-delimited (26 blocks)
  ledger33.ts      SOURCE_SECTIONS_33 / unit counts / accessors / SOURCE_CORRECTIONS_33
  slides33.ts      SLIDES_33 + STATIONS_33 (each slide = explicit [from,to] range of source units)
  coverage33.ts    coveredIndexes33 / uncoveredUnits33 / COVERAGE_33
  design33.tsx     En33 Text33 Frame33 SourceLines33 NumberCards33 Note33 Tip33 Panel33 TenseCard33 …
  kit33.tsx        interactive labs (comparison, sorting, detective, story, writing, …)
  practice33.ts    attempt-gated keys for §12 §13 §14 §17 §18 §19
  testData33.ts    25 questions / 5 levels — NO answers, NO reasons
  key33.ts         LAZY: SOLUTIONS_33 (answer/accept/keywords/tense/reason/alternatives) + grade33
  TestArea33.tsx   lesson Master Test, submit only at the end of level 5
  SolutionsArea33.tsx  LAZY: 25 detailed solutions, rendered only after submission
  TeacherArea33.tsx    somer173 gate (#l33-teacher-pw) + FinalTestAnswerKey
  TeacherGuide33.tsx   LAZY: teacher-only source index, keys, rubrics, correction register
  teacherData33.ts     teacher-only data
  Lesson33.tsx         shell (4 areas, station rail, LessonStepNav, FinalTest on last slide)
  lesson33.css         minimal light-identity CSS for the contract class names
  data.ts              re-exports (required by check-english-direction)
```

Answer-key isolation follows the Lesson 41 mechanism exactly: `testData33.ts` carries no key fields, `key33.ts` is reached through `await import("./key33")` at submission only, `SolutionsArea33.tsx` and `TeacherGuide33.tsx` are `lazy()` chunks, and the audit asserts three separate chunks are emitted and that the entry chunk contains no key text. The teacher gate is a **client-side educational gate** and is described as such — not as server-side protection.

## 5. Scope guard

Only these paths change: `src/lessons/lesson33/**`, `scripts/audit-lesson33.mjs`, a new `scripts/audit-lesson33-browser.mjs`, `docs/lesson33*`, `docs/navigation-fix-visual/**` (regenerated artifact), `src/App.tsx` (lesson-33 card values only) and `package.json` (one new `audit:lesson33-browser` script). No other lesson folder, no shared component, no question bank, no shared audit assertion is touched or weakened.
