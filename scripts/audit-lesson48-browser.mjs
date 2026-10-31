// Lesson 48 production-browser regression: every slide at desktop/mobile sizes,
// direction, navigation/lock, real key-chunk failure and retry, state persistence,
// assessment grading (including accepted alternatives) and the teacher gate.
import { mkdirSync, readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson48-browser";
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
  res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}/English-Course/#/lesson/48`;
let checks = 0;
const failures = [];
const ok = (condition, message) => {
  checks++;
  if (!condition) {
    failures.push(message);
    console.error(`✕ ${message}`);
  }
};
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
  return (
    a &&
    b &&
    Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) > 1 &&
    Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) > 1
  );
}
async function metrics(page) {
  return page.evaluate(() => {
    const main = document.querySelector("#l48-main");
    const visible = (e) => e && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== "hidden";
    const rect = (e) => {
      if (!visible(e)) return null;
      const r = e.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    };
    const next = document.querySelector('button[data-step-nav="next"]');
    const prev = document.querySelector('button[data-step-nav="prev"]');
    const locks = [...document.querySelectorAll('[data-site-lock-button="true"]')].filter(visible);
    const hit = (e) => {
      const r = e?.getBoundingClientRect();
      if (!r) return false;
      const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return Boolean(top && (top === e || e.contains(top)));
    };
    return {
      doc: document.documentElement.scrollWidth,
      viewport: innerWidth,
      mainScroll: main.scrollWidth,
      mainWidth: main.clientWidth,
      next: rect(next),
      prev: rect(prev),
      lock: rect(locks[0]),
      lockCount: locks.length,
      hitNext: hit(next),
      hitLock: hit(locks[0]),
      step: main.querySelector("[data-step-id]")?.getAttribute("data-step-id"),
      direction: getComputedStyle(document.querySelector('[data-lesson="48"]')).direction,
    };
  });
}

const CHOICE_INDEX = { 1: 1, 2: 0, 3: 1, 4: 1, 5: 1, 6: 0, 7: 1, 8: 2, 9: 0, 10: 1, 21: 0, 22: 0, 23: 0, 24: 0 };
const WRITTEN = {
  11: "could",
  12: "might",
  13: "must",
  14: "needn't",
  15: "to learn",
  16: "He must study harder.",
  17: "Can she drive?",
  18: "You don't have to come early.",
  19: "I'd rather travel by train.",
  20: "Would you mind waiting here.",
  25: "May; may; have to; should; Could; needn't; would",
};
async function fillTest(page, overrides = {}) {
  for (const [number, index] of Object.entries(CHOICE_INDEX)) {
    await page.locator(`[data-test-q="${number}"] .l48-options button`).nth(index).click();
  }
  for (const [number, value] of Object.entries({ ...WRITTEN, ...overrides })) {
    await page.locator(`[data-test-q="${number}"] input`).fill(value);
  }
}

try {
  browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
  console.log("Chromium launched; desktop start");
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  page.setDefaultTimeout(30000);
  const requests = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script") requests.push(request.url());
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (/ERR_FAILED/.test(message.text())) expectedNetworkErrors.push(message.text());
    else errors.push(`console: ${message.text()} ${message.location().url || ""}`);
  });
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.fulfill({ status: 200, contentType: "text/css", body: "" }));
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="48"]').waitFor();
  ok((await page.title()) !== "", "production page loads at the GitHub Pages base path");
  ok(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "reduced-motion preference honoured");
  ok(
    await page.evaluate(async () => {
      await document.fonts.ready;
      return document.fonts.check("700 16px Deck48Arabic") && document.fonts.check("700 16px Deck48Latin");
    }),
    "lesson fonts available locally"
  );
  const coverTitle = await page.locator(".l48-cover-title").innerText();
  ok(coverTitle.includes("MODAL VERBS") && coverTitle.includes("MASTER REVIEW"), "cover shows the lesson identity");
  ok((await page.locator(".l48-cover").innerText()).includes("48 · 120"), "cover states the course position");

  const screenshots = new Set(["cover", "seven-situations", "modal-map", "can-could-map", "three-doors", "decision-map", "detective-a", "dialogue-school", "what-would-you-say", "contrast-lab", "mastery-dashboard", "reading", "final-test", "teacher", "writing", "golden-summary", "phase-complete", "course-progress"]);
  for (let i = 0; i < 52; i++) {
    const m = await metrics(page);
    ok(m.doc <= m.viewport + 1 && m.mainScroll <= m.mainWidth + 1, `desktop step ${i + 1} (${m.step}): no document or content overflow`);
    ok(m.lockCount === 1 && !overlap(m.lock, m.next) && !overlap(m.lock, m.prev), `desktop step ${i + 1}: lock never overlaps next/previous`);
    ok(
      m.next && m.lock && m.next.left >= 0 && m.next.right <= m.viewport && m.lock.left >= 0 && m.lock.right <= m.viewport && m.hitNext && m.hitLock,
      `desktop step ${i + 1}: controls visible and hittable`
    );
    ok(m.direction === "rtl", `desktop step ${i + 1}: Arabic page stays RTL`);
    if (screenshots.has(m.step)) await page.screenshot({ path: `${work}/desktop-${m.step}.png` });
    if (i < 51) {
      await page.locator('button[data-step-nav="next"]').click();
      await page.waitForFunction((n) => document.body.innerText.includes(`${n} / 52`), i + 2);
    }
  }
  console.log("Desktop slide walk completed");
  ok(!requests.some((url) => /testKey48|TeacherGuide48/.test(url)), "all student slides and locked teacher make no key/guide script request before submit");

  /* ---------- interactions ---------- */
  await jump(page, "modal-map");
  await page.locator(".l48-map-key").nth(2).click();
  ok((await page.locator(".l48-map-detail").innerText()).includes("It may rain tomorrow."), "meaning map opens the selected modal examples");
  await jump(page, "seven-situations");
  await page.locator(".l48-case-tile").nth(5).click();
  ok((await page.locator(".l48-case-detail").innerText()).includes("You mustn't enter the room."), "situation wall reveals the prohibition example");
  await jump(page, "contrast-lab");
  const contrast = page.locator('[data-contrast="mustnt-vs-dont"]');
  await contrast.locator(".l48-contrast-tabs button").nth(1).click();
  ok((await contrast.locator(".l48-contrast-sentence").innerText()).includes("You don't have to go."), "contrast lab swaps the modal and the sentence");
  ok((await contrast.innerText()).includes("لست ملزمًا"), "contrast lab explains the changed meaning");
  await jump(page, "dialogue-school");
  await page.getByRole("button", { name: "إظهار الترجمة العربية" }).click();
  ok((await page.locator(".l48-dialogue .l48-turn-ar").count()) === 9, "all nine dialogue turns have optional Arabic translation");
  const labCard = page.locator('[data-practice-id="lab-school"]');
  await labCard.getByRole("button", { name: /إنهاء كل شيء اليوم غير ممنوع/ }).click();
  await labCard.getByRole("button", { name: "تحقّق" }).click();
  ok((await labCard.innerText()).includes("إجابة مناسبة"), "dialogue comprehension check grades a correct meaning");
  await jump(page, "modal-map");
  ok((await page.locator(".l48-map-detail").innerText()).includes("It may rain tomorrow."), "meaning-map selection persists across navigation");
  await jump(page, "seven-situations");
  ok((await page.locator(".l48-case-tile").nth(5).getAttribute("aria-pressed")) === "true", "situation selection persists across navigation");

  await jump(page, "decision-map");
  await page.locator(".l48-decision-step").nth(4).click();
  ok((await page.locator(".l48-decision-panel").innerText()).includes("SHOULD"), "decision map answers the advice branch");
  const bidi = await page.evaluate(() => ({
    root: getComputedStyle(document.querySelector('[data-lesson="48"]')).direction,
    en: getComputedStyle(document.querySelector(".l48-decision-example")).direction,
    ar: getComputedStyle(document.querySelector(".l48-decision-why")).direction,
  }));
  ok(bidi.root === "rtl" && bidi.en === "ltr" && bidi.ar === "rtl", "rendered decision panel keeps English LTR inside the RTL UI");

  await jump(page, "contrast-lab");
  const contrasts = await page.evaluate(() => {
    const parse = (value) => {
      const m = value.match(/[\d.]+/g);
      return m ? [Number(m[0]), Number(m[1]), Number(m[2]), m[3] === undefined ? 1 : Number(m[3])] : [255, 255, 255, 0];
    };
    const composite = (top, bottom) => [0, 1, 2].map((i) => top[i] * top[3] + bottom[i] * (1 - top[3])).concat(1);
    const background = (element) => {
      let color = [255, 255, 255, 1];
      const chain = [];
      for (let e = element; e; e = e.parentElement) chain.push(parse(getComputedStyle(e).backgroundColor));
      for (const c of chain.reverse()) color = composite(c, color);
      return color;
    };
    const lum = (color) => {
      const c = color.slice(0, 3).map((x) => {
        x /= 255;
        return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const selectors = [".l48-slide-head h1", ".l48-lead", ".l48-contrast-tabs button", ".l48-tag"];
    return selectors.flatMap((selector) => {
      const e = document.querySelector(selector);
      if (!e) return [];
      const bg = background(e);
      const fg = composite(parse(getComputedStyle(e).color), bg);
      const a = lum(fg);
      const b = lum(bg);
      return { selector, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) };
    });
  });
  for (const { selector, ratio } of contrasts) ok(ratio >= 4.5, `contrast ${selector}: ${ratio.toFixed(2)}:1 >= 4.5:1`);

  await jump(page, "decision-map");
  await page.locator(".l48-decision-step").first().focus();
  const focus = await page.locator(".l48-decision-step").first().evaluate((element) => ({
    tag: element.tagName,
    outline: getComputedStyle(element).outlineStyle,
    width: parseFloat(getComputedStyle(element).outlineWidth),
  }));
  ok(focus.tag === "BUTTON" && focus.outline !== "none" && focus.width >= 2, "decision steps are semantic buttons with visible keyboard focus");
  await page.locator(".l48-decision-step").nth(2).press("Enter");
  ok((await page.locator(".l48-decision-step").nth(2).getAttribute("aria-pressed")) === "true", "keyboard activates a decision step");

  await jump(page, "writing");
  await page.locator("#l48-writing-draft").fill("I can swim. I could swim when I was six. I might go. May I come in? I must study. I have to work. I mustn't smoke. I don't have to hurry. I should rest. I ought to help. I'd like tea. I'd rather walk. I'd rather walk than drive. Could you help me? Would you mind opening the window? I promised I will try. I will help you.");
  await page.locator("#l48-writing-explanation").fill("استخدمت الأفعال الناقصة بحسب الوظيفة.");
  const writingChecks = await page.locator(".l48-writing-checks > div.is-met").count();
  ok(writingChecks === 15, `writing checklist recognises all fifteen structures (got ${writingChecks})`);
  await jump(page, "golden-summary");
  await jump(page, "writing");
  ok((await page.locator("#l48-writing-draft").inputValue()).includes("Would you mind"), "writing draft persists across navigation");

  await jump(page, "reading");
  await page.getByRole("button", { name: "إظهار الترجمة العربية" }).click();
  ok((await page.locator('.l48-reading-paragraph p[lang="ar"]').count()) === 14, "fourteen reading paragraphs have optional Arabic translations");
  await jump(page, "reading-questions");
  await page.locator('[data-reading-q="13"] input').fill("الأولى منع والثانية عدم إلزام.");
  await page.locator('[data-reading-q="13"]').getByRole("button", { name: "قارن بالإجابة النموذجية" }).click();
  ok((await page.locator('[data-reading-q="13"]').innerText()).includes("MUSTN'T تعني المنع"), "reading model answers reveal only on request");

  await jump(page, "mastery-dashboard");
  const dashboardBefore = await page.locator(".l48-dashboard-summary").innerText();
  ok(dashboardBefore.includes("— / 25"), "dashboard does not invent a test score before submission");
  ok(dashboardBefore.includes("1 / 15"), "dashboard counts only written reading answers");

  await jump(page, "final-test");
  const submitContrast = await page.evaluate(() => {
    const parse = (value) => {
      const m = value.match(/[\d.]+/g);
      return m ? [Number(m[0]), Number(m[1]), Number(m[2]), m[3] === undefined ? 1 : Number(m[3])] : [255, 255, 255, 0];
    };
    const composite = (top, bottom) => [0, 1, 2].map((i) => top[i] * top[3] + bottom[i] * (1 - top[3])).concat(1);
    const background = (element) => {
      let color = [255, 255, 255, 1];
      const chain = [];
      for (let e = element; e; e = e.parentElement) chain.push(parse(getComputedStyle(e).backgroundColor));
      for (const c of chain.reverse()) color = composite(c, color);
      return color;
    };
    const lum = (color) => {
      const c = color.slice(0, 3).map((x) => {
        x /= 255;
        return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const e = document.querySelector("[data-test-submit]");
    const bg = background(e);
    const fg = composite(parse(getComputedStyle(e).color), bg);
    const a = lum(fg);
    const b = lum(bg);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
  ok(submitContrast >= 4.5, `contrast submit button: ${submitContrast.toFixed(2)}:1 >= 4.5:1`);
  ok((await page.locator("[data-test-q]").count()) === 25 && (await page.locator("[data-test-level]").count()) === 5, "actual final test renders 25 questions in five levels");
  ok((await page.locator("[data-test-result], [data-question-feedback]").count()) === 0, "no score, correct answers or feedback before submission");
  ok(await page.locator("[data-test-submit]").isDisabled(), "incomplete test cannot be submitted");
  await page.locator('[data-test-q="11"] input').fill("could");
  await jump(page, "teacher");
  ok((await page.locator("[data-teacher-locked]").count()) === 1 && (await page.locator("#l48-teacher-password").count()) === 0, "teacher and key remain locked before submission");
  await jump(page, "final-test");
  ok((await page.locator('[data-test-q="11"] input').inputValue()) === "could", "partial test response persists after navigation");
  await fillTest(page);
  ok(await page.locator("[data-test-submit]").isEnabled(), "submit enabled after all 25 answers");
  ok(!requests.some((url) => /testKey48|TeacherGuide48/.test(url)), "answering does not load solutions");

  let keyAttempts = 0;
  await page.route(/\/assets\/testKey48-[^/?]+\.js(?:\?.*)?$/, async (route) => {
    keyAttempts++;
    if (keyAttempts <= 2) await route.abort("failed");
    else await route.continue();
  });
  await page.locator("[data-test-submit]").click();
  await page.locator("[data-test-error]").waitFor({ timeout: 30000 });
  ok(keyAttempts === 1 && (await page.locator("[data-test-result]").count()) === 0, "real failed key request shows an error without a score");
  ok((await page.locator('[data-test-q="25"] input').inputValue()) === WRITTEN[25] && (await page.locator("[data-test-submit]").isEnabled()), "real key failure preserves answers and permits retry");
  const secondKeyFailure = page.waitForEvent("requestfailed", { predicate: (request) => /testKey48/.test(request.url()) });
  await page.locator("[data-test-submit]").click();
  await secondKeyFailure;
  await page.locator("[data-test-error]").waitFor({ timeout: 30000 });
  ok(keyAttempts === 2 && (await page.locator('[data-test-q="18"] input').inputValue()) === WRITTEN[18], "second failed key request still preserves answers");
  await page.locator("[data-test-submit]").evaluate((button) => {
    button.click();
    button.click();
  });
  await page.locator("[data-test-result]").waitFor({ timeout: 30000 });
  ok(keyAttempts === 3, "after two failures rapid double submit causes only one fresh retry request");
  ok((await page.locator("[data-test-result]").innerText()).includes("25 / 25"), "valid submission grades 25/25");
  for (const id of ["q12", "q18", "q25"]) ok((await page.locator(`[data-question-feedback="${id}"]`).innerText()).includes("إجابة صحيحة"), `${id} accepted alternative is marked correct after a successful retry`);
  ok((await page.locator("[data-question-feedback]").count()) === 25, "after submission each question has one correction");
  ok(requests.some((url) => /testKey48/.test(url)), "key chunk is fetched after submission only");
  await page.screenshot({ path: `${work}/desktop-test-result.png` });

  console.log("Test submission and retry completed");
  await jump(page, "teacher");
  ok((await page.locator("#l48-teacher-password").count()) === 1 && (await page.locator("[data-teacher-guide]").count()) === 0, "teacher guide stays gated after submission");
  await page.locator("#l48-teacher-password").fill("wrong");
  await page.getByRole("button", { name: "فتح المساحة" }).click();
  ok((await page.locator('[role="alert"]').innerText()).includes("غير صحيحة"), "wrong teacher password rejected");
  let guideAttempts = 0;
  await page.route(/\/assets\/TeacherGuide48-[^/?]+\.js(?:\?.*)?$/, async (route) => {
    guideAttempts++;
    if (guideAttempts <= 2) await route.abort("failed");
    else await route.continue();
  });
  await page.locator("#l48-teacher-password").fill("somer173");
  await page.getByRole("button", { name: "فتح المساحة" }).click();
  await page.locator("[data-teacher-error]").waitFor({ timeout: 30000 });
  ok(guideAttempts === 1 && (await page.locator("[data-teacher-guide]").count()) === 0, "real teacher chunk failure is isolated and retryable");
  const secondGuideFailure = page.waitForEvent("requestfailed", { predicate: (request) => /TeacherGuide48/.test(request.url()) });
  await page.locator("[data-teacher-error] button").click();
  await secondGuideFailure;
  await page.locator("[data-teacher-error]").waitFor({ timeout: 30000 });
  ok(guideAttempts === 2, "second teacher failure leaves a retry control");
  await page.locator("[data-teacher-error] button").click();
  await page.locator("[data-teacher-guide]").waitFor({ timeout: 30000 });
  ok(guideAttempts === 3 && (await page.locator("[data-teacher-q]").count()) === 25, "teacher retry after two failures loads all 25 detailed explanations");
  const guideText = await page.locator("[data-teacher-guide]").innerText();
  ok(guideText.includes("MUSTN'T") && guideText.includes("NEEDN'T HAVE"), "teacher guide explains the mustn't / don't-have-to nuance and the lesson-49 teaser");
  ok(guideText.includes("إجابات القراءة النموذجية"), "teacher guide includes model reading answers");
  await page.screenshot({ path: `${work}/desktop-teacher-open.png` });
  console.log("Teacher retry completed; checking reset and wrong-answer grading");

  await jump(page, "final-test");
  ok((await page.locator("[data-test-result]").innerText()).includes("25 / 25") && (await page.locator('[data-test-q="18"] input').inputValue()) === WRITTEN[18], "teacher failure and navigation preserve the student result and answers");
  await page.locator("[data-test-reset]").click();
  ok((await page.locator("[data-test-result], [data-question-feedback]").count()) === 0 && (await page.locator("[data-test-submit]").isDisabled()), "retake clears score, feedback and completion");
  ok((await page.locator('[data-test-q="18"] input').inputValue()) === "", "retake clears typed input");
  await fillTest(page, { 18: "You mustn't come early.", 16: "He must to study harder." });
  await page.locator("[data-test-submit]").click();
  await page.locator("[data-test-result]").waitFor({ timeout: 30000 });
  ok((await page.locator("[data-test-result]").innerText()).includes("23 / 25"), "meaning-changing and ungrammatical corrections are both graded wrong");
  ok((await page.locator('[data-question-feedback="q18"]').innerText()).includes("تحتاج إلى مراجعة"), "the mustn't-for-no-necessity answer gets corrective feedback");
  ok((await page.locator('[data-question-feedback="q16"]').innerText()).includes("تحتاج إلى مراجعة"), "the grammatical error with a correct modal word is rejected");
  ok((await page.locator('[data-question-feedback="q12"]').innerText()).includes("إجابة صحيحة"), "the modal-probability alternative stays correct");
  await page.locator("[data-test-reset]").click();
  await jump(page, "teacher");
  ok((await page.locator("[data-teacher-locked]").count()) === 1 && (await page.locator("[data-teacher-guide]").count()) === 0, "retake re-locks teacher access until a new submission");
  await jump(page, "phase-complete");
  const phaseText = await page.locator("[data-phase-complete]").innerText();
  ok(phaseText.includes("8 / 8") && phaseText.includes("48 / 120") && phaseText.includes("40%") && phaseText.includes("72"), "phase completion states 8/8, 48/120, 40% and 72 remaining");
  await jump(page, "course-progress");
  ok((await page.locator(".l48-next-lesson").innerText()).includes("MODAL PERFECT"), "roadmap announces Lesson 49 — MODAL PERFECT");
  await page.locator('[data-site-lock-button="true"]').click();
  ok((await page.locator("#site-gate-title").innerText()) === "الموقع محمي" && (await page.evaluate(() => localStorage.getItem("englishwithsomer-site-unlocked"))) === null, "site lock returns to the password gate and clears unlock state");
  console.log("Desktop reset and lock completed; keeping the page for single-process Chromium");

  for (const width of [375, 320, 768]) {
    console.log(`Starting ${width}px viewport`);
    const mobile = page;
    await mobile.setViewportSize({ width, height: 812 });
    await mobile.evaluate(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
    await mobile.reload({ waitUntil: "networkidle" });
    await mobile.locator('[data-lesson="48"]').waitFor();
    for (let i = 0; i < 52; i++) {
      const m = await metrics(mobile);
      ok(m.doc <= width + 1 && m.mainScroll <= m.mainWidth + 1, `${width}px step ${i + 1} (${m.step}): no overflow`);
      ok(m.lockCount === 1 && !overlap(m.lock, m.next) && !overlap(m.lock, m.prev), `${width}px step ${i + 1}: no lock/navigation overlap`);
      ok(
        m.next && m.lock && m.next.left >= 0 && m.next.right <= width && m.lock.left >= 0 && m.lock.right <= width && m.hitNext && m.hitLock,
        `${width}px step ${i + 1}: controls visible and hittable`
      );
      if (width === 375 && screenshots.has(m.step)) await mobile.screenshot({ path: `${work}/mobile-${m.step}.png` });
      if (i < 51) {
        await mobile.locator('button[data-step-nav="next"]').click();
        await mobile.waitForFunction((n) => document.body.innerText.includes(`${n} / 52`), i + 2);
      }
    }
    await jump(mobile, "modal-map");
    ok((await mobile.locator(".l48-map-key").count()) === 13, `${width}px drawer reaches the modal map with all thirteen entries`);
    await mobile.locator(".l48-map-key").nth(3).click();
    ok((await mobile.locator(".l48-map-detail").innerText()).includes("She might come."), `${width}px modal map interaction works`);
    await jump(mobile, "can-could-map");
    const table = await mobile.locator(".l48-table").evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth }));
    ok(table.scroll <= table.client + 1, `${width}px comparison table adapts without horizontal overflow`);
    await jump(mobile, "three-doors");
    const table2 = await mobile.locator(".l48-table").evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth }));
    ok(table2.scroll <= table2.client + 1, `${width}px prohibition table adapts without horizontal overflow`);
    console.log(`Completed ${width}px viewport`);
  }
  ok(expectedNetworkErrors.length <= 4, `only deliberately simulated resource failures logged (${expectedNetworkErrors.length})`);
  ok(errors.length === 0, `zero unexpected console/page errors: ${errors.join(" | ")}`);
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
if (failures.length) {
  console.error(`\nLesson 48 browser audit FAILED: ${failures.length} failures / ${checks} assertions.`);
  process.exit(1);
}
console.log(`Lesson 48 browser audit passed: ${checks} assertions, 0 failures. Intentional failed requests: ${expectedNetworkErrors.length} console messages.`);
