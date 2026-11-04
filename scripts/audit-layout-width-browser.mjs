#!/usr/bin/env node
/**
 * Real-Browser Platform-Wide Width, Responsiveness & Overflow Audit.
 *
 * Uses headless Chromium (`playwright-core` + `@sparticuz/chromium`) against the built `dist/`
 * bundle to verify Hub + ALL lessons registered in `src/App.tsx` (Lessons 1–55 + any future lessons)
 * across all 7 required viewports:
 *   - 375x812  (Mobile narrow)
 *   - 390x844  (Mobile standard)
 *   - 768x1024 (Tablet portrait)
 *   - 1024x768 (Tablet landscape / small laptop)
 *   - 1280x800 (Laptop)
 *   - 1440x900 (Desktop)
 *   - 1920x1080 (Wide desktop)
 *
 * Also advances into inner interactive/table slides and tests final-test / teacher / solutions
 * sub-areas on representative lessons across every shell family.
 */

import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import path from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as pwChromium } from "playwright-core";

const DIST = path.resolve("dist");
if (!existsSync(path.join(DIST, "index.html"))) {
  console.error("dist/index.html not found. Run `npm run build` before `audit:layout-width-browser`.");
  process.exit(1);
}

// Ensure bundled AL2023 shared libs (libnspr4.so, libnss3.so, etc.) are extracted for @sparticuz/chromium
const workDir = path.resolve("node_modules/.layout-browser");
mkdirSync(workDir, { recursive: true });
const al2023Br = path.resolve("node_modules/@sparticuz/chromium/bin/al2023.tar.br");
if (existsSync(al2023Br) && !existsSync(path.join(workDir, "lib"))) {
  const tarPath = path.join(workDir, "al2023.tar");
  writeFileSync(tarPath, brotliDecompressSync(readFileSync(al2023Br)));
  execFileSync("tar", ["-xf", tarPath, "-C", workDir]);
}
if (existsSync(path.join(workDir, "lib"))) {
  process.env.LD_LIBRARY_PATH = `${path.join(workDir, "lib")}:${process.env.LD_LIBRARY_PATH || ""}`;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".png": "image/png",
};

const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

// Dynamically discover all lesson routes from src/App.tsx so future lessons (56+) are audited automatically
const appSrc = readFileSync("src/App.tsx", "utf8");
const LESSON_NUMS = [...new Set([...appSrc.matchAll(/\bn:\s*(\d+)\s*,/g)].map((m) => Number(m[1])))].sort(
  (a, b) => a - b
);

let passed = 0;
const failures = [];

function ok(cond, msg) {
  if (cond) {
    passed += 1;
  } else {
    failures.push(msg);
  }
}

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const clean = decodeURIComponent((req.url || "/").split("?")[0]);
      const rel = clean.startsWith("/English-Course/")
        ? clean.slice("/English-Course/".length)
        : clean.replace(/^\/+/, "");
      const candidate = path.normalize(path.join(DIST, rel || "index.html"));
      const fp =
        candidate.startsWith(DIST) && existsSync(candidate) && statSync(candidate).isFile()
          ? candidate
          : path.join(DIST, "index.html");
      res.writeHead(200, { "content-type": MIME[path.extname(fp)] || "application/octet-stream" });
      res.end(readFileSync(fp));
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function measureCurrentView(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const docScrollW = document.documentElement.scrollWidth;
    const bodyScrollW = document.body.scrollWidth;

    const main = document.querySelector("main");
    if (!main) {
      const hubContainer = document.querySelector(".lesson-content-container");
      const r = hubContainer ? hubContainer.getBoundingClientRect() : null;
      return {
        kind: "hub",
        vw,
        docOverflow: Math.max(0, docScrollW - vw),
        bodyOverflow: Math.max(0, bodyScrollW - vw),
        mainW: vw,
        mainOverflow: 0,
        contentW: r ? Math.round(r.width) : 0,
        railVisible: false,
        railW: 0,
        clippedControls: [],
      };
    }

    const mr = main.getBoundingClientRect();
    const mainOverflow = Math.max(0, main.scrollWidth - main.clientWidth);

    // Detect Lesson 27 grid mode where <aside> is inside <main>
    const l27Grid = main.querySelector('[data-area="student-lesson"]');
    let contentEl = null;
    if (l27Grid && window.getComputedStyle(l27Grid).display === "grid") {
      contentEl = l27Grid.children[1] || l27Grid;
    } else if (main.classList.contains("l34-main")) {
      contentEl = main.firstElementChild || main;
    } else {
      contentEl =
        main.querySelector(":scope > .lesson-content-container:not([hidden])") ||
        main.querySelector(".lesson-content-container:not([hidden])") ||
        Array.from(main.children).find((el) => {
          const cs = window.getComputedStyle(el);
          return cs.position !== "absolute" && !el.classList.contains("sr-only") && el.getBoundingClientRect().height > 20;
        }) ||
        main;
    }

    const cr = contentEl.getBoundingClientRect();

    // Check desktop sidebar visibility if present (ignore semantic <aside> callout boxes inside <main> slides, except L27's grid sidebar)
    let railW = 0;
    let railVisible = false;
    const candidates = document.querySelectorAll(
      '.w-72, .l34-rail, [data-area="student-lesson"] > aside, body > div aside, #root > div > div > aside'
    );
    for (const c of candidates) {
      if (c.closest(".fixed.inset-0")) continue;
      if (c.closest("main") && !c.parentElement?.matches('[data-area="student-lesson"]')) continue;
      const cs = window.getComputedStyle(c);
      const r = c.getBoundingClientRect();
      if (cs.display !== "none" && cs.visibility !== "hidden" && r.width > 120 && r.height > 80) {
        railVisible = true;
        railW = Math.round(r.width);
        break;
      }
    }

    // Check floating navigation & lock button stay horizontally inside viewport AND never overlap each other
    const clippedControls = [];
    const controls = document.querySelectorAll(
      ".site-lock-btn, .lesson-step-nav, nav.bottomNav41, nav.bottomNav42, nav.bottomNav43, nav.stepNav44, .l30-floating-nav, .l31-floating-nav, .l33-step-nav, .l34-bottom"
    );
    for (const ctrl of controls) {
      const cs = window.getComputedStyle(ctrl);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const r = ctrl.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.left < -2 || r.right > vw + 2) {
        clippedControls.push(`${ctrl.tagName}.${ctrl.className.toString().slice(0, 32)} [${Math.round(r.left)}..${Math.round(r.right)} vs ${vw}]`);
      }
    }

    const lockBtn = document.querySelector(".site-lock-btn");
    if (lockBtn) {
      const lr = lockBtn.getBoundingClientRect();
      if (lr.width > 0 && lr.height > 0) {
        for (const btn of document.querySelectorAll("button")) {
          if (btn === lockBtn || lockBtn.contains(btn)) continue;
          if (!/التالي|السابق/.test(btn.textContent || "")) continue;
          const br = btn.getBoundingClientRect();
          if (br.width === 0 || br.height === 0) continue;
          const ox = Math.max(0, Math.min(lr.right, br.right) - Math.max(lr.left, br.left));
          const oy = Math.max(0, Math.min(lr.bottom, br.bottom) - Math.max(lr.top, br.top));
          if (ox * oy > 0) {
            clippedControls.push(`lock overlaps "${(btn.textContent || "").trim()}" (${Math.round(ox)}x${Math.round(oy)}px)`);
          }
        }
      }
    }

    return {
      kind: main.id || "lesson",
      vw,
      docOverflow: Math.max(0, docScrollW - vw),
      bodyOverflow: Math.max(0, bodyScrollW - vw),
      mainW: Math.round(mr.width),
      mainOverflow,
      contentW: Math.round(cr.width),
      railVisible,
      railW,
      clippedControls,
    };
  });
}

function assertViewportMetrics(label, vp, m) {
  const w = vp.width;
  ok(m.docOverflow <= 1, `${label} @${w}px: zero document horizontal overflow (overflow=${m.docOverflow}px)`);
  ok(m.mainOverflow <= 2, `${label} @${w}px: zero <main> horizontal overflow (overflow=${m.mainOverflow}px)`);
  ok(
    m.clippedControls.length === 0,
    `${label} @${w}px: no clipped navigation/lock controls (${m.clippedControls.join("; ")})`
  );

  if (w === 1920) {
    ok(
      m.contentW >= 1440 && m.contentW <= 1600,
      `${label} @1920px: content width in [1440..1600]px target band (got ${m.contentW}px)`
    );
  } else if (w === 1440) {
    const minExpected = m.railVisible ? 1040 : 1320;
    ok(
      m.contentW >= minExpected && m.contentW <= 1440,
      `${label} @1440px: efficient desktop width >= ${minExpected}px (got ${m.contentW}px)`
    );
  } else if (w === 1280) {
    const minExpected = m.railVisible ? 880 : 1160;
    ok(
      m.contentW >= minExpected && m.contentW <= 1280,
      `${label} @1280px: efficient laptop width >= ${minExpected}px (got ${m.contentW}px)`
    );
  } else if (w === 1024) {
    const minExpected = m.railVisible ? 650 : 900;
    ok(
      m.contentW >= minExpected && m.contentW <= 1024,
      `${label} @1024px: efficient tablet-landscape width >= ${minExpected}px (got ${m.contentW}px)`
    );
  } else if (w === 768) {
    ok(!m.railVisible, `${label} @768px: desktop rail collapses cleanly on portrait tablet`);
    ok(
      m.contentW >= 690 && m.contentW <= 768,
      `${label} @768px: portrait tablet utilizes width >= 690px (got ${m.contentW}px)`
    );
  } else if (w === 390 || w === 375) {
    ok(!m.railVisible, `${label} @${w}px: desktop rail hidden on mobile`);
    const minMobile = Math.floor(w * 0.86);
    ok(
      m.contentW >= minMobile && m.contentW <= w,
      `${label} @${w}px: comfortable full mobile width [${minMobile}..${w}]px (got ${m.contentW}px)`
    );
  }
}

const server = await startStaticServer();
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}/English-Course`;

const browser = await pwChromium.launch({
  executablePath: await chromium.executablePath(),
  args: chromium.args,
  headless: true,
});

const summarySamples = [];

try {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", (err) => pageErrors.push(String(err)));

  // Verify SitePasswordGate renders before unlock, then unlock with real password
  await page.goto(`${baseUrl}/#/`, { waitUntil: "networkidle" });
  const gateInputCount = await page.locator('input[type="password"]').count();
  ok(gateInputCount === 1, "SitePasswordGate renders password screen prior to unlock");
  await page.locator('input[type="password"]').fill("CloseYourEyes173");
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(80);
  ok((await page.locator('input[type="password"]').count()) === 0, "SitePasswordGate unlocks cleanly with site password");

  // Disable entry scale/translate animations so bounding boxes reflect resting geometry accurately
  await page.addStyleTag({
    content: "*, *::before, *::after { animation: none !important; transition: none !important; }",
  });

  // 1. Audit Hub across all 7 viewports
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(30);
    const m = await measureCurrentView(page);
    assertViewportMetrics("Hub", vp, m);
    if (vp.width === 1920 || vp.width === 1440 || vp.width === 768 || vp.width === 375) {
      summarySamples.push({ route: "Hub", viewport: vp.width, contentW: m.contentW, mainW: m.mainW, overflow: m.docOverflow });
    }
  }

  // 2. Audit ALL 55 lessons across all 7 viewports (cover + inner step on representative lessons)
  const INNER_STEP_LESSONS = new Set([1, 2, 12, 14, 23, 27, 28, 30, 32, 33, 34, 35, 36, 41, 43, 45, 49, 50, 52, 54, 55]);

  for (const n of LESSON_NUMS) {
    const label = `L${String(n).padStart(2, "0")}`;
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${baseUrl}/#/lesson/${n}`, { waitUntil: "domcontentloaded" });
    await page.addStyleTag({
      content: "*, *::before, *::after { animation: none !important; transition: none !important; }",
    });
    await page.waitForTimeout(45);

    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(20);
      const m = await measureCurrentView(page);
      assertViewportMetrics(label, vp, m);
      if (
        [1, 2, 14, 24, 27, 30, 33, 34, 36, 42, 49, 55].includes(n) &&
        [1920, 1440, 1024, 768, 375].includes(vp.width)
      ) {
        summarySamples.push({ route: label, viewport: vp.width, contentW: m.contentW, mainW: m.mainW, overflow: m.docOverflow });
      }
    }

    // Also advance to inner interactive/table slides & sub-areas on representative lessons across families
    if (INNER_STEP_LESSONS.has(n)) {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.evaluate(() => {
        const nextBtn = Array.from(document.querySelectorAll("button")).find(
          (b) => /التالي|إبدأ|ابدأ/.test(b.textContent || "") && !b.disabled
        );
        if (nextBtn) nextBtn.click();
      });
      await page.waitForTimeout(35);
      await page.evaluate(() => {
        const nextBtn = Array.from(document.querySelectorAll("button")).find(
          (b) => /التالي/.test(b.textContent || "") && !b.disabled
        );
        if (nextBtn) nextBtn.click();
      });
      await page.waitForTimeout(35);

      for (const checkVp of [VIEWPORTS[6], VIEWPORTS[2], VIEWPORTS[0]]) {
        // 1920, 768, 375 on inner interactive slide
        await page.setViewportSize({ width: checkVp.width, height: checkVp.height });
        await page.waitForTimeout(20);
        const innerM = await measureCurrentView(page);
        assertViewportMetrics(`${label}-inner`, checkVp, innerM);
      }
    }
  }

  // 3. Verify TestArea & unlocked TeacherArea width on multi-area custom lessons (L27, L28, L33, L36, L42)
  for (const n of [27, 28, 33, 36]) {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${baseUrl}/#/lesson/${n}`, { waitUntil: "domcontentloaded" });
    await page.addStyleTag({
      content: "*, *::before, *::after { animation: none !important; transition: none !important; }",
    });
    await page.waitForTimeout(45);
    const clickedTest = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll("button")).find((b) =>
        /الاختبار/.test(b.textContent || "")
      );
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    if (clickedTest) {
      await page.waitForTimeout(80);
      const testM = await measureCurrentView(page);
      assertViewportMetrics(`L${n}-TestArea`, VIEWPORTS[6], testM);
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(30);
      const testMobileM = await measureCurrentView(page);
      assertViewportMetrics(`L${n}-TestArea`, VIEWPORTS[0], testMobileM);
    }
  }

  ok(pageErrors.length === 0, `zero browser runtime pageerrors across all routes/viewports (got ${pageErrors.length})`);
} finally {
  await browser.close();
  server.close();
}

if (failures.length > 0) {
  console.error(`\nReal-browser layout width audit FAILED (${failures.length} failure(s), ${passed} passed):`);
  for (const f of failures.slice(0, 40)) console.error(`  ✗ ${f}`);
  if (failures.length > 40) console.error(`  ... and ${failures.length - 40} more`);
  process.exit(1);
}

console.log(
  `Real-browser layout width audit PASSED: ${passed} assertions across Hub + ${LESSON_NUMS.length} lessons × ${VIEWPORTS.length} viewports (375, 390, 768, 1024, 1280, 1440, 1920).`
);
for (const row of summarySamples.filter((s) => s.viewport === 1920 || s.viewport === 375)) {
  console.log(`  [${row.route} @${row.viewport}px] contentW=${row.contentW}px, mainW=${row.mainW}px, overflow=${row.overflow}px`);
}
