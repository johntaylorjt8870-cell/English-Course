#!/usr/bin/env node
// Fix #5 — لقطات مقارنة ممثِّلة بين الدرس الأول والدروس المختلفة الهوية.
// تشغيل: node scripts/fix5-shot-compare.mjs   (تسبقها npm run build)
// المخرجات: docs/fix5-visual/<lesson>-<size>.png
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, "dist");
const OUT = path.resolve(ROOT, "docs/fix5-visual");
const BASE_PATH = "/English-Course/";

if (!existsSync(path.join(DIST, "index.html"))) {
  console.error("dist/index.html غير موجود. شغّل npm run build أولًا.");
  process.exit(2);
}
mkdirSync(OUT, { recursive: true });

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
};

// خطوط بديلة محلية: خطوط Google محجوبة في هذه البيئة، فنقدّم ملفات
// @fontsource/noto-sans-arabic كـ @font-face لأسماء العائلات التي يطلبها التطبيق.
const FONT_DIR = path.resolve(ROOT, "node_modules/@fontsource/noto-sans-arabic/files");
const FONT_FILES = {
  "noto-arabic-400.woff2": "noto-sans-arabic-arabic-400-normal.woff2",
  "noto-arabic-700.woff2": "noto-sans-arabic-arabic-700-normal.woff2",
  "noto-latin-400.woff2": "noto-sans-arabic-latin-400-normal.woff2",
  "noto-latin-700.woff2": "noto-sans-arabic-latin-700-normal.woff2",
};
const FONT_CSS = `
@font-face{font-family:"Tajawal";src:url(/__fonts/noto-arabic-400.woff2) format("woff2");font-weight:400;font-display:block}
@font-face{font-family:"Tajawal";src:url(/__fonts/noto-arabic-700.woff2) format("woff2");font-weight:700;font-display:block}
@font-face{font-family:"Baloo Bhaijaan 2";src:url(/__fonts/noto-arabic-400.woff2) format("woff2");font-weight:400;font-display:block}
@font-face{font-family:"Baloo Bhaijaan 2";src:url(/__fonts/noto-arabic-700.woff2) format("woff2");font-weight:700;font-display:block}
@font-face{font-family:"Changa";src:url(/__fonts/noto-arabic-400.woff2) format("woff2");font-weight:400;font-display:block}
@font-face{font-family:"Changa";src:url(/__fonts/noto-arabic-700.woff2) format("woff2");font-weight:700;font-display:block}
@font-face{font-family:"Rubik";src:url(/__fonts/noto-latin-400.woff2) format("woff2");font-weight:400;font-display:block}
@font-face{font-family:"Rubik";src:url(/__fonts/noto-latin-700.woff2) format("woff2");font-weight:700;font-display:block}
@font-face{font-family:"Fredoka";src:url(/__fonts/noto-latin-400.woff2) format("woff2");font-weight:400;font-display:block}
@font-face{font-family:"Fredoka";src:url(/__fonts/noto-latin-700.woff2) format("woff2");font-weight:700;font-display:block}
`;

const server = createServer((req, res) => {
  let p = decodeURIComponent((req.url || "/").split("?")[0]);
  if (p.startsWith("/__fonts/")) {
    const name = path.basename(p);
    const real = FONT_FILES[name];
    if (!real || !existsSync(path.join(FONT_DIR, real))) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": "font/woff2" });
    res.end(readFileSync(path.join(FONT_DIR, real)));
    return;
  }
  if (p === "/__fontfix.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.end(FONT_CSS);
    return;
  }
  if (p.endsWith("/")) p += "index.html";
  const rel = p.startsWith(BASE_PATH) ? p.slice(BASE_PATH.length) : p.replace(/^\/+/, "");
  const file = path.resolve(DIST, rel);
  if (!file.startsWith(DIST) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404); res.end("nf"); return;
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}${BASE_PATH}`;

// مكتبات النظام لـ Chromium المضمَّن (تكافئ ما يفعله الحزمة على Amazon Linux 2023):
// على بيئات أخرى نستخرج al2023.tar.br يدويًا ونضبط LD_LIBRARY_PATH قبل الإطلاق.
const alLib = "/tmp/al2023/lib";
if (!existsSync(path.join(alLib, "libnss3.so"))) {
  const { writeFileSync, mkdirSync: mk } = await import("node:fs");
  const { brotliDecompressSync } = await import("node:zlib");
  mk("/tmp/al2023", { recursive: true });
  writeFileSync("/tmp/al2023.tar", brotliDecompressSync(readFileSync(path.join(ROOT, "node_modules/@sparticuz/chromium/bin/al2023.tar.br"))));
  execFileSync("tar", ["-xf", "/tmp/al2023.tar", "-C", "/tmp/al2023"]);
}
process.env.LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH?.startsWith(alLib)
  ? process.env.LD_LIBRARY_PATH
  : [alLib, process.env.LD_LIBRARY_PATH].filter(Boolean).join(":");
process.env.FONTCONFIG_PATH ??= "/tmp/fonts";
const LESSONS = (process.argv[2] || "1,2,10,20,27,34,41,44,50,62").split(",").map(Number);
const SIZES = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

const errors = [];
for (const size of SIZES) {
  // إطلالة مستقلة لكل مقاس: chromium بـ single-process لا ينجو من سياق جديد بعد إغلاق الأول.
  const browser = await playwright.launch({
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: true,
  });
  const ctx = await browser.newContext({ viewport: { width: size.width, height: size.height } });
  // فتح قفل الموقع (نفس أسلوب التدقيق) + حقن الخطوط البديلة المحلية.
  await ctx.addInitScript(() => {
    try { localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"); } catch { /* ignore */ }
  });
  const page = await ctx.newPage();
  await page.route("**/*fonts.googleapis.com/**", (r) => r.abort());
  await page.route("**/*fonts.gstatic.com/**", (r) => r.abort());
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${size.name} console: ${m.text()}`); });
  page.on("pageerror", (e) => errors.push(`${size.name} pageerror: ${e.message}`));
  for (const n of LESSONS) {
    await page.goto(`${BASE}#/lesson/${n}`, { waitUntil: "domcontentloaded" });
    await page.addStyleTag({ url: "/__fontfix.css" }).catch(() => {});
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    await page.waitForTimeout(1000);
    const file = path.join(OUT, `lesson${n}-${size.name}.png`);
    await page.screenshot({ path: file, animations: "disabled", caret: "hide", timeout: 60000 });
    console.log(`✓ lesson${n}-${size.name}`);
  }
  await ctx.close();
  await browser.close();
}
server.close();
if (errors.length) {
  console.log("\nأخطاء مسجلة:");
  for (const e of [...new Set(errors)]) console.log(" -", e);
} else console.log("\nلا أخطاء console/pageerror.");
