/**
 * اختبار تفاعلي (jsdom) لسلوك STEP 3 + STEP 4 على الاختبارات النهائية:
 *   1) الاختيار ≠ التصحيح: لا يظهر أي كشف (صحيح/خطأ، شرح، نسبة) قبل «تحقق من الإجابات».
 *   2) بعد التحقق: تغذية راجعة كاملة، والقفل يمنع تغيير الإجابة.
 *   3) إعادة الاختبار تعيد الحالة المحايدة.
 *   4) فضاء المعلم مقفلة أولًا، كلمة مرور خاطئة لا تسرّب المفتاح،
 *      وكلمة المرور 63971 تفتح المفتاح نفسه (نفس أسئلة الاختبار).
 *
 * الدروس: 1، 10، 13، 17، 19، 20، 21، 22، 23
 * تشغيل: node scripts/interaction-test.mjs
 */
import { createRequire } from "node:module";
import { readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = dirname(fileURLToPath(import.meta.url));

// ---------------- إعداد بيئة jsdom قبل استيراد أي شيء يلمس DOM ----------------
const { JSDOM } = await import("jsdom");
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
const win = dom.window;
Object.defineProperty(globalThis, "window", { value: win, configurable: true });
Object.defineProperty(globalThis, "document", { value: win.document, configurable: true });
Object.defineProperty(globalThis, "navigator", { value: win.navigator, configurable: true });
for (const key of ["Element", "HTMLElement", "HTMLInputElement", "HTMLButtonElement", "Event", "MouseEvent", "KeyboardEvent", "Node", "getComputedStyle", "CSS"]) {
  if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
}
if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};
if (!win.scrollTo) win.scrollTo = () => {};

// ---------------- حزمة الاختبار ----------------
const outFile = join(root, ".interaction-bundle.mjs");
await esbuild.build({
  absWorkingDir: dirname(root),
  stdin: {
    contents: `
import React from "react";
import { createRoot } from "react-dom/client";
import FinalQuiz from ${JSON.stringify(join(dirname(root), "src/shared/FinalQuiz.tsx"))};
import { QUIZZES } from ${JSON.stringify(join(dirname(root), "src/shared/quizBank.ts"))};
import { SlideView23 } from ${JSON.stringify(join(dirname(root), "src/lessons/lesson23/Lesson23.tsx"))};
import { SLIDES as L23_SLIDES } from ${JSON.stringify(join(dirname(root), "src/lessons/lesson23/data.ts"))};
export function mount(lesson) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(React.createElement(FinalQuiz, { lesson, accent: "bg-cyan-700" }));
  return el;
}
export function mountSlide23(slide) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(React.createElement(SlideView23, { s: slide, onExit: () => {} }));
  return el;
}
export function unmount(el) { el.remove(); }
export { QUIZZES, L23_SLIDES };
`,
    resolveDir: dirname(root),
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: outFile,
  jsx: "automatic",
  packages: "external",
  logLevel: "silent",
});
const { mount, mountSlide23, unmount, QUIZZES, L23_SLIDES } = await import(pathToFileURL(outFile).href);

let pass = 0;
let fail = 0;
const ok = (cond, msg) => {
  if (cond) {
    pass++;
    console.log(`✓ ${msg}`);
  } else {
    fail++;
    console.log(`✕ ${msg}`);
  }
};
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
const setNativeValue = (el, value) => {
  const proto = el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event("input", { bubbles: true }));
};
const byText = (scope, text) => [...scope.querySelectorAll("button")].find((b) => b.textContent.includes(text));

const LESSONS = [1, 10, 13, 17, 19, 20, 21, 22, 23];

for (const lesson of LESSONS) {
  const questions = QUIZZES[lesson];
  ok(Array.isArray(questions) && questions.length > 0, `Lesson ${lesson} quiz exists in quizBank (${questions?.length} Q)`);

  const el = mount(lesson);
  await tick(60);

  // --- الحالة الابتدائية: محايدة ومقفلة ---
  const optButtons = () => [...el.querySelectorAll("button[aria-pressed]")];
  const totalOpts = questions.reduce((n, q) => n + q.opts.length, 0);
  ok(optButtons().length === totalOpts, `L${lesson} renders all ${totalOpts} neutral options`);
  const txt = () => el.textContent;
  ok(!txt().includes("✓ صحيح"), `L${lesson} no correct-mark before check`);
  ok(!txt().includes("💡"), `L${lesson} no explanation before check`);
  ok(!txt().includes("الإجابة الصحيحة"), `L${lesson} no answer key before check`);
  ok(txt().includes("🔒 مقفلة"), `L${lesson} Teacher's Space locked initially`);

  // --- الإجابة على كل الأسئلة: محايد تمامًا قبل التحقق ---
  let idx = 0;
  for (let q = 0; q < questions.length; q++) {
    optButtons()[idx].click();
    idx += questions[q].opts.length;
  }
  await tick();
  ok(!txt().includes("✓ صحيح"), `L${lesson} no correct-mark after answering (before check)`);
  ok(!txt().includes("💡"), `L${lesson} no explanation after answering (before check)`);
  ok(txt().includes(`أجبت عن ${questions.length} / ${questions.length}`), `L${lesson} answered counter shows ${questions.length}/${questions.length}`);

  // --- التحقق: كشف كامل + قفل ---
  const checkBtn = byText(el, "تحقق من الإجابات");
  ok(!!checkBtn && !checkBtn.disabled, `L${lesson} check button enabled when all answered`);
  checkBtn.click();
  await tick();
  ok(txt().includes("✓ صحيح"), `L${lesson} correct marks appear after check`);
  ok(txt().includes("💡"), `L${lesson} explanations appear after check`);
  ok(txt().includes("نتيجتك:"), `L${lesson} score line appears after check`);
  const locked = optButtons().every((b) => b.disabled);
  ok(locked, `L${lesson} all options locked after check`);
  const anyEmerald = el.innerHTML.includes("border-emerald-300");
  ok(anyEmerald, `L${lesson} correct option highlighted after check`);

  // --- إعادة الاختبار: عودة للحالة المحايدة ---
  const resetBtn = byText(el, "أعد الاختبار");
  ok(!!resetBtn, `L${lesson} reset button appears after check`);
  resetBtn.click();
  await tick();
  ok(!txt().includes("✓ صحيح"), `L${lesson} reset clears marks`);
  ok(!txt().includes("💡"), `L${lesson} reset clears explanations`);
  ok(!txt().includes("الإجابة الصحيحة"), `L${lesson} reset does not leak answer key`);
  ok(optButtons().every((b) => !b.disabled), `L${lesson} reset re-enables options`);

  // --- فضاء المعلم: كلمة مرور خاطئة ثم الصحيحة ---
  const pw = el.querySelector('input[type="password"]');
  ok(!!pw, `L${lesson} password input exists (locked)`);
  setNativeValue(pw, "99999");
  await tick();
  byText(el, "فتح المساحة").click();
  await tick();
  ok(txt().includes("كلمة المرور غير صحيحة"), `L${lesson} wrong password rejected`);
  ok(!txt().includes("الإجابة الصحيحة"), `L${lesson} wrong password leaks nothing`);
  ok(txt().includes("🔒 مقفلة"), `L${lesson} still locked after wrong password`);

  setNativeValue(pw, "63971");
  await tick();
  byText(el, "فتح المساحة").click();
  await tick();
  ok(txt().includes("Unlocked"), `L${lesson} 63971 unlocks Teacher's Space`);
  ok(txt().includes("الإجابة الصحيحة"), `L${lesson} answer key visible after unlock`);
  ok(!txt().includes("🔒 مقفلة"), `L${lesson} lock badge gone after unlock`);

  unmount(el);
}

// ---------------- الدرس 23: تدريبات المصدر داخل الدرس ----------------
// نفس القاعدة: الاختيار محايد، ولا تظهر أي تغذية راجعة قبل «تحقق من الإجابات».
{
  const exerciseSlides = L23_SLIDES.filter((s) => s.kind === "ex");
  ok(exerciseSlides.length === 8, `Lesson 23 exposes 8 source exercises in-lesson (got ${exerciseSlides.length})`);

  for (const slide of exerciseSlides) {
    const el = mountSlide23(slide);
    await tick(60);
    const optButtons = () => [...el.querySelectorAll("button[aria-pressed]")];
    // كل فقرة تحتفظ بخياراتها داخل صف واحد — التجميع بالصف الأب لا بنوع البطاقة
    const cards = () => [...new Set(optButtons().map((b) => b.parentElement))];
    const optionClasses = () => optButtons().map((b) => b.className).join(" ");
    const checkBtn = () => byText(el, "تحقق من الإجابات");
    // التدريب النهائي يكشف الجمل النموذجية بدل علامات ✓/✕
    const marker = slide.ex.type === "finalBoss" ? "There are two computers in the room." : null;
    const hasFeedback = () => (marker ? el.textContent.includes(marker) : /✓ صحيح!|✕/.test(el.textContent));

    ok(optButtons().length > 0, `L23 ${slide.title}: renders selectable options`);
    ok(!hasFeedback(), `L23 ${slide.title}: no right/wrong feedback before check`);
    ok(!!checkBtn() && checkBtn().disabled, `L23 ${slide.title}: check button locked until everything is answered`);

    // أجب عن كل فقرة بالخيار الأول — يجب أن يبقى المظهر محايدًا
    const perCard = Math.round(optButtons().length / cards().length);
    for (let i = 0; i < cards().length; i++) {
      optButtons()[i * perCard].click();
      await tick(5);
    }
    ok(!hasFeedback(), `L23 ${slide.title}: still neutral after answering (before check)`);
    ok(!optionClasses().includes("bg-emerald-600"), `L23 ${slide.title}: no green reveal before check`);
    ok(!optionClasses().includes("bg-rose-600"), `L23 ${slide.title}: no red reveal before check`);
    ok(!el.innerHTML.includes("border-emerald-300") && !el.innerHTML.includes("border-rose-300"), `L23 ${slide.title}: no verdict card colour before check`);
    ok(checkBtn() && !checkBtn().disabled, `L23 ${slide.title}: check button enabled once all answered`);

    // تغيير الإجابة مسموح قبل التحقق
    const firstCard = cards()[0];
    const firstOptions = [...firstCard.querySelectorAll("button[aria-pressed]")];
    if (firstOptions.length > 1) {
      firstOptions[1].click();
      await tick(10);
      ok(firstOptions[1].getAttribute("aria-pressed") === "true" || [...cards()[0].querySelectorAll("button[aria-pressed]")][1].getAttribute("aria-pressed") === "true", `L23 ${slide.title}: answer can be changed before check`);
      ok(!hasFeedback(), `L23 ${slide.title}: changing an answer reveals nothing`);
    }

    checkBtn().click();
    await tick(20);
    ok(hasFeedback(), `L23 ${slide.title}: feedback appears only after check`);
    ok(optionClasses().includes("bg-emerald-600") || optionClasses().includes("bg-rose-600"), `L23 ${slide.title}: correct/incorrect colours appear after check`);
    ok(optButtons().every((b) => b.disabled), `L23 ${slide.title}: options lock after check`);

    const resetBtn = byText(el, "أعد") || byText(el, "↺ إعادة");
    ok(!!resetBtn, `L23 ${slide.title}: reset control exists after check`);
    resetBtn.click();
    await tick(20);
    ok(!hasFeedback(), `L23 ${slide.title}: reset clears all feedback`);
    ok(optButtons().every((b) => !b.disabled), `L23 ${slide.title}: reset re-enables options`);

    unmount(el);
  }
}

rmSync(outFile, { force: true });
console.log(`\nInteraction test: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
