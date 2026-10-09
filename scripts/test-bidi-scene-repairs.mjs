import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const report=JSON.parse(readFileSync(process.argv[2]||'docs/audits/bidi-scene-geometry-after.json','utf8'));
const selected=r=>r.lesson===3 || (r.lesson===8&&r.origin.includes('#SentenceCard')) || r.lesson===9 || (r.lesson===10&&r.origin.includes('#VsSimpleAdvanced')) || (r.lesson===12&&r.origin.includes('#SubjectGrid')) || r.lesson===13 || r.lesson===19 || r.lesson===21 || (r.lesson===22&&r.origin.includes('#PositionOverview')) || (r.lesson===26&&(r.origin.includes('#Iq200MatchLab')||r.origin.includes('#WhenVsWhileLab')));
const prefixes=r=>(r.lesson===12&&r.latin==='-ed')||(r.lesson===25&&r.latin==='-ING');
const original=JSON.parse(readFileSync("docs/audits/bidi-scene-geometry-before.json","utf8"));
const targetIds=new Set(original.results.filter(r=>selected(r)||prefixes(r)).map(r=>r.id));
const cases=report.results.filter(r=>targetIds.has(r.id));
assert.equal(cases.length,24,'Every targeted source case must still be measured');
assert.equal(report.results.length,48,'Retain all original cases, not only repaired ones');
for(const old of original.results){
 const current=report.results.find(r=>r.id===old.id);
 assert(current,'Missing original finding '+old.id);
 for(const before of old.measurements){
  const after=current.measurements.find(m=>m.width===before.width);
  assert(after,'Missing viewport '+before.width);
  assert.equal(after.text.replace(/\s/g,''),before.text.replace(/\s/g,''),'Rendered wording changed for '+old.id);
 }
}
const baseline=process.argv.includes('--expect-baseline-failures'),failures=[];
for(const r of cases){
 const outcomes=r.measurements.filter(m=>m.english?.visible&&m.arabic?.visible).map(m=>{
  if(prefixes(r))return m.english.chars[0].x<m.english.chars[1].x&&m.english.chars[0].y===m.english.chars[1].y;
  return m.sameLine?m.englishFirstLeft:m.english.chars[0].y<m.arabic.chars[0].y;
 });
 assert.equal(outcomes.length,2,'Both viewports must have visible geometry for '+r.origin);
 const correct=outcomes.every(Boolean);
 if(baseline?correct:!correct)failures.push({lesson:r.lesson,origin:r.origin,text:r.logical,outcomes});
}
console.log(JSON.stringify({tested:cases.length,mode:baseline?'baseline negative controls':'repaired real scenes',failures},null,2));
assert.equal(failures.length,0,baseline?'Expected prior defects were not reproduced':'Real rendered source cases still fail geometry');
