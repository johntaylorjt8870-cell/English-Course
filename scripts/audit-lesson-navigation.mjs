/**
 * اختبار تفاعلي (jsdom) لشريط أرقام الدروس `LessonNumberNav`:
 *   1) لا يظهر أكثر من 10 أرقام في النافذة أبدًا (في كل الحالات).
 *   2) النافذة الأولى 1–10، والأخيرة 22–31، والسهمان يتحرّكان رقمًا واحدًا.
 *   3) تعطيل السهم الأيسر في البداية والأيمن في النهاية.
 *   4) الأسهم لا تنقل الطالب إلى أي درس (لا يتغيّر الـ hash).
 *   5) النقر على رقم الدرس يحفظ التوجيه الحالي (#/lesson/N) فعليًا.
 *   6) الدرس الحالي يبقى ظاهرًا دائمًا (1، 10، 11، 17، 22، 31) ومميّزًا.
 *   7) التسلسل يُقرأ 1 2 3 … داخل الواجهة العربية RTL.
 *   8) لا فائض أفقي: فحص بنية القياس + ميزانية عرض محسوبة عند 1280/1024/768/375.
 *   9) لا أخطاء أو تحذيرات في الـ console أثناء الرسم.
 *  10) عدد الدروس يُشتق من السجل (يعمل مع عدد مختلف مثل 12 أو 7) — لا افتراض لـ 31.
 *
 * تشغيل: node scripts/audit-lesson-navigation.mjs
 */
import { createRequire } from "node:module";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = dirname(fileURLToPath(import.meta.url));

// ---------------- إعداد بيئة jsdom قبل استيراد أي شيء يلمس DOM ----------------
const { JSDOM } = await import("jsdom");
const dom = new JSDOM(`<!doctype html><html dir="rtl" lang="ar"><body></body></html>`, {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
const win = dom.window;
for (const key of [
  "window", "document", "navigator", "Element", "HTMLElement", "HTMLInputElement", "HTMLButtonElement",
  "HTMLAnchorElement", "Event", "MouseEvent", "KeyboardEvent", "Node", "getComputedStyle", "CSS",
  "MutationObserver", "HashChangeEvent", "requestAnimationFrame", "cancelAnimationFrame",
  "localStorage", "sessionStorage", "SVGElement", "Text", "Comment", "DocumentFragment",
]) {
  if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
}
if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};
if (!win.Element.prototype.scrollIntoView) win.Element.prototype.scrollIntoView = () => {};
if (!win.scrollTo) win.scrollTo = () => {};
if (!win.matchMedia) {
  win.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = false;
win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");

// ---------------- حزمة الاختبار ----------------
// داخل node_modules حتى تُحلّ حزم المشروع، ثم يُحذف بعد الاستيراد (كما في audit-bidi-mixed).
const bundleDir = join(dirname(root), "node_modules", ".lesson-nav-audit");
mkdirSync(bundleDir, { recursive: true });
const outFile = join(bundleDir, `audit-${process.pid}.mjs`);
await esbuild.build({
  absWorkingDir: dirname(root),
  stdin: {
    contents: `
import React from "react";
import { createRoot } from "react-dom/client";
import App from ${JSON.stringify(join(dirname(root), "src/App.tsx"))};
import LessonNumberNav, { LESSON_WINDOW, lessonHash } from ${JSON.stringify(join(dirname(root), "src/shared/LessonNumberNav.tsx"))};
export { React, createRoot, App, LessonNumberNav, LESSON_WINDOW, lessonHash };
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
const M = await import(pathToFileURL(outFile).href);
rmSync(outFile, { force: true });

// ---------------- حزمة الاختبار الصغيرة ----------------
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

const consoleMessages = [];
const origError = console.error;
const origWarn = console.warn;
console.error = (...a) => { consoleMessages.push({ level: "error", text: a.map(String).join(" ") }); };
console.warn = (...a) => { consoleMessages.push({ level: "warn", text: a.map(String).join(" ") }); };

const NAV_SELECTOR = 'nav[aria-label="التنقل بين أرقام الدروس"]';

function mount(node) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = M.createRoot(host);
  root.render(node);
  return { host, root };
}

/** أرقام الدروس الظاهرة في النافذة (حسب ترتيب الـ DOM). */
function visibleNumbers(nav) {
  return [...nav.querySelectorAll("li")].map((li) => li.textContent.trim());
}

function arrows(nav) {
  const [prev, next] = nav.querySelectorAll("button");
  return { prev, next };
}

async function main() {
  const LESSONS_31 = Array.from({ length: 31 }, (_, i) => ({ n: i + 1 }));

  // ============================================================
  // 1) الصفحة الرئيسية — الحالة الأولية
  // ============================================================
  win.location.hash = "#/";
  const app = mount(M.React.createElement(M.App));
  await tick(60);

  let nav = app.host.querySelector(NAV_SELECTOR);
  ok(!!nav, "hub: شريط أرقام الدروس موجود في أعلى الواجهة الرئيسية");
  ok(document.querySelectorAll(NAV_SELECTOR).length === 1, "hub: شريط أرقام واحد فقط (لا نسخة مكررة)");

  let nums = visibleNumbers(nav);
  ok(nums.length === M.LESSON_WINDOW, `hub: عدد الأرقام الظاهرة = ${M.LESSON_WINDOW} بالضبط (got ${nums.length})`);
  ok(nums.join(",") === "1,2,3,4,5,6,7,8,9,10", `hub: النافذة الأولى 1–10 (got ${nums.join(" ")})`);

  let { prev, next } = arrows(nav);
  ok(prev.disabled === true, "hub: السهم الأيسر معطّل في النافذة الأولى");
  ok(next.disabled === false, "hub: السهم الأيمن مفعّل في النافذة الأولى");
  ok(prev.getAttribute("aria-label") === "الدروس السابقة", "hub: للسهم الأيسر وسم وصول «الدروس السابقة»");
  ok(next.getAttribute("aria-label") === "الدروس التالية", "hub: للسهم الأيمن وسم وصول «الدروس التالية»");
  ok(prev.getAttribute("type") === "button" && next.getAttribute("type") === "button", "hub: السهمان زرّان حقيقيان (type=button) قابلان للتركيز");
  ok(next.tabIndex === 0 && !prev.hasAttribute("tabindex") && !next.hasAttribute("tabindex"), "hub: السهمان داخل ترتيب التنقل بلوحة المفاتيح (لا tabindex=-1)");

  const links = [...nav.querySelectorAll("a")];
  ok(links.length === 10, `hub: الأرقام العشرة روابط توجيه (got ${links.length})`);
  ok(links.every((a) => a.tabIndex === 0), "hub: كل رقم درس قابل للتركيز بلوحة المفاتيح");
  links[3].focus();
  ok(document.activeElement === links[3], "hub: التركيز ينتقل فعليًا إلى رقم الدرس (Tab/لوحة المفاتيح)");
  next.focus();
  ok(document.activeElement === next, "hub: التركيز ينتقل فعليًا إلى سهم «الدروس التالية»");
  prev.focus();
  ok(document.activeElement !== prev, "hub: السهم المعطّل لا يستقبل التركيز (لا يُفعّل من لوحة المفاتيح)");
  ok(links[0].getAttribute("href") === M.lessonHash(1) && links[9].getAttribute("href") === M.lessonHash(10), "hub: روابط الدروس تستخدم التوجيه الحالي #/lesson/N");
  ok(links.every((a) => a.getAttribute("aria-label") === `الدرس ${a.textContent.trim()}`), "hub: لكل رقم درس وسم وصول «الدرس N»");

  // الترتيب LTR داخل الواجهة العربية RTL
  const strip = nav.querySelector("ul");
  ok(nav.getAttribute("dir") === "rtl", "hub: حاوية الشريط تبقى RTL (الواجهة العربية)");
  ok(strip.getAttribute("dir") === "ltr", "hub: صف الأرقام LTR كي يُقرأ 1 2 3");
  ok(strip.classList.contains("ltr-row"), "hub: صف الأرقام يستخدم صنف المشروع ltr-row لعزل الاتجاه");

  const navCopy = nav.cloneNode(true);
  navCopy.querySelectorAll(".sr-only").forEach((el) => el.remove());
  const navText = navCopy.textContent.replace(/\s+/g, " ").trim();
  ok(!/\b(1[1-9]|2\d|3[01])\b/.test(navText), `hub: لا يظهر أي رقم فوق 10 في الشريط المرئي (نصه: ${navText})`);

  // ============================================================
  // 2) الأسهم: حركة رقم واحد + عدم الانتقال إلى درس
  // ============================================================
  const hashBefore = win.location.hash;
  next.click();
  await tick();
  nums = visibleNumbers(nav);
  ok(nums.join(",") === "2,3,4,5,6,7,8,9,10,11", `hub: نقرة يمين واحدة → 2–11 (got ${nums.join(" ")})`);
  next.click();
  await tick();
  nums = visibleNumbers(nav);
  ok(nums.join(",") === "3,4,5,6,7,8,9,10,11,12", `hub: نقرتان → 3–12 (got ${nums.join(" ")})`);
  ok(win.location.hash === hashBefore, "hub: الأسهم لا تغيّر الـ hash (لا تنقل الطالب إلى درس)");
  ok(!!app.host.querySelector(NAV_SELECTOR) && app.host.querySelectorAll("a[href^='#/lesson/']").length > 0, "hub: الأسهم تُبقي الطالب في الصفحة الرئيسية");

  prev.click();
  await tick();
  nums = visibleNumbers(nav);
  ok(nums.join(",") === "2,3,4,5,6,7,8,9,10,11", `hub: نقرة يسار واحدة ترجع خطوة (got ${nums.join(" ")})`);

  // ============================================================
  // 3) النهاية: 23–32 وتعطيل السهم الأيمن (32 درسًا — الدرس 32 أُضيف بعد الدرس 31)
  // ============================================================
  for (let i = 0; i < 40; i++) {
    next.click();
    await tick(0);
  }
  nums = visibleNumbers(nav);
  ({ prev, next } = arrows(nav));
  ok(nums.length === 10, `hub: عند النهاية يبقى العدد 10 (got ${nums.length})`);
  ok(nums.join(",") === "23,24,25,26,27,28,29,30,31,32", `hub: النافذة الأخيرة 23–32 (got ${nums.join(" ")})`);
  ok(next.disabled === true, "hub: السهم الأيمن معطّل في النافذة الأخيرة");
  ok(prev.disabled === false, "hub: السهم الأيسر مفعّل في النافذة الأخيرة");
  next.click();
  await tick();
  ok(visibleNumbers(nav).join(",") === "23,24,25,26,27,28,29,30,31,32", "hub: النقر على سهم معطّل لا يغيّر النافذة");

  // رجوع خطوة بخطوة حتى البداية
  for (let i = 0; i < 40; i++) {
    prev.click();
    await tick(0);
  }
  ({ prev, next } = arrows(nav));
  ok(visibleNumbers(nav).join(",") === "1,2,3,4,5,6,7,8,9,10", "hub: العودة بالسهم الأيسر تصل إلى 1–10");
  ok(prev.disabled === true, "hub: السهم الأيسر معطّل عند البداية مرة أخرى");

  // ============================================================
  // 4) النقر على رقم درس يحفظ التوجيه الحالي فعليًا
  // ============================================================
  [...nav.querySelectorAll("a")][4].click(); // الرقم 5
  await tick(80);
  ok(win.location.hash === "#/lesson/5", `hub: النقر على الرقم 5 يوجّه إلى الدرس 5 عبر الـ hash (got ${win.location.hash})`);
  ok(!app.host.querySelector(NAV_SELECTOR), "hub: مغادرة الصفحة الرئيسية تفتح صفحة الدرس (الراوتر كما هو)");
  ok(app.host.textContent.includes("الدرس 5"), "hub: صفحة الدرس 5 رُسمت فعليًا بعد النقر");

  // العودة للرئيسية: النافذة تضم الدرس الذي كان مفتوحًا (5 داخل 1–10)
  win.location.hash = "#/";
  await tick(80);
  nav = app.host.querySelector(NAV_SELECTOR);
  ok(!!nav, "hub: العودة للرئيسية تعيد الشريط");
  ok(visibleNumbers(nav).join(",") === "1,2,3,4,5,6,7,8,9,10", "hub: نافذة العودة تضم آخر درس فُتح (5)");
  ok(nav.querySelector('a[href="#/lesson/5"]').getAttribute("aria-current") === "true", "hub: آخر درس فُتح مميّز بـ aria-current");

  // درس بعيد: 31 → العودة للرئيسية تُظهر 22–31 وتضم 31
  win.location.hash = "#/lesson/31";
  await tick(80);
  win.location.hash = "#/";
  await tick(80);
  nav = app.host.querySelector(NAV_SELECTOR);
  ok(visibleNumbers(nav).join(",") === "22,23,24,25,26,27,28,29,30,31", "hub: بعد درس 31 تظهر النافذة 22–31 تلقائيًا");
  ok(nav.querySelector('a[href="#/lesson/31"]').getAttribute("aria-current") === "true", "hub: الدرس 31 ظاهر ومميّز");
  app.root.unmount();
  document.body.innerHTML = "";

  // ============================================================
  // 5) إزاحة النافذة تلقائيًا لكل درس حالي (1، 10، 11، 17، 22، 31)
  // ============================================================
  const cases = [
    [1, "1,2,3,4,5,6,7,8,9,10", "1–10"],
    [10, "1,2,3,4,5,6,7,8,9,10", "1–10"],
    [11, "2,3,4,5,6,7,8,9,10,11", "2–11"],
    [17, "8,9,10,11,12,13,14,15,16,17", "8–17"],
    [22, "13,14,15,16,17,18,19,20,21,22", "13–22"],
    [31, "22,23,24,25,26,27,28,29,30,31", "22–31"],
  ];
  for (const [current, expected, label] of cases) {
    const { host, root: r } = mount(M.React.createElement(M.LessonNumberNav, { items: LESSONS_31, current }));
    await tick(20);
    const n2 = host.querySelector(NAV_SELECTOR);
    const vis = visibleNumbers(n2);
    ok(vis.join(",") === expected, `current=${current}: النافذة ${label} (got ${vis.join(" ")})`);
    ok(vis.length <= M.LESSON_WINDOW, `current=${current}: العدد ≤ ${M.LESSON_WINDOW}`);
    const active = n2.querySelector('[aria-current="true"]');
    ok(active && active.textContent.trim() === String(current), `current=${current}: الدرس الحالي ظاهر ومميّز بـ aria-current`);
    ok(active && /font-black/.test(active.className), `current=${current}: تمييز غير لوني (وزن الخط أوضح) للدرس الحالي`);
    ok(host.textContent.includes("الدرس الحالي"), `current=${current}: وسم نصي يذكر الدرس الحالي`);
    r.unmount();
    document.body.innerHTML = "";
  }

  // تغيّر الدرس الحالي أثناء وجود نفس الشريط (تنقل بين الدروس)
  {
    const { host, root: r } = mount(M.React.createElement(M.LessonNumberNav, { items: LESSONS_31, current: 1 }));
    await tick(20);
    const n2 = host.querySelector(NAV_SELECTOR);
    n2.querySelectorAll("button")[1].click(); // يحرّك المستخدم النافذة يدويًا
    await tick(10);
    r.render(M.React.createElement(M.LessonNumberNav, { items: LESSONS_31, current: 22 }));
    await tick(20);
    ok(visibleNumbers(n2).join(",") === "13,14,15,16,17,18,19,20,21,22", "تغيّر الدرس الحالي يزحزح النافذة تلقائيًا لتضمّه");
    r.unmount();
    document.body.innerHTML = "";
  }

  // ============================================================
  // 6) عدد الدروس يُشتق من السجل — لا افتراض لـ 31
  // ============================================================
  {
    const items12 = Array.from({ length: 12 }, (_, i) => ({ n: i + 1, href: M.lessonHash(i + 1) }));
    const { host, root: r } = mount(M.React.createElement(M.LessonNumberNav, { items: items12 }));
    await tick(20);
    const n2 = host.querySelector(NAV_SELECTOR);
    const a2 = n2.querySelectorAll("button");
    ok(visibleNumbers(n2).join(",") === "1,2,3,4,5,6,7,8,9,10", "12 درسًا: النافذة الأولى 1–10");
    a2[1].click();
    await tick(10);
    ok(visibleNumbers(n2).join(",") === "2,3,4,5,6,7,8,9,10,11", "12 درسًا: خطوة واحدة → 2–11");
    a2[1].click();
    await tick(10);
    ok(visibleNumbers(n2).join(",") === "3,4,5,6,7,8,9,10,11,12", "12 درسًا: النافذة الأخيرة 3–12");
    ok(a2[1].disabled === true, "12 درسًا: السهم الأيمن يُعطَّل عند آخر نافذة ممكنة");
    r.unmount();
    document.body.innerHTML = "";
  }
  {
    const items7 = Array.from({ length: 7 }, (_, i) => ({ n: i + 1 }));
    const { host, root: r } = mount(M.React.createElement(M.LessonNumberNav, { items: items7, current: 6 }));
    await tick(20);
    const n2 = host.querySelector(NAV_SELECTOR);
    const [p2, nx2] = n2.querySelectorAll("button");
    ok(visibleNumbers(n2).join(",") === "1,2,3,4,5,6,7", "7 دروس فقط: تُعرض كلها (أقل من حجم النافذة)");
    ok(p2.disabled === true && nx2.disabled === true, "7 دروس: السهمان معطّلان (لا نوافذ أخرى)");
    r.unmount();
    document.body.innerHTML = "";
  }
  {
    const itemsLocked = [
      { n: 1 }, { n: 2, locked: true }, { n: 3 },
    ];
    const { host, root: r } = mount(M.React.createElement(M.LessonNumberNav, { items: itemsLocked }));
    await tick(20);
    const n2 = host.querySelector(NAV_SELECTOR);
    ok(n2.querySelectorAll("a").length === 2, "درس مقفل لا يُعرض كرابط (كما في تصميم الشريط القديم)");
    r.unmount();
    document.body.innerHTML = "";
  }

  // ============================================================
  // 7) تمييز الحالة المعطّلة بغير اللون + وسم النطاق
  // ============================================================
  {
    const { host, root: r } = mount(M.React.createElement(M.LessonNumberNav, { items: LESSONS_31 }));
    await tick(20);
    const n2 = host.querySelector(NAV_SELECTOR);
    const [p2, nx2] = n2.querySelectorAll("button");
    ok(p2.hasAttribute("disabled") && p2.getAttribute("aria-label") === "الدروس السابقة", "الحالة المعطّلة معلنة بالخاصية disabled ووسم وصول");
    ok(/opacity-60/.test(p2.className) && /cursor-not-allowed/.test(p2.className), "الحالة المعطّلة مميّزة بالعتامة والمؤشر لا باللون وحده");
    ok(/hover:bg-slate-900/.test(nx2.className), "السهم المفعّل يبقى تفاعليًا (hover/حالات التركيز)");
    ok(!!n2.querySelector("[aria-live]"), "الشريط يعلن النطاق المعروض لقارئات الشاشة");
    r.unmount();
    document.body.innerHTML = "";
  }

  // ============================================================
  // 8) فائض أفقي: ثوابت البنية + ميزانية عرض محسوبة عند 1280/1024/768/375
  // ============================================================
  {
    const { host, root: r } = mount(M.React.createElement(M.LessonNumberNav, { items: LESSONS_31, current: 17 }));
    await tick(20);
    const n2 = host.querySelector(NAV_SELECTOR);
    const bar = n2.firstElementChild;
    const [p2, nx2] = n2.querySelectorAll("button");
    ok(/w-full/.test(n2.className) && /max-w-md/.test(bar.className), "البنية: الشريط بعرض الحاوية كحد أقصى max-w-md");
    ok(!/w-max|whitespace-nowrap/.test(n2.className + bar.className), "البنية: لا عرض ثابت للنافذة ولا منع للالتفاف");
    ok(/max-w-8/.test(n2.querySelector("a").className), "البنية: خلية الرقم محدودة بـ max-w-8");
    ok([...n2.querySelectorAll("li")].every((li) => /min-w-0/.test(li.className) && /flex-1/.test(li.className)), "البنية: كل خانة رقم قابلة للتقلّص (min-w-0 flex-1)");
    ok(/h-7 w-7/.test(p2.className) && /h-7 w-7/.test(nx2.className), "البنية: السهمان صغيران بعرض ثابت (28px ثم 32px على الشاشات الأكبر)");

    // ميزانية عرض تقديرية محافظة: أقل عرض مطلوب مقابل المتاح.
    // الافتراضات: هوامش الصفحة px-5 = 20px لكل جهة، حشوة الشريط p-1.5 = 6px لكل جهة،
    // إطار 2px، عرض الرقم ثنائي الخانة ≤ 14px داخل خلية 28–32px، فجوة 2–4px.
    const MODEL = { pagePadding: 20, barPadding: 6, border: 2, chipText: 14, chipGapMobile: 2, chipGapDesktop: 4, arrowMobile: 28, arrowDesktop: 32, gapMobile: 4, gapDesktop: 6 };
    const rows = [];
    for (const viewport of [1280, 1024, 768, 375]) {
      const isDesktop = viewport >= 640;
      const content = viewport - MODEL.pagePadding * 2;
      const barContent = Math.min(content, 448) - MODEL.border - MODEL.barPadding * 2;
      const arrows = (isDesktop ? MODEL.arrowDesktop : MODEL.arrowMobile) * 2;
      const rowGaps = (isDesktop ? MODEL.gapDesktop : MODEL.gapMobile) * 2;
      const chipGap = isDesktop ? MODEL.chipGapDesktop : MODEL.chipGapMobile;
      const minChips = 10 * MODEL.chipText + 9 * chipGap;
      const needed = arrows + rowGaps + minChips;
      rows.push({ viewport, barContent, needed, fits: needed <= barContent });
    }
    ok(rows.every((r2) => r2.fits), "الميزانية: أقل عرض مطلوب ≤ المتاح عند 1280/1024/768/375 (لا فائض أفقي)");
    for (const r2 of rows) {
      console.log(`  ↳ ${r2.viewport}px: متاح ${r2.barContent}px · مطلوب ≤ ${r2.needed}px · ${r2.fits ? "لا فائض" : "فائض!"}`);
    }
    r.unmount();
    document.body.innerHTML = "";
  }

  // ============================================================
  // 9) لا أخطاء/تحذيرات في الـ console
  // ============================================================
  const realProblems = consoleMessages.filter((m) => !/Not implemented: navigation/i.test(m.text));
  ok(realProblems.length === 0, `لا أخطاء أو تحذيرات console أثناء الرسم والتفاعل (got ${realProblems.length})`);
  for (const m of realProblems.slice(0, 5)) console.log(`  ↳ ${m.level}: ${m.text.slice(0, 160)}`);

  console.error = origError;
  console.warn = origWarn;

  console.log(`\nLesson navigation audit: ${pass} passed, ${fail} failed`);
  if (fail) process.exit(1);
  process.exit(0);
}

main().catch((e) => {
  origError(e);
  process.exit(1);
});
