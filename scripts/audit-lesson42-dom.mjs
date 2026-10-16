import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { analyzeHtml } from './lib/bidi-sim.mjs';
const dom=new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>',{url:'http://localhost/',pretendToBeVisual:true});
for(const key of ['window','document','navigator','HTMLElement','HTMLInputElement','HTMLTextAreaElement','HTMLSelectElement','Node','Event','MouseEvent','KeyboardEvent','MutationObserver','getComputedStyle'])Object.defineProperty(globalThis,key,{value:dom.window[key],configurable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
mkdirSync('node_modules/.lesson42-audit',{recursive:true});
await build({stdin:{contents:`export {default as Lesson42} from './src/lessons/lesson42/Lesson42';export {Text42} from './src/lessons/lesson42/kit42';`,resolveDir:process.cwd(),loader:'tsx'},outfile:'node_modules/.lesson42-audit/ui.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',loader:{'.css':'empty'}});
const {Lesson42,Text42}=await import('../node_modules/.lesson42-audit/ui.mjs');
const React=await import('react');const {createRoot}=await import('react-dom/client');const {renderToStaticMarkup}=await import('react-dom/server');const {act}=React;
let checks=0;const ok=(c,m)=>{checks++;assert.ok(c,m);};
for(const text of ['She can swim.',"He couldn't ride a bicycle.",'I will be able to finish the project.',"Can you help me, please?","Could you repeat the question?",'It could rain tomorrow.','We were able to finish it yesterday.']){
 for(const content of [text,`لاحظ المثال: ${text} — الفعل يبقى V1.`]){
  const html=renderToStaticMarkup(React.createElement('div',{dir:'rtl'},React.createElement(Text42,{text:content})));
  ok(analyzeHtml(html).every(p=>p.violations.length===0),`BIDI: ${content}`);
  ok(html.includes('dir="ltr"'),'explicit LTR isolation');
 }
}
const root=createRoot(document.getElementById('root'));
await act(async()=>root.render(React.createElement(Lesson42)));
const all=selector=>[...document.querySelectorAll(selector)];
async function click(element){ok(!!element,'click target exists');await act(async()=>element.click());}
async function change(element,value){await act(async()=>{const proto=element.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:element.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(element,value);element.dispatchEvent(new Event(element.tagName==='SELECT'?'change':'input',{bubbles:true}));});}
const byText=(text)=>all('button').find(button=>button.textContent===text);
const step=()=>document.querySelector('.step42');
const next=()=>click(document.querySelector('.bottomNav42 button:last-child'));
ok(all('.areas42 button')[2].disabled,'solutions initially locked');ok(!document.querySelector('[data-area=solutions]'),'no hidden solutions DOM');
const section41Key=line=>{const root42=document.querySelector('.lesson42');return root42.textContent.includes(line);};
await click(all('.dialGroup42')[1].querySelectorAll('button')[1]);ok(document.querySelector('.formula42').textContent.startsWith('I could'),'control panel switches CAN→COULD');
for(let i=0;i<=44;i++){
 const current=step();ok(current.dataset.sourceSection===(i?'s'+String(i).padStart(2,'0'):'cover'),`step ${i} maps to its source section`);
 for(const el of all('.lesson42 [aria-controls],.lesson42 [aria-labelledby],.lesson42 [aria-describedby]'))for(const attr of ['aria-controls','aria-labelledby','aria-describedby'])for(const id of (el.getAttribute(attr)||'').split(/\s+/).filter(Boolean))ok(document.getElementById(id),`ARIA resolves ${id}`);
 for(const el of all('.lesson42 button'))ok(el.textContent.trim()||el.getAttribute('aria-label'),'button accessible name');
 for(const el of all('.lesson42 textarea,.lesson42 select,.lesson42 input'))ok(el.closest('label')||el.getAttribute('aria-label')||el.labels?.length,'form control accessible name');
 if(i===3){const card=document.querySelector('[data-exercise-id="rule-1"]');await click(card.querySelectorAll('button')[0]);ok(!card.querySelector('.feedback42'),'no feedback before checking');await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42'),'rule check feedback after action');}
 if(i===4){const card=document.querySelector('[data-exercise-id="build-1"]');await click(card.querySelectorAll('button')[0]);await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42.error'),'builder names the broken rule');}
 if(i===8){const card=document.querySelector('[data-exercise-id="neg-can"]');await change(card.querySelector('select'),'1');await click(card.querySelector('.primary42'));ok(card.querySelector('.formula42').textContent.includes("can't"),'negative transformation');}
 if(i===9){const card=document.querySelector('[data-exercise-id="q-can"]');await change(card.querySelector('select'),'2');await click(card.querySelectorAll('.primary42')[1]);ok(card.querySelector('.formula42').textContent.startsWith('Can'),'question transformation inverts order');}
 if(i===17){const card=document.querySelector('[data-exercise-id="success-2"]');await click(card.querySelectorAll('button')[1]);await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42'),'past ability vs specific success distinguishes forms');}
 if(i===20){const card=document.querySelector('[data-exercise-id="studio-permission-1"]');await click(card.querySelectorAll('button')[1]);await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42'),'politeness studio scores the choice');}
 if(i===31){const card=document.querySelector('[data-exercise-id="repair-1"]');await change(card.querySelector('select'),'إضافة s إلى CAN/COULD');await change(card.querySelector('textarea'),'She can swim.');ok(card.querySelector('button').disabled===false,'repair unlocks with both inputs');await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42').textContent.includes('She can swim.'),'repair reveals the source key only after the attempt');}
 if(i===32){const card=document.querySelector('[data-exercise-id="detective-1-1"]');await click(card.querySelectorAll('button')[0]);await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42'),'context detective checks the chosen function');}
 if(i===34){const card=document.querySelector('[data-practice-id="p34-1"]');ok(!card.querySelector('.feedback42'),'practice source answer hidden before the attempt');ok(card.querySelector('button').disabled,'practice button disabled while empty');await change(card.querySelector('textarea'),'can — القدرة في الحاضر');await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42'),'practice comparison opens after the attempt');ok(card.querySelector('.feedback42').textContent.includes('can'),'practice shows the source key');}
 if(i===37){const card=document.querySelector('[data-practice-id="p37-3"]');await change(card.querySelector('select'),'B. was able to');ok(card.querySelector('button').disabled,'able-to practice still wants the reason');await change(card.querySelectorAll('textarea')[0],'نجاح في موقف ماضٍ محدد');await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42'),'able-to practice compares both options');}
 if(i===38){const card=document.querySelector('[data-practice-id="p38-7"]');ok(card.querySelectorAll('textarea').length===2,'detective repair asks for repair and reason');await change(card.querySelectorAll('textarea')[0],'I will be able to finish the project tomorrow.');ok(card.querySelector('button').disabled,'repair reason still required');await change(card.querySelectorAll('textarea')[1],'will can → will be able to');await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42'),'detective repair reveals source key after attempt');}
 if(i===39){ok(document.body.textContent.includes('The Young Inventor'),'reading challenge text renders');const card=document.querySelector('[data-practice-id="p39-1"]');ok(!card.querySelector('.feedback42'),'comprehension answer hidden before the attempt');await change(card.querySelector('textarea'),'He is thirteen years old.');await click(card.querySelector('.primary42'));ok(card.querySelector('.feedback42'),'comprehension comparison opens after the attempt');}
 if(i===40)ok(byText('ابدأ الاختبار النهائي'),'test entry point');
 if(i===42){const card=document.querySelector('.checklist42');ok(card.querySelectorAll('li').length===10,'writing checklist has ten items');ok(document.body.textContent.includes('عدّ آلي تقريبي')&&document.body.textContent.includes('ليس تقييمًا لقواعد كتابتك'),'writing counter labelled honestly');}
 if(i===41)ok(!section41Key('A — can.'),'source §41 key absent from the student step');
 if(i<44)await next();
}
await click(all('.areas42 button')[1]);ok(all('[data-question-id]').length===25,'25 questions, no duplicated practice');ok(byText('تسليم الاختبار النهائي').disabled,'incomplete submit disabled');
for(const fieldset of all('[data-question-id]')){
 const radio=fieldset.querySelector('input[type=radio]');if(radio)await click(radio);else for(const input of fieldset.querySelectorAll('textarea'))await change(input,'Attempt');
}
ok(!byText('تسليم الاختبار النهائي').disabled,'completed submit enabled');await click(byText('تسليم الاختبار النهائي'));await act(async()=>{await new Promise(resolve=>setTimeout(resolve,50));});ok(document.querySelector('[data-area=solutions]'),'solutions mounted only after submission');ok(document.querySelector('[data-area=solutions]').textContent.includes('A — can'),'detailed key shown after submission');
await click(all('.areas42 button')[1]);await click(byText('إعادة الاختبار ومسح الإجابات'));ok(all('.areas42 button')[2].disabled,'reset relocks');ok(all('textarea').every(el=>!el.value),'reset clears text');ok(all('input:checked').length===0,'reset clears radios');
await click(all('.areas42 button')[3]);ok(!document.querySelector('[data-teacher-guide]'),'guide absent before password');await change(document.querySelector('input[type=password]'),'incorrect');await click(byText('فتح مساحة المعلم'));ok(document.querySelector('[role=alert]'),'incorrect password feedback');
await change(document.querySelector('input[type=password]'),'somer173');await click(byText('فتح مساحة المعلم'));await act(async()=>{await new Promise(resolve=>setTimeout(resolve,50));});ok(document.querySelector('[data-teacher-guide]'),'teacher guide opens with the existing password');
await act(async()=>root.unmount());
console.log(`Lesson 42 DOM/BIDI audit passed: ${checks} assertions; 45-step navigation, labels/ARIA, eight interactive engines, attempt-gated practice keys, complete-test submission/reset, locked teacher access and fourteen targeted BIDI cases.`);
