/** Fix #5: L16/L17 desktop and mobile interactions, including the inherited focused-button keyboard behavior. Run after npm run build. */
import { createServer } from "node:http";
import { existsSync, readFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { execSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const DIST = join(ROOT, "dist");
const BASE_URL = "/English-Course/";
const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "mobile-375x812", width: 375, height: 812 },
];
const LESSONS = { 16: 46, 17: 53 }; // lesson → عدد الشرائح المتوقع

// ===== مكتبات النظام (نفس نمط audit-runtime: استخراج al2023) =====
function ensureBrowserLibs() {
  const dest = join(ROOT, "node_modules", ".runtime-audit-browser");
  const libDir = join(dest, "lib");
  if (!existsSync(libDir) || readdirSync(libDir).length === 0) {
    const tarBr = join(ROOT, "node_modules", "@sparticuz", "chromium", "bin", "al2023.tar.br");
    if (!existsSync(tarBr)) throw new Error("al2023.tar.br غير موجود");
    mkdirSync(dest, { recursive: true });
    execSync(`node -e "import fs from 'node:fs'; import {brotliDecompressSync} from 'node:zlib'; fs.writeFileSync('${dest}/al2023.tar', brotliDecompressSync(fs.readFileSync('${tarBr}')))"`, { stdio: "inherit" });
    execSync(`tar -xf ${JSON.stringify(join(dest, "al2023.tar"))} -C ${JSON.stringify(dest)}`, { stdio: "inherit" });
    try { unlinkSync(join(dest, "al2023.tar")); } catch {}
  }
  process.env.LD_LIBRARY_PATH = `${libDir}:${process.env.LD_LIBRARY_PATH ?? ""}`;
}
ensureBrowserLibs();

// ===== خادم static لـ dist =====
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json", ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon" };
const server = createServer((req, res) => {
  try {
    const url = new URL(req.url, "http://x");
    let p = decodeURIComponent(url.pathname);
    if (p.startsWith(BASE_URL)) p = p.slice(BASE_URL.length - 1);
    if (p === "/" || p === "") p = "/index.html";
    const file = join(DIST, p);
    if (!file.startsWith(DIST) || !existsSync(file) || !statSync(file).isFile()) { res.writeHead(404); res.end("nf"); return; }
    res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  } catch { res.writeHead(500); res.end(); }
});
await new Promise((r) => server.listen(0, "0.0.0.0", r));
const PORT = server.address().port;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const FONT_CSS = `@font-face{font-family:'Noto Sans Arabic';src:url('/__fonts/noto.woff2') format('woff2');font-weight:100 900;font-display:swap}`;
const notoWoff2 = (() => {
  try {
    const base = join(ROOT, "node_modules", "@fontsource", "noto-sans-arabic", "files");
    const f = readdirSync(base).find((n) => n.includes("arabic-400-normal") && n.endsWith(".woff2"));
    return f ? readFileSync(join(base, f)) : null;
  } catch { return null; }
})();

let pass = 0, fail = 0;
const failures = [];
function check(scope, ok, detail) {
  if (ok) { pass++; console.log(`✓ [${scope}] ${detail}`); }
  else { fail++; failures.push(`${scope}: ${detail}`); console.log(`✗ [${scope}] ${detail}`); }
}

const slideHeading = (page) =>
  page.locator("header div.truncate").first().innerText().catch(() => "");

for (const vp of VIEWPORTS) {
  const errors = [];
  const browser = await playwright.launch({
    executablePath: await chromium.executablePath(), // @sparticuz/chromium
    args: chromium.args,
    headless: true,
  });
  try {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    await ctx.addInitScript(() => {
      try { localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"); } catch { /* ignore */ }
    });
    const page = await ctx.newPage();
    await page.route("**/*fonts.googleapis.com/**", (r) => r.abort());
    await page.route("**/*fonts.gstatic.com/**", (r) => r.abort());
    await page.route("**/__fonts/noto.woff2", (r) => notoWoff2 ? r.fulfill({ status: 200, contentType: "font/woff2", body: notoWoff2 }) : r.abort());
    await page.route("**/__fontfix.css", (r) => r.fulfill({ status: 200, contentType: "text/css; charset=utf-8", body: FONT_CSS }));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(`PAGEERROR: ${String(e)}`));
    page.on("requestfailed", (req) => { if (!/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(req.url())) errors.push(`REQUESTFAILED: ${req.url()}`); });

    let first = true;
    for (const [lesson, total] of Object.entries(LESSONS)) {
      const scope = `L${lesson} ${vp.name}`;
      await page.goto(`${ORIGIN}${BASE_URL}#/lesson/${lesson}`, { waitUntil: "domcontentloaded" });
      if (first) { await page.addStyleTag({ url: "/__fontfix.css" }).catch(() => {}); first = false; }
      await page.waitForSelector("header span.rounded-lg", { timeout: 25000 });
      await page.waitForTimeout(700);

      // 1) لا Error Boundary / لا صفحة بيضاء
      const bodyText = await page.locator("body").innerText();
      check(scope, !/خطأ في العرض|Something went wrong|ErrorBoundary/i.test(bodyText), "لا Error Boundary مُطلَّق");
      check(scope, bodyText.length > 100, `محتوى الدرس حاضر (${bodyText.length} حرفًا)`);

      // 2) عدّاد الشرائح = سلامة المحتوى
      const counter = await page.locator("header span.rounded-lg").first().innerText();
      const nums = counter.match(/\d+/g) ?? [];
      check(scope, nums.includes(String(total)), `العدّاد يعرض ${total} شريحة (وُجد: ${counter.trim()})`);

      // 3) اتجاه الصفحة RTL
      const dir = await page.evaluate(() => getComputedStyle(document.querySelector("main")).direction);
      check(scope, dir === "rtl", `اتجاه main = ${dir}`);

      // 4) زر قفل الموقع حاضر
      const lock = await page.locator("text=قفل الموقع").count();
      check(scope, lock >= 1, "زر قفل الموقع حاضر");

      // 5) التالي/السابق (مضمّنة في حاوية الشريط السفلي فقط)
      const pill = page.locator("div.pointer-events-auto");
      const t0 = await slideHeading(page);
      await pill.locator("button", { hasText: "التالي" }).first().click();
      await page.waitForTimeout(400);
      const t1 = await slideHeading(page);
      check(scope, Boolean(t1) && t1 !== t0, `التالي: شريحة تغيّرت (${(t0 || "").slice(0, 35)} → …)`);
      await pill.locator("button", { hasText: "السابق" }).first().click();
      await page.waitForTimeout(400);
      const t2 = await slideHeading(page);
      check(scope, t2 === t0, "السابق: عودة للشريحة الأولى");

      // 6) تنقّل السكة (مكتب) أو درج الجوال
      const railStep = page.locator("aside:visible button").nth(4); // [0]=خروج، [1..]=الشرائح
      const railVisible = await railStep.isVisible().catch(() => false);
      if (railVisible) {
        const label = (await railStep.innerText()).trim();
        await railStep.click();
        await page.waitForTimeout(400);
        const t3 = await slideHeading(page);
        check(scope, Boolean(t3) && t3 !== t0, `نقر السكة (${label.slice(0, 32)}) → شريحة جديدة`);
        await page.locator("aside:visible button").nth(1).click(); // عودة للأول
        await page.waitForTimeout(300);
      } else {
        const menuBtn = page.locator('button[aria-label="فهرس الدرس"]');
        check(scope, (await menuBtn.count()) === 1, "زر ☰ بعنوان «فهرس الدرس» موجود");
        await menuBtn.click();
        await page.waitForTimeout(400);
        const drawerStep = page.locator("aside:visible button").nth(4);
        check(scope, await drawerStep.isVisible().catch(() => false), "الدرج انفتح وعناصره مرئية");
        const dLabel = (await drawerStep.innerText().catch(() => "")).trim();
        await drawerStep.click();
        await page.waitForTimeout(500);
        const t4 = await slideHeading(page);
        check(scope, Boolean(t4) && t4 !== t0, `نقر بداخل الدرج (${dLabel.slice(0, 32)}) → شريحة جديدة`);
        const drawerLeft = await page.locator("aside:visible").count();
        check(scope, drawerLeft === 0, "الدرج انغلق بعد اختيار الشريحة");
      }

      // A focused rail button suppresses arrows in both original lessons. No blur workaround.
      if (railVisible) {
        const beforeFocused = await slideHeading(page);
        await page.keyboard.press("ArrowLeft");
        await page.waitForTimeout(200);
        check(scope, (await slideHeading(page)) === beforeFocused, "ArrowLeft مع تركيز زر السكة لا يتنقل (السلوك الأصلي)");
      }
      // User clicks a non-interactive header to move focus naturally.
      await page.locator("header div.truncate").first().click();
      const beforeKey = await slideHeading(page);
      await page.keyboard.press("ArrowLeft");
      await page.waitForTimeout(250);
      const afterKey = await slideHeading(page);
      check(scope, afterKey !== beforeKey, "ArrowLeft من الهيدر ينتقل للتالي");
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(250);
      check(scope, (await slideHeading(page)) === beforeKey, "ArrowRight من الهيدر يعود للسابق");
      await page.keyboard.press("Space");
      await page.waitForTimeout(250);
      check(scope, (await slideHeading(page)) === afterKey, "Space من الهيدر ينتقل للتالي");

      await page.locator('[data-site-lock-button="true"]:visible').first().click();
      check(scope, await page.locator('#site-password').isVisible(), "النقر على القفل يعرض بوابة كلمة المرور");
      check(scope, await page.evaluate(() => localStorage.getItem("englishwithsomer-site-unlocked") !== "unlocked"), "القفل أزال حالة فتح الموقع");
      // Restore the fixture for the next route; hash navigation alone does not remount the gate.
      await page.evaluate(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
      await page.reload({ waitUntil: "domcontentloaded" });

    }

    await ctx.close();
  } finally {
    await browser.close().catch(() => {});
  }

  // فلترة الأخطاء البيئية (خطوط Google محجوبة عمداً في هذا البيئة)
  const real = errors.filter((e) => e.startsWith("PAGEERROR:") || e.startsWith("REQUESTFAILED:") || !/fonts\.g|ERR_FAILED|net::ERR/.test(e));
  check(`console ${vp.name}`, real.length === 0, real.length === 0 ? "صفر أخطاء console حقيقية" : `أخطاء: ${real.slice(0, 3).join(" | ")}`);
}

console.log(`\n===== fix5 interactions: ${pass} نجح · ${fail} فشل =====`);
if (fail) { console.log(failures.map((f) => " - " + f).join("\n")); process.exitCode = 1; }
server.close();
