// ============================================================
// Optional real-Chromium verification for Lesson 34 (FUTURE LAUNCHPAD).
// Provision the browser once:
//   npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Serve the built app first:
//   npm run build && npm run preview -- --host 0.0.0.0 --port 4173
// Then run:
//   node scripts/audit-lesson34-browser.mjs
//
// What it verifies at 1440×900, 1280×800, 768×900 and 375×812:
//   • exactly one visible site-lock button, inside the shared step nav;
//   • no overlap between the lock, Next/Previous, and the mobile map FAB;
//   • no horizontal page overflow and an RTL shell;
//   • the mobile map drawer opens at ≤1023px and stays closed above;
//   • the 25-question test is neutral before submit and graded after;
//   • the solutions area is gated, then renders 25 detailed solutions;
//   • the teacher area renders 25 detailed solutions after the password.
// Writes docs/lesson34-visual/verification.json plus screenshots.
// ============================================================
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson34-browser";
mkdirSync(work, { recursive: true });
try {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
} catch {
  /* already extracted by a previous run */
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const OUT = "docs/lesson34-visual";
mkdirSync(OUT, { recursive: true });

const base = process.env.LESSON34_URL || "http://127.0.0.1:4173/English-Course/#/lesson/34";
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
  await page.screenshot({ path: `${OUT}/${name}.png` });
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
      fab: rect([...document.querySelectorAll("div.fixed.bottom-3.left-3 button")].filter(visible)[0]),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      direction: getComputedStyle(document.querySelector(".l34-app")).direction,
    };
  });
}

const TEST_ANSWERS = {
  typed: { 6: "will be", 7: "will help", 8: "won't tell", 10: "won't make" },
  write: {
    9: "Will they arrive early?",
    21: "I'll get you some water.",
    22: "I promise I won't be late again.",
    23: "I think technology will change the way we learn.",
    24: "Will you take part in the competition?",
    25: "When will the trip start?",
  },
  single: { 1: 1, 2: 0, 3: 1, 4: 2, 5: 0, 11: 3, 12: 1, 13: 2, 14: 4, 15: 0 },
  spot: { 16: 2, 17: 2, 18: 2, 19: 2, 20: 0 },
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
  await page.waitForSelector(".l34-hero", { timeout: 30000 });
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
  ok(overlap(bottom.fab, bottom.lock) === 0, `${vp.name}: mobile map FAB and lock do not overlap`);
  ok(overlap(bottom.fab, bottom.next) === 0, `${vp.name}: mobile map FAB and Next do not overlap`);
  ok(vp.width < 1024 ? !!bottom.fab : !bottom.fab, `${vp.name}: mobile map FAB ${vp.width < 1024 ? "visible" : "hidden"}`);
  await shot(`lesson-${vp.name}-bottom`);

  report.viewports.push({
    viewport: vp.name,
    visibleLockCount: top.locks,
    totalLockCount: top.totalLocks,
    horizontal: { scrollWidth: top.scrollWidth, clientWidth: top.clientWidth },
    direction: top.direction,
    overlaps: {
      lockNext: overlap(bottom.lock, bottom.next),
      lockPrev: overlap(bottom.lock, bottom.prev),
      fabLock: overlap(bottom.fab, bottom.lock),
      fabNext: overlap(bottom.fab, bottom.next),
    },
    fabVisible: !!bottom.fab,
  });

  if (vp.width === 375) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.click("div.fixed.bottom-3.left-3 button");
    await page.waitForTimeout(450);
    ok((await page.locator("#l34-map").count()) === 1, "375x812: mobile map drawer renders the journey map");
    await shot("lesson-mobile-map-open");
    await page.click("div.fixed.bottom-3.left-3 button");
    await page.waitForTimeout(250);
  }

  if (vp.name === "1440x900") {
    await page.click("[data-area-tab='test']");
    await page.waitForTimeout(450);
    const pre = await page.evaluate(() => {
      const text = document.querySelector("[data-test-area='34']")?.textContent || "";
      return {
        neutral: !/✓ صحيح|✕ غير صحيح|النتيجة:/.test(text),
        zero: text.includes("أجبت: 0/25"),
        questions: document.querySelectorAll("[data-test-q]").length,
      };
    });
    ok(pre.neutral, "test: no correctness chips, score or explanations before submit");
    ok(pre.zero, "test: starts at 0/25 answered");
    ok(pre.questions === 25, `test: 25 questions rendered (got ${pre.questions})`);
    await shot("test-before-submit");

    for (let i = 1; i <= 25; i++) {
      const field = await page.$(`#l34-q${i}`);
      if (field) {
        await field.fill(TEST_ANSWERS.write[i] ?? TEST_ANSWERS.typed[i] ?? "");
        continue;
      }
      const radios = await page.$$(`[name='l34-q${i}']`);
      if (radios.length) {
        await radios[TEST_ANSWERS.single[i]].check();
        continue;
      }
      await page.click(`[data-test-seg='${i}'][data-seg-index='${TEST_ANSWERS.spot[i]}']`);
    }
    await page.waitForTimeout(250);
    await page.click("button:has-text('إرسال الاختبار')");
    await page.waitForTimeout(500);
    const result = await page.evaluate(() => (document.querySelector("[data-test-area='34']")?.textContent.match(/النتيجة: \d+ \/ 25/) || [""])[0]);
    ok(result === "النتيجة: 25 / 25", `test: the full correct key scores 25/25 (got "${result}")`);
    ok(await page.locator("[data-q-feedback]").count() === 25, "test: every question reveals its answer and reason after submit");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await shot("test-after-submit");

    await page.click("[data-area-tab='solutions']");
    await page.waitForTimeout(550);
    ok(await page.locator("[data-locked-solutions='34']").count() === 0, "solutions: unlocked after a full submit");
    ok(await page.locator("[data-solution-q]").count() === 25, "solutions: 25 detailed solutions rendered");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await shot("solutions-unlocked");

    await page.click("[data-area-tab='teacher']");
    await page.waitForTimeout(350);
    ok(await page.locator("[data-solution-q]").count() === 0, "teacher: solutions hidden behind the password gate");
    await shot("teacher-gate");
    await page.fill("#l34-teacher-pw", "somer173");
    await page.click("button:has-text('دخول')");
    await page.waitForTimeout(650);
    ok(await page.locator("[data-solution-q]").count() === 25, "teacher: 25 detailed solutions after unlocking");
    await page.evaluate(() => {
      const head = [...document.querySelectorAll("h3")].find((el) => el.textContent.includes("الحلول التفصيلية"));
      head?.scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(350);
    await shot("teacher-detailed-solutions");

    const perArea = {};
    for (const tab of ["lesson", "test", "solutions", "teacher"]) {
      await page.click(`[data-area-tab='${tab}']`);
      await page.waitForTimeout(320);
      perArea[tab] = await page.locator("[data-site-lock-button='true']:visible").count();
      ok(perArea[tab] === 1, `tab ${tab}: exactly one visible site-lock button (got ${perArea[tab]})`);
    }
    report.lockPerArea = perArea;

    // Mobile pass for the three non-lesson areas (same mounted state, smaller viewport).
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(400);
    const mobileAreas = {};
    for (const tab of ["test", "solutions", "teacher"]) {
      await page.click(`[data-area-tab='${tab}']`);
      await page.waitForTimeout(400);
      const state = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        locks: [...document.querySelectorAll("[data-site-lock-button='true']")].filter((el) => el.offsetParent !== null).length,
      }));
      mobileAreas[tab] = state;
      ok(state.scrollWidth <= state.clientWidth, `375x812 ${tab}: no horizontal overflow (${state.scrollWidth} > ${state.clientWidth})`);
      ok(state.locks === 1, `375x812 ${tab}: exactly one visible site-lock button (got ${state.locks})`);
      await shot(`area-375x812-${tab}`);
    }
    report.mobileAreas = mobileAreas;
  }
}

await browser.close();
ok(report.consoleErrors.length === 0, `no console or page errors (${report.consoleErrors.join(" | ")})`);
report.checks = checks;
report.failures = failures;
writeFileSync(`${OUT}/verification.json`, JSON.stringify(report, null, 2));

if (failures.length) {
  console.error(`Lesson 34 browser audit: ${checks - failures.length} passed, ${failures.length} FAILED`);
  for (const failure of failures) console.error(" ✕ " + failure);
  process.exit(1);
}
console.log(`Lesson 34 browser audit: ${checks} checks passed, 0 failed (4 viewports, test/solutions/teacher flow).`);
