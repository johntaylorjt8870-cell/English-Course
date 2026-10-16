import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { analyzeHtml } from './lib/bidi-sim.mjs';
const dom=new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>',{url:'http://localhost/',pretendToBeVisual:true});
for(const key of ['window','document','navigator','HTMLElement','HTMLInputElement','HTMLTextAreaElement','HTMLSelectElement','Node','Event','MouseEvent','KeyboardEvent','MutationObserver','getComputedStyle'])Object.defineProperty(globalThis,key,{value:dom.window[key],configurable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
mkdirSync('node_modules/.lesson43-audit',{recursive:true});
await build({stdin:{contents:`export {default as Lesson43} from './src/lessons/lesson43/Lesson43';export {Text43} from './src/lessons/lesson43/kit43';`,resolveDir:process.cwd(),loader:'tsx'},outfile:'node_modules/.lesson43-audit/ui.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',loader:{'.css':'empty'}});
const {Lesson43,Text43}=await import('../node_modules/.lesson43-audit/ui.mjs');
const React=await import('react');const {createRoot}=await import('react-dom/client');const {renderToStaticMarkup}=await import('react-dom/server');const {act}=React;
let checks=0;const ok=(c,m)=>{checks++;assert.ok(c,m);};
for(const text of ['She may come tomorrow.',"He might have forgotten the keys.",'May I ask a question?','Maybe she will join us later.','She may be at home now.','It might rain tomorrow.','May I remind everyone about the quiz?','They might not visit us.']){
 for(const content of [text,`لاحظ المثال: ${text} — الفعل يبقى V1.`]){
  const html=renderToStaticMarkup(React.createElement('div',{dir:'rtl'},React.createElement(Text43,{text:content})));
  ok(analyzeHtml(html).every(p=>p.violations.length===0),`BIDI: ${content}`);
  ok(html.includes('dir="ltr"'),'explicit LTR isolation');
 }
}
const root=createRoot(document.getElementById('root'));
await act(async()=>root.render(React.createElement(Lesson43)));
const all=selector=>[...document.querySelectorAll(selector)];
async function click(element){ok(!!element,'click target exists');await act(async()=>element.click());}
async function change(element,value){await act(async()=>{const proto=element.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:element.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(element,value);element.dispatchEvent(new Event(element.tagName==='SELECT'?'change':'input',{bubbles:true}));});}
const byText=(text)=>all('button').find(button=>button.textContent===text);
const step=()=>document.querySelector('.step43');
const next=()=>click(document.querySelector('.bottomNav43 button:last-child'));
ok(all('.areas43 button')[2].disabled,'solutions initially locked');ok(!document.querySelector('[data-area=solutions]'),'no hidden solutions DOM');
for(let i=0;i<=37;i++){
 const current=step();ok(current.dataset.sourceSection===(i?'s'+String(i).padStart(2,'0'):'cover'),`step ${i} maps to its source section`);
 for(const el of all('.lesson43 [aria-controls],.lesson43 [aria-labelledby],.lesson43 [aria-describedby]'))for(const attr of ['aria-controls','aria-labelledby','aria-describedby'])for(const id of (el.getAttribute(attr)||'').split(/\s+/).filter(Boolean))ok(document.getElementById(id),`ARIA resolves ${id}`);
 for(const el of all('.lesson43 button'))ok(el.textContent.trim()||el.getAttribute('aria-label'),'button accessible name');
 for(const el of all('.lesson43 textarea,.lesson43 select,.lesson43 input'))ok(el.closest('label')||el.getAttribute('aria-label')||el.labels?.length,'form control accessible name');
 if(i===2){const card=document.querySelector('[data-exercise-id="prob-0"]');await click(card.querySelectorAll('.actions43 button')[0]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43'),'probability explorer places the fact band');ok(!card.querySelector('.feedback43.error'),'certain fact lands on the certain band');}
 if(i===3){const card=document.querySelector('.readout43');ok(card.textContent.includes('She')||card.textContent.includes('I'),'builder readout shows the subject chip');await click(all('.dialGroup43')[0].querySelectorAll('button')[2]);ok(document.querySelector('.formula43').textContent.startsWith('She may'),'builder assembles subject + MAY + V1');}
 if(i===4){const card=document.querySelector('[data-exercise-id="transform-may"]');await change(card.querySelector('select'),'1');await click(card.querySelector('.primary43'));ok(card.querySelector('.formula43').textContent.includes('may not'),'negative transformation of MAY');}
 if(i===4){ok(all('.table43').length>=1,'MAY/MIGHT pronoun table renders');}
 if(i===5){ok(document.querySelector('.formula43').textContent.includes('may'),'dial reads the MAY channel');await click(all('.dialGroup43')[1].querySelectorAll('button')[1]);ok(document.querySelector('.formula43').textContent.startsWith('I might'),'control panel switches MAY→MIGHT');}
 if(i===7){ok(document.querySelector('.formula43').textContent.includes('may be'),'MAY BE composer keeps the modal plus the base form of BE');}
 if(i===11){const card=document.querySelector('[data-exercise-id="swap-5"]');await click(card.querySelectorAll('button')[2]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'swap lab rejects fixed percentage rankings');}
 if(i===13){const card=document.querySelector('[data-exercise-id="negation-1"]');await click(card.querySelectorAll('button')[1]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'negation lab separates prohibition from probability');}
 if(i===15){ok(all('.rung43').length===4,'permission ladder shows four request forms');const card=document.querySelector('[data-exercise-id="permission-1"]');await click(card.querySelectorAll('button')[1]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'permission studio scores the polite everyday choice');}
 if(i===18){const card=document.querySelector('[data-exercise-id="maybe-0"]');ok(!card.querySelector('.feedback43'),'maybe/may be key hidden before the attempt');await click(card.querySelectorAll('button')[0]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'maybe classified as a standalone adverb');}
 if(i===19){const card=document.querySelector('[data-exercise-id="maybe-1"]');await click(card.querySelectorAll('button')[1]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'may be classified as modal plus linking verb');}
 if(i===20){const card=document.querySelector('[data-exercise-id="past-analyzer-1"]');await click(card.querySelectorAll('button')[0]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'past possibility decomposes to modal + have + V3');}
 if(i===24){ok(all('.table43').length>=1,'four-modals comparison table renders');const card=document.querySelector('[data-exercise-id="four-modals-3"]');await click(card.querySelectorAll('button')[1]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'four-modal matrix picks MAY for polite permission');}
 if(i===26){ok(all('.turn43').length===11,'comprehensive dialogue renders eleven turns');const card=document.querySelector('[data-exercise-id="detective-1"]');await click(card.querySelectorAll('button')[0]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'context detective tags the past possibility turn');}
 if(i===27){const card=document.querySelector('[data-exercise-id="practice-27-1"]');await click(card.querySelectorAll('button')[0]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'MAY accepted in the both-acceptable drill');await click(card.querySelectorAll('button')[1]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'MIGHT accepted in the both-acceptable drill');}
 if(i===28){const card=document.querySelector('[data-exercise-id="practice-28-1"]');await click(card.querySelectorAll('button')[0]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'§28 first key is A — may');}
 if(i===29){const card=document.querySelector('[data-exercise-id="practice-29-1"]');await click(card.querySelectorAll('button')[0]);await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43')&&!card.querySelector('.feedback43.error'),'§29 first key is Maybe the adverb');}
 if(i===30){const card=document.querySelector('[data-exercise-id="practice-30-1"]');ok(card.querySelector('button').disabled,'rewrite attempt gates the key');const areas=card.querySelectorAll('textarea');await change(areas[0],'He may have lost his phone.');ok(card.querySelector('button').disabled,'rewrite reason still required');await change(areas[1],'rephrased with may have');await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43'),'rewrite comparison opens after the attempt');}
 if(i===31){const card=document.querySelector('[data-exercise-id="error-repair-1"]');ok(card.querySelectorAll('textarea').length===2,'repair asks for the fix and the reason');ok(card.querySelector('button').disabled,'repair locked while empty');await change(card.querySelectorAll('textarea')[0],'She may be at home.');ok(card.querySelector('button').disabled,'repair reason still required');await change(card.querySelectorAll('textarea')[1],'removed the s from may');await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43').textContent.includes('She may come tomorrow.'),'repair reveals the source key only after the attempt');}
 if(i===32){ok(document.body.textContent.includes('The Unexpected School Trip'),'reading challenge text renders');const card=document.querySelector('[data-exercise-id="reading-1"]');ok(!card.querySelector('.feedback43'),'comprehension answer hidden before the attempt');await change(card.querySelector('textarea'),'a science museum');await click(card.querySelector('.primary43'));ok(card.querySelector('.feedback43'),'comprehension comparison opens after the attempt');}
 if(i===33)ok(byText('ابدأ الاختبار النهائي'),'test entry point');
 if(i===34)ok(byText('انتقل إلى بوابة المعلم'),'teacher gate entry point');
 if(i===35){const card=document.querySelector('.checklist43');ok(card.querySelectorAll('li').length===10,'writing checklist has ten items');const box=card.querySelector('input[type=checkbox]');await click(box);ok(document.body.textContent.includes('1 / 10'),'writing checklist counts completed items honestly');}
 if(i===36)ok(all('.summaryCard43').length===10,'golden rules render as ten cards');
 if(i===37)ok(document.body.textContent.includes('Lesson 44')&&document.body.textContent.includes('مخطط'),'roadmap keeps Lesson 44 as planned prose only');
 if(i<37)await next();
}
await click(all('.areas43 button')[1]);ok(all('[data-question-id]').length===25,'25 questions, no duplicated practice');ok(byText('تسليم الاختبار النهائي').disabled,'incomplete submit disabled');
for(const fieldset of all('[data-question-id]')){
 const radio=fieldset.querySelector('input[type=radio]');if(radio)await click(radio);else for(const input of fieldset.querySelectorAll('textarea'))await change(input,'Attempt');
}
ok(!byText('تسليم الاختبار النهائي').disabled,'completed submit enabled');await click(byText('تسليم الاختبار النهائي'));await act(async()=>{await new Promise(resolve=>setTimeout(resolve,50));});ok(document.querySelector('[data-area=solutions]'),'solutions mounted only after submission');ok(document.querySelector('[data-area=solutions]').textContent.includes('A — may'),'detailed key shown after submission');
await click(all('.areas43 button')[1]);await click(byText('إعادة الاختبار ومسح الإجابات'));ok(all('.areas43 button')[2].disabled,'reset relocks');ok(all('textarea').every(el=>!el.value),'reset clears text');ok(all('input:checked').length===0,'reset clears radios');
await click(all('.areas43 button')[3]);ok(!document.querySelector('[data-teacher-guide]'),'guide absent before password');await change(document.querySelector('input[type=password]'),'incorrect');await click(byText('فتح مساحة المعلم'));ok(document.querySelector('[role=alert]'),'incorrect password feedback');
await change(document.querySelector('input[type=password]'),'somer173');await click(byText('فتح مساحة المعلم'));await act(async()=>{await new Promise(resolve=>setTimeout(resolve,50));});ok(document.querySelector('[data-teacher-guide]'),'teacher guide opens with the existing password');
await act(async()=>root.unmount());
console.log(`Lesson 43 DOM/BIDI audit passed: ${checks} assertions; 38-step navigation, labels/ARIA, nine interactive engines, attempt-gated practice keys, complete-test submission/reset, locked teacher access and sixteen targeted BIDI cases.`);
