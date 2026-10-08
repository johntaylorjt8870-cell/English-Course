// ============================================================
// منطقة الاختبار — 20 سؤالًا جديدًا مؤلَّفة لهذا الاختبار (لا نسخ ولا إعادة صياغة
// لأسئلة المصدر). التوزيع: 6 Basic · 7 Medium · 4 Advanced · 3 Thinking.
// أنواع: اختيار واحد · صح/خطأ · متعدد · ترتيب · مطابقة · حدّد الخطأ · كتابة.
// كل شرح/تفسير هنا «Platform Explanation» (شرح المنصة، وليس نصًا من المصدر).
// ============================================================

export type TestLevel32 = "basic" | "medium" | "advanced" | "thinking";

type Base32 = { n: number; level: TestLevel32; ar: string; en?: string; why: string; trap?: string; answerText: string };

export type TestQ32 =
  | (Base32 & { type: "single"; opts: string[]; answer: number })
  | (Base32 & { type: "tf"; answer: boolean })
  | (Base32 & { type: "multi"; opts: string[]; answer: number[] })
  | (Base32 & { type: "order"; items: string[]; answer: string[] })
  | (Base32 & { type: "match"; left: string[]; right: string[]; answer: number[] })
  | (Base32 & { type: "spot"; segments: string[]; answer: number; fix: string })
  | (Base32 & { type: "typed"; accept: string[] });

export const TEST_32: TestQ32[] = [
  // ---------- Basic (1–6) ----------
  {
    n: 1, level: "basic", type: "single",
    ar: "أكمل الجملة: «هي تدرس في المكتبة منذ الثامنة».",
    en: "She ______ in the library since 8:00.",
    opts: ["has been studying", "has been study", "has studying"], answer: 0,
    answerText: "She has been studying in the library since 8:00.",
    why: "الفاعل She يأخذ has، وبعد been نضع verb-ing: studying. since 8:00 = نقطة بداية.",
    trap: "has been study ✗ — بعد been لا نضع الفعل الأساسي.",
  },
  {
    n: 2, level: "basic", type: "tf",
    ar: "في الجملة «They have been waiting for an hour»: been هي V3 من be، وwaiting تعطي معنى الاستمرار.",
    answer: true,
    answerText: "صحيح (True)",
    why: "هذا هو تكوين الزمن نفسه: have/has + been + verb-ing، وbeen هي V3 من be.",
    trap: "الخلط بين been (V3 من be) و have (الرابط بالحاضر).",
  },
  {
    n: 3, level: "basic", type: "single",
    ar: "أي جملة صحيحة نحويًا؟",
    opts: ["He have been running.", "He has been running.", "He has been run."], answer: 1,
    answerText: "He has been running.",
    why: "He ← has، وبعد been نضع verb-ing: running.",
    trap: "He have ✗ (He ← has) · has been run ✗ (run ليست verb-ing).",
  },
  {
    n: 4, level: "basic", type: "tf",
    ar: "الجملة «It has been raining since morning» يمكن أن تصف مطرًا توقف الآن، وبقيت الأرض مبللة.",
    answer: true,
    answerText: "صحيح (True)",
    why: "PPC يصف نشاطًا امتد إلى قرب الحاضر، وأثره (الأرض المبللة) ظاهر الآن.",
    trap: "الظن أن كل جملة PPC تعني أن الفعل مستمر في هذه اللحظة بالضبط.",
  },
  {
    n: 5, level: "basic", type: "single",
    ar: "أكمل النفي: «هي لم تنم جيدًا مؤخرًا».",
    en: "She ______ well lately.",
    opts: ["hasn't been sleeping", "hasn't been sleep", "isn't been sleeping"], answer: 0,
    answerText: "She hasn't been sleeping well lately.",
    why: "النفي: have/has + not + been + verb-ing، والمختصر لـ has not هو hasn't.",
    trap: "isn't been ✗ — الفاعل She يأخذ has، لا is.",
  },
  {
    n: 6, level: "basic", type: "typed",
    ar: "أجب بالجواب القصير: «Have you been studying?» — «Yes, I ______.» (اكتب الكلمة الناقصة)",
    accept: ["have"],
    answerText: "Yes, I have.",
    why: "الجواب القصير يعيد have أو has فقط، لا been.",
    trap: "Yes, I have been ✗ — خطأ مذكور صراحةً في المصدر (§11).",
  },

  // ---------- Medium (7–13) ----------
  {
    n: 7, level: "medium", type: "multi",
    ar: "اختر كل الجمل الصحيحة التي تُستعمل فيها الصيغة لوصف مدة أو نشاط ممتد:",
    opts: [
      "I have been studying since 9:00.",
      "I have been studying since three hours.",
      "I have been studying for three hours.",
      "I have been knowing him for years.",
      "I have been reading all morning.",
    ],
    answer: [0, 2, 4],
    answerText: "I have been studying since 9:00. · I have been studying for three hours. · I have been reading all morning.",
    why: "since 9:00 = نقطة بداية؛ for three hours = مدة؛ all morning = وقت النشاط. since three hours ✗ لأن three hours مدة، و have been knowing ✗ لأن know فعل حالة.",
    trap: "since three hours يبدو صحيحًا لأن الترجمة العربية «منذ ثلاث ساعات» — الميزان هو نوع الكلمة بعد since.",
  },
  {
    n: 8, level: "medium", type: "order",
    ar: "رتّب القطع لتكوين الجملة: «هي تنتظر منذ يوم الاثنين».",
    items: ["Monday", "since", "waiting", "been", "has", "She"],
    answer: ["She", "has", "been", "waiting", "since", "Monday"],
    answerText: "She has been waiting since Monday.",
    why: "الفاعل ← has ← been ← verb-ing ← since ← نقطة البداية.",
    trap: "وضع since قبل been ✗ — since تأتي بعد verb-ing وقبل نقطة البداية.",
  },
  {
    n: 9, level: "medium", type: "match",
    ar: "طابق كل عبارة زمنية مع دورها في الجملة.",
    left: ["for two hours", "since 6:00", "all morning", "how long"],
    right: ["نقطة بداية", "سؤال عن المدة", "كلمة زمن لنشاط ممتد", "مدة زمنية"],
    answer: [3, 0, 2, 1],
    answerText: "for two hours ↔ مدة زمنية · since 6:00 ↔ نقطة بداية · all morning ↔ كلمة زمن لنشاط ممتد · how long ↔ سؤال عن المدة",
    why: "for = مدة، since = بداية، all morning = وقت النشاط، how long = سؤال عن المدة.",
    trap: "الخلط بين how long (سؤال) و for (الجواب الذي يقيس المدة).",
  },
  {
    n: 10, level: "medium", type: "single",
    ar: "أي جواب مناسب لـ «How long has he been waiting?»",
    opts: ["He has been waiting for twenty minutes.", "He has been waiting twenty minutes.", "He has waited since twenty minutes."], answer: 0,
    answerText: "He has been waiting for twenty minutes.",
    why: "How long يُجاب عنه بمدة مع for: for twenty minutes.",
    trap: "since twenty minutes ✗ — twenty minutes مدة، و since تحتاج نقطة بداية.",
  },
  {
    n: 11, level: "medium", type: "spot",
    ar: "اضغط الجزء الخطأ في الجملة.",
    segments: ["She", "have", "been", "studying", "since", "7:00."], answer: 1, fix: "has",
    answerText: "She has been studying since 7:00.",
    why: "الفاعل She يأخذ has، فيكون الخطأ في have.",
    trap: "الخطأ ليس في studying أو since، بل في الرابط الذي يسبق been.",
  },
  {
    n: 12, level: "medium", type: "tf",
    ar: "«Yes, I have been.» جواب قصير صحيح عن السؤال «Have you been studying?»",
    answer: false,
    answerText: "خطأ (False) — الصحيح: Yes, I have.",
    why: "الجواب القصير يستعمل have/has فقط.",
    trap: "الظن أن إعادة been في الجواب تجعله أكثر اكتمالًا.",
  },
  {
    n: 13, level: "medium", type: "single",
    ar: "الجدار أصبح مطليًا والطلاء جفّ. أي جملة تركّز على النتيجة؟",
    opts: ["He has painted the wall.", "He has been painting the wall.", "He has been paint the wall."], answer: 0,
    answerText: "He has painted the wall.",
    why: "النتيجة/الإنجاز ← Present Perfect بـ V3 (painted).",
    trap: "has been painting يركز على النشاط، لا على الجدار المنتهي.",
  },

  // ---------- Advanced (14–17) ----------
  {
    n: 14, level: "advanced", type: "spot",
    ar: "اضغط الخطأ الوحيد في الجملة.",
    segments: ["They", "have", "been", "go", "to", "school", "since", "2020."], answer: 3, fix: "going",
    answerText: "They have been going to school since 2020.",
    why: "بعد been نستخدم verb-ing: going.",
    trap: "استبدال go بـ went (V2) — V2 لا تأتي بعد been.",
  },
  {
    n: 15, level: "advanced", type: "single",
    ar: "طالبان: A: «I have written five pages.» — B: «I have been writing for three hours.» أي عبارة صحيحة؟",
    opts: [
      "B تركّز على النشاط والمدة، والعدد ليس هو محور جملتها.",
      "B تعني أن الصفحات انتهت بالتأكيد.",
      "A و B لهما المعنى نفسه بلا فرق في زاوية النظر.",
    ], answer: 0,
    answerText: "B تركّز على النشاط والمدة؛ A تركّز على النتيجة والكمية.",
    why: "زاوية النظر تختلف: A تنظر إلى الإنجاز (خمس صفحات)، وB تنظر إلى النشاط والمدة. ولا تؤكد جملة B أن الكتابة انتهت.",
    trap: "افتراض أن PPC تعني الانتهاء، أو أن الجملتين متطابقتان في زاوية النظر.",
  },
  {
    n: 16, level: "advanced", type: "match",
    ar: "طابق كل جملة بزمنها الصحيح.",
    left: ["I was studying at 8:00.", "I had been studying when she called.", "I have been studying since 8:00."],
    right: ["Present Perfect Continuous: حتى الآن", "Past Continuous: نقطة في الماضي", "Past Perfect Continuous: قبل حدث ماضٍ آخر"],
    answer: [1, 2, 0],
    answerText: "I was studying at 8:00. ↔ Past Continuous · I had been studying when she called. ↔ Past Perfect Continuous · I have been studying since 8:00. ↔ Present Perfect Continuous",
    why: "نقطة المرجع تحدد الزمن: 8:00 نقطة في الماضي، وcalled حدث ماضٍ آخر، وNOW هي الحاضر.",
    trap: "الخلط بين had been (قبل حدث ماضٍ) و have been (قبل الآن).",
  },
  {
    n: 17, level: "advanced", type: "typed",
    ar: "صحّح الجملة كتابةً: «I have been knowing him for ten years.»",
    accept: ["I have known him for ten years"],
    answerText: "I have known him for ten years.",
    why: "know فعل حالة لا يأخذ continuous عادةً؛ نستعمل Present Perfect بـ V3: known.",
    trap: "حذف been وترك knowing ✗ — يجب تحويل الفعل إلى V3.",
  },

  // ---------- Thinking (18–20) ----------
  {
    n: 18, level: "thinking", type: "single",
    ar: "أي جملة تُظهر أن النشاط ربما توقف، لكن أثره واضح الآن؟",
    opts: [
      "You are out of breath, so you have been running.",
      "You have been run since yesterday.",
      "You have been run and you are running now.",
    ], answer: 0,
    answerText: "You are out of breath, so you have been running.",
    why: "النشاط امتد إلى قرب الحاضر وأثره (اللهاث) ظاهر الآن؛ ليس شرطًا أنه يحدث في هذه اللحظة.",
    trap: "اعتبار PPC يعني الاستمرار الحرفي في هذه اللحظة، أو اختيار جملة فيها فعل مبني للمجهول لا يناسب.",
  },
  {
    n: 19, level: "thinking", type: "multi",
    ar: "اختر كل الجمل التي تكون فيها Present Perfect أفضل من Continuous لأن التركيز على عدد مكتمل أو نتيجة:",
    opts: [
      "I have written six reports this week.",
      "I have been writing reports since 9:00.",
      "She has fixed three bikes today.",
      "She has been fixing bikes all afternoon.",
      "We have cleaned the garage.",
    ], answer: [0, 2, 4],
    answerText: "I have written six reports this week. · She has fixed three bikes today. · We have cleaned the garage.",
    why: "six reports و three bikes عدد مكتمل، و the garage cleaned نتيجة واضحة ← Present Perfect. أما since 9:00 وall afternoon فتركّزان على النشاط والمدة.",
    trap: "الظن أن كل كلمة زمن مثل today أو this week تفرض Present Perfect Continuous — المعنى هو الذي يحدد الزمن.",
  },
  {
    n: 20, level: "thinking", type: "order",
    ar: "رتّب ردًّا يفسّر تعبك: «أنا متعب لأنني أعمل طوال اليوم».",
    items: ["all day", "been", "I", "have", "working"],
    answer: ["I", "have", "been", "working", "all day"],
    answerText: "I have been working all day.",
    why: "الفاعل ← have ← been ← verb-ing ← المدة all day. والجملة تربط النشاط الممتد بالتعب الظاهر الآن.",
    trap: "وضع all day في أول الجملة ✗ — نضعها بعد verb-ing.",
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

export type TestSolution32 = { n: number; type: TestQ32["type"]; level: TestLevel32; answer: string; why: string; trap?: string };
export const TEST_32_SOLUTIONS: TestSolution32[] = TEST_32.map((q) => ({
  n: q.n,
  type: q.type,
  level: q.level,
  answer: q.answerText,
  why: q.why,
  trap: q.trap,
}));

/** مطابقة الإجابة النصية المكتوبة: تطبيع خفيف (حروف صغيرة، بلا علامات ترقيم، مسافات موحّدة) */
export function normalizeTyped32(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[.?!,;:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
