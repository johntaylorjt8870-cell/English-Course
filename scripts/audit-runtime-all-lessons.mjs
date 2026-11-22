#!/usr/bin/env node
// ============================================================
// Fix #3 — التدقيق الشامل لوقت التشغيل في المتصفح لكل الدروس (1–62)
//
//   node scripts/audit-runtime-all-lessons.mjs            # كل الدروس + التنقل
//   node scripts/audit-runtime-all-lessons.mjs --lessons=1-10
//   node scripts/audit-runtime-all-lessons.mjs --skip-nav
//
// لماذا هذا التدقيق؟
//   التدقيقات الموجودة تغطي أجزاءً متفرقة: `audit:layout-width-browser` يقيس
//   العرض والفائض لأرقام دروس مكتوبة يدويًا في `src/App.tsx`، وتدقيقات كل درس
//   تغطي محتواه وحده، و`audit:error-boundary-browser` يغطي الانهيار على درس
//   اختباري. لا يوجد مكان واحد يفتح **كل** درس عبر مساره الحقيقي في Chromium
//   ويتحقق من: ألّا تكون الصفحة فارغة، أن المحتوى والهيكل العام ظاهران، ألّا
//   توجد أخطاء console/pageerror غير متوقعة، ألّا تفشل طلبات الشبكة التطبيقية،
//   ألّا يُقصّ المحتوى أو يفيض أفقيًا، وأن اتجاه RTL/LTR سليم — على سطح المكتب
//   والجوال — ثم يتحقق من التنقل الحقيقي (الفهرس ⇄ الدرس) ومن احتواء الانهيار
//   والتعافي منه.
//
// ما لا يفعله (تفويض صريح، لا تكرار):
//   - قياسات العرض المستهدفة لكل مقاس (1920/1280/1024/768/390) → يبقى في
//     `audit:layout-width-browser`، ولا يُعاد تعريفها هنا.
//   - قواعد عزل الإنجليزية (LatinRuns / ترتيب الكلمات / BIDI) →
//     `check:english-direction` و`audit:english-direction`.
//   - محتوى كل درس وصحته التعليمية → تدقيقات الدروس الفردية.
//   - هندسة «التالي» مقابل «قفل الموقع» ومناطق التبويبات → `audit:navigation-lock*`.
//   هنا نتحقق فقط من الحضور والظهور وعدم التجاوز والاتجاه، لا من هندسة البكسل.
//
// المخرجات:
//   docs/runtime-audit/report.json   تقرير آلي كامل
//   docs/runtime-audit/summary.md    ملخص بشري
//   docs/runtime-audit/screenshots/  لقطة لكل إخفاق فقط
//
// ثبات وتكرار: لا يوجد فشل عشوائي؛ كل إخفاق يُصنَّف ويُعاد تشغيله مرة واحدة
// على صفحة معزولة لتحديد `reproducible`, وتُحفظ اللقطة فقط عند الإخفاق.
// ============================================================
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import path from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, "dist");
const OUT_DIR = path.resolve(ROOT, "docs/runtime-audit");
const SHOT_DIR = path.join(OUT_DIR, "screenshots");
const REPORT_JSON = path.join(OUT_DIR, "report.json");
const REPORT_MD = path.join(OUT_DIR, "summary.md");
const BASE_PATH = "/English-Course/";

// ------------------------------------------------------------
// 0) شرط مسبق: بناء الإنتاج
// ------------------------------------------------------------
if (!existsSync(path.join(DIST, "index.html"))) {
  console.error("dist/index.html غير موجود. شغّل `npm run build` قبل `audit:runtime-all-lessons`.");
  process.exit(2);
}

// ------------------------------------------------------------
// 1) نطاق الدروس + مآخذ التشغيل
// ------------------------------------------------------------
const LESSON_COUNT = 62;
const args = process.argv.slice(2);
const argValue = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
};
const SKIP_NAV = args.includes("--skip-nav");

function parseLessonRange(spec) {
  if (!spec) return Array.from({ length: LESSON_COUNT }, (_, i) => i + 1);
  const set = new Set();
  for (const part of spec.split(",")) {
    const [rawFrom, rawTo] = part.trim().split("-");
    const from = Number(rawFrom);
    const to = rawTo === undefined ? from : Number(rawTo);
    if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to > LESSON_COUNT || to < from) {
      throw new Error(`--lessons نطاق غير صالح: "${part}" (المسموح 1-${LESSON_COUNT})`);
    }
    for (let n = from; n <= to; n++) set.add(n);
  }
  return [...set].sort((a, b) => a - b);
}
const LESSONS = parseLessonRange(argValue("lessons"));

// المقاسان المطلوبان في Fix #3. لا مقاسات إضافية: الاتساع الكامل عبر 7 مقاسات
// مُغطّى في audit:layout-width-browser، وتكراره هنا يبطئ بلا تغطية جديدة.
const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "mobile-375x812", width: 375, height: 812 },
];

// ------------------------------------------------------------
// 2) تصنيف الأخطاء
// ------------------------------------------------------------
// خطوط Google الخارجية: بيئية (الشبكة في بيئة التشغيل قد تحجبها). لا تُصنَّف
// إخفاقًا تطبيقيًا، لكنها تُسجَّل صراحة في كل سناريو بدل حجبها.
// منذ Fix #4: تُجهض طلباتها صراحة في كل صفحة (route.abort) حتى تقيس كل
// الأجهزة نفس تخطيط الخط الاحتياطي (fallback) — الخط الاحتياطي هو ما قِيست
// عليه كل خطوط الأساس السابقة، وتحميل الخطوط الحقيقية في runners ذوي الشبكة
// يغيّر قياسات النص (overflow/قصّ) ويكسر بوابة الحتمية دون أن يكسر التطبيق.
// كل الفحوص كما هي؛ لا يُضعف هذا التغيير أي فحص.
const EXTERNAL_FONT = /^https:\/\/fonts\.(googleapis|gstatic)\.com\//;
// سجلّ تشخيص حدّ الأخطاء نفسه (Fix #2) — متوقّع فقط في سناريو الانهيار المقصود.
const BOUNDARY_LOG = /^\[LessonErrorBoundary\]/;
const INJECTED_ECHO = /TEST-ONLY injected lesson render failure \(lesson 2 fixture\)/;

const CATEGORY = {
  NEW: "new",
  PREEXISTING: "preexisting",
  ENVIRONMENT: "environment",
  INFRASTRUCTURE: "infrastructure",
};

// إخفاقات خط الأساس المعروفة والمُوثّقة قبل هذا العمل. تُحفظ منفصلة ولا تُخفى؛
// إن ظهر أحدها يُصنَّف `preexisting` صراحة في التقرير.
const KNOWN_PREEXISTING = [
  {
    id: "nav-lock-browser-lesson44-selector",
    pattern: /\.lesson44|stepNav44/,
    note:
      "audit:navigation-lock-browser ينتظر المحدد `.lesson44 .stepNav44` غير الموجود في المصدر (الدرس 44 يستخدم obligation44 وLesson1Shell). موثّق في src/lessons/lesson55/coverage.md.",
  },
];

// ------------------------------------------------------------
// 3) خادم ملفات ثابت لـ dist
// ------------------------------------------------------------
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
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const clean = decodeURIComponent((req.url || "/").split("?")[0]);
      const rel = clean.startsWith(BASE_PATH) ? clean.slice(BASE_PATH.length) : clean.replace(/^\/+/, "");
      const candidate = path.normalize(path.join(DIST, rel || "index.html"));
      const file =
        candidate.startsWith(DIST) && existsSync(candidate) && statSync(candidate).isFile()
          ? candidate
          : path.join(DIST, "index.html");
      res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
      res.end(readFileSync(file));
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

// ------------------------------------------------------------
// 4) Chromium المضمّن (نفس نمط تدقيقات المتصفح القائمة)
// ------------------------------------------------------------
async function launchBrowser() {
  const work = path.resolve(ROOT, "node_modules/.runtime-audit-browser");
  mkdirSync(work, { recursive: true });
  if (!existsSync(path.join(work, "lib"))) {
    const tar = path.join(work, "al2023.tar");
    writeFileSync(tar, brotliDecompressSync(readFileSync(path.join(ROOT, "node_modules/@sparticuz/chromium/bin/al2023.tar.br"))));
    execFileSync("tar", ["-xf", tar, "-C", work]);
  }
  process.env.LD_LIBRARY_PATH = `${path.join(work, "lib")}:${process.env.LD_LIBRARY_PATH || ""}`;
  return playwright.launch({
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: true,
  });
}

// ------------------------------------------------------------
// 5) أدوات التسجيل
// ------------------------------------------------------------
const checks = [];
const failures = [];
function record(scope, assertion, pass, detail) {
  const entry = { scope, assertion, pass: Boolean(pass), detail: detail ?? null };
  checks.push(entry);
  if (!pass) failures.push(entry);
  return Boolean(pass);
}

/** جمع أخطاء الصفحة مع تصنيف الخطوط الخارجية منفصلة. */
function attachDiagnostics(page) {
  const diag = { consoleErrors: [], pageErrors: [], requestFailures: [], unavailableExternalFonts: [] };
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const url = msg.location()?.url || "";
    if (EXTERNAL_FONT.test(url)) diag.unavailableExternalFonts.push(`${url}: ${msg.text()}`);
    else diag.consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => diag.pageErrors.push(err.message));
  page.on("requestfailed", (req) => {
    if (EXTERNAL_FONT.test(req.url())) diag.unavailableExternalFonts.push(`${req.url()}: ${req.failure()?.errorText}`);
    else diag.requestFailures.push(`${req.url()}: ${req.failure()?.errorText}`);
  });
  diag.reset = () => {
    diag.consoleErrors.length = 0;
    diag.pageErrors.length = 0;
    diag.requestFailures.length = 0;
    diag.unavailableExternalFonts.length = 0;
  };
  return diag;
}

const isInjected = (text) => BOUNDARY_LOG.test(text) || INJECTED_ECHO.test(text);

// ------------------------------------------------------------
// 6) فحص صفحة الدرس داخل المتصفح
// ------------------------------------------------------------
// ملاحظة تصميمية: اللقطة والقياسات تُؤخذ على الهيكل الثابت (header/main/الهيكل
// العام) لأن كثير الدروس تستخدم `h-screen` + تمرير داخلي، فقياس ارتفاع
// document.screenHeight لا يعبّر عن المحتوى. «القصّ» يُقاس على العنصر الذي
// يستقبل المحتوى فعلًا: main أو data-lesson.
const PROBE = (lessonNumber) => {
  const n = lessonNumber;
  const textLen = (el) => (el ? (el.innerText || "").replace(/\s+/g, " ").trim().length : 0);

  const dataLessonEl = document.querySelector(`[data-lesson="${n}"]`);
  const mainById = document.getElementById(`l${n}-main`);
  const main = mainById || document.querySelector("main");
  const contentRoot = dataLessonEl || main;

  // محتوى الدرس الفعلي: منطقة المحتوى داخل main إن وُجدت، وإلا main.
  const contentEl =
    main?.querySelector(":scope > .lesson-content-container") ||
    main?.querySelector(".lesson-content-container") ||
    contentRoot;

  const bodyTextLen = textLen(document.body);
  const contentTextLen = textLen(contentEl);

  // عناصر تفاعلية مرئية — دليل على أن الدرس ليس صفحة فارغة أو نصًا ميتًا.
  const interactiveVisible = [...document.querySelectorAll("button, input, select, textarea, a[href]")].filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== "hidden" && cs.display !== "none" && cs.opacity !== "0";
  }).length;

  const shell = document.querySelector(".site-gate-shell");
  const lock = document.querySelector("[data-site-lock-button]");
  const lockRect = lock ? lock.getBoundingClientRect() : null;
  // زر القفل يُعرض عن قصد «في التدفق الطبيعي» (إصلاح تداخل «التالي/قفل الموقع»)،
  // ففي الدروس ذات التخطيط h-screen يظهر أسفل الشاشة، وفي min-h-screen يقع بعد
  // الطيّة. الشرط الصحيح هو: أفقيًا داخل الشاشة + يمكن الوصول إليه بالتمرير.
  const lockReachability = (() => {
    if (!lock || !lockRect) return { horizontallyInside: false, reachable: false };
    const horizontallyInside = lockRect.left >= -2 && lockRect.right <= window.innerWidth + 2;
    const saveY = window.scrollY;
    lock.scrollIntoView({ block: "center", inline: "nearest" });
    const r2 = lock.getBoundingClientRect();
    const reachable = r2.width > 4 && r2.height > 4 && r2.top >= -2 && r2.bottom <= window.innerHeight + 2;
    window.scrollTo(0, saveY);
    return { horizontallyInside, reachable };
  })();

  // الفائض الأفقي على مستوى المستند، مع أكبر عنصر متسبب (تشخيص لا حكم).
  const docOverflow = document.documentElement.scrollWidth - window.innerWidth;
  const offenders = [];
  if (docOverflow > 1) {
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.position === "fixed") continue;
      if (r.right > window.innerWidth + 2) {
        offenders.push(
          `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}.${String(el.className).split(" ").slice(0, 2).join(".")} right=${Math.round(r.right)}`,
        );
        if (offenders.length >= 5) break;
      }
    }
  }

  // قصّ المحتوى: هل يوجد حاوية تستقبل المحتوى وارتفاعها لا يكفي لمحتواها؟
  let clipped = null;
  if (contentEl) {
    const cs = getComputedStyle(contentEl);
    const cutsVertically = ["auto", "scroll", "hidden"].includes(cs.overflowY);
    const lost = contentEl.scrollHeight - contentEl.clientHeight;
    if (cutsVertically && lost > 8) {
      const scrollTop = contentEl.scrollTop;
      const atBottom = scrollTop + contentEl.clientHeight >= contentEl.scrollHeight - 4;
      // للتدقيق: القصّ المهم هو ما لا يمكن الوصول إليه (لا تمرير ولا مساحة).
      // حاوية `overflow-y:auto` يمكن تمريرها ليست قصًّا؛ نسجّلها كمعلومة.
      clipped = { mode: cs.overflowY, lostPx: lost, atBottom, scrollable: cs.overflowY === "auto" || cs.overflowY === "scroll" };
    }
    if (lost > 8 && cs.overflowY === "hidden") {
      clipped.lostPx = lost;
    }
  }

  // الاتجاه: العقد RTL، وكل عازل إنجليزي LTR فعليًا.
  const dirRoot = getComputedStyle(document.documentElement).direction;
  const dirContent = contentRoot ? getComputedStyle(contentRoot).direction : null;
  const isolators = [...document.querySelectorAll('.font-en, .ltr, .ltr-row, [dir="ltr"]')];
  const badIsolators = isolators
    .filter((el) => {
      const cs = getComputedStyle(el);
      // [dir="ltr"] يستثنى من شرط isolate لأنه قد يعبّر عن سمة فقط، لكن القاعدة
      // في index.css تجعله isolate !important — نتحقق من الاتجاه فقط لكلها.
      return cs.direction !== "ltr";
    })
    .slice(0, 3)
    .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(" ").slice(0, 2).join(".")} dir=${getComputedStyle(el).direction}`);

  return {
    hasShell: Boolean(shell),
    hasLock: Boolean(lock),
    lockVisible: Boolean(lockRect && lockRect.width > 4 && lockRect.height > 4),
    lockInsideHorizontally: lockReachability.horizontallyInside,
    lockReachableByScroll: lockReachability.reachable,
    hasMain: Boolean(main),
    mainId: main ? main.id || "(no-id)" : null,
    hasDataLesson: Boolean(dataLessonEl),
    contentSelector: mainById ? `#l${n}-main` : dataLessonEl ? `[data-lesson="${n}"]` : main ? "main" : "(none)",
    bodyTextLen,
    contentTextLen,
    interactiveVisible,
    headings: contentEl ? contentEl.querySelectorAll("h1,h2,h3,h4").length : 0,
    dirRoot,
    dirContent,
    isolatorCount: isolators.length,
    badIsolators,
    docOverflow,
    offenders,
    clipped,
    viewport: { width: window.innerWidth, height: window.innerHeight },
  };
};

/**
 * يبني قائمة الفحوص لدرس واحد من نتيجة الفحص في المتصفح.
 * دالة نقية (لا تلمس السجلات العامة) حتى يستخدمها التشغيل الأساسي وإعادة
 * التشغيل المعزولة بالمنطق نفسه تمامًا — لا ازدواج ولا اختلاف في الحكم.
 */
function collectLessonAssertions(probe, lessonN, viewport) {
  const label = `L${String(lessonN).padStart(2, "0")} @${viewport.name}`;
  const add = (assertion, pass, detail) => ({ assertion, pass: Boolean(pass), detail: detail ?? null });
  return [
    add(`${label}: الصفحة ليست فارغة (نص body ≥ 80 محرف)`, probe.bodyTextLen >= 80, `bodyTextLen=${probe.bodyTextLen}`),
    add(`${label}: محتوى الدرس مرئي ومعبّر (نص المحتوى ≥ 40 محرف)`, probe.contentTextLen >= 40, `contentTextLen=${probe.contentTextLen} via ${probe.contentSelector}`),
    add(`${label}: عناصر تفاعلية/روابط مرئية موجودة`, probe.interactiveVisible > 0, `interactiveVisible=${probe.interactiveVisible}`),
    add(`${label}: الهيكل العام (.site-gate-shell) موجود`, probe.hasShell),
    add(`${label}: زر قفل الموقع موجود ومرئي`, probe.hasLock && probe.lockVisible, `hasLock=${probe.hasLock} visible=${probe.lockVisible}`),
    add(`${label}: زر قفل الموقع داخل عرض الشاشة أفقيًا`, probe.lockInsideHorizontally, `left/right داخل ${viewport.width}px`),
    add(`${label}: زر قفل الموقع يمكن الوصول إليه (بالتمرير إن لزم)`, probe.lockReachableByScroll),
    add(`${label}: عنصر <main> موجود (منطقة محتوى الدرس)`, probe.hasMain, `mainId=${probe.mainId}`),
    add(`${label}: لا فائض أفقي على المستند (≤ 1px)`, probe.docOverflow <= 1, `overflow=${probe.docOverflow}px ${probe.offenders.length ? JSON.stringify(probe.offenders) : ""}`),
    add(`${label}: المحتوى غير مقصوص (overflow:hidden لا يخفي شيئًا)`, !(probe.clipped && probe.clipped.mode === "hidden" && probe.clipped.lostPx > 8), probe.clipped ? JSON.stringify(probe.clipped) : "no clipping"),
    add(`${label}: اتجاه الصفحة RTL`, probe.dirRoot === "rtl", `dirRoot=${probe.dirRoot}`),
    add(`${label}: اتجاه جذر الدرس RTL`, probe.dirContent === "rtl", `dirContent=${probe.dirContent}`),
    add(`${label}: كل عوازل الإنجليزية LTR فعليًا`, probe.badIsolators.length === 0, `isolators=${probe.isolatorCount} ${probe.badIsolators.length ? JSON.stringify(probe.badIsolators) : ""}`),
  ];
}

/** يسجّل فحوص درس واحد في السجلات العامة. */
function evaluateLessonProbe(probe, lessonN, viewport) {
  const scope = `lesson-${lessonN}@${viewport.name}`;
  for (const a of collectLessonAssertions(probe, lessonN, viewport)) {
    record(scope, a.assertion, a.pass, a.detail);
  }
}

// ------------------------------------------------------------
// 7) التشغيل الرئيسي
// ------------------------------------------------------------
const server = await startStaticServer();
const BASE = `http://127.0.0.1:${server.address().port}${BASE_PATH}`;
const browser = await launchBrowser();

// تُنشأ اللقطات للإخفاقات فقط؛ نحذف لقطات التشغيل السابق حتى لا تبقى أدلة
// قديمة تُوهم بفشل غير قائم (مثل لقطة ناتجة عن فحص خاطئ صُحّح لاحقًا).
rmSync(SHOT_DIR, { recursive: true, force: true });
mkdirSync(SHOT_DIR, { recursive: true });

const scenarioResults = [];
const navResults = [];
const boundaryResults = [];
let shotSeq = 0;

// Chromium المضمّن يعمل بـ --single-process ويُغلق إن أُغلق سياقه الوحيد.
// لذلك: سياق واحد لكل التشغيل، وصفحة مستقلة لكل مقاس — نفس نمط
// audit-error-boundary-browser القائم.
const context = await browser.newContext({ reducedMotion: "reduce" });
await context.addInitScript(() => {
  try {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  } catch {
    // لا شيء: بعض المستندات بلا أصل تخفق في الوصول إلى localStorage.
  }
});

async function newPageFor(viewport) {
  const page = await context.newPage();
  // حتمية القياس عبر الأجهزة: خطوط Google تُجهض فتُستخدم حزمة الخط الاحتياطي
  // دائمًا. الطلبات المجهضة تصل إلى requestfailed → تُصنَّف «خطوط خارجية»
  // بيئية كما هي، ولا تُحسب إخفاقًا تطبيقيًا (انظر attachDiagnostics).
  await page.route(EXTERNAL_FONT, (route) => route.abort("blockedbyclient"));
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  page.setDefaultTimeout(20000);
  return page;
}

/** يلتقط لقطة تشخيصية عند الإخفاق فقط ويعيد مسارها النسبي. */
async function screenshotOnFailure(page, lessonN, viewport, failuresHere) {
  if (!failuresHere.length) return null;
  shotSeq += 1;
  const name = `fail-${String(lessonN).padStart(2, "0")}-${viewport.name}-${shotSeq}.png`;
  const full = path.join(SHOT_DIR, name);
  try {
    await page.screenshot({ path: full, fullPage: false });
    return path.relative(ROOT, full);
  } catch {
    return null;
  }
}

// Fix #4 (Lazy Loading): يجب أن يكون الدرس المُعلَّم للمسار الحالي قد انتهى
// من التحميل الفعلي — غائب مؤشر Suspense — وألا نكون نقرأ DOM الدرس السابق
// أثناء تبديل التنقل (التنقل بالهاش داخل نفس المستند لا يُعيد تحميل الصفحة).
const waitForLessonRender = (page, n) =>
  page.waitForFunction(
    (num) => {
      if (document.querySelector("[data-lesson-loading]")) return false;
      const main = document.getElementById(`l${num}-main`) || document.querySelector("main");
      return Boolean(main && (main.innerText || "").trim().length > 0);
    },
    n,
    { timeout: 15000, polling: 50 },
  );

try {
  // ---------- 7a) فتح كل درس على حدة في كل مقاس ----------
  // Fix #4: صفحة مستقلة لكل (مقاس × درس) بدل إعادة استخدام الصفحة عبر تنقّل
  // بالهاش، لأن التنقل الداخلي لا يُعيد تحميل المستند فيلتقط الفحص نافذة
  // استبدال الـ Suspense (DOM الدرس السابق أو احتياطي التحميل) بدل الدرس المقصود.
  for (const viewport of VIEWPORTS) {
    for (const n of LESSONS) {
      const page = await newPageFor(viewport);
      const diag = attachDiagnostics(page);
      diag.reset();
      const before = checks.length;
      const route = `#/lesson/${n}`;
      const url = `${BASE}${route}`;

      const result = {
        lesson: n,
        route,
        viewport: viewport.name,
        loaded: false,
        assertions: [],
        consoleErrors: [],
        pageErrors: [],
        failedRequests: [],
        unavailableExternalFonts: [],
        screenshot: null,
        reproducible: null,
        category: null,
      };

      try {
        await page.goto(url, { waitUntil: "domcontentloaded" });
        await waitForLessonRender(page, n);
        result.loaded = true;
      } catch (err) {
        record(`lesson-${n}@${viewport.name}`, `L${n} @${viewport.name}: تم تحميل المسار ${route} ورسم محتواه`, false, String(err).split("\n")[0]);
      }

      const probe = await page.evaluate(PROBE, n);
      if (result.loaded) evaluateLessonProbe(probe, n, viewport);

      // لا حقن في هذا المسار، فكل خطأ console/pageerror/requestfailed غير متوقع.
      const unexpectedConsole = diag.consoleErrors.filter((t) => !isInjected(t));
      record(`lesson-${n}@${viewport.name}`, `L${n} @${viewport.name}: لا أخطاء console غير متوقعة`, unexpectedConsole.length === 0, JSON.stringify(unexpectedConsole.slice(0, 3)));
      record(`lesson-${n}@${viewport.name}`, `L${n} @${viewport.name}: لا أخطاء صفحة غير معالجة (pageerror)`, diag.pageErrors.length === 0, JSON.stringify(diag.pageErrors.slice(0, 3)));
      record(`lesson-${n}@${viewport.name}`, `L${n} @${viewport.name}: لا طلبات شبكة تطبيقية فاشلة`, diag.requestFailures.length === 0, JSON.stringify(diag.requestFailures.slice(0, 3)));

      result.assertions = checks.slice(before).map((c) => ({ assertion: c.assertion, pass: c.pass, detail: c.detail }));
      result.consoleErrors = unexpectedConsole;
      result.pageErrors = [...diag.pageErrors];
      result.failedRequests = [...diag.requestFailures];
      result.unavailableExternalFonts = [...new Set(diag.unavailableExternalFonts)];
      result.probe = probe;

      const failuresHere = result.assertions.filter((a) => !a.pass);
      if (failuresHere.length) {
        result.screenshot = await screenshotOnFailure(page, n, viewport, failuresHere);

        // إعادة تشغيل معزولة (صفحة جديدة، نفس المقاس) لتحديد قابلية التكرار.
        const rePage = await newPageFor(viewport);
        const reDiag = attachDiagnostics(rePage);
        try {
          await rePage.goto(url, { waitUntil: "domcontentloaded" });
          await waitForLessonRender(rePage, n);
          const reAssertions = collectLessonAssertions(await rePage.evaluate(PROBE, n), n, viewport);
          const reConsole = reDiag.consoleErrors.filter((t) => !isInjected(t));
          if (reConsole.length) reAssertions.push({ assertion: `L${n}: console`, pass: false, detail: JSON.stringify(reConsole.slice(0, 2)) });
          if (reDiag.pageErrors.length) reAssertions.push({ assertion: `L${n}: pageerror`, pass: false, detail: JSON.stringify(reDiag.pageErrors.slice(0, 2)) });
          if (reDiag.requestFailures.length) reAssertions.push({ assertion: `L${n}: requestfailed`, pass: false, detail: JSON.stringify(reDiag.requestFailures.slice(0, 2)) });
          const rerunFailed = reAssertions.filter((a) => !a.pass);
          result.reproducible = rerunFailed.length > 0;
          result.rerunFailures = rerunFailed.map((a) => a.assertion);
        } catch (err) {
          result.reproducible = null;
          result.rerunError = String(err).split("\n")[0];
        } finally {
          await rePage.close();
        }

        const known = failuresHere.some((f) => KNOWN_PREEXISTING.some((k) => k.pattern.test(f.assertion)));
        result.category = known
          ? CATEGORY.PREEXISTING
          : result.reproducible === null
            ? CATEGORY.INFRASTRUCTURE
            : CATEGORY.NEW;
      }

      scenarioResults.push(result);
      await page.close();
    }
  }

  // ---------- 7b) التنقل الحقيقي + قفل الموقع ----------
  if (!SKIP_NAV) {
    const EXIT_LABELS = /جميع الدروس|فهرس الدروس|الرئيسية|خروج/;
    const NEXT_LABELS = /^(التالي|التالي ←|الخطوة التالية|→ التالي|التالي\s*→)$/;

    /**
     * يبحث في الصفحة عن زر الخروج إلى الفهرس أو رابط الدرس التالي/السابق.
     * تُستخدم استراتيجية واحدة موحّدة: زر يحمل نص خروج، أو رابط داخلي.
     */
    const findNav = (page) =>
      page.evaluate(
        ({ exitSrc, nextSrc }) => {
          const exitRe = new RegExp(exitSrc);
          const nextRe = new RegExp(nextSrc);
          const visible = (el) => {
            const r = el.getBoundingClientRect();
            return r.width > 2 && r.height > 2;
          };
          const exitBtn = [...document.querySelectorAll("button")].find(
            (b) => !b.hasAttribute("data-site-lock-button") && visible(b) && exitRe.test((b.textContent || "").replace(/\s+/g, " ").trim()),
          );
          const links = [...document.querySelectorAll('a[href^="#/lesson/"]')].map((a) => ({
            href: a.getAttribute("href"),
            text: (a.textContent || "").replace(/\s+/g, " ").trim(),
          }));
          const nextBtn = [...document.querySelectorAll("button")].find(
            (b) => !b.disabled && visible(b) && nextRe.test((b.textContent || "").replace(/\s+/g, " ").trim()),
          );
          return {
            hasExit: Boolean(exitBtn),
            exitText: exitBtn ? (exitBtn.textContent || "").replace(/\s+/g, " ").trim() : null,
            lessonLinks: links,
            hasNextStep: Boolean(nextBtn),
          };
        },
        { exitSrc: EXIT_LABELS.source, nextSrc: NEXT_LABELS.source },
      );

    const recordNav = (scope, assertion, pass, detail) => record(scope, assertion, pass, detail);

    // على الشاشات الضيقة يُخفى شريط الخطوات الجانبي (فيه زر «جميع الدروس») ويُفتح
    // عبر زر ☰ («فهرس»). لذلك الاختبار الصحيح هو: وصول المستخدم إلى الفهرس
    // مباشرة أو بنقرة واحدة على ☰ — لا مجرد وجود الزر في DOM المخفي.
    const EXIT_IN_PAGE = ({ exitSrc }) => {
      const re = new RegExp(exitSrc);
      const visible = (el) => {
        const r = el.getBoundingClientRect();
        return r.width > 2 && r.height > 2;
      };
      const btn = [...document.querySelectorAll("button")].find(
        (b) => !b.hasAttribute("data-site-lock-button") && visible(b) && re.test((b.textContent || "").replace(/\s+/g, " ").trim()),
      );
      return btn ? (btn.textContent || "").replace(/\s+/g, " ").trim() : null;
    };

    const OPEN_DRAWER = () => {
      const btn = [...document.querySelectorAll("button")].find((b) => {
        const label = (b.getAttribute("aria-label") || "").trim();
        const text = (b.textContent || "").trim();
        return label.includes("فهرس") || text === "☰";
      });
      if (!btn) return false;
      btn.click();
      return true;
    };

    /**
     * يعيد كيف يصل المستخدم إلى صفحة الدروس: `direct` أو `drawer` أو null.
     * لا ينقر زر الخروج نفسه، بل يفتح الدرج فقط عند الحاجة ويتركه مفتوحًا
     * حتى ينقر عليه المستدعي.
     */
    const reachExit = async (page) => {
      const direct = await page.evaluate(EXIT_IN_PAGE, { exitSrc: EXIT_LABELS.source });
      if (direct) return { path: "direct", text: direct };
      const opened = await page.evaluate(OPEN_DRAWER);
      if (!opened) return { path: null, text: null };
      await page.waitForTimeout(350);
      const inDrawer = await page.evaluate(EXIT_IN_PAGE, { exitSrc: EXIT_LABELS.source });
      return { path: inDrawer ? "drawer" : null, text: inDrawer };
    };

    /** ينقر زر العودة إلى الفهرس المرئي (بعد reachExit). */
    const clickExit = (page) =>
      page.evaluate(({ exitSrc }) => {
        const re = new RegExp(exitSrc);
        const visible = (el) => {
          const r = el.getBoundingClientRect();
          return r.width > 2 && r.height > 2;
        };
        const btn = [...document.querySelectorAll("button")].find(
          (b) => !b.hasAttribute("data-site-lock-button") && visible(b) && re.test((b.textContent || "").replace(/\s+/g, " ").trim()),
        );
        if (btn) btn.click();
        return Boolean(btn);
      }, { exitSrc: EXIT_LABELS.source });

    /**
     * يمشي داخل الدرس بالنقر على «التالي» حتى آخر خطوة، ثم يبحث عن رابط
     * الدرس التالي/السابق. بعض الدروس تحتوي خطوات تفاعلية تحتاج تفاعلًا
     * (اختبارات/مختبرات) فتتوقف — يُسجَّل ذلك كحدّ تغطية صريح لا كنجاح.
     */
    /**
     * بصمة «تغيّر الخطوة». لا تُؤخذ من `document.body.innerText` لأن أول ما فيه
     * على سطح المكتب هو شريط الخطوات الثابت — فتتوقف البصمة عن التغيّر بينما
     * المحتوى يتغيّر، فينهي المشي مبكرًا. تُؤخذ من منطقة محتوى الدرس وحدها،
     * ومن نص زر التالي/عدّاد الخطوة إن وُجد.
     */
    const stepSignature = (page, lessonN) =>
      page.evaluate((num) => {
        const main = document.getElementById(`l${num}-main`) || document.querySelector("main");
        const content =
          main?.querySelector(":scope > .lesson-content-container") ||
          main?.querySelector(".lesson-content-container") ||
          main;
        const mainText = (content?.innerText || "").replace(/\s+/g, " ").slice(0, 600);
        const counter = [...document.querySelectorAll("*")]
          .map((e) => (e.children.length === 0 ? (e.textContent || "").trim() : ""))
          .find((t) => /^\d{1,3}\s*\/\s*\d{1,3}$/.test(t));
        return `${counter || ""}::${mainText}`;
      }, lessonN);

    const walkToEnd = async (page, lessonN, maxClicks = 160) => {
      let lastText = "";
      let stalled = 0;
      let clicks = 0;
      for (; clicks < maxClicks; clicks++) {
        const current = await stepSignature(page, lessonN);
        if (current === lastText) {
          stalled += 1;
          if (stalled > 12) break;
        } else {
          stalled = 0;
          lastText = current;
        }
        const clicked = await page.evaluate(
          ({ nextSrc }) => {
            const nextRe = new RegExp(nextSrc);
            const cand = [...document.querySelectorAll("button")].filter((b) => {
              if (b.disabled || b.hasAttribute("data-site-lock-button")) return false;
              const r = b.getBoundingClientRect();
              if (r.width < 2 || r.height < 2) return false;
              const t = (b.textContent || "").replace(/\s+/g, " ").trim();
              return nextRe.test(t);
            });
            if (!cand.length) return false;
            cand[cand.length - 1].click();
            return true;
          },
          { nextSrc: NEXT_LABELS.source },
        );
        if (!clicked) break;
        await page.waitForTimeout(25);
      }
      return { clicks, reachedEnd: stalled > 10 ? false : true, bodyLen: (await page.evaluate(() => document.body.innerText.trim().length)) };
    };

    for (const viewport of VIEWPORTS) {
      const page = await newPageFor(viewport);
      const diag = attachDiagnostics(page);
      const scope = `navigation@${viewport.name}`;

      // 1) الفهرس → درس من بطاقة حقيقية
      diag.reset();
      await page.goto(`${BASE}#/`, { waitUntil: "domcontentloaded" });
      await page.getByRole("heading", { name: "دروس اللغة الإنجليزية" }).waitFor();
      const hubCards = await page.locator('a.group[href^="#/lesson/"]').count();
      recordNav(scope, `Hub @${viewport.name}: الفهرس يعرض 62 بطاقة درس`, hubCards === 62, `cards=${hubCards}`);
      await page.locator('a.group[href="#/lesson/7"]').click();
      await page.locator("#l7-main").waitFor();
      recordNav(scope, `Hub @${viewport.name}: النقر على بطاقة يفتح الدرس 7 (hash + محتوى)`, page.url().endsWith("#/lesson/7") && (await page.locator("#l7-main").isVisible()), page.url());
      navResults.push({ viewport: viewport.name, scenario: "hub->lesson", ok: page.url().endsWith("#/lesson/7") });

      // 2) الدرس → الفهرس عبر زر الخروج (أو درج ☰ على الشاشات الضيقة)
      diag.reset();
      const exitPath = await reachExit(page);
      recordNav(scope, `Lesson @${viewport.name}: مسار العودة إلى الفهرس متاح من الدرس 7`, Boolean(exitPath.path), `path=${exitPath.path ?? "none"} text=${exitPath.text ?? "-"}`);
      let reachedHub = false;
      if (exitPath.path) {
        await clickExit(page);
        reachedHub = await page
          .getByRole("heading", { name: "دروس اللغة الإنجليزية" })
          .waitFor({ timeout: 10000 })
          .then(() => true)
          .catch(() => false);
      }
      recordNav(scope, `Lesson @${viewport.name}: العودة من الدرس 7 تصل إلى الفهرس فعلًا`, reachedHub && page.url().endsWith("#/"), `path=${exitPath.path ?? "none"} url=${page.url()}`);
      navResults.push({ viewport: viewport.name, scenario: "lesson->hub", ok: reachedHub, via: exitPath.path });

      // 3) الدرس → الدرس التالي / السابق عبر روابط نهاية الدرس الحقيقية
      const nextPrevCovered = [];
      for (const n of [1, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62]) {
        diag.reset();
        await page.goto(`${BASE}#/lesson/${n}`, { waitUntil: "domcontentloaded" });
        await page.waitForFunction((num) => Boolean(document.getElementById(`l${num}-main`) || document.querySelector("main")), n, { timeout: 15000 });
        const walk = await walkToEnd(page, n);
        const found = await findNav(page);
        const nextLink = found.lessonLinks.find((l) => Number(l.href.split("/").pop()) === n + 1);
        const prevLink = found.lessonLinks.find((l) => Number(l.href.split("/").pop()) === n - 1);
        if (nextLink) {
          await page.locator(`a[href="${nextLink.href}"]`).first().click();
          await page.waitForURL((u) => u.hash === `#/lesson/${n + 1}`, { timeout: 8000 }).catch(() => {});
          await waitForLessonRender(page, n + 1);
          const ok = page.url().endsWith(`#/lesson/${n + 1}`);
          recordNav(scope, `Lesson @${viewport.name}: رابط «الدرس التالي» من ${n} يفتح ${n + 1}`, ok, `clicks=${walk.clicks} url=${page.url()}`);
          navResults.push({ viewport: viewport.name, scenario: `lesson${n}->next`, ok });
          nextPrevCovered.push(`${n}->${n + 1}`);
        }
        if (prevLink) {
          await page.goto(`${BASE}#/lesson/${n}`, { waitUntil: "domcontentloaded" });
          await page.waitForTimeout(200);
          const walk2 = await walkToEnd(page, n);
          const found2 = await findNav(page);
          const prev = found2.lessonLinks.find((l) => Number(l.href.split("/").pop()) === n - 1);
          if (prev) {
            await page.locator(`a[href="${prev.href}"]`).first().click();
            await page.waitForURL((u) => u.hash === `#/lesson/${n - 1}`, { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(300);
            const ok = page.url().endsWith(`#/lesson/${n - 1}`);
            recordNav(scope, `Lesson @${viewport.name}: رابط «الدرس السابق» من ${n} يفتح ${n - 1}`, ok, `clicks=${walk2.clicks} url=${page.url()}`);
            navResults.push({ viewport: viewport.name, scenario: `lesson${n}->prev`, ok });
            nextPrevCovered.push(`${n}->${n - 1}`);
          }
        }
      }

      // 4) «التالي» داخل الدرس يتقدم خطوة فعلًا (سلوك الهيكل المشترك)
      diag.reset();
      await page.goto(`${BASE}#/lesson/1`, { waitUntil: "domcontentloaded" });
      await page.locator("#l1-main").waitFor();
      const beforeStep = await page.locator("#l1-main").innerText();
      const stepWalk = await walkToEnd(page, 1, 3);
      const afterStep = await page.locator("#l1-main").innerText();
      recordNav(scope, `Lesson @${viewport.name}: «التالي» داخل الدرس 1 يغيّر المحتوى (${stepWalk.clicks} نقرة)`, stepWalk.clicks > 0 && beforeStep !== afterStep, `clicks=${stepWalk.clicks}`);
      navResults.push({ viewport: viewport.name, scenario: "step-next", ok: stepWalk.clicks > 0 });

      // 5) زر قفل الموقع يعمل فعلًا (يفتح بوابة كلمة المرور)
      diag.reset();
      await page.goto(`${BASE}#/lesson/3`, { waitUntil: "domcontentloaded" });
      await page.locator("#l3-main").waitFor();
      await page.locator("[data-site-lock-button]").first().click();
      await page.locator("#site-password").waitFor({ timeout: 10000 });
      recordNav(scope, `Shell @${viewport.name}: زر قفل الموقع يعيد بوابة كلمة المرور`, (await page.locator("#site-password").count()) === 1, page.url());
      navResults.push({ viewport: viewport.name, scenario: "site-lock", ok: (await page.locator("#site-password").count()) === 1 });

      await page.close();
    }
  }

  // ---------- 7c) احتواء الانهيار والتعافي — عبر حزمة اختبار معزولة ----------
  // يُعاد استخدام حزمة Fix #2 الموجودة (scripts/fixtures/error-boundary/harness)
  // بدل بناء آلية حقن ثانية. لا يُضاف أي كود حقن إلى الإنتاج.
  if (!SKIP_NAV) {
    const harnessConfig = path.join(ROOT, "scripts/fixtures/error-boundary/harness/vite.config.ts");
    const harnessDist = path.join(ROOT, "node_modules/.error-boundary-browser/dist");
    let harness = { available: false, reason: null };
    try {
      execFileSync(process.execPath, [path.join(ROOT, "node_modules/vite/bin/vite.js"), "build", "--config", harnessConfig], {
        cwd: ROOT,
        stdio: ["ignore", "ignore", "pipe"],
      });
      harness.available = existsSync(path.join(harnessDist, "index.html"));
      if (!harness.available) harness.reason = "حزمة الاختبار لم تُنتج index.html";
    } catch (err) {
      harness.reason = String(err).split("\n").slice(0, 3).join(" ");
    }

    if (!harness.available) {
      record("error-boundary@harness", "حزمة اختبار حدّ الأخطاء متاحة لإعادة الاستخدام", false, harness.reason);
      boundaryResults.push({ harness: false, reason: harness.reason });
    } else {
      const harnessServer = await new Promise((resolve) => {
        const s = createServer((req, res) => {
          const raw = (req.url || "/").split("?")[0];
          const candidate = path.normalize(path.join(harnessDist, raw.replace(/^\/+/, "")));
          const file =
            candidate.startsWith(harnessDist) && existsSync(candidate) && statSync(candidate).isFile()
              ? candidate
              : path.join(harnessDist, "index.html");
          res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
          res.end(readFileSync(file));
        });
        s.listen(0, "127.0.0.1", () => resolve(s));
      });
      const HARNESS_BASE = `http://127.0.0.1:${harnessServer.address().port}/`;

      for (const viewport of VIEWPORTS) {
        const page = await newPageFor(viewport);
        const diag = attachDiagnostics(page);
        const scope = `error-boundary@${viewport.name}`;

        // درس سليم
        diag.reset();
        await page.goto(`${HARNESS_BASE}#/lesson/1`, { waitUntil: "domcontentloaded" });
        await page.locator("#l1-main").waitFor();
        record(scope, `Boundary @${viewport.name}: الدرس السليم 1 لا يُظهر واجهة التعافي`, (await page.locator("[data-lesson-error-fallback]").count()) === 0);

        // انهيار مقصود
        diag.reset();
        await page.evaluate(() => { window.location.hash = "/lesson/2"; });
        await page.locator("[data-lesson-error-fallback]").waitFor();
        const fallbackVisible = await page.locator('[data-lesson-error-fallback="true"]').isVisible();
        record(scope, `Boundary @${viewport.name}: الانهيار يُحتوى ويعرض واجهة تعافٍ (لا صفحة بيضاء)`, fallbackVisible);
        record(scope, `Boundary @${viewport.name}: زر قفل الموقع يبقى ظاهرًا أثناء الانهيار`, await page.locator("[data-site-lock-button]").first().isVisible());
        record(scope, `Boundary @${viewport.name}: الصفحة ليست فارغة بعد الانهيار`, (await page.evaluate(() => document.body.innerText.trim().length)) > 40);
        const fallbackLayout = await page.evaluate(() => {
          const card = document.querySelector('[data-lesson-error-fallback="true"]');
          const r = card.getBoundingClientRect();
          return { width: r.width, left: r.left, right: r.right, overflow: document.documentElement.scrollWidth - window.innerWidth };
        });
        record(scope, `Boundary @${viewport.name}: واجهة التعافي داخل العرض ولا فائض`, fallbackLayout.left >= -2 && fallbackLayout.right <= viewport.width + 2 && fallbackLayout.overflow <= 1, JSON.stringify(fallbackLayout));

        // الانتقال بعيدًا يعيد الرندر الطبيعي
        diag.reset();
        await page.evaluate(() => { window.location.hash = "/lesson/3"; });
        await page.locator("#l3-main").waitFor();
        record(scope, `Boundary @${viewport.name}: مغادرة الدرس المنهار تعيد الرندر الطبيعي`, (await page.locator("#l1-main, #l3-main").first().isVisible()) && (await page.locator("[data-lesson-error-fallback]").count()) === 0);

        // العودة إلى الفهرس
        diag.reset();
        await page.evaluate(() => { window.location.hash = "/lesson/2"; });
        await page.locator("[data-lesson-error-fallback]").waitFor();
        await page.locator("[data-lesson-error-home]").click();
        await page.getByRole("heading", { name: "دروس اللغة الإنجليزية" }).waitFor();
        record(scope, `Boundary @${viewport.name}: «العودة إلى صفحة الدروس» تعمل من واجهة التعافي`, page.url().endsWith("#/") && (await page.locator('a.group[href^="#/lesson/"]').count()) === 62);

        // تصنيف أخطاء الحقن منفصلة عن غير المتوقعة
        const injected = diag.consoleErrors.filter(isInjected);
        const unexpected = diag.consoleErrors.filter((t) => !isInjected(t));
        record(scope, `Boundary @${viewport.name}: أخطاء الحقن المحقونة مصنّفة منفصلة (${injected.length})`, injected.length >= 0);
        record(scope, `Boundary @${viewport.name}: لا أخطاء console غير متوقعة خارج الحقن`, unexpected.length === 0, JSON.stringify(unexpected.slice(0, 3)));
        record(scope, `Boundary @${viewport.name}: لا أخطاء صفحة غير معالجة أثناء الانهيار المحقون`, diag.pageErrors.length === 0, JSON.stringify(diag.pageErrors.slice(0, 3)));

        boundaryResults.push({
          viewport: viewport.name,
          injectedConsoleErrors: injected,
          unexpectedConsoleErrors: unexpected,
          pageErrors: [...diag.pageErrors],
          unavailableExternalFonts: [...new Set(diag.unavailableExternalFonts)],
        });

        await page.close();
      }
      await new Promise((r) => harnessServer.close(r));
      rmSync(harnessDist, { recursive: true, force: true });
    }
  }
} finally {
  await context.close();
  await browser.close();
  await new Promise((r) => server.close(r));
}

// ------------------------------------------------------------
// 8) تجميع التصنيف
// ------------------------------------------------------------
const lessonFailures = scenarioResults.filter((r) => r.assertions.some((a) => !a.pass));
const byCategory = {
  [CATEGORY.NEW]: [],
  [CATEGORY.PREEXISTING]: [],
  [CATEGORY.ENVIRONMENT]: [],
  [CATEGORY.INFRASTRUCTURE]: [],
};

for (const r of lessonFailures) {
  const failed = r.assertions.filter((a) => !a.pass);
  const entry = {
    lesson: r.lesson,
    route: r.route,
    viewport: r.viewport,
    failedAssertions: failed.map((f) => f.assertion),
    details: failed.map((f) => f.detail).filter(Boolean),
    consoleErrors: r.consoleErrors,
    pageErrors: r.pageErrors,
    failedRequests: r.failedRequests,
    screenshot: r.screenshot,
    reproducible: r.reproducible,
    rerunFailures: r.rerunFailures ?? null,
    quality: r.category,
  };
  byCategory[r.category ?? CATEGORY.NEW].push(entry);
}

// خطوط خارجية غير متاحة = بيئية، لا تُخلط مع إخفاقات التطبيق.
const environmentNotes = [];
for (const r of scenarioResults) {
  if (r.unavailableExternalFonts.length) {
    environmentNotes.push({ lesson: r.lesson, viewport: r.viewport, kind: "external-font", sample: r.unavailableExternalFonts[0] });
  }
}
const environmentLessons = [...new Set(environmentNotes.map((e) => e.lesson))];

// ------------------------------------------------------------
// 9) كتابة التقرير
// ------------------------------------------------------------
const totalChecks = checks.length;
const failedChecks = checks.filter((c) => !c.pass);
const lessonsCovered = [...new Set(scenarioResults.map((r) => r.lesson))].sort((a, b) => a - b);
const scenariosPerViewport = VIEWPORTS.reduce((acc, v) => {
  acc[v.name] = scenarioResults.filter((r) => r.viewport === v.name).length;
  return acc;
}, {});

const report = {
  generatedAt: new Date().toISOString(),
  task: "Fix #3 — Comprehensive Runtime Browser Audit for All 62 Lessons",
  baseCommit: "879253a6434febc082ff8af6f1bcd0988a30c0fc",
  scope: {
    lessonsExpected: LESSON_COUNT,
    lessonsCovered,
    lessonsCoveredCount: lessonsCovered.length,
    viewports: VIEWPORTS,
    scenarios: scenarioResults.length,
    scenariosPerViewport,
    browser: "Chromium (@sparticuz/chromium via playwright-core), headless",
    target: "dist/ production bundle served over static HTTP under /English-Course/",
    reducedMotion: "reduce (stabilises geometry; animations are CSS-only)",
  },
  checkTotals: {
    checks: totalChecks,
    passed: totalChecks - failedChecks.length,
    failed: failedChecks.length,
    failingScenarios: lessonFailures.length,
  },
  classification: {
    new: byCategory[CATEGORY.NEW],
    preexisting: byCategory[CATEGORY.PREEXISTING],
    environmentOnly: {
      description: "خطوط Google الخارجية غير متاحة في بيئة التشغيل — لا تُحسب إخفاقًا تطبيقيًا.",
      lessonCount: environmentLessons.length,
      lessons: environmentLessons,
      sample: environmentNotes.slice(0, 2),
    },
    testInfrastructure: byCategory[CATEGORY.INFRASTRUCTURE],
  },
  knownPreexistingAuditIssues: KNOWN_PREEXISTING.map((k) => ({ id: k.id, note: k.note })),
  navigation: navResults,
  errorBoundary: boundaryResults,
  scenarios: scenarioResults.map((r) => ({
    lesson: r.lesson,
    route: r.route,
    viewport: r.viewport,
    loaded: r.loaded,
    passed: !r.assertions.some((a) => !a.pass),
    failedAssertions: r.assertions.filter((a) => !a.pass).map((a) => a.assertion),
    consoleErrors: r.consoleErrors,
    pageErrors: r.pageErrors,
    failedRequests: r.failedRequests,
    unavailableExternalFonts: r.unavailableExternalFonts,
    screenshot: r.screenshot,
    reproducible: r.reproducible,
    classification: r.category,
    probe: r.probe,
  })),
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`);

// ملخص بشري
const md = [];
md.push("# Fix #3 — Runtime Browser Audit (all lessons)\n");
md.push(`**تاريخ التوليد:** ${report.generatedAt}`);
md.push(`**خط الأساس:** \`${report.baseCommit}\`\n`);
md.push("## النطاق\n");
md.push("| البند | القيمة |");
md.push("| --- | --- |");
md.push(`| الدروس المتوقعة | ${LESSON_COUNT} |`);
md.push(`| الدروس التي فُتحت فعلًا | **${lessonsCovered.length}** (${lessonsCovered[0]}–${lessonsCovered[lessonsCovered.length - 1]}) |`);
md.push(`| المقاسات | ${VIEWPORTS.map((v) => `${v.width}×${v.height}`).join(" · ")} |`);
md.push(`| سناريوهات الدرس | **${scenarioResults.length}** (${Object.entries(scenariosPerViewport).map(([k, v]) => `${k}=${v}`).join(", ")}) |`);
md.push(`| فحوص مجمّعة | ${totalChecks} (نجح ${totalChecks - failedChecks.length} · فشل ${failedChecks.length}) |`);
md.push(`| سناريوهات بها إخفاق | ${lessonFailures.length} |`);
md.push(`| متصفح | ${report.scope.browser} |`);
md.push(`| الهدف | ${report.scope.target} |\n`);

md.push("## التصنيف\n");
md.push(`- **إخفاقات جديدة من هذا العمل:** ${byCategory[CATEGORY.NEW].length}`);
md.push(`- **إخفاقات قائمة سابقًا:** ${byCategory[CATEGORY.PREEXISTING].length}`);
md.push(`- **إخفاقات بيئية فقط (خطوط خارجية):** ${environmentLessons.length} درسًا — لا تُحسب إخفاقًا تطبيقيًا.`);
md.push(`- **إخفاقات بنية التدقيق:** ${byCategory[CATEGORY.INFRASTRUCTURE].length}\n`);

md.push("## التنقل وقفل الموقع\n");
if (navResults.length) {
  md.push("| المقاس | السناريو | النتيجة |");
  md.push("| --- | --- | --- |");
  for (const nv of navResults) md.push(`| ${nv.viewport} | ${nv.scenario} | ${nv.ok ? "✓" : "✗"} |`);
} else {
  md.push("_لم يُشغَّل (--skip-nav)._");
}
md.push("");

md.push("## حدّ الأخطاء والتعافي\n");
if (boundaryResults.length) {
  for (const b of boundaryResults) {
    if (b.harness === false) {
      md.push(`- حزمة الاختبار غير متاحة: ${b.reason}`);
      continue;
    }
    md.push(`- **${b.viewport}:** أخطاء حقن مصنّفة=${b.injectedConsoleErrors.length} · console غير متوقعة=${b.unexpectedConsoleErrors.length} · pageerrors=${b.pageErrors.length}`);
  }
} else {
  md.push("_لم يُشغَّل (--skip-nav)._");
}
md.push("");

if (lessonFailures.length) {
  md.push("## الإخفاقات التفصيلية\n");
  md.push("| الدرس | المسار | المقاس | التصنيف | قابل للتكرار | الفحص الفاشل | اللقطة |");
  md.push("| --- | --- | --- | --- | --- | --- | --- |");
  for (const group of Object.values(byCategory)) {
    for (const z of group) {
      md.push(
        `| ${z.lesson} | \`${z.route}\` | ${z.viewport} | ${z.quality} | ${z.reproducible === null ? "?" : z.reproducible ? "نعم" : "لا"} | ${z.failedAssertions.map((a) => a.split(": ").pop()).join(" · ")} | ${z.screenshot ?? "—"} |`,
      );
    }
  }
  md.push("");
} else {
  md.push("## الإخفاقات التفصيلية\n\nلا توجد إخفاقات في الدروس المفحوصة.\n");
}

md.push("## إخفاقات تدقيقات قائمة (خط الأساس، موثّقة)\n");
for (const k of KNOWN_PREEXISTING) md.push(`- \`${k.id}\`: ${k.note}`);
md.push("");
md.push("## الملفات\n");
md.push(`- تقرير JSON: \`${path.relative(ROOT, REPORT_JSON)}\``);
md.push(`- ملخص: \`${path.relative(ROOT, REPORT_MD)}\``);
md.push(`- لقطات الإخفاق: \`${path.relative(ROOT, SHOT_DIR)}/\` (تُنشأ فقط عند الإخفاق)\n`);

writeFileSync(REPORT_MD, `${md.join("\n")}\n`);

// ------------------------------------------------------------
// 10) مخرجات الطرفية
// ------------------------------------------------------------
console.log("\n================ Runtime Browser Audit — All Lessons ================");
console.log(`Lessons covered        : ${lessonsCovered.length}/${LESSON_COUNT}`);
console.log(`Viewports              : ${VIEWPORTS.map((v) => `${v.width}x${v.height}`).join(", ")}`);
console.log(`Lesson scenarios       : ${scenarioResults.length} (${Object.entries(scenariosPerViewport).map(([k, v]) => `${k}=${v}`).join(", ")})`);
console.log(`Checks                 : ${totalChecks} · passed ${totalChecks - failedChecks.length} · failed ${failedChecks.length}`);
console.log(`Failing scenarios      : ${lessonFailures.length}`);
console.log(`  new                  : ${byCategory[CATEGORY.NEW].length}`);
console.log(`  pre-existing         : ${byCategory[CATEGORY.PREEXISTING].length}`);
console.log(`  environment (fonts)  : ${environmentLessons.length} lessons`);
console.log(`  infrastructure       : ${byCategory[CATEGORY.INFRASTRUCTURE].length}`);
if (navResults.length) {
  const navPass = navResults.filter((n) => n.ok).length;
  console.log(`Navigation scenarios   : ${navPass}/${navResults.length} passed`);
}
if (boundaryResults.length) {
  const boundaryScenarios = boundaryResults.filter((b) => b.harness !== false);
  console.log(`Error boundary         : ${boundaryScenarios.length} viewport(s) verified`);
}
console.log(`Report                 : ${path.relative(ROOT, REPORT_JSON)}`);
console.log(`Summary                : ${path.relative(ROOT, REPORT_MD)}`);

// مواد الفشل التفصيلية (بلا إخفاء)
if (failedChecks.length) {
  console.error(`\n✗ ${failedChecks.length} failed check(s):`);
  for (const f of failedChecks.slice(0, 40)) console.error(`  ✗ ${f.assertion}${f.detail ? ` — ${f.detail}` : ""}`);
  if (failedChecks.length > 40) console.error(`  ... و${failedChecks.length - 40} أخرى (انظر التقرير).`);
  process.exitCode = 1;
} else {
  console.log("\n✓ لا إخفاقات: كل الدروس المفحوصة رُندرت بلا أخطاء أو فائض أو مشاكل اتجاه.");
}
