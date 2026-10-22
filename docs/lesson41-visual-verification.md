# Lesson 41 — real-browser evidence

Produced by `node scripts/audit-lesson41-browser.mjs` against `http://127.0.0.1:5174/English-Course/#/lesson/41` (Vite dev server) with headless Chromium from `playwright-core` + `@sparticuz/chromium`.

Raw data: `docs/lesson41-visual/verification.json`.

## Summary

| Metric | Value |
|---|---|
| Viewports | 1280×800, 1920×1080 |
| Slides walked | 120 at each viewport |
| Checks | 2204 |
| Failures | 0 |
| Page errors | 0 |
| Contrast samples (text nodes measured) | 4600 |
| Colour formats resolved | `oklch` 5284, `oklab` 624, `rgb` 600, `rgba` 360, `hsl` 120, `hex` 120, `color(srgb …)` 120 |
| Faded disabled-control contrast exemptions (WCAG 1.4.3 inactive) | 118 |
| Run-time console errors | 0 (only the blocked Google-Fonts request, recorded separately as `externalNetworkErrors`) |
| Tallest slide card | 1188 px (1280×800, slide 113 — result slide with 25 solutions) |
| Cards over the 1200 px target | none |
| Reserved space under the floating step pill | 128 px |

## Per-slide assertions (both viewports)

- step counter `n / 120` correct for all 120 slides;
- `document.scrollWidth − innerWidth ≤ 1` (no horizontal overflow);
- no clipped readable element (decorative `aria-hidden` blobs excluded);
- floating step pill never overlaps the site-lock button;
- step pill covers no button/input/textarea/select at maximum scroll;
- all ARIA references resolve;
- every visible text node passes WCAG AA (4.5:1; 3:1 for large text) — see **Contrast method** below;
- card height recorded for every slide.

## Contrast method (fixed in this revision)

The previous version parsed the numeric digits out of `getComputedStyle(...).color`. That is wrong for this project: Tailwind v4 compiles its palette to **`oklch()`**, where the three numbers are lightness/chroma/hue, not sRGB channels, and percentages/alpha were misread. It reported 269 phantom failures and could also have hidden real ones.

The measurement is now format-agnostic and delegated to Chromium itself:

1. **Alpha + colour solve.** Each colour is painted twice by the same `CanvasRenderingContext2D` — once over black and once over white:
   `P(black) = a·C` and `P(white) = a·C + (1−a)·255`, so `a = 1 − (Pwhite − Pblack)/255` and `C = P(black)/a`.
   This is exact for `oklch()`, `oklab()`, `lab()`, `lch()`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, hex, `color(srgb …)`, named colours and `transparent`. Unparseable values are rejected through `CSS.supports("color", …)` instead of silently reusing the previous `fillStyle`.
2. **Real backdrop.** The whole ancestor chain is composited (white page → outermost → element), so text sitting on `bg-slate-50`, on a translucent `bg-white/80` rail or inside a coloured panel is measured against what the user actually sees.
3. **Opacity and state.** Ancestor `opacity` is multiplied into the text alpha; text over `background-image` gradients is counted separately.
4. **AA thresholds.** 4.5:1 normally, 3:1 for large text (≥24 px, or ≥18.66 px at weight ≥700).
5. **Self-test before measuring.** Ten colour syntaxes with known expected values plus two reference ratios (white/black = 21:1, white/#777 = 4.48:1) are asserted on the live page; the audit aborts its contrast claims if any of them is wrong. Result: **10/10 resolvers, 21:1, 4.48:1**.
6. **Disabled controls.** Buttons using `disabled:opacity-40` are exempt per WCAG 1.4.3 (inactive UI); they are counted (118 samples) rather than silently dropped, and the **enabled** state of each gated control ("قارن إجابتي بالحل", "كوّن سؤالًا", "تسليم الاختبار النهائي") is asserted separately at ≥4.5:1 after it unlocks.

One real issue was found by the stricter method and fixed in the lesson: the DO tile on the cover was `bg-orange-700` at `opacity-90` text (4.49:1) → now `bg-orange-800` with full-opacity bold text (**7.37:1 measured**).

## Overlap method (fixed in this revision)

The floating step pill and the site lock are now checked twice — at the top **and** at maximum scroll — and the pill is checked against every interactive control two ways: bounding-box intersection and a real `document.elementFromPoint()` hit test at each control's centre. The lesson reserves 128 px under the pill (`pb-32`) and the audit confirms nothing is covered or unclickable on any of the 120 slides at either viewport.

## Interaction evidence captured

| Screenshot | What it shows |
|---|---|
| `1280-cover.png`, `1920-cover.png` | Original early-lesson cover: white `rounded-[2rem]` card, drifting mascot, `pop` staging, BE/DO/HAVE engine tiles |
| `1280-practice-before-attempt.png` | §30 practice card before an attempt — «قارن إجابتي بالحل» visibly disabled, no key in the DOM |
| `1280-practice.png`, `1280-practice-revealed.png`, `1920-practice.png` | The same card after typing both fields, and after pressing the compare button with the key + reason revealed |
| `1280-lab.png` | Chain lab after building `Does she study?` from a sentence without an auxiliary |
| `1280-test-level1.png`, `1920-test-level1.png` | Final test level 1 — questions only, no key text in the DOM |
| `1280-solutions.png` | Result slide with score and the 25 lazy solutions after submission |
| `1280-teacher-guide.png` | Guided teacher area with the 66 practice keys |
| `1920-reading.png` | Reading challenge passage at 1920×1080 |
| `reference-lesson1.png`, `reference-lesson2.png`, `reference-lesson3.png` | The platform's original early lessons captured at 1280×800 with the same harness, for the side-by-side design check (white `rounded-[2rem]` card, slate-900 number badge, Changa heading, coloured tile row, right rail, floating pill + site lock) |

## Animation note

The audit injects `*,*::before,*::after{animation:none;transition:none}` after load so that screenshots and contrast measurements reflect the settled UI rather than a mid-`pop` frame. The lesson's own `pop`/`anim-drift` motion is unchanged for real users and still respects `prefers-reduced-motion`.

## Reproduce

```bash
npm ci --no-audit --no-fund
npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
npm run dev -- --port 5174 --host 0.0.0.0
LESSON41_URL="http://127.0.0.1:5174/English-Course/#/lesson/41" node scripts/audit-lesson41-browser.mjs
```

The browser audit is optional and not part of `npm run audit:english-direction`: it needs the extra Chromium packages, which are intentionally not committed.
