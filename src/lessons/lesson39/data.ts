import {
  SOURCE_SECTIONS_39,
  SOURCE_NUMBERED_COUNT_39,
  sourceSection39,
  type SourceSection39,
} from "./ledger39";

// ============================================================
// Lesson 39 — «مرصد الزمن المستقبلي» · The Future Time Observatory
//
// بيانات الدرس هنا وصفية فقط: محطات المراقبة، خريطة الخطوات، ووحدة المصدر
// التي تُعرض في كل خطوة. النص الحرفي للمصدر يبقى في `ledger39.ts` وحده
// (لا يُعاد كتابته هنا)، وكل سطر مصدري يظهر مرة واحدة بالضبط في مكانه.
// ============================================================

export const LESSON_TITLE_39 = "Lesson 39 — Future Perfect Continuous";
export const LESSON_TITLE_AR_39 =
  "الدرس 39: Future Perfect Continuous — المستقبل التام المستمر";
export const LESSON_SUBTITLE_39 = "How Long Will You Have Been Learning?";
export const LESSON_ARABIC_SUBTITLE_39 =
  "من معرفة المستقبل إلى قياس مدة النشاط في المستقبل — IQ200 🚀";
export const LESSON_LEVEL_39 = "تأسيسي متقدم — IQ200";
export const SECTION_COUNT_39 = SOURCE_NUMBERED_COUNT_39;

/** الهوية البصرية: مرصد الزمن المستقبلي. */
export const LESSON_IDENTITY_39 =
  "The Future Time Observatory · مرصد الزمن المستقبلي";

/** مناطق الدرس الأربع — تُفتح من لوحة المرصد داخل القشرة المشتركة. */
export type Area39 = "lesson" | "test" | "solutions" | "teacher";

export type StationId39 =
  | "gate"
  | "axis"
  | "calibrate"
  | "span"
  | "meters"
  | "beacon"
  | "signal"
  | "contrast"
  | "polarity"
  | "query"
  | "harmonics"
  | "drills"
  | "readout"
  | "exam"
  | "log"
  | "orbit";

export type Station39 = {
  id: StationId39;
  /** اسم المحطة كما يظهر في الفهرس */
  title: string;
  en: string;
  icon: string;
  /** مفتاح لون المحطة في CSS */
  tone: "cyan" | "violet" | "gold" | "teal" | "rose";
  stepIds: string[];
};

export type InstrumentId39 =
  | "none"
  | "gate"
  | "briefing"
  | "timeline"
  | "duration"
  | "formula"
  | "anatomy"
  | "pronouns"
  | "choice"
  | "sorter"
  | "build"
  | "dialogue"
  | "aspect"
  | "stative"
  | "error"
  | "practice"
  | "reading"
  | "writing"
  | "ladder"
  | "curriculum"
  | "teacher-gate";

export type Slide39 = {
  id: string;
  sourceId: string;
  sourceOrder: number;
  station: StationId39;
  title: string;
  /** عنوان قصير للفهرس */
  rail: string;
  subtitle: string;
  step: number;
  units: number[];
  table: boolean;
  extraTable: boolean;
  /** أسطر مفتاح المصدر (§29 · §30 · §31 · §32 · §34) تُعرض بعد المحاولة. */
  reveal: number[];
  instrument: InstrumentId39;
  /** مفتاح بيانات الأداة: معرّف حالة، أو نوع البناء، أو مفتاح مجموعة بنود. */
  instrumentKey?: string;
  source: SourceSection39;
};

type StepSpec39 = {
  id: string;
  sourceId: string;
  title: string;
  rail: string;
  subtitle: string;
  /** [from, to] شاملًا */
  units: [number, number] | number[];
  table?: boolean;
  extraTable?: boolean;
  reveal?: boolean;
  instrument?: InstrumentId39;
  instrumentKey?: string;
};

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

/**
 * خريطة الخطوات: كل خطوة هدف واحد. النطاقات تغطي كل سطر مصدري مرة واحدة،
 * والجداول الأصلية (الخط الزمني · الضمائر · for/since · المقارنة الذهبية ·
 * الجدول الذهبي) تُعاد بناؤها مرة واحدة في موضعها من المصدر.
 */
const STEP_SPECS_39: StepSpec39[] = [
  // ---------------------------------------------------------- بوابة المرصد
  {
    id: "gate-1",
    sourceId: "cover",
    title: "بوابة المرصد · From Result to Duration",
    rail: "المدخل: من النتيجة إلى المدة",
    subtitle: "جسر الدرس 38 ثم السؤال الجديد: كم ساعة ستكون قد أمضيتها؟",
    units: range(0, 8),
    instrument: "gate",
    instrumentKey: "bridge",
  },
  {
    id: "gate-2",
    sourceId: "cover",
    title: "بوابة المرصد · الزمن الجديد",
    rail: "الزمن الجديد ومكانه في المنظومة",
    subtitle: "Future Perfect Continuous هو آخر زمن رئيسي في منظومة المستقبل",
    units: range(9, 18),
    instrument: "aspect",
    instrumentKey: "cover",
  },
  {
    id: "s01-1",
    sourceId: "s01",
    title: "🎯 1. أهداف الدرس",
    rail: "أهداف الدرس العشرة",
    subtitle: "قائمة مهام المرصد: عشرة أهداف قابلة للتأشير",
    units: range(0, 10),
    instrument: "briefing",
  },

  // ---------------------------------------------------------- محور القياس
  {
    id: "s02-1",
    sourceId: "s02",
    title: "🧠 2. الفكرة الأساسية: نحن لا نقيس الإنجاز، بل المدة",
    rail: "حالة سامر: 4:00 ← 8:00",
    subtitle: "بداية النشاط، امتداده، ثم نقطة مرجع مستقبلية",
    units: range(0, 8),
    instrument: "timeline",
  },
  {
    id: "s02-2",
    sourceId: "s02",
    title: "🧠 2. العناصر الثلاثة والخط الزمني",
    rail: "العناصر الثلاثة والخط الزمني",
    subtitle: "NOW · 4:00 · 5:00 · 6:00 · 7:00 · 8:00 مع دور كل نقطة",
    units: range(9, 13),
    table: true,
  },
  {
    id: "s02-3",
    sourceId: "s02",
    title: "🧠 2. خلاصة المحور",
    rail: "تعريف المستقبل التام المستمر",
    subtitle: "مدة نشاط ممتدة حتى نقطة مستقبلية معينة",
    units: range(14, 16),
    instrument: "duration",
    instrumentKey: "samer",
  },
  {
    id: "s03-1",
    sourceId: "s03",
    title: "⭐ 3. القاعدة الأساسية",
    rail: "الصيغة: will have been + V-ing",
    subtitle: "ابنِ الصيغة بنفسك قطعة قطعة",
    units: range(0, 4),
    instrument: "formula",
  },
  {
    id: "s03-2",
    sourceId: "s03",
    title: "⭐ 3. الأمثلة الخمسة",
    rail: "خمسة أمثلة بترجمتها",
    subtitle: "نفس الصيغة مع كل الضمائر",
    units: range(5, 14),
  },
  {
    id: "s03-3",
    sourceId: "s03",
    title: "⭐ 3. المثال الكامل بموعد مرجعي",
    rail: "By noon… for five hours",
    subtitle: "الصيغة تصبح أوضح بمدة ونقطة مرجع",
    units: range(15, 18),
    instrument: "duration",
    instrumentKey: "noon",
  },

  // ---------------------------------------------------------- معايرة الصيغة
  {
    id: "s04-1",
    sourceId: "s04",
    title: "🔬 4. تحليل التركيب خطوة بخطوة",
    rail: "تشريح الجملة جزءًا جزءًا",
    subtitle: "اضغط أي جزء في الجملة لتعرف وظيفته",
    units: range(0, 10),
    instrument: "anatomy",
  },
  {
    id: "s04-2",
    sourceId: "s04",
    title: "🔬 4. مصيدة have / has",
    rail: "انتبه: will have لا will has",
    subtitle: "بعد will يأتي have مع جميع الضمائر",
    units: range(11, 16),
    instrument: "choice",
    instrumentKey: "have-has",
  },
  {
    id: "s05-1",
    sourceId: "s05",
    title: "⚙️ 5. التصريف مع جميع الضمائر",
    rail: "الضمائر السبعة والصيغة الثابتة",
    subtitle: "اختر ضميرًا وشاهد الصيغة نفسها: will have been + V-ing",
    units: range(0, 3),
    table: true,
    instrument: "pronouns",
  },

  // ---------------------------------------------------------- مسار الاستخدام
  {
    id: "s06-1",
    sourceId: "s06",
    title: "⏰ 6. الاستخدام الأول: نشاط يستمر حتى نقطة مستقبلية",
    rail: "أمثلة المصدر الأولى",
    subtitle: "حزيران القادم وسنتان من التعلم، والسادسة وثلاث ساعات طبخ",
    units: range(0, 6),
    instrument: "choice",
    instrumentKey: "first-use-a",
  },
  {
    id: "s06-2",
    sourceId: "s06",
    title: "⏰ 6. مثالان آخران للمدة الممتدة",
    rail: "المكتبة الجديدة ومنتصف الليل",
    subtitle: "سنة من البناء واثنتا عشرة ساعة من السفر",
    units: range(7, 12),
    instrument: "choice",
    instrumentKey: "first-use-b",
  },
  {
    id: "s06-3",
    sourceId: "s06",
    title: "⏰ 6. السؤال الذهبي",
    rail: "السؤال الذهبي للاستخدام",
    subtitle: "عندما تصل إلى النقطة، كم ستكون مدة النشاط؟",
    units: range(13, 15),
  },
  {
    id: "s07-1",
    sourceId: "s07",
    title: "🧠 7. هل يجب أن يستمر النشاط بعد النقطة؟",
    rail: "الاستمرار ليس مضمونًا",
    subtitle: "الزمن يقيس المدة حتى النقطة، ولا يقرر ما بعدها",
    units: range(0, 10),
    instrument: "choice",
    instrumentKey: "continuation",
  },

  // ---------------------------------------------------------- عدادات المدة
  {
    id: "s08-1",
    sourceId: "s08",
    title: "⭐ 8. FOR — للتعبير عن المدة",
    rail: "for: خمسة تعبيرات للمدة",
    subtitle: "for two hours · three days · six months · five years",
    units: range(0, 7),
  },
  {
    id: "s08-2",
    sourceId: "s08",
    title: "⭐ 8. for مع المستقبل التام المستمر",
    rail: "for في جمل الدرس",
    subtitle: "By 10:00 … و By next year …",
    units: range(8, 13),
    instrument: "choice",
    instrumentKey: "for",
  },
  {
    id: "s09-1",
    sourceId: "s09",
    title: "🔬 9. SINCE — للتعبير عن نقطة البداية",
    rail: "since: نقطة البداية",
    subtitle: "since Monday · 2020 · 8:00 · last summer",
    units: range(0, 7),
  },
  {
    id: "s09-2",
    sourceId: "s09",
    title: "🔬 9. since في جمل الدرس",
    rail: "since في جملتين بمرجع مستقبلي",
    subtitle: "منطقية نقطة البداية بالنسبة إلى نقطة المرجع",
    units: range(8, 13),
    instrument: "choice",
    instrumentKey: "since",
  },
  {
    id: "s10-1",
    sourceId: "s10",
    title: "⚔️ 10. FOR vs SINCE — المقارنة الذهبية",
    rail: "المقارنة: كيف نقرأ الفرق؟",
    subtitle: "المدة مقابل نقطة البداية",
    units: range(0, 6),
  },
  {
    id: "s10-2",
    sourceId: "s10",
    title: "⚔️ 10. How long? أم Since when?",
    rail: "سؤال FOR وسؤال SINCE",
    subtitle: "أي سؤال يجيب عنه كل حرف جر؟",
    units: range(7, 12),
    instrument: "choice",
    instrumentKey: "for-since-questions",
  },
  {
    id: "s10-3",
    sourceId: "s10",
    title: "⚔️ 10. بطاقات for / since",
    rail: "بطاقات المدة ونقطة البداية",
    subtitle: "صنّف ثمانية تعبيرات من المصدر",
    units: range(13, 13),
    table: true,
    instrument: "sorter",
  },
  {
    id: "s11-1",
    sourceId: "s11",
    title: "🧩 11. مختبر حساب المدة — أحمد",
    rail: "حساب المدة: من 3:00 إلى 7:00",
    subtitle: "اختر نقطة البداية ونقطة القياس واحسب المدة",
    units: range(0, 6),
    instrument: "duration",
    instrumentKey: "ahmad",
  },
  {
    id: "s11-2",
    sourceId: "s11",
    title: "🧩 11. مختبر حساب المدة — ليلى",
    rail: "حساب المدة: من 8:00 صباحًا إلى 2:00 ظهرًا",
    subtitle: "العدّاد نفسه بفترة عمل أطول",
    units: range(7, 12),
    instrument: "duration",
    instrumentKey: "layla",
  },
  {
    id: "s11-3",
    sourceId: "s11",
    title: "🧩 11. مختبر حساب المدة — مشروع المدرسة",
    rail: "حساب المدة بالأشهر",
    subtitle: "من كانون الثاني إلى تموز، وملاحظة افتراض المقارنة",
    units: range(13, 19),
    instrument: "duration",
    instrumentKey: "project",
  },

  // ---------------------------------------------------------- منارة المرجع
  {
    id: "s12-1",
    sourceId: "s12",
    title: "🕒 12. BY — النقطة المستقبلية المرجعية",
    rail: "by: معنى الموعد الأقصى",
    subtitle: "بحلول / في موعد لا يتجاوز — من الدرس 38",
    units: range(0, 3),
    instrument: "choice",
    instrumentKey: "by-a",
  },
  {
    id: "s12-2",
    sourceId: "s12",
    title: "🕒 12. by بين الإنجاز والمدة",
    rail: "نفس by وتركيزان مختلفان",
    subtitle: "will have finished مقابل will have been working",
    units: range(4, 13),
    instrument: "choice",
    instrumentKey: "by-b",
  },
  {
    id: "s13-1",
    sourceId: "s13",
    title: "🔥 13. BY THE TIME — بحلول الوقت الذي",
    rail: "حدثان على خط زمني واحد",
    subtitle: "وصولك هو النقطة التي نقيس عندها المدة",
    units: range(0, 6),
    instrument: "aspect",
    instrumentKey: "by-the-time",
  },
  {
    id: "s13-2",
    sourceId: "s13",
    title: "🔥 13. مثالان آخران مع by the time",
    rail: "وصول المعلم وبدء الحفل",
    subtitle: "المدة تُقاس عند الحدث المستقبلي الثاني",
    units: range(7, 12),
    instrument: "choice",
    instrumentKey: "by-the-time-items",
  },
  {
    id: "s14-1",
    sourceId: "s14",
    title: "🚨 14. لا تستخدم WILL بعد BY THE TIME الزمنية",
    rail: "Present Simple بعد by the time",
    subtitle: "By the time you arrive — لا you will arrive",
    units: range(0, 9),
    instrument: "choice",
    instrumentKey: "time-clause",
  },

  // ---------------------------------------------------------- إشارة الحوار
  {
    id: "s15-1",
    sourceId: "s15",
    title: "🎭 15. حوار تطبيقي: The Long Study Day",
    rail: "الحوار: ثمانية أدوار",
    subtitle: "اضغط أي دور لعرض ترجمته وتحليله",
    units: range(0, 8),
    instrument: "dialogue",
    instrumentKey: "study-day",
  },
  {
    id: "s15-2",
    sourceId: "s15",
    title: "🎭 15. الترجمة الكاملة للحوار",
    rail: "ترجمة الأدوار الثمانية",
    subtitle: "النص العربي لكل دور من المصدر",
    units: range(9, 17),
  },
  {
    id: "s15-3",
    sourceId: "s15",
    title: "🎭 15. تحليل صيغ الحوار",
    rail: "ثلاث صيغ ووظيفة كل واحدة",
    subtitle: "المدة، والإنجاز، والجهد الممتد في حوار واحد",
    units: range(18, 22),
    instrument: "choice",
    instrumentKey: "dialogue-check",
  },

  // ---------------------------------------------------------- مقياس التقابل
  {
    id: "s16-1",
    sourceId: "s16",
    title: "⚔️ 16. Future Perfect vs Future Perfect Continuous",
    rail: "الصيغتان والتركيز النموذجي",
    subtitle: "أهم مقارنة في الدرس",
    units: range(0, 8),
    instrument: "aspect",
    instrumentKey: "articles",
  },
  {
    id: "s16-2",
    sourceId: "s16",
    title: "⚔️ 16. الصيغة الثانية وتركيزها",
    rail: "مدة النشاط الممتدة",
    subtitle: "By Friday … for two weeks",
    units: range(9, 16),
    instrument: "aspect",
    instrumentKey: "articles-cont",
  },
  {
    id: "s16-3",
    sourceId: "s16",
    title: "⚔️ 16. المقارنة الذهبية",
    rail: "أي زمن يجيب عن أي سؤال؟",
    subtitle: "جدول المقارنة الذهبية + تدريب القرار",
    units: range(17, 17),
    table: true,
    instrument: "choice",
    instrumentKey: "fp-vs-fpc",
  },
  {
    id: "s17-1",
    sourceId: "s17",
    title: "🧠 17. النتيجة vs المدة — القراءة",
    rail: "ثلاثة كتب مقابل عشر ساعات",
    subtitle: "التركيز: عدد مكتمل أم مدة ممتدة",
    units: range(0, 6),
    instrument: "aspect",
    instrumentKey: "reading",
  },
  {
    id: "s17-2",
    sourceId: "s17",
    title: "🧠 17. البناء والتعلم",
    rail: "الجسر ودورة الإنجليزية",
    subtitle: "الإنجاز المكتمل والمدة في مثالين متقابلين",
    units: range(7, 18),
    instrument: "choice",
    instrumentKey: "paired",
  },
  {
    id: "s18-1",
    sourceId: "s18",
    title: "🔬 18. هل يعني الزمن أن العمل لم ينتهِ؟",
    rail: "الفرق ليس انتهى / لم ينتهِ",
    subtitle: "الفرق هو ما يبرزه كل زمن",
    units: range(0, 13),
    instrument: "choice",
    instrumentKey: "finished",
  },

  // ---------------------------------------------------------- قطبية النفي
  {
    id: "s19-1",
    sourceId: "s19",
    title: "🚫 19. النفي — Negative Form",
    rail: "الصيغة المنفية والاختصار",
    subtitle: "will not / won't + have + been + V-ing",
    units: range(0, 6),
  },
  {
    id: "s19-2",
    sourceId: "s19",
    title: "🚫 19. ورشة نفي الجمل الثلاث",
    rail: "حوّل جمل المصدر إلى النفي",
    subtitle: "قارن إجابتك بعد المحاولة",
    units: range(7, 12),
    instrument: "build",
    instrumentKey: "negative",
  },
  {
    id: "s20-1",
    sourceId: "s20",
    title: "🧠 20. معنى النفي في هذا الزمن",
    rail: "النفي قد يعني عدم بلوغ المدة",
    subtitle: "ليس بالضرورة نفي النشاط كله",
    units: range(0, 5),
    instrument: "choice",
    instrumentKey: "negation-meaning",
  },

  // ---------------------------------------------------------- استعلامات
  {
    id: "s21-1",
    sourceId: "s21",
    title: "❓ 21. تكوين السؤال — Yes/No Questions",
    rail: "Will + Subject + have + been + V-ing?",
    subtitle: "نقل will قبل الفاعل",
    units: range(0, 2),
  },
  {
    id: "s21-2",
    sourceId: "s21",
    title: "❓ 21. ورشة بناء أسئلة Yes/No",
    rail: "ثلاثة أسئلة من المصدر",
    subtitle: "حوّل الجمل الثلاث إلى أسئلة",
    units: range(3, 8),
    instrument: "build",
    instrumentKey: "yesno",
  },
  {
    id: "s22-1",
    sourceId: "s22",
    title: "💬 22. الإجابات القصيرة",
    rail: "Yes, I will. / No, I won't.",
    subtitle: "دون تكرار have been + V-ing",
    units: range(0, 7),
    instrument: "choice",
    instrumentKey: "short-answer",
  },
  {
    id: "s23-1",
    sourceId: "s23",
    title: "🔍 23. HOW LONG — السؤال الأهم",
    rail: "الصيغة ومثالان مكتملان",
    subtitle: "How long + will + Subject + have + been + V-ing?",
    units: range(0, 9),
  },
  {
    id: "s23-2",
    sourceId: "s23",
    title: "🔍 23. ورشة سؤال المدة",
    rail: "اسأل عن المدة في ثلاث جمل",
    subtitle: "المثال الثالث وإجاباته",
    units: range(10, 18),
    instrument: "build",
    instrumentKey: "howlong",
  },
  {
    id: "s24-1",
    sourceId: "s24",
    title: "⭐ 24. أسئلة Wh الأخرى",
    rail: "What · Where · Why",
    subtitle: "ولماذا تبقى How long الأكثر ارتباطًا؟",
    units: range(0, 8),
    instrument: "choice",
    instrumentKey: "wh",
  },

  // ---------------------------------------------------------- الأزمنة المتوازية
  {
    id: "s25-1",
    sourceId: "s25",
    title: "🧠 25. المقارنة الكبرى: الأزمنة التامة المستمرة",
    rail: "النقطة المرجعية هي الفرق",
    subtitle: "الحاضر · نقطة ماضية · نقطة مستقبلية",
    units: range(0, 13),
    instrument: "ladder",
  },
  {
    id: "s25-2",
    sourceId: "s25",
    title: "🧠 25. الجدول الذهبي والفكرة المشتركة",
    rail: "الجدول الذهبي للأزمنة الثلاثة",
    subtitle: "الفكرة المشتركة والاختلاف الوحيد",
    units: range(14, 18),
    table: true,
    instrument: "choice",
    instrumentKey: "perfect-continuous",
  },
  {
    id: "s26-1",
    sourceId: "s26",
    title: "⚠️ 26. أفعال الحالة — الأفعال الستة",
    rail: "know · believe · understand…",
    subtitle: "أفعال الحالة لا تُستخدم عادةً في المستمر",
    units: range(0, 8),
    instrument: "stative",
  },
  {
    id: "s26-2",
    sourceId: "s26",
    title: "⚠️ 26. صواب وخطأ مع أفعال الحالة",
    rail: "known مقابل knowing",
    subtitle: "وown مقابل owning، ثم live وwork",
    units: range(9, 19),
    instrument: "choice",
    instrumentKey: "stative-items",
  },
  {
    id: "s27-1",
    sourceId: "s27",
    title: "🚨 27. أخطاء شائعة جدًا (1–4)",
    rail: "أربعة أخطاء في الصيغة",
    subtitle: "has · being · V1 بعد been · won't has",
    units: range(0, 7),
    instrument: "choice",
    instrumentKey: "error-a",
  },
  {
    id: "s27-2",
    sourceId: "s27",
    title: "🚨 27. أخطاء شائعة جدًا (5–7)",
    rail: "السؤال · by the time · أفعال الحالة",
    subtitle: "ثلاثة أخطاء في التركيب والسياق",
    units: range(8, 13),
    instrument: "choice",
    instrumentKey: "error-b",
  },
  {
    id: "s28-1",
    sourceId: "s28",
    title: "🎭 28. حوار تطبيقي: The Marathon Training",
    rail: "حوار التدريب على الماراثون",
    subtitle: "ثلاثة أزمنة مختلفة في حوار واحد",
    units: range(0, 9),
    instrument: "dialogue",
    instrumentKey: "marathon",
  },
  {
    id: "s28-2",
    sourceId: "s28",
    title: "🎭 28. تحليل الحوار",
    rail: "مدة · إنجاز · توقع",
    subtitle: "وظيفة كل زمن داخل السياق",
    units: range(10, 19),
    instrument: "choice",
    instrumentKey: "vocational-check",
  },

  // ---------------------------------------------------------- معمل التدريب
  {
    id: "s29-1",
    sourceId: "s29",
    title: "✍️ 29. التدريب الأول: اختر الصيغة (①–③)",
    rail: "أول ثلاثة أسئلة اختيار",
    subtitle: "be / been / being و will / are / did",
    units: range(0, 11),
    instrument: "practice",
    instrumentKey: "exercise29-a",
  },
  {
    id: "s29-2",
    sourceId: "s29",
    title: "✍️ 29. التدريب الأول: اختر الصيغة (④–⑥)",
    rail: "الأسئلة الثلاثة الأخيرة",
    subtitle: "waiting · living · learning",
    units: range(12, 24),
    reveal: true,
    instrument: "practice",
    instrumentKey: "exercise29-b",
  },
  {
    id: "s30-1",
    sourceId: "s30",
    title: "🧩 30. التدريب الثاني: أكمل باستخدام الزمن",
    rail: "حوّل الأفعال بين القوسين",
    subtitle: "ست جمل تشمل النفي والسؤال",
    units: range(0, 7),
    reveal: true,
    instrument: "practice",
    instrumentKey: "fill30",
  },
  {
    id: "s31-1",
    sourceId: "s31",
    title: "🔥 31. التدريب الثالث: Future Perfect أم Continuous؟",
    rail: "اختر الزمن الأنسب بحسب المعنى",
    subtitle: "ثمانية أزواج تقارن الإنجاز بالمدة",
    units: range(0, 9),
    reveal: true,
    instrument: "practice",
    instrumentKey: "tense31",
  },
  {
    id: "s32-1",
    sourceId: "s32",
    title: "🕵️ 32. Grammar Detective — اكتشف الأخطاء",
    rail: "صحح عشر جمل",
    subtitle: "قارن تصحيحك بحلول المصدر بعد المحاولة",
    units: range(0, 11),
    reveal: true,
    instrument: "practice",
    instrumentKey: "detective32",
  },
  {
    id: "s33-1",
    sourceId: "s33",
    title: "🧠 33. IQ200 — هل الزمنان صحيحان؟",
    rail: "for لا تفرض الزمن المستمر",
    subtitle: "القاعدة المتقدمة في اختيار الزمن",
    units: range(0, 16),
    instrument: "choice",
    instrumentKey: "iq33",
  },

  // ---------------------------------------------------------- قراءة الرحلة
  {
    id: "s34-1",
    sourceId: "s34",
    title: "📖 34. Reading Challenge — A Journey Across the Country",
    rail: "نص الرحلة ومحطاتها",
    subtitle: "شاهد الرحلة على خط زمني تفاعلي",
    units: range(0, 15),
    instrument: "reading",
    instrumentKey: "journey",
  },
  {
    id: "s34-2",
    sourceId: "s34",
    title: "📖 34. أسئلة الفهم والحلول",
    rail: "سبعة أسئلة فهم",
    subtitle: "أجب أولًا ثم افتح مفتاح المصدر",
    units: range(16, 24),
    reveal: true,
    instrument: "reading",
    instrumentKey: "questions",
  },

  // ---------------------------------------------------------- الاختبار النهائي
  {
    id: "s35-1",
    sourceId: "s35",
    title: "🏆 35. الاختبار النهائي — Master Test",
    rail: "الاختبار النهائي: 25 سؤالًا",
    subtitle: "خمسة مستويات × خمسة أسئلة، قبل فتح مفتاح التصحيح",
    units: range(0, 1),
  },
  {
    id: "s35-2",
    sourceId: "s35",
    title: "🏆 35. خمسة مستويات في اختبار واحد",
    rail: "بنية الاختبار وتوزيعه",
    subtitle: "المستويات الخمسة وطريقة التسليم والتصحيح",
    units: [2],
    instrument: "none",
  },
  {
    id: "s36-1",
    sourceId: "s36",
    title: "🔐 36. مساحة المعلم — الحلول التفصيلية",
    rail: "بوابة المعلم",
    subtitle: "الحلول التفصيلية بعد التسليم أو بدخول المعلم",
    units: range(0, 2),
    instrument: "teacher-gate",
  },

  // ---------------------------------------------------------- سجل الرحلة
  {
    id: "s37-1",
    sourceId: "s37",
    title: "✍️ 37. مهمة الإنتاج اللغوي — Writing Mission",
    rail: "مهمة الكتابة: ثمانية شروط",
    subtitle: "My Learning Journey by Next Year",
    units: range(0, 10),
    instrument: "writing",
    instrumentKey: "brief",
  },
  {
    id: "s37-2",
    sourceId: "s37",
    title: "✍️ 37. النموذج الإرشادي",
    rail: "نموذج إرشادي قصير",
    subtitle: "اقرأ النموذج ثم اكتب فقرتك الخاصة",
    units: range(11, 17),
    instrument: "writing",
    instrumentKey: "model",
  },
  {
    id: "s38-1",
    sourceId: "s38",
    title: "🧠 38. الملخص الذهبي — الصيغ",
    rail: "الصيغة والنفي والسؤال",
    subtitle: "أربع بطاقات ملخص من المصدر",
    units: range(0, 13),
  },
  {
    id: "s38-2",
    sourceId: "s38",
    title: "🧠 38. الملخص الذهبي — الإجابة القصيرة والمدة",
    rail: "الإجابة القصيرة وسؤال How long",
    subtitle: "Yes, I will. / No, I won't.",
    units: range(14, 19),
  },
  {
    id: "s38-3",
    sourceId: "s38",
    title: "🧠 38. الاستخدامات والمقارنة الذهبية",
    rail: "ثلاثة استخدامات ومقارنة أخيرة",
    subtitle: "اختبر حفظك لبنية الملخص",
    units: range(20, 31),
    instrument: "choice",
    instrumentKey: "summary",
  },
  {
    id: "s39-1",
    sourceId: "s39",
    title: "🗺️ 39. خريطة تقدم المنهج",
    rail: "منظومة المستقبل المكتملة",
    subtitle: "ست صيغ مكتملة وأدوات التعبير عنها",
    units: range(0, 13),
    instrument: "curriculum",
  },
  {
    id: "s39-2",
    sourceId: "s39",
    title: "🗺️ 39. المحطة القادمة — Lesson 40",
    rail: "الدرس 40: Master Review",
    subtitle: "من معرفة كل زمن إلى اختياره تلقائيًا",
    units: range(14, 18),
  },
];

const STATION_ORDER: StationId39[] = [
  "gate",
  "axis",
  "calibrate",
  "span",
  "meters",
  "beacon",
  "signal",
  "contrast",
  "polarity",
  "query",
  "harmonics",
  "drills",
  "readout",
  "exam",
  "log",
  "orbit",
];

function stationOf(sourceId: string): StationId39 {
  switch (sourceId) {
    case "cover":
    case "s01":
      return "gate";
    case "s02":
    case "s03":
      return "axis";
    case "s04":
    case "s05":
      return "calibrate";
    case "s06":
    case "s07":
      return "span";
    case "s08":
    case "s09":
    case "s10":
    case "s11":
      return "meters";
    case "s12":
    case "s13":
    case "s14":
      return "beacon";
    case "s15":
      return "signal";
    case "s16":
    case "s17":
    case "s18":
      return "contrast";
    case "s19":
    case "s20":
      return "polarity";
    case "s21":
    case "s22":
    case "s23":
    case "s24":
      return "query";
    case "s25":
    case "s26":
    case "s27":
    case "s28":
      return "harmonics";
    case "s29":
    case "s30":
    case "s31":
    case "s32":
    case "s33":
      return "drills";
    case "s34":
      return "readout";
    case "s35":
    case "s36":
      return "exam";
    case "s37":
    case "s38":
      return "log";
    default:
      return "orbit";
  }
}

export const SLIDES_39: Slide39[] = STEP_SPECS_39.map((spec, index) => {
  const source = sourceSection39(spec.sourceId);
  if (!source) throw new Error(`Lesson 39 source section is missing: ${spec.sourceId}`);
  const units = [...spec.units];
  return {
    id: spec.id,
    sourceId: spec.sourceId,
    sourceOrder: source.order,
    station: stationOf(spec.sourceId),
    title: spec.title,
    rail: spec.rail,
    subtitle: spec.subtitle,
    step: index + 1,
    units,
    table: Boolean(spec.table),
    extraTable: Boolean(spec.extraTable),
    reveal: spec.reveal ? (source.revealUnits ?? []).map((_, i) => i) : [],
    instrument: spec.instrument ?? "none",
    instrumentKey: spec.instrumentKey,
    source,
  };
});

export const STEP_COUNT_39 = SLIDES_39.length;

const STATION_META: Record<StationId39, Omit<Station39, "stepIds">> = {
  gate: { id: "gate", title: "بوابة المرصد", en: "OBSERVATORY GATE", icon: "🛰️", tone: "cyan" },
  axis: { id: "axis", title: "محور القياس", en: "MEASURING AXIS", icon: "📐", tone: "cyan" },
  calibrate: { id: "calibrate", title: "معايرة الصيغة", en: "FORM CALIBRATION", icon: "⚙️", tone: "violet" },
  span: { id: "span", title: "مسار الاستخدام", en: "USAGE SPAN", icon: "⏱️", tone: "teal" },
  meters: { id: "meters", title: "عدّادات المدة", en: "DURATION METERS", icon: "🧮", tone: "gold" },
  beacon: { id: "beacon", title: "منارة المرجع", en: "REFERENCE BEACON", icon: "🕒", tone: "gold" },
  signal: { id: "signal", title: "إشارات الحوار", en: "DIALOGUE SIGNAL", icon: "🎭", tone: "violet" },
  contrast: { id: "contrast", title: "مقياس التقابل", en: "CONTRAST SCALE", icon: "⚔️", tone: "rose" },
  polarity: { id: "polarity", title: "قطبية النفي", en: "NEGATIVE POLARITY", icon: "🚫", tone: "rose" },
  query: { id: "query", title: "استعلامات المرصد", en: "QUERY CONSOLE", icon: "❓", tone: "cyan" },
  harmonics: { id: "harmonics", title: "الأزمنة المتوازية", en: "TENSE HARMONICS", icon: "🧠", tone: "violet" },
  drills: { id: "drills", title: "معمل التدريب", en: "DRILL LAB", icon: "🧪", tone: "teal" },
  readout: { id: "readout", title: "قراءة الرحلة", en: "READING READOUT", icon: "📖", tone: "gold" },
  exam: { id: "exam", title: "الاختبار النهائي", en: "FINAL ORBIT", icon: "🏆", tone: "gold" },
  log: { id: "log", title: "سجل الرحلة", en: "MISSION LOG", icon: "✍️", tone: "cyan" },
  orbit: { id: "orbit", title: "خريطة المدار", en: "CURRICULUM ORBIT", icon: "🗺️", tone: "violet" },
};

export const STATIONS_39: Station39[] = STATION_ORDER.map((id) => ({
  ...STATION_META[id],
  stepIds: SLIDES_39.filter((slide) => slide.station === id).map((slide) => slide.id),
}));

export function stationOf39(id: StationId39): Station39 {
  return STATIONS_39.find((station) => station.id === id)!;
}

export function slide39(id: string): Slide39 | undefined {
  return SLIDES_39.find((slide) => slide.id === id);
}

/** كل سطر مصدري يظهر مرة واحدة بالضبط — تُستخدم في التدقيق والتغطية. */
export const SOURCE_UNIT_TOTAL_39 = SOURCE_SECTIONS_39.reduce(
  (total, section) => total + section.units.length,
  0,
);

export const REVEAL_UNIT_TOTAL_39 = SOURCE_SECTIONS_39.reduce(
  (total, section) => total + (section.revealUnits?.length ?? 0),
  0,
);

export { sourceSection39 };
export type { SourceSection39 };
