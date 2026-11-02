// Lesson 52 production-browser audit: every slide at 1280/768/375/320,
// direction, navigation/lock, real key-chunk privacy, 25/25 submission,
// retake, teacher gate, progress and screenshots.
import { mkdirSync, readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson52-browser";
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
const site = `http://127.0.0.1:${server.address().port}/English-Course/`;
const base = `${site}#/lesson/52`;
const fresh = async (target) => {
  await target.goto("about:blank");
  await target.goto(base, { waitUntil: "networkidle" });
};
let checks = 0;
const failures = [];
const ok = (condition, message) => {
  checks++;
  if (!condition) {
    failures.push(message);
    console.error(`✕ ${message}`);
  }
};
const consoleErrors = [];
const expectedNetworkErrors = [];
let browser;

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
    const main = document.querySelector("#l52-main");
    const visible = (element) => element && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden";
    const rect = (element) => {
      if (!visible(element)) return null;
      const r = element.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    };
    const next = document.querySelector('button[data-step-nav="next"]');
    const prev = document.querySelector('button[data-step-nav="prev"]');
    const lock = [...document.querySelectorAll('[data-site-lock-button="true"]')].find(visible);
    const hit = (element) => {
      const r = element?.getBoundingClientRect();
      if (!r) return false;
      const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return Boolean(top && (top === element || element.contains(top)));
    };
    return {
      doc: document.documentElement.scrollWidth,
      viewport: innerWidth,
      mainScroll: main?.scrollWidth ?? 0,
      mainWidth: main?.clientWidth ?? 0,
      next: rect(next),
      prev: rect(prev),
      lock: rect(lock),
      lockCount: [...document.querySelectorAll('[data-site-lock-button="true"]')].filter(visible).length,
      hitNext: hit(next),
      hitLock: hit(lock),
      area: main?.querySelector("[data-area]")?.getAttribute("data-area"),
      dir: document.querySelector('[data-lesson="52"]')?.getAttribute("dir"),
      stepText: main?.querySelector("[data-area]")?.textContent?.slice(0, 40) ?? "",
    };
  });
}

async function desktopJump(page, id) {
  let nav = page.locator(`button[data-step-nav="${id}"]:visible`);
  if (!(await nav.count())) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    nav = page.locator(`button[data-step-nav="${id}"]:visible`);
  }
  await nav.first().click();
  await page.waitForTimeout(80);
}

const teacherPassword = process.env.LESSON52_TEACHER_PASSWORD ?? "";

const perfectAnswers = {
  q1: 1, q2: 2, q3: 2, q4: 0, q5: 1, q6: 1, q7: 2, q8: 0,
  q19: 0, q20: 1, q21: 0,
};
const textAnswers = {
  q9: "If he doesn't study, he will fail the test.",
  q10: "If we have enough time, we will visit the museum.",
  q11: "If she practices every day, she will improve.",
  q12: "If it doesn't stop raining, we won't go outside.",
  q13: "If you need anything, call me.",
  q14: "If she comes, I will talk to her.",
  q15: "If he doesn't work, he won't earn money.",
  q16: "If I finish early, I will help you.",
  q17: "Unless you listen, you won't understand.",
  q18: "When they arrive, we will begin.",
  q22: "If you study hard, you will achieve your goal.",
  q23: "What will you do if you lose your phone?",
  q24: "If he doesn't arrive on time, we won't wait for him.",
  q25: "Unless you practice, you won't improve.",
};

try {
  browser = await playwright.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.addInitScript(() => {
    try {
      localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
    } catch {
      /* storage unavailable */
    }
  });
  page.on("console", (message) => {
    if (message.type() === "error" && !/Failed to load resource/.test(message.text())) consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(String(error)));
  page.on("requestfailed", (request) => {
    expectedNetworkErrors.push(`${request.url()} :: ${request.failure()?.errorText}`);
  });
  const keyRequests = [];
  page.on("request", (request) => {
    const url = request.url();
    if (/testKey52|TeacherGuide52/.test(url)) keyRequests.push(url);
  });

  mkdirSync("docs/lesson52-visual", { recursive: true });

  /* ---------- every slide at four viewports ---------- */
  for (const [width, height] of [
    [1280, 900],
    [768, 900],
    [375, 812],
    [320, 720],
  ]) {
    await page.setViewportSize({ width, height });
    await fresh(page);
    await page.locator('[data-lesson="52"]').waitFor();
    await page.waitForTimeout(250);
    const total = await page.locator("[data-step-nav]").evaluateAll((nodes) =>
      new Set(nodes.map((node) => node.getAttribute("data-step-nav")).filter((id) => id && !["next", "prev"].includes(id))).size,
    );
    ok(total === 64, `${width}px: 64 slides in the rail (got ${total})`);
    const seen = new Set();
    for (let i = 0; i < total; i += 1) {
      const m = await metrics(page);
      const id = m.area;
      seen.add(id);
      ok(Boolean(id), `${width}px slide ${i + 1}: content area present`);
      ok(m.dir === "rtl", `${width}px ${id}: root keeps dir=rtl`);
      ok(m.doc <= width + 1, `${width}px ${id}: no document overflow (${m.doc} > ${width})`);
      ok(m.mainScroll <= m.mainWidth + 1, `${width}px ${id}: no horizontal overflow in main (${m.mainScroll} > ${m.mainWidth})`);
      ok(m.next && m.prev, `${width}px ${id}: next/prev controls visible`);
      if (m.next) {
        ok(m.next.left >= 0 && m.next.right <= width + 1 && m.next.bottom <= height + 1, `${width}px ${id}: next button inside viewport`);
        ok(m.hitNext, `${width}px ${id}: next button is hittable`);
      }
      ok(!overlap(m.next, m.lock), `${width}px ${id}: site lock does not overlap next`);
      if (m.lock) ok(m.hitLock, `${width}px ${id}: lock button hittable`);
      if (i < total - 1) {
        const nextButton = page.locator('button[data-step-nav="next"]');
        if (!(await nextButton.isEnabled())) {
          console.error(`DEBUG ${width}px i=${i} total=${total} area=${id} next disabled`);
          break;
        }
        await nextButton.click();
        await page.waitForTimeout(35);
      }
    }
    ok(seen.size === 64, `${width}px: every slide visited (got ${seen.size})`);
    ok(![...seen].some((id) => !id), `${width}px: no unnamed slide`);
  }

  /* ---------- mobile drawer ---------- */
  await page.setViewportSize({ width: 375, height: 812 });
  await fresh(page);
  await page.locator('[data-lesson="52"]').waitFor();
  ok(!(await page.locator('button[data-step-nav="cover"]:visible').count()), "375px: rail hidden until drawer opens");
  await page.getByRole("button", { name: "فهرس الدرس" }).click();
  await page.waitForTimeout(120);
  ok((await page.locator('button[data-step-nav="cover"]:visible').count()) > 0, "375px: drawer reveals the rail");
  await page.locator('button[data-step-nav="practice-1"]:visible').first().click();
  await page.waitForTimeout(120);
  ok((await page.locator("[data-area]").getAttribute("data-area")) === "practice-1", "375px: drawer navigates to an exercise");

  /* ---------- security + full test ---------- */
  await page.setViewportSize({ width: 1280, height: 900 });
  await fresh(page);
  await page.locator('[data-lesson="52"]').waitFor();
  keyRequests.length = 0;
  await desktopJump(page, "final-test");
  ok((await page.locator("[data-test-q]").count()) === 25, "25 test questions render");
  ok((await page.locator("[data-question-feedback]").count()) === 0, "no feedback before submit");
  ok(keyRequests.length === 0, `no key request before answering/submitting (got ${keyRequests.length})`);
  for (const [id, index] of Object.entries(perfectAnswers)) {
    await page.locator(`[data-test-q="${id}"] button`).nth(index).click();
  }
  for (const [id, value] of Object.entries(textAnswers)) {
    await page.locator(`[data-test-q="${id}"] input`).fill(value);
  }
  ok(keyRequests.length === 0, `no key request while answering (got ${keyRequests.length})`);
  const submit = page.locator("[data-test-submit]");
  ok(await submit.isEnabled(), "submit enabled after 25 answers");
  await submit.click();
  await page.locator("[data-test-score]").waitFor({ timeout: 15000 });
  const score = (await page.locator("[data-test-score]").innerText()).replace(/\s+/g, " ").trim();
  ok(score === "25 / 25", `score is 25/25 (got ${score})`);
  ok((await page.locator("[data-question-feedback]").count()) === 25, "feedback appears for all 25 after submit");
  ok(keyRequests.some((url) => /testKey52/.test(url)), "key is requested only after submission");
  ok((await page.locator("[data-test-reset]").count()) === 1, "retake control present");

  /* ---------- progress uses the real result ---------- */
  await desktopJump(page, "dashboard");
  ok((await page.locator("[data-dashboard]").innerText()).includes("25 / 25"), "dashboard shows the submitted test score");
  await desktopJump(page, "progress");
  const progressText = await page.locator("[data-area]").innerText();
  ok(progressText.includes("52 / 120") && progressText.includes("43.3%"), "curriculum progress shows 52/120 · 43.3%");
  ok(progressText.includes("68"), "remaining lessons shown as 68");

  /* ---------- teacher gate (real typing) ---------- */
  await desktopJump(page, "teacher");
  ok((await page.locator("[data-teacher-locked]").count()) === 1, "teacher area locked before password");
  await page.locator("#l52-teacher-password").fill("wrong");
  await page.locator("#l52-teacher-password").press("Enter");
  await page.waitForTimeout(120);
  ok((await page.locator('[role="alert"]').count()) === 1, "wrong teacher password is rejected");
  if (teacherPassword) {
    await page.locator("#l52-teacher-password").fill(teacherPassword);
    await page.locator("#l52-teacher-password").press("Enter");
    await page.locator("[data-teacher-guide]").waitFor({ timeout: 15000 });
    ok((await page.locator("[data-teacher-q]").count()) === 25, "teacher guide lists all 25 keys");
  } else {
    console.log("↳ set LESSON52_TEACHER_PASSWORD to exercise the positive teacher-gate case");
  }

  /* ---------- retake clears the result and re-locks the teacher ---------- */
  await desktopJump(page, "final-test");
  await page.locator("[data-test-reset]").click();
  await page.waitForTimeout(150);
  ok((await page.locator("[data-test-score]").count()) === 0, "retake clears the score");
  ok((await page.locator("[data-test-submit]").count()) === 1, "retake restores a fresh submit control");
  await desktopJump(page, "teacher");
  ok((await page.locator("[data-teacher-waiting]").count()) === 1, "teacher area re-locks after retake");

  /* ---------- ungrammatical answers are graded down with explanations ---------- */
  await desktopJump(page, "final-test");
  for (const [id, index] of Object.entries(perfectAnswers)) {
    await page.locator(`[data-test-q="${id}"] button`).nth(index).click();
  }
  const weakAnswers = { ...textAnswers, q9: "If he don't study, he will fail the test.", q14: "If she will come, I will talk to her." };
  for (const [id, value] of Object.entries(weakAnswers)) {
    await page.locator(`[data-test-q="${id}"] input`).fill(value);
  }
  await page.locator("[data-test-submit]").click();
  await page.locator("[data-test-score]").waitFor({ timeout: 15000 });
  const weakScore = (await page.locator("[data-test-score]").innerText()).replace(/\s+/g, " ").trim();
  ok(weakScore === "23 / 25", `two grammar errors score 23/25 (got ${weakScore})`);
  const q9Feedback = await page.locator('[data-test-q="q9"]').textContent();
  const q14Feedback = await page.locator('[data-test-q="q14"]').textContent();
  ok(q9Feedback.includes("doesn't study") || q9Feedback.includes("does not study"), "q9 explanation shows the corrected negative form");
  ok(q14Feedback.includes("If she comes, I will talk to her."), "q14 explanation shows the corrected present form");

  /* ---------- screenshots ---------- */
  await fresh(page);
  await page.screenshot({ path: "docs/lesson52-visual/desktop-01-cover.png" });
  for (const id of ["core-rule", "zero-first-table", "practice-1", "final-test", "progress"]) {
    await desktopJump(page, id);
    await page.screenshot({ path: `docs/lesson52-visual/desktop-${id}.png` });
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await fresh(page);
  await page.screenshot({ path: "docs/lesson52-visual/mobile-01-cover.png" });
  for (const id of ["core-rule", "practice-1"]) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    await page.waitForTimeout(100);
    await page.locator(`button[data-step-nav="${id}"]:visible`).first().click();
    await page.waitForTimeout(100);
    await page.screenshot({ path: `docs/lesson52-visual/mobile-${id}.png` });
  }

  ok(consoleErrors.length === 0, `no console errors (got ${consoleErrors.length}: ${consoleErrors.slice(0, 3).join(" | ")})`);
  const unexpected = expectedNetworkErrors.filter((entry) => !/ERR_ABORTED|ERR_CONNECTION_CLOSED|ERR_FAILED/.test(entry));
  ok(unexpected.length === 0, `no unexpected failed requests (got ${unexpected.length})`);
} finally {
  await browser?.close();
  server.close();
}

console.log(`Lesson 52 browser audit: ${checks} checks, ${failures.length} failures`);
if (consoleErrors.length) console.log("console errors:", consoleErrors.slice(0, 5));
if (failures.length) process.exit(1);
