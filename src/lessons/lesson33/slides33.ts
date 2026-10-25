import type { TenseId33, Tone33 } from "./design33";

// ============================================================
// ترتيب شرائح الدرس 33 — شرائح قصيرة، كل واحدة بهدف تعليمي واحد.
// `section` يحيل إلى كتلة سجل المصدر (cover / objectives / s1 … s24).
// `ranges` = أسطر المادة المعروضة مباشرة في الشريحة.
// `keyRanges` = أسطر المادة التي تحمل إجابة/حلًا، ولا تظهر إلا بعد محاولة الطالب.
// كل وحدة مصدرية تظهر مرة واحدة بالضبط (يتحقق منه coverage33 + audit-lesson33).
// ============================================================

export type StationId33 = "start" | "map" | "build" | "duel" | "detective" | "reading" | "master" | "output";

export type LabKey33 =
  | "model-flip"
  | "form-match"
  | "nora-sort"
  | "context-match"
  | "short-answers"
  | "pick-correct"
  | "signal-sort"
  | "duel-choose"
  | "question-match"
  | "focus-lens"
  | "stative-gate"
  | "think-split"
  | "both-correct"
  | "story-highlight"
  | "situation-match"
  | "golden-flip"
  | "golden-rule"
  | "progress-map";

export type Slide33 = {
  id: string;
  section: string;
  station: StationId33;
  kind: "cover" | "lesson" | "detective" | "practice" | "paragraph" | "analysis" | "reading" | "test" | "testResult" | "solutions" | "writing";
  title: string;
  badge?: string;
  lead?: string;
  tip?: string;
  mascot: string;
  tone?: Tone33;
  ranges?: [number, number][];
  keyRanges?: [number, number][];
  /**
   * في الشرائح التفاعلية (detective / practice / analysis / paragraph) يرسم
   * المختبر بنود المادة بنفسه، فتُحدَّد هنا الوحدات النصية الإضافية التي
   * تُرسم كنص عادي حول المختبر (تعليمات، تحذيرات، ملاحظات).
   * كلها جزء من ranges/keyRanges — لا تضيف وحدات جديدة.
   */
  headRanges?: [number, number][];
  footRanges?: [number, number][];
  /** "forms" = لوحة بناء زمن واحد (§5)، "duel" = زوجا مواجهة (§8/§9). */
  variant?: "auto" | "objectives" | "steps" | "table" | "tenseTable" | "signalTable" | "tense" | "forms" | "duel";
  tense?: TenseId33;
  lab?: LabKey33;
  /** مجموعة تدريب/محقّق: كتلة المادة + أرقام البنود المعروضة في الشريحة. */
  items?: { from: number; to: number };
  readingPart?: "story-a" | "story-b";
  testLevel?: number;
  testItems?: [number, number];
  writingPart?: "brief" | "criteria" | "model";
};

export const STATIONS_33: { id: StationId33; name: string; en: string; emoji: string; tone: Tone33 }[] = [
  { id: "start", name: "الانطلاق", en: "Orientation", emoji: "🚀", tone: "slate" },
  { id: "map", name: "الخريطة الذهبية", en: "The Golden Map", emoji: "🗺️", tone: "sky" },
  { id: "build", name: "البناء والأدوات", en: "Forms & Signals", emoji: "⚙️", tone: "amber" },
  { id: "duel", name: "المواجهات", en: "Tense Duels", emoji: "⚔️", tone: "emerald" },
  { id: "detective", name: "المحقق والتدريب", en: "Grammar Detective", emoji: "🕵️", tone: "violet" },
  { id: "reading", name: "القراءة والتحليل", en: "Reading & Analysis", emoji: "📖", tone: "sky" },
  { id: "master", name: "الاختبار والحلول", en: "Master Test", emoji: "🏆", tone: "emerald" },
  { id: "output", name: "الإنتاج والخاتمة", en: "Writing & Roadmap", emoji: "✍️", tone: "violet" },
];

export const LESSON_TITLE_33 = "الدرس 33: The Four Present Tenses";
export const LESSON_SUBTITLE_33 = "المراجعة الشاملة لأزمنة الحاضر الأربعة — Present Tenses Mastery";
export const LAB_NAME_33 = "THE FOUR-PRESENT LAB";
export const LAB_MOTTO_33 = "V1 / V-s · am-is-are + V-ing · have-has + V3 · have-has + been + V-ing";

const slide = (partial: Slide33): Slide33 => ({ mascot: "📘", kind: "lesson", ...partial });

export const SLIDES_33: Slide33[] = [
  // ---------------- 🚀 الانطلاق ----------------
  slide({ id: "cover", section: "cover", station: "start", kind: "cover", title: "The Four Present Tenses", mascot: "🧪", ranges: [[0, 1]] }),
  slide({
    id: "s0-why",
    section: "cover",
    station: "start",
    title: "لماذا مراجعة شاملة الآن؟",
    badge: "الانطلاق",
    mascot: "🧠",
    ranges: [[2, 3]],
    tip: "لا نبحث عن كلمة دالة، بل نسأل: ما الذي يريد المتحدث إبرازه؟",
  }),
  slide({ id: "obj-a", section: "objectives", station: "start", title: "ماذا ستتقن؟ (1/2)", badge: "أهداف الدرس", mascot: "🎯", variant: "objectives", ranges: [[0, 3]], headRanges: [[0, 0]] }),
  slide({ id: "obj-b", section: "objectives", station: "start", title: "ماذا ستتقن؟ (2/2)", badge: "أهداف الدرس", mascot: "🎯", variant: "objectives", ranges: [[4, 7]] }),

  // ---------------- 🗺️ الخريطة الذهبية ----------------
  slide({
    id: "s1-a",
    section: "s1",
    station: "map",
    title: "عدستان أوليان: العادة والنشاط الجاري",
    badge: "الخريطة الذهبية",
    mascot: "🔁",
    tone: "sky",
    variant: "tense",
    ranges: [[0, 8]],
    tip: "افتح كل عدسة لترى المثال والترجمة وما يركّز عليه الزمن.",
  }),
  slide({
    id: "s1-b",
    section: "s1",
    station: "map",
    title: "العدستان الأخريان: الإنجاز والنشاط الممتد",
    badge: "الخريطة الذهبية",
    mascot: "⏳",
    tone: "violet",
    variant: "tense",
    ranges: [[9, 16]],
    tip: "الفرق بينهما فرقُ تركيز: العدد المكتمل أم امتداد النشاط.",
  }),
  slide({
    id: "s1-c",
    section: "s1",
    station: "map",
    title: "النموذج الذهني في أربع معادلات",
    badge: "احفظها",
    mascot: "🗺️",
    lab: "model-flip",
    ranges: [[17, 21]],
    headRanges: [[17, 17]],
  }),

  slide({ id: "s2-a", section: "s2", station: "map", title: "الصيغة الأساسية لكل زمن", badge: "جدول البناء", mascot: "🧱", variant: "tenseTable", ranges: [[0, 4]] }),
  slide({
    id: "s2-b",
    section: "s2",
    station: "map",
    title: "فعل واحد… أربع بنى",
    badge: "جدول البناء",
    mascot: "🧱",
    lab: "form-match",
    ranges: [[5, 10]],
    headRanges: [[5, 5]],
    footRanges: [[10, 10]],
  }),

  slide({ id: "s3-a", section: "s3", station: "map", title: "مختبر نورا: العدستان الأولى والثانية", badge: "مختبر المعنى", mascot: "🔬", tone: "amber", ranges: [[0, 6]] }),
  slide({ id: "s3-b", section: "s3", station: "map", title: "مختبر نورا: العدستان الثالثة والرابعة", badge: "مختبر المعنى", mascot: "🔬", tone: "violet", ranges: [[7, 12]] }),
  slide({
    id: "s3-c",
    section: "s3",
    station: "map",
    title: "رتّب جمل نورا على زوايا النظر",
    badge: "مختبر المعنى",
    mascot: "🔬",
    lab: "nora-sort",
    ranges: [[13, 15]],
    footRanges: [[13, 15]],
  }),

  slide({ id: "s4-a", section: "s4", station: "map", title: "أربعة أسئلة تحسم الزمن", badge: "قبل أن تختار", mascot: "🧭", variant: "steps", ranges: [[0, 8]], headRanges: [[0, 0]] }),
  slide({ id: "s4-b", section: "s4", station: "map", title: "جملة عربية واحدة… أربعة احتمالات", badge: "السياق أولًا", mascot: "🧭", ranges: [[9, 12]] }),
  slide({
    id: "s4-c",
    section: "s4",
    station: "map",
    title: "طابق السياق مع الجملة الإنجليزية",
    badge: "السياق أولًا",
    mascot: "🧭",
    lab: "context-match",
    ranges: [[13, 25]],
    footRanges: [[25, 25]],
  }),

  // ---------------- ⚙️ البناء والأدوات ----------------
  slide({ id: "s5-a", section: "s5", station: "build", title: "الإثبات والنفي والسؤال: المضارع البسيط", badge: "يتدرّب", mascot: "⚙️", tone: "sky", tense: "PS", variant: "forms", ranges: [[0, 12]], headRanges: [[0, 0]] }),
  slide({ id: "s5-b", section: "s5", station: "build", title: "الإثبات والنفي والسؤال: المضارع المستمر", badge: "يتدرّب", mascot: "⚙️", tone: "amber", tense: "PC", variant: "forms", ranges: [[13, 24]] }),
  slide({ id: "s5-c", section: "s5", station: "build", title: "الإثبات والنفي والسؤال: المضارع التام", badge: "يتدرّب", mascot: "⚙️", tone: "emerald", tense: "PP", variant: "forms", ranges: [[25, 36]] }),
  slide({
    id: "s5-d",
    section: "s5",
    station: "build",
    title: "الإثبات والنفي والسؤال: المضارع التام المستمر",
    badge: "يتدرّب",
    mascot: "⚙️",
    tone: "violet",
    tense: "PPC",
    variant: "forms",
    ranges: [[37, 48]],
  }),
  slide({
    id: "s5-e",
    section: "s5",
    station: "build",
    title: "الإجابات القصيرة: مراجعة الأزمنة الأربعة",
    badge: "يتدرّب",
    mascot: "💬",
    lab: "short-answers",
    tip: "الإجابة القصيرة تعيد الفعل المساعد نفسه الذي جاء في السؤال.",
  }),

  slide({
    id: "s6-a",
    section: "s6",
    station: "build",
    title: "أيهما مبنيّة بناءً سليمًا؟",
    badge: "لا تخلط",
    mascot: "🚨",
    tone: "rose",
    lab: "pick-correct",
    ranges: [[0, 8]],
    headRanges: [[0, 0]],
  }),
  slide({ id: "s6-b", section: "s6", station: "build", title: "قاعدة IQ200 للبناء", badge: "لا تخلط", mascot: "🚨", tone: "rose", ranges: [[9, 10]] }),

  slide({ id: "s7-a", section: "s7", station: "build", title: "الكلمات الدالة لكل زمن", badge: "أدوات لا قوانين", mascot: "⏰", variant: "signalTable", ranges: [[0, 4]] }),
  slide({
    id: "s7-b",
    section: "s7",
    station: "build",
    title: "فرز الكلمات الدالة… والحدود",
    badge: "أدوات لا قوانين",
    mascot: "⏰",
    lab: "signal-sort",
    ranges: [[5, 12]],
    headRanges: [[5, 12]],
  }),

  // ---------------- ⚔️ المواجهات ----------------
  slide({ id: "s8-a", section: "s8", station: "duel", title: "المواجهة الأولى: عملي المعتاد أم وضعي هذا الشهر؟", badge: "بسيط × مستمر", mascot: "⚔️", tone: "sky", variant: "duel", ranges: [[0, 6]] }),
  slide({ id: "s8-b", section: "s8", station: "duel", title: "المواجهة الأولى: وضع مستقر أم إقامة مؤقتة؟", badge: "بسيط × مستمر", mascot: "⚔️", tone: "sky", variant: "duel", ranges: [[7, 13]] }),
  slide({ id: "s8-c", section: "s8", station: "duel", title: "تحدّي المواجهة الأولى", badge: "بسيط × مستمر", mascot: "⚔️", tone: "sky", lab: "duel-choose", ranges: [[14, 17]], keyRanges: [[18, 20]] }),

  slide({ id: "s9-a", section: "s9", station: "duel", title: "المواجهة الثانية: ماذا تفعل الآن؟ أم منذ متى؟", badge: "مستمر × تام مستمر", mascot: "⚔️", tone: "amber", ranges: [[0, 9]] }),
  slide({
    id: "s9-b",
    section: "s9",
    station: "duel",
    title: "طابق الجملة مع السؤال الذي تجيب عنه",
    badge: "مستمر × تام مستمر",
    mascot: "⚔️",
    tone: "amber",
    lab: "question-match",
    ranges: [[10, 17]],
    headRanges: [[10, 13]],
  }),

  slide({ id: "s10-a", section: "s10", station: "duel", title: "المواجهة الثالثة: العدد أم المدة؟", badge: "تام × تام مستمر", mascot: "⚔️", tone: "emerald", ranges: [[0, 9]] }),
  slide({
    id: "s10-b",
    section: "s10",
    station: "duel",
    title: "نقطة متقدمة: الفرق تركيزٌ لا انتهاء",
    badge: "تام × تام مستمر",
    mascot: "⚔️",
    tone: "emerald",
    lab: "focus-lens",
    ranges: [[10, 14]],
    headRanges: [[10, 11]],
    keyRanges: [[15, 19]],
  }),

  slide({ id: "s11-a", section: "s11", station: "duel", title: "سبعة أفعال تصف حالة", badge: "أفعال الحالة", mascot: "🧠", tone: "violet", lab: "stative-gate", ranges: [[0, 8]], headRanges: [[0, 0]], footRanges: [[8, 8]] }),
  slide({ id: "s11-b", section: "s11", station: "duel", title: "أفعال الحالة في الصيغ التامة", badge: "أفعال الحالة", mascot: "🧠", tone: "violet", ranges: [[9, 14]] }),
  slide({
    id: "s11-c",
    section: "s11",
    station: "duel",
    title: "حين يتغيّر معنى الفعل نفسه",
    badge: "أفعال الحالة",
    mascot: "🧠",
    tone: "violet",
    lab: "think-split",
    ranges: [[15, 22]],
    headRanges: [[15, 16]],
  }),

  // ---------------- 🕵️ المحقق والتدريب ----------------
  slide({
    id: "s12-a",
    section: "s12",
    station: "detective",
    title: "المحقق: أربع جمل تحتاج تصحيحًا",
    badge: "المستوى الأول",
    mascot: "🕵️",
    kind: "detective",
    items: { from: 1, to: 4 },
    ranges: [[0, 4]],
    headRanges: [[0, 0]],
    keyRanges: [[10, 13]],
  }),
  slide({
    id: "s12-b",
    section: "s12",
    station: "detective",
    title: "المحقق: أربع جمل أخرى",
    badge: "المستوى الأول",
    mascot: "🕵️",
    kind: "detective",
    items: { from: 5, to: 8 },
    ranges: [[5, 8], [18, 18]],
    footRanges: [[18, 18]],
    keyRanges: [[9, 9], [14, 17], [19, 19]],
  }),

  slide({
    id: "s13-a",
    section: "s13",
    station: "detective",
    title: "التدريب الأول (1/2)",
    badge: "اختر الزمن",
    mascot: "✍️",
    kind: "practice",
    items: { from: 1, to: 5 },
    ranges: [[0, 5]],
    headRanges: [[0, 0]],
  }),
  slide({
    id: "s13-b",
    section: "s13",
    station: "detective",
    title: "التدريب الأول (2/2)",
    badge: "اختر الزمن",
    mascot: "✍️",
    kind: "practice",
    items: { from: 6, to: 10 },
    ranges: [[6, 12]],
    footRanges: [[11, 12]],
  }),

  slide({
    id: "s14-a",
    section: "s14",
    station: "detective",
    title: "أربع جمل… أربعة أزمنة",
    badge: "يصمّم",
    mascot: "🧩",
    kind: "practice",
    items: { from: 1, to: 4 },
    ranges: [[0, 5]],
    headRanges: [[0, 1]],
  }),
  slide({ id: "s14-b", section: "s14", station: "detective", title: "حلول الجمل الأربع", badge: "يصمّم", mascot: "🧩", keyRanges: [[6, 10]] }),
  slide({ id: "s14-c", section: "s14", station: "detective", title: "لماذا هذا الزمن دون غيره؟", badge: "يصمّم", mascot: "🧩", ranges: [[11, 16]] }),

  slide({
    id: "s15-a",
    section: "s15",
    station: "detective",
    title: "حين تكون إجابتان صحيحتين",
    badge: "IQ200",
    mascot: "🧠",
    tone: "violet",
    lab: "both-correct",
    ranges: [[0, 4]],
    headRanges: [[0, 1]],
    keyRanges: [[5, 9]],
  }),
  slide({ id: "s15-b", section: "s15", station: "detective", title: "الدرس المهم بعد for و since", badge: "IQ200", mascot: "🧠", tone: "violet", ranges: [[10, 16]] }),

  // ---------------- 📖 القراءة والتحليل ----------------
  slide({ id: "s16-a", section: "s16", station: "reading", title: "The Young Inventor", badge: "قراءة", mascot: "📖", kind: "reading", readingPart: "story-a", ranges: [[0, 4]] }),
  slide({
    id: "s16-b",
    section: "s16",
    station: "reading",
    title: "تتمة القصة وكشف العبارات",
    badge: "قراءة",
    mascot: "📖",
    kind: "reading",
    readingPart: "story-b",
    lab: "story-highlight",
    ranges: [[5, 7]],
  }),

  slide({
    id: "s17-a",
    section: "s17",
    station: "reading",
    title: "حلّل القصة (1/2)",
    badge: "تحليل",
    mascot: "🔍",
    kind: "analysis",
    items: { from: 1, to: 6 },
    ranges: [[0, 6]],
  }),
  slide({
    id: "s17-b",
    section: "s17",
    station: "reading",
    title: "حلّل القصة (2/2)",
    badge: "تحليل",
    mascot: "🔍",
    kind: "analysis",
    items: { from: 7, to: 11 },
    ranges: [[7, 12]],
    footRanges: [[12, 12]],
  }),

  slide({
    id: "s18-a",
    section: "s18",
    station: "reading",
    title: "فقرة إيما: أحد عشر موضعًا",
    badge: "المستوى المتقدم",
    mascot: "🕵️",
    kind: "paragraph",
    ranges: [[0, 2]],
    headRanges: [[0, 0]],
    footRanges: [[2, 2]],
  }),
  slide({
    id: "s18-b",
    section: "s18",
    station: "reading",
    title: "الفقرة بعد التصحيح",
    badge: "المستوى المتقدم",
    mascot: "🕵️",
    kind: "paragraph",
    ranges: [[3, 3]],
    headRanges: [[3, 3]],
    keyRanges: [[4, 4]],
  }),
  slide({ id: "s18-c", section: "s18", station: "reading", title: "لماذا؟ المواضع الستة الأولى", badge: "المستوى المتقدم", mascot: "🕵️", kind: "paragraph", ranges: [[5, 5]], headRanges: [[5, 5]], keyRanges: [[6, 11]] }),
  slide({ id: "s18-d", section: "s18", station: "reading", title: "لماذا؟ المواضع الخمسة الأخيرة", badge: "المستوى المتقدم", mascot: "🕵️", kind: "paragraph", ranges: [[17, 17]], footRanges: [[17, 17]], keyRanges: [[12, 16]] }),

  slide({
    id: "s19-a",
    section: "s19",
    station: "reading",
    title: "أربعة مواقف… أربعة أزمنة",
    badge: "اختلاف المعنى",
    mascot: "🚀",
    tone: "violet",
    lab: "situation-match",
    items: { from: 1, to: 2 },
    ranges: [[0, 3], [5, 7]],
    headRanges: [[0, 0]],
    keyRanges: [[4, 4], [8, 8]],
  }),
  slide({
    id: "s19-b",
    section: "s19",
    station: "reading",
    title: "الموقفان الثالث والرابع",
    badge: "اختلاف المعنى",
    mascot: "🚀",
    tone: "violet",
    lab: "situation-match",
    items: { from: 3, to: 4 },
    ranges: [[9, 11], [13, 15]],
    keyRanges: [[12, 12], [16, 16]],
  }),

  // ---------------- 🏆 الاختبار والحلول ----------------
  slide({ id: "s20-intro", section: "s20", station: "master", title: "Present Tenses Master Test", badge: "الاختبار", mascot: "🏆", tone: "emerald", ranges: [[0, 1]] }),
  slide({ id: "test-l1", section: "s20", station: "master", title: "المستوى الأول: اختيار الزمن", badge: "١ / ٥", mascot: "🏆", kind: "test", testLevel: 1, testItems: [1, 5], tone: "sky", ranges: [[2, 7]] }),
  slide({ id: "test-l2", section: "s20", station: "master", title: "المستوى الثاني: تصريف الفعل", badge: "٢ / ٥", mascot: "🏆", kind: "test", testLevel: 2, testItems: [6, 10], tone: "amber", ranges: [[8, 13]] }),
  slide({ id: "test-l3", section: "s20", station: "master", title: "المستوى الثالث: تصحيح الأخطاء", badge: "٣ / ٥", mascot: "🏆", kind: "test", testLevel: 3, testItems: [11, 15], tone: "rose", ranges: [[14, 19]] }),
  slide({ id: "test-l4a", section: "s20", station: "master", title: "المستوى الرابع: فهم المعنى (1/2)", badge: "٤ / ٥", mascot: "🏆", kind: "test", testLevel: 4, testItems: [16, 19], tone: "emerald", ranges: [[20, 24]] }),
  slide({ id: "test-l4b", section: "s20", station: "master", title: "المستوى الرابع: فهم المعنى (2/2)", badge: "٤ / ٥", mascot: "🏆", kind: "test", testLevel: 4, testItems: [20, 20], tone: "emerald", ranges: [[25, 27]] }),
  slide({ id: "test-l5a", section: "s20", station: "master", title: "المستوى الخامس: Final Boss (1/2)", badge: "٥ / ٥", mascot: "🏆", kind: "test", testLevel: 5, testItems: [21, 24], tone: "violet", ranges: [[28, 32], [34, 37]] }),
  slide({ id: "test-l5b", section: "s20", station: "master", title: "المستوى الخامس: Final Boss (2/2)", badge: "٥ / ٥", mascot: "🏆", kind: "test", testLevel: 5, testItems: [25, 25], tone: "violet", ranges: [[33, 33], [38, 38]] }),
  slide({ id: "test-result", section: "s20", station: "master", title: "نتيجتك", badge: "الاختبار", mascot: "🏆", kind: "testResult" }),

  slide({ id: "s21", section: "s21", station: "master", title: "مساحة الحلول التفصيلية", badge: "بعد التسليم", mascot: "🔐", kind: "solutions", ranges: [[0, 2]] }),

  // ---------------- ✍️ الإنتاج والخاتمة ----------------
  slide({ id: "s22-a", section: "s22", station: "output", title: "My Learning Journey", badge: "مهمة الكتابة", mascot: "✍️", kind: "writing", writingPart: "brief", ranges: [[0, 3]] }),
  slide({ id: "s22-b", section: "s22", station: "output", title: "ستة شروط في فقرتك", badge: "مهمة الكتابة", mascot: "✍️", kind: "writing", writingPart: "criteria", variant: "steps", ranges: [[4, 9]] }),
  slide({ id: "s22-c", section: "s22", station: "output", title: "مثال قصير… ثم اكتب فقرتك", badge: "مهمة الكتابة", mascot: "✍️", kind: "writing", writingPart: "model", ranges: [[10, 12]] }),

  slide({ id: "s23-a", section: "s23", station: "output", title: "أربع جمل تلخّص الدرس", badge: "الملخص الذهبي", mascot: "🥇", ranges: [[0, 4]] }),
  slide({ id: "s23-b", section: "s23", station: "output", title: "معنى كل جملة", badge: "الملخص الذهبي", mascot: "🥇", lab: "golden-flip", ranges: [[5, 13]], headRanges: [[5, 5]] }),
  slide({ id: "s23-c", section: "s23", station: "output", title: "قاعدة الدرس الذهبية", badge: "الملخص الذهبي", mascot: "🥇", lab: "golden-rule", ranges: [[14, 22]], headRanges: [[14, 17]], footRanges: [[22, 22]] }),

  slide({ id: "s24-a", section: "s24", station: "output", title: "ثمانية أزمنة أصبحَت نظامًا واحدًا", badge: "خريطة التقدم", mascot: "🗺️", lab: "progress-map", ranges: [[0, 6]] }),
  slide({
    id: "s24-b",
    section: "s24",
    station: "output",
    title: "المحطة القادمة: المستقبل",
    badge: "خريطة التقدم",
    mascot: "🚀",
    ranges: [[7, 10]],
    tip: "أنهيتَ أزمنة الحاضر الأربعة. المحطة القادمة تبدأ بمنظومة المستقبل.",
  }),
];

export const SLIDE_COUNT_33 = SLIDES_33.length;

export function slideById33(id: string): Slide33 {
  const found = SLIDES_33.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown lesson 33 slide: ${id}`);
  return found;
}

export function slideIndex33(id: string): number {
  return SLIDES_33.findIndex((item) => item.id === id);
}

export { SLIDES_33 as SLIDES };
