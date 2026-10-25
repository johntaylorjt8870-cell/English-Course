// Lesson 36 — content, coverage, interaction, gating, direction and accessibility audit.
// Run: npm run audit:lesson36
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { findEditorialSourceLabels } from "./lib/student-copy-audit.mjs";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "node_modules", ".lesson36-audit", String(process.pid));
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "stdin.mjs");
const failures = [];
let assertions = 0;
const ok = (condition, message) => {
  assertions++;
  if (!condition) failures.push(message);
};

const { JSDOM } = await import("jsdom");
const dom = new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body></body></html>', { url: "http://localhost/", pretendToBeVisual: true });
const win = dom.window;
for (const key of [
  "window", "document", "navigator", "Element", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement",
  "HTMLSelectElement", "HTMLButtonElement", "HTMLAnchorElement", "Event", "MouseEvent", "KeyboardEvent", "Node",
  "getComputedStyle", "CSS", "MutationObserver", "HashChangeEvent", "requestAnimationFrame", "cancelAnimationFrame",
  "SVGElement", "Text", "Comment", "DocumentFragment",
]) if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
win.scrollTo = () => {};
win.HTMLElement.prototype.scrollTo = () => {};
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
import Lesson36 from ${JSON.stringify(join(root, "src/lessons/lesson36/Lesson36.tsx"))};
import StepView36 from ${JSON.stringify(join(root, "src/lessons/lesson36/Steps36.tsx"))};
import TestArea36 from ${JSON.stringify(join(root, "src/lessons/lesson36/TestArea36.tsx"))};
import SolutionsArea36 from ${JSON.stringify(join(root, "src/lessons/lesson36/SolutionsArea36.tsx"))};
import TeacherArea36 from ${JSON.stringify(join(root, "src/lessons/lesson36/TeacherArea36.tsx"))};
import TeacherGuide36 from ${JSON.stringify(join(root, "src/lessons/lesson36/TeacherGuide36.tsx"))};
import * as LEDGER from ${JSON.stringify(join(root, "src/lessons/lesson36/ledger36.ts"))};
import * as DECK from ${JSON.stringify(join(root, "src/lessons/lesson36/deck36.ts"))};
import * as CONTENT from ${JSON.stringify(join(root, "src/lessons/lesson36/content36.ts"))};
import * as TEST from ${JSON.stringify(join(root, "src/lessons/lesson36/testData36.ts"))};
import * as SOLUTIONS from ${JSON.stringify(join(root, "src/lessons/lesson36/solutionsData36.ts"))};
import * as GRADING from ${JSON.stringify(join(root, "src/lessons/lesson36/grading36.ts"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); const root = createRoot(el); act(() => root.render(node)); return { el, root: { unmount() { act(() => root.unmount()); } } }; }
export { React, act, createRoot, renderToString, App, Lesson36, StepView36, TestArea36, SolutionsArea36, TeacherArea36, TeacherGuide36, LEDGER, DECK, CONTENT, TEST, SOLUTIONS, GRADING, mount };
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
  loader: { ".woff2": "empty" },
  logLevel: "silent",
});
const M = await import(pathToFileURL(outFile).href);

const { SOURCE_SECTIONS_36, NUMBERED_SECTIONS_36, TABLE_ROWS_36 } = M.LEDGER;
const { SLIDES_36, STAGES_36, STEP_COUNT_36, deckCoverage36, revealCoverage36 } = M.DECK;
const { refsOfSlide, textOf } = M.CONTENT;
const { TEST_LEVELS_36, TEST_36, TEST_COUNT_36, TEST_LEVEL_COUNT_36 } = M.TEST;
const { TEST_SOLUTIONS_36 } = M.SOLUTIONS;

const tick = (ms = 25) => new Promise((resolve) => setTimeout(resolve, ms));
const click = (element) => M.act(() => element?.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true })));
const setNative = (element, value) => {
  if (!element) throw new Error("Expected input is missing.");
  M.act(() => {
    const proto = element.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value);
    element.dispatchEvent(new win.Event("input", { bubbles: true }));
    element.dispatchEvent(new win.Event("change", { bubbles: true }));
  });
};
const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const textOfHtml = (html) => {
  const element = document.createElement("div");
  element.innerHTML = html;
  return normalize(element.textContent);
};
const section = (id) => {
  const found = SOURCE_SECTIONS_36.find((candidate) => candidate.id === id);
  if (!found) throw new Error(`Missing section ${id}`);
  return found;
};
const findButton = (scope, text) => [...scope.querySelectorAll("button")].find((button) => normalize(button.textContent).includes(text));
const mountSlide = (id) => {
  const slideIndex = SLIDES_36.findIndex((candidate) => candidate.id === id);
  const slide = SLIDES_36[slideIndex];
  if (!slide) throw new Error(`Missing slide ${id}`);
  return M.mount(M.React.createElement(M.StepView36, { slide, index: slideIndex, onGoTest() {}, onGoSolutions() {} }));
};

// ============================================================
// 1) Source ledger integrity
// ============================================================
ok(SOURCE_SECTIONS_36.length === 27, `ledger holds the opening plus 26 numbered sections (got ${SOURCE_SECTIONS_36.length})`);
ok(NUMBERED_SECTIONS_36.length === 26 && NUMBERED_SECTIONS_36.every((entry, index) => entry.num === index + 1 && entry.id === `s${String(index + 1).padStart(2, "0")}`), "all 26 numbered source sections are present once, in order");
ok(SOURCE_SECTIONS_36.every((entry, index) => entry.order === index && entry.title.length > 0 && entry.units.length > 0), "every section has a title, content and its source order");
ok(SOURCE_SECTIONS_36.reduce((total, entry) => total + entry.units.length, 0) > 450, "the verbatim ledger keeps the complete lesson body (450+ units)");
ok(section("s01").units.slice(1).every((line, index) => line.startsWith("①②③④⑤⑥⑦⑧⑨⑩"[index])), "all ten objectives keep their original markers");
ok(section("s17").units.length === 11 && section("s17").revealUnits.length === 22, "Grammar Detective keeps ten errors and its full 22-line key");
ok(section("s18").revealUnits.length === 9 && section("s19").revealUnits.length === 11 && section("s21").revealUnits.length === 17, "guided practice, dialogue and reading keep their complete supplied keys");
ok(TABLE_ROWS_36.length === 8 && section("s03").tableRows.length === 8, "the comparison map keeps exactly eight repaired rows");
ok(section("s21").units.filter((line) => line.includes("?")).length >= 8, "reading passage and its seven questions are intact");
ok(section("s24").units[1].includes("12 إلى 15") && section("s24").units.slice(3, 11).length === 8, "writing task keeps 12–15 sentences and eight requirements");
ok(section("s26").units.some((line) => line.includes("الدرس 37")) && section("s26").units.some((line) => line.includes("At 8:00 tomorrow, I will be studying.")), "curriculum map keeps the Lesson 37 preview and its example");

// ============================================================
// 2) Deck coverage — every unit exactly once, in source order
// ============================================================
const coverage = deckCoverage36();
const exceptions = { section: "s22", from: 2 };
for (const row of coverage) {
  const expectedMissing = row.section === exceptions.section ? row.missing.every((index) => index >= exceptions.from) : row.missing.length === 0;
  ok(expectedMissing, `${row.section}: every source line has a rendering location (missing: ${row.missing.join(",") || "none"})`);
  ok(row.duplicates.length === 0, `${row.section}: no source line is rendered twice by accident (${row.duplicates.join(",") || "none"})`);
  ok(!row.outOfOrder, `${row.section}: rendered source lines keep their original order`);
  if (row.section !== exceptions.section) ok(row.covered.length === row.expected, `${row.section}: ${row.covered.length}/${row.expected} source lines covered`);
}
ok(STEP_COUNT_36 === 36, `the student deck has 36 slides, including the six intentional section splits (got ${STEP_COUNT_36})`);
ok(STAGES_36.length === 10 && STAGES_36.flatMap((stage) => stage.stepIds).length === 36, "ten navigation stages cover the 36 slides exactly once");
ok(SLIDES_36.every((slide, index) => index === 0 || SLIDES_36[index - 1].id !== slide.id), "slide ids are unique");
for (const row of revealCoverage36()) {
  ok(row.missing.length === 0, `${row.section}: all ${row.expected} answer/analysis lines are exposed after an attempt (missing: ${row.missing.join(",") || "none"})`);
}
ok(SLIDES_36.filter((slide) => ["s02a", "s02b", "s04a", "s04b", "s05a", "s05b", "s06a", "s06b", "s09a", "s09b", "s11a", "s11b", "s14a", "s14b", "s21a", "s21b", "s25a", "s25b"].includes(slide.id)).length === 18, "dense sections were split into focused slides instead of being shortened");

// ============================================================
// 3) Verbatim spot checks
// ============================================================
const allInitialHtml = SLIDES_36.map((slide) => {
  const index = SLIDES_36.indexOf(slide);
  return M.renderToString(M.React.createElement(M.StepView36, { slide, index, onGoTest() {}, onGoSolutions() {} }));
});
const initialText = normalize(allInitialHtml.map(textOfHtml).join(" "));
const must = [
  "Mastering Future Decisions & Predictions",
  "إتقان التعبير عن المستقبل — المقارنة الشاملة والتطبيق العملي 🚀",
  "I will buy a new computer.",
  "Then I'll buy a new computer.",
  "I'm going to buy a new computer next month.",
  "I'll get a flashlight.",
  "We've decided to create a school newspaper. We're going to publish the first issue next month.",
  "I'll cook something for you.",
  "I'm going to cook a special dinner for my family.",
  "Watch out! The glass is going to fall!",
  "Look at those clouds! It's going to rain.",
  "I promise I'll return your calculator tomorrow.",
  "Will you help me?",
  "Are you going to help me?",
  "I'll visit my aunt tomorrow.",
  "I'm going to visit my aunt tomorrow.",
  "Subject + will + V1",
  "Subject + am/is/are + going to + V1",
  "What will you do?",
  "What are you going to do?",
  "I think the exam will be difficult.",
  "Do you think we will finish the presentation on time?",
  "We already prepared a backup plan. We're going to use my laptop.",
  "I think she will enjoy the course.",
  "I'll travel with you!",
  "She will going to study tomorrow.",
  "① A: I can't open this jar.",
  "Maya and Daniel are preparing for a national robotics competition.",
  "① What are Maya and Daniel preparing for?",
  "The Robotics Competition",
  "الاختبار مكوّن من 25 سؤالًا موزعة على خمسة مستويات.",
  "① ثلاث جمل باستخدام be going to للتعبير عن خطط مسبقة.",
  "Next month, I'm going to start a new learning project.",
  "القاعدة الذهبية الكبرى",
  "الدرس 37: Future Continuous — المستقبل المستمر",
  "At 8:00 tomorrow, I will be studying.",
];
for (const line of must) ok(initialText.includes(normalize(line)), `rendered deck contains the supplied line: ${line.slice(0, 60)}`);
ok(TABLE_ROWS_36.every(([situation, form]) => initialText.includes(normalize(situation)) && initialText.includes(form)), "all eight comparison rows render in the map");
ok(SLIDES_36.every((slide, index) => allInitialHtml[index].includes(`data-step-id="${slide.id}"`)), "every slide renders a traceable step id");
ok(allInitialHtml.every((html) => html.includes("الخطوة")), "every slide shows its position inside the lesson");

// ============================================================
// 4) Interactions
// ============================================================
const postHtml = [];
{
  const { el, root: reactRoot } = mountSlide("s05a");
  await tick();
  const cards = [...el.querySelectorAll("[data-lab-item]")];
  ok(cards.length === 2, "decision lab renders both cook situations");
  click([...cards[0].querySelectorAll('input[type="radio"]')][0]);
  await tick(5);
  click(findButton(cards[0], "تحقق من وصفي"));
  await tick(5);
  ok(normalize(cards[0].textContent).includes("قرار لحظي"), "decision lab explains the spontaneous cook decision after the attempt");
  click([...cards[1].querySelectorAll('input[type="radio"]')][1]);
  await tick(5);
  click(findButton(cards[1], "تحقق من وصفي"));
  await tick(5);
  ok(normalize(cards[1].textContent).includes("خطة مسبقة"), "decision lab explains the prior cook plan after the attempt");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}
{
  const { el, root: reactRoot } = mountSlide("s16");
  await tick();
  const cards = [...el.querySelectorAll("[data-lab-item]")];
  ok(cards.length === 4, "travel laboratory renders four situations");
  const buttons = [...cards[0].querySelectorAll("button")];
  ok(buttons.length >= 1 && buttons[0].disabled, "a context item cannot be checked before choosing a form");
  click([...cards[0].querySelectorAll('input[type="radio"]')][0]);
  await tick(5);
  ok(findButton(cards[0], "تحقق من اختياري").disabled, "the reason field is required before checking");
  setNative(cards[0].querySelector("textarea"), "The decision is made at the moment of speaking.");
  await tick(5);
  click(findButton(cards[0], "تحقق من اختياري"));
  await tick(5);
  ok(normalize(cards[0].textContent).includes("اختيار مناسب للسياق"), "context laboratory confirms a suitable choice and shows the source explanation");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}
{
  const { el, root: reactRoot } = mountSlide("s07");
  await tick();
  const check = el.querySelector("[data-lab-item]")?.closest("section") ?? el;
  click(el.querySelector('input[type="radio"][value="no"]'));
  await tick(5);
  click(findButton(check, "تحقق من فهمي"));
  await tick(5);
  ok(normalize(el.textContent).includes("الدليل يرجّح، ولا يمنع"), "prediction lens states that present evidence does not ban WILL");
  ok(el.querySelectorAll('[aria-pressed]').length >= 2, "prediction lens exposes two comparable lenses");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}
{
  const { el, root: reactRoot } = mountSlide("s17");
  await tick();
  const items = [...el.querySelectorAll("[data-lab-item]")];
  ok(items.length === 10, "Grammar Detective renders all ten sentences");
  ok(!normalize(el.textContent).includes("She will study tomorrow."), "the detective key is hidden before an attempt");
  for (const item of items) {
    setNative(item.querySelector("input"), "My correction");
    await tick(3);
    click(findButton(item, "اعرض التصحيح المقبول"));
    await tick(3);
  }
  const text = normalize(el.textContent);
  ok(section("s17").revealUnits.every((line) => text.includes(normalize(line))), "all ten corrections, alternatives and the glass nuance appear after the attempts");
  ok(text.includes("تصحيحك يطابق الحل") || text.includes("قارن صياغتك"), "the detective gives non-colour feedback on the learner's own wording");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}
{
  const { el, root: reactRoot } = mountSlide("s18");
  await tick();
  const items = [...el.querySelectorAll("[data-lab-item]")];
  ok(items.length === 8, "guided choice practice renders eight contexts");
  for (const item of items) {
    click(item.querySelector('input[type="radio"]'));
    await tick(3);
    click(findButton(item, "تحقق من الاختيار"));
    await tick(3);
  }
  ok(section("s18").revealUnits.every((line) => normalize(el.textContent).includes(normalize(line))), "all eight practice answers and explanations appear after the attempts");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}
{
  const { el, root: reactRoot } = mountSlide("s19");
  await tick();
  const fields = [...el.querySelectorAll("[data-lab-item] input")];
  ok(fields.length === 4, "the Sara/Adam dialogue exposes four answer fields");
  fields.forEach((field, index) => setNative(field, ["I'm going to visit", "I'll remind", "will give", "will add"][index]));
  await tick(5);
  for (const item of el.querySelectorAll("[data-lab-item]")) {
    click(findButton(item, "تحقق من"));
    await tick(3);
  }
  const text = normalize(el.textContent);
  ok(section("s19").revealUnits.every((line) => text.includes(normalize(line))), "all four dialogue answers and their explanations appear after checking");
  ok(text.includes("إجابتك مطابقة للحل"), "the dialogue marks exact matches with text, not colour alone");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}
{
  const { el, root: reactRoot } = mountSlide("s20");
  await tick();
  const fields = [...el.querySelectorAll("textarea")];
  ok(fields.length === 2, "the context-writing lab provides two writing areas");
  ok(!normalize(el.textContent).includes("A: Nobody has prepared dinner yet."), "the source models wait until the learner writes");
  fields.forEach((field, index) => setNative(field, index === 0 ? "A: Nobody prepared dinner. B: I'll prepare dinner." : "A: What are your plans? B: I'm going to prepare dinner."));
  await tick(5);
  click(findButton(el, "اعرض المثالين الأصليين"));
  await tick(5);
  ok(normalize(el.textContent).includes("A: Nobody has prepared dinner yet.") && normalize(el.textContent).includes("A: What are your plans for this evening?"), "both original model contexts appear after the attempt");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}
{
  const { el, root: reactRoot } = mountSlide("s21a");
  await tick();
  ok(el.querySelectorAll("[dir='ltr']").length >= 10, "the robotics passage renders its English lines as LTR islands");
  const toggle = el.querySelector('input[type="checkbox"]');
  click(toggle);
  await tick(5);
  ok(el.querySelectorAll("mark").length >= 5, "the optional future-form highlight works without hiding the passage");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}
{
  const { el, root: reactRoot } = mountSlide("s21b");
  await tick();
  const fields = [...el.querySelectorAll("textarea")];
  ok(fields.length === 7, "all seven reading questions accept an answer");
  ok(!normalize(el.textContent).includes("A national robotics competition."), "reading answers are hidden before the attempt");
  fields.forEach((field) => setNative(field, "Student answer"));
  await tick(5);
  click(findButton(el, "اعرض الإجابات والتحليل"));
  await tick(5);
  const text = normalize(el.textContent);
  ok(section("s21").revealUnits.every((line) => text.includes(normalize(line))), "the seven answers and eight grammar analyses appear after the attempt");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}
{
  const { el, root: reactRoot } = mountSlide("s24");
  await tick();
  const area = el.querySelector("textarea");
  ok(el.querySelectorAll('input[type="checkbox"]').length === 8, "the writing mission lists the eight requirements as a self-review checklist");
  setNative(area, Array.from({ length: 12 }, (_, index) => `Sentence number ${index + 1}.`).join(" "));
  await tick(5);
  const text = normalize(el.textContent);
  ok(text.includes("12") && text.includes("المطلوب 12–15"), "the writing counter reports the 12–15 sentence target");
  ok(text.includes("Next month, I'm going to start a new learning project."), "the model opening stays visible for comparison");
  ok(text.includes("لا يصدر النظام حكمًا آليًا"), "writing feedback is explicitly non-judging");
  postHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}

// Every remaining lab is opened generically (pick an option, type an answer,
// reveal the supplied explanation) so that gated prose and keys are checked in
// their real post-attempt state rather than only in the initial render.
const unlockedHtml = [];
for (const slide of SLIDES_36) {
  if (!slide.blocks.some((block) => block.kind === "lab")) continue;
  const { el, root: reactRoot } = mountSlide(slide.id);
  await tick();
  for (let pass = 0; pass < 4; pass++) {
    for (const item of el.querySelectorAll("[data-lab-item]")) {
      const radio = item.querySelector('input[type="radio"]:not(:disabled)');
      if (radio) click(radio);
      const box = item.querySelector('input[type="checkbox"]:not(:disabled)');
      if (box && !box.checked) click(box);
      for (const field of item.querySelectorAll('input[type="text"], textarea')) {
        if (!field.disabled && !field.value) setNative(field, "Student answer");
      }
    }
    await tick(8);
    for (const button of [...el.querySelectorAll("button")]) {
      if (button.disabled) continue;
      const label = normalize(button.textContent);
      if (/تحقق|اعرض|اكشف|أظهر/.test(label)) click(button);
    }
    await tick(10);
  }
  unlockedHtml.push(el.innerHTML);
  reactRoot.unmount();
  el.remove();
}

const postText = normalize(postHtml.map(textOfHtml).join(" "));
const unlockedText = normalize(unlockedHtml.map(textOfHtml).join(" "));
const everything = `${initialText} ${postText} ${unlockedText}`;
/** A line with an inline blank is rendered as prompt + live input + rest. */
const segmentsOf = (line) => normalize(line).split("______").map((part) => part.trim()).filter(Boolean);
const renderedInOrder = (haystack, segments) => {
  let cursor = 0;
  for (const segment of segments) {
    const at = haystack.indexOf(segment, cursor);
    if (at < 0) return false;
    cursor = at + segment.length;
  }
  return true;
};
for (const entry of SOURCE_SECTIONS_36) {
  for (const line of entry.units) {
    const expected = normalize(line);
    if (entry.id === "s22" && entry.units.indexOf(line) >= 2) continue;
    if (everything.includes(expected)) { assertions++; continue; }
    if (expected.includes("______") && renderedInOrder(everything, segmentsOf(line))) { assertions++; continue; }
    failures.push(`unrendered teaching line in ${entry.id}: ${line.slice(0, 80)}`);
    assertions++;
  }
}
for (const entry of SOURCE_SECTIONS_36) {
  for (const line of entry.revealUnits ?? []) {
    const expected = normalize(line);
    if (everything.includes(expected)) { assertions++; continue; }
    if (expected.includes("______") && renderedInOrder(everything, segmentsOf(line))) { assertions++; continue; }
    failures.push(`unrendered key line in ${entry.id}: ${line.slice(0, 80)}`);
    assertions++;
  }
}

// ============================================================
// 5) Formal test — 25 questions, no feedback before submit, grading after
// ============================================================
ok(TEST_COUNT_36 === 25 && TEST_36.length === 25, `the formal test has exactly 25 questions (got ${TEST_COUNT_36})`);
ok(TEST_LEVEL_COUNT_36 === 5 && TEST_LEVELS_36.every((level) => level.questions.length === 5), "the formal test keeps five levels of five questions");
ok(TEST_LEVELS_36.map((level) => `${level.questions[0].n}-${level.questions.at(-1).n}`).join("|") === "1-5|6-10|11-15|16-20|21-25", "the formal test keeps the original level boundaries");
ok(TEST_LEVELS_36[0].questions.every((question) => question.options?.length === 2) && TEST_LEVELS_36[4].questions.every((question) => !question.options), "Level 1 keeps its two choices and Level 5 stays open");
ok(TEST_SOLUTIONS_36.length === 25 && TEST_SOLUTIONS_36.every((solution, index) => solution.n === index + 1), "25 detailed solutions exist in order");
ok(TEST_SOLUTIONS_36.filter((solution) => solution.level === 1).every((solution) => typeof solution.correctOption === "number" && solution.acceptableOptions?.length), "every multiple-choice item records its best answer and its acceptable alternative");
ok(TEST_SOLUTIONS_36.filter((solution) => solution.level === 2 || solution.level === 3).every((solution) => solution.accepts?.length), "every typed item records accepted forms");
ok(TEST_SOLUTIONS_36.filter((solution) => solution.level >= 4).every((solution) => solution.alternatives?.length), "every meaning/open item records a model and acceptable alternatives");

const testPreHtml = M.renderToString(M.React.createElement(M.TestArea36, { onSubmitted() {}, onGoSolutions() {} }));
ok((testPreHtml.match(/data-test-question="\d+"/g) || []).length === 25, "the pre-submit test renders exactly 25 question panels");
ok(!testPreHtml.includes("data-test-feedback") && !testPreHtml.includes("data-solution="), "no correctness, explanation or key is present before submission");
ok(!testPreHtml.includes("نتيجتك"), "no score is present before submission");
ok((testPreHtml.match(/data-option-state|data-chosen/g) || []).length === 0, "choices are not pre-marked before submission");
{
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.TestArea36, { onSubmitted() {}, onGoSolutions() {} }));
  await tick();
  const cards = [...el.querySelectorAll("[data-test-question]")];
  ok(cards.length === 25, "the mounted test exposes 25 questions");
  const firstInputs = cards.slice(0, 3).map((card) => card.querySelector('input[type="radio"]') ?? card.querySelector("input, textarea"));
  firstInputs.forEach((input) => (input.type === "radio" ? click(input) : setNative(input, "partial")));
  await tick(5);
  const submit = findButton(el, "إرسال الاختبار");
  ok(submit?.disabled, "an incomplete test cannot be submitted");
  ok(normalize(el.textContent).includes("لم يُسلَّم الاختبار") && normalize(el.textContent).includes("22"), "the blocked submit explains how many questions remain");
  click(submit);
  await tick(10);
  ok(el.querySelectorAll("[data-test-feedback]").length === 0, "clicking the blocked submit reveals nothing");
  const review = findButton(el, "مراجعة إجاباتي");
  click(review);
  await tick(5);
  ok(review.getAttribute("aria-expanded") === "true" && el.querySelectorAll("nav, ul button").length > 0, "the review panel opens and lists the questions");
  reactRoot.unmount();
  el.remove();
}
let submittedFlag = false;
{
  const { el, root: reactRoot } = M.mount(M.React.createElement(M.TestArea36, { onSubmitted() { submittedFlag = true; }, onGoSolutions() {} }));
  await tick();
  const cards = [...el.querySelectorAll("[data-test-question]")];
  const answers = {
    1: 1, 2: 1, 3: 1, 4: 0, 5: 0,
    6: "are going to build", 7: "will answer", 8: "is going to hit", 9: "'ll return", 10: "will perform",
    11: "She will travel.", 12: "They are going to study tonight.", 13: "Is he going to join us?", 14: "I won't forget.", 15: "Will she help?",
    19: "A promise is made at the moment of speaking.",
    21: "I'll help you now.",
  };
  for (const card of cards) {
    const n = Number(card.getAttribute("data-test-question"));
    if (!(n in answers)) continue;
    const radio = card.querySelectorAll('input[type="radio"]')[answers[n]];
    if (radio) click(radio);
    else setNative(card.querySelector("input, textarea"), String(answers[n]));
    await tick(2);
  }
  const submit = findButton(el, "إرسال الاختبار");
  ok(submit?.disabled, "missing answers still block submission");
  for (const card of cards) {
    const n = Number(card.getAttribute("data-test-question"));
    if (n in answers) continue;
    const input = card.querySelector("input, textarea");
    if (input.type === "radio") click(card.querySelectorAll('input[type="radio"]')[0]);
    else setNative(input, "Open response for review.");
    await tick(2);
  }
  await tick(10);
  ok(!findButton(el, "إرسال الاختبار")?.disabled, "all 25 answers enable submission");
  ok(el.querySelectorAll("[data-test-feedback]").length === 0, "a fully answered but unsubmitted test still shows no corrections");
  click(findButton(el, "إرسال الاختبار"));
  await M.act(async () => { await tick(150); });
  ok(submittedFlag, "submission notifies the shell so the solutions unlock");
  const result = el.querySelector("[data-test-result]");
  ok(!!result, "the submitted test shows a result panel");
  ok(!!result && normalize(result.textContent).includes("14.5") && normalize(result.textContent).includes("الأسئلة الموضوعية"), "the result reports 14.5 / 15 when one item uses the acceptable alternative");
  ok(el.querySelectorAll("[data-test-feedback]").length === 25, "every question receives post-submit feedback with its explanation");
  ok(el.querySelectorAll('[data-test-feedback="open"]').length === 10, "the ten meaning/open questions are labelled for model comparison instead of automatic correction");
  const accept = el.querySelectorAll('[data-test-feedback="acceptable"]');
  ok(accept.length >= 1, "grammatical alternatives are marked acceptable rather than simply wrong");
  {
    const perfect = {};
    for (const solution of TEST_SOLUTIONS_36) {
      if (solution.level === 1) perfect[solution.n] = String(solution.correctOption);
      else if (solution.level === 2 || solution.level === 3) perfect[solution.n] = solution.accepts?.[0] ?? "";
      else perfect[solution.n] = "Model answer for review.";
    }
    const graded = M.GRADING.gradeTest36(perfect, TEST_SOLUTIONS_36);
    ok(graded.score === 15 && graded.maxScore === 15 && graded.review.length === 0, "a fully matching answer set scores the full 15 objective points");
  }
  ok(normalize(el.textContent).includes("بدائل مقبولة") || normalize(el.textContent).includes("البدائل"), "accepted alternatives are documented in the feedback");
  const retry = findButton(el, "إعادة المحاولة");
  click(retry);
  await tick(10);
  ok(!el.querySelector("[data-test-result]") && el.querySelectorAll("[data-test-feedback]").length === 0, "retry clears the result and all feedback");
  ok(normalize(el.textContent).includes("0/25") || normalize(el.textContent).includes("25 سؤالًا متبقيًا"), "retry resets the answered counter");
  reactRoot.unmount();
  el.remove();
}

// ============================================================
// 6) Shell, areas, navigation and gates
// ============================================================
{
  const locked = M.renderToString(M.React.createElement(M.SolutionsArea36, { unlocked: false, onGoTest() {}, onGoTeacher() {} }));
  ok(locked.includes("data-solutions-locked") && !locked.includes("data-solution="), "solutions stay locked and answer-free before submission or teacher access");

  const { el, root: reactRoot } = M.mount(M.React.createElement(M.SolutionsArea36, { unlocked: true, onGoTest() {}, onGoTeacher() {} }));
  await tick();
  const numbers = new Set();
  for (const tab of el.querySelectorAll("nav[aria-label='مستويات الحلول'] button")) {
    click(tab);
    await tick(3);
    for (const card of el.querySelectorAll("[data-solution]")) numbers.add(Number(card.getAttribute("data-solution")));
  }
  ok(numbers.size === 25, "the unlocked solutions area exposes all 25 detailed solutions");
  ok(normalize(el.textContent).includes("بدائل مقبولة"), "solutions document acceptable alternatives");
  reactRoot.unmount();
  el.remove();
}
{
  const lockedTeacher = M.renderToString(M.React.createElement(M.TeacherArea36, { unlocked: false, onUnlockChange() {}, onGoSolutions() {} }));
  ok(lockedTeacher.includes('type="password"') && !lockedTeacher.includes("data-teacher-solution"), "the teacher area starts gated and renders no answer key");

  const { el: guide, root: guideRoot } = M.mount(M.React.createElement(M.TeacherGuide36, { onGoSolutions() {}, onLock() {} }));
  await tick();
  click(findButton(guide, "خريطة التغطية"));
  await tick();
  ok(guide.querySelectorAll("[data-coverage-section]").length === 27, "the teacher coverage map lists the opening and all 26 numbered sections");
  click(findButton(guide, "حلول الاختبار"));
  await tick();
  ok(guide.querySelectorAll("[data-teacher-solution]").length === 25, "the teacher guide holds all 25 test solutions");
  click(findButton(guide, "مفاتيح التدريب والقراءة"));
  await tick();
  ok(normalize(guide.textContent).includes("توقع منفي") && normalize(guide.textContent).includes("التحليل النحوي"), "the teacher keys include the negative prediction note and reading analysis");
  guideRoot.unmount();
  guide.remove();
}
{
  const { el: shell, root: shellRoot } = M.mount(M.React.createElement(M.Lesson36, { onExit() {} }));
  await tick();
  const root = shell.querySelector('[data-lesson="36"]');
  ok(!!root && root.getAttribute("data-l35-shell") === "lesson-1", "Lesson 36 renders through the real Lesson 1 shell");
  ok(!!shell.querySelector("aside") && !!shell.querySelector("#l36-main"), "the shell provides the rail and the scrollable main region");
  ok(shell.querySelectorAll("[data-step-nav]").length >= 4, "the shell provides its own step navigation instead of a local replica");
  ok(normalize(shell.textContent).includes("WILL vs BE GOING TO") && normalize(shell.textContent).includes("Mastering Future Decisions"), "the shell header carries the lesson identity");
  ok(shell.querySelector('[data-area="l36-lesson"]') && shell.querySelector("[data-step-id='cover']"), "the student area starts on the opening slide");

  click(shell.querySelector("[data-step-nav='next']"));
  await tick();
  ok(!!shell.querySelector("[data-step-id='s01']"), "the shell next button advances the lesson");
  click(shell.querySelector("[data-step-nav='prev']"));
  await tick();
  ok(!!shell.querySelector("[data-step-id='cover']"), "the shell previous button returns");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true })));
  await tick();
  ok(!!shell.querySelector("[data-step-id='s01']"), "ArrowLeft moves forward in RTL");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "End", bubbles: true })));
  await tick();
  ok(!!shell.querySelector("[data-step-id='s26']"), "End jumps to the final slide");
  M.act(() => document.body.dispatchEvent(new win.KeyboardEvent("keydown", { key: "Home", bubbles: true })));
  await tick();
  ok(!!shell.querySelector("[data-step-id='cover']"), "Home returns to the opening slide");

  const solutionsTab = shell.querySelector("[data-area-tab='solutions']");
  ok(solutionsTab?.getAttribute("aria-disabled") === "true" && !shell.querySelector("[data-solutions-locked]"), "the solutions tab is gated before submission");
  click(solutionsTab);
  await tick();
  ok(!!shell.querySelector("[data-step-id='cover']"), "clicking the locked tab does not open the key");

  const menuButton = shell.querySelector("button[aria-label='فهرس الدرس']");
  ok(!!menuButton, "the mobile drawer trigger comes from the shared shell");
  click(menuButton);
  await tick();
  ok(!!shell.querySelector(".fixed.inset-0.z-50") && shell.querySelectorAll("[data-step-nav]").length >= 4, "the shared mobile drawer opens with the same rail");
  M.act(() => (shell.querySelector("button[aria-label='فهرس الدرس']") ?? shell).dispatchEvent(new win.KeyboardEvent("keydown", { key: "Escape", bubbles: true })));
  await tick(10);
  ok(!shell.querySelector(".fixed.inset-0.z-50"), "Escape closes the mobile drawer");

  click(shell.querySelector("[data-area-tab='test']"));
  await M.act(async () => { await tick(80); });
  const shellTest = shell.querySelector("[data-area='l36-test']");
  ok(!!shellTest && shellTest.querySelectorAll("[data-test-question]").length === 25, "the test area opens inside the shell with 25 questions");
  ok(!shell.querySelector("[data-step-id]"), "the test area replaces the step content instead of stacking on it");

  click(shell.querySelector("[data-area-tab='teacher']"));
  await M.act(async () => { await tick(80); });
  const teacherForm = shell.querySelector("form[data-area='l36-teacher']");
  const password = teacherForm?.querySelector('input[type="password"]');
  setNative(password, "wrong-password");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await tick(5);
  ok(!!teacherForm.querySelector('[role="alert"]'), "a wrong teacher password produces an accessible error");
  setNative(password, "somer173");
  await tick(5);
  M.act(() => teacherForm.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true })));
  await M.act(async () => { await tick(120); });
  ok(!!shell.querySelector("[data-area='l36-teacher-guide']"), "the teacher password loads the navigable teacher guide");
  ok(shell.querySelector("[data-area-tab='solutions']").getAttribute("aria-disabled") !== "true", "teacher access unlocks the solutions area");

  click(shell.querySelector("[data-area-tab='solutions']"));
  await M.act(async () => { await tick(120); });
  ok(!!shell.querySelector("[data-area='l36-solutions']") && shell.querySelectorAll("[data-solution]").length === 5, "the unlocked solutions area lazy-loads the first level inside the shell");
  shellRoot.unmount();
  shell.remove();
}

// ============================================================
// 7) Student-facing copy, direction and accessibility
// ============================================================
{
  const labels = [];
  for (const html of allInitialHtml) {
    const host = document.createElement("div");
    host.innerHTML = html;
    labels.push(...findEditorialSourceLabels(host.textContent ?? ""));
  }
  ok(labels.length === 0, `student deck has no editorial source labels (${labels.slice(0, 3).map((entry) => entry.text).join(" | ")})`);
  const postHost = document.createElement("div");
  postHost.innerHTML = postText;
  ok(findEditorialSourceLabels(postHost.textContent ?? "").length === 0, "post-interaction student copy has no editorial source labels");

  const testHost = document.createElement("div");
  testHost.innerHTML = testPreHtml;
  ok(findEditorialSourceLabels(testHost.textContent ?? "").length === 0, "the test surface avoids editorial source labels");

  const solutionsHost = document.createElement("div");
  const { el: unlockedSolutions, root: unlockedRoot } = M.mount(M.React.createElement(M.SolutionsArea36, { unlocked: true, onGoTest() {}, onGoTeacher() {} }));
  await tick();
  ok(findEditorialSourceLabels(unlockedSolutions.textContent ?? "").length === 0, "the unlocked solutions surface avoids editorial source labels");
  unlockedRoot.unmount();
  unlockedSolutions.remove();
  solutionsHost.remove();
}
{
  const glassHtml = allInitialHtml[SLIDES_36.findIndex((slide) => slide.id === "s07")];
  ok(/dir="ltr"[^>]*lang="en"|lang="en"[^>]*dir="ltr"/.test(glassHtml), "English sentences render inside explicit dir=ltr lang=en islands");
  const dialogueHtml = allInitialHtml[SLIDES_36.findIndex((slide) => slide.id === "s14a")];
  ok(dialogueHtml.includes('dir="ltr"') && dialogueHtml.includes('lang="en"'), "the Lina/Omar dialogue is direction-isolated");
  ok(!/unicode-bidi\s*:\s*[^;]*override|direction\s*:\s*rtl\s*!important/i.test(allInitialHtml.join("")), "no blanket bidi override is injected by the lesson");
  const headings = allInitialHtml.filter((html) => html.includes("<h2"));
  ok(allInitialHtml[0].includes("<h1") && headings.length === SLIDES_36.length - 1, "the cover carries the lesson h1 and every other slide carries a level-2 heading");
  const inputs = testPreHtml.match(/<input/g) ?? [];
  ok(inputs.length >= 5, "the test exposes native inputs for keyboard users");
}

// ============================================================
// 8) Answer-key separation (source and production bundle)
// ============================================================
const testSource = readFileSync(join(root, "src/lessons/lesson36/TestArea36.tsx"), "utf8");
const lessonSource = readFileSync(join(root, "src/lessons/lesson36/Lesson36.tsx"), "utf8");
ok(!/import\s+[^;]*solutionsData36/.test(testSource), "the test component does not statically import the answer key");
ok(testSource.includes('import("./solutionsData36")') && testSource.includes('import("./grading36")'), "the key is loaded dynamically only when the learner submits");
ok(lessonSource.includes('lazy(() => import("./SolutionsArea36"))') && lessonSource.includes('lazy(() => import("./TeacherArea36"))'), "solutions and teacher areas are code-split");
ok(lessonSource.includes("testSubmitted || teacherUnlocked"), "solutions unlock only after submission or teacher access");
ok(!lessonSource.includes("<FinalTest"), "the formal Master Test is the only assessment surface, without a duplicate quiz widget");

const dist = join(root, "dist", "assets");
if (existsSync(dist)) {
  const files = readdirSync(dist).filter((file) => file.endsWith(".js"));
  const entryFiles = files.filter((file) => file.startsWith("index-"));
  ok(entryFiles.length >= 1, "the production build exposes an entry bundle");
  const entry = entryFiles.map((file) => readFileSync(join(dist, file), "utf8")).join("\n");
  const keyMarkers = ["teacher-authored", "I'm going to start a design course next month", "نتيجتك في الأسئلة الموضوعية"];
  ok(keyMarkers.every((marker) => !entry.includes(marker)), "the initial student bundle does not contain the answer key or grading copy");
  const keyChunks = files.filter((file) => /solutionsData36/.test(file));
  ok(keyChunks.length >= 1, "the answer key ships as its own lazily-loaded chunk");
  if (keyChunks.length) {
    const keyBundle = keyChunks.map((file) => readFileSync(join(dist, file), "utf8")).join("\n");
    ok(keyBundle.includes("انظر إلى الغيوم") || keyBundle.includes("الإجابة النموذجية") || keyBundle.includes("teacher-authored"), "the separate key chunk really contains the key");
  }
} else {
  failures.push("dist/ is missing: run npm run build before the audit");
  assertions++;
}

// ============================================================
// 9) Docs and routing
// ============================================================
{
  const app = readFileSync(join(root, "src/App.tsx"), "utf8");
  ok(app.includes('import Lesson36 from "./lessons/lesson36/Lesson36"') && app.includes('href: "#/lesson/36"') && app.includes("route === 36"), "the app registers Lesson 36 as a first-class route and hub card");
  const docsPath = join(root, "docs/lesson36-coverage.md");
  ok(existsSync(docsPath), "the coverage document exists");
  if (existsSync(docsPath)) {
    const docs = readFileSync(docsPath, "utf8");
    ok((docs.match(/^\| §\d+/gm) || []).length === 26, "the coverage document still lists all 26 numbered sections");
    ok(docs.includes("Table reconstruction contract") && docs.includes("Test and answer provenance contract"), "the coverage document records the table repair and the missing source key");
    ok(docs.includes("Lesson1Shell"), "the coverage document records that the shared Lesson 1 shell is used");
  }
  ok(!existsSync(join(root, "src/lessons/lesson36/practiceData36.ts")), "the superseded practice-data module was removed after its content moved into the typed deck");
}

rmSync(outDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`✕ Lesson 36 audit failed: ${failures.length} of ${assertions} assertions failed`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 36 audit passed: ${assertions} assertions. 27 source sections, 36 slides, 10 stages, 25-question test with post-submit grading, gated key, shared Lesson 1 shell, no student-facing source labels.`);
