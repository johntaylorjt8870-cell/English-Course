/**
 * اختبار تفاعلي (jsdom) لسلوك STEP 3 + STEP 4 على الاختبارات النهائية:
 *   1) الاختيار ≠ التصحيح: لا يظهر أي كشف (صحيح/خطأ، شرح، نسبة) قبل «تحقق من الإجابات».
 *   2) بعد التحقق: تغذية راجعة كاملة، والقفل يمنع تغيير الإجابة.
 *   3) إعادة الاختبار تعيد الحالة المحايدة.
 *   4) فضاء المعلم مقفلة أولًا، كلمة مرور خاطئة لا تسرّب المفتاح،
 *      وكلمة المرور 63971 تفتح المفتاح نفسه (نفس أسئلة الاختبار).
 *
 * الدروس: 1، 10، 13، 17، 19، 20، 21
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
export function mount(lesson) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(React.createElement(FinalQuiz, { lesson, accent: "bg-cyan-700" }));
  return el;
}
export function unmount(el) { el.remove(); }
export { QUIZZES };
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
const { mount, unmount, QUIZZES } = await import(pathToFileURL(outFile).href);

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

const LESSONS = [1, 10, 13, 17, 19, 20, 21];

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

rmSync(outFile, { force: true });
console.log(`\nInteraction test: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
