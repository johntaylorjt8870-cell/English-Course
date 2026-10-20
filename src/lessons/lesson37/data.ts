import { NUMBERED_SECTIONS_37, SOURCE_SECTIONS_37, type SourceSection37, sourceSection37 } from "./ledger37";

export type ChapterId37 =
  | "intro"
  | "form"
  | "meaning"
  | "clauses"
  | "polite"
  | "neg-questions"
  | "verbs"
  | "compare"
  | "practice"
  | "assessment"
  | "closure";

export type SlidePart37 = "full" | "a" | "b";

export type Slide37 = {
  id: string;
  sourceId: string;
  part: SlidePart37;
  sourceOrder: number;
  section: ChapterId37;
  title: string;
  subtitle: string;
  step: number;
  source: SourceSection37;
};

export type Chapter37 = {
  id: ChapterId37;
  title: string;
  rangeLabel: string;
  stepIds: string[];
};

function chapterFor37(id: string): ChapterId37 {
  if (id === "cover" || id === "s01" || id === "s02") return "intro";
  if (id === "s03" || id === "s04" || id === "s05") return "form";
  if (id === "s06" || id === "s07" || id === "s08" || id === "s09" || id === "s10") return "meaning";
  if (id === "s11" || id === "s12" || id === "s13" || id === "s14") return "clauses";
  if (id === "s15" || id === "s16" || id === "s17") return "polite";
  if (id === "s18" || id === "s19" || id === "s20" || id === "s21" || id === "s22" || id === "s23") return "neg-questions";
  if (id === "s24" || id === "s25") return "verbs";
  if (id === "s26" || id === "s27") return "compare";
  if (id === "s28" || id === "s29" || id === "s30" || id === "s31" || id === "s32" || id === "s33") return "practice";
  if (id === "s34" || id === "s35") return "assessment";
  return "closure";
}

type StepSpec37 = {
  id: string;
  sourceId: string;
  part: SlidePart37;
  title?: string;
  subtitle: string;
};

/**
 * خريطة الخطوات التعليمية الـ49 للدرس 37:
 * تم تقسيم الأقسام الكثيفة (2، 3، 4، 6، 9، 12، 14، 24، 30، 32) إلى خطوتين مريحتين (أ + ب)
 * بحيث تظل كل خطوة مركّزة على هدف واحد ومريحة للعين دون حشو رأسي.
 */
const STEP_SPECS_37: StepSpec37[] = [
  {
    id: "cover",
    sourceId: "cover",
    part: "full",
    subtitle: "مشهد المرصد الافتتاحي وربط أزمنة المستقبل الأربعة",
  },
  {
    id: "s01",
    sourceId: "s01",
    part: "full",
    subtitle: "الأهداف العشرة للدرس وقائمة المراجعة الذاتية",
  },
  {
    id: "s02",
    sourceId: "s02",
    part: "a",
    title: "🧠 2أ. الفكرة الأساسية: تخيل نفسك داخل المستقبل والخط الزمني",
    subtitle: "قصة الدراسة من 6:00 إلى 9:00 واللحظة الجارية عند 7:00",
  },
  {
    id: "s02b",
    sourceId: "s02",
    part: "b",
    title: "🧠 2ب. مختبر اللحظة المستقبلية: ضع الكاميرا على الساعة 7:00",
    subtitle: "استكشاف تفاعلي للخط الزمني (6:00 · 7:00 · 9:00)",
  },
  {
    id: "s03",
    sourceId: "s03",
    part: "a",
    title: "⭐ 3أ. القاعدة الأساسية: Subject + will + be + V-ing",
    subtitle: "الصيغة الكاملة والأمثلة الخمسة مع ثبات will be",
  },
  {
    id: "s03b",
    sourceId: "s03",
    part: "b",
    title: "⭐ 3ب. ورشة بناء الصيغة: رتّب أجزاء الجملة",
    subtitle: "تطبيق عملي لترتيب Subject → will → be → V-ing",
  },
  {
    id: "s04",
    sourceId: "s04",
    part: "a",
    title: "🔬 4أ. تحليل التركيب خطوة بخطوة ولماذا be وليس is",
    subtitle: "تشريح جملة She will be preparing dinner وقاعدة المصدر المجرّد بعد will",
  },
  {
    id: "s04b",
    sourceId: "s04",
    part: "b",
    title: "🔬 4ب. مختبر التشريح النحوي: وظيفة كل عنصر في الجملة",
    subtitle: "تحديد وظيفة كل كلمة واختبار قاعدة be بعد will",
  },
  {
    id: "s05",
    sourceId: "s05",
    part: "full",
    subtitle: "جدول الضمائر السبعة (I, You, He, She, It, We, They) ومختبر ثبات الصيغة",
  },
  {
    id: "s06",
    sourceId: "s06",
    part: "a",
    title: "🧠 6أ. الاستخدام الأول: نشاط سيكون جاريًا في لحظة مستقبلية محددة",
    subtitle: "أربعة أمثلة تطبيقية وقاعدة السؤال الذهني What will be happening at that moment?",
  },
  {
    id: "s06b",
    sourceId: "s06",
    part: "b",
    title: "🧠 6ب. مختبر اللحظة المستقبلية المحددة",
    subtitle: "تطبيق الاستخدام الأول على 5 مواقف مستقبلية",
  },
  {
    id: "s07",
    sourceId: "s07",
    part: "full",
    subtitle: "مقارنة الكاميرا في الماضي والحاضر والمستقبل مقابل لقطة الصورة",
  },
  {
    id: "s08",
    sourceId: "s08",
    part: "full",
    subtitle: "التعبيرات الزمنية السبعة الشائعة مع Future Continuous",
  },
  {
    id: "s09",
    sourceId: "s09",
    part: "a",
    title: "🔥 9أ. المقارنة الأولى: Future Simple مقابل Future Continuous",
    subtitle: "الفرق بين الحدث العام والنشاط الجاري + تنبيه IQ200 الدقيق",
  },
  {
    id: "s09b",
    sourceId: "s09",
    part: "b",
    title: "🔥 9ب. مختبر المقارنة بين Future Simple وFuture Continuous",
    subtitle: "ميّز بين الحدث الكلي واللقطة الجارية داخل اللحظة",
  },
  {
    id: "s10",
    sourceId: "s10",
    part: "full",
    subtitle: "نفس الفعل (travel) في ثلاثة أزمنة مستقبلية من ثلاث زوايا نظر",
  },
  {
    id: "s11",
    sourceId: "s11",
    part: "full",
    subtitle: "نشاط طويل مستمر (Future Continuous) يتقاطع معه حدث أقصر (Present Simple)",
  },
  {
    id: "s12",
    sourceId: "s12",
    part: "a",
    title: "🚨 12أ. قاعدة when الزمنية والفرق مع السؤال المباشر",
    subtitle: "لماذا نقول When you arrive وليس When you will arrive؟ ومتى نضع will بعد When؟",
  },
  {
    id: "s12b",
    sourceId: "s12",
    part: "b",
    title: "🚨 12ب. مختبر when: جملة زمنية أم سؤال مباشر؟",
    subtitle: "تطبيق عملي للتمييز بين الجملة الزمنية والسؤال المباشر وغير المباشر",
  },
  {
    id: "s13",
    sourceId: "s13",
    part: "full",
    subtitle: "الربط بين نشاطين مستقبليين متزامنين باستخدام while",
  },
  {
    id: "s14",
    sourceId: "s14",
    part: "a",
    title: "🎭 14أ. حوار تطبيقي: Tomorrow's Schedule والترجمة الكاملة",
    subtitle: "حوار لينا وعمر حول جدول الغد من الساعة 9:00 صباحًا حتى 2:00 ظهرًا",
  },
  {
    id: "s14b",
    sourceId: "s14",
    part: "b",
    title: "🎭 14ب. التحليل النحوي لحوار Tomorrow's Schedule ومختبر الفهم",
    subtitle: "تحليل الصيغ الأربع في الحوار واستكشاف كل سطر تفاعليًا",
  },
  {
    id: "s15",
    sourceId: "s15",
    part: "full",
    subtitle: "الحديث عن مجريات مستقبلية متوقعة أو جزء طبيعي من برنامج قادم",
  },
  {
    id: "s16",
    sourceId: "s16",
    part: "full",
    subtitle: "السؤال اللطيف وغير الضاغط عن خطط الآخرين باستخدام Will you be + V-ing?",
  },
  {
    id: "s17",
    sourceId: "s17",
    part: "full",
    subtitle: "المقارنة الدقيقة بين الطلب المباشر (Will you...?) والسؤال المهذب عن الخطة (Will you be + V-ing?)",
  },
  {
    id: "s18",
    sourceId: "s18",
    part: "a",
    title: "🚫 18أ. صيغة النفي وقاعدتها",
    subtitle: "Subject + will not + be + V-ing والأمثلة الأربعة",
  },
  {
    id: "s18b",
    sourceId: "s18",
    part: "b",
    title: "🚫 18ب. ورشة بناء النفي",
    subtitle: "حوّل جمل المصدر إلى النفي وافحص عناصرها",
  },
  {
    id: "s19",
    sourceId: "s19",
    part: "full",
    subtitle: "الأخطاء الأربعة الشائعة في النفي ومختبر تشخيص الخطأ",
  },
  {
    id: "s20",
    sourceId: "s20",
    part: "a",
    title: "❓ 20أ. تكوين سؤال نعم/لا",
    subtitle: "نقل will قبل الفاعل والأمثلة الأربعة",
  },
  {
    id: "s20b",
    sourceId: "s20",
    part: "b",
    title: "❓ 20ب. ورشة بناء الأسئلة",
    subtitle: "كوّن سؤال نعم/لا من خمس جمل وافحص عناصره",
  },
  {
    id: "s21",
    sourceId: "s21",
    part: "full",
    subtitle: "الإجابات القصيرة (Yes, I will. / No, I won't.) دون تكرار be + V-ing",
  },
  {
    id: "s22",
    sourceId: "s22",
    part: "a",
    title: "🔍 22أ. أسئلة Wh وصيغتها",
    subtitle: "القاعدة والأمثلة الستة مع ترجماتها",
  },
  {
    id: "s22b",
    sourceId: "s22",
    part: "b",
    title: "🔍 22ب. ورشة بناء أسئلة Wh",
    subtitle: "ابنِ الأسئلة الستة من معناها العربي",
  },
  {
    id: "s23",
    sourceId: "s23",
    part: "full",
    subtitle: "الفرق التركيبي بين Who كفاعل (Who will be leading...?) وWho كمفعول به (Who will you be meeting?)",
  },
  {
    id: "s24",
    sourceId: "s24",
    part: "a",
    title: "✍️ 24أ. قواعد إضافة ING الأربع مع الأمثلة",
    subtitle: "الإضافة المباشرة، حذف e الصامتة، مضاعفة الساكن الأخير (CVC)، وتحويل ie إلى ying",
  },
  {
    id: "s24b",
    sourceId: "s24",
    part: "b",
    title: "✍️ 24ب. ورشة تطبيق قواعد ING التفاعلية (16 فعلًا)",
    subtitle: "اكتب صيغة V-ing لستة عشر فعلًا مع التحقق الفوري وشرح القاعدة",
  },
  {
    id: "s25",
    sourceId: "s25",
    part: "a",
    title: "⚠️ 25أ. أفعال الحالة: القاعدة والأمثلة",
    subtitle: "لماذا لا نقول I will be knowing؟ الأفعال الستة التي تبقى خارج الصيغة المستمرة",
  },
  {
    id: "s25b",
    sourceId: "s25",
    part: "b",
    title: "⚠️ 25ب. الاستثناء ومختبر أفعال الحالة",
    subtitle: "متى تتغير الحالة إلى نشاط؟ ومتى تصح الصيغة المستمرة مع الفعل نفسه؟",
  },
  {
    id: "s26",
    sourceId: "s26",
    part: "a",
    title: "🔥 26أ. الأزمنة المستمرة الثلاثة",
    subtitle: "أمثلة read والفرق في النقطة المرجعية",
  },
  {
    id: "s26b",
    sourceId: "s26",
    part: "b",
    title: "🔥 26ب. الخريطة الذهنية ومختبر النقطة المرجعية",
    subtitle: "جدول الأزمنة الثلاثة وحدّد مرجع كل نشاط",
  },
  {
    id: "s27",
    sourceId: "s27",
    part: "full",
    subtitle: "المواجهة الثلاثية بين Future Simple وBE GOING TO وFuture Continuous",
  },
  {
    id: "s28",
    sourceId: "s28",
    part: "full",
    subtitle: "6 أسئلة اختيار من متعدد لتثبيت الصيغة ومفتاح الحلول بعد المحاولة",
  },
  {
    id: "s29",
    sourceId: "s29",
    part: "a",
    title: "✍️ 29أ. تدريب التحويلات: المثال والأسئلة",
    subtitle: "مثال المصدر والجمل الخمس المطلوب تحويلها",
  },
  {
    id: "s29b",
    sourceId: "s29",
    part: "b",
    title: "✍️ 29ب. ورشة النفي والسؤال",
    subtitle: "اكتب نفي كل جملة وسؤالها وافحص العناصر",
  },
  {
    id: "s30",
    sourceId: "s30",
    part: "a",
    title: "🕵️ 30أ. اكتشف الأخطاء (الجمل ①–⑤)",
    subtitle: "اكتشف الخطأ النحوي وصحّح الجمل الخمس الأولى",
  },
  {
    id: "s30b",
    sourceId: "s30",
    part: "b",
    title: "🕵️ 30ب. أكمل التصحيح (الجمل ⑥–⑩ والحلول)",
    subtitle: "صحّح الجمل الخمس الثانية وافتح مفتاح الحلول التفصيلية العشر",
  },
  {
    id: "s31",
    sourceId: "s31",
    part: "a",
    title: "🚀 31أ. تحدي الزمن: المواقف الأربعة الأولى",
    subtitle: "اختر بين Future Simple وBE GOING TO وFuture Continuous",
  },
  {
    id: "s31b",
    sourceId: "s31",
    part: "b",
    title: "🚀 31ب. تحدي الزمن: المواقف ⑤–⑧",
    subtitle: "بقية المواقف مع مفتاح المصدر وتعليل كل اختيار",
  },
  {
    id: "s32",
    sourceId: "s32",
    part: "a",
    title: "📖 32أ. اقرأ القصة وحلّل صيغ المستقبل",
    subtitle: "قراءة قصة يوم السبت المزدحم لـ Daniel مع كاشف صيغ المستقبل وتحليلها النحوي",
  },
  {
    id: "s32b",
    sourceId: "s32",
    part: "b",
    title: "📖 32ب. أسئلة الفهم الثمانية وحلولها",
    subtitle: "أجب عن الأسئلة الثمانية (①–⑧) وافتح إجابات المصدر النموذجية",
  },
  {
    id: "s33",
    sourceId: "s33",
    part: "full",
    subtitle: "لماذا قد تصحّ الجملتان؟ ومتى نستخدم Future Continuous دون ساعة محددة؟",
  },
  {
    id: "s34",
    sourceId: "s34",
    part: "full",
    subtitle: "بوابة الاختبار النهائي المستقل (25 سؤالًا عبر 5 مستويات تدريجية)",
  },
  {
    id: "s35",
    sourceId: "s35",
    part: "full",
    subtitle: "بوابة الحلول التفصيلية ومساحة المعلم المحمية",
  },
  {
    id: "s36",
    sourceId: "s36",
    part: "full",
    subtitle: "كتابة فقرة من 12–15 جملة وفق المعايير الثمانية مع النموذج الكامل",
  },
  {
    id: "s37",
    sourceId: "s37",
    part: "a",
    title: "🧠 37أ. الملخص الذهبي: الصيغ الأربع وأمثلتها",
    subtitle: "الإثبات والنفي والسؤال وأسئلة المعلومات والإجابة القصيرة في لوحة واحدة",
  },
  {
    id: "s37b",
    sourceId: "s37",
    part: "b",
    title: "🧠 37ب. أهم الاستخدامات والقاعدة الذهبية",
    subtitle: "الاستخدامات الأربعة بأمثلتها، والفرق الجوهري بين Future Simple وFuture Continuous",
  },
  {
    id: "s38",
    sourceId: "s38",
    part: "a",
    title: "🗺️ 38أ. خريطة تقدم المنهج: ماذا أكملنا؟",
    subtitle: "منظومات الحاضر والماضي والمستقبل الاثنتا عشرة وحالة الإكمال",
  },
  {
    id: "s38b",
    sourceId: "s38",
    part: "b",
    title: "🗺️ 38ب. المحطة القادمة: Future Perfect",
    subtitle: "المثال التمهيدي، ومقارنة الجمل الثلاث، وخاتمة الدرس",
  },
];

export const SLIDES_37: Slide37[] = STEP_SPECS_37.map((spec, index) => {
  const source = sourceSection37(spec.sourceId);
  if (!source) throw new Error(`Missing source section ${spec.sourceId}`);
  return {
    id: spec.id,
    sourceId: source.id,
    part: spec.part,
    sourceOrder: source.order,
    section: chapterFor37(source.id),
    title: spec.title ?? source.title,
    subtitle: spec.subtitle,
    step: index + 1,
    source,
  };
});

export const STEP_COUNT_37 = SLIDES_37.length;
export const NUMBERED_STEP_COUNT_37 = NUMBERED_SECTIONS_37.length;

function stepIdsForChapter37(chapterId: ChapterId37): string[] {
  return SLIDES_37.filter((slide) => slide.section === chapterId).map((slide) => slide.id);
}

const CHAPTER_META_37: { id: ChapterId37; title: string }[] = [
  { id: "intro", title: "المدخل والفكرة الأساسية" },
  { id: "form", title: "القاعدة والتركيب والتصريف" },
  { id: "meaning", title: "اللحظة المحددة والكاميرا والمقارنة" },
  { id: "clauses", title: "الربط الزمني والحوار" },
  { id: "polite", title: "المجريات المتوقعة والسؤال المهذب" },
  { id: "neg-questions", title: "النفي والأسئلة والإجابات القصيرة وWho" },
  { id: "verbs", title: "التهجئة وأفعال الحالة" },
  { id: "compare", title: "المقارنات الكبرى للأزمنة" },
  { id: "practice", title: "التدريبات والقراءة والتحديات" },
  { id: "assessment", title: "بوابة الاختبار والحلول" },
  { id: "closure", title: "الإنتاج اللغوي والملخص وخريطة المنهج" },
];

export const CHAPTERS_37: Chapter37[] = CHAPTER_META_37.map((chapter) => {
  const stepIds = stepIdsForChapter37(chapter.id);
  const first = SLIDES_37.findIndex((slide) => slide.id === stepIds[0]) + 1;
  const last = SLIDES_37.findIndex((slide) => slide.id === stepIds[stepIds.length - 1]) + 1;
  return {
    ...chapter,
    stepIds,
    rangeLabel: first === last ? `الخطوة ${first}` : `الخطوات ${first}–${last}`,
  };
});

export const LESSON_TITLE_37 = "الدرس السابع والثلاثون: Future Continuous — المستقبل المستمر";
export const LESSON_SUBTITLE_37 = "What Will You Be Doing Tomorrow?";
export const LESSON_ARABIC_SUBTITLE_37 = "رحلة إلى المستقبل — IQ200 🚀";

export function slideById37(id: string): Slide37 | undefined {
  return SLIDES_37.find((slide) => slide.id === id);
}

export { SOURCE_SECTIONS_37 };
