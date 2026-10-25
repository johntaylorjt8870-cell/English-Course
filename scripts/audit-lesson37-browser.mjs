// ============================================================
// Real-Chromium audit for Lesson 37 — Future Horizon Observatory.
//
// Run `npm run build && npm run preview -- --host 0.0.0.0 --port 4173`, then
//   node scripts/audit-lesson37-browser.mjs      (or set LESSON37_URL)
//
// What it verifies at 1920×1080, 1280×800, 768×900 and 375×812:
//   • the lesson renders through the real shared Lesson 1 shell: one in-flow
//     site-lock button inside the shared step bar, no bespoke rail, RTL root;
//   • lock / Previous / Next never overlap and nothing overflows horizontally;
//   • all 58 steps are reachable, short enough and free of source bookkeeping;
//   • keyboard navigation, the shared mobile drawer and visible focus;
//   • the 25-question test is neutral before submit, refuses an incomplete
//     paper in Arabic, grades after submit and resets fully on retry;
//   • the answer key is loaded only through a deferred chunk after submission;
//   • solutions stay gated, then expose 25 detailed answers;
//   • the teacher area is password-gated and renders its 25 keys;
//   • no console or page errors.
//
// Writes docs/lesson37-visual/verification.json (booleans + non-answer metadata
// only) plus screenshots.
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

const work = "node_modules/.lesson37-browser";
mkdirSync(work, { recursive: true });
await esbuild.build({
  absWorkingDir: process.cwd(),
  stdin: {
    contents: `export { TEST_37, TEST_COUNT_37 } from "./src/lessons/lesson37/testData37.ts";
export { TEST_SOLUTIONS_37 } from "./src/lessons/lesson37/solutionsData37.ts";
export { STEP_COUNT_37 } from "./src/lessons/lesson37/data.ts";`,
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
const { TEST_37, TEST_COUNT_37, TEST_SOLUTIONS_37, STEP_COUNT_37 } = await import(
  pathToFileURL(`${process.cwd()}/${work}/test-data.mjs`).href
);

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

const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
await ctx.addInitScript(() => {
  try {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  } catch {
    /* about:blank has no storage */
  }
});
const page = await ctx.newPage();
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
const jsResponses = [];
page.on("pageerror", (error) => report.consoleErrors.push(String(error)));
page.on("console", (message) => {
  if (message.type() === "error" && !message.text().includes("ERR_FAILED")) report.consoleErrors.push(message.text());
});
page.on("response", async (response) => {
  if (/\.js(?:\?|$)/.test(response.url())) {
    try {
      jsResponses.push({ url: response.url(), body: await response.text() });
    } catch {
      /* response body unavailable (aborted/streamed) */
    }
  }
});

const shot = (name, fullPage = false) => page.screenshot({ path: `${OUT}/${name}.png`, fullPage, animations: "disabled", timeout: 60000 });
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
      nav: rect(nav),
      navFixed: !!nav && getComputedStyle(nav).position === "fixed",
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      direction: getComputedStyle(document.querySelector('[data-lesson="37"]')).direction,
      step: document.querySelector("[data-step-id]")?.getAttribute("data-step-id"),
      stepHeight: Math.round(document.querySelector("[data-step-id]")?.getBoundingClientRect().height ?? 0),
      hasRail: !!document.querySelector("aside nav[aria-label='فهرس خطوات الدرس 37']")?.offsetParent,
      counter: document.querySelector('[data-lesson="37"] header > span[dir="ltr"]')?.textContent?.trim() ?? "",
      ledgerLabels: [...document.querySelectorAll('[data-lesson="37"] *')].some((node) =>
        /§\s*\d|أقسام المصدر|خطوات الطالب/.test(node.childElementCount === 0 ? node.textContent || "" : ""),
      ),
    };
  });

async function contrastReport() {
  return page.evaluate(() => {
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
    const samples = [
      ...document.querySelectorAll(
        '[data-lesson="37"] p, [data-lesson="37"] li, [data-lesson="37"] span, [data-lesson="37"] h1, [data-lesson="37"] h2, [data-lesson="37"] h3, [data-lesson="37"] h4, [data-lesson="37"] td, [data-lesson="37"] th',
      ),
    ]
      .filter((element) => (element.textContent || "").trim().length > 12 && element.offsetParent !== null)
      .slice(0, 700);
    let worst = { ratio: 99, text: "" };
    let below = 0;
    const offenders = [];
    for (const element of samples) {
      const style = getComputedStyle(element);
      const size = parseFloat(style.fontSize);
      const weight = parseInt(style.fontWeight, 10) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const fg = parse(style.color);
      if (!fg) continue;
      const value = ratio(fg, bgOf(element));
      if (value < (large ? 3 : 4.5)) {
        below++;
        offenders.push({ ratio: value, text: (element.textContent || "").trim().slice(0, 40), color: style.color });
      }
      if (value < worst.ratio) worst = { ratio: value, text: (element.textContent || "").trim().slice(0, 60) };
    }
    return { samples: samples.length, below, worst, offenders: offenders.slice(0, 6) };
  });
}

/** يفتح منطقة (طالب/اختبار/حلول/معلم) من الشريط الجانبي أو من درج الهاتف. */
const openArea = async (tab) => {
  const visibleTab = page.locator(`[data-area-tab='${tab}']:visible`).first();
  if ((await visibleTab.count()) > 0) {
    await visibleTab.click();
    return;
  }
  await page.getByRole("button", { name: "فهرس الدرس" }).click();
  await page.waitForTimeout(250);
  await page.locator(`.fixed.inset-0.z-50 [data-area-tab='${tab}']`).first().click();
};

const answerFor = (question) => {
  const solution = TEST_SOLUTIONS_37.find((entry) => entry.n === question.n);
  if (question.options) return solution.answer.slice(0, 1);
  return solution.answer;
};

const VIEWPORTS = [
  { name: "1920x1080", width: 1920, height: 1080, rail: true },
  { name: "1280x800", width: 1280, height: 800, rail: true },
  { name: "768x900", width: 768, height: 900, rail: false },
  { name: "375x812", width: 375, height: 812, rail: false },
];

/* ---------------------------------------------- 1) الهيكل المشترك والتجاوب */
for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-lesson="37"] [data-step-id="cover"]', { timeout: 30000 });
  await page.waitForTimeout(450);

  const top = await boxes();
  ok(top.totalLocks === 1 && top.locks === 1, `${vp.name}: exactly one visible site-lock button (total ${top.totalLocks}, visible ${top.locks})`);
  ok(top.lockInsideNav, `${vp.name}: the site lock lives inside the shared step navigation, not a floating pill`);
  ok(!top.navFixed, `${vp.name}: the step navigation is in normal flow (no fixed overlay) and does not sit between lesson and test content`);
  ok(top.scrollWidth <= top.clientWidth, `${vp.name}: no horizontal overflow (${top.scrollWidth} > ${top.clientWidth})`);
  ok(top.direction === "rtl", `${vp.name}: the lesson shell stays RTL`);
  ok(top.counter.replace(/\s+/g, " ") === "1 / 58", `${vp.name}: the shared shell counter reads 1 / 58 (got "${top.counter}")`);
  ok(top.hasRail === vp.rail, `${vp.name}: the shared rail is ${vp.rail ? "visible" : "collapsed into the mobile drawer"}`);
  ok(top.ledgerLabels === false, `${vp.name}: no source numbering or bookkeeping text is visible in the lesson`);
  ok(overlap(top.lock, top.next) === 0, `${vp.name}: lock and Next do not overlap`);
  ok(overlap(top.lock, top.prev) === 0, `${vp.name}: lock and Previous do not overlap`);
  await shot(`${vp.name}-cover`);

  // لقطات لخطوات تمثيلية: الغلاف + مختبر الصيغة + مختبر الغموض النحوي + القراءة
  const gallery = vp.width >= 1280 ? ["s03b", "s30", "s32"] : ["s03b"];
  for (const stepId of gallery) {
    // نستخدم الدرج دائمًا: قائمة الشريط الجانبي تُمرَّر رأسيًا وقد تكون الخطوة خارج العرض.
    const drawerButton = page.getByRole("button", { name: "فهرس الدرس" });
    if (await drawerButton.isVisible()) {
      await drawerButton.click();
      await page.waitForTimeout(300);
    }
    const drawerStep = page.locator(`.fixed.inset-0.z-50 [data-step-nav='${stepId}']`).last();
    if ((await drawerStep.count()) === 0) {
      // على الشاشات الكبيرة يكون الشريط ظاهرًا بلا درج: نمرّر إليه ثم نضغطه.
      await page.locator(`aside [data-step-nav='${stepId}']`).first().scrollIntoViewIfNeeded();
      await page.locator(`aside [data-step-nav='${stepId}']`).first().click();
    } else {
      await drawerStep.scrollIntoViewIfNeeded();
      await drawerStep.click();
    }
    await page.waitForSelector(`[data-step-id='${stepId}']`, { timeout: 15000 });
    await page.waitForTimeout(250);
    await shot(`${vp.name}-step-${stepId}`);
    if (vp.width === 1280) {
      // لقطة أسفل الخطوة: نمرّر الحاوية الداخلية إلى نهايتها لتصوير المختبر كاملًا.
      await page.evaluate(() => {
        const scrollers = [...document.querySelectorAll("main, section, div")]
          .filter((element) => element.scrollHeight > element.clientHeight + 40)
          .sort((a, b) => b.scrollHeight - a.scrollHeight);
        if (scrollers[0]) scrollers[0].scrollTop = scrollers[0].scrollHeight;
      });
      await page.waitForTimeout(250);
      await shot(`${vp.name}-step-${stepId}-bottom`);
      await page.evaluate(() => {
        const scrollers = [...document.querySelectorAll("main, section, div")]
          .filter((element) => element.scrollHeight > element.clientHeight + 40)
          .sort((a, b) => b.scrollHeight - a.scrollHeight);
        if (scrollers[0]) scrollers[0].scrollTop = 0;
      });
    }
  }

  const contrast = await contrastReport();
  ok(contrast.below === 0, `${vp.name}: computed WCAG AA contrast on the cover (${contrast.below} below of ${contrast.samples}; worst ${contrast.worst.ratio})`);

  // الفهرس المتنقل على الشاشات الصغيرة
  if (!vp.rail) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    await page.waitForTimeout(250);
    const drawer = await page.evaluate(() => {
      const panel = document.querySelector(".fixed.inset-0.z-50");
      return {
        open: !!panel,
        chapters: panel?.querySelectorAll("nav[aria-label='فهرس خطوات الدرس 37'] > div").length ?? 0,
        items: panel?.querySelectorAll("[data-step-nav]").length ?? 0,
      };
    });
    ok(drawer.open, `${vp.name}: the shared mobile drawer opens`);
    ok(drawer.chapters === 11, `${vp.name}: the drawer lists all 11 chapters (got ${drawer.chapters})`);
    ok(drawer.items === STEP_COUNT_37, `${vp.name}: the drawer lists all ${STEP_COUNT_37} steps (got ${drawer.items})`);
    await shot(`${vp.name}-drawer-open`);
    await page.locator(".fixed.inset-0.z-50 [data-step-nav='s14']").last().click();
    await page.waitForTimeout(300);
    const afterChoice = await boxes();
    ok(afterChoice.step === "s14", `${vp.name}: choosing a drawer step navigates to it`);
    ok((await page.locator(".fixed.inset-0.z-50").count()) === 0, `${vp.name}: choosing a step closes the drawer`);
  }

  // مراجعة كل الخطوات: لا فائض أفقي ولا خطوة أطول من شاشتين ونصف
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-step-id="cover"]', { timeout: 30000 });
  await page.waitForTimeout(300);
  const heights = [];
  for (let i = 0; i < STEP_COUNT_37; i += 1) {
    const state = await page.evaluate(() => {
      const step = document.querySelector("[data-step-id]");
      return {
        id: step?.getAttribute("data-step-id"),
        height: Math.round(step?.getBoundingClientRect().height ?? 0),
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        ledger: /§\s*\d/.test(document.querySelector('[data-area="lesson37-student"]')?.textContent ?? ""),
      };
    });
    heights.push(state);
    ok(state.scrollWidth <= state.clientWidth, `${vp.name} ${state.id}: no horizontal overflow`);
    ok(state.ledger === false, `${vp.name} ${state.id}: no source numbering in the student step`);
    if (i < STEP_COUNT_37 - 1) {
      await page.click("[data-step-nav='next']");
      await page.waitForTimeout(110);
    }
  }
  ok(heights.length === STEP_COUNT_37 && heights.every((entry) => entry.id), `${vp.name}: all ${STEP_COUNT_37} steps are reachable with Next`);
  ok(new Set(heights.map((entry) => entry.id)).size === STEP_COUNT_37, `${vp.name}: every step is shown exactly once while paging`);
  const tallest = [...heights].sort((a, b) => b.height - a.height).slice(0, 5);
  report.steps.push({ viewport: vp.name, tallest });
  // على الهاتف تُسمح خطوات المحتوى الكثيف بأربع شاشات (تمرين/قراءة كاملة)؛
  // وعلى الشاشات الكبيرة يبقى السقف شاشتين ونصف.
  const budget = vp.width < 768 ? Math.max(Math.round(vp.height * 4), 2400) : Math.max(Math.round(vp.height * 2.5), 2400);
  ok(tallest[0].height <= budget, `${vp.name}: the tallest step stays within the height budget (${tallest[0].id}: ${tallest[0].height}px vs ${budget}px)`);
  report.viewports.push({ viewport: vp.name, top, contrast, tallest });
}

/* ---------------------------------------------- 2) لوحة المفاتيح والتركيز */
{
  await page.setViewportSize({ width: 1920, height: 1080 });
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
  await page.keyboard.press("Home");
  await page.keyboard.press("Space");
  await page.waitForTimeout(200);
  ok((await boxes()).step === "s01", "keyboard: Space advances one step when no control is focused");
  const focus = await page.evaluate(() => {
    const node = [...document.querySelectorAll("[data-area='lesson37-student'] button, [data-area='lesson37-student'] input")].find((candidate) => candidate.getClientRects().length);
    if (!node) return { found: false };
    node.focus();
    const style = getComputedStyle(node);
    return {
      found: true,
      focusVisible: node.matches(":focus-visible"),
      outline: style.outlineStyle,
      shadow: style.boxShadow,
      tag: node.tagName,
      name: node.getAttribute("aria-label") || node.textContent?.trim().slice(0, 40) || "",
    };
  });
  ok(focus.found && focus.focusVisible && (focus.outline !== "none" || focus.shadow !== "none"), `keyboard: in-lesson controls show a visible focus ring (${JSON.stringify(focus)})`);
}

/* ---------------------------------------------- 3) عزل مفتاح الإجابة */
// القيمة الحقيقية للـ sentinel لا تُكتب في أي ملف ناتج: نستخدمها في الذاكرة فقط.
const SENTINEL = TEST_SOLUTIONS_37.find((solution) => solution.n === 22);
// إجابة Q22 نفسها وردت في أمثلة الدرس، فالمؤشر الموثوق هو شرحها الكامل (نص طويل فريد).
const ANSWER_MARKER = SENTINEL?.explanation ?? "";
const EXPLANATION_MARKER = SENTINEL?.explanation ?? "";
const KEY_MODULE_MARKER = "ANSWER_SPECS_37";
const TEACHER_PASSWORD = "somer173";
if (!ANSWER_MARKER || !EXPLANATION_MARKER) throw new Error("Lesson 37 browser audit could not resolve its Q22 answer sentinel.");

const loadedJs = () => jsResponses.map((response) => response.body).join("\n");
const keyChunkLoaded = () => jsResponses.some((response) => /solutionsData37-[^/]*\.js/.test(response.url));
const snapshot = (stage) => ({
  stage,
  answerMarkerInLoadedJs: loadedJs().includes(ANSWER_MARKER),
  explanationMarkerInLoadedJs: loadedJs().includes(EXPLANATION_MARKER),
  keyModuleMarkerInLoadedJs: loadedJs().includes(KEY_MODULE_MARKER),
  keyChunkRequested: keyChunkLoaded(),
});
const isolationStages = [];

{
  jsResponses.length = 0;
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-lesson="37"]');
  await page.waitForTimeout(600);
  const initial = snapshot("initial-lesson-load");
  isolationStages.push(initial);
  ok(!initial.answerMarkerInLoadedJs && !initial.explanationMarkerInLoadedJs, "the real model answer and its explanation are absent from every JavaScript response loaded so far");
  ok(!initial.keyModuleMarkerInLoadedJs && !initial.keyChunkRequested, "the initial student payload excludes the deferred answer-key chunk");

  const lockedTab = await page.locator("[data-area-tab='solutions']").first().textContent();
  const lockedTabState = await page.locator("[data-area-tab='solutions']").first().getAttribute("aria-disabled");
  ok((lockedTab || "").includes("🔒") && lockedTabState === "true", "a fresh session marks the solutions area as locked and aria-disabled");
  // زرّ مقفل: نرسل الحدث مباشرة للتأكد من أنه لا يفتح أي إجابة حتى لو تجاوز المستخدم aria-disabled.
  await page.locator("[data-area-tab='solutions']:visible").first().dispatchEvent("click");
  await page.waitForTimeout(500);
  ok((await page.locator("[data-area='lesson37-solutions'] [data-solution]").count()) === 0, "the locked solutions entry never renders an answer card");
  const locked = snapshot("locked-solutions");
  isolationStages.push(locked);
  ok(!locked.answerMarkerInLoadedJs && !locked.keyChunkRequested, "the locked entry loads no answer data and no key chunk");

  await openArea("lesson");
  await page.waitForTimeout(200);
  const solutionsState = await page.evaluate(() => ({
    dom: document.querySelector('[data-area="lesson37-solutions"]')?.innerHTML ?? "",
    text: document.body.textContent ?? "",
  }));
  ok(!solutionsState.text.includes("الإجابة النموذجية"), "no model-answer heading exists anywhere on the page before submission");

  /* ---- الاختبار: محايد ثم مصحّح ---- */
  await openArea("test");
  await page.waitForSelector("[data-test-question]", { timeout: 30000 });
  await page.waitForTimeout(300);
  const neutral = await page.evaluate(() => ({
    questions: document.querySelectorAll("[data-test-question]").length,
    feedback: document.querySelectorAll("[data-test-feedback]").length,
    score: document.querySelectorAll("[data-test-score]").length,
    submitDisabled: document.querySelector("[data-test-submit='true']")?.disabled ?? null,
    text: document.body.textContent ?? "",
  }));
  ok(neutral.questions === TEST_COUNT_37, `the test shows ${TEST_COUNT_37} question panels (got ${neutral.questions})`);
  ok(neutral.feedback === 0 && neutral.score === 0, "before submit there is no ✓/✕ feedback and no score");
  ok(!neutral.text.includes("الإجابة النموذجية") && !neutral.text.includes("السبب:"), "before submit no model answer or reason is exposed");
  ok(neutral.submitDisabled === true, "submit is disabled on an empty paper");
  ok(neutral.text.includes("لا يمكن الإرسال الآن"), "the incomplete-paper message is shown in Arabic");
  await shot("1440x900-test-neutral");

  for (const question of TEST_37) {
    const card = page.locator(`[data-test-question="${question.n}"]`);
    if (question.options) await card.locator(`input[value="${answerFor(question)}"]`).check();
    else await card.locator("input[type=text], textarea").fill(answerFor(question));
  }
  await page.waitForTimeout(200);
  const typed = snapshot("answered-not-submitted");
  isolationStages.push(typed);
  ok(!typed.answerMarkerInLoadedJs && !typed.keyChunkRequested, "answers typed but unsubmitted still load no key chunk");
  ok((await page.locator("[data-test-feedback]").count()) === 0, "a fully answered but unsubmitted paper still hides all corrections");
  ok((await page.locator("[data-test-submit='true']").isDisabled()) === false, "answering all 25 enables submission");

  await page.locator("[data-test-submit='true']").click();
  await page.waitForSelector("[data-test-feedback]", { timeout: 30000 });
  await page.waitForTimeout(500);
  const graded = await page.evaluate(() => ({
    score: document.querySelector("[data-test-score]")?.textContent ?? "",
    feedback: document.querySelectorAll("[data-test-feedback]").length,
    hasReason: (document.querySelector("[data-test-feedback]")?.textContent ?? "").includes("السبب:"),
    hasModel: (document.querySelector("[data-test-feedback]")?.textContent ?? "").includes("الإجابة النموذجية"),
  }));
  ok(/25\s*\/\s*25/.test(graded.score), `the completed test scores 25/25 (got "${graded.score.replace(/\s+/g, " ").slice(0, 40)}")`);
  ok(graded.feedback === TEST_COUNT_37, `all ${TEST_COUNT_37} questions receive feedback (got ${graded.feedback})`);
  ok(graded.hasReason && graded.hasModel, "each graded answer shows the model answer and its reason");
  const submitted = snapshot("after-submission");
  isolationStages.push(submitted);
  ok(submitted.keyChunkRequested, "the deferred answer-key chunk is requested only after submission");
  ok(submitted.answerMarkerInLoadedJs && submitted.keyModuleMarkerInLoadedJs, "the submitted page actually fetched the real model answer, so the sentinel proves the chunk is the key");
  await shot("1440x900-test-graded");

  /* ---- إعادة الاختبار ---- */
  await page.getByRole("button", { name: "إعادة الاختبار" }).click();
  await page.waitForTimeout(400);
  const retried = await page.evaluate(() => ({
    feedback: document.querySelectorAll("[data-test-feedback]").length,
    score: document.querySelectorAll("[data-test-score]").length,
    empty: [...document.querySelectorAll("[data-test-question] input")].every((input) => (input.type === "radio" ? !input.checked : input.value === "")),
    submitDisabled: document.querySelector("[data-test-submit='true']")?.disabled ?? null,
    text: document.body.textContent ?? "",
  }));
  ok(retried.feedback === 0 && retried.score === 0, "retry clears every feedback block and the score");
  ok(retried.empty, "retry empties all 25 answers");
  ok(retried.submitDisabled === true && retried.text.includes("لا يمكن الإرسال الآن"), "retry returns the test to its neutral, un-submittable state");

  /* ---- الاختبار بعد الإعادة: يمكن التسليم مرة أخرى، ثم تُفتح الحلول ---- */
  for (const question of TEST_37) {
    const card = page.locator(`[data-test-question="${question.n}"]`);
    if (question.options) await card.locator(`input[value="${answerFor(question)}"]`).check();
    else await card.locator("input[type=text], textarea").fill(answerFor(question));
  }
  await page.waitForTimeout(200);
  ok((await page.locator("[data-test-submit='true']").isDisabled()) === false, "after retry the paper can be filled and submitted again");
  await page.locator("[data-test-submit='true']").click();
  await page.waitForSelector("[data-test-feedback]", { timeout: 30000 });
  await page.waitForTimeout(300);
  await openArea("solutions");
  await page.waitForSelector("[data-area='lesson37-solutions'] [data-solution]", { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(500);
  const seen = new Set();
  for (let level = 0; level < 5; level += 1) {
    const tabs = page.locator("nav[aria-label='مستويات حلول اختبار الدرس 37'] button");
    await tabs.nth(level).click();
    await page.waitForTimeout(220);
    const numbers = await page.evaluate(() => [...document.querySelectorAll("[data-solution]")].map((node) => Number(node.getAttribute("data-solution"))));
    numbers.forEach((n) => seen.add(n));
    ok(numbers.length === 5, `solutions level ${level + 1} shows its five answers (got ${numbers.length})`);
  }
  ok(seen.size === 25, `all 25 detailed answers are reachable through the five level tabs (got ${seen.size})`);
  await shot("1440x900-solutions");

  /* ---- منطقة المعلم ---- */
  await openArea("teacher");
  await page.waitForSelector("#l37-teacher-password", { timeout: 30000 });
  ok((await page.locator("[data-teacher-solution]").count()) === 0, "the teacher key stays hidden behind the password gate");
  await shot("1440x900-teacher-locked");
  await page.locator("#l37-teacher-password").fill("wrong-password");
  await page.getByRole("button", { name: /دخول المعلم/ }).click();
  await page.waitForTimeout(250);
  ok((await page.locator("[data-teacher-solution]").count()) === 0 && (await page.locator("[role='alert']").count()) >= 1, "a wrong teacher password keeps the key hidden and shows an alert");
  await page.locator("#l37-teacher-password").fill(TEACHER_PASSWORD);
  await page.getByRole("button", { name: /دخول المعلم/ }).click();
  await page.waitForTimeout(700);
  if ((await page.locator("[data-teacher-solution]").count()) === 0) {
    await page.getByRole("button", { name: /حلول الاختبار/ }).click();
    await page.waitForTimeout(300);
  }
  ok((await page.locator("[data-teacher-solution]").count()) === 25, "the teacher password reveals all 25 keys");
  await page.getByRole("button", { name: "خريطة التغطية" }).click();
  await page.waitForTimeout(200);
  ok((await page.locator("[data-coverage-section]").count()) === 39, "the teacher coverage map lists the opening plus the 38 numbered sections");
  await shot("1440x900-teacher-open");
}

/* ---------------------------------------------- 4) الاختبار والمعلم على 375 */
{
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("about:blank");
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-lesson="37"]');
  for (const tab of ["test", "teacher"]) {
    await openArea(tab);
    await page.waitForTimeout(600);
    const state = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      locks: [...document.querySelectorAll("[data-site-lock-button='true']")].filter((el) => el.offsetParent !== null).length,
      overflow: [...document.querySelectorAll('[data-lesson="37"] *')]
        .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 2)
        .filter((el) => !el.closest(".overflow-x-auto, .overflow-x-scroll"))
        // العلامة المائية المشتركة زخرفية (aria-hidden + pointer-events-none) وتُقصّ بحاوية overflow-hidden.
        .filter((el) => el.getAttribute("aria-hidden") !== "true" && !el.closest("[aria-hidden='true'], .pointer-events-none"))
        .slice(0, 4)
        .map((el) => el.tagName + "." + String(el.className).slice(0, 70)),
    }));
    ok(state.scrollWidth <= state.clientWidth, `375x812 ${tab}: no horizontal overflow`);
    ok(state.overflow.length === 0, `375x812 ${tab}: no element spills past the viewport (${state.overflow.join(" | ") || "clean"})`);
    ok(state.locks === 1, `375x812 ${tab}: exactly one visible site-lock button`);
    await shot(`375x812-${tab}`);
  }
}

await browser.close();

/* ---------------------------------------------- 5) الناتج: قيم منطقية فقط */
ok(report.consoleErrors.length === 0, `no console or page errors (${report.consoleErrors.slice(0, 3).join(" | ")})`);
report.answerKeyIsolation = {
  markerSource: "solutionsData37.ts · Q22 model answer (value deliberately not stored here)",
  keyChunkPrefix: "solutionsData37-",
  stages: isolationStages,
};
report.stepCount = STEP_COUNT_37;
report.testCount = TEST_COUNT_37;
// نفحص الحمولة النهائية (بأعدادها الحقيقية) لضمان خلوّها من أي إجابة أو كلمة مرور.
report.checks = checks + 4;
report.failures = failures;
const artifact = JSON.stringify(report, null, 2);

ok(!artifact.includes(ANSWER_MARKER), "the generated verification.json contains no raw model-answer text");
ok(!artifact.includes(EXPLANATION_MARKER), "the generated verification.json contains no answer-explanation text");
ok(!artifact.includes(TEACHER_PASSWORD), "the generated verification.json contains no teacher password");
ok(!/"answer"\s*:/.test(artifact), "the generated verification.json stores booleans only — no answer field");

report.checks = checks;
report.failures = failures;
writeFileSync(`${OUT}/verification.json`, JSON.stringify(report, null, 2));

if (failures.length) {
  console.error(`Lesson 37 browser audit: ${checks - failures.length}/${checks} checks passed.`);
  for (const failure of failures) console.error(`  ✕ ${failure}`);
  process.exit(1);
}
console.log(
  `Lesson 37 browser audit: ${checks}/${checks} checks passed across ${report.viewports.map((entry) => entry.viewport).join(", ")}, shared-shell navigation, gated assessment, deferred key and teacher flow.`,
);
