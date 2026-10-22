# Lesson 41 — source inventory, normalization and linguistic review

**Status: rebuilt in this branch; see `lesson41-validation.md` for measurement and `lesson41-coverage.md` for the section → slide map of all 883 source units.**

## Repository inspection before implementation

- Work branch: `arena/e4c38820-english-course`, branched from `2e2c64a7d798bddc3d189d65355fa0a8be1f5a62` (`main`).
- Only open PR at inspection time: #69 (Lesson 37). Untouched.
- Existing Lesson 41 folder, its five docs, its audit scripts and its 26 screenshots were the previous per-lesson “studio” identity; they were replaced, not extended.
- Instruction files read: `README.md`, `ARENA_PROMPT.md`, `LESSON_WORKFLOW.md`, `vite.config.ts`, `package.json`.
- No merge, branch deletion, branch switch or unrelated push performed.

## Readability and authoritative source

The complete Arabic/English lesson was supplied in the request as readable text. No OCR needed. Preserve opening plus §§1–40, in order. Decorative separators may become layout boundaries; copied tables need structured rows. Decode `&amp;` to `&` for display. Preserve English examples, Arabic explanations, numbered items and supplied keys. Source heading §35 is “Reading Challenge — A Busy School Week”; passage title is “A Week of Learning”: keep both.

### Source inventory

| Section | Inventory / required mapping |
|---|---|
| Cover | Three titles, IQ200, five study contrasts, introduction and guiding questions |
| 1 | Ten objectives |
| 2 | Auxiliary definition; reads / is reading / have finished; meanings and roles |
| 3 | Three parsed examples: students / Maya / Omar |
| 4 | Three-engine table; forms, roles, main-verb caveat |
| 5 | Eight BE forms; seven examples |
| 6 | Linking/main BE; happy, five examples, complement formula, three further examples |
| 7 | Six continuous tense formulas; shared BE + V-ing principle |
| 8 | Three correct/incorrect continuous pairs |
| 9 | Two no-do-with-BE contrasts; ready affirmative/negative/question |
| 10 | Active/passive bridge contrast; BE + V3; three passive examples; introductory scope |
| 11 | Five DO forms; auxiliary subset do/does/did |
| 12 | Two statement/question pairs; formula; four questions; speaks/speak explanation |
| 13 | Two affirmative/negative pairs; formula; four examples; likes/like contrast |
| 14 | Museum statement/question/negative; two formulas; four examples; went/go contrast |
| 15 | Five questions; existing-auxiliary rule; three wrong/right pairs |
| 16 | Emphatic DO; bilingual dialogue; present-third-person and past examples; V1 contrast; stress note |
| 17 | Main DO; two double-DO analyses; experiment mini-challenge and key |
| 18 | Four HAVE forms; had = V3; perfect/perfect-continuous caveat |
| 19 | Three perfect formulas/examples; tense-to-auxiliary map |
| 20 | Three perfect-continuous examples; formula; working sentence parsed into five parts |
| 21 | Four possession/breakfast examples and role contrasts |
| 22 | Perfect vs possessive question/negative pairs; four-row comparison; British have got note |
| 23 | Six HAVE identification items and six source keys |
| 24 | will/have/been/studying chain analysis |
| 25 | Three statement/question/negative triplets; First Auxiliary Rule |
| 26 | Five statements and corresponding questions; do-support explanation |
| 27 | Five-step algorithm; tennis and film examples; incorrect do-support |
| 28 | Full ten-turn Grammar Detective Club dialogue, Arabic translation, seven analyses |
| 29 | Ten correction pairs; item 7 is a variety/teaching preference, not universally ungrammatical |
| 30 | Eight identification questions; auxiliary AND main-verb subparts; eight keys (chains retained) |
| 31 | Eight MCQs, three options each, eight supplied explanations |
| 32 | Eight question transformations; eight source answers |
| 33 | Eight negative transformations; eight source answers |
| 34 | Eight function questions and keys; item 7 requires TWO roles; item 8 also notes been |
| 35 | Full A Week of Learning passage; ten questions and ten keys |
| 36 | Exactly 25 questions: five levels of five; Q8 two blanks; Q16–20 explanations; Q21–25 full Project Meeting dialogue |
| 37 | Teacher-only heading and “عرض الحلول التفصيلية”; NO actual key supplied here |
| 38 | My School Life and My Future Goals; 12–15 sentences; ten criteria; eight-sentence model; originality instruction |
| 39 | Complete BE/DO/HAVE functions and examples; first auxiliary / do-support conclusion |
| 40 | 41/120, 79 remaining; Lesson 42 CAN & COULD roadmap with seven topics and closing paragraphs; no route implementation |

### Ambiguities / grammatical review

1. §37 is only a solution-display placeholder. Any Q1–20 solutions must be labelled platform-authored, NOT quoted source. Q21–25 keys (Do, Are, Have, Did, Will) are supplied explicitly in the implementation brief.
2. §38 model has eight sentences, not 12–15; it uses emphatic **do**, not required **did**, and has no questions. Preserve the model; explain that it is partial inspiration, not a fully compliant submission.
3. §27 algorithm must be read alongside §9: linking BE makes questions directly even though termed a main verb here.
4. §29.7 “He hasn't a car” is possible, particularly in some British usage; source explicitly prefers do-support pedagogically, rather than declaring this universally wrong.
5. BE + V3 describes the introduced be-passive, not every passive construction. “closed” can be adjectival in other contexts; “every evening” supports the event reading here.
6. Preserve HAVE vs HAVE GOT alternatives. Do not claim ordinary possessive HAVE always has only one possible question/negative construction.
7. Source references Lesson 42 and a 120-lesson curriculum as roadmap prose, not registration instructions.
8. The brief's summary groups sections imprecisely (e.g. §10 is passive); actual numbered source is authoritative.

## Architecture actually used

- `src/lessons/lesson41/` — `Lesson41.tsx` (shell, navigation, slide switch), `design.tsx` (Frame41/Text41/En41/Num41/Panel41/Note41/Sentence41/Table41), `slides41.ts` (120 slides + 8 stations), `ledger41.ts` (source ledger), `source41.ts` (transcription), `practice41.ts` (66 items), `kit41.tsx` (six labs, practice card, reading, writing, summary, next), `testData41.ts` (25 questions, no keys), `TestArea41.tsx` (assessment surface), `key41.ts` (grader + `SOLUTIONS_41`), `SolutionsArea41.tsx`, `TeacherArea41.tsx`, `TeacherGuide41.tsx`, `coverage41.ts`, `data.ts`.
- `src/App.tsx` — one import, one route (`#/lesson/41`), one `CARDS` entry (`stats: "40 قسمًا · 120 شريحة قصيرة · …"`). Nothing else touched.
- Shared components reused unchanged: `SitePasswordGate` (`CloseYourEyes173`), `TeachersSpace` password constant (`somer173`), `Signature`/`SignatureGhost`, `bidi.LatinRuns`, `index.css` tokens and animations.
- Assessment isolation: `TestArea41` imports the grader only through `await import("./key41")` inside the submit handler; `SolutionsArea41` and `TeacherGuide41` are `lazy()` chunks. Verified by the esbuild chunk graph in `scripts/audit-lesson41.mjs` and by network/DOM checks in the browser audit.

## Baseline before implementation

| Command | Exit | Result |
|---|---:|---|
| `npm ci --no-audit --no-fund` | 0 | Locked dependencies installed |
| `npm run build` | 0 | Production bundle built (only the pre-existing >500 kB chunk warning) |
| `node scripts/audit-navigation-lock-overlap.mjs` (on a pristine `origin/main` worktree) | 1 | 101 passed / 5 failed — Lessons 38–39 only, i.e. pre-existing |
| `node scripts/audit-source-reveal.mjs` (same worktree) | 1 | 1 failure — `Steps38.tsx` `<details>` |
| `node scripts/audit-bidi-mixed.mjs` (same worktree) | 1 | 3 strict violations — Lesson 38 |

Those four scripts are re-run after the rebuild and produce the same failures; they are documented as baseline, not introduced here.

## Design origin

See `lesson41-design.md`: the shell, card, typography, floating step pill and motion classes are the ones already used by Lessons 1–3. No lesson-scoped CSS file exists, and `scripts/audit-lesson41.mjs` asserts that no `lesson41.css`, `--navy`, `SENTENCE ENGINE STUDIO`, `.cover41/.token41/.panel41` selector survives.
