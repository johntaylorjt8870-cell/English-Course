import { TEST_LEVELS_44, TEST_QUESTIONS_44, TEST_QUESTION_COUNT_44, testComplete44, type TestAnswers44 } from './testData44';
import { Lines44, Panel44, Text44 } from './kit44';
export function TestArea44({answers,change,submitted,submit,reset,openSolutions}:{answers:TestAnswers44;change:(id:string,value:string)=>void;submitted:boolean;submit:()=>void;reset:()=>void;openSolutions:()=>void}) {
 const complete=testComplete44(answers),count=TEST_QUESTIONS_44.filter(q=>q.fields.every((_,i)=>Boolean(answers[`${q.id}-${i}`]?.trim()))).length;
 return <section data-area="test" data-source-section="s34"><Panel44 kicker="INDEPENDENT ASSESSMENT" title="الاختبار النهائي — MUST &amp; HAVE TO Master Test">
 <p>25 سؤالًا — خمسة مستويات — اختبار شامل.</p>
 <p className="source44-line">حاول حل الاختبار دون الرجوع إلى الشرح.</p>
<p>لا يوجد تصحيح آلي للأسئلة التفسيرية؛ المراجعة بالمقارنة مع المعنى. لا تُعرض المفاتيح قبل التسليم.</p>
 <p role="status">المكتمل: <bdi dir="ltr">{count} / {TEST_QUESTION_COUNT_44}</bdi> {submitted?'— تم التسليم':''}</p>
 <progress aria-label="تقدم الإجابات" value={count} max={TEST_QUESTION_COUNT_44}/></Panel44>
 <form onSubmit={e=>{e.preventDefault();if(complete&&!submitted)submit();}}>
 {TEST_LEVELS_44.map(level=><Panel44 key={level.level} title={level.title} tone="challenge"><div data-test-level={level.level}><Lines44 lines={level.context}/>{level.questions.map(q=><fieldset className="exercise44" key={q.id} data-question-id={q.id} disabled={submitted}><legend>السؤال {q.number}</legend><Lines44 lines={q.lines}/>{q.options.length?<div className="options44">{q.options.map((option,i)=><label key={option} className="option44"><input type="radio" name={q.id} value={option} checked={answers[`${q.id}-0`]===option} onChange={()=>change(`${q.id}-0`,option)} required/><Text44 text={option}/></label>)}</div>:q.fields.map((label,i)=><label key={i} className="field44">{label}<textarea required rows={q.number>=16&&q.number<=20?3:2} dir="auto" value={answers[`${q.id}-${i}`]??''} onChange={e=>change(`${q.id}-${i}`,e.target.value)}/></label>)}</fieldset>)}</div></Panel44>)}
 <div className="panel44 actions44"><button type="submit" className="primary44" disabled={!complete||submitted}>تسليم الاختبار النهائي</button><button type="button" onClick={reset}>إعادة الاختبار ومسح الإجابات</button>{submitted&&<button type="button" onClick={openSolutions}>مراجعة الحلول</button>}{!complete&&<p>أكمل كل سؤال، بما في ذلك الحقول في السؤالين 9 و10، لفتح التسليم.</p>}</div>
 </form></section>;
}
