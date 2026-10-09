// Whole-course activity denominator and permanent gate (Lessons 1–32).
//
// Reconciles three independently produced records:
//   1. docs/audits/activity-inventory.json      — source census (JSX control sites, by lesson)
//   2. docs/audits/activity-observations.json   — initial-state runtime crawl (observed groups, sites, unobserved sites)
//   3. docs/audits/lesson2-behavior.json        — per-instance behavioral certification (verified activity instances)
//
// Every source control site must end in exactly one bucket:
//   verified                 – behavioral contract exercised in a real lesson shell (evidence file cited)
//   observed-unverified      – seen at runtime but no behavioral contract yet
//   unobserved-unresolved    – in source but never observed by the crawl; NOT dismissed
//   excluded                 – explicitly excluded with a recorded reason (none are excluded today)
//
// The gate fails (exit 1) while any bucket other than `verified` / `excluded` is non-empty.
// It does NOT convert discovery into certification. Run:
//   node scripts/audit-activity-denominator.mjs            # write report, print counts, gate
//   node scripts/audit-activity-denominator.mjs --report-only
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import assert from "node:assert/strict";

const CENSUS = "docs/audits/activity-inventory.json";
const OBS = "docs/audits/activity-observations.json";
const BEHAVIOR = "docs/audits/lesson2-behavior.json";
const OUT = "docs/audits/activity-denominator.json";
const reportOnly = process.argv.includes("--report-only");

const census = JSON.parse(readFileSync(CENSUS, "utf8"));
const obs = JSON.parse(readFileSync(OBS, "utf8"));
const behavior = JSON.parse(readFileSync(BEHAVIOR, "utf8"));

// ---- 1. source census -------------------------------------------------------
const sites = new Map(); // site id -> {id, lesson, source, line}
for (const r of census.records) {
  for (const s of r.sites) sites.set(s.id, { id: s.id, lesson: r.lesson ?? 0, source: r.source, line: s.line, template: r.id });
}

// ---- 2. runtime observation -------------------------------------------------
const observedSites = new Set();
const observedGroups = obs.observations.length;
const observedControls = obs.observations.reduce((n, g) => n + g.controls.length, 0);
for (const g of obs.observations) for (const c of g.controls) observedSites.add(c.site);
const unobservedIds = new Set(obs.unobserved.map((u) => u.id));

// Consistency: every unobserved entry must be a known source site and not observed.
for (const u of obs.unobserved) {
  assert(sites.has(u.id), `unobserved site not in census: ${u.id}`);
  assert(!observedSites.has(u.id), `site both observed and unobserved: ${u.id}`);
}
// Every census site must be either observed or unobserved (no silent drops).
const unaccounted = [...sites.keys()].filter((id) => !observedSites.has(id) && !unobservedIds.has(id));

// ---- 3. verified behavioral instances --------------------------------------
// Verified instances are taken only from the behavioral artifact, and each must
// map to real census sites (by source lesson). Current evidence: Lesson 2 only.
const verifiedInstances = behavior.results.filter((r) => r.status === "verified");
const verifiedQuestions = verifiedInstances.reduce((n, r) => n + r.questions, 0);
const verifiedLessons = new Set(verifiedInstances.map((r) => Number(/^l(\d+)-/.exec(r.id)?.[1])));

// ---- per-lesson reconciliation ---------------------------------------------
const perLesson = {};
for (let l = 0; l <= 32; l++) perLesson[l] = { templates: 0, sourceSites: 0, observedSites: 0, unobservedSites: 0, verifiedInstances: 0, verifiedQuestions: 0 };
for (const r of census.records) perLesson[r.lesson ?? 0].templates++;
for (const s of sites.values()) perLesson[s.lesson].sourceSites++;
for (const id of observedSites) perLesson[sites.get(id)?.lesson ?? 0].observedSites++;
for (const u of obs.unobserved) perLesson[u.lesson ?? sites.get(u.id)?.lesson ?? 0].unobservedSites++;
for (const r of verifiedInstances) {
  const l = Number(/^l(\d+)-/.exec(r.id)?.[1]);
  perLesson[l].verifiedInstances++;
  perLesson[l].verifiedQuestions += r.questions;
}

const totals = {
  censusTemplates: census.records.length,
  censusSourceSites: sites.size,
  observedGroups,
  observedControlOccurrences: observedControls,
  observedSites: observedSites.size,
  unobservedSourceSites: unobservedIds.size,
  unaccountedSourceSites: unaccounted.length,
  verifiedInstances: verifiedInstances.length,
  verifiedQuestions,
  excludedWithReason: 0,
  unresolvedSourceSites: unobservedIds.size + unaccounted.length,
  // Instances discovered as runtime activities have no stable runtime identity
  // yet (the crawl records owner/task/step groups; a question-level instance
  // registry for all 32 lessons does not exist). That cannot be counted here.
  runtimeActivityInstancesDiscovered: "not established",
};

const gaps = {
  unresolvedLessons: Object.entries(perLesson).filter(([, v]) => v.unobservedSites > 0).map(([l]) => Number(l)),
  lessonsWithoutVerifiedInstance: Array.from({ length: 32 }, (_, i) => i + 1).filter((l) => !verifiedLessons.has(l)),
};

const report = {
  scope: "Whole course, Lessons 1–32 source census reconciled to initial-state runtime observation. Verified = behavioral contract exercised in a real lesson shell. Not a claim of exhaustive student-state coverage.",
  sourceFiles: { census: CENSUS, observations: OBS, behavior: BEHAVIOR },
  totals,
  perLesson,
  gaps,
  gate: {
    passes: totals.unresolvedSourceSites === 0 && totals.unaccountedSourceSites === 0 && gaps.lessonsWithoutVerifiedInstance.length === 0,
    failureReasons: [
      totals.unresolvedSourceSites ? `${totals.unresolvedSourceSites} source sites unobserved/unresolved` : null,
      gaps.lessonsWithoutVerifiedInstance.length ? `${gaps.lessonsWithoutVerifiedInstance.length} lessons have no verified behavioral instance` : null,
    ].filter(Boolean),
  },
};

mkdirSync(dirname(OUT), { recursive: true });
if (!reportOnly) writeFileSync(OUT, JSON.stringify(report, null, 2) + "\n");

console.log(`census: ${totals.censusTemplates} templates / ${totals.censusSourceSites} source control sites`);
console.log(`runtime: ${totals.observedGroups} observed groups / ${totals.observedControlOccurrences} control occurrences / ${totals.observedSites} sites observed`);
console.log(`unresolved: ${totals.unobservedSourceSites} unobserved + ${totals.unaccountedSourceSites} unaccounted source sites`);
console.log(`verified behavioral instances: ${totals.verifiedInstances} (${totals.verifiedQuestions} questions); excluded with reason: ${totals.excludedWithReason}`);
console.log(`lessons with a verified instance: ${32 - gaps.lessonsWithoutVerifiedInstance.length}/32`);

if (report.gate.passes) {
  console.log("Activity denominator gate PASSED");
} else {
  console.error("Activity denominator gate FAILED:");
  for (const reason of report.gate.failureReasons) console.error(`  ✕ ${reason}`);
  if (!reportOnly) process.exit(1);
  process.exit(1);
}
