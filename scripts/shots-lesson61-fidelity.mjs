// Targeted post-source-review screenshots, with a fresh lesson state per width.
import { mkdirSync, readFileSync } from "node:fs";
import ts from "typescript";
import { browser61, go61, prepare61 } from "./lib/lesson61-browser.mjs";
const js = ts.transpileModule(readFileSync("src/lessons/lesson61/practice61.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { PRACTICES_61 } = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
const paragraph = PRACTICES_61[7];
mkdirSync("docs/lesson61-visual", { recursive: true });
const env = await browser61();
try {
  // The bundled headless Chromium runs in single-process mode: keep one page
  // alive across widths instead of closing its last context between captures.
  const page = await env.browser.newPage({ viewport: { width: 320, height: 780 }, reducedMotion: "reduce" });
  await prepare61(page);
  const requested = process.argv.slice(2).map(Number);
  const widths = [[320, 780], [1280, 900]].filter(([width]) => !requested.length || requested.includes(width));
  if (!widths.length) throw new Error("Choose width 320 or 1280.");
  for (const [width, height] of widths) {
    await page.setViewportSize({ width, height });
    // Re-entering the same hash does not reload React; clear the in-memory
    // attempts between widths so the model reveal starts closed each time.
    await page.goto("about:blank");
    await page.goto(`${env.base}#/lesson/61`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; }" });
    const capture = async (name) => {
      await page.evaluate(() => document.fonts.ready);
      const path = `docs/lesson61-visual/source-fidelity-${width}-${name}.png`;
      await page.screenshot({ path });
      console.log(`Captured ${path}`);
    };
    await go61(page, "yes-modals");
    await page.locator('.l61-transfer').nth(2).scrollIntoViewIfNeeded();
    await capture("teacher-pronouns");
    await go61(page, "wh-subject");
    await capture("wh-subject-detail");
    await go61(page, "solved");
    await page.locator('[data-l61-solved-kind]').first().scrollIntoViewIfNeeded();
    await capture("solved-labels");
    await go61(page, "say-tell-ask");
    await page.locator('.l61-formula').filter({ hasText: 'tell + someone + to + verb' }).scrollIntoViewIfNeeded();
    await capture("tell-command-labels");
    await go61(page, "dialogue-reported");
    await page.locator('.l61-dialogue article').last().scrollIntoViewIfNeeded();
    await capture("original-dialogue");
    await go61(page, "practice-8");
    await capture("paragraph-prompt");
    await page.locator('#l61-paragraph-draft').fill(paragraph.items[0].answer);
    for (const box of await page.locator('[data-l61-paragraph-checklist] input').all()) await box.check();
    await page.getByRole('button', { name: 'عرض الحل النموذجي للفقرة' }).click();
    await page.locator('[data-l61-paragraph-model] article').first().scrollIntoViewIfNeeded();
    await capture("paragraph-model");
    await go61(page, "original-1");
    const first = page.locator('[data-l61-attempt="1"]');
    await first.locator('input[type=text]').fill('He asked me if I was tired.');
    await first.getByRole('button', { name: 'تحقّق من الإجابة' }).click();
    await first.locator('[data-l61-pending]').scrollIntoViewIfNeeded();
    await capture("original-exam-pending");
    await go61(page, "summary");
    await page.locator('.l61-summary-distinctions').scrollIntoViewIfNeeded();
    await capture("nine-distinctions");
    await go61(page, "teacher");
    await page.getByLabel('كلمة مرور المعلم').fill('somer173');
    await page.getByRole('button', { name: 'فتح مساحة المعلم' }).click();
    const keyGroup = page.locator('.l61-key-group').nth(7);
    await keyGroup.locator('button').click();
    await keyGroup.locator('ol > li').scrollIntoViewIfNeeded();
    await capture("teacher-paragraph-key");
  }
} finally { await env.close(); }
