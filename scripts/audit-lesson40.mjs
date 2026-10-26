// Lesson 40 source-to-step, assessment isolation, provenance-clean copy, routes, and BIDI checks.
// Run: npm run audit:lesson40
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { analyzeHtml } from "./lib/bidi-sim.mjs";
import { findEditorialSourceLabels } from "./lib/student-copy-audit.mjs";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "node_modules", ".lesson40-audit", String(process.pid));
mkdirSync(outDir, { recursive: true });

const failures = [];
let assertions = 0;
const noise = [];
const ok = (condition, message) => {
  assertions++;
  if (!condition) failures.push(message);
};

for (const level of ["error", "warn"]) {
  const old = console[level].bind(console);
  console[level] = (...args) => {
    noise.push(`${level}: ${args.join(" ")}`);
    old(...args);
  };
}

const { JSDOM } = await import("jsdom");
const dom = new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body></body></html>', {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
const win = dom.window;
for (const key of [
  "window",
  "document",
  "navigator",
  "Element",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLTextAreaElement",
  "HTMLButtonElement",
  "HTMLAnchorElement",
  "HTMLSelectElement",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "Node",
  "getComputedStyle",
  "localStorage",
  "sessionStorage",
  "MutationObserver",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "SVGElement",
  "Text",
  "Comment",
  "DocumentFragment",
]) {
  if (win[key] !== undefined) {
    Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
  }
}
win.scrollTo = () => {};
win.Element.prototype.scrollTo = () => {};
win.Element.prototype.scrollIntoView = () => {};
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

await esbuild.build({
  absWorkingDir: root,
  stdin: {
    resolveDir: root,
    loader: "tsx",
    contents: `
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import Lesson40 from './src/lessons/lesson40/Lesson40';
import { StepView40 } from './src/lessons/lesson40/Steps40';
import { TestArea40 } from './src/lessons/lesson40/TestArea40';
import { SolutionsArea40 } from './src/lessons/lesson40/SolutionsArea40';
import { TeacherArea40 } from './src/lessons/lesson40/TeacherArea40';
import { TeacherGuide40 } from './src/lessons/lesson40/TeacherGuide40';
import { SLIDES_40, STEP_COUNT_40, STATIONS_40 } from './src/lessons/lesson40/data';
import { gradeTest40 } from './src/lessons/lesson40/testKey40';
import * as LEDGER from './src/lessons/lesson40/ledger40';
import * as STUDENT from './src/lessons/lesson40/studentLedger40';
import * as TEST from './src/lessons/lesson40/testData40';
import * as SOL from './src/lessons/lesson40/solutionsData40';
import * as COV from './src/lessons/lesson40/coverage40';

function mount(node) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(node));
  return {
    el,
    root: {
      unmount() {
        act(() => root.unmount());
        el.remove();
      },
    },
  };
}

export {
  React,
  act,
  renderToString,
  mount,
  Lesson40,
  StepView40,
  TestArea40,
  SolutionsArea40,
  TeacherArea40,
  TeacherGuide40,
  SLIDES_40,
  STEP_COUNT_40,
  STATIONS_40,
  gradeTest40,
  LEDGER,
  STUDENT,
  TEST,
  SOL,
  COV,
};`,
  },
  bundle: true,
  splitting: true,
  platform: "node",
  format: "esm",
  outdir: outDir,
  outExtension: { ".js": ".mjs" },
  jsx: "automatic",
  packages: "external",
  loader: { ".woff2": "empty" },
  logLevel: "silent",
});

const M = await import(pathToFileURL(join(outDir, "stdin.mjs")).href);
const {
  React,
  act,
  renderToString,
  mount,
  Lesson40,
  StepView40,
  TestArea40,
  SolutionsArea40,
  TeacherArea40,
  TeacherGuide40,
  SLIDES_40,
  STEP_COUNT_40,
  STATIONS_40,
  gradeTest40,
  LEDGER,
  STUDENT,
  TEST,
  SOL,
  COV,
} = M;

const src40 = join(root, "src/lessons/lesson40");

// 1. Source ledger integrity & isolation
ok(LEDGER.SOURCE_SECTIONS_40.length === 30, "immutable ledger has cover + all 29 numbered sections");
ok(LEDGER.SOURCE_NUMBERED_COUNT_40 === 29, "numbered source sections count is 29");
const expectedStudentProjection = LEDGER.SOURCE_SECTIONS_40.map((section) =>
  section.id === "s26" ? { ...section, units: section.units.slice(0, 2) } : section
);
ok(
  JSON.stringify(STUDENT.STUDENT_SOURCE_SECTIONS_40) === JSON.stringify(expectedStudentProjection),
  "browser-safe source projection exactly matches canonical source except withheld §26 answer units"
);
ok(
  STUDENT.STUDENT_SOURCE_SECTIONS_40.find((section) => section.id === "s26")?.units.length === 2,
  "student projection includes only §26's two opening units"
);
ok(
  !JSON.stringify(STUDENT.STUDENT_SOURCE_SECTIONS_40).includes("I promise I will return your book tomorrow"),
  "student-safe source projection contains no final-test answer phrase"
);
for (const eagerFile of ["Lesson40.tsx", "Steps40.tsx", "data.ts", "labs40.tsx", "practiceData40.ts", "kit40.tsx", "TestArea40.tsx", "testData40.ts"]) {
  const txt = readFileSync(join(src40, eagerFile), "utf8");
  ok(!txt.includes("./ledger40"), `${eagerFile} does not import canonical teacher-answer ledger`);
}

let ledgerDiff = "";
try {
  ledgerDiff = execFileSync("git", ["diff", "--numstat", "HEAD", "--", "src/lessons/lesson40/ledger40.ts", "src/lessons/lesson40/studentLedger40.ts"], {
    cwd: root,
    encoding: "utf8",
  });
} catch {
  ledgerDiff = "DIFF";
}
ok(ledgerDiff.trim() === "", "canonical ledger40.ts and studentLedger40.ts are unchanged from HEAD");

// 2. Step architecture & atomic 1:1 unit coverage
ok(STATIONS_40.length === 11, `station count is 11 (actual ${STATIONS_40.length})`);
ok(STEP_COUNT_40 === 54, `focused mastery step count is 54 (actual ${STEP_COUNT_40})`);
ok(SLIDES_40[0].id === "cover-01", "first step is cover-01");
ok(SLIDES_40.at(-1).id === "s29-02", "last step is s29-02 curriculum transition to Lesson 41");

for (let i = 1; i <= 29; i++) {
  const sec = LEDGER.SOURCE_SECTIONS_40[i];
  ok(sec?.id === `s${String(i).padStart(2, "0")}` && sec.num === i, `section ${i} exists in canonical source order`);
}

const mapped = new Map();
for (const slide of SLIDES_40) {
  for (const unit of slide.unitIndexes) {
    const key = `${slide.sectionId}:${unit}`;
    mapped.set(key, (mapped.get(key) || 0) + 1);
  }
}
for (const sec of LEDGER.SOURCE_SECTIONS_40) {
  if (sec.id === "s25" || sec.id === "s26") {
    ok(mapped.get(`${sec.id}:0`) === 1 && mapped.get(`${sec.id}:1`) === 1, `${sec.id} launch units 0..1 mapped once`);
    for (let u = 2; u < sec.units.length; u++) {
      ok(!mapped.has(`${sec.id}:${u}`), `${sec.id} protected/exam unit ${u} excluded from ordinary lesson steps`);
    }
  } else {
    for (let u = 0; u < sec.units.length; u++) {
      ok(mapped.get(`${sec.id}:${u}`) === 1, `${sec.id} source unit ${u} maps exactly once`);
    }
  }
}

ok(COV.COVERAGE_40.length === 30, "coverage40 ledger covers cover + 29 sections");
ok(COV.COVERAGE_40.every((row) => SLIDES_40.some((s) => s.sectionId === row.id)), "every source section maps to at least one stepId in SLIDES_40");

// 3. Render every step: verify source units, BIDI cleanliness, provenance-clean copy, and withheld reveals
const mappedRenders = new Map();
const bidiErrors = [];
const provenanceLeaks = [];

for (let i = 0; i < STEP_COUNT_40; i++) {
  const slide = SLIDES_40[i];
  const html = renderToString(
    React.createElement(StepView40, {
      stepIndex: i,
      testSubmitted: false,
      teacherUnlocked: false,
      onSelectStep() {},
      onOpenTest() {},
      onOpenSolutions() {},
      onOpenTeacher() {},
    })
  );
  ok(html.includes(`data-step-id="${slide.id}"`), `${slide.id} renders purpose-built .tcc-step wrapper`);
  for (const u of slide.unitIndexes) {
    const attr = `data-source-unit="${slide.sectionId}-unit-${u}"`;
    ok(html.includes(attr), `${slide.id} renders its exact source unit ${u}`);
    mappedRenders.set(`${slide.sectionId}:${u}`, (mappedRenders.get(`${slide.sectionId}:${u}`) || 0) + 1);
  }
  if (slide.sectionId === "s25" || slide.sectionId === "s26") {
    ok(
      !html.includes("will return your book tomorrow") && !html.includes("حلول المستوى الأول"),
      `${slide.id} leaks no final-test answer key`
    );
  }
  for (const v of analyzeHtml(html).flatMap((p) => p.violations || [])) {
    bidiErrors.push(`${slide.id}: ${v.latin} / ${v.arabic} (${v.sig})`);
  }
  const stripped = html.replace(/<[^>]+>/g, " ");
  const leaks = findEditorialSourceLabels(stripped);
  if (leaks.length > 0) {
    provenanceLeaks.push(`${slide.id}: ${leaks.join(", ")}`);
  }
}

ok(bidiErrors.length === 0, `all 54 lesson steps pass mixed RTL/LTR scan (${bidiErrors.slice(0, 4).join("; ")})`);
ok(provenanceLeaks.length === 0, `all 54 lesson steps have zero editorial provenance labels (${provenanceLeaks.slice(0, 4).join("; ")})`);
for (const [key, count] of mappedRenders) {
  ok(count === 1, `${key} rendered exactly once across lesson pages`);
}

// Formative practice answer reveals are absent before attempt
for (const sourceId of ["s17", "s19", "s20", "s21", "s23"]) {
  const pages = SLIDES_40.filter((s) => s.sectionId === sourceId);
  for (const slide of pages) {
    const html = renderToString(
      React.createElement(StepView40, {
        stepIndex: SLIDES_40.indexOf(slide),
        testSubmitted: false,
        teacherUnlocked: false,
        onSelectStep() {},
        onOpenTest() {},
        onOpenSolutions() {},
        onOpenTeacher() {},
      })
    );
    ok(!html.includes(`data-source-unit="${sourceId}-reveal-0"`), `${sourceId} ${slide.id} reveal units withheld before attempt`);
  }
}

// 4. Final Exam, Deferred Grading Engine, Solutions, and Teacher Space
ok(
  TEST.TEST_SOURCE_UNIT_INDEXES_40.length === 65 && new Set(TEST.TEST_SOURCE_UNIT_INDEXES_40).size === 65,
  "all 65 final-test source units consumed exactly once in testData40"
);
ok(TEST.TEST_QUESTION_COUNT_40 === 25, "final test has exactly 25 questions");
ok(
  TEST.TEST_LEVELS_40.length === 5 && TEST.TEST_LEVELS_40.every((level) => level.questions.length === 5),
  "final test groups 5 questions in each of 5 progressive levels"
);
ok(SOL.SOLUTIONS_40.length === 25, "solutionsData40 covers all 25 questions");
ok(
  SOL.SOLUTIONS_40.every((s) => s.sourceReason.trim() && s.platformExplanation.trim() && s.sourceAnswer.trim()),
  "each final-test solution has model answer, reason, and complete explanation"
);
ok(
  findEditorialSourceLabels(JSON.stringify(SOL.SOLUTIONS_40)).length === 0,
  "solutionsData40 contains zero editorial provenance labels"
);

const testHtml = renderToString(
  React.createElement(TestArea40, {
    submitted: false,
    submittedAnswers: {},
    gradeSummary: null,
  })
);
ok((testHtml.match(/data-test-question=/g) || []).length === 25, "test DOM renders all 25 numbered questions across its 5 levels");
ok(
  !testHtml.includes("حلول المستوى الأول") &&
    !testHtml.includes("will return your book tomorrow") &&
    !testHtml.includes("sourceAnswer") &&
    !testHtml.includes('role="alert"'),
  "pre-submission test DOM exposes zero answers, keys, or correctness alerts"
);
const testAreaCode = readFileSync(join(src40, "TestArea40.tsx"), "utf8");
ok(
  !testAreaCode.includes("solutionsData40") &&
    !/import\s+(?!type\b)[^;]*testKey40/.test(testAreaCode) &&
    !testAreaCode.includes("./ledger40"),
  "TestArea40 has no static runtime import of answer keys or teacher ledger"
);
ok(!readFileSync(join(src40, "testData40.ts"), "utf8").includes("sourceAnswer"), "testData40 contains no answer-key fields");

// Verify grading engine on canonical, alternative/contraction, and nonsense answers
const canonicalAnswers = Object.fromEntries(
  SOL.SOLUTIONS_40.map((s) => [
    s.id,
    s.gradingMode === "auto" ? s.acceptedNormalized[0] : "لأن الحدث الأول مستمر والحدث الثاني مكتمل قبل الثامنة.",
  ])
);
const canonicalGrade = gradeTest40(canonicalAnswers);
ok(
  canonicalGrade.autoCorrect === 20 && canonicalGrade.autoTotal === 20,
  `canonical model answers score 20/20 (got ${canonicalGrade.autoCorrect}/${canonicalGrade.autoTotal})`
);
ok(
  canonicalGrade.reviewTotal === 5 && canonicalGrade.reviewSubmitted === 5,
  "all 5 Level-4 conceptual questions are tracked for review"
);

const altAnswers = {
  ...canonicalAnswers,
  q8: "we'll be traveling",
  q9: "will finish",
  q11: "She's going to buy a new computer.",
  q12: "They'll be playing football at 6:00.",
};
const altGrade = gradeTest40(altAnswers);
ok(altGrade.autoCorrect === 20, `contractions and contextually valid alternatives score 20/20 (got ${altGrade.autoCorrect})`);

const nonsenseAnswers = Object.fromEntries(SOL.SOLUTIONS_40.map((s) => [s.id, "banana potato 123"]));
const nonsenseGrade = gradeTest40(nonsenseAnswers);
ok(nonsenseGrade.autoCorrect === 0, "nonsense answers score 0/20 on auto-graded items");
ok(
  ["q16", "q17", "q18", "q19", "q20"].every((id) => nonsenseGrade.byQuestionId[id].status === "review"),
  "Level-4 conceptual responses are routed to review rather than auto-marked wrong"
);

const solHtml = renderToString(
  React.createElement(SolutionsArea40, {
    submittedAnswers: { q1: "A", q16: "تفسير الطالب" },
    unlockedBy: "submission",
  })
);
ok((solHtml.match(/data-solution-item=/g) || []).length === 25, "solutions surface renders all 25 detailed solution cards");
ok(solHtml.includes('data-score-summary="40"') && /1\s*(?:<!-- -->\s*)?\/\s*(?:<!-- -->\s*)?20/.test(solHtml), "solutions surface reports objective score out of 20");
ok(solHtml.includes("لا تُرفض آليًا"), "solutions surface states conceptual items are not auto-rejected");
for (let u = 0; u < 64; u++) {
  ok(solHtml.includes(`data-source-unit="s26-unit-${u}"`), `gated solutions surface renders §26 unit ${u}`);
}

const lockedTeacherHtml = renderToString(
  React.createElement(TeacherArea40, {
    unlocked: false,
    onUnlock() {},
    onJumpToStep() {},
    onOpenTest() {},
    onOpenSolutions() {},
  })
);
ok(!lockedTeacherHtml.includes('data-source-section="s26"') && !lockedTeacherHtml.includes("data-conceptual-rubric"), "locked TeacherArea40 withholds teacher guide content");

const teacherHtml = renderToString(
  React.createElement(TeacherGuide40, {
    onJumpToStep() {},
    onOpenTest() {},
    onOpenSolutions() {},
  })
);
ok(teacherHtml.includes('data-source-section="s26"'), "TeacherGuide40 includes complete §26 key");
ok(teacherHtml.includes('data-conceptual-rubric="40"'), "TeacherGuide40 includes conceptual assessment rubric");
ok(teacherHtml.includes('data-coverage-ledger="40"'), "TeacherGuide40 includes 30-section coverage ledger");

// 5. Mounted Lesson40 shell integration
const lesson = mount(React.createElement(Lesson40, { onExit() {} }));
ok(!!lesson.el.querySelector(".tcc40 .tcc-step[data-step-id='cover-01']"), "Lesson40 mounts inside .tcc40 at cover-01");
ok(!!lesson.el.querySelector("#lesson40-step-select"), "Lesson40 renders keyboard-operable native step select");
ok(!!lesson.el.querySelector('[data-lesson-step-nav="true"][data-site-lock-host="pill"]'), "Lesson1Shell bottom navigation pill hosts site lock without overlap");
ok(
  !![...lesson.el.querySelectorAll("button")].find((b) => b.textContent?.includes("منطقة الحلول") && b.disabled),
  "Solutions tab is disabled before submission or teacher unlock"
);
ok(!lesson.el.querySelector("#lesson40-solutions"), "SolutionsArea40 is not mounted in initial student DOM");
lesson.root.unmount();

// 6. Router, Lesson 41 transition, CSS reduced motion, and zero raw bidi controls
const app = readFileSync(join(root, "src/App.tsx"), "utf8");
ok(
  app.includes('import Lesson40 from "./lessons/lesson40/Lesson40"') &&
    app.includes("route === 40") &&
    app.includes('href: "#/lesson/40"'),
  "Lesson 40 is registered in hub and router"
);
ok(app.includes("#/lesson/41") && app.includes("route === 41"), "Lesson 41 route is live in router");
const lastStepHtml = renderToString(
  React.createElement(StepView40, {
    stepIndex: STEP_COUNT_40 - 1,
    testSubmitted: false,
    teacherUnlocked: false,
    onSelectStep() {},
    onOpenTest() {},
    onOpenSolutions() {},
    onOpenTeacher() {},
  })
);
ok(lastStepHtml.includes('href="#/lesson/41"'), "Lesson 40 final step links directly to #/lesson/41");
ok(existsSync(join(root, "docs/lesson40-coverage.md")), "docs/lesson40-coverage.md exists");

for (const file of readdirSync(src40).filter((f) => /\.(ts|tsx|css)$/.test(f))) {
  ok(
    !/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/.test(readFileSync(join(src40, file), "utf8")),
    `${file} contains zero raw Unicode bidi control characters`
  );
}
ok(readFileSync(join(src40, "lesson40.css"), "utf8").includes("prefers-reduced-motion"), "lesson40.css honors prefers-reduced-motion");

rmSync(outDir, { recursive: true, force: true });
if (noise.length) failures.push(`React/JSDOM warnings: ${noise.slice(0, 4).join(" | ")}`);

if (failures.length) {
  console.error(`FAIL audit-lesson40 (${failures.length}/${assertions} failures)`);
  for (const f of failures.slice(0, 60)) console.error(" -", f);
  process.exit(1);
}
console.log(
  `PASS audit-lesson40 (${assertions} assertions; ${STEP_COUNT_40} learning steps; 11 stations; 29 numbered sections; 25 exam questions; 25 solutions)`
);
