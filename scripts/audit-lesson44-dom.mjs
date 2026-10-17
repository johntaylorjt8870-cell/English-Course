// ============================================================
// Lesson 44 — DOM / interaction audit (English Learning Studio).
//
// Mounts the real lesson in jsdom and asserts the contracts that static data
// cannot prove: every source unit reaches the DOM, practice/reading/detective
// keys stay closed until the attempt, the test cannot be submitted early and
// reveals nothing before submission, solutions and the teacher guide stay
// gated, writing survives navigation, and every rendered snapshot is free of
// mixed Arabic/English BIDI violations.
//
//   node scripts/audit-lesson44-dom.mjs
// ============================================================
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { analyzeHtml } from './lib/bidi-sim.mjs';

const dom = new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'HTMLInputElement', 'HTMLTextAreaElement', 'HTMLSelectElement', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent', 'MutationObserver', 'getComputedStyle']) {
  Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
mkdirSync('node_modules/.lesson44-audit', { recursive: true });
await build({
  stdin: {
    contents: `export { default as Lesson44 } from './src/lessons/lesson44/Lesson44';
export { Text44 } from './src/lessons/lesson44/kit44';
export { SOURCE_SECTIONS_44 } from './src/lessons/lesson44/ledger44';
export { TEST_SOLUTIONS_44 } from './src/lessons/lesson44/solutionsData44';`,
    resolveDir: process.cwd(), loader: 'tsx',
  },
  outfile: 'node_modules/.lesson44-audit/ui.mjs', bundle: true, platform: 'node', format: 'esm',
  packages: 'external', jsx: 'automatic', loader: { '.css': 'empty', '.woff2': 'empty' }, logLevel: 'error',
});
const { Lesson44, Text44, SOURCE_SECTIONS_44: sections, TEST_SOLUTIONS_44: solutions } = await import(`../node_modules/.lesson44-audit/ui.mjs?${Date.now()}`);
const React = await import('react');
const { createRoot } = await import('react-dom/client');
const { renderToStaticMarkup } = await import('react-dom/server');
const { act } = React;

let checks = 0;
const ok = (condition, message) => { checks++; assert.ok(condition, message); };
const all = selector => [...document.querySelectorAll(selector)];
const text = () => document.querySelector('.lesson44').textContent;
async function click(element) { ok(!!element, 'click target exists'); await act(async () => element.click()); }
async function change(element, value) {
  await act(async () => {
    const proto = element.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(element, value);
    element.dispatchEvent(new Event(element.tagName === 'TEXTAREA' ? 'input' : 'input', { bubbles: true }));
  });
}
const byText = (needle, scope = document) => [...scope.querySelectorAll('button')].find(b => (b.textContent || '').trim() === needle);

// ---------------- BIDI on primitives ----------------
for (const value of [
  "You mustn't do it.", "You don't have to do it.", 'يجب أن تدرس بجد.', 'MUSTN\'T — المنع',
  "الفرق بين MUSTN'T وDON'T HAVE TO هو الفرق المحوري.",
  'اختر: MUST أو HAVE TO ثم أكمل.',
  'She has to finish the report.', 'يُمنع التدخين هنا. You mustn\'t smoke here.',
]) {
  const html = renderToStaticMarkup(React.createElement('div', { dir: 'rtl' }, React.createElement(Text44, { text: value })));
  ok(analyzeHtml(html).every(p => p.violations.length === 0), `BIDI primitive: ${value}`);
}

// ---------------- render ----------------
const root = createRoot(document.getElementById('root'));
await act(async () => root.render(React.createElement(Lesson44)));
ok(document.querySelector('.lesson44[data-lesson="44"]'), 'lesson shell renders');
ok(document.querySelector('.cover44'), 'student area opens on the cover');
ok(all('.areas44 button')[2].disabled, 'solutions tab starts locked');
ok(!document.querySelector('.solCard44'), 'no solutions DOM before submission');
ok(!document.querySelector('.teacherGateCard44'), 'teacher area not mounted initially');

const snapshots = [];
const checkSnapshot = label => {
  const html = document.getElementById('root').innerHTML;
  snapshots.push({ label, html });
  const bad = analyzeHtml(html).flatMap(p => p.violations.map(v => `${label}: ${v.latin} || ${v.arabic}`));
  if (process.env.DEBUG_BIDI && label === 'teacher') {
    for (const el of all('.lesson44 p, .lesson44 li, .lesson44 summary')) {
      if ((el.textContent || '').includes('ObligationBuilder44')) console.log('NODE', el.tagName, el.className, el.outerHTML.slice(0, 600));
    }
  }
  if (process.env.DEBUG_BIDI && bad.length) {
    for (const res of analyzeHtml(html)) for (const v of res.violations) console.log('DEBUG', label, JSON.stringify(v), '\n  HTML:', res.html?.slice(0, 400) || res.text?.slice(0, 300));
  }
  ok(bad.length === 0, `BIDI rendered: ${bad.slice(0, 3).join(' | ')}`);
  for (const el of all('.lesson44 [aria-controls],.lesson44 [aria-labelledby],.lesson44 [aria-describedby]')) {
    for (const attr of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
      for (const id of (el.getAttribute(attr) || '').split(/\s+/).filter(Boolean)) ok(document.getElementById(id), `ARIA target resolves: ${id}`);
    }
  }
  for (const el of all('.lesson44 button')) ok((el.textContent || '').trim() || el.getAttribute('aria-label'), 'button has an accessible name');
  for (const el of all('.lesson44 textarea,.lesson44 input')) ok(el.closest('label') || el.getAttribute('aria-label') || el.labels?.length, 'form control has an accessible name');
};

// ---------------- walk every step ----------------
const units = new Set();
const steps = [0];
ok(document.querySelector('.cover44[data-source-section="cover"]'), 'step 0 is the cover');
for (const el of all('.cover44 [data-source-unit]')) (el.getAttribute('data-source-unit') || '').split(/\s+/).filter(Boolean).forEach(id => units.add(id));
checkSnapshot('step-0');
await act(async () => document.querySelector('.coverActions44 button').click());
for (let n = 1; n <= 38; n++) {
  if (document.querySelector('.cover44')) {
    await act(async () => document.querySelector('.coverActions44 button').click());
  }
  const chapter = [...document.querySelectorAll('.chapterBtn44')].find(b => n >= Number(b.dataset.chapterStart) && n <= Number(b.dataset.chapterEnd));
  if (!chapter.closest('.chapter44').classList.contains('is-active')) {
    await act(async () => chapter.click());
  }
  await act(async () => document.querySelector(`.sectionNav44 button[data-step="${n}"]`).click());
  const article = document.querySelector('.step44');
  ok(article, `step ${n} renders`);
  ok(article.dataset.sourceSection === (n ? `s${String(n).padStart(2, '0')}` : 'cover'), `step ${n} maps to its source section`);
  steps.push(n);
  for (const el of all('.step44 [data-source-unit]')) (el.getAttribute('data-source-unit') || '').split(/\s+/).filter(Boolean).forEach(id => units.add(id));
  if (n === 2) {
    ok(document.querySelector('.readout44')?.textContent.includes('must'), 'sentence builder starts on MUST');
    ok(all('.benchRow44').length >= 2, 'builder offers subject and verb benches');
  }
  if (n === 3) ok(all('.answer44').length >= 6, 'MUST rule check renders its choices');
  if (n === 13) ok(all('.pole44').length === 12, 'prohibition sorter renders both poles per item');
  if (n === 20) ok(all('.conjRow44').length >= 3, 'tense machine lists the three tenses');
  if (n === 26) ok(all('.turn44').length >= 6, 'comprehensive dialogue renders its turns');
  if (n === 36) ok(all('.checklist44 input').length === 10, 'writing mission carries the ten-item checklist');
  if (n === 38) ok(document.querySelector('.ticks44'), 'roadmap renders the 120-lesson progress map');
  checkSnapshot(`step-${n}`);
}
ok(steps.length === 39, 'all 39 steps visited');
ok(!text().includes('data-source-reveal'), 'student area has no raw-source reveal');
ok(!/Source key:/.test(text()), 'no test reasoning leaks into the student area');

// §27 — the ten corrections, then the source key
await act(async () => {
  const chapter = [...document.querySelectorAll('.chapterBtn44')].find(b => 27 >= Number(b.dataset.chapterStart) && 27 <= Number(b.dataset.chapterEnd));
  chapter.click();
});
await act(async () => document.querySelector('.sectionNav44 button[data-step="27"]').click());
ok(all('[data-exercise-id^="det-"]').length === 10, 'ten detective items render');
ok(!document.querySelector('.sourceKey44'), '§27 source key is hidden before any correction');
for (let i = 0; i < 10; i++) {
  const card = document.querySelector(`[data-exercise-id="det-${i}"]`);
  await click(card.querySelector('button'));
  ok(card.querySelector('.fb44'), `correction ${i + 1} opens after the attempt`);
  ok(!document.querySelector('.sourceKey44') || i === 9, `§27 key stays closed until the tenth correction (${i + 1})`);
}
ok(document.querySelector('.sourceKey44')?.textContent.includes('الحلول'), '§27 source key opens after all ten corrections');
ok(all('.step44 [data-source-unit]').some(el => (el.getAttribute('data-source-unit') || '').includes('s27-u12')), '§27 key lines render with their source ids');

// §28 — the five choices gate the source key
await act(async () => {
  const chapter = [...document.querySelectorAll('.chapterBtn44')].find(b => 28 >= Number(b.dataset.chapterStart) && 28 <= Number(b.dataset.chapterEnd));
  chapter.click();
});
await act(async () => document.querySelector('.sectionNav44 button[data-step="28"]').click());
ok(all('[data-exercise-id^="p28-"]').length === 5, 'five practice cards render');
ok(!document.querySelector('.sourceKey44'), 'practice source key hidden before attempts');
for (let i = 1; i <= 5; i++) {
  const card = document.querySelector(`[data-exercise-id="p28-${i}"]`);
  ok(card, `practice card p28-${i}`);
  await click(card.querySelector('.answer44'));
  await click(byText('تحقّق', card));
  if (i < 5) ok(!document.querySelector('.sourceKey44'), `practice key stays closed at ${i} / 5`);
}
ok(document.querySelector('.sourceKey44')?.textContent.includes('الحلول'), 'practice source key opens only after all five checks');
ok(/5 \/ 5/.test(document.querySelector('.practiceMeta44').textContent), 'practice progress counts honest attempts');

// §33 — comprehension answers gate the key
await act(async () => {
  const chapter = [...document.querySelectorAll('.chapterBtn44')].find(b => 33 >= Number(b.dataset.chapterStart) && 33 <= Number(b.dataset.chapterEnd));
  chapter.click();
});
await act(async () => document.querySelector('.sectionNav44 button[data-step="33"]').click());
ok(all('.readerLine44').length === 16, 'reading body renders all sixteen lines plus title');
ok(all('[data-exercise-id^="read-"]').length === 10, 'ten comprehension questions render');
ok(!document.querySelector('.sourceKey44'), 'reading answers hidden before the attempt');
for (let i = 0; i < 10; i++) {
  const card = document.querySelector(`[data-exercise-id="read-${i}"]`);
  await change(card.querySelector('textarea'), 'attempt');
  await click(byText('قارن بالحل', card));
  if (i < 9) ok(!document.querySelector('.sourceKey44'), `reading key stays closed at ${i + 1} / 10`);
}
ok(document.querySelector('.sourceKey44')?.textContent.includes('الحلول'), 'reading key opens after all ten questions');

// Writing — draft survives navigation
await act(async () => {
  const chapter = [...document.querySelectorAll('.chapterBtn44')].find(b => 36 >= Number(b.dataset.chapterStart) && 36 <= Number(b.dataset.chapterEnd));
  chapter.click();
});
await act(async () => document.querySelector('.sectionNav44 button[data-step="36"]').click());
const draft = document.querySelector('.writeBox44 textarea');
await change(draft, 'I must study every evening. I have to help at home too.');
await act(async () => document.querySelector('.sectionNav44 button[data-step="37"]').click());
await act(async () => document.querySelector('.sectionNav44 button[data-step="36"]').click());
ok(document.querySelector('.writeBox44 textarea').value.includes('must study'), 'writing draft survives navigation');
ok(/word/i.test(document.querySelector('.writeCount44').textContent) || /\d+/.test(document.querySelector('.writeCount44').textContent), 'word counter reports the draft');

// Test — 25 questions, no early submit, no solutions before submission
await act(async () => [...document.querySelectorAll('.areas44 button')].find(b => b.textContent.includes('الاختبار')).click());
ok(all('.qField44').length === 25, `25 question fieldsets render (got ${all('.qField44').length})`);
ok(all('.areas44 button')[2].disabled, 'solutions remain locked before submission');
ok(!document.querySelector('.solCard44'), 'solutions are not in the DOM before submission');
const submit = byText('تسليم الاختبار') || document.querySelector('.testBar44 button[type="submit"]');
ok(submit?.disabled, 'submit is disabled until every field is answered');
const levelFive = document.querySelector('[data-test-level="5"]');
ok(levelFive && levelFive.querySelector('.testBrief44')?.textContent.length > 120, 'level five keeps its source context block');
ok(levelFive.querySelectorAll('[data-question-id]').length === 5, 'level five holds five questions');

const fields = all('.qField44');
const answers = [];
for (const field of fields) {
  const radios = [...field.querySelectorAll('input[type=radio]')];
  if (radios.length) {
    await click(radios[0]);
    answers.push(radios[0].value);
  } else {
    const areas = [...field.querySelectorAll('textarea')];
    for (const area of areas) await change(area, 'answer');
    answers.push('answer');
  }
}
ok(!submit.disabled, 'submit unlocks once all 25 questions are answered');
ok(document.querySelector('.testMeter44')?.textContent.includes('25'), 'progress meter reports 25 / 25');
await act(async () => submit.click());
ok(!all('.areas44 button')[2].disabled, 'solutions unlock after submission');
await act(async () => [...document.querySelectorAll('.areas44 button')].find(b => b.textContent.includes('الاختبار')).click());
ok(all('.qField44[disabled]').length === 25, 'inputs lock after submission');
await act(async () => [...document.querySelectorAll('.areas44 button')].find(b => b.textContent.includes('الحلول')).click());
ok(all('.solCard44').length === 25, `25 solution cards render (got ${all('.solCard44').length})`);
ok(document.querySelector('.solutions44').textContent.includes('Source key:'), 'solutions explain each key');

// Teacher gate — password preserved, guide behind it
await act(async () => [...document.querySelectorAll('.areas44 button')].find(b => b.textContent.includes('المعلم')).click());
ok(document.querySelector('.teacherGateCard44'), 'teacher gate renders');
await change(document.querySelector('.teacherGateCard44 input'), 'wrong-password');
await click(document.querySelector('.teacherGateCard44 button[type=submit]'));
ok(document.querySelector('.teacherGateCard44') && document.querySelector('.fb44'), 'wrong password is rejected');
ok(!document.querySelector('[data-teacher-guide="44"]'), 'guide stays unmounted while locked');
await change(document.querySelector('.teacherGateCard44 input'), 'somer173');
await click(document.querySelector('.teacherGateCard44 button[type=submit]'));
await act(async () => { await new Promise(resolve => setTimeout(resolve, 30)); });
ok(document.querySelector('[data-teacher-guide="44"]'), 'teacher guide mounts after the password');
ok(document.querySelector('[data-teacher-guide="44"]').textContent.includes('دليل التدريس'), 'guide is the complete delivery guide');
ok(all('.practiceKeys44 tbody tr').length === 25, 'practice key table covers all 25 items');
ok(document.querySelector('[data-teacher-guide="44"] .solCard44'), 'teacher guide embeds the 25 solutions');
for (const el of all('[data-teacher-guide="44"] [data-source-unit]')) (el.getAttribute('data-source-unit') || '').split(/\s+/).filter(Boolean).forEach(id => units.add(id));
for (const el of all('.solutions44 [data-source-unit]')) (el.getAttribute('data-source-unit') || '').split(/\s+/).filter(Boolean).forEach(id => units.add(id));
checkSnapshot('teacher');

// ---------------- second pass with every gate opened ----------------
await act(async () => [...document.querySelectorAll('.areas44 button')].find(b => b.textContent.includes('التعلّم')).click());
for (const n of [27, 28, 29, 30, 31, 32, 33]) {
  if (document.querySelector('.cover44')) await act(async () => document.querySelector('.coverActions44 button').click());
  const chapter = [...document.querySelectorAll('.chapterBtn44')].find(b => n >= Number(b.dataset.chapterStart) && n <= Number(b.dataset.chapterEnd));
  if (!chapter.closest('.chapter44').classList.contains('is-active')) await act(async () => chapter.click());
  await act(async () => document.querySelector(`.sectionNav44 button[data-step="${n}"]`).click());
  // Answer every practice/reading item so its gated source key renders.
  for (let guard = 0; guard < 40; guard++) {
    const open = [...document.querySelectorAll('.step44 .task44')].find(card =>
      !card.querySelector('.fb44') && card.querySelector('button.btn44--solid:not([disabled]), textarea, .answer44'));
    if (!open) break;
    const choice = open.querySelector('.answer44');
    if (choice) await click(choice);
    const area = open.querySelector('textarea');
    if (area) await change(area, 'attempt');
    const action = [...open.querySelectorAll('button')].find(b => /تحقّق|قارن بالحل/.test(b.textContent) && !b.disabled);
    if (action) await click(action);
  }
  for (const el of all('.step44 [data-source-unit]')) (el.getAttribute('data-source-unit') || '').split(/\s+/).filter(Boolean).forEach(id => units.add(id));
  checkSnapshot(`opened-${n}`);
}

// ---------------- full source coverage ----------------
const expected = sections.flatMap(section => section.units.map(unit => unit.id));
const missing = expected.filter(id => !units.has(id));
ok(missing.length === 0, `every source unit reaches the DOM (missing ${missing.length}: ${missing.slice(0, 8).join(', ')})`);
ok(expected.length === 761, `the ledger still carries 761 units (got ${expected.length})`);

// ---------------- solution text never leaks before submission ----------------
const leak = solutions.find(s => document.getElementById('root').innerHTML.includes(s.reason));
ok(!leak, 'solution reasoning never appears outside the gated areas');

console.log(`Lesson 44 DOM audit passed: ${checks} assertions; 39 steps, ${expected.length} source units rendered, gated practice/reading/detective keys, 25-question test with 25 solutions, password-gated teacher guide, ${snapshots.length} BIDI snapshots clean.`);
await act(async () => root.unmount());
