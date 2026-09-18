// ============================================================
// Render audit: English visual order inside the RTL course.
// Bundles the real lesson components with esbuild and SSR-renders
// them so we inspect the actual React HTML, not a source grep.
// Checks:
//   Subject → Verb → Object
//   I → am → a → student
//   Subject · Verb · Object  (mixed Arabic line)
//
//   node scripts/audit-render-direction.mjs
// ============================================================
import { createRequire } from "node:module";
import { existsSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");

const failures = [];
let checks = 0;
function ok(cond, msg) {
  checks++;
  if (!cond) {
    failures.push(msg);
    console.error(`✕ ${msg}`);
  } else {
    console.log(`✓ ${msg}`);
  }
}

function fontEnSeq(fragment) {
  const out = [];
  const re =
    /dir="ltr"[^>]*class="[^"]*font-en[^"]*"[^>]*>([^<]*)|class="[^"]*font-en[^"]*"[^>]*>([^<]*)/g;
  let m;
  while ((m = re.exec(fragment))) {
    const t = (m[1] || m[2] || "")
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    if (t) out.push(t);
  }
  return out;
}

function assertOrderStrict(label, haystack, expected) {
  let from = 0;
  let failedAt = null;
  for (const w of expected) {
    const i = haystack.indexOf(w, from);
    if (i === -1) {
      failedAt = w;
      break;
    }
    from = i + 1;
  }
  ok(
    failedAt === null,
    `${label}: ${expected.join(" → ")} in strict order${failedAt ? ` — missing/out of order at "${failedAt}"` : ""}  (got ${JSON.stringify(haystack)})`
  );
}

function assertSeq(label, haystack, expected) {
  const idx = expected.map((w) => haystack.findIndex((t) => t === w));
  ok(
    idx.every((i) => i >= 0) && idx.every((v, i) => i === 0 || v > idx[i - 1]),
    `${label}: ${expected.join(" → ")}  (got ${JSON.stringify(haystack)})`
  );
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "scripts", ".audit-bundle.mjs");

await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `
import React from "react";
import { renderToString } from "react-dom/server";
import Lesson1 from ${JSON.stringify(join(root, "src/lessons/lesson1/Lesson1.tsx"))};
import Lesson4 from ${JSON.stringify(join(root, "src/lessons/lesson4/Lesson4.tsx"))};
import Lesson10 from ${JSON.stringify(join(root, "src/lessons/lesson10/Lesson10.tsx"))};
import Lesson13, { FormulaBoard, SlideView } from ${JSON.stringify(join(root, "src/lessons/lesson13/Lesson13.tsx"))};
import { SLIDES as L13_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson13/data.ts"))};
import Lesson14, { FormulaBoard14, SlideView14 } from ${JSON.stringify(join(root, "src/lessons/lesson14/Lesson14.tsx"))};
import { SLIDES as L14_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson14/data.ts"))};
import { LatinRuns } from ${JSON.stringify(join(root, "src/shared/bidi.tsx"))};
import Lesson17, { SlideView17 } from ${JSON.stringify(join(root, "src/lessons/lesson17/Lesson17.tsx"))};
import { SLIDES as L17_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson17/data.ts"))};
import Lesson18, { SlideView18 } from ${JSON.stringify(join(root, "src/lessons/lesson18/Lesson18.tsx"))};
import { SLIDES as L18_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson18/data.ts"))};
import Lesson19, { SlideView19 } from ${JSON.stringify(join(root, "src/lessons/lesson19/Lesson19.tsx"))};
import { SLIDES as L19_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson19/data.ts"))};
import Lesson20, { SlideView20 } from ${JSON.stringify(join(root, "src/lessons/lesson20/Lesson20.tsx"))};
import { SLIDES as L20_SLIDES, SOURCE_SECTIONS as L20_SOURCE_SECTIONS, INTENTIONALLY_WRONG_20, SENTENCE_BUILDER_20 } from ${JSON.stringify(join(root, "src/lessons/lesson20/data.ts"))};
import Lesson21, { SlideView21 } from ${JSON.stringify(join(root, "src/lessons/lesson21/Lesson21.tsx"))};
import { SLIDES as L21_SLIDES, SOURCE_SECTIONS as L21_SOURCE_SECTIONS, INTENTIONALLY_WRONG_21, MINDMAP_21, KITCHEN_21 } from ${JSON.stringify(join(root, "src/lessons/lesson21/data.ts"))};
import Lesson22, { SlideView22 } from ${JSON.stringify(join(root, "src/lessons/lesson22/Lesson22.tsx"))};
import { SLIDES as L22_SLIDES, SOURCE_SECTIONS as L22_SOURCE_SECTIONS, INTENTIONALLY_WRONG_22, GOLDEN_SUMMARY_22_WORDS, FINAL_BOSS_22_CLUES_AR, IQ200_1_SCENE, ROOM_SENTENCES as L22_ROOM_SENTENCES } from ${JSON.stringify(join(root, "src/lessons/lesson22/data.ts"))};
import Lesson23, { SlideView23 } from ${JSON.stringify(join(root, "src/lessons/lesson23/Lesson23.tsx"))};
import { SLIDES as L23_SLIDES, SOURCE_SECTIONS as L23_SOURCE_SECTIONS, INTENTIONALLY_WRONG_23, GOLDEN_23_COUNTABLE_EXAMPLES, GOLDEN_23_UNCOUNTABLE_WORDS, MAGIC_TABLE_23, SEVEN_RULES_23, FINAL_BOSS_23_ITEMS, KITCHEN_SENTENCES as L23_KITCHEN_SENTENCES, ROADMAP_23 as L23_ROADMAP, DETECTIVE_23, IQ200_23, THINKING_23 } from ${JSON.stringify(join(root, "src/lessons/lesson23/data.ts"))};
import { QUIZZES } from ${JSON.stringify(join(root, "src/shared/quizBank.ts"))};
export { React, renderToString, Lesson1, Lesson4, Lesson10, Lesson13, FormulaBoard, SlideView, L13_SLIDES, Lesson14, FormulaBoard14, SlideView14, L14_SLIDES, LatinRuns, Lesson17, SlideView17, L17_SLIDES, Lesson18, SlideView18, L18_SLIDES, Lesson19, SlideView19, L19_SLIDES, Lesson20, SlideView20, L20_SLIDES, L20_SOURCE_SECTIONS, INTENTIONALLY_WRONG_20, SENTENCE_BUILDER_20, Lesson21, SlideView21, L21_SLIDES, L21_SOURCE_SECTIONS, INTENTIONALLY_WRONG_21, MINDMAP_21, KITCHEN_21, Lesson22, SlideView22, L22_SLIDES, L22_SOURCE_SECTIONS, INTENTIONALLY_WRONG_22, GOLDEN_SUMMARY_22_WORDS, FINAL_BOSS_22_CLUES_AR, IQ200_1_SCENE, L22_ROOM_SENTENCES, Lesson23, SlideView23, L23_SLIDES, L23_SOURCE_SECTIONS, INTENTIONALLY_WRONG_23, GOLDEN_23_COUNTABLE_EXAMPLES, GOLDEN_23_UNCOUNTABLE_WORDS, MAGIC_TABLE_23, SEVEN_RULES_23, FINAL_BOSS_23_ITEMS, L23_KITCHEN_SENTENCES, L23_ROADMAP, DETECTIVE_23, IQ200_23, THINKING_23, QUIZZES };
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
  const { React, renderToString, Lesson1, Lesson4, Lesson10, Lesson13, FormulaBoard, SlideView, L13_SLIDES, Lesson14, FormulaBoard14, SlideView14, L14_SLIDES, LatinRuns, Lesson17, SlideView17, L17_SLIDES, Lesson18, SlideView18, L18_SLIDES, Lesson19, SlideView19, L19_SLIDES, Lesson20, SlideView20, L20_SLIDES, L20_SOURCE_SECTIONS, INTENTIONALLY_WRONG_20, SENTENCE_BUILDER_20, Lesson21, SlideView21, L21_SLIDES, L21_SOURCE_SECTIONS, INTENTIONALLY_WRONG_21, MINDMAP_21, KITCHEN_21, Lesson22, SlideView22, L22_SLIDES, L22_SOURCE_SECTIONS, INTENTIONALLY_WRONG_22, GOLDEN_SUMMARY_22_WORDS, FINAL_BOSS_22_CLUES_AR, IQ200_1_SCENE, L22_ROOM_SENTENCES, Lesson23, SlideView23, L23_SLIDES, L23_SOURCE_SECTIONS, INTENTIONALLY_WRONG_23, GOLDEN_23_COUNTABLE_EXAMPLES, GOLDEN_23_UNCOUNTABLE_WORDS, MAGIC_TABLE_23, SEVEN_RULES_23, FINAL_BOSS_23_ITEMS, L23_KITCHEN_SENTENCES, L23_ROADMAP, DETECTIVE_23, IQ200_23, THINKING_23, QUIZZES } = await import(pathToFileURL(outFile).href);

  // --- LatinRuns: mixed SVO phrase stays one LTR unit ---
  {
    const html = renderToString(
      React.createElement(LatinRuns, {
        text: "Subject · Verb · Object — اضغط على الكلمة لتغيير دورها",
      })
    );
    ok(html.includes('dir="ltr"'), "LatinRuns emits dir=ltr");
    ok(
      /dir="ltr"[^>]*>[^<]*Subject · Verb · Object/.test(html),
      `LatinRuns keeps "Subject · Verb · Object" as one LTR run`
    );
    ok(!/Object\s*·\s*Verb\s*·\s*Subject/.test(html), "LatinRuns must not reverse SVO");
  }

  // --- Lesson 1 cover: Formula chips Subject → Verb → Object ---
  {
    const html = renderToString(React.createElement(Lesson1, { onExit: () => {} }));
    ok(html.includes('data-en-seq="svo-roles"'), "Lesson 1 cover renders Formula [data-en-seq=svo-roles]");
    const i = html.indexOf('data-en-seq="svo-roles"');
    const block = i >= 0 ? html.slice(Math.max(0, i - 120), i + 2200) : "";
    ok(block.includes('dir="ltr"'), "Lesson 1 Formula row is dir=ltr");
    assertSeq("Lesson 1 cover Formula", fontEnSeq(block), ["Subject", "Verb", "Object"]);
    ok(
      /dir="ltr"[\s\S]{0,120}Sentence Structure/.test(html),
      'Lesson 1 cover subtitle "Sentence Structure" is LTR-isolated'
    );
  }

  // --- Lesson 4 cover: I → am → a → student ---
  {
    const html = renderToString(React.createElement(Lesson4, { onExit: () => {} }));
    ok(html.includes("ltr-row"), "Lesson 4 cover renders PartsSentence .ltr-row");
    const i = html.indexOf("ltr-row");
    const block = i >= 0 ? html.slice(Math.max(0, i - 120), i + 2200) : "";
    ok(/dir="ltr"/.test(block), "Lesson 4 chip row is dir=ltr");
    assertSeq("Lesson 4 cover I am a student", fontEnSeq(block), ["I", "am", "a", "student"]);
  }

  // --- Mixed titles from Lesson 1 ---
  {
    const samples = [
      "ما هو الـ Subject؟",
      "حدّد الـ Subject والـ Verb",
      "Subject · Verb · Object — اضغط على الكلمة لتغيير دورها",
      "إضافة المفعول به Object",
    ];
    for (const text of samples) {
      const html = renderToString(React.createElement(LatinRuns, { text }));
      if (/Subject · Verb · Object/.test(text)) {
        ok(
          /dir="ltr"[^>]*>[^<]*Subject · Verb · Object/.test(html),
          "exercise-2 subtitle SVO stays one LTR run"
        );
      }
      ok(!/Object\s*·\s*Verb\s*·\s*Subject/.test(html), `no reversed SVO in: ${text}`);
      const visible = html.replace(/<[^>]+>/g, "");
      const must = text.match(/Subject|Verb|Object/g) || [];
      ok(
        must.every((w) => visible.includes(w)),
        `English words preserved in mixed line: ${text}`
      );
    }
  }

  // --- Lesson 10: representative regression render after Lesson 20 registration ---
  {
    const html = renderToString(React.createElement(Lesson10, { onExit: () => {} }));
    ok(html.length > 2000, "Lesson 10 representative route renders without throwing");
    ok(/dir=\"ltr\"/.test(html), "Lesson 10 representative route keeps English LTR isolation");
  }

  // --- Lesson 13: الصيغ الأربع لـ Past Simple (did / didn't) بترتيبها الإنجليزي ---
  {
    const html = renderToString(React.createElement(FormulaBoard));
    ok(html.includes('data-en-seq="l13-formulas"'), "Lesson 13 FormulaBoard renders [data-en-seq=l13-formulas]");
    // الكلمات بترتيبها — و (+) تُفحص بالعدد لأنها تتكرر في الصيغة الواحدة
    const rows13 = [
      ["l13-formula-aff", ["Subject", "Past Verb"], 1],
      ["l13-formula-neg", ["Subject", "didn't", "Base Verb"], 2],
      ["l13-formula-q", ["Did", "Subject", "Base Verb", "?"], 2],
      ["l13-formula-wh", ["Wh-word", "did", "Subject", "Base Verb", "?"], 3],
    ];
    const starts = rows13.map(([seq]) => html.indexOf(`data-en-seq="${seq}"`));
    rows13.forEach(([seq, expected, plusCount], i) => {
      const j = starts[i];
      ok(j >= 0, `Lesson 13 ${seq} present`);
      if (j < 0) return;
      ok(html.slice(Math.max(0, j - 130), j).includes('dir="ltr"'), `Lesson 13 ${seq} row element is dir=ltr`);
      const end = i + 1 < starts.length && starts[i + 1] > j ? starts[i + 1] : j + 4000;
      const toks = fontEnSeq(html.slice(j, end));
      assertSeq(`Lesson 13 ${seq}`, toks, expected);
      ok(toks.filter((t) => t === "+").length === plusCount, `Lesson 13 ${seq}: must keep ${plusCount} "+" separators`);
      // علامة الاستفهام تبقى بعد الفعل الأساسي وليست معكوسة
      if (seq === "l13-formula-q" || seq === "l13-formula-wh") {
        const visible = html.slice(j, end).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        ok(visible.indexOf("Base Verb") < visible.indexOf("?"), `Lesson 13 ${seq}: "?" must come after Base Verb, never reversed`);
      }
    });
    for (const rx of [/Base Verb\s*\+\s*did\s*\+\s*Subject/, /Past Verb\s*\+\s*Subject/, /Subject\s*\+\s*Did\s*\+/]) {
      ok(!rx.test(html.replace(/<[^>]+>/g, " > ")), `Lesson 13 must not render a reversed formula (${rx})`);
    }
  }

  // --- Lesson 13: يعرض الدرس كاملًا بدون أخطاء (شريحة الغلاف) ---
  {
    const html = renderToString(React.createElement(Lesson13, { onExit: () => {} }));
    ok(html.length > 2000, "Lesson 13 renders without throwing");
    ok(/dir="ltr"/.test(html), "Lesson 13 cover isolates English as LTR");
    const coverVisible = html.replace(/<[^>]+>/g, " ");
    ok(/Subject/.test(coverVisible) && /didn/.test(coverVisible), "Lesson 13 cover renders Subject + didn't + Base Verb in LTR");
  }

  // --- Lesson 13: كل الشرائح تُعرض بلا أخطاء (فحص شامل للدرس كاملًا) ---
  {
    const noop = () => {};
    let rendered = 0;
    const broken = [];
    const reversed = [];
    const REV = [
      /Base Verb\s*\+\s*did\s*\+\s*Subject/,
      /Past Verb\s*\+\s*Subject/,
      /Subject\s*\+\s*Did\s*\+/,
    ];
    for (const s of L13_SLIDES) {
      try {
        const h = renderToString(React.createElement(SlideView, { s, onExit: noop }));
        if (h.length < 200) broken.push(`${s.kind}:${s.title ?? ""}`);
        const plain = h.replace(/<[^>]+>/g, " > ");
        for (const rx of REV) if (rx.test(plain)) reversed.push(`${s.kind}:${s.title ?? ""} (${rx})`);
        rendered++;
} catch (err) {
        broken.push(`${s.kind}:${s.title ?? ""} → ${err.message}`);
      }
    }
    ok(L13_SLIDES.length >= 35, `Lesson 13 must keep its full slide count (got ${L13_SLIDES.length})`);
    ok(rendered === L13_SLIDES.length, `Lesson 13: every slide must render without errors (${rendered}/${L13_SLIDES.length}${broken.length ? " — broken: " + broken.join(", ") : ""})`);
    ok(broken.length === 0, `Lesson 13: no slide may throw or render empty (${broken.join(", ")})`);
    ok(reversed.length === 0, `Lesson 13: no slide may render a reversed formula (${reversed.join(", ")})`);

    // كل تمارين الدرس موجودة وبياناتها كاملة
    const exSlides = L13_SLIDES.filter((s) => s.kind === "ex");
    ok(exSlides.length >= 10, `Lesson 13 must keep all 10 exercise/game slides (got ${exSlides.length})`);
    const exTypes = exSlides.map((s) => s.ex.type);
    for (const t of ["errorHunter", "negTransform", "qTransform", "choose", "fill", "triple", "iq200", "pattern", "detective", "finalChallenge"]) {
      ok(exTypes.includes(t), `Lesson 13 exercise type present: ${t}`);
    }
    // شرائح الشرح ①–⑳ كاملة
    const lessonSlides = L13_SLIDES.filter((s) => s.kind === "lesson");
    ok(lessonSlides.length === 20, `Lesson 13 must keep all 20 teaching sections (got ${lessonSlides.length})`);
    const steps = lessonSlides.map((s) => Number(s.step));
    ok(steps.every((v, i) => v === i + 1), `Lesson 13 teaching sections must stay in source order 1→20 (got ${steps.join(",")})`);
    // الخاتمة
    for (const k of ["summary", "keyRule", "roadmap", "quiz", "closing"]) {
      ok(L13_SLIDES.some((s) => s.kind === k), `Lesson 13 closing slide present: ${k}`);
    }
  }

  // --- Lesson 14: الصيغ الأربع وترتيب Wh → did → Subject → Base Verb ---
  {
    const html = renderToString(React.createElement(FormulaBoard14));
    ok(html.includes('data-en-seq="l14-formulas"'), "Lesson 14 FormulaBoard renders [data-en-seq=l14-formulas]");
    const rows14 = [
      ["affirmative", ["Subject", "Past Verb"], 1],
      ["negative", ["Subject", "didn't", "Base Verb"], 2],
      ["yesNo", ["Did", "Subject", "Base Verb", "?"], 2],
      ["wh", ["Wh-word", "did", "Subject", "Base Verb", "?"], 3],
    ];
    const starts = rows14.map(([key]) => html.indexOf(`data-en-formula="${key}"`));
    rows14.forEach(([key, expected, plusCount], i) => {
      const start = starts[i];
      ok(start >= 0, `Lesson 14 formula row present: ${key}`);
      if (start < 0) return;
      const end = i + 1 < starts.length && starts[i + 1] > start ? starts[i + 1] : start + 3500;
      const fragment = html.slice(start, end);
      ok(/dir="ltr"/.test(html.slice(Math.max(0, start - 120), start)), `Lesson 14 ${key} row is dir=ltr`);
      const tokens = fontEnSeq(fragment);
      assertSeq(`Lesson 14 ${key}`, tokens, expected);
      ok(tokens.filter((token) => token === "+").length === plusCount, `Lesson 14 ${key}: keeps ${plusCount} plus separators`);
      if (key === "yesNo" || key === "wh") {
        const visible = fragment.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
        ok(visible.indexOf("Base Verb") < visible.indexOf("?"), `Lesson 14 ${key}: question mark follows Base Verb`);
      }
    });
    for (const rx of [/Base Verb\s*\+\s*did\s*\+\s*Subject/, /Past Verb\s*\+\s*Subject/, /Subject\s*\+\s*Did\s*\+/]) {
      ok(!rx.test(html.replace(/<[^>]+>/g, " > ")), `Lesson 14 FormulaBoard has no reversed formula (${rx})`);
    }
  }

  // --- Lesson 14: every source slide renders, contains content, and keeps the exercise controls ---
  {
    const noop = () => {};
    let rendered = 0;
    const broken = [];
    const reversed = [];
    const noControls = [];
    const REV14 = [
      /Base Verb\s*\+\s*did\s*\+\s*Subject/,
      /Past Verb\s*\+\s*Subject/,
      /Subject\s*\+\s*Did\s*\+/,
      /went\s+did\s+he/,
      /bought\s+did\s+she/,
    ];
    const renderedSlides = [];
    for (const slide of L14_SLIDES) {
      try {
        const html = renderToString(React.createElement(SlideView14, { s: slide, onExit: noop }));
        renderedSlides.push(html);
        if (html.length < 200) broken.push(`${slide.kind}:${slide.title ?? ""}`);
        const plain = html.replace(/<[^>]+>/g, " > ");
        for (const rx of REV14) if (rx.test(plain)) reversed.push(`${slide.kind}:${slide.title ?? ""} (${rx})`);
        if (slide.kind === "ex" && !html.includes("<button") && !html.includes("<textarea")) noControls.push(slide.title);
        rendered++;
      } catch (err) {
        broken.push(`${slide.kind}:${slide.title ?? ""} → ${err.message}`);
      }
    }
    const all14 = renderedSlides.join("\n");
    ok(L14_SLIDES.length === 35, `Lesson 14 keeps the complete 35-slide sequence (got ${L14_SLIDES.length})`);
    ok(rendered === L14_SLIDES.length, `Lesson 14 every slide renders (${rendered}/${L14_SLIDES.length})`);
    ok(broken.length === 0, `Lesson 14 has no empty or throwing slide (${broken.join(", ")})`);
    ok(reversed.length === 0, `Lesson 14 has no reversed English formula/order (${reversed.join(", ")})`);
    ok(noControls.length === 0, `Lesson 14 exercise slides expose interactive controls (${noControls.join(", ")})`);
    for (const phrase of ["Where did Ali go?", "What did she buy?", "When did they arrive?", "Why did he leave early?", "How did she solve the puzzle?", "Who did Sara meet?"]) {
      ok(all14.includes(phrase), `Lesson 14 rendered HTML keeps English phrase: ${phrase}`);
    }

    const teaching = L14_SLIDES.filter((slide) => slide.kind === "lesson");
    ok(teaching.length === 19, `Lesson 14 teaching sections 1–19 are present (${teaching.length})`);
    const steps = teaching.map((slide) => Number(slide.step));
    ok(steps.every((value, i) => value === i + 1), `Lesson 14 teaching order remains 1→19 (got ${steps.join(",")})`);
    const exercises = L14_SLIDES.filter((slide) => slide.kind === "ex");
    ok(exercises.length === 9, `Lesson 14 exercises 20–28 are present (${exercises.length})`);
    for (const type of ["level1", "level2", "level3", "level4", "detective", "iq200", "hard", "conversation", "finalChallenge"]) {
      ok(exercises.some((slide) => slide.ex.type === type), `Lesson 14 exercise type present: ${type}`);
    }
    for (const kind of ["summary", "keyRule", "roadmap", "quiz", "closing"]) {
      ok(L14_SLIDES.some((slide) => slide.kind === kind), `Lesson 14 closing slide present: ${kind}`);
    }
  }

        // --- الدرس 17 — Possessive Pronouns: كل شريحة تُعرض، بلا انعكاس، وبلا فراغ ---
  {
    const noop = () => {};
    let rendered = 0;
    const broken = [];
    const reversed = [];
    const noControls = [];
    const REV17 = [
      /\bbook\s+my\b/,
      /\bbag\s+your\b/,
      /\bcar\s+their\b/,
      /\bhouse\s+our\b/,
      /\bcamera\s+her\b/,
      /\bnotebook\s+my\b/,
      /\bmine\s+is\s+book\b/,
      /\bis\s+mine\s+This\b/,
      /Noun\s*\+\s*Adjective\s*\+\s*Possessive/,
      /Pronoun\s*\+\s*Possessive/,
    ];
    const renderedSlides = [];
    for (const slide of L17_SLIDES) {
      try {
        const html = renderToString(React.createElement(SlideView17, { s: slide, onExit: noop }));
        renderedSlides.push(html);
        if (html.length < 200) broken.push(`${slide.kind}:${slide.title ?? ""}`);
        const plain = html.replace(/<[^>]+>/g, " > ");
        for (const rx of REV17) if (rx.test(plain)) reversed.push(`${slide.kind}:${slide.title ?? ""} (${rx})`);
        if (slide.kind === "ex" && !/<button|<input|<textarea/.test(html)) noControls.push(slide.title);
        rendered++;
      } catch (err) {
        broken.push(`${slide.kind}:${slide.title ?? ""} → ${err.message}`);
      }
    }
    const all17 = renderedSlides
      .join("\n")
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&");

    ok(L17_SLIDES.length >= 53, `Lesson 17 keeps its complete slide sequence (got ${L17_SLIDES.length})`);
    ok(rendered === L17_SLIDES.length, `Lesson 17 every slide renders (${rendered}/${L17_SLIDES.length})`);
    ok(broken.length === 0, `Lesson 17 has no empty or throwing slide (${broken.join(", ")})`);
    ok(reversed.length === 0, `Lesson 17 has no reversed English word order (${reversed.join(", ")})`);
    ok(noControls.length === 0, `Lesson 17 exercise slides expose interactive controls (${noControls.join(", ")})`);

    const teaching = L17_SLIDES.filter((s) => s.kind === "lesson");
    ok(teaching.length === 35, `Lesson 17 teaching sections 1–35 are present (${teaching.length})`);
    const steps = teaching.map((s) => Number(s.step));
    ok(steps.every((v, i) => v === i + 1), `Lesson 17 teaching order remains 1→35 (${steps.join(",")})`);
    const exercises = L17_SLIDES.filter((s) => s.kind === "ex");
    ok(exercises.length === 10, `Lesson 17 exercises 36–45 are present (${exercises.length})`);
    const badges = exercises.map((s) => Number(s.badge));
    ok(badges.every((v, i) => v === 36 + i), `Lesson 17 exercise numbering stays 36→45 (${badges.join(",")})`);
    for (const type of ["level1", "level2", "level3", "level4", "level5", "level6", "detective", "iq200", "iq200b", "finalChallenge"]) {
      ok(exercises.some((s) => s.ex.type === type), `Lesson 17 exercise type present: ${type}`);
    }
    for (const kind of ["cover", "objectives", "summary", "iq200Rule", "fiveErrors", "roadmap", "quiz", "closing"]) {
      ok(L17_SLIDES.some((s) => s.kind === kind), `Lesson 17 slide present: ${kind}`);
    }

    for (const phrase of [
      "This is my book.",
      "This book is mine.",
      "This is my notebook.",
      "This notebook is mine.",
      "This is his laptop.",
      "This laptop is his.",
      "This is her camera.",
      "This camera is hers.",
      "This is our classroom.",
      "This classroom is ours.",
      "This house is theirs.",
      "Whose phone is this?",
      "Whose bag is this?",
      "Whose car is that?",
      "It's mine.",
      "It's hers.",
      "It's theirs.",
      "Yes, it is mine.",
      "This is Sara's notebook.",
      "Alex's laptop",
      "The robot moved its arm.",
      "His car is fast.",
      "The car is his.",
      "Their car is new.",
      "They're happy.",
      "The book is yours.",
      "my book",
      "your bag",
      "her phone",
      "our house",
      "their car",
      "Possessive Adjective + Noun",
      "my → mine",
      "my book → mine",
      "her camera",
      "his camera",
      "Their cameras",
      "Is this yours?",
      "This one is hers.",
      "Sara's book",
      "the book is hers",
      "Omar's phone",
      "the phone is his",
      "This book is mine.",
      "These books are mine.",
      "I have five books.",
      "The books are mine.",
      "Emma brought her camera to the competition.",
    ]) {
      ok(all17.includes(phrase), `Lesson 17 rendered HTML keeps English unit: ${phrase}`);
    }
  }

  // --- الدرس 17: الخريطة الأساسية — I → my → mine بترتيبها الإنجليزي ---
  {
    const slide = L17_SLIDES.find((s) => s.kind === "lesson" && s.step === "4");
    const html = renderToString(React.createElement(SlideView17, { s: slide, onExit: () => {} }));
    ok(html.includes('data-en-seq="l17-coremap"'), "Lesson 17 core map renders [data-en-seq=l17-coremap]");
    const i = html.indexOf('data-en-seq="l17-coremap"');
    ok(html.slice(Math.max(0, i - 160), i).includes('dir="ltr"'), "Lesson 17 core map row container is dir=ltr");
    const tokens = fontEnSeq(html.slice(i, i + 9000));
    assertSeq("Lesson 17 core map (I)", tokens, ["I", "my", "mine"]);
    assertSeq("Lesson 17 core map (She)", tokens, ["She", "her", "hers"]);
    assertSeq("Lesson 17 core map (They)", tokens, ["They", "their", "theirs"]);
    assertSeq("Lesson 17 must-memorize", tokens, ["my", "mine", "your", "yours"]);
    ok(!tokens.includes("my I") && !tokens.includes("mine my"), "Lesson 17 core map never reverses the pair");
  }

  // --- الدرس 17: جدول المقارنة الكاملة ---
  {
    const slide = L17_SLIDES.find((s) => s.kind === "lesson" && s.step === "13");
    const html = renderToString(React.createElement(SlideView17, { s: slide, onExit: () => {} }));
    ok(html.includes('data-en-seq="l17-compare"'), "Lesson 17 comparison table renders [data-en-seq=l17-compare]");
    const i = html.indexOf('data-en-seq="l17-compare"');
    const end = html.indexOf('data-en-seq="l17-beforeafter"');
    const tokens = fontEnSeq(html.slice(i, end === -1 ? i + 6000 : end));
    assertOrderStrict("Lesson 17 comparison table", tokens, [
      "I", "my", "mine",
      "You", "your", "yours",
      "He", "his", "his",
      "She", "her", "hers",
      "We", "our", "ours",
      "They", "their", "theirs",
    ]);
    ok(end > i, "Lesson 17 before/after ownership cards render");
    const afterTokens = fontEnSeq(html.slice(end));
    assertOrderStrict("Lesson 17 before/after pairs", afterTokens, ["my book", "your car", "his jacket", "her bag", "our house", "their school"]);
  }

  // --- الدرس 17: آلة التحويل — الصفة قبل الاسم، والضمير بعدها ---
  {
    const slide = L17_SLIDES.find((s) => s.kind === "lesson" && s.step === "17");
    const html = renderToString(React.createElement(SlideView17, { s: slide, onExit: () => {} }));
    ok(html.includes('data-en-seq="l17-machine"'), "Lesson 17 transformation machine renders [data-en-seq=l17-machine]");
    const i = html.indexOf('data-en-seq="l17-machine"');
    const tokens = fontEnSeq(html.slice(i, i + 6000));
    assertOrderStrict("Lesson 17 machine pairs", tokens, ["my book", "your bag", "his jacket", "her phone", "our house", "their car"]);
    assertSeq("Lesson 17 machine stage", tokens, ["my", "book"]);
    ok(!tokens.includes("book my"), "Lesson 17 machine never renders 'book my'");
    ok(html.includes('data-en-seq="l17-lab"'), "Lesson 17 noun removal lab renders");
    const labTokens = fontEnSeq(html.slice(html.indexOf('data-en-seq="l17-lab"')));
    assertSeq("Lesson 17 noun removal lab", labTokens, ["my", "notebook"]);
  }

  // --- الدرس 17: قاعدة IQ200 النهائية بترتيبها ---
  {
    const slide = L17_SLIDES.find((s) => s.kind === "iq200Rule");
    const html = renderToString(React.createElement(SlideView17, { s: slide, onExit: () => {} }));
    ok(html.includes('data-en-seq="l17-iq200rule"'), "Lesson 17 IQ200 rule renders [data-en-seq=l17-iq200rule]");
    const i = html.indexOf('data-en-seq="l17-iq200rule"');
    ok(html.slice(Math.max(0, i - 160), i).includes('dir="ltr"'), "Lesson 17 IQ200 rule container is dir=ltr");
    const tokens = fontEnSeq(html.slice(i, i + 4000));
    assertSeq("Lesson 17 IQ200 rule", tokens, ["Possessive Adjective + Noun", "my book", "my → mine", "my book → mine"]);
    assertSeq("Lesson 17 IQ200 pairs", tokens, ["your bag → yours", "her phone → hers", "our house → ours", "their car → theirs"]);
  }

  // --- الدرس 17: الخلاصة الكبرى ---
  {
    const slide = L17_SLIDES.find((s) => s.kind === "summary");
    const html = renderToString(React.createElement(SlideView17, { s: slide, onExit: () => {} }));
    const adj = html.indexOf('data-en-seq="l17-sum-adj"');
    const pron = html.indexOf('data-en-seq="l17-sum-pron"');
    ok(adj >= 0 && pron >= 0 && adj < pron, "Lesson 17 summary renders both ownership columns");
    assertSeq("Lesson 17 summary adjectives", fontEnSeq(html.slice(adj, pron)), ["my", "your", "his", "her", "our", "their", "my book", "her phone", "their house"]);
    assertSeq("Lesson 17 summary pronouns", fontEnSeq(html.slice(pron, pron + 4000)), ["mine", "yours", "his", "hers", "ours", "theirs", "The book is mine.", "The phone is hers.", "The house is theirs."]);
  }

  // --- الدرس 17: ترتيب الخيارات A ثم B ---
  {
    for (const badge of ["36", "38"]) {
      const slide = L17_SLIDES.find((s) => s.kind === "ex" && s.badge === badge);
      const html = renderToString(React.createElement(SlideView17, { s: slide, onExit: () => {} }));
      const groups = html.match(/data-en-seq="l17-opts-[^"]+"/g) || [];
      ok(groups.length === 6, `Lesson 17 ${badge}: six option groups rendered (got ${groups.length})`);
      const aIdx = [...html.matchAll(/data-en-opt="A"/g)].map((m) => m.index);
      const bIdx = [...html.matchAll(/data-en-opt="B"/g)].map((m) => m.index);
      ok(aIdx.length === 6 && bIdx.length === 6, `Lesson 17 ${badge}: A/B markers present on all six questions`);
      ok(aIdx.every((v, i) => v < bIdx[i]), `Lesson 17 ${badge}: option A always precedes option B`);
    }
  }

  // --- الدرس 17: Whose? و Grammar Detective و IQ200 و المهمة النهائية ---
  {
    const whose = L17_SLIDES.find((s) => s.kind === "ex" && s.badge === "40");
    const whoseHtml = renderToString(React.createElement(SlideView17, { s: whose, onExit: () => {} }));
    for (const q of ["Whose phone is this?", "Whose bicycle is this?", "Whose jacket is this?", "Whose house is this?", "Whose books are these?"]) {
      ok(whoseHtml.includes(q), `Lesson 17 Whose exercise keeps: ${q}`);
    }
    const whosePlain = whoseHtml.replace(/&#x27;/g, "'");
    ok(whosePlain.includes("It's ______."), "Lesson 17 Whose exercise keeps the It's ______ pattern");
    ok(whosePlain.includes("They're ______."), "Lesson 17 Whose exercise keeps the They're ______ pattern");

    const det = L17_SLIDES.find((s) => s.kind === "ex" && s.badge === "42");
    const detHtml = renderToString(React.createElement(SlideView17, { s: det, onExit: () => {} }));
    for (const w of ["her", "his", "their", "yours", "mine", "hers"]) {
      ok(new RegExp(`>${w}<`).test(detHtml), `Lesson 17 detective keeps target: ${w}`);
    }
    const detPlain = detHtml.replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
    ok(detPlain.includes("Emma brought her camera to the competition."), "Lesson 17 detective passage renders verbatim");
    ok(detPlain.includes("Is this yours?") && detPlain.includes("This one is hers."), "Lesson 17 detective keeps the quoted lines");

    const iq = L17_SLIDES.find((s) => s.kind === "ex" && s.badge === "43");
    const iqHtml = renderToString(React.createElement(SlideView17, { s: iq, onExit: () => {} }));
    ok(iqHtml.includes('data-en-seq="l17-iq200chain"'), "Lesson 17 IQ200 chain renders [data-en-seq=l17-iq200chain]");
    const iqPlain = iqHtml.replace(/&#x27;/g, "'");
    ok(iqPlain.includes("Alex's laptop"), "Lesson 17 IQ200 keeps Alex's laptop in LTR");
    const chainTokens = fontEnSeq(iqHtml.slice(iqHtml.indexOf('data-en-seq="l17-iq200chain"')));
    ok(chainTokens[0] === "Alex's laptop", `Lesson 17 IQ200 chain starts with the source sentence (got ${JSON.stringify(chainTokens.slice(0, 3))})`);
    ok(iqPlain.includes("This is Alex's laptop."), "Lesson 17 IQ200 prompt sentence is verbatim");

    const fin = L17_SLIDES.find((s) => s.kind === "ex" && s.badge === "45");
    const finHtml = renderToString(React.createElement(SlideView17, { s: fin, onExit: () => {} }));
    ok(finHtml.includes("<textarea"), "Lesson 17 final mission exposes a writing area");
    for (const w of ["my", "mine", "your", "yours", "his", "her", "hers", "our", "ours", "their", "theirs"]) {
      ok(new RegExp(`>${w}<`).test(finHtml) || finHtml.includes(`✅ ${w}`) || finHtml.includes(w), `Lesson 17 final mission keeps required word: ${w}`);
    }
    ok(finHtml.includes("Whose...?"), "Lesson 17 final mission keeps the Whose requirement");
  }

  // --- الدرس 17: الدرس كاملًا يُعرض من المكوّن الرئيسي ---
  {
    const html = renderToString(React.createElement(Lesson17, { onExit: () => {} }));
    ok(html.length > 2000, "Lesson 17 renders without throwing");
    ok(/dir="ltr"/.test(html), "Lesson 17 isolates English as LTR");
    ok(html.includes('dir="rtl"'), "Lesson 17 keeps the Arabic RTL shell");
    ok(!html.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 17 renders no GB flag emoji");
  }

  // --- الدرس 18 — Plural Nouns: كل شريحة تُعرض، بلا انعكاس، وبلا فراغ ---
  {
    const noop = () => {};
    let rendered = 0;
    const broken = [];
    const reversed = [];
    const noControls = [];
    const REV18 = [
      /\bbooks\s+a\b/,
      /\bapples\s+an\b/,
      /\bplay\s+boys\s+The\b/,
      /\bplay\s+children\s+The\b/,
      /\bwere\s+children\s+The\b/,
      /\bwas\s+children\s+The\b/,
    ];
    const renderedSlides = [];
    for (const slide of L18_SLIDES) {
      try {
        const html = renderToString(React.createElement(SlideView18, { s: slide, onExit: noop }));
        renderedSlides.push(html);
        if (html.length < 200) broken.push(`${slide.kind}:${slide.title ?? ""}`);
        const plain = html.replace(/<[^>]+>/g, " > ");
        for (const rx of REV18) if (rx.test(plain)) reversed.push(`${slide.kind}:${slide.title ?? ""} (${rx})`);
        if (slide.kind === "ex" && !/<button|<input|<textarea/.test(html)) noControls.push(slide.title);
        rendered++;
      } catch (err) {
        broken.push(`${slide.kind}:${slide.title ?? ""} → ${err.message}`);
      }
    }
    const all18 = renderedSlides
      .join("\n")
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&");

    ok(L18_SLIDES.length === 26, `Lesson 18 keeps its complete 26-slide sequence (got ${L18_SLIDES.length})`);
    ok(rendered === L18_SLIDES.length, `Lesson 18 every slide renders (${rendered}/${L18_SLIDES.length})`);
    ok(broken.length === 0, `Lesson 18 has no empty or throwing slide (${broken.join(", ")})`);
    ok(reversed.length === 0, `Lesson 18 has no reversed English word order (${reversed.join(", ")})`);
    ok(noControls.length === 0, `Lesson 18 exercise slides expose interactive controls (${noControls.join(", ")})`);

    const teaching18 = L18_SLIDES.filter((s) => s.kind === "lesson");
    ok(teaching18.length === 11, `Lesson 18 teaching sections 1–11 are present (${teaching18.length})`);
    const steps18 = teaching18.map((s) => Number(s.step));
    ok(steps18.every((v, i) => v === i + 1), `Lesson 18 teaching order remains 1→11 (${steps18.join(",")})`);
    const exercises18 = L18_SLIDES.filter((s) => s.kind === "ex");
    ok(exercises18.length === 8, `Lesson 18 exercises 12–19 are present (${exercises18.length})`);
    const badges18 = exercises18.map((s) => Number(s.badge));
    ok(badges18.every((v, i) => v === 12 + i), `Lesson 18 exercise numbering stays 12→19 (${badges18.join(",")})`);
    for (const type of ["detective", "challenge1", "challenge2", "challenge3", "iq200", "iq200why", "finalBoss", "miniGame"]) {
      ok(exercises18.some((s) => s.ex.type === type), `Lesson 18 exercise type present: ${type}`);
    }
    for (const kind of ["cover", "objectives", "summary", "keyRule", "roadmap", "quiz", "closing"]) {
      ok(L18_SLIDES.some((s) => s.kind === kind), `Lesson 18 slide present: ${kind}`);
    }

    for (const phrase of [
      "I have a book.",
      "I have two books.",
      "boxs",
      "The man is tall.",
      "The men are tall.",
      "The woman is a doctor.",
      "The women are doctors.",
      "The child is happy.",
      "The children are happy.",
      "One person is waiting.",
      "Five people are waiting.",
      "I have one tooth.",
      "I have many teeth.",
      "My foot is cold.",
      "My feet are cold.",
      "I see one mouse.",
      "I see two mice.",
      "one sheep",
      "five sheep",
      "I can see three fish.",
      "The boy is happy.",
      "The boys are happy.",
      "The child is tired.",
      "The children are tired.",
      "The woman is busy.",
      "The women are busy.",
      "The child was tired.",
      "The children were tired.",
      "The man was angry.",
      "The men were angry.",
      "The woman was at home.",
      "The women were at home.",
      "The boy plays football.",
      "The boys play football.",
      "The girl works here.",
      "The girls work here.",
      "The student studies English.",
      "The students study English.",
      "The child plays outside.",
      "The children play outside.",
      "The children play.",
      "I have two book.",
      "Three child are playing.",
      "The womans are doctors.",
      "The boys plays chess.",
      "She has five tooths.",
      "The men is outside.",
      "I can see two mouses.",
      "There are three boxs.",
      "I have two books.",
      "Three children are playing.",
      "The women are doctors.",
      "The boys play chess.",
      "She has five teeth.",
      "The men are outside.",
      "I can see two mice.",
      "There are three boxes.",
      "The children plays in the garden.",
      "The child play in the garden.",
      "The men is very strong.",
      "The woman are doctors.",
      "Two mouse are under the table.",
      "A children is waiting outside.",
      "Three person are talking.",
      "The boys studies English.",
      "The children play football.",
      "The child plays football.",
      "children = plural",
      "plural = they",
      "They play.",
      "child = singular",
      "singular = he/she/it",
      "He plays.",
      "Yesterday, a child walked into a park.",
      "The children were playing.",
      "The children was playing.",
      "Ali's book",
      "Sara's phone",
      "the boy's bicycle",
      "the boys' bicycles",
      "the child's toy",
      "the children's toys",
    ]) {
      // نحذف الوسوم للنص العاري: بعض الوحدات الإنجليزية تُعرض كسلسلة لفرط مع
      // إبراز الفعل/الكلمة داخل <span> — الترتيب البصري يبقى إنجليزيًا دائمًا.
      const plain18 = all18.replace(/<[^>]+>/g, "");
      ok(plain18.includes(phrase), `Lesson 18 rendered HTML keeps English unit: ${phrase}`);
    }
  }

  // --- الدرس 18: آلة التحويل — المفرد ثم الجمع بترتيبها الإنجليزي ---
  {
    const machineSlide = L18_SLIDES.find((s) => s.kind === "lesson" && s.step === "2");
    const html = renderToString(React.createElement(SlideView18, { s: machineSlide, onExit: () => {} }));
    ok(html.includes('data-en-seq="l18-machine"'), "Lesson 18 transformation machine renders [data-en-seq=l18-machine]");
    const i = html.indexOf('data-en-seq="l18-machine"');
    ok(html.slice(Math.max(0, i - 160), i).includes('dir="ltr"'), "Lesson 18 machine container is dir=ltr");
    const tokens = fontEnSeq(html.slice(i, i + 9000));
    assertSeq("Lesson 18 machine word bank", tokens, ["book", "box", "baby", "knife", "child", "sheep"]);
    ok(!tokens.includes("book box"), "Lesson 18 machine never reverses the word bank");

  }

  // --- الدرس 18: مختبر S / ES / IES على شريحة ES ---
  {
    const esSlide = L18_SLIDES.find((s) => s.kind === "lesson" && s.step === "3");
    const esHtml = renderToString(React.createElement(SlideView18, { s: esSlide, onExit: () => {} }));
    ok(esHtml.includes('data-en-seq="l18-sesies"'), "Lesson 18 S/ES/IES lab renders");
  }

  // --- الدرس 18: لوحة is/are — is للمفرد قبل are للجمع ---
  {
    const slide = L18_SLIDES.find((s) => s.kind === "lesson" && s.step === "8");
    const html = renderToString(React.createElement(SlideView18, { s: slide, onExit: () => {} }));
    ok(html.includes('data-en-seq="l18-isare"'), "Lesson 18 is/are control panel renders");
    const i = html.indexOf('data-en-seq="l18-isare"');
    const tokens = fontEnSeq(html.slice(i, i + 9000));
    assertOrderStrict("Lesson 18 is/are pair 1", tokens, ["The boy", "is", "happy.", "The boys", "are", "happy."]);
    assertOrderStrict("Lesson 18 is/are pair 2", tokens, ["The child", "is", "tired.", "The children", "are", "tired."]);

    const wasSlide = L18_SLIDES.find((s) => s.kind === "lesson" && s.step === "9");
    const wHtml = renderToString(React.createElement(SlideView18, { s: wasSlide, onExit: () => {} }));
    const wTokens = fontEnSeq(wHtml);
    assertSeq("Lesson 18 was/were quick rule", wTokens, ["is / was", "are / were"]);

    const pSlide = L18_SLIDES.find((s) => s.kind === "lesson" && s.step === "10");
    const pHtml = renderToString(React.createElement(SlideView18, { s: pSlide, onExit: () => {} }));
    ok(pHtml.includes('data-en-seq="l18-present"'), "Lesson 18 present simple machine renders");
    ok(pHtml.includes('data-en-seq="l18-present-both"'), "Lesson 18 present simple both-sides contrast renders");
    const pTokens = fontEnSeq(pHtml);
    ok(pTokens.includes("The boy plays football.") && pTokens.includes("The boys play football."), "Lesson 18 keeps both present simple sentences intact");
    assertSeq("Lesson 18 present simple chain", pTokens, ["The boy plays football.", "The boys play football."]);
    ok(!pTokens.includes("football plays boy The"), "Lesson 18 present simple never reverses word order");
  }

  // --- الدرس 18: ترتيب الخيارات A ثم B ثم C في Challenge 2 ---
  {
    const slide = L18_SLIDES.find((s) => s.kind === "ex" && s.badge === "14");
    const html = renderToString(React.createElement(SlideView18, { s: slide, onExit: () => {} }));
    const groups = html.match(/data-en-seq="l18-opts-[^\"]+"/g) || [];
    ok(groups.length === 5, `Lesson 18 Challenge 2: five option groups rendered (got ${groups.length})`);
    const aIdx = [...html.matchAll(/data-en-opt="A"/g)].map((m) => m.index);
    const bIdx = [...html.matchAll(/data-en-opt="B"/g)].map((m) => m.index);
    const cIdx = [...html.matchAll(/data-en-opt="C"/g)].map((m) => m.index);
    ok(aIdx.length === 5 && bIdx.length === 5 && cIdx.length === 5, "Lesson 18 Challenge 2: A/B/C markers present on all five questions");
    ok(aIdx.every((v, i) => v < bIdx[i]) && bIdx.every((v, i) => v < cIdx[i]), "Lesson 18 Challenge 2: option A always precedes B and B precedes C");
  }

  // --- الدرس 18: FINAL BOSS + Mini Game + Grammar Detective ---
  {
    const boss = L18_SLIDES.find((s) => s.kind === "ex" && s.badge === "18");
    const bossHtml = renderToString(React.createElement(SlideView18, { s: boss, onExit: () => {} }));
    ok(bossHtml.includes('data-en-seq="l18-boss"'), "Lesson 18 final boss renders");
    ok(
      bossHtml.includes("Yesterday, a child walked into a park. He saw two mice near some trees. A woman was sitting on a bench, and three children were playing nearby. The children had two balls and the woman had a small box."),
      "Lesson 18 final boss passage renders verbatim"
    );
    for (const w of ["child", "mice", "woman", "children", "balls", "box"]) {
      ok(new RegExp(`>${w}<`).test(bossHtml), `Lesson 18 final boss keeps investigation word: ${w}`);
    }

    const game = L18_SLIDES.find((s) => s.kind === "ex" && s.badge === "19");
    const gameHtml = renderToString(React.createElement(SlideView18, { s: game, onExit: () => {} }));
    ok(gameHtml.includes('data-en-seq="l18-game"'), "Lesson 18 mini game renders");
    for (const w of ["child", "children", "woman", "women", "mouse", "mice", "book", "books", "sheep", "men", "person", "people"]) {
      ok(new RegExp(`data-en-word="${w}"`).test(gameHtml), `Lesson 18 mini game keeps word: ${w}`);
    }

    const det = L18_SLIDES.find((s) => s.kind === "ex" && s.badge === "12");
    const detHtml = renderToString(React.createElement(SlideView18, { s: det, onExit: () => {} }));
    for (const s of [
      "I have two book.",
      "Three child are playing.",
      "The womans are doctors.",
      "The boys plays chess.",
      "She has five tooths.",
      "The men is outside.",
      "I can see two mouses.",
      "There are three boxs.",
    ]) {
      ok(detHtml.includes(s), `Lesson 18 detective keeps: ${s}`);
    }
  }

  // --- الدرس 18: الدرس كاملًا يُعرض من المكوّن الرئيسي ---
  {
    const html = renderToString(React.createElement(Lesson18, { onExit: () => {} }));
    ok(html.length > 2000, "Lesson 18 renders without throwing");
    ok(/dir="ltr"/.test(html), "Lesson 18 isolates English as LTR");
    ok(html.includes('dir="rtl"'), "Lesson 18 keeps the Arabic RTL shell");
    ok(!html.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 18 renders no GB flag emoji");
  }

  // --- الدرس 19: كل الوحدات الإنجليزية المهمة تُعرض نصًا حرفيًا ---
  // renderToString يحوّل ' إلى &#x27; — نعيد التطبيع قبل المقارنة الحرفية.
  const unesc19 = (h) => h.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  {
    const all19 = L19_SLIDES.map((s) =>
      unesc19(renderToString(React.createElement(SlideView19, { s, onExit: () => {} })))
    ).join("\n");
    const plain19 = all19.replace(/<[^>]+>/g, "");
    for (const phrase of [
      "Ali's book",
      "The book belongs to Ali.",
      "Ali book",
      "Sara's phone",
      "Omar's bicycle",
      "Lina's notebook",
      "The dog's tail",
      "The teacher's desk",
      "the book of Ali",
      "the camera of Sara",
      "the tail of the dog",
      "Maya's backpack",
      "James's book",
      "James' book",
      "The boy's bag.",
      "The boys' bags.",
      "The girl's bicycle.",
      "The girls' bicycles.",
      "The student's book.",
      "The students' books.",
      "The teacher's room.",
      "The teachers' room.",
      "The students's books",
      "The students' books.",
      "The child's toy.",
      "The children's toys.",
      "childrens'",
      "children's",
      "The man's jacket.",
      "The men's jackets.",
      "The woman's bag.",
      "The women's bags.",
      "The person's name.",
      "The people's opinions.",
      "The tooth's shape.",
      "The teeth's condition.",
      "The man's foot.",
      "The men's feet.",
      "students' books",
      "children's toys",
      "the school's name",
      "the city's center",
      "the company's website",
      "the dog's name",
      "His book",
      "Sara's laptop.",
      "Her laptop.",
      "The laptop is hers.",
      "Omar's phone.",
      "His phone.",
      "The phone is his.",
      "Maya's notebook.",
      "The notebook is hers.",
      "The students' classroom.",
      "Their classroom.",
      "The classroom is theirs.",
      "The book's cover.",
      "The books are interesting.",
      "one boy's bicycle",
      "two boys' bicycles",
      "The boy's shoes are dirty.",
      "The boys' shoes are dirty.",
      "The child's toys.",
      "The children's toys.",
      "Liam has a small dog. The dog's name is Rocket. Liam also has two sisters. The girls' room is next to Liam's room. Their mother keeps the children's toys in a large box.",
      "The boy's are playing.",
      "The boys' are playing.",
      "The boys' bags are heavy.",
      "The childrens' books are new.",
      "The children's books are new.",
      "My sister's phone is broken.",
      "My sisters' phones are broken.",
      "boy → boy's",
      "boys → boys'",
      "children → children's",
      "Sara's book",
      "The book is hers.",
      "Their toys",
      "The toys are theirs.",
    ]) {
      // نحذف الوسوم للنص العاري: بعض الوحدات الإنجليزية تُعرض كسلسلة لفرط مع
      // إبراز الفعل/الكلمة داخل <span> — الترتيب البصري يبقى إنجليزيًا دائمًا.
      ok(plain19.includes(phrase), `Lesson 19 rendered HTML keeps English unit: ${phrase}`);
    }
  }

  // --- الدرس 19: آلة apostrophe + المقارن + المختبرات ---
  {
    const machineSlide = L19_SLIDES.find((s) => s.kind === "lesson" && s.step === "★");
    const mHtml = renderToString(React.createElement(SlideView19, { s: machineSlide, onExit: () => {} }));
    ok(mHtml.includes('data-en-seq="l19-rules"'), "Lesson 19 rule cases render");
    ok(mHtml.includes('data-en-seq="l19-golden"'), "Lesson 19 golden table renders");
    ok(mHtml.includes('data-en-seq="l19-machine"'), "Lesson 19 apostrophe machine renders");
    // بطاقات الحالات الثلاث تُعرض مفتوحة من الحالة الأولى (الجدول والآلة تكشفان عند الضغط)
    const tokens = fontEnSeq(mHtml);
    ok(
      tokens.includes("Ali's") && tokens.includes("students'") && tokens.includes("children's") &&
      tokens.includes("Ali's book") && tokens.includes("students' books") && tokens.includes("children's toys"),
      "Lesson 19 rule cases keep all three possessive forms intact"
    );
    ok(!tokens.includes("book's boy"), "Lesson 19 rule cases never reverse possessive order");

    const s4 = L19_SLIDES.find((s) => s.kind === "lesson" && s.step === "4");
    const s4Html = renderToString(React.createElement(SlideView19, { s: s4, onExit: () => {} }));
    ok(s4Html.includes('data-en-seq="l19-comparator"'), "Lesson 19 boy's vs boys' comparator renders");

    const s5 = L19_SLIDES.find((s) => s.kind === "lesson" && s.step === "5");
    const s5Html = renderToString(React.createElement(SlideView19, { s: s5, onExit: () => {} }));
    ok(s5Html.includes('data-en-seq="l19-number"'), "Lesson 19 number detector renders");
    const s2 = L19_SLIDES.find((s) => s.kind === "lesson" && s.step === "2");
    const s2Html = renderToString(React.createElement(SlideView19, { s: s2, onExit: () => {} }));
    ok(s2Html.includes('data-en-seq="l19-owner"'), "Lesson 19 owner detector renders");
    const s13 = L19_SLIDES.find((s) => s.kind === "lesson" && s.step === "13");
    const s13Html = renderToString(React.createElement(SlideView19, { s: s13, onExit: () => {} }));
    ok(s13Html.includes('data-en-seq="l19-three-system"'), "Lesson 19 three-system machine renders");
    const s14 = L19_SLIDES.find((s) => s.kind === "lesson" && s.step === "14");
    const s14Html = renderToString(React.createElement(SlideView19, { s: s14, onExit: () => {} }));
    ok(s14Html.includes('data-en-seq="l19-apos"'), "Lesson 19 apostrophe≠plural lab renders");
  }

  // --- الدرس 19: Grammar Detective — الجمل الثمانية الخاطئة تبقى كما هي ---
  {
    const det = L19_SLIDES.find((s) => s.kind === "ex" && s.badge === "16");
    const detHtml = unesc19(renderToString(React.createElement(SlideView19, { s: det, onExit: () => {} })));
    for (const s of [
      "The childs toy is broken.",
      "The childrens toys are outside.",
      "The boys's room is large.",
      "The girls bag is red.",
      "The students's books are on the desk.",
      "I like the dogs' tail.",
      "The woman bag is expensive.",
      "The mens shoes are black.",
    ]) {
      ok(detHtml.includes(s), `Lesson 19 detective keeps: ${s}`);
    }
  }

  // --- الدرس 19: Challenge 1 — ترتيب A ثم B ثم C في الأسئلة الأربعة ---
  {
    const slide = L19_SLIDES.find((s) => s.kind === "ex" && s.badge === "17");
    const html = renderToString(React.createElement(SlideView19, { s: slide, onExit: () => {} }));
    const groups = html.match(/data-en-seq="l19-opts-[^"]+"/g) || [];
    ok(groups.length === 4, `Lesson 19 Challenge 1: four option groups rendered (got ${groups.length})`);
    const aIdx = [...html.matchAll(/data-en-opt="A"/g)].map((m) => m.index);
    const bIdx = [...html.matchAll(/data-en-opt="B"/g)].map((m) => m.index);
    const cIdx = [...html.matchAll(/data-en-opt="C"/g)].map((m) => m.index);
    ok(aIdx.length === 4 && bIdx.length === 4 && cIdx.length === 4, "Lesson 19 Challenge 1: A/B/C markers on all four questions");
    ok(aIdx.every((v, i) => v < bIdx[i]) && bIdx.every((v, i) => v < cIdx[i]), "Lesson 19 Challenge 1: A precedes B and B precedes C");
  }

  // --- الدرس 19: FINAL BOSS + Speed Test + IQ200 ---
  {
    const boss = L19_SLIDES.find((s) => s.kind === "ex" && s.badge === "21");
    const bossHtml = unesc19(renderToString(React.createElement(SlideView19, { s: boss, onExit: () => {} })));
    ok(bossHtml.includes('data-en-seq="l19-boss"'), "Lesson 19 final boss renders");
    // الفقرة مقسمة إلى مقاطع لإبراز تراكيب الملكية — الترتيب البصري يبقى إنجليزيًا:
    ok(
      bossHtml.replace(/<[^>]+>/g, "").includes("Liam has a small dog. The dog's name is Rocket. Liam also has two sisters. The girls' room is next to Liam's room. Their mother keeps the children's toys in a large box."),
      "Lesson 19 final boss passage renders verbatim (word order intact)"
    );
    for (const w of ["The dog's name", "the girls'", "Liam's room", "children's toys"]) {
      ok(bossHtml.includes(w), `Lesson 19 final boss keeps passage word: ${w}`);
    }

    const speed = L19_SLIDES.find((s) => s.kind === "ex" && s.badge === "22");
    const speedHtml = unesc19(renderToString(React.createElement(SlideView19, { s: speed, onExit: () => {} })));
    ok(speedHtml.includes('data-en-seq="l19-speed"'), "Lesson 19 speed test renders");
    for (const s of [
      "The boy's are playing.",
      "The boys' are playing.",
      "The boys' bags are heavy.",
      "The childrens' books are new.",
      "The children's books are new.",
      "My sister's phone is broken.",
      "My sisters' phones are broken.",
    ]) {
      ok(speedHtml.includes(s), `Lesson 19 speed test keeps: ${s}`);
    }

    const iq = L19_SLIDES.find((s) => s.kind === "ex" && s.badge === "19");
    const iqHtml = renderToString(React.createElement(SlideView19, { s: iq, onExit: () => {} }));
    ok(iqHtml.includes("one teacher") && iqHtml.includes("many children"), "Lesson 19 IQ200 keeps count prompts");
  }

  // --- الدرس 19: الدرس كاملًا يُعرض من المكوّن الرئيسي ---
  {
    const html = renderToString(React.createElement(Lesson19, { onExit: () => {} }));
    ok(html.length > 2000, "Lesson 19 renders without throwing");
    ok(/dir="ltr"/.test(html), "Lesson 19 isolates English as LTR");
    ok(html.includes('dir="rtl"'), "Lesson 19 keeps the Arabic RTL shell");
    ok(!html.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 19 renders no GB flag emoji");
  }

  // --- الدرس 20: كل شرائح المصدر 1→41، الاختبار المشترك، والخاتمة ترندر فعليًا ---
  {
    const noop = () => {};
    let rendered = 0;
    const broken = [];
    const missingLtr = [];
    const missingSourceMarker = [];
    for (const s of L20_SLIDES) {
      try {
        const html = renderToString(React.createElement(SlideView20, { s, onExit: noop }));
        if (html.length < 200) broken.push(`${s.kind}:${s.title ?? ""}`);
        if (!html.includes('dir="ltr"')) missingLtr.push(`${s.kind}:${s.title ?? ""}`);
        if (s.sourceIndex !== undefined && !html.includes('data-source-section')) missingSourceMarker.push(`${s.sourceIndex + 1}:${s.title ?? ""}`);
        rendered++;
      } catch (err) {
        broken.push(`${s.kind}:${s.title ?? ""} (${err.message || String(err)})`);
      }
    }
    ok(L20_SLIDES.length === 44, `Lesson 20 keeps the complete 44-slide sequence (got ${L20_SLIDES.length})`);
    ok(rendered === L20_SLIDES.length, `Lesson 20 every slide renders (${rendered}/${L20_SLIDES.length})`);
    ok(broken.length === 0, `Lesson 20 has no empty or throwing slide (${broken.join(", ")})`);
    ok(missingLtr.length === 0, `Lesson 20 isolates English on every slide (${missingLtr.join(", ")})`);
    ok(missingSourceMarker.length === 0, `Lesson 20 renders a source-section marker on all 41 source slides (${missingSourceMarker.join(", ")})`);

    const sourceSlides = L20_SLIDES.filter((s) => s.sourceIndex !== undefined);
    ok(sourceSlides.length === 41, `Lesson 20 maps all 41 source sections to slides (${sourceSlides.length})`);
    ok(
      sourceSlides.every((s, i) => s.sourceIndex === i),
      `Lesson 20 source slide order remains 1→41 (${sourceSlides.map((s) => (s.sourceIndex ?? -1) + 1).join(",")})`
    );
    ok(L20_SOURCE_SECTIONS.length === 41, `Lesson 20 source-heading ledger has 41 headings (${L20_SOURCE_SECTIONS.length})`);
    ok(L20_SLIDES.some((s) => s.kind === "quiz") && L20_SLIDES.some((s) => s.kind === "closing"), "Lesson 20 includes shared final quiz and closing slides");
    const exerciseTypes = ["detective", "challenge1", "challenge2", "iq200", "iq200b", "finalBoss", "speed", "golden", "builder"];
    for (const type of exerciseTypes) {
      ok(sourceSlides.some((s) => s.kind === "ex" && s.ex.type === type), `Lesson 20 exercise type present: ${type}`);
    }
    ok(Array.isArray(QUIZZES[20]) && QUIZZES[20].length === 12, `Lesson 20 shared quiz has 12 questions (${QUIZZES[20]?.length ?? 0})`);
  }

  // --- الدرس 20: الوحدات الإنجليزية المصدرية والأخطاء المقصودة لا تنعكس ---
  {
    const unesc20 = (h) => h.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    const all20 = L20_SLIDES.map((s) => unesc20(renderToString(React.createElement(SlideView20, { s, onExit: () => {} })))).join("\n");
    const plain20 = all20.replace(/<[^>]+>/g, "");
    for (const phrase of [
      "This book is interesting.",
      "This apple is red.",
      "These apples are fresh.",
      "Those students are waiting outside.",
      "This child.",
      "These children.",
      "This is Ali.",
      "Those are my teachers.",
      "What are these?",
      "This is my notebook.",
      "Those are the children's toys.",
      "That idea is interesting.",
      "This is not my bag.",
      "Whose are those?",
      "This books ❌",
      "This children ❌",
      "These child ❌",
      "Those car is red ❌",
      "This are my shoes ❌",
      "That are my friends ❌",
      "This books are new.",
      "It's my new camera.",
      "That's my brother's telescope.",
      "Those are the children's bicycles.",
      "Those are the children's toys.",
    ]) {
      ok(plain20.includes(phrase), `Lesson 20 rendered HTML keeps English unit: ${phrase}`);
    }
    for (const intentional of ["This books ❌", "This children ❌", "These child ❌", "Those car is red ❌", "This are my shoes ❌", "That are my friends ❌"]) {
      ok(INTENTIONALLY_WRONG_20.includes(intentional), `Lesson 20 keeps intentional error inventory: ${intentional}`);
    }
    ok(!/books\s+This\b/.test(plain20) && !/children\s+These\b/.test(plain20), "Lesson 20 never renders reversed demonstrative/noun order");
    ok(!all20.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 20 renders no GB flag emoji");
  }

  // --- الدرس 20: Control Center boards keep their LTR order and real controls ---
  {
    const bySource = (sourceIndex) => L20_SLIDES.find((s) => s.sourceIndex === sourceIndex);
    const mapHtml = renderToString(React.createElement(SlideView20, { s: bySource(2), onExit: () => {} }));
    ok(mapHtml.includes('data-en-seq="l20-magic-map"'), "Lesson 20 four-zone map renders");
    assertSeq("Lesson 20 magic map", fontEnSeq(mapHtml), ["This", "That", "These", "Those"]);

    const thisHtml = renderToString(React.createElement(SlideView20, { s: bySource(6), onExit: () => {} }));
    ok(thisHtml.includes('data-en-seq="l20-this-radar"'), "Lesson 20 demonstrative radar renders");
    ok(thisHtml.includes("button"), "Lesson 20 demonstrative radar exposes selectable controls");

    const decisionHtml = renderToString(React.createElement(SlideView20, { s: bySource(23), onExit: () => {} }));
    ok(decisionHtml.includes('data-en-seq="l20-decision-engine"'), "Lesson 20 two-question decision engine renders");
    for (const formula of ["This / That", "These / Those", "This / These", "That / Those"]) {
      ok(decisionHtml.includes(formula), `Lesson 20 decision engine keeps LTR choice formula: ${formula}`);
    }

    const bossHtml = renderToString(React.createElement(SlideView20, { s: bySource(34), onExit: () => {} }));
    ok(bossHtml.includes('data-en-seq="l20-final-boss"'), "Lesson 20 Final Boss renders");
    assertOrderStrict("Lesson 20 Final Boss dialogue", fontEnSeq(bossHtml), [
      "What is this?",
      "It's my new camera.",
      "And what is that?",
      "That's my brother's telescope.",
      "What are these?",
      "These are our notebooks.",
      "And what are those?",
      "Those are the children's bicycles.",
    ]);

    const speedHtml = renderToString(React.createElement(SlideView20, { s: bySource(35), onExit: () => {} }));
    ok(speedHtml.includes('data-en-seq="l20-speed-game"'), "Lesson 20 Speed Game renders");
    assertSeq("Lesson 20 Speed Game word bank", fontEnSeq(speedHtml), ["This", "That", "These", "Those"]);

    const assembledBuilderGroups = SENTENCE_BUILDER_20.groups.every((group) => {
      const be = group.answer.includes(" are ") ? "are" : "is";
      const target = group.answer.replace(/\.$/, "").split(" ").sort().join("|");
      const pool = [group.tokens[1], be, group.tokens[0], group.tokens[2]].join(" ").split(" ").sort().join("|");
      return pool === target;
    });
    ok(assembledBuilderGroups, "Lesson 20 sentence-builder token banks can assemble every supplied model exactly");

    const quizSlide = L20_SLIDES.find((s) => s.kind === "quiz");
    const quizHtml = renderToString(React.createElement(SlideView20, { s: quizSlide, onExit: () => {} }));
    ok(quizHtml.includes("Teacher’s Space") && !quizHtml.includes("These books are heavy. ✅"), "Lesson 20 shared quiz renders a locked Teacher’s Space without key disclosure");
  }

  // --- الدرس 21: كل شرائح المصدر 1→48، الاختبار المشترك، والخاتمة ترندر فعليًا ---
  {
    const noop = () => {};
    let rendered = 0;
    const broken = [];
    const missingLtr = [];
    const missingSourceMarker = [];
    for (const s of L21_SLIDES) {
      try {
        const html = renderToString(React.createElement(SlideView21, { s, onExit: noop }));
        if (html.length < 200) broken.push(`${s.kind}:${s.title ?? ""}`);
        if (!html.includes('dir="ltr"')) missingLtr.push(`${s.kind}:${s.title ?? ""}`);
        if (s.sourceIndex !== undefined && !html.includes('data-source-section')) missingSourceMarker.push(`${s.sourceIndex + 1}:${s.title ?? ""}`);
        rendered++;
      } catch (err) {
        broken.push(`${s.kind}:${s.title ?? ""} (${err.message || String(err)})`);
      }
    }
    ok(L21_SLIDES.length === 51, `Lesson 21 keeps the complete 51-slide sequence (got ${L21_SLIDES.length})`);
    ok(rendered === L21_SLIDES.length, `Lesson 21 every slide renders (${rendered}/${L21_SLIDES.length})`);
    ok(broken.length === 0, `Lesson 21 has no empty or throwing slide (${broken.join(", ")})`);
    ok(missingLtr.length === 0, `Lesson 21 isolates English on every slide (${missingLtr.join(", ")})`);
    ok(missingSourceMarker.length === 0, `Lesson 21 renders a source-section marker on all 48 source slides (${missingSourceMarker.join(", ")})`);

    const sourceSlides = L21_SLIDES.filter((s) => s.sourceIndex !== undefined);
    ok(sourceSlides.length === 48, `Lesson 21 maps all 48 source sections to slides (${sourceSlides.length})`);
    ok(
      sourceSlides.every((s, i) => s.sourceIndex === i),
      `Lesson 21 source slide order remains 1→48 (${sourceSlides.map((s) => (s.sourceIndex ?? -1) + 1).join(",")})`
    );
    ok(L21_SOURCE_SECTIONS.length === 48, `Lesson 21 source-heading ledger has 48 headings (${L21_SOURCE_SECTIONS.length})`);
    ok(L21_SLIDES.some((s) => s.kind === "quiz") && L21_SLIDES.some((s) => s.kind === "closing"), "Lesson 21 includes shared final quiz and closing slides");
    const exerciseTypes = ["detective", "solutions", "challenge1", "challenge2", "challenge3", "challenge4", "iq200", "iq200b", "finalBoss"];
    for (const type of exerciseTypes) {
      ok(sourceSlides.some((s) => s.kind === "ex" && s.ex.type === type), `Lesson 21 exercise type present: ${type}`);
    }
    ok(Array.isArray(QUIZZES[21]) && QUIZZES[21].length === 12, `Lesson 21 shared quiz has 12 questions (${QUIZZES[21]?.length ?? 0})`);
  }

  // --- الدرس 21: الوحدات الإنجليزية المصدرية والأخطاء المقصودة لا تنعكس ---
  const unesc21 = (h) => h.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  {
    const all21 = L21_SLIDES.map((s) => unesc21(renderToString(React.createElement(SlideView21, { s, onExit: () => {} })))).join("\n");
    const plain21 = all21.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    for (const phrase of [
      "There is a cat in the garden.",
      "There is a computer on the desk.",
      "There is a tree near the house.",
      "There is an apple in the basket.",
      "There is a strange noise outside.",
      "There is a dog.",
      "There is a bird.",
      "There is an orange.",
      "There is an umbrella.",
      "There is dog. ❌",
      "There is apple. ❌",
      "There is a dog. ✅",
      "There is an apple. ✅",
      "There are two cats in the garden.",
      "There are five books on the shelf.",
      "There are three windows in the room.",
      "There are many students in the classroom.",
      "There is a book.",
      "There are three books.",
      "There is a child in the room.",
      "There are three children in the room.",
      "There is one child in the park.",
      "There are three children in the park.",
      "There is one woman outside.",
      "There are two women outside.",
      "There is one mouse under the table.",
      "There are four mice under the table.",
      "There is a lamp on the table.",
      "There is a bag under the chair.",
      "There is a bicycle near the door.",
      "There is a cat behind the sofa.",
      "There is a picture above the bed.",
      "There are books on the desk.",
      "There are shoes under the bed.",
      "There are trees behind the house.",
      "There are two chairs next to the window.",
      "There is a robot in the laboratory.",
      "There are three robots in the laboratory.",
      "There is not a computer here.",
      "There isn't a computer here.",
      "There are not any computers here.",
      "There aren't any computers here.",
      "There isn't a car outside.",
      "There isn't a teacher in the room.",
      "There aren't any students here.",
      "There aren't any chairs in the room.",
      "Is there a bathroom upstairs?",
      "Is there a computer on the desk?",
      "Are there any books here?",
      "Are there two windows in the room?",
      "Yes, there is.",
      "No, there isn't.",
      "Yes, there are.",
      "No, there aren't.",
      "Is there a problem?",
      "Yes, it is. ❌",
      "Yes, there is. ✅",
      "There is a cat in the garden.",
      "It is black.",
      "This is a laptop.",
      "There is a laptop on the table.",
      "This is my laptop.",
      "There is a laptop in my room.",
      "There are some books on the table.",
      "There are some students outside.",
      "There are some apples in the basket.",
      "Are there any books?",
      "Are there any students outside?",
      "There aren't any books.",
      "There aren't any students outside.",
      "some books",
      "some students",
      "some apples",
      "some chairs",
      "There is an apple.",
      "There is one chair.",
      "There are two chairs.",
      "There are seven chairs.",
      "There are twenty chairs.",
      "There is two chairs. ❌",
      "There are two chairs. ✅",
      "There are many students here.",
      "There are a lot of cars outside.",
      "There are several trees in the park.",
      "There is a large window in my bedroom.",
      "There is a desk near the window.",
      "There are two chairs beside the desk.",
      "There are some books on the shelf.",
      "There is a small lamp on the desk.",
      "There are pictures on the wall.",
      "There is a bed in the room.",
      "There are two chairs.",
      "There is a lamp next to the bed.",
      "There are five books on the desk.",
      "There are three pictures on the wall.",
      "Is there a desk in the room?",
      "Is there a television?",
      "Are there any computers?",
      "There is a laptop on the desk.",
      "There are three books next to the laptop.",
      "There is a lamp behind the laptop.",
      "There aren't any pictures on the wall.",
      "Is there a desk?",
      "Are there two chairs?",
      "Is there a laptop?",
      "Are there four books?",
      "Is there a lamp?",
      "Are there any pictures?",
      "There is some water in the bottle.",
      "There is some milk in the fridge.",
      "There are some water. ❌",
      "There is a bottle.",
      "There is some water.",
      "There are three bottles.",
      "There are some bottles.",
      "There is a small blue book on the wooden table.",
      "There is a small house near the river.",
      "There is a beautiful garden behind the house.",
      "There is an old computer on the desk.",
      "There is Ali's bag on the chair.",
      "There is Sara's phone on the desk.",
      "There are the children's toys in the box.",
      "There is a book on the table.",
      "This is the book.",
      "These are the books.",
      "That is the book.",
      "Those are the books.",
      "There is a red car outside.",
      "This is the red car.",
      "It is very expensive.",
      "The car is Sara's.",
      "There are a book. ❌",
      "There is a book. ✅",
      "There is two books. ❌",
      "There are two books. ✅",
      "There is many students. ❌",
      "There are many students. ✅",
      "Is there two chairs? ❌",
      "Are there two chairs? ✅",
      "Are there a computer? ❌",
      "Is there a computer? ✅",
      "There are a water bottle. ❌",
      "There is a water bottle. ✅",
      "There are a cat under the table.",
      "There is three students outside.",
      "There are a computer on the desk.",
      "Is there two windows?",
      "Are there a teacher in the classroom?",
      "There is many books on the shelf.",
      "There isn't any chairs here.",
      "There aren't a chair in the room.",
      "Yes, it is.",
      "There is two children in the garden.",
      "Are there two windows?",
      "Is there a teacher in the classroom?",
      "There are two children in the garden.",
      "______ a book on the desk.",
      "______ three pencils in the bag.",
      "______ a strange sound outside.",
      "______ five students in the room.",
      "______ a dog near the door.",
      "______ two bicycles in the garage.",
      "______ a child in the garden.",
      "______ four children in the garden.",
      "______ a computer on the table.",
      "______ two computers on the table.",
      "______ a child in the park.",
      "______ three children in the park.",
      "There is a dog outside.",
      "There are some books on the desk.",
      "There is a computer in the room.",
      "There are three chairs here.",
      "There is a restaurant nearby.",
      "There are two bathrooms upstairs.",
      "There is a problem.",
      "There are some students outside.",
      "one child",
      "three children",
      "one woman",
      "four women",
      "one mouse",
      "five mice",
      "There is a large table in the kitchen.",
      "There are four chairs around the table.",
      "There is a bowl on the table.",
      "There are some apples in the bowl.",
      "There is a refrigerator next to the wall.",
      "Is there a table?",
      "Are there four chairs?",
      "Is there a bowl?",
      "Are there any apples?",
      "Is there a refrigerator?",
      "Are there any pictures?",
      "There is...",
      "There are...",
      "There isn't...",
      "There aren't...",
      "Is there...?",
      "Are there...?",
      "There are two small children in the beautiful garden near Sara's house.",
    ]) {
      ok(plain21.includes(phrase), `Lesson 21 rendered HTML keeps English unit: ${phrase}`);
    }
    for (const intentional of [
      "There is dog. ❌",
      "There is apple. ❌",
      "There are a book. ❌",
      "There is two books. ❌",
      "There is many students. ❌",
      "Is there two chairs? ❌",
      "Are there a computer? ❌",
      "There are a water bottle. ❌",
      "There is two chairs. ❌",
      "There are some water. ❌",
    ]) {
      ok(INTENTIONALLY_WRONG_21.includes(intentional), `Lesson 21 keeps intentional error inventory: ${intentional}`);
    }
    ok(plain21.includes("يوجد مكتب بجانب النافذة.") && plain21.includes("توجد ساعة فوق الباب."), "Lesson 21 Final Boss keeps all Arabic clue lines");
    ok(!/book a is There/.test(plain21) && !/books two are There/.test(plain21) && !/car a is There/.test(plain21), "Lesson 21 never renders reversed English order");
    ok(!all21.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 21 renders no GB flag emoji");
  }

  // --- الدرس 21: لوحات Scene Detective Lab تحافظ على الترتيب LTR والتحكم الحي ---
  {
    const bySource = (sourceIndex) => L21_SLIDES.find((s) => s.sourceIndex === sourceIndex);

    const detectorHtml = renderToString(React.createElement(SlideView21, { s: bySource(1), onExit: () => {} }));
    ok(detectorHtml.includes('data-en-seq="l21-existence"'), "Lesson 21 existence detector renders");
    assertSeq("Lesson 21 existence detector paths", fontEnSeq(detectorHtml), ["There is", "There are"]);
    ok(detectorHtml.includes("There is + Singular Noun") && detectorHtml.includes("There are + Plural Noun"), "Lesson 21 golden rule formulas render");

    const locationHtml = renderToString(React.createElement(SlideView21, { s: bySource(8), onExit: () => {} }));
    ok(locationHtml.includes('data-en-seq="l21-location"'), "Lesson 21 location lab renders");
    for (const prep of ["in", "on", "under", "near", "behind", "in front of", "next to", "between"]) {
      ok(locationHtml.includes(prep), `Lesson 21 location lab keeps preposition: ${prep}`);
    }

    const summaryHtml = renderToString(React.createElement(SlideView21, { s: bySource(44), onExit: () => {} }));
    ok(summaryHtml.includes('data-source-section="الخلاصة الذهبية"'), "Lesson 21 golden summary slide renders");
    assertOrderStrict("Lesson 21 golden summary", fontEnSeq(summaryHtml), [
      "There is...",
      "There are...",
      "There isn't...",
      "There aren't...",
      "Is there...?",
      "Are there...?",
      "Yes, there is.",
      "No, there isn't.",
      "Yes, there are.",
      "No, there aren't.",
    ]);

    const mindHtml = renderToString(React.createElement(SlideView21, { s: bySource(45), onExit: () => {} }));
    const mindSeq = fontEnSeq(mindHtml);
    const expectedMind = MINDMAP_21.flatMap((row) => [row.label, row.answer]);
    assertSeq("Lesson 21 mind map", mindSeq, expectedMind);

    const reachedHtml = renderToString(React.createElement(SlideView21, { s: bySource(46), onExit: () => {} }));
    const reachedPlain = reachedHtml.replace(/&#x27;/g, "'").replace(/<[^>]+>/g, " ");
    ok(reachedPlain.includes("There are two small children in the beautiful garden near Sara's house."), "Lesson 21 final IQ200 sentence renders verbatim");
    for (const part of ["There are", "two", "small", "children", "in the beautiful garden", "near Sara's house"]) {
      ok(unesc21(reachedHtml).includes(part), `Lesson 21 sentence breakdown keeps part: ${part}`);
    }

    const bossHtml = renderToString(React.createElement(SlideView21, { s: bySource(43), onExit: () => {} }));
    const bossPlain = bossHtml.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ");
    ok(bossHtml.includes('data-en-seq="l21-final-boss"'), "Lesson 21 Final Boss renders");
    for (const clue of [
      "يوجد مكتب بجانب النافذة.",
      "يوجد حاسوب على المكتب.",
      "توجد ثلاثة كتب بجانب الحاسوب.",
      "توجد حقيبة تحت المكتب.",
      "يوجد طفل في الغرفة.",
      "يوجد طفلان آخران خارج الغرفة.",
      "لا توجد صور على الجدار.",
      "توجد ساعة فوق الباب.",
    ]) {
      ok(bossPlain.includes(clue), `Lesson 21 Final Boss keeps clue: ${clue}`);
    }
    ok(bossPlain.includes("There is") && bossPlain.includes("There are"), "Lesson 21 Final Boss keeps required formulas");

    const kitchenHtml = renderToString(React.createElement(SlideView21, { s: bySource(42), onExit: () => {} }));
    const kitchenPlain = unesc21(kitchenHtml).replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ");
    ok(kitchenHtml.includes('data-en-seq="l21-kitchen"'), "Lesson 21 kitchen investigation renders");
    for (const line of KITCHEN_21.scene) {
      ok(kitchenPlain.includes(line), `Lesson 21 kitchen keeps scene line: ${line}`);
    }

    const iqHtml = renderToString(React.createElement(SlideView21, { s: bySource(41), onExit: () => {} }));
    ok(iqHtml.includes('data-en-seq="l21-iq200"'), "Lesson 21 IQ200 reasoning lab renders");
    for (const given of ["one child", "three children", "one woman", "four women", "one mouse", "five mice"]) {
      ok(iqHtml.includes(given), `Lesson 21 IQ200 keeps given phrase: ${given}`);
    }

    const detectiveHtml = renderToString(React.createElement(SlideView21, { s: bySource(35), onExit: () => {} }));
    const detectivePlain = unesc21(detectiveHtml).replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ");
    ok(detectiveHtml.includes('data-en-seq="l21-detective"'), "Lesson 21 Grammar Detective renders");
    for (const wrong of [
      "There are a cat under the table.",
      "There is three students outside.",
      "There are a computer on the desk.",
      "Is there two windows?",
      "Are there a teacher in the classroom?",
      "There is many books on the shelf.",
      "There isn't any chairs here.",
      "There aren't a chair in the room.",
      "There is two children in the garden.",
    ]) {
      ok(detectivePlain.includes(wrong), `Lesson 21 detective keeps wrong sentence: ${wrong}`);
    }

    const quizSlide = L21_SLIDES.find((s) => s.kind === "quiz");
    const quizHtml = renderToString(React.createElement(SlideView21, { s: quizSlide, onExit: () => {} }));
    ok(quizHtml.includes("Teacher’s Space"), "Lesson 21 shared quiz renders Teacher’s Space section");
    ok(quizHtml.includes("تحقق من الإجابات"), "Lesson 21 shared quiz keeps STEP 3 check button");
    ok(!quizHtml.includes("الإجابة الصحيحة:"), "Lesson 21 quiz renders no answer key before unlocking");
  }

  // --- الدرس 21: الدرس كاملًا يُعرض من المكوّن الرئيسي ---
  {
    const html = renderToString(React.createElement(Lesson21, { onExit: () => {} }));
    ok(html.length > 2000, "Lesson 21 renders without throwing");
    ok(/dir="ltr"/.test(html), "Lesson 21 isolates English as LTR");
    ok(html.includes('dir="rtl"'), "Lesson 21 keeps the Arabic RTL shell");
    ok(!html.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 21 full lesson renders no GB flag emoji");
  }

  // --- الدرس 22: عرض كل الشرائح بدون أخطاء + علامات المصدر + عزل LTR ---
  {
    const noop22 = () => {};
    let rendered22 = 0;
    const broken22 = [];
    const missingLtr22 = [];
    const missingSrc22 = [];
    for (const s of L22_SLIDES) {
      try {
        const html = renderToString(React.createElement(SlideView22, { s, onExit: noop22 }));
        if (html.length < 200) broken22.push(`${s.kind}:${s.title ?? ""}`);
        if (!html.includes('dir="ltr"')) missingLtr22.push(`${s.kind}:${s.title ?? ""}`);
        if (s.sourceIndex !== undefined && !html.includes('data-source-section')) missingSrc22.push(`${s.sourceIndex + 1}:${s.title ?? ""}`);
        rendered22++;
      } catch (err) {
        broken22.push(`${s.kind}:${s.title ?? ""} (${err.message || String(err)})`);
      }
    }
    ok(L22_SLIDES.length >= 44, `Lesson 22 keeps the complete slide sequence (got ${L22_SLIDES.length})`);
    ok(rendered22 === L22_SLIDES.length, `Lesson 22 every slide renders (${rendered22}/${L22_SLIDES.length})`);
    ok(broken22.length === 0, `Lesson 22 has no empty or throwing slide (${broken22.join(", ")})`);
    ok(missingLtr22.length === 0, `Lesson 22 isolates English on every slide (${missingLtr22.join(", ")})`);
    ok(missingSrc22.length === 0, `Lesson 22 renders a source-section marker on all source slides (${missingSrc22.join(", ")})`);

    const sourceSlides22 = L22_SLIDES.filter((s) => s.sourceIndex !== undefined);
    ok(sourceSlides22.length >= 40, `Lesson 22 maps source sections to slides (${sourceSlides22.length})`);
    ok(L22_SOURCE_SECTIONS.length === 42, `Lesson 22 source-heading ledger has 42 headings (${L22_SOURCE_SECTIONS.length})`);
    ok(L22_SLIDES.some((s) => s.kind === "quiz") && L22_SLIDES.some((s) => s.kind === "closing"), "Lesson 22 includes shared final quiz and closing slides");
    const exTypes22 = ["detective", "challenge1", "challenge2", "challenge3", "iq200a", "iq200b", "finalBoss", "trueFalse"];
    for (const type of exTypes22) {
      ok(sourceSlides22.some((s) => s.kind === "ex" && s.ex.type === type), `Lesson 22 exercise type present: ${type}`);
    }
    ok(Array.isArray(QUIZZES[22]) && QUIZZES[22].length === 12, `Lesson 22 shared quiz has 12 questions (${QUIZZES[22]?.length ?? 0})`);
  }

  // --- الدرس 22: الوحدات الإنجليزية المصدرية والاخطاء المقصودة لا تنعكس ---
  const unesc22 = (h) => h.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  {
    const all22 = L22_SLIDES.map((s) => unesc22(renderToString(React.createElement(SlideView22, { s, onExit: () => {} })))).join("\n");
    const plain22 = all22.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    for (const phrase of [
      "The book is in the bag.",
      "The keys are in the drawer.",
      "The children are in the classroom.",
      "There is a cat in the box.",
      "The phone is on the table.",
      "The cat is under the table.",
      "The clock is above the door.",
      "The temperature is below zero.",
      "The car is behind the house.",
      "The teacher is in front of the students.",
      "The chair is next to the table.",
      "The school is near my house.",
      "The ball is between the boxes.",
      "The bank is opposite the school.",
      "The children are inside the house.",
      "There is a car outside the garage.",
      "There is a book on the table.",
      "There are two books on the desk.",
      "Where is the book?",
      "Where are the keys?",
      "The book is on the table.",
      "The cat is under the chair.",
      "She is in the kitchen.",
      "He is next to the window.",
      "Where is Omar's bag?",
      "It is under the desk.",
      "Where are the children's shoes?",
      "There is a small box under the table next to the door.",
      "There are two chairs in front of the desk near the window.",
      "Ali is behind Sara.",
      "The lamp is above the table.",
      "The lamp is over the table.",
      "The ball is between Ali and Omar.",
      "The teacher is among the students.",
      "There is a bed in the room.",
      "The children's shoes are near the door.",
      "Sara's phone is inside her bag.",
      "The school is between the library and the park.",
    ]) {
      ok(plain22.includes(phrase), `Lesson 22 rendered HTML keeps English unit: ${phrase}`);
    }
    for (const intentional of INTENTIONALLY_WRONG_22) {
      ok(plain22.includes(intentional.replace(/<[^>]+>/g, "")), `Lesson 22 renders intentional error visibly: ${intentional}`);
    }
    const challenge1slide = L22_SLIDES.find((s) => s.kind === "ex" && s.ex.type === "challenge1");
    ok(challenge1slide && challenge1slide.ex.type === "challenge1", "Lesson 22 Short Answer Challenge slide is registered");
    // Arabic clues present
    for (const clue of FINAL_BOSS_22_CLUES_AR) {
      ok(plain22.includes(clue), `Lesson 22 Final Boss keeps Arabic clue: ${clue}`);
    }
    // IQ200 scene sentences present
    for (const line of IQ200_1_SCENE) {
      ok(plain22.includes(line.en), `Lesson 22 IQ200 scene keeps line: ${line.en}`);
    }
    // Bedroom scene sentences present
    for (const line of L22_ROOM_SENTENCES) {
      ok(plain22.includes(line.en), `Lesson 22 room scene keeps line: ${line.en}`);
    }
    ok(!/book the on table the is/.test(plain22) && !/elbat eht no si koob ehT/.test(plain22), "Lesson 22 never renders reversed English word order");
    ok(!all22.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 22 renders no GB flag emoji as branding");
  }

  // --- الدرس 22: لوحات Position Lab تحافظ على الترتيب والتحكم الحي ---
  {
    const bySource22 = (sourceIndex) => L22_SLIDES.find((s) => s.sourceIndex === sourceIndex);

    const overviewHtml = renderToString(React.createElement(SlideView22, { s: bySource22(2), onExit: () => {} }));
    ok(overviewHtml.includes('data-en-seq="l22-overview"'), "Lesson 22 position overview renders");
    for (const prep of ["in", "on", "under", "above", "below", "behind", "in front of", "next to", "near", "between", "opposite", "inside", "outside"]) {
      ok(overviewHtml.includes(prep), `Lesson 22 overview keeps preposition: ${prep}`);
    }

    const mapHtml = renderToString(React.createElement(SlideView22, { s: bySource22(16), onExit: () => {} }));
    ok(mapHtml.includes('data-en-seq="l22-map"'), "Lesson 22 preposition map renders");
    for (const row of GOLDEN_SUMMARY_22_WORDS) {
      ok(unesc22(mapHtml).includes(row.en), `Lesson 22 map keeps word: ${row.en}`);
    }

    const summaryHtml = renderToString(React.createElement(SlideView22, { s: L22_SLIDES.find((s) => s.kind === "summary"), onExit: () => {} }));
    ok(summaryHtml.includes('data-source-section="الخلاصة الذهبية"') || summaryHtml.includes("الخلاصة الذهبية"), "Lesson 22 golden summary slide renders");
    assertSeq("Lesson 22 golden summary words", fontEnSeq(summaryHtml), GOLDEN_SUMMARY_22_WORDS.map((r) => r.en));

    const whereHtml = renderToString(React.createElement(SlideView22, { s: bySource22(19), onExit: () => {} }));
    ok(whereHtml.includes('data-en-seq="l22-where"'), "Lesson 22 Where question machine renders");
    const whereSeq = fontEnSeq(whereHtml);
    ok(whereSeq.includes("Where is...?") && whereSeq.includes("Where are...?"), "Lesson 22 Where forms (Where is / Where are) both present");

    const bossHtml = renderToString(React.createElement(SlideView22, { s: bySource22(36), onExit: () => {} }));
    const bossPlain = unesc22(bossHtml).replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ");
    ok(bossHtml.includes('data-en-seq="l22-final-boss"'), "Lesson 22 Final Boss renders");
    for (const req of ["There is", "There are", "in", "on", "under", "next to", "behind", "in front of", "above"]) {
      ok(bossPlain.includes(req), `Lesson 22 Final Boss keeps requirement: ${req}`);
    }

    const roomHtml = renderToString(React.createElement(SlideView22, { s: bySource22(29), onExit: () => {} }));
    ok(roomHtml.includes('data-en-seq="l22-room"'), "Lesson 22 room scene builder renders");

    const detHtml = renderToString(React.createElement(SlideView22, { s: bySource22(30), onExit: () => {} }));
    ok(detHtml.includes('data-en-seq="l22-detective"'), "Lesson 22 Grammar Detective renders");

    const iq22Html = renderToString(React.createElement(SlideView22, { s: bySource22(34), onExit: () => {} }));
    ok(iq22Html.includes('data-en-seq="l22-iq200a"'), "Lesson 22 IQ200 Challenge renders");

    const quizSlide22 = L22_SLIDES.find((s) => s.kind === "quiz");
    const quizHtml22 = renderToString(React.createElement(SlideView22, { s: quizSlide22, onExit: () => {} }));
    ok(quizHtml22.includes("Teacher’s Space"), "Lesson 22 shared quiz renders Teacher’s Space section");
    ok(quizHtml22.includes("تحقق من الإجابات"), "Lesson 22 shared quiz keeps STEP 3 check button");
    ok(!quizHtml22.includes("الإجابة الصحيحة:"), "Lesson 22 quiz renders no answer key before unlocking");
  }

  // --- الدرس 22: الدرس كاملًا يُعرض من المكوّن الرئيسي ---
  {
    const html = renderToString(React.createElement(Lesson22, { onExit: () => {} }));
    ok(html.length > 2000, "Lesson 22 renders without throwing");
    ok(/dir="ltr"/.test(html), "Lesson 22 isolates English as LTR");
    ok(html.includes('dir="rtl"'), "Lesson 22 keeps the Arabic RTL shell");
    ok(!html.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 22 full lesson renders no GB flag emoji");
  }

  // --- تغطية الدورة كاملة: 23 درسًا ممثلة وجاهزة للعرض ---
  {
    const lessonsDir = join(root, "src", "lessons");
    const lessonFolders = readdirSync(lessonsDir).filter((d) => /^lesson\d+$/.test(d));
    ok(lessonFolders.length === 23, `full course: 23 lesson folders exist (got ${lessonFolders.length})`);
    const missing = lessonFolders.filter((folder) => {
      const n = folder.replace("lesson", "");
      return !(
        existsSync(join(lessonsDir, folder, `Lesson${n}.tsx`)) && existsSync(join(lessonsDir, folder, "data.ts"))
      );
    });
    ok(missing.length === 0, `full course: every lesson folder has LessonN.tsx + data.ts (missing: ${missing.join(", ")})`);
    const appSource = readFileSync(join(root, "src", "App.tsx"), "utf8");
    for (let n = 1; n <= 23; n++) {
      ok(
        appSource.includes(`route === ${n}`) && appSource.includes(`<Lesson${n} onExit={goHome} />`),
        `full course: Lesson ${n} is routed in App.tsx`
      );
    }
    for (let n = 1; n <= 23; n++) {
      ok(Array.isArray(QUIZZES[n]) && QUIZZES[n].length >= 12, `full course: QUIZZES[${n}] registered with at least 12 questions (got ${QUIZZES[n]?.length ?? 0})`);
    }
  }

  // --- الدرس 23: عرض كل الشرائح بدون أخطاء + علامات المصدر + عزل LTR ---
  {
    const noop23 = () => {};
    let rendered23 = 0;
    const broken23 = [];
    const missingLtr23 = [];
    const missingSrc23 = [];
    for (const s of L23_SLIDES) {
      try {
        const html = renderToString(React.createElement(SlideView23, { s, onExit: noop23 }));
        if (html.length < 200) broken23.push(`${s.kind}:${s.title ?? ""}`);
        if (!html.includes('dir="ltr"')) missingLtr23.push(`${s.kind}:${s.title ?? ""}`);
        if (s.sourceIndex !== undefined && !html.includes("data-source-section")) missingSrc23.push(`${s.sourceIndex + 1}:${s.title ?? ""}`);
        rendered23++;
      } catch (err) {
        broken23.push(`${s.kind}:${s.title ?? ""} (${err.message || String(err)})`);
      }
    }
    ok(L23_SLIDES.length >= 60, `Lesson 23 keeps the complete slide sequence (got ${L23_SLIDES.length})`);
    ok(rendered23 === L23_SLIDES.length, `Lesson 23 every slide renders (${rendered23}/${L23_SLIDES.length})`);
    ok(broken23.length === 0, `Lesson 23 has no empty or throwing slide (${broken23.join(", ")})`);
    ok(missingLtr23.length === 0, `Lesson 23 isolates English on every slide (${missingLtr23.join(", ")})`);
    ok(missingSrc23.length === 0, `Lesson 23 renders a source-section marker on all source slides (${missingSrc23.join(", ")})`);

    const sourceSlides23 = L23_SLIDES.filter((s) => s.sourceIndex !== undefined);
    ok(sourceSlides23.length >= 55, `Lesson 23 maps source sections to slides (${sourceSlides23.length})`);
    ok(L23_SOURCE_SECTIONS.length === 57, `Lesson 23 source-heading ledger has 57 headings (${L23_SOURCE_SECTIONS.length})`);
    const mappedSources = new Set(sourceSlides23.map((s) => s.sourceIndex));
    ok(mappedSources.size === L23_SOURCE_SECTIONS.length, `Lesson 23 covers every source section exactly once (${mappedSources.size}/${L23_SOURCE_SECTIONS.length})`);
    ok(L23_SLIDES.some((s) => s.kind === "quiz") && L23_SLIDES.some((s) => s.kind === "closing"), "Lesson 23 includes shared final quiz and closing slides");
    const exTypes23 = ["training1", "training2", "training3", "training4", "detective", "iq200", "thinking", "finalBoss"];
    for (const type of exTypes23) {
      ok(sourceSlides23.some((s) => s.kind === "ex" && s.ex.type === type), `Lesson 23 exercise type present: ${type}`);
    }
    ok(Array.isArray(QUIZZES[23]) && QUIZZES[23].length === 12, `Lesson 23 shared quiz has 12 questions (${QUIZZES[23]?.length ?? 0})`);
  }

  // --- الدرس 23: الوحدات الإنجليزية المصدرية والأخطاء المقصودة لا تنعكس ---
  const unesc23 = (h) => h.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  {
    const all23 = L23_SLIDES.map((s) => unesc23(renderToString(React.createElement(SlideView23, { s, onExit: () => {} })))).join("\n");
    const plain23 = all23.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    for (const phrase of [
      "Countable Noun",
      "Uncountable Noun",
      "a book",
      "an apple",
      "two books",
      "five cars",
      "some books",
      "some water",
      "a bottle of water",
      "two bottles of water",
      "There is a book on the desk.",
      "There are three books on the desk.",
      "There is some water in the bottle.",
      "How many books do you have?",
      "How much water do you drink?",
      "How many children are in the park?",
      "How much money do you have?",
      "a piece of information",
      "two pieces of information",
      "a piece of advice",
      "three pieces of furniture",
      "There is an apple in the basket.",
      "There are three apples in the basket.",
      "There is some milk in the fridge.",
      "There are three apples in the kitchen.",
      "There are two eggs on the table.",
      "There is some rice in the cupboard.",
      "There is a bottle of water next to the fridge.",
      "I have some books.",
      "She bought some apples.",
      "He bought some bread.",
      "Are there any books?",
      "There aren't any books.",
      "Is there any water?",
      "There isn't any water.",
      "How many students are there?",
      "How many apples did she buy?",
      "How many cars are in the parking lot?",
      "How much rice do we need?",
      "How much milk is in the fridge?",
      "There are six chairs.",
      "There are five children.",
      "There is some money in the box.",
      "I have some money. ✅",
      "I have a lot of money. ✅",
      "three coins",
      "two banknotes",
      "five dollars",
      "I drink some coffee.",
      "Two coffees, please.",
      "two cups of coffee",
      "a chicken",
      "two chickens",
      "some chicken",
      "many books",
      "many students",
      "many apples",
      "much water",
      "much money",
      "much information",
      "much rice",
      "an assignment",
      "three assignments",
      "some + plural countable",
      "some + uncountable",
      "How many + Countable Plural?",
      "How much + Uncountable Noun?",
      "There is a/an + noun",
      "There are + plural noun",
      "There is some + uncountable noun",
      "There are some books.",
    ]) {
      ok(plain23.includes(phrase), `Lesson 23 rendered HTML keeps English unit: ${phrase}`);
    }
    for (const intentional of INTENTIONALLY_WRONG_23) {
      ok(plain23.includes(intentional), `Lesson 23 renders intentional teaching error visibly: ${intentional}`);
    }
    for (const sentence of L23_KITCHEN_SENTENCES) {
      ok(plain23.includes(sentence), `Lesson 23 kitchen analysis keeps sentence: ${sentence}`);
    }
    for (const item of FINAL_BOSS_23_ITEMS) {
      ok(plain23.includes(item.item), `Lesson 23 Final Boss keeps room content: ${item.item}`);
      ok(/^There (is|are) /.test(item.model), `Lesson 23 Final Boss model sentence starts with There is / There are: ${item.model}`);
    }
    ok(FINAL_BOSS_23_ITEMS.filter((item) => item.model.startsWith("There are")).length === 4, "Lesson 23 Final Boss keeps 4 There are room sentences");
    ok(FINAL_BOSS_23_ITEMS.filter((item) => item.model.startsWith("There is")).length === 4, "Lesson 23 Final Boss keeps 4 There is room sentences");
    for (const item of DETECTIVE_23) {
      ok(plain23.includes(item.sentence), `Lesson 23 Grammar Detective keeps sentence ${item.n}: ${item.sentence}`);
    }
    for (const item of IQ200_23) {
      ok(plain23.includes(item.sentence), `Lesson 23 IQ200 keeps sentence ${item.n}: ${item.sentence}`);
    }
    for (const item of THINKING_23) {
      ok(plain23.includes(item.item), `Lesson 23 Thinking Challenge keeps quantity: ${item.item}`);
    }
    for (const step of L23_ROADMAP) {
      ok(plain23.includes(step.en), `Lesson 23 roadmap keeps title: ${step.en}`);
    }
    ok(plain23.includes("He gave me two pieces of advice."), "Lesson 23 IQ200 keeps the one correct sentence unchanged");
    // لا انعكاس داخل أي عازل LTR: كل مقطع إنجليزي يُفحص وحده
    const runs23 = L23_SLIDES.flatMap((slide) =>
      fontEnSeq(unesc23(renderToString(React.createElement(SlideView23, { s: slide, onExit: () => {} }))))
    );
    ok(runs23.length > 300, `Lesson 23 renders many isolated English runs (${runs23.length})`);
    const REVERSED_RUNS_23 = [
      /\b(apple|orange|egg)\s+an\b/i,
      /\b(book|car|table|room|student|cat|dog|house|pen|teacher|chair|computer)\s+a\b/i,
      /\b(books|students|apples|chairs)\s+many\b/i,
      /\b(water|rice|milk|money|bread|advice|information|furniture)\s+some\b/i,
      /\b(books|students)\s+are\s+(a|an)\b/i,
      /\bbooks\s+how\s+many\b/i,
    ];
    for (const rx of REVERSED_RUNS_23) {
      const bad = runs23.filter((run) => rx.test(run));
      ok(bad.length === 0, `Lesson 23 no reversed English order inside any LTR run for ${rx} (found: ${bad.slice(0, 3).join(" | ")})`);
    }
    // الجمل الكاملة تبقى بترتيب SVO
    for (const sentence of [
      "There is a book on the desk.",
      "There are three books on the desk.",
      "How many books do you have?",
      "How much water do you drink?",
      "She gave me some advice.",
      "I have a bottle of water.",
    ]) {
      ok(runs23.some((run) => run.startsWith(sentence)), `Lesson 23 keeps the sentence as one intact LTR run: ${sentence}`);
    }
    ok(!all23.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 23 renders no GB flag emoji as branding");
  }

  // --- الدرس 23: مختبر العدّ واللوحات التفاعلية والترتيب الذهبي ---
  {
    const bySource23 = (sourceIndex) => L23_SLIDES.find((s) => s.sourceIndex === sourceIndex);

    const machineHtml = renderToString(React.createElement(SlideView23, { s: bySource23(2), onExit: () => {} }));
    ok(machineHtml.includes('data-en-seq="l23-machine"'), "Lesson 23 counting machine renders");
    for (const word of ["apple", "book", "water", "milk", "rice", "money", "information", "furniture"]) {
      ok(machineHtml.includes(word), `Lesson 23 counting machine keeps noun: ${word}`);
    }

    const testHtml = renderToString(React.createElement(SlideView23, { s: bySource23(4), onExit: () => {} }));
    ok(testHtml.includes('data-en-seq="l23-magic-test"'), "Lesson 23 one-two-three test renders");

    const thereHtml = renderToString(React.createElement(SlideView23, { s: bySource23(20), onExit: () => {} }));
    ok(thereHtml.includes('data-en-seq="l23-there-bridge"'), "Lesson 23 There is / There are switch renders");

    const kitchenHtml = renderToString(React.createElement(SlideView23, { s: bySource23(22), onExit: () => {} }));
    ok(kitchenHtml.includes('data-en-seq="l23-kitchen"'), "Lesson 23 kitchen analysis renders");

    const manyHtml = renderToString(React.createElement(SlideView23, { s: bySource23(30), onExit: () => {} }));
    ok(manyHtml.includes('data-en-seq="l23-how-many"'), "Lesson 23 How many lab renders");
    const muchHtml = renderToString(React.createElement(SlideView23, { s: bySource23(31), onExit: () => {} }));
    ok(muchHtml.includes('data-en-seq="l23-how-much"'), "Lesson 23 How much lab renders");

    const battleHtml = renderToString(React.createElement(SlideView23, { s: bySource23(33), onExit: () => {} }));
    ok(battleHtml.includes('data-en-seq="l23-battle"'), "Lesson 23 many/much gate renders");

    const infoHtml = renderToString(React.createElement(SlideView23, { s: bySource23(36), onExit: () => {} }));
    ok(infoHtml.includes('data-en-seq="l23-information"'), "Lesson 23 information unit converter renders");
    assertSeq("Lesson 23 information pieces", fontEnSeq(infoHtml), ["a piece of information", "two pieces of information", "three pieces of information"]);

    const threeHtml = renderToString(React.createElement(SlideView23, { s: bySource23(41), onExit: () => {} }));
    ok(threeHtml.includes('data-en-seq="l23-three-test"'), "Lesson 23 three-question test renders");

    const errorsHtml = renderToString(React.createElement(SlideView23, { s: bySource23(43), onExit: () => {} }));
    ok(errorsHtml.includes('data-en-seq="l23-common-errors"'), "Lesson 23 common errors board renders");
    const errorsPlain = unesc23(errorsHtml).replace(/<[^>]+>/g, " ");
    for (const wrong of ["I have a water.", "She gave me an advice.", "I need two informations.", "There are some milk in the fridge.", "How much books do you have?", "How many water do you drink?"]) {
      ok(errorsPlain.includes(wrong), `Lesson 23 common errors keeps wrong sentence: ${wrong}`);
    }

    const detHtml = renderToString(React.createElement(SlideView23, { s: bySource23(49), onExit: () => {} }));
    ok(detHtml.includes('data-en-seq="l23-detective"'), "Lesson 23 Grammar Detective renders");
    ok(detHtml.includes("تحقق من الإجابات"), "Lesson 23 Grammar Detective keeps the neutral → check button");

    const iqHtml = renderToString(React.createElement(SlideView23, { s: bySource23(50), onExit: () => {} }));
    ok(iqHtml.includes('data-en-seq="l23-iq200"'), "Lesson 23 IQ200 Challenge renders");

    const thinkHtml = renderToString(React.createElement(SlideView23, { s: bySource23(51), onExit: () => {} }));
    ok(thinkHtml.includes('data-en-seq="l23-thinking"'), "Lesson 23 Thinking Challenge renders");

    const bossHtml = renderToString(React.createElement(SlideView23, { s: bySource23(52), onExit: () => {} }));
    ok(bossHtml.includes('data-en-seq="l23-final-boss"'), "Lesson 23 Final Boss renders");
    const bossPlain = unesc23(bossHtml).replace(/<[^>]+>/g, " ");
    for (const requirement of ["There is", "There are", "a/an", "some", "Countable nouns", "Uncountable nouns", "How many?", "How much?"]) {
      ok(bossPlain.includes(requirement), `Lesson 23 Final Boss keeps requirement: ${requirement}`);
    }
    ok(bossPlain.includes("How many books are there?"), "Lesson 23 Final Boss keeps the supplied How many example question");

    const trainingSlides = L23_SLIDES.filter((s) => s.kind === "ex" && s.ex.type.startsWith("training"));
    ok(trainingSlides.length === 4, `Lesson 23 keeps the four supplied trainings (${trainingSlides.length})`);
    for (const slide of trainingSlides) {
      const html = renderToString(React.createElement(SlideView23, { s: slide, onExit: () => {} }));
      ok(html.includes("تحقق من الإجابات"), `Lesson 23 ${slide.title} keeps the neutral → check button`);
      ok(!html.includes("✓ صحيح!"), `Lesson 23 ${slide.title} reveals no feedback before checking`);
      ok(html.includes("disabled"), `Lesson 23 ${slide.title} locks options after checking`);
    }

    const goldenHtml = renderToString(React.createElement(SlideView23, { s: L23_SLIDES.find((s) => s.kind === "goldenSummary"), onExit: () => {} }));
    ok(goldenHtml.includes('data-source-section="🧠 الخلاصة الذهبية"'), "Lesson 23 golden summary slide renders its source marker");
    ok(goldenHtml.includes('data-en-seq="l23-golden"'), "Lesson 23 golden summary panel renders");
    const goldenSeq = fontEnSeq(goldenHtml);
    assertSeq("Lesson 23 golden summary countable examples", goldenSeq, GOLDEN_23_COUNTABLE_EXAMPLES);
    assertSeq("Lesson 23 golden summary uncountable words", goldenSeq, GOLDEN_23_UNCOUNTABLE_WORDS);

    const tableHtml = renderToString(React.createElement(SlideView23, { s: L23_SLIDES.find((s) => s.kind === "magicTable"), onExit: () => {} }));
    ok(tableHtml.includes('data-en-seq="l23-magic-table"'), "Lesson 23 magic table renders");
    const tableSeq = fontEnSeq(tableHtml);
    for (const column of MAGIC_TABLE_23) {
      assertSeq(`Lesson 23 magic table ${column.title}`, tableSeq, column.rows);
    }

    const rulesHtml = renderToString(React.createElement(SlideView23, { s: L23_SLIDES.find((s) => s.kind === "sevenRules"), onExit: () => {} }));
    ok(rulesHtml.includes('data-en-seq="l23-seven-rules"'), "Lesson 23 seven rules panel renders");
    ok(rulesHtml.includes("⑦"), "Lesson 23 keeps all seven rules (last marker ⑦)");
    ok(SEVEN_RULES_23.length === 7, `Lesson 23 golden rules count is 7 (${SEVEN_RULES_23.length})`);

    const roadmapHtml = renderToString(React.createElement(SlideView23, { s: L23_SLIDES.find((s) => s.kind === "roadmap"), onExit: () => {} }));
    ok(roadmapHtml.includes('data-en-seq="l23-roadmap"'), "Lesson 23 roadmap renders");
    ok(unesc23(roadmapHtml).includes("Countable & Uncountable Nouns"), "Lesson 23 roadmap highlights lesson 23 as the current step");

    const quizSlide23 = L23_SLIDES.find((s) => s.kind === "quiz");
    const quizHtml23 = renderToString(React.createElement(SlideView23, { s: quizSlide23, onExit: () => {} }));
    ok(quizHtml23.includes("Teacher’s Space"), "Lesson 23 shared quiz renders Teacher's Space section");
    ok(quizHtml23.includes("تحقق من الإجابات"), "Lesson 23 shared quiz keeps STEP 3 check button");
    ok(!quizHtml23.includes("الإجابة الصحيحة:"), "Lesson 23 quiz renders no answer key before unlocking");
    ok(quizHtml23.includes("🔒 مقفلة"), "Lesson 23 Teacher's Space starts locked");
  }

  // --- الدرس 23: الدرس كاملًا يُعرض من المكوّن الرئيسي ---
  {
    const html = renderToString(React.createElement(Lesson23, { onExit: () => {} }));
    ok(html.length > 2000, "Lesson 23 renders without throwing");
    ok(/dir="ltr"/.test(html), "Lesson 23 isolates English as LTR");
    ok(html.includes('dir="rtl"'), "Lesson 23 keeps the Arabic RTL shell");
    ok(html.includes("THE COUNTING LAB"), "Lesson 23 cover shows THE COUNTING LAB identity");
    ok(!html.includes(String.fromCodePoint(0x1f1ec, 0x1f1e7)), "Lesson 23 full lesson renders no GB flag emoji");
    ok(!/Englishwith[sS]ommer/.test(html), "Lesson 23 keeps the EnglishwithSomeR branding");
  }

} catch (err) {
  ok(false, err.stack || String(err));
} finally {
  try {
    rmSync(outFile, { force: true });
  } catch {
    /* ignore */
  }
}

if (failures.length) {
  console.error(`✕ Render audit FAILED (${failures.length}/${checks})`);
  process.exit(1);
}
console.log(`✓ Render audit passed (${checks} assertions): Subject → Verb → Object, I → am → a → student.`);
