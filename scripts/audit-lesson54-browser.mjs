// ============================================================
// Lesson 54 — production browser audit
//   npm run build && node scripts/audit-lesson54-browser.mjs
// Checks every slide at 1280/768/375/320, LTR formulas, navigation vs
// site-lock clearance, answer persistence, gated 25-question grading,
// practice reveal, writing persistence, progress and next-lesson link.
// ============================================================
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import { build } from "esbuild";
import { pathToFileURL } from "node:url";

const work = "node_modules/.lesson54-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const outfile = join(process.cwd(), work, "key.mjs");
await build({ entryPoints: ["src/lessons/lesson54/testKey54.ts"], bundle: true, platform: "node", format: "esm", outfile, logLevel: "silent" });
const { TEST_SOLUTIONS_54: key } = await import(pathToFileURL(outfile));

const dist = join(process.cwd(), "dist");
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];
  const rel = url.startsWith("/English-Course/") ? url.slice("/English-Course/".length) : url.replace(/^\/+/, "");
  const path = normalize(join(dist, rel || "index.html"));
  const file = path.startsWith(dist) && existsSync(path) && statSync(path).isFile() ? path : join(dist, "index.html");
  res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const site = `http://127.0.0.1:${server.address().port}/English-Course/`;

let browser;
let checks = 0;
const failures = [];
const ok = (v, msg) => { checks++; if (!v) { failures.push(msg); console.error("FAIL:", msg); } };
const errors = [];
const failedRequests = [];
const keyRequests = [];
const visualDir = "docs/lesson54-visual";
mkdirSync(visualDir, { recursive: true });

try {
  browser = await playwright.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.addInitScript(() => { try { localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"); } catch {} });
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (e) => { if (e.type() === "error" && !e.text().includes("Failed to load resource")) errors.push(e.text()); });
  page.on("requestfailed", (r) => failedRequests.push(r.url()));
  page.on("request", (r) => { if (/testKey54|key\.mjs/.test(r.url())) keyRequests.push(r.url()); });

  const fresh = async (n) => { await page.goto("about:blank"); await page.goto(site + `#/lesson/${n}`, { waitUntil: "networkidle" }); };
  const jump = async (id) => {
    let nav = page.locator(`button[data-step-nav="${id}"]:visible`);
    if (!(await nav.count())) { await page.getByRole("button", { name: "فهرس الدرس" }).click(); nav = page.locator(`button[data-step-nav="${id}"]:visible`); }
    await nav.first().click();
  };

  // ---- 1) Lesson 1 unchanged: cover/slide classes still match ----
  await fresh(1);
  await page.waitForTimeout(500);
  const oneCover = await page.locator("#l1-main section").first().getAttribute("class");
  await page.locator('button[data-step-nav="next"]').click();
  await page.waitForTimeout(300);
  const oneSlide = await page.locator("#l1-main section").first().getAttribute("class");

  await fresh(54);
  await page.waitForTimeout(500);
  ok(await page.locator('[data-lesson="54"]').count() === 1, "route #/lesson/54 renders lesson 54");
  const cover = (await page.locator("#l54-main section").first().getAttribute("class")).replace("l54-cover", "").trim();
  ok(cover === oneCover, "cover uses identical Lesson 1 section classes");
  const counter = await page.locator("header bdi").first().textContent();
  const total = Number(counter?.split("/")[1]);
  ok(total >= 39, `slide count (${total})`);
  const ids = await page.locator('button[data-step-nav]:not([data-step-nav="next"]):not([data-step-nav="prev"])').evaluateAll((els) => els.map((e) => e.getAttribute("data-step-nav")));

  // ---- 2) every slide at four viewports ----
  for (const [w, h] of [[1280, 900], [768, 900], [375, 812], [320, 720]]) {
    await page.setViewportSize({ width: w, height: h });
    await fresh(54);
    if (w === 1280 || w === 768 || w === 375 || w === 320) await page.screenshot({ path: `${visualDir}/cover-${w}x${h}.png`, fullPage: false });
    for (let i = 0; i < total; i++) {
      const m = await page.evaluate(() => {
        const main = document.querySelector("#l54-main");
        const vis = (e) => e && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== "hidden";
        const box = (e) => { if (!vis(e)) return null; const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom }; };
        const next = document.querySelector('button[data-step-nav="next"]');
        const lock = [...document.querySelectorAll('[data-site-lock-button="true"]')].find(vis);
        const hit = (e) => { const r = e?.getBoundingClientRect(); const t = r && document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !!(t && (t === e || e.contains(t))); };
        const nb = box(next), lb = box(lock);
        return {
          width: innerWidth,
          doc: document.documentElement.scrollWidth,
          mainScroll: main?.scrollWidth,
          mainWidth: main?.clientWidth,
          overlap: !!(nb && lb && nb.l < lb.r && lb.l < nb.r && nb.t < lb.b && lb.t < nb.b),
          hitNext: hit(next), hitLock: hit(lock),
          badEnglish: [...main.querySelectorAll('[dir="ltr"][lang="en"]')].filter((e) => getComputedStyle(e).direction !== "ltr").length,
          badFormula: [...main.querySelectorAll('[data-formula="54"]')].filter((e) => getComputedStyle(e).direction !== "ltr").length,
        };
      });
      ok(m.doc <= m.width + 1, `${w}px slide ${i + 1}: no horizontal page overflow`);
      ok(m.mainScroll <= m.mainWidth + 1, `${w}px slide ${i + 1}: no horizontal main overflow`);
      ok(!m.overlap, `${w}px slide ${i + 1}: التالي does not overlap قفل الموقع`);
      ok(m.hitNext && m.hitLock, `${w}px slide ${i + 1}: both buttons clickable`);
      ok(m.badEnglish === 0 && m.badFormula === 0, `${w}px slide ${i + 1}: English + formulas render LTR`);
      if (i < total - 1) await page.locator('button[data-step-nav="next"]').click();
    }
  }
  ok(ids.length === total, `step navigation lists all ${total} slides`);
  await page.setViewportSize({ width: 1280, height: 900 });
  await fresh(54);
  await jump("s2a");
  ok(await page.locator('#l54-main [data-formula="54"]').count() > 0, "formula is plain LTR text");
  ok((await page.locator("#l54-main section").first().getAttribute("class")).includes("rounded-[2rem]"), "content slide uses the original SlideFrame");
  ok(oneSlide === (await page.locator("#l54-main section").first().getAttribute("class")), "original SlideFrame section classes intact");

  // ---- 2b) keyboard navigation + forbidden source-reveal panel ----
  const stepNumber = async () => Number((await page.locator("header bdi").first().textContent()).split("/")[0].trim());
  await fresh(54);
  await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(150);
  ok(await stepNumber() === 2, "keyboard ArrowLeft advances one slide (RTL)");
  await page.keyboard.press("ArrowRight"); await page.waitForTimeout(150);
  ok(await stepNumber() === 1, "keyboard ArrowRight returns one slide (RTL)");
  await page.keyboard.press("End"); await page.waitForTimeout(150);
  ok(await stepNumber() === total, "End jumps to the last slide");
  await page.keyboard.press("Home"); await page.waitForTimeout(150);
  ok(await stepNumber() === 1, "Home returns to the cover");
  ok(await page.getByText("نص المصدر الحرفي").count() === 0, "no source-reveal element «نص المصدر الحرفي — اضغط للعرض»");
  ok(await page.locator("#l54-main details, #l54-main summary").count() === 0, "no <details>/<summary> source panel in student UI");
  await page.goto(site + "#/lesson/55", { waitUntil: "networkidle" });
  ok(errors.length === 0 && await page.locator("body").count() === 1, "next-lesson #/lesson/55 route falls back to hub without crashing");

  // ---- 3) ⑲ practice reveal + answer persistence ----
  await fresh(54);
  await jump("practice-2");
  const practice = page.locator("#l54-main");
  ok(!(await practice.textContent()).includes("لأن النتيجة في الشرط الثالث"), "practice explanation hidden before attempt");
  await practice.getByRole("button", { name: /C\. would have passed/ }).click();
  await practice.getByRole("button", { name: "راجع الإجابة" }).first().click();
  ok((await practice.textContent()).includes("would have passed"), "practice answer revealed after attempt");
  await jump("dialogue-questions");
  const qa = page.locator("#l54-main");
  await qa.getByRole("textbox").first().fill("Because he missed the train.");
  await qa.getByRole("button", { name: "راجع الإجابة" }).first().click();
  ok((await qa.textContent()).includes("Because he missed the train and arrived too late."), "comprehension answer revealed");

  // ---- 4) ㉓ writing persistence across reload ----
  await fresh(54);
  await jump("writing");
  await page.getByRole("textbox", { name: "فقرة الكتابة" }).fill("If I had studied harder, I would have passed the exam.");
  await fresh(54);
  await jump("writing");
  ok((await page.getByRole("textbox", { name: "فقرة الكتابة" }).inputValue()).includes("would have passed"), "writing answer survives reload");

  // ---- 5) ㉑–㉒ gated 25-question test ----
  await fresh(54);
  await jump("final-test");
  ok(await page.locator('[data-test-area="54"] [data-question]').count() === 25, "25 questions rendered");
  ok(await page.locator("[data-question-feedback]").count() === 0, "no feedback before submit");
  ok(keyRequests.length === 0, "answer key not requested before submit");
  for (const solution of key) {
    const card = page.locator(`[data-question="${solution.id}"]`);
    if (solution.choice) await card.getByRole("button").nth(solution.choice.charCodeAt(0) - 97).click();
    else await card.locator("input").fill(solution.model);
  }
  ok(keyRequests.length === 0, "answer key not requested while answering");
  await page.getByRole("button", { name: "تسليم الاختبار" }).click();
  await page.locator("[data-question-feedback]").first().waitFor();
  ok((await page.locator('[data-test-area="54"]').textContent()).includes("25 / 25"), "25/25 after submit");
  ok(keyRequests.length > 0, "answer key requested on submit");
  await jump("test-key");
  await page.locator('#l54-main [data-area="test-key"] .l54-answer').first().waitFor();
  ok(await page.locator('#l54-main [data-area="test-key"] .l54-answer').count() === 25, "full answer key with reasons shown after submit");

  await jump("final-test");
  await page.getByRole("button", { name: "محاولة جديدة" }).click();
  for (const solution of key) {
    const card = page.locator(`[data-question="${solution.id}"]`);
    if (solution.choice) await card.getByRole("button").nth(solution.choice.charCodeAt(0) - 97).click();
    else await card.locator("input").fill(solution.id === "q25" ? "a completely different wording" : solution.model);
  }
  await page.getByRole("button", { name: "تسليم الاختبار" }).click();
  await page.locator("[data-question-feedback]").first().waitFor();
  ok((await page.locator('[data-test-area="54"]').textContent()).includes("بانتظار المراجعة"), "unrecognized wording requires review");
  await page.locator('[data-question="q25"]').getByRole("button", { name: "إجابتي صحيحة" }).click();
  ok((await page.locator('[data-test-area="54"]').textContent()).includes("25 / 25"), "manual review updates score");

  // ---- 6) progress + next lesson ----
  await jump("progress");
  const progressText = await page.locator("#l54-main").textContent();
  ok(progressText.includes("54 / 120") && progressText.includes("45%"), "curriculum progress 54/120 · 45%");
  await jump("roadmap");
  ok(await page.locator('a[href="#/lesson/55"]').count() > 0, "next lesson 55 link");
  ok(errors.length === 0, `console errors: ${errors.join(" | ")}`);

  const summary = {
    lesson: 54,
    slides: total,
    viewports: ["1280x900", "768x900", "375x812", "320x720"],
    checks,
    failures,
    externalNetworkErrors: [...new Set(failedRequests)],
    consoleErrors: errors,
    generatedAt: new Date().toISOString(),
  };
  writeFileSync(`${visualDir}/verification.json`, JSON.stringify(summary, null, 2) + "\n");
  console.log(`${checks - failures.length}/${checks} browser checks passed; ${failures.length} failures; ${total} slides`);
  console.log("Failed requests:", [...new Set(failedRequests)].join(", ") || "none");
  if (failures.length) process.exitCode = 1;
} finally {
  await browser?.close();
  server.close();
}
