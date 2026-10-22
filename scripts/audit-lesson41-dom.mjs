import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import { analyzeHtml } from "./lib/bidi-sim.mjs";

// ---------------------------------------------------------------------------
// Lesson 41 DOM audit: real React render in JSDOM — navigation across every
// slide, practice gating, test submission, reset, teacher gate and BIDI.
// ---------------------------------------------------------------------------
const dom = new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>', {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
for (const key of ["window", "document", "navigator", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement", "Node", "Event", "MouseEvent", "KeyboardEvent", "MutationObserver", "getComputedStyle", "localStorage"]) {
  Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
// jsdom has no Element.scrollTo; the real browser shell scrolls to top on slide change.
dom.window.HTMLElement.prototype.scrollTo = function scrollTo() {};
mkdirSync("node_modules/.lesson41-audit", { recursive: true });
await build({
  stdin: {
    contents: `export { default as Lesson41 } from './src/lessons/lesson41/Lesson41';
export { Text41 } from './src/lessons/lesson41/design';
export { SLIDES_41 } from './src/lessons/lesson41/slides41';`,
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  outfile: "node_modules/.lesson41-audit/ui.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty" },
});
const { Lesson41, Text41, SLIDES_41 } = await import(`../node_modules/.lesson41-audit/ui.mjs?${Date.now()}`);
const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { renderToStaticMarkup } = await import("react-dom/server");
const { act } = React;

let checks = 0;
const ok = (condition, message) => {
  checks++;
  assert.ok(condition, message);
};

// --- BIDI ---------------------------------------------------------------
for (const text of [
  "Does she study?",
  "She hasn't finished.",
  "She will have been studying.",
  "Did he do the experiment?",
  "Has she been studying?",
  "Does she have a bicycle?",
]) {
  for (const content of [text, `لاحظ المثال: ${text} — نستخدم الفعل المساعد الأول.`]) {
    const html = renderToStaticMarkup(React.createElement("div", { dir: "rtl" }, React.createElement(Text41, { text: content })));
    ok(analyzeHtml(html).every((part) => part.violations.length === 0), `BIDI clean: ${content}`);
    ok(html.includes('dir="ltr"'), "explicit LTR isolation");
  }
}

// --- mount --------------------------------------------------------------
const root = createRoot(document.getElementById("root"));
await act(async () => root.render(React.createElement(Lesson41, { onExit: () => {} })));
const all = (selector) => [...document.querySelectorAll(selector)];
async function click(element) {
  ok(Boolean(element), "click target exists");
  await act(async () => element.click());
}
async function type(element, value) {
  await act(async () => {
    const proto = element.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
const next = () => all("button").find((button) => button.textContent.includes("التالي"));
const prev = () => all("button").find((button) => button.textContent.includes("السابق"));

ok(document.querySelector('[data-lesson="41"]'), "lesson shell renders");
ok(document.body.textContent.includes("Master Auxiliary Verbs"), "cover title present");
const stations = all("aside nav button").filter((button) => button.hasAttribute("aria-expanded"));
ok(stations.length === 8, `eight station buttons (got ${stations.length})`);

// --- walk every slide ---------------------------------------------------
for (let i = 0; i < SLIDES_41.length; i += 1) {
  const counter = all("header span").at(-1)?.textContent ?? "";
  ok(counter.replace(/\s/g, "") === `${i + 1}/${SLIDES_41.length}`, `slide ${i + 1} counter (${counter})`);
  for (const element of all('[aria-controls],[aria-labelledby],[aria-describedby]')) {
    for (const attribute of ["aria-controls", "aria-labelledby", "aria-describedby"]) {
      for (const id of (element.getAttribute(attribute) || "").split(/\s+/).filter(Boolean)) ok(document.getElementById(id), `ARIA target resolves: ${id}`);
    }
  }
  for (const button of all("button")) ok(button.textContent.trim() || button.getAttribute("aria-label"), "button has an accessible name");
  for (const field of all("textarea,select,input")) ok(field.closest("label") || field.getAttribute("aria-label") || field.labels?.length, "form control has an accessible name");
  if (i < SLIDES_41.length - 1) await click(next());
}
ok(!prev().disabled, "last slide can go back");

// --- practice gating ----------------------------------------------------
const slideIndex = (id) => SLIDES_41.findIndex((slide) => slide.id === id);
const position = () => Number((all("header span").at(-1)?.textContent || "").split("/")[0].trim()) - 1;
async function goto(id) {
  const target = slideIndex(id);
  ok(target >= 0, `slide ${id} exists`);
  for (let guard = 0; guard <= SLIDES_41.length; guard += 1) {
    const now = position();
    if (now === target) break;
    await click(now < target ? next() : prev());
  }
  ok(position() === target, `reached ${id}`);
}
await goto("p30-1");
const firstP30 = document.querySelector('[data-question-id]') ?? document.querySelector("article.rounded-2xl");
const practiceCard = all("article").find((article) => article.textContent.includes("She is reading a novel."));
ok(practiceCard, "practice item renders its source prompt");
const compare = [...practiceCard.querySelectorAll("button")].find((button) => button.textContent.includes("قارن"));
ok(compare.disabled, "compare button disabled before an attempt");
ok(!practiceCard.textContent.includes("is → reading"), "answer hidden before the attempt");
const fields = [...practiceCard.querySelectorAll("textarea")];
await type(fields[0], "is");
await type(fields[1], "reading");
ok(!compare.disabled, "compare enabled once both fields are filled");
await click(compare);
ok(practiceCard.textContent.includes("is → reading"), "answer revealed after a real attempt");
ok(practiceCard.textContent.includes("الإجابة"), "reason shown with the answer");

// lab interaction
await goto("lab-chain");
const select = document.querySelector("select");
ok(select, "chain lab exposes a sentence selector");
const noAux = all("button").find((button) => button.textContent.trim() === "لا يوجد");
await click(noAux);
const questionButton = all("button").find((button) => button.textContent.includes("كوّن سؤالًا"));
ok(questionButton && questionButton.disabled, "question builder locked until the correct first auxiliary is chosen");
await act(async () => {
  Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value").set.call(select, "3");
  select.dispatchEvent(new Event("change", { bubbles: true }));
});
await click(all("button").find((button) => button.textContent.trim() === "لا يوجد"));
await click(all("button").find((button) => button.textContent.includes("كوّن سؤالًا")));
ok(document.body.textContent.includes("Does she study?"), "do-support question built for a sentence without an auxiliary");

// writing counter
await goto("write-editor");
const writingArea = document.querySelector("textarea");
await type(writingArea, "I am a student. I study English. I have finished my homework. I do enjoy grammar. I have a bicycle. By Friday I will have completed it. By next year I will have been learning English. Do you study every day? Have you finished the lesson? I did understand the task. She has been working. They are learning.");
ok(document.body.textContent.includes("12"), "sentence counter reacts to typing");

// --- final test ---------------------------------------------------------
await goto("test-l1");
ok(all('[data-question-id]').length === 5, "level 1 shows five questions");
ok(!document.body.textContent.includes("الإجابة الصحيحة"), "no answers on the test slides");
ok(!document.body.textContent.includes("تكرر التطابق"), "no explanatory key text on test slides");
const submit = () => all("button").find((button) => button.textContent.includes("تسليم الاختبار النهائي"));
ok(!submit(), "submit button only exists on the last level");
await goto("test-result");
ok(document.body.textContent.includes("لم يتم التسليم بعد"), "results locked before submission");
ok(!document.querySelector('[data-area="solutions"]'), "no solutions DOM before submission");

await goto("test-l1");
const TEST_PAGES = ["test-l1", "test-l2-a", "test-l2-b", "test-l3-a", "test-l3-b", "test-l4-a", "test-l4-b", "test-l4-c", "test-l5-a", "test-l5-b"];
for (const page of TEST_PAGES) {
  await goto(page);
  ok(all("[data-question-id]").length > 0, `${page} renders its questions`);
  for (const fieldset of all("[data-question-id]")) {
    const radio = fieldset.querySelector('input[type="radio"]');
    if (radio) await click(radio);
    else for (const area of fieldset.querySelectorAll("textarea")) await type(area, "Attempt");
  }
}
ok(submit(), "submit appears on the final page of level 5");
ok(!submit().disabled, "submit enabled once all 25 questions are answered");
await click(submit());
await act(async () => {
  await new Promise((resolve) => setTimeout(resolve, 80));
});
ok(document.body.textContent.includes("نتيجتك"), "score shown after submission");
ok(document.querySelectorAll("[data-solution-id]").length === 25, "25 detailed solutions mounted after submission");
ok(document.body.textContent.includes("الإجابة الصحيحة") && document.body.textContent.includes("التفسير التعليمي"), "each solution shows answer + explanation");

// reset relocks
const reset = all("button").find((button) => button.textContent.includes("إعادة الاختبار"));
await click(reset);
await goto("test-result");
ok(document.body.textContent.includes("لم يتم التسليم بعد"), "reset relocks the results");
await goto("test-l1");
ok(all('input[type="radio"]:checked').length === 0, "reset clears MCQ answers");
ok(all("textarea").every((area) => area.value === ""), "reset clears free-text answers");

// --- teacher gate -------------------------------------------------------
await goto("teacher");
ok(!document.querySelector("[data-teacher-guide]"), "teacher guide absent before the password");
const passwordInput = document.querySelector('input[type="password"]');
await type(passwordInput, "wrong-password");
await click(all("button").find((button) => button.textContent.includes("فتح مساحة المعلم")));
ok(document.querySelector('[role="alert"]'), "wrong password is rejected with an alert");
ok(!document.querySelector("[data-teacher-guide]"), "guide stays unmounted after a failed password");
await type(passwordInput, "somer173");
await click(all("button").find((button) => button.textContent.includes("فتح مساحة المعلم")));
await act(async () => {
  await new Promise((resolve) => setTimeout(resolve, 120));
});
ok(document.querySelector("[data-teacher-guide]"), "teacher guide mounts after the correct password");
ok(document.querySelectorAll("[data-teacher-answer]").length === 66, "teacher guide lists all 66 practice keys");
ok(document.querySelectorAll("[data-solution-id]").length === 25, "teacher area renders all 25 detailed test solutions");
for (const solution of document.querySelectorAll("[data-solution-id]")) {
  ok(solution.textContent.includes("الإجابة الصحيحة"), `teacher solution ${solution.getAttribute("data-solution-id")} states the correct answer`);
  ok(solution.textContent.includes("التفسير التعليمي"), `teacher solution ${solution.getAttribute("data-solution-id")} includes the teaching explanation`);
}
ok(document.body.textContent.includes("مفاتيح التدريبات"), "practice key section is real content, not a placeholder");

await act(async () => root.unmount());
console.log(`Lesson 41 DOM audit passed: ${checks} assertions · ${SLIDES_41.length} slides navigated · practice gating, lab builder, test submission/reset, teacher gate and 10 BIDI cases verified.`);
