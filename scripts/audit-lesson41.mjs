import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
const dir='node_modules/.lesson41-audit';mkdirSync(dir,{recursive:true});
await build({stdin:{contents:`export * from './src/lessons/lesson41/ledger41';export * from './src/lessons/lesson41/practiceData41';export * from './src/lessons/lesson41/testData41';export * from './src/lessons/lesson41/solutionsData41';export * from './src/lessons/lesson41/practiceNotes41';export * from './src/lessons/lesson41/coverage41';`,resolveDir:process.cwd()},outfile:`${dir}/data.mjs`,bundle:true,platform:'node',format:'esm'});
const data=await import(`../${dir}/data.mjs?${Date.now()}`);
let checks=0;const ok=(condition,message)=>{checks++;assert.ok(condition,message);};
const {SOURCE_SECTIONS_41:sections,PRACTICE_41:practice,TEST_LEVELS_41:levels,TEST_QUESTIONS_41:questions,TEST_SOLUTIONS_41:solutions,COVERAGE_41:coverage}=data;
ok(sections.length===41,'opening plus 40 sections');
const expected={23:6,29:10,30:8,31:8,32:8,33:8,34:8,35:10};
const manifest=JSON.parse(readFileSync('docs/lesson41-source-manifest.json','utf8'));
for(const [i,section] of sections.entries()){
 ok(section.num===i,`section ${i} ordered`);ok(section.lines.length>0,`section ${i} substantive`);
 const hash=createHash('sha256').update(section.lines.join('\n')).digest('hex');
 ok(hash===manifest[i].sha256&&section.lines.length===manifest[i].units,`section ${i}: frozen source inventory unchanged`);
 ok(coverage[i].units.length===section.lines.length,`section ${i} coverage includes every line`);
 ok(new Set(section.units.map(u=>u.id)).size===section.units.length,`section ${i} distinct units`);
}
for(const [section,count] of Object.entries(expected)){
 const items=practice.filter(p=>p.section===Number(section));ok(items.length===count,`§${section} count`);
 ok(new Set(items.map(p=>p.id)).size===count,`§${section} unique items`);
 items.forEach((item,i)=>{ok(item.number===i+1,'source item order');ok(item.prompt&&item.sourceAnswer&&data.practiceReason41(item.section,item.number),'prompt, source answer and authored reason all exist');});
}
ok(practice.filter(p=>p.section===30).every(p=>p.parts.length===2),'all eight identification questions have both parts');
ok(practice.find(p=>p.id==='p34-7').parts.join(',')==='DID,DO','double DO both roles');
ok(practice.filter(p=>p.section===29).every(p=>p.parts.join(',')==='repair,reason'),'all ten errors require repair AND explanation');
ok(levels.length===5&&levels.every(l=>l.questions.length===5),'exactly five levels of five');
ok(questions.length===25&&new Set(questions.map(q=>q.id)).size===25,'exactly 25 distinct final questions');
ok(questions[7].fields.length===2,'Q8 retains two blanks');
ok(solutions.length===25&&solutions.every((s,i)=>s.number===i+1&&s.answer&&s.reason),'25 detailed ordered keys');
ok(solutions.slice(20).map(s=>s.answer).join(',')==='Do,Are,Have,Did,Will','dialogue keys');
const source36=sections[36].lines;
const promptText=levels.flatMap(l=>[l.title,...l.context,...l.questions.flatMap(q=>[...q.lines,...q.options])]).join('\n');
for(const line of source36.slice(2)){
 if(line==='الأسئلة:')continue;
 const clean=data.NUMBER_MARKS_41.includes(line[0])?line.slice(1).trim():line;
 ok(promptText.includes(clean),`test preserves source: ${clean}`);
}
ok(!data.testComplete41({}),'empty test cannot submit');
const complete=Object.fromEntries(questions.flatMap(q=>q.fields.map((_,i)=>[`${q.id}-${i}`,'attempt'])));
ok(data.testComplete41(complete),'completed test can submit');delete complete['q8-1'];ok(!data.testComplete41(complete),'Q8 second blank required');
const read=name=>readFileSync(`src/lessons/lesson41/${name}`,'utf8');
const testGraph=await build({entryPoints:['src/lessons/lesson41/TestArea41.tsx'],write:false,bundle:true,metafile:true,platform:'browser',format:'esm'});
ok(!Object.keys(testGraph.metafile.inputs).some(p=>/solutionsData|TeacherGuide|practiceData|ledger41|source41/.test(p)),'test dependency graph contains no source ledger, keys or teacher modules');
ok(!/sourceAnswer|correctAnswer|correct:|solutionsData|answerKey/.test(read('testData41.ts')),'student test data has no key fields');
ok(/lazy\(\(\)=>import\('\.\/SolutionsArea41'\)\)/.test(read('Lesson41.tsx')),'lazy solutions');
ok(/area==='solutions'&&unlocked/.test(read('Lesson41.tsx')),'solutions render gated');
ok(/const unlocked=submitted\|\|teacher/.test(read('Lesson41.tsx')),'submission or teacher authorization');
ok(/if\(testComplete41\(answers\)\)/.test(read('Lesson41.tsx')),'submit revalidates completeness');
ok(/setAnswers\(\{\}\);setSubmitted\(false\)/.test(read('Lesson41.tsx')),'reset clears answers and submission');
ok(/lazy\(\(\)=>import\('\.\/TeacherGuide41'\)\)/.test(read('TeacherArea41.tsx')),'lazy teacher guide');
const oldPassword=readFileSync('src/lessons/lesson40/TeacherArea40.tsx','utf8').match(/TEACHER_PASSWORD_40 = "([^"]+)"/)[1];
ok(read('TeacherArea41.tsx').includes(`password.trim()==='${oldPassword}'`),'existing teacher mechanism preserved');
const app=readFileSync('src/App.tsx','utf8');ok(app.includes('route === 41')&&app.includes('href: "#/lesson/41"'),'route + card');
ok(app.includes('route === 42')&&existsSync('src/lessons/lesson42')&&!app.includes('route === 43')&&!existsSync('src/lessons/lesson43'),'Lesson 42 implemented; Lesson 43 still not implemented');
ok(!/Show source|نص المصدر الحرفي|data-source-reveal/i.test(read('Steps41.tsx')),'no student raw-source reveal');
ok(!/[\u202a-\u202e\u2066-\u2069]/.test(read('source41.ts')),'no bidi control characters');
ok(read('kit41.tsx').includes("import { Rich }")&&read('kit41.tsx').includes("dir={english?'ltr'"),'shared mixed BIDI + explicit English direction');
// WCAG relative luminance for every lesson token pairing (browser audit checks rendered states).
function luminance(hex){const rgb=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
const pairs=[['17243b','ffffff'],['4d5c72','f4f6fa'],['ffffff','101c32'],['77e9ec','101c32'],['4338a5','eeecff'],['086373','e8f9fa'],['825000','fff3d9'],['176343','eaf6ef'],['a02639','fff0f2'],['4d5c72','e4e8ef'],['ffffff','4338a5'],['086373','ffffff']];
for(const [fg,bg] of pairs){const l=[luminance(fg),luminance(bg)].sort((a,b)=>b-a);ok((l[0]+.05)/(l[1]+.05)>=4.5,`${fg}/${bg} >=4.5:1`);}
// Scope guard: only the new lesson, evidence and necessary registry/audit inventory integration.
const integration = new Set(['package.json','src/App.tsx','scripts/audit-final-test.mjs','scripts/audit-lesson-navigation.mjs','scripts/audit-lesson31.mjs','scripts/audit-lesson37.mjs','scripts/audit-lesson38.mjs','scripts/audit-lesson39.mjs','scripts/audit-lesson40.mjs','scripts/audit-render-direction.mjs','scripts/check-english-direction.mjs','scripts/audit-bidi-mixed.mjs']);
const resolveBase=()=>{for(const candidate of ['HEAD','origin/main','main']){try{execFileSync('git',['rev-parse','--verify','--quiet',candidate],{stdio:'ignore'});return candidate;}catch{/* try next */}}return null;};
const base=resolveBase();
const changed = [...new Set([...(base?execFileSync('git',['diff','--name-only',base],{encoding:'utf8'}).split('\n'):[]),...execFileSync('git',['ls-files','--others','--exclude-standard'],{encoding:'utf8'}).split('\n')].filter(Boolean))];
ok(changed.every(path=>integration.has(path)||path.startsWith('src/lessons/lesson41/')||path.startsWith('src/lessons/lesson42/')||path.startsWith('docs/lesson41-')||path.startsWith('docs/lesson42-')||/^scripts\/audit-lesson41(?:-dom|-browser)?\.mjs$/.test(path)||/^scripts\/audit-lesson42(?:-dom|-browser)?\.mjs$/.test(path)||/^scripts\/lesson42-coverage-doc\.mjs$/.test(path)), 'no unrelated modified files');
ok(!changed.some(path=>/^src\/lessons\/lesson(?:[1-9]|[1-3][0-9]|40)\//.test(path)), 'Lessons 1–40 source remains untouched');
console.log(`Lesson 41 static/data audit passed: ${checks} assertions; 41 sections, ${practice.length} practice items, 25 test questions, 26 test fields. Browser interaction/render checks run separately.`);
