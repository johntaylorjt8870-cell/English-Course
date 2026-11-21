// ============================================================
// تحقق حقيقي في Chromium لمسار التعافي من انهيار درس واحد (Fix #2).
//
//   node scripts/audit-error-boundary-browser.mjs
//
// كيف نُحدث الانهيار دون أي آلية حقن في الإنتاج؟
//   يُبنى هنا «حزمة اختبار» من App الحقيقي (كل الدروس + بوابة كلمة المرور +
//   الفهرس + التنقل) باستخدام scripts/fixtures/error-boundary/harness، مع
//   استبدال حزمة الدرس 2 عند البناء فقط بمكوّن اختبار يرمي خطأ. ملفات الإنتاج
//   غير معدَّلة، و dist النهائي لا يحتوي هذه الحزمة.
//
// ما يُتحقق منه في المتصفح:
//   1) درس حقيقي (1) يُرندر محتواه.
//   2) الانتقال لدرس معطّل (اختباري) يُظهر واجهة التعافي، وليس صفحة بيضاء.
//   3) الهيكل العام (بوابة الموقع/شارة القفل) يبقى ظاهرًا.
//   4) تغيير المسار إلى درس آخر يصفّر الانهيار (بدون إعادة تحميل).
//   5) «إعادة المحاولة» تعيد الرندر بنجاح.
//   6) «العودة إلى صفحة الدروس» تعود للفهرس الحقيقي بكل بطاقاته.
//   7) فتح درس آخر من الفهرس يعمل، والتنقل يبقى سليمًا.
//   8) لا أخطاء console أو pageerror غير متوقعة؛ أخطاء الاختبار المحقونة
//      تُصنَّف منفصلة في التقرير.
//   9) تخطيط الواجهة البديلة على سطح المكتب (1440×900) والجوال (375×812).
// ============================================================
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { brotliDecompressSync } from "node:zlib";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const ROOT = process.cwd();
const HARNESS_CONFIG = "scripts/fixtures/error-boundary/harness/vite.config.ts";
const DIST = join(ROOT, "node_modules/.error-boundary-browser/dist");
const SHOT_DIR = join(ROOT, "docs/error-boundary-visual");
const REPORT = join(SHOT_DIR, "report.json");

mkdirSync(SHOT_DIR, { recursive: true });

// ---------- 1) بناء حزمة الاختبار ----------
console.log("Building test-only harness (real App + crashing Lesson 2 fixture)…");
execFileSync(process.execPath, [join(ROOT, "node_modules/vite/bin/vite.js"), "build", "--config", HARNESS_CONFIG], {
  cwd: ROOT,
  stdio: ["ignore", "ignore", "inherit"],
});
if (!existsSync(join(DIST, "index.html"))) throw new Error("Harness build produced no index.html");

// ---------- 2) خادم ملفات ثابت ----------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};
const server = createServer((req, res) => {
  const raw = (req.url || "/").split("?")[0];
  const candidate = normalize(join(DIST, raw.replace(/^\/+/, "")));
  const file =
    candidate.startsWith(DIST) && existsSync(candidate) && statSync(candidate).isFile()
      ? candidate
      : join(DIST, "index.html");
  res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const BASE = `http://127.0.0.1:${server.address().port}/`;

// ---------- 3) Chromium ----------
const work = "node_modules/.error-boundary-browser/chromium";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${ROOT}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;
const browser = await playwright.launch({
  executablePath: await chromium.executablePath(),
  args: chromium.args,
  headless: true,
});

// ---------- 4) التقرير ----------
const checks = [];
const failures = [];
const notes = [];
let checksRun = 0;
function ok(condition, label, detail) {
  checksRun += 1;
  checks.push({ label, pass: Boolean(condition), detail: detail ?? null });
  if (!condition) {
    failures.push(label);
    console.error(`FAIL ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "mobile-375x812", width: 375, height: 812 },
];

const EXTERNAL_FONT = /^https:\/\/fonts\.(googleapis|gstatic)\.com\//;
// سجلّ التشخيص الذي يكتبه الحدّ نفسه.
const BOUNDARY_LOG = /^\[LessonErrorBoundary\]/;
// صدى React لأي خطأ يلتقطه Error Boundary (سطر منفصل يحتوي رسالة الاختبار المحقونة).
const INJECTED_ECHO = /TEST-ONLY injected lesson render failure \(lesson 2 fixture\)/;
const isInjected = (text) => BOUNDARY_LOG.test(text) || INJECTED_ECHO.test(text);

const results = [];

// سياق واحد لكل المقاسات: Chromium المضمّن يعمل بـ --single-process ويُغلق
// إذا أُغلق سياقه الوحيد. لكل مقاس صفحة منفصلة.
const context = await browser.newContext({ reducedMotion: "reduce" });
await context.addInitScript(() => {
  try {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  } catch {
    // about:blank وبعض المستندات بلا أصل تخفق في الوصول إلى localStorage.
  }
});

for (const viewport of VIEWPORTS) {
  const page = await context.newPage();
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  page.setDefaultTimeout(15000);

  const consoleErrors = [];
  const pageErrors = [];
  const requestFailures = [];
  const unavailableExternalFonts = [];

  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    if (EXTERNAL_FONT.test(msg.location().url || "")) unavailableExternalFonts.push(msg.text());
    else consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("requestfailed", (req) => {
    if (EXTERNAL_FONT.test(req.url())) unavailableExternalFonts.push(req.url());
    else requestFailures.push(`${req.url()}: ${req.failure()?.errorText}`);
  });

  const state = { viewport: viewport.name, steps: [], screenshots: [] };
  const step = (name) => state.steps.push({ name, at: new Date().toISOString() });

  // 1) درس عادي حقيقي
  step("open real lesson 1");
  await page.goto(`${BASE}#/lesson/1`, { waitUntil: "domcontentloaded" });
  await page.locator("#l1-main").waitFor();
  ok(await page.locator("[data-lesson-error-fallback]").count() === 0, `${viewport.name}: no fallback on healthy lesson 1`);
  ok((await page.locator("#l1-main").innerText()).trim().length > 100, `${viewport.name}: lesson 1 content rendered`);
  ok((await page.evaluate(() => document.querySelectorAll("#root > *").length)) > 0, `${viewport.name}: app mounted`);

  // 2) الانهيار المقصود + واجهة التعافي
  step("open crashing test lesson 2");
  await page.evaluate(() => { window.location.hash = "/lesson/2"; });
  await page.locator("[data-lesson-error-fallback]").waitFor();
  const fallback = page.locator('[data-lesson-error-fallback="true"]');
  ok(await fallback.isVisible(), `${viewport.name}: fallback visible instead of blank page`);
  ok((await page.evaluate(() => document.body.innerText.trim().length)) > 40, `${viewport.name}: page is not blank`);
  ok((await page.evaluate(() => document.querySelector("#root")?.childElementCount ?? 0)) > 0, `${viewport.name}: root still has content`);
  ok(await page.locator(".site-gate-shell").count() === 1, `${viewport.name}: global site shell preserved`);
  ok(await page.locator("[data-site-lock-button]").first().isVisible(), `${viewport.name}: site lock control still visible`);
  const lockBox = await page.locator("[data-site-lock-button]").first().boundingBox();
  ok(
    Boolean(lockBox) && lockBox.y >= 0 && lockBox.y + lockBox.height <= viewport.height + 1,
    `${viewport.name}: site lock control stays inside the viewport`,
    JSON.stringify(lockBox),
  );
  ok(await page.getByRole("alert").count() >= 1, `${viewport.name}: recovery UI is announced as an alert`);

  const fallbackText = (await fallback.innerText()).replace(/\s+/g, " ");
  ok(/تعذّر عرض هذا الدرس/.test(fallbackText), `${viewport.name}: Arabic recovery heading`);
  ok(!/TEST-ONLY|Error|stack|at \w+\(/i.test(fallbackText), `${viewport.name}: no technical details exposed`, fallbackText.slice(0, 120));

  // التخطيط: داخل الشاشة أفقيًا، بلا تمرير جانبي، أزرار قابلة للنقر
  const layout = await page.evaluate(() => {
    const card = document.querySelector('[data-lesson-error-fallback="true"]');
    const retry = document.querySelector("[data-lesson-error-retry]");
    const home = document.querySelector("[data-lesson-error-home]");
    const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
    return {
      card: box(card), retry: box(retry), home: box(home),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      innerWidth: window.innerWidth, innerHeight: window.innerHeight,
    };
  });
  ok(layout.scrollWidth <= layout.clientWidth + 1, `${viewport.name}: no horizontal overflow`, `${layout.scrollWidth}/${layout.clientWidth}`);
  for (const [name, b] of [["card", layout.card], ["retry", layout.retry], ["home", layout.home]]) {
    ok(b.x >= -1 && b.x + b.width <= viewport.width + 1, `${viewport.name}: ${name} fits viewport width`, JSON.stringify(b));
    ok(b.height >= 36, `${viewport.name}: ${name} has usable height`, String(b.height));
  }
  ok(layout.card.y >= 0 && layout.card.y + layout.card.height <= viewport.height + 1, `${viewport.name}: fallback card fits viewport height`, JSON.stringify(layout.card));
  const stacked = layout.home.y >= layout.retry.y + layout.retry.height - 2;
  if (viewport.width < 640) ok(stacked, `${viewport.name}: mobile buttons stack vertically`, JSON.stringify({ retry: layout.retry, home: layout.home }));
  else ok(!stacked && Math.abs(layout.home.y - layout.retry.y) < 8, `${viewport.name}: desktop buttons sit on one row`);

  const shot = join(SHOT_DIR, `fallback-${viewport.name}.png`);
  await page.screenshot({ path: shot });
  state.screenshots.push(shot.replace(`${ROOT}/`, ""));
  ok(existsSync(shot), `${viewport.name}: fallback screenshot saved`);

  // 3) تغيير المسار يصفّر الانهيار بدون إعادة تحميل
  step("route change resets failure");
  await page.evaluate(() => { window.location.hash = "/lesson/3"; });
  await page.locator("#l3-main").waitFor();
  ok(await page.locator("[data-lesson-error-fallback]").count() === 0, `${viewport.name}: route change cleared the fallback`);
  ok(page.url().endsWith("#/lesson/3"), `${viewport.name}: hash route updated`, page.url());

  // 4) انهيار جديد ← إعادة المحاولة
  step("retry renders successfully");
  await page.evaluate(() => { window.location.hash = "/lesson/2"; });
  await page.locator("[data-lesson-error-fallback]").waitFor();
  ok(await page.locator("[data-lesson-error-retry]").count() === 1, `${viewport.name}: retry action present`);
  await page.evaluate(() => { window.__LESSON_ERROR_BOUNDARY_CRASH_FIXTURE__ = "recovered"; });
  await page.locator("[data-lesson-error-retry]").click();
  await page.locator('[data-test-lesson-fixture="recovered"]').waitFor();
  ok(await page.locator("[data-lesson-error-fallback]").count() === 0, `${viewport.name}: retry cleared the fallback`);
  ok(await page.locator("#l2-main").isVisible(), `${viewport.name}: lesson rendered after retry`);

  // 5) انهيار جديد ← العودة إلى الفهرس بزر الواجهة
  step("return to hub via fallback action");
  await page.evaluate(() => {
    window.__LESSON_ERROR_BOUNDARY_CRASH_FIXTURE__ = "crash";
    window.location.hash = "/lesson/1";
  });
  await page.locator("#l1-main").waitFor();
  await page.evaluate(() => { window.location.hash = "/lesson/2"; });
  await page.locator("[data-lesson-error-fallback]").waitFor();
  await page.locator("[data-lesson-error-home]").click();
  await page.getByRole("heading", { name: "دروس اللغة الإنجليزية" }).waitFor();
  ok(page.url().endsWith("#/"), `${viewport.name}: home action restored hub hash`, page.url());
  ok(await page.locator("[data-lesson-error-fallback]").count() === 0, `${viewport.name}: fallback gone after returning home`);
  ok(await page.locator('a.group[href^="#/lesson/"]').count() === 62, `${viewport.name}: all 62 hub lesson cards present`);
  ok(await page.locator("[data-site-lock-button]").first().isVisible(), `${viewport.name}: global navigation/shell intact on hub`);

  // 6) فتح درس آخر من الفهرس
  step("open another lesson from hub");
  await page.locator('a.group[href="#/lesson/3"]').click();
  await page.locator("#l3-main").waitFor();
  ok(page.url().endsWith("#/lesson/3"), `${viewport.name}: hub card navigates to lesson 3`);
  ok(await page.locator("[data-lesson-error-fallback]").count() === 0, `${viewport.name}: lesson 3 healthy after recovery`);

  // 7) تصنيف الأخطاء: المحقونة مقابل غير المتوقعة
  const injected = consoleErrors.filter(isInjected);
  const injectedDiagnostics = injected.filter((text) => BOUNDARY_LOG.test(text));
  const injectedEchoes = injected.filter((text) => !BOUNDARY_LOG.test(text));
  const unexpectedConsole = consoleErrors.filter((text) => !isInjected(text));
  ok(injectedDiagnostics.length === 3, `${viewport.name}: 3 expected boundary diagnostics (one per injected crash)`, JSON.stringify(injectedDiagnostics));
  ok(injectedEchoes.length === 3, `${viewport.name}: 3 React echoes of the injected error only`, JSON.stringify(injectedEchoes.map((t) => t.split("\n")[0])));
  ok(unexpectedConsole.length === 0, `${viewport.name}: no unexpected console errors`, JSON.stringify(unexpectedConsole));
  ok(pageErrors.length === 0, `${viewport.name}: no unhandled page errors`, JSON.stringify(pageErrors));
  ok(requestFailures.length === 0, `${viewport.name}: no unexpected failed requests`, JSON.stringify(requestFailures));

  state.checks = checks.filter((c) => c.label.startsWith(viewport.name));
  state.injectedErrors = { diagnostics: injectedDiagnostics, reactEchoes: injectedEchoes };
  state.unexpected = { console: unexpectedConsole, pageErrors, requestFailures };
  state.unavailableExternalFonts = unavailableExternalFonts;
  results.push(state);

  if (unavailableExternalFonts.length) {
    notes.push(`${viewport.name}: ${unavailableExternalFonts.length} external font request(s) unavailable (ignored, environment only).`);
  }

  await page.close();
}

await context.close();
await browser.close();
await new Promise((resolve) => server.close(resolve));

const report = {
  generatedAt: new Date().toISOString(),
  harness: "scripts/fixtures/error-boundary/harness (real App; Lesson 2 replaced at build time by a crashing test fixture)",
  note: "Injected errors are produced only by the test-only Lesson 2 fixture. Production code contains no fault injection.",
  checksRun,
  failures,
  notes,
  viewports: results,
};
writeFileSync(REPORT, `${JSON.stringify(report, null, 2)}\n`);

console.log("\n================ Error Boundary Browser Audit ================");
console.log(`Checks: ${checksRun} · Failures: ${failures.length}`);
for (const note of notes) console.log(`note: ${note}`);
console.log(`Injected (expected) per viewport: ${results.map((r) => `${r.viewport}=${r.injectedErrors.diagnostics.length} diagnostics + ${r.injectedErrors.reactEchoes.length} React echoes`).join(", ")}`);
console.log(`Unexpected console errors: ${results.reduce((n, r) => n + r.unexpected.console.length, 0)}`);
console.log(`Unhandled page errors: ${results.reduce((n, r) => n + r.unexpected.pageErrors.length, 0)}`);
console.log(`Screenshots: ${results.flatMap((r) => r.screenshots).join(", ")}`);
console.log(`Report: ${REPORT.replace(`${ROOT}/`, "")}`);
if (failures.length) {
  console.error(`\n✗ ${failures.length} failure(s)`);
  process.exitCode = 1;
} else {
  console.log("\n✓ Error boundary browser recovery verified (desktop + mobile)");
}
