import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {readFileSync,mkdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
mkdirSync('node_modules/.lesson55-audit',{recursive:true});
await build({stdin:{contents:`export * from './src/lessons/lesson55/content55.ts'; export * from './src/lessons/lesson55/practice55.ts'; export * from './src/lessons/lesson55/test55.ts'; export * from './src/lessons/lesson55/testKey55.ts';`,resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',outfile:'node_modules/.lesson55-audit/data.mjs',logLevel:'silent'});
const m=await import(pathToFileURL(process.cwd()+'/node_modules/.lesson55-audit/data.mjs'));
assert.deepEqual(m.practices.map(p=>p.items.length),[5,8,6,6,5,6,5,5]);
assert.equal(m.practices.flatMap(p=>p.items).length,46);
assert.equal(m.questions.length,25);
assert.deepEqual([...new Set(m.questions.map(q=>q.section))].map(s=>m.questions.filter(q=>q.section===s).length),[10,5,5,5]);
assert.equal(m.solutions.length,25);
assert.equal(m.dialogue.length,8);assert.equal(m.dialogueQA.length,5);assert.equal(m.readingQA.length,6);assert.equal(m.vocabulary.length,11);assert.equal(m.speaking.length,5);assert.equal(m.mistakes.length,5);
assert.ok(m.practices.every(p=>p.items.every(i=>i.prompt&&i.answer)));
// Representative source anchors, independent of the slide count. These complement the
// detailed manual coverage ledger; they do not prove verbatim coverage on their own.
const expectedExamples = {
 'review':['If you heat water to 100°C, it boils.','If I study hard, I will pass the exam.','If I had more money, I would buy a new car.','If I had studied harder, I would have passed the exam.'],
 'meaning':['If I had studied medicine, I would be a doctor now.','If I had studied medicine, I would have become a doctor.'],
 'past-now':['If I had studied harder, I would have a better job now.','If she had learned English, she would work for an international company now.','If he had taken the medicine, he would feel better now.','If we had bought that house, we would live near the beach now.','If I had accepted the job, I would earn more money now.','If they had moved to London, their children would speak English fluently now.'],
 'why-perfect':['If I studied medicine, I would be a doctor.','If I studied medicine, I would become a doctor.','If I had studied medicine, I would be a doctor now.'],
 'now-past':["If I were more careful, I wouldn't have made that mistake yesterday.","If he were more responsible, he wouldn't have forgotten the meeting yesterday.",'If she spoke English fluently, she would have understood the conversation yesterday.',"If I weren't so shy, I would have talked to her at the party.",'If they lived closer, they would have visited us last weekend.','If he knew how to drive, he would have taken us to the airport yesterday.'],
 'compare':['If I had more time, I would learn Spanish.','If I had studied harder, I would have passed the exam.','If I had studied harder, I would have a better career now.',"If I were more organized, I wouldn't have missed the appointment yesterday.",'If I had saved money, I would own a car now.','If I were richer, I would have bought that car last year.'],
 'were':['If I were rich, I would travel around the world.',"If she were more patient, she wouldn't have argued with him yesterday.",'If he were here, he would have helped us.',"If I was more careful, I wouldn't have made that mistake."],
 'negative':["If I hadn't missed the bus, I would be at work now.","If she had studied harder, she wouldn't be struggling now.","If he hadn't been so careless, he wouldn't be in trouble now.","If I had gone to bed earlier, I wouldn't feel tired now.","If they were more careful, they wouldn't have lost the documents.","If we hadn't taken the wrong road, we wouldn't be lost now."],
 'questions':['What would you do now if you had accepted that job?','Where would you live now if your family had moved abroad?','Would you have passed the exam if you were more focused?','Would she be happier now if she had chosen a different career?','What would have happened yesterday if you were more careful?'],
 'modals':['If I were more confident, I could have spoken in front of the audience yesterday.','If she had taken the opportunity, she might be successful now.','If he were more experienced, he could have solved the problem last night.']
};
for(const [id,examples] of Object.entries(expectedExamples)) {
 const page=m.pages.find(p=>p.id===id);assert.ok(page,`missing ${id}`);
 assert.deepEqual(page.pairs.map(p=>p.en),examples,`${id}: examples`);
 assert.ok(page.pairs.every(p=>p.ar),`${id}: Arabic translations`);
}
const corpus=JSON.stringify(m.pages);
for(const key of ['had + V3','would have + V3','أقل شيوعًا','السياق','have فعل أساسي','الأسلوب الرسمي','المحادثات غير الرسمية'])assert.ok(corpus.includes(key),`missing explanation: ${key}`);
assert.ok(m.dialogue.every(p=>p.en&&p.ar));assert.equal(m.reading.length,8);
assert.ok(m.questions.every((q,i)=>q.id===i+1&&q.prompt&&m.solutions[i]?.length===2));
assert.ok(m.questions.filter(q=>q.id<=10).every((q,i)=>q.options.length===4&&q.options.includes(m.solutions[i][0])));
assert.ok(m.questions.filter(q=>q.id>=21).every((q,i)=>q.options.length===4&&q.options.includes(m.solutions[i+20][0])));
assert.ok(m.practices.filter(p=>p.items.some(i=>i.options)).every(p=>p.items.every(i=>i.options.length===4&&i.options.includes(i.answer))));
const expectedPracticePrompts = [
 ['If I had studied harder, I ______ a better job now.','If she were more careful, she ______ that mistake yesterday.','If they had moved to Canada, they ______ there now.','If I were more confident, I ______ at the meeting last week.','If he had taken the job, he ______ more money now.'],
 ['If I had learned French, I ______ (work) in Paris now.',"If he ______ (be) more patient, he wouldn't have argued with his brother yesterday.",'If we had bought the tickets earlier, we ______ (be) at the concert now.','If she ______ (know) how to swim, she would have joined us at the beach last week.','If they had invested their money, they ______ (be) richer today.',"If I weren't so shy, I ______ (talk) to the teacher yesterday.",'If he had accepted the offer, he ______ (live) in Dubai now.',"If you were more organized, you ______ (not / forget) the appointment last Monday."],
 ['If I had saved money, I would own a house now.','If I were taller, I would play basketball.','If she had studied, she would have passed.',"If he were more careful, he wouldn't have broken the glass yesterday.",'If we had left earlier, we would have arrived on time.','If I had learned to drive, I would drive to work now.'],
 ['If I would have studied medicine, I would be a doctor now.','If she had went to university, she would have a better career now.',"If he were more careful, he wouldn't make that mistake yesterday.",'If they had bought a bigger house, they would have more space now.','If I am more confident, I would have spoken yesterday.','If she had taken the train, she would be here now.'],
 ["I didn't study English in the past. I cannot speak it fluently now. ابدأ بـ If I...",'He is not careful. He broke his phone yesterday. ابدأ بـ If he...',"She didn't accept the job. She doesn't work in London now. ابدأ بـ If she...","I am very shy. I didn't introduce myself at the conference. ابدأ بـ If I...","They didn't save enough money. They cannot buy a house now. ابدأ بـ If they..."],
 ['لو كنت قد تعلمت البرمجة، لكنت أعمل في شركة تقنية الآن.','لو كانت أكثر صبرًا، لما صرخت على طفلها أمس.','لو كنا قد حجزنا الفندق مبكرًا، لكنا نقيم فيه الآن.','لو لم أكن خجولًا، لكنت تحدثت أمام الجمهور الأسبوع الماضي.','لو كان قد قبل العرض، لكان يعيش في ألمانيا الآن.','لو كنت قد استيقظت مبكرًا، لما كنت متعبًا الآن.'],
 ['If I had practiced every day, I ______ better at English now.','If she were more responsible, she ______ the project last month.','If he had gone to bed earlier, he ______ tired now.','If I knew the answer, I ______ you yesterday.','If they had bought a car, they ______ able to travel more easily now.'],
 ['If I had chosen a different school, I would...','If I were more confident, I would have...','If I had started learning English earlier, I would...',"If I were more organized, I wouldn't have...",'If my family had moved to another country, I would...']
];
assert.deepEqual(m.practices.map(p=>p.items.map(i=>i.prompt)), expectedPracticePrompts, 'all 46 source practice prompts');
const expectedTestPrompts = [
 'If I had studied harder, I ______ a doctor now.',"If he were more careful, he ______ his phone yesterday.",'If she had accepted the offer, she ______ in London now.','If I were more confident, I ______ at the event last night.','If they had saved more money, they ______ a bigger house now.','If he knew how to swim, he ______ us at the beach yesterday.','If I had taken the medicine, I ______ better now.','If she were more patient, she ______ the argument yesterday.','If we had left earlier, we ______ at home now.',"If I weren't afraid of public speaking, I ______ at the conference last week.",
 'If I had learned Spanish, I ______ (speak) it fluently now.',"If he ______ (be) more responsible, he wouldn't have forgotten the meeting yesterday.",'If they had invested their money, they ______ (be) richer now.','If she ______ (know) how to drive, she would have taken us to the airport.','If I had gone to sleep earlier, I ______ (not / be) tired now.',
 'If I would have studied harder, I would have a better job now.','If he had went abroad, he would speak English fluently now.',"If she were more careful, she wouldn't lose her keys yesterday.",'If I am more confident, I would have applied for the job last month.','If they had bought the house, they would have a garden now.',
 'If I had studied law, I would be a lawyer now.','If I were richer, I would travel around the world.','If she had called me, I would have helped her.',"If he were more polite, he wouldn't have offended his teacher yesterday.",'If we had bought the tickets earlier, we would be at the stadium now.'
];
assert.deepEqual(m.questions.map(q=>q.prompt), expectedTestPrompts, 'all 25 source test prompts');
const expectedTestOptions = [
 ['A. would be','B. would have been','C. am','D. will be'],["A. wouldn't break","B. wouldn't have broken","C. won't break","D. didn't break"],['A. would work','B. would have worked','C. worked','D. will work'],['A. would speak','B. would have spoken','C. will speak','D. speak'],['A. would own','B. would have owned','C. owned','D. will own'],['A. would join','B. would have joined','C. joins','D. will join'],['A. would feel','B. would have felt','C. felt','D. will feel'],['A. would avoid','B. would have avoided','C. avoids','D. will avoid'],['A. would be','B. would have been','C. are','D. were'],['A. would present','B. would have presented','C. present','D. will present']
];
assert.deepEqual(m.questions.slice(0,10).map(q=>q.options),expectedTestOptions,'all test multiple choice options');
assert.deepEqual(m.vocabulary.map(([en])=>en),['look back','opportunity','abroad','hometown','wonder','adventurous','ruin','relationships','path','explore','create']);
assert.ok(corpus.includes('would be + verb-ing'), 'continuous present result needed for practice 6');
const ts=readFileSync('src/lessons/lesson55/Lesson55.tsx','utf8');
assert.match(ts,/import Lesson1Shell from/);assert.match(ts,/import \{SlideFrame\} from '\.\.\/lesson1\/Lesson1'/);assert.match(ts,/import\('\.\/testKey55'\)/);assert.match(ts,/#\/lesson\/56/);
const css=readFileSync('src/lessons/lesson55/lesson55.css','utf8');assert.ok(css.split('\n').every(line=>!line.trim()||line.trim().startsWith('.lesson55')));
console.log('Lesson 55 static audit passed: 8 practices, 46 prompts, final 10/5/5/5, dialogue, reading, vocabulary, shell, CSS scope.');
