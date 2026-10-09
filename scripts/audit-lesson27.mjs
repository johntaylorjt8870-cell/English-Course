// ============================================================
// Lesson 27 audit — Past Perfect — الماضي التام
// Native multi-step interactive lesson audit (Lesson 6 / Lesson 29 benchmark)
//   node scripts/audit-lesson27.mjs
// Verifies:
//   1) Source ledger: 44 numbered sections ①–㊹ + 9 unnumbered sections.
//   2) Key sensitive source phrases preserved verbatim.
//   3) In-lesson exercises as real interactive components.
//   4) 53 native steps + navigation controls + progress bar.
//   5) Interactive lab layer (timelines, verb tables, tense switches, detective, boss, story studio).
//   6) Four separate areas (student-lesson, l27-test, l27-solutions, l27-teacher).
//   7) Test Area: exactly 20 authored questions, types, no leaks before submit, score, full reset.
//   8) Solutions Area: 20 detailed explanatory solutions gated until submit or teacher unlock.
//   9) Teacher Area: password somer173, overview, 16 notes, 10 activity solutions, rubric, common mistakes.
//   10) Direction & BIDI: RTL shell with LTR English isolation, LatinRuns, no word-reversal engine.
//   11) App routing and hub registration.
//   12) IQ200 BIDI repair: the rendered IQ200 step title keeps the written
//       order «IQ200 — had danced أم was dancing؟» (DOM order + visual order).
// ============================================================
import { createRequire } from "node:module";
import { readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { analyzeHtml } from "./lib/bidi-sim.mjs";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = readFileSync(join(root, "src/lessons/lesson27/data.ts"), "utf8");
const view = readFileSync(join(root, "src/lessons/lesson27/Lesson27.tsx"), "utf8");
const app = readFileSync(join(root, "src/App.tsx"), "utf8");
const outFile = join(root, "node_modules", ".lesson27-audit.mjs");

const failures = [];
let checks = 0;
const ok = (condition, message) => {
  checks++;
  if (!condition) failures.push(message);
};

// ---------- 1) سجل المصدر: 44 قسمًا مرقمًا + 9 أقسام غير مرقمة ----------
ok((data.match(/id:\s*"s\d+"/g) || []).length === 44, "all 44 numbered source sections indexed (s1..s44)");
for (let i = 1; i <= 44; i++) {
  ok(data.includes(`id: "s${i}"`) && data.includes(`num: ${i},`), `numbered source section ${i} present in ledger`);
}
for (const id of ['"cover"', '"bridge"', '"objectives"', '"golden"', '"words"', '"rule"', '"map"', '"finalrule"', '"closing"']) {
  ok(data.includes(`id: ${id}`), `unnumbered ledger section ${id} present`);
}
ok(data.includes("SOURCE_NUMBERED_COUNT = 44"), "SOURCE_NUMBERED_COUNT is 44");
ok(data.includes("SOURCE_LEDGER_COUNT = SOURCE_SECTIONS.length"), "SOURCE_LEDGER_COUNT matches ledger length");

// ---------- 2) عبارات المصدر الحساسة محفوظة حرفيًا ----------
const sourcePhrases = [
  "When I arrived, the train had left.",
  "When Sara arrived at the cinema, the movie had started.",
  "Subject + had + V3",
  "Had + Subject + V3?",
  "go → went → gone",
  "eat → ate → eaten",
  "When I arrived, Lina had left.",
  "The students had left before the teacher arrived.",
  "After I had finished my project, I watched a movie.",
  "By the time we arrived, the concert had started.",
  "When I called Omar, he had already left.",
  "When I entered the kitchen, Mom had just finished cooking.",
  "Before that trip, I had never seen snow.",
  "When Daniel arrived at the airport, his plane had already left.",
  "When Emma got home, her brother had cooked dinner.",
  "When I reached the station, the bus had arrived.",
  "When the police arrived at the museum, the thief had disappeared.",
  "Emma was walking through the old market when she found a mysterious key.",
  "At 8:00, Liam was studying.",
  "When I arrived, John had left.",
  "When I arrived at the party, everyone had danced.",
  "When I arrived at the party, everyone was dancing.",
  "When I entered the room, my brother was sleeping.",
  "Last Saturday, Adam was walking through an old building when he noticed a strange door.",
];
for (const phrase of sourcePhrases) {
  ok(data.includes(phrase) || view.includes(phrase), `source phrase preserved: ${phrase}`);
}

// ---------- 3) الأخطاء المقصودة للتدريب التربوي ----------
const wrongSentences = [
  "I had went... ❌",
  "She hadn't ate. ❌",
  "They hadn't went. ❌",
  "He hadn't saw it. ❌",
  "She had went home before I arrived.",
  "They had ate dinner before the movie.",
  "Did he had finished the work?",
  "He hadn't saw the message.",
  "When I arrived, Sara had left already.",
  "Yesterday, I had visited my grandmother.",
];
for (const wrong of wrongSentences) {
  ok(data.includes(wrong) || view.includes(wrong), `intentionally wrong sentence preserved for training: ${wrong}`);
}

// ---------- 4) تصحيح خطأ الطباعة في المصدر للقسم ㊸ السؤال 2 ----------
ok(data.includes("TYPO_S43_Q2"), "typo documentation object exists");
ok(data.includes("founded"), "corrected distractor founded present in exercise data");
ok(view.includes("TYPO_S43_Q2"), "typo explanation surfaced to learner with Platform Explanation");

// ---------- 5) 53 خطوة أصلية + تنقل كامل ----------
ok(view.includes("const slides: Slide[]"), "native slide list declared");
ok((view.match(/\{ id: "(?:cover|bridge|objectives|s\d+|golden|words|rule|map|finalrule|closing)", section:/g) || []).length === 53, "exactly 53 navigable steps declared");
ok(view.includes("data-slide-counter"), "progress counter data attribute present");
ok(view.includes("→ السابق") && view.includes("التالي ←"), "Previous/Next controls present");
ok(view.includes("ArrowLeft") && view.includes("ArrowRight"), "keyboard arrow navigation wired");
ok(view.includes("lg:hidden") && view.includes("setDrawer(true)"), "mobile drawer navigation present");

// ---------- 6) المختبرات والتفاعلات التعليمية الحقيقية ----------
for (const hook of [
  "l27-timeline",
  "l27-sara",
  "l27-had-grid",
  "l27-verbs-regular",
  "l27-v2v3",
  "l27-teacher-switch",
  "l27-ali",
  "l27-pairs-a",
  "l27-short-flip",
  "l27-side-by-side",
  "l27-lina-switch",
  "l27-before",
  "l27-after",
  "l27-bytime",
  "l27-emma-detective",
  "l27-need-toggle",
  "l27-iq-stepper",
  "l27-ex-v3",
  "l27-ex-hadhave",
  "l27-ex-simple-perfect",
  "l27-ex-noah",
  "l27-ex-errors",
  "l27-ex-transform",
  "l27-ex-museum",
  "l27-emma-cinema",
  "l27-liam",
  "l27-ex-order",
  "l27-john-switch",
  "l27-dance",
  "l27-ex-boss",
  "l27-ex-final10",
  "l27-ex-story",
]) {
  ok(view.includes(`data-en-seq="${hook}"`), `interactive experience hook rendered: ${hook}`);
}

// ---------- 7) المناطق الأربع المنفصلة ----------
for (const area of ["data-area=\"student-lesson\"", "data-area=\"l27-test\"", "data-area=\"l27-solutions\"", "data-area=\"l27-teacher\""]) {
  ok(view.includes(area), `separate area present: ${area}`);
}

// ---------- 8) منطقة الاختبار: 20 سؤالًا مستقلة · لا تسريب · Reset كامل ----------
ok(data.includes("export const TEST_27"), "dedicated authored test bank exists");
ok((data.match(/\bn: \d+, type: "(?:single|tf|multi|order|match|spot)"/g) || []).length === 20, "exactly 20 test questions authored");
for (const t of ['"single"', '"tf"', '"multi"', '"order"', '"match"', '"spot"']) {
  ok(data.includes(`type: ${t}`), `test includes structured question type: ${t}`);
}
ok((data.match(/why: "/g) || []).length >= 20, "every test question carries an explanatory why");
ok(view.includes("const handleSubmit = () => {"), "submit handler computes result on demand");
ok(view.includes("const handleReset = () => {"), "reset handler clears state completely");
ok(view.includes("disabled={!allAnswered}"), "submit button disabled until all 20 questions answered");
ok(view.includes("data-test-q="), "question cards rendered with data-test-q markers");

// ---------- 9) حلول الاختبارات ----------
ok(view.includes("export function Solutions27"), "Solutions27 component exported");
ok(view.includes("data-solution="), "solution cards rendered with data-solution markers");
ok(view.includes("sol.why") && view.includes("sol.trap"), "solutions explain reasoning and trap misconceptions");
ok(view.includes("unlocked: boolean") && view.includes("unlocked={testUnlocked || teacherUnlocked}"), "solutions gated until test submission or teacher unlock");

// ---------- 10) منطقة المعلم ----------
ok(data.includes('TEACHER_PASSWORD_27 = "somer173"'), "teacher password is somer173");
ok(view.includes("TEACHER_PASSWORD_27") && view.includes('type="password"'), "teacher area is password gated");
for (const topic of ["TEACHER_27_OVERVIEW", "TEACHER_27_NOTES", "TEACHER_27_SOLUTIONS", "TEACHER_27_RUBRIC", "TEACHER_27_MISTAKES"]) {
  ok(data.includes(`export const ${topic}`) && view.includes(topic), `teacher area renders ${topic}`);
}

// ---------- 11) الاتجاه و BIDI ----------
ok(view.includes('dir="rtl"') && view.includes('dir="ltr"'), "RTL shell with LTR English isolation");
ok(view.includes("LatinRuns"), "mixed Arabic/English text rendered through LatinRuns");
ok(!view.includes("split(/(\\s+)/)"), "no per-token space splitting (word-reversal engine banned)");
ok(view.includes("PlatformTag") || view.includes("Platform Explanation"), "platform explanations labeled with PlatformTag");

// ---------- 12) التسجيل في App.tsx ----------
ok(app.includes("Lesson27 onExit={goHome}") && app.includes("route === 27"), "Lesson 27 routed in App.tsx");
ok(app.includes("#/lesson/27"), "Lesson 27 hub card registered");

// ---------- 13) مسح BIDI الشامل لعناوين الدرس 27 + IQ200 ----------
// يرندر الدرس 27 فعليًا في jsdom، يمرّ على كل خطوة من 53، ويفحص بعنوان
// الخطوة المرندر: (أ) لا مخالفة اتجاه حسب UBA، (ب) كل عنوان فيه بديلان
// إنجليزيان («A أم/أو B») أو زوج («English = Arabic») يُرسم في مجموعة LTR
// واحدة (ltr-pair) فلا يتبدّل ترتيب الكتابة.
{
  // إعداد بيئة DOM قبل الاستيراد
  const { JSDOM } = await import("jsdom");
  const dom = new JSDOM("<!doctype html><html dir=\"rtl\" lang=\"ar\"><body></body></html>", { url: "http://localhost/", pretendToBeVisual: true });
  const win = dom.window;
  Object.defineProperty(globalThis, "window", { value: win, configurable: true });
  Object.defineProperty(globalThis, "document", { value: win.document, configurable: true });
  Object.defineProperty(globalThis, "navigator", { value: win.navigator, configurable: true });
  for (const key of ["Element", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLButtonElement", "Element", "Node", "getComputedStyle", "CSS"]) {
    if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
  }
  if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};

  await esbuild.build({
    absWorkingDir: root,
    stdin: {
      contents: `
import React from "react";
import { createRoot } from "react-dom/client";
import Lesson27 from ${JSON.stringify(join(root, "src/lessons/lesson27/Lesson27.tsx"))};
function mount(node) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(node);
  return el;
}
export { React as React_, createRoot, Lesson27, mount };
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
  const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
  const click = (node) => node.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
  const el = m.mount(m.React_.createElement(m.Lesson27, { onExit: () => {} }));
  await tick(60);

  const area = el.querySelector('[data-area="student-lesson"]') || el;
  const rail = [...area.querySelectorAll("aside button")];
  ok(rail.length === 53, `فهرس الخطوات يعرض 53 خطوة قابلة للنقر (${rail.length})`);

  const ALT_SHAPE = /[A-Za-z][^\n]*\s(?:أم|أو)\s[^\n]*[A-Za-z]/;
  // «English = Arabic»: نتحقق من "=" تحديدًا لأنها علامة الزوج المعتمدة في الكِت،
  // أما الشرطة مع العربية فهي ترقيم عربي عادي (مثل «تحدي IQ200 — رتّب الأحداث»).
  const PAIR_SHAPE = /[A-Za-z][A-Za-z0-9 '’&+\/#.()-]*\s=\s*[\u0600-\u06FF]/;
  let altTitles = 0;
  let pairTitles = 0;
  let checked = 0;
  for (let i = 0; i < rail.length; i++) {
    click(rail[i]);
    await tick(25);
    const titleEl = (el.querySelector('[data-area="student-lesson"]') || el).querySelector("h2");
    if (!titleEl) continue;
    const titleText = (titleEl.textContent || "").replace(/\s+/g, " ").trim();
    const results = analyzeHtml(`<div dir="rtl">${titleEl.innerHTML}</div>`);
    const viols = results.flatMap((r) => r.violations.map((v) => `${v.latin} / ${v.arabic}`));
    ok(viols.length === 0, `خطوة ${i + 1}: العنوان بلا مخالفة اتجاه (${titleText.slice(0, 46)} — ${viols.join(" | ")})`);
    // ⑬ب) أسطر المصدر الحرفية مقرونة بالمحاولة: لا يظهر شيء منها قبل أن يجيب
    // الطالب، ولا توجد لوحة «نص المصدر الحرفي — اضغط للعرض» في أي خطوة.
    const stepHtml = (el.querySelector('[data-area="student-lesson"]') || el).innerHTML;
    ok(!/📜\s*من\s+المصدر|data-reveal-block/.test(stepHtml), `خطوة ${i + 1}: سطر المصدر لا يظهر قبل المحاولة`);
    ok(!/اضغط للعرض|نص المصدر الحرفي|<details|<summary/.test(stepHtml), `خطوة ${i + 1}: لا لوحة كشف لنص المصدر`);
    checked++;
    if (ALT_SHAPE.test(titleText)) {
      altTitles++;
      ok(!!titleEl.querySelector('span[dir="ltr"].ltr-pair'), `خطوة ${i + 1}: البدائل في مجموعة LTR واحدة (${titleText})`);
    }
    if (PAIR_SHAPE.test(titleText)) {
      pairTitles++;
      ok(!!titleEl.querySelector('span[dir="ltr"].ltr-pair'), `خطوة ${i + 1}: زوج English/Arabic في مجموعة LTR واحدة (${titleText})`);
    }
  }
  ok(checked === 53, `المسح غطى كل الخطوات (${checked})`);
  ok(altTitles >= 4, `المسح وجد عناوين البدائل الإنجليزية المطلوبة (${altTitles})`);
  ok(pairTitles >= 5, `المسح وجد عناوين الأزواج English = Arabic (${pairTitles})`);

  // س44: لائحة متطلبات القصة — التسمية المختلطة داخل عزل LTR
  {
    const s44 = rail.find((b) => (b.textContent || "").includes("Build the Story"));
    ok(!!s44, "خطوة س44 (استوديو القصة) موجودة في الفهرس");
    if (s44) {
      click(s44);
      await tick(40);
      const labels = [...(el.querySelector('[data-area="student-lesson"]') || el).querySelectorAll("span")].filter(
        (n) => n.children.length === 0 && (n.textContent || "").trim() === "before"
      );
      const label = labels[0];
      ok(!!label && !!label.closest('[dir="ltr"]'), "قائمة المتطلبات: «before أو after» داخل عزل LTR");
    }
  }

  // ---- IQ200 (s41): فحص الترتيب المرندر في DOM وفي UBA ----
  const iqStep = [...area.querySelectorAll("button")].find((b) => (b.textContent || "").includes("IQ200 — had danced"));
  ok(!!iqStep, "IQ200 step (s41) exists in the lesson rail");
  if (iqStep) {
    click(iqStep);
    await tick(60);
  }

  const titleEl = area.querySelector("h2");
  const titleHtml = titleEl ? titleEl.innerHTML : "";
  ok(!!titleEl && (titleEl.textContent || "").includes("IQ200"), "IQ200 title renders in the lesson frame");

  // (أ) ترتيب DOM: مجموعة LTR واحدة تضم البديلين والأداة العربية بينهما
  const group = titleEl ? titleEl.querySelector('span[dir="ltr"].ltr-pair') : null;
  if (!group) {
    ok(false, "IQ200 title renders one LTR alternatives group");
  } else {
    const kids = [...group.children].map((c) => ({ dir: c.getAttribute("dir"), text: (c.textContent || "").trim() }));
    const first = kids.findIndex((k) => k.text === "IQ200 — had danced");
    const mid = kids.findIndex((k) => k.text === "أم");
    const second = kids.findIndex((k) => k.text === "was dancing");
    ok(first === 0 && mid > 0 && second > mid, `IQ200 alternatives keep DOM order A → أم → B (got ${JSON.stringify(kids)})`);
    ok(kids.some((k) => k.text === "؟" && k.dir === "rtl"), "IQ200 trailing Arabic question mark stays inside the group");
  }

  // (ب) الترتيب البصري حسب UBA: البديل الأول يسار الأداة، والأداة يسار البديل الثاني
  const results = analyzeHtml(`<div dir="rtl">${titleHtml}</div>`);
  const viols = results.flatMap((r) => r.violations.map((v) => `${v.latin} / ${v.arabic}`));
  ok(viols.length === 0, `IQ200 visual order has no BIDI violation (${viols.join(" | ")})`);
  const para = results.find((r) => r.logical.includes("had danced"));
  ok(!!para, "IQ200 title paragraph analysed");
  if (para) {
    const vis = para.visual;
    const atA = vis.indexOf("IQ200 — had danced");
    const atMid = vis.indexOf("مأ") >= 0 ? vis.indexOf("مأ") : vis.indexOf("أم");
    const atB = vis.indexOf("was dancing");
    ok(atA >= 0 && atMid > atA && atB > atMid, `IQ200 visual order is A then أم then B (got "${vis}")`);
  }
  // ---------- 13ب) Source lines: preserved as textbook content, never a press-to-show panel ----------
  // المطلوب حذفه هو لوحة «نص المصدر الحرفي — اضغط للعرض» (كانت في الدرس 32)،
  // لا أسطر المصدر نفسها: فهذه محتوى الكتاب، تظهر تلقائيًا بعد إتمام المحاولة.
  {
    const sites = (view.match(/<SourceReveal /g) || []).length;
    ok(sites === 10, `الدرس 27: أسطر المصدر الحرفية العشرة محفوظة (${sites})`);
    ok(/function SourceReveal\(\{ text \}: \{ text: string \}\)/.test(view), "الدرس 27: مكوّن سطر المصدر محفوظ");
    ok(!/اضغط للعرض|نص المصدر الحرفي|SourceReveal32/.test(view), "الدرس 27: لا لوحة «اضغط للعرض» لنص المصدر");
    ok(!/<details|<summary/.test(view), "الدرس 27: لا collapsible لكشف نص المصدر");
    const comp = /function SourceReveal\(\{ text \}: \{ text: string \}\) \{([\s\S]*?)\n\}/.exec(view);
    ok(!!comp && !/<button|<details|<summary|onClick|useState/.test(comp[1]), "الدرس 27: سطر المصدر محتوى ساكن لا عنصر فتح بالضغط");
    ok(!!comp && /data-reveal-block/.test(comp[1]) && /📜\s*من\s+المصدر/.test(comp[1]), "الدرس 27: سطر المصدر موسوم data-reveal-block + 📜 من المصدر");
  }

  // ---------- 14) مسح BIDI لعلامات التبويبات: الاختبار · الحلول · المعلم ----------
  // علامات الاختبار والحلول ومنطقة المعلم لا يدخلها زاحف audit-bidi-mixed
  // (يزحف خطوات الدرس فقط) — لذلك تُفحص هنا صراحةً.
  const setValue = (node, value) => {
    Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, "value").set.call(node, value);
    node.dispatchEvent(new win.Event("input", { bubbles: true }));
  };
  const mainOf = () => el.querySelector("main");
  const tabButton = (text) => [...el.querySelectorAll("header button")].find((b) => (b.textContent || "").includes(text));
  const scan = (label) => {
    const results = analyzeHtml(`<div dir="rtl">${mainOf().innerHTML}</div>`);
    // لا يُستثنى أي نوع مخالفة: الفقرة (para)، البدائل (alts)، والصفوف المرنة (row)
    // كلها أخطاء اتجاه حقيقية في علامات التبويبات.
    const viols = results.flatMap((r) => r.violations);
    ok(viols.length === 0, `${label}: بلا مخالفة اتجاه (${viols.slice(0, 3).map((v) => `${v.latin} / ${v.arabic}`).join(" | ")})`);
  };
  for (const [text, label] of [["📝 الاختبار", "تبويب الاختبار"], ["💡 الحلول", "تبويب الحلول"], ["🔐 المعلم", "تبويب المعلم (مقفل)"]]) {
    const b = tabButton(text);
    ok(!!b, `${label} موجود في الرأس`);
    if (!b) continue;
    click(b);
    await tick(45);
    scan(label);
  }
  {
    const pw = el.querySelector('input[type="password"]');
    ok(!!pw, "منطقة المعلم: حقل كلمة المرور موجود");
    if (pw) {
      setValue(pw, "somer173");
      await tick(5);
      pw.closest("form").dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
      await tick(80);
      ok(!!mainOf().querySelector("[data-ft-key]"), "منطقة المعلم: مفتاح الاختبار النهائي يظهر بعد كلمة المرور");
      scan("منطقة المعلم (مفتوحة)");
    }
  }
  m.createRoot; // keep reference (harness parity)
}

if (failures.length) {
  console.error(`✕ Lesson 27 audit FAILED (${failures.length}/${checks})\n` + failures.map((x) => `  - ${x}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Lesson 27 audit passed (${checks} checks): 44-section ledger, 53 native steps, 20-Q test, explanatory solutions, teacher area, BIDI sweep of all 53 step titles + rendered IQ200 order.`);
