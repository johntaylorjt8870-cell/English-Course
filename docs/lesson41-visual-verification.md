# Lesson 41 — real-browser evidence

Produced by `node scripts/audit-lesson41-browser.mjs` against `http://127.0.0.1:5174/English-Course/#/lesson/41` (Vite dev server) with headless Chromium from `playwright-core` + `@sparticuz/chromium`.

Raw data: `docs/lesson41-visual/verification.json`.

## Summary

| Metric | Value |
|---|---|
| Viewports | 1280×800, 1920×1080 |
| Slides walked | 120 at each viewport |
| Checks | 1701 |
| Failures | 0 |
| Page errors | 0 |
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
- every visible text node passes WCAG AA (4.5:1; 3:1 for large text), with Tailwind v4 `oklch()` colours resolved to sRGB through a canvas;
- card height recorded for every slide.

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
