import { SOURCE_SECTIONS_44 } from "./ledger44";
import { PRACTICE_44 } from "./practiceData44";
import { TEST_QUESTIONS_44 } from "./testData44";

const DESTINATIONS: Record<number, { destination: string; answerLocation: string }> = {
  0: { destination: "الخطوة 0 — بوابة مركز قيادة الإلزام (Cover44)", answerLocation: "تمهيد تفاعلي لثلاثة مواقف والفرق المحوري" },
  1: { destination: "الخطوة 1 — ميثاق الأهداف الاثني عشر (GoalList44)", answerLocation: "متتبع تركيز تفاعلي" },
  2: { destination: "الخطوة 2 — معنى MUST + باني الجملة (ObligationBuilder44)", answerLocation: "توليد حي للجمل والترجمة" },
  3: { destination: "الخطوة 3 — قاعدة MUST الذهبية + فحص ثبات الصيغة", answerLocation: "تغذية راجعة بعد المحاولة" },
  4: { destination: "الخطوة 4 — الضرورة التي يؤكدها المتحدث + فحص سياقي", answerLocation: "تغذية راجعة بعد المحاولة" },
  5: { destination: "الخطوة 5 — القوانين والتعليمات + تطبيق لوائح السلامة", answerLocation: "تغذية راجعة بعد المحاولة" },
  6: { destination: "الخطوة 6 — MUST للتوصية القوية + مختبر السياق والنبرة", answerLocation: "تصنيف سياقي بعد المحاولة" },
  7: { destination: "الخطوة 7 — معنى HAVE TO (Semi-modal) + فحص التوافق", answerLocation: "تغذية راجعة بعد المحاولة" },
  8: { destination: "الخطوة 8 — HAS TO مع المفرد الغائب + لوحة تصريف الضمائر", answerLocation: "مقارنة حية بين HAVE/HAS TO وMUST" },
  9: { destination: "الخطوة 9 — متى نستخدم HAVE TO؟ + ربط الظرف بالصيغة", answerLocation: "تغذية راجعة بعد المحاولة" },
  10: { destination: "الخطوة 10 — الفرق الحقيقي + بوصلة التداخل السياقي", answerLocation: "اتجاه شائع لا قانون جامد" },
  11: { destination: "الخطوة 11 — جدول المقارنة الذهبي + فحص المقارنة", answerLocation: "تغذية راجعة بعد المحاولة" },
  12: { destination: "الخطوة 12 — حوار Preparing for the Exam + فحص الحوار", answerLocation: "الترجمة والتحليل + سؤالان بعد المحاولة" },
  13: { destination: "الخطوة 13 — MUSTN'T مقابل DON'T HAVE TO + رادار التصنيف", answerLocation: "تصنيف 6 جمل بعد المحاولة" },
  14: { destination: "الخطوة 14 — MUSTN'T للمنع القاطع + فحص المنع", answerLocation: "تغذية راجعة بعد المحاولة" },
  15: { destination: "الخطوة 15 — DON'T / DOESN'T HAVE TO + فحص عودة HAVE", answerLocation: "تغذية راجعة بعد المحاولة" },
  16: { destination: "الخطوة 16 — مقارنة تغيّر المعنى + محاكي انعكاس المعنى", answerLocation: "محاكاة تفاعلية فورية" },
  17: { destination: "الخطوة 17 — تكوين السؤال بـ DO/DOES + مختبر بناء السؤال", answerLocation: "تحويل تفاعلي حي" },
  18: { destination: "الخطوة 18 — الإجابات القصيرة + فحص دلالة النفي", answerLocation: "تغذية راجعة بعد المحاولة" },
  19: { destination: "الخطوة 19 — MUST في السؤال + فخ الإجابة المنفية", answerLocation: "تغذية راجعة بعد المحاولة" },
  20: { destination: "الخطوة 20 — HAD TO في الماضي + آلة الأزمنة + فحص الماضي", answerLocation: "تصريف تفاعلي + فحص بعد المحاولة" },
  21: { destination: "الخطوة 21 — DIDN'T HAVE TO + مختبر دلالة عدم الإلزام الماضي", answerLocation: "تغذية راجعة بعد المحاولة" },
  22: { destination: "الخطوة 22 — السؤال في الماضي بـ DID + فحص التصحيح", answerLocation: "تغذية راجعة بعد المحاولة" },
  23: { destination: "الخطوة 23 — WILL HAVE TO في المستقبل + فحص المستقبل", answerLocation: "تغذية راجعة بعد المحاولة" },
  24: { destination: "الخطوة 24 — نفي المستقبل وسؤاله + جدول الأزمنة الشامل", answerLocation: "تغذية راجعة بعد المحاولة" },
  25: { destination: "الخطوة 25 — الفرق التمهيدي بين الضرورة والنصيحة + مقياس القوة", answerLocation: "موازنة تمهيدية دون استباق الدرس 45" },
  26: { destination: "الخطوة 26 — الحوار الشامل Science Competition + ترجمة اختيارية", answerLocation: "تحليل الاستخدامات السبعة + فحص الحوار" },
  27: { destination: "الخطوة 27 — المحقق النحوي Grammar Detective (10 جمل)", answerLocation: "التصحيح لكل بند بعد المحاولة والكتلة الختامية بعد إتمام العشرة" },
  28: { destination: "الخطوة 28 — التدريب الأول: MUST أم HAVE TO؟", answerLocation: "تصحيح آلي لكل بند وفتح الحلول بعد إتمام الخمسة" },
  29: { destination: "الخطوة 29 — التدريب الثاني: MUSTN'T أم DON'T HAVE TO؟", answerLocation: "تصحيح آلي لكل بند وفتح الحلول بعد إتمام الخمسة" },
  30: { destination: "الخطوة 30 — التدريب الثالث: الماضي والمستقبل", answerLocation: "تصحيح آلي لكل بند وفتح الحلول بعد إتمام الخمسة" },
  31: { destination: "الخطوة 31 — التدريب الرابع: التحويل إلى سؤال", answerLocation: "تصحيح آلي لكل بند وفتح الحلول بعد إتمام الخمسة" },
  32: { destination: "الخطوة 32 — التدريب الخامس: التحويل إلى النفي", answerLocation: "تصحيح آلي لكل بند وفتح الحلول بعد إتمام الخمسة" },
  33: { destination: "الخطوة 33 — تحدي القراءة A Day at the Science Centre", answerLocation: "فحص كل سؤال بعد الإجابة وفتح الحلول بعد العشرة" },
  34: { destination: "الخطوة 34 + منطقة الاختبار المستقلة TestArea44 (25 سؤالًا)", answerLocation: "تحميل ديناميكي لمحرك التصحيح عند التسليم فقط" },
  35: { destination: "الخطوة 35 + مساحة المعلم ومنطقة الحلول", answerLocation: "مفتاح التصحيح الكامل في بوابة المعلم ومنطقة الحلول بعد التسليم" },
  36: { destination: "الخطوة 36 — مهمة الكتابة My School Rules and Responsibilities", answerLocation: "راصد تلقائي للصيغ الثماني + قائمة مراجعة ذاتية" },
  37: { destination: "الخطوة 37 — الملخص الذهبي + بطاقات القنوات الست", answerLocation: "مراجعة مركّزة شاملة" },
  38: { destination: "الخطوة 38 — خريطة التقدم (44 / 120) وتمهيد الدرس 45", answerLocation: "شريط التقدم والجسر الختامي للدرس القادم" },
};

export type CoverageRow44 = {
  id: string;
  number: number;
  title: string;
  destination: string;
  answerLocation: string;
  units: { id: string; text: string }[];
  items: { id: string; parts: string[] }[];
};

export const COVERAGE_44: CoverageRow44[] = SOURCE_SECTIONS_44.map((section) => {
  const meta = DESTINATIONS[section.num] ?? {
    destination: "خطوة دراسية",
    answerLocation: "داخل الخطوة",
  };
  const items = PRACTICE_44.filter((item) => item.section === section.num).map(
    (item) => ({
      id: item.id,
      parts: [
        item.parts.join("+"),
        item.options.length ? `خيارات: ${item.options.length}` : "إدخال نصي",
        `المفتاح: ${item.sourceAnswer}`,
      ],
    })
  );
  const testItems =
    section.num === 34
      ? TEST_QUESTIONS_44.map((q) => ({ id: q.id, parts: q.fields }))
      : [];
  return {
    id: section.id,
    number: section.num,
    title: section.title,
    destination: meta.destination,
    answerLocation: meta.answerLocation,
    units: section.units,
    items: [...items, ...testItems],
  };
});

export const COVERAGE_ACCURACY_NOTES_44 = [
  "تُعرض جميع الأقسام الـ39 (الغلاف + الأقسام 1–38) بكامل أمثلتها وجداولها وحواراتها وتدريباتها وأسئلتها دون حذف أو اختصار.",
  "يبقى الفرق بين MUST وHAVE TO معروضًا بدقة علمية بوصفه اتجاهًا شائعًا يتداخل في اللوائح والتعليمات وليس قانونًا جامدًا.",
  "تُفصل دلالة المنع القاطع (MUSTN'T) عن دلالة عدم الضرورة (DON'T / DOESN'T HAVE TO) بصريًا وبنيويًا ودلاليًا في كل موضع.",
  "تُحجب حلول المحقق النحوي والتدريبات الخمسة وتحدي القراءة حتى محاولة المتعلم، مع إمكانية إعادة المحاولة وتصفير الإجابات.",
  "يُحمَّل محرك تصحيح الاختبار النهائي (testKey44) ديناميكيًا عند التسليم فقط، فلا توجد مفاتيح إجابة في شجرة DOM قبل التسليم.",
];

export const COVERAGE_PLATFORM_ADDITIONS_44 = [
  "نظام الهوية البصرية «مركز قيادة الإلزام والضرورة — The Obligation Command Center» بست قنوات دلالية مميزة بالأيقونة والحدود واللون المتوافق مع WCAG AA.",
  "مختبرات تفاعلية مدمجة في جميع محطات الشرح: باني الجملة، لوحة الضمائر، مختبر النبرة، بوصلة التداخل، رادار المنع، محاكي انعكاس المعنى، باني السؤال، وآلة الأزمنة.",
  "تصحيح آلي مرن يقبل الاختصارات والصيغ الكاملة والجمل المصححة في التدريبات الخمسة وفي الاختبار النهائي المؤلف من 25 سؤالًا.",
  "راصد تلقائي للمتطلبات النحوية الثمانية في مهمة الكتابة مع حفظ المسودة وقائمة التحقق.",
];
