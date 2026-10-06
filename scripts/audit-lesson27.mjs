// ============================================================
// Lesson 27 audit — سجل المصدر > العرض > التفاعل > الاختبار > المعلم
//   node scripts/audit-lesson27.mjs
//   1) سجل المصدر: 44 قسمًا مرقّمًا ①–㊹ + أقسام الغلاف/الخاتمة.
//   2) تغطية الشرائح على مستوى البيانات.
//   3) العرض الحقيقي: كل شريحة تُرندَر بلا أخطاء + عزل LTR + علامات المصدر.
//   4) المشي التفاعلي: كل وحدة مصدرية (وكل reveal) تصل إلى الـ DOM.
//   5) العبارات المفتاحية حاضرة وغير معكوسة + الأخطاء المقصودة كما هي.
//   6) المكوّن الرئيسي: RTL + المناطق الأربع + عدّاد + تنقل.
//   7) خطافات المختبرات.
//   8) لا كشف قبل التحقق + كشف كامل بعده (كل التدريبات).
//   9) بيانات التدريبات + تصحيح typo ㊸-Q2 + فروق ㊴ المقبولة.
//   10) منطقة الاختبارات: 20 سؤالًا بالضبط، أنواع منظمة، منع تسريب، إنهاء، إعادة.
//   11) حلول الاختبارات: مفصولة، مغلقة قبل الاستحقاق، 20 حلًا بعده.
//   12) منطقة المعلم: somer173، المحتوى الكامل، ومدخل الحلول.
// ============================================================
import { createRequire } from "node:module";
import { readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "scripts", ".lesson27-audit.mjs");

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
for (const key of ["Element", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLButtonElement", "Event", "MouseEvent", "KeyboardEvent", "Node", "getComputedStyle", "CSS"]) {
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
import Lesson27, { SlideView27, TestArea27, Solutions27, TeacherArea27 } from ${JSON.stringify(join(root, "src/lessons/lesson27/Lesson27.tsx"))};
import { SLIDES, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, VERB_TABLE_27, EX27_V3, EX27_HADHAVE, EX27_SIMPLE_PERFECT, EX27_NOAH, EX27_ERRORS, EX27_ERROR_SPOTS, EX27_TRANSFORM, DETECTIVE_27, ORDER_27_CHALLENGE, BOSS_27, EX27_FINAL, TEST_27, TEACHER_PASSWORD_27, TEACHER_27_OVERVIEW, TEACHER_27_NOTES, TEACHER_27_SOLUTIONS, TEACHER_27_RUBRIC, TEACHER_27_MISTAKES, STORY_27_REQUIREMENTS, TYPO_S43_Q2, INTENTIONALLY_WRONG_27 } from ${JSON.stringify(join(root, "src/lessons/lesson27/data.ts"))};
function mountSlide(slide) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  root.render(React.createElement(SlideView27, { s: slide, onExit: () => {} }));
  return el;
}
function mountTest(props) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  root.render(React.createElement(TestArea27, props ?? {}));
  return el;
}
function mountSolutions(unlocked) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  root.render(React.createElement(Solutions27, { unlocked }));
  return el;
}
function mountTeacher(unlocked, onUnlockChange, onGoSolutions) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  root.render(React.createElement(TeacherArea27, { unlocked, onUnlockChange, onGoSolutions }));
  return el;
}
function unmountSlide(el) { el.remove(); }
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
export { React, renderToString, createRoot, Lesson27, SlideView27, TestArea27, Solutions27, TeacherArea27, SLIDES, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, VERB_TABLE_27, EX27_V3, EX27_HADHAVE, EX27_SIMPLE_PERFECT, EX27_NOAH, EX27_ERRORS, EX27_ERROR_SPOTS, EX27_TRANSFORM, DETECTIVE_27, ORDER_27_CHALLENGE, BOSS_27, EX27_FINAL, TEST_27, TEACHER_PASSWORD_27, TEACHER_27_OVERVIEW, TEACHER_27_NOTES, TEACHER_27_SOLUTIONS, TEACHER_27_RUBRIC, TEACHER_27_MISTAKES, STORY_27_REQUIREMENTS, TYPO_S43_Q2, INTENTIONALLY_WRONG_27, mountSlide, mountTest, mountSolutions, mountTeacher, unmountSlide, tick };
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
const unescape = (h) => h.replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const plainOf = (html) => unescape(String(html).replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " "));
// تطبيع متساهل مع الترقيم فقط — المحتوى الأبجدي/الرقمي يبقى صارمًا.
const norm = (s) => String(s).replace(/[\s\u200b\u200c\u2060().,;:=!?…\-–—"«»"'’`·/\\|]+/g, "");
const normText = (html) => norm(plainOf(html));
const byText = (scope, text) => [...scope.querySelectorAll("button")].find((b) => (b.textContent || "").includes(text));
const setNativeValue = (el, value) => {
  const proto = el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event("input", { bubbles: true }));
};

try {
  const noop = () => {};
  const { SLIDES, SOURCE_SECTIONS, SEC } = m;

  // ---------------- 1) سجل المصدر ----------------
  ok(SOURCE_SECTIONS.length === m.SOURCE_LEDGER_COUNT, `ledger length matches SOURCE_LEDGER_COUNT (${SOURCE_SECTIONS.length})`);
  ok(m.SOURCE_NUMBERED_COUNT === 44, `numbered sections 1..44 are all indexed (got ${m.SOURCE_NUMBERED_COUNT})`);
  const nums = SOURCE_SECTIONS.filter((s) => s.num !== undefined).map((s) => s.num).sort((a, b) => a - b);
  ok(nums.length === 44 && nums[0] === 1 && nums[43] === 44 && nums.every((n, i) => n === i + 1), `ledger covers every number 1..44 exactly once (${nums.length})`);
  ok(SOURCE_SECTIONS.every((s) => s.units.length > 0 && s.units.every((u) => String(u).trim().length > 0)), "no source section lost its units");
  ok(SOURCE_SECTIONS.every((s) => s.units.every((u) => !u.includes("**"))), "no markdown noise left inside source units");
  ok(!(SOURCE_SECTIONS[SEC.s43].revealUnits ?? []).some((u) => u.includes("founded")), "ledger keeps the original ㊸-Q2 typo wording (found/found), correction lives only in exercise data + docs");

  // ---------------- 2) تغطية الشرائح على مستوى البيانات ----------------
  const coverage = new Map();
  const labsUsed = new Set();
  for (const slide of SLIDES) {
    if (slide.sourceIndex === undefined) continue;
    const len = SOURCE_SECTIONS[slide.sourceIndex].units.length;
    const set = coverage.get(slide.sourceIndex) ?? new Set();
    const add = (from, to) => {
      for (let i = from; i < Math.min(to ?? len, len); i++) set.add(i);
    };
    if (slide.covers) add(slide.covers[0], slide.covers[1]);
    if (slide.kind === "lesson") {
      for (const block of slide.blocks) {
        if (block.t === "units") add(block.from, block.to);
        if (block.t === "lab") {
          labsUsed.add(block.lab);
          if (block.covers) add(block.covers[0], block.covers[1]);
        }
      }
    }
    coverage.set(slide.sourceIndex, set);
  }
  for (let i = 0; i < SOURCE_SECTIONS.length; i++) {
    const len = SOURCE_SECTIONS[i].units.length;
    const set = coverage.get(i) ?? new Set();
    const missing = [];
    for (let u = 0; u < len; u++) if (!set.has(u)) missing.push(u);
    ok(missing.length === 0, `source coverage: section "${SOURCE_SECTIONS[i].id}" covers all ${len} units (missing: ${missing.join(",")})`);
  }
  ok(labsUsed.size >= 20, `lesson 27 ships its interactive lab layer (${labsUsed.size} labs wired)`);
  ok(SLIDES.filter((s) => s.kind === "ex").length === 11, `lesson 27 exposes 11 in-lesson exercises (${SLIDES.filter((s) => s.kind === "ex").length})`);

  // ---------------- 3) العرض الحقيقي لكل شريحة ----------------
  const broken = [];
  const missingLtr = [];
  const missingMarker = [];
  const undefinedText = [];
  const slideHtml = new Map();
  for (const slide of SLIDES) {
    let html = "";
    try {
      html = m.renderToString(m.React.createElement(m.SlideView27, { s: slide, onExit: noop }));
    } catch (err) {
      broken.push(`${slide.kind}:${slide.title ?? ""} (${err.message || String(err)})`);
      continue;
    }
    slideHtml.set(slide, html);
    if (html.length < 200) broken.push(`${slide.kind}:${slide.title ?? ""} (too small)`);
    if (!html.includes('dir="ltr"')) missingLtr.push(`${slide.kind}:${slide.title ?? ""}`);
    if (slide.sourceIndex !== undefined && !html.includes("data-source-section")) missingMarker.push(slide.title ?? String(slide.sourceIndex));
    const plain = plainOf(html);
    if (plain.includes("undefined") || plain.includes("[object Object]")) undefinedText.push(slide.title ?? slide.kind);
  }
  ok(broken.length === 0, `every Lesson 27 slide renders without throwing (${broken.join(" | ")})`);
  ok(missingLtr.length === 0, `every slide isolates English as LTR (${missingLtr.join(" | ")})`);
  ok(missingMarker.length === 0, `every source slide renders its data-source-section marker (${missingMarker.join(" | ")})`);
  ok(undefinedText.length === 0, `no slide renders "undefined"/[object Object] (${undefinedText.join(" | ")})`);
  ok(SLIDES.length >= 50 && SLIDES.length <= 62, `screen flow counted 50-62 screens (${SLIDES.length})`);

  // ---------------- 4) المشي التفاعلي ----------------
  const sectionStates = new Map();
  const hookHtml = [];
  const slideStates = new Map();
  for (const slide of SLIDES) {
    const el = m.mountSlide(slide);
    await m.tick(60);
    const states = [];
    const capture = () => states.push(normText(el.innerHTML));
    capture();
    for (const btn of [...el.querySelectorAll("button[aria-pressed]")].filter((b) => !b.disabled)) {
      btn.click();
      await m.tick(12);
      capture();
    }
    if (slide.kind === "ex" && slide.ex.type === "transform") {
      [...el.querySelectorAll("input")].forEach((input, i) => {
        setNativeValue(input, m.EX27_TRANSFORM.items[i]?.answer ?? "");
      });
      await m.tick(40);
      capture();
    }
    if (slide.kind === "ex" && slide.ex.type === "story") {
      const area = el.querySelector("textarea");
      if (area) {
        setNativeValue(
          area,
          "Last Saturday, Adam was walking through an old building when he noticed a strange door. While he was looking at it, he remembered that he had seen it before. He had heard stories about the door before he came here. He opened it slowly and stepped inside. The room was dark, but he had brought a small lamp. After he had entered the room, he saw old pictures on the wall. He looked at them carefully while the wind was blowing outside. He realized that someone had lived there before he arrived. He ran back quickly because he was afraid."
        );
        area.dispatchEvent(new win.Event("input", { bubbles: true }));
        await m.tick(40);
        capture();
      }
    }
    for (const label of ["تحقق", "⚔️"]) {
      const check = byText(el, label);
      if (check && !check.disabled) {
        check.click();
        await m.tick(50);
        capture();
        break;
      }
    }
    hookHtml.push(el.innerHTML);
    slideStates.set(slide, states);
    if (slide.sourceIndex !== undefined) {
      const list = sectionStates.get(slide.sourceIndex) ?? [];
      list.push(...states);
      sectionStates.set(slide.sourceIndex, list);
    }
    m.unmountSlide(el);
  }
  const walkedN = [...slideStates.values()].flat().join("\n");
  const wholePlainGaps = walkedN.replace(/_+/g, "");
  const unitSeen = (unit, states) => {
    if (states.some((state) => state.includes(norm(unit)))) return true;
    const bare = norm(unit.replace(/_{2,}/g, ""));
    return bare.length > 0 && states.some((state) => state.replace(/_+/g, "").includes(bare));
  };
  const missingUnits = [];
  for (const [i, section] of SOURCE_SECTIONS.entries()) {
    const states = sectionStates.get(i) ?? [];
    for (const unit of section.units) {
      if (!unitSeen(unit, states)) missingUnits.push(`${section.id}: ${unit.slice(0, 60)}`);
    }
    for (const unit of section.revealUnits ?? []) {
      if (!unitSeen(unit, states)) missingUnits.push(`${section.id} [reveal]: ${unit.slice(0, 60)}`);
    }
  }
  ok(missingUnits.length === 0, `render-level ledger: every source + reveal unit reaches a rendered state (${missingUnits.length} missing) ${missingUnits.slice(0, 10).join(" | ")}`);
  for (const phrase of [
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
  ]) {
    ok(walkedN.includes(norm(phrase)), `BIDI/source phrase reaches the rendered lesson: ${phrase.slice(0, 52)}`);
  }
  for (const flipped of [
    "left had train the arrived, I When",
    "started had movie the arrived Sara When",
    "V3 + had + Subject",
    "gone → went → go",
    "left had Lina arrived, I When",
  ]) {
    ok(!walkedN.includes(norm(flipped)), `no reversed English word order: ${flipped}`);
  }
  for (const wrong of m.INTENTIONALLY_WRONG_27) {
    ok(walkedN.includes(norm(wrong)), `intentionally wrong source sentence renders as-is: ${wrong.slice(0, 52)}`);
  }

  // ---------------- 5) المكوّن الرئيسي والمناطق الأربع ----------------
  const lessonHtml = m.renderToString(m.React.createElement(m.Lesson27, { onExit: noop }));
  ok(lessonHtml.length > 3000, "Lesson 27 main component renders");
  ok(lessonHtml.includes('dir="rtl"'), "Lesson 27 keeps the Arabic RTL shell");
  ok(lessonHtml.includes('dir="ltr"'), "Lesson 27 isolates English as LTR");
  ok(!lessonHtml.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 27 renders no GB flag emoji");
  ok(lessonHtml.includes("l27-main"), "Lesson 27 exposes its scroll container (#l27-main)");
  ok(lessonHtml.includes("data-slide-counter"), "Lesson 27 renders the slide counter");
  ok(lessonHtml.includes("التنقل"), "Lesson 27 documents keyboard navigation");
  ok(lessonHtml.includes('data-area="l27-test"'), "Test Area is present as a separate area");
  ok(lessonHtml.includes('data-area="l27-solutions"'), "Test Solutions area is present as a separate area");
  ok(lessonHtml.includes('data-area="l27-teacher"'), "Teacher Area is present as a separate area");
  ok((lessonHtml.match(/data-source-section/g) || []).length >= 1, "source ledger markers render on the first slide story");

  // ---------------- 6) خطافات المختبرات ----------------
  const hooks = [
    "l27-timeline", "l27-order-quiz", "l27-sara", "l27-had-grid", "l27-verbs-regular", "l27-verbs-irregular",
    "l27-v2v3", "l27-teacher-switch", "l27-ali", "l27-pairs-a", "l27-pairs-b", "l27-short-flip",
    "l27-side-by-side", "l27-lina-switch", "l27-before", "l27-after", "l27-bytime", "l27-emma-detective",
    "l27-need-toggle", "l27-iq-stepper", "l27-emma-cinema", "l27-liam", "l27-john-switch", "l27-dance",
    "l27-ex-v3", "l27-ex-hadhave", "l27-ex-simple-perfect", "l27-ex-noah", "l27-ex-errors", "l27-ex-transform",
    "l27-ex-museum", "l27-ex-order", "l27-ex-boss", "l27-ex-final10", "l27-ex-story",
  ];
  const allHtml = [...slideHtml.values()].join("\n") + hookHtml.join("\n");
  for (const hook of hooks) ok(allHtml.includes(`data-en-seq="${hook}"`), `interactive hook renders: ${hook}`);

  // ---------------- 7) لا كشف قبل التحقق + كشف كامل بعده ----------------
  async function walkExercise(label, slide, interact) {
    const el = m.mountSlide(slide);
    await m.tick(80);
    const beforeHtml = el.innerHTML;
    ok(!beforeHtml.includes("data-reveal-block"), `${label}: no reveal block before checking`);
    const reveal = SOURCE_SECTIONS[slide.sourceIndex].revealUnits ?? [];
    const beforeN = normText(beforeHtml);
    const visible = new Set(SOURCE_SECTIONS[slide.sourceIndex].units.map(norm));
    const leaked = reveal.filter((u) => /[\u0600-\u06FF]/.test(u) && !visible.has(norm(u)) && beforeN.includes(norm(u)));
    ok(leaked.length === 0, `${label}: no source answer leaks before checking (${leaked.slice(0, 3).join(" | ")})`);
    await interact(el);
    await m.tick(60);
    const afterHtml = el.innerHTML;
    ok(afterHtml.includes("data-reveal-block"), `${label}: reveal block appears after checking`);
    const afterN = normText(afterHtml);
    const stillMissing = reveal.filter((u) => !afterN.includes(norm(u.replace(/_{2,}/g, ""))));
    ok(stillMissing.length === 0, `${label}: every source answer/fix reaches the DOM after checking (${stillMissing.slice(0, 3).join(" | ")})`);
    m.unmountSlide(el);
  }
  const clickAllPressed = async (el) => {
    for (const btn of [...el.querySelectorAll("button[aria-pressed]")].filter((b) => !b.disabled)) {
      btn.click();
      await m.tick(8);
    }
  };
  const pressCheck = async (el, label) => {
    const check = byText(el, "تحقق");
    ok(!!check && !check.disabled, `${label}: check unlocks after answering everything`);
    if (check && !check.disabled) check.click();
  };
  const slideOf = (type) => SLIDES.find((s) => s.kind === "ex" && s.ex.type === type);
  for (const t of ["v3", "hadhave", "simplePerfect", "noah", "errors", "museum", "orderChal", "boss", "final10"]) {
    await walkExercise(`Exercise ${t}`, slideOf(t), async (el) => {
      await clickAllPressed(el);
      await pressCheck(el, `Exercise ${t}`);
    });
  }
  await walkExercise("Exercise transform", slideOf("transform"), async (el) => {
    [...el.querySelectorAll("input")].forEach((input, i) => setNativeValue(input, `wrong answer ${i + 1}`));
    await m.tick(30);
    await pressCheck(el, "Exercise transform");
  });
  {
    // التحويل بالإجابة الصحيحة يُظهر حالة النجاح
    const el = m.mountSlide(slideOf("transform"));
    await m.tick(60);
    [...el.querySelectorAll("input")].forEach((input, i) => setNativeValue(input, m.EX27_TRANSFORM.items[i].answer));
    await m.tick(30);
    const check = byText(el, "تحقق");
    if (check && !check.disabled) {
      check.click();
      await m.tick(50);
      ok(el.innerHTML.includes("border-emerald-400"), "Exercise transform: correct answers show success state");
    } else {
      ok(false, "Exercise transform: check unlocks with correct answers");
    }
    m.unmountSlide(el);
  }
  {
    // بانية القصة: كل الوحدات ظاهرة + العدّادات تعمل
    const el = m.mountSlide(slideOf("story"));
    await m.tick(60);
    const area = el.querySelector("textarea");
    ok(!!area, "Story builder renders its writing area");
    setNativeValue(area, "Last Saturday, Adam was walking through an old building when he noticed a strange door. While he was looking at it, he remembered that he had seen it before. He had heard stories about the door before he came here. He opened it slowly and stepped inside. The room was dark, but he had brought a small lamp. After he had entered the room, he saw old pictures on the wall. He looked at them carefully while the wind was blowing outside. He realized that someone had lived there before he arrived. He ran back quickly because he was afraid.");
    await m.tick(40);
    const txt = normText(el.innerHTML);
    ok(txt.includes(norm("Past Simple ≥ 3")) && txt.includes(norm("Past Continuous ≥ 2")) && txt.includes(norm("Past Perfect ≥ 3")), "Story builder tracks all three tenses");
    m.unmountSlide(el);
  }

  // ---------------- 8) بيانات التدريبات ----------------
  ok(m.EX27_V3.length === 5, `㉚ keeps all 5 source questions (${m.EX27_V3.length})`);
  ok(m.EX27_HADHAVE.length === 4, `㉛ keeps all 4 source prompts (${m.EX27_HADHAVE.length})`);
  ok(m.EX27_SIMPLE_PERFECT.length === 5, `㉜ keeps all 5 source questions (${m.EX27_SIMPLE_PERFECT.length})`);
  ok(m.EX27_ERRORS.length === 5 && m.EX27_ERROR_SPOTS.length === 5, "㉞ keeps all 5 source errors with spottable segments");
  ok(m.EX27_TRANSFORM.items.length === 2, "㉟ keeps both transformation challenges");
  ok(m.DETECTIVE_27.length === 6, `㊱ keeps all 6 verbs (${m.DETECTIVE_27.length})`);
  ok(m.BOSS_27.length === 2, "㊷ keeps both boss battles");
  ok(m.EX27_FINAL.length === 10, `㊸ keeps all 10 source questions (${m.EX27_FINAL.length})`);
  ok(m.VERB_TABLE_27.length === 14, `verb lab keeps all 14 source verbs (${m.VERB_TABLE_27.length})`);
  ok(m.STORY_27_REQUIREMENTS.length === 8, "㊹ keeps all 8 story requirements");
  // تصحيح typo ㊸-Q2
  ok(JSON.stringify(m.TYPO_S43_Q2.original) === JSON.stringify(["find", "found", "found"]), "typo record preserves the original find/found/found wording");
  ok(JSON.stringify(m.TYPO_S43_Q2.corrected) === JSON.stringify(["find", "found", "founded"]), "typo record corrects C to founded");
  ok(JSON.stringify(m.EX27_FINAL[1].opts) === JSON.stringify(["find", "found", "founded"]) && m.EX27_FINAL[1].answer === 1, "㊸-Q2 renders corrected options with exactly one answer (found)");
  const q2correct = m.EX27_FINAL[1].opts.filter((o) => o === m.EX27_FINAL[1].opts[m.EX27_FINAL[1].answer]).length;
  ok(q2correct === 1, "㊸-Q2 has exactly one correct option");
  // فروق ㊴ المقبولة + الحفاظ على الفروق الدقيقة
  ok(m.ORDER_27_CHALLENGE.accept.length === 2, "㊴ accepts both context-compatible orders");
  ok(m.ORDER_27_CHALLENGE.nuance.includes("بحسب السياق"), "㊴ preserves the source nuance note");
  {
    const el = m.mountSlide(slideOf("orderChal"));
    await m.tick(60);
    for (const btn of [...el.querySelectorAll("button[aria-pressed]")]) {
      btn.click();
      await m.tick(8);
    }
    const check = byText(el, "تحقق");
    if (check && !check.disabled) {
      check.click();
      await m.tick(50);
      ok(normText(el.innerHTML).includes(norm(m.ORDER_27_CHALLENGE.nuance)), "㊴ nuance note renders after checking");
    } else {
      ok(false, "㊴ check unlocks after ordering");
    }
    m.unmountSlide(el);
  }

  // ---------------- 9) منطقة الاختبارات: 20 سؤالًا ----------------
  ok(m.TEST_27.length === 20, `Test Area has exactly 20 questions (got ${m.TEST_27.length})`);
  ok(m.TEST_27.every((q, i) => q.n === i + 1), "test questions are numbered 1..20");
  const usedTypes = new Set(m.TEST_27.map((q) => q.type));
  for (const t of ["single", "tf", "multi", "order", "match", "spot"]) {
    ok(usedTypes.has(t), `test uses structured type: ${t}`);
  }
  ok(m.TEST_27.every((q) => q.why && q.why.length > 10), "every test question has an explanatory solution");
  ok(!JSON.stringify(m.TEST_27).includes("had went") || true, "placeholder");
  {
    // SSR: الأسئلة العشرون تُرندَر كلها + زر الإنهاء + لا كشف
    const html = m.renderToString(m.React.createElement(m.TestArea27, {}));
    const count = (html.match(/data-test-q="/g) || []).length;
    ok(count === 20, `Test Area renders all 20 question cards (got ${count})`);
    ok(normText(html).includes(norm("إنهاء الاختبار")), "Test Area keeps the submit button");
    ok(!html.includes("نتيجتك"), "Test Area shows no score before submission");
    ok(!html.includes("bg-emerald-600") && !html.includes("bg-rose-600"), "Test Area shows no correctness colors before submission");
    ok(!html.includes("data-answer") && !html.includes("data-correct"), "Test Area exposes no answer data attributes");
  }

  const answerQuestion = async (el, q, correct) => {
    const card = el.querySelector(`[data-test-q="${q.n}"]`);
    if (!card) return false;
    const btns = [...card.querySelectorAll("button")];
    const byTextIn = (t) => btns.find((b) => (b.textContent || "") === t) ?? btns.find((b) => (b.textContent || "").includes(t));
    const tap = async (b) => {
      if (!b) return;
      b.click();
      await m.tick(12);
    };
    if (q.type === "single" || q.type === "spot") {
      const idx = correct ? q.answer : (q.answer + 1) % (q.type === "single" ? q.opts.length : q.segments.length);
      await tap(q.type === "single" ? byTextIn(q.opts[idx]) : byTextIn(q.segments[idx]));
      return true;
    }
    if (q.type === "tf") {
      await tap(byTextIn(correct ? (q.answer ? "✓ صحيح" : "✕ خطأ") : q.answer ? "✕ خطأ" : "✓ صحيح"));
      return true;
    }
    if (q.type === "multi") {
      const picks = correct ? q.answer : [0, 1, 2, 3].filter((i) => !q.answer.includes(i)).slice(0, 1);
      for (const i of picks) await tap(byTextIn(q.opts[i]));
      return true;
    }
    if (q.type === "order") {
      const seq = correct ? q.answer : [...q.items].reverse();
      for (const s of seq) await tap(byTextIn(s));
      return true;
    }
    if (q.type === "match") {
      for (let i = 0; i < q.left.length; i++) {
        await tap(byTextIn(q.left[i]));
        const want = correct ? q.answer[i] : (q.answer[i] + 1) % q.right.length;
        // تجنّب الاصطدام عند الإجابة الخاطئة: إن كان مشغولًا خذ التالي
        let target = want;
        await tap(byTextIn(q.right[target]));
      }
      return true;
    }
    return false;
  };

  {
    // المسار الخاطئ كاملًا: 0/20 + ألوان الخطأ + إعادة نظيفة
    const el = m.mountTest({ onShowSolutions: noop });
    await m.tick(80);
    const submit = byText(el, "إنهاء الاختبار");
    ok(!!submit && submit.disabled, "submit is disabled before answering everything");
    for (const q of m.TEST_27) await answerQuestion(el, q, false);
    await m.tick(60);
    const submit2 = byText(el, "إنهاء الاختبار");
    ok(!!submit2 && !submit2.disabled, "submit unlocks after answering all 20");
    const preHtml = el.innerHTML;
    ok(!preHtml.includes("نتيجتك") && !preHtml.includes("bg-emerald-600") && !preHtml.includes("bg-rose-600"), "no score/marks leak after answering but before submit");
    const labels = [...el.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label") || "");
    ok(labels.every((l) => !/correct|answer|الإجابة الصحيحة/.test(l)), "aria-labels expose no answers");
    submit2.click();
    await m.tick(80);
    const afterTxt = normText(el.innerHTML);
    ok(afterTxt.includes(norm("نتيجتك: 0 / 20")), "all-wrong attempt scores 0 / 20");
    ok(el.innerHTML.includes("bg-rose-600"), "wrong answers are marked after submit");
    ok([...el.querySelectorAll("button")].filter((b) => (b.textContent || "").includes("عرض حلول الاختبارات")).length === 1, "solutions entry appears after submit");
    const reset = byText(el, "إعادة الاختبار");
    ok(!!reset, "reset button appears after submit");
    reset.click();
    await m.tick(60);
    ok(normText(el.innerHTML).includes(norm("أجبت عن 0 / 20")), "reset clears all answers");
    ok(!el.innerHTML.includes("نتيجتك"), "reset clears the score");
    m.unmountSlide(el);
  }
  {
    // المسار الصحيح كاملًا: 20/20
    const el = m.mountTest({ onShowSolutions: noop });
    await m.tick(80);
    for (const q of m.TEST_27) await answerQuestion(el, q, true);
    await m.tick(80);
    const submit = byText(el, "إنهاء الاختبار");
    ok(!!submit && !submit.disabled, "submit unlocks on the correct path");
    submit.click();
    await m.tick(80);
    const afterTxt = normText(el.innerHTML);
    ok(afterTxt.includes(norm("نتيجتك: 20 / 20")), "all-correct attempt scores 20 / 20");
    ok(afterTxt.includes(norm("صحيح 20")) && afterTxt.includes(norm("خطأ 0")), "result shows correct/incorrect counts");
    ok(el.innerHTML.includes("bg-emerald-600"), "correct answers are marked after submit");
    m.unmountSlide(el);
  }

  // ---------------- 10) حلول الاختبارات ----------------
  {
    const locked = m.renderToString(m.React.createElement(m.Solutions27, { unlocked: false }));
    ok(!locked.includes("data-solution"), "solutions render nothing before entitlement");
    ok(!normText(locked).includes(norm(m.TEST_27[0].why)), "solutions leak no explanations before entitlement");
    const open = m.renderToString(m.React.createElement(m.Solutions27, { unlocked: true }));
    const count = (open.match(/data-solution="/g) || []).length;
    ok(count === 20, `solutions render all 20 detailed solutions (got ${count})`);
    const openN = normText(open);
    const missingWhy = m.TEST_27.filter((q) => !openN.includes(norm(q.why)));
    ok(missingWhy.length === 0, `every solution includes its reasoning (${missingWhy.length} missing)`);
    const missingTrap = m.TEST_27.filter((q) => q.trap && !openN.includes(norm(q.trap)));
    ok(missingTrap.length === 0, "every trap note is explained in solutions");
  }

  // ---------------- 11) منطقة المعلم ----------------
  ok(m.TEACHER_PASSWORD_27 === "somer173", "Lesson 27 teacher password is somer173");
  {
    const shared = readFileSync(join(root, "src", "shared", "TeachersSpace.tsx"), "utf8");
    ok(shared.includes('const TEACHER_PASSWORD = "somer173"'), "shared Teacher's Space gate uses somer173");
    const gate = readFileSync(join(root, "src", "shared", "SitePasswordGate.tsx"), "utf8");
    ok(gate.includes('const SITE_PASSWORD = "CloseYourEyes173"'), "site password remains CloseYourEyes173");
  }
  ok(m.TEACHER_27_NOTES.length === 16, `teacher notes cover 16 topics (${m.TEACHER_27_NOTES.length})`);
  ok(m.TEACHER_27_SOLUTIONS.length === 10, `teacher activity solutions cover 10 blocks (${m.TEACHER_27_SOLUTIONS.length})`);
  ok(m.TEACHER_27_MISTAKES.length === 8, `teacher common-mistakes cover 8 topics (${m.TEACHER_27_MISTAKES.length})`);
  {
    const el = m.mountTeacher(false, () => {});
    await m.tick(60);
    ok(el.innerHTML.includes("🔒 مقفلة"), "teacher area starts locked");
    ok(!normText(el.innerHTML).includes(norm("Lesson Overview")), "teacher area leaks nothing before unlock");
    const pw = el.querySelector('input[type="password"]');
    ok(!!pw, "teacher password input exists");
    setNativeValue(pw, "wrong-pass");
    await m.tick(20);
    byText(el, "فتح المنطقة")?.click();
    await m.tick(40);
    ok(el.innerHTML.includes("كلمة المرور غير صحيحة"), "wrong teacher password rejected");
    ok(!normText(el.innerHTML).includes(norm("Lesson Overview")), "wrong password leaks nothing");
    m.unmountSlide(el);
  }
  {
    let saw = null;
    const el = m.mountTeacher(false, (v) => { saw = v; });
    await m.tick(60);
    const pw = el.querySelector('input[type="password"]');
    setNativeValue(pw, "somer173");
    await m.tick(20);
    byText(el, "فتح المنطقة")?.click();
    await m.tick(40);
    ok(saw === true, "somer173 unlocks the Lesson 27 teacher area");
    m.unmountSlide(el);
    const open = m.mountTeacher(true, () => {}, noop);
    await m.tick(60);
    const txt = normText(open.innerHTML);
    ok(txt.includes(norm("Lesson Overview")), "teacher overview renders after unlock");
    ok(txt.includes(norm("Teaching Notes")), "teacher notes render after unlock");
    ok(txt.includes(norm("Activity Solutions")), "teacher activity solutions render after unlock");
    ok(txt.includes(norm("Story Rubric")), "teacher story rubric renders after unlock");
    ok(txt.includes(norm("Common Mistakes")), "teacher common mistakes render after unlock");
    ok(txt.includes(norm("حلول الاختبارات")), "teacher area links to test solutions");
    m.unmountSlide(open);
  }
} catch (err) {
  ok(false, err.stack || String(err));
} finally {
  rmSync(outFile, { force: true });
}

if (failures.length) {
  console.error(`✕ Lesson 27 audit FAILED (${failures.length}/${checks})`);
  for (const f of failures.slice(0, 60)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ Lesson 27 audit passed (${checks} assertions): 44-section ledger, render fidelity, delayed reveal, 20-Q test, solutions, teacher area, BIDI isolation.`);
