import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './lesson53.css';
import Lesson1Shell, { type Lesson1ShellGroup } from '../../shared/Lesson1Shell';
import { Bullets52, En52, Formula52, Mixed52, SlideFrame52, Table52 } from '../lesson52/kit52';
import { DIALOGUE_53, DIALOGUE_QA_53, PAGES_53, READING_53, READING_QA_53, REVIEW_53, SPEAKING_53, SPEAKING_MODEL_53, SUMMARY_53, WRITING_MODEL_53, WRITING_PROMPTS_53, WRITING_START_53, type Example53, type Page53 } from './content53';
import { PRACTICE_53, type Practice53 } from './practiceData53';
import { TestArea53, type TestResult53 } from './TestArea53';

type Slide53 = { id: string; title: string; section: string; kind: 'cover' | 'page' | 'pairs' | 'qa' | 'practice' | 'writing' | 'speaking' | 'summary' | 'quiz' | 'progress' | 'roadmap' | 'closing'; page?: Page53; pairs?: readonly Example53[]; practice?: Practice53 };
export const SLIDES_53: readonly Slide53[] = [
 {id:'cover',title:'الشرط الثاني',section:'المقدمة',kind:'cover'},
 ...PAGES_53.map((page) => ({id:page.id,title:page.title,section:page.section,kind:'page' as const,page})),
 {id:'dialogue-1',title:'If I Were Rich — المحادثة',section:'⑮ المحادثة',kind:'pairs',pairs:DIALOGUE_53.slice(0,5)},
 {id:'dialogue-2',title:'المحادثة — أحلام مايا',section:'⑮ المحادثة',kind:'pairs',pairs:DIALOGUE_53.slice(5)},
 {id:'dialogue-questions',title:'أسئلة فهم المحادثة',section:'⑮ المحادثة',kind:'qa',pairs:DIALOGUE_QA_53},
 {id:'reading-1',title:'A Different Life — قطعة القراءة',section:'⑯ القراءة',kind:'pairs',pairs:READING_53.slice(0,3)},
 {id:'reading-2',title:'A Different Life — تكملة',section:'⑯ القراءة',kind:'pairs',pairs:READING_53.slice(3)},
 {id:'reading-questions',title:'أسئلة فهم القراءة',section:'⑯ القراءة',kind:'qa',pairs:READING_QA_53},
 ...PRACTICE_53.map((practice, i) => ({id:`practice-${i+1}`,title:practice.title,section:'⑰–⑱ التدريبات والإجابات',kind:'practice' as const,practice})),
 {id:'final-test',title:'الاختبار النهائي — 25 سؤالًا',section:'⑲–⑳ الاختبار وتصحيحه',kind:'quiz'},
 {id:'writing',title:'Writing Task — If I Could Change My Life',section:'㉑ مهمة الكتابة',kind:'writing'},
 {id:'speaking',title:'Speaking Task — المواقف الافتراضية',section:'㉒ مهمة التحدث',kind:'speaking'},
 {id:'review-1',title:'مراجعة شاملة — المجموعتان الأولى والثانية',section:'㉓ المراجعة',kind:'pairs',pairs:REVIEW_53.slice(0,4)},
 {id:'review-2',title:'مراجعة شاملة — المجموعتان الثالثة والرابعة',section:'㉓ المراجعة',kind:'pairs',pairs:REVIEW_53.slice(4)},
 {id:'summary',title:'الملخص النهائي',section:'㉔ الملخص',kind:'summary'},
 {id:'progress',title:'تقدمنا في المنهج',section:'㉕ تقدم المنهج',kind:'progress'},
 {id:'roadmap',title:'الدرس القادم: 54 — THIRD CONDITIONAL',section:'㉕ تقدم المنهج',kind:'roadmap'},
 {id:'closing',title:'إتمام الدرس',section:'㉕ تقدم المنهج',kind:'closing'},
];

const en = (text: string) => <span dir="ltr" lang="en" className="font-en inline-block text-left">{text}</span>;
function PairCards({ pairs }: { pairs: readonly Example53[] }) {
 return <div className="grid gap-3">{pairs.map((p,i) => <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div dir="ltr" lang="en" className="font-en text-left text-xl font-bold text-slate-800">{p.en}</div><p className="mt-2 text-lg text-slate-500">{p.ar}</p></div>)}</div>;
}
function ContentPage({ page }: { page: Page53 }) {
 return <>
  {page.paragraphs?.map((p,i) => <p key={i} className="text-xl leading-relaxed text-slate-700"><Mixed52 text={p}/></p>)}
  {page.formula && <Formula52 parts={[{text:page.formula,tone:'C'}]}/>}
  {page.table && <Table52 head={page.table.head} rows={page.table.rows}/>}
  {page.lines && <Bullets52 items={page.lines}/>}
  {page.examples && <PairCards pairs={page.examples}/>}
 </>;
}
function QuestionCards({ pairs, reading = false }: { pairs: readonly Example53[]; reading?: boolean }) {
 const [responses,setResponses] = useState<Record<number,string>>({}); const [revealed,setRevealed] = useState<Record<number,boolean>>({});
 return <div className="space-y-3">{pairs.map((p,i)=><div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
  <p dir="ltr" lang="en" className="font-en text-left text-lg font-bold">{i+1}. {p.en}</p>
  <input aria-label={`إجابة سؤال الفهم ${i+1}`} dir="ltr" lang="en" value={responses[i] ?? ''} onChange={e=>setResponses({...responses,[i]:e.target.value})} className="font-en mt-3 w-full min-w-0 rounded-xl border-2 border-slate-200 p-3 text-left"/>
  <button type="button" disabled={!responses[i]?.trim()} onClick={()=>setRevealed({...revealed,[i]:true})} className="mt-3 rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white disabled:opacity-40">راجع الإجابة</button>
  {revealed[i] && <><p dir="ltr" lang="en" className="font-en mt-3 rounded-2xl bg-emerald-50 p-3 text-left text-emerald-900">{p.ar}</p>{reading && i===1 && <p className="mt-2 text-sm text-slate-600">يذكر النص حلم آدم بمدينة كبيرة، ويطرح لندن مثالًا افتراضيًا؛ الإجابة النموذجية تفترض لندن، لكن النص لا يصرّح بأنه يحلم بها تحديدًا.</p>}</>}
 </div>)}</div>;
}
function PracticeView({ practice }: { practice: Practice53 }) {
 const [responses,setResponses] = useState<Record<number,string>>({}); const [revealed,setRevealed] = useState<Record<number,boolean>>({});
 return <div className="space-y-4"><p className="text-xl text-slate-600"><Mixed52 text={practice.instruction}/></p>
  {practice.example && <div dir="ltr" lang="en" className="font-en rounded-2xl bg-sky-50 p-4 text-left">{practice.example}</div>}
  {practice.items.map((item,i)=><div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
   <p dir={/[\u0600-\u06ff]/.test(item.prompt) ? 'auto' : 'ltr'} className="text-lg font-bold"><Mixed52 text={`${i+1}. ${item.prompt}`}/></p>
   {item.options ? <div dir="ltr" className="mt-3 grid gap-2 sm:grid-cols-2">{item.options.map(option=><button type="button" key={option} aria-pressed={responses[i]===option} onClick={()=>setResponses({...responses,[i]:option})} className={`font-en rounded-xl border-2 p-3 text-left font-bold ${responses[i]===option?'border-slate-900 bg-slate-900 text-white':'border-slate-200 bg-white text-slate-700'}`}>{option}</button>)}</div> : <input aria-label={`إجابة التدريب ${i+1}`} dir="ltr" lang="en" value={responses[i] ?? ''} onChange={e=>setResponses({...responses,[i]:e.target.value})} className="font-en mt-3 w-full min-w-0 rounded-xl border-2 border-slate-200 p-3 text-left"/>}
   <button type="button" disabled={!responses[i]?.trim()} onClick={()=>setRevealed({...revealed,[i]:true})} className="mt-3 rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white disabled:opacity-40">راجع الإجابة</button>
   {revealed[i] && <div className="mt-3 rounded-2xl bg-emerald-50 p-4"><p dir="ltr" lang="en" className="font-en text-left font-bold text-emerald-900">{item.answer}</p>{item.explanation && <p className="mt-2 text-slate-700"><Mixed52 text={item.explanation}/></p>}{practice === PRACTICE_53[1] && i === 0 && responses[i]?.startsWith('B.') && <p className="mt-2 font-semibold">اختيارك مقبول في الاستعمال غير الرسمي، وwere هي المفضلة في الاختبار الرسمي.</p>}</div>}
  </div>)}
  {practice.note && <p className="rounded-2xl bg-amber-50 p-4 text-slate-700">{practice.note}</p>}
 </div>;
}
function Cover53() { return <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-14"><div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-sky-100 blur-3xl"/><div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-orange-100 blur-3xl"/><div className="relative"><div className="pop text-7xl anim-drift">💭</div><div className="pop pop-1 mt-4 inline-block rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white">الدرس 53 من 120</div><h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">الشرط الثاني</h1><p className="pop pop-3 mt-2 text-2xl text-slate-500">{en('SECOND CONDITIONAL')}</p><div className="pop pop-4 mt-8 flex justify-center"><Formula52 parts={[{text:'If + Past Simple',tone:'C'},{text:'would + V1',tone:'R'}]}/></div><p className="pop pop-5 mt-8 text-base text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p></div></section>; }
function Closing53({ onExit }: { onExit?:()=>void }) {return <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-center text-white shadow-xl md:p-14"><div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl"/><div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"/><div className="relative"><div className="pop text-7xl anim-drift">🏆</div><div className="pop pop-1 mt-3 text-sm font-bold text-slate-400">⭐ إتمام الدرس 53</div><h2 className="pop pop-2 font-head mt-2 text-3xl font-bold md:text-5xl">الشرط الثاني جاهز للاستخدام</h2><p className="pop pop-3 mt-3 text-xl text-slate-300">تذكّر القاعدة الأساسية دائمًا:</p><div className="pop pop-4 mt-8 flex flex-wrap items-center justify-center gap-3"><div dir="ltr" className="font-en rounded-2xl bg-sky-500 px-6 py-3 text-2xl font-extrabold">IF + PAST SIMPLE</div><span className="text-3xl text-slate-500">→</span><div dir="ltr" className="font-en rounded-2xl bg-emerald-500 px-6 py-3 text-2xl font-extrabold">WOULD + V1</div></div><div className="pop pop-6 mt-10 flex flex-wrap justify-center gap-3"><a href="#/lesson/54" className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900">الدرس التالي: 54 — {en('THIRD CONDITIONAL')} ←</a><button type="button" onClick={onExit} className="rounded-xl border border-white/30 px-5 py-2.5 font-bold">جميع الدروس</button></div></div></section>;}
function Writing53({ value, onChange }: {value:string; onChange:(v:string)=>void}) {
 const [show,setShow] = useState(false);
 return <div className="space-y-4"><p className="text-xl text-slate-700">اكتب فقرة من 10 إلى 14 جملة بعنوان {en('If I Could Change My Life')}، مستخدمًا الشرط الثاني في ست جمل على الأقل. يمكنك التحدث عن:</p><Bullets52 items={WRITING_PROMPTS_53}/><h3 className="font-head text-xl font-bold">بداية مقترحة</h3><div className="rounded-3xl border border-slate-200 p-5" dir="ltr" lang="en">{WRITING_START_53.map(x=><p key={x} className="font-en text-left">{x}</p>)}</div><textarea aria-label="فقرة الكتابة" dir="ltr" lang="en" value={value} onChange={e=>onChange(e.target.value)} className="font-en min-h-40 w-full rounded-2xl border-2 border-slate-200 p-4 text-left"/><button type="button" disabled={!value.trim()} onClick={()=>setShow(!show)} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white disabled:opacity-40">{show?'إخفاء النموذج':'راجع النموذج الاسترشادي'}</button>{show&&<div className="rounded-3xl border border-slate-200 p-5"><h3 dir="ltr" lang="en" className="font-en text-left font-bold">If I Could Change My Life</h3><p dir="ltr" lang="en" className="font-en mt-2 text-left">{WRITING_MODEL_53}</p><p className="mt-3 text-sm text-slate-600">هذا نموذج استرشادي من ثماني جمل؛ في مهمتك اكتب 10 إلى 14 جملة كما طُلب.</p></div>}</div>;
}
function Speaking53(){return <div className="space-y-4"><p className="text-xl text-slate-700">تخيل مقابلة مع صديق وأجب شفهيًا باللغة الإنجليزية. استخدم would وcould وmight واشرح سبب اختيارك.</p><div className="grid gap-3">{SPEAKING_53.map((q,i)=><div key={q} className="rounded-2xl border border-slate-200 p-4"><p dir="ltr" lang="en" className="font-en text-left text-lg font-semibold">{i+1}. {q}</p></div>)}</div><div className="rounded-3xl bg-sky-50 p-5"><p className="font-bold">مثال على إجابة كاملة:</p><p dir="ltr" lang="en" className="font-en mt-2 text-left">{SPEAKING_53[0]}</p><p dir="ltr" lang="en" className="font-en mt-2 text-left">{SPEAKING_MODEL_53}</p></div></div>;}
function Summary53(){return <><Bullets52 items={SUMMARY_53} ordered/><PairCards pairs={[{en:'If I eat too much, I feel sick.',ar:'Zero — حقيقة أو عادة.'},{en:'If I eat too much tonight, I will feel sick.',ar:'First — توقع مستقبلي.'},{en:'If I ate too much, I would feel sick.',ar:'Second — افتراض.'}]}/></>;}
function Progress53({ result }: {result:TestResult53|null}) {return <div className="grid gap-4"><div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm"><div className="text-sm font-bold text-slate-500">منهج اللغة الإنجليزية</div><div dir="ltr" className="font-head mt-2 text-5xl font-bold">53 / 120</div><div dir="ltr" className="mt-1 text-2xl font-bold text-emerald-600">44.2%</div><div className="mx-auto mt-4 h-3 w-full max-w-md overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500" style={{width:`${53/120*100}%`}}/></div><div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-3">53 درسًا مكتملًا في مسار المنهج</div><div className="rounded-2xl bg-slate-50 p-3">67 درسًا متبقيًا</div></div><p className="mt-4 text-sm text-slate-500">{result?'اختبار هذه الجلسة مُسلّم.':'موضع المنهج 53؛ الاختبار في هذه الجلسة لم يُسلّم بعد.'}</p></div><Bullets52 items={['الدرس 49: Modal Perfect','الدرس 50: Deduction & Speculation','الدرس 51: Zero Conditional','الدرس 52: First Conditional','الدرس 53: Second Conditional']}/></div>;}
function Roadmap53(){return <div className="space-y-4"><p className="text-xl text-slate-700">في الدرس القادم سندرس الشرط الثالث للمواقف التي لم تحدث في الماضي، ونتخيل نتائج مختلفة لو حدثت الأمور بطريقة أخرى.</p><PairCards pairs={[{en:'If I had studied harder, I would have passed the exam.',ar:'لو كنت قد درست بجد أكثر، لكنت نجحت في الامتحان.'}]}/><p className="text-xl text-slate-700">سنتعلم Past Perfect في جملة الشرط وWould have + V3 في النتيجة، ونقارن الشرط الثالث بالأول والثاني.</p><a href="#/lesson/54" className="inline-block rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white">الدرس 54 — {en('THIRD CONDITIONAL')} ←</a><p className="text-sm text-slate-500">قد لا يكون الدرس التالي متاحًا بعد.</p></div>;}

export default function Lesson53({onExit}:{onExit?:()=>void}) {
 const [step,setStep]=useState(0); const [menu,setMenu]=useState(false); const [answers,setAnswers]=useState<Record<string,string>>({}); const [result,setResult]=useState<TestResult53|null>(null); const [writing,setWriting]=useState(''); const mainRef=useRef<HTMLElement|null>(null);
 const go=useCallback((n:number)=>{setStep(Math.max(0,Math.min(SLIDES_53.length-1,n)));setMenu(false);if(mainRef.current)mainRef.current.scrollTop=0;},[]);
 useEffect(()=>{const key=(event:KeyboardEvent)=>{const target=event.target as HTMLElement|null;if(event.key==='Escape'&&menu){setMenu(false);return;}if(menu||target&&(/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)||target.isContentEditable))return;if(event.key==='ArrowLeft'||(event.key===' '&&target?.tagName!=='BUTTON')){event.preventDefault();go(step+1);}else if(event.key==='ArrowRight'){event.preventDefault();go(step-1);}else if(event.key==='Home'){event.preventDefault();go(0);}else if(event.key==='End'){event.preventDefault();go(SLIDES_53.length-1);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[go,step,menu]);
 const groups=useMemo<Lesson1ShellGroup[]>(()=>{const sections=[...new Set(SLIDES_53.map(s=>s.section))];return sections.map(section=>({section,items:SLIDES_53.flatMap((s,index)=>s.section===section?[{index,title:<Mixed52 text={s.title}/>,navId:s.id}]:[])}));},[]);
 const slide=SLIDES_53[step];
 let body;
 if(slide.kind==='cover') body=<Cover53/>;
 else if(slide.kind==='closing') body=<Closing53 onExit={onExit}/>;
 else {
  let inner;
  switch(slide.kind){
   case 'page': inner=slide.page&&<ContentPage page={slide.page}/>;break;
   case 'pairs': inner=slide.pairs&&<PairCards pairs={slide.pairs}/>;break;
   case 'qa': inner=slide.pairs&&<QuestionCards pairs={slide.pairs} reading={slide.id==='reading-questions'}/>;break;
   case 'practice': inner=slide.practice&&<PracticeView practice={slide.practice}/>;break;
   case 'writing': inner=<Writing53 value={writing} onChange={setWriting}/>;break;
   case 'speaking': inner=<Speaking53/>;break;
   case 'summary': inner=<Summary53/>;break;
   case 'quiz': inner=<TestArea53 answers={answers} onAnswersChange={setAnswers} result={result} onResult={setResult}/>;break;
   case 'progress': inner=<Progress53 result={result}/>;break;
   case 'roadmap': inner=<Roadmap53/>;break;
  }
  body=<SlideFrame52 mascot="🦉" step={step+1} badge={slide.section} title={slide.title}>{inner}</SlideFrame52>;
 }
 return <Lesson1Shell rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800 lesson53" rootDir="rtl" rootDataLesson={53} railTitle="الدرس 53 · الشرط الثاني" railSubtitle={<En52 className="text-xs font-semibold text-slate-400">SECOND CONDITIONAL</En52>} groups={groups} activeIndex={step} onSelectStep={go} onExit={onExit} isMenuOpen={menu} onMenuOpenChange={setMenu} markActiveStep itemTitleClassName="line-clamp-2 leading-snug" railAriaLabel="فهرس درس الشرط الثاني" navAriaLabel="التنقل بين شرائح الدرس" headerContent={<Mixed52 text={`${slide.section} · ${slide.title}`}/>} progress={(step+1)/SLIDES_53.length*100} counter={<bdi dir="ltr">{step+1} / {SLIDES_53.length}</bdi>} counterDir="ltr" mainId="l53-main" mainRef={mainRef} contentKey={step} contentArea={slide.id} onPrev={()=>go(step-1)} onNext={()=>go(step+1)} prevDisabled={step===0} nextDisabled={step===SLIDES_53.length-1}>{body}</Lesson1Shell>;
}
