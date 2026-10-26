# Lesson 40 — Source Audit, Grammatical Nuance & Architecture Notes

## 1. Canonical Source Integrity

- `src/lessons/lesson40/ledger40.ts` holds the verbatim supplied Lesson 40 Arabic-English curriculum text (`cover` + `§1` through `§29`, including `revealUnits` for `§§17, 19, 20, 21, 23` and all 64 units of `§26`) and remains **byte-for-byte untouched** (`git diff HEAD -- src/lessons/lesson40/ledger40.ts` is empty).
- `src/lessons/lesson40/studentLedger40.ts` holds the browser-safe student projection (identical except `§26` is capped to its two introductory lines) and also remains untouched.
- The three whitespace-flattened tables in the supplied text (`§3` Golden Table, `§9` Adam 3-Way Comparison Table, and `§15` `write` Formation Table) are rendered as accessible HTML `<table>` structures preserving every cell word-for-word.
- Student-facing UI contains **zero** "show literal source text" disclosures and **zero** editorial provenance labels (`مصدر`, `المصدر`, `source section`, `§N`, filenames), verified automatically across all 54 rendered steps, `TestArea40`, and `SolutionsArea40` via `findEditorialSourceLabels`.

## 2. Grammatical Accuracy & Anti-Mechanical Controls

All subtle grammatical distinctions required for mastery are explicitly preserved and reinforced in the interactive labs and grading rules:

1. **Six Curriculum Stations vs Five Grammatical Forms (`cover`, `§3`)**: Lessons 34–39 span six stations because Lesson 36 compares `WILL` and `BE GOING TO`; structurally, students master five principal future forms.
2. **Natural Overlap Between `WILL` and `BE GOING TO` (`§5`, `§22`)**: Spontaneous offers/promises (`WILL`) and prior plans/visible evidence (`BE GOING TO`) have clear prototypes, while general predictions (`think` / `expect`) naturally allow overlap depending on speaker perspective.
3. **`Future Perfect Continuous` vs Unfinished Work (`§9`, `§10`)**: `By 8:00, Adam will have been working for four hours` highlights the **four-hour duration** leading up to 8:00; the tense itself does **not** assert that the project remains unfinished after 8:00 (Adam finishes at 8:00 in the scenario).
4. **Time Signals Help Rather Than Mechanically Dictate (`§11`, `§22`, Exam Q8/Q9/Q19)**: `by Friday` can pair with `will have finished` (completion by deadline) or `will finish` (act occurring before deadline); `for ten years` can pair with `will have been working` (ongoing duration emphasis) or `will have worked` (completed tenure milestone).
5. **Stative Verb Constraint (`§14`)**: `know` in its stative acquaintance sense takes `Future Perfect` (`I will have known her for ten years`), never `*will have been knowing`.
6. **Future Time Clauses vs Direct `When` Questions (`§12`, Exam Q7/Q14/Q20)**: Dependent future time clauses after `when`, `before`, `after`, `as soon as`, `until`, and `by the time` take `Present Simple` (`When you arrive`), whereas direct `wh-` questions about the future take `will` (`When will you arrive?`).

## 3. Assessment Isolation & Honest Client-Side Security Boundary

- `TestArea40.tsx` and `testData40.ts` contain **only** question prompts and options (`s25[0–64]`) with zero static imports of `testKey40.ts`, `solutionsData40.ts`, or `ledger40.ts`.
- Pre-submission DOM, attributes, CSS classes, and console output expose **zero** correct answers, explanations, or correctness hints.
- Upon clicking `تسليم الاختبار النهائي`, the student's draft is frozen (`Object.freeze`) and inputs become `disabled`; `testKey40.ts` is dynamically imported to evaluate the **20 objective items** (accepting contractions, British/American spelling `travelling`/`traveling`, and contextually valid alternatives) while routing the **5 Level-4 conceptual meaning questions (`Q16–20`)** to self/teacher semantic review (`لا تُرفض آليًا`). Starting a new attempt clears the frozen snapshot and re-locks the Solutions tab.
- **Security Note**: Because this repository deploys as a static client-side Vite SPA (GitHub Pages), lazy chunk splitting (`testKey40`, `solutionsData40`, `SolutionsArea40`, `TeacherGuide40`, `ledger40`) and the Teacher Space password gate (`somer173`) provide clean UX and bundle separation so learners do not accidentally see answers, **not** a cryptographic or server-side authorization boundary against someone inspecting static assets in DevTools.
