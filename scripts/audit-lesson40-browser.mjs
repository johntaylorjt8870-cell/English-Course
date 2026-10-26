import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawn } from "node:child_process";
import { brotliDecompressSync } from "node:zlib";
import chromium from "@sparticuz/chromium";
import { chromium as pw } from "playwright-core";
import * as esbuild from "esbuild";

const root = process.cwd();
const work = "node_modules/.browser40";
fs.mkdirSync(work, { recursive: true });

try {
  if (!fs.existsSync(`${work}/lib`)) {
    fs.writeFileSync(
      `${work}/al2023.tar`,
      brotliDecompressSync(fs.readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br"))
    );
    execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
  }
} catch {}
process.env.LD_LIBRARY_PATH = `${root}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

await esbuild.build({
  stdin: { contents: "export * from './src/lessons/lesson40/data';", resolveDir: root },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: `${work}/data.mjs`,
  logLevel: "silent",
});
const { SLIDES_40 } = await import(`../${work}/data.mjs`);

const out = "docs/lesson40-visual";
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

async function ensurePreviewServer() {
  const probeUrl = "http://127.0.0.1:4173/English-Course/";
  try {
    const res = await fetch(probeUrl);
    if (res.ok) return null;
  } catch {}

  const proc = spawn("npx", ["vite", "preview", "--host", "127.0.0.1", "--port", "4173", "--strictPort"], {
    cwd: root,
    stdio: "ignore",
  });
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 250));
    try {
      const res = await fetch(probeUrl);
      if (res.ok) return proc;
    } catch {}
  }
  proc.kill("SIGTERM");
  throw new Error("vite preview failed to start on 127.0.0.1:4173");
}

const serverProc = await ensurePreviewServer();
const browser = await pw.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true,
});

const report = {
  date: new Date().toISOString(),
  steps: SLIDES_40.length,
  viewports: [],
  checks: [],
  errors: [],
  consoleMessages: [],
  answerModuleNetwork: [],
};

const check = (ok, message) => {
  report.checks.push({ pass: Boolean(ok), message });
  if (!ok) console.error("FAIL:", message);
};

async function measureNavLockNonOverlap(page) {
  return page.evaluate(() => {
    const lockBtns = [...document.querySelectorAll(".site-lock-btn")].filter((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
    });
    const navButtons = [...document.querySelectorAll('[data-lesson-step-nav="true"] button, button')].filter((el) => {
      if (el.classList.contains("site-lock-btn")) return false;
      const txt = el.textContent || "";
      if (!/التالي|السابق|تسليم الاختبار|عرض الحلول|فتح مساحة المعلم/.test(txt)) return false;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
    });
    let overlaps = 0;
    for (const lb of lockBtns) {
      const a = lb.getBoundingClientRect();
      for (const nb of navButtons) {
        const b = nb.getBoundingClientRect();
        const xOverlap = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const yOverlap = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (xOverlap > 1 && yOverlap > 1) overlaps++;
      }
    }
    return { visibleLockCount: lockBtns.length, overlaps };
  });
}

async function measureContrastViolations(page) {
  return page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const parseColor = (str) => {
      if (!str || str === "transparent" || str === "rgba(0, 0, 0, 0)") return null;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = str;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      if (d[3] === 0) return null;
      return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
    };
    const blend = (fg, bg) => {
      const a = fg.a + bg.a * (1 - fg.a);
      if (a === 0) return { r: 255, g: 255, b: 255, a: 1 };
      return {
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
        a,
      };
    };
    const lum = ({ r, g, b }) => {
      const f = (v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const getBg = (el) => {
      const layers = [];
      let cur = el;
      while (cur && cur.nodeType === 1) {
        const bg = parseColor(getComputedStyle(cur).backgroundColor);
        if (bg && bg.a > 0) layers.push(bg);
        cur = cur.parentElement;
      }
      let out = { r: 244, g: 247, b: 245, a: 1 };
      for (let i = layers.length - 1; i >= 0; i--) out = blend(layers[i], out);
      return out;
    };

    const issues = [];
    const surfaces = document.querySelectorAll(".tcc40 main, .tcc40 aside, .tcc40 header");
    if (!surfaces.length) return issues;
    for (const rootEl of surfaces) {
      const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const txt = (node.nodeValue || "").trim();
        if (!txt) continue;
        const el = node.parentElement;
        if (!el || el.closest("[disabled], [aria-disabled='true'], [aria-hidden='true'], option")) continue;
        let effOpacity = 1;
        for (let anc = el; anc && anc.nodeType === 1; anc = anc.parentElement) {
          effOpacity *= parseFloat(getComputedStyle(anc).opacity || "1");
        }
        const rect = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (rect.width === 0 || rect.height === 0 || cs.visibility === "hidden" || cs.display === "none" || effOpacity < 0.5) continue;
        const fgRaw = parseColor(cs.color);
        if (!fgRaw) continue;
        const bg = getBg(el);
        const fg = blend(fgRaw, bg);
        const l1 = lum(fg);
        const l2 = lum(bg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const size = parseFloat(cs.fontSize);
        const bold = parseInt(cs.fontWeight, 10) >= 700;
        const minRatio = size >= 24 || (size >= 18.66 && bold) ? 3.0 : 4.5;
        if (ratio + 0.05 < minRatio) {
          issues.push(`${txt.slice(0, 28)} (${ratio.toFixed(2)}:1 < ${minRatio}:1)`);
        }
      }
    }
    return issues.slice(0, 5);
  });
}

const screenshotIds = new Set(["cover-01", "s02-01", "s09-01", "s15-01", "s17-02", "s23-02", "s27-02", "s29-02"]);

try {
  // Single page reused across viewports so @sparticuz/chromium --single-process never exits early
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  let currentViewportLabel = "1280";
  const requests = [];
  let loadStage = "lesson-learning";

  page.on("pageerror", (e) => report.errors.push(`${currentViewportLabel}: ${e.message}`));
  page.on("console", (msg) => {
    const txt = msg.text();
    if (msg.type() === "error") report.errors.push(`${currentViewportLabel} console.error: ${txt}`);
    if (/will return your book tomorrow|sourceAnswer|حلول المستوى الأول/i.test(txt)) {
      report.consoleMessages.push(`${currentViewportLabel} leak: ${txt}`);
    }
  });
  page.on("request", (r) => {
    requests.push({ stage: loadStage, viewport: currentViewportLabel, url: r.url() });
    if (/solutionsData40|TeacherGuide40|SolutionsArea40|testKey40|ledger40/.test(r.url())) {
      report.answerModuleNetwork.push({
        viewport: currentViewportLabel,
        stage: loadStage,
        url: path.basename(r.url()),
      });
    }
  });

  await page.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/i, (route) =>
    route.fulfill({ status: 204, body: "" })
  );
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));

  // 1. Full 54-step walk + pre-submit secrecy + post-submit grading + retake + Teacher Space at 1280x800 and 1920x1080
  for (const size of [
    { width: 1280, height: 800 },
    { width: 1920, height: 1080 },
  ]) {
    currentViewportLabel = String(size.width);
    await page.setViewportSize(size);
    loadStage = "lesson-learning";
    await page.goto("http://127.0.0.1:4173/English-Course/#/", { waitUntil: "domcontentloaded" });
    await page.goto("http://127.0.0.1:4173/English-Course/#/lesson/40", { waitUntil: "networkidle" });
    await page.locator(".tcc-step[data-step-id='cover-01']").waitFor();

    // Keyboard navigation check
    await page.locator("body").click({ position: { x: 10, y: 10 } });
    await page.keyboard.press("ArrowLeft");
    check(
      (await page.locator(".tcc-step").getAttribute("data-step-id")) === "cover-02",
      `${size.width}: ArrowLeft advances from cover-01 to cover-02`
    );
    await page.keyboard.press("ArrowRight");
    check(
      (await page.locator(".tcc-step").getAttribute("data-step-id")) === "cover-01",
      `${size.width}: ArrowRight returns from cover-02 to cover-01`
    );

    const rows = [];
    for (let i = 0; i < SLIDES_40.length; i++) {
      const slide = SLIDES_40[i];
      await page.locator("#lesson40-step-select").selectOption(String(i));
      const current = page.locator(`.tcc-step[data-step-id="${slide.id}"]`);
      await current.waitFor();

      const metrics = await current.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        const source = [...el.querySelectorAll("[data-source-unit]")];
        const controls = [...el.querySelectorAll("button,a,input,select,textarea")].filter(
          (x) => x.getBoundingClientRect().width > 0
        );
        let overlap = false;
        for (let a = 0; a < controls.length; a++) {
          for (let b = a + 1; b < controls.length; b++) {
            if (controls[a].contains(controls[b]) || controls[b].contains(controls[a])) continue;
            const x = controls[a].getBoundingClientRect();
            const y = controls[b].getBoundingClientRect();
            if (
              Math.min(x.right, y.right) - Math.max(x.left, y.left) > 2 &&
              Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top) > 2
            ) {
              overlap = true;
            }
          }
        }
        return {
          height: r.height,
          width: r.width,
          dir: s.direction,
          font: source.length ? Math.min(...source.map((x) => parseFloat(getComputedStyle(x).fontSize))) : 16,
          overflow: document.documentElement.scrollWidth > innerWidth,
          overlap,
          unreachable: controls.some((x) => {
            const b = x.getBoundingClientRect();
            return b.width > 0 && (b.right < 0 || b.left > innerWidth);
          }),
        };
      });

      rows.push({ id: slide.id, ...metrics, expandedHeight: metrics.height });
      if (screenshotIds.has(slide.id)) {
        await page.waitForTimeout(160);
        await page.screenshot({ path: `${out}/${size.width}-${slide.id}.png` });
      }
      check(!metrics.overflow, `${size.width} ${slide.id}: zero horizontal overflow`);
      check(!metrics.overlap, `${size.width} ${slide.id}: zero overlapping interactive controls`);
      check(metrics.font >= 15, `${size.width} ${slide.id}: source font size >= 15px (${metrics.font})`);
      check(metrics.dir === "rtl" && !metrics.unreachable, `${size.width} ${slide.id}: RTL and all controls reachable`);

      if (screenshotIds.has(slide.id) && size.width === 1280) {
        const contrastIssues = await measureContrastViolations(page);
        check(
          contrastIssues.length === 0,
          `${size.width} ${slide.id}: WCAG AA contrast clean (${contrastIssues.join("; ")})`
        );
      }

      if (size.width === 1280) {
        if (slide.id === "s02-01") {
          await page.getByRole("button", { name: /هل أقدم وعدًا/ }).click();
          check(
            (await page.locator('[data-lab-id="six-q-console"]').innerText()).includes("WILL"),
            "Lab A (s02-01): 6-question console updates active tense channel"
          );
        }
        if (slide.id === "s04-01") {
          await page.getByRole("tab", { name: /⑤/ }).click();
          check(
            (await page.locator('[data-lab-id="five-angles-study"]').innerText()).includes("for four hours"),
            "Lab C (s04-01): 5-angle study lab switches to Future Perfect Continuous"
          );
        }
        if (slide.id === "s09-01") {
          await page.getByRole("tab", { name: /Future Perfect Continuous/ }).click();
          check(
            (await page.locator('[data-lab-id="adam-timeline"]').innerText()).includes("will have been working"),
            "Lab E (s09-01): Adam 4:00–8:00 comparator highlights duration lens"
          );
        }
        if (slide.id === "s20-01") {
          check(
            (await page.locator('[data-source-unit="s20-reveal-0"]').count()) === 0,
            "Lab K (s20-01): formative reveal withheld before attempt"
          );
          const inputs = page.locator('[data-lab-id="practice20-fill"] input');
          const checkBtns = page.locator('[data-lab-id="practice20-fill"] button').filter({ hasText: "تحقق" });
          const count = await inputs.count();
          for (let k = 0; k < count; k++) {
            await inputs.nth(k).fill("will study");
            await checkBtns.nth(k).click();
          }
          check(
            (await page.locator('[data-source-unit="s20-reveal-0"]').count()) === 1,
            "Lab K (s20-01): formative reveal unlocks after checking all 8 items"
          );
          rows.at(-1).expandedHeight = await current.evaluate((el) => el.getBoundingClientRect().height);
        }
      }
    }

    const navLockStudent = await measureNavLockNonOverlap(page);
    check(
      navLockStudent.visibleLockCount === 1 && navLockStudent.overlaps === 0,
      `${size.width}: Student Area has 1 visible Lock Site button and 0 overlaps with Next/Prev`
    );

    const sorted = rows.map((r) => r.height).sort((a, b) => a - b);
    const pct = (p) => sorted[Math.min(sorted.length - 1, Math.ceil(p * sorted.length) - 1)];
    report.viewports.push({
      width: size.width,
      height: size.height,
      stepCount: rows.length,
      median: pct(0.5),
      p90: pct(0.9),
      maximum: Math.max(...sorted),
      overflowSteps: rows.filter((r) => r.overflow).map((r) => r.id),
      overlapSteps: rows.filter((r) => r.overlap).map((r) => r.id),
      unreachableSteps: rows.filter((r) => r.unreachable).map((r) => r.id),
      expandedPractice: rows
        .filter((r) => r.expandedHeight !== r.height)
        .map((r) => ({ id: r.id, initial: r.height, expanded: r.expandedHeight })),
    });

    // Final Exam flow on first viewport (before any deferred chunks have been fetched into browser cache)
    loadStage = "test-pre-submit";
    await page.locator('[data-area-tab="test"]:visible').first().click();
    await page.locator("#lesson40-test").waitFor();

    if (size.width === 1280) {
      check(
        !requests.some((r) => /solutionsData40|TeacherGuide40|SolutionsArea40|testKey40|ledger40/.test(r.url)),
        "1280: zero answer/key/teacher chunks requested during learning or pre-submission test"
      );
    }
    check(
      (await page.locator("[data-test-question]").count()) === 25,
      `${size.width}: Final Exam renders all 25 numbered questions`
    );
    const preSubmitHtml = await page.content();
    check(
      !/will return your book tomorrow|حلول المستوى الأول|sourceAnswer/.test(preSubmitHtml) &&
        (await page.locator("[data-test-result]").count()) === 0 &&
        (await page.locator('#lesson40-test [role="alert"]').count()) === 0,
      `${size.width}: pre-submission DOM contains zero answers, result badges, or correctness alerts`
    );
    const navLockTest = await measureNavLockNonOverlap(page);
    check(
      navLockTest.visibleLockCount === 1 && navLockTest.overlaps === 0,
      `${size.width}: Test Area Lock Site button does not overlap test controls`
    );
    await page.screenshot({ path: `${out}/${size.width}-test-pre-submit.png` });

    // Answer Q1 (A), Q9 (nuance alt), Q11 (contraction), Q16 (Arabic conceptual) and submit
    await page.locator('#exam40-q1 button[role="radio"]').first().click();
    await page.locator('#exam40-q9 input[type="text"]').fill("will finish");
    await page.locator('#exam40-q11 input[type="text"]').fill("She's going to buy a new computer.");
    await page.locator("#exam40-q16 textarea").fill("الجملة الأولى قرار لحظي والثانية خطة مسبقة.");

    loadStage = "post-test-submission";
    await page.getByRole("button", { name: /تسليم الاختبار النهائي/ }).click();
    await page.locator('[data-test-submitted="true"]').waitFor({ timeout: 15000 });

    check(
      await page.locator('#exam40-q9 input[type="text"]').isDisabled(),
      `${size.width}: submitted attempt freezes inputs against post-submit tampering`
    );
    const summaryBanner = await page.locator('[data-test-submitted="true"]').innerText();
    check(
      summaryBanner.includes("3 / 20") && summaryBanner.includes("1 / 5"),
      `${size.width}: submitted score counts 3/20 objective (including contraction & nuance alt) and 1/5 conceptual`
    );
    await page.screenshot({ path: `${out}/${size.width}-test-submitted-frozen.png` });

    // Open unlocked Solutions Area
    await page.getByRole("button", { name: /عرض الحلول التفصيلية الكاملة/ }).click();
    await page.locator("#lesson40-solutions").waitFor({ timeout: 15000 });
    check(
      (await page.locator("[data-solution-item]").count()) === 25,
      `${size.width}: unlocked SolutionsArea40 renders all 25 solution cards`
    );
    check(
      (await page.locator('[data-score-summary="40"]').innerText()).includes("3 / 20") &&
        (await page.locator('[data-score-summary="40"]').innerText()).includes("لا تُرفض آليًا"),
      `${size.width}: SolutionsArea40 displays objective match summary and non-rejection policy for Level 4`
    );
    await page.screenshot({ path: `${out}/${size.width}-solutions-unlocked.png` });

    // Verify retake resets and re-locks Solutions tab
    await page.locator('[data-area-tab="test"]:visible').first().click();
    await page.getByRole("button", { name: /بدء محاولة جديدة/ }).click();
    check(
      await page.locator('[data-area-tab="solutions"]:visible').first().isDisabled(),
      `${size.width}: starting a new attempt re-locks Solutions tab`
    );

    // Teacher Space gate check
    await page.locator('[data-area-tab="teacher"]:visible').first().click();
    await page.locator("#teacher40-password").fill("wrong-pass");
    await page.locator("form button[type='submit']").click();
    check(
      (await page.locator("#lesson40-teacher-guide").count()) === 0,
      `${size.width}: wrong teacher password keeps TeacherGuide40 unmounted`
    );
    loadStage = "teacher-password-accepted";
    await page.locator("#teacher40-password").fill("somer173");
    await page.locator("form button[type='submit']").click();
    await page.locator("#lesson40-teacher-guide").waitFor({ timeout: 15000 });
    check(
      (await page.locator('[data-conceptual-rubric="40"]').count()) === 1 &&
        (await page.locator('[data-coverage-ledger="40"]').count()) === 1,
      `${size.width}: authorized TeacherGuide40 renders conceptual rubric and 30-row coverage ledger`
    );
    await page.screenshot({ path: `${out}/${size.width}-teacher-open.png` });
  }

  // 2. Responsive verification at Desktop (1440x900), Tablet (768x900), and Mobile (375x812) + #/lesson/41 transition
  for (const size of [
    { width: 1440, height: 900, tag: "1440-desktop" },
    { width: 768, height: 900, tag: "768-tablet" },
    { width: 375, height: 812, tag: "375-mobile" },
  ]) {
    currentViewportLabel = size.tag;
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.goto("http://127.0.0.1:4173/English-Course/#/", { waitUntil: "domcontentloaded" });
    await page.goto("http://127.0.0.1:4173/English-Course/#/lesson/40", { waitUntil: "networkidle" });
    await page.locator(".tcc-step[data-step-id='cover-01']").waitFor();

    const overflowCover = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    const navLock = await measureNavLockNonOverlap(page);
    check(!overflowCover, `${size.tag}: cover has zero horizontal overflow`);
    check(
      navLock.visibleLockCount === 1 && navLock.overlaps === 0,
      `${size.tag}: Lock Site button visible and non-overlapping with Next/Prev`
    );
    await page.waitForTimeout(160);
    await page.screenshot({ path: `${out}/${size.tag}-cover.png` });

    if (size.width === 375) {
      await page.getByRole("button", { name: "فهرس الدرس" }).click();
      await page.screenshot({ path: `${out}/375-mobile-drawer.png` });
      await page.keyboard.press("Escape");

      const adamIdx = SLIDES_40.findIndex((s) => s.id === "s09-01");
      await page.locator("#lesson40-step-select").selectOption(String(adamIdx));
      await page.locator('.tcc-step[data-step-id="s09-01"]').waitFor();
      check(
        !(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)),
        "375-mobile s09-01: Adam comparator fits 375px width with zero horizontal overflow"
      );
      await page.screenshot({ path: `${out}/375-mobile-adam.png` });

      // Mobile test area check
      await page.locator('[data-area-tab="test"]:visible').first().click();
      await page.locator("#lesson40-test").waitFor();
      const mobileTestOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      const mobileTestLock = await measureNavLockNonOverlap(page);
      check(!mobileTestOverflow, "375-mobile test: Final Exam has zero horizontal overflow on 375px");
      check(
        mobileTestLock.visibleLockCount === 1 && mobileTestLock.overlaps === 0,
        "375-mobile test: Lock Site button non-overlapping on mobile test"
      );
      await page.screenshot({ path: `${out}/375-mobile-test.png` });

      // Return to lesson final step s29-02 and verify live #/lesson/41 transition
      await page.locator('[data-area-tab="lesson"]:visible').first().click();
      await page.locator("#lesson40-step-select").selectOption(String(SLIDES_40.length - 1));
      await page.locator('.tcc-step[data-step-id="s29-02"]').waitFor();
      await page.getByRole("link", { name: /الانتقال إلى الدرس 41/ }).click();
      await page.waitForFunction(() => window.location.hash === "#/lesson/41");
      await page.waitForTimeout(300);
      const l41Text = await page.locator("body").innerText();
      check(
        /Auxiliary|الأفعال المساعدة/.test(l41Text),
        "375-mobile: clicking Lesson 41 link navigates cleanly to live Lesson 41"
      );
    }
  }
} finally {
  await browser.close();
  if (serverProc) serverProc.kill("SIGTERM");
}

check(report.errors.length === 0, `zero browser runtime errors (${report.errors.join("; ")})`);
check(report.consoleMessages.length === 0, `zero console answer leaks (${report.consoleMessages.join("; ")})`);

fs.writeFileSync(`${out}/height-audit.json`, JSON.stringify(report, null, 2));
fs.writeFileSync(
  `${out}/height-audit.md`,
  `# Lesson 40 Browser Verification (Temporal Command Center)\n\nReal headless Chromium verification across 1920×1080, 1440×900, 1280×800, 768×900, and 375×812.\nChecks: **${report.checks.filter((c) => c.pass).length} passed / ${report.checks.filter((c) => !c.pass).length} failed**.\n\n| Viewport | Steps | Median Height | p90 Height | Max Height | Overflow Steps | Overlap Steps |\n|---|---:|---:|---:|---:|---:|---:|\n${report.viewports
    .map(
      (v) =>
        `| ${v.width}×${v.height} | ${v.stepCount} | ${v.median.toFixed(1)}px | ${v.p90.toFixed(1)}px | ${v.maximum.toFixed(1)}px | ${v.overflowSteps.length} | ${v.overlapSteps.length} |`
    )
    .join("\n")}\n`
);

const failed = report.checks.filter((c) => !c.pass);
console.log(
  `Browser audit: ${report.checks.length - failed.length} passed, ${failed.length} failed across 5 viewports.`
);
if (failed.length) {
  for (const f of failed.slice(0, 30)) console.error(" -", f.message);
  process.exitCode = 1;
}
