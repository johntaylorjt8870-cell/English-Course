import { SOURCE_SECTIONS_42 } from './ledger42';
import { PRACTICE_42 } from './practiceData42';
import { TEST_QUESTIONS_42 } from './testData42';
export const COVERAGE_SECTION_COUNT_42 = 44;
export const COVERAGE_STEP_COUNT_42 = 45;
export const COVERAGE_42 = SOURCE_SECTIONS_42.map(section => ({
 id:section.id, number:section.num, title:section.title,
 destination:section.num===40?'TestArea42':section.num===41?'TeacherArea42 / SolutionsArea42':section.num===39?'ReadingChallenge42 + PracticeSet42':section.num===42?'WritingMission42':PRACTICE_42.some(p=>p.section===section.num)?'PracticeSet42':'Steps42 / Lines42',
 units:section.units.map(unit=>({id:unit.id,text:unit.text})),
 items:section.num===40?TEST_QUESTIONS_42.map(q=>({id:q.id,parts:q.fields})):PRACTICE_42.filter(p=>p.section===section.num).map(p=>({id:p.id,parts:p.parts})),
 answerLocation:section.num===40||section.num===41?'Lazy SolutionsArea42 + TeacherGuide42':PRACTICE_42.some(p=>p.section===section.num)?'Attempt-bound PracticeCard42 + TeacherGuide42':'Inline source explanation',
}));
// Documented accuracy notes — what changed, what did not, and why.
export const COVERAGE_ACCURACY_NOTES_42 = [
 'النص كاملًا محفوظ في source42.ts؛ الأقسام 1–44 مرقّمة كما في المصدر، والغلاف قسم 0.',
 'أُزيلت فقط أشرطة الزينة ━━━ وفواصل الأسطر الفارغة، وحُذفت أعلام الإيموجي من العناوين؛ لا حذف لأي مثال أو بند.',
 'حُذف علم الإيموجي (زوج regional-indicator) من سطر «الدرس القادم: Lesson 43» لأنه ممنوع في المستودع (check-english-direction)؛ النص محفوظ كما ورد.',
 'رُقّمت الجداول بفاصل « | » داخل الأسطر لتصييرها جداول HTML حقيقية دون تغيير محتواها.',
 'علامة الاستفهام العربية (؟) في نهاية الجمل الإنجليزية طُبّعت إلى (?) — تطبيع ترقيمي فقط دون تغيير الكلمات.',
 'لا تبقى في النص المنشور أي علامة استفهام عربية تلحق جملة إنجليزية تنتهي عند نهاية السطر أو يتبعها لاتيني (تحقّق آلي في audit-lesson42.mjs)؛ أما الجمل العربية التي تستشهد بعبارة إنجليزية فتحتفظ بـ(؟) كما في المصدر.',
 'عبارة الترجمة العربية «هل يمكنك إعادة السؤال؟» مقابل Could you repeat the question؟ محفوظة كما وردت رغم عدم تطابق الضمير.',
 'نص §39 وقائمة الأسئلة العشرة محفوظان كما وردا؛ الأسئلة تُعرض كاملة قبل بطاقات المحاولة.',
 '§40 يحتفظ بالأسئلة الـ25 الخمسة مستويات؛ §41 يحتفظ بكل المفاتيح الـ25 وسبب كل مفتاح.',
 'نموذج §42 الإرشادي ثماني جمل فقط؛ عُرض بوصفه مرجعًا جزئيًا لا إجابة كاملة.',
 'خريطة §44 تعرض 42/120 كرقم منهج، لا كعدّاد إتقان شخصي.',
];
// Platform-authored additions, each labelled in the UI.
export const COVERAGE_PLATFORM_ADDITIONS_42 = [
 'غلاف Language Control Lab ولوحة التحكم Subject + CAN/COULD + V1.',
 'Modal Meaning Lab (12 جملة) وContext Detective (3 جمل × سياقات).',
 'Sentence Builder (5 جمل) مع كشف أخطاء cans / to / DO / V2 / V-ing.',
 'Politeness Studio (6 مواقف) وPast Ability vs Specific Success (6 بنود).',
 'Error Repair Lab (10 أخطاء من §31 مع تشخيص نوع الخطأ).',
 'Transform Console للنفي والسؤال، وChoice Labs لمحطات القدرة والإجابة القصيرة وأسئلة WH والإمكانية والاقتراح.',
 'شرح المنصة تحت كل حل مصدر في التدريبات والقراءة.',
 'عدّاد الجمل في مهمة الكتابة وقائمة التحقق الذاتية العشرة.',
 'دليل المعلم وسلم تقييم الكتابة ومصفوفة التغطية.',
 'لوحة الألوان والهوية البصرية لمختبر التحكم باللغة.',
];
