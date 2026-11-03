import {useState} from 'react';

type LabQuestion = { sentence:string; condition:'past'|'present'; result:'past'|'present'; explanation:string };
const examples:LabQuestion[] = [
 {sentence:'If I had studied medicine, I would be a doctor now.',condition:'past',result:'present',explanation:'الدراسة فرصة ماضية؛ العمل طبيبًا نتيجة حاضرة.'},
 {sentence:"If I were more careful, I wouldn't have made that mistake yesterday.",condition:'present',result:'past',explanation:'الحذر صفة حالية؛ الخطأ حدث أمس.'},
 {sentence:'If I had studied harder, I would have passed the exam.',condition:'past',result:'past',explanation:'الدراسة والنجاح كلاهما في الماضي الافتراضي: Third Conditional.'},
 {sentence:'If I had more time, I would learn Spanish.',condition:'present',result:'present',explanation:'الوقت المتاح والتعلم افتراضيان في الحاضر أو المستقبل: Second Conditional.'},
];
const labels={past:'الماضي',present:'الحاضر / المستقبل'};
export function TimelineLab55(){
 const [index,setIndex]=useState(0); const [condition,setCondition]=useState(''); const [result,setResult]=useState(''); const [checked,setChecked]=useState(false); const q=examples[index];
 const reset=()=>{setCondition('');setResult('');setChecked(false)};
 return <div className="l55-lab"><p>اختر زمن المعنى في كل جزء، لا شكل الفعل وحده. تتضمن الجولة الأنواع الأربعة.</p><div className="l55-track"><span>PAST</span><span aria-hidden="true">⟷</span><span>NOW</span></div><p dir="ltr" lang="en" className="l55-en">{q.sentence}</p>
 <fieldset><legend>زمن الشرط</legend>{(['past','present'] as const).map(x=><button type="button" key={x} aria-pressed={condition===x} onClick={()=>{setCondition(x);setChecked(false)}}>{labels[x]}</button>)}</fieldset>
 <fieldset><legend>زمن النتيجة</legend>{(['past','present'] as const).map(x=><button type="button" key={x} aria-pressed={result===x} onClick={()=>{setResult(x);setChecked(false)}}>{labels[x]}</button>)}</fieldset>
 <button type="button" disabled={!condition||!result} onClick={()=>setChecked(true)}>تحقق</button>{checked&&<div role="status" className="l55-feedback">{condition===q.condition&&result===q.result?'أحسنت!':'حاول مجددًا.'} {q.explanation}</div>}<button type="button" onClick={reset}>إعادة المحاولة</button><button type="button" onClick={()=>{setIndex((index+1)%examples.length);reset()}}>مثال آخر ({index+1}/{examples.length})</button></div>;
}
const pieces=['What','would you do now','if you had accepted that job?'];
export function QuestionBuilder55(){
 const [chosen,setChosen]=useState<number[]>([]); const [checked,setChecked]=useState(false); const good=chosen.join(',')==='0,1,2';
 return <div className="l55-lab"><p>رتّب أجزاء السؤال بالنقر عليها بالترتيب، ثم تحقّق. يمكنك إزالة آخر جزء وإعادة المحاولة.</p><div className="l55-builder" dir="ltr" lang="en">{chosen.map(i=><span key={i}>{pieces[i]} </span>)}{!chosen.length&&<span>...</span>}</div><div dir="ltr">{[2,0,1].map(i=><button key={i} type="button" disabled={chosen.includes(i)} onClick={()=>{setChosen([...chosen,i]);setChecked(false)}}>{pieces[i]}</button>)}</div><button type="button" disabled={!chosen.length} onClick={()=>{setChosen(chosen.slice(0,-1));setChecked(false)}}>إزالة الأخير</button><button type="button" disabled={chosen.length!==3} onClick={()=>setChecked(true)}>تحقق</button><button type="button" onClick={()=>{setChosen([]);setChecked(false)}}>إعادة المحاولة</button>{checked&&<p role="status" className="l55-feedback">{good?'أحسنت! تبدأ أداة السؤال ثم would والفاعل، ثم جملة if.':'راجع ترتيب أداة السؤال والفاعل وجملة if، ثم حاول مجددًا.'}</p>}</div>;
}
