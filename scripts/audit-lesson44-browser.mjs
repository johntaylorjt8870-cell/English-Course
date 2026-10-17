// ============================================================
// Lesson 44 — optional real-Chromium verification.
//
// Provision (not a project dependency):
//   npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Run with the dev server up:
//   npm run dev -- --port 5173 --host 0.0.0.0
//   node scripts/audit-lesson44-browser.mjs
//
// Writes screenshots + a machine-readable report to docs/lesson44-visual-after/.
// Checks: rendered contrast (WCAG AA, every visible text node on its own
// background), horizontal overflow at 1280/1024/768, console/page errors,
// gated keys, answer states, keyboard focus visibility, and the 25-question
// test lock. Fonts are local; Google Fonts is blocked because the sandbox has
// no route to it (the lesson itself never requests it).
// ============================================================
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { brotliDecompressSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';

const work = 'node_modules/.lesson44-browser';
mkdirSync(work, { recursive: true });
writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')));
execFileSync('tar', ['-xf', `${work}/al2023.tar`, '-C', work]);
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ''}`;
const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });

let checks = 0;
const failures = [];
const ok = (condition, message) => { checks++; if (!condition) failures.push(message); };
const output = process.env.OUT || 'docs/lesson44-visual-after';
mkdirSync(output, { recursive: true });
const report = { viewports: [], contrast: [], heights: {}, shots: [], errors: [], focus: [], states: {} };
const base = process.env.LESSON44_URL || 'http://127.0.0.1:5173/English-Course/#/lesson/44';

const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.location().url || '')) errors.push(`${m.text()} ${m.location().url || ''}`); });
await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
await page.addInitScript(() => localStorage.setItem('englishwithsomer-site-unlocked', 'unlocked'));

async function shot(name, options = {}) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: false, animations: 'disabled', ...options });
  report.shots.push(path);
  console.log(`  [shot] ${path}`);
}
async function go(n) {
  if (await page.locator('.cover44').count()) {
    await page.locator('.coverActions44 button').first().click();
    await page.waitForTimeout(150);
  }
  await page.evaluate(step => {
    const chapter = [...document.querySelectorAll('.chapterBtn44')]
      .find(b => step >= Number(b.dataset.chapterStart) && step <= Number(b.dataset.chapterEnd));
    if (!chapter.closest('.chapter44').classList.contains('is-active')) chapter.click();
  }, n);
  await page.waitForTimeout(80);
  await page.evaluate(step => document.querySelector(`.sectionNav44 button[data-step="${step}"]`)?.click(), n);
  await page.waitForTimeout(250);
  await page.evaluate(() => document.fonts.ready);
}
async function measure(label) {
  const result = await page.evaluate(() => {
    const rgb = c => (c.match(/[\d.]+/g) || []).map(Number);
    const lum = c => {
      const a = c.slice(0, 3).map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; });
      return a[0] * .2126 + a[1] * .7152 + a[2] * .0722;
    };
    const issues = [];
    let tested = 0;
    let min = 100;
    let minText = '';
    const root = document.querySelector('.lesson44');
    for (const el of root.querySelectorAll('*')) {
      if (!el.getClientRects().length || getComputedStyle(el).visibility === 'hidden' || el.tagName === 'OPTION') continue;
      const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || el.matches('input,textarea,select');
      if (!hasText) continue;
      const style = getComputedStyle(el);
      const fg = rgb(style.color);
      let node = el;
      let bg;
      while (node) {
        const color = rgb(getComputedStyle(node).backgroundColor);
        if (color.length >= 3 && (color[3] === undefined || color[3] >= .99)) { bg = color; break; }
        node = node.parentElement;
      }
      bg ??= [255, 255, 255];
      const a = lum(fg), b = lum(bg);
      const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      const size = parseFloat(style.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
      const threshold = large ? 3 : 4.5;
      tested++;
      if (ratio < min) { min = ratio; minText = (el.textContent || '').trim().slice(0, 60); }
      if (ratio < threshold) issues.push({ text: (el.textContent || '').trim().slice(0, 90), ratio: Number(ratio.toFixed(2)), threshold, fg: style.color, bg: `rgb(${bg.slice(0, 3).join(',')})` });
    }
    return {
      width: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      tested, min: Number(min.toFixed(2)), minText,
      issues,
      docHeight: Math.round(document.querySelector('.lesson44').getBoundingClientRect().height),
      stepHeight: Math.round(document.querySelector('.step44, .cover44')?.getBoundingClientRect().height || 0),
    };
  });
  report.contrast.push({ label, ...result });
  ok(result.scroll <= result.width, `${label}: no horizontal overflow (${result.scroll} > ${result.width})`);
  ok(result.issues.length === 0, `${label}: contrast below 4.5 (${result.issues.slice(0, 3).map(i => `${i.text}=${i.ratio}`).join(' | ')})`);
  return result;
}

try {
  // ---------- desktop ----------
  await page.goto(base);
  await page.waitForSelector('.lesson44');
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => ({
    newsreader: document.fonts.check('400 20px Newsreader'),
    tajawal: document.fonts.check('400 17px Tajawal'),
    loaded: [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight} ${f.style}`),
  }));
  report.fonts = fonts;
  ok(fonts.newsreader && fonts.tajawal, `local fonts load (newsreader=${fonts.newsreader}, tajawal=${fonts.tajawal})`);
  let cover = await measure('desktop-cover');
  report.heights.cover = cover.docHeight;
  await shot('01-cover');

  // cover content / crux pair
  ok(await page.locator('.cruxPair44').count() === 1, 'cover renders the MUSTN\'T / DON\'T HAVE TO crux pair');
  ok(await page.locator('.coverIndex44 li').count() === 13, 'cover index lists 13 chapters');
  await page.locator('.crux44').scrollIntoViewIfNeeded();
  await shot('02-cover-crux');

  // tabs gating before submission
  ok(await page.locator('.areas44 button').nth(2).isDisabled(), 'solutions tab locked before submission');
  ok(await page.locator('.solCard44').count() === 0, 'no solutions DOM before submission');

  // ---------- steps ----------
  const stepShots = [
    [1, '03-step-01-goals'],
    [2, '04-step-02-builder'],
    [3, '05-step-03-check'],
    [11, '06-step-11-comparison'],
    [12, '07-step-12-dialogue'],
    [13, '08-step-13-prohibition'],
    [17, '09-step-17-questions'],
    [20, '10-step-20-past'],
    [23, '11-step-23-future'],
    [27, '12-step-27-detective'],
    [28, '13-step-28-practice'],
    [33, '14-step-33-reading'],
    [34, '15-step-34-test-brief'],
    [36, '16-step-36-writing'],
    [38, '17-step-38-roadmap'],
  ];
  for (const [n, name] of stepShots) {
    await go(n);
    const m = await measure(`desktop-step-${n}`);
    report.heights[`step${n}`] = m.stepHeight;
    await shot(name);
  }

  // ---------- answer states + feedback (step 28) ----------
  await go(28);
  const card = page.locator('[data-exercise-id="p28-1"]');
  await card.locator('.answer44').nth(1).click();
  await card.getByRole('button', { name: 'تحقّق' }).click();
  const wrongState = await card.locator('.answer44[data-state="wrong"]').count();
  const rightState = await card.locator('.answer44[data-state="right"]').count();
  report.states.answer = { wrongState, rightState, feedback: await card.locator('.fb44').innerText() };
  ok(wrongState === 1 && rightState === 1, 'checked answer shows correct and incorrect states together');
  ok((await card.locator('.fb44').innerText()).includes('المفتاح'), 'feedback states the key and explains it');
  await card.scrollIntoViewIfNeeded();
  await shot('18-state-answer-feedback');
  // focus ring
  await page.evaluate(() => document.querySelector('.answers44 .answer44').focus());
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  report.focus.push(await page.evaluate(() => {
    const el = document.activeElement;
    const s = getComputedStyle(el);
    return { outline: s.outlineWidth, style: s.outlineStyle, color: s.outlineColor, tag: el.tagName, cls: el.className };
  }));
  ok(report.focus.at(-1).outlineWidth !== '0px' && report.focus.at(-1).style !== 'none', 'keyboard focus is visible on answers');
  await shot('19-state-focus');

  // practice key gating
  ok(await page.locator('.sourceKey44').count() === 0, 'practice source key closed before all five checks');
  for (let i = 1; i <= 5; i++) {
    const c = page.locator(`[data-exercise-id="p28-${i}"]`);
    await c.locator('.answer44').first().click();
    await c.getByRole('button', { name: 'تحقّق' }).click();
  }
  ok(await page.locator('.sourceKey44').count() === 1, 'practice source key opens after five checks');
  await page.locator('.sourceKey44').scrollIntoViewIfNeeded();
  await shot('20-state-practice-key-open');

  // ---------- writing persists ----------
  await go(36);
  const draftText = 'I must study every evening. I have to help at home, and I mustn\'t waste time.';
  await page.locator('.writeBox44 textarea').fill(draftText);
  await go(37);
  await go(36);
  ok((await page.locator('.writeBox44 textarea').inputValue()).includes('must study'), 'writing draft survives navigation');
  await shot('21-step-36-writing-filled');

  // ---------- test ----------
  await page.evaluate(() => [...document.querySelectorAll('.areas44 button')].find(b => b.textContent.includes('الاختبار')).click());
  await page.waitForTimeout(300);
  const testMeasure = await measure('desktop-test');
  report.heights.test = testMeasure.docHeight;
  ok(await page.locator('.qField44').count() === 25, '25 question fieldsets render');
  ok(await page.locator('.testBar44 button[type=submit]').isDisabled(), 'submit disabled while incomplete');
  await shot('22-area-test');
  const fieldCount = await page.locator('.qField44').count();
  for (let i = 0; i < fieldCount; i++) {
    const field = page.locator('.qField44').nth(i);
    const radios = field.locator('input[type=radio]');
    if (await radios.count()) await radios.first().check();
    else {
      const areas = field.locator('textarea');
      for (let k = 0; k < await areas.count(); k++) await areas.nth(k).fill('answer');
    }
  }
  ok(!(await page.locator('.testBar44 button[type=submit]').isDisabled()), 'submit unlocks when every field is answered');
  await page.locator('.testBar44 button[type=submit]').click();
  await page.waitForTimeout(350);
  await shot('23-area-solutions');
  ok(await page.locator('.solCard44').count() === 25, '25 solution cards after submission');
  const solutionsMeasure = await measure('desktop-solutions');
  report.heights.solutions = solutionsMeasure.docHeight;
  await page.evaluate(() => [...document.querySelectorAll('.areas44 button')].find(b => b.textContent.includes('الاختبار')).click());
  await page.waitForTimeout(300);
  ok(await page.locator('.qField44[disabled]').count() === 25, 'test inputs lock after submission');

  // ---------- teacher ----------
  await page.evaluate(() => [...document.querySelectorAll('.areas44 button')].find(b => b.textContent.includes('المعلم')).click());
  await page.waitForTimeout(250);
  await shot('24-area-teacher-gate');
  await page.locator('.teacherGateCard44 input').fill('wrong');
  await page.locator('.teacherGateCard44 button[type=submit]').click();
  await page.waitForTimeout(150);
  ok(await page.locator('.teacherGateCard44 .fb44').count() === 1, 'wrong password is rejected');
  await page.locator('.teacherGateCard44 input').fill('somer173');
  await page.locator('.teacherGateCard44 button[type=submit]').click();
  await page.waitForTimeout(700);
  ok(await page.locator('[data-teacher-guide="44"]').count() === 1, 'teacher guide opens with the existing password');
  const teacherMeasure = await measure('desktop-teacher');
  report.heights.teacher = teacherMeasure.docHeight;
  await shot('25-area-teacher-guide');
  await page.locator('#tg-practice').scrollIntoViewIfNeeded();
  await shot('26-area-teacher-practice-keys');

  // ---------- responsive ----------
  await page.evaluate(() => [...document.querySelectorAll('.areas44 button')].find(b => b.textContent.includes('التعلّم')).click());
  for (const [width, height, label] of [[1024, 768, 'laptop-1024'], [768, 900, 'tablet-768'], [390, 844, 'phone-390']]) {
    await page.setViewportSize({ width, height });
    await page.goto(base);
    await page.waitForSelector('.lesson44');
    await page.evaluate(() => document.fonts.ready);
    const m = await measure(label);
    report.viewports.push({ label, ...m });
    await shot(`27-responsive-${label}`);
    await go(13);
    const m2 = await measure(`${label}-step13`);
    report.viewports.push({ label: `${label}-step13`, ...m2 });
    await shot(`28-responsive-${label}-step13`);
  }

  // ---------- summary ----------
  report.errors = errors;
  ok(errors.length === 0, `no console/page errors (${errors.slice(0, 3).join(' | ')})`);
  report.checks = checks;
  const failing = failures;
  writeFileSync(`${output}/browser-report.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(`\nRendered contrast: ${report.contrast.length} snapshots, lowest ${Math.min(...report.contrast.map(c => c.min)).toFixed(2)}:1.`);
  console.log(`Step heights (desktop, px): cover ${report.heights.cover}; ` + Object.entries(report.heights).filter(([k]) => k.startsWith('step')).map(([k, v]) => `${k} ${v}`).join(', '));
  if (failing.length) {
    for (const f of failing) console.error(`✕ ${f}`);
    console.error(`Lesson 44 browser audit FAILED: ${failing.length} of ${checks}`);
    process.exitCode = 1;
  } else {
    console.log(`Lesson 44 browser audit passed: ${checks} checks; screenshots + report in ${output}.`);
  }
} finally {
  await browser.close();
}
