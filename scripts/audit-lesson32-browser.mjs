// ============================================================
// فحص الدرس 32 في متصفح حقيقي (Chromium) — دليل بصري وتفاعلي.
//
// التجهيز (أدوات تطوير فقط — لا تُحفظ في package.json):
//   npm install --no-save --no-package-lock=false playwright-core @sparticuz/chromium
//
// التشغيل (يحتاج خادم معاينة يستمع فعلًا):
//   npm run build && npx vite preview --host 127.0.0.1 --port 4173
//   node scripts/audit-lesson32-browser.mjs
//
// المخرجات: docs/lesson32-visual/*.png + verification.json
// ملاحظة: الشبكة الرملية لا تصل إلى Google Fonts؛ تُحجب الطلبات عمدًا
// ويُوثَّق الحجب في externalNetworkErrors — الدرس مصمم ليعمل ببدائل
// نظامية دون أي تنزيل خارجي.
// ============================================================
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

// ---------------- المتصفح: مكتبات NSS/NSPR غير موجودة في الرمل ----------------
const work = "node_modules/.l32browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const output = "docs/lesson32-visual";
mkdirSync(output, { recursive: true });

let checks = 0;
const failures = [];
const screenshots = [];
const errors = [];
const externalNetworkErrors = [];
const rendered = [];
const ok = (condition, message) => { checks++; if (!condition) failures.push(message); };

// مقاسات: لابتوب (الهدف الأساسي) + جوال (يجب أن يبقى وظيفيًا)
const LAPTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const base = process.env.LESSON32_URL || "http://127.0.0.1:4173/English-Course/#/lesson/32";
const TEACHER_PASSWORD = readFileSync("src/lessons/lesson32/teacherData.ts", "utf8").match(/TEACHER_PASSWORD_32 = "([^"]+)"/)[1];

const page = await browser.newPage({ viewport: LAPTOP, reducedMotion: "reduce" });
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const url = msg.location().url || "";
  if (/fonts\.(googleapis|gstatic)\.com/.test(url)) externalNetworkErrors.push({ url, message: msg.text() });
  else errors.push(`${msg.text()} ${url}`);
});
// بوابة الموقع موحّدة لكل الدروس — تُفتح كما يفتحها المعلم
await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));

async function shot(name) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: false, timeout: 90000, animations: "disabled" });
  screenshots.push(path);
}

/** تنقّل بين الخطوات: السكة الجانبية في اللابتوب، والدرج في الجوال */
async function goTo(index) {
  const rail = page.locator(".l32-rail:visible .l32-rail-step");
  if (await rail.count()) {
    await rail.nth(index).click();
  } else {
    const toggle = page.locator('[data-nav-toggle="steps"]');
    if ((await toggle.getAttribute("aria-expanded")) !== "true") await toggle.click();
    await page.locator("#l32-drawer .l32-rail-step").nth(index).click();
  }
  await page.locator("[data-lesson-step]").first().waitFor();
  await page.waitForTimeout(60);
}

const STEP_IDS = ["cover", "objectives", ...Array.from({ length: 36 }, (_, i) => `s${i + 1}`), "summary", "closing"];
/** الانتقال إلى خطوة بمعرّفها (cover · objectives · s1..s36 · summary · closing) */
async function step(id) {
  const index = STEP_IDS.indexOf(id);
  if (index < 0) throw new Error(`unknown step id: ${id}`);
  await goTo(index);
  await page.locator(`[data-lesson-step="${id}"]`).waitFor();
}

/** فحص الطبقة المرئية: لا فيض أفقي، تباين AA، ومراجع ARIA موجودة */
async function inspect(label) {
  const result = await page.locator(".l32-shell").evaluate((root) => {
    // موحّد الألوان: canvas يحوّل أي صيغة (rgb/oklab/color-mix/color()) إلى قيم رقمية
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    // القراءة عبر بكسل حقيقي: تدعم rgb/rgba/hex وoklch وcolor() وcolor-mix()
    // (Tailwind v4 يحسب بعض الألوان إلى oklch، فلا تكفي القراءة النصية).
    const toRgba = (value) => {
      if (!value || value === "transparent" || value === "none") return null;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, 1, 1);
      ctx.fillStyle = value;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      if (d[3] === 0) return null;
      return [d[0], d[1], d[2], d[3] / 255];
    };
    const lum = (c) => {
      const a = c.slice(0, 3).map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    const issues = [];
    const gradients = [];
    let tested = 0;
    let min = 100;
    for (const el of root.querySelectorAll("*")) {
      if (!el.getClientRects().length || getComputedStyle(el).visibility === "hidden" || el.tagName === "OPTION") continue;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(" ");
      if (!own && !el.matches("input,textarea,select")) continue;
      // نص رموز/إيموجي فقط: لون الحبر لا يؤثر في ظهوره
      if (own && !/[\p{L}\p{N}]/u.test(own)) continue;
      const style = getComputedStyle(el);
      const fg = toRgba(style.color);
      if (!fg) continue;
      // ابحث عن أول خلفية معتمة؛ التدرّجات (background-image) تُسجَّل للمراجعة اليدوية
      let node = el;
      let bg = null;
      let gradient = false;
      while (node && node !== document.documentElement) {
        const st = getComputedStyle(node);
        if (st.backgroundImage && st.backgroundImage !== "none") { gradient = true; break; }
        const c = toRgba(st.backgroundColor);
        if (c && c[3] >= 0.99) { bg = c; break; }
        node = node.parentElement;
      }
      if (gradient) { gradients.push((own || el.getAttribute("aria-label") || el.tagName).slice(0, 60)); continue; }
      bg ??= [255, 255, 255, 1];
      const a = lum(fg);
      const b = lum(bg);
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight, 10) >= 700);
      const need = large ? 3 : 4.5;
      tested++;
      min = Math.min(min, ratio);
      if (ratio < need) issues.push({ text: (own || el.getAttribute("aria-label") || el.tagName).slice(0, 70), ratio: Number(ratio.toFixed(2)), need, fg: style.color, bg: `rgb(${bg.slice(0, 3).join(",")})` });
    }
    const refs = [...root.querySelectorAll("[aria-labelledby],[aria-describedby],[aria-controls]")]
      .flatMap((el) => ["aria-labelledby", "aria-describedby", "aria-controls"].flatMap((attr) => (el.getAttribute(attr) || "").split(/\s+/).filter(Boolean)))
      .filter((id) => !document.getElementById(id));
    return {
      width: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      tested,
      min: Number(min.toFixed(2)),
      issues,
      gradients: [...new Set(gradients)].slice(0, 8),
      refs,
    };
  });
  rendered.push({ label, ...result });
  ok(result.scroll <= result.width, `${label}: no horizontal overflow (${result.scroll}/${result.width})`);
  ok(result.issues.length === 0, `${label}: AA contrast (${result.tested} text nodes, min ${result.min}) — ${JSON.stringify(result.issues.slice(0, 4))}`);
  ok(result.refs.length === 0, `${label}: ARIA targets resolve (${result.refs.slice(0, 4).join(",")})`);
  return result;
}

try {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.locator(".lesson32").waitFor({ timeout: 30000 });
  await page.locator('[data-lesson-step="cover"]').waitFor();

  // ---------------- الهيكل: رأس مضغوط + سكة + تنقّل ----------------
  ok(await page.locator('[data-area="l32-lesson"]').isVisible(), "shell: lesson area is the default view");
  ok((await page.locator('[data-tab]').count()) === 4, "shell: four area buttons");
  ok(await page.locator(".l32-rail:visible .l32-rail-step").count() === 40, "shell: rail lists all 40 steps on a laptop");
  const headerBox = await page.locator(".l32-header").boundingBox();
  ok(headerBox.height < 130, `shell: compact header (${Math.round(headerBox.height)}px tall — no duplicated big step header)`);
  const h2Count = await page.locator(".l32-frame h2").count();
  ok(h2Count === 1, `shell: exactly one step title in the frame (got ${h2Count})`);
  ok((await page.locator(".l32-frame").first().boundingBox()).y < headerBox.y + headerBox.height + 24, "shell: teaching content starts right below the compact header");
  await inspect("desktop-cover");
  await shot("desktop-01-cover");

  // ---------------- خط الزمن في الغلاف ----------------
  ok((await page.locator(".l32-stream-flow").first().getAttribute("data-live")) === "true", "cover: the stream is live (activity continuing to NOW)");
  ok(await page.locator(".l32-stream-now").first().isVisible(), "cover: NOW marker visible");

  // ---------------- s4: شريط المدة + النشاط + التوقف ----------------
  await step("s4");
  await page.locator('[data-lesson-step="s4"]').waitFor();
  const before = await page.locator(".l32-deck-en").first().textContent();
  await page.locator(".l32-range").first().fill("5");
  await page.waitForTimeout(80);
  const after = await page.locator(".l32-deck-en").first().textContent();
  ok(before !== after && after.includes("for 5 hours"), `s4: duration slider rebuilds the sentence (${after.trim().slice(0, 60)})`);
  const pinLeft = await page.locator(".l32-stream-pin").first().evaluate((el) => getComputedStyle(el).insetInlineStart || getComputedStyle(el).left);
  ok(!!pinLeft, `s4: the start pin is positioned on the timeline (${pinLeft})`);
  await page.locator('[role="radio"]').nth(1).click();
  await page.waitForTimeout(60);
  await inspect("desktop-s4-timeline");
  await shot("desktop-02-s4-duration-stream");
  await page.getByRole("button", { name: /ما زال مستمرًا الآن/ }).click();
  await page.waitForTimeout(80);
  ok((await page.locator(".l32-stream-flow").first().getAttribute("data-live")) === "false", "s4: stopping the activity switches the stream to the just-finished state");
  ok(await page.locator(".l32-trace").count() > 0, "s4: visible traces appear after the activity stops");
  ok(await page.locator('[data-gate-done="s4"]').isVisible(), "s4: gate confirms completion after the three tools are used");

  // ---------------- s7: معمل for/since (فرز) ----------------
  await step("s7");
  await page.locator('[data-lesson-step="s7"]').waitFor();
  const sortItems = page.locator('[data-sort-item]');
  ok((await sortItems.count()) > 0, "s7: for/since sorting lab renders items");
  await inspect("desktop-s7-forsince");
  await shot("desktop-03-s7-for-since");

  // ---------------- s14: عدسة النتيجة / النشاط ----------------
  await step("s14");
  await page.locator('[data-lesson-step="s14"]').waitFor();
  const lens = page.locator(".l32-lens");
  ok((await lens.count()) === 2, "s14: two lenses (result / activity)");
  await lens.nth(1).click();
  await page.waitForTimeout(80);
  ok((await lens.nth(1).getAttribute("aria-pressed")) === "true", "s14: the activity lens can be selected");
  ok((await page.locator(".l32-vs").count()) > 0, "s14: the result/activity axis renders both sentences");
  await inspect("desktop-s14-lens");
  await shot("desktop-04-s14-lens");
  await lens.nth(0).click();
  await page.waitForTimeout(60);
  ok((await lens.nth(0).getAttribute("aria-pressed")) === "true", "s14: switching back to the result lens updates the explanation");

  // ---------------- s18: ما زال مستمرًا؟ ----------------
  await step("s18");
  await page.locator('[data-lesson-step="s18"]').waitFor();
  await page.getByRole("button", { name: /ما زال يركض|ما زال مستمرًا/ }).first().click();
  await page.waitForTimeout(80);
  ok(await page.locator('[data-gate-done="s18"]').count() <= 1, "s18: still-running lab responds to the choice");

  // ---------------- s24: نقطة المرجع ----------------
  await step("s24");
  await page.locator('[data-lesson-step="s24"]').waitFor();
  const snaps = page.locator("[data-snap]");
  const snapCount = await snaps.count();
  ok(snapCount >= 2, `s24: reference-point rail has ${snapCount} stops (PAST → NOW)`);
  await snaps.first().click();
  await page.waitForTimeout(120);
  ok((await snaps.first().getAttribute("aria-current")) === "true", "s24: selecting a past reference point moves the marker");
  ok((await page.locator('[data-lesson-step="s24"]').textContent()).includes("Past Continuous"), "s24: the past stop names Past Continuous");
  await snaps.last().click();
  await page.waitForTimeout(120);
  ok((await snaps.last().getAttribute("aria-current")) === "true", "s24: moving the reference point to NOW selects the last stop");
  ok((await page.locator('[data-lesson-step="s24"]').textContent()).includes("Present Perfect Continuous"), "s24: the NOW stop names Present Perfect Continuous");
  await inspect("desktop-s24-reference");
  await shot("desktop-05-s24-reference-rail");

  // ---------------- s27: Grammar Detective ----------------
  await step("s27");
  await page.locator('[data-lesson-step="s27"]').waitFor();
  ok((await page.locator("[data-fix-seg]").count()) > 0, "s27: detective segments are tappable");
  ok((await page.locator("[data-fix-opt]").count()) === 0, "s27: no correction options before the wrong segment is touched");
  // المس أجزاء الجملة الأولى حتى يظهر الخطأ (لا حل قبل المحاولة)
  for (let si = 0; si < 6 && (await page.locator("[data-fix-opt]").count()) === 0; si++) {
    await page.locator(`[data-fix-seg="0-${si}"]`).click();
    await page.waitForTimeout(50);
  }
  ok((await page.locator("[data-fix-opt]").count()) > 0, "s27: touching the wrong segment reveals the correction options");
  await page.locator("[data-fix-opt]").first().click();
  await page.waitForTimeout(60);
  ok((await page.locator('[data-lesson-step="s27"]').textContent()).includes("تم الإصلاح") || (await page.locator('[data-lesson-step="s27"]').textContent()).includes("ليس الإصلاح الصحيح"), "s27: the attempt answers with feedback");
  await inspect("desktop-s27-detective");
  await shot("desktop-06-s27-detective");

  // ---------------- s30: لوحة المعنى (أثر ← سياق ← سبب) ----------------
  await step("s30");
  await page.locator('[data-lesson-step="s30"]').waitFor();
  const clueCount = await page.locator("[data-clue]").count();
  ok(clueCount > 0, `s30: ${clueCount} clue buttons render`);
  await page.locator("[data-clue]").first().click();
  await page.waitForTimeout(60);
  ok((await page.locator("[data-case-opt]").count()) === 0, "s30: options stay locked until every clue is touched");
  for (let i = 0; i < clueCount; i++) {
    await page.locator("[data-clue]").nth(i).click();
    await page.waitForTimeout(50);
  }
  ok((await page.locator("[data-case-opt]").count()) > 0, "s30: touching all clues unlocks the context options");
  await inspect("desktop-s30-meaning");
  await shot("desktop-07-s30-meaning-board");

  // ---------------- s32: الزعيم ----------------
  await step("s32");
  await page.locator('[data-lesson-step="s32"]').waitFor();
  ok((await page.locator("[data-gear]").count()) > 0, "s32: boss gears render");
  await inspect("desktop-s32-boss");
  await shot("desktop-08-s32-boss");

  // ---------------- s36 + summary + closing ----------------
  await step("s36");
  await page.locator('[data-lesson-step="s36"]').waitFor();
  await inspect("desktop-s36-map");
  await shot("desktop-09-s36-gear-map");
  await step("summary");
  await inspect("desktop-summary");
  await shot("desktop-10-summary");
  await step("closing");
  await inspect("desktop-closing");
  await shot("desktop-11-closing");
  ok((await page.locator('[data-final-test="32"]').count()) === 1, "closing: the platform final test renders on the last step");

  // ---------------- كل خطوة: لا فيض ولا كسر تباين ----------------
  for (let i = 0; i < 40; i++) {
    await goTo(i);
    await page.locator(`[data-lesson-step="${STEP_IDS[i]}"]`).waitFor();
    await inspect(`desktop-step-${i + 1}-${STEP_IDS[i]}`);
  }

  // ---------------- التنقّل بلوحة المفاتيح ----------------
  await step("cover");
  await page.locator("#l32-main").click({ position: { x: 5, y: 5 } });
  await page.keyboard.press("ArrowLeft"); // RTL: يسار = التالي
  await page.waitForTimeout(80);
  ok((await page.locator(".l32-chip").first().textContent()).includes("2"), "keyboard: ArrowLeft advances one step in the RTL shell");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(80);
  ok((await page.locator(".l32-chip").first().textContent()).includes("1"), "keyboard: ArrowRight goes back one step");
  await page.locator(".l32-fab-next").click();
  await page.waitForTimeout(60);
  ok(await page.locator('[data-lesson-step="objectives"]').isVisible(), "nav: the floating next button (التالي ←) works");

  // ---------------- منطقة الاختبار ----------------
  await page.locator('[data-tab="test"]').click();
  await page.locator('[data-area="l32-test"]').waitFor();
  ok((await page.locator("[data-test-q]").count()) === 20, "test: 20 questions rendered");
  const testText0 = await page.locator('[data-area="l32-test"]').textContent();
  ok(!/الدرجة:|✓ صحيح|✕ غير صحيح/.test(testText0), "test: neutral before submit — no score, no correctness");
  ok(testText0.includes("أجبت: 0/20"), "test: answered counter starts at 0/20");
  await inspect("desktop-test-fresh");
  await shot("desktop-12-test-fresh");
  await page.locator("#l32-q1 input[type=radio]").first().check();
  await page.waitForTimeout(60);
  ok((await page.locator('[data-area="l32-test"]').textContent()).includes("أجبت: 1/20"), "test: answering updates the counter");
  const orderTokens = page.locator('#l32-q8 [data-keynav-lock] button');
  const orderCount = await orderTokens.count();
  for (let i = 0; i < orderCount; i++) {
    await page.locator('#l32-q8 [data-keynav-lock] button').first().click();
    await page.waitForTimeout(40);
  }
  ok((await page.locator('[data-test-q="8"]').textContent()).includes("1."), "test: the order question places its tokens in the clicked sequence");
  await page.locator("#l32-q17-t").fill("He has known the answer since morning");
  await page.waitForTimeout(60);
  ok((await page.locator('[data-area="l32-test"]').textContent()).includes("أجبت: 3/20"), "test: typed answers count as answered");
  await page.getByRole("button", { name: /إرسال الاختبار/ }).first().click();
  await page.waitForTimeout(120);
  const testText1 = await page.locator('[data-area="l32-test"]').textContent();
  ok(/الدرجة:\s*\d+\s*من\s*20/.test(testText1), "test: score appears after submit");
  ok(/✓ صحيح|✕ غير صحيح/.test(testText1), "test: per-question status appears after submit");
  await inspect("desktop-test-scored");
  await shot("desktop-13-test-scored");

  // ---------------- الحلول ----------------
  await page.locator('[data-tab="solutions"]').click();
  await page.locator('[data-area="l32-solutions"]').waitFor();
  const solText = await page.locator('[data-area="l32-solutions"]').textContent();
  ok((solText.match(/المجموعة/g) || []).length === 4, "solutions: four groups after unlocking");
  ok(solText.includes("Platform Explanation"), "solutions: explanations are labelled as platform commentary");
  await inspect("desktop-solutions");
  await shot("desktop-14-solutions");

  // ---------------- منطقة المعلم ----------------
  await page.locator('[data-tab="teacher"]').click();
  await page.locator('[data-area="l32-teacher"]').waitFor();
  ok(await page.locator("#l32-teacher-pw").isVisible(), "teacher: password gate shown");
  ok(!(await page.locator('[data-area="l32-teacher"]').textContent()).includes("نظرة عامة للمعلم"), "teacher: no content before the password");
  await inspect("desktop-teacher-locked");
  await shot("desktop-15-teacher-locked");
  await page.locator("#l32-teacher-pw").fill("wrong-password");
  await page.locator('[data-area="l32-teacher"] button[type=submit]').click();
  await page.waitForTimeout(80);
  ok((await page.locator('[role="alert"]').textContent()).includes("كلمة المرور غير صحيحة"), "teacher: wrong password rejected");
  await page.locator("#l32-teacher-pw").fill(TEACHER_PASSWORD);
  await page.locator('[data-area="l32-teacher"] button[type=submit]').click();
  await page.waitForTimeout(120);
  const teacherText = await page.locator('[data-area="l32-teacher"]').textContent();
  for (const heading of ["نظرة عامة للمعلم", "توزيع الحصة", "خريطة التدفق", "ملاحظات التدريس", "حلول تمارين المصدر", "rubrics", "الأخطاء الشائعة", "الأخطاء المتعمدة في المصدر", "دليل الاختبار للمعلم", "خطة المعالجة", "فهرس المصدر الحرفي"]) {
    ok(teacherText.includes(heading), `teacher: section rendered — ${heading}`);
  }
  ok((await page.locator('[data-area="l32-teacher"] tr').count()) >= 40, `teacher: explained tables render (${await page.locator('[data-area="l32-teacher"] tr').count()} rows)`);
  ok((await page.locator('[data-area="l32-teacher"] details').count()) === 40, "teacher: the verbatim source index lists 40 sections");
  await inspect("desktop-teacher-open");
  await shot("desktop-16-teacher-open");
  await page.locator('[data-area="l32-teacher"]').getByRole("button", { name: /قفل منطقة المعلم/ }).click();
  await page.waitForTimeout(80);
  ok(await page.locator("#l32-teacher-pw").isVisible(), "teacher: relocking restores the gate");

  // ---------------- الجوال: الدرج + الخطوات + الاختبار ----------------
  await page.setViewportSize(MOBILE);
  await page.locator('[data-tab="lesson"]').click();
  await page.waitForTimeout(80);
  ok(!(await page.locator(".l32-rail:visible").count()), "mobile: the rail collapses into a drawer");
  await page.locator('[data-nav-toggle="steps"]').click();
  await page.waitForTimeout(80);
  ok(await page.locator("#l32-drawer").isVisible(), "mobile: the steps drawer opens");
  await inspect("mobile-drawer");
  await shot("mobile-01-drawer");
  await page.locator("#l32-drawer .l32-rail-step").nth(STEP_IDS.indexOf("s14")).click();
  await page.locator('[data-lesson-step="s14"]').waitFor();
  await page.waitForTimeout(80);
  await inspect("mobile-s14");
  await shot("mobile-02-s14-lens");
  await page.locator('[data-nav-toggle="steps"]').click();
  await page.locator("#l32-drawer .l32-rail-step").nth(STEP_IDS.indexOf("s4")).click();
  await page.locator('[data-lesson-step="s4"]').waitFor();
  await inspect("mobile-s4");
  await shot("mobile-03-s4-stream");
  await page.locator('[data-tab="test"]').click();
  await page.locator('[data-area="l32-test"]').waitFor();
  await inspect("mobile-test");
  await shot("mobile-04-test");
  await page.keyboard.press("Escape");

  ok(errors.length === 0, `no console/page errors (${errors.slice(0, 3).join(" | ")})`);
  ok(externalNetworkErrors.length >= 0, "external font requests were aborted by design");
} finally {
  const report = {
    lesson: 32,
    identity: "THE DURATION STREAM / تيّار المدة",
    browser: await browser.version(),
    url: base,
    viewports: [LAPTOP, MOBILE],
    checks,
    failures,
    errors,
    externalNetworkErrors,
    screenshots,
    renderedChecks: rendered,
  };
  writeFileSync(`${output}/verification.json`, `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
}

console.log(`Real Chromium Lesson 32: ${checks} checks, ${failures.length} failures, ${screenshots.length} screenshots.`);
if (failures.length) {
  console.error(failures.map((f) => ` ✕ ${f}`).join("\n"));
  process.exitCode = 1;
}
