import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
async function load(path){const src=readFileSync(path,'utf8');const js=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)}
const {types,lessons,dialogue,dialogueQA,reading,readingQA,vocabulary,speaking}=await load('src/lessons/lesson56/content.ts');
const {practiceGroups}=await load('src/lessons/lesson56/practice.ts');const {test}=await load('src/lessons/lesson56/test.ts');
assert.equal(types.length,6);assert.equal(lessons.length,6);assert.equal(dialogue.length,12);assert.equal(dialogueQA.length,5);assert.equal(reading.length,8);assert.equal(readingQA.length,7);assert.equal(vocabulary.length,14);assert.equal(speaking.length,6);assert.deepEqual(practiceGroups.map(x=>x.items.length),[10,12,12,10,6,10,10]);assert.equal(test.length,15);for(const q of test){assert.equal(q.type,'single');assert.ok(q.answer>=0&&q.answer<q.options.length);assert.ok(q.why)}
const app=readFileSync('src/App.tsx','utf8');assert.match(app,/route === 56/);assert.match(app,/#\/lesson\/56/);const component=readFileSync('src/lessons/lesson56/Lesson56.tsx','utf8');assert.match(component,/<FinalTest lesson=\{56\}/);assert.match(component,/<TeachersSpace lesson=\{56\}/);
console.log('Lesson 56 static audit passed: 6 patterns, 14 vocabulary, 60 exercises + 10 review questions, 15 final questions, route and shared components. This is not a complete source-fidelity audit.');
