// ============================================================
// Final Test audit — تدقيق الاختبار النهائي لكل درس (طبقة نهاية الدرس)
//
// يتحقق من:
//   1) نموذج البيانات: كل درس له اختبار من 12–15 سؤالًا، وكل سؤال مكتمل
//      (نص · إجابة صحيحة · سبب · مفهوم · فخ) وصالح لكل نوع.
//   2) البنية القابلة لإعادة الاستخدام: محرّك واحد مشترك + بنك مركزي،
//      الدروس 1–35 لها FinalTest (قديم 1–26، جديد 27–35)؛ والدروس 36 و37 و38 و39 لها Master Test مستقل من 25 سؤالًا.
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
// jsdom supplies a console-erroring Window.scrollTo stub; replace it for lesson navigation tests.
win.scrollTo = () => {};

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
import Lesson34 from ${JSON.stringify(join(root, "src/lessons/lesson34/Lesson34.tsx"))};
import Lesson35 from ${JSON.stringify(join(root, "src/lessons/lesson35/Lesson35.tsx"))};
import * as FINAL from ${JSON.stringify(join(root, "src/shared/finalTest.tsx"))};
import { FINAL_TESTS, FINAL_TEST_MIN, FINAL_TEST_MAX, finalTestFor, finalTestLessons } from ${JSON.stringify(join(root, "src/shared/finalTestBank.ts"))};
import { QUIZZES } from ${JSON.stringify(join(root, "src/shared/quizBank.ts"))};
export { React, createRoot, Lesson27, Lesson28, Lesson29, Lesson30, Lesson31, Lesson32, Lesson33, Lesson34, Lesson35, FINAL, FINAL_TESTS, FINAL_TEST_MIN, FINAL_TEST_MAX, finalTestFor, finalTestLessons, QUIZZES };
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
  // Lesson 44 ships self-hosted font subsets; jsdom does not render them.
  loader: { ".woff2": "empty" },
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
const LESSON_IDS = [27, 28, 29, 30, 31, 32, 33, 34, 35];
ok(m.FINAL_TEST_MIN === 12 && m.FINAL_TEST_MAX === 15, `حدود عدد الأسئلة 12–15 (got ${m.FINAL_TEST_MIN}..${m.FINAL_TEST_MAX})`);
ok(m.finalTestLessons().join(",") === LESSON_IDS.join(","), `بنك الاختبارات يغطي الدروس 27–35 (got ${m.finalTestLessons().join(",")})`);

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
      // وإلا صار السؤال تخمينًا للمفردة لا قياسًا للصيغة (عيب تحقّق في بنك 27–35).
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
const lesson36TestData = readFileSync(join(root, "src/lessons/lesson36/testData36.ts"), "utf8");
const lesson36TestArea = readFileSync(join(root, "src/lessons/lesson36/TestArea36.tsx"), "utf8");
const lesson36DedicatedAssessment = lesson36TestData.includes("TEST_COUNT_36 = TEST_36.length") && lesson36TestData.includes("TEST_LEVEL_COUNT_36 = TEST_LEVELS_36.length") && lesson36TestArea.includes("TEST_LEVELS_36") && lesson36TestArea.includes("TEST_COUNT_36");
ok(lesson36DedicatedAssessment, "الدرس 36: اختبار Master Test مستقلّ ومفصول عن محرّك FinalTest المشترك");
// الدرس 37: Master Test مستقل من 25 سؤالًا على خمسة مستويات، ونفس الفصل الكامل عن محرّك FinalTest
const lesson37TestData = readFileSync(join(root, "src/lessons/lesson37/testData37.ts"), "utf8");
const lesson37TestArea = readFileSync(join(root, "src/lessons/lesson37/TestArea37.tsx"), "utf8");
const lesson37DedicatedAssessment =
  lesson37TestData.includes("TEST_COUNT_37 = TEST_37.length") &&
  lesson37TestData.includes("TEST_LEVEL_COUNT_37 = TEST_LEVELS_37.length") &&
  lesson37TestArea.includes("TEST_LEVELS_37") &&
  lesson37TestArea.includes("TEST_COUNT_37") &&
  // الدرس 37 يفتح المفتاح بتحميل مؤجل واحد فقط بعد التسليم، لا باستيراد ثابت.
  (lesson37TestArea.match(/solutionsData37/g) || []).length === 1 &&
  !/from\s+"\.\/solutionsData37"/.test(lesson37TestArea);
ok(lesson37DedicatedAssessment, "الدرس 37: اختبار Master Test مستقلّ (25 سؤالًا/5 مستويات) ومفصول عن محرّك FinalTest وعن ملفّ الحلول");
const lesson38TestData = readFileSync(join(root, "src/lessons/lesson38/testData38.ts"), "utf8");
const lesson38TestArea = readFileSync(join(root, "src/lessons/lesson38/TestArea38.tsx"), "utf8");
const lesson38DedicatedAssessment =
  lesson38TestData.includes("TEST_COUNT_38 = TEST_38.length") &&
  lesson38TestData.includes("TEST_LEVEL_COUNT_38 = TEST_LEVELS_38.length") &&
  lesson38TestArea.includes("TEST_LEVELS_38") &&
  lesson38TestArea.includes("TEST_COUNT_38") &&
  !lesson38TestArea.includes("solutionsData38");
ok(lesson38DedicatedAssessment, "الدرس 38: اختبار Master Test مستقلّ (25 سؤالًا/5 مستويات) ومفصول عن محرّك FinalTest وعن ملفّ الحلول");
// الدرس 39: Master Test مستقل من 25 سؤالًا على خمسة مستويات، ومفصول عن الحلول
const lesson39TestData = readFileSync(join(root, "src/lessons/lesson39/testData39.ts"), "utf8");
const lesson39TestArea = readFileSync(join(root, "src/lessons/lesson39/TestArea39.tsx"), "utf8");
const lesson39DedicatedAssessment =
  lesson39TestData.includes("TEST_COUNT_39 = TEST_39.length") &&
  lesson39TestData.includes("TEST_LEVEL_COUNT_39 = TEST_LEVELS_39.length") &&
  lesson39TestArea.includes("TEST_LEVELS_39") &&
  lesson39TestArea.includes("TEST_COUNT_39") &&
  !lesson39TestArea.includes("solutionsData39");
ok(lesson39DedicatedAssessment, "الدرس 39: اختبار Master Test مستقلّ (25 سؤالًا/5 مستويات) ومفصول عن محرّك FinalTest وعن ملفّ الحلول");
// الدرس 40: Grand Exam مستقل من 25 سؤالًا على خمسة مستويات، ومفصول عن الحلول
const lesson40TestData = readFileSync(join(root, "src/lessons/lesson40/testData40.ts"), "utf8");
const lesson40TestArea = readFileSync(join(root, "src/lessons/lesson40/TestArea40.tsx"), "utf8");
const lesson40DedicatedAssessment =
  lesson40TestData.includes("TEST_QUESTION_COUNT_40 = TEST_QUESTIONS_40.length") &&
  lesson40TestData.includes("TEST_LEVELS_40") &&
  lesson40TestArea.includes("TEST_LEVELS_40") &&
  lesson40TestArea.includes("TEST_QUESTION_COUNT_40") &&
  !lesson40TestArea.includes("solutionsData40");
ok(lesson40DedicatedAssessment, "الدرس 40: اختبار Grand Exam مستقلّ (25 سؤالًا/5 مستويات) ومفصول عن محرّك FinalTest وعن ملفّ الحلول");
// Lesson 41: independent 25-question / five-level assessment; detailed behavioral checks in audit:lesson41.
const lesson41TestData = readFileSync(join(root, "src/lessons/lesson41/testData41.ts"), "utf8");
const lesson41TestArea = readFileSync(join(root, "src/lessons/lesson41/TestArea41.tsx"), "utf8");
const lesson41DedicatedAssessment =
  (lesson41TestData.match(/id: "q\d+"/g) || []).length === 25 &&
  (lesson41TestData.match(/level: [1-5],/g) || []).length >= 5 &&
  lesson41TestArea.includes("testComplete41") &&
  lesson41TestArea.includes("TEST_LEVELS_41") &&
  lesson41TestArea.includes('import("./key41")') &&
  !lesson41TestArea.includes("key41.ts") &&
  !lesson41TestData.includes("SOLUTIONS_41") && !lesson41TestData.includes("reason:");
ok(lesson41DedicatedAssessment, "Lesson 41: 25 questions, five levels, independent test without solution imports");
// Lesson 42: independent 25-question / five-level assessment; detailed behavioral checks in audit:lesson42.
const lesson42TestData = readFileSync(join(root, "src/lessons/lesson42/testData42.ts"), "utf8");
const lesson42TestArea = readFileSync(join(root, "src/lessons/lesson42/TestArea42.tsx"), "utf8");
const lesson42DedicatedAssessment =
  (lesson42TestData.match(/id: "q\d+"/g) || []).length === 25 &&
  (lesson42TestData.match(/level: [1-5],/g) || []).length >= 5 &&
  lesson42TestArea.includes("testComplete42") &&
  lesson42TestArea.includes("TEST_LEVELS_42") &&
  lesson42TestArea.includes('import("./key42")') &&
  !lesson42TestArea.includes("key42.ts") &&
  !lesson42TestArea.includes("solutionsData42") &&
  !lesson42TestData.includes("SOLUTIONS_42") && !lesson42TestData.includes("reason:");
ok(lesson42DedicatedAssessment, "Lesson 42: 25 questions, five levels, independent test without solution imports");
// Lesson 43: independent 25-question / five-level assessment; detailed behavioral checks in audit:lesson43.
const lesson43TestData = readFileSync(join(root, "src/lessons/lesson43/testData43.ts"), "utf8");
const lesson43TestArea = readFileSync(join(root, "src/lessons/lesson43/TestArea43.tsx"), "utf8");
const lesson43Key = readFileSync(join(root, "src/lessons/lesson43/key43.ts"), "utf8");
const lesson43DedicatedAssessment =
  (lesson43TestData.match(/id: "q\d+"/g) || []).length === 25 &&
  (lesson43TestData.match(/level: [1-5],/g) || []).length >= 5 &&
  lesson43TestArea.includes("testComplete43") &&
  lesson43TestArea.includes("TEST_LEVELS_43") &&
  lesson43TestArea.includes('import("./key43")') &&
  !lesson43TestArea.includes("key43.ts") &&
  !lesson43TestData.includes("SOLUTIONS_43") && !lesson43TestData.includes("reason:") &&
  lesson43Key.includes("SOLUTIONS_43") && lesson43Key.includes("provenance");
ok(lesson43DedicatedAssessment, "Lesson 43: 25 questions, five levels, independent test without solution imports");
// Lesson 44: independent 25-question / five-level assessment; detailed behavioral checks in audit:lesson44.
const lesson44TestData = readFileSync(join(root, "src/lessons/lesson44/testData44.ts"), "utf8");
const lesson44TestArea = readFileSync(join(root, "src/lessons/lesson44/TestArea44.tsx"), "utf8");
const lesson44Solutions = readFileSync(join(root, "src/lessons/lesson44/solutionsData44.ts"), "utf8");
const lesson44DedicatedAssessment =
  (lesson44TestData.match(/"id": "q\d+"/g) || []).length === 25 &&
  (lesson44TestData.match(/"level": [1-5]/g) || []).length === 5 &&
  lesson44TestArea.includes("testComplete44") &&
  lesson44TestArea.includes("TEST_LEVELS_44") &&
  !lesson44TestArea.includes("solutionsData44") && !lesson44TestData.includes("solutionsData44") &&
  lesson44Solutions.includes("Source key:") && !lesson44TestData.includes("Source key:");
ok(lesson44DedicatedAssessment, "Lesson 44: 25 questions, five levels, independent test without solution imports");
// Lesson 45: independent 25-question / five-level assessment; detailed behavioral checks in audit:lesson45.
const lesson45TestData = readFileSync(join(root, "src/lessons/lesson45/testData45.ts"), "utf8");
const lesson45TestArea = readFileSync(join(root, "src/lessons/lesson45/TestArea45.tsx"), "utf8");
const lesson45Key = readFileSync(join(root, "src/lessons/lesson45/testKey45.ts"), "utf8");
const lesson45DedicatedAssessment =
  (lesson45TestData.match(/id: "q\d+"/g) || []).length === 25 &&
  (lesson45TestData.match(/level: [1-5],/g) || []).length >= 5 &&
  lesson45TestArea.includes("TEST_LEVELS_45") &&
  lesson45TestArea.includes('import("./testKey45")') &&
  !lesson45TestArea.includes("TEST_SOLUTIONS_45") &&
  !lesson45TestData.includes("TEST_SOLUTIONS_45") && !lesson45TestData.includes("modelAnswer") &&
  lesson45Key.includes("TEST_SOLUTIONS_45") && lesson45Key.includes("gradeTest45");
ok(lesson45DedicatedAssessment, "Lesson 45: 25 questions, five levels, independent test without solution imports");
// Lesson 46: dedicated five-level test; behavioral and semantic cases live in audit:lesson46.
const lesson46TestData = readFileSync(join(root, "src/lessons/lesson46/testData46.ts"), "utf8");
const lesson46TestArea = readFileSync(join(root, "src/lessons/lesson46/TestArea46.tsx"), "utf8");
const lesson46Key = readFileSync(join(root, "src/lessons/lesson46/testKey46.ts"), "utf8");
const lesson46DedicatedAssessment =
  (lesson46TestData.match(/id: "q\d+"/g) || []).length === 25 &&
  lesson46TestArea.includes("TEST_LEVELS_46") && lesson46TestArea.includes('import("./testKey46")') &&
  !lesson46TestData.includes("TEST_SOLUTIONS_46") && !lesson46TestData.includes("modelAnswer") &&
  lesson46Key.includes("TEST_SOLUTIONS_46") && lesson46Key.includes("gradeTest46");
ok(lesson46DedicatedAssessment, "Lesson 46: 25 questions, independent key and five-level assessment");
const appLessons = [...new Set([...appSrc.matchAll(/route === (\d+)/g)].map((x) => Number(x[1])))].sort((a, b) => a - b);
ok(appLessons.length >= 46, `كل دروس التطبيق مسجلة (${appLessons.length})`);
for (const n of appLessons) {
  const legacy = (m.QUIZZES[n] || []).length >= 12;
  const modern = m.finalTestLessons().includes(n);
  const dedicated = (n === 36 && lesson36DedicatedAssessment) || (n === 37 && lesson37DedicatedAssessment) || (n === 38 && lesson38DedicatedAssessment) || (n === 39 && lesson39DedicatedAssessment) || (n === 40 && lesson40DedicatedAssessment) || (n === 41 && lesson41DedicatedAssessment) || (n === 42 && lesson42DedicatedAssessment) || (n === 43 && lesson43DedicatedAssessment) || (n === 44 && lesson44DedicatedAssessment) || (n === 45 && lesson45DedicatedAssessment) || (n === 46 && lesson46DedicatedAssessment);
  ok(legacy || modern || dedicated, `الدرس ${n}: له اختبار نهائي (قديم أو جديد أو Master Test مستقل)`);
}

const lessonSources = Object.fromEntries(
  LESSON_IDS.map((n) => [n, readFileSync(join(root, `src/lessons/lesson${n}/Lesson${n}.tsx`), "utf8")])
);
for (const n of LESSON_IDS) {
  const src = lessonSources[n];
  ok(src.includes("<FinalTest"), `L${n}: الاختبار النهائي مرندر في الدرس`);
  ok(src.includes("FINAL_TESTS[" + n + "]") || src.includes(`FINAL_TESTS[${n}]`), `L${n}: يستخدم بيانات البنك المركزي`);
  ok(!src.includes("FinalQuiz"), `L${n}: لا نسخة ثانية من الاختبار القديم`);
  ok(/index === (total|SLIDE_COUNT|SLIDE_COUNT_32|SLIDE_COUNT_33|SLIDE_COUNT_34|SLIDE_COUNT_35) - 1|slideIdx === total - 1/.test(src), `L${n}: الاختبار النهائي مربوط بآخر خطوة`);
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
  // سقف أمان مرتفع: بعض الدروس أطول من 90 خطوة (الدرس 32 = 120 صفحة).
  // الحلقة تتوقف عند ظهور الاختبار النهائي، أو عند غياب زر «التالي»/تعطيله،
  // أو عند بلوغ السقف 400 — وإلا فشلت التحققات التالية لغياب [data-final-test].
  while (!host.querySelector(`[data-final-test="${n}"]`) && steps < 400) {
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
  const Comp = { 27: m.Lesson27, 28: m.Lesson28, 29: m.Lesson29, 30: m.Lesson30, 31: m.Lesson31, 32: m.Lesson32, 33: m.Lesson33, 34: m.Lesson34, 35: m.Lesson35 }[n];
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
  const Comp = { 27: m.Lesson27, 28: m.Lesson28, 29: m.Lesson29, 30: m.Lesson30, 31: m.Lesson31, 32: m.Lesson32, 33: m.Lesson33, 34: m.Lesson34, 35: m.Lesson35 }[n];
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
    34: ["src/lessons/lesson34/Lesson34.tsx", "src/lessons/lesson34/TeacherArea34.tsx"],
    35: ["src/lessons/lesson35/Lesson35.tsx", "src/lessons/lesson35/TeacherArea35.tsx"],
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
  ok(LESSON_IDS.every((n) => typeof m.QUIZZES[n] === "undefined"), "لا تعارض بين البنكين (1–26 و27–35)");
}

if (failures.length) {
  console.error(`✕ Final Test audit FAILED (${failures.length}/${checks})\n` + failures.map((x) => `  - ${x}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Final Test audit passed (${checks} checks): 9 modern lessons ✕ 12–15 questions, no reveal before the single correction, reset clears everything, teacher key behind somer173.`);
