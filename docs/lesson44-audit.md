# Lesson 44 — pre-redesign audit (main @ `d9aeecd`)

This is the audit that drove the redesign. Every observation below was made by reading the
merged implementation and by rendering it in Chromium (1280×900, reduced motion, system
fonts because the sandbox cannot reach Google Fonts). Measured numbers are recorded in
`docs/lesson44-visual-before/measurements.json`; screenshots are in
`docs/lesson44-visual-before/`.

## 1. What actually renders

Rendering path: `App.tsx` → `Lesson44.tsx` (state: area, step, visited, workspace, test
answers, submitted, teacher) → `Steps44.tsx` (one source section per step) →
`Lines44/kit44` (source lines) + `tools44/labs44` (interactive modules) → `lesson44.css`.

- 39 steps = the cover plus source sections §1–§38. One step per source section; step index
  equals section number. 761 source lines ("units") across the 39 sections.
- Four areas: student, test, solutions (lazy, locked), teacher (password).
- 25 test questions in five levels; 25 solutions; 25 practice items (§§28–32); 10
  comprehension questions; 10 detective items; 10-item writing checklist.
- CSS is scoped under `.lesson44`; shared components are `Signature`, `Rich`,
  `splitMixedText` and the site password gate.

## 2. Observed problems (measured)

### 2.1 Hierarchy and composition

- **A 410 px header repeats above every step.** Masthead + lesson hero + area tabs are
  re-rendered on all 39 steps. At 1280×900 the first lesson content begins at y≈460; on
  shorter laptops it is below the fold on every navigation. The hero shows the lesson title
  and subtitle 39 times.
- **Every section is one undifferentiated white panel.** `Panel44` is used for rules,
  examples, drills, dialogues, reading, writing and the test, with the same padding, radius,
  border, shadow and a 4 px gradient strip whose only variation is its colour. There is no
  distinction between reading, explanation, practice and assessment beyond a 10 px tag.
- **Prose spans the full stage width** (≈900 px at 1280). Arabic body lines run ~90–100
  characters; `Lines44` puts every line in its own full-width row, so the eye has no measure
  to return to.
- **Section titles are duplicated**: the step heading prints `sectionNumber` (huge cyan
  numerals), an Arabic kicker "مختبر الضرورة / القسم N", the English half of the title and
  then the Arabic title, then the panel prints the same title again (`Panel44 title`).
  Observed on §27 ("Grammar Detective" appears twice), §28–§38.
- **The rail is 232 px and cannot hold its own labels.** Long titles wrap to three lines and
  the two-digit numbers break into two lines ("1 1", "2 0", "3 1") because the monospace
  digits have no `white-space` guard. The nested section list overflows its 232 px column.

### 2.2 Typography

- Body: `"Segoe UI", Tahoma …` at 17 px/1.85 for both Arabic and English. `font-weight:750`
  is used for headings (not a valid variable weight for the fallback fonts).
- English examples and Arabic explanation share the same face, size and colour; the only
  distinction is a cyan tint. The English sentence is not the visual anchor of the lesson.
- **`overflow-wrap:anywhere` is set on the whole lesson**, which breaks Arabic and English
  words at arbitrary characters in the rail and panels.
- Labels are 10–12 px uppercase monospace with wide tracking, including on Arabic-bearing
  chips; captions and metadata are frequently 10–12 px.
- `Text44` renders pure-English strings with `display:inline-block; text-align:left`, which
  is correct for BIDI but makes every English fragment a box that cannot share a line with
  its Arabic translation; translations therefore sit in separate tinted rows.

### 2.3 Colour and contrast

Seven saturated semantic hues (cyan, amber, red, emerald, violet, teal, pink) plus a cyan
gradient masthead and a full cyan cover. Measured WCAG ratios:

| Pair | Ratio | Use |
|---|---:|---|
| `#FFFFFF` on `#06B6D4` | **2.43** | masthead, cover body text |
| `#FFFFFF` on `#0EA5E9` | **2.77** | cover gradient |
| `#FFFFFF` on `#0891B2` | **3.68** | cover gradient, primary buttons |
| `#F59E0B` on `#06B6D4` | **1.13** | cover signal text |
| `#A5F3FC` on `#0891B2` | **2.95** | cover MUST signal |
| `#FFFFFF` on `#10B981` | **2.54** | "lack of necessity" chips |
| `#FFFFFF` on `#EF4444` | **3.76** | prohibition chips |
| `#64748B` on `#F0F9FF` | **4.46** | secondary text (just below AA) |

Colour is also doing semantic work alone: `.option44:has(input:checked)` changes only hue;
correct/incorrect feedback is distinguished mostly by red vs green surfaces.

### 2.4 Escaped content and gating (functional, not only visual)

- **Premature answer exposure.** `PracticeSet44` renders `Lines44` for the whole section,
  which includes the source "الحلول" block; §28–§32 keys are therefore printed *above* the
  exercises. `ReadingChallenge44` does the same, printing the ten §33 answers above the ten
  questions. This violates the lesson's own attempt-gating rule.
- **Content loss in §1**: `GoalList44` filters only the numbered goals and drops the intro
  line "بنهاية هذا الدرس ستكون قادرًا على:" from the rendered step.
- **Content loss in §27**: `GrammarDetective44` renders its own ten items but never renders
  the source block "الحلول" or "أهم اكتشاف"; only the teacher guide contains them.
- **Cover content loss**: `Cover44` renders `lines[1]` and `lines[2..]`; `lines[0]` (the
  Arabic subtitle) has no rendered unit outside the header.
- **Unpersisted writing progress**: the ten writing checkboxes are uncontrolled inputs, so
  ticking them and moving to another step loses every tick.

### 2.5 Interaction and feedback

- Option buttons are plain bordered buttons with no letter, no selected/inactive hierarchy
  and no per-option state after checking; the checked answer is not marked, only a green or
  red box appears below.
- Every exercise is its own card inside another card, with a floating number badge; §28
  renders the prompts once in the source block and again in five cards.
- The "check" button sits under every item with no spacing rhythm; the feedback box repeats
  the same shape for correct and incorrect and has no icon or textual verdict.
- `ChoiceLab44` accepts re-answering but gives no hint that the selection can change.
- The test page is 10 534 px tall with no question numbering beyond "السؤال N", no progress
  rail and the same 410 px header above it.

### 2.6 BIDI / mixed script

Running the repository's mixed-BIDI oracle on lesson 44 reports two strict violations:

```
para L44|02MUST|الضرورة        [para:button.]
para L44|03HAVE TO|المتطلبات   [para:button.]
```

They come from the station buttons, which concatenate the numeric index, a Latin name and an
Arabic name inside one paragraph (`02` + `MUST — الضرورة`) with no explicit isolation. The
section list also nests an RTL Arabic title inside `dir="ltr"`, so the number and title
separate and the title's alignment is wrong.

### 2.7 Responsive behaviour

The layout does technically collapse at 850 px and 500 px, but the desktop experience is the
priority and it is weak: a 232 px rail plus a 900 px single column, no measure control, and
interactive labs stacked in narrow `minmax(240px,1fr)` dials. No horizontal overflow was
observed at 1280 or 375.

## 3. What was not broken (and must stay)

- Routing (`#/lesson/44`), lesson registration, the four-area model, the site password gate.
- Test integrity: exactly 25 questions in five levels, no correctness revealed before
  submission, solutions only after submission or teacher unlock, teacher password
  `somer173` (same mechanism as lessons 38–43).
- Answer submission/reset behaviour, attempt-gated practice keys (the intent, at least),
  lazy loading of the solutions area and teacher guide.
- All source content in `source44.ts` (39 sections, 761 units) and all 25 solutions.

## 4. Hypotheses (explicitly not verified)

- The cyan/white cover was probably chosen to feel "bright"; measured contrast makes the
  white-on-cyan body text hard to read on projectors, but no projector test was performed.
- The 39-step model was probably kept literal to make coverage easy to audit. It is
  defensible; the redesign keeps it and fixes density inside each step rather than
  renumbering the source.

## 5. Post-redesign verification (this branch)

### 5.1 Automated results

| Check | Result |
|---|---|
| `npm run build` | ✓ 8.87 s |
| `node scripts/audit-lesson44.mjs` | ✓ 91 assertions · 39 sections / 761 lines · 13 chapters · 25 practice / 25 test / 25 solutions |
| `node scripts/audit-lesson44-dom.mjs` | ✓ 1 692 assertions · 39 steps · 761 `data-source-unit`s · 25-question submit · 25 solutions · password-gated teacher guide · 47 BIDI snapshots |
| `node scripts/audit-lesson44-browser.mjs` | ✓ 69 checks · 32 screenshots · 25 contrast snapshots · lowest 3.46:1 (large folio numerals only) · no horizontal overflow at 1280 / 1024 / 768 / 390 |
| `npm run audit:english-direction` | ✓ EXIT 0 (316 s), including lessons 24–44, BIDI mixed, final-test coverage, navigation |
| `audit-bidi-mixed` for Lesson 44 | ✓ 0 classic + 0 alternative violations (site total unchanged: 785 unique, 2 allowlisted) |

The browser report is `docs/lesson44-visual-after/browser-report.json`; screenshots are in
`docs/lesson44-visual-after/`. The static/DOM audits run in the default
`audit:english-direction` chain; the Chromium audit is a separate command because it needs a
provisioned browser (it uses `playwright-core` + `@sparticuz/chromium` without changing
`package.json`).

### 5.2 States inspected in Chromium

1280×900: cover, chapter steps 1, 2, 3, 11, 12, 13, 17, 20, 23, 27, 28, 33, 34, 36, 38,
the 25-question test, the gated solutions area after submission, the teacher gate, the
unlocked teacher guide and the practice-key table. Also 1024, 768 and 390 wide, including
step 13 at each width. Interaction states captured: selected/wrong/correct answer with
feedback, keyboard focus ring, practice key opening after five checks, persisted writing
draft, test submit locked/unlocked, wrong teacher password, teacher guide open.

### 5.3 Defects found and fixed during verification

- **Practice grading marked the correct option wrong.** Keys are `"A — must"` while options
  are `"A. must"`; grading now compares the option letter (and still requires both options to
  be checked before the key opens).
- **Bilingual level labels ran together** ("المستوى الأولMultiple Choice"). `Label44` now
  leaves a reading gap before the isolated English run.
- **Long solution reasons were bidi-scrambled.** The source-key sentence, the "السبب:" label
  and the explanation are now separate runs/blocks; all 25 reason strings render verbatim
  (asserted by comparing normalised text against `solutionsData44.ts`).
- **Arabic–English word boundaries lost their space** when a Latin run carried the boundary
  space inside its isolate. A scoped `.font-en` margin restores the visual space (e.g.
  "منظومة Modal Verbs." no longer "منظومةModal Verbs.").
- **Mixed-script titles broke at the colon.** Titles such as
  "التدريب الأول: MUST أم HAVE TO؟" put the colon inside the English run; `Title44` now keeps
  the label and the full English question in separate isolated runs.
- **Decorative colour was used for text.** `.areas44 button > span` now uses `--faint`
  (2.6:1 → 5.6:1 at its size), found by the rendered-contrast pass.

### 5.4 Remaining limitations

- Numbers come from headless Chromium/Playwright only; Safari/Firefox and a physical phone
  were not tested.
- At 390 px the two prohibition/necessity panes remain side by side (each ≈170 px) to keep
  the comparison visible; the lines wrap but nothing overflows.
- The source-key line under each solution is 11 px mono (5.05:1 contrast); it is metadata,
  not the explanation.
- Some steps are still long (step 3 1 939 px, step 20 2 002 px, step 33 2 615 px at
  1280×900); they are shorter than before (e.g. §33 was 8 935 px) but not uniform.
- The teacher practice-key table scrolls horizontally below ~860 px; it is deliberately
  `min-width: 720px` to keep five columns readable.
- The repository preservation list says "38 original source sections"; the ledger has 39
  rows (cover + §1–§38). All 39 are preserved; this discrepancy is in the list, not the
  content.
- The 25 test solutions are platform-authored (the source §34 has no answer key); their
  provenance is labelled "مفتاح من §34 المصدر — الشرح من إعداد المنصة".
