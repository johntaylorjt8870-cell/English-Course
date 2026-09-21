// ============================================================
// الدرس 26 — Past Simple vs Past Continuous
// 🎬 THE TIME DIRECTOR — المخرج الذي يختار كيف يعرض الماضي
//
// المصدر المورّد هو المرجع الحرفي: لا اختصار ولا إعادة صياغة ولا حذف.
// كل سطر من المصدر مسجَّل في SOURCE_SECTIONS ويُعرض فعليًا في Lesson26.tsx،
// والفحص الآلي (scripts/audit-lesson26.mjs) يتحقق من وصول كل وحدة إلى
// الـ DOM الحقيقي — لا يكفي وجودها في هذا الملف.
// ============================================================

export const LESSON_TITLE_26 = "الدرس 26: Past Simple vs Past Continuous";
export const LESSON_SUBTITLE_26 = "الماضي البسيط أم الماضي المستمر؟ — كيف أعرف أي زمن أستخدم؟";
export const LESSON_ARABIC_TITLE_26 = "الماضي البسيط أم الماضي المستمر؟";
export const LAB_NAME_26 = "THE TIME DIRECTOR";
export const LAB_MOTTO_26 = "📸 What happened?  ·  🎥 What was happening?";

// السؤال البصري الأساسي للدرس
export const VIEW_EVENT_TAG = "📸 EVENT VIEW";
export const VIEW_PROGRESS_TAG = "🎥 IN-PROGRESS VIEW";
export const VIEW_EVENT_AR = "ماذا حدث؟";
export const VIEW_PROGRESS_AR = "ما الذي كان يحدث في تلك اللحظة؟";

export type Tone26 = "neutral" | "en" | "good" | "bad" | "warn" | "head" | "subhead";

// ============================================================
// سجل المصدر (Source Ledger)
// كل قسم = عنوان من المصدر + وحداته الحرفية سطرًا سطرًا.
// ============================================================
export type SourceSection26 = {
  id: string;
  num?: number;
  title: string;
  /** وحدات حرفية من المصدر — كل سطر كما هو (بدون **). */
  units: string[];
  /** وحدات لا تُعرض إلا بعد «تحقق» الطالب (لا كشف مسبق). */
  revealUnits?: string[];
};

export const SOURCE_SECTIONS: SourceSection26[] = [
  {
    id: "cover",
    title: "الغلاف — الدرس 26: Past Simple vs Past Continuous",
    units: [
      "الدرس 26: Past Simple vs Past Continuous",
      "الماضي البسيط أم الماضي المستمر؟ — كيف أعرف أي زمن أستخدم؟",
    ],
  },
  {
    id: "intro",
    title: "الافتتاح — لماذا هذا الدرس؟",
    units: [
      "ممتاز 🔥",
      "الآن لن نضيف زمنًا جديدًا مباشرة.",
      "بدل ذلك، سنأخذ ما تعلمناه في الدرس 25 ونرفع مستواه.",
      "لأن معرفة قاعدة:",
      "Past Simple = فعل في الماضي",
      "Past Continuous = was/were + verb-ing",
      "ليست كافية وحدها.",
      "المهارة الحقيقية هي أن تستطيع أن تنظر إلى موقف وتقرر:",
      "لماذا استخدمت Past Simple هنا؟ ولماذا Past Continuous هناك؟",
      "وهذا هو هدف الدرس 26.",
    ],
  },
  {
    id: "objectives",
    title: "🎯 أهداف الدرس",
    units: [
      "بنهاية الدرس ستكون قادرًا على:",
      "① التمييز بين Past Simple وPast Continuous.",
      "② فهم الفرق بين \"حدث\" و\"حدث كان جاريًا\".",
      "③ استخدام الزمنين معًا في الجملة نفسها.",
      "④ استخدام when وwhile بشكل صحيح.",
      "⑤ وصف حدث قطع حدثًا آخر.",
      "⑥ وصف حدثين كانا يحدثان في الوقت نفسه.",
      "⑦ وصف خلفية قصة ثم إدخال الأحداث الرئيسية.",
      "⑧ معرفة متى لا نحتاج إلى Past Continuous.",
      "⑨ اكتشاف الأخطاء الصعبة.",
      "⑩ كتابة قصة كاملة باستخدام الزمنين بطريقة طبيعية.",
    ],
  },
  {
    id: "s1",
    num: 1,
    title: "🧠 1. الفكرة التي ستجعلك تفهم الدرس كله",
    units: [
      "تخيل أنك تشاهد فيلمًا. 🎬",
      "هناك نوعان من المعلومات:",
      "🎥 المشهد الجاري",
      "ما الذي كان يحدث في تلك اللحظة؟",
      "→ Past Continuous",
      "📸 الحدث",
      "ماذا حدث؟",
      "→ Past Simple",
      "مثال:",
      "I was walking home when I saw a strange bird.",
      "المعنى:",
      "كنت أمشي إلى المنزل.",
      "وهذا كان مستمرًا.",
      "ثم:",
      "رأيت طائرًا غريبًا.",
      "وهذا حدث.",
      "إذن:",
      "was walking → Past Continuous",
      "saw → Past Simple",
    ],
  },
  {
    id: "s2",
    num: 2,
    title: "⭐ 2. لا تحفظ \"طويل وقصير\" فقط",
    units: [
      "ربما سمعت قاعدة:",
      "Past Continuous = فعل طويل",
      "Past Simple = فعل قصير",
      "هذه القاعدة مفيدة للمبتدئ، لكنها ليست دقيقة 100%.",
      "الأفضل أن تفكر هكذا:",
      "Past Continuous",
      "نحن نضع تركيزنا على الفعل وهو في حالة حدوث في لحظة ماضية.",
      "Past Simple",
      "نحن نتعامل مع الفعل كـ حدث أو واقعة مكتملة في الماضي.",
      "🧠 مثال",
      "I was reading a book at 8:00.",
      "أنا كنت أقرأ كتابًا الساعة الثامنة.",
      "نحن ننظر إلى القراءة وهي جارية.",
      "لكن:",
      "I read a book yesterday.",
      "قرأت كتابًا أمس.",
      "هنا نحن نخبرك بالحدث ببساطة.",
    ],
  },
  {
    id: "s3",
    num: 3,
    title: "⚔️ 3. المقارنة الأساسية",
    units: [
      "Past Simple",
      "I watched TV last night.",
      "= شاهدت التلفاز ليلة أمس.",
      "مجرد حدث ماضٍ.",
      "Past Continuous",
      "I was watching TV at 9:00 last night.",
      "= كنت أشاهد التلفاز الساعة التاسعة ليلة أمس.",
      "نحن نحدد لحظة وننظر إلى ما كان يحدث فيها.",
      "🔥 مثال آخر",
      "She cooked dinner.",
      "هي طبخت العشاء.",
      "نحن نخبر عن الحدث.",
      "لكن:",
      "She was cooking dinner when I arrived.",
      "كانت تطبخ العشاء عندما وصلت.",
      "هنا الطبخ كان جاريًا عندما حدث شيء آخر.",
    ],
  },
  {
    id: "s4",
    num: 4,
    title: "🧠 4. السؤال السحري",
    units: [
      "عندما تحتار، اسأل:",
      "هل أنا أقول ماذا حدث؟",
      "→ Past Simple",
      "أم:",
      "هل أقول ماذا كان يحدث في تلك اللحظة؟",
      "→ Past Continuous",
    ],
  },
  {
    id: "s5",
    num: 5,
    title: "⭐ 5. حدث واحد فقط",
    units: [
      "ليس ضروريًا أن يكون هناك فعلان.",
      "يمكن استخدام Past Simple وحده:",
      "I visited my grandmother yesterday.",
      "She bought a new phone.",
      "They played football.",
      "He opened the window.",
      "We went to the museum.",
      "كل هذه أحداث ماضية مكتملة.",
      "ويمكن استخدام Past Continuous وحده:",
      "At 7:00, I was studying.",
      "At midnight, they were sleeping.",
      "At that moment, she was talking to her friend.",
      "This time yesterday, we were traveling.",
      "هنا نركز على النشاط الجاري في لحظة ماضية.",
    ],
  },
  {
    id: "s6",
    num: 6,
    title: "🧠 6. لماذا لا نقول دائمًا Past Continuous؟",
    units: [
      "مثلاً:",
      "Yesterday, I was visiting my grandmother.",
      "قد تكون الجملة صحيحة في سياق معين، لكنها ليست الطريقة الطبيعية لمجرد إخبار شخص:",
      "\"زرت جدتي أمس.\"",
      "الأبسط:",
      "I visited my grandmother yesterday.",
      "لأننا نتحدث عن حدث مكتمل، وليس عن نشاط كنا ننظر إليه أثناء حدوثه.",
    ],
  },
  {
    id: "s7",
    num: 7,
    title: "⭐ 7. WHEN — عندما",
    units: [
      "when = عندما",
      "نستخدمها كثيرًا لربط حدثين في الماضي.",
      "النمط المهم جدًا:",
      "Past Continuous + when + Past Simple",
      "مثال:",
      "I was sleeping when the phone rang.",
      "كنت نائمًا عندما رن الهاتف.",
      "🧠 ماذا حدث هنا؟",
      "الحدث الأول:",
      "I was sleeping.",
      "كان النوم جاريًا.",
      "ثم:",
      "the phone rang.",
      "حدث رنين الهاتف.",
      "إذن:",
      "was sleeping → الخلفية / الفعل الجاري",
      "rang → الحدث",
      "🔥 أمثلة كثيرة",
      "She was studying when her friend called.",
      "كانت تدرس عندما اتصلت صديقتها.",
      "We were eating dinner when the lights went out.",
      "كنا نتناول العشاء عندما انطفأت الأضواء.",
      "He was walking to school when he found a wallet.",
      "كان يمشي إلى المدرسة عندما وجد محفظة.",
      "They were playing football when it started to rain.",
      "كانوا يلعبون كرة القدم عندما بدأ المطر.",
      "I was taking a shower when someone knocked on the door.",
      "كنت أستحم عندما طرق أحدهم الباب.",
    ],
  },
  {
    id: "s8",
    num: 8,
    title: "🧠 8. هل يمكن عكس الجملة؟",
    units: [
      "نعم!",
      "نستطيع أن نقول:",
      "I was sleeping when the phone rang.",
      "أو:",
      "When the phone rang, I was sleeping.",
      "المعنى الأساسي نفسه.",
      "مثال:",
      "She was studying when I called.",
      "أو:",
      "When I called, she was studying.",
    ],
  },
  {
    id: "s9",
    num: 9,
    title: "⭐ 9. WHILE — بينما",
    units: [
      "while = بينما",
      "نستخدمها كثيرًا عندما يكون هناك فعل مستمر يحدث بالتزامن مع فعل آخر.",
      "مثال:",
      "I was studying while my brother was playing a game.",
      "كنت أدرس بينما كان أخي يلعب لعبة.",
      "لاحظ:",
      "was studying",
      "و",
      "was playing",
      "كلاهما Past Continuous.",
      "🧠 لماذا؟",
      "لأن الفعلين كانا يحدثان في الفترة نفسها.",
      "تخيل:",
      "TIME →",
      "I: studying ─────────",
      "Brother: playing ─────────",
      "الفعلان متوازيان.",
      "⭐ أمثلة",
      "While Mom was cooking, Dad was reading.",
      "بينما كانت أمي تطبخ، كان أبي يقرأ.",
      "While the teacher was explaining, the students were taking notes.",
      "بينما كان المعلم يشرح، كان الطلاب يسجلون الملاحظات.",
      "While I was walking, my friend was talking to me.",
      "بينما كنت أمشي، كان صديقي يتحدث معي.",
    ],
  },
  {
    id: "s10",
    num: 10,
    title: "⚔️ 10. WHEN vs WHILE",
    units: [
      "لنأخذ المثالين:",
      "I was reading when the phone rang.",
      "I was reading while my sister was drawing.",
      "ما الفرق؟",
      "when",
      "غالبًا نستخدمه لإدخال حدث وقع أثناء فعل آخر.",
      "was reading → مستمر",
      "rang → حدث",
      "while",
      "غالبًا نستخدمه لربط فعلين جاريين.",
      "was reading → مستمر",
      "was drawing → مستمر",
      "🧠 قاعدة عملية",
      "إذا رأيت:",
      "while + فعل مستمر",
      "فغالبًا ستجد:",
      "was/were + ing",
      "في الجزء الآخر أيضًا إذا كان الحدثان متزامنين.",
    ],
  },
  {
    id: "s11",
    num: 11,
    title: "⭐ 11. لكن while ليست دائمًا Past Continuous!",
    units: [
      "هذه نقطة مهمة حتى لا تتحول القاعدة إلى حفظ أعمى.",
      "مثلاً:",
      "While I was walking home, I saw my teacher.",
      "هنا:",
      "was walking → Past Continuous",
      "saw → Past Simple",
      "لأن while تصف الفعل الجاري، ثم حدث شيء أثناءه.",
      "إذن:",
      "while لا تعني أن الطرفين يجب أن يكونا Past Continuous دائمًا.",
      "المعنى هو الذي يحدد.",
    ],
  },
  {
    id: "s12",
    num: 12,
    title: "🔥 12. ثلاثة أنماط يجب أن تتقنها",
    units: [
      "النمط 1",
      "Past Simple فقط",
      "I visited the museum yesterday.",
      "النمط 2",
      "Past Continuous فقط",
      "At 5:00, I was studying.",
      "النمط 3",
      "Past Continuous + Past Simple",
      "I was studying when my friend called.",
      "النمط 4",
      "Past Continuous + Past Continuous",
      "I was studying while my brother was playing.",
      "إذا أتقنت هذه الأنماط، فأنت بدأت تسيطر فعليًا على الماضي.",
    ],
  },
  {
    id: "s13",
    num: 13,
    title: "🎬 13. Background vs Main Event",
    units: [
      "هذه من أهم الأفكار.",
      "تخيل قصة:",
      "It was a dark night.",
      "The wind was blowing.",
      "The rain was falling.",
      "People were running home.",
      "Suddenly, a loud noise came from the forest.",
      "Everyone stopped.",
      "Someone opened the door.",
      "هنا:",
      "was blowing",
      "was falling",
      "were running",
      "هي الخلفية.",
      "ثم:",
      "came",
      "stopped",
      "opened",
      "هي الأحداث الرئيسية.",
      "🧠 لماذا هذا مهم؟",
      "لأن اللغة الإنجليزية تستخدم الزمنين لبناء القصة.",
      "Past Continuous:",
      "يبني المسرح.",
      "Past Simple:",
      "يحرك القصة.",
    ],
  },
  {
    id: "s14",
    num: 14,
    title: "⭐ 14. قصة قصيرة محللة",
    units: [
      "اقرأ:",
      "Emma was walking through the park when she heard a strange noise. Birds were singing, children were playing, and people were talking. Emma stopped and looked around. She saw a small box under a tree.",
      "الآن نحلل:",
      "was walking",
      "→ فعل كان جاريًا.",
      "heard",
      "→ حدث.",
      "were singing",
      "→ خلفية.",
      "were playing",
      "→ خلفية.",
      "were talking",
      "→ خلفية.",
      "stopped",
      "→ حدث.",
      "looked",
      "→ حدث.",
      "saw",
      "→ حدث.",
      "🧠 لاحظ شيئًا مهمًا",
      "ليس معنى ذلك أن Past Continuous دائمًا أهم.",
      "في القصة:",
      "Past Continuous يعطيك الجو والمشهد.",
      "Past Simple يعطيك الأحداث التي يجب أن تتذكرها.",
    ],
  },
  {
    id: "s15",
    num: 15,
    title: "⭐ 15. أفعال متزامنة",
    units: [
      "إذا كان هناك فعلان يحدثان في الوقت نفسه:",
      "While Sarah was reading, Tom was drawing.",
      "Sarah → reading",
      "Tom → drawing",
      "الاثنان مستمران.",
      "مثال آخر:",
      "The children were laughing while the teacher was explaining the game.",
      "مثال أكثر تقدمًا:",
      "While I was preparing dinner, my sister was setting the table and my father was making tea.",
      "ثلاثة أفعال تحدث في الفترة نفسها.",
    ],
  },
  {
    id: "s16",
    num: 16,
    title: "🧠 16. أكثر من فعل في الوقت نفسه",
    units: [
      "يمكن أن يكون لدينا:",
      "Action A:",
      "I was cooking.",
      "Action B:",
      "My brother was washing the dishes.",
      "Action C:",
      "My sister was setting the table.",
      "كلها تحدث في الفترة نفسها.",
      "يمكننا أن نقول:",
      "While I was cooking, my brother was washing the dishes and my sister was setting the table.",
      "🔥 هذه جملة ممتازة للتدرب على Past Continuous.",
    ],
  },
  {
    id: "s17",
    num: 17,
    title: "⭐ 17. حدث يقطع حدثًا آخر",
    units: [
      "هذه واحدة من أشهر استخدامات الزمنين.",
      "الفعل الجاري:",
      "I was sleeping.",
      "الحدث:",
      "The alarm rang.",
      "الجملة:",
      "I was sleeping when the alarm rang.",
      "فعل جاري:",
      "She was walking home.",
      "حدث:",
      "It started to rain.",
      "الجملة:",
      "She was walking home when it started to rain.",
      "فعل جاري:",
      "They were playing football.",
      "حدث:",
      "The teacher arrived.",
      "الجملة:",
      "They were playing football when the teacher arrived.",
      "🧠 النموذج البصري",
      "الفعل الجاري:",
      "───────────────",
      "الحدث:",
      "X",
      "الجملة:",
      "I was studying when my friend called.",
    ],
  },
  {
    id: "s18",
    num: 18,
    title: "🔥 18. ليس كل Past Simple فعلًا \"يقطع\" Continuous",
    units: [
      "مثلاً:",
      "I was walking home when I saw my friend.",
      "رؤية صديقي حدث قصير بالنسبة للسياق.",
      "لكن:",
      "I was walking home when I met my friend.",
      "نفس الفكرة.",
      "أما:",
      "I walked home and watched TV.",
      "هنا لا يوجد Past Continuous.",
      "لماذا؟",
      "لأننا نروي سلسلة من الأحداث.",
    ],
  },
  {
    id: "s19",
    num: 19,
    title: "⭐ 19. سلسلة الأحداث",
    units: [
      "تخيل:",
      "I woke up.",
      "I brushed my teeth.",
      "I ate breakfast.",
      "I left the house.",
      "I went to school.",
      "هذه قصة من أحداث متتابعة.",
      "Past Simple مناسب جدًا.",
      "لكن إذا أردنا وصف المشهد أثناء حدوث أحد الأحداث:",
      "I was eating breakfast when my phone rang.",
      "هنا تغير المنظور.",
      "🧠 الفرق العميق",
      "Past Simple",
      "يروي الأحداث:",
      "I woke up.",
      "I ate breakfast.",
      "I left home.",
      "Past Continuous",
      "يوقف الكاميرا داخل الحدث:",
      "I was eating breakfast when my phone rang.",
    ],
  },
  {
    id: "s20",
    num: 20,
    title: "⚔️ 20. Compare Carefully",
    units: [
      "A",
      "I watched TV last night.",
      "B",
      "I was watching TV at 9:00 last night.",
      "C",
      "I was watching TV when my friend called.",
      "D",
      "While I was watching TV, my brother was reading.",
      "الأربع جمل صحيحة.",
      "لكن كل واحدة تصور الماضي بطريقة مختلفة.",
      "🧠 A",
      "حدث مكتمل.",
      "🧠 B",
      "نشاط كان جاريًا عند وقت محدد.",
      "🧠 C",
      "نشاط جاري + حدث.",
      "🧠 D",
      "نشاطان جاريان في الفترة نفسها.",
    ],
  },
  {
    id: "s21",
    num: 21,
    title: "🚨 21. أخطاء شائعة جدًا",
    units: [
      "الخطأ 1",
      "I was played football. ❌",
      "لماذا؟",
      "بعد was نحتاج:",
      "verb-ing",
      "الصحيح:",
      "I was playing football. ✅",
      "الخطأ 2",
      "They were play football. ❌",
      "الصحيح:",
      "They were playing football. ✅",
      "الخطأ 3",
      "Did you were sleeping? ❌",
      "لا نستخدم did مع was/were في Past Continuous.",
      "الصحيح:",
      "Were you sleeping? ✅",
      "الخطأ 4",
      "She was study when I called. ❌",
      "الصحيح:",
      "She was studying when I called. ✅",
      "الخطأ 5",
      "I was sleeping when the phone was rang. ❌",
      "إذا كان \"رنين الهاتف\" حدثًا نستخدم Past Simple:",
      "I was sleeping when the phone rang. ✅",
    ],
    revealUnits: [
      "الصحيح:",
      "لماذا؟",
      "بعد was نحتاج:",
      "verb-ing",
      "لا نستخدم did مع was/were في Past Continuous.",
      "إذا كان \"رنين الهاتف\" حدثًا نستخدم Past Simple:",
      "I was playing football. ✅",
      "They were playing football. ✅",
      "Were you sleeping? ✅",
      "She was studying when I called. ✅",
      "I was sleeping when the phone rang. ✅",
    ],
  },
  {
    id: "s22",
    num: 22,
    title: "🧠 22. انتبه إلى WAS/WERE",
    units: [
      "لا تنظر إلى الفعل فقط.",
      "انظر إلى الفاعل.",
      "I → was",
      "He → was",
      "She → was",
      "It → was",
      "You → were",
      "We → were",
      "They → were",
      "⭐ أمثلة",
      "I was running.",
      "He was running.",
      "She was running.",
      "They were running.",
      "We were running.",
      "You were running.",
      "لاحظ أن:",
      "running",
      "لا تتغير.",
      "الذي يتغير هو:",
      "was / were.",
    ],
  },
  {
    id: "s23",
    num: 23,
    title: "🔥 23. Past Continuous مع الأسماء",
    units: [
      "ليس فقط الضمائر.",
      "Ali",
      "Ali was studying.",
      "Sara",
      "Sara was reading.",
      "The dog",
      "The dog was sleeping.",
      "Ali and Omar",
      "Ali and Omar were playing.",
      "The students",
      "The students were listening.",
      "🧠 قاعدة",
      "Singular → was",
      "Plural → were",
      "مع الاستثناء المعروف:",
      "You → were",
    ],
  },
  {
    id: "s24",
    num: 24,
    title: "⭐ 24. Time Expressions",
    units: [
      "هذه العبارات مفيدة جدًا:",
      "at 5:00 yesterday",
      "at 8:30 last night",
      "at that moment",
      "at that time",
      "this time yesterday",
      "all morning",
      "all afternoon",
      "all evening",
      "while",
      "when",
      "⚠️ لكن لا تحفظها كأنها قوانين آلية",
      "مثلاً:",
      "yesterday",
      "يمكن أن تأتي مع Past Simple:",
      "I visited my uncle yesterday.",
      "ويمكن أن تأتي مع Past Continuous:",
      "At 5:00 yesterday, I was visiting my uncle.",
      "إذن:",
      "السياق أهم من الكلمة.",
    ],
  },
  {
    id: "s25",
    num: 25,
    title: "🧠 25. تحدي \"المعنى أولًا\"",
    units: [
      "اختر الزمن المناسب:",
      "1",
      "At 10 PM, I ______.",
      "slept",
      "was sleeping",
      "الجواب:",
      "was sleeping",
      "لأننا نحدد ما كان يحدث في تلك اللحظة.",
      "2",
      "Yesterday, I ______ my grandmother.",
      "visited",
      "was visiting",
      "الجواب الطبيعي في تقرير حدث مكتمل:",
      "visited",
      "3",
      "I ______ home when I saw a fox.",
      "walked",
      "was walking",
      "الجواب:",
      "was walking",
      "لأن المشي كان جاريًا عندما حدثت الرؤية.",
      "4",
      "I ______ home and ______ dinner.",
      "walked / ate",
      "was walking / was eating",
      "الأفضل:",
      "walked / ate",
      "لأنها سلسلة أحداث.",
    ],
    revealUnits: [
      "الجواب:",
      "was sleeping",
      "لأننا نحدد ما كان يحدث في تلك اللحظة.",
      "الجواب الطبيعي في تقرير حدث مكتمل:",
      "visited",
      "was walking",
      "لأن المشي كان جاريًا عندما حدثت الرؤية.",
      "الأفضل:",
      "walked / ate",
      "لأنها سلسلة أحداث.",
    ],
  },
  {
    id: "s26",
    num: 26,
    title: "🧪 26. Exercise — Choose",
    units: ["اختر Past Simple أو Past Continuous."],
  },
  {
    id: "s27",
    num: 27,
    title: "🔥 27. Exercise — Complete the Story",
    units: [
      "ضع الفعل في الشكل الصحيح:",
      "Yesterday evening, I ___ (walk) home when I ___ (hear) a strange sound.",
      "People ___ (run) through the street, and the wind ___ (blow) strongly.",
      "I ___ (stop) and ___ (look) around.",
      "While I ___ (look), a dog suddenly ___ (jump) out from behind a wall.",
      "I ___ (be) surprised, but the dog ___ (run) away.",
      "هنا ستستخدم الزمنين معًا.",
    ],
  },
  {
    id: "s28",
    num: 28,
    title: "🕵️ 28. Grammar Detective",
    units: [
      "اقرأ:",
      "Last night, I was watched TV when my sister called me. She were studying in her room while I was watched a movie. Suddenly, the lights went out. We were looked at each other and started laughing.",
      "هناك عدة أخطاء.",
      "اكتشفها.",
      "تذكر أن تبحث عن:",
      "was/were + ing",
      "و",
      "Past Simple للأحداث.",
    ],
  },
  {
    id: "s29",
    num: 29,
    title: "🚀 29. IQ200 Challenge",
    units: [
      "اختر الجملة الأكثر منطقية حسب المعنى.",
      "A",
      "I was walking to school yesterday.",
      "B",
      "I walked to school yesterday.",
      "كلاهما يمكن أن يكون صحيحًا!",
      "الآن السؤال:",
      "متى نختار كل واحدة؟",
      "A:",
      "عندما نريد التركيز على عملية المشي في سياق معين.",
      "B:",
      "عندما نريد ببساطة إخبار الشخص أن المشي إلى المدرسة حدث.",
      "🔥 هذه هي المهارة الحقيقية.",
    ],
  },
  {
    id: "s30",
    num: 30,
    title: "🧠 30. IQ200 — هل الجملتان صحيحتان؟",
    units: [
      "1",
      "I watched TV last night.",
      "2",
      "I was watching TV last night.",
      "هل واحدة خاطئة؟",
      "لا.",
      "لكن المعنى والسياق مختلفان.",
      "الجملة الأولى:",
      "تقرير عن مشاهدة التلفاز.",
      "الجملة الثانية:",
      "تركز على أن المشاهدة كانت مستمرة خلال فترة ماضية.",
      "مثلاً:",
      "I was watching TV last night when my friend called.",
      "هنا تصبح Continuous طبيعية جدًا لأنها مرتبطة بحدث آخر.",
    ],
    revealUnits: [
      "لا.",
      "لكن المعنى والسياق مختلفان.",
      "الجملة الأولى:",
      "تقرير عن مشاهدة التلفاز.",
      "الجملة الثانية:",
      "تركز على أن المشاهدة كانت مستمرة خلال فترة ماضية.",
      "مثلاً:",
      "I was watching TV last night when my friend called.",
      "هنا تصبح Continuous طبيعية جدًا لأنها مرتبطة بحدث آخر.",
    ],
  },
  {
    id: "s31",
    num: 31,
    title: "🏆 31. FINAL BOSS — Build the Movie",
    units: [
      "تخيل هذه اللحظة:",
      "الساعة 10 مساءً.",
      "المطر ينزل.",
      "الناس يمشون.",
      "أنت تمشي إلى المنزل.",
      "فجأة تسمع صوتًا.",
      "تتوقف.",
      "ترى شيئًا غريبًا.",
      "اكتب قصة من 10–12 جملة.",
      "يجب أن تحتوي على:",
      "✅ 4 جمل Past Continuous على الأقل.",
      "✅ 5 أفعال Past Simple على الأقل.",
      "✅ when مرة واحدة على الأقل.",
      "✅ while مرة واحدة على الأقل.",
      "✅ حدثين يحدثان في الوقت نفسه.",
      "✅ حدث يقطع فعلًا جاريًا.",
      "✅ خلفية للقصة.",
      "🎬 مثال قصير لفهم طريقة البناء",
      "لا تحفظ هذه القصة؛ استخدمها كنموذج:",
      "Last night, I was walking home while the rain was falling heavily. People were running toward their houses. I was listening to music when I heard a strange noise. I stopped and looked behind me. A small dog was standing near a tree. While I was looking at it, the dog suddenly ran toward me. I stepped back and dropped my phone. The dog picked up the phone and ran away!",
      "لاحظ كيف تحولت القصة إلى فيلم:",
      "الخلفية:",
      "was walking",
      "was falling",
      "were running",
      "الحدث:",
      "heard",
      "stopped",
      "looked",
      "ran",
      "stepped",
      "dropped",
      "picked up",
    ],
  },
  {
    id: "master-map",
    title: "🧠 MASTER MAP",
    units: [
      "احفظ هذه الخريطة:",
      "Past Simple",
      "حدث ماضٍ مكتمل أو حدث نرويه كواقعة.",
      "I visited my friend.",
      "She opened the door.",
      "They played football.",
      "Past Continuous",
      "فعل كان جاريًا في وقت ماضٍ.",
      "I was studying at 8:00.",
      "She was sleeping.",
      "They were playing.",
      "Past Continuous + Past Simple",
      "فعل كان جاريًا + حدث وقع أثناءه.",
      "I was studying when my friend called.",
      "Past Continuous + Past Continuous",
      "فعلان جاريان في الوقت نفسه.",
      "I was studying while my brother was playing.",
    ],
  },
  {
    id: "golden-rule",
    title: "🔥 القاعدة الذهبية للدرس 26",
    units: [
      "لا تسأل نفسك فقط:",
      "\"ما هي كلمة الإشارة؟\"",
      "ولا تسأل:",
      "\"هل الفعل طويل أم قصير؟\"",
      "بل اسأل:",
      "ما الصورة التي أريد أن أرسمها؟",
      "📸 هل أريد أن أقول ماذا حدث؟",
      "→ Past Simple",
      "🎥 هل أريد أن أُظهر ما كان يحدث في تلك اللحظة؟",
      "→ Past Continuous",
      "🎥 + 📸",
      "هل كان هناك فعل جارٍ وحدث آخر وقع أثناءه؟",
      "→ Past Continuous + Past Simple",
      "🎥 + 🎥",
      "هل كان هناك فعلان جاريان في الوقت نفسه؟",
      "→ Past Continuous + Past Continuous",
    ],
  },
  {
    id: "final-check",
    title: "🏅 FINAL CHECK",
    units: [
      "قبل أن تعتبر نفسك أتقنت الدرس، حاول إكمال هذه الجمل دون النظر إلى الشرح:",
      "① At 7:00 yesterday, I was __________.",
      "② I was __________ when __________.",
      "③ While I was __________, my brother was __________.",
      "④ Yesterday, I __________.",
      "⑤ They were __________ when __________.",
      "⑥ While Mom was __________, Dad was __________.",
    ],
  },
  {
    id: "closing",
    title: "🏁 ختام الدرس 26",
    units: [
      "إذا استطعت بناء جمل مختلفة بنفسك، فأنت لم تعد تحفظ Past Continuous فقط؛ أنت بدأت تستخدمه للتفكير ورواية الأحداث باللغة الإنجليزية.",
    ],
  },
];

export const SOURCE_NUMBERED_COUNT = 31;
export const SOURCE_LEDGER_COUNT = SOURCE_SECTIONS.length;

/** أرقام أقسام المصدر 1–31 مرتبة — تُستخدم في الترويسة والتدقيق. */
export const SOURCE_NUMBERS: number[] = SOURCE_SECTIONS.filter((s) => s.num !== undefined).map((s) => s.num as number);

export type SectionKey = string;
export const SEC: Record<SectionKey, number> = SOURCE_SECTIONS.reduce<Record<string, number>>((acc, s, i) => {
  acc[s.id] = i;
  return acc;
}, {});

/** وحدات قسم ما — تُستخدم في المكوّنات والفحص الآلي. */
export function unitsOf(id: SectionKey): string[] {
  return SOURCE_SECTIONS[SEC[id]].units;
}
export function unit(id: SectionKey, index: number): string {
  return unitsOf(id)[index];
}

// ============================================================
// 26) Exercise — Choose (8 أسئلة المصدر كما هي)
// ============================================================
export type Mcq26 = { n: number; stem: string; opts: [string, string]; answer: number; why: string };

export const EX26_ITEMS: Mcq26[] = [
  {
    n: 1,
    stem: "I ______ a book at 8:00 last night.",
    opts: ["read", "was reading"],
    answer: 1,
    why: "At 8:00 last night لحظة محددة في الماضي، ونحن ننظر إلى القراءة وهي جارية → was reading.",
  },
  {
    n: 2,
    stem: "She ______ her room yesterday.",
    opts: ["cleaned", "was cleaning"],
    answer: 0,
    why: "نحن نخبر عن حدث مكتمل في تقرير بسيط عن الأمس → Past Simple: cleaned.",
  },
  {
    n: 3,
    stem: "They ______ football when it started raining.",
    opts: ["played", "were playing"],
    answer: 1,
    why: "اللعب كان جاريًا في الخلفية، والحدث القاطع هو started raining → were playing.",
  },
  {
    n: 4,
    stem: "We ______ dinner when the doorbell rang.",
    opts: ["ate", "were eating"],
    answer: 1,
    why: "العشاء كان جاريًا عندما رن الجرس (حدث قاطع) → were eating.",
  },
  {
    n: 5,
    stem: "He ______ to school yesterday.",
    opts: ["walked", "was walking"],
    answer: 0,
    why: "جملة تقرير عن حدث مكتمل أمس، بلا لحظة محددة ولا حدث آخر → walked.",
  },
  {
    n: 6,
    stem: "At midnight, everyone ______.",
    opts: ["slept", "was sleeping"],
    answer: 1,
    why: "At midnight لحظة محددة ننظر فيها إلى النشاط الجاري → was sleeping.",
  },
  {
    n: 7,
    stem: "While I was studying, my brother ______ a movie.",
    opts: ["watched", "was watching"],
    answer: 1,
    why: "while تربط فعلين جاريين في الفترة نفسها → الصيغة المتوازية was watching.",
  },
  {
    n: 8,
    stem: "The teacher ______ into the classroom and the students became quiet.",
    opts: ["walked", "was walking"],
    answer: 0,
    why: "سلسلة أحداث متتابعة (دخل ثم صار الطلاب هادئين) → Past Simple: walked.",
  },
];

// ============================================================
// 27) Exercise — Complete the Story (الفقرة المصدرية كاملة)
// ============================================================
export type StoryPart26 = { text: string } | { blank: true; verb: string; answer: string } | { br: true };

export const COMPLETE_STORY_26: StoryPart26[] = [
  { text: "Yesterday evening, I " },
  { blank: true, verb: "walk", answer: "was walking" },
  { text: " home when I " },
  { blank: true, verb: "hear", answer: "heard" },
  { text: " a strange sound." },
  { br: true },
  { text: "People " },
  { blank: true, verb: "run", answer: "were running" },
  { text: " through the street, and the wind " },
  { blank: true, verb: "blow", answer: "was blowing" },
  { text: " strongly." },
  { br: true },
  { text: "I " },
  { blank: true, verb: "stop", answer: "stopped" },
  { text: " and " },
  { blank: true, verb: "look", answer: "looked" },
  { text: " around." },
  { br: true },
  { text: "While I " },
  { blank: true, verb: "look", answer: "was looking" },
  { text: ", a dog suddenly " },
  { blank: true, verb: "jump", answer: "jumped" },
  { text: " out from behind a wall." },
  { br: true },
  { text: "I " },
  { blank: true, verb: "be", answer: "was" },
  { text: " surprised, but the dog " },
  { blank: true, verb: "run", answer: "ran" },
  { text: " away." },
];

export const COMPLETE_STORY_26_NOTE =
  "هنا ستستخدم الزمنين معًا: فعل جارٍ في الخلفية، وحدث مكتمل يحرّك القصة.";

// ============================================================
// 28) Grammar Detective — فقرة المصدر مقسّمة إلى مقاطع قابلة للنقر
// ============================================================
export type DetectivePart26 = {
  text: string;
  error?: boolean;
  fix?: string;
  why?: string;
};

export const DETECTIVE_26_PARTS: DetectivePart26[] = [
  { text: "Last night, " },
  {
    text: "I was watched TV",
    error: true,
    fix: "I was watching TV",
    why: "بعد was يجب أن يأتي الفعل بصيغة verb-ing، وليس Past Simple: was watching.",
  },
  { text: " when my sister called me. " },
  {
    text: "She were studying",
    error: true,
    fix: "She was studying",
    why: "She فاعل مفرد → was، وليست were. ومعها الفعل بصيغة -ing ليستمر الوصف.",
  },
  { text: " in her room while " },
  {
    text: "I was watched a movie",
    error: true,
    fix: "I was watching a movie",
    why: "نفس الخطأ الأول: التركيب هو was + verb-ing → was watching.",
  },
  { text: ". Suddenly, the lights went out. " },
  { text: "We were looked at each other", error: true, fix: "We looked at each other", why: "هنا حدث مكتمل نرويه (نظرنا ثم ضحكنا) → Past Simple: looked، ولا نقول were looked." },
  { text: " and started laughing." },
];

// ============================================================
// 29) IQ200 — مطابقة المعنى بالجملة (المصدر يعطي المعنيين)
// ============================================================
export const IQ200_MATCH_26 = {
  sentences: [
    { key: "A", en: "I was walking to school yesterday." },
    { key: "B", en: "I walked to school yesterday." },
  ],
  meanings: [
    { key: "m1", text: "عندما نريد التركيز على عملية المشي في سياق معين." },
    { key: "m2", text: "عندما نريد ببساطة إخبار الشخص أن المشي إلى المدرسة حدث." },
  ],
  answer: { A: "m1", B: "m2" } as Record<string, string>,
  why: {
    A: "was walking تركّز على العملية نفسها وهي جارية في سياق معين.",
    B: "walked تخبر ببساطة أن المشي إلى المدرسة حدث مكتمل.",
  },
};

// ============================================================
// 30) IQ200 — هل الجملتان صحيحتان؟
// ============================================================
export const IQ200_BOTH_26 = {
  sentences: ["I watched TV last night.", "I was watching TV last night."],
  question: "هل واحدة خاطئة؟",
  options: ["الجملة 1 فقط خاطئة", "الجملة 2 فقط خاطئة", "لا، كلتاهما صحيحة"],
  answer: 2,
};

// ============================================================
// 31) FINAL BOSS — قصة المخرج (10–12 جملة)
// ============================================================
export const FINAL_BOSS_26_SCENE: string[] = [
  "الساعة 10 مساءً.",
  "المطر ينزل.",
  "الناس يمشون.",
  "أنت تمشي إلى المنزل.",
  "فجأة تسمع صوتًا.",
  "تتوقف.",
  "ترى شيئًا غريبًا.",
];

export const FINAL_BOSS_26_REQUIREMENTS: { ar: string; unit: string }[] = [
  { ar: "4 جمل Past Continuous على الأقل", unit: "✅ 4 جمل Past Continuous على الأقل." },
  { ar: "5 أفعال Past Simple على الأقل", unit: "✅ 5 أفعال Past Simple على الأقل." },
  { ar: "when مرة واحدة على الأقل", unit: "✅ when مرة واحدة على الأقل." },
  { ar: "while مرة واحدة على الأقل", unit: "✅ while مرة واحدة على الأقل." },
  { ar: "حدثان يحدثان في الوقت نفسه", unit: "✅ حدثين يحدثان في الوقت نفسه." },
  { ar: "حدث يقطع فعلًا جاريًا", unit: "✅ حدث يقطع فعلًا جاريًا." },
  { ar: "خلفية للقصة", unit: "✅ خلفية للقصة." },
];

export const FINAL_BOSS_26_MODEL_NOTE = "لا تحفظ هذه القصة؛ استخدمها كنموذج:";
export const FINAL_BOSS_26_MODEL_STORY =
  "Last night, I was walking home while the rain was falling heavily. People were running toward their houses. I was listening to music when I heard a strange noise. I stopped and looked behind me. A small dog was standing near a tree. While I was looking at it, the dog suddenly ran toward me. I stepped back and dropped my phone. The dog picked up the phone and ran away!";

export const FINAL_BOSS_26_BACKGROUND = ["was walking", "was falling", "were running"];
export const FINAL_BOSS_26_EVENTS = ["heard", "stopped", "looked", "ran", "stepped", "dropped", "picked up"];

// ============================================================
// الوقت/التعبيرات — أنماط عرض مصدرية (تُستخدم داخل المختبرات فقط)
// ============================================================
export const TIME_CLUES_26 = [
  "at 5:00 yesterday",
  "at 8:30 last night",
  "at that moment",
  "at that time",
  "this time yesterday",
  "all morning",
  "all afternoon",
  "all evening",
  "while",
  "when",
];

export const WAS_TABLE_26 = [
  { subject: "I", aux: "was" },
  { subject: "He", aux: "was" },
  { subject: "She", aux: "was" },
  { subject: "It", aux: "was" },
  { subject: "You", aux: "were" },
  { subject: "We", aux: "were" },
  { subject: "They", aux: "were" },
];

export const NOUN_TABLE_26 = [
  { subject: "Ali", aux: "was", en: "Ali was studying." },
  { subject: "Sara", aux: "was", en: "Sara was reading." },
  { subject: "The dog", aux: "was", en: "The dog was sleeping." },
  { subject: "Ali and Omar", aux: "were", en: "Ali and Omar were playing." },
  { subject: "The students", aux: "were", en: "The students were listening." },
];

// ============================================================
// تسلسل الشرائح — كل قسم مصدري يُوزَّع على شاشة أو أكثر
// ============================================================
export type Lab26 =
  | "twoViews"
  | "miniTimeline"
  | "longShort"
  | "betterThinking"
  | "directorViewfinder"
  | "cookScene"
  | "magicQuestion"
  | "notAlways"
  | "flipOrder"
  | "parallelTracks"
  | "whenVsWhile"
  | "whileNuance"
  | "fourPatternBoard"
  | "storyDirector"
  | "emmaAnalysis"
  | "parallelPairs"
  | "simultaneousLab"
  | "interruptionLab"
  | "whenAnalysis"
  | "interruptionModel"
  | "notEverySimple"
  | "sequenceScene"
  | "deepDifference"
  | "compareFour"
  | "compareMeanings"
  | "errorsDetective"
  | "wasWereControl"
  | "nounAgreement"
  | "timeExpressions"
  | "timeNotRules"
  | "meaningFirst"
  | "iq200Match"
  | "iq200Both"
  | "storyLayers"
  | "masterMap"
  | "goldenRule"
  | "finalCheck";

export type Block26 =
  | { t: "units"; from: number; to?: number; tone?: Tone26 }
  | { t: "lab"; lab: Lab26; covers?: [number, number] }
  | { t: "note"; emoji: string; text: string }
  | { t: "strip"; items: string[]; tone?: Tone26 };

export type Exercise26 =
  | { type: "choose" }
  | { type: "completeStory" }
  | { type: "grammarDetective" }
  | { type: "finalBoss" };

export type Slide26 = { section: string; mascot: string; sourceIndex?: number; covers?: [number, number] } & (
  | { kind: "cover"; title: string }
  | { kind: "objectives"; title: string }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block26[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle?: string; ex: Exercise26 }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

// مجموعات الفهرس الجانبي
const START = "البداية";
const CORE = "الفكرة الأساسية";
const ONE = "حدث واحد فقط";
const WHEN_S = "WHEN — عندما";
const WHILE_S = "WHILE — بينما";
const PATTERNS = "الأنماط الأربعة";
const STORY = "بناء القصة";
const CAREFUL = "مقارنة دقيقة";
const ERRORS = "الأخطاء والتحكم";
const MEANING = "المعنى والتعبيرات";
const PRACTICE = "التدريبات";
const CHALLENGE = "التحديات النهائية";
const END = "الخاتمة";

export const SECTIONS_26 = [
  START,
  CORE,
  ONE,
  WHEN_S,
  WHILE_S,
  PATTERNS,
  STORY,
  CAREFUL,
  ERRORS,
  MEANING,
  PRACTICE,
  CHALLENGE,
  END,
] as const;

export const SLIDES: Slide26[] = [
  // ---------------- البداية ----------------
  { kind: "cover", section: START, mascot: "🎬", title: LESSON_TITLE_26, sourceIndex: SEC.cover, covers: [0, 2] },

  {
    kind: "lesson",
    section: START,
    mascot: "🔗",
    sourceIndex: SEC.intro,
    step: "0",
    title: "الجسر من الدرس 25 — لماذا هذا الدرس؟",
    lead: "لن نضيف زمنًا جديدًا مباشرة: سنرفع مستوانا في الزمنين معًا.",
    blocks: [
      { t: "units", from: 0, to: 7, tone: "head" },
      { t: "note", emoji: "🎥", text: "في الدرس 25 تعلّمنا الكاميرا: 🎥 Past Continuous = كان يحدث. اليوم نصبح مخرجًا: 📸 أم 🎥 — أي صورة أريد أن أعرضها؟" },
    ],
    tip: "السؤال البصري للدرس: 📸 What happened? · 🎥 What was happening?",
  },

  {
    kind: "lesson",
    section: START,
    mascot: "🎯",
    sourceIndex: SEC.intro,
    step: "0ب",
    title: "مهمة الدرس 26 — THE TIME DIRECTOR",
    blocks: [
      { t: "units", from: 7, tone: "head" },
      { t: "strip", items: ["📸 EVENT VIEW", "🎥 IN-PROGRESS VIEW", "🎥 + 📸", "🎥 + 🎥"], tone: "neutral" },
    ],
    tip: "المعنى أولًا: ما الصورة التي أريد أن أرسمها في ذهن المستمع؟",
  },

  {
    kind: "objectives",
    section: START,
    mascot: "🎯",
    sourceIndex: SEC.objectives,
    covers: [0, 11],
    title: "أهداف الدرس — 10 أهداف",
  },

  // ---------------- الفكرة الأساسية ----------------
  {
    kind: "lesson",
    section: CORE,
    mascot: "🧠",
    sourceIndex: SEC.s1,
    step: "1",
    title: "الفكرة التي ستجعلك تفهم الدرس كله",
    lead: "فيلم واحد… ونوعان من المعلومات.",
    blocks: [{ t: "lab", lab: "twoViews", covers: [0, 9] }],
  },

  {
    kind: "lesson",
    section: CORE,
    mascot: "🐦",
    sourceIndex: SEC.s1,
    title: "مثال واحد يوضح كل شيء",
    blocks: [
      { t: "units", from: 9, to: 16, tone: "head" },
      { t: "lab", lab: "miniTimeline", covers: [16, 19] },
    ],
  },

  {
    kind: "lesson",
    section: CORE,
    mascot: "⭐",
    sourceIndex: SEC.s2,
    step: "2",
    title: "لا تحفظ «طويل وقصير» فقط",
    lead: "قاعدة المبتدئ مفيدة… لكنها ليست دقيقة 100%.",
    blocks: [{ t: "lab", lab: "longShort", covers: [0, 4] }],
  },

  {
    kind: "lesson",
    section: CORE,
    mascot: "🧠",
    sourceIndex: SEC.s2,
    title: "التفكير الأفضل: تركيز أو واقعة مكتملة",
    blocks: [{ t: "lab", lab: "betterThinking", covers: [4, 17] }],
  },

  {
    kind: "lesson",
    section: CORE,
    mascot: "📸",
    sourceIndex: SEC.s3,
    step: "3",
    title: "المقارنة الأساسية — كاميرا واحدة ومشهدان",
    lead: "نفس الحدث… لكن المشهد الذي أعرضه مختلف.",
    blocks: [{ t: "lab", lab: "directorViewfinder", covers: [0, 8] }],
  },

  {
    kind: "lesson",
    section: CORE,
    mascot: "🍲",
    sourceIndex: SEC.s3,
    title: "مثال آخر: She cooked / She was cooking",
    blocks: [{ t: "lab", lab: "cookScene", covers: [8, 16] }],
  },

  {
    kind: "lesson",
    section: CORE,
    mascot: "🧠",
    sourceIndex: SEC.s4,
    step: "4",
    title: "السؤال السحري",
    lead: "عندما تحتار… اسأل نفسك سؤالًا واحدًا.",
    blocks: [{ t: "lab", lab: "magicQuestion", covers: [0, 6] }],
  },

  // ---------------- حدث واحد فقط ----------------
  {
    kind: "lesson",
    section: ONE,
    mascot: "⭐",
    sourceIndex: SEC.s5,
    step: "5",
    title: "حدث واحد فقط — Past Simple وحده",
    blocks: [{ t: "units", from: 0, to: 8, tone: "head" }],
    tip: "لا حاجة لفعلين: جملة واحدة كاملة يمكن أن تكون كل الفيلم.",
  },

  {
    kind: "lesson",
    section: ONE,
    mascot: "🎥",
    sourceIndex: SEC.s5,
    title: "أو Past Continuous وحده",
    blocks: [
      { t: "units", from: 8, to: 14, tone: "head" },
      { t: "strip", items: ["at 7:00", "at midnight", "at that moment", "this time yesterday"], tone: "neutral" },
    ],
  },

  {
    kind: "lesson",
    section: ONE,
    mascot: "🧠",
    sourceIndex: SEC.s6,
    step: "6",
    title: "لماذا لا نقول دائمًا Past Continuous؟",
    blocks: [{ t: "lab", lab: "notAlways", covers: [0, 7] }],
    tip: "قد تكون الجملة صحيحة، لكن السؤال: هل هي الطريقة الطبيعية لهذا المعنى؟",
  },

  // ---------------- WHEN ----------------
  {
    kind: "lesson",
    section: WHEN_S,
    mascot: "⭐",
    sourceIndex: SEC.s7,
    step: "7",
    title: "WHEN — عندما",
    lead: "when تربط حدثين في الماضي: فعل جارٍ + حدث.",
    blocks: [{ t: "units", from: 0, to: 7, tone: "head" }],
  },

  {
    kind: "lesson",
    section: WHEN_S,
    mascot: "📞",
    sourceIndex: SEC.s7,
    title: "ماذا حدث هنا؟ — تحليل الجملة",
    blocks: [{ t: "lab", lab: "whenAnalysis", covers: [7, 17] }],
  },

  {
    kind: "lesson",
    section: WHEN_S,
    mascot: "🔥",
    sourceIndex: SEC.s7,
    title: "أمثلة كثيرة مع WHEN",
    blocks: [{ t: "units", from: 17, to: 28, tone: "head" }],
    tip: "لاحظ الترتيب في كل مثال: الحدث القاطع يأتي بعد when بصيغة Past Simple.",
  },

  {
    kind: "lesson",
    section: WHEN_S,
    mascot: "🔄",
    sourceIndex: SEC.s8,
    step: "8",
    title: "هل يمكن عكس الجملة؟",
    blocks: [{ t: "lab", lab: "flipOrder", covers: [0, 10] }],
  },

  // ---------------- WHILE ----------------
  {
    kind: "lesson",
    section: WHILE_S,
    mascot: "⭐",
    sourceIndex: SEC.s9,
    step: "9",
    title: "WHILE — بينما",
    lead: "فعل مستمر يحدث بالتزامن مع فعل آخر.",
    blocks: [{ t: "lab", lab: "parallelTracks", covers: [0, 17] }],
  },

  {
    kind: "lesson",
    section: WHILE_S,
    mascot: "🔥",
    sourceIndex: SEC.s9,
    title: "أمثلة متوازية مع WHILE",
    blocks: [{ t: "units", from: 17, to: 24, tone: "head" }],
  },

  {
    kind: "lesson",
    section: WHILE_S,
    mascot: "⚔️",
    sourceIndex: SEC.s10,
    step: "10",
    title: "WHEN مقابل WHILE",
    lead: "مثالان متشابهان… وفرق واحد مهم.",
    blocks: [{ t: "lab", lab: "whenVsWhile", covers: [0, 12] }],
  },

  {
    kind: "lesson",
    section: WHILE_S,
    mascot: "🧠",
    sourceIndex: SEC.s10,
    title: "قاعدة عملية للاختيار",
    blocks: [
      { t: "units", from: 12, to: 18, tone: "head" },
      { t: "strip", items: ["while + مستمر", "was/were + ing", "when + حدث", "Past Simple"], tone: "neutral" },
    ],
  },

  {
    kind: "lesson",
    section: WHILE_S,
    mascot: "⚠️",
    sourceIndex: SEC.s11,
    step: "11",
    title: "لكن while ليست دائمًا Past Continuous!",
    blocks: [{ t: "lab", lab: "whileNuance", covers: [0, 10] }],
    tip: "المعنى هو الذي يحدد — لا الكلمة وحدها.",
  },

  // ---------------- الأنماط الأربعة ----------------
  {
    kind: "lesson",
    section: PATTERNS,
    mascot: "🔥",
    sourceIndex: SEC.s12,
    step: "12",
    title: "الأنماط الأربعة — لوحة التحكم",
    lead: "اختر نمطًا وشاهد التركيب والمعنى والمثال والخط الزمني.",
    blocks: [{ t: "lab", lab: "fourPatternBoard", covers: [0, 13] }],
  },

  // ---------------- بناء القصة ----------------
  {
    kind: "lesson",
    section: STORY,
    mascot: "🎬",
    sourceIndex: SEC.s13,
    step: "13",
    title: "Background vs Main Event",
    lead: "قصة واحدة… وبطلان: الخلفية والحدث.",
    blocks: [{ t: "lab", lab: "storyDirector", covers: [0, 19] }],
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "🧠",
    sourceIndex: SEC.s13,
    title: "لماذا هذا مهم؟ — المسرح والحركة",
    blocks: [{ t: "units", from: 19, tone: "head" }],
    tip: "Past Continuous يبني المسرح — Past Simple يحرك القصة.",
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "📖",
    sourceIndex: SEC.s14,
    step: "14",
    title: "قصة قصيرة محللة — Emma",
    blocks: [{ t: "units", from: 0, to: 2, tone: "en" }],
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "🔎",
    sourceIndex: SEC.s14,
    title: "تحليل قصة Emma — من فعل ماذا؟",
    blocks: [{ t: "lab", lab: "emmaAnalysis", covers: [2, 24] }],
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "⭐",
    sourceIndex: SEC.s15,
    step: "15",
    title: "أفعال متزامنة — خطان يعملان معًا",
    blocks: [{ t: "lab", lab: "parallelPairs", covers: [0, 10] }],
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "🧠",
    sourceIndex: SEC.s16,
    step: "16",
    title: "أكثر من فعل في الوقت نفسه — ثلاثة مسارات",
    blocks: [{ t: "lab", lab: "simultaneousLab", covers: [0, 11] }],
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "⭐",
    sourceIndex: SEC.s17,
    step: "17",
    title: "حدث يقطع حدثًا آخر",
    lead: "أشهر استخدام للزمنين: فعل جارٍ + حدث يقطعه.",
    blocks: [{ t: "lab", lab: "interruptionLab", covers: [0, 19] }],
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "🧠",
    sourceIndex: SEC.s17,
    title: "النموذج البصري للقطع",
    blocks: [{ t: "lab", lab: "interruptionModel", covers: [19, 26] }],
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "🔥",
    sourceIndex: SEC.s18,
    step: "18",
    title: "ليس كل Past Simple فعلًا «يقطع» Continuous",
    blocks: [{ t: "lab", lab: "notEverySimple", covers: [0, 11] }],
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "⭐",
    sourceIndex: SEC.s19,
    step: "19",
    title: "سلسلة الأحداث — Past Simple يحكي",
    blocks: [{ t: "lab", lab: "sequenceScene", covers: [0, 11] }],
  },

  {
    kind: "lesson",
    section: STORY,
    mascot: "🧠",
    sourceIndex: SEC.s19,
    title: "الفرق العميق — تسلسل أم كاميرا داخل الحدث؟",
    blocks: [{ t: "lab", lab: "deepDifference", covers: [11, 20] }],
  },

  // ---------------- مقارنة دقيقة ----------------
  {
    kind: "lesson",
    section: CAREFUL,
    mascot: "⚔️",
    sourceIndex: SEC.s20,
    step: "20",
    title: "Compare Carefully — A / B / C / D",
    lead: "الأربع جمل صحيحة… لكن كل واحدة تصور الماضي بطريقة مختلفة.",
    blocks: [{ t: "lab", lab: "compareFour", covers: [0, 10] }],
  },

  {
    kind: "lesson",
    section: CAREFUL,
    mascot: "🧠",
    sourceIndex: SEC.s20,
    title: "ماذا تعني كل جملة؟",
    blocks: [{ t: "lab", lab: "compareMeanings", covers: [10, 18] }],
  },

  // ---------------- الأخطاء والتحكم ----------------
  {
    kind: "lesson",
    section: ERRORS,
    mascot: "🚨",
    sourceIndex: SEC.s21,
    step: "21",
    title: "أخطاء شائعة جدًا — Error Detective",
    lead: "اقرأ الخطأ، ثم اضغط «تحقق من الإجابات» لرؤية السبب والتصحيح.",
    blocks: [{ t: "lab", lab: "errorsDetective", covers: [0, 24] }],
  },

  {
    kind: "lesson",
    section: ERRORS,
    mascot: "🧠",
    sourceIndex: SEC.s22,
    step: "22",
    title: "انتبه إلى WAS / WERE — لوحة التحكم",
    blocks: [{ t: "lab", lab: "wasWereControl", covers: [0, 21] }],
  },

  {
    kind: "lesson",
    section: ERRORS,
    mascot: "🔥",
    sourceIndex: SEC.s23,
    step: "23",
    title: "Past Continuous مع الأسماء",
    blocks: [{ t: "lab", lab: "nounAgreement", covers: [0, 16] }],
    tip: "الـ -ing لا يتغير أبدًا؛ الذي يتغير هو was / were.",
  },

  // ---------------- المعنى والتعبيرات ----------------
  {
    kind: "lesson",
    section: MEANING,
    mascot: "⭐",
    sourceIndex: SEC.s24,
    step: "24",
    title: "Time Expressions — عبارات مفيدة",
    blocks: [{ t: "lab", lab: "timeExpressions", covers: [0, 12] }],
  },

  {
    kind: "lesson",
    section: MEANING,
    mascot: "⚠️",
    sourceIndex: SEC.s24,
    title: "لكنها ليست قوانين آلية",
    blocks: [{ t: "lab", lab: "timeNotRules", covers: [12, 20] }],
    tip: "السياق أهم من الكلمة.",
  },

  {
    kind: "lesson",
    section: MEANING,
    mascot: "🧠",
    sourceIndex: SEC.s25,
    step: "25",
    title: "تحدي «المعنى أولًا»",
    lead: "اختر الزمن المناسب لكل جملة… ثم تحقق.",
    blocks: [{ t: "lab", lab: "meaningFirst", covers: [0, 28] }],
  },

  // ---------------- التدريبات ----------------
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧪",
    sourceIndex: SEC.s26,
    covers: [0, 1],
    badge: "EXERCISE 26",
    title: "Exercise — Choose",
    subtitle: "اختر Past Simple أو Past Continuous.",
    ex: { type: "choose" },
  },

  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    sourceIndex: SEC.s27,
    covers: [0, 7],
    badge: "EXERCISE 27",
    title: "Exercise — Complete the Story",
    subtitle: "ضع الفعل في الشكل الصحيح — هنا ستستخدم الزمنين معًا.",
    ex: { type: "completeStory" },
  },

  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🕵️",
    sourceIndex: SEC.s28,
    covers: [0, 8],
    badge: "EXERCISE 28",
    title: "Grammar Detective",
    subtitle: "هناك عدة أخطاء… اكتشفها.",
    ex: { type: "grammarDetective" },
  },

  {
    kind: "lesson",
    section: PRACTICE,
    mascot: "🚀",
    sourceIndex: SEC.s29,
    step: "29",
    title: "IQ200 Challenge — متى نختار كل واحدة؟",
    blocks: [{ t: "lab", lab: "iq200Match", covers: [0, 13] }],
  },

  {
    kind: "lesson",
    section: PRACTICE,
    mascot: "🧠",
    sourceIndex: SEC.s30,
    step: "30",
    title: "IQ200 — هل الجملتان صحيحتان؟",
    lead: "أجب أولًا… ثم اضغط «تحقق من الإجابات».",
    blocks: [{ t: "lab", lab: "iq200Both", covers: [0, 14] }],
  },

  // ---------------- التحديات النهائية ----------------
  {
    kind: "ex",
    section: CHALLENGE,
    mascot: "🏆",
    sourceIndex: SEC.s31,
    covers: [0, 17],
    badge: "FINAL BOSS",
    title: "Build the Movie — اكتب قصتك",
    subtitle: "قصة من 10–12 جملة بالمشهد المصدر: الساعة 10 مساءً، المطر، الناس، وصوت غريب.",
    ex: { type: "finalBoss" },
  },

  {
    kind: "lesson",
    section: CHALLENGE,
    mascot: "🎬",
    sourceIndex: SEC.s31,
    title: "مثال قصير لفهم طريقة البناء",
    blocks: [{ t: "lab", lab: "storyLayers", covers: [17, 33] }],
    tip: "استخدم القصة كنموذج فقط — لا تنسخها؛ ابنِ فيلمك الخاص.",
  },

  {
    kind: "lesson",
    section: CHALLENGE,
    mascot: "🧠",
    sourceIndex: SEC["master-map"],
    covers: [0, 17],
    title: "MASTER MAP — الخريطة الكاملة",
    blocks: [{ t: "lab", lab: "masterMap", covers: [0, 17] }],
  },

  {
    kind: "lesson",
    section: CHALLENGE,
    mascot: "🔥",
    sourceIndex: SEC["golden-rule"],
    covers: [0, 16],
    title: "القاعدة الذهبية للدرس 26",
    blocks: [{ t: "lab", lab: "goldenRule", covers: [0, 16] }],
  },

  {
    kind: "lesson",
    section: CHALLENGE,
    mascot: "🏅",
    sourceIndex: SEC["final-check"],
    covers: [0, 7],
    title: "FINAL CHECK — أكمل من ذاكرتك",
    blocks: [{ t: "lab", lab: "finalCheck", covers: [0, 7] }],
  },

  // ---------------- الخاتمة ----------------
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي — الدرس 26" },
  { kind: "closing", section: END, mascot: "🏆", sourceIndex: SEC.closing, covers: [0, 1], title: "أحسنت! — LESSON 26 COMPLETE" },
];

export const SLIDE_COUNT = SLIDES.length;

// أخطاء مقصودة (للفحص): يجب أن تظهر في الدرس كما وردت في المصدر — لا تُصحَّح بصمت.
export const INTENTIONALLY_WRONG_26: string[] = [
  "I was played football.",
  "They were play football.",
  "Did you were sleeping?",
  "She was study when I called.",
  "I was sleeping when the phone was rang.",
  "Last night, I was watched TV when my sister called me.",
  "She were studying in her room while I was watched a movie.",
  "We were looked at each other and started laughing.",
];
