// ============================================================
// Lesson 24 audit — سجل المصدر > الشرائح > التفاعل (QUANTITY LAB)
//   node scripts/audit-lesson24.mjs
//   1) سجل المصدر: كل وحدة مصدرية (64) تصل إلى الـ UI بعنوانها ونصها الكامل.
//   2) معمارية الخطوات: خطة STEPS_24 كاملة، لا وحدة تُدّعى مرتين ولا وحدة ناقصة،
//      وكل خطوة تُرسم بمعرّفها zone-* بالترتيب مع عدّاد وشريط تقدّم.
//   3) كل وحدة مصدرية تُرسم داخل خطوتها الخاصة (data-source-section داخل الـ section).
//   4) كل لوحة مختبر (data-lab) تظهر في خطوتها، وكل تمارين الدرس التسعة باقية.
//   5) no answer leakage: الاختبار النهائي لا يكشف التصحيح قبل «تحقق من الإجابات».
//   6) العزل: الغلاف RTL وكل خطوة تحمل عناصر إنجليزية داخل dir="ltr".
// ============================================================
import { createRequire } from "node:module";
import { rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "scripts", ".lesson24-audit.mjs");
const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) {
    failures.push(msg);
    console.error("✕ " + msg);
  } else {
    console.log("✓ " + msg);
  }
};

await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React from 'react';
import { renderToString } from 'react-dom/server';
import Lesson24, { SlideView24 } from ${JSON.stringify(join(root, "src/lessons/lesson24/Lesson24.tsx"))};
import { SOURCE_SECTIONS, SOURCE_NUMBERED_COUNT, SLIDES, LESSON_TITLE_24, STEPS_24, STEP_COUNT_24, TRAINING1, TRAINING2, TRAINING3, TRAINING4, TRAINING5, DETECTIVE, IQ200, MEANING, MINI_TEST } from ${JSON.stringify(join(root, "src/lessons/lesson24/data.ts"))};
export { React, renderToString, Lesson24, SlideView24, SOURCE_SECTIONS, SOURCE_NUMBERED_COUNT, SLIDES, LESSON_TITLE_24, STEPS_24, STEP_COUNT_24, TRAINING1, TRAINING2, TRAINING3, TRAINING4, TRAINING5, DETECTIVE, IQ200, MEANING, MINI_TEST };
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

try {
  const m = await import(pathToFileURL(outFile).href);
  const html = m.renderToString(m.React.createElement(m.Lesson24, { onExit: () => {} }));
  const plain = html.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&");

  // ---------------- 1) العرض الكامل والمحتوى المصدر ----------------
  ok(html.length > 50000, "Lesson 24 SSR renders substantial student-facing output");
  ok(html.includes('dir="rtl"'), "Arabic shell is RTL");
  ok((html.match(/data-source-section=/g) || []).length === m.SOURCE_SECTIONS.length, `all ${m.SOURCE_SECTIONS.length} source markers render`);
  ok(!html.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "no GB flag branding");
  ok(html.includes("تحقق من الإجابات"), "neutral check interactions render");

  for (const [name, arr] of [["Training 1", m.TRAINING1], ["Training 2", m.TRAINING2], ["Training 3", m.TRAINING3], ["Training 4", m.TRAINING4], ["Training 5", m.TRAINING5], ["Grammar Detective", m.DETECTIVE], ["IQ200", m.IQ200], ["Meaning Challenge", m.MEANING]]) {
    ok(arr.every((x) => plain.includes(x)), `${name}: all ${arr.length} supplied items reach rendered output`);
  }
  ok(m.MINI_TEST.length === 8 && m.MINI_TEST.every((x) => plain.includes(x[0])), "mini final test: all 8 questions render");
  for (const s of ["many books", "much water", "a few books", "few books", "a little water", "little water", "some books", "some water", "any books", "any water", "a lot of books", "a lot of water", "lots of books", "lots of water", "How many apples do you need?", "How much water do you drink?", "There are many books.", "There is much water.", "three times"]) ok(plain.includes(s), `BIDI/source phrase renders: ${s}`);
  ok(plain.includes("There are a lot of students in the classroom."), "intentionally correct detective sentence preserved");
  ok(plain.includes("12 customers") && plain.includes("3 tables") && plain.includes("2 chefs"), "Final Boss requirements render");
  ok(plain.includes("Past Continuous"), "roadmap renders");

  // --- Render-level source ledger: every unit's full body + title must reach the rendered UI ---
  const norm = (x) => String(x).replace(/[\s\u200b\u200c\u2060]/g, "");
  const plainN = norm(plain);
  for (const s of m.SOURCE_SECTIONS) {
    ok(plainN.includes(norm(s.title)), `render-level ledger: title of unit "${s.id}" reaches UI`);
    ok(plainN.includes(norm(s.body)), `render-level ledger: full body of unit "${s.id}" reaches UI`);
  }
  const markers = [...html.matchAll(/data-source-section="(\d+)"/g)].map((x) => x[1]);
  ok(markers.length === m.SOURCE_SECTIONS.length && new Set(markers).size === m.SOURCE_SECTIONS.length && m.SOURCE_SECTIONS.every((_, i) => markers.includes(String(i + 1))), `render-level ledger: markers 01..${m.SOURCE_SECTIONS.length} each present exactly once`);

  // ---------------- 2) خطة الخطوات (data-level) ----------------
  const unitIds = m.SOURCE_SECTIONS.map((s) => s.id);
  ok(m.STEPS_24.length === m.STEP_COUNT_24, `step plan keeps STEP_COUNT_24 in sync (${m.STEP_COUNT_24})`);
  ok(m.STEP_COUNT_24 === 32, `Lesson 24 keeps its 32-step native flow (${m.STEP_COUNT_24})`);
  ok(new Set(m.STEPS_24.map((s) => s.id)).size === m.STEPS_24.length, `step ids are unique (${m.STEPS_24.length} steps)`);
  ok(m.STEPS_24[0].kind === "cover" && m.STEPS_24[0].id === "cover", "the first step is the lesson cover");
  ok(m.STEPS_24.at(-1).id === "quiz" && m.STEPS_24.at(-1).kind === "quiz", "the last step is the shared final quiz");
  ok(m.STEPS_24.every((s) => ["cover", "lesson", "quiz"].includes(s.kind)), "every step declares a known kind");
  ok(m.STEPS_24.every((s) => s.section && s.en && s.mascot && s.title && s.tone), "every step declares section/en/mascot/title/tone (rail + frame metadata)");
  ok(m.STEPS_24.every((s) => Array.isArray(s.blocks) && s.blocks.length > 0), "no step is empty");
  const claims = [];
  for (const st of m.STEPS_24) for (const b of st.blocks) if (b.t === "unit") claims.push(b.id); else for (const c of b.covers ?? []) claims.push(c);
  ok(claims.length === unitIds.length, `the step plan claims exactly ${unitIds.length} source units (${claims.length})`);
  ok(new Set(claims).size === claims.length, "no source unit is claimed twice");
  ok(unitIds.every((id) => claims.includes(id)), "every source unit is claimed by a step");
  ok(claims.every((id) => unitIds.includes(id)), "no step claims an unknown source unit");
  ok(m.SOURCE_NUMBERED_COUNT === 64 && m.SOURCE_SECTIONS.length === 64, "the source ledger still holds 64 numbered units");
  ok(m.SLIDES.length === m.SOURCE_SECTIONS.length && m.SLIDES.every((s, i) => s.id === m.SOURCE_SECTIONS[i].id), "SLIDES mirrors SOURCE_SECTIONS in order (hub card stat stays truthful)");
  ok(m.LESSON_TITLE_24 === m.STEPS_24[0].title, "the cover step carries LESSON_TITLE_24");
  const labKeys = new Set();
  let duplicateLab = null;
  for (const st of m.STEPS_24) for (const b of st.blocks) if (b.t === "lab") { if (labKeys.has(b.key)) duplicateLab = b.key; labKeys.add(b.key); }
  ok(duplicateLab === null, `lab boards are not duplicated across steps (${duplicateLab ?? "none"})`);
  ok(labKeys.size === 27, `the plan wires ${labKeys.size} lab boards`);

  // ---------------- 3) هيكل الغلاف: خطوات مركّبة + عدّاد + شريط تقدّم ----------------
  const { JSDOM } = await import("jsdom");
  const doc = new JSDOM(html).window.document;
  const stepSections = [...doc.querySelectorAll("main > section")];
  ok(stepSections.length === m.STEP_COUNT_24, `all ${m.STEP_COUNT_24} native steps render (${stepSections.length})`);
  ok(stepSections.every((sec, i) => sec.id === `zone-${m.STEPS_24[i].id}`), "step sections render in plan order with zone-* ids");
  const openSteps = stepSections.filter((sec) => !sec.hasAttribute("hidden"));
  ok(openSteps.length === 1 && openSteps[0] === stepSections[0], "the cover step is the only step open on load");
  const counter = doc.querySelector("[data-slide-counter]");
  ok(!!counter && counter.textContent.trim() === `1 / ${m.STEP_COUNT_24}`, `step counter starts at 1 / ${m.STEP_COUNT_24}`);
  ok((html.match(/width:\s*3\.125%/g) || []).length === 1, "progress bar starts at 1/32 of the track");
  const railButtons = [...doc.querySelectorAll("aside button")].filter((b) => !(b.textContent || "").includes("جميع الدروس"));
  ok(railButtons.length === m.STEP_COUNT_24, `step rail lists every step (${railButtons.length})`);
  ok(railButtons.every((b, i) => norm(b.textContent).includes(norm(m.STEPS_24[i].title))), "each rail item carries its step title");
  const railSections = new Set(m.STEPS_24.map((s) => s.section));
  ok(railSections.size === 11 && [...railSections].every((s) => (doc.querySelector("aside")?.textContent || "").includes(s)), `rail groups the ${railSections.size} lesson phases`);
  ok((doc.querySelector("aside")?.textContent || "").includes(`${m.SOURCE_NUMBERED_COUNT} وحدة مصدر`) && (doc.querySelector("aside")?.textContent || "").includes(`${m.STEP_COUNT_24} خطوة`), "rail header discloses the ledger size and step count");
  ok(html.includes("الأسهم ← → أو مفتاح المسافة"), "keyboard navigation hint renders");
  const main = doc.querySelector("main");
  ok(!!main && main.id === "l24-main" && main.getAttribute("data-area") === "student-lesson", "the student lesson area keeps its main landmarks");
  const navButtons = [...doc.querySelectorAll(".pointer-events-auto button")];
  ok(navButtons.length === 2 && navButtons[0].disabled === true && navButtons[1].disabled === false, "prev/next controls render with prev disabled on step 1");
  ok(stepSections.at(-1).id === "zone-quiz", "the shared final quiz stays the last step on screen");

  // ---------------- 4) كل وحدة ولوحة داخل خطوتها ----------------
  const perStep = [];
  for (const [i, st] of m.STEPS_24.entries()) {
    const sec = stepSections[i];
    const text = norm(sec.textContent || "");
    const wanted = st.blocks.flatMap((b) => (b.t === "unit" ? [b.id] : b.covers ?? []));
    for (const id of wanted) {
      const unit = m.SOURCE_SECTIONS.find((s) => s.id === id);
      const want = m.SOURCE_SECTIONS.indexOf(unit) + 1;
      const hits = [...sec.querySelectorAll("[data-source-section]")].filter((n) => Number(n.getAttribute("data-source-section")) === want);
      if (!unit) perStep.push(`${st.id}: unknown unit ${id}`);
      else if (hits.length !== 1) perStep.push(`${st.id}/${id}: ${hits.length} marker cards`);
      else if (!text.includes(norm(unit.title)) || !text.includes(norm(unit.body))) perStep.push(`${st.id}/${id}: title/body missing in step`);
    }
    const plannedLabs = st.blocks.filter((b) => b.t === "lab").map((b) => b.key);
    const renderedLabs = [...sec.querySelectorAll("[data-lab]")].map((n) => n.getAttribute("data-lab"));
    // the cover step renders the lesson Hero directly (no data-lab wrapper); every other lab is wrapped.
    for (const key of plannedLabs) if (!(st.kind === "cover" && key === "hero") && !renderedLabs.includes(`l24-${key}`)) perStep.push(`${st.id}: lab ${key} missing`);
    for (const rendered of renderedLabs) if (!plannedLabs.includes(rendered.replace(/^l24-/, ""))) perStep.push(`${st.id}: unexpected lab ${rendered}`);
    if (!sec.querySelector('[dir="ltr"]')) perStep.push(`${st.id}: no LTR-isolated English node`);
  }
  ok(perStep.length === 0, `every source unit and lab renders inside its own step (${perStep.slice(0, 4).join(" | ") || "clean"})`);
  const outside = [...doc.querySelectorAll("[data-source-section]")].filter((n) => !n.closest("main > section"));
  ok(outside.length === 0, "no source marker renders outside a step section");

  // ---------------- 5) تمارين الدرس التسعة باقية بمعرّفاتها ----------------
  const expectedExercises = ["l24-training-1", "l24-training-2", "l24-training-3", "l24-training-4", "l24-training-5", "l24-detective", "l24-iq200", "l24-meaning", "l24-mini"];
  const exercises = [...doc.querySelectorAll("[data-exercise]")].map((n) => n.getAttribute("data-exercise"));
  ok(exercises.length === expectedExercises.length && expectedExercises.every((e) => exercises.includes(e)), `the nine lesson exercises keep their data-exercise ids (${exercises.join(",")})`);

  // ---------------- 6) الاختبار النهائي: لا كشف قبل التحقق ----------------
  const quizText = stepSections.at(-1).textContent || "";
  ok(quizText.includes("أجبت عن 0 / 12"), "the final quiz starts with 0 / 12 answered");
  ok(quizText.includes("مقفلة") && !quizText.includes("الإجابة الصحيحة"), "the final quiz reveals no answers before checking");
  ok(!!stepSections.at(-1).querySelector('[data-lab="l24-finalQuiz"]'), "the shared final quiz renders inside the last step");

  // ---------------- 7) الغلاف: هوية الدرس واختصارات القفز ----------------
  const coverText = stepSections[0].textContent || "";
  ok(coverText.includes(m.LESSON_TITLE_24), "the cover step shows the lesson identity");
  const coverControls = [...stepSections[0].querySelectorAll("button")].map((b) => b.textContent || "");
  ok(coverControls.some((t) => t.includes("العودة للدروس")), "the cover step keeps the exit control");
  ok(coverControls.some((t) => t.includes("ابدأ من الافتتاح")), "the cover step keeps its start control");
  ok(coverControls.some((t) => t.includes("غرفة القيادة")) && coverControls.some((t) => t.includes("المهمة النهائية")), "the cover step keeps its step shortcuts");
  ok(stepSections.every((sec) => !sec.textContent?.includes("undefined")), "no step renders a literal undefined");
} catch (e) {
  ok(false, e.stack || String(e));
} finally {
  rmSync(outFile, { force: true });
}
if (failures.length) {
  console.error(`Lesson 24 audit FAILED (${failures.length}/${checks})`);
  process.exit(1);
}
console.log(`Lesson 24 audit passed (${checks} assertions): ${checks} checks, ${failures.length} failures.`);
