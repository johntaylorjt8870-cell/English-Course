import { SOURCE_SECTIONS_44 } from './ledger44';
import { PRACTICE_44 } from './practiceData44';
import { TEST_QUESTIONS_44 } from './testData44';

const DESTINATIONS: Record<number, { destination: string; answerLocation: string }> = {
  0: { destination: 'الغلاف — الخطوة 0 (Cover44)', answerLocation: 'لا مفاتيح — تعريف المقرر' },
  1: { destination: 'الخطوة 1 — الأهداف (GoalList44 + Article)', answerLocation: 'لا مفاتيح — أهداف الدرس' },
  2: { destination: 'الخطوة 2 — المصدر + ObligationBuilder44', answerLocation: 'باني جمل الضرورة — واجهة المنصة' },
  3: { destination: 'الخطوة 3 — المصدر + ChoiceLab44 (must-rule)', answerLocation: 'مفاتيح الاختيار بعد التحقق' },
  4: { destination: 'الخطوة 4 — المصدر (Article44)', answerLocation: 'أمثلة الضرورة الشخصية' },
  5: { destination: 'الخطوة 5 — المصدر (Article44)', answerLocation: 'قوانين وتعليمات' },
  6: { destination: 'الخطوة 6 — المصدر (Article44)', answerLocation: 'توصية قوية' },
  7: { destination: 'الخطوة 7 — المصدر + ChoiceLab44 (hasto-rule)', answerLocation: 'مفاتيح الاختيار بعد التحقق' },
  8: { destination: 'الخطوة 8 — المصدر (Article44)', answerLocation: 'HAS TO مع المفرد الغائب' },
  9: { destination: 'الخطوة 9 — المصدر (Article44)', answerLocation: 'متى نستخدم HAVE TO' },
  10: { destination: 'الخطوة 10 — المصدر (Article44)', answerLocation: 'MUST vs HAVE TO — اتجاه شائع' },
  11: { destination: 'الخطوة 11 — المصدر (جدول المقارنة الذهبي)', answerLocation: 'جدول المقارنة — Article44' },
  12: { destination: 'الخطوة 12 — حوار Preparing for the Exam (Dialog44)', answerLocation: 'وسم الاستخدامات' },
  13: { destination: 'الخطوة 13 — المصدر + ProhibitionSorter44', answerLocation: 'مفاتيح التصنيف بعد التحقق' },
  14: { destination: "الخطوة 14 — المصدر + ChoiceLab44 (mustn't-check)", answerLocation: 'مفاتيح المنع بعد التحقق' },
  15: { destination: "الخطوة 15 — المصدر (DON'T HAVE TO)", answerLocation: 'عدم الضرورة' },
  16: { destination: 'الخطوة 16 — المصدر (مقارنة تغيّر المعنى)', answerLocation: 'القاعدة الذهبية' },
  17: { destination: 'الخطوة 17 — المصدر (تكوين السؤال)', answerLocation: 'Do/Does + have to' },
  18: { destination: 'الخطوة 18 — المصدر (الإجابات القصيرة)', answerLocation: 'الإجابات القصيرة' },
  19: { destination: 'الخطوة 19 — المصدر (MUST في السؤال)', answerLocation: 'فرق مهم في الإجابة' },
  20: { destination: 'الخطوة 20 — المصدر + TenseMachine44 + ChoiceLab44 (past-check)', answerLocation: 'آلة الأزمنة + مفاتيح الاختيار' },
  21: { destination: "الخطوة 21 — المصدر (DIDN'T HAVE TO)", answerLocation: 'نقطة دقيقة' },
  22: { destination: 'الخطوة 22 — المصدر (السؤال في الماضي)', answerLocation: 'الخطأ الشائع' },
  23: { destination: 'الخطوة 23 — المصدر + ChoiceLab44 (future-check)', answerLocation: 'WILL HAVE TO + مفاتيح الاختيار' },
  24: { destination: 'الخطوة 24 — المصدر (جدول الأزمنة)', answerLocation: 'مقارنة شاملة' },
  25: { destination: 'الخطوة 25 — المصدر (MUST vs SHOULD)', answerLocation: 'الضرورة والنصيحة' },
  26: { destination: 'الخطوة 26 — الحوار الشامل (Dialog44)', answerLocation: 'وسم الاستخدامات السبعة' },
  27: { destination: 'الخطوة 27 — GrammarDetective44 + DetectiveSourceKey44', answerLocation: 'كتلة مفاتيح §27 بعد كشف البنود العشرة' },
  28: { destination: 'الخطوة 28 — PracticeSet44(28)', answerLocation: 'مفتاح المصدر بعد التحقق من البنود الخمسة' },
  29: { destination: 'الخطوة 29 — PracticeSet44(29)', answerLocation: 'مفتاح المصدر بعد التحقق من البنود الخمسة' },
  30: { destination: 'الخطوة 30 — PracticeSet44(30)', answerLocation: 'مفتاح المصدر بعد التحقق من البنود الخمسة' },
  31: { destination: 'الخطوة 31 — PracticeSet44(31)', answerLocation: 'مفتاح المصدر بعد التحقق من البنود الخمسة' },
  32: { destination: 'الخطوة 32 — PracticeSet44(32)', answerLocation: 'مفتاح المصدر بعد التحقق من البنود الخمسة' },
  33: { destination: 'الخطوة 33 — ReadingChallenge44', answerLocation: 'كتلة مفاتيح §33 بعد مراجعة الأسئلة العشرة' },
  34: { destination: 'منطقة الاختبار المستقلة — TestArea44 (النص الكامل)', answerLocation: 'مفاتيح §34 — لا تُعرض قبل التسليم' },
  35: { destination: 'بوابة المعلم — TeacherArea44 + SolutionsArea44', answerLocation: 'مفاتيح الاختبار كاملة بعد رمز المعلم' },
  36: { destination: 'الخطوة 36 — WritingMission44', answerLocation: 'قائمة تحقق من 10 بنود + مساحة كتابة' },
  37: { destination: 'الخطوة 37 — الملخص الذهبي (Article44)', answerLocation: 'القاعدة الذهبية الكبرى' },
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
  'مفاتيح §§28–33 كانت تُطبع قبل المحاولة في التصميم السابق؛ صارت كتلة «الحلول» المصدرية تُفتح فقط بعد التحقق من كل بند، وتبقى كاملة في دليل المعلم.',
  'القسم 34 (62 سطرًا) يُعرض كاملًا داخل منطقة الاختبار؛ خطوة 34 تعرض الموجز والمستويات الخمسة بدل تكرار ورقة الأسئلة كاملة.',
  'بطاقات الملخص الخمس (SummaryCards44) كانت تكرارًا للملخص المصري §37؛ استُبدلت بالعرض التحريري الكامل لـ §37 دون حذف أي سطر.',
];

export const COVERAGE_PLATFORM_ADDITIONS_44 = [
  'ObligationBuilder44: باني جمل الضرورة — واجهة المنصة.',
  'ProhibitionSorter44: مصنّف المنع مقابل عدم الضرورة — بنود المنصة.',
  'TenseMachine44: آلة الأزمنة HAVE TO — واجهة المنصة.',
  'GrammarDetective44: الأخطاء العشرة — كشف تدريجي بعد المحاولة.',
  'practiceNotes44.ts: سبب كل مفتاح تدريب — شرح المنصة.',
  'solutionsData44.ts: جملة السبب لكل سؤال اختبار — شرح المنصة.',
  'WritingMission44: قائمة تحقق من 10 بنود ومساحة كتابة محفوظة — إضافة المنصة.',
  'الهوية البصرية «English Learning Studio» — تصميم المنصة، بخطَّي Newsreader وTajawal المستضافين محليًا.',
  'أقسام التعلّم الثلاثة عشر وتسمياتها الإنجليزية — تسميات تنقل من إعداد المنصة.',
];
