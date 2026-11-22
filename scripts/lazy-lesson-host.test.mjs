// ============================================================
// اختبارات دائمة لمضيف الدرس الكسول (LazyLessonHost + Fix #4).
//
//                                   node --test scripts/lazy-lesson-host.test.mjs
//
// التغطية:
//   1) واجهة التحميل (Suspense + LessonLoadingFallback) تظهر أثناء جلب
//      الـ chunk، ثم يحل محلها المحتوى بعد نجاح import().
//   2) فشل import() — chunk متعذر — يُعرض بواجهة التعافي داخل
//      LessonErrorBoundary، لا بصفحة بيضاء، ولا تتسرب رسالة تقنية.
//   3) «إعادة المحاولة» بعد الفشل تعيد import() فعليًا (عدّاد المحاولات)
//      وتتعافى إلى المحتوى دون إعادة تحميل الصفحة.
//   4) التنقل بين الدروس يستبدل المحتوى ويصفّر حالة الحدّ.
//   5) درس بلا محمّل يعيد لا شيء دون انهيار.
//   6) سجل LESSON_LOADERS الإنتاجي: يضم الدروس 1–62، وكل محمّل يعيد
//      وعدًا يحل إلى وحدة لها default export دالة/مكوّن (يلتقط أخطاء
//      المسارات ونسيان default export دون تشغيل متصفح).
// ============================================================
import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { JSDOM } from "jsdom";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import esbuild from "esbuild";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "node_modules", ".lazy-loading-tests");

const ASSET_LOADERS = {
  ".css": "empty",
  ".woff": "empty",
  ".woff2": "empty",
  ".png": "empty",
  ".jpg": "empty",
  ".jpeg": "empty",
  ".svg": "empty",
};

async function buildBundle() {
  mkdirSync(OUT_DIR, { recursive: true });
  const outFile = join(OUT_DIR, `lazy-host-${process.pid}.mjs`);
  const host = join(ROOT, "src/shared/LazyLessonHost.tsx");
  const loaders = join(ROOT, "src/lessons/loaders.ts");
  await esbuild.build({
    absWorkingDir: ROOT,
    stdin: {
      contents: `
import React from "react";
export { React };
export { createRoot } from "react-dom/client";
export { act } from "react";
export { default as LazyLessonHost } from ${JSON.stringify(host)};
export { LESSON_LOADERS, LESSON_NUMBERS } from ${JSON.stringify(loaders)};
`,
      resolveDir: ROOT,
      loader: "tsx",
      sourcefile: "lazy-host-bundle.tsx",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: outFile,
    jsx: "automatic",
    packages: "external",
    loader: ASSET_LOADERS,
    logLevel: "error",
    // نُبقي import() ديناميكية حقيقية حيث أمكن لفحص المحمّلات، لكن الحزمة
    // واحدة الملفات، لذا تُضمَّن الوحدات وتُستدعى بشكل غير متزامن كما في الإنتاج.
    splitting: false,
  });
  try {
    return await import(pathToFileURL(outFile).href);
  } finally {
    rmSync(outFile, { force: true });
  }
}

// ---------------- jsdom environment ----------------
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
win.HTMLElement.prototype.scrollTo = () => {};
win.HTMLElement.prototype.scrollIntoView = () => {};
win.scrollTo = () => {};
win.matchMedia = () => ({ matches: false, media: "", addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false });
win.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } };
win.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
win.speechSynthesis = win.speechSynthesis || { speak() {}, cancel() {}, getVoices: () => [] };
if (!win.speechSynthesis.getVoices) win.speechSynthesis.getVoices = () => [];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const M = await buildBundle();
const h = (type, props, ...children) => M.React.createElement(type, props, ...children);

let rootSeq = 0;

async function mount(element) {
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

  await M.act(async () => { root.render(element); });

  return {
    container,
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

async function click(el) {
  assert.ok(el, "عنصر النقر غير موجود");
  await M.act(async () => {
    el.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
  });
}

async function flush(ms = 40) {
  await M.act(async () => { await new Promise((resolve) => setTimeout(resolve, ms)); });
}

const FakeLesson = ({ marker, onExit }) =>
  h("section", { "data-testid": `fake-lesson-${marker}` }, `درس اختباري ${marker}`, h("button", { type: "button", onClick: onExit }, "خروج"));

after(() => {
  dom.window.close();
});

// ============================================================
describe("LazyLessonHost — التحميل الكسول للدروس", () => {
  it("يعرض واجهة التحميل أثناء الجلب ثم المحتوى بعد النجاح", async () => {
    let resolveLoader;
    const loaders = { 7: () => new Promise((resolve) => { resolveLoader = resolve; }) };
    const out = await mount(h(M.LazyLessonHost, { route: 7, onExit: () => {}, loaders }));

    try {
      assert.ok(out.container.querySelector("[data-lesson-loading]"), "واجهة التحميل ظاهرة أثناء الجلب");
      assert.equal(out.container.querySelector('[data-testid="fake-lesson-7"]'), null, "لا محتوى قبل اكتمال الجلب");
      assert.equal(out.container.querySelector('[role="status"]')?.getAttribute("aria-busy"), "true");

      await M.act(async () => {
        resolveLoader({ default: (props) => h(FakeLesson, { ...props, marker: "7" }) });
      });

      assert.ok(out.container.querySelector('[data-testid="fake-lesson-7"]'), "المحتوى يظهر بعد اكتمال import()");
      assert.equal(out.container.querySelector("[data-lesson-loading]"), null, "واجهة التحميل تختفي بعد النجاح");
    } finally {
      await out.unmount();
    }
  });

  it("فشل import() يُعرض بواجهة التعافي داخل حدّ الأخطاء — لا صفحة بيضاء", async () => {
    const loaders = { 9: () => Promise.reject(new Error("TEST-ONLY chunk load failure")) };
    const out = await mount(
      h(
        "div",
        null,
        h("nav", { "data-testid": "app-shell" }, "هيكل التطبيق"),
        h(M.LazyLessonHost, { route: 9, onExit: () => {}, loaders }),
      ),
    );

    try {
      await flush(60);
      const fallback = out.container.querySelector("[data-lesson-error-fallback]");
      assert.ok(fallback, "واجهة التعافي ظاهرة بعد فشل تحميل الـ chunk");
      assert.match(fallback.textContent, /تعذّر عرض هذا الدرس/);
      assert.ok(out.container.querySelector('[data-testid="app-shell"]'), "هيكل التطبيق خارج الحدّ سليم");
      assert.ok(out.container.textContent.trim().length > 0, "لا صفحة بيضاء");
      assert.equal(out.container.textContent.includes("TEST-ONLY chunk load failure"), false, "لا تتسرب رسالة تقنية");
      assert.equal(out.container.querySelector("[data-lesson-loading]"), null, "واجهة التحميل لا تبقى عالقة بعد الفشل");
    } finally {
      await out.unmount();
    }
  });

  it("«إعادة المحاولة» بعد الفشل تعيد import() فعليًا وتتعافى إلى المحتوى", async () => {
    let calls = 0;
    const loaders = {
      12: () => {
        calls += 1;
        return calls === 1
          ? Promise.reject(new Error("TEST-ONLY transient chunk failure"))
          : Promise.resolve({ default: (props) => h(FakeLesson, { ...props, marker: "12" }) });
      },
    };
    const out = await mount(h(M.LazyLessonHost, { route: 12, onExit: () => {}, loaders }));

    try {
      await flush(60);
      assert.ok(out.container.querySelector("[data-lesson-error-fallback]"), "الفشل الأول يعرض واجهة التعافي");
      assert.equal(calls, 1, "import() استُدعيت مرة واحدة");

      await click(out.container.querySelector("[data-lesson-error-retry]"));
      await flush(60);

      assert.equal(calls, 2, "«إعادة المحاولة» تُعيد import() فعليًا (وليست إعادة رندر للنتيجة الفاشلة المخزّنة)");
      assert.ok(out.container.querySelector('[data-testid="fake-lesson-12"]'), "المحتوى يظهر بعد نجاح المحاولة الثانية");
      assert.equal(out.container.querySelector("[data-lesson-error-fallback]"), null, "واجهة التعافي تختفي بعد التعافي");
    } finally {
      await out.unmount();
    }
  });

  it("فشل متكرر يبقى في واجهة التعافي دون انهيار (لا صفحة بيضاء)", async () => {
    let calls = 0;
    const loaders = { 13: () => { calls += 1; return Promise.reject(new Error(`TEST-ONLY persistent failure ${calls}`)); } };
    const out = await mount(h(M.LazyLessonHost, { route: 13, onExit: () => {}, loaders }));

    try {
      await flush(60);
      await click(out.container.querySelector("[data-lesson-error-retry]"));
      await flush(60);
      assert.equal(calls, 2, "كل ضغطة «إعادة المحاولة» تعني import() جديدة");
      assert.ok(out.container.querySelector("[data-lesson-error-fallback]"), "واجهة التعافي ما زالت ظاهرة بعد فشل ثانٍ");
      assert.ok(out.container.textContent.trim().length > 0, "لا صفحة بيضاء بعد فشل متكرر");
    } finally {
      await out.unmount();
    }
  });

  it("التنقل من درس إلى آخر يستبدل المحتوى ويصفّر حالة حدّ الأخطاء", async () => {
    const loaders = {
      1: () => Promise.resolve({ default: (props) => h(FakeLesson, { ...props, marker: "1" }) }),
      2: () => Promise.resolve({ default: (props) => h(FakeLesson, { ...props, marker: "2" }) }),
    };
    const out = await mount(h(M.LazyLessonHost, { route: 1, onExit: () => {}, loaders }));

    try {
      await flush(40);
      assert.ok(out.container.querySelector('[data-testid="fake-lesson-1"]'), "الدرس 1 معروض");

      await out.rerender(h(M.LazyLessonHost, { route: 2, onExit: () => {}, loaders }));
      await flush(60);

      assert.ok(out.container.querySelector('[data-testid="fake-lesson-2"]'), "الدرس 2 معروض بعد التنقل");
      assert.equal(out.container.querySelector('[data-testid="fake-lesson-1"]'), null, "محتوى الدرس 1 أُزيل");
    } finally {
      await out.unmount();
    }
  });

  it("درس بلا محمّل يعيد لا شيء دون انهيار", async () => {
    const out = await mount(h(M.LazyLessonHost, { route: 99, onExit: () => {}, loaders: {} }));
    try {
      await flush(20);
      assert.equal(out.container.textContent, "", "لا محتوى ولا انهيار لدرس غير مسجّل");
    } finally {
      await out.unmount();
    }
  });
});

// ============================================================
describe("LESSON_LOADERS — سجل المحمّلات الإنتاجي", () => {
  it("يضم الدروس 1–62 بالضبط", () => {
    assert.deepEqual([...M.LESSON_NUMBERS].sort((a, b) => a - b), Array.from({ length: 62 }, (_, i) => i + 1));
  });

  it("كل محمّل يحل إلى وحدة لها default export قابل للرندر", async () => {
    for (let n = 1; n <= 62; n += 1) {
      const loader = M.LESSON_LOADERS[n];
      assert.equal(typeof loader, "function", `الدرس ${n} له محمّل`);
      const mod = await loader();
      assert.ok(mod && mod.default, `الدرس ${n} له default export`);
      assert.ok(
        typeof mod.default === "function" || (typeof mod.default === "object" && mod.default !== null),
        `الدرس ${n} default export مكوّن (دالة أو كائن exotic)`,
      );
    }
  });
});
