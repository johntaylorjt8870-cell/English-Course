# Lesson 42 — Language Control Lab

## New generation, scoped to one lesson

Lesson 41's midnight "Sentence Engine Studio" identity is unchanged. Lesson 42 is a different instrument: a warm-paper **control-room** built around two signal channels — orange `CAN` (present ability) and fuchsia `COULD` (past ability / politeness). Dark instrument panels, monospace readouts and dial rows carry the "lab" idea; no decorative gradients, glows, background images or animation dependencies are used. The home card uses the existing hub gradient extension point only.

All new CSS selectors are scoped beneath `.lesson42`. Shared components (`Rich`, `LatinRuns`, `splitMixedText`, `LessonNumberNav`, `SitePasswordGate`, `Signature`), global typography, other lessons and site access remain untouched.

## Tokens

| Token | Value | Purpose / paired surface |
|---|---|---|
| ink | `#1C1A17` | Primary text on paper / white |
| muted | `#5B554B` | Secondary labels; readable disabled text |
| canvas | `#F4F1EA` | Warm paper canvas |
| surface | `#FFFFFF` | Explanation and activity panels |
| paper-2 | `#FBF8F1` | Source-quote surfaces |
| line / line-strong | `#E9E3D6` / `#C9C1B0` | Non-semantic separators (not text colors) |
| panel | `#14110D` | Instrument panels, cover, masthead; white text |
| panel-2 | `#241F18` | Nested panel rows; signal text |
| primary | `#C2410C` | CAN channel, primary actions, visible focus |
| primary-ink | `#9A3412` | Primary text on soft orange surfaces |
| primary-soft | `#FDECE1` | CAN surface |
| secondary | `#A21CAF` | COULD channel |
| secondary-ink | `#86198F` | COULD text on soft fuchsia surfaces |
| secondary-soft | `#FBEAFB` | COULD surface |
| signal | `#F5B301` | Panel accent (never text on paper) |
| ok / ok-soft | `#14663C` / `#E6F3EB` | Correct construction, post-attempt comparison |
| bad / bad-soft | `#A4133C` / `#FCEAEF` | Error feedback with explanatory text |
| note / note-soft | `#3F4A54` / `#EEF1F4` | Neutral informational chips |

Normal text targets at least 4.5:1. 33 static token pairings are asserted in `scripts/audit-lesson42.mjs`; the browser audit measures computed styles on every rendered state and records the observed minimum (4.59:1 in this run). These measurements do not claim to certify third-party/shared UI or substitute for visual inspection.

## Structure

- **Masthead + lesson header** — instrument-panel masthead, `42` badge, visit counter, four-area navigation (التعلم / الاختبار / الحلول · مقفلة / المعلم).
- **Station rail** — ten stations, each with a per-station section list; the rail is the single source of step navigation and is mirrored by a mobile toggle.
- **Step shell** — every step renders `data-source-section` (`cover`, `s01`…`s44`) so coverage is auditable in the DOM. Mixed source headings such as «CAN vs COULD — مقارنة القدرة» render as two isolated lines (English label + Arabic title) under the shared BIDI contract.
- **Panel tones** — rule / example / compare / dialog / drill / challenge / lab / read / write / plain, applied per pedagogical function.

## Responsive behaviour

- ≥ 1200px: cover splits into two columns; the lesson body is a grid with a sticky station rail beside the content column.
- ≤ 850px: the body collapses to one column and the station rail moves behind the mobile toggle; panels stack.
- ≤ 500px: dial rows, option grids, the checklist and the writing surface become single-column; the 46px minimum control height is preserved.
- Verified in Chromium at 1280×900 and 375×812 with no horizontal overflow in any of the 99 measured states.

## Accessibility

- Every interactive control has an accessible name (button text or `aria-label`); every field is wrapped in a `<label>`.
- `aria-pressed` on channel/subject/verb toggles, `aria-current="step"` on the active section, `role="status"` on all feedback, `role="alert"` on the teacher-password error.
- `aria-controls` / `aria-labelledby` / `aria-describedby` targets resolve (asserted in both the DOM and browser audits).
- Visible 3px focus ring on all focusable elements; `prefers-reduced-motion` disables transitions.
- RTL document with explicit `dir="ltr"` isolation on every English run; the full-course BIDI crawl reports zero violations for Lesson 42.

## Provenance labelling

Platform-authored material is labelled in the UI (`شرح المنصة`, `إضافة المنصة`, `PLATFORM-AUTHORED`, `DELIVERY GUIDE / PLATFORM-AUTHORED`). Source material is rendered from `source42.ts` without alteration beyond the documented normalization in `docs/lesson42-coverage.md`.
