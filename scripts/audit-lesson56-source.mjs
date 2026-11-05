/**
 * Independent source fixture for the original 25-question assessment.
 * This audit deliberately does NOT claim coverage of other lesson sections.
 * Usage: node scripts/audit-lesson56-source.mjs [--json]
 */
import {readFileSync} from 'node:fs';
import ts from 'typescript';
async function load(path){const src=readFileSync(path,'utf8');const js=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)}
const source=JSON.parse(readFileSync('scripts/fixtures/lesson56-final-source.json','utf8'));
const {test}=await load('src/lessons/lesson56/test.ts');
const {practiceGroups}=await load('src/lessons/lesson56/practice.ts');
const component=readFileSync('src/lessons/lesson56/Lesson56.tsx','utf8');
const {lessons,dialogueQA,readingQA,vocabulary}=await load('src/lessons/lesson56/content.ts');
const examples=JSON.parse(readFileSync('scripts/fixtures/lesson56-examples-source.json','utf8'));
const comprehension=JSON.parse(readFileSync('scripts/fixtures/lesson56-comprehension-source.json','utf8'));
const exercise1=JSON.parse(readFileSync('scripts/fixtures/lesson56-exercise1-source.json','utf8'));
const records=[];
function check(number,field,expected,actual,location,correction){
 let status=actual===expected?'complete':actual==null?'missing':correction?.reason&&actual===correction.value?'corrected':'partial';
 records.push({number,field,status,location,expected,...(status==='complete'?{}:{actual}),...(status==='corrected'?{reason:correction.reason}:{})});
}
for(const q of source){
 if(q.kind==='written'){
  const item=practiceGroups[6]?.items[q.number-11];
  check(q.number,'prompt',q.prompt,item?.prompt,`practiceGroups[6].items[${q.number-11}].prompt`);
  check(q.number,'answer',q.answer,item?.answer,`practiceGroups[6].items[${q.number-11}].answer`);
 }else{
  const index=q.number<=10?q.number-1:q.number-11;
  const item=test[index];
  check(q.number,'prompt',q.prompt,item?.en,`test[${index}].en`);
  for(let i=0;i<q.options.length;i++) check(q.number,`option-${i+1}`,q.kind==='multiple'?`${'ABCD'[i]}. ${q.options[i]}`:q.options[i],item?.options?.[i],`test[${index}].options[${i}]`);
  check(q.number,'answer',q.answer,item?.answer,`test[${index}].answer`);
  if(q.explanation)check(q.number,'explanation',q.explanation,item?.why,`test[${index}].why`);
 }
}
for(const q of exercise1){
 const item=practiceGroups[0]?.items[q.number-1];
 const lines=item?.prompt?.split('\n');
 check(`exercise1-${q.number}`,'prompt',q.prompt,lines?.[0],`practiceGroups[0].items[${q.number-1}].prompt`);
 const options=lines?.[1]?.split(/\s{2,}/);
 for(let i=0;i<q.options.length;i++)check(`exercise1-${q.number}`,`option-${i+1}`,`${'ABCD'[i]}. ${q.options[i]}`,options?.[i],`practiceGroups[0].items[${q.number-1}].option[${i}]`);
 check(`exercise1-${q.number}`,'answer',q.answer,item?.answer,`practiceGroups[0].items[${q.number-1}].answer`);
 check(`exercise1-${q.number}`,'explanation',q.explanation,item?.explanation,`practiceGroups[0].items[${q.number-1}].explanation`);
}
for(const [key,actual] of [['dialogueQA',dialogueQA],['readingQA',readingQA]])for(const [i,pair] of comprehension[key].entries()){
 check(`${key}-${i+1}`,'prompt',pair[0],actual[i]?.[0],`${key}[${i}][0]`);
 check(`${key}-${i+1}`,'answer',pair[1],actual[i]?.[1],`${key}[${i}][1]`);
}
for(const [i,[word,meaning]] of comprehension.vocabulary.entries())check(`vocabulary-${i+1}`,'term-translation',`${word}: ${meaning}`,vocabulary[i],`vocabulary[${i}]`);
for(const [group,pairs] of examples.entries())for(const [i,[english,arabic]] of pairs.entries()){
 check(`example-${group+1}-${i+1}`,'english',english,lessons[group]?.lines[i]?.[0],`lessons[${group}].lines[${i}][0]`);
 if(arabic!==null)check(`example-${group+1}-${i+1}`,'translation',arabic,lessons[group]?.lines[i]?.[1],`lessons[${group}].lines[${i}][1]`);
}
const counts={complete:0,partial:0,missing:0,corrected:0};for(const r of records)counts[r.status]++;
const rendered=/questions=\{test\}/.test(component)&&/practiceGroups\[i\]\.items/.test(component)&&/l\.lines\.map/.test(component)&&/attempts\(dialogueQA/.test(component)&&/attempts\(readingQA/.test(component)&&/vocabulary\.map/.test(component);
const report={scope:'selected examples and translations from sections 1–5, section 11 dialogue questions, section 12 reading questions and vocabulary, exercise 1 of section 13, and sections 15–16; all other material remains unaudited by this fixture',sourceQuestions:source.length+exercise1.length+comprehension.dialogueQA.length+comprehension.readingQA.length,reviewedItems:new Set(records.map(r=>r.number)).size,sourceFields:records.length,counts,renderPathsPresent:rendered,records};
if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));else{
 console.log(`Scope: ${report.scope}`);console.log(`Questions: ${report.sourceQuestions}; reviewed items: ${report.reviewedItems}; source fields: ${report.sourceFields}; complete: ${counts.complete}; partial: ${counts.partial}; missing: ${counts.missing}; corrected: ${counts.corrected}; render paths: ${rendered}`);
 for(const r of records.filter(r=>r.status!=='complete'))console.log(`${r.number} ${r.field}: ${r.status} (${r.location}) expected=${JSON.stringify(r.expected)} actual=${JSON.stringify(r.actual)}`);
}
if(counts.partial||counts.missing||!rendered||source.length!==25||exercise1.length!==10)process.exitCode=1;
