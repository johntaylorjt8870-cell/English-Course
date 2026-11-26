/** Fix #5 Batch 6: Lesson 20 (44 slides) & Lesson 21 (51 slides) desktop and mobile interactions, Lesson 1 chrome verification, and full top-level slide walk. Run after npm run build. */
import { createServer } from "node:http";
import { existsSync, readFileSync, readdirSync, statSync, mkdirSync, unlinkSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { execSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const DIST = join(ROOT, "dist");
const BASE_URL = "/English-Course/";
const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "mobile-375x812", width: 375, height: 812 },
];
const LESSONS = { 20: 44, 21: 51 }; // lesson → عدد الشرائح المتوقع

// ===== مكتبات النظام (نفس نمط audit-runtime: استخراج al2023) =====
function ensureBrowserLibs() {
  const dest = join(ROOT, "node_modules", ".runtime-audit-browser");
  const libDir = join(dest, "lib");
  if (!existsSync(libDir) || readdirSync(libDir).length === 0) {
    const tarBr = join(ROOT, "node_modules", "@sparticuz", "chromium", "bin", "al2023.tar.br");
    if (!existsSync(tarBr)) throw new Error("al2023.tar.br غير موجود");
    mkdirSync(dest, { recursive: true });
    execSync(
      `node -e "import fs from 'node:fs'; import {brotliDecompressSync} from 'node:zlib'; fs.writeFileSync('${dest}/al2023.tar', brotliDecompressSync(fs.readFileSync('${tarBr}')))"`,
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
}
ensureBrowserLibs();

// ===== خادم static لـ dist =====
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

const FONT_CSS = `@font-face{font-family:'Noto Sans Arabic';src:url('/__fonts/noto.woff2') format('woff2');font-weight:100 900;font-display:swap}`;
const notoWoff2 = (() => {
  try {
    const base = join(ROOT, "node_modules", "@fontsource", "noto-sans-arabic", "files");
    const f = readdirSync(base).find((n) => n.includes("arabic-400-normal") && n.endsWith(".woff2"));
    return f ? readFileSync(join(base, f)) : null;
  } catch {
    return null;
  }
})();

let pass = 0;
let fail = 0;
const failures = [];
function check(scope, ok, detail) {
  if (ok) {
    pass++;
    console.log(`✓ [${scope}] ${detail}`);
  } else {
    fail++;
    failures.push(`${scope}: ${detail}`);
    console.log(`✗ [${scope}] ${detail}`);
  }
}

const slideHeading = (page) =>
  page
    .locator("header div.truncate")
    .first()
    .innerText()
    .catch(() => "");

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

for (const vp of VIEWPORTS) {
  const errors = [];
  const browser = await launchBrowser();
  try {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
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
    await page.route("**/__fonts/noto.woff2", (r) =>
      notoWoff2 ? r.fulfill({ status: 200, contentType: "font/woff2", body: notoWoff2 }) : r.abort()
    );
    await page.route("**/__fontfix.css", (r) =>
      r.fulfill({ status: 200, contentType: "text/css; charset=utf-8", body: FONT_CSS })
    );
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`PAGEERROR: ${String(e)}`));
    page.on("requestfailed", (req) => {
      if (!/fonts\.googleapis\.com|fonts\.gstatic\.com|\/__fonts\/noto\.woff2/.test(req.url())) {
        errors.push(`REQUESTFAILED: ${req.url()}`);
      }
    });

    let first = true;
    const readChromeSignature = async (isDesktop) => {
      await page.mouse.move(0, 0);
      await page.waitForTimeout(220);
      return page.evaluate((desktop) => {
        const root = document.querySelector(".style-b");
        const menuBtn = document.querySelector("header button[aria-label]");
        const pill = document.querySelector("div.pointer-events-auto");
        const nextBtn = Array.from(document.querySelectorAll("div.pointer-events-auto button")).find((b) =>
          (b.textContent || "").includes("التالي")
        );
        const track = document.querySelector("header .overflow-hidden.rounded-full");
        const sig = {
          rootBg: root ? getComputedStyle(root).backgroundColor : "",
          menuAria: menuBtn ? menuBtn.getAttribute("aria-label") : "",
          menuBorderWidth: menuBtn ? getComputedStyle(menuBtn).borderTopWidth : "",
          trackHeight: track ? getComputedStyle(track).height : "",
          pillBorderWidth: pill ? getComputedStyle(pill).borderTopWidth : "",
          nextBg: nextBtn ? getComputedStyle(nextBtn).backgroundColor : "",
        };
        if (desktop) {
          const aside = document.querySelector("aside");
          const titleEl = aside?.querySelector(".font-head");
          const subEl = aside?.querySelector('[dir="ltr"].text-xs');
          const activeBtn = aside?.querySelector("nav button");
          const sectionLabels = Array.from(aside?.querySelectorAll("nav > div > div:first-child") ?? []);
          const sectionColors = [...new Set(sectionLabels.map((el) => getComputedStyle(el).color))];
          sig.railTitleSize = titleEl ? getComputedStyle(titleEl).fontSize : "";
          sig.railSubColor = subEl ? getComputedStyle(subEl).color : "";
          sig.activeRailBg = activeBtn ? getComputedStyle(activeBtn).backgroundColor : "";
          sig.railGap = activeBtn ? getComputedStyle(activeBtn).columnGap : "";
          sig.sectionColors = sectionColors.join(",");
        }
        return sig;
      }, isDesktop);
    };

    // قراءة التوقيع المرجعي الفعلي من الدرس 1 في نفس المتصفح والمقاس
    await page.goto(`${ORIGIN}${BASE_URL}#/lesson/1`, { waitUntil: "domcontentloaded" });
    if (first) {
      await page.addStyleTag({ url: "/__fontfix.css" }).catch(() => {});
      first = false;
    }
    await page.waitForSelector("header span.rounded-lg", { timeout: 25000 });
    await page.waitForTimeout(500);
    const lesson1Chrome = await readChromeSignature(vp.width >= 1024);

    for (const [lesson, total] of Object.entries(LESSONS)) {
      const scope = `L${lesson} ${vp.name}`;
      await page.goto(`${ORIGIN}${BASE_URL}#/lesson/${lesson}`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("[data-slide-counter]", { timeout: 25000 });
      await page.waitForTimeout(700);

      // 1) لا Error Boundary / لا صفحة بيضاء
      const bodyText = await page.locator("body").innerText();
      check(scope, !/خطأ في العرض|تعذّر عرض|Something went wrong|ErrorBoundary/i.test(bodyText), "لا Error Boundary مُطلَّق");
      check(scope, bodyText.length > 100, `محتوى الدرس حاضر (${bodyText.length} حرفًا)`);

      // 2) عدّاد الشرائح = سلامة المحتوى
      const counter = await page.locator("[data-slide-counter]").first().innerText();
      const nums = counter.match(/\d+/g) ?? [];
      check(scope, nums.includes(String(total)), `العدّاد يعرض ${total} شريحة (وُجد: ${counter.trim()})`);

      // 3) اتجاه الصفحة RTL + مطابقة قالب Lesson 1 المحسوب فعليًا
      const dir = await page.evaluate(() => getComputedStyle(document.querySelector("main")).direction);
      check(scope, dir === "rtl", `اتجاه main = ${dir}`);

      const curChrome = await readChromeSignature(vp.width >= 1024);
      const chromeDiffs = Object.keys(lesson1Chrome).filter((k) => curChrome[k] !== lesson1Chrome[k]);
      check(
        scope,
        chromeDiffs.length === 0,
        chromeDiffs.length === 0
          ? "رموز القالب البصري المحسوبة تطابق الدرس 1 حرفيًا (100%)"
          : `اختلاف عن الدرس 1 في: ${chromeDiffs.map((k) => `${k}: got=${curChrome[k]} vs L1=${lesson1Chrome[k]}`).join("; ")}`
      );

      // 4) زر قفل الموقع حاضر
      const lock = await page.locator("text=قفل الموقع").count();
      check(scope, lock >= 1, "زر قفل الموقع حاضر");

      // 5) التالي/السابق (مضمّنة في حاوية الشريط السفلي فقط)
      const pill = page.locator("div.pointer-events-auto");
      const t0 = await slideHeading(page);
      await pill.locator("button", { hasText: "التالي" }).first().click();
      await page.waitForTimeout(350);
      const t1 = await slideHeading(page);
      check(scope, Boolean(t1) && t1 !== t0, `التالي: شريحة تغيّرت (${(t0 || "").slice(0, 35)} → …)`);
      await pill.locator("button", { hasText: "السابق" }).first().click();
      await page.waitForTimeout(350);
      const t2 = await slideHeading(page);
      check(scope, t2 === t0, "السابق: عودة للشريحة الأولى");

      // 6) تنقّل السكة (مكتب) أو درج الجوال
      const railStep = page.locator("aside:visible button").nth(4); // [0]=خروج، [1..]=الشرائح
      const railVisible = await railStep.isVisible().catch(() => false);
      if (railVisible) {
        const label = (await railStep.innerText()).trim();
        await railStep.click();
        await page.waitForTimeout(350);
        const t3 = await slideHeading(page);
        check(scope, Boolean(t3) && t3 !== t0, `نقر السكة (${label.slice(0, 32)}) → شريحة جديدة`);
        await page.locator("aside:visible button").nth(1).click(); // عودة للأول
        await page.waitForTimeout(250);
      } else {
        const menuBtn = page.locator('button[aria-label="فهرس الدرس"]');
        check(scope, (await menuBtn.count()) === 1, "زر ☰ بعنوان «فهرس الدرس» موجود");
        await menuBtn.click();
        await page.waitForTimeout(350);
        const drawerStep = page.locator("aside:visible button").nth(4);
        check(scope, await drawerStep.isVisible().catch(() => false), "الدرج انفتح وعناصره مرئية");
        const dLabel = (await drawerStep.innerText().catch(() => "")).trim();
        await drawerStep.click();
        await page.waitForTimeout(400);
        const t4 = await slideHeading(page);
        check(scope, Boolean(t4) && t4 !== t0, `نقر بداخل الدرج (${dLabel.slice(0, 32)}) → شريحة جديدة`);
        const drawerLeft = await page.locator("aside:visible").count();
        check(scope, drawerLeft === 0, "الدرج انغلق بعد اختيار الشريحة");
      }

      // 7) تنقل لوحة المفاتيح (بما في ذلك سلوك الزر المركّز الموروث دون blur اصطناعي)
      if (railVisible) {
        const beforeFocused = await slideHeading(page);
        await page.keyboard.press("ArrowLeft");
        await page.waitForTimeout(200);
        check(scope, (await slideHeading(page)) === beforeFocused, "ArrowLeft مع تركيز زر السكة لا يتنقل (السلوك الأصلي)");
      }
      await page.locator("header div.truncate").first().click();
      const beforeKey = await slideHeading(page);
      await page.keyboard.press("ArrowLeft");
      await page.waitForTimeout(220);
      const afterKey = await slideHeading(page);
      check(scope, afterKey !== beforeKey, "ArrowLeft من الهيدر ينتقل للتالي");
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(220);
      check(scope, (await slideHeading(page)) === beforeKey, "ArrowRight من الهيدر يعود للسابق");
      await page.keyboard.press("Space");
      await page.waitForTimeout(220);
      check(scope, (await slideHeading(page)) === afterKey, "Space من الهيدر ينتقل للتالي");

      // 8) قفل الموقع ثم استعادة الجلسة لبداية الدرس
      await page.locator('[data-site-lock-button="true"]:visible').first().click();
      check(scope, await page.locator("#site-password").isVisible(), "النقر على القفل يعرض بوابة كلمة المرور");
      check(
        scope,
        await page.evaluate(() => localStorage.getItem("englishwithsomer-site-unlocked") !== "unlocked"),
        "القفل أزال حالة فتح الموقع"
      );
      await page.evaluate(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForSelector("[data-slide-counter]", { timeout: 25000 });
      await page.waitForTimeout(450);

      // 9) جولة كاملة على كل الشرائح العُليا + فحص تفاعل المختبر والاختبار النهائي
      let walked = 0;
      let labInteracted = false;
      let quizInteracted = false;
      const walkErrorsBefore = errors.length;
      for (let i = 0; i < total; i++) {
        await page.waitForTimeout(90);
        const container = page.locator(".lesson-content-container").first();
        const textLen = (await container.innerText().catch(() => "")).replace(/\s+/g, " ").trim().length;
        if (textLen > 40) walked++;
        else check(scope, false, `الشريحة ${i + 1}: محتوى غير فارغ (${textLen} حرفًا)`);

        if (!labInteracted && i >= 2 && i < total - 2) {
          const mainBtns = page.locator("main button:not([disabled])");
          if ((await mainBtns.count()) >= 2) {
            await mainBtns.nth(1).click();
            await page.waitForTimeout(60);
            const afterLen = (await container.innerText().catch(() => "")).replace(/\s+/g, " ").trim().length;
            if (afterLen > 40) labInteracted = true;
          }
        }
        if (i === total - 2) {
          const quizBtns = page.locator("main button:not([disabled])");
          if ((await quizBtns.count()) >= 2) {
            await quizBtns.first().click();
            await page.waitForTimeout(60);
            const afterQuizLen = (await container.innerText().catch(() => "")).replace(/\s+/g, " ").trim().length;
            if (afterQuizLen > 40) quizInteracted = true;
          }
        }

        if (i < total - 1) {
          const nextBtn = page.locator("div.pointer-events-auto button", { hasText: "التالي" }).first();
          await nextBtn.click();
          await page.waitForTimeout(110);
        }
      }
      const finalCounter = await page.locator("[data-slide-counter]").first().innerText();
      const finalNums = finalCounter.match(/\d+/g) ?? [];
      check(scope, walked === total, `جولة كاملة: ${walked}/${total} شريحة رُسمت غير فارغة`);
      check(scope, finalNums.length >= 2 && finalNums[0] === String(total) && finalNums[1] === String(total), `الجولة وصلت لآخر شريحة (العدّاد: ${finalCounter.trim()})`);
      check(scope, labInteracted, "تفاعل عناصر المختبر/التمارين داخل الدرس يعمل دون خطأ");
      check(scope, quizInteracted, "تفاعل أزرار الاختبار النهائي (FinalQuiz) يعمل دون خطأ");
      const walkErrors = errors.slice(walkErrorsBefore).filter(
        (e) => e.startsWith("PAGEERROR:") || e.startsWith("REQUESTFAILED:") || !/fonts\.g|ERR_FAILED|net::ERR/.test(e)
      );
      check(
        scope,
        walkErrors.length === 0,
        walkErrors.length === 0 ? "لا أخطاء أثناء الجولة الكاملة" : `أخطاء الجولة: ${walkErrors.slice(0, 2).join(" | ")}`
      );
    }

    await ctx.close();
  } finally {
    await browser.close().catch(() => {});
  }

  const real = errors.filter(
    (e) => e.startsWith("PAGEERROR:") || e.startsWith("REQUESTFAILED:") || !/fonts\.g|ERR_FAILED|net::ERR/.test(e)
  );
  check(`console ${vp.name}`, real.length === 0, real.length === 0 ? "صفر أخطاء console حقيقية" : `أخطاء: ${real.slice(0, 3).join(" | ")}`);
}

console.log(`\n===== fix5 L20/L21 interactions: ${pass} نجح · ${fail} فشل =====`);
if (fail) {
  console.log(failures.map((f) => " - " + f).join("\n"));
  process.exitCode = 1;
}
server.close();
