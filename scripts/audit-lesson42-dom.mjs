import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import { analyzeHtml } from "./lib/bidi-sim.mjs";

// ---------------------------------------------------------------------------
// Lesson 42 DOM audit: real React render in JSDOM — navigation across every
// slide, practice gating, lab interaction, test submission, reset, teacher
// gate and BIDI. Mirrors scripts/audit-lesson41-dom.mjs.
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
mkdirSync("node_modules/.lesson42-audit", { recursive: true });
await build({
  stdin: {
    contents: `export { default as Lesson42 } from './src/lessons/lesson42/Lesson42';
export { Text42 } from './src/lessons/lesson42/design42';
export { SLIDES_42 } from './src/lessons/lesson42/slides42';
export { PRACTICE_42 } from './src/lessons/lesson42/practice42';
export { SOLUTIONS_42 } from './src/lessons/lesson42/key42';`,
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  outfile: "node_modules/.lesson42-audit/ui.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty" },
});
const { Lesson42, Text42, SLIDES_42, PRACTICE_42, SOLUTIONS_42 } = await import(`../node_modules/.lesson42-audit/ui.mjs?${Date.now()}`);
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
  "I can speak English.",
  "She can't drive a car.",
  "Could you repeat the question?",
  "We could work together after school.",
  "He was able to finish the project.",
  "You'll be able to swim next year.",
]) {
  for (const content of [text, `لاحظ المثال: ${text} — نستخدم الفعل الناقص قبل الفاعل.`]) {
    const html = renderToStaticMarkup(React.createElement("div", { dir: "rtl" }, React.createElement(Text42, { text: content })));
    ok(analyzeHtml(html).every((part) => part.violations.length === 0), `BIDI clean: ${content}`);
    ok(html.includes('dir="ltr"'), "explicit LTR isolation");
  }
}

// --- mount --------------------------------------------------------------
const root = createRoot(document.getElementById("root"));
await act(async () => root.render(React.createElement(Lesson42, { onExit: () => {} })));
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

ok(document.querySelector('[data-lesson="42"]'), "lesson shell renders");
ok(document.body.textContent.includes("From Ability to Polite Communication"), "cover title present");
ok(document.body.textContent.includes("CAN") && document.body.textContent.includes("COULD"), "cover states the two modals");
const stations = all("aside nav button").filter((button) => button.hasAttribute("aria-expanded"));
ok(stations.length === 10, `ten station buttons (got ${stations.length})`);
ok(document.querySelector("#l42-main"), "scroll container present");

// --- walk every slide ---------------------------------------------------
for (let i = 0; i < SLIDES_42.length; i += 1) {
  const counter = all("header span").at(-1)?.textContent ?? "";
  ok(counter.replace(/\s/g, "") === `${i + 1}/${SLIDES_42.length}`, `slide ${i + 1} counter (${counter})`);
  for (const element of all("[aria-controls],[aria-labelledby],[aria-describedby]")) {
    for (const attribute of ["aria-controls", "aria-labelledby", "aria-describedby"]) {
      for (const id of (element.getAttribute(attribute) || "").split(/\s+/).filter(Boolean)) ok(document.getElementById(id), `ARIA target resolves: ${id}`);
    }
  }
  for (const button of all("button")) ok(button.textContent.trim() || button.getAttribute("aria-label"), "button has an accessible name");
  for (const field of all("textarea,select,input")) ok(field.closest("label") || field.getAttribute("aria-label") || field.labels?.length, "form control has an accessible name");
  // Keyboard users land on the slide title after navigation (the shell calls
  // getElementById("l42-title").focus()), so the target must exist on real slides.
  if (SLIDES_42[i].kind !== "cover") ok(document.getElementById("l42-title"), `slide ${i + 1}: focus target #l42-title exists`);
  // The final-test answer key must never reach the DOM while walking the deck.
  ok(!document.body.textContent.includes("مفتاح تصحيح الدرس 42"), `slide ${i + 1}: no answer-key heading in the DOM`);
  ok(!document.body.textContent.includes("الوظيفة النحوية المختبَرة"), `slide ${i + 1}: no solution metadata in the DOM`);
  if (i < SLIDES_42.length - 1) await click(next());
}
ok(!prev().disabled, "last slide can go back");

// --- practice gating ----------------------------------------------------
const slideIndex = (id) => SLIDES_42.findIndex((slide) => slide.id === id);
const position = () => Number((all("header span").at(-1)?.textContent || "").split("/")[0].trim()) - 1;
async function goto(id) {
  const target = slideIndex(id);
  ok(target >= 0, `slide ${id} exists`);
  for (let guard = 0; guard <= SLIDES_42.length; guard += 1) {
    const now = position();
    if (now === target) break;
    await click(now < target ? next() : prev());
  }
  ok(position() === target, `reached ${id}`);
}

// Free-text item: the answer stays hidden until a real attempt.
await goto("p35-1");
const compare = () => all("button").find((button) => button.textContent.includes("قارن إجابتي بالحل"));
ok(compare(), "practice compare button renders");
ok(compare().disabled, "compare button disabled before an attempt");
ok(!document.body.textContent.includes("She can't drive a car."), "practice answer hidden before the attempt");
const area = document.querySelector("textarea");
ok(area, "practice item exposes an input");
await type(area, "She can't drive a car.");
ok(!compare().disabled, "compare enabled once the field is filled");
await click(compare());
ok(document.body.textContent.includes("She can't drive a car."), "answer revealed after a real attempt");
ok(document.body.textContent.includes("الإجابة"), "reason shown with the answer");

// Two-field item: both blanks are mandatory.
await goto("p38-1");
const firstCard = all("article").find((article) => article.querySelector("textarea"));
ok(firstCard, "pair practice card renders");
const pairAreas = [...firstCard.querySelectorAll("textarea")];
ok(pairAreas.length === 2, `two-blank error-correction item exposes two fields (got ${pairAreas.length})`);
const cardCompare = () => [...firstCard.querySelectorAll("button")].find((button) => button.textContent.includes("قارن إجابتي بالحل"));
ok(cardCompare(), "pair card has its own compare button");
ok(!firstCard.textContent.includes("الإجابة"), "pair answer hidden before the attempt");
await type(pairAreas[0], "He can swims");
ok(cardCompare().disabled, "compare stays disabled with only one blank filled");
await type(pairAreas[1], "He can swim");
ok(!cardCompare().disabled, "compare enabled once both blanks are filled");
await click(cardCompare());
ok(firstCard.textContent.includes("الإجابة"), "pair item reveals its answer after the attempt");

// Choice item: radios gate the same way.
await goto("p34-1");
const choice = all('[role="group"] button').find((button) => button.textContent.trim() === "can");
ok(choice, "choice item renders its options");
ok(compare().disabled, "choice item locked before a selection");
await click(choice);
ok(!compare().disabled, "choice item unlocked after a selection");

// --- lab interaction ----------------------------------------------------
await goto("lab-build-1");
const pick = (label, option) => {
  const group = all('[role="group"]').find((element) => element.getAttribute("aria-label") === label);
  ok(Boolean(group), `lab group ${label} exists`);
  return [...group.querySelectorAll("button")].find((button) => button.textContent.trim() === option);
};
ok(!document.body.textContent.includes("القاعدة الذهبية: بعد CAN نستخدم V1"), "lab feedback hidden before a choice");
// Wrong verb form first: the lab must name the broken rule.
await click(pick("فاعل الجملة 1", "I"));
await click(pick("الفعل الناقص 1", "can"));
await click(pick("صيغة الفعل 1", "swims"));
ok(document.body.textContent.includes("القاعدة المكسورة"), "lab names the broken rule for a wrong verb form");
ok(document.body.textContent.includes("بعد CAN/COULD يأتي V1 فقط"), "broken-rule message states the V1 rule");
// Then the correct build.
await click(pick("صيغة الفعل 1", "swim"));
ok(document.body.textContent.includes("القاعدة الذهبية: بعد CAN نستخدم V1"), "lab confirms the correct build");
ok(!document.body.textContent.includes("القاعدة المكسورة"), "broken-rule message clears once the build is correct");

// WH word-order lab: the tokens carry no "?", so the comparison must normalise it
// or a correctly ordered sentence can never validate.
await goto("lab-wh");
for (const token of ["What", "can", "you", "do"]) {
  const tokenButton = all("button").find((button) => button.textContent.trim() === token && !button.disabled);
  ok(tokenButton, `WH lab exposes the token "${token}"`);
  await click(tokenButton);
}
ok(document.body.textContent.includes("✓ صحيح"), "WH lab marks the correctly ordered sentence correct");
ok(!document.body.textContent.includes("✕ راجع"), "WH lab does not reject the correct order");

// Classifier lab reacts to a function choice.
await goto("lab-permission");
ok(all('[role="group"]').length > 0, "permission lab exposes classification choices");
const permissionChoice = all('[role="group"] button').find((button) => /استئذان|إذن|permission/i.test(button.textContent));
ok(permissionChoice, "permission lab offers a permission option");
await click(permissionChoice);

// --- writing ------------------------------------------------------------
await goto("write-editor");
const writingArea = document.querySelector("textarea");
ok(writingArea, "writing editor exposes a textarea");
await type(writingArea, "I can speak English. I can't swim. I could run fast. I couldn't drive. I was able to finish it. I will be able to travel. Could you help me? Could I leave? We could study. It could rain. She can draw. They can cook.");
ok(document.body.textContent.includes("12"), "sentence counter reacts to typing");

// --- final test ---------------------------------------------------------
await goto("test-l1-a");
ok(all("[data-question-id]").length > 0, "level 1 shows its questions");
// "الإجابة الصحيحة" is also the source level heading, so probe the markers that
// only the graded key can produce instead of the bare phrase.
ok(document.querySelectorAll("[data-solution-id]").length === 0, "no solution nodes on a test slide");
ok(!document.querySelector('[data-area="solutions"]'), "no solutions area on a test slide");
ok(!document.body.textContent.includes("السبب: بعد will نستخدم be able to"), "no explanatory key text on test slides");
ok(!document.body.textContent.includes("الوظيفة النحوية المختبَرة"), "no solution metadata on test slides");
ok(!document.body.textContent.includes("شرح المنصة"), "no platform explanation on test slides");
ok(!document.body.textContent.includes("سبب §41 كما ورد في المصدر"), "no §41 reason on test slides");
ok(document.querySelectorAll("[data-teacher-answer]").length === 0, "no practice keys on test slides");
ok(document.querySelectorAll("[data-correct],[aria-correct],.is-correct").length === 0, "no attribute or class marks the right option before submission");
ok(document.body.textContent.includes("اختر الإجابة الصحيحة"), "the source level heading is preserved verbatim");
const submit = () => all("button").find((button) => button.textContent.includes("تسليم الاختبار النهائي"));
ok(!submit(), "submit button only exists on the last level");
await goto("test-result");
ok(document.body.textContent.includes("لم يتم التسليم بعد"), "results locked before submission");
ok(!document.querySelector('[data-area="solutions"]'), "no solutions DOM before submission");
ok(document.querySelectorAll("[data-solution-id]").length === 0, "no solution nodes before submission");

const TEST_PAGES = ["test-l1-a", "test-l1-b", "test-l2-a", "test-l2-b", "test-l3-a", "test-l3-b", "test-l4-a", "test-l4-b", "test-l4-c", "test-l5-a", "test-l5-b", "test-l5-c", "test-l5-d"];
let answered = 0;
let cards = 0;
const seenIds = [];
for (const page of TEST_PAGES) {
  await goto(page);
  const pageCards = all("[data-question-id]");
  cards += pageCards.length;
  pageCards.forEach((element) => seenIds.push(element.getAttribute("data-question-id")));
  ok(pageCards.length > 0, `${page} renders its questions`);
  for (const fieldset of pageCards) {
    const radio = fieldset.querySelector('input[type="radio"]');
    if (radio) {
      await click(radio);
      answered += 1;
    } else {
      for (const field of fieldset.querySelectorAll("textarea")) {
        await type(field, "Attempt");
        answered += 1;
      }
    }
  }
}
ok(cards === 25, `all 25 question cards render across the eleven test pages (got ${cards})`);
ok(new Set(seenIds).size === 25, `every question id appears exactly once across the test pages (${new Set(seenIds).size} distinct of ${seenIds.length} rendered)`);
ok(seenIds.length === 25, "no question card is rendered on two pages");
// 25 questions + the extra blank on Q7 = 26 answer fields.
ok(answered === 26, `all 26 answer fields filled (25 questions, Q7 has two blanks) — got ${answered}`);
ok(cards === 25, "the twelve test pages render all 25 question cards exactly once");
ok(submit(), "submit appears on the final page of level 5");
ok(!submit().disabled, "submit enabled once all 25 questions are answered");
await click(submit());
await act(async () => {
  await new Promise((resolve) => setTimeout(resolve, 120));
});
ok(document.body.textContent.includes("نتيجتك"), "score shown after submission");
ok(document.querySelectorAll("[data-solution-id]").length === 25, "25 detailed solutions mounted after submission");
ok(document.body.textContent.includes("الإجابة الصحيحة") && document.body.textContent.includes("شرح المنصة"), "each solution shows answer + explanation");
for (const solution of document.querySelectorAll("[data-solution-id]")) {
  const id = solution.getAttribute("data-solution-id");
  ok(solution.textContent.includes("الإجابة الصحيحة"), `solution ${id} states the correct answer`);
  ok(solution.textContent.includes("الوظيفة النحوية المختبَرة"), `solution ${id} names the grammatical function`);
  ok(solution.textContent.includes("سبب §41 كما ورد في المصدر"), `solution ${id} quotes the §41 reason`);
  ok(solution.textContent.includes("شرح المنصة"), `solution ${id} includes the platform explanation`);
}

// reset relocks
const reset = all("button").find((button) => button.textContent.includes("إعادة الاختبار"));
ok(reset, "reset button exists after submission");
await click(reset);
await goto("test-result");
ok(document.body.textContent.includes("لم يتم التسليم بعد"), "reset relocks the results");
ok(document.querySelectorAll("[data-solution-id]").length === 0, "reset unmounts the solutions");
await goto("test-l1-a");
ok(all('input[type="radio"]:checked').length === 0, "reset clears MCQ answers");
ok(all("textarea").every((field) => field.value === ""), "reset clears free-text answers");

// --- reading ------------------------------------------------------------
await goto("read-passage-1");
ok(document.body.textContent.includes("The Young Inventor"), "reading slide shows the passage title");
ok(document.body.textContent.includes("Daniel is thirteen years old"), "reading passage body renders");
ok(!document.body.textContent.includes("He is thirteen years old."), "reading answers stay hidden on the passage slide");
await goto("read-q-1");
ok(all("article").length >= 3, "reading questions render as practice cards");
ok(!document.body.textContent.includes("He couldn't understand how electronic devices worked."), "reading answers hidden before an attempt");

// --- teacher gate -------------------------------------------------------
await goto("teacher");
ok(!document.querySelector("[data-teacher-guide]"), "teacher guide absent before the password");
// The locked panel describes what the password unlocks, so probe the actual
// key blocks and answer text rather than the word "مفاتيح التدريبات".
ok(document.querySelectorAll("[data-teacher-answer]").length === 0, "no practice key blocks before the password");
ok(!document.body.textContent.includes("PRACTICE KEYS"), "practice key panel absent before the password");
ok(!document.body.textContent.includes("now تشير إلى الحاضر"), "no practice reason text before the password");
const passwordInput = document.querySelector('input[type="password"]');
ok(passwordInput, "teacher gate exposes a password field");
await type(passwordInput, "wrong-password");
await click(all("button").find((button) => button.textContent.includes("فتح مساحة المعلم")));
ok(document.querySelector('[role="alert"]'), "wrong password is rejected with an alert");
ok(!document.querySelector("[data-teacher-guide]"), "guide stays unmounted after a failed password");
await type(passwordInput, "somer173");
await click(all("button").find((button) => button.textContent.includes("فتح مساحة المعلم")));
await act(async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
});
ok(document.querySelector("[data-teacher-guide]"), "teacher guide mounts after the correct password");
ok(document.querySelectorAll("[data-teacher-answer]").length === PRACTICE_42.length, `teacher guide lists all ${PRACTICE_42.length} practice keys`);
ok(document.querySelectorAll("[data-solution-id]").length === SOLUTIONS_42.length, `teacher area renders all ${SOLUTIONS_42.length} detailed test solutions`);
for (const solution of document.querySelectorAll("[data-solution-id]")) {
  const id = solution.getAttribute("data-solution-id");
  ok(solution.textContent.includes("الإجابة الصحيحة"), `teacher solution ${id} states the correct answer`);
  ok(solution.textContent.includes("شرح المنصة"), `teacher solution ${id} includes the platform explanation`);
}
ok(document.body.textContent.includes(`مفاتيح التدريبات الـ${PRACTICE_42.length}`), "practice key section is real content, not a placeholder");
ok(document.body.textContent.includes("PRACTICE KEYS"), "practice key panel mounted");
ok(document.body.textContent.includes("جهة العميل") || document.body.textContent.includes("client-side"), "the gate is documented as a client-side lock");

await act(async () => root.unmount());
console.log(`Lesson 42 DOM audit passed: ${checks} assertions · ${SLIDES_42.length} slides navigated · practice gating, pair blanks, lab builder, writing counter, test submission/reset, reading cards, teacher gate and 12 BIDI cases verified.`);
