// Production screenshots; never deletes prior images. Optional arguments select scene ids.
import { mkdirSync, readFileSync } from "node:fs";
import ts from "typescript";
import { browser61, go61, prepare61 } from "./lib/lesson61-browser.mjs";

// Read the actual shared question bank so the submitted-state capture is real.
const js = ts.transpileModule(readFileSync("src/lessons/lesson61/test61.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { TEST_61 } = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);

mkdirSync("docs/lesson61-visual", { recursive: true });
const env = await browser61();
try {
  const page = await env.browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  await prepare61(page);
  await page.goto(`${env.base}#/lesson/61`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; }" });
  const all = ["cover", "map", "yes-rule", "yes-do", "yes-converter", "wh-order", "wh-subject", "wh-rebuilder", "command-studio", "negative-lab", "intent-detector", "advice-suggestion", "verb-control", "error-detective", "dialogue", "dialogue-reported", "conversation", "reading", "comprehension", "practice-1", "practice-8", "original-5", "original-key", "final-test", "writing", "speaking", "summary", "teacher", "progress"];
  const targets = process.argv.length > 2 ? process.argv.slice(2) : all;
  for (const id of targets) {
    await go61(page, id);
    if (id === "teacher") { await page.getByLabel("كلمة مرور المعلم").fill("somer173"); await page.getByRole("button", { name: "فتح مساحة المعلم" }).click(); }
    if (id === "final-test") await page.locator("#l61-main").evaluate((el) => { el.scrollTop = 220; });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `docs/lesson61-visual/desktop-${id}.png` });
    console.log(`Captured desktop ${id}`);
  }
  if (process.argv.length <= 2) {
    // Genuine attempted states, not pre-populated visual mockups.
    await go61(page, "yes-converter");
    const lab = page.locator('[data-l61-lab="yes-converter"]');
    for (const [i, answer] of ["do", "if", "I spoke", "I / spoke"].entries()) await lab.locator("fieldset").nth(i).getByRole("button", { name: answer, exact: true }).click();
    await lab.locator('input[type="text"]').fill("She asked me if I spoke English.");
    await lab.getByRole("button", { name: "تحقّق من المسار" }).click();
    await lab.locator("[data-l61-lab-feedback]").scrollIntoViewIfNeeded();
    await page.screenshot({ path: "docs/lesson61-visual/desktop-yes-converter-feedback.png" });

    await go61(page, "original-1");
    const attempt = page.locator('[data-l61-attempt="1"]');
    await attempt.locator("input").fill("He asked me if I was tired.");
    await attempt.getByRole("button", { name: "تحقّق من الإجابة" }).click();
    await go61(page, "original-key");
    await page.screenshot({ path: "docs/lesson61-visual/desktop-original-key-attempted.png" });

    await go61(page, "final-test");
    const final = page.locator('[data-final-test="61"]');
    for (const [i, q] of TEST_61.entries()) {
      const card = final.locator(`[data-ft-q="${i + 1}"]`);
      if (q.type === "single" || q.type === "error") await card.locator('input[type="radio"]').nth(i === 0 ? (q.answer + 1) % q.options.length : q.answer).check();
      else if (q.type === "tf") await card.locator('input[type="radio"]').nth(q.answer ? 0 : 1).check();
      else if (q.type === "typed") await card.locator('input[type="text"]').fill(q.accept[0]);
      else if (q.type === "multi") for (const choice of q.answers) await card.locator('input[type="checkbox"]').nth(choice).check();
      else if (q.type === "order") for (const part of q.items) await card.getByRole("button", { name: part, exact: true }).click();
      else if (q.type === "match") for (let j = 0; j < q.pairs.length; j++) await card.locator("select").nth(j).selectOption(String(j));
    }
    await final.locator("[data-ft-submit]").click();
    await final.locator('[data-ft-q="1"]').scrollIntoViewIfNeeded();
    await page.screenshot({ path: "docs/lesson61-visual/desktop-final-test-graded.png" });
    await page.setViewportSize({ width: 320, height: 780 });
    await final.locator('[data-ft-q="1"] [data-ft-verdict]').scrollIntoViewIfNeeded();
    await page.screenshot({ path: "docs/lesson61-visual/mobile-320-final-test-graded.png" });
    await final.locator("[data-ft-reset]").click();

    for (const [width, height, id] of [[320, 780, "cover"], [360, 800, "yes-rule"], [390, 844, "wh-subject"], [414, 896, "command-studio"], [320, 780, "practice-1"], [390, 844, "final-test"], [414, 896, "progress"], [360, 800, "reading"], [414, 896, "summary"]]) {
      await page.setViewportSize({ width, height });
      await go61(page, id);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `docs/lesson61-visual/mobile-${width}-${id}.png` });
      console.log(`Captured ${width}px ${id}`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await go61(page, "teacher");
    await page.getByLabel("كلمة مرور المعلم").fill("somer173");
    await page.getByRole("button", { name: "فتح مساحة المعلم" }).click();
    await page.locator('[data-ft-key-item="1"]').scrollIntoViewIfNeeded();
    await page.screenshot({ path: "docs/lesson61-visual/mobile-390-teacher-key.png" });
  }
} finally { await env.close(); }
