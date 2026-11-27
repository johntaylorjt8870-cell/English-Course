#!/usr/bin/env node
/**
 * Fix #5 Batch 8: Lesson 29 desktop + mobile interactions, Lesson-1 computed-chrome parity,
 * area switching (الدرس/الاختبار/الحلول/المعلم), site lock, drawer, keyboard, and a full walk
 * of all 48 slides in both viewports.
 *
 * تشغيل بعد npm run build:  node scripts/audit-fix5-lesson29-interactions.mjs
 *
 * ملاحظات:
 *  - L29 شل محلي (ليس Lesson1Shell)؛ لذا تقارن رموز Chrome المحسوبة مع #/lesson/1 في نفس
 *    المتصفح والمقاس. الفروق البنيوية المقصودة (عدّاد الشرائح داخل الهيدر، عدم وجود inline
 *    lock host، كتلة AREAS في رأس السكة) مستثناة صراحةً من المقارنة، وكل ما عداها ===.
 *  - لم يُغيَّر أي سلوك في الاختبار: الدروس الأخرى لا تُلمس، والفحص قراءة فقط.
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
const LESSON = 29;
const TOTAL = 48;
const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "mobile-375x812", width: 375, height: 812 },
];
// رموز بنيوية مقصودة في L29 (تُحفظ ولا تُقارن): عدّاد الشرائح في الهيدر وغياب inline lock host
// (منطقة AREAS داخل رأس السكة لا تدخل في قياس الـChrome أصلًا لأنها ليست عناصر `<nav>`).
const STRUCTURAL_KEYS = new Set(["inlineLockHost", "counter", "slideCounterAttr"]);

// ===== مكتبات النظام =====
function ensureBrowserLibs() {
  const dest = join(ROOT, "node_modules", ".runtime-audit-browser");
  const libDir = join(dest, "lib");
  if (!existsSync(libDir) || readdirSync(libDir).length === 0) {
    const tarBr = join(ROOT, "node_modules", "@sparticuz", "chromium", "bin", "al2023.tar.br");
    if (!existsSync(tarBr)) throw new Error("al2023.tar.br غير موجود");
    mkdirSync(dest, { recursive: true });
    execSync(
      `node -e "import fs from 'node:fs'; import {brotliDecompressSync} from 'node:zlib'; fs.writeFileSync('${dest}/al2023.tar', brotliDecompressSync(fs.readFileSync('${tarBr}')))"`,
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

const heading = (page) =>
  page.locator("header div.truncate").first().innerText().catch(() => "");

/** توقيع Chrome المحسوب — نفس مفاتيح سكربت ما قبل الدفعة. */
async function readSignature(page, isDesktop) {
  await page.mouse.move(0, 0);
  await page.waitForTimeout(180);
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
        sectionColors: [...new Set(sectionLabels.map((el) => getComputedStyle(el).color))].join(","),
      });
    }
    return sig;
  }, isDesktop);
}

for (const vp of VIEWPORTS) {
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
    const l1 = await readSignature(page, vp.width >= 1024);

    const scope = `L29 ${vp.name}`;
    await page.goto(`${ORIGIN}${BASE_URL}#/lesson/${LESSON}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-slide-counter]", { timeout: 30000 });
    await page.waitForTimeout(800);

    // 1) سلامة العرض
    const bodyText = await page.locator("body").innerText();
    check(scope, !/خطأ في العرض|تعذّر عرض|Something went wrong|ErrorBoundary/i.test(bodyText), "لا Error Boundary مُطلَّق");
    check(scope, bodyText.length > 100, `محتوى الدرس حاضر (${bodyText.length} حرفًا)`);

    // 2) العدّاد = 48 شريحة
    const counter = await page.locator("[data-slide-counter]").first().innerText();
    check(scope, (counter.match(/\d+/g) ?? []).includes(String(TOTAL)), `العدّاد يعرض ${TOTAL} (وُجد: ${counter.trim()})`);

    // 3) RTL + style-b
    const dir = await page.evaluate(() => getComputedStyle(document.querySelector("main")).direction);
    check(scope, dir === "rtl", `اتجاه main = ${dir}`);
    const sig = await readSignature(page, vp.width >= 1024);
    check(scope, sig.styleB === true, "style-b حاضر على جذر الشل (كما في المرجع)");

    // 4) مطابقة رموز Chrome المحسوبة مع الدرس 1
    const diffKeys = Object.keys(l1).filter((k) => !STRUCTURAL_KEYS.has(k) && k in sig && sig[k] !== l1[k]);
    check(
      scope,
      diffKeys.length === 0,
      diffKeys.length === 0
        ? `رموز Chrome المحسوبة تطابق الدرس 1 حرفيًا (${Object.keys(l1).length - STRUCTURAL_KEYS.size} رمزًا)`
        : `اختلاف: ${diffKeys.map((k) => `${k}=${JSON.stringify(sig[k])} vs ${JSON.stringify(l1[k])}`).join("; ")}`
    );

    // 5) قفل الموقع
    check(scope, (await page.locator('[data-site-lock-button="true"]:visible').count()) >= 1, "زر قفل الموقع مُحقَن في الشريط العائم");

    // 6) التالي/السابق
    const pill = page.locator("div.pointer-events-auto");
    const t0 = await heading(page);
    await pill.locator("button", { hasText: "التالي" }).first().click();
    await page.waitForTimeout(320);
    const t1 = await heading(page);
    check(scope, Boolean(t1) && t1 !== t0, `التالي: تغيّرت الشريحة (${(t0 || "").slice(0, 32)} → …)`);
    await pill.locator("button", { hasText: "السابق" }).first().click();
    await page.waitForTimeout(320);
    check(scope, (await heading(page)) === t0, "السابق: عودة للشريحة الأولى");

    // 7) التنقّل: السكة (مكتب) أو الدرج (جوال)
    const railStep = page.locator("aside:visible nav button").nth(4);
    const railVisible = await railStep.isVisible().catch(() => false);
    if (railVisible) {
      const label = (await railStep.innerText()).trim();
      await railStep.click();
      await page.waitForTimeout(320);
      const t3 = await heading(page);
      check(scope, Boolean(t3) && t3 !== t0, `نقر السكة (${label.slice(0, 30)}) → شريحة جديدة`);
      await page.locator("aside:visible nav button").nth(0).click();
      await page.waitForTimeout(250);
    } else {
      const menuBtn = page.locator('button[aria-label="فهرس الدرس"]');
      check(scope, (await menuBtn.count()) === 1, "زر ☰ بعنوان «فهرس الدرس»");
      await menuBtn.click();
      await page.waitForTimeout(320);
      const drawerStep = page.locator("aside:visible nav button").nth(4);
      check(scope, await drawerStep.isVisible().catch(() => false), "الدرج انفتح وعناصره مرئية");
      const dLabel = (await drawerStep.innerText().catch(() => "")).trim();
      await drawerStep.click();
      await page.waitForTimeout(360);
      const t4 = await heading(page);
      check(scope, Boolean(t4) && t4 !== t0, `اختيار داخل الدرج (${dLabel.slice(0, 28)}) → شريحة جديدة`);
      check(scope, (await page.locator("aside:visible").count()) === 0, "الدرج انغلق بعد الاختيار");
    }

    // 8) لوحة المفاتيح من الهيدر (L29 يتجاهل الأسهم عند تركيز BUTTON — سلوك أصلي)
    await page.locator("header div.truncate").first().click();
    const beforeKey = await heading(page);
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(240);
    const afterKey = await heading(page);
    check(scope, afterKey !== beforeKey, "ArrowLeft من الهيدر ينتقل للتالي");
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(240);
    check(scope, (await heading(page)) === beforeKey, "ArrowRight يعود للسابق");
    await page.keyboard.press("Space");
    await page.waitForTimeout(240);
    check(scope, (await heading(page)) === afterKey, "Space ينتقل للتالي");

    // 9) المناطق الأربع (بنية محفوظة: أزرار داخل السكة/الدرج)
    const openArea = async (label) => {
      if (vp.width >= 1024) {
        await page.locator("aside:visible").locator("button", { hasText: label }).first().click();
      } else {
        await page.locator('button[aria-label="فهرس الدرس"]').click();
        await page.waitForTimeout(280);
        await page.locator("aside:visible").locator("button", { hasText: label }).first().click();
        await page.waitForTimeout(280);
      }
      await page.waitForTimeout(420);
    };
    const visibleAreaText = () =>
      page.locator(".lesson-content-container:not([hidden])").first().innerText().catch(() => "");

    await openArea("الاختبار");
    let areaText = await visibleAreaText();
    check(scope, areaText.length > 50 && !/Error/i.test(areaText), `منطقة الاختبار تُفتح (${areaText.length} حرفًا)`);
    check(scope, !(await heading(page)).includes(String(TOTAL)), "هيدر منطقة الاختبار لا يعرض عدّاد الشرائح");
    check(scope, (await page.locator("[data-slide-counter]:visible").count()) === 0, "العدّاد يختفي خارج منطقة الدرس");

    await openArea("الحلول");
    areaText = await visibleAreaText();
    check(scope, /قفل|مقفل|الاختبار/i.test(areaText), "منطقة الحلول تُفتح بحالتها المقفلة المقصودة");

    await openArea("المعلم");
    areaText = await visibleAreaText();
    check(scope, /كلمة المرور|مقفل|المعلم/i.test(areaText), "منطقة المعلم تُفتح بحالتها المقفلة المقصودة");
    check(scope, (await page.locator('input[type="password"], input[type="text"]').count()) >= 1, "حقل كلمة مرور المعلم حاضر");

    await openArea("الدرس");
    check(scope, (await page.locator("[data-slide-counter]:visible").count()) === 1, "العودة لمنطقة الدرس تستعيد العدّاد");

    // 10) قفل الموقع ثم استعادة الجلسة
    await page.locator('[data-site-lock-button="true"]:visible').first().click();
    check(scope, await page.locator("#site-password").isVisible(), "النقر على القفل يعرض بوابة كلمة المرور");
    check(
      scope,
      await page.evaluate(() => localStorage.getItem("englishwithsomer-site-unlocked") !== "unlocked"),
      "القفل أزال حالة فتح الموقع"
    );
    await page.evaluate(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-slide-counter]", { timeout: 30000 });
    await page.waitForTimeout(600);

    // 11) جولة كاملة على 48 شريحة + تفاعل
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
    const finalCounter = (await page.locator("[data-slide-counter]").first().innerText()).match(/\d+/g) ?? [];
    check(scope, walked === TOTAL, `جولة كاملة: ${walked}/${TOTAL} شريحة رُسمت غير فارغة`);
    check(scope, finalCounter.length >= 2 && finalCounter[0] === String(TOTAL) && finalCounter[1] === String(TOTAL), `وصلت لآخر شريحة (العدّاد: ${finalCounter.join(" / ")})`);
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

console.log(`\n===== fix5 L29 interactions: ${pass} نجح · ${fail} فشل =====`);
if (fail) {
  console.log(failures.map((f) => " - " + f).join("\n"));
  process.exitCode = 1;
}
server.close();
