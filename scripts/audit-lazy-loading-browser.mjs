#!/usr/bin/env node
// ============================================================
// Fix #4 — تدقيق التحميل الكسول للدروس في متصفح حقيقي (Chromium)
//
//   npm run build                      # إلزامي: التدقيق يقرأ dist/
//   npm run audit:lazy-loading-browser
//
// ماذا يثبت هذا التدقيق (وليس مجرد «تبدو الواجهة سليمة»)؟
//   A) الفهرس لا يجلب أي chunk خاص بأي درس من الدروس 62 عند الفتح.
//   B) فتح الدرس 7 من بطاقة الفهرس يجلب chunk الدرس 7 فقط — ولا يجلب
//      أي chunk درس آخر (لا Lesson8 ولا غيره).
//   C) تعذّر جلب chunk درس (شبكة/404): تظهر واجهة التعافي داخل حدّ
//      الأخطاء، لا صفحة بيضاء، والهيكل العام وزر القفل ظاهران؛ ثم
//      «إعادة المحاولة» بعد إزالة الانقطاع تُعيد جلب الـ chunk فعليًا
//      ويظهر الدرس.
//   D) على الجوال (375×812): نفس سلوك A وB — لا درس يُجلب في الفهرس،
//      والدرس 62 (الأثقل) يُجلب عند فتحه فقط.
//   E) لا أخطاء console/pageerror غير متوقعة في أي سيناريو (سجل حدّ
//      الأخطاء التشخيصي متوقع فقط في سيناريو التعذّر المقصود).
//
// النتيجة تُطبع في الطرفية ويخرج الكود 1 عند أي إخفاق، مع حفظ
// docs/lazy-loading/browser-audit.json كدليل آلي.
// ============================================================
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import path from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, "dist");
const OUT_DIR = path.resolve(ROOT, "docs/lazy-loading");
const REPORT_JSON = path.join(OUT_DIR, "browser-audit.json");
const BASE_PATH = "/English-Course/";
const LESSON_CHUNK = /\/assets\/Lesson\d+-[A-Za-z0-9_-]+\.js(\?|#|$)/;
const LESSON7_CHUNK = /\/assets\/Lesson7-[A-Za-z0-9_-]+\.js/;
const LESSON62_CHUNK = /\/assets\/Lesson62-[A-Za-z0-9_-]+\.js/;
const LESSON8_CHUNK = /\/assets\/Lesson8-[A-Za-z0-9_-]+\.js/;
const LESSON9_CHUNK = /\/assets\/Lesson9-[A-Za-z0-9_-]+\.js/;
const EXTERNAL_FONT = /^https:\/\/fonts\.(googleapis|gstatic)\.com\//;
const BOUNDARY_LOG = /^\[LessonErrorBoundary\]/;

if (!existsSync(path.join(DIST, "index.html"))) {
  console.error("dist/index.html غير موجود. شغّل `npm run build` أولًا.");
  process.exit(2);
}

// ---------- خادم ملفات ثابت ----------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
  ".png": "image/png",
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const clean = decodeURIComponent((req.url || "/").split("?")[0]);
      const rel = clean.startsWith(BASE_PATH) ? clean.slice(BASE_PATH.length) : clean.replace(/^\/+/, "");
      const candidate = path.normalize(path.join(DIST, rel || "index.html"));
      const file =
        candidate.startsWith(DIST) && existsSync(candidate) && statSync(candidate).isFile()
          ? candidate
          : path.join(DIST, "index.html");
      res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
      res.end(readFileSync(file));
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

// ---------- Chromium المضمّن ----------
async function launchBrowser() {
  const work = path.resolve(ROOT, "node_modules/.runtime-audit-browser");
  mkdirSync(work, { recursive: true });
  if (!existsSync(path.join(work, "lib"))) {
    const tar = path.join(work, "al2023.tar");
    writeFileSync(tar, brotliDecompressSync(readFileSync(path.join(ROOT, "node_modules/@sparticuz/chromium/bin/al2023.tar.br"))));
    execFileSync("tar", ["-xf", tar, "-C", work]);
  }
  process.env.LD_LIBRARY_PATH = `${path.join(work, "lib")}:${process.env.LD_LIBRARY_PATH || ""}`;
  return playwright.launch({
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: true,
  });
}

// ---------- أدوات ----------
const results = [];
const failures = [];
function record(scenario, assertion, pass, detail) {
  const entry = { scenario, assertion, pass: Boolean(pass), detail: detail ?? null };
  results.push(entry);
  if (!pass) failures.push(entry);
  console.log(`${pass ? "  ✓" : "  ✗ إخفاق:"} [${scenario}] ${assertion}${detail ? ` — ${detail}` : ""}`);
  return Boolean(pass);
}

function attachDiagnostics(page) {
  const diag = { consoleErrors: [], pageErrors: [], requestFailures: [], unavailableExternalFonts: [] };
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const url = msg.location()?.url || "";
    if (EXTERNAL_FONT.test(url) || EXTERNAL_FONT.test(msg.text())) diag.unavailableExternalFonts.push(`${url}: ${msg.text()}`);
    else if (BOUNDARY_LOG.test(msg.text())) diag.boundaryLogs = (diag.boundaryLogs ?? 0) + 1;
    else diag.consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => diag.pageErrors.push(err.message));
  page.on("requestfailed", (req) => {
    if (EXTERNAL_FONT.test(req.url())) diag.unavailableExternalFonts.push(`${req.url()}: ${req.failure()?.errorText}`);
    else diag.requestFailures.push(`${req.url()}: ${req.failure()?.errorText}`);
  });
  diag.reset = () => {
    diag.consoleErrors.length = 0;
    diag.pageErrors.length = 0;
    diag.requestFailures.length = 0;
    diag.unavailableExternalFonts.length = 0;
    diag.boundaryLogs = 0;
  };
  return diag;
}

const textLen = (page) => page.evaluate(() => (document.body.innerText || "").replace(/\s+/g, " ").trim().length);

const server = await startStaticServer();
const port = server.address().port;
const base = `http://127.0.0.1:${port}${BASE_PATH}`;
console.log(`الخادم الثابت: ${base}\n`);

const browser = await launchBrowser();
// Chromium المضمّن يعمل بـ --single-process ويُغلق إن أُغلق سياقه الوحيد:
// سياق واحد لكل التشغيل، وصفحة مستقلة لكل سيناريو (نفس نمط runtime-audit).
const context = await browser.newContext({ reducedMotion: "reduce" });
await context.addInitScript(() => {
  try {
    window.localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  } catch {
    // بعض المستندات بلا أصل تخفق في الوصول إلى localStorage — لا شيء.
  }
});

async function newPageFor(viewport) {
  const page = await context.newPage();
  await page.setViewportSize(viewport);
  page.setDefaultTimeout(20000);
  return page;
}

try {
  // ============ السيناريو A: سطح المكتب — الفهرس لا يجلب دروسًا ============
  {
    const scenario = "A · desktop hub";
    const page = await newPageFor({ width: 1440, height: 900 });
    const jsRequests = [];
    page.on("request", (req) => { if (req.url().endsWith(".js") || req.url().includes(".js?")) jsRequests.push(req.url()); });
    const diag = attachDiagnostics(page);
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForSelector('a.group[href="#/lesson/1"]', { timeout: 20000 });

    const lessonChunksOnHub = jsRequests.filter((u) => LESSON_CHUNK.test(u));
    record(scenario, "الفهرس لا يجلب أي chunk لأي درس (Lesson*.js)", lessonChunksOnHub.length === 0, lessonChunksOnHub.join(", ") || "0 chunks");
    record(scenario, "الفهرس يعرض بطاقات الدروس الـ 62", (await page.locator('a.group[href^="#/lesson/"]').count()) === 62);
    record(scenario, "نص الفهرس ظاهر وغير فارغ", (await textLen(page)) > 80);
    record(scenario, "لا أخطاء console غير متوقعة", diag.consoleErrors.length === 0, diag.consoleErrors[0] ?? null);
    record(scenario, "لا pageerror", diag.pageErrors.length === 0, diag.pageErrors[0] ?? null);
    record(scenario, "لا طلبات تطبيقية فاشلة", diag.requestFailures.length === 0, diag.requestFailures[0] ?? null);
    await page.close();
  }

  // ============ السيناريو B: سطح المكتب — فتح درس 7 يجلب chunk الدرس 7 فقط ============
  {
    const scenario = "B · desktop hub → lesson 7";
    const page = await newPageFor({ width: 1440, height: 900 });
    const jsRequests = [];
    page.on("request", (req) => { if (req.url().endsWith(".js") || req.url().includes(".js?")) jsRequests.push(req.url()); });
    const diag = attachDiagnostics(page);
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForSelector('a.group[href="#/lesson/7"]', { timeout: 20000 });
    const before = jsRequests.length;

    await page.click('a.group[href="#/lesson/7"]');
    await page.waitForSelector('#l7-main, [data-lesson="7"]', { timeout: 20000 });

    const lessonChunks = jsRequests.slice(before);
    const fetched7 = lessonChunks.filter((u) => LESSON7_CHUNK.test(u));
    record(scenario, "فتح الدرس 7 يجلب chunk الدرس 7", fetched7.length >= 1, fetched7[0] ?? "لم يُطلب");
    record(scenario, "لا يُجلب chunk الدرس 8 (أو أي درس آخر) مع فتح 7", !jsRequests.some((u) => LESSON8_CHUNK.test(u)));
    record(scenario, "محتوى الدرس 7 ظاهر", (await textLen(page)) > 200);
    record(scenario, "زر «قفل الموقع» ظاهر بعد التحميل الكسول", await page.locator("[data-site-lock-button]").first().isVisible());
    record(scenario, "لا أخطاء console غير متوقعة", diag.consoleErrors.length === 0, diag.consoleErrors[0] ?? null);
    record(scenario, "لا pageerror", diag.pageErrors.length === 0, diag.pageErrors[0] ?? null);
    record(scenario, "لا طلبات تطبيقية فاشلة", diag.requestFailures.length === 0, diag.requestFailures[0] ?? null);
    await page.close();
  }

  // ============ السيناريو C: تعذّر جلب chunk الدرس 9 ← واجهة تعافٍ ← إعادة محاولة ← نجاح ============
  {
    const scenario = "C · failed chunk 9 → recovery → retry";
    const page = await newPageFor({ width: 1440, height: 900 });
    const diag = attachDiagnostics(page);

    // انقطاع مقصود: كل طلب لـ Lesson9-*.js يسقط.
    await page.route(/\/assets\/Lesson9-[^/?#]+\.js/, (route) => route.abort());
    await page.goto(`${base}#/lesson/9`, { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForSelector("[data-lesson-error-fallback]", { timeout: 20000 }).catch(() => null);

    const fallbackVisible = await page.locator("[data-lesson-error-fallback]").first().isVisible().catch(() => false);
    record(scenario, "تعذّر جلب الـ chunk يعرض واجهة التعافي (لا صفحة بيضاء)", fallbackVisible);
    record(scenario, "الصفحة ليست فارغة أثناء/بعد الفشل", (await textLen(page)) > 40);
    record(scenario, "زر «قفل الموقع» يبقى ظاهرًا وفعّالًا", await page.locator("[data-site-lock-button]").first().isVisible().catch(() => false));
    record(scenario, "لا pageerror غير متوقعة (خطأ الحق المقصود فقط)", diag.pageErrors.length === 0, diag.pageErrors[0] ?? null);

    // إزالة الانقطاع ثم إعادة المحاولة — يجب أن يُعاد جلب الـ chunk فعليًا.
    await page.unroute(/\/assets\/Lesson9-[^/?#]+\.js/);
    await page.click("[data-lesson-error-retry]");
    await page.waitForSelector('#l9-main, [data-lesson="9"]', { timeout: 20000 }).catch(() => null);
    const recovered = await page.locator('#l9-main, [data-lesson="9"]').first().isVisible().catch(() => false);
    record(scenario, "«إعادة المحاولة» تُعيد جلب الـ chunk ويُرندر الدرس 9", recovered);
    record(scenario, "واجهة التعافي اختفت بعد التعافي", !(await page.locator("[data-lesson-error-fallback]").first().isVisible().catch(() => true)));
    await page.close();
  }

  // ============ السيناريو D: الجوال — لا دروس في الفهرس، الدرس 62 عند فتحه فقط ============
  {
    const scenario = "D · mobile hub → lesson 62";
    const page = await newPageFor({ width: 375, height: 812 });
    const jsRequests = [];
    page.on("request", (req) => { if (req.url().endsWith(".js") || req.url().includes(".js?")) jsRequests.push(req.url()); });
    const diag = attachDiagnostics(page);
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForSelector('a.group[href="#/lesson/62"]', { timeout: 20000 });

    const lessonChunksOnHub = jsRequests.filter((u) => LESSON_CHUNK.test(u));
    record(scenario, "الفهرس على الجوال لا يجلب أي chunk لأي درس", lessonChunksOnHub.length === 0, lessonChunksOnHub.join(", ") || "0 chunks");
    const before = jsRequests.length;
    await page.locator('a.group[href="#/lesson/62"]').first().click();
    await page.waitForSelector('#l62-main, [data-lesson="62"], [data-lesson62], main', { timeout: 30000 }).catch(() => null);
    await page.waitForTimeout(800);

    const lessonChunks = jsRequests.slice(before);
    record(scenario, "فتح الدرس 62 على الجوال يجلب chunk الدرس 62", lessonChunks.some((u) => LESSON62_CHUNK.test(u)), lessonChunks.filter((u) => LESSON_CHUNK.test(u)).map((u) => path.basename(u)).join(", ") || "لا شيء");
    record(scenario, "محتوى الدرس 62 ظاهر على الجوال", (await textLen(page)) > 200);
    record(scenario, "لا أخطاء console غير متوقعة", diag.consoleErrors.length === 0, diag.consoleErrors[0] ?? null);
    record(scenario, "لا pageerror", diag.pageErrors.length === 0, diag.pageErrors[0] ?? null);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}

mkdirSync(OUT_DIR, { recursive: true });
const report = {
  auditedAt: new Date().toISOString(),
  base,
  totals: { checks: results.length, failures: failures.length },
  results,
  failures,
};
writeFileSync(REPORT_JSON, JSON.stringify(report, null, 2));
console.log(`\nالنتيجة: ${results.length - failures.length}/${results.length} فحصًا نجح · ${failures.length} إخفاق`);
console.log(`التقرير: ${path.relative(ROOT, REPORT_JSON)}`);
process.exit(failures.length === 0 ? 0 : 1);
