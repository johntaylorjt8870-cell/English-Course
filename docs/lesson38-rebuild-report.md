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
| 1280×800 | 58 | 1230 px | 2023 px (`s25b`) | 1 | 0 px |
| 1920×1080 | 58 | 1195 px | 1960 px (`s24`) | 0 | 0 px |

The two desktop rows are the post-fix numbers from §10 (laptop-first audit); the tablet/mobile rows are from the earlier pass and were not re-measured because mobile is out of scope for §10.

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

---

## 10. Desktop (laptop-first) presentation audit — 1280×800 and 1920×1080

After the mobile pass above, the two desktop viewports were re-audited step by step; this section is the record of that pass. Mobile-only layout was deliberately left untouched.

**Method.** Headless Chromium (puppeteer-core + `@sparticuz/chromium`) against the Vite dev server and again against the production `vite preview` build, gate unlocked, every step reached through the in-app “next” control. For each of the **58/58 steps at each viewport** the walk recorded: rendered step height, horizontal document overflow, elements painted outside the viewport, table fit, cell line counts, grid height variance, page/console errors, and a screenshot of every step (117 PNGs). Text was then checked at much higher resolution (DPR 2–3 element crops) wherever a Latin run occupied more than one line, and reading order was resolved from per-character client rects rather than from `innerText` (which stays correct even when the render is scrambled).

**Structural results (58/58 per viewport)**

| Metric | 1280×800 | 1920×1080 |
|---|---|---|
| Steps walked | 58 | 58 |
| Median / p90 / max height | 1230 / 1754 / 2023 px | 1195 / 1753 / 1960 px |
| Horizontal page overflow | 0 | 0 |
| Elements outside viewport | 0 | 0 |
| Overlapping elements | 0 | 0 |
| Tables wider than their column | 0 of 8 | 0 of 8 |
| Table cells wrapped to ≥3 lines | 0 | 0 |
| Card-grid height variance | 0 | 0 |
| App page/console errors | 0 | 0 |

The only two console entries per run are `net::ERR_CONNECTION_CLOSED` for the Google Fonts stylesheet — the sandbox has no route to `fonts.googleapis.com`; they are network failures, not application errors, and they appear identically on the untouched Lesson 37.

**Defects found in this pass and fixed**

1. **Latin names split mid-phrase inside an Arabic sentence (§1 objectives / self-check).** Each objective sat in a half-width column (≈375 px at 1280), so «⑥ التمييز بين Future Simple وFuture Continuous وFuture Perfect.» broke between “Future” and “Perfect.”, and the continuation was laid out at the start of the next line: the step rendered «Future₉Future Continuous و Future Simple … / Perfect.» — unreadable. Fix: the checklist renders one objective per row below `2xl` (`grid gap-2 2xl:grid-cols-2`). No wording changed; measured height is unchanged (±8 px) because every row used two lines before and one now.
2. **«الصحيح» clause merged into the LTR pair group (§25 · أخطاء شائعة, `errors-*`).** In «الخطأ: will داخل جملة by the time. الصحيح: By the time you arrive, I will have finished.» the pair heuristic binds the English clause ending in a period to the following Arabic word, so the group painted «by the time. الصحيح», and the correction sentence’s leading colon was stranded at the far left of the line. Fix is structural, not cosmetic: `Choice38` gained an optional `note`, and the correction now renders as its own block (`ChoiceList38`), which gives it its own paragraph direction. All twelve correction labels were split into `label` (error clause, ending in English) + `note` («الصحيح هو …»). The dash/colon that used to precede an LTR island was replaced by the Arabic connector «هو» so no punctuation is left dangling.
3. **The §25 correction still could not fit a half-width card.** With two options per row, «الصحيح هو By the time you arrive, I will have finished.» wrapped and pushed “finished.” onto a third line under the card’s right edge. Fix: the new `wide` flag renders the `errors-e6` choices one per row below `2xl` and two per row on ≥1536 px screens. This is the only step whose desktop height moved — 1960 → 2023 px at 1280 (see gaps).
4. **§25 · `errors-e7` had two Latin fragments in one label** («الصحيح: I will have been ready فقط، ولا تُستخدم will be ready.»), both splitting across lines. Fix: split into `label` «لا تُستخدم will be ready هنا.» + `note` «الصحيح هو I will have been ready فقط.» — the same claim, the same “فقط” nuance.
5. **§25 · s25a note reordered two grammar terms.** «… تعود إلى has أو V1/V2 بدل V3.» put «has» and «V1/V2» into the alternatives wrapper («A أو B»), which paints the pair left-to-right inside an RTL sentence, so the line rendered «V1/V2 أو has». Fix: «… تعود إلى has، أو إلى V1/V2، بدل V3.» — inserting «إلى» breaks the alternatives match while keeping the sentence and its meaning. Verified from per-run rects before/after: `has@321, V1/V2@367, V3@268` → `has@381, V1/V2@289, V3@228` (correct right-to-left order).
6. **§29 feedback note split a 29-character run** («by the time the guests arrive») across lines inside an Arabic sentence. Fix: «… أما الجملة التي تبدأ بـ by the time فتصف إنجازًا مكتملًا.» — same distinction between ⑥ and ⑦, but the inline island is now the two-word term.

**Checked and judged not defects (evidence kept)**

- **Page framing.** At 1280 and 1440 the shell is flush to the viewport with a 20 px inner gutter; at 1920 it is inset 224 px each side. That is a max-width container (≈1472 px) centring above ~1700 px, not a broken gutter — framing is consistent within each breakpoint, so no CSS was changed.
- **The two banners at the top.** `.fp38-hero` is `position: relative` (it does **not** stick), and the second banner is the cover step itself. The header and the cover share the title, the subtitle and the three tense chips, so a 1280×800 screen shows 634 px of near-identical content before the first content step. Kept as the designed cover; recorded under gaps rather than rewritten.
- **Long Latin runs.** 10 of 58 steps at 1280 and 3 of 58 at 1920 have a Latin run on more than one line; every one was opened at DPR 2–3 (`s06b`, `s10b`, `s11b`, `s13a`, `s20`, `s26a`, `s35b`, `s36a`): they are full English sentences in English-led blocks whose base direction is LTR, so they wrap left-aligned and read correctly. Only *short* runs that broke inside RTL sentences were treated as defects (items 1, 2, 4, 5 above); after the fixes, a 58-step re-scan at both viewports finds no short Latin run split across lines except `s06b`’s 45-character English option, which wraps correctly.
- **Content-level BIDI audit of all mixed lines.** A run-order oracle was built from per-run client rects: for every leaf block whose computed direction is RTL and that mixes Arabic with Latin, the Latin runs that share a line must appear in right-to-left order, which they cannot fake by having a correct `innerText`. Swept over all 58 steps at 1280 and at 1920 after the fixes: **0 steps flagged at either viewport** (before the fixes it flagged `s25a`; the earlier rounds caught `s01`, `s25b` and `s29`).

**Re-verification after the fixes**

| Check | Result |
|---|---|
| `npm run audit:lesson38` | ✅ 315 assertions |
| `npm run check:english-direction` | ✅ 59/59 BIDI rendering assertions |
| `npm run build` | ✅ built in 10.9 s (only the pre-existing > 500 kB chunk warning) |
| Production `vite preview` walk | ✅ 58/58 steps, median 1195 px at 1920, max 1960 px, 0 horizontal scroll |
| Answer protection | unchanged — `testKey38-*.js` and `solutionsData38-*.js` remain separate lazy chunks, the student entry chunk still statically references only the dynamic import, and none of the edits touched test/solution data |

**Remaining gaps (desktop)**

- `s25b` is now the tallest desktop step at **2023 px @1280** (1933 @1920). The 63 px came from stacking `errors-e6` so its correction can be read; the step was left at 2023 px rather than shortening the correction or shrinking type.
- The header/cover duplication described above is kept as designed; it is not “fixed” by deleting the cover title or the chips.
- Chromium headless only (no Safari/Firefox, no physical laptop), and the sandbox cannot load Google Fonts, so the metrics above use the fallback stack.
- Mobile (390 px) behaviour was not re-measured in this pass by design.
