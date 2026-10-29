import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import { LESSON_IDENTITY_45, LESSON_STEP_COUNT_45, LESSON_SUBTITLE_45, LESSON_TITLE_45, STATIONS_45, STEPS_45 } from "./data";
import "./lesson45.css";

const TestArea45 = lazy(() => import("./TestArea45"));

function English({ children }: { children: React.ReactNode }) {
  return <span dir="ltr" lang="en" className="font-en l45-en">{children}</span>;
}

function AdviceLab() {
  const [situation,setSituation]=useState("exam");
  const [show,setShow]=useState(false);
  const advice:Record<string,{en:string;ar:string}> = {
    exam:{en:"You should revise the most important topics first.",ar:"ينبغي أن تراجع أهم الموضوعات أولًا."},
    tired:{en:"You should go to bed earlier.",ar:"ينبغي أن تنام في وقت أبكر."},
    phone:{en:"You shouldn't spend too much time on your phone.",ar:"من الأفضل ألا تقضي وقتًا طويلًا على هاتفك."},
    words:{en:"You should use each new word in a sentence.",ar:"ينبغي أن تستخدم كل كلمة جديدة في جملة."},
  };
  return <div className="l45-lab">
    <h3>Advice Generator · مولّد النصيحة</h3>
    <p>اختر موقفًا ثم كوّن نصيحة مناسبة باستخدام SHOULD.</p>
    <div className="l45-choice-grid">
      {Object.entries({exam:"امتحان غدًا",tired:"التعب والسهر",phone:"وقت طويل على الهاتف",words:"نسيان الكلمات"}).map(([id,label])=><button key={id} className={situation===id?"is-picked":""} onClick={()=>{setSituation(id);setShow(false)}}>{label}</button>)}
    </div>
    <button className="l45-primary" onClick={()=>setShow(true)}>كوّن النصيحة ↗</button>
    {show&&<div className="l45-answer"><English>{advice[situation].en}</English><p>{advice[situation].ar}</p></div>}
  </div>;
}

function MeaningLab() {
  const [choice,setChoice]=useState("should");
  const map:Record<string,{en:string;ar:string;tag:string}> = {
    should:{en:"You should wear a helmet.",ar:"ينبغي أن ترتدي خوذة.",tag:"نصيحة"},
    must:{en:"You must wear a helmet.",ar:"يجب أن ترتدي خوذة.",tag:"إلزام قوي"},
    have:{en:"You have to wear a helmet.",ar:"يجب عليك ارتداء خوذة.",tag:"ضرورة أو متطلب"},
    mustnt:{en:"You mustn't enter this room.",ar:"يُمنع عليك دخول هذه الغرفة.",tag:"منع"},
    dont:{en:"You don't have to enter this room.",ar:"لست مضطرًا إلى دخول هذه الغرفة.",tag:"عدم ضرورة"},
  };
  return <div className="l45-lab"><h3>Meaning Switch · مفتاح المعنى</h3><p>بدّل التعبير ولاحظ كيف يتغير المعنى.</p><div className="l45-choice-grid">{Object.entries({should:"SHOULD",must:"MUST",have:"HAVE TO",mustnt:"MUSTN'T",dont:"DON'T HAVE TO"}).map(([id,label])=><button key={id} className={choice===id?"is-picked":""} onClick={()=>setChoice(id)}>{label}</button>)}</div><div className="l45-answer"><English>{map[choice].en}</English><p>{map[choice].ar}</p><b>{map[choice].tag}</b></div></div>;
}

function PastLab() {
  const [kind,setKind]=useState("should");
  const [revealed,setRevealed]=useState(false);
  const items:Record<string,{en:string;ar:string;why:string}> = {
    should:{en:"I should have studied earlier.",ar:"كان ينبغي أن أدرس في وقت أبكر.",why:"كان من الأفضل القيام بالفعل في الماضي، وغالبًا لم يحدث كما ينبغي."},
    shouldnt:{en:"I shouldn't have stayed up so late.",ar:"لم يكن ينبغي أن أسهر إلى هذا الوقت المتأخر.",why:"الفعل وقع، لكن المتحدث يرى الآن أنه كان من الأفضل تجنبه."},
    expectation:{en:"The train should have arrived by now.",ar:"من المفترض أن القطار قد وصل بحلول الآن.",why:"توقع بشأن حدث كان يفترض أن يكتمل، وليس بالضرورة ندمًا."},
  };
  return <div className="l45-lab"><h3>Past Lens · عدسة الماضي</h3><div className="l45-choice-grid">{Object.entries({should:"SHOULD HAVE",shouldnt:"SHOULDN'T HAVE",expectation:"Past expectation"}).map(([id,label])=><button key={id} className={kind===id?"is-picked":""} onClick={()=>{setKind(id);setRevealed(false)}}>{label}</button>)}</div><button className="l45-primary" onClick={()=>setRevealed(true)}>اعرض المعنى</button>{revealed&&<div className="l45-answer"><English>{items[kind].en}</English><p>{items[kind].ar}</p><small>{items[kind].why}</small></div>}</div>;
}

function PolitenessLab() {
  const [tone,setTone]=useState("soft");
  const text=tone==="direct"?"You should talk to your teacher.":tone==="soft"?"I think you should talk to your teacher.":"Maybe you could talk to your teacher.";
  return <div className="l45-lab"><h3>Tone Studio · مختبر نبرة النصيحة</h3><div className="l45-choice-grid">{Object.entries({direct:"مباشرة",soft:"ألطف",suggestion:"اقتراح ممكن"}).map(([id,label])=><button key={id} className={tone===id?"is-picked":""} onClick={()=>setTone(id)}>{label}</button>)}</div><div className="l45-answer"><English>{text}</English><p>{tone==="direct"?"نصيحة مباشرة.":tone==="soft"?"إضافة I think تجعل النصيحة ألطف وأقل مباشرة.":"COULD تعرض خيارًا ممكنًا بدل نصيحة مباشرة."}</p></div></div>;
}

function StepContent({index}:{index:number}) {
  const step=STEPS_45[index]!;
  const [reveal,setReveal]=useState(false);
  useEffect(()=>setReveal(false),[index]);
  const lab=step.lab==="advice"?<AdviceLab/>:step.lab==="meaning"?<MeaningLab/>:step.lab==="past"?<PastLab/>:step.lab==="politeness"?<PolitenessLab/>:null;
  return <article className="l45-card" data-step-id={step.id}>
    <div className="l45-orbit" aria-hidden="true">{step.emoji}</div>
    <div className="l45-kicker">LESSON 45 <span>·</span> {step.station}</div>
    <h1 id="l45-title">{step.title}</h1>
    <p className="l45-lead">{step.lead}</p>
    <div className="l45-rule"/>
    <div className="l45-content">{step.content.map((line,i)=><p key={i} className={/^[A-Z][A-Za-z '’?.!,+0-9:-]+$/.test(line.trim())?"l45-english-line":""}>{/^[A-Z][A-Za-z '’?.!,+0-9:-]+$/.test(line.trim())?<English>{line}</English>:line}</p>)}</div>
    {step.examples&&<div className="l45-example-grid">{step.examples.map((ex,i)=><div key={i} className="l45-example"><English>{ex.en}</English><p>{ex.ar}</p></div>)}</div>}
    {lab}
    {step.id==="reading-questions"&&<div className="l45-reveal"><button onClick={()=>setReveal(v=>!v)}>{reveal?"إخفاء الإجابات":"اعرض حلول أسئلة الفهم"}</button>{reveal&&<p>① An important science competition. ② Make a clear plan and divide the work into smaller tasks. ③ No. ④ He starts without a plan and forgets important details. ⑤ Past regret. ⑥ Regret about something he did. ⑦ Focus on the present, make a checklist, and finish one task at a time. ⑧ A reasonable expectation. ⑨ You ought to divide your work into smaller tasks. ⑩ Good advice can save time and prevent mistakes.</p>}</div>}
    {step.id==="test-intro"&&<div className="l45-test-callout"><b>25 سؤالًا · 5 مستويات</b><p>اضغط «منطقة الاختبار» في شريط الدرس. لن تظهر مفاتيح الإجابة قبل إرسال المحاولة.</p></div>}
    {step.id==="teacher"&&<div className="l45-test-callout"><b>مراجعة بعد التسليم</b><p>تُحمّل مفاتيح الاختبار عند الإرسال فقط. بوابة المعلم في تطبيق المتصفح ليست حماية أمنية للخوادم؛ إنها تنظّم العرض فقط.</p></div>}
    {step.id==="writing"&&<textarea className="l45-writing" dir="ltr" lang="en" placeholder="Write your 12–15 sentence paragraph here..." rows={8}/>}
    {step.id==="roadmap"&&<div className="l45-progress"><div><span>التقدم الكلي</span><bdi dir="ltr">45 / 120</bdi></div><div className="l45-track"><span/></div></div>}
    <div className="l45-step-footer"><span>{index+1} / {LESSON_STEP_COUNT_45}</span><span>IQ200 · The Advice Intelligence Lab</span></div>
  </article>;
}

export default function Lesson45({onExit}:{onExit?:()=>void}) {
  const [area,setArea]=useState<"learn"|"test">("learn");
  const [step,setStep]=useState(0);
  const [menuOpen,setMenuOpen]=useState(false);
  const [visited,setVisited]=useState<Set<number>>(()=>new Set([0]));
  const [submitted,setSubmitted]=useState(false);
  const [score,setScore]=useState<number|null>(null);
  const mainRef=useRef<HTMLElement|null>(null);
  const goToStep=useCallback((target:number)=>{const n=Math.max(0,Math.min(LESSON_STEP_COUNT_45-1,target));setArea("learn");setStep(n);setVisited(p=>new Set(p).add(n));setMenuOpen(false);if(mainRef.current)mainRef.current.scrollTop=0;},[]);
  const switchArea=useCallback((next:"learn"|"test")=>{setArea(next);setMenuOpen(false);if(mainRef.current)mainRef.current.scrollTop=0;},[]);
  const prev=useCallback(()=>goToStep(step-1),[goToStep,step]);
  const next=useCallback(()=>goToStep(step+1),[goToStep,step]);
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{const t=e.target as HTMLElement|null;if(menuOpen||area!=="learn"||t&&(/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(t.tagName)||t.isContentEditable))return;if(e.key==="ArrowLeft"){e.preventDefault();next()}else if(e.key==="ArrowRight"){e.preventDefault();prev()}else if(e.key==="Home")goToStep(0);else if(e.key==="End")goToStep(LESSON_STEP_COUNT_45-1)};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[area,goToStep,menuOpen,next,prev]);
  const groups:Lesson1ShellGroup[]=useMemo(()=>STATIONS_45.map((st,idx)=>({section:`${String(idx+1).padStart(2,"0")} · ${st.name}`,items:STEPS_45.slice(st.start,st.end+1).map((s,i)=>({index:st.start+i,title:<span>{s.emoji} {s.title}</span>,navId:s.id}))})),[]);
  const station=STATIONS_45.find(st=>step>=st.start&&step<=st.end)??STATIONS_45[0]!;
  return <Lesson1Shell
    railTitle={<span>الدرس 45 · <English>{LESSON_TITLE_45}</English></span>}
    railSubtitle={<div className="mt-2 l45-rail-meta"><b>{LESSON_IDENTITY_45}</b><span>{LESSON_SUBTITLE_45}</span><small>42 خطوة · 25 سؤالًا · مختبرات تفاعلية</small></div>}
    groups={groups} activeIndex={area==="learn"?step:-1} markActiveStep={area==="learn"} railAriaLabel="فهرس محطات الدرس 45"
    railFooter={<div className="mt-2">زار المتعلم: <bdi dir="ltr">{visited.size} / {LESSON_STEP_COUNT_45}</bdi> خطوة</div>}
    isMenuOpen={menuOpen} onMenuOpenChange={setMenuOpen}
    headerContent={area==="learn"?<>{station.name} · {STEPS_45[step]!.title}</>: "الاختبار النهائي الشامل · 25 سؤالًا عبر 5 مستويات"}
    progress={area==="learn"?Math.round((step+1)/LESSON_STEP_COUNT_45*100):100} counter={area==="learn"?`${step+1} / ${LESSON_STEP_COUNT_45}`:"25 Q"} counterDir="ltr"
    contentKey={area==="learn"?`step-${step}`:area} contentArea={area} onSelectStep={goToStep}
    onPrev={area==="learn"?prev:()=>switchArea("learn")} onNext={next} showNext={area==="learn"}
    prevDisabled={area==="learn"&&step===0} nextDisabled={step===LESSON_STEP_COUNT_45-1}
    prevLabel={area==="learn"?"→ السابق":"→ العودة إلى التعلّم"} nextLabel="التالي ←" navAriaLabel="التنقل في الدرس 45"
    onExit={onExit} mainRef={mainRef} mainId="l45-main" rootDir="rtl" rootDataLesson={45} rootDataShell="lesson-1"
    rootClassName="advice45 style-b font-body relative flex h-screen flex-col overflow-hidden"
  >
    <nav className="l45-area-bar" aria-label="مساحات الدرس 45">
      <button className={area==="learn"?"is-active":""} onClick={()=>switchArea("learn")}>منطقة التعلّم <span>42</span></button>
      <button className={area==="test"?"is-active":""} onClick={()=>switchArea("test")}>الاختبار النهائي <span>{submitted&&score!==null?`${score}/25`:"25"}</span></button>
    </nav>
    {area==="learn"?<StepContent index={step}/>:<Suspense fallback={<p role="status" className="l45-loading">جارٍ تجهيز الاختبار النهائي...</p>}><TestArea45 onSubmitted={(n)=>{setScore(n);setSubmitted(true)}} submitted={submitted}/></Suspense>}
  </Lesson1Shell>;
}
