// ============================================================
// اختبارات دائمة لحدّ أخطاء الدرس (LessonErrorBoundary).
//
//                                   node --test scripts/lesson-error-boundary.test.mjs
//
// النطاق:
//   1) سلوك الحدّ نفسه: التقاط خطأ الابن، ظهور واجهة التعافي بدل صفحة بيضاء،
//      تسجيل التشخيص، إعادة المحاولة، تصفير الحالة عند تغيّر المسار، زر العودة.
//   2) تكامل حقيقي مع App: تركيب التطبيق كاملًا في jsdom مع استبدال حزمة
//      الدرس 2 (عند البناء فقط) بمكوّن اختبار يرمي خطأ. لا تعديل على أي درس
//      حقيقي ولا آلية حقن أخطاء في كود الإنتاج.
//
// ما لا يغطيه هذا الملف: أخطاء معالجات الأحداث، الوعود المرفوضة، والأخطاء
// خارج شجرة React — وهذه خارجة عن قدرة Error Boundary أصلًا.
// ============================================================
import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { JSDOM } from "jsdom";

import { loadAppWithCrashFixtureBundle, loadBoundaryUnitBundle } from "./lib/error-boundary-bundles.mjs";

// ---------------- jsdom environment (قبل استيراد أي شيء يلمس DOM) ----------------
const dom = new JSDOM(`<!doctype html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>`, {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

const win = dom.window;
const GLOBAL_KEYS = [
  "window", "document", "navigator", "HTMLElement", "HTMLDivElement", "HTMLButtonElement",
  "HTMLAnchorElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLCanvasElement",
  "Element", "Node", "Text", "Comment", "DocumentFragment", "SVGElement",
  "Event", "MouseEvent", "KeyboardEvent", "HashChangeEvent", "CustomEvent", "FocusEvent",
  "getComputedStyle", "localStorage", "sessionStorage", "requestAnimationFrame",
  "cancelAnimationFrame", "MutationObserver", "DOMParser", "Audio", "HTMLAudioElement",
];
for (const key of GLOBAL_KEYS) {
  if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
}

// jsdom stubs: لا تنفيذ حقيقي للتمرير/الوسائط/المراقبات.
win.HTMLElement.prototype.scrollTo = () => {};
win.HTMLElement.prototype.scrollIntoView = () => {};
win.scrollTo = () => {};
win.matchMedia = () => ({ matches: false, media: "", addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false });
win.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } };
win.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
win.speechSynthesis = win.speechSynthesis || { speak() {}, cancel() {}, getVoices: () => [] };
if (!win.speechSynthesis.getVoices) win.speechSynthesis.getVoices = () => [];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const Unit = await loadBoundaryUnitBundle();
const AppBundle = await loadAppWithCrashFixtureBundle();

const h = (type, props, ...children) => Unit.React.createElement(type, props, ...children);
const appH = (type, props, ...children) => AppBundle.React.createElement(type, props, ...children);

let rootSeq = 0;

/**
 * يركّب عنصرًا ويعيد أدوات التحكم. يعترض console.error طوال عمر التركيب
 * (بما فيه تسجيل React لتك الأخطاء) ليبقى مخرج الاختبار نظيفًا ولتُفحص السجلات.
 */
async function mount(M, element) {
  const container = document.createElement("div");
  container.dataset.testRoot = String(++rootSeq);
  document.body.appendChild(container);

  const consoleErrors = [];
  const originalError = console.error;
  console.error = (...args) => { consoleErrors.push(args); };

  const root = M.createRoot(container, {
    onCaughtError: () => {},
    onUncaughtError: () => {},
    onRecoverableError: () => {},
  });

  try {
    await M.act(async () => { root.render(element); });
  } finally {
    // لا نعيد console.error هنا: التسجيل مطلوب أثناء تفاعلات الاختبار التالية.
  }

  return {
    container,
    root,
    consoleErrors,
    async rerender(next) {
      await M.act(async () => { root.render(next); });
    },
    async unmount() {
      try {
        await M.act(async () => { root.unmount(); });
      } finally {
        console.error = originalError;
        container.remove();
      }
    },
  };
}

async function click(M, el) {
  assert.ok(el, "عنصر النقر غير موجود");
  await M.act(async () => {
    el.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
  });
}

async function flush(M, ms = 40) {
  await M.act(async () => { await new Promise((resolve) => setTimeout(resolve, ms)); });
}

const ourLogs = (consoleErrors) =>
  consoleErrors.filter(([first]) => typeof first === "string" && first.includes("[LessonErrorBoundary]"));

after(() => {
  dom.window.close();
});

// ============================================================
// 1) سلوك الحدّ نفسه
// ============================================================
describe("LessonErrorBoundary — عزل الدرس وتعافيه", () => {
  it("يلتقط خطأ الابن ويعرض واجهة التعافي بدل صفحة بيضاء، مع بقاء هيكل التطبيق", async () => {
    Unit.resetBoundaryFixtures();
    let shellClicks = 0;
    const out = await mount(
      Unit,
      h(
        "div",
        null,
        h(
          "nav",
          { "data-testid": "app-shell" },
          h("button", { type: "button", "data-testid": "shell-action", onClick: () => { shellClicks += 1; } }, "هيكل التطبيق"),
        ),
        h(
          Unit.LessonErrorBoundary,
          { lessonNumber: 2, resetKey: 2, onGoHome: () => {} },
          h(Unit.ThrowingLesson, { message: "TEST-ONLY descendant failure" }),
        ),
      ),
    );

    try {
      const fallback = out.container.querySelector("[data-lesson-error-fallback]");
      assert.ok(fallback, "يجب أن تظهر واجهة التعافي");
      assert.match(fallback.textContent, /تعذّر عرض هذا الدرس/);
      assert.ok(fallback.querySelector("[data-lesson-error-retry]"), "زر إعادة المحاولة موجود");
      assert.ok(fallback.querySelector("[data-lesson-error-home]"), "زر العودة إلى الدروس موجود");
      assert.ok(out.container.textContent.trim().length > 0, "لا صفحة بيضاء");

      const shell = out.container.querySelector('[data-testid="app-shell"]');
      assert.ok(shell, "هيكل التطبيق خارج الحدّ ما زال مركّبًا");
      await click(Unit, out.container.querySelector('[data-testid="shell-action"]'));
      assert.equal(shellClicks, 1, "تنقّل الهيكل العام ما زال يعمل بعد الانهيار");
      assert.equal(out.container.textContent.includes("TEST-ONLY descendant failure"), false, "لا تُعرض رسالة الخطأ التقنية");
    } finally {
      await out.unmount();
    }
  });

  it("يسجّل التشخيص عبر componentDidCatch ولا يظهر أي تفاصيل تقنية للطالب", async () => {
    Unit.resetBoundaryFixtures();
    const out = await mount(
      Unit,
      h(
        Unit.LessonErrorBoundary,
        { lessonNumber: 7, resetKey: 7, onGoHome: () => {} },
        h(Unit.ThrowingLesson, { message: "TEST-ONLY diagnostic secret 42" }),
      ),
    );

    try {
      const logs = ourLogs(out.consoleErrors);
      assert.ok(logs.length >= 1, "componentDidCatch يجب أن يسجّل تشخيصًا");

      const [first, payload] = logs[0];
      assert.match(first, /^\[LessonErrorBoundary\] lesson render failed/);
      assert.match(first, /lesson 7/);
      assert.match(first, /TEST-ONLY diagnostic secret 42/);
      assert.ok(payload && payload.error instanceof Error, "كائن الخطأ مرفق بالسجل");
      assert.equal(payload.error.message, "TEST-ONLY diagnostic secret 42");
      assert.equal(payload.lessonNumber, 7);
      assert.equal(typeof payload.componentStack, "string");
      assert.ok(payload.componentStack.length > 0, "componentStack مرفق للتشخيص");

      const fallbackText = out.container.querySelector("[data-lesson-error-fallback]").textContent;
      assert.equal(fallbackText.includes("secret 42"), false, "لا رسالة الخطأ في الواجهة");
      assert.equal(/componentStack|Error:|at \w/.test(fallbackText), false, "لا أثر لمكدس الاستدعاء في الواجهة");
    } finally {
      await out.unmount();
    }
  });

  it("إعادة المحاولة تصفّر الحالة وتسمح برندر ناجح", async () => {
    Unit.resetBoundaryFixtures();
    const out = await mount(
      Unit,
      h(
        Unit.LessonErrorBoundary,
        { lessonNumber: 4, resetKey: 4, onGoHome: () => {} },
        h(Unit.ControlledLesson),
      ),
    );

    try {
      assert.ok(out.container.querySelector("[data-lesson-error-fallback]"), "الفشل الأول يُحيط به الحدّ");
      // نسمح بالنجاح قبل النقر: إن لم يُصفّر الزر حالة الحدّ ستبقى الواجهة ظاهرة.
      Unit.setBoundaryFixtureRecovered();
      await click(Unit, out.container.querySelector("[data-lesson-error-retry]"));
      assert.ok(out.container.querySelector('[data-testid="recovered-lesson"]'), "الرندر نجح بعد إعادة المحاولة");
      assert.equal(out.container.querySelector("[data-lesson-error-fallback]"), null, "اختفت واجهة التعافي");
    } finally {
      await out.unmount();
    }
  });

  it("تغيّر مفتاح المسار (درس آخر) يصفّر الفشل السابق تلقائيًا", async () => {
    Unit.resetBoundaryFixtures();
    const render = (resetKey, lesson) =>
      h(
        Unit.LessonErrorBoundary,
        { lessonNumber: resetKey, resetKey, onGoHome: () => {} },
        lesson,
      );

    const out = await mount(Unit, render(2, h(Unit.ThrowingLesson, { message: "TEST-ONLY route 2 failure" })));

    try {
      assert.ok(out.container.querySelector("[data-lesson-error-fallback]"), "الدرس 2 انهار");
      await out.rerender(render(3, h(Unit.StableLesson, { label: "الدرس 3 سليم" })));
      assert.equal(out.container.querySelector("[data-lesson-error-fallback]"), null, "تغيّر المسار أزال واجهة التعافي");
      assert.equal(out.container.querySelector('[data-testid="stable-lesson"]').textContent, "الدرس 3 سليم");
    } finally {
      await out.unmount();
    }
  });

  it("زر العودة يستدعي آلية التنقل الحالية (onGoHome)", async () => {
    Unit.resetBoundaryFixtures();
    const visited = [];
    win.location.hash = "#/lesson/2";

    const out = await mount(
      Unit,
      h(
        Unit.LessonErrorBoundary,
        {
          lessonNumber: 2,
          resetKey: 2,
          onGoHome: () => {
            visited.push("home");
            win.location.hash = "/";
          },
        },
        h(Unit.ThrowingLesson),
      ),
    );

    try {
      await click(Unit, out.container.querySelector("[data-lesson-error-home]"));
      assert.deepEqual(visited, ["home"], "العودة إلى الفهرس تستدعي نفس دالة التنقل");
      assert.equal(win.location.hash, "#/", "العنوان يعود إلى مسار الفهرس");
    } finally {
      await out.unmount();
    }
  });
});

// ============================================================
// 2) التكامل الحقيقي: App كامل + استبدال اختبار لحزمة الدرس 2
// ============================================================
describe("App Integration — درس واحد ينهار ولا يسقط الموقع", () => {
  before(() => {
    win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  });

  async function mountAppAt(hash) {
    AppBundle.resetLessonCrashFixture();
    win.location.hash = hash;
    const out = await mount(AppBundle, appH(AppBundle.App, null));
    await flush(AppBundle);
    return out;
  }

  async function goTo(M, hash) {
    await M.act(async () => {
      win.location.hash = hash;
      win.dispatchEvent(new win.HashChangeEvent("hashchange"));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await flush(M);
  }

  it("يدرس المسار كاملًا: درس سليم ← انهيار معزول ← مسار آخر ← إعادة محاولة ← العودة للفهرس ← درس آخر", async () => {
    const out = await mountAppAt("#/lesson/1");

    try {
      // 1) درس عادي يعمل
      assert.ok(out.container.querySelector("#l1-main"), "الدرس 1 الحقيقي يُرندر");
      assert.equal(out.container.querySelector("[data-lesson-error-fallback]"), null);
      assert.ok(out.container.querySelector("[data-site-lock-button]"), "بوابة الموقع/شارة القفل داخل الهيكل العام");

      // 2) الانتقال إلى الدرس المعطّل (بديل اختبار): تظهر واجهة التعافي
      AppBundle.resetLessonCrashFixture();
      await goTo(AppBundle, "/lesson/2");
      const fallback = out.container.querySelector("[data-lesson-error-fallback]");
      assert.ok(fallback, "واجهة التعافي ظهرت للدرس المنهار");
      assert.equal(out.container.querySelector("#l2-main"), null, "محتوى الدرس المنهار غير مركّب");
      assert.ok(out.container.textContent.trim().length > 0, "لا صفحة بيضاء");
      assert.ok(out.container.querySelector("[data-site-lock-button]"), "شارة القفل العامة بقيت");
      assert.ok(ourLogs(out.consoleErrors).length >= 1, "التشخيص سُجّل عبر componentDidCatch");

      // 3) تغيير المسار إلى درس آخر يصفّر الفشل السابق (بدون إعادة محاولة)
      await goTo(AppBundle, "/lesson/3");
      assert.ok(out.container.querySelector("#l3-main"), "الدرس 3 الحقيقي يُرندر بعد الفشل");
      assert.equal(out.container.querySelector("[data-lesson-error-fallback]"), null, "الفشل السابق لا يلتصق بالمسار الجديد");

      // 4) العودة للدرس المعطّل ثم إعادة المحاولة
      AppBundle.resetLessonCrashFixture();
      await goTo(AppBundle, "/lesson/2");
      assert.ok(out.container.querySelector("[data-lesson-error-fallback]"), "انهيار جديد بعد إعادة التصفير");
      AppBundle.setLessonCrashFixtureRecovered();
      await click(AppBundle, out.container.querySelector("[data-lesson-error-retry]"));
      assert.ok(out.container.querySelector('[data-test-lesson-fixture="recovered"]'), "الرندرنجح بعد إعادة المحاولة");
      assert.equal(out.container.querySelector("[data-lesson-error-fallback]"), null);

      // 5) انهيار جديد ← زر العودة إلى الفهرس عبر آلية hash الحقيقية
      await goTo(AppBundle, "/lesson/1");
      AppBundle.resetLessonCrashFixture();
      await goTo(AppBundle, "/lesson/2");
      await click(AppBundle, out.container.querySelector("[data-lesson-error-home]"));
      await flush(AppBundle);
      assert.equal(win.location.hash, "#/", "العنوان عاد إلى مسار الفهرس");
      assert.ok(out.container.textContent.includes("دروس اللغة الإنجليزية"), "الفهرس الحقيقي يُرندر");
      assert.equal(out.container.querySelector("[data-lesson-error-fallback]"), null);
      // بطاقات الفهرس فقط (شريط أرقام الدروس يضيف روابط أخرى لمسار الدروس).
      const cards = out.container.querySelectorAll('a.group[href^="#/lesson/"]');
      assert.equal(cards.length, 62, "كل بطاقات الدروس موجودة في الفهرس");
      assert.ok(out.container.querySelector("[data-site-lock-button]"), "الهيكل العام سليم بعد العودة");

      // 6) فتح درس آخر من الفهرس بنجاح
      await goTo(AppBundle, "/lesson/3");
      assert.ok(out.container.querySelector("#l3-main"), "درس آخر يُفتح بنجاح بعد التعافي");
      assert.equal(out.container.querySelector("[data-lesson-error-fallback]"), null);

      // 7) كل سجلات الحدّ تحمل البادئة التشخيصية ولا تُظهر تفاصيل في الواجهة
      const logs = ourLogs(out.consoleErrors);
      assert.ok(logs.length >= 2, "سُجّل كل انهيار مقصود");
      assert.equal(out.container.textContent.includes("TEST-ONLY injected"), false);
    } finally {
      await out.unmount();
    }
  });
});
