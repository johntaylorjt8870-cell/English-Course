import { SOURCE_SECTIONS_41 } from './ledger41';
import { PRACTICE_41 } from './practiceData41';
import { TEST_QUESTIONS_41 } from './testData41';
export const COVERAGE_41 = SOURCE_SECTIONS_41.map(section => ({
 id:section.id, number:section.num, title:section.title,
 destination:section.num===36?'TestArea41':section.num===37?'TeacherArea41 / SolutionsArea41':section.num===35?'Reading41 + PracticeSet41':section.num===38?'Writing41':PRACTICE_41.some(p=>p.section===section.num)?'PracticeSet41':'Steps41 / Lines41',
 units:section.units.map(unit=>({id:unit.id,text:unit.text})),
 items:section.num===36?TEST_QUESTIONS_41.map(q=>({id:q.id,parts:q.fields})):PRACTICE_41.filter(p=>p.section===section.num).map(p=>({id:p.id,parts:p.parts})),
 answerLocation:section.num===36||section.num===37?'Lazy SolutionsArea41 + TeacherGuide41':PRACTICE_41.some(p=>p.section===section.num)?'Attempt-bound PracticeCard41 + TeacherGuide41':'Inline source explanation',
}));
