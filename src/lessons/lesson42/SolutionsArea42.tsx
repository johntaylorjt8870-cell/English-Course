import { TEST_SOLUTIONS_42 } from './solutionsData42';
import { TEST_QUESTIONS_42, type TestAnswers42 } from './testData42';
import { Panel42, Lines42, Text42 } from './kit42';
export default function SolutionsArea42({answers={},teacher=false}:{answers?:TestAnswers42;teacher?:boolean}) {
 return <section data-area="solutions"><Panel42 kicker="REVIEW & REASONING" title="الحلول التفصيلية — 25 سؤالًا">
 <p>كل المفاتيح الـ25 واردة في §41 من المصدر، والشرح التفصيلي من إعداد المنصة. هذه مراجعة ذاتية بالمقارنة، وليست درجة آلية.</p></Panel42>
 {TEST_SOLUTIONS_42.map((solution,i)=><Panel42 key={solution.id} title={`السؤال ${solution.number}`}><Lines42 lines={TEST_QUESTIONS_42[i].lines}/>
 {!teacher&&<div className="reference42"><b>إجابتك</b><Lines42 lines={TEST_QUESTIONS_42[i].fields.map((_,j)=>answers[`${solution.id}-${j}`]||'لم تجب')}/></div>}
 <div className="feedback42"><b>الإجابة</b><Lines42 lines={[solution.answer,solution.reason]}/></div>
 <p className="label42"><Text42 text={solution.provenance}/></p></Panel42>)}</section>;
}
