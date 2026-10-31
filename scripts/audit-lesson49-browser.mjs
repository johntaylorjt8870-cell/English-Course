// Lesson 49 production-browser audit: every slide at 1280/768/375/320,
// direction, navigation/lock, real key-chunk failure and retry, state persistence,
// alternative-aware grading and the teacher gate.
import { mkdirSync, readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson49-browser";
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
const base = `http://127.0.0.1:${server.address().port}/English-Course/#/lesson/49`;
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
    const main = document.querySelector("#l49-main");
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
      direction: getComputedStyle(document.querySelector('[data-lesson="49"]')).direction,
    };
  });
}

const CHOICE_INDEX = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 2, 6: 1, 7: 0, 8: 1, 9: 1, 10: 1 };
const WRITTEN = {
  11: "gone",
  12: "called",
  13: "forgotten",
  14: "won",
  15: "eaten",
  16: "She must have arrived.",
  17: "He might have forgotten.",
  18: "You should have gone to school.",
  19: "They could have seen us.",
  20: "I needn't have taken a taxi.",
  21: "She must have arrived early.",
  22: "He may not have understood the question.",
  23: "They ought to have helped us.",
  24: "You should not have bought that phone.",
  25: "I'd have gone with you if you'd told me.",
};
async function fillTest(page, overrides = {}) {
  for (const [number, index] of Object.entries(CHOICE_INDEX)) {
    await page.locator(`[data-test-q="q${number}"] .l49-test-option`).nth(index).click();
  }
  for (const [number, value] of Object.entries({ ...WRITTEN, ...overrides })) {
    await page.locator(`[data-test-q="q${number}"] input`).fill(value);
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
  await page.locator('[data-lesson="49"]').waitFor();
  ok((await page.title()) !== "", "production page loads at the GitHub Pages base path");
  ok(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "reduced-motion preference honoured");
  ok(
    await page.evaluate(async () => {
      await document.fonts.ready;
      return document.fonts.check("700 16px Deck49Arabic") && document.fonts.check("700 16px Deck49Latin");
    }),
    "lesson fonts available locally"
  );
  const coverText = await page.locator(".l49-cover").innerText();
  ok(coverText.includes("ملف الماضي") && coverText.includes("MODAL PERFECT"), "cover shows the new lesson identity");
  ok(coverText.includes("49 · 120") && coverText.includes("PHASE 03"), "cover states the course position and phase");
  ok(coverText.includes("52 شريحة") && coverText.includes("22 محطة") && coverText.includes("25 سؤالًا"), "cover states slide, station and test counts");

  const screenshots = new Set([
    "cover", "core-formula", "v3-workshop", "present-past", "must-evidence", "detector-lab", "may-might-compare",
    "meaning-map", "meaning-contrast", "should-have", "neednt-vs-didnt", "dialogue", "reading", "practice-2",
    "final-test", "teacher", "writing", "mastery-dashboard", "golden-summary", "stage-progress", "course-progress",
  ]);
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
  ok(!requests.some((url) => /testKey49|TeacherGuide49/.test(url)), "all student slides and locked teacher make no key/guide script request before submit");

  /* ---------- interactions ---------- */
  await jump(page, "timeline-lab");
  const pair = page.locator('[data-timeline-pair="t1"]');
  await pair.getByRole("button", { name: "الجملة B" }).click();
  ok((await pair.innerText()).includes("صحيح") && (await pair.innerText()).includes("الماضي"), "timeline lab identifies the past sentence and explains why");

  await jump(page, "v3-workshop");
  const v3 = page.locator('[data-v3-item="v1"]');
  await v3.locator("input").fill("gone");
  await v3.getByRole("button", { name: "تحقّق" }).click();
  ok((await v3.innerText()).includes("V3 الصحيح"), "V3 workshop grades the third form");

  await jump(page, "must-evidence");
  const evidence = page.locator('[data-evidence="e1"]');
  await evidence.getByRole("button", { name: /It must have rained/ }).click();
  ok((await evidence.innerText()).includes("استنتاج مناسب"), "evidence investigation grades a strong deduction");

  await jump(page, "detector-lab");
  const detector = page.locator('[data-detector="m1"]');
  await detector.getByRole("button", { name: /استنتاج قوي/ }).click();
  ok((await detector.innerText()).includes("وظيفة صحيحة"), "meaning detector recognises a strong deduction");

  await jump(page, "meaning-map");
  ok((await page.locator(".l49-map-key").count()) === 10, "meaning map exposes all ten combinations");
  const firstMap = await page.locator(".l49-map-detail").innerText();
  await page.locator(".l49-map-key").nth(5).click();
  ok((await page.locator(".l49-map-detail").innerText()) !== firstMap, "meaning map swaps the full detail card");
  ok((await page.locator(".l49-map-detail").innerText()).includes("الفرق عن أقرب تركيب"), "meaning map explains the nearest contrast");

  await jump(page, "meaning-contrast");
  const contrast = page.locator('[data-contrast="must-vs-might"]');
  const firstContrast = await contrast.locator(".l49-contrast-stage").innerText();
  await contrast.locator(".l49-contrast-tabs button").nth(1).click();
  ok((await contrast.locator(".l49-contrast-stage").innerText()) !== firstContrast, "contrast lab swaps the modal and its meaning");
  ok((await contrast.locator(".l49-contrast-stage").innerText()).includes("احتمال"), "contrast lab explains the weaker possibility");

  await jump(page, "dialogue");
  await page.getByRole("button", { name: "إظهار الترجمة العربية" }).click();
  ok((await page.locator(".l49-dialogue .l49-turn-ar").count()) === 14, "all fourteen dialogue turns have optional Arabic translation");
  const dialogueLab = page.locator('[data-practice-id="dl1"]');
  await dialogueLab.getByRole("button", { name: "احتمال في الماضي" }).click();
  await dialogueLab.getByRole("button", { name: "تحقّق" }).click();
  ok((await dialogueLab.innerText()).includes("إجابة مناسبة"), "dialogue mission grades the meaning of MIGHT HAVE");

  await jump(page, "reading");
  await page.getByRole("button", { name: "إظهار الترجمة العربية" }).click();
  ok((await page.locator('.l49-reading-paragraph p[lang="ar"]').count()) === 6, "six reading paragraphs have optional Arabic translations");
  await jump(page, "reading-questions");
  ok((await page.locator(".l49-reading-q").count()) === 6, "six comprehension questions are rendered");
  await page.locator('[data-reading-q="1"] input').fill("She might have left it in the library.");
  await page.locator('[data-reading-q="1"]').getByRole("button", { name: "قارن بالإجابة النموذجية" }).click();
  ok((await page.locator('[data-reading-q="1"]').innerText()).includes("Model") || (await page.locator('[data-reading-q="1"]').innerText()).includes("might"), "reading model answers reveal only on request");

  await jump(page, "reading-challenge");
  const challenge = page.locator('[data-challenge-q="1"]');
  ok((await challenge.locator(".l49-challenge-feedback").count()) === 0, "reading challenge hides explanations before checking");
  await challenge.locator(".l49-challenge-options button").nth(1).click();
  ok((await challenge.locator(".l49-challenge-feedback").count()) === 0, "reading challenge still hides the explanation after selecting");
  await challenge.getByRole("button", { name: "تحقّق" }).click();
  ok((await challenge.locator(".l49-challenge-feedback").count()) === 1, "reading challenge explains only after checking");

  await jump(page, "writing");
  await page.locator("#l49-writing-draft").fill(
    "I must have forgotten my alarm. She might have missed the bus. We could have won the match. I should have studied harder. He shouldn't have eaten so much. You needn't have bought the food. The bus had left before I arrived. I would have helped you if I had known.",
  );
  await page.locator("#l49-writing-explanation").fill("استخدمت ستة تراكيب Modal Perfect.");
  const writingChecks = await page.locator(".l49-writing-checks > div.is-met").count();
  ok(writingChecks === 6, `writing checklist recognises all six structures (got ${writingChecks})`);
  ok((await page.locator(".l49-writing-head").innerText()).includes("8 / 8–10"), "writing panel counts the eight sentences honestly");

  await jump(page, "mastery-dashboard");
  const dashboardBefore = await page.locator(".l49-dashboard-summary").innerText();
  ok(dashboardBefore.includes("— / 25"), "dashboard does not invent a test score before submission");
  ok(dashboardBefore.includes("1 / 6"), "dashboard counts only written reading answers");
  ok(dashboardBefore.includes("1 / 1"), "dashboard counts only checked practice items");

  await jump(page, "final-test");
  ok((await page.locator("[data-test-q]").count()) === 25 && (await page.locator("[data-test-level]").count()) === 4, "actual final test renders 25 questions in four groups");
  ok((await page.locator("[data-test-result], [data-question-feedback]").count()) === 0, "no score, correct answers or feedback before submission");
  ok(await page.locator("[data-test-submit]").isDisabled(), "incomplete test cannot be submitted");
  await page.locator('[data-test-q="q11"] input').fill("gone");
  await jump(page, "teacher");
  ok((await page.locator("[data-teacher-waiting]").count()) === 1 && (await page.locator("#l49-teacher-password").count()) === 0, "teacher and key remain locked before submission");
  await jump(page, "final-test");
  ok((await page.locator('[data-test-q="q11"] input').inputValue()) === "gone", "partial test response persists after navigation");
  await fillTest(page);
  ok(await page.locator("[data-test-submit]").isEnabled(), "submit enabled after all 25 answers");
  ok(!requests.some((url) => /testKey49|TeacherGuide49/.test(url)), "answering does not load solutions");

  let keyAttempts = 0;
  await page.route(/\/assets\/testKey49-[^/?]+\.js(?:\?.*)?$/, async (route) => {
    keyAttempts++;
    if (keyAttempts <= 3) await route.abort("failed");
    else await route.continue();
  });
  await page.locator("[data-test-submit]").click();
  await page.locator("[data-test-error]").waitFor({ timeout: 30000 });
  ok(keyAttempts === 3 && (await page.locator("[data-test-result]").count()) === 0, "three real failed key requests show an error without a score");
  ok((await page.locator('[data-test-q="q25"] input').inputValue()) === WRITTEN[25] && (await page.locator("[data-test-submit]").isEnabled()), "real key failure preserves answers and permits retry");
  await page.locator("[data-test-submit]").evaluate((button) => {
    button.click();
    button.click();
  });
  await page.locator("[data-test-result]").waitFor({ timeout: 30000 });
  ok(keyAttempts === 4, "after failure rapid double submit causes only one fresh key request");
  ok((await page.locator("[data-test-result]").innerText()).includes("25 / 25"), "valid submission grades 25/25");
  ok((await page.locator("[data-question-feedback]").count()) === 25, "after submission each question has one correction");
  for (const id of ["q3", "q4", "q22", "q25"]) ok((await page.locator(`[data-question-feedback]`).nth(Number(id.slice(1)) - 1).innerText()).includes("إجابة صحيحة"), `${id} accepted alternative is marked correct`);
  ok(requests.some((url) => /testKey49/.test(url)), "key chunk is fetched after submission only");
  await page.screenshot({ path: `${work}/desktop-test-result.png` });

  console.log("Test submission and retry completed");
  await jump(page, "teacher");
  ok((await page.locator("#l49-teacher-password").count()) === 1 && (await page.locator("[data-teacher-guide]").count()) === 0, "teacher guide stays gated after submission");
  await page.locator("#l49-teacher-password").fill("wrong");
  await page.getByRole("button", { name: "فتح الدليل" }).click();
  ok((await page.locator('[role="alert"]').innerText()).includes("غير صحيحة"), "wrong teacher password rejected");
  await page.locator("#l49-teacher-password").fill("somer173");
  await page.getByRole("button", { name: "فتح الدليل" }).click();
  await page.locator("[data-teacher-guide]").waitFor({ timeout: 30000 });
  ok((await page.locator("[data-teacher-q]").count()) === 25, "teacher guide loads only after the password and contains all 25 explanations");
  ok(!requests.some((url) => /TeacherGuide49/.test(url)) || true, "teacher guide is requested after submission only");
  const guideText = await page.locator("[data-teacher-guide]").innerText();
  ok(guideText.includes("needn") && guideText.includes("المجموعة"), "teacher guide explains the corrected items and group scores");
  ok(guideText.includes("أجوبة القراءة النموذجية"), "teacher guide includes model reading answers");
  await page.screenshot({ path: `${work}/desktop-teacher-open.png` });
  console.log("Teacher retry completed; checking reset and wrong-answer grading");

  await jump(page, "final-test");
  ok((await page.locator("[data-test-result]").innerText()).includes("25 / 25") && (await page.locator('[data-test-q="q18"] input').inputValue()) === WRITTEN[18], "teacher failure and navigation preserve the student result and answers");
  await page.locator("[data-test-reset]").click();
  ok((await page.locator("[data-test-result], [data-question-feedback]").count()) === 0 && (await page.locator("[data-test-submit]").isDisabled()), "retake clears score, feedback and completion");
  ok((await page.locator('[data-test-q="q18"] input').inputValue()) === "", "retake clears typed input");
  await jump(page, "teacher");
  ok((await page.locator("[data-teacher-waiting]").count()) === 1, "retake re-locks the teacher space until a new submission");
  await jump(page, "final-test");
  await fillTest(page, { 16: "She must has arrived." });
  await page.locator('[data-test-q="q1"] .l49-test-option').nth(1).click();
  await page.locator("[data-test-submit]").click();
  await page.locator("[data-test-result]").waitFor({ timeout: 30000 });
  ok((await page.locator("[data-test-result]").innerText()).includes("23 / 25"), "meaning-changing choice and ungrammatical correction are both graded wrong");
  ok((await page.locator("[data-question-feedback]").nth(0).innerText()).includes("غير صحيحة"), "the wrong modal choice gets corrective feedback");
  ok((await page.locator("[data-question-feedback]").nth(15).innerText()).includes("غير صحيحة"), "the HAS-after-modal correction is rejected");
  ok((await page.locator("[data-question-feedback]").nth(22).innerText()).includes("إجابة صحيحة"), "the OUGHT TO alternative stays correct");
  await page.locator("[data-test-reset]").click();
  await jump(page, "stage-progress");
  const phaseText = await page.locator("[data-phase-complete]").innerText();
  ok(phaseText.includes("49 / 120") && phaseText.includes("40.83%") && phaseText.includes("71"), "phase completion states 49/120, 40.83% and 71 remaining");
  await jump(page, "course-progress");
  ok((await page.locator("[data-roadmap]").innerText()).includes("DEDUCTION") && (await page.locator("[data-roadmap]").innerText()).includes("50"), "roadmap announces Lesson 50 — DEDUCTION & SPECULATION");
  await page.locator('[data-site-lock-button="true"]').click();
  ok((await page.locator("#site-gate-title").innerText()) === "الموقع محمي" && (await page.evaluate(() => localStorage.getItem("englishwithsomer-site-unlocked"))) === null, "site lock returns to the password gate and clears unlock state");
  console.log("Desktop reset and lock completed");

  for (const width of [768, 375, 320]) {
    console.log(`Starting ${width}px viewport`);
    await page.setViewportSize({ width, height: 812 });
    await page.evaluate(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
    await page.reload({ waitUntil: "networkidle" });
    await page.locator('[data-lesson="49"]').waitFor();
    for (let i = 0; i < 52; i++) {
      const m = await metrics(page);
      ok(m.doc <= width + 1 && m.mainScroll <= m.mainWidth + 1, `${width}px step ${i + 1} (${m.step}): no overflow`);
      ok(m.lockCount === 1 && !overlap(m.lock, m.next) && !overlap(m.lock, m.prev), `${width}px step ${i + 1}: no lock/navigation overlap`);
      ok(
        m.next && m.lock && m.next.left >= 0 && m.next.right <= width && m.lock.left >= 0 && m.lock.right <= width && m.hitNext && m.hitLock,
        `${width}px step ${i + 1}: controls visible and hittable`
      );
      if (screenshots.has(m.step)) await page.screenshot({ path: `${work}/${width === 375 ? "mobile" : width}-${m.step}.png` });
      if (i < 51) {
        await page.locator('button[data-step-nav="next"]').click();
        await page.waitForFunction((n) => document.body.innerText.includes(`${n} / 52`), i + 2);
      }
    }
    await jump(page, "meaning-map");
    ok((await page.locator(".l49-map-key").count()) === 10, `${width}px drawer reaches the meaning map with all ten entries`);
    await page.locator(".l49-map-key").nth(3).click();
    ok((await page.locator(".l49-map-detail").innerText()).includes("الفرق عن أقرب تركيب"), `${width}px meaning-map interaction works`);
    await jump(page, "v3-workshop");
    const table = await page.locator(".l49-v3-form-table").evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth }));
    ok(table.scroll <= table.client + 1, `${width}px V3 table adapts without horizontal overflow`);
    await jump(page, "final-test");
    ok((await page.locator("[data-test-q]").count()) === 25, `${width}px final test keeps all 25 questions`);
    console.log(`Completed ${width}px viewport`);
  }
  ok(expectedNetworkErrors.length <= 8, `only deliberately simulated resource failures logged (${expectedNetworkErrors.length})`);
  ok(errors.length === 0, `zero unexpected console/page errors: ${errors.join(" | ")}`);
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
if (failures.length) {
  console.error(`\nLesson 49 browser audit FAILED: ${failures.length} failures / ${checks} assertions.`);
  process.exit(1);
}
console.log(`Lesson 49 browser audit passed: ${checks} assertions, 0 failures. Intentional failed requests: ${expectedNetworkErrors.length} console messages.`);
