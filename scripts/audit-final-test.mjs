// ============================================================
// Final Test audit — تدقيق الاختبار النهائي لكل درس (طبقة نهاية الدرس)
//
// يتحقق من:
//   1) نموذج البيانات: كل درس له اختبار من 12–15 سؤالًا، وكل سؤال مكتمل
//      (نص · إجابة صحيحة · سبب · مفهوم · فخ) وصالح لكل نوع.
//   2) البنية القابلة لإعادة الاستخدام: محرّك واحد مشترك + بنك مركزي،
//      وكل درس 1–32 له اختبار نهائي (قديم للدروس 1–26، جديد لـ 27–32).
//   3) السلوك المرندر في jsdom: لا كشف قبل «تصحيح الاختبار»، التصحيح
//      يكشف النتيجة والصواب والشرح، وإعادة الاختبار تمسح كل شيء.
//   4) انتقالات الحالة على درس ممثل (27): فريش → جزئي → مكتمل غير مصحّح
//      → مصحّح → إعادة — بكل أنواع الأسئلة السبعة.
//   5) مفتاح الإجابات داخل «منطقة المعلم» بكلمة المرور somer173 وحدها،
//      بصيغة تدريسية، ولا يُسرَّب قبل الفتح.
//
//   node scripts/audit-final-test.mjs
// ============================================================
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
};

// ---------------- jsdom globals ----------------
const { JSDOM } = await import("jsdom");
const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/", pretendToBeVisual: true });
const win = dom.window;
Object.defineProperty(globalThis, "window", { value: win, configurable: true });
Object.defineProperty(globalThis, "document", { value: win.document, configurable: true });
Object.defineProperty(globalThis, "navigator", { value: win.navigator, configurable: true });
for (const key of ["Element", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLButtonElement", "HTMLSelectElement", "Event", "MouseEvent", "KeyboardEvent", "Node", "getComputedStyle", "CSS"]) {
  if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
}
if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};

// ---------------- bundle ----------------
const dir = join(root, "node_modules", ".final-test-audit");
mkdirSync(dir, { recursive: true });
const outFile = join(dir, `run-${process.pid}.mjs`);
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React from "react";
import { createRoot } from "react-dom/client";
import Lesson27 from ${JSON.stringify(join(root, "src/lessons/lesson27/Lesson27.tsx"))};
import Lesson28 from ${JSON.stringify(join(root, "src/lessons/lesson28/Lesson28.tsx"))};
import Lesson29 from ${JSON.stringify(join(root, "src/lessons/lesson29/Lesson29.tsx"))};
import Lesson30 from ${JSON.stringify(join(root, "src/lessons/lesson30/Lesson30.tsx"))};
import Lesson31 from ${JSON.stringify(join(root, "src/lessons/lesson31/Lesson31.tsx"))};
import Lesson32 from ${JSON.stringify(join(root, "src/lessons/lesson32/Lesson32.tsx"))};
import Lesson33 from ${JSON.stringify(join(root, "src/lessons/lesson33/Lesson33.tsx"))};
import * as FINAL from ${JSON.stringify(join(root, "src/shared/finalTest.tsx"))};
import { FINAL_TESTS, FINAL_TEST_MIN, FINAL_TEST_MAX, finalTestFor, finalTestLessons } from ${JSON.stringify(join(root, "src/shared/finalTestBank.ts"))};
import { QUIZZES } from ${JSON.stringify(join(root, "src/shared/quizBank.ts"))};
export { React, createRoot, Lesson27, Lesson28, Lesson29, Lesson30, Lesson31, Lesson32, Lesson33, FINAL, FINAL_TESTS, FINAL_TEST_MIN, FINAL_TEST_MAX, finalTestFor, finalTestLessons, QUIZZES };
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
  logLevel: "silent",
});
const m = await import(pathToFileURL(outFile).href);
rmSync(outFile, { force: true });

const tick = (ms = 12) => new Promise((r) => setTimeout(r, ms));
const plain = (html) => String(html).replace(/<[^>]+>/g, " ");
const byText = (scope, text) => [...scope.querySelectorAll("button")].find((b) => (b.textContent || "").includes(text));
const exactText = (scope, text) => [...scope.querySelectorAll("button")].filter((b) => (b.textContent || "").trim() === text);
const click = (el) => el.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
const setNativeValue = (el, value) => {
  const proto = el.tagName === "SELECT" ? win.HTMLSelectElement.prototype : el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event(el.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
};

// ---------------- 1) نموذج البيانات ----------------
const LESSON_IDS = [27, 28, 29, 30, 31, 32, 33];
ok(m.FINAL_TEST_MIN === 12 && m.FINAL_TEST_MAX === 15, `حدود عدد الأسئلة 12–15 (got ${m.FINAL_TEST_MIN}..${m.FINAL_TEST_MAX})`);
ok(m.finalTestLessons().join(",") === LESSON_IDS.join(","), `بنك الاختبارات يغطي الدروس 27–33 (got ${m.finalTestLessons().join(",")})`);

for (const n of LESSON_IDS) {
  const qs = m.finalTestFor(n);
  ok(Array.isArray(qs), `L${n}: الاختبار النهائي مسجّل في البنك`);
  ok(qs.length >= m.FINAL_TEST_MIN && qs.length <= m.FINAL_TEST_MAX, `L${n}: عدد الأسئلة ${qs.length} داخل 12–15`);
  const types = new Set();
  const seenPrompts = new Set();
  qs.forEach((q, i) => {
    const tag = `L${n} q${i + 1}`;
    types.add(q.type);
    ok(typeof q.ar === "string" && q.ar.trim().length > 4, `${tag}: نص السؤال موجود`);
    ok(typeof q.why === "string" && q.why.trim().length > 8, `${tag}: السبب موجود`);
    ok(typeof q.concept === "string" && q.concept.trim().length > 2, `${tag}: المفهوم موجود`);
    const key = `${q.type}|${q.ar}|${q.en ?? ""}|${q.before ?? ""}|${q.after ?? ""}|${(q.items ?? q.segments ?? q.options ?? []).join("|")}|${(q.pairs ?? []).map((x) => x.left + "=" + x.right).join("|")}`;
    ok(!seenPrompts.has(key), `${tag}: لا تكرار للسؤال داخل الدرس`);
    seenPrompts.add(key);
    if (q.type === "single" || q.type === "error") {
      const opts = q.type === "single" ? q.options : q.segments;
      ok(Array.isArray(opts) && opts.length >= 2, `${tag}: خيارات كافية`);
      ok(new Set(opts).size === opts.length, `${tag}: الخيارات بلا تكرار`);
      ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < opts.length, `${tag}: مؤشر الإجابة في المدى`);
    } else if (q.type === "tf") {
      ok(typeof q.answer === "boolean", `${tag}: قيمة صح/خطأ منطقية`);
    } else if (q.type === "multi") {
      ok(Array.isArray(q.options) && q.options.length >= 2, `${tag}: خيارات كافية`);
      ok(Array.isArray(q.answers) && q.answers.length >= 1, `${tag}: إجابة صحيحة واحدة على الأقل`);
      ok(q.answers.every((a) => Number.isInteger(a) && a >= 0 && a < q.options.length), `${tag}: مؤشرات الإجابات في المدى`);
      ok(new Set(q.answers).size === q.answers.length, `${tag}: لا تكرار في الإجابات`);
      ok(q.answers.length < q.options.length, `${tag}: ليست كل الخيارات صحيحة`);
    } else if (q.type === "order") {
      ok(Array.isArray(q.items) && q.items.length >= 2, `${tag}: عناصر الترتيب كافية`);
      ok(new Set(q.items).size === q.items.length, `${tag}: عناصر الترتيب بلا تكرار`);
    } else if (q.type === "match") {
      ok(Array.isArray(q.pairs) && q.pairs.length >= 2, `${tag}: أزواج التوصيل كافية`);
      ok(q.pairs.every((p) => p.left.trim() && p.right.trim()), `${tag}: كل زوج مكتمل`);
      ok(new Set(q.pairs.map((p) => p.right)).size === q.pairs.length, `${tag}: العمود الثاني بلا تكرار`);
    } else if (q.type === "typed") {
      ok(Array.isArray(q.accept) && q.accept.length >= 1 && q.accept.every((a) => a.trim().length > 0), `${tag}: إجابات مقبولة موجودة`);
      ok(typeof q.before === "string" && typeof q.after === "string" && (q.before.trim() || q.after.trim()), `${tag}: سياق الإجابة المكتوبة موجود`);
      // قاعدة دائمة: الفراغ المكتوب يجب أن يسمّي الفعل/الصيغة المطلوبة بين قوسين،
      // وإلا صار السؤال تخمينًا للمفردة لا قياسًا للصيغة (عيب تحقّق في بنك 27–33).
      ok(/\([^)]{2,}\)/.test(q.ar), `${tag}: سؤال الإجابة المكتوبة يسمّي الفعل المطلوب بين قوسين`);
    } else {
      ok(false, `${tag}: نوع سؤال غير معروف (${q.type})`);
    }
  });
  ok(types.size === 7, `L${n}: الأنواع السبعة ممثلة (got ${[...types].join(",")})`);
}

// تطبيع التقييم الكتابي
ok(m.FINAL.normalizeTyped("  Had   Started. ") === "had started", "تطبيع الإجابة المكتوبة يتجاهل المسافات وعلامات الترقيم");
// دالة النتيجة لا تُستدعى في الواجهة قبل التصحيح — نتحقق من الحساب نفسه
ok(m.FINAL.gradeFinalTest(m.finalTestFor(27), {}).score === 0, "gradeFinalTest: صفر عند عدم وجود إجابات");

// ---------------- 2) البنية القابلة لإعادة الاستخدام ----------------
const finalTestSrc = readFileSync(join(root, "src/shared/finalTest.tsx"), "utf8");
ok(/useState<Record<number, FinalTestAnswer>>\(\{\}\)/.test(finalTestSrc), "محرّك الاختبار النهائي: حالة الإجابات في المكوّن الأب");
ok(/const \[corrected, setCorrected\] = useState\(false\)/.test(finalTestSrc), "محرّك الاختبار النهائي: حالة التصحيح منفصلة عن الإجابات");
ok(/setAnswers\(\{\}\);\s*\n\s*setCorrected\(false\)/.test(finalTestSrc), "إعادة الاختبار تمسح الإجابات والتصحيح معًا");
ok(/corrected &&\s*\n\s*\(/.test(finalTestSrc) || finalTestSrc.includes("{corrected && ("), "كل التغذية الراجعة مربوطة بحالة التصحيح");
ok(!/Unicode bidi control|\\u2066|\\u202A/.test(finalTestSrc), "لا أحرف تحكّم اتجاهية خام في محرّك الاختبار");
ok(!/localStorage|sessionStorage/.test(finalTestSrc), "لا حالة خارجية مخبأة (كل الحالة في React)");

const appSrc = readFileSync(join(root, "src/App.tsx"), "utf8");
const appLessons = [...new Set([...appSrc.matchAll(/route === (\d+)/g)].map((x) => Number(x[1])))].sort((a, b) => a - b);
ok(appLessons.length >= 33, `كل دروس التطبيق مسجلة (${appLessons.length})`);
for (const n of appLessons) {
  const legacy = (m.QUIZZES[n] || []).length >= 12;
  const modern = m.finalTestLessons().includes(n);
  ok(legacy || modern, `الدرس ${n}: له اختبار نهائي (قديم أو جديد)`);
}

const lessonSources = Object.fromEntries(
  LESSON_IDS.map((n) => [n, readFileSync(join(root, `src/lessons/lesson${n}/Lesson${n}.tsx`), "utf8")])
);
for (const n of LESSON_IDS) {
  const src = lessonSources[n];
  ok(src.includes("<FinalTest"), `L${n}: الاختبار النهائي مرندر في الدرس`);
  ok(src.includes("FINAL_TESTS[" + n + "]") || src.includes(`FINAL_TESTS[${n}]`), `L${n}: يستخدم بيانات البنك المركزي`);
  ok(!src.includes("FinalQuiz"), `L${n}: لا نسخة ثانية من الاختبار القديم`);
  ok(/index === (total|SLIDE_COUNT|SLIDE_COUNT_32|SLIDE_COUNT_33) - 1|slideIdx === total - 1/.test(src), `L${n}: الاختبار النهائي مربوط بآخر خطوة`);
  const keySrc = n >= 32 ? readFileSync(join(root, `src/lessons/lesson${n}/TeacherArea${n}.tsx`), "utf8") : src;
  ok(keySrc.includes("FinalTestAnswerKey"), `L${n}: مفتاح الإجابات داخل منطقة المعلم`);
}
ok(readFileSync(join(root, "src/shared/finalTestBank.ts"), "utf8").includes("FINAL_TESTS"), "بنك مركزي واحد لكل الدروس");

// ---------------- 3) السلوك المرندر + انتقالات الحالة ----------------
async function mountLesson(n, Comp) {
  const host = win.document.createElement("div");
  win.document.body.appendChild(host);
  const r = m.createRoot(host);
  r.render(m.React.createElement(Comp, { onExit: () => {} }));
  await tick(30);
  return {
    host,
    r,
    unmount: () => {
      try { r.unmount(); } catch { /* ignore */ }
      host.remove();
    },
  };
}
async function goToLastStep(host, n) {
  let steps = 0;
  while (!host.querySelector(`[data-final-test="${n}"]`) && steps < 90) {
    const btns = exactText(host, "التالي ←");
    const b = btns[btns.length - 1];
    if (!b || b.disabled) break;
    click(b);
    await tick(5);
    steps++;
  }
  return steps;
}

/** يجيب عن السؤال بالإجابة المرجعية أو بإجابة خاطئة مقصودة */
async function answerQuestion(card, q, mode) {
  if (q.type === "single" || q.type === "error" || q.type === "tf") {
    const radios = [...card.querySelectorAll("input[type=radio]")];
    let idx;
    if (q.type === "tf") idx = mode === "right" ? (q.answer ? 0 : 1) : q.answer ? 1 : 0;
    else idx = mode === "right" ? q.answer : (q.answer + 1) % radios.length;
    click(radios[idx]);
    return;
  }
  if (q.type === "multi") {
    const boxes = [...card.querySelectorAll("input[type=checkbox]")];
    if (mode === "right") q.answers.forEach((a) => click(boxes[a]));
    else click(boxes.find((_, i) => !q.answers.includes(i)));
    return;
  }
  if (q.type === "order") {
    const order = mode === "right" ? q.items.map((_, i) => i) : [...q.items.keys()].reverse();
    for (const i of order) {
      const chip = [...card.querySelectorAll("button")].find((b) => (b.textContent || "").trim() === q.items[i]);
      if (chip) click(chip);
      await tick(2);
    }
    return;
  }
  if (q.type === "match") {
    const selects = [...card.querySelectorAll("select")];
    selects.forEach((sel, pi) => {
      const wantText = mode === "right" ? q.pairs[pi].right : q.pairs[(pi + 1) % q.pairs.length].right;
      const opt = [...sel.options].find((o) => (o.textContent || "").trim() === wantText);
      setNativeValue(sel, opt.value);
    });
    return;
  }
  if (q.type === "typed") {
    const input = card.querySelector("input[type=text]");
    setNativeValue(input, mode === "right" ? q.accept[0] : "WRONG ANSWER");
    return;
  }
}

async function answerAll(host, n, mode) {
  const qs = m.finalTestFor(n);
  for (let i = 0; i < qs.length; i++) {
    const card = host.querySelector(`[data-final-test="${n}"] [data-ft-q="${i + 1}"]`);
    await answerQuestion(card, qs[i], mode);
    await tick(2);
  }
}

for (const n of LESSON_IDS) {
  const Comp = { 27: m.Lesson27, 28: m.Lesson28, 29: m.Lesson29, 30: m.Lesson30, 31: m.Lesson31, 32: m.Lesson32, 33: m.Lesson33 }[n];
  const { host, unmount } = await mountLesson(n, Comp);
  const qs = m.finalTestFor(n);
  ok(!host.querySelector(`[data-final-test="${n}"]`), `L${n}: لا اختبار نهائي في أول خطوة (نهاية الدرس فقط)`);
  const steps = await goToLastStep(host, n);
  const shell = host.querySelector(`[data-final-test="${n}"]`);
  ok(!!shell, `L${n}: الاختبار النهائي يظهر في الخطوة الأخيرة (بعد ${steps} نقلة)`);
  ok(host.querySelectorAll("[data-final-test]").length === 1, `L${n}: نسخة واحدة فقط من الاختبار النهائي`);
  if (!shell) { unmount(); continue; }
  ok(shell.querySelectorAll("[data-ft-q]").length === qs.length, `L${n}: كل أسئلة البنك ترندرت (${qs.length})`);
  ok(shell.querySelectorAll("[data-ft-verdict]").length === 0, `L${n}: لا حكم على أي سؤال قبل التصحيح`);
  ok(shell.querySelectorAll("[data-ft-result]").length === 0, `L${n}: لا نتيجة قبل التصحيح`);
  ok(shell.querySelectorAll("[data-ft-key-item]").length === 0, `L${n}: لا مفتاح إجابات في واجهة الطالب`);
  const submit = shell.querySelector("[data-ft-submit]");
  ok(!!submit && submit.disabled, `L${n}: زر التصحيح مقفل قبل الإجابة عن كل الأسئلة`);
  // تسريب الشرح: نص شرح مميز لا يجب أن يظهر قبل التصحيح
  const distinctive = qs[0].why.slice(0, 24);
  ok(!shell.innerHTML.includes(distinctive), `L${n}: شرح السؤال الأول غير مكشوف قبل التصحيح`);
  if (n === 32) {
    // الدرس 32 كان فيه واجهة كشف المصدر — يجب ألا تعود من أي باب
    ok(!plain(host.innerHTML).includes("اضغط للعرض"), "L32: لا وجود لواجهة «اضغط للعرض» لكشف المصدر");
  }
  unmount();
}

// ---- انتقالات الحالة الكاملة على الدرس 27 (كل الأنواع السبعة) ----
{
  const n = 27;
  const qs = m.finalTestFor(n);
  const { host, unmount } = await mountLesson(n, m.Lesson27);
  await goToLastStep(host, n);
  const shell = () => host.querySelector(`[data-final-test="${n}"]`);
  const submit = () => shell().querySelector("[data-ft-submit]");

  // (أ) فريش
  ok(shell().querySelectorAll("[data-ft-verdict]").length === 0 && shell().querySelectorAll("[data-ft-result]").length === 0, "L27 فريش: لا كشف");
  ok(submit().disabled, "L27 فريش: التصحيح مقفل");
  ok(submit().textContent.includes("0/15"), "L27 فريش: العدّاد يبدأ من صفر");

  // (ب) جزئي: إجابة أول سؤالين + سؤال ترتيب جزئي
  await answerQuestion(host.querySelector(`[data-ft-q="1"]`), qs[0], "right");
  await tick(2);
  await answerQuestion(host.querySelector(`[data-ft-q="2"]`), qs[1], "right");
  await tick(2);
  ok(submit().disabled, "L27 جزئي: التصحيح يبقى مقفلًا");
  ok(shell().querySelectorAll("[data-ft-verdict]").length === 0, "L27 جزئي: لا كشف");
  click(submit()); // محاولة تصحيح قبل الإجابة عن الكل — لا أثر
  await tick(5);
  ok(shell().querySelectorAll("[data-ft-verdict]").length === 0 && shell().querySelectorAll("[data-ft-result]").length === 0, "L27 جزئي: النقر على التصحيح المقفل لا يكشف شيئًا");

  // (ج) مكتمل غير مصحح
  await answerAll(host, n, "right");
  ok(!submit().disabled, "L27 مكتمل: التصحيح مفتوح بعد الإجابة عن الكل");
  ok(shell().querySelectorAll("[data-ft-verdict]").length === 0, "L27 مكتمل قبل التصحيح: لا حكم على أي سؤال");
  ok(shell().querySelectorAll("[data-ft-result]").length === 0, "L27 مكتمل قبل التصحيح: لا نتيجة");
  ok(submit().textContent.includes("15/15"), "L27 مكتمل: العدّاد 15/15");

  // (د) مصحّح — إجابات صحيحة
  click(submit());
  await tick(10);
  const verdicts = [...shell().querySelectorAll("[data-ft-verdict]")];
  ok(verdicts.length === qs.length, `L27 مصحّح: حكم لكل سؤال (${verdicts.length})`);
  ok(verdicts.every((v) => v.getAttribute("data-ft-verdict") === "correct"), "L27 مصحّح: كل الأحكام صحيحة عند الإجابة الصحيحة");
  const result = shell().querySelector("[data-ft-result]");
  ok(!!result && result.getAttribute("data-ft-result") === "100", `L27 مصحّح: النتيجة 100% (${result && result.getAttribute("data-ft-result")})`);
  ok(plain(shell().innerHTML).includes("النتيجة:"), "L27 مصحّح: نص النتيجة ظاهر");
  // مقفل بعد التصحيح: لا تغيير إجابة بعده
  const firstRadio = host.querySelector(`[data-ft-q="1"] input[type=radio]`);
  ok(!!firstRadio.closest("fieldset")?.disabled, "L27 مصحّح: الأسئلة مقفلة بعد التصحيح");
  // سلوكيًا: بعد التصحيح، النقر على اختيار آخر لا يغيّر الحكم ولا النتيجة
  const other = [...host.querySelectorAll(`[data-ft-q="1"] input[type=radio]`)].find((r) => !r.checked);
  if (other) click(other);
  await tick(6);
  ok(shell().querySelector(`[data-ft-q="1"] [data-ft-verdict]`).getAttribute("data-ft-verdict") === "correct", "L27 مصحّح: لا يمكن تغيير الإجابة بعد التصحيح");
  ok(shell().querySelector("[data-ft-result]").getAttribute("data-ft-result") === "100", "L27 مصحّح: النتيجة لا تتأثر بعد التصحيح");

  // (هـ) إعادة الاختبار
  click(shell().querySelector("[data-ft-reset]"));
  await tick(10);
  ok(shell().querySelectorAll("[data-ft-verdict]").length === 0, "L27 إعادة: الأحكام مُسحت");
  ok(shell().querySelectorAll("[data-ft-result]").length === 0, "L27 إعادة: النتيجة مُسحت");
  ok(submit().disabled, "L27 إعادة: زر التصحيح عاد مقفلًا");
  ok(submit().textContent.includes("0/15"), "L27 إعادة: العدّاد عاد صفرًا");
  ok(plain(host.querySelector(`[data-ft-q="5"]`).innerHTML).includes("اختر الترتيب الصحيح"), "L27 إعادة: سؤال الترتيب عاد فارغًا");
  ok(host.querySelector(`[data-ft-q="1"] input[type=radio]:checked`) === null, "L27 إعادة: الاختيارات مُسحت");

  // (و) مسار الإجابة الخاطئة: إظهار إجابتك + الإجابة الصحيحة + السبب
  await answerAll(host, n, "wrong");
  await tick(5);
  click(submit());
  await tick(10);
  const wrongVerdicts = [...shell().querySelectorAll("[data-ft-verdict]")];
  ok(wrongVerdicts.length === qs.length && wrongVerdicts.every((v) => v.getAttribute("data-ft-verdict") === "wrong"), "L27 خاطئ: كل الأحكام خاطئة");
  ok(shell().querySelector("[data-ft-result]").getAttribute("data-ft-result") === "0", "L27 خاطئ: النتيجة صفر");
  ok(plain(shell().innerHTML).includes("الإجابة الصحيحة"), "L27 خاطئ: الإجابة الصحيحة معروضة بعد التصحيح");
  ok(plain(shell().innerHTML).includes("إجابتك"), "L27 خاطئ: إجابة الطالب معروضة للمقارنة");
  ok(plain(shell().innerHTML).includes("المفهوم"), "L27 خاطئ: المفهوم من الدرس معروض");

  // (ز) زر مفتاح الإجابات ينقل إلى منطقة المعلم داخل الدرس
  const teacherLink = shell().querySelector("[data-ft-teacher-link]");
  ok(!!teacherLink, "L27: زر مفتاح الإجابات موجود");
  click(teacherLink);
  await tick(10);
  ok(plain(host.innerHTML).includes("منطقة المعلم"), "L27: الزر ينقل إلى منطقة المعلم داخل الدرس");
  unmount();
}

// ---------------- 4) منطقة المعلم: المفتاح بكلمة المرور ----------------
async function unlockTeacher(host) {
  const t = byText(host, "المعلم") || byText(host, "🧑‍🏫") || byText(host, "المعلّم");
  if (t) { click(t); await tick(15); }
  const pw = host.querySelector('input[type="password"]');
  if (!pw) return false;
  setNativeValue(pw, "somer173");
  await tick(2);
  const buttons = [...host.querySelectorAll("button")].filter((b) => /دخول|فتح|تحقق|تأكيد|unlock/i.test(b.textContent || ""));
  if (buttons.length) click(buttons[buttons.length - 1]);
  else {
    const form = pw.closest("form");
    if (form) form.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
  }
  await tick(20);
  return true;
}

for (const n of LESSON_IDS) {
  const Comp = { 27: m.Lesson27, 28: m.Lesson28, 29: m.Lesson29, 30: m.Lesson30, 31: m.Lesson31, 32: m.Lesson32, 33: m.Lesson33 }[n];
  const { host, unmount } = await mountLesson(n, Comp);
  // مقفلة: لا مفتاح في الـ DOM
  ok(host.querySelectorAll("[data-ft-key-item]").length === 0, `L${n}: المفتاح غير موجود قبل كلمة المرور`);
  // كلمة مرور خاطئة
  const pwBefore = host.querySelector('input[type="password"]');
  if (pwBefore) {
    setNativeValue(pwBefore, "wrong-password");
    const btn = [...host.querySelectorAll("button")].find((b) => /دخول|فتح|تحقق|تأكيد|unlock/i.test(b.textContent || ""));
    if (btn) click(btn);
    else pwBefore.closest("form")?.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
    await tick(10);
    ok(host.querySelectorAll("[data-ft-key-item]").length === 0, `L${n}: كلمة مرور خاطئة لا تفتح المفتاح`);
  }
  const unlocked = await unlockTeacher(host);
  ok(unlocked, `L${n}: بوابة كلمة المرور موجودة`);
  const keyItems = [...host.querySelectorAll("[data-ft-key-item]")];
  ok(keyItems.length === m.finalTestFor(n).length, `L${n}: مفتاح الإجابات يعرض كل الأسئلة (${keyItems.length})`);
  const keySection = host.querySelector("[data-ft-key]");
  const keyText = plain(keySection ? keySection.innerHTML : "");
  ok(keyText.includes("الإجابة الصحيحة") && keyText.includes("السبب") && keyText.includes("المفهوم من الدرس"), `L${n}: صيغة المفتاح تدريسية (إجابة · سبب · مفهوم)`);
  ok(m.finalTestFor(n).every((q) => keyText.includes(m.FINAL.expectedAnswerText(q).slice(0, 18))), `L${n}: كل إجابات البنك تظهر في المفتاح`);
  ok(keyText.includes("Platform Explanation"), `L${n}: مفتاح المنصة موسوم Platform Explanation`);
  unmount();
}

// ---------------- 6) الربط: كل درس يعرض الاختبار النهائي كطبقة نهاية الدرس ----------------
{
  const lessonFiles = {
    27: ["src/lessons/lesson27/Lesson27.tsx"],
    28: ["src/lessons/lesson28/Lesson28.tsx"],
    29: ["src/lessons/lesson29/Lesson29.tsx"],
    30: ["src/lessons/lesson30/Lesson30.tsx"],
    31: ["src/lessons/lesson31/Lesson31.tsx"],
    32: ["src/lessons/lesson32/Lesson32.tsx", "src/lessons/lesson32/TeacherArea32.tsx"],
    33: ["src/lessons/lesson33/Lesson33.tsx", "src/lessons/lesson33/TeacherArea33.tsx"],
  };
  for (const n of LESSON_IDS) {
    const files = lessonFiles[n];
    const src = files.map((f) => readFileSync(join(root, f), "utf8")).join("\n");
    const view = readFileSync(join(root, files[0]), "utf8");
    ok(files.some((f) => readFileSync(join(root, f), "utf8").includes('from "../../shared/finalTest"')), `L${n}: المحرّك المشترك مستورد (ليس نسخة محلية)`);
    ok(files.some((f) => readFileSync(join(root, f), "utf8").includes('from "../../shared/finalTestBank"')), `L${n}: البنك المركزي مستورد`);
    ok(new RegExp(`<FinalTest\\s+lesson=\\{${n}\\}`).test(view), `L${n}: الاختبار النهائي مركّب في نهاية الدرس`);
    ok(new RegExp(`<FinalTestAnswerKey\\s+lesson=\\{${n}\\}`).test(src), `L${n}: مفتاح الإجابات مركّب في منطقة المعلم`);
    ok(!/<FinalTest\s+lesson=\{(?!%d\})\d+\}/.test(view.replace(new RegExp(`<FinalTest\\s+lesson=\\{${n}\\}`), "OK")), `L${n}: لا خلط بين اختبارات الدروس`);
  }
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  ok((pkg.scripts["audit:english-direction"] || "").includes("scripts/audit-final-test.mjs"), "scripts: تدقيق الاختبار النهائي موصول بـ audit:english-direction");
  ok(Object.keys(pkg.dependencies).sort().join(",") === "clsx,react,react-dom,tailwind-merge", "deps: لا مكتبات جديدة");
  // الدروس القديمة 1–26 تحتفظ بنظامها الأصلي (لا تكرار ولا حذف)
  ok(Object.keys(m.QUIZZES).length === 26, `نظام الدروس 1–26 كما هو (${Object.keys(m.QUIZZES).length} اختبارًا)`);
  ok(LESSON_IDS.every((n) => typeof m.QUIZZES[n] === "undefined"), "لا تعارض بين البنكين (1–26 و27–33)");
}

if (failures.length) {
  console.error(`✕ Final Test audit FAILED (${failures.length}/${checks})\n` + failures.map((x) => `  - ${x}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Final Test audit passed (${checks} checks): 7 lessons ✕ 12–15 questions, no reveal before the single correction, reset clears everything, teacher key behind somer173.`);
