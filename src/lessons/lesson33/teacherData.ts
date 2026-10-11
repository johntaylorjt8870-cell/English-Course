// ============================================================
// teacherData33 — بيانات منطقة المعلم للدرس 33
// كلمة مرور المعلم محفوظة كما هي في الكورس كله: somer173.
// - حلول ⑬ ومفاتيح الاختبار غير منصوصة في المصدر ← مشتقة وفق
//   قواعد الدرس نفسه وموسومة بذلك صراحة.
// - الأخطاء المتعمدة منسوخة نصًا من سجل المصدر (ledger33):
//   4 من §6 + 8 من §12 + 11 موضعًا من §18 = 23 موضعًا.
// ============================================================

export const TEACHER_PASSWORD_33 = "somer173";

export const TEACHER_33_OVERVIEW = {
  title: "نظرة عامة للمعلم",
  objectives: [
    "مراجعة أزمنة الحاضر الأربعة كمنظومة واحدة مترابطة (المصدر: أهداف الدرس).",
    "التمييز بين الأزمنة الأربعة حسب الزمن والمعنى.",
    "بناء جمل صحيحة في الأزمنة الأربعة: إثبات ونفي وسؤال.",
    "تصحيح الأخطاء الشائعة في استخدام الأزمنة.",
    "قراءة نص إنجليزي وفهم اختيار الأزمنة فيه، وكتابة فقرة تدمج أكثر من زمن.",
  ],
  prerequisites: [
    "الدروس 25–26: المضارع البسيط والمستمر.",
    "الدرس 30: مراجعة منظومة الماضي (نموذج دروس المراجعة).",
    "الدروس 31–32: المضارع التام والتام المستمر — مرجعهما الأساسي في هذا الدرس.",
  ],
  core: [
    "الخريطة الذهبية: أربع زوايا نظر (عادة / جارٍ / إنجاز مرتبط بالحاضر / نشاط ممتد).",
    "جدول البناء + الإثبات والنفي والسؤال + قاعدة «لا تخلط الأفعال المساعدة».",
    "المواجهات الثلاث + أفعال الحالة السبعة + تحذير for/since.",
    "محقق القواعد بمستوييه (8 جمل، ثم فقرة Emma بأحد عشر موضعًا) وقصة Ryan وتحليلها.",
    "الاختبار النهائي Present Tenses Master Test (25 سؤالًا) ثم مهمة الكتابة.",
  ],
};

export const TEACHER_33_TIMING = [
  "افتتاحية + أهداف: 3 دقائق.",
  "الخريطة والبناء والمعنى والسؤال الحاسم (s1–s4): 10 دقائق.",
  "الأدوات: الجداول، لا تخلط، الكلمات الدالة (s5–s7): 8 دقائق.",
  "المواجهات الثلاث وأفعال الحالة (s8–s11): 10 دقائق.",
  "التدريب والمحقق الأول و IQ200 (s12–s15): 10 دقائق.",
  "القراءة والتحليل ومحقق الفقرة وتحدي المعنى (s16–s19): 9 دقائق.",
  "الاختبار النهائي (25 سؤالًا): 12–15 دقيقة.",
  "مهمة الكتابة + الملخص الذهبي + خريطة التقدم: 8 دقائق.",
  "المجموع التقريبي: 70–73 دقيقة (يمكن تقسيمها على حصتين).",
];

export type TeacherNote33 = { head: string; lines: string[] };

export const TEACHER_33_NOTES: TeacherNote33[] = [
  {
    head: "ابدأ بالزاوية لا بالصيغة",
    lines: [
      "الدرس كله مبني على «زاوية النظر»: قبل أي تدريب اسأل الطالب: ماذا تريد أن تُبرز؟",
      "مثال المصدر Nora بالفعل نفسه work هو أفضل افتتاحية — اعرض الجمل الأربع قبل أي شرح.",
    ],
  },
  {
    head: "هيكل كل زمن",
    lines: [
      "شبّه كل زمن بهيكل مكتمل: V1 / am-is-are+ing / have-has+V3 / have-has+been+ing.",
      "قاعدة المصدر: لا تستعِر أجزاء زمن لبناء زمن آخر — هذا علاج خلط المساعدات (Does she practices? ✗).",
    ],
  },
  {
    head: "المواجهات الثلاث",
    lines: [
      "قدّم كل مواجهة بسؤالين متقابلين: ماذا الآن؟ / منذ متى؟ — عدد ونتيجة؟ / نشاط ومدة؟",
      "مثال المصدر المحوري: I teach / I am teaching this month — المهنة الثابتة مقابل الفترة المؤقتة.",
    ],
  },
  {
    head: "أفعال الحالة و think",
    lines: [
      "أفعال الحالة السبعة (know, believe, understand, want, need, own, remember) بلا مستمر.",
      "think حالة خاصة: رأي = بسيط · عملية تفكير جارية = مستمر. درّسها بمثالي المصدر المتقابلين.",
    ],
  },
  {
    head: "متى تكون إجابتان صحيحتين (IQ200)",
    lines: [
      "أفعال live, work, teach تقبل التام والتام المستمر مع المدة نفسها — فرق تركيز لا فرق صحة.",
      "الدرس المهم في المصدر: لا تختَر التام المستمر تلقائيًا عند رؤية for/since (I have owned… / I have known…).",
    ],
  },
];

export type TeacherSolution33 = { head: string; lines: string[] };

export const TEACHER_33_SOLUTIONS: TeacherSolution33[] = [
  {
    head: "محلول ⑬ — التدريب الأول (عشرة فراغات) — حلول مشتقة وفق قواعد المصدر",
    lines: [
      "① cooks — every day عادة ← بسيط + s.",
      "② is knocking — Listen! صوت جارٍ ← مستمر.",
      "③ have lost — النتيجة حاضرة (لا أستطيع الدخول) ← تام.",
      "④ have been waiting — for twenty minutes امتداد ← تام مستمر.",
      "⑤ speaks — قدرة/حقيقة ثابتة ← بسيط + s.",
      "⑥ is inspecting — these days ← مستمر.",
      "⑦ has won — five matches so far حصيلة ← تام.",
      "⑧ has been working — since 7:00 امتداد ← تام مستمر (ويقبل has worked: الدرس ⑮).",
      "⑨ are serving — right now ← مستمر.",
      "⑩ has examined — مريضان هذا الصباح حصيلة ← تام.",
    ],
  },
  {
    head: "محلول ⑭ — التدريب الثاني (design في الأزمنة الأربعة) — منصوص في المصدر",
    lines: [
      "① designs · ② is designing · ③ has designed · ④ has been designing.",
      "لماذا ③ has designed؟ لأننا نركّز على العدد المكتمل (five logos) ← التام.",
      "لماذا ④ has been designing؟ لأننا نركّز على النشاط ومدته (for two hours) ← التام المستمر.",
    ],
  },
  {
    head: "محلول ⑫ — Grammar Detective الأول (ثماني قضايا)",
    lines: [
      "① He doesn't go to school by bus.",
      "② They are playing football now.",
      "③ I have seen that movie before.",
      "④ She has known him for years.",
      "⑤ Look! The dog is running after the ball.",
      "⑥ He has written a letter to his friend.",
      "⑦ It is raining now.",
      "⑧ Have you ever visited Canada? — ملاحظة المصدر: أما here فهو سؤال عن التجربة.",
    ],
  },
  {
    head: "محلول ⑱ — فقرة Emma بعد التصحيح (أحد عشر موضعًا)",
    lines: [
      "Emma usually studies English in the evening. She prefers short lessons, and she has already completed three units. These days, she is preparing for an important exam, and her teacher knows her effort. Emma has been teaching English to her friends since 2023. Her friends agree that she is improving, and everyone believes her. They have seen her progress. She doesn't stop until the lesson ends.",
      "ملاحظة المصدر العددية محفوظة: العنوان «عشرة أخطاء» والعدّ أحد عشر موضعًا — خطأ for/since موضع مستقل.",
    ],
  },
  {
    head: "محلول ㉒ — نموذج مهمة الكتابة (المثال القصير منصوص، والباقي توجيهي)",
    lines: [
      "المثال المنصوص: I study English every evening… — لا تنسخه في فقرتك.",
      "توجيه المنصة: I am learning new words right now. / I have finished two books. / I have been practicing since last year.",
      "المطلوب: 10 جمل (2 بسيط + 2 مستمر + 3 تام + 3 تام مستمر) مع for/since و already/yet/recently — قيّم بالـ rubric أدناه.",
    ],
  },
];

export type RubricRow33 = { level: string; desc: string };
export type TeacherRubric33 = { head: string; rows: RubricRow33[] };

export const TEACHER_33_RUBRICS: TeacherRubric33[] = [
  {
    head: "rubric مهمة الكتابة (My Learning Journey — 10 جمل)",
    rows: [
      { level: "4 — متقن", desc: "المتطلبات الستة كلها: 2 بسيط + 2 مستمر + 3 تام + 3 تام مستمر، مع for/since و already/yet/recently، وتراكيب سليمة." },
      { level: "3 — جيد", desc: "الأزمنة الأربعة حاضرة، مع خلل واحد في العدد المطلوب أو في كلمة دالة واحدة." },
      { level: "2 — مقبول", desc: "ثلاثة أزمنة سليمة أو أقل؛ خلط بين زمنين في أكثر من جملة." },
      { level: "1 — يحتاج دعمًا", desc: "زمن واحد مهيمن؛ أخطاء تركيب متكررة — أعده إلى الجدول الشامل (s5)." },
    ],
  },
  {
    head: "rubric الاختبار النهائي (25 سؤالًا)",
    rows: [
      { level: "21–25", desc: "إتقان — مستوى IQ200." },
      { level: "16–20", desc: "جيد — مراجعة خفيفة للمستوى الذي أخطأ فيه." },
      { level: "9–15", desc: "مراجعة — عُد إلى المواجهات الثلاث والتدريبين." },
      { level: "0–8", desc: "دعم — أعد بناء الخريطة الذهبية والجداول من البداية." },
    ],
  },
];

export const TEACHER_33_MISTAKES: TeacherNote33[] = [
  {
    head: "خلط المساعدات",
    lines: [
      "Does she practices? ✗ — does تحمل s فالفعل يعود V1.",
      "Has she been practice? ✗ — been تحتاج V-ing.",
      "العلاج: اكتب هيكل كل زمن فوق السبورة قبل التصحيح — لا تجمع أجزاء من زمنين.",
    ],
  },
  {
    head: "المستمر مع أفعال الحالة",
    lines: [
      "I am knowing ✗ / I have been owning ✗ — الحالة لا «تتحرك».",
      "العلاج: بطاقات الأفعال السبعة (s11) ثم استثناء think.",
    ],
  },
  {
    head: "for/since مع الأزمنة",
    lines: [
      "since 2023 ← نقطة بداية · for two hours ← مدة.",
      "لا تختَر التام المستمر تلقائيًا: مع الحالات التام البسيط (have owned / have known ✓).",
    ],
  },
  {
    head: "اختيار الزمن بالكلمة بدل المعنى",
    lines: [
      "الكلمة الدالة تُرشّح، والمعنى يحسم: every morning عادة، لكن this month قد يسحب نحو المستمر المؤقت.",
      "العلاج: درّب «السؤال الحاسم» (s4) قبل أي اختيار.",
    ],
  },
];

/** الأخطاء المتعمدة في المصدر — 23 موضعًا منسوخًا نصًا من السجل وتُدرَّس كتصحيح */
export const INTENTIONALLY_WRONG_33: { id: string; wrong: string; right: string; note: string; section: string }[] = [
  { id: "№6-①", wrong: "Does she practices every day?", right: "Does she practice every day?", note: "does تحمل s — الفعل يعود V1.", section: "⑥ لا تخلط" },
  { id: "№6-②", wrong: "Is she practice now?", right: "Is she practicing now?", note: "is تحتاج V-ing.", section: "⑥ لا تخلط" },
  { id: "№6-③", wrong: "Has she been practice since morning?", right: "Has she been practicing since morning?", note: "been تحتاج V-ing.", section: "⑥ لا تخلط" },
  { id: "№6-④", wrong: "Do she practice every day?", right: "Does she practice every day?", note: "she ← does.", section: "⑥ لا تخلط" },
  { id: "GD1-①", wrong: "He don't go to school by bus.", right: "He doesn't go to school by bus.", note: "المفرد الغائب ← doesn't.", section: "⑫ محقق ١" },
  { id: "GD1-②", wrong: "They is playing football now.", right: "They are playing football now.", note: "They ← are.", section: "⑫ محقق ١" },
  { id: "GD1-③", wrong: "I have see that movie before.", right: "I have seen that movie before.", note: "بعد have تصريف ثالث.", section: "⑫ محقق ١" },
  { id: "GD1-④", wrong: "She has been knowing him for years.", right: "She has known him for years.", note: "know حالة — بلا مستمر.", section: "⑫ محقق ١" },
  { id: "GD1-⑤", wrong: "Look! The dog runs after the ball.", right: "Look! The dog is running after the ball.", note: "Look! ← مستمر.", section: "⑫ محقق ١" },
  { id: "GD1-⑥", wrong: "He has wrote a letter to his friend.", right: "He has written a letter to his friend.", note: "write ← written.", section: "⑫ محقق ١" },
  { id: "GD1-⑦", wrong: "It are raining now.", right: "It is raining now.", note: "It ← is.", section: "⑫ محقق ١" },
  { id: "GD1-⑧", wrong: "Have you ever been visiting Canada?", right: "Have you ever visited Canada?", note: "أما here فهو سؤال عن التجربة (ملاحظة المصدر).", section: "⑫ محقق ١" },
  { id: "E-①", wrong: "usually study", right: "usually studies", note: "عادة + مفرد غائب.", section: "⑱ فقرة Emma" },
  { id: "E-②", wrong: "is prefer", right: "prefers", note: "prefer حالة.", section: "⑱ فقرة Emma" },
  { id: "E-③", wrong: "already complete", right: "already completed", note: "تصريف ثالث.", section: "⑱ فقرة Emma" },
  { id: "E-④", wrong: "she prepares", right: "she is preparing", note: "These days ← مستمر.", section: "⑱ فقرة Emma" },
  { id: "E-⑤", wrong: "is knowing", right: "knows", note: "know حالة.", section: "⑱ فقرة Emma" },
  { id: "E-⑥", wrong: "has teaching", right: "has been teaching", note: "نقص been — امتداد يحتاج has been + V-ing.", section: "⑱ فقرة Emma" },
  { id: "E-⑦", wrong: "for 2023", right: "since 2023", note: "سنة نقطة بداية — موضع مستقل عن أخطاء الأزمنة.", section: "⑱ فقرة Emma" },
  { id: "E-⑧", wrong: "are agree", right: "agree", note: "agree رأي/حالة.", section: "⑱ فقرة Emma" },
  { id: "E-⑨", wrong: "everyone believe", right: "everyone believes", note: "everyone مفرد.", section: "⑱ فقرة Emma" },
  { id: "E-⑩", wrong: "have saw", right: "have seen", note: "see ← seen.", section: "⑱ فقرة Emma" },
  { id: "E-⑪", wrong: "don't stop", right: "doesn't stop", note: "She ← doesn't.", section: "⑱ فقرة Emma" },
];

export const TEACHER_33_TEST_GUIDE: TeacherNote33[] = [
  {
    head: "بنية الاختبار النهائي",
    lines: [
      "25 سؤالًا في 5 مستويات، مأخوذة من قسم المصدر ⑳ بنفس الترقيم.",
      "الأول: اختيار الزمن (1–5) · الثاني: لغز الوقت (6–10) · الثالث: صيد الأخطاء (11–15) · الرابع: اختيار المعنى (16–20) · الخامس: التحدي النهائي — فقرة Mia (21–25).",
      "الاختبار محايد قبل «إرسال الاختبار»، ومفاتيح الحلول غير منصوصة في المصدر ← مشتقة وفق قواعد الدرس وموسومة، وتُقفل حتى الإرسال الكامل (قسم المصدر ㉑).",
    ],
  },
  {
    head: "قراءة النتائج",
    lines: [
      "خطأ في المستوى الأول ← مشكلة خريطة ذهنية (أعد s1–s4).",
      "خطأ في الثاني ← هيكل الزمن نفسه (أعد s5–s6).",
      "خطأ في الثالث/الرابع ← المواجهات والحالات (أعد s8–s11).",
      "خطأ في الخامس ← الدمج في سياق (أعد قصة Ryan s16–s17).",
    ],
  },
];

export const TEACHER_33_REMEDIATION: TeacherNote33[] = [
  {
    head: "مسار قصير (يوم واحد)",
    lines: [
      "أعد الخريطة الذهبية بأمثلة الطالب نفسه، ثم المواجهة التي أخطأ فيها، ثم أعد المستوى المقابل فقط.",
    ],
  },
  {
    head: "مسار كامل (أسبوع)",
    lines: [
      "اليوم 1: s1–s4 · اليوم 2: s5–s7 · اليوم 3: s8–s11 · اليوم 4: s12–s15 · اليوم 5: s16–s19 ثم إعادة الاختبار كاملًا.",
      "اختم بمهمة الكتابة من جديد وقارنها بالنسخة الأولى.",
    ],
  },
];

export const TEACHER_33_SOURCE_NOTE =
  "سجل المصدر كامل أدناه — 26 قسمًا (غلاف + أهداف + 24 قسمًا مرقّمًا)، منقولة كما وردت مع توثيق مواضع المعالجة في docs/lesson33-coverage.md. هذا السجل للتدقيق، ولا يُعرض للطالب كنص خام.";
