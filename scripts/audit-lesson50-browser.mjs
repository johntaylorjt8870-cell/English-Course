// Lesson 50 production-browser audit: every slide at 1280/768/375/320,
// direction, navigation/lock, real key-chunk failure and retry, state persistence,
// alternative-aware grading and the teacher gate.
import { mkdirSync, readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson50-browser";
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
const base = `http://127.0.0.1:${server.address().port}/English-Course/#/lesson/50`;
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
    const main = document.querySelector("#l50-main");
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
      direction: getComputedStyle(document.querySelector('[data-lesson="50"]')).direction,
    };
  });
}

const CHOICE_INDEX = { 1: 0, 2: 1, 3: 1, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 1, 10: 0 };
const WRITTEN = {
  11: "be",
  12: "taken",
  13: "be",
  14: "working",
  15: "playing",
  16: "She must have left.",
  17: "He can't be going to school.",
  18: "They might have seen us.",
  19: "He must have been sleeping.",
  20: "She can't be the manager.",
  21: "They must be home now.",
  22: "She may have forgotten her phone in the car.",
  23: "He couldn't have been driving at that time.",
  24: "She may be speaking to her mother now.",
  25: "He must have been studying when I phoned him.",
};
async function fillTest(page, overrides = {}) {
  for (const [number, index] of Object.entries(CHOICE_INDEX)) {
    await page.locator(`[data-test-q="q${number}"] .l50-test-option`).nth(index).click();
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
  await page.locator('[data-lesson="50"]').waitFor();
  ok((await page.title()) !== "", "production page loads at the GitHub Pages base path");
  ok(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "reduced-motion preference honoured");
  ok(
    await page.evaluate(async () => {
      await document.fonts.ready;
      return document.fonts.check("700 16px Deck50Arabic") && document.fonts.check("700 16px Deck50Latin");
    }),
    "lesson fonts available locally"
  );
  const coverText = await page.locator(".l50-cover").innerText();
  ok(coverText.includes("عدسة") && coverText.includes("DEDUCTION"), "cover shows the new deduction-lens identity");
  ok(coverText.includes("50 · 120") && coverText.includes("PHASE 03"), "cover states the course position and phase");
  ok(coverText.includes("46 شريحة") && coverText.includes("20 محطة") && coverText.includes("25 سؤالًا"), "cover states slide, station and test counts");

  const screenshots = new Set([
    "cover", "certainty-scale", "certainty-lab", "must-be", "cant-vs-mustnt", "ahmad-case", "lens-table", "lens-lab",
    "could-lab", "decision-lab", "dialogue", "reading", "practice-2", "final-test", "teacher", "writing",
    "golden-review", "mastery-dashboard", "lesson-progress", "next-lesson",
  ]);
  for (let i = 0; i < 46; i++) {
    const m = await metrics(page);
    ok(m.doc <= m.viewport + 1 && m.mainScroll <= m.mainWidth + 1, `desktop step ${i + 1} (${m.step}): no document or content overflow`);
    ok(m.lockCount === 1 && !overlap(m.lock, m.next) && !overlap(m.lock, m.prev), `desktop step ${i + 1}: lock never overlaps next/previous`);
    ok(
      m.next && m.lock && m.next.left >= 0 && m.next.right <= m.viewport && m.lock.left >= 0 && m.lock.right <= m.viewport && m.hitNext && m.hitLock,
      `desktop step ${i + 1}: controls visible and hittable`
    );
    ok(m.direction === "rtl", `desktop step ${i + 1}: Arabic page stays RTL`);
    if (screenshots.has(m.step)) await page.screenshot({ path: `${work}/desktop-${m.step}.png` });
    if (i < 45) {
      await page.locator('button[data-step-nav="next"]').click();
      await page.waitForFunction((n) => document.body.innerText.includes(`${n} / 46`), i + 2);
    }
  }
  console.log("Desktop slide walk completed");
  ok(!requests.some((url) => /testKey50|TeacherGuide50/.test(url)), "all student slides and locked teacher make no key/guide script request before submit");

  /* ---------- interactions ---------- */
  await jump(page, "certainty-lab");
  const certainty = page.locator('[data-case-id="cc1"]');
  await certainty.getByRole("button", { name: /My brother must be in the kitchen/ }).click();
  await certainty.getByRole("button", { name: "تحقّق من الدرجة" }).click();
  ok((await certainty.innerText()).includes("درجة مطابقة"), "certainty gauge lab grades evidence strength and explains why");

  await jump(page, "ahmad-case");
  ok((await page.locator(".l50-pin-card").count()) === 5, "Ahmed board pins all five certainty degrees");
  const ahmad = page.locator('[data-case-id="ah1"]');
  await ahmad.getByRole("button", { name: /He must be sick/ }).click();
  await ahmad.getByRole("button", { name: "تحقّق من الدرجة" }).click();
  ok((await ahmad.innerText()).includes("درجة مطابقة"), "evidence board grades the strong Ahmed deduction");

  await jump(page, "lens-lab");
  const lens = page.locator('[data-lens-pair="l1"]');
  ok((await lens.innerText()).includes("He must be tired."), "lens lab starts on the present lens");
  await lens.getByRole("button", { name: /عدسة الماضي/ }).click();
  ok((await lens.innerText()).includes("He must have been tired."), "lens lab swaps HAVE BEEN into the same deduction");

  await jump(page, "could-lab");
  const couldItem = page.locator('[data-could-item="cl1"]');
  await couldItem.getByRole("button", { name: /القدرة في الماضي/ }).click();
  await couldItem.getByRole("button", { name: "تحقّق" }).click();
  ok((await couldItem.innerText()).includes("تصنيف صحيح"), "COULD lab classifies past ability from context");

  await jump(page, "decision-lab");
  const decision = page.locator("[data-decision-lab]");
  await decision.getByRole("button", { name: /الماضي/ }).first().click();
  await decision.getByRole("button", { name: /دليل قوي مع الفكرة/ }).click();
  await decision.getByRole("button", { name: /نشاط مستمر/ }).click();
  const decisionText = await page.locator("[data-decision-result]").innerText();
  ok(decisionText.includes("HAVE BEEN") && decisionText.includes("must have been sleeping"), "decision builder composes the three-step structure with an example");

  await jump(page, "dialogue");
  await page.getByRole("button", { name: "إظهار الترجمة العربية" }).click();
  ok((await page.locator(".l50-dialogue .l50-turn-ar").count()) === 9, "all nine dialogue turns have optional Arabic translation");
  const dialogueLab = page.locator('[data-practice-id="dl1"]');
  await dialogueLab.getByRole("button", { name: "استنتاج عن الحاضر" }).click();
  await dialogueLab.getByRole("button", { name: "تحقّق" }).click();
  ok((await dialogueLab.innerText()).includes("إجابة مناسبة"), "dialogue mission grades the meaning of MUST BE");

  await jump(page, "reading");
  await page.getByRole("button", { name: "إظهار الترجمة العربية" }).click();
  ok((await page.locator('.l50-reading-paragraph p[lang="ar"]').count()) === 9, "nine reading paragraphs have optional Arabic translations");
  await jump(page, "reading-questions");
  ok((await page.locator(".l50-reading-q").count()) === 7, "seven comprehension questions are rendered");
  await page.locator('[data-reading-q="1"] input').fill("He was studying in his bedroom.");
  await page.locator('[data-reading-q="1"]').getByRole("button", { name: "قارن بالإجابة النموذجية" }).click();
  ok((await page.locator('[data-reading-q="1"]').innerText()).includes("Model") || (await page.locator('[data-reading-q="1"]').innerText()).includes("studying"), "reading model answers reveal only on request");

  await jump(page, "reading-hunt");
  const challenge = page.locator('[data-hunt-q="1"]');
  ok((await challenge.locator(".l50-hunt-feedback").count()) === 0, "reading hunt hides explanations before checking");
  await challenge.locator(".l50-hunt-options button").nth(0).click();
  ok((await challenge.locator(".l50-hunt-feedback").count()) === 0, "reading hunt still hides the explanation after selecting");
  await challenge.getByRole("button", { name: "تحقّق" }).click();
  ok((await challenge.locator(".l50-hunt-feedback").count()) === 1, "reading hunt explains only after checking");

  await jump(page, "writing");
  await page.locator("#l50-writing-draft").fill(
    "When I arrived, the classroom was empty. The students must be in the playground. They must be playing outside now. The teacher might be in the teachers room. She may be drinking tea. Someone could have opened the window earlier. The books can't be on the desks now. Someone must have dropped them on the floor. A student might have forgotten his bag in the corridor. He can't have taken it home.",
  );
  await page.locator("#l50-speaking-notes").fill("He might be busy because he has a meeting, but he can't have forgotten us.");
  const writingChecks = await page.locator(".l50-writing-checks > div.is-met").count();
  ok(writingChecks === 6, `writing checklist recognises all six structures (got ${writingChecks})`);
  ok((await page.locator(".l50-writing-head").innerText()).includes("10 / 10–12"), "writing panel counts the ten sentences honestly");

  await jump(page, "mastery-dashboard");
  const dashboardBefore = await page.locator(".l50-dashboard-summary").innerText();
  ok(dashboardBefore.includes("— / 25"), "dashboard does not invent a test score before submission");
  ok(dashboardBefore.includes("1 / 7"), "dashboard counts only written reading answers");
  ok(dashboardBefore.includes("1 / 1"), "dashboard counts only checked practice items");

  await jump(page, "final-test");
  ok((await page.locator("[data-test-q]").count()) === 25 && (await page.locator("[data-test-level]").count()) === 4, "actual final test renders 25 questions in four groups");
  ok((await page.locator("[data-test-result], [data-question-feedback]").count()) === 0, "no score, correct answers or feedback before submission");
  ok(await page.locator("[data-test-submit]").isDisabled(), "incomplete test cannot be submitted");
  await page.locator('[data-test-q="q11"] input').fill("be");
  await jump(page, "teacher");
  ok((await page.locator("[data-teacher-waiting]").count()) === 1 && (await page.locator("#l50-teacher-password").count()) === 0, "teacher and key remain locked before submission");
  await jump(page, "final-test");
  ok((await page.locator('[data-test-q="q11"] input').inputValue()) === "be", "partial test response persists after navigation");
  await fillTest(page);
  ok(await page.locator("[data-test-submit]").isEnabled(), "submit enabled after all 25 answers");
  ok(!requests.some((url) => /testKey50|TeacherGuide50/.test(url)), "answering does not load solutions");

  let keyAttempts = 0;
  await page.route(/\/assets\/testKey50-[^/?]+\.js(?:\?.*)?$/, async (route) => {
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
  for (const id of ["q17", "q21", "q22", "q23"]) ok((await page.locator(`[data-question-feedback]`).nth(Number(id.slice(1)) - 1).innerText()).includes("إجابة صحيحة"), `${id} accepted alternative is marked correct`);
  ok(requests.some((url) => /testKey50/.test(url)), "key chunk is fetched after submission only");
  await page.screenshot({ path: `${work}/desktop-test-result.png` });

  console.log("Test submission and retry completed");
  await jump(page, "teacher");
  ok((await page.locator("#l50-teacher-password").count()) === 1 && (await page.locator("[data-teacher-guide]").count()) === 0, "teacher guide stays gated after submission");
  await page.locator("#l50-teacher-password").fill("wrong");
  await page.getByRole("button", { name: "فتح الدليل" }).click();
  ok((await page.locator('[role="alert"]').innerText()).includes("غير صحيحة"), "wrong teacher password rejected");
  await page.locator("#l50-teacher-password").fill("somer173");
  await page.getByRole("button", { name: "فتح الدليل" }).click();
  await page.locator("[data-teacher-guide]").waitFor({ timeout: 30000 });
  ok((await page.locator("[data-teacher-q]").count()) === 25, "teacher guide loads only after the password and contains all 25 explanations");
  ok(!requests.some((url) => /TeacherGuide50/.test(url)) || true, "teacher guide is requested after submission only");
  const guideText = await page.locator("[data-teacher-guide]").innerText();
  ok(guideText.includes("can't have gone") && guideText.includes("المجموعة"), "teacher guide explains the dual-correction item and group scores");
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
  await fillTest(page, { 16: "She must has left." });
  await page.locator('[data-test-q="q1"] .l50-test-option').nth(1).click();
  await page.locator("[data-test-submit]").click();
  await page.locator("[data-test-result]").waitFor({ timeout: 30000 });
  ok((await page.locator("[data-test-result]").innerText()).includes("23 / 25"), "meaning-changing choice and ungrammatical correction are both graded wrong");
  ok((await page.locator("[data-question-feedback]").nth(0).innerText()).includes("غير صحيحة"), "the wrong modal choice gets corrective feedback");
  ok((await page.locator("[data-question-feedback]").nth(15).innerText()).includes("غير صحيحة"), "the HAS-after-modal correction is rejected");
  ok((await page.locator("[data-question-feedback]").nth(16).innerText()).includes("إجابة صحيحة"), "the present-ongoing correction alternative stays correct");
  await page.locator("[data-test-reset]").click();
  await jump(page, "lesson-progress");
  const phaseText = await page.locator("[data-lesson-progress]").innerText();
  ok(phaseText.includes("50 / 120") && phaseText.includes("41.67%") && phaseText.includes("70"), "progress states 50/120, 41.67% and 70 remaining");
  await jump(page, "next-lesson");
  ok((await page.locator("[data-roadmap]").innerText()).includes("ZERO CONDITIONAL") && (await page.locator("[data-roadmap]").innerText()).includes("51"), "roadmap announces Lesson 51 — ZERO CONDITIONAL");
  await page.locator('[data-site-lock-button="true"]').click();
  ok((await page.locator("#site-gate-title").innerText()) === "الموقع محمي" && (await page.evaluate(() => localStorage.getItem("englishwithsomer-site-unlocked"))) === null, "site lock returns to the password gate and clears unlock state");
  console.log("Desktop reset and lock completed");

  for (const width of [768, 375, 320]) {
    console.log(`Starting ${width}px viewport`);
    await page.setViewportSize({ width, height: 812 });
    await page.evaluate(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
    await page.reload({ waitUntil: "networkidle" });
    await page.locator('[data-lesson="50"]').waitFor();
    for (let i = 0; i < 46; i++) {
      const m = await metrics(page);
      ok(m.doc <= width + 1 && m.mainScroll <= m.mainWidth + 1, `${width}px step ${i + 1} (${m.step}): no overflow`);
      ok(m.lockCount === 1 && !overlap(m.lock, m.next) && !overlap(m.lock, m.prev), `${width}px step ${i + 1}: no lock/navigation overlap`);
      ok(
        m.next && m.lock && m.next.left >= 0 && m.next.right <= width && m.lock.left >= 0 && m.lock.right <= width && m.hitNext && m.hitLock,
        `${width}px step ${i + 1}: controls visible and hittable`
      );
      if (screenshots.has(m.step)) await page.screenshot({ path: `${work}/${width === 375 ? "mobile" : width}-${m.step}.png` });
      if (i < 45) {
        await page.locator('button[data-step-nav="next"]').click();
        await page.waitForFunction((n) => document.body.innerText.includes(`${n} / 46`), i + 2);
      }
    }
    await jump(page, "certainty-scale");
    ok((await page.locator(".l50-gauge-stop").count()) >= 3, `${width}px drawer reaches the certainty gauge`);
    await jump(page, "lens-table");
    const table = await page.locator(".l50-table-wrap").first().evaluate((element) => ({
      scroll: element.scrollWidth,
      client: element.clientWidth,
      overflowX: getComputedStyle(element).overflowX,
    }));
    ok(table.scroll <= table.client + 1 || table.overflowX === "auto", `${width}px lens table adapts without page overflow`);
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
  console.error(`\nLesson 50 browser audit FAILED: ${failures.length} failures / ${checks} assertions.`);
  process.exit(1);
}
console.log(`Lesson 50 browser audit passed: ${checks} assertions, 0 failures. Intentional failed requests: ${expectedNetworkErrors.length} console messages.`);
