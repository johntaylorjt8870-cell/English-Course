# Lesson 34 rebuild — verification report

## Outcome

Lesson 34 was rebuilt as **Future Simple — المستقبل البسيط باستخدام WILL / The Future Starts Here! 🚀** (FUTURE LAUNCHPAD identity), from the complete 39-section source: cover + objectives + sections 1–39 (WILL+V1 rule, all six usages, Shall I…?, contractions, negation, Yes/No + Wh questions, Who-as-subject, 11 time expressions, will vs be going to preliminary, will be, the two dialogues At Home / The School Project, three exercise sets, four IQ200 situations, Reading Challenge "The Unexpected Opportunity" with 7 comprehension questions + answers + grammar analysis, the tense-comparison table, the 25-question five-level Future Simple Master Test, teacher space, Final Boss "My Predictions and Promises" (10–12 sentences, 8 conditions), Golden Summary and the curriculum progress map ending at Lesson 35: BE GOING TO).

All source material is preserved without truncation. The verbatim source lives in `src/lessons/lesson34/ledger34.ts`: **40 source sections = 781 literal text units + 40 section titles** (counted and asserted by the coverage mechanism). Every unit reaches the completed student UI — **zero gaps** — verified unit-by-unit inside `scripts/audit-lesson34.mjs` §3c (see below). Source/coverage mapping and the formatting-delta log are in [`lesson34-coverage.md`](lesson34-coverage.md) and [`lesson34-accuracy-log.md`](lesson34-accuracy-log.md).

The lesson keeps the platform doctrine: route `#/lesson/34` + hub card, shared `LessonStepNav`/`SitePasswordGate` (`somer173`), shared `<FinalTest lesson={34} questions={FINAL_TESTS[34]} accent="bg-violet-700">` at the last step, and the 25-question lesson test in the Test Area with the teacher-locked detailed solutions.

## Source-unit coverage mechanism (the requested count)

`scripts/audit-lesson34.mjs` now embeds the approved coverage mechanism (§3c): each slide is driven to `data-gate-done` by the jsdom interaction walks, then a `gateDone34` hook compares the **completed** slide against its ledger section (gated solutions included), and §6 sweeps the 51 test units against the rendered Test Area. Documented normalizations (diacritics, runtime bidi isolation marks, checklist counters, visual blanks, whitespace serialization of LTR runs, trailing punctuation) and a compositions allowlist (the cover title line is assembled from kicker + h2 + sub; both chunks asserted) are the only accepted deviations — logged precisely in the accuracy log. Result: **781/781 units covered, 40/40 title tails rendered, 0 gaps**.

The teacher space holds the requested **actual detailed solutions** (25 model solutions with causes and grammar structure per question, plus activity solutions): the source's §36 lists only its three gateway lines, so the key is a clearly-labelled **derived** key (`solutionsData34.ts`) following the lesson's own rules — labelled as such in the UI and documented.

## Automated checks

| Check | Result |
|---|---|
| `node scripts/audit-lesson34.mjs` | **PASS — 628 checks, 0 failed.** Includes the 40-section/781-unit ledger contract, no-answer-leak probes, all interaction walks, the 25-question test contract, and the new per-slide source-coverage + Test Area sweep (baseline was 565; +63 coverage checks). |
| `npm run build` | **PASS** (vite, 7.6 s). |
| `npm run audit:lesson-navigation` | **PASS — 176 checks.** Route `#/lesson/34`, hub card, step navigation. |
| `npm run audit:navigation-lock` | **101 passed / 5 failed — all 5 pre-existing** in unchanged Lessons 38/39 (baseline identical; Lesson 34 not among them). |
| `node scripts/audit-source-reveal.mjs` | **1/63 failed — pre-existing** (lesson38 `Steps38.tsx` details/summary). |
| `node scripts/audit-bidi-mixed.mjs` | **3 strict failures — pre-existing** (lesson38 step-nav labels). |
| `node scripts/audit-final-test.mjs` | **PASS — 1,253 checks** (shared FinalTest bank, lesson 34 key intact). |
| `node scripts/audit-final-test-coverage.mjs` | **PASS — 633 checks.** |
| `npm run check:english-direction` | **PASS — 1,701 assertions across 44 lessons; 59/59 BIDI rendering assertions** (after removing scratch files that carried a GB-flag character; none are committed). |
| `git diff --check` | **PASS.** |

## Chromium, viewports and contrast

`node scripts/audit-lesson34-browser.mjs` ran real Chromium at the four required viewports **1920×1080, 1280×800, 768×900, 375×812** (plus 1440×900) — **63 checks, 0 failures** across the test/solutions/teacher flows: exactly one visible site-lock button in the shared nav, no overlap with Next/Previous or the mobile map FAB, RTL shell, no horizontal overflow, mobile map drawer at ≤1023px, 25-question test neutral before submit and graded 25/25 after, solutions gated then rendered (25 items), teacher password `somer173` opens the teacher space, zero console errors. Evidence: [`lesson34-visual/`](lesson34-visual/) (`verification.json` + screenshots).

`node scripts/audit-lesson34-contrast.mjs` (real DOM, every visible text node against its effective background, worst-case gradient stops, AA 4.5:1 / 3:1 large): **7,625 text nodes across 43 screens — 0 failures.** The first run surfaced 1,257 flags; all were fixed in lesson-scoped CSS: ten decorative pseudo-element gradient bars converted to solid phase colours (the audit treats pseudo gradients as the worst-case background of descendant text), one muted-token darkening (4.4:1 → 5.31:1), and a lesson-scoped AA override for the shared Signature WhatsApp pill (white on `#25D366` = 1.98:1 → white on `#0e7a41` = 5.41:1) — no shared component was modified.

## Verification checklist (13)

1. **Route** — `#/lesson/34` renders the rebuilt lesson; hub card registered (`audit:lesson-navigation`, `audit-lesson34.mjs` §10).
2. **Full source coverage** — 40 sections / **781 units** counted by the project's coverage mechanism (§3c) and every unit verified in the completed UI; zero gaps; deltas logged in the accuracy log.
3. **Design conformity** — lesson-1/platform identity: white rounded cards on `#f4f6fb`, Changa/Tajawal/Rubik typography, violet/amber/emerald/rose semantic palette, floating pill step nav, platform `Signature`/`SignatureGhost` present (all `l34-*` hooks retained).
4. **Exercises + solutions** — choice 6, conversions 5, Grammar Detective 10, IQ200 situations 4, Reading Challenge 7 questions — every solution/reason reachable after the attempt (walks + coverage hook).
5. **25-question test + complete key** — five levels exactly as the source (single/typed/spot/write), graded 25/25 for the key, 25 detailed solutions behind the submit gate.
6. **No answer leakage** — static leak probes + `REVEAL_BANNED`/`ANSWER_LEAK` contracts; test neutral until submit; solutions hidden until entitled; disclosure-starts-collapsed checks for every reveal list.
7. **Lesson/routing/lock/nav tests** — 628/0 + 176/0 + lock audit (5 pre-existing elsewhere).
8. **Viewport checks executed** — 1920×1080, 1280×800, 768×900, 375×812 (+1440×900) in real Chromium, 63/0.
9. **Contrast AA** — 7,625 nodes / 43 screens, 0 failures.
10. **No unintended changes to other lessons** — diff confined to `src/lessons/lesson34/**`, its audits, and `docs/lesson34-*`; shared components untouched (the WhatsApp override is scoped under `.l34-app` in `lesson34.css`).
11. **Source-answer integrity** — 29 intentionally-wrong spots preserved verbatim; the derived exam key is labelled derived; no source text fabricated (three inventory errors in the earlier coverage doc corrected against the ledger).
12. **Documentation** — `lesson34-coverage.md` (mechanism + counts + step table), `lesson34-accuracy-log.md` (formatting deltas), this report.
13. **PR** — opened from `arena/785bec18-english-course` against `main`, left **open and unmerged**.

## Source accuracy and scope notes

- The cover's two intro sentences are restored verbatim (a merged render had dropped the second sentence's opening); the 🚀 of "The Future Starts Here! 🚀" and the English subtitles of sections 7 and 14 are restored — all previously silent losses are listed in the accuracy log.
- The source's §36 teacher space contains only gateway lines; the detailed key is derived and labelled (documented), satisfying "actual detailed solutions, not just a reveal button".
- Time expressions are 11 (not 6/7), IQ200 situations are 4 (not 5), and the promise examples are the source's ("I will return your book tomorrow." — not "postcard"); earlier coverage-doc inventory errors were corrected to match the ledger.
- Marker numbering (the source skips ㊰) is preserved as-is per the source.

## Branch and review status

Branch `arena/785bec18-english-course` → PR to `main`, **left open for review** (not merged).
