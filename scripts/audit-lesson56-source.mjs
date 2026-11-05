/**
 * Independent source fixture for the original 25-question assessment.
 * This audit deliberately does NOT claim coverage of other lesson sections.
 * Usage: node scripts/audit-lesson56-source.mjs [--json]
 */
import {readFileSync,unlinkSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {build} from 'esbuild';
import ts from 'typescript';
import assert from 'node:assert/strict';
async function load(path){const src=readFileSync(path,'utf8');const js=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)}
const source=JSON.parse(readFileSync('scripts/fixtures/lesson56-final-source.json','utf8'));
const {test}=await load('src/lessons/lesson56/test.ts');
const {practiceGroups}=await load('src/lessons/lesson56/practice.ts');
const component=readFileSync('src/lessons/lesson56/Lesson56.tsx','utf8');
// استخراج بيانات أمثلة الأدوات كما هي من مُهيئ misc، من دون استخراج مفاتيح من JSX أو تعديل المكوّن.
const tree=ts.createSourceFile('Lesson56.tsx',component,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
let miscInitializer;function visit(node){if(ts.isVariableDeclaration(node)&&node.name.getText(tree)==='misc')miscInitializer=node.initializer?.getText(tree);ts.forEachChild(node,visit)}visit(tree);
if(!miscInitializer)throw new Error('لم يتم العثور على بيانات أدوات الدرس');
const miscJS=ts.transpileModule(`export const misc = ${miscInitializer};`,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {misc}=await import(`data:text/javascript;base64,${Buffer.from(miscJS).toString('base64')}`);

const {sourceExplanations}=await load('src/lessons/lesson56/sourceExplanations.ts');
const {types,lessons,dialogue,reading,dialogueQA,readingQA,vocabulary,speaking}=await load('src/lessons/lesson56/content.ts');
const bundle='node_modules/.lesson56-source-challenge.mjs';
await build({entryPoints:['src/lessons/lesson56/Challenges56.tsx'],outfile:bundle,bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',logLevel:'silent'});
let comparisonGroups;try {({comparisonGroups}=await import(pathToFileURL(`${process.cwd()}/${bundle}`).href));} finally {unlinkSync(bundle);}
const sourceComparisons=JSON.parse(readFileSync('scripts/fixtures/lesson56-comparisons-source.json','utf8'));
const {studyComparison,modalTranslations,decisionExamples,summaryTranslations}=await load('src/lessons/lesson56/comparison.ts');
const explanations=JSON.parse(readFileSync('scripts/fixtures/lesson56-explanations-source.json','utf8'));
const ending=JSON.parse(readFileSync('scripts/fixtures/lesson56-end-source.json','utf8'));
const extra=JSON.parse(readFileSync('scripts/fixtures/lesson56-examples6-10-source.json','utf8'));
const narrative=JSON.parse(readFileSync('scripts/fixtures/lesson56-dialogue-reading-source.json','utf8'));
const examples=JSON.parse(readFileSync('scripts/fixtures/lesson56-examples-source.json','utf8'));
const comprehension=JSON.parse(readFileSync('scripts/fixtures/lesson56-comprehension-source.json','utf8'));
const exercises2to6=JSON.parse(readFileSync('scripts/fixtures/lesson56-exercises2-6-source.json','utf8'));
const exercise1=JSON.parse(readFileSync('scripts/fixtures/lesson56-exercise1-source.json','utf8'));
const records=[];
function classify(expected,actual,correction){return actual===expected?'complete':actual==null||actual===''?'missing':correction?.reason&&actual===correction.value?'corrected':'partial'}
assert.equal(classify('abc','abc'),'complete');assert.equal(classify('abc','ab'),'partial');assert.equal(classify('abc',undefined),'missing');assert.equal(classify('abc','xyz',{value:'xyz',reason:'documented'}),'corrected');assert.equal(classify('abc','xyz',{value:'xyz'}),'partial');
function check(number,field,expected,actual,location,correction){
 let status=classify(expected,actual,correction);
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
for(let group=2;group<=6;group++)for(const [i,q] of exercises2to6[`exercise${group}`].entries()){
 const item=practiceGroups[group-1]?.items[i];const id=`exercise${group}-${i+1}`;
 check(id,'prompt',q.prompt,item?.prompt,`practiceGroups[${group-1}].items[${i}].prompt`);
 check(id,'answer',q.answer,item?.answer,`practiceGroups[${group-1}].items[${i}].answer`);
 if(q.explanation)check(id,'explanation',q.explanation,item?.explanation,`practiceGroups[${group-1}].items[${i}].explanation`,group===4&&i===9?{value:`${q.explanation} وقد تستعمل was في الحديث غير الرسمي.`,reason:'was مقبولة في اللغة غير الرسمية؛ were اختيار تقليدي في الاختبارات.'}:undefined);
}
for(const [i,[english,arabic]] of narrative.dialogue.entries()){
 check(`dialogue-${i+1}`,'english',english,dialogue[i]?.[0],`dialogue[${i}][0]`);
 check(`dialogue-${i+1}`,'translation',arabic,dialogue[i]?.[1],`dialogue[${i}][1]`);
}
for(const [i,paragraph] of narrative.reading.entries())check(`reading-${i+1}`,'english',paragraph,reading[i],`reading[${i}]`);
for(const [group,entry] of sourceComparisons.entries()){
 for(const [i,line] of entry.lines.entries()){
  check(`comparison-${group+1}-${i+1}`,'english',line,comparisonGroups[group]?.lines[i],`comparisonGroups[${group}].lines[${i}]`);
  check(`comparison-${group+1}-${i+1}`,'translation',entry.translations[i],comparisonGroups[group]?.translations[i],`comparisonGroups[${group}].translations[${i}]`);
 }
 check(`comparison-analysis-${group+1}`,'explanation',entry.explain,comparisonGroups[group]?.explain,`comparisonGroups[${group}].explain`);
}
for(const [i,[english,arabic,meaning]] of extra.study.entries()){
 const item=studyComparison[i];check(`study-${i+1}`,'english',english,item?.en,`studyComparison[${i}].en`);check(`study-${i+1}`,'translation',arabic,item?.ar,`studyComparison[${i}].ar`);
 check(`study-${i+1}`,'meaning',meaning,item?.meaning,`studyComparison[${i}].meaning`);
}
for(const [i,[prompt,answer,translation]] of extra.decisions.entries()){
 check(`decision-${i+1}`,'prompt',prompt,decisionExamples[i]?.[0],`decisionExamples[${i}][0]`);check(`decision-${i+1}`,'answer',answer,decisionExamples[i]?.[1],`decisionExamples[${i}][1]`);check(`decision-${i+1}`,'translation',translation,decisionExamples[i]?.[3],`decisionExamples[${i}][3]`);
}
for(const [i,[english,arabic]] of extra.modals.entries()){
 check(`modal-${i+1}`,'english',english,misc.modals.lines[i],`misc.modals.lines[${i}]`);check(`modal-${i+1}`,'translation',arabic,modalTranslations[i],`modalTranslations[${i}]`);
}
for(const [i,[ifClause,unlessClause,arabic]] of extra.unless.entries()){
 check(`unless-${i+1}`,'if',ifClause,misc.unless.lines[i]?.split(' → ')[0],`misc.unless.lines[${i}]`);check(`unless-${i+1}`,'unless',unlessClause,misc.unless.lines[i]?.split(' → ')[1],`misc.unless.lines[${i}]`);
 check(`unless-${i+1}`,'translation',arabic,component.includes(arabic)?arabic:undefined,`Lesson56.tsx unless translation ${i}`);
}
for(const [i,[first,second]] of extra.order.entries()){
 check(`order-${i+1}`,'if-first',first,misc.order.lines[i]?.split(' → ')[0],`misc.order.lines[${i}]`);check(`order-${i+1}`,'result-first',second,misc.order.lines[i]?.split(' → ')[1],`misc.order.lines[${i}]`);
}
for(const section of ['ranges','writing','progress','next'])for(const [i,text] of ending[section].entries())check(`${section}-${i+1}`,'text',text,component.includes(text)?text:undefined,`Lesson56.tsx ${section}`);
for(const [i,text] of ending.speaking.entries())check(`speaking-${i+1}`,'question',text,speaking[i],`speaking[${i}]`);
for(const [i,[formula,example,translation]] of ending.summary.entries()){
 check(`summary-${i+1}`,'formula',formula,types[i]?.formula,`types[${i}].formula`);
 const renderedExample=i===1?(component.includes(example)?example:undefined):types[i]?.example;
 const renderedTranslation=i===1?(component.includes(translation)?translation:undefined):summaryTranslations[i];
 check(`summary-${i+1}`,'example',example,renderedExample,`summary example ${i}`);check(`summary-${i+1}`,'translation',translation,renderedTranslation,`summary translation ${i}`);
}
for(const [i,entry] of explanations.entries())check(`source-explanation-${i+1}`,'text',entry.text,sourceExplanations[entry.group]?.[entry.index],`sourceExplanations[${entry.group}][${entry.index}]`);
const counts={complete:0,partial:0,missing:0,corrected:0};for(const r of records)counts[r.status]++;
const rendered=/questions=\{test\}/.test(component)&&/practiceGroups\[i\]\.items/.test(component)&&/l\.lines\.map/.test(component)&&/attempts\(dialogueQA/.test(component)&&/attempts\(readingQA/.test(component)&&/vocabulary\.map/.test(component)&&/dialogue\.map/.test(component)&&/reading\.map/.test(component)&&/ComparisonChallenge56/.test(component)&&/sourceExplanations\[n\]\.map/.test(component);
const itemStatuses=new Map();const severity={complete:0,corrected:1,partial:2,missing:3};for(const r of records){const previous=itemStatuses.get(r.number)??'complete';if(severity[r.status]>severity[previous])itemStatuses.set(r.number,r.status);else if(!itemStatuses.has(r.number))itemStatuses.set(r.number,previous)}
const itemCounts={complete:0,partial:0,missing:0,corrected:0};for(const status of itemStatuses.values())itemCounts[status]++;
const report={scope:'selected explanations, examples and translations from sections 1–5, examples and translations in sections 6–10, section 11 dialogue and questions, section 12 reading and vocabulary and questions, all six exercises in section 13, section 14 comparisons, sections 15–16, and selected items in sections 17–22; all other material remains unaudited by this fixture',sourceQuestions:source.length+exercise1.length+Object.values(exercises2to6).reduce((n,g)=>n+g.length,0)+comprehension.dialogueQA.length+comprehension.readingQA.length,reviewedItems:itemStatuses.size,itemCounts,sourceFields:records.length,counts,renderPathsPresent:rendered,records};
if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));else{
 console.log(`Scope: ${report.scope}`);console.log(`Item status: ${JSON.stringify(itemCounts)}`);console.log(`Questions: ${report.sourceQuestions}; reviewed items: ${report.reviewedItems}; source fields: ${report.sourceFields}; complete: ${counts.complete}; partial: ${counts.partial}; missing: ${counts.missing}; corrected: ${counts.corrected}; render paths: ${rendered}`);
 for(const r of records.filter(r=>r.status!=='complete'))console.log(`${r.number} ${r.field}: ${r.status} (${r.location}) expected=${JSON.stringify(r.expected)} actual=${JSON.stringify(r.actual)}`);
}
if(counts.partial||counts.missing||!rendered||source.length!==25||exercise1.length!==10)process.exitCode=1;
