import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
async function load(path){const src=readFileSync(path,'utf8');const js=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)}
const {types,lessons,dialogue,dialogueQA,reading,readingQA,vocabulary,speaking}=await load('src/lessons/lesson56/content.ts');
const {practiceGroups}=await load('src/lessons/lesson56/practice.ts');const {test}=await load('src/lessons/lesson56/test.ts');
assert.equal(types.length,6);assert.equal(lessons.length,6);assert.equal(dialogue.length,12);assert.equal(dialogueQA.length,5);assert.equal(reading.length,8);assert.equal(readingQA.length,7);assert.equal(vocabulary.length,14);assert.equal(speaking.length,6);assert.deepEqual(practiceGroups.map(x=>x.items.length),[10,12,12,10,6,10,10]);assert.equal(test.length,15);for(const q of test){assert.equal(q.type,'single');assert.ok(q.answer>=0&&q.answer<q.options.length);assert.ok(q.why)}
const app=readFileSync('src/App.tsx','utf8');assert.match(app,/route === 56/);assert.match(app,/#\/lesson\/56/);const component=readFileSync('src/lessons/lesson56/Lesson56.tsx','utf8');assert.match(component,/<FinalTest lesson=\{56\}/);assert.match(component,/<TeachersSpace lesson=\{56\}/);
console.log('Lesson 56 static audit passed: 6 patterns, 14 vocabulary, 60 exercises + 10 review questions, 15 final questions, route and shared components. This is not a complete source-fidelity audit.');

// تدقيق محاور المصدر: يؤكد عناصر محددة وعددها وربطها بالعرض، لا مطابقة حرفية شاملة.
const {analysisNotes}=await load('src/lessons/lesson56/content.ts');
const {studyComparison,modalTranslations,decisionExamples}=await load('src/lessons/lesson56/comparison.ts');
const challenges=readFileSync('src/lessons/lesson56/Challenges56.tsx','utf8');
const notes=analysisNotes.flatMap(x=>x.items).join(' ');
const sourceChecks=[
 ()=>{assert.equal(lessons[0].lines.length,9);assert.match(notes,/When/);assert.match(notes,/will melts/);},
 ()=>{assert.equal(lessons[1].lines.length,10);assert.match(notes,/احتمال مستقبلي/);},
 ()=>{assert.equal(lessons[2].lines.length,12);assert.match(notes,/الاستحالة/);assert.match(notes,/were/);},
 ()=>{assert.equal(lessons[3].lines.length,9);assert.match(notes,/التصريف الثالث من have/);},
 ()=>{assert.equal(lessons[4].lines.length+lessons[5].lines.length,8);assert.match(notes,/أقل شيوعًا/);},
 ()=>{assert.equal(studyComparison.length,6);assert.ok(studyComparison.every(x=>x.en&&x.ar&&x.meaning));},
 ()=>{assert.equal(decisionExamples.length,3);assert.ok(decisionExamples.every(x=>x.length===4));},
 ()=>{assert.equal(modalTranslations.length,9);assert.match(component,/misc\.modals|modals:/);},
 ()=>{assert.match(component,/Unless I had taken a taxi/);assert.match(component,/Unless you don't study/);},
 ()=>{assert.match(component,/I would speak English fluently now if I had learned it earlier/);},
 ()=>{assert.equal(dialogue.length,12);assert.equal(dialogueQA.length,5);assert.ok(dialogue.every(x=>x[0]&&x[1]));},
 ()=>{assert.equal(reading.length,8);assert.equal(vocabulary.length,14);assert.equal(readingQA.length,7);},
 ()=>{assert.deepEqual(practiceGroups.slice(0,6).map(g=>g.items.length),[10,12,12,10,6,10]);assert.ok(practiceGroups.slice(0,6).every(g=>g.items.every(q=>q.prompt&&q.answer&&q.explanation)));},
 ()=>{assert.equal((challenges.match(/scenario:/g)||[]).length,3);assert.match(challenges,/If I had had more money/);},
 ()=>{assert.equal(test.length,15);assert.equal(practiceGroups[6].items.length,10);},
 ()=>{assert.deepEqual(test.map(q=>q.answer),[0,1,2,3,1,2,0,2,2,3,0,1,2,3,4]);assert.ok(test.every(q=>q.why));},
 ()=>{for(const range of ['23–25','20–22','17–19','14–16','10–13'])assert.ok(component.includes(range));assert.match(component,/أقل من 10/);},
 ()=>{assert.match(component,/150–180/);assert.match(component,/How Choices Shape Our Lives/);},
 ()=>{assert.equal(speaking.length,6);assert.match(component,/جملتين أو ثلاث/);},
 ()=>{assert.equal(types.length,6);assert.match(component,/If I study, I will pass/);},
 ()=>{for(const value of ['56 / 120','46.67%','64 درسًا'])assert.ok(component.includes(value));},
 ()=>{assert.match(component,/Passive Voice: Foundations/);assert.match(component,/التصريف الثالث V3/);},
];
sourceChecks.forEach((check,i)=>{check();console.log(`✓ Section ${i+1}: selected source elements and display mapping`)});
assert.equal(analysisNotes.length,6);assert.match(component,/analysisNotes\[i\]/);assert.match(component,/id:`analysis-\$\{i\}`/);
console.log('22/22 section spot checks passed; these checks do not establish verbatim or complete source fidelity.');
