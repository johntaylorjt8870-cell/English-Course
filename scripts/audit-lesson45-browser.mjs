// ============================================================
// Real Headless Chromium verification for Lesson 45 (SHOULD & OUGHT TO)
// Tests production bundle (vite preview) on Desktop (1280x800) & Mobile (375x812):
//   - All 42 steps reachable via keyboard & buttons
//   - Zero horizontal overflow & zero Next-button vs Site-Lock overlap
//   - Lazy chunk isolation: testKey45 & TeacherGuide45 not fetched pre-submit/unlock
//   - Interactive labs, exercises, and intra-lesson state persistence
//   - Final Test pre-submit hiding, incomplete guard, rapid-click guard,
//     25/25 grading + post-submit review, and clean retake reset
// ============================================================
import { mkdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson45-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(
    `${work}/al2023.tar`,
    brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br"))
  );
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const shotDir = "/tmp/l45-visual";
mkdirSync(shotDir, { recursive: true });

let passed = 0;
const failures = [];
function ok(cond, msg) {
  if (cond) {
    passed++;
  } else {
    failures.push(msg);
    console.error(`  ✕ ${msg}`);
  }
}

function boxesOverlap(a, b) {
  if (!a || !b) return false;
  const overlapX = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
  const overlapY = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  return overlapX > 1 && overlapY > 1;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
};

async function startStaticDistServer() {
  const distRoot = join(process.cwd(), "dist");
  const server = createServer((req, res) => {
    const rawUrl = (req.url || "/").split("?")[0];
    const rel = rawUrl.startsWith("/English-Course/")
      ? rawUrl.slice("/English-Course/".length)
      : rawUrl.replace(/^\/+/, "");
    const target = normalize(join(distRoot, rel || "index.html"));
    const file =
      target.startsWith(distRoot) && existsSync(target) && statSync(target).isFile()
        ? target
        : join(distRoot, "index.html");
    const ext = extname(file).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(readFileSync(file));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const addr = server.address();
  return { server, port: addr.port };
}

const { server: previewServer, port: PORT } = await startStaticDistServer();
const URL_L45 = `http://127.0.0.1:${PORT}/English-Course/#/lesson/45`;

let browser;

try {
  const executablePath = await chromium.executablePath();
  browser = await playwright.launch({
    args: chromium.args,
    executablePath,
    headless: true,
  });

  const consoleErrors = [];
  const scriptRequests = [];

  // ==========================================================
  // 1) DESKTOP (1280x800) FULL AUDIT
  // ==========================================================
  const desktop = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  desktop.on("pageerror", (err) => consoleErrors.push(`pageerror 1280: ${err.message}`));
  desktop.on("console", (msg) => {
    if (msg.type() === "error" && !/fonts\.(googleapis|gstatic)/.test(msg.location().url || "")) {
      consoleErrors.push(`console 1280: ${msg.text()}`);
    }
  });
  desktop.on("request", (req) => {
    if (req.resourceType() === "script") scriptRequests.push(req.url());
  });

  await desktop.addInitScript(() => {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  });
  await desktop.goto(URL_L45, { waitUntil: "networkidle" });
  await desktop.locator('[data-lesson="45"]').waitFor({ timeout: 20000 });
  await desktop.addStyleTag({
    content: "*,*::before,*::after{animation:none!important;transition:none!important}",
  });

  await desktop.screenshot({ path: `${shotDir}/desktop-01-cover.png` });
  const coverPillarsSingleRow = await desktop.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("#l45-main .ltr-row div.rounded-2xl"));
    if (cards.length < 3) return false;
    const tops = cards.map((el) => Math.round(el.getBoundingClientRect().top));
    return tops.every((t) => Math.abs(t - tops[0]) <= 4);
  });
  ok(coverPillarsSingleRow, "Desktop 1280x800 Cover: all 3 formula pillars render cleanly on a single row");

  // Walk all 42 steps on desktop, checking overflow + lock/next non-overlap on every step
  let desktopOverflowSteps = 0;
  let desktopOverlapSteps = 0;

  for (let i = 0; i < 42; i++) {
    const metrics = await desktop.evaluate((idx) => {
      const docOverflow = document.documentElement.scrollWidth > window.innerWidth + 1;
      const nextBtn = document.querySelector('[data-step-nav="next"]');
      const prevBtn = document.querySelector('[data-step-nav="prev"]');
      const lockBtn = document.querySelector(".site-lock-btn");
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      };
      return {
        docOverflow,
        nextRect: rect(nextBtn),
        prevRect: rect(prevBtn),
        lockRect: rect(lockBtn),
        counter: document.body.innerText.includes(`${idx + 1} / 42`),
      };
    }, i);
    if (metrics.docOverflow) desktopOverflowSteps++;
    if (
      boxesOverlap(metrics.nextRect, metrics.lockRect) ||
      boxesOverlap(metrics.prevRect, metrics.lockRect)
    ) {
      desktopOverlapSteps++;
    }
    if (i === 5) await desktop.screenshot({ path: `${shotDir}/desktop-02-lab.png` });
    if (i === 30) await desktop.screenshot({ path: `${shotDir}/desktop-03-practice.png` });
    if (i === 39) await desktop.screenshot({ path: `${shotDir}/desktop-04-test-presubmit.png` });
    if (i === 41) await desktop.screenshot({ path: `${shotDir}/desktop-05-closing.png` });

    if (i < 41) {
      await desktop.keyboard.press("ArrowLeft");
      await desktop.waitForFunction(
        (expected) => document.body.innerText.includes(`${expected} / 42`),
        i + 2,
        { timeout: 5000 }
      );
    }
  }

  ok(desktopOverflowSteps === 0, `Desktop 1280x800: zero horizontal overflow across all 42 steps (got ${desktopOverflowSteps})`);
  ok(desktopOverlapSteps === 0, `Desktop 1280x800: zero Next/Prev vs Site-Lock overlaps across all 42 steps (got ${desktopOverlapSteps})`);

  // Verify lazy chunks were NOT fetched even after visiting step 40 (Test) and step 41 (Teacher locked)!
  ok(
    !scriptRequests.some((u) => /testKey45/i.test(u)),
    "Network security: testKey45 chunk NOT downloaded before test submission"
  );
  ok(
    !scriptRequests.some((u) => /TeacherGuide45/i.test(u)),
    "Network security: TeacherGuide45 chunk NOT downloaded while Teacher's Space is locked"
  );

  // Intra-lesson state persistence check on Practice step (Step 31 = "practice-should")
  await desktop.locator('[data-step-nav="practice-should"]').first().click();
  await desktop.waitForFunction(() => document.body.innerText.includes("31 / 42"));
  const firstChoiceOpt = desktop.locator('#l45-main button[aria-pressed="false"]').first();
  await firstChoiceOpt.click();
  // Navigate forward 2 steps then back 2 steps
  await desktop.keyboard.press("ArrowLeft");
  await desktop.keyboard.press("ArrowLeft");
  await desktop.waitForFunction(() => document.body.innerText.includes("33 / 42"));
  await desktop.keyboard.press("ArrowRight");
  await desktop.keyboard.press("ArrowRight");
  await desktop.waitForFunction(() => document.body.innerText.includes("31 / 42"));
  const stillPressed = await desktop
    .locator('#l45-main button[aria-pressed="true"]')
    .count();
  ok(stillPressed === 1, "Intra-lesson navigation preserves student exercise selection");

  // Interactive Lab & Reading Translation persistence across slide navigation
  await desktop.locator('[data-step-nav="direct-advice"]').first().click();
  await desktop.waitForFunction(() => document.body.innerText.includes("6 / 42"));
  await desktop.locator('#l45-main button[aria-pressed="false"]').first().click();
  const labSelectedTextBefore = await desktop
    .locator('#l45-main button[aria-pressed="true"]')
    .first()
    .innerText();
  await desktop.locator('[data-step-nav="reading"]').first().click();
  await desktop.waitForFunction(() => document.body.innerText.includes("36 / 42"));
  await desktop.getByRole("button", { name: /إظهار الترجمة العربية/ }).click();
  await desktop.waitForFunction(() => document.body.innerText.includes("إخفاء الترجمة المرافقة"));
  // Navigate back to Step 6 and verify lab selection persisted, then back to Step 36 and verify translation persisted
  await desktop.locator('[data-step-nav="direct-advice"]').first().click();
  await desktop.waitForFunction(() => document.body.innerText.includes("6 / 42"));
  const labSelectedTextAfter = await desktop
    .locator('#l45-main button[aria-pressed="true"]')
    .first()
    .innerText();
  ok(
    labSelectedTextAfter === labSelectedTextBefore,
    "Intra-lesson navigation preserves interactive lab state (AdviceLab45)"
  );
  await desktop.locator('[data-step-nav="reading"]').first().click();
  await desktop.waitForFunction(() => document.body.innerText.includes("36 / 42"));
  const readingTogglePersisted = await desktop.evaluate(() =>
    document.body.innerText.includes("إخفاء الترجمة المرافقة")
  );
  ok(readingTogglePersisted, "Intra-lesson navigation preserves Reading Arabic translation toggle");

  // Jump to Final Test (step index 39 -> "40 / 42")
  await desktop.locator('[data-step-nav="test-intro"]').first().click();
  await desktop.waitForFunction(() => document.body.innerText.includes("40 / 42"));

  // Pre-submit checks
  const preText = await desktop.locator("#l45-main").innerText();
  ok(!preText.includes("الإجابة النموذجية:"), "Final Test hides model answers before submission");
  ok(preText.includes("تمت الإجابة عن 0 من 25"), "Final Test starts at 0 / 25 answered");

  // Incomplete submit guard: submit button is disabled until all 25 questions are answered
  const submitDisabledInitially = await desktop.locator("[data-test-submit]").isDisabled();
  ok(submitDisabledInitially === true, "Submit button is disabled when questions remain unanswered");
  ok(
    !scriptRequests.some((u) => /testKey45/i.test(u)),
    "Unanswered state does NOT load testKey45 chunk"
  );

  // Fill all 25 questions with valid varied answers (contractions, full sentences, bilingual meaning)
  const choicePicks = {
    q1: "should",
    q2: "to",
    q3: "Should",
    q4: "sleep",
    q5: "leave",
  };
  for (const [qid, val] of Object.entries(choicePicks)) {
    await desktop
      .locator(`[data-question-id="${qid}"] button`)
      .filter({ hasText: new RegExp(`^[A-C]\\)\\s*${val}$`) })
      .click();
  }

  const textPicks = {
    q6: "shouldn't waste",
    q7: "ought",
    q8: "should've left",
    q9: "should not",
    q10: "ought to",
    q11: "She should study more",
    q12: "You ought to study harder.",
    q13: "Should I leave now?",
    q14: "He should've gone home earlier.",
    q15: "You'd better take an umbrella.",
    q16: "Should gives advice while must expresses strong obligation.",
    q17: "shouldn't نصيحة بعدم الدخول، أما mustn't فمنع بات وحظر.",
    q18: "ندم على الماضي لأنه لم يستمع إلى معلمه.",
    q19: "Reasonable expectation, not advice.",
    q20: "had better أقوى وتحمل تحذيرًا من نتيجة سلبية عند التجاهل.",
    q21: "should",
    q22: "ought to",
    q23: "should",
    q24: "shouldn't",
    q25: "should",
  };
  for (const [qid, val] of Object.entries(textPicks)) {
    const field = desktop.locator(`[data-question-id="${qid}"] input[type="text"], [data-question-id="${qid}"] textarea`);
    await field.fill(val);
  }

  // Rapid triple-click on Submit button to verify double-submit guard
  await desktop.evaluate(() => {
    const btn = document.querySelector("[data-test-submit]");
    if (btn) {
      btn.click();
      btn.click();
      btn.click();
    }
  });

  await desktop.locator("[data-test-result]").waitFor({ timeout: 8000 });
  await desktop.screenshot({ path: `${shotDir}/desktop-06-test-submitted.png` });

  const resultBanners = await desktop.locator("[data-test-result]").count();
  ok(resultBanners === 1, `Rapid submit clicks produce exactly 1 result banner (got ${resultBanners})`);

  const postText = await desktop.locator("#l45-main").innerText();
  ok(postText.includes("25 / 25") && postText.includes("100%"), "Varied linguistically valid answers score 25 / 25 (100%)");
  ok(postText.includes("الإجابة النموذجية:"), "Post-submit view reveals model answers & explanations");
  ok(
    scriptRequests.some((u) => /testKey45/i.test(u)),
    "testKey45 chunk fetched dynamically upon submission"
  );

  // Retake cleanly resets all state
  await desktop.locator("[data-test-reset]").click();
  await desktop.waitForFunction(() => !document.querySelector("[data-test-result]"));
  const afterRetakeText = await desktop.locator("#l45-main").innerText();
  ok(!afterRetakeText.includes("الإجابة النموذجية:"), "Retake hides model answers again");
  ok(afterRetakeText.includes("تمت الإجابة عن 0 من 25"), "Retake resets answered counter to 0 / 25");
  const pressedChoicesAfterRetake = await desktop
    .locator('#l45-main [data-question-id] button[aria-pressed="true"]')
    .count();
  ok(pressedChoicesAfterRetake === 0, "Retake clears all choice selections");

  // Teacher's Space unlock verification
  await desktop.locator('[data-step-nav="teacher"]').first().click();
  await desktop.waitForFunction(() => document.body.innerText.includes("41 / 42"));
  const pwInput = desktop.locator('input[aria-label="كلمة مرور فضاء المعلم"]');
  await pwInput.fill("wrongpass");
  await desktop.locator('form button[type="submit"]').click();
  ok(
    !scriptRequests.some((u) => /TeacherGuide45/i.test(u)),
    "Wrong teacher password does NOT load TeacherGuide45 chunk"
  );
  await pwInput.fill("somer173");
  await desktop.locator('form button[type="submit"]').click();
  await desktop.waitForFunction(() =>
    document.body.innerText.includes("فضاء المعلم مفتوح — مفتاح الاختبار النهائي")
  );
  ok(
    scriptRequests.some((u) => /TeacherGuide45/i.test(u)),
    "Correct teacher password dynamically loads TeacherGuide45 chunk"
  );

  // ==========================================================
  // 2) MOBILE (375x812) RESPONSIVE & OVERLAP AUDIT
  // ==========================================================
  const mobile = await browser.newPage({
    viewport: { width: 375, height: 812 },
    reducedMotion: "reduce",
  });
  mobile.on("pageerror", (err) => consoleErrors.push(`pageerror 375: ${err.message}`));
  mobile.on("console", (msg) => {
    if (msg.type() === "error" && !/fonts\.(googleapis|gstatic)/.test(msg.location().url || "")) {
      consoleErrors.push(`console 375: ${msg.text()}`);
    }
  });
  await mobile.addInitScript(() => {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  });
  await mobile.goto(URL_L45, { waitUntil: "networkidle" });
  await mobile.locator('[data-lesson="45"]').waitFor({ timeout: 20000 });
  await mobile.addStyleTag({
    content: "*,*::before,*::after{animation:none!important;transition:none!important}",
  });

  await mobile.screenshot({ path: `${shotDir}/mobile-01-cover.png` });
  const mobileCounterSingleLine = await mobile.evaluate(() => {
    const spans = Array.from(document.querySelectorAll('span[dir="ltr"]'));
    const counter = spans.find(
      (s) =>
        /^\s*\d+\s*\/\s*42\s*$/.test(s.textContent || "") &&
        s.getBoundingClientRect().width > 0
    );
    if (!counter) return false;
    return counter.getClientRects().length === 1;
  });
  ok(mobileCounterSingleLine, "Mobile 375x812 header counter stays on a single line without wrapping");

  // Test mobile drawer open & step jump
  await mobile.locator('button[aria-label="فهرس الدرس"]').click();
  await mobile.screenshot({ path: `${shotDir}/mobile-02-drawer.png` });
  await mobile.locator('[data-step-nav="compare-ought"]').last().click();
  await mobile.waitForFunction(() => document.body.innerText.includes("13 / 42"));
  await mobile.screenshot({ path: `${shotDir}/mobile-03-table.png` });

  // Return to step 1 and walk representative & dense steps on mobile checking overflow + overlap
  await mobile.keyboard.press("Home");
  await mobile.waitForFunction(() => document.body.innerText.includes("1 / 42"));

  let mobileOverflowSteps = 0;
  let mobileOverlapSteps = 0;
  for (let i = 0; i < 42; i++) {
    const m = await mobile.evaluate(() => {
      const docOverflow = document.documentElement.scrollWidth > window.innerWidth + 1;
      const nextBtn = document.querySelector('[data-step-nav="next"]');
      const prevBtn = document.querySelector('[data-step-nav="prev"]');
      const lockBtn = document.querySelector(".site-lock-btn");
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      };
      return {
        docOverflow,
        nextRect: rect(nextBtn),
        prevRect: rect(prevBtn),
        lockRect: rect(lockBtn),
      };
    });
    if (m.docOverflow) mobileOverflowSteps++;
    if (boxesOverlap(m.nextRect, m.lockRect) || boxesOverlap(m.prevRect, m.lockRect)) {
      mobileOverlapSteps++;
    }
    if (i === 39) await mobile.screenshot({ path: `${shotDir}/mobile-04-test.png` });
    if (i < 41) {
      await mobile.locator('[data-step-nav="next"]').click();
      await mobile.waitForFunction(
        (expected) => document.body.innerText.includes(`${expected} / 42`),
        i + 2,
        { timeout: 5000 }
      );
    }
  }

  ok(mobileOverflowSteps === 0, `Mobile 375x812: zero horizontal overflow across all 42 steps (got ${mobileOverflowSteps})`);
  ok(mobileOverlapSteps === 0, `Mobile 375x812: zero Next/Prev vs Site-Lock overlaps across all 42 steps (got ${mobileOverlapSteps})`);
  ok(consoleErrors.length === 0, `Zero browser console/page errors across Desktop & Mobile (${consoleErrors.join("; ")})`);
} finally {
  if (browser) await browser.close();
  previewServer.close();
}

if (failures.length > 0) {
  console.error(`\n✕ Lesson 45 Chromium audit FAILED (${failures.length} failures, ${passed} passed).`);
  process.exit(1);
}
console.log(`\n✓ Lesson 45 Chromium audit passed (${passed} assertions, Desktop 1280x800 + Mobile 375x812, 0 errors).`);
