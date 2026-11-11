// ============================================================
// Lesson 60 — تدقيق متصفح حقيقي (Chromium)
//
// يتحقق من: فتح المسار من الفهرس ومن الدرس 59، وجود كل المحطات،
// عرض الأقسام بمحتواها (لا عناوين فقط)، عمل كل مختبر تفاعلي
// (ولا يُظهر حكمًا قبل الضغط على التحقق)، الاختبار الأصلي 25 سؤالًا
// ومفتاحه، الاختبار المشترك (15 سؤالًا بلا كشف قبل التسليم ثم
// النتيجة)، فضاء المعلم، عدم الفائض الأفقي وعدم تداخل زر «التالي»
// مع زر قفل الموقع على 320/360/390/414/1280، وخلو الصفحة من أخطاء
// التشغيل.
//
//   npm run build && node scripts/audit-lesson60-browser.mjs
// ============================================================
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

const work = "node_modules/.lesson60-browser";
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
mkdirSync("docs/lesson60-visual", { recursive: true });

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
  await page.waitForTimeout(140);
}

try {
  /* ---------- route + hub + navigation ---------- */
  await page.goto(`${base}#/lesson/60`, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="60"]').waitFor();
  ok((await page.locator("[data-l60-cover]").count()) === 1, "direct route #/lesson/60 opens the lesson cover");
  ok(norm(await page.locator("[data-l60-cover]").innerText()).includes("REPORTED SPEECH"), "cover shows the lesson title");
  ok(norm(await page.locator("[data-l60-cover]").innerText()).includes("17 قسمًا"), "cover states the full source scope");
  await page.screenshot({ path: "docs/lesson60-visual/browser-01-cover.png" });

  await page.goto(`${base}#/`, { waitUntil: "networkidle" });
  const hubCard = page.locator('a.group[href="#/lesson/60"]');
  ok((await hubCard.count()) === 1, "course hub has one dedicated card for lesson 60");
  await hubCard.click();
  await page.locator('[data-lesson="60"]').waitFor();
  ok((await page.locator("[data-l60-cover]").count()) === 1, "hub card opens the lesson");

  // الدرس 59 صار يقود إلى 60
  await page.goto(`${base}#/lesson/59`, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="59"]').waitFor();
  await go("progress");
  const onward = page.locator('a[href="#/lesson/60"]');
  ok((await onward.count()) === 1, "lesson 59 keeps an onward link to lesson 60");
  await onward.first().click();
  await page.locator('[data-lesson="60"]').waitFor();
  ok((await page.locator("[data-l60-cover]").count()) === 1, "lesson 59 → lesson 60 navigation works");

  await go("progress");
  ok((await page.locator('a[href="#/lesson/59"]').count()) === 1, "lesson 60 links back to lesson 59");
  const nextLink = page.locator('#l60-main a[href="#/lesson/61"]');
  const nextLinkCount = await nextLink.count();
  ok(nextLinkCount === 1, "lesson 60 has exactly one onward link to lesson 61");
  const futureLink = page.locator('#l60-main a[href="#/lesson/62"]');
  const futureLinkCount = await futureLink.count();
  let futureLinkResolves = false;
  if (futureLinkCount === 1) {
    await futureLink.click();
    await page.locator('[data-lesson="62"]').waitFor({ timeout: 6000 }).catch(() => {});
    futureLinkResolves = (await page.locator('[data-lesson="62"]').count()) === 1;
    await page.goto(`${base}#/lesson/60`, { waitUntil: "networkidle" });
    await page.locator('[data-lesson="60"]').waitFor();
    await go("progress");
  }
  ok(futureLinkCount === 0 || (futureLinkCount === 1 && futureLinkResolves), "any lesson 62 link must open a real registered lesson");
  if (nextLinkCount === 1) {
    await nextLink.click();
    await page.locator('[data-lesson="61"]').waitFor({ timeout: 6000 }).catch(() => {});
  }
  ok(nextLinkCount === 1 && (await page.locator('[data-lesson="61"] [data-l61-cover]').count()) === 1, "lesson 60 onward link opens the real lesson 61 cover");

  await page.goto(`${base}#/lesson/60`, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="60"]').waitFor();
  await go("progress");
  const nextButton = page.locator('#l60-main button').filter({ hasText: 'الدرس التالي · 61' });
  const nextButtonCount = await nextButton.count();
  ok(nextButtonCount === 1, "lesson 60 has exactly one onward button for lesson 61");
  if (nextButtonCount === 1) {
    await nextButton.click();
    await page.locator('[data-lesson="61"]').waitFor({ timeout: 6000 }).catch(() => {});
  }
  ok(nextButtonCount === 1 && (await page.locator('[data-lesson="61"] [data-l61-cover]').count()) === 1, "lesson 60 onward button opens the real lesson 61 cover");

  await page.goto(`${base}#/lesson/60`, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="60"]').waitFor();
  await go("progress");
  await page.locator('a[href="#/lesson/59"]').first().click();
  await page.locator('[data-lesson="59"]').waitFor();
  ok((await page.locator('[data-lesson="59"]').count()) === 1, "back navigation to lesson 59 works");
  await page.goto(`${base}#/lesson/999999`, { waitUntil: "networkidle" });
  await page.locator('a.group[href="#/lesson/60"]').waitFor();
  ok((await page.locator('[data-lesson="999999"], a[href="#/lesson/999999"]').count()) === 0, "an unregistered lesson falls back to the hub without a ghost card");
  await page.goto(`${base}#/lesson/60`, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="60"]').waitFor();

  /* ---------- source sections render with real content ---------- */
  await go("s1");
  ok(norm(await page.locator("#l60-main .l60-title").first().innerText()).includes("الكلام المباشر"), "section 1 renders its title");
  ok((await page.locator("#l60-main .l60-bubble--direct").count()) === 3, "section 1 keeps its three quoted bubbles");
  ok(norm(await page.locator("#l60-main").innerText()).includes("أهداف الدرس"), "section 1 renders the seven goals block");

  await go("s4");
  ok(norm(await page.locator("#l60-main").innerText()).includes("He told me that he was tired."), "TOLD correct form renders");
  ok(norm(await page.locator("#l60-main").innerText()).includes("He said me that he was tired."), "banned form shown as wrong for contrast");
  ok((await page.locator("#l60-main .l60-transfer").count()) === 4, "four told transfer pairs render");

  await go("s12");
  ok((await page.locator("#l60-main .l60-table-row").count()) === 12, "backshift table renders all twelve rows");
  ok(norm(await page.locator("#l60-main").innerText()).includes("يبقى كما هو"), "Past Perfect stays-as-is note renders");
  ok(norm(await page.locator("#l60-main").innerText()).includes("she must be tired"), "must deduction branch renders (must stays)");
  ok(norm(await page.locator("#l60-main").innerText()).includes("had to leave early"), "must obligation branch renders (had to)");

  await go("s13");
  ok((await page.locator("#l60-main .l60-transfer").count()) === 6, "pronoun section: anchor + five contextual examples");
  ok(norm(await page.locator("#l60-main .l60-table").innerText()).includes("بحسب السياق"), "pronoun table keeps its context-dependent note");
  ok(norm(await page.locator("#l60-main .l60-warn").first().innerText()).includes("يعتمد"), "pronoun context warning renders");

  await go("s14");
  const timeRows = await page.locator("#l60-main .l60-table").first().locator(".l60-table-row").count();
  ok(timeRows === 13, `thirteen time rows render (${timeRows})`);
  ok(norm(await page.locator("#l60-main").innerText()).includes("the following day"), "tomorrow→the following day renders");
  ok(norm(await page.locator("#l60-main").innerText()).includes("come"), "come→go movement row renders");

  await go("s15");
  ok((await page.locator("#l60-main .l60-table-row").count()) === 10, "ten modal rows render");
  ok(norm(await page.locator("#l60-main").innerText()).includes("تبقى كما هي"), "invariant modals note renders");

  await go("s16");
  ok(norm(await page.locator("#l60-main").innerText()).includes("the Earth revolves around the Sun"), "scientific fact keeps present tense");
  await go("s17");
  ok(norm(await page.locator("#l60-main").innerText()).includes("lives in Ankara"), "still-true exception renders");
  await go("s18");
  ok(norm(await page.locator("#l60-main").innerText()).includes("Sara says that she is tired."), "says exception renders");

  await go("s19");
  ok((await page.locator("#l60-main .l60-step").count()) === 8, "eight conversion steps render");
  ok((await page.locator("#l60-main .l60-stage").count()) === 6, "worked example renders its six stages");
  ok(norm(await page.locator("#l60-main").innerText()).includes("Ahmed told me that he was studying English there that day."), "worked final result renders");

  await go("s20");
  ok((await page.locator("#l60-main .l60-bubble--reported").count()) === 10, "ten solved examples render");

  await go("s21");
  ok((await page.locator("#l60-main .l60-error-row").count()) === 7, "seven common mistakes render");

  await go("s22");
  ok((await page.locator("#l60-main .l60-bubble").count()) === 8, "dialogue renders eight turns");
  ok((await page.locator("#l60-main .l60-disclosure").count()) === 4, "dialogue renders four comprehension questions");
  ok(norm(await page.locator("#l60-main").innerText()).includes("had to revise all the lessons"), "reported retell keeps must→had to");
  const dFirst = page.locator("#l60-main .l60-disclosure").first();
  await dFirst.locator("summary").click();
  ok(norm(await dFirst.innerText()).includes("preparing for the exam"), "dialogue answer reveals on demand only");

  await go("s23");
  ok((await page.locator("#l60-main .l60-block").count()) === 6, "reading renders five paragraphs + gloss block");
  ok((await page.locator("#l60-main .l60-disclosure").count()) === 8, "reading renders eight comprehension questions");
  ok(norm(await page.locator("#l60-main").innerText()).includes("A Conversation About a School Project"), "reading title renders");
  ok(norm(await page.locator("#l60-main").innerText()).includes("إعادة التدوير"), "Arabic translation renders");

  /* ---------- practice behaviour ---------- */
  await go("p1");
  const typedAttempt = page.locator("#l60-main .l60-attempt").first();
  ok((await typedAttempt.locator(".l60-feedback").count()) === 0, "practice starts without any feedback");
  await typedAttempt.locator('input[type="text"]').fill("Ali said that he was happy.");
  ok((await typedAttempt.locator(".l60-feedback").count()) === 0, "typing alone does not reveal correctness");
  await typedAttempt.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  ok(norm(await typedAttempt.locator(".l60-feedback").innerText()).includes("إجابة صحيحة"), "typed transformation answer is accepted after check only");
  await typedAttempt.getByRole("button", { name: "إعادة المحاولة" }).click();
  ok((await typedAttempt.locator(".l60-feedback").count()) === 0, "retry clears answer and feedback");

  await go("p2");
  const choiceAttempt = page.locator("#l60-main .l60-attempt").first();
  await choiceAttempt.locator(".l60-choice-list button").nth(1).click();
  ok((await choiceAttempt.locator(".l60-feedback").count()) === 0, "choosing an answer does not reveal correctness");
  await choiceAttempt.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  ok((await choiceAttempt.locator(".l60-feedback").count()) === 1, "choice feedback appears only after explicit check");

  const pCounts = { p3: 8, p4: 10, p5: 5, p6: 5, p7: 10, p8: 1 };
  for (const [id, min] of Object.entries(pCounts)) {
    await go(id);
    ok((await page.locator("#l60-main .l60-attempt").count()) === min, `${id} renders its ${min} items`);
  }

  /* ---------- original test ---------- */
  await go("s24");
  ok((await page.locator("#l60-main .l60-attempt").count()) === 25, "original 25-question test renders");
  const otFirst = page.locator("#l60-main .l60-attempt").first();
  await otFirst.locator(".l60-choice-list button", { hasText: "was" }).first().click();
  await otFirst.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  ok(norm(await otFirst.locator(".l60-feedback").innerText()).includes("إجابة صحيحة"), "original test q1 grades 'was' correctly");
  await go("s25");
  ok((await page.locator("#l60-main ol li.l60-block").count()) === 25, "original key keeps 25 numbered entries");
  ok(norm(await page.locator("#l60-main").innerText()).includes("the previous day"), "original key keeps the completed blanks");

  /* ---------- labs ---------- */
  await go("explorer");
  const explorer = page.locator('[data-l60-lab="explorer"]');
  ok((await explorer.count()) === 1, "Speech Explorer mounts");
  await explorer.locator('[role="tab"]').nth(1).click();
  ok(norm(await explorer.locator(".l60-bubble--reported").innerText()).includes("had finished"), "explorer switch shows the Present Perfect backshift");
  await explorer.locator(".l60-choice-list button").first().click();
  ok((await explorer.locator(".l60-lab-result").count()) === 0, "explorer quiz hides judgement before check");
  await explorer.getByRole("button", { name: "تحقّق" }).click();
  ok((await explorer.locator(".l60-lab-result").count()) === 1, "explorer quiz explains after check");

  await go("studio");
  const studio = page.locator('[data-l60-lab="studio"]');
  ok((await studio.locator(".l60-decision").count()) >= 4, "studio asks for decision per change type");
  const studioAnswers = ["told me that", "he", "was studying", "there", "that day"];
  const decisions = studio.locator(".l60-decision");
  for (let i = 0; i < studioAnswers.length; i += 1) {
    await decisions.nth(i).getByRole("button", { name: studioAnswers[i], exact: true }).click();
  }
  ok((await studio.locator(".l60-studio-out").count()) === 0, "studio never shows the result before running");
  await studio.getByRole("button", { name: /شغّل التحويل/ }).click();
  ok(norm(await studio.locator(".l60-studio-out").innerText()).includes("was studying English there that day"), "studio emits the fully transformed sentence");
  ok((await studio.locator(".l60-decision.is-wrong").count()) === 0, "all five studio decisions graded correct");

  await go("timeline");
  const timeline = page.locator('[data-l60-lab="timeline"]');
  await timeline.locator(".l60-tl-row").nth(4).click();
  ok(norm(await timeline.locator(".l60-tl-detail").innerText()).includes("Past Perfect"), "timeline detail follows the selected row");

  await go("saidtold");
  const saidTold = page.locator('[data-l60-lab="saidtold"]');
  const stLists = saidTold.locator(".l60-choice-list");
  ok((await stLists.count()) >= 6, "said/told drill lists six items");
  for (let i = 0; i < 6; i += 1) await stLists.nth(i).locator("button").first().click();
  ok((await saidTold.locator(".l60-lab-result").count()) === 0, "said/told hides judgements before check");
  await saidTold.getByRole("button", { name: "تحقّق من الستة" }).click();
  ok((await saidTold.locator(".l60-lab-result").count()) === 6, "said/told grades all six after check");

  await go("pronouns");
  const mapper = page.locator('[data-l60-lab="pronouns"]');
  ok((await mapper.locator('[role="group"][aria-label="مشاهد الضمائر"] button').count()) === 3, "pronoun mapper offers three scenarios");
  ok(norm(await mapper.locator(".l60-pron-row").first().innerText()) === "I ⟶ he", "third-person reporter maps I to he");
  const castBefore = norm(await mapper.locator(".l60-studio-out").first().innerText());
  await mapper.locator(".l60-mapper-cast .l60-choice-list button").nth(1).click();
  await page.waitForTimeout(80);
  ok(norm(await mapper.locator(".l60-studio-out").first().innerText()) !== castBefore, "switching the narrator changes the reported result");

  await go("timeshift");
  const timeshift = page.locator('[data-l60-lab="timeshift"]');
  ok((await timeshift.locator(".l60-context").count()) === 2, "time/place explorer exposes both contexts");
  const shiftRows = await timeshift.locator(".l60-shift-row").count();
  ok(shiftRows >= 5, `time/place explorer lists the source words (${shiftRows})`);

  await go("detector");
  const detector = page.locator('[data-l60-lab="exceptions"]');
  const detectCards = detector.locator(".l60-detect");
  ok((await detectCards.count()) === 8, "exception detector lists eight sentences");
  for (let i = 0; i < 8; i += 1) await detectCards.nth(i).locator(".l60-choice-list button").first().click();
  ok((await detector.locator(".l60-lab-result").count()) === 0, "exception detector hides judgements before check");
  await detector.getByRole("button", { name: "تحقّق من التصنيفات الثمانية" }).click();
  ok((await detector.locator(".l60-lab-result").count()) === 8, "exception detector grades all eight");

  await go("detective");
  const detective = page.locator('[data-l60-lab="errors"]');
  const errorCards = detective.locator(".l60-error-row");
  ok((await errorCards.count()) === 7, "error detective renders the seven source mistakes");
  const detectiveLists = detective.locator(".l60-choice-list");
  ok((await detectiveLists.count()) === 7, "error detective lists seven choice lists");
  for (let i = 0; i < 7; i += 1) await detectiveLists.nth(i).locator("button").first().click();
  ok((await detective.locator(".l60-lab-result").count()) === 0, "error detective hides corrections before check");
  await detective.getByRole("button", { name: "تحقّق من الإصلاحات السبعة" }).click();
  ok((await detective.locator(".l60-lab-result").count()) === 7, "error detective explains all seven corrections");

  await go("challenges");
  const challenges = page.locator('[data-l60-lab="challenges"]');
  ok((await challenges.locator(".l60-challenge").count()) === 4, "four transformation challenges render");
  const ch1 = challenges.locator(".l60-challenge").first();
  await ch1.locator('input[type="text"]').fill("They said that they might travel the following day.");
  await ch1.getByRole("button", { name: "تحقّق" }).click();
  ok(norm(await ch1.locator(".l60-lab-result").innerText()).includes("تحويل كامل صحيح"), "challenge 1 accepts a full correct conversion");

  /* ---------- shared final test ---------- */
  await go("final-test");
  const quiz = page.locator('[data-final-test="60"]');
  ok((await quiz.locator("[data-ft-q]").count()) === 15, "shared FinalTest renders fifteen questions");
  ok((await quiz.locator("[data-ft-verdict]").count()) === 0, "no verdict before submission");
  const questions = quiz.locator("[data-ft-q]");
  for (let i = 0; i < 15; i += 1) {
    const q = questions.nth(i);
    const type = await q.getAttribute("data-ft-type");
    if (type === "single" || type === "error" || type === "tf") await q.locator("label").first().click();
    else if (type === "multi") await q.locator("label").first().click();
    else if (type === "typed") await q.locator('input[type="text"]').fill("had to");
    else if (type === "match") {
      const selects = q.locator("select");
      const n = await selects.count();
      for (let j = 0; j < n; j += 1) await selects.nth(j).selectOption({ index: j + 1 });
    } else if (type === "order") {
      // أزرار الترتيب تحمل الصنف font-en؛ زر «إعادة الترتيب» لا يحملها.
      const pool = q.locator("button.font-en");
      for (let guard = 0; guard < 12; guard += 1) {
        if (!(await pool.count())) break;
        await pool.first().click();
        await page.waitForTimeout(20);
      }
    }
    await page.waitForTimeout(30);
  }
  ok((await quiz.locator("[data-ft-verdict]").count()) === 0, "answering every question still reveals nothing");
  const submit = quiz.getByRole("button", { name: /تصحيح الاختبار/ });
  ok(await submit.isEnabled(), "submit becomes available once all fifteen are answered");
  await submit.click();
  ok((await quiz.locator("[data-ft-verdict]").count()) === 15, "after submission every question is graded");
  ok((await quiz.locator("[data-ft-result]").count()) === 1, "result summary appears after grading");
  await page.screenshot({ path: "docs/lesson60-visual/browser-02-final-test.png" });
  ok(/النتيجة/.test(norm(await quiz.locator("[data-ft-bar]").innerText())), "result text rendered");
  await go("s1");
  await go("final-test");
  ok((await quiz.locator("[data-ft-verdict]").count()) === 15, "final-test state survives navigation (no new quiz system)");

  /* ---------- teacher area ---------- */
  await go("teacher");
  const teacher = page.locator('[data-teacher-area="60"]');
  ok((await teacher.locator('input[type="password"]').count()) === 1, "teacher gate asks for a password");
  await teacher.locator('input[type="password"]').fill("wrong");
  await teacher.getByRole("button", { name: "فتح فضاء المعلم" }).click();
  ok((await teacher.getByRole("alert").count()) === 1, "wrong password is rejected");
  await teacher.locator('input[type="password"]').fill("somer173");
  await teacher.getByRole("button", { name: "فتح فضاء المعلم" }).click();
  ok((await page.locator('[data-ft-key="60"] [data-ft-key-item]').count()) === 15, "teacher key exposes the shared fifteen-question key");
  ok((await page.locator('[data-teacher-area="60"] details').count()) >= 12, "teacher area keeps practice + original-test keys");
  await page.screenshot({ path: "docs/lesson60-visual/browser-03-teacher.png" });

  /* ---------- responsive + lock overlap ---------- */
  for (const width of [320, 360, 390, 414, 1280]) {
    await page.setViewportSize({ width, height: 860 });
    await go("cover");
    const metrics = await page.evaluate(() => ({
      inner: innerWidth,
      doc: document.documentElement.scrollWidth,
      main: document.querySelector("#l60-main")?.clientWidth,
      scroll: document.querySelector("#l60-main")?.scrollWidth,
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
      const main = document.querySelector("#l60-main");
      return main ? main.scrollWidth - main.clientWidth : 0;
    });
    ok(sectionOverflow <= 1, `${width}px: the dense backshift-table section stays inside the column (${sectionOverflow})`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await go("s14");
  await page.screenshot({ path: "docs/lesson60-visual/browser-04-390-timetable.png" });
  await page.setViewportSize({ width: 320, height: 780 });
  await go("p1");
  await page.screenshot({ path: "docs/lesson60-visual/browser-05-320-practice.png" });

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

console.log(`\nLesson 60 browser audit: ${checks - failures.length}/${checks} passed`);
if (failures.length) {
  console.error(failures.map((f) => `- ${f}`).join("\n"));
  process.exitCode = 1;
}
