// ============================================================
// Optional real-Chromium verification for Lesson 35 (FUTURE GARDEN STUDIO).
// Provision the browser once:
//   npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Serve the built app first:
//   npm run build && npm run preview -- --host 0.0.0.0 --port 4173
// Then run:
//   node scripts/audit-lesson35-browser.mjs
//
// What it verifies at 1440×900, 1280×800, 768×900 and 375×812:
//   • exactly one visible site-lock button, inside the shared step nav;
//   • lock / Previous / Next / mobile map never overlap, at the top and the bottom;
//   • no horizontal page overflow, RTL shell, and readable text contrast;
//   • keyboard navigation (ArrowLeft / ArrowRight / Home / End) with focus rings;
//   • the mobile map drawer opens at ≤1023px and stays closed above;
//   • the 25-question test is neutral before submit, graded after, and
//     keeps its score and per-question feedback across tab navigation;
//   • the solutions area is gated, then renders 25 detailed solutions;
//   • the teacher area is password-gated and renders its full key after unlock;
//   • no console or page errors.
// Writes docs/lesson35-visual/verification.json plus screenshots.
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

// Answers come from the lesson's own data so this script never drifts.
await esbuild.build({
  absWorkingDir: process.cwd(),
  stdin: { contents: `export { TEST_35 } from "./src/lessons/lesson35/testData.ts";`, resolveDir: process.cwd(), loader: "ts" },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "node_modules/.lesson35-browser/test-data.mjs",
  packages: "external",
  logLevel: "silent",
});
const { TEST_35 } = await import(pathToFileURL(`${process.cwd()}/node_modules/.lesson35-browser/test-data.mjs`).href);

const work = "node_modules/.lesson35-browser";
mkdirSync(work, { recursive: true });
try {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
} catch {
  /* already extracted by a previous run */
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const OUT = "docs/lesson35-visual";
mkdirSync(OUT, { recursive: true });

const base = process.env.LESSON35_URL || "http://127.0.0.1:4173/English-Course/#/lesson/35";
const browser = await playwright.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true,
});

let checks = 0;
const failures = [];
const ok = (condition, message) => {
  checks++;
  if (!condition) failures.push(message);
};
const report = { baseUrl: base, viewports: [], consoleErrors: [], generatedAt: new Date().toISOString() };

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
  try {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  } catch {
    /* about:blank has no storage access */
  }
});
const page = await ctx.newPage();
// The sandbox cannot reach Google Fonts; aborted requests otherwise stall screenshots.
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
page.on("pageerror", (error) => report.consoleErrors.push(String(error)));
page.on("console", (message) => {
  if (message.type() === "error" && !message.text().includes("ERR_FAILED")) report.consoleErrors.push(message.text());
});

async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, animations: "disabled", timeout: 60000 });
}

const overlap = (a, b) => {
  if (!a || !b) return 0;
  const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return x > 1 && y > 1 ? Math.round(x * y) : 0;
};

async function boxes() {
  return page.evaluate(() => {
    const visible = (el) => el && el.offsetParent !== null;
    const rect = (el) => (el ? el.getBoundingClientRect().toJSON() : null);
    return {
      locks: [...document.querySelectorAll("[data-site-lock-button='true']")].filter(visible).length,
      totalLocks: document.querySelectorAll("[data-site-lock-button='true']").length,
      lock: rect([...document.querySelectorAll("[data-site-lock-button='true']")].filter(visible)[0]),
      next: rect([...document.querySelectorAll("[data-step-nav='next']")].filter(visible)[0]),
      prev: rect([...document.querySelectorAll("[data-step-nav='prev']")].filter(visible)[0]),
      fab: rect([...document.querySelectorAll(".fg35-mobile-nav__toggle")].filter(visible)[0]),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      direction: getComputedStyle(document.querySelector(".fg35-app")).direction,
      step: document.querySelector("[data-step-id]")?.getAttribute("data-step-id"),
    };
  });
}

/** WCAG relative luminance + contrast ratio for the most common text nodes. */
async function contrastReport() {
  return page.evaluate(() => {
    const parse = (value) => {
      const match = value.match(/rgba?\(([^)]+)\)/);
      if (!match) return null;
      const [r, g, b, a = "1"] = match[1].split(",").map((part) => parseFloat(part));
      return { r, g, b, a: Number(a) };
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
    const samples = [...document.querySelectorAll("[data-step-id] p, [data-step-id] li, [data-step-id] span, [data-step-id] h1, [data-step-id] h2, [data-step-id] h3, [data-step-id] h4")]
      .filter((element) => (element.textContent || "").trim().length > 12 && element.offsetParent !== null)
      .slice(0, 400);
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

const answers = TEST_35.map((question) => ({
  n: question.n,
  type: question.type,
  value: question.type === "single" ? question.answer : question.type === "write" ? question.modelAnswers[0] : question.accept[0],
}));

for (const vp of [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x900", width: 768, height: 900 },
  { name: "375x812", width: 375, height: 812 },
]) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".fg35-hero", { timeout: 30000 });
  await page.waitForTimeout(600);

  const top = await boxes();
  ok(top.totalLocks === 1 && top.locks === 1, `${vp.name}: exactly one visible site-lock button (total ${top.totalLocks}, visible ${top.locks})`);
  ok(top.scrollWidth <= top.clientWidth, `${vp.name}: no horizontal overflow (${top.scrollWidth} > ${top.clientWidth})`);
  ok(top.direction === "rtl", `${vp.name}: lesson shell stays RTL`);
  await shot(`lesson-${vp.name}-top`);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  const bottom = await boxes();
  ok(overlap(bottom.lock, bottom.next) === 0, `${vp.name}: lock and Next do not overlap`);
  ok(overlap(bottom.lock, bottom.prev) === 0, `${vp.name}: lock and Previous do not overlap`);
  ok(overlap(bottom.fab, bottom.lock) === 0, `${vp.name}: mobile map button and lock do not overlap`);
  ok(overlap(bottom.fab, bottom.next) === 0, `${vp.name}: mobile map button and Next do not overlap`);
  ok(vp.width < 1024 ? !!bottom.fab : !bottom.fab, `${vp.name}: mobile map button ${vp.width < 1024 ? "visible" : "hidden"}`);
  await shot(`lesson-${vp.name}-bottom`);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const contrast = await contrastReport();
  ok(contrast.below === 0, `${vp.name}: all sampled lesson text meets WCAG AA (${contrast.below} below of ${contrast.samples}; worst ${contrast.worst.ratio}: ${contrast.worst.text})`);

  report.viewports.push({
    viewport: vp.name,
    visibleLockCount: top.locks,
    totalLockCount: top.totalLocks,
    horizontal: { scrollWidth: top.scrollWidth, clientWidth: top.clientWidth },
    direction: top.direction,
    contrast,
    overlaps: {
      lockNext: overlap(bottom.lock, bottom.next),
      lockPrev: overlap(bottom.lock, bottom.prev),
      fabLock: overlap(bottom.fab, bottom.lock),
      fabNext: overlap(bottom.fab, bottom.next),
    },
    fabVisible: !!bottom.fab,
  });

  if (vp.width === 375) {
    await page.click(".fg35-mobile-nav__toggle");
    await page.waitForTimeout(450);
    const drawer = await page.evaluate(() => ({
      open: !!document.querySelector(".fg35-mobile-nav__body"),
      groups: document.querySelectorAll(".fg35-mobile-nav__body .fg35-group__btn").length,
      steps: document.querySelectorAll(".fg35-mobile-nav__body .fg35-stepbtn").length,
      expanded: document.querySelector(".fg35-mobile-nav__toggle")?.getAttribute("aria-expanded"),
    }));
    ok(drawer.open && drawer.expanded === "true", "375x812: mobile map drawer opens");
    ok(drawer.groups === 5, `375x812: drawer lists all five stages (got ${drawer.groups})`);
    ok(drawer.steps >= 10, `375x812: drawer lists the expanded stage's steps (got ${drawer.steps})`);
    await shot("lesson-mobile-map-open");
    await page.click(".fg35-mobile-nav__body .fg35-stepbtn >> nth=1");
    await page.waitForTimeout(450);
    ok((await boxes()).step !== "cover", "375x812: a step chosen in the drawer navigates the lesson");
    ok((await page.locator(".fg35-mobile-nav__body").count()) === 0, "375x812: choosing a step closes the drawer");
    await shot("lesson-mobile-step-chosen");
  }
}

// ---- keyboard + focus contract (desktop) ----
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("about:blank");
await page.goto(base, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".fg35-hero", { timeout: 30000 });
await page.waitForTimeout(400);
await page.click("button:has-text('ابدأ من البذرة الأولى')");
await page.waitForTimeout(400);
const stepAfterStart = (await boxes()).step;
await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(350);
const stepAfterArrow = (await boxes()).step;
ok(stepAfterStart !== stepAfterArrow, `keyboard: ArrowLeft advances in the RTL flow (${stepAfterStart} → ${stepAfterArrow})`);
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(350);
ok((await boxes()).step === stepAfterStart, "keyboard: ArrowRight returns to the previous step");
await page.keyboard.press("End");
await page.waitForTimeout(400);
ok((await boxes()).step === "closing", "keyboard: End jumps to the final step");
await page.keyboard.press("Home");
await page.waitForTimeout(400);
ok((await boxes()).step === "cover", "keyboard: Home returns to the cover");
await page.keyboard.press("Tab");
const focus = await page.evaluate(() => {
  const element = document.activeElement;
  const style = element ? getComputedStyle(element) : null;
  return { tag: element?.tagName, outline: style?.outlineStyle, shadow: style?.boxShadow, width: style?.outlineWidth };
});
ok(!!focus.tag && focus.tag !== "BODY", "keyboard: Tab lands on a real control");
ok(focus.shadow !== "none" || (focus.outline !== "none" && focus.width !== "0px"), `keyboard: focused control shows a visible focus ring (${JSON.stringify(focus)})`);

// ---- density review: every step stays a short, one-purpose screen ----
await page.evaluate(() => { for (const group of document.querySelectorAll(".fg35-group__btn")) if (group.getAttribute("aria-expanded") !== "true") group.click(); });
await page.waitForTimeout(300);
const stepIds = await page.evaluate(() => [...document.querySelectorAll("[data-step-nav]")].map((button) => button.getAttribute("data-step-nav")).filter((id) => id && id !== "prev" && id !== "next"));
ok(stepIds.length === 61, `density: all 61 steps are exposed in the rail (got ${stepIds.length})`);
const heights = [];
for (const id of stepIds) {
  await page.evaluate(() => { for (const group of document.querySelectorAll(".fg35-group__btn")) if (group.getAttribute("aria-expanded") !== "true") group.click(); });
  await page.waitForTimeout(40);
  await page.click(`[data-step-nav="${id}"]`);
  await page.waitForTimeout(150);
  const measured = await page.evaluate(() => {
    const step = document.querySelector("[data-step-id]");
    return {
      id: step?.getAttribute("data-step-id"),
      height: step ? Math.round(step.getBoundingClientRect().height) : 0,
      words: (document.querySelector('[data-area="l35-lesson"]')?.textContent || "").trim().split(/\s+/).length,
    };
  });
  heights.push(measured);
  ok(measured.id === id, `density: rail selection lands on ${id} (got ${measured.id})`);
}
heights.sort((a, b) => b.height - a.height);
const tallest = heights[0];
const median = heights[Math.floor(heights.length / 2)];
ok(tallest.height <= 1600, `density: no step becomes a scrolling wall — tallest is ${tallest.id} at ${tallest.height}px`);
ok(median.height <= 1100, `density: median step height is ${median.height}px at 1440x900`);
report.stepHeights = { tallest: heights.slice(0, 5), median: median.height, count: heights.length };
await page.click("[data-step-nav='cover']");
await page.waitForTimeout(300);

// ---- test / solutions / teacher flow ----
await page.click("[data-area-tab='test']");
await page.waitForTimeout(500);
const pre = await page.evaluate(() => {
  const root = document.querySelector("[data-area='lesson35-test']");
  const text = root?.textContent || "";
  return {
    neutral: !/✓ إجابة صحيحة|✕ إجابة غير صحيحة|النتيجة/.test(text),
    questions: document.querySelectorAll("[data-test-q]").length,
    feedback: document.querySelectorAll("[data-test-feedback]").length,
    submitDisabled: document.querySelector("[data-test-submit]")?.disabled,
    progress: /0\s*\/\s*25/.test(text),
  };
});
ok(pre.neutral, "test: no correctness chips, score or explanations before submit");
ok(pre.questions === 25, `test: 25 questions rendered (got ${pre.questions})`);
ok(pre.feedback === 0, "test: no per-question feedback before submit");
ok(pre.submitDisabled === true, "test: submit is disabled before all 25 answers exist");
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(250);
await shot("test-before-submit");

for (const item of answers) {
  const card = page.locator(`[data-test-q="${item.n}"]`);
  if (item.type === "single") await card.locator("[role='radio']").nth(item.value).check();
  else if (item.type === "write") await card.locator("textarea").fill(item.value);
  else await card.locator("input").fill(item.value);
}
await page.waitForTimeout(400);
const ready = await page.evaluate(() => !document.querySelector("[data-test-submit]")?.disabled);
ok(ready, "test: submit enables once all 25 questions are answered");
const stillNeutral = await page.evaluate(() => document.querySelectorAll("[data-test-feedback]").length === 0);
ok(stillNeutral, "test: answered-but-unsubmitted state still shows no feedback");
await page.click("[data-test-submit]");
await page.waitForTimeout(600);
const result = await page.evaluate(() => {
  const text = document.querySelector("[data-test-score]")?.textContent || "";
  return { text: text.replace(/\s+/g, " ").slice(0, 160), feedback: document.querySelectorAll("[data-test-feedback]").length };
});
ok(/25\s*\/\s*25/.test(result.text), `test: the full correct key scores 25/25 (got "${result.text}")`);
ok(result.feedback === 25, `test: every question reveals feedback after submit (got ${result.feedback})`);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(250);
await shot("test-after-submit");

await page.click("[data-area-tab='solutions']");
await page.waitForTimeout(600);
ok((await page.locator("[data-solution]").count()) === 25, "solutions: 25 detailed solutions render after submission");
ok((await page.locator("[data-area='lesson35-solutions']").textContent()).includes("حل مستنتج"), "solutions: labelled as platform-derived");
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);
await shot("solutions-unlocked");

await page.click("[data-area-tab='test']");
await page.waitForTimeout(400);
const restored = await page.evaluate(() => ({
  score: /25\s*\/\s*25/.test(document.querySelector("[data-test-score]")?.textContent || ""),
  feedback: document.querySelectorAll("[data-test-feedback]").length,
}));
ok(restored.score && restored.feedback === 25, "test: score and feedback survive navigating to solutions and back");

await page.click("[data-area-tab='teacher']");
await page.waitForTimeout(400);
ok((await page.locator("[data-teacher-solution]").count()) === 0, "teacher: solutions hidden behind the password gate");
await shot("teacher-gate");
await page.fill("#l35-teacher-password", "somer173");
await page.click("button:has-text('دخول المعلم')");
await page.waitForTimeout(700);
ok((await page.locator("[data-teacher-solution]").count()) === 25, "teacher: 25 detailed solutions after unlocking");
ok((await page.locator("[data-ft-key-item]").count()) === 15, "teacher: shared 15-question FinalTest key rendered");
await page.evaluate(() => {
  const head = [...document.querySelectorAll("h3")].find((element) => element.textContent.includes("مفتاح تصحيح الاختبار النهائي"));
  head?.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(350);
await shot("teacher-detailed-solutions");

const perArea = {};
for (const tab of ["lesson", "test", "solutions", "teacher"]) {
  await page.click(`[data-area-tab='${tab}']`);
  await page.waitForTimeout(350);
  perArea[tab] = await page.locator("[data-site-lock-button='true']:visible").count();
  ok(perArea[tab] === 1, `tab ${tab}: exactly one visible site-lock button (got ${perArea[tab]})`);
}
report.lockPerArea = perArea;

// Mobile pass for the three non-lesson areas (same mounted state).
await page.setViewportSize({ width: 375, height: 812 });
await page.waitForTimeout(400);
const mobileAreas = {};
for (const tab of ["test", "solutions", "teacher"]) {
  await page.click(`[data-area-tab='${tab}']`);
  await page.waitForTimeout(450);
  const state = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    locks: [...document.querySelectorAll("[data-site-lock-button='true']")].filter((element) => element.offsetParent !== null).length,
  }));
  mobileAreas[tab] = state;
  ok(state.scrollWidth <= state.clientWidth, `375x812 ${tab}: no horizontal overflow (${state.scrollWidth} > ${state.clientWidth})`);
  ok(state.locks === 1, `375x812 ${tab}: exactly one visible site-lock button (got ${state.locks})`);
  await shot(`area-375x812-${tab}`);
}
report.mobileAreas = mobileAreas;

await browser.close();
ok(report.consoleErrors.length === 0, `no console or page errors (${report.consoleErrors.join(" | ")})`);
report.checks = checks;
report.passed = checks - failures.length;
report.failures = failures;
writeFileSync(`${OUT}/verification.json`, JSON.stringify(report, null, 2));

if (failures.length) {
  console.error(`Lesson 35 browser audit: ${checks - failures.length} passed, ${failures.length} FAILED`);
  for (const failure of failures) console.error(" ✕ " + failure);
  process.exit(1);
}
console.log(`Lesson 35 browser audit: ${checks} checks passed, 0 failed (4 viewports, keyboard, contrast, test/solutions/teacher flow).`);
