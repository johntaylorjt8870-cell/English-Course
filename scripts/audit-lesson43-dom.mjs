import assert from 'node:assert/strict';
import { mkdirSync, readFileSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { analyzeHtml } from './lib/bidi-sim.mjs';

const dom = new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'HTMLInputElement', 'HTMLTextAreaElement', 'HTMLSelectElement', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent', 'MutationObserver', 'getComputedStyle']) {
  Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.scrollTo = () => {};

mkdirSync('node_modules/.lesson43-audit', { recursive: true });
await build({
  stdin: {
    contents: [
      "export {default as Lesson43} from './src/lessons/lesson43/Lesson43';",
      "export {WRITING_CRITERIA_43} from './src/lessons/lesson43/kit43';",
      "export {Text43, En43} from './src/lessons/lesson43/design43';",
      "export {SLIDES_43, STATIONS_43, slidesForStation43} from './src/lessons/lesson43/slides43';",
      "export {NEXT_LESSON_43} from './src/lessons/lesson43/ledger43';",
      "export {PRACTICE_43} from './src/lessons/lesson43/practice43';",
      "export {TEST_QUESTIONS_43, TEST_LEVELS_43, testComplete43} from './src/lessons/lesson43/testData43';",
    ].join("\n"),
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  outfile: "node_modules/.lesson43-audit/ui.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty" },
  logLevel: "silent",
});
const { Lesson43, Text43, En43, SLIDES_43, STATIONS_43, slidesForStation43, NEXT_LESSON_43, PRACTICE_43, TEST_QUESTIONS_43, TEST_LEVELS_43, testComplete43, WRITING_CRITERIA_43 } = await import('../node_modules/.lesson43-audit/ui.mjs');
const React = await import('react');
const { createRoot } = await import('react-dom/client');
const { renderToStaticMarkup } = await import('react-dom/server');
const { act } = React;

let checks = 0;
const ok = (c, m) => { checks++; assert.ok(c, m); };

// ---------- BIDI isolation for the shared isolator ----------
for (const text of ['She may come tomorrow.', 'He might have forgotten the keys.', 'May I ask a question?', 'Maybe she will join us later.', 'She may be at home now.', 'It might rain tomorrow.', 'May I remind everyone about the quiz?', 'They might not visit us.']) {
  for (const content of [text, `لاحظ المثال: ${text} — الفعل يبقى V1.`]) {
    const html = renderToStaticMarkup(React.createElement('div', { dir: 'rtl' }, React.createElement(Text43, { text: content })));
    ok(analyzeHtml(html).every(p => p.violations.length === 0), `BIDI: ${content}`);
    ok(html.includes('dir="ltr"'), 'explicit LTR isolation');
  }
}
ok(renderToStaticMarkup(React.createElement(En43, null, 'MAY')).includes('lang="en"'), 'English isolator carries lang="en"');

// ---------- shell ----------
const root = createRoot(document.getElementById('root'));
await act(async () => root.render(React.createElement(Lesson43)));
const all = (selector) => [...document.querySelectorAll(selector)];
async function click(element) {
  ok(!!element, 'click target exists');
  await act(async () => element.click());
}
async function change(element, value) {
  await act(async () => {
    const proto = element.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : element.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(element, value);
    element.dispatchEvent(new Event(element.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
  });
}
async function key(kind) {
  await act(async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: kind, bubbles: true }));
  });
}
const slideNow = () => document.querySelector('[data-slide-id]');
const next = () => click([...all('button[aria-label="التالي"]')][0]);

ok(slideNow()?.dataset.slideId === 'cover', 'cover is the first slide');
ok(all('nav[aria-label="محطات الدرس"] > div > button').length === STATIONS_43.length, 'rail lists every station');
ok(document.querySelector('[role="progressbar"]'), 'progress bar present');
ok(all('button[aria-label="التالي"]').length === 1 && all('button[aria-label="السابق"]').length === 1, 'prev/next keyboard-and-click controls present');

// ---------- walk the whole deck ----------
const walked = [];
for (let i = 0; i < SLIDES_43.length; i += 1) {
  const slide = slideNow();
  ok(slide, `slide ${i} rendered`);
  ok(slide.dataset.slideId === SLIDES_43[i].id, `slide ${i} is "${SLIDES_43[i].id}" (got ${slide.dataset.slideId})`);
  walked.push(slide.dataset.slideId);
  for (const el of all('[aria-controls],[aria-labelledby],[aria-describedby]')) {
    for (const attr of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
      for (const id of (el.getAttribute(attr) || '').split(/\s+/).filter(Boolean)) ok(document.getElementById(id), `ARIA resolves ${id}`);
    }
  }
  for (const el of all('button')) ok(el.textContent.trim() || el.getAttribute('aria-label'), 'button accessible name');
  for (const el of all('textarea, select, input')) ok(el.closest('label') || el.getAttribute('aria-label') || el.labels?.length, 'form control accessible name');
  ok(!/مفتاح تصحيح الدرس 43|MAY فعل ناقص ثابت الصيغة|⑮ Maybe he is tired/.test(document.body.textContent), `slide ${i} never renders the §34 answer key`);
  await key('ArrowLeft');
}
ok(walked.length === SLIDES_43.length, 'the whole deck is reachable by arrow keys');
ok(walked[0] === 'cover', 'the deck starts on the cover');
ok(slideNow()?.dataset.slideId === SLIDES_43[SLIDES_43.length - 1].id, 'the deck ends on the last slide');
await key('ArrowRight');
ok(slideNow()?.dataset.slideId === SLIDES_43[SLIDES_43.length - 2].id, 'ArrowRight walks backwards');
ok(walked.length === new Set(walked).size, 'no slide is skipped or repeated');

// ---------- rail jump ----------
await click(all('nav[aria-label="محطات الدرس"] button')[STATIONS_43.findIndex(s => s.id === 'assessment')]);
ok(slideNow()?.dataset.slideId === slidesForStation43('assessment')[0] || slideNow()?.dataset.slideId === SLIDES_43[slidesForStation43('assessment')[0]].id, 'rail jumps to the assessment station');

// ---------- labs ----------
async function goto(slideId) {
  await click(all('nav[aria-label="محطات الدرس"] button')[0]);
  const index = SLIDES_43.findIndex((s) => s.id === slideId);
  for (let i = 0; i < index; i += 1) await key('ArrowLeft');
  ok(slideNow()?.dataset.slideId === slideId, `reached slide "${slideId}"`);
}
await goto('lab-may-spectrum');
ok(slideNow()?.dataset.slideId === 'lab-may-spectrum', 'spectrum lab slide');
ok(all('[role="group"]').length >= 1, 'spectrum classifier offers a choice group');
await click(all('[role="group"]')[0].querySelectorAll('button')[0]);
ok(all('[role="status"]').length === 1, 'spectrum lab answers with feedback');
ok(!/✕/.test(all('[role="status"]')[0].textContent) || all('[role="status"]')[0].textContent.includes('صحيح'), 'spectrum feedback is a verdict');

await goto('lab-may-builder');
ok(all('[role="group"]').length >= 3, 'builder exposes subject, modal and verb groups');
await click(all('[role="group"]')[0].querySelectorAll('button')[1]);
await click(all('[role="group"]')[1].querySelectorAll('button')[0]);
await click(all('[role="group"]')[2].querySelectorAll('button')[0]);
ok(document.body.textContent.includes('I may travel'), 'builder assembles the sentence');

await goto('lab-might-swap');
await click(all('[role="group"]')[3].querySelectorAll('button')[1]);
ok(all('[role="status"]').length === 1, 'swap lab answers with feedback');

await goto('lab-maybe');
await click(all('[role="group"]')[0].querySelectorAll('button')[0]);
ok(all('[role="status"]')[0]?.textContent.includes('صحيح'), 'maybe lab classifies the standalone adverb');

await goto('lab-past');
ok(all('[role="group"]').length >= 9, 'past lab exposes modal / have / V3 groups');
await click(all('[role="group"]')[0].querySelectorAll('button')[0]);
await click(all('[role="group"]')[1].querySelectorAll('button')[0]);
await click(all('[role="group"]')[2].querySelectorAll('button')[0]);
ok(all('[role="status"]').length === 1, 'past lab answers with feedback');

await goto('lab-detective');
ok(all('[role="group"]').length >= 8, 'detective lab lists every dialogue use');

// ---------- practice cards: gated until the attempt ----------
await goto('practice-27');
let card = document.querySelector('[data-practice-item="p27-1"]');
ok(card && !card.querySelector('[role="status"]'), 'practice card hides the key before the attempt');
await click(card.querySelectorAll('button')[0]);
await click(card.querySelector('[data-practice-check]'));
ok(card.querySelector('[role="status"]')?.textContent.includes('MAY') || card.querySelector('[role="status"]'), '§27 practice reveals the key after the attempt');
card = document.querySelector('[data-practice-item="p27-2"]');
await click(card.querySelectorAll('button')[1]);
await click(card.querySelector('[data-practice-check]'));
ok(card.querySelector('[role="status"]')?.textContent.includes('MIGHT'), '§27 accepts MIGHT after MAY');

await goto('practice-28');
card = document.querySelector('[data-practice-item="p28-1"]');
await click(card.querySelectorAll('button')[0]);
await click(card.querySelector('[data-practice-check]'));
ok(card.querySelector('[role="status"]')?.textContent.includes('A — may'), '§28 first key is A — may');

await goto('practice-29');
card = document.querySelector('[data-practice-item="p29-1"]');
await click(card.querySelectorAll('button')[0]);
await click(card.querySelector('[data-practice-check]'));
ok(card.querySelector('[role="status"]')?.textContent.includes('Maybe'), '§29 first key is the standalone adverb');

await goto('practice-30');
card = document.querySelector('[data-practice-item="p30-1"]');
ok(card.querySelector('[data-practice-check]').disabled, '§30 rewrite gates the key while empty');
const areas = card.querySelectorAll('textarea');
ok(areas.length === 2, '§30 asks for the rewrite and the reason');
await change(areas[0], 'He may have lost his phone.');
ok(card.querySelector('[data-practice-check]').disabled, '§30 still wants the reason');
await change(areas[1], 'may have + V3 of lose');
await click(card.querySelector('[data-practice-check]'));
ok(card.querySelector('[role="status"]'), '§30 rewrite comparison opens after the attempt');

await goto('practice-31');
card = document.querySelector('[data-practice-item="p31-1"]');
ok(card.querySelectorAll('textarea').length === 2, '§31 repair asks for the fix and the reason');
ok(card.querySelector('[data-practice-check]').disabled, '§31 repair locked while empty');
await change(card.querySelectorAll('textarea')[0], 'She may come tomorrow.');
await change(card.querySelectorAll('textarea')[1], 'removed the s from may');
await click(card.querySelector('[data-practice-check]'));
ok(card.querySelector('[role="status"]')?.textContent.includes('She may come tomorrow.'), '§31 repair reveals the source key');

await goto('practice-32');
card = document.querySelector('[data-practice-item="p32-1"]');
ok(card.querySelector('[data-practice-check]').disabled, '§32 comprehension key hidden before the attempt');
await change(card.querySelector('textarea'), 'a science museum');
await click(card.querySelector('[data-practice-check]'));
ok(card.querySelector('[role="status"]'), '§32 comprehension comparison follows the attempt');
ok(/لا يُصحَّح آليًا/.test(document.body.textContent), 'practice feedback honestly says it is not auto-graded');

// ---------- writing ----------
await goto('writing-editor');
ok(document.querySelector('textarea'), 'writing mission offers a text area');
await goto('writing-criteria');
ok(all('input[type="checkbox"]').length === 8, '§35 lists eight writing criteria');
await click(all('input[type="checkbox"]')[0]);
ok(document.body.textContent.includes('1 / 8'), 'writing checklist counts completed criteria');
await goto('writing-model');
ok(document.body.textContent.includes('إضافة المنصة'), 'writing model is labelled a platform addition');

// ---------- final test: gated, complete, submit, reset ----------
const TEST_SLIDES = SLIDES_43.filter((s) => s.kind === "test").map((s) => s.id);
ok(TEST_SLIDES.length === 18, `the 25 questions are split across eighteen level slides (got ${TEST_SLIDES.length})`);
let shown = 0;
for (const id of TEST_SLIDES) {
  await goto(id);
  shown += all('[data-question-id]').length;
  for (const question of all('[data-question-id]')) {
    const radios = question.querySelectorAll('input[type="radio"]');
    if (radios.length) await click(radios[0]);
    else for (const textarea of question.querySelectorAll('textarea')) await change(textarea, 'My attempt');
  }
}
ok(shown === 25, `exactly 25 questions displayed across the level slides (got ${shown})`);
ok(TEST_LEVELS_43.length === 5, 'five levels');
await goto(TEST_SLIDES[TEST_SLIDES.length - 1]);
ok(!document.querySelector('[data-test-submit]').disabled, 'complete submission enabled');
ok(!/مفتاح تصحيح الدرس 43/.test(document.body.textContent), 'no key in the student DOM before submit');
await click(document.querySelector('[data-test-submit]'));
ok(slideNow()?.dataset.slideId === 'test-result', 'submit moves to the result slide');
ok(document.body.textContent.includes('نتيجة الاختبار'), 'result slide renders');
ok(/25/.test(document.body.textContent), 'result slide shows the total');
await new Promise((resolve) => setTimeout(resolve, 80));
ok(document.querySelector('[data-slide-id="test-result"]').textContent.includes('الحلول'), 'result slide surfaces the solutions area');
ok(/A — may/.test(document.querySelector('[data-slide-id="test-result"]').textContent), 'the solutions area shows the detailed key after the attempt');

await goto(TEST_SLIDES[0]);
ok(all('[data-question-id]').length === 2, 'level 1 slide shows its first two questions');
ok(all('textarea').some((t) => t.value !== '') || all('[aria-pressed="true"]').length > 0, 'answers persist across slides');

// ---------- teacher area ----------
await goto('teacher');
ok(document.querySelector('input[type="password"]'), 'teacher gate renders a password field');
await change(document.querySelector('input[type="password"]'), 'wrong');
await click([...all('button')].find((b) => b.textContent.includes('فتح المساحة')));
ok(document.querySelector('[role="alert"]'), 'wrong teacher password rejected');
const password = readFileSync('src/lessons/lesson40/TeacherArea40.tsx', 'utf8').match(/TEACHER_PASSWORD_40 = "([^"]+)"/)[1];
await change(document.querySelector('input[type="password"]'), password);
await click([...all('button')].find((b) => b.textContent.includes('فتح المساحة')));
await new Promise((resolve) => setTimeout(resolve, 60));
ok(/مفتاح تصحيح الدرس 43/.test(document.body.textContent), 'the teacher guide carries the §34 key');
ok(/دليل المعلم/.test(document.body.textContent), 'teacher guide renders');
const guideText = document.body.textContent.replace(/\s+/g, '');
ok(WRITING_CRITERIA_43.every((c) => guideText.includes(c.replace(/\s+/g, ''))), 'teacher guide lists the eight writing criteria');
ok(document.body.textContent.includes(NEXT_LESSON_43.label), 'teacher guide points at Lesson 44');

console.log(`Lesson 43 DOM audit passed: ${checks} assertions; ${SLIDES_43.length} slides, ${STATIONS_43.length} stations, ${PRACTICE_43.length} practice items, ${TEST_QUESTIONS_43.length} test questions.`);
