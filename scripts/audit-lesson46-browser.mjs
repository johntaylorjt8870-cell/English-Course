// Production-browser regression: every slide at desktop/mobile sizes, direction,
// navigation/lock, real chunk failure and retry, state persistence and assessment.
import { mkdirSync, readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson46-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const dist = join(process.cwd(), "dist");
const server = createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];
  const relative = url.startsWith("/English-Course/") ? url.slice("/English-Course/".length) : url.replace(/^\/+/, "");
  const path = normalize(join(dist, relative || "index.html"));
  const file = path.startsWith(dist) && existsSync(path) && statSync(path).isFile() ? path : join(dist, "index.html");
  res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" }); res.end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}/English-Course/#/lesson/46`;
let checks = 0;
const failures = [];
const ok = (condition, message) => { checks++; if (!condition) { failures.push(message); console.error(`✕ ${message}`); } };
const errors = [];
const expectedNetworkErrors = [];
let browser;

async function jump(page, id) {
  let nav = page.locator(`button[data-step-nav="${id}"]:visible`);
  if (!(await nav.count())) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    nav = page.locator(`button[data-step-nav="${id}"]:visible`);
  }
  await nav.first().click();
  await page.locator(`[data-step-id="${id}"]`).waitFor();
}
function overlap(a, b) {
  return a && b && Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) > 1 && Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) > 1;
}
async function metrics(page) {
  return page.evaluate(() => {
    const main = document.querySelector("#l46-main");
    const visible = (e) => e && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== "hidden";
    const rect = (e) => { if (!visible(e)) return null; const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }; };
    const next = document.querySelector('button[data-step-nav="next"]');
    const prev = document.querySelector('button[data-step-nav="prev"]');
    const locks = [...document.querySelectorAll('[data-site-lock-button="true"]')].filter(visible);
    const hit = (e) => { const r = e?.getBoundingClientRect(); if (!r) return false; const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return Boolean(top && (top === e || e.contains(top))); };
    return { doc: document.documentElement.scrollWidth, viewport: innerWidth, mainScroll: main.scrollWidth, mainWidth: main.clientWidth,
      next: rect(next), prev: rect(prev), lock: rect(locks[0]), lockCount: locks.length, hitNext: hit(next), hitLock: hit(locks[0]),
      step: main.querySelector('[data-step-id]')?.getAttribute('data-step-id'), direction: getComputedStyle(document.querySelector('[data-lesson="46"]')).direction };
  });
}

try {
  browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
  console.log("Chromium launched; desktop start");
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  page.setDefaultTimeout(30000);
  const requests = [];
  page.on("request", (request) => { if (request.resourceType() === "script") requests.push(request.url()); });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (/ERR_FAILED/.test(message.text())) expectedNetworkErrors.push(message.text());
    else errors.push(`console: ${message.text()} ${message.location().url || ""}`);
  });
  // The course's global Google Fonts links are unrelated to this audit; serve an
  // empty stylesheet offline. Lesson 46 uses its own bundled local font subsets.
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.fulfill({ status: 200, contentType: "text/css", body: "" }));
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="46"]').waitFor();
  ok(await page.title() !== "", "production page loads at GitHub Pages base path");
  ok(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "reduced-motion preference honored");
  ok(await page.evaluate(() => document.fonts.check('700 16px Doors46Arabic') && document.fonts.check('700 16px Doors46Latin')), "lesson fonts available locally");

  const screenshots = new Set(["cover", "three-doors", "no-obligation", "unnecessary-action", "trip-lab", "practice-36", "reading", "final-test", "teacher", "writing", "golden-summary", "course-progress"]);
  for (let i = 0; i < 39; i++) {
    const m = await metrics(page);
    ok(m.doc <= m.viewport + 1 && m.mainScroll <= m.mainWidth + 1, `desktop step ${i + 1} (${m.step}): no document or content overflow`);
    ok(m.lockCount === 1 && !overlap(m.lock, m.next) && !overlap(m.lock, m.prev), `desktop step ${i + 1}: lock never overlaps next/previous`);
    ok(m.next && m.lock && m.next.left >= 0 && m.next.right <= m.viewport && m.lock.left >= 0 && m.lock.right <= m.viewport && m.hitNext && m.hitLock, `desktop step ${i + 1}: controls visible and hittable`);
    ok(m.direction === "rtl", `desktop step ${i + 1}: Arabic page stays RTL`);
    if (screenshots.has(m.step)) await page.screenshot({ path: `${work}/desktop-${m.step}.png` });
    if (i < 38) {
      await page.locator('button[data-step-nav="next"]').click();
      await page.waitForFunction((n) => document.body.innerText.includes(`${n} / 39`), i + 2);
    }
  }
  console.log("Desktop slide walk completed");
  ok(!requests.some((url) => /testKey46|TeacherGuide46/.test(url)), "all student slides and locked teacher visit make no key/guide script request before submit");

  await jump(page, "three-doors");
  await page.locator('.l46-door-tab').nth(1).click();
  ok((await page.locator('.l46-door-detail').innerText()).includes("don't have to"), "door control displays no-obligation example");
  await jump(page, "practice-32");
  const practice = page.locator('[data-practice-id="p32-2"]');
  await practice.getByRole("button", { name: "needn't" }).click();
  await practice.getByRole("button", { name: "تحقّق" }).click();
  ok((await practice.innerText()).includes("إجابة مناسبة"), "alternative needn't is accepted for supplied laptop");
  await jump(page, "practice-33"); await jump(page, "practice-32");
  ok(await page.locator('[data-practice-id="p32-2"] button[aria-pressed="true"]').count() === 1 && (await page.locator('[data-practice-id="p32-2"]').innerText()).includes("إجابة مناسبة"), "practice choice and feedback persist across slide navigation");
  await jump(page, "three-doors");
  ok(await page.locator('.l46-door-tab').nth(1).getAttribute("aria-pressed") === "true", "door selection persists across navigation");
  const bidi = await page.evaluate(() => ({ root: getComputedStyle(document.querySelector('[data-lesson="46"]')).direction, en: getComputedStyle(document.querySelector('.l46-door-detail p[lang="en"]')).direction, ar: getComputedStyle(document.querySelector('.l46-door-detail p:not([lang="en"])')).direction }));
  ok(bidi.root === "rtl" && bidi.en === "ltr" && bidi.ar === "rtl", "rendered door comparison preserves Arabic RTL and English LTR");
  // Verify text/background contrast at representative controls and instruction cards.
  const contrasts = await page.evaluate(() => {
    const parse = (value) => { const m = value.match(/[\d.]+/g); return m ? [Number(m[0]), Number(m[1]), Number(m[2]), m[3] === undefined ? 1 : Number(m[3])] : [255, 255, 255, 0]; };
    const composite = (top, bottom) => [0, 1, 2].map((i) => top[i] * top[3] + bottom[i] * (1 - top[3])).concat(1);
    const background = (element) => { let color = [255, 255, 255, 1], chain = []; for (let e = element; e; e = e.parentElement) chain.push(parse(getComputedStyle(e).backgroundColor)); for (const c of chain.reverse()) color = composite(c, color); return color; };
    const lum = (color) => { const c = color.slice(0, 3).map((x) => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
    const selectors = ['.l46-slide-head h1', '.l46-door-tab--stop', '.l46-door-tab--choice', '.l46-door-tab--need', '.l46-door-detail p[lang="en"]', '.l46-note', '.l46-button--dark'];
    return selectors.map((selector) => { const e = document.querySelector(selector), bg = background(e), fg = composite(parse(getComputedStyle(e).color), bg); const a = lum(fg), b = lum(bg); return { selector, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) }; });
  });
  for (const { selector, ratio } of contrasts) ok(ratio >= 4.5, `contrast ${selector}: ${ratio.toFixed(2)}:1 >= 4.5:1`);
  await page.keyboard.press("Tab");
  await page.locator('.l46-door-tab').first().focus();
  const focus = await page.locator('.l46-door-tab').first().evaluate((element) => ({ tag: element.tagName, outline: getComputedStyle(element).outlineStyle, width: parseFloat(getComputedStyle(element).outlineWidth) }));
  ok(focus.tag === "BUTTON" && focus.outline !== "none" && focus.width >= 2, "door controls are semantic buttons with visible keyboard focus");
  await page.locator('.l46-door-tab').first().press("Enter");
  ok(await page.locator('.l46-door-tab').first().getAttribute("aria-pressed") === "true", "keyboard activates door and updates accessible state");
  await jump(page, "writing");
  await page.locator('#l46-writing-draft').fill("We mustn't touch the exhibits. We needn't bring a laptop.");
  await page.locator('#l46-writing-explanation').fill("الأولى منع، والثانية عدم حاجة.");
  await jump(page, "golden-summary"); await jump(page, "writing");
  ok((await page.locator('#l46-writing-draft').inputValue()).includes("mustn't") && (await page.locator('#l46-writing-explanation').inputValue()).includes("الأولى"), "writing draft and Arabic explanation persist");
  await jump(page, "reading");
  await page.getByRole("button", { name: "إظهار الترجمة العربية" }).click();
  ok(await page.locator('.l46-reading-paragraph p[lang="ar"]').count() === 7, "seven reading paragraphs have optional Arabic translations");

  await jump(page, "final-test");
  ok(await page.locator('[data-test-q]').count() === 25 && await page.locator('[data-test-level]').count() === 5, "actual final test renders 25 questions in five levels");
  ok(await page.locator('[data-test-result], [data-question-feedback]').count() === 0, "no score, correct answers or feedback before submission");
  ok(await page.locator('[data-test-submit]').isDisabled(), "incomplete test cannot be submitted");
  await page.locator('[data-test-q="6"] input').fill("mustn't");
  await jump(page, "teacher");
  ok(await page.locator('[data-teacher-locked]').count() === 1 && await page.locator('#l46-teacher-password').count() === 0, "teacher and key remain locked before submission");
  await jump(page, "final-test");
  ok(await page.locator('[data-test-q="6"] input').inputValue() === "mustn't", "partial test response persists after navigation");
  const choiceIndices = { 1: 0, 2: 1, 3: 0, 4: 2, 5: 1, 16: 1, 17: 1, 18: 0, 19: 1, 20: 0 };
  for (const [number, index] of Object.entries(choiceIndices)) await page.locator(`[data-test-q="${number}"] .l46-options button`).nth(index).click();
  const written = { 7: "needn't", 8: "didn't have to", 9: "won't have to", 10: "needn't have bought", 11: "You mustn't enter.", 12: "She doesn't have to come.", 13: "He needn't worry.", 14: "I needn't have gone there.", 15: "We didn't need to pay.", 21: "mustn't", 22: "don't have to", 23: "needn't have", 24: "won't have to", 25: "needn't" };
  for (const [number, value] of Object.entries(written)) await page.locator(`[data-test-q="${number}"] input`).fill(value);
  ok(await page.locator('[data-test-submit]').isEnabled(), "submit enabled after all 25 answers");
  ok(!requests.some((url) => /testKey46|TeacherGuide46/.test(url)), "answering does not load solutions");

  let keyAttempts = 0;
  await page.route(/\/assets\/testKey46-[^/?]+\.js(?:\?.*)?$/, async (route) => { keyAttempts++; if (keyAttempts <= 2) await route.abort("failed"); else await route.continue(); });
  await page.locator('[data-test-submit]').click();
  await page.locator('[data-test-error]').waitFor({ timeout: 30000 });
  ok(keyAttempts === 1 && await page.locator('[data-test-result]').count() === 0, "real failed key request shows error without score");
  ok(await page.locator('[data-test-q="10"] input').inputValue() === "needn't have bought" && await page.locator('[data-test-submit]').isEnabled(), "real key load failure preserves answers and permits retry");
  const secondKeyFailure = page.waitForEvent("requestfailed", { predicate: (request) => /testKey46/.test(request.url()) });
  await page.locator('[data-test-submit]').click();
  await secondKeyFailure;
  await page.locator('[data-test-error]').waitFor({ timeout: 30000 });
  ok(keyAttempts === 2 && await page.locator('[data-test-q="10"] input').inputValue() === "needn't have bought", "second failed key request still preserves answers");
  await page.locator('[data-test-submit]').evaluate((button) => { button.click(); button.click(); });
  await page.locator('[data-test-result]').waitFor({ timeout: 30000 });
  ok(keyAttempts === 3, "after two failures rapid double submit causes only one fresh retry request");
  ok((await page.locator('[data-test-result]').innerText()).includes("25 / 25"), "valid submission grades 25/25");
  ok(await page.locator('[data-question-feedback]').count() === 25, "after submission each question has one correction");
  ok(requests.some((url) => /testKey46/.test(url)), "key chunk is fetched after submission only");
  await page.screenshot({ path: `${work}/desktop-test-result.png` });

  console.log("Test submission and retry completed");
  await jump(page, "teacher");
  ok(await page.locator('#l46-teacher-password').count() === 1 && await page.locator('[data-teacher-guide]').count() === 0, "teacher guide stays gated after submission");
  await page.locator('#l46-teacher-password').fill("wrong"); await page.getByRole("button", { name: "فتح المساحة" }).click();
  ok((await page.locator('[role="alert"]').innerText()).includes("غير صحيحة"), "wrong teacher password rejected");
  let guideAttempts = 0;
  await page.route(/\/assets\/TeacherGuide46-[^/?]+\.js(?:\?.*)?$/, async (route) => { guideAttempts++; if (guideAttempts <= 2) await route.abort("failed"); else await route.continue(); });
  await page.locator('#l46-teacher-password').fill("somer173"); await page.getByRole("button", { name: "فتح المساحة" }).click();
  await page.locator('[data-teacher-error]').waitFor({ timeout: 30000 });
  ok(guideAttempts === 1 && await page.locator('[data-teacher-guide]').count() === 0, "real teacher chunk failure is isolated and retryable");
  const secondGuideFailure = page.waitForEvent("requestfailed", { predicate: (request) => /TeacherGuide46/.test(request.url()) });
  await page.locator('[data-teacher-error] button').click();
  await secondGuideFailure;
  await page.locator('[data-teacher-error]').waitFor({ timeout: 30000 });
  ok(guideAttempts === 2, "second teacher failure leaves a retry control");
  await page.locator('[data-teacher-error] button').click();
  await page.locator('[data-teacher-guide]').waitFor({ timeout: 30000 });
  ok(guideAttempts === 3 && await page.locator('[data-teacher-q]').count() === 25, "teacher retry after two failures loads all detailed explanations");
  await page.screenshot({ path: `${work}/desktop-teacher-open.png` });
  console.log("Teacher retry completed; checking reset and lock");
  await jump(page, "final-test");
  ok((await page.locator('[data-test-result]').innerText()).includes("25 / 25") && await page.locator('[data-test-q="10"] input').inputValue() === "needn't have bought", "teacher failure and navigation preserve student result and answers");
  await page.locator('[data-test-reset]').click();
  ok(await page.locator('[data-test-result], [data-question-feedback]').count() === 0 && await page.locator('[data-test-submit]').isDisabled(), "retake clears score, feedback and completion");
  ok(await page.locator('[data-test-q="10"] input').inputValue() === "", "retake clears typed input");
  await jump(page, "teacher");
  ok(await page.locator('[data-teacher-locked]').count() === 1 && await page.locator('[data-teacher-guide]').count() === 0, "retake re-locks teacher access until new submission");
  await page.locator('[data-site-lock-button="true"]').click();
  ok(await page.locator('#site-gate-title').innerText() === "الموقع محمي" && await page.evaluate(() => localStorage.getItem("englishwithsomer-site-unlocked")) === null, "site lock returns to password gate and clears unlock state");
  console.log("Desktop reset and lock completed; keeping page open for single-process Chromium");

  for (const width of [375, 320, 768]) {
    console.log(`Starting ${width}px viewport`);
    // Reuse the page: @sparticuz/chromium uses single-process mode and closing
    // an isolated page/context can terminate the entire headless browser.
    const mobile = page;
    await mobile.setViewportSize({ width, height: 812 });
    await mobile.evaluate(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
    await mobile.reload({ waitUntil: "networkidle" }); await mobile.locator('[data-lesson="46"]').waitFor();
    for (let i = 0; i < 39; i++) {
      const m = await metrics(mobile);
      ok(m.doc <= width + 1 && m.mainScroll <= m.mainWidth + 1, `${width}px step ${i + 1} (${m.step}): no overflow`);
      ok(m.lockCount === 1 && !overlap(m.lock, m.next) && !overlap(m.lock, m.prev), `${width}px step ${i + 1}: no lock/navigation overlap`);
      ok(m.next && m.lock && m.next.left >= 0 && m.next.right <= width && m.lock.left >= 0 && m.lock.right <= width && m.hitNext && m.hitLock, `${width}px step ${i + 1}: controls visible and hittable`);
      if (width === 375 && screenshots.has(m.step)) await mobile.screenshot({ path: `${work}/mobile-${m.step}.png` });
      if (i < 38) { await mobile.locator('button[data-step-nav="next"]').click(); await mobile.waitForFunction((n) => document.body.innerText.includes(`${n} / 39`), i + 2); }
    }
    await jump(mobile, "three-doors");
    ok(await mobile.locator('.l46-door-tab').count() === 3, `${width}px drawer opens and reaches interactive doors`);
    await mobile.locator('.l46-door-tab').nth(2).click();
    ok(await mobile.locator('.l46-door-tab').nth(2).getAttribute("aria-pressed") === "true", `${width}px door interaction works`);
    console.log(`Completed ${width}px viewport`);
  }
  ok(expectedNetworkErrors.length <= 4, `only deliberately simulated resource failures logged (${expectedNetworkErrors.length})`);
  ok(errors.length === 0, `zero unexpected console/page errors: ${errors.join(" | ")}`);
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
if (failures.length) { console.error(`\nLesson 46 browser audit FAILED: ${failures.length} failures / ${checks} assertions.`); process.exit(1); }
console.log(`Lesson 46 browser audit passed: ${checks} assertions, 0 failures. Intentional failed requests: ${expectedNetworkErrors.length} console messages.`);
