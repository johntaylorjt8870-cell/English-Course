// ============================================================
// Lesson 57 — تدقيق متصفح حقيقي (Chromium)
//
// يتحقق من: المسار وفتح الدرس من الفهرس ومن الدرس 56، كل الخطوات على
// سبعة عروض، عدم تجاوز العرض وعدم تداخل زر «التالي» مع قفل الموقع،
// إخفاء الأحكام قبل التحقق في كل مختبر، الاختبار النهائي (15 سؤالًا،
// لا كشف قبل التسليم، النتيجة، فضاء المعلم)، بقاء الحالة بين الخطوات،
// وخلو صفحة المتصفح من الأخطاء.
//
//   node scripts/audit-lesson57-browser.mjs
// ============================================================
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson57-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const dist = join(process.cwd(), "dist");
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  const raw = (req.url || "/").split("?")[0];
  const rel = raw.startsWith("/English-Course/") ? raw.slice(16) : raw.replace(/^\/+/, "");
  const path = normalize(join(dist, rel || "index.html"));
  const file = path.startsWith(dist) && existsSync(path) && statSync(path).isFile() ? path : join(dist, "index.html");
  res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/English-Course/`;

let browser;
const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) failures.push(msg);
};
const norm = (s) => (s ?? "").replace(/\s+/g, " ").trim();

try {
  browser = await playwright.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
  const page = await browser.newPage();
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  const go = async (id) => {
    let nav = page.locator(`button[data-step-nav="${id}"]:visible`);
    if (!(await nav.count())) {
      await page.getByRole("button", { name: "فهرس الدرس" }).click();
      nav = page.locator(`button[data-step-nav="${id}"]:visible`);
    }
    await nav.first().click();
  };

  // ---------- 1. المسار ----------
  await page.goto(`${base}#/lesson/57`, { waitUntil: "networkidle" });
  ok((await page.locator('[data-lesson="57"]').count()) === 1, "route 57 renders the lesson");

  await page.goto(`${base}#/`, { waitUntil: "networkidle" });
  await page.locator('a[href="#/lesson/57"]').last().click();
  await page.locator('[data-lesson="57"]').waitFor();
  ok((await page.locator('[data-lesson="57"]').count()) === 1, "hub card opens lesson 57");

  await page.goto(`${base}#/lesson/56`, { waitUntil: "networkidle" });
  await go("progress");
  ok((await page.locator('a[href="#/lesson/57"]').count()) === 1, "lesson 56 progress links forward to lesson 57");
  await page.locator('a[href="#/lesson/57"]').click();
  await page.locator('[data-lesson="57"]').waitFor();
  ok((await page.locator('[data-lesson="57"]').count()) === 1, "lesson 56 progress link opens lesson 57");
  await page.goto(`${base}#/lesson/57`, { waitUntil: "networkidle" });

  // ---------- 2. كل الخطوات على كل العروض ----------
  const counterText = norm(await page.locator("header bdi").first().textContent());
  const total = Number(counterText.split("/")[1]);
  ok(total >= 45, `lesson has a substantial step count (${total})`);

  for (const width of [375, 390, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await go("cover");
    for (let i = 0; i < total; i++) {
      const m = await page.evaluate(() => {
        const main = document.querySelector("#l57-main");
        const next = document.querySelector('button[data-step-nav="next"]');
        const vis = (e) => e && e.getClientRects().length && getComputedStyle(e).visibility !== "hidden";
        const lock = [...document.querySelectorAll('[data-site-lock-button="true"]')].find(vis);
        const a = vis(next) && next.getBoundingClientRect();
        const b = vis(lock) && lock.getBoundingClientRect();
        return {
          doc: document.documentElement.scrollWidth,
          width: innerWidth,
          content: main.scrollWidth,
          client: main.clientWidth,
          overlap: !!(a && b && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom),
        };
      });
      ok(m.doc <= m.width + 1, `${width}px slide ${i + 1}: no horizontal page overflow`);
      ok(m.content <= m.client + 1, `${width}px slide ${i + 1}: content fits its column`);
      ok(!m.overlap, `${width}px slide ${i + 1}: next button does not overlap site lock`);
      if (i < total - 1) await page.locator('button[data-step-nav="next"]').click();
    }
  }

  // ---------- 3. لا حكم قبل التحقق في المختبرات ----------
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const id of ["be-choose", "analysis-lab", "neg-lab", "by-lab", "transitive-lab", "compare-lab", "v3-lab", "shift-lab", "error-lab", "question-lab"]) {
    await go(id);
    const lab = page.locator("#l57-main .l57-lab").first();
    ok((await lab.locator(".l57-verdict, .l57-result").count()) === 0, `${id}: no verdict/answer visible before checking`);
  }

  // مختبر be: اختيار ثم تحقق
  await go("be-choose");
  {
    const lab = page.locator("#l57-main .l57-lab").first();
    await lab.locator(".l57-options button", { hasText: "is" }).first().click();
    ok((await lab.locator(".l57-verdict").count()) === 0, "be lab: choosing alone reveals nothing");
    await lab.getByRole("button", { name: "تحقّق" }).click();
    ok((await lab.locator(".l57-verdict").count()) === 1, "be lab: verdict appears after check");
  }

  // مختبر التحليل: إسناد الأدوار
  await go("analysis-lab");
  {
    const lab = page.locator("#l57-main .l57-lab").first();
    const tokens = lab.locator(".l57-analysis-token");
    ok((await tokens.count()) === 3, "analysis-lab: three tokens");
    // Subject → first token, Verb → second, Object → third
    await lab.locator(".l57-role-picker button").nth(0).click();
    await tokens.nth(0).click();
    await lab.locator(".l57-role-picker button").nth(1).click();
    await tokens.nth(1).click();
    await lab.locator(".l57-role-picker button").nth(2).click();
    await tokens.nth(2).click();
    await lab.getByRole("button", { name: "تحقّق من التحليل" }).click();
    const text = norm(await lab.locator('[role="status"]').textContent());
    ok(text.includes("تحليل صحيح"), "analysis-lab: correct analysis feedback");
  }

  // مختبر التحويل: بناء الجملة الأولى
  await go("shift-lab");
  {
    const lab = page.locator("#l57-main .l57-lab").first();
    await lab.locator(".l57-stage").nth(0).locator("button", { hasText: "The room" }).click();
    await lab.locator(".l57-stage").nth(1).locator("button", { hasText: "is" }).click();
    await lab.locator(".l57-stage").nth(2).locator("button", { hasText: "cleaned" }).click();
    await lab.locator(".l57-stage").nth(3).locator("button", { hasText: "أذكره" }).click();
    ok((await lab.locator(".l57-result").count()) === 0, "shift-lab: no result before assembling");
    await lab.getByRole("button", { name: "ركّب الجملة" }).click();
    const text = norm(await lab.locator('[role="status"]').textContent());
    ok(text.includes("The room is cleaned by Ali."), "shift-lab: assembled passive sentence shown");
    ok(text.includes("الغرفة يتم تنظيفها بواسطة علي."), "shift-lab: Arabic translation shown");
  }

  // مختبر النفي: موضع not
  await go("neg-lab");
  {
    const lab = page.locator("#l57-main .l57-lab").first();
    await lab.locator(".l57-options button", { hasText: "بعد فعل be وقبل V3" }).click();
    await lab.getByRole("button", { name: "تحقّق" }).click();
    ok(norm(await lab.locator('[role="status"]').textContent()).includes("صحيح"), "neg-lab: correct placement feedback");
  }

  // مختبر الأخطاء
  await go("error-lab");
  {
    const lab = page.locator("#l57-main .l57-lab").first();
    await lab.locator(".l57-segment").nth(1).click();
    await lab.getByRole("button", { name: "تحقّق" }).click();
    ok(norm(await lab.locator('[role="status"]').textContent()).includes("أصبت موضع الخطأ"), "error-lab: error spot feedback");
    ok((await lab.locator(".l57-error-line").count()) === 2, "error-lab: wrong + corrected lines visible after check");
  }

  // مختبر السؤال: ترتيب
  await go("question-lab");
  {
    const lab = page.locator("#l57-main .l57-lab").first();
    for (const part of ["Is", "the room", "cleaned", "every day?"]) {
      await lab.locator(".l57-build-bank button", { hasText: part }).first().click();
    }
    await lab.getByRole("button", { name: "تحقّق" }).click();
    ok(norm(await lab.locator('[role="status"]').textContent()).includes("ترتيب صحيح"), "question-lab: ordering feedback");
  }

  // بقاء الحالة بين الخطوات
  await go("cover");
  await go("analysis-lab");
  ok((await page.locator("#l57-main .l57-analysis-token.is-subject").count()) === 1, "analysis-lab state survives step navigation");

  // ---------- 4. التمارين ----------
  await go("practice-6");
  {
    const cards = page.locator("#l57-main .l57-practice-card");
    ok((await cards.count()) === 10, "practice 6 has ten items");
    const card = cards.first();
    ok((await card.locator(".l57-practice-feedback").count()) === 0, "practice item hides feedback initially");
    await card.locator('input[type="text"]').fill("written");
    await card.getByRole("button", { name: "تحقّق" }).click();
    ok(norm(await card.locator(".l57-practice-feedback").textContent()).includes("مطابق للنموذج"), "practice item confirms correct answer");
  }
  await go("practice-1");
  {
    const cards = page.locator("#l57-main .l57-practice-card");
    ok((await cards.count()) === 10, "practice 1 has ten items");
    await cards.first().locator("button", { hasText: "Active" }).click();
    await cards.first().getByRole("button", { name: "تحقّق" }).click();
    ok(norm(await cards.first().locator(".l57-practice-feedback").textContent()).includes("إجابة صحيحة"), "practice 1 feedback after check");
  }
  await go("practice-2");
  {
    const card = page.locator("#l57-main .l57-practice-card").first();
    const selects = card.locator("select");
    await selects.nth(0).selectOption({ label: "The boy" });
    await selects.nth(1).selectOption({ label: "kicks" });
    await selects.nth(2).selectOption({ label: "the ball" });
    await card.getByRole("button", { name: "تحقّق" }).click();
    ok(norm(await card.locator(".l57-practice-feedback").textContent()).includes("تحليل صحيح"), "practice 2 analysis feedback");
  }
  await go("practice-10");
  ok((await page.locator("#l57-main .l57-practice-card").count()) === 24, "practice 10 carries all 25 original assessment items");

  // ---------- 5. الحوار والقراءة ----------
  await go("dialogue");
  ok((await page.locator("#l57-main .l57-bubble").count()) === 10, "dialogue has ten lines");
  {
    const bubble = page.locator("#l57-main .l57-bubble").first();
    ok((await bubble.locator(".l57-bubble-ar").count()) === 0, "dialogue translation hidden initially");
    await bubble.getByRole("button", { name: "الترجمة" }).click();
    ok((await bubble.locator(".l57-bubble-ar").count()) === 1, "dialogue translation opens");
  }
  await go("reading");
  {
    const body = norm(await page.locator("#l57-main .l57-reading-body").textContent());
    ok(body.includes("Many products are made in factories around the world."), "reading passage renders");
    await page.getByRole("button", { name: "أظهر الترجمة العربية" }).click();
    ok((await page.locator("#l57-main .l57-reading-ar").count()) === 6, "reading Arabic translation toggles");
  }
  await go("vocabulary");
  ok((await page.locator("#l57-main .l57-vocab-card").count()) === 16, "16 vocabulary cards");

  // ---------- 6. الاختبار النهائي ----------
  await go("test");
  const root = page.locator('[data-final-test="57"]');
  ok((await root.count()) === 1, "final test present");
  ok((await root.locator("ol > li").count()) === 15, "final test has exactly 15 questions");
  ok((await root.locator("[data-ft-result]").count()) === 0, "no result before submission");
  ok(!(await root.innerText()).includes("بعد is نستخدم V3."), "explanation hidden before submission");

  // شريط «تصحيح الاختبار» الثابت: معتم، ملتصق بأسفل منطقة التمرير فعلًا،
  // ولا يحجب نص السؤال ولا الخيارات ولا الملاحظة ولا زر التنقل (عيب ظهر على الهاتف).
  // حالة ما قبل الإجابة: زر «إعادة» والنص الإرشادي كانا في الخلية نفسها (تداخل حقيقي)
  for (const w of [320, 390, 414]) {
    await page.setViewportSize({ width: w, height: 844 });
    await page.waitForTimeout(180);
    const state = await page.evaluate(() => {
      const wrap = document.querySelector('[data-final-test="57"] [data-ft-bar]').firstElementChild;
      const kids = [...wrap.children].map((el) => {
        const q = el.getBoundingClientRect();
        return { tag: el.tagName, txt: (el.textContent || "").trim().slice(0, 16), x: q.x, y: q.y, w: q.width, h: q.height };
      });
      const overlaps = [];
      for (let i = 0; i < kids.length; i++)
        for (let j = i + 1; j < kids.length; j++) {
          const a = kids[i];
          const b = kids[j];
          if (a.x < b.x + b.w - 1 && b.x < a.x + a.w - 1 && a.y < b.y + b.h - 1 && b.y < a.y + a.h - 1)
            overlaps.push(`${a.txt}/${b.txt}`);
        }
      const inside = kids.every((k) => {
        const wrapBox = wrap.getBoundingClientRect();
        return k.x >= wrapBox.x - 1 && k.x + k.w <= wrapBox.x + wrapBox.width + 1;
      });
      return { overlaps, inside, hasReset: kids.some((k) => k.txt.includes("إعادة")), hasHint: kids.some((k) => k.txt.includes("أجب")) };
    });
    ok(state.overlaps.length === 0, `${w}px pre-submit: submit-bar children never overlap (${state.overlaps.join(",")})`);
    ok(state.inside, `${w}px pre-submit: submit-bar children stay inside the bar`);
    ok(state.hasReset && state.hasHint, `${w}px pre-submit: both reset button and hint remain present`);
  }

  for (const [w, h] of [[320, 720], [390, 844], [768, 900], [1280, 900]]) {
    await page.setViewportSize({ width: w, height: h });
    for (const where of ["start", "middle", "end"]) {
      const geo = await page.evaluate((pos) => {
        const scroller = document.querySelector(".lesson-main-scroll");
        const rootEl = document.querySelector('[data-final-test="57"]');
        const barEl = rootEl.querySelector("[data-ft-bar]").firstElementChild;
        const cs = getComputedStyle(barEl);
        const to = pos === "start" ? 0 : pos === "middle" ? 2600 : scroller.scrollHeight;
        scroller.scrollTop = to;
        // القياس بعد تثبيت التمرير: موضع الشريط وموضع آخر سؤال في اللحظة نفسها
        const bar = barEl.getBoundingClientRect();
        const sc = scroller.getBoundingClientRect();
        const items = [...rootEl.querySelectorAll("ol > li")];
        const last = items[items.length - 1].getBoundingClientRect();
        const next = document.querySelector('button[data-step-nav="next"]').getBoundingClientRect();
        const lockEl = document.querySelector('[data-site-lock-button="true"]');
        const lq = lockEl.getBoundingClientRect();
        const mid = (q) => document.elementFromPoint(Math.round(q.left + q.width / 2), Math.round(q.top + q.height / 2));
        const hits = (el, q) => {
          const top = mid(q);
          return !!top && (el.contains(top) || top.closest(el.tagName.toLowerCase()) === el);
        };
        const opaque = (() => {
          const m = cs.backgroundColor.match(/[\d.]+/g);
          if (!m || cs.backgroundColor === "transparent") return false;
          return m.length < 4 || Number(m[3]) >= 0.99;
        })();
        return {
          opaque,
          backdrop: cs.backdropFilter === "none" || cs.backdropFilter === "",
          overlapsNext: bar.bottom > next.top && bar.top < next.bottom && bar.left < next.right && bar.right > next.left,
          nextClickable: hits(document.querySelector('button[data-step-nav="next"]'), next),
          lockClickable: hits(lockEl, lq),
          heightPct: Math.round((bar.height / innerHeight) * 100),
          atEnd: Math.abs(scroller.scrollTop - (scroller.scrollHeight - scroller.clientHeight)) < 2,
          lastClearsBar: last.bottom <= bar.top + 2,
          barInsideScrollport: bar.bottom <= sc.bottom + 2,
          // «ملتصق» = الشريط في قاع منطقة التمرير. قبل أول تمرير يمكن أن يكون
          // في موضعه الطبيعي آخر المحتوى (تُقصّه منطقة التمرير) وهذا سلوك سليم.
          stuck: Math.abs(bar.bottom - sc.bottom) <= 2,
        };
      }, where);
      ok(geo.opaque, `${w}px ${where}: submit bar is opaque (question text cannot ghost through)`);
      ok(geo.backdrop, `${w}px ${where}: submit bar uses no translucent backdrop blur`);
      if (geo.stuck) ok(geo.barInsideScrollport, `${w}px ${where}: a stuck submit bar stays inside the scroll area`);
      ok(geo.nextClickable && geo.lockClickable, `${w}px ${where}: next and lock stay clickable above the bar`);
      if (geo.stuck) ok(!geo.overlapsNext, `${w}px ${where}: a stuck submit bar never covers the next/lock navigation`);
      ok(geo.heightPct <= 16, `${w}px ${where}: submit bar stays compact (${geo.heightPct}% of viewport)`);
      if (geo.atEnd) ok(geo.lastClearsBar, `${w}px ${where}: at the very end the bar clears the last question`);
    }
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => {
    document.querySelector(".lesson-main-scroll").scrollTop = Number.MAX_SAFE_INTEGER;
  });

  const answers = [
    ["tf", 0], // صحيح
    ["single", 1],
    ["single", 2],
    ["typed", "The lesson is explained by the teacher."],
    ["single", 1],
    ["error", 1],
    ["multi", [0, 2, 3]],
    ["tf", 1], // خطأ
    ["typed", "The door isn't locked."],
    ["order", ["Is", "English", "taught", "at this school?"]],
  ];
  for (let i = 0; i < answers.length; i++) {
    const [type, value] = answers[i];
    const q = root.locator(`[data-ft-q="${i + 1}"]`);
    if (type === "tf") await q.locator("input[type=radio]").nth(value).check();
    else if (type === "single") await q.locator("input[type=radio]").nth(value).check();
    else if (type === "error") await q.locator("input[type=radio]").nth(value).check();
    else if (type === "multi") for (const idx of value) await q.locator("input[type=checkbox]").nth(idx).check();
    else if (type === "typed") await q.locator('input[type="text"]').fill(value);
    else if (type === "order") for (const tok of value) await q.getByRole("button", { name: tok, exact: true }).click();
  }
  // ⑪ match
  {
    const q = root.locator('[data-ft-q="11"]');
    for (let i = 0; i < 4; i++) await q.locator("select").nth(i).selectOption(String(i));
  }
  // ⑫ single
  await root.locator('[data-ft-q="12"] input[type=radio]').nth(0).check();
  // ⑬ error
  await root.locator('[data-ft-q="13"] input[type=radio]').nth(2).check();
  // ⑭ typed
  await root.locator('[data-ft-q="14"] input[type="text"]').fill("English is spoken in many countries.");
  // ⑮ single
  await root.locator('[data-ft-q="15"] input[type=radio]').nth(1).check();

  ok(!(await root.locator("[data-ft-submit]").isDisabled()), "all 15 answers allow submission");

  await go("cover");
  await go("test");
  ok(await root.locator('[data-ft-q="3"] input[type=radio]').nth(2).isChecked(), "answers survive step navigation");
  ok((await root.locator("[data-ft-result]").count()) === 0, "still no result after navigating back");

  await root.locator("[data-ft-submit]").click();
  ok((await root.locator("[data-ft-result]").count()) === 1, "result appears after submission");
  for (const [w, h] of [[320, 720], [390, 844], [1280, 900]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.evaluate(() => {
      const s = document.querySelector(".lesson-main-scroll");
      s.scrollTop = Number.MAX_SAFE_INTEGER;
    });
    await page.waitForTimeout(250);
    const res = await page.evaluate(() => {
      const barEl = document.querySelector('[data-final-test="57"] [data-ft-bar]').firstElementChild;
      const cs = getComputedStyle(barEl);
      const bar = barEl.getBoundingClientRect();
      const sc = document.querySelector(".lesson-main-scroll").getBoundingClientRect();
      const pct = barEl.querySelector("[data-ft-result]");
      const pq = pct?.getBoundingClientRect();
      return {
        opaque: (() => {
          const m = cs.backgroundColor.match(/[\d.]+/g);
          return !!m && (m.length < 4 || Number(m[3]) >= 0.99);
        })(),
        inside: bar.bottom <= sc.bottom + 2,
        pctVisible: !!pq && pq.width >= 40 && pq.height >= 40 && pq.top >= sc.top && pq.bottom <= sc.bottom,
        heightPct: Math.round((bar.height / innerHeight) * 100),
        overlaps: (() => {
          const kids = [...barEl.children].map((el) => el.getBoundingClientRect());
          const out = [];
          for (let i = 0; i < kids.length; i++)
            for (let j = i + 1; j < kids.length; j++) {
              const a = kids[i];
              const b = kids[j];
              if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) out.push(`${i}/${j}`);
            }
          return out;
        })(),
      };
    });
    ok(res.opaque, `${w}px result: submit bar stays opaque after grading`);
    ok(res.inside, `${w}px result: submit bar stays inside the scroll area after grading`);
    ok(res.pctVisible, `${w}px result: score badge stays fully visible and tappable`);
    ok(res.overlaps.length === 0, `${w}px result: submit-bar children never overlap (${res.overlaps.join(",")})`);
    ok(res.heightPct <= 16, `${w}px result: result bar stays compact (${res.heightPct}% of viewport)`);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  const resultText = norm(await root.locator("[data-ft-result]").textContent());
  ok(resultText.includes("100%"), `perfect score reads 100% (got ${resultText})`);
  ok(norm(await root.innerText()).includes("بعد is نستخدم V3."), "explanation visible after submission");

  await root.locator("[data-ft-reset]").click();
  ok((await root.locator("[data-ft-result]").count()) === 0, "reset clears the result");
  ok(await root.locator("[data-ft-submit]").isDisabled(), "reset clears the answers");

  // ---------- 7. فضاء المعلم ----------
  await go("teacher");
  ok((await page.locator("[data-teacher-area]").count()) === 0, "teacher area locked by default");
  await page.getByLabel("كلمة مرور فضاء المعلم").fill("somer173");
  await page.getByRole("button", { name: "فتح المساحة" }).click();
  ok((await page.locator("[data-teacher-area]").count()) === 1, "teacher area unlocks with the teacher password");
  ok((await page.locator("[data-ft-key]").count()) === 1, "teacher sees the 15-question answer key");
  ok((await page.locator("[data-teacher-practice]").count()) === 95, "teacher sees the full practice key");

  // ---------- 8. الكتابة والتحدث ----------
  await go("writing");
  await page.getByLabel("مسودة فقرة الكتابة").fill("Many products are made in factories. They are checked by workers.");
  await go("summary");
  await go("writing");
  ok((await page.getByLabel("مسودة فقرة الكتابة").inputValue()).includes("Many products"), "writing draft persists across steps");

  await go("speaking");
  ok((await page.locator("#l57-main .l57-speak-card").count()) === 7, "seven speaking questions");

  await go("progress");
  ok((await page.locator("#l57-main").innerText()).includes("57 / 120"), "progress slide shows curriculum position");

  ok(!errors.length, `no page errors (${errors.join(" | ")})`);
} catch (e) {
  failures.push(`exception: ${e.stack}`);
} finally {
  if (browser) await browser.close();
  server.close();
}

console.log(`Lesson 57 browser audit: ${checks - failures.length}/${checks} passed`);
if (failures.length) {
  console.error(failures.slice(0, 40).join("\n"));
  process.exitCode = 1;
}
