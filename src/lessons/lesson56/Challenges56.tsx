import {useState} from 'react';
import {LatinRuns} from '../../shared/bidi';
import {practiceGroups} from './practice';

const errors = [
 {location:'will heat', reason:'حقيقة عامة: نستخدم المضارع البسيط في الجملتين.'},
 {location:'have',reason:'الافتراض الحالي يحتاج الماضي البسيط بعد If.'},
 {location:'would pass',reason:'النتيجة ماضية: نستخدم would have + V3.'},
 {location:'لا خطأ',reason:'الجملة صحيحة: شرط ماضٍ ونتيجة حاضرة. have هنا بمعنى يملك.'},
 {location:"wouldn't break",reason:'النتيجة ماضية: نستخدم would not have + V3.'},
 {location:'would see',reason:'في هذا التركيب لا نستخدم would بعد If.'},
 {location:'went',reason:'بعد had نستخدم التصريف الثالث gone.'},
 {location:'will travel',reason:'Second Conditional يستخدم would + V1.'},
 {location:'would have worked',reason:'النتيجة مستمرة في الحاضر: would be working.'},
 {location:'لا خطأ',reason:'was مقبولة في غير الرسمي؛ were الصيغة التقليدية الأكثر أمانًا في الاختبارات.'},
];
const locations = [['will heat','boils','لا خطأ'],['have','would buy','لا خطأ'],['had studied','would pass','لا خطأ'],['had learned','would have','لا خطأ'],["wouldn't break",'were','لا خطأ'],['would see','will tell','لا خطأ'],['went','would have arrived','لا خطأ'],['were','will travel','لا خطأ'],['had accepted','would have worked','لا خطأ'],['was','would not have forgotten','لا خطأ']];
export function ErrorDetective56(){
 const [index,setIndex]=useState(0),[location,setLocation]=useState(''),[reason,setReason]=useState(''),[correction,setCorrection]=useState(''),[checked,setChecked]=useState(false);
 const item=practiceGroups[3].items[index], info=errors[index];
 function next(){setIndex((index+1)%errors.length);setLocation('');setReason('');setCorrection('');setChecked(false)}
 const matches=(a:string,b:string)=>a.toLowerCase().replace(/[.,!?]/g,'').replace(/\s+/g,' ').trim()===b.toLowerCase().replace(/[.,!?]/g,'').replace(/\s+/g,' ').trim();
 const expected=info.location==='لا خطأ'?item.prompt:item.answer;
 return <section className="l56-radar"><p>حدّد الموضع والسبب ثم أعد كتابة الجملة. قد تكون الجملة صحيحة أصلًا. التصحيح بعد الضغط على تحقق فقط.</p><p dir="ltr" lang="en" className="l56-en">{item.prompt}</p><label>الموضع <select value={location} onChange={e=>{setLocation(e.target.value);setChecked(false)}}><option value="">اختر</option>{locations[index].map(x=><option key={x}>{x}</option>)}</select></label>{' '}<label>السبب <select value={reason} onChange={e=>{setReason(e.target.value);setChecked(false)}}><option value="">اختر</option>{[...new Set([info.reason,errors[(index+1)%errors.length].reason,errors[(index+3)%errors.length].reason])].sort().map(x=><option key={x}>{x}</option>)}</select></label><label>التصحيح أو إعادة كتابة الجملة الصحيحة<textarea dir="ltr" lang="en" value={correction} onChange={e=>{setCorrection(e.target.value);setChecked(false)}}/></label><button disabled={!location||!reason||!correction.trim()} onClick={()=>setChecked(true)}>تحقق من التحليل</button>{checked&&<div role="status" className="l56-answer"><p>{location===info.location&&reason===info.reason?'تحليل الموضع والسبب صحيح.':'راجع الموضع والسبب.'}</p><p>{matches(correction,expected)?'الجملة تطابق النموذج.':'قارن صياغتك بالنموذج؛ قد توجد صياغات صحيحة أخرى.'}</p><p dir="ltr" lang="en">{expected}</p><p><LatinRuns text={info.reason}/></p></div>}<button onClick={next}>الجملة التالية ({index+1}/{errors.length})</button></section>
}
export const comparisonGroups = [
 {scenario:'تخيل وضعًا ماليًا مختلفًا الآن وشراء سيارة مستقبلًا.',answer:0,lines:['If I had more money, I would buy a car.','If I had had more money, I would have bought a car.','If I had saved more money, I would own a car now.'],translations:['لو كان لدي مال أكثر، لاشتريت سيارة.','لو كان لدي مال أكثر في الماضي، لكنت اشتريت سيارة.','لو كنت قد ادخرت مالًا أكثر، لامتلكت سيارة الآن.'],explain:'A: Second Conditional؛ أتحدث عن وضعي الحالي. B: Third Conditional؛ أتحدث عن فرصة ماضية انتهت. C: Mixed Conditional؛ شرط في الماضي ونتيجة حاضرة.'},
 {scenario:'صفة حالية افتراضية تؤثر في خطأ محدد وقع أمس.',answer:2,lines:["If she were more careful, she wouldn't make mistakes.","If she had been more careful, she wouldn't have made that mistake.","If she were more careful, she wouldn't have made that mistake yesterday."],translations:['لو كانت أكثر حذرًا، لما ارتكبت أخطاء.','لو كانت أكثر حذرًا، لما ارتكبت ذلك الخطأ.','لو كانت أكثر حذرًا، لما ارتكبت ذلك الخطأ أمس.'],explain:'A: Second Conditional؛ افتراض عن صفة حالية ونتيجة عامة أو مستقبلية. B: Third Conditional؛ شرط ونتيجة في الماضي. C: Mixed Conditional النوع الثاني؛ صفة حالية ونتيجة ماضية.'},
 {scenario:'تعلم لم يحدث في الماضي ونتيجة افتراضية في الحاضر.',answer:2,lines:['If I learned English, I would work abroad.','If I had learned English, I would have worked abroad.','If I had learned English, I would work abroad now.'],translations:['لو تعلمت الإنجليزية، لعملت في الخارج.','لو كنت قد تعلمت الإنجليزية، لكنت عملت في الخارج.','لو كنت قد تعلمت الإنجليزية، لعملت في الخارج الآن.'],explain:'A: Second Conditional. B: Third Conditional. C: Mixed Conditional النوع الأول. عندما ترى had، لا تفترض مباشرة أن الجملة Third Conditional؛ انظر إلى زمن النتيجة أيضًا.'}
];
export function ComparisonChallenge56(){const [chosen,setChosen]=useState<Record<number,number>>({}),[checked,setChecked]=useState<Record<number,boolean>>({});return <><p>اختر الجملة الأنسب لكل سياق، ثم تحقق من الفرق بين الجمل الثلاث.</p>{comparisonGroups.map((g,i)=><section className="l56-radar" key={g.scenario}><h3>{g.scenario}</h3>{g.lines.map((line,j)=><button type="button" key={line} dir="ltr" lang="en" aria-pressed={chosen[i]===j} onClick={()=>{setChosen({...chosen,[i]:j});setChecked({...checked,[i]:false})}}>{String.fromCharCode(65+j)}. {line}</button>)}<button type="button" disabled={chosen[i]===undefined} onClick={()=>setChecked({...checked,[i]:true})}>تحقق من المقارنة</button>{checked[i]&&<div role="status" className="l56-answer"><p>{chosen[i]===g.answer?'أحسنت!':'راجع السياق.'} <LatinRuns text={g.explain}/></p>{g.translations.map((t,j)=><p key={t}>{String.fromCharCode(65+j)}. {t}</p>)}</div>}</section>)}</>}
