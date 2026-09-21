// ============================================================
// Lesson 26 audit — سجل المصدر > العرض > التفاعل (THE TIME DIRECTOR)
//   node scripts/audit-lesson26.mjs
//   1) سجل المصدر: كل قسم مصدري له تغطية كاملة على مستوى الشرائح (data-level).
//   2) العرض الحقيقي: كل شريحة تُرندَر بلا أخطاء، وكل وحدة مصدرية تصل إلى الـ DOM (render-level).
//   3) no answer leakage: أسئلة/تدريبات لا تكشف التصحيح قبل «تحقق من الإجابات».
//   4) كشف كامل بعد التحقق: التصحيحات/التفسيرات المصدرية تظهر في data-reveal-block.
//   5) العزل: كل شريحة فيها إنجليزية داخل dir="ltr" والغلاف RTL بلا علم GB.
// ============================================================
import { createRequire } from "node:module";
import { rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "scripts", ".lesson26-audit.mjs");

const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
};

// ---------------- jsdom globals (needed for interactive mounts) ----------------
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
const exportsList = [
  "React", "renderToString", "createRoot", "Lesson26", "SlideView26", "SLIDES", "SOURCE_SECTIONS", "SEC",
  "SOURCE_NUMBERED_COUNT", "SOURCE_LEDGER_COUNT", "EX26_ITEMS", "COMPLETE_STORY_26", "DETECTIVE_26_PARTS",
  "IQ200_MATCH_26", "IQ200_BOTH_26", "FINAL_BOSS_26_SCENE", "FINAL_BOSS_26_REQUIREMENTS", "FINAL_BOSS_26_MODEL_STORY",
  "TIME_CLUES_26", "INTENTIONALLY_WRONG_26", "mountSlide", "unmountSlide", "tick",
];
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React from "react";
import { renderToString } from "react-dom/server";
import { createRoot } from "react-dom/client";
import Lesson26, { SlideView26 } from ${JSON.stringify(join(root, "src/lessons/lesson26/Lesson26.tsx"))};
import { SLIDES, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, EX26_ITEMS, COMPLETE_STORY_26, DETECTIVE_26_PARTS, IQ200_MATCH_26, IQ200_BOTH_26, FINAL_BOSS_26_SCENE, FINAL_BOSS_26_REQUIREMENTS, FINAL_BOSS_26_MODEL_STORY, TIME_CLUES_26, INTENTIONALLY_WRONG_26 } from ${JSON.stringify(join(root, "src/lessons/lesson26/data.ts"))};
function mountSlide(slide) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  root.render(React.createElement(SlideView26, { s: slide, onExit: () => {} }));
  return el;
}
function unmountSlide(el) { el.remove(); }
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
export { React, renderToString, createRoot, Lesson26, SlideView26, SLIDES, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, EX26_ITEMS, COMPLETE_STORY_26, DETECTIVE_26_PARTS, IQ200_MATCH_26, IQ200_BOTH_26, FINAL_BOSS_26_SCENE, FINAL_BOSS_26_REQUIREMENTS, FINAL_BOSS_26_MODEL_STORY, TIME_CLUES_26, INTENTIONALLY_WRONG_26, mountSlide, unmountSlide, tick };
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
const norm = (s) => String(s).replace(/[\s\u200b\u200c\u2060]+/g, "");
const normText = (html) => norm(plainOf(html));
const byText = (scope, text) => [...scope.querySelectorAll("button")].find((b) => (b.textContent || "").includes(text));

try {
  const noop = () => {};
  const { SLIDES, SOURCE_SECTIONS, SEC } = m;

  // ---------------- 1) سجل المصدر ----------------
  ok(SOURCE_SECTIONS.length === m.SOURCE_LEDGER_COUNT, `ledger length matches SOURCE_LEDGER_COUNT (${SOURCE_SECTIONS.length})`);
  ok(m.SOURCE_LEDGER_COUNT === 38, `ledger keeps all 38 supplied sections (got ${m.SOURCE_LEDGER_COUNT})`);
  ok(m.SOURCE_NUMBERED_COUNT === 31, `numbered sections 1..31 are all indexed (got ${m.SOURCE_NUMBERED_COUNT})`);
  ok(SOURCE_SECTIONS.every((s) => s.units.length > 0 && s.units.every((u) => String(u).trim().length > 0)), "no source section lost its units");
  ok(SOURCE_SECTIONS.every((s) => s.units.every((u) => !u.includes("**"))), "no markdown noise left inside source units");
  const numbered = SOURCE_SECTIONS.filter((s) => /^\d+\./.test(s.title) || /^(🎥|📸|🧠|🔥|⭐|🚨|🚀|🏆|⚠️|🎬|🎯|🕵️|📖|📞|⚔️|🧪|🔎)/.test(s.title));
  ok(numbered.length >= 31, `every numbered teaching section is present (${numbered.length})`);

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
  ok(labsUsed.size >= 30, `lesson 26 ships its interactive lab layer (${labsUsed.size} labs wired)`);

  // ---------------- 3) العرض الحقيقي لكل شريحة ----------------
  const broken = [];
  const missingLtr = [];
  const missingMarker = [];
  const undefinedText = [];
  const slideHtml = new Map();
  for (const slide of SLIDES) {
    let html = "";
    try {
      html = m.renderToString(m.React.createElement(m.SlideView26, { s: slide, onExit: noop }));
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
  ok(broken.length === 0, `every Lesson 26 slide renders without throwing (${broken.join(" | ")})`);
  ok(missingLtr.length === 0, `every slide isolates English as LTR (${missingLtr.join(" | ")})`);
  ok(missingMarker.length === 0, `every source slide renders its data-source-section marker (${missingMarker.join(" | ")})`);
  ok(undefinedText.length === 0, `no slide renders "undefined"/[object Object] (${undefinedText.join(" | ")})`);
  ok(SLIDES.length >= 50 && SLIDES.length <= 60, `screen flow counted 50-60 screens (${SLIDES.length})`);

  // ---------------- 4) المشي التفاعلي: كل وحدة مصدرية تصل إلى الـ DOM ----------------
  // الشرائح فيها مسارات (تبديل العدسة/النمط/الحالة) — نضغط كل الأزرار ونراكم حالات العرض.
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
    if (slide.kind === "ex" && slide.ex.type === "completeStory") {
      const blanks = m.COMPLETE_STORY_26.filter((p) => p.blank);
      [...el.querySelectorAll("input")].forEach((input, i) => {
        Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, "value").set.call(input, blanks[i]?.answer ?? "");
        input.dispatchEvent(new win.Event("input", { bubbles: true }));
      });
      await m.tick(40);
      capture();
    }
    if (slide.kind === "ex" && slide.ex.type === "finalBoss") {
      const area = el.querySelector("textarea");
      if (area) {
        Object.getOwnPropertyDescriptor(win.HTMLTextAreaElement.prototype, "value").set.call(
          area,
          "Last night, I was walking home while the rain was falling. People were running toward their houses. I was listening to music when I heard a strange noise. I stopped and looked behind me. A small dog was standing near a tree. While I was looking at it, the dog ran toward me. I stepped back and dropped my phone. The dog picked up the phone and ran away!"
        );
        area.dispatchEvent(new win.Event("input", { bubbles: true }));
        await m.tick(40);
        capture();
      }
    }
    const check = byText(el, "تحقق من الإجابات");
    if (check && !check.disabled) {
      check.click();
      await m.tick(50);
      capture();
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
  const wholeN = walkedN;
  const wholePlainGaps = walkedN.replace(/_+/g, "");
  // وحدات فيها فراغات (تدريبات) تُقارن بعد إزالة علامات الفراغ من الطرفين
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
  }
  ok(missingUnits.length === 0, `render-level ledger: every source unit reaches a rendered state (${missingUnits.length} missing) ${missingUnits.slice(0, 8).join(" | ")}`);
  for (const phrase of [
    "I watched TV last night.",
    "I was watching TV at 9:00 last night.",
    "I was walking home when I saw a strange bird.",
    "I was sleeping when the phone rang.",
    "She was cooking dinner when I arrived.",
    "While I was watching TV, my brother was reading.",
    "I visited my uncle yesterday.",
    "At 5:00 yesterday, I was visiting my uncle.",
    "Were you sleeping?",
    "Past Continuous = was/were + verb-ing",
    "Past Continuous + when + Past Simple",
    "Past Continuous + Past Continuous",
  ]) {
    ok(wholeN.includes(norm(phrase)), `BIDI/source phrase reaches the rendered lesson: ${phrase}`);
  }
  for (const flipped of [
    "night last TV watched I.",
    "night last 9:00 at TV watching was I.",
    "rang phone the when sleeping was I.",
    "reading was brother my TV watching was I while,",
  ]) {
    ok(!wholeN.includes(norm(flipped)), `no reversed English word order: ${flipped}`);
  }
  for (const wrong of m.INTENTIONALLY_WRONG_26) {
    ok(wholeN.includes(norm(wrong)), `intentionally wrong source sentence renders as-is: ${wrong}`);
  }

  // ---------------- 5) مسار المصدر الكامل من المكوّن الرئيسي ----------------
  const lessonHtml = m.renderToString(m.React.createElement(m.Lesson26, { onExit: noop }));
  ok(lessonHtml.length > 3000, "Lesson 26 main component renders");
  ok(lessonHtml.includes('dir="rtl"'), "Lesson 26 keeps the Arabic RTL shell");
  ok(lessonHtml.includes('dir="ltr"'), "Lesson 26 isolates English as LTR");
  ok(!lessonHtml.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 26 renders no GB flag emoji");
  ok(lessonHtml.includes("l26-main"), "Lesson 26 exposes its scroll container (#l26-main)");
  ok(lessonHtml.includes("data-slide-counter"), "Lesson 26 renders the slide counter");
  ok(lessonHtml.includes("التنقل"), "Lesson 26 documents keyboard navigation");
  ok((lessonHtml.match(/data-source-section/g) || []).length >= 1, "source ledger markers render on the first slide story");

  // ---------------- 6) hooks المختبرات ----------------
  const hooks = [
    "l26-two-views", "l26-bird-scene", "l26-long-short", "l26-better-thinking", "l26-viewfinder", "l26-cook-scene",
    "l26-magic-question", "l26-not-always", "l26-flip-order", "l26-parallel-tracks", "l26-when-vs-while", "l26-when-analysis",
    "l26-while-nuance", "l26-four-patterns", "l26-story-director", "l26-emma-analysis", "l26-parallel-pairs",
    "l26-simultaneous", "l26-interruption", "l26-interruption-model", "l26-not-every-simple", "l26-sequence-scene",
    "l26-deep-difference", "l26-compare-four", "l26-compare-meanings", "l26-errors", "l26-was-were", "l26-nouns",
    "l26-time-expressions", "l26-time-not-rules", "l26-meaning-first", "l26-iq200", "l26-iq200-both", "l26-story-layers",
    "l26-master-map", "l26-golden-rule", "l26-final-check",
  ];
  const allHtml = [...slideHtml.values()].join("\n") + hookHtml.join("\n");
  for (const hook of hooks) ok(allHtml.includes(`data-en-seq="${hook}"`), `interactive lab hook renders: ${hook}`);

  // ---------------- 7) لا كشف قبل التحقق + كشف كامل بعده ----------------
  const normTextIn = (el) => normText(el.innerHTML);
  async function walk(sectionId, slide, interact) {
    const el = m.mountSlide(slide);
    await m.tick(80);
    const beforeHtml = el.innerHTML;
    ok(!beforeHtml.includes("data-reveal-block"), `${sectionId}: no reveal block before checking`);
    const beforeN = normTextIn(el);
    const reveal = SOURCE_SECTIONS[slide.sourceIndex].revealUnits ?? [];
    const visible = new Set(SOURCE_SECTIONS[slide.sourceIndex].units.filter((u) => !reveal.includes(u)).map(norm));
    const leaked = reveal.filter((u) => /[\u0600-\u06FF]/.test(u) && !visible.has(norm(u)) && beforeN.includes(norm(u)));
    ok(leaked.length === 0, `${sectionId}: no source answer leaks before checking (${leaked.join(" | ")})`);
    await interact(el);
    await m.tick(60);
    const afterHtml = el.innerHTML;
    ok(afterHtml.includes("data-reveal-block"), `${sectionId}: reveal block appears after checking`);
    const afterN = normTextIn(el);
    const stillMissing = reveal.filter((u) => !afterN.includes(norm(u)));
    ok(stillMissing.length === 0, `${sectionId}: every source answer/fix reaches the DOM after checking (${stillMissing.join(" | ")})`);
    m.unmountSlide(el);
  }

  const slideBySource = (key) => SLIDES.find((s) => s.sourceIndex === SEC[key] && s.kind === "lesson");

  if (slideBySource("s21")) {
    await walk("Errors Detective (s21)", slideBySource("s21"), async (el) => {
      for (const btn of [...el.querySelectorAll("button[aria-pressed]")]) {
        btn.click();
        await m.tick(10);
      }
      const check = byText(el, "تحقق من الإجابات");
      ok(!!check && !check.disabled, "Errors Detective: check unlocks after marking all five errors");
      if (check && !check.disabled) check.click();
    });
  }
  if (slideBySource("s25")) {
    await walk("Meaning First (s25)", slideBySource("s25"), async (el) => {
      const options = [...el.querySelectorAll("button[aria-pressed]")];
      for (const q of [0, 1, 2, 3]) {
        const group = options.slice(q * 2, q * 2 + 2);
        group[0]?.click();
        await m.tick(10);
      }
      const check = byText(el, "تحقق من الإجابات");
      ok(!!check && !check.disabled, "Meaning First: check unlocks after all four answers");
      if (check && !check.disabled) check.click();
    });
  }
  if (slideBySource("s30")) {
    await walk("IQ200 both (s30)", slideBySource("s30"), async (el) => {
      const opts = [...el.querySelectorAll("button[aria-pressed]")];
      const noBtn = byText(el, "لا، كلتاهما صحيحة") ?? opts[opts.length - 1];
      noBtn?.click();
      await m.tick(20);
      const check = byText(el, "تحقق من الإجابات");
      ok(!!check && !check.disabled, "IQ200 both: check unlocks after a single verdict");
      if (check && !check.disabled) check.click();
    });
  }

  const detSlide = SLIDES.find((s) => s.kind === "ex" && s.ex.type === "grammarDetective");
  const detHtml = slideHtml.get(detSlide) ?? "";
  ok(!detHtml.includes("data-reveal-block"), "Grammar Detective: no fix visible before selecting errors");
  {
    const el = m.mountSlide(detSlide);
    await m.tick(80);
    const errors = m.DETECTIVE_26_PARTS.map((p, i) => ({ p, i })).filter(({ p }) => p.error);
    const parts = [...el.querySelectorAll("button[aria-pressed]")];
    for (const { i } of errors) {
      parts[i]?.click();
      await m.tick(15);
    }
    const check = byText(el, "تحقق من الإجابات");
    ok(!!check && !check.disabled, "Grammar Detective: check unlocks after marking the errors");
    if (check && !check.disabled) {
      check.click();
      await m.tick(60);
      const after = normText(el.innerHTML);
      const missingFixes = errors.filter(({ p }) => !after.includes(norm(p.fix)));
      ok(missingFixes.length === 0, `Grammar Detective: all 4 corrections reveal after checking (${missingFixes.map((x) => x.p.fix).join(" | ")})`);
      ok(el.innerHTML.includes("data-reveal-block"), "Grammar Detective: corrections live in a reveal block");
    }
    m.unmountSlide(el);
  }

  // ---------------- 8) بيانات التمارين ----------------
  ok(m.EX26_ITEMS.length === 8, `Exercise 26 keeps all 8 source questions (${m.EX26_ITEMS.length})`);
  ok(m.EX26_ITEMS.every((it) => it.opts.length === 2 && it.answer >= 0 && it.answer < 2), "Exercise 26 keeps two options and a valid key per question");
  for (const it of m.EX26_ITEMS) {
    ok(wholePlainGaps.includes(norm(it.stem.replace(/_+/g, ""))), `Exercise 26 stem renders: ${it.stem.slice(0, 48)}`);
  }
  ok(m.COMPLETE_STORY_26.filter((p) => p.blank).length === 10, "Complete the Story keeps all 10 gaps");
  ok(m.COMPLETE_STORY_26.filter((p) => p.blank).every((p) => p.answer && p.verb), "Complete the Story keeps every gap hint and answer");
  ok(m.DETECTIVE_26_PARTS.filter((p) => p.error).length === 4, "Grammar Detective keeps exactly 4 real errors");
  ok(m.DETECTIVE_26_PARTS.filter((p) => p.error).every((p) => p.fix && p.why), "Grammar Detective keeps a fix and reason for each error");
  ok(m.IQ200_BOTH_26.answer === 2 && m.IQ200_BOTH_26.options.length === 3, "IQ200 (both sentences) keeps its supplied verdict: both are correct");
  ok(m.IQ200_MATCH_26.answer.A === "m1" && m.IQ200_MATCH_26.answer.B === "m2", "IQ200 matching keeps the supplied meaning pairs");
  ok(m.FINAL_BOSS_26_SCENE.length === 7, `Final Boss keeps its 7 supplied scene steps (${m.FINAL_BOSS_26_SCENE.length})`);
  ok(m.FINAL_BOSS_26_REQUIREMENTS.length === 7, `Final Boss keeps its 7 requirements (${m.FINAL_BOSS_26_REQUIREMENTS.length})`);
  ok(m.TIME_CLUES_26.length === 10, `Time expressions keep the 10 supplied clues (${m.TIME_CLUES_26.length})`);
  const bossHtml = slideHtml.get(SLIDES.find((s) => s.kind === "ex" && s.ex.type === "finalBoss")) ?? "";
  ok(normText(bossHtml).includes(norm("10–12")), "Final Boss keeps the 10–12 sentence instruction");
  ok(walkedN.includes(norm(m.FINAL_BOSS_26_MODEL_STORY)), "Final Boss keeps the supplied model story (model slide)");

  // ---------------- 9) الاختبار النهائي ----------------
  const quizSlide = SLIDES.find((s) => s.kind === "quiz");
  const quizHtml = slideHtml.get(quizSlide) ?? m.renderToString(m.React.createElement(m.SlideView26, { s: quizSlide, onExit: noop }));
  ok(quizHtml.includes("تحقق من الإجابات"), "final quiz keeps the neutral check button");
  ok(quizHtml.includes("Teacher’s Space") || quizHtml.includes("Teacher's Space"), "final quiz keeps Teacher's Space");
  ok(!quizHtml.includes("الإجابة الصحيحة:"), "final quiz shows no answer key before unlocking");
  ok(!quizHtml.includes("data-reveal-block"), "final quiz reveals nothing before checking");
} catch (err) {
  ok(false, err.stack || String(err));
} finally {
  rmSync(outFile, { force: true });
}

if (failures.length) {
  console.error(`✕ Lesson 26 audit FAILED (${failures.length}/${checks})`);
  for (const f of failures.slice(0, 40)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ Lesson 26 audit passed (${checks} assertions): ledger, render-level fidelity, delayed reveal, BIDI isolation.`);
