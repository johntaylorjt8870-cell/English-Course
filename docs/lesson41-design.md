# Lesson 41 — Sentence Engine Studio

## New generation, scoped to one lesson

Lesson 40's cream/teal/ochre editorial treatment is unchanged. Lesson 41 uses a midnight structural masthead, a dark sentence-blueprint cover, an indigo interaction vocabulary, cyan first-auxiliary accents and neutral reading surfaces. There are no decorative gradients, glows, background images or animation dependencies in the lesson. The home card uses the existing hub gradient extension point only.

All new CSS selectors are scoped beneath `.lesson41`. Shared components, global typography, other lessons and site access remain untouched. `Signature` is reused above the lesson; the site's pre-existing shared signature and lock button are outside the lesson contrast scope.

## Tokens

| Token | Value | Purpose / paired surface |
|---|---|---|
| ink | `#17243b` | Primary text on white / paper |
| muted | `#4d5c72` | Secondary labels; readable disabled text |
| navy | `#101c32` | Structural masthead and cover; white text |
| paper | `#f4f6fa` | Canvas and English example surfaces |
| white | `#ffffff` | Explanation and activity panels |
| line | `#ccd4e1` | Non-semantic separators; not a text color |
| indigo | `#4338a5` | Selected engine, primary actions, visible focus |
| indigo-soft | `#eeecff` | Selected / auxiliary surface |
| teal | `#086373` | Eyebrows, progress, first auxiliary label |
| cyan | `#77e9ec` | Cover accent on navy, not text on white |
| cyan-soft | `#e8f9fa` | First auxiliary surface |
| amber | `#825000` | Main verb / reference text |
| amber-soft | `#fff3d9` | Main verb and reference surface |
| green / green-soft | `#176343` / `#eaf6ef` | Correct construction or post-attempt comparison |
| red / red-soft | `#a02639` / `#fff0f2` | Error feedback, with explanatory text |
| disabled | `#e4e8ef` | Locked/disabled background; muted text |

Normal text targets at least 4.5:1. Static token calculations and browser computed-style checks cover text/control foregrounds against ancestor backgrounds. The final browser report records the observed minimum (at least 5.53:1 in this run). These measurements do not claim to certify third-party/shared UI or substitute for visual inspection.

## Semantic roles: never color alone

- **Subject:** neutral token explicitly labelled الفاعل.
- **Auxiliary:** indigo token explicitly labelled مساعد.
- **Main verb:** amber token explicitly labelled رئيسي.
- **First auxiliary:** cyan-soft token, heavier border, explicit المساعد الأول label.
- **Verb form:** outlined neutral token with a literal V1/V3/V-ing label where relevant.

In the Future Perfect Continuous builder, **will alone** is marked first; have and been are separate auxiliaries. In the role lab, two occurrences of DO have separate questions, and the experiment item asks for both roles.

## Typography and spacing

- Lesson font stack: Arial, Tahoma, sans-serif; no new font download dependency. Shared `Rich` English runs retain the platform direction conventions, with a lesson-local font-family override to inherit this system stack.
- Body 17px desktop / 16px mobile, generous 1.85 line height; examples 17/16px.
- Editorial h1 26–42px; cover 32–52px; section titles 23–32px.
- Label/eyebrow sizes 12px; subordinate token labels 10px (not instructions or body text). Core controls are at least 46px high.
- Main spacing units: 8/12/16/20/24/28/32px; 20px primary card radius, 10–14px controls and exercise cards.
- Desktop: 230px station rail + flexible main column, maximum 1280px shell. Below 850px the rail becomes a labelled expandable navigation panel. At 375px engine tabs stay three columns while comparison cards stack; tables scroll inside their own container.
- Source table headings and row content are genuine table markup. Long source explanations are native section steps, not one long route-level article.

## Interaction states

- Selected: indigo border/background + `aria-pressed` or `aria-current`.
- Focus: 3px outline with 4px offset; cyan outline for links on the dark masthead.
- Hover: indigo boundary; active: cyan-soft surface; no transforms that shift content.
- Disabled/locked: actual disabled controls, readable text, explicit locked label.
- Error: red surface + rule explanation, not color alone.
- Success: explanatory text; free-text practice explicitly says comparison is **not automatic correctness**.
- Reduced motion: transitions disabled. Step navigation scrolls without animation.
- Navigation ignores arrow shortcuts while focus is inside a control. Section headings receive programmatic focus after navigation. Visited-step progress explicitly does not imply mastery.

## BIDI

Reuse `Rich`/LatinRuns for mixed prose and explicit LTR isolation for English lines, formulas, options, counters and tokens. For plain mixed runs, Text41 reuses the shared splitMixedText parser and keeps boundary whitespace outside the LTR isolate. Complex glossary/alternative groups still use Rich unchanged. This fixes touching Arabic/English boundaries locally without changing the shared parser. Two-digit section numbers cannot shrink/wrap. No Unicode bidi override/invisible direction characters are introduced.

## Authored additions versus source

The cover's “Small verbs. Extraordinary power.” line, labelled diagrams, selectors, builders, correction explanations, counters, delivery guide and rubric are platform-authored enhancements. The complete supplied source is retained in the ledger and integrated into the ordered section flow. Practice source keys are attempt-bound; final keys are in a separate lazy module. All exact source/unit destinations are listed in `lesson41-coverage.md`.

## Browser review

See `lesson41-visual-verification.md` and `lesson41-visual/verification.json` for actual Chromium execution, screenshots, viewports, fixes and limitations. This is not a design claim based only on JSDOM.
