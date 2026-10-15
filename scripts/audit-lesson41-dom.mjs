import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { analyzeHtml } from './lib/bidi-sim.mjs';
const dom=new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>',{url:'http://localhost/',pretendToBeVisual:true});
for(const key of ['window','document','navigator','HTMLElement','HTMLInputElement','HTMLTextAreaElement','HTMLSelectElement','Node','Event','MouseEvent','KeyboardEvent','MutationObserver','getComputedStyle'])Object.defineProperty(globalThis,key,{value:dom.window[key],configurable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
mkdirSync('node_modules/.lesson41-audit',{recursive:true});
await build({stdin:{contents:`export {default as Lesson41} from './src/lessons/lesson41/Lesson41';export {Text41} from './src/lessons/lesson41/kit41';`,resolveDir:process.cwd(),loader:'tsx'},outfile:'node_modules/.lesson41-audit/ui.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',loader:{'.css':'empty'}});
const {Lesson41,Text41}=await import('../node_modules/.lesson41-audit/ui.mjs');
const React=await import('react');const {createRoot}=await import('react-dom/client');const {renderToStaticMarkup}=await import('react-dom/server');const {act}=React;
let checks=0;const ok=(c,m)=>{checks++;assert.ok(c,m);};
for(const text of ['Does she study?',"She hasn't finished.",'She will have been studying.','Did he do the experiment?','Has she been studying?']){
 for(const content of [text,`لاحظ المثال: ${text} — نستخدم الفعل المساعد الأول.`]){
  const html=renderToStaticMarkup(React.createElement('div',{dir:'rtl'},React.createElement(Text41,{text:content})));
  ok(analyzeHtml(html).every(p=>p.violations.length===0),`BIDI: ${content}`);
  ok(html.includes('dir="ltr"'),'explicit LTR isolation');
 }
}
const root=createRoot(document.getElementById('root'));
await act(async()=>root.render(React.createElement(Lesson41)));
const all=selector=>[...document.querySelectorAll(selector)];
async function click(element){ok(!!element,'click target exists');await act(async()=>element.click());}
async function change(element,value){await act(async()=>{const proto=element.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:element.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(element,value);element.dispatchEvent(new Event(element.tagName==='SELECT'?'change':'input',{bubbles:true}));});}
const byText=(text)=>all('button').find(button=>button.textContent===text);
ok(all('.areas41 button')[2].disabled,'solutions initially locked');ok(!document.querySelector('[data-area=solutions]'),'no hidden solutions DOM');
await click(all('.engineTabs41 button')[1]);ok(document.querySelector('.engineDetail41').textContent.includes('Does she study?'),'DO explorer responds');
for(let i=0;i<=40;i++){
 const section=document.querySelector('.step41');ok(section.dataset.sourceSection===(i?'s'+String(i).padStart(2,'0'):'cover'),`native step ${i}`);
 for(const el of all('.lesson41 [aria-controls],.lesson41 [aria-labelledby],.lesson41 [aria-describedby]'))for(const attr of ['aria-controls','aria-labelledby','aria-describedby'])for(const id of (el.getAttribute(attr)||'').split(/\s+/).filter(Boolean))ok(document.getElementById(id),`ARIA resolves ${id}`);
 for(const el of all('.lesson41 button'))ok(el.textContent.trim()||el.getAttribute('aria-label'),'button accessible name');
 for(const el of all('.lesson41 textarea,.lesson41 select,.lesson41 input'))ok(el.closest('label')||el.getAttribute('aria-label')||el.labels?.length,'form control accessible name');
 if(i===5){const card=document.querySelector('.exercise41');await change(card.querySelector('select'),'am');await click(card.querySelector('button'));ok(card.textContent.includes('بناء صحيح'),'BE feedback after action');}
 if(i===29){const card=document.querySelector('[data-practice-id="p29-1"]');ok(!card.querySelector('.feedback41'),'repair solution initially absent');await change(card.querySelectorAll('textarea')[0],'Does she study English?');ok(card.querySelector('button').disabled,'repair needs reason too');await change(card.querySelectorAll('textarea')[1],'V1 after does');await click(card.querySelector('button'));ok(card.querySelector('.feedback41'),'repair solution after both inputs');}
 if(i<40)await click(document.querySelector('.bottomNav41 button:last-child'));
}
await click(all('.areas41 button')[1]);ok(all('[data-question-id]').length===25,'25 questions, no duplicated practice');ok(byText('تسليم الاختبار النهائي').disabled,'incomplete submit disabled');
for(const fieldset of all('[data-question-id]')){
 const radio=fieldset.querySelector('input[type=radio]');if(radio)await click(radio);else for(const input of fieldset.querySelectorAll('textarea'))await change(input,'Attempt');
}
ok(!byText('تسليم الاختبار النهائي').disabled,'completed submit enabled');await click(byText('تسليم الاختبار النهائي'));await act(async()=>{await new Promise(resolve=>setTimeout(resolve,50));});ok(document.querySelector('[data-area=solutions]'),'solutions mounted only after submission');
await click(all('.areas41 button')[1]);await click(byText('إعادة الاختبار ومسح الإجابات'));ok(all('.areas41 button')[2].disabled,'reset relocks');ok(all('textarea').every(el=>!el.value),'reset clears text');ok(all('input:checked').length===0,'reset clears radios');
await click(all('.areas41 button')[3]);ok(!document.querySelector('[data-teacher-guide]'),'guide absent before password');await change(document.querySelector('input[type=password]'),'incorrect');await click(byText('فتح مساحة المعلم'));ok(document.querySelector('[role=alert]'),'incorrect password feedback');
await act(async()=>root.unmount());console.log(`Lesson 41 DOM/BIDI audit passed: ${checks} assertions; 41-step navigation, labels/ARIA, interactive feedback, complete-test submission/reset, locked teacher access and ten targeted BIDI cases.`);
