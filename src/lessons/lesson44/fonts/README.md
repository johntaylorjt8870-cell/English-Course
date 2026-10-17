# Lesson 44 local fonts

Two families, subset WOFF2 only, served from this folder so Lesson 44 needs no
runtime font CDN and no extra npm dependency:

- **Newsreader** (latin 400/400i/500/600/600i) — editorial English display and
  reading serif. Copyright 2020 The Newsreader Project Authors.
- **Tajawal** (arabic 400/500/700/800) — Arabic UI and body text, matching the
  existing Arabic course voice with a warmer, more even weight range.

Both families are licensed under the SIL Open Font License, Version 1.1
(https://scripts.sil.org/OFL). Files were taken from the corresponding
`@fontsource` packages (v5.3.0) and are unmodified.

Arabic subsets cover Arabic script only; Latin glyphs inside Arabic strings fall
back to the course sans stack, which is intentional (English runs are isolated
LTR spans anyway).
