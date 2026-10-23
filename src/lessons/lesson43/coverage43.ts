import { SOURCE_SECTIONS_43 } from "./ledger43";
import { TEACHER_SECTIONS_43, type TeacherSection43 } from "./teacherSource43";
import { SLIDES_43, STATIONS_43, type Slide43 } from "./slides43";

/**
 * سجل التغطية: يرتب كل قسم من المصدر والادعاء بأنه معروض، مع القائمة
 * الفعلية للشرائح التي تغطيه. يُبنى من `SLIDES_43` نفسه لكي لا ينفصل
 * سجل التغطية عن الهيكل الحقيقي للدرس.
 */
export type CoverageEntry43 = {
  num: number;
  title: string;
  units: number;
  slides: string[];
  station: string;
  teacherOnly: boolean;
};

export const COVERAGE_43: CoverageEntry43[] = [
  ...SOURCE_SECTIONS_43.map((section) => {
    const slides = SLIDES_43.filter((slide) => slide.section === section.num);
    return {
      num: section.num,
      title: section.title,
      units: section.lines.length,
      slides: slides.map((slide) => slide.id),
      station: slides[0]?.station ?? STATIONS_43[0].id,
      teacherOnly: false,
    };
  }),
  {
    num: TEACHER_SECTIONS_43[0].num,
    title: TEACHER_SECTIONS_43[0].title,
    units: TEACHER_SECTIONS_43[0].lines.length,
    slides: SLIDES_43.filter((slide) => slide.kind === "teacher").map((slide) => slide.id),
    station: "teacher",
    teacherOnly: true,
  },
].sort((a, b) => a.num - b.num);

/**
 * ملاحظات الدقة: مواضع يحتاج المعلم/الطالب فيها إلى تنبيه دقيق لأن المصدر
 * نفسه يرفض تبسيطًا جامدًا. هذه ملاحظات توثيقية لا تغيّر النص المصدر.
 */
export const COVERAGE_ACCURACY_NOTES_43: string[] = [
  "§5 لا يربط MAY وMIGHT بنسبة مئوية ثابتة، ولا يفرض الترتيب بينهما — الاختيار يعتمد على الأسلوب ودرجة التحفظ.",
  "§6 يرفض أي ترتيب نسبٍ ثابت، لذا لا تُقدَّم نسبة 70%/30% أو ما شابه في أي مكان في الدرس.",
  "§7 MAY + BE تُلفظان معًا، أما MAYBE فكلمة واحدة مستقلة في بداية الجملة غالبًا.",
  "§13 MAY NOT تعني في الأغلب «احتمال عدم الحدوث»، وقد تحمل معنى المنع في سياقات رسمية فقط.",
  "§15 طلب الإذن يقبل Can I وCould I وMay I بحسب الرسمية، وMight I صيغة قديمة رسمية.",
  "§19 السؤال May I...? وجوابه Yes, you may — لا MIGHT في الجواب اليومي المعتاد.",
  "§20 MAY HAVE + V3 احتمال يتعلق بالماضي، ولا يؤكد أن الحدث وقع.",
  "§23 MAY HAVE وMIGHT HAVE تُستعملان للاحتمال الماضي، واختيار إحداهما أسلوبي.",
  "§25 الفعل الناقص يُختيار من المعنى أولًا ثم السياق، لا من ترجمة آلية لكلمة واحدة.",
  "§31 ⑧ يُبيِّن أن May she come? صيغة نحوية ممكنة في سياقات معينة، لكن الاستعمال اليومي يفضّل Is she likely to come?.",
  "§34 المفتاح يُفضّل عدم عرضه للطالب إلا بعد انتهاء الاختبار.",
  "§37 يصف الدرس 44 على أنه مسجّل فعلًا في المنصة، فلا يُقال إنه غير موجود.",
];

/**
 * الإضافات التي تضيفها المنصة ولا وجود لها في النص المصدر: الأنشطة
 * التفاعلية، بنك التدريب، أسئلة الفهم، أسئلة الاختبار، ومهمة الكتابة.
 */
export const COVERAGE_PLATFORM_ADDITIONS_43: { section: number; kind: string; detail: string }[] = [
  { section: 2, kind: "lab", detail: "الطيف الاحتمالي الكيفي: تصنيف الأحكام إلى مؤكد/احتمال، مع تنبيه بعدم وجود نسب مئوية ثابتة." },
  { section: 3, kind: "lab", detail: "باني الجملة: يفكّك الجملة إلى فاعل وفعل ناقص وفعل رئيسي، ويسمّي القاعدة المكسورة إن وجدت." },
  { section: 4, kind: "lab", detail: "آلة الفاعل: تثبت أن MAY وMIGHT ثابتتان مع جميع الضمائر." },
  { section: 5, kind: "lab", detail: "قرص الاحتمال: يحدد زمن الاحتمال (حاضر/مستقبل/ماضٍ) من السياق." },
  { section: 7, kind: "lab", detail: "مركّب MAY BE: تصنيف الجملة إلى MAY+BE أو MAY+V1 أو MAY+have+V3." },
  { section: 11, kind: "lab", detail: "تبديل MAY وMIGHT: إظهار أن التبديل ممكن في كثير من الجمل وليس في طلب الإذن." },
  { section: 13, kind: "lab", detail: "MAY NOT: تمييز الاحتمال السلبي من المنع في السياق الرسمي." },
  { section: 14, kind: "lab", detail: "MAY NOT أم MUST NOT: اختيار الصيغة بحسب ما يعبّر عنه السياق." },
  { section: 15, kind: "lab", detail: "سلم اللباقة: تصنيف المواقف إلى Can I / Could I / May I / Might I." },
  { section: 17, kind: "lab", detail: "صِل الموقف بالصيغة: تطبيق آخر على اختيار صيغة طلب الإذن." },
  { section: 18, kind: "lab", detail: "MAYBE مقابل MAY BE: تصنيف التعابير إلى ظرف مستقل أو فعل ناقص + be." },
  { section: 20, kind: "lab", detail: "احتمال الماضي: تفكيك MAY/MIGHT + have + V3." },
  { section: 24, kind: "lab", detail: "مصفوفة الأفعال الأربعة: تصنيف الجمل إلى وظيفة الفعل الناقص." },
  { section: 25, kind: "lab", detail: "دليل القرار: اختيار الفعل الناقص من المعنى المقصود." },
  { section: 26, kind: "lab", detail: "محلّل الحوار: وسم الاستخدامات المختلفة لـ MAY وMIGHT في الحوار الشامل." },
  { section: 27, kind: "practice", detail: "بنك تدريب: 6 جمل يُختار فيها MAY أو MIGHT، وكلتاهما مقبولة." },
  { section: 28, kind: "practice", detail: "بنك تدريب: 6 جمل متعددة الخيارات (A/B/C) مع مفتاح الحرف." },
  { section: 29, kind: "practice", detail: "بنك تدريب: 6 جمل تفرّق بين Maybe و may be." },
  { section: 30, kind: "practice", detail: "بنك تدريب: 5 إعادة صياغة باستخدام MAY HAVE أو MIGHT HAVE، مع ملاحظة إمكانية التبديل." },
  { section: 31, kind: "practice", detail: "بنك تدريب: 10 إصلاحات لأخطاء نحوية شائعة." },
  { section: 32, kind: "reading", detail: "نص قراءة مقسّم على شريحتين + 10 أسئلة فهم مصحوبة بحلولها." },
  { section: 33, kind: "test", detail: "اختبار ختامي من 25 سؤالًا على خمسة مستويات، لا يحتوي مفتاح التصحيح." },
  { section: 34, kind: "teacher", detail: "مفتاح تصحيح كامل ومنحني تدريس — يُحمّل عند الطلب بعد التحقق من كلمة مرور المعلم." },
  { section: 35, kind: "writing", detail: "مهمة كتابة من 12–15 جملة، مع قائمة معايير ومُجَسِّم فقرة نموذجية وتحدّي إضافي." },
  { section: 36, kind: "summary", detail: "الملخص الذهني المجمّع للدرس." },
  { section: 37, kind: "roadmap", detail: "خارطة التقدم إلى الدرس 44 مع شريط تقدم 43/120." },
];

/** عدد الشريحة لكل محطة — يُستخدم في تدقيق التغطية والتنقل. */
export function slidesPerStation43(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const slide of SLIDES_43) counts[slide.station] = (counts[slide.station] ?? 0) + 1;
  return counts;
}

/** الأقسام التي لا يغطيها أي شريحة تعليمية (لا ينبغي أن يكون العدد صفرًا). */
export function uncoveredSections43(): number[] {
  return COVERAGE_43.filter((entry) => entry.slides.length === 0).map((entry) => entry.num);
}

export type { Slide43 };
