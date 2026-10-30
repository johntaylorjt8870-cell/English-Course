# Lesson 47 — coverage and verification

Route: `#/lesson/47`. The lesson has **46 slides grouped into 15 stations** and reuses `Lesson1Shell`, its navigation, the site lock and the shared bidirectional-text helper. All styling and behaviour are local to `src/lessons/lesson47/`.

## Station map

| Station | Slides / retained learning content |
| --- | --- |
| Opening | `cover`, `goals`, `three-lanes`: three functions of WOULD — desire, preference, polite request |
| WOULD core | `would-meaning`, `would-rule`, `would-contractions`, `contractions-check`: invariant modal, no `-s`, no DO/DOES, contractions, `I'd = I would / I had` |
| WOULD LIKE | `like-meaning`, `like-noun`, `like-to`, `why-to`, `like-negative`, `like-questions`, `like-answers`, `like-person`: `would like + noun`, `+ to + V1` (LIKE is the V1), `+ person + to + V1`, offers and invitations |
| WOULD RATHER | `rather-meaning`, `rather-rule`, `like-vs-rather`, `rather-than`, `rather-real`, `rather-negative`, `rather-questions`: no TO after RATHER, `rather … than …`, `rather not + V1` |
| Two subjects / past form | `rather-subjects`, `rather-past`: `would rather + subject + past simple` for another person's action; the past form marks preference, not past time |
| Polite requests | `mind-form`, `mind-answers`, `request-ladder`: `Would you mind + V-ing?`, why not `mind to`, `No, not at all` / `Of course not` / `Certainly` as agreement |
| Modal map | `modal-map`: WOULD / COULD / SHOULD / WOULD LIKE / WOULD RATHER / WOULD YOU MIND |
| Real-life labs | `restaurant-lab`, `weekend-lab`, `classroom-lab`: dialogue + comprehension check + analysis |
| Grammar detective | `detective-a`, `detective-b`: twelve corrections with models |
| Graduated practice | `build-question`, `practice-like`, `practice-rather`, `practice-questions`, `practice-mind`, `practice-function`: exercises 31–35 plus word order and the modal map |
| Reading | `reading`, `reading-questions`: "The Perfect Weekend Plan", nine paragraphs and ten questions |
| Assessment and teacher | `final-test`, `teacher`: 25 questions in five levels of five |
| Writing | `writing`: 12–15 sentences, nine required constructions, Arabic reflection, optional model |
| Golden summary | `golden-summary`: ten-row matrix and the golden rule |
| Course roadmap | `course-progress`: 47/120 (39.17%, 73 remaining); Lesson 48 is the Modal Verbs Master Review |

Meaning distinctions are taught explicitly and are not flattened into form rules: WANT is correct but less polite than WOULD LIKE; WOULD LIKE is a wish while WOULD RATHER compares alternatives; a one-subject preference uses `would rather + V1`, whereas a preference about another person's action uses `would rather + subject + past simple`; accepting an offer (`Yes, please`) is not the same as answering a mind-question (`No, not at all` = agreement).

## Assessment and loading

Student prompts live in `testData47.ts`; solutions, accepted alternatives and grading live in `testKey47.ts`, loaded only upon submission. The teacher guide is a separate deferred module available after a submission and the existing teacher gate. Test failures preserve in-memory answers and expose a retry control; duplicate submission is blocked. Retries use a cache-busted same-origin URL, and the module remembers a successful retry entry so a retake is not blocked by the browser's cached failed primary URL. The production Chromium audit exercises two consecutive failures followed by success for both the key and the guide, then a retake that grades a wrong answer.

This is a static client-side site: deferred loading and the password are presentation conveniences, **not server-side security**. Browser state is in memory and is not promised across a reload. Typed answers use normalization plus bounded, anchored patterns rather than full natural-language understanding, so a correct but unforeseen paraphrase may need manual review; writing checks are advisory.

## Verification

- `npm run audit:lesson47` — 773 assertions: inventory, coverage, writing-model structure, per-question acceptance/rejection (including `walk` vs `to walk`, `stayed` vs `stay`, `waiting` vs `to wait`), practice keys, perfect/blank/wrong-dozen grading, retry URL safety, full-slide render, locked teacher, submit-only key load, preserved answers on failure, and 25 feedback items only after submission.
- `npm run audit:lesson47-browser` — 662 assertions in production Chromium against `dist/` at the GitHub Pages base path: all 46 slides at 1280/768/375/320, overflow and lock/navigation overlap, RTL/LTR isolation, contrast, keyboard focus, lane/practice/writing state persistence, word order, reading reveal, two real key failures then 25/25, two real guide failures then 25 solutions, retake 24/25 with corrective feedback, site-lock return, and zero unexpected console errors.
- `npm run check:english-direction`, `npm run audit:lesson-navigation` and `npm run audit:render-direction` cover the course-wide inventory and route registration.

Pre-existing failures elsewhere (not caused by this lesson) are recorded in the pull request: Lesson 36's teacher tab in the navigation-lock audit, Lesson 38's four bidi strict cases and `<details>` source-reveal scan, Lesson 35's final-test key checks, Lesson 41's hub-stat assertion, and the git-scope guards in lessons 33/42/43/44 that fail on any unmerged lesson branch.
