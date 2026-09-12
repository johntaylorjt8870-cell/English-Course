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
    const t = (m[1] || m[2] || "").replace(/\s+/g, " ").trim();
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
import { LatinRuns } from ${JSON.stringify(join(root, "src/shared/bidi.tsx"))};
export { React, renderToString, Lesson1, Lesson4, LatinRuns };
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
  const { React, renderToString, Lesson1, Lesson4, LatinRuns } = await import(pathToFileURL(outFile).href);

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
