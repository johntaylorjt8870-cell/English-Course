// ============================================================
// Prioritized behavioral probe over every rendered activity instance that
// requires checking/submission.
//
// Priority order is fixed by the brief:
//   P1 missing controls          — a graded task with no check/submit control,
//                                  or a submitted task with no usable reset.
//   P2 premature answer leakage  — correctness is observable before submission.
//   P3 broken reset              — reset does not return the instance to its
//                                  initial state.
//   P4 keyboard / accessibility  — a control that cannot be reached, focused or
//                                  named, or a toggle group with inconsistent
//                                  aria-pressed.
//
// This is a GENERIC probe: it exercises every in-scope instance with the same
// contract, so it finds class-level defects course-wide. It is NOT the
// per-instance semantic certification that Lesson 2 has
// (docs/audits/lesson2-behavior.json); the two counts are reported separately
// and the certification gate only accepts the latter.
//
//   node scripts/audit-activity-behavior.mjs
//   ONLY=2,27 node scripts/audit-activity-behavior.mjs
// ============================================================
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { loadInstrumentedApp, crawlLessons } from './lib/app-crawl.mjs';
import { observeInstances, classifyInstance, TASK_MARKERS, readJson } from './lib/activity-instances.mjs';

const OUT = 'docs/audits/activity-behavior-probe.json';
const noGate = process.argv.includes('--no-gate');
const LESSONS = process.env.ONLY ? process.env.ONLY.split(',').map(Number) : Array.from({ length: 32 }, (_, i) => i + 1);

/**
 * Correctness signals that must never be observable before submission.
 * Deliberately narrow: bare «خطأ» / «صحيح» are ordinary lesson CONTENT in this
 * course (a Past Perfect item asks the student to find the wrong sentence), so
 * only unambiguous feedback glyphs and the result readout count as leakage.
 */
const LEAK_TEXT = /[✓✕√×]|نتيجتك:/;
const LIVE_SELECTOR = '[role="status"],[aria-live="polite"],[aria-live="assertive"]';
const CORRECTNESS_CLASS = /(border|bg|text)-(emerald|rose|green|red)-(200|300|400|500|600|700)/;
/** A <form> is a container the census records as a site, not a control. */
const NON_CONTROL_TAGS = new Set(['FORM']);
/** Instance markers: controls inside a nested instance belong to that one. */
const INSTANCE_ATTR_SELECTOR = TASK_MARKERS.filter((m) => m.granularity === 'instance').map((m) => `[${m.attr}]`).join(',');

const nameOf = (el) => {
  // Accessible name, in the order a screen reader resolves it. Radio/checkbox
  // inputs in this codebase take their name from the wrapping <label>.
  const label = el.getAttribute('aria-label');
  if (label) return label.replace(/\s+/g, ' ').trim();
  const by = el.getAttribute('aria-labelledby');
  if (by) { const t = by.split(/\s+/).map((id) => el.ownerDocument.getElementById(id)?.textContent || '').join(' '); if (t.trim()) return t.replace(/\s+/g, ' ').trim(); }
  const own = (el.textContent || '').replace(/\s+/g, ' ').trim();
  if (own) return own;
  if (/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
    const wrap = el.closest('label');
    if (wrap) { const t = (wrap.textContent || '').replace(/\s+/g, ' ').trim(); if (t) return t; }
  }
  return (el.getAttribute('placeholder') || el.getAttribute('title') || '').replace(/\s+/g, ' ').trim();
};
/** Instance text with every control's own text removed: what is left is chrome
 *  and feedback, so a correctness glyph there really is premature feedback.
 *  (True/false option labels legitimately read «صحيح ✓» / «خطأ ✕».) */
const nonControlText = (el) => {
  const clone = el.cloneNode(true);
  for (const c of clone.querySelectorAll('[data-audit-control]')) (c.closest('label') || c).remove();
  return clone.textContent || '';
};
const controlsOf = (el) => [...el.querySelectorAll('[data-audit-control]')].filter((c) => !NON_CONTROL_TAGS.has(c.tagName) && !nestedInstance(c, el));
/** True when the control belongs to a different (nested) activity instance. */
function nestedInstance(control, el) {
  for (let a = control.parentElement; a && a !== el; a = a.parentElement) if (a.matches?.(INSTANCE_ATTR_SELECTOR)) return true;
  return false;
}
const isAnswerControl = (c, inst) => !c.checkAction && !c.resetAction && !c.revealAction;

/** A stable, order-insensitive signature of an instance's interactive state. */
function stateSignature(el) {
  return controlsOf(el).map((c) => [
    c.getAttribute('data-audit-control'),
    c.tagName, c.disabled ? 'disabled' : 'enabled',
    // null and "false" are the same un-pressed state; only "true" differs.
    `pressed=${c.getAttribute('aria-pressed') === 'true'}`, `checked=${c.getAttribute('aria-checked') === 'true'}`,
    `value=${c.value ?? ''}`,
    `class=${String(c.className || '').split(' ').filter((x) => CORRECTNESS_CLASS.test(x)).sort().join('|')}`,
    `name=${nameOf(c).slice(0, 60)}`,
  ].join(' ')).sort().join('\n') + '\n--live--\n' +
    [...el.querySelectorAll(LIVE_SELECTOR)].map((s) => s.textContent.replace(/\s+/g, ' ').trim()).sort().join('|');
}

function leakSignals(el, { afterInteraction = false } = {}) {
  const signals = [];
  for (const live of el.querySelectorAll(LIVE_SELECTOR)) {
    const text = live.textContent.replace(/\s+/g, ' ').trim();
    if (text) signals.push({ kind: 'live-region-text-before-submit', text: text.slice(0, 120) });
  }
  for (const c of controlsOf(el)) {
    // A pressed/checked state is only a leak when nobody has interacted yet:
    // after the probe selects an option, aria-pressed="true" is the student's
    // own selection, which every engine must show.
    if (!afterInteraction && c.getAttribute('aria-pressed') === 'true') signals.push({ kind: 'pre-pressed-answer', control: c.getAttribute('data-audit-control'), name: nameOf(c).slice(0, 60) });
    if (!afterInteraction && c.getAttribute('aria-checked') === 'true') signals.push({ kind: 'pre-checked-answer', control: c.getAttribute('data-audit-control'), name: nameOf(c).slice(0, 60) });
    // A check/reset control's own accent colour is branding, not feedback.
    const cls = classifyControl(c);
    if (!cls.checkAction && !cls.resetAction && !cls.revealAction && CORRECTNESS_CLASS.test(String(c.className || ''))) {
      signals.push({ kind: 'correctness-colour-on-answer-control-before-submit', control: c.getAttribute('data-audit-control'), name: nameOf(c).slice(0, 60), className: String(c.className).slice(0, 140) });
    }
  }
  const glyph = nonControlText(el).match(LEAK_TEXT);
  if (glyph) {
    const flat = nonControlText(el).replace(/\s+/g, ' ').trim();
    signals.push({ kind: 'correctness-glyph-or-result-text-before-submit', match: glyph[0], context: flat.slice(Math.max(0, glyph.index - 60), glyph.index + 80) });
  }
  return signals;
}

function a11yFacts(el) {
  const facts = { controls: 0, unnamed: [], nonFocusable: [], nonInteractiveWithHandler: [], toggleGroupsInconsistent: [] };
  const controls = controlsOf(el);
  facts.controls = controls.length;
  for (const c of controls) {
    if (!nameOf(c)) facts.unnamed.push({ control: c.getAttribute('data-audit-control'), tag: c.tagName });
    const interactive = /^(BUTTON|INPUT|SELECT|TEXTAREA|A)$/.test(c.tagName) || c.getAttribute('role') === 'button' || c.hasAttribute('tabindex');
    if (!interactive) facts.nonInteractiveWithHandler.push({ control: c.getAttribute('data-audit-control'), tag: c.tagName });
    if (c.disabled) continue;
    if (c.getAttribute('tabindex') === '-1') facts.nonFocusable.push({ control: c.getAttribute('data-audit-control'), tag: c.tagName, reason: 'tabindex=-1' });
    else if (!interactive) facts.nonFocusable.push({ control: c.getAttribute('data-audit-control'), tag: c.tagName, reason: 'not a focusable element' });
  }
  // A toggle group must expose aria-pressed on every member or none.
  const groups = new Map();
  for (const c of controls) {
    const parent = c.parentElement;
    if (!parent) continue;
    const key = parent;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(c);
  }
  for (const [, members] of groups) {
    if (members.length < 2) continue;
    const withPressed = members.filter((m) => m.hasAttribute('aria-pressed')).length;
    if (withPressed > 0 && withPressed < members.length) {
      facts.toggleGroupsInconsistent.push({ members: members.length, withAriaPressed: withPressed, sample: members.slice(0, 3).map((m) => nameOf(m).slice(0, 40)) });
    }
  }
  return facts;
}

const M = await loadInstrumentedApp();
const probed = new Map();
const defects = [];
let inScopeSeen = 0;

await crawlLessons(M, {
  lessons: LESSONS,
  onStep: async ({ document, lesson, step, tick, flush }) => {
    const { instances } = observeInstances(document, lesson, step);
    for (const inst of instances) {
      const cls = classifyInstance(inst);
      if (cls.policy !== 'requires-check-or-submit') continue;
      if (probed.has(inst.id)) continue;
      probed.set(inst.id, true);
      inScopeSeen++;
      const el = inst.element;
      const record = {
        id: inst.id, lesson, engine: inst.engine, marker: inst.marker, step,
        items: inst.items.length, controls: inst.controls.length,
        checkControls: cls.checkControls, resetControls: cls.resetControls, revealControls: cls.revealControls,
        findings: [],
      };
      const add = (priority, klass, detail) => record.findings.push({ priority, klass, ...detail });

      // ---- P2: leakage in the untouched state -------------------------------
      const initialSignature = stateSignature(el);
      const initialLeaks = leakSignals(el);
      record.initialLeakSignals = initialLeaks;
      if (initialLeaks.length) add('P2', 'premature-answer-leakage', { state: 'initial', signals: initialLeaks });

      // ---- P4: keyboard / accessibility inventory ---------------------------
      const a11y = a11yFacts(el);
      record.a11y = { controls: a11y.controls, unnamed: a11y.unnamed.length, nonFocusable: a11y.nonFocusable.length, nonInteractiveWithHandler: a11y.nonInteractiveWithHandler.length, toggleGroupsInconsistent: a11y.toggleGroupsInconsistent.length };
      if (a11y.unnamed.length) add('P4', 'control-without-accessible-name', { count: a11y.unnamed.length, examples: a11y.unnamed.slice(0, 5) });
      if (a11y.nonFocusable.length) add('P4', 'control-not-keyboard-focusable', { count: a11y.nonFocusable.length, examples: a11y.nonFocusable.slice(0, 5) });
      if (a11y.nonInteractiveWithHandler.length) add('P4', 'handler-on-non-interactive-element', { count: a11y.nonInteractiveWithHandler.length, examples: a11y.nonInteractiveWithHandler.slice(0, 5) });
      if (a11y.toggleGroupsInconsistent.length) add('P4', 'toggle-group-aria-pressed-inconsistent', { groups: a11y.toggleGroupsInconsistent.slice(0, 3) });

      // ---- P1: the graded task must own a check control and a reset ---------
      // Instance-level controls live outside any item; a per-item «↺ إعادة
      // الترتيب» is that item's own reset, not the task's.
      const insideItem = (c) => inst.itemElements.some((it) => it.contains(c));
      const all = controlsOf(el);
      const checkEls = all.filter((c) => classifyControl(c).checkAction && !insideItem(c));
      const resetEls = all.filter((c) => classifyControl(c).resetAction && !insideItem(c));
      const itemResetEls = all.filter((c) => classifyControl(c).resetAction && insideItem(c));
      record.controlScopes = { instanceCheck: checkEls.length, instanceReset: resetEls.length, perItemReset: itemResetEls.length };
      if (!checkEls.length) add('P1', 'graded-task-without-check-control', { controls: all.length });

      // ---- interact: answer every question group, then submit and reset ----
      // Generic completion strategy: group answer controls by their immediate
      // container (one option row / blank per question) and answer the first
      // control of each group. Engines whose completion rule differs are
      // recorded as a harness limit, never silently passed.
      const answerControls = all.filter((c) => isAnswerControl(classifyControl(c)) && !c.disabled);
      const groups = new Map();
      for (const c of answerControls) { const g = c.parentElement || c; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(c); }
      const answeredGroups = [];
      const unansweredGroups = [];
      const setNativeValue = (input, value) => {
        const proto = input.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, 'value').set.call(input, value);
        input.dispatchEvent(new window.Event('input', { bubbles: true }));
        input.dispatchEvent(new window.Event('change', { bubbles: true }));
      };
      for (const [, members] of groups) {
        const c = members[0];
        if (c.tagName === 'SELECT') {
          const opt = [...c.options].find((o) => o.value !== '');
          if (!opt) { unansweredGroups.push({ reason: 'select has no non-empty option', name: nameOf(c).slice(0, 50) }); continue; }
          c.value = opt.value;
          c.dispatchEvent(new window.Event('change', { bubbles: true }));
        } else if (c.tagName === 'INPUT' && /text|search|email|number/.test(c.type || 'text')) {
          setNativeValue(c, 'probe');
        } else if (/^(BUTTON|INPUT|A)$/.test(c.tagName)) {
          c.click();
        } else { unansweredGroups.push({ reason: `unsupported control tag ${c.tagName}`, name: nameOf(c).slice(0, 50) }); continue; }
        answeredGroups.push(nameOf(c).slice(0, 50));
        await tick(8);
      }
      record.questionGroups = groups.size;
      record.answeredGroups = answeredGroups.length;
      record.unansweredGroups = unansweredGroups;
      const afterSelectLeaks = leakSignals(el, { afterInteraction: true }).filter((sg) => !initialLeaks.some((i) => i.kind === sg.kind && JSON.stringify(i) === JSON.stringify(sg)));
      record.afterSelectLeakSignals = afterSelectLeaks;
      if (afterSelectLeaks.length) add('P2', 'premature-answer-leakage', { state: 'after-selection-before-submit', signals: afterSelectLeaks.slice(0, 6) });

      // ---- submit, then verify feedback and reset --------------------------
      const liveCheck = () => controlsOf(el).filter((c) => classifyControl(c).checkAction && !insideItem(c));
      const liveReset = () => controlsOf(el).filter((c) => classifyControl(c).resetAction && !insideItem(c));
      const checkNow = liveCheck();
      const checkEnabled = checkNow.some((c) => !c.disabled);
      record.checkEnabledAfterAnsweringAll = checkEnabled;
      if (!checkEnabled) {
        record.checkNotEnabled = 'harness could not satisfy this engine\'s completion rule; recorded, not counted as a pass';
      } else {
        const before = nonControlText(el);
        checkNow.find((c) => !c.disabled).click();
        await tick(25);
        const after = nonControlText(el);
        record.feedbackAppearedAfterSubmit = after !== before || leakSignals(el, { afterInteraction: true }).length > 0;
        if (!record.feedbackAppearedAfterSubmit) add('P1', 'submit-produced-no-feedback', { checkControls: checkNow.length });
        const resets = liveReset();
        if (!resets.length) {
          add('P1', 'graded-task-without-reset-control', { state: 'after-submit', checkControls: checkNow.length, controlsNow: controlsOf(el).length });
        } else if (!resets.some((c) => !c.disabled)) {
          add('P1', 'reset-control-present-but-never-enabled', { state: 'after-submit', resetControls: resets.length });
        } else {
          resets.find((c) => !c.disabled).click();
          await tick(25);
          const afterReset = stateSignature(el);
          record.resetRestoredInitialState = afterReset === initialSignature;
          if (afterReset !== initialSignature) {
            const b = initialSignature.split('\n'), a = afterReset.split('\n');
            add('P3', 'reset-does-not-restore-initial-state', { state: 'after-submit-and-reset', changedControls: a.filter((line, i) => line !== b[i]).slice(0, 8), residualLeaks: leakSignals(el, { afterInteraction: true }).slice(0, 6) });
          }
        }
      }

      // ---- P3b: a per-item reset must restore that item ---------------------
      for (const item of inst.itemElements) {
        const ownReset = [...item.querySelectorAll('[data-audit-control]')].find((c) => classifyControl(c).resetAction);
        if (!ownReset) continue;
        const tag = item.getAttribute('data-activity-question') || item.getAttribute('data-ft-q') || item.getAttribute('data-test-q') || item.getAttribute('data-quiz-q');
        if (ownReset.disabled) { add('P1', 'per-item-reset-disabled-after-interaction', { item: tag }); continue; }
        ownReset.click();
        await tick(15);
        if (!/[✕✓]/.test(nonControlText(item))) continue;
        add('P2', 'premature-answer-leakage', { state: 'per-item-after-reset', item: tag });
      }

      defects.push(...record.findings.map((f) => ({ instance: inst.id, lesson, engine: inst.engine, ...f })));
      probed.set(inst.id, record);
    }
  },
});

function classifyControl(el) {
  const text = nameOf(el);
  return { checkAction: /تحق|تصحيح|إرسال|إنهاء|تسليم|اعتمد|صحّح|check|submit/i.test(text), resetAction: /إعادة|أعد|↺|reset|restart|مسح/i.test(text), revealAction: /اكشف|أظهر|كشف|اعرض|reveal|show/i.test(text) };
}

const records = [...probed.values()].filter((v) => typeof v === 'object' && v.findings);
const byPriority = { P1: [], P2: [], P3: [], P4: [] };
for (const d of defects) byPriority[d.priority]?.push(d);
const summary = {
  scope: process.env.ONLY ? `Lessons ${LESSONS.join(', ')} only (ONLY set)` : 'All 32 lessons',
  harness: 'jsdom + audit-only provenance instrumentation; real <App/>, real React state',
  harnessLimits: [
    'The probe answers at most one option per item, so engines that require every item answered keep their submit control disabled; that is recorded, not counted as a defect.',
    'jsdom does not synthesise activation on Space/Enter for <button>, so native keyboard activation is NOT certified here. Lesson 2 certifies it in Chromium (docs/audits/lesson2-behavior.json).',
    'The crawler only clicks «التالي»; instances behind gated navigation are never reached and are therefore absent, not passing.',
  ],
  instancesInScopeProbed: records.length,
  instancesWithFindings: new Set(defects.map((d) => d.instance)).size,
  findings: defects.length,
  byPriority: Object.fromEntries(Object.entries(byPriority).map(([k, v]) => [k, { count: v.length, instances: new Set(v.map((x) => x.instance)).size, classes: [...new Set(v.map((x) => x.klass))] }])),
};
const report = { ...summary, defects: byPriority, records };
mkdirSync('docs/audits', { recursive: true });
writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n');

console.log(`probed ${records.length} in-scope instances requiring check/submit; ${summary.instancesWithFindings} have findings; ${defects.length} findings`);
for (const p of ['P1', 'P2', 'P3', 'P4']) {
  const b = summary.byPriority[p];
  console.log(`  ${p}: ${b.count} findings across ${b.instances} instances — ${b.classes.join(', ') || 'none'}`);
}
const blocking = defects.filter((d) => d.priority === 'P1' || d.priority === 'P2' || d.priority === 'P3');
if (blocking.length) {
  console.error(`Behavioral probe found ${blocking.length} P1–P3 findings that block certification:`);
  for (const d of blocking.slice(0, 25)) console.error(`  ✕ [${d.priority}] ${d.instance} — ${d.klass}`);
  if (blocking.length > 25) console.error(`  … and ${blocking.length - 25} more (see ${OUT})`);
  if (!noGate) process.exit(1);
}
console.log('No P1–P3 behavioral findings.');
