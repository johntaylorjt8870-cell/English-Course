// ============================================================
// الدرس 32 — Present Perfect Continuous · المضارع التام المستمر
// 🌿 THE ACTIVITY RIBBON — شريط النشاط
//
// - سجل المصدر الحرفي في ledger32.ts (40 وحدة). هذا الملف يحوي:
//   1) سجل الخطوات SLIDES: خطوة واحدة لكل وحدة مصدرية (1:1) مع مرجع المصدر.
//   2) محتوى التفاعلات: الأمثلة المأخوذة من المصدر، والجمل المبنية
//      للتمارين، وكل شرح «Platform Explanation» مكتوب هنا بوضوح.
// - أي جملة إنجليزية مأخوذة من المصدر تُعرض كما هي. أي جملة من إنشاء
//   المنصة للتدريب تُوسم «مثال تدريبي للمنصة» في الواجهة.
// ============================================================

export const LESSON_TITLE_32 = "الدرس 32: Present Perfect Continuous — المضارع التام المستمر";
export const LESSON_SUBTITLE_32 = "🌿 شريط النشاط — نشاط بدأ قبل الآن وما زال يترك أثره";
export const LAB_NAME_32 = "THE ACTIVITY RIBBON";
export const LAB_MOTTO_32 = "have/has + been + V-ing · الشريط يمتد من الماضي إلى NOW";

export type SourceCount32 = { numbered: number; ledger: number };

// ============================================================
// أقسام الشريط الجانبي (تجميع الخطوات)
// ============================================================
export const SECTIONS_32: { id: string; label: string }[] = [
  { id: "START", label: "🌿 البداية" },
  { id: "FORM", label: "🧱 الصيغة والأساس" },
  { id: "TIME", label: "⏳ for · since · How long" },
  { id: "QFORM", label: "❓ النفي والسؤال" },
  { id: "CONTRAST", label: "🔍 الأثر والنتيجة" },
  { id: "WORDS", label: "🔑 الكلمات والأفعال" },
  { id: "COMPARE", label: "🧭 نقطة المرجع" },
  { id: "FIX", label: "🕵️ صيد الأخطاء" },
  { id: "BOSS", label: "🏆 التحديات النهائية" },
  { id: "END", label: "🏁 الخاتمة" },
];

// ============================================================
// سجل الخطوات — خطوة لكل وحدة في السجل (40) — ترتيب المصدر
// ============================================================
export type Slide32Data = {
  id: string;
  section: string;
  mascot: string;
  title: string;
  step?: string;
  lead?: string;
  tip?: string;
  /** معرّف وحدة السجل التي تغطيها هذه الخطوة (مرة واحدة بالضبط) */
  source: string[];
};

export const SLIDES: Slide32Data[] = [
  { id: "cover", section: "START", mascot: "🌿", title: "تتبّع الأثر المستمر", step: "الغلاف",
    lead: "نشاط بدأ في الماضي… وما زال أثره يصل إلى الآن.",
    tip: "شريط النشاط هو الفكرة التي سنبنيها في هذا الدرس — شاهده يمتد نحو NOW.", source: ["cover"] },
  { id: "objectives", section: "START", mascot: "🎯", title: "أهداف الدرس", step: "الأهداف",
    lead: "تسعة أهداف — علّم كل هدف بعد أن تتقنه.",
    tip: "كل هدف تعلّمه يفتح جزءًا من شريط النشاط.", source: ["objectives"] },

  { id: "s1", section: "FORM", mascot: "🧠", title: "ما هو Present Perfect Continuous؟", step: "① التعريف",
    lead: "رتّب قطع الجملة: الفاعل ← have/has ← been ← verb-ing.",
    tip: "القطعة الأخيرة هي التي تحمل معنى الاستمرار.", source: ["s1"] },
  { id: "s2", section: "FORM", mascot: "🔥", title: "لماذا have + been + ing؟", step: "② الأجزاء",
    lead: "المس كل قطعة لتقرأ دورها في الجملة.",
    tip: "أربع قطع، أربع وظائف — اكشفها كلها.", source: ["s2"] },
  { id: "s3", section: "FORM", mascot: "⭐", title: "have أم has؟", step: "③ الفاعل",
    lead: "ضع كل فاعل في صندوقه الصحيح.",
    tip: "I / You / We / They ← have · He / She / It ← has.", source: ["s3"] },
  { id: "s4", section: "FORM", mascot: "🧠", title: "متى نستخدمه؟ — شريط النشاط", step: "④ الاستخدام الأول",
    lead: "حرّك المدة وحدد هل النشاط ما زال مستمرًا — وشاهد الجملة تتكوّن.",
    tip: "النشاط يبدأ في الماضي وينتهي عند NOW.", source: ["s4"] },

  { id: "s5", section: "TIME", mascot: "⭐", title: "for مع المدة", step: "⑤ for",
    lead: "for تقيس مدة… اختر المدة الصحيحة لكل جملة.",
    tip: "for = كم من الوقت؟ (مدة يمكن قياسها).", source: ["s5"] },
  { id: "s6", section: "TIME", mascot: "⭐", title: "since مع نقطة البداية", step: "⑥ since",
    lead: "since تحدد لحظة البداية… اختر البداية الصحيحة.",
    tip: "since = منذ متى بدأ الأمر؟", source: ["s6"] },
  { id: "s7", section: "TIME", mascot: "🧠", title: "for أم since؟", step: "⑦ القرار",
    lead: "فرز سريع: مدة (for) أم نقطة بداية (since)؟",
    tip: "اسأل: هل هذه مسافة أم علامة على الطريق؟", source: ["s7"] },
  { id: "s8", section: "TIME", mascot: "🔥", title: "السؤال الأقوى: How long؟", step: "⑧ How long",
    lead: "ابنِ السؤال أولًا، ثم اختر جوابًا بـ for أو since.",
    tip: "How long → for أو since في الجواب.", source: ["s8"] },

  { id: "s9", section: "QFORM", mascot: "⭐", title: "النفي", step: "⑨ النفي",
    lead: "ضع not في موضعها بين have/has و been.",
    tip: "have not → haven't · has not → hasn't.", source: ["s9"] },
  { id: "s10", section: "QFORM", mascot: "⭐", title: "الأسئلة", step: "⑩ الأسئلة",
    lead: "ابدأ بـ Have / Has ثم الفاعل ثم been ثم verb-ing.",
    tip: "حرّك have/has إلى مقدمة الجملة.", source: ["s10"] },
  { id: "s11", section: "QFORM", mascot: "⭐", title: "الإجابات القصيرة", step: "⑪ الجواب",
    lead: "الجواب القصير يستخدم have/has — لا been.",
    tip: "اختبر كل جواب: هل نعيد have أم has فقط؟", source: ["s11"] },
  { id: "s12", section: "QFORM", mascot: "🧩", title: "Wh Questions", step: "⑫ أسئلة بأداة",
    lead: "من الجواب إلى السؤال: ما أداة السؤال المناسبة؟",
    tip: "انظر إلى الجواب أولًا، ثم اسأل عنه.", source: ["s12"] },

  { id: "s13", section: "CONTRAST", mascot: "🔥", title: "نشاط انتهى للتو… والأثر باقٍ", step: "⑬ الأثر",
    lead: "ابحث عن الأدلة المرئية الآن، ثم اختر الجملة التي تفسّرها.",
    tip: "الدليل الآن ← جملة PPC تفسّره.", source: ["s13"] },
  { id: "s14", section: "CONTRAST", mascot: "🧠", title: "Present Perfect أم PPC؟ — النتيجة والنشاط", step: "⑭ المقارنة الكبرى",
    lead: "بدّل بين عدستي النتيجة والنشاط على الجدار نفسه.",
    tip: "النتيجة: الجدار مطلي · النشاط: الفرشاة لا تزال تتحرك.", source: ["s14"] },
  { id: "s15", section: "CONTRAST", mascot: "🎯", title: "النتيجة أم النشاط؟", step: "⑮ القرار",
    lead: "اسأل نفسك قبل أن تختار الباب.",
    tip: "هل أهتم بما أُنجز؟ ← PP · هل أهتم بالنشاط أو المدة؟ ← PPC.", source: ["s15"] },
  { id: "s16", section: "CONTRAST", mascot: "🔥", title: "مثال IQ200 — شخصان", step: "⑯ زاويتان",
    lead: "شخصان يتحدثان عن الكتابة… ما زاوية كل واحد؟",
    tip: "الزاوية تغيّر الزمن — حتى لو كانت الكلمات متقاربة.", source: ["s16"] },
  { id: "s17", section: "CONTRAST", mascot: "⭐", title: "مثال آخر — لوحات وبعد الظهر", step: "⑰ العدد أم المدة",
    lead: "ثلاث لوحات… أم طوال بعد الظهر؟",
    tip: "العدد المكتمل ← PP · المدة الممتدة ← PPC.", source: ["s17"] },
  { id: "s18", section: "CONTRAST", mascot: "🧠", title: "هل يعني دائمًا أنه ما زال مستمرًا؟", step: "⑱ الدقة",
    lead: "حرّك الحالة: هل يركض الآن؟ أم توقف قبل دقيقة؟",
    tip: "الجملة لم تتغيّر… الذي تغيّر هو الواقع.", source: ["s18"] },

  { id: "s19", section: "WORDS", mascot: "⭐", title: "كلمات شائعة مع PPC", step: "⑲ الكلمات",
    lead: "المس كل كلمة لتفتح مثالها.",
    tip: "تسع كلمات من المصدر + مثال تدريبي واحد للمنصة لكل كلمة لا مثال لها في المصدر.", source: ["s19"] },
  { id: "s20", section: "WORDS", mascot: "⚠️", title: "لا تعتمد على كلمة واحدة", step: "⑳ الكلمة والسياق",
    lead: "الكلمة وحدها لا تحدد الزمن — المعنى يحدده.",
    tip: "قارن today مع all morning ثم اختر التركيز.", source: ["s20"] },
  { id: "s21", section: "WORDS", mascot: "🔥", title: "PP أم PPC؟ — ثلاثة أزواج", step: "㉑ الأزواج",
    lead: "في كل زوج: أيّ جملة تركّز على ما يُرى من النتيجة؟",
    tip: "الزوج نفسه، والتركيز مختلف.", source: ["s21"] },
  { id: "s22", section: "WORDS", mascot: "🧠", title: "هل نستخدم PPC مع عدد؟", step: "㉒ العدد",
    lead: "عدّ الأشياء المكتملة… أم قِس المدة؟",
    tip: "عدد مكتمل ← PP · نشاط طويل ← PPC.", source: ["s22"] },
  { id: "s23", section: "WORDS", mascot: "⭐", title: "أفعال لا نستخدمها عادةً في Continuous", step: "㉓ البوابة",
    lead: "مرّر الفعل من بوابة -ing… هل يُعبر؟",
    tip: "الأفعال الحالية (know، want…) تُستعمل عادةً بدون continuous.", source: ["s23"] },

  { id: "s24", section: "COMPARE", mascot: "🔥", title: "مقارنة مع Past Continuous", step: "㉔ نقطة المرجع",
    lead: "حرّك نقطة المرجع من 8:00 إلى NOW وشاهد الزمن يتغيّر.",
    tip: "نقطة المرجع في الماضي ← Past Continuous · عند NOW ← PPC.", source: ["s24"] },
  { id: "s25", section: "COMPARE", mascot: "🔥", title: "مقارنة مع Past Perfect Continuous", step: "㉕ نقطة المرجع",
    lead: "نقطة المرجع الآن: حدث ماضٍ آخر (اتصل صديقي).",
    tip: "قبل حدث ماضٍ آخر ← PPC الماضي التام · قبل الآن ← PPC.", source: ["s25"] },
  { id: "s26", section: "COMPARE", mascot: "🧠", title: "الخريطة الزمنية الكبرى", step: "㉖ الخريطة",
    lead: "ثلاث نقاط مرجعية… وثلاث جمل. ضع كل جملة في مكانها.",
    tip: "لاحظ كيف تغيّرت نقطة المرجع.", source: ["s26"] },

  { id: "s27", section: "FIX", mascot: "🕵️", title: "Grammar Detective", step: "㉗ المحقق",
    lead: "المس الجزء الخاطئ ثم اختر الإصلاح. ثمانية ملفات.",
    tip: "ابدأ بالسؤال: ما الذي بعد been؟", source: ["s27"] },
  { id: "s28", section: "FIX", mascot: "🚀", title: "تحدي الاختيار", step: "㉘ الاختيار",
    lead: "اكتب الصيغة المناسبة لكل جملة حسب الدليل بين القوسين.",
    tip: "العدد أو الإنجاز ← PP · النشاط والمدة ← PPC.", source: ["s28"] },
  { id: "s29", section: "FIX", mascot: "🔥", title: "IQ200 — نفس الفعل، معنى مختلف", step: "㉙ IQ200",
    lead: "نفس الفعل «إصلاح». هل الدراجة انتهت في الجملتين؟",
    tip: "السؤال ليس «أي زمن أصعب؟» بل «ما الذي أريد أن أُبرزه؟».", source: ["s29"] },
  { id: "s30", section: "FIX", mascot: "🧠", title: "تحدي المعنى", step: "㉚ المشهد",
    lead: "انظر إلى المشهد: هل ترى أثر النشاط أم النتيجة؟",
    tip: "أثر النشاط (فرشاة، بقع) ← PPC · الجدار المكتمل ← PP.", source: ["s30"] },
  { id: "s31", section: "FIX", mascot: "⭐", title: "since و for — مستوى أعلى", step: "㉛ مستوى أعلى",
    lead: "صحّح الجملة الخاطئة، ثم اختر for أو since في جمل أخرى.",
    tip: "three hours = مدة · 5:00 = نقطة بداية.", source: ["s31"] },

  { id: "s32", section: "BOSS", mascot: "🏆", title: "Boss Challenge — اختر الزمن الصحيح", step: "㉜ الزعيم",
    lead: "كل ضربة صحيحة تُنقص صحة الزعيم. اختر أحد الأزمنة الأربعة.",
    tip: "أربعة أزمنة للحاضر، وكل جملة لها دليل واحد أو أكثر.", source: ["s32"] },
  { id: "s33", section: "BOSS", mascot: "🔥", title: "Final IQ200 Challenge", step: "㉝ تحليل الفقرة",
    lead: "المس كل عبارة فعلية في الفقرة وقرّر زمنها.",
    tip: "انتبه إلى الكلمة الدالة على المدة أو النتيجة.", source: ["s33"] },
  { id: "s34", section: "BOSS", mascot: "🏆", title: "Final Boss — قصة Maya", step: "㉞ النهائي",
    lead: "أكملي قصة Maya بالصيغة الصحيحة. اكتب الإجابة ثم تحقّق.",
    tip: "انتبهي: نشاط ممتد؟ عدد مكتمل؟ نتيجة؟", source: ["s34"] },

  { id: "s35", section: "END", mascot: "🧠", title: "قاعدة الذهب", step: "㉟ القاعدة",
    lead: "اقرأ الشكل أولًا: have/has + V3… أم have/has + been + V-ing؟",
    tip: "الشكل يخبرك بالنمط، والمعنى يخبرك بالسبب.", source: ["s35"] },
  { id: "s36", section: "END", mascot: "🗺️", title: "الخريطة التي أصبحت عندك", step: "㊱ الخريطة",
    lead: "أربعة تروس للحاضر — اضغط كل ترس لتفعيله.",
    tip: "كل ترس له جملة من المصدر.", source: ["s36"] },
  { id: "summary", section: "END", mascot: "⭐", title: "ملخص الدرس 32", step: "الملخص",
    lead: "الصيغة، الاستخدامات، الكلمات، والفرق الذهبي.",
    tip: "Present Perfect → النتيجة · Present Perfect Continuous → النشاط.", source: ["summary"] },
  { id: "closing", section: "END", mascot: "🏁", title: "الخطوة التالية", step: "الخاتمة",
    lead: "الخطوة التالية في المنهج كما وردت في المصدر.",
    tip: "ابدأ الاختبار الآن لتثبت ما تعلّمته.", source: ["closing"] },
];

export const SLIDE_COUNT_32 = SLIDES.length;

// ============================================================
// قائمة الأهداف (من المصدر — مختصرة لعرض قائمة التدقيق)
// ============================================================
export const OBJECTIVES_32: { n: string; text: string; tail?: string }[] = [
  { n: "①", text: "فهم معنى Present Perfect Continuous." },
  { n: "②", text: "تكوين الجملة باستخدام: have/has + been + verb-ing" },
  { n: "③", text: "استخدام for و since بشكل صحيح." },
  { n: "④", text: "التمييز بين: Present Perfect / Present Perfect Continuous" },
  { n: "⑤", text: "فهم متى نهتم بالنتيجة ومتى نهتم بالنشاط والمدة." },
  { n: "⑥", text: "استخدام الزمن في الأسئلة والنفي." },
  { n: "⑦", text: "فهم كلمات مثل: for, since, all day, recently, lately, how long" },
  { n: "⑧", text: "التمييز بين: Present Perfect Continuous / Past Continuous / Past Perfect Continuous" },
  { n: "⑨", text: "حل أسئلة IQ200 تجمع عدة أزمنة." },
];

// ============================================================
// محتوى التفاعلات — مأخوذ من المصدر ما لم يُوسم «تدريبي للمنصة»
// ============================================================

export type Tok32 = { text: string; role: string };
export type BlockRound32 = { tokens: Tok32[]; ar: string };

/** خطوة ① — بناء الجملة من القطع (الفاعل ← have/has ← been ← V-ing) */
export const BLOCKS_S1: BlockRound32[] = [
  {
    ar: "لقد كنت أدرس / أدرس منذ فترة.",
    tokens: [
      { text: "I", role: "s" },
      { text: "have", role: "h" },
      { text: "been", role: "b" },
      { text: "studying.", role: "v" },
    ],
  },
  {
    ar: "هي تقرأ منذ فترة.",
    tokens: [
      { text: "She", role: "s" },
      { text: "has", role: "h" },
      { text: "been", role: "b" },
      { text: "reading.", role: "v" },
    ],
  },
];

/** خطوة ② — أجزاء الجملة (مع شرح المصدر لكل جزء) */
export const FLIP_S2: { text: string; role: string; back: string }[] = [
  { text: "have / has", role: "h", back: "يربط الحدث بالحاضر." },
  { text: "been", role: "b", back: "شكل V3 من be." },
  { text: "verb-ing", role: "v", back: "يعطي معنى الاستمرار." },
  { text: "She (الفاعل)", role: "s", back: "الفاعل في She has been reading. — و has لأن She." },
];

/** خطوة ③ — الفاعل ← have / has */
export const SUBJECTS_S3 = [
  { en: "I", bucket: 0 },
  { en: "You", bucket: 0 },
  { en: "We", bucket: 0 },
  { en: "They", bucket: 0 },
  { en: "He", bucket: 1 },
  { en: "She", bucket: 1 },
  { en: "It", bucket: 1 },
];

/** خطوة ④ — شريط النشاط: الأنشطة المتاحة (الجملة تبنى من المدة وحالة الاستمرار) */
export const RIBBON_S4 = {
  activities: [
    { key: "studying", en: "studying", ar: "أدرس" },
    { key: "working", en: "working", ar: "أعمل" },
    { key: "waiting", en: "waiting", ar: "أنتظر" },
  ],
  maxHours: 6,
};

/** خطوة ⑤ — for: قالب مع اختيارات */
export const FOR_ROUNDS_S5 = [
  {
    stem: ["I have been working", "___", "."],
    options: [
      { text: "for two hours", ok: true, why: "two hours = مدة يمكن قياسها على الشريط." },
      { text: "since two hours", ok: false, why: "since تحتاج نقطة بداية (وقت أو تاريخ)، أما two hours فمدة." },
      { text: "two hours", ok: false, why: "المدة وحدها لا تكفي: لا بد من for قبلها." },
    ],
  },
  {
    stem: ["They have been playing", "___", "."],
    options: [
      { text: "for forty minutes", ok: true, why: "forty minutes = مدة." },
      { text: "since forty minutes", ok: false, why: "since لا تأخذ مدة زمنية مثل forty minutes." },
      { text: "forty minutes ago", ok: false, why: "ago مع الماضي البسيط، لا مع Present Perfect Continuous." },
    ],
  },
  {
    stem: ["We have been waiting", "___", "."],
    options: [
      { text: "for a long time", ok: true, why: "a long time = مدة غير محددة، وهي من أمثلة المصدر." },
      { text: "since a long time", ok: false, why: "since + مدة خطأ؛ since تحتاج لحظة بداية." },
      { text: "a long time ago", ok: false, why: "ago تعني قبل كذا، وهي لا تُستعمل هنا مع المدة الممتدة." },
    ],
  },
];

/** خطوة ⑥ — since: نقطة البداية */
export const SINCE_ROUNDS_S6 = [
  {
    stem: ["They have been living here", "___", "."],
    options: [
      { text: "since 2022", ok: true, why: "2022 = نقطة بداية (عام محدد)." },
      { text: "for 2022", ok: false, why: "2022 ليست مدة؛ هي لحظة بداية، لذلك since." },
      { text: "in 2022", ok: false, why: "in لا تعطي نقطة البداية للنشاط الممتد." },
    ],
  },
  {
    stem: ["She has been working", "___", "."],
    options: [
      { text: "since Monday", ok: true, why: "Monday = يوم بداية (نقطة)." },
      { text: "for Monday", ok: false, why: "Monday ليست مدة؛ استعمل since مع نقطة البداية." },
      { text: "on Monday", ok: false, why: "on Monday تعني يومًا محددًا، لا بداية نشاط ممتد." },
    ],
  },
  {
    stem: ["It has been raining", "___", "."],
    options: [
      { text: "since early morning", ok: true, why: "early morning = نقطة بداية في الصباح، وهي من المصدر." },
      { text: "for early morning", ok: false, why: "early morning هنا نقطة بداية، لا مدة." },
      { text: "early morning", ok: false, why: "بدون since لا تكتمل جملة البداية." },
    ],
  },
];

/** خطوة ⑦ — for أم since */
export const FORSINCE_S7: { en: string; bucket: number; why: string }[] = [
  { en: "for three hours", bucket: 0, why: "three hours = مدة (كم استمر؟)." },
  { en: "since Monday", bucket: 1, why: "Monday = نقطة بداية (منذ متى؟)." },
  { en: "for two weeks", bucket: 0, why: "two weeks = مدة." },
  { en: "since 2020", bucket: 1, why: "2020 = نقطة بداية." },
  { en: "for ten years", bucket: 0, why: "ten years = مدة." },
  { en: "since 9:00", bucket: 1, why: "9:00 = لحظة بداية." },
  { en: "since this morning", bucket: 1, why: "this morning = بداية اليوم (نقطة)." },
  { en: "for a long time", bucket: 0, why: "a long time = مدة غير محددة." },
];

/** خطوة ⑧ — How long: السؤال يُبنى أولًا ثم يُجاب بـ for أو since */
export const HOWLONG_S8 = {
  question: { tokens: [
    { text: "How long", role: "wh" },
    { text: "have", role: "h" },
    { text: "you", role: "s" },
    { text: "been", role: "b" },
    { text: "studying?", role: "v" },
  ] as Tok32[], ar: "منذ متى وأنت تدرس؟" },
  replies: [
    { stem: "How long have you been studying?", options: [
      { text: "for two hours", ok: true, why: "for + مدة → جواب يقيس المدة." },
      { text: "two hours", ok: false, why: "بدون for لا تكتمل المدة." },
    ] },
    { stem: "How long have you been studying?", options: [
      { text: "since 6:00", ok: true, why: "since + نقطة بداية → جواب يحدد لحظة البداية." },
      { text: "for 6:00", ok: false, why: "6:00 لحظة وليست مدة." },
    ] },
  ],
};

/** خطوة ⑨ — النفي: الفاعل + have/has + not + been + V-ing */
export const NEG_ROUND_S9: BlockRound32 = {
  ar: "لم تكن تدرس مؤخرًا.",
  tokens: [
    { text: "She", role: "s" },
    { text: "has", role: "h" },
    { text: "not", role: "n" },
    { text: "been", role: "b" },
    { text: "studying", role: "v" },
    { text: "lately.", role: "t" },
  ],
};

/** خطوة ⑩ — الأسئلة: have/has ← الفاعل ← been ← V-ing */
export const QUESTION_ROUNDS_S10: BlockRound32[] = [
  {
    ar: "هل كنت تدرس؟",
    tokens: [
      { text: "Have", role: "h" },
      { text: "you", role: "s" },
      { text: "been", role: "b" },
      { text: "studying?", role: "v" },
    ],
  },
  {
    ar: "هل كانت تعمل؟",
    tokens: [
      { text: "Has", role: "h" },
      { text: "she", role: "s" },
      { text: "been", role: "b" },
      { text: "working?", role: "v" },
    ],
  },
];

/** خطوة ⑪ — الإجابات القصيرة (الصحيح مع الفخ الوارد في المصدر) */
export const SHORT_ROWS_S11 = [
  { stem: "Have you been studying?", opts: ["Yes, I have.", "Yes, I have been."], answer: 0,
    why: "الجواب القصير يستخدم have/has؛ أما Yes, I have been ❌ فخطأ مذكور في المصدر." },
  { stem: "Has she been working?", opts: ["Yes, she has been.", "Yes, she has."], answer: 1,
    why: "الصحيح: Yes, she has. — لا نُعيد been في الجواب القصير." },
  { stem: "Have they been waiting?", opts: ["No, they haven't been.", "No, they haven't."], answer: 1,
    why: "الصحيح: No, they haven't. — نُبقي have/has مع النفي المختصر." },
];

/** خطوة ⑫ — Wh questions: من الجواب إلى أداة السؤال */
export const WH_ROWS_S12 = [
  { stem: "I have been waiting for two hours.", opts: ["What", "Where", "Why", "How long", "Who"], answer: 3,
    why: "How long = منذ متى/كم من الوقت؟ — والجواب مدة (for two hours)." },
  { stem: "I have been doing my homework.", opts: ["What", "Where", "Why", "How long", "Who"], answer: 0,
    why: "What = ماذا؟ — الجواب عن النشاط نفسه." },
  { stem: "They have been staying at a hotel.", opts: ["What", "Where", "Why", "How long", "Who"], answer: 1,
    why: "Where = أين؟ — الجواب عن المكان." },
  { stem: "She has been crying because of the news.", opts: ["What", "Where", "Why", "How long", "Who"], answer: 2,
    why: "Why = لماذا؟ — الجواب عن السبب." },
  { stem: "Ahmed has been using my computer.", opts: ["What", "Where", "Why", "How long", "Who"], answer: 4,
    why: "Who = من؟ — تدريب للمنصة: Who هنا هي الفاعل، لذلك لا يأتي have/has قبلها (Who has been using my computer? كما في المصدر)." },
];

/** خطوة ⑬ — أدلة مرئية الآن ← الجملة التي تفسّرها */
export const EVIDENCE_S13 = [
  {
    scene: "🏃", title: "أنت تلهث الآن.",
    clues: ["😮‍💨 تلهث", "💦 عرق على الجبين"],
    options: [
      { text: "You have been running.", ok: true, why: "الدليل (اللهاث) نتيجة نشاط الركض الذي توقف قبل قليل." },
      { text: "You have been sleeping.", ok: false, why: "النوم لا يفسر اللهاث والعرق." },
      { text: "You have been eating.", ok: false, why: "الأكل لا يترك لهاثًا وعرقًا." },
    ],
  },
  {
    scene: "🌱", title: "يداها متسختان.",
    clues: ["🟫 يدان متسختان", "🌿 تراب على الملابس"],
    options: [
      { text: "She has been gardening.", ok: true, why: "المصدر: لقد كانت تعمل في الحديقة — الدليل التراب." },
      { text: "She has been swimming.", ok: false, why: "السباحة لا تترك تربة على اليدين." },
      { text: "She has been reading.", ok: false, why: "القراءة لا تترك أثر تراب." },
    ],
  },
  {
    scene: "🌧️", title: "الأرض مبللة.",
    clues: ["💧 الأرض مبللة", "☂️ مظلات مفتوحة"],
    options: [
      { text: "It has been raining.", ok: true, why: "المصدر: لقد كانت السماء تمطر — المطر يفسر الأرض المبللة." },
      { text: "It has been sunny.", ok: false, why: "الشمس وحدها لا تُبلل الأرض." },
      { text: "She has been reading.", ok: false, why: "القراءة لا تُبلل الأرض." },
    ],
  },
];

/** خطوة ⑭ — عدستا النتيجة والنشاط (نفس الجدار) */
export const CANVAS_S14 = {
  result: { en: "I have painted the room.", ar: "الغرفة مطلية / المهمة أُنجزت." },
  activity: { en: "I have been painting the room.", ar: "كنت أقوم بالطلاء لفترة." },
};

/** خطوة ⑮ — بابان: النتيجة ← PP · النشاط/المدة ← PPC */
export const DOORS_S15: { text: string; bucket: number; why: string }[] = [
  { text: "I have fixed the chair.", bucket: 0, why: "الكرسي أصبح مُصلحًا = نتيجة مكتملة." },
  { text: "I have been fixing the chair since noon.", bucket: 1, why: "since noon = نقطة بداية + نشاط ممتد." },
  { text: "She has written the letter.", bucket: 0, why: "الرسالة كُتبت = إنجاز." },
  { text: "She has been writing letters all day.", bucket: 1, why: "all day = نشاط طوال اليوم." },
  { text: "We have finished the project.", bucket: 0, why: "المشروع انتهى = نتيجة." },
  { text: "We have been working on the project for weeks.", bucket: 1, why: "for weeks = مدة ممتدة." },
];

/** خطوة ⑯ — شخصان: أيّ زاوية؟ */
export const SPEAKERS_S16 = [
  { stem: "A: I have written five pages.", opts: ["التركيز على النتيجة والكمية", "التركيز على النشاط والمدة"], answer: 0,
    why: "المصدر: التركيز على النتيجة / الكمية — كتبت خمس صفحات." },
  { stem: "B: I have been writing for three hours.", opts: ["التركيز على النتيجة والكمية", "التركيز على النشاط والمدة"], answer: 1,
    why: "المصدر: التركيز على النشاط والمدة — كنت أكتب لمدة ثلاث ساعات." },
];

/** خطوة ⑰ — مثال آخر */
export const ANOTHER_S17 = [
  { stem: "She has painted three pictures.", opts: ["النتيجة والعدد", "النشاط والمدة"], answer: 0,
    why: "المصدر: النتيجة والعدد — ثلاث لوحات." },
  { stem: "She has been painting all afternoon.", opts: ["النتيجة والعدد", "النشاط والمدة"], answer: 1,
    why: "المصدر: النشاط والمدة — طوال فترة بعد الظهر." },
];

/** خطوة ⑱ — الجملة نفسها، والواقع يختلف */
export const STILL_S18 = {
  en: "He has been running.",
  states: [
    { key: "still", label: "ما زال يركض", ar: "قد يكون ما زال يركض.", breath: true },
    { key: "stopped", label: "توقف قبل دقيقة", ar: "توقف منذ دقيقة، لكنه ما زال يلهث.", breath: true },
  ],
};

/** خطوة ⑲ — الكلمات الشائعة (مع أمثلة المصدر، والتدريبية موسومة) */
export const KEYWORDS_S19: { en: string; ar: string; ex: string; exAr: string; src: boolean }[] = [
  { en: "for", ar: "مدة", ex: "I have been working for two hours.", exAr: "لقد كنت أعمل لمدة ساعتين.", src: false },
  { en: "since", ar: "نقطة بداية", ex: "I have been studying since 7:00.", exAr: "أدرس منذ الساعة السابعة.", src: false },
  { en: "all day", ar: "طوال اليوم", ex: "She has been working all day.", exAr: "", src: true },
  { en: "all morning", ar: "طوال الصباح", ex: "I have been studying all morning.", exAr: "", src: true },
  { en: "all afternoon", ar: "طوال فترة بعد الظهر", ex: "She has been painting all afternoon.", exAr: "كانت ترسم طوال فترة بعد الظهر.", src: true },
  { en: "all evening", ar: "طوال المساء", ex: "I have been reading all evening.", exAr: "مثال تدريبي للمنصة — ليس من المصدر.", src: false },
  { en: "recently", ar: "مؤخرًا", ex: "He has been exercising recently.", exAr: "", src: true },
  { en: "lately", ar: "مؤخرًا (في الفترة الأخيرة)", ex: "They have been practicing lately.", exAr: "", src: true },
  { en: "how long", ar: "منذ متى؟ / كم من الوقت؟", ex: "How long have you been waiting?", exAr: "منذ متى وأنت تنتظر؟", src: true },
  { en: "these days", ar: "هذه الأيام", ex: "I have been sleeping badly these days.", exAr: "مثال تدريبي للمنصة — ليس من المصدر.", src: false },
];

/** خطوة ⑳ — الكلمة وحدها لا تكفي */
export const CUE_S20 = [
  { en: "I have studied three chapters today.", ar: "لقد درست ثلاثة فصول.", tense: "PP", word: "today" },
  { en: "I have been studying all morning.", ar: "كنت أقوم بالدراسة طوال الصباح.", tense: "PPC", word: "all morning" },
  { en: "He has been exercising recently.", ar: "هو يمارس الرياضة مؤخرًا.", tense: "PPC", word: "recently" },
];

/** خطوة ㉑ — أزواج: أيّ جملة تقصد هذا التركيز؟ */
export const PAIRS_S21 = [
  { stem: "التركيز: الكتاب انتهى (الإنجاز).", opts: ["I have read the book.", "I have been reading the book."], answer: 0,
    why: "المصدر: I have read the book = لقد قرأت الكتاب — التركيز على الإنجاز." },
  { stem: "التركيز: النشاط نفسه والجدار يُدهن.", opts: ["She has painted the wall.", "She has been painting the wall."], answer: 1,
    why: "المصدر: She has been painting the wall = لقد كانت تدهن الجدار — النشاط مهم." },
  { stem: "التركيز: الآلة تعمل الآن (النتيجة).", opts: ["They have repaired the machine.", "They have been repairing the machine."], answer: 0,
    why: "المصدر: They have repaired the machine — النتيجة: الآلة تعمل." },
];

/** خطوة ㉒ — عدد مكتمل أم نشاط ومدة؟ */
export const COUNT_ROWS_S22 = [
  { stem: "I have written five emails.", opts: ["عدد مكتمل — Present Perfect", "نشاط ومدة — Present Perfect Continuous"], answer: 0,
    why: "المصدر: نهتم بالعدد five emails → Present Perfect." },
  { stem: "I have been writing emails all morning.", opts: ["عدد مكتمل — Present Perfect", "نشاط ومدة — Present Perfect Continuous"], answer: 1,
    why: "المصدر: نهتم بالنشاط والمدة → Present Perfect Continuous." },
  { stem: "She has made five cakes this week.", opts: ["عدد مكتمل — Present Perfect", "نشاط ومدة — Present Perfect Continuous"], answer: 0,
    why: "تدريب للمنصة: five cakes عدد مكتمل، لذلك Present Perfect (انظر تحدي المصدر ㉘)." },
];

/** خطوة ㉓ — بوابة الأفعال الحالية (المصدر: know، believe، understand…) */
export const STATIVE_S23: { verb: string; ing: string; v3: string }[] = [
  { verb: "know", ing: "knowing", v3: "known" },
  { verb: "believe", ing: "believing", v3: "believed" },
  { verb: "understand", ing: "understanding", v3: "understood" },
  { verb: "want", ing: "wanting", v3: "wanted" },
  { verb: "need", ing: "needing", v3: "needed" },
  { verb: "remember", ing: "remembering", v3: "remembered" },
  { verb: "like", ing: "liking", v3: "liked" },
  { verb: "love", ing: "loving", v3: "loved" },
  { verb: "hate", ing: "hating", v3: "hated" },
];

/** خطوات ㉔ ㉕ ㉖ — نقاط المرجع على شريط الزمن */
export type RailSnap32 = { key: string; at: number; label: string; tense: string; en: string; ar: string };
export const RAIL_S24: RailSnap32[] = [
  { key: "past", at: 0.25, label: "8:00", tense: "Past Continuous", en: "I was studying at 8:00.", ar: "كنت أدرس الساعة الثامنة." },
  { key: "now", at: 1, label: "NOW", tense: "Present Perfect Continuous", en: "I have been studying since 8:00.", ar: "أنا أدرس منذ الساعة الثامنة." },
];
export const RAIL_S25: RailSnap32[] = [
  { key: "friend", at: 0.45, label: "حدث ماضٍ آخر: اتصل صديقي", tense: "Past Perfect Continuous", en: "I had been studying for three hours when my friend called.", ar: "كنت أدرس منذ ثلاث ساعات عندما اتصل صديقي." },
  { key: "now", at: 1, label: "NOW", tense: "Present Perfect Continuous", en: "I have been studying for three hours.", ar: "أدرس منذ ثلاث ساعات." },
];
export const RAIL_S26: RailSnap32[] = [
  { key: "past", at: 0.2, label: "8:00", tense: "Past Continuous", en: "I was studying at 8:00.", ar: "كنت أدرس عند الساعة 8." },
  { key: "friend", at: 0.55, label: "حدث ماضٍ آخر (وصل)", tense: "Past Perfect Continuous", en: "I had been studying for three hours when he arrived.", ar: "كنت قد درست لمدة ثلاث ساعات عندما وصل." },
  { key: "now", at: 1, label: "NOW", tense: "Present Perfect Continuous", en: "I have been studying for three hours.", ar: "أدرس منذ ثلاث ساعات حتى الآن / كنت أدرس منذ ثلاث ساعات." },
];

/** خطوة ㉗ — المحقق: مقاطع، والمجموعة المعطوبة، والإصلاح الصحيح من بين الخيارات */
export type Detective32 = { segments: string[]; bad: number[]; fixOpts: string[]; fix: string; why: string; n: number };
export const DETECTIVE_S27: Detective32[] = [
  { n: 1, segments: ["She", "has", "been", "study", "for", "two", "hours."], bad: [3], fixOpts: ["studying", "studied", "to study"], fix: "studying",
    why: "بعد been نستخدم verb-ing: studying (المصدر ①)." },
  { n: 2, segments: ["I", "have", "been", "working", "since", "three", "hours."], bad: [4], fixOpts: ["for", "since", "during"], fix: "for",
    why: "three hours = مدة، لذلك for (المصدر ②)." },
  { n: 3, segments: ["He", "has", "been", "knowing", "her", "for", "years."], bad: [2, 3], fixOpts: ["known", "knowing", "been known"], fix: "known",
    why: "know فعل حالة لا يأخذ continuous عادةً: has known (المصدر ③)." },
  { n: 4, segments: ["Have", "you", "been", "wait", "long?"], bad: [3], fixOpts: ["waiting", "waited", "wait"], fix: "waiting",
    why: "بعد been نستخدم verb-ing: waiting (المصدر ④)." },
  { n: 5, segments: ["They", "has", "been", "playing", "all", "afternoon."], bad: [1], fixOpts: ["have", "has", "having"], fix: "have",
    why: "They تأخذ have، لا has (المصدر ⑤)." },
  { n: 6, segments: ["She", "hasn't", "been", "sleep", "well."], bad: [3], fixOpts: ["sleeping", "slept", "sleep"], fix: "sleeping",
    why: "بعد been نستخدم verb-ing: sleeping (المصدر ⑥)." },
  { n: 7, segments: ["How", "long", "has", "he", "been", "work", "here?"], bad: [5], fixOpts: ["working", "worked", "work"], fix: "working",
    why: "بعد been نستخدم verb-ing: working (المصدر ⑦)." },
  { n: 8, segments: ["I", "have", "been", "written", "five", "emails."], bad: [2, 3], fixOpts: ["written", "been writing", "wrote"], fix: "written",
    why: "المصدر ⑧: نركز على عدد مكتمل (five emails) ← have written، وليس have been written." },
];

/** خطوة ㉘ — تحدي الاختيار: الكتابة الصحيحة للصيغة */
export const TYPED_S28 = [
  { prompt: "I ______ three chapters today.", hint: "(read)", accept: ["have read"], why: "three chapters today = إنجاز واضح ← Present Perfect: have read." },
  { prompt: "I ______ all morning.", hint: "(read)", accept: ["have been reading"], why: "all morning = نشاط ومدة ← Present Perfect Continuous." },
  { prompt: "She ______ five cakes this week.", hint: "(make)", accept: ["has made"], why: "five cakes = عدد مكتمل ← Present Perfect." },
  { prompt: "She ______ cakes since 9:00.", hint: "(make)", accept: ["has been making"], why: "since 9:00 = بداية نشاط ممتد ← Present Perfect Continuous." },
  { prompt: "They ______ the house.", hint: "(clean)", accept: ["have cleaned"], why: "الإنجاز الواضح (البيت نظيف) ← Present Perfect." },
  { prompt: "They ______ the house for two hours.", hint: "(clean)", accept: ["have been cleaning"], why: "for two hours = مدة ← Present Perfect Continuous." },
];

/** خطوة ㉙ — IQ200: هل انتهى الأمر؟ */
export const BIKE_S29 = [
  { stem: "I have repaired my bicycle.", opts: ["✓ انتهى — الدراجة مُصلحة", "؟ غير مؤكد — ربما لم أنتهِ"], answer: 0,
    why: "المصدر: الدراجة أصبحت مُصلحة — النتيجة هي التركيز." },
  { stem: "I have been repairing my bicycle.", opts: ["✓ انتهى — الدراجة مُصلحة", "؟ غير مؤكد — ربما لم أنتهِ"], answer: 1,
    why: "المصدر: قد أكون انتهيت، وقد لا أكون انتهيت — التركيز على النشاط." },
];

/** خطوة ㉚ — مشهد المعنى (حالتان) */
export const SCENE_S30 = [
  { scene: "🖌️", title: "رجل يحمل فرشاة طلاء، وعلى ملابسه آثار طلاء.", clues: ["🖌️ فرشاة في اليد", "🎨 بقع طلاء على الملابس"],
    options: [
      { text: "You have been painting.", ok: true, why: "المصدر: لأننا نرى آثار النشاط." },
      { text: "You have painted the wall.", ok: false, why: "الجدار لم يُذكر في هذا المشهد؛ الدليل هو النشاط نفسه." },
    ] },
  { scene: "🧱", title: "تنظر إلى الجدار وقد أصبح مطليًا بالكامل.", clues: ["🧱 جدار مطلي بالكامل", "✅ الجدار أصبح جاهزًا"],
    options: [
      { text: "You have painted the wall.", ok: true, why: "المصدر: التركيز هنا على النتيجة — الجدار أصبح مطليًا." },
      { text: "You have been painting.", ok: false, why: "هنا النتيجة هي المهمة، لا آثار النشاط." },
    ] },
];

/** خطوة ㉛ — صحّح: since مع المدة، ثم for/since في جمل */
export const FIX_S31 = {
  segments: ["I", "have", "been", "studying", "since", "three", "hours."],
  bad: [4],
  fixOpts: ["for", "since", "from"],
  fix: "for",
  why: "three hours = مدة، لذلك for. أما since 5:00 فنقطة بداية (المصدر).",
};
export const FORSINCE_ROWS_S31 = [
  { stem: "I have been studying ___ 5:00.", opts: ["since", "for"], answer: 0,
    why: "5:00 = نقطة بداية ← since (المصدر: I have been studying since 5:00)." },
  { stem: "I have been studying ___ three hours.", opts: ["since", "for"], answer: 1,
    why: "three hours = مدة ← for (المصدر: I have been studying for three hours)." },
];

/** خطوة ㉜ — الزعيم: ثمانية أهداف، أربعة أزمنة */
export const BOSS_ITEMS_S32 = [
  { en: "I usually ______ football after school.", answer: 0, verb: "play", why: "usually + عادة ← Present Simple." },
  { en: "Look! The children ______ in the garden.", answer: 1, verb: "are playing", why: "Look! = الآن ← Present Continuous." },
  { en: "I ______ three books this month.", answer: 2, verb: "have read", why: "three books = إنجاز/عدد ← Present Perfect." },
  { en: "I ______ for three hours, and I need a break.", answer: 3, verb: "have been studying", why: "for three hours = مدة نشاط ← Present Perfect Continuous." },
  { en: "Sara ______ English every Tuesday.", answer: 0, verb: "studies", why: "every Tuesday = روتين ← Present Simple." },
  { en: "Sara ______ English right now.", answer: 1, verb: "is studying", why: "right now = يحدث الآن ← Present Continuous." },
  { en: "Sara ______ English since September.", answer: 3, verb: "has been studying", why: "since September = بداية نشاط ممتد ← Present Perfect Continuous." },
  { en: "Sara ______ five English books this year.", answer: 2, verb: "has read", why: "five books = عدد مكتمل ← Present Perfect." },
];
export const BOSS_GEARS_S32 = ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"] as const;

/** خطوة ㉝ — تحليل الفقرة: العبارات الفعلية وأزمانها */
export const ADAM_TEXT_S33 = {
  parts: [
    { t: "Adam " },
    { t: "has studied", k: 0 },
    { t: " robotics for three years. He " },
    { t: "has built", k: 1 },
    { t: " six small robots, and he " },
    { t: "has been working", k: 2 },
    { t: " on a new one since January. This week, he " },
    { t: "has been testing", k: 3 },
    { t: " its sensors every afternoon." },
  ],
  answers: ["Present Perfect", "Present Perfect", "Present Perfect Continuous", "Present Perfect Continuous"] as const,
  why: [
    "المصدر: نهتم بالمدة والتجربة المرتبطة بالحاضر — تصنيف المصدر Present Perfect (انظر ملاحظة المعلم).",
    "المصدر: لأننا نركز على النتيجة: six robots.",
    "المصدر: لأن التركيز على النشاط الممتد since January.",
    "المصدر: لأننا نركز على النشاط المتكرر خلال هذه الفترة.",
  ],
};

/** خطوة ㉞ — قصة Maya: فراغات للكتابة */
export const MAYA_S34 = [
  { prompt: "She ______ (study) science for several months.", accept: ["has been studying"], why: "studying + مدة ← نشاط ممتد: has been studying." },
  { prompt: "She ______ (read) eight books so far.", accept: ["has read"], why: "eight books so far = عدد/إنجاز: has read." },
  { prompt: "She ______ (work) on her project since January.", accept: ["has been working"], why: "since January = بداية نشاط ممتد: has been working." },
  { prompt: "She ______ (complete) most of the experiments.", accept: ["has completed"], why: "completed experiments = نتائج مكتملة: has completed." },
  { prompt: "She is tired because she ______ (work) all day.", accept: ["has been working"], why: "all day = نشاط وسبب التعب: has been working." },
];

/** خطوة ㉟ — قاعدة الذهب: النمط ← الفرز */
export const GOLDEN_S35: { text: string; bucket: number; why: string }[] = [
  { text: "She has written three letters.", bucket: 0, why: "have/has + V3 ← النتيجة/الإنجاز." },
  { text: "They have been playing all afternoon.", bucket: 1, why: "have/has + been + V-ing ← النشاط/المدة." },
  { text: "He has repaired the bike.", bucket: 0, why: "have/has + V3 ← إنجاز (الدراجة مُصلحة)." },
  { text: "We have been waiting for a long time.", bucket: 1, why: "have/has + been + V-ing ← مدة ممتدة." },
  { text: "It has been raining since morning.", bucket: 1, why: "have/has + been + V-ing ← نشاط منذ الصباح." },
  { text: "I have learned ten words.", bucket: 0, why: "have/has + V3 ← عدد مكتمل." },
];

/** خطوة ㊱ — أربعة تروس للحاضر (من المصدر) */
export const GEARS_S36 = [
  { key: "ps", tag: "Present Simple", emoji: "📸", en: "I study English every day.", ar: "عادة / حقيقة / روتين." },
  { key: "pc", tag: "Present Continuous", emoji: "🎥", en: "I am studying English now.", ar: "يحدث الآن." },
  { key: "pp", tag: "Present Perfect", emoji: "🏆", en: "I have studied three chapters.", ar: "إنجاز / نتيجة / تجربة مرتبطة بالحاضر." },
  { key: "ppc", tag: "Present Perfect Continuous", emoji: "🎥🏆", en: "I have been studying for three hours.", ar: "نشاط بدأ في الماضي وامتد إلى الحاضر أو انتهى قريبًا وله أثر الآن." },
];

/** كلمات تمهيدية للمنصة: الشرح يُوسم دائمًا */
export const PLATFORM_NOTE_S18 = "الجملة لم تتغيّر، لكن الواقع يختلف: Present Perfect Continuous يهتم بالنشاط الذي امتد إلى قرب الحاضر وبآثاره، وليس شرطًا أن يكون مستمرًا في الثانية نفسها (المصدر ⑱).";
