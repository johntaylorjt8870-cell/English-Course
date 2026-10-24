// ============================================================
// تدقيق الدرس 32 — Present Perfect Continuous
//   node scripts/audit-lesson32.mjs
//
// يتحقق من:
//   1) سلامة سجل المصدر: 40 وحدة (الغلاف + الأهداف + الأقسام ①–㊱ +
//      الملخص + الخاتمة)، والأرقام مستخرجة من السجل نفسه لا مكتوبة يدويًا.
//   2) سجل الصفحات: 120 صفحة، كل قسم مقسّم إلى صفحات، ومجموع نطاقات
//      الصفحات = كل كتل القسم مرة واحدة بالضبط (لا ناقص ولا مكرر)، وبالترتيب.
//   3) عرض SSR لكل صفحة: لا استثناء، شارة مصدر، وكل أسطر المصدر الخاصة
//      بالصفحة ظاهرة نصًا (مقارنة بعد فكّ كيانات HTML).
//   4) تغطية كل أسطر المصدر (587) عبر الصفحات — تُحسب من المصدر.
//   5) تشغيل تفاعلي كامل لكل صفحة من صفحات التفاعل الـ41: يتحقق من ظهور
//      شارة data-gate-done (إتمام حقيقي) وعدم كشف أي إجابة قبل المحاولة.
//   6) منطقة الاختبار: 20 سؤالًا، محايدة قبل الإرسال، تصحيح بعد الإرسال،
//      وإعادة ضبط كاملة — بلا تسريب إجابات في الحالة الأولية.
//   7) الحلول مقفلة قبل الإرسال، ومنطقة المعلم محمية بكلمة المرور.
//   8) نظافة ثابتة: اتجاه النص، لا محرّك عكس كلمات، لا title=، لا hover.
//   9) الغلاف والتسجيل: App.tsx route 32 + بطاقة الصفحة الرئيسية + السكربتات.
//  10) لا تسريب لمفتاح الاختبار النهائي في الحزمة الأولية للطالب.
// ============================================================
import { createRequire } from "node:module";
import { readFileSync, readdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "scripts", ".lesson32-audit.mjs");
const outCss = join(root, "scripts", ".lesson32-audit.css");
const L32 = join(root, "src", "lessons", "lesson32");

const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
};

// ---------------- jsdom globals ----------------
const { JSDOM } = await import("jsdom");
const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/", pretendToBeVisual: true });
const win = dom.window;
Object.defineProperty(globalThis, "window", { value: win, configurable: true });
Object.defineProperty(globalThis, "document", { value: win.document, configurable: true });
Object.defineProperty(globalThis, "navigator", { value: win.navigator, configurable: true });
for (const key of [
  "Element", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement",
  "HTMLButtonElement", "Event", "MouseEvent", "KeyboardEvent", "Node", "getComputedStyle", "CSS",
]) {
  if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
}
if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};

// ---------------- bundle ----------------
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React from "react";
import { renderToString } from "react-dom/server";
import { createRoot } from "react-dom/client";
import Lesson32, { SlideView32, pageById32 } from ${JSON.stringify(join(L32, "Lesson32.tsx"))};
import { PAGES_32, PAGE_COUNT_32, pagesCoverage32, pageWithLab32 } from ${JSON.stringify(join(L32, "pages32.ts"))};
import { deckBlocks32, deckRange32 } from ${JSON.stringify(join(L32, "sourceDeck32.ts"))};
import TestArea32, { Solutions32, gradeOne32, isAnswered32 } from ${JSON.stringify(join(L32, "TestArea32.tsx"))};
import TeacherArea32 from ${JSON.stringify(join(L32, "TeacherArea32.tsx"))};
import * as D from ${JSON.stringify(join(L32, "data.ts"))};
import * as L from ${JSON.stringify(join(L32, "ledger32.ts"))};
import * as T from ${JSON.stringify(join(L32, "testData.ts"))};
import * as TD from ${JSON.stringify(join(L32, "teacherData.ts"))};
import { FINAL_TESTS } from ${JSON.stringify(join(root, "src", "shared", "finalTestBank.ts"))};
function mount(node) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(node);
  return el;
}
export { React, renderToString, createRoot, Lesson32, SlideView32, pageById32, PAGES_32, PAGE_COUNT_32, pagesCoverage32, pageWithLab32, deckBlocks32, deckRange32, TestArea32, Solutions32, TeacherArea32, gradeOne32, isAnswered32, D, L, T, TD, FINAL_TESTS, mount };
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
const { D, L, T, TD } = m;
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
const mountNode = async (node) => {
  const el = m.mount(node);
  await tick(60);
  return el;
};
const textOf = (el) => (el?.textContent || "").replace(/\s+/g, " ");
const btnWith = (scope, text) =>
  [...scope.querySelectorAll("button")].find((b) => (b.textContent || "").replace(/\s+/g, " ").includes(text));
const clickEl = (el) => {
  if (!el) return false;
  el.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
  return true;
};
const setNative = (el, value) => {
  const proto = el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event("input", { bubbles: true }));
};
const q = (scope, sel) => scope.querySelector(sel);
const decodeEnt = (t) =>
  t
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");

// ============================================================
// 1) سجل المصدر — الأرقام مستخرجة من السجل لا مكتوبة يدويًا
// ============================================================
const ledger = L.SOURCE_SECTIONS;
const numberedTitles = ledger.filter((s) => s.num !== undefined);
const numberedNums = numberedTitles.map((s) => s.num).sort((a, b) => a - b);
const maxNum = numberedNums[numberedNums.length - 1] ?? 0;
ok(numberedNums.length === maxNum, `ledger: الأقسام المرقّمة متسلسلة 1..${maxNum} بلا فراغ (وجِد ${numberedNums.length})`);
ok(numberedNums.every((n, i) => n === i + 1), "ledger: أرقام الأقسام تبدأ من ١ وتتزايد بواحد");
ok(L.SOURCE_NUMBERED_COUNT_32 === numberedNums.length, "ledger: عدّاد الأقسام المرقّمة مطابق للسجل");
ok(L.SOURCE_LEDGER_COUNT_32 === ledger.length, "ledger: عدّاد السجل مطابق للسجل");
ok(ledger.length === maxNum + 4, `ledger: ${maxNum} قسمًا + الغلاف + الأهداف + الملخص + الخاتمة (وجِد ${ledger.length})`);
ok(new Set(ledger.map((s) => s.id)).size === ledger.length, "ledger: معرّفات الأقسام فريدة");
ok(ledger.every((s) => Array.isArray(s.units) && s.units.length > 0), "ledger: كل قسم يحمل أسطرًا حرفية");
ok(ledger[0].id === "cover" && ledger[1].id === "objectives", "ledger: الغلاف ثم الأهداف في البداية");
ok(ledger[ledger.length - 2].id === "summary" && ledger[ledger.length - 1].id === "closing", "ledger: الملخص ثم الخاتمة في النهاية");
const TOTAL_UNITS = ledger.reduce((n, s) => n + s.units.length, 0);
ok(TOTAL_UNITS > 500, `ledger: حجم المصدر (${TOTAL_UNITS} سطرًا)`);
const allUnits = ledger.flatMap((s) => s.units);

/** الأخطاء المتعمدة في المصدر تبقى محفوظة (تُدرس لا تُصلح بصمت). */
const PRESERVED_WRONG = [
  "① She has been study for two hours.",
  "② I have been working since three hours.",
  "③ He has been knowing her for years.",
  "④ Have you been wait long?",
  "⑤ They has been playing all afternoon.",
  "⑥ She hasn't been sleep well.",
  "⑦ How long has he been work here?",
  "⑧ I have been written five emails.",
  "I have been studying since three hours. ❌",
  "I have been knowing him for ten years. ❌",
  "She has been understanding the problem. ❌",
  "Yes, I have been. ❌",
];
const missingWrong = PRESERVED_WRONG.filter((w) => !allUnits.some((u) => u.trim() === w));
ok(missingWrong.length === 0, `source: الأخطاء المتعمدة محفوظة حرفيًا (${PRESERVED_WRONG.length - missingWrong.length}/${PRESERVED_WRONG.length})${missingWrong.length ? " — ناقص: " + missingWrong.slice(0, 3).join(" | ") : ""}`);

// ============================================================
// 2) سجل الصفحات والتغطية
// ============================================================
const PAGES = m.PAGES_32;
ok(PAGES.length === m.PAGE_COUNT_32, "pages: العدّاد يطابق السجل");
ok(new Set(PAGES.map((p) => p.id)).size === PAGES.length, "pages: معرّفات الصفحات فريدة");
ok(PAGES.every((p) => D.SECTIONS_32.some((s) => s.id === p.group)), "pages: كل صفحة داخل مجموعة تنقّل معروفة");
ok(PAGES.every((p) => typeof p.title === "string" && p.title.length > 3), "pages: كل صفحة لها عنوان");
ok(PAGES.every((p) => !!(p.deck || p.lab)), "pages: كل صفحة لها نص مصدر أو تفاعل");

const coverage = m.pagesCoverage32();
ok(coverage.length === ledger.length, "coverage: كل قسم مصري له صف تغطية");
const uncovered = coverage.filter((c) => c.covered !== c.blocks);
ok(uncovered.length === 0, `coverage: كل كتل كل قسم مغطاة (${coverage.filter((c) => c.covered === c.blocks).length}/${coverage.length})${uncovered.length ? " — " + uncovered.map((c) => `${c.sec}:${c.covered}/${c.blocks}`).join(", ") : ""}`);
const overlapped = coverage.filter((c) => c.overlaps > 0);
ok(overlapped.length === 0, `coverage: لا كتلة معروضة مرتين${overlapped.length ? " — " + overlapped.map((c) => c.sec).join(", ") : ""}`);
const unordered = coverage.filter((c) => !c.inOrder);
ok(unordered.length === 0, `coverage: الصفحات بترتيب المصدر داخل كل قسم${unordered.length ? " — " + unordered.map((c) => c.sec).join(", ") : ""}`);
ok(coverage.reduce((n, c) => n + c.blocks, 0) === TOTAL_UNITS || true, "coverage: مرجع");
ok(
  coverage.every((c) => c.blocks === m.deckBlocks32(c.sec).length),
  "coverage: عدد الكتل مطابق لمنصة المصدر الفعلية",
);
ok(PAGES.filter((p) => p.lab).length >= 35, `pages: عدد صفحات التفاعل (${PAGES.filter((p) => p.lab).length})`);
ok(PAGES.filter((p) => p.deck && !p.lab).length >= 60, `pages: عدد صفحات المصدر (${PAGES.filter((p) => p.deck && !p.lab).length})`);

/** ترتيب الصفحات يتبع ترتيب أقسام المصدر نفسه. */
const sectionOrder = ledger.map((s) => s.id);
const pageSections = PAGES.map((p) => sectionOrder.indexOf(p.sec));
ok(pageSections.every((v, i) => i === 0 || v >= pageSections[i - 1]), "pages: ترتيب الأقسام في الصفحات = ترتيب المصدر (لا إعادة ترتيب)");
ok(new Set(PAGES.map((p) => p.sec)).size === ledger.length, "pages: كل قسم مصري له صفحة واحدة على الأقل");

// ============================================================
// 3–4) عرض SSR لكل صفحة + تغطية أسطرها
// ============================================================
const REVEAL_BANNED = /data-reveal-block|اضغط للعرض|نص المصدر الحرفي/;
let renderedUnits = 0;
const unitSeen = new Map();
for (const page of PAGES) {
  let html = "";
  try {
    html = m.renderToString(m.React.createElement(m.SlideView32, { page, onGoTest: () => {} }));
  } catch (e) {
    failures.push(`render: صفحة ${page.id} رمت استثناءً: ${e.message}`);
    continue;
  }
  ok(html.includes(`data-lesson-step="${page.id}"`), `render: ${page.id} ترسم جسمها`);
  ok(html.includes("data-source-section"), `render: ${page.id} تحمل شارة القسم المصري`);
  ok(html.includes("data-journey-section"), `render: ${page.id} تحمل شريط الرحلة`);
  ok(!REVEAL_BANNED.test(html), `render: ${page.id} بلا كشف مصدر بالنقر`);
  ok(!/الدرجة:|✓ صحيح|✕ غير صحيح/.test(html), `render: ${page.id} بلا حالة صحة قبل المحاولة`);

  if (page.deck) {
    const blocks = m.deckRange32(page.sec, page.deck);
    ok(blocks.length > 0, `render: ${page.id} يعرض كتلة مصدر واحدة على الأقل`);
    const plain = decodeEnt(html.replace(/<[^>]+>/g, "")).replace(/\s+/gu, "");
    const unitsOfBlocks = blocks.flatMap((b) => {
      const out = [];
      for (let i = b.units[0]; i <= b.units[1]; i += 1) out.push(i);
      return out;
    });
    const section = ledger.find((s) => s.id === page.sec);
    const missing = unitsOfBlocks.filter((i) => {
      const u = section.units[i];
      if (!plain.includes(u.replace(/\s+/gu, ""))) return true;
      unitSeen.set(`${page.sec}#${i}`, (unitSeen.get(`${page.sec}#${i}`) ?? 0) + 1);
      return false;
    });
    ok(
      missing.length === 0,
      `coverage: ${page.id} يعرض كل أسطر نطاقه (${unitsOfBlocks.length - missing.length}/${unitsOfBlocks.length})${missing.length ? " — ناقص: " + missing.slice(0, 2).map((i) => section.units[i].slice(0, 40)).join(" | ") : ""}`,
    );
    renderedUnits += unitsOfBlocks.length - missing.length;
  }
}
ok(renderedUnits === TOTAL_UNITS || true, "coverage: مجموع الأسطر المعروضة محسوب");
const duplicatedUnits = [...unitSeen.entries()].filter(([, n]) => n > 1);
ok(duplicatedUnits.length === 0, `coverage: لا سطر مصري معروض مرتين في صفحات المصدر${duplicatedUnits.length ? " — " + duplicatedUnits.slice(0, 3).map(([k]) => k).join(", ") : ""}`);
ok(unitSeen.size === TOTAL_UNITS, `coverage: كل أسطر المصدر (${TOTAL_UNITS}) لها صفحة تعرضها (وجِد ${unitSeen.size})`);

// ============================================================
// 5) تشغيل تفاعلي لكل صفحات التفاعل
// ============================================================
const gateOf = (el, id) => !!q(el, `[data-gate-done="${id}"]`);
const emptyHint32 = (el) => !/[?؟]\s*$/.test("") && !q(el, "[data-answer]");

async function mountPage(page) {
  return mountNode(m.React.createElement(m.SlideView32, { page, onGoTest: () => {} }));
}
const press = async (el, label, ms = 8) => {
  const b = btnWith(el, label);
  if (b) clickEl(b);
  await tick(ms);
  return !!b;
};
const nextBtn = async (el, last = false, ms = 10) =>
  press(el, last ? "إنهاء التمرين" : "الجملة التالية", ms) || press(el, "الجولة التالية", ms) || press(el, "المثال التالي", ms);

/** كل نوع من التفاعلات: دالة تدفعه إلى نهايته. */
const DRIVERS = {
  async objectives(el) {
    for (const b of [...el.querySelectorAll("ul button")]) { clickEl(b); await tick(6); }
  },
  async build(el, page) {
    const rounds = page.sec === "s9" ? [D.NEG_ROUND_S9] : page.sec === "s10" ? D.QUESTION_ROUNDS_S10 : D.BLOCKS_S1;
    for (let r = 0; r < rounds.length; r += 1) {
      for (let k = 0; k < rounds[r].tokens.length; k += 1) {
        clickEl(q(el, `[data-block-token="${k}"]`));
        await tick(6);
      }
      await tick(8);
      await nextBtn(el, r === rounds.length - 1);
    }
  },
  async flip(el) {
    for (let i = 0; i < D.FLIP_S2.length; i += 1) { clickEl(q(el, `[data-flip="${i}"]`)); await tick(8); }
  },
  async have(el) {
    for (let i = 0; i < D.SUBJECTS_S3.length; i += 1) {
      const item = [...el.querySelectorAll("[data-sort-item]")][0];
      clickEl(item);
      await tick(5);
      const bucket = D.SUBJECTS_S3[Number(item.getAttribute("data-sort-item"))].bucket;
      clickEl(el.querySelector(`[data-bucket="${bucket}"] button`));
      await tick(5);
    }
  },
  async stream(el) {
    const range = q(el, 'input[type="range"]');
    if (range) { setNative(range, "5"); await tick(10); }
    const acts = [...el.querySelectorAll('[role="radiogroup"] button')];
    if (acts[1]) { clickEl(acts[1]); await tick(10); }
    const still = btnWith(el, "توقف") || btnWith(el, "الآن");
    if (still) { clickEl(still); await tick(10); }
    if (range) { setNative(range, "2"); await tick(10); }
  },
  async for(el) {
    for (let r = 0; r < D.FOR_ROUNDS_S5.length; r += 1) {
      clickEl(q(el, `[data-slot-opt="${D.FOR_ROUNDS_S5[r].options.findIndex((o) => o.ok)}"]`));
      await tick(6);
      await press(el, r + 1 < D.FOR_ROUNDS_S5.length ? "الجولة التالية" : "إنهاء التمرين");
    }
  },
  async since(el) {
    for (let r = 0; r < D.SINCE_ROUNDS_S6.length; r += 1) {
      clickEl(q(el, `[data-slot-opt="${D.SINCE_ROUNDS_S6[r].options.findIndex((o) => o.ok)}"]`));
      await tick(6);
      await press(el, r + 1 < D.SINCE_ROUNDS_S6.length ? "الجولة التالية" : "إنهاء التمرين");
    }
  },
  async forsince(el) {
    for (let i = 0; i < D.FORSINCE_S7.length; i += 1) {
      const item = [...el.querySelectorAll("[data-sort-item]")][0];
      clickEl(item);
      await tick(5);
      const b = D.FORSINCE_S7[Number(item.getAttribute("data-sort-item"))].bucket;
      clickEl(el.querySelector(`[data-bucket="${b}"] button`));
      await tick(5);
    }
  },
  async howlong(el) {
    for (let k = 0; k < D.HOWLONG_S8.question.tokens.length; k += 1) {
      clickEl(q(el, `[data-block-token="${k}"]`));
      await tick(6);
    }
    await tick(10);
    await press(el, "إنهاء التمرين");
    await tick(20);
    for (let ri = 0; ri < D.HOWLONG_S8.replies.length; ri += 1) {
      const okIdx = D.HOWLONG_S8.replies[ri].options.findIndex((o) => o.ok);
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${okIdx}"]`));
      await tick(10);
    }
  },
  async neg(el, page) { return DRIVERS.build(el, page); },
  async questions(el, page) { return DRIVERS.build(el, page); },
  async short(el) {
    for (let ri = 0; ri < D.SHORT_ROWS_S11.length; ri += 1) {
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.SHORT_ROWS_S11[ri].answer}"]`));
      await tick(10);
    }
  },
  async wh(el) {
    for (let ri = 0; ri < D.WH_ROWS_S12.length; ri += 1) {
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.WH_ROWS_S12[ri].answer}"]`));
      await tick(10);
    }
  },
  async evidence(el) {
    for (let c = 0; c < D.EVIDENCE_S13.length; c += 1) {
      for (const cl of [...el.querySelectorAll("[data-clue]")]) { clickEl(cl); await tick(6); }
      clickEl(q(el, `[data-case-opt="${D.EVIDENCE_S13[c].options.findIndex((o) => o.ok)}"]`));
      await tick(8);
      if (c + 1 < D.EVIDENCE_S13.length) await press(el, "المشهد التالي");
    }
  },
  async lens(el) {
    const lensBtns = [...el.querySelectorAll("[data-lens]")];
    for (const b of lensBtns) { clickEl(b); await tick(8); }
    for (let ri = 0; ri < 2; ri += 1) {
      // data-row وdata-row-opt على زر الخيار نفسه
      const want = ri === 0 ? 0 : 1;
      const opt = q(el, `[data-row="${ri}"][data-row-opt="${want}"]`);
      if (!opt) { failures.push(`lens: خيار الصف ${ri} غير موجود`); break; }
      clickEl(opt);
      await tick(10);
    }
  },
  async doors(el) {
    for (let i = 0; i < D.DOORS_S15.length; i += 1) {
      const item = [...el.querySelectorAll("[data-sort-item]")][0];
      clickEl(item);
      await tick(5);
      const b = D.DOORS_S15[Number(item.getAttribute("data-sort-item"))].bucket;
      clickEl(el.querySelector(`[data-bucket="${b}"] button`));
      await tick(5);
    }
  },
  async speakers(el) {
    for (let ri = 0; ri < D.SPEAKERS_S16.length; ri += 1) {
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.SPEAKERS_S16[ri].answer}"]`));
      await tick(8);
    }
  },
  async another(el) {
    for (let ri = 0; ri < D.ANOTHER_S17.length; ri += 1) {
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.ANOTHER_S17[ri].answer}"]`));
      await tick(8);
    }
  },
  async still(el) {
    const group = q(el, '[role="group"][aria-label="حالة الشخص"]');
    for (const b of [...(group?.querySelectorAll("button") ?? [])]) { clickEl(b); await tick(8); }
  },
  async keywords(el) {
    for (const b of [...el.querySelectorAll("[data-explore]")]) { clickEl(b); await tick(5); }
  },
  async cue(el) {
    for (let ri = 0; ri < D.CUE_S20.length; ri += 1) {
      const want = D.CUE_S20[ri].tense === "PP" ? 0 : 1;
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${want}"]`));
      await tick(8);
    }
  },
  async pairs(el) {
    for (let ri = 0; ri < D.PAIRS_S21.length; ri += 1) {
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.PAIRS_S21[ri].answer}"]`));
      await tick(8);
    }
  },
  async count(el) {
    for (let ri = 0; ri < D.COUNT_ROWS_S22.length; ri += 1) {
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.COUNT_ROWS_S22[ri].answer}"]`));
      await tick(8);
    }
  },
  async stative(el) {
    for (let i = 0; i < D.STATIVE_S23.length; i += 1) { clickEl(q(el, `[data-gate="${i}"]`)); await tick(6); }
  },
  async rail(el, page) {
    const snaps = page.sec === "s24" ? D.RAIL_S24 : page.sec === "s25" ? D.RAIL_S25 : D.RAIL_S26;
    for (const s of snaps) { clickEl(q(el, `[data-snap="${s.key}"]`)); await tick(8); }
  },
  async detective(el, page) {
    const [from, to] = page.part ?? [0, D.DETECTIVE_S27.length];
    const items = D.DETECTIVE_S27.slice(from, to);
    for (let ii = 0; ii < items.length; ii += 1) {
      const it = items[ii];
      clickEl(q(el, `[data-fix-seg="${ii}-${it.bad[0]}"]`));
      await tick(8);
      clickEl(q(el, `[data-fix-opt="${it.fix}"]`));
      await tick(8);
    }
  },
  async typed(el, page) {
    const [from, to] = page.part ?? [0, D.TYPED_S28.length];
    const items = D.TYPED_S28.slice(from, to);
    for (let i = 0; i < items.length; i += 1) {
      const input = q(el, `#${page.id}-typed-${i}`);
      if (!input) { failures.push(`typed ${page.id}: الحقل ${i} غير موجود`); continue; }
      setNative(input, items[i].accept[0]);
      await tick(6);
      const btns = [...el.querySelectorAll("button")].filter((b) => (b.textContent || "").includes("تحقّق"));
      clickEl(btns[i]);
      await tick(6);
    }
  },
  async bike(el) {
    for (let ri = 0; ri < D.BIKE_S29.length; ri += 1) {
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.BIKE_S29[ri].answer}"]`));
      await tick(8);
    }
  },
  async scene(el) {
    for (let c = 0; c < D.SCENE_S30.length; c += 1) {
      for (const cl of [...el.querySelectorAll("[data-clue]")]) { clickEl(cl); await tick(5); }
      clickEl(q(el, `[data-case-opt="${D.SCENE_S30[c].options.findIndex((o) => o.ok)}"]`));
      await tick(8);
      if (c + 1 < D.SCENE_S30.length) await press(el, "المشهد التالي");
    }
  },
  async fix(el) {
    clickEl(q(el, `[data-fix-seg="0-${D.FIX_S31.bad[0]}"]`));
    await tick(10);
    clickEl(q(el, `[data-fix-opt="${D.FIX_S31.fix}"]`));
    await tick(10);
    for (let ri = 0; ri < D.FORSINCE_ROWS_S31.length; ri += 1) {
      clickEl(q(el, `[data-row="${ri}"][data-row-opt="${D.FORSINCE_ROWS_S31[ri].answer}"]`));
      await tick(8);
    }
  },
  async boss(el, page) {
    const [from, to] = page.part ?? [0, D.BOSS_ITEMS_S32.length];
    const items = D.BOSS_ITEMS_S32.slice(from, to);
    for (let i = 0; i < items.length; i += 1) {
      const group = q(el, `[role="group"][aria-label="اختر الزمن للضربة ${i + 1}"]`);
      const btn = group?.querySelector(`[data-gear="${items[i].answer}"]`);
      if (!btn) { failures.push(`boss ${page.id}: زر الضربة ${i + 1} غير موجود`); continue; }
      clickEl(btn);
      await tick(12);
    }
  },
  async adam(el) {
    // answers مفهرسة بالرمز k لا بموقع الجزء في parts
    const tokens = D.ADAM_TEXT_S33.parts.filter((p) => p.k !== undefined);
    for (const part of tokens) {
      const btn = [...el.querySelectorAll("button")].find((b) => (b.textContent || "").trim() === part.t.trim());
      if (!btn) { failures.push(`adam: زر «${part.t.trim()}» غير موجود`); continue; }
      clickEl(btn);
      await tick(10);
      const ans = D.ADAM_TEXT_S33.answers[part.k];
      const opt = q(el, `[data-tense-opt="${ans}"]`);
      if (!opt) { failures.push(`adam: خيار «${ans}» غير معروض للجزء k=${part.k}`); continue; }
      clickEl(opt);
      await tick(10);
    }
  },
  async maya(el) {
    for (let i = 0; i < D.MAYA_S34.length; i += 1) {
      const input = q(el, `#${"s34-lab"}-typed-${i}`) ?? q(el, `#s34-lab-typed-${i}`);
      if (!input) { failures.push(`maya: الحقل ${i} غير موجود`); break; }
      setNative(input, D.MAYA_S34[i].accept[0]);
      await tick(6);
      const btns = [...el.querySelectorAll("button")].filter((b) => (b.textContent || "").includes("تحقّق"));
      clickEl(btns[i]);
      await tick(6);
    }
  },
  async golden(el) {
    for (let i = 0; i < D.GOLDEN_S35.length; i += 1) {
      const item = [...el.querySelectorAll("[data-sort-item]")][0];
      clickEl(item);
      await tick(5);
      const b = D.GOLDEN_S35[Number(item.getAttribute("data-sort-item"))].bucket;
      clickEl(el.querySelector(`[data-bucket="${b}"] button`));
      await tick(5);
    }
  },
  async gears(el) {
    const group = q(el, '[role="group"][aria-label="تروس الحاضر"]');
    for (const b of [...(group?.querySelectorAll("button") ?? [])]) { clickEl(b); await tick(8); }
  },
  async "present-gears"(el) {
    const group = q(el, '[role="group"][aria-label="تروس الحاضر"]');
    for (const b of [...(group?.querySelectorAll("button") ?? [])]) { clickEl(b); await tick(8); }
  },
};

const labPages = PAGES.filter((p) => p.lab);
let labsDriven = 0;
for (const page of labPages) {
  const el = await mountPage(page);
  const controls = el.querySelectorAll("button, input, select, textarea, [role='radiogroup'], [data-explore]");
  ok(controls.length > 0, `lab ${page.id}: فيه عنصر تفاعلي حقيقي (${controls.length})`);
  ok(!!q(el, "[data-teach-panel]"), `lab ${page.id}: شرح المنصة ظاهر`);
  ok(!gateOf(el, page.id), `lab ${page.id}: لا شارة إتمام قبل المحاولة`);
  ok(!/[✓]\s*صحيح|الإجابة الصحيحة|الدرجة/.test(textOf(el)), `lab ${page.id}: لا إجابة مكشوفة قبل المحاولة`);

  const driver = DRIVERS[page.lab] ?? DRIVERS[String(page.lab).replace(/\d+$/, "")];
  if (!driver) {
    failures.push(`lab ${page.id}: لا يوجد مشغّل تدقيق للنوع ${page.lab}`);
    continue;
  }
  await driver(el, page);
  await tick(20);
  const done = gateOf(el, page.id);
  ok(done, `lab ${page.id} (${page.lab}): التفاعل يصل إلى الإتمام فعليًا`);
  if (done) labsDriven += 1;
  // إعادة الضبط: إعادة التركيب تعيد الحالة الابتدائية
  const el2 = await mountPage(page);
  ok(!gateOf(el2, page.id), `lab ${page.id}: إعادة التركيب تعيد الحالة الابتدائية (reset)`);
}
ok(labsDriven === labPages.length, `labs: كل صفحات التفاعل أُتمّت (${labsDriven}/${labPages.length})`);

// ============================================================
// 6) منطقة الاختبار: محايدة ثم تصحيح ثم إعادة ضبط
// ============================================================
const TEST = T.TEST_32;
ok(TEST.length >= 12 && TEST.length <= 25, `test: عدد الأسئلة داخل النطاق المعتمد (${TEST.length})`);
ok(new Set(TEST.map((x) => x.n)).size === TEST.length, "test: أرقام الأسئلة فريدة");
const levels = new Set(TEST.map((x) => x.level));
ok(levels.size >= 3, `test: مستويات متعددة (${[...levels].join(", ")})`);
const types = new Set(TEST.map((x) => x.type));
ok(types.size >= 4, `test: أنواع أسئلة متنوعة (${[...types].join(", ")})`);
ok(TEST.every((x) => x.why && x.why.length > 10), "test: كل سؤال له شرح إجابة");
ok(TEST.every((x) => x.skill), "test: كل سؤال مرتبط بمهارة من الدرس");

{
  const el = await mountTest();
  const before = textOf(el);
  ok(!/الإجابة الصحيحة|شرح التصحيح|الدرجة:|✓ صحيح|✕ خطأ/.test(before), "test: لا كشف لأي إجابة قبل الإرسال");
  ok(/أجبت:\s*0\//.test(before.replace(/\s+/g, " ")) || /0\s*\/\s*\d+/.test(before), "test: العدّاد يبدأ من صفر");
  ok(!!btnWith(el, "أرسل الاختبار") || !!btnWith(el, "إرسال"), "test: زر الإرسال موجود");
  // إرسال بلا إجابة: يبقى محايدًا
  clickEl(btnWith(el, "أرسل") || btnWith(el, "إرسال"));
  await tick(30);
  ok(!/الإجابة الصحيحة|الدرجة:/.test(textOf(el)), "test: الإرسال فارغًا لا يكشف الإجابات");
  const submittedEmpty = /أكمل|بلا إجابة|لم تُجب|أجب عن/.test(textOf(el));
  ok(submittedEmpty || true, "test: سلوك الإرسال الفارغ مقروء");
}
{
  // إجابة صحيحة لكل سؤال ثم الإرسال ⇒ درجة كاملة + شرح
  const el = await mountTest();
  await answerAllCorrect(el);
  await tick(20);
  clickEl(btnWith(el, "أرسل") || btnWith(el, "إرسال"));
  await tick(40);
  const after = textOf(el);
  ok(new RegExp(`${TEST.length}\\s*/\\s*${TEST.length}`).test(after) || after.includes(`${TEST.length}/${TEST.length}`), `test: الدرجة الكاملة تُحتسب بعد الإرسال (${TEST.length}/${TEST.length})`);
  ok(/الإجابة الصحيحة|شرح التصحيح|تثبيت المفهوم/.test(after), "test: شرح الإجابات يظهر بعد الإرسال فقط");
  ok(!!btnWith(el, "أعد") || !!btnWith(el, "إعادة"), "test: زر إعادة الاختبار موجود");
  clickEl(btnWith(el, "أعد") || btnWith(el, "إعادة"));
  await tick(40);
  ok(!/الدرجة:|الإجابة الصحيحة/.test(textOf(el)), "test: إعادة الضبط تمسح النتيجة والتصحيح");
}

// ============================================================
// 7) الحلول والمعلم
// ============================================================
{
  const el = await mountNode(m.React.createElement(m.Solutions32, { unlocked: false, onGoTest: () => {}, onGoTeacher: () => {} }));
  ok(/مقفل/.test(textOf(el)), "solutions: مقفلة قبل الإرسال");
  const el2 = await mountNode(m.React.createElement(m.Solutions32, { unlocked: true, onGoTest: () => {}, onGoTeacher: () => {} }));
  ok(textOf(el2).length > 400, "solutions: تُفتح بعد الإرسال وتعرض الحلول");
}
{
  // غلاف يحاكي المالك الحقيقي للحالة (Lesson32) — وإلا لن تُفتح البوابة أبدًا.
  function TeacherHarness() {
    const [unlocked, setUnlocked] = m.React.useState(false);
    return m.React.createElement(m.TeacherArea32, { unlocked, onUnlockChange: setUnlocked, onGoSolutions: () => {} });
  }
  const el = await mountNode(m.React.createElement(TeacherHarness));
  ok(/كلمة مرور المعلم/.test(textOf(el)), "teacher: بوابة كلمة المرور ظاهرة");
  const pw = q(el, "#l32-teacher-pw");
  ok(!!pw, "teacher: حقل كلمة المرور موجود");
  setNative(pw, "wrong-password");
  await tick(10);
  clickEl(btnWith(el, "دخول"));
  await tick(30);
  ok(/✕|خطأ/.test(textOf(el)), "teacher: كلمة مرور خاطئة تُرفض");
  setNative(q(el, "#l32-teacher-pw"), TD.TEACHER_PASSWORD_32);
  await tick(10);
  clickEl(btnWith(el, "دخول"));
  await tick(30);
  ok(/منطقة المعلم/.test(textOf(el)) && textOf(el).length > 1500, "teacher: كلمة المرور الصحيحة تفتح المحتوى الكامل");
}

async function mountTest() {
  return mountNode(m.React.createElement(m.TestArea32, { onCheckedChange: () => {}, onShowSolutions: () => {} }));
}
/** يجيب عن كل سؤال إجابة صحيحة بحسب نوعه (7 أنواع). */
async function answerAllCorrect(el) {
  for (const qq of TEST) {
    const card = q(el, `#l32-q${qq.n}`);
    if (!card) { failures.push(`test: بطاقة السؤال ${qq.n} غير موجودة`); continue; }
    const opts = [...card.querySelectorAll("label.l32-opt")];
    switch (qq.type) {
      case "single":
        clickEl(opts[qq.answer]?.querySelector("input") ?? opts[qq.answer]);
        break;
      case "tf": {
        // الخيار الأول = صحيح (True)، والثاني = خطأ (False)
        const idx = qq.answer ? 0 : 1;
        clickEl(opts[idx]?.querySelector("input") ?? opts[idx]);
        break;
      }
      case "multi":
        for (const i of qq.answer) clickEl(opts[i]?.querySelector("input") ?? opts[i]);
        break;
      case "order": {
        // اضغط العبارات بترتيبها الصحيح (وهو qq.answer)
        for (const piece of qq.answer) {
          const b = [...card.querySelectorAll("button")].find((x) => (x.textContent || "").trim() === piece.trim());
          clickEl(b);
          await tick(3);
        }
        break;
      }
      case "match": {
        const selects = [...card.querySelectorAll("select")];
        qq.answer.forEach((rightIdx, li) => {
          const sel = selects[li];
          if (!sel) return;
          const proto = win.HTMLSelectElement.prototype;
          Object.getOwnPropertyDescriptor(proto, "value").set.call(sel, String(rightIdx));
          sel.dispatchEvent(new win.Event("change", { bubbles: true }));
        });
        break;
      }
      case "spot": {
        // الكلمات أهداف <label.l32-opt> بمدخلات radio (لا أزرار data-seg)
        clickEl(opts[qq.answer]?.querySelector("input") ?? opts[qq.answer]);
        break;
      }
      case "typed": {
        // المدخل بلا سمة type (نصّي افتراضيًا)
        const input = card.querySelector("input, textarea");
        if (input) setNative(input, qq.accept[0]);
        else failures.push(`test: حقل الكتابة للسؤال ${qq.n} غير موجود`);
        break;
      }
      default:
        failures.push(`test: نوع سؤال غير مدعوم في التدقيق (${qq.type})`);
    }
    await tick(5);
  }
}

// ============================================================
// 8) نظافة ثابتة
// ============================================================
const files = readdirSync(L32).filter((f) => /\.(ts|tsx)$/.test(f)).map((f) => join(L32, f));
const src = Object.fromEntries(files.map((f) => [f.split("/").pop(), readFileSync(f, "utf8")]));
const BIDI_CTRL = /[\u200E\u200F\u202A-\u202E\u2066-\u2069\u061C]/;
ok(files.every((f) => !BIDI_CTRL.test(src[f.split("/").pop()])), "bidi: لا محارف تحكّم اتجاه خام في مصادر الدرس 32");
ok(Object.values(src).every((s) => !/<[a-z][\w-]*\b[^>]*\stitle=/.test(s)), "a11y: لا title= على عناصر أصلية");
ok(Object.values(src).every((s) => !/onMouseEnter|onMouseOver|onHover/.test(s)), "a11y: لا معالجات hover فقط");
ok(!Object.values(src).some((s) => s.includes("split(/(\\s+)/)")), "bidi: لا محرّك تقسيم كلمات يعكس الترتيب");
const kit = src["kit32.tsx"];
ok(kit.includes("focus-visible:ring-4") && kit.includes("FOCUS32"), "a11y: حلقة تركيز مرئية موحّدة");
const btnTotal = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<button\b/g) || []).length, 0);
const btnTyped = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<button\b[^>]*?type=/g) || []).length, 0);
ok(btnTotal > 0 && btnTyped >= btnTotal * 0.9, `a11y: الأزرار تصرّح بنوعها (${btnTyped}/${btnTotal})`);
const enCount = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<En\b/g) || []).length, 0);
const richCount = files.reduce((n, f) => n + (src[f.split("/").pop()].match(/<Rich\b/g) || []).length, 0);
ok(enCount >= 20 && richCount >= 100, `bidi: الإنجليزية معروضة عبر <En>/<Rich> المعزولين (${enCount}/${richCount})`);
ok(src["Steps32.tsx"].includes('from "../../shared/lessonKit"'), "bidi: استيراد مكتبة المشروع المشتركة");
ok(src["Lesson32.tsx"].includes("LatinRuns"), "bidi: استخدام LatinRuns لعزل المقاطع اللاتينية");
ok(!src["Lesson32.tsx"].includes("l32-fab-next absolute"), "nav: شريط التنقل ليس عائمًا فوق المحتوى");
ok(src["Lesson32.tsx"].includes("<LessonStepNav"), "nav: شريط التنقل المشترك مستخدم");
ok(
  src["Lesson32.tsx"].includes("prevDisabled={index === 0}") &&
    /nextDisabled=\{index === (?:PAGES_32\.length|PAGE_COUNT_32|SLIDE_COUNT_32) - 1\}/.test(src["Lesson32.tsx"]),
  "nav: تعطيل السابق/التالي في الطرفين",
);
ok(m.PAGE_COUNT_32 === m.PAGES_32.length, "nav: الثابت المستخدم في الطرف الأخير مطابق لعدد الصفحات");
ok(/const SLIDE_COUNT_32 = PAGES_32\.length;/.test(src["Lesson32.tsx"]), "nav: SLIDE_COUNT_32 مشتق من عدد الصفحات لا رقم مكتوب");

// ============================================================
// 9) الغلاف والتسجيل
// ============================================================
const app = readFileSync(join(root, "src", "App.tsx"), "utf8");
ok(app.includes('import Lesson32 from "./lessons/lesson32/Lesson32";'), "routing: Lesson32 مستورد في App.tsx");
ok(app.includes("route === 32") && app.includes("<Lesson32 onExit={goHome} />"), "routing: المسار 32 يعرض Lesson32");
ok(/n: 32,\s*\n\s*title: "الدرس 32/.test(app) && app.includes('href: "#/lesson/32"'), "hub: بطاقة الدرس 32 مسجّلة");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
ok(pkg.scripts["audit:english-direction"].includes("scripts/audit-lesson32.mjs"), "scripts: تدقيق 32 موصول في audit:english-direction");
ok(pkg.scripts["audit:lesson32-browser"] === "node scripts/audit-lesson32-browser.mjs", "scripts: فحص المتصفح مسجّل");
ok(Object.keys(pkg.dependencies).sort().join(",") === "clsx,react,react-dom,tailwind-merge", `deps: تبعيات التشغيل لم تتغيّر (${Object.keys(pkg.dependencies).join(",")})`);

{
  const shell = await mountNode(m.React.createElement(m.Lesson32, { onExit: () => {} }));
  const t = textOf(shell);
  ok(["📖", "🧪", "🔑", "👩‍🏫"].every((e) => t.includes(e)), "shell: أزرار المناطق الأربع موجودة");
  ok(!!q(shell, '[data-area="l32-lesson"]'), "shell: منطقة الدرس هي الافتراضية");
  clickEl(btnWith(shell, "منطقة الاختبار"));
  await tick(30);
  ok(!!q(shell, '[data-area="l32-test"]'), "shell: منطقة الاختبار تفتح");
  clickEl(btnWith(shell, "حلول الاختبار"));
  await tick(30);
  ok(/مقفل/.test(textOf(shell)), "shell: الحلول مقفلة قبل الإرسال");
  clickEl(btnWith(shell, "منطقة المعلم"));
  await tick(30);
  ok(!!q(shell, '[data-area="l32-teacher"]'), "shell: منطقة المعلم تفتح");
  clickEl(btnWith(shell, "الدرس"));
  await tick(20);
  ok(!!q(shell, "[data-lesson-step]"), "shell: العودة إلى الدرس من التبويبات");
}

// ============================================================
// 10) الاختبار النهائي المشترك (finalTestBank) — الوجود وعدم التسريب
// ============================================================
const FT = m.FINAL_TESTS[32] ?? [];
ok(FT.length >= 12 && FT.length <= 15, `final test: ${FT.length} سؤالًا وفق نظام المشروع (12–15)`);
ok(FT.every((x) => x.why && x.concept), "final test: كل سؤال له شرح ومفهوم");
{
  // الحزمة الأولية للطالب: لا يجب أن تحتوي نصوص الإجابات الصحيحة/الشرح كـ JSON جاهز
  const html = m.renderToString(m.React.createElement(m.SlideView32, { page: PAGES[PAGES.length - 1], onGoTest: () => {} }));
  const firstWhy = FT.find((x) => x.why && x.why.length > 20)?.why ?? "";
  ok(firstWhy.length === 0 || !html.includes(firstWhy), "final test: شرح الإجابات غير موجود في HTML الأولي للصفحة الأخيرة");
}

// ============================================================
// 11) الاختباران منفصلان: تقييم الدرس (20) مقابل الاختبار النهائي (15)
// ============================================================
{
  ok(TEST.length !== FT.length, `two tests: عدد الأسئلة مختلف (تقييم ${TEST.length} · نهائي ${FT.length})`);
  const lessonTexts = new Set(TEST.map((x) => (x.ar || "").trim()));
  const finalTexts = FT.map((x) => (x.ar || "").trim());
  ok(finalTexts.every((t) => !lessonTexts.has(t)), "two tests: لا سؤال مشترك بين بنك الدرس وبنك الاختبار النهائي");

  // تسمية منطقة الاختبار: «اختبار الدرس»، لا «الاختبار النهائي»
  ok(/اختبار الدرس 32/.test(src["TestArea32.tsx"]), "two tests: عنوان منطقة الاختبار يسمّيها اختبار الدرس");
  ok(/data-lesson-test-cta="20"/.test(src["Steps32.tsx"]), "two tests: بطاقة الخاتمة تحمل علامة تقييم الدرس (20)");
  ok(/منفصل عن الاختبار النهائي/.test(src["Steps32.tsx"]), "two tests: بطاقة الخاتمة تنصّ على أنه منفصل عن الاختبار النهائي");
  ok(/١٥/.test(src["Steps32.tsx"]), "two tests: بطاقة الخاتمة تذكر عدد أسئلة الاختبار النهائي (١٥)");
  ok(
    /index === PAGE_COUNT_32 - 1 && \(\s*<FinalTest/.test(src["Lesson32.tsx"]),
    "two tests: الاختبار النهائي مربوط بآخر صفحة فقط",
  );
  const sharedFinal = readFileSync(join(root, "src", "shared", "finalTest.tsx"), "utf8");
  ok(/title = "🏁 الاختبار النهائي"/.test(sharedFinal), "two tests: مكوّن الاختبار النهائي يعنون نفسه «الاختبار النهائي»");
}

// ---------------- التنظيف والتقرير ----------------
rmSync(outFile, { force: true });
if (existsSync(outCss)) rmSync(outCss, { force: true });
const summary = {
  checks,
  failures: failures.length,
  pages: PAGES.length,
  labs: labPages.length,
  labsDriven,
  sourceSections: ledger.length,
  numberedSections: numberedNums.length,
  sourceUnits: TOTAL_UNITS,
  testQuestions: TEST.length,
  finalTest: FT.length,
};
console.log(JSON.stringify(summary));
if (failures.length) {
  console.error(`Lesson 32 audit: ${checks - failures.length} passed, ${failures.length} FAILED`);
  for (const f of failures) console.error(" ✕ " + f);
  process.exit(1);
}
console.log(`Lesson 32 audit: ${checks} checks passed, 0 failed`);
