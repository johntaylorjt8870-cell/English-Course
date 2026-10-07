// ============================================================
// Lesson 28 audit — Native Multi-Step Interactive Lesson
//   node scripts/audit-lesson28.mjs
// Verifies (benchmark: Lesson 6 / Lesson 27 / Lesson 29 rebuilds):
//   1) Source ledger: 40 numbered sections ①–㊵ + 7 unnumbered = 47.
//   2) Step registry: 47 slides cover every ledger section id exactly once.
//   3) Real render of all 47 steps: no throws, LTR isolation, source chips.
//   4) Interactive layer: ≥20 distinct lab hooks, 9 in-lesson exercises.
//   5) Reveal gating: no source answers before check; all reveal units after.
//   6) ㉝ source logic note: source answer kept + platform note labelled.
//   7) Preserved key source phrases reach the rendered lesson; no word reversal.
//   8) Exercise data fidelity (㉚㉛㉜㉝㉞㉟㊲㊴㊶-final ㊵).
//   9) Test Area: exactly 20 original questions, 6 types, no feedback/score
//      before submit, submit gating, score after submit, full reset.
//  10) Test Solutions: locked before entitlement, 20 explanatory solutions after.
//  11) Teacher Area: somer173 gate, wrong password rejected, full content after.
//  12) Main shell + routing + regression for other lessons + shared gates.
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
import Lesson28, { SlideView28, TestArea28, Solutions28, TeacherArea28, SLIDES as VIEW_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson28/Lesson28.tsx"))};
import { SLIDES, SLIDE_COUNT, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, EX28_CHOOSE, EX28_FIRST_EVENT, EX28_ERRORS, EX28_ERROR_SPOTS, EX28_JOHN_MARY, EX28_SARAH_TOM, EX28_DANIEL, ALEX_SCENE_28, BOSS_28, IQFINAL_28, LOGIC_NOTE_S33, TEST_28, TEST_28_SOLUTIONS, TEACHER_PASSWORD_28, TEACHER_28_OVERVIEW, TEACHER_28_NOTES, TEACHER_28_SOLUTIONS, TEACHER_28_RUBRIC, TEACHER_28_MISTAKES, STORY_28_REQUIREMENTS, INTENTIONALLY_WRONG_28 } from ${JSON.stringify(join(root, "src/lessons/lesson28/data.ts"))};
function mount(node) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(node);
  return el;
}
const React_ = React;
export { React_ as React, renderToString, createRoot, Lesson28, SlideView28, TestArea28, Solutions28, TeacherArea28, VIEW_SLIDES, SLIDES, SLIDE_COUNT, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, EX28_CHOOSE, EX28_FIRST_EVENT, EX28_ERRORS, EX28_ERROR_SPOTS, EX28_JOHN_MARY, EX28_SARAH_TOM, EX28_DANIEL, ALEX_SCENE_28, BOSS_28, IQFINAL_28, LOGIC_NOTE_S33, TEST_28, TEST_28_SOLUTIONS, TEACHER_PASSWORD_28, TEACHER_28_OVERVIEW, TEACHER_28_NOTES, TEACHER_28_SOLUTIONS, TEACHER_28_RUBRIC, TEACHER_28_MISTAKES, STORY_28_REQUIREMENTS, INTENTIONALLY_WRONG_28, mount };
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
const norm = (s) => String(s).replace(/[\s​‌⁠().,;:=!?…\-–—"'«»“”’`·/\\|←→]+/g, "");
const normText = (html) => norm(plainOf(html));
// يزيل علامات الترقيم الدائرية ①…㊵ ونقاط التعداد من رأس وحدة المصدر قبل المقارنة
const stripMarker = (s) => String(s).replace(/^[①-⑳㉑-㉟㊱-㊿]+\s*[.:、)）]?/, "");
const byText = (scope, text) => [...scope.querySelectorAll("button")].find((b) => (b.textContent || "").includes(text));
const setNativeValue = (el, value) => {
  const proto = el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event("input", { bubbles: true }));
};
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
const noop = () => {};

try {
  const { SLIDES, VIEW_SLIDES, SOURCE_SECTIONS, SEC } = m;
  const view = readFileSync(join(root, "src/lessons/lesson28/Lesson28.tsx"), "utf8");

  // ---------------- 1) سجل المصدر ----------------
  ok(SOURCE_SECTIONS.length === m.SOURCE_LEDGER_COUNT, `ledger length matches SOURCE_LEDGER_COUNT (${SOURCE_SECTIONS.length})`);
  ok(m.SOURCE_NUMBERED_COUNT === 40, `numbered sections 1..40 are all indexed (got ${m.SOURCE_NUMBERED_COUNT})`);
  ok(m.SOURCE_LEDGER_COUNT === 47, `ledger totals 47 sections: 40 numbered + 7 unnumbered (got ${m.SOURCE_LEDGER_COUNT})`);
  const nums = SOURCE_SECTIONS.filter((s) => s.num !== undefined).map((s) => s.num).sort((a, b) => a - b);
  ok(nums.length === 40 && nums[0] === 1 && nums[39] === 40 && nums.every((n, i) => n === i + 1), `ledger covers every number 1..40 exactly once (${nums.length})`);
  for (const id of ["cover", "bridge", "objectives", "summary", "golden", "iqfinal", "closing"]) {
    ok(SOURCE_SECTIONS.some((s) => s.id === id), `unnumbered ledger section "${id}" present`);
  }
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

  // ---------------- 2) سجل الخطوات: تغطية exact-once ----------------
  ok(SLIDES.length === 47, `step registry has exactly 47 slides (got ${SLIDES.length})`);
  ok(m.SLIDE_COUNT === SLIDES.length, "SLIDE_COUNT matches registry length");
  ok(VIEW_SLIDES.length === SLIDES.length, "view registry mirrors data registry");
  const coverCount = new Map();
  for (const slide of SLIDES) {
    ok(slide.source.length >= 1, `slide "${slide.id}" declares its source sections`);
    for (const id of slide.source) coverCount.set(id, (coverCount.get(id) ?? 0) + 1);
  }
  const uncovered = SOURCE_SECTIONS.filter((s) => !coverCount.has(s.id)).map((s) => s.id);
  const duplicated = SOURCE_SECTIONS.filter((s) => (coverCount.get(s.id) ?? 0) > 1).map((s) => s.id);
  const unknown = [...coverCount.keys()].filter((id) => !SOURCE_SECTIONS.some((s) => s.id === id));
  ok(uncovered.length === 0, `every ledger section is covered by exactly one step (uncovered: ${uncovered.join(",")})`);
  ok(duplicated.length === 0, `no ledger section is covered twice (duplicated: ${duplicated.join(",")})`);
  ok(unknown.length === 0, `no step references a section outside the ledger (unknown: ${unknown.join(",")})`);
  for (let i = 1; i <= 40; i++) ok(SLIDES.some((s) => s.id === `s${i}`), `step s${i} present in registry`);
  ok(SLIDES.every((s) => typeof s.title === "string" && s.title.length > 2 && typeof s.mascot === "string"), "every step carries a title + mascot identity");
  // لا عرض خام: لا بقايا لبنية viewer القديم (units/بطاقات LINES)
  ok(!view.includes("LINES_28") && !view.includes("rawLines") && !/unit\s*\(\s*s\d+/.test(view), "no raw source-line dump viewer survives in the student area");

  // ---------------- 3) العرض الحقيقي لكل خطوة ----------------
  const broken = [];
  const missingLtr = [];
  const missingMarker = [];
  const undefinedText = [];
  const slideHtml = new Map();
  for (const slide of VIEW_SLIDES) {
    let html = "";
    try {
      html = m.renderToString(m.React.createElement(m.SlideView28, { s: slide }));
    } catch (err) {
      broken.push(`${slide.id}:${slide.title} (${err.message || String(err)})`);
      continue;
    }
    slideHtml.set(slide.id, html);
    if (html.length < 400) broken.push(`${slide.id}:${slide.title} (too small: ${html.length})`);
    if (!html.includes('dir="ltr"')) missingLtr.push(slide.id);
    if (!html.includes("data-source-section")) missingMarker.push(slide.id);
    const plain = plainOf(html);
    if (plain.includes("undefined") || plain.includes("[object Object]")) undefinedText.push(slide.id);
  }
  ok(broken.length === 0, `every one of the 47 steps renders without throwing (${broken.join(" | ").slice(0, 300)})`);
  ok(missingLtr.length === 0, `every step isolates English as LTR (${missingLtr.join(",")})`);
  ok(missingMarker.length === 0, `every step renders its data-source-section chip (${missingMarker.join(",")})`);
  ok(undefinedText.length === 0, `no step renders "undefined"/[object Object] (${undefinedText.join(",")})`);

  // ---------------- 4) طبقة التفاعل ----------------
  const staticHtml = [...slideHtml.values()].join("\n");
  const labSeqs = new Set([...staticHtml.matchAll(/data-en-seq="(l28-[^"]+|ex\d+|iqfinal)"/g)].map((x) => x[1]));
  ok(labSeqs.size >= 20, `lesson ships its interactive lab layer (${labSeqs.size} distinct labs ≥ 20)`);
  ok(staticHtml.includes('data-en-seq="l28-ex-story"'), "in-lesson exercise present: ㊵ story builder");
  ok(view.match(/<SourceReveal/g) !== null && (view.match(/<\s*Lab\s/g) || []).length >= 20, "Lab + SourceReveal teaching kit used across the lesson");
  ok((view.match(/<PlatformTag|<PlatformPanel|Platform Explanation/g) || []).length >= 3, "platform additions are tagged Platform Explanation");
  ok(view.includes("SentenceCard") && view.includes("PartsLine"), "sentence anatomy kit (SentenceCard/PartsLine) used");

  // ---------------- 5) المشي التفاعلي لكل خطوة ----------------
  const slideStates = new Map();
  const finalHtmlBySlide = new Map();
  const clickAllPressed = async (el, capture) => {
    for (const btn of [...el.querySelectorAll("button[aria-pressed]")].filter((b) => !b.disabled)) {
      btn.click();
      await tick(10);
      capture(); // كل حالة وسيطة مهمة: الحكم الصحيح قد يسبق المحاولة الخاطئة على نفس البطاقة
    }
  };
  const pressCheck = async (el, capture) => {
    const check = byText(el, "تحقق");
    if (check && !check.disabled) {
      check.click();
      await tick(40);
      capture();
      return true;
    }
    return false;
  };
  for (const slide of VIEW_SLIDES) {
    const el = m.mount(m.React.createElement(m.SlideView28, { s: slide }));
    await tick(50);
    const states = [];
    const capture = () => states.push(normText(el.innerHTML));
    capture();
    const revealsBefore = (el.innerHTML.match(/data-reveal-block/g) || []).length;
    await clickAllPressed(el, capture);
    // بانية القصة: املأ المساحة بقصة تستوفي المتطلبات
    const area = el.querySelector("textarea");
    if (area) {
      setNativeValue(area, "Yesterday I woke up early and looked for my backpack. Before breakfast I had already packed my bag. Just as I was leaving, my phone rang. My sister was cooking while I was searching for my keys. Suddenly I realized that I had left my backpack at school. By the time I reached the gate, the bus had gone. I ran to school and found it there. After school my friends played and I went home. In the end I promised to be careful.");
      await tick(40);
      capture();
    }
    await pressCheck(el, capture);
    const revealsAfter = (el.innerHTML.match(/data-reveal-block/g) || []).length;
    slideStates.set(slide.id, { states, revealsBefore, revealsAfter });
    finalHtmlBySlide.set(slide.id, el.innerHTML);
    el.remove();
  }

  // ---------------- 6) بوابات الكشف (لا إجابة قبل التحقق) ----------------
  const gatedExercises = { s30: "ex30", s31: "ex31", s32: "ex32", s33: "ex33", s34: "ex34", s35: "ex35", s39: "ex39", iqfinal: "iqfinal" };
  for (const [id, seq] of Object.entries(gatedExercises)) {
    const st = slideStates.get(id);
    ok(!!st && st.revealsBefore === 0, `${id} (${seq}): no reveal block before answering/checking`);
    ok(!!st && st.revealsAfter >= 1, `${id} (${seq}): reveal block appears after the full interaction`);
    ok((finalHtmlBySlide.get(id) ?? "").includes(`data-reveal-block="${seq}"`), `in-lesson exercise present + wired: ${seq}`);
  }
  // كل وحدة reveal مصدرية تصل إلى DOM بعد التحقق
  for (const sec of SOURCE_SECTIONS) {
    const reveal = sec.revealUnits ?? [];
    if (!reveal.length) continue;
    const st = slideStates.get(sec.id);
    const after = st ? st.states.join("\n") : "";
    const missing = reveal.filter((u) => {
      const nu = norm(stripMarker(u));
      return nu.length > 0 && !after.includes(nu);
    });
    ok(missing.length === 0, `section "${sec.id}": every source answer/fix reaches the DOM after check (missing: ${missing.slice(0, 3).join(" | ")})`);
  }
  // ㉝: الملاحظة المنطقية موسومة ومؤجلة حتى التحقق
  {
    const st = slideStates.get("s33");
    const final = finalHtmlBySlide.get("s33") ?? "";
    ok((st?.states.join("") ?? "").includes(norm(m.LOGIC_NOTE_S33.clarification)), "㉝ platform logic note renders after checking");
    ok(final.includes("Platform Explanation"), "㉝ logic note carries the Platform Explanation tag");
    ok(final.includes("Source Logic Note") || norm(final).includes(norm("ملاحظة منطقية من المنصة")), "㉝ logic note is clearly labelled as a source-logic note");
    ok((st?.revealsBefore ?? 1) === 0, "㉝ logic note stays hidden before checking");
  }
  // ㊵: بانية القصة تبدأ فارغة وتتعقب الحصص الثلاث
  {
    const el = m.mount(m.React.createElement(m.SlideView28, { s: VIEW_SLIDES.find((s) => s.id === "s40") }));
    await tick(50);
    const areaEl = el.querySelector("textarea");
    ok(!!areaEl, "㊵ story builder renders its writing area");
    ok(!!areaEl && (areaEl.value || "") === "", "㊵ story builder starts empty — the student writes their own story");
    const txtInit = normText(el.innerHTML);
    ok(txtInit.includes(norm("PAST SIMPLE")) && txtInit.includes(norm("PAST CONTINUOUS")) && txtInit.includes(norm("PAST PERFECT")), "㊵ story builder tracks all three tense quotas");
    if (areaEl) {
      setNativeValue(areaEl, "Yesterday I woke up early and looked for my backpack. Before breakfast I had already packed my bag. Just as I was leaving, my phone rang. My sister was cooking while I was searching for my keys. Suddenly I realized that I had left my backpack at school. By the time I reached the gate, the bus had gone. I ran to school and found it there. After school my friends played and I went home. In the end I promised to be careful.");
      await tick(50);
      ok(normText(el.innerHTML).includes(norm("قصة مكتملة الشروط")), "㊵ story checker confirms a requirements-complete story");
    }
    el.remove();
  }

  // ---------------- 7) عبارات المصدر الحساسة تصل إلى العرض ----------------
  // النص الكامل = SSR ثابت + كل الحالات الوسيطة والنهائية بعد التفاعل
  const allWalked = staticHtml + "\n" + [...finalHtmlBySlide.values()].join("\n");
  const walkedAllN = norm(plainOf(allWalked)) + "\n" + [...slideStates.values()].map((x) => x.states.join("\n")).join("\n");
  const keepPhrases = [
    "I visited my uncle yesterday.",
    "I had visited my uncle before I went to the museum.",
    "The train had left before I arrived.",
    "I had lost my key before I arrived home.",
    "go → went → gone",
    "eat → ate → eaten",
    "see → saw → seen",
    "Had + subject + V3?",
    "Yesterday, I had visited my grandmother.",
    "When John arrived, Mary had left.",
    "When Mary arrived, John had left.",
    "When Sarah arrived, Tom had left.",
    "When Tom left, Sarah had arrived.",
    "When Daniel entered the laboratory, the scientists were discussing the experiment. They had already completed the first stage, so Daniel joined the second stage.",
    "I was running in the park when I saw a dog. I realized that I had seen this dog before.",
    "When I arrived at the airport, the plane had already taken off, people were running toward the gates, and an employee was talking to a confused passenger.",
  ];
  for (const phrase of keepPhrases) {
    ok(walkedAllN.includes(norm(phrase)), `key source phrase reaches the rendered lesson: ${phrase.slice(0, 60)}`);
  }
  // جمل المفاهيم الأصلية تبقى محفوظة حرفيًا في سجل المصدر (الشرح التفاعلي يعيد صياغتها تربويًا)
  const ledgerAll = SOURCE_SECTIONS.flatMap((s) => [...s.units, ...(s.revealUnits ?? [])]).join("\n");
  const ledgerPhrases = [
    "When I arrived, the shop had closed.",
    "When Maya arrived, Daniel left.",
    "When Maya arrived, Daniel had left.",
    "When I opened the box, someone had taken the necklace.",
    "The students had left before the teacher arrived.",
    "By the time we arrived, the movie had started.",
    "By the time the firefighters arrived, the fire had spread.",
    "When I called Lina, she had already gone to bed.",
    "When we reached the stadium, the game had already started.",
    "When I entered the room, the teacher had just arrived.",
    "I visited Paris in 2024.",
  ];
  for (const phrase of ledgerPhrases) {
    ok(ledgerAll.includes(phrase), `ledger keeps the source sentence verbatim: ${phrase.slice(0, 60)}`);
  }
  for (const flipped of [
    "left had train the arrived, I When",
    "closed had shop the arrived I When",
    "V3 + had + Subject",
    "gone → went → go",
    "left had Daniel arrived Maya When",
  ]) {
    ok(!walkedAllN.includes(norm(flipped)), `no reversed English word order: ${flipped}`);
  }
  for (const wrong of m.INTENTIONALLY_WRONG_28) {
    ok(allWalked.includes(wrong.replace(/\s*❌\s*$/, "")) || walkedAllN.includes(norm(wrong)), `intentionally wrong source sentence renders as-is: ${wrong.slice(0, 52)}`);
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
    const tenses = m.ALEX_SCENE_28.verbs.map((v) => v.tense);
    ok(tenses.filter((t) => t === "Past Simple").length === 3, "㊲ keeps 3 Past Simple verbs (entered/looked/realized)");
    ok(tenses.filter((t) => t === "Past Continuous").length === 3, "㊲ keeps 3 Past Continuous verbs (sitting/reading/preparing)");
    ok(tenses.filter((t) => t === "Past Perfect").length === 2, "㊲ keeps 2 Past Perfect verbs (had opened / had never left)");
    ok(m.ALEX_SCENE_28.verbs.some((v) => v.verb === "had opened" && v.tense === "Past Perfect"), "㊲ had opened → Past Perfect");
    ok(m.ALEX_SCENE_28.verbs.some((v) => v.verb === "had never left" && v.tense === "Past Perfect"), "㊲ had never left → Past Perfect");
  }

  // ---------------- 9) منطقة الاختبارات: 20 سؤالًا أصليًا ----------------
  ok(m.TEST_28.length === 20, `Test Area has exactly 20 questions (got ${m.TEST_28.length})`);
  ok(m.TEST_28.every((q, i) => q.n === i + 1), "test questions are numbered 1..20");
  const usedTypes = new Set(m.TEST_28.map((q) => q.type));
  for (const t of ["single", "tf", "multi", "order", "match", "spot"]) {
    ok(usedTypes.has(t), `test uses structured type: ${t}`);
  }
  ok(m.TEST_28.filter((q) => q.type !== "single").length >= 8, "test is not all multiple choice (≥8 non-single questions)");
  ok(m.TEST_28.every((q) => q.why && q.why.length > 10), "every test question has an explanatory why");
  {
    const html = m.renderToString(m.React.createElement(m.TestArea28, {}));
    const count = (html.match(/data-test-q="/g) || []).length;
    ok(count === 20, `Test Area renders all 20 question cards (got ${count})`);
    ok(plainOf(html).includes("إنهاء الاختبار"), "Test Area keeps the submit button");
    ok(!html.includes("نتيجتك") && !plainOf(html).includes("النتيجة النهائية"), "Test Area shows no score before submission");
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
      await tick(12);
    };
    if (q.type === "single" || q.type === "spot") {
      const pool = q.type === "single" ? q.opts : q.segments;
      const idx = correct ? q.answer : (q.answer + 1) % pool.length;
      await tap(byTextIn(pool[idx]));
      return true;
    }
    if (q.type === "tf") {
      await tap(byTextIn(correct ? (q.answer ? "✔ صح" : "✘ خطأ") : q.answer ? "✘ خطأ" : "✔ صح"));
      return true;
    }
    if (q.type === "multi") {
      const picks = correct ? q.answer : [0, 1, 2, 3].filter((i) => i < q.opts.length && !q.answer.includes(i)).slice(0, 1);
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
    // المسار الخاطئ كاملًا: 0/20 + لا علامات قبل الإنهاء + إعادة نظيفة
    const el = m.mount(m.React.createElement(m.TestArea28, { onShowSolutions: noop }));
    await tick(80);
    const submit = byText(el, "إنهاء الاختبار");
    ok(!!submit && submit.disabled, "submit is disabled before answering everything");
    for (const q of m.TEST_28) await answerQuestion(el, q, false);
    await tick(60);
    const submit2 = byText(el, "إنهاء الاختبار");
    ok(!!submit2 && !submit2.disabled, "submit unlocks after answering all 20");
    const preHtml = el.innerHTML;
    ok(!preHtml.includes("نتيجتك") && !preHtml.includes("النتيجة النهائية") && !preHtml.includes("bg-emerald-600") && !preHtml.includes("bg-rose-600"), "no score/marks leak after answering but before submit");
    const labels = [...el.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label") || "");
    ok(labels.every((l) => !/correct|answer|الإجابة الصحيحة/.test(l)), "aria-labels expose no answers");
    submit2.click();
    await tick(80);
    const afterTxt = plainOf(el.innerHTML).replace(/\s+/g, " ");
    ok(afterTxt.includes("النتيجة النهائية: 0 / 20"), `all-wrong attempt scores 0 / 20 (got: ${afterTxt.match(/النتيجة النهائية[^ ]* [^ ]* [^ ]* [^ ]*/)?.[0] ?? "—"})`);
    ok(el.innerHTML.includes("bg-rose-600"), "wrong answers are marked after submit");
    ok(!!byText(el, "افتح الحلول"), "solutions entry appears after submit");
    const reset = byText(el, "إعادة الاختبار");
    ok(!!reset, "reset button appears after submit");
    reset.click();
    await tick(60);
    ok(plainOf(el.innerHTML).includes("أجبت عن: 0 / 20"), "reset clears all answers");
    ok(!el.innerHTML.includes("النتيجة النهائية"), "reset clears the score");
    el.remove();
  }
  {
    // المسار الصحيح كاملًا: 20/20 + فتح قفل الحلول عبر onCheckedChange
    let checkedFlag = null;
    const el = m.mount(m.React.createElement(m.TestArea28, { onCheckedChange: (v) => { checkedFlag = v; }, onShowSolutions: noop }));
    await tick(80);
    for (const q of m.TEST_28) await answerQuestion(el, q, true);
    await tick(80);
    const submit = byText(el, "إنهاء الاختبار");
    ok(!!submit && !submit.disabled, "submit unlocks on the correct path");
    submit.click();
    await tick(80);
    const afterTxt = plainOf(el.innerHTML).replace(/\s+/g, " ");
    ok(afterTxt.includes("النتيجة النهائية: 20 / 20"), "all-correct attempt scores 20 / 20");
    ok(el.innerHTML.includes("bg-emerald-600"), "correct answers are marked after submit");
    ok(checkedFlag === true, "onCheckedChange(true) fires after grading (drives solutions unlock)");
    el.remove();
  }

  // ---------------- 10) حلول الاختبارات ----------------
  ok(m.TEST_28_SOLUTIONS.length === 20, "solutions set has exactly 20 entries derived from the test");
  {
    const el = m.mount(m.React.createElement(m.Solutions28, { unlocked: false, onGoTest: noop, onGoTeacher: noop }));
    await tick(40);
    const lockedTxt = plainOf(el.innerHTML);
    ok(lockedTxt.includes("الحلول مقفلة"), "solutions show a locked state before entitlement");
    ok(!lockedTxt.includes("الإجابة الصحيحة:") && !lockedTxt.includes(norm(m.TEST_28[0].why)), "solutions leak no answers/explanations before entitlement");
    el.remove();
    const open = m.mount(m.React.createElement(m.Solutions28, { unlocked: true }));
    await tick(60);
    const openTxt = plainOf(open.innerHTML).replace(/\s+/g, " ");
    const openN = normText(open.innerHTML);
    const count = (openTxt.match(/الإجابة الصحيحة:/g) || []).length;
    ok(count === 20, `solutions render all 20 answer rows (got ${count})`);
    const missingWhy = m.TEST_28.filter((q) => !openN.includes(norm(q.why)));
    ok(missingWhy.length === 0, `every solution includes its reasoning (${missingWhy.length} missing: ${missingWhy.map((q) => q.n).join(",")})`);
    const missingTrap = m.TEST_28.filter((q) => q.trap && !openN.includes(norm(q.trap)));
    ok(missingTrap.length === 0, `every trap note is explained in solutions (${missingTrap.map((q) => q.n).join(",")})`);
    const missingAr = m.TEST_28.filter((q) => q.ar && !openN.includes(norm(q.ar)));
    ok(missingAr.length === 0, `every solution restates its question (${missingAr.map((q) => q.n).join(",")})`);
    open.remove();
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
  ok(m.TEACHER_28_NOTES.length >= 10, `teacher notes cover the tense decisions (${m.TEACHER_28_NOTES.length})`);
  ok(m.TEACHER_28_SOLUTIONS.length === 8, `teacher activity solutions cover the 8 source exercises ㉚㉛㉜㉝㉞㉟㊱㊴ (${m.TEACHER_28_SOLUTIONS.length})`);
  ok(m.TEACHER_28_MISTAKES.length >= 6, `teacher common-mistakes bank present (${m.TEACHER_28_MISTAKES.length})`);
  ok(m.TEACHER_28_RUBRIC.lines.length >= 8, "story rubric covers tense coverage, chronology, connectors, coherence");
  {
    const el = m.mount(m.React.createElement(m.TeacherArea28, { unlocked: false, onUnlockChange: () => {} }));
    await tick(50);
    ok(plainOf(el.innerHTML).includes("منطقة المعلم بكلمة مرور"), "teacher area starts locked");
    ok(!plainOf(el.innerHTML).includes("Lesson Overview"), "teacher area leaks nothing before unlock");
    const pw = el.querySelector('input[type="password"]');
    ok(!!pw, "teacher password input exists");
    setNativeValue(pw, "wrong-pass");
    await tick(20);
    byText(el, "دخول المعلم")?.click();
    await tick(40);
    ok(plainOf(el.innerHTML).includes("كلمة مرور غير صحيحة"), "wrong teacher password rejected");
    ok(!plainOf(el.innerHTML).includes("Lesson Overview"), "wrong password leaks nothing");
    el.remove();
  }
  {
    let saw = null;
    const el = m.mount(m.React.createElement(m.TeacherArea28, { unlocked: false, onUnlockChange: (v) => { saw = v; } }));
    await tick(50);
    const pw = el.querySelector('input[type="password"]');
    setNativeValue(pw, "somer173");
    await tick(20);
    byText(el, "دخول المعلم")?.click();
    await tick(40);
    ok(saw === true, "somer173 unlocks the Lesson 28 teacher area");
    el.remove();
    const openEl = m.mount(m.React.createElement(m.TeacherArea28, { unlocked: true, onUnlockChange: () => {}, onGoSolutions: noop }));
    await tick(60);
    const txt = plainOf(openEl.innerHTML);
    ok(txt.includes("Lesson Overview"), "teacher overview renders after unlock");
    ok(txt.includes("العلاقة بالدرس 27"), "teacher overview explains the Lesson 27 relationship");
    ok(txt.includes("ملاحظات التدريس"), "teacher notes render after unlock");
    ok(txt.includes("حلول تمارين المصدر بالتفصيل"), "teacher activity solutions render after unlock");
    ok(txt.includes("ملاحظة منطقية"), "teacher solutions disclose the ㉝ source-logic note");
    ok(txt.includes("الأخطاء الجسيمة"), "teacher common mistakes render after unlock");
    ok(!!byText(openEl, "اذهب إلى صفحة حلول الاختبار"), "teacher area links to test solutions");
    ok(txt.includes(norm(m.TEACHER_28_OVERVIEW.coreSkill).slice(0, 40)) || txt.includes(m.TEACHER_28_OVERVIEW.coreSkill.slice(0, 30)), "teacher overview keeps the core-skill brief");
    openEl.remove();
  }

  // ---------------- 12) الهيكل الرئيسي + التوجيه + عدم المساس بالبقية ----------------
  {
    const lessonHtml = m.renderToString(m.React.createElement(m.Lesson28, { onExit: noop }));
    ok(lessonHtml.length > 3000, "Lesson 28 main component renders");
    ok(lessonHtml.includes('dir="rtl"'), "Lesson 28 keeps the Arabic RTL shell");
    ok(lessonHtml.includes('dir="ltr"'), "Lesson 28 isolates English as LTR");
    ok(lessonHtml.includes("l28-main"), "Lesson 28 exposes its scroll container (#l28-main)");
    ok(lessonHtml.includes("data-slide-counter"), "Lesson 28 renders the step counter");
    ok((lessonHtml.match(/data-slide-counter/g) || []).join("") !== "" && /1 \/ 47|1\s*\/\s*47/.test(plainOf(lessonHtml)), "step counter starts at 1 / 47");
    ok(lessonHtml.includes('data-area="l28-test"'), "Test Area is present as a separate area");
    ok(lessonHtml.includes('data-area="l28-solutions"'), "Test Solutions area is present as a separate area");
    ok(lessonHtml.includes('data-area="l28-teacher"'), "Teacher Area is present as a separate area");
    ok(view.includes("ArrowLeft") && view.includes("ArrowRight"), "keyboard arrow navigation wired");
    ok(view.includes("→ السابق") && view.includes("التالي ←"), "Previous/Next controls present");
    ok(!view.includes("split(/(\\s+)/)"), "no per-token space splitting (word-reversal engine banned)");
  }
  {
    const app = readFileSync(join(root, "src", "App.tsx"), "utf8");
    ok(app.includes('import Lesson28 from "./lessons/lesson28/Lesson28"') && app.includes("route === 28"), "Lesson 28 routed in App.tsx");
    ok(app.includes("#/lesson/28"), "Lesson 28 hub card registered");
    ok(app.includes("route === 27") && app.includes("#/lesson/27"), "Lesson 27 route + hub card remain");
    ok(app.includes("route === 29") && app.includes("#/lesson/29"), "Lesson 29 route + hub card remain");
    ok(app.includes("route === 30") && app.includes("#/lesson/30"), "Lesson 30 route + hub card remain");
    for (let n = 1; n <= 26; n++) ok(app.includes(`route === ${n}`), `Lesson ${n} route still registered`);
    const l27 = readFileSync(join(root, "src", "lessons", "lesson27", "Lesson27.tsx"), "utf8");
    ok(l27.includes("export default function Lesson27"), "Lesson 27 component remains intact");
    const l29 = readFileSync(join(root, "src", "lessons", "lesson29", "Lesson29.tsx"), "utf8");
    ok(l29.includes("export default function Lesson29"), "Lesson 29 component remains intact");
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
console.log(`✓ Lesson 28 audit passed (${checks} assertions): 47-section ledger exact-once coverage, 47 native steps rendered, reveal gating, ㉝ logic note, 20-Q test flow, solutions, teacher gate, BIDI isolation.`);
