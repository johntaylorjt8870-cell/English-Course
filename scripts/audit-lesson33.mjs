#!/usr/bin/env node
// ============================================================
// تدقيق الدرس 33 — The Four Present Tenses (مختبر أزمنة الحاضر الأربعة)
//
// ثلاثة أقسام:
//   A) ثبات: بنية الملفات، عزل المفتاح، تسجيل الدرس، نظافة واجهة الطالب.
//   B) المادة: سجل المصدر، التغطية (لا وحدة ضائعة ولا مكرّرة)، صحة المحتوى
//      تعليميًا (عدد مواضع فقرة إيما، بدائل §13، اكتمال مفتاح الاختبار).
//   C) DOM: تمرّتان على الشرائح الـ71 — تمريرة نظيفة تثبت أن أي حل لا يظهر
//      قبل المحاولة، وتمريرة تفاعلية تثبت أن كل وحدة في المادة تُرسم فعلًا،
//      ثم تدقيق نص الطالب المشترك، ومسار الاختبار والتسليم والحلول والمعلم.
//
// لا يخفّف هذا التدقيق أي معيار مشترك؛ ويستعمل scripts/lib/student-copy-audit.mjs
// كما هو دون نسخة موازية.
// ============================================================

import { JSDOM } from "jsdom";
import { readFileSync, writeFileSync, rmSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { auditRenderedStudentCopy } from "./lib/student-copy-audit.mjs";

const root = process.cwd();
const L33 = join(root, "src/lessons/lesson33");
const read = (p) => readFileSync(join(root, p), "utf8");
const lessonSrc = (f) => readFileSync(join(L33, f), "utf8");

let checks = 0;
const failures = [];
function ok(cond, msg) {
  checks += 1;
  if (!cond) failures.push(msg);
  return Boolean(cond);
}
function eq(actual, expected, msg) {
  return ok(actual === expected, `${msg} (expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)})`);
}

// ------------------------------------------------------------
// A) ثبات الملفات
// ------------------------------------------------------------
const FILES = [
  "source33.ts",
  "ledger33.ts",
  "slides33.ts",
  "coverage33.ts",
  "design33.tsx",
  "kit33.tsx",
  "practice33.ts",
  "testData33.ts",
  "key33.ts",
  "data.ts",
  "Lesson33.tsx",
  "TestArea33.tsx",
  "SolutionsArea33.tsx",
  "TeacherArea33.tsx",
  "TeacherGuide33.tsx",
  "teacherData33.ts",
  "lesson33.css",
];
for (const f of FILES) ok(existsSync(join(L33, f)), `source: src/lessons/lesson33/${f} exists`);
for (const gone of ["Steps33.tsx", "testData.ts", "teacherData.ts"])
  ok(!existsSync(join(L33, gone)), `source: الملف القديم ${gone} أُزيل (استُبدل بالوحدات الجديدة)`);

const LESSON = lessonSrc("Lesson33.tsx");
const TESTAREA = lessonSrc("TestArea33.tsx");
const SOLUTIONS = lessonSrc("SolutionsArea33.tsx");
const TEACHER = lessonSrc("TeacherArea33.tsx");
const GUIDE = lessonSrc("TeacherGuide33.tsx");
const TESTDATA = lessonSrc("testData33.ts");
const KEY = lessonSrc("key33.ts");
const CSS = lessonSrc("lesson33.css");
const APP = read("src/App.tsx");

// --- التنقّل والقفل (عقود التدقيق المشترك) ---
ok(/from "\.\.\/\.\.\/shared\/LessonStepNav"/.test(LESSON), "nav: LessonStepNav مستورد من الأداة المشتركة");
ok(/<LessonStepNav/.test(LESSON), "nav: يستعمل <LessonStepNav> حرفيًا (لا نسخة محلية)");
ok(!/\.l33-fab\s*\{[^}]*position:\s*absolute/s.test(CSS), "nav: .l33-fab ليست position:absolute (لا تداخل مع زر قفل الموقع)");
ok(/\.l33-fab\s*\{/s.test(CSS), "nav: .l33-fab معرَّفة في lesson33.css");
ok(/\.l33-tab\s*\{/s.test(CSS) && /\.l33-chip\s*\{/s.test(CSS), "nav: .l33-tab و .l33-chip معرَّفتان");
ok(/data-solutions-locked/.test(LESSON), "nav: حالة قفل الحلول موسومة بـ data-solutions-locked");
ok(/مقفلة/.test(LESSON), "nav: نص القفل «مقفلة» موجود للطالب");
eq((LESSON.match(/dir="rtl"/g) || []).length >= 1, true, "bidi: جذر الدرس dir=rtl");
ok(/prefers-reduced-motion/.test(CSS), "a11y: احترام تقليل الحركة");

// --- الاختبار النهائي المشترك ---
ok(/<FinalTest\s+lesson=\{33\}/.test(LESSON), "final-test: <FinalTest lesson={33}> موجود");
ok(/FINAL_TESTS\[33\]/.test(LESSON), "final-test: يستعمل بنك الأسئلة المشترك FINAL_TESTS[33]");
ok(/from "\.\.\/\.\.\/shared\/finalTest"/.test(LESSON), "final-test: يستورد المكوّن المشترك finalTest");
ok(/from "\.\.\/\.\.\/shared\/finalTestBank"/.test(LESSON), "final-test: يستورد البنك المشترك finalTestBank");
ok(/index === SLIDE_COUNT_33 - 1/.test(LESSON), "final-test: الاختبار النهائي مربوط بآخر خطوة");
ok(!/FinalQuiz/.test(LESSON), "final-test: لا خلط مع النظام القديم FinalQuiz");
ok(/<FinalTestAnswerKey\s+lesson=\{33\}/.test(TEACHER), "final-test: مفتاح المعلم FinalTestAnswerKey داخل منطقة المعلم");

// --- فصل أسئلة الاختبار عن مفاتيحه ---
ok(!/\b(reason|accept|keywords|SOLUTIONS_33|fieldRules|errorNote|answer)\s*:/.test(TESTDATA), "isolation: testData33.ts لا يحمل أي مفتاح أو شرح");
ok(/await import\("\.\/key33"\)/.test(TESTAREA), "isolation: مفتاح التصحيح يُحمَّل ديناميكيًا عند التسليم");
for (const f of ["Lesson33.tsx", "TestArea33.tsx", "kit33.tsx", "practice33.ts", "slides33.ts", "coverage33.ts", "design33.tsx", "data.ts", "teacherData33.ts", "ledger33.ts", "source33.ts"]) {
  const code = lessonSrc(f);
  const valueImport = code.split("\n").some((line) => /from "\.\/key33"/.test(line) && !/^\s*import\s+type\b/.test(line));
  ok(!valueImport, `isolation: ${f} لا يستورد key33 استيراد قيم ثابتًا`);
}
ok(/const TeacherGuide33 = lazy\(\(\) => import\("\.\/TeacherGuide33"\)\)/.test(TEACHER), "isolation: دليل المعلم قطعة مؤجَّلة (لا يصل المفتاح إلى حزمة الطالب)");
ok(/lazy\(\(\) => import\("\.\/SolutionsArea33"\)\)/.test(LESSON), "isolation: منطقة الحلول قطعة مؤجَّلة");
ok(/from "\.\/key33"/.test(SOLUTIONS) && /from "\.\/key33"/.test(GUIDE), "isolation: الحلول ودليل المعلم يستوردان المفتاح (بعد الفتح فقط)");

// --- لا تسريب لمفتاح اختبار الدرس في حزمة الطالب ---
{
  const assets = join(root, "dist/assets");
  const entry = (existsSync(assets) ? readdirSync(assets) : []).filter((f) => /^index-.*\.js$/.test(f));
  if (entry.length) {
    const code = readFileSync(join(root, "dist/assets", entry[0]), "utf8");
    const probes = ["usually تدل على عادة متكررة", "is rehearsing", "Does he work here?"];
    for (const probe of probes) ok(!code.includes(probe), `bundle: حزمة الطالب الأولية لا تحتوي «${probe}»`);
    ok(readdirSync(assets).some((f) => /^key33-.*\.js$/.test(f)), "bundle: key33 قطعة مستقلة عن حزمة الطالب");
  }
}

// --- بوابة المعلم ---
ok(/id="l33-teacher-pw"/.test(TEACHER), "teacher: حقل كلمة المرور #l33-teacher-pw");
ok(/كلمة مرور المعلم/.test(TEACHER), "teacher: تسمية «كلمة مرور المعلم»");
ok(/type="submit"/.test(TEACHER) && /دخول/.test(TEACHER), "teacher: زر تسليم «دخول»");
ok(/قفل منطقة المعلم/.test(TEACHER), "teacher: زر إعادة القفل");
ok(/<details>/.test(TEACHER) || /<details>/.test(GUIDE), "teacher: فهرس المصدر داخل <details> في منطقة المعلم");
ok(/عميل|client-side|جهة العميل/i.test(GUIDE) || /عميل|client-side|جهة العميل/i.test(lessonSrc("teacherData33.ts")), "teacher: القفل موصوف بأنه حماية من جهة العميل لا حماية خادم");

// --- نظافة واجهة الطالب (ملفات الطالب فقط) ---
const STUDENT_FILES = ["Lesson33.tsx", "TestArea33.tsx", "SolutionsArea33.tsx", "kit33.tsx", "design33.tsx", "practice33.ts", "slides33.ts", "testData33.ts", "data.ts", "coverage33.ts", "ledger33.ts", "source33.ts"];
for (const f of STUDENT_FILES) {
  const code = lessonSrc(f);
  ok(!/\stitle=\{?["']/.test(code), `hygiene: ${f} لا يستعمل title= للتلميحات`);
  ok(!/onMouseEnter/.test(code), `hygiene: ${f} لا يعلّق محتوى على hover وحده`);
  ok(!/<details|<summary/.test(code), `hygiene: ${f} لا يحتوي <details>/<summary>`);
}
ok(!/aria-hidden="true"[^>]*>\s*(?:Present|I |She |He |They |Ryan|Nora|Emma)/.test(LESSON), "a11y: لا نص تعليمي داخل aria-hidden");

// --- تسجيل الدرس في المنصة ---
ok(/from "\.\/lessons\/lesson33\/Lesson33"/.test(APP), "registration: App.tsx يستورد Lesson33");
ok(/n:\s*33,/.test(APP), "registration: بطاقة الدرس 33 موجودة في App.tsx");
ok(/route === 33\) page = <Lesson33 onExit=\{goHome\} \/>/.test(APP), "registration: مسار #/lesson/33 مربوط بالمكوّن");
ok(/href: "#\/lesson\/33"/.test(APP), "registration: بطاقة الدرس 33 تشير إلى #/lesson/33");

// --- تبعات التشغيل لم تتغير ---
{
  const pkg = JSON.parse(read("package.json"));
  eq(Object.keys(pkg.dependencies).sort().join(","), "clsx,react,react-dom,tailwind-merge", "deps: تبعات التشغيل كما هي");
}

// ------------------------------------------------------------
// B) المادة والتغطية — عبر حزمة esbuild
// ------------------------------------------------------------
const dom = new JSDOM(`<!doctype html><html dir="rtl"><body></body></html>`, { url: "http://localhost/", pretendToBeVisual: true });
const win = dom.window;
const GLOBALS = [
  "window", "document", "navigator", "location", "history", "HTMLElement", "HTMLInputElement",
  "HTMLTextAreaElement", "HTMLButtonElement", "HTMLAnchorElement", "Element", "Node", "Event",
  "MouseEvent", "KeyboardEvent", "CustomEvent", "getComputedStyle", "requestAnimationFrame",
  "cancelAnimationFrame", "DOMParser", "NodeFilter", "SVGElement",
];
for (const key of GLOBALS) {
  if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true, writable: true });
}
if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};
if (!win.Element.prototype.scrollIntoView) win.Element.prototype.scrollIntoView = () => {};
win.scrollTo = () => {};
Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", { value: false, configurable: true, writable: true });

// artifacts داخل node_modules (متجاهَلة في git) بمسارات مطلقة في الاستيراد
const buildRoot = join(root, "node_modules", ".lesson33-audit");
const entryFile = join(buildRoot, "entry.tsx");
const outDir = join(buildRoot, "build");
const SRC33 = (f) => join(root, "src/lessons/lesson33", f);
mkdirSync(buildRoot, { recursive: true });
const entryLines = [
  `import React from "react";`,
  `import { createRoot } from "react-dom/client";`,
  `import Lesson33, { SlideView33, SlideBody33, pageById33 } from ${JSON.stringify(SRC33("Lesson33.tsx"))};`,
  `import * as SL from ${JSON.stringify(SRC33("slides33.ts"))};`,
  `import * as LG from ${JSON.stringify(SRC33("ledger33.ts"))};`,
  `import * as PR from ${JSON.stringify(SRC33("practice33.ts"))};`,
  `import * as CV from ${JSON.stringify(SRC33("coverage33.ts"))};`,
  `import * as TD from ${JSON.stringify(SRC33("testData33.ts"))};`,
  `import * as KY from ${JSON.stringify(SRC33("key33.ts"))};`,
  `import * as DT from ${JSON.stringify(SRC33("data.ts"))};`,
  `import * as SRC from ${JSON.stringify(SRC33("source33.ts"))};`,
  `import { FINAL_TESTS } from ${JSON.stringify(join(root, "src/shared/finalTestBank.ts"))};`,
  `export function mount(node: unknown) {`,
  `  const el = document.createElement("div");`,
  `  document.body.appendChild(el);`,
  `  createRoot(el).render(node as never);`,
  `  return el;`,
  `}`,
  `export { React, Lesson33, SlideView33, SlideBody33, pageById33, SL, LG, PR, CV, TD, KY, DT, SRC, FINAL_TESTS };`,
];
writeFileSync(entryFile, `${entryLines.join("\n")}\n`);
const esbuild = (await import("esbuild")).default;
// splitting ضروري هنا: الدرس يستورد منطقة الحلول ودليل المعلم بـ import() مؤجَّل،
// والتدقيق يحتاج أن يُحمَّلا فعلًا كما يحمّلهما المتصفح.
await esbuild.build({
  absWorkingDir: root,
  entryPoints: [entryFile],
  bundle: true,
  platform: "node",
  format: "esm",
  splitting: true,
  outdir: outDir,
  jsx: "automatic",
  packages: "external",
  logLevel: "silent",
  loader: { ".css": "empty" },
});
const outFile = join(outDir, "entry.js");
const m = await import(pathToFileURL(outFile).href);
const { SL, LG, PR, CV, TD, KY, DT, SRC } = m;

// --- سجل المصدر ---
const sections = LG.SOURCE_SECTIONS_33;
eq(sections.length, 26, "ledger: 26 كتلة (الغلاف + الأهداف + 24 قسمًا مرقّمًا)");
eq(LG.SOURCE_NUMBERED_COUNT_33, 24, "ledger: 24 قسمًا مرقّمًا");
eq(sections.length, LG.SOURCE_LEDGER_COUNT_33, "ledger: SOURCE_LEDGER_COUNT_33 يطابق عدد الكتل");
eq(LG.SOURCE_UNIT_COUNT_33, sections.reduce((n, s) => n + s.lines.length, 0), "ledger: SOURCE_UNIT_COUNT_33 = مجموع الأسطر");
eq(LG.SOURCE_UNIT_COUNT_33, CV.COVERAGE_SUMMARY_33.units, "ledger: ملخص التغطية يستعمل العدد نفسه");
ok(new Set(sections.map((s) => s.id)).size === sections.length, "ledger: معرّفات الكتل فريدة");
eq(sections.filter((s) => s.num !== null).length, 24, "ledger: كل قسم مرقّم له num");
eq(SRC.SOURCE_TEXT_33.split("@@").filter((b) => b.trim()).length, 26, "source: نص المادة يحتوي 26 كتلة");
ok(sections.every((s) => s.lines.every((l) => l.trim().length > 0)), "ledger: لا سطر فارغ في المادة");
eq(sections.map((s) => s.id).join(","), ["cover", "objectives", ...Array.from({ length: 24 }, (_, i) => `s${i + 1}`)].join(","), "ledger: معرّفات الكتل cover/objectives/s1..s24");
ok(sections.every((s) => s.title.trim().length > 0), "ledger: لكل كتلة عنوان");

// --- الشرائح ---
const slides = SL.SLIDES_33;
eq(slides.length, SL.SLIDE_COUNT_33, "slides: SLIDE_COUNT_33 = عدد الشرائح");
ok(slides.length >= 60, `slides: المحتوى مقسّم على شرائح قصيرة (${slides.length} شريحة)`);
ok(new Set(slides.map((s) => s.id)).size === slides.length, "slides: لا معرّف شريحة مكرر");
ok(slides.every((s) => sections.some((sec) => sec.id === s.section)), "slides: كل شريحة تشير إلى كتلة موجودة");
eq(SL.STATIONS_33.length, 8, "slides: ثماني محطات");
ok(slides.every((s) => SL.STATIONS_33.some((st) => st.id === s.station)), "slides: كل شريحة تنتمي إلى محطة موجودة");
eq(CV.COVERAGE_SUMMARY_33.slides, slides.length, "slides: ملخص التغطية يستعمل عدد الشرائح نفسه");
eq(slides.filter((s) => s.kind === "test").length, 7, "slides: سبع شرائح للاختبار (مقدمة + 5 مستويات + النتيجة)");
ok(slides[slides.length - 1].kind === "writing" || slides.some((s) => s.section === "s24"), "slides: ختام الدرس خريطة التقدم والدرس القادم");

// حدود النطاقات
const unitCountOf = (id) => sections.find((s) => s.id === id).lines.length;
for (const slide of slides) {
  const max = unitCountOf(slide.section);
  for (const key of ["ranges", "keyRanges", "headRanges", "footRanges"]) {
    const ranges = slide[key] || [];
    for (const [from, to] of ranges) {
      ok(from >= 0 && to < max && from <= to, `slides: ${slide.id} ${key} [${from},${to}] داخل حدود ${slide.section} (0..${max - 1})`);
    }
  }
  const inRanges = (idx) => (slide.ranges || []).some(([a, b]) => idx >= a && idx <= b);
  const inKey = (idx) => (slide.keyRanges || []).some(([a, b]) => idx >= a && idx <= b);
  for (const [a, b] of [...(slide.headRanges || []), ...(slide.footRanges || [])]) {
    for (let i = a; i <= b; i += 1) {
      ok(inRanges(i), `slides: ${slide.id} — النص الإضافي ${i} جزء من ranges`);
      ok(!inKey(i), `slides: ${slide.id} — النص الإضافي ${i} ليس مقترنًا بالمحاولة في الوقت نفسه`);
    }
  }
  for (const [a, b] of slide.ranges || []) {
    for (let i = a; i <= b; i += 1) ok(!inKey(i), `slides: ${slide.id} — الوحدة ${i} إما مباشرة أو مقترنة بالمحاولة، لا الاثنان`);
  }
  if (slide.testLevel) ok([1, 2, 3, 4, 5].includes(slide.testLevel), `slides: ${slide.id} مستوى اختبار صالح`);
  if (slide.testItems) ok(slide.testItems[0] >= 1 && slide.testItems[1] <= 25 && slide.testItems[0] <= slide.testItems[1], `slides: ${slide.id} نطاق أسئلة صالح`);
}

// --- التغطية: لا ضائع ولا مكرّر ---
const uncovered = CV.uncoveredUnits33();
eq(uncovered.length, 0, `coverage: كل وحدات المادة مرسومة (${uncovered.length} ضائعة${uncovered.length ? ": " + uncovered.slice(0, 5).map((u) => `${u.section}[${u.index}]`).join(", ") : ""})`);
const duplicated = CV.duplicatedUnits33();
eq(duplicated.length, 0, `coverage: لا وحدة مُعلَنة في أكثر من شريحة (${duplicated.length})`);
let rendered = 0;
let gated = 0;
for (const sec of sections) {
  const r = CV.renderedIndexes33(sec.id);
  const g = CV.gatedIndexes33(sec.id);
  const c = CV.coveredIndexes33(sec.id);
  eq(c.size, sec.lines.length, `coverage: ${sec.id} — كل وحداته معلَنة (${c.size}/${sec.lines.length})`);
  eq(c.size, r.size + g.size, `coverage: ${sec.id} — مباشر + مقترن بالمحاولة = الكل`);
  ok([...r].every((i) => !g.has(i)), `coverage: ${sec.id} — لا وحدة مباشرة ومقترنة بالمحاولة معًا`);
  rendered += r.size;
  gated += g.size;
}
eq(rendered + gated, LG.SOURCE_UNIT_COUNT_33, "coverage: مجموع الوحدات المعلَنة = مجموع وحدات المادة");
eq(CV.PRACTICE_BLOCKS.size, 5, "coverage: خمس كتل تفاعلية (s12 s13 s14 s17 s18)");
eq(CV.COVERAGE_33.length, 26, "coverage: جدول التغطية يغطي 26 كتلة");
ok(CV.COVERAGE_33.every((row) => row.slides.length > 0), "coverage: كل كتلة لها شريحة واحدة على الأقل");
ok(CV.COVERAGE_33.every((row) => row.answerLocation.trim().length > 0), "coverage: كل كتلة لها موضع إجابة موثّق");

// --- التصحيح التعليمي الوحيد (§18) ---
eq(LG.SOURCE_CORRECTIONS_33.length, 1, "accuracy: تصحيح واحد موثّق في المادة");
const corr = LG.SOURCE_CORRECTIONS_33[0];
eq(corr.origin, "source-note", "accuracy: التصحيح منسوب إلى ملاحظة المادة نفسها لا إلى اختراع المنصة");
eq(corr.id, "gd2-count", "accuracy: التصحيح يخصّ عدد مواضع المحقق المتقدم");
eq(corr.section, "s18", "accuracy: التصحيح في §18");
ok(/يوجد أحد عشر موضعًا/.test(LG.sectionLines33("s18")[17]), "accuracy: ملاحظة المادة نفسها تقول «أحد عشر موضعًا» — دليل التصحيح");
ok(/عشرة أخطاء/.test(corr.original), "accuracy: النص الأصلي «عشرة أخطاء» محفوظ كما هو");
ok(/أحد عشر/.test(corr.applied), "accuracy: العدد المطبّق «أحد عشر»");
eq(LG.INTENTIONALLY_WRONG_33.length, 27, "accuracy: 27 موضعًا خاطئًا مقصودًا في كل المادة");

// --- §18: عدد المواضع = ما في الفقرة فعلًا ---
eq(PR.PARAGRAPH_SPOTS_33.length, 11, "§18: أحد عشر موضعًا (العدّ الحرفي للفقرة)");
eq(new Set(PR.PARAGRAPH_SPOTS_33.map((s) => s.wrong)).size, 11, "§18: لا موضع مكرر");
for (const spot of PR.PARAGRAPH_SPOTS_33) {
  ok(PR.PARAGRAPH_WRONG_33.includes(spot.wrong), `§18: المقطع الخاطئ «${spot.wrong.slice(0, 40)}» وارد حرفيًا في الفقرة`);
  ok(PR.PARAGRAPH_RIGHT_33.includes(spot.right), `§18: التصويب «${spot.right.slice(0, 40)}» وارد في الفقرة المصححة`);
  ok(spot.reason.trim().length > 10, `§18: الموضع ${spot.number} له سبب`);
}
{
  // الفقرة المصححة = الفقرة الأصلية بعد استبدال المواضع الأحد عشر (بلا أي تعديل آخر)
  let rebuilt = PR.PARAGRAPH_WRONG_33;
  for (const spot of PR.PARAGRAPH_SPOTS_33) rebuilt = rebuilt.replace(spot.wrong, spot.right);
  eq(rebuilt, PR.PARAGRAPH_RIGHT_33, "§18: الفقرة المصححة هي الأصل بعد المواضع الأحد عشر فقط");
}
ok(!/عشرة أخطاء/.test(slides.find((s) => s.id === "s18-a").title), "§18: عنوان الشريحة لا يقول «عشرة أخطاء»");
ok(/أحد عشر/.test(slides.find((s) => s.id === "s18-a").title), "§18: عنوان الشريحة يقول «أحد عشر موضعًا»");
eq(LG.sectionLines33("s18")[0], corr.applied, "§18: نص التعليمات في السجل = النص المطبّق الموثّق");
ok(!LG.sectionLines33("s18").includes(corr.original), "§18: النص القديم «عشرة أخطاء» لم يعد معروضًا للطالب");
eq(PR.PARAGRAPH_SENTENCES_33.length >= 6, true, "§18: الفقرة الأصلية محفوظة كاملة ومفكّكة إلى جمل");

// --- §12 و§14 و§17 و§16: الحلول من المادة ---
eq(PR.DETECTIVE_33.length, 8, "§12: ثماني جمل في المحقق الأول");
ok(PR.DETECTIVE_33.every((i) => i.provenance === "source"), "§12: كل الحلول منصوصة في المادة");
PR.DETECTIVE_33.forEach((item, i) => {
  eq(item.right, LG.sectionLines33("s12")[10 + i].replace(/^[①-⑳]\s*/, ""), `§12: حل الجملة ${i + 1} = نص المادة`);
});
eq(LG.INTENTIONALLY_WRONG_33.filter((w) => w.section === "s12").length, 8, "§12: ثماني جمل مسجّلة كخطأ مقصود");

eq(PR.PRACTICE_33.length, 10, "§13: عشرة أسئلة في التدريب الأول");
ok(PR.PRACTICE_33.every((i) => i.provenance === "platform"), "§13: مفاتيح التدريب الأول مُعدّة في المنصة (المادة لم تسردها)");
eq(PR.PRACTICE_33.filter((i) => i.alternatives?.length).length, 4, "§13: أربعة أسئلة تقبل أكثر من زمن (④⑥⑧⑩)");
PR.PRACTICE_33.forEach((item, i) => {
  eq(item.prompt, LG.sectionLines33("s13")[1 + i].replace(/^[①-⑳]\s*/, ""), `§13: نص السؤال ${i + 1} = نص المادة`);
  ok(item.fields.every((f) => !f.placeholder), `§13: السؤال ${i + 1} بلا placeholder يكشف الإجابة`);
  ok(item.reason.trim().length > 20, `§13: السؤال ${i + 1} له سبب مفصّل`);
});
ok(PR.PRACTICE_33.every((i) => PR.normalize33(i.answer[i.fields.length - 1]).length > 0), "§13: لا إجابة فارغة");
// السؤالان ① و⑦ لا يفرضان زمنًا واحدًا حيث يسمح السياق بأكثر منه
ok(PR.PRACTICE_33[3].accept?.[0]?.includes("have waited"), "§13: ④ يقبل have waited بديلًا");
ok(PR.PRACTICE_33[5].accept?.[0]?.includes("have been inspecting"), "§13: ⑥ يقبل have been inspecting بديلًا");
ok(PR.PRACTICE_33[7].fields.length === 2, "§13: ⑧ فراغان (الفعل المساعد + صيغة الفعل)");
ok(PR.PRACTICE_33[9].accept?.[0]?.includes("have examined"), "§13: ⑩ يقبل have examined بديلًا");

eq(PR.PRACTICE2_33.length, 4, "§14: أربع جمل بفعل design");
ok(PR.PRACTICE2_33.every((i) => i.provenance === "source"), "§14: الحلول منصوصة في المادة");
PR.PRACTICE2_33.forEach((item, i) => {
  eq(item.prompt, LG.sectionLines33("s14")[2 + i].replace(/^[①-⑳]\s*/, ""), `§14: نص الجملة ${i + 1} = نص المادة`);
  ok(LG.sectionLines33("s14")[7 + i].includes(item.answer[0]), `§14: حل الجملة ${i + 1} «${item.answer[0]}» وارد في نص المادة`);
  ok(item.reason.trim().length > 15, `§14: الجملة ${i + 1} لها سبب`);
});
eq(PR.PRACTICE2_WHY_33.length, 6, "§14: ستة أسطر تشرح لماذا هذا الزمن دون غيره");
eq(PR.STORY_ROWS_33.length, 11, "§17: أحد عشر صفًا في تحليل القصة");
PR.STORY_ROWS_33.forEach((row, i) => {
  eq(`${row.phrase} | ${row.tenseName} | ${row.reason}`, LG.sectionLines33("s17")[1 + i], `§17: الصف ${i + 1} = نص المادة`);
});
eq(PR.STORY_PARAGRAPHS_33.length, 6, "§16: ست فقرات في قصة The Young Inventor");
eq(PR.STORY_TITLE_33, "The Young Inventor", "§16: عنوان القصة");
ok(PR.STORY_PHRASES_33.length >= 10, `§16: ${PR.STORY_PHRASES_33.length} عبارة تُحلَّل في القصة`);
for (const phrase of PR.STORY_PHRASES_33) {
  ok(PR.STORY_PARAGRAPHS_33.some((p) => p.includes(phrase)), `§16: العبارة «${phrase}» واردة في القصة`);
}
{
  const story = PR.STORY_PARAGRAPHS_33.join(" ");
  for (const row of PR.STORY_ROWS_33) {
    const verb = row.phrase.trim().split(/\s+/).pop();
    ok(story.includes(verb), `§16/§17: فعل العبارة «${row.phrase}» وارد في القصة`);
  }
}
eq(PR.WRITING_CRITERIA_33.length, 6, "§22: ستة شروط في مهمة الكتابة");
ok(PR.WRITING_MODEL_33.length > 80, "§22: المثال التوضيحي كامل");
eq(PR.SITUATIONS_33.length, 4, "§19: أربعة مواقف في تحدي اختلاف المعنى");
eq(PR.GOLDEN_SENTENCES_33.length, 4, "§23: أربع جمل في الملخص الذهبي");
eq(PR.BOTH_CORRECT_33.options.length, 2, "§15: إجابتان صحيحتان");
eq(PR.AUX_PAIRS_33.length, 4, "§6: أربعة أزواج لأخطاء الفعل المساعد");
ok(PR.SIGNAL_WORDS_33.length >= 20, `§7: ${PR.SIGNAL_WORDS_33.length} كلمة دالة في الفرز`);
ok(PR.SIGNAL_AMBIGUOUS_33.includes("never"), "§7: never مستثناة من الفرز لأنها في زمنين");

// --- §20: الاختبار 25 سؤالًا في خمسة مستويات ---
const questions = TD.TEST_33;
eq(questions.length, 25, "test: 25 سؤالًا");
eq(TD.TEST_LEVELS_33.length, 5, "test: خمسة مستويات");
ok(TD.TEST_LEVELS_33.every((l) => l.questions.length === 5), "test: خمسة أسئلة في كل مستوى");
eq(new Set(questions.map((q) => q.number)).size, 25, "test: أرقام الأسئلة فريدة");
eq(questions.map((q) => q.number).join(","), Array.from({ length: 25 }, (_, i) => i + 1).join(","), "test: الأرقام 1..25 بالترتيب");
eq(TD.answeredCount33(KY.perfectSheet33()), 25, "test: العدّاد المُعلَن = 25 سؤالًا");
eq(TD.testComplete33(KY.perfectSheet33()), true, "test: الورقة الكاملة تُعدّ مكتملة");
eq(TD.testComplete33({}), false, "test: الورقة الفارغة ليست مكتملة");
eq(TD.answeredCount33({}), 0, "test: لا إجابة محتسبة بلا كتابة");
eq(TD.TEST_LEVELS_33.flatMap((l) => l.questions.map((q) => q.id)).join(","), questions.map((q) => q.id).join(","), "test: المستويات والأائمة المسطّحة متطابقان");
ok(questions.every((q) => q.id === `q${q.number}`), "test: معرّفات الأسئلة منتظمة (q1..q25)");
for (const q of questions) {
  ok(q.lines.length > 0 && q.lines.every((l) => l.trim().length > 0), `test: السؤال ${q.number} له نص`);
  const key = KY.SOLUTIONS_33.find((s) => s.id === q.id);
  ok(key.answer.length < 7 || !q.lines.some((l) => l.includes(key.answer)), `test: السؤال ${q.number} لا يعرض الحل في نصه`);
  eq(key.number, q.number, `test: السؤال ${q.number} ومفتاحه متطابقان`);
  eq(key.level, q.level, `test: السؤال ${q.number} ومستواه متطابقان`);
  ok(!q.fields.some((f) => "keywords" in f) && !q.fields.some((f) => "accept" in f), `test: السؤال ${q.number} بلا قواعد تصحيح`);
}
eq(questions.find((q) => q.number === 7).fields.length, 2, "test: ⑦ فراغان (الفعل المساعد + الصيغة)");
const q20 = questions.find((q) => q.number === 20);
eq(q20.fields.length, 3, "test: ⑳ ثلاثة حقول (الحكم + تركيز الجملة الأولى + تركيز الثانية)");
eq(q20.options.length, 3, "test: ⑳ ثلاثة خيارات للحكم (كلتاهما / الأولى / الثانية)");
ok(q20.options.some((o) => o.text.includes("نعم، كلتاهما صحيحتان")), "test: ⑳ خيار الحكم الصحيح نصّه من المادة");
const key20 = KY.SOLUTIONS_33.find((k) => k.number === 20);
eq(Object.keys(key20.fieldRules).length, 3, "key: ⑳ ثلاثة حقول في المفتاح");
ok(key20.fieldRules.focusA.keywords[0].length >= 3 && key20.fieldRules.focusB.keywords[0].length >= 3, "key: ⑳ حقلا التركيز يُصحَّحان بالكلمات المفتاحية (في المفتاح لا في بيانات الطالب)");
ok(!q20.fields.some((f) => f.keywords), "test: حقول ⑳ عند الطالب بلا كلمات مفتاحية");
const q25 = questions.find((q) => q.number === 25);
eq(q25.fields.length, 3, "test: ㉕ ثلاثة حقول (فعلان + شرح)");
const key25 = KY.SOLUTIONS_33.find((k) => k.number === 25);
eq(Object.keys(key25.fieldRules).length, 3, "key: ㉕ ثلاثة حقول في المفتاح");
ok(key25.fieldRules.why.keywords.length >= 2 && key25.fieldRules.why.keywords[0].length >= 3, "key: ㉕ حقل الشرح يُصحَّح بالكلمات المفتاحية");
ok(!q25.fields.some((f) => f.keywords), "test: حقول ㉕ عند الطالب بلا كلمات مفتاحية");
eq(TD.MIA_PARAGRAPH_33.lines.length, 3, "test: فقرة Mia في ثلاث جمل");
ok(TD.MIA_PARAGRAPH_33.lines.every((p) => LG.sectionLines33("s20").includes(p)), "test: جمل فقرة Mia من نص المادة حرفيًا");
eq(TD.MIA_PARAGRAPH_33.head, LG.sectionLines33("s20")[29], "test: ترويسة فقرة Mia من نص المادة");
eq(TD.MIA_PARAGRAPH_33.questionsHead, LG.sectionLines33("s20")[33], "test: ترويسة أسئلة Mia من نص المادة");
// كل سطر سؤال وارد في القسم 20 من المادة
{
  const s20 = LG.sectionLines33("s20");
  let matched = 0;
  for (const q of questions) for (const line of q.lines) if (s20.includes(line)) matched += 1;
  const totalLines = questions.reduce((n, q) => n + q.lines.length, 0);
  ok(matched >= totalLines - 6, `test: أسطر الأسئلة من المادة (${matched}/${totalLines} — والباقي مقاطع من فقرة Mia)`);
}
ok(questions.every((q) => q.fields.every((f) => !f.placeholder)), "test: لا placeholder يكشف إجابة");

// --- مفتاح التصحيح كامل ---
const keys = KY.SOLUTIONS_33;
eq(keys.length, 25, "key: 25 حلًا");
eq(keys.map((k) => k.id).join(","), questions.map((q) => q.id).join(","), "key: الحلول مطابقة للأسئلة ترتيبًا ومعرّفًا");
for (const k of keys) {
  ok(k.answer.trim().length > 0, `key: ${k.id} له إجابة مقبولة`);
  ok(["PS", "PC", "PP", "PPC", "—"].includes(k.tenseId), `key: ${k.id} له زمن صحيح`);
  ok(k.tense.trim().length > 1, `key: ${k.id} له اسم زمن معروض`);
  ok(k.reason.trim().length > 15, `key: ${k.id} له سبب`);
}
eq(keys.filter((k) => k.errorNote).length, 5, "key: خمسة أسئلة في المستوى الثالث لها شرح للخطأ الشائع");
ok(keys.filter((k) => k.errorNote).every((k) => k.number >= 11 && k.number <= 15), "key: شروح الأخطاء على أسئلة المستوى الثالث (11–15)");
eq(keys.filter((k) => k.alternatives?.length).length, 4, "key: أربعة أسئلة لها بدائل صحيحة (4، 8، 15، 24)");
ok(keys.find((k) => k.number === 4).alternatives[0].answer === "has repaired", "key: ④ بديله has repaired");
ok(keys.find((k) => k.number === 8).accept?.includes("has studied") || keys.find((k) => k.number === 8).alternatives?.[0].answer === "has studied", "key: ⑧ يقبل has studied بديلًا");
ok(keys.find((k) => k.number === 24).accept?.includes("has trained") || keys.find((k) => k.number === 24).alternatives?.[0].answer === "has trained", "key: ㉔ يقبل has trained بديلًا");
eq(questions.find((q) => q.number === 25).fields.length, 3, "key: ㉕ يعرض فعلين وشرحًا لا كلمة واحدة");
ok(/is rehearsing/.test(key25.answer) && /has known/.test(key25.answer), "key: ㉕ إجابته فعلان لا كلمة واحدة");
ok(KY.MIA_CORRECTED_33.some((p) => p.includes("is rehearsing")) && KY.MIA_CORRECTED_33.some((p) => p.includes("has known")), "key: فقرة Mia المصححة تحتوي الفعلين المطلوبين في ㉕");
eq(KY.MIA_CORRECTED_33.length, 3, "key: فقرة Mia المصححة ثلاث جمل مثل الأصل");

const perfect = KY.grade33(KY.perfectSheet33());
eq(perfect.score, 25, "key: ورقة الإجابات النموذجية تحصل على 25/25");
eq(perfect.total, 25, "key: الدرجة الكلية 25");
eq(perfect.results.filter((r) => !r.correct).length, 0, "key: لا خطأ في الورقة النموذجية");
eq(KY.grade33({}).score, 0, "key: ورقة فارغة = 0/25 (لا درجات مجانية)");
{
  const wrong = {};
  for (const q of questions) for (const f of q.fields) wrong[TD.answerKey33(q.id, f.key)] = "zzz wrong answer";
  eq(KY.grade33(wrong).score, 0, "key: إجابات خاطئة = 0/25");
}
{
  const partial = KY.perfectSheet33();
  partial[TD.answerKey33("q1", questions[0].fields[0].key)] = "sleeps";
  const graded = KY.grade33(partial);
  eq(graded.score, 24, "key: خطأ واحد ينقص درجة واحدة");
  eq(graded.results.find((r) => r.id === "q1").correct, false, "key: الخطأ الواحد موسوم");
}
ok(keys.every((k) => k.provenance === "source" || k.provenance === "platform"), "key: كل حل له مصدر معلوم");
ok(questions.every((q) => ["complete", "correct", "meaning", "verdict", "boss"].includes(q.type)), "test: أنواع الأسئلة من المجموعة المعتمدة");
ok(new Set(questions.map((q) => q.type)).size >= 4, "test: أربعة أنواع أسئلة على الأقل");
ok(questions.every((q) => q.fields.every((f) => f.key)), "test: لكل حقل مفتاح ثابت");
ok(questions.every((q) => q.lines.every((l) => !KY.SOLUTIONS_33.find((k) => k.id === q.id).answer.split(" / ").includes(l.trim()))), "test: لا سطر سؤال يطابق إجابة مقبولة");

// --- الاختبار النهائي المشترك (بنك المنصة) ليس اختبار الدرس ---
{
  const ft = m.FINAL_TESTS[33];
  ok(Array.isArray(ft) && ft.length >= 12 && ft.length <= 15, `final-test: بنك المنصة للدرس 33 له ${ft?.length} سؤالًا (12–15) وهو غير اختبار الدرس الـ25`);
  eq(DT.AREAS_33.length, 4, "shell: أربع مناطق");
  eq(DT.AREAS_33.map((a) => a.ar).join("|"), "خطوات الدرس|منطقة الاختبار|منطقة الحلول|منطقة المعلم", "shell: تسميات المناطق كما يتوقعها تدقيق التنقّل");
}

// ------------------------------------------------------------
// C) DOM — تمرّتان على كل الشرائح
// ------------------------------------------------------------
const tick = (ms = 25) => new Promise((r) => setTimeout(r, ms));
const textOf = (el) => el?.textContent || "";
const q = (scope, sel) => scope.querySelector(sel);
const qa = (scope, sel) => [...scope.querySelectorAll(sel)];

// مُطبِّع للمقارنة: الأرقام الدائرية → أرقام، وإزالة الفصل والتشكيل والمسافات
const CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕";
function norm(t) {
  return String(t ?? "")
    .normalize("NFKC")
    .replace(/[①-⑳㉑-㉕]/g, (c) => String(CIRCLED.indexOf(c) + 1))
    .replace(/[✅❌✓✕]/g, "")
    .replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[|/·•]/g, " ")
    .replace(/[.،,!?؟;؛:"'’«»()\[\]{}\-–—]/g, " ")
    .replace(/\s+/g, "")
    .toLowerCase();
}
function hasUnit(text, unit) {
  if (unit.includes(" | ")) return unit.split(" | ").every((cell) => norm(text).includes(norm(cell)));
  return norm(text).includes(norm(unit));
}

/**
 * مُطبِّع أدق لفحوص «يجب ألّا يظهر»: يحافظ على نقطتي النهاية والفاصلة
 * حتى لا تتطابق وحدة قصيرة مثل «B.» أو «الحلول:» مع نص واجهة مختلف.
 */
function normStrict(t) {
  return String(t ?? "")
    .normalize("NFKC")
    .replace(/[①-⑳㉑-㉕]/g, (c) => String(CIRCLED.indexOf(c) + 1))
    .replace(/[✅❌✓✕]/g, "")
    .replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}
function absentUnit(text, unit) {
  return !normStrict(text).includes(normStrict(unit));
}

const unitIndexesOf = (ranges) => {
  const out = [];
  for (const [a, b] of ranges || []) for (let i = a; i <= b; i += 1) out.push(i);
  return out;
};
const linesOf = (section, ranges) => {
  const all = LG.sectionLines33(section);
  return unitIndexesOf(ranges).map((i) => all[i]);
};

/** القطع المؤجَّلة (منطقة الحلول، دليل المعلم) تحتاج بضع مئات من الملّي ثانية. */
async function waitFor(scope, selector, timeout = 4000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const found = scope.querySelector(selector);
    if (found) return found;
    await tick(50);
  }
  return scope.querySelector(selector);
}

/**
 * `.click()` (لا dispatchEvent) حتى ينفّذ jsdom سلوك التنشيط: اختيار الراديو،
 * تعليم مربع، وإرسال النموذج — وهي الأحداث التي يبني عليها React onChange/onSubmit.
 */
const clickEl = (el) => {
  if (!el) return false;
  if (typeof el.click === "function") el.click();
  else el.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
  return true;
};
const setNative = (el, value) => {
  const proto = el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event("input", { bubbles: true }));
};
const isExcluded = (btn) =>
  Boolean(btn.closest("[data-site-lock-button],[data-site-lock-slot],[data-nav-area]")) ||
  btn.matches("[data-test-submit],[data-test-reset],[data-nav-toggle]");

/**
 * يشغّل كل تفاعل متاح داخل النطاق: اختيارات الراديو، مربعات التعليم،
 * ثم كل زر مُتاح مرة واحدة، وأخيرًا إعادة فتح أي بطاقة مطوية.
 * الإعادة ضرورية لأن بعض المختبرات تكشف ثم تطوي بالضغط نفسه.
 */
async function exercise(scope) {
  const done = new Set();
  const reopened = new Set();
  let count = 0;
  for (let round = 0; round < 10; round += 1) {
    let acted = false;
    for (const input of qa(scope, "input[type=radio], input[type=checkbox]")) {
      if (done.has(input) || input.disabled || input.checked) continue;
      done.add(input);
      // لا نضبط checked يدويًا: الراديو المضبوط مسبقًا لا يطلق حدث change في jsdom.
      clickEl(input);
      count += 1;
      acted = true;
      await tick(18);
    }
    for (const b of qa(scope, "button")) {
      if (done.has(b) || b.disabled || isExcluded(b)) continue;
      done.add(b);
      clickEl(b);
      count += 1;
      acted = true;
      await tick(12);
    }
    for (const d of qa(scope, '[aria-expanded="false"]')) {
      if (reopened.has(d)) continue;
      reopened.add(d);
      done.add(d);
      clickEl(d);
      count += 1;
      acted = true;
      await tick(12);
    }
    if (!acted) break;
  }
  await tick(60);
  return count;
}

const attemptAnswers = new Map();
for (const item of PR.DETECTIVE_33) attemptAnswers.set(item.id, [item.right]);
for (const item of PR.ALL_PRACTICE_33) attemptAnswers.set(item.id, item.fields.map((_, i) => item.answer[i] ?? item.answer[0]));
for (const spot of PR.PARAGRAPH_SPOTS_33) attemptAnswers.set(spot.id, [spot.right]);

async function attemptAll(scope) {
  let done = 0;
  for (const card of qa(scope, "[data-attempt]")) {
    const id = card.getAttribute("data-attempt");
    const answers = attemptAnswers.get(id);
    if (!answers) continue;
    const boxes = qa(card, "textarea, input[type=text]");
    if (boxes.length !== answers.length) continue;
    boxes.forEach((box, i) => setNative(box, answers[i]));
    await tick(4);
    const btn = qa(card, "button")[0];
    if (btn && !btn.disabled) {
      clickEl(btn);
      done += 1;
      await tick(6);
    }
  }
  return done;
}

const studentFindings = [];
/** النص المرسوم فعلًا في كل سياق يُفحص — يُستعمل لفحوص قواعد المستودع على DOM لا على الملفات. */
const studentTexts = [];
let studentScans = 0;
function scanStudent(node, context) {
  studentScans += 1;
  studentTexts.push({ context, text: node?.textContent ?? "" });
  for (const f of auditRenderedStudentCopy(node)) studentFindings.push({ ...f, context });
}

async function walkAll({ interact }) {
  const host = m.mount(m.React.createElement(m.Lesson33, {}));
  await tick(120);
  const railButtons = qa(host, 'nav[aria-label="خطوات الدرس 33"] button');
  eq(railButtons.length, slides.length, `dom${interact ? "-interactive" : "-pristine"}: ${slides.length} زر خطوة في قائمة المحطات (وجد ${railButtons.length})`);
  const missing = [];
  const leaked = [];
  const directMissing = [];
  let exercised = 0;
  let attempted = 0;

  for (let i = 0; i < slides.length; i += 1) {
    const slide = slides[i];
    clickEl(railButtons[i]);
    await tick(22);
    const main = q(host, "#l33-main");
    if (!main) {
      failures.push(`dom: لا #l33-main عند الشريحة ${slide.id}`);
      checks += 1;
      continue;
    }
    checks += 1;

    // لا حل قبل المحاولة
    const before = textOf(main);
    for (const unit of linesOf(slide.section, slide.keyRanges)) {
      if (!absentUnit(before, unit)) leaked.push(`${slide.id}: «${unit.slice(0, 50)}»`);
    }
    for (const unit of linesOf(slide.section, slide.ranges)) {
      if (!hasUnit(before, unit)) directMissing.push(`${slide.id}: «${unit.slice(0, 50)}»`);
    }
    scanStudent(main, `page:${slide.id}`);

    if (!interact) continue;

    exercised += await exercise(main);
    attempted += await attemptAll(main);
    await exercise(main);
    await tick(60);
    const after = textOf(main);
    scanStudent(main, `page-interacted:${slide.id}`);

    for (const unit of [...linesOf(slide.section, slide.ranges), ...linesOf(slide.section, slide.keyRanges)]) {
      if (!hasUnit(after, unit)) missing.push(`${slide.id}: «${unit.slice(0, 60)}»`);
    }
  }

  return { host, missing, leaked, directMissing, exercised, attempted, railButtons };
}

// --- تمريرة نظيفة: لا شيء مقترن بالمحاولة يظهر ---
const pristine = await walkAll({ interact: false });
eq(pristine.leaked.length, 0, `isolation-dom: لا حل يظهر قبل التفاعل (${pristine.leaked.length}${pristine.leaked.length ? ": " + pristine.leaked.slice(0, 4).join(" · ") : ""})`);
ok(pristine.directMissing.length > 0, `dom: ${pristine.directMissing.length} وحدة تحتاج تفاعلًا (بطاقات قابلة للقلب/مقارنة) — تُتحقَّق في التمريرة التفاعلية`);
scanStudent(pristine.host, "student-shell-and-navigation");
pristine.host.remove();
await tick(20);

// --- تمريرة تفاعلية: كل وحدة تُرسم فعلًا ---
const live = await walkAll({ interact: true });
eq(live.missing.length, 0, `coverage-dom: كل وحدات المادة تظهر في الشرائح (${live.missing.length} ناقصة${live.missing.length ? ": " + live.missing.slice(0, 8).join(" · ") : ""})`);
ok(live.exercised > 120, `dom: المختبرات قابلة للتشغيل (${live.exercised} ضغطة)`);
ok(live.attempted >= 23, `dom: بنود المحاولة تُقبل وتكشف حلولها (${live.attempted} بندًا)`);

// --- بطاقات المحاولة: لا حل قبل الكتابة، وحل واحد بعد محاولة واحدة ---
{
  const host = m.mount(m.React.createElement(m.Lesson33, {}));
  await tick(120);
  const at = (id) => qa(host, 'nav[aria-label="خطوات الدرس 33"] button')[slides.findIndex((s) => s.id === id)];
  clickEl(at("s12-a"));
  await tick(30);
  const main = q(host, "#l33-main");
  const cards = qa(main, "[data-attempt]");
  eq(cards.length, 4, "gate: شريحة المحقق الأولى تعرض أربع بطاقات");
  ok(cards.every((c) => !c.querySelector('[data-solution="true"]')), "gate: لا حل معروض قبل المحاولة");
  ok(cards.every((c) => qa(c, "button")[0]?.disabled), "gate: زر المقارنة معطّل قبل الكتابة");
  ok(!textOf(main).includes(LG.sectionLines33("s12")[10]), "gate: حل الجملة الأولى غير ظاهر");
  scanStudent(main, "lab-before:detective");

  const done = await attemptAll(main);
  eq(done, 4, "gate: أربع بطاقات تقبل المحاولة الصحيحة");
  await tick(25);
  ok(cards.every((c) => c.querySelector('[data-solution="true"]')), "gate: الحلول تظهر بعد المحاولة الصحيحة");
  ok(textOf(main).includes("goes to school by bus"), "gate: حل الجملة الأولى ظهر بعد المحاولة");
  ok(textOf(main).includes("usually تدل على عادة"), "gate: سبب الحل ظهر بعد المحاولة");
  scanStudent(main, "lab-after:detective");
  host.remove();
  await tick(20);
}

// --- فقرة إيما: أحد عشر موضعًا وبوابة على الشرائح التالية ---
{
  const host = m.mount(m.React.createElement(m.Lesson33, {}));
  await tick(120);
  const at = (id) => qa(host, 'nav[aria-label="خطوات الدرس 33"] button')[slides.findIndex((s) => s.id === id)];
  clickEl(at("s18-b"));
  await tick(30);
  ok(textOf(q(host, "#l33-main")).includes("الفقرة المصححة مقفلة حتى تكمل مواضع الإصلاح"), "gate: الفقرة المصححة مقفلة قبل إكمال المواضع");
  clickEl(at("s18-a"));
  await tick(25);
  const main = q(host, "#l33-main");
  ok(textOf(main).includes(PR.PARAGRAPH_WRONG_33.slice(0, 40)), "gate: فقرة إيما الأصلية معروضة للطالب");
  eq(qa(main, "[data-attempt]").length, 11, "gate: أحد عشر موضعًا في فقرة إيما");
  const done = await attemptAll(main);
  eq(done, 11, "gate: أحد عشر موضعًا تُقبل");
  clickEl(at("s18-b"));
  await tick(30);
  ok(textOf(q(host, "#l33-main")).includes("usually walks to university"), "gate: الفقرة المصححة تُكشف بعد إكمال المواضع الأحد عشر");
  clickEl(at("s18-c"));
  await tick(25);
  ok(textOf(q(host, "#l33-main")).includes(LG.sectionLines33("s18")[6]), "gate: سبب الموضع الأول يظهر");
  clickEl(at("s18-d"));
  await tick(25);
  ok(textOf(q(host, "#l33-main")).includes(LG.sectionLines33("s18")[16]), "gate: سبب الموضع الأخير يظهر");
  host.remove();
  await tick(20);
}

// --- تدريب §14: حلوله خلف محاولة بنوده ---
{
  const host = m.mount(m.React.createElement(m.Lesson33, {}));
  await tick(120);
  const at = (id) => qa(host, 'nav[aria-label="خطوات الدرس 33"] button')[slides.findIndex((s) => s.id === id)];
  clickEl(at("s14-b"));
  await tick(30);
  ok(q(host, '[data-gate="locked"]'), "gate: حلول §14 مقفلة قبل المحاولة");
  ok(!textOf(q(host, "#l33-main")).includes("has been designing"), "gate: حل §14 غير ظاهر");
  clickEl(at("s14-a"));
  await tick(25);
  await attemptAll(q(host, "#l33-main"));
  clickEl(at("s14-b"));
  await tick(30);
  ok(q(host, '[data-gate="reveal"]'), "gate: حلول §14 تُفتح بعد إكمال بنودها");
  clickEl(q(host, '[data-gate="reveal"]'));
  await tick(25);
  ok(textOf(q(host, "#l33-main")).includes("has been designing"), "gate: حلول §14 معروضة بعد الفتح");
  for (const line of LG.sectionLines33("s14").slice(6, 11)) ok(textOf(q(host, "#l33-main")).includes(line), `gate: حلول §14 تعرض «${line.slice(0, 40)}»`);
  clickEl(at("s14-c"));
  await tick(25);
  for (const line of LG.sectionLines33("s14").slice(11, 17)) ok(textOf(q(host, "#l33-main")).includes(line), `gate: تعليل §14 يعرض «${line.slice(0, 40)}»`);
  host.remove();
  await tick(20);
}

// --- مسار الاختبار: حيادي قبل التسليم، مصحَّح بعده ---
{
  const host = m.mount(m.React.createElement(m.Lesson33, {}));
  await tick(120);
  const tab = (label) => qa(host, "button.l33-tab").find((b) => (b.textContent || "").includes(label));
  const at = (id) => qa(host, 'nav[aria-label="خطوات الدرس 33"] button')[slides.findIndex((s) => s.id === id)];
  clickEl(tab("منطقة الاختبار"));
  await tick(40);
  const main = q(host, "#l33-main");
  ok(q(main, '[data-area="l33-test"]'), "test-dom: منطقة الاختبار تُعرض");
  ok(textOf(main).includes(TD.TEST_INTRO_33[0]), "test-dom: مقدمة الاختبار من نص المادة");
  ok(textOf(main).includes("خمسة مستويات") || textOf(main).includes("25"), "test-dom: العدد والمستويات مُعلَنة للطالب");
  eq(qa(main, "[data-question-id]").length, 25, "test-dom: خمسة وعشرون سؤالًا في منطقة الاختبار");
  const beforeSubmit = textOf(main);
  ok(!/[✓✕]/.test(beforeSubmit), "test-dom: لا تصحيح قبل التسليم");
  ok(!beforeSubmit.includes("wakes up"), "test-dom: مفتاح السؤال الأول غير ظاهر");
  ok(!beforeSubmit.includes("is rehearsing"), "test-dom: مفتاح السؤال الأخير غير ظاهر");
  ok(!beforeSubmit.includes("usually تدل على عادة متكررة"), "test-dom: لا شرح قبل التسليم");
  ok(q(main, '[data-test-submit="33"]').disabled, "test-dom: زر التسليم معطّل قبل الإجابة عن الكل");
  scanStudent(main, "assessment-before-submit");

  clickEl(tab("منطقة الحلول"));
  await tick(40);
  ok(q(host, "[data-solutions-locked='true']"), "solutions-dom: منطقة الحلول مقفلة قبل التسليم");
  ok(textOf(q(host, "#l33-main")).includes("مقفلة"), "solutions-dom: الطالب يرى كلمة «مقفلة»");
  ok(!textOf(q(host, "#l33-main")).includes("is rehearsing"), "solutions-dom: لا مفتاح قبل التسليم");
  scanStudent(q(host, "#l33-main"), "solutions-locked");

  clickEl(tab("خطوات الدرس"));
  await tick(30);
  clickEl(at("s21"));
  await tick(30);
  ok(q(host, "[data-solutions-locked='true']"), "solutions-dom: شريحة الحلول مقفلة قبل التسليم");
  ok(q(host, '[data-nav-area="solutions"]').disabled, "solutions-dom: زر كشف الحلول معطّل قبل التسليم");

  // الإجابة عن الأسئلة الـ25
  clickEl(tab("منطقة الاختبار"));
  await tick(40);
  const sheet = KY.perfectSheet33();
  let filled = 0;
  for (const question of TD.TEST_33) {
    for (const f of question.fields) {
      const key = TD.answerKey33(question.id, f.key);
      const value = sheet[key];
      if (value === undefined) {
        failures.push(`test-dom: الورقة النموذجية لا تحمل قيمة للحقل ${key}`);
        checks += 1;
        continue;
      }
      if (question.options && f.key === question.fields[0].key) {
        const label = q(host, `[data-option="${question.id}-${value}"]`);
        if (!label) {
          failures.push(`test-dom: لا خيار «${value}» في السؤال ${question.number}`);
          checks += 1;
          continue;
        }
        const input = q(label, "input");
        clickEl(label);
        await tick(3);
        if (!input.checked) {
          input.checked = true;
          clickEl(input);
        }
      } else {
        const box = q(host, `[data-answer="${question.id}-${f.key}"]`);
        if (!box) {
          failures.push(`test-dom: لا حقل كتابة ${f.key} في السؤال ${question.number}`);
          checks += 1;
          continue;
        }
        setNative(box, value);
      }
      filled += 1;
      await tick(2);
    }
  }
  checks += 1;
  eq(filled, 30, "test-dom: 30 حقلًا (25 سؤالًا + فراغ إضافي في ⑦ + حقلا ⑳ + حقلا ㉕)");
  await tick(40);
  ok(!q(host, '[data-test-submit="33"]').disabled, "test-dom: زر التسليم يُفعَّل بعد الإجابة عن الكل");
  ok(textOf(q(host, "#l33-main")).includes("25 / 25"), "test-dom: عدّاد الإجابة 25/25");

  clickEl(q(host, '[data-test-submit="33"]'));
  await tick(60);
  if (!textOf(q(host, "#l33-main")).includes("تم التسليم")) {
    q(host, 'form[data-area-test="33"]')?.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
  }
  await tick(300);
  ok(textOf(q(host, "#l33-main")).includes("تم التسليم"), "test-dom: زر التسليم يتحول إلى «تم التسليم» بعد التصحيح");
  ok(qa(host, "fieldset[data-question-id][disabled]").length === 25, "test-dom: الأسئلة تُقفل بعد التسليم");
  scanStudent(q(host, "#l33-main"), "assessment-after-submit");

  clickEl(tab("خطوات الدرس"));
  await tick(30);
  clickEl(at("test-result"));
  await tick(30);
  const resultText = textOf(q(host, "#l33-main"));
  ok(q(host, '[data-test-result="ready"]'), "test-dom: شريحة النتيجة تظهر بعد التسليم");
  ok(resultText.includes("25 / 25") && resultText.includes("100%"), "test-dom: الورقة النموذجية = 25/25 (100%)");
  ok(resultText.includes("إتقان كامل"), "test-dom: رسالة النتيجة تناسب الدرجة");

  clickEl(tab("منطقة الحلول"));
  await waitFor(host, "[data-area='solutions']", 5000);
  ok(q(host, "[data-area='solutions']"), "solutions-dom: منطقة الحلول تُفتح بعد التسليم (قطعة مؤجَّلة)");
  eq(qa(host, "[data-solution-id]").length, 25, "solutions-dom: 25 حلًا مفصّلًا");
  scanStudent(q(host, "#l33-main"), "solutions-unlocked");
  const solText = textOf(q(host, "#l33-main"));
  ok(solText.includes("is rehearsing") && solText.includes("has known"), "solutions-dom: حقلَا ㉕ معروضان (فعلان لا كلمة واحدة)");
  ok(solText.includes("نعم، كلتاهما صحيحتان"), "solutions-dom: حكم ⑳ معروض");
  ok(solText.includes("has repaired"), "solutions-dom: البديل الصحيح للسؤال ④ معروض");
  ok(keys.find((k) => k.number === 8).alternatives.every((alt) => solText.includes(alt.answer)), "solutions-dom: بديل السؤال ⑧ معروض");
  ok(keys.find((k) => k.number === 20).reason.split(" ").slice(0, 6).join(" ").length > 0 && solText.includes("الفرق فرقُ تركيز"), "solutions-dom: تعليل ⑳ كامل (الحكم + فرق التركيز)");
  ok(solText.includes("تفسير الخطأ"), "solutions-dom: شروح أخطاء المستوى الثالث معروضة");
  ok(q(host, "[data-mia-key='33']"), "solutions-dom: فقرة Mia كاملة بعد التصحيح");
  ok(solText.includes("practices") && solText.includes("has been training"), "solutions-dom: فقرة Mia المصححة");

  // --- منطقة المعلم ---
  clickEl(tab("منطقة المعلم"));
  await tick(60);
  ok(q(host, "#l33-teacher-pw"), "teacher-dom: حقل كلمة المرور");
  ok(q(host, "[data-area='teacher-locked']"), "teacher-dom: البوابة مقفلة");
  ok(textOf(q(host, "#l33-main")).includes("كلمة مرور المعلم"), "teacher-dom: تسمية البوابة");
  ok(!q(host, "[data-ft-key-item]"), "teacher-dom: لا مفتاح قبل كلمة المرور");
  ok(!textOf(q(host, "#l33-main")).includes("usually تدل على عادة متكررة"), "teacher-dom: لا شرح قبل كلمة المرور");
  scanStudent(q(host, "#l33-main"), "teacher-locked");

  const submitBtn = () => qa(host, 'button[type="submit"]').find((b) => (b.textContent || "").includes("دخول"));
  setNative(q(host, "#l33-teacher-pw"), "wrong-pass");
  await tick(10);
  clickEl(submitBtn());
  await tick(60);
  ok(!q(host, "[data-area='l33-teacher-body']"), "teacher-dom: كلمة مرور خاطئة لا تفتح");
  ok(textOf(q(host, "#l33-main")).includes("كلمة المرور غير صحيحة"), "teacher-dom: رسالة الرفض");

  setNative(q(host, "#l33-teacher-pw"), "somer173");
  await tick(10);
  clickEl(submitBtn());
  await waitFor(host, "[data-area='l33-teacher-body']", 5000);
  ok(q(host, "[data-area='l33-teacher-body']"), "teacher-dom: somer173 تفتح منطقة المعلم");
  ok(qa(host, "[data-ft-key-item]").length >= 12, "teacher-dom: مفتاح الاختبار النهائي المشترك ظاهر");
  await waitFor(host, "[data-teacher-guide]", 6000);
  ok(q(host, "[data-teacher-guide]"), "teacher-dom: دليل المعلم التحليلي ظاهر (قطعة مؤجَّلة)");
  const tText = textOf(q(host, "#l33-main"));
  ok(tText.includes("client-side gate") || tText.includes("من جانب المتصفح"), "teacher-dom: القفل موصوف بأنه حماية من جانب المتصفح فقط");
  ok(tText.includes("أحد عشر موضعًا"), "teacher-dom: سجل الدقة يذكر تصحيح §18");
  ok(tText.includes("454"), "teacher-dom: دليل المعلم يعرض عدد وحدات المادة");

  clickEl(qa(host, "button").find((b) => (b.textContent || "").includes("قفل منطقة المعلم")));
  await tick(80);
  ok(q(host, "#l33-teacher-pw"), "teacher-dom: إعادة القفل تُغلق المنطقة");
  ok(!q(host, "[data-teacher-guide]"), "teacher-dom: دليل المعلم يختفي بعد إعادة القفل");
  host.remove();
  await tick(20);
}

// --- الاختبار النهائي المشترك في آخر خطوة ---
{
  const host = m.mount(m.React.createElement(m.Lesson33, {}));
  await tick(120);
  const rail = qa(host, 'nav[aria-label="خطوات الدرس 33"] button');
  clickEl(rail[rail.length - 1]);
  await tick(40);
  ok(q(host, '[data-final-test="33"]'), "final-test-dom: الاختبار النهائي المشترك في آخر خطوة");
  ok(!q(host, '[data-ft-key-item]'), "final-test-dom: لا مفتاح قبل التصحيح");
  scanStudent(q(host, "#l33-main"), "final-test-page");
  host.remove();
  await tick(20);
}

// --- الوصول لكل شريحة عبر قائمة المحطات (لا شريحة غير قابلة للوصول) ---
{
  const host = m.mount(m.React.createElement(m.Lesson33, {}));
  await tick(120);
  const rail = qa(host, 'nav[aria-label="خطوات الدرس 33"] button');
  const reached = new Set();
  for (const btn of rail) {
    clickEl(btn);
    await tick(8);
    const slide = q(host, "[data-slide]");
    if (slide) reached.add(slide.getAttribute("data-slide"));
  }
  eq(reached.size, slides.length, "nav-dom: كل شريحة قابلة للوصول عبر قائمة المحطات");
  eq([...reached].sort().join(","), slides.map((s) => s.id).sort().join(","), "nav-dom: المعرّفات المرئية = المعرّفات المعلَنة");
  // التنقّل بخطوة واحدة من البداية إلى النهاية
  clickEl(rail[0]);
  await tick(15);
  let steps = 0;
  while (steps < slides.length + 5) {
    const next = qa(host, "button.l33-fab-next")[0];
    if (!next || next.disabled) break;
    clickEl(next);
    steps += 1;
    await tick(6);
  }
  eq(steps, slides.length - 1, `nav-dom: زر «التالي ←» يقطع ${slides.length - 1} خطوة ثم يُقفل`);
  ok(qa(host, "button.l33-fab-next")[0]?.disabled, "nav-dom: زر التالي معطّل في آخر خطوة");
  host.remove();
  await tick(20);
}

// --- نص الطالب: لا تسميات مصدرية (الأداة المشتركة) ---
const distinct = new Map();
for (const f of studentFindings) {
  if (!distinct.has(f.text)) distinct.set(f.text, { text: f.text, rules: new Set(), contexts: new Set() });
  const entry = distinct.get(f.text);
  f.rules.forEach((r) => entry.rules.add(r));
  entry.contexts.add(f.context);
}
const report = [...distinct.values()].map((e) => ({ text: e.text, rules: [...e.rules], contexts: [...e.contexts] }));
const occurrences = studentFindings.length;
eq(report.length, 0, `student-copy: لا تسميات مصدر في نص الطالب (${studentScans} مسحًا؛ ${report.length} نصًا فريدًا؛ ${occurrences} ظهورًا)`);

// ------------------------------------------------------------
// قواعد المستودع العامة داخل الدرس 33
// ------------------------------------------------------------
{
  // قاعدة المستودع الموثقة: لا رموز أعلام (regional indicators) في الدروس.
  // عنوان المادة المقدَّمة يحمل علم المملكة المتحدة؛ أُزيل الرمز وبقي النص حرفيًا.
  const FLAG = /[\u{1F1E6}-\u{1F1FF}]{2}/u;
  const sourceFiles = [
    "source33.ts",
    "ledger33.ts",
    "slides33.ts",
    "practice33.ts",
    "testData33.ts",
    "key33.ts",
    "design33.tsx",
    "kit33.tsx",
    "Lesson33.tsx",
    "TestArea33.tsx",
    "SolutionsArea33.tsx",
    "TeacherArea33.tsx",
    "TeacherGuide33.tsx",
    "teacherData33.ts",
  ];
  const flagged = sourceFiles.filter((file) => FLAG.test(lessonSrc(file)));
  eq(flagged.length, 0, `repo-rule: لا رموز أعلام في ملفات الدرس 33 (${flagged.join("، ") || "لا شيء"})`);
  ok(!FLAG.test(LG.SOURCE_TEXT_33), "repo-rule: نص المادة المسجَّل بلا رموز أعلام");
  ok(studentTexts.length >= studentScans, `repo-rule: جُمع النص المرسوم من كل سياق (${studentTexts.length}/${studentScans})`);
  const domFlagged = studentTexts.filter((entry) => FLAG.test(entry.text));
  eq(domFlagged.length, 0, `repo-rule: لا رمز علم في أي نص مرسوم للطالب (${domFlagged.length}${domFlagged.length ? ": " + domFlagged.slice(0, 3).map((e) => e.context).join("، ") : ""})`);
}

// ------------------------------------------------------------
// نطاق التغيير في git
// ------------------------------------------------------------
{
  const integration = new Set([
    "src/App.tsx",
    "package.json",
    "scripts/audit-lesson33.mjs",
    "scripts/audit-lesson33-browser.mjs",
    "scripts/lesson33-coverage-doc.mjs",
  ]);
  const resolveBase = () => {
    for (const candidate of ["origin/main", "main", "HEAD"]) {
      try {
        execFileSync("git", ["rev-parse", "--verify", "--quiet", candidate], { stdio: "ignore", cwd: root });
        return candidate;
      } catch {
        /* try next */
      }
    }
    return null;
  };
  const base = resolveBase();
  const changed = [
    ...new Set([
      ...(base ? execFileSync("git", ["diff", "--name-only", base], { encoding: "utf8", cwd: root }).split("\n") : []),
      ...execFileSync("git", ["ls-files", "--others", "--exclude-standard"], { encoding: "utf8", cwd: root }).split("\n"),
    ]),
  ].filter(Boolean);
  ok(
    changed.every((p) => integration.has(p) || p.startsWith("src/lessons/lesson33/") || p.startsWith("docs/lesson33") || p.startsWith("docs/navigation-fix-visual/")),
    `git: التغييرات داخل الدرس 33 وتدقيقاته ووثائقه (${changed.filter((p) => !(integration.has(p) || p.startsWith("src/lessons/lesson33/") || p.startsWith("docs/lesson33") || p.startsWith("docs/navigation-fix-visual/"))).join(", ") || "لا شيء"})`,
  );
  ok(!changed.some((p) => /^src\/lessons\/lesson(?!33\/)/.test(p)), "git: لم يُمَسّ مجلد درس آخر");
  ok(!changed.some((p) => p.startsWith("src/shared/")), "git: لم تُمَسّ المكونات المشتركة (بنك الاختبار النهائي وأدوات التنقّل)");
}

// ------------------------------------------------------------
// التقرير
// ------------------------------------------------------------
rmSync(buildRoot, { recursive: true, force: true });
const summary = {
  generatedAt: new Date().toISOString(),
  checks,
  failures: failures.length,
  sourceBlocks: sections.length,
  numberedSections: LG.SOURCE_NUMBERED_COUNT_33,
  sourceUnits: LG.SOURCE_UNIT_COUNT_33,
  slides: slides.length,
  stations: SL.STATIONS_33.length,
  uncoveredUnits: uncovered.length,
  duplicatedUnits: duplicated.length,
  practiceItems: PR.ALL_PRACTICE_33.length + PR.DETECTIVE_33.length + PR.PARAGRAPH_SPOTS_33.length + PR.STORY_ROWS_33.length,
  intentionalErrors: LG.INTENTIONALLY_WRONG_33.length,
  sourceCorrections: LG.SOURCE_CORRECTIONS_33.length,
  testQuestions: questions.length,
  testLevels: TD.TEST_LEVELS_33.length,
  keyEntries: keys.length,
  perfectScore: perfect.score,
  emptyScore: KY.grade33({}).score,
  studentCopyScans: studentScans,
  studentCopyDistinctLeaks: report.length,
  studentCopyOccurrences: occurrences,
  labClicks: live.exercised,
  attemptCards: live.attempted,
};
writeFileSync(join(root, "docs/lesson33-static-audit.json"), `${JSON.stringify(summary, null, 2)}\n`);
if (report.length) {
  console.error("Student-copy findings:");
  for (const f of report.slice(0, 20)) console.error(`  - ${f.text} [${f.rules.join(", ")}; ${f.contexts.slice(0, 3).join(", ")}]`);
}
if (failures.length) {
  console.error(`Lesson 33 audit: ${checks - failures.length} passed, ${failures.length} FAILED`);
  for (const f of failures.slice(0, 60)) console.error(" ✕ " + f);
  process.exit(1);
}
console.log(`Lesson 33 audit: ${checks} checks passed, 0 failed · ${sections.length} blocks / ${LG.SOURCE_UNIT_COUNT_33} units · ${slides.length} slides · 25 questions / 5 levels · key ${perfect.score}/25 · ${studentScans} student-copy scans clean`);
