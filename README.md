# English with Sommer — Master Course

Production source for the English with Sommer interactive Arabic-first English course.

## Architecture

- React 19 + Vite + TypeScript
- Tailwind CSS v4 via the Vite plugin
- Lessons 1–9 remain separate components and data modules
- Shared components live under `src/shared`
- The hub/router lives in `src/App.tsx`
- `src/index.css` contains the original visual system, RTL/LTR isolation, fonts/classes, animations, and paper styling

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Adding a new lesson

When Lesson 10 is provided, keep the same pattern:

```text
src/lessons/lesson10/
  Lesson10.tsx
  data.ts
```

Then register the lesson in `src/App.tsx` and add its card to the hub. Do not rewrite or condense the lesson content. Interactive/creative elements should be added around the supplied teaching material.

## Design rule

The course is an educational product, not a static HTML document. Keep it as a real React/Vite application so routing, interactivity, audio, progress, quizzes, and future lessons remain maintainable.
