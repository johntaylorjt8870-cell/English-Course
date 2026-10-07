// ============================================================
// Lesson 30 audit — Native Multi-Step Interactive Lesson
//   node scripts/audit-lesson30.mjs
// Verifies (benchmark: Lesson 6 / Lessons 27 + 28 + 29 rebuilds):
//   1) Source ledger: 40 numbered sections ①–㊵ + 6 unnumbered = 46.
//   2) Step registry: 46 slides cover every ledger section id exactly once.
//   3) Real render of all 46 steps: no throws, LTR isolation, source chips.
//   4) Interactive layer: ≥20 distinct lab hooks, immediate-feedback kit.
//   5) Interactive walk: every slide driven to completion (McqRow / Detective
//      correct path / TapOrder convergence / FixItem stages / toggles / stories).
//   6) Immediate-feedback contract: no solve-all-then-check in the student area;
//      gated source summaries appear only after completing the interaction.
//   7) Preserved key source phrases reach the rendered lesson; no word reversal.
//   8) Exercise data fidelity (QUIZ1/QUIZ2/ERRORS/FINAL_EXAM/DETECTIVEx5/BOSS).
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
const outFile = join(root, "scripts", ".lesson30-audit.mjs");

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
import Lesson30, { SlideView30, TestArea30, Solutions30, TeacherArea30, VIEW_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson30/Lesson30.tsx"))};
import { SLIDES, SLIDE_COUNT, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, DETECTIVE_RESCUE_30, DETECTIVE_SAM_30, DETECTIVE_LINA_30, DETECTIVE_NORA_30, DETECTIVE_FINAL_30, QUIZ1_30, QUIZ2_30, ERRORS_30, FINAL_EXAM_30, CHALLENGE_WORDS_30, BOSS_STARTER_30, TEST_30, TEST_30_SOLUTIONS, TEACHER_PASSWORD_30, TEACHER_30_OVERVIEW, TEACHER_30_NOTES, TEACHER_30_SOLUTIONS, TEACHER_30_RUBRICS, TEACHER_30_MISTAKES, INTENTIONALLY_WRONG_30 } from ${JSON.stringify(join(root, "src/lessons/lesson30/data.ts"))};
function mount(node) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(node);
  return el;
}
const React_ = React;
export { React_ as React, renderToString, createRoot, Lesson30, SlideView30, TestArea30, Solutions30, TeacherArea30, VIEW_SLIDES, SLIDES, SLIDE_COUNT, SOURCE_SECTIONS, SEC, SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT, DETECTIVE_RESCUE_30, DETECTIVE_SAM_30, DETECTIVE_LINA_30, DETECTIVE_NORA_30, DETECTIVE_FINAL_30, QUIZ1_30, QUIZ2_30, ERRORS_30, FINAL_EXAM_30, CHALLENGE_WORDS_30, BOSS_STARTER_30, TEST_30, TEST_30_SOLUTIONS, TEACHER_PASSWORD_30, TEACHER_30_OVERVIEW, TEACHER_30_NOTES, TEACHER_30_SOLUTIONS, TEACHER_30_RUBRICS, TEACHER_30_MISTAKES, INTENTIONALLY_WRONG_30, mount };
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
const byText = (scope, text) => [...scope.querySelectorAll("button")].find((b) => (b.textContent || "").includes(text));
const setNativeValue = (el, value) => {
  const proto = el.tagName === "TEXTAREA" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(new win.Event("input", { bubbles: true }));
};
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));
const noop = () => {};
const lensIdx = (t) => (t === "Past Simple" ? 0 : t === "Past Continuous" ? 1 : t === "Past Perfect" ? 2 : 3);

const BOSS_STORY = "When the firefighters arrived, people were standing outside. The fire had already reached the roof, and the team had been preparing for ten minutes. Then the chief shouted orders.";
const CHALLENGE_STORY = "One strange morning, I woke up early. While I was dressing, I heard a knock. When I opened the door, nobody was there. I had left the gate open before midnight. After I ate breakfast, I walked to the garden. The birds were singing as I was searching for footprints. Someone had broken the fence during the night. By the time I arrived, the dog had escaped. It had been raining since morning. I had been waiting for an hour when my uncle called. He had already found the missing keys. We laughed and went home together.";

try {
  const { SLIDES, VIEW_SLIDES, SOURCE_SECTIONS, SEC } = m;
  const view = readFileSync(join(root, "src/lessons/lesson30/Lesson30.tsx"), "utf8");

  // ---------------- 1) سجل المصدر ----------------
  ok(SOURCE_SECTIONS.length === m.SOURCE_LEDGER_COUNT, `ledger length matches SOURCE_LEDGER_COUNT (${SOURCE_SECTIONS.length})`);
  ok(m.SOURCE_NUMBERED_COUNT === 40, `numbered sections 1..40 are all indexed (got ${m.SOURCE_NUMBERED_COUNT})`);
  ok(m.SOURCE_LEDGER_COUNT === 46, `ledger totals 46 sections: 40 numbered + 6 unnumbered (got ${m.SOURCE_LEDGER_COUNT})`);
  const nums = SOURCE_SECTIONS.filter((s) => s.num !== undefined).map((s) => s.num).sort((a, b) => a - b);
  ok(nums.length === 40 && nums[0] === 1 && nums[39] === 40 && nums.every((n, i) => n === i + 1), `ledger covers every number 1..40 exactly once (${nums.length})`);
  for (const id of ["cover", "opening", "objectives", "summary", "golden", "final"]) {
    ok(SOURCE_SECTIONS.some((s) => s.id === id), `unnumbered ledger section "${id}" present`);
  }
  ok(SOURCE_SECTIONS.every((s) => s.units.length > 0 && s.units.every((u) => String(u).trim().length > 0)), "no source section lost its units");
  ok(SOURCE_SECTIONS.every((s) => s.units.every((u) => !u.includes("**"))), "no markdown noise left inside source units");
  // عينات حرفية من المصدر
  const U = (id) => SOURCE_SECTIONS[SEC[id]].units;
  ok(U("s3").includes("Leo opened the window."), "ledger keeps ③ Leo sentence verbatim");
  ok(U("s3").includes("لأن القصة تسير إلى الأمام خطوة بخطوة."), "ledger keeps ③ forward-story note verbatim");
  ok(U("s13").includes("When I arrived, Sara left."), "ledger keeps ⑬ plain sentence verbatim");
  ok(U("s13").includes("I arrived → Sara left."), "ledger keeps ⑬ plain order verbatim");
  ok(U("s13").includes("إنها قد تغيّر ترتيب الأحداث."), "ledger keeps ⑬ had warning verbatim");
  ok(U("s20").includes("before = Past Perfect."), "ledger keeps ⑳ false rule verbatim");
  for (const a of ["① B", "② A", "③ A", "④ B", "⑤ C"]) ok(U("s25").includes(a), `ledger keeps ㉕ answer ${a}`);
  ok(U("s32").includes("① I had been studied for three hours."), "ledger keeps ㉜ error ① verbatim");
  ok(U("s32").includes("⑥ Did you had finished your work?"), "ledger keeps ㉜ error ⑥ verbatim");
  ok(U("s32").includes("② I had been waiting for two hours when he arrived."), "ledger keeps ㉜ fix ② verbatim");
  ok(U("s33").includes("C") && U("s33").includes("for an hour"), "ledger keeps ㉝ best answer + duration cue");
  ok(U("s34").includes("→ C") && U("s34").includes("→ B") && U("s34").includes("→ D"), "ledger keeps ㉞ meaning mapping verbatim");
  ok(U("s34").includes("الزمن ليس مجرد قاعدة؛ إنه زاوية نظر إلى الحدث."), "ledger keeps ㉞ angle-of-view line verbatim");
  ok(U("s40").includes("✅ 4 Past Simple") && U("s40").includes("by the time"), "ledger keeps ㊵ requirements verbatim");
  ok(U("golden").includes("لا تحفظ الأزمنة كأنها أربع جزر منفصلة."), "ledger keeps golden rule verbatim");
  ok(U("final").includes("📸 الحدث → 🎥 الخلفية → ⏪ الحدث الأقدم → ⏪🎥 النشاط الأقدم المستمر"), "ledger keeps final system line verbatim");

  // ---------------- 2) سجل الخطوات: تغطية exact-once ----------------
  ok(SLIDES.length === 46, `step registry has exactly 46 slides (got ${SLIDES.length})`);
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
  ok(SLIDES.every((s) => typeof s.lead === "string" && typeof s.tip === "string"), "every step carries lead + tip teaching text");
  // لا عرض خام: السجل مرجع تدقيق فقط
  ok(!view.includes("unitsOf") && !view.includes(".units"), "student area never maps raw source units");
  ok(!view.includes("LINES_30") && !view.includes("rawLines"), "no raw source-line dump viewer survives in the student area");
  ok(!view.includes("تحقق من الإجابات"), "no solve-all-then-check pattern in the lesson source");
  for (const slide of SLIDES) ok(view.includes(`case "${slide.id}"`), `SlideBody wires step "${slide.id}"`);

  // ---------------- 3) العرض الحقيقي لكل خطوة ----------------
  const broken = [];
  const missingLtr = [];
  const missingMarker = [];
  const undefinedText = [];
  const slideHtml = new Map();
  for (const slide of VIEW_SLIDES) {
    let html = "";
    try {
      html = m.renderToString(m.React.createElement(m.SlideView30, { s: slide }));
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
  ok(broken.length === 0, `every one of the 46 steps renders without throwing (${broken.join(" | ").slice(0, 300)})`);
  ok(missingLtr.length === 0, `every step isolates English as LTR (${missingLtr.join(",")})`);
  ok(missingMarker.length === 0, `every step renders its data-source-section chip (${missingMarker.join(",")})`);
  ok(undefinedText.length === 0, `no step renders "undefined"/[object Object] (${undefinedText.join(",")})`);

  // ---------------- 4) طبقة التفاعل ----------------
  const staticHtml = [...slideHtml.values()].join("\n");
  const labSeqs = new Set([...staticHtml.matchAll(/data-en-seq="(l30-[^"]+)"/g)].map((x) => x[1]));
  ok(labSeqs.size >= 20, `lesson ships its interactive lab layer (${labSeqs.size} distinct labs ≥ 20)`);
  ok(staticHtml.includes('data-en-seq="l30-s38-write"'), "in-lesson writing arena present: ㊳ FINAL BOSS");
  ok(staticHtml.includes('data-en-seq="l30-s40-write"'), "in-lesson writing arena present: ㊵ mystery-day challenge");
  ok((view.match(/<\s*Lab\s/g) || []).length >= 20, "Lab teaching kit used across the lesson");
  ok((view.match(/<PlatformTag|<PlatformPanel|Platform Explanation/g) || []).length >= 3, "platform additions are tagged Platform Explanation");
  ok(view.includes("SentenceCard"), "sentence anatomy kit (SentenceCard) used");
  ok(view.includes("McqRow") && view.includes("DetectiveQuiz") && view.includes("TapOrder") && view.includes("FixItem"), "immediate-feedback primitives (McqRow/DetectiveQuiz/TapOrder/FixItem) used");

  // ---------------- 5) المشي التفاعلي لكل خطوة ----------------
  const DETECT_ANSWERS = {
    s10: [1, 0, 0, 2],
    s11: [1, 0, 0, 2, 0, 3],
    s24: m.DETECTIVE_RESCUE_30.map((d) => lensIdx(d.tense)),
    s28: m.DETECTIVE_NORA_30.map((d) => lensIdx(d.tense)),
    s30: m.DETECTIVE_SAM_30.map((d) => lensIdx(d.tense)),
    s36: m.DETECTIVE_LINA_30.map((d) => lensIdx(d.tense)),
    final: m.DETECTIVE_FINAL_30.map((d) => lensIdx(d.tense)),
  };
  const FIX_BAD = [2, 1, 3, 1, 1, 0];
  const slideStates = new Map();
  const finalHtmlBySlide = new Map();
  for (const slide of VIEW_SLIDES) {
    const el = m.mount(m.React.createElement(m.SlideView30, { s: slide }));
    await tick(50);
    const states = [];
    const capture = () => states.push(normText(el.innerHTML));
    capture();
    const revealsBefore = (el.innerHTML.match(/data-reveal-block/g) || []).length;
    // (أ) نقرة عامة على كل زر — مع إعادة الاستعلام بعد كل نقرة لأن بعض
    // المختبرات تعيد تركيب أزرارها (منتقي الجمل/المبدّلات تعيد بناء McqRow عبر key)
    const clicked = new Set();
    for (let k = 0; k < 120; k++) {
      const next = [...el.querySelectorAll("button")].filter((b) => !b.disabled && !clicked.has(b))[0];
      if (!next) break;
      clicked.add(next);
      next.click();
      await tick(8);
      capture();
    }
    // (ب) إتمام الترتيب الموجّه بالتقارب
    for (let round = 0; round < 14; round++) {
      const enabled = [...el.querySelectorAll("[data-order-item]")].filter((b) => !b.disabled);
      if (enabled.length === 0) break;
      for (const b of enabled) {
        b.click();
        await tick(8);
        capture();
      }
    }
    // (ج) إتمام التصحيح بخطوتيه
    if (slide.id === "s32") {
      for (let n = 1; n <= 6; n++) {
        const seg = el.querySelector(`[data-fix-item="${n}"] [data-fix-seg="${FIX_BAD[n - 1]}"]`);
        if (seg) {
          seg.click();
          await tick(10);
          capture();
        }
        const opt = el.querySelector(`[data-fix-item="${n}"] [data-fix-opt="${m.ERRORS_30[n - 1].answer}"]`);
        if (opt) {
          opt.click();
          await tick(10);
          capture();
        }
      }
    }
    // (د) المسار الصحيح للمحقق
    const detectSeq = el.querySelector('[data-en-seq$="-detect"]');
    const answers = DETECT_ANSWERS[slide.id];
    if (detectSeq && answers) {
      for (let i = 0; i < answers.length; i++) {
        const chips = detectSeq.querySelector(`[data-detect-chips="${i}"]`);
        const btns = chips ? [...chips.querySelectorAll("button")] : [];
        if (btns[answers[i]]) {
          btns[answers[i]].click();
          await tick(10);
          capture();
        }
      }
    }
    // (هـ) ساحات الكتابة: نص يستوفي المتطلبات
    const area = el.querySelector("textarea");
    if (area) {
      setNativeValue(area, slide.id === "s40" ? CHALLENGE_STORY : BOSS_STORY);
      await tick(40);
      capture();
    }
    const revealsAfter = (el.innerHTML.match(/data-reveal-block/g) || []).length;
    slideStates.set(slide.id, { states, revealsBefore, revealsAfter });
    finalHtmlBySlide.set(slide.id, el.innerHTML);
    el.remove();
  }

  // ---------------- 6) عقد التغذية الفورية + بوابات الملخصات ----------------
  for (const slide of VIEW_SLIDES) {
    const html = finalHtmlBySlide.get(slide.id) ?? "";
    const checkBtns = [...new JSDOM(`<div>${html}</div>`).window.document.querySelectorAll("button")].filter((b) => (b.textContent || "").includes("تحقق"));
    ok(checkBtns.length === 0, `step "${slide.id}": no check button — feedback is immediate`);
  }
  {
    const s25 = finalHtmlBySlide.get("s25") ?? "";
    ok(s25.includes("الصحيح:"), "㉕ wrong picks reveal the correction immediately (no check step)");
    const s32 = finalHtmlBySlide.get("s32") ?? "";
    ok(s32.includes("الجملة الصحيحة"), "㉜ completed fixes render the corrected sentence");
    const s2 = (slideStates.get("s2")?.states ?? []).join("\n");
    ok(s2.includes(norm("PAST CONTINUOUS")) && s2.includes(norm("PAST PERFECT")) && s2.includes(norm("PAST PERFECT CONTINUOUS")), "② tense machine reaches live verdicts while answering");
    const s38 = finalHtmlBySlide.get("s38") ?? "";
    ok(normText(s38).includes(norm("كل المتطلبات محققة")), "㊳ live analyzer confirms a requirements-complete story");
    const s40 = finalHtmlBySlide.get("s40") ?? "";
    ok(normText(s40).includes(norm("كل المتطلبات محققة")), "㊵ live analyzer confirms a requirements-complete story");
    const ta = new JSDOM(`<div>${s38}</div>`).window.document.querySelector("textarea");
    ok(!!ta, "㊳ story arena renders its writing area");
  }
  const gatedMcq = ["s1", "s4", "s17", "s18", "s25", "s26", "s27", "s35", "s39"];
  for (const id of gatedMcq) {
    const st = slideStates.get(id);
    ok(!!st && st.revealsBefore === 0, `${id}: source summary hidden before completing the interaction`);
    ok(!!st && st.revealsAfter >= 1, `${id}: source summary appears after completing the interaction`);
  }
  for (const id of ["s8", "s10", "s11", "s24", "s28", "s30", "s36", "final"]) {
    const st = slideStates.get(id);
    ok(!!st && st.revealsBefore === 0, `${id}: completion summary hidden before solving`);
    ok(!!st && st.revealsAfter >= 1, `${id}: completion summary appears after solving`);
  }
  {
    const r25 = normText(finalHtmlBySlide.get("s25") ?? "");
    ok(r25.includes(norm("① B")) && r25.includes(norm("⑤ C")), "㉕ completion summary keeps the source answer key");
    const r39 = normText(finalHtmlBySlide.get("s39") ?? "");
    ok(r39.includes(norm("① B")) && r39.includes(norm("⑧ C")), "㊴ completion summary keeps the source answer key");
  }

  // ---------------- 7) عبارات المصدر الحساسة تصل إلى العرض ----------------
  const allWalked = staticHtml + "\n" + [...finalHtmlBySlide.values()].join("\n");
  const walkedAllN = norm(plainOf(allWalked)) + "\n" + [...slideStates.values()].map((x) => x.states.join("\n")).join("\n");
  const keepPhrases = [
    "I opened the door.",
    "I was opening the door.",
    "I had opened the door before the lights went out.",
    "I had been opening boxes for an hour before the lights went out.",
    "Leo opened the window.",
    "He smiled.",
    "Leo was sitting near the window.",
    "Birds were singing.",
    "People were walking in the street.",
    "When Maya arrived at the station, the train had already left. People were waiting for another train, and one man had been standing there for more than an hour.",
    "I walked to school.",
    "I got dressed.",
    "I was walking to school when I heard a strange sound. I realized that I had left my phone at home.",
    "I was walking to school when I heard a strange sound. I realized that I had left my phone at home. I was tired because I had been walking for forty minutes.",
    "When I arrived, Sara left.",
    "When I arrived, Sara had left.",
    "Sara left → I arrived.",
    "I arrived → Sara left.",
    "I was waiting when the bus arrived.",
    "I had been waiting for forty minutes when the bus arrived.",
    "She had cleaned the kitchen before the guests arrived.",
    "She had been cleaning the kitchen for two hours before the guests arrived.",
    "He had painted the wall.",
    "He had been painting the wall for three hours.",
    "I visited my aunt yesterday.",
    "At 8:00 yesterday, I was visiting my aunt.",
    "Before I went to bed yesterday, I had finished my homework.",
    "When I arrived, Tom left.",
    "When I arrived, Tom was sleeping.",
    "When I arrived, Tom had left.",
    "When I arrived, Tom had been sleeping for two hours.",
    "While I was studying, my brother was playing video games.",
    "While I was walking home, I saw an old friend.",
    "While they were eating, someone knocked on the door.",
    "I finished my homework before I watched TV.",
    "I had finished my homework before I watched TV.",
    "By the time we arrived, the store had closed.",
    "By the time the game started, the players had warmed up.",
    "By the time I woke up, everyone had left.",
    "When the rescue team arrived, the villagers were standing near the river. They had been waiting for help for several hours because the water had already reached the main road.",
    "When I entered the room, everyone",
    "Ahmed was sleeping.",
    "Ahmed had been sleeping for two hours.",
    "they had been eating dinner for an hour",
    "When Nora entered the kitchen, her mother was cooking, her father had already washed the dishes, and her brother had been preparing dessert for an hour.",
    "I had left my phone at home.",
    "At 7:30 yesterday, Sam was driving home. He had finished work an hour earlier. He had been working since early morning, so he was exhausted. While he was driving, his phone rang.",
    "Had you finished your work?",
    "They had known each other for ten years.",
    "I had been studying for three hours.",
    "When we arrived, the movie had already started.",
    "He had gone home before I called.",
    "I had been waiting for two hours when he arrived.",
    "When I arrived, Sarah",
    "had been studying",
    "He had been painting the house for three hours.",
    "When Lina entered the old library, several students were searching through the shelves. The librarian had already locked one of the rooms because someone had broken a window. Lina noticed that the students had been searching for almost an hour. Suddenly, a loud noise came from upstairs.",
    "When the firefighters arrived",
    "When I got home, my sister",
    "By the time we arrived, the show",
    "Before the teacher arrived, the students",
    "I was opening the door when the phone rang.",
    "I had been waiting for an hour before the bus arrived.",
    "المعنى هو الذي يختار الزمن.",
    "الزمن ليس مجرد قاعدة؛ إنه زاوية نظر إلى الحدث.",
    "had ليست مجرد إضافة شكلية",
    "before = Past Perfect",
    "When the scientist entered the laboratory, the assistants were checking the equipment. They had already completed the first test, but they had been working on the second test for nearly three hours. Suddenly, one of the machines stopped.",
  ];
  for (const phrase of keepPhrases) {
    ok(walkedAllN.includes(norm(phrase)), `key source phrase reaches the rendered lesson: ${phrase.slice(0, 60)}`);
  }
  {
    const s5 = (slideStates.get("s5")?.states ?? []).join("\n");
    ok(s5.includes(norm("broken")) && s5.includes(norm("فلاش باك")), "⑤ anatomy + flashback concept render");
    const s6 = (slideStates.get("s6")?.states ?? []).join("\n");
    ok(s6.includes(norm("all night")), "⑥ duration chip renders");
    const s9 = (slideStates.get("s9")?.states ?? []).join("\n");
    ok(s9.includes(norm("strange sound")), "⑨ event chip renders");
    const s22 = (slideStates.get("s22")?.states ?? []).join("\n");
    ok(s22.includes(norm("already")), "㉒ already placement renders");
    const s23 = (slideStates.get("s23")?.states ?? []).join("\n");
    ok(s23.includes(norm("still working")), "㉓ still continuity renders");
  }
  for (const flipped of [
    "door the opened I",
    "left had Sara arrived I When",
    "tired was Leo",
    "night all working been had he",
    "aunt my visited I",
  ]) {
    ok(!walkedAllN.includes(norm(flipped)), `no reversed English word order: ${flipped}`);
  }
  for (const w of m.INTENTIONALLY_WRONG_30) {
    ok(walkedAllN.includes(norm(w.wrong)), `intentionally wrong source sentence renders as-is: ${w.wrong.slice(0, 52)}`);
  }

  // ---------------- 8) بيانات التدريبات ----------------
  ok(m.QUIZ1_30.length === 5, `㉕ keeps all 5 source questions (${m.QUIZ1_30.length})`);
  ok(JSON.stringify(m.QUIZ1_30.map((q) => q.answer)) === JSON.stringify([1, 0, 0, 1, 2]), "㉕ keeps the source answers (B/A/A/B/C)");
  ok(m.QUIZ2_30.length === 3, "㉖ keeps all 3 meaning questions");
  ok(JSON.stringify(m.QUIZ2_30.map((q) => q.answer)) === JSON.stringify([1, 0, 2]), "㉖ keeps the source answers (B/A/C)");
  ok(m.QUIZ2_30.every((q) => q.note && q.note.length > 5), "㉖ keeps every source explanation note");
  ok(m.ERRORS_30.length === 6, `㉜ keeps all 6 source errors (${m.ERRORS_30.length})`);
  ok(m.ERRORS_30.every((e) => e.answer === 0), "㉜ fix options keep the source correction first");
  ok(m.ERRORS_30[1].sourceNote?.length === 5, "㉜ keeps the ② I-was-waiting source caution");
  ok(m.FINAL_EXAM_30.length === 8, `㊴ keeps all 8 source questions (${m.FINAL_EXAM_30.length})`);
  ok(JSON.stringify(m.FINAL_EXAM_30.map((q) => q.answer)) === JSON.stringify([1, 2, 3, 2, 3, 0, 2, 2]), "㊴ keeps the source answers (B/C/D/C/D/A/C/C)");
  ok(m.DETECTIVE_RESCUE_30.length === 4, "㉔ keeps all 4 rescue verbs");
  ok(m.DETECTIVE_NORA_30.length === 4, "㉘ keeps all 4 Nora verbs");
  ok(m.DETECTIVE_SAM_30.length === 5, "㉚ keeps all 5 Sam verbs");
  ok(m.DETECTIVE_LINA_30.length === 6, "㊱ keeps all 6 Lina verbs");
  ok(m.DETECTIVE_FINAL_30.length === 5, "final challenge keeps all 5 lab verbs");
  ok(m.DETECTIVE_SAM_30.some((d) => d.verb === "was" && d.tense === "Past Simple"), "㉚ was → Past Simple (verb to be)");
  ok(m.DETECTIVE_FINAL_30.some((d) => d.verb === "stopped" && d.tense === "Past Simple"), "final stopped → Past Simple");
  ok(m.CHALLENGE_WORDS_30.length === 8 && m.CHALLENGE_WORDS_30.includes("by the time"), "㊵ keeps all 8 required words");
  ok(m.BOSS_STARTER_30.startsWith("When the firefighters arrived"), "㊳ keeps the mandatory story starter");
  ok(m.INTENTIONALLY_WRONG_30.length === 6 && m.INTENTIONALLY_WRONG_30.every((w) => w.wrong !== w.right), "intentionally-wrong inventory keeps 6 wrong→right pairs");
  ok(m.TEST_30_SOLUTIONS.length === 20 && m.TEST_30_SOLUTIONS.every((s) => s.answer.length > 0 && s.why.length > 10), "test solutions derived for all 20 questions");

  // ---------------- 9) منطقة الاختبارات: 20 سؤالًا أصليًا ----------------
  ok(m.TEST_30.length === 20, `Test Area has exactly 20 questions (got ${m.TEST_30.length})`);
  ok(m.TEST_30.every((q, i) => q.n === i + 1), "test questions are numbered 1..20");
  const usedTypes = new Set(m.TEST_30.map((q) => q.type));
  for (const t of ["single", "tf", "multi", "order", "match", "spot"]) {
    ok(usedTypes.has(t), `test uses structured type: ${t}`);
  }
  ok(m.TEST_30.filter((q) => q.type !== "single").length >= 8, "test is not all multiple choice (≥8 non-single questions)");
  ok(m.TEST_30.every((q) => q.why && q.why.length > 10), "every test question has an explanatory why");
  ok(m.TEST_30.filter((q) => q.type === "order").every((q) => JSON.stringify([...q.items].sort()) === JSON.stringify([...q.answer].sort())), "order questions reuse exactly their items as the answer");
  ok(m.TEST_30.filter((q) => q.type === "match").every((q) => q.left.length === q.right.length && q.right.length === q.answer.length), "match questions align left/right/answer");
  ok(m.TEST_30.filter((q) => q.type === "spot").every((q) => q.answer < q.segments.length && q.fix.length > 3), "spot questions point at a real segment with a fix");
  {
    const html = m.renderToString(m.React.createElement(m.TestArea30, {}));
    const count = (html.match(/data-test-q="/g) || []).length;
    ok(count === 20, `Test Area renders all 20 question cards (got ${count})`);
    ok(plainOf(html).includes("إنهاء الاختبار"), "Test Area keeps the submit button");
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
      await tick(12);
    };
    if (q.type === "single") {
      const idx = correct ? q.answer : (q.answer + 1) % q.opts.length;
      await tap(byTextIn(q.opts[idx]));
      return true;
    }
    if (q.type === "spot") {
      const idx = correct ? q.answer : (q.answer + 1) % q.segments.length;
      await tap(byTextIn(q.segments[idx]));
      return true;
    }
    if (q.type === "tf") {
      await tap(byTextIn(correct ? (q.answer ? "✓ صحيح" : "✕ خطأ") : q.answer ? "✕ خطأ" : "✓ صحيح"));
      return true;
    }
    if (q.type === "multi") {
      const picks = correct ? q.answer : [0, 1, 2, 3].filter((i) => i < q.opts.length && !q.answer.includes(i)).slice(0, 1);
      for (const i of picks) await tap(byTextIn(q.opts[i]));
      return true;
    }
    if (q.type === "order") {
      const seq = correct ? q.answer : [...q.items].reverse();
      for (const s of seq) {
        const pool = btns.filter((b) => !b.disabled);
        const hit = pool.find((b) => (b.textContent || "") === s) ?? pool.find((b) => (b.textContent || "").includes(s));
        await tap(hit);
      }
      return true;
    }
    if (q.type === "match") {
      const groups = q.left.length;
      const per = q.right.length;
      for (let i = 0; i < groups; i++) {
        const want = correct ? q.answer[i] : (q.answer[i] + 1) % per;
        const groupBtns = btns.slice(i * per, (i + 1) * per);
        const hit = groupBtns.find((b) => (b.textContent || "") === q.right[want]) ?? groupBtns.find((b) => (b.textContent || "").includes(q.right[want]));
        await tap(hit);
      }
      return true;
    }
    return false;
  };
  {
    // المسار الخاطئ كاملًا: 0/20 + لا علامات قبل الإنهاء + إعادة نظيفة
    const el = m.mount(m.React.createElement(m.TestArea30, { onShowSolutions: noop }));
    await tick(80);
    const submit = byText(el, "إنهاء الاختبار");
    ok(!!submit && submit.disabled, "submit is disabled before answering everything");
    for (const q of m.TEST_30) await answerQuestion(el, q, false);
    await tick(60);
    const submit2 = byText(el, "إنهاء الاختبار");
    ok(!!submit2 && !submit2.disabled, "submit unlocks after answering all 20");
    const preHtml = el.innerHTML;
    ok(!preHtml.includes("نتيجتك") && !preHtml.includes("bg-emerald-600") && !preHtml.includes("bg-rose-600"), "no score/marks leak after answering but before submit");
    const labels = [...el.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label") || "");
    ok(labels.every((l) => !/correct|answer|الإجابة الصحيحة/.test(l)), "aria-labels expose no answers");
    submit2.click();
    await tick(80);
    const afterTxt = plainOf(el.innerHTML).replace(/\s+/g, " ");
    ok(afterTxt.includes("نتيجتك:") && afterTxt.includes("0/20"), `all-wrong attempt scores 0/20 (got: ${afterTxt.match(/نتيجتك[^0-9]*[0-9/ ]*/)?.[0] ?? "—"})`);
    ok(el.innerHTML.includes("bg-rose-600") || el.innerHTML.includes("border-rose-300"), "wrong answers are marked after submit");
    ok(!!byText(el, "عرض الحلول"), "solutions entry appears after submit");
    const reset = byText(el, "إعادة الاختبار");
    ok(!!reset, "reset button appears after submit");
    reset.click();
    await tick(60);
    ok(plainOf(el.innerHTML).includes("0/20"), "reset clears all answers");
    ok(!el.innerHTML.includes("نتيجتك"), "reset clears the score");
    el.remove();
  }
  {
    // المسار الصحيح كاملًا: 20/20 + فتح قفل الحلول عبر onCheckedChange
    let checkedFlag = null;
    const el = m.mount(m.React.createElement(m.TestArea30, { onCheckedChange: (v) => { checkedFlag = v; }, onShowSolutions: noop }));
    await tick(80);
    for (const q of m.TEST_30) await answerQuestion(el, q, true);
    await tick(80);
    const submit = byText(el, "إنهاء الاختبار");
    ok(!!submit && !submit.disabled, "submit unlocks on the correct path");
    submit.click();
    await tick(80);
    const afterTxt = plainOf(el.innerHTML).replace(/\s+/g, " ");
    ok(afterTxt.includes("نتيجتك:") && afterTxt.includes("20/20"), "all-correct attempt scores 20/20");
    ok(el.innerHTML.includes("bg-emerald-600") || el.innerHTML.includes("border-emerald-300"), "correct answers are marked after submit");
    ok(checkedFlag === true, "onCheckedChange(true) fires after grading (drives solutions unlock)");
    el.remove();
  }

  // ---------------- 10) حلول الاختبارات ----------------
  ok(m.TEST_30_SOLUTIONS.length === 20, "solutions set has exactly 20 entries derived from the test");
  {
    const el = m.mount(m.React.createElement(m.Solutions30, { unlocked: false, onGoTest: noop, onGoTeacher: noop }));
    await tick(40);
    const lockedTxt = plainOf(el.innerHTML);
    ok(lockedTxt.includes("الحلول مقفلة"), "solutions show a locked state before entitlement");
    ok(!normText(el.innerHTML).includes(norm(m.TEST_30[0].why)), "solutions leak no explanations before entitlement");
    el.remove();
    const open = m.mount(m.React.createElement(m.Solutions30, { unlocked: true }));
    await tick(60);
    const openN = normText(open.innerHTML);
    const missingAns = m.TEST_30_SOLUTIONS.filter((s) => !openN.includes(norm(s.answer)));
    ok(missingAns.length === 0, `solutions render all 20 answers (${missingAns.map((s) => s.n).join(",")})`);
    const missingWhy = m.TEST_30.filter((q) => !openN.includes(norm(q.why)));
    ok(missingWhy.length === 0, `every solution includes its reasoning (${missingWhy.length} missing: ${missingWhy.map((q) => q.n).join(",")})`);
    const missingTrap = m.TEST_30.filter((q) => q.trap && !openN.includes(norm(q.trap)));
    ok(missingTrap.length === 0, `every trap note is explained in solutions (${missingTrap.map((q) => q.n).join(",")})`);
    const missingAr = m.TEST_30.filter((q) => q.ar && !openN.includes(norm(q.ar)));
    ok(missingAr.length === 0, `every solution restates its question (${missingAr.map((q) => q.n).join(",")})`);
    open.remove();
  }

  // ---------------- 11) منطقة المعلم ----------------
  ok(m.TEACHER_PASSWORD_30 === "somer173", "Lesson 30 teacher password is somer173");
  {
    const shared = readFileSync(join(root, "src", "shared", "TeachersSpace.tsx"), "utf8");
    ok(shared.includes('const TEACHER_PASSWORD = "somer173"'), "shared Teacher's Space gate uses somer173");
    const gate = readFileSync(join(root, "src", "shared", "SitePasswordGate.tsx"), "utf8");
    ok(gate.includes('const SITE_PASSWORD = "CloseYourEyes173"'), "site password remains CloseYourEyes173");
  }
  ok(m.TEACHER_30_OVERVIEW.objectives.length === 6, "teacher overview keeps all 6 lesson objectives");
  ok(m.TEACHER_30_OVERVIEW.prerequisites.length === 4, "teacher overview keeps all 4 prerequisites");
  ok(m.TEACHER_30_OVERVIEW.core.length === 3, "teacher overview keeps the 3 core briefs");
  ok(m.TEACHER_30_NOTES.length === 9, `teacher notes cover the tense decisions (${m.TEACHER_30_NOTES.length})`);
  ok(m.TEACHER_30_SOLUTIONS.length === 9, `teacher activity solutions cover the 9 source exercises (${m.TEACHER_30_SOLUTIONS.length})`);
  ok(m.TEACHER_30_RUBRICS.length === 2, "teacher rubrics cover FINAL BOSS + biggest challenge");
  ok(m.TEACHER_30_MISTAKES.length === 8, `teacher common-mistakes bank present (${m.TEACHER_30_MISTAKES.length})`);
  {
    const el = m.mount(m.React.createElement(m.TeacherArea30, { unlocked: false, onUnlockChange: () => {} }));
    await tick(50);
    ok(plainOf(el.innerHTML).includes("منطقة المعلم"), "teacher area starts locked");
    ok(!plainOf(el.innerHTML).includes("Lesson Overview"), "teacher area leaks nothing before unlock");
    const pw = el.querySelector('input[type="password"]');
    ok(!!pw, "teacher password input exists");
    setNativeValue(pw, "wrong-pass");
    await tick(20);
    byText(el, "دخول")?.click();
    await tick(40);
    ok(plainOf(el.innerHTML).includes("كلمة المرور غير صحيحة"), "wrong teacher password rejected");
    ok(!plainOf(el.innerHTML).includes("Lesson Overview"), "wrong password leaks nothing");
    el.remove();
  }
  {
    let saw = null;
    const el = m.mount(m.React.createElement(m.TeacherArea30, { unlocked: false, onUnlockChange: (v) => { saw = v; } }));
    await tick(50);
    const pw = el.querySelector('input[type="password"]');
    setNativeValue(pw, "somer173");
    await tick(20);
    byText(el, "دخول")?.click();
    await tick(40);
    ok(saw === true, "somer173 unlocks the Lesson 30 teacher area");
    el.remove();
    const openEl = m.mount(m.React.createElement(m.TeacherArea30, { unlocked: true, onUnlockChange: () => {}, onGoSolutions: noop }));
    await tick(60);
    const txt = plainOf(openEl.innerHTML);
    ok(txt.includes("Lesson Overview"), "teacher overview renders after unlock");
    ok(txt.includes("مذكرات تدريسية"), "teacher notes render after unlock");
    ok(txt.includes("حلول أنشطة المصدر"), "teacher activity solutions render after unlock");
    ok(txt.includes("سلالم التقييم"), "teacher rubrics render after unlock");
    ok(txt.includes("الأخطاء الشائعة"), "teacher common mistakes render after unlock");
    ok(!!byText(openEl, "عرض حلول الاختبار"), "teacher area links to test solutions");
    openEl.remove();
  }

  // ---------------- 12) الهيكل الرئيسي + التوجيه + عدم المساس بالبقية ----------------
  {
    const lessonHtml = m.renderToString(m.React.createElement(m.Lesson30, { onExit: noop }));
    ok(lessonHtml.length > 3000, "Lesson 30 main component renders");
    ok(plainOf(lessonHtml).includes("الدرس 30"), "Lesson 30 shell shows the lesson title");
    ok(lessonHtml.includes('dir="ltr"'), "Lesson 30 isolates English as LTR");
    ok(lessonHtml.includes('data-area="l30-lesson"'), "Lesson area is present");
    ok(plainOf(lessonHtml).includes("خطوة 1 من 46"), "step counter starts at 1 / 46");
    ok(view.includes("ArrowLeft") && view.includes("ArrowRight"), "keyboard arrow navigation wired");
    ok(view.includes("→ السابق") && view.includes("التالي ←"), "Previous/Next controls present");
    ok(!view.includes("split(/(\\s+)/)"), "no per-token space splitting (word-reversal engine banned)");
  }
  {
    const el = m.mount(m.React.createElement(m.Lesson30, { onExit: noop }));
    await tick(80);
    ok(!!el.querySelector('[data-area="l30-lesson"]'), "lesson area mounted");
    byText(el, "الاختبار")?.click();
    await tick(60);
    ok(!!el.querySelector('[data-area="l30-test"]'), "Test Area opens as a separate area");
    byText(el, "الحلول")?.click();
    await tick(60);
    ok(!!el.querySelector('[data-area="l30-solutions"]'), "Test Solutions area opens as a separate area");
    byText(el, "المعلم")?.click();
    await tick(60);
    ok(!!el.querySelector('[data-area="l30-teacher"]'), "Teacher Area opens as a separate area");
    el.remove();
  }
  {
    const app = readFileSync(join(root, "src", "App.tsx"), "utf8");
    ok(app.includes("lesson30/Lesson30") && app.includes("route === 30"), "Lesson 30 routed in App.tsx");
    ok(app.includes("#/lesson/30"), "Lesson 30 hub card registered");
    ok(app.includes("route === 27") && app.includes("#/lesson/27"), "Lesson 27 route + hub card remain");
    ok(app.includes("route === 28") && app.includes("#/lesson/28"), "Lesson 28 route + hub card remain");
    ok(app.includes("route === 29") && app.includes("#/lesson/29"), "Lesson 29 route + hub card remain");
    for (let n = 1; n <= 26; n++) ok(app.includes(`route === ${n}`), `Lesson ${n} route still registered`);
    const l27 = readFileSync(join(root, "src", "lessons", "lesson27", "Lesson27.tsx"), "utf8");
    ok(l27.includes("export default function Lesson27"), "Lesson 27 component remains intact");
    const l28 = readFileSync(join(root, "src", "lessons", "lesson28", "Lesson28.tsx"), "utf8");
    ok(l28.includes("export default function Lesson28"), "Lesson 28 component remains intact");
    const l29 = readFileSync(join(root, "src", "lessons", "lesson29", "Lesson29.tsx"), "utf8");
    ok(l29.includes("export default function Lesson29"), "Lesson 29 component remains intact");
  }
} catch (err) {
  ok(false, err.stack || String(err));
} finally {
  rmSync(outFile, { force: true });
}

if (failures.length) {
  console.error(`✕ Lesson 30 audit FAILED (${failures.length}/${checks})`);
  for (const f of failures.slice(0, 60)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ Lesson 30 audit passed (${checks} assertions): 46-section ledger exact-once coverage, 46 native steps rendered, immediate-feedback contract, 20-Q test flow, solutions, teacher gate, BIDI isolation.`);
