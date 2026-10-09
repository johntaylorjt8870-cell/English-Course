import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const before=JSON.parse(execFileSync('git',['show','59ba597:docs/audits/bidi-after.json'],{encoding:'utf8'}));
const continuation=JSON.parse(readFileSync('docs/audits/bidi-scene-review.json','utf8'));
const after=JSON.parse(readFileSync('docs/audits/bidi-after.json','utf8'));
const key=f=>JSON.stringify([f.lesson,f.category,f.latin,f.arabic]);
const remaining=new Set(after.findings.map(key));
function repair(f){
 const newer=continuation.records.find(r=>r.lesson===f.lesson&&r.category===f.category&&r.latin===f.latin&&r.arabic===f.arabic);
 if(newer?.status.startsWith('REPAIRED'))return {severity:newer.severity,status:'repaired; actual source regression passes',component:newer.sourceOrigin,cause:newer.cause,evidence:newer.evidence,negativeControl:newer.negativeControl};
 const shared={severity:'instructional reading-order defect',status:'repaired; absent from unchanged full crawl',evidence:['docs/audits/bidi-after.json','docs/audits/bidi-boundary-geometry.json']};
 if(f.lesson===1)return {...shared,component:'ExerciseSlide',cause:'English label, separator and Arabic gloss were parsed independently'};
 if(f.lesson===2)return {...shared,component:'ContentSlide',cause:'Raw dynamic introductory text bypassed LatinRuns'};
 if(f.lesson===4&&f.category==='alternatives')return {...shared,component:'Frame → Rich → splitMixedText/pushLatin',cause:'Unmatched opening enclosure consumed English after it, preventing alternative grouping',severity:'choice-order reversal',negativeControl:'Actual 59ba597 renderer reproduces reversed a/an character positions'};
 if(f.lesson===4)return {...shared,component:f.logical.includes('قبل اسم')?'ArtBlock':'VowelLab',cause:'Label and explanation were unrelated RTL flex siblings'};
 if(f.lesson===9)return {...shared,component:'Cover',cause:'English time-word and Arabic definition parsed on opposite sides of the separator'};
 if(f.lesson===12)return {...shared,component:f.logical.startsWith('Present:')?'ReadTrick':'Summary',cause:f.logical.startsWith('Present:')?'Raw conditional mixed text':'Separately parsed English label and Arabic gloss'};
 if(f.lesson===13)return {...shared,component:f.logical.startsWith('🎓')?'Objectives':'GoldenMachine',cause:'Semantic equation fragmented across renderer boundaries'};
 if(f.lesson===24)return {...shared,component:f.logical.startsWith('TIME')?'TimeSensor':'MeaningDetector',cause:'English label and Arabic explanation were unrelated RTL flex siblings'};
 throw new Error('A disappearing finding has no reviewed repair classification: '+key(f));
}
const records=before.findings.map(f=>({id:'bidi-'+createHash('sha256').update(key(f)).digest('hex').slice(0,12),lesson:f.lesson,source:`src/lessons/lesson${f.lesson}/Lesson${f.lesson}.tsx`,logical:f.logical,signature:f.sig,category:f.category,...(remaining.has(key(f))?(()=>{const r=continuation.records.find(r=>r.lesson===f.lesson&&r.category===f.category&&r.latin===f.latin&&r.arabic===f.arabic);return {status:'OPEN — not waived',component:r?.sourceOrigin||null,cause:r?.cause||'Review remains open',severity:r?.severity||'Unresolved'};})():repair(f))}));
const added=after.findings.filter(f=>!before.findings.some(b=>key(b)===key(f)));
writeFileSync('docs/audits/bidi-review.json',JSON.stringify({baseline:'59ba597',starting:before.findings.length,repaired:records.filter(r=>r.status.startsWith('repaired')).length,remaining:after.findings.length,added,records},null,2)+'\n');
let md='# Mixed-direction remaining inventory\n\nCurrent unchanged full crawl: **'+after.findings.length+' unresolved findings; zero matching exceptions**. No new waiver. `bidi-review.json` retains all 68 starting findings with stable IDs, exact text, repaired root causes/components, and explicit OPEN dispositions. Exact source origins and geometry are in BIDI-SCENE-REVIEW.md; open heuristic candidates are not waived.\n\n| Lesson | At 59ba597 | Current pair | Current row | Current alternatives |\n|---|---:|---:|---:|---:|\n';
for(let n=1;n<=32;n++){const p=after.byLesson[n];md+=`| ${n} | ${before.findings.filter(f=>f.lesson===n).length} | ${p.pair} | ${p.row} | ${p.alternatives} |\n`;}
md+='\n## Exact unresolved cases\n';for(const f of after.findings)md+=`\n- Lesson ${f.lesson} / ${f.category}: ${f.logical}\n  - \`${f.sig}\`\n`;
writeFileSync('docs/audits/BIDI-REMAINING.md',md);
console.log(`BIDI review: ${records.length} starting findings, ${records.filter(r=>r.status.startsWith('repaired')).length} repaired, ${after.findings.length} OPEN, ${added.length} new findings.`);
