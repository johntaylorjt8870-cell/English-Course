import { SOURCE_SECTIONS_44 } from './ledger44';
import { PRACTICE_44 } from './practiceData44';
import { TEST_QUESTIONS_44 } from './testData44';

const DESTINATIONS: Record<number, { destination: string; answerLocation: string }> = {
  0: { destination: 'الغلاف — الخطوة 0 (Cover44)', answerLocation: 'لا مفاتيح — تعريف المقرر' },
  1: { destination: 'الخطوة 1 — GoalList44', answerLocation: 'لا مفاتيح — أهداف المقرر' },
  2: { destination: 'الخطوة 2 — المصدر + ObligationBuilder44', answerLocation: 'باني جمل الضرورة' },
  3: { destination: 'الخطوة 3 — المصدر + فحص قاعدة MUST', answerLocation: 'ChoiceLab مغلق بالمحاولة' },
  4: { destination: 'الخطوة 4 — المصدر', answerLocation: 'أمثلة الضرورة الشخصية' },
  5: { destination: 'الخطوة 5 — المصدر', answerLocation: 'قوانين وتعليمات' },
  6: { destination: 'الخطوة 6 — المصدر', answerLocation: 'توصية قوية' },
  7: { destination: 'الخطوة 7 — المصدر + فحص HAVE TO', answerLocation: 'ChoiceLab مغلق بالمحاولة' },
  8: { destination: 'الخطوة 8 — المصدر', answerLocation: 'HAS TO مع المفرد الغائب' },
  9: { destination: 'الخطوة 9 — المصدر', answerLocation: 'متى نستخدم HAVE TO' },
  10: { destination: 'الخطوة 10 — المصدر', answerLocation: 'MUST vs HAVE TO — اتجاه شائع' },
  11: { destination: 'الخطوة 11 — المصدر', answerLocation: 'جدول المقارنة' },
  12: { destination: 'الخطوة 12 — حوار Preparing for the Exam', answerLocation: 'وسم الاستخدامات' },
  13: { destination: 'الخطوة 13 — المصدر + ProhibitionSorter44', answerLocation: 'منع أم عدم ضرورة' },
  14: { destination: 'الخطوة 14 — المصدر + MUSTN\'T Check', answerLocation: 'ChoiceLab المنع' },
  15: { destination: 'الخطوة 15 — المصدر', answerLocation: "DON'T HAVE TO" },
  16: { destination: 'الخطوة 16 — المصدر', answerLocation: 'مقارنة تغيّر المعنى' },
  17: { destination: 'الخطوة 17 — المصدر', answerLocation: 'السؤال مع HAVE TO' },
  18: { destination: 'الخطوة 18 — المصدر', answerLocation: 'الإجابات القصيرة' },
  19: { destination: 'الخطوة 19 — المصدر', answerLocation: 'MUST في السؤال' },
  20: { destination: 'الخطوة 20 — المصدر + TenseMachine44 + Past Check', answerLocation: 'آلة الأزمنة + ChoiceLab' },
  21: { destination: 'الخطوة 21 — المصدر', answerLocation: "DIDN'T HAVE TO" },
  22: { destination: 'الخطوة 22 — المصدر', answerLocation: 'السؤال في الماضي' },
  23: { destination: 'الخطوة 23 — المصدر + Future Check', answerLocation: 'WILL HAVE TO + ChoiceLab' },
  24: { destination: 'الخطوة 24 — المصدر', answerLocation: 'جدول مقارنة الأزمنة' },
  25: { destination: 'الخطوة 25 — المصدر', answerLocation: 'MUST vs SHOULD' },
  26: { destination: 'الخطوة 26 — حوار Science Competition', answerLocation: 'وسم الاستخدامات السبعة' },
  27: { destination: 'الخطوة 27 — GrammarDetective44', answerLocation: 'الأخطاء العشرة — كشف بعد المحاولة' },
  28: { destination: 'الخطوة 28 — PracticeSet44(28)', answerLocation: 'مفتاح §28 بعد المحاولة' },
  29: { destination: 'الخطوة 29 — PracticeSet44(29)', answerLocation: 'مفتاح §29 بعد المحاولة' },
  30: { destination: 'الخطوة 30 — PracticeSet44(30)', answerLocation: 'مفتاح §30 بعد المحاولة' },
  31: { destination: 'الخطوة 31 — PracticeSet44(31)', answerLocation: 'مفتاح §31 بعد المحاولة' },
  32: { destination: 'الخطوة 32 — PracticeSet44(32)', answerLocation: 'مفتاح §32 بعد المحاولة' },
  33: { destination: 'الخطوة 33 — ReadingChallenge44', answerLocation: 'أسئلة الفهم العشر — مقارنة بعد المحاولة' },
  34: { destination: 'منطقة الاختبار المستقلة — TestArea44', answerLocation: 'مفاتيح §34 — لا تُعرض قبل التسليم' },
  35: { destination: 'بوابة المعلم — TeacherArea44 + SolutionsArea44', answerLocation: 'مفاتيح §34 كاملة' },
  36: { destination: 'الخطوة 36 — WritingMission44', answerLocation: 'قائمة تحقق من 10 بنود' },
  37: { destination: 'الخطوة 37 — SummaryCards44 + المصدر', answerLocation: 'بطاقات الملخص الذهبي' },
  38: { destination: 'الخطوة 38 — Roadmap44', answerLocation: 'خريطة التقدم — الدرس 45 مخطط فقط' },
};

export type CoverageRow44 = { id: string; number: number; title: string; destination: string; answerLocation: string; units: { id: string; text: string }[]; items: { id: string; parts: string[] }[] };

export const COVERAGE_44: CoverageRow44[] = SOURCE_SECTIONS_44.map(section => {
  const meta = DESTINATIONS[section.num] ?? { destination: 'الخطوة الدراسية', answerLocation: 'المصدر' };
  const items = PRACTICE_44.filter(item => item.section === section.num).map(item => ({
    id: item.id, parts: [item.parts.join('+'), item.options.length ? `خيارات: ${item.options.length}` : 'كتابة حرة', `مفتاح: ${item.sourceAnswer}`],
  }));
  const testItems = section.num === 34 ? TEST_QUESTIONS_44.map(q => ({ id: q.id, parts: q.fields })) : [];
  return { id: section.id, number: section.num, title: section.title, destination: meta.destination, answerLocation: meta.answerLocation, units: section.units, items: [...items, ...testItems] };
});

export const COVERAGE_ACCURACY_NOTES_44 = [
  'نُقلت أقسام المصدر الـ39 (الغلاف + §§1–38) كاملة دون حذف أي قسم أو مثال أو سؤال أو إجابة.',
  'مفاتيح التدريبات §§28–32 من المصدر حرفيًا.',
  'مفاتيح الاختبار الـ25 من §34 حرفيًا.',
  'المصدر يقرر أن الفرق بين MUST وHAVE TO اتجاه شائع وليس قانونًا مطلقًا — وهذا محفوظ.',
  'التطبيعات الموثقة: إزالة الإيموجي وأعلام الأعلام من العناوين، وحذف أشرطة الزينة ━━━، وربط خلايا الجداول بـ |.',
  'أسئلة §34 الخمسة والعشرون محفوظة في testData44 حرفيًا؛ ومفاتيحها في solutionsData44 مطابقة لـ §34.',
];

export const COVERAGE_PLATFORM_ADDITIONS_44 = [
  'ObligationBuilder44: باني جمل الضرورة — واجهة المنصة.',
  'ProhibitionSorter44: مصنّف المنع مقابل عدم الضرورة — بنود المنصة.',
  'TenseMachine44: آلة الأزمنة HAVE TO — واجهة المنصة.',
  'GrammarDetective44: الأخطاء العشرة — كشف تدريجي بعد المحاولة.',
  'practiceNotes44.ts: سبب كل مفتاح تدريب — شرح المنصة.',
  'solutionsData44.ts: جملة السبب لكل سؤال اختبار — شرح المنصة.',
  'WritingMission44: قائمة تحقق من 10 بنود — إضافة المنصة.',
  'SummaryCards44: بطاقات الملخص الذهبي — إضافة المنصة.',
  'الهوية البصرية «Obligation Lab» بألوان زاهية — تصميم المنصة.',
];
