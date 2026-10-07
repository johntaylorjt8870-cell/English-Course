// ============================================================
// الدرس 27 — Past Perfect — الماضي التام
// ⏪ THE FLASHBACK DIRECTOR — المخرج الذي يرتّب حدثين في الماضي
//
// المصدر المورّد هو المرجع الحرفي: لا اختصار ولا إعادة صياغة ولا حذف.
// كل سطر من المصدر مسجَّل في SOURCE_SECTIONS ويُعرض فعليًا في Lesson27.tsx،
// والفحص الآلي (scripts/audit-lesson27.mjs) يتحقق من وصول كل وحدة إلى
// الـ DOM الحقيقي — لا يكفي وجودها في هذا الملف.
// ============================================================

export const LESSON_TITLE_27 = "الدرس 27: Past Perfect — الماضي التام";
export const LESSON_SUBTITLE_27 = "الماضي التام — أي حدث وقع أولًا؟";
export const LESSON_ARABIC_TITLE_27 = "الماضي التام — Past Perfect";
export const LAB_NAME_27 = "THE FLASHBACK DIRECTOR";
export const LAB_MOTTO_27 = "📸 What happened? · 🎥 What was happening? · ⏪ What had happened before that?";

// الأدوار البصرية الثلاثة للدرس
export const VIEW_EVENT_TAG = "📸 EVENT";
export const VIEW_PROGRESS_TAG = "🎥 IN-PROGRESS";
export const VIEW_FLASHBACK_TAG = "⏪ FLASHBACK";
export const VIEW_EVENT_AR = "ماذا حدث؟";
export const VIEW_PROGRESS_AR = "ماذا كان يحدث؟";
export const VIEW_FLASHBACK_AR = "ماذا كان قد حدث قبل ذلك؟";

export type Tone27 = "neutral" | "en" | "good" | "bad" | "warn" | "head" | "subhead";

// ============================================================
// سجل المصدر (Source Ledger)
// كل قسم = عنوان من المصدر + وحداته الحرفية سطرًا سطرًا.
// ============================================================
export type SourceSection27 = {
  id: string;
  num?: number;
  title: string;
  /** وحدات حرفية من المصدر — كل سطر كما هو (بدون **). */
  units: string[];
  /** وحدات لا تُعرض إلا بعد «تحقق» الطالب (لا كشف مسبق). */
  revealUnits?: string[];
};

export const SOURCE_SECTIONS: SourceSection27[] = [
  {
    id: "cover",
    title: "الغلاف — الدرس 27: Past Perfect — الماضي التام",
    units: [
      "الدرس 27: Past Perfect — الماضي التام",
      "Past Perfect — الماضي التام",
    ],
  },
  {
    id: "bridge",
    title: "الافتتاح — 🧠 IQ200: كيف نعرف أي حدث حدث أولًا في الماضي؟",
    units: [
      "هذا الدرس هو الخطوة الطبيعية التالية بعد أن أتقنا:",
      "Past Simple — الماضي البسيط",
      "Past Continuous — الماضي المستمر",
      "الفرق بينهما",
      "when / while",
      "الأحداث والخلفية في القصص",
      "الآن سنضيف أداة قوية جدًا تجعلنا قادرين على ترتيب حدثين كلاهما في الماضي بدقة.",
    ],
  },
  {
    id: "objectives",
    title: "🎯 أهداف الدرس",
    units: [
      "بنهاية الدرس يجب أن تكون قادرًا على:",
      "① فهم معنى Past Perfect الحقيقي.",
      "② معرفة متى نستخدمه ومتى لا نستخدمه.",
      "③ تكوين الجملة المثبتة والمنفية.",
      "④ تكوين الأسئلة والإجابات القصيرة.",
      "⑤ فهم V3 أو Past Participle.",
      "⑥ استخدام الأفعال المنتظمة وغير المنتظمة مع Past Perfect.",
      "⑦ التمييز بين Past Simple و Past Perfect.",
      "⑧ استخدام:",
      "before",
      "after",
      "by the time",
      "already",
      "just",
      "never",
      "⑨ قراءة خط زمني ومعرفة أي حدث وقع أولًا.",
      "⑩ اكتشاف الأخطاء الصعبة التي يقع فيها حتى الطلاب المتقدمون.",
    ],
  },
  {
    id: "s1",
    num: 1,
    title: "① 🧠 ما هو Past Perfect؟",
    units: [
      "Past Perfect = الماضي التام",
      "الفكرة الأساسية بسيطة جدًا:",
      "نحن نتحدث عن حدثين في الماضي، ونريد أن نوضح أن أحدهما حدث قبل الآخر.",
      "تخيل خط الزمن:",
      "الماضي الأقدم ← الحدث الأول ← الحدث الثاني ← الآن",
      "الحدث الأقدم = Past Perfect",
      "الحدث الأحدث = Past Simple",
      "مثال:",
      "When I arrived, the train had left.",
      "عندما وصلت، كان القطار قد غادر.",
      "لدينا حدثان:",
      "① القطار غادر.",
      "② أنا وصلت.",
      "أي حدث حدث أولًا؟",
      "القطار غادر أولًا.",
      "لذلك:",
      "The train had left. ← Past Perfect",
      "I arrived. ← Past Simple",
    ],
  },
  {
    id: "s2",
    num: 2,
    title: "② 🔥 الفكرة الذهبية",
    units: [
      "احفظ هذه الجملة:",
      "Past Perfect = «كان قد فعل»",
      "مثال:",
      "I had eaten.",
      "= كنت قد أكلت.",
      "She had finished.",
      "= كانت قد أنهت.",
      "They had left.",
      "= كانوا قد غادروا.",
      "He had forgotten.",
      "= كان قد نسي.",
      "لكن انتبه:",
      "لا تترجم Past Perfect حرفيًا في كل جملة.",
      "المهم هو فهم العلاقة الزمنية.",
    ],
  },
  {
    id: "s3",
    num: 3,
    title: "③ 🕰️ خط الزمن",
    units: [
      "لنأخذ مثالًا:",
      "When Sara arrived at the cinema, the movie had started.",
      "عندما وصلت سارة إلى السينما، كان الفيلم قد بدأ.",
      "الترتيب الحقيقي:",
      "① الفيلم بدأ.",
      "② سارة وصلت.",
      "إذن:",
      "The movie had started.",
      "Past Perfect",
      "Sara arrived.",
      "Past Simple",
      "خط الزمن:",
      "الفيلم بدأ ← سارة وصلت ← الآن",
      "أو:",
      "PAST",
      "│",
      "│  The movie had started.",
      "│        ↓",
      "│  Sara arrived.",
      "│",
      "NOW",
    ],
  },
  {
    id: "s4",
    num: 4,
    title: "④ ⭐ كيف نكوّن Past Perfect؟",
    units: [
      "القاعدة الأساسية:",
      "Subject + had + V3",
      "والأجمل هنا:",
      "had لا تتغير!",
      "مع جميع الضمائر نستخدم had:",
      "I had",
      "You had",
      "He had",
      "She had",
      "It had",
      "We had",
      "They had",
      "وهذا يجعل Past Perfect أسهل من Present Perfect من ناحية اختيار المساعد.",
    ],
  },
  {
    id: "s5",
    num: 5,
    title: "⑤ 🧱 ما هو V3؟",
    units: [
      "هذه نقطة مهمة جدًا.",
      "V3 = Past Participle",
      "أي:",
      "الشكل الثالث للفعل.",
      "بعض الأفعال المنتظمة:",
      "play → played → played",
      "work → worked → worked",
      "clean → cleaned → cleaned",
      "open → opened → opened",
      "في الأفعال المنتظمة:",
      "V2 = V3",
      "لكن الأفعال غير المنتظمة مختلفة.",
      "مثلاً:",
      "go → went → gone",
      "eat → ate → eaten",
      "see → saw → seen",
      "take → took → taken",
      "write → wrote → written",
      "break → broke → broken",
      "speak → spoke → spoken",
      "choose → chose → chosen",
      "forget → forgot → forgotten",
      "know → knew → known",
    ],
  },
  {
    id: "s6",
    num: 6,
    title: "⑥ 🚨 لا تخلط بين V2 و V3",
    units: [
      "هذه واحدة من أهم النقاط في الدرس.",
      "مثلاً:",
      "go → went → gone",
      "V1 = go",
      "V2 = went",
      "V3 = gone",
      "نقول:",
      "I went to school yesterday. ✅",
      "Past Simple",
      "لكن:",
      "I had gone to school before my brother arrived. ✅",
      "Past Perfect",
      "ولا نقول:",
      "I had went... ❌",
      "لأن بعد had نحتاج V3.",
      "إذن:",
      "had + V3",
      "وليس:",
      "had + V2 ❌",
    ],
  },
  {
    id: "s7",
    num: 7,
    title: "⑦ 🧠 لماذا نحتاج Past Perfect أصلًا؟",
    units: [
      "سؤال IQ200:",
      "إذا كان لدينا Past Simple، فلماذا نحتاج Past Perfect؟",
      "لأن Past Perfect يساعدنا على إزالة الغموض وترتيب الأحداث.",
      "انظر:",
      "When I arrived, the teacher left.",
      "هذه تعني غالبًا:",
      "وصلتُ، ثم غادر المعلم.",
      "الترتيب:",
      "① I arrived.",
      "② The teacher left.",
      "لكن:",
      "When I arrived, the teacher had left.",
      "هنا المعنى:",
      "عندما وصلت، كان المعلم قد غادر بالفعل.",
      "الترتيب:",
      "① The teacher left.",
      "② I arrived.",
      "لاحظ كيف غيّر Past Perfect ترتيب الأحداث!",
    ],
  },
  {
    id: "s8",
    num: 8,
    title: "⑧ 🎯 مثال ذكي جدًا",
    units: [
      "لدينا:",
      "Ali arrived at the restaurant.",
      "The restaurant closed.",
      "إذا قلنا:",
      "Ali arrived at the restaurant, and the restaurant closed.",
      "فهمنا أن:",
      "① Ali arrived.",
      "② restaurant closed.",
      "لكن إذا قلنا:",
      "When Ali arrived at the restaurant, the restaurant had closed.",
      "فالمعنى:",
      "عندما وصل علي إلى المطعم، كان المطعم قد أغلق.",
      "الترتيب:",
      "① المطعم أغلق.",
      "② علي وصل.",
      "Past Perfect جعل الحدث الأقدم واضحًا.",
    ],
  },
  {
    id: "s9",
    num: 9,
    title: "⑨ 🟢 الجملة المثبتة",
    units: [
      "القاعدة:",
      "Subject + had + V3",
      "أمثلة:",
      "I had finished my homework.",
      "كنت قد أنهيت واجبي.",
      "She had cleaned her room.",
      "كانت قد نظفت غرفتها.",
      "He had eaten breakfast.",
      "كان قد تناول الفطور.",
      "We had arrived before noon.",
      "كنا قد وصلنا قبل الظهر.",
      "They had completed the project.",
      "كانوا قد أكملوا المشروع.",
      "The dog had escaped.",
      "كان الكلب قد هرب.",
    ],
  },
  {
    id: "s10",
    num: 10,
    title: "⑩ 🔥 Past Perfect مع الأفعال غير المنتظمة",
    units: [
      "هنا يبدأ التحدي الحقيقي.",
      "لاحظ:",
      "eat → ate → eaten",
      "I ate breakfast.",
      "I had eaten breakfast before school started.",
      "go → went → gone",
      "She went home.",
      "She had gone home before I called.",
      "see → saw → seen",
      "We saw the painting.",
      "We had seen the painting before.",
      "take → took → taken",
      "He took the book.",
      "He had taken the book before the lesson started.",
      "write → wrote → written",
      "Maya wrote the message.",
      "Maya had written the message before she lost her phone.",
      "break → broke → broken",
      "Tom broke the window.",
      "The window had broken before we arrived.",
    ],
  },
  {
    id: "s11",
    num: 11,
    title: "⑪ ❌ النفي",
    units: [
      "القاعدة:",
      "Subject + had not + V3",
      "أو:",
      "Subject + hadn't + V3",
      "أمثلة:",
      "I had not finished.",
      "I hadn't finished.",
      "She had not arrived.",
      "She hadn't arrived.",
      "They had not eaten.",
      "They hadn't eaten.",
      "He hadn't seen the movie.",
      "لم يكن قد شاهد الفيلم.",
      "We hadn't finished the work.",
      "لم نكن قد أنهينا العمل.",
    ],
  },
  {
    id: "s12",
    num: 12,
    title: "⑫ 🚨 انتبه!",
    units: [
      "بعد hadn't أيضًا نستخدم V3.",
      "مثال:",
      "She hadn't eaten. ✅",
      "She hadn't ate. ❌",
      "They hadn't gone. ✅",
      "They hadn't went. ❌",
      "He hadn't seen it. ✅",
      "He hadn't saw it. ❌",
      "قاعدة واحدة:",
      "had / hadn't + V3",
    ],
  },
  {
    id: "s13",
    num: 13,
    title: "⑬ ❓ الأسئلة",
    units: [
      "نضع had في بداية السؤال:",
      "Had + Subject + V3?",
      "مثال:",
      "Had you finished your homework?",
      "هل كنت قد أنهيت واجبك؟",
      "Had she arrived before you?",
      "هل كانت قد وصلت قبلك؟",
      "Had they eaten dinner?",
      "هل كانوا قد تناولوا العشاء؟",
      "Had he seen the movie?",
      "هل كان قد شاهد الفيلم؟",
      "Had the train left?",
      "هل كان القطار قد غادر؟",
    ],
  },
  {
    id: "s14",
    num: 14,
    title: "⑭ 🗣️ الإجابات القصيرة",
    units: [
      "السؤال:",
      "Had you finished?",
      "الإجابة:",
      "Yes, I had.",
      "No, I hadn't.",
      "Had she arrived?",
      "Yes, she had.",
      "No, she hadn't.",
      "Had they eaten?",
      "Yes, they had.",
      "No, they hadn't.",
    ],
  },
  {
    id: "s15",
    num: 15,
    title: "⑮ 🧠 الفرق بين Past Simple و Past Perfect",
    units: [
      "لنضعهما جنبًا إلى جنب.",
      "Past Simple:",
      "I finished my homework.",
      "أنهيت واجبي.",
      "Past Perfect:",
      "I had finished my homework before dinner.",
      "كنت قد أنهيت واجبي قبل العشاء.",
      "في الجملة الأولى نحن فقط نخبرك بحدث في الماضي.",
      "في الثانية نحن نحدد أن إنهاء الواجب حدث قبل حدث آخر في الماضي.",
    ],
  },
  {
    id: "s16",
    num: 16,
    title: "⑯ 🔥 المقارنة الأهم",
    units: [
      "انظر:",
      "When I arrived, Lina left.",
      "الترتيب الطبيعي:",
      "I arrived → Lina left.",
      "لكن:",
      "When I arrived, Lina had left.",
      "الترتيب:",
      "Lina left → I arrived.",
      "هذه من أهم الأفكار في الدرس.",
    ],
  },
  {
    id: "s17",
    num: 17,
    title: "⑰ ⏱️ before",
    units: [
      "before = قبل",
      "غالبًا تساعدنا على ترتيب الأحداث.",
      "مثال:",
      "The students had left before the teacher arrived.",
      "كان الطلاب قد غادروا قبل أن يصل المعلم.",
      "الترتيب:",
      "① الطلاب غادروا.",
      "② المعلم وصل.",
      "مثال آخر:",
      "I had locked the door before I went to bed.",
      "كنت قد أغلقت الباب قبل أن أذهب إلى النوم.",
      "① أغلقت الباب.",
      "② ذهبت للنوم.",
    ],
  },
  {
    id: "s18",
    num: 18,
    title: "⑱ 🔄 after",
    units: [
      "after = بعد",
      "مثال:",
      "After I had finished my project, I watched a movie.",
      "بعد أن كنت قد أنهيت مشروعي، شاهدت فيلمًا.",
      "الترتيب:",
      "① finished project",
      "② watched movie",
      "مهم جدًا:",
      "After + Past Perfect → Past Simple",
      "في كثير من الحالات.",
      "مثال:",
      "After she had eaten dinner, she went for a walk.",
      "① أكلت العشاء.",
      "② ذهبت للمشي.",
    ],
  },
  {
    id: "s19",
    num: 19,
    title: "⑲ ⏳ by the time",
    units: [
      "by the time = بحلول الوقت الذي / عندما حلّ الوقت الذي...",
      "وهي من الكلمات المهمة جدًا مع Past Perfect.",
      "مثال:",
      "By the time we arrived, the concert had started.",
      "بحلول الوقت الذي وصلنا فيه، كان الحفل قد بدأ.",
      "الترتيب:",
      "① الحفل بدأ.",
      "② نحن وصلنا.",
      "مثال:",
      "By the time the doctor arrived, the patient had fallen asleep.",
      "عندما وصل الطبيب، كان المريض قد نام.",
    ],
  },
  {
    id: "s20",
    num: 20,
    title: "⑳ ⭐ already",
    units: [
      "already = بالفعل / مسبقًا",
      "تستخدم لتوضيح أن الحدث كان قد حدث قبل نقطة معينة في الماضي.",
      "مثال:",
      "When I called Omar, he had already left.",
      "عندما اتصلت بعمر، كان قد غادر بالفعل.",
      "الترتيب:",
      "① Omar left.",
      "② I called.",
      "مثال:",
      "The students had already finished the test when the bell rang.",
      "كان الطلاب قد أنهوا الاختبار بالفعل عندما رن الجرس.",
    ],
  },
  {
    id: "s21",
    num: 21,
    title: "㉑ ⚡ just",
    units: [
      "just = للتو / للتوّ قبل لحظة",
      "يمكن أن نستخدمها مع Past Perfect عندما نتحدث عن شيء حدث قبل حدث ماضٍ آخر.",
      "مثال:",
      "When I entered the kitchen, Mom had just finished cooking.",
      "عندما دخلت المطبخ، كانت أمي قد انتهت للتو من الطبخ.",
    ],
  },
  {
    id: "s22",
    num: 22,
    title: "㉒ 🧠 never",
    units: [
      "never = أبدًا",
      "يمكن استخدامها مع Past Perfect في سياقات تتحدث عن تجربة لم تحدث قبل نقطة ماضية معينة.",
      "مثال:",
      "Before that trip, I had never seen snow.",
      "قبل تلك الرحلة، لم أكن قد رأيت الثلج من قبل.",
      "هذا مثال مهم جدًا لأننا لا نتحدث فقط عن «حدث قديم».",
      "نحن نقول:",
      "حتى تلك اللحظة في الماضي، لم تكن لدي هذه التجربة.",
    ],
  },
  {
    id: "s23",
    num: 23,
    title: "㉓ 🏆 المثال الأسطوري",
    units: [
      "اقرأ هذه القصة:",
      "When Daniel arrived at the airport, his plane had already left.",
      "Daniel arrived at the airport.",
      "But his plane had already left.",
      "ماذا حدث أولًا؟",
      "① The plane left.",
      "② Daniel arrived.",
      "لذلك:",
      "The plane had left.",
      "Daniel arrived.",
    ],
  },
  {
    id: "s24",
    num: 24,
    title: "㉔ 🕵️ Grammar Detective",
    units: [
      "اقرأ:",
      "When Emma got home, her brother had cooked dinner.",
      "لدينا:",
      "had cooked = Past Perfect",
      "got = Past Simple",
      "اسأل:",
      "ما الحدث الأول؟",
      "الطبخ.",
      "ما الحدث الثاني؟",
      "وصول Emma.",
      "إذن:",
      "① Her brother cooked dinner.",
      "② Emma got home.",
    ],
  },
  {
    id: "s25",
    num: 25,
    title: "㉕ 🔥 هل Past Perfect يعني دائمًا «كان قد»؟",
    units: [
      "ليس بالضرورة أن تكون الترجمة العربية حرفية.",
      "مثال:",
      "After they had finished the game, they went home.",
      "يمكن ترجمتها:",
      "بعد أن أنهوا المباراة، ذهبوا إلى المنزل.",
      "ليس ضروريًا أن نقول:",
      "بعد أن كانوا قد أنهوا...",
      "المهم أن تفهم أن:",
      "had finished",
      "حدث قبل:",
      "went",
    ],
  },
  {
    id: "s26",
    num: 26,
    title: "㉖ 🧠 Past Perfect لا يعني «حدث منذ زمن طويل»",
    units: [
      "خطأ شائع جدًا.",
      "قد يكون الحدثان متقاربين جدًا.",
      "مثال:",
      "When I opened the door, the cat had escaped.",
      "ربما هربت القطة قبل وصولي بثوانٍ فقط.",
      "لكنها حدثت أولًا.",
      "إذن Past Perfect لا يعني:",
      "«شيء حدث منذ سنوات».",
      "بل يعني:",
      "«هذا الحدث حدث قبل حدث ماضٍ آخر.»",
    ],
  },
  {
    id: "s27",
    num: 27,
    title: "㉗ 🚨 Past Perfect ليس مطلوبًا دائمًا",
    units: [
      "لا نستخدمه لمجرد أن الجملة في الماضي.",
      "مثال:",
      "Yesterday, I visited my grandmother.",
      "صحيح.",
      "لا نحتاج:",
      "Yesterday, I had visited my grandmother.",
      "لأننا لا نقارن هنا بين حدثين ماضيين يحتاجان إلى ترتيب.",
    ],
  },
  {
    id: "s28",
    num: 28,
    title: "㉘ 🧩 عندما يكون الترتيب واضحًا أصلًا",
    units: [
      "مثال:",
      "After I finished my homework, I played football.",
      "هذه الجملة صحيحة جدًا.",
      "يمكن أيضًا أن نقول:",
      "After I had finished my homework, I played football.",
      "كلاهما ممكن حسب السياق.",
      "لأن كلمة after أصلًا تساعدنا على معرفة الترتيب.",
      "إذن Past Perfect ليس زرًا يجب وضعه في كل جملة تحتوي على حدثين في الماضي.",
      "نستخدمه عندما يكون توضيح «أي حدث حدث أولًا» مهمًا أو مفيدًا.",
    ],
  },
  {
    id: "s29",
    num: 29,
    title: "㉙ 🧠 قاعدة IQ200",
    units: [
      "اسأل نفسك:",
      "هل لدي حدثان في الماضي؟",
      "إذا كان الجواب نعم:",
      "اسأل:",
      "أي حدث حدث أولًا؟",
      "الحدث الأول ← Past Perfect",
      "الحدث الثاني ← Past Simple",
      "مثال:",
      "The bus arrived.",
      "I reached the station.",
      "من وصل أولًا؟",
      "الباص.",
      "إذن:",
      "When I reached the station, the bus had arrived.",
    ],
  },
  {
    id: "s30",
    num: 30,
    title: "㉚ 🧪 تدريب 1 — اختر الفعل الصحيح",
    units: [
      "أكمل:",
      "1. When I arrived, the movie had ______.",
      "a) start",
      "b) started",
      "c) starting",
      "2. She had ______ breakfast before school.",
      "a) eat",
      "b) ate",
      "c) eaten",
      "3. They had ______ home before the storm began.",
      "a) gone",
      "b) went",
      "c) go",
      "4. He had ______ the letter before he lost it.",
      "a) write",
      "b) wrote",
      "c) written",
      "5. We had ______ that place before.",
      "a) saw",
      "b) seen",
      "c) see",
      "الإجابات:",
    ],
    revealUnits: ["1. started", "2. eaten", "3. gone", "4. written", "5. seen"],
  },
  {
    id: "s31",
    num: 31,
    title: "㉛ 🧪 تدريب 2 — had أو have؟",
    units: [
      "اختر:",
      "1. She ______ finished before I arrived.",
      "2. They ______ finished their homework now.",
      "3. He ______ gone home before we called.",
      "4. We ______ seen this movie before.",
      "انتبه:",
      "إذا كان الحديث عن نقطة ماضية:",
      "had",
      "إذا كان الحديث مرتبطًا بالحاضر:",
      "have / has",
      "سنأخذ هذا الفرق بشكل أعمق عندما نصل إلى Present Perfect.",
    ],
    revealUnits: ["1. had", "2. have", "3. had", "4. have"],
  },
  {
    id: "s32",
    num: 32,
    title: "㉜ 🧪 تدريب 3 — Past Simple أم Past Perfect؟",
    units: [
      "اختر:",
      "1. When I arrived, the train ______.",
      "a) left",
      "b) had left",
      "2. She ______ dinner and then watched TV.",
      "a) finished",
      "b) had finished",
      "3. By the time we got there, the shop ______.",
      "a) closed",
      "b) had closed",
      "4. I ______ my friend yesterday.",
      "a) visited",
      "b) had visited",
      "5. When the teacher entered, the students ______ their work.",
      "a) had finished",
      "b) finished",
      "فكر في الترتيب، لا تحفظ الإجابة.",
    ],
    revealUnits: ["1. had left", "2. finished", "3. had closed", "4. visited", "5. had finished"],
  },
  {
    id: "s33",
    num: 33,
    title: "㉝ 🧠 تدريب IQ200 — رتّب الأحداث",
    units: [
      "الجملة:",
      "When Noah arrived at the station, the train had already disappeared.",
      "حدد:",
      "A = Noah arrived.",
      "B = The train disappeared.",
      "أي حدث أولًا؟",
      "الإجابة:",
    ],
    revealUnits: ["B → A", "لأن:", "The train had disappeared.", "Noah arrived."],
  },
  {
    id: "s34",
    num: 34,
    title: "㉞ 🧠 تدريب IQ200 — اكتشف الخطأ",
    units: [
      "الجمل التالية تحتوي على أخطاء:",
      "① She had went home before I arrived.",
      "② They had ate dinner before the movie.",
      "③ Did he had finished the work?",
      "④ He hadn't saw the message.",
      "⑤ When I arrived, Sara had left already.",
      "صححها.",
      "الإجابات:",
    ],
    revealUnits: [
      "① She had gone home before I arrived.",
      "② They had eaten dinner before the movie.",
      "③ Had he finished the work?",
      "④ He hadn't seen the message.",
      "⑤ When I arrived, Sara had already left.",
    ],
  },
  {
    id: "s35",
    num: 35,
    title: "㉟ 🔥 تحدي التحويل",
    units: [
      "حوّل الجمل إلى Past Perfect عندما يكون ذلك مناسبًا.",
      "مثال:",
      "The train left.",
      "I arrived.",
      "نريد التعبير عن أن القطار غادر أولًا.",
      "الإجابة:",
      "The train had left before I arrived.",
      "الآن:",
      "Sara finished the test.",
      "The teacher collected the papers.",
      "الإجابة:",
      "أصعب:",
      "The children ate dinner.",
      "Their parents came home.",
      "الإجابة:",
    ],
    revealUnits: [
      "Sara had finished the test before the teacher collected the papers.",
      "The children had eaten dinner before their parents came home.",
    ],
  },
  {
    id: "s36",
    num: 36,
    title: "㊱ 🕵️ Grammar Detective — المستوى المتقدم",
    units: [
      "اقرأ:",
      "When the police arrived at the museum, the thief had disappeared. The guards were looking around, and several visitors were talking quietly. The police searched the building, but they couldn't find the thief.",
      "حدد الأزمنة:",
      "لماذا استخدم الكاتب ثلاثة أزمنة؟",
      "لأن كل زمن يؤدي وظيفة مختلفة:",
      "وهنا نرى كيف بدأت الأزمنة تعمل معًا بدل أن تكون دروسًا منفصلة.",
    ],
    revealUnits: [
      "had disappeared",
      "→ Past Perfect",
      "arrived",
      "→ Past Simple",
      "were looking",
      "→ Past Continuous",
      "were talking",
      "→ Past Continuous",
      "searched",
      "→ Past Simple",
      "couldn't find",
      "→ Past Simple",
      "Past Perfect",
      "→ يحدد الحدث الذي وقع قبل نقطة ماضية.",
      "Past Continuous",
      "→ يصنع الخلفية أو يصف ما كان يحدث.",
      "Past Simple",
      "→ يحرك الأحداث إلى الأمام.",
    ],
  },
  {
    id: "s37",
    num: 37,
    title: "㊲ 🎬 القصة السينمائية",
    units: [
      "تذكر درس 26:",
      "Past Continuous = 🎥 الكاميرا تصور ما كان يحدث.",
      "Past Simple = 📸 لقطة الحدث.",
      "والآن أضف:",
      "Past Perfect = ⏪ فلاش باك يوضح شيئًا حدث قبل ذلك.",
      "مثال:",
      "Emma was walking through the old market when she found a mysterious key. She looked at it carefully and realized that she had seen it before.",
      "هنا:",
      "was walking",
      "→ خلفية مستمرة",
      "found",
      "→ حدث",
      "looked",
      "→ حدث",
      "realized",
      "→ حدث",
      "had seen",
      "→ شيء حدث قبل لحظة إدراكها",
      "وهذا هو الاستخدام المتقدم الحقيقي لـ Past Perfect.",
    ],
  },
  {
    id: "s38",
    num: 38,
    title: "㊳ 🧠 الفرق بين الأزمنة الثلاثة",
    units: [
      "لنأخذ مشهدًا واحدًا:",
      "At 8:00, Liam was studying.",
      "Past Continuous:",
      "Liam was studying.",
      "ثم:",
      "His phone rang.",
      "Past Simple:",
      "His phone rang.",
      "ثم:",
      "He realized that he had forgotten to charge it.",
      "Past Perfect:",
      "He had forgotten to charge it.",
      "الآن القصة تحتوي:",
      "🎥 was studying",
      "→ ماذا كان يحدث؟",
      "📸 rang",
      "→ ماذا حدث؟",
      "⏪ had forgotten",
      "→ ماذا كان قد حدث قبل لحظة الإدراك؟",
      "هذه هي قوة اللغة الإنجليزية.",
    ],
  },
  {
    id: "s39",
    num: 39,
    title: "㊴ 🏆 تحدي IQ200 الحقيقي",
    units: [
      "رتّب الأحداث التالية:",
      "A. The teacher entered the classroom.",
      "B. The students had completed the exercise.",
      "C. The students were talking.",
      "D. The teacher started the lesson.",
      "يمكن أن تكون القصة:",
    ],
    revealUnits: [
      "The students were talking when the teacher entered the classroom. They had completed the exercise before the teacher entered. Then the teacher started the lesson.",
      "الترتيب:",
      "① students completed exercise",
      "② students were talking",
      "③ teacher entered",
      "④ teacher started lesson",
      "لاحظ أن الحدثين ① و② قد يكونان سابقين أو مستمرين حول لحظة الدخول بحسب السياق، ولذلك لا نعتمد على الكلمات وحدها؛ نفهم المعنى.",
    ],
  },
  {
    id: "s40",
    num: 40,
    title: "㊵ 🧠 سؤال صعب جدًا",
    units: [
      "ما الفرق بين:",
      "When I arrived, John left.",
      "و:",
      "When I arrived, John had left.",
      "الإجابة:",
      "الأولى:",
      "I arrived → John left.",
      "الثانية:",
      "John left → I arrived.",
      "تغيير صغير جدًا في الكلمة، لكنه يغيّر ترتيب الأحداث بالكامل.",
    ],
  },
  {
    id: "s41",
    num: 41,
    title: "㊶ 🚀 IQ200 — هل يمكنك اكتشاف المشكلة؟",
    units: [
      "الجملة:",
      "When I arrived at the party, everyone had danced.",
      "هل هي صحيحة نحويًا؟",
      "نعم، يمكن أن تكون صحيحة نحويًا، لكن المعنى قد لا يكون ما نريده.",
      "إذا قصدنا:",
      "«عندما وصلت، كان الجميع قد رقصوا وانتهى الأمر.»",
      "فهي ممكنة.",
      "لكن إذا قصدنا:",
      "«عندما وصلت، كان الجميع يرقصون.»",
      "فنحتاج:",
      "When I arrived at the party, everyone was dancing.",
      "إذن:",
      "had danced",
      "→ الرقص حدث وانتهى قبل نقطة ماضية.",
      "was dancing",
      "→ الرقص كان مستمرًا عند وصولي.",
      "هذه هي الدقة التي نريد الوصول إليها.",
    ],
  },
  {
    id: "s42",
    num: 42,
    title: "㊷ ⚔️ Boss Battle",
    units: [
      "اختر الجملة التي تناسب المعنى:",
      "«عندما دخلت الغرفة، كان أخي نائمًا.»",
      "A. When I entered the room, my brother had slept.",
      "B. When I entered the room, my brother was sleeping.",
      "الإجابة:",
      "«عندما وصلت إلى المحطة، كان القطار قد غادر.»",
      "A. When I arrived at the station, the train was leaving.",
      "B. When I arrived at the station, the train had left.",
      "الإجابة:",
    ],
    revealUnits: ["B", "لأن النوم كان مستمرًا في لحظة دخولي.", "B", "لأن مغادرة القطار حدثت قبل وصولي."],
  },
  {
    id: "s43",
    num: 43,
    title: "㊸ 🧪 الاختبار النهائي",
    units: [
      "اختر الإجابة الصحيحة:",
      "① When we arrived, the match ______.",
      "A) had started",
      "B) was starting",
      "C) start",
      "② She had ______ her keys before she left the house.",
      "A) find",
      "B) found",
      "C) found",
      "③ They ______ dinner when I called them.",
      "A) had eaten",
      "B) were eating",
      "C) eat",
      "④ He couldn't enter because he ______ his key.",
      "A) had lost",
      "B) was losing",
      "C) loses",
      "⑤ By the time I woke up, my family ______.",
      "A) had left",
      "B) leave",
      "C) were leave",
      "⑥ We ______ the museum yesterday.",
      "A) visited",
      "B) had visited",
      "C) had visit",
      "⑦ Had you ______ the message before the meeting?",
      "A) read",
      "B) reading",
      "C) reads",
      "⑧ She hadn't ______ the movie before.",
      "A) saw",
      "B) seen",
      "C) see",
      "⑨ When I got home, my sister was cooking and my brother ______ TV.",
      "A) watched",
      "B) had watched",
      "C) was watching",
      "⑩ When I called Ali, he had already ______ home.",
      "A) gone",
      "B) went",
      "C) going",
    ],
    revealUnits: [
      "1. had started",
      "2. found",
      "3. were eating",
      "4. had lost",
      "5. had left",
      "6. visited",
      "7. read",
      "8. seen",
      "9. was watching",
      "10. gone",
    ],
  },
  {
    id: "s44",
    num: 44,
    title: "㊹ 🏆 المهمة النهائية — Build the Story",
    units: [
      "اكتب قصة من 10 جمل على الأقل.",
      "يجب أن تحتوي على:",
      "✅ 3 جمل Past Simple على الأقل.",
      "✅ 2 جمل Past Continuous على الأقل.",
      "✅ 3 جمل Past Perfect على الأقل.",
      "✅ when مرة واحدة على الأقل.",
      "✅ while مرة واحدة على الأقل.",
      "✅ before أو after.",
      "✅ حدثين واضحين أحدهما سبق الآخر.",
      "موضوع القصة:",
      "«The Mysterious Door»",
      "الباب الغامض",
      "مثال بداية فقط:",
      "Last Saturday, Adam was walking through an old building when he noticed a strange door.",
      "لا تكمل القصة من هذا المثال مباشرة.",
      "ابنِ قصتك بنفسك.",
    ],
  },
  {
    id: "golden",
    title: "🧠 الملخص الذهبي",
    units: [
      "Past Perfect = الماضي التام",
      "الفكرة:",
      "حدث أقدم في الماضي + حدث أحدث في الماضي.",
      "القاعدة:",
      "Subject + had + V3",
      "النفي:",
      "Subject + had not + V3",
      "أو:",
      "Subject + hadn't + V3",
      "السؤال:",
      "Had + Subject + V3?",
      "الإجابة القصيرة:",
      "Yes, ... had.",
      "No, ... hadn't.",
    ],
  },
  {
    id: "words",
    title: "⭐ الكلمات المهمة",
    units: [
      "before = قبل",
      "after = بعد",
      "by the time = بحلول الوقت الذي",
      "already = بالفعل",
      "just = للتو",
      "never = أبدًا",
    ],
  },
  {
    id: "rule",
    title: "🧠 القاعدة التي يجب ألا تنساها",
    units: [
      "إذا رأيت:",
      "had",
      "فكر مباشرة:",
      "V3",
      "وليس V2.",
      "go → went → gone",
      "eat → ate → eaten",
      "see → saw → seen",
      "write → wrote → written",
      "take → took → taken",
    ],
  },
  {
    id: "map",
    title: "🗺️ خريطة الأزمنة التي وصلنا إليها",
    units: [
      "حتى الآن أصبح لدينا:",
      "① Present Simple",
      "→ العادات والحقائق",
      "② Present Continuous",
      "→ ما يحدث الآن أو في الفترة الحالية",
      "③ Past Simple",
      "→ حدث وقع وانتهى في الماضي",
      "④ Past Continuous",
      "→ شيء كان يحدث في لحظة ماضية",
      "⑤ Past Simple vs Past Continuous",
      "→ حدث مقابل شيء كان مستمرًا",
      "⑥ Past Perfect",
      "→ حدث أقدم من حدث ماضٍ آخر",
      "والخطوة القادمة المنطقية ستكون التعمق أكثر في نظام الماضي، ثم الانتقال لاحقًا إلى الأزمنة التامة المستمرة، مع الحفاظ على المقارنات بدل حفظ القواعد بشكل منفصل.",
    ],
  },
  {
    id: "finalrule",
    title: "🧠 IQ200 FINAL RULE",
    units: [
      "لا تحفظ:",
      "«Past Perfect = had + V3»",
      "فقط.",
      "احفظ الفكرة:",
      "📸 Past Simple = ماذا حدث؟",
      "🎥 Past Continuous = ماذا كان يحدث؟",
      "⏪ Past Perfect = ماذا كان قد حدث قبل ذلك؟",
      "إذا استطعت أن تجيب عن هذه الأسئلة الثلاثة، فأنت لا تحفظ الأزمنة فقط...",
      "أنت بدأت تفكر بالزمن كما يفكر به المتحدث باللغة الإنجليزية.",
    ],
  },
  {
    id: "closing",
    title: "الخاتمة — LESSON 27 COMPLETE",
    units: [
      "أكملت الدرس 27: Past Perfect — الماضي التام. الآن تستطيع ترتيب حدثين في الماضي: ⏪ الأقدم مع Past Perfect و 📸 الأحدث مع Past Simple.",
    ],
  },
];

export const SOURCE_NUMBERED_COUNT = 44;
export const SOURCE_LEDGER_COUNT = SOURCE_SECTIONS.length;

/** أرقام أقسام المصدر 1–44 مرتبة — تُستخدم في الترويسة والتدقيق. */
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
// Source typo correction — Section ㊸ Question ②
// النص المورّد الأصلي محفوظ حرفيًا في سجل المصدر أعلاه:
//   A) find / B) found / C) found  (B و C متطابقتان — خطأ مطبعي في المصدر)
// التصحيح التربوي الأدنى: C تصبح founded (تصريف يؤسس — مشتت معقول)،
// فيبقى found وحده الصحيح. التمرين المعروض يستخدم الخيارات المصححة.
// موثّق أيضًا في docs/lesson27-coverage.md.
// ============================================================
export const TYPO_S43_Q2 = {
  section: "㊸ 🧪 الاختبار النهائي",
  question: "② She had ______ her keys before she left the house.",
  original: ["find", "found", "found"],
  corrected: ["find", "found", "founded"],
  answer: 1,
  note: "الأصل المورّد: B) found / C) found (typo). التصحيح: C) founded — فيبقى found الإجابة الوحيدة.",
} as const;

// ============================================================
// جدول الأفعال V1 → V2 → V3 (القسم ⑤ كما ورد في المصدر)
// ============================================================
export type VerbRow27 = { v1: string; v2: string; v3: string; regular: boolean };

export const VERB_TABLE_27: VerbRow27[] = [
  { v1: "play", v2: "played", v3: "played", regular: true },
  { v1: "work", v2: "worked", v3: "worked", regular: true },
  { v1: "clean", v2: "cleaned", v3: "cleaned", regular: true },
  { v1: "open", v2: "opened", v3: "opened", regular: true },
  { v1: "go", v2: "went", v3: "gone", regular: false },
  { v1: "eat", v2: "ate", v3: "eaten", regular: false },
  { v1: "see", v2: "saw", v3: "seen", regular: false },
  { v1: "take", v2: "took", v3: "taken", regular: false },
  { v1: "write", v2: "wrote", v3: "written", regular: false },
  { v1: "break", v2: "broke", v3: "broken", regular: false },
  { v1: "speak", v2: "spoke", v3: "spoken", regular: false },
  { v1: "choose", v2: "chose", v3: "chosen", regular: false },
  { v1: "forget", v2: "forgot", v3: "forgotten", regular: false },
  { v1: "know", v2: "knew", v3: "known", regular: false },
];

// ============================================================
// تدريبات الأقسام ㉚–㉟ (أسئلة المصدر + شروح المنصة موسومة)
// ============================================================
export type Mcq27 = {
  n: number;
  stem: string;
  opts: string[];
  answer: number;
  why: string;
  /** سياق منصّة موسوم (يُعرض بشارة Platform Explanation) عند الحاجة لإزالة الغموض. */
  context?: string;
};

// ㉚ — إجابات المصدر: started / eaten / gone / written / seen
export const EX27_V3: Mcq27[] = [
  { n: 1, stem: "When I arrived, the movie had ______.", opts: ["start", "started", "starting"], answer: 1, why: "بعد had نحتاج V3: الفيلم بدأ قبل وصولي، والفعل منتظم — started." },
  { n: 2, stem: "She had ______ breakfast before school.", opts: ["eat", "ate", "eaten"], answer: 2, why: "eat → ate → eaten: بعد had نستخدم V3 وليس V2 — eaten." },
  { n: 3, stem: "They had ______ home before the storm began.", opts: ["gone", "went", "go"], answer: 0, why: "go → went → gone: المغادرة حدثت أولًا — gone." },
  { n: 4, stem: "He had ______ the letter before he lost it.", opts: ["write", "wrote", "written"], answer: 2, why: "write → wrote → written: كتابة الرسالة سبقت فقدانها — written." },
  { n: 5, stem: "We had ______ that place before.", opts: ["saw", "seen", "see"], answer: 1, why: "see → saw → seen: الرؤية السابقة تجربة قبل نقطة ماضية — seen." },
];

// ㉛ — المصدر يعطي القاعدة دون مفتاح؛ الإجابات مستنتجة من القاعدة المصدرية (منصّة).
export const EX27_HADHAVE: Mcq27[] = [
  { n: 1, stem: "She ______ finished before I arrived.", opts: ["had", "have"], answer: 0, why: "before I arrived نقطة ماضية — الحديث عن الماضي → had." },
  { n: 2, stem: "They ______ finished their homework now.", opts: ["had", "have"], answer: 1, why: "now مرتبطة بالحاضر → have (سنفصّل Present Perfect لاحقًا)." },
  { n: 3, stem: "He ______ gone home before we called.", opts: ["had", "have"], answer: 0, why: "before we called نقطة ماضية → had." },
  { n: 4, stem: "We ______ seen this movie before.", opts: ["had", "have"], answer: 1, why: "تجربة مرتبطة بالحاضر (حتى الآن) → have." },
];

// ㉜ — المصدر بلا مفتاح؛ السياقات من المنصة (موسومة) لإزالة الغموض، والإجابات مشتقة منها.
export const EX27_SIMPLE_PERFECT: Mcq27[] = [
  { n: 1, stem: "When I arrived, the train ______.", opts: ["left", "had left"], answer: 1, context: "المعنى المقصود: عندما وصلتُ، كان القطار قد غادر قبلي.", why: "القطار غادر أولًا (الحدث الأقدم) → had left." },
  { n: 2, stem: "She ______ dinner and then watched TV.", opts: ["finished", "had finished"], answer: 0, why: "سلسلة أحداث متتابعة مع and then — الترتيب واضح، والماضي البسيط طبيعي → finished." },
  { n: 3, stem: "By the time we got there, the shop ______.", opts: ["closed", "had closed"], answer: 1, why: "by the time تعني أن الإغلاق سبق وصولنا → had closed." },
  { n: 4, stem: "I ______ my friend yesterday.", opts: ["visited", "had visited"], answer: 0, why: "حدث ماضٍ واحد بلا مقارنة مع حدث آخر → لا نحتاج Past Perfect: visited." },
  { n: 5, stem: "When the teacher entered, the students ______ their work.", opts: ["had finished", "finished"], answer: 0, context: "المعنى المقصود: كانوا قد أنهوا عملهم قبل لحظة دخوله.", why: "الإنهاء حدث قبل الدخول (الحدث الأقدم) → had finished." },
];

// ㉝ — ترتيب نوح: B أولًا ثم A
export const EX27_NOAH = {
  sentence: "When Noah arrived at the station, the train had already disappeared.",
  events: [
    { key: "A", en: "Noah arrived.", ar: "نوح وصل." },
    { key: "B", en: "The train disappeared.", ar: "القطار اختفى." },
  ],
  first: "B",
  why: "The train had disappeared بصيغة Past Perfect — إذن الاختفاء هو الحدث الأقدم: B → A.",
} as const;

// ㉞ — الأخطاء الخمسة المورّدة + تصحيحات المصدر
export const EX27_ERRORS: { n: string; wrong: string; fixed: string; why: string }[] = [
  { n: "①", wrong: "She had went home before I arrived.", fixed: "She had gone home before I arrived.", why: "بعد had نحتاج V3: go → went → gone." },
  { n: "②", wrong: "They had ate dinner before the movie.", fixed: "They had eaten dinner before the movie.", why: "بعد had نحتاج V3: eat → ate → eaten." },
  { n:  "③", wrong: "Did he had finished the work?", fixed: "Had he finished the work?", why: "سؤال Past Perfect يبدأ بـ Had وحده — لا نجمع did مع had." },
  { n: "④", wrong: "He hadn't saw the message.", fixed: "He hadn't seen the message.", why: "بعد hadn't أيضًا V3: see → saw → seen." },
  { n: "⑤", wrong: "When I arrived, Sara had left already.", fixed: "When I arrived, Sara had already left.", why: "موضع already الصحيح بين had والفعل: had already left." },
];

// ㉟ — تحدي التحويل (المثال الأول محلول في المصدر، والاثنان الباقيان تحدٍّ)
export const EX27_TRANSFORM = {
  worked: {
    a: "The train left.",
    b: "I arrived.",
    want: "نريد التعبير عن أن القطار غادر أولًا.",
    answer: "The train had left before I arrived.",
  },
  items: [
    { n: 1, a: "Sara finished the test.", b: "The teacher collected the papers.", answer: "Sara had finished the test before the teacher collected the papers.", why: "إنهاء سارة للاختبار هو الحدث الأقدم → Past Perfect + before." },
    { n: 2, a: "The children ate dinner.", b: "Their parents came home.", answer: "The children had eaten dinner before their parents came home.", why: "العشاء سبق عودة الأهل — والفعل غير منتظم: eat → ate → eaten." },
  ],
} as const;

// ㊱ — محقق المتحف: الأفعال الستة وأزمنتها المورّدة
export const DETECTIVE_27: { verb: string; tense: "Past Perfect" | "Past Simple" | "Past Continuous"; role: string }[] = [
  { verb: "had disappeared", tense: "Past Perfect", role: "يحدد الحدث الذي وقع قبل نقطة ماضية." },
  { verb: "arrived", tense: "Past Simple", role: "يحرّك الأحداث إلى الأمام." },
  { verb: "were looking", tense: "Past Continuous", role: "يصنع الخلفية: ما كان يحدث." },
  { verb: "were talking", tense: "Past Continuous", role: "يصنع الخلفية: ما كان يحدث." },
  { verb: "searched", tense: "Past Simple", role: "يحرّك الأحداث إلى الأمام." },
  { verb: "couldn't find", tense: "Past Simple", role: "يحرّك الأحداث إلى الأمام." },
];

// ㊴ — تحدي الترتيب: يقبل الترتيبين المتوافقين مع ملاحظة المصدر حول السياق.
export const ORDER_27_CHALLENGE = {
  items: [
    { key: "A", en: "The teacher entered the classroom.", ar: "المعلم دخل الصف." },
    { key: "B", en: "The students had completed the exercise.", ar: "الطلاب كانوا قد أكملوا التمرين." },
    { key: "C", en: "The students were talking.", ar: "الطلاب كانوا يتحدثون." },
    { key: "D", en: "The teacher started the lesson.", ar: "المعلم بدأ الدرس." },
  ],
  /** الترتيب المورّد + البديل المقبول بحسب ملاحظة السياق في المصدر. */
  accept: [
    ["B", "C", "A", "D"],
    ["C", "B", "A", "D"],
  ],
  story: "The students were talking when the teacher entered the classroom. They had completed the exercise before the teacher entered. Then the teacher started the lesson.",
  order: ["① students completed exercise", "② students were talking", "③ teacher entered", "④ teacher started lesson"],
  nuance: "لاحظ أن الحدثين ① و② قد يكونان سابقين أو مستمرين حول لحظة الدخول بحسب السياق، ولذلك لا نعتمد على الكلمات وحدها؛ نفهم المعنى.",
} as const;

// ㊷ — Boss Battle (المعركتان المورّدتان)
export const BOSS_27 = [
  {
    n: 1,
    meaning: "«عندما دخلت الغرفة، كان أخي نائمًا.»",
    opts: ["When I entered the room, my brother had slept.", "When I entered the room, my brother was sleeping."],
    answer: 1,
    why: "لأن النوم كان مستمرًا في لحظة دخولي → was sleeping.",
  },
  {
    n: 2,
    meaning: "«عندما وصلت إلى المحطة، كان القطار قد غادر.»",
    opts: ["When I arrived at the station, the train was leaving.", "When I arrived at the station, the train had left."],
    answer: 1,
    why: "لأن مغادرة القطار حدثت قبل وصولي → had left.",
  },
] as const;

// ㊸ — الاختبار النهائي المورّد (10 أسئلة) — Q2 بالخيارات المصححة، والإجابات مستنتجة (منصّة).
export const EX27_FINAL: Mcq27[] = [
  { n: 1, stem: "When we arrived, the match ______.", opts: ["had started", "was starting", "start"], answer: 0, context: "المعنى المقصود: عندما وصلنا، كانت المباراة قد بدأت قبلنا.", why: "البدء حدث قبل الوصول → had started." },
  { n: 2, stem: "She had ______ her keys before she left the house.", opts: ["find", "found", "founded"], answer: 1, why: "بعد had نحتاج V3: find → found → found. (الخيار C مصحح من typo المصدر: found المكررة → founded.)" },
  { n: 3, stem: "They ______ dinner when I called them.", opts: ["had eaten", "were eating", "eat"], answer: 1, context: "المعنى المقصود: كانوا يتناولون العشاء لحظة اتصالي.", why: "العشاء كان مستمرًا لحظة الاتصال (حدث قاطع) → were eating." },
  { n: 4, stem: "He couldn't enter because he ______ his key.", opts: ["had lost", "was losing", "loses"], answer: 0, why: "فقدان المفتاح سبق لحظة المنع → had lost." },
  { n: 5, stem: "By the time I woke up, my family ______.", opts: ["had left", "leave", "were leave"], answer: 0, why: "by the time تعني أن المغادرة سبقت استيقاظي → had left." },
  { n: 6, stem: "We ______ the museum yesterday.", opts: ["visited", "had visited", "had visit"], answer: 0, why: "حدث ماضٍ واحد بلا مقارنة → visited. (had visit خطأ: بعد had يأتي V3.)" },
  { n: 7, stem: "Had you ______ the message before the meeting?", opts: ["read", "reading", "reads"], answer: 0, why: "Had + Subject + V3: صيغة V3 من read هي read." },
  { n: 8, stem: "She hadn't ______ the movie before.", opts: ["saw", "seen", "see"], answer: 1, why: "بعد hadn't نستخدم V3: see → saw → seen." },
  { n: 9, stem: "When I got home, my sister was cooking and my brother ______ TV.", opts: ["watched", "had watched", "was watching"], answer: 2, why: "حدثان متوازيان مستمران (was cooking … and …) → was watching." },
  { n: 10, stem: "When I called Ali, he had already ______ home.", opts: ["gone", "went", "going"], answer: 0, why: "had already + V3: go → went → gone." },
];

// ============================================================
// منطقة الاختبارات — 20 سؤالًا جديدًا كليًا (لا نسخ من تمارين المصدر)
// الأنواع: single | tf | multi | order | match | spot
// التسجيل: كل سؤال = درجة واحدة. multi/order/match تُحتسب عند التطابق التام.
// ============================================================
export type TestQ27 =
  | { n: number; type: "single"; ar: string; en?: string; opts: string[]; answer: number; why: string; trap?: string }
  | { n: number; type: "tf"; ar: string; en?: string; answer: boolean; why: string; trap?: string }
  | { n: number; type: "multi"; ar: string; en?: string; opts: string[]; answer: number[]; why: string; trap?: string }
  | { n: number; type: "order"; ar: string; en?: string; items: string[]; answer: string[]; why: string; trap?: string }
  | { n: number; type: "match"; ar: string; en?: string; left: string[]; right: string[]; answer: number[]; why: string; trap?: string }
  | { n: number; type: "spot"; ar: string; segments: string[]; answer: number; fix: string; why: string; trap?: string };

export const TEST_27: TestQ27[] = [
  {
    n: 1, type: "single",
    ar: "أكمل: عندما عدتُ إلى البيت، كانت أمي قد طهت العشاء.",
    en: "By the time I got home, Mom had ___ dinner.",
    opts: ["cooked", "cook", "cooking"], answer: 0,
    why: "الطهو حدث قبل عودتي (الحدث الأقدم) → Past Perfect: had + V3. الفعل منتظم: cooked.",
    trap: "«cook» مضارع ولا يأتي بعد had، و«cooking» صيغة مستمرة تحتاج was/were.",
  },
  {
    n: 2, type: "single",
    ar: "أكمل بتصريف الفعل الصحيح:",
    en: "He had ___ the letter before he left the office.",
    opts: ["written", "wrote", "write"], answer: 0,
    why: "بعد had نحتاج V3 دائمًا: write → wrote → written. كتابة الرسالة سبقت المغادرة.",
    trap: "«wrote» هو V2 — الفخ الأشهر في هذا الدرس: had + V2 خطأ.",
  },
  {
    n: 3, type: "single",
    ar: "اختر الفعل المساعد الصحيح: الحديث عن نقطة ماضية (قبل العاصفة).",
    en: "They ___ finished their homework before the storm began.",
    opts: ["had", "have", "has"], answer: 0,
    why: "before the storm began نقطة ماضية، والحديث عن حدث أقدم منها → had (ثابت مع كل الضمائر).",
    trap: "«have/has» للحاضر (Present Perfect) — والجملة كلها في الماضي.",
  },
  {
    n: 4, type: "tf",
    ar: "صح أم خطأ: «had» تتغير حسب الفاعل مثل have / has.",
    answer: false,
    why: "خطأ: had لا تتغير أبدًا — I had / he had / they had كلها صحيحة.",
    trap: "من يخلط مع Present Perfect (has مع المفرد) يقع في هذا الفخ.",
  },
  {
    n: 5, type: "single",
    ar: "أكمل النفي:",
    en: "We ___ finished the report when the manager called.",
    opts: ["hadn't", "haven't", "didn't had"], answer: 0,
    why: "النفي في Past Perfect: hadn't + V3. الاتصال حدث ماضٍ، وعدم الإنهاء أقدم منه.",
    trap: "«didn't had» تجمع مساعدين — خطأ؛ و«haven't» للحاضر.",
  },
  {
    n: 6, type: "single",
    ar: "اختر الصيغة الصحيحة بعد النفي:",
    en: "She ___ the movie before that evening.",
    opts: ["hadn't seen", "hadn't saw", "didn't seen"], answer: 0,
    why: "بعد hadn't نستخدم V3 أيضًا: see → saw → seen. قاعدة واحدة: had / hadn't + V3.",
    trap: "«saw» هو V2 — النفي لا يغيّر القاعدة.",
  },
  {
    n: 7, type: "single",
    ar: "كوّن سؤال Past Perfect صحيحًا:",
    en: "___ you finished before noon?",
    opts: ["Had", "Did", "Were"], answer: 0,
    why: "سؤال Past Perfect: Had + Subject + V3. لا did ولا were يصلحان هنا.",
    trap: "«Did you finished?» خطأ مزدوج: did تحتاج المصدر، وهي للماضي البسيط أصلًا.",
  },
  {
    n: 8, type: "single",
    ar: "أجب بالنفي عن السؤال: Had they eaten?",
    en: "Had they eaten? — ___",
    opts: ["No, they hadn't.", "No, they didn't.", "No, they haven't."], answer: 0,
    why: "الإجابة القصيرة تكرر مساعد السؤال نفسه: Had …? → Yes, they had. / No, they hadn't.",
    trap: "«didn't» جواب لسؤال did، و«haven't» جواب لسؤال have — والسؤال هنا بـ had.",
  },
  {
    n: 9, type: "order",
    ar: "رتّب الأحداث من الأقدم إلى الأحدث: «When Karim sat down, the film had already started.»",
    items: ["The film started.", "Karim sat down.", "Karim bought popcorn before the film."],
    answer: ["Karim bought popcorn before the film.", "The film started.", "Karim sat down."],
    why: "had started تعني أن البدء سبق الجلوس، وشراء الفشار سبق البدء. الترتيب: الفشار ← البدء ← الجلوس.",
    trap: "ترتيب الكلمات في الجملة ليس ترتيب الأحداث — الفعل بصيغة had هو الأقدم دائمًا.",
  },
  {
    n: 10, type: "single",
    ar: "اختر الجملة التي تعني: «عندما وصلتُ، كان القطار قد غادر.»",
    opts: ["When I arrived, the train had left.", "When I arrived, the train left."],
    answer: 0,
    why: "«كان قد غادر» = الحدث الأقدم → had left. الجملة الثانية تعني أنه غادر بعد وصولي — معنى معكوس تمامًا.",
    trap: "الفرق كلمة واحدة (had) لكنه يقلب الترتيب الزمني كله.",
  },
  {
    n: 11, type: "single",
    ar: "أكمل بأداة الترتيب الصحيحة:",
    en: "The students had left ___ the teacher arrived.",
    opts: ["before", "after", "while"], answer: 0,
    why: "المغادرة (Past Perfect = الأقدم) حدثت قبل الوصول → before.",
    trap: "«after» تعكس المعنى، و«while» تربط حدثين مستمرين لا حدثين مرتبين.",
  },
  {
    n: 12, type: "single",
    ar: "أكمل حسب نمط after:",
    en: "After she had eaten dinner, she ___ for a walk.",
    opts: ["went", "had gone", "goes"], answer: 0,
    why: "النمط الشائع: After + Past Perfect ← Past Simple. الذهاب للمشي هو الحدث الأحدث → went.",
    trap: "وضع had في الجملتين يفقد التمييز بين الأقدم والأحدث.",
  },
  {
    n: 13, type: "single",
    ar: "أكمل: بحلول وقت وصولنا كان الحفل قد بدأ.",
    en: "By the time we arrived, the concert ___.",
    opts: ["had started", "started", "starts"], answer: 0,
    why: "by the time تعلن أن البدء سبق الوصول → had started.",
    trap: "الماضي البسيط «started» هنا يجعل البدء لاحقًا أو متزامنًا — عكس المقصود.",
  },
  {
    n: 14, type: "spot",
    ar: "المس الجزء الخاطئ في الجملة:",
    segments: ["She", "had went", "home early."],
    answer: 1, fix: "She had gone home early.",
    why: "الخطأ في «had went»: بعد had نحتاج V3 — go → went → gone. الصواب: had gone.",
    trap: "«went» صحيحة في Past Simple («She went») لكنها خطأ بعد had.",
  },
  {
    n: 15, type: "single",
    ar: "اختر التكملة الصحيحة (الموضع + التصريف):",
    en: "When I called Ali, he had ___ home.",
    opts: ["already gone", "gone already", "already went"], answer: 0,
    why: "موضع already بين had والفعل، والفعل V3: had already gone.",
    trap: "«gone already» موضع خاطئ، و«already went» تصريف خاطئ (V2 بعد had).",
  },
  {
    n: 16, type: "single",
    ar: "المعنى: انتهت أمي من الطبخ للتوّ قبل دخولي. أكمل:",
    en: "When I entered the kitchen, Mom had ___ finished cooking.",
    opts: ["just", "never", "yet"], answer: 0,
    why: "«للتوّ قبل لحظة» = just. never تعني أبدًا (عكس المعنى)، وyet لا تأتي هنا.",
    trap: "never و just كلتاهما تأتيان مع Past Perfect — لكن المعنى هو الفيصل.",
  },
  {
    n: 17, type: "single",
    ar: "المعنى: قبل تلك الرحلة لم تكن لديّ تجربة الثلج إطلاقًا. أكمل:",
    en: "Before that trip, I had ___ seen snow.",
    opts: ["never", "ever", "already"], answer: 0,
    why: "«لم أكن قد رأيت من قبل» = had never seen: تجربة غائبة حتى نقطة ماضية.",
    trap: "«already» تعني أن التجربة حدثت — عكس المقصود تمامًا.",
  },
  {
    n: 18, type: "match",
    ar: "صل كل فعل بدوره في المشهد: «Lina was reading when the phone rang. She realized she had missed the call.»",
    left: ["was reading", "rang", "had missed"],
    right: ["background — خلفية مستمرة", "event — حدث", "flashback — حدث أقدم"],
    answer: [0, 1, 2],
    why: "was reading خلفية مستمرة (🎥)، وrang الحدث القاطع (📸)، وhad missed حدث أقدم من لحظة الإدراك (⏪).",
    trap: "had missed ليست الحدث الرئيسي — إنها فلاش باك يفسّر ما قبل اللحظة.",
  },
  {
    n: 19, type: "single",
    ar: "المعنى: عندما وصلتُ إلى الحفلة كان الجميع يرقصون (مستمرين). اختر:",
    opts: ["When I arrived at the party, everyone was dancing.", "When I arrived at the party, everyone had danced."],
    answer: 0,
    why: "الرقص كان مستمرًا لحظة الوصول → Past Continuous. had danced تعني أنهم رقصوا وانتهوا قبل وصولي.",
    trap: "الجملة الثانية صحيحة نحويًا لكن معناها مختلف — الدقة في المعنى لا في القاعدة فقط.",
  },
  {
    n: 20, type: "multi",
    ar: "أي الجمل التالية تستخدم Past Perfect استخدامًا صحيحًا؟ (اختر كل الصحيح)",
    opts: [
      "She had finished before noon.",
      "They had went home early.",
      "Had you seen it before?",
      "He hadn't saw the message.",
    ],
    answer: [0, 2],
    why: "الأولى: had + V3 مثبتة صحيحة. الثالثة: سؤال Had + V3 صحيح. الثانية خطأ (went بدل gone)، والرابعة خطأ (saw بدل seen).",
    trap: "الجملتان الخاطئتان تبدوان مألوفتين — لكن had/hadn't يطلبان V3 دائمًا.",
  },
];

export function answerLabel27(q: TestQ27): string {
  if (q.type === "single") return q.opts[q.answer];
  if (q.type === "tf") return q.answer ? "✓ صحيح" : "✕ خطأ";
  if (q.type === "multi") return q.answer.map((i) => q.opts[i]).join("  +  ");
  if (q.type === "order") return q.answer.join(" ← ");
  if (q.type === "match") return q.left.map((l, i) => `${l} → ${q.right[q.answer[i]]}`).join(" · ");
  if (q.type === "spot") return `الخطأ في: "${q.segments[q.answer]}" ← الصواب: ${q.fix}`;
  return "";
}

export const TEST_27_SOLUTIONS = TEST_27.map((q) => ({
  n: q.n,
  ar: q.ar,
  en: q.en,
  answer: answerLabel27(q),
  why: q.why,
  trap: q.trap,
}));

export const OBJECTIVES_27 = SOURCE_SECTIONS[2].units;

// ============================================================
// منطقة المعلم — الدرس 27 (محتوى تعليمي للمعلم، خلف كلمة المرور)
// ============================================================
export const TEACHER_PASSWORD_27 = "somer173";

export const TEACHER_27_OVERVIEW = {
  title: "Lesson Overview — نظرة عامة",
  objectives: [
    "أن يفهم الطالب أن Past Perfect يرتّب حدثين ماضيين: الأقدم بصيغة had + V3.",
    "أن يميّز V3 عن V2 في الأفعال المنتظمة وغير المنتظمة.",
    "أن يكوّن المثبت والمنفي والسؤال والإجابة القصيرة.",
    "أن يستخدم before / after / by the time / already / just / never.",
    "أن يقرأ خطًا زمنيًا ويحدد الحدث الأقدم.",
    "أن يميّز Past Perfect عن Past Simple و Past Continuous في السياق.",
  ],
  prerequisites: [
    "Past Simple — الماضي البسيط (حدث مكتمل).",
    "Past Continuous — الماضي المستمر (was/were + V-ing).",
    "الفرق بينهما + when / while (الدرسان 25 و26).",
    "تصاريف الأفعال الشائعة V1/V2.",
  ],
  core: [
    "الحدث الأقدم ← Past Perfect (had + V3).",
    "الحدث الأحدث ← Past Simple.",
    "📸 ماذا حدث؟ · 🎥 ماذا كان يحدث؟ · ⏪ ماذا كان قد حدث قبل ذلك؟",
  ],
} as const;

export type TeacherNote27 = { head: string; lines: string[] };

export const TEACHER_27_NOTES: TeacherNote27[] = [
  { head: "المعنى — Meaning", lines: ["Past Perfect ليس زمنًا منعزلًا بل علاقة بين حدثين: أقدم وأحدث.", "السؤال المفتاح دائمًا: أي حدث وقع أولًا؟"] },
  { head: "الترتيب الزمني — Chronology", lines: ["الأقدم = had + V3، والأحدث = الماضي البسيط غالبًا.", "ترتيب الكلمات في الجملة ليس ترتيب الأحداث — التلميذ يجب أن يستخرج الترتيب من الصيغ."] },
  { head: "had + V3", lines: ["القاعدة الوحيدة: Subject + had + V3.", "had ثابتة مع كل الضمائر — أسهل من have/has."] },
  { head: "V2 مقابل V3", lines: ["الفخ الأول في الدرس: had + V2 (مثل had went).", "درّب على go → went → gone و eat → ate → eaten و see → saw → seen أولًا ثم وسّع."] },
  { head: "المثبت — Affirmative", lines: ["I had finished. — ركّز على أن الإنهاء سبق نقطة ماضية مذكورة أو مفهومة."] },
  { head: "المنفي — Negative", lines: ["hadn't + V3 (وليس hadn't + V2): They hadn't gone.", "الخطأ الشائع hadn't saw / hadn't went — عالجه مبكرًا."] },
  { head: "الأسئلة — Questions", lines: ["Had + Subject + V3? — مساعد واحد فقط في البداية.", "خطأ did + had (مثل Did he had finished?) سببه نقل عادة الماضي البسيط."] },
  { head: "الإجابات القصيرة — Short answers", lines: ["Yes, I had. / No, I hadn't. — تكرار مساعد السؤال نفسه."] },
  { head: "before", lines: ["الحدث بصيغة Past Perfect يقع قبل الحدث الآخر: had left before he arrived."] },
  { head: "after", lines: ["النمط الشائع: After + Past Perfect ← Past Simple.", "نبّه أن after وحدها توضّح الترتيب، فيصحّ الماضي البسيط أيضًا حسب السياق (القسم ㉘)."] },
  { head: "by the time", lines: ["تعني أن حدث had سبق نقطة الوصول/الحدوث: By the time we arrived, it had started."] },
  { head: "already", lines: ["الموضع: بين had والفعل — had already left.", "المعنى: الحدث كان قد تمّ قبل النقطة الماضية."] },
  { head: "just", lines: ["للتوّ قبل لحظة: had just finished — الفارق الزمني صغير لكن الترتيب ثابت."] },
  { head: "never", lines: ["تجربة غائبة حتى نقطة ماضية: had never seen — ليست نفيًا عامًا بل تحديدًا زمنيًا."] },
  { head: "متى يكون Past Perfect مفيدًا؟", lines: ["عندما يكون ترتيب الحدثين مهمًا وغير واضح بدونه (المعلم left مقابل had left).", "مع by the time وعند إزالة الغموض في القصص."] },
  { head: "متى لا نحتاجه؟", lines: ["حدث ماضٍ واحد: Yesterday, I visited… (بلا had).", "الترتيب واضح أصلًا (after + تتابع): يصحّ البسيط، وكلاهما ممكن حسب السياق.", "Past Perfect ليس زرًا إلزاميًا مع كل حدثين."] },
];

export type TeacherSolution27 = { head: string; lines: string[] };

export const TEACHER_27_SOLUTIONS: TeacherSolution27[] = [
  { head: "㉚ تدريب 1 — اختر الفعل الصحيح", lines: ["1. started — فعل منتظم: V3 = started.", "2. eaten — eat → ate → eaten.", "3. gone — go → went → gone.", "4. written — write → wrote → written.", "5. seen — see → saw → seen.", "القاعدة الجامعة: بعد had يأتي V3 دائمًا."] },
  { head: "㉛ تدريب 2 — had أو have؟", lines: ["1. had — قبل نقطة ماضية (before I arrived).", "2. have — مرتبطة بالحاضر (now).", "3. had — قبل نقطة ماضية (before we called).", "4. have — تجربة مرتبطة بالحاضر.", "ملاحظة للمعلم: المصدر يعطي القاعدة دون مفتاح؛ الإجابات مستنتجة منها ومعروضة للطالب بعد التحقق."] },
  { head: "㉜ تدريب 3 — Past Simple أم Past Perfect؟", lines: ["1. had left — بمعنى: القطار غادر قبل وصولي (السياق معروض للطالب بشارة منصّة).", "2. finished — تتابع مع and then والترتيب واضح.", "3. had closed — by the time تعلن الأسبقية.", "4. visited — حدث واحد بلا مقارنة.", "5. had finished — بمعنى: أنهوا العمل قبل الدخول (السياق معروض للطالب).", "نبّه الطلاب: بعض الجمل تتغير إجابتها بتغيّر المعنى المقصود — وهذه هي الفكرة لا عيب في السؤال."] },
  { head: "㉝ ترتيب الأحداث — Noah", lines: ["B → A: القطار اختفى أولًا (had disappeared) ثم وصل نوح.", "درّب الطالب على استخراج الترتيب من الصيغة لا من ترتيب الكلمات."] },
  { head: "㉞ اكتشف الخطأ", lines: ["① had went ← had gone (V3 بعد had).", "② had ate ← had eaten.", "③ Did he had finished? ← Had he finished? (مساعد واحد).", "④ hadn't saw ← hadn't seen (V3 بعد hadn't).", "⑤ had left already ← had already left (موضع already)."] },
  { head: "㉟ تحدي التحويل", lines: ["المثال المحلول: The train had left before I arrived.", "Sara had finished the test before the teacher collected the papers.", "The children had eaten dinner before their parents came home.", "ركّز على خطوتين: حدّد الأقدم ← ضعه بصيغة had + V3 مع before."] },
  { head: "㊱ محقق المتحف (متقدم)", lines: ["had disappeared ← Past Perfect (الحدث الأقدم).", "arrived / searched / couldn't find ← Past Simple (تحريك الأحداث).", "were looking / were talking ← Past Continuous (الخلفية).", "ناقش: كل زمن له وظيفة — التحديد المسبق، الخلفية، التقدم."] },
  { head: "㊷ Boss Battle", lines: ["المعركة 1: B — was sleeping (النوم مستمر لحظة الدخول).", "المعركة 2: B — had left (المغادرة قبل الوصول).", "القرار من المعنى لا من حفظ القالب."] },
  { head: "㊸ الاختبار النهائي المورّد (10 أسئلة)", lines: ["1. had started — البدء سبق الوصول.", "2. found — V3 بعد had. (تصحيح typo المصدر: الخيار C أصبح founded بدل found المكررة — موثّق في التغطية.)", "3. were eating — بمعنى: العشاء مستمر لحظة الاتصال (السياق معروض للطالب).", "4. had lost — الفقد سبق المنع.", "5. had left — by the time تعلن الأسبقية.", "6. visited — حدث واحد.", "7. read — Had + V3 (تصريف read ثابت).", "8. seen — V3 بعد hadn't.", "9. was watching — توازٍ مع was cooking.", "10. gone — had already + V3."] },
  { head: "توجيه المختبرات الكبرى", lines: ["مختبر الخط الزمني: اطلب من الطالب نطق الترتيب قبل كشف الإجابة.", "مختبر V1/V2/V3: ابدأ بالأفعال العشرة غير المنتظمة ثم المنتظمة للمقارنة.", "مفتاح Lina: بدّل بين الجملتين واطلب إعادة رسم الترتيب شفهيًا.", "السينما ثلاثية الأزمنة: اطلب تسمية دور كل فعل (خلفية/حدث/فلاش باك) قبل الكشف.", "تحدي ㊴: اقبل الترتيبين B,C,A,D و C,B,A,D وناقش ملاحظة السياق — لا تعاقب الفهم."] },
];

export const TEACHER_27_RUBRIC: { head: string; lines: string[] } = {
  head: "Story Rubric — سلّم قصة «The Mysterious Door»",
  lines: [
    "الطول: 10 جمل على الأقل (تُحتسب الجمل بعلامات . ? !).",
    "Past Simple: 3 جمل على الأقل (أحداث: noticed, opened, ran…).",
    "Past Continuous: جملتان على الأقل (was/were + V-ing للخلفية).",
    "Past Perfect: 3 جمل على الأقل (had + V3 لحدث أقدم).",
    "when مرة واحدة على الأقل + while مرة واحدة على الأقل.",
    "before أو after مرة واحدة على الأقل.",
    "حدثان واضحان أحدهما سبق الآخر (ترتيب مفهوم من الصيغ).",
    "الموضوع: The Mysterious Door — والبداية المقترحة للعرض فقط لا للنسخ.",
    "التقييم: كل متطلب محقق = علامة؛ الخصم الأكبر لأخطاء had + V2 وكسر الترتيب الزمني.",
  ],
};

export const TEACHER_27_MISTAKES: TeacherNote27[] = [
  { head: "had + V2", lines: ["مثل had went / had ate — عالج بـ: بعد had يأتي V3 فقط، واحفظ ثلاثيات الأفعال."] },
  { head: "hadn't + V2", lines: ["مثل hadn't saw — النفي لا يغيّر القاعدة: hadn't + V3."] },
  { head: "did + had", lines: ["مثل Did he had finished? — الصواب Had he finished? بمساعد واحد."] },
  { head: "Past Perfect مقابل Past Continuous", lines: ["had danced = انتهى قبل نقطة ماضية؛ was dancing = مستمر عندها. القرار من المعنى (القسم ㊶)."] },
  { head: "Past Perfect غير الضروري", lines: ["حدث واحد أو ترتيب واضح بـ after — البسيط أصحّ وأطبيعي (القسم ㉗–㉘)."] },
  { head: "Past Perfect ≠ منذ زمن طويل", lines: ["قد يفصل بين الحدثين ثوانٍ (القطة والقسم ㉖) — المهم الأسبقية لا البعد."] },
  { head: "already / just / never", lines: ["already بين had والفعل؛ just للتوّ؛ never لتجربة غائبة حتى نقطة ماضية."] },
  { head: "مشاكل الترتيب مع when", lines: ["left بعد I arrived تعني اللاحق؛ had left تعني السابق — كلمة had تقلب الترتيب (الأقسام ⑦ ⑯ ㊵)."] },
];

// ============================================================
// ㊹ Build the Story — متطلبات بانية القصة
// ============================================================
export const STORY_27_REQUIREMENTS = [
  "اكتب قصة من 10 جمل على الأقل.",
  "3 جمل Past Simple على الأقل.",
  "2 جمل Past Continuous على الأقل.",
  "3 جمل Past Perfect على الأقل.",
  "when مرة واحدة على الأقل.",
  "while مرة واحدة على الأقل.",
  "before أو after.",
  "حدثان واضحان أحدهما سبق الآخر.",
] as const;

export const STORY_27_STARTER = "Last Saturday, Adam was walking through an old building when he noticed a strange door.";

// ============================================================
// الشرائح والمختبرات والتدريبات
// ============================================================
export type Lab27 =
  | "timeline"
  | "orderQuiz"
  | "saraDiagram"
  | "hadGrid"
  | "verbRegular"
  | "verbIrregular"
  | "v2v3"
  | "teacherSwitch"
  | "aliOrder"
  | "pairsA"
  | "pairsB"
  | "shortFlip"
  | "sideBySide"
  | "linaSwitch"
  | "beforeLab"
  | "afterLab"
  | "bytimeLab"
  | "emmaDetective"
  | "needToggle"
  | "iqStepper"
  | "emmaCinema"
  | "liamScene"
  | "johnSwitch"
  | "dancePrecision";

export type Block27 =
  | { t: "units"; from: number; to?: number; tone?: Tone27 }
  | { t: "lab"; lab: Lab27; covers?: [number, number] }
  | { t: "note"; emoji: string; text: string }
  | { t: "strip"; items: string[]; tone?: Tone27 };

export type Exercise27 =
  | { type: "v3" }
  | { type: "hadhave" }
  | { type: "simplePerfect" }
  | { type: "noah" }
  | { type: "errors" }
  | { type: "transform" }
  | { type: "museum" }
  | { type: "orderChal" }
  | { type: "boss" }
  | { type: "final10" }
  | { type: "story" };

export type Slide27 = { section: string; mascot: string; sourceIndex?: number; covers?: [number, number] } & (
  | { kind: "cover"; title: string }
  | { kind: "objectives"; title: string }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block27[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle?: string; ex: Exercise27 }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const TIME = "الزمن والخط الزمني";
const BUILD = "التكوين: had + V3";
const WHY = "لماذا نحتاجه؟";
const AFFIRM = "المثبت";
const NEGQ = "النفي والأسئلة";
const COMPARE = "المقارنة الحاسمة";
const WORDS = "كلمات الترتيب";
const STORY = "القصص والمحقق";
const MYTHS = "مفاهيم خاطئة وقاعدة IQ200";
const PRACTICE = "التدريبات";
const ADV = "المستوى المتقدم";
const BOSS = "التحديات النهائية";
const END = "الخاتمة";

export const SECTIONS_27 = [START, TIME, BUILD, WHY, AFFIRM, NEGQ, COMPARE, WORDS, STORY, MYTHS, PRACTICE, ADV, BOSS, END] as const;

export const SLIDES: Slide27[] = [
  { kind: "cover", section: START, mascot: "⏪", title: LESSON_TITLE_27, sourceIndex: SEC.cover, covers: [0, 2] },
  {
    kind: "lesson", section: START, mascot: "🔗", sourceIndex: SEC.bridge, step: "0",
    title: "الجسر من الدروس السابقة — لماذا هذا الدرس؟",
    lead: "بعد Past Simple و Past Continuous و when / while… حان وقت ترتيب حدثين في الماضي.",
    blocks: [{ t: "units", from: 0, to: 7, tone: "head" }],
    tip: "السؤال البصري للدرس: 📸 What happened? · 🎥 What was happening? · ⏪ What had happened before that?",
  },
  { kind: "objectives", section: START, mascot: "🎯", sourceIndex: SEC.objectives, covers: [0, 17], title: "أهداف الدرس — 10 أهداف" },

  {
    kind: "lesson", section: TIME, mascot: "🧠", sourceIndex: SEC.s1, step: "1",
    title: "ما هو Past Perfect؟",
    lead: "حدثان في الماضي… أحدهما أقدم من الآخر.",
    blocks: [{ t: "lab", lab: "timeline", covers: [0, 8] }],
  },
  {
    kind: "lesson", section: TIME, mascot: "🚂", sourceIndex: SEC.s1,
    title: "أي حدث وقع أولًا؟ — مثال القطار",
    blocks: [{ t: "lab", lab: "orderQuiz", covers: [8, 18] }],
  },
  {
    kind: "lesson", section: TIME, mascot: "🔥", sourceIndex: SEC.s2, step: "2",
    title: "الفكرة الذهبية — «كان قد فعل»",
    blocks: [{ t: "units", from: 0, to: 14, tone: "head" }],
    tip: "لا تترجم حرفيًا في كل جملة — المهم فهم العلاقة الزمنية.",
  },
  {
    kind: "lesson", section: TIME, mascot: "🕰️", sourceIndex: SEC.s3, step: "3",
    title: "خط الزمن — مثال سارة والسينما",
    lead: "الفيلم بدأ ← سارة وصلت ← الآن.",
    blocks: [{ t: "lab", lab: "saraDiagram", covers: [0, 21] }],
  },

  {
    kind: "lesson", section: BUILD, mascot: "⭐", sourceIndex: SEC.s4, step: "4",
    title: "كيف نكوّن Past Perfect؟ — had لا تتغير!",
    blocks: [{ t: "lab", lab: "hadGrid", covers: [0, 13] }],
  },
  {
    kind: "lesson", section: BUILD, mascot: "🧱", sourceIndex: SEC.s5, step: "5",
    title: "ما هو V3؟ — الأفعال المنتظمة",
    blocks: [{ t: "lab", lab: "verbRegular", covers: [0, 11] }],
  },
  {
    kind: "lesson", section: BUILD, mascot: "🧱", sourceIndex: SEC.s5,
    title: "الأفعال غير المنتظمة — العشرة المهمة",
    blocks: [{ t: "lab", lab: "verbIrregular", covers: [11, 23] }],
    tip: "في المنتظمة V2 = V3 — لكن غير المنتظمة مختلفة تمامًا.",
  },
  {
    kind: "lesson", section: BUILD, mascot: "🚨", sourceIndex: SEC.s6, step: "6",
    title: "لا تخلط بين V2 و V3",
    lead: "had + V3 ✅ — وليس had + V2 ❌.",
    blocks: [{ t: "lab", lab: "v2v3", covers: [0, 19] }],
  },

  {
    kind: "lesson", section: WHY, mascot: "🧠", sourceIndex: SEC.s7, step: "7",
    title: "لماذا نحتاج Past Perfect أصلًا؟",
    lead: "لأنه يزيل الغموض ويرتّب الأحداث.",
    blocks: [{ t: "lab", lab: "teacherSwitch", covers: [0, 18] }],
  },
  {
    kind: "lesson", section: WHY, mascot: "🎯", sourceIndex: SEC.s8, step: "8",
    title: "مثال ذكي جدًا — علي والمطعم",
    blocks: [{ t: "lab", lab: "aliOrder", covers: [0, 16] }],
  },

  {
    kind: "lesson", section: AFFIRM, mascot: "🟢", sourceIndex: SEC.s9, step: "9",
    title: "الجملة المثبتة — Subject + had + V3",
    blocks: [{ t: "units", from: 0, to: 15, tone: "head" }],
  },
  {
    kind: "lesson", section: AFFIRM, mascot: "🔥", sourceIndex: SEC.s10, step: "10",
    title: "مع الأفعال غير المنتظمة (1): eat / go / see",
    blocks: [{ t: "lab", lab: "pairsA", covers: [0, 11] }],
  },
  {
    kind: "lesson", section: AFFIRM, mascot: "🔥", sourceIndex: SEC.s10,
    title: "مع الأفعال غير المنتظمة (2): take / write / break",
    blocks: [{ t: "lab", lab: "pairsB", covers: [11, 20] }],
  },

  {
    kind: "lesson", section: NEGQ, mascot: "❌", sourceIndex: SEC.s11, step: "11",
    title: "النفي — hadn't + V3",
    blocks: [{ t: "units", from: 0, to: 15, tone: "head" }],
  },
  {
    kind: "lesson", section: NEGQ, mascot: "🚨", sourceIndex: SEC.s12, step: "12",
    title: "انتبه! — بعد hadn't أيضًا V3",
    blocks: [{ t: "units", from: 0, to: 10, tone: "head" }],
  },
  {
    kind: "lesson", section: NEGQ, mascot: "❓", sourceIndex: SEC.s13, step: "13",
    title: "الأسئلة — Had + Subject + V3?",
    blocks: [{ t: "units", from: 0, to: 13, tone: "head" }],
  },
  {
    kind: "lesson", section: NEGQ, mascot: "🗣️", sourceIndex: SEC.s14, step: "14",
    title: "الإجابات القصيرة — Yes, I had.",
    blocks: [{ t: "lab", lab: "shortFlip", covers: [0, 11] }],
  },

  {
    kind: "lesson", section: COMPARE, mascot: "🧠", sourceIndex: SEC.s15, step: "15",
    title: "الفرق بين Past Simple و Past Perfect",
    blocks: [{ t: "lab", lab: "sideBySide", covers: [0, 9] }],
  },
  {
    kind: "lesson", section: COMPARE, mascot: "🔥", sourceIndex: SEC.s16, step: "16",
    title: "المقارنة الأهم — Lina left أم Lina had left؟",
    lead: "كلمة واحدة تغيّر ترتيب الأحداث بالكامل.",
    blocks: [{ t: "lab", lab: "linaSwitch", covers: [0, 9] }],
  },

  {
    kind: "lesson", section: WORDS, mascot: "⏱️", sourceIndex: SEC.s17, step: "17",
    title: "before — قبل",
    blocks: [{ t: "lab", lab: "beforeLab", covers: [0, 13] }],
  },
  {
    kind: "lesson", section: WORDS, mascot: "🔄", sourceIndex: SEC.s18, step: "18",
    title: "after — بعد",
    lead: "After + Past Perfect → Past Simple.",
    blocks: [{ t: "lab", lab: "afterLab", covers: [0, 14] }],
  },
  {
    kind: "lesson", section: WORDS, mascot: "⏳", sourceIndex: SEC.s19, step: "19",
    title: "by the time — بحلول الوقت الذي...",
    blocks: [{ t: "lab", lab: "bytimeLab", covers: [0, 11] }],
  },
  {
    kind: "lesson", section: WORDS, mascot: "⭐", sourceIndex: SEC.s20, step: "20",
    title: "already — بالفعل",
    blocks: [{ t: "units", from: 0, to: 11, tone: "head" }],
  },
  {
    kind: "lesson", section: WORDS, mascot: "⚡", sourceIndex: SEC.s21, step: "21",
    title: "just — للتوّ",
    blocks: [{ t: "units", from: 0, to: 5, tone: "head" }],
  },
  {
    kind: "lesson", section: WORDS, mascot: "🧠", sourceIndex: SEC.s22, step: "22",
    title: "never — تجربة غائبة حتى نقطة ماضية",
    blocks: [{ t: "units", from: 0, to: 8, tone: "head" }],
  },

  {
    kind: "lesson", section: STORY, mascot: "🏆", sourceIndex: SEC.s23, step: "23",
    title: "المثال الأسطوري — Daniel والطائرة",
    blocks: [{ t: "units", from: 0, to: 10, tone: "head" }],
  },
  {
    kind: "lesson", section: STORY, mascot: "🕵️", sourceIndex: SEC.s24, step: "24",
    title: "محقق القواعد — Emma والعشاء",
    blocks: [{ t: "lab", lab: "emmaDetective", covers: [0, 13] }],
  },

  {
    kind: "lesson", section: MYTHS, mascot: "🔥", sourceIndex: SEC.s25, step: "25",
    title: "هل Past Perfect يعني دائمًا «كان قد»؟",
    blocks: [{ t: "units", from: 0, to: 11, tone: "head" }],
  },
  {
    kind: "lesson", section: MYTHS, mascot: "🧠", sourceIndex: SEC.s26, step: "26",
    title: "لا يعني «حدث منذ زمن طويل»",
    blocks: [{ t: "units", from: 0, to: 10, tone: "head" }],
  },
  {
    kind: "lesson", section: MYTHS, mascot: "🚨", sourceIndex: SEC.s27, step: "27",
    title: "ليس مطلوبًا دائمًا",
    blocks: [{ t: "units", from: 0, to: 7, tone: "head" }],
  },
  {
    kind: "lesson", section: MYTHS, mascot: "🧩", sourceIndex: SEC.s28, step: "28",
    title: "عندما يكون الترتيب واضحًا أصلًا",
    blocks: [{ t: "lab", lab: "needToggle", covers: [0, 9] }],
    tip: "نستخدمه عندما يكون توضيح «أي حدث حدث أولًا» مهمًا أو مفيدًا.",
  },
  {
    kind: "lesson", section: MYTHS, mascot: "🧠", sourceIndex: SEC.s29, step: "29",
    title: "قاعدة IQ200 — أربع خطوات",
    blocks: [{ t: "lab", lab: "iqStepper", covers: [0, 14] }],
  },

  { kind: "ex", section: PRACTICE, mascot: "🧪", sourceIndex: SEC.s30, covers: [0, 22], badge: "EXERCISE ㉚", title: "تدريب 1 — اختر الفعل الصحيح", subtitle: "أكمل بـ V3 المناسب.", ex: { type: "v3" } },
  { kind: "ex", section: PRACTICE, mascot: "🧪", sourceIndex: SEC.s31, covers: [0, 11], badge: "EXERCISE ㉛", title: "تدريب 2 — had أو have؟", subtitle: "نقطة ماضية أم حاضر؟", ex: { type: "hadhave" } },
  { kind: "ex", section: PRACTICE, mascot: "🧪", sourceIndex: SEC.s32, covers: [0, 17], badge: "EXERCISE ㉜", title: "تدريب 3 — Simple أم Perfect؟", subtitle: "فكر في الترتيب، لا تحفظ الإجابة.", ex: { type: "simplePerfect" } },
  { kind: "ex", section: PRACTICE, mascot: "🧠", sourceIndex: SEC.s33, covers: [0, 7], badge: "IQ200 ㉝", title: "رتّب الأحداث — Noah", subtitle: "أي حدث أولًا: A أم B؟", ex: { type: "noah" } },
  { kind: "ex", section: PRACTICE, mascot: "🔍", sourceIndex: SEC.s34, covers: [0, 8], badge: "IQ200 ㉞", title: "اكتشف الخطأ — خمس جمل", subtitle: "المس الجزء الخاطئ ثم صحح.", ex: { type: "errors" } },
  { kind: "ex", section: PRACTICE, mascot: "🔥", sourceIndex: SEC.s35, covers: [0, 15], badge: "CHALLENGE ㉟", title: "تحدي التحويل", subtitle: "ادمج الحدثين بجملة Past Perfect.", ex: { type: "transform" } },

  { kind: "ex", section: ADV, mascot: "🕵️", sourceIndex: SEC.s36, covers: [0, 6], badge: "DETECTIVE ㊱", title: "محقق المتحف — المستوى المتقدم", subtitle: "حدد زمن كل فعل من الأفعال الستة.", ex: { type: "museum" } },
  {
    kind: "lesson", section: ADV, mascot: "🎬", sourceIndex: SEC.s37, step: "37",
    title: "القصة السينمائية — Emma والمفتاح الغامض",
    lead: "🎥 خلفية · 📸 حدث · ⏪ فلاش باك.",
    blocks: [{ t: "lab", lab: "emmaCinema", covers: [0, 19] }],
  },
  {
    kind: "lesson", section: ADV, mascot: "🧠", sourceIndex: SEC.s38, step: "38",
    title: "الفرق بين الأزمنة الثلاثة — Liam الساعة 8:00",
    blocks: [{ t: "lab", lab: "liamScene", covers: [0, 20] }],
  },

  { kind: "ex", section: BOSS, mascot: "🏆", sourceIndex: SEC.s39, covers: [0, 6], badge: "IQ200 ㊴", title: "التحدي: رتّب A–D", subtitle: "رتّب A–D من الأقدم إلى الأحدث.", ex: { type: "orderChal" } },
  {
    kind: "lesson", section: BOSS, mascot: "🧠", sourceIndex: SEC.s40, step: "40",
    title: "سؤال صعب جدًا — John left أم had left؟",
    blocks: [{ t: "lab", lab: "johnSwitch", covers: [0, 10] }],
  },
  {
    kind: "lesson", section: BOSS, mascot: "🚀", sourceIndex: SEC.s41, step: "41",
    title: "هل يمكنك اكتشاف المشكلة؟ — had danced",
    blocks: [{ t: "lab", lab: "dancePrecision", covers: [0, 17] }],
  },
  { kind: "ex", section: BOSS, mascot: "⚔️", sourceIndex: SEC.s42, covers: [0, 9], badge: "BOSS ㊷", title: "Boss Battle — معركتان", subtitle: "اختر الجملة التي تناسب المعنى.", ex: { type: "boss" } },
  { kind: "ex", section: BOSS, mascot: "🧪", sourceIndex: SEC.s43, covers: [0, 41], badge: "FINAL ㊸", title: "الاختبار النهائي المورّد — 10 أسئلة", subtitle: "اختر الإجابة الصحيحة.", ex: { type: "final10" } },
  { kind: "ex", section: BOSS, mascot: "🏆", sourceIndex: SEC.s44, covers: [0, 16], badge: "STORY ㊹", title: "ابنِ القصة — The Mysterious Door", subtitle: "قصة من 10 جمل بالأزمنة الثلاثة.", ex: { type: "story" } },

  {
    kind: "lesson", section: END, mascot: "🧠", sourceIndex: SEC.golden,
    title: "الملخص الذهبي",
    blocks: [{ t: "units", from: 0, to: 14, tone: "head" }],
  },
  {
    kind: "lesson", section: END, mascot: "⭐", sourceIndex: SEC.words,
    title: "الكلمات المهمة",
    blocks: [
      { t: "units", from: 0, to: 6, tone: "head" },
      { t: "strip", items: ["before", "after", "by the time", "already", "just", "never"], tone: "neutral" },
    ],
  },
  {
    kind: "lesson", section: END, mascot: "🧠", sourceIndex: SEC.rule,
    title: "القاعدة التي يجب ألا تنساها — had ← V3",
    blocks: [{ t: "units", from: 0, to: 10, tone: "head" }],
  },
  {
    kind: "lesson", section: END, mascot: "🗺️", sourceIndex: SEC.map,
    title: "خريطة الأزمنة التي وصلنا إليها",
    blocks: [{ t: "units", from: 0, to: 14, tone: "head" }],
  },
  {
    kind: "lesson", section: END, mascot: "🧠", sourceIndex: SEC.finalrule,
    title: "IQ200 FINAL Rule",
    blocks: [{ t: "units", from: 0, to: 9, tone: "head" }],
  },
  { kind: "closing", section: END, mascot: "🏆", sourceIndex: SEC.closing, covers: [0, 1], title: "أحسنت! — LESSON 27 COMPLETE" },
];

export const SLIDE_COUNT = SLIDES.length;

// أخطاء مقصودة (للفحص): يجب أن تظهر في الدرس كما وردت في المصدر — لا تُصحَّح بصمت.
export const INTENTIONALLY_WRONG_27: string[] = [
  "I had went... ❌",
  "She hadn't ate. ❌",
  "They hadn't went. ❌",
  "He hadn't saw it. ❌",
  "She had went home before I arrived.",
  "They had ate dinner before the movie.",
  "Did he had finished the work?",
  "He hadn't saw the message.",
  "When I arrived, Sara had left already.",
  "Yesterday, I had visited my grandmother.",
];

// ㉞ — تقسيم الجمل الخمس إلى مقاطع قابلة للمس (الجزء الخاطئ واحد في كل جملة)
export const EX27_ERROR_SPOTS: { segs: string[]; answer: number }[] = [
  { segs: ["She", "had went", "home before I arrived."], answer: 1 },
  { segs: ["They", "had ate", "dinner before the movie."], answer: 1 },
  { segs: ["Did he had", "finished the work?"], answer: 0 },
  { segs: ["He", "hadn't saw", "the message."], answer: 1 },
  { segs: ["When I arrived,", "Sara had left", "already."], answer: 2 },
];
