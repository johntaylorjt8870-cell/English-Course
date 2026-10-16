import { TEST_SOLUTIONS_43 } from './solutionsData43';
import { TEST_QUESTIONS_43, type TestAnswers43 } from './testData43';
import { Panel43, Lines43, Text43 } from './kit43';
export default function SolutionsArea43({answers={},teacher=false}:{answers?:TestAnswers43;teacher?:boolean}) {
 return <section data-area="solutions"><Panel43 kicker="REVIEW &amp; REASONING" title="الحلول التفصيلية — 25 سؤالًا">
 <p>كل المفاتيح الـ25 واردة في §34 من المصدر، والشرح التفصيلي من إعداد المنصة. هذه مراجعة ذاتية بالمقارنة، وليست درجة آلية.</p></Panel43>
 {TEST_SOLUTIONS_43.map((solution,i)=><Panel43 key={solution.id} title={`السؤال ${solution.number}`} tone="rule"><Lines43 lines={TEST_QUESTIONS_43[i].lines}/>
 {!teacher&&<div className="reference43"><b>إجابتك</b><Lines43 lines={TEST_QUESTIONS_43[i].fields.map((_,j)=>answers[`${solution.id}-${j}`]||'لم تجب')}/></div>}
 <div className="feedback43"><b>الإجابة</b><Lines43 lines={[solution.answer,solution.reason]}/></div>
 <p className="label43"><Text43 text={solution.provenance}/></p></Panel43>)}</section>;
}
