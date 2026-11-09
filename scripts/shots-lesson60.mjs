// ============================================================
// Lesson 60 — لقطات مراجعة بصرية
// node scripts/shots-lesson60.mjs [slideIds...]
// ============================================================
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson60-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const dist = join(process.cwd(), "dist");
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png" };
const server = createServer((req, res) => {
  const raw = (req.url || "/").split("?")[0];
  const rel = raw.startsWith("/English-Course/") ? raw.slice(16) : raw.replace(/^\/+/, "");
  const path = normalize(join(dist, rel || "index.html"));
  const file = path.startsWith(dist) && existsSync(path) && statSync(path).isFile() ? path : join(dist, "index.html");
  res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/English-Course/`;
mkdirSync("docs/lesson60-visual", { recursive: true });

const browser = await playwright.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));

await page.goto(`${base}#/lesson/60`, { waitUntil: "networkidle" });
await page.locator('[data-lesson="60"]').waitFor();

// كل الخطوات الموجودة فعلًا في شريط التنقّل — بلا قائمة يدوية تنسى محطات.
const allSteps = await page.evaluate(() =>
  [...document.querySelectorAll("button[data-step-nav]")]
    .map((node) => node.getAttribute("data-step-nav"))
    .filter((id) => id && id !== "prev" && id !== "next"),
);
const requested = process.argv.slice(2);
const targets = requested.length ? requested : allSteps;

async function go(id) {
  let button = page.locator(`button[data-step-nav="${id}"]:visible`);
  if (!(await button.count())) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    button = page.locator(`button[data-step-nav="${id}"]:visible`);
  }
  await button.first().click();
  await page.waitForTimeout(180);
}

// لقطات قديمة من تشغيل سابق تُزال حتى يبقى المجلد مرآة واحدة للحالة الحالية.
for (const file of readdirSync("docs/lesson60-visual")) {
  if (file.endsWith(".png")) rmSync(join("docs/lesson60-visual", file));
}

let index = 0;
for (const id of targets) {
  await go(id);
  index += 1;
  const label = String(index).padStart(2, "0");
  await page.screenshot({ path: `docs/lesson60-visual/${label}-${id}.png`, fullPage: false });
}

// عروض الهاتف
for (const [width, height, id] of [
  [320, 780, "s2"],
  [360, 800, "studio"],
  [390, 844, "cover"],
  [390, 844, "s1"],
  [414, 896, "s12"],
  [414, 896, "p1"],
]) {
  await page.setViewportSize({ width, height });
  await go(id);
  await page.screenshot({ path: `docs/lesson60-visual/mobile-${width}-${id}.png`, fullPage: false });
}

await browser.close();
server.close();
console.log(`captured ${index + 5} screenshots under docs/lesson60-visual/`);
