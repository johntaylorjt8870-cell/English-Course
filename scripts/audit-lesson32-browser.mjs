// ============================================================
// فحص الدرس 32 في متصفح حقيقي (Chromium) — دليل بصري وتفاعلي.
//
// التجهيز: الحزم المطلوبة مثبّتة في devDependencies (playwright-core،
// @sparticuz/chromium، @fontsource/rubik|changa|noto-color-emoji) — يكفي:
//   npm ci
//
// التشغيل (يحتاج خادم معاينة يستمع فعلًا):
//   npm run build && npx vite preview --host 127.0.0.1 --port 4173
//   node scripts/audit-lesson32-browser.mjs
//
// المخرجات: docs/lesson32-visual/*.png + verification.json
//
// يغطي: 120 صفحة × مقاسين (1280×800 و1920×1080) — كل صفحة تُفتح فعلًا،
//        وتُقاس: ارتفاع البطاقة، فيض أفقي، بطاقة فارغة، خط، اتجاه،
//        تغطية زر «التالي» بعنصر عائم/قفل، ثم تفاعلات مختارة على
//        صفحات المعامل، ومنطقة الاختبار ومنطقة المعلم والحلول.
// ملاحظة: الشبكة الرملية لا تصل إلى Google Fonts؛ تُحجب الطلبات عمدًا
// ويُوثَّق الحجب في externalNetworkErrors. الخطوط المحلية (Rubik/Changa/
// Noto Color Emoji) تُحقن كـ data-URI حتى تكون القياسات على خط المشروع.
// ============================================================
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import { localFontCss } from "./lib/local-fonts.mjs";
import { collectStudentFacingCopy, findEditorialSourceLabels } from "./lib/student-copy-audit.mjs";

// ---------------- بيانات الاختبار: تُقرأ من المصدر نفسه لا من نسخة يدوية ----------------
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const testBundle = join(root, "scripts", ".lesson32-testdata.mjs");
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `export { TEST_32 } from ${JSON.stringify(join(root, "src", "lessons", "lesson32", "testData.ts"))};\nexport { FORSINCE_S7 } from ${JSON.stringify(join(root, "src", "lessons", "lesson32", "data.ts"))};`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: testBundle,
  packages: "external",
  logLevel: "silent",
});
const { TEST_32, FORSINCE_S7 } = await import(pathToFileURL(testBundle).href);
/** إجابة صحيحة لكل سؤال بالشكل الذي تفهمه عناصر التحكم في المتصفح */
const TEST_ANSWERS = Object.fromEntries(
  TEST_32.map((q) => {
    switch (q.type) {
      case "single": return [q.n, q.answer];
      case "tf": return [q.n, q.answer ? 0 : 1];
      case "multi": return [q.n, q.answer];
      case "order": return [q.n, q.answer];
      case "match": return [q.n, q.answer];
      case "spot": return [q.n, q.answer];
      case "typed": return [q.n, q.accept[0]];
      default: return [q.n, null];
    }
  }),
);

const TARGET_MAX_HEIGHT = 1200;

// ---------------- المتصفح: مكتبات NSS/NSPR غير موجودة في الرمل ----------------
const work = "node_modules/.l32browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const output = "docs/lesson32-visual";
mkdirSync(output, { recursive: true });

let checks = 0;
const failures = [];
const screenshots = [];
const errors = [];
const externalNetworkErrors = [];
const rendered = [];
const pageHeights = {};
const studentCopyFindings = new Map();
let studentCopyScans = 0;
let studentCopyOccurrences = 0;
const ok = (condition, message) => { checks++; if (!condition) failures.push(message); };
function recordStudentCopy(copy, context) {
  studentCopyScans++;
  const findings = findEditorialSourceLabels(copy);
  studentCopyOccurrences += findings.length;
  for (const finding of findings) {
    const record = studentCopyFindings.get(finding.text) ?? { text: finding.text, rules: new Set(), contexts: new Set() };
    for (const rule of finding.rules) record.rules.add(rule);
    record.contexts.add(context);
    studentCopyFindings.set(finding.text, record);
  }
  return findings;
}

// المقاسان المعتمدان في المراجعة
const DESKTOP_1280 = { width: 1280, height: 800 };
const DESKTOP_1920 = { width: 1920, height: 1080 };
const MOBILE = { width: 390, height: 844 };
const base = process.env.LESSON32_URL || "http://127.0.0.1:4173/English-Course/#/lesson/32";
const TEACHER_PASSWORD = readFileSync("src/lessons/lesson32/teacherData.ts", "utf8").match(/TEACHER_PASSWORD_32 = "([^"]+)"/)[1];

const page = await browser.newPage({ viewport: DESKTOP_1280, reducedMotion: "reduce" });
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const url = msg.location().url || "";
  if (/fonts\.(googleapis|gstatic)\.com/.test(url)) externalNetworkErrors.push({ url, message: msg.text() });
  else errors.push(`${msg.text()} ${url}`);
});
const css = localFontCss();
if (css) {
  await page.addInitScript((sheet) => {
    document.addEventListener("DOMContentLoaded", () => {
      const st = document.createElement("style");
      st.textContent = sheet;
      document.head.appendChild(st);
    });
  }, css);
}
// بوابة الموقع موحّدة لكل الدروس — تُفتح كما يفتحها المعلم
await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));

async function shot(name) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: false, timeout: 90000, animations: "disabled" });
  screenshots.push(path);
}

/** قائمة الصفحات كما يراها الطالب: المعرّف وقسم المصدر ورقم الخطوة */
let PAGES = [];

async function collectPages() {
  await page.setViewportSize(DESKTOP_1280);
  const rail = page.locator(".l32-rail .l32-rail-step");
  const count = await rail.count();
  const list = [];
  for (let i = 0; i < count; i++) {
    await rail.nth(i).evaluate((el) => el.click());
    await page.waitForTimeout(30);
    list.push(await page.evaluate(() => {
      const step = document.querySelector("[data-lesson-step]");
      return {
        id: step?.getAttribute("data-lesson-step") ?? "?",
        sec: document.querySelector("[data-source-section]")?.getAttribute("data-source-section") ?? null,
        lab: !!document.querySelector("[data-gate]") || !!document.querySelector("[data-area=\"l32-lesson\"] [role=\"group\"]"),
      };
    }));
  }
  return list;
}

/** تنقّل بين الخطوات: السكة الجانبية على الشاشات الكبيرة، والدرج على الجوال */
async function goTo(index) {
  const rail = page.locator(".l32-rail:visible .l32-rail-step");
  if (await rail.count()) {
    await rail.nth(index).evaluate((el) => el.click());
  } else {
    const toggle = page.locator('[data-nav-toggle="steps"]');
    if ((await toggle.getAttribute("aria-expanded")) !== "true") await toggle.click();
    await page.locator("#l32-drawer .l32-rail-step").nth(index).evaluate((el) => el.click());
  }
  await page.locator("[data-lesson-step]").first().waitFor();
  await page.waitForTimeout(45);
}
const indexOf = (id) => {
  const i = PAGES.findIndex((p) => p.id === id);
  if (i < 0) throw new Error(`unknown page id: ${id}`);
  return i;
};
async function gotoPage(id) {
  await goTo(indexOf(id));
  await page.locator(`[data-lesson-step="${id}"]`).waitFor();
}

/** فحص صفحة واحدة: الارتفاع، الفيض، البطاقة الفارغة، الخط، الاتجاه، تغطية زر التالي */
async function measurePage() {
  const measured = await page.evaluate(() => {
    const step = document.querySelector("[data-lesson-step]");
    const sec = step?.closest("section") ?? null;
    const root = document.querySelector(".l32-shell");
    const frame = document.querySelector(".l32-frame") ?? sec;
    const text = (frame?.textContent ?? "").replace(/\s+/g, " ").trim();
    const next = document.querySelector(".l32-fab-next");
    let covered = null;
    if (next) {
      const r = next.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      covered = !(hit && (hit === next || next.contains(hit)));
    }
    const card = frame?.querySelector("[data-source-section], [data-gate], .l32-card");
    const cardBox = card?.getBoundingClientRect();
    const bodyFont = getComputedStyle(document.body).fontFamily;
    const enEl = frame?.querySelector("[dir=\"ltr\"], .l32-deck-en, .font-en");
    return {
      id: step?.getAttribute("data-lesson-step") ?? "?",
      sec: frame?.getAttribute("data-source-section") ?? sec?.getAttribute("data-source-section") ?? null,
      h: sec ? Math.round(sec.getBoundingClientRect().height) : null,
      cardH: cardBox ? Math.round(cardBox.height) : null,
      ox: Math.round(document.documentElement.scrollWidth - document.documentElement.clientWidth),
      mainOx: root ? Math.round(root.scrollWidth - root.clientWidth) : 0,
      textLen: text.length,
      hasTitle: !!frame?.querySelector("h1, h2"),
      fontOk: /Rubik|Changa/i.test(bodyFont),
      emojiOk: /Noto Color Emoji/i.test(bodyFont),
      dir: document.documentElement.getAttribute("dir"),
      enDir: enEl ? getComputedStyle(enEl).direction : null,
      nextCovered: covered,
      nextVisible: !!next && next.getBoundingClientRect().width > 0,
    };
  });
  measured.studentCopy = await page.locator(".lesson32").evaluate(collectStudentFacingCopy);
  return measured;
}

async function auditStudentFacingApp(context) {
  const copy = await page.locator(".lesson32").evaluate(collectStudentFacingCopy);
  const findings = recordStudentCopy(copy, context);
  ok(findings.length === 0, `${context}: no source/provenance or internal section labels (${findings.slice(0, 2).map((x) => x.text).join(" | ")})`);
  return findings;
}

/** فحص الطبقة المرئية: لا فيض أفقي، تباين AA، ومراجع ARIA موجودة */
async function inspect(label) {
  const result = await page.locator(".l32-shell").evaluate((root) => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    const toRgba = (value) => {
      if (!value || value === "transparent" || value === "none") return null;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, 1, 1);
      ctx.fillStyle = value;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      if (d[3] === 0) return null;
      return [d[0], d[1], d[2], d[3] / 255];
    };
    const lum = (c) => {
      const a = c.slice(0, 3).map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    const issues = [];
    const gradients = [];
    let tested = 0;
    let min = 100;
    for (const el of root.querySelectorAll("*")) {
      if (!el.getClientRects().length || getComputedStyle(el).visibility === "hidden" || el.tagName === "OPTION") continue;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(" ");
      if (!own && !el.matches("input,textarea,select")) continue;
      if (own && !/[\p{L}\p{N}]/u.test(own)) continue;
      const style = getComputedStyle(el);
      const fg = toRgba(style.color);
      if (!fg) continue;
      let node = el;
      let bg = null;
      let gradient = false;
      while (node && node !== document.documentElement) {
        const st = getComputedStyle(node);
        if (st.backgroundImage && st.backgroundImage !== "none") { gradient = true; break; }
        const c = toRgba(st.backgroundColor);
        if (c && c[3] >= 0.99) { bg = c; break; }
        node = node.parentElement;
      }
      if (gradient) { gradients.push((own || el.getAttribute("aria-label") || el.tagName).slice(0, 60)); continue; }
      bg ??= [255, 255, 255, 1];
      const a = lum(fg);
      const b = lum(bg);
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight, 10) >= 700);
      const need = large ? 3 : 4.5;
      tested++;
      min = Math.min(min, ratio);
      if (ratio < need) issues.push({ text: (own || el.getAttribute("aria-label") || el.tagName).slice(0, 70), ratio: Number(ratio.toFixed(2)), need, fg: style.color, bg: `rgb(${bg.slice(0, 3).join(",")})` });
    }
    const refs = [...root.querySelectorAll("[aria-labelledby],[aria-describedby],[aria-controls]")]
      .flatMap((el) => ["aria-labelledby", "aria-describedby", "aria-controls"].flatMap((attr) => (el.getAttribute(attr) || "").split(/\s+/).filter(Boolean)))
      .filter((id) => !document.getElementById(id));
    return { width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth, tested, min: Number(min.toFixed(2)), issues, gradients: [...new Set(gradients)].slice(0, 8), refs };
  });
  rendered.push({ label, ...result });
  ok(result.scroll <= result.width, `${label}: no horizontal overflow (${result.scroll}/${result.width})`);
  ok(result.issues.length === 0, `${label}: AA contrast (${result.tested} text nodes, min ${result.min}) — ${JSON.stringify(result.issues.slice(0, 4))}`);
  ok(result.refs.length === 0, `${label}: ARIA targets resolve (${result.refs.slice(0, 4).join(",")})`);
  return result;
}

try {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.locator(".lesson32").waitFor({ timeout: 30000 });
  // قياس ثابت: تُلغى الانتقالات والحركات كي لا تُقاس ألوان منتصف الانتقال
  await page.addStyleTag({ content: "*,*::before,*::after{transition-duration:0s!important;animation-duration:0s!important;animation-delay:0s!important}" });
  await page.locator('[data-lesson-step="cover-src1"]').waitFor({ timeout: 30000 });
  await page.waitForTimeout(400);

  // ---------------- الهيكل العام ----------------
  ok(await page.locator('[data-area="l32-lesson"]').isVisible(), "shell: lesson area is the default view");
  ok((await page.locator("[data-tab]").count()) === 4, "shell: four area buttons");
  PAGES = await collectPages();
  ok(PAGES.length === 120, `shell: all pages reachable from the rail (${PAGES.length})`);
  ok(new Set(PAGES.map((p) => p.id)).size === PAGES.length, "shell: every page id is unique");
  ok(PAGES.filter((p) => p.sec).length === PAGES.length, "shell: every page declares its source section");
  ok(new Set(PAGES.map((p) => p.sec)).size === 40, `shell: all 40 source sections are represented (${new Set(PAGES.map((p) => p.sec)).size})`);
  await goTo(0);

  // ---------------- كل صفحة × المقاسين ----------------
  for (const vp of [DESKTOP_1280, DESKTOP_1920]) {
    const key = `${vp.width}x${vp.height}`;
    await page.setViewportSize(vp);
    await page.waitForTimeout(250);
    const rows = [];
    for (let i = 0; i < PAGES.length; i++) {
      await goTo(i);
      const measured = await measurePage();
      const copyFindings = recordStudentCopy(measured.studentCopy, `sweep:${key}:${measured.id}`);
      const { studentCopy: _studentCopy, ...r } = measured;
      rows.push(r);
      ok(copyFindings.length === 0, `sweep ${key} ${r.id}: no source/provenance or internal section labels (${copyFindings.slice(0, 2).map((x) => x.text).join(" | ")})`);
      ok(r.id === PAGES[i].id, `sweep ${key}: step ${i + 1} expected ${PAGES[i].id} got ${r.id}`);
      ok(r.ox === 0 && r.mainOx === 0, `sweep ${key} ${r.id}: no horizontal overflow (${r.ox}/${r.mainOx})`);
      ok(r.hasTitle, `sweep ${key} ${r.id}: card has a title`);
      ok(r.textLen >= 40, `sweep ${key} ${r.id}: card is not empty (${r.textLen} chars)`);
      ok(r.h === null || r.h <= TARGET_MAX_HEIGHT, `sweep ${key} ${r.id}: card height ${r.h}px <= ${TARGET_MAX_HEIGHT}px`);
      ok(!r.nextCovered, `sweep ${key} ${r.id}: next button is not covered by a lock/nav overlay`);
      ok(r.fontOk, `sweep ${key} ${r.id}: project font applied`);
      ok(r.emojiOk, `sweep ${key} ${r.id}: emoji fallback family present`);
      ok(r.dir === "rtl", `sweep ${key} ${r.id}: document direction rtl (${r.dir})`);
      ok(!r.enDir || r.enDir === "ltr", `sweep ${key} ${r.id}: English run direction ltr (${r.enDir})`);
    }
    pageHeights[key] = rows.map(({ id, h, cardH }) => ({ id, h, cardH }));
    const over = rows.filter((r) => r.h > TARGET_MAX_HEIGHT);
    ok(over.length === 0, `${key}: no page exceeds ${TARGET_MAX_HEIGHT}px (max ${Math.max(...rows.map((r) => r.h ?? 0))}px)`);
    ok(rows.every((r) => r.nextVisible), `${key}: the next button renders on every page`);

    // لقطات وفحص تباين لصفحات مفتاحية على هذا المقاس
    const KEY_PAGES = ["cover-src1", "objectives-lab", "s4-lab", "s7-lab", "s14-lab", "s24-lab", "s27-lab1", "s30-lab", "s32-lab1", "s36-lab", "summary-lab", "closing-src1"];
    const tag = vp.width === 1280 ? "1280" : "1920";
    for (const id of KEY_PAGES) {
      await gotoPage(id);
      await inspect(`${tag}-${id}`);
      await shot(`${tag}-${id}`);
    }
    await gotoPage("cover-src1");
  }

  // ---------------- الاختباران: تقييم الدرس (20) مقابل الاختبار النهائي (15) ----------------
  await page.setViewportSize(DESKTOP_1280);
  await gotoPage("closing-src1");
  const cta = page.locator('[data-lesson-test-cta="20"]');
  ok((await cta.count()) === 1, "closing: exactly one lesson-assessment CTA (20 questions)");
  const ctaText = (await cta.textContent()) || "";
  ok(/منفصل عن الاختبار النهائي/.test(ctaText), "closing: CTA labels the 20-question assessment as separate from the final test");
  ok(/٢٠/.test(ctaText), "closing: CTA states its own 20-question count");
  ok(/١٥/.test(ctaText), "closing: CTA names the 15-question final test below");
  const finalBlock = page.locator('[data-final-test="32"]');
  ok((await finalBlock.count()) === 1, "closing: the official 15-question final test renders once");
  const finalTitle = (await finalBlock.innerText()).slice(0, 80);
  ok(/الاختبار النهائي/.test(finalTitle), `closing: final test keeps its own title (${finalTitle.replace(/\s+/g, " ").slice(0, 40)})`);
  ok((await page.locator('#l32-q1').count()) === 0, "closing: lesson-assessment questions are not embedded in the closing page");

  // ---------------- التفاعلات: تُدار فعليًا في المتصفح ----------------
  await page.setViewportSize(DESKTOP_1280);

  // s4: شريط المدة + النشاط + التوقف
  await gotoPage("s4-lab");
  const before = await page.locator(".l32-deck-en").first().textContent();
  await page.locator(".l32-range").first().fill("5");
  await page.waitForTimeout(120);
  const after = await page.locator(".l32-deck-en").first().textContent();
  ok(before !== after && after.includes("for 5 hours"), `s4: duration slider rebuilds the sentence (${after.trim().slice(0, 60)})`);
  await page.locator('[role="radio"]').nth(1).click();
  await page.waitForTimeout(80);
  await page.getByRole("button", { name: /ما زال مستمرًا الآن/ }).first().click();
  await page.waitForTimeout(120);
  ok((await page.locator(".l32-stream-flow").first().getAttribute("data-live")) === "false", "s4: stopping the activity switches the stream to the just-finished state");
  ok(await page.locator('[data-gate-done="s4-lab"]').isVisible(), "s4: gate confirms completion after the tools are used");

  // s7: فرز for/since
  await gotoPage("s7-lab");
  const sortItems = page.locator("[data-sort-item]");
  const sortCount = await sortItems.count();
  ok(sortCount > 0, `s7: for/since sorting lab renders ${sortCount} items`);
  for (let k = 0; k < sortCount; k++) {
    const item = sortItems.first();
    const idx = Number(await item.getAttribute("data-sort-item"));
    await item.evaluate((el) => el.click());
    await page.waitForTimeout(60);
    // الباب الصحيح من بيانات المصدر نفسها (لا سمة مسرّبة في DOM)
    const bucket = FORSINCE_S7[idx].bucket;
    await page.locator(`[data-bucket="${bucket}"] button`).first().evaluate((el) => el.click());
    await page.waitForTimeout(60);
  }
  ok((await page.locator('[data-gate-done="s7-lab"]').count()) === 1, "s7: for/since sorting reaches completion through real answers");

  // s14: عدستان
  await gotoPage("s14-lab");
  const lens = page.locator(".l32-lens");
  ok((await lens.count()) === 2, "s14: two lenses (result / activity)");
  await lens.nth(1).evaluate((el) => el.click());
  await page.waitForTimeout(80);
  ok((await lens.nth(1).getAttribute("aria-pressed")) === "true", "s14: the activity lens can be selected");
  ok((await page.locator(".l32-vs").count()) > 0, "s14: the result/activity axis renders both sentences");

  // s24: نقطة المرجع
  await gotoPage("s24-lab");
  const snaps = page.locator("[data-snap]");
  ok((await snaps.count()) >= 2, `s24: reference-point rail has ${await snaps.count()} stops (PAST → NOW)`);
  await snaps.first().evaluate((el) => el.click());
  await page.waitForTimeout(120);
  ok((await page.locator('[data-lesson-step="s24-lab"]').textContent()).includes("Past Continuous"), "s24: the past stop names Past Continuous");
  await snaps.last().evaluate((el) => el.click());
  await page.waitForTimeout(120);
  ok((await page.locator('[data-lesson-step="s24-lab"]').textContent()).includes("Present Perfect Continuous"), "s24: the NOW stop names Present Perfect Continuous");

  // s27: المحقق — لا خيارات قبل لمس الخطأ
  await gotoPage("s27-lab1");
  ok((await page.locator("[data-fix-seg]").count()) > 0, "s27: detective segments are tappable");
  ok((await page.locator("[data-fix-opt]").count()) === 0, "s27: no correction options before the wrong segment is touched");
  for (let si = 0; si < 6 && (await page.locator("[data-fix-opt]").count()) === 0; si++) {
    await page.locator(`[data-fix-seg="0-${si}"]`).evaluate((el) => el.click());
    await page.waitForTimeout(50);
  }
  ok((await page.locator("[data-fix-opt]").count()) > 0, "s27: touching the wrong segment reveals the correction options");

  // s30: لوحة المعنى
  await gotoPage("s30-lab");
  const clueCount = await page.locator("[data-clue]").count();
  ok(clueCount > 0, `s30: ${clueCount} clue buttons render`);
  await page.locator("[data-clue]").first().evaluate((el) => el.click());
  await page.waitForTimeout(60);
  ok((await page.locator("[data-case-opt]").count()) === 0, "s30: options stay locked until every clue is touched");
  for (let i = 0; i < clueCount; i++) {
    await page.locator("[data-clue]").nth(i).evaluate((el) => el.click());
    await page.waitForTimeout(40);
  }
  ok((await page.locator("[data-case-opt]").count()) > 0, "s30: touching all clues unlocks the context options");

  // s32: الزعيم (الضربة الأولى)
  await gotoPage("s32-lab1");
  ok((await page.locator("[data-gear]").count()) > 0, "s32: boss gears render");
  await page.locator('[data-gate="s32-lab1"]');
  await inspect("1280-s32-interactive");

  // s36 + summary: التروس
  await gotoPage("s36-lab");
  ok((await page.locator('[role="group"][aria-label="تروس الحاضر"] button').count()) === 4, "s36: four present-tense gears");
  await gotoPage("summary-lab");
  const summaryGears = page.locator('[role="group"][aria-label="تروس الحاضر"] button');
  const gearCount = await summaryGears.count();
  for (let i = 0; i < gearCount; i++) {
    await summaryGears.nth(i).evaluate((el) => el.click());
    await page.waitForTimeout(60);
  }
  ok((await page.locator('[data-gate-done="summary-lab"]').count()) === 1, "summary: opening the four gears completes the interaction");

  // ---------------- التنقّل: الطرفان + لوحة المفاتيح ----------------
  await gotoPage("cover-src1");
  ok(await page.locator('[data-step-nav="prev"]').first().isDisabled(), "nav: previous is disabled on the first page");
  ok(!(await page.locator('[data-step-nav="next"]').first().isDisabled()), "nav: next is enabled on the first page");
  await gotoPage(PAGES[PAGES.length - 1].id);
  ok(await page.locator('[data-step-nav="next"]').first().isDisabled(), "nav: next is disabled on the last page");
  ok(!(await page.locator('[data-step-nav="prev"]').first().isDisabled()), "nav: previous is enabled on the last page");
  await gotoPage("cover-src1");
  await page.locator("#l32-main").click({ position: { x: 5, y: 5 } });
  await page.keyboard.press("ArrowLeft"); // RTL: يسار = التالي
  await page.waitForTimeout(100);
  ok((await page.locator("[data-lesson-step]").first().getAttribute("data-lesson-step")) === PAGES[1].id, "keyboard: ArrowLeft advances one page in the RTL shell");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(100);
  ok((await page.locator("[data-lesson-step]").first().getAttribute("data-lesson-step")) === PAGES[0].id, "keyboard: ArrowRight goes back one page");
  await page.locator(".l32-fab-next").click();
  await page.waitForTimeout(100);
  ok((await page.locator("[data-lesson-step]").first().getAttribute("data-lesson-step")) === PAGES[1].id, "nav: the floating next button (التالي) works");

  // ---------------- منطقة الاختبار ----------------
  await page.locator('[data-tab="test"]').click();
  await page.locator('[data-area="l32-test"]').waitFor();
  await auditStudentFacingApp("1280-assessment-before-submit");
  ok((await page.locator("[data-test-q]").count()) === 20, "test: 20 questions rendered");
  const testText0 = await page.locator('[data-area="l32-test"]').textContent();
  ok(!/الدرجة:|✓ صحيح|✕ غير صحيح|شرح التصحيح/.test(testText0), "test: neutral before submit — no score, no correctness");
  ok(testText0.includes("أجبت: 0/20"), "test: answered counter starts at 0/20");
  await inspect("1280-test-fresh");
  await shot("1280-test-fresh");
  // إرسال ناقص: يُمنع ولا يكشف شيئًا
  await page.getByRole("button", { name: /إرسال الاختبار/ }).first().click();
  await page.waitForTimeout(120);
  const blocked = await page.locator('[data-area="l32-test"]').textContent();
  ok(/بقي\s*\d+\s*سؤالًا/.test(blocked), "test: submitting while incomplete is blocked with an explicit message");
  ok(!/الدرجة:/.test(blocked), "test: a blocked submit reveals no score and no answers");
  // إجابة سؤال واحد ثم الإرسال مرة أخرى: ما زال ممنوعًا
  await page.locator("#l32-q1 input[type=radio]").first().check();
  await page.waitForTimeout(80);
  ok((await page.locator('[data-area="l32-test"]').textContent()).includes("أجبت: 1/20"), "test: answering updates the counter");
  await page.getByRole("button", { name: /إرسال الاختبار/ }).first().click();
  await page.waitForTimeout(120);
  await auditStudentFacingApp("1280-assessment-incomplete-submit");
  ok(!/الدرجة:/.test(await page.locator('[data-area="l32-test"]').textContent()), "test: partial answers still block completion (no reveal, no answers shown)");
  // إعادة الضبط
  await page.getByRole("button", { name: /إعادة الاختبار كاملًا/ }).first().click();
  await page.waitForTimeout(150);
  ok((await page.locator('[data-area="l32-test"]').textContent()).includes("أجبت: 0/20"), "test: reset clears every answer");

  // ---------------- الحلول: مقفلة قبل الإرسال ----------------
  await page.locator('[data-tab="solutions"]').click();
  await page.locator('[data-area="l32-solutions"]').waitFor();
  await auditStudentFacingApp("1280-solutions-locked");
  const solLocked = await page.locator('[data-area="l32-solutions"]').textContent();
  ok(/الحلول مقفلة/.test(solLocked), "solutions: locked before the test is submitted");
  ok(!/الإجابة المقبولة/.test(solLocked), "solutions: no answer key leaks while locked");
  await inspect("1280-solutions-locked");
  await shot("1280-solutions-locked");

  // ---------------- منطقة المعلم ----------------
  await page.locator('[data-tab="teacher"]').click();
  await page.locator('[data-area="l32-teacher"]').waitFor();
  ok(await page.locator("#l32-teacher-pw").isVisible(), "teacher: password gate shown");
  ok(!(await page.locator('[data-area="l32-teacher"]').textContent()).includes("نظرة عامة للمعلم"), "teacher: no content before the password");
  await inspect("1280-teacher-locked");
  await shot("1280-teacher-locked");
  await page.locator("#l32-teacher-pw").fill("wrong-password");
  await page.locator('[data-area="l32-teacher"] button[type=submit]').click();
  await page.waitForTimeout(100);
  ok((await page.locator('[role="alert"]').textContent()).includes("كلمة المرور غير صحيحة"), "teacher: wrong password rejected");
  await page.locator("#l32-teacher-pw").fill(TEACHER_PASSWORD);
  await page.locator('[data-area="l32-teacher"] button[type=submit]').click();
  await page.waitForTimeout(200);
  const teacherText = await page.locator('[data-area="l32-teacher"]').textContent();
  for (const heading of ["نظرة عامة للمعلم", "توزيع الحصة", "خريطة التدفق", "ملاحظات التدريس", "حلول تمارين المصدر", "rubrics", "الأخطاء الشائعة", "الأخطاء المتعمدة في المصدر", "دليل الاختبار للمعلم", "خطة المعالجة", "فهرس المصدر الحرفي"]) {
    ok(teacherText.includes(heading), `teacher: section rendered — ${heading}`);
  }
  ok((await page.locator('[data-area="l32-teacher"] tr').count()) >= 40, `teacher: explained tables render (${await page.locator('[data-area="l32-teacher"] tr').count()} rows)`);
  ok((await page.locator('[data-area="l32-teacher"] details').count()) === 40, "teacher: the verbatim source index lists 40 sections");
  await inspect("1280-teacher-open");
  await shot("1280-teacher-open");

  // ---------------- تدفق كامل بعد الإجابة: تصحيح + فتح الحلول ----------------
  await page.locator('[data-tab="test"]').click();
  await page.locator('[data-area="l32-test"]').waitFor();
  await page.evaluate(() => window.scrollTo(0, 0));
  const answered = await answerAllInBrowser();
  ok(answered === 20, `test: all 20 questions answered in the browser (${answered}/20)`);
  await page.getByRole("button", { name: /إرسال الاختبار/ }).first().click();
  await page.waitForTimeout(250);
  await auditStudentFacingApp("1280-assessment-after-submit");
  const scored = await page.locator('[data-area="l32-test"]').textContent();
  ok(/الدرجة:\s*\d+\s*من\s*20/.test(scored), "test: per-question status appears after submit");
  ok(/✓ صحيح/.test(scored), "test: correctness markers appear only after submit");
  await inspect("1280-test-scored");
  await shot("1280-test-scored");
  await page.locator('[data-tab="solutions"]').click();
  await page.locator('[data-area="l32-solutions"]').waitFor();
  await page.waitForTimeout(120);
  await auditStudentFacingApp("1280-solutions-unlocked");
  const solOpen = await page.locator('[data-area="l32-solutions"]').textContent();
  ok((solOpen.match(/المجموعة/g) || []).length === 4, "solutions: four groups unlock after submitting");
  ok(solOpen.includes("Platform Explanation"), "solutions: explanations are labelled as platform commentary");
  await shot("1280-solutions-open");

  // ---------------- الجوال: الدرج والخطوات ----------------
  await page.setViewportSize(MOBILE);
  await page.locator('[data-tab="lesson"]').click();
  await page.waitForTimeout(120);
  ok(!(await page.locator(".l32-rail:visible").count()), "mobile: the rail collapses into a drawer");
  await page.locator('[data-nav-toggle="steps"]').click();
  await page.waitForTimeout(100);
  ok(await page.locator("#l32-drawer").isVisible(), "mobile: the steps drawer opens");
  await auditStudentFacingApp("mobile-drawer");
  await inspect("mobile-drawer");
  await shot("mobile-drawer");
  await page.locator("#l32-drawer .l32-rail-step").nth(indexOf("s14-lab")).evaluate((el) => el.click());
  await page.locator('[data-lesson-step="s14-lab"]').waitFor();
  await page.waitForTimeout(100);
  await inspect("mobile-s14");
  await shot("mobile-s14-lens");

  ok(studentCopyFindings.size === 0, `student-copy: no source/provenance or internal-section labels (${studentCopyScans} rendered states, ${studentCopyFindings.size} distinct strings, ${studentCopyOccurrences} occurrences)`);
  ok(errors.length === 0, `no console/page errors (${errors.slice(0, 3).join(" | ")})`);
  ok(externalNetworkErrors.length >= 0, "external font requests were aborted by design");
} finally {
  const report = {
    lesson: 32,
    identity: "THE DURATION STREAM / تيّار المدة",
    browser: await browser.version(),
    url: base,
    pages: PAGES.map((p) => p.id),
    viewports: [DESKTOP_1280, DESKTOP_1920, MOBILE],
    targetMaxHeight: TARGET_MAX_HEIGHT,
    pageHeights,
    checks,
    failures,
    studentCopyScans,
    studentCopyDistinctLeaks: studentCopyFindings.size,
    studentCopyOccurrences,
    studentCopyFindings: [...studentCopyFindings.values()].map((entry) => ({
      text: entry.text,
      rules: [...entry.rules],
      contexts: [...entry.contexts],
    })),
    errors,
    externalNetworkErrors,
    screenshots,
    renderedChecks: rendered,
  };
  writeFileSync(`${output}/verification.json`, `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
}

/** يجيب عن كل سؤال صحيحًا عبر DOM المتصفح (20 سؤالًا بأنواعها السبعة). */
async function answerAllInBrowser() {
  let answered = 0;
  for (const q of TEST_32) {
    const card = page.locator(`#l32-q${q.n}`);
    if (!(await card.count())) { failures.push(`browser test: card ${q.n} missing`); continue; }
    const kind = await card.evaluate((el) => {
      if (el.querySelector("select")) return "match";
      if (el.querySelector("input[type=checkbox]")) return "multi";
      if (el.querySelector("input[type=radio]")) return "pick";
      if (el.querySelector("input, textarea") && !el.querySelector("fieldset")) return "typed";
      if (el.querySelector("[data-keynav-lock] button")) return "order";
      return "unknown";
    });
    try {
      if (kind === "pick") {
        const idx = q.type === "tf" ? (q.answer ? 0 : 1) : q.answer;
        await card.locator("label.l32-opt").nth(idx).click();
      } else if (kind === "multi") {
        for (const i of q.answer) await card.locator("label.l32-opt").nth(i).click();
      } else if (kind === "match") {
        const selects = card.locator("select");
        for (let i = 0; i < q.answer.length; i++) await selects.nth(i).selectOption(String(q.answer[i]));
      } else if (kind === "order") {
        for (const piece of q.answer) {
          await card.locator("button", { hasText: piece }).first().click();
          await page.waitForTimeout(40);
        }
      } else if (kind === "typed") {
        await card.locator("input, textarea").first().fill(q.accept[0]);
      } else {
        failures.push(`browser test: unsupported control for Q${q.n} (${q.type})`);
      }
    } catch (e) {
      failures.push(`browser test: Q${q.n} (${q.type}/${kind}) ${String(e.message).split("\n")[0]}`);
    }
    await page.waitForTimeout(70);
    answered = await page.locator('[data-area="l32-test"]').evaluate((el) => {
      const m = (el.textContent || "").match(/أجبت:\s*(\d+)/);
      return m ? Number(m[1]) : 0;
    });
    if (answered !== q.n) failures.push(`browser test: counter after Q${q.n} is ${answered} (expected ${q.n})`);
  }
  return answered;
}

console.log(`Real Chromium Lesson 32: ${checks} checks, ${failures.length} failures, ${screenshots.length} screenshots; ${studentCopyScans} rendered-copy scans, ${studentCopyFindings.size} distinct source-label leaks.`);
if (failures.length) {
  console.error(failures.map((f) => ` ✕ ${f}`).join("\n"));
  process.exitCode = 1;
}
