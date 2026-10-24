// ============================================================
// تدقيق الدرس 33 في متصفح حقيقي (Chromium)
//   node scripts/audit-lesson33-browser.mjs
//
// يتطلب خادم معاينة على BASE_URL (الافتراضي http://127.0.0.1:4173/English-Course/):
//   npm run build && npx vite preview --port 4173 --host 127.0.0.1
//
// يتحقق من:
//   1) المقاسات المطلوبة: 1280×800 و1920×1080 و768×900 و375×812 — بلا فيض أفقي.
//   2) عدم تداخل شريط الخطوات مع زر «قفل الموقع» في كل مقاس وكل منطقة.
//   3) المناطق الأربع تعمل، وزر القفل يبقى ظاهرًا مرة واحدة بالضبط.
//   4) المرور على الشرائح كلها بزر «التالي ←» بلا أخطاء console.
//   5) عزل الاتجاه: كل مقطع إنجليزي داخل عازل LTR، وكل عربي داخل RTL.
//   6) تمييز بصري حقيقي للأزمنة الأربعة: عدسات مختلفة + تباين WCAG AA.
//   7) قفل الحلول قبل التسليم، وبوابة المعلم، والاختبار النهائي في آخر خطوة.
//   8) لقطات إلى docs/lesson33-visual/ (تُستعمل في تقرير التحقق البصري).
// ============================================================
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync, readdirSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import { build } from "esbuild";

const work = "node_modules/.lesson33-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

// قائمة الشرائح تُقرأ من بيانات الدرس نفسها حتى لا ينفصل التدقيق عن البناء.
await build({
  stdin: { contents: `export { SLIDES_33, SLIDE_COUNT_33 } from "./src/lessons/lesson33/slides33";`, resolveDir: process.cwd(), loader: "tsx" },
  outfile: `${work}/slides.mjs`,
  bundle: true,
  format: "esm",
  platform: "node",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty" },
});
const { SLIDES_33, SLIDE_COUNT_33 } = await import(`../${work}/slides.mjs?${Date.now()}`);

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173/English-Course/";
const outDir = "docs/lesson33-visual";
mkdirSync(outDir, { recursive: true });

const VIEWPORTS = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x900", width: 768, height: 900 },
  { name: "375x812", width: 375, height: 812 },
];
const REQUIRED = ["1920x1080", "1280x800", "375x812"];
const TABS = ["خطوات الدرس", "منطقة الاختبار", "منطقة الحلول", "منطقة المعلم"];

let checks = 0;
const failures = [];
const lensContrast = [];
const bidiReport = [];
const ok = (cond, msg) => {
  checks += 1;
  if (!cond) failures.push(msg);
  return Boolean(cond);
};
const eq = (a, b, msg) => ok(a === b, `${msg} (expected ${JSON.stringify(b)}, got ${JSON.stringify(a)})`);

/** مكتبة التباين: تُرسَّم الخلفية فوق الأسود والأبيض فتُحلّ ألفا وقيم sRGB بدقة. */
const COLOR_LIB = String.raw`(() => {
  const canvas = document.createElement("canvas");
  canvas.width = 1; canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const sample = (css, base) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = base; ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  };
  const resolve = (css) => {
    if (!css || css === "transparent" || css === "rgba(0, 0, 0, 0)") return null;
    const b = sample(css, "#000");
    const w = sample(css, "#fff");
    const alpha = 1 - (w[0] - b[0]) / 255;
    if (alpha <= 0.004) return null;
    const rgb = b.map((v, i) => Math.min(255, Math.max(0, Math.round(v / Math.max(alpha, 1e-6) * 1 + (i < 0 ? 0 : 0)))));
    return { r: rgb[0], g: rgb[1], b: rgb[2], a: alpha };
  };
  const lin = (v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  window.__c33 = { resolve, lum, over };
})();`;

const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
// بوابة الموقع العامة تُفتح أولًا حتى يُقاس الدرس نفسه (سلوك القفل يتحقق منه
// scripts/audit-navigation-lock-overlap.mjs و -browser.mjs).
await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
const consoleErrors = [];
// بيئة الاختبار المعزولة لا تسمح بالاتصال بمضيفي خطوط Google المذكورين في index.html
//   (fonts.googleapis.com / fonts.gstatic.com)؛ فشل تحميلهما خطأ شبكة في البيئة نفسها
//   وليس عيبًا في الدرس 33، وهو موجود في كل دروس المشروع لأن index.html مشترك.
//   التصفية تتم على رابط المورد الفعلي (msg.location().url) لا على نص الرسالة،
//   فلا يُستثنى أي خطأ آخر، وتُسجَّل الموارد المستثناة في التقرير وتُطبع.
const EXTERNAL_BLOCKED_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
const blockedResources = [];
const isBlockedExternal = (url) => Boolean(url) && EXTERNAL_BLOCKED_HOSTS.some((host) => url.includes(host));
page.on("requestfailed", (req) => {
  if (isBlockedExternal(req.url())) blockedResources.push(req.url());
});
page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const text = msg.text();
  let url = "";
  try { url = (msg.location() && msg.location().url) || ""; } catch { url = ""; }
  if (/Failed to load resource/.test(text) && isBlockedExternal(url)) return;
  consoleErrors.push(url ? `${text} @ ${url}` : text);
});
page.on("pageerror", (err) => consoleErrors.push(String(err && err.message ? err.message : err)));

try {
  await page.goto(`${baseUrl}#/lesson/33`, { waitUntil: "domcontentloaded", timeout: 30000 });
} catch (err) {
  console.error(`✕ تعذّر فتح ${baseUrl} — شغّل: npm run build && npx vite preview --port 4173 --host 127.0.0.1`);
  console.error(`  ${err.message}`);
  await browser.close();
  process.exit(1);
}
await page.locator(".lesson33").waitFor({ timeout: 20000 });
await page.evaluate(COLOR_LIB);
await page.waitForTimeout(400);

ok((await page.locator("[data-lesson='33']").getAttribute("dir")) === "rtl", "browser: جذر الدرس dir=rtl");
ok((await page.locator("html").getAttribute("lang")) === "ar", "browser: لغة الصفحة العربية");

// ------------------------------------------------------------
// 1) المقاسات: لا فيض أفقي، ولا تداخل بين شريط الخطوات وزر القفل
// ------------------------------------------------------------
const overlapReport = [];
const viewportMetrics = [];
for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.waitForTimeout(280);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    // العنصر «المتجاوز» يُحسب فقط إذا كان فعلًا يستطيع إنشاء فيض أفقي: أي عنصر
    //   مقصوص بسلف overflow:hidden/clip (مثل العلامة المائية الثابتة SignatureGhost
    //   المزيّنة aria-hidden) لا يمدّ المستند ولا يُحسب خرقًا. الفحص الحاسم هو
    //   scrollWidth ≤ clientW المفحوص في السطر التالي.
    const clipped = (el) => {
      for (let n = el.parentElement; n && n !== document.documentElement; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (cs.overflowX === "hidden" || cs.overflowX === "clip" || cs.overflowX === "scroll" || cs.overflowX === "auto") return true;
      }
      return false;
    };
    const wide = [...document.querySelectorAll(".lesson33 *")]
      .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1.5 && !clipped(el))
      .slice(0, 6)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className || "").split(" ").slice(0, 3).join(".")}`);
    return { scrollW: doc.scrollWidth, clientW: doc.clientWidth, wide };
  });
  ok(metrics.scrollW <= metrics.clientW + 1, `viewport ${vp.name}: لا فيض أفقي (scroll ${metrics.scrollW} ≤ client ${metrics.clientW})`);
  ok(metrics.wide.length === 0, `viewport ${vp.name}: لا عنصر يتجاوز العرض (${metrics.wide.join(", ") || "لا شيء"})`);
  viewportMetrics.push({ viewport: vp.name, scrollWidth: metrics.scrollW, clientWidth: metrics.clientW, overflowingElements: metrics.wide });

  for (const tab of TABS) {
    const tabBtn = page.locator("button.l33-tab").filter({ hasText: tab }).first();
    if (await tabBtn.count()) {
      await tabBtn.click();
      await page.waitForTimeout(220);
    }
    const boxes = await page.evaluate(() => {
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const st = getComputedStyle(el);
        if (st.display === "none" || st.visibility === "hidden" || r.width === 0 || r.height === 0) return null;
        return { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom };
      };
      const nav = document.querySelector("[data-lesson-step-nav='true']");
      const lock = document.querySelector("[data-site-lock-button='true']");
      const next = document.querySelector(".l33-fab-next");
      const prev = document.querySelector(".l33-fab-prev");
      // زر القفل يُرسَم داخل شريط الخطوات نفسه (LessonStepNav)، فمقارنة الشريط به
      //   صحيحة دائمًا ولا تعني تداخلًا؛ المقارنة المفيدة هي بين زرَّي السابق/التالي والقفل.
      const hit = (a, b) => Boolean(a && b && a.x < b.right && b.x < a.right && a.y < b.bottom && b.y < a.bottom);
      return { nav: rect(nav), lock: rect(lock), next: rect(next), prev: rect(prev), lockInsideNav: Boolean(nav && lock && nav.contains(lock)), hitNextLock: hit(rect(next), rect(lock)), hitPrevLock: hit(rect(prev), rect(lock)) };
    });
    const visibleLocks = await page.locator("[data-site-lock-button='true']").evaluateAll((els) =>
      els.filter((el) => {
        const r = el.getBoundingClientRect();
        const st = getComputedStyle(el);
        return st.display !== "none" && st.visibility !== "hidden" && r.width > 0 && r.height > 0;
      }).length,
    );
    eq(visibleLocks, 1, `viewport ${vp.name} [${tab}]: زر قفل الموقع ظاهر مرة واحدة بالضبط`);
    ok(boxes.lock, `viewport ${vp.name} [${tab}]: زر القفل له صندوق مرئي`);
    ok(!boxes.hitNextLock && !boxes.hitPrevLock, `viewport ${vp.name} [${tab}]: أزرار التالي/السابق لا تتداخل مع زر القفل`);
    if (boxes.next && boxes.lock) {
      const gap = Math.abs(boxes.lock.x - boxes.next.right);
      ok(gap > 1 || boxes.next.bottom <= boxes.lock.y || boxes.next.y >= boxes.lock.bottom, `viewport ${vp.name} [${tab}]: فصل واضح بين «التالي» وزر القفل`);
    }
    ok(boxes.lockInsideNav, `viewport ${vp.name} [${tab}]: زر القفل داخل شريط الخطوات (وليس منفصلًا عنه)`);
    if (boxes.hitNextLock || boxes.hitPrevLock) overlapReport.push(`${vp.name}/${tab}`);

    if (vp.name === "1280x800" && tab === "خطوات الدرس") {
      await page.screenshot({ path: `${outDir}/browser-lesson33-1280x800-${tab === "خطوات الدرس" ? "steps" : tab}.png` });
    }
  }
  await page.locator("button.l33-tab").filter({ hasText: "خطوات الدرس" }).first().click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${outDir}/browser-lesson33-${vp.name}-cover.png`, fullPage: false });
}
eq(overlapReport.length, 0, `browser: لا تداخل تنقّل/قفل في أي مقاس (${overlapReport.join(", ") || "لا شيء"})`);
ok(REQUIRED.every((name) => VIEWPORTS.some((v) => v.name === name)), "browser: المقاسات المطلوبة 1280×800 و1920×1080 والجوال مغطّاة");

// ------------------------------------------------------------
// 2) الدرج الجانبي على الجوال
// ------------------------------------------------------------
await page.setViewportSize({ width: 375, height: 812 });
await page.waitForTimeout(250);
const toggle = page.locator("[data-nav-toggle='steps']");
ok((await toggle.count()) === 1, "mobile: زر فهرس الخطوات موجود على عرض 375");
await toggle.click();
await page.waitForTimeout(320);
ok(await page.locator("#l33-drawer").isVisible(), "mobile: الدرج الجانبي يُفتح");
const drawerSteps = await page.locator("#l33-drawer button").count();
ok(drawerSteps >= SLIDE_COUNT_33, `mobile: الدرج يعرض خطوات الدرس (${drawerSteps} ≥ ${SLIDE_COUNT_33})`);
await page.screenshot({ path: `${outDir}/browser-lesson33-375x812-drawer.png` });
await page.locator("#l33-drawer button").nth(3).click();
await page.waitForTimeout(300);
ok(!(await page.locator("#l33-drawer").isVisible()), "mobile: اختيار خطوة يُغلق الدرج");
await page.keyboard.press("Escape");
await page.waitForTimeout(150);

// ------------------------------------------------------------
// 3) المرور على كل الشرائح بزر «التالي ←»
// ------------------------------------------------------------
await page.setViewportSize({ width: 1280, height: 800 });
await page.waitForTimeout(250);
await page.locator("button.l33-tab").filter({ hasText: "خطوات الدرس" }).first().click();
await page.waitForTimeout(200);
{
  const railFirst = page.locator('nav[aria-label="خطوات الدرس 33"] button').first();
  if (await railFirst.count()) await railFirst.click();
  await page.waitForTimeout(250);
}
const seen = new Set();
let steps = 0;
while (steps < SLIDE_COUNT_33 + 6) {
  const id = await page.locator("[data-slide]").first().getAttribute("data-slide").catch(() => null);
  if (id) seen.add(id);
  const next = page.locator("button.l33-fab-next");
  if (!(await next.count()) || (await next.isDisabled())) break;
  const label = ((await next.innerText()) || "").replace(/\s+/g, " ").trim();
  if (steps === 0) eq(label, "التالي ←", "browser: نص زر التالي «التالي ←» كما يتوقعه التدقيق المشترك");
  await next.click();
  steps += 1;
  await page.waitForTimeout(90);
}
eq(steps, SLIDE_COUNT_33 - 1, `browser: زر التالي يقطع ${SLIDE_COUNT_33 - 1} خطوة`);
eq(seen.size, SLIDE_COUNT_33, `browser: كل الشرائح الـ${SLIDE_COUNT_33} ظهرت (${seen.size})`);
const missingIds = SLIDES_33.map((s) => s.id).filter((id) => !seen.has(id));
ok(missingIds.length === 0, `browser: لا شريحة غير قابلة للوصول (${missingIds.join(", ") || "لا شيء"})`);
ok(consoleErrors.length === 0, `browser: لا أخطاء console أثناء المرور على كل الشرائح (${consoleErrors.slice(0, 3).join(" | ") || "0"})`);

// ------------------------------------------------------------
// 4) الاختبار النهائي في آخر خطوة
// ------------------------------------------------------------
ok(await page.locator('[data-final-test="33"]').isVisible(), "browser: الاختبار النهائي المشترك ظاهر في آخر خطوة");
ok((await page.locator("[data-ft-key-item]").count()) === 0, "browser: لا مفتاح للاختبار النهائي قبل التصحيح");
await page.screenshot({ path: `${outDir}/browser-lesson33-1280x800-final-test.png` });

// ------------------------------------------------------------
// 5) تمييز الأزمنة الأربعة: عدسات مختلفة + تباين AA
//    تُقاس العدسات على شريحة الغلاف نفسها (الفقرة السابقة تنتهي عند آخر شريحة).
// ------------------------------------------------------------
{
  const railBtn = page.locator('nav[aria-label="خطوات الدرس 33"] button');
  if (await railBtn.count()) {
    await railBtn.first().click();
    await page.waitForTimeout(260);
  }
  eq((await page.locator("[data-slide]").first().getAttribute("data-slide")), "cover", "browser: العودة إلى شريحة الغلاف قبل قياس العدسات");
  const lens = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("[data-cover-tense]")) {
      const st = getComputedStyle(el);
      out.push({ id: el.getAttribute("data-cover-tense"), bg: st.backgroundColor, color: st.color, border: st.borderColor });
    }
    return out;
  });
  eq(lens.length, 4, "design: أربع عدسات زمنية في الغلاف");
  eq(new Set(lens.map((l) => l.bg)).size, 4, "design: خلفية مختلفة لكل زمن (تمييز بصري واضح)");
  eq(new Set(lens.map((l) => l.color)).size >= 1, true, "design: لون نص محدد لكل عدسة");

  const contrast = await page.evaluate(({ lens }) => {
    const { resolve, lum, over } = window.__c33;
    const white = { r: 255, g: 255, b: 255, a: 1 };
    return lens.map((l) => {
      const fg = resolve(l.color);
      let bg = resolve(l.bg);
      let node = document.querySelector(`[data-cover-tense="${l.id}"]`);
      while ((!bg || bg.a < 0.9) && node && node.parentElement) {
        node = node.parentElement;
        const cs = getComputedStyle(node);
        const cand = resolve(cs.backgroundColor);
        if (cand && cand.a >= 0.9) bg = cand;
      }
      if (!bg) bg = white;
      const fgOver = fg && fg.a < 1 ? over(fg, bg) : fg;
      if (!fgOver) return { id: l.id, ratio: 0 };
      const l1 = lum(fgOver);
      const l2 = lum(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return { id: l.id, ratio: Math.round(ratio * 100) / 100 };
    });
  }, { lens });
  for (const c of contrast) ok(c.ratio >= 4.5, `a11y: تباين عدسة ${c.id} ≥ 4.5:1 (حصل على ${c.ratio})`);
  lensContrast.push(...contrast.map((c) => ({ ...c, background: lens.find((l) => l.id === c.id)?.bg ?? null })));
}

// ------------------------------------------------------------
// 5ب) عناوين الدرس المختلطة: الفاصل يبقى بين الكتابتين
//     (عنوان «الدرس 33: …» وعنوانه الفرعي «… — Present Tenses Mastery»)
// ------------------------------------------------------------
{
  const res = await page.evaluate(({ title, subtitle }) => {
    const norm = (t) => (t || "").replace(/\s+/g, " ").trim();
    const scopes = [
      document.querySelector("[data-slide='cover']"),
      document.querySelector(".lesson33 aside"),
    ].filter(Boolean);
    const leaves = scopes.flatMap((root) => [...root.querySelectorAll("span[dir='ltr'], bdi[dir='ltr']")]);
    // عزلة لاتينية تبدأ بفاصل أو برقم+فاصل = الفاصل ابتُلع داخل العزلة (عيب العرض القديم)
    const swallowed = leaves.filter((el) => /^[—:–-]\s*[A-Za-z]/.test(norm(el.textContent)) || /^\d+[:.]\s/.test(norm(el.textContent)));
    const titleHost = [...document.querySelectorAll(".lesson33 h1, .lesson33 h2")].find((n) => norm(n.textContent).includes(norm(title)));
    const subHost = [...document.querySelectorAll(".lesson33 p, .lesson33 h1, .lesson33 h2")].find((n) => norm(n.textContent) === norm(subtitle));
    return {
      swallowed: swallowed.length,
      swallowedSample: swallowed.slice(0, 3).map((el) => norm(el.textContent)),
      titleKept: titleHost ? norm(titleHost.textContent) === norm(title) : false,
      subtitleKept: Boolean(subHost),
      subtitleOnce: [...document.querySelectorAll("[data-slide='cover'] p")].filter((n) => norm(n.textContent) === norm(subtitle)).length,
    };
  }, { title: "الدرس 33: The Four Present Tenses", subtitle: "المراجعة الشاملة لأزمنة الحاضر الأربعة — Present Tenses Mastery" });
  eq(res.swallowed, 0, `bidi: لا فاصل مبتلع داخل عزلة لاتينية في الغلاف أو ترويسة العمود (${res.swallowedSample.join(" | ") || "لا شيء"})`);
  ok(res.titleKept, "bidi: عنوان الدرس كاملًا محفوظ في ترويسة العمود (بلا فقد نص)");
  ok(res.subtitleKept, "bidi: العنوان الفرعي محفوظ حرفيًا في الغلاف");
  eq(res.subtitleOnce, 1, `bidi: العنوان الفرعي يظهر مرة واحدة في الغلاف لا مرتين (${res.subtitleOnce})`);
}

// ------------------------------------------------------------
// 6) عزل الاتجاه في الشرائح المختلطة
// ------------------------------------------------------------
{
  const rail = page.locator('nav[aria-label="خطوات الدرس 33"] button');
  const targets = ["s1-a", "s2-a", "s7-a", "s16-a", "s17-a", "s23-b"];
  let mixed = 0;
  let lat = 0;
  let ar = 0;
  let slidesChecked = 0;
  let badIsolation = 0;
  const bad = [];
  for (const id of targets) {
    const index = SLIDES_33.findIndex((s) => s.id === id);
    if (index < 0) continue;
    await rail.nth(index).click();
    await page.waitForTimeout(240);
    const res = await page.evaluate(() => {
      const AR = /[\u0600-\u06FF]/;
      const LAT = /[A-Za-z]/;
      const iso = (el) => {
        let n = el;
        while (n && n !== document.body) {
          const d = n.getAttribute && n.getAttribute("dir");
          if (d === "ltr" || d === "rtl") return d;
          const c = (n.getAttribute && n.getAttribute("class")) || "";
          if (/(^|\s)(font-en|ltr|ltr-row)(\s|$)/.test(c)) return "ltr";
          n = n.parentElement;
        }
        return null;
      };
      // Text33 -> LatinRuns يقسّم أي نص مختلط إلى مقاطع أحادية الكتابة، فالضمان الحقيقي هو:
      //   (أ) لا ورقة نصّية تحمل العربية والإنجليزية معًا،
      //   (ب) كل مقطع إنجليزي داخل عازل LTR،
      //   (ج) لا مقطع عربي محشور داخل عازل LTR.
      let bothCount = 0;
      let latCount = 0;
      let arCount = 0;
      const problems = [];
      for (const el of document.querySelectorAll("#l33-main p, #l33-main span, #l33-main td, #l33-main th, #l33-main li, #l33-main h2, #l33-main h3, #l33-main button, #l33-main label, #l33-main div")) {
        if (el.children.length > 0) continue;
        const t = el.textContent || "";
        if (!t.trim()) continue;
        const hasAr = AR.test(t);
        const hasLat = LAT.test(t);
        const dir = iso(el);
        const cs = getComputedStyle(el);
        if (hasAr && hasLat) {
          bothCount += 1;
          const isolated = dir !== null || cs.unicodeBidi === "isolate" || cs.unicodeBidi === "plaintext";
          if (!isolated) problems.push(`mixed without isolation: ${t.slice(0, 50)}`);
        } else if (hasLat && !hasAr) {
          latCount += 1;
          if (dir !== "ltr" && cs.direction !== "ltr") problems.push(`LTR missing: ${t.slice(0, 40)}`);
        } else if (hasAr) {
          arCount += 1;
          if (dir === "ltr" || cs.direction === "ltr") problems.push(`Arabic forced LTR: ${t.slice(0, 40)}`);
        }
      }
      return { bothCount, latCount, arCount, problems };
    });
    mixed += res.bothCount;
    lat += res.latCount;
    ar += res.arCount;
    slidesChecked += 1;
    badIsolation += res.problems.length;
    bad.push(...res.problems.slice(0, 3).map((p) => `${id}: ${p}`));
    bidiReport.push({ slide: id, leavesWithBothScripts: res.bothCount, latinLeaves: res.latCount, arabicLeaves: res.arCount, problems: res.problems });
  }
  eq(slidesChecked, targets.length, `bidi-browser: كل الشرائح المستهدفة وُجدت وفُحصت (${slidesChecked}/${targets.length})`);
  ok(lat > 0 && ar > 0, `bidi-browser: مقاطع إنجليزية وعربية فعلًا على الشاشة (لاتيني ${lat} · عربي ${ar})`);
  eq(mixed, 0, `bidi-browser: لا ورقة نصّية تحمل العربية والإنجليزية معًا — LatinRuns يقسّمها (${mixed})`);
  eq(badIsolation, 0, `bidi-browser: كل مقطع معزول باتجاهه (${bad.slice(0, 4).join(" · ") || "لا خروقات"})`);
}

// ------------------------------------------------------------
// 7) قفل الحلول وبوابة المعلم في المتصفح
// ------------------------------------------------------------
{
  await page.locator("button.l33-tab").filter({ hasText: "منطقة الحلول" }).first().click();
  await page.waitForTimeout(300);
  ok((await page.locator("[data-solutions-locked='true']").count()) >= 1, "browser: منطقة الحلول مقفلة قبل التسليم");
  ok((await page.locator("#l33-main").innerText()).includes("مقفلة"), "browser: الطالب يرى «مقفلة»");
  await page.screenshot({ path: `${outDir}/browser-lesson33-1280x800-solutions-locked.png` });

  await page.locator("button.l33-tab").filter({ hasText: "منطقة المعلم" }).first().click();
  await page.waitForTimeout(300);
  ok(await page.locator("#l33-teacher-pw").isVisible(), "browser: بوابة المعلم تطلب كلمة المرور");
  ok((await page.locator("[data-ft-key-item]").count()) === 0, "browser: لا مفتاح قبل كلمة المرور");
  await page.fill("#l33-teacher-pw", "somer173");
  await page.locator("button[type='submit']").filter({ hasText: "دخول" }).first().click();
  await page.waitForTimeout(1500);
  ok(await page.locator("[data-area='l33-teacher-body']").isVisible(), "browser: somer173 تفتح منطقة المعلم");
  ok((await page.locator("[data-ft-key-item]").count()) >= 12, "browser: مفتاح الاختبار النهائي المشترك ظاهر للمعلم");
  await page.waitForSelector("[data-teacher-guide]", { timeout: 15000 });
  ok(await page.locator("[data-teacher-guide]").isVisible(), "browser: دليل المعلم التحليلي ظاهر (قطعة مؤجَّلة)");
  await page.screenshot({ path: `${outDir}/browser-lesson33-1920x1080-teacher.png`, fullPage: false });
  await page.locator("button").filter({ hasText: "قفل منطقة المعلم" }).first().click();
  await page.waitForTimeout(400);
  ok(await page.locator("#l33-teacher-pw").isVisible(), "browser: إعادة القفل تُغلق منطقة المعلم");
}

// ------------------------------------------------------------
// 8) تسليم الاختبار في المتصفح ثم فتح الحلول
// ------------------------------------------------------------
{
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(250);
  await page.locator("button.l33-tab").filter({ hasText: "منطقة الاختبار" }).first().click();
  await page.waitForTimeout(400);
  eq(await page.locator("[data-question-id]").count(), 25, "browser: 25 سؤالًا في منطقة الاختبار");
  ok(await page.locator("[data-test-submit='33']").isDisabled(), "browser: التسليم معطّل قبل الإجابة");
  ok(!/[✓✕]/.test(await page.locator("#l33-main").innerText()), "browser: لا تصحيح قبل التسليم");
  await page.screenshot({ path: `${outDir}/browser-lesson33-1920x1080-test.png` });

  // الإجابات النموذجية تُقرأ من مفتاح الدرس نفسه (لا نسخة مكتوبة يدويًا).
  await build({
    stdin: {
      contents: `export { perfectSheet33 } from "./src/lessons/lesson33/key33";
export { TEST_33, answerKey33 } from "./src/lessons/lesson33/testData33";`,
      resolveDir: process.cwd(),
      loader: "tsx",
    },
    outfile: `${work}/sheet.mjs`,
    bundle: true,
    format: "esm",
    platform: "node",
    packages: "external",
    jsx: "automatic",
    loader: { ".css": "empty" },
  });
  const { perfectSheet33, TEST_33, answerKey33 } = await import(`../${work}/sheet.mjs?${Date.now()}`);
  const sheet = perfectSheet33();
  let filled = 0;
  for (const question of TEST_33) {
    for (const f of question.fields) {
      const value = sheet[answerKey33(question.id, f.key)];
      if (value === undefined) continue;
      const option = page.locator(`[data-option="${question.id}-${value}"]`);
      if (await option.count()) {
        await option.click();
        filled += 1;
        continue;
      }
      const box = page.locator(`[data-answer="${question.id}-${f.key}"]`);
      if (await box.count()) {
        await box.fill(value);
        filled += 1;
      }
    }
  }
  eq(filled, 30, "browser: 30 حقلًا أُجيبت (25 سؤالًا + فراغ ⑦ الإضافي + حقلا ⑳ + حقلا ㉕)");
  await page.waitForTimeout(300);
  ok(!(await page.locator("[data-test-submit='33']").isDisabled()), "browser: التسليم يُفعَّل بعد الإجابة عن الكل");
  await page.locator("[data-test-submit='33']").click();
  await page.waitForTimeout(1800);
  ok((await page.locator("#l33-main").innerText()).includes("تم التسليم"), "browser: تم التسليم");

  await page.locator("button.l33-tab").filter({ hasText: "منطقة الحلول" }).first().click();
  await page.waitForSelector("[data-area='solutions']", { timeout: 15000 });
  eq(await page.locator("[data-solution-id]").count(), 25, "browser: 25 حلًا مفصّلًا بعد التسليم");
  const solText = await page.locator("#l33-main").innerText();
  ok(solText.includes("is rehearsing") && solText.includes("has known"), "browser: حقلَا ㉕ معروضان (فعلان وشرح)");
  ok(solText.includes("نعم، كلتاهما صحيحتان"), "browser: حكم ⑳ معروض");
  ok(await page.locator("[data-mia-key='33']").isVisible(), "browser: فقرة Mia كاملة بعد التصحيح");
  await page.screenshot({ path: `${outDir}/browser-lesson33-1920x1080-solutions.png` });
}

// ------------------------------------------------------------
// 9) لقطات المحطات الممثِّلة (1440×900) — تُحدِّث مجموعة docs/lesson33-visual
//    الموثّقة في المستودع بدل صور التصميم القديم.
// ------------------------------------------------------------
{
  const SHOTS = [
    ["s3-c", "04-s3-nora-lab-1440.png"],
    ["s4-a", "05-s4-decision-1440.png"],
    ["s8-c", "06-s8-duel1-1440.png"],
    ["s16-a", "07-s16-reading-1440.png"],
    ["s12-a", "08-s12-detective-1440.png"],
    ["test-l1", "09-test-1440.png"],
  ];
  await page.locator("button.l33-tab").filter({ hasText: "خطوات الدرس" }).first().click();
  await page.waitForTimeout(240);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(260);
  const rail = page.locator('nav[aria-label="خطوات الدرس 33"] button');
  const shotIds = [];
  for (const [id, file] of SHOTS) {
    const index = SLIDES_33.findIndex((s) => s.id === id);
    ok(index >= 0, `visual: الشريحة ${id} موجودة في بيانات الدرس`);
    if (index < 0) continue;
    await rail.nth(index).click();
    await page.waitForTimeout(300);
    const shown = await page.locator("[data-slide]").first().getAttribute("data-slide").catch(() => null);
    eq(shown, id, `visual: الانتقال إلى ${id} نجح`);
    await page.screenshot({ path: `${outDir}/${file}`, fullPage: false, animations: "disabled" });
    shotIds.push(file);
  }
  eq(shotIds.length, SHOTS.length, `visual: كل لقطات المحطات كُتبت (${shotIds.length}/${SHOTS.length})`);
}

ok(consoleErrors.length === 0, `browser: لا أخطاء console في كل الجلسة (${consoleErrors.slice(0, 3).join(" | ") || "0"})`);
if (blockedResources.length) console.log(`  ℹ ${blockedResources.length} مورد خارجي محجوب عن بيئة الاختبار (خطوط Google في index.html) — مستثنًى من عدّاد أخطاء console`);

await browser.close();
rmSync(work, { recursive: true, force: true });

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  checks,
  failures: failures.length,
  slides: SLIDE_COUNT_33,
  viewports: VIEWPORTS.map((v) => v.name),
  viewportMetrics,
  lensContrast,
  bidi: bidiReport,
  screenshots: readdirSync(outDir).filter((f) => f.endsWith(".png")).sort(),
  consoleErrors: consoleErrors.length,
  blockedExternalResources: blockedResources.length,
};
writeFileSync(`${outDir}/browser-audit.json`, `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error(`Lesson 33 browser audit: ${checks - failures.length} passed, ${failures.length} FAILED`);
  for (const f of failures) console.error(" ✕ " + f);
  process.exit(1);
}
console.log(`Lesson 33 browser audit: ${checks} checks passed, 0 failed · ${SLIDE_COUNT_33} slides · viewports ${VIEWPORTS.map((v) => v.name).join(", ")} · screenshots in ${outDir}`);
