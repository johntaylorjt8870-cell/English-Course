// ============================================================
// الدرس 23 — Countable & Uncountable Nouns
// المصدر المورّد هو المرجع الحرفي: لا اختصار ولا إعادة صياغة ولا حذف.
// كل وحدة إنجليزية ستُعرض داخل عازل LTR في Lesson23.tsx.
// ============================================================

// -------------------- فهرس المصدر الكامل (57 قسمًا) --------------------
export const SOURCE_SECTIONS: string[] = [
  "الافتتاح — ربط مع الدروس السابقة",
  "🎯 أهداف الدرس",
  "🧠 أولًا: ما معنى Countable؟",
  "⭐ أمثلة على Countable Nouns",
  "🧠 الاختبار السحري",
  "🔥 Countable لها شكلان",
  "🧠 تذكر",
  "🚨 الآن المفاجأة — Uncountable Nouns",
  "💧 مثال الماء",
  "🍚 مثال الأرز",
  "🧠 الفرق الأساسي",
  "⭐ مقارنة ذكية",
  "🚨 قاعدة مهمة جدًا (a / an)",
  "🧠 لماذا؟",
  "⭐ لكن انتبه! (المطعم)",
  "🧠 الأسماء غير المعدودة غالبًا لا تأخذ جمعًا",
  "🔥 كلمات مهمة جدًا يجب حفظها",
  "🧠 لكن هنا يجب أن نكون أذكياء — chicken",
  "🥤 مثال آخر: coffee",
  "🧠 قاعدة المستوى الأساسي",
  "🔗 العلاقة مع There is / There are",
  "⭐ قاعدة ذهبية (There is / There are)",
  "🧪 لنحلل المطبخ",
  "🧠 الآن: some",
  "⭐ أمثلة some",
  "🚨 انتبه — some book / some books",
  "🧠 some أمام نوعين",
  "🔥 الآن any",
  "⭐ مقارنة some / any",
  "🧠 الآن نصل إلى سؤالين مهمين جدًا",
  "🔢 How many?",
  "💧 How much?",
  "🧠 مفتاح خارق",
  "⚔️ المعركة الكبرى",
  "⭐ أمثلة متقدمة قليلًا",
  "🧠 نقطة مهمة جدًا عن money",
  "🧠 نقطة مهمة جدًا عن information",
  "🧠 نقطة مهمة جدًا عن advice",
  "🪑 نقطة مهمة عن furniture",
  "📝 نقطة مهمة عن homework",
  "🧠 Countable vs Uncountable — وجهًا لوجه",
  "⭐ كيف أختبر أي كلمة؟",
  "🧠 لكن هناك فخ!",
  "🚨 أخطاء شائعة جدًا",
  "🧠 IQ200: لا تحفظ «much = غير معدود» فقط!",
  "🔥 تدريب ① — Countable أم Uncountable؟",
  "🔥 تدريب ② — a/an أم some؟",
  "🔥 تدريب ③ — There is أم There are؟",
  "🔥 تدريب ④ — How many أم How much؟",
  "🕵️ Grammar Detective",
  "🚀 IQ200 Challenge",
  "🧠 تحدي التفكير",
  "🏆 FINAL BOSS",
  "🧠 الخلاصة الذهبية",
  "⭐ الجدول السحري",
  "🔥 أهم 7 قواعد في الدرس",
  "🗺️ أين وصلنا في المنهج؟",
];

export const SOURCE_NUMBERED_COUNT = 57;

export const LESSON_TITLE_23 = "الدرس 23: Countable & Uncountable Nouns";
export const LESSON_SUBTITLE_23 = "Countable & Uncountable Nouns";
export const LESSON_ARABIC_TITLE_23 = "الأسماء المعدودة وغير المعدودة";
export const LAB_NAME_23 = "THE COUNTING LAB";
export const LAB_MOTTO_23 = "Can I count it 1, 2, 3...? Classify the noun first — the rule follows.";

// ------------------------------------------------------------
// 0) الافتتاح — ربط مع الدروس السابقة
// ------------------------------------------------------------
export const OPENING_EXCELLENT = "ممتاز! 🔥";
export const OPENING_RECALL = "في الدروس السابقة تعلمنا:";
export const OPENING_RECALL_ITEMS: string[] = [
  "الأسماء Nouns",
  "المفرد والجمع",
  "الجمع العادي وغير العادي",
  "a / an / the",
  "some / any بشكل أولي",
  "There is / There are",
];
export const OPENING_NOW = "الآن سنبني فوق كل ذلك مفهومًا مهمًا جدًا:";
export const OPENING_KEY_QUESTION = "هل يمكنني أن أعدّ هذا الشيء 1، 2، 3...؟";
export const OPENING_KEY_QUESTION_EN = "Can I count it? 1, 2, 3...";
export const OPENING_IF = "إذا فهمت هذا الدرس جيدًا، ستصبح أشياء كثيرة لاحقًا أسهل جدًا، خصوصًا:";
export const OPENING_PAYOFF: string[] = [
  "How many?",
  "How much?",
  "some / any",
  "many / much",
  "a lot of",
  "few / little",
  "أدوات الكمية",
  "وحتى بعض الأسئلة المتقدمة في الأزمنة.",
];

// ------------------------------------------------------------
// 1) أهداف الدرس
// ------------------------------------------------------------
export const OBJECTIVES_23 = [
  { n: "①", text: "ما هو Countable Noun؟", items: [] as string[] },
  { n: "②", text: "ما هو Uncountable Noun؟", items: [] as string[] },
  { n: "③", text: "كيف أعرف الفرق بينهما؟", items: [] as string[] },
  { n: "④", text: "متى أستخدم a / an؟", items: ["a", "an"] },
  { n: "⑤", text: "متى أستخدم some / any؟", items: ["some", "any"] },
  { n: "⑥", text: "لماذا نقول:", items: ["a book ✅", "a water ❌"] },
  { n: "⑦", text: "لماذا نقول: two apples ✅ لكن: two waters ❌ في المعنى العادي للمادة؟", items: ["two apples ✅", "two waters ❌"] },
  { n: "⑧", text: "كيف أستخدم There is / There are معهما؟", items: ["There is", "There are"] },
  { n: "⑨", text: "كيف أسأل: How many? و How much?", items: ["How many?", "How much?"] },
  { n: "⑩", text: "كيف أتجنب الأخطاء التي يقع فيها حتى بعض المتعلمين المتقدمين؟", items: [] as string[] },
] as const;

// ------------------------------------------------------------
// 2) ما معنى Countable؟
// ------------------------------------------------------------
export const COUNTABLE_MEANING = { en: "Countable", ar: "معدود" };
export const COUNTABLE_ANY = "أي شيء تستطيع أن تقول عنه:";
export const COUNTABLE_NUMBERS: string[] = ["1", "2", "3", "4", "5..."];
export const COUNTABLE_THEN = "فهو Countable.";
export const COUNTABLE_FOR_EXAMPLE = "مثلاً:";
export const COUNTABLE_BOOK_COUNT: string[] = ["one book", "two books", "three books"];
export const COUNTABLE_BOOK_CAN = "يمكنني عد الكتب.";
export const COUNTABLE_SO = "إذن:";
export const COUNTABLE_BOOK_EQ = "book = Countable Noun";
export const COUNTABLE_OTHER = "مثال آخر:";
export const COUNTABLE_APPLE_COUNT: string[] = ["one apple", "two apples", "three apples"];
export const COUNTABLE_APPLE_EQ = "apple = Countable";

// ------------------------------------------------------------
// 3) أمثلة على Countable Nouns
// ------------------------------------------------------------
export const COUNTABLE_EXAMPLES: { en: string; ar: string }[] = [
  { en: "book", ar: "كتاب" },
  { en: "pen", ar: "قلم" },
  { en: "apple", ar: "تفاحة" },
  { en: "car", ar: "سيارة" },
  { en: "student", ar: "طالب" },
  { en: "teacher", ar: "معلم" },
  { en: "chair", ar: "كرسي" },
  { en: "table", ar: "طاولة" },
  { en: "dog", ar: "كلب" },
  { en: "cat", ar: "قطة" },
  { en: "house", ar: "منزل" },
  { en: "computer", ar: "حاسوب" },
  { en: "phone", ar: "هاتف" },
  { en: "egg", ar: "بيضة" },
  { en: "coin", ar: "قطعة نقدية" },
];
export const COUNTABLE_EXAMPLES_NOTE = "يمكننا عدّ كل واحد منها.";

// ------------------------------------------------------------
// 4) الاختبار السحري
// ------------------------------------------------------------
export const MAGIC_TEST_ASK = "عندما ترى اسمًا جديدًا، اسأل نفسك:";
export const MAGIC_TEST_Q = "هل أستطيع أن أضع رقمًا أمامه؟";
export const MAGIC_TEST_ITEMS: string[] = ["3 books ✅", "5 chairs ✅", "10 students ✅", "2 phones ✅"];
export const MAGIC_TEST_SO = "إذن هذه أسماء معدودة.";

// ------------------------------------------------------------
// 5) Countable لها شكلان
// ------------------------------------------------------------
export const TWO_FORMS_LEAD = "الاسم المعدود يمكن أن يكون:";
export const TWO_FORMS_SINGULAR_LABEL = "مفرد Singular";
export const TWO_FORMS_SINGULAR: string[] = ["a book", "one book", "a car", "one car", "an apple", "one apple"];
export const TWO_FORMS_PLURAL_LABEL = "جمع Plural";
export const TWO_FORMS_PLURAL: string[] = ["two books", "five cars", "three apples"];
export const TWO_FORMS_LINK = "وهذا يربطنا مباشرة بالدرس 18.";

// ------------------------------------------------------------
// 6) تذكر
// ------------------------------------------------------------
export const REMEMBER_TITLE = "Countable Noun:";
export const REMEMBER_SINGULAR = "مفرد → يمكن أن يأخذ a / an";
export const REMEMBER_PLURAL = "جمع → يمكن أن يأخذ رقمًا";
export const REMEMBER_EXAMPLES: string[] = ["a book", "two books", "an orange", "four oranges", "a student", "twenty students"];

// ------------------------------------------------------------
// 7) المفاجأة — Uncountable Nouns
// ------------------------------------------------------------
export const SURPRISE_TITLE = "الآن المفاجأة";
export const SURPRISE_NOT_ALL = "ليس كل شيء يمكن عده بالطريقة نفسها.";
export const SURPRISE_OTHER = "هناك نوع آخر:";
export const SURPRISE_LABEL = "Uncountable Nouns";
export const UNCOUNTABLE_MEANING = { en: "Uncountable", ar: "غير معدود" };
export const UNCOUNTABLE_DEF =
  "وهو اسم نتعامل معه عادةً على أنه مادة أو كمية عامة، وليس كأشياء منفصلة نعدّها واحدة واحدة.";
export const UNCOUNTABLE_FOR_EXAMPLE = "مثلاً:";
export const UNCOUNTABLE_EXAMPLES: { en: string; ar: string }[] = [
  { en: "water", ar: "ماء" },
  { en: "milk", ar: "حليب" },
  { en: "rice", ar: "أرز" },
  { en: "sugar", ar: "سكر" },
  { en: "salt", ar: "ملح" },
  { en: "money", ar: "مال" },
  { en: "information", ar: "معلومات" },
  { en: "advice", ar: "نصيحة/نصيحة كمفهوم" },
  { en: "furniture", ar: "أثاث" },
  { en: "bread", ar: "خبز" },
  { en: "homework", ar: "واجب منزلي" },
  { en: "traffic", ar: "حركة المرور" },
];

// ------------------------------------------------------------
// 8) مثال الماء
// ------------------------------------------------------------
export const WATER_THINK = "فكر في الماء.";
export const WATER_USUALLY = "هل نقول عادة:";
export const WATER_NUMBERS: string[] = ["one water", "two waters", "three waters"];
export const WATER_MATERIAL = "عندما نقصد المادة نفسها؟";
export const WATER_NO = "❌ لا.";
export const WATER_WE_SAY = "نقول:";
export const WATER_SAY: string[] = ["some water", "a lot of water", "a little water", "much water"];
export const WATER_UNITS_LEAD = "لكن إذا أردنا عدّ الوحدات، نحتاج إلى وحدة قياس أو وعاء:";
export const WATER_UNITS: string[] = ["a bottle of water", "two bottles of water", "three bottles of water"];
export const WATER_SMART = "لاحظ الذكاء هنا:";
export const WATER_SMART_1 = "نحن لا نعدّ الماء نفسه.";
export const WATER_SMART_2 = "نحن نعدّ:";
export const WATER_SMART_3 = "bottles";

// ------------------------------------------------------------
// 9) مثال الأرز
// ------------------------------------------------------------
export const RICE_USUALLY = "لا نقول عادة:";
export const RICE_NUMBERS: string[] = ["one rice", "two rices"];
export const RICE_BUT = "بل:";
export const RICE_SAY: string[] = ["some rice", "a lot of rice", "a little rice"];
export const RICE_UNITS_LEAD = "لكن يمكننا القول:";
export const RICE_UNITS: string[] = ["a bag of rice", "two bags of rice", "three bags of rice"];
export const RICE_SMART = "نحن نعدّ الأكياس، وليس الأرز نفسه.";

// ------------------------------------------------------------
// 10) الفرق الأساسي
// ------------------------------------------------------------
export const CORE_COUNTABLE_LABEL = "Countable";
export const CORE_COUNTABLE_DEF = "شيء يمكن عده كأفراد منفصلين:";
export const CORE_COUNTABLE_ITEMS: string[] = ["one apple", "two apples", "three apples"];
export const CORE_UNCOUNTABLE_LABEL = "Uncountable";
export const CORE_UNCOUNTABLE_DEF = "مادة أو كمية نتعامل معها ككتلة أو مفهوم:";
export const CORE_UNCOUNTABLE_ITEMS: string[] = ["water", "milk", "rice", "sugar"];

// ------------------------------------------------------------
// 11) مقارنة ذكية
// ------------------------------------------------------------
export const SMART_LOOK = "انظر:";
export const SMART_APPLE = "apple → apples";
export const SMART_BUT = "لكن:";
export const SMART_WATER = "water → water";
export const SMART_USUALLY_NOT = "لا نقول عادة:";
export const SMART_WATERS = "waters";
export const SMART_BASIC = "في المستوى الأساسي.";

// ------------------------------------------------------------
// 12) قاعدة مهمة جدًا (a / an)
// ------------------------------------------------------------
export const AAN_RULE_LEAD = "مع الاسم المعدود المفرد يمكن استخدام:";
export const AAN_RULE_TOOL = "a / an";
export const AAN_RULE_FOR_EXAMPLE = "مثلاً:";
export const AAN_GOOD: string[] = ["a book", "a car", "an apple", "an egg"];
export const AAN_RULE_BUT = "لكن لا نستخدم a / an مباشرة مع الاسم غير المعدود.";
export const AAN_RULE_SO = "لذلك:";
export const AAN_VERDICTS: { en: string; verdict: "good" | "bad" }[] = [
  { en: "a book", verdict: "good" },
  { en: "an apple", verdict: "good" },
  { en: "a water", verdict: "bad" },
  { en: "a milk", verdict: "bad" },
  { en: "a rice", verdict: "bad" },
];

// ------------------------------------------------------------
// 13) لماذا؟
// ------------------------------------------------------------
export const WHY_BECAUSE = "لأن:";
export const WHY_A = "a = واحد";
export const WHY_AN = "an = واحد";
export const WHY_WHEN = "فحين تقول:";
export const WHY_BOOK = "a book";
export const WHY_YOU_SAY = "فأنت تقول:";
export const WHY_ONE_BOOK = "كتاب واحد.";
export const WHY_BUT = "لكن:";
export const WHY_WATER = "water";
export const WHY_NOT_PIECE = "ليست «قطعة واحدة» بالطريقة نفسها.";
export const WHY_SO_NOT = "لذلك لا نقول:";
export const WHY_A_WATER = "a water";
export const WHY_BUT_SAY = "بل:";
export const WHY_SOME_WATER = "some water";

// ------------------------------------------------------------
// 14) لكن انتبه! (المطعم)
// ------------------------------------------------------------
export const RESTAURANT_LEAD = "في الحياة اليومية قد تسمع شخصًا يقول:";
export const RESTAURANT_A_WATER = "a water";
export const RESTAURANT_PLACE = "في مطعم أو مقهى.";
export const RESTAURANT_SHORT = "هذا ممكن أن يكون اختصارًا لـ:";
export const RESTAURANT_SHORT_FORMS: string[] = ["a bottle of water", "a glass of water"];
export const RESTAURANT_MEANING = "أي أنه يقصد «عبوة/كأس ماء».";
export const RESTAURANT_BUT = "لكن القاعدة التي نريد إتقانها الآن هي:";
export const RESTAURANT_RULE = "water = Uncountable";

// ------------------------------------------------------------
// 15) لا تأخذ جمعًا
// ------------------------------------------------------------
export const NO_PLURAL_LEAD = "الأسماء غير المعدودة غالبًا لا تأخذ جمعًا";
export const NO_PLURAL_WORDS: string[] = [
  "water",
  "milk",
  "rice",
  "sugar",
  "information",
  "advice",
  "furniture",
  "homework",
];
export const NO_PLURAL_PAIRS: { good: string; bad: string }[] = [
  { good: "some information", bad: "some informations" },
  { good: "some advice", bad: "some advices" },
  { good: "some furniture", bad: "some furnitures" },
];
export const NO_PLURAL_WE_SAY = "نقول:";
export const NO_PLURAL_NOT = "وليس:";

// ------------------------------------------------------------
// 16) كلمات مهمة جدًا
// ------------------------------------------------------------
export const IMPORTANT_WORDS: { en: string; ar: string }[] = [
  { en: "water", ar: "ماء" },
  { en: "milk", ar: "حليب" },
  { en: "juice", ar: "عصير" },
  { en: "rice", ar: "أرز" },
  { en: "sugar", ar: "سكر" },
  { en: "salt", ar: "ملح" },
  { en: "flour", ar: "طحين" },
  { en: "bread", ar: "خبز" },
  { en: "cheese", ar: "جبن" },
  { en: "money", ar: "مال" },
  { en: "information", ar: "معلومات" },
  { en: "advice", ar: "نصيحة" },
  { en: "furniture", ar: "أثاث" },
  { en: "homework", ar: "واجب منزلي" },
  { en: "traffic", ar: "حركة المرور" },
  { en: "air", ar: "هواء" },
  { en: "sand", ar: "رمل" },
];

// ------------------------------------------------------------
// 17) chicken — حسب المعنى
// ------------------------------------------------------------
export const CHICKEN_SMART = "لكن هنا يجب أن نكون أذكياء";
export const CHICKEN_LEAD = "بعض الكلمات قد تكون Countable أو Uncountable حسب المعنى.";
export const CHICKEN_EXAMPLE = "chicken";
export const CHICKEN_MAY = "قد تعني:";
export const CHICKEN_ANIMAL = "دجاجة 🐔";
export const CHICKEN_ANIMAL_FORMS: string[] = ["a chicken", "two chickens"];
export const CHICKEN_ANIMAL_TYPE = "Countable.";
export const CHICKEN_BUT = "لكن:";
export const CHICKEN_MEAT = "قد تعني لحم الدجاج.";
export const CHICKEN_MEAT_FORM = "some chicken";
export const CHICKEN_MEAT_TYPE = "Uncountable.";
export const CHICKEN_DONT_MEMORIZE = "إذن لا تحفظ الكلمة وحدها دائمًا.";
export const CHICKEN_ASK = "اسأل:";
export const CHICKEN_ASK_Q = "ما المعنى المقصود؟";

// ------------------------------------------------------------
// 18) coffee
// ------------------------------------------------------------
export const COFFEE_LEAD = "coffee غالبًا Uncountable عندما نقصد المشروب بشكل عام:";
export const COFFEE_EXAMPLE = "I drink some coffee.";
export const COFFEE_BUT = "لكن في المطعم يمكن أن يقول شخص:";
export const COFFEE_RESTAURANT = "Two coffees, please.";
export const COFFEE_MEANING = "والمقصود:";
export const COFFEE_CUPS = "two cups of coffee";
export const COFFEE_SO = "وهنا أصبحت الكلمة تشير إلى وحدات من المشروب.";

// ------------------------------------------------------------
// 19) قاعدة المستوى الأساسي
// ------------------------------------------------------------
export const BASIC_RULE_LEAD = "في البداية تعامل مع:";
export const BASIC_RULE_WORDS: string[] = [
  "water",
  "milk",
  "rice",
  "sugar",
  "money",
  "information",
  "advice",
  "furniture",
  "homework",
];
export const BASIC_RULE_AS = "كأسماء Uncountable.";

// ------------------------------------------------------------
// 20) العلاقة مع There is / There are
// ------------------------------------------------------------
export const THERE_LINK = "هنا سنستخدم درس 21!";
export const THERE_CASES: { label: string; en: string; ar: string }[] = [
  { label: "Countable Singular", en: "There is a book on the desk.", ar: "هناك كتاب على المكتب." },
  { label: "Countable Plural", en: "There are three books on the desk.", ar: "هناك ثلاثة كتب على المكتب." },
  { label: "Uncountable", en: "There is some water in the bottle.", ar: "هناك بعض الماء في الزجاجة." },
];
export const THERE_NOTICE = "لاحظ:";
export const THERE_GOOD = "There is some water ✅";
export const THERE_NOT = "وليس:";
export const THERE_BAD = "There are some water ❌";
export const THERE_REASON = "لأن water غير معدود.";

// ------------------------------------------------------------
// 21) قاعدة ذهبية
// ------------------------------------------------------------
export const THERE_GOLDEN: { label: string; rule: string; exampleLabel: string; example: string }[] = [
  {
    label: "Countable Singular:",
    rule: "There is a/an + noun",
    exampleLabel: "مثال:",
    example: "There is an apple in the basket.",
  },
  {
    label: "Countable Plural:",
    rule: "There are + plural noun",
    exampleLabel: "مثال:",
    example: "There are three apples in the basket.",
  },
  {
    label: "Uncountable:",
    rule: "There is some + uncountable noun",
    exampleLabel: "مثال:",
    example: "There is some milk in the fridge.",
  },
];

// ------------------------------------------------------------
// 22) لنحلل المطبخ
// ------------------------------------------------------------
export const KITCHEN_LEAD = "تخيل مطبخًا فيه:";
export const KITCHEN_ITEMS: { en: string; emoji: string }[] = [
  { en: "three apples", emoji: "🍎" },
  { en: "two eggs", emoji: "🥚" },
  { en: "some rice", emoji: "🍚" },
  { en: "some milk", emoji: "🥛" },
  { en: "four plates", emoji: "🍽️" },
  { en: "a bottle of water", emoji: "💧" },
];
export const KITCHEN_WE_SAY = "سنقول:";
export const KITCHEN_SENTENCES: string[] = [
  "There are three apples in the kitchen.",
  "There are two eggs on the table.",
  "There is some rice in the cupboard.",
  "There is some milk in the fridge.",
  "There are four plates on the table.",
  "There is a bottle of water next to the fridge.",
];
export const KITCHEN_NOTE = "لاحظ أننا عدلنا There is / There are حسب نوع الاسم.";

// ------------------------------------------------------------
// 23) الآن: some
// ------------------------------------------------------------
export const SOME_RECALL = "تعلمنا some في الدرس 21، والآن سنفهم لماذا نستخدمها.";
export const SOME_MEANING = "some = كمية غير محددة";
export const SOME_WITH_PLURAL = "مع Countable Plural:";
export const SOME_WITH_PLURAL_ITEMS: string[] = ["some books", "some apples", "some students"];
export const SOME_WITH_UNCOUNTABLE = "مع Uncountable:";
export const SOME_WITH_UNCOUNTABLE_ITEMS: string[] = ["some water", "some milk", "some rice"];
export const SOME_SO = "إذن:";
export const SOME_FORMULAS: string[] = ["some + plural countable", "some + uncountable"];

// ------------------------------------------------------------
// 24) أمثلة some
// ------------------------------------------------------------
export const SOME_EXAMPLES: { en: string; ar: string }[] = [
  { en: "I have some books.", ar: "لدي بعض الكتب." },
  { en: "I have some water.", ar: "لدي بعض الماء." },
  { en: "She bought some apples.", ar: "اشترت بعض التفاح." },
  { en: "He bought some bread.", ar: "اشترى بعض الخبز." },
];

// ------------------------------------------------------------
// 25) انتبه — some book / some books
// ------------------------------------------------------------
export const SOME_ATTENTION_NOT = "لا نقول:";
export const SOME_ATTENTION_BAD = "some book";
export const SOME_ATTENTION_IF = "إذا كنا نقصد «بعض الكتب».";
export const SOME_ATTENTION_BUT = "بل:";
export const SOME_ATTENTION_GOOD = "some books ✅";
export const SOME_ATTENTION_WHY = "لأن book معدود، وsome هنا تشير إلى أكثر من واحد.";
export const SOME_ATTENTION_AS = "أما:";
export const SOME_ATTENTION_WATER = "some water ✅";
export const SOME_ATTENTION_WATER_WHY = "لأن water غير معدود.";

// ------------------------------------------------------------
// 26) some أمام نوعين
// ------------------------------------------------------------
export const SOME_TWO_TYPES: { title: string; items: string[] }[] = [
  { title: "some + plural countable", items: ["some books", "some cars", "some eggs", "some students"] },
  { title: "some + uncountable", items: ["some water", "some rice", "some money", "some information"] },
];

// ------------------------------------------------------------
// 27) الآن any
// ------------------------------------------------------------
export const ANY_LEAD = "any غالبًا تظهر في:";
export const ANY_PLACES: string[] = ["الأسئلة", "والجمل المنفية."];
export const ANY_WITH_PLURAL = "مع Countable Plural:";
export const ANY_WITH_PLURAL_ITEMS: string[] = ["Are there any books?", "There aren't any books."];
export const ANY_WITH_UNCOUNTABLE = "مع Uncountable:";
export const ANY_WITH_UNCOUNTABLE_ITEMS: string[] = ["Is there any water?", "There isn't any water."];

// ------------------------------------------------------------
// 28) مقارنة some / any
// ------------------------------------------------------------
export const SOME_ANY_COMPARE: { en: string; group: "countable" | "uncountable" }[] = [
  { en: "There are some apples.", group: "countable" },
  { en: "Are there any apples?", group: "countable" },
  { en: "There aren't any apples.", group: "countable" },
  { en: "There is some milk.", group: "uncountable" },
  { en: "Is there any milk?", group: "uncountable" },
  { en: "There isn't any milk.", group: "uncountable" },
];
export const SOME_ANY_NOTE =
  "لاحظ أن some و any يمكن استخدامهما مع Countable Plural وUncountable، لكن بطريقة مختلفة حسب الجملة.";

// ------------------------------------------------------------
// 29) سؤالان مهمان جدًا
// ------------------------------------------------------------
export const TWO_QUESTIONS_LEAD = "الآن نصل إلى سؤالين مهمين جدًا";
export const TWO_QUESTIONS: string[] = ["How many?", "How much?"];

// ------------------------------------------------------------
// 30) How many?
// ------------------------------------------------------------
export const HOWMANY_WE_USE = "نستخدم:";
export const HOWMANY_FORMULA = "How many + Countable Plural?";
export const HOWMANY_WHEN = "عندما نستطيع العد.";
export const HOWMANY_EXAMPLE = "مثلاً:";
export const HOWMANY_EXAMPLES: { en: string; ar: string }[] = [
  { en: "How many books do you have?", ar: "كم كتابًا لديك؟" },
  { en: "How many students are there?", ar: "كم طالبًا يوجد؟" },
  { en: "How many apples did she buy?", ar: "كم تفاحة اشترت؟" },
  { en: "How many cars are in the parking lot?", ar: "كم سيارة موجودة في موقف السيارات؟" },
];

// ------------------------------------------------------------
// 31) How much?
// ------------------------------------------------------------
export const HOWMUCH_WE_USE = "نستخدم:";
export const HOWMUCH_FORMULA = "How much + Uncountable Noun?";
export const HOWMUCH_WHEN = "عندما نتحدث عن كمية شيء غير معدود.";
export const HOWMUCH_EXAMPLES: { en: string; ar: string }[] = [
  { en: "How much water do you drink?", ar: "كمية الماء التي تشربها؟" },
  { en: "How much rice do we need?", ar: "كمية الأرز التي نحتاجها؟" },
  { en: "How much money do you have?", ar: "كم من المال لديك؟" },
  { en: "How much milk is in the fridge?", ar: "كمية الحليب الموجودة في الثلاجة؟" },
];

// ------------------------------------------------------------
// 32) مفتاح خارق
// ------------------------------------------------------------
export const SUPER_KEY_IF = "إذا كان الشيء:";
export const SUPER_KEY_NUMBERS = "1, 2, 3, 4...";
export const SUPER_KEY_MANY = "→ How many?";
export const SUPER_KEY_IF2 = "إذا كنا نتحدث عن كمية مادة أو شيء غير معدود:";
export const SUPER_KEY_MUCH = "→ How much?";

// ------------------------------------------------------------
// 33) المعركة الكبرى
// ------------------------------------------------------------
export const BATTLE_MANY_Q = "How many apples?";
export const BATTLE_MANY_BECAUSE = "لأن:";
export const BATTLE_MANY_WHY = "apple → apples";
export const BATTLE_MANY_TYPE = "Countable.";
export const BATTLE_BUT = "لكن:";
export const BATTLE_MUCH_Q = "How much water?";
export const BATTLE_MUCH_WHY = "water → Uncountable.";

// ------------------------------------------------------------
// 34) أمثلة متقدمة قليلًا
// ------------------------------------------------------------
export const ADVANCED_PAIRS: { q: string; a: string }[] = [
  { q: "How many chairs are there?", a: "There are six chairs." },
  { q: "How much water is there?", a: "There is some water." },
  { q: "How many children are in the park?", a: "There are five children." },
  { q: "How much money is in the box?", a: "There is some money in the box." },
];
export const ADVANCED_NOTE_1 = "children = جمع غير عادي لكنه Countable.";
export const ADVANCED_NOTE_2 = "money = Uncountable.";

// ------------------------------------------------------------
// 35) money
// ------------------------------------------------------------
export const MONEY_LEAD = "هذه من الكلمات التي تسبب أخطاء كثيرة.";
export const MONEY_TYPE = "money = Uncountable";
export const MONEY_SO = "لذلك:";
export const MONEY_GOOD: string[] = [
  "I have some money. ✅",
  "I have a lot of money. ✅",
  "How much money do you have? ✅",
  "I have three money. ❌",
];
export const MONEY_NO_COUNT = "لا نعد money نفسها.";
export const MONEY_BUT_UNITS = "لكن يمكننا عد الوحدات:";
export const MONEY_UNITS: string[] = ["three coins", "two banknotes", "five dollars"];

// ------------------------------------------------------------
// 36) information
// ------------------------------------------------------------
export const INFO_TYPE = "information = Uncountable";
export const INFO_SO = "لذلك:";
export const INFO_GOOD: string[] = ["some information ✅", "a lot of information ✅", "much information ✅"];
export const INFO_BAD: string[] = ["an information ❌", "informations ❌"];
export const INFO_BUT = "لكن يمكننا القول:";
export const INFO_PIECES: string[] = ["a piece of information", "two pieces of information", "three pieces of information"];
export const INFO_COUNT = "هنا أصبحنا نعد:";
export const INFO_COUNT_WORD = "pieces";
export const INFO_NOT_ITSELF = "وليس information نفسها.";

// ------------------------------------------------------------
// 37) advice
// ------------------------------------------------------------
export const ADVICE_TYPE = "advice = Uncountable";
export const ADVICE_WE_SAY = "نقول:";
export const ADVICE_GOOD: string[] = ["some advice", "a piece of advice", "two pieces of advice"];
export const ADVICE_WE_DONT = "ولا نقول:";
export const ADVICE_BAD: string[] = ["an advice ❌", "advices ❌"];

// ------------------------------------------------------------
// 38) furniture
// ------------------------------------------------------------
export const FURNITURE_TYPE = "furniture = Uncountable";
export const FURNITURE_WE_SAY = "نقول:";
export const FURNITURE_GOOD: string[] = ["some furniture", "a lot of furniture", "a piece of furniture", "three pieces of furniture"];
export const FURNITURE_WE_DONT = "ولا نقول:";
export const FURNITURE_BAD: string[] = ["a furniture ❌", "furnitures ❌"];

// ------------------------------------------------------------
// 39) homework
// ------------------------------------------------------------
export const HOMEWORK_TYPE = "homework = Uncountable";
export const HOMEWORK_WE_SAY = "نقول:";
export const HOMEWORK_GOOD: string[] = ["some homework", "a lot of homework", "much homework"];
export const HOMEWORK_WE_DONT = "ولا نقول:";
export const HOMEWORK_BAD: string[] = ["a homework ❌", "homeworks ❌"];
export const HOMEWORK_BUT = "لكن يمكننا القول:";
export const HOMEWORK_ASSIGNMENTS: string[] = ["an assignment", "three assignments"];
export const HOMEWORK_IF = "إذا كنا نقصد مهام منفصلة.";

// ------------------------------------------------------------
// 40) وجهًا لوجه
// ------------------------------------------------------------
export const FACE_TO_FACE_LEAD = "لنضعهما وجهًا لوجه:";
export const FACE_TO_FACE_COUNTABLE: string[] = [
  "book",
  "apple",
  "chair",
  "student",
  "car",
  "egg",
  "dog",
  "computer",
];
export const FACE_TO_FACE_UNCOUNTABLE: string[] = [
  "water",
  "milk",
  "rice",
  "sugar",
  "money",
  "information",
  "advice",
  "furniture",
  "homework",
];

// ------------------------------------------------------------
// 41) كيف أختبر أي كلمة؟
// ------------------------------------------------------------
export const THREE_TEST_LEAD = "اسأل 3 أسئلة:";
export const THREE_TEST_QUESTIONS: string[] = [
  "① هل أستطيع قول one + الكلمة؟",
  "② هل أستطيع قول two + الكلمة؟",
  "③ هل لها جمع طبيعي عندما أعد الأشياء؟",
];
export const THREE_TEST_EXAMPLES: {
  word: string;
  one: string;
  two: string;
  result: "Countable" | "Uncountable";
  extra?: string;
}[] = [
  { word: "book", one: "one book ✅", two: "two books ✅", result: "Countable" },
  {
    word: "water",
    one: "one water ❌ في المعنى الأساسي",
    two: "two waters ❌",
    result: "Uncountable",
  },
];
export const THREE_TEST_ARROW = "→";

// ------------------------------------------------------------
// 42) لكن هناك فخ!
// ------------------------------------------------------------
export const TRAP_LEAD = "لا تعتمد فقط على «هل أستطيع تقسيمه؟»";
export const TRAP_EXAMPLE =
  "rice يمكن تقسيمه إلى حبات، لكننا نتعامل معه عادةً كاسم غير معدود:";
export const TRAP_GOOD = "some rice";
export const TRAP_NOT = "وليس:";
export const TRAP_BAD = "three rices";
export const TRAP_SO = "لذلك الفكرة هي:";
export const TRAP_IDEA = "هل الاسم نفسه يُعامل في الإنجليزية كوحدات منفصلة قابلة للعد؟";

// ------------------------------------------------------------
// 43) أخطاء شائعة جدًا
// ------------------------------------------------------------
export const COMMON_ERRORS: {
  n: string;
  wrong: string;
  correctLabel: string;
  correct: string;
  altLabel?: string;
  alt?: string;
  why?: string;
}[] = [
  {
    n: "الخطأ 1",
    wrong: "I have a water.",
    correctLabel: "الصحيح:",
    correct: "I have some water. ✅",
    altLabel: "أو:",
    alt: "I have a bottle of water. ✅",
  },
  {
    n: "الخطأ 2",
    wrong: "She gave me an advice.",
    correctLabel: "الصحيح:",
    correct: "She gave me some advice. ✅",
    altLabel: "أو:",
    alt: "She gave me a piece of advice. ✅",
  },
  {
    n: "الخطأ 3",
    wrong: "I need two informations.",
    correctLabel: "الصحيح:",
    correct: "I need some information. ✅",
    altLabel: "أو:",
    alt: "I need two pieces of information. ✅",
  },
  {
    n: "الخطأ 4",
    wrong: "There are some milk in the fridge.",
    correctLabel: "الصحيح:",
    correct: "There is some milk in the fridge. ✅",
    why: "لأن milk غير معدود.",
  },
  {
    n: "الخطأ 5",
    wrong: "How much books do you have?",
    correctLabel: "الصحيح:",
    correct: "How many books do you have? ✅",
  },
  {
    n: "الخطأ 6",
    wrong: "How many water do you drink?",
    correctLabel: "الصحيح:",
    correct: "How much water do you drink? ✅",
  },
];

// ------------------------------------------------------------
// 44) IQ200 — many / much
// ------------------------------------------------------------
export const IQ200_MM_TITLE = "لا تحفظ «much = غير معدود» فقط!";
export const IQ200_MM_SURFACE = "هذه طريقة سطحية.";
export const IQ200_MM_UNDERSTAND = "افهم العلاقة:";
export const IQ200_MM_MANY = "many → أشياء معدودة";
export const IQ200_MM_MUCH = "much → كميات غير معدودة";
export const IQ200_MM_SO = "لذلك:";
export const IQ200_MM_MANY_ITEMS: string[] = ["many books", "many students", "many apples"];
export const IQ200_MM_BUT = "لكن:";
export const IQ200_MM_MUCH_ITEMS: string[] = ["much water", "much money", "much information", "much rice"];

// ------------------------------------------------------------
// 45) تدريب ① — Countable أم Uncountable؟
// ------------------------------------------------------------
export const TRAINING1_23_INTRO = "حدد نوع كل كلمة:";
export const TRAINING1_23_OPTIONS = ["Countable", "Uncountable"] as const;
export const TRAINING1_23: { n: number; stem: string; answer: number; why: string }[] = [
  { n: 1, stem: "apple", answer: 0, why: "one apple / two apples ← معدود." },
  { n: 2, stem: "water", answer: 1, why: "مادة ← some water، ولا نقول two waters في المعنى الأساسي." },
  { n: 3, stem: "chair", answer: 0, why: "5 chairs ✅ ← معدود." },
  { n: 4, stem: "milk", answer: 1, why: "مادة ← some milk." },
  { n: 5, stem: "student", answer: 0, why: "10 students ✅ ← معدود." },
  { n: 6, stem: "rice", answer: 1, why: "نتعامل معه ككتلة ← some rice." },
  { n: 7, stem: "money", answer: 1, why: "لا نعد money نفسها ← How much money?" },
  { n: 8, stem: "computer", answer: 0, why: "2 phones / computers ← معدود." },
  { n: 9, stem: "information", answer: 1, why: "some information، ولا نقول informations." },
  { n: 10, stem: "egg", answer: 0, why: "an egg / two eggs ← معدود." },
  { n: 11, stem: "furniture", answer: 1, why: "some furniture، ولا نقول a furniture." },
  { n: 12, stem: "dog", answer: 0, why: "a dog / two dogs ← معدود." },
];

// ------------------------------------------------------------
// 46) تدريب ② — a/an أم some؟
// ------------------------------------------------------------
export const TRAINING2_23_INTRO = "اختر:";
export const TRAINING2_23_OPTIONS = ["a", "an", "some"] as const;
export const TRAINING2_23: { n: number; stem: string; answer: number; why: string }[] = [
  { n: 1, stem: "___ apple", answer: 1, why: "apple مفرد معدود يبدأ بصوت علة ← an apple." },
  { n: 2, stem: "___ water", answer: 2, why: "water غير معدود ← some water، ولا نقول a water." },
  { n: 3, stem: "___ book", answer: 0, why: "book مفرد معدود ← a book." },
  { n: 4, stem: "___ rice", answer: 2, why: "rice غير معدود ← some rice." },
  { n: 5, stem: "___ egg", answer: 1, why: "egg مفرد معدود بصوت علة ← an egg." },
  { n: 6, stem: "___ milk", answer: 2, why: "milk غير معدود ← some milk." },
  { n: 7, stem: "___ students", answer: 2, why: "students جمع معدود ← some students." },
  { n: 8, stem: "___ information", answer: 2, why: "information غير معدود ← some information." },
];
export const TRAINING2_23_REMEMBER = "تذكر:";
export const TRAINING2_23_RULES: string[] = [
  "a/an → مفرد Countable",
  "some → Plural Countable أو Uncountable",
];

// ------------------------------------------------------------
// 47) تدريب ③ — There is أم There are؟
// ------------------------------------------------------------
export const TRAINING3_23_OPTIONS = ["There is", "There are"] as const;
export const TRAINING3_23: { n: number; stem: string; answer: number; why: string }[] = [
  { n: 1, stem: "___ a book on the desk.", answer: 0, why: "a book مفرد معدود ← There is." },
  { n: 2, stem: "___ three books on the desk.", answer: 1, why: "three books جمع معدود ← There are." },
  { n: 3, stem: "___ some water in the bottle.", answer: 0, why: "water غير معدود ← There is some water." },
  { n: 4, stem: "___ two children in the garden.", answer: 1, why: "children جمع غير عادي لكنه معدود ← There are." },
  { n: 5, stem: "___ some rice in the bowl.", answer: 0, why: "rice غير معدود ← There is." },
  { n: 6, stem: "___ five apples in the basket.", answer: 1, why: "five apples جمع معدود ← There are." },
  { n: 7, stem: "___ a computer in the room.", answer: 0, why: "a computer مفرد معدود ← There is." },
  { n: 8, stem: "___ some furniture in the house.", answer: 0, why: "furniture غير معدود ← There is." },
];

// ------------------------------------------------------------
// 48) تدريب ④ — How many أم How much؟
// ------------------------------------------------------------
export const TRAINING4_23_OPTIONS = ["How many", "How much"] as const;
export const TRAINING4_23: { n: number; stem: string; answer: number; why: string }[] = [
  { n: 1, stem: "___ apples do you have?", answer: 0, why: "apples جمع معدود ← How many." },
  { n: 2, stem: "___ water do you drink?", answer: 1, why: "water غير معدود ← How much." },
  { n: 3, stem: "___ students are in the classroom?", answer: 0, why: "students جمع معدود ← How many." },
  { n: 4, stem: "___ money do you need?", answer: 1, why: "money غير معدود ← How much." },
  { n: 5, stem: "___ books are on the shelf?", answer: 0, why: "books جمع معدود ← How many." },
  { n: 6, stem: "___ rice do we need?", answer: 1, why: "rice غير معدود ← How much." },
  { n: 7, stem: "___ information do you have?", answer: 1, why: "information غير معدود ← How much." },
  { n: 8, stem: "___ chairs are there?", answer: 0, why: "chairs جمع معدود ← How many." },
];

// ------------------------------------------------------------
// 49) Grammar Detective — 10 جمل من المصدر
// ------------------------------------------------------------
export const DETECTIVE_23_INTRO = "اقرأ الجمل وابحث عن الأخطاء:";
export const DETECTIVE_23_ASK = "لا تبحث فقط عن الخطأ.";
export const DETECTIVE_23_ASK_Q = "اسأل نفسك:";
export const DETECTIVE_23_ASK_KEY = "ما نوع الاسم؟";
export const DETECTIVE_23_THEN = "ثم اختر القاعدة المناسبة.";
export const DETECTIVE_23_OPTIONS = ["فيها خطأ ✗", "صحيحة ✓"] as const;
export const DETECTIVE_23: {
  n: number;
  sentence: string;
  answer: number; // 0 = فيها خطأ، 1 = صحيحة
  noun: string;
  type: "Countable" | "Uncountable";
  rule: string;
  fix?: string;
  fixAlt?: string;
}[] = [
  {
    n: 1,
    sentence: "I have two waters.",
    answer: 0,
    noun: "water",
    type: "Uncountable",
    rule: "لا نضع رقمًا قبل water — نستخدم some أو نعدّ الوحدات (bottles).",
    fix: "I have some water.",
    fixAlt: "I have two bottles of water.",
  },
  {
    n: 2,
    sentence: "She bought an apple.",
    answer: 1,
    noun: "apple",
    type: "Countable",
    rule: "apple مفرد معدود يبدأ بصوت علة ← an apple صحيحة.",
  },
  {
    n: 3,
    sentence: "There are some milk in the fridge.",
    answer: 0,
    noun: "milk",
    type: "Uncountable",
    rule: "milk غير معدود ← There is some milk.",
    fix: "There is some milk in the fridge.",
  },
  {
    n: 4,
    sentence: "How many books do you have?",
    answer: 1,
    noun: "books",
    type: "Countable",
    rule: "books جمع معدود ← How many صحيحة.",
  },
  {
    n: 5,
    sentence: "He gave me an advice.",
    answer: 0,
    noun: "advice",
    type: "Uncountable",
    rule: "advice غير معدود ← لا نستخدم an مباشرة.",
    fix: "He gave me some advice.",
    fixAlt: "He gave me a piece of advice.",
  },
  {
    n: 6,
    sentence: "There is some rice on the table.",
    answer: 1,
    noun: "rice",
    type: "Uncountable",
    rule: "rice غير معدود ← There is some صحيحة.",
  },
  {
    n: 7,
    sentence: "I need three informations.",
    answer: 0,
    noun: "information",
    type: "Uncountable",
    rule: "information لا يأخذ جمعًا ← نعدّ pieces.",
    fix: "I need some information.",
    fixAlt: "I need three pieces of information.",
  },
  {
    n: 8,
    sentence: "There are five students in the room.",
    answer: 1,
    noun: "students",
    type: "Countable",
    rule: "students جمع معدود ← There are صحيحة.",
  },
  {
    n: 9,
    sentence: "She has a furniture.",
    answer: 0,
    noun: "furniture",
    type: "Uncountable",
    rule: "furniture غير معدود ← لا نستخدم a مباشرة.",
    fix: "She has some furniture.",
    fixAlt: "She has a piece of furniture.",
  },
  {
    n: 10,
    sentence: "How much money do you have?",
    answer: 1,
    noun: "money",
    type: "Uncountable",
    rule: "money غير معدود ← How much صحيحة.",
  },
];

// ------------------------------------------------------------
// 50) IQ200 Challenge — 8 جمل (واحدة منها صحيحة)
// ------------------------------------------------------------
export const IQ200_23_TASK = "صحح الجمل التالية، لكن لا تكتفِ بالتصحيح. اشرح في ذهنك لماذا.";
export const IQ200_23_HINT = "هنا توجد جملة صحيحة بين الجمل.";
export const IQ200_23_HINT_Q = "هل تستطيع اكتشافها؟";
export const IQ200_23_OPTIONS = ["خاطئة ✗ — تحتاج تصحيحًا", "صحيحة ✓"] as const;
export const IQ200_23: {
  n: string;
  sentence: string;
  answer: number; // 0 = خاطئة، 1 = صحيحة
  fix?: string;
  fixAlt?: string;
  why: string;
}[] = [
  {
    n: "①",
    sentence: "There is two apples on the table.",
    answer: 0,
    fix: "There are two apples on the table.",
    why: "two apples جمع معدود ← There are.",
  },
  {
    n: "②",
    sentence: "There are some water in the glass.",
    answer: 0,
    fix: "There is some water in the glass.",
    why: "water غير معدود ← There is some water.",
  },
  {
    n: "③",
    sentence: "I need an information.",
    answer: 0,
    fix: "I need some information.",
    fixAlt: "I need a piece of information.",
    why: "information غير معدود ← لا نستخدم an مباشرة.",
  },
  {
    n: "④",
    sentence: "She bought three bread.",
    answer: 0,
    fix: "She bought some bread.",
    why: "bread غير معدود ← some bread، ولا نضع رقمًا قبله.",
  },
  {
    n: "⑤",
    sentence: "How much chairs are there?",
    answer: 0,
    fix: "How many chairs are there?",
    why: "chairs جمع معدود ← How many.",
  },
  {
    n: "⑥",
    sentence: "How many rice do we need?",
    answer: 0,
    fix: "How much rice do we need?",
    why: "rice غير معدود ← How much.",
  },
  {
    n: "⑦",
    sentence: "There is some books in my bag.",
    answer: 0,
    fix: "There are some books in my bag.",
    why: "some books جمع معدود ← There are.",
  },
  {
    n: "⑧",
    sentence: "He gave me two pieces of advice.",
    answer: 1,
    why: "هذه هي الجملة الصحيحة: عدّدنا pieces وليس advice نفسها.",
  },
];

// ------------------------------------------------------------
// 51) تحدي التفكير
// ------------------------------------------------------------
export const THINKING_23_INTRO = "تخيل أن لديك:";
export const THINKING_23_TASK = "اكتب جملة There is / There are لكل عنصر.";
export const THINKING_23_EXAMPLE_LABEL = "مثال:";
export const THINKING_23_EXAMPLE = "There are five apples on the table.";
export const THINKING_23_THEN = "ثم أكمل بنفسك.";
export const THINKING_23_OPTIONS = ["There is", "There are"] as const;
export const THINKING_23: {
  n: number;
  item: string;
  emoji: string;
  answer: number; // 0 = There is، 1 = There are
  model: string;
  why: string;
}[] = [
  {
    n: 1,
    item: "5 apples",
    emoji: "🍎",
    answer: 1,
    model: "There are five apples on the table.",
    why: "apples جمع معدود ← There are.",
  },
  {
    n: 2,
    item: "2 bottles of water",
    emoji: "🍶",
    answer: 1,
    model: "There are two bottles of water on the table.",
    why: "نحن نعدّ bottles (جمع معدود) ← There are.",
  },
  {
    n: 3,
    item: "some rice",
    emoji: "🍚",
    answer: 0,
    model: "There is some rice in the cupboard.",
    why: "rice غير معدود ← There is some rice.",
  },
  {
    n: 4,
    item: "3 eggs",
    emoji: "🥚",
    answer: 1,
    model: "There are three eggs on the table.",
    why: "eggs جمع معدود ← There are.",
  },
  {
    n: 5,
    item: "some money",
    emoji: "💵",
    answer: 0,
    model: "There is some money in the box.",
    why: "money غير معدود ← There is some money.",
  },
  {
    n: 6,
    item: "4 pieces of information",
    emoji: "📋",
    answer: 1,
    model: "There are four pieces of information on the board.",
    why: "نعدّ pieces (جمع معدود) ← There are.",
  },
];

// ------------------------------------------------------------
// 52) FINAL BOSS — الغرفة الغامضة
// ------------------------------------------------------------
export const FINAL_BOSS_23_TITLE = "لديك غرفة غامضة:";
export const FINAL_BOSS_23_IN_ROOM = "في الغرفة:";
export const FINAL_BOSS_23_ITEMS: {
  n: number;
  item: string;
  emoji: string;
  answer: number; // 0 = There is، 1 = There are
  model: string;
  type: "Countable" | "Uncountable";
}[] = [
  { n: 1, item: "4 books", emoji: "📚", answer: 1, model: "There are four books in the room.", type: "Countable" },
  { n: 2, item: "2 computers", emoji: "💻", answer: 1, model: "There are two computers in the room.", type: "Countable" },
  { n: 3, item: "some water", emoji: "💧", answer: 0, model: "There is some water in the room.", type: "Uncountable" },
  { n: 4, item: "some furniture", emoji: "🛋️", answer: 0, model: "There is some furniture in the room.", type: "Uncountable" },
  { n: 5, item: "3 chairs", emoji: "🪑", answer: 1, model: "There are three chairs in the room.", type: "Countable" },
  { n: 6, item: "one child", emoji: "🧒", answer: 0, model: "There is a child in the room.", type: "Countable" },
  { n: 7, item: "some information", emoji: "📋", answer: 0, model: "There is some information in the room.", type: "Uncountable" },
  { n: 8, item: "5 coins", emoji: "🪙", answer: 1, model: "There are five coins in the room.", type: "Countable" },
];
export const FINAL_BOSS_23_OPTIONS = ["There is", "There are"] as const;
export const FINAL_BOSS_23_TASK = "اكتب 8 جمل تصف الغرفة.";
export const FINAL_BOSS_23_MUST = "يجب أن تستخدم:";
export const FINAL_BOSS_23_REQUIREMENTS: string[] = [
  "There is",
  "There are",
  "a/an",
  "some",
  "Countable nouns",
  "Uncountable nouns",
];
export const FINAL_BOSS_23_THEN = "ثم اكتب سؤالين باستخدام:";
export const FINAL_BOSS_23_QUESTION_TYPES: string[] = ["How many?", "How much?"];
export const FINAL_BOSS_23_EXAMPLE_LABEL = "مثلاً:";
export const FINAL_BOSS_23_EXAMPLES: { q: string; a: string }[] = [
  { q: "There are four books in the room.", a: "How many books are there?" },
];
export const FINAL_BOSS_23_QUESTION_BANK: {
  type: "many" | "much";
  noun: string;
  question: string;
}[] = [
  { type: "many", noun: "books", question: "How many books are there?" },
  { type: "many", noun: "chairs", question: "How many chairs are there?" },
  { type: "many", noun: "coins", question: "How many coins are there?" },
  { type: "much", noun: "water", question: "How much water is there?" },
  { type: "much", noun: "information", question: "How much information is there?" },
  { type: "much", noun: "money", question: "How much money is in the box?" },
];
export const FINAL_BOSS_23_QUOTA = { many: 2, much: 2 };
export const FINAL_BOSS_23_SENTENCE_TARGET = 8;

// ------------------------------------------------------------
// 53) الخلاصة الذهبية
// ------------------------------------------------------------
export const GOLDEN_23_COUNTABLE_TITLE = "Countable Nouns";
export const GOLDEN_23_COUNTABLE_DEF = "أسماء يمكن عدها.";
export const GOLDEN_23_COUNTABLE_EXAMPLE_LABEL = "مثال:";
export const GOLDEN_23_COUNTABLE_EXAMPLES: string[] = ["one book", "two books", "three books"];
export const GOLDEN_23_COUNTABLE_CAN_BE = "يمكن أن تكون:";
export const GOLDEN_23_COUNTABLE_FORMS: { label: string; en: string }[] = [
  { label: "Singular:", en: "a book" },
  { label: "Plural:", en: "books" },
];
export const GOLDEN_23_COUNTABLE_WITH = "ومعها يمكن استخدام:";
export const GOLDEN_23_COUNTABLE_TOOLS: string[] = [
  "a / an",
  "many",
  "How many?",
  "some + plural",
  "There is + singular",
  "There are + plural",
];
export const GOLDEN_23_UNCOUNTABLE_TITLE = "Uncountable Nouns";
export const GOLDEN_23_UNCOUNTABLE_DEF = "أسماء نتعامل معها ككمية أو مادة أو مفهوم غير معدود.";
export const GOLDEN_23_UNCOUNTABLE_LIKE = "مثل:";
export const GOLDEN_23_UNCOUNTABLE_WORDS: string[] = [
  "water",
  "milk",
  "rice",
  "money",
  "information",
  "advice",
  "furniture",
  "homework",
];
export const GOLDEN_23_UNCOUNTABLE_NO = "لا نستخدم معها عادةً:";
export const GOLDEN_23_UNCOUNTABLE_NO_ITEM = "a / an";
export const GOLDEN_23_UNCOUNTABLE_NO_PLURAL = "ولا نستخدم جمعًا عاديًا.";
export const GOLDEN_23_UNCOUNTABLE_WITH = "ونستخدم معها:";
export const GOLDEN_23_UNCOUNTABLE_TOOLS: string[] = ["some", "much", "How much?", "a lot of", "There is"];

// ------------------------------------------------------------
// 54) الجدول السحري
// ------------------------------------------------------------
export const MAGIC_TABLE_23: { title: string; rows: string[] }[] = [
  {
    title: "Countable:",
    rows: ["a book", "two books", "many books", "How many books?", "some books", "There are some books."],
  },
  {
    title: "Uncountable:",
    rows: ["water", "some water", "much water", "How much water?", "There is some water."],
  },
];

// ------------------------------------------------------------
// 55) أهم 7 قواعد
// ------------------------------------------------------------
export const SEVEN_RULES_23: { n: string; text: string; items: string[] }[] = [
  { n: "①", text: "Countable = يمكن عدّه.", items: ["1, 2, 3..."] },
  { n: "②", text: "Uncountable = نتعامل معه ككمية/مادة/مفهوم غير معدود.", items: [] },
  { n: "③", text: "a/an + Countable Singular.", items: ["a book", "an apple"] },
  { n: "④", text: "some + Plural Countable أو Uncountable.", items: ["some books", "some water"] },
  { n: "⑤", text: "many + Plural Countable.", items: ["many books"] },
  { n: "⑥", text: "much + Uncountable.", items: ["much water"] },
  { n: "⑦", text: "How many? للمعدود، How much? لغير المعدود.", items: ["How many books?", "How much water?"] },
];

// ------------------------------------------------------------
// 56) خريطة المنهج
// ------------------------------------------------------------
export const ROADMAP_23: { n: number; en: string; here?: boolean }[] = [
  { n: 1, en: "Sentence Structure" },
  { n: 2, en: "Pronouns" },
  { n: 3, en: "Verb to be" },
  { n: 4, en: "Nouns + Articles" },
  { n: 5, en: "Adjectives" },
  { n: 6, en: "Present Simple" },
  { n: 7, en: "Present Simple Negative/Questions" },
  { n: 8, en: "Present Simple Review" },
  { n: 9, en: "Present Continuous" },
  { n: 10, en: "Present Continuous Advanced" },
  { n: 11, en: "Present Simple vs Present Continuous" },
  { n: 12, en: "Past Simple" },
  { n: 13, en: "Past Simple Negative/Questions" },
  { n: 14, en: "Wh Questions" },
  { n: 15, en: "Was/Were" },
  { n: 16, en: "Possessive Adjectives" },
  { n: 17, en: "Possessive Pronouns" },
  { n: 18, en: "Regular & Irregular Plurals" },
  { n: 19, en: "Possessive Nouns" },
  { n: 20, en: "This / That / These / Those" },
  { n: 21, en: "There is / There are" },
  { n: 22, en: "Prepositions of Place" },
  { n: 23, en: "Countable & Uncountable Nouns", here: true },
];
export const ROADMAP_23_LEAD = "حتى الآن أصبح لدينا أساس قوي جدًا:";
export const ROADMAP_23_HERE = "← نحن هنا";
export const ROADMAP_23_NEXT_LEAD = "والخطوة الطبيعية التالية ستكون بناءً على هذا الدرس مباشرة:";
export const ROADMAP_23_NEXT_TITLE = "How many / How much + Quantifiers";
export const ROADMAP_23_NEXT_FULL =
  "some / any / much / many / a lot of / lots of / a few / few / a little / little";
export const ROADMAP_23_NEXT_ITEMS: string[] = [
  "some / any",
  "much / many",
  "a lot of / lots of",
  "a few / few",
  "a little / little",
];
export const ROADMAP_23_CLOSING =
  "وهنا سنبدأ فعليًا بتعلّم كيف نصف الكميات بدقة، وليس فقط هل الاسم معدود أم غير معدود.";

// ============================================================
// الأنواع
// ============================================================
export type Tone23 = "neutral" | "good" | "bad" | "focus" | "warn";

export type Block23 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: Tone23 }
  | { type: "mixed"; text: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "formulaStrip"; items: readonly string[]; tone?: "emerald" | "indigo" | "amber" | "rose" | "sky" | "violet" }
  | { type: "openingRecall" }
  | { type: "countingMachine" }
  | { type: "countableExamples" }
  | { type: "magicTest" }
  | { type: "twoForms" }
  | { type: "rememberBoard" }
  | { type: "uncountableIntro" }
  | { type: "waterLab" }
  | { type: "riceLab" }
  | { type: "coreDifference" }
  | { type: "smartCompare" }
  | { type: "aanRule" }
  | { type: "whyRule" }
  | { type: "restaurantException" }
  | { type: "noPluralRule" }
  | { type: "importantWords" }
  | { type: "chickenContext" }
  | { type: "coffeeContext" }
  | { type: "basicLevelRule" }
  | { type: "thereBridge" }
  | { type: "thereGoldenRule" }
  | { type: "kitchenAnalysis" }
  | { type: "someLab" }
  | { type: "someExamples" }
  | { type: "someAttention" }
  | { type: "someTwoTypes" }
  | { type: "anyLab" }
  | { type: "someAnyCompare" }
  | { type: "twoQuestionsIntro" }
  | { type: "howManyLab" }
  | { type: "howMuchLab" }
  | { type: "superKey" }
  | { type: "bigBattle" }
  | { type: "advancedExamples" }
  | { type: "moneyLab" }
  | { type: "informationLab" }
  | { type: "adviceLab" }
  | { type: "furnitureLab" }
  | { type: "homeworkLab" }
  | { type: "faceToFace" }
  | { type: "threeQuestionTest" }
  | { type: "trapNote" }
  | { type: "commonErrors" }
  | { type: "manyMuchIQ" };

export type Exercise23 =
  | { type: "training1" }
  | { type: "training2" }
  | { type: "training3" }
  | { type: "training4" }
  | { type: "detective" }
  | { type: "iq200" }
  | { type: "thinking" }
  | { type: "finalBoss" };

export type Slide23 = { section: string; mascot: string; sourceIndex?: number } & (
  | { kind: "cover"; title: string }
  | { kind: "objectives"; title: string }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block23[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle?: string; ex: Exercise23 }
  | { kind: "goldenSummary"; title: string }
  | { kind: "magicTable"; title: string }
  | { kind: "sevenRules"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

// مجموعات الشريط الجانبي
const START = "البداية";
const COUNTING = "العدّ: Countable";
const MASS = "الكمية: Uncountable";
const ARTICLES = "قواعد a / an";
const MEANING = "المعنى والسياق";
const EXIST = "There is / There are";
const QUANT = "some / any";
const ASK = "How many / How much";
const UNITS = "كلمات خاصة ووحدات";
const TEST = "المقارنة والاختبار";
const PRACTICE = "التدريبات والمحقق";
const FINAL = "التحديات النهائية";
const END = "الخاتمة";

// ============================================================
// تسلسل الشرائح — بنفس ترتيب المصدر
// ============================================================
export const SLIDES: Slide23[] = [
  { kind: "cover", section: START, mascot: "🧮", title: LESSON_TITLE_23 },

  // 0. الافتتاح
  {
    kind: "lesson",
    section: START,
    mascot: "🔗",
    sourceIndex: 0,
    step: "0",
    title: "من الدروس السابقة إلى الدرس 23 — ربط البداية",
    blocks: [{ type: "openingRecall" }],
  },

  // 1. الأهداف
  { kind: "objectives", section: START, mascot: "🎯", sourceIndex: 1, title: "أهداف الدرس" },

  // 2. ما معنى Countable؟
  {
    kind: "lesson",
    section: COUNTING,
    mascot: "🧠",
    sourceIndex: 2,
    step: "1",
    title: "أولًا: ما معنى Countable؟",
    lead: "Countable = معدود — أي شيء تستطيع أن تقول عنه 1، 2، 3...",
    blocks: [{ type: "countingMachine" }],
  },

  // 3. أمثلة Countable
  {
    kind: "lesson",
    section: COUNTING,
    mascot: "⭐",
    sourceIndex: 3,
    step: "2",
    title: "أمثلة على Countable Nouns",
    lead: "15 اسمًا معدودًا من المصدر — يمكننا عدّ كل واحد منها.",
    blocks: [{ type: "countableExamples" }],
  },

  // 4. الاختبار السحري
  {
    kind: "lesson",
    section: COUNTING,
    mascot: "🪄",
    sourceIndex: 4,
    step: "3",
    title: "الاختبار السحري",
    lead: "هل أستطيع أن أضع رقمًا أمامه؟",
    blocks: [{ type: "magicTest" }],
    tip: "ضع الاسم في آلة العدّ: إن قبل رقمًا أمامه فهو Countable.",
  },

  // 5. شكلان
  {
    kind: "lesson",
    section: COUNTING,
    mascot: "🔥",
    sourceIndex: 5,
    step: "4",
    title: "Countable لها شكلان",
    blocks: [{ type: "twoForms" }],
  },

  // 6. تذكر
  {
    kind: "lesson",
    section: COUNTING,
    mascot: "🧠",
    sourceIndex: 6,
    step: "5",
    title: "تذكر",
    blocks: [{ type: "rememberBoard" }],
  },

  // 7. المفاجأة — Uncountable
  {
    kind: "lesson",
    section: MASS,
    mascot: "🚨",
    sourceIndex: 7,
    step: "6",
    title: "الآن المفاجأة — Uncountable Nouns",
    lead: "ليس كل شيء يمكن عده بالطريقة نفسها.",
    blocks: [{ type: "uncountableIntro" }],
  },

  // 8. مثال الماء
  {
    kind: "lesson",
    section: MASS,
    mascot: "💧",
    sourceIndex: 8,
    step: "7",
    title: "مثال الماء",
    lead: "فكر في الماء: لا نعدّ الماء نفسه — نعدّ bottles.",
    blocks: [{ type: "waterLab" }],
  },

  // 9. مثال الأرز
  {
    kind: "lesson",
    section: MASS,
    mascot: "🍚",
    sourceIndex: 9,
    step: "8",
    title: "مثال الأرز",
    lead: "لا نعدّ الأرز نفسه — نعدّ الأكياس.",
    blocks: [{ type: "riceLab" }],
  },

  // 10. الفرق الأساسي
  {
    kind: "lesson",
    section: MASS,
    mascot: "🧠",
    sourceIndex: 10,
    step: "9",
    title: "الفرق الأساسي",
    blocks: [{ type: "coreDifference" }],
  },

  // 11. مقارنة ذكية
  {
    kind: "lesson",
    section: MASS,
    mascot: "⭐",
    sourceIndex: 11,
    step: "10",
    title: "مقارنة ذكية",
    blocks: [{ type: "smartCompare" }],
  },

  // 12. قاعدة a / an
  {
    kind: "lesson",
    section: ARTICLES,
    mascot: "🚨",
    sourceIndex: 12,
    step: "11",
    title: "قاعدة مهمة جدًا — a / an",
    blocks: [{ type: "aanRule" }],
  },

  // 13. لماذا؟
  {
    kind: "lesson",
    section: ARTICLES,
    mascot: "🧠",
    sourceIndex: 13,
    step: "12",
    title: "لماذا؟",
    lead: "a = واحد، an = واحد.",
    blocks: [{ type: "whyRule" }],
  },

  // 14. استثناء المطعم
  {
    kind: "lesson",
    section: ARTICLES,
    mascot: "⭐",
    sourceIndex: 14,
    step: "13",
    title: "لكن انتبه! — في المطعم",
    blocks: [{ type: "restaurantException" }],
  },

  // 15. لا تأخذ جمعًا
  {
    kind: "lesson",
    section: MASS,
    mascot: "🧠",
    sourceIndex: 15,
    step: "14",
    title: "الأسماء غير المعدودة غالبًا لا تأخذ جمعًا",
    blocks: [{ type: "noPluralRule" }],
  },

  // 16. كلمات مهمة
  {
    kind: "lesson",
    section: MASS,
    mascot: "🔥",
    sourceIndex: 16,
    step: "15",
    title: "كلمات مهمة جدًا يجب حفظها",
    lead: "17 كلمة من المصدر — احفظها مع معناها.",
    blocks: [{ type: "importantWords" }],
  },

  // 17. chicken
  {
    kind: "lesson",
    section: MEANING,
    mascot: "🧠",
    sourceIndex: 17,
    step: "16",
    title: "لكن هنا يجب أن نكون أذكياء — chicken",
    blocks: [{ type: "chickenContext" }],
  },

  // 18. coffee
  {
    kind: "lesson",
    section: MEANING,
    mascot: "🥤",
    sourceIndex: 18,
    step: "17",
    title: "مثال آخر: coffee",
    blocks: [{ type: "coffeeContext" }],
  },

  // 19. قاعدة المستوى الأساسي
  {
    kind: "lesson",
    section: MEANING,
    mascot: "🧠",
    sourceIndex: 19,
    step: "18",
    title: "قاعدة المستوى الأساسي",
    blocks: [{ type: "basicLevelRule" }],
  },

  // 20. There is / There are
  {
    kind: "lesson",
    section: EXIST,
    mascot: "🔗",
    sourceIndex: 20,
    step: "19",
    title: "العلاقة مع There is / There are",
    lead: "هنا سنستخدم درس 21!",
    blocks: [{ type: "thereBridge" }],
  },

  // 21. قاعدة ذهبية
  {
    kind: "lesson",
    section: EXIST,
    mascot: "⭐",
    sourceIndex: 21,
    step: "20",
    title: "قاعدة ذهبية",
    blocks: [{ type: "thereGoldenRule" }],
  },

  // 22. المطبخ
  {
    kind: "lesson",
    section: EXIST,
    mascot: "🧪",
    sourceIndex: 22,
    step: "21",
    title: "لنحلل المطبخ",
    lead: "تخيل مطبخًا فيه: three apples, two eggs, some rice, some milk, four plates, a bottle of water",
    blocks: [{ type: "kitchenAnalysis" }],
  },

  // 23. some
  {
    kind: "lesson",
    section: QUANT,
    mascot: "🧠",
    sourceIndex: 23,
    step: "22",
    title: "الآن: some",
    lead: "some = كمية غير محددة.",
    blocks: [{ type: "someLab" }],
  },

  // 24. أمثلة some
  {
    kind: "lesson",
    section: QUANT,
    mascot: "⭐",
    sourceIndex: 24,
    step: "23",
    title: "أمثلة some",
    blocks: [{ type: "someExamples" }],
  },

  // 25. انتبه
  {
    kind: "lesson",
    section: QUANT,
    mascot: "🚨",
    sourceIndex: 25,
    step: "24",
    title: "انتبه — some book / some books",
    blocks: [{ type: "someAttention" }],
  },

  // 26. some أمام نوعين
  {
    kind: "lesson",
    section: QUANT,
    mascot: "🧠",
    sourceIndex: 26,
    step: "25",
    title: "some أمام نوعين",
    blocks: [{ type: "someTwoTypes" }],
  },

  // 27. any
  {
    kind: "lesson",
    section: QUANT,
    mascot: "🔥",
    sourceIndex: 27,
    step: "26",
    title: "الآن any",
    lead: "any غالبًا تظهر في الأسئلة والجمل المنفية.",
    blocks: [{ type: "anyLab" }],
  },

  // 28. مقارنة some / any
  {
    kind: "lesson",
    section: QUANT,
    mascot: "⭐",
    sourceIndex: 28,
    step: "27",
    title: "مقارنة some / any",
    blocks: [{ type: "someAnyCompare" }],
  },

  // 29. سؤالان مهمان
  {
    kind: "lesson",
    section: ASK,
    mascot: "🧠",
    sourceIndex: 29,
    step: "28",
    title: "الآن نصل إلى سؤالين مهمين جدًا",
    blocks: [{ type: "twoQuestionsIntro" }],
  },

  // 30. How many?
  {
    kind: "lesson",
    section: ASK,
    mascot: "🔢",
    sourceIndex: 30,
    step: "29",
    title: "How many?",
    lead: "How many + Countable Plural? — عندما نستطيع العد.",
    blocks: [{ type: "howManyLab" }],
  },

  // 31. How much?
  {
    kind: "lesson",
    section: ASK,
    mascot: "💧",
    sourceIndex: 31,
    step: "30",
    title: "How much?",
    lead: "How much + Uncountable Noun? — عندما نتحدث عن كمية شيء غير معدود.",
    blocks: [{ type: "howMuchLab" }],
  },

  // 32. مفتاح خارق
  {
    kind: "lesson",
    section: ASK,
    mascot: "🧠",
    sourceIndex: 32,
    step: "31",
    title: "مفتاح خارق",
    blocks: [{ type: "superKey" }],
  },

  // 33. المعركة الكبرى
  {
    kind: "lesson",
    section: ASK,
    mascot: "⚔️",
    sourceIndex: 33,
    step: "32",
    title: "المعركة الكبرى",
    blocks: [{ type: "bigBattle" }],
  },

  // 34. أمثلة متقدمة
  {
    kind: "lesson",
    section: ASK,
    mascot: "⭐",
    sourceIndex: 34,
    step: "33",
    title: "أمثلة متقدمة قليلًا",
    blocks: [{ type: "advancedExamples" }],
  },

  // 35. money
  {
    kind: "lesson",
    section: UNITS,
    mascot: "🧠",
    sourceIndex: 35,
    step: "34",
    title: "نقطة مهمة جدًا عن money",
    lead: "هذه من الكلمات التي تسبب أخطاء كثيرة.",
    blocks: [{ type: "moneyLab" }],
  },

  // 36. information
  {
    kind: "lesson",
    section: UNITS,
    mascot: "🧠",
    sourceIndex: 36,
    step: "35",
    title: "نقطة مهمة جدًا عن information",
    blocks: [{ type: "informationLab" }],
  },

  // 37. advice
  {
    kind: "lesson",
    section: UNITS,
    mascot: "🧠",
    sourceIndex: 37,
    step: "36",
    title: "نقطة مهمة جدًا عن advice",
    blocks: [{ type: "adviceLab" }],
  },

  // 38. furniture
  {
    kind: "lesson",
    section: UNITS,
    mascot: "🪑",
    sourceIndex: 38,
    step: "37",
    title: "نقطة مهمة عن furniture",
    blocks: [{ type: "furnitureLab" }],
  },

  // 39. homework
  {
    kind: "lesson",
    section: UNITS,
    mascot: "📝",
    sourceIndex: 39,
    step: "38",
    title: "نقطة مهمة عن homework",
    blocks: [{ type: "homeworkLab" }],
  },

  // 40. وجهًا لوجه
  {
    kind: "lesson",
    section: TEST,
    mascot: "🧠",
    sourceIndex: 40,
    step: "39",
    title: "Countable vs Uncountable — وجهًا لوجه",
    lead: "لنضعهما وجهًا لوجه.",
    blocks: [{ type: "faceToFace" }],
  },

  // 41. الاختبار الثلاثي
  {
    kind: "lesson",
    section: TEST,
    mascot: "⭐",
    sourceIndex: 41,
    step: "40",
    title: "كيف أختبر أي كلمة؟",
    lead: "اسأل 3 أسئلة قبل أن تحكم على أي اسم.",
    blocks: [{ type: "threeQuestionTest" }],
  },

  // 42. الفخ
  {
    kind: "lesson",
    section: TEST,
    mascot: "🧠",
    sourceIndex: 42,
    step: "41",
    title: "لكن هناك فخ!",
    blocks: [{ type: "trapNote" }],
  },

  // 43. أخطاء شائعة
  {
    kind: "lesson",
    section: TEST,
    mascot: "🚨",
    sourceIndex: 43,
    step: "42",
    title: "أخطاء شائعة جدًا",
    lead: "ستة أخطاء من المصدر — مع التصحيح الكامل.",
    blocks: [{ type: "commonErrors" }],
  },

  // 44. IQ200 many / much
  {
    kind: "lesson",
    section: TEST,
    mascot: "🧠",
    sourceIndex: 44,
    step: "43",
    title: "IQ200: لا تحفظ «much = غير معدود» فقط!",
    blocks: [{ type: "manyMuchIQ" }],
  },

  // 45. تدريب ①
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    sourceIndex: 45,
    badge: "🔥 ①",
    title: "تدريب ① — Countable أم Uncountable؟",
    subtitle: "12 كلمة من المصدر — اختر النوع ثم اضغط «تحقق من الإجابات».",
    ex: { type: "training1" },
  },

  // 46. تدريب ②
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    sourceIndex: 46,
    badge: "🔥 ②",
    title: "تدريب ② — a/an أم some؟",
    subtitle: "8 فقرات من المصدر — a/an للمفرد المعدود، some للجمع وغير المعدود.",
    ex: { type: "training2" },
  },

  // 47. تدريب ③
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    sourceIndex: 47,
    badge: "🔥 ③",
    title: "تدريب ③ — There is أم There are؟",
    subtitle: "8 جمل من المصدر.",
    ex: { type: "training3" },
  },

  // 48. تدريب ④
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    sourceIndex: 48,
    badge: "🔥 ④",
    title: "تدريب ④ — How many أم How much؟",
    subtitle: "8 أسئلة من المصدر.",
    ex: { type: "training4" },
  },

  // 49. Grammar Detective
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🕵️",
    sourceIndex: 49,
    badge: "🕵️",
    title: "Grammar Detective",
    subtitle: "10 جمل من المصدر — حدد نوع الاسم أولًا، ثم اكتشف الخطأ إن وُجد.",
    ex: { type: "detective" },
  },

  // 50. IQ200 Challenge
  {
    kind: "ex",
    section: FINAL,
    mascot: "🚀",
    sourceIndex: 50,
    badge: "🚀",
    title: "IQ200 Challenge",
    subtitle: "8 جمل — واحدة منها صحيحة. اكتشفها وفسّر السبب.",
    ex: { type: "iq200" },
  },

  // 51. تحدي التفكير
  {
    kind: "ex",
    section: FINAL,
    mascot: "🧠",
    sourceIndex: 51,
    badge: "🧠",
    title: "تحدي التفكير",
    subtitle: "6 كميات من المصدر — اكتب جملة There is / There are لكل عنصر.",
    ex: { type: "thinking" },
  },

  // 52. FINAL BOSS
  {
    kind: "ex",
    section: FINAL,
    mascot: "🏆",
    sourceIndex: 52,
    badge: "🏆",
    title: "FINAL BOSS — الغرفة الغامضة",
    subtitle: "8 محتويات، 8 جمل وصف، سؤالان بـ How many؟ وسؤالان بـ How much؟",
    ex: { type: "finalBoss" },
  },

  // 53. الخلاصة الذهبية
  { kind: "goldenSummary", section: END, mascot: "🏆", sourceIndex: 53, title: "الخلاصة الذهبية" },

  // 54. الجدول السحري
  { kind: "magicTable", section: END, mascot: "⭐", sourceIndex: 54, title: "الجدول السحري" },

  // 55. أهم 7 قواعد
  { kind: "sevenRules", section: END, mascot: "🔥", sourceIndex: 55, title: "أهم 7 قواعد في الدرس" },

  // 56. خريطة المنهج
  { kind: "roadmap", section: END, mascot: "🗺️", sourceIndex: 56, title: "أين وصلنا في المنهج؟" },

  // الاختبار النهائي
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي — الدرس 23" },

  // الخاتمة
  { kind: "closing", section: END, mascot: "🏆", title: "أحسنت!" },
];

// الأخطاء المقصودة في المصدر — محفوظة حرفيًا كأمثلة تعليمية
export const INTENTIONALLY_WRONG_23: string[] = [
  "a water",
  "a milk",
  "a rice",
  "some informations",
  "some advices",
  "some furnitures",
  "two waters",
  "three rices",
  "I have three money.",
  "an information",
  "advices",
  "informations",
  "a furniture",
  "homeworks",
  "How much books do you have?",
  "How many water do you drink?",
  "one water",
  "two rices",
  "one rice",
  "three waters",
  "an advice",
  "a homework",
  "furnitures",
  "There are some water",
  "I have a water.",
  "She gave me an advice.",
  "I need two informations.",
  "There are some milk in the fridge.",
  "some book",
  "There is two apples on the table.",
  "There are some water in the glass.",
  "I need an information.",
  "She bought three bread.",
  "How much chairs are there?",
  "How many rice do we need?",
  "There is some books in my bag.",
  "I have two waters.",
  "There are some milk in the fridge.",
  "He gave me an advice.",
  "I need three informations.",
  "She has a furniture.",
];
