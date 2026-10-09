import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {build} from 'esbuild';
import {readFileSync,writeFileSync,readdirSync,rmSync} from 'node:fs';
import assert from 'node:assert/strict';
import {browser} from './lib/browser.mjs';
const contracts={
 'l02-pronoun-choice':'delayed-choice',
 'l02-be-choice':'delayed-choice',
 'l02-correction-reveal':'explicit-guided-reveal',
 'l02-be-completion':'delayed-choice',
 'l02-pronoun-reveal':'explicit-guided-reveal',
};
const file='node_modules/.l2-activities.js';
await build({stdin:{resolveDir:process.cwd(),loader:'tsx',contents:`
import React from 'react';import {createRoot} from 'react-dom/client';import {flushSync} from 'react-dom';
import {PreviousExerciseSlide} from 'previous-lesson2';import Lesson2,{ExerciseSlide} from './src/lessons/lesson2/Lesson2';import {EXERCISES} from './src/lessons/lesson2/data';
import TeacherArea2 from './src/lessons/lesson2/TeacherArea2';import {LESSON2_REFERENCES} from './src/lessons/lesson2/teacherReference';
import FinalQuiz from './src/shared/FinalQuiz';
let root;window.mountPrevious=id=>{if(root)root.unmount();root=createRoot(document.getElementById('root'));const ex=EXERCISES.find(e=>e.id===id);flushSync(()=>root.render(<div id="previous"><PreviousExerciseSlide ex={ex} idx={0}/></div>));};window.exercises=EXERCISES;window.references=LESSON2_REFERENCES;
window.mount=(id)=>{if(root)root.unmount();root=createRoot(document.getElementById('root'));const ex=EXERCISES.find(e=>e.id===id);
flushSync(()=>root.render(id==='lesson'?<Lesson2 onExit={()=>{}}/>:ex?<><div id="one"><ExerciseSlide ex={ex} idx={0}/></div><div id="two"><ExerciseSlide ex={ex} idx={0}/></div></>:<FinalQuiz lesson={2} teacherSource={<TeacherArea2/>}/>));};
`},plugins:[{name:'previous-source-negative-control',setup(build){build.onResolve({filter:/^previous-lesson2$/},()=>({path:'previous-lesson2',namespace:'previous-source'}));build.onLoad({filter:/.*/,namespace:'previous-source'},()=>({contents:execFileSync('git',['show','59ba597:src/lessons/lesson2/Lesson2.tsx'],{encoding:'utf8'})+'\nexport {ExerciseSlide as PreviousExerciseSlide};',loader:'tsx',resolveDir:resolve('src/lessons/lesson2')}));}}],bundle:true,format:'iife',jsx:'automatic',outfile:file});
const js=readFileSync(file,'utf8');rmSync(file);
const css=readdirSync('dist/assets').filter(f=>f.endsWith('.css')).map(f=>readFileSync('dist/assets/'+f,'utf8')).join('\n');
const b=await browser(),results=[];
try{
 const page=await b.newPage({viewport:{width:390,height:800}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setContent(`<style>${css}</style><div id="root" dir="rtl"></div>`);await page.addScriptTag({content:js});
 const exercises=await page.evaluate(()=>window.exercises);
 assert.deepEqual(exercises.map(e=>e.id).sort(),Object.keys(contracts).sort(),'New/removed activity requires its own explicit behavioral contract');
 const negativeControls=[];
 for(const ex of exercises.filter(e=>contracts[e.id]==='delayed-choice')){
  await page.evaluate(id=>window.mountPrevious(id),ex.id);const old=page.locator('#previous');
  assert.equal(await old.getByRole('button',{name:'تحقق من الإجابات',exact:true}).count(),0);
  await old.locator('button').first().click();assert(await old.locator('button.border-emerald-400').count()>0,'59ba597 exposes correctness immediately');
  negativeControls.push({id:ex.id,baseline:'59ba597',result:'pre-submit correctness leak reproduced'});
 }
 for(const ex of exercises){
  await page.evaluate(id=>window.mount(id),ex.id);const area=page.locator('#one'),sibling=await page.locator('#two').innerHTML();
  const cards=area.locator('[data-activity-question]');assert.equal(await cards.count(),ex.questions.length);
  const reset=area.getByRole('button',{name:'إعادة التمرين',exact:true});assert.equal(await reset.count(),1);
  const unchanged=async()=>assert.equal(await page.locator('#two').innerHTML(),sibling,'Sibling isolation: '+ex.id);
  if(contracts[ex.id]==='delayed-choice'){
   const check=area.getByRole('button',{name:'تحقق من الإجابات',exact:true});assert.equal(await check.count(),1);
   assert(await check.isDisabled());await check.evaluate(el=>el.click());assert.equal(await area.getByRole('status').count(),0);
   assert(await check.evaluate(el=>!!([...document.querySelectorAll('#one [data-activity-question]')].at(-1)?.compareDocumentPosition(el)&Node.DOCUMENT_POSITION_FOLLOWING)));
   const neutral=async()=>{assert.equal(await area.getByRole('status').count(),0);assert.equal(await cards.locator('.border-emerald-400,.border-rose-400').count(),0);assert(!/✓|✕|النتيجة/.test(await area.ariaSnapshot()));};
   await neutral();
   for(let i=0;i<ex.questions.length;i++){
    const q=ex.questions[i],options=ex.type==='mc'?q.options:ex.options,answer=ex.type==='mc'?q.answer:options.indexOf(q.answer);
    const button=cards.nth(i).getByRole('button',{name:`${i+1}: ${options[answer]}`,exact:true});await button.focus();await page.keyboard.press(i===0?'Space':'Enter');
    assert.equal(await button.getAttribute('aria-pressed'),'true');await neutral();
    if(i<ex.questions.length-1)assert(await check.isDisabled());await unchanged();
   }
   await check.scrollIntoViewIfNeeded();assert(await check.isVisible());await check.focus();await page.keyboard.press('Enter');
   assert((await area.getByRole('status').textContent()).includes(`${ex.questions.length} / ${ex.questions.length}`));
   assert.equal(await cards.locator('button:not(:disabled)').count(),0);const submitted=await area.innerHTML();await check.evaluate(el=>el.click());assert.equal(await area.innerHTML(),submitted);await unchanged();
   await reset.focus();await page.keyboard.press('Enter');await neutral();assert.equal(await area.locator('[aria-pressed="true"]').count(),0);assert(await check.isDisabled());await unchanged();
   // A second full attempt with every answer wrong proves reset and grading,
   // not merely successful selection of the answer bank's correct choices.
   for(let i=0;i<ex.questions.length;i++){const q=ex.questions[i],opts=ex.type==='mc'?q.options:ex.options,a=ex.type==='mc'?q.answer:opts.indexOf(q.answer);await cards.nth(i).locator('button').nth((a+1)%opts.length).click();}
   await neutral();await check.click();assert((await area.getByRole('status').textContent()).includes(`0 / ${ex.questions.length}`));await reset.click();await neutral();await unchanged();
  }else{
   assert.equal(await area.getByRole('button',{name:'تحقق من الإجابات',exact:true}).count(),0,'Guided source explicitly requests reveal, not a graded submit');
   for(let i=0;i<ex.questions.length;i++){
    const card=cards.nth(i),answer=ex.type==='fix'?ex.questions[i].correct:ex.questions[i].answer;
    assert(!(await card.textContent()).includes(answer));const reveal=card.getByRole('button',{name:`كشف إجابة البند ${i+1}`,exact:true});await reveal.focus();await page.keyboard.press('Enter');assert((await card.textContent()).includes(answer));
    for(let j=i+1;j<ex.questions.length;j++)assert.equal(await cards.nth(j).locator('button').count(),1);await unchanged();
   }
   await reset.focus();await page.keyboard.press('Enter');assert.equal(await cards.locator('button').count(),ex.questions.length);await cards.first().locator('button').click();await reset.click();assert.equal(await cards.locator('button').count(),ex.questions.length);await unchanged();
  }
  results.push({id:ex.id,type:ex.type,policy:contracts[ex.id],questions:ex.questions.length,status:'verified',coverage:['empty','partial','complete','keyboard including real lesson shell Space activation','accessible button names','repeat/reset','sibling isolation','feedback timing'],submission:contracts[ex.id]==='delayed-choice'?'one bottom check; disabled until complete':'not applicable: source-directed guided reveal',parentEntitlement:'not applicable: embedded exercise grants no solution entitlement'});
 }
 // Repeat native Space activation inside the real lesson shell: its global
 // shortcut previously swallowed Space and navigated away from focused controls.
 await page.evaluate(()=>window.mount('lesson'));
 for(const ex of exercises){
  for(let step=0;step<80&&await page.locator(`[data-activity="${ex.id}"]`).count()===0;step++)await page.getByRole('button',{name:/التالي/}).click();
  const activity=page.locator(`[data-activity="${ex.id}"]`);assert.equal(await activity.count(),1);
  const first=activity.locator('[data-activity-question]').first().locator('button').first();await first.focus();await page.keyboard.press('Space');
  assert.equal(await activity.count(),1,'Focused Space must not navigate away');
  if(contracts[ex.id]==='delayed-choice')assert.equal(await first.getAttribute('aria-pressed'),'true');
  else assert.equal(await activity.locator('[data-activity-question]').first().locator('button').count(),0);
  const reset=activity.getByRole('button',{name:'إعادة التمرين',exact:true});await reset.focus();await page.keyboard.press('Space');
  assert.equal(await activity.count(),1);assert.equal(await activity.locator('[aria-pressed="true"]').count(),0);assert.equal(await activity.getByRole('status').count(),0);
  await page.getByRole('button',{name:/التالي/}).click();
 }
 await page.evaluate(()=>window.mount('teacher'));assert.equal(await page.locator('[data-lesson2-source]').count(),0);
 await page.getByLabel('كلمة مرور فضاء المعلم').fill('wrong');await page.getByRole('button',{name:/فتح المساحة/}).click();assert.equal(await page.locator('[data-lesson2-source]').count(),0);
 await page.getByLabel('كلمة مرور فضاء المعلم').fill('somer173');await page.getByRole('button',{name:/فتح المساحة/}).click();await page.locator('nav').getByRole('button',{name:'حلول تمارين الدرس',exact:true}).click();
 const references=await page.evaluate(()=>window.references);assert.equal(references.length,exercises.reduce((n,e)=>n+e.questions.length,0));
 for(const ref of references){
  await page.getByLabel('التمرين والبند',{exact:true}).selectOption(ref.id);const item=page.locator('[data-source-question]');assert.equal(await item.getAttribute('data-source-question'),ref.id);assert((await item.textContent()).includes(ref.answer));
  assert.equal(await item.locator('details').getAttribute('open'),null);await item.locator('summary').focus();await page.keyboard.press('Enter');
  for(const [field,value] of Object.entries(ref.original))assert.equal(await item.locator(`[data-source-field="${field}"]`).textContent(),Array.isArray(value)?value.join(' | '):String(value));
 }
 assert.deepEqual(errors,[]);
 writeFileSync('docs/audits/lesson2-behavior.json',JSON.stringify({scope:'Five named source exercise instances only; NOT whole-course certification',browser:b.version(),negativeControls,results,teacher:{mappedCanonicalQuestions:references.length,totalCanonicalQuestions:references.length,externalTextbookMappingsVerified:0,sourcePagesKnown:0},references},null,2)+'\n');
 console.log(`PASS: ${results.length}/${exercises.length} Lesson 2 exercise instances, ${references.length} questions; ${references.length}/${references.length} gated canonical question references. Whole-course coverage remains incomplete.`);
}finally{await b.close();}
