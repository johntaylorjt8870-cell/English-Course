// لقطات مراجعة بصرية للدرس 57 — تُحفظ في docs/lesson57-visual/
// node scripts/shots-lesson57.mjs [slideIds...]
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

const out = "docs/lesson57-visual";
mkdirSync(out, { recursive: true });

const targets = process.argv.slice(2);
const slides = targets.length
  ? targets
  : ["cover", "goals", "voice-intro", "passive-concept", "formula-core", "steps", "present-rules", "be-choose", "v3-lab", "by-agent", "transitive", "pronouns", "forms", "compare", "errors", "dialogue", "reading", "vocabulary", "practice-1", "practice-10", "test", "rating", "writing", "summary", "teacher"];

for (const [label, width, height] of [["desktop", 1440, 1000], ["mobile", 390, 844]]) {
  const browser = await playwright.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
  const page = await browser.newPage();
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.setViewportSize({ width, height });
  await page.goto(`${base}#/lesson/57`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const go = async (id) => {
    let nav = page.locator(`button[data-step-nav="${id}"]:visible`);
    if (!(await nav.count())) {
      const menu = page.getByRole("button", { name: "فهرس الدرس" });
      if (await menu.count()) await menu.first().click();
      nav = page.locator(`button[data-step-nav="${id}"]:visible`);
    }
    if (!(await nav.count())) return false;
    await nav.first().click();
    await page.waitForTimeout(180);
    return true;
  };

  for (const id of slides) {
    if (id === "teacher") {
      await go("teacher");
      const gate = page.getByLabel("كلمة مرور فضاء المعلم");
      if (await gate.count()) {
        await gate.fill("somer173");
        await page.getByRole("button", { name: "فتح المساحة" }).click();
        await page.waitForTimeout(250);
      }
    } else if (!(await go(id))) {
      console.log(`skip ${id} (${label})`);
      continue;
    }
    await page.waitForTimeout(260);
    await page.screenshot({ path: join(out, `${label}-${id}.png`), fullPage: false });
  }
  // حالات تفاعلية: صحيح · خاطئ · hover — تُحفظ كأدلة على وضوح الأزرار المحددة
  if (label === "desktop") {
    await go("practice-1");
    const card = page.locator("#l57-main .l57-practice-card").first();
    await card.locator(".l57-options button", { hasText: "Active" }).first().click();
    await card.getByRole("button", { name: "تحقّق" }).click();
    await page.waitForTimeout(320);
    const box = await card.boundingBox();
    await page.screenshot({
      path: join(out, "_state-correct.png"),
      clip: { x: box.x - 4, y: box.y - 4, width: box.width + 8, height: box.height + 8 },
    });
    const card2 = page.locator("#l57-main .l57-practice-card").nth(1);
    await card2.locator(".l57-options button", { hasText: "Active" }).first().click();
    await card2.getByRole("button", { name: "تحقّق" }).click();
    await page.waitForTimeout(320);
    const box2 = await card2.boundingBox();
    await page.screenshot({
      path: join(out, "_state-wrong.png"),
      clip: { x: box2.x - 4, y: box2.y - 4, width: box2.width + 8, height: box2.height + 8 },
    });
    await go("be-choose");
    await page.locator("#l57-main .l57-options button").first().hover();
    await page.waitForTimeout(220);
    await page.screenshot({ path: join(out, "_state-hover.png") });
  }

  if (errors.length) console.log(`console errors (${label}):`, [...new Set(errors)].slice(0, 8));
  await browser.close();
}
server.close();
console.log(`shots written to ${out}`);
