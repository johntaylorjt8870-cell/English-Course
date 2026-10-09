import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import assert from 'node:assert/strict';
const lessons=[27,28,30,31,32];
const output=resolve('node_modules/.teacher-index.mjs');
await build({stdin:{resolveDir:process.cwd(),loader:'ts',contents:`export {indexTeacherSource} from './src/shared/teacherSourceIndex';export {LESSON2_REFERENCES} from './src/lessons/lesson2/teacherReference';export {EXERCISES} from './src/lessons/lesson2/data';${lessons.map(n=>`export {TEACHER_${n}_SOLUTIONS as L${n}} from './src/lessons/lesson${n}/${n===32?'teacherData':'data'}';`).join('\n')}`},bundle:true,format:'esm',platform:'node',outfile:output});
const data=await import(pathToFileURL(output));rmSync(output);
const canonical=data.LESSON2_REFERENCES;
assert.equal(canonical.length,data.EXERCISES.reduce((n,e)=>n+e.questions.length,0));
for(const ex of data.EXERCISES)for(const [i,q] of ex.questions.entries()){const r=canonical.find(r=>r.id===`${ex.id}/q${i+1}`);assert(r);assert.equal(r.original,q,'Reference must retain the actual canonical question object');assert.equal(r.sourcePage,null);assert.equal(r.printedQuestionNumber,null);}
const report={ canonicalLessons:[{lesson:2,questions:canonical,questionCount:canonical.length,mappedCanonicalCount:canonical.length,verifiedExternalTextbookCount:0}], scope:'All existing TEACHER_n_SOLUTIONS groups; NOT all textbook source questions', lessons:[], gaps:[] };
for(let n=1;n<=32;n++){
 if(n===2){report.gaps.push({lesson:2,id:'L2-textbook-key',reason:'All 29 canonical exercise questions are directly navigable behind the teacher gate. External textbook page and printed question provenance remain unavailable.',items:canonical.map(q=>({id:q.id,prompt:q.prompt,sourcePath:q.sourcePath,missing:['external textbook page','printed question numbering']}))});continue;}
 if(!lessons.includes(n)){
  report.gaps.push({lesson:n,id:`L${n}-textbook-key`,reason:n===29?'Teacher area has overview/notes and assessment keys, but no TEACHER_29_SOLUTIONS reference bank.':'Legacy teacher area contains the FinalQuiz key, not a textbook-question solution bank. Source activity mapping remains unverified.'});continue;
 }
 const groups=data.indexTeacherSource(n,data[`L${n}`]);
 for(const [i,g] of groups.entries()){
  assert.deepEqual(g.originalLines,data[`L${n}`][i].lines,'No line may be dropped or rewritten');
  const covered=new Set([...g.context.map(c=>c.line),...g.items.flatMap(q=>q.sourceLineIndexes)]);
  assert.equal(covered.size,g.originalLines.length,'Every source line must be accounted for');
  for(let li=0;li<g.originalLines.length;li++){
   if(g.context.some(c=>c.line===li))continue;
   const reconstructed=g.items.flatMap(q=>q.sourceLineIndexes.map((line,k)=>({line,text:q.segments[k]}))).filter(x=>x.line===li).map(x=>x.text).join('');
   assert.equal(reconstructed,g.originalLines[li],'Numbered splitting must be lossless');
  }
  report.gaps.push({lesson:n,id:g.id,reference:g.reference,reason:'Source page and original question text not mapped in teacher reference bank.',unmappedLines:g.context.map(c=>({line:c.line+1,text:c.text}))});
 }
 report.lessons.push({lesson:n,groups});
}
mkdirSync('docs/audits',{recursive:true});
const path='docs/audits/teacher-source-coverage.json';
const serialized=JSON.stringify(report,null,2)+'\n';
if(process.argv.includes('--write'))writeFileSync(path,serialized);else assert.equal(readFileSync(path,'utf8'),serialized,'Teacher source index drift: review exact gaps and regenerate');
console.log(`Teacher-source census: ${report.lessons.reduce((n,l)=>n+l.groups.length,0)} groups, ${report.lessons.reduce((n,l)=>n+l.groups.reduce((n,g)=>n+g.items.length,0),0)} explicitly numbered items; all original lines retained. ${report.gaps.length} exact mapping gaps remain OPEN. Lesson 2: ${canonical.length}/${canonical.length} canonical questions directly mapped; 0 external textbook mappings verified.`);
