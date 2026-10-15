# Lesson 41 — real-browser verification

## Actual environment and outcome

- Browser: **Chromium 153.0.8010.0**, headless, driven by Playwright (not JSDOM).
- Actual app: Vite route `/English-Course/#/lesson/41`; the existing site gate was unlocked through its existing local-storage state for automation.
- Desktop: **1280 × 900**. Mobile: **375 × 812**. Reduced-motion preference enabled.
- Command: `node scripts/audit-lesson41-browser.mjs` — **exit 0**, **347 checks, zero assertion failures**.
- **103 rendered states**, **15,358 text/control observations** (includes repeated elements across states), minimum measured normal-text contrast **5.53:1**.
- All 41 student steps checked at both widths; no page-level horizontal overflow. Tables may scroll within their own containers.
- 26 actual browser screenshots retained in `lesson41-visual/`; machine results in [verification.json](lesson41-visual/verification.json).

## What was exercised

Engine switching; role error/success feedback; BE and DO builders; Future Perfect Continuous composition with only **will** marked first; first-auxiliary questions/negatives and the no-auxiliary case; attempt-gated error correction requiring both repair and reason; complete passage and ten reading questions; writing counter and ten criteria; separately labelled partial model.

All 25 test questions (26 fields because Q8 has two blanks); incomplete and completed-but-unsubmitted states; lazy solution loading only after submission; reset clears responses and relocks solutions; incorrect teacher credentials; authorized guide loading; teacher relocking; authorized Solutions Area access on mobile. Teacher guide contains all 66 practice solutions.

Computed styles were checked for normal, selected, focus, hover, active, disabled, locked, error and success states. Keyboard focus was exercised with a real Tab event; the visible focus screenshot is below. All ARIA references were checked in rendered states. Target BIDI examples also have ten separate DOM/simulator cases in the standard audit (English-only and mixed Arabic contexts).

## Screenshot review and fixes

Actual screenshots were opened and visually reviewed, including the cover/focus state, BE/DO/HAVE stations, first-auxiliary station, reading, test, teacher area and mobile solutions. Automated sweep of all steps supplements, but does not equal, manual reading of every line.

Review found and corrected:
1. A two-digit section number wrapping vertically under a long bilingual heading; it now has a non-shrinking, non-wrapping width.
2. Mixed Arabic/English boundary whitespace appearing on the wrong side of the isolate; a local rendering adapter reuses the shared parser, retaining plain boundary whitespace/colon separators in the surrounding flow. Complex glossary groups still use the shared renderer.
3. RTL progress fractions; counters now have explicit LTR boundaries.
4. Mobile BE / DO / HAVE masthead grouping; the engine group stays together rather than splitting around the Arabic dash.

### Representative evidence

| Surface | Desktop | Mobile |
|---|---|---|
| Cover | [Cover](lesson41-visual/desktop-cover.png) | [Cover](lesson41-visual/mobile-step-0.png) |
| Keyboard selection | [Selected engine & focus](lesson41-visual/desktop-selected-focus.png) | — |
| BE | [Laboratory](lesson41-visual/desktop-station-5.png) | [Laboratory](lesson41-visual/mobile-step-5.png) |
| DO | [Builder](lesson41-visual/desktop-station-11.png) | [Builder](lesson41-visual/mobile-step-11.png) |
| HAVE | [Perfect engine](lesson41-visual/desktop-station-18.png) | [Perfect continuous](lesson41-visual/mobile-step-18.png) |
| First auxiliary | [Chain lab](lesson41-visual/desktop-station-25.png) | [Chain lab](lesson41-visual/mobile-step-25.png) |
| Error detective | [Attempt feedback](lesson41-visual/desktop-error-detective.png) | [Practice](lesson41-visual/mobile-step-29.png) |
| Reading | [Reading](lesson41-visual/desktop-reading.png) | [Reading](lesson41-visual/mobile-step-35.png) |
| Writing | [Writing](lesson41-visual/desktop-writing.png) | [Writing](lesson41-visual/mobile-step-38.png) |
| Test | [Test](lesson41-visual/desktop-test.png) | [Test](lesson41-visual/mobile-test.png) |
| Solutions | [Solutions](lesson41-visual/desktop-solutions.png) | [Solutions](lesson41-visual/mobile-solutions.png) |
| Teacher | [Guide](lesson41-visual/desktop-teacher.png) | [Guide](lesson41-visual/mobile-teacher-guide.png) |
| Locked teacher | [Gate](lesson41-visual/desktop-teacher-locked.png) | [Gate](lesson41-visual/mobile-teacher-gate.png) |

## Provisioning and honest limitations

The first browser launch failed because this sandbox lacked `libnspr4.so` / NSS libraries. The npm Chromium distribution already includes compatible libraries; the script extracts those into ignored `node_modules/.lesson41-browser` and sets the process library path. No host packages, browser binaries or dependencies were committed.

Reproduce after `npm ci`:

```sh
npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
npm run dev -- --host 0.0.0.0
# In another shell:
node scripts/audit-lesson41-browser.mjs
```

The first browser audit also caught a focus-test setup error (programmatic focus after pointer input was not keyboard focus). The test now uses Tab before checking the focus outline; no CSS assertion was weakened.

The existing global Google Fonts request is blocked by this sandbox's outbound allowlist. That one external network error is retained separately in `verification.json`, not disguised as a successful download. Lesson 41 explicitly uses a local system font stack, including its English runs. There were no lesson application/page errors in the final run. Shared Signature/site-lock UI is unchanged and outside Lesson 41's contrast scope.

This is Chromium desktop/mobile-viewport evidence, not Safari/Firefox, physical-phone, screen-reader or exhaustive zoom certification. Browser scripts inspect ordinary UI/network behavior; they do not claim client-side passwords protect public bundles from determined inspection.
