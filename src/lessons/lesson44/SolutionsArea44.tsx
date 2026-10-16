import { TEST_SOLUTIONS_44 } from './solutionsData44';
import { TEST_QUESTIONS_44, type TestAnswers44 } from './testData44';
import { Panel44, Lines44, Text44 } from './kit44';
export default function SolutionsArea44({answers={},teacher=false}:{answers?:TestAnswers44;teacher?:boolean}) {
 return <section data-area="solutions"><Panel44 kicker="REVIEW & REASONING" title="الحلول التفصيلية — 25 سؤالًا">
 <p>كل المفاتيح الـ25 واردة في §34 من المصدر، والشرح التفصيلي من إعداد المنصة. هذه مراجعة ذاتية بالمقارنة، وليست درجة آلية.</p></Panel44>
 {TEST_SOLUTIONS_44.map((solution,i)=><Panel44 key={solution.id} title={`السؤال ${solution.number}`} tone="rule"><Lines44 lines={TEST_QUESTIONS_44[i].lines}/>
 {!teacher&&<div className="reference44"><b>إجابتك</b><Lines44 lines={TEST_QUESTIONS_44[i].fields.map((_,j)=>answers[`${solution.id}-${j}`]||'لم تجب')}/></div>}
 <div className="feedback44"><b>الإجابة</b><Lines44 lines={[solution.answer,solution.reason]}/></div>
 <p className="label44"><Text44 text={solution.provenance}/></p></Panel44>)}</section>;
}
