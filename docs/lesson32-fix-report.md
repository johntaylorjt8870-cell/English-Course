# Lesson 32 — Corrective Pass Report

## TL;DR

| | Before (merged PR #61) | After (corrective) | Change |
|---|---:|---:|---:|
| Lesson content width @ 1440px | **1024 px** | **1120 px** | **+96 px (+9.4%)** |
| Lesson content width @ 1280px | **992 px** | **992 px** (single‑row header) | 0 px width; **header no longer wraps** |
| Top journey strip (per step) | n/a | 10-section roadmap | new visual identity |
| Hero band on cover | n/a | gradient + wave SVG + formula pill | new cover identity |
| Side rail bottom wave | n/a | scalloped wave divider | new identity |
| Frame side accent stripe | n/a | 8 px indigo→aqua→cyan→coral | new identity |

All measurements taken from the running app via `getBoundingClientRect()` at 1440×900 / 1280×800.

## 1. Root cause of the width regression (diagnosed before any change)

The pre-rebuild Lesson 32 (`9830573…`) wrapped its full page in `mx-auto max-w-6xl` (1152 px), and inside that the sidebar (`280 px`) and the main column (`minmax(0, 1fr)`) shared the 1152 px — so the right pane was ~872 px wide on a 1440 px viewport, and the page chrome itself used the full viewport width.

PR #61 rebuilt Lesson 32 as a compact-header shell:
- root: `h-screen flex flex-col overflow-hidden` (full-viewport lock)
- always-visible right sidebar at `w-72` (288 px) inside `lg:flex`
- the main pane (1440 − 288 = 1152 px) wrapped the content in `mx-auto w-full max-w-5xl` (**64 rem = 1024 px**)
- left/right padding on `<main>` was `px-2.5` (10 px each side)

The actual main-pane width was therefore **1152 px** but the visible lesson area was capped at **1024 px**, leaving ~64 px of empty space on each side. At narrower laptops the content kept shrinking because the `h-screen` shell forced the chrome onto the same horizontal budget as before, but the inside was re-constrained.

Concretely:
- The page chrome (site header + lesson compact header + sidebar + FAB buttons) did not change shape.
- The lesson content area was narrowed by `max-w-5xl` on the inner wrapper.
- The teaching cards themselves used generic Tailwind shapes (rounded-[1.75rem], border-2, p-5 md:p-9) with only colour differentiation, so the visual rebuild read as "same cards, different colours."

## 2. What changed in this corrective pass

Scope: **only `src/lessons/lesson32/{Lesson32.tsx, Steps32.tsx, lesson32.css}`**.
All other lessons, the shared kit, and the test/source data are untouched.

### 2.1 Lesson32.tsx — usable width & responsive header

| Change | File | Effect |
|---|---|---|
| `mx-auto w-full max-w-5xl` → `mx-auto w-full max-w-[76rem]` | Lesson32.tsx | Inner content area cap raised from 64 rem (1024 px) to 76 rem (1216 px); at 1440 px viewport the inner wrapper fills the 1152 px main pane (with `px-3 sm:px-4` padding) so the lesson area is **1120 px**, not **1024 px** |
| `px-2.5` → `px-3 sm:px-4` on `<main>` | Lesson32.tsx | Spacious lateral breathing room at ≥ 640 px (16 px each side), 12 px on phones |
| `flex-wrap` + `order-last md:order-none md:flex-1` on the tab nav → `ms-auto` + `flex shrink-0` | Lesson32.tsx | Header tabs stay on a single row at 1280 px (previously they wrapped into a second row with the side rail still on screen) |
| Progress bar narrowed: `md:w-44` → `xl:w-40` (added `w-24` at `sm`) | Lesson32.tsx | Progress bar smaller on narrow screens so the chip + bar + % + tabs + exit fit one row at ≥ 1280 px |
| Added `l32-journey` strip at the top of every step (10-section roadmap with past / now / future states) | Lesson32.tsx (SlideView32) | Per-step position in the lesson; visible identity on every step, not just on the cover |

### 2.2 lesson32.css — distinctive identity for Lesson 32

New classes added (all scoped under `.lesson32` so they cannot bleed into another lesson):

- `.l32-journey` / `.l32-journey-dot` / `.l32-journey-past` / `.l32-journey-now` / `.l32-journey-future` / `.l32-journey-link` — the 10-section journey strip with a thin animated current bar, three clear states, and gradient dividers.
- `.l32-hero` / `.l32-hero-band` / `.l32-hero-meta` / `.l32-hero-eyebrow` / `.l32-hero-title` / `.l32-hero-formula` / `.l32-hero-aside` / `.l32-hero-mark` / `.l32-hero-body` — the cover-step hero band: gradient background, wave divider, formula pill, animated SVG wave mark.
- `.l32-frame > section::before` — 8 px gradient side accent (indigo → aqua → cyan → coral) on every Frame card, with matching corner rounding. This is the Lesson-32 colour identity applied to every teaching card.
- `.l32-rail-head::after` — scalloped wave divider at the bottom of the side-rail header (and matched on `.l32-hero-band::after`).
- Tighter responsive tweaks: hero padding shrinks on phones; progress/header strip widths are clamped so they don't wrap.

No styling was moved out of the `.lesson32` scope. Other lessons are untouched.

### 2.3 Steps32.tsx — Cover hero

The cover step now renders inside a `<section className="l32-hero">` with:
- Hero band (gradient + wave SVG mark + eyebrow + title + formula pill)
- Stream timeline inside the hero body
- Keyword chips (`for`, `since`, `how long`, `been`, `V-ing`, `all day`)
- Three badges: source (من المصدر), 40-step count, and a new coral PAST → NOW identity chip
- The existing teach panel and source deck (no content deleted).

### 2.4 What was deliberately NOT changed

- All teaching interactions (RibbonMaker32, BlockBuilder32, FlipParts32, SortBuckets32, SlotPick32, PerRow32, TapFix32, TypedFill32, LensStage32, ReferenceRail32, StillRunning32, Boss32, GearMap32, TenseCompare32, EvidenceCases32) are reused as-is.
- The 20-question Test Area, the Solutions, and the Teacher Area are unchanged.
- The 587 source lines continue to render inside their step (post-rebuild audit guarantee preserved: `audit-lesson32.mjs` 389/389).
- Shared kit (`lessonKit.tsx`, `finalTest.tsx`, `finalTestBank.ts`, `bidi.tsx`, `Signature.tsx`) is unchanged.
- Lessons 1–44 are not touched.

## 3. Visual evidence

Screenshots are saved under:

- `docs/lesson32-fix-before/` — captured from the **current merged default branch** (commit `085df66`, the post-PR #61 state)
- `docs/lesson32-fix-after/` — captured from the **corrective branch** with all changes applied

Both folders use the same viewport (1440×900 for the laptop run, 1280×800 for the responsive smoke). Both runs use the same script (`scripts/capture-l32.local.mjs`) so the comparison is apples-to-apples.

For each shot the script prints the measured pixel widths:

```
"viewport": { "w": 1440, "h": 900 },
"rail":     { "w": 288 },
"main":     { "w": 1152 },   ← right pane after the sidebar
"wrap":     { "w": 1024 },   ← Lesson32 inner wrapper, BEFORE
"frame":    { "w": 1024 }    ← Frame section, BEFORE

"viewport": { "w": 1440, "h": 900 },
"rail":     { "w": 288 },
"main":     { "w": 1152 },
"wrap":     { "w": 1120 },   ← AFTER: +96 px (+9.4%)
"frame":    { "w": 1120 }
```

| Screenshot (1440 × 900) | Before | After |
|---|---|---|
| Cover (`01-cover.png`) | narrow card, plain inner timeline | journey strip + hero band + wave SVG + formula pill + identity chip |
| Duration stream (`02-s4-duration-stream.png`) | timeline + 3 radios + slider only | same teaching, now inside a Frame with a gradient side accent, under a journey strip that shows section 2 (الصيغة) as "now" |
| For / since lab (`03-s7-for-since.png`) | two sorting buckets only | same lab, now under a journey strip that shows section 3 (المدة) as "now" with sections 1-2 marked "✓ done" |
| Result vs Activity lens (`04-s14-lens-activity.png`) | two lenses + scene | same, now framed by the journey strip (section 5 — النتيجة highlighted) |
| Grammar Detective (`05-s27-detective.png`) | segmented sentence | same, journey strip now shows sections 1-7 done, section 8 (صيد) current |
| Boss challenge (`06-s32-boss.png`) | tense pickers + question cards | same, journey strip shows section 9 (التحديات النهائية) current |
| Cover @ 1280 px (`07-cover-1280.png`) | header wrapped to two rows, journey strip overflowed | header single-row, journey strip fits all 10 sections in one line |

## 4. Validation

| Check | Result |
|---|---|
| `npm run build` | ✓ built in ~9 s, no warnings |
| `node scripts/audit-lesson32.mjs` | ✓ 389 checks, 0 failed |
| `node scripts/audit-lesson32-browser.mjs` | ✓ 247 checks, 0 failed (20 screenshots + verification.json) |
| `npm run audit:lesson-navigation` | ✓ 176 passed, 0 failed |
| `git diff --check` | ✓ no whitespace issues |

The full chain `npm run audit:english-direction` runs all per-lesson audits. Lessons 1–40 audits pass. The Lesson 41 audit fails its `no unrelated modified files` scope guard because the diff against `origin/main` includes the lesson32 files; this is the same failure mode the audit has against any non-lesson41 working branch (it was designed for individual-lesson PRs). It is a pre-existing limitation of the audit, not a regression from the corrective pass — no content in any other lesson was changed.

## 5. Limitations & follow-ups

- The Journey strip is `overflow-x-auto` so on extremely narrow viewports (< 720 px) it scrolls. The strip is information-dense by design (10 sections × one number + short label + checkmark); on phones the labels collapse to numbers-only above `md`.
- The Frame side accent stripe is 8 px wide. It is a brand mark, not a structural change; future lessons are unaffected because the rule is scoped under `.lesson32 .l32-frame > section::before`.
- The before/after screenshots are committed under `docs/lesson32-fix-before/` and `docs/lesson32-fix-after/`. They are evidence, not lessons; they live outside the `src/lessons/lesson32/` tree so they cannot affect any lesson or audit.
- The capture script (`scripts/capture-l32.local.mjs`) is committed with a `.local` suffix so it matches the existing `*.local` `.gitignore` pattern and will not appear in the modified-files audit.