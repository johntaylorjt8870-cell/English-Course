// ============================================================
// Lesson 59 — تدقيق متصفح حقيقي (Chromium)
//
// يتحقق من: فتح المسار من الفهرس ومن الدرس 58، وجود كل المحطات، عمل كل
// مختبر تفاعلي (ولا يُظهر حكمًا قبل الضغط على التحقق)، الاختبار المشترك
// (15 سؤالًا بلا كشف قبل التسليم ثم النتيجة)، فضاء المعلم، عدم الفائض
// الأفقي وعدم تداخل زر «التالي» مع زر قفل الموقع على 320/360/390/414/1280،
// وخلو الصفحة من أخطاء التشغيل.
//
//   npm run build && node scripts/audit-lesson59-browser.mjs
// ============================================================
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson59-browser";
mkdirSync(work, { recursive: true });
if (!existsSync(`${work}/lib`)) {
  writeFileSync(`${work}/tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
  execFileSync("tar", ["-xf", `${work}/tar`, "-C", work]);
}
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;

const dist = join(process.cwd(), "dist");
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png" };
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
mkdirSync("docs/lesson59-visual", { recursive: true });

const browser = await playwright.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const failures = [];
let checks = 0;
const ok = (cond, msg) => {
  checks += 1;
  if (!cond) failures.push(msg);
  console.log(`${cond ? "✓" : "✗"} ${msg}`);
};
const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
const errors = [];
const resourceFailures = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error" && !m.text().includes("ERR_CONNECTION_CLOSED")) errors.push(m.text());
});
page.on("requestfailed", (r) => resourceFailures.push(`${r.url()} ${r.failure()?.errorText || ""}`));
await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));

async function go(id) {
  let button = page.locator(`button[data-step-nav="${id}"]:visible`);
  if (!(await button.count())) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    button = page.locator(`button[data-step-nav="${id}"]:visible`);
  }
  await button.first().click();
  await page.waitForTimeout(120);
}

try {
  /* ---------- route + hub + navigation ---------- */
  await page.goto(`${base}#/lesson/59`, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="59"]').waitFor();
  ok(await page.locator("[data-l59-cover]").count() === 1, "direct route #/lesson/59 opens the lesson cover");
  ok(norm(await page.locator("[data-l59-cover]").innerText()).includes("ADVANCED PASSIVE"), "cover shows the lesson title");
  ok(norm(await page.locator("[data-l59-cover]").innerText()).includes("11 قسمًا"), "cover states full source scope");
  await page.screenshot({ path: "docs/lesson59-visual/browser-01-cover.png" });

  await page.goto(`${base}#/`, { waitUntil: "networkidle" });
  const hubCard = page.locator('a.group[href="#/lesson/59"]');
  ok(await hubCard.count() === 1, "course hub has one dedicated card for lesson 59");
  await hubCard.click();
  await page.locator('[data-lesson="59"]').waitFor();
  ok(await page.locator("[data-l59-cover]").count() === 1, "hub card opens the lesson");

  await page.goto(`${base}#/lesson/58`, { waitUntil: "networkidle" });
  await go("progress");
  const onward = page.locator('a[href="#/lesson/59"]');
  ok(await onward.count() === 1, "lesson 58 keeps its onward link to lesson 59");
  await onward.first().click();
  await page.locator('[data-lesson="59"]').waitFor();
  ok(await page.locator("[data-l59-cover]").count() === 1, "lesson 58 → lesson 59 navigation works");

  await go("progress");
  ok(await page.locator('a[href="#/lesson/58"]').count() === 1, "lesson 59 links back to lesson 58");
  await page.locator('a[href="#/lesson/58"]').first().click();
  await page.locator('[data-lesson="58"]').waitFor();
  ok(await page.locator('[data-lesson="58"]').count() === 1, "back navigation to lesson 58 works");
  await page.goto(`${base}#/lesson/59`, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="59"]').waitFor();

  /* ---------- source sections render with real content ---------- */
  await go("s1");
  ok(norm(await page.locator("#l59-main .l59-title").first().innerText()).includes("القاعدة الأساسية"), "section 1 renders its title");
  ok(await page.locator('#l59-main .l59-title-en:has-text("Modal Verb + be + V3")').count() === 1, "section 1 shows the LTR rule");
  ok(await page.locator("#l59-main .l59-pair").count() === 4, "section 1 renders the four opening pairs");
  const goodTags = await page.locator("#l59-main .l59-tags span.is-good").count();
  const badTags = await page.locator("#l59-main .l59-tags span.is-bad").count();
  ok(goodTags === 6 && badTags === 3, `section 1 keeps 6 correct and 3 wrong forms (${goodTags}/${badTags})`);

  await go("s2");
  ok(await page.locator("#l59-main .l59-usage-tabs button").count() === 3, "CAN shows its three uses as tabs");
  ok(await page.locator("#l59-main .l59-pair").count() === 2, "CAN renders both original pairs");
  await page.locator("#l59-main .l59-usage-tabs button").nth(2).click();
  ok(norm(await page.locator("#l59-main .l59-usage-body").innerText()).includes("This entrance can be used by visitors."), "CAN permission-tab content updates on demand");

  await go("s4");
  ok(norm(await page.locator("#l59-main").innerText()).includes("Must the report be submitted today?"), "MUST question form renders");
  ok(norm(await page.locator("#l59-main .l59-warn").last().innerText()).includes("must not be opened"), "MUST prohibition contrast renders (must not be opened)");
  ok(norm(await page.locator("#l59-main .l59-block--neg .l59-warn").innerText()).includes("المنع"), "MUST negative block explains prohibition rather than absence of necessity");

  await go("s7");
  ok(norm(await page.locator("#l59-main").innerText()).includes("Uniforms have to be worn by students."), "HAVE TO passive example renders");
  ok(norm(await page.locator("#l59-main").innerText()).includes("doesn't have to be submitted"), "don't have to ≠ prohibition renders");

  await go("s10");
  ok(await page.locator("#l59-main .l59-pair").count() === 4, "SHOULD HAVE BEEN keeps four pairs");
  ok(norm(await page.locator("#l59-main").innerText()).includes("should have been signed by the manager"), "perfect passive questions render");

  await go("s12");
  ok(norm(await page.locator("#l59-main").innerText()).includes("must have been stolen"), "MUST HAVE BEEN deduction examples render");
  ok(norm(await page.locator("#l59-main").innerText()).includes("can't have been sent"), "natural negative can't have been renders");

  await go("s14");
  ok(norm(await page.locator("#l59-main").innerText()).includes("needs to be repaired"), "NEEDS TO BE examples render");
  ok(norm(await page.locator("#l59-main").innerText()).includes("needs repairing"), "needs repairing contrast renders");

  await go("s17");
  ok(await page.locator("#l59-main .l59-lines > div").count() >= 8, "causative section renders all source examples");

  await go("s18");
  ok(await page.locator("#l59-main .l59-table-row").count() === 15, "master table renders all fifteen rows");

  await go("s19");
  ok(await page.locator("#l59-main .l59-ladder-row").count() === 7, "The report ladder renders seven contrasts");

  await go("s20");
  ok(await page.locator("#l59-main .l59-lines > div").count() >= 8, "eight transformation steps render");

  await go("s21");
  ok(await page.locator("#l59-main .l59-error-row").count() === 7, "seven common mistakes render");

  await go("s22");
  ok(await page.locator("#l59-main .l59-line").count() === 9, "dialogue renders nine turns");
  ok(await page.locator("#l59-main .l59-attempt").count() === 7, "dialogue renders seven answerable questions");

  await go("s23");
  ok(await page.locator("#l59-main .l59-article-body p").count() === 5, "reading renders five English paragraphs");
  await page.locator("#l59-main .l59-disclosure summary").first().click();
  ok(await page.locator("#l59-main .l59-disclosure p").count() === 5, "full Arabic translation opens");
  ok(await page.locator("#l59-main .l59-attempt").count() === 8, "reading renders eight comprehension questions");

  /* ---------- practice behaviour ---------- */
  await go("p1");
  const first = page.locator("#l59-main .l59-attempt").first();
  await first.locator(".l59-choice-list button").nth(1).click();
  ok(await first.locator(".l59-feedback").count() === 0, "choosing an answer does not reveal correctness");
  await first.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  ok(await first.locator(".l59-feedback").count() === 1, "feedback appears only after explicit check");
  await first.getByRole("button", { name: "إعادة المحاولة" }).click();
  ok(await first.locator(".l59-feedback").count() === 0, "retry clears answer and feedback");

  await go("p2");
  const typed = page.locator("#l59-main .l59-attempt").first();
  await typed.locator('input[type="text"]').fill("This problem can be solved.");
  await typed.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  ok(norm(await typed.locator(".l59-feedback").innerText()).includes("إجابة صحيحة"), "typed transformation answer is accepted");

  for (const id of ["p3", "p4", "p5", "p6", "p7", "p8", "p9"]) {
    await go(id);
    ok((await page.locator("#l59-main .l59-attempt").count()) >= 5, `${id} renders its items`);
  }

  /* ---------- original test ---------- */
  await go("s24");
  ok(await page.locator("#l59-main .l59-attempt").count() === 25, "original 25-question test renders");
  await go("s25");
  ok(await page.locator("#l59-main .l59-key details").count() === 25, "original key keeps 25 entries");
  await go("s26");
  ok(await page.locator("#l59-main .l59-attempt").count() === 10, "extra review renders the ten remaining original questions");

  /* ---------- labs ---------- */
  await go("explorer");
  ok(await page.locator('[data-l59-lab="explorer"]').count() === 1, "Modal Meaning Explorer mounts");
  const explorerOut = page.locator('[data-l59-lab="explorer"] .l59-explorer-out');
  await page.locator('[data-l59-lab="explorer"] .l59-explorer-buttons button').nth(2).click();
  ok(norm(await explorerOut.innerText()).includes("must be completed"), "modal switch rewrites the sentence and keeps be + V3");
  await page.locator('[data-l59-lab="explorer"] .l59-choice-list button').first().click();
  ok(await page.locator('[data-l59-lab="explorer"] .l59-lab-result').count() === 0, "explorer quiz hides judgement before check");
  await page.locator('[data-l59-lab="explorer"]').getByRole("button", { name: "تحقّق" }).click();
  ok(await page.locator('[data-l59-lab="explorer"] .l59-lab-result').count() === 1, "explorer quiz explains after check");

  await go("builder");
  const builder = page.locator('[data-l59-lab="builder"]');
  ok(await builder.locator(".l59-builder-slots .l59-builder-slot").count() === 4, "builder exposes four slots");
  const pick = async (slot, label) => builder.locator(".l59-builder-slot").nth(slot).getByRole("button", { name: label, exact: true }).click();
  await pick(0, "The road");
  await pick(1, "can");
  await pick(2, "be");
  await pick(3, "repaired");
  ok(norm(await builder.locator(".l59-builder-out .l59-en").innerText()).includes("The road can be repaired."), "builder assembles the learner's sentence");
  ok(await builder.locator(".l59-lab-result").count() === 0, "builder does not grade on selection");
  await builder.getByRole("button", { name: "تحقّق من التركيب" }).click();
  ok(norm(await builder.locator(".l59-lab-result").innerText()).includes("تركيب صحيح"), "builder confirms a correct structure");
  await builder.getByRole("button", { name: /مسح/ }).click();
  ok(norm(await builder.locator(".l59-builder-out .l59-en").innerText()).trim() === "…", "builder reset clears the sentence");

  await go("timeline");
  const timeline = page.locator('[data-l59-lab="timeline"]');
  ok(await timeline.locator(".l59-timeline-row").count() === 4, "timeline shows the four contrasted structures");
  await timeline.getByRole("tab", { name: "اختبر نفسك" }).click();
  ok(await timeline.locator(".l59-lab-result").count() === 0, "timeline quiz starts without answers");
  const timelineBlocks = timeline.locator(".l59-block");
  for (let i = 0; i < 4; i += 1) await timelineBlocks.nth(i).locator(".l59-choice-list button").first().click();
  await timeline.getByRole("button", { name: "تحقّق من الإجابات" }).click();
  ok(await timeline.locator(".l59-lab-result").count() === 4, "timeline quiz grades every item after check");

  await go("detective");
  const detective = page.locator('[data-l59-lab="detective"]');
  ok(await detective.locator(".l59-error-row").count() === 7, "detective lists seven meanings");
  ok(await detective.locator(".l59-lab-result").count() === 0, "detective hides explanations before checking");
  for (let i = 0; i < 7; i += 1) await detective.locator(".l59-error-row").nth(i).locator(".l59-choice-list button").nth(i % 6).click();
  await detective.getByRole("button", { name: "تحقّق من الملاحظات" }).click();
  ok(await detective.locator(".l59-lab-result").count() === 7, "detective explains all seven after check");

  await go("engine");
  const engine = page.locator('[data-l59-lab="engine"]');
  ok(await engine.locator("[data-l59-next-stage]").count() === 1, "engine shows only the next stage, not the answer");
  await engine.getByRole("button", { name: "ابدأ التحويل" }).click();
  ok(norm(await engine.locator(".l59-engine-stage.is-latest").innerText()).includes("The lesson"), "engine reveals the first transformation stage");
  for (let i = 0; i < 3; i += 1) await engine.getByRole("button", { name: /الخطوة التالية/ }).click();
  ok(norm(await engine.locator(".l59-lab-result").innerText()).includes("The lesson can be explained by the teacher."), "engine completes the passive sentence step by step");

  await go("causative");
  const causative = page.locator('[data-l59-lab="causative"]');
  ok(await causative.locator(".l59-causative article").count() === 3, "causative lab compares three sentences");
  await causative.locator(".l59-causative article").nth(1).getByRole("button", { name: "اقرأ الفرق" }).click();
  ok(norm(await causative.locator(".l59-note").innerText()).includes("I had the car repaired."), "causative explanation follows the selected card");
  const causativeBlocks = causative.locator(".l59-block");
  for (let i = 0; i < 3; i += 1) await causativeBlocks.nth(i).locator(".l59-choice-list button").nth(1).click();
  await causative.getByRole("button", { name: "تحقّق من الفروق" }).click();
  ok(await causative.locator(".l59-lab-result").count() === 3, "causative quiz returns three graded results");

  await go("errors");
  const errorLab = page.locator('[data-l59-lab="errors"]');
  ok(await errorLab.locator(".l59-error-row").count() === 7, "error lab lists all seven mistakes");
  ok(await errorLab.locator(".l59-lab-result").count() === 0, "error lab hides corrections before check");
  for (let i = 0; i < 7; i += 1) await errorLab.locator(".l59-error-row").nth(i).locator(".l59-choice-list button").first().click();
  await errorLab.getByRole("button", { name: "تحقّق من الإصلاحات" }).click();
  ok(await errorLab.locator(".l59-lab-result").count() === 7, "error lab explains all seven corrections");

  await go("contrast");
  await page.locator('[data-l59-lab="contrast"] .l59-usage-tabs button').nth(1).click();
  ok(norm(await page.locator('[data-l59-lab="contrast"] .l59-explorer-out').innerText()).includes("must have been"), "structure contrast switches to the past form");

  await go("drill");
  const drill = page.locator('[data-l59-lab="advanced-drill"]');
  const drillTarget = norm(await drill.locator(".l59-block .l59-en").innerText());
  ok(drillTarget.length > 10, "advanced drill shows a full source sentence");
  await drill.locator('input[type="text"]').fill("اختبار");
  await drill.getByRole("button", { name: "قارن بالمعنى" }).click();
  ok(norm(await drill.locator(".l59-feedback").innerText()).includes("المعنى الأصلي"), "advanced drill compares against the source meaning");

  await go("v3");
  const v3Rows = page.locator('[data-l59-lab="v3"] .l59-tags > span');
  ok(await v3Rows.count() === 29, "V3 lab lists all twenty-nine verbs (20 regular + 9 irregular)");
  await page.locator('[data-l59-lab="v3"] input[type="text"]').fill("steal");
  ok(await v3Rows.count() === 1, "V3 lab search filters down to the matching verb");
  ok(norm(await v3Rows.first().innerText()).includes("stolen"), "V3 lab search keeps the irregular past participle");

  /* ---------- shared final test ---------- */
  await go("final-test");
  const quiz = page.locator('[data-final-test="59"]');
  ok(await quiz.locator("[data-ft-q]").count() === 15, "shared FinalTest renders fifteen questions");
  ok(await quiz.locator("[data-ft-verdict]").count() === 0, "no verdict before submission");
  const questions = quiz.locator("[data-ft-q]");
  for (let i = 0; i < 15; i += 1) {
    const q = questions.nth(i);
    const type = await q.getAttribute("data-ft-type");
    if (type === "single" || type === "error") await q.locator("label").first().click();
    else if (type === "typed") await q.locator('input[type="text"]').fill("The manager should have been informed.");
    else if (type === "match") {
      const selects = q.locator("select");
      const n = await selects.count();
      for (let j = 0; j < n; j += 1) await selects.nth(j).selectOption({ index: j + 1 });
    }
    await page.waitForTimeout(30);
  }
  ok(await quiz.locator("[data-ft-verdict]").count() === 0, "answering every question still reveals nothing");
  const submit = quiz.getByRole("button", { name: /تصحيح الاختبار/ });
  ok(await submit.isEnabled(), "submit becomes available once all fifteen are answered");
  await submit.click();
  ok(await quiz.locator("[data-ft-verdict]").count() === 15, "after submission every question is graded");
  ok(await quiz.locator("[data-ft-result]").count() === 1, "result summary appears after grading");
  await page.screenshot({ path: "docs/lesson59-visual/browser-02-final-test.png" });
  const finalScoreText = norm(await quiz.locator("[data-ft-result]").first().innerText());
  ok(/النتيجة/.test(norm(await quiz.locator("[data-ft-bar]").innerText())), `result text rendered (${finalScoreText}%)`);
  await go("s1");
  await go("final-test");
  ok(await quiz.locator("[data-ft-verdict]").count() === 15, "final-test state survives navigation (no new quiz system)");

  /* ---------- teacher area ---------- */
  await go("teacher");
  const teacher = page.locator('[data-teacher-area="59"]');
  ok(await teacher.locator('input[type="password"]').count() === 1, "teacher gate asks for a password");
  await teacher.locator('input[type="password"]').fill("wrong");
  await teacher.getByRole("button", { name: "فتح فضاء المعلم" }).click();
  ok(await teacher.getByRole("alert").count() === 1, "wrong password is rejected");
  await teacher.locator('input[type="password"]').fill("somer173");
  await teacher.getByRole("button", { name: "فتح فضاء المعلم" }).click();
  ok(await page.locator('[data-ft-key="59"] [data-ft-key-item]').count() === 15, "teacher key exposes the shared fifteen-question key");
  ok(await page.locator('[data-teacher-area="59"] details').count() >= 12, "teacher area keeps practice + original-test keys");
  await page.screenshot({ path: "docs/lesson59-visual/browser-03-teacher.png" });

  /* ---------- responsive + lock overlap ---------- */
  for (const width of [320, 360, 390, 414, 1280]) {
    await page.setViewportSize({ width, height: 860 });
    await go("cover");
    const metrics = await page.evaluate(() => ({
      inner: innerWidth,
      doc: document.documentElement.scrollWidth,
      main: document.querySelector("#l59-main")?.clientWidth,
      scroll: document.querySelector("#l59-main")?.scrollWidth,
    }));
    ok(metrics.doc <= width + 1, `${width}px: no horizontal document overflow (${metrics.doc})`);
    ok(!metrics.main || metrics.scroll <= metrics.main + 1, `${width}px: lesson column does not overflow (${metrics.scroll}/${metrics.main})`);
    const overlap = await page.evaluate(() => {
      const next = document.querySelector('button[data-step-nav="next"]');
      const lock = document.querySelector(".site-lock-btn");
      if (!next || !lock) return { found: false };
      const a = next.getBoundingClientRect();
      const b = lock.getBoundingClientRect();
      const cross = a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1;
      return { found: true, cross };
    });
    ok(overlap.found && overlap.cross === false, `${width}px: next button never overlaps the site-lock button`);
    await go("s12");
    const sectionOverflow = await page.evaluate(() => {
      const main = document.querySelector("#l59-main");
      return main ? main.scrollWidth - main.clientWidth : 0;
    });
    ok(sectionOverflow <= 1, `${width}px: rich console section stays inside the column (${sectionOverflow})`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await go("s2");
  await page.screenshot({ path: "docs/lesson59-visual/browser-04-390-modal.png" });
  await page.setViewportSize({ width: 320, height: 780 });
  await go("p1");
  await page.screenshot({ path: "docs/lesson59-visual/browser-05-320-practice.png" });

  /* ---------- runtime errors ---------- */
  ok(errors.length === 0, `no runtime/console errors (${errors.length})${errors.length ? ` → ${errors.slice(0, 3).join(" | ")}` : ""}`);
  ok(
    resourceFailures.every((x) => x.includes("fonts.googleapis.com") || x.includes("fonts.gstatic.com")),
    `only external font requests failed if any (${resourceFailures.length})`,
  );
} finally {
  await browser.close();
  server.close();
}

console.log(`\nLesson 59 browser audit: ${checks - failures.length}/${checks} passed`);
if (failures.length) {
  console.error(failures.map((f) => `- ${f}`).join("\n"));
  process.exitCode = 1;
}
