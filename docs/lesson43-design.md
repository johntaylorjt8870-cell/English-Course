# Lesson 43 — The Probability Observatory — مختبر الاحتمالات اللغوي

## A new instrument for a different verb family

Lesson 42's warm-paper Control Lab is untouched. Lesson 43 is its own instrument: a night-sky **observatory** for the probability modals MAY and MIGHT. The lesson's central scientific claim — the source explicitly refuses to pin percentages on MAY vs MIGHT — is carried into the visual identity: the probability spectrum is **qualitative only** (five named bands, no numbers anywhere), and the two modal channels are drawn as parallel observation bands rather than a ranked scale:

- **MAY channel** — teal `#0E7C7B` (ink `#0A5A59`, soft tint `#E2F3F2`)
- **MIGHT channel** — amber `#B45309` (ink `#7C3A06`, soft tint `#FBEFDF`)
- **Signal** `#FCD34D` accents dark panels only (never small text on light surfaces)

All selectors are scoped beneath `.lesson43`. Shared components (`Rich`, `LatinRuns`, `splitMixedText`, `LessonNumberNav`, `SitePasswordGate`, `Signature`), global typography, other lessons and site access remain untouched.

## Tokens

| Token | Value | Purpose / paired surface |
|---|---|---|
| canvas | `#0B1030` | Deep-indigo night sky; light text only |
| surface | `#F7F6FC` | Observation-deck cards; dark ink text |
| ink / muted | `#1B1C33` / `#4B5070` | Primary / secondary text on light surfaces |
| panel / panel-2 | `#12173A` / `#1E2550` | Dark instrument panels (lab/example tones, cover, masthead) |
| panel-text / panel-muted | `#E9EBF8` / `#B9BFE4` | Text on dark panels |
| line / line-strong | `#D8D6E8` / `#A9A5C6` | Non-semantic separators |
| may / may-ink / may-soft | `#0E7C7B` / `#0A5A59` / `#E2F3F2` | MAY channel |
| might / might-ink / might-soft | `#B45309` / `#7C3A06` / `#FBEFDF` | MIGHT channel |
| signal | `#FCD34D` | Panel accents, big numerals (never small text on light surfaces) |
| ok / ok-soft | `#166534` / `#E5F3E9` | Correct feedback |
| bad / bad-soft | `#B91C1C` / `#FBE7E7` | Error feedback |
| note / note-soft | `#3F4A5A` / `#EEF1F7` | Neutral chips |

45 static token pairings are asserted in `scripts/audit-lesson43.mjs`; the Chromium browser audit measures computed styles on every rendered state and records the observed minimum (**5.015:1** across 85 measured states, both viewports — above the 4.5:1 AA floor). These measurements do not claim to certify third-party/shared UI or substitute for visual inspection.

## Structure

- **Masthead + lesson header** — observatory masthead, `43` badge, visit counter, four-area navigation (التعلّم / الاختبار / الحلول · مقفلة / المعلم).
- **Station rail** — eleven stations (الانطلاق، قناة MAY، قناة MIGHT، النفي، الاستئذان، مختبر MAYBE، احتمال الماضي، الأفعال الأربعة، الحوار والتطبيق، القراءة والتقييم، الكتابة والخريطة), each with a per-station section list; the rail is the single source of step navigation and is mirrored by a mobile toggle.
- **Step shell** — 38 steps; step index equals source section number (cover = 0), so the station map and the coverage ledger share one coordinate space. Every step renders `data-source-section` (`cover`, `s01`…`s37`). Mixed source headings render English and Arabic as isolated lines under the shared BIDI contract.
- **Panel tones** — rule / example / compare / dialog / drill / challenge / lab / read / write / plain, applied per pedagogical function. Dark tones (lab, example) carry light text; light tones carry ink text.

## The nine required interactions

| # | Interaction | Where |
|---|---|---|
| 1 | **Probability Explorer** — qualitative spectrum (مؤكد / مرجح / ممكن / بعيد / مستحيل), five bands, no percentages anywhere | §2 |
| 2 | **Modal Sentence Builder** — subject + MAY/MIGHT + V1 chips, with the negation and question forms named | §3 |
| 3 | **Context Detective** — the 11-turn §26 dialogue rendered turn-by-turn, eight analyzed uses tagged | §26 |
| 4 | **Permission Studio** — formality ladder (Can I < Could I < May I < Might I) plus five scenario dials | §15–17 |
| 5 | **Maybe / May Be Lab** — six dual-labeled items (§19 · §29) classifying adverb vs verb pair | §18–19 |
| 6 | **Past Possibility Analyzer** — now → future → past path, MAY HAVE / MIGHT HAVE + V3 decomposition | §20–23 |
| 7 | **Error Repair** — ten broken sentences, attempt-gated, each repair names what changed and why | §31 |
| 8 | **Reading Challenge** — *The Unexpected School Trip* passage in full, ten attempt-gated questions | §32 |
| 9 | **Writing Mission** — ten-item checklist (eight source criteria + length + classification challenge) persisted in the workspace; the model paragraph is labelled as a platform addition; prose is honestly not auto-graded | §35 |

Additional engines: observation dial (§5), transformation consoles for negative/question forms (§4, §10), MAYBE/MAY BE composer (§7), modal family intro (§8), swap lab for MAY ↔ MIGHT interchangeability (§11), negation lab (§12–14), WILL-vs-MAY comparison (§6), MAY NOT vs MUST NOT comparison (§14), four-modal matrix (§24), six-question decision guide (§25), golden summary cards (§36) and a roadmap panel (§37) that names Lesson 44 as prose only — no Lesson 44 page, route or content exists.

## Responsive behaviour

- ≥ 1200px: cover splits into two columns; the lesson body is a grid with a sticky station rail beside the content column.
- ≤ 850px: the body collapses to one column and the station rail moves behind the mobile toggle; panels stack.
- ≤ 500px: dial rows, option grids, the checklist and the ladder become single-column; the 46px minimum control height is preserved.
- Verified in Chromium at 1280×900 and 375×812 with no horizontal overflow in any of the 85 measured states.

## Accessibility

- Every interactive control has an accessible name (button text or `aria-label`); every field is wrapped in a `<label>`.
- All nine interactions are keyboard-usable (native buttons, radios, selects, textareas, checkboxes) and touch-usable (46px minimum targets).
- Arrow-key step navigation (← next / → previous in the RTL layout) is provided in the student area, guarded against interference with form fields.
- Answer state persists across step navigation through the lesson workspace, matching the course-wide convention.
- WCAG AA contrast (≥ 4.5:1) is asserted statically on the palette and measured on computed styles in real Chromium, including hover, pressed, disabled and feedback states.
