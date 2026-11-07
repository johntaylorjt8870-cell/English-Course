// ============================================================
// لقطات شريط «تصحيح الاختبار» الثابت — دليل بصري على إصلاح التداخل على الهاتف.
// يوثّق: أعلى الاختبار، منتصفه، آخره (قبل التسليم)، ثم حالة النتيجة بعد التسليم.
//   node scripts/shots-lesson57-bar.mjs
// ============================================================
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson57-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const dist = join(process.cwd(), "dist");
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2" };
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
const out = "docs/lesson57-visual";
const shots = [];

const browser = await playwright.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
await page.goto(`${base}#/lesson/57`, { waitUntil: "networkidle" });
await page.waitForTimeout(350);
let nav = page.locator('aside nav button[data-step-nav="test"]:visible');
if (!(await nav.count())) {
  await page.getByRole("button", { name: "فهرس الدرس" }).click();
  await page.waitForTimeout(250);
  nav = page.locator('aside nav button[data-step-nav="test"]:visible');
}
await nav.first().click();
await page.waitForTimeout(700);

for (const [name, top] of [["bar-mobile-start", 0], ["bar-mobile-middle", 2200], ["bar-mobile-end", 999999]]) {
  await page.evaluate((t) => {
    const s = document.querySelector(".lesson-main-scroll");
    s.scrollTop = t === 999999 ? s.scrollHeight : t;
  }, top);
  await page.waitForTimeout(320);
  await page.screenshot({ path: `${out}/${name}.png` });
  shots.push(name);
}

// حالة النتيجة: نُجيب كل الأسئلة ثم نُصحّح (بعرض مكتبي كما في التدقيق، ثم لقطة هاتف)
await page.setViewportSize({ width: 1280, height: 900 });
await page.waitForTimeout(250);
const root = page.locator('[data-final-test="57"]');
const answers = [
  ["tf", 0], ["single", 1], ["single", 2], ["typed", "The lesson is explained by the teacher."],
  ["single", 1], ["error", 1], ["multi", [0, 2, 3]], ["tf", 1],
  ["typed", "The door isn't locked."], ["order", ["Is", "English", "taught", "at this school?"]],
];
for (let i = 0; i < answers.length; i++) {
  const [type, value] = answers[i];
  const q = root.locator(`[data-ft-q="${i + 1}"]`);
  if (type === "multi") for (const idx of value) await q.locator("input[type=checkbox]").nth(idx).check();
  else if (type === "typed") await q.locator('input[type="text"]').fill(value);
  else if (type === "order") for (const tok of value) await q.getByRole("button", { name: tok, exact: true }).click();
  else await q.locator("input[type=radio]").nth(value).check();
}
for (let i = 0; i < 4; i++) await root.locator('[data-ft-q="11"] select').nth(i).selectOption(String(i));
await root.locator('[data-ft-q="12"] input[type=radio]').nth(0).check();
await root.locator('[data-ft-q="13"] input[type=radio]').nth(2).check();
await root.locator('[data-ft-q="14"] input[type="text"]').fill("English is spoken in many countries.");
await root.locator('[data-ft-q="15"] input[type=radio]').nth(1).check();
await root.locator('[data-ft-submit]').click();
await page.waitForTimeout(400);

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
await page.evaluate(() => {
  const s = document.querySelector(".lesson-main-scroll");
  s.scrollTop = s.scrollHeight;
});
await page.waitForTimeout(320);
await page.screenshot({ path: `${out}/bar-mobile-result.png` });
shots.push("bar-mobile-result");

await browser.close();
server.close();
console.log(`shots written: ${shots.join(", ")} -> ${out}`);
