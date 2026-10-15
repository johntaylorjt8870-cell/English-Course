# Lesson 41 — preflight and source-readability audit

**Status: implemented; final validation recorded.** The preflight below was completed before coding and its baseline was preserved. See `lesson41-validation.md` for implementation results, `lesson41-coverage.md` for all 883 source units, and `lesson41-visual-verification.md` for actual Chromium evidence.

## Inspection completed before implementation

- Session branch: `arena/c285c802-english-course` (fixed by Arena; independent of prior lesson branches).
- HEAD and fetched `origin/main`: `e7a2e473c0c1062a42d723af18c80e0048ddd159`.
- PR #52: **MERGED**, 2026-10-14T23:52:26Z, into main; verified with `gh pr view 52`.
- All open PRs inspected: #41, “Repair BIDI boundaries, assessment reset state, and teacher navigation”. Its changes span old lessons/shared BIDI/tests. None imported or modified.
- No merge, branch deletion, branch switch, or unrelated push performed.

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

## Existing architecture and reusable elements

Inspected Lessons 38–40: each has a native step index, chapter grouping, independent student/test/solutions/teacher areas, parent-owned test answers/submission/unlock state, lazy solutions and teacher guide. Lesson 40 uses 30 steps and an editorial cream/teal/ochre palette. Earlier lessons must remain untouched.

- `src/App.tsx`: explicit imports/routes and CARDS array, shared LessonNumberNav; navigation derives length from cards. Add only Lesson 41 import/card/route.
- Shared `Rich`/`En` and underlying LatinRuns supply mixed-direction isolation; reuse rather than global BIDI rewrites.
- Shared `Signature` supplies attribution/contact; do not duplicate contact strings.
- Teacher access in recent lessons is a client-side password comparison followed by lazy guide render. Preserve the existing password. This is a pedagogical gate, NOT server-side security: determined users can inspect public bundles. Lazy imports prevent ordinary initial loading, not authorized server enforcement.
- Test submission convention is manual comparison in Solutions Area, not automatic grading of free text. Preserve completed-test requirement and reset relocking.
- Source-reveal audit forbids student “show original text” panels; integrate source into steps/attempt-bound feedback, not a raw-source toggle.
- Vite has preview-compatible host settings; base is `/English-Course/`; dynamic imports are supported (single-file plugin is not enabled).
- Existing audit scripts: direction/static and bidi rendering, render-direction, lesson-navigation, final-test, final-test-coverage, source-reveal, mixed-BIDI, lesson38–40. Older generic final-test coverage does not exercise new lesson architecture; targeted audit needed.
- No tsconfig, lint script, or generic test npm script exists. Typecheck command below is explicit/reproducible.

## Baseline before implementation

| Command | Exit | Result |
|---|---:|---|
| `npm ci` | 0 | Installed locked dependencies |
| `npm run build` | 0 | Production bundle built |
| `npm run audit:lesson40` | 0 | Existing latest-lesson audit passes |
| `npx tsc --noEmit --jsx react-jsx --module esnext --target es2022 --moduleResolution bundler --allowSyntheticDefaultImports --skipLibCheck src/main.tsx` | 2 | 179 pre-existing TS diagnostics; lessons 6, 10, 11, 14, 18, 21, 24, 27, 28 |

Full baseline diagnostics: `docs/lesson41-baseline-typescript.txt`. Other existing checks must be recorded individually during validation, not assumed passing from this baseline.

## Planned implementation / affected files

Lesson-specific `src/lessons/lesson41/` modules for source ledger/coverage, steps, labs, practice, independent test data/component, lazy solutions and teacher guide, local kit and CSS. Add `scripts/audit-lesson41.mjs`, npm audit command, docs and three App integration points. No shared design replacement, changes to Lessons 1–40, or Lesson 42 registration.

Design direction: **Sentence Engine Studio** — midnight structural shell, spacious neutral explanation panels, indigo selection, cyan first-auxiliary markers and restrained amber challenge accents. Editorial cover plus sentence-machine diagrams; labeled semantic tokens (subject, auxiliary, main verb, V1/V3/V-ing) never color alone. Compact chapter rail and source-section pagination. Scoped CSS and reduced-motion-safe interactions. Required new components: engine explorer, role classifier, transformation/form builders, first-auxiliary chain analyzer, attempt-gated correction cards, reading lab, writing counter/checklist, and independent assessment surfaces. Real-browser status must be reported from actual evidence, not JSDOM.
