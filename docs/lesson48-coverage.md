# Lesson 48 — coverage and verification

Route: `#/lesson/48`. The lesson has **52 slides grouped into 18 stations** and reuses `Lesson1Shell`, its navigation, the site lock and the shared bidi helper. All lesson code and styling live in `src/lessons/lesson48/`; nothing shared was modified.

## Station map

| Station | Slides / retained learning content |
| --- | --- |
| Opening | `cover`, `goals`, `seven-situations`, `phase2-recap`: eleven review goals, seven situations in one day, and a recap of the eight units of Phase 2 (Lessons 41–48) |
| Shared rule | `modal-map`, `core-rule`, `no-s-no-to`, `ought-to-exception`, `rule-check`: `Subject + Modal + V1`, no `-s`, no `TO` after a modal, no `DO/DOES` in questions or negatives, the `OUGHT TO` exception, and the `HAVE TO` conjugation exception |
| Ability / permission | `can-ability`, `could-past`, `can-could-map`, `was-able-to`, `ability-lab`: present ability, general past ability, polite request, permission, possibility, and `WAS/WERE ABLE TO` for success in one specific achievement |
| Possibility | `may-might`, `may-permission`, `may-not-two`, `possibility-lab`: MAY/MIGHT probability without fixed percentages, MAY for formal permission, and the two meanings of `MAY NOT` (prohibition vs. possibility that something is not the case) |
| Necessity | `must-have-to`, `have-to-forms`, `necessity-lab`: MUST vs HAVE TO, `has to` / `had to` / `will have to`, questions with DO, and the negative |
| Prohibition vs. no necessity | `three-doors`, `neednt-have`, `prohibition-lab`: `MUSTN'T` (prohibition), `DON'T HAVE TO` (not obligatory), `NEEDN'T` (no need), and `NEEDN'T HAVE + V3` kept as a forward pointer to Lesson 49 only |
| Advice | `should`, `ought-to`, `should-vs-must`, `advice-lab`: SHOULD for advice, OUGHT TO with its moral-duty tone, and SHOULD vs MUST as a strength-of-obligation difference |
| Desire / preference | `would-structures`, `like-vs-rather`, `desire-lab`: the seven WOULD patterns, including `WOULD RATHER + subject + past simple` and `WOULD YOU MIND + V-ing` |
| Future | `will`, `will-vs-would`, `future-lab`: WILL for future, decision, promise and prediction; negatives and questions; WILL vs WOULD |
| Decision map | `decision-map`: ten branches — ability, possibility, permission, necessity, advice, prohibition, no necessity, desire/preference, polite request, future |
| Grammar detective | `detective-a`, `detective-b`: the twelve errors, rewritten as full sentences with an explanation |
| Dialogues | `dialogue-school`, `dialogue-trip`, `dialogue-home`: the three dialogues (nine turns each), optional Arabic translation, a graded comprehension check and a function analysis |
| Situations | `what-would-you-say`: ten situations with meaning-aware grading |
| Mastery practice | `practice-forms`, `contrast-lab`, `mastery-dashboard`: forms practice, six meaning-contrast laboratories (MUSTN'T/don't have to, MUST/SHOULD, MAY/MIGHT, CAN/COULD, WOULD LIKE/WOULD RATHER, NEEDN'T vs NEEDN'T HAVE) and an honest dashboard |
| Reading | `reading`, `reading-questions`: “The School Science Competition”, 14 paragraphs with optional translation and 15 comprehension questions with on-demand model answers |
| Assessment and teacher | `final-test`, `teacher`: 25 questions in five levels; gated 25-question key with alternatives, rejections and fine-distinction notes |
| Writing | `writing`: “A Day Full of Decisions”, 15–20 sentences, a 15-structure checklist, a speaking task, an Arabic reflection and an optional model |
| Summary and course | `golden-summary`, `phase-complete`, `course-progress`: 18-row golden summary + five comparisons, Phase 2 completion (8/8, 48/120, 40%, 72 remaining), and Lesson 49 — MODAL PERFECT |

Meaning is taught as meaning, not as decoration: MUST/SHOULD/HAVE TO are graded by strength and context rather than absolute rules; MAY/MIGHT never carry invented percentages; `MUSTN'T` ≠ `DON'T HAVE TO` ≠ `NEEDN'T`; `WAS ABLE TO` marks one specific success while `COULD` marks general past ability; `WOULD RATHER + subject + past simple` is about another person's action, not about past time.

## Assessment and loading

Student prompts live in `testData48.ts` (10 multiple choice, 5 completion, 5 error correction, 4 meaning discrimination, 1 seven-blank dialogue — exactly 25, no 26th question). Solutions, accepted alternatives, rejection notes and grading live in `testKey48.ts`, imported only inside `submit()` of `TestArea48.tsx`. The teacher guide is a separate deferred module, reachable only after a graded result and the project's existing teacher gate (`somer173`, same policy as Lessons 46–47). Failed key or guide loads preserve answers and the student result, and expose an explicit retry that uses a cache-busted same-origin URL; a successful retry entry is remembered so a retake is not blocked by the browser's cached failed primary URL.

Grading accepts may/might/could, must/have to, needn't/don't have to, the accepted dialogue alternatives, punctuation/case/spacing differences and full-sentence rewrites of correction items, and rejects grammatically wrong answers that merely contain the right modal (`He must to study harder.`, `Does she can drive?`, `You mustn't come early.` for a no-necessity meaning).

This is a static client-side site: deferred loading and the password are presentation conveniences, **not server-side security**. Browser state is in memory and is not promised across a reload. Typed answers use normalisation plus bounded, anchored patterns rather than full natural-language understanding, so a correct but unforeseen paraphrase may need manual review; the writing checklist is advisory and says so.

## Verification (run on 2026-10-31, branch `arena/f8c4492c-english-course`)

| Command | Result |
| --- | --- |
| `npm install` | already installed (0 packages before this session; `npm install` completed, 4 pre-existing advisories) |
| `npm run build` | **passed**, ~9 s, only the pre-existing >500 kB chunk warning; emitted separate `testKey48` and `TeacherGuide48` chunks |
| `npm run audit:lesson48` | **724 assertions, 0 failures** |
| `npm run audit:lesson48-browser` | **754 assertions, 0 failures** (4 console messages are the deliberately aborted key/guide requests) |
| `npm run check:english-direction` | 59/59 + 59/59 bidi-rendering assertions passed |
| `node scripts/audit-render-direction.mjs` | 1470 assertions passed (baseline 1469; +1 for the new route) |
| `node scripts/audit-lesson-navigation.mjs` | 208 passed, 0 failed (baseline 200) |
| `node scripts/audit-navigation-lock-overlap.mjs` | 109 passed, **1 failed** — pre-existing Lesson 36 teacher tab |
| `node scripts/audit-bidi-mixed.mjs` | **4 strict failures, all Lesson 38** (baseline 4); Lesson 48 = 0 violations |
| `node scripts/audit-final-test.mjs` | 1261 assertions, **5 failed** — all Lesson 35 password/key checks; the same 5 fail on `main` (1259 assertions) |
| `node scripts/audit-final-test-coverage.mjs` | **3/633 failed** — all Lesson 35, identical to baseline |
| `node scripts/audit-source-reveal.mjs` | **1/63 failed** — pre-existing `<details>` in `lesson38/Steps38.tsx` |
| `node scripts/audit-lesson46.mjs` / `audit-lesson47.mjs` | 766/0 and 773/0 — no regression |
| `npm run audit:english-direction` (umbrella) | **not completed**: halted by `scripts/audit-lesson33.mjs`, whose git-scope guard only permits Lesson 33 paths. Guard not modified or bypassed. |

`audit-lesson48` covers: inventory (52 slides, 18 stations, unique IDs, every slide kind), all 23 teaching axes, the writing model (sentence count and 15 constructions), 69 practice items with per-item correct/wrong/blank grading, accepted alternatives, rejection of grammatical errors that contain the right modal, 25-question / 10-5-5-4-1 test shape, no key in student data, submit-only key import, retry URL safety, full-slide jsdom rendering with counter and editorial-copy checks, the locked teacher, preserved answers on a simulated key failure, single-flight submission, and 25 feedback items only after submission.

The browser audit runs the built `dist/` at the GitHub Pages base path in Chromium: all 52 slides at 1280/768/375/320 with overflow, lock/navigation overlap, hit-testing and RTL checks; meaning map, situation wall, contrast lab, dialogue lab, decision map, reading reveal, writing checklist and persistence; keyboard focus and activation; contrast ratios ≥ 4.5:1; two real key-chunk failures followed by 25/25; two real teacher-chunk failures followed by 25 detailed solutions; retake with a meaning-changing answer (`mustn't`) and a grammatical error (`must to`) scored wrong while the modal alternative stays correct; teacher re-lock after retake; phase numbers; site lock; and zero unexpected console/page errors.

## Pre-existing failures (unchanged by this lesson)

Lesson 36 teacher tab in the navigation-lock audit; four bidi strict cases and the `<details>` source reveal in Lesson 38; five Lesson 35 final-test key checks (three of them in the coverage audit); and the git-scope guards in Lessons 33/41/42/43/44 that fail on any unmerged lesson branch. The strict `tsc` sweep (the repo has no root `tsconfig.json`; `npm run build` is its TypeScript gate) reports 278 diagnostics in Lessons 6–43 and **none in Lesson 48**; `main` reports 283 in the same older files.
