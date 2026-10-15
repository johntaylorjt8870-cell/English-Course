import { TEST_SOLUTIONS_41 } from './solutionsData41';
import { TEST_QUESTIONS_41, type TestAnswers41 } from './testData41';
import { Panel41, Lines41, Text41 } from './kit41';
export default function SolutionsArea41({answers={},teacher=false}:{answers?:TestAnswers41;teacher?:boolean}) {
 return <section data-area="solutions"><Panel41 kicker="REVIEW & REASONING" title="الحلول التفصيلية — 25 سؤالًا"><p>§37 في المصدر لا يحتوي مفتاحًا تفصيليًا. حلول 1–20 وشروح جميع الأسئلة من إعداد المنصة. مفاتيح 21–25 واردة في متطلبات المهمة. هذه مراجعة ذاتية وليست درجة آلية.</p></Panel41>{TEST_SOLUTIONS_41.map((solution,i)=><Panel41 key={solution.id} title={`السؤال ${solution.number}`}><Lines41 lines={TEST_QUESTIONS_41[i].lines}/>{!teacher&&<div className="reference41"><b>إجابتك</b><Lines41 lines={TEST_QUESTIONS_41[i].fields.map((_,j)=>answers[`${solution.id}-${j}`]||'لم تجب')}/></div>}<div className="feedback41"><b>الإجابة</b><Lines41 lines={[solution.answer,solution.reason]}/></div><p className="label41"><Text41 text={solution.provenance}/></p></Panel41>)}</section>;
}
