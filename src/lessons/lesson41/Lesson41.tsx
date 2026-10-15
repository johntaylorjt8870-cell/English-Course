import { lazy, Suspense, useEffect, useState } from 'react';
import { Signature } from '../../shared/Signature';
import { SOURCE_SECTIONS_41, STATIONS_41, LESSON_TITLE_41 } from './data';
import { Workspace41, Text41 } from './kit41';
import { Steps41 } from './Steps41';
import { TestArea41 } from './TestArea41';
import { TeacherArea41 } from './TeacherArea41';
import { testComplete41, type TestAnswers41 } from './testData41';
import './lesson41.css';
const SolutionsArea41=lazy(()=>import('./SolutionsArea41'));
type Area41='student'|'test'|'solutions'|'teacher';
export default function Lesson41({onExit}:{onExit?:()=>void}) {
 const [area,setArea]=useState<Area41>('student'),[step,setStep]=useState(0),[visited,setVisited]=useState<number[]>([0]);
 const [values,setValues]=useState<Record<string,string>>({}),[answers,setAnswers]=useState<TestAnswers41>({});
 const [submitted,setSubmitted]=useState(false),[teacher,setTeacher]=useState(false),[mobileNav,setMobileNav]=useState(false);
 const unlocked=submitted||teacher,station=STATIONS_41.find(s=>step>=s.start&&step<=s.end)!;
 function navigate(index:number){const next=Math.max(0,Math.min(40,index));setStep(next);setArea('student');setMobileNav(false);setVisited(v=>v.includes(next)?v:[...v,next]);}
 useEffect(()=>{if(!/jsdom/i.test(navigator.userAgent)){window.scrollTo({top:0,behavior:'instant'});document.getElementById('step-title-41')?.focus({preventScroll:true});}},[step,area]);
 useEffect(()=>{const handler=(event:KeyboardEvent)=>{if(area!=='student'||event.ctrlKey||event.altKey||event.metaKey||event.shiftKey||(event.target as HTMLElement)?.closest('input,textarea,select,button,a,[contenteditable]'))return;if(event.key==='ArrowLeft'){event.preventDefault();navigate(step+1);}else if(event.key==='ArrowRight'){event.preventDefault();navigate(step-1);}};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);},[area,step]);
 const labels:Record<Area41,string>={student:'التعلّم',test:'الاختبار',solutions:unlocked?'الحلول':'الحلول · مقفلة',teacher:'المعلم'};
 return <><Signature/><div className="lesson41" dir="rtl" data-lesson="41"><header className="masthead41"><div className="mastheadInner41"><a href="#/" onClick={()=>onExit?.()} className="brand41"><span className="brandMark41" aria-hidden="true">41</span><span dir="ltr">English Course<small>SENTENCE ENGINE STUDIO</small></span></a><a href="#/lesson/40">الدرس السابق ←</a></div></header><div className="lessonTop41"><div><p className="eyebrow41">المستوى التأسيسي المتقدم / IQ200</p><h1><Text41 text={LESSON_TITLE_41}/></h1><p>الإتقان الشامل للأفعال المساعدة — <b dir="ltr">BE / DO / HAVE</b></p></div><div className="lessonMetric41"><b>{visited.length}<span>/ 41</span></b><small>خطوات زرتها — لا تعني الإتقان</small><progress aria-label="خطوات تمت زيارتها" max={41} value={visited.length}/></div></div>
 <nav className="areas41" aria-label="مناطق الدرس">{(['student','test','solutions','teacher'] as const).map((id,i)=><button key={id} aria-current={area===id?'page':undefined} disabled={id==='solutions'&&!unlocked} onClick={()=>setArea(id)}><span aria-hidden="true">0{i+1}</span>{labels[id]}</button>)}</nav>
 <Workspace41.Provider value={{values,set:(key,value)=>setValues(v=>({...v,[key]:value}))}}>
 <div className={area==='student'?'layout41':'areaLayout41'}>{area==='student'&&<aside className="sidebar41"><button className="mobileToggle41" aria-expanded={mobileNav} aria-controls="lesson41-step-nav" onClick={()=>setMobileNav(!mobileNav)}>خريطة الدرس · الخطوة <bdi dir="ltr">{step+1} / 41</bdi></button><div id="lesson41-step-nav" className={mobileNav?'navContent41 open':'navContent41'}><p className="eyebrow41">خريطة الاكتشاف</p><nav aria-label="محطات الدرس">{STATIONS_41.map((s,i)=><div className="station41" key={s.start}><button aria-pressed={s===station} onClick={()=>navigate(s.start)}><span className="stationIndex41">{String(i).padStart(2,'0')}</span><span>{s.name}<small dir="ltr">{s.en}</small></span></button>{s===station&&<nav aria-label={`أقسام ${s.name}`} className="sectionsNav41">{SOURCE_SECTIONS_41.filter(sec=>sec.num>=s.start&&sec.num<=s.end).map(sec=><button key={sec.id} aria-current={sec.num===step?'step':undefined} onClick={()=>navigate(sec.num)}><span>{sec.num===0?'◉':sec.num}</span><Text41 text={sec.title}/></button>)}</nav>}</div>)}</nav><p className="sidebarNote41">اقرأ. جرّب. فسّر.<br/>← التالي · → السابق</p></div></aside>}
 <main id="lesson41-main">{area==='student'?<><Steps41 index={step} onTest={()=>setArea('test')} onTeacher={()=>setArea('teacher')}/><nav className="bottomNav41" aria-label="تنقل الخطوات"><button disabled={step===0} onClick={()=>navigate(step-1)}>→ السابق</button><span>{step+1} / 41</span><button className="primary41" onClick={()=>step===40?setArea('test'):navigate(step+1)}>{step===40?'ابدأ الاختبار':'التالي ←'}</button></nav></>:null}
 {area==='test'&&<TestArea41 answers={answers} change={(id,value)=>{if(!submitted)setAnswers(a=>({...a,[id]:value}));}} submitted={submitted} submit={()=>{if(testComplete41(answers)){setSubmitted(true);setArea('solutions');}}} reset={()=>{setAnswers({});setSubmitted(false);setArea('test');}} openSolutions={()=>{if(unlocked)setArea('solutions');}}/>}
 {area==='solutions'&&unlocked&&<Suspense fallback={<p role="status">جارٍ تحميل الحلول…</p>}><SolutionsArea41 answers={answers}/></Suspense>}
 {area==='teacher'&&<TeacherArea41 unlocked={teacher} unlock={()=>setTeacher(true)} lock={()=>setTeacher(false)}/>}
 {area!=='student'&&<button className="back41" onClick={()=>setArea('student')}>العودة إلى خطوات التعلّم</button>}
 </main></div></Workspace41.Provider><footer className="footer41"><span dir="ltr">BE · DO · HAVE</span><p>افهم المحرك، لا تحفظ الشكل فقط.</p><a href="#/" onClick={()=>onExit?.()}>كل الدروس</a></footer></div></>;
}
