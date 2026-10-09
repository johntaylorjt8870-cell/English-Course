// ============================================================
// Activity-instance inventory for the whole course (Lessons 1–32).
//
// This is NOT the control-site census. It answers "how many activities are
// there?" from two independent directions and only reports a denominator where
// the two agree:
//
//   A. Architecture — the task engines and the data that drives them
//      (QUIZZES, FINAL_TESTS, Lesson 2 EXERCISES, data-exercise containers).
//      These give exact per-instance and per-item counts.
//   B. Rendered lessons — the real <App/> mounted in jsdom and stepped through
//      with «التالي», counting the stable task markers each engine emits.
//
// Controls with no task marker are reported as DISCOVERY groups and are never
// added to the denominator. The 822 unobserved source sites stay in the source
// census; they are control sites, not activities.
//
//   node scripts/audit-activity-instances.mjs            # census + gate
//   node scripts/audit-activity-instances.mjs --report-only
//   ONLY=2,27 node scripts/audit-activity-instances.mjs  # subset, no gate
// ============================================================
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { activityInstrumentation } from './lib/activity-observation.mjs';
import { observeInstances, classifyInstance, TASK_MARKERS, readJson } from './lib/activity-instances.mjs';

const req = createRequire(import.meta.url);
const esbuild = req('esbuild');
const { JSDOM } = req('jsdom');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = 'docs/audits/activity-instances.json';
const reportOnly = process.argv.includes('--report-only');
// --no-gate: write the inventory but let scripts/audit-activity-denominator.mjs
// be the single authoritative gate for the whole chain.
const noGate = process.argv.includes('--no-gate');
const LESSONS = process.env.ONLY ? process.env.ONLY.split(',').map(Number) : Array.from({ length: 32 }, (_, i) => i + 1);
const subset = !!process.env.ONLY;

// ---------- A. architecture: engines and the data that drives them ----------
const archDir = join(root, 'node_modules', '.activity-audit');
mkdirSync(archDir, { recursive: true });
const archFile = join(archDir, `arch-${process.pid}.mjs`);
await esbuild.build({
  absWorkingDir: root,
  stdin: {
    contents: `export { QUIZZES } from ${JSON.stringify(join(root, 'src/shared/quizBank.ts'))};
export { FINAL_TESTS, finalTestLessons, FINAL_TEST_MIN, FINAL_TEST_MAX } from ${JSON.stringify(join(root, 'src/shared/finalTestBank.ts'))};
export { EXERCISES } from ${JSON.stringify(join(root, 'src/lessons/lesson2/data.ts'))};`,
    resolveDir: root, loader: 'ts',
  },
  bundle: true, platform: 'node', format: 'esm', outfile: archFile, packages: 'external', logLevel: 'error',
});
const ARCH = await import(pathToFileURL(archFile).href);
rmSync(archFile, { force: true });

// Static marker census: instance markers written literally in the source. This
// is architecture-side evidence independent of the runtime crawl.
const srcFiles = (function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : /\.tsx$/.test(e.name) ? [join(dir, e.name)] : [])); })('src');
const literalMarkers = {};
for (const f of srcFiles) {
  const lesson = Number(/lesson(\d+)\//.exec(f)?.[1]) || 0;
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(/data-exercise="([a-z0-9-]+)"/g)) (literalMarkers[lesson] ??= new Set()).add(`data-exercise=${m[1]}`);
  for (const m of text.matchAll(/data-exercise=\{([a-z]+)\}/g)) (literalMarkers[lesson] ??= new Set()).add(`data-exercise=<dynamic:${m[1]}>`);
}
const inScopeLessons = new Set(LESSONS);
const quizLessons = Object.keys(ARCH.QUIZZES).map(Number).filter((l) => inScopeLessons.has(l) && ARCH.QUIZZES[l].length);
const ftLessons = ARCH.finalTestLessons().filter((l) => inScopeLessons.has(l));
const architecture = {
  scope: process.env.ONLY ? `Lessons ${LESSONS.join(', ')} only (ONLY set)` : 'All 32 lessons',
  engines: TASK_MARKERS.map((m) => ({ engine: m.engine, marker: m.attr, granularity: m.granularity, source: m.source })),
  finalQuiz: {
    engine: 'final-quiz', instances: quizLessons.length,
    items: quizLessons.reduce((n, l) => n + ARCH.QUIZZES[l].length, 0),
    perLesson: Object.fromEntries(quizLessons.map((l) => [l, ARCH.QUIZZES[l].length])),
  },
  finalTest: {
    engine: 'final-test', instances: ftLessons.length,
    items: ftLessons.reduce((n, l) => n + ARCH.FINAL_TESTS[l].length, 0),
    bounds: { min: ARCH.FINAL_TEST_MIN, max: ARCH.FINAL_TEST_MAX },
    perLesson: Object.fromEntries(ftLessons.map((l) => [l, ARCH.FINAL_TESTS[l].length])),
  },
  lesson2Exercises: {
    engine: 'lesson2-exercise', instances: inScopeLessons.has(2) ? ARCH.EXERCISES.length : 0,
    items: inScopeLessons.has(2) ? ARCH.EXERCISES.reduce((n, e) => n + e.questions.length, 0) : 0,
    ids: ARCH.EXERCISES.map((e) => e.id),
  },
  lessonExerciseMarkers: {
    engine: 'lesson-exercise',
    // data-exercise values are partly dynamic ({tag}), so the source only gives
    // a floor. Recorded as a floor, never as the denominator.
    staticallyEnumerable: false,
    literalFloor: Object.entries(literalMarkers).filter(([l]) => inScopeLessons.has(Number(l))).reduce((n, [, v]) => n + [...v].filter((x) => !x.includes('<dynamic')).length, 0),
    perLesson: Object.fromEntries(Object.entries(literalMarkers).filter(([l]) => inScopeLessons.has(Number(l))).map(([l, v]) => [l, [...v]])),
  },
};

// ---------- B. rendered lessons: crawl the real App ----------
const bundleDir = join(root, 'node_modules', '.activity-audit');
const outFile = join(bundleDir, `app-${process.pid}.mjs`);
await esbuild.build({
  absWorkingDir: root,
  plugins: [activityInstrumentation(root)],
  stdin: {
    contents: `export { default as App } from ${JSON.stringify(join(root, 'src/App.tsx'))};
export { createRoot } from "react-dom/client";
import React from "react"; export { React };
export { flushSync } from "react-dom";`,
    resolveDir: root, loader: 'tsx',
  },
  bundle: true, platform: 'node', format: 'esm', outfile: outFile, jsx: 'automatic', packages: 'external', logLevel: 'error',
});
const M = await import(pathToFileURL(outFile).href);
rmSync(outFile, { force: true });

const dom = new JSDOM(`<!doctype html><html dir="rtl"><body></body></html>`, { url: 'http://localhost/', pretendToBeVisual: true });
const win = dom.window;
for (const k of ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent', 'HTMLInputElement', 'HTMLTextAreaElement', 'getComputedStyle', 'localStorage', 'sessionStorage', 'requestAnimationFrame', 'cancelAnimationFrame', 'MutationObserver', 'CustomEvent', 'HashChangeEvent', 'Text', 'Comment', 'DocumentFragment', 'HTMLDivElement', 'SVGElement', 'DOMParser', 'Audio', 'HTMLAudioElement']) {
  if (win[k] !== undefined) Object.defineProperty(globalThis, k, { value: win[k], configurable: true });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = false;
const stub = (o, k, v) => { if (!o[k]) o[k] = v; };
stub(win.Element.prototype, 'scrollTo', () => {});
stub(win.Element.prototype, 'scrollIntoView', () => {});
stub(win, 'scrollTo', () => {});
stub(win, 'matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
stub(win, 'IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
stub(win, 'ResizeObserver', class { observe() {} unobserve() {} disconnect() {} });
globalThis.window.speechSynthesis = globalThis.window.speechSynthesis || { speak() {}, cancel() {}, getVoices: () => [] };
win.localStorage.setItem('englishwithsomer-site-unlocked', 'unlocked');
const tick = (ms = 15) => new Promise((r) => setTimeout(r, ms));
const NEXT_RX = /التالي|التالية|Next/;
const findNext = () => [...document.querySelectorAll('button')].find((b) => !b.disabled && NEXT_RX.test(b.textContent || '') && !/السابق/.test(b.textContent || ''));

/** Merged across steps: one entry per activity instance. */
const instances = new Map();
const discovery = new Map();
const shellControls = [];
const stepsWalked = {};
const crawlTermination = {};

for (const n of LESSONS) {
  win.location.hash = `#/lesson/${n}`;
  document.body.innerHTML = '<div id="root"></div>';
  const host = document.getElementById('root');
  const r = M.createRoot(host);
  M.flushSync(() => r.render(M.React.createElement(M.App)));
  win.dispatchEvent(new win.HashChangeEvent('hashchange'));
  await tick(40);
  let prev = null, steps = 0, terminatedBy = 'step-cap';
  for (let i = 0; i < 200; i++) {
    const html = host.innerHTML;
    if (html === prev) break;
    prev = html; steps = i + 1;
    const seen = observeInstances(document, n, i + 1);
    for (const inst of seen.instances) {
      if (!instances.has(inst.id)) instances.set(inst.id, { ...inst, steps: [...inst.steps], controls: [...inst.controls], items: [...inst.items] });
      const merged = instances.get(inst.id);
      for (const s of inst.steps) if (!merged.steps.includes(s)) merged.steps.push(s);
      for (const it of inst.items) if (!merged.items.includes(it)) merged.items.push(it);
      for (const c of inst.controls) if (!merged.controls.some((x) => x.site === c.site && x.text === c.text)) merged.controls.push(c);
    }
    for (const d of seen.discovery) {
      if (!discovery.has(d.id)) discovery.set(d.id, d);
      else for (const c of d.controls) if (!discovery.get(d.id).controls.some((x) => x.site === c.site)) discovery.get(d.id).controls.push(c);
    }
    shellControls.push(...seen.shell);
    const b = findNext();
    if (!b) { terminatedBy = 'no-enabled-next-control'; break; }
    b.click();
    await tick(15);
    if (host.innerHTML === prev) terminatedBy = 'html-stable-after-next';
  }
  stepsWalked[n] = steps;
  crawlTermination[n] = terminatedBy;
  M.flushSync(() => r.unmount());
}

// ---------- reconcile architecture against the rendered lessons ----------
const renderedInstances = [...instances.values()].map((inst) => ({ ...inst, ...classifyInstance(inst) }));
const byEngine = {};
for (const inst of renderedInstances) {
  byEngine[inst.engine] ??= { engine: inst.engine, instances: 0, items: 0, controls: 0, policies: {} };
  byEngine[inst.engine].instances++;
  byEngine[inst.engine].items += inst.items.length;
  byEngine[inst.engine].controls += inst.controls.length;
  byEngine[inst.engine].policies[inst.policy] = (byEngine[inst.engine].policies[inst.policy] || 0) + 1;
}
const reconciled = [
  { engine: 'final-quiz', architectureInstances: architecture.finalQuiz.instances, architectureItems: architecture.finalQuiz.items, renderedInstances: byEngine['final-quiz']?.instances ?? 0, renderedItems: byEngine['final-quiz']?.items ?? 0 },
  { engine: 'final-test', architectureInstances: architecture.finalTest.instances, architectureItems: architecture.finalTest.items, renderedInstances: byEngine['final-test']?.instances ?? 0, renderedItems: byEngine['final-test']?.items ?? 0 },
  { engine: 'lesson2-exercise', architectureInstances: architecture.lesson2Exercises.instances, architectureItems: architecture.lesson2Exercises.items, renderedInstances: byEngine['lesson2-exercise']?.instances ?? 0, renderedItems: byEngine['lesson2-exercise']?.items ?? 0 },
  { engine: 'lesson-exercise', architectureInstances: null, architectureNote: 'data-exercise values are partly dynamic; the source gives only a literal floor, so no exact architecture-side count exists', renderedInstances: byEngine['lesson-exercise']?.instances ?? 0, renderedItems: byEngine['lesson-exercise']?.items ?? 0 },
];
// Reachability: an engine instance the architecture requires but the crawl never
// rendered is UNREACHED, not absent. The crawler only clicks «التالي» and never
// answers a gate, so a lesson whose navigation is gated stops early. Record the
// evidence instead of silently shrinking the denominator.
const quizSource = Object.fromEntries(LESSONS.map((l) => {
  const f = `src/lessons/lesson${l}/Lesson${l}.tsx`;
  return [l, existsSync(f) && new RegExp(`FinalQuiz\\s+lesson=\\{${l}\\}`).test(readFileSync(f, 'utf8'))];
}));
const renderedQuizLessons = new Set(renderedInstances.filter((i) => i.engine === 'final-quiz').map((i) => i.lesson));
const unreachedQuiz = quizLessons.filter((l) => !renderedQuizLessons.has(l)).map((l) => ({
  lesson: l, expectedItems: ARCH.QUIZZES[l].length, sourceRendersEngine: !!quizSource[l],
  stepsWalked: stepsWalked[l], terminatedBy: crawlTermination[l],
  classification: quizSource[l] ? 'UNREACHED by the discovery crawl — the lesson does render <FinalQuiz>; the step crawl stopped before it. Not evidence of a missing activity.' : 'UNEXPLAINED — no <FinalQuiz lesson={n}> in the lesson source; requires source review',
}));
for (const r of reconciled) {
  r.agrees = r.architectureInstances === null
    ? false
    : r.architectureInstances === r.renderedInstances && (r.architectureItems === null || r.architectureItems === r.renderedItems);
  if (r.engine === 'final-quiz') { r.unreached = unreachedQuiz; r.unreachedInstances = unreachedQuiz.length; }
}

// ---------- verified instances (separate ledger, never inferred) ----------
const behavior = existsSync('docs/audits/lesson2-behavior.json') ? readJson('docs/audits/lesson2-behavior.json') : { results: [] };
const verified = behavior.results.filter((x) => x.status === 'verified');
const verifiedIds = new Set(verified.map((v) => `L2/lesson2-exercise/${v.id}`));
for (const inst of renderedInstances) inst.verified = verifiedIds.has(inst.id) ? { source: 'docs/audits/lesson2-behavior.json', coverage: verified.find((v) => `L2/lesson2-exercise/${v.id}` === inst.id).coverage } : false;

// ---------- in-scope = requires checking/submission ----------
const inScope = renderedInstances.filter((i) => i.policy === 'requires-check-or-submit');
const unverifiedInScope = inScope.filter((i) => !i.verified);
const census = existsSync('docs/audits/activity-inventory.json') ? readJson('docs/audits/activity-inventory.json') : null;
const censusSites = census ? census.records.reduce((n, r) => n + r.sites.length, 0) : null;
const observations = existsSync('docs/audits/activity-observations.json') ? readJson('docs/audits/activity-observations.json') : null;

const denominatorEstablished = reconciled.every((r) => r.agrees) && [...discovery.values()].length === 0;
const report = {
  scope: 'Activity-instance inventory. Discovery counts (control sites, unmarked control groups) are reported separately from instance counts and are never summed into the denominator.',
  definitions: {
    controlSite: 'A JSX element in src/**/*.tsx carrying an on* prop or a native interactive tag. Census only; not an activity.',
    discoveryGroup: 'Rendered controls with no task marker, grouped by component template and step. Conflates data-bound siblings, so it is a floor on groups, not an instance count.',
    activityInstance: 'A bounded student task with a stable rendered identity (task marker), owning items and controls, with a graded or explicitly guided outcome.',
    verifiedInstance: 'An activity instance whose complete behavioral contract (empty/partial/complete, feedback timing, reset, keyboard, accessible names, sibling isolation) was exercised in a real browser.',
  },
  stepsWalked,
  crawlTermination,
  architecture,
  rendered: {
    instances: renderedInstances.length,
    byEngine,
    policies: renderedInstances.reduce((a, i) => ((a[i.policy] = (a[i.policy] || 0) + 1), a), {}),
    itemsTotal: renderedInstances.reduce((n, i) => n + (i.items.length || 0), 0),
    controlsOwned: renderedInstances.reduce((n, i) => n + i.controls.length, 0),
    discoveryGroups: discovery.size,
    discoveryComponentGroups: new Set([...discovery.values()].map((d) => `L${d.lesson}/${d.owner}`)).size,
    discoveryControls: [...discovery.values()].reduce((n, d) => n + d.controls.length, 0),
    shellControls: shellControls.length,
  },
  reconciled,
  totals: {
    sourceControlSites: censusSites,
    sourceTemplates: census?.records.length ?? null,
    unobservedSourceSites: observations?.unobserved.length ?? null,
    activityInstancesEnumerated: renderedInstances.length,
    activityItemsEnumerated: renderedInstances.reduce((n, i) => n + (i.items.length || 0), 0),
    inScopeRequiringCheck: inScope.length,
    verifiedInstances: verified.length,
    verifiedQuestions: verified.reduce((n, v) => n + v.questions, 0),
    unverifiedInScopeInstances: unverifiedInScope.length,
    discoveryGroupsNotInstances: discovery.size,
    discoveryComponentGroupsNotInstances: new Set([...discovery.values()].map((d) => `L${d.lesson}/${d.owner}`)).size,
    probeFullLifecycle: existsSync('docs/audits/activity-behavior-probe.json') ? readJson('docs/audits/activity-behavior-probe.json').records.filter((x) => x.checkEnabledAfterAnsweringAll && x.feedbackAppearedAfterSubmit && x.resetRestoredInitialState).length : null,
    probeFindings: existsSync('docs/audits/activity-behavior-probe.json') ? readJson('docs/audits/activity-behavior-probe.json').findings : null,
  },
  denominatorEstablished,
  instances: renderedInstances.map((i) => ({ id: i.id, lesson: i.lesson, engine: i.engine, marker: i.marker, items: i.items.length, steps: i.steps, policy: i.policy, checkControls: i.checkControls, resetControls: i.resetControls, revealControls: i.revealControls, controls: i.controls.length, rootSignature: i.rootSignature, verified: !!i.verified, verificationCoverage: i.verified ? i.verified.coverage : null })),
  discovery: [...discovery.values()].map((d) => ({ id: d.id, lesson: d.lesson, step: d.step, owner: d.owner, identity: d.identity, controls: d.controls.length, sampleControls: d.controls.slice(0, 8).map((c) => ({ tag: c.tag, text: c.text.slice(0, 60), check: c.checkAction, reset: c.resetAction, reveal: c.revealAction, focusable: c.focusable })) })),
  gate: {
    passes: denominatorEstablished && unverifiedInScope.length === 0 && discovery.size === 0,
    failureReasons: [
      ...reconciled.filter((r) => !r.agrees).map((r) => (r.architectureInstances === null
        ? `${r.engine}: no exact architecture-side instance count (${r.architectureNote}) — denominator for this engine is not established`
        : `${r.engine}: architecture ${r.architectureInstances} instances/${r.architectureItems} items vs rendered ${r.renderedInstances}/${r.renderedItems}${r.unreachedInstances ? ` — ${r.unreachedInstances} UNREACHED by the discovery crawl (${r.unreached.map((u) => 'L' + u.lesson + ':' + u.terminatedBy).join(', ')})` : ''}`)),
      discovery.size ? `${discovery.size} rendered control groups have no task marker, so their activity-instance count is not established (${[...discovery.values()].reduce((n, d) => n + d.controls.length, 0)} controls)` : null,
      unverifiedInScope.length ? `${unverifiedInScope.length} in-scope instances requiring check/submit are not behaviorally verified` : null,
      verified.length < renderedInstances.length ? `verified instances ${verified.length} of ${renderedInstances.length} enumerated` : null,
    ].filter(Boolean),
  },
};
mkdirSync(dirname(OUT), { recursive: true });
if (!reportOnly) writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n');

const t = report.totals;
console.log(`architecture: final-quiz ${architecture.finalQuiz.instances} instances/${architecture.finalQuiz.items} items · final-test ${architecture.finalTest.instances}/${architecture.finalTest.items} · lesson2 ${architecture.lesson2Exercises.instances}/${architecture.lesson2Exercises.items}`);
console.log(`rendered: ${t.activityInstancesEnumerated} activity instances / ${t.activityItemsEnumerated} items owning ${report.rendered.controlsOwned} controls`);
console.log(`discovery (NOT instances): ${t.discoveryGroupsNotInstances} step-scoped groups (${t.discoveryComponentGroupsNotInstances} distinct lesson+component) / ${report.rendered.discoveryControls} controls; shell controls ${report.rendered.shellControls}`);
for (const u of unreachedQuiz) console.error(`  ⚠ final-quiz L${u.lesson}: ${u.classification} (steps walked ${u.stepsWalked}, terminated: ${u.terminatedBy})`);
console.log(`source census (NOT instances): ${t.sourceTemplates} templates / ${t.sourceControlSites} control sites; ${t.unobservedSourceSites} unobserved`);
console.log(`in scope requiring check/submit: ${t.inScopeRequiringCheck}; verified: ${t.verifiedInstances} instances / ${t.verifiedQuestions} questions; unverified in scope: ${t.unverifiedInScopeInstances}`);
if (report.gate.passes) { console.log('Activity-instance gate PASSED'); }
else {
  console.error('Activity-instance gate FAILED:');
  for (const reason of report.gate.failureReasons) console.error(`  ✕ ${reason}`);
  if (!subset && !noGate) process.exit(1);
}
