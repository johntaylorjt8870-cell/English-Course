#!/usr/bin/env node
/**
 * Fix #5 — Batch 9 PRE/POST-CHECK (read-only measurement + screenshots).
 *
 * الغرض: قياس رموز Chrome المحسوبة للدرس 30 مقابل الدرس 1 قبل وبعد توحيد
 * الرموز الثلاثة المعتمدة (railGap / railItemPadX / activeRailBg)، وإثبات
 * أن البنود البنيوية الأربعة محفوظة كما هي. لا يفشل السكربت عند وجود فروق:
 * يقيس ويُبلغ ويكتب JSON + لقطات.
 *
 * تشغيل: npm run build && node scripts/audit-fix5-batch9-precheck.mjs --phase=before
 *        (ثم بعد التعديل والبناء) --phase=after
 * المخرجات (مجلد جديد خاص بالدفعة 9 — لا يمسّ أدلة الدفعة 8):
 *   docs/fix5-visual-batch9/precheck-{before,after}.json
 *   docs/fix5-visual-batch9/lesson{1,30}-{desktop,mobile}-{before,after}.png
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { execSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const DIST = join(ROOT, "dist");
const OUT = join(ROOT, "docs", "fix5-visual-batch9");
const BASE_URL = "/English-Course/";
const VIEWPORTS = [
  { name: "desktop-1440x900", short: "desktop", width: 1440, height: 900 },
  { name: "mobile-375x812", short: "mobile", width: 375, height: 812 },
];
const LESSONS = [1, 30];
const PHASE = (process.argv.find((a) => a.startsWith("--phase=")) ?? "--phase=before").split("=")[1];
if (!["before", "after"].includes(PHASE)) throw new Error("phase يجب أن تكون before أو after");

mkdirSync(OUT, { recursive: true });

// ===== مكتبات النظام (نفس نمط بقية التدقيقات) =====
function ensureBrowserLibs() {
  const dest = join(ROOT, "node_modules", ".runtime-audit-browser");
  const libDir = join(dest, "lib");
  if (!existsSync(libDir) || readdirSync(libDir).length === 0) {
    const tarBr = join(ROOT, "node_modules", "@sparticuz", "chromium", "bin", "al2023.tar.br");
    if (!existsSync(tarBr)) throw new Error("al2023.tar.br غير موجود");
    mkdirSync(dest, { recursive: true });
    execSync(
      `node -e "import fs from 'node:fs'; import {brotliDecompressSync} from 'node:zlib'; fs.writeFileSync('${dest}/al2023.tar', brotliDecompressSync(fs.readFileSync('${tarBr}')))\"`,
      { stdio: "inherit" }
    );
    execSync(`tar -xf ${JSON.stringify(join(dest, "al2023.tar"))} -C ${JSON.stringify(dest)}`, { stdio: "inherit" });
    try {
      unlinkSync(join(dest, "al2023.tar"));
    } catch {
      /* ignore */
    }
  }
  process.env.LD_LIBRARY_PATH = `${libDir}:${process.env.LD_LIBRARY_PATH ?? ""}`;
  process.env.FONTCONFIG_PATH ??= "/tmp/fonts";
}
ensureBrowserLibs();

// ===== static server =====
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
};
const server = createServer((req, res) => {
  try {
    const url = new URL(req.url, "http://x");
    let p = decodeURIComponent(url.pathname);
    if (p.startsWith(BASE_URL)) p = p.slice(BASE_URL.length - 1);
    if (p === "/" || p === "") p = "/index.html";
    const file = join(DIST, p);
    if (!file.startsWith(DIST) || !existsSync(file) || !statSync(file).isFile()) {
      res.writeHead(404);
      res.end("nf");
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(500);
    res.end();
  }
});
await new Promise((r) => server.listen(0, "0.0.0.0", r));
const PORT = server.address().port;
const ORIGIN = `http://127.0.0.1:${PORT}`;

// بديل محلي لخطوط Google المحجوبة بيئيًا (كما في الدفعات السابقة).
const FONT_DIR = join(ROOT, "node_modules", "@fontsource", "noto-sans-arabic", "files");
const pickFont = (needle) => {
  try {
    const f = readdirSync(FONT_DIR).find((n) => n.includes(needle) && n.endsWith(".woff2"));
    return f ? readFileSync(join(FONT_DIR, f)) : null;
  } catch {
    return null;
  }
};
const face = (family, file, weight) =>
  file ? `@font-face{font-family:"${family}";src:url(/__fonts/${file}) format("woff2");font-weight:${weight};font-display:block}` : "";
const fontFiles = new Map([
  ["ar400", pickFont("arabic-400-normal")],
  ["ar700", pickFont("arabic-700-normal")],
  ["latin400", pickFont("latin-400-normal")],
  ["latin700", pickFont("latin-700-normal")],
]);
const FONT_CSS = [
  face("Tajawal", "ar400", "400"),
  face("Tajawal", "ar700", "700"),
  face("Baloo Bhaijaan 2", "ar400", "400"),
  face("Baloo Bhaijaan 2", "ar700", "700"),
  face("Changa", "ar400", "400"),
  face("Changa", "ar700", "700"),
  face("Almarai", "ar400", "400"),
  face("Rubik", "latin400", "400"),
  face("Rubik", "latin700", "700"),
  face("Fredoka", "latin400", "400"),
  face("Fredoka", "latin700", "700"),
].join("\n");

async function launchBrowser() {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await playwright.launch({
        executablePath: await chromium.executablePath(),
        args: chromium.args,
        headless: true,
      });
    } catch (err) {
      if (attempt === 2) throw err;
    }
  }
}

/** يقيس رموز الـChrome المحسوبة فعليًا + مؤشرات بنيوية، دون أي حكم على الصحة. */
async function readSignature(page, isDesktop) {
  await page.mouse.move(0, 0);
  await page.waitForTimeout(220);
  return page.evaluate((desktop) => {
    const root = document.querySelector(".lesson-main-scroll")?.closest("div.h-screen") ?? null;
    const header = document.querySelector("header");
    const menuBtn = header?.querySelector("button[aria-label]") ?? null;
    const track = header?.querySelector(".overflow-hidden.rounded-full") ?? null;
    const trackInner = track?.firstElementChild ?? null;
    const pill = document.querySelector("div.pointer-events-auto");
    const nextBtn = pill
      ? Array.from(pill.querySelectorAll("button")).find((b) => (b.textContent || "").includes("التالي"))
      : null;
    const sig = {
      shellKind: root?.getAttribute("data-l35-shell") ?? null,
      rootClasses: root ? root.className.split(/\s+/).filter(Boolean).length : 0,
      rootBg: root ? getComputedStyle(root).backgroundColor : null,
      menuAria: menuBtn ? menuBtn.getAttribute("aria-label") : null,
      menuBorderWidth: menuBtn ? getComputedStyle(menuBtn).borderTopWidth : null,
      trackHeight: track ? getComputedStyle(track).height : null,
      trackBg: track ? getComputedStyle(track).backgroundColor : null,
      progressImage: trackInner ? getComputedStyle(trackInner).backgroundImage : null,
      pillBorderWidth: pill ? getComputedStyle(pill).borderTopWidth : null,
      pillBorderColor: pill ? getComputedStyle(pill).borderTopColor : null,
      nextBg: nextBtn ? getComputedStyle(nextBtn).backgroundColor : null,
      // مؤشرات بنيوية (وجود/غياب عناصر، ليست ألوانًا) — يجب أن تبقى كما هي في L30
      headerAreaTabs: header?.querySelectorAll("nav button").length ?? 0,
      railAreaButtons: document.querySelectorAll("aside button[aria-pressed]").length,
      headerCounterChip: header?.querySelectorAll("span.rounded-lg").length ?? 0,
      progressChipBordered: track?.closest("div.rounded-2xl") ? true : false,
      headerMobileExit: Array.from(header?.querySelectorAll("button") ?? []).some((b) =>
        (b.textContent || "").includes("خروج")
      ),
      lockHost: document.querySelector("[data-site-lock-host]")?.getAttribute("data-site-lock-host") ?? null,
      lockHostTag: document.querySelector("[data-site-lock-host]")?.className?.toString?.().slice(0, 60) ?? null,
      inlineLockHost: Boolean(document.querySelector("[data-lesson-step-nav='true']")),
      dir: document.querySelector("main") ? getComputedStyle(document.querySelector("main")).direction : null,
    };
    if (desktop) {
      const aside = document.querySelector("aside");
      const titleEl = aside?.querySelector(".font-head") ?? null;
      const headerBox = aside?.firstElementChild ?? null;
      const subEl = aside?.querySelector('[dir="ltr"].text-xs') ?? null;
      const activeBtn = aside?.querySelector("nav button") ?? null;
      const badge = activeBtn?.querySelector("span") ?? null;
      const sectionLabels = Array.from(aside?.querySelectorAll("nav > div > div:first-child") ?? []);
      Object.assign(sig, {
        railWidth: aside ? getComputedStyle(aside).width : null,
        railHeaderPadding: headerBox ? getComputedStyle(headerBox).padding : null,
        railTitleSize: titleEl ? getComputedStyle(titleEl).fontSize : null,
        railSubColor: subEl ? getComputedStyle(subEl).color : null,
        activeRailBg: activeBtn ? getComputedStyle(activeBtn).backgroundColor : null,
        activeBadgeBg: badge ? getComputedStyle(badge).backgroundColor : null,
        railGap: activeBtn ? getComputedStyle(activeBtn).columnGap : null,
        railItemPadX: activeBtn ? getComputedStyle(activeBtn).paddingInlineStart : null,
        sectionColors: [...new Set(sectionLabels.map((el) => getComputedStyle(el).color))].join(","),
      });
    }
    return sig;
  }, isDesktop);
}

const report = { generatedAt: new Date().toISOString(), phase: PHASE, viewports: {}, errors: {} };

for (const vp of VIEWPORTS) {
  report.viewports[vp.name] = {};
  report.errors[vp.name] = {};
  const errors = report.errors[vp.name];
  const browser = await launchBrowser();
  try {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    await ctx.addInitScript(() => {
      try {
        localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
      } catch {
        /* ignore */
      }
    });
    const page = await ctx.newPage();
    await page.route("**/*fonts.googleapis.com/**", (r) => r.abort());
    await page.route("**/*fonts.gstatic.com/**", (r) => r.abort());
    await page.route("**/__fonts/*", (r) => {
      const name = r.request().url().split("/__fonts/")[1] ?? "";
      const body = fontFiles.get(name);
      return body ? r.fulfill({ status: 200, contentType: "font/woff2", body }) : r.abort();
    });
    await page.route("**/__fontfix.css", (r) =>
      r.fulfill({ status: 200, contentType: "text/css; charset=utf-8", body: FONT_CSS })
    );
    page.on("console", (m) => {
      if (m.type() === "error" && !/fonts\.googleapis|fonts\.gstatic|ERR_FAILED|__fonts/.test(m.text())) {
        (errors.global ??= []).push(m.text());
      }
    });
    page.on("pageerror", (e) => (errors.global ??= []).push(`PAGEERROR: ${String(e)}`));
    page.on("requestfailed", (req) => {
      if (!/fonts\.googleapis\.com|fonts\.gstatic\.com|\/__fonts\//.test(req.url())) {
        (errors.global ??= []).push(`REQUESTFAILED: ${req.url()}`);
      }
    });

    let first = true;
    for (const n of LESSONS) {
      const scope = `L${n}`;
      await page.goto(`${ORIGIN}${BASE_URL}#/lesson/${n}`, { waitUntil: "domcontentloaded" });
      if (first) {
        await page.addStyleTag({ url: "/__fontfix.css" }).catch(() => {});
        first = false;
      }
      await page.waitForSelector(".lesson-main-scroll", { timeout: 30000 });
      await page.waitForTimeout(900);

      const bodyText = await page.locator("body").innerText();
      const sig = await readSignature(page, vp.width >= 1024);
      sig.hasErrorBoundary = /خطأ في العرض|تعذّر عرض|Something went wrong|ErrorBoundary/i.test(bodyText);
      sig.counter = (await page.locator("header span.rounded-lg").first().innerText().catch(() => "")).trim();
      sig.slideCounterAttr = (await page.locator("[data-slide-counter]").first().innerText().catch(() => "")).trim();
      // عدّاد L30 داخل الشريط العائم (بنيوي محفوظ) — يُقرأ منفصلًا للتوثيق
      sig.pillCounter = (await page.locator("div.pointer-events-auto span.rounded-lg").first().innerText().catch(() => "")).trim();
      sig.bodyLen = bodyText.length;
      report.viewports[vp.name][scope] = sig;

      await page.screenshot({
        path: join(OUT, `lesson${n}-${vp.short}-${PHASE}.png`),
        animations: "disabled",
        caret: "hide",
        timeout: 60000,
      });
      console.log(
        `✓ ${scope} ${vp.name}: rootBg=${sig.rootBg} track=${sig.trackHeight} next=${sig.nextBg} activeRail=${sig.activeRailBg ?? "n/a"} gap=${sig.railGap ?? "n/a"} padX=${sig.railItemPadX ?? "n/a"} areaTabs=${sig.headerAreaTabs} lockHost=${sig.lockHost}`
      );
    }
    await ctx.close();
  } finally {
    await browser.close();
  }
}
server.close();

// ===== ملخص الفروق مقابل الدرس 1 (تصنيف: رموز مقابل بنيوي) =====
const TOKEN_KEYS = [
  "rootBg", "menuAria", "menuBorderWidth", "trackHeight", "trackBg", "progressImage",
  "pillBorderWidth", "pillBorderColor", "nextBg", "railTitleSize", "railSubColor",
  "activeRailBg", "activeBadgeBg", "railGap", "railItemPadX", "sectionColors",
];
const summary = {};
for (const vp of VIEWPORTS) {
  const ref = report.viewports[vp.name].L1;
  const cur = report.viewports[vp.name].L30;
  const tokenDiffs = TOKEN_KEYS.filter((k) => k in ref && k in cur && ref[k] !== cur[k]);
  const structural = {
    headerAreaTabs: cur.headerAreaTabs,
    headerCounterChip: cur.headerCounterChip,
    progressChipBordered: cur.progressChipBordered,
    headerMobileExit: cur.headerMobileExit,
    pillCounter: cur.pillCounter,
    inlineLockHost: cur.inlineLockHost,
    lockHost: cur.lockHost,
  };
  summary[vp.name] = { tokenDiffs, structural };
  console.log(`\n[${vp.name}] L30 vs L1 token diffs (${tokenDiffs.length}): ${tokenDiffs.join(", ") || "NONE"}`);
  for (const k of tokenDiffs) console.log(`   ${k}: L1=${JSON.stringify(ref[k])} | L30=${JSON.stringify(cur[k])}`);
  console.log(`[${vp.name}] structural preserved: ${JSON.stringify(structural)}`);
}
report.summary = summary;

const reportFile = join(OUT, `precheck-${PHASE}.json`);
writeFileSync(reportFile, JSON.stringify(report, null, 2) + "\n");
console.log(`\n📄 ${reportFile}`);
console.log(`🖼  ${OUT}/lesson{1,30}-{desktop,mobile}-${PHASE}.png`);
