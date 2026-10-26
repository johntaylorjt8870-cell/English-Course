// Real-Chromium audit for Lesson 38 — Future Achievement Observatory.
// Run: npm run build && npm run preview -- --host 0.0.0.0 --port 4173
// then: node scripts/audit-lesson38-browser.mjs
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const work = "node_modules/.lesson38-browser";
mkdirSync(work, { recursive: true });
await esbuild.build({
  absWorkingDir: process.cwd(),
  stdin: {
    contents: `export { TEST_COUNT_38 } from "./src/lessons/lesson38/testData38.ts";
export { TEST_SOLUTIONS_38 } from "./src/lessons/lesson38/solutionsData38.ts";
export { STEP_COUNT_38 } from "./src/lessons/lesson38/data.ts";`,
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: `${work}/test-data.mjs`,
  packages: "external",
  logLevel: "silent",
});
const { TEST_COUNT_38, TEST_SOLUTIONS_38, STEP_COUNT_38 } = await import(
  pathToFileURL(`${process.cwd()}/${work}/test-data.mjs`).href
);

const ANSWER_SENTINEL = TEST_SOLUTIONS_38.find((solution) => solution.n === 23);
const EXPLANATION_MARKER = ANSWER_SENTINEL?.explanation ?? "";
const ANSWER_MARKER = "هذا هو الفخ الذهبي للفقرة";
if (EXPLANATION_MARKER.length < 30) throw new Error("Lesson 38 browser audit could not resolve its answer sentinel.");

try {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
} catch {
  /* already extracted */
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const OUT = "docs/lesson38-visual";
mkdirSync(OUT, { recursive: true });
const base = process.env.LESSON38_URL || "http://127.0.0.1:4173/English-Course/#/lesson/38";
const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });

let checks = 0;
const failures = [];
const ok = (condition, message) => {
  checks++;
  if (!condition) failures.push(message);
};
const report = { baseUrl: base, generatedAt: new Date().toISOString(), viewports: [], consoleErrors: [], stepCount: STEP_COUNT_38, testCount: TEST_COUNT_38 };

const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
await ctx.addInitScript(() => {
  try {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  } catch {
    /* about:blank */
  }
});
const page = await ctx.newPage();
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
page.on("pageerror", (error) => report.consoleErrors.push(String(error)));
page.on("console", (message) => {
  if (message.type() === "error" && !message.text().includes("ERR_FAILED")) report.consoleErrors.push(message.text());
});

const visibleTextInViewport = () =>
  page.evaluate(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return [...document.body.querySelectorAll("*")]
      .filter((element) => element.children.length === 0)
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;
        if (rect.bottom < 0 || rect.top > height) return false;
        if (rect.right < 0 || rect.left > width) return false;
        const style = getComputedStyle(element);
        return style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0.05;
      })
      .map((element) => element.textContent ?? "")
      .join(" ");
  });

const shot = async (name) => {
  const visible = await visibleTextInViewport();
  ok(!visible.includes(ANSWER_MARKER) && !visible.includes(EXPLANATION_MARKER), `${name}: frame contains no committed answer text`);
  ok(!/الإجابة النموذجية/.test(visible), `${name}: no model-answer label is visible`);
  await page.screenshot({ path: `${OUT}/${name}.png`, animations: "disabled", timeout: 60000 });
};

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
    const locks = [...document.querySelectorAll("[data-site-lock-button='true']")];
    const visibleLocks = locks.filter(visible);
    const nav = [...document.querySelectorAll("[data-lesson-step-nav='true']")].filter(visible)[0];
    return {
      totalLocks: locks.length,
      locks: visibleLocks.length,
      lockInsideNav: !!visibleLocks[0] && !!visibleLocks[0].closest("[data-lesson-step-nav='true']"),
      lock: rect(visibleLocks[0]),
      next: rect([...document.querySelectorAll("[data-step-nav='next']")].filter(visible)[0]),
      prev: rect([...document.querySelectorAll("[data-step-nav='prev']")].filter(visible)[0]),
      navFixed: !!nav && getComputedStyle(nav).position === "fixed",
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      direction: getComputedStyle(document.querySelector('[data-lesson="38"]')).direction,
      shell: document.querySelector('[data-lesson="38"]')?.getAttribute("data-l35-shell"),
      counter: document.querySelector('[data-lesson="38"] header > span[dir="ltr"]')?.textContent?.trim() ?? "",
      hasRail: !!document.querySelector("aside nav")?.offsetParent,
    };
  });

const VIEWPORTS = [
  { name: "1920x1080", width: 1920, height: 1080, rail: true },
  { name: "1280x800", width: 1280, height: 800, rail: true },
  { name: "768x900", width: 768, height: 900, rail: false },
  { name: "375x812", width: 375, height: 812, rail: false },
];

for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-lesson="38"] [data-step-id="cover"]', { timeout: 30000 });
  await page.waitForTimeout(400);
  const top = await boxes();
  ok(top.totalLocks === 1 && top.locks === 1, `${vp.name}: exactly one visible site-lock button`);
  ok(top.lockInsideNav, `${vp.name}: site lock lives inside shared step navigation`);
  ok(!top.navFixed, `${vp.name}: step navigation is not a fixed overlay`);
  ok(top.scrollWidth <= top.clientWidth + 1, `${vp.name}: no horizontal overflow (${top.scrollWidth} vs ${top.clientWidth})`);
  ok(top.direction === "rtl", `${vp.name}: shell stays RTL`);
  ok(top.shell === "lesson-1", `${vp.name}: real Lesson 1 shell`);
  ok(top.counter.replace(/\s+/g, " ") === `1 / ${STEP_COUNT_38}`, `${vp.name}: counter reads 1 / ${STEP_COUNT_38} (got "${top.counter}")`);
  ok(top.hasRail === vp.rail, `${vp.name}: rail visibility matches breakpoint`);
  ok(overlap(top.lock, top.next) === 0, `${vp.name}: lock and Next do not overlap`);
  ok(overlap(top.lock, top.prev) === 0, `${vp.name}: lock and Previous do not overlap`);
  await shot(`${vp.name}-cover`);
  report.viewports.push({ name: vp.name, overflow: top.scrollWidth - top.clientWidth, lockNextOverlap: overlap(top.lock, top.next) });

  if (!vp.rail) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    await page.waitForTimeout(250);
    ok(await page.locator(".fixed.inset-0.z-50").count() > 0, `${vp.name}: mobile drawer opens`);
    await shot(`${vp.name}-drawer-open`);
    await page.locator(".fixed.inset-0.z-50").first().click({ position: { x: 8, y: 8 } }).catch(() => {});
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
  }
}

await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(base, { waitUntil: "domcontentloaded" });
await page.waitForSelector('[data-lesson="38"] [data-step-id="cover"]', { timeout: 30000 });

const goToStep = async (stepId) => {
  const drawerButton = page.getByRole("button", { name: "فهرس الدرس" });
  if (await drawerButton.isVisible()) {
    await drawerButton.click();
    await page.waitForTimeout(250);
  }
  const drawerStep = page.locator(`.fixed.inset-0.z-50 [data-step-nav='${stepId}']`).last();
  if ((await drawerStep.count()) === 0) {
    await page.locator(`aside [data-step-nav='${stepId}']`).first().scrollIntoViewIfNeeded();
    await page.locator(`aside [data-step-nav='${stepId}']`).first().click();
  } else {
    await drawerStep.scrollIntoViewIfNeeded();
    await drawerStep.click();
  }
  await page.waitForSelector(`[data-step-id='${stepId}']`, { timeout: 15000 });
  await page.waitForTimeout(250);
};

await goToStep("s03b");
await shot("1280x800-step-s03b");
await goToStep("s08");
await shot("1280x800-step-s08");
await goToStep("s32a");
await shot("1280x800-step-s32");

await page.locator("[data-area-tab='test']").first().click();
await page.waitForSelector("[data-test-question='1']", { timeout: 20000 });
const testText = await page.locator('[data-area="lesson38-test"]').last().innerText();
ok(!testText.includes("الإجابة النموذجية"), "test area is answer-free before submit");
ok(!testText.includes(EXPLANATION_MARKER), "test area does not embed Q23 explanation before submit");
ok((await page.locator("[data-test-question]").count()) === 25, "test area renders 25 questions");
await shot("1280x800-test-neutral");

await page.locator("[data-area-tab='solutions']").first().click({ force: true });
await page.waitForTimeout(400);
const solutionsLocked = await page.locator("[data-solutions-locked]").count();
ok(solutionsLocked > 0, "solutions stay locked before submit");
await shot("1280x800-solutions-locked");

ok(report.consoleErrors.filter((line) => !/fonts|ERR_FAILED|attachEvent/.test(line)).length === 0, `no page errors (${report.consoleErrors.join(" | ") || "none"})`);

writeFileSync(
  `${OUT}/verification.json`,
  JSON.stringify(
    {
      ...report,
      checks,
      failures,
      passed: failures.length === 0,
      notes: "Screenshots are pre-submit only. Answer keys are never captured.",
    },
    null,
    2,
  ),
);

await browser.close();
if (failures.length) {
  console.error(`✕ Lesson 38 browser audit failed: ${failures.length} of ${checks}`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 38 browser audit passed: ${checks} checks; ${VIEWPORTS.length} viewports; answer-free screenshots in ${OUT}`);
