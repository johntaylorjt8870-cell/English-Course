# Lesson 36 — WILL vs BE GOING TO: source-coverage ledger

## Base and provenance

- Planned lesson route: `#/lesson/36`.
- Lesson title: **Lesson 36 — WILL vs BE GOING TO**.
- English subtitle: **Mastering Future Decisions & Predictions**.
- Arabic subtitle: **إتقان التعبير عن المستقبل — المقارنة الشاملة والتطبيق العملي**.
- Level: **تأسيسي متقدم — IQ200**.
- Source of truth: the complete Lesson 36 text supplied in the implementation request.
- Preserve the source order. The supplied opening before `1. أهداف الدرس` is an unnumbered introduction/cover; the 26 numbered source sections remain numbered 1–26 and receive IDs `s01`–`s26`.
- Native student sequence: `cover`, then `s01`–`s26` in source order. Sections 22 and 23 keep their assessment/solutions content in the separate Test and Solutions Areas; their student steps are navigable launch/transition steps. The original 25 questions live once in the Test Area, not in a second practice copy.
- Formal test answer explanations are platform-authored teacher additions: source section 23 contains only its heading and `عرض الحلول التفصيلية`, not a supplied key.

## Shell, layout, and direction contract

- The lesson renders inside the real shared `src/shared/Lesson1Shell.tsx` (`rootDataShell="lesson-1"`), exactly like the other numbered lessons. There is no local shell, rail, drawer, or prev/next implementation under `lesson36/`.
- `Lesson1Shell` also supplies the progress header, the mobile drawer and its trigger, the floating step navigation, and the site-lock slot; the lesson only passes step groups, labels, counters, and handlers.
- No lesson-specific CSS file, palette, or font is introduced. All surfaces use the shared Tailwind tokens and the shared `Signature`/`SignatureGhost` artwork.
- English inside Arabic prose is isolated with the shared direction utilities: whole English lines go through the shared `En` component, and mixed lines wrap every Latin run in an LTR island (`dir="ltr" lang="en"`, `unicode-bidi: isolate`) while keeping every source character — including the spaces around the run — unchanged.
- Headings keep the supplied `&` (`Mastering Future Decisions & Predictions`); the HTML entity from the prompt is never shown literally.

## Pre-implementation source audit notes

1. Section 3's source table is malformed in the supplied Markdown/plain-text layout. Reconstruct it as a semantic HTML table, preserving the two exact headers and all eight intended category/form pairs below; do not infer additional rows.
2. Section 23 promises detailed answers but supplies no answer key. Create a complete 25-question key, clearly marked **platform-authored teacher addition**, and keep it in the gated Solutions/Teacher experience.
3. The heading `Mastering Future Decisions &amp; Predictions` is HTML-escaped in the prompt. Render the intended visible ampersand (`&`) and do not show the literal entity.
4. No other source wording is to be silently corrected. Grammar teaching must describe typical/contextual choices and valid overlap, not make either form categorically wrong in ambiguous contexts.

## Coverage ledger — all 26 numbered sections and sub-items

| Source | Exact native location | Required source units / coverage contract | Practice, test, or answer-key destination |
|---|---|---|---|
| Unnumbered opening | `cover` | Title; English and Arabic subtitles; level; complete bridge from Lesson 34 (WILL) and Lesson 35 (BE GOING TO); known-form recap; question “فكيف تختار؟”; purpose, context, intended meaning, and promise not to reteach the two lessons from scratch. | Student opening step. |
| §1 أهداف الدرس | `s01` | The introductory line and all **10** objectives, individually: spontaneous/prior decision; general/evidence-based prediction; promises/offers/requests; overlap; natural dialogue; time-expression caution; negative/question/Wh forms; paragraph analysis; advanced challenges; integrated writing. The verbatim supplied objective wording remains in the ledger. | Student objectives step; teacher overview. |
| §2 السؤال الذهبي | `s02` | Both exact computer sentences; Arabic target sentence; explicit grammatical acceptability of both; friend’s sudden repair-failure context and `Then I'll buy a new computer.` + translation; prior saving/research/choice context and `I'm going to buy a new computer next month.` + translation; explicit explanation that decision timing, not `buy` or `next month`, changes the emphasis. | Context-first A/B choice; reveal only after an attempt. |
| §3 الخريطة الأساسية | `s03` | Two exact headers; eight rows: decision-at-speaking-time/WILL; prior plan or intention/BE GOING TO; promise/WILL; spontaneous offer/WILL; opinion/belief prediction/WILL; prediction emphasizing present evidence/BE GOING TO; willingness/readiness question/WILL; intention/plan question/BE GOING TO; exact warning that these are common teaching choices, not prohibitions in overlapping contexts. | Accessible semantic table (`scope="col"`/`scope="row"`); contrast interaction. |
| §4 القرار اللحظي vs الخطة المسبقة | `s04` | Spontaneous flashlight scenario, `I'll get a flashlight.` and Arabic; the complete chairs dialogue and both Arabic translations; decision-now explanation; prior one-week room plan, `I'm going to reorganize my room on Friday.` + translation; school newspaper decision and first issue dialogue + translation. | Dialogue/context inspection; reveal the “decision now / plan earlier” labels after learner action. |
| §5 مختبر القرار | `s05` | Both `cook` situations/dialogue lines, forms and explanations; both `study` situations, schedule detail and explanations; final explicit challenge that the verb itself does not determine the construction. | Two context-first pairs; learners select before explanation. |
| §6 التوقع العام vs دليل حاضر | `s06` | All three WILL belief examples and Arabic translations (online education, scientists/new materials, exhibition); glass-at-edge + approaching-child evidence and warning + translation; exhausted runner example + translation. | Evidence-to-prediction interaction; keep every source example visible. |
| §7 هل الدليل يجعل WILL خطأ؟ | `s07` | Both cloud/rain sentences and translations; answers to “لا”; overlap explanation; no false ban on WILL with evidence or GOING TO without visible evidence; exact emphasis contrast (general belief vs clear present evidence). | Compare two valid formulations; response/reveal explains emphasis, not a rigid rule. |
| §8 الوعود والعروض | `s08` | Calculator promise + translation; negative privacy promise + translation; both offers of help; previously planned neighbor-painting assistance + translation; explanation of speech-time promise/offer vs prior plan. | Promise/offer vs prior-plan sorting with explanations. |
| §9 WILL YOU / ARE YOU GOING TO? | `s09` | Both forms and Arabic glosses; willingness/readiness/request vs intention/plan; technician examples with translations; full printer/technician dialogue and short answer; tomorrow plan dialogue. | Technician dialogue analysis; distinction shown after choice. |
| §10 Tomorrow لا تعني WILL | `s10` | Both correct aunt-visit examples; explanation; all seven time expressions (`tomorrow`, `tonight`, `next week`, `next month`, `next year`, `soon`, `later` — preserve every supplied token); timing vs intention/reason distinction. | Context pair selection; do not implement a keyword-to-tense rule. |
| §11 مراجعة بنائية | `s11` | Exact positive, negative, question, and short-answer patterns for both constructions; all supplied forms/examples (`Subject + will + V1`, `won't`, `Will + Subject + V1?`, `am/is/are + going to`, `not`, inversion, yes/no answers). | Semantic HTML formula groups with isolated LTR runs. |
| §12 أسئلة Wh | `s12` | All six exact English questions, all six Arabic translations, and the note that meanings may converge while GOING TO often foregrounds plan/intention. | Pair comparison; no fabricated absolute distinction. |
| §13 WILL BE / GOING TO BE | `s13` | Both difficult-exam examples and translations; ready-in-ten-minutes and software-engineer examples and translations; both incorrect forms; both corrected forms. | Sentence repair with source examples preserved. |
| §14 The Unexpected Problem | `s14` | All eight Lina/Omar turns in original order; every Arabic translation line; all six original analysis points (check, finish, stop, what-do, backup plan, connect). | Full dialogue, LTR-isolated; optional turn-by-turn purpose selector. |
| §15 IQ200 overlap | `s15` | Both potentially overlapping pairs; all supplied comments on expectation, evidence, intention/plan, promise/confirmation/announcement; explicit instruction not to manufacture a difference where context does not establish one. | Compare-two-valid-sentences activity; accepts nuanced reasoning. |
| §16 Context Laboratory | `s16` | All four travel situations; all four exact example sentences; spontaneous decision, prior booking, general tourism prediction, and evidence/information-based inference explanations. | Four context-first choices with post-attempt reasoning. |
| §17 Grammar Detective | `s17` | All **10** original errors, in order; every supplied correction and alternative; both glass sentences and the explanation that WILL remains grammatical though GOING TO is more typical for foregrounded evidence; both alternatives for item 10. | Ten-item repair workshop; learner attempts before each answer appears. All answer material is separately captured in the source ledger and exposed only after the attempt. |
| §18 اختر الصيغة الأنسب | `s18` | All **8** prompts/contexts, answers, and exact supplied explanation labels: spontaneous offer; prior plan; present evidence; promise; opinion; spontaneous decision; prepared plan; collision evidence. | Eight question practice; answer key revealed after attempt. |
| §19 أكمل الحوار | `s19` | Full Sara/Adam dialogue, all four blanks and verb cues; all four supplied answer forms; all four explanations, including the schedule/evidence note that does not prohibit WILL. | Fill-in dialogue; answer key and explanations after attempt. |
| §20 غيّر المعنى | `s20` | Both target sentences; both task instructions; both complete model contexts; final explanation that context—not verb substitution—changes which form is natural. | Writing/context builder; do not auto-score a variable open response. |
| §21 Robotics reading | `s21` | Complete original reading passage, title and every dialogue line; all **7** comprehension questions and all **7** supplied answers; all **8** grammar-analysis items. | Readable LTR passage; optional grammar inspection; questions/answers appear after the learner attempts; teacher copy retains full source key. |
| §22 Master Test | `s22` + Test Area | Test title and instruction; exactly **25** supplied questions, no additions: Level 1 Q1–5 MC; Level 2 Q6–10 fill; Level 3 Q11–15 repair; Level 4 Q16–20 meaning/explanation; Level 5 Q21–25 open response. Preserve all choices, wording, contexts, and task instructions. | Dedicated Test Area; neutral before submission; keys are not in the student-step/test component state. |
| §23 الحلول التفصيلية | `s23` + Solutions Area | Preserve heading and `عرض الحلول التفصيلية`. Record explicitly that the source supplies no actual answer key. | Solutions Area supplies **25** complete platform-authored answers/explanations; gated until test submission (or teacher unlock). |
| §24 Writing Mission | `s24` | Exact title; 12–15 sentence requirement; all 8 criteria; complete model opening, line by line; final instruction to complete with own ideas and connect each form to meaning. | Student writing workspace with non-judging sentence counter/checklist; teacher rubric. |
| §25 Golden Summary | `s25` | Both exact formulas; all five WILL uses; both source WILL examples; both GOING TO uses and both examples; all five final decision questions and the final overlap/emphasis question; concluding distinction. | Student summary step; no omissions. |
| §26 Curriculum Map | `s26` | All four present systems; all four past systems; all three future entries and exact completion status; Lesson 37 title/preview; exact example and translation; full link-back to Present/Past Continuous; uses/questions/negation/comparisons preview; concluding transition. | Student final step; no earlier completion status inferred or changed. |

## Table reconstruction contract for §3

Render this accessible table in the source order shown. No additional rows are permitted.

| الموقف (exact source category) | الصيغة النموذجية (exact source form) |
|---|---|
| قرار اتُّخذ في لحظة الكلام | WILL |
| خطة أو نية موجودة مسبقًا | BE GOING TO |
| وعد | WILL |
| عرض مساعدة لحظي | WILL |
| توقع مبني على رأي أو اعتقاد | WILL |
| توقع نبرز فيه دليلًا حاضرًا | BE GOING TO |
| سؤال عن استعداد شخص للقيام بشيء | WILL |
| سؤال عن خطة أو نية شخص | BE GOING TO |

## Test and answer provenance contract

- The supplied Master Test has exactly 25 questions in five groups of five (Q1–5, Q6–10, Q11–15, Q16–20, Q21–25).
- Q21–25 are open-ended and remain open-ended. They are not converted to multiple choice and are not machine-scored as objectively unique.
- Section 23 has no source answers. All 25 detailed solutions are additions authored for this platform, labeled as such, and separately gated from the test-taking surface.
- If a source context admits another grammatical answer, the teacher key says whether it is (1) incorrect, (2) possible but less natural for the stated context, or (3) an acceptable alternative with a different emphasis.

## Planned audit contract

`scripts/audit-lesson36.mjs` exercises the source ledger, exact counts and representative source strings, all section-to-step mappings, reconstructed table rows, guided answer counts, reading counts, the five test boundaries and 25 detailed solutions, separation/gating of Student/Test/Solutions/Teacher, writing criteria/model, route/navigation registration, keyboard navigation, form submission, and English-direction/contrast contracts. It renders and exercises the relevant interactions rather than treating headings alone as proof of coverage: every lab is opened (an option is chosen, an answer is typed, the supplied explanation is revealed) and the rendered text is compared with the ledger line by line. Inline-blank dialogue lines are checked as prompt segments around their live input. The current audit reports 795 assertions.
