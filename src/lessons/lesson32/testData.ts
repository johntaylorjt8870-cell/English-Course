// ============================================================
// منطقة الاختبار — الدرس 32 · THE DURATION STREAM
// 20 سؤالًا جديدًا مؤلَّفًا لهذا الاختبار: سيناريوهات جديدة (خبّازة، ممرّض،
// حديقة، كمان، ورشة، مطبخ) — لا نسخ ولا إعادة صياغة لأسئلة المصدر ولا لتمارين
// الشرح داخل الدرس.
// التوزيع: 6 Basic · 7 Medium · 4 Advanced · 3 Thinking.
// الأنواع: اختيار واحد(7) · صح/خطأ(3) · كتابة(2) · متعدد(2) · ترتيب(2) ·
//          مطابقة(2) · حدّد الخطأ(2).
// التغطية: الصيغة وأدوار أجزائها · for/since · النفي والسؤال والجواب القصير ·
//          النتيجة أم النشاط · الأثر الظاهر · أفعال الحالة · مقارنة الأزمنة ·
//          تحليل السياق.
// كل شرح هنا «Platform Explanation» (شرح المنصة) — وليس نصًا من المصدر.
// ============================================================

export type TestLevel32 = "basic" | "medium" | "advanced" | "thinking";

type Base32 = {
  /** رقم السؤال 1–20 */
  n: number;
  level: TestLevel32;
  /** نص السؤال بالعربية */
  ar: string;
  /** جملة إنجليزية مصاحبة (اختياري) */
  en?: string;
  /** المهارة التي يقيسها السؤال */
  skill: string;
  /** قسم المصدر الذي تُبنى عليه المهارة (مرجع للمعلم، لا نص منقول) */
  ref: string;
  /** شرح المنصة */
  why: string;
  /** الفخّ المتوقع */
  trap?: string;
  /** نص الإجابة كما يُعرض في الحلول */
  answerText: string;
};

export type TestQ32 =
  | (Base32 & { type: "single"; opts: string[]; answer: number })
  | (Base32 & { type: "tf"; answer: boolean })
  | (Base32 & { type: "multi"; opts: string[]; answer: number[] })
  | (Base32 & { type: "order"; items: string[]; answer: string[] })
  | (Base32 & { type: "match"; left: string[]; right: string[]; answer: number[] })
  | (Base32 & { type: "spot"; segments: string[]; answer: number; fix: string })
  | (Base32 & { type: "typed"; accept: string[] });

export const TEST_32: TestQ32[] = [
  // ==========================================================
  // Basic (1–6) — الصيغة وأجزاؤها، for/since، النفي، السؤال، الجواب القصير
  // ==========================================================
  {
    n: 1, level: "basic", type: "single",
    skill: "الصيغة + اتفاق الفاعل",
    ref: "§3 · have أم has؟",
    ar: "الخبّازة في الفرن منذ الفجر. أكمل: «The baker ______ in the bakery since dawn.»",
    en: "The baker ______ in the bakery since dawn.",
    opts: ["has been working", "have been working", "has been work"],
    answer: 0,
    answerText: "The baker has been working in the bakery since dawn.",
    why: "الفاعل المفرد (The baker = she/he) يأخذ has، وبعد been يأتي الفعل بصيغة ing. dawn نقطة بداية ← since.",
    trap: "has been work ✗ — الفعل بعد been لا يعود إلى أصله؛ الصيغة تحتاج verb-ing.",
  },
  {
    n: 2, level: "basic", type: "tf",
    skill: "دور been في الصيغة",
    ref: "§2 · لماذا have + been + ing؟",
    ar: "في جملة «The nurse has been standing for nine hours» كلمة been فعل رئيسي مستقل بمعنى «وُجد».",
    answer: false,
    answerText: "خطأ (False) — been جزء من الصيغة، لا فعلًا رئيسيًا مستقلًا.",
    why: "الصيغة ثلاثية الأجزاء: have/has تربط بالحاضر، وbeen (V3 من be) جزء بنيوي، وverb-ing تحمل معنى النشاط الممتد. لا معنى مستقلًا لـ been هنا.",
    trap: "ترجمة been كأنها «كان موجودًا» — الترجمة الحرفية تكسر المعنى.",
  },
  {
    n: 3, level: "basic", type: "single",
    skill: "for أم since",
    ref: "§7 · for أم since؟",
    ar: "أكمل: «She has been practising the violin ______ she was six.»",
    en: "She has been practising the violin ______ she was six.",
    opts: ["since", "for", "during"],
    answer: 0,
    answerText: "She has been practising the violin since she was six.",
    why: "ما بعد الفراغ نقطة بداية (she was six)، والنقطة تأخذ since. المدة وحدها (three years) تأخذ for.",
    trap: "during ✗ — لا تدخل على جملة كاملة بهذه الطريقة، وليست من أدوات هذا الزمن.",
  },
  {
    n: 4, level: "basic", type: "single",
    skill: "النفي",
    ref: "§9 · النفي",
    ar: "أكمل النفي: «لم ننتظر طويلًا» → «We ______ long.»",
    en: "We ______ long.",
    opts: ["haven't been waiting", "hasn't been waiting", "haven't been wait"],
    answer: 0,
    answerText: "We haven't been waiting long.",
    why: "النفي يضع not بعد have/has: We + have + not + been + verb-ing، والمختصر haven't. الفاعل We يأخذ have لا has.",
    trap: "haven't been wait ✗ — إسقاط ing يكسر الصيغة.",
  },
  {
    n: 5, level: "basic", type: "tf",
    skill: "صيغة السؤال (How long?)",
    ref: "§8 · السؤال الأقوى: How long؟",
    ar: "السؤال «How long have you been learning English?» صحيح الصيغة ويسأل عن مدة النشاط الممتد.",
    answer: true,
    answerText: "صحيح (True)",
    why: "How long + have/has + الفاعل + been + verb-ing: سؤال قياسي عن المدة، وجوابه مدة مع for أو نقطة بداية مع since.",
    trap: "الظن أن How long يسأل عن العدد — العدد (three reports) مجال Present Perfect البسيط.",
  },
  {
    n: 6, level: "basic", type: "typed",
    skill: "الجواب القصير",
    ref: "§11 · الإجابات القصيرة",
    ar: "اكتب الكلمة الناقصة في الجواب القصير: «Has your brother been training all day?» — «No, he ______.»",
    accept: ["hasn't", "has not"],
    answerText: "No, he hasn't.",
    why: "الجواب القصير يعيد have/has فقط (مع not للنفي) — لا يُعاد been ولا الفعل بصيغة ing.",
    trap: "No, he hasn't been ✗ — إعادة been في الجواب القصير خطأ صريح.",
  },

  // ==========================================================
  // Medium (7–13) — التطبيق على الصيغة والمدة والنتيجة مقابل النشاط
  // ==========================================================
  {
    n: 7, level: "medium", type: "multi",
    skill: "for/since + صحة الصيغة",
    ref: "§7 · for أم since؟ · §23 · أفعال لا تُستخدم في Continuous",
    ar: "اختر كل الجمل الصحيحة استعمالًا للصيغة ولأداة الزمن:",
    opts: [
      "The gardener has been watering the plants for two hours.",
      "The gardener has been watering the plants since two hours.",
      "They have been playing football since 4:00.",
      "I have been wanting this bike for years.",
      "We have been waiting outside all afternoon.",
    ],
    answer: [0, 2, 4],
    answerText:
      "The gardener has been watering the plants for two hours. · They have been playing football since 4:00. · We have been waiting outside all afternoon.",
    why: "for + مدة (two hours)، since + نقطة (4:00)، وall afternoon كلمة وقت لنشاط ممتد. since two hours ✗ لأن ما بعدها مدة، و have been wanting ✗ لأن want فعل حالة.",
    trap: "ترجمة «منذ ساعتين» حرفيًا إلى since two hours — الميزان نوع ما بعد الأداة، لا الترجمة.",
  },
  {
    n: 8, level: "medium", type: "order",
    skill: "بناء السؤال",
    ref: "§10 · الأسئلة",
    ar: "رتّب القطع لتكوين سؤال: «هل كنت تنام جيدًا مؤخرًا؟»",
    items: ["well", "been", "Have", "lately?", "you", "sleeping"],
    answer: ["Have", "you", "been", "sleeping", "well", "lately?"],
    answerText: "Have you been sleeping well lately?",
    why: "ترتيب السؤال: Have/Has ← الفاعل ← been ← verb-ing ← بقية الجملة ← كلمة الزمن.",
    trap: "تقديم been على الفاعل ✗ — في السؤال يسبق الفاعل been.",
  },
  {
    n: 9, level: "medium", type: "match",
    skill: "النتيجة أم النشاط",
    ref: "§15 · النتيجة أم النشاط؟",
    ar: "طابق كل جملة بما تركّز عليه:",
    left: [
      "The mechanic has repaired the car.",
      "The mechanic has been repairing the car.",
      "He has printed ten invitations.",
      "He has been printing invitations since noon.",
    ],
    right: [
      "النشاط والمدة — لا نعرف إن انتهى",
      "النتيجة — السيارة تعمل الآن",
      "النشاط مستمر من الظهر",
      "عدد مكتمل — إنجاز يُحصى",
    ],
    answer: [1, 0, 3, 2],
    answerText:
      "has repaired ↔ النتيجة · has been repairing ↔ النشاط والمدة · has printed ten ↔ عدد مكتمل · has been printing since noon ↔ نشاط مستمر",
    why: "V3 (repaired/printed) يوجّه النظر إلى النتيجة أو العدد؛ been + ing يوجّه النظر إلى النشاط وامتداده.",
    trap: "افتراض أن الجملة ذات الصيغة المستمرة تعني بالضرورة أن العمل ما زال جاريًا في هذه اللحظة.",
  },
  {
    n: 10, level: "medium", type: "single",
    skill: "تحليل سياق — أثر ظاهر",
    ref: "§13 · نشاط انتهى للتو وآثاره واضحة",
    ar: "صديقك حذاؤه مبلل وطينٌ على سرواله. أكمل: «Your shoes are wet — you ______ in the rain.»",
    en: "Your shoes are wet — you ______ in the rain.",
    opts: ["have been walking", "have walked", "walked"],
    answer: 0,
    answerText: "Your shoes are wet — you have been walking in the rain.",
    why: "الأثر الظاهر الآن (حذاء مبلل + طين) دليل على نشاط امتد إلى قرب الحاضر — هذا مجال PPC. النتيجة المكتملة أو العدد يأخذان PP البسيط.",
    trap: "walked ✗ — الماضي البسيط يقطع الصلة بالآن، والأثر أمامك الآن.",
  },
  {
    n: 11, level: "medium", type: "spot",
    skill: "اتفاق الفاعل مع have/has",
    ref: "§3 · have أم has؟",
    ar: "اضغط الجزء الخاطئ في الجملة:",
    en: "He have been training since sunrise.",
    segments: ["He", "have", "been", "training", "since", "sunrise."],
    answer: 1, fix: "has",
    answerText: "He has been training since sunrise.",
    why: "الفاعل المفرد الغائب (he/she/it) يأخذ has. بقية الجملة سليمة: been + verb-ing + since + نقطة بداية.",
    trap: "البحث عن الخطأ في training أو since بينما الخلل في الجزء الأول من الصيغة.",
  },
  {
    n: 12, level: "medium", type: "tf",
    skill: "المعنى — هل تعني الاكتمال؟",
    ref: "§18 · هل يعني أن الفعل ما زال مستمرًا؟",
    ar: "جملة «I have been reading the novel» تعني بالضرورة أنني أنهيت قراءة الرواية.",
    answer: false,
    answerText: "خطأ (False) — الصيغة تصف النشاط والمدة، ولا تؤكد الاكتمال.",
    why: "PPC يوجّه الانتباه إلى النشاط الممتد؛ الاكتمال والعدد مجال PP البسيط (I have read the novel = أنهيتها).",
    trap: "الخلط بين «امتد النشاط» و«اكتمل الإنجاز».",
  },
  {
    n: 13, level: "medium", type: "single",
    skill: "أدوات الزمن مع الصيغة",
    ref: "§19 · كلمات شائعة · §20 · لا تعتمد على كلمة واحدة",
    ar: "أي جملة صحيحة؟",
    opts: [
      "She has been teaching at this school since 2015.",
      "She has been teaching at this school for 2015.",
      "She has been teaching at this school since three years.",
    ],
    answer: 0,
    answerText: "She has been teaching at this school since 2015.",
    why: "2015 نقطة بداية ← since. ثلاث سنوات مدة ← for three years. كلمة الزمن وحدها لا تحدد الزمن؛ المعنى (نشاط ممتد) هو الذي حدده.",
    trap: "for 2015 ✗ — for تقيس مدة، والسنة وحدها نقطة.",
  },

  // ==========================================================
  // Advanced (14–17) — أفعال الحالة، العدد المكتمل، مقارنة الأزمنة، التصحيح كتابةً
  // ==========================================================
  {
    n: 14, level: "advanced", type: "spot",
    skill: "أفعال الحالة",
    ref: "§23 · بعض الأفعال لا نستخدمها في Continuous",
    ar: "في الجملة فعل لا يقبل الاستمرار. اضغط الجزء الذي يجب تغييره:",
    en: "We have been owning this car since 2018.",
    segments: ["We", "have", "been", "owning", "this", "car", "since", "2018."],
    answer: 3, fix: "owned",
    answerText: "We have owned this car since 2018.",
    why: "own فعل حالة (ملكية) لا يأخذ Continuous عادةً؛ نعبّر عن الامتداد بـ Present Perfect البسيط + since. حذف been وحده لا يكفي — يتحوّل الفعل إلى V3.",
    trap: "الاعتقاد أن الخطأ في since 2018، أو تصحيح الجملة إلى have been own.",
  },
  {
    n: 15, level: "advanced", type: "single",
    skill: "العدد المكتمل",
    ref: "§22 · هل تُستخدم الصيغة مع عدد؟",
    ar: "«أنهت سارة ثلاثة تقارير». أي جملة أنسب؟",
    opts: [
      "Sara has finished three reports.",
      "Sara has been finishing three reports.",
      "Sara has been finish three reports.",
    ],
    answer: 0,
    answerText: "Sara has finished three reports.",
    why: "العدد المكتمل (three reports) نتيجة تُحصى ← Present Perfect البسيط. الصيغة المستمرة تُستعمل للمدة والنشاط، لا للعدد النهائي.",
    trap: "has been finishing ✗ — يوحي بنشاط متكرر غير مكتمل، وهو لا يناسب عددًا منتهيًا.",
  },
  {
    n: 16, level: "advanced", type: "match",
    skill: "مقارنة الأزمنة بنقطة المرجع",
    ref: "§24–§26 · Past Continuous · Past Perfect Continuous · الخريطة الزمنية",
    ar: "طابق كل جملة بزمنها وفق نقطة المرجع:",
    left: [
      "At 7:00 he was driving to the hospital.",
      "He had been driving for six hours before he stopped.",
      "He has been driving since 7:00.",
      "He drives to the hospital every Monday.",
    ],
    right: [
      "Present Perfect Continuous — من الماضي حتى الآن",
      "Past Continuous — لحظة محددة في الماضي",
      "Present Simple — عادة متكررة",
      "Past Perfect Continuous — مدة قبل حدث ماضٍ آخر",
    ],
    answer: [1, 3, 0, 2],
    answerText:
      "was driving at 7:00 ↔ Past Continuous · had been driving before he stopped ↔ Past Perfect Continuous · has been driving since 7:00 ↔ PPC · drives every Monday ↔ Present Simple",
    why: "نقطة المرجع هي الميزان: لحظة ماضية ← Past Continuous؛ مدة سبقت حدثًا ماضيًا ← Past Perfect Continuous؛ الامتداد حتى NOW ← PPC؛ عادة ← Present Simple.",
    trap: "الخلط بين had been (مرجع ماضٍ) و have been (مرجعه NOW) — الفرق حرف واحد لكنه يغيّر الزمن كله.",
  },
  {
    n: 17, level: "advanced", type: "typed",
    skill: "التصحيح كتابةً",
    ref: "§23 · أفعال الحالة · §6 · since",
    ar: "اكتب الجملة مصحَّحة: «He has been knowing the answer since morning.»",
    accept: ["He has known the answer since morning", "he has known the answer since morning"],
    answerText: "He has known the answer since morning.",
    why: "know فعل حالة؛ الامتداد هنا يُصاغ بـ Present Perfect البسيط (has known) مع since لنقطة البداية.",
    trap: "حذف since أو إبقاء been — التصحيح يتطلّب تحويل الفعل إلى V3 مع بقاء أداة الزمن.",
  },

  // ==========================================================
  // Thinking (18–20) — تحليل السياق والدليل وبناء التبرير
  // ==========================================================
  {
    n: 18, level: "thinking", type: "single",
    skill: "قراءة الدليل في المشهد",
    ref: "§13 · الآثار · §30 · تحدي المعنى",
    ar: "دخلت المطبخ فوجدت الطحين على الطاولة والفرن ما زال دافئًا، ولا أثر لخبز جاهز. أي جملة تصف المشهد أدق؟",
    opts: [
      "Someone has been baking in this kitchen.",
      "Someone has baked three loaves.",
      "Someone bakes bread every Friday.",
    ],
    answer: 0,
    answerText: "Someone has been baking in this kitchen.",
    why: "الآثار (طحين + فرن دافئ) دون نتيجة مكتملة تدل على نشاط امتد إلى قرب الحاضر — مجال PPC. الخيار الثاني يفترض عددًا منتهيًا لا دليل عليه، والثالث عادة متكررة.",
    trap: "اختيار جملة النتيجة (has baked) رغم أن المشهد لا يُظهر إنجازًا مكتملًا.",
  },
  {
    n: 19, level: "thinking", type: "multi",
    skill: "نشاط توقف للتو وترك أثرًا",
    ref: "§13 · الاستخدام الثاني · §18 · الاستمرار ليس شرطًا",
    ar: "اختر كل الجمل التي تصف نشاطًا يمكن أن يكون قد توقف للتو مع بقاء أثره واضحًا الآن:",
    opts: [
      "Her eyes are red — she has been crying.",
      "The grass is wet — it has been raining.",
      "The wall is perfect — he has painted it.",
      "His hands are oily — he has been fixing the bike.",
      "The floor is shining — she has cleaned it.",
    ],
    answer: [0, 1, 3],
    answerText:
      "Her eyes are red — she has been crying. · The grass is wet — it has been raining. · His hands are oily — he has been fixing the bike.",
    why: "الأثر + الصيغة المستمرة = نشاط امتد إلى قرب الحاضر، توقف أو لم يتوقف. أما «الجدار مثالي» و«الأرضية تلمع» فنتيجتان مكتملتان ← Present Perfect البسيط.",
    trap: "اعتبار كل أثر دليلًا على الصيغة المستمرة؛ الأثر المكتمل (جدار مطلي بالكامل) نتيجة لا نشاطًا.",
  },
  {
    n: 20, level: "thinking", type: "order",
    skill: "بناء تبرير يربط الأثر بالنشاط",
    ref: "§15 · النتيجة أم النشاط؟ · §35 · قاعدة الذهب",
    ar: "رتّب الجملة التي تفسّر الفوضى في المطبخ: «أنا أخبز طوال فترة ما بعد الظهر».",
    items: ["all afternoon", "been", "I", "have", "baking"],
    answer: ["I", "have", "been", "baking", "all afternoon"],
    answerText: "I have been baking all afternoon.",
    why: "الفاعل ← have ← been ← verb-ing ← المدة (all afternoon). الجملة تفسّر أثرًا حاضرًا (فوضى المطبخ) بنشاط ممتد، لا بعدد مكتمل.",
    trap: "تقديم all afternoon على الفاعل ✗ — كلمات الوقت تأتي بعد الصيغة في هذا النمط.",
  },
];

export const TEST_32_LEVEL_COUNTS: Record<TestLevel32, number> = {
  basic: TEST_32.filter((q) => q.level === "basic").length,
  medium: TEST_32.filter((q) => q.level === "medium").length,
  advanced: TEST_32.filter((q) => q.level === "advanced").length,
  thinking: TEST_32.filter((q) => q.level === "thinking").length,
};

export const LEVEL_LABEL_32: Record<TestLevel32, string> = {
  basic: "Basic",
  medium: "Medium",
  advanced: "Advanced",
  thinking: "Thinking",
};

/** نغمة بصرية لكل مستوى — من هوية الدرس (أزرق مائي → بنفسجي → مرجاني → ذهبي) */
export const LEVEL_TONE_32: Record<TestLevel32, string> = {
  basic: "aqua",
  medium: "indigo",
  thinking: "coral",
  advanced: "gold",
};

export type TestSolution32 = {
  n: number;
  type: TestQ32["type"];
  level: TestLevel32;
  skill: string;
  ref: string;
  answer: string;
  why: string;
  trap?: string;
};

export const TEST_32_SOLUTIONS: TestSolution32[] = TEST_32.map((q) => ({
  n: q.n,
  type: q.type,
  level: q.level,
  skill: q.skill,
  ref: q.ref,
  answer: q.answerText,
  why: q.why,
  trap: q.trap,
}));

/** مهارات الاختبار — لفهرس المعلم */
export const TEST_32_SKILLS: string[] = Array.from(new Set(TEST_32.map((q) => q.skill)));

/** مطابقة الإجابة النصية المكتوبة: تطبيع خفيف (حروف صغيرة، بلا علامات ترقيم، مسافات موحّدة) */
export function normalizeTyped32(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[.?!,;:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
