// Re-render every original case in the actual App, including repaired cases.
// The immutable pre-repair DOM fixtures are negative controls, not substitute
// production templates. Production CSS and Chromium are used for both sets.
import {execFileSync} from 'node:child_process';
const run=(...args)=>execFileSync(process.execPath,args,{stdio:'inherit'});
const fixtures='docs/audits/bidi-scenes-before.json.gz';
run('scripts/measure-bidi-scenes.mjs',fixtures,'docs/audits/bidi-scene-geometry-before.json');
run('scripts/test-bidi-scene-repairs.mjs','docs/audits/bidi-scene-geometry-before.json','--expect-baseline-failures');
run('scripts/audit-bidi-mixed.mjs','--capture-cases','node_modules/bidi-scenes-after.json','--capture-targets',fixtures,'--report','docs/audits/bidi-after.json');
run('scripts/measure-bidi-scenes.mjs','node_modules/bidi-scenes-after.json','docs/audits/bidi-scene-geometry-after.json');
run('scripts/test-bidi-scene-repairs.mjs','docs/audits/bidi-scene-geometry-after.json');
