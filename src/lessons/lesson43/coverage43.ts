import { SOURCE_SECTIONS_43 } from './ledger43';
import { PRACTICE_43 } from './practiceData43';
import { TEST_QUESTIONS_43 } from './testData43';

// Every source section maps to its destination in the experience.
// Destination steps are 0-indexed (step index === section number).
const DESTINATIONS: Record<number, { destination: string; answerLocation: string }> = {
  0: { destination: 'الغلاف — الخطوة 0 (Cover43)', answerLocation: 'لا مفاتيح — تعريف المقرر' },
  1: { destination: 'الخطوة 1 — GoalList43', answerLocation: 'لا مفاتيح — أهداف المقرر' },
  2: { destination: 'الخطوة 2 — المصدر + ProbabilityExplorer43', answerLocation: 'الطيف الكيفي — تغذية راجعة فورية' },
  3: { destination: 'الخطوة 3 — المصدر + BuilderLab43', answerLocation: 'باني الجمل — قراءة فورية' },
  4: { destination: 'الخطوة 4 — المصدر + TransformMay43', answerLocation: 'تحويل الإثبات إلى نفي وسؤال' },
  5: { destination: 'الخطوة 5 — جدول الضمائر + DialLab43', answerLocation: 'قراءة فورية من القرص' },
  6: { destination: 'الخطوة 6 — المصدر + WILL vs MAY + WillMayCompare43', answerLocation: 'WILL ليست ضمانًا' },
  7: { destination: 'الخطوة 7 — المصدر + MayBeComposer43', answerLocation: 'مركّب MAY BE' },
  8: { destination: 'الخطوة 8 — المصدر + ModalFamily43Intro', answerLocation: 'لا مفاتيح — تعريف القناة' },
  9: { destination: 'الخطوة 9 — المصدر + فحص قاعدة MIGHT', answerLocation: 'ChoiceLab مغلق بالمحاولة' },
  10: { destination: 'الخطوة 10 — جدول الضمائر + DialLab43', answerLocation: 'قراءة فورية من القرص' },
  11: { destination: 'الخطوة 11 — المصدر + SwapLab43', answerLocation: 'اختبار التبديل MAY ↔ MIGHT' },
  12: { destination: 'الخطوة 12 — المصدر + TransformMay43', answerLocation: 'تحويلات MAY NOT' },
  13: { destination: 'الخطوة 13 — المصدر + NegationLab43', answerLocation: 'احتمال أم منع؟' },
  14: { destination: 'الخطوة 14 — المصدر + MustNotCompare43', answerLocation: 'MAY NOT ≠ MUST NOT' },
  15: { destination: 'الخطوة 15 — المصدر + PermissionStudio43', answerLocation: 'سلم اللباقة' },
  16: { destination: 'الخطوة 16 — المصدر + أمثلة الاستئذان', answerLocation: 'ChoiceLab درجات اللباقة' },
  17: { destination: 'الخطوة 17 — حوار المدير + PermissionStudio43', answerLocation: 'وسم الأدوار في الحوار' },
  18: { destination: 'الخطوة 18 — المصدر + MaybeLab43', answerLocation: 'مصنّف الوظيفة' },
  19: { destination: 'الخطوة 19 — المصدر + MaybeLab43 + تركيب MAYBE/MAY BE', answerLocation: 'تغطي أمثلة §19 وأسئلة §29' },
  20: { destination: 'الخطوة 20 — المصدر + PastPossibilityAnalyzer43', answerLocation: 'فك التركيب MAY HAVE + V3' },
  21: { destination: 'الخطوة 21 — المصدر + محلل الماضي + أزواج حاضر/ماضٍ', answerLocation: 'ChoiceLab مغلق بالمحاولة' },
  22: { destination: 'الخطوة 22 — حوار مايا وعمر + الجدول + المحلل', answerLocation: 'وسم التخمين الماضٍ' },
  23: { destination: 'الخطوة 23 — المصدر + MAY HAVE BEEN', answerLocation: 'ChoiceLab حالة سابقة' },
  24: { destination: 'الخطوة 24 — جدول الأفعال الأربعة + FourModalMatrix43', answerLocation: 'مصفوفة المعاني' },
  25: { destination: 'الخطوة 25 — الأسئلة الستة + DecisionGuide43', answerLocation: 'دليل القرار قبل الكتابة' },
  26: { destination: 'الخطوة 26 — الحوار الشامل + ContextDetective43', answerLocation: 'وسم الاستخدامات الثمانية' },
  27: { destination: 'الخطوة 27 — PracticeSet43(27)', answerLocation: 'مفتاح §27 بعد المحاولة — MAY أو MIGHT كلاهما مقبول' },
  28: { destination: 'الخطوة 28 — PracticeSet43(28)', answerLocation: 'مفتاح §28 بعد المحاولة' },
  29: { destination: 'الخطوة 29 — PracticeSet43(29) + MaybeLab43', answerLocation: 'مفتاح §29 بعد المحاولة' },
  30: { destination: 'الخطوة 30 — PracticeSet43(30)', answerLocation: 'مفتاح §30 بعد المحاولة — MAY وMIGHT قابلان للتبديل' },
  31: { destination: 'الخطوة 31 — ErrorRepair43 (تدريب §31 كاملًا)', answerLocation: 'مفتاح §31 بعد المحاولة' },
  32: { destination: 'الخطوة 32 — ReadingChallenge43 (تدريب §32 كاملًا)', answerLocation: 'مفاتيح §32 بعد المحاولة' },
  33: { destination: 'منطقة الاختبار المستقلة — TestArea43', answerLocation: 'مفاتيح §34 — لا تُعرض قبل التسليم' },
  34: { destination: 'بوابة المعلم — TeacherArea43 + SolutionsArea43 (lazy)', answerLocation: 'مفاتيح §34 كاملة' },
  35: { destination: 'الخطوة 35 — WritingMission43', answerLocation: 'قائمة تحقق من 10 بنود — لا تصحيح آلي للنثر' },
  36: { destination: 'الخطوة 36 — SummaryCards43 + المصدر', answerLocation: 'بطاقات القواعد الذهبية' },
  37: { destination: 'الخطوة 37 — Roadmap43 + المصدر', answerLocation: 'خريطة المنهج — الدرس 44 مخطط فقط' },
};

export type CoverageRow43 = { id: string; number: number; title: string; destination: string; answerLocation: string; units: { id: string; text: string }[]; items: { id: string; parts: string[] }[] };

export const COVERAGE_43: CoverageRow43[] = SOURCE_SECTIONS_43.map(section => {
  const meta = DESTINATIONS[section.num] ?? { destination: 'الخطوة الدراسية', answerLocation: 'المصدر' };
  const items = PRACTICE_43.filter(item => item.section === section.num).map(item => ({
    id: item.id, parts: [item.parts.join('+'), item.options.length ? `خيارات: ${item.options.length}` : 'كتابة حرة', `مفتاح: ${item.sourceAnswer}`],
  }));
  const testItems = section.num === 33 ? TEST_QUESTIONS_43.map(q => ({ id: q.id, parts: q.fields })) : [];
  return { id: section.id, number: section.num, title: section.title, destination: meta.destination, answerLocation: meta.answerLocation, units: section.units, items: [...items, ...testItems] };
});

export const COVERAGE_ACCURACY_NOTES_43 = [
  'نُقلت أقسام المصدر الـ38 (الغلاف + §§1–37) كاملة دون حذف أي قسم أو مثال أو سؤال أو إجابة.',
  'مفاتيح التدريبات §§27–32 من المصدر حرفيًا: §28 مفاتيح A B A C B A؛ §29 مفاتيح Maybe/may be بالتناوب؛ §30 نماذج إعادة صياغة؛ §31 الإصلاحات العشر بما فيها البند ⑧ المتعدد الحلول؛ §32 إجابات الفهم العشر.',
  'مفاتيح الاختبار الـ25 من §34 حرفيًا، بما فيها الحقول الثلاثة للسؤالين 9 و10 (الفعل الناقص / HAVE / V3).',
  '§27 يقرر صراحة قبول MAY أو MIGHT في كل البنود الستة — والمحرك يقبل الصيغتين ولا يرفض أيًّا منهما.',
  '§31 ⑧ يحتفظ بتعدد الحلول: May she come? صياغة ممكنة نحويًا، والاستخدام اليومي يفضل إعادة صياغة بحسب المعنى مثل Is she likely to come? — لا تُفرض إعادة صياغة واحدة.',
  'موقف المصدر من النسب محفوظ: لا توجد نسب مئوية ثابتة لـ MAY أو MIGHT، وMAY ليست دائمًا أقوى من MIGHT.',
  'التطبيعات الموثقة: إزالة الإيموجي وأعلام الأعلام من العناوين، وحذف أشرطة الزينة ━━━، وربط خلايا الجداول بـ | ، وإزالة الأسطر الفارغة الزائدة. لا تغيير في أي نص تعليمي.',
  'أسئلة §33 الخمسة والعشرون محفوظة في testData43 حرفيًا بما فيها سياق الحوار ذي الأسطر العشرة؛ ومفاتيحها في solutionsData43 مطابقة لـ §34 حرفيًا.',
];

export const COVERAGE_PLATFORM_ADDITIONS_43 = [
  'ProbabilityExplorer43: طيف احتمال كيفي (مؤكد/مرجح/ممكن/بعيد/مستحيل) بلا نسب مئوية — بنود تصنيف من إعداد المنصة.',
  'BuilderLab43 وDialLab43: أقراص تركيب الجمل — واجهة المنصة، أمثلة من سياق الدرس.',
  'SwapLab43: اختبار التبديل MAY ↔ MIGHT — بنود المنصة المستندة إلى أمثلة §11.',
  'NegationLab43 وMustNotCompare43: تصنيف الاحتمال السلبي مقابل المنع — بنود المنصة.',
  'PermissionStudio43: سلم اللباقة (Can I / Could I / May I / Might I) — ترتيب المنصة التربوي لمحتوى §§15–17.',
  'MaybeLab43: مصنّف وظيفة الكلمة (ظرف مقابل فعل ناقص + رابط) — يغطي أمثلة §19 وأسئلة §29 معًا.',
  'PastPossibilityAnalyzer43: فك تركيب MAY HAVE + V3 وخريطة المسار الزمني — واجهة المنصة.',
  'FourModalMatrix43 وDecisionGuide43: مصفوفة الأفعال الأربعة والأسئلة الستة — أسئلة المنصة المستندة إلى §24–25.',
  'ContextDetective43: وسم الاستخدامات الثمانية في حوار §26 — أزواج سؤال/جواب من إعداد المنصة.',
  'practiceNotes43.ts: سبب كل مفتاح تدريب — شرح المنصة، المفتاح نفسه من المصدر.',
  'solutionsData43.ts: جملة السبب لكل سؤال اختبار — شرح المنصة، المفتاح من §34.',
  'WritingMission43: نموذج إرشادي موسوم «إضافة المنصة» وقائمة التحقق العشرية.',
  'دليل المعلم: تسلسل زمني مقترح وتصورات خاطئة وسلم تقييم — كلها من إعداد المنصة.',
  'الهوية البصرية «مرصد الاحتمالات» وألوان القنوات (teal لـ MAY وamber لـ MIGHT) — تصميم المنصة.',
];
