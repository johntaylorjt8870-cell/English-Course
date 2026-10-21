import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { brotliDecompressSync } from "node:zlib";
import chromium from "@sparticuz/chromium";
import { chromium as pw } from "playwright-core";
import * as esbuild from "esbuild";
const work = "node_modules/.browser39";
fs.mkdirSync(work, { recursive: true });
try {
  fs.writeFileSync(
    work + "/al2023.tar",
    brotliDecompressSync(
      fs.readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br"),
    ),
  );
  execFileSync("tar", ["-xf", work + "/al2023.tar", "-C", work]);
} catch {}
process.env.LD_LIBRARY_PATH =
  process.cwd() + "/" + work + "/lib:" + (process.env.LD_LIBRARY_PATH || "");
await esbuild.build({
  stdin: {
    contents: `export * from './src/lessons/lesson39/data';export * from './src/lessons/lesson39/solutionsData39';`,
    resolveDir: process.cwd(),
  },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: work + "/data.mjs",
  logLevel: "silent",
});
const { SLIDES_39: S, TEST_SOLUTIONS_39: key } = await import(
  "../" + work + "/data.mjs"
);
const out = ".arena/lesson39-screens";
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync("docs/lesson39-visual", { recursive: true });
const browser = await pw.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true,
});
const report = { viewports: [], errors: [], checks: [] };
const check = (x, msg) => {
  report.checks.push({ pass: !!x, message: msg });
  if (!x) console.error("FAIL", msg);
};
for (const size of [
  { width: 1280, height: 800 },
  { width: 1920, height: 1080 },
]) {
  const page = await browser.newPage({ viewport: size });
  page.on("pageerror", (e) => report.errors.push(e.message));
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.addInitScript(() => {
    localStorage.setItem("englishwithsomer-site-unlocked", "unlocked");
  });
  await page.goto("http://127.0.0.1:4173/English-Course/#/lesson/39");
  // Existing course gate.
  if (
    (await page.locator("input[type=password]").count()) &&
    !(await page.locator(".tg-step").count())
  ) {
    await page.locator("input[type=password]").first().fill("somer173");
    await page.locator("button[type=submit]").first().click();
  }
  await page.locator(".tg-step").waitFor();
  const rows = [];
  for (let i = 0; i < S.length; i++) {
    await page
      .getByLabel("انتقل إلى الخطوة", { exact: true })
      .selectOption({ value: String(i) });
    await page.locator(`[data-step-id="${S[i].id}"]`).waitFor();
    const row = await page.locator(".tg-step").evaluate((el) => {
      const r = el.getBoundingClientRect();
      return {
        height: r.height,
        width: r.width,
        overflow: document.documentElement.scrollWidth > innerWidth,
        dir: getComputedStyle(el).direction,
        english: [...el.querySelectorAll("[dir=ltr]")].every(
          (x) => getComputedStyle(x).direction === "ltr",
        ),
        font: Math.min(
          ...[...el.querySelectorAll(".tg-source>div")].map((x) =>
            parseFloat(getComputedStyle(x).fontSize),
          ),
        ),
      };
    });
    rows.push({ id: S[i].id, ...row });
    await page.screenshot({
      path: `${out}/${size.width}-${S[i].id}.png`,
      fullPage: true,
    });
    check(
      row.height <= 1200,
      `${size.width} ${S[i].id}: preferred height bound`,
    );
    check(row.font >= 15, `${size.width} ${S[i].id}: readable source font`);
    check(!row.overflow, `${size.width} ${S[i].id}: no horizontal overflow`);
    check(
      row.dir === "rtl" && row.english,
      `${size.width} ${S[i].id}: direction`,
    );
    if (S[i].page.reveal?.length) {
      await page.locator("#tg-attempt").fill("my attempt");
      await page
        .getByRole("button", { name: "تحقق من المحاولة", exact: true })
        .click();
      for (const n of S[i].page.reveal)
        check(
          (await page
            .locator(`[data-source-unit="${S[i].sourceId}-reveal-${n}"]`)
            .count()) === 1,
          `${S[i].id}: source answer ${n} accessible after attempt`,
        );
    }
    const radio = page.locator(".tg-step input[type=radio]");
    if (await radio.count()) {
      await radio.first().check();
      await page
        .getByRole("button", { name: "تحقق من اختياري", exact: true })
        .click();
      check(
        (await page.locator("[data-lab]").innerText()).includes("حاولت 1"),
        "Practice check works",
      );
    }
    if (S[i].id === "s03-1") {
      for (const token of ["subject", "will", "have", "been", "ving"])
        await page.locator(`[data-formula-piece="${token}"]`).click();
      await page
        .getByRole("button", { name: "تحقق من الترتيب", exact: true })
        .click();
      check(
        (await page.locator('[data-lab="formula"]').innerText()).includes(
          "صحيح",
        ),
        "Formula builder feedback",
      );
    }
    rows.at(-1).expandedHeight = await page
      .locator(".tg-step")
      .evaluate((el) => el.getBoundingClientRect().height);
    if (rows.at(-1).expandedHeight > 1200)
      await page.screenshot({
        path: `${out}/${size.width}-${S[i].id}-expanded.png`,
        fullPage: true,
      });
  }
  const sorted = rows.map((r) => r.height).sort((a, b) => a - b);
  report.viewports.push({
    size,
    median: sorted[Math.floor(sorted.length * 0.5)],
    p90: sorted[Math.floor(sorted.length * 0.9)],
    max: sorted.at(-1),
    expandedMax: Math.max(...rows.map((r) => r.expandedHeight)),
    expandedFlags: rows.filter((r) => r.expandedHeight > 1200),
    tallest: [...rows].sort((a, b) => b.height - a.height).slice(0, 8),
    steps: rows,
  });
  check(
    !requests.some((u) =>
      /solutionsData39|testKey39|TeacherGuide39|SolutionsArea39/.test(u),
    ),
    `${size.width}: protected chunks not requested while learning`,
  );
  // A real duration challenge and feedback.
  await page
    .getByLabel("انتقل إلى الخطوة", { exact: true })
    .selectOption(String(S.findIndex((s) => s.id === "s11-1")));
  await page.locator("#tg-attempt").fill("4");
  await page
    .getByRole("button", { name: "تحقق من المحاولة", exact: true })
    .click();
  check(
    (await page.locator(".tg-task").innerText()).includes("✓ صحيح"),
    "Duration feedback",
  );
  // Teacher gate rejects invalid password, loads no solutions before unlock.
  await page.locator(".tg-areas button").nth(3).click();
  await page.locator("#l39-teacher-password").fill("wrong");
  await page.getByRole("button", { name: "دخول المعلم", exact: true }).click();
  check(
    (await page.getByRole("alert").count()) === 1,
    "Wrong teacher password rejected",
  );
  await page.locator(".tg-areas button").nth(1).click();
  for (let i = 0; i < 25; i++) {
    await page
      .getByLabel("سؤال الاختبار", { exact: true })
      .selectOption({ value: String(i) });
    const q = page.locator(`[data-test-question="${i + 1}"]`);
    await q.waitFor();
    check((await q.count()) === 1, `Q${i + 1} reachable`);
    check(
      (await page.locator("[data-question-feedback]").count()) === 0,
      "No pre-submit feedback",
    );
    if (i < 5)
      await q.locator("input[type=radio]").nth([1, 2, 2, 2, 1][i]).check();
    else await q.locator("input,textarea").first().fill(key[i].answer);
  }
  check(
    !requests.some((u) => /testKey39|solutionsData39/.test(u)),
    `${size.width}: no key fetched before submit`,
  );
  await page
    .getByRole("button", { name: "إرسال الاختبار", exact: true })
    .click();
  await page.locator("[data-grade-summary]").waitFor();
  check(
    (await page.locator("[data-grade-summary]").innerText()).includes(
      "25 إجابة",
    ),
    "25 model answers accepted",
  );
  for (let i = 0; i < 25; i++) {
    await page
      .getByLabel("سؤال الاختبار", { exact: true })
      .selectOption({ value: String(i) });
    check(
      (await page.locator(`[data-question-feedback="${i + 1}"]`).count()) === 1,
      `Q${i + 1} post-submit feedback`,
    );
  }
  await page.screenshot({
    path: `docs/lesson39-visual/${size.width}-test-feedback.png`,
    fullPage: true,
  });
  await page.locator(".tg-areas button").nth(3).click();
  await page.locator("#l39-teacher-password").fill("somer173");
  await page.getByRole("button", { name: "دخول المعلم", exact: true }).click();
  await page
    .locator('[data-area="lesson39-teacher"]')
    .waitFor({ timeout: 5000 })
    .catch(() => {});
  check(
    requests.some((u) => /TeacherGuide39/.test(u)),
    "Teacher guide loads after unlock",
  );
  await page
    .getByRole("button", { name: "حلول الاختبار Q1–Q25", exact: true })
    .click();
  check(
    (await page.locator("[data-teacher-solution]").count()) === 25,
    "Teacher area contains all 25 detailed solutions",
  );
  await page.locator(".tg-areas button").nth(2).click();
  await page.locator('[data-solution-count="25"]').waitFor();
  for (let level = 0; level < 5; level++) {
    await page
      .locator('[data-area="lesson39-solutions"] nav button')
      .nth(level)
      .click();
    await page
      .getByRole("button", { name: "فتح كل الشروح", exact: true })
      .click();
    check(
      (await page.locator("[data-solution-details]").count()) === 5,
      `Solutions level ${level + 1}: all five explanations accessible`,
    );
  }
  await page.screenshot({
    path: `${out}/${size.width}-teacher.png`,
    fullPage: true,
  });
  await page.locator(".tg-areas button").first().click();
  await page
    .getByLabel("انتقل إلى الخطوة", { exact: true })
    .selectOption({ value: "0" });
  await page.screenshot({
    path: `docs/lesson39-visual/${size.width}-intro.png`,
    fullPage: true,
  });
  // Keep the single-process browser context alive until the complete run finishes.
}
await browser.close();
fs.writeFileSync(
  "docs/lesson39-visual/verification.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    report.viewports.map(
      ({ size, median, p90, max, expandedMax, expandedFlags, tallest }) => ({
        size,
        median,
        p90,
        max,
        expandedMax,
        expandedFlags,
        tallest,
      }),
    ),
    null,
    2,
  ),
);
check(!report.errors.length, "No browser exceptions");
if (report.errors.length || report.checks.some((c) => !c.pass))
  process.exitCode = 1;
