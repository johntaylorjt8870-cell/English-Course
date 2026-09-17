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
import { rmSync } from "node:fs";
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
import Lesson13, { FormulaBoard, SlideView } from ${JSON.stringify(join(root, "src/lessons/lesson13/Lesson13.tsx"))};
import { SLIDES as L13_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson13/data.ts"))};
import Lesson14, { FormulaBoard14, SlideView14 } from ${JSON.stringify(join(root, "src/lessons/lesson14/Lesson14.tsx"))};
import { SLIDES as L14_SLIDES } from ${JSON.stringify(join(root, "src/lessons/lesson14/data.ts"))};
import { LatinRuns } from ${JSON.stringify(join(root, "src/shared/bidi.tsx"))};
export { React, renderToString, Lesson1, Lesson4, Lesson13, FormulaBoard, SlideView, L13_SLIDES, Lesson14, FormulaBoard14, SlideView14, L14_SLIDES, LatinRuns };
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
  const { React, renderToString, Lesson1, Lesson4, Lesson13, FormulaBoard, SlideView, L13_SLIDES, Lesson14, FormulaBoard14, SlideView14, L14_SLIDES, LatinRuns } = await import(pathToFileURL(outFile).href);

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
