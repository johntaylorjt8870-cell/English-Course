#!/usr/bin/env node
/**
 * Fix #5 Batch 9: Lesson 30 desktop + mobile interactions, Lesson-1 computed-chrome parity,
 * header area tabs (الدرس/الاختبار/الحلول/المعلم), framed progress row, mobile exit, pill counter,
 * drawer accessibility (dialog/aria-modal/focus trap/Escape/focus return), site lock (pill +
 * column-footer fallback), keyboard (arrows only — Space preserved as non-navigating),
 * test-area state reset-on-switch (preserved), and a full walk of all 46 slides in both viewports.
 *
 * تشغيل بعد npm run build:  node scripts/audit-fix5-lesson30-interactions.mjs
 *
 * ملاحظات:
 *  - L30 شل محلي (ليس Lesson1Shell)؛ تقارن رموز Chrome المحسوبة مع #/lesson/1 في نفس المتصفح
 *    والمقاس. البند البنيوي الوحيد المستثنى من مقارنة الرموز هو inlineLockHost (حقن البوابة
 *    مقابل التسجيل المباشر — نفس الزر المرئي). كل ما عداها ===.
 *  - البنود البنيوية الأربعة (تبويبات المناطق في الهيدر، شريط التقدم المؤطّر، زر خروج الجوال،
 *    العدّاد داخل الشريط العائم) تُثبَّت صراحةً كـ«محفوظة» ولا تُعدّ فروقًا.
 *  - الفحص قراءة فقط؛ لا يغيّر أي سلوك في التطبيق.
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, readdirSync, statSync, mkdirSync, unlinkSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { execSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const DIST = join(ROOT, "dist");
const BASE_URL = "/English-Course/";
const LESSON = 30;
const TOTAL = 46;
const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "mobile-375x812", width: 375, height: 812 },
];
// البند البنيوي الوحيد المستثنى من مقارنة رموز Chrome (آلية حقن القفل، ليس لونًا/مسافة).
const STRUCTURAL_KEYS = new Set(["inlineLockHost"]);

// ===== مكتبات النظام =====
function ensureBrowserLibs() {
  const dest = join(ROOT, "node_modules", ".runtime-audit-browser");
  const libDir = join(dest, "lib");
  if (!existsSync(libDir) || readdirSync(libDir).length === 0) {
    const tarBr = join(ROOT, "node_modules", "@sparticuz", "chromium", "bin", "al2023.tar.br");
    if (!existsSync(tarBr)) throw new Error("al2023.tar.br غير موجود");
    mkdirSync(dest, { recursive: true });
    execSync(
      `node -e "import fs from 'node:fs'; import {brotliDecompressSync} from 'node:zlib'; fs.writeFileSync('${dest}/al2023.tar', brotliDecompressSync(fs.readFileSync('${tarBr}')))\"`,
      { stdio: "inherit" }
    );
    execSync(`tar -xf ${JSON.stringify(join(dest, "al2023.tar"))} -C ${JSON.stringify(dest)}`, { stdio: "inherit" });
    try {
      unlinkSync(join(dest, "al2023.tar"));
    } catch {
      /* ignore */
    }
  }
  process.env.LD_LIBRARY_PATH = `${libDir}:${process.env.LD_LIBRARY_PATH ?? ""}`;
  process.env.FONTCONFIG_PATH ??= "/tmp/fonts";
}
ensureBrowserLibs();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
};
const server = createServer((req, res) => {
  try {
    const url = new URL(req.url, "http://x");
    let p = decodeURIComponent(url.pathname);
    if (p.startsWith(BASE_URL)) p = p.slice(BASE_URL.length - 1);
    if (p === "/" || p === "") p = "/index.html";
    const file = join(DIST, p);
    if (!file.startsWith(DIST) || !existsSync(file) || !statSync(file).isFile()) {
      res.writeHead(404);
      res.end("nf");
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(500);
    res.end();
  }
});
await new Promise((r) => server.listen(0, "0.0.0.0", r));
const PORT = server.address().port;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const FONT_DIR = join(ROOT, "node_modules", "@fontsource", "noto-sans-arabic", "files");
const pickFont = (needle) => {
  try {
    const f = readdirSync(FONT_DIR).find((n) => n.includes(needle) && n.endsWith(".woff2"));
    return f ? readFileSync(join(FONT_DIR, f)) : null;
  } catch {
    return null;
  }
};
const fontFiles = new Map([
  ["ar400", pickFont("arabic-400-normal")],
  ["ar700", pickFont("arabic-700-normal")],
  ["latin400", pickFont("latin-400-normal")],
  ["latin700", pickFont("latin-700-normal")],
]);
const face = (family, file, weight) =>
  fontFiles.get(file)
    ? `@font-face{font-family:"${family}";src:url(/__fonts/${file}) format("woff2");font-weight:${weight};font-display:block}`
    : "";
const FONT_CSS = [
  face("Tajawal", "ar400", "400"),
  face("Tajawal", "ar700", "700"),
  face("Baloo Bhaijaan 2", "ar400", "400"),
  face("Baloo Bhaijaan 2", "ar700", "700"),
  face("Changa", "ar400", "400"),
  face("Changa", "ar700", "700"),
  face("Almarai", "ar400", "400"),
  face("Rubik", "latin400", "400"),
  face("Rubik", "latin700", "700"),
  face("Fredoka", "latin400", "400"),
  face("Fredoka", "latin700", "700"),
].join("\n");

let pass = 0;
let fail = 0;
const failures = [];
function check(scope, ok, detail) {
  if (ok) {
    pass++;
    console.log(`✓ [${scope}] ${detail}`);
  } else {
    fail++;
    failures.push(`${scope}: ${detail}`);
    console.log(`✗ [${scope}] ${detail}`);
  }
}

async function launchBrowser() {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await playwright.launch({
        executablePath: await chromium.executablePath(),
        args: chromium.args,
        headless: true,
      });
    } catch (err) {
      if (attempt === 2) throw err;
    }
  }
}

/** رمز Chrome المحسوب — نفس مفاتيح تدقيق الدفعة، مع railItemPadX. */
async function readSignature(page, isDesktop) {
  await page.mouse.move(0, 0);
  await page.waitForTimeout(220);
  return page.evaluate((desktop) => {
    const root = document.querySelector(".lesson-main-scroll")?.closest("div.h-screen") ?? null;
    const header = document.querySelector("header");
    const menuBtn = header?.querySelector("button[aria-label]") ?? null;
    const track = header?.querySelector(".overflow-hidden.rounded-full") ?? null;
    const trackInner = track?.firstElementChild ?? null;
    const pill = document.querySelector("div.pointer-events-auto");
    const nextBtn = pill
      ? Array.from(pill.querySelectorAll("button")).find((b) => (b.textContent || "").includes("التالي"))
      : null;
    const sig = {
      rootBg: root ? getComputedStyle(root).backgroundColor : null,
      menuAria: menuBtn ? menuBtn.getAttribute("aria-label") : null,
      menuBorderWidth: menuBtn ? getComputedStyle(menuBtn).borderTopWidth : null,
      trackHeight: track ? getComputedStyle(track).height : null,
      trackBg: track ? getComputedStyle(track).backgroundColor : null,
      progressImage: trackInner ? getComputedStyle(trackInner).backgroundImage : null,
      pillBorderWidth: pill ? getComputedStyle(pill).borderTopWidth : null,
      pillBorderColor: pill ? getComputedStyle(pill).borderTopColor : null,
      nextBg: nextBtn ? getComputedStyle(nextBtn).backgroundColor : null,
      inlineLockHost: Boolean(document.querySelector("[data-lesson-step-nav='true']")),
      styleB: root ? root.classList.contains("style-b") : null,
    };
    if (desktop) {
      const aside = document.querySelector("aside");
      const titleEl = aside?.querySelector(".font-head") ?? null;
      const subEl = aside?.querySelector('[dir="ltr"].text-xs') ?? null;
      const activeBtn = aside?.querySelector("nav button") ?? null;
      const badge = activeBtn?.querySelector("span") ?? null;
      const sectionLabels = Array.from(aside?.querySelectorAll("nav > div > div:first-child") ?? []);
      Object.assign(sig, {
        railTitleSize: titleEl ? getComputedStyle(titleEl).fontSize : null,
        railSubColor: subEl ? getComputedStyle(subEl).color : null,
        activeRailBg: activeBtn ? getComputedStyle(activeBtn).backgroundColor : null,
        activeBadgeBg: badge ? getComputedStyle(badge).backgroundColor : null,
        railGap: activeBtn ? getComputedStyle(activeBtn).columnGap : null,
        railItemPadX: activeBtn ? getComputedStyle(activeBtn).paddingInlineStart : null,
        sectionColors: [...new Set(sectionLabels.map((el) => getComputedStyle(el).color))].join(","),
      });
    }
    return sig;
  }, isDesktop);
}

/** رموز سكة الدرج على الجوال (نفس دالة rail() تُستخدم للسكة والدرج). */
async function readDrawerRail(page) {
  return page.evaluate(() => {
    const drawer = document.querySelector("#l30-mobile-navigation");
    const activeBtn = drawer?.querySelector("nav button[aria-current='step']") ?? drawer?.querySelector("nav button");
    if (!activeBtn) return null;
    const cs = getComputedStyle(activeBtn);
    return { activeRailBg: cs.backgroundColor, railGap: cs.columnGap, railItemPadX: cs.paddingInlineStart };
  });
}

const stepNow = (page) =>
  page.locator('[role="progressbar"]').first().getAttribute("aria-valuenow").then((v) => Number(v)).catch(() => NaN);
const pillCounter = (page) =>
  page.locator("div.pointer-events-auto span.rounded-lg").first().innerText().catch(() => "");

// مرجع رموز سكة الدرس 1 (من مقاس المكتب) لمقارنة درج الجوال بها.
let l1DesktopRail = null;

for (const vp of VIEWPORTS) {
  const isDesktop = vp.width >= 1024;
  const errors = [];
  const browser = await launchBrowser();
  try {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    await ctx.addInitScript(() => {
      try {
        localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
      } catch {
        /* ignore */
      }
    });
    const page = await ctx.newPage();
    await page.route("**/*fonts.googleapis.com/**", (r) => r.abort());
    await page.route("**/*fonts.gstatic.com/**", (r) => r.abort());
    await page.route("**/__fonts/*", (r) => {
      const name = r.request().url().split("/__fonts/")[1] ?? "";
      const body = fontFiles.get(name);
      return body ? r.fulfill({ status: 200, contentType: "font/woff2", body }) : r.abort();
    });
    await page.route("**/__fontfix.css", (r) =>
      r.fulfill({ status: 200, contentType: "text/css; charset=utf-8", body: FONT_CSS })
    );
    page.on("console", (m) => {
      if (m.type() === "error" && !/fonts\.googleapis|fonts\.gstatic|ERR_FAILED|__fonts/.test(m.text())) errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`PAGEERROR: ${String(e)}`));
    page.on("requestfailed", (req) => {
      if (!/fonts\.googleapis\.com|fonts\.gstatic\.com|\/__fonts\//.test(req.url())) errors.push(`REQUESTFAILED: ${req.url()}`);
    });

    // ===== المرجع: توقيع الدرس 1 =====
    await page.goto(`${ORIGIN}${BASE_URL}#/lesson/1`, { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ url: "/__fontfix.css" }).catch(() => {});
    await page.waitForSelector(".lesson-main-scroll", { timeout: 30000 });
    await page.waitForTimeout(700);
    const l1 = await readSignature(page, isDesktop);
    if (isDesktop) {
      l1DesktopRail = { activeRailBg: l1.activeRailBg, railGap: l1.railGap, railItemPadX: l1.railItemPadX };
    }

    const scope = `L30 ${vp.name}`;
    await page.goto(`${ORIGIN}${BASE_URL}#/lesson/${LESSON}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector('[role="progressbar"]', { timeout: 30000 });
    await page.waitForTimeout(800);

    // 1) سلامة العرض
    const bodyText = await page.locator("body").innerText();
    check(scope, !/خطأ في العرض|تعذّر عرض|Something went wrong|ErrorBoundary/i.test(bodyText), "لا Error Boundary مُطلَّق");
    check(scope, bodyText.length > 100, `محتوى الدرس حاضر (${bodyText.length} حرفًا)`);

    // 2) شريط التقدم المؤطّر + العدّاد داخل الشريط العائم (بنيوي محفوظ)
    check(scope, (await stepNow(page)) === 1, "progressbar يبدأ عند الخطوة 1");
    const vmax = await page.locator('[role="progressbar"]').first().getAttribute("aria-valuemax");
    check(scope, vmax === String(TOTAL), `aria-valuemax = ${TOTAL}`);
    const pc0 = (await pillCounter(page)).trim();
    check(scope, pc0 === `1 / ${TOTAL}`, `العدّاد داخل الشريط العائم = «${pc0}» (محفوظ)`);
    const vtext = await page.locator('[role="progressbar"]').first().getAttribute("aria-valuetext");
    check(scope, vtext === `الخطوة 1 من ${TOTAL}`, `aria-valuetext = «${vtext}» (محفوظ)`);

    // 3) RTL + style-b
    const dir = await page.evaluate(() => getComputedStyle(document.querySelector("main")).direction);
    check(scope, dir === "rtl", `اتجاه main = ${dir}`);
    const sig = await readSignature(page, isDesktop);
    check(scope, sig.styleB === true, "style-b حاضر على جذر الشل");

    // 4) مطابقة رموز Chrome المحسوبة مع الدرس 1 (بعد توحيد الرموز الثلاثة)
    const diffKeys = Object.keys(l1).filter((k) => !STRUCTURAL_KEYS.has(k) && k in sig && sig[k] !== l1[k]);
    check(
      scope,
      diffKeys.length === 0,
      diffKeys.length === 0
        ? `رموز Chrome المحسوبة تطابق الدرس 1 حرفيًا (${Object.keys(l1).length - STRUCTURAL_KEYS.size} رمزًا)`
        : `اختلاف: ${diffKeys.map((k) => `${k}=${JSON.stringify(sig[k])} vs ${JSON.stringify(l1[k])}`).join("; ")}`
    );

    // 5) البنود البنيوية الأربعة محفوظة
    const areaTabs = page.locator('header nav[aria-label="مناطق الدرس"] button');
    check(scope, (await areaTabs.count()) === 4, "تبويبات المناطق الأربع في الهيدر (محفوظة)");
    check(scope, (await areaTabs.first().getAttribute("aria-pressed")) === "true", "تبويب «الدرس» نشط بـ aria-pressed");
    const lockBadge = await page.locator('header nav[aria-label="مناطق الدرس"] [aria-label="مقفل"]').count();
    check(scope, lockBadge === 1, "مؤشر قفل الحلول ظاهر في التبويب (محفوظ)");
    const framed = await page.evaluate(() => {
      const track = document.querySelector("header .overflow-hidden.rounded-full");
      return Boolean(track?.closest("div.rounded-2xl"));
    });
    check(scope, framed, "شريط التقدم المؤطّر «خطوة N من M» + نسبة (محفوظ)");
    const pct = await page.locator(".l30-progress-row span").last().innerText().catch(() => "");
    check(scope, /٪/.test(pct), `النسبة المئوية ظاهرة في شريط التقدم (${pct.trim()})`);
    const exitBtn = page.locator("button.l30-mobile-exit");
    check(scope, (await exitBtn.count()) === 1, "زر خروج الجوال موجود في DOM (محفوظ)");
    check(scope, (await exitBtn.isVisible()) === !isDesktop, `زر خروج الجوال ${isDesktop ? "مخفي على المكتب" : "ظاهر على الجوال"}`);
    const headerChip = await page.locator("header span.rounded-lg").count();
    check(scope, headerChip === 0, "لا عدّاد في الهيدر (العدّاد داخل الشريط — بنيوي محفوظ)");

    // 6) قفل الموقع في منطقة الدرس (مضيف pill)
    check(scope, (await page.locator('[data-site-lock-button="true"]:visible').count()) >= 1, "زر قفل الموقع مُحقَن في الشريط العائم");
    const lockHost = await page.locator(".l30-floating-nav").getAttribute("data-site-lock-host").catch(() => null);
    check(scope, lockHost === "pill", `مضيف القفل = pill على الشريط العائم (${lockHost})`);

    // 7) التالي/السابق
    const pill = page.locator("div.pointer-events-auto");
    await pill.locator("button", { hasText: "التالي" }).first().click();
    await page.waitForTimeout(300);
    check(scope, (await stepNow(page)) === 2, "التالي: تقدّم إلى الخطوة 2");
    await pill.locator("button", { hasText: "السابق" }).first().click();
    await page.waitForTimeout(300);
    check(scope, (await stepNow(page)) === 1, "السابق: عودة إلى الخطوة 1");

    // 8) التنقّل: السكة (مكتب) أو الدرج (جوال)
    if (isDesktop) {
      const railStep = page.locator("aside:visible nav button").nth(4);
      const label = (await railStep.innerText()).trim();
      await railStep.click();
      await page.waitForTimeout(300);
      check(scope, (await stepNow(page)) === 5, `نقر السكة (${label.slice(0, 28)}) → الخطوة 5`);
      await page.locator("aside:visible nav button").nth(0).click();
      await page.waitForTimeout(250);
      check(scope, (await stepNow(page)) === 1, "العودة للخطوة 1 عبر السكة");
    } else {
      const menuBtn = page.locator('button[aria-label="فهرس الدرس"]');
      check(scope, (await menuBtn.count()) === 1, "زر ☰ بعنوان «فهرس الدرس»");
      await menuBtn.click();
      await page.waitForTimeout(320);
      const drawerStep = page.locator("#l30-mobile-navigation nav button").nth(4);
      check(scope, await drawerStep.isVisible().catch(() => false), "الدرج انفتح وعناصره مرئية");
      await drawerStep.click();
      await page.waitForTimeout(340);
      check(scope, (await stepNow(page)) === 5, "اختيار داخل الدرج → الخطوة 5");
      check(scope, (await page.locator("#l30-mobile-navigation").count()) === 0, "الدرج انغلق بعد الاختيار");
      // رموز السكة الثلاثة داخل الدرج تطابق مرجع الدرس 1 (نفس دالة rail)
      await menuBtn.click();
      await page.waitForTimeout(300);
      const drawerRail = await readDrawerRail(page);
      if (l1DesktopRail && drawerRail) {
        for (const k of ["activeRailBg", "railGap", "railItemPadX"]) {
          check(scope, drawerRail[k] === l1DesktopRail[k], `درج الجوال ${k} = ${drawerRail[k]} (يطابق الدرس 1)`);
        }
      }
      await page.keyboard.press("Escape");
      await page.waitForTimeout(280);
    }

    // 9) لوحة المفاتيح (الأسهم فقط — Space لا ينتقل، سلوك محفوظ)
    await page.locator(".l30-progress-row span").first().click();
    const beforeKey = await stepNow(page);
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(240);
    const afterKey = await stepNow(page);
    check(scope, afterKey === beforeKey + 1, "ArrowLeft ينتقل للتالي");
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(240);
    check(scope, (await stepNow(page)) === beforeKey, "ArrowRight يعود للسابق");
    await page.keyboard.press("Space");
    await page.waitForTimeout(240);
    check(scope, (await stepNow(page)) === beforeKey, "Space لا ينتقل (سلوك L30 محفوظ — لا دعم Space)");

    // 10) المناطق الأربع عبر تبويبات الهيدر (محفوظة) + سلوك حالة الاختبار
    const openArea = async (label) => {
      await page.locator('header nav[aria-label="مناطق الدرس"] button', { hasText: label }).first().click();
      await page.waitForTimeout(420);
    };
    const answeredCount = async () => {
      const txt = await page.locator('[data-area="l30-test"] button', { hasText: "إنهاء الاختبار" }).first().innerText().catch(() => "");
      const m = txt.match(/\((\d+)\s*\/\s*(\d+)\)/);
      return m ? Number(m[1]) : NaN;
    };

    await openArea("الاختبار");
    check(scope, (await page.locator('[data-area="l30-test"]').count()) === 1, "منطقة الاختبار تُفتح عبر تبويب الهيدر");
    check(scope, (await page.locator('[role="progressbar"]').count()) === 0, "شريط التقدم يغيب خارج منطقة الدرس (محفوظ)");
    check(scope, (await page.locator(".l30-floating-nav").count()) === 0, "الشريط العائم يغيب خارج منطقة الدرس (محفوظ)");
    check(scope, (await page.locator('[data-site-lock-button="true"]:visible').count()) >= 1, "زر القفل يبقى متاحًا في منطقة الاختبار (column-footer)");
    const testHost = await page.evaluate(() => document.querySelector("[data-site-lock-host]")?.getAttribute("data-site-lock-host") ?? null);
    check(scope, testHost === "column-footer", `مضيف القفل في منطقة الاختبار = ${testHost} (محفوظ)`);
    // حالة الاختبار: إجابة ثم تبديل منطقة ثم عودة → تصفير (سلوك محفوظ)
    const a0 = await answeredCount();
    await page.locator('[data-test-q="1"] button').first().click();
    await page.waitForTimeout(200);
    const a1 = await answeredCount();
    check(scope, a0 === 0 && a1 === 1, `عدّاد الإجابات ${a0} → ${a1} بعد النقر`);
    await openArea("الدرس");
    await openArea("الاختبار");
    const a2 = await answeredCount();
    check(scope, a2 === 0, `تبديل المنطقة ثم العودة يصفّر الإجابات (${a2}) — سلوك L30 محفوظ`);

    await openArea("الحلول");
    const solText = await page.locator('[data-area="l30-solutions"]').innerText().catch(() => "");
    check(scope, /مقفلة|مقفل|الاختبار/i.test(solText), "منطقة الحلول تُفتح بحالتها المقفلة المقصودة");

    await openArea("المعلم");
    check(scope, (await page.locator('[data-area="l30-teacher"]').count()) === 1, "منطقة المعلم تُفتح");
    check(scope, (await page.locator('[data-area="l30-teacher"] input').count()) >= 1, "حقل كلمة مرور المعلم حاضر");

    await openArea("الدرس");
    check(scope, (await page.locator('[role="progressbar"]').count()) === 1, "العودة لمنطقة الدرس تستعيد شريط التقدم");
    // العدّاد يعكس الخطوة الحالية (قد تختلف بين مسار المكتب ومسار الجوال) — ليس بالضرورة 1.
    const backStep = await stepNow(page);
    const backPill = (await pillCounter(page)).trim();
    check(scope, backPill === `${backStep} / ${TOTAL}`, `العودة تستعيد العدّاد داخل الشريط (${backPill}، الخطوة ${backStep})`);

    // 11) إمكانية وصول الدرج (جوال فقط)
    if (!isDesktop) {
      const menuBtn = page.locator('button[aria-label="فهرس الدرس"]');
      await menuBtn.click();
      await page.waitForTimeout(320);
      const drawer = page.locator("#l30-mobile-navigation");
      check(scope, (await drawer.getAttribute("role")) === "dialog", "الدرج role=dialog (محفوظ)");
      check(scope, (await drawer.getAttribute("aria-modal")) === "true", "الدرج aria-modal=true (محفوظ)");
      check(scope, (await menuBtn.getAttribute("aria-expanded")) === "true", "زر ☰ aria-expanded=true عند الفتح");
      const focusInside = await page.evaluate(() => {
        const d = document.querySelector("#l30-mobile-navigation");
        return Boolean(d && d.contains(document.activeElement));
      });
      check(scope, focusInside, "التركيز انتقل داخل الدرج عند الفتح (focus trap)");
      // حصر Tab داخل الدرج
      await page.keyboard.press("Tab");
      await page.waitForTimeout(120);
      const stillInside = await page.evaluate(() => {
        const d = document.querySelector("#l30-mobile-navigation");
        return Boolean(d && d.contains(document.activeElement));
      });
      check(scope, stillInside, "Tab يبقى داخل الدرج (focus trap محفوظ)");
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      check(scope, (await page.locator("#l30-mobile-navigation").count()) === 0, "Escape يغلق الدرج");
      const focusReturned = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") === "فهرس الدرس");
      check(scope, focusReturned, "التركيز عاد إلى زر ☰ بعد الإغلاق (focus return محفوظ)");
      // زر الإغلاق ×
      await menuBtn.click();
      await page.waitForTimeout(300);
      await page.locator('#l30-mobile-navigation button[aria-label="إغلاق فهرس خطوات الدرس"]').click();
      await page.waitForTimeout(300);
      check(scope, (await page.locator("#l30-mobile-navigation").count()) === 0, "زر × يغلق الدرج");
      // زر خروج الجوال الوظيفي
      await page.locator("button.l30-mobile-exit").click();
      await page.waitForTimeout(400);
      check(scope, !page.url().includes("/lesson/30"), "زر «← خروج» يغادر الدرس (محفوظ)");
      await page.goto(`${ORIGIN}${BASE_URL}#/lesson/30`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector('[role="progressbar"]', { timeout: 30000 });
      await page.waitForTimeout(600);
    }

    // 12) قفل الموقع ثم استعادة الجلسة
    await page.locator('[data-site-lock-button="true"]:visible').first().click();
    await page.waitForTimeout(300);
    check(scope, await page.locator("#site-password").isVisible(), "النقر على القفل يعرض بوابة كلمة المرور");
    check(
      scope,
      await page.evaluate(() => localStorage.getItem("englishwithsomer-site-unlocked") !== "unlocked"),
      "القفل أزال حالة فتح الموقع"
    );
    await page.evaluate(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector('[role="progressbar"]', { timeout: 30000 });
    await page.addStyleTag({ url: "/__fontfix.css" }).catch(() => {});
    await page.waitForTimeout(600);

    // 13) جولة كاملة على 46 شريحة + تفاعل
    let walked = 0;
    let interacted = false;
    const walkErrorsBefore = errors.length;
    for (let i = 0; i < TOTAL; i++) {
      await page.waitForTimeout(70);
      const container = page.locator(".lesson-content-container").first();
      const textLen = (await container.innerText().catch(() => "")).replace(/\s+/g, " ").trim().length;
      if (textLen > 40) walked++;
      else check(scope, false, `الشريحة ${i + 1}: محتوى غير فارغ (${textLen} حرفًا)`);

      if (!interacted && i >= 2 && i < TOTAL - 3) {
        const mainBtns = page.locator("main button:not([disabled])");
        if ((await mainBtns.count()) >= 2) {
          await mainBtns.nth(1).click();
          await page.waitForTimeout(60);
          const afterLen = (await container.innerText().catch(() => "")).replace(/\s+/g, " ").trim().length;
          if (afterLen > 40) interacted = true;
        }
      }
      if (i < TOTAL - 1) {
        await page.locator("div.pointer-events-auto button", { hasText: "التالي" }).first().click();
        await page.waitForTimeout(90);
      }
    }
    const finalStep = await stepNow(page);
    const finalPill = (await pillCounter(page)).trim();
    check(scope, walked === TOTAL, `جولة كاملة: ${walked}/${TOTAL} شريحة رُسمت غير فارغة`);
    check(scope, finalStep === TOTAL && finalPill === `${TOTAL} / ${TOTAL}`, `وصلت لآخر شريحة (progressbar=${finalStep}، العدّاد=${finalPill})`);
    check(scope, interacted, "تفاعل عناصر المختبر/التمارين داخل الشريحة يعمل دون خطأ");
    const walkErrors = errors.slice(walkErrorsBefore).filter(
      (e) => e.startsWith("PAGEERROR:") || e.startsWith("REQUESTFAILED:") || !/fonts\.g|ERR_FAILED|net::ERR/.test(e)
    );
    check(scope, walkErrors.length === 0, walkErrors.length === 0 ? "لا أخطاء أثناء الجولة الكاملة" : `أخطاء: ${walkErrors.slice(0, 2).join(" | ")}`);

    await ctx.close();
  } finally {
    await browser.close().catch(() => {});
  }

  const real = errors.filter(
    (e) => e.startsWith("PAGEERROR:") || e.startsWith("REQUESTFAILED:") || !/fonts\.g|ERR_FAILED|net::ERR/.test(e)
  );
  check(`console ${vp.name}`, real.length === 0, real.length === 0 ? "صفر أخطاء console حقيقية" : `أخطاء: ${real.slice(0, 3).join(" | ")}`);
}

console.log(`\n===== fix5 L30 interactions: ${pass} نجح · ${fail} فشل =====`);
if (fail) {
  console.log(failures.map((f) => " - " + f).join("\n"));
  process.exitCode = 1;
}
server.close();
