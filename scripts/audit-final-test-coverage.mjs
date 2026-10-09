// ============================================================
// Final Test coverage audit — جدول تحقيق لكل درس من 1 إلى 32
//
// يدقّق الشروط العشرة لكل درس على حدة (لا الاعتماد على مجاميع عامة):
//   1  اختبار نهائي واحد فقط في الدرس.
//   2  مركّب في نهاية الدرس الحقيقية (آخر خطوة، أو الخطوة التي قبل الخاتمة).
//   3  عدد الأسئلة 12–15.
//   4  لكل سؤال مفتاح إجابة صالح (فهرس داخل الخيارات + شرح).
//   5  الأسئلة من محتوى الدرس نفسه (قياس إرشادي: مفردات الدرس).
//   6  لا تصحيح ولا درجة ولا شرح قبل الإرسال (نصًّا وسمات وصول).
//   7  الإرسال يكشف النتيجة والتصحيح والإجابات والشروح.
//   8  إعادة الضبط تمسح الإجابات وحالة الإرسال معًا.
//   9  منطقة المعلم تعرض مفتاح الاختبار نفسه (خلف كلمة المرور).
//  10  منطقة الاختبار الحديثة (20 سؤالًا) منفصلة وسليمة.
//
// الدروس 1–26 تستخدم النظام القديم المشترك (FinalQuiz + QUIZZES) كما هو —
// لا يُعاد بناؤه ولا يُنسخ؛ يُدقَّق فقط. والدروس 27–32 تستخدم المحرّك الجديد
// (FinalTest + FINAL_TESTS). الفحص سلوكي على DOM الحقيقي لكل درس.
//
//   node scripts/audit-final-test-coverage.mjs
//   ONLY=1,24,27 node scripts/audit-final-test-coverage.mjs   (عيّنة سريعة)
// ============================================================
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = dirname(fileURLToPath(import.meta.url));

const LESSONS = process.env.ONLY ? process.env.ONLY.split(",").map(Number) : Array.from({ length: 32 }, (_, i) => i + 1);
const LEGACY = LESSONS.filter((n) => n <= 26);
const MODERN = LESSONS.filter((n) => n >= 27);

const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
  return !!cond;
};

// ---------------- jsdom ----------------
const { JSDOM } = await import("jsdom");
const dom = new JSDOM(`<!doctype html><html dir="rtl" lang="ar"><body></body></html>`, { url: "http://localhost/", pretendToBeVisual: true });
const win = dom.window;
for (const k of ["window", "document", "navigator", "HTMLElement", "Element", "Node", "Event", "MouseEvent", "KeyboardEvent", "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement", "HTMLButtonElement", "getComputedStyle", "localStorage", "sessionStorage", "requestAnimationFrame", "cancelAnimationFrame", "MutationObserver", "CustomEvent", "HashChangeEvent", "Text", "Comment", "DocumentFragment", "HTMLDivElement", "SVGElement", "DOMParser"]) {
  if (win[k] !== undefined) Object.defineProperty(globalThis, k, { value: win[k], configurable: true });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = false;
const stub = (o, k, v) => { if (!o[k]) o[k] = v; };
stub(win.Element.prototype, "scrollTo", () => {});
stub(win.Element.prototype, "scrollIntoView", () => {});
stub(win, "scrollTo", () => {});
stub(win, "matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
stub(win, "IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
stub(win, "ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
win.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");

// ---------------- bundle ----------------
const dir = join(dirname(root), "node_modules", ".final-test-coverage");
mkdirSync(dir, { recursive: true });
const outFile = join(dir, `app-${process.pid}.mjs`);
await esbuild.build({
  absWorkingDir: dirname(root),
  stdin: {
    contents: `
export { default as App } from ${JSON.stringify(join(dirname(root), "src/App.tsx"))};
export { createRoot } from "react-dom/client";
export { flushSync } from "react-dom";
import React from "react"; export { React };
export { QUIZZES } from ${JSON.stringify(join(dirname(root), "src/shared/quizBank.ts"))};
export { FINAL_TESTS, FINAL_TEST_MIN, FINAL_TEST_MAX, finalTestFor, finalTestLessons } from ${JSON.stringify(join(dirname(root), "src/shared/finalTestBank.ts"))};
`,
    resolveDir: dirname(root), loader: "tsx",
  },
  bundle: true, platform: "node", format: "esm", outfile: outFile, jsx: "automatic", packages: "external", logLevel: "error",
});
const M = await import(pathToFileURL(outFile).href);
rmSync(outFile, { force: true });

const tick = (ms = 15) => new Promise((r) => setTimeout(r, ms));
const click = (n) => { if (!n) return false; n.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true })); return true; };
const setNativeValue = (el, value) => {
  const proto = el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : el.tagName === "SELECT" ? win.HTMLSelectElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event(el.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
};
const NEXT_RX = /التالي|التالية|Next/;
const findNext = () => [...document.querySelectorAll("button")].find((b) => !b.disabled && NEXT_RX.test(b.textContent || "") && !/السابق/.test(b.textContent || ""));

async function openLesson(n) {
  win.location.hash = `#/lesson/${n}`;
  document.body.innerHTML = `<div id="root"></div>`;
  const host = document.getElementById("root");
  const r = M.createRoot(host);
  M.flushSync(() => r.render(M.React.createElement(M.App)));
  win.dispatchEvent(new win.HashChangeEvent("hashchange"));
  await tick(50);
  return { host, close: () => { try { M.flushSync(() => r.unmount()); } catch { /* ignore */ } host.remove(); } };
}

// ---------------- locators ----------------
const isLegacy = (n) => n <= 26;
function regionOf(host, n) {
  if (!isLegacy(n)) return host.querySelector("[data-final-test]");
  // مرساة فريدة: جملة مقدمة FinalQuiz («أجب عنها كلها») لا توجد في أي مكوّن آخر —
  // ضرورية لأن دروسًا مثل L24 تملك أزرار «تحقق من الإجابات» خاصة بها في محطات التدريب.
  const anchors = [...host.querySelectorAll("span,div,p")].filter((e) => (e.textContent || "").includes("أجب عنها كلها"));
  if (!anchors.length) return null;
  let el = anchors[anchors.length - 1]; // أعمق عنصر يحمل الجملة
  while (el && el !== host && !(el.querySelector("button[aria-pressed]") && [...el.querySelectorAll("button")].some((b) => /تحقق من الإجابات/.test(b.textContent || "")))) {
    el = el.parentElement;
  }
  return el && el !== host ? el : null;
}
const questionsOf = (n) => (isLegacy(n) ? M.QUIZZES[n] || [] : M.finalTestFor(n));
/** نصوص الخيارات الشرعية للسؤال — أي ✓/✕ أو «صحيح/خطأ» خارجها يُعدّ كشفًا */
function expectedLabels(n, q) {
  if (isLegacy(n)) return (q.opts || []).map((t) => String(t).trim());
  const raw = q.type === "tf" ? ["صحيح ✓", "خطأ ✕"]
    : q.type === "error" ? (q.segments || [])
    : q.type === "order" ? (q.items || [])
    : q.type === "match" ? [...(q.pairs || []).map((x) => x.left), ...(q.pairs || []).map((x) => x.right)]
    : (q.options || []);
  return raw.map((t) => String(t).trim());
}
/** يجمّع أزرار خيارات النظام القديم حسب بطاقة السؤال (div.rounded-3xl) بدل الاعتماد على الترتيب العام */
function legacyCards(region, qs) {
  const groups = new Map();
  for (const b of region.querySelectorAll("button[aria-pressed]")) {
    const card = b.closest(".rounded-3xl") || b.parentElement;
    if (!groups.has(card)) groups.set(card, []);
    groups.get(card).push(b);
  }
  const list = [...groups.values()];
  const shape = list.map((g) => g.length).join("/");
  const want = qs.map((q) => q.opts.length).join("/");
  return { list, ok: list.length === qs.length && shape === want, shape, want };
}
const keyOf = (n) => (isLegacy(n) ? "QUIZZES" : "FINAL_TESTS");

// ---------------- 1) static: mounts, bank, teacher key, test area ----------------
const lessonSrc = (n) => readdirSync(join(dirname(root), `src/lessons/lesson${n}`)).filter((f) => /\.tsx?$/.test(f))
  .map((f) => readFileSync(join(dirname(root), `src/lessons/lesson${n}`, f), "utf8")).join("\n");

const staticRows = {};
for (const n of LESSONS) {
  const src = lessonSrc(n);
  const legacyMounts = (src.match(new RegExp(`<FinalQuiz\\s+lesson=\\{${n}\\}`, "g")) || []).length;
  const legacyOther = (src.match(/<FinalQuiz\s+lesson=\{(\d+)\}/g) || []).filter((s) => !s.includes(`{${n}}`)).length;
  const modernMounts = (src.match(new RegExp(`<FinalTest\\s+lesson=\\{${n}\\}`, "g")) || []).length;
  const mounts = isLegacy(n) ? legacyMounts : modernMounts;
  const row = { n, system: isLegacy(n) ? "FinalQuiz (قديم)" : "FinalTest (جديد)", mounts, bank: questionsOf(n).length, key: keyOf(n) };
  row.oneMount = ok(mounts === 1 && legacyOther === 0, `L${n}: اختبار نهائي واحد مركّب في الدرس (mounts=${mounts}, other=${legacyOther})`);
  // bank size
  row.countOk = ok(row.bank >= M.FINAL_TEST_MIN && row.bank <= M.FINAL_TEST_MAX, `L${n}: عدد الأسئلة ${row.bank} ضمن 12–15`);
  // answer-key validity
  const qs = questionsOf(n);
  const bad = [];
  qs.forEach((q, i) => {
    if (isLegacy(n)) {
      if (!q.ar || !q.ar.trim()) bad.push(`${i + 1}: no stem`);
      if (!Array.isArray(q.opts) || q.opts.length < 2) bad.push(`${i + 1}: opts`);
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.opts || []).length) bad.push(`${i + 1}: answer index`);
      if (!q.why || !q.why.trim()) bad.push(`${i + 1}: no why`);
      if (q.opts && new Set(q.opts).size !== q.opts.length) bad.push(`${i + 1}: duplicate options`);
    } else {
      if (!q.ar || !q.ar.trim()) bad.push(`${i + 1}: no stem`);
      if (!q.why || !q.why.trim()) bad.push(`${i + 1}: no why`);
      if (!q.concept || !q.concept.trim()) bad.push(`${i + 1}: no concept`);
      if (q.type === "single" || q.type === "error") { if (!Number.isInteger(q.answer) || q.answer < 0) bad.push(`${i + 1}: answer`); }
      if (q.type === "tf" && typeof q.answer !== "boolean") bad.push(`${i + 1}: tf answer`);
      if (q.type === "multi" && (!Array.isArray(q.answers) || q.answers.length < 2)) bad.push(`${i + 1}: multi answers`);
      if (q.type === "order" && (!Array.isArray(q.items) || q.items.length < 3)) bad.push(`${i + 1}: order items`);
      if (q.type === "match" && (!Array.isArray(q.pairs) || q.pairs.length < 3)) bad.push(`${i + 1}: match pairs`);
      if (q.type === "typed") {
        if (!Array.isArray(q.accept) || !q.accept.length) bad.push(`${i + 1}: typed accept`);
        if (!/\([^)]{2,}\)/.test(q.ar || "")) bad.push(`${i + 1}: typed بلا تسمية الفعل المطلوب`);
      }
    }
  });
  row.keyOk = ok(bad.length === 0, `L${n}: مفتاح إجابة صالح لكل سؤال (${bad.length ? bad.slice(0, 4).join(" · ") : "سليم"})`);
  const sigs = qs.map((q) => JSON.stringify(q));
  row.noDups = ok(new Set(sigs).size === sigs.length, `L${n}: لا سؤال مكرر في البنك`);
  // relevance heuristic: share vocabulary with the lesson's own source
  const vocab = new Set((src.toLowerCase().match(/[a-z]{3,}/g) || []));
  const arVocab = new Set((src.match(/[\u0600-\u06FF]{3,}/g) || []));
  let rel = 0;
  for (const q of qs) {
    const toks = `${q.ar || ""} ${q.en || ""} ${JSON.stringify(q.opts || q.items || q.pairs || q.accept || "")}`;
    const en = (toks.toLowerCase().match(/[a-z]{3,}/g) || []).filter((t) => vocab.has(t));
    const ar = (toks.match(/[\u0600-\u06FF]{3,}/g) || []).filter((t) => arVocab.has(t));
    if (en.length || ar.length) rel++;
  }
  row.relevance = `${rel}/${qs.length}`;
  row.relOk = ok(rel === qs.length, `L${n}: كل سؤال يشترك في مفردات مع محتوى الدرس (${rel}/${qs.length})`);
  // teacher key wiring
  if (isLegacy(n)) {
    row.teacher = ok(/<TeachersSpace lesson=\{lesson\}|<TeachersSpace/.test(readFileSync(join(dirname(root), "src/shared/FinalQuiz.tsx"), "utf8")), `L${n}: مفتاح المعلم عبر TeachersSpace المشترك`);
  } else {
    row.teacher = ok(src.includes("FinalTestAnswerKey"), `L${n}: مفتاح المعلم FinalTestAnswerKey داخل منطقة المعلم`);
  }
  // separate test area
  if (isLegacy(n)) {
    row.testArea = "N/A (لا منطقة اختبار حديثة)";
    row.testOk = ok(!/<FinalTest\s/.test(src), `L${n}: لا خلط بين النظام القديم والمحرّك الجديد`);
  } else {
    const t = new RegExp(`export const TEST_${n}\\b`).test(src) || new RegExp(`TEST_${n}\\s*[=:]`).test(src);
    const area = new RegExp(`data-area="lesson${n}-test"|TestArea${n}|area === "test"`).test(src);
    row.testArea = t && area ? "20 سؤالًا · منفصلة" : "غير موجودة";
    row.testOk = ok(t && area, `L${n}: منطقة الاختبار الحديثة ما زالت منفصلة وسليمة`);
  }
  staticRows[n] = row;
}
// لا تكرار عبر الدروس: نفس النوع + نفس نص السؤال + نفس المادة
const sigSeen = new Map();
for (const n of MODERN) {
  for (const q of questionsOf(n)) {
    const sig = [q.type, q.ar, q.en, (q.options || []).join(","), (q.segments || []).join(","), (q.items || []).join(","), (q.pairs || []).map((x) => x.left + x.right).join(","), q.before, q.after]
      .map((x) => String(x ?? "").replace(/\s+/g, " ").trim()).join("|");
    if (sigSeen.has(sig)) ok(false, `L${n}: سؤال مكرر حرفيًا مع L${sigSeen.get(sig)} — «${q.ar}»`);
    sigSeen.set(sig, n);
  }
}
ok(true, `لا تكرار حرفي للأسئلة عبر دروس 27–32 (${sigSeen.size} سؤالًا فريدًا)`);

// no lesson id lives in both banks
ok(M.finalTestLessons().every((n) => typeof M.QUIZZES[n] === "undefined"), "لا تداخل بين البنكين: الدروس 1–26 قديم و27–32 جديد (لا نسخ)");
ok(Object.keys(M.QUIZZES).length === 26, `بنك الدروس القديمة كما هو: 26 درسًا (${Object.keys(M.QUIZZES).length})`);

// ---------------- 2) behavioural: reachability + state machine ----------------
const EXIT_RX = /الدرس التالي|الدرس السابق|جميع الدروس|كل الدروس|الرئيسية|Home/;
// أزرار القفز (مثل «🏁 الخطوة التالية 40» في L32) تُستثنى: المشي يجب أن يكون خطوة خطوة
// حتى يكون قياس «الاختبار في آخر خطوة» حقيقيًا لا نتيجة قفز.
const JUMP_RX = /الخطوة التالية|🏁/;
const nextCandidates = (host) => [...host.querySelectorAll("button")].filter(
  (b) => !b.disabled && NEXT_RX.test(b.textContent || "") && !EXIT_RX.test(b.textContent || "") && !JUMP_RX.test(b.textContent || "") && !/السابق/.test(b.textContent || "")
);
const nextBtn = (host) => { const c = nextCandidates(host); return c[c.length - 1]; };

/** المشي الخطي بزر «التالي» (يعمل في الدروس المتدرّجة الحديثة ومعظم القديمة) */
async function crawlNext(n) {
  const { host, close } = await openLesson(n);
  const seen = [];
  let testAt = -1;
  let prev = null;
  for (let i = 0; i < 220; i++) {
    const html = host.innerHTML;
    if (html === prev) break;
    prev = html;
    seen.push(html);
    if (testAt < 0 && regionOf(host, n)) testAt = seen.length - 1;
    if (win.location.hash !== `#/lesson/${n}`) break; // خرج من الدرس
    const b = nextBtn(host);
    if (!b) break;
    click(b);
    await tick(12);
  }
  if (testAt < 0 && regionOf(host, n)) testAt = seen.length - 1;
  close();
  return { steps: seen.length, testAt, nav: { mode: "next", clicks: Math.max(0, testAt) }, via: "التالي" };
}

/** المشي بسطح الدرس نفسه (nav): لدروس لا تملك زر «التالي» مثل L17/L25 */
async function crawlRail(n) {
  const { host, close } = await openLesson(n);
  const nav0 = host.querySelector("nav");
  const total = nav0 ? nav0.querySelectorAll("button").length : 0;
  const seen = [];
  let testAt = -1;
  if (total >= 3) {
    for (let i = 0; i < total; i++) {
      const nav = host.querySelector("nav");
      const b = nav ? [...nav.querySelectorAll("button")][i] : null;
      if (!b) break;
      click(b);
      await tick(14);
      seen.push(host.innerHTML);
      if (testAt < 0 && regionOf(host, n)) testAt = seen.length - 1;
    }
  }
  close();
  return { steps: seen.length, testAt, nav: { mode: "rail", index: Math.max(0, testAt) }, via: "سطح الخطوات (nav)" };
}

async function survey(n) {
  const a = await crawlNext(n);
  if (a.testAt >= 0) return a;
  const b = await crawlRail(n);
  return b.testAt >= 0 || b.steps > a.steps ? b : a;
}

async function goTo(host, n, nav) {
  if (nav.mode === "rail") {
    for (let i = 0; i <= nav.index; i++) {
      const el = host.querySelector("nav");
      const b = el ? [...el.querySelectorAll("button")][i] : null;
      if (!b) break;
      click(b);
      await tick(14);
    }
  } else {
    for (let i = 0; i < nav.clicks; i++) {
      const b = nextBtn(host);
      if (!b) break;
      click(b);
      await tick(12);
    }
  }
  await tick(10);
  return regionOf(host, n);
}

/** فتح بوابة المعلم: قيمة + زر مجاور + Enter + submit (تغطّي forms الدروس القديمة وبوابات 29–31) */
async function unlock(host, value) {
  const pw = host.querySelector('input[type="password"]');
  if (!pw) return false;
  setNativeValue(pw, value);
  await tick(3);
  const scope = pw.closest("form") || pw.parentElement?.parentElement || host;
  const btn =
    [...scope.querySelectorAll("button")].find((b) => /دخول|فتح|عرض|دليل|تحقق|تأكيد|unlock/i.test(b.textContent || "")) ||
    scope.querySelector('button[type="submit"]') || scope.querySelector("button");
  if (btn) click(btn);
  for (const type of ["keydown", "keypress"]) {
    pw.dispatchEvent(new win.KeyboardEvent(type, { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, cancelable: true }));
  }
  pw.closest("form")?.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }));
  await tick(50);
  return true;
}

async function openTeacherArea(host) {
  if (host.querySelector('input[type="password"]')) return true;
  const labels = [/^\s*🧑\u200d🏫/, /منطقة المعلم/, /فضاء المعلم/, /Teacher/i, /المعلم/];
  for (const rx of labels) {
    const b = [...host.querySelectorAll("button")].find((x) => rx.test(x.textContent || "") || rx.test(x.getAttribute("aria-label") || ""));
    if (b) { click(b); await tick(30); }
    if (host.querySelector('input[type="password"]')) return true;
  }
  return !!host.querySelector('input[type="password"]');
}

async function stateMachine(n, nav) {
  const { host, close } = await openLesson(n);
  const region = await goTo(host, n, nav);
  const res = { fresh: false, partial: false, full: false, submitted: false, reset: false, notes: [] };
  if (!region) { close(); res.notes.push("لم يوجد إقليم الاختبار النهائي"); return res; }
  const qs = questionsOf(n);

  // مجسّات التسريب: النص المرئي + سمات الوصول معًا
  const leak = () => {
    const text = region.textContent || "";
    const hits = [];
    if (/نتيجتك|علامتك/.test(text)) hits.push("score");
    if (/\b\d{1,3}\s*%/.test(text)) hits.push("percent");
    for (const q of qs) if (q.why && text.includes(q.why.slice(0, 24))) hits.push(`why(Q)`);
    if (!isLegacy(n)) {
      if (region.querySelector("[data-ft-verdict]")) hits.push("verdict");
      if (region.querySelector("[data-ft-result]")) hits.push("result");
      if (/Platform Explanation/.test(text)) hits.push("platform-tag");
    } else if (/✓ صحيح|✕/.test(text)) hits.push("mark");
    if (region.querySelector("[aria-invalid]")) hits.push("aria-invalid");
    const opts = isLegacy(n)
      ? legacyCards(region, qs).list.map((btns, i) => btns.map((b) => ({ el: b, labels: expectedLabels(n, qs[i] || {}) }))).flat()
      : [...region.querySelectorAll("label, input[type=radio], input[type=checkbox]")].map((e) => {
          const el = e.closest("label") || e.parentElement;
          const card = el?.closest("[data-ft-q]");
          const idx = card ? Number(card.getAttribute("data-ft-q")) - 1 : -1;
          return { el, labels: idx >= 0 ? expectedLabels(n, qs[idx] || {}) : [] };
        });
    let probed = 0;
    for (const { el: o, labels } of opts) {
      if (!o || probed > 120) continue;
      probed++;
      if (/(border-emerald|bg-emerald|border-rose|bg-rose|text-emerald|text-rose)/.test(o.getAttribute("class") || "")) hits.push("colour");
      const t = (o.textContent || "").trim();
      const own = labels.some((L) => L && (t === L || t.endsWith(L) || L.endsWith(t)));
      if (!own && /✓|✕|صحيح|خطأ|الإجابة/.test(t)) hits.push(`opt-mark:${t.slice(0, 24)}`);
      for (const a of ["aria-label", "title", "aria-describedby"]) {
        const v = (o.getAttribute(a) || "").trim();
        if (v && !labels.includes(v) && /صحيح|خطأ|الإجابة الصحيحة/.test(v)) hits.push(`a11y:${a}`);
      }
    }
    return [...new Set(hits)];
  };
  const submitBtn = () => (isLegacy(n)
    ? [...region.querySelectorAll("button")].find((b) => /تحقق من الإجابات/.test(b.textContent || ""))
    : region.querySelector("[data-ft-submit]"));
  const resetBtn = () => (isLegacy(n)
    ? [...region.querySelectorAll("button")].find((b) => /إعادة|أعد الاختبار/.test(b.textContent || ""))
    : region.querySelector("[data-ft-reset]"));
  const controls = () => [...region.querySelectorAll("input,select,textarea")];

  // ---- الحالة 1: البداية ----
  const shape = isLegacy(n) ? legacyCards(region, qs) : null;
  if (shape && !shape.ok) res.notes.push(`بطاقات الأسئلة: ${shape.shape} ≠ المتوقع ${shape.want}`);
  const freshLeaks = leak();
  res.fresh = freshLeaks.length === 0 && !!submitBtn() && submitBtn().disabled === true && (!shape || shape.ok);
  res.notes.push(`fresh: leaks=[${freshLeaks.join(",")}] submitDisabled=${submitBtn()?.disabled} cards=${shape ? (shape.ok ? "ok" : shape.shape) : "n/a"}`);

  const answerOne = async (i, mode) => {
    const q = qs[i];
    if (isLegacy(n)) {
      const { list } = legacyCards(region, qs);
      const per = q.opts.length;
      const btns = list[i] || [];
      if (btns.length !== per) { res.notes.push(`Q${i + 1}: أزرار الخيارات ${btns.length}/${per}`); return; }
      if (!click(btns[mode === "right" ? q.answer : (q.answer + 1) % per])) res.notes.push(`Q${i + 1}: تعذّر النقر`);
      await tick(3);
      return;
    }
    const card = region.querySelector(`[data-ft-q="${i + 1}"]`);
    if (!card) { res.notes.push(`Q${i + 1}: لا بطاقة`); return; }
    if (q.type === "single" || q.type === "error") {
      const radios = [...card.querySelectorAll("input[type=radio]")];
      click(radios[mode === "right" ? q.answer : (q.answer + 1) % radios.length]);
    } else if (q.type === "tf") {
      const radios = [...card.querySelectorAll("input[type=radio]")];
      click(radios[mode === "right" ? (q.answer ? 0 : 1) : (q.answer ? 1 : 0)]);
    } else if (q.type === "multi") {
      const boxes = [...card.querySelectorAll("input[type=checkbox]")];
      if (mode === "right") q.answers.forEach((a) => click(boxes[a]));
      else click(boxes.find((_, b) => !q.answers.includes(b)));
    } else if (q.type === "order") {
      const order = mode === "right" ? q.items.map((_, b) => b) : [...q.items.keys()].reverse();
      for (const b of order) {
        const chip = [...card.querySelectorAll("button")].find((x) => (x.textContent || "").trim() === q.items[b]);
        if (chip) click(chip);
        await tick(2);
      }
    } else if (q.type === "match") {
      [...card.querySelectorAll("select")].forEach((sel, pi) => {
        const want = mode === "right" ? q.pairs[pi].right : q.pairs[(pi + 1) % q.pairs.length].right;
        const o = [...sel.options].find((x) => (x.textContent || "").trim() === want);
        if (o) setNativeValue(sel, o.value);
      });
    } else if (q.type === "typed") {
      setNativeValue(card.querySelector("input[type=text]"), mode === "right" ? q.accept[0] : "WRONG ANSWER");
    }
    await tick(3);
  };

  // ---- الحالة 2: إجابات جزئية ----
  const half = Math.max(1, Math.floor(qs.length / 2));
  for (let i = 0; i < half; i++) await answerOne(i, i % 2 ? "wrong" : "right");
  const partialLeaks = leak();
  res.partial = partialLeaks.length === 0 && submitBtn()?.disabled === true;
  res.notes.push(`partial(${half}/${qs.length}): leaks=[${partialLeaks.join(",")}] submitDisabled=${submitBtn()?.disabled}`);

  // ---- الحالة 3: كل الأسئلة مُجابة بلا إرسال ----
  for (let i = half; i < qs.length; i++) await answerOne(i, i % 2 ? "wrong" : "right");
  const fullLeaks = leak();
  res.full = fullLeaks.length === 0 && submitBtn()?.disabled === false;
  res.notes.push(`answered(${qs.length}/${qs.length}): leaks=[${fullLeaks.join(",")}] submitEnabled=${submitBtn() ? !submitBtn().disabled : false}`);

  // ---- الحالة 4: الإرسال/التصحيح ----
  click(submitBtn());
  await tick(40);
  const text = region.textContent || "";
  const explained = qs.filter((q) => text.includes((q.why || "").slice(0, 18))).length;
  const revealed = isLegacy(n)
    ? /نتيجتك:/.test(text) && explained === qs.length
    : !!region.querySelector("[data-ft-result]") && region.querySelectorAll("[data-ft-verdict]").length === qs.length && explained === qs.length;
  const locked = isLegacy(n)
    ? (() => { const b = legacyCards(region, qs).list.flat(); return b.length > 0 && b.every((x) => x.disabled); })()
    : (() => { const c = controls(); return c.length > 0 && c.every((x) => x.disabled || !!x.closest("fieldset[disabled]")); })();
  res.submitted = revealed && locked;
  res.notes.push(`submitted: score=${/نتيجتك:/.test(text) || !!region.querySelector("[data-ft-result]")} explanations=${explained}/${qs.length} locked=${locked}`);

  // ---- الحالة 5: إعادة الضبط ----
  const rb = resetBtn();
  if (rb) { click(rb); await tick(30); }
  const afterText = region.textContent || "";
  const cleanAfter = isLegacy(n)
    ? (() => { const b = legacyCards(region, qs).list.flat(); return !/نتيجتك:/.test(afterText) && b.length > 0 && b.every((x) => x.getAttribute("aria-pressed") === "false" && !x.disabled); })()
    : !region.querySelector("[data-ft-result]") && region.querySelectorAll("[data-ft-verdict]").length === 0 &&
      controls().every((i) => (i.type === "text" ? i.value === "" : !i.checked || i.disabled === false)) &&
      [...region.querySelectorAll("input[type=text]")].every((i) => i.value === "") &&
      [...region.querySelectorAll("input[type=radio],input[type=checkbox]")].every((i) => !i.checked) &&
      [...region.querySelectorAll("select")].every((s) => s.selectedIndex === 0) &&
      submitBtn()?.disabled === true;
  const resetLeaks = leak();
  res.reset = !!rb && cleanAfter && resetLeaks.length === 0;
  res.notes.push(`reset: button=${!!rb} clean=${cleanAfter} leaks=[${resetLeaks.join(",")}]`);
  close();
  return res;
}

/** مفتاح المعلم مرندرًا: بوابة + كلمة خاطئة لا تسرّب + somer173 تفتح مفتاح الاختبار نفسه */
async function teacherKey(n, nav) {
  const { host, close } = await openLesson(n);
  await goTo(host, n, nav);
  const out = { gate: false, wrong: false, right: false, hits: "—" };
  const qs = questionsOf(n);
  const region = regionOf(host, n);
  out.gate = await openTeacherArea(host);
  if (!out.gate) { close(); return out; }
  const keyText = () => {
    const scoped = (!isLegacy(n) && host.querySelector("[data-ft-key]")) || region || host;
    return scoped.textContent || "";
  };
  await unlock(host, "wrong-pass-xyz");
  const wrongText = keyText();
  out.wrong = !qs.some((q) => (q.why || "").length > 24 && wrongText.includes(q.why.slice(0, 24)));
  out.gate = !!host.querySelector('input[type="password"]') || !out.wrong;
  await unlock(host, "somer173");
  const t = keyText();
  const hits = qs.filter((q) => t.includes((q.why || "").slice(0, 18))).length;
  out.hits = `${hits}/${qs.length}`;
  out.right = hits >= Math.max(1, Math.floor(qs.length * 0.8));
  close();
  return out;
}

const TRACE = (process.env.TRACE || "").split(",").filter(Boolean).map(Number);
const rows = [];
for (const n of LESSONS) {
  const s = await survey(n);
  const row = { ...staticRows[n], steps: s.steps, testAt: s.testAt, via: s.via };
  row.reachable = ok(s.testAt >= 0, `L${n}: الاختبار النهائي يظهر فعليًا في الواجهة (${s.via}: الخطوة ${Math.max(0, s.testAt + 1)} من ${s.steps})`);
  if (s.testAt >= 0) {
    const tail = s.steps - s.testAt - 1;
    row.atEnd = ok(tail <= 2, `L${n}: مركّب في نهاية الدرس (الخطوة ${s.testAt + 1}/${s.steps} — بعدها ${tail} خطوة خاتمة فقط)`);
    row.notEarly = ok(s.testAt > 0 || s.steps === 1, `L${n}: لا يظهر في أول الدرس (${s.steps === 1 ? "درس بصفحة واحدة" : `الخطوة ${s.testAt + 1}`})`);
    const sm = await stateMachine(n, s.nav);
    row.sm = sm;
    row.freshOk = ok(sm.fresh, `L${n}: حالة البداية — لا تسريب (نتيجة/صحة/شرح) وزر التصحيح معطّل · ${sm.notes[0]}`);
    row.partialOk = ok(sm.partial, `L${n}: إجابات جزئية — لا تسريب وزر التصحيح ما زال معطّلًا · ${sm.notes[sm.notes.length - 4] || ""}`);
    row.answeredOk = ok(sm.full, `L${n}: كل الأسئلة مُجابة بلا إرسال — لا تسريب والزر مفعّل · ${sm.notes[sm.notes.length - 3] || ""}`);
    row.submitOk = ok(sm.submitted, `L${n}: الإرسال يكشف النتيجة والتصحيح والشروح ويقفل الإجابات · ${sm.notes[sm.notes.length - 2] || ""}`);
    row.resetOk = ok(sm.reset, `L${n}: إعادة الضبط تمسح الإجابات وحالة الإرسال · ${sm.notes[sm.notes.length - 1] || ""}`);
    if (TRACE.includes(n)) {
      console.log(`\n--- state trace · L${n} (${row.system}) · step ${s.testAt + 1}/${s.steps} via ${s.via} ---`);
      sm.notes.forEach((x) => console.log(`    ${x}`));
    }
    const tk = await teacherKey(n, s.nav);
    row.teacherHits = tk.hits;
    row.gateOk = ok(tk.gate, `L${n}: بوابة كلمة المرور لمنطقة المعلم موجودة`);
    row.wrongPwOk = ok(tk.wrong, `L${n}: كلمة مرور خاطئة لا تسرّب مفتاح الإجابات`);
    row.keyOk2 = ok(tk.right, `L${n}: كلمة المرور somer173 تفتح مفتاح الاختبار نفسه (${tk.hits})`);
    if (TRACE.includes(n)) {
      console.log(`    teacher: gate=${tk.gate} wrongPwLeaks=${!tk.wrong} somer173 key=${tk.hits} → ${tk.right ? "PASS" : "FAIL"}`);
    }
  } else {
    row.atEnd = row.notEarly = row.freshOk = row.partialOk = row.answeredOk = row.submitOk = row.resetOk = false;
    ok(false, `L${n}: لا يمكن فحص الحالة — الاختبار النهائي غير قابل للوصول في الواجهة (مشى ${s.steps} خطوة عبر ${s.via})`);
  }
  rows.push(row);
}

// ---------------- table ----------------
const mark = (v, w = 8) => pad(v === true ? "PASS" : v === false ? "FAIL" : String(v ?? "—"), w);
const pad = (s, w) => { const t = String(s); let width = 0; for (const ch of t) width += /[\u0600-\u06FF\u06F0-\u06F9]/.test(ch) ? 1 : 1; return t + " ".repeat(Math.max(0, w - t.length)); };
console.log("\n================ per-lesson Final Test audit (1–32) ================");
console.log(
  ["L", "system", "Qs", "step (test/total)", "1 mount", "2 at-end", "3 count", "4 key", "5 relevance", "6 no-leak", "7 reveals", "8 reset", "9 teacher", "10 test-area"]
    .map((h, i) => pad(h, [4, 18, 4, 18, 9, 10, 9, 7, 13, 11, 11, 9, 13, 22][i])).join("")
);
for (const r of rows) {
  const noLeak = r.freshOk && r.partialOk && r.answeredOk;
  console.log(
    [
      pad(r.n, 4), pad(r.system, 18), pad(r.bank, 4), pad(r.testAt >= 0 ? `${r.testAt + 1} / ${r.steps}` : "unreachable", 18), mark(r.oneMount, 9), mark(r.atEnd === undefined ? false : r.atEnd && r.notEarly, 10),
      mark(r.countOk, 9), mark(r.keyOk && r.noDups, 7), pad(r.relevance + (r.relOk ? "" : "!"), 13), mark(noLeak, 11), mark(r.submitOk, 11),
      mark(r.resetOk, 9), pad(`${r.gateOk && r.wrongPwOk && r.keyOk2 ? "PASS" : "FAIL"} ${r.teacherHits}`, 13), pad(r.testArea + (r.testOk ? "" : "!"), 22),
    ].join("")
  );
}
console.log("====================================================================");

// جدول Markdown (للتوثيق): node scripts/audit-final-test-coverage.mjs --md
if (process.argv.includes("--md")) {
  const yn = (v) => (v ? "✅" : "❌");
  console.log("\n<!-- md-table:start -->");
  console.log("| الدرس | النظام | الأسئلة | موضع الاختبار | 1 تركيب واحد | 2 نهاية الدرس | 3 العدد 12–15 | 4 مفتاح صالح | 5 صلة بالدرس | 6 لا كشف قبل التصحيح | 7 التصحيح يكشف | 8 إعادة الضبط | 9 مفتاح المعلم | 10 منطقة الاختبار |");
  console.log("|---:|---|---:|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---|");
  for (const r of rows) {
    console.log(`| ${r.n} | ${r.system} | ${r.bank} | ${r.testAt >= 0 ? `خطوة ${r.testAt + 1} من ${r.steps}` : "غير قابل للوصول"} | ${yn(r.oneMount)} | ${yn(r.atEnd && r.notEarly)} | ${yn(r.countOk)} | ${yn(r.keyOk && r.noDups)} | ${yn(r.relOk)} (${r.relevance}) | ${yn(r.freshOk && r.partialOk && r.answeredOk)} | ${yn(r.submitOk)} | ${yn(r.resetOk)} | ${yn(r.gateOk && r.wrongPwOk && r.keyOk2)} (${r.teacherHits}) | ${r.testArea} ${yn(r.testOk)} |`);
  }
  console.log("<!-- md-table:end -->");
}
console.log(`lessons audited: ${rows.length} · legacy FinalQuiz: ${LEGACY.length} · modern FinalTest: ${MODERN.length}`);
console.log(`question banks: legacy ${LEGACY.reduce((a, n) => a + (M.QUIZZES[n] || []).length, 0)} questions · modern ${MODERN.reduce((a, n) => a + questionsOf(n).length, 0)} questions`);

if (failures.length) {
  console.error(`\n✕ Final Test coverage audit FAILED (${failures.length}/${checks})\n` + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
console.log(`\n✓ Final Test coverage audit passed (${checks} checks): كل درس من 1 إلى 32 له اختبار نهائي واحد في نهاية الدرس، 12–15 سؤالًا بمفاتيح صالحة، بلا كشف قبل التصحيح، مع مفتاح المعلم ومنطقة اختبار منفصلة.`);
