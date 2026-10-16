import { TEST_LEVELS_43, TEST_QUESTIONS_43, TEST_QUESTION_COUNT_43, testComplete43, type TestAnswers43 } from './testData43';
import { Lines43, Panel43, Text43 } from './kit43';
export function TestArea43({answers,change,submitted,submit,reset,openSolutions}:{answers:TestAnswers43;change:(id:string,value:string)=>void;submitted:boolean;submit:()=>void;reset:()=>void;openSolutions:()=>void}) {
 const complete=testComplete43(answers),count=TEST_QUESTIONS_43.filter(q=>q.fields.every((_,i)=>Boolean(answers[`${q.id}-${i}`]?.trim()))).length;
 return <section data-area="test" data-source-section="s33"><Panel43 kicker="INDEPENDENT ASSESSMENT" title="الاختبار النهائي — MAY &amp; MIGHT Master Test">
 <p>25 سؤالًا — خمسة مستويات — اختبار شامل.</p>
 <p className="source43-line">حاول حل الاختبار دون الرجوع إلى الشرح.</p>
<p>لا يوجد تصحيح آلي للأسئلة التفسيرية؛ المراجعة للمقارنة بالمعنى. لا تُعرض المفاتيح قبل التسليم.</p>
 <p role="status">المكتمل: <bdi dir="ltr">{count} / {TEST_QUESTION_COUNT_43}</bdi> {submitted?'— تم التسليم':''}</p>
 <progress aria-label="تقدم الإجابات" value={count} max={TEST_QUESTION_COUNT_43}/></Panel43>
 <form onSubmit={e=>{e.preventDefault();if(complete&&!submitted)submit();}}>
 {TEST_LEVELS_43.map(level=><Panel43 key={level.level} title={level.title} tone="challenge"><div data-test-level={level.level}><Lines43 lines={level.context}/>{level.questions.map(q=><fieldset className="exercise43" key={q.id} data-question-id={q.id} disabled={submitted}><legend>السؤال {q.number}</legend><Lines43 lines={q.lines}/>{q.options.length?<div className="options43">{q.options.map((option,i)=><label key={option} className="option43"><input type="radio" name={q.id} value={option} checked={answers[`${q.id}-0`]===option} onChange={()=>change(`${q.id}-0`,option)} required/><Text43 text={option}/></label>)}</div>:q.fields.map((label,i)=><label key={i} className="field43">{label}<textarea required rows={q.number>=16&&q.number<=20?3:2} dir="auto" value={answers[`${q.id}-${i}`]??''} onChange={e=>change(`${q.id}-${i}`,e.target.value)}/></label>)}</fieldset>)}</div></Panel43>)}
 <div className="panel43 actions43"><button type="submit" className="primary43" disabled={!complete||submitted}>تسليم الاختبار النهائي</button><button type="button" onClick={reset}>إعادة الاختبار ومسح الإجابات</button>{submitted&&<button type="button" onClick={openSolutions}>مراجعة الحلول</button>}{!complete&&<p>أكمل كل سؤال، بما في ذلك الحقول الثلاثة في السؤالين 9 و10، لفتح التسليم.</p>}</div>
 </form></section>;
}
