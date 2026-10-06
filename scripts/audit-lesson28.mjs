// ============================================================
// Lesson 28 audit — سجل المصدر > العرض > التفاعل > الاختبار > المعلم
//   node scripts/audit-lesson28.mjs
//   1) سجل المصدر: 40 قسمًا مرقّمًا ①–㊵ + أقسام الغلاف/الخاتمة.
//   2) تغطية الشرائح على مستوى البيانات.
//   3) العرض الحقيقي: كل شريحة تُرندَر بلا أخطاء + عزل LTR + علامات المصدر.
//   4) المشي التفاعلي: كل وحدة مصدرية (وكل reveal) تصل إلى الـ DOM.
//   5) العبارات المفتاحية حاضرة وغير معكوسة + الأخطاء المقصودة كما هي.
//   6) المكوّن الرئيسي: RTL + المناطق الأربع + عدّاد + تنقل.
//   7) خطافات المختبرات.
//   8) لا كشف قبل التحقق + كشف كامل بعده (كل التدريبات).
//   9) بيانات التدريبات + ملاحظة ㉝ المنطقية (المصدر محفوظ + التوضيح موسوم).
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
const outFile = join(root, "scripts", ".lesson28-audit.mjs");

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
import Lesson28, { SlideView28, TestArea28, Solutions28, TeacherArea28 } from ${JSON.stringify(join(root, "src/lessons/lesson28/Lesson28.tsx"))};
import { SLIDES, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, EX28_CHOOSE, EX28_FIRST_EVENT, EX28_ERRORS, EX28_ERROR_SPOTS, EX28_JOHN_MARY, EX28_SARAH_TOM, EX28_DANIEL, ALEX_SCENE_28, BOSS_28, IQFINAL_28, LOGIC_NOTE_S33, TEST_28, TEACHER_PASSWORD_28, TEACHER_28_OVERVIEW, TEACHER_28_NOTES, TEACHER_28_SOLUTIONS, TEACHER_28_RUBRIC, TEACHER_28_MISTAKES, STORY_28_REQUIREMENTS, INTENTIONALLY_WRONG_28 } from ${JSON.stringify(join(root, "src/lessons/lesson28/data.ts"))};
function mountSlide(slide) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  root.render(React.createElement(SlideView28, { s: slide, onExit: () => {} }));
  return el;
}
function mountTest(props) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  root.render(React.createElement(TestArea28, props ?? {}));
  return el;
}
function mountSolutions(unlocked) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  root.render(React.createElement(Solutions28, { unlocked }));
  return el;
}
function mountTeacher(unlocked, onUnlockChange, onGoSolutions) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  root.render(React.createElement(TeacherArea28, { unlocked, onUnlockChange, onGoSolutions }));
  return el;
}
function unmountSlide(el) { el.remove(); }
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
export { React, renderToString, createRoot, Lesson28, SlideView28, TestArea28, Solutions28, TeacherArea28, SLIDES, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, EX28_CHOOSE, EX28_FIRST_EVENT, EX28_ERRORS, EX28_ERROR_SPOTS, EX28_JOHN_MARY, EX28_SARAH_TOM, EX28_DANIEL, ALEX_SCENE_28, BOSS_28, IQFINAL_28, LOGIC_NOTE_S33, TEST_28, TEACHER_PASSWORD_28, TEACHER_28_OVERVIEW, TEACHER_28_NOTES, TEACHER_28_SOLUTIONS, TEACHER_28_RUBRIC, TEACHER_28_MISTAKES, STORY_28_REQUIREMENTS, INTENTIONALLY_WRONG_28, mountSlide, mountTest, mountSolutions, mountTeacher, unmountSlide, tick };
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
const norm = (s) => String(s).replace(/[\s\u200b\u200c\u2060().,;:=!?…\-–—"'«»"'’`·/\\|←→]+/g, "");
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
  ok(m.SOURCE_NUMBERED_COUNT === 40, `numbered sections 1..40 are all indexed (got ${m.SOURCE_NUMBERED_COUNT})`);
  const nums = SOURCE_SECTIONS.filter((s) => s.num !== undefined).map((s) => s.num).sort((a, b) => a - b);
  ok(nums.length === 40 && nums[0] === 1 && nums[39] === 40 && nums.every((n, i) => n === i + 1), `ledger covers every number 1..40 exactly once (${nums.length})`);
  ok(SOURCE_SECTIONS.every((s) => s.units.length > 0 && s.units.every((u) => String(u).trim().length > 0)), "no source section lost its units");
  ok(SOURCE_SECTIONS.every((s) => s.units.every((u) => !u.includes("**"))), "no markdown noise left inside source units");
  // ㉝: سؤال المصدر وخياراته وإجابته محفوظة حرفيًا في السجل
  ok(SOURCE_SECTIONS[SEC.s33].units[0] === "أي جملة تعني أن John وصل أولًا؟", "㉝ ledger keeps the original question verbatim");
  ok(SOURCE_SECTIONS[SEC.s33].units[1] === "A. When John arrived, Mary had left.", "㉝ ledger keeps option A verbatim");
  ok(SOURCE_SECTIONS[SEC.s33].units[2] === "B. When Mary arrived, John had left.", "㉝ ledger keeps option B verbatim");
  ok((SOURCE_SECTIONS[SEC.s33].revealUnits ?? [])[0] === "A", "㉝ ledger keeps the original source answer (A)");
  ok((SOURCE_SECTIONS[SEC.s33].revealUnits ?? []).includes("إذن John لم يصل أولًا."), "㉝ ledger keeps the original source explanation line");
  ok(m.LOGIC_NOTE_S33.sourceAnswer === "A", "㉝ logic note preserves the source answer");
  ok(m.LOGIC_NOTE_S33.clarification.includes("Mary left ← John arrived"), "㉝ logic note states the precise A reading");
  ok(m.LOGIC_NOTE_S33.clarification.includes("John left ← Mary arrived"), "㉝ logic note states the precise B reading");
  ok(/لا توجد جملة.*تثبت حرفيًا/.test(m.LOGIC_NOTE_S33.clarification), "㉝ logic note discloses that neither sentence establishes the claim");

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
  ok(labsUsed.size >= 20, `lesson 28 ships its interactive lab layer (${labsUsed.size} labs wired)`);
  ok(SLIDES.filter((s) => s.kind === "ex").length === 9, `lesson 28 exposes 9 in-lesson exercises (${SLIDES.filter((s) => s.kind === "ex").length})`);

  // ---------------- 3) العرض الحقيقي لكل شريحة ----------------
  const broken = [];
  const missingLtr = [];
  const missingMarker = [];
  const undefinedText = [];
  const slideHtml = new Map();
  for (const slide of SLIDES) {
    let html = "";
    try {
      html = m.renderToString(m.React.createElement(m.SlideView28, { s: slide, onExit: noop }));
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
  ok(broken.length === 0, `every Lesson 28 slide renders without throwing (${broken.join(" | ")})`);
  ok(missingLtr.length === 0, `every slide isolates English as LTR (${missingLtr.join(" | ")})`);
  ok(missingMarker.length === 0, `every source slide renders its data-source-section marker (${missingMarker.join(" | ")})`);
  ok(undefinedText.length === 0, `no slide renders "undefined"/[object Object] (${undefinedText.join(" | ")})`);
  ok(SLIDES.length >= 40 && SLIDES.length <= 60, `screen flow counted 40-60 screens (${SLIDES.length})`);

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
    if (slide.kind === "ex" && slide.ex.type === "story") {
      const area = el.querySelector("textarea");
      if (area) {
        setNativeValue(
          area,
          "Yesterday, I woke up early and looked for my backpack. While my sister was eating breakfast, I searched the whole house. My mother was drinking her coffee when I realized that I had left my backpack at the library. I had finished my homework before dinner, so everything was inside it. I ran to the library while the rain was falling. When I arrived, the librarian had already put the backpack on the desk. I thanked her and went home. To my surprise, my dog was sleeping next to the bag. In the end, I promised to keep my backpack close."
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
    "The train had left before I arrived.",
    "I visited my uncle yesterday.",
    "I had visited my uncle before I went to the museum.",
    "I had lost my key before I arrived home.",
    "When I arrived, the shop had closed.",
    "When Maya arrived, Daniel left.",
    "When Maya arrived, Daniel had left.",
    "When I opened the box, someone had taken the necklace.",
    "The students had left before the teacher arrived.",
    "The students left before the teacher arrived.",
    "When the teacher arrived, the students had left.",
    "After I had finished my homework, I played a game.",
    "After I finished my homework, I played a game.",
    "By the time we arrived, the movie had started.",
    "By the time the firefighters arrived, the fire had spread.",
    "When I called Lina, she had already gone to bed.",
    "When we reached the stadium, the game had already started.",
    "When I entered the room, the teacher had just arrived.",
    "I arrived at the airport, but my flight had already left.",
    "Sara opened the refrigerator, but someone had eaten all the cake.",
    "I was walking home when I realized that I had forgotten my wallet.",
    "When I arrived at the station, the train had already left, and people were waiting for the next train.",
    "Her brother was making breakfast.",
    "She realized that he had already prepared the coffee.",
    "go → went → gone",
    "eat → ate → eaten",
    "see → saw → seen",
    "Had + subject + V3?",
    "I visited Paris in 2024.",
    "I had visited Paris before I moved to France.",
    "I visited Paris and took many photos.",
    "I woke up, brushed my teeth, ate breakfast, and left the house.",
    "When I left the house, I realized that I had forgotten my backpack.",
    "I realized that I had left my phone at school.",
    "When the explorers reached the cave, they discovered that someone had already entered it. They were surprised because the cave was supposed to be empty.",
    "When I arrived, Tom had eaten lunch.",
    "When Sara called me, I had finished my work.",
    "When the police arrived, the thief had escaped.",
    "When John arrived, Mary had left.",
    "When Mary arrived, John had left.",
    "When Sarah arrived, Tom had left.",
    "When Tom left, Sarah had arrived.",
    "When Daniel entered the laboratory, the scientists were discussing the experiment. They had already completed the first stage, so Daniel joined the second stage.",
    "When I woke up, my brother had already left, my mother was preparing breakfast, and my father read the newspaper.",
    "My father was reading the newspaper.",
    "When Alex entered the house, his sister was sitting in the living room. She was reading a book, and their parents were preparing dinner. Alex looked around and realized that someone had opened the back door. The family had never left it unlocked before.",
    "I was running in the park when I saw a dog. I realized that I had seen this dog before.",
    "When I arrived at the airport, the plane had already taken off, people were running toward the gates, and an employee was talking to a confused passenger.",
  ]) {
    ok(walkedN.includes(norm(phrase)), `BIDI/source phrase reaches the rendered lesson: ${phrase.slice(0, 52)}`);
  }
  for (const flipped of [
    "left had train the arrived, I When",
    "closed had shop the arrived I When",
    "V3 + had + Subject",
    "gone → went → go",
    "left had Daniel arrived Maya When",
  ]) {
    ok(!walkedN.includes(norm(flipped)), `no reversed English word order: ${flipped}`);
  }
  for (const wrong of m.INTENTIONALLY_WRONG_28) {
    ok(walkedN.includes(norm(wrong)), `intentionally wrong source sentence renders as-is: ${wrong.slice(0, 52)}`);
  }

  // ---------------- 5) المكوّن الرئيسي والمناطق الأربع ----------------
  const lessonHtml = m.renderToString(m.React.createElement(m.Lesson28, { onExit: noop }));
  ok(lessonHtml.length > 3000, "Lesson 28 main component renders");
  ok(lessonHtml.includes('dir="rtl"'), "Lesson 28 keeps the Arabic RTL shell");
  ok(lessonHtml.includes('dir="ltr"'), "Lesson 28 isolates English as LTR");
  ok(!lessonHtml.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 28 renders no GB flag emoji");
  ok(lessonHtml.includes("l28-main"), "Lesson 28 exposes its scroll container (#l28-main)");
  ok(lessonHtml.includes("data-slide-counter"), "Lesson 28 renders the slide counter");
  ok(lessonHtml.includes("التنقل"), "Lesson 28 documents keyboard navigation");
  ok(lessonHtml.includes('data-area="l28-test"'), "Test Area is present as a separate area");
  ok(lessonHtml.includes('data-area="l28-solutions"'), "Test Solutions area is present as a separate area");
  ok(lessonHtml.includes('data-area="l28-teacher"'), "Teacher Area is present as a separate area");
  ok((lessonHtml.match(/data-source-section/g) || []).length >= 1, "source ledger markers render on the first slide story");

  // ---------------- 6) خطافات المختبرات ----------------
  const hooks = [
    "l28-first-question", "l28-compare-direct", "l28-old-myth", "l28-timeline-shop", "l28-maya-switch",
    "l28-necklace", "l28-before-lab", "l28-why-perfect", "l28-after-lab", "l28-rule-lab", "l28-bytime",
    "l28-already", "l28-just", "l28-ps-plus-pp", "l28-three-tense", "l28-wallet-layers", "l28-station",
    "l28-time-machine", "l28-cases3", "l28-sequence-backref", "l28-step-back", "l28-cave-detective",
    "l28-logic-test", "l28-alex-scene", "l28-meaning-rule",
    "l28-ex-choose", "l28-ex-first-event", "l28-ex-errors", "l28-ex-john-mary", "l28-ex-sarah-tom",
    "l28-ex-daniel", "l28-ex-boss", "l28-ex-iqfinal", "l28-ex-story",
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
    return el;
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
  for (const t of ["choose", "firstEvent", "errors", "johnMary", "sarahTom", "daniel", "boss", "iqFinal"]) {
    await walkExercise(`Exercise ${t}`, slideOf(t), async (el) => {
      await clickAllPressed(el);
      await pressCheck(el, `Exercise ${t}`);
    });
  }
  {
    // ㉝: الملاحظة المنطقية من المنصة تظهر بعد التحقق مع وسمها
    const el = m.mountSlide(slideOf("johnMary"));
    await m.tick(60);
    await clickAllPressed(el);
    await pressCheck(el, "Exercise johnMary note");
    await m.tick(60);
    const txt = normText(el.innerHTML);
    ok(txt.includes(norm(m.LOGIC_NOTE_S33.clarification)), "㉝ platform logic note renders after checking");
    ok(el.innerHTML.includes("Platform Explanation"), "㉝ logic note carries the Platform Explanation tag");
    ok(el.innerHTML.includes("Source Logic Note") || txt.includes(norm("ملاحظة منطقية من المنصة")), "㉝ logic note is clearly labelled as a source-logic note");
    m.unmountSlide(el);
  }
  {
    // بانية القصة: كل الوحدات ظاهرة + العدّادات تعمل + لا كتابة تلقائية
    const el = m.mountSlide(slideOf("story"));
    await m.tick(60);
    const area = el.querySelector("textarea");
    ok(!!area, "Story builder renders its writing area");
    ok((area.value || "") === "", "Story builder starts empty — the student writes their own story");
    setNativeValue(area, "Yesterday, I woke up early and looked for my backpack. While my sister was eating breakfast, I searched the whole house. My mother was drinking her coffee when I realized that I had left my backpack at the library. I had finished my homework before dinner, so everything was inside it. I ran to the library while the rain was falling. When I arrived, the librarian had already put the backpack on the desk. I thanked her and went home. To my surprise, my dog was sleeping next to the bag. In the end, I promised to keep my backpack close.");
    await m.tick(40);
    const txt = normText(el.innerHTML);
    ok(txt.includes(norm("Past Simple ≥ 4")) && txt.includes(norm("Past Continuous ≥ 3")) && txt.includes(norm("Past Perfect ≥ 3")), "Story builder tracks all three tense quotas");
    ok(txt.includes(norm("before / after")) && txt.includes(norm("already")), "Story builder tracks connectors + already");
    ok(txt.includes(norm("حدث مفاجئ")) && txt.includes(norm("نهاية منطقية")), "Story builder keeps the subjective requirements as manual checks");
    m.unmountSlide(el);
  }

  // ---------------- 8) بيانات التدريبات ----------------
  ok(m.EX28_CHOOSE.length === 5, `㉚ keeps all 5 source questions (${m.EX28_CHOOSE.length})`);
  ok(m.EX28_CHOOSE[0].answer === 1 && m.EX28_CHOOSE[2].answer === 0 && m.EX28_CHOOSE[4].answer === 1, "㉚ keeps the source answers (had started / visited / were playing)");
  ok(m.EX28_FIRST_EVENT.length === 3, "㉛ keeps all 3 first-event sentences");
  ok(m.EX28_ERRORS.length === 5 && m.EX28_ERROR_SPOTS.length === 5, "㉜ keeps all 5 source errors with spottable segments");
  ok(m.EX28_JOHN_MARY.sourceAnswer === 0 && m.EX28_JOHN_MARY.options.length === 2, "㉝ exercise keeps both options + source answer A");
  ok(m.EX28_SARAH_TOM.answer === 1, "㉞ keeps the source answer (B)");
  ok(m.EX28_DANIEL.questions.length === 3 && m.EX28_DANIEL.verbs.length === 4, "㉟ keeps 3 questions over the 4 source verbs");
  ok(m.ALEX_SCENE_28.verbs.length === 8, `㊲ keeps all 8 scene verbs (${m.ALEX_SCENE_28.verbs.length})`);
  ok(m.BOSS_28.opts.length === 3 && m.BOSS_28.answer === 1, "㊴ keeps all 3 options with the source answer B");
  ok(m.IQFINAL_28.parts.length === 4, "IQ200 final keeps all 4 analyzed parts");
  ok(m.STORY_28_REQUIREMENTS.length === 10, "㊵ keeps all 10 story requirements");
  {
    // ㊲: أدوار الأزمنة المورّدة محفوظة
    const tenses = m.ALEX_SCENE_28.verbs.map((v) => v.tense);
    ok(tenses.filter((t) => t === "Past Simple").length === 3, "㊲ keeps 3 Past Simple verbs (entered/looked/realized)");
    ok(tenses.filter((t) => t === "Past Continuous").length === 3, "㊲ keeps 3 Past Continuous verbs (sitting/reading/preparing)");
    ok(tenses.filter((t) => t === "Past Perfect").length === 2, "㊲ keeps 2 Past Perfect verbs (had opened / had never left)");
    ok(m.ALEX_SCENE_28.verbs.some((v) => v.verb === "had opened" && v.tense === "Past Perfect"), "㊲ had opened → Past Perfect");
    ok(m.ALEX_SCENE_28.verbs.some((v) => v.verb === "had never left" && v.tense === "Past Perfect"), "㊲ had never left → Past Perfect");
  }

  // ---------------- 9) منطقة الاختبارات: 20 سؤالًا ----------------
  ok(m.TEST_28.length === 20, `Test Area has exactly 20 questions (got ${m.TEST_28.length})`);
  ok(m.TEST_28.every((q, i) => q.n === i + 1), "test questions are numbered 1..20");
  const usedTypes = new Set(m.TEST_28.map((q) => q.type));
  for (const t of ["single", "tf", "multi", "order", "match", "spot"]) {
    ok(usedTypes.has(t), `test uses structured type: ${t}`);
  }
  ok(m.TEST_28.filter((q) => q.type !== "single").length >= 8, "test is not all multiple choice (≥8 non-single questions)");
  ok(m.TEST_28.every((q) => q.why && q.why.length > 10), "every test question has an explanatory solution");
  {
    // SSR: الأسئلة العشرون تُرندَر كلها + زر الإنهاء + لا كشف
    const html = m.renderToString(m.React.createElement(m.TestArea28, {}));
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
        await tap(byTextIn(q.right[want]));
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
    for (const q of m.TEST_28) await answerQuestion(el, q, false);
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
    for (const q of m.TEST_28) await answerQuestion(el, q, true);
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
    const locked = m.renderToString(m.React.createElement(m.Solutions28, { unlocked: false }));
    ok(!locked.includes("data-solution"), "solutions render nothing before entitlement");
    ok(!normText(locked).includes(norm(m.TEST_28[0].why)), "solutions leak no explanations before entitlement");
    const open = m.renderToString(m.React.createElement(m.Solutions28, { unlocked: true }));
    const count = (open.match(/data-solution="/g) || []).length;
    ok(count === 20, `solutions render all 20 detailed solutions (got ${count})`);
    const openN = normText(open);
    const missingWhy = m.TEST_28.filter((q) => !openN.includes(norm(q.why)));
    ok(missingWhy.length === 0, `every solution includes its reasoning (${missingWhy.length} missing)`);
    const missingTrap = m.TEST_28.filter((q) => q.trap && !openN.includes(norm(q.trap)));
    ok(missingTrap.length === 0, "every trap note is explained in solutions");
  }

  // ---------------- 11) منطقة المعلم ----------------
  ok(m.TEACHER_PASSWORD_28 === "somer173", "Lesson 28 teacher password is somer173");
  {
    const shared = readFileSync(join(root, "src", "shared", "TeachersSpace.tsx"), "utf8");
    ok(shared.includes('const TEACHER_PASSWORD = "somer173"'), "shared Teacher's Space gate uses somer173");
    const gate = readFileSync(join(root, "src", "shared", "SitePasswordGate.tsx"), "utf8");
    ok(gate.includes('const SITE_PASSWORD = "CloseYourEyes173"'), "site password remains CloseYourEyes173");
  }
  ok(m.TEACHER_28_OVERVIEW.objectives.length === 10, "teacher overview keeps all 10 lesson objectives");
  ok(m.TEACHER_28_NOTES.length === 13, `teacher notes cover 13 topics (${m.TEACHER_28_NOTES.length})`);
  ok(m.TEACHER_28_SOLUTIONS.length === 8, `teacher activity solutions cover the 8 source exercises ㉚㉛㉜㉝㉞㉟㊱㊴ (${m.TEACHER_28_SOLUTIONS.length})`);
  ok(m.TEACHER_28_MISTAKES.length === 7, `teacher common-mistakes cover 7 topics (${m.TEACHER_28_MISTAKES.length})`);
  ok(m.TEACHER_28_RUBRIC.lines.length >= 8, "story rubric covers tense coverage, chronology, connectors, coherence");
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
    ok(saw === true, "somer173 unlocks the Lesson 28 teacher area");
    m.unmountSlide(el);
    const open = m.mountTeacher(true, () => {}, noop);
    await m.tick(60);
    const txt = normText(open.innerHTML);
    ok(txt.includes(norm("Lesson Overview")), "teacher overview renders after unlock");
    ok(txt.includes(norm("العلاقة بالدرس 27")), "teacher overview explains the Lesson 27 relationship");
    ok(txt.includes(norm("Teaching Notes")), "teacher notes render after unlock");
    ok(txt.includes(norm("Activity Solutions")), "teacher activity solutions render after unlock");
    ok(txt.includes(norm("ملاحظة منطقية")) || txt.includes(norm("Source Logic")), "teacher solutions disclose the ㉝ source-logic note");
    ok(txt.includes(norm("Story Rubric")), "teacher story rubric renders after unlock");
    ok(txt.includes(norm("Common Mistakes")), "teacher common mistakes render after unlock");
    ok(txt.includes(norm("حلول الاختبارات")), "teacher area links to test solutions");
    m.unmountSlide(open);
  }

  // ---------------- 12) رجعة الدرس 27 — لم يُمس ----------------
  {
    const l27 = readFileSync(join(root, "src/lessons/lesson27/Lesson27.tsx"), "utf8");
    ok(l27.includes("export default function Lesson27"), "Lesson 27 component remains intact");
    const app = readFileSync(join(root, "src", "App.tsx"), "utf8");
    ok(app.includes("route === 27") && app.includes("<Lesson27 onExit={goHome} />"), "Lesson 27 route remains registered");
    ok(app.includes("#/lesson/27"), "Lesson 27 hub card remains");
    for (let n = 1; n <= 26; n++) {
      ok(app.includes(`route === ${n}`), `Lesson ${n} route still registered`);
    }
  }
} catch (err) {
  ok(false, err.stack || String(err));
} finally {
  rmSync(outFile, { force: true });
}

if (failures.length) {
  console.error(`✕ Lesson 28 audit FAILED (${failures.length}/${checks})`);
  for (const f of failures.slice(0, 60)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ Lesson 28 audit passed (${checks} assertions): 40-section ledger, render fidelity, delayed reveal, ㉝ logic note, 20-Q test, solutions, teacher area, BIDI isolation.`);
