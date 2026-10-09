import { readFileSync } from 'node:fs';

// ============================================================
// Activity-INSTANCE identity, as opposed to control-site discovery.
//
// The source census (docs/audits/activity-inventory.json) counts every JSX
// element that carries an on* prop or is a native control: 875 component
// templates / 1,681 sites. Those are CONTROL SITES. They are not activities,
// and the 822 of them that the initial-state crawl never reached are certainly
// not 822 activities — one quiz question owns four option buttons, and one
// lesson test area owns a single submit control for up to fifteen questions.
//
// An ACTIVITY INSTANCE is a bounded student task with its own outcome:
//   - it has a stable rendered identity (a task marker emitted by its engine),
//   - it owns one or more items (questions / blanks / slots),
//   - it either requires checking/submission, or is an explicit guided reveal.
//
// Only engines that emit a per-instance marker are enumerable. Everything else
// is reported as DISCOVERY and is explicitly not an instance count.
// ============================================================

/** Stable task markers emitted by the application's own engines. */
export const TASK_MARKERS = [
  // Instance markers: the element itself is one bounded activity.
  { attr: 'data-activity', engine: 'lesson2-exercise', granularity: 'instance', source: 'src/lessons/lesson2/Lesson2.tsx' },
  { attr: 'data-exercise', engine: 'lesson-exercise', granularity: 'instance', source: 'src/lessons/lesson24,lesson26' },
  { attr: 'data-final-test', engine: 'final-test', granularity: 'instance', source: 'src/shared/finalTest.tsx' },
  { attr: 'data-final-quiz', engine: 'final-quiz', granularity: 'instance', source: 'src/shared/FinalQuiz.tsx' },
  { attr: 'data-teachers-space', engine: 'teachers-space', granularity: 'instance', source: 'src/shared/TeachersSpace.tsx' },
  // Item markers: a question/blank inside an instance.
  { attr: 'data-activity-question', engine: 'lesson2-exercise-item', granularity: 'item', source: 'src/lessons/lesson2/Lesson2.tsx' },
  { attr: 'data-quiz-q', engine: 'final-quiz', granularity: 'item', source: 'src/shared/FinalQuiz.tsx' },
  { attr: 'data-ft-q', engine: 'final-test', granularity: 'item', source: 'src/shared/finalTest.tsx' },
  { attr: 'data-test-q', engine: 'lesson-test-area', granularity: 'item', source: 'src/lessons/lesson27..lesson32' },
  { attr: 'data-gate', engine: 'lesson-gate', granularity: 'item', source: 'src/lessons/lesson32/kit32.tsx' },
  { attr: 'data-ts-q', engine: 'teachers-space', granularity: 'item', source: 'src/shared/TeachersSpace.tsx' },
];
/** Engines whose marker is the instance itself (not an item inside one). */
const INSTANCE_ATTRS = new Set(TASK_MARKERS.filter((m) => m.granularity === 'instance').map((m) => m.attr));
const ITEM_ENGINE = { 'data-activity-question': 'lesson2-exercise' };
/** Item markers that live inside an instance marker. */
const ITEM_ATTRS = TASK_MARKERS.filter((m) => m.granularity === 'item').map((m) => m.attr);
const byAttr = Object.fromEntries(TASK_MARKERS.map((m) => [m.attr, m]));

/** Text that proves a control submits/checks a task, vs. merely revealing. */
export const CHECK_RX = /تحق|تصحيح|إرسال|إنهاء|تسليم|اعتمد|صحّح|check|submit/i;
export const RESET_RX = /إعادة|أعد|↺|reset|restart|مسح/i;
export const REVEAL_RX = /اكشف|أظهر|كشف|اعرض|reveal|show/i;

// App shell / navigation / site gate. `data-area` is deliberately NOT shell:
// lessons use it to name content regions («data-area="student-lesson"»,
// «data-area="l27-test"»), so treating it as shell would hide real activities.
const SHELL_ANCESTRY = 'nav,aside,[hidden]';
/** Source modules that are chrome, not student tasks. */
export const SHELL_OWNERS = [
  'src/App.tsx',
  'src/shared/LessonNumberNav.tsx',
  'src/shared/SitePasswordGate.tsx',
  'src/shared/ArenaClean.tsx',
  'src/shared/Signature.tsx',
];
const shellOf = (el) => el.closest(SHELL_ANCESTRY);
const shellOwner = (el) => {
  const owner = el.getAttribute('data-audit-owner') || '';
  return SHELL_OWNERS.some((f) => owner.startsWith(`${f}#`)) ? owner.split('#')[0] : null;
};

/**
 * The engine root of a marked item: the nearest ancestor that holds more than
 * one marker of the same kind, i.e. the container the engine repeats items in.
 * One root = one activity instance; its markers = that instance's items.
 */
function engineRoot(el, attr, limit) {
  let root = el;
  for (let a = el.parentElement; a && a !== limit; a = a.parentElement) {
    if (a.querySelectorAll(`[${attr}]`).length > 1) { root = a; break; }
    root = a;
  }
  return root;
}
const rootSig = (el) => `${el.tagName.toLowerCase()}#${el.id || ''}.${String(el.className || '').split(' ').slice(0, 3).join('.')}`;

/**
 * Enumerate activity instances, discovery-only control groups and shell
 * controls in one rendered step. Instances are found ROOT-FIRST so that
 * engine-level controls (the single «تحقق من الإجابات» submit, the reset) are
 * attributed to the instance they belong to instead of falling into discovery.
 */
export function observeInstances(document, lesson, step) {
  const instances = new Map();
  const discovery = new Map();
  const shell = [];
  const limit = document.querySelector('main') || document.body;
  const claimed = [];
  const shellSeen = new Set();
  const inClaimed = (el) => claimed.some((c) => c !== el && c.contains(el));
  const rootsSeen = new Map();

  const controlOf = (el) => {
    const text = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || '').replace(/\s+/g, ' ').trim().slice(0, 200);
    return {
      site: el.getAttribute('data-audit-control'), owner: el.getAttribute('data-audit-owner'),
      tag: el.tagName, type: el.getAttribute('type'), text,
      disabled: !!el.disabled, ariaLabel: el.getAttribute('aria-label'), role: el.getAttribute('role'),
      ariaPressed: el.getAttribute('aria-pressed'), tabIndex: el.getAttribute('tabindex'),
      focusable: !el.disabled && el.getAttribute('tabindex') !== '-1' && /^(BUTTON|INPUT|SELECT|TEXTAREA|A)$/.test(el.tagName),
      checkAction: CHECK_RX.test(text), resetAction: RESET_RX.test(text), revealAction: REVEAL_RX.test(text),
    };
  };
  const controlsIn = (el) => [...el.querySelectorAll('[data-audit-control]')].filter((c) => !shellOf(c) && !shellOwner(c) && !inClaimed(c)).map(controlOf);

  const register = (id, fields, el, itemAttrs) => {
    if (!instances.has(id)) instances.set(id, { id, lesson, owner: el.querySelector('[data-audit-owner]')?.getAttribute('data-audit-owner') ?? null, firstStep: step, steps: [], controls: [], items: [], itemElements: [], rootSignature: rootSig(el), element: el, ...fields });
    const inst = instances.get(id);
    if (!inst.steps.includes(step)) inst.steps.push(step);
    for (const c of controlsIn(el)) if (!inst.controls.some((x) => x.site === c.site && x.text === c.text)) inst.controls.push(c);
    for (const attr of itemAttrs) {
      for (const m of [...el.querySelectorAll(`[${attr}]`)].filter((c) => !shellOf(c) && !inClaimed(c))) {
        const v = `${attr}=${m.getAttribute(attr)}`;
        if (!inst.items.includes(v)) { inst.items.push(v); inst.itemElements.push(m); }
      }
    }
    claimed.push(el);
    return inst;
  };

  // 1. Instance markers: the element itself is one activity. Deepest first, so a
  //    nested engine (TeachersSpace inside FinalQuiz) keeps its own identity and
  //    its controls are not absorbed by the enclosing instance.
  const depth = (el) => { let d = 0; for (let a = el; a; a = a.parentElement) d++; return d; };
  const instanceEls = [...INSTANCE_ATTRS]
    .flatMap((attr) => [...document.querySelectorAll(`[${attr}]`)].map((el) => ({ attr, el })))
    .filter((x) => !shellOf(x.el))
    .sort((a, b) => depth(b.el) - depth(a.el));
  for (const { attr, el } of instanceEls) {
    if (inClaimed(el)) continue;
    const meta = byAttr[attr];
    register(`L${lesson}/${meta.engine}/${el.getAttribute(attr)}`, { engine: meta.engine, marker: attr, markerValue: el.getAttribute(attr) }, el, ITEM_ATTRS);
  }
  // 2. Item markers: the engine root that repeats them is one activity.
  for (const meta of TASK_MARKERS.filter((m) => m.granularity === 'item')) {
    const els = [...document.querySelectorAll(`[${meta.attr}]`)].filter((e) => !shellOf(e) && !shellOwner(e) && !inClaimed(e));
    if (!els.length) continue;
    const groups = new Map();
    for (const e of els) {
      const r = engineRoot(e, meta.attr, limit);
      if (inClaimed(r)) continue;
      const sig = rootSig(r);
      if (!groups.has(sig)) groups.set(sig, r);
    }
    for (const [sig, r] of groups) {
      const key = `${meta.attr}|${sig}`;
      const occurrence = (rootsSeen.get(key) ?? 0) + 1;
      rootsSeen.set(key, occurrence);
      const engine = ITEM_ENGINE[meta.attr] || meta.engine;
      register(`L${lesson}/${engine}/${occurrence}`, { engine, marker: meta.attr, markerValue: null }, r, [meta.attr]);
    }
  }
  // 3. Everything else: shell, or discovery (no stable instance identity).
  for (const el of document.querySelectorAll('[data-audit-control]')) {
    if (inClaimed(el)) continue;
    const control = controlOf(el);
    const shellEl = shellOf(el);
    const ownerFile = shellOwner(el);
    if (shellEl || ownerFile) {
      const id = `L${lesson}/${control.site}`;
      if (!shellSeen.has(id)) { shellSeen.add(id); shell.push({ id, lesson, step, region: shellEl ? shellEl.tagName.toLowerCase() : `shell-module:${ownerFile}`, ...control }); }
      continue;
    }
    const id = `L${lesson}/step-${step}/${control.owner}`;
    if (!discovery.has(id)) discovery.set(id, { id, lesson, step, owner: control.owner, controls: [], identity: 'none — this component emits no task marker' });
    const group = discovery.get(id);
    if (!group.controls.some((c) => c.site === control.site)) group.controls.push(control);
  }
  return { instances: [...instances.values()], discovery: [...discovery.values()], shell };
}

/**
 * An instance requires checking/submission when it owns a check/submit control.
 * A guided reveal owns only reveal controls. Anything else is exploratory.
 */
export function classifyInstance(inst) {
  const check = inst.controls.filter((c) => c.checkAction).length;
  const reset = inst.controls.filter((c) => c.resetAction).length;
  const reveal = inst.controls.filter((c) => c.revealAction).length;
  const policy = check ? 'requires-check-or-submit' : reveal ? 'guided-reveal' : 'exploratory-no-graded-outcome';
  return { policy, checkControls: check, resetControls: reset, revealControls: reveal, otherControls: inst.controls.length - check - reset - reveal };
}

export function readJson(path) { return JSON.parse(readFileSync(path, 'utf8')); }
