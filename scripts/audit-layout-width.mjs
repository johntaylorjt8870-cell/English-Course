#!/usr/bin/env node
/**
 * Platform-wide Static & Future-Lesson Layout Width Regression Guard.
 *
 * Verifies:
 * 1. Global responsive layout tokens & primitives in `src/index.css`.
 * 2. `Lesson1Shell.tsx` & `App.tsx` Hub use `.lesson-content-container` without legacy narrow caps,
 *    so future lessons (56+) inherit the wide layout automatically.
 * 3. Every `src/lessons/lesson<N>` directory (1..55 and any future lesson added later) has NO
 *    narrow `max-w-3xl` / `max-w-4xl` / `max-w-5xl` / `max-w-6xl` cap on `<main>`, primary slide
 *    containers, `TestArea*`, `SolutionsArea*`, `TeacherGuide*`, or unlocked `TeacherArea*` wrappers.
 * 4. Functional narrow controls (`LessonNumberNav`, password forms, mobile drawers) and
 *    `SitePasswordGate` selectors remain intact, and no indiscriminate `width: 100% !important` exists.
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";

let passed = 0;
const failures = [];

function ok(cond, msg) {
  if (cond) {
    passed += 1;
  } else {
    failures.push(msg);
  }
}

function walkFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else if (/\.(tsx?|css)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// 1. Global CSS tokens & layout primitives
const indexCss = readFileSync("src/index.css", "utf8");
ok(/--lesson-content-max:\s*96rem\s*;/.test(indexCss), "src/index.css defines --lesson-content-max: 96rem (1536px)");
ok(/--lesson-shell-max:\s*114rem\s*;/.test(indexCss), "src/index.css defines --lesson-shell-max: 114rem (1824px)");
ok(/\.lesson-main-scroll\s*\{[\s\S]*?padding-inline:\s*clamp\(/.test(indexCss), "src/index.css defines .lesson-main-scroll fluid inline padding");
ok(
  /\.lesson-content-container\s*\{[\s\S]*?width:\s*100%\s*;[\s\S]*?max-width:\s*var\(--lesson-content-max\)\s*;[\s\S]*?margin-inline:\s*auto\s*;/.test(indexCss),
  "src/index.css defines .lesson-content-container using var(--lesson-content-max)"
);

// Guard against indiscriminate global width overrides
for (const file of walkFiles("src")) {
  const src = readFileSync(file, "utf8");
  ok(!/\*\s*\{[^}]*width\s*:\s*100%\s*!important/.test(src), `${file}: no indiscriminate * { width: 100% !important } rule`);
}

// 2. Shared shells & Hub
const shellSrc = readFileSync("src/shared/Lesson1Shell.tsx", "utf8");
ok(shellSrc.includes("lesson-main-scroll"), "Lesson1Shell.tsx <main> uses .lesson-main-scroll");
ok(shellSrc.includes("lesson-content-container"), "Lesson1Shell.tsx step content wrapper uses .lesson-content-container");
ok(!/\bmax-w-(?:3xl|4xl|5xl|6xl)\b/.test(shellSrc), "Lesson1Shell.tsx has no legacy max-w-3xl..6xl cap");

const appSrc = readFileSync("src/App.tsx", "utf8");
ok(appSrc.includes("lesson-content-container"), "src/App.tsx Hub container uses .lesson-content-container");
const hubBlock = appSrc.slice(appSrc.indexOf("function Hub("));
ok(!/\bmax-w-(?:3xl|4xl|5xl|6xl)\b/.test(hubBlock), "src/App.tsx Hub has no legacy max-w-3xl..6xl cap");

// Preserve functional controls & SitePasswordGate selectors
const numNavSrc = readFileSync("src/shared/LessonNumberNav.tsx", "utf8");
ok(numNavSrc.includes("max-w-md") && numNavSrc.includes("max-w-8"), "LessonNumberNav.tsx preserves functional compact width controls");
const gateSrc = readFileSync("src/shared/SitePasswordGate.tsx", "utf8");
ok(
  gateSrc.includes("div.l30-floating-nav") &&
    gateSrc.includes("div.l31-floating-nav") &&
    gateSrc.includes("CloseYourEyes173"),
  "SitePasswordGate.tsx preserves site password & floating-nav lock selectors"
);

// 3. Dynamic discovery of ALL lesson folders (1..55 + future lessons 56+)
const cardNumbers = [...appSrc.matchAll(/\bn:\s*(\d+)\s*,/g)].map((m) => Number(m[1])).sort((a, b) => a - b);
ok(cardNumbers.length >= 55, `src/App.tsx registers at least 55 lessons (found ${cardNumbers.length})`);

const lessonDirs = readdirSync("src/lessons", { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^lesson\d+$/.test(d.name))
  .map((d) => ({ name: d.name, num: Number(d.name.replace("lesson", "")), dir: path.join("src/lessons", d.name) }))
  .sort((a, b) => a.num - b.num);

ok(lessonDirs.length >= 55, `src/lessons contains at least 55 lesson directories (found ${lessonDirs.length})`);

for (const n of cardNumbers) {
  ok(lessonDirs.some((d) => d.num === n), `Registered lesson ${n} has directory src/lessons/lesson${n}`);
}

for (const { num, dir } of lessonDirs) {
  const entryPath = path.join(dir, `Lesson${num}.tsx`);
  ok(existsSync(entryPath), `Lesson ${num}: ${entryPath} exists`);
  if (!existsSync(entryPath)) continue;

  const entrySrc = readFileSync(entryPath, "utf8");

  // Every lesson must mount through Lesson1Shell, .lesson-content-container, or --lesson-shell-max (e.g., L34 CSS shell)
  const usesApprovedShell =
    entrySrc.includes("Lesson1Shell") ||
    entrySrc.includes("lesson-content-container") ||
    entrySrc.includes("--lesson-shell-max") ||
    entrySrc.includes("l34-frame");
  ok(usesApprovedShell, `Lesson ${num}: mounts through Lesson1Shell or approved wide container`);

  // No <main> or immediate <main> wrapper or mainAfter wrapper may use max-w-3xl/4xl/5xl/6xl
  ok(
    !/<main[^>]*\bmax-w-(?:3xl|4xl|5xl|6xl)\b/.test(entrySrc),
    `Lesson ${num}: <main> has no legacy max-w-3xl..6xl cap`
  );
  ok(
    !/\bpop\s+(?:mx-auto\s+)?(?:w-full\s+)?max-w-(?:3xl|4xl|5xl|6xl)\b/.test(entrySrc),
    `Lesson ${num}: slide/step wrapper has no legacy max-w-3xl..6xl cap`
  );
  ok(
    !/data-area=[^>]*\bmax-w-(?:3xl|4xl|5xl|6xl)\b|\bmax-w-(?:3xl|4xl|5xl|6xl)\b[^>]*data-area=/.test(entrySrc),
    `Lesson ${num}: data-area wrapper has no legacy max-w-3xl..6xl cap`
  );

  // Inspect sub-area files & CSS files inside each lesson directory
  for (const file of readdirSync(dir)) {
    const full = path.join(dir, file);
    if (/^(?:TestArea|SolutionsArea|TeacherGuide|TeacherArea).*\.tsx$/.test(file)) {
      const subSrc = readFileSync(full, "utf8");
      ok(
        !/\bmax-w-(?:4xl|5xl|6xl)\b/.test(subSrc),
        `Lesson ${num} (${file}): no redundant max-w-4xl..6xl outer wrapper`
      );
    }
    if (file.endsWith(".css")) {
      const cssSrc = readFileSync(full, "utf8");
      ok(
        !/main\s*>\s*\.pop\s*\{\s*max-width:\s*(?:4\d|5\d|6\d)rem/.test(cssSrc),
        `Lesson ${num} (${file}): no narrow main > .pop max-width cap`
      );
      ok(
        !/\.l\d+-roadmap\s*\{[^}]*max-width:\s*52rem/.test(cssSrc),
        `Lesson ${num} (${file}): no narrow 52rem roadmap cap`
      );
    }
  }
}

if (failures.length > 0) {
  console.error(`\nLayout width static audit FAILED (${failures.length} failure(s), ${passed} passed):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}

console.log(
  `Layout width static audit PASSED: ${passed} assertions across Hub, Lesson1Shell, and ${lessonDirs.length} lessons (future-lesson guard active).`
);
