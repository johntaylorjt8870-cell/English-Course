// Real-Chromium audit for the Lesson 1-faithful Lesson 35 shell.
// Run `npm run build && npm run preview -- --host 0.0.0.0 --port 4173`, then
// `node scripts/audit-lesson35-browser.mjs` (or set LESSON35_URL).
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const temp = "node_modules/.lesson35-browser";
mkdirSync(temp, { recursive: true });
await esbuild.build({
  absWorkingDir: process.cwd(),
  stdin: { contents: 'export { TEST_35 } from "./src/lessons/lesson35/testKey35.ts";', resolveDir: process.cwd(), loader: "ts" },
  bundle: true, platform: "node", format: "esm", outfile: `${temp}/test-data.mjs`, packages: "external", logLevel: "silent",
});
const { TEST_35 } = await import(pathToFileURL(`${process.cwd()}/${temp}/test-data.mjs`).href);
try {
  writeFileSync(`${temp}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${temp}/al2023.tar`, "-C", temp]);
} catch { /* archive is already extracted */ }
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${temp}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const OUT = "docs/lesson35-rebuild-visual";
mkdirSync(OUT, { recursive: true });
const base = process.env.LESSON35_URL || "http://127.0.0.1:4173/English-Course/#/lesson/35";
const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
await context.addInitScript(() => { try { localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"); } catch {} });
const page = await context.newPage();
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
const errors = [];
const jsResponses = [];
page.on("pageerror", (error) => errors.push(String(error)));
page.on("console", (message) => { if (message.type() === "error" && !message.text().includes("ERR_FAILED")) errors.push(message.text()); });
page.on("response", async (response) => {
  if (/\.js(?:\?|$)/.test(response.url())) {
    try { jsResponses.push({ url: response.url(), body: await response.text() }); } catch {}
  }
});

let checks = 0;
const failures = [];
const ok = (condition, message) => { checks++; if (!condition) failures.push(message); };
const overlapArea = (a, b) => {
  if (!a || !b) return 0;
  const w = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const h = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return w > 1 && h > 1 ? Math.round(w * h) : 0;
};
const boxes = () => page.evaluate(() => {
  const rect = (node) => node ? node.getBoundingClientRect().toJSON() : null;
  const visible = (node) => !!node && getComputedStyle(node).display !== "none" && node.getClientRects().length > 0;
  const root = document.querySelector('[data-lesson="35"]');
  const rail = [...root.querySelectorAll(".w-72")].find(visible);
  const main = root.querySelector("#l35-main");
  const content = root.querySelector('[data-area="l35-lesson"]');
  const lock = [...root.querySelectorAll("[data-site-lock-button='true']")].find(visible);
  const prev = [...root.querySelectorAll("[data-step-nav='prev']")].find(visible);
  const next = [...root.querySelectorAll("[data-step-nav='next']")].find(visible);
  return {
    direction: getComputedStyle(root).direction,
    bg: getComputedStyle(root).backgroundColor,
    shellFont: getComputedStyle(root).fontFamily,
    rail: rect(rail), main: rect(main), content: rect(content), lock: rect(lock), prev: rect(prev), next: rect(next),
    step: root.querySelector("[data-step-id]")?.getAttribute("data-step-id"),
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    menuButton: rect([...root.querySelectorAll("button[aria-label='فهرس الدرس']")].find(visible)),
  };
});
const shot = async (name) => page.screenshot({ path: `${OUT}/${name}.png`, animations: "disabled", timeout: 60000 });

function contrastAudit() {
  return page.evaluate(() => {
    const rgb = (value) => {
      const m = value.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const [r, g, b, a = 1] = m[1].split(",").map((x) => Number.parseFloat(x));
      return { r, g, b, a };
    };
    const bg = (el) => {
      for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
        const c = rgb(getComputedStyle(node).backgroundColor);
        if (c && c.a > 0.6) return c;
      }
      return { r: 255, g: 255, b: 255, a: 1 };
    };
    const lum = ({ r, g, b }) => {
      const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const ratio = (a, b) => { const x = lum(a) + 0.05, y = lum(b) + 0.05; return Math.max(x, y) / Math.min(x, y); };
    const nodes = [...document.querySelectorAll("[data-area='l35-lesson'] *")].filter((el) => el.getClientRects().length && (el.textContent || "").trim().length > 8);
    const failures = [];
    let worst = { ratio: 99, text: "" };
    for (const el of nodes) {
      const style = getComputedStyle(el);
      const fg = rgb(style.color);
      if (!fg) continue;
      const value = ratio(fg, bg(el));
      const large = Number.parseFloat(style.fontSize) >= 24 || (Number.parseFloat(style.fontSize) >= 18.66 && Number.parseInt(style.fontWeight, 10) >= 700);
      if (value < (large ? 3 : 4.5)) failures.push({ ratio: Number(value.toFixed(2)), text: (el.textContent || "").trim().slice(0, 60) });
      if (value < worst.ratio) worst = { ratio: Number(value.toFixed(2)), text: (el.textContent || "").trim().slice(0, 60) };
    }
    return { sampledTextNodes: nodes.length, failures: failures.slice(0, 20), failureCount: failures.length, worst };
  });
}

const viewportRecords = [];
for (const viewport of [
  { name: "1920x1080", width: 1920, height: 1080, rail: true },
  { name: "1280x800", width: 1280, height: 800, rail: true },
  { name: "768x900", width: 768, height: 900, rail: false },
  { name: "375x812", width: 375, height: 812, rail: false },
]) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForSelector('[data-step-id="cover"]', { timeout: 30000 });
  await page.waitForTimeout(150);
  const state = await boxes();
  ok(state.direction === "rtl", `${viewport.name}: RTL shell`);
  ok(state.bg === "rgb(244, 246, 251)", `${viewport.name}: Lesson 1 #f4f6fb canvas (${state.bg})`);
  ok(state.scrollWidth <= state.width, `${viewport.name}: no horizontal overflow (${state.scrollWidth}/${state.width})`);
  ok(Boolean(state.rail) === viewport.rail, `${viewport.name}: expected Lesson 1 rail visibility ${viewport.rail}`);
  ok(Boolean(state.menuButton) === !viewport.rail, `${viewport.name}: Lesson 1 mobile index button visibility`);
  ok(!!state.main && !!state.content, `${viewport.name}: main explanation region rendered`);
  if (viewport.rail) {
    ok(Math.abs(state.rail.width - 288) <= 1, `${viewport.name}: sidebar is fixed at 288px (got ${state.rail.width})`);
    ok(state.main.width > state.rail.width * 2, `${viewport.name}: explanation region is substantially wider than the index`);
    ok(state.content.width <= 896, `${viewport.name}: centered explanation content is at most 896px (got ${state.content.width})`);
    ok(state.content.width > state.rail.width, `${viewport.name}: explanation content is wider than the index`);
  }
  const contrast = await contrastAudit();
  ok(contrast.failureCount === 0, `${viewport.name}: contrast sample has no AA failures (${contrast.failureCount}; worst ${contrast.worst.ratio}: ${contrast.worst.text})`);
  await shot(`${viewport.name}-cover`);
  viewportRecords.push({ viewport: viewport.name, shell: state, contrast });

  if (!viewport.rail) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    const drawer = await page.locator(".fixed.inset-0.z-50").count();
    ok(drawer === 1, `${viewport.name}: mobile index opens as the Lesson 1 modal drawer`);
    const mobileStep = page.locator(".fixed.inset-0.z-50 [data-step-nav='meaning']").last();
    await mobileStep.click();
    await page.waitForTimeout(120);
    ok((await boxes()).step === "meaning", `${viewport.name}: choosing a map item changes the displayed step`);
    ok(await page.locator(".fixed.inset-0.z-50").count() === 0, `${viewport.name}: choosing a step closes the drawer`);
    await shot(`${viewport.name}-drawer-navigation`);
  }
}

// Initial page and the pre-submit test flow must not request the 25-answer key chunk.
const secret = TEST_35.find((question) => question.n === 21).answer;
const hasSecretInLoadedJS = () => jsResponses.some((response) => response.body.includes(secret));
const hasTestKeyChunkLoaded = () => jsResponses.some((response) => response.url.includes("/testKey35-"));
ok(!hasSecretInLoadedJS(), "initial loaded JavaScript has no unique model answer for final-test Q21");
ok(!hasTestKeyChunkLoaded(), "initial student JavaScript payload excludes the deferred final-test key chunk");
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto("about:blank");
await page.goto(base, { waitUntil: "networkidle" });
await page.locator("[data-area-tab='solutions']").click();
await page.waitForSelector('[data-solutions-locked="true"]', { timeout: 30000 });
await page.waitForTimeout(100);
ok(!hasSecretInLoadedJS() && !hasTestKeyChunkLoaded(), "opening locked solutions does not load final-test answers or their deferred JS chunk");
await page.locator("[data-area-tab='test']").click();
await page.waitForSelector("[data-test-q='25']", { timeout: 30000 });
const preState = await page.evaluate(() => ({
  feedback: document.querySelectorAll("[data-test-feedback]").length,
  answerText: document.querySelector('[data-area="lesson35-test"]')?.textContent?.includes("I think education will change a lot in the future.") ?? false,
  submits: document.querySelector("[data-test-submit]")?.disabled,
  sourceCitations: /(?:المصدر\s*§|§\s*\d+|source section|source file)/i.test(document.querySelector('[data-area="l35-test"]')?.textContent || ""),
}));
ok(preState.feedback === 0 && preState.submits === true, "test begins without feedback and submit stays disabled");
ok(!preState.answerText, "final test model answer is absent from its initial rendered DOM");
ok(!preState.sourceCitations, "student test UI contains no internal source labels or section references");
ok(!hasSecretInLoadedJS() && !hasTestKeyChunkLoaded(), "pre-submit JavaScript responses contain neither a unique final-test answer nor the deferred key chunk");
await shot("test-before-submit");
for (const question of TEST_35) {
  const card = page.locator(`[data-test-q='${question.n}']`);
  if (question.type === "single") await card.locator("[role='radio']").nth(question.answer).click();
  else if (question.type === "write") await card.locator("textarea").fill(question.modelAnswers[0]);
  else await card.locator("input").fill(question.accept[0]);
}
ok(await page.locator("[data-test-submit]").isEnabled(), "all 25 responses enable submit");
const keyBeforeSubmit = hasSecretInLoadedJS();
const keyChunkBeforeSubmit = hasTestKeyChunkLoaded();
const stillNoAnswers = await page.locator("[data-test-feedback]").count() === 0 && !keyBeforeSubmit && !keyChunkBeforeSubmit;
ok(stillNoAnswers, "all answered but unsubmitted state still hides answers and explanations");
await page.locator("[data-test-submit]").click();
await page.waitForFunction(() => (document.querySelector("[data-test-score]")?.textContent || "").includes("25 / 25"), { timeout: 30000 });
await page.waitForTimeout(100);
ok(await page.locator("[data-test-feedback]").count() === 25, "submission reveals explanation for each of the 25 questions");
ok(hasSecretInLoadedJS() && hasTestKeyChunkLoaded(), "the deferred 25-answer key chunk is fetched only after submission");
await shot("test-after-submit");

await page.locator("[data-area-tab='solutions']").click();
await page.waitForSelector("[data-solution='25']", { timeout: 30000 });
ok(await page.locator("[data-solution]").count() === 25, "unlocked solutions render all 25 detailed entries");
await shot("solutions-open");
await page.locator("[data-area-tab='teacher']").click();
await page.waitForSelector("#l35-teacher-password", { timeout: 30000 });
ok(await page.locator("[data-teacher-solution]").count() === 0, "teacher key stays hidden behind its password gate");
await shot("teacher-locked");
await page.locator("#l35-teacher-password").fill("somer173");
await page.getByRole("button", { name: /دخول المعلم/ }).click();
await page.waitForSelector("[data-teacher-solution='25']", { timeout: 30000 });
ok(await page.locator("[data-teacher-solution]").count() === 25, "teacher password unlocks all 25 final-test keys");
await shot("teacher-open");

// Keyboard controls and common site-lock control remain functional.
await page.locator("[data-area-tab='lesson']").click();
await page.locator("[data-step-nav='cover']").click();
await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(80);
ok((await boxes()).step === "bridge", "ArrowLeft advances one step in RTL");
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(80);
ok((await boxes()).step === "cover", "ArrowRight returns one step in RTL");
const lockCount = await page.locator("[data-site-lock-button='true']:visible").count();
ok(lockCount === 1, "one shared site-lock button remains visible");

const summary = {
  baseUrl: base,
  checks,
  passed: checks - failures.length,
  failures,
  viewports: viewportRecords,
  deferredKey: {
    secretAnswerSample: secret,
    fetchedBeforeSubmit: keyBeforeSubmit,
    fetchedAfterSubmit: hasSecretInLoadedJS(),
    keyChunkFetchedBeforeSubmit: keyChunkBeforeSubmit,
    keyChunkFetchedAfterSubmit: hasTestKeyChunkLoaded(),
  },
  consoleErrors: errors,
  screenshotsDirectory: OUT,
};
ok(errors.length === 0, `no browser/console errors (${errors.join(" | ")})`);
summary.checks = checks;
summary.passed = checks - failures.length;
summary.failures = failures;
writeFileSync(`${OUT}/verification.json`, JSON.stringify(summary, null, 2));
await browser.close();
if (failures.length) {
  console.error(`Lesson 35 browser audit: ${summary.passed} passed, ${failures.length} FAILED`);
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}
console.log(`Lesson 35 browser audit: ${summary.passed}/${checks} passed across 4 viewports, navigation, assessment gating, answer-chunk timing, and teacher flow.`);
