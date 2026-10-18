// ============================================================
// Lesson 31 — optional real-Chromium visual verification.
//
// Provision (not a project dependency):
//   npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Run with the dev server up:
//   npm run dev -- --port 5173 --host 0.0.0.0
//   node scripts/audit-lesson31-browser.mjs
//
// Writes screenshots + a machine-readable report to docs/lesson31-visual/.
// Checks (laptop-first, then tablet/phone):
//   • compact header height (PR #59 principle: no repeated step title/lead)
//   • rendered WCAG AA contrast for every visible text node on its own background
//   • no horizontal overflow at 1440/1280/1024/768/375
//   • console/page errors
//   • the signature interactions actually change the DOM: interactive timeline,
//     tense comparison lab (2-way → 3-way), sentence builder, signal-word board,
//     Boss text analyzer, Final Boss analysis
//   • keyboard focus visibility, gated solutions, teacher password gate,
//     20-question test lock (no correctness before submit)
// Google Fonts is blocked because the sandbox has no route to it; the lesson
// renders with the project's own font stacks and sane fallbacks.
// ============================================================
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { brotliDecompressSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';

const work = 'node_modules/.lesson31-browser';
mkdirSync(work, { recursive: true });
writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')));
execFileSync('tar', ['-xf', `${work}/al2023.tar`, '-C', work]);
process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ''}`;
const browser = await playwright.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });

let checks = 0;
const failures = [];
const ok = (condition, message) => { checks++; if (!condition) failures.push(message); };
const output = process.env.OUT || 'docs/lesson31-visual';
mkdirSync(output, { recursive: true });
const report = { viewports: [], contrast: [], heights: {}, shots: [], errors: [], interactions: {}, states: {} };
const base = process.env.LESSON31_URL || 'http://127.0.0.1:5173/English-Course/#/lesson/31';

const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.location().url || '')) errors.push(`${m.text()} ${m.location().url || ''}`);
});
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
await page.addInitScript(() => localStorage.setItem('englishwithsomer-site-unlocked', 'unlocked'));

async function shot(name, options = {}) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: false, animations: 'disabled', ...options });
  report.shots.push(path);
  console.log(`  [shot] ${path}`);
}

/**
 * انتقل إلى خطوة بمعرّفها.
 * المسار الأول: الفهرس الجانبي (data-rail-step) — يعمل على سطح المكتب.
 * المسار الثاني (الشاشات الصغيرة حيث الفهرس مخفي): المشي بأزرار
 * «التالي ←» / «→ السابق» في الاتجاه الصحيح، مع الرجوع إلى منطقة الدرس أولًا.
 */
async function currentStepId() {
  return page.evaluate(() => document.querySelector('[data-area="l31-lesson"] [data-step-id]')?.getAttribute('data-step-id') || null);
}

async function goStep(id) {
  const rail = page.locator(`[data-rail-step="${id}"]`).first();
  if ((await rail.count()) > 0 && await rail.isVisible()) {
    await rail.click();
    await page.waitForTimeout(220);
    await page.evaluate(() => document.fonts.ready);
    return;
  }
  // الفهرس مخفي (عرض صغير) — امشِ بأزرار التنقل في الاتجاه الصحيح
  const order = await page.evaluate(() => [...document.querySelectorAll('[data-rail-step]')].map((b) => b.getAttribute('data-rail-step')));
  const unique = [...new Set(order)];
  const target = unique.indexOf(id);
  if (target === -1) return;
  for (let i = 0; i < unique.length + 2; i++) {
    const at = await currentStepId();
    if (at === id) break;
    const cur = unique.indexOf(at === null ? unique[0] : at);
    const forward = target > cur;
    const btn = page.locator(forward ? 'button:has-text("التالي ←")' : 'button:has-text("→ السابق")').last();
    if ((await btn.count()) === 0 || await btn.isDisabled()) break;
    await btn.click();
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
}

async function measure(label) {
  const result = await page.evaluate(() => {
    // ---- محلّل ألوان يدعم مخرجات Tailwind v4 (oklch) و rgb/rgba/hex ----
    const clamp255 = (v) => Math.max(0, Math.min(255, Math.round(v)));
    const gamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
    function oklchToRgb(L, C, hDeg, alpha = 1) {
      const h = (hDeg * Math.PI) / 180;
      const a = C * Math.cos(h);
      const b = C * Math.sin(h);
      const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
      const l = l_ ** 3, m = m_ ** 3, ss = s_ ** 3;
      const r = gamma(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * ss) * 255;
      const g = gamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * ss) * 255;
      const bb = gamma(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * ss) * 255;
      return [clamp255(r), clamp255(g), clamp255(bb), alpha];
    }
    function oklabToRgb(L, a, b, alpha = 1) {
      const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
      const l = l_ ** 3, m = m_ ** 3, ss = s_ ** 3;
      const r = gamma(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * ss) * 255;
      const g = gamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * ss) * 255;
      const bb = gamma(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * ss) * 255;
      return [clamp255(r), clamp255(g), clamp255(bb), alpha];
    }
    const num = (t) => parseFloat(t);
    /** يعيد [r,g,b,a] أو null إذا كان اللون شفافًا/غير معروف. */
    function parseColor(css) {
      if (!css) return null;
      const v = css.trim();
      if (v === 'transparent' || v === 'none') return null;
      let m = v.match(/^rgba?\(([^)]+)\)$/i);
      if (m) {
        const parts = m[1].split(/[\s,/]+/).filter(Boolean);
        const a = parts.length > 3 ? num(parts[3]) : 1;
        if (a <= 0.01) return null;
        return [clamp255(num(parts[0])), clamp255(num(parts[1])), clamp255(num(parts[2])), a];
      }
      m = v.match(/^oklch\(([^)]+)\)$/i);
      if (m) {
        const parts = m[1].split(/[\s/]+/).filter(Boolean);
        let L = num(parts[0]); if (String(parts[0]).includes('%')) L = L / 100;
        const C = num(parts[1]) || 0;
        let h = 0;
        const hPart = parts[2] || '0';
        h = num(hPart) || 0;
        if (String(hPart).endsWith('rad')) h = (num(hPart) * 180) / Math.PI;
        if (String(hPart).endsWith('turn')) h = num(hPart) * 360;
        const a = parts.length > 3 ? num(parts[3]) : 1;
        if (a <= 0.01) return null;
        return oklchToRgb(L, C, h, a);
      }
      m = v.match(/^oklab\(([^)]+)\)$/i);
      if (m) {
        const parts = m[1].split(/[\s/]+/).filter(Boolean);
        let L = num(parts[0]); if (String(parts[0]).includes('%')) L = L / 100;
        const a = parts.length > 3 ? num(parts[3]) : 1;
        if (a <= 0.01) return null;
        return oklabToRgb(L, num(parts[1]) || 0, num(parts[2]) || 0, a);
      }
      m = v.match(/^#([0-9a-f]{3,8})$/i);
      if (m) {
        let h = m[1];
        if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
        const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
        if (a <= 0.01) return null;
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), a];
      }
      return null;
    }
    /** كل محطّات اللون داخل تدرّج — نقيس النص ضد أسوئها. */
    function gradientStops(backgroundImage) {
      if (!backgroundImage || backgroundImage === 'none') return [];
      const out = [];
      const re = /(oklch\([^)]+\)|rgba?\([^)]+\)|#[0-9a-fA-F]{3,8})/g;
      let m;
      while ((m = re.exec(backgroundImage))) {
        const c = parseColor(m[1]);
        if (c) out.push(c);
      }
      return out;
    }
    const lum = (c) => {
      const a = c.slice(0, 3).map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    /** خلفية العنصر الفعلية: لون صريح، أو تدرّج، أو أول أصل غير شفاف. */
    function effectiveBackgrounds(el) {
      let node = el;
      while (node) {
        const st = getComputedStyle(node);
        const stops = gradientStops(st.backgroundImage);
        if (stops.length) return stops;
        const bg = parseColor(st.backgroundColor);
        if (bg && bg[3] >= 0.99) return [bg];
        node = node.parentElement;
      }
      return [[255, 255, 255, 1]];
    }
    /** مزج لون شبه شفاف فوق خلفية صلبة. */
    function compose(fg, bg) {
      const a = fg[3] === undefined ? 1 : fg[3];
      return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat([1]);
    }

    const root = document.querySelector('.lesson31');
    // عناصر الإسناد المشتركة (شريط واتساب + العلامة المائية) موحّدة في كل
    // الدروس: ليست من تصميم الدرس 31 ولا يجوز تعديلها من هنا، لذا تُستثنى
    // من القياس ويُذكر الاستثناء صراحة في التقرير.
    const signatureBar = [...root.children].find((c) => c.querySelector && c.querySelector('a[href*="wa.me"]'));
    const ghost = root.querySelector('.pointer-events-none.fixed.inset-0');
    const skip = (el) => (signatureBar && (signatureBar === el || signatureBar.contains(el))) || (ghost && (ghost === el || ghost.contains(el)));

    const issues = [];
    let tested = 0;
    let skippedShared = 0;
    let min = 100;
    let minText = '';
    for (const el of root.querySelectorAll('*')) {
      if (!el.getClientRects().length || getComputedStyle(el).visibility === 'hidden' || el.tagName === 'OPTION') continue;
      if (skip(el)) { skippedShared++; continue; }
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) || el.matches('input,textarea,select');
      if (!hasText) continue;
      const style = getComputedStyle(el);
      const rawFg = parseColor(style.color);
      if (!rawFg) continue;
      const bgs = effectiveBackgrounds(el);
      // النص يُرسم فوق أول خلفية؛ الألوان الأخرى هي محطات التدرّج (أسوأ حالة).
      const fg = compose(rawFg, bgs[0]);
      let worst = 100;
      for (const bg of bgs) {
        const a = lum(fg), b = lum(bg);
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        if (ratio < worst) worst = ratio;
      }
      const size = parseFloat(style.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
      const threshold = large ? 3 : 4.5;
      tested++;
      if (worst < min) { min = worst; minText = (el.textContent || '').trim().slice(0, 60); }
      if (worst < threshold) issues.push({ text: (el.textContent || '').trim().slice(0, 90), ratio: Number(worst.toFixed(2)), threshold, fg: style.color, bg: style.backgroundColor, bgImage: style.backgroundImage.slice(0, 70) });
    }
    const header = document.querySelector('.lesson31 .l31-header');
    const frame = document.querySelector('.lesson31 .l31-frame-wrap > section, .lesson31 .l31-cover-page');
    const scroller = document.getElementById('l31-main');
    return {
      width: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      tested, min: Number(min.toFixed(2)), minText, skippedShared,
      issues,
      headerHeight: header ? Math.round(header.getBoundingClientRect().height) : -1,
      frameTop: frame ? Math.round(frame.getBoundingClientRect().top) : -1,
      viewportHeight: window.innerHeight,
      scrollerHeight: scroller ? Math.round(scroller.getBoundingClientRect().height) : -1,
      shellHeight: Math.round(root.getBoundingClientRect().height),
    };
  });
  report.contrast.push({ label, ...result });
  ok(result.scroll <= result.width, `${label}: no horizontal overflow (${result.scroll} > ${result.width})`);
  ok(result.issues.length === 0, `${label}: contrast below threshold (${result.issues.slice(0, 4).map((i) => `${i.text}=${i.ratio}`).join(' | ')})`);
  return result;
}

try {
  // ---------------- سطح المكتب (لابتوب) ----------------
  await page.goto(base);
  await page.waitForSelector('.lesson31');
  await page.evaluate(() => document.fonts.ready);

  const fonts = await page.evaluate(() => ({
    rubik: document.fonts.check('400 20px Rubik'),
    tajawal: document.fonts.check('400 17px Tajawal'),
    changa: document.fonts.check('700 20px Changa'),
    loaded: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`),
  }));
  report.fonts = fonts;
  console.log(`  [fonts] loaded=${fonts.loaded.length} rubik=${fonts.rubik} tajawal=${fonts.tajawal} changa=${fonts.changa}`);

  // الرأس المختصر: لا يكرر عنوان الخطوة ولا وصفها
  const headerText = await page.evaluate(() => (document.querySelector('.lesson31 .l31-header')?.textContent || '').replace(/\s+/g, ' ').trim());
  const frameTitle = await page.evaluate(() => (document.querySelector('.lesson31 .l31-frame-wrap h2, .lesson31 .l31-cover-page h1')?.textContent || '').replace(/\s+/g, ' ').trim());
  report.states.headerText = headerText;
  report.states.frameTitle = frameTitle;
  ok(headerText.includes('خطوة 1 من 50'), `compact header shows the step counter (got "${headerText.slice(0, 60)}")`);
  ok(/منطقة الاختبارات/.test(headerText) && /حلول الاختبارات/.test(headerText) && /منطقة المعلم/.test(headerText), 'header keeps all four area tabs');
  ok(/🔒/.test(headerText), 'header shows the solutions lock indicator');
  ok(frameTitle.length > 0 && !headerText.includes(frameTitle), `header does not repeat the step title ("${frameTitle.slice(0, 40)}")`);
  ok((headerText.match(/🌉|جسر الحاضر/g) || []).length <= 1, 'header does not duplicate the lesson title/lead block');

  let m = await measure('desktop-cover');
  report.heights.cover = m;
  ok(m.headerHeight > 0 && m.headerHeight <= 120, `compact header height on laptop (${m.headerHeight}px ≤ 120px)`);
  ok(m.shellHeight <= m.viewportHeight + 2, `lesson fills exactly one screen, no page-level scroll (${m.shellHeight} ≤ ${m.viewportHeight})`);
  ok(m.scrollerHeight > 300, `content scroller has real room (${m.scrollerHeight}px)`);
  await shot('desktop-01-cover');

  // الفهرس الجانبي: 50 خطوة
  const railCount = await page.evaluate(() => document.querySelectorAll('.lesson31 nav[aria-label="خطوات الدرس 31"] button').length);
  ok(railCount === 50, `desktop rail lists all 50 steps (${railCount})`);

  // ---------- (أ) الخط الزمني التفاعلي — خطوة pspp ----------
  await goStep('pspp');
  ok((await currentStepId()) === 'pspp', 'pspp step reached through the rail/next navigation');
  const beforeView = await page.evaluate(() => document.querySelector('[data-viewpoint]')?.getAttribute('data-viewpoint'));
  const timelineHtmlBefore = await page.evaluate(() => document.querySelector('[data-en-seq="l31-pspp-timeline-lab"]')?.innerHTML.length || 0);
  await page.locator('[data-viewpoint="fixed"]').click();
  await page.waitForTimeout(250);
  const afterView = await page.evaluate(() => document.querySelector('[data-viewpoint="fixed"]')?.getAttribute('aria-pressed'));
  const bridgeWidth = await page.evaluate(() => document.querySelector('.l31-track-bridge')?.style.width || '');
  const sentenceShown = await page.evaluate(() => (document.querySelector('[data-en-seq="l31-pspp-timeline-lab"]')?.textContent || '').includes('I lost my keys yesterday.'));
  report.interactions.timeline = { beforeView, afterView, bridgeWidth, sentenceShown, timelineHtmlBefore };
  ok(afterView === 'true', 'timeline: viewpoint button reports pressed state');
  ok(bridgeWidth === '0%', `timeline: Past Simple viewpoint closes the bridge to NOW (width=${bridgeWidth})`);
  ok(sentenceShown, 'timeline: the Past Simple source sentence is displayed');
  await measure('desktop-pspp-timeline');
  await shot('desktop-02-timeline-past-simple');
  await page.locator('[data-viewpoint="linked"]').click();
  await page.waitForTimeout(250);
  const bridgeLinked = await page.evaluate(() => document.querySelector('.l31-track-bridge')?.style.width || '');
  const nowZone = await page.evaluate(() => getComputedStyle(document.querySelector('.l31-track-nowzone')).opacity);
  ok(bridgeLinked === '78%', `timeline: Present Perfect viewpoint opens the bridge (width=${bridgeLinked})`);
  ok(nowZone === '1', `timeline: NOW result zone is fully visible when linked (opacity=${nowZone})`);
  await shot('desktop-03-timeline-present-perfect');

  // ---------- (ب) مختبر مقارنة الأزمنة — خطوة s28 ----------
  await goStep('s28');
  const lensBefore = await page.evaluate(() => document.querySelectorAll('[data-lens-pick]').length);
  await page.locator('[data-triple-toggle]').click();
  await page.waitForTimeout(250);
  const lensAfter = await page.evaluate(() => document.querySelectorAll('[data-lens-pick]').length);
  const triplePressed = await page.evaluate(() => document.querySelector('[data-triple-toggle]')?.getAttribute('aria-pressed'));
  const pperfShown = await page.evaluate(() => (document.querySelector('[data-en-seq="l31-s28-lenslab-inner"]')?.textContent || '').includes('I had seen the museum before we entered the city.'));
  report.interactions.compare = { lensBefore, lensAfter, triplePressed, pperfShown };
  ok(lensBefore === 2 && lensAfter === 3, `compare lab grows from 2 lenses to 3 (${lensBefore} → ${lensAfter})`);
  ok(triplePressed === 'true', 'compare lab: triple toggle reports pressed state');
  ok(pperfShown, 'compare lab: the Past Perfect source example is displayed in triple mode');
  await measure('desktop-s28-compare');
  await shot('desktop-04-compare-lab-triple');
  await page.locator('[data-lens-pick="ps"]').click();
  await page.waitForTimeout(220);
  const psExample = await page.evaluate(() => (document.querySelector('[data-en-seq="l31-s28-lenslab-inner"]')?.textContent || '').includes('I watched that movie last night.'));
  ok(psExample, 'compare lab: switching the lens swaps the explanation and example');

  // ---------- (ج) مختبر بناء الجملة — خطوة s5 ----------
  await goStep('s5');
  await page.locator('[data-build-subject="She"]').click();
  await page.waitForTimeout(120);
  await page.locator('[data-build-helper="have"]').click();
  await page.waitForTimeout(180);
  const wrongHelper = await page.evaluate(() => {
    const el = document.querySelector('[data-en-seq="l31-s5-builder-lab"]');
    return (el?.textContent || '').includes('ليس have');
  });
  ok(wrongHelper, 'builder: choosing the wrong helper explains the correction immediately');
  await shot('desktop-05-builder-wrong-helper');
  await page.locator('[data-build-helper="has"]').click();
  await page.waitForTimeout(120);
  await page.locator('[data-build-verb="go"]').click();
  await page.waitForTimeout(120);
  await page.locator('[data-build-form="v2"]').click();
  await page.waitForTimeout(180);
  const v2Trap = await page.evaluate(() => (document.querySelector('[data-en-seq="l31-s5-builder-lab"]')?.textContent || '').includes('مكانها في Past Simple'));
  ok(v2Trap, 'builder: the V2 trap is explained (went is not allowed after has)');
  await page.locator('[data-build-form="v3"]').click();
  await page.waitForTimeout(200);
  const builtSentence = await page.evaluate(() => {
    const el = document.querySelector('[data-en-seq="l31-s5-builder-lab"] [role="status"]');
    return (el?.textContent || '').replace(/\s+/g, ' ').trim();
  });
  report.interactions.builder = { builtSentence };
  ok(builtSentence.includes('She has gone home.'), `builder: assembles the correct sentence (got "${builtSentence.slice(0, 60)}")`);
  await page.locator('[data-build-mode="neg"]').click();
  await page.waitForTimeout(200);
  const negSentence = await page.evaluate(() => (document.querySelector('[data-en-seq="l31-s5-builder-lab"] [role="status"]')?.textContent || '').replace(/\s+/g, ' ').trim());
  ok(negSentence.includes("She hasn't gone home."), `builder: negative form switches live (got "${negSentence.slice(0, 60)}")`);
  await page.locator('[data-build-mode="q"]').click();
  await page.waitForTimeout(200);
  const qSentence = await page.evaluate(() => (document.querySelector('[data-en-seq="l31-s5-builder-lab"] [role="status"]')?.textContent || '').replace(/\s+/g, ' ').trim());
  ok(qSentence.includes('Has she gone home?'), `builder: question form switches live (got "${qSentence.slice(0, 60)}")`);
  await measure('desktop-s5-builder');
  await shot('desktop-06-builder-question');

  // ---------- (د) لوحة الكلمات الدالة — خطوة s12 ----------
  await goStep('s12');
  const signalCount = await page.evaluate(() => document.querySelectorAll('[data-signal-word]').length);
  ok(signalCount === 10, `signal board lists all ten cue words (${signalCount})`);
  await page.locator('[data-signal-word="yet"]').click();
  await page.waitForTimeout(250);
  const yetPanel = await page.evaluate(() => {
    const el = document.querySelector('[data-en-seq="l31-s12-signals-board"]');
    const t = (el?.textContent || '').replace(/\s+/g, ' ');
    return { position: t.includes('في نهاية السؤال والجملة المنفية'), example: t.includes("Have you finished your homework yet?"), formula: t.includes('yet') };
  });
  report.interactions.signalBoard = { signalCount, yetPanel };
  ok(yetPanel.position, 'signal board: shows the usual sentence position');
  ok(yetPanel.example, 'signal board: shows the source example');
  ok(await page.locator('[data-signal-word="yet"]').getAttribute('aria-pressed') === 'true', 'signal board: pressed state exposed');
  await measure('desktop-s12-signals');
  await shot('desktop-07-signal-board');

  // ---------- (هـ) Grammar Detective — خطوة s35 ----------
  await goStep('s35');
  const detectiveItems = await page.evaluate(() => document.querySelectorAll('[data-fix-item]').length);
  ok(detectiveItems === 8, `Grammar Detective renders all eight source errors (${detectiveItems})`);
  const hiddenBefore = await page.evaluate(() => (document.querySelector('[data-fix-item="1"]')?.textContent || '').includes('She has gone to school.'));
  ok(!hiddenBefore, 'detective: the correction is hidden before the student attempts it');
  await page.locator('[data-fix-item="1"] [data-fix-seg="2"]').click();
  await page.waitForTimeout(150);
  await page.locator('[data-fix-item="1"] [data-fix-opt="0"]').click();
  await page.waitForTimeout(250);
  const fixedOne = await page.evaluate(() => (document.querySelector('[data-fix-item="1"]')?.textContent || '').includes('She has gone to school.'));
  ok(fixedOne, 'detective: two-step fix reveals the corrected sentence with its explanation');
  await measure('desktop-s35-detective');
  await shot('desktop-08-detective');

  // ---------- (ز) Boss Challenge + Final Boss ----------
  await goStep('s39');
  const phrases = await page.evaluate(() => document.querySelectorAll('[data-boss-phrase]').length);
  ok(phrases === 6, `Boss text analyzer exposes all six verb phrases (${phrases})`);
  await page.locator('[data-boss-phrase="joined"]').click();
  await page.waitForTimeout(250);
  const bossReading = await page.evaluate(() => {
    const el = document.querySelector('[data-en-seq="l31-s39-analyzer"] [aria-live="polite"]');
    return (el?.textContent || '').replace(/\s+/g, ' ').trim();
  });
  report.interactions.bossAnalyzer = { phrases, bossReading };
  ok(bossReading.includes('Past Simple') && bossReading.includes('last year'), `Boss analyzer explains the tense reason (got "${bossReading.slice(0, 70)}")`);
  await shot('desktop-09-boss-analyzer');

  await goStep('s43');
  const bossItems = await page.evaluate(() => document.querySelectorAll('[data-boss-item]').length);
  ok(bossItems === 4, `Final Boss renders all four sentences (${bossItems})`);
  await page.locator('[data-boss-tense="3:Present Perfect"]').click();
  await page.waitForTimeout(200);
  await page.locator('[data-boss-analysis="3"]').click();
  await page.waitForTimeout(250);
  const analysisText = await page.evaluate(() => (document.querySelector('[data-boss-item="3"]')?.textContent || '').replace(/\s+/g, ' ').trim());
  ok(analysisText.includes('سبب الاختيار') && analysisText.includes('الخط الزمني المصغّر'), 'Final Boss: a correct pick opens the reason + timeline, not just a colour');
  await measure('desktop-s43-final-boss');
  await shot('desktop-10-final-boss-analysis');

  // ---------- الملخص وخريطة المنهج + الاختبار النهائي ----------
  await goStep('map');
  const finalTestVisible = await page.evaluate(() => !!document.querySelector('[data-final-test="31"]'));
  ok(finalTestVisible, 'the shared Final Test layer appears on the last step only');
  const ftQuestions = await page.evaluate(() => document.querySelectorAll('[data-final-test="31"] [data-ft-q]').length);
  ok(ftQuestions >= 12 && ftQuestions <= 15, `Final Test renders its 12–15 questions (${ftQuestions})`);
  await shot('desktop-11-map-final-test');

  // ---------- منطقة الاختبارات: 20 سؤالًا، مقفلة قبل التسليم ----------
  await page.locator('nav[aria-label="مناطق الدرس"] button:has-text("منطقة الاختبارات")').click();
  await page.waitForTimeout(300);
  const testCards = await page.evaluate(() => document.querySelectorAll('[data-area="l31-test"] [data-test-q]').length);
  ok(testCards === 20, `test area renders all 20 questions (${testCards})`);
  const preSubmit = await page.evaluate(() => {
    const el = document.querySelector('[data-area="l31-test"]');
    const t = el?.textContent || '';
    return { score: t.includes('نتيجتك'), submitDisabled: !!el?.querySelector('button[disabled]') };
  });
  ok(!preSubmit.score, 'test area leaks no score before submit');
  await measure('desktop-test-area');
  await shot('desktop-12-test-area');

  // ---------- الحلول مقفلة ----------
  await page.locator('nav[aria-label="مناطق الدرس"] button:has-text("حلول الاختبارات")').click();
  await page.waitForTimeout(250);
  const lockedText = await page.evaluate(() => (document.querySelector('[data-area="l31-solutions"]')?.textContent || '').replace(/\s+/g, ' '));
  ok(lockedText.includes('مقفلة'), 'solutions stay locked before entitlement');
  await shot('desktop-13-solutions-locked');

  // ---------- منطقة المعلم: كلمة المرور ----------
  await page.locator('nav[aria-label="مناطق الدرس"] button:has-text("منطقة المعلم")').click();
  await page.waitForTimeout(250);
  const teacherLocked = await page.evaluate(() => (document.querySelector('[data-area="l31-teacher"]')?.textContent || '').includes('مغلقة بكلمة مرور'));
  ok(teacherLocked, 'teacher area starts behind the password gate');
  await shot('desktop-14-teacher-locked');
  await page.fill('#teacher-pw-31', 'wrong-pass');
  await page.locator('[data-area="l31-teacher"] button:has-text("دخول")').click();
  await page.waitForTimeout(250);
  const wrongPw = await page.evaluate(() => (document.querySelector('[data-area="l31-teacher"]')?.textContent || '').includes('كلمة المرور غير صحيحة'));
  ok(wrongPw, 'wrong teacher password is rejected');
  await page.fill('#teacher-pw-31', 'somer173');
  await page.locator('[data-area="l31-teacher"] button:has-text("دخول")').click();
  await page.waitForTimeout(400);
  const teacherOpen = await page.evaluate(() => {
    const t = document.querySelector('[data-area="l31-teacher"]')?.textContent || '';
    return { overview: t.includes('جوهر الدرس'), notes: t.includes('مذكرات تدريسية'), key: document.querySelectorAll('[data-ft-key-item]').length };
  });
  report.states.teacher = teacherOpen;
  ok(teacherOpen.overview && teacherOpen.notes, 'somer173 unlocks the full teacher area');
  ok(teacherOpen.key >= 12, `teacher area shows the Final Test answer key (${teacherOpen.key} items)`);
  await measure('desktop-teacher-open');
  await shot('desktop-15-teacher-open');

  // ---------- حالة ما بعد التسليم في منطقة الاختبارات ----------
  await page.locator('nav[aria-label="مناطق الدرس"] button:has-text("منطقة الاختبارات")').click();
  await page.waitForTimeout(250);
  const answeredAll = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const cards = [...document.querySelectorAll('[data-area="l31-test"] [data-test-q]')];
    for (const card of cards) {
      const click = (el) => { if (el && !el.disabled) el.click(); };
      // اختيار واحد / صح-خطأ / اكتشف الخطأ: أول عنصر
      const simple = card.querySelector('[data-opt], [data-tf], [data-spot-seg]');
      if (simple) { click(simple); await wait(6); continue; }
      // اختيار متعدد: عنصران
      const multi = [...card.querySelectorAll('[data-multi]')];
      if (multi.length) { click(multi[0]); await wait(6); click(multi[1]); await wait(6); continue; }
      // ترتيب: أعِد الاستعلام بعد كل نقرة (React يعيد رسم الحوض)
      if (card.querySelector('[data-order-pool]')) {
        for (let guard = 0; guard < 12; guard++) {
          const next = [...card.querySelectorAll('[data-order-pool]')].find((b) => !b.disabled);
          if (!next) break;
          next.click();
          await wait(10);
        }
        continue;
      }
      // مطابقة: لكل صف (بالفهرس) اختر أول خيار متاح — مع إعادة الاستعلام
      if (card.querySelector('[data-match-row]')) {
        const rowIdxs = [...new Set([...card.querySelectorAll('[data-match-row]')].map((b) => b.getAttribute('data-match-row')))];
        for (const ri of rowIdxs) {
          const opt = [...card.querySelectorAll(`[data-match-row="${ri}"]`)].find((b) => !b.disabled);
          if (opt) { opt.click(); await wait(10); }
        }
        continue;
      }
    }
    return cards.length;
  });
  ok(answeredAll === 20, `all 20 test cards accepted an answer (${answeredAll})`);
  await page.waitForTimeout(300);
  const progressTxt = await page.evaluate(() => {
    const el = [...document.querySelectorAll('[data-area="l31-test"] *')].find((x) => /مُجابة/.test(x.textContent || '') && x.children.length === 0);
    return el ? el.textContent.trim() : '(none)';
  });
  console.log(`  [test progress] ${progressTxt}`);
  const submitBtn = page.locator('[data-area="l31-test"] button:has-text("إنهاء الاختبار")');
  if (await submitBtn.isEnabled()) {
    await submitBtn.click();
    await page.waitForTimeout(350);
    const graded = await page.evaluate(() => {
      const el = document.querySelector('[data-area="l31-test"]');
      const t = el?.textContent || '';
      return { score: /نتيجتك:/.test(t), marks: el?.querySelectorAll('[data-test-q]').length };
    });
    ok(graded.score, 'submitting reveals the score (and only then)');
    await measure('desktop-test-graded');
    await shot('desktop-21-test-graded');
  }

  // ---------- تركيز لوحة المفاتيح مرئي ----------
  await page.locator('nav[aria-label="مناطق الدرس"] button:has-text("الدرس")').first().click();
  await page.waitForTimeout(250);
  await goStep('s1');
  // التركيز يُقاس بلوحة المفاتيح الحقيقية حتى تنطبق :focus-visible
  await page.evaluate(() => document.querySelector('.lesson31 .l31-frame-wrap button')?.focus());
  await page.keyboard.press('Tab');
  await page.waitForTimeout(150);
  const focusVisible = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return { found: false };
    const st = getComputedStyle(el);
    return {
      found: true,
      tag: el.tagName,
      text: (el.textContent || '').trim().slice(0, 30),
      outline: st.outlineStyle,
      width: st.outlineWidth,
      color: st.outlineColor,
      matchesFocusVisible: el.matches(':focus-visible'),
    };
  });
  report.states.focus = focusVisible;
  ok(focusVisible.found, 'keyboard Tab moves focus to a lesson control');
  ok(focusVisible.matchesFocusVisible && focusVisible.outline !== 'none' && parseFloat(focusVisible.width) >= 2,
    `keyboard focus ring is visible (outline ${focusVisible.width} ${focusVisible.outline} ${focusVisible.color})`);
  await shot('desktop-16-focus');

  // ---------- حالات hover / selected / disabled مقروءة ----------
  await goStep('s3');
  const chip = page.locator('[data-helper-subj]').first();
  const beforeHover = await chip.evaluate((el) => getComputedStyle(el).borderTopColor);
  await chip.hover();
  await page.waitForTimeout(160);
  const afterHover = await chip.evaluate((el) => getComputedStyle(el).borderTopColor);
  await chip.click();
  await page.waitForTimeout(200);
  const selected = await chip.evaluate((el) => ({
    pressed: el.getAttribute('aria-pressed'),
    bg: getComputedStyle(el).backgroundColor,
  }));
  report.states.hover = { beforeHover, afterHover, selected };
  ok(beforeHover !== afterHover, `hover state is visible (border ${beforeHover} → ${afterHover})`);
  ok(selected.pressed === 'true', 'selected state is exposed through aria-pressed');

  await goStep('s36');
  const disabledState = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.lesson31 [data-area="l31-lesson"] button[disabled]')];
    return btns.length;
  });
  await goStep('cover');
  const navDisabled = await page.evaluate(() => {
    const prev = [...document.querySelectorAll('button')].find((b) => (b.textContent || '').trim() === '→ السابق');
    if (!prev) return null;
    return { disabled: prev.disabled, opacity: getComputedStyle(prev).opacity };
  });
  report.states.disabled = { disabledState, navDisabled };
  ok(navDisabled && navDisabled.disabled === true && parseFloat(navDisabled.opacity) < 0.6,
    `disabled state is readable (previous button disabled at step 1, opacity ${navDisabled?.opacity})`);

  // ---------------- أحجام أخرى ----------------
  for (const vp of [{ width: 1280, height: 800, name: 'laptop-1280' }, { width: 1024, height: 768, name: 'tablet-1024' }, { width: 768, height: 1024, name: 'tablet-768' }]) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(250);
    await goStep('s1');
    const r = await measure(vp.name);
    report.viewports.push({ name: vp.name, headerHeight: r.headerHeight, shellHeight: r.shellHeight, viewportHeight: r.viewportHeight });
    ok(r.shellHeight <= vp.height + 2, `${vp.name}: still one screen, no page scroll (${r.shellHeight} ≤ ${vp.height})`);
    if (vp.name === 'laptop-1280') await shot('desktop-17-1280');
    if (vp.name === 'tablet-768') await shot('tablet-18-768');
  }

  // ---------------- الهاتف ----------------
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(250);
  await goStep('cover');
  const mob = await measure('mobile-375');
  report.viewports.push({ name: 'mobile-375', headerHeight: mob.headerHeight, shellHeight: mob.shellHeight, viewportHeight: mob.viewportHeight });
  ok(mob.shellHeight <= 814, `mobile: one screen shell (${mob.shellHeight} ≤ 812)`);
  await shot('mobile-19-cover');
  const menuBtn = page.locator('button[aria-label="فهرس خطوات الدرس"]');
  ok(await menuBtn.count() === 1, 'mobile: step index button present');
  await menuBtn.click();
  await page.waitForTimeout(300);
  const drawerSteps = await page.evaluate(() => document.querySelectorAll('#l31-mobile-step-navigation button').length);
  ok(drawerSteps === 50, `mobile drawer lists all 50 steps (${drawerSteps})`);
  const focusedInDrawer = await page.evaluate(() => !!document.querySelector('#l31-mobile-navigation :focus'));
  ok(focusedInDrawer, 'mobile drawer moves focus inside the dialog on open');
  await shot('mobile-20-drawer');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  const drawerClosed = await page.evaluate(() => document.querySelectorAll('#l31-mobile-navigation').length === 0);
  ok(drawerClosed, 'Escape closes the mobile drawer');
  const focusReturned = await page.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'فهرس خطوات الدرس');
  ok(focusReturned, 'focus returns to the index button after the drawer closes');

  report.errors = errors;
  ok(errors.length === 0, `no console/page errors (${errors.slice(0, 3).join(' | ')})`);
} catch (err) {
  failures.push(`runtime: ${err.stack || err}`);
  try { await shot('error-state'); } catch { /* ignore */ }
} finally {
  report.checks = checks;
  report.failures = failures;
  writeFileSync(`${output}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}

if (failures.length) {
  console.error(`✕ Lesson 31 browser audit FAILED (${failures.length}/${checks})`);
  for (const f of failures.slice(0, 30)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ Lesson 31 browser audit passed (${checks} assertions) — screenshots + report in ${output}/`);
