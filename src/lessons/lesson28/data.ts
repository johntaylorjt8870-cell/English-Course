// ============================================================
// الدرس 28 — Past Perfect vs Past Simple
// 🧠 IQ200 — ترتيب الأحداث في الماضي باحتراف
//
// المصدر المورّد هو المرجع الحرفي: لا اختصار ولا إعادة صياغة ولا حذف.
// كل قسم مرقّم من ① إلى ㊵ مسجَّل في SOURCE_SECTIONS ويُعرض فعليًا
// في Lesson28.tsx، والفحص الآلي (scripts/audit-lesson28.mjs) يتحقق من
// وصول كل وحدة إلى الـ DOM الحقيقي — لا يكفي وجودها في هذا الملف.
// ============================================================

export const LESSON_TITLE_28 = "الدرس 28: Past Perfect vs Past Simple";
export const LESSON_SUBTITLE_28 = "🧠 IQ200 — ترتيب الأحداث في الماضي باحتراف";
export const LAB_NAME_28 = "THE TIMELINE MASTER";
export const LAB_MOTTO_28 =
  "📸 What happened? · 🎥 What was happening? · ⏪ What had happened before that?";


// ============================================================
// سجل المصدر (Source Ledger)
// كل قسم = عنوان من المصدر + وحداته الحرفية سطرًا سطرًا.
// ============================================================
export type SourceSection28 = {
  id: string;
  num?: number;
  title: string;
  /** وحدات حرفية من المصدر — كل سطر كما هو. */
  units: string[];
  /** وحدات لا تُعرض إلا بعد «تحقق» الطالب (لا كشف مسبق). */
  revealUnits?: string[];
};

export const SOURCE_SECTIONS: SourceSection28[] = [
  {
    id: "cover",
    title: "الغلاف — الدرس 28: Past Perfect vs Past Simple",
    units: ["الدرس 28: Past Perfect vs Past Simple", "Past Perfect vs Past Simple"],
  },
  {
    id: "bridge",
    title: "الافتتاح — 🧠 IQ200: ترتيب الأحداث في الماضي باحتراف",
    units: [
      "🧠 IQ200 — ترتيب الأحداث في الماضي باحتراف",
      "في الدرس 27 تعلمنا Past Perfect، لكن الآن نحتاج إلى خطوة مهمة جدًا:",
      "متى أستخدم Past Simple ومتى أستخدم Past Perfect؟",
      "لأن معرفة قاعدة:",
      "had + V3",
      "وحدها لا تكفي.",
      "المهارة الحقيقية هي أن تستطيع النظر إلى قصة أو موقف، ثم تعرف:",
      "① ماذا حدث أولًا؟",
      "② ماذا حدث بعده؟",
      "③ هل أحتاج فعلًا إلى Past Perfect؟",
      "④ هل Past Simple يكفي؟",
      "⑤ هل يوجد حدث كان مستمرًا؟ وهنا يدخل Past Continuous.",
    ],
  },
  {
    id: "objectives",
    title: "🎯 أهداف الدرس",
    units: [
      "بنهاية هذا الدرس ستستطيع:",
      "① التمييز بين Past Simple و Past Perfect.",
      "② معرفة متى يكون Past Perfect ضروريًا.",
      "③ معرفة متى يكون Past Simple طبيعيًا وأفضل.",
      "④ فهم before و after و by the time.",
      "⑤ فهم already و just و never في سياق الماضي.",
      "⑥ ترتيب ثلاثة أحداث ماضية.",
      "⑦ دمج Past Simple + Past Continuous + Past Perfect.",
      "⑧ اكتشاف أخطاء متقدمة.",
      "⑨ كتابة قصة زمنية واضحة.",
      "⑩ حل أسئلة IQ200 تعتمد على المعنى وليس على الحفظ.",
    ],
  },
  {
    id: "s1",
    num: 1,
    title: "① 🧠 أول سؤال: ماذا حدث أولًا؟",
    units: [
      "هذه هي أهم قاعدة في الدرس كله.",
      "إذا كان لدينا حدثان في الماضي:",
      "حدث أول ← حدث ثانٍ",
      "فكر هكذا:",
      "الحدث الأول = Past Perfect",
      "الحدث الثاني = Past Simple",
      "مثال:",
      "The train had left before I arrived.",
      "القطار كان قد غادر قبل أن أصل.",
      "الترتيب:",
      "① The train left.",
      "② I arrived.",
      "لذلك:",
      "had left = Past Perfect",
      "arrived = Past Simple",
    ],
  },
  {
    id: "s2",
    num: 2,
    title: "② 📸 Past Simple",
    units: [
      "Past Simple يخبرنا عن حدث وقع في الماضي.",
      "مثال:",
      "I visited my uncle yesterday.",
      "زرت عمي أمس.",
      "لا يوجد هنا حدث ماضٍ آخر نحتاج إلى مقارنته.",
      "لذلك Past Simple كافٍ.",
    ],
  },
  {
    id: "s3",
    num: 3,
    title: "③ ⏪ Past Perfect",
    units: [
      "Past Perfect يخبرنا أن حدثًا وقع قبل حدث ماضٍ آخر.",
      "مثال:",
      "I had visited my uncle before I went to the museum.",
      "كنت قد زرت عمي قبل أن أذهب إلى المتحف.",
      "الترتيب:",
      "① visited uncle",
      "② went to museum",
      "لذلك:",
      "had visited = الحدث الأقدم",
      "went = الحدث الأحدث",
    ],
  },
  {
    id: "s4",
    num: 4,
    title: "④ 🔥 المقارنة المباشرة",
    units: [
      "انظر:",
      "I lost my key.",
      "= أضعت مفتاحي.",
      "Past Simple.",
      "أما:",
      "I had lost my key before I arrived home.",
      "= كنت قد أضعت مفتاحي قبل أن أصل إلى المنزل.",
      "هنا لدينا حدثان:",
      "① lost my key",
      "② arrived home",
      "إذن نحتاج إلى توضيح أن ضياع المفتاح حدث أولًا.",
    ],
  },
  {
    id: "s5",
    num: 5,
    title: "⑤ 🧠 لا تستخدم Past Perfect لمجرد أن الحدث قديم",
    units: [
      "هذه نقطة مهمة جدًا.",
      "خطأ:",
      "Yesterday, I had visited my grandmother. ❌",
      "إذا كان لدينا مجرد حدث واحد في الماضي، نستخدم:",
      "Yesterday, I visited my grandmother. ✅",
      "Past Perfect ليس معناه:",
      "«حدث قديم جدًا.»",
      "بل:",
      "«حدث وقع قبل حدث ماضٍ آخر.»",
    ],
  },
  {
    id: "s6",
    num: 6,
    title: "⑥ 🕰️ خط الزمن",
    units: [
      "احفظ هذا الشكل:",
      "الماضي الأقدم ← الحدث الأول ← الحدث الثاني ← الآن",
      "مثال:",
      "The shop had closed → I arrived → NOW",
      "الجملة:",
      "When I arrived, the shop had closed.",
      "عندما وصلت، كان المتجر قد أغلق.",
    ],
  },
  {
    id: "s7",
    num: 7,
    title: "⑦ 🎯 متى يكون Past Perfect مفيدًا جدًا؟",
    units: [
      "عندما يكون ترتيب الأحداث غير واضح بدون استخدامه.",
      "مثال:",
      "When Maya arrived, Daniel left.",
      "قد نفهم:",
      "Maya arrived → Daniel left.",
      "لكن:",
      "When Maya arrived, Daniel had left.",
      "تعني:",
      "Daniel left → Maya arrived.",
      "لاحظ أن كلمة واحدة:",
      "had",
      "غيّرت ترتيب الأحداث.",
    ],
  },
  {
    id: "s8",
    num: 8,
    title: "⑧ ⚡ اختبار سريع للعقل",
    units: [
      "اقرأ:",
      "When I opened the box, someone had taken the necklace.",
      "اسأل:",
      "ماذا حدث أولًا؟",
      "أخذ القلادة.",
      "ماذا حدث ثانيًا؟",
      "فتحت الصندوق.",
      "إذن:",
      "Someone had taken the necklace.",
      "I opened the box.",
    ],
  },
  {
    id: "s9",
    num: 9,
    title: "⑨ ⭐ before",
    units: [
      "before = قبل",
      "مثال:",
      "The students had left before the teacher arrived.",
      "الطلاب كانوا قد غادروا قبل أن يصل المعلم.",
      "الترتيب:",
      "① students left",
      "② teacher arrived",
      "لكن انتبه:",
      "يمكن أن نقول أيضًا:",
      "The students left before the teacher arrived.",
      "هذه الجملة صحيحة.",
      "لماذا؟",
      "لأن كلمة before توضح ترتيب الأحداث أصلًا.",
      "إذن Past Perfect ليس دائمًا إجباريًا.",
    ],
  },
  {
    id: "s10",
    num: 10,
    title: "⑩ 🧠 لماذا نستخدم Past Perfect إذن؟",
    units: [
      "لإبراز الحدث الأقدم.",
      "قارن:",
      "The students left before the teacher arrived.",
      "ترتيب الأحداث واضح بسبب before.",
      "أما:",
      "When the teacher arrived, the students had left.",
      "هنا Past Perfect يوضح فورًا:",
      "الطلاب غادروا قبل وصول المعلم.",
    ],
  },
  {
    id: "s11",
    num: 11,
    title: "⑪ 🔄 after",
    units: [
      "after = بعد",
      "مثال:",
      "After I had finished my homework, I played a game.",
      "الترتيب:",
      "① finished homework",
      "② played a game",
      "لكن يمكن أيضًا:",
      "After I finished my homework, I played a game.",
      "الجملة صحيحة أيضًا.",
      "الفكرة:",
      "after نفسها تساعد على تحديد الترتيب.",
    ],
  },
  {
    id: "s12",
    num: 12,
    title: "⑫ 🧠 قاعدة مهمة جدًا",
    units: [
      "لا تفكر:",
      "before = لازم Past Perfect",
      "أو:",
      "after = لازم Past Perfect",
      "هذا غير صحيح.",
      "الأفضل أن تفكر:",
      "ما العلاقة الزمنية بين الأحداث؟",
      "ثم اختر الزمن المناسب.",
    ],
  },
  {
    id: "s13",
    num: 13,
    title: "⑬ ⏳ by the time",
    units: [
      "by the time = بحلول الوقت الذي",
      "هذه من أقوى الإشارات إلى Past Perfect عندما نتحدث عن حدث اكتمل قبل نقطة ماضية.",
      "مثال:",
      "By the time we arrived, the movie had started.",
      "عندما وصلنا، كان الفيلم قد بدأ.",
      "الترتيب:",
      "① movie started",
      "② we arrived",
      "مثال:",
      "By the time the firefighters arrived, the fire had spread.",
      "عندما وصل رجال الإطفاء، كان الحريق قد انتشر.",
      "① fire spread",
      "② firefighters arrived",
    ],
  },
  {
    id: "s14",
    num: 14,
    title: "⑭ 🔥 already",
    units: [
      "already = بالفعل",
      "مثال:",
      "When I called Lina, she had already gone to bed.",
      "عندما اتصلت بلينا، كانت قد ذهبت إلى النوم بالفعل.",
      "الترتيب:",
      "① Lina went to bed.",
      "② I called her.",
      "مثال آخر:",
      "When we reached the stadium, the game had already started.",
      "عندما وصلنا إلى الملعب، كانت المباراة قد بدأت بالفعل.",
    ],
  },
  {
    id: "s15",
    num: 15,
    title: "⑮ ⚡ just",
    units: [
      "مثال:",
      "When I entered the room, the teacher had just arrived.",
      "عندما دخلت الغرفة، كان المعلم قد وصل للتو.",
      "الترتيب:",
      "① teacher arrived",
      "② I entered",
      "والحدثان قريبان جدًا في الزمن.",
    ],
  },
  {
    id: "s16",
    num: 16,
    title: "⑯ 🧠 Past Simple + Past Perfect",
    units: [
      "هذه التركيبة مهمة جدًا في القصص.",
      "مثال:",
      "I arrived at the airport, but my flight had already left.",
      "I arrived",
      "→ Past Simple",
      "had left",
      "→ Past Perfect",
      "المعنى:",
      "وصلت إلى المطار، لكن رحلتي كانت قد غادرت بالفعل.",
      "مثال:",
      "Sara opened the refrigerator, but someone had eaten all the cake.",
      "opened",
      "→ Past Simple",
      "had eaten",
      "→ Past Perfect",
      "الترتيب:",
      "① someone ate the cake",
      "② Sara opened the refrigerator",
    ],
  },
  {
    id: "s17",
    num: 17,
    title: "⑰ 🎥 أضف Past Continuous",
    units: [
      "الآن لدينا ثلاثة أزمنة:",
      "Past Simple",
      "→ حدث",
      "Past Continuous",
      "→ شيء كان يحدث",
      "Past Perfect",
      "→ شيء كان قد حدث قبل نقطة ماضية",
      "مثال:",
      "I was walking home when I realized that I had forgotten my wallet.",
      "was walking",
      "→ Past Continuous",
      "realized",
      "→ Past Simple",
      "had forgotten",
      "→ Past Perfect",
      "المعنى:",
      "كنت أمشي إلى المنزل عندما أدركت أنني كنت قد نسيت محفظتي.",
    ],
  },
  {
    id: "s18",
    num: 18,
    title: "⑱ 🧠 تحليل الجملة السابقة",
    units: [
      "الجملة:",
      "I was walking home when I realized that I had forgotten my wallet.",
      "لدينا ثلاث طبقات زمنية:",
      "🎥 was walking",
      "→ كنت في منتصف عملية المشي.",
      "📸 realized",
      "→ حدث الإدراك.",
      "⏪ had forgotten",
      "→ نسيان المحفظة حدث قبل لحظة الإدراك.",
      "خط الزمن:",
      "forgot wallet",
      "↓",
      "was walking",
      "↓",
      "realized",
      "↓",
      "NOW",
      "هذه هي الطريقة التي يفكر بها المتقدمون في الأزمنة.",
    ],
  },
  {
    id: "s19",
    num: 19,
    title: "⑲ 🔥 ثلاثة أحداث في الماضي",
    units: [
      "لنأخذ قصة:",
      "When I arrived at the station, the train had already left, and people were waiting for the next train.",
      "لدينا:",
      "① train had left",
      "→ Past Perfect",
      "② I arrived",
      "→ Past Simple",
      "③ people were waiting",
      "→ Past Continuous",
      "لماذا؟",
      "لأن:",
      "القطار غادر قبل وصولي.",
      "أما الناس فكانوا في حالة انتظار عند تلك اللحظة.",
    ],
  },
  {
    id: "s20",
    num: 20,
    title: "⑳ 🧩 قاعدة «آلة الزمن»",
    units: [
      "عندما تقرأ قصة، ضع علامة على كل حدث.",
      "مثال:",
      "Emma entered the kitchen.",
      "Past Simple.",
      "Her brother was making breakfast.",
      "Past Continuous.",
      "She realized that he had already prepared the coffee.",
      "Past Perfect.",
      "الآن اسأل:",
      "ما الحدث الأقدم؟",
      "had prepared",
      "ما الحدث المستمر؟",
      "was making",
      "ما الحدث الذي وقع كنقطة في القصة؟",
      "entered / realized",
    ],
  },
  {
    id: "s21",
    num: 21,
    title: "㉑ 🚨 الخطأ الشائع الأول",
    units: [
      "لا تقل:",
      "I had went. ❌",
      "الصحيح:",
      "I had gone. ✅",
      "تذكر:",
      "go → went → gone",
    ],
  },
  {
    id: "s22",
    num: 22,
    title: "㉒ 🚨 الخطأ الشائع الثاني",
    units: [
      "لا تقل:",
      "She had ate. ❌",
      "الصحيح:",
      "She had eaten. ✅",
      "eat → ate → eaten",
    ],
  },
  {
    id: "s23",
    num: 23,
    title: "㉓ 🚨 الخطأ الشائع الثالث",
    units: [
      "لا تقل:",
      "They had saw the movie. ❌",
      "الصحيح:",
      "They had seen the movie. ✅",
      "see → saw → seen",
    ],
  },
  {
    id: "s24",
    num: 24,
    title: "㉔ 🚨 الخطأ الشائع الرابع",
    units: [
      "لا تقل:",
      "Did you had finished? ❌",
      "الصحيح:",
      "Had you finished? ✅",
      "لماذا؟",
      "لأن Past Perfect يستخدم had مباشرة في السؤال.",
      "Had + subject + V3?",
    ],
  },
  {
    id: "s25",
    num: 25,
    title: "㉕ 🚨 الخطأ الشائع الخامس",
    units: [
      "لا تقل:",
      "He didn't had finished. ❌",
      "الصحيح:",
      "He hadn't finished. ✅",
      "أو:",
      "He had not finished. ✅",
    ],
  },
  {
    id: "s26",
    num: 26,
    title: "㉖ 🧠 Past Simple أم Past Perfect؟",
    units: [
      "لنحلل الحالات.",
      "الحالة 1",
      "I visited Paris in 2024.",
      "حدث واحد محدد.",
      "→ Past Simple.",
      "الحالة 2",
      "I had visited Paris before I moved to France.",
      "حدثان في الماضي.",
      "① visited Paris",
      "② moved to France",
      "→ Past Perfect للحدث الأول.",
      "الحالة 3",
      "I visited Paris and took many photos.",
      "هنا حدثان متتاليان:",
      "① visited",
      "② took",
      "ولا نحتاج بالضرورة إلى Past Perfect.",
      "لأن القصة تقدم الأحداث بالتتابع.",
    ],
  },
  {
    id: "s27",
    num: 27,
    title: "㉗ 🔥 الفرق بين «sequence» و «back reference»",
    units: [
      "عندما نحكي قصة:",
      "I woke up, brushed my teeth, ate breakfast, and left the house.",
      "هذه سلسلة أحداث.",
      "كل حدث يأتي بعد الآخر.",
      "Past Simple مناسب جدًا.",
      "لكن:",
      "When I left the house, I realized that I had forgotten my backpack.",
      "هنا نرجع للخلف لنوضح حدثًا سبق لحظة الإدراك.",
      "هذا هو المكان الذي يصبح فيه Past Perfect قويًا.",
    ],
  },
  {
    id: "s28",
    num: 28,
    title: "㉘ 🧠 فكرة متقدمة: Past Perfect = الرجوع خطوة إلى الوراء",
    units: [
      "تخيل أنك في قصة.",
      "القصة وصلت إلى:",
      "I arrived home.",
      "ثم تقول:",
      "I realized that I had left my phone at school.",
      "أنت الآن ترجع إلى حدث سابق:",
      "left my phone",
      "لذلك:",
      "had left",
      "يمكن أن تفكر في Past Perfect كأنه:",
      "⏪ «انتظر! هناك شيء حدث قبل هذه اللحظة.»",
    ],
  },
  {
    id: "s29",
    num: 29,
    title: "㉙ 🕵️ Grammar Detective",
    units: [
      "اقرأ:",
      "When the explorers reached the cave, they discovered that someone had already entered it. They were surprised because the cave was supposed to be empty.",
      "حلل:",
      "reached",
      "→ Past Simple",
      "discovered",
      "→ Past Simple",
      "had entered",
      "→ Past Perfect",
      "were surprised",
      "→ Past Simple",
      "was supposed",
      "→ Past Simple / be structure",
      "لماذا had entered؟",
      "لأن دخول الشخص إلى الكهف حدث قبل وصول المستكشفين.",
    ],
  },
  {
    id: "s30",
    num: 30,
    title: "㉚ 🧪 تمرين 1",
    units: [
      "اختر:",
      "① When I arrived, the meeting ______.",
      "A) started",
      "B) had started",
      "② She ______ her homework before she went outside.",
      "A) finished",
      "B) had finished",
      "③ Yesterday, we ______ our cousins.",
      "A) visited",
      "B) had visited",
      "④ By the time he called, I ______ to bed.",
      "A) went",
      "B) had gone",
      "⑤ They ______ football when it started raining.",
      "A) played",
      "B) were playing",
      "الإجابات:",
    ],
    revealUnits: [
      "① had started",
      "② had finished",
      "③ visited",
      "④ had gone",
      "⑤ were playing",
    ],
  },
  {
    id: "s31",
    num: 31,
    title: "㉛ 🧪 تمرين 2 — حدد الحدث الأول",
    units: [
      "1",
      "When I arrived, Tom had eaten lunch.",
      "الحدث الأول:",
      "Tom ate lunch.",
      "الحدث الثاني:",
      "I arrived.",
      "2",
      "When Sara called me, I had finished my work.",
      "الحدث الأول:",
      "I finished my work.",
      "الحدث الثاني:",
      "Sara called.",
      "3",
      "When the police arrived, the thief had escaped.",
      "الحدث الأول:",
      "The thief escaped.",
      "الحدث الثاني:",
      "The police arrived.",
    ],
  },
  {
    id: "s32",
    num: 32,
    title: "㉜ 🧪 تمرين 3 — صحح الأخطاء",
    units: [
      "① When I arrived, the bus had went.",
      "② She had ate before the lesson.",
      "③ They had saw the movie before.",
      "④ Did he had left?",
      "⑤ He didn't had finished.",
      "الإجابات:",
    ],
    revealUnits: [
      "① When I arrived, the bus had gone.",
      "② She had eaten before the lesson.",
      "③ They had seen the movie before.",
      "④ Had he left?",
      "⑤ He hadn't finished.",
    ],
  },
  {
    id: "s33",
    num: 33,
    title: "㉝ 🚀 IQ200 Challenge",
    units: [
      "أي جملة تعني أن John وصل أولًا؟",
      "A. When John arrived, Mary had left.",
      "B. When Mary arrived, John had left.",
      "فكر جيدًا.",
      "الإجابة:",
    ],
    revealUnits: [
      "A",
      "لأن:",
      "Mary had left → Mary left أولًا.",
      "John arrived → بعد ذلك.",
      "إذن John لم يصل أولًا.",
    ],
  },
  {
    id: "s34",
    num: 34,
    title: "㉞ 🧠 تحدي أصعب",
    units: [
      "أي جملة تعني أن Sarah وصلت قبل أن يغادر Tom؟",
      "A. When Sarah arrived, Tom had left.",
      "B. When Tom left, Sarah had arrived.",
    ],
    revealUnits: [
      "الجملة A تعني:",
      "Tom left → Sarah arrived.",
      "الجملة B تعني:",
      "Sarah arrived → Tom left.",
      "إذن:",
      "B",
      "هي التي تعني أن Sarah وصلت أولًا.",
    ],
  },
  {
    id: "s35",
    num: 35,
    title: "㉟ 🔥 IQ200 — ثلاثة أحداث",
    units: [
      "اقرأ:",
      "When Daniel entered the laboratory, the scientists were discussing the experiment. They had already completed the first stage, so Daniel joined the second stage.",
      "حدد الأحداث:",
      "① had completed",
      "② entered",
      "③ were discussing",
      "④ joined",
      "ما الحدث الذي حدث قبل دخول Daniel؟",
      "had completed",
      "ما الشيء الذي كان يحدث عندما دخل؟",
      "were discussing",
      "ما الحدث الذي جاء بعد ذلك؟",
      "joined",
    ],
  },
  {
    id: "s36",
    num: 36,
    title: "㊱ 🧠 اختبار المنطق الزمني",
    units: [
      "الجملة:",
      "When I woke up, my brother had already left, my mother was preparing breakfast, and my father read the newspaper.",
      "لدينا مشكلة صغيرة.",
      "هل «my father read the newspaper» تعني أنه كان يقرأ الجريدة في تلك اللحظة؟",
      "ليس بالضرورة.",
      "إذا أردنا التعبير عن نشاط كان مستمرًا عند استيقاظي:",
      "My father was reading the newspaper.",
      "فتصبح الصورة:",
      "My brother had left.",
      "→ حدث قبل استيقاظي.",
      "My mother was preparing breakfast.",
      "→ كان يحدث في تلك اللحظة.",
      "My father was reading the newspaper.",
      "→ كان يحدث في تلك اللحظة.",
      "I woke up.",
      "→ حدث رئيسي.",
    ],
  },
  {
    id: "s37",
    num: 37,
    title: "㊲ 🎬 بناء مشهد كامل",
    units: [
      "لنكتب مشهدًا متقدمًا:",
      "When Alex entered the house, his sister was sitting in the living room. She was reading a book, and their parents were preparing dinner. Alex looked around and realized that someone had opened the back door. The family had never left it unlocked before.",
      "تحليل الأزمنة:",
      "entered",
      "→ Past Simple",
      "was sitting",
      "→ Past Continuous",
      "was reading",
      "→ Past Continuous",
      "were preparing",
      "→ Past Continuous",
      "looked",
      "→ Past Simple",
      "realized",
      "→ Past Simple",
      "had opened",
      "→ Past Perfect",
      "had never left",
      "→ Past Perfect",
      "لاحظ كيف أصبح بإمكاننا الآن بناء قصة حقيقية باستخدام عدة أزمنة.",
    ],
  },
  {
    id: "s38",
    num: 38,
    title: "㊳ 🧠 قاعدة متقدمة جدًا",
    units: [
      "لا تختار الزمن بناءً على كلمة واحدة.",
      "لا تقل:",
      "«رأيت when، إذن يجب أن أستخدم Past Simple.»",
      "خطأ.",
      "ولا تقل:",
      "«رأيت before، إذن يجب أن أستخدم Past Perfect.»",
      "أيضًا خطأ.",
      "اسأل:",
      "ما المعنى الذي أريد التعبير عنه؟",
      "ثم:",
      "هل الحدث مستمر؟",
      "→ Past Continuous",
      "هل هو حدث ماضٍ عادي؟",
      "→ Past Simple",
      "هل وقع قبل حدث ماضٍ آخر؟",
      "→ Past Perfect",
    ],
  },
  {
    id: "s39",
    num: 39,
    title: "㊴ ⚔️ Boss Battle",
    units: [
      "اختر أفضل جملة:",
      "المعنى:",
      "«كنت أركض في الحديقة عندما رأيت كلبًا. أدركت أنني رأيت هذا الكلب من قبل.»",
      "A.",
      "I ran in the park when I saw a dog. I realized that I saw this dog before.",
      "B.",
      "I was running in the park when I saw a dog. I realized that I had seen this dog before.",
      "C.",
      "I had run in the park when I was seeing a dog.",
      "الإجابة:",
    ],
    revealUnits: [
      "B ✅",
      "لماذا؟",
      "I was running",
      "→ النشاط كان مستمرًا.",
      "I saw",
      "→ حدث وقع أثناء ذلك.",
      "I realized",
      "→ حدث ذهني.",
      "I had seen",
      "→ رؤية الكلب حدثت قبل لحظة الإدراك.",
    ],
  },
  {
    id: "s40",
    num: 40,
    title: "㊵ 🏆 التحدي النهائي",
    units: [
      "اكتب قصة بعنوان:",
      "«The Missing Backpack»",
      "يجب أن تحتوي القصة على:",
      "① 4 أفعال Past Simple على الأقل.",
      "② 3 أفعال Past Continuous على الأقل.",
      "③ 3 أفعال Past Perfect على الأقل.",
      "④ when",
      "⑤ while",
      "⑥ before أو after",
      "⑦ already",
      "⑧ جملة تحتوي على حدثين أحدهما أقدم من الآخر.",
      "⑨ حدث مفاجئ.",
      "⑩ نهاية منطقية.",
      "حاول أن تجعل القارئ قادرًا على رسم خط زمني للأحداث دون أن تشرح له الترتيب مباشرة.",
    ],
  },
  {
    id: "summary",
    title: "🧠 ملخص الدرس",
    units: [
      "Past Simple:",
      "حدث وقع في الماضي.",
      "I visited the museum.",
      "Past Continuous:",
      "شيء كان يحدث في لحظة ماضية.",
      "I was visiting the museum when you called.",
      "Past Perfect:",
      "شيء كان قد حدث قبل حدث ماضٍ آخر.",
      "I had visited the museum before you called.",
    ],
  },
  {
    id: "golden",
    title: "🏆 القاعدة الذهبية",
    units: [
      "عندما ترى حدثين في الماضي، لا تسأل:",
      "«أي زمن حفظت؟»",
      "اسأل:",
      "ما ترتيب الأحداث؟",
      "إذا كان:",
      "الحدث الأول ← الحدث الثاني",
      "فيمكن أن يكون:",
      "Past Perfect ← Past Simple",
      "وإذا كان الحدث الأول مستمرًا عندما وقع الحدث الثاني:",
      "Past Continuous + Past Simple",
      "وإذا كنت تسرد أحداثًا متتابعة:",
      "Past Simple + Past Simple + Past Simple",
    ],
  },
  {
    id: "iqfinal",
    title: "🧠 IQ200 FINAL CHALLENGE",
    units: [
      "حلل هذه الجملة دون ترجمة حرفية:",
      "When I arrived at the airport, the plane had already taken off, people were running toward the gates, and an employee was talking to a confused passenger.",
      "حدد:",
      "① الحدث الذي حدث قبل وصولي.",
      "② الشيئين اللذين كانا يحدثان عند وصولي.",
      "③ الزمن المستخدم لكل فعل.",
      "الإجابة:",
    ],
    revealUnits: [
      "① The plane had already taken off.",
      "→ Past Perfect",
      "② People were running.",
      "→ Past Continuous",
      "③ An employee was talking.",
      "→ Past Continuous",
      "④ I arrived.",
      "→ Past Simple",
      "وهنا أصبحت الصورة كاملة:",
      "⏪ حدث أقدم:",
      "The plane had taken off.",
      "📸 حدث الوصول:",
      "I arrived.",
      "🎥 خلفية مستمرة:",
      "People were running.",
      "🎥 خلفية مستمرة:",
      "An employee was talking.",
      "وهذه هي النقلة من حفظ الأزمنة إلى التحكم الحقيقي بها.",
    ],
  },
  {
    id: "closing",
    title: "الخاتمة — LESSON 28 COMPLETE",
    units: [
      "أكملت الدرس 28: Past Perfect vs Past Simple. الآن تختار الزمن من ترتيب الأحداث لا من حفظ القواعد: 📸 حدث، 🎥 شيء كان يحدث، ⏪ شيء كان قد حدث قبل ذلك.",
    ],
  },
];

export const SOURCE_NUMBERED_COUNT = 40;
export const SOURCE_LEDGER_COUNT = SOURCE_SECTIONS.length;

/** أرقام أقسام المصدر 1–40 مرتبة — تُستخدم في الترويسة والتدقيق. */
export const SOURCE_NUMBERS: number[] = SOURCE_SECTIONS.filter((s) => s.num !== undefined).map(
  (s) => s.num as number
);

export type SectionKey = string;
export const SEC: Record<SectionKey, number> = SOURCE_SECTIONS.reduce<Record<string, number>>(
  (acc, s, i) => {
    acc[s.id] = i;
    return acc;
  },
  {}
);

/** وحدات قسم ما — تُستخدم في المكوّنات والفحص الآلي. */
export function unitsOf(id: SectionKey): string[] {
  return SOURCE_SECTIONS[SEC[id]].units;
}
export function unit(id: SectionKey, index: number): string {
  return unitsOf(id)[index];
}

// ============================================================
// Source Logic Note — القسم ㉝ (IQ200 Challenge — John / Mary)
//
// سؤال المصدر وخياراته وإجابته محفوظة حرفيًا في سجل المصدر أعلاه:
//   السؤال: أي جملة تعني أن John وصل أولًا؟
//   A. When John arrived, Mary had left.   B. When Mary arrived, John had left.
//   إجابة المصدر: A
//
// المشكلة المنطقية في شرح المصدر (تُعرض للطالب بوسم منصة ولا تُحذف):
//   الجملة A تعني فعليًا: Mary left ← John arrived
//   (ماري غادرت أولًا ثم وصل جون) — أي أن الجملة A لا تثبت أن
//   «جون وصل أولًا» بالمعنى الحرفي، والجملة B كذلك تعني:
//   John left ← Mary arrived. إذن لا توجد جملة في السؤال تثبت
//   «جون وصل أولًا» دون افتراض سياق إضافي. شرح المصدر الداخلي
//   («Mary left أولًا ... إذن John لم يصل أولًا») صحيح بذاته،
//   لكنه لا يدعم نص السؤال الأصلي. المنصة تعرض السؤال والإجابة كما
//   وردا، ثم توضّح القراءة الزمنية الدقيقة لكل جملة.
// ============================================================
export const LOGIC_NOTE_S33 = {
  section: "㉝ 🚀 IQ200 Challenge",
  question: "أي جملة تعني أن John وصل أولًا؟",
  options: [
    "A. When John arrived, Mary had left.",
    "B. When Mary arrived, John had left.",
  ],
  sourceAnswer: "A",
  reading: {
    A: "Mary had left → Mary left أولًا.",
    B: "John had left → John left أولًا.",
  },
  clarification:
    "القراءة الزمنية الدقيقة: الجملة A تعني أن ماري غادرت قبل وصول جون (Mary left ← John arrived)، والجملة B تعني أن جون غادر قبل وصول ماري (John left ← Mary arrived). لذلك لا توجد جملة تثبت حرفيًا أن «جون وصل أولًا» دون سياق إضافي — وإجابة المصدر (A) صحيحة فقط بمعنى أن الجملة A هي التي تجعل «وصول جون» الحدث الأحدث المذكور بعد مغادرة ماري. المنصة تحافظ على السؤال والإجابة كما وردا وتضيف هذا التوضيح حتى لا يتعلم الطالب استنتاجًا زمنيًا خاطئًا.",
} as const;

// ============================================================
// ㉚ — تمرين 1: أسئلة المصدر الخمسة حرفيًا + إجابات المصدر
// ============================================================
export type Mcq28 = {
  n: number;
  stem: string;
  opts: string[];
  answer: number;
  why: string;
};

export const EX28_CHOOSE: Mcq28[] = [
  {
    n: 1,
    stem: "When I arrived, the meeting ______.",
    opts: ["started", "had started"],
    answer: 1,
    why: "الاجتماع بدأ قبل وصولي (الحدث الأقدم) → had started.",
  },
  {
    n: 2,
    stem: "She ______ her homework before she went outside.",
    opts: ["finished", "had finished"],
    answer: 1,
    why: "إنهاء الواجب هو الحدث الأقدم قبل الخروج → had finished.",
  },
  {
    n: 3,
    stem: "Yesterday, we ______ our cousins.",
    opts: ["visited", "had visited"],
    answer: 0,
    why: "حدث ماضٍ واحد بلا مقارنة مع حدث آخر → Past Simple: visited.",
  },
  {
    n: 4,
    stem: "By the time he called, I ______ to bed.",
    opts: ["went", "had gone"],
    answer: 1,
    why: "by the time تعلن أن الذهاب إلى النوم سبق الاتصال → had gone.",
  },
  {
    n: 5,
    stem: "They ______ football when it started raining.",
    opts: ["played", "were playing"],
    answer: 1,
    why: "اللعب كان مستمرًا لحظة بدء المطر (حدث قاطع) → were playing.",
  },
];

// ============================================================
// ㉛ — تمرين 2: حدد الحدث الأول (الأمثلة الثلاثة حرفيًا)
// ============================================================
export const EX28_FIRST_EVENT: {
  n: number;
  sentence: string;
  earlier: string;
  later: string;
}[] = [
  {
    n: 1,
    sentence: "When I arrived, Tom had eaten lunch.",
    earlier: "Tom ate lunch.",
    later: "I arrived.",
  },
  {
    n: 2,
    sentence: "When Sara called me, I had finished my work.",
    earlier: "I finished my work.",
    later: "Sara called.",
  },
  {
    n: 3,
    sentence: "When the police arrived, the thief had escaped.",
    earlier: "The thief escaped.",
    later: "The police arrived.",
  },
];

// ============================================================
// ㉜ — تمرين 3: صحح الأخطاء (الأخطاء الخمسة + تصحيحات المصدر)
// ============================================================
export const EX28_ERRORS: { n: string; wrong: string; fixed: string; why: string }[] = [
  {
    n: "①",
    wrong: "When I arrived, the bus had went.",
    fixed: "When I arrived, the bus had gone.",
    why: "بعد had نحتاج V3: go → went → gone.",
  },
  {
    n: "②",
    wrong: "She had ate before the lesson.",
    fixed: "She had eaten before the lesson.",
    why: "بعد had نحتاج V3: eat → ate → eaten.",
  },
  {
    n: "③",
    wrong: "They had saw the movie before.",
    fixed: "They had seen the movie before.",
    why: "بعد had نحتاج V3: see → saw → seen.",
  },
  {
    n: "④",
    wrong: "Did he had left?",
    fixed: "Had he left?",
    why: "سؤال Past Perfect يبدأ بـ Had مباشرة: Had + subject + V3?",
  },
  {
    n: "⑤",
    wrong: "He didn't had finished.",
    fixed: "He hadn't finished.",
    why: "النفي في Past Perfect: hadn't + V3 — لا نجمع didn't مع had.",
  },
];

// مقاطع قابلة للمس لكل خطأ من أخطاء ㉜ (الجزء الخاطئ واحد في كل جملة)
export const EX28_ERROR_SPOTS: { segs: string[]; answer: number }[] = [
  { segs: ["When I arrived,", "the bus had went."], answer: 1 },
  { segs: ["She", "had ate", "before the lesson."], answer: 1 },
  { segs: ["They", "had saw", "the movie before."], answer: 1 },
  { segs: ["Did he had", "left?"], answer: 0 },
  { segs: ["He", "didn't had finished."], answer: 1 },
];

// ============================================================
// ㉝ — تحدي John / Mary (سؤال المصدر + إجابته + توضيح المنصة)
// ============================================================
export const EX28_JOHN_MARY = {
  question: "أي جملة تعني أن John وصل أولًا؟",
  options: ["When John arrived, Mary had left.", "When Mary arrived, John had left."],
  letters: ["A", "B"],
  sourceAnswer: 0,
  readings: [
    "A: Mary left ← John arrived. (ماري غادرت أولًا)",
    "B: John left ← Mary arrived. (جون غادر أولًا)",
  ],
} as const;

// ============================================================
// ㉞ — تحدي Sarah / Tom (الإجابة المورّدة: B)
// ============================================================
export const EX28_SARAH_TOM = {
  question: "أي جملة تعني أن Sarah وصلت قبل أن يغادر Tom؟",
  options: ["When Sarah arrived, Tom had left.", "When Tom left, Sarah had arrived."],
  letters: ["A", "B"],
  answer: 1,
  readings: ["الجملة A تعني: Tom left → Sarah arrived.", "الجملة B تعني: Sarah arrived → Tom left."],
  why: "إذن الجملة B هي التي تعني أن Sarah وصلت أولًا.",
} as const;

// ============================================================
// ㉟ — ثلاثة أحداث في مختبر Daniel
// ============================================================
export const EX28_DANIEL = {
  story:
    "When Daniel entered the laboratory, the scientists were discussing the experiment. They had already completed the first stage, so Daniel joined the second stage.",
  verbs: ["had completed", "entered", "were discussing", "joined"],
  questions: [
    { q: "ما الحدث الذي حدث قبل دخول Daniel؟", answer: "had completed" },
    { q: "ما الشيء الذي كان يحدث عندما دخل؟", answer: "were discussing" },
    { q: "ما الحدث الذي جاء بعد ذلك؟", answer: "joined" },
  ],
} as const;

// ============================================================
// ㊲ — مشهد Alex: الأفعال الثمانية وأزمنتها المورّدة
// ============================================================
export type AlexVerb = {
  verb: string;
  tense: "Past Simple" | "Past Continuous" | "Past Perfect";
  role: string;
};

export const ALEX_SCENE_28 = {
  text: "When Alex entered the house, his sister was sitting in the living room. She was reading a book, and their parents were preparing dinner. Alex looked around and realized that someone had opened the back door. The family had never left it unlocked before.",
  verbs: [
    { verb: "entered", tense: "Past Simple", role: "حدث يحرّك القصة." },
    { verb: "was sitting", tense: "Past Continuous", role: "خلفية مستمرة لحظة الدخول." },
    { verb: "was reading", tense: "Past Continuous", role: "خلفية مستمرة لحظة الدخول." },
    { verb: "were preparing", tense: "Past Continuous", role: "خلفية مستمرة لحظة الدخول." },
    { verb: "looked", tense: "Past Simple", role: "حدث يحرّك القصة." },
    { verb: "realized", tense: "Past Simple", role: "حدث ذهني يحرّك القصة." },
    { verb: "had opened", tense: "Past Perfect", role: "حدث أقدم من لحظة الإدراك." },
    { verb: "had never left", tense: "Past Perfect", role: "تجربة غائبة حتى تلك اللحظة الماضية." },
  ] as AlexVerb[],
};

// ============================================================
// ㊴ — Boss Battle (الخيارات الثلاثة والإجابة المورّدة: B)
// ============================================================
export const BOSS_28 = {
  meaning: "«كنت أركض في الحديقة عندما رأيت كلبًا. أدركت أنني رأيت هذا الكلب من قبل.»",
  opts: [
    "I ran in the park when I saw a dog. I realized that I saw this dog before.",
    "I was running in the park when I saw a dog. I realized that I had seen this dog before.",
    "I had run in the park when I was seeing a dog.",
  ],
  answer: 1,
} as const;

// ============================================================
// IQ200 FINAL CHALLENGE — مشهد المطار الختامي
// ============================================================
export const IQFINAL_28 = {
  sentence:
    "When I arrived at the airport, the plane had already taken off, people were running toward the gates, and an employee was talking to a confused passenger.",
  parts: [
    { text: "The plane had already taken off.", tense: "Past Perfect", role: "الحدث الذي حدث قبل وصولي." },
    { text: "People were running.", tense: "Past Continuous", role: "كان يحدث عند وصولي." },
    { text: "An employee was talking.", tense: "Past Continuous", role: "كان يحدث عند وصولي." },
    { text: "I arrived.", tense: "Past Simple", role: "حدث الوصول." },
  ],
} as const;

// ============================================================
// منطقة الاختبارات — 20 سؤالًا جديدًا كليًا (لا نسخ من تمارين المصدر)
// الأنواع: single | tf | multi | order | match | spot
// التسجيل: كل سؤال = درجة واحدة. multi/order/match تُحتسب عند التطابق التام.
// ============================================================
export type TestQ28 =
  | { n: number; type: "single"; ar: string; en?: string; opts: string[]; answer: number; why: string; trap?: string }
  | { n: number; type: "tf"; ar: string; en?: string; answer: boolean; why: string; trap?: string }
  | { n: number; type: "multi"; ar: string; en?: string; opts: string[]; answer: number[]; why: string; trap?: string }
  | { n: number; type: "order"; ar: string; en?: string; items: string[]; answer: string[]; why: string; trap?: string }
  | { n: number; type: "match"; ar: string; en?: string; left: string[]; right: string[]; answer: number[]; why: string; trap?: string }
  | { n: number; type: "spot"; ar: string; segments: string[]; answer: number; fix: string; why: string; trap?: string };

export const TEST_28: TestQ28[] = [
  {
    n: 1, type: "single",
    ar: "المعنى: «بحلول الوقت الذي وصل فيه عمر إلى القاعة، كان الخطاب قد انتهى.» أكمل:",
    en: "By the time Omar reached the hall, the speech ___.",
    opts: ["had ended", "ended", "ends"], answer: 0,
    why: "by the time تعلن أن انتهاء الخطاب سبق وصول عمر (الحدث الأقدم) → Past Perfect: had ended.",
    trap: "«ended» تجعل الانتهاء لاحقًا أو متزامنًا مع الوصول — عكس المقصود.",
  },
  {
    n: 2, type: "single",
    ar: "اختر الجملة الصحيحة نحوًا:",
    opts: ["She had written the email before the meeting.", "She had wrote the email before the meeting.", "She had writed the email before the meeting."],
    answer: 0,
    why: "بعد had يأتي V3 دائمًا: write → wrote → written. «wrote» هو V2 و«writed» غير موجودة.",
    trap: "الفخ الأشهر: had + V2. القاعدة واحدة: had + V3.",
  },
  {
    n: 3, type: "tf",
    ar: "صح أم خطأ: الجملة «The students left before the teacher arrived.» صحيحة ولا تحتاج حتمًا إلى Past Perfect.",
    answer: true,
    why: "صحيح: كلمة before نفسها توضح الترتيب، فيصحّ الماضي البسيط (القسم ⑨).",
    trap: "من يحفظ «before = لازم Past Perfect» يقع هنا — القاعدة ㉫ تقول: اسأل عن العلاقة الزمنية.",
  },
  {
    n: 4, type: "single",
    ar: "أكمل: حدث ماضٍ واحد محدد بالأمس — لا مقارنة مع حدث آخر:",
    en: "Yesterday, my sister ___ a new phone.",
    opts: ["bought", "had bought", "was bought"], answer: 0,
    why: "حدث واحد مكتمل في الماضي بلا ترتيب مع حدث آخر → Past Simple كافٍ: bought (القسم ⑤).",
    trap: "Past Perfect ليس معناه «حدث قديم» — بل حدث قبل حدث ماضٍ آخر.",
  },
  {
    n: 5, type: "order",
    ar: "رتّب الأحداث من الأقدم إلى الأحدث: «When Layla reached the library, the exhibition had already closed, and visitors were leaving the hall.»",
    items: ["The exhibition closed.", "Layla reached the library.", "Visitors were leaving the hall."],
    answer: ["The exhibition closed.", "Layla reached the library.", "Visitors were leaving the hall."],
    why: "had already closed تعني أن الإغلاق هو الأقدم، ثم وصلت ليلى، والمغادرة كانت الخلفية المستمرة لحظة وصولها — نفس منطق القسم ⑲.",
    trap: "ترتيب الكلمات في الجملة ليس ترتيب الأحداث — الفعل بصيغة had هو الأقدم.",
  },
  {
    n: 6, type: "tf",
    ar: "صح أم خطأ: «When Adam arrived, Nora left.» تعني أن نورا غادرت قبل وصول آدم.",
    answer: false,
    why: "خطأ: بدون had نفهم أن آدم وصل أولًا ثم غادرت نورا (ترتيب متتابع). لو كانت «had left» لصارت المغادرة أقدم (القسم ⑦).",
    trap: "كلمة واحدة (had) تقلب ترتيب الأحداث بالكامل.",
  },
  {
    n: 7, type: "multi",
    ar: "أي الجمل التالية صحيحة نحوًا؟ (اختر كل الصحيح)",
    opts: [
      "Had they finished the game?",
      "He didn't had finished the game.",
      "They had saw that film before.",
      "He hadn't finished the game.",
    ],
    answer: [0, 3],
    why: "الأولى: سؤال صحيح Had + subject + V3. الأخيرة: نفي صحيح hadn't + V3. الثانية خطأ (لا نجمع didn't مع had)، والثالثة خطأ (saw بدل seen).",
    trap: "الجملتان الخاطئتان تبدوان مألوفتين — لكن had/hadn't يطلبان V3 والسؤال بمساعد واحد.",
  },
  {
    n: 8, type: "single",
    ar: "أكمل بما يناسب المعنى: «دخلتُ الصف، وكان المعلم قد وصل للتو (قبل لحظات).»",
    en: "When I entered the class, the teacher had ___ arrived.",
    opts: ["just", "already", "never"], answer: 0,
    why: "«للتو» = just: الحدث الأقدم وقع قبل لحظات فقط من الحدث الأحدث (القسم ⑮).",
    trap: "already تعني «بالفعل» بلا قرب زمني، وnever تنفي الحدث أصلًا.",
  },
  {
    n: 9, type: "spot",
    ar: "المس الجزء الخاطئ في الجملة:",
    segments: ["By the time we reached the bridge,", "the river had rose."],
    answer: 1, fix: "By the time we reached the bridge, the river had risen.",
    why: "الخطأ في «had rose»: بعد had نحتاج V3 — rise → rose → risen.",
    trap: "«rose» صحيحة في Past Simple لكنها خطأ بعد had.",
  },
  {
    n: 10, type: "single",
    ar: "أي الجمل تصف نشاطًا كان مستمرًا لحظة الاستيقاظ؟",
    opts: [
      "When I woke up, my father was reading the newspaper.",
      "When I woke up, my father read the newspaper.",
    ],
    answer: 0,
    why: "was reading = نشاط مستمر في تلك اللحظة (القسم ㊱). «read» حدث مكتمل ولا يعني بالضرورة الاستمرار لحظة الاستيقاظ.",
    trap: "هذا بالضبط فرق ㊱: الحدث المكتمل ليس بالضرورة نشاطًا مستمرًا.",
  },
  {
    n: 11, type: "single",
    ar: "في سرد متتابع: «استيقظتُ، ثم فطرتُ، ثم خرجتُ» — أي زمن هو الأنسب للسرد؟",
    opts: [
      "Past Simple لكل حدث: I woke up, had breakfast, and left.",
      "Past Perfect لكل حدث: I had woken up, had had breakfast, and had left.",
    ],
    answer: 0,
    why: "السلسلة المتتابعة (sequence) تُروى طبيعيًا بالماضي البسيط؛ الترتيب واضح من التسلسل نفسه (القسم ㉗).",
    trap: "Past Perfect للرجوع إلى الوراء (back reference)، لا للسرد المتتابع.",
  },
  {
    n: 12, type: "order",
    ar: "رتّب أحداث مختبر Daniel من الأقدم إلى الأحدث (القسم ㉟).",
    items: ["The scientists completed the first stage.", "Daniel entered the laboratory.", "Daniel joined the second stage."],
    answer: ["The scientists completed the first stage.", "Daniel entered the laboratory.", "Daniel joined the second stage."],
    why: "had completed حدث قبل الدخول، والدخول نقطة القصة، والانضمام إلى المرحلة الثانية جاء بعده.",
    trap: "were discussing كان مستمرًا لحظة الدخول — لكنه غير مطلوب في هذا الترتيب؛ ركّز على الأحداث المكتملة.",
  },
  {
    n: 13, type: "single",
    ar: "اختر الجملة التي تعني: «عندما فتحتُ الثلاجة، كان أخي قد شرب كل العصير.»",
    opts: [
      "When I opened the fridge, my brother had drunk all the juice.",
      "When I opened the fridge, my brother drank all the juice.",
    ],
    answer: 0,
    why: "«كان قد شرب» = الشرب حدث قبل الفتح → had drunk. الجملة الثانية تعني أنه شرب بعد فتحي للثلاجة.",
    trap: "لاحظ: drink → drank → drunk — وليس had drank.",
  },
  {
    n: 14, type: "match",
    ar: "صل كل فعل بدوره في المشهد: «While Noor was drawing, her brother was listening to music. Their mother came home and noticed that they had cleaned the table.»",
    left: ["was drawing", "came", "had cleaned"],
    right: ["خلفية مستمرة 🎥", "حدث 📸", "حدث أقدم ⏪"],
    answer: [0, 1, 2],
    why: "was drawing نشاط مستمر (🎥)، وcame الحدث الذي حرّك القصة (📸)، وhad cleaned حدث أقدم من لحظة الملاحظة (⏪).",
    trap: "had cleaned ليست الحدث الرئيسي — إنها رجوع إلى الوراء قبل لحظة وصول الأم.",
  },
  {
    n: 15, type: "tf",
    ar: "صح أم خطأ: وجود كلمة before في الجملة يجعل Past Perfect إجباريًا دائمًا.",
    answer: false,
    why: "خطأ: before نفسها توضح الترتيب، فيصح الماضي البسيط أيضًا (القسم ⑨ والقاعدة ㉫). القرار من العلاقة الزمنية لا من الكلمة.",
    trap: "لا توجد كلمة «تفرض» زمنًا — المعنى أولًا.",
  },
  {
    n: 16, type: "single",
    ar: "في جملة القصة «When I left the house, I realized that I had forgotten my backpack.» — لماذا استخدمنا Past Perfect؟",
    opts: [
      "لأن نسيان الحقيبة حدث قبل لحظة الإدراك — رجوع خطوة إلى الوراء.",
      "لأن النسيان حدث بعد مغادرة البيت.",
      "لأن الماضي التام يعني أن الحدث قديم جدًا.",
    ],
    answer: 0,
    why: "النسيان هو الحدث الأقدم: نسيتُ الحقيبة أولًا، ثم أدركتُ ذلك عند مغادرتي (القسمان ㉗ و㉘).",
    trap: "الخيار الثالث هو وهم «الحدث القديم جدًا» الذي حذّر منه القسم ⑤.",
  },
  {
    n: 17, type: "spot",
    ar: "المس الجزء الخاطئ في السؤال:",
    segments: ["Did she had", "finished the exam?"],
    answer: 0, fix: "Had she finished the exam?",
    why: "سؤال الماضي التام يبدأ بـ Had وحده: Had + subject + V3? — لا نجمع Did مع had (القسم ㉔).",
    trap: "نقل عادة الماضي البسيط (Did + فعل) إلى الماضي التام خطأ شائع.",
  },
  {
    n: 18, type: "single",
    ar: "ما معنى الجملة: «When Tom left, Sarah had arrived.»؟",
    opts: [
      "Sarah وصلت قبل أن يغادر Tom.",
      "Tom غادر قبل أن تصل Sarah.",
    ],
    answer: 0,
    why: "had arrived هي الحدث الأقدم: وصول سارة سبق مغادرة توم — وهذا مطابق لتحدي ㉞ الجملة B.",
    trap: "لا تنظر إلى ترتيب الكلمات — انظر إلى الصيغة: الفعل مع had هو الأقدم.",
  },
  {
    n: 19, type: "multi",
    ar: "في المشهد: «When I reached the market, a musician was playing the guitar and people were dancing near the fountain. A painter had finished her picture before I came.» — ما النشاطان اللذان كانا مستمرين لحظة وصولي؟",
    opts: [
      "A musician was playing the guitar.",
      "People were dancing near the fountain.",
      "A painter had finished her picture.",
      "I reached the market.",
    ],
    answer: [0, 1],
    why: "العزف والرقص كانا جاريين لحظة الوصول (was playing / were dancing). أما اللوحة فكانت قد اكتملت قبل وصولي (had finished) — حدث أقدم مكتمل لا نشاط مستمر.",
    trap: "had finished حدث أقدم مكتمل — ليس شيئًا كان يحدث لحظة الوصول.",
  },
  {
    n: 20, type: "single",
    ar: "المعنى: «بينما كنا نتناول العشاء، أدركت أنني كنت قد نسيت هاتفي في المكتب.» اختر الترجمة الأدق:",
    opts: [
      "While we were having dinner, I realized that I had left my phone at the office.",
      "While we had dinner, I realized that I left my phone at the office.",
    ],
    answer: 0,
    why: "العشاء نشاط مستمر (were having)، والإدراك حدث، ونسيان الهاتف أقدم من الإدراك → had left. ثلاث طبقات زمنية كما في القسمين ⑰ و⑱.",
    trap: "الجملة الثانية تفقد الطبقات الثلاث: لا استمرار واضح ولا رجوع إلى الوراء.",
  },
];

// ============================================================
// منطقة المعلم — الدرس 28 (محتوى تعليمي للمعلم، خلف كلمة المرور)
// ============================================================
export const TEACHER_PASSWORD_28 = "somer173";

export const TEACHER_28_OVERVIEW = {
  title: "Lesson Overview — نظرة عامة",
  theme: "Past Perfect vs Past Simple — ترتيب الأحداث في الماضي بالمعنى لا بالحفظ.",
  coreSkill:
    "أن ينظر الطالب إلى قصة أو موقف ويستنتج: ماذا حدث أولًا؟ ماذا حدث بعده؟ هل أحتاج فعلًا إلى Past Perfect؟ هل Past Simple يكفي؟ هل يوجد حدث كان مستمرًا؟",
  lesson27Link:
    "الدرس 27 بنى آلة الماضي التام نفسها (had + V3، النفي، الأسئلة، الإجابات القصيرة، الكلمات الدالة). الدرس 28 يحوّل هذه الآلة إلى قرار زمني: متى نستخدمها ومتى يكفي الماضي البسيط، ومتى يتدخل الماضي المستمر كخلفية.",
  objectives: [
    "التمييز بين Past Simple و Past Perfect.",
    "معرفة متى يكون Past Perfect ضروريًا.",
    "معرفة متى يكون Past Simple طبيعيًا وأفضل.",
    "فهم before و after و by the time.",
    "فهم already و just و never في سياق الماضي.",
    "ترتيب ثلاثة أحداث ماضية.",
    "دمج Past Simple + Past Continuous + Past Perfect.",
    "اكتشاف أخطاء متقدمة.",
    "كتابة قصة زمنية واضحة.",
    "حل أسئلة IQ200 تعتمد على المعنى وليس على الحفظ.",
  ],
  core: [
    "الحدث الأقدم ← Past Perfect (had + V3).",
    "الحدث الأحدث ← Past Simple غالبًا.",
    "النشاط المستمر عند نقطة ماضية ← Past Continuous.",
    "📸 ماذا حدث؟ · 🎥 ماذا كان يحدث؟ · ⏪ ماذا كان قد حدث قبل ذلك؟",
  ],
} as const;

export type TeacherNote28 = { head: string; lines: string[] };

export const TEACHER_28_NOTES: TeacherNote28[] = [
  { head: "Past Simple — متى يكفي؟", lines: ["حدث واحد مكتمل في الماضي: I visited my uncle yesterday.", "السرد المتتابع: I woke up, brushed my teeth, ate breakfast, and left the house — الترتيب واضح من التسلسل نفسه.", "المهارة: أن يتوقف الطالب عن إضافة had بلا داعٍ."] },
  { head: "Past Perfect — متى نحتاجه؟", lines: ["عندما يكون لدينا حدثان ماضيان ونريد توضيح أن أحدهما أقدم.", "عندما يكون الترتيب غامضًا بدونه: When Maya arrived, Daniel left (وصلت فغادر) مقابل Daniel had left (كان قد غادر قبلها).", "الرجوع خطوة إلى الوراء داخل القصة: I realized that I had left my phone at school."] },
  { head: "Past Continuous — دور الخلفية", lines: ["شيء كان يحدث عند نقطة ماضية: people were waiting for the next train.", "يظهر غالبًا مع حدث قاطع: I was walking home when I realized…", "في المشهد الكامل: ثلاث وظائف — 📸 حدث، 🎥 خلفية، ⏪ فلاش باك."] },
  { head: "ترتيب الأحداث — السؤال الحاكم", lines: ["السؤال الأول دائمًا: ماذا حدث أولًا؟", "الفعل بصيغة had هو الأقدم مهما كان موقعه في الجملة.", "درّب الطلاب على رسم خط زمني قبل اختيار الزمن."] },
  { head: "sequence vs back reference", lines: ["السلسلة المتتابعة (sequence): ماضٍ بسيط طبيعي — لا حاجة إلى had.", "الرجوع إلى الوراء (back reference): هنا يتألق الماضي التام — نرجع لحدث سبق لحظة الرواية.", "سؤال الفصل: هل أتقدم بالقصة أم أرجع إلى الوراء؟"] },
  { head: "before", lines: ["The students had left before the teacher arrived — الترتيب: الطلاب غادروا أولًا.", "لكن أيضًا: The students left before the teacher arrived — صحيحة لأن before توضح الترتيب أصلًا.", "لا تعلّم: before = لازم Past Perfect."] },
  { head: "after", lines: ["After I had finished my homework, I played a game.", "وأيضًا: After I finished my homework, I played a game — صحيحة.", "after نفسها تساعد على تحديد الترتيب؛ الماضي التام يضيف إبرازًا لا إلزامًا."] },
  { head: "by the time", lines: ["من أقوى إشارات الماضي التام: حدث اكتمل قبل نقطة ماضية.", "By the time we arrived, the movie had started.", "By the time the firefighters arrived, the fire had spread."] },
  { head: "already", lines: ["المعنى: الحدث تمّ قبل النقطة الماضية (بالفعل).", "الموضع: بين had والفعل — had already gone.", "When we reached the stadium, the game had already started."] },
  { head: "just", lines: ["المعنى: الحدث الأقدم وقع قبل لحظات فقط من الأحدث.", "When I entered the room, the teacher had just arrived.", "الحدثان قريبان جدًا في الزمن — لكن الترتيب ثابت."] },
  { head: "never", lines: ["تجربة غائبة حتى نقطة ماضية: The family had never left it unlocked before.", "ليست نفيًا عامًا بل تحديدًا زمنيًا: حتى تلك اللحظة في الماضي."] },
  { head: "when", lines: ["when لا تفرض زمنًا تلقائيًا: When Maya arrived, Daniel left (ترتيب متتابع) و When Maya arrived, Daniel had left (ترتيب معكوس).", "المعنى المقصود هو الذي يقرر."] },
  { head: "التفكير بخط الزمن — timeline reasoning", lines: ["ارسم: الماضي الأقدم ← الحدث الأول ← الحدث الثاني ← الآن.", "مع كل جملة: حدد الأحداث، ضعها على الخط، ثم اختر الزمن.", "الهدف النهائي: الانتقال من حفظ الأزمنة إلى التحكم بها عبر المعنى."] },
];

export type TeacherSolution28 = { head: string; lines: string[] };

export const TEACHER_28_SOLUTIONS: TeacherSolution28[] = [
  { head: "㉚ تمرين 1 — اختر", lines: ["① had started — الاجتماع بدأ قبل الوصول.", "② had finished — إنهاء الواجب سبق الخروج.", "③ visited — حدث واحد محدد بالأمس بلا مقارنة.", "④ had gone — by the time تعلن الأسبقية.", "⑤ were playing — اللعب كان مستمرًا لحظة بدء المطر.", "القاعدة الجامعة: حدد الترتيب أولًا ثم اختر الزمن."] },
  { head: "㉛ تمرين 2 — حدد الحدث الأول", lines: ["1. Tom ate lunch أقدم، وI arrived أحدث.", "2. I finished my work أقدم، وSara called أحدث.", "3. The thief escaped أقدم، وThe police arrived أحدث.", "القاعدة: الفعل مع had هو الحدث الأول مهما كان موقعه في الجملة."] },
  { head: "㉜ تمرين 3 — صحح الأخطاء", lines: ["① had went ← had gone (go → went → gone).", "② had ate ← had eaten (eat → ate → eaten).", "③ had saw ← had seen (see → saw → seen).", "④ Did he had left? ← Had he left? (مساعد واحد: Had + subject + V3?).", "⑤ didn't had finished ← hadn't finished (أو had not finished)."] },
  { head: "㉝ IQ200 Challenge — John / Mary (ملاحظة منطقية)", lines: ["سؤال المصدر وإجابته محفوظان: الإجابة المورّدة A.", "القراءة الزمنية الدقيقة: A تعني Mary left ← John arrived، وB تعني John left ← Mary arrived.", "إذن لا توجد جملة تثبت حرفيًا أن «جون وصل أولًا» دون سياق إضافي — وهذا خلل في صياغة السؤال الأصلي، وقد عرضته المنصة للطالب بوسم «ملاحظة منطقية من المنصة» دون حذف السؤال أو تغيير الإجابة المورّدة.", "استخدم هذا التمرين لتعليم الدقة: لا نستنتج ترتيبًا لا تثبته الصيغة."] },
  { head: "㉞ تحدي أصعب — Sarah / Tom", lines: ["الإجابة: B.", "A تعني: Tom left ← Sarah arrived (توم غادر أولًا).", "B تعني: Sarah arrived ← Tom left (سارة وصلت أولًا) — وهي المطلوبة.", "درّب الطالب على استخراج الترتيب من الصيغة لا من ترتيب الكلمات."] },
  { head: "㉟ ثلاثة أحداث — مختبر Daniel", lines: ["قبل دخول دانيال: had completed (المرحلة الأولى).", "كان يحدث لحظة الدخول: were discussing.", "بعد ذلك: joined (المرحلة الثانية).", "ناقش: لماذا entered ماضٍ بسيط؟ لأنه نقطة القصة التي نقف عندها."] },
  { head: "㊱ اختبار المنطق الزمني — my father read / was reading", lines: ["«my father read the newspaper» لا تعني بالضرورة أنه كان يقرأ في تلك اللحظة — إنها حدث مكتمل.", "للتعبير عن نشاط مستمر لحظة الاستيقاظ: My father was reading the newspaper.", "الصورة الكاملة: had left (أقدم) · was preparing (مستمر) · was reading (مستمر) · woke up (الحدث الرئيسي).", "هذا فرق دلالي حقيقي وليس تحسينًا أسلوبيًا."] },
  { head: "㊴ Boss Battle", lines: ["الإجابة: B.", "was running ← النشاط كان مستمرًا.", "saw ← حدث وقع أثناء ذلك.", "realized ← حدث ذهني.", "had seen ← رؤية الكلب حدثت قبل لحظة الإدراك.", "A تفقد الاستمرار والرجوع إلى الوراء؛ C تستخدم had run و was seeing بشكل خاطئ."] },
];

export const TEACHER_28_RUBRIC: { head: string; lines: string[] } = {
  head: "Story Rubric — سلّم قصة «The Missing Backpack»",
  lines: [
    "التغطية الزمنية: 4 أفعال Past Simple + 3 أفعال Past Continuous + 3 أفعال Past Perfect على الأقل.",
    "الروابط: when + while + (before أو after) + already — كل منها مرة واحدة على الأقل.",
    "التسلسل المنطقي: جملة واحدة على الأقل تحمل حدثين أحدهما أقدم من الآخر (قابلة للاستخراج).",
    "الحدث المفاجئ والنهاية المنطقية: يُقيَّمان بقراءة القصة لا بعدّاد آلي.",
    "التماسك الزمني: القارئ يستطيع رسم خط زمني للأحداث دون شرح مباشر للترتيب.",
    "معنى الماضي التام: كل had + V3 يجب أن يشير فعلًا إلى حدث أقدم — لا زخرفًا.",
    "معنى الماضي المستمر: كل was/were + V-ing يجب أن يصف نشاطًا كان جاريًا.",
    "الدقة النحوية: الخصم الأكبر لأخطاء had + V2 و did + had و didn't had.",
    "العدّادات في التطبيق مؤشرات تقريبية — القرار النهائي بمراجعة المعلم.",
  ],
};

export const TEACHER_28_MISTAKES: TeacherNote28[] = [
  { head: "had + V2", lines: ["مثل had went / had ate / had saw — عالج بـ: بعد had يأتي V3 فقط، مع مراجعة ثلاثيات الأفعال."] },
  { head: "Past Perfect غير الضروري", lines: ["حدث واحد أو ترتيب واضح بـ before/after — الماضي البسيط أصح وأطبيعي.", "الماضي التام ليس مرادفًا لـ «حدث قديم جدًا»."] },
  { head: "إغفال Past Perfect عند الحاجة إليه", lines: ["عندما يكون الترتيب غامضًا بدونه أو عند الرجوع إلى الوراء في القصة، يصبح الماضي التام ضروريًا للوضوح."] },
  { head: "before/after = لازم ماضٍ تام", lines: ["غير صحيح: الكلمتان توضحان الترتيب أصلًا، والماضي التام يضيف إبرازًا لا إلزامًا (الأقسام ⑨ ⑪ ㉫)."] },
  { head: "خلط النشاط المستمر بالحدث المكتمل", lines: ["my father read ≠ my father was reading في تلك اللحظة (القسم ㊱).", "had danced = انتهى قبل نقطة ماضية؛ كان الأمر يتطلب السؤال عن المعنى المقصود."] },
  { head: "حفظ الكلمات الدالة بدل المعنى", lines: ["لا تقل: رأيت when إذن ماضٍ بسيط، أو رأيت before إذن ماضٍ تام.", "اسأل: ما المعنى الذي أريد التعبير عنه؟ (القسم ㊳)."] },
  { head: "خلط التسلسل بالرجوع إلى الوراء", lines: ["السلسلة المتتابعة تُروى بالماضي البسيط؛ الرجوع إلى حدث أسبق هو مكان الماضي التام (القسم ㉗)."] },
];

// ============================================================
// ㊵ Story Builder — متطلبات قصة «The Missing Backpack»
// ============================================================
export const STORY_28_REQUIREMENTS = [
  "① 4 أفعال Past Simple على الأقل.",
  "② 3 أفعال Past Continuous على الأقل.",
  "③ 3 أفعال Past Perfect على الأقل.",
  "④ when",
  "⑤ while",
  "⑥ before أو after",
  "⑦ already",
  "⑧ جملة تحتوي على حدثين أحدهما أقدم من الآخر.",
  "⑨ حدث مفاجئ.",
  "⑩ نهاية منطقية.",
] as const;

export const STORY_28_TITLE = "The Missing Backpack";

// ============================================================
// سجل الخطوات (Step Registry) — درس متعدد الخطوات أصيل
// كل خطوة = فكرة واحدة واضحة، وتحمل معرفات مقاطع المصدر التي تغطيها
// (SOURCE_SECTIONS[].id) في الحقل source — لا يوجد أي عرض نصيّ خام للمصدر.
// ============================================================
export type Slide28 = {
  id: string;
  section: string;
  mascot: string;
  title: string;
  step?: string;
  lead?: string;
  tip?: string;
  source: string[]; // معرفات مقاطع SOURCE_SECTIONS التي تغطيها هذه الخطوة
};

const START = "البداية";
const DECIDE = "القرار: بسيط أم تام؟";
const ORDER = "كلمات الترتيب";
const THREE = "ثلاثة أزمنة";
const ERR = "الأخطاء الشائعة";
const REASON = "التفكير الزمني";
const PRACTICE = "التدريبات";
const ADV = "المستوى المتقدم";
const BOSS = "التحديات النهائية";
const END = "الخاتمة";

export const SECTIONS_28 = [START, DECIDE, ORDER, THREE, ERR, REASON, PRACTICE, ADV, BOSS, END] as const;

export const SLIDES: Slide28[] = [
  { id: "cover", section: START, mascot: "🧭", title: "الغلاف — الدرس 28: Past Perfect vs Past Simple", source: ["cover"] },
  { id: "bridge", section: START, mascot: "🧠", title: "الافتتاح — IQ200 ترتيب الأحداث في الماضي باحتراف", lead: "الدرس 27 بنى الآلة… والدرس 28 يعلّمك متى تستخدمها.", tip: "الأسئلة الخمسة الحاكمة: ماذا حدث أولًا؟ ماذا بعده؟ هل أحتاج الماضي التام؟ هل يكفي البسيط؟ هل يوجد حدث مستمر؟", source: ["bridge"] },
  { id: "objectives", section: START, mascot: "🎯", title: "أهداف الدرس العشرة", source: ["objectives"] },

  { id: "s1", section: DECIDE, mascot: "🧠", title: "أول سؤال: ماذا حدث أولًا؟", step: "1", lead: "أهم سؤال في الدرس كله.", tip: "رتّب الحدثين بنفسك قبل أن ترى الحكم.", source: ["s1"] },
  { id: "s2", section: DECIDE, mascot: "📸", title: "Past Simple — حدث واحد كافٍ", step: "2", lead: "إذا حدثَ شيءٌ واحد فقط… فالبسيط يكفي.", source: ["s2"] },
  { id: "s3", section: DECIDE, mascot: "⏪", title: "Past Perfect — حدث قبل حدث", step: "3", lead: "الحدث الأقدم يأخذ had + V3 — والأحدث يبقى بسيطًا.", source: ["s3"] },
  { id: "s4", section: DECIDE, mascot: "🔥", title: "المقارنة المباشرة — المفتاح الضائع", step: "4", lead: "نفس الفعل… ومعنيان مختلفان تمامًا.", tip: "اسأل دائمًا: هل يوجد حدث ماضٍ ثانٍ؟", source: ["s4"] },
  { id: "s5", section: DECIDE, mascot: "🧠", title: "الخرافة — «لأنه قديم جدًا»", step: "5", tip: "Past Perfect لا يعني «قديم جدًا» — بل «أقدم من حدث ماضٍ آخر».", source: ["s5"] },
  { id: "s6", section: DECIDE, mascot: "🕰️", title: "خط الزمن — المتجر المغلق", step: "6", lead: "اضبط بوصلتك الزمنية: أقدم ← أول ← ثانٍ ← الآن.", source: ["s6"] },
  { id: "s7", section: DECIDE, mascot: "🎯", title: "مفتاح Maya الصغير — كلمة had واحدة", step: "7", lead: "كلمة واحدة تغيّر ترتيب الأحداث بالكامل.", source: ["s7"] },
  { id: "s8", section: DECIDE, mascot: "💎", title: "اختبار سريع للعقل — القلادة", step: "8", lead: "قبل أن تشرح… أجب بنفسك: أي حدث حدث أولًا؟", source: ["s8"] },

  { id: "s9", section: ORDER, mascot: "⭐", title: "before — ليست إلزامًا", step: "9", lead: "before توضّح الترتيب بنفسها… لكن Past Perfect يضيف التركيز.", source: ["s9"] },
  { id: "s10", section: ORDER, mascot: "🧠", title: "لماذا نستخدم الماضي التام إذن؟", step: "10", lead: "لإبراز الحدث الأقدم من أول كلمة تقريبًا.", source: ["s10"] },
  { id: "s11", section: ORDER, mascot: "🔄", title: "after — الترتيب واضح أصلًا", step: "11", lead: "After + الحدث الأقدم → ثم يتبعه الحدث الجديد.", source: ["s11"] },
  { id: "s12", section: ORDER, mascot: "🧠", title: "قاعدة مهمة جدًا — لا توجد كلمة سحرية", step: "12", tip: "لا تقل: before = لازم Past Perfect. اسأل: ما العلاقة الزمنية؟", source: ["s12"] },
  { id: "s13", section: ORDER, mascot: "⏳", title: "by the time — بحلول الوقت الذي", step: "13", lead: "أقوى إشارة للماضي التام: حدث اكتمل قبل نقطة ماضية.", source: ["s13"] },
  { id: "s14", section: ORDER, mascot: "🔥", title: "already — بالفعل", step: "14", lead: "تقع بين had و V3: had already + V3.", source: ["s14"] },
  { id: "s15", section: ORDER, mascot: "⚡", title: "just — للتوّ", step: "15", lead: "الحدثان قريبان جدًا… لكن الترتيب ثابت.", source: ["s15"] },

  { id: "s16", section: THREE, mascot: "🧠", title: "Past Simple + Past Perfect في القصص", step: "16", lead: "قصة واحدة بكاميرتين: حدث في نقطة التاريخ، وحدث قبله.", source: ["s16"] },
  { id: "s17", section: THREE, mascot: "🎥", title: "أضف Past Continuous — ثلاثة أزمنة", step: "17", lead: "حدث · شيء كان يحدث · شيء كان قد حدث.", source: ["s17"] },
  { id: "s18", section: THREE, mascot: "👛", title: "مختبر المحفظة — ثلاث طبقات للوقت", step: "18", lead: "I was walking home when I realized that I had forgotten my wallet.", source: ["s18"] },
  { id: "s19", section: THREE, mascot: "🚉", title: "ثلاثة أحداث في المحطة", step: "19", lead: "صنّف كل فعل وستظهر الصورة كاملة.", source: ["s19"] },
  { id: "s20", section: THREE, mascot: "🧩", title: "آلة الزمن — Emma والمطبخ", step: "20", lead: "أقدم؟ كان يحدث؟ حدثان نقطيان؟", source: ["s20"] },

  { id: "s21", section: ERR, mascot: "🚨", title: "الخطأ الشائع الأول — had went", step: "21", tip: "go → went → gone", source: ["s21"] },
  { id: "s22", section: ERR, mascot: "🚨", title: "الخطأ الشائع الثاني — had ate", step: "22", tip: "eat → ate → eaten", source: ["s22"] },
  { id: "s23", section: ERR, mascot: "🚨", title: "الخطأ الشائع الثالث — had saw", step: "23", tip: "see → saw → seen", source: ["s23"] },
  { id: "s24", section: ERR, mascot: "🚨", title: "الخطأ الشائع الرابع — Did you had…؟", step: "24", tip: "Had + subject + V3؟", source: ["s24"] },
  { id: "s25", section: ERR, mascot: "🚨", title: "الخطأ الشائع الخامس — didn't had…", step: "25", tip: "hadn't + V3 أو had not + V3 — لا did أبدًا.", source: ["s25"] },

  { id: "s26", section: REASON, mascot: "🧠", title: "ثلاث حالات — بسيط أم تام؟", step: "26", lead: "يوم عادي · سبق حدثًا آخر · تسلسل واضح.", source: ["s26"] },
  { id: "s27", section: REASON, mascot: "🔥", title: "sequence vs back reference", step: "27", lead: "هل أتقدم بالقصة… أم أرجع خطوة إلى الوراء؟", source: ["s27"] },
  { id: "s28", section: REASON, mascot: "🧠", title: "الرجوع خطوة — الهاتف المنسي", step: "28", lead: "وصلت البيت… ثم أخذت القارئ إلى ما قبل المغادرة.", source: ["s28"] },
  { id: "s29", section: REASON, mascot: "🕵️", title: "Grammar Detective — الكهف", step: "29", lead: "خمسة أفعال… واحد منها أقدم من البقية.", source: ["s29"] },

  { id: "s30", section: PRACTICE, mascot: "🧪", title: "تمرين ㉚ — اختر الزمن المناسب", source: ["s30"] },
  { id: "s31", section: PRACTICE, mascot: "🧪", title: "تمرين ㉛ — حدد الحدث الأول", source: ["s31"] },
  { id: "s32", section: PRACTICE, mascot: "🧪", title: "تمرين ㉜ — صحح الخطأ", source: ["s32"] },

  { id: "s33", section: ADV, mascot: "🚀", title: "تحدي IQ200 ㉝ — John و Mary", tip: "فكر جيدًا — مع ملاحظة منطقية من المنصة.", source: ["s33"] },
  { id: "s34", section: ADV, mascot: "🧠", title: "تحدي أصعب ㉞ — Sarah و Tom", source: ["s34"] },
  { id: "s35", section: ADV, mascot: "🔬", title: "ثلاثة أحداث ㉟ — مختبر Daniel", source: ["s35"] },
  { id: "s36", section: ADV, mascot: "🧠", title: "اختبار المنطق ㊱ — read أم was reading؟", source: ["s36"] },
  { id: "s37", section: ADV, mascot: "🎬", title: "مشهد كامل ㊲ — بيت Alex", source: ["s37"] },
  { id: "s38", section: ADV, mascot: "🧠", title: "قاعدة متقدمة جدًا ㊳ — المعنى أولًا", source: ["s38"] },

  { id: "s39", section: BOSS, mascot: "⚔️", title: "Boss Battle ㊴ — الحديقة والكلب", source: ["s39"] },
  { id: "s40", section: BOSS, mascot: "🏆", title: "التحدي النهائي ㊵ — ابنِ القصة: The Missing Backpack", source: ["s40"] },

  { id: "summary", section: END, mascot: "🧠", title: "ملخص الدرس — الأزمنة الثلاثة", source: ["summary"] },
  { id: "golden", section: END, mascot: "🏆", title: "القاعدة الذهبية — اسأل عن الترتيب", source: ["golden"] },
  { id: "iqfinal", section: END, mascot: "🧠", title: "IQ200 FINAL CHALLENGE — المطار", source: ["iqfinal"] },
  { id: "closing", section: END, mascot: "🏆", title: "الخاتمة — LESSON 28 COMPLETE", source: ["closing"] },
];

export const SLIDE_COUNT = SLIDES.length;

// ============================================================
// حلول الاختبار — تُشتق من TEST_28 نفسه (لا تكرار يدوي)
// ============================================================
export function answerLabel28(q: TestQ28): string {
  switch (q.type) {
    case "single":
      return q.opts[q.answer];
    case "tf":
      return q.answer ? "✓ صحيح" : "✕ خطأ";
    case "multi":
      return q.answer.map((i) => q.opts[i]).join(" + ");
    case "order":
      return q.answer.join(" → ");
    case "match":
      return q.answer.map((r, l) => `${q.left[l]} ←→ ${q.right[r]}`).join(" · ");
    case "spot":
      return `«${q.segments[q.answer]}» ← الصحيح: ${q.fix}`;
  }
}

export type TestSolution28 = {
  n: number;
  ar: string;
  en?: string;
  answer: string;
  explanation: string;
  trap?: string;
};

export const TEST_28_SOLUTIONS: TestSolution28[] = TEST_28.map((q) => ({
  n: q.n,
  ar: q.type === "spot" ? `${q.ar} — «${q.segments.join(" / ")}»` : q.ar,
  en: "en" in q ? q.en : undefined,
  answer: answerLabel28(q),
  explanation: q.why,
  trap: "trap" in q ? q.trap : undefined,
}));

// أخطاء مقصودة (للفحص): يجب أن تظهر في الدرس كما وردت في المصدر — لا تُصحَّح بصمت.
export const INTENTIONALLY_WRONG_28: string[] = [
  "Yesterday, I had visited my grandmother. ❌",
  "I had went. ❌",
  "She had ate. ❌",
  "They had saw the movie. ❌",
  "Did you had finished? ❌",
  "He didn't had finished. ❌",
  "When I arrived, the bus had went.",
  "She had ate before the lesson.",
  "They had saw the movie before.",
  "Did he had left?",
  "He didn't had finished.",
  "I ran in the park when I saw a dog. I realized that I saw this dog before.",
  "I had run in the park when I was seeing a dog.",
];
