// ============================================================
// Lesson 31 audit — Present Perfect · المضارع التام (Native Multi-Step)
//   node scripts/audit-lesson31.mjs
// Verifies (benchmark: Lesson 6 / rebuilt Lessons 27 · 28 · 29 · 30):
//   1) Source ledger: 45 numbered sections ①–㊺ + 5 unnumbered = 50.
//   2) Step registry: 50 slides cover every ledger section id exactly once.
//   3) Real render of all 50 steps: no throws, LTR isolation, source chips.
//   4) Interactive layer: ≥20 distinct lab hooks, immediate-feedback kit.
//   5) Interactive walk: every slide driven to completion (order convergence,
//      two-step fixes, sorting, matching, cue switches, writing arena).
//   6) Immediate-feedback contract: no solve-all-then-check in the student
//      area; gated source summaries appear only after completing the work.
//   7) Preserved key source phrases reach the rendered lesson; no reversal;
//      every intentionally-wrong source sentence survives verbatim.
//   8) Dataset fidelity for all 48 source data groups (counts + spot lines).
//   9) Test Area: exactly 20 original questions, 6 types, 6/7/4/3 levels,
//      no feedback/score before submit, submit gating, score, full reset.
//  10) Test Solutions: locked before entitlement, 20 explanatory solutions.
//  11) Teacher Area: somer173 gate, wrong password rejected, full content.
//  12) Main shell + routing + regression for Lessons 1–30 + shared gates.
// ============================================================
import { createRequire } from "node:module";
import { readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "scripts", ".lesson31-audit.mjs");

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
import Lesson31, { SlideView31, TestArea31, Solutions31, TeacherArea31, VIEW_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson31/Lesson31.tsx"))};
import * as D from ${JSON.stringify(join(root, "src/lessons/lesson31/data.ts"))};
function mount(node) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const r = createRoot(el);
  r.render(node);
  return el;
}
export { React, renderToString, createRoot, Lesson31, SlideView31, TestArea31, Solutions31, TeacherArea31, VIEW_SLIDES, D, mount };
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
const D = m.D;
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
const revealCount = (html) => (html.match(/data-reveal-block/g) || []).length;

// بيانات إجابات المختبرات (للمشي التفاعلي الصحيح)
const FIX_ANSWERS = {
  s8: [{ bad: 1, opt: 0 }],
  s31: [{ bad: D.FAMOUS_ERRORS_31[0].bad, opt: D.FAMOUS_ERRORS_31[0].fixAnswer }],
  s32: [{ bad: D.FAMOUS_ERRORS_31[1].bad, opt: D.FAMOUS_ERRORS_31[1].fixAnswer }],
  s33: [{ bad: D.FAMOUS_ERRORS_31[2].bad, opt: D.FAMOUS_ERRORS_31[2].fixAnswer }],
  s34: [{ bad: D.FAMOUS_ERRORS_31[3].bad, opt: D.FAMOUS_ERRORS_31[3].fixAnswer }],
  s35: D.DETECTIVE_31.map((d) => ({ bad: d.bad, opt: d.fixAnswer })),
};
const MATCH_ANSWERS = { "l31-s43-match": [3, 0, 2, 1] };

try {
  const { SLIDES, SOURCE_SECTIONS, SEC } = D;
  const VIEW_SLIDES = m.VIEW_SLIDES;
  const view = readFileSync(join(root, "src/lessons/lesson31/Lesson31.tsx"), "utf8");

  // ---------------- 1) سجل المصدر ----------------
  ok(SOURCE_SECTIONS.length === D.SOURCE_LEDGER_COUNT, `ledger length matches SOURCE_LEDGER_COUNT (${SOURCE_SECTIONS.length})`);
  ok(D.SOURCE_NUMBERED_COUNT === 45, `numbered sections 1..45 are all indexed (got ${D.SOURCE_NUMBERED_COUNT})`);
  ok(D.SOURCE_LEDGER_COUNT === 50, `ledger totals 50 sections: 45 numbered + 5 unnumbered (got ${D.SOURCE_LEDGER_COUNT})`);
  const nums = SOURCE_SECTIONS.filter((s) => s.num !== undefined).map((s) => s.num).sort((a, b) => a - b);
  ok(nums.length === 45 && nums[0] === 1 && nums[44] === 45 && nums.every((n, i) => n === i + 1), `ledger covers every number 1..45 exactly once (${nums.length})`);
  for (const id of ["cover", "opening", "objectives", "pspp", "map"]) {
    ok(SOURCE_SECTIONS.some((s) => s.id === id), `unnumbered ledger section "${id}" present`);
  }
  ok(SOURCE_SECTIONS.every((s) => s.units.length > 0 && s.units.every((u) => String(u).trim().length > 0)), "no source section lost its units");
  ok(SOURCE_SECTIONS.every((s) => s.units.every((u) => !u.includes("**"))), "no markdown noise left inside source units");
  const U = (id) => SOURCE_SECTIONS[SEC[id]].units;
  ok(U("s1").some((u) => u.includes("have/has + V3")), "ledger keeps the ① formula line verbatim");
  ok(U("s4").some((u) => u.includes("I have went.")), "ledger keeps the ④ intentionally-wrong V2 example verbatim");
  ok(U("s5").some((u) => u.includes("He has forgotten his password.")), "ledger keeps the ⑤ positive example verbatim");
  ok(U("s10").some((u) => u.includes("I haven't never seen it.")), "ledger keeps the ⑩ never double-negative trap verbatim");
  ok(U("s18").some((u) => u.includes("I finished the test today at 9:00.")), "ledger keeps the ⑱ today-pair caution verbatim");
  ok(U("s22").some((u) => u.includes("لأن الحالة بدأت في الماضي")), "ledger keeps the ㉒ continuation reason verbatim");
  ok(U("s31").some((u) => u.includes("I have seen him yesterday.")), "ledger keeps the ㉛ famous error verbatim");
  ok(U("s33").some((u) => u.includes("Did you have finished your homework?")), "ledger keeps the ㉝ did + have error verbatim");
  ok(U("s35").some((u) => u.includes("I have lived here since five years.")), "ledger keeps the ㉟ for/since error verbatim");
  ok(U("s36").some((u) => u.includes("I ______ my homework yesterday.")), "ledger keeps the ㊱ smart-choice gap verbatim");
  ok(U("s40").some((u) => u.includes("I visited Japan in 2021.")), "ledger keeps the ㊵ transformation source verbatim");
  ok(U("s45").some((u) => u.includes("for") || u.includes("since")), "ledger keeps the ㊺ summary material");
  ok(U("map").some((u) => u.includes("Present Perfect Continuous")), "ledger keeps the curriculum-map pointer verbatim");
  ok(U("pspp").some((u) => u.includes("I lost my keys yesterday.")), "ledger keeps the Past Simple vs Present Perfect panel verbatim");

  // ---------------- 2) سجل الخطوات: تغطية exact-once ----------------
  ok(SLIDES.length === 50, `step registry has exactly 50 slides (got ${SLIDES.length})`);
  ok(D.SLIDE_COUNT === SLIDES.length, "SLIDE_COUNT matches registry length");
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
  for (let i = 1; i <= 45; i++) ok(SLIDES.some((s) => s.id === `s${i}`), `step s${i} present in registry`);
  for (const id of ["cover", "opening", "objectives", "pspp", "map"]) ok(SLIDES.some((s) => s.id === id), `step ${id} present in registry`);
  ok(SLIDES.every((s) => typeof s.title === "string" && s.title.length > 2 && typeof s.mascot === "string"), "every step carries a title + mascot identity");
  ok(SLIDES.every((s) => typeof s.lead === "string" && typeof s.tip === "string"), "every step carries lead + tip teaching text");
  ok(!view.includes("unitsOf") && !view.includes(".units"), "student area never maps raw source units");
  ok(!/SOURCE_SECTIONS\.(map|forEach)\([\s\S]{0,80}?<\s*SlideView/.test(view), "no SOURCE_SECTIONS-driven auto-slide renderer in the student area");
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
      html = m.renderToString(m.React.createElement(m.SlideView31, { s: slide }));
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
  ok(broken.length === 0, `every one of the 50 steps renders without throwing (${broken.join(" | ").slice(0, 300)})`);
  ok(missingLtr.length === 0, `every step isolates English as LTR (${missingLtr.join(",")})`);
  ok(missingMarker.length === 0, `every step renders its data-source-section chip (${missingMarker.join(",")})`);
  ok(undefinedText.length === 0, `no step renders "undefined"/[object Object] (${undefinedText.join(",")})`);

  // ---------------- 4) طبقة التفاعل ----------------
  const staticHtml = [...slideHtml.values()].join("\n");
  const labSeqs = new Set([...staticHtml.matchAll(/data-en-seq="(l31-[^"]+)"/g)].map((x) => x[1]));
  ok(labSeqs.size >= 40, `lesson ships its interactive lab layer (${labSeqs.size} distinct labs ≥ 40)`);
  ok(staticHtml.includes('data-en-seq="l31-s42-write"'), "in-lesson writing arena present: ㊷ اكتب عن نفسك");
  ok(staticHtml.includes("data-starter"), "writing arena renders its pattern-checked starters");
  ok(staticHtml.includes("data-fix-seg"), "two-step fix lab renders selectable error segments");
  ok(staticHtml.includes("data-order-item"), "ordering lab renders real tap-to-order tokens");
  ok(staticHtml.includes("data-sort-item"), "sorting lab renders real classification buckets");
  ok(staticHtml.includes("data-match-left") && staticHtml.includes("data-match-right"), "matching lab renders real two-column matching");
  ok(staticHtml.includes("data-cue="), "cue-switch (given time deleted) lab renders");
  ok(staticHtml.includes("data-reveal-card"), "reveal-card lab renders");
  ok((view.match(/<\s*Lab\s/g) || []).length >= 20, "Lab teaching kit used across the lesson");
  ok((view.match(/<PlatformTag|<PlatformPanel|Platform Explanation/g) || []).length >= 3, "platform additions are tagged Platform Explanation");
  ok(view.includes("McqRow") && view.includes("TapOrder") && view.includes("TwoStepFix") && view.includes("SortBuckets") && view.includes("PairMatch") && view.includes("WriteArena"), "immediate-feedback primitives (McqRow/TapOrder/TwoStepFix/SortBuckets/PairMatch/WriteArena) used");
  ok(view.includes("BridgeTrack") && view.includes("FormulaStrip"), "bridge track + formula strip visual kit used");
  // إمكانية الوصول: أسماء مفهومة + رسائل حيّة + تركيز مرئي + لا معنى باللون وحده
  ok((staticHtml.match(/aria-live="/g) || []).length >= 20, `live regions announce progress (${(staticHtml.match(/aria-live="/g) || []).length})`);
  ok(staticHtml.includes('role="status"'), "status role used for live results");
  ok(staticHtml.includes('aria-pressed="'), "toggle buttons expose pressed state");
  ok(staticHtml.includes("sr-only"), "screen-reader labels present (writing arena inputs / teacher gate)");
  ok(staticHtml.includes("focus:border-sky-400"), "inputs expose a visible focus style");
  ok((slideHtml.get("s30") ?? "").includes("See textbook/reference"), "source diagram kept as a labelled reference (never faked)");

  // ---------------- 5) المشي التفاعلي لكل خطوة ----------------
  const slideStates = new Map();
  const finalHtmlBySlide = new Map();
  for (const slide of VIEW_SLIDES) {
    const el = m.mount(m.React.createElement(m.SlideView31, { s: slide }));
    await tick(50);
    const states = [];
    const capture = () => states.push(normText(el.innerHTML));
    capture();
    const revealsBefore = revealCount(el.innerHTML);
    // (أ) نقرة عامة على كل زر — يستكشف كل المختبرات
    const clicked = new Set();
    for (let k = 0; k < 170; k++) {
      const next = [...el.querySelectorAll("button")].filter((b) => !b.disabled && !clicked.has(b))[0];
      if (!next) break;
      clicked.add(next);
      next.click();
      await tick(6);
      capture();
    }
    // (ب) المسار الصحيح بعد الاستكشاف: كل مختبر قابل لإعادة المحاولة
    //     (1) الترتيب الموجّه
    for (let round = 0; round < 16; round++) {
      const enabled = [...el.querySelectorAll("[data-order-item]")].filter((b) => !b.disabled);
      if (enabled.length === 0) break;
      for (const b of enabled) {
        b.click();
        await tick(6);
        capture();
      }
    }
    //     (2) التصحيح بخطوتيه
    for (const item of [...el.querySelectorAll("[data-fix-item]")]) {
      const n = Number(item.getAttribute("data-fix-item"));
      const plan = FIX_ANSWERS[slide.id]?.[n - 1];
      if (plan) {
        item.querySelector(`[data-fix-seg="${plan.bad}"]`)?.click();
        await tick(8);
        item.querySelector(`[data-fix-opt="${plan.opt}"]`)?.click();
        await tick(8);
      } else {
        item.querySelector("[data-fix-seg]")?.click();
        await tick(6);
        [...item.querySelectorAll("[data-fix-opt]")][0]?.click();
        await tick(6);
      }
      capture();
    }
    //     (3) التصنيف: صحّح حسب التغذية الفورية للواجهة
    for (const item of [...el.querySelectorAll("[data-sort-item]")]) {
      const txt = item.textContent || "";
      const wrong = txt.match(/السلّة الصحيحة:\s*(.+)$/);
      if (wrong) {
        const want = wrong[1].trim();
        [...item.querySelectorAll("[data-sort-pick]")].find((b) => (b.textContent || "").trim() === want)?.click();
        await tick(8);
        capture();
      }
    }
    //     (4) المطابقة: اختر اليسار ثم اليمين الصحيح
    for (const box of [...el.querySelectorAll("[data-en-seq]")].filter((b) => b.querySelector("[data-match-left]"))) {
      const lefts = [...box.querySelectorAll("[data-match-left]")];
      const answers = MATCH_ANSWERS[box.getAttribute("data-en-seq")] ?? lefts.map((_, i) => i);
      for (let i = 0; i < lefts.length; i++) {
        lefts[i].click();
        await tick(6);
        [...box.querySelectorAll("[data-match-right]")][answers[i]]?.click();
        await tick(8);
        capture();
      }
    }
    //     (5) البوس: زمن كل فعل في قصة Lina
    if (slide.id === "s39") {
      D.BOSS_LINA_VERBS_31.forEach((v, i) => {
        el.querySelector(`[data-boss-pick="${i}:${v.tense}"]`)?.click();
      });
      await tick(30);
      capture();
    }
    //     (6) التحويل: احذف in 2021 ثم اختر جملة Present Perfect
    if (slide.id === "s40") {
      el.querySelector('[data-transform-token="3"]')?.click();
      await tick(12);
      el.querySelector('[data-transform-pick="0"]')?.click();
      await tick(12);
      capture();
    }
    //     (7) for / since: اختر الصحيح في الخمس جمل
    if (slide.id === "s41") {
      for (const it of D.FORSINCE_ITEMS_31) {
        el.querySelector(`[data-fs-pick="${it.n}:${it.answer}"]`)?.click();
        await tick(8);
      }
      capture();
    }
    //     (8) المفاتيح الزمنية: كل المفاتيح + «بدون الوقت المحدد»
    for (const cue of [...el.querySelectorAll("[data-cue]")]) {
      cue.click();
      await tick(6);
      capture();
    }
    el.querySelector("[data-cue-none]")?.click();
    await tick(8);
    capture();
    //     (9) ساحة الكتابة: اكتب النماذج المطلوبة (تحقق حي من النمط)
    for (const box of [...el.querySelectorAll("[data-starter]")]) {
      const n = Number(box.getAttribute("data-starter"));
      const starter = D.STARTERS_31.find((x) => x.n === n);
      const input = box.querySelector("input");
      if (starter && input) {
        setNativeValue(input, starter.model);
        await tick(20);
        capture();
      }
    }
    //     (10) بقية المختبرات القابلة لإعادة المحاولة: المرتبطة بالمفتاح الصحيح
    for (const box of [...el.querySelectorAll("[data-en-seq]")]) {
      for (const chip of [...box.querySelectorAll("[data-lens-pick]")]) {
        if (chip.getAttribute("aria-pressed") !== "true") {
          chip.click();
          await tick(5);
        }
      }
    }
    await tick(20);
    capture();
    const revealsAfter = revealCount(el.innerHTML);
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
    const s4 = finalHtmlBySlide.get("s4") ?? "";
    ok(s4.includes("الصحيح:"), "④ a wrong V2 pick reveals the correction immediately (no check step)");
    const s35 = finalHtmlBySlide.get("s35") ?? "";
    ok(normText(s35).includes(norm("She has gone to school.")), "㉟ completed detective fixes render the corrected sentences");
    const s41 = finalHtmlBySlide.get("s41") ?? "";
    ok(normText(s41).includes(norm("حاولت 5 من 5")), "㊶ for/since drill tracks every attempt live");
    const s42 = finalHtmlBySlide.get("s42") ?? "";
    ok(normText(s42).includes(norm("الجمل السبع مكتملة النمط")), "㊷ writing arena confirms all seven real answers");
  }
  {
    const walkedGlyphs = [...finalHtmlBySlide.values()].join("");
    ok(walkedGlyphs.includes("✓") && walkedGlyphs.includes("✕"), "correctness is conveyed by glyphs as well as colour (after answering)");
    ok(walkedGlyphs.includes("aria-pressed=\"true\""), "toggle state is exposed to assistive tech after interaction");
  }
  const NO_REVEAL_EXPECTED = new Set(["cover", "s42"]);
  for (const slide of VIEW_SLIDES) {
    const st = slideStates.get(slide.id);
    ok(!!st && st.revealsBefore === 0, `${slide.id}: source summary hidden before completing the interaction`);
    if (!NO_REVEAL_EXPECTED.has(slide.id)) {
      ok(!!st && st.revealsAfter >= 1, `${slide.id}: source summary appears after completing the interaction`);
    }
  }

  // ---------------- 7) عبارات المصدر الحساسة تصل إلى العرض ----------------
  const walked = staticHtml + "\n" + [...finalHtmlBySlide.values()].join("\n");
  const walkedN = norm(plainOf(walked)) + "\n" + [...slideStates.values()].map((x) => x.states.join("\n")).join("\n");
  const keepPhrases = [
    "I have finished my homework.",
    "Subject + have/has + V3",
    "I have cleaned my room.",
    "She has opened the window.",
    "They have built a small robot.",
    "He has forgotten his password.",
    "We have finished the project.",
    "The dog has eaten its food.",
    "I have visited Italy.",
    "She has ridden a horse.",
    "They have seen a volcano.",
    "I visited Italy in 2023.",
    "Have you ever visited Spain?",
    "Have you ever ridden a horse?",
    "Has she ever seen snow?",
    "Have they ever eaten Korean food?",
    "Have you ever flown in a helicopter?",
    "I have never visited Australia.",
    "She has never ridden a motorcycle.",
    "He has never eaten sushi.",
    "They have never seen snow.",
    "I have lost my wallet.",
    "She has broken her glasses.",
    "He has forgotten his keys.",
    "Someone has opened the door.",
    "I lost my keys yesterday.",
    "I have lost my keys.",
    "I have just finished my homework.",
    "She has just arrived.",
    "The train has just left.",
    "We have recently moved to a new house.",
    "He has recently started a new job.",
    "I have already finished my homework.",
    "She has already eaten.",
    "They have already arrived.",
    "He has already seen the movie.",
    "I have just finished.",
    "He has just called me.",
    "The baby has just fallen asleep.",
    "Have you finished your homework yet?",
    "I haven't finished my homework yet.",
    "She hasn't arrived yet.",
    "They haven't decided yet.",
    "I have already eaten.",
    "I haven't eaten yet.",
    "I have drunk three glasses of water today.",
    "She has read two books this month.",
    "We have had many tests this year.",
    "I visited my uncle last week.",
    "I have finished two exercises today.",
    "I finished the test today at 9:00.",
    "I have lived here for five years.",
    "She has studied English for three years.",
    "They have known each other for a long time.",
    "He has worked here for six months.",
    "I have lived here since 2021.",
    "She has studied English since September.",
    "He has worked here since Monday.",
    "We have known him since childhood.",
    "I haven't finished.",
    "She hasn't arrived.",
    "He hasn't eaten.",
    "We haven't decided.",
    "They haven't seen the movie.",
    "The train hasn't arrived.",
    "Have you finished?",
    "Has she arrived?",
    "Has he eaten?",
    "Have they left?",
    "Have we met before?",
    "Has the teacher arrived?",
    "Yes, I have.",
    "No, I haven't.",
    "Yes, she has.",
    "No, he hasn't.",
    "What have you done?",
    "Where has she gone?",
    "Why have they left?",
    "Who has taken my notebook?",
    "How many books have you read?",
    "How long have you lived here?",
    "I have lived here for six years.",
    "I have lived here since 2020.",
    "I watched that movie last night.",
    "I have watched that movie.",
    "I saw the museum yesterday.",
    "I have seen the museum.",
    "I had seen the museum before we entered the city.",
    "I have seen him yesterday.",
    "She has went home.",
    "Did you have finished your homework?",
    "He doesn't have finished.",
    "I have seen him before.",
    "She has went to school.",
    "Did you have eaten breakfast?",
    "He hasn't never visited Paris.",
    "They has finished the project.",
    "Have she arrived?",
    "I have lived here since five years.",
    "She has worked here for 2022.",
    "I ______ my homework yesterday.",
    "I visited Japan in 2021.",
    "I have visited Japan.",
    "I have never ridden a horse.",
    "I have already finished my homework.",
    "I haven't eaten yet.",
    "I have lived in this city for six years.",
    "I have studied English since 2019.",
    "I ate the cake.",
    "I was eating the cake.",
    "I had eaten the cake before they arrived.",
    "I have eaten the cake.",
    "I visited Rome in 2022.",
    "I had visited Rome before I moved there.",
    "I have visited Rome.",
    "Lina has always loved science.",
    "She has visited several science museums,",
    "she has recently started a robotics project at school.",
    "Last year, she joined a science club and built a small solar-powered car.",
    "This year, she has already completed two robotics projects.",
    "Present Perfect لا نستخدمه عادةً مع وقت ماضٍ محدد ومنتهٍ.",
  ];
  for (const phrase of keepPhrases) {
    ok(walkedN.includes(norm(phrase)), `key source phrase reaches the rendered lesson: ${phrase.slice(0, 60)}`);
  }
  for (const flipped of [
    "went have I",
    "yesterday him seen have I",
    "school to went has She",
    "homework my finished have I",
    "sushi eaten never has He",
  ]) {
    ok(!walkedN.includes(norm(flipped)), `no reversed English word order: ${flipped}`);
  }
  for (const w of D.INTENTIONALLY_WRONG_31) {
    ok(w.wrong !== w.right, `intentionally-wrong entry ${w.id} differs from its correction`);
  }
  ok(D.INTENTIONALLY_WRONG_31.length === 19, `intentionally-wrong inventory keeps all 19 source lines (${D.INTENTIONALLY_WRONG_31.length})`);

  // ---------------- 8) بيانات التدريبات ----------------
  ok(D.BRIDGE_STEPS_31.length === 3, "① bridge steps kept (3)");
  ok(D.HAVE_HAS_31.length === 7, `② have/has chart keeps all 7 subjects (${D.HAVE_HAS_31.length})`);
  ok(D.V3_CHART_31.length === 8, `③ V3 chart keeps all 8 verbs (${D.V3_CHART_31.length})`);
  ok(D.V3_WRONG_31.length === 4, `④ keeps the 4 intentionally-wrong V2 sentences (${D.V3_WRONG_31.length})`);
  ok(D.POSITIVE_31.length === 6, `⑤ keeps all 6 positive examples (${D.POSITIVE_31.length})`);
  ok(D.POSITIVE_31.every((p) => p.chunks.length === 4), "⑤ every positive sentence keeps its 4 buildable chunks");
  ok(D.EXPERIENCE_31.length === 5, `⑥ keeps all 5 experience examples (${D.EXPERIENCE_31.length})`);
  ok(D.CONTRAST_31.length === 2, "⑦ keeps the Past Simple vs Present Perfect pair");
  ok(D.EVER_31.length === 4, `⑨ keeps all 4 ever questions (${D.EVER_31.length})`);
  ok(D.EVER_EXTRA_31.en === "Have you ever flown in a helicopter?", "⑨ keeps the extra ever question verbatim");
  ok(D.NEVER_31.length === 4, `⑩ keeps all 4 never examples (${D.NEVER_31.length})`);
  ok(D.NEVER_TRAP_31.wrong === "I haven't never seen it.", "⑩ keeps the double-negative trap verbatim");
  ok(D.RESULT_31.length === 4, `⑪ keeps all 4 present-result examples (${D.RESULT_31.length})`);
  ok(D.RESULT_31.every((r) => r.result && r.result.length > 5), "⑪ every example keeps its present result");
  ok(D.PAIR_LOST_31.length === 2 && D.PAIR_WALLET_31.length === 2, "panel keeps both lost/keys comparison pairs");
  ok(D.RECENT_WORDS_31.length === 4, "⑫ keeps just/already/recently/lately");
  ok(D.RECENT_31.length === 5, `⑫ keeps all 5 recent-event examples (${D.RECENT_31.length})`);
  ok(D.ALREADY_31.length === 5, `⑬ keeps all 5 already examples (${D.ALREADY_31.length})`);
  ok(D.JUST_31.length === 5, `⑭ keeps all 5 just examples (${D.JUST_31.length})`);
  ok(D.YET_QUESTION_31.en === "Have you finished your homework yet?", "⑮ keeps the yet question verbatim");
  ok(D.YET_NEGATIVE_31.length === 3, `⑮ keeps all 3 yet negatives (${D.YET_NEGATIVE_31.length})`);
  ok(D.ALREADY_VS_YET_31.length === 4, "⑯ keeps the already/yet sorting set (4)");
  ok(D.ALREADY_VS_YET_31.filter((x) => x.bucket === "already").length === 2, "⑯ classification keeps 2 already / 2 yet");
  ok(D.PERIODS_31.length === 5, "⑰ keeps the 5 unfinished periods");
  ok(D.PERIOD_EXAMPLES_31.length === 3, `⑰ keeps all 3 period examples (${D.PERIOD_EXAMPLES_31.length})`);
  ok(D.PERIODS_CLOSED_31.note.length > 3, "⑰ keeps the closed-period caution");
  ok(D.TODAY_PAIR_31.length === 2, "⑱ keeps the today pair");
  ok(D.FORSINCE_CLASSIFY_31.length === 6, "⑲ keeps the 6 for/since classification items");
  ok(D.FOR_SENTENCES_31.length === 4 && D.SINCE_SENTENCES_31.length === 4, "⑳㉑ keep 4 for + 4 since sentences");
  ok(D.CONTINUATION_31.en === "I have lived here for five years.", "㉒ keeps the continuation example verbatim");
  ok(D.NEGATIVE_31.length === 6, `㉓ keeps all 6 negatives (${D.NEGATIVE_31.length})`);
  ok(D.NEGATIVE_31.every((n) => /haven't|hasn't/.test(n.en)), "㉓ every negative uses haven't/hasn't");
  ok(D.YESNO_31.length === 6, `㉔ keeps all 6 yes/no questions (${D.YESNO_31.length})`);
  ok(D.SHORT_ANSWERS_31.length === 4, `㉕ keeps all 4 short-answer pairs (${D.SHORT_ANSWERS_31.length})`);
  ok(D.WH_31.length === 6, `㉖ keeps all 6 wh-questions (${D.WH_31.length})`);
  ok(D.HOWLONG_31.forAnswer === "I have lived here for six years." && D.HOWLONG_31.sinceAnswer === "I have lived here since 2020.", "㉗ keeps both how-long answers");
  ok(D.COMPARE_31.length === 2, "㉘ keeps the big comparison pair");
  ok(D.COMPARE_31.every((c) => c.focus && c.probe && c.probeAnswer), "㉘ every comparison keeps focus + probe + probeAnswer");
  ok(D.TRIPLE_31.length === 3 && D.TRIPLE_RULES_31.length === 3, "㉙ keeps the triple comparison + its 3 rules");
  ok(D.DIAGRAMS_31.length === 2, `㉚ keeps both source diagrams as reference (${D.DIAGRAMS_31.length})`);
  ok(D.DIAGRAMS_31.every((d) => d.reference.startsWith("See textbook/reference")), "㉚ both diagrams are labelled See textbook/reference");
  ok(D.DIAGRAMS_31.every((d) => Array.isArray(d.art) && d.art.length >= 3), "㉚ diagram art preserved verbatim (ASCII, not redrawn)");
  ok(D.TIMELINE_NODES_31.length === 2, "㉚ keeps both timeline nodes");
  ok(D.FAMOUS_ERRORS_31.length === 4, `㉛–㉞ keep all 4 famous errors (${D.FAMOUS_ERRORS_31.length})`);
  ok(D.FAMOUS_ERRORS_31.every((e) => e.fixOpts.length >= 3 && e.sourceNote && e.sourceNote.length > 5), "㉛–㉞ every error keeps distractors + source note");
  ok(D.DETECTIVE_31.length === 8, `㉟ keeps all 8 detective sentences (${D.DETECTIVE_31.length})`);
  ok(D.DETECTIVE_31.every((d) => d.fixOpts.length === 3), "㉟ every detective item keeps 3 fix options");
  ok(D.SMART_31.length === 8, `㊱ keeps all 8 smart-choice pairs (${D.SMART_31.length})`);
  ok(D.SMART_31.filter((q, i) => i % 2 === 0).every((q) => q.answer === 0) && D.SMART_31.filter((q, i) => i % 2 === 1).every((q) => q.answer === 1), "㊱ keeps the source pattern: cue → Past Simple, already → Present Perfect");
  ok(D.IQ_PAIRS_31.length === 2, "㊲ keeps both IQ200 angle pairs");
  ok(D.BOSS_LINA_TEXT_31.length > 40, "㊴ keeps the boss challenge story text");
  ok(D.BOSS_LINA_VERBS_31.length === 6, `㊴ keeps all 6 boss verbs (${D.BOSS_LINA_VERBS_31.length})`);
  ok(D.BOSS_LINA_VERBS_31.filter((v) => v.tense === "Past Simple").length === 2, "㊴ story keeps 2 Past Simple verbs (last year)");
  ok(D.TRANSFORM_31.source === "I visited Japan in 2021." && D.TRANSFORM_31.answer === "I have visited Japan.", "㊵ keeps the transformation source + answer verbatim");
  ok(D.TRANSFORM_31.banned.includes("in 2021") && D.TRANSFORM_31.banned.includes("yesterday"), "㊵ keeps the banned past-time cues");
  ok(D.FORSINCE_ITEMS_31.length === 5, `㊶ keeps all 5 for/since items (${D.FORSINCE_ITEMS_31.length})`);
  ok(JSON.stringify(D.FORSINCE_ITEMS_31.map((i) => i.answer)) === JSON.stringify(["since", "for", "since", "for", "since"]), "㊶ keeps the source answers (since/for/since/for/since)");
  ok(D.STARTERS_31.length === 7, `㊷ keeps all 7 writing starters (${D.STARTERS_31.length})`);
  ok(D.STARTERS_31.every((s) => typeof s.check === "function" && s.check(s.model)), "㊷ every starter accepts its model answer (live pattern check works)");
  ok(D.FINAL_BOSS_31.length === 4, `㊸ keeps all 4 final-boss sentences (${D.FINAL_BOSS_31.length})`);
  ok(D.BIG_MAP_31.length === 4, `㊹ keeps all 4 lenses of the big map (${D.BIG_MAP_31.length})`);
  ok(D.SUMMARY_USES_31.length === 5, `㊺ keeps all 5 uses (${D.SUMMARY_USES_31.length})`);
  ok(D.SUMMARY_WORDS_31.length === 10, `㊺ keeps all 10 key words (${D.SUMMARY_WORDS_31.length})`);
  ok(D.GOLDEN_31.bad === "I have seen him yesterday. ❌", "㊺ keeps the golden-rule counter-example verbatim");
  ok(D.CURRICULUM_31.present.some((p) => p.label === "Present Perfect" && p.here), "map marks Present Perfect as the current station");
  ok(D.CURRICULUM_31.next.includes("Present Perfect Continuous"), "map keeps the next station verbatim");
  ok(D.TEST_31_SOLUTIONS.length === 20 && D.TEST_31_SOLUTIONS.every((s) => s.answer.length > 0 && s.why.length > 10), "test solutions derived for all 20 questions");
  ok(D.TEST_31_SOLUTIONS.every((s) => s.trap && s.trap.length > 10), "every derived solution keeps its trap note");

  // ---------------- 9) منطقة الاختبارات: 20 سؤالًا أصليًا ----------------
  ok(D.TEST_31.length === 20, `Test Area has exactly 20 questions (got ${D.TEST_31.length})`);
  ok(D.TEST_31.every((q, i) => q.n === i + 1), "test questions are numbered 1..20");
  const usedTypes = new Set(D.TEST_31.map((q) => q.type));
  for (const t of ["single", "tf", "multi", "order", "match", "spot"]) {
    ok(usedTypes.has(t), `test uses structured type: ${t}`);
  }
  ok(D.TEST_31.filter((q) => q.type !== "single").length >= 8, "test is not all multiple choice (≥8 non-single questions)");
  ok(D.TEST_31_LEVEL_COUNTS.basic === 6 && D.TEST_31_LEVEL_COUNTS.medium === 7 && D.TEST_31_LEVEL_COUNTS.advanced === 4 && D.TEST_31_LEVEL_COUNTS.thinking === 3, `difficulty mix is 6/7/4/3 (got ${JSON.stringify(D.TEST_31_LEVEL_COUNTS)})`);
  ok(D.TEST_31.every((q) => q.why && q.why.length > 10), "every test question has an explanatory why");
  ok(D.TEST_31.every((q) => q.trap && q.trap.length > 5), "every test question names its trap");
  ok(D.TEST_31.filter((q) => q.type === "order").every((q) => JSON.stringify([...q.items].sort()) === JSON.stringify([...q.answer].sort())), "order questions reuse exactly their items as the answer");
  ok(D.TEST_31.filter((q) => q.type === "match").every((q) => q.left.length === q.right.length && q.right.length === q.answer.length), "match questions align left/right/answer");
  ok(D.TEST_31.filter((q) => q.type === "spot").every((q) => q.answer < q.segments.length && q.fix.length > 3), "spot questions point at a real segment with a fix");
  ok(D.TEST_31.filter((q) => q.type === "multi").every((q) => q.answer.length >= 2), "multi questions require at least two picks");
  for (const q of D.TEST_31) ok(D.answerLabel31(q).length > 0, `answerLabel31 covers question ${q.n} (${q.type})`);
  {
    const html = m.renderToString(m.React.createElement(m.TestArea31, {}));
    const count = (html.match(/data-test-q="/g) || []).length;
    ok(count === 20, `Test Area renders all 20 question cards (got ${count})`);
    ok(plainOf(html).includes("إنهاء الاختبار"), "Test Area keeps the submit button");
    ok(!html.includes("نتيجتك"), "Test Area shows no score before submission");
    ok(!html.includes("bg-emerald-50/40") && !html.includes("bg-rose-50/40"), "Test Area shows no correctness colors before submission");
    ok(!html.includes("data-answer") && !html.includes("data-correct"), "Test Area exposes no answer data attributes");
    ok(plainOf(html).includes("لا تظهر أي نتيجة قبل الضغط"), "Test Area states the neutral pre-submit contract");
  }
  const answerQuestion = async (el, q, correct) => {
    const card = el.querySelector(`[data-test-q="${q.n}"]`);
    if (!card) return false;
    const tap = async (b) => {
      if (!b) return;
      b.click();
      await tick(12);
    };
    if (q.type === "single") {
      const idx = correct ? q.answer : (q.answer + 1) % q.opts.length;
      await tap(card.querySelector(`[data-opt="${idx}"]`));
      return true;
    }
    if (q.type === "spot") {
      const idx = correct ? q.answer : (q.answer + 1) % q.segments.length;
      await tap(card.querySelector(`[data-spot-seg="${idx}"]`));
      return true;
    }
    if (q.type === "tf") {
      const want = correct ? q.answer : !q.answer;
      await tap(card.querySelector(`[data-tf="${String(want)}"]`));
      return true;
    }
    if (q.type === "multi") {
      const picks = correct ? q.answer : [0, 1, 2, 3].filter((i) => i < q.opts.length && !q.answer.includes(i)).slice(0, 1);
      for (const i of picks) await tap(card.querySelector(`[data-multi="${i}"]`));
      return true;
    }
    if (q.type === "order") {
      const seq = correct ? q.answer : [...q.items].reverse();
      for (const s of seq) {
        const pool = [...card.querySelectorAll("[data-order-pool]")].filter((b) => !b.disabled);
        const hit = pool.find((b) => (b.textContent || "") === s) ?? pool.find((b) => (b.textContent || "").includes(s));
        await tap(hit);
      }
      return true;
    }
    if (q.type === "match") {
      for (let i = 0; i < q.left.length; i++) {
        const want = correct ? q.answer[i] : (q.answer[i] + 1) % q.right.length;
        let hit = card.querySelector(`[data-match-row="${i}"][data-match-opt="${want}"]`);
        if (hit && hit.disabled) hit = card.querySelector(`[data-match-row="${i}"] [data-match-opt="${want}"]`);
        await tap(hit);
      }
      return true;
    }
    return false;
  };
  {
    // المسار الخاطئ كاملًا: 0/20 + لا علامات قبل الإنهاء + إعادة نظيفة
    const el = m.mount(m.React.createElement(m.TestArea31, { onShowSolutions: noop }));
    await tick(80);
    const submit = byText(el, "إنهاء الاختبار");
    ok(!!submit && submit.disabled, "submit is disabled before answering everything");
    for (const q of D.TEST_31) await answerQuestion(el, q, false);
    await tick(60);
    const submit2 = byText(el, "إنهاء الاختبار");
    ok(!!submit2 && !submit2.disabled, "submit unlocks after answering all 20");
    const preHtml = el.innerHTML;
    ok(!preHtml.includes("نتيجتك") && !preHtml.includes("bg-emerald-50/40") && !preHtml.includes("bg-rose-50/40"), "no score/marks leak after answering but before submit");
    const labels = [...el.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label") || "");
    ok(labels.every((l) => !/correct|answer|الإجابة الصحيحة/.test(l)), "aria-labels expose no answers");
    submit2.click();
    await tick(80);
    const afterTxt = plainOf(el.innerHTML).replace(/\s+/g, " ");
    ok(afterTxt.includes("نتيجتك:") && afterTxt.includes("0/20"), `all-wrong attempt scores 0/20 (got: ${afterTxt.match(/نتيجتك[^0-9]*[0-9/ ]*/)?.[0] ?? "—"})`);
    ok(el.innerHTML.includes("bg-rose-50/40"), "wrong answers are marked after submit");
    ok(!!byText(el, "عرض الحلول"), "solutions entry appears after submit");
    const reset = byText(el, "إعادة الاختبار");
    ok(!!reset, "reset button appears after submit");
    reset.click();
    await tick(60);
    ok(plainOf(el.innerHTML).includes("0/20"), "reset clears all answers");
    ok(!el.innerHTML.includes("نتيجتك"), "reset clears the score");
    ok(!el.innerHTML.includes("bg-emerald-50/40") && !el.innerHTML.includes("bg-rose-50/40"), "reset clears all correctness markings");
    el.remove();
  }
  {
    // المسار الصحيح كاملًا: 20/20 + فتح قفل الحلول عبر onCheckedChange
    let checkedFlag = null;
    const el = m.mount(m.React.createElement(m.TestArea31, { onCheckedChange: (v) => { checkedFlag = v; }, onShowSolutions: noop }));
    await tick(80);
    for (const q of D.TEST_31) await answerQuestion(el, q, true);
    await tick(80);
    const submit = byText(el, "إنهاء الاختبار");
    ok(!!submit && !submit.disabled, "submit unlocks on the correct path");
    submit.click();
    await tick(80);
    const afterTxt = plainOf(el.innerHTML).replace(/\s+/g, " ");
    ok(afterTxt.includes("نتيجتك:") && afterTxt.includes("20/20"), "all-correct attempt scores 20/20");
    ok(afterTxt.includes("صحيح: 20") && afterTxt.includes("خطأ: 0"), "post-submit report shows correct/incorrect counts");
    ok(el.innerHTML.includes("bg-emerald-50/40"), "correct answers are marked after submit");
    ok(checkedFlag === true, "onCheckedChange(true) fires after grading (drives solutions unlock)");
    el.remove();
  }

  // ---------------- 10) حلول الاختبارات ----------------
  {
    const el = m.mount(m.React.createElement(m.Solutions31, { unlocked: false, onGoTest: noop, onGoTeacher: noop }));
    await tick(40);
    ok(plainOf(el.innerHTML).includes("مقفلة"), "solutions show a locked state before entitlement");
    ok(!normText(el.innerHTML).includes(norm(D.TEST_31[0].why)), "solutions leak no explanations before entitlement");
    el.remove();
    const open = m.mount(m.React.createElement(m.Solutions31, { unlocked: true }));
    await tick(60);
    const openN = normText(open.innerHTML);
    const missingAns = D.TEST_31_SOLUTIONS.filter((s) => !openN.includes(norm(s.answer)));
    ok(missingAns.length === 0, `solutions render all 20 answers (${missingAns.map((s) => s.n).join(",")})`);
    const missingWhy = D.TEST_31.filter((q) => !openN.includes(norm(q.why)));
    ok(missingWhy.length === 0, `every solution includes its reasoning (${missingWhy.length} missing)`);
    const missingTrap = D.TEST_31.filter((q) => q.trap && !openN.includes(norm(q.trap)));
    ok(missingTrap.length === 0, `every trap note is explained in solutions (${missingTrap.map((q) => q.n).join(",")})`);
    const missingQ = D.TEST_31.filter((q) => !openN.includes(norm(q.ar)));
    ok(missingQ.length === 0, `every solution restates its question (${missingQ.map((q) => q.n).join(",")})`);
    ok(open.innerHTML.includes("Basic") && open.innerHTML.includes("Thinking"), "solutions are grouped in manageable level chunks");
    open.remove();
  }

  // ---------------- 11) منطقة المعلم ----------------
  ok(D.TEACHER_PASSWORD_31 === "somer173", "Lesson 31 teacher password is somer173");
  {
    const shared = readFileSync(join(root, "src", "shared", "TeachersSpace.tsx"), "utf8");
    ok(shared.includes('const TEACHER_PASSWORD = "somer173"'), "shared Teacher's Space gate uses somer173");
    const gate = readFileSync(join(root, "src", "shared", "SitePasswordGate.tsx"), "utf8");
    ok(gate.includes('const SITE_PASSWORD = "CloseYourEyes173"'), "site password remains CloseYourEyes173");
  }
  ok(D.TEACHER_31_OVERVIEW.objectives.length === 9, `teacher overview keeps all 9 lesson objectives (${D.TEACHER_31_OVERVIEW.objectives.length})`);
  ok(D.TEACHER_31_OVERVIEW.prerequisites.length === 4, "teacher overview keeps all 4 prerequisites");
  ok(D.TEACHER_31_OVERVIEW.core.length === 3, "teacher overview keeps the 3 core briefs");
  ok(D.TEACHER_31_NOTES.length >= 14, `teacher notes cover the teaching sequence (${D.TEACHER_31_NOTES.length})`);
  ok(D.TEACHER_31_SOLUTIONS.length >= 9, `teacher activity solutions cover the source exercises (${D.TEACHER_31_SOLUTIONS.length})`);
  ok(D.TEACHER_31_RUBRICS.length >= 2, "teacher rubrics present");
  ok(D.TEACHER_31_MISTAKES.length >= 10, `teacher common-mistakes bank present (${D.TEACHER_31_MISTAKES.length})`);
  {
    const el = m.mount(m.React.createElement(m.TeacherArea31, { unlocked: false, onUnlockChange: () => {} }));
    await tick(50);
    ok(plainOf(el.innerHTML).includes("منطقة المعلم"), "teacher area starts locked");
    ok(!plainOf(el.innerHTML).includes("جوهر الدرس"), "teacher area leaks nothing before unlock");
    const pw = el.querySelector('input[type="password"]');
    ok(!!pw, "teacher password input exists");
    setNativeValue(pw, "wrong-pass");
    await tick(20);
    byText(el, "دخول")?.click();
    await tick(40);
    ok(plainOf(el.innerHTML).includes("كلمة المرور غير صحيحة"), "wrong teacher password rejected");
    ok(!plainOf(el.innerHTML).includes("جوهر الدرس"), "wrong password leaks nothing");
    el.remove();
  }
  {
    let saw = null;
    const el = m.mount(m.React.createElement(m.TeacherArea31, { unlocked: false, onUnlockChange: (v) => { saw = v; } }));
    await tick(50);
    const pw = el.querySelector('input[type="password"]');
    setNativeValue(pw, "somer173");
    await tick(20);
    byText(el, "دخول")?.click();
    await tick(40);
    ok(saw === true, "somer173 unlocks the Lesson 31 teacher area");
    el.remove();
    const openEl = m.mount(m.React.createElement(m.TeacherArea31, { unlocked: true, onUnlockChange: () => {}, onGoSolutions: noop }));
    await tick(60);
    const txt = plainOf(openEl.innerHTML);
    ok(txt.includes("الأهداف"), "teacher overview renders after unlock");
    ok(txt.includes("تسلسل التدريس"), "teacher teaching sequence renders after unlock");
    ok(txt.includes("المفاهيم الصعبة"), "teacher difficult-concepts section renders after unlock");
    ok(txt.includes("مذكرات تدريسية"), "teacher notes render after unlock");
    ok(txt.includes("حلول تمارين المصدر"), "teacher source-exercise solutions render after unlock");
    ok(txt.includes("سلالم التقييم"), "teacher rubrics render after unlock");
    ok(txt.includes("الأخطاء الشائعة"), "teacher common mistakes render after unlock");
    ok(txt.includes("جمل خاطئة مقصودة"), "teacher intentionally-wrong inventory renders after unlock");
    ok(txt.includes("مراجع الأقسام المصدرية"), "teacher source/page reference index renders after unlock");
    ok(!!byText(openEl, "عرض حلول منطقة الاختبارات"), "teacher area links to test solutions");
    openEl.remove();
  }

  // ---------------- 12) الهيكل الرئيسي + التوجيه + عدم المساس بالبقية ----------------
  {
    const lessonHtml = m.renderToString(m.React.createElement(m.Lesson31, { onExit: noop }));
    ok(lessonHtml.length > 3000, "Lesson 31 main component renders");
    ok(plainOf(lessonHtml).includes("الدرس 31"), "Lesson 31 shell shows the lesson title");
    ok(lessonHtml.includes('dir="ltr"'), "Lesson 31 isolates English as LTR");
    ok(lessonHtml.includes('data-area="l31-lesson"'), "Lesson area is present");
    ok(plainOf(lessonHtml).includes("خطوة 1 من 50"), "step counter starts at 1 / 50");
    ok(view.includes("ArrowLeft") && view.includes("ArrowRight"), "keyboard arrow navigation wired");
    ok(view.includes("→ السابق") && view.includes("التالي ←"), "Previous/Next controls present");
    ok(!view.includes("split(/(\\s+)/)"), "no per-token space splitting (word-reversal engine banned)");
  }
  {
    const el = m.mount(m.React.createElement(m.Lesson31, { onExit: noop }));
    await tick(80);
    ok(!!el.querySelector('[data-area="l31-lesson"]'), "lesson area mounted");
    byText(el, "منطقة الاختبارات")?.click();
    await tick(60);
    ok(!!el.querySelector('[data-area="l31-test"]'), "Test Area opens as a separate area");
    byText(el, "حلول الاختبارات")?.click();
    await tick(60);
    ok(!!el.querySelector('[data-area="l31-solutions"]'), "Test Solutions area opens as a separate area");
    byText(el, "منطقة المعلم")?.click();
    await tick(60);
    ok(!!el.querySelector('[data-area="l31-teacher"]'), "Teacher Area opens as a separate area");
    el.remove();
  }
  {
    const app = readFileSync(join(root, "src", "App.tsx"), "utf8");
    ok(app.includes("lesson31/Lesson31") && app.includes("route === 31"), "Lesson 31 routed in App.tsx");
    ok(app.includes("#/lesson/31"), "Lesson 31 hub card registered");
    for (let n = 1; n <= 30; n++) ok(app.includes(`route === ${n}`), `Lesson ${n} route still registered`);
    for (const n of [6, 27, 28, 29, 30]) {
      const src = readFileSync(join(root, "src", "lessons", `lesson${n}`, `Lesson${n}.tsx`), "utf8");
      ok(src.includes(`export default function Lesson${n}`), `Lesson ${n} component remains intact`);
      ok(app.includes(`#/lesson/${n}`), `Lesson ${n} hub card remains`);
    }
    const dirCheck = readFileSync(join(root, "scripts", "check-english-direction.mjs"), "utf8");
    ok(dirCheck.includes("lessons.length === 33"), "direction check inventory covers 33 lessons");
    const renderCheck = readFileSync(join(root, "scripts", "audit-render-direction.mjs"), "utf8");
    ok(renderCheck.includes("lessonFolders.length === 33") && renderCheck.includes("n <= 33"), "render audit covers 33 lesson folders");
  }
} catch (err) {
  ok(false, err.stack || String(err));
} finally {
  rmSync(outFile, { force: true });
}

if (failures.length) {
  console.error(`✕ Lesson 31 audit FAILED (${failures.length}/${checks})`);
  for (const f of failures.slice(0, 80)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ Lesson 31 audit passed (${checks} assertions): 50-section ledger exact-once coverage, 50 native steps rendered, immediate-feedback contract, 20-Q test flow, solutions, teacher gate, BIDI isolation.`);
