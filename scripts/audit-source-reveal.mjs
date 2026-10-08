// ============================================================
// Source-reveal audit — لا لوحة «نص المصدر الحرفي — اضغط للعرض» في واجهة الطالب
//
// القاعدة المعتمدة في هذه المرحلة:
//   • المحذوف هو عنصر الكشف الذي يفتحه الطالب بالضغط لعرض نص المصدر الحرفي
//     (كان في الدرس 32: SourceReveal32 + «نص المصدر الحرفي — اضغط للعرض»)،
//     ولا يُستبدل بأي مكافئ: زر، <details>/<summary>، «اعرض النص الأصلي»،
//     «Show source»، «View textbook text»، «Reveal original»…
//   • أسطر المصدر الحرفية المقرونة بالمحاولة (شارة «📜 من المصدر» في 27 و29،
//     ورقعات data-reveal-block في 28 و30 و31) محتوى كتابي محفوظ لا يُحذف:
//     تظهر تلقائيًا بعد إتمام الطالب المحاولة، وليست عنصر فتح بالضغط، فهي
//     جزء من «التفاعل كشرح» ومن فيدلية المصدر. التدقيق هنا يثبت أمرين:
//     (أ) لا لوحة كشف بالضغط، (ب) الأسطر باقية ومقرونة بالمحاولة.
//   • يبقى ما يلي سليمًا ولا يُحذف:
//       - دفتر المصدر (ledger) وربط الأقسام (SOURCE_SECTIONS / SECTIONS_32)
//         وشارة التتبّع «data-source-section» في إطار الدرس.
//       - وثائق التدقيق (docs/lesson32-source-audit.md · docs/lesson32-coverage.md).
//       - فهرس المصدر المخصّص للمعلم وحده داخل منطقة المعلم (<details>).
//
//   node scripts/audit-source-reveal.mjs
// ============================================================
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
};

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const srcFiles = [...walk(join(root, "src/lessons")), ...walk(join(root, "src/shared"))].filter((f) => /\.(tsx?|css)$/.test(f));
const read = (f) => readFileSync(f, "utf8");
const rel = (f) => relative(root, f);

// ---------------- 1) صيغ كشف المصدر ممنوعة في كل الشيفرة ----------------
const banned = [
  [/نص\s+المصدر\s+الحرفي/, "نص المصدر الحرفي"],
  [/اضغط\s+للعرض/, "اضغط للعرض"],
  [/أظهر\s+النص\s+الأصلي/, "أظهر النص الأصلي"],
  [/اعرض\s+النص\s+الأصلي/, "اعرض النص الأصلي"],
  [/SourceReveal32/, "المكوّن SourceReveal32"],
  [/data-reveal-source|data-source-reveal/, "سمة كشف مصدر"],
  [/source-reveal/, "معرّف source-reveal"],
  [/show\s+source|reveal\s+original|show\s+literal\s+source|view\s+textbook\s+text|show\s+the\s+source/i, "صيغة إنجليزية لكشف المصدر"],
];
for (const [re, label] of banned) {
  const hits = srcFiles.filter((f) => re.test(read(f))).map(rel);
  ok(hits.length === 0, `لا وجود لـ«${label}» في الشيفرة (${hits.join(", ") || "نظيف"})`);
}

// وسام المصدر «📜 من المصدر»: وسم فيدلية على سطر مصدر حرفي مقرون بالمحاولة.
// المسموح: ملفا الدرسين اللذين فيهما أسطر مصدر (27 · 29) وkit32 كوسم مقترن
// بـ«ليس من المصدر». الممنوع: أن يتحوّل الوسم إلى عنصر يُفتَح بالضغط.
{
  const badgeFiles = srcFiles.filter((f) => /📜\s*من\s+المصدر/.test(read(f))).map(rel).sort();
  const allowed = ["src/lessons/lesson27/Lesson27.tsx", "src/lessons/lesson29/Lesson29.tsx", "src/lessons/lesson32/kit32.tsx"].sort();
  ok(badgeFiles.join(",") === allowed.join(","), `وسم المصدر محصور في ملفات أسطر المصدر (${badgeFiles.join(", ") || "لا شيء"})`);
  for (const f of ["src/lessons/lesson27/Lesson27.tsx", "src/lessons/lesson29/Lesson29.tsx"]) {
    const comp = /function SourceReveal\(\{ text \}: \{ text: string \}\) \{([\s\S]*?)\n\}/.exec(read(join(root, f)));
    ok(!!comp, `${f}: مكوّن سطر المصدر محفوظ (محتوى الكتاب)`);
    if (comp) {
      ok(!/<button|<details|<summary|onClick|useState/.test(comp[1]), `${f}: سطر المصدر محتوى ساكن — لا زر ولا onClick ولا حالة فتح`);
      ok(/📜\s*من\s+المصدر/.test(comp[1]), `${f}: سطر المصدر يحمل وسم الفيدلية`);
    }
  }
  const kit = read(join(root, "src/lessons/lesson32/kit32.tsx"));
  const badges = (kit.match(/📜\s*من\s+المصدر/g) || []).length;
  const paired = (kit.match(/ليس\s*من\s+المصدر/g) || []).length;
  ok(badges > 0 && badges === paired, `kit32: وسم المصدر مقترن بوسم المنصة المقابل (${badges} / ${paired})`);
}

// ---------------- 2) <details>/<summary> للمصدر في واجهة المعلم وحدها --------
{
  const lessonFiles = walk(join(root, "src/lessons")).filter((f) => /\.tsx$/.test(f));
  const teacherFiles = lessonFiles.filter((f) => /TeacherArea\d+\.tsx$/.test(f));
  const studentFiles = lessonFiles.filter((f) => !/TeacherArea\d+\.tsx$/.test(f));
  const studentHits = studentFiles.filter((f) => /<details|<summary/.test(read(f))).map(rel);
  ok(studentHits.length === 0, `لا <details>/<summary> في ملفات الطالب (${studentHits.join(", ") || "نظيف"})`);
  const teacherIndex = teacherFiles.filter((f) => /<details/.test(read(f))).map(rel);
  ok(teacherIndex.length >= 1, `فهرس المصدر المخصّص للمعلم موجود داخل منطقة المعلم (${teacherIndex.join(", ")})`);
  ok(read(join(root, "src/lessons/lesson32/TeacherArea32.tsx")).includes("SOURCE_SECTIONS"), "فهرس المعلم يقرأ من دفتر المصدر (SOURCE_SECTIONS)");
}

// ------- 3) لوحة «اضغط للعرض» محذوفة، وأسطر المصدر نفسها محفوظة -------
{
  const l27 = read(join(root, "src/lessons/lesson27/Lesson27.tsx"));
  const l29 = read(join(root, "src/lessons/lesson29/Lesson29.tsx"));
  const l32kit = read(join(root, "src/lessons/lesson32/kit32.tsx"));
  const l32steps = read(join(root, "src/lessons/lesson32/Steps32.tsx"));
  ok(!/SourceReveal32/.test(l32kit) && !/data-reveal-block/.test(l32kit), "الدرس 32: مكوّن كشف المصدر محذوف من kit32");
  ok(!/SourceReveal32/.test(l32steps) && !/data-reveal-block/.test(l32steps), "الدرس 32: مكوّن كشف المصدر محذوف من الخطوات");
  ok(!/ledger32/.test(l32kit), "الدرس 32: kit32 لم يعد يستورد دفتر المصدر للعرض الطلابي");
  // أسطر المصدر الحرفية في 27 و29 هي محتوى الكتاب: تُحذف اللوحة ولا يُحذف المحتوى
  const s27 = (l27.match(/<SourceReveal /g) || []).length;
  const s29 = (l29.match(/<SourceReveal /g) || []).length;
  ok(s27 === 10, `الدرس 27: أسطر المصدر الحرفية العشرة محفوظة (${s27})`);
  ok(s29 === 7, `الدرس 29: أسطر المصدر الحرفية السبعة محفوظة (${s29})`);
  ok(/data-reveal-block/.test(l27), "الدرس 27: رقعة سطر المصدر موسومة data-reveal-block");
  ok(/إجابات المصدر:|المصدر:|القصة من المصدر/.test(l27), "الدرس 27: نصوص أسطر المصدر الحرفية باقية");
  ok(/U29\("s36"\)|U29\("s38"\)|U29\("s39"\)|U29\("s43"\)/.test(l29), "الدرس 29: أسطر المصدر ما زالت تُقرأ من فهرس المصدر (U29)");
  for (const [n, body] of [[27, l27], [29, l29]]) {
    ok(!/اضغط\s+للعرض|نص\s+المصدر\s+الحرفي/.test(body), `الدرس ${n}: لا لوحة «اضغط للعرض» لنص المصدر`);
    ok(!/<details|<summary/.test(body), `الدرس ${n}: لا collapsible لكشف نص المصدر`);
  }
}

// ------- 3ب) سلوكيًا: أسطر المصدر المحفوظة لا تظهر قبل المحاولة (الدرس 29) -------
// الحذف/الحفظ يُقاسان على الشيفرة أعلاه؛ أما القرْن بالمحاولة فيُقاس على الرسم:
// نمشي خطوات الدرس 29 كلها بلا أي إجابة، فلا يجوز أن يظهر وسم مصدر واحد.
{
  const { createRequire } = await import("node:module");
  const { rmSync, mkdirSync } = await import("node:fs");
  const { pathToFileURL } = await import("node:url");
  const req = createRequire(import.meta.url);
  const esbuild = req("esbuild");
  const { JSDOM } = req("jsdom");
  const dom = new JSDOM('<!doctype html><html dir="rtl" lang="ar"><body></body></html>', { url: "http://localhost/", pretendToBeVisual: true });
  const win = dom.window;
  for (const [k, v] of [["window", win], ["document", win.document], ["navigator", win.navigator]]) {
    Object.defineProperty(globalThis, k, { value: v, configurable: true });
  }
  for (const key of ["Element", "HTMLElement", "HTMLInputElement", "HTMLButtonElement", "Node", "getComputedStyle", "CSS", "Event", "MouseEvent"]) {
    if (win[key] !== undefined) Object.defineProperty(globalThis, key, { value: win[key], configurable: true });
  }
  if (!win.Element.prototype.scrollTo) win.Element.prototype.scrollTo = () => {};
  const dir = join(root, "node_modules", ".source-reveal-audit");
  mkdirSync(dir, { recursive: true });
  const outFile = join(dir, `l29-${process.pid}.mjs`);
  await esbuild.build({
    absWorkingDir: root,
    stdin: {
      contents: `
import React from "react";
import { createRoot } from "react-dom/client";
import Lesson29 from ${JSON.stringify(join(root, "src/lessons/lesson29/Lesson29.tsx"))};
function mount(node) { const el = document.createElement("div"); document.body.appendChild(el); createRoot(el).render(node); return el; }
export { React as React_, Lesson29, mount };
`,
      resolveDir: root,
      loader: "tsx",
    },
    bundle: true, platform: "node", format: "esm", outfile: outFile, jsx: "automatic", packages: "external", logLevel: "silent",
  });
  const m = await import(pathToFileURL(outFile).href);
  rmSync(outFile, { force: true });
  const tick = (ms = 25) => new Promise((r) => setTimeout(r, ms));
  const click = (node) => node.dispatchEvent(new win.MouseEvent("click", { bubbles: true, cancelable: true }));
  const el = m.mount(m.React_.createElement(m.Lesson29, { onExit: () => {} }));
  await tick(60);
  const rail = [...el.querySelectorAll('nav[aria-label="خطوات الدرس 29"] button')];
  ok(rail.length === 48, `الدرس 29: فهرس الخطوات يعرض 48 خطوة (${rail.length})`);
  let leaked = 0;
  let panels = 0;
  for (const b of rail) {
    click(b);
    await tick(18);
    const html = (el.querySelector('[data-area="student-lesson"]') || el).innerHTML;
    if (/📜\s*من\s+المصدر/.test(html)) leaked++;
    if (/اضغط للعرض|نص المصدر الحرفي|<details|<summary/.test(html)) panels++;
  }
  ok(leaked === 0, `الدرس 29: لا سطر مصدر يظهر قبل المحاولة في أي خطوة (${leaked} تسريب)`);
  ok(panels === 0, `الدرس 29: لا لوحة كشف لنص المصدر في أي خطوة (${panels})`);
}

// ---------------- 4) رقعات الكشف التربوية داخل الخطوة باقية ----------------
// هذه إجابات/ملخصات الخطوة بعد إتمام المحاولة — تدقّقها ملفات التدقيق الخاصة.
for (const [n, seqs] of [
  [28, ["ex30", "ex39", "iqfinal"]],
  [30, ["l30-reveal-s1", "l30-reveal-final"]],
  [31, ["l31-reveal-s1", "l31-reveal-s45"]],
]) {
  const file = read(join(root, `src/lessons/lesson${n}/Lesson${n}.tsx`));
  ok(file.includes("data-reveal-block") && file.includes("SourceReveal"), `الدرس ${n}: رقعة كشف إجابات الخطوة باقية (بعد إتمام المحاولة)`);
  for (const seq of seqs) ok(file.includes(`seq="${seq}"`), `الدرس ${n}: رقعة «${seq}» باقية`);
}

// ---------------- 5) دفتر المصدر وربط الأقسام والوثائق سليمة ----------------
{
  const ledger = read(join(root, "src/lessons/lesson32/ledger32.ts"));
  const data32 = read(join(root, "src/lessons/lesson32/data.ts"));
  const kit = read(join(root, "src/shared/lessonKit.tsx"));
  ok(/SOURCE_LEDGER_COUNT_32/.test(ledger), "دفتر مصدر الدرس 32 موجود ويعدّ أقسامه");
  const SOURCE_NUMBERED = Number((ledger.match(/SOURCE_NUMBERED_COUNT_32\s*=\s*(\d+)/) || [])[1]);
  // عدد المدخلات في SOURCE_SECTIONS (كل مدخل كائن يبدأ بسطر «  {»)
  const entries = (ledger.match(/^\s{2}\{/gm) || []).length;
  ok(entries === 40, `دفتر مصدر الدرس 32 يحفظ 40 قسمًا (${entries})`);
  ok(SOURCE_NUMBERED === 36, `دفتر المصدر يوسم 36 قسمًا مرقّمًا (${SOURCE_NUMBERED})`);
  ok(/SECTIONS_32/.test(data32) && /source:\s*\[/.test(data32), "ربط أقسام المصدر بخطوات الدرس 32 باقٍ (SECTIONS_32 + source في كل خطوة)");
  ok(/sourceTag/.test(kit) && /data-source-section/.test(kit), "شارة تتبّع القسم المصدري باقية في إطار الدرس المشترك");
  for (const doc of ["docs/lesson32-source-audit.md", "docs/lesson32-coverage.md", "docs/english-direction.md"]) {
    ok(read(join(root, doc)).length > 200, `وثيقة «${doc}» باقية`);
  }
  const audit32 = read(join(root, "scripts/audit-lesson32.mjs"));
  ok(/SOURCE_LEDGER_COUNT_32|SOURCE_SECTIONS/.test(audit32), "تدقيق الدرس 32 ما زال يتحقق من مطابقة دفتر المصدر");
  ok(/REVEAL_BANNED/.test(audit32), "تدقيق الدرس 32 يمنع كشف المصدر في كل خطوة");
  // مصادر الدروس 27/28/29/30/31 لم تُحذف
  for (const n of [27, 28, 29, 30, 31]) {
    const data = read(join(root, `src/lessons/lesson${n}/data.ts`));
    ok(/SOURCE_SECTIONS|SOURCE_NUMBERED_COUNT/.test(data), `الدرس ${n}: بيانات المصدر وربط الأقسام باقية`);
  }
}

// ---------------- 6) الربط في سكربتات الأوامر ----------------
{
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  ok((pkg.scripts["audit:english-direction"] || "").includes("scripts/audit-source-reveal.mjs"), "scripts: تدقيق كشف المصدر موصول بـ audit:english-direction");
}

if (failures.length) {
  console.error(`✕ Source-reveal audit FAILED (${failures.length}/${checks})\n` + failures.map((x) => `  - ${x}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Source-reveal audit passed (${checks} checks): لا لوحة «نص المصدر الحرفي — اضغط للعرض» ولا أي مكافئ لها، وأسطر المصدر المقرونة بالمحاولة محفوظة، ودفتر المصدر والوثائق وفهرس المعلم سليمة.`);
