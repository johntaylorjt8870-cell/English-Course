// Production Chromium: interactions, gating, persistence, navigation, direction,
// generated/visible digits, widths, and overlap. Source fidelity is a separate audit.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import esbuild from "esbuild";
import ts from "typescript";
import { browser61, go61, prepare61 } from "./lib/lesson61-browser.mjs";
import { readSource61, normalizeSource61, sourceBilingualTheory61, sourceWhVocabulary61, sourceSolved61, sourcePractices61 } from "./lib/lesson61-source.mjs";
const require = createRequire(import.meta.url);
async function load(path) {
  const js = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}
async function bundle(path) {
  const out = await esbuild.build({ entryPoints: [path], bundle: true, write: false, format: "cjs", platform: "node", target: "node22", loader: { ".css": "empty" }, external: ["react", "react/jsx-runtime", "react-dom"] });
  const mod = { exports: {} }; new Function("require", "module", "exports", out.outputFiles[0].text)(require, mod, mod.exports); return mod.exports;
}
const { LABS_61 } = await bundle("src/lessons/lesson61/labs61.tsx");
const { LESSON_61_SCENES } = await bundle("src/lessons/lesson61/Lesson61.tsx");
const { PRACTICES_61, ORIGINAL_TEST_61 } = await load("src/lessons/lesson61/practice61.ts");
const { READING_61 } = await load("src/lessons/lesson61/content61.ts");
const { TEST_61 } = await load("src/lessons/lesson61/test61.ts");
const env = await browser61();
const page = await env.browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
page.setDefaultTimeout(10000);
const failures = []; const errors = []; const unavailableExternalFonts = []; let checks = 0;
function ok(condition, message) { checks++; if (!condition) { failures.push(message); console.error(`FAIL ${message}`); } }
const text = (locator) => locator.innerText().then((s) => s.replace(/\s+/g, " ").trim());
const isExternalFont = (url) => /^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(url);
page.on("pageerror", (err) => errors.push(err.message));
page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  if (isExternalFont(msg.location().url || "")) unavailableExternalFonts.push(msg.text());
  else errors.push(msg.text());
});
page.on("requestfailed", (req) => {
  if (isExternalFont(req.url())) unavailableExternalFonts.push(req.url());
  else errors.push(`${req.url()}: ${req.failure()?.errorText}`);
});
await prepare61(page);
try {
  // Route, hub card and the real transition from lesson 60.
  await page.goto(`${env.base}#/`, { waitUntil: "networkidle" });
  const card = page.locator('a.group[href="#/lesson/61"]');
  ok(await card.count() === 1, "Hub has one Lesson 61 card");
  await card.click(); await page.locator('[data-lesson="61"]').waitFor();
  ok(await page.locator("[data-l61-cover]").count() === 1, "Hub card opens Lesson 61");
  await page.goto(`${env.base}#/lesson/60`, { waitUntil: "networkidle" });
  await page.locator('[data-lesson="60"]').waitFor();
  await page.locator('button[data-step-nav="progress"]:visible').click();
  const onward = page.locator('#l60-main a[href="#/lesson/61"]');
  ok(await onward.count() === 1, "Lesson 60 has a real forward link to 61");
  await onward.click(); await page.locator('[data-lesson="61"]').waitFor();
  ok(page.url().endsWith("#/lesson/61"), "Lesson 60 forward link opens 61");
  await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; }" });
  ok(await page.locator('button[data-step-nav="cover"][aria-current="step"]:visible').count() === 1, "Correct current rail selection");
  await page.getByRole("button", { name: /ابدأ الرحلة/ }).click();
  ok(await page.locator('#l61-main [data-area="map"]').count() === 1, "Cover call to action opens map");
  await page.locator('button[data-step-nav="prev"]:visible').click();
  ok(await page.locator('[data-l61-cover]').count() === 1, "Previous navigation returns to cover");
  await page.locator('button[data-step-nav="next"]:visible').click();
  ok(await page.locator('#l61-main [data-area="map"]').count() === 1, "Next navigation advances to map");
  await page.locator('body').click({ position: { x: 10, y: 10 }, force: true });
  await page.keyboard.press("ArrowLeft");
  ok(await page.locator('#l61-main [data-area="bridge"]').count() === 1, "Keyboard arrow advances a scene");
  await go61(page, 'reading');
  const readingTitleOrder = await page.locator('.l61-header-title').evaluate((label) => {
    const ar = label.querySelector('.l61-reading-title-ar');
    const en = label.querySelector('.l61-reading-title-en');
    const node = ar?.firstChild;
    if (!node || !en) return false;
    const range = document.createRange();
    range.setStart(node, 0); range.setEnd(node, 1);
    const firstArabic = range.getBoundingClientRect();
    range.setStart(node, node.textContent.length - 1); range.setEnd(node, node.textContent.length);
    const colon = range.getBoundingClientRect();
    return en.textContent === 'A School Visit' && en.getBoundingClientRect().right <= colon.left + 1 && colon.left < firstArabic.left;
  });
  ok(readingTitleOrder, 'Reading header keeps its colon with the Arabic label and English title in LTR order');
  await go61(page, 'yes-modals');
  const modalText = await text(page.locator('#l61-main'));
  ok(modalText.includes('whether he might use our dictionary') && modalText.includes('whether they might use our dictionary') && modalText.includes('لا يحدد'), 'Original teacher pronoun and neutral contextual alternative are both visible');
  await go61(page, 'dialogue-reported');
  const dialogueText = await text(page.locator('#l61-main'));
  ok(dialogueText.includes('told the students not to make any noise') && dialogueText.includes('told them not to make') && dialogueText.includes('told him not to make any noise'), 'Original dialogue and context-dependent addressee alternative are visible');
  ok(dialogueText.includes('هذا الحوار يجمع بين الأسئلة والأوامر والنواهي في موقف واحد'), 'Dialogue retains the source concluding observation');
  await go61(page, 'summary');
  ok(await page.locator('.l61-summary-distinctions li').count() === 9, 'All nine original distinctions render separately');

  // Compare the rendered vocabulary, bilingual examples and solved-example
  // categories with the independently parsed source, not with the UI data.
  const source = readSource61();
  const bilingual = sourceBilingualTheory61(source);
  for (const [id, section, first, last] of [['yes-intro', 1, 57, 70], ['command', 3, 626, 636]]) {
    await go61(page, id);
    const items = bilingual.filter((item) => item.section === section && item.line >= first && item.line <= last);
    const rendered = page.locator('#l61-main .l61-line');
    ok(await rendered.count() === items.length, `${id}: all original bilingual introductory examples render`);
    for (const [i, item] of items.entries()) {
      const line = await text(rendered.nth(i));
      ok(normalizeSource61(line).includes(normalizeSource61(item.en)) && normalizeSource61(line).includes(normalizeSource61(item.ar)), `${id}: source example ${i + 1} and its Arabic translation stay together`);
    }
  }
  await go61(page, 'wh-intro');
  const words = sourceWhVocabulary61(source), renderedWords = page.locator('#l61-main .l61-line');
  ok(await renderedWords.count() === words.length, 'All 12 original WH glosses render');
  for (const [i, item] of words.entries()) {
    const line = await text(renderedWords.nth(i));
    ok(normalizeSource61(line).includes(normalizeSource61(item.en)) && normalizeSource61(line).includes(normalizeSource61(item.ar)), `WH gloss ${i + 1}: source word and Arabic meaning render together`);
  }
  await go61(page, 'solved');
  const sourceSolved = sourceSolved61(source), solvedCards = page.locator('#l61-main [data-l61-pair]');
  ok(await solvedCards.count() === sourceSolved.length, 'All eight source solved examples render');
  for (const [i, item] of sourceSolved.entries()) {
    const card = solvedCards.nth(i), rendered = normalizeSource61(await text(card));
    ok(normalizeSource61(await text(card.locator('[data-l61-solved-kind]'))) === normalizeSource61(item.label) && [item.direct, item.reported, item.ar].every((part) => rendered.includes(normalizeSource61(part))), `Solved example ${i + 1}: source category, direct form, reported form and translation render together`);
  }
  await go61(page, 'wh-subject');
  ok((await text(page.locator('#l61-main'))).includes('في معظم الأسئلة نحتاج إلى إعادة ترتيب الكلمات'), 'WH subject scene explicitly preserves the normal-order contrast');
  await go61(page, 'warning-advice');
  ok((await text(page.locator('#l61-main'))).includes('عند النهي عن شيء في النصيحة'), 'Negative advice retains its original teaching context');
  await go61(page, 'say-tell-ask');
  const sayTellAskText = await text(page.locator('#l61-main'));
  ok(sayTellAskText.includes('الشخص الذي وُجّه إليه الكلام مع say'), 'Say scene explains mentioning the recipient');
  for (const label of ['في الأوامر نستخدم to', 'في النواهي نستخدم not to', 'في أسئلة WH نحتفظ بأداة السؤال', 'في الطلبات نستخدم to']) {
    ok(sayTellAskText.includes(label), `Say / Tell / Ask renders the source formula context: ${label}`);
  }

  // Every lab case is solved by choosing actual controls and typing the sentence.
  for (const lab of LABS_61) {
    await go61(page, lab.id);
    const box = page.locator(`[data-l61-lab="${lab.id}"]`);
    ok(await box.count() === 1 && await box.locator('[data-l61-lab-feedback]').count() === 0, `${lab.id}: feedback hidden before trying`);
    ok(await box.getByRole('button', { name: 'تحقّق من المسار' }).isDisabled(), `${lab.id}: incomplete attempt cannot be checked`);
    for (const [i, task] of lab.cases.entries()) {
      if (i) await box.getByRole('button', { name: `الحالة ${i + 1}`, exact: true }).click();
      ok(await box.locator('[data-l61-lab-feedback]').count() === 0, `${lab.id} case ${i + 1}: no premature answer`);
      for (const [j, decision] of task.decisions.entries()) {
        await box.locator('fieldset.l61-decision').nth(j).getByRole('button', { name: decision.correct[0], exact: true }).click();
      }
      const input = box.locator('input[type=text]');
      await input.fill(task.answer);
      ok(await box.getByRole('button', { name: 'تحقّق من المسار' }).isEnabled(), `${lab.id} case ${i + 1}: complete attempt can be checked`);
      await box.getByRole('button', { name: 'تحقّق من المسار' }).click();
      const feedback = box.locator('[data-l61-lab-feedback]');
      ok(await feedback.count() === 1 && (await text(feedback)).includes('المسار صحيح') && (await text(feedback)).includes(task.answer), `${lab.id} case ${i + 1}: correct decision and sentence explained`);
      if (i === 0) {
        await box.getByRole('button', { name: 'إعادة المحاولة' }).click();
        ok(await input.inputValue() === '' && await feedback.count() === 0, `${lab.id}: retry clears feedback and input`);
        for (const [j, decision] of task.decisions.entries()) await box.locator('fieldset.l61-decision').nth(j).getByRole('button', { name: decision.correct[0], exact: true }).click();
        await input.fill('This is not the answer.');
        await box.getByRole('button', { name: 'تحقّق من المسار' }).click();
        ok((await text(feedback)).includes('راجع قراراتك') && (await text(feedback)).includes(task.answer), `${lab.id}: wrong attempt yields model and explanation only after checking`);
        await input.fill(task.answer);
        ok(await feedback.count() === 0, `${lab.id}: editing hides stale feedback`);
        await box.getByRole('button', { name: 'تحقّق من المسار' }).click();
      }
    }
    ok((await text(box.locator('.l61-lab-status'))).includes(`${lab.cases.length} / ${lab.cases.length}`), `${lab.id}: case progress reaches full count`);
    await go61(page, 'map'); await go61(page, lab.id);
    ok(await page.locator(`[data-l61-lab="${lab.id}"] [data-l61-lab-feedback]`).count() === 1, `${lab.id}: checked case persists when navigating away and back`);
  }
  console.log(`Labs: ${LABS_61.length} consoles, ${LABS_61.reduce((s, l) => s + l.cases.length, 0)} cases checked.`);

  async function answerAttempt(article, item, value = item.answer) {
    if (item.options) await article.locator('.l61-options').getByRole('button', { name: value, exact: true }).click();
    else await article.locator('input[type=text]').fill(value);
    await article.getByRole('button', { name: 'تحقّق من الإجابة' }).click();
  }
  const sourcePracticeGroups = sourcePractices61(source);
  for (const [groupIndex, group] of PRACTICES_61.entries()) {
    await go61(page, group.id);
    const practiceText = await text(page.locator('#l61-main'));
    ok(practiceText.includes('حاول حل كل مجموعة قبل قراءة الحلول'), `${group.id}: source instruction to attempt the group before solutions is visible`);
    const instruction = sourcePracticeGroups[groupIndex].instruction;
    if (instruction) ok(normalizeSource61(practiceText).includes(normalizeSource61(instruction.text)), `${group.id}: the source-specific instruction at line ${instruction.line} is visible`);
    if (group.paragraph) {
      const work = page.locator('[data-l61-paragraph-attempt]');
      const modelButton = page.getByRole('button', { name: 'عرض الحل النموذجي للفقرة' });
      const draft = page.locator('#l61-paragraph-draft');
      const checklist = page.locator('[data-l61-paragraph-checklist] input');
      ok(group.items.length === 1 && await work.count() === 1 && await page.locator('[data-l61-attempt]').count() === 0, 'Practice 8 is one complete paragraph task, not seven substituted questions');
      ok((await text(page.locator('.l61-paragraph-prompt'))) === group.paragraph && await checklist.count() === 7, 'Practice 8 shows the entire original prompt and seven source components');
      ok(await modelButton.isDisabled() && await page.locator('[data-l61-paragraph-model]').count() === 0, 'Paragraph model is hidden and locked before a draft');
      await draft.fill(group.items[0].answer);
      for (let i = 0; i < 6; i++) await checklist.nth(i).check();
      ok(await modelButton.isDisabled() && await page.locator('[data-l61-paragraph-model]').count() === 0, 'Six checked parts cannot reveal the paragraph model');
      await checklist.nth(6).check();
      ok(await modelButton.isEnabled() && await page.locator('[data-l61-paragraph-model]').count() === 0, 'Full attempted paragraph enables but does not automatically reveal the model');
      await modelButton.click();
      const model = page.locator('[data-l61-paragraph-model]');
      ok(await model.locator('article').count() === 6 && (await text(model)).includes('مقارنة ذاتية'), 'Paragraph opens a self-review, not an automatic correctness verdict');
      for (const [i, line] of group.model.entries()) {
        const rendered = (await text(model.locator('article').nth(i))).replace(/\s/g, '');
        ok(rendered.includes(line.en.replace(/\s/g, '')) && rendered.includes(line.ar.replace(/\s/g, '')), `Paragraph model ${i + 1} preserves the original English and Arabic`);
      }
      ok((await text(page.locator('#l61-main .l61-progress-strip'))).includes('1 / 1'), 'Paragraph progress counts one task');
      await go61(page, 'map'); await go61(page, group.id);
      ok(await draft.inputValue() === group.items[0].answer && await page.locator('[data-l61-paragraph-model] article').count() === 6, 'Paragraph draft and model persist across navigation');
      await page.getByRole('button', { name: 'إعادة المحاولة' }).click();
      ok(await draft.inputValue() === '' && await page.locator('[data-l61-paragraph-model]').count() === 0 && await modelButton.isDisabled(), 'Paragraph retry clears draft, checks and model');
      continue;
    }
    const articles = page.locator('#l61-main [data-l61-attempt]');
    ok(await articles.count() === group.items.length && await page.locator('#l61-main [data-l61-feedback]').count() === 0, `${group.id}: all original questions rendered, answers initially hidden`);
    const first = group.items[0];
    const wrong = first.options ? first.options.find((option) => option !== first.answer && !(first.accept || []).includes(option)) : 'This is an incorrect response.';
    await answerAttempt(articles.first(), first, wrong);
    ok(await articles.first().locator('[data-l61-pending]').count() === 1 && await articles.first().locator('[data-l61-feedback]').count() === 0, `${group.id}: a wrong early attempt reveals neither verdict nor model`);
    await articles.first().getByRole('button', { name: 'إعادة المحاولة' }).click();
    ok(await articles.first().locator('[data-l61-pending]').count() === 0, `${group.id}: retry clears the pending attempt`);
    for (const [i, item] of group.items.entries()) {
      const value = group.id === 'practice-5' && (i === 1 || i === 3) ? item.accept[0] : item.answer;
      await answerAttempt(articles.nth(i), item, value);
      if (i < group.items.length - 1) ok(await page.locator('#l61-main [data-l61-feedback]').count() === 0 && await articles.nth(i).locator('[data-l61-pending]').count() === 1, `${group.id} question ${i + 1}: no solutions before all group attempts`);
    }
    ok(await page.locator('#l61-main [data-l61-feedback]').count() === group.items.length, `${group.id}: all explanations unlock after the complete group`);
    for (const [i, item] of group.items.entries()) {
      const feedback = (await text(articles.nth(i).locator('[data-l61-feedback]'))).replace(/\s/g, '');
      ok(feedback.includes('إجابةصحيحة') && feedback.includes((item.displayAnswer ?? item.answer).replace(/\s/g, '')) && feedback.includes(item.why.replace(/\s/g, '')), `${group.id} question ${i + 1}: original key, explanation and accepted answer displayed`);
      if (item.ar) ok(feedback.includes(item.ar.replace(/\s/g, '')), `${group.id} question ${i + 1}: source Arabic solution is displayed`);
    }
    ok((await text(page.locator('#l61-main .l61-progress-strip'))).includes(`${group.items.length} / ${group.items.length}`), `${group.id}: progress counts checked items`);
    if (group.postscript) ok((await text(page.locator('#l61-main'))).replace(/\s/g, '').includes(group.postscript.replace(/\s/g, '')), `${group.id}: original group-level explanation appears after all attempts`);
    await go61(page, 'map'); await go61(page, group.id);
    ok(await page.locator('#l61-main [data-l61-feedback]').count() === group.items.length, `${group.id}: attempts persist across navigation`);
  }
  console.log(`Practice: ${PRACTICES_61.reduce((s, g) => s + g.items.length, 0)} original tasks, including one complete paragraph.`);

  // The original instructions say to attempt the whole 25-question test first.
  await go61(page, 'original-key');
  ok(await page.locator('[data-l61-key-item]').count() === 25 && await page.locator('[data-l61-key-item] button').count() === 25, 'Original key contains 25 locked items before attempts');
  for (let section = 1; section <= 5; section++) {
    await go61(page, `original-${section}`);
    for (const q of ORIGINAL_TEST_61.filter((q) => q.section === section)) {
      const article = page.locator(`[data-l61-attempt="${q.n}"]`);
      ok(await article.locator('[data-l61-feedback]').count() === 0, `Original question ${q.n} has no feedback before attempt`);
      const value = q.n === 1 ? 'An incorrect response.' : q.n === 22 || q.n === 24 ? q.accept[0] : q.answer;
      await answerAttempt(article, q, value);
      if (q.n < 25) ok(await article.locator('[data-l61-pending]').count() === 1 && await page.locator('#l61-main [data-l61-feedback]').count() === 0, `Original question ${q.n}: no verdict or key before all 25 attempts`);
    }
    if (section === 4) {
      await go61(page, 'original-key');
      ok(await page.locator('[data-l61-key-item] button').count() === 25, 'The original key stays entirely locked after 20 of 25 attempts');
    }
  }
  await go61(page, 'original-1');
  const firstOriginal = page.locator('[data-l61-attempt="1"]');
  ok((await text(firstOriginal.locator('[data-l61-feedback]'))).includes('لا تطابق النموذج'), 'An intentionally wrong original answer is identified only after all 25 attempts');
  await firstOriginal.locator('input[type=text]').fill(ORIGINAL_TEST_61[0].answer);
  ok(await page.locator('#l61-main [data-l61-feedback]').count() === 0, 'Editing an original answer re-locks the key until it is checked again');
  await go61(page, 'original-key');
  ok(await page.locator('[data-l61-key-item] button').count() === 25, 'Editing an attempted original answer re-locks all key entries');
  await go61(page, 'original-1');
  await firstOriginal.getByRole('button', { name: 'تحقّق من الإجابة' }).click();
  ok((await text(firstOriginal.locator('[data-l61-feedback]'))).includes('إجابة صحيحة'), 'Corrected original answer is accepted after rechecking');
  await go61(page, 'original-key');
  for (const q of ORIGINAL_TEST_61) {
    const t = (await text(page.locator(`[data-l61-key-item="${q.n}"]`))).replace(/\s/g, '');
    ok(t.includes((q.displayAnswer ?? q.answer).replace(/\s/g, '')) && t.includes(q.why.replace(/\s/g, '')), `Original key ${q.n}: its source answer and explanation are displayed`);
  }
  ok(await page.locator('[data-l61-key-item] button').count() === 0, 'Original key reveals all 25 only after all attempts');

  await go61(page, 'comprehension');
  ok(await page.locator('[data-l61-attempt]').count() === 7 && await page.locator('[data-l61-feedback]').count() === 0, 'Seven reading answers are initially hidden');
  for (const [i, q] of READING_61.questions.entries()) {
    const article = page.locator('[data-l61-attempt]').nth(i);
    await article.locator('input').fill(q.a);
    await article.getByRole('button', { name: 'تحقّق من الإجابة' }).click();
    const feedback = await text(article.locator('[data-l61-feedback]'));
    ok(feedback.includes(q.a) && feedback.includes(q.aar), `Reading question ${i + 1}: answer and translation revealed after attempt`);
  }
  await go61(page, 'writing');
  const writing = page.locator('#l61-writing-draft');
  ok(await page.getByRole('button', { name: 'اقرأ نموذج الكتابة' }).isDisabled(), 'Writing model waits for a draft');
  await writing.fill('The teacher asked us if we were ready.');
  await page.locator('.l61-checklist input').first().check();
  await page.getByRole('button', { name: 'اقرأ نموذج الكتابة' }).click();
  ok(await page.locator('.l61-writing-model article').count() === 5, 'Writing model opens after draft');
  await go61(page, 'speaking');
  await page.locator('.l61-speaking button').first().click();
  await page.locator('.l61-input-label textarea').fill('A visit to a museum.');
  await go61(page, 'writing');
  ok(await writing.inputValue() === 'The teacher asked us if we were ready.' && await page.locator('.l61-checklist input').first().isChecked(), 'Writing draft and checklist survive navigation');
  await go61(page, 'speaking');
  ok(await page.locator('.l61-speaking button').first().getAttribute('aria-pressed') === 'true' && await page.locator('.l61-input-label textarea').inputValue() === 'A visit to a museum.', 'Speaking progress and notes survive navigation');

  // Shared test: all supported controls, no verdict before completion/submit,
  // navigation persistence, a wrong answer followed by a perfect re-take.
  await go61(page, 'final-test');
  const final = page.locator('[data-final-test="61"]');
  const submit = final.locator('[data-ft-submit]');
  ok(await final.locator('[data-ft-q]').count() === 15, 'Shared FinalTest renders all 15 questions');
  ok(await submit.isDisabled() && await final.locator('[data-ft-verdict], [data-ft-result]').count() === 0, 'Shared test initially gates submission and hides feedback');
  const counter = final.locator('header > div > span.rounded-full bdi');
  async function fractionIsLeftToRight(locator) {
    return locator.evaluate((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const chars = []; const range = document.createRange();
      while (walker.nextNode()) {
        const node = walker.currentNode;
        for (let i = 0; i < node.textContent.length; i++) {
          range.setStart(node, i); range.setEnd(node, i + 1);
          chars.push({ char: node.textContent[i], x: range.getBoundingClientRect().left });
        }
      }
      const digits = chars.filter((entry) => /[0-9]/.test(entry.char));
      return getComputedStyle(el).direction === 'ltr' && digits.map((entry) => entry.char).join('') === '015' && digits[0].x < digits[1].x && digits[1].x < digits[2].x;
    });
  }
  ok(await fractionIsLeftToRight(counter), 'Shared test counter visually reads 0 / 15 left to right');
  ok(await fractionIsLeftToRight(submit.locator('bdi')), 'Shared test submit counter visually reads 0/15 left to right');
  ok(await page.evaluate(async () => { await document.fonts.ready; return document.fonts.check('400 16px L61Arabic', 'مرحبا') && document.fonts.check('400 16px L61Latin', 'Hello'); }), 'Locally bundled Arabic and Latin fonts load even without Google Fonts');
  async function solve(q, index, wrong = false) {
    const item = final.locator(`[data-ft-q="${index + 1}"]`);
    if (q.type === 'single' || q.type === 'error') {
      const choice = wrong ? (q.answer + 1) % (q.type === 'single' ? q.options.length : q.segments.length) : q.answer;
      await item.locator('input[type=radio]').nth(choice).check();
    } else if (q.type === 'tf') await item.locator('input[type=radio]').nth((wrong ? !q.answer : q.answer) ? 0 : 1).check();
    else if (q.type === 'typed') await item.locator('input[type=text]').fill(wrong ? 'wrong' : q.accept[0]);
    else if (q.type === 'order') for (const part of q.items) await item.getByRole('button', { name: part, exact: true }).click();
    else if (q.type === 'multi') for (const n of q.answers) await item.locator('input[type=checkbox]').nth(n).check();
    else if (q.type === 'match') for (let i = 0; i < q.pairs.length; i++) await item.locator('select').nth(i).selectOption(String(i));
  }
  for (const [i, q] of TEST_61.entries()) {
    if (i === 14) {
      ok(await submit.isDisabled() && await final.locator('[data-ft-verdict]').count() === 0, 'Fourteen answers cannot submit or reveal feedback');
      await go61(page, 'map'); await go61(page, 'final-test');
      ok((await text(submit)).includes('14/15') && await final.locator('[data-ft-verdict]').count() === 0, 'Partial FinalTest answers persist between scenes without revealing feedback');
    }
    await solve(q, i, i === 0);
  }
  ok(await submit.isEnabled() && await final.locator('[data-ft-verdict]').count() === 0, 'All 15 answers enable submission without premature feedback');
  await submit.click();
  ok(await final.locator('[data-ft-verdict]').count() === 15 && await final.locator('[data-ft-verdict="wrong"]').count() === 1, 'Submit grades every answer and identifies an incorrect one');
  ok((await text(final.locator('[data-ft-q="1"]'))).includes(TEST_61[0].why), 'After submission the question explains its answer');
  await page.setViewportSize({ width: 320, height: 780 });
  const mobileFeedbackOrder = await final.locator('[data-ft-q="1"] [data-ft-verdict]').evaluate((verdict) => {
    const lines = [...verdict.querySelectorAll(':scope > div > .font-en[dir="ltr"]')];
    return lines.length === 2 && lines.every((line) => {
      const label = line.previousElementSibling;
      const style = getComputedStyle(line);
      return label && style.display === 'block' && style.direction === 'ltr' && style.unicodeBidi.includes('isolate') && line.getBoundingClientRect().top >= label.getBoundingClientRect().bottom - 1;
    });
  });
  ok(mobileFeedbackOrder, '320px graded English answers stay isolated on lines below their Arabic labels');
  await page.setViewportSize({ width: 1280, height: 900 });
  await go61(page, 'map'); await go61(page, 'final-test');
  ok(await final.locator('[data-ft-verdict]').count() === 15, 'Submitted FinalTest result persists across navigation');
  await final.locator('[data-ft-reset]').click();
  ok(await submit.isDisabled() && await final.locator('[data-ft-verdict]').count() === 0, 'Reset removes verdicts and requires all answers again');
  for (const [i, q] of TEST_61.entries()) await solve(q, i);
  await submit.click();
  ok(await final.locator('[data-ft-result="100"]').count() === 1 && await final.locator('[data-ft-verdict="correct"]').count() === 15, 'Teacher-key answers earn a genuine 15/15');
  await final.locator('[data-ft-teacher-link]').click();
  ok(await page.locator('#l61-main [data-area="teacher"]').count() === 1, 'FinalTest teacher link reaches teacher area');
  ok(await page.locator('[data-ft-key="61"]').count() === 0 && await page.locator('[data-l61-teacher-original], .l61-key-group, [data-l61-teacher-alternatives]').count() === 0, 'Shared, original and practice keys are not visible before password');
  const password = page.getByLabel('كلمة مرور المعلم');
  await password.fill('not-the-password'); await page.getByRole('button', { name: 'فتح مساحة المعلم' }).click();
  ok(await page.locator('[role=alert]').count() === 1 && await page.locator('[data-ft-key="61"]').count() === 0, 'Wrong teacher password is rejected');
  await password.fill('somer173'); await page.getByRole('button', { name: 'فتح مساحة المعلم' }).click();
  ok(await page.locator('[data-ft-key="61"] [data-ft-key-item]').count() === 15, 'Correct existing password reveals the shared 15-answer key');
  for (const [i, q] of TEST_61.entries()) {
    // LatinRuns splits bilingual text into directionally isolated spans; compare
    // the full content while ignoring whitespace at segment boundaries.
    const rendered = (await text(page.locator(`[data-ft-key-item="${i + 1}"]`))).replace(/\s/g, '');
    ok(rendered.includes(q.why.replace(/\s/g, '')), `Teacher shared key ${i + 1} includes its explanation`);
  }
  await page.getByRole('button', { name: 'عرض المفتاح الكامل' }).click();
  ok(await page.locator('[data-l61-teacher-original]').count() === 25, 'Teacher original key contains 25 answers');
  for (const q of ORIGINAL_TEST_61) {
    const keyText = (await text(page.locator(`[data-l61-teacher-original="${q.n}"]`))).replace(/\s/g, '');
    ok([q.displayAnswer ?? q.answer, q.why, ...(q.accept || [])].every((part) => keyText.includes(part.replace(/\s/g, ''))), `Teacher original key ${q.n} shows its source answer, explanation and every accepted alternative`);
  }
  await go61(page, 'final-test');
  ok(await final.locator('[data-ft-result="100"]').count() === 1, 'Navigating through teacher area preserves shared test result');
  ok(await final.locator('[data-ft-bar]').evaluate((e) => getComputedStyle(e).position) === 'static', 'Shared test action bar does not stick over question content');

  // Scan every scene at every requested width, including pseudo-elements and
  // accessible labels. Ensure content is within the scroll viewport horizontally.
  async function unlockedTeacherMetrics() {
    return page.evaluate(() => {
      const root = document.querySelector('.lesson61');
      const main = document.querySelector('#l61-main');
      const forbidden = /[\u0660-\u0669\u06f0-\u06f9\u2460-\u24ff\u2776-\u2793\u3248-\u324f\u3251-\u325f\u32b1-\u32bf\u{1f10b}-\u{1f10c}]/u;
      const visible = [...root.querySelectorAll('*')].filter((el) => el.getClientRects().length && !el.closest('[hidden]') && getComputedStyle(el).visibility !== 'hidden');
      const generatedOrLabels = visible.map((el) => `${getComputedStyle(el, '::before').content} ${getComputedStyle(el, '::after').content} ${el.getAttribute('aria-label') || ''} ${el.getAttribute('title') || ''}`).join(' ');
      return { forbidden: forbidden.test(root.innerText + generatedOrLabels), overflow: Math.max(document.documentElement.scrollWidth - document.documentElement.clientWidth, main.scrollWidth - main.clientWidth) };
    });
  }
  for (const [width, height] of [[320, 780], [360, 800], [390, 844], [414, 896], [1280, 900]]) {
    await page.setViewportSize({ width, height });
    for (const scene of LESSON_61_SCENES) {
      await go61(page, scene.id);
      const measurement = await page.evaluate(() => {
        const root = document.querySelector('.lesson61');
        const main = document.querySelector('#l61-main');
        const visible = (e) => !!e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[hidden]');
        const forbidden = /[\u0660-\u0669\u06f0-\u06f9\u2460-\u24ff\u2776-\u2793\u3248-\u324f\u3251-\u325f\u32b1-\u32bf\u{1f10b}-\u{1f10c}]/u;
        const visibleEls = [...root.querySelectorAll('*')].filter(visible);
        const bad = [];
        if (forbidden.test(root.innerText)) bad.push('visible text');
        for (const el of visibleEls) {
          const generated = `${getComputedStyle(el, '::before').content} ${getComputedStyle(el, '::after').content}`;
          const label = ['aria-label', 'title', 'placeholder'].map((a) => el.getAttribute(a) || '').join(' ');
          if (forbidden.test(generated + label)) { bad.push(`${el.tagName}.${el.className}`); if (bad.length > 3) break; }
        }
        const bounds = main.getBoundingClientRect();
        const outside = [...main.querySelectorAll('*')].filter(visible).filter((el) => {
          const r = el.getBoundingClientRect(); return r.width > 0 && (r.left < bounds.left - 1 || r.right > bounds.right + 1);
        }).slice(0, 4).map((el) => `${el.tagName}.${el.className}`);
        const badDir = [...main.querySelectorAll('.l61-en, .l61-mixed .font-en')].filter(visible).filter((el) => getComputedStyle(el).direction !== 'ltr' || !getComputedStyle(el).unicodeBidi.includes('isolate')).length;
        const nav = document.querySelector('[data-lesson-step-nav] [data-step-nav=next]');
        const lock = document.querySelector('[data-site-lock-slot] [data-site-lock-button]');
        const a = nav?.getBoundingClientRect(), b = lock?.getBoundingClientRect();
        const overlap = a && b ? Math.max(0, Math.min(a.right,b.right) - Math.max(a.left,b.left)) * Math.max(0, Math.min(a.bottom,b.bottom) - Math.max(a.top,b.top)) : -1;
        return { docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, mainOverflow: main.scrollWidth - main.clientWidth, bad, outside, badDir, overlap, rootDir: getComputedStyle(root).direction };
      });
      ok(measurement.bad.length === 0, `${width}px ${scene.id}: no forbidden rendered/generated/accessible digits (${measurement.bad.join(', ')})`);
      ok(measurement.docOverflow <= 1 && measurement.mainOverflow <= 1 && measurement.outside.length === 0, `${width}px ${scene.id}: no horizontal overflow (${JSON.stringify(measurement)})`);
      ok(measurement.rootDir === 'rtl' && measurement.badDir === 0, `${width}px ${scene.id}: RTL shell and isolated LTR runs`);
      ok(measurement.overlap === 0, `${width}px ${scene.id}: next and site-lock controls do not overlap (${measurement.overlap})`);
      if (scene.id === 'teacher') {
        await page.getByLabel('كلمة مرور المعلم').fill('somer173');
        await page.getByRole('button', { name: 'فتح مساحة المعلم' }).click();
        for (const [i, group] of PRACTICES_61.entries()) {
          const keyGroup = page.locator('.l61-key-group').nth(i);
          await keyGroup.locator('button').click();
          const teacherMetrics = await unlockedTeacherMetrics();
          ok(await keyGroup.locator('ol > li').count() === group.items.length && !teacherMetrics.forbidden && teacherMetrics.overflow <= 1, `${width}px teacher practice key ${i + 1}: all answers, Western digits and no overflow`);
          for (const [j, item] of group.items.entries()) {
            const keyText = (await text(keyGroup.locator('ol > li').nth(j))).replace(/\s/g, '');
            ok([item.displayAnswer ?? item.answer, item.why, ...(item.accept || []), ...(item.ar ? [item.ar] : [])].every((part) => keyText.includes(part.replace(/\s/g, ''))), `${width}px teacher practice ${i + 1}.${j + 1}: source answer, Arabic translation, explanation and every accepted alternative`);
          }
        }
        await page.getByRole('button', { name: 'عرض المفتاح الكامل' }).click();
        const teacherMetrics = await unlockedTeacherMetrics();
        ok(await page.locator('[data-l61-teacher-original]').count() === 25 && !teacherMetrics.forbidden && teacherMetrics.overflow <= 1, `${width}px teacher original and shared keys: Western digits and no overflow`);
        for (const item of ORIGINAL_TEST_61) {
          const keyItem = page.locator(`[data-l61-teacher-original="${item.n}"]`);
          const keyText = (await text(keyItem)).replace(/\s/g, '');
          ok([item.displayAnswer ?? item.answer, item.why, ...(item.accept || [])].every((part) => keyText.includes(part.replace(/\s/g, ''))), `${width}px teacher original ${item.n}: source answer, explanation and every accepted alternative`);
          const row = await keyItem.evaluate((element) => {
            const container = element.querySelector('[data-l61-teacher-original-row]');
            const number = container?.querySelector('bdi');
            const answer = container?.querySelector('.l61-en');
            const a = number?.getBoundingClientRect(), b = answer?.getBoundingClientRect();
            return { number: number?.textContent, direction: container ? getComputedStyle(container).direction : '', separated: !!a && !!b && a.width > 0 && b.width > 0 && a.right <= b.left + 1 };
          });
          ok(row.number === `${item.n}.` && row.direction === 'ltr' && row.separated, `${width}px teacher original ${item.n}: number is isolated before its LTR answer even when it wraps`);
        }
      }
    }
    await go61(page, 'final-test');
    const bar = page.locator('[data-final-test="61"] [data-ft-bar]');
    await bar.scrollIntoViewIfNeeded();
    const interactable = await bar.locator('[data-ft-reset]').evaluate((el) => {
      const r = el.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
      return top === el || el.contains(top);
    });
    ok(interactable, `${width}px: final-test action bar can be reached without being covered`);
    console.log(`Width ${width}: ${LESSON_61_SCENES.length} scenes inspected.`);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await go61(page, 'progress');
  ok(await page.locator('#l61-main a[href="#/lesson/62"]').count() === 0, 'Closing has no nonexistent Lesson 62 link');
  await page.locator('#l61-main a[href="#/lesson/60"]').click(); await page.locator('[data-lesson="60"]').waitFor();
  ok(page.url().endsWith('#/lesson/60'), 'Lesson 61 back link returns to 60');
  await page.goto(`${env.base}#/lesson/61`, { waitUntil: 'networkidle' });
  await go61(page, 'progress');
  await page.getByRole('button', { name: 'العودة إلى فهرس الدروس' }).click();
  await page.locator('a.group[href="#/lesson/61"]').waitFor();
  ok(await page.locator('a.group[href="#/lesson/61"]').count() === 1, 'Lesson 61 closing returns to the course index');
  ok(errors.length === 0, `No runtime or non-font resource errors: ${errors.join(' | ')}`);
  if (unavailableExternalFonts.length) console.log(`External Google Fonts: unavailable in this sandbox (${unavailableExternalFonts.length} events); bundled Lesson 61 fonts checked above.`);
} catch (err) {
  failures.push(`Unexpected browser audit error: ${err.stack || err}`); console.error(err);
} finally {
  await env.close();
}
if (failures.length) { console.error(`Lesson 61 browser audit FAILED: ${failures.length} failures, ${checks} checks.`); process.exitCode = 1; }
else { console.log(`Lesson 61 browser audit: ${checks}/${checks} passed.`); console.log('Western digits audit: PASS — no Arabic-Indic digits or circled numerals in Lesson 61 UI/content.'); }
