// Real-Chromium audit for Lesson 39 — The Future Time Observatory.
//
// Run: npm run build && npm run preview -- --host 0.0.0.0 --port 4173
// then: node scripts/audit-lesson39-browser.mjs
//
// يغطي: 4 مقاسات شاشة، كل الخطوات الـ75 (فائض أفقي · وضوح الخط · اتجاه ·
// تعارض زر القفل مع التنقل)، تفاعلات المرصد، بوابة الاختبار قبل/بعد التسليم،
// عزل المفتاح على مستوى الشبكة، منطقة الحلول المقفلة، وبوابة المعلم.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const work = "node_modules/.lesson39-browser";
mkdirSync(work, { recursive: true });
await esbuild.build({
  absWorkingDir: process.cwd(),
  stdin: {
    contents: `export { SLIDES_39, STEP_COUNT_39 } from "./src/lessons/lesson39/data.ts";
export { TEST_SOLUTIONS_39 } from "./src/lessons/lesson39/solutionsData39.ts";
export { TEST_COUNT_39 } from "./src/lessons/lesson39/testData39.ts";`,
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: `${work}/data.mjs`,
  packages: "external",
  logLevel: "silent",
});
const { SLIDES_39, STEP_COUNT_39, TEST_SOLUTIONS_39, TEST_COUNT_39 } = await import(
  pathToFileURL(`${process.cwd()}/${work}/data.mjs`).href
);

const SENTINEL = TEST_SOLUTIONS_39.find((solution) => solution.n === 23);
const ANSWER_MARKER = SENTINEL?.answer ?? "";
const EXPLANATION_MARKER = SENTINEL?.explanation ?? "";
if (ANSWER_MARKER.length < 5 || EXPLANATION_MARKER.length < 30)
  throw new Error("Lesson 39 browser audit could not resolve its answer sentinel.");

try {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
} catch {
  /* already extracted */
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const OUT = "docs/lesson39-visual";
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const base = process.env.LESSON39_URL || "http://127.0.0.1:4173/English-Course/#/lesson/39";
const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });

let checks = 0;
const failures = [];
const ok = (condition, message) => {
  checks++;
  if (!condition) failures.push(message);
};
const report = {
  baseUrl: base,
  generatedAt: new Date().toISOString(),
  stepCount: STEP_COUNT_39,
  testCount: TEST_COUNT_39,
  viewports: [],
  consoleErrors: [],
  network: { answerChunks: [], preSubmitRequests: 0 },
};

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
const requests = [];
page.on("request", (request) => requests.push(request.url()));

const shot = async (name, options = {}) => {
  await page.screenshot({ path: `${OUT}/${name}.png`, animations: "disabled", timeout: 60000, ...options });
};

const overlap = (a, b) => {
  if (!a || !b) return 0;
  const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return x > 1 && y > 1 ? Math.round(x * y) : 0;
};

const shellState = () =>
  page.evaluate(() => {
    const visible = (el) => el && el.offsetParent !== null;
    const rect = (el) => (el ? el.getBoundingClientRect().toJSON() : null);
    const root = document.querySelector('[data-lesson="39"]');
    const locks = [...document.querySelectorAll("[data-site-lock-button='true']")].filter(visible);
    return {
      locks: locks.length,
      lock: rect(locks[0]),
      next: rect([...document.querySelectorAll("[data-step-nav='next']")].filter(visible)[0]),
      prev: rect([...document.querySelectorAll("[data-step-nav='prev']")].filter(visible)[0]),
      nav: rect([...document.querySelectorAll("[data-lesson-step-nav='true']")].filter(visible)[0]),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      direction: root ? getComputedStyle(root).direction : "",
      shell: root?.getAttribute("data-l35-shell") ?? "",
      hasRail: !!document.querySelector("aside nav")?.offsetParent,
      counter: document.querySelector('[data-lesson="39"] header > span[dir="ltr"]')?.textContent?.trim() ?? "",
    };
  });

const contrastFailures = (scopeSelector) =>
  page.evaluate((scopeSel) => {
    const lum = (c) => {
      const [r, g, b] = c.map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const parse = (color) => (color.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
    // يرجع كل الألوان المحتملة لخلفية العنصر: لون صريح، أو كل محطات تدرّج
    // (الزر الأساسي وشريط CTA يستخدمان linear-gradient، ولون backgroundColor
    // يبقى شفافًا فلا يكفي وحده).
    const gradientStops = (image) => {
      if (!image || image === "none") return [];
      return (image.match(/rgba?\([^)]+\)/g) || [])
        .filter((color) => {
          const alpha = (color.match(/[\d.]+/g) || [])[3];
          return !alpha || Number(alpha) > 0.5;
        })
        .map(parse);
    };
    const backgroundOf = (el) => {
      let node = el;
      while (node) {
        const style = getComputedStyle(node);
        const stops = gradientStops(style.backgroundImage);
        if (stops.length) return stops;
        const bg = style.backgroundColor;
        const alpha = (bg.match(/[\d.]+/g) || [])[3];
        if (bg && bg !== "rgba(0, 0, 0, 0)" && (!alpha || Number(alpha) > 0.5)) return [parse(bg)];
        node = node.parentElement;
      }
      return [[7, 11, 24]];
    };
    const failures = [];
    const seen = new Set();
    for (const el of document.querySelectorAll(`${scopeSel} *`)) {
      if (el.children.length) continue;
      const text = (el.textContent || "").trim();
      if (text.length < 3) continue;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || Number(style.opacity) < 0.4) continue;
      const l1 = lum(parse(style.color));
      const ratio = Math.min(
        ...backgroundOf(el).map((bg) => {
          const l2 = lum(bg);
          return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        }),
      );
      const minimum = parseFloat(style.fontSize) >= 24 ? 3 : 4.5;
      if (ratio >= minimum) continue;
      const key = text.slice(0, 45);
      if (seen.has(key)) continue;
      seen.add(key);
      failures.push(`${key} (${ratio.toFixed(2)}:1, needs ${minimum})`);
    }
    return failures;
  }, scopeSelector);

const checkContrast = async (label) => {
  const failures = [...(await contrastFailures("header")), ...(await contrastFailures("aside")), ...(await contrastFailures("main"))];
  ok(failures.length === 0, `${label}: text contrast ≥4.5:1 ${failures.slice(0, 3).join(" · ")}`);
};

const stepState = () =>
  page.evaluate(() => {
    const step = document.querySelector("[data-step-id]");
    if (!step) return null;
    const source = [...step.querySelectorAll("[data-source-unit]")];
    const fonts = source.map((node) => parseFloat(getComputedStyle(node).fontSize)).filter((n) => Number.isFinite(n));
    const ltr = [...step.querySelectorAll("[dir=ltr]")];
    return {
      id: step.getAttribute("data-step-id"),
      station: step.getAttribute("data-station"),
      direction: getComputedStyle(step).direction,
      sourceCount: source.length,
      minFont: fonts.length ? Math.min(...fonts) : 16,
      ltrAllLtr: ltr.every((node) => getComputedStyle(node).direction === "ltr"),
      height: step.getBoundingClientRect().height,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      revealButtons: step.querySelectorAll("[data-instrument] button").length,
    };
  });

const goToStep = async (stepId) => {
  const target = page.locator(`aside [data-step-nav='${stepId}']`).first();
  if (!(await target.isVisible().catch(() => false))) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    await page.waitForTimeout(250);
    await page.locator(`.fixed.inset-0.z-50 [data-step-nav='${stepId}']`).last().click();
  } else {
    await target.scrollIntoViewIfNeeded();
    await target.click();
  }
  await page.waitForSelector(`[data-step-id='${stepId}']`, { timeout: 20000 });
  await page.waitForTimeout(180);
};

// ------------------------------------------------------------ viewports
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
  await page.waitForSelector('[data-lesson="39"] [data-step-id="gate-1"]', { timeout: 30000 });
  await page.waitForTimeout(350);
  const state = await shellState();
  ok(state.locks === 1, `${vp.name}: exactly one visible site-lock button`);
  ok(state.shell === "lesson-1", `${vp.name}: renders inside the shared Lesson 1 shell`);
  ok(state.direction === "rtl", `${vp.name}: shell stays RTL`);
  ok(state.scrollWidth <= state.clientWidth + 1, `${vp.name}: no horizontal overflow (${state.scrollWidth}/${state.clientWidth})`);
  ok(state.hasRail === vp.rail, `${vp.name}: rail visibility matches breakpoint`);
  ok(state.counter.replace(/\s+/g, " ") === `1 / ${STEP_COUNT_39}`, `${vp.name}: counter reads 1 / ${STEP_COUNT_39} (got "${state.counter}")`);
  ok(overlap(state.lock, state.next) === 0, `${vp.name}: lock does not overlap Next`);
  ok(overlap(state.lock, state.prev) === 0, `${vp.name}: lock does not overlap Previous`);
  ok(!!state.next && !!state.prev, `${vp.name}: both navigation buttons are visible`);
  await shot(`${vp.name}-lesson-landing`);
  report.viewports.push({
    name: vp.name,
    overflow: state.scrollWidth - state.clientWidth,
    lockNextOverlap: overlap(state.lock, state.next),
    lockPrevOverlap: overlap(state.lock, state.prev),
    locks: state.locks,
    rail: state.hasRail,
  });

  if (!vp.rail) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    await page.waitForTimeout(250);
    ok((await page.locator(".fixed.inset-0.z-50").count()) > 0, `${vp.name}: mobile drawer opens`);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    await shot(`${vp.name}-lock-and-nav`);
  }
}

// ------------------------------------------------------------ every step
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto("about:blank");
await page.goto(base, { waitUntil: "domcontentloaded" });
await page.waitForSelector('[data-lesson="39"] [data-step-id="gate-1"]', { timeout: 30000 });

const visited = [];
for (let i = 0; i < STEP_COUNT_39; i++) {
  const state = await stepState();
  if (!state) {
    ok(false, `step ${i + 1}: nothing rendered`);
    break;
  }
  visited.push(state.id);
  ok(state.id === SLIDES_39[i].id, `step ${i + 1}: expected ${SLIDES_39[i].id}, rendered ${state.id}`);
  ok(state.sourceCount >= SLIDES_39[i].units.length, `${SLIDES_39[i].id}: renders all its source lines`);
  ok(state.direction === "rtl", `${SLIDES_39[i].id}: step content stays RTL`);
  ok(state.ltrAllLtr, `${SLIDES_39[i].id}: every LTR block computed LTR`);
  ok(state.overflow <= 1, `${SLIDES_39[i].id}: no horizontal overflow (${state.overflow})`);
  ok(state.minFont >= 14.5, `${SLIDES_39[i].id}: source font stays readable (${state.minFont}px)`);
  const shell = await shellState();
  ok(overlap(shell.lock, shell.next) === 0, `${SLIDES_39[i].id}: lock does not cover Next`);
  if (i % 6 === 0) await checkContrast(`step ${SLIDES_39[i].id}`);
  if (i === STEP_COUNT_39 - 1) break;
  await page.locator("[data-step-nav='next']").click();
  await page.waitForTimeout(120);
}
ok(visited.length === STEP_COUNT_39, `all ${STEP_COUNT_39} steps reachable with Next (${visited.length})`);
ok(new Set(visited).size === visited.length, "no step repeats while paging forward");

// ------------------------------------------------------------ interactions
await goToStep("s02-1");
const beforeTimeline = await page.locator("[data-instrument='timeline'] .obs-readout").innerText();
await page.locator("[data-instrument='timeline'] .obs-node").nth(4).click();
const afterTimeline = await page.locator("[data-instrument='timeline'] .obs-readout").innerText();
ok(beforeTimeline !== afterTimeline, "interactive timeline switches the readout when a node is clicked");

await goToStep("s03-1");
for (const label of ["Subject", "will", "have", "been", "V-ing"])
  await page.locator(`[data-instrument='formula-builder'] .obs-token`, { hasText: new RegExp(`^${label}$`) }).first().click();
ok((await page.locator("[data-instrument='formula-builder']").innerText()).includes("الصيغة مكتملة"), "formula builder accepts the full formula");

await goToStep("s10-3");
const sorterItems = page.locator("[data-instrument='for-since-sorter'] li");
for (let i = 0; i < (await sorterItems.count()); i++) await sorterItems.nth(i).locator("button").first().click();
await page.getByRole("button", { name: "تحقّق من التصنيف", exact: true }).click();
ok((await page.locator("[data-instrument='for-since-sorter']").innerText()).includes("صحيحة"), "for/since sorter grades its cards");

await goToStep("s11-1");
await page.getByRole("button", { name: "قارن مع جملة المصدر", exact: true }).click();
ok((await page.locator("[data-instrument='duration-calc']").innerText()).includes("مطابق لحساب المصدر"), "duration calculator matches the source arithmetic");

await goToStep("s16-1");
await page.locator("[data-instrument='aspect-compare'] .obs-token").first().click();
await page.getByRole("button", { name: "تحقّق", exact: true }).click();
ok((await page.locator("[data-instrument='aspect-compare']").innerText()).match(/اختيار صحيح|أعد النظر/) !== null, "FP vs FPC comparator gives feedback");

await goToStep("s15-1");
await page.locator("[data-instrument='dialogue-deck'] .obs-turn-btn").first().click();
ok((await page.locator("[data-instrument='dialogue-deck'] .obs-turn-form").count()) > 0, "dialogue segments expand with their form analysis");

// practice answers stay closed until an attempt
await goToStep("s29-2");
ok((await page.locator("[data-answer-key-for]").count()) === 0, "practice step hides the source key before an attempt");
const radioNames = await page.evaluate(() =>
  [...new Set([...document.querySelectorAll("[data-instrument] input[type=radio]")].map((el) => el.getAttribute("name")))].filter(Boolean),
);
ok(radioNames.length >= 3, `practice step exposes ${radioNames.length} answerable items`);
for (const name of radioNames) {
  const option = page.locator(`[data-instrument] input[type=radio][name='${name}']`).first();
  ok((await option.count()) === 1, `practice item ${name} stays on screen while answering`);
  await option.dispatchEvent("click");
  await page.waitForTimeout(50);
}
const checkAll = page.getByRole("button", { name: "صحّح الاختيارات", exact: true });
ok((await checkAll.count()) === 1 && (await checkAll.isEnabled()), "practice check button enables after every item is answered");
await checkAll.click();
await page.waitForTimeout(200);
ok((await page.locator("[data-answer-key-for]").count()) === 1, "practice step reveals the source key only after the attempt");

// ------------------------------------------------------------ visual evidence (all viewports)
const setViewport = async (vp) => {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.waitForTimeout(200);
};
for (const vp of VIEWPORTS) {
  await setViewport(vp);
  await goToStep("s02-1");
  await page.locator("[data-instrument='timeline'] .obs-node").nth(4).click();
  await shot(`${vp.name}-interactive-timeline`);
  await goToStep("s16-1");
  await page.locator("[data-instrument='aspect-compare'] .obs-token").first().click();
  await page.getByRole("button", { name: "تحقّق", exact: true }).click();
  await shot(`${vp.name}-comparison-fp-fpc`);
  await goToStep("s15-1");
  await page.locator("[data-instrument='dialogue-deck'] .obs-turn-btn").first().click();
  await shot(`${vp.name}-long-content-slide`);
}
await setViewport(VIEWPORTS[1]);

// ------------------------------------------------------------ test area
await page.goto("about:blank");
await page.goto(base, { waitUntil: "domcontentloaded" });
await page.waitForSelector('[data-lesson="39"] [data-step-id="gate-1"]', { timeout: 30000 });
const preTestRequests = requests.length;
await page.locator("[data-area-tab='test']").first().click();
await page.waitForSelector("[data-test-question='1']", { timeout: 20000 });
const testText = await page.locator('[data-area="lesson39-test"]').last().innerText();
ok(!testText.includes(ANSWER_MARKER), "test area carries no answer text before submit");
ok(!testText.includes(EXPLANATION_MARKER), "test area carries no explanation before submit");
ok((await page.locator("[data-test-question]").count()) === 1, "test shows one question at a time");
ok((await page.locator("[data-test-result]").count()) === 0, "no result panel before submit");
ok((await page.locator("[data-answer-key-for]").count()) === 0, "no answer-key blocks inside the test");
await checkContrast("test area (pre-submit)");
for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.waitForTimeout(200);
  await shot(`${vp.name}-test-before-submit`);
}
await page.setViewportSize({ width: 1280, height: 800 });
await page.waitForTimeout(200);

for (let level = 1; level <= 5; level++) {
  await page.locator(".obs-test-shell .obs-test-tab").nth(level - 1).click();
  for (let q = 0; q < 5; q++) {
    const n = (level - 1) * 5 + q + 1;
    await page.waitForSelector(`[data-test-question='${n}']`, { timeout: 15000 });
    const card = page.locator(`[data-test-question='${n}']`);
    const radios = card.locator("input[type=radio]");
    if (await radios.count()) await radios.first().check();
    else await card.locator("input[type=text], textarea").first().fill(TEST_SOLUTIONS_39[n - 1].answer);
    if (q < 4) await page.getByRole("button", { name: "السؤال التالي", exact: true }).click();
    await page.waitForTimeout(60);
  }
}
ok((await page.locator("[data-test-result]").count()) === 0, "no score appears while answering");
const answeredText = await page.locator(".obs-test-shell").innerText();
ok(answeredText.includes("25/25"), "all 25 answers register before submitting");

const postAnswerRequests = requests.length;
await page.getByRole("button", { name: "تسليم الاختبار", exact: true }).click();
await page.waitForSelector("[data-test-result]", { timeout: 20000 });
const resultText = await page.locator("[data-test-result]").innerText();
ok(/\/\s*25/.test(resultText), "results show a score out of 25 after submit");
ok((await page.getByRole("button", { name: "تسليم الاختبار", exact: true }).count()) === 0, "submit button disappears after submit (no double submit)");
ok((await page.locator(".obs-test-shell input:not([disabled])").count()) === 0, "answers are frozen after submit");
ok((await page.locator(".obs-test-shell").innerText()).includes("مراجعة بشرية"), "review items are explained, not silently graded");
for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.waitForTimeout(200);
  // لقطة النتيجة يجب أن تُظهر لوحة الدرجة نفسها لا أسفل الصفحة.
  await page.evaluate(() => {
    document.querySelector("[data-test-result]")?.scrollIntoView({ block: "start" });
    document.querySelector("#l39-main")?.scrollTo?.({ top: 0 });
  });
  await page.waitForTimeout(250);
  await shot(`${vp.name}-results-after-submit`);
}
await page.setViewportSize({ width: 1280, height: 800 });

const preSubmit = requests.slice(preTestRequests, postAnswerRequests);
ok(!preSubmit.some((url) => /testKey39|solutionsData39|TeacherGuide39/.test(url)), "no answer chunk is fetched before submission");
report.network.preSubmitRequests = preSubmit.length;
report.network.answerChunks = requests.filter((url) => /testKey39|solutionsData39/.test(url)).map((url) => url.split("/").pop());

// ------------------------------------------------------------ solutions + teacher
await page.locator("[data-area-tab='solutions']").first().click();
await page.waitForSelector("[data-solution-count='25']", { timeout: 20000 });
const solutionsText = await page.locator(".obs-solutions-shell").innerText();
ok(solutionsText.includes("25 سؤالًا"), "solutions area opens after submission with 25 keys");
ok((await page.locator("[data-solution]").count()) === 5, "each solutions level holds five keys");
await checkContrast("solutions area (after submit)");

await page.goto("about:blank");
await page.goto(base, { waitUntil: "domcontentloaded" });
await page.waitForSelector('[data-lesson="39"] [data-step-id="gate-1"]', { timeout: 30000 });
ok(
  (await page.locator("[data-area-tab='solutions']").first().getAttribute("aria-disabled")) === "true",
  "solutions tab is marked locked before submission",
);
await page.locator("[data-area-tab='solutions']").first().click({ force: true });
await page.waitForTimeout(300);
ok((await page.locator("[data-solutions-locked]").count()) > 0, "solutions stay locked before submission");
ok((await page.locator("[data-solution]").count()) === 0, "no key is rendered in the locked state");
for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.waitForTimeout(200);
  await shot(`${vp.name}-solutions-locked`);
}
await page.setViewportSize({ width: 1280, height: 800 });

await page.locator("[data-area-tab='teacher']").first().click();
await page.locator("#l39-teacher-password").fill("wrong-password");
await page.getByRole("button", { name: "دخول المعلم", exact: true }).click();
ok((await page.getByRole("alert").count()) === 1, "teacher gate rejects a wrong password");
await page.locator("#l39-teacher-password").fill("somer173");
await page.getByRole("button", { name: "دخول المعلم", exact: true }).click();
await page.waitForTimeout(600);
ok(requests.some((url) => /TeacherGuide39/.test(url)), "teacher guide chunk loads only after unlock");
await page.getByRole("button", { name: "حلول الاختبار Q1–Q25", exact: true }).click();
await page.waitForTimeout(300);
ok((await page.locator("[data-teacher-solution]").count()) === 25, "teacher console exposes all 25 detailed solutions");
await checkContrast("teacher console");

const pageErrors = report.consoleErrors.filter((line) => !/fonts|ERR_FAILED|attachEvent|ResizeObserver/.test(line));
ok(pageErrors.length === 0, `no page errors (${pageErrors.join(" | ") || "none"})`);

await browser.close();
writeFileSync(
  `${OUT}/verification.json`,
  JSON.stringify(
    {
      ...report,
      checks,
      failures,
      passed: failures.length === 0,
      notes:
        "Screenshots pre-submit never contain committed answers; post-submit captures are taken only after the learner's own submission.",
    },
    null,
    2,
  ),
);
if (failures.length) {
  console.error(`✕ Lesson 39 browser audit failed: ${failures.length} of ${checks}`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`✓ Lesson 39 browser audit passed: ${checks} checks · ${VIEWPORTS.length} viewports · ${visited.length} steps crawled · screenshots in ${OUT}`);
