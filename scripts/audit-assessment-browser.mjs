import { browser } from './lib/browser.mjs';
import { build } from 'esbuild';
import { readFileSync, readdirSync, rmSync } from 'node:fs';
import assert from 'node:assert/strict';
const imports = [27,28,30,31].map(n=>`import {TestArea${n}, TeacherArea${n}} from './src/lessons/lesson${n}/Lesson${n}';`).join('\n');
const bundle='node_modules/.assessment-browser.js';
await build({stdin:{contents:`
import React,{useState} from 'react';import {createRoot} from 'react-dom/client';import {flushSync} from 'react-dom';
import FinalQuiz from './src/shared/FinalQuiz';import TeachersSpace from './src/shared/TeachersSpace';import {QUIZZES} from './src/shared/quizBank';
import {TEST_27} from './src/lessons/lesson27/data';import {TEST_29} from './src/lessons/lesson29/data';
import FinalTest from './src/shared/finalTest';import {FINAL_TESTS} from './src/shared/finalTestBank';
${imports}
import {TestArea as TestArea29, Teacher as TeacherArea29} from './src/lessons/lesson29/Lesson29';
import TestArea32 from './src/lessons/lesson32/TestArea32';import TeacherArea32 from './src/lessons/lesson32/TeacherArea32';
const tests={27:TestArea27,28:TestArea28,29:TestArea29,30:TestArea30,31:TestArea31,32:TestArea32};
const teachers={27:TeacherArea27,28:TeacherArea28,29:TeacherArea29,30:TeacherArea30,31:TeacherArea31,32:TeacherArea32};
const noop=()=>{};let root;window.events=[];
function Gate({n}){const [unlocked,setUnlocked]=useState(false);const T=teachers[n];return <T unlocked={unlocked} onUnlockChange={setUnlocked} onUnlock={()=>setUnlocked(true)} onGoSolutions={noop}/>}
window.mount=(kind,n)=>{if(root)root.unmount();root=createRoot(document.getElementById('root'));let el;
if(kind==='legacy')el=<FinalQuiz lesson={n}/>;
if(kind==='isolation')el=<><div id="one"><FinalQuiz lesson={1}/></div><div id="two"><FinalQuiz lesson={2}/></div></>;
if(kind==='final')el=<FinalTest lesson={n} questions={FINAL_TESTS[n]}/>;
if(kind==='modern'){const T=tests[n];el=<T onSubmitted={v=>window.events.push(v)} onCheckedChange={v=>window.events.push(v)} onShowSolutions={noop}/>;}
if(kind==='teacher')el=n<27?<TeachersSpace lesson={n} questions={QUIZZES[n]}/>:<Gate n={n}/>;
flushSync(()=>root.render(el));};
window.quizAnswers=n=>QUIZZES[n].map(q=>q.answer); window.modernQuestions=n=>n===27?TEST_27:TEST_29;
`,loader:'tsx',resolveDir:process.cwd()},bundle:true,jsx:'automatic',format:'iife',outfile:bundle});
const js=readFileSync(bundle,'utf8');rmSync(bundle);
const css=readdirSync('dist/assets').filter(f=>f.endsWith('.css')).map(f=>readFileSync(`dist/assets/${f}`,'utf8')).join('');
const b=await browser();let checks=0;
try{
 const page=await b.newPage({viewport:{width:390,height:800}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setContent(`<style>${css}</style><div id="root" dir="rtl"></div>`);await page.addScriptTag({content:js});
 const mount=(kind,n)=>page.evaluate(([k,n])=>window.mount(k,n),[kind,n]);
 // Inventory every main assessment: final action follows the last question in
 // the actual DOM, is displayed in the viewport after scrolling, and has a label.
 for(let n=1;n<=32;n++){
  const kind=n<27?'legacy':'final';await mount(kind,n);
  const action=page.getByRole('button',{name:/تحقق من الإجابات|تصحيح الاختبار/}).last();
  assert.equal(await action.count(),1);await action.scrollIntoViewIfNeeded();assert(await action.isVisible());
  assert(await action.evaluate(el=>{const qs=document.querySelectorAll('[data-quiz-q],[data-ft-q]');return qs.length>=12&&!!(qs[qs.length-1].compareDocumentPosition(el)&Node.DOCUMENT_POSITION_FOLLOWING);}));checks++;
 }
 for(let n=27;n<=32;n++){
  await mount('modern',n);const action=page.getByRole('button',{name:/تحقق من الإجابات|تصحيح الاختبار/}).last();assert.equal(await action.count(),1);await action.scrollIntoViewIfNeeded();assert(await action.isVisible());
  assert(await action.evaluate(el=>{const qs=document.querySelectorAll('[data-test-q]');return qs.length===20&&!!(qs[19].compareDocumentPosition(el)&Node.DOCUMENT_POSITION_FOLLOWING);}));checks++;
 }
 // Independent legacy tests: submit one, preserve the untouched sibling.
 await mount('isolation',1);const before=await page.locator('#two').innerHTML();
 const answers=await page.evaluate(()=>window.quizAnswers(1));
 for(let i=0;i<answers.length;i++)await page.locator(`#one [data-quiz-q="${i+1}"] button`).nth(answers[i]).click();
 assert.equal(await page.locator('#one').getByText(/نتيجتك:/).count(),0);
 const check=page.locator('#one').getByRole('button',{name:/تحقق من الإجابات/});await check.focus();await page.keyboard.press('Enter');
 assert(await page.locator('#one').getByText(/نتيجتك:/).isVisible());assert.equal(await page.locator('#two').innerHTML(),before);
 await page.locator('#one').getByRole('button',{name:/أعد الاختبار/}).click();assert.equal(await page.locator('#one').getByText(/نتيجتك:/).count(),0);assert.equal(await page.locator('#two').innerHTML(),before);checks++;
 // Modern 32 intentionally permits unanswered submission. Still delayed, and
 // resets answer/result AND parent's correction entitlement.
 await mount('modern',32);await page.locator('[data-test-q="1"] input').first().check();
 assert.equal(await page.getByText('✓ صحيح',{exact:true}).count(),0);
 await page.getByRole('button',{name:/تحقق من الإجابات/}).last().click();
 assert(await page.locator('[role="status"]').first().isVisible());assert.equal(await page.evaluate(()=>window.events.at(-1)),true);
 await page.getByRole('button',{name:'إعادة الاختبار',exact:true}).click();assert.equal(await page.evaluate(()=>window.events.at(-1)),false);assert.equal(await page.getByText('✓ صحيح',{exact:true}).count(),0);checks++;
 // Regression paths for the two repaired parent reset callbacks, with all
 // questions answered through their actual controls (including order/match).
 for(const n of [27,29]){
  await mount('modern',n);const questions=await page.evaluate(n=>window.modernQuestions(n),n);
  for(let i=0;i<questions.length;i++){
   const q=questions[i],type=n===27?q.type:q[0],answer=n===27?q.answer:q[3];
   const card=page.locator(`[data-test-q="${i+1}"]`),buttons=card.locator('button');
   if(type==='single'||type==='spot'||type==='tf')await buttons.nth(type==='tf'&&n===27?(answer?0:1):answer).click();
   if(type==='multi')for(const a of answer)await buttons.nth(a).click();
   if(type==='order')for(const a of answer)await buttons.nth(n===27?q.items.indexOf(a):a).click();
   if(type==='match')for(let li=0;li<answer.length;li++)await buttons.nth(li*(n===27?q.right.length:q[2].r.length)+answer[li]).click();
  }
  assert.equal(await page.getByText(/نتيجتك:|النتيجة:/).count(),0);
  await page.getByRole('button',{name:/تحقق من الإجابات/}).last().click();assert.equal(await page.evaluate(()=>window.events.at(-1)),true);
  assert(await page.getByText(/(?:نتيجتك|النتيجة): 20 \/ 20/).isVisible());
  await page.getByRole('button',{name:/إعادة الاختبار/}).last().click();assert.equal(await page.evaluate(()=>window.events.at(-1)),false);
  assert.equal(await page.getByText(/نتيجتك:|النتيجة:/).count(),0);assert(await page.getByRole('button',{name:/تحقق من الإجابات/}).last().isDisabled());checks++;
 }
 // Actual gated teacher components, not a detached key. Invalid password must
 // never mount a key. Valid password gives independent category navigation.
 for(const n of [1,27,28,29,30,31,32]){
  await mount('teacher',n);assert.equal(await page.locator('[data-ft-key],[data-ts-q],[data-teacher-workspace],[data-teacher-source]').count(),0);
  const pw=page.locator('input[type=password]');await pw.fill('wrong');
  const unlock=page.getByRole('button',{name:/فتح|دخول/}).first();await unlock.click();assert.equal(await page.locator('[data-teacher-workspace],[data-teacher-source]').count(),0);
  await pw.fill('somer173');await unlock.click();await page.locator('[data-teacher-workspace]').waitFor();
  assert.equal(await page.locator('[data-teacher-workspace] nav').count(),1);
  const nav=page.locator('[data-teacher-workspace] nav');const key=nav.getByRole('button',{name:'مفتاح الاختبار النهائي',exact:true});await key.focus();await page.keyboard.press('Enter');
  const rows=page.locator(n<27?'[data-ts-q]':'[data-ft-key-item]');assert.equal(await rows.count(),n<27?(await page.evaluate(n=>window.quizAnswers(n),n)).length:15);assert(await rows.first().isVisible());
  const details=rows.first().locator('details');assert.equal(await details.getAttribute('open'),null);await details.locator('summary').click();assert.notEqual(await details.getAttribute('open'),null);
  if(n>=27){await nav.getByRole('button',{name:/مفتاح منطقة الاختبارات/}).click();assert.equal(await rows.first().isVisible(),false);const reasons=page.getByRole('region',{name:'مفتاح منطقة الاختبارات — 20 سؤالًا',exact:true}).locator('details');assert.equal(await reasons.count(),20);assert.equal(await reasons.first().getAttribute('open'),null);await reasons.first().locator('summary').click();assert.notEqual(await reasons.first().getAttribute('open'),null);}
  if([27,28,30,31,32].includes(n)){
   const source=JSON.parse(readFileSync('docs/audits/teacher-source-coverage.json','utf8')).lessons.find(l=>l.lesson===n);
   await nav.getByRole('button',{name:/حلول (الأنشطة|تمارين المصدر|أنشطة المصدر)/}).click();
   const area=page.locator(`[data-teacher-source="${n}"]`);
   for(let gi=0;gi<source.groups.length;gi++){
    await area.getByLabel('التمرين / مرجع المصدر').selectOption(String(gi));
    assert.equal(await area.locator('[data-source-item]').count(),source.groups[gi].items.length);
    for(const q of source.groups[gi].items){
     await area.getByLabel('رقم البند كما ورد في مرجع المعلم').selectOption(q.id);
     assert.equal(await area.locator('[data-source-item]').count(),1);
     assert((await area.locator('[data-source-item]').textContent()).includes(q.number));
     const item=area.locator('[data-source-item]');
     if(q.segments.length>1){const disclosure=item.locator('summary');await disclosure.focus();await page.keyboard.press('Enter');assert.notEqual(await item.locator('details').getAttribute('open'),null);}
     const text=await item.textContent();for(const segment of q.segments)assert(text.includes(segment));
    }
    const original=area.locator('details').filter({has:page.locator('summary',{hasText:'مرجع المعلم الكامل'})});
    await original.locator('summary').click();
    assert.deepEqual(await original.locator('[data-source-original]').allTextContents(),source.groups[gi].originalLines);
   }
   await area.getByLabel('رقم البند كما ورد في مرجع المعلم').selectOption('');
   await area.getByLabel('بحث داخل الإجابات').fill('no-source-item-should-match-this');
   assert.equal(await area.locator('[data-source-item]').count(),0);
   await area.getByLabel('التمرين / مرجع المصدر').selectOption('0');
   assert.equal(await area.getByLabel('بحث داخل الإجابات').inputValue(),'');
   assert.equal(await area.locator('[data-source-item]').count(),source.groups[0].items.length);
   checks++;
  }
  await nav.getByRole('button',{name:'فهرس الدرس',exact:true}).click();assert.equal(await rows.first().isVisible(),false);
  assert(await page.getByRole('link',{name:'قائمة الدروس'}).isVisible());checks++;
 }
 assert.deepEqual(errors,[]);console.log(`PASS: ${checks} browser scenarios; all 38 primary assessments inventoried; independent submit/reset; delayed modern correction; 7 teacher gates and keyboard/category navigation.`);
}finally{await b.close();}
