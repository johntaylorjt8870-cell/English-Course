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
export { React, renderToString, Lesson1, Lesson4, Lesson13, FormulaBoard, SlideView, L13_SLIDES, Lesson14, FormulaBoard14, SlideView14, L14_SLIDES, LatinRuns, Lesson17, SlideView17, L17_SLIDES, Lesson18, SlideView18, L18_SLIDES, Lesson19, SlideView19, L19_SLIDES };
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
  const { React, renderToString, Lesson1, Lesson4, Lesson13, FormulaBoard, SlideView, L13_SLIDES, Lesson14, FormulaBoard14, SlideView14, L14_SLIDES, LatinRuns, Lesson17, SlideView17, L17_SLIDES, Lesson18, SlideView18, L18_SLIDES, Lesson19, SlideView19, L19_SLIDES } = await import(pathToFileURL(outFile).href);

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
