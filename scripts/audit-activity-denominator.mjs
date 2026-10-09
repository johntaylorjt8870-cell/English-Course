import { readFileSync, writeFileSync, existsSync } from 'node:fs';

// ============================================================
// Whole-course activity certification gate.
//
// This gate must FAIL while the activity denominator is unknown or while
// in-scope instances remain unverified. It joins four artifacts that measure
// different things and refuses to let a discovery count stand in for a
// certified instance count:
//
//   docs/audits/activity-inventory.json     source control-site census
//   docs/audits/activity-observations.json  initial-state runtime observations
//   docs/audits/activity-instances.json     activity-INSTANCE inventory
//   docs/audits/activity-behavior-probe.json generic P1–P4 behavioral probe
//   docs/audits/lesson2-behavior.json       the only per-instance certification
//
//   node scripts/audit-activity-denominator.mjs
// ============================================================
const read = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null);
const census = read('docs/audits/activity-inventory.json');
const observations = read('docs/audits/activity-observations.json');
const instances = read('docs/audits/activity-instances.json');
const probe = read('docs/audits/activity-behavior-probe.json');
const lesson2 = read('docs/audits/lesson2-behavior.json');

const missing = [
  !census && 'docs/audits/activity-inventory.json (run: npm run audit:activity-inventory)',
  !observations && 'docs/audits/activity-observations.json (run: node scripts/audit-bidi-mixed.mjs --activity-report docs/audits/activity-observations.json)',
  !instances && 'docs/audits/activity-instances.json (run: npm run audit:activity-instances)',
  !probe && 'docs/audits/activity-behavior-probe.json (run: npm run audit:activity-behavior)',
  !lesson2 && 'docs/audits/lesson2-behavior.json (run: npm run audit:lesson2-activities)',
].filter(Boolean);
if (missing.length) {
  console.error('Activity denominator gate FAILED — missing inputs:');
  for (const m of missing) console.error(`  ✕ ${m}`);
  process.exit(1);
}

const sourceSites = census.records.reduce((n, r) => n + r.sites.length, 0);
const observedControls = observations.observations.reduce((n, g) => n + (g.controlOccurrences ?? g.controls?.length ?? 0), 0);
const unobservedSites = observations.unobserved.length;
const enumerated = instances.instances.length;
const inScope = instances.instances.filter((i) => i.policy === 'requires-check-or-submit');
const guidedReveal = instances.instances.filter((i) => i.policy === 'guided-reveal');
const exploratory = instances.instances.filter((i) => i.policy === 'exploratory-no-graded-outcome');
const certified = lesson2.results.filter((r) => r.status === 'verified');
const certifiedIds = new Set(certified.map((c) => `L2/lesson2-exercise/${c.id}`));
const verifiedInScope = inScope.filter((i) => certifiedIds.has(i.id));
const unverifiedInScope = inScope.filter((i) => !certifiedIds.has(i.id));
const probeFullLifecycle = probe.records.filter((r) => r.checkEnabledAfterAnsweringAll && r.feedbackAppearedAfterSubmit && r.resetRestoredInitialState);
const probeBlocking = [...(probe.defects.P1 || []), ...(probe.defects.P2 || []), ...(probe.defects.P3 || [])];
const enginesWithoutExactCount = instances.reconciled.filter((r) => !r.agrees);
const unreached = instances.reconciled.flatMap((r) => r.unreached ?? []);

const reconciliation = {
  sourceControlSites: sourceSites,
  sourceTemplates: census.records.length,
  runtimeControlOccurrences: observedControls,
  runtimeObservedGroups: observations.observations.length,
  unobservedSourceSites: unobservedSites,
  activityInstancesEnumerated: enumerated,
  activityItemsEnumerated: instances.totals.activityItemsEnumerated,
  discoveryGroupsThatAreNotInstances: instances.totals.discoveryGroupsNotInstances,
  discoveryComponentGroups: instances.totals.discoveryComponentGroupsNotInstances,
  shellControlsExcluded: instances.rendered.shellControls,
  inScopeRequiringCheckOrSubmit: inScope.length,
  guidedRevealInstances: guidedReveal.length,
  exploratoryInstances: exploratory.length,
  behaviorallyCertifiedInstances: certified.length,
  behaviorallyCertifiedQuestions: certified.reduce((n, c) => n + c.questions, 0),
  certifiedInScopeInstances: verifiedInScope.length,
  unverifiedInScopeInstances: unverifiedInScope.length,
  genericProbeInstances: probe.records.length,
  genericProbeFullLifecycle: probeFullLifecycle.length,
  genericProbeBlockingFindings: probeBlocking.length,
  enginesWithoutAnExactDenominator: enginesWithoutExactCount.map((r) => r.engine),
  engineInstancesUnreachedByCrawl: unreached.map((u) => `L${u.lesson}:${u.terminatedBy}`),
};

const failureReasons = [
  unobservedSites > 0 ? `${unobservedSites} source control sites were never reached at runtime. They are control sites, not activities, but they are unreconciled: they may hide instances the crawl cannot reach.` : null,
  instances.totals.discoveryGroupsNotInstances > 0 ? `${instances.totals.discoveryGroupsNotInstances} rendered control groups (${instances.totals.discoveryComponentGroupsNotInstances} distinct lesson+component) emit no task marker, so their activity-instance count cannot be established. Discovery is not a denominator.` : null,
  enginesWithoutExactCount.length ? `engines without an exact architecture↔render agreement: ${enginesWithoutExactCount.map((r) => `${r.engine} (${r.architectureNote || `${r.architectureInstances}/${r.architectureItems} expected vs ${r.renderedInstances}/${r.renderedItems} rendered`})`).join('; ')}` : null,
  unreached.length ? `${unreached.length} engine instances expected by the architecture were never reached by the discovery crawl: ${unreached.map((u) => `L${u.lesson} final-quiz (${u.terminatedBy}, ${u.stepsWalked} steps)`).join('; ')}` : null,
  unverifiedInScope.length ? `${unverifiedInScope.length} in-scope instances that require checking/submission have no per-instance behavioral certification (Lesson 2 standard): ${unverifiedInScope.slice(0, 12).map((i) => i.id).join(', ')}${unverifiedInScope.length > 12 ? `, … +${unverifiedInScope.length - 12} more` : ''}` : null,
  probeBlocking.length ? `${probeBlocking.length} P1–P3 findings from the generic behavioral probe` : null,
  probe.records.length - probeFullLifecycle.length > 0 ? `${probe.records.length - probeFullLifecycle.length} in-scope instances could not be driven through answer→submit→feedback→reset by the generic harness, so their reset and feedback timing are unproven` : null,
  certified.length < enumerated ? `per-instance certification covers ${certified.length} of ${enumerated} enumerated instances (${lesson2.scope})` : null,
].filter(Boolean);

const report = {
  scope: 'Whole-course activity certification gate. Discovery counts and certified instance counts are reported separately and are never summed.',
  definitions: instances.definitions,
  reconciliation,
  denominatorEstablished: enginesWithoutExactCount.length === 0 && instances.totals.discoveryGroupsNotInstances === 0 && unobservedSites === 0,
  inScopeFullyCertified: unverifiedInScope.length === 0 && probeBlocking.length === 0,
  certifiedInstances: certified.map((c) => ({ id: `L2/lesson2-exercise/${c.id}`, questions: c.questions, policy: c.policy, coverage: c.coverage, submission: c.submission })),
  unverifiedInScopeInstances: unverifiedInScope.map((i) => ({ id: i.id, lesson: i.lesson, engine: i.engine, items: i.items, controls: i.controls, probeReached: probe.records.some((r) => r.id === i.id), probeFullLifecycle: probeFullLifecycle.some((r) => r.id === i.id) })),
  failureReasons,
};
writeFileSync('docs/audits/activity-denominator.json', JSON.stringify(report, null, 2) + '\n');

console.log(`source census (discovery): ${reconciliation.sourceTemplates} templates / ${reconciliation.sourceControlSites} control sites; ${reconciliation.unobservedSourceSites} unobserved`);
console.log(`runtime (discovery): ${reconciliation.runtimeObservedGroups} control groups / ${reconciliation.runtimeControlOccurrences} control occurrences`);
console.log(`activity instances enumerated: ${reconciliation.activityInstancesEnumerated} (${reconciliation.activityItemsEnumerated} items) — in scope requiring check/submit: ${reconciliation.inScopeRequiringCheckOrSubmit}, guided reveal: ${reconciliation.guidedRevealInstances}, exploratory: ${reconciliation.exploratoryInstances}`);
console.log(`behaviorally certified: ${reconciliation.behaviorallyCertifiedInstances} instances / ${reconciliation.behaviorallyCertifiedQuestions} questions (Lesson 2 standard); generic probe drove ${reconciliation.genericProbeFullLifecycle}/${reconciliation.genericProbeInstances} through the full lifecycle`);
if (failureReasons.length === 0) {
  console.log('Activity certification gate PASSED');
} else {
  console.error('Activity certification gate FAILED:');
  for (const reason of failureReasons) console.error(`  ✕ ${reason}`);
  process.exit(1);
}
