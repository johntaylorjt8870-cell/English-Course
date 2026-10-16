import { TEST_LEVELS_42, TEST_QUESTIONS_42, TEST_QUESTION_COUNT_42, testComplete42, type TestAnswers42 } from './testData42';
import { Lines42, Panel42, Text42 } from './kit42';
export function TestArea42({answers,change,submitted,submit,reset,openSolutions}:{answers:TestAnswers42;change:(id:string,value:string)=>void;submitted:boolean;submit:()=>void;reset:()=>void;openSolutions:()=>void}) {
 const complete=testComplete42(answers),count=TEST_QUESTIONS_42.filter(q=>q.fields.every((_,i)=>answers[`${q.id}-${i}`]?.trim())).length;
 return <section data-area="test" data-source-section="s40"><Panel42 kicker="CAN & COULD MASTER TEST" title="اختبار مستقل — 25 سؤالًا · خمسة مستويات">
 <p className="source42-line">حاول حل الاختبار كاملًا قبل مراجعة مساحة المعلم.</p>
<p>لا يوجد تصحيح آلي للأسئلة التفسيرية؛ المراجعة للمقارنة بالمعنى.</p>
 <p role="status">المكتمل: <bdi dir="ltr">{count} / {TEST_QUESTION_COUNT_42}</bdi> {submitted?'— تم التسليم':''}</p>
 <progress aria-label="تقدم الإجابات" value={count} max={TEST_QUESTION_COUNT_42}/></Panel42>
 <form onSubmit={e=>{e.preventDefault();if(complete&&!submitted)submit();}}>
 {TEST_LEVELS_42.map(level=><Panel42 key={level.level} title={level.title}><div data-test-level={level.level}><Lines42 lines={level.context}/>{level.questions.map(q=><fieldset className="exercise42" key={q.id} data-question-id={q.id} disabled={submitted}><legend>السؤال {q.number}</legend><Lines42 lines={q.lines}/>{q.options.length?<div className="options42">{q.options.map((option,i)=><label key={option} className="option42"><input type="radio" name={q.id} value={option} checked={answers[`${q.id}-0`]===option} onChange={()=>change(`${q.id}-0`,option)} required/><Text42 text={option}/></label>)}</div>:q.fields.map((label,i)=><label key={i} className="field42">{label}<textarea required rows={q.number>=16&&q.number<=20?3:2} dir="auto" value={answers[`${q.id}-${i}`]??''} onChange={e=>change(`${q.id}-${i}`,e.target.value)}/></label>)}</fieldset>)}</div></Panel42>)}
 <div className="panel42 actions42"><button type="submit" className="primary42" disabled={!complete||submitted}>تسليم الاختبار النهائي</button><button type="button" onClick={reset}>إعادة الاختبار ومسح الإجابات</button>{submitted&&<button type="button" onClick={openSolutions}>مراجعة الحلول</button>}{!complete&&<p>أكمل كل سؤال، بما في ذلك الفراغان في السؤال 7، لفتح التسليم.</p>}</div>
 </form></section>;
}
