// ترتيب شرائح الدرس 41 — شرائح قصيرة، كل واحدة بهدف تعليمي واحد.
// `section` يحيل إلى قسم المصدر 0–40، و`range` يحدد أسطر القسم المعروضة في الشريحة.
// الشرائح التي لا تحمل range تعرض تفاعلًا أو تدريبًا مبنيًا على القسم نفسه.

export type LabKey41 = "roles" | "engines" | "be" | "do" | "have" | "chain";
export type StationId41 = "start" | "what" | "be" | "do" | "have" | "chains" | "practice" | "mastery";

export type Slide41 = {
  id: string;
  section: number;
  kind:
    | "cover"
    | "five"
    | "lesson"
    | "lab"
    | "practice"
    | "reading"
    | "test"
    | "testResult"
    | "teacher"
    | "writing"
    | "summary"
    | "next";
  station: StationId41;
  title: string;
  badge?: string;
  lead?: string;
  mascot: string;
  tone?: "violet" | "sky" | "orange" | "emerald";
  range?: [number, number];
  variant?: "auto" | "objectives" | "steps" | "dialogue";
  lab?: LabKey41;
  practice?: number;
  items?: [number, number];
  readingPart?: "passage" | "questions-1" | "questions-2" | "questions-3" | "questions-4";
  testLevel?: number;
  testItems?: [number, number];
  writingPart?: "editor" | "criteria" | "model";
  summaryPart?: "be" | "do" | "have";
};

export const STATIONS_41: { id: StationId41; name: string; en: string; emoji: string }[] = [
  { id: "start", name: "الانطلاق", en: "Orientation", emoji: "🚀" },
  { id: "what", name: "ما الفعل المساعد؟", en: "Main vs Auxiliary", emoji: "🔎" },
  { id: "be", name: "محرك BE", en: "Structure & Linking", emoji: "🏗️" },
  { id: "do", name: "محرك DO", en: "Questions & Emphasis", emoji: "❓" },
  { id: "have", name: "محرك HAVE", en: "Perfect Forms", emoji: "⏳" },
  { id: "chains", name: "سلسلة المساعدات", en: "First Auxiliary", emoji: "🔗" },
  { id: "practice", name: "التطبيق العملي", en: "Practice & Reading", emoji: "✍️" },
  { id: "mastery", name: "الإتقان", en: "Assessment & Writing", emoji: "🏆" },
];

const lesson = (id: string, section: number, station: StationId41, title: string, range: [number, number], extras: Partial<Slide41> = {}): Slide41 => ({
  id,
  section,
  station,
  title,
  range,
  kind: "lesson",
  mascot: "📘",
  ...extras,
});

const practiceSlides = (
  section: number,
  splits: [number, number][],
  meta: { mascot: string; lead?: string; prefix: string; title: string; tone?: Slide41["tone"] },
): Slide41[] =>
  splits.map((range, i) => ({
    id: `p${section}-${i + 1}`,
    section,
    station: "practice" as StationId41,
    kind: "practice" as const,
    title: `${meta.title}${splits.length > 1 ? ` (${i + 1}/${splits.length})` : ""}`,
    badge: "تدرّب",
    lead: i === 0 ? meta.lead : undefined,
    mascot: meta.mascot,
    practice: section,
    items: range,
    tone: meta.tone,
  }));

export const SLIDES_41: Slide41[] = [
  // ---------- الانطلاق ----------
  { id: "cover", section: 0, station: "start", kind: "cover", title: "Master Auxiliary Verbs", mascot: "⚙️", range: [0, 2] },
  { id: "s0-five", section: 0, station: "start", kind: "five", title: "خمس جمل… محرك واحد", badge: "الانطلاق", mascot: "🚀", range: [3, 8], lead: "تخيّل أنك تنظر إلى خمس جمل إنجليزية:" },
  lesson("s0-why", 0, "start", "لماذا تتغيّر الجملة؟", [9, 13], { badge: "سؤال الانطلاق", mascot: "🧠" }),
  lesson("s0-system", 0, "start", "ثلاثة محركات خلف كل جملة", [14, 18], { badge: "خريطة الدرس", mascot: "🗺️" }),
  lesson("s1-a", 1, "start", "ماذا ستتقن؟ (1/2)", [0, 4], { badge: "أهداف الدرس", mascot: "🎯", variant: "objectives" }),
  lesson("s1-b", 1, "start", "ماذا ستتقن؟ (2/2)", [5, 10], { badge: "أهداف الدرس", mascot: "🎯", variant: "objectives" }),

  // ---------- ما الفعل المساعد؟ ----------
  lesson("s2-term", 2, "what", "ما معنى Auxiliary Verb؟", [0, 5], { badge: "المفهوم", mascot: "🔎" }),
  lesson("s2-compare", 2, "what", "فعل واحد… وفعلان في الجملة", [6, 17], { badge: "لنقارن", mascot: "⚖️" }),
  lesson("s2-roles", 2, "what", "من يحمل المعنى؟", [18, 21], { badge: "المفهوم", mascot: "🔬" }),
  lesson("s2-have", 2, "what", "مثال آخر: have + V3", [22, 28], { badge: "المفهوم", mascot: "🧩" }),
  lesson("s3-a", 3, "what", "تحليل: The students are preparing", [0, 12], { badge: "Main vs Auxiliary", mascot: "🕵️" }),
  lesson("s3-b", 3, "what", "Maya has completed her homework", [13, 19], { badge: "Main vs Auxiliary", mascot: "🕵️" }),
  lesson("s3-c", 3, "what", "Did Omar call you?", [20, 26], { badge: "Main vs Auxiliary", mascot: "🕵️" }),
  { id: "lab-roles", section: 3, station: "what", kind: "lab", title: "مختبر 1: رئيسي أم مساعد؟", badge: "تدرّب الآن", lead: "حكّم من وظيفة الكلمة في الجملة، لا من شكلها.", mascot: "🎭", lab: "roles", tone: "violet" },
  lesson("s4-table", 4, "what", "جدول المحركات الثلاثة", [0, 3], { badge: "المحركات الثلاثة", mascot: "⚙️" }),
  lesson("s4-note", 4, "what", "ليست دائمًا أفعالًا مساعدة", [4, 7], { badge: "ملاحظة مهمة", mascot: "⚠️" }),
  { id: "lab-engines", section: 4, station: "what", kind: "lab", title: "مختبر 2: اكتشف وظيفة المحرك", badge: "تدرّب الآن", lead: "اختر المحرك ثم حدد وظيفته من السياق.", mascot: "🔬", lab: "engines", tone: "sky" },

  // ---------- BE ----------
  lesson("s5-family", 5, "be", "عائلة BE — في الحاضر والماضي", [0, 7], { badge: "عائلة BE", mascot: "🏗️", tone: "sky" }),
  lesson("s5-table", 5, "be", "جدول صيغ BE واستخداماتها", [8, 16], { badge: "عائلة BE", mascot: "📋", tone: "sky" }),
  lesson("s5-examples", 5, "be", "أمثلة تجمع العائلة كلها", [17, 26], { badge: "عائلة BE", mascot: "🧱", tone: "sky" }),
  lesson("s6-main", 6, "be", "BE رئيسي: She is happy", [0, 5], { badge: "الوظيفة الأولى", mascot: "🔗", tone: "sky" }),
  lesson("s6-examples", 6, "be", "أمثلة على الفعل الرابط", [6, 11], { badge: "الوظيفة الأولى", mascot: "📚", tone: "sky" }),
  lesson("s6-formula", 6, "be", "Subject + BE + Complement", [12, 19], { badge: "اكتشاف مهم", mascot: "💡", tone: "sky" }),
  lesson("s7-main", 7, "be", "BE + V-ing في الأزمنة المستمرة", [0, 12], { badge: "الوظيفة الثانية", mascot: "🎬", tone: "sky" }),
  lesson("s7-perfect", 7, "be", "الأزمنة التامة المستمرة", [13, 19], { badge: "الوظيفة الثانية", mascot: "⏱️", tone: "sky" }),
  lesson("s7-common", 7, "be", "العنصر المشترك: BE", [20, 23], { badge: "السؤال المهم", mascot: "🔎", tone: "sky" }),
  lesson("s8-ving", 8, "be", "لماذا is studying وليس is study؟", [0, 10], { badge: "قاعدة البناء", mascot: "🧠", tone: "sky" }),
  lesson("s9-question", 9, "be", "سؤال BE بلا do", [0, 5], { badge: "لا نضيف DO", mascot: "🚫", tone: "sky" }),
  lesson("s9-more", 9, "be", "were tired ← Were they tired?", [6, 11], { badge: "لا نضيف DO", mascot: "🔁", tone: "sky" }),
  lesson("s9-three", 9, "be", "إثبات ونفي وسؤال مع BE", [12, 18], { badge: "لا نضيف DO", mascot: "✅", tone: "sky" }),
  { id: "lab-be", section: 9, station: "be", kind: "lab", title: "مختبر 3: ابنِ جملة BE", badge: "تدرّب الآن", lead: "اختر الصيغة الصحيحة، ثم تحقق من السبب.", mascot: "🧪", lab: "be", tone: "sky" },
  lesson("s10-passive", 10, "be", "من الفاعل إلى المبني للمجهول", [0, 6], { badge: "الوظيفة الثالثة", mascot: "🎭", tone: "sky" }),
  lesson("s10-formula", 10, "be", "BE + V3 — نظرة تمهيدية", [7, 16], { badge: "الوظيفة الثالثة", mascot: "🧱", tone: "sky" }),

  // ---------- DO ----------
  lesson("s11-family", 11, "do", "عائلة DO وصيغها", [0, 6], { badge: "عائلة DO", mascot: "❓", tone: "orange" }),
  lesson("s11-key", 11, "do", "أهم ثلاث صيغ مساعدة", [7, 10], { badge: "عائلة DO", mascot: "🔑", tone: "orange" }),
  lesson("s12-question", 12, "do", "سؤال Present Simple: Do/Does + V1", [0, 9], { badge: "DO في السؤال", mascot: "❓", tone: "orange" }),
  lesson("s12-examples", 12, "do", "أمثلة على الأسئلة", [10, 14], { badge: "DO في السؤال", mascot: "🗣️", tone: "orange" }),
  lesson("s12-s", 12, "do", "أين ذهب حرف s؟", [15, 22], { badge: "DO في السؤال", mascot: "🔎", tone: "orange" }),
  lesson("s13-negative", 13, "do", "نفي Present Simple: don't/doesn't", [0, 9], { badge: "DO في النفي", mascot: "🚫", tone: "orange" }),
  lesson("s13-examples", 13, "do", "أمثلة وخطأ شائع", [10, 18], { badge: "DO في النفي", mascot: "⚠️", tone: "orange" }),
  lesson("s14-did", 14, "do", "DID: الزمن ينتقل إلى المساعد", [0, 11], { badge: "DID", mascot: "⏳", tone: "orange" }),
  lesson("s14-examples", 14, "do", "أمثلة على did + V1", [12, 20], { badge: "DID", mascot: "📝", tone: "orange" }),
  { id: "lab-do", section: 14, station: "do", kind: "lab", title: "مختبر 4: آلة السؤال والنفي", badge: "تدرّب الآن", lead: "اختر الفعل المساعد، ثم أعد الفعل الرئيسي إلى V1.", mascot: "⚙️", lab: "do", tone: "orange" },
  lesson("s15-why", 15, "do", "لماذا لا نستخدم DO في كل سؤال؟", [0, 10], { badge: "سؤال ذكي", mascot: "🤔", tone: "orange" }),
  lesson("s15-golden", 15, "do", "القاعدة الذهبية", [11, 21], { badge: "قاعدة ذهبية", mascot: "🏅", tone: "orange" }),
  lesson("s16-emphatic", 16, "do", "DO للتأكيد — Emphatic DO", [0, 9], { badge: "الوظيفة الثالثة", mascot: "🔥", tone: "orange" }),
  lesson("s16-dialogue", 16, "do", "حوار قصير", [10, 16], { badge: "الوظيفة الثالثة", mascot: "💬", tone: "orange" }),
  lesson("s16-forms", 16, "do", "التأكيد مع does/did", [17, 26], { badge: "الوظيفة الثالثة", mascot: "🗣️", tone: "orange" }),
  lesson("s17-main", 17, "do", "DO فعلًا رئيسيًا", [0, 10], { badge: "رئيسي أم مساعد؟", mascot: "🔨", tone: "orange" }),
  lesson("s17-double", 17, "do", "Do you do…? وتحدي سريع", [11, 23], { badge: "رئيسي أم مساعد؟", mascot: "🎯", tone: "orange" }),

  // ---------- HAVE ----------
  lesson("s18-family", 18, "have", "عائلة HAVE", [0, 5], { badge: "عائلة HAVE", mascot: "⏳", tone: "emerald" }),
  lesson("s18-v3", 18, "have", "V3 بعد HAVE", [6, 8], { badge: "عائلة HAVE", mascot: "🧩", tone: "emerald" }),
  lesson("s19-perfect", 19, "have", "have/has + V3 وhad + V3", [0, 12], { badge: "الأزمنة التامة", mascot: "🏛️", tone: "emerald" }),
  lesson("s19-map", 19, "have", "خريطة الأزمنة التامة", [13, 20], { badge: "الأزمنة التامة", mascot: "🗺️", tone: "emerald" }),
  lesson("s20-continuous", 20, "have", "HAVE + BEEN + V-ing", [0, 9], { badge: "التام المستمر", mascot: "🌊", tone: "emerald" }),
  lesson("s20-analysis", 20, "have", "تحليل She has been working", [10, 17], { badge: "التام المستمر", mascot: "🔬", tone: "emerald" }),
  lesson("s21-main", 21, "have", "HAVE رئيسي: الامتلاك", [0, 10], { badge: "الوظيفة الثانية", mascot: "🚲", tone: "emerald" }),
  lesson("s21-compare", 21, "have", "have breakfast أم has finished؟", [11, 19], { badge: "الوظيفة الثانية", mascot: "🍽️", tone: "emerald" }),
  { id: "lab-have", section: 21, station: "have", kind: "lab", title: "مختبر 5: الأزمنة التامة", badge: "تدرّب الآن", lead: "اختر الزمن، ثم أضف الاستمرار وشاهد السلسلة.", mascot: "⚙️", lab: "have", tone: "emerald" },
  lesson("s22-question", 22, "have", "سؤال HAVE: مساعد أم رئيسي؟", [0, 12], { badge: "السؤال والنفي", mascot: "❔", tone: "emerald" }),
  lesson("s22-table", 22, "have", "المقارنة الذهبية وملاحظة لغوية", [13, 20], { badge: "السؤال والنفي", mascot: "📋", tone: "emerald" }),
  ...practiceSlides(23, [[1, 3], [4, 6]], {
    mascot: "🧩",
    lead: "حدد وظيفة HAVE في كل جملة. لا تظهر الإجابة قبل محاولتك.",
    prefix: "p23",
    title: "مختبر التمييز — HAVE رئيسي أم مساعد؟",
    tone: "emerald",
  }),

  // ---------- السلسلة ----------
  lesson("s24-many", 24, "chains", "أكثر من فعل مساعد في جملة", [0, 4], { badge: "السلسلة", mascot: "🔗" }),
  lesson("s24-analysis", 24, "chains", "تحليل will have been studying", [5, 16], { badge: "السلسلة", mascot: "🧠" }),
  lesson("s25-rule", 25, "chains", "قاعدة الفعل المساعد الأول", [0, 8], { badge: "القاعدة الأهم", mascot: "🥇" }),
  lesson("s25-examples", 25, "chains", "ثلاثة أمثلة متدرجة", [9, 19], { badge: "القاعدة الأهم", mascot: "📈" }),
  lesson("s25-note", 25, "chains", "لا تغيّر ترتيب السلسلة", [20, 23], { badge: "القاعدة الأهم", mascot: "🔒" }),
  { id: "lab-chain", section: 25, station: "chains", kind: "lab", title: "مختبر 6: ابدأ بالمساعد الأول", badge: "تدرّب الآن", lead: "حدد أول مساعد، ثم كوّن السؤال والنفي.", mascot: "🎛️", lab: "chain", tone: "violet" },
  lesson("s26-table", 26, "chains", "خمس جمل… خمسة أسئلة", [0, 5], { badge: "المقارنة الكبرى", mascot: "⚖️" }),
  lesson("s26-note", 26, "chains", "ماذا نتعلم من الجملة الأولى؟", [6, 10], { badge: "المقارنة الكبرى", mascot: "💡" }),
  lesson("s27-algorithm", 27, "chains", "خوارزمية اختيار المساعد", [0, 6], { badge: "خوارزمية", mascot: "🧭", variant: "steps" }),
  lesson("s27-first", 27, "chains", "تطبيق: She plays tennis", [7, 15], { badge: "خوارزمية", mascot: "🎾" }),
  lesson("s27-second", 27, "chains", "تطبيق: They were watching", [16, 23], { badge: "خوارزمية", mascot: "🎬" }),
  lesson("s28-dialogue", 28, "chains", "حوار: The Grammar Detective Club", [0, 11], { badge: "حوار تطبيقي", mascot: "🕵️", variant: "dialogue" }),
  lesson("s28-translation", 28, "chains", "ترجمة الحوار", [12, 21], { badge: "حوار تطبيقي", mascot: "🌍", variant: "dialogue" }),
  lesson("s28-analysis", 28, "chains", "تحليل كل سؤال", [22, 29], { badge: "حوار تطبيقي", mascot: "🔬" }),
  lesson("s29-a", 29, "chains", "عشرة أخطاء — 1 إلى 5", [0, 9], { badge: "صائد الأخطاء", mascot: "🚨" }),
  lesson("s29-b", 29, "chains", "عشرة أخطاء — 6 إلى 10", [10, 19], { badge: "صائد الأخطاء", mascot: "🚨" }),

  // ---------- التطبيق ----------
  ...practiceSlides(30, [[1, 3], [4, 6], [7, 8]], {
    mascot: "✍️",
    lead: "حدد الفعل المساعد والفعل الرئيسي في كل جملة.",
    prefix: "p30",
    title: "التدريب الأول — حدد الفعل المساعد",
  }),
  ...practiceSlides(31, [[1, 3], [4, 6], [7, 8]], {
    mascot: "🧠",
    lead: "اقرأ الجملة كاملة قبل اختيار الفعل المساعد.",
    prefix: "p31",
    title: "التدريب الثاني — اختر المساعد",
  }),
  ...practiceSlides(32, [[1, 3], [4, 6], [7, 8]], {
    mascot: "❓",
    lead: "اكتب السؤال كاملًا بعلامة الاستفهام.",
    prefix: "p32",
    title: "التدريب الثالث — حوّل إلى سؤال",
  }),
  ...practiceSlides(33, [[1, 3], [4, 6], [7, 8]], {
    mascot: "🚫",
    lead: "اكتب النفي كاملًا، واحتفظ ببقية السلسلة.",
    prefix: "p33",
    title: "التدريب الرابع — حوّل إلى نفي",
  }),
  ...practiceSlides(34, [[1, 3], [4, 6], [7, 8]], {
    mascot: "🔎",
    lead: "حدد وظيفة الكلمة المكتوبة بحروف كبيرة.",
    prefix: "p34",
    title: "التدريب الخامس — رئيسي أم مساعد؟",
  }),
  { id: "read-passage", section: 35, station: "practice", kind: "reading", title: "Reading Challenge — A Busy School Week", badge: "القراءة", lead: "اقرأ النص كاملًا قبل الأسئلة.", mascot: "📖", readingPart: "passage", tone: "sky" },
  { id: "read-q-1", section: 35, station: "practice", kind: "reading", title: "أسئلة الفهم (1/4)", badge: "القراءة", mascot: "🔎", readingPart: "questions-1" },
  { id: "read-q-2", section: 35, station: "practice", kind: "reading", title: "أسئلة الفهم (2/4)", badge: "القراءة", mascot: "🔎", readingPart: "questions-2" },
  { id: "read-q-3", section: 35, station: "practice", kind: "reading", title: "أسئلة الفهم (3/4)", badge: "القراءة", mascot: "🔎", readingPart: "questions-3" },
  { id: "read-q-4", section: 35, station: "practice", kind: "reading", title: "أسئلة الفهم (4/4)", badge: "القراءة", mascot: "🔎", readingPart: "questions-4" },

  // ---------- الإتقان ----------
  { id: "test-l1", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الأول", badge: "Multiple Choice", lead: "حاول حل الاختبار دون الرجوع إلى الشرح.", mascot: "🏆", testLevel: 1 },
  { id: "test-l2-a", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الثاني", badge: "Complete the Sentences", mascot: "🏆", testLevel: 2, testItems: [6, 8] },
  { id: "test-l2-b", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الثاني", badge: "Complete the Sentences", mascot: "🏆", testLevel: 2, testItems: [9, 10] },
  { id: "test-l3-a", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الثالث", badge: "Correct the Mistakes", mascot: "🏆", testLevel: 3, testItems: [11, 13] },
  { id: "test-l3-b", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الثالث", badge: "Correct the Mistakes", mascot: "🏆", testLevel: 3, testItems: [14, 15] },
  { id: "test-l4-a", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الرابع", badge: "Understand the Function", mascot: "🏆", testLevel: 4, testItems: [16, 17] },
  { id: "test-l4-b", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الرابع", badge: "Understand the Function", mascot: "🏆", testLevel: 4, testItems: [18, 19] },
  { id: "test-l4-c", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الرابع", badge: "Understand the Function", mascot: "🏆", testLevel: 4, testItems: [20, 20] },
  { id: "test-l5-a", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الخامس", badge: "Final IQ200 Boss", mascot: "🏆", testLevel: 5, testItems: [21, 23] },
  { id: "test-l5-b", section: 36, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الخامس", badge: "Final IQ200 Boss", mascot: "🏆", testLevel: 5, testItems: [24, 25] },
  { id: "test-result", section: 36, station: "mastery", kind: "testResult", title: "النتيجة والحلول التفصيلية", badge: "بعد التسليم فقط", lead: "تُحسب النتيجة عند التسليم، وتفتح الحلول بعده.", mascot: "🔐" },
  { id: "teacher", section: 37, station: "mastery", kind: "teacher", title: "مساحة المعلم — الحلول التفصيلية", badge: "للمعلم", lead: "الحلول التفصيلية مخصصة للتصحيح بعد انتهاء الطالب من الاختبار.", mascot: "🔐" },
  { id: "write-editor", section: 38, station: "mastery", kind: "writing", title: "Writing Mission — The Auxiliary Challenge", badge: "مهمة الكتابة", lead: "اكتب فقرتك الخاصة، ولا تنسخ النموذج.", mascot: "✍️", range: [0, 2], writingPart: "editor" },
  { id: "write-criteria", section: 38, station: "mastery", kind: "writing", title: "المعايير العشرة المطلوبة", badge: "مهمة الكتابة", mascot: "✅", range: [3, 12], writingPart: "criteria" },
  { id: "write-model", section: 38, station: "mastery", kind: "writing", title: "النموذج الإرشادي وملاحظة مهمة", badge: "مهمة الكتابة", mascot: "📝", range: [13, 22], writingPart: "model" },
  { id: "summary-be", section: 39, station: "mastery", kind: "summary", title: "الملخص الذهبي — BE", badge: "الملخص", mascot: "🏗️", range: [0, 7], summaryPart: "be" },
  { id: "summary-do", section: 39, station: "mastery", kind: "summary", title: "الملخص الذهبي — DO", badge: "الملخص", mascot: "❓", range: [8, 19], summaryPart: "do" },
  { id: "summary-have", section: 39, station: "mastery", kind: "summary", title: "الملخص الذهبي — HAVE والقاعدة الأهم", badge: "الملخص", mascot: "⏳", range: [20, 31], summaryPart: "have" },
  { id: "next-progress", section: 40, station: "mastery", kind: "next", title: "خريطة التقدم", badge: "المحطة القادمة", mascot: "🏁", range: [0, 3] },
  { id: "next-can", section: 40, station: "mastery", kind: "next", title: "الدرس القادم: CAN & COULD", badge: "المحطة القادمة", mascot: "🚀", range: [4, 13] },
  { id: "next-close", section: 40, station: "mastery", kind: "next", title: "أتقنت محركات الجملة", badge: "الختام", mascot: "🎓", range: [14, 15] },
];

export const LESSON_TITLE_41 = "Master Auxiliary Verbs — BE / DO / HAVE";
export const LESSON_SUBTITLE_41 = "الإتقان الشامل للأفعال المساعدة";

export function slidesForStation(id: StationId41) {
  return SLIDES_41.filter((slide) => slide.station === id);
}
