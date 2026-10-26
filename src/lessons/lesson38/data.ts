import { SOURCE_SECTIONS_38, SOURCE_NUMBERED_COUNT_38, sourceSection38, type SourceSection38 } from "./ledger38";

export const LESSON_TITLE_38 = "Lesson 38 — Future Perfect";
export const LESSON_TITLE_AR_38 = "الدرس 38: Future Perfect — المستقبل التام";
export const LESSON_SUBTITLE_38 = "By Tomorrow, I Will Have Finished!";
export const LESSON_ARABIC_SUBTITLE_38 = "إتقان التعبير عن الإنجاز قبل نقطة مستقبلية — IQ200 🚀";
export const LESSON_LEVEL_38 = "تأسيسي متقدم — IQ200";
export const SECTION_COUNT_38 = SOURCE_NUMBERED_COUNT_38;

/** الهوية البصرية: Future Achievement Observatory — مرصد الإنجاز المستقبلي. */
export const LESSON_IDENTITY_38 = "Future Achievement Observatory · مرصد الإنجاز المستقبلي";

/** مناطق الدرس الأربع — تُفتح من شريط التنقل المشترك، لا من شريط خاص. */
export type Area38 = "lesson" | "test" | "solutions" | "teacher";

export type ChapterId38 = "arrive" | "frame" | "deadline" | "clause" | "control" | "compare" | "practice" | "read" | "wrap";

export type Chapter38 = {
  id: ChapterId38;
  title: string;
  en: string;
  icon: string;
  tone: "navy" | "brass" | "forest" | "indigo" | "paper";
  stepIds: string[];
};

export type Step38 = {
  id: string;
  sourceId: string;
  sourceOrder: number;
  section: ChapterId38;
  title: string;
  /** عنوان مختصر يُعرض في قائمة الخطوات */
  rail: string;
  subtitle: string;
  /** نطاق أسطر المصدر [from, to) — كل سطر مصدري يظهر مرة واحدة وفي مكانه. */
  range: [number, number];
  showMainTable: boolean;
  showExtraTable: boolean;
  showReveal: boolean;
  /** نص المصدر يُطوى في خطوات التدريب التي يعيد فيها النشاط البنود نفسها. */
  collapseSource: boolean;
  activity: string;
  step: number;
  source: SourceSection38;
};

type StepSpec38 = {
  id: string;
  sourceId: string;
  title?: string;
  subtitle: string;
  range?: [number, number];
  showMainTable?: boolean;
  showExtraTable?: boolean;
  showReveal?: boolean;
  collapseSource?: boolean;
  activity: string;
};

/**
 * خريطة خطوات الدرس — محطات قصيرة على خط زمني مستقبلي.
 * الأقسام الكثيفة قُسّمت إلى خطوتين: شرح مركّز ثم تطبيق. لا يُحذف أي سطر من المصدر.
 * الخارطة 39–48 محطة ختامية، وليست قسمًا مرقّمًا جديدًا داخل الدرس.
 */
const STEP_SPECS_38: StepSpec38[] = [
  { id: "cover", sourceId: "cover", subtitle: "مدخل الدرس، جسر Lesson 37، ومقارنة At 8:00 / By 8:00", activity: "cover" },

  { id: "s01", sourceId: "s01", subtitle: "الأهداف العشرة وقائمة المراجعة الذاتية", activity: "objectives" },

  { id: "s02a", sourceId: "s02", title: "🧠 2أ. الفكرة الأساسية: انظر إلى المستقبل من نقطة أبعد", subtitle: "مشروع الاثنين/الأربعاء/الجمعة والسؤال Will your project be ready by Friday?", range: [0, 11], activity: "timeline-story" },
  { id: "s02b", sourceId: "s02", title: "🧠 2ب. مختبر الخط الزمني: أين نقطة المرجع المستقبلية؟", subtitle: "استكشاف الأيام الثلاثة ثم تحديد نقطة النظر", range: [11, 15], showMainTable: true, activity: "timeline" },

  { id: "s03a", sourceId: "s03", title: "⭐ 3أ. القاعدة الأساسية: Subject + will + have + V3", subtitle: "الصيغة والمعنى العربي وثبات have مع جميع الضمائر", range: [0, 5], activity: "formula" },
  { id: "s03b", sourceId: "s03", title: "⭐ 3ب. ورشة بناء الصيغة + الأمثلة الخمسة", subtitle: "رتّب أجزاء الصيغة ثم اقرأ الأمثلة بترجمتها", range: [5, 15], activity: "formula-builder" },

  { id: "s04a", sourceId: "s04", title: "🔬 4أ. تحليل التركيب خطوة بخطوة", subtitle: "تشريح She will have completed the experiment by noon", range: [0, 12], activity: "anatomy" },
  { id: "s04b", sourceId: "s04", title: "🔬 4ب. have أم has؟ مختبر التشريح النحوي", subtitle: "اضغط أجزاء الجملة وحدّد دور كل جزء", range: [12, 14], activity: "parts" },

  { id: "s05", sourceId: "s05", subtitle: "الضمائر السبعة مع will have + V3 ومصائد التصريف", activity: "conjugation", showMainTable: true },

  { id: "s06a", sourceId: "s06", title: "🧠 6أ. الاستخدام الأول: إنجاز مكتمل بحلول وقت مستقبلي", subtitle: "أربعة أمثلة من المصدر بترجمتها", range: [0, 13], activity: "first-use-examples" },
  { id: "s06b", sourceId: "s06", title: "🧠 6ب. السؤال الذهبي وتطبيق الاستخدام الأول", subtitle: "عندما تصل إلى النقطة، هل سيكون الحدث قد اكتمل؟", range: [13, 16], activity: "first-use" },

  { id: "s07a", sourceId: "s07", title: "⏰ 7أ. BY — الكلمة المفتاحية الأهم", subtitle: "بحلول / في موعد لا يتجاوز، وليس بالضرورة في اللحظة نفسها", range: [0, 10], activity: "by-meaning" },
  { id: "s07b", sourceId: "s07", title: "⏰ 7ب. At 8:00 أم By 8:00؟ مختبر المعنى", subtitle: "الفرق الصغير في الكلمة وتأثيره في التركيز", range: [10, 14], activity: "at-by" },

  { id: "s08", sourceId: "s08", subtitle: "AT vs BY: ماذا يحدث عند الثامنة وماذا يكتمل بحلول التاسعة؟", activity: "at-by-lab", showMainTable: true },
  { id: "s09", sourceId: "s09", subtitle: "تسعة تعبيرات زمنية شائعة مع Future Perfect", activity: "time-expressions", showMainTable: true },

  { id: "s10a", sourceId: "s10", title: "🧩 10أ. الاستخدام الثاني: الإنجاز قبل حدث مستقبلي آخر", subtitle: "صديقك يصل الخامسة، وأنت تنهي الواجب قبل وصوله", range: [0, 9], activity: "two-events-story" },
  { id: "s10b", sourceId: "s10", title: "🧩 10ب. حدثان على خط زمني واحد", subtitle: "مثال المعلم والفيلم + مختبر ترتيب الحدثين", range: [9, 15], activity: "two-events" },

  { id: "s11a", sourceId: "s11", title: "🚨 11أ. قاعدة by the time + Present Simple", subtitle: "لماذا you arrive وليس you will arrive؟", range: [0, 8], activity: "by-the-time-rule" },
  { id: "s11b", sourceId: "s11", title: "🚨 11ب. أمثلة القاعدة وورشة التصحيح", subtitle: "ثلاثة أمثلة + ثلاثة مواقف للاختيار", range: [8, 15], activity: "by-the-time" },

  { id: "s12a", sourceId: "s12", title: "🧠 12أ. الفرق بين BY وBEFORE", subtitle: "بحلول الجمعة تسمح بالجمعة نفسها؛ قبل الجمعة لا", range: [0, 8], activity: "by-before-rule" },
  { id: "s12b", sourceId: "s12", title: "🧠 12ب. by 10:00 مقابل before 10:00", subtitle: "مثال الوصول + مختبر الموعدين", range: [8, 16], activity: "by-before" },

  { id: "s13a", sourceId: "s13", title: "🎭 13أ. حوار The School Exhibition", subtitle: "ستة أدوار أصلية مع إمكانية كشف الترجمة والتحليل لكل سطر", range: [0, 7], activity: "dialogue" },
  { id: "s13b", sourceId: "s13", title: "🎭 13ب. ترجمة الحوار وتحليل صيغه", subtitle: "الترجمة الكاملة + أربع صيغ Future Perfect في سياقها", range: [7, 19], activity: "dialogue-analysis" },

  { id: "s14a", sourceId: "s14", title: "🚫 14أ. النفي: will not / won't + have + V3", subtitle: "الصيغة والاختصار وأربعة أمثلة", range: [0, 7], activity: "negative-rule" },
  { id: "s14b", sourceId: "s14", title: "🚫 14ب. ورشة نفي الجمل", subtitle: "تحقّق من will not/won't + have + V3 في أمثلة المصدر", range: [7, 15], activity: "negative-builder" },

  { id: "s15", sourceId: "s15", subtitle: "النفي مرتبط بالموعد، وليس معناه «لن يحدث أبدًا»", activity: "negation-meaning" },

  { id: "s16a", sourceId: "s16", title: "❓ 16أ. تكوين السؤال: Yes/No Questions", subtitle: "نقل will قبل الفاعل: Will + Subject + have + V3?", range: [0, 7], activity: "yesno-rule" },
  { id: "s16b", sourceId: "s16", title: "❓ 16ب. ورشة بناء أسئلة Yes/No", subtitle: "أربعة أسئلة أصلية وفحص عناصر السؤال", range: [7, 15], activity: "yesno-builder" },

  { id: "s17", sourceId: "s17", subtitle: "Yes, I will. / No, I won't. دون تكرار have + V3", activity: "short-answers" },

  { id: "s18a", sourceId: "s18", title: "🔍 18أ. أسئلة Wh مع Future Perfect", subtitle: "الصيغة وخمسة أسئلة معلومات أصلية", range: [0, 3], activity: "wh-rule" },
  { id: "s18b", sourceId: "s18", title: "🔍 18ب. ورشة بناء أسئلة Wh", subtitle: "اختبار ترتيب الأداة والفاعل وhave + V3", range: [3, 13], activity: "wh-builder" },

  { id: "s19a", sourceId: "s19", title: "🔬 19أ. V3 — الأفعال المنتظمة", subtitle: "خمسة أفعال منتظمة وثلاثية V1/V2/V3", range: [0, 2], showMainTable: true, activity: "v3-regular" },
  { id: "s19b", sourceId: "s19", title: "🔬 19ب. V3 — الأفعال الشاذة في جمل", subtitle: "ثلاثة أفعال شاذة في أزواج صواب/خطأ", range: [2, 8], activity: "v3-pairs" },
  { id: "s19c", sourceId: "s19", title: "🔬 19ج. جدول V3 وورشة التصريف", subtitle: "عشرة أفعال شاذة + اكتب V3 لكل فعل", range: [8, 9], showExtraTable: true, activity: "v3" },

  { id: "s20", sourceId: "s20", subtitle: "حدث المستقبل مقابل اكتمال الحدث بحلول نقطة مستقبلية", activity: "fs-vs-fp" },
  { id: "s21", sourceId: "s21", subtitle: "الامتحان 9:00–11:00: At 10:00 جارٍ، By 12:00 مكتمل", activity: "fc-vs-fp" },
  { id: "s22", sourceId: "s22", subtitle: "الفعل write في Future Simple وContinuous وPerfect", activity: "three-futures", showMainTable: true },
  { id: "s23", sourceId: "s23", subtitle: "سارة تطبخ 5:00–7:00: الحدث نفسه بثلاث زوايا", activity: "same-event" },
  { id: "s24", sourceId: "s24", subtitle: "Present Perfect وPast Perfect وFuture Perfect: V3 نفسها ونقاط مرجعية مختلفة", activity: "perfect-map", showMainTable: true },

  { id: "s25a", sourceId: "s25", title: "🚨 25أ. أخطاء شائعة (١–٥): has وV1 وwent", subtitle: "أول خمسة أزواج خطأ/صواب من المصدر", range: [0, 10], activity: "errors-read" },
  { id: "s25b", sourceId: "s25", title: "🚨 25ب. أخطاء شائعة (٦–٧) ومختبر التشخيص", subtitle: "will في جملة by the time + will have be ready", range: [10, 15], activity: "errors", collapseSource: true },

  { id: "s26a", sourceId: "s26", title: "🎭 26أ. حوار Planning a Big Event", subtitle: "تسعة أدوار أصلية مع تحليل كل سطر", range: [0, 10], activity: "dialogue2" },
  { id: "s26b", sourceId: "s26", title: "🎭 26ب. ترجمة الحوار وتحليل صيغه", subtitle: "الترجمة الكاملة + Future Continuous بين صيغ Future Perfect", range: [10, 26], activity: "dialogue2-analysis" },

  { id: "s27", sourceId: "s27", subtitle: "ستة أسئلة اختيار من متعدد مع مفتاح المصدر بعد المحاولة", activity: "exercise27", collapseSource: true },
  { id: "s28", sourceId: "s28", subtitle: "ستة إكمالات بصيغة Future Perfect", activity: "fill28" },
  { id: "s29a", sourceId: "s29", title: "🔥 29أ. التمييز بين الأزمنة (①–④)", subtitle: "أربعة مواقف: At / By / توقع / نشاط جارٍ", range: [0, 8], activity: "tense29-a", collapseSource: true },
  { id: "s29b", sourceId: "s29", title: "🔥 29ب. التمييز بين الأزمنة (⑤–⑧)", subtitle: "أربعة مواقف + فرق ⑥ و⑦", range: [8, 13], activity: "tense29-b", collapseSource: true, showReveal: true },
  { id: "s30a", sourceId: "s30", title: "🕵️ 30أ. Grammar Detective (١–٥)", subtitle: "خمس جمل لتصحيح الأخطاء مع سبب كل خطأ", range: [0, 6], activity: "detective30-a", collapseSource: true },
  { id: "s30b", sourceId: "s30", title: "🕵️ 30ب. Grammar Detective (٦–١٠)", subtitle: "خمس جمل أخرى + will have be ready", range: [6, 12], activity: "detective30-b", collapseSource: true },
  { id: "s31", sourceId: "s31", subtitle: "IQ200: متى يكون Future Simple وFuture Perfect صحيحين مع by؟", activity: "iq31" },

  { id: "s32a", sourceId: "s32", title: "📖 32أ. Reading Challenge — Building a Smarter City", subtitle: "النص الكامل وتمييز صيغ المستقبل بصريًا", range: [0, 17], activity: "reading" },
  { id: "s32b", sourceId: "s32", title: "📖 32ب. أسئلة الفهم السبعة وتحليل التراكيب", subtitle: "اكتب إجاباتك ثم اعرض إجابات المصدر وتحليل الصيغ", range: [17, 25], showReveal: true, activity: "reading-lab" },

  { id: "s33", sourceId: "s33", subtitle: "25 سؤالًا في خمسة مستويات — الاختبار في منطقة مستقلة", range: [0, 2], activity: "test-launch" },
  { id: "s34", sourceId: "s34", subtitle: "مفتاح التصحيح التفصيلي في منطقة المعلم/الحلول بعد التسليم", activity: "teacher-pointer" },

  { id: "s35a", sourceId: "s35", title: "✍️ 35أ. المهمة وشروطها الثمانية", subtitle: "فقرة 12–15 جملة + كتابتك في المحرر", range: [0, 11], activity: "writing" },
  { id: "s35b", sourceId: "s35", title: "✍️ 35ب. النموذج الإرشادي وتحليله", subtitle: "أربع جمل نموذجية + فحص الشروط داخل النموذج", range: [11, 18], activity: "writing-model" },
  { id: "s36a", sourceId: "s36", title: "🧠 36أ. الملخص الذهبي — الصيغ الأربع", subtitle: "الإثبات والنفي والسؤال والإجابة القصيرة", range: [0, 20], activity: "summary" },
  { id: "s36b", sourceId: "s36", title: "🧠 36ب. الاستخدامات والمقارنة الذهبية", subtitle: "استخدمان + ثلاثة أزمنة في بطاقة واحدة", range: [20, 36], activity: "summary-golden" },

  { id: "map-a", sourceId: "roadmap", title: "🗺️ خارطة الدروس 39–48", subtitle: "عناوين المحطات العشر القادمة كما وردت في المصدر — خريطة مستقبلية لا درسًا جديدًا", range: [0, 2], showMainTable: true, activity: "roadmap-table" },
  { id: "map-b", sourceId: "roadmap", title: "🗺️ لماذا هذا التسلسل؟ والمحطة القادمة", subtitle: "من الأزمنة إلى المعاني الإضافية، ثم Future Perfect Continuous", range: [2, 18], activity: "roadmap-why" },
];

const RAIL_38: Record<string, string> = {
  cover: "المدخل",
  s01: "الأهداف",
  s02a: "الفكرة الأساسية",
  s02b: "مختبر الخط الزمني",
  s03a: "القاعدة",
  s03b: "ورشة الصيغة",
  s04a: "تحليل التركيب",
  s04b: "ثبات have",
  s05: "التصريف",
  s06a: "الاستخدام الأول",
  s06b: "السؤال الذهبي",
  s07a: "معنى by",
  s07b: "At أم By",
  s08: "مختبر At/By",
  s09: "تعبيرات زمنية",
  s10a: "حدثان",
  s10b: "ترتيب الحدثين",
  s11a: "by the time",
  s11b: "أمثلة القاعدة",
  s12a: "by وbefore",
  s12b: "مختبر الموعد",
  s13a: "حوار المعرض",
  s13b: "تحليل الحوار",
  s14a: "النفي",
  s14b: "ورشة النفي",
  s15: "معنى النفي",
  s16a: "أسئلة Yes/No",
  s16b: "ورشة السؤال",
  s17: "إجابات قصيرة",
  s18a: "أسئلة Wh",
  s18b: "ورشة Wh",
  s19a: "V3 منتظم",
  s19b: "V3 شاذ",
  s19c: "ورشة V3",
  s20: "Simple vs Perfect",
  s21: "Continuous vs Perfect",
  s22: "الأزمنة الثلاثة",
  s23: "ثلاث زوايا",
  s24: "الأزمنة التامة",
  s25a: "أخطاء 1–5",
  s25b: "أخطاء 6–7",
  s26a: "حوار المهرجان",
  s26b: "تحليل الحوار 2",
  s27: "تدريب 1",
  s28: "تدريب 2",
  s29a: "تدريب 3أ",
  s29b: "تدريب 3ب",
  s30a: "Detective 1–5",
  s30b: "Detective 6–10",
  s31: "IQ200",
  s32a: "القراءة",
  s32b: "أسئلة الفهم",
  s33: "الاختبار",
  s34: "الحلول",
  s35a: "مهمة الكتابة",
  s35b: "النموذج",
  s36a: "الملخص",
  s36b: "المقارنة الذهبية",
  "map-a": "خارطة 39–48",
  "map-b": "لماذا هذا التسلسل",
};

const CHAPTER_RULES_38: { id: ChapterId38; title: string; en: string; icon: string; tone: Chapter38["tone"]; sourceIds: string[] }[] = [
  { id: "arrive", title: "افتتاح المرصد", en: "ARRIVAL", icon: "🔭", tone: "navy", sourceIds: ["cover", "s01"] },
  { id: "frame", title: "بناء الصيغة وتشريحها", en: "THE FORM", icon: "🧩", tone: "brass", sourceIds: ["s02", "s03", "s04", "s05"] },
  { id: "deadline", title: "by ومحطات الموعد", en: "STATIONS", icon: "📍", tone: "indigo", sourceIds: ["s06", "s07", "s08", "s09"] },
  { id: "clause", title: "حدثان وجملة زمنية", en: "TWO EVENTS", icon: "⏳", tone: "forest", sourceIds: ["s10", "s11", "s12", "s13"] },
  { id: "control", title: "النفي والسؤال والإجابات", en: "CONTROL", icon: "🛠️", tone: "navy", sourceIds: ["s14", "s15", "s16", "s17", "s18", "s19"] },
  { id: "compare", title: "المقارنات والأخطاء", en: "COMPARE", icon: "⚖️", tone: "brass", sourceIds: ["s20", "s21", "s22", "s23", "s24", "s25"] },
  { id: "practice", title: "الحوار والتدريبات", en: "PRACTICE", icon: "🧪", tone: "forest", sourceIds: ["s26", "s27", "s28", "s29", "s30", "s31"] },
  { id: "read", title: "القراءة والاختبار", en: "READ & TEST", icon: "📖", tone: "indigo", sourceIds: ["s32", "s33", "s34"] },
  { id: "wrap", title: "الكتابة والخريطة المستقبلية", en: "WRAP UP", icon: "✨", tone: "paper", sourceIds: ["s35", "s36", "roadmap"] },
];

const CHAPTER_BY_SOURCE_38 = Object.fromEntries(
  CHAPTER_RULES_38.flatMap((chapter) => chapter.sourceIds.map((sourceId) => [sourceId, chapter.id] as const)),
) as Record<string, ChapterId38>;

function sourceFor38(id: string): SourceSection38 {
  const section = sourceSection38(id);
  if (!section) throw new Error(`Lesson 38 step references a missing source section: ${id}`);
  return section;
}

export const SLIDES_38: Step38[] = STEP_SPECS_38.map((spec, index) => {
  const source = sourceFor38(spec.sourceId);
  const range = spec.range ?? [0, source.units.length];
  if (range[0] < 0 || range[1] > source.units.length || range[0] >= range[1]) {
    throw new Error(`Lesson 38 step ${spec.id} has an invalid source range ${range.join("-")}`);
  }
  const section = CHAPTER_BY_SOURCE_38[spec.sourceId];
  if (!section) throw new Error(`Lesson 38 step ${spec.id} has no chapter`);
  return {
    id: spec.id,
    sourceId: spec.sourceId,
    sourceOrder: source.order,
    section,
    title: spec.title ?? source.title,
    rail: RAIL_38[spec.id] ?? spec.subtitle,
    subtitle: spec.subtitle,
    range,
    showMainTable: spec.showMainTable ?? false,
    showExtraTable: spec.showExtraTable ?? false,
    showReveal: spec.showReveal ?? false,
    collapseSource: spec.collapseSource ?? false,
    activity: spec.activity,
    step: index + 1,
    source,
  };
});

export const STEP_COUNT_38 = SLIDES_38.length;
export const NUMBERED_STEP_COUNT_38 = SLIDES_38.filter((slide) => slide.source.num != null).length;
export const SOURCE_TO_STEP_38 = Object.fromEntries(SLIDES_38.map((slide, index) => [slide.sourceId, index]));

export const CHAPTERS_38: Chapter38[] = CHAPTER_RULES_38.map((rule) => ({
  id: rule.id,
  title: rule.title,
  en: rule.en,
  icon: rule.icon,
  tone: rule.tone,
  stepIds: SLIDES_38.filter((slide) => slide.section === rule.id).map((slide) => slide.id),
}));

export function chapterOf38(id: ChapterId38): Chapter38 {
  const chapter = CHAPTERS_38.find((candidate) => candidate.id === id);
  if (!chapter) throw new Error(`Lesson 38 missing chapter ${id}`);
  return chapter;
}

export const PARTS_BY_SOURCE_38 = SLIDES_38.reduce<Record<string, Step38[]>>((accumulator, slide) => {
  accumulator[slide.sourceId] = [...(accumulator[slide.sourceId] ?? []), slide];
  return accumulator;
}, {});

export function slide38(id: string): Step38 | undefined {
  return SLIDES_38.find((slide) => slide.id === id);
}

export function slidesInChapter38(chapterId: ChapterId38) {
  return SLIDES_38.map((slide, index) => ({ slide, index })).filter(({ slide }) => slide.section === chapterId);
}

export function chapterForStep38(id: string): Chapter38 | undefined {
  return CHAPTERS_38.find((chapter) => chapter.stepIds.includes(id));
}

export { sourceSection38 };
