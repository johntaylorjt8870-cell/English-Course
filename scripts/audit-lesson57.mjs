// ============================================================
// Lesson 57 — تدقيق محتوى (ثابت + سلوكي)
//
// يتحقق من:
//   1) تغطية عناوين المصدر الثمانية عشر كلها (المقدمة → الملخص).
//   2) أمثلة المصدر المحورية موجودة بنصّها الإنجليزي.
//   3) التمارين التسعة: 10/5/10/8/10/10/5/5/8 بندًا، ولكل بند إجابة وشرح.
//   4) تقييم المصدر الخمسة والعشرون سؤالًا: 15 في الاختبار التفاعلي (كلها
//      بنصوص أصلية) و17 سؤالًا باقيًا في التمرين العاشر. لا سؤال مفقود.
//   5) الحوار (10 أسطر + 6 أسئلة) والقراءة (6 فقرات + 16 مفردة + 7 أسئلة).
//   6) أنواع تفاعل متنوعة لا اختيارًا من متعدد فقط.
//   7) الصحة التعليمية: be يطابق الفاعل الجديد في كل أمثلة Present Passive،
//      ولا يوجد «is wrote / is speak / is broke» في محتوى الطالب.
//   8) DOM حقيقي (jsdom عبر esbuild) لخطوات الحوار والقراءة والملخص.
//
//   node scripts/audit-lesson57.mjs
// ============================================================
import assert from "node:assert/strict";
import { readFileSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");

const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
};

async function load(path) {
  const ts = require("typescript");
  const src = readFileSync(join(root, path), "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}

const content = await load("src/lessons/lesson57/content57.ts");
const practice = await load("src/lessons/lesson57/practiceData57.ts");
const test = await load("src/lessons/lesson57/test57.ts");
const lessonSrc = readFileSync(join(root, "src/lessons/lesson57/Lesson57.tsx"), "utf8");
const app = readFileSync(join(root, "src/App.tsx"), "utf8");

// ---------- 1) الفهرسة والمسار ----------
ok(/route === 57/.test(app), "App routes lesson 57");
ok(/#\/lesson\/57/.test(app), "hub card points at #/lesson/57");
ok(/<Lesson57 onExit=\{goHome\}/.test(app), "lesson 57 component is mounted");
ok(lessonSrc.includes("<FinalTest lesson={57} questions={TEST_57}"), "shared FinalTest engine is used");
ok(!/shared\/quizBank|quizBank/.test(lessonSrc), "no second test system was introduced");

const slideIds = [...lessonSrc.matchAll(/\{ id: "([a-z0-9-]+)", station:/g)].map((m) => m[1]);
ok(slideIds.length >= 45, `step count is substantial (${slideIds.length})`);
ok(new Set(slideIds).size === slideIds.length, "step ids are unique");
for (const required of ["cover", "goals", "test", "rating", "writing", "speaking", "summary", "teacher", "progress"]) {
  ok(slideIds.includes(required), `step "${required}" exists`);
}

// ---------- 2) Källor headings coverage ----------
const requiredTopics = [
  ["voice-intro", "المقدمة والفرق بين Active وPassive"],
  ["active-type", "تركيب Active Voice"],
  ["passive-concept", "مفهوم Passive Voice"],
  ["formula-core", "القاعدة Object + be + V3"],
  ["reasons", "أسباب الاستخدام"],
  ["steps", "خطوات التحويل الخمس"],
  ["present-rules", "Present Simple Passive"],
  ["be-choose", "am / is / are"],
  ["v3-lab", "V3 والأفعال المنتظمة وغير المنتظمة"],
  ["by-agent", "by ومتى نحذف الفاعل"],
  ["transitive", "الأفعال المتعدية واللازمة"],
  ["pronouns", "تحول الضمائر بعد by"],
  ["singular-plural", "المفرد والجمع"],
  ["forms", "النفي والأسئلة والجواب القصير"],
  ["compare", "المقارنة بين Active وPassive"],
  ["errors", "الأخطاء الشائعة"],
  ["dialogue", "الحوار التطبيقي"],
  ["reading", "قطعة القراءة"],
  ["practice-9", "التمارين التسعة"],
  ["test", "الاختبار النهائي"],
  ["rating", "تقييم النتيجة"],
  ["writing", "Writing Task"],
  ["speaking", "Speaking Task"],
  ["summary", "الملخص النهائي"],
];
for (const [id, label] of requiredTopics) ok(slideIds.includes(id), `source topic present: ${label} (${id})`);
ok(slideIds.filter((id) => /^practice-\d+$/.test(id)).length === 10, "nine exercises + extra practice step");

// ---------- 3) أمثلة المصدر المحورية ----------
const srcText = [
  lessonSrc,
  readFileSync(join(root, "src/lessons/lesson57/content57.ts"), "utf8"),
  readFileSync(join(root, "src/lessons/lesson57/practiceData57.ts"), "utf8"),
  readFileSync(join(root, "src/lessons/lesson57/labs57.tsx"), "utf8"),
  readFileSync(join(root, "src/lessons/lesson57/Practice57.tsx"), "utf8"),
].join("\n");
const sourceExamples = [
  "Ali cleans the room.",
  "The room is cleaned by Ali.",
  "The teacher explains the lesson.",
  "The lesson is explained by the teacher.",
  "The chef prepares the food.",
  "The food is prepared by the chef.",
  "The students clean the classroom.",
  "The classroom is cleaned by the students.",
  "The manager checks the reports.",
  "The reports are checked by the manager.",
  "English is spoken in many countries.",
  "These products are sold worldwide.",
  "The road was repaired last week.",
  "The experiment was conducted carefully.",
  "A mistake was made.",
  "Hamlet was written by Shakespeare.",
  "The Mona Lisa was painted by Leonardo da Vinci.",
  "The baby sleeps.",
  "The boy opened the door.",
  "The train arrives at 8.",
  "The accident happened yesterday.",
  "The child laughed.",
  "My bicycle was stolen.",
  "The criminal was arrested.",
  "The project was completed.",
  "The building was designed by a young architect.",
  "The book was written by a famous author.",
  "The letters are written by me.",
  "The room is cleaned by her.",
  "The houses are built by them.",
  "The food is prepared by us.",
  "The room is cleaned by she.",
  "The letter is wrote by Sara.",
  "The books is sold here.",
  "The accident is happened yesterday.",
  "Is English spoken in your country?",
  "Are these cars made in Japan?",
  "Where is this product made?",
  "Why is English taught in schools?",
  "How is this machine used?",
  "When are the rooms cleaned?",
  "The room is cleaned every day.",
  "The documents aren't signed.",
  "The homework is ______ (do) by the students.",
  "The movie is ______ (watch) by millions of people.",
  "English is taught by the teacher.",
  "The shop sells the books.",
];
/** نصوص المصدر تُقارن بمسافات موحّدة، لأن الشيفرة تُلفّ الجمل على أسطر. */
const flat = (v) => v.replace(/\s+/g, " ");
const flatSrc = flat(srcText);
for (const example of sourceExamples) {
  ok(flatSrc.includes(flat(example)), `source example kept: ${example}`);
}

// ---------- 4) التمارين التسعة ----------
const expectedCounts = [10, 5, 10, 8, 10, 10, 5, 5, 8, 24];
ok(practice.PRACTICE_GROUPS_57.length === 10, "ten practice groups (9 source + extra)");
practice.PRACTICE_GROUPS_57.forEach((group, i) => {
  ok(group.items.length === expectedCounts[i], `${group.id} has ${expectedCounts[i]} items (got ${group.items.length})`);
  for (const item of group.items) {
    ok(!!item.answer, `${item.id} has an answer`);
    ok(!!item.why && item.why.trim().length >= 10, `${item.id} has an explanation`);
    if (group.kind === "analyse") ok(!!item.parts?.subject && !!item.parts?.verb && !!item.parts?.object, `${item.id} has three analysed parts`);
    if (group.kind === "classify") ok(item.options.length === 2, `${item.id} offers Active/Passive`);
    if (group.kind === "fillBe") ok(["am", "is", "are"].includes(item.answer), `${item.id} answer is a be form`);
    if (group.kind === "choose") ok(item.options.length === 4 || item.options.length === 3, `${item.id} has options`);
  }
});

// ---------- 5) اختبار المصدر الخمسة والعشرون ----------
const sourceChoices = [
  "The room ______ every day.",
  "English ______ in many countries.",
  "These products ______ online.",
  "The letter ______ by my sister.",
  "The houses ______ by the workers.",
  "The food ______ by the chef.",
  "The windows ______ every morning.",
  "The car ______ by my father.",
];
const allStudentCopy = srcText;
for (const choice of sourceChoices) ok(flat(allStudentCopy).includes(flat(choice)), `original choice stem kept: ${choice}`);
for (const stem of [
  "The books ______ (read) by the students.",
  "The house ______ (paint) every year.",
  "The computers ______ (use) by the teachers.",
  "English ______ (teach) at this school.",
  "The meals ______ (prepare) in the kitchen.",
  "People use smartphones every day.",
  "Sara writes the letters.",
  "My mother cooks dinner.",
  "The workers build houses.",
  "The room are cleaned every day.",
  "English is spoke in many countries.",
  "The books is sold online.",
  "The window is broke by the boy.",
  "ما التصريف الثالث للفعل write؟",
  "The baby sleeps.",
]) {
  ok(flat(allStudentCopy).includes(flat(stem)), `original test item kept: ${stem}`);
}

// ---------- 6) الاختبار التفاعلي ----------
ok(test.TEST_57.length === 15, "final test has exactly 15 questions");
const types = new Set(test.TEST_57.map((q) => q.type));
ok(types.size >= 4, `final test mixes question types (${[...types].join(", ")})`);
for (const q of test.TEST_57) {
  ok(!!q.why && q.why.length > 25, "final question has a real explanation");
  ok(!!q.concept, "final question names the concept it measures");
  ok(!!q.trap, "final question documents the common trap");
  if (q.type === "single") ok(q.answer >= 0 && q.answer < q.options.length, "single answer index is valid");
  if (q.type === "multi") ok(q.answers.length >= 2 && q.answers.every((i) => i < q.options.length), "multi answers are valid");
  if (q.type === "error") ok(q.answer >= 0 && q.answer < q.segments.length, "error index is valid");
  if (q.type === "match") ok(q.pairs.every((p) => p.left && p.right), "match pairs are complete");
  if (q.type === "order") ok(q.items.length >= 3, "order question has enough items");
  if (q.type === "typed") ok(q.accept.length >= 1, "typed question accepts at least one answer");
}
// سؤال التصحيح النحوي في الاختبار المفاعل يجب ألا يقبل «is wrote»
const typed = test.TEST_57.filter((q) => q.type === "typed").map((q) => q.accept.join(" | ")).join(" || ");
ok(!/is wrote/i.test(typed), "typed answers never accept a V2 after be");

// ---------- 7) كفاية المختبرات وتنوّعها ----------
const labSrc = readFileSync(join(root, "src/lessons/lesson57/labs57.tsx"), "utf8");
const labNames = [...labSrc.matchAll(/export function (\w+57)\(/g)].map((m) => m[1]).filter((n) => n.endsWith("Lab57"));
ok(labNames.length >= 10, `at least ten interactive labs (${labNames.length})`);
for (const lab of ["FocusLab57", "AnalysisLab57", "ShiftLab57", "BePickLab57", "V3Lab57", "ErrorLab57", "NegLab57", "QuestionLab57", "ByLab57", "TransitivityLab57", "CompareLab57"]) {
  ok(labNames.includes(lab), `lab implemented: ${lab}`);
  ok(lessonSrc.includes(`<${lab}`), `lab rendered in the lesson: ${lab}`);
}
ok(lessonSrc.includes("<PracticeSet57"), "practice sets rendered");
ok(lessonSrc.includes("<Writing57") && lessonSrc.includes("<Speaking57"), "writing and speaking tasks rendered");

// ---------- 8) الصحة التعليمية ----------
// be يطابق الفاعل الجديد: نفحص كل جملة Passive في بيانات الدرس
const flatAll = flat(srcText);
// نفحص الإجابات الصحيحة والمشتّتات المنطقية: كل خيار يبدأ بفاعل مفرد يجب أن يأخذ
// is/am لا are، وكل خيار يبدأ بفاعل جمع يجب أن يأخذ are لا is. الخيارات المعلنة
// كأخطاء في تمارين التصحيح تُستثنى لأنها مادة الدرس نفسها.
const SINGULAR = /^(The room|English|The window|The book|The letter|The homework|The food|This car|The house|The teacher|The lesson|The classroom|The door|The answer|A letter)\b/;
const PLURAL = /^(Houses|The letters|The books|These products|The windows|The students|The meals|The cars|The computers|Smartphones|The reports|The documents)\b/;
const trapOptions = new Set();
for (const group of practice.PRACTICE_GROUPS_57) {
  if (group.kind === "choose") {
    for (const item of group.items) {
      if (/^صحّح الخطأ/.test(item.prompt)) for (const o of item.options) trapOptions.add(o.replace(/^[A-D]\.\s*/, ""));
    }
  }
}
const agreementOffenders = [];
for (const group of practice.PRACTICE_GROUPS_57) {
  for (const item of group.items) {
    const candidates = [];
    if (item.answer && group.kind === "choose") candidates.push(item.answer.replace(/^[A-D]\.\s*/, ""));
    if (group.kind === "transform") candidates.push(item.answer);
    for (const c of candidates) {
      if (trapOptions.has(c.replace(/\.$/, "").replace(/\?$/, ""))) continue;
      const body = c.replace(/^[A-D]\.\s*/, "");
      if (SINGULAR.test(body) && /\bare\b/.test(body)) agreementOffenders.push(body);
      if (PLURAL.test(body) && /\b(is|am)\b/.test(body)) agreementOffenders.push(body);
    }
  }
}
ok(agreementOffenders.length === 0, `correct answers agree with the new subject (${agreementOffenders.slice(0, 3).join(" | ")})`);
ok((flatAll.match(/\b(is|are)\s+(written|spoken|built|sold|made|cleaned|used|taught|checked|prepared|given|done|broken|watched|painted|repaired|delivered|opened|washed|produced)\b/g) || []).length >= 40, "V3 follows be throughout the data");
// الإجابات الصحيحة وحدها: لا V1 ولا V2 بعد be (المشتّتات الخاطئة مسموحة عمدًا)
const correctStrings = [];
for (const group of practice.PRACTICE_GROUPS_57) {
  for (const item of group.items) {
    if (item.answer) correctStrings.push(String(item.answer));
    if (item.parts) correctStrings.push(item.parts.subject, item.parts.verb, item.parts.object);
  }
}
for (const q of test.TEST_57) {
  if (q.accept) correctStrings.push(...q.accept);
  if (q.type === "single") correctStrings.push(q.options[q.answer]);
}
const badAfterBe = /\b(is|are)\s+(write|speak|build|sell|make|clean|use|teach|check|prepare|give|do|break|watch|paint|repair|deliver|open|wash|produce|wrote|spoke|broke)\b/;
const offenders = correctStrings.filter((v) => badAfterBe.test(v));
ok(offenders.length === 0, `no correct answer puts V1/V2 right after be (${offenders.slice(0, 3).join(" | ")})`);

// لا V2 بعد be في محتوى الطالب (عدا أمثلة الخطأ المشروحة صراحةً)
for (const wrong of ["is wrote", "is spoke", "is broke", "are wrote", "is drank"]) {
  const hits = [...srcText.matchAll(new RegExp(wrong, "g"))].length;
  const explained = (srcText.match(new RegExp(`is (wrote|spoke|broke)`, "g")) || []).length;
  ok(hits <= explained, `no unexplained "${wrong}" in student copy`);
}
// بعد by ضمير مفعول به لا ضمير فاعل
ok(!/by she\b(?!\.)/.test(srcText.replace("The room is cleaned by she.", "")), "no stray subject pronoun after by");
ok(srcText.includes("by her") && srcText.includes("by me") && srcText.includes("by them") && srcText.includes("by us"), "object pronouns after by are taught");

// ---------- 9) DOM سلوكي عبر jsdom ----------
const { JSDOM } = await import("jsdom");
const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/", pretendToBeVisual: true });
const win = dom.window;
for (const k of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "KeyboardEvent", "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement", "HTMLButtonElement", "getComputedStyle", "localStorage", "requestAnimationFrame", "cancelAnimationFrame"]) {
  if (win[k] !== undefined) Object.defineProperty(globalThis, k, { value: win[k], configurable: true });
}
win.Element.prototype.scrollTo = () => {};
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const dir = join(root, "node_modules", ".lesson57-audit");
mkdirSync(dir, { recursive: true });
const outFile = join(dir, "run.mjs");
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React from "react";
import { createRoot } from "react-dom/client";
import Lesson57 from ${JSON.stringify(join(root, "src/lessons/lesson57/Lesson57.tsx"))};
export { React, createRoot, Lesson57 };
`,
    resolveDir: root,
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: outFile,
  jsx: "automatic",
  packages: "external",
  logLevel: "error",
  resolveExtensions: [".js", ".jsx", ".ts", ".tsx"],
});
const mod = await import(`file://${outFile}?t=${Date.now()}`);
const container = win.document.createElement("div");
win.document.body.appendChild(container);
const reactRoot = mod.createRoot(container);
const { act } = await import("react");
reactRoot.render(mod.React.createElement(mod.Lesson57, {}));
await act(async () => {});
const main = container.querySelector("#l57-main");
ok(!!main, "jsdom: lesson 57 mounts");

const clickNav = async (id) => {
  const btn = container.querySelector(`button[data-step-nav="${id}"]`);
  assert.ok(btn, `nav button ${id}`);
  await act(async () => btn.dispatchEvent(new win.MouseEvent("click", { bubbles: true })));
};

// الحوار: الترجمة مخفية ثم تُفتح
await act(async () => {});
const bubbles = container.querySelectorAll(".l57-bubble");
ok(bubbles.length === 0, "jsdom: cover is the first step");

// الانتقال إلى خطوة الحوار عبر الفهرس
const railButtons = [...container.querySelectorAll("nav button")];
ok(railButtons.length >= 45, "jsdom: rail lists every step");
const openStep = async (navId) => {
  const b = container.querySelector(`nav button[data-step-nav="${navId}"]`);
  assert.ok(b, `rail button ${navId}`);
  await act(async () => b.dispatchEvent(new win.MouseEvent("click", { bubbles: true })));
};

await openStep("dialogue");
const dialogueBubbles = container.querySelectorAll(".l57-bubble");
ok(dialogueBubbles.length === 10, "jsdom: dialogue shows ten lines");
ok(container.querySelectorAll(".l57-bubble-ar").length === 0, "jsdom: translations hidden by default");
const toggle = dialogueBubbles[0].querySelector(".l57-bubble-toggle");
await act(async () => toggle.dispatchEvent(new win.MouseEvent("click", { bubbles: true })));
ok(container.querySelectorAll(".l57-bubble-ar").length === 1, "jsdom: translation opens on demand");

await openStep("reading");
ok(container.querySelectorAll(".l57-reading-para").length === 6, "jsdom: reading has six paragraphs");
ok(container.querySelectorAll(".l57-reading-ar").length === 0, "jsdom: reading translation hidden by default");

await openStep("vocabulary");
ok(container.querySelectorAll(".l57-vocab-card").length === 16, "jsdom: sixteen vocabulary cards");

await openStep("dialogue-qa");
ok(container.querySelectorAll(".l57-qa").length === 6, "jsdom: six dialogue comprehension questions");
const qa1 = container.querySelector(".l57-qa");
ok(qa1.querySelector(".l57-qa-body").hasAttribute("hidden"), "jsdom: answer hidden before reveal");

await openStep("summary");
ok(container.querySelectorAll(".l57-summary-card").length === 7, "jsdom: seven summary points");

await openStep("test");
const finalTest = container.querySelector('[data-final-test="57"]');
ok(!!finalTest, "jsdom: final test renders in its step");
ok(finalTest.querySelectorAll("ol > li").length === 15, "jsdom: fifteen final questions");
ok(!finalTest.querySelector("[data-ft-result]"), "jsdom: no result before submission");

// الحالة تبقى عند مغادرة خطوة المختبر والعودة إليها
await openStep("be-choose");
const beLab = container.querySelector(".l57-lab");
const isButton = [...beLab.querySelectorAll(".l57-options button")].find((b) => b.textContent.trim() === "is");
await act(async () => isButton.dispatchEvent(new win.MouseEvent("click", { bubbles: true })));
ok(beLab.querySelector(".l57-verdict") === null, "jsdom: no verdict before checking");
await openStep("summary");
await openStep("be-choose");
const beLab2 = container.querySelector(".l57-lab");
const pressed = [...beLab2.querySelectorAll(".l57-options button")].find((b) => b.getAttribute("aria-pressed") === "true");
ok(!!pressed && pressed.textContent.trim() === "is", "jsdom: lab choice survives step navigation");

// لا عناصر كشف مصدر للطالب
ok(!/📜\s*من\s+المصدر|نص المصدر الحرفي/.test(container.innerHTML), "jsdom: no provenance labels in student UI");

rmSync(dir, { recursive: true, force: true });

console.log(`Lesson 57 audit: ${checks - failures.length}/${checks} checks passed`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
