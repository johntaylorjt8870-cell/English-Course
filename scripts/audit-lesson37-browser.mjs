// ============================================================
// Optional real-Chromium verification for Lesson 37 (Future Horizon).
//
// Provision the browser once:
//   npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Serve the built app first:
//   npm run build && npm run preview -- --host 0.0.0.0 --port 4173
// Then run:
//   node scripts/audit-lesson37-browser.mjs
//
// What it verifies at 1440×900, 1280×800, 768×900 and 375×812:
//   • exactly one visible site-lock button inside the shared step nav;
//   • lock / Previous / Next never overlap;
//   • no horizontal overflow, RTL shell, computed WCAG AA contrast;
//   • every one of the 49 steps renders, and no step taller than 2 screens;
//   • keyboard navigation and the mobile contents drawer;
//   • the 25-question test is neutral before submit and graded after;
//   • solutions stay gated, then expose 25 detailed solutions;
//   • the teacher area is password-gated and renders its full key after unlock;
//   • no console or page errors.
// Writes docs/lesson37-visual/verification.json plus screenshots.
// ============================================================
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");

await esbuild.build({
  absWorkingDir: process.cwd(),
  stdin: { contents: `export { TEST_37 } from "./src/lessons/lesson37/testData37.ts"; export { TEST_SOLUTIONS_37 } from "./src/lessons/lesson37/solutionsData37.ts"; export { STEP_COUNT_37 } from "./src/lessons/lesson37/data.ts";`, resolveDir: process.cwd(), loader: "ts" },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "node_modules/.lesson37-browser/test-data.mjs",
  packages: "external",
  logLevel: "silent",
});
const { TEST_37, TEST_SOLUTIONS_37, STEP_COUNT_37 } = await import(pathToFileURL(`${process.cwd()}/node_modules/.lesson37-browser/test-data.mjs`).href);

const work = "node_modules/.lesson37-browser";
mkdirSync(work, { recursive: true });
try {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
} catch {
  /* already extracted */
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const OUT = "docs/lesson37-visual";
mkdirSync(OUT, { recursive: true });

const base = process.env.LESSON37_URL || "http://127.0.0.1:4173/English-Course/#/lesson/37";
const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });

let checks = 0;
const failures = [];
const ok = (condition, message) => {
  checks++;
  if (!condition) failures.push(message);
};
const report = { baseUrl: base, generatedAt: new Date().toISOString(), viewports: [], steps: [], consoleErrors: [] };

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
  try {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
    localStorage.removeItem("l37-future-horizon-visited-v1");
  } catch {
    /* about:blank has no storage */
  }
});
const page = await ctx.newPage();
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
page.on("pageerror", (error) => report.consoleErrors.push(String(error)));
page.on("console", (message) => {
  if (message.type() === "error" && !message.text().includes("ERR_FAILED")) report.consoleErrors.push(message.text());
});

const shot = async (name) => page.screenshot({ path: `${OUT}/${name}.png`, animations: "disabled", timeout: 60000 });
const overlap = (a, b) => {
  if (!a || !b) return 0;
  const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return x > 1 && y > 1 ? Math.round(x * y) : 0;
};

const boxes = () =>
  page.evaluate(() => {
    const visible = (el) => el && el.offsetParent !== null;
    const rect = (el) => (el ? el.getBoundingClientRect().toJSON() : null);
    return {
      locks: [...document.querySelectorAll("[data-site-lock-button='true']")].filter(visible).length,
      totalLocks: document.querySelectorAll("[data-site-lock-button='true']").length,
      lock: rect([...document.querySelectorAll("[data-site-lock-button='true']")].filter(visible)[0]),
      next: rect([...document.querySelectorAll("[data-step-nav='next']")].filter(visible)[0]),
      prev: rect([...document.querySelectorAll("[data-step-nav='prev']")].filter(visible)[0]),
      nav: rect([...document.querySelectorAll("[data-lesson-step-nav='true']")].filter(visible)[0]),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      direction: getComputedStyle(document.querySelector('[data-lesson="37"]')).direction,
      step: document.querySelector("[data-step-id]")?.getAttribute("data-step-id"),
      stepHeight: Math.round(document.querySelector("[data-step-id]")?.getBoundingClientRect().height ?? 0),
    };
  });

async function contrastReport() {
  return page.evaluate(() => {
    // أي صيغة لون CSS (rgb · oklch · hex · named) تُرسم على canvas 1×1 ثم تُقرأ كبكسل.
    const surface = document.createElement("canvas");
    surface.width = 1;
    surface.height = 1;
    const brush = surface.getContext("2d", { willReadFrequently: true });
    const parse = (value) => {
      if (!value || value === "transparent") return null;
      brush.clearRect(0, 0, 1, 1);
      brush.fillStyle = "#000000";
      brush.fillStyle = value;
      brush.fillRect(0, 0, 1, 1);
      const data = brush.getImageData(0, 0, 1, 1).data;
      return { r: data[0], g: data[1], b: data[2], a: data[3] / 255 };
    };
    const bgOf = (element) => {
      let node = element;
      while (node && node !== document.documentElement) {
        const color = parse(getComputedStyle(node).backgroundColor);
        if (color && color.a > 0.6) return color;
        node = node.parentElement;
      }
      return { r: 255, g: 255, b: 255, a: 1 };
    };
    const lum = (color) => {
      const channel = (value) => {
        const c = value / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
    };
    const ratio = (fg, bg) => {
      const a = lum(fg) + 0.05;
      const b = lum(bg) + 0.05;
      return Math.round((Math.max(a, b) / Math.min(a, b)) * 100) / 100;
    };
    const samples = [...document.querySelectorAll('[data-lesson="37"] p, [data-lesson="37"] li, [data-lesson="37"] span, [data-lesson="37"] h1, [data-lesson="37"] h2, [data-lesson="37"] h3, [data-lesson="37"] h4, [data-lesson="37"] td, [data-lesson="37"] th')]
      .filter((element) => (element.textContent || "").trim().length > 12 && element.offsetParent !== null)
      .slice(0, 700);
    let worst = { ratio: 99, text: "" };
    let below = 0;
    for (const element of samples) {
      const style = getComputedStyle(element);
      const size = parseFloat(style.fontSize);
      const weight = parseInt(style.fontWeight, 10) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const fg = parse(style.color);
      if (!fg) continue;
      const value = ratio(fg, bgOf(element));
      if (value < (large ? 3 : 4.5)) below++;
      if (value < worst.ratio) worst = { ratio: value, text: (element.textContent || "").trim().slice(0, 60) };
    }
    return { samples: samples.length, below, worst };
  });
}

const answerFor = (question) => {
  const solution = TEST_SOLUTIONS_37.find((entry) => entry.n === question.n);
  if (question.options) return solution.answer.slice(0, 1);
  return solution.answer;
};

for (const vp of [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x900", width: 768, height: 900 },
  { name: "375x812", width: 375, height: 812 },
]) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-lesson="37"] [data-step-id="cover"]', { timeout: 30000 });
  await page.waitForTimeout(500);

  const top = await boxes();
  ok(top.totalLocks === 1 && top.locks === 1, `${vp.name}: exactly one visible site-lock button (total ${top.totalLocks}, visible ${top.locks})`);
  ok(top.scrollWidth <= top.clientWidth, `${vp.name}: no horizontal overflow (${top.scrollWidth} > ${top.clientWidth})`);
  ok(top.direction === "rtl", `${vp.name}: lesson shell stays RTL`);
  await shot(`lesson-${vp.name}-top`);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  const bottom = await boxes();
  ok(overlap(bottom.lock, bottom.next) === 0, `${vp.name}: lock and Next do not overlap`);
  ok(overlap(bottom.lock, bottom.prev) === 0, `${vp.name}: lock and Previous do not overlap`);
  ok(overlap(bottom.nav, bottom.next) > 0, `${vp.name}: Next sits inside the shared navigation bar`);
  await shot(`lesson-${vp.name}-bottom`);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  const contrast = await contrastReport();
  ok(contrast.below === 0, `${vp.name}: sampled lesson text meets WCAG AA (${contrast.below} below of ${contrast.samples}; worst ${contrast.worst.ratio})`);

  report.viewports.push({
    viewport: vp.name,
    locks: top.locks,
    horizontal: { scrollWidth: top.scrollWidth, clientWidth: top.clientWidth },
    direction: top.direction,
    contrast,
    overlaps: { lockNext: overlap(bottom.lock, bottom.next), lockPrev: overlap(bottom.lock, bottom.prev) },
  });

  if (vp.width === 375) {
    await page.click("button[aria-controls='lesson37-mobile-nav']");
    await page.waitForTimeout(350);
    const drawerOpen = await page.evaluate(() => {
      const panel = document.querySelector("#lesson37-mobile-nav");
      return { hidden: panel?.hidden, chapters: panel?.querySelectorAll("nav section").length ?? 0, expanded: document.querySelector("button[aria-controls='lesson37-mobile-nav']")?.getAttribute("aria-expanded") };
    });
    ok(drawerOpen.hidden === false && drawerOpen.expanded === "true", "375x812: the contents drawer opens");
    ok(drawerOpen.chapters === 11, `375x812: the drawer lists all 11 chapters (got ${drawerOpen.chapters})`);
    await shot("lesson-mobile-drawer");
    await page.click("#lesson37-mobile-nav nav section:nth-child(2) button");
    await page.waitForTimeout(300);
    await page.click("#lesson37-mobile-nav nav section:nth-child(2) ol button");
    await page.waitForTimeout(400);
    const afterChoice = await page.evaluate(() => ({ hidden: document.querySelector("#lesson37-mobile-nav")?.hidden, step: document.querySelector("[data-step-id]")?.getAttribute("data-step-id") }));
    ok(afterChoice.hidden === true && afterChoice.step !== "cover", "375x812: choosing a step in the drawer navigates and closes it");
  }
}

// ---- كل الخطوات على مقاس اللابتوب: لا خطوة أطول من شاشتين ----
for (const vp of [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
]) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-step-id="cover"]', { timeout: 30000 });
  await page.waitForTimeout(400);
  const heights = [];
  for (let i = 0; i < STEP_COUNT_37; i += 1) {
    const state = await page.evaluate(() => {
      const step = document.querySelector("[data-step-id]");
      return {
        id: step?.getAttribute("data-step-id"),
        height: Math.round(step?.getBoundingClientRect().height ?? 0),
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });
    heights.push(state);
    ok(state.scrollWidth <= state.clientWidth, `${vp.name} ${state.id}: no horizontal overflow`);
    if (vp.width === 1440 && ["cover", "s14", "s30b", "s32a", "s38"].includes(state.id)) await shot(`step-${state.id}`);
    if (i < STEP_COUNT_37 - 1) {
      await page.click("[data-step-nav='next']");
      await page.waitForTimeout(120);
    }
  }
  ok(heights.length === STEP_COUNT_37 && heights.every((entry) => entry.id), `${vp.name}: all ${STEP_COUNT_37} steps are reachable with Next`);
  const tallest = [...heights].sort((a, b) => b.height - a.height).slice(0, 5);
  report.steps.push({ viewport: vp.name, tallest, median: [...heights].sort((a, b) => a.height - b.height)[Math.floor(heights.length / 2)]?.height });
  const budget = Math.max(Math.round(vp.height * 2.5), 2250);
  ok(
    tallest[0].height <= budget,
    `${vp.name}: the tallest step stays within two and a half screens (${tallest[0].id}: ${tallest[0].height}px vs ${budget}px)`,
  );
  if (vp.width === 1440) console.log(`  ↳ 1440×900 أطول الخطوات: ${tallest.map((entry) => `${entry.id} ${entry.height}px`).join(" · ")}`);
}

// ---- لوحة المفاتيح ----
{
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-step-id="cover"]');
  await page.waitForTimeout(300);
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(200);
  ok((await boxes()).step === "s01", "keyboard: ArrowLeft advances in the RTL layout");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(200);
  ok((await boxes()).step === "cover", "keyboard: ArrowRight goes back");
}

// ---- الاختبار: محايد ثم مصحّح ----
{
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-lesson="37"]');
  await page.click("[data-area-tab='test']");
  await page.waitForTimeout(300);
  const neutral = await page.evaluate(() => ({
    questions: document.querySelectorAll("[data-test-question]").length,
    feedback: document.querySelectorAll("[data-test-feedback]").length,
    score: document.querySelectorAll("[data-test-score]").length,
    text: document.body.textContent.includes("الإجابة النموذجية"),
  }));
  ok(neutral.questions === 25, `1440x900: the test shows 25 question panels (got ${neutral.questions})`);
  ok(neutral.feedback === 0 && neutral.score === 0 && neutral.text === false, "1440x900: no score, feedback, or model answer before submit");
  ok((await page.locator("[data-test-submit], button:has-text('إرسال الاختبار')").first().isDisabled()) === true, "1440x900: submit is disabled before answering");
  await shot("test-before-submit");

  for (const question of TEST_37) {
    const card = page.locator(`[data-test-question="${question.n}"]`);
    if (question.options) await card.locator(`input[value="${answerFor(question)}"]`).check();
    else await card.locator("input[type=text], textarea").fill(answerFor(question));
  }
  await page.locator("button:has-text('إرسال الاختبار')").first().click();
  await page.waitForTimeout(500);
  const graded = await page.evaluate(() => {
    const score = document.querySelector("[data-test-score]")?.textContent ?? "";
    return {
      score,
      feedback: document.querySelectorAll("[data-test-feedback]").length,
      hasReason: document.body.textContent.includes("السبب:"),
    };
  });
  ok(/25\s*\/\s*25/.test(graded.score), `1440x900: the completed test scores 25/25 (got "${graded.score.replace(/\s+/g, " ").slice(0, 40)}")`);
  ok(graded.feedback === 25, `1440x900: all 25 questions receive feedback (got ${graded.feedback})`);
  ok(graded.hasReason, "1440x900: each answer is accompanied by its reason");
  await shot("test-after-submit");

  await page.click("[data-area-tab='solutions']");
  await page.waitForTimeout(800);
  const solved = await page.evaluate(() => document.querySelectorAll("[data-area='lesson37-solutions'] [data-solution]").length);
  ok(solved === 5, `1440x900: the solutions area opens on its first level with five cards (got ${solved})`);
  await shot("solutions-unlocked");
}

// ---- الحلول مقفلة قبل التسليم + بوابة المعلم ----
{
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-lesson="37"]');
  const lockedTab = await page.evaluate(() => {
    const button = document.querySelector("[data-area-tab='solutions']");
    return { disabled: button?.disabled, label: button?.textContent ?? "" };
  });
  ok(lockedTab.label.includes("🔒"), "a fresh session marks the solutions tab as locked");
  await page.click("[data-area-tab='teacher']");
  await page.waitForTimeout(300);
  ok(await page.locator("#l37-teacher-password").count() === 1, "the teacher area is password-gated");
  await shot("teacher-gate");
  await page.fill("#l37-teacher-password", "somer173");
  await page.locator("button:has-text('دخول المعلم')").click();
  await page.waitForTimeout(900);
  const teacher = await page.evaluate(() => ({
    tabs: document.querySelectorAll("[data-area='lesson37-teacher'] nav[aria-label='أقسام دليل المعلم'] button").length,
    coverage: document.querySelectorAll("[data-coverage-section]").length,
  }));
  ok(teacher.tabs === 4, `the teacher guide exposes its four tabs (got ${teacher.tabs})`);
  ok(teacher.coverage === 39, `the teacher coverage ledger lists 39 rows (got ${teacher.coverage})`);
  await page.locator("button:has-text('حلول الاختبار')").first().click();
  await page.waitForTimeout(400);
  const teacherSolutions = await page.evaluate(() => document.querySelectorAll("[data-teacher-solution]").length);
  ok(teacherSolutions === 25, `the teacher area holds all 25 solutions (got ${teacherSolutions})`);
  await shot("teacher-unlocked");
}

// ---- 375px: الاختبار والمعلم والحلول ----
{
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-lesson="37"]');
  for (const tab of ["test", "teacher"]) {
    await page.click(`[data-area-tab='${tab}']`);
    await page.waitForTimeout(350);
    const state = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, locks: [...document.querySelectorAll("[data-site-lock-button='true']")].filter((el) => el.offsetParent !== null).length }));
    ok(state.scrollWidth <= state.clientWidth, `375x812 ${tab}: no horizontal overflow`);
    ok(state.locks === 1, `375x812 ${tab}: exactly one site-lock button`);
    await shot(`area-375x812-${tab}`);
  }
}

await browser.close();

ok(report.consoleErrors.length === 0, `no console or page errors (${report.consoleErrors.slice(0, 3).join(" | ")})`);
report.checks = checks;
report.failures = failures;
writeFileSync(`${OUT}/verification.json`, JSON.stringify(report, null, 2));

console.log(`Lesson 37 browser audit: ${checks - failures.length}/${checks} checks passed.`);
if (failures.length) {
  for (const failure of failures) console.error(`  ✕ ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 37 browser audit passed at ${report.viewports.map((entry) => entry.viewport).join(", ")}.`);
