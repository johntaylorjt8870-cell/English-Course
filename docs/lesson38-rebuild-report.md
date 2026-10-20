# Lesson 38 — Future Perfect: rebuild implementation report

Branch: `arena/6327af6a-english-course` · PR target: `main` · Lesson: 38 only (Lessons 1–37 untouched).

Title shown in the hub: **الدرس 38: Future Perfect — المستقبل التام** · **By Tomorrow, I Will Have Finished!**

---

## 1. What was rebuilt

This is a **rebuild of the existing Lesson 38**, not a new lesson and not a re-skin of Lesson 37.

| Before | After |
|---|---|
| 1 step per source section (37 steps, several > 3000 px) | **58 short steps**, source sections split only where they mix explanation and practice |
| Deadline-Lab navy/teal chrome | **Finish Line Studio** identity: ivory paper `#fff8f3`, maroon `#9f1239`, warm borders `#f0d9d2/#f6e3de`, green `#1c6b3c`, gold `#e8a317`, dashed finish-line band, step numbers as lane markers |
| Test submitted with “no immediate correction” | Test graded **after submit** from a dynamically imported key; 25 explanations in place |
| Solutions/teacher guide as one undifferentiated dump | Three separate surfaces: Test Area (neutral before submit), Solutions Area (after submit/teacher), Teacher Area (password) |
| 37-assertion-era audit script (stale) | Rewritten audit: **315 assertions** |

### Visual identity (Finish Line Studio)

- A **timeline strip** at the top of every step (`fp38-rail`, `TimelineRail38`) with MONDAY → WEDNESDAY → FRIDAY style points.
- A **consistent colour code for the three tenses**, used by every chip, lane, table and feedback block:
  - `will + V1` (Future Simple) — gold `#e8a317`,
  - `will be + V-ing` (Future Continuous) — violet,
  - `will have + V3` (Future Perfect) — maroon `#9f1239`.
- **Finish-line band** (`fp38-finishline`) as the recurring page marker; step cards are ivory “lanes” with a maroon step number.
- Design tokens live in `src/lessons/lesson38/lesson38.css` (lesson-local, no global CSS touched), including `prefers-reduced-motion` and print rules.

---

## 2. Step count and structure (58 steps)

| Chapter | Steps | Source sections |
|---|---|---|
| ARRIVAL — الوصول إلى خط النهاية | 2 | cover, §1 |
| THE FORM — بناء الصيغة وتشريحها | 7 | §2–§5 |
| DEADLINES — by والموعد النهائي | 6 | §6–§9 |
| TWO EVENTS — حدثان وجملة زمنية | 8 | §10–§13 |
| CONTROL — النفي والسؤال والإجابات | 11 | §14–§19 |
| COMPARE — المقارنات والأخطاء | 7 | §20–§25 |
| PRACTICE — الحوار والتدريبات | 9 | §26–§31 |
| READ & TEST — القراءة والاختبار | 4 | §32–§34 |
| WRAP UP — الكتابة والملخص | 4 | §35–§36 |

Sections split into two or three steps (never duplicated): §2, §3, §4, §6, §7, §10, §11, §12, §13, §14, §16, §18, §19 (three), §25, §26, §29, §30, §32, §35, §36. The split is content-driven: explanation first, then the same section’s practice, so a single page never carries a full reading + a 15-item workshop + a table.

**No step drops content.** The step map covers 538 of the ledger’s source-line slots directly; the remaining lines are §33’s 60 test lines (rendered inside the Test Area) and the 42 `revealUnits` (rendered only after an attempt). The audit asserts that **no source line renders twice and none is unreachable**.

---

## 3. Coverage matrix

Full per-section table: `docs/lesson38-coverage.md` (37 rows, opening + §1–§36). The in-app ledger (`coverage38.ts`) derives each row’s location from `SLIDES_38`, so rows cannot drift from the step map.

Preserved verbatim or rebuilt without rewording:

- Opening bridge: `At 8:00 tomorrow, I will be studying.` / `By 8:00 tomorrow, I will have finished studying.` + IQ200 tagline.
- §1 ten numbered objectives (each `①…⑩` kept, now an interactive self-checklist).
- §2 timeline (MONDAY/WEDNESDAY/FRIDAY + اليوم/إنهاء المشروع/نقطة المرجع المستقبلية), rebuilt as a 3-row table + interactive rail.
- §3 formula, §4 sentence dissection, §5 seven-pronoun table (with `It will have stopped.`), §6 four first-use examples, §7 `by`, §8 AT vs BY, §9 nine expressions, §10 two events, §11 `by the time` + Present Simple, §12 `by` vs `before`, §13 *The School Exhibition* (6 turns + translation + analysis), §14 negation, §15 meaning of negation, §16 Yes/No, §17 short answers, §18 five Wh questions, §19 five regular + ten irregular V3, §20 Future Simple vs Future Perfect, §21 Future Continuous vs Future Perfect, §22 three futures, §23 same event from three angles, §24 three perfects, §25 seven error pairs, §26 *Planning a Big Event* (9 turns + translation), §27 six multiple-choice, §28 six completions, §29 eight tense choices (⑥/⑦ contrast), §30 ten Grammar Detective sentences, §31 IQ200, §32 reading + 7 questions + 5-form analysis, §33 the 25-question test, §34 the (empty) source key, §35 Writing Mission (12–15 sentences, 8 criteria, model), §36 Golden Summary.
- Both dialogues keep every turn, its Arabic translation, and a per-line analysis; the reading keeps its 7 questions with the source answers plus the labelled platform analysis.

### Editorial correction (documented)

§23 read **«ستخبز أو تعد العشاء غدًا»** opposite `cook dinner`. «تخبز» = *bake*, so the rendered line is **«ستُعِدّ العشاء غدًا»**. The source wording is quoted in the teacher accuracy note and in this report; nothing else in the source was reworded.

### Platform additions are labelled

Every explanatory aside that is not source text carries `PlatformTag` (“إضافة تعليمية من المنصة”). §34 has no key in the source, so all 25 test solutions are marked `platform-authored-teacher-addition`.

---

## 4. Interactivity (real, with explanatory feedback)

15 interactive lab families, each with per-item feedback that states the rule and why the other option is wrong:

checklist (§1) · timeline rail + question (§2) · formula builder (§3) · sentence parts (§4) · conjugation console + traps (§5) · use-1 lab (§6) · `by` question (§7) · AT/BY lab (§8) · nine-expression matcher (§9) · two-event rail (§10) · `by the time` repair (§11) · `by`/`before` scale (§12) · dialogue readers ×2 (§13, §26) · negative builder (§14) · negation-meaning lab (§15) · Yes/No builder + short answers (§16–§17) · Wh builder (§18) · V3 pairs + 15-verb workshop (§19) · comparisons (§20–§24) · error diagnosis (§25) · practice sets (§27–§31) · reading answers with a platform analysis (§32) · writing workspace with a sentence counter and a criteria checklist (§35) · summary match (§36).

Correct `will have` never becomes `has`; `by` is taught as “not later than” (not “exactly at”, and not as a ban on Future Simple); `at`/`by` are a teaching contrast, not a mechanical rule; `by the time` takes Present Simple; negation keeps the deadline meaning; `will be ready` vs `will have finished` is preserved; open questions accept multiple grammatical answers.

---

## 5. Test and answer protection

- 25 questions, 5 levels × 5, exactly the §33 source order.
- **Before submit** the student DOM contains no score, no ✓/✕, no explanation, no model answer. The key is a separate module loaded by `await import("./testKey38")` inside `submit()`.
- **After submit** all 25 questions are graded in place (result, model answer, rule, why the chosen option fails, accepted alternatives) and the Solutions Area unlocks.
- Regression evidence:
  - `dist/assets/index-*.js` → `grep -c "How many experiments will you have completed"` = **0**; the string exists only in `solutionsData38-*.js`; `testKey38-*.js` is emitted as its own chunk.
  - `gradeTest38(documented answers)` = **25/25**; `gradeTest38(garbage)` = **0/25** (audit assertions).
  - jsdom audit mounts the Test Area and asserts `[data-test-feedback] = 0` and `[data-test-score] = null` before submit, and `= 25` for both after submit.

### Teacher Area and Solutions

- Teacher Area is a password-gated surface (`somer173`, the shared project password), separate from the test, and loads its guide with `lazy(() => import("./TeacherGuide38"))`.
- Teacher guide tabs: coverage map (37 rows), practice/reading keys, **all 25 test solutions with rule + why + wrong-option reasons + accepted alternatives for open answers**, and the rules/accuracy notes. Teacher access also unlocks the Solutions Area (no parallel teacher system).
- Wrong password → accessible `role="alert"`; the guide is not loaded.

---

## 6. Test results

| Check | Result |
|---|---|
| `npm run build` | ✅ built in ~10 s (only the pre-existing > 500 kB chunk warning) |
| `npm run audit:lesson38` | ✅ **315 assertions** |
| `npm run check:english-direction` | ✅ 59/59 BIDI rendering assertions |
| Bundle answer-leak grep | ✅ 0 occurrences in the student entry chunk |
| Chromium step walk (4 viewports) | ✅ 58/58 steps, 0 page/console errors, 0 horizontal overflow |

---

## 7. Chromium findings (real browser, not jsdom)

Headless Chromium against the dev server (bound to `0.0.0.0`) at **390×844, 768×1024, 1280×800, 1920×1080**, unlocking the site gate and clicking the in-app next control, measuring each step’s rendered height:

| Viewport | Steps | Median height | Max height | Steps > 2000 px | Overflow-X |
|---|---|---|---|---|---|
| 390×844 | 58 | 1595 px | 2610 px (`s22`) | 13 | 0 px |
| 768×1024 | 58 | 1222 px | 1960 px | 0 | 0 px |
| 1280×800 | 58 | 1222 px | 1960 px | 0 | 0 px |
| 1920×1080 | 58 | 1195 px | 1960 px | 0 | 0 px |

Also verified in the browser: timeline lab read-out, practice items answering and revealing source keys, test submit → 25 graded panels with model answers and a score out of 25, Solutions Area unlocked with 25 cards, teacher form rejecting a wrong password and loading the guide with the right one.

**Fixed during the visual pass**

1. A mobile title broke “Future Perfect” mid-phrase → mixed headings now render their English half on its own LTR line (`Title38`) without changing any wording.
2. `V3Lab38` overflowed 37 px horizontally at 390 px (input + button on one row) → the row wraps and the button moved beside the input.
3. 3 of 58 steps exceeded 2000 px on mobile after the first optimisation pass → §29 was split into 29أ/29ب (now none of the 58 exceeds 2610 px; the remaining tall mobile steps are the two comparison tables, the V3 table, the reading questions and the writing workspace, which are long because their source lists are long).

**Remaining gaps**

- Mobile (390 px) steps still reach 2000–2610 px where a source table or a 7-question set is inherently long. Nothing was deleted to fit; the tables scroll inside their own container.
- No Safari/Firefox or physical-device pass; Chromium headless only.
- Screenshots were reviewed by eye at all four viewports for 8 representative steps (cover, timeline, dialogue, V3, practice, reading, test launch, summary), not for all 58.

---

## 8. Shared-file changes (minimal, documented)

| File | Change | Why |
|---|---|---|
| `src/App.tsx` | Lesson 38 hub card: stats string `37 خطوة` → `58 خطوة قصيرة` and gradient `#17354a→#245f62` → `#9f1239→#e8a317` | the card is data-driven; a rebuild with a new palette must not advertise the old count |
| `scripts/audit-lesson38.mjs` | rewritten for the new implementation | the old script asserted the previous architecture (37 steps, no post-submit grading) |

No other shared file was modified; `src/index.css`, `src/shared/*`, and Lessons 1–37 are untouched. Lesson-local additions: `src/lessons/lesson38/lesson38.css`, `src/lessons/lesson38/testKey38.ts`.

---

## 9. Not done / explicitly out of scope

- The PR is **not merged** and the branch is **not deleted**.
- No project-wide refactor; the whole-project typecheck still has ~180 pre-existing errors in other lessons (unchanged), so `npm run build` is the typecheck for this work.
- `npm run audit:english-direction` still aborts on its Lesson 41 scope guard (pre-existing), so the direction audits were run scoped to Lesson 38 (`audit:lesson38`, `check:english-direction`).
