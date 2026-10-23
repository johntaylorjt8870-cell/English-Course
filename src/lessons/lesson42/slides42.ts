// ترتيب شرائح الدرس 42 — شرائح قصيرة، كل واحدة بهدف تعليمي واحد.
// `section` يحيل إلى قسم المصدر 0–44، و`range` يحدد أسطر القسم المعروضة في الشريحة.
// الشرائح التي لا تحمل range تعرض تفاعلًا أو تدريبًا مبنيًا على القسم نفسه.
// نفس بنية slides41: المصدر يُعرض بالنص، ولا تُختزل أقسام كثيفة في بطاقة واحدة.

export type LabKey42 = "build" | "form" | "short" | "wh" | "time" | "able" | "permission" | "response" | "possibility" | "meaning" | "adventure" | "repair";
export type StationId42 = "start" | "can" | "could" | "able" | "permission" | "requests" | "possibility" | "advanced" | "practice" | "mastery";

export type Slide42 = {
  id: string;
  section: number;
  kind: "cover" | "lesson" | "lab" | "practice" | "reading" | "test" | "testResult" | "teacher" | "writing" | "summary" | "next";
  station: StationId42;
  title: string;
  badge?: string;
  lead?: string;
  mascot: string;
  tone?: "violet" | "sky" | "orange" | "emerald";
  range?: [number, number];
  variant?: "auto" | "objectives" | "steps" | "dialogue";
  lab?: LabKey42;
  /** المختبر المقسوم على شريحتين: أي جزء تعرضه هذه الشريحة. */
  labPart?: 1 | 2;
  practice?: number;
  items?: [number, number];
  readingPart?: "passage-1" | "passage-2" | "questions-1" | "questions-2" | "questions-3" | "questions-4";
  testLevel?: number;
  testItems?: [number, number];
  writingPart?: "editor" | "criteria" | "model";
  summaryPart?: "can" | "could" | "forms";
};

export const STATIONS_42: { id: StationId42; name: string; en: string; emoji: string }[] = [
  { id: "start", name: "الانطلاق", en: "Orientation & the V1 Rule", emoji: "🚀" },
  { id: "can", name: "محطة CAN", en: "Present Ability", emoji: "💪" },
  { id: "could", name: "محطة COULD", en: "Past Ability", emoji: "⏳" },
  { id: "able", name: "COULD أم ABLE TO", en: "General vs Specific", emoji: "🔬" },
  { id: "permission", name: "الاستئذان", en: "Asking for Permission", emoji: "🚪" },
  { id: "requests", name: "الطلبات المهذبة", en: "Can You vs Could You", emoji: "🤝" },
  { id: "possibility", name: "الإمكانية والاحتمال", en: "Possibility & Suggestion", emoji: "🌍" },
  { id: "advanced", name: "تراكيب متقدمة", en: "Meaning, Errors & Context", emoji: "🧠" },
  { id: "practice", name: "التطبيق العملي", en: "Practice & Reading", emoji: "✍️" },
  { id: "mastery", name: "الإتقان", en: "Assessment & Writing", emoji: "🏆" },
];

const lesson = (id: string, section: number, station: StationId42, title: string, range: [number, number], extras: Partial<Slide42> = {}): Slide42 => ({
  id,
  section,
  station,
  title,
  range,
  kind: "lesson",
  mascot: "📘",
  ...extras,
});

const lab = (
  id: string,
  section: number,
  station: StationId42,
  title: string,
  key: LabKey42,
  lead: string,
  mascot: string,
  tone: Slide42["tone"] = "violet",
  labPart?: 1 | 2,
): Slide42 => ({
  id,
  section,
  station,
  kind: "lab",
  title,
  badge: "تدرّب الآن",
  lead,
  mascot,
  lab: key,
  tone,
  ...(labPart ? { labPart } : {}),
});

const practiceSlides = (
  section: number,
  splits: [number, number][],
  meta: { mascot: string; lead?: string; title: string; tone?: Slide42["tone"] },
): Slide42[] =>
  splits.map((range, i) => ({
    id: `p${section}-${i + 1}`,
    section,
    station: "practice" as StationId42,
    kind: "practice" as const,
    title: `${meta.title}${splits.length > 1 ? ` (${i + 1}/${splits.length})` : ""}`,
    badge: "تدرّب",
    lead: i === 0 ? meta.lead : undefined,
    mascot: meta.mascot,
    practice: section,
    items: range,
    tone: meta.tone,
  }));

export const SLIDES_42: Slide42[] = [
  // ---------- الانطلاق ----------
  { id: "cover", section: 0, station: "start", kind: "cover", title: "CAN & COULD", mascot: "🚀", range: [0, 2] },
  lesson("s0-scene", 0, "start", "أربعة معانٍ… وموقف مدرسي واحد", [3, 11], { badge: "موقف الانطلاق", mascot: "🏫" }),
  lesson("s0-why", 0, "start", "هل نحتاج إلى أربعة أفعال؟", [12, 15], { badge: "سؤال الانطلاق", mascot: "🧠" }),
  lesson("s0-bridge", 0, "start", "من وصف الأحداث إلى التواصل اللبق", [16, 17], { badge: "خريطة الدرس", mascot: "🗺️" }),
  lesson("s1-a", 1, "start", "ماذا ستتقن؟ (1/2)", [0, 4], { badge: "أهداف الدرس", mascot: "🎯", variant: "objectives" }),
  lesson("s1-b", 1, "start", "ماذا ستتقن؟ (2/2)", [5, 10], { badge: "أهداف الدرس", mascot: "🎯", variant: "objectives" }),
  lesson("s2-bridge", 2, "start", "من الدرس 41 إلى الأفعال الناقصة", [0, 7], { badge: "صلة الدرسين", mascot: "🔗" }),
  lesson("s2-family", 2, "start", "عائلة Modal Auxiliary Verbs", [8, 16], { badge: "العائلة", mascot: "⚙️" }),
  lesson("s2-why-modal", 2, "start", "لماذا تُسمّى Modal Verbs؟", [17, 24], { badge: "المفهوم", mascot: "🔎" }),
  lesson("s3-formula", 3, "start", "Subject + CAN/COULD + V1", [0, 5], { badge: "قاعدة البناء", mascot: "🧱" }),
  lesson("s3-examples", 3, "start", "أمثلة على القاعدة الأساسية", [6, 14], { badge: "قاعدة البناء", mascot: "📚" }),
  lesson("s3-golden", 3, "start", "القاعدة الذهبية الأولى", [15, 21], { badge: "قاعدة ذهبية", mascot: "🏅" }),
  lab("lab-build-1", 3, "start", "مختبر 1: ابنِ جملة CAN/COULD (1/2)", "build", "اختر الفاعل والفعل الناقص وصيغة الفعل، وسيخبرك المختبر أي قاعدة انكسرت.", "🧪", "violet", 1),
  lab("lab-build-2", 3, "start", "مختبر 1: ابنِ جملة CAN/COULD (2/2)", "build", "تمرينان آخران على القاعدة الذهبية: CAN/COULD + V1.", "🧪", "violet", 2),
  lesson("s4-why-no-s", 4, "start", "لماذا لا نضيف S بعد CAN؟", [0, 9], { badge: "فخ الحرف s", mascot: "🔬" }),
  lesson("s4-compare", 4, "start", "قارن: Present Simple مقابل CAN", [10, 16], { badge: "فخ الحرف s", mascot: "⚖️" }),
  lab("lab-form", 4, "start", "مختبر 2: هل تتغير الصيغة مع الفاعل؟", "form", "غيّر الفاعل وراقب الفعل الناقص والفعل الرئيسي.", "🎛️", "sky"),
  lesson("s5-table", 5, "start", "التصريف مع جميع الضمائر", [0, 8], { badge: "جدول الضمائر", mascot: "📋" }),
  lesson("s5-note", 5, "start", "لا cans ولا coulds ولا do", [9, 11], { badge: "جدول الضمائر", mascot: "⚠️" }),

  // ---------- محطة CAN ----------
  lesson("s6-intro", 6, "can", "القدرة الحالية — Present Ability", [0, 10], { badge: "الاستخدام الأول", mascot: "💪", tone: "sky" }),
  lesson("s6-kinds", 6, "can", "ماذا تعني القدرة؟", [11, 20], { badge: "أربعة أنواع", mascot: "🎯", tone: "sky", variant: "steps" }),
  lesson("s7-dialogue", 7, "can", "حوار: The Talent Show", [0, 8], { badge: "موقف تطبيقي", mascot: "🎭", tone: "sky", variant: "dialogue" }),
  lesson("s7-translation", 7, "can", "ترجمة حوار عرض المواهب", [9, 15], { badge: "موقف تطبيقي", mascot: "🌍", tone: "sky", variant: "dialogue" }),
  lesson("s7-question", 7, "can", "سؤال الفهم", [16, 17], { badge: "موقف تطبيقي", mascot: "❓", tone: "sky" }),
  lesson("s8-formula", 8, "can", "النفي: cannot / can't + V1", [0, 7], { badge: "النفي", mascot: "🚫", tone: "sky" }),
  lesson("s8-examples", 8, "can", "أمثلة على النفي بـ CAN'T", [8, 16], { badge: "النفي", mascot: "📝", tone: "sky" }),
  lesson("s8-note", 8, "can", "فرق مهم: I can't swim", [17, 19], { badge: "ملاحظة مهمة", mascot: "⚠️", tone: "sky" }),
  lesson("s9-question", 9, "can", "السؤال: Can + Subject + V1?", [0, 8], { badge: "السؤال", mascot: "❓", tone: "sky" }),
  lesson("s9-examples", 9, "can", "أمثلة على أسئلة CAN", [9, 17], { badge: "السؤال", mascot: "🗣️", tone: "sky" }),
  lesson("s9-careful", 9, "can", "انتبه: لا نحتاج إلى DO", [18, 20], { badge: "خطأ شائع", mascot: "🚨", tone: "sky" }),
  lesson("s10-short-a", 10, "can", "الإجابات القصيرة (1/2)", [0, 10], { badge: "الإجابات القصيرة", mascot: "💬", tone: "sky" }),
  lesson("s10-short-b", 10, "can", "الإجابات القصيرة (2/2)", [11, 17], { badge: "الإجابات القصيرة", mascot: "💬", tone: "sky" }),
  lab("lab-short", 10, "can", "مختبر 3: اختر الإجابة القصيرة", "short", "اقرأ السؤال ثم اختر الإجابة القصيرة الطبيعية.", "🎧", "sky"),
  lesson("s11-wh", 11, "can", "أسئلة WH مع CAN", [0, 14], { badge: "WH + CAN", mascot: "🔍", tone: "sky" }),
  lesson("s11-subject", 11, "can", "سؤال خاص بالفاعل: Who can…?", [15, 17], { badge: "WH + CAN", mascot: "🕵️", tone: "sky" }),
  lab("lab-wh", 11, "can", "مختبر 4: رتّب سؤال WH", "wh", "اضغط الرقاقات بالترتيب الصحيح لبناء السؤال.", "🧩", "sky"),

  // ---------- محطة COULD ----------
  lesson("s12-intro", 12, "could", "القدرة العامة في الماضي", [0, 8], { badge: "الاستخدام الأول", mascot: "⏳", tone: "violet" }),
  lesson("s12-compare", 12, "could", "الفرق الأساسي بين CAN وCOULD", [9, 16], { badge: "الفرق الأساسي", mascot: "⚖️", tone: "violet" }),
  lesson("s13-warn", 13, "could", "لا تربط COULD بالماضي دائمًا!", [0, 7], { badge: "أهم نقاط الدرس", mascot: "🧠", tone: "violet" }),
  lesson("s13-more", 13, "could", "COULD: قدرة أو طلب أو احتمال", [8, 14], { badge: "أهم نقاط الدرس", mascot: "🔀", tone: "violet" }),
  lesson("s14-formula", 14, "could", "النفي: could not / couldn't", [0, 4], { badge: "النفي", mascot: "🚫", tone: "violet" }),
  lesson("s14-examples", 14, "could", "أمثلة على COULDN'T", [5, 13], { badge: "النفي", mascot: "📝", tone: "violet" }),
  lesson("s14-note", 14, "could", "ملاحظة تمهّد للمقارنة القادمة", [14, 15], { badge: "ملاحظة", mascot: "📌", tone: "violet" }),
  lesson("s15-question", 15, "could", "السؤال: Could + Subject + V1?", [0, 9], { badge: "السؤال", mascot: "❓", tone: "violet" }),
  lesson("s15-short", 15, "could", "الإجابات القصيرة مع COULD", [10, 12], { badge: "السؤال", mascot: "💬", tone: "violet" }),
  lesson("s16-table", 16, "could", "CAN مقابل COULD — مقارنة القدرة", [0, 7], { badge: "مقارنة القدرة", mascot: "⚔️", tone: "violet" }),
  ...practiceSlides(16, [[1, 3]], { mascot: "⚡", lead: "اختر can أو could أو couldn't بحسب الزمن والمعنى.", title: "تحدي سريع — can أم could؟" }),
  lab("lab-time-1", 16, "could", "مختبر 5: آلة الزمن — can أم could؟ (1/2)", "time", "حدّد الزمن أولًا، ثم اختر الفعل الناقص المناسب.", "🕰️", "violet", 1),
  lab("lab-time-2", 16, "could", "مختبر 5: آلة الزمن — can أم could؟ (2/2)", "time", "جملتان أخيرتان: اقرأ دليل الزمن قبل الاختيار.", "🕰️", "violet", 2),

  // ---------- COULD أم WAS/WERE ABLE TO ----------
  lesson("s17-intro", 17, "able", "الفرق المتقدم الذي يميز الطالب المتمكن", [0, 6], { badge: "الفرق المتقدم", mascot: "🔬", tone: "emerald" }),
  lesson("s17-two", 17, "able", "قدرة عامة أم نجاح محدد؟", [7, 14], { badge: "مثالان", mascot: "🧭", tone: "emerald" }),
  lesson("s17-rule", 17, "able", "القاعدة التعليمية", [15, 17], { badge: "قاعدة", mascot: "🏅", tone: "emerald" }),
  lesson("s18-examples", 18, "able", "ثلاثة أمثلة إضافية على الفرق", [0, 9], { badge: "أمثلة إضافية", mascot: "📚", tone: "emerald", variant: "steps" }),
  lesson("s18-negative", 18, "able", "ماذا عن النفي؟", [10, 15], { badge: "النفي", mascot: "🚫", tone: "emerald" }),
  lab("lab-able-1", 18, "able", "مختبر 6: مهارة عامة أم نجاح محدد؟ (1/2)", "able", "صنّف كل جملة: قدرة عامة أم نجاح في موقف محدد.", "🎯", "emerald", 1),
  lab("lab-able-2", 18, "able", "مختبر 6: مهارة عامة أم نجاح محدد؟ (2/2)", "able", "ثلاث جمل أخرى، بينها نفي طبيعي لا يخضع للفرق.", "🎯", "emerald", 2),
  lesson("s19-formula", 19, "able", "القدرة المستقبلية: WILL BE ABLE TO", [0, 9], { badge: "المستقبل", mascot: "🚀", tone: "emerald" }),
  lesson("s19-careful", 19, "able", "انتبه: لا will can", [10, 13], { badge: "خطأ شائع", mascot: "🚨", tone: "emerald" }),
  lesson("s19-map", 19, "able", "خريطة القدرة عبر الأزمنة", [14, 18], { badge: "خريطة", mascot: "🗺️", tone: "emerald" }),

  // ---------- الاستئذان ----------
  lesson("s20-intro", 20, "permission", "طلب الإذن — Asking for Permission", [0, 9], { badge: "الاستئذان", mascot: "🚪", tone: "orange" }),
  lesson("s20-examples", 20, "permission", "أمثلة على طلب الإذن", [10, 18], { badge: "الاستئذان", mascot: "🙋", tone: "orange" }),
  lesson("s20-difference", 20, "permission", "Can I...? مقابل Could I...?", [19, 20], { badge: "الفرق الأساسي", mascot: "⚖️", tone: "orange" }),
  lesson("s21-dialogue", 21, "permission", "حوار: In the Classroom", [0, 6], { badge: "حوار تطبيقي", mascot: "🏫", tone: "orange", variant: "dialogue" }),
  lesson("s21-translation", 21, "permission", "ترجمة حوار الصف", [7, 13], { badge: "حوار تطبيقي", mascot: "🌍", tone: "orange", variant: "dialogue" }),
  lesson("s21-note", 21, "permission", "المعنى يحدده السياق", [14, 18], { badge: "ملاحظة مهمة", mascot: "📌", tone: "orange" }),
  lab("lab-permission", 21, "permission", "مختبر 7: إذن أم طلب أم قدرة؟", "permission", "صنّف كل جملة بحسب وظيفتها التواصلية.", "🎭", "orange"),

  // ---------- الطلبات المهذبة ----------
  lesson("s22-intro", 22, "requests", "تقديم الطلبات — Making Requests", [0, 8], { badge: "الطلبات", mascot: "🤝", tone: "orange" }),
  lesson("s22-examples", 22, "requests", "أمثلة حياتية على الطلبات", [9, 18], { badge: "الطلبات", mascot: "🗣️", tone: "orange" }),
  lesson("s23-answer", 23, "requests", "هل COULD تعني الماضي في الطلبات؟", [0, 10], { badge: "سؤال ذكي", mascot: "🤔", tone: "orange" }),
  lesson("s23-compare", 23, "requests", "قارن: قدرة ماضية أم طلب حاضر؟", [11, 14], { badge: "مقارنة", mascot: "⚖️", tone: "orange" }),
  lesson("s24-responses", 24, "requests", "كيف نجيب عن الطلبات؟", [0, 13], { badge: "الردود الطبيعية", mascot: "💬", tone: "orange" }),
  lesson("s24-difference", 24, "requests", "انتبه إلى فرق مهم في الرد", [14, 26], { badge: "فرق مهم", mascot: "⚠️", tone: "orange" }),
  lab("lab-response", 24, "requests", "مختبر 8: اختر الرد الطبيعي", "response", "اقرأ السؤال ثم اختر الرد الذي يناسب وظيفته.", "📞", "orange"),
  lesson("s25-dialogue", 25, "requests", "حوار: At the Library", [0, 8], { badge: "حوار تطبيقي", mascot: "📚", tone: "orange", variant: "dialogue" }),
  lesson("s25-analysis", 25, "requests", "تحليل حوار المكتبة", [9, 13], { badge: "حوار تطبيقي", mascot: "🔬", tone: "orange" }),

  // ---------- الإمكانية والاحتمال ----------
  lesson("s26-can", 26, "possibility", "CAN للإمكانية العامة", [0, 9], { badge: "General Possibility", mascot: "🌍", tone: "sky" }),
  lesson("s26-analysis", 26, "possibility", "التحليل: الطقس لا يملك مهارة!", [10, 14], { badge: "التحليل", mascot: "🔎", tone: "sky" }),
  lesson("s27-could", 27, "possibility", "COULD للتعبير عن الاحتمال", [0, 10], { badge: "الاحتمال", mascot: "🔮", tone: "sky" }),
  lesson("s27-note", 27, "possibility", "احتمال لا حقيقة مؤكدة", [11, 14], { badge: "ملاحظة", mascot: "📌", tone: "sky" }),
  lesson("s28-compare", 28, "possibility", "CAN مقابل COULD في الإمكانية", [0, 8], { badge: "مقارنة", mascot: "⚔️", tone: "sky" }),
  lesson("s28-more", 28, "possibility", "مثال آخر: الحواسيب والأخطاء", [9, 12], { badge: "مقارنة", mascot: "💻", tone: "sky" }),
  lesson("s28-rule", 28, "possibility", "قاعدة مفيدة… وحدودها", [13, 13], { badge: "قاعدة", mascot: "📐", tone: "sky" }),
  lesson("s29-suggest", 29, "possibility", "COULD لتقديم الاقتراحات", [0, 8], { badge: "الاقتراح", mascot: "💡", tone: "sky" }),
  lesson("s29-difference", 29, "possibility", "can: ممكنة · could: اقتراح", [9, 13], { badge: "الفرق في المعنى", mascot: "⚖️", tone: "sky" }),
  lesson("s29-dialogue", 29, "possibility", "حوار قصير: ماذا نفعل؟", [14, 18], { badge: "حوار قصير", mascot: "🗨️", tone: "sky", variant: "dialogue" }),
  lab("lab-possibility", 29, "possibility", "مختبر 9: إمكانية أم احتمال أم اقتراح؟", "possibility", "صنّف وظيفة CAN أو COULD في كل جملة.", "🌡️", "sky"),

  // ---------- تراكيب متقدمة ----------
  lesson("s30-can-able", 30, "advanced", "الفرق بين CAN وBE ABLE TO", [0, 7], { badge: "CAN vs BE ABLE TO", mascot: "🔬", tone: "violet" }),
  lesson("s30-why", 30, "advanced", "لماذا لا نقول will can؟", [8, 13], { badge: "CAN vs BE ABLE TO", mascot: "🚨", tone: "violet" }),
  lesson("s31-errors-a", 31, "advanced", "الأخطاء العشرة — 1 إلى 5", [0, 9], { badge: "صائد الأخطاء", mascot: "🚨" }),
  lesson("s31-errors-b", 31, "advanced", "الأخطاء العشرة — 6 إلى 10", [10, 20], { badge: "صائد الأخطاء", mascot: "🚨" }),
  lesson("s31-rule", 31, "advanced", "القاعدة التي تمنع معظم الأخطاء", [21, 25], { badge: "قاعدة جامعة", mascot: "🏅" }),
  lab("lab-repair-1", 31, "advanced", "مختبر 10: شخّص الخطأ ثم أصلحه (1/2)", "repair", "اختر القاعدة المكسورة أولًا، ثم اكتب الجملة الصحيحة.", "🛠️", "violet", 1),
  lab("lab-repair-2", 31, "advanced", "مختبر 10: شخّص الخطأ ثم أصلحه (2/2)", "repair", "خطآن آخران من النوع نفسه: التشخيص ثم الإصلاح.", "🛠️", "violet", 2),
  lesson("s32-meaning", 32, "advanced", "مختبر المعاني: جملة… ووظيفتان", [0, 10], { badge: "المعنى والسياق", mascot: "🧠" }),
  lesson("s32-second", 32, "advanced", "مثال ثانٍ: Could you swim?", [11, 16], { badge: "المعنى والسياق", mascot: "🔀" }),
  lab("lab-meaning", 32, "advanced", "مختبر 11: المعنى من السياق", "meaning", "اقرأ الدليل السياقي ثم حدد الوظيفة المقصودة.", "🕵️"),
  lesson("s33-dialogue", 33, "advanced", "الحوار الشامل: The School Adventure", [0, 13], { badge: "حوار شامل", mascot: "🏕️", variant: "dialogue" }),
  lesson("s33-analysis", 33, "advanced", "تحليل استخدامات الحوار", [14, 21], { badge: "حوار شامل", mascot: "🔬" }),
  lab("lab-adventure-1", 33, "advanced", "مختبر 12: حلّل حوار المغامرة (1/2)", "adventure", "صنّف كل استخدام لـ CAN وCOULD في الحوار.", "🎒", "violet", 1),
  lab("lab-adventure-2", 33, "advanced", "مختبر 12: حلّل حوار المغامرة (2/2)", "adventure", "بقية الحوار: احتمالات واقتراحات وطلبات.", "🎒", "violet", 2),

  // ---------- التطبيق العملي ----------
  ...practiceSlides(34, [[1, 3], [4, 6], [7, 8]], {
    mascot: "✍️",
    lead: "أكمل الجمل باستخدام CAN أو COULD بحسب السياق.",
    title: "التدريب الأول — اختر CAN أو COULD",
  }),
  ...practiceSlides(35, [[1, 3], [4, 5]], {
    mascot: "🚫",
    lead: "حوّل الجملة إلى النفي.",
    title: "التدريب الثاني — حوّل إلى النفي",
  }),
  ...practiceSlides(36, [[1, 3], [4, 5]], {
    mascot: "❓",
    lead: "حوّل الجملة إلى السؤال.",
    title: "التدريب الثالث — حوّل إلى السؤال",
  }),
  ...practiceSlides(37, [[1, 3], [4, 5]], {
    mascot: "⚖️",
    lead: "اختر الصيغة الأنسب بحسب المعنى المطلوب.",
    title: "التدريب الرابع — COULD أم WAS/WERE ABLE TO؟",
    tone: "emerald",
  }),
  ...practiceSlides(38, [[1, 2], [3, 4], [5, 7], [8, 10]], {
    mascot: "🕵️",
    lead: "اكتشف الخطأ، واكتب الجملة الصحيحة مع سبب الخطأ.",
    title: "Grammar Detective — اكتشف الأخطاء",
  }),
  { id: "read-passage-1", section: 39, station: "practice", kind: "reading", title: "Reading Challenge — The Young Inventor (1/2)", badge: "القراءة", lead: "اقرأ النص كاملًا قبل الأسئلة.", mascot: "📖", readingPart: "passage-1", tone: "sky" },
  { id: "read-passage-2", section: 39, station: "practice", kind: "reading", title: "Reading Challenge — The Young Inventor (2/2)", badge: "القراءة", lead: "تتمة النص: المسابقة، والإصلاح، وحوار المعلم.", mascot: "📖", readingPart: "passage-2", tone: "sky" },
  { id: "read-q-1", section: 39, station: "practice", kind: "reading", title: "أسئلة الفهم (1/4)", badge: "القراءة", mascot: "🔎", readingPart: "questions-1" },
  { id: "read-q-2", section: 39, station: "practice", kind: "reading", title: "أسئلة الفهم (2/4)", badge: "القراءة", mascot: "🔎", readingPart: "questions-2" },
  { id: "read-q-3", section: 39, station: "practice", kind: "reading", title: "أسئلة الفهم (3/4)", badge: "القراءة", mascot: "🔎", readingPart: "questions-3" },
  { id: "read-q-4", section: 39, station: "practice", kind: "reading", title: "أسئلة الفهم (4/4)", badge: "القراءة", mascot: "🔎", readingPart: "questions-4" },

  // ---------- الإتقان ----------
  { id: "test-l1-a", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الأول", badge: "Multiple Choice", lead: "حاول حل الاختبار كاملًا قبل مراجعة مساحة المعلم.", mascot: "🏆", testLevel: 1, testItems: [1, 3] },
  { id: "test-l1-b", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الأول", badge: "Multiple Choice", mascot: "🏆", testLevel: 1, testItems: [4, 5] },
  { id: "test-l2-a", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الثاني", badge: "Complete the Sentences", mascot: "🏆", testLevel: 2, testItems: [6, 8] },
  { id: "test-l2-b", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الثاني", badge: "Complete the Sentences", mascot: "🏆", testLevel: 2, testItems: [9, 10] },
  { id: "test-l3-a", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الثالث", badge: "Correct the Mistakes", mascot: "🏆", testLevel: 3, testItems: [11, 13] },
  { id: "test-l3-b", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الثالث", badge: "Correct the Mistakes", mascot: "🏆", testLevel: 3, testItems: [14, 15] },
  { id: "test-l4-a", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الرابع", badge: "Understand the Meaning", mascot: "🏆", testLevel: 4, testItems: [16, 17] },
  { id: "test-l4-b", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الرابع", badge: "Understand the Meaning", mascot: "🏆", testLevel: 4, testItems: [18, 19] },
  { id: "test-l4-c", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الرابع", badge: "Understand the Meaning", mascot: "🏆", testLevel: 4, testItems: [20, 20] },
  { id: "test-l5-a", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الخامس", badge: "Final IQ200 Boss", mascot: "🏆", testLevel: 5, testItems: [21, 22] },
  { id: "test-l5-b", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الخامس", badge: "Final IQ200 Boss", mascot: "🏆", testLevel: 5, testItems: [23, 23] },
  { id: "test-l5-c", section: 40, station: "mastery", kind: "test", title: "الاختبار النهائي — المستوى الخامس", badge: "Final IQ200 Boss", mascot: "🏆", testLevel: 5, testItems: [24, 25] },
  { id: "test-result", section: 40, station: "mastery", kind: "testResult", title: "النتيجة والحلول التفصيلية", badge: "بعد التسليم فقط", lead: "تُحسب النتيجة عند التسليم، وتفتح الحلول بعده.", mascot: "🔐" },
  { id: "teacher", section: 41, station: "mastery", kind: "teacher", title: "مساحة المعلم — الحلول التفصيلية", badge: "للمعلم", lead: "الحلول التفصيلية مخصصة للتصحيح بعد انتهاء الطالب من الاختبار.", mascot: "🔐" },
  { id: "write-editor", section: 42, station: "mastery", kind: "writing", title: "Writing Mission — My Abilities", badge: "مهمة الكتابة", lead: "اكتب فقرتك الخاصة، ولا تنسخ النموذج.", mascot: "✍️", range: [0, 3], writingPart: "editor" },
  { id: "write-criteria", section: 42, station: "mastery", kind: "lesson", title: "المعايير العشرة المطلوبة", badge: "مهمة الكتابة", mascot: "✅", range: [4, 14], tone: "emerald" },
  { id: "write-checklist", section: 42, station: "mastery", kind: "writing", title: "تتبّع معاييرك العشرة", badge: "مهمة الكتابة", lead: "علّم كل معيار أنجزته في فقرتك.", mascot: "✅", writingPart: "criteria" },
  { id: "write-model", section: 42, station: "mastery", kind: "writing", title: "النموذج الإرشادي والتحدي الإضافي", badge: "مهمة الكتابة", mascot: "📝", range: [15, 24], writingPart: "model" },
  { id: "summary-can", section: 43, station: "mastery", kind: "summary", title: "الملخص الذهبي — CAN", badge: "الملخص", mascot: "💪", range: [0, 12], summaryPart: "can" },
  { id: "summary-could", section: 43, station: "mastery", kind: "summary", title: "الملخص الذهبي — COULD", badge: "الملخص", mascot: "🔮", range: [13, 26], summaryPart: "could" },
  { id: "summary-forms", section: 43, station: "mastery", kind: "summary", title: "النفي والسؤال والمستقبل", badge: "الملخص", mascot: "🧭", range: [27, 36], summaryPart: "forms" },
  { id: "summary-advanced", section: 43, station: "mastery", kind: "summary", title: "الفرق المتقدم والقاعدة الذهبية", badge: "الملخص", mascot: "🏅", range: [37, 40] },
  { id: "next-progress", section: 44, station: "mastery", kind: "next", title: "خريطة التقدم", badge: "المحطة القادمة", mascot: "🏁", range: [0, 5] },
  { id: "next-may", section: 44, station: "mastery", kind: "next", title: "الدرس القادم: MAY & MIGHT", badge: "المحطة القادمة", mascot: "🚀", range: [6, 14] },
  { id: "next-close", section: 44, station: "mastery", kind: "next", title: "أتقنت CAN وCOULD", badge: "الختام", mascot: "🎓", range: [15, 15] },
];

export const LESSON_TITLE_42 = "CAN & COULD — Ability, Possibility, Permission & Polite Requests";
export const LESSON_SUBTITLE_42 = "القدرة، والإمكانية، والاستئذان، والطلبات المهذبة";

export function slidesForStation42(id: StationId42) {
  return SLIDES_42.filter((slide) => slide.station === id);
}
