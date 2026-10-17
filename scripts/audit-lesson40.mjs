// Lesson 40 — source coverage, area separation, interactions, direction, contrast tokens, and route audit.
// Run: npm run audit:lesson40
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { analyzeHtml } from "./lib/bidi-sim.mjs";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "node_modules", ".lesson40-audit", String(process.pid));
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "stdin.mjs");
const failures = [];
let assertions = 0;

const consoleNoise = [];
for (const level of ["error", "warn"]) {
  const original = console[level].bind(console);
  console[level] = (...args) => {
    consoleNoise.push(`${level}: ${args.map((value) => String(value)).join(" ").slice(0, 220)}`);
    original(...args);
  };
}

const ok = (condition, message) => {
  assertions++;
  if (!condition) failures.push(message);
};

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
  "HTMLSelectElement",
  "HTMLButtonElement",
  "HTMLAnchorElement",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "Node",
  "getComputedStyle",
  "CSS",
  "MutationObserver",
  "HashChangeEvent",
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
if (!win.Element.prototype.scrollIntoView) win.Element.prototype.scrollIntoView = () => {};
win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import App from ${JSON.stringify(join(root, "src/App.tsx"))};
import Lesson40 from ${JSON.stringify(join(root, "src/lessons/lesson40/Lesson40.tsx"))};
import { StepView40 } from ${JSON.stringify(join(root, "src/lessons/lesson40/Steps40.tsx"))};
import { TestArea40 } from ${JSON.stringify(join(root, "src/lessons/lesson40/TestArea40.tsx"))};
import { TeacherArea40, TEACHER_PASSWORD_40 } from ${JSON.stringify(join(root, "src/lessons/lesson40/TeacherArea40.tsx"))};
import { SolutionsArea40 } from ${JSON.stringify(join(root, "src/lessons/lesson40/SolutionsArea40.tsx"))};
import { TeacherGuide40 } from ${JSON.stringify(join(root, "src/lessons/lesson40/TeacherGuide40.tsx"))};
import * as LEDGER from ${JSON.stringify(join(root, "src/lessons/lesson40/ledger40.ts"))};
import * as DATA from ${JSON.stringify(join(root, "src/lessons/lesson40/data.ts"))};
import * as PRACTICE from ${JSON.stringify(join(root, "src/lessons/lesson40/practiceData40.ts"))};
import * as TEST from ${JSON.stringify(join(root, "src/lessons/lesson40/testData40.ts"))};
import * as SOLUTIONS from ${JSON.stringify(join(root, "src/lessons/lesson40/solutionsData40.ts"))};
import * as COVERAGE from ${JSON.stringify(join(root, "src/lessons/lesson40/coverage40.ts"))};
function mount(node) {
  const el = document.createElement("div");
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
  createRoot,
  renderToString,
  App,
  Lesson40,
  StepView40,
  TestArea40,
  TeacherArea40,
  TEACHER_PASSWORD_40,
  SolutionsArea40,
  TeacherGuide40,
  LEDGER,
  DATA,
  PRACTICE,
  TEST,
  SOLUTIONS,
  COVERAGE,
  mount,
};
`,
    resolveDir: root,
    loader: "tsx",
  },
  bundle: true,
  splitting: true,
  platform: "node",
  format: "esm",
  outdir: outDir,
  outExtension: { ".js": ".mjs" },
  chunkNames: "chunks/[name]-[hash]",
  jsx: "automatic",
  packages: "external",
  // Lesson 44 bundles its own local font subsets; jsdom never renders them.
  loader: { ".woff2": "empty" },
  logLevel: "silent",
});

const M = await import(pathToFileURL(outFile).href);
const {
  React,
  act,
  renderToString,
  App,
  Lesson40,
  StepView40,
  TestArea40,
  TeacherArea40,
  TEACHER_PASSWORD_40,
  SolutionsArea40,
  TeacherGuide40,
  LEDGER,
  DATA,
  PRACTICE,
  TEST,
  SOLUTIONS,
  COVERAGE,
  mount,
} = M;

// ============================================================
// 1. Source Ledger, Coverage & Documentation Audit
// ============================================================
ok(LEDGER.SOURCE_SECTIONS_40.length === 30, "Lesson 40 ledger must have 30 sections (cover + s01..s29)");
ok(LEDGER.SOURCE_NUMBERED_COUNT_40 === 29, "Lesson 40 must have 29 numbered sections (§1–§29)");
ok(DATA.SLIDES_40.length === 30, "SLIDES_40 must have 30 steps in exact source order");
ok(COVERAGE.COVERAGE_40.length === 30, "COVERAGE_40 must have 30 rows (cover + s01..s29)");
ok(COVERAGE.COVERAGE_SECTION_COUNT_40 === 29, "COVERAGE_SECTION_COUNT_40 must be 29");

for (let i = 1; i <= 29; i++) {
  const id = `s${String(i).padStart(2, "0")}`;
  const sec = LEDGER.SOURCE_SECTIONS_40[i];
  ok(sec?.id === id && sec?.num === i, `Section ${id} must be at index ${i} with num=${i}`);
}

ok(LEDGER.GOLDEN_TABLE_ROWS_40.length === 5, "§3 Golden Table must have 5 rows for the 5 principal future forms");
ok(LEDGER.ADAM_COMPARISON_ROWS_40.length === 3, "§9 Adam Comparison Table must have 3 rows");
ok(LEDGER.WRITE_FORMS_ROWS_40.length === 5, "§15 write Forms Table must have 5 rows");

const revealExpected = { s17: 6, s19: 6, s20: 8, s21: 12, s23: 8 };
for (const [secId, len] of Object.entries(revealExpected)) {
  const sec = LEDGER.sourceSection40(secId);
  ok(sec?.revealUnits?.length === len, `${secId} must have ${len} revealUnits`);
}

const auditDocPath = join(root, "docs/lesson40-source-audit.md");
const covDocPath = join(root, "docs/lesson40-coverage.md");
ok(existsSync(auditDocPath), "docs/lesson40-source-audit.md must exist");
ok(existsSync(covDocPath), "docs/lesson40-coverage.md must exist");
const auditDocText = readFileSync(auditDocPath, "utf8");
const covDocText = readFileSync(covDocPath, "utf8");
for (let i = 1; i <= 29; i++) {
  ok(auditDocText.includes(`§${i}`), `docs/lesson40-source-audit.md must document §${i}`);
  ok(covDocText.includes(`s${String(i).padStart(2, "0")}`), `docs/lesson40-coverage.md must cover s${String(i).padStart(2, "0")}`);
}
ok(auditDocText.includes("57"), "docs/lesson40-source-audit.md must document the 57 exercise items");
ok(covDocText.includes("planned-not-implemented"), "docs/lesson40-coverage.md must document Lesson 41 as planned-not-implemented");

// ============================================================
// 2. Mandatory Source Accuracy & Exercise Inventory Checks (57 items)
// ============================================================
ok(PRACTICE.OBJECTIVES_40.length === 10, "§1 must have 10 objectives");
ok(PRACTICE.DECISION_MAP_QUESTIONS_40.length === 6, "§2 must have 6 decision-map questions");
ok(PRACTICE.STUDY_PERSPECTIVES_40.length === 5, "§4 must have 5 perspectives for study");
ok(PRACTICE.WILL_VS_GOING_TO_SCENARIOS_40.length === 4, "§5 must have 4 WILL vs BE GOING TO scenarios");
ok(PRACTICE.ADAM_TIMELINE_POINTS_40.length === 3, "§9 must have 3 timeline points for Adam's 4:00–8:00 project");
ok(PRACTICE.SIGNAL_WORDS_LIST_40.length === 8, "§11 must list 8 signal words");
ok(PRACTICE.TIME_CLAUSE_CONJUNCTIONS_40.length === 6, "§12 must list 6 future time-clause conjunctions");
ok(PRACTICE.WHEN_VS_BY_THE_TIME_PERSPECTIVES_40.length === 3, "§13 must have 3 perspectives for when vs by the time");
ok(PRACTICE.FOR_SINCE_SORT_40.length === 4, "§14 must have 4 FOR/SINCE sort items");
ok(PRACTICE.FORMULA_BUILDER_TARGETS_40.length === 5, "§15 must have 5 formula builder targets for write");
ok(PRACTICE.FORMULA_ERROR_PAIRS_40.length === 5, "§15 must have 5 error pairs for write");
ok(PRACTICE.DIALOGUE1_LINES_40.length === 11, "§16 Dialogue 1 must have 11 turns");
ok(PRACTICE.DIALOGUE2_LINES_40.length === 8, "§17 Dialogue 2 must have 8 turns");
ok(PRACTICE.DIALOGUE2_CHALLENGE_40.length === 6, "§17 Dialogue 2 challenge must have 6 classification items");
ok(PRACTICE.SITUATION_LAB_ITEMS_40.length === 5, "§18 Situation Lab must have 5 context scenarios");

// 57 student exercise items: 6 (§19) + 8 (§20) + 10 (§21) + 8 (§23) + 25 (§25) = 57
ok(PRACTICE.EXERCISE19_ITEMS_40.length === 6, "§19 must have 6 MCQ items");
ok(PRACTICE.FILL20_ITEMS_40.length === 8, "§20 must have 8 completion items");
ok(PRACTICE.DETECTIVE21_ITEMS_40.length === 10, "§21 must have 10 Grammar Detective items");
ok(PRACTICE.READING23_QUESTIONS_40.length === 8, "§23 must have 8 reading comprehension questions");
ok(PRACTICE.READING23_ANSWERS_40.length === 8, "§23 must have 8 reading comprehension answers");
ok(TEST.TEST_QUESTION_COUNT_40 === 25, "§25 must have 25 Grand Exam questions");
const totalNumberedExercises =
  PRACTICE.EXERCISE19_ITEMS_40.length +
  PRACTICE.FILL20_ITEMS_40.length +
  PRACTICE.DETECTIVE21_ITEMS_40.length +
  PRACTICE.READING23_QUESTIONS_40.length +
  TEST.TEST_QUESTION_COUNT_40;
ok(totalNumberedExercises === 57, `Total numbered student items must equal 57, got ${totalNumberedExercises}`);

// Specific source accuracy checks:
ok(
  PRACTICE.FILL20_ITEMS_40[1].answer === "are going to visit" &&
    PRACTICE.FILL20_ITEMS_40[1].why.includes("يقينًا سياقيًا"),
  "§20 item ② must distinguish grammatical form (are going to visit) from contextual certainty",
);
ok(
  PRACTICE.FILL20_ITEMS_40[5].answer === "will be preparing" &&
    PRACTICE.FILL20_ITEMS_40[6].answer === "will have prepared" &&
    PRACTICE.FILL20_ITEMS_40[7].answer === "will have been working",
  "§20 items ⑥–⑧ must preserve the three distinct meanings at arrival",
);
ok(
  PRACTICE.DETECTIVE21_ITEMS_40[5].answer === "Will you be studying at 9:00? Yes, I will.",
  "§21 item ⑥ must correct 'Yes, I am.' to 'Yes, I will.'",
);
ok(PRACTICE.STORY_ANALYSIS24_ITEMS_40.length === 6, "§24 must analyze the 6 main story sentences");
ok(PRACTICE.WRITING27_CRITERIA_40.length === 10, "§27 must have 10 Writing Mission requirements");
ok(PRACTICE.WRITING27_MODEL_40.length === 6, "§27 must have the 6-sentence model opening");
ok(PRACTICE.GOLDEN_SUMMARY28_CARDS_40.length === 5, "§28 must have 5 Golden Summary cards");
ok(
  PRACTICE.NEXT_LESSON_40.status === "planned-not-implemented",
  "§29 Lesson 41 must be marked planned-not-implemented",
);

// ============================================================
// 3. Static Code & Hygiene Audit on src/lessons/lesson40/
// ============================================================
const lesson40Dir = join(root, "src/lessons/lesson40");
const lesson40Files = readdirSync(lesson40Dir).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));
for (const file of lesson40Files) {
  const content = readFileSync(join(lesson40Dir, file), "utf8");
  ok(!/[\u{1F1E6}-\u{1F1FF}]/u.test(content), `${file} must not contain flag emojis`);
  ok(!/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/.test(content), `${file} must not contain raw bidi control chars`);
  ok(!/\bopacity-\d+/.test(content), `${file} must not use low-contrast opacity-* utilities`);
  ok(!/<details\b|<summary\b/i.test(content), `${file} must not use <details> or <summary>`);
}

const testAreaCode = readFileSync(join(lesson40Dir, "TestArea40.tsx"), "utf8");
const testDataCode = readFileSync(join(lesson40Dir, "testData40.ts"), "utf8");
ok(!testAreaCode.includes("solutionsData40") && !testAreaCode.includes("SolutionsArea40"), "TestArea40.tsx must not import solutions");
ok(!testDataCode.includes("solutionsData40") && !testDataCode.includes("sourceAnswer"), "testData40.ts must not contain answer keys");

function bidiViolations(html) {
  const list = [];
  for (const paragraph of analyzeHtml(html)) {
    for (const v of paragraph.violations || []) {
      list.push(`${v.latin} ⇄ ${v.arabic} (${v.sig})`);
    }
  }
  return list;
}

const renderedSnapshots = [];

// ============================================================
// 4. Step-by-Step Rendering & BIDI Audit (Steps 0..29)
// ============================================================
for (let stepIdx = 0; stepIdx < DATA.STEP_COUNT_40; stepIdx++) {
  const slide = DATA.SLIDES_40[stepIdx];
  const sec = LEDGER.sourceSection40(slide.sourceId);
  const html = renderToString(
    React.createElement(StepView40, {
      stepIndex: stepIdx,
      testSubmitted: false,
      teacherUnlocked: false,
      onOpenTest: () => {},
      onOpenSolutions: () => {},
      onOpenTeacher: () => {},
    }),
  );
  renderedSnapshots.push(html);

  ok(html.includes(`data-source-section="${sec.id}"`), `Step ${stepIdx} (${sec.id}) must render data-source-section="${sec.id}"`);

  if (sec.id !== "s25" && sec.id !== "s26") {
    for (let uIdx = 0; uIdx < sec.units.length; uIdx++) {
      ok(
        html.includes(`data-source-unit="${sec.id}-unit-${uIdx}"`),
        `Step ${sec.id} must render unit ${uIdx}`,
      );
    }
  }

  if (sec.revealUnits?.length) {
    ok(
      !html.includes(`data-source-unit="${sec.id}-reveal-0"`),
      `Step ${sec.id} must hide revealUnits on initial render before attempt`,
    );
  }

  if (sec.id === "s25" || sec.id === "s26") {
    ok(!html.includes("حلول المستوى الأول"), `Step ${sec.id} in Student Area must not leak final exam answers`);
  }

  const bidiIssues = bidiViolations(html);
  ok(bidiIssues.length === 0, `Step ${sec.id} must have 0 BIDI issues, got ${bidiIssues.length}: ${bidiIssues.slice(0, 3).join(" | ")}`);
}

// ============================================================
// 5. Independent Test Area, Gated Solutions Area, and Teacher Area Audit
// ============================================================
ok(
  TEST.TEST_SOURCE_UNIT_INDEXES_40.length === TEST.TEST_SOURCE_UNIT_TOTAL_40 &&
    TEST.TEST_SOURCE_UNIT_TOTAL_40 === 65,
  "testData40.ts must consume all 65 units of s25 exactly once",
);
ok(SOLUTIONS.SOLUTIONS_40.length === 25, "solutionsData40.ts must have 25 detailed solutions");

// Check Q21–Q25 mapping to The Big School Project blanks:
const q21to25Answers = SOLUTIONS.SOLUTIONS_40.slice(20, 25).map((s) => s.sourceAnswer);
ok(
  q21to25Answers[0] === "are going to build." &&
    q21to25Answers[1] === "will fix." &&
    q21to25Answers[2] === "will be testing." &&
    q21to25Answers[3] === "will have completed." &&
    q21to25Answers[4] === "will have been working.",
  "Q21–Q25 in solutionsData40.ts must match the 5 blanks of The Big School Project",
);

const testHtmlUnsubmitted = renderToString(
  React.createElement(TestArea40, {
    answers: {},
    onChangeAnswer: () => {},
    submitted: false,
    onSubmit: () => {},
    onReset: () => {},
    onOpenSolutions: () => {},
    onBackToStudent: () => {},
  }),
);
const testHtmlSubmitted = renderToString(
  React.createElement(TestArea40, {
    answers: { q1: "A" },
    onChangeAnswer: () => {},
    submitted: true,
    onSubmit: () => {},
    onReset: () => {},
    onOpenSolutions: () => {},
    onBackToStudent: () => {},
  }),
);
for (let q = 1; q <= 25; q++) {
  ok(testHtmlUnsubmitted.includes(`data-test-question="${q}"`), `TestArea40 must render data-test-question="${q}"`);
}
for (let u = 0; u < 65; u++) {
  ok(testHtmlUnsubmitted.includes(`data-source-unit="s25-unit-${u}"`), `TestArea40 must bind s25-unit-${u}`);
}
ok(!testHtmlUnsubmitted.includes("حلول المستوى الأول") && !testHtmlSubmitted.includes("حلول المستوى الأول"), "TestArea40 must never render solutions");
ok(bidiViolations(testHtmlUnsubmitted).length === 0, "TestArea40 must have 0 BIDI issues");
renderedSnapshots.push(testHtmlUnsubmitted, testHtmlSubmitted);

// SolutionsArea40 & TeacherGuide40 audit:
const solutionsHtml = renderToString(
  React.createElement(SolutionsArea40, {
    answers: { q1: "A", q6: "will return", q21: "are going to build" },
    onBackToTest: () => {},
    onBackToStudent: () => {},
  }),
);
ok(solutionsHtml.includes('id="lesson40-solutions"'), "SolutionsArea40 must render #lesson40-solutions");
ok(solutionsHtml.includes('data-source-section="s26"'), "SolutionsArea40 must render verbatim s26");
for (let q = 1; q <= 25; q++) {
  ok(solutionsHtml.includes(`data-solution-item="${q}"`), `SolutionsArea40 must render solution card #${q}`);
}
ok(bidiViolations(solutionsHtml).length === 0, "SolutionsArea40 must have 0 BIDI issues");
renderedSnapshots.push(solutionsHtml);

const teacherGuideHtml = renderToString(
  React.createElement(TeacherGuide40, {
    onJumpToStep: () => {},
    onOpenTest: () => {},
    onOpenSolutions: () => {},
  }),
);
ok(teacherGuideHtml.includes('data-source-section="s26"'), "TeacherGuide40 must render verbatim s26");
ok(bidiViolations(teacherGuideHtml).length === 0, "TeacherGuide40 must have 0 BIDI issues");
renderedSnapshots.push(teacherGuideHtml);

// Mount Lesson40 and verify area gating + keyboard navigation + teacher unlock:
const mounted = mount(React.createElement(Lesson40));
const solutionsNavBtn = [...mounted.el.querySelectorAll("nav button")].find((b) =>
  b.textContent?.includes("منطقة الحلول"),
);
ok(Boolean(solutionsNavBtn?.disabled), "Solutions tab must be disabled before test submission or teacher unlock");
ok(!mounted.el.querySelector("#lesson40-solutions"), "SolutionsArea40 must not be mounted when locked");

// Test ArrowLeft keyboard step navigation:
act(() => {
  win.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
});
ok(
  mounted.el.querySelector('[data-source-section="s01"]') !== null,
  "ArrowLeft in Student Area must advance from cover to s01",
);
mounted.root.unmount();

// ============================================================
// 6. WCAG AA Contrast & App Registration Audit (No Lesson 42 Route; Lesson 41 added independently)
// ============================================================
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}
function luminance([r, g, b]) {
  const chan = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2];
}
function contrastRatio(fg, bg) {
  const l1 = luminance(hexToRgb(fg));
  const l2 = luminance(hexToRgb(bg));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const lightSurfaces = ["#ffffff", "#fffdf8", "#f5f3ed", "#fdfcf8", "#f7f8f5", "#eef4f0", "#edf5ee", "#fbf6eb", "#fbefed"];
const textColors = ["#24343b", "#17354a", "#245f62", "#43575a", "#53676a", "#28533b", "#76531e", "#8d3832", "#596965"];
for (const fg of textColors) {
  for (const bg of lightSurfaces) {
    const ratio = contrastRatio(fg, bg);
    ok(ratio >= 4.5, `Contrast ratio for ${fg} on ${bg} must be >= 4.5:1, got ${ratio.toFixed(2)}`);
  }
}

// Computed-style contrast check across all rendered HTML snapshots:
{
  const colorOf = (token) => {
    const hex = token.match(/(?:^|:)(?:text|bg)-\[#([0-9a-fA-F]{6})\]/);
    if (hex) return "#" + hex[1].toLowerCase();
    if (/(?:^|:)text-white$/.test(token)) return "#ffffff";
    if (/(?:^|:)bg-white$/.test(token)) return "#ffffff";
    return null;
  };
  const nearest = (element, kind, stop) => {
    let node = element;
    while (node && node !== stop) {
      const tokens = String(node.className || "").split(/\s+/);
      for (const pass of [false, true]) {
        for (const token of tokens) {
          if (token.includes(":") !== pass) continue;
          const value = colorOf(token);
          if (value && (kind === "text" ? /(?:^|:)text-/.test(token) : /(?:^|:)bg-/.test(token))) {
            return { value, token, node };
          }
        }
      }
      node = node.parentElement;
    }
    return null;
  };
  const measured = [];
  for (const snapshotHtml of renderedSnapshots) {
    const holder = win.document.createElement("div");
    holder.className = "bg-[#f5f3ed] text-[#24343b]";
    holder.innerHTML = snapshotHtml;
    for (const element of holder.querySelectorAll("*")) {
      const directText = [...element.childNodes].some(
        (node) => node.nodeType === 3 && node.textContent.trim().length > 1,
      );
      if (!directText) continue;
      if (element.closest("svg") || element.getAttribute("aria-hidden") === "true") continue;
      const text = nearest(element, "text", holder.parentElement);
      const bg = nearest(element, "bg", holder.parentElement);
      if (!text || !bg) continue;
      const value = contrastRatio(text.value, bg.value);
      measured.push({
        value,
        text: text.value,
        bg: bg.value,
        token: `${text.token} / ${bg.token}`,
        sample: (element.textContent || "").trim().slice(0, 48),
      });
    }
  }
  const computedFailures = measured.filter((record) => record.value < 4.5);
  ok(
    computedFailures.length === 0,
    `Computed DOM contrast across ${measured.length} text nodes must have 0 failures < 4.5:1, got ${computedFailures.length}: ${computedFailures
      .slice(0, 5)
      .map((r) => `${r.value.toFixed(2)}:1 (${r.token} «${r.sample}»)`)
      .join(" | ")}`,
  );
}

const appCode = readFileSync(join(root, "src/App.tsx"), "utf8");
ok(appCode.includes('import Lesson40 from "./lessons/lesson40/Lesson40"'), "App.tsx must import Lesson40");
ok(appCode.includes('href: "#/lesson/40"'), "App.tsx must include card href #/lesson/40");
ok(appCode.includes("route === 40"), "App.tsx must route #/lesson/40");
ok(appCode.includes("#/lesson/42") && appCode.includes("import Lesson42") && existsSync(join(root, "src/lessons/lesson42")) && appCode.includes("#/lesson/44") && existsSync(join(root, "src/lessons/lesson44")), "Lesson 42 stays routed and Lesson 44 now ships independently; Lesson 40 source roadmap stays untouched");

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
ok(pkg.scripts["audit:lesson40"] === "node scripts/audit-lesson40.mjs", "package.json exposes audit:lesson40");
ok((pkg.scripts["audit:english-direction"] || "").includes("audit-lesson40.mjs"), "audit:english-direction runs the Lesson 40 audit");
ok(readFileSync(join(root, "scripts/check-english-direction.mjs"), "utf8").includes("lessons.length === 44"), "direction-check inventory covers 44 lessons");
ok(readFileSync(join(root, "scripts/audit-render-direction.mjs"), "utf8").includes("lessonFolders.length === 44"), "render audit covers 44 lesson folders");
ok(readFileSync(join(root, "scripts/audit-lesson-navigation.mjs"), "utf8").includes('"#/lesson/42"'), "navigation audit covers the Lesson 42 route");
ok(readFileSync(join(root, "scripts/audit-final-test.mjs"), "utf8").includes("lesson40DedicatedAssessment"), "final-test audit recognises the Lesson 40 dedicated assessment");
ok(readFileSync(join(root, "scripts/audit-bidi-mixed.mjs"), "utf8").includes("39, 40"), "bidi-mixed audit includes Lesson 40 in STRICT and LESSONS");

ok(consoleNoise.length === 0, `React/JSDOM console must have 0 warnings/errors, got: ${consoleNoise.join(" | ")}`);

rmSync(outDir, { recursive: true, force: true });

if (failures.length > 0) {
  console.error(`FAIL audit-lesson40 (${failures.length} failure(s) out of ${assertions} assertions):`);
  for (const f of failures) console.error("  -", f);
  process.exit(1);
}
console.log(`PASS audit-lesson40 (${assertions} assertions, 30 steps, 57 student items, 25 exam questions, 0 console errors)`);
