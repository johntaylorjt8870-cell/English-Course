// ============================================================
// الدرس 18 — Plural Nouns — جمع الأسماء
// المصدر الكامل محفوظ حرفيًا — لا تلخيص ولا إعادة صياغة ولا حذف أقسام.
// العنوان: الدرس 18: Plural Nouns — جمع الأسماء — Regular & Irregular Plurals
//
// ملاحظة اتجاه: كل وحدة إنجليزية داخل هذا الملف نص خام يُعرض دائمًا
// داخل عازل LTR (dir="ltr") — ولا يُقسَّم إلى كلمات منفصلة أبدًا.
// ============================================================

// -------------------- الفهارس والعناوين (تحقق تغطية المصدر) --------------------
export const SOURCE_SECTIONS: string[] = [
  "🎯 أهداف الدرس",
  "🧠 1. ما معنى Singular و Plural؟",
  "🧠 2. الجمع العادي Regular Plural",
  "🧠 3. متى نضيف ES بدل S؟",
  "🧠 4. الكلمات التي تنتهي بـ Y",
  "🧠 5. بعض الكلمات التي تنتهي بـ F أو FE",
  "😈 6. الآن نصل إلى الوحوش الحقيقية — Irregular Plurals",
  "🔥 7. لا تحفظ الكلمات منفصلة... احفظها كعائلات",
  "🧠 8. الجمع وعلاقته بـ IS / ARE",
  "🧠 9. الجمع مع WAS / WERE",
  "🧠 10. الجمع وعلاقته بـ Present Simple",
  "🚨 11. أخطاء شائعة جدًا",
  "🕵️ 12. Grammar Detective",
  "🧩 13. Challenge 1 — حوّل إلى جمع",
  "🧩 14. Challenge 2 — اختر الإجابة الصحيحة",
  "🧠 15. Challenge 3 — is or are?",
  "🚀 16. IQ200 Challenge",
  "🧠 17. IQ200 — لماذا؟",
  "🏆 18. FINAL BOSS — تحدي المرحلة",
  "🎮 19. Mini Game — Singular or Plural?",
  "🧠 خلاصة الدرس",
  "🧠 أهم قاعدة يجب أن تخرج بها اليوم",
  "🗺️ أين وصلنا في المنهج؟",
];

/** عدد أقسام المصدر المرقّمة (1–19) — يُستخدم في التحقق الآلي. */
export const SOURCE_NUMBERED_COUNT = 19;

// -------------------- مقدمة الغلاف (حرفية من المصدر) --------------------
export const LESSON_TITLE_18 = "الدرس 18: Plural Nouns — جمع الأسماء";
export const LESSON_SUBTITLE_18 = "Regular & Irregular Plurals";
export const LAB_NAME_18 = "PLURAL LAB — THE NUMBER DETECTIVE";
export const LAB_MOTTO_18 =
  "PLURAL ≠ just add S — أولًا أحدد: مفرد؟ جمع؟ القاعدة أيها؟";
export const COVER_INTRO_18 =
  "اليوم سنبني واحدة من أهم القطع في اللغة الإنجليزية: كيف نحول الاسم من مفرد إلى جمع، ومتى نستخدم الجمع العادي، ومتى يكون الجمع شاذًا ولا يمكننا إضافة S فقط.";
export const COVER_LINKS_LEAD_18 = "هذا الدرس مهم جدًا لأنه سيرتبط مباشرة لاحقًا بـ:";
export const COVER_LINKS_18 = [
  "الأفعال",
  "this / these",
  "that / those",
  "much / many",
  "some / any",
  "الأسماء المعدودة وغير المعدودة",
  "الملكية",
  "وحتى الأزمنة.",
];

// -------------------- تدفق المختبر: ONE → SINGULAR → rule → PLURAL --------------------
export const LAB_FLOW_18 = ["ONE", "SINGULAR", "identify the rule", "PLURAL"];

// -------------------- 🎯 أهداف الدرس --------------------
export const OBJECTIVES_18: { n: string; text: string; items?: string[]; itemsEn?: boolean }[] = [
  { n: "①", text: "معرفة الفرق بين Singular و Plural." },
  {
    n: "②",
    text: "تكوين الجمع العادي باستخدام:",
    items: ["s", "es", "ies"],
  },
  { n: "③", text: "معرفة بعض قواعد الكلمات التي تنتهي بـ f / fe." },
  { n: "④", text: "معرفة أهم الأسماء ذات الجمع الشاذ." },
  { n: "⑤", text: "معرفة الكلمات التي يكون المفرد والجمع فيها بنفس الشكل." },
  { n: "⑥", text: "استخدام الجمع مع is / are و was / were." },
  { n: "⑦", text: "فهم تأثير الجمع على الفعل في Present Simple." },
  { n: "⑧", text: "اكتشاف الأخطاء وتصحيحها." },
  {
    n: "⑨",
    text: "التعامل مع كلمات مثل:",
    items: [
      "child → children",
      "man → men",
      "woman → women",
      "tooth → teeth",
      "foot → feet",
      "person → people",
    ],
    itemsEn: true,
  },
];

// -------------------- 1. ما معنى Singular و Plural؟ --------------------
export const SINGULAR_PLURAL_18 = {
  singular: {
    label: "Singular",
    eq: "Singular = مفرد",
    note: "يعني شيء واحد فقط.",
    words: [
      { en: "book", ar: "كتاب واحد" },
      { en: "car", ar: "سيارة واحدة" },
      { en: "student", ar: "طالب واحد" },
      { en: "child", ar: "طفل واحد" },
      { en: "apple", ar: "تفاحة واحدة" },
    ],
    exampleLabel: "مثال:",
    example: "I have a book.",
    exampleAr: "لدي كتاب واحد.",
  },
  plural: {
    label: "Plural",
    eq: "Plural = جمع",
    note: "يعني أكثر من شيء واحد.",
    words: [
      { en: "books", ar: "كتب" },
      { en: "cars", ar: "سيارات" },
      { en: "students", ar: "طلاب" },
      { en: "children", ar: "أطفال" },
      { en: "apples", ar: "تفاحات" },
    ],
    exampleLabel: "مثال:",
    example: "I have two books.",
    exampleAr: "لدي كتابان.",
  },
};

// ⭐ القاعدة الذهبية الأولى — a / an
export const A_AN_RULE_18 = {
  title: "القاعدة الذهبية الأولى",
  rule: "إذا كان عندنا اسم معدود مفرد، يمكن أن نستخدم:",
  use: "a / an",
  exampleLabel: "مثال:",
  examples: ["a book", "a car", "an apple", "an orange"],
  but: "لكن عندما يصبح الاسم جمعًا:",
  but2: "لا نستخدم a أو an.",
  checks: [
    { en: "a book", ok: true },
    { en: "books", ok: true },
    { en: "a books", ok: false },
    { en: "an apples", ok: false },
  ],
};

// -------------------- 2. الجمع العادي Regular Plural --------------------
export const REGULAR_18 = {
  intro: "أغلب الأسماء الإنجليزية تتبع قاعدة بسيطة:",
  formula: "Noun + s",
  examples: [
    { sing: "book", plural: "books" },
    { sing: "car", plural: "cars" },
    { sing: "pen", plural: "pens" },
    { sing: "student", plural: "students" },
    { sing: "robot", plural: "robots" },
    { sing: "window", plural: "windows" },
    { sing: "planet", plural: "planets" },
  ],
  newLabel: "أمثلة جديدة",
  newExamples: [
    { sing: "cat", plural: "cats" },
    { sing: "dog", plural: "dogs" },
    { sing: "chair", plural: "chairs" },
    { sing: "table", plural: "tables" },
    { sing: "phone", plural: "phones" },
    { sing: "computer", plural: "computers" },
    { sing: "river", plural: "rivers" },
    { sing: "star", plural: "stars" },
    { sing: "game", plural: "games" },
    { sing: "friend", plural: "friends" },
  ],
  patternLabel: "جرب أن تلاحظ النمط",
  pattern: [
    { count: "one", word: "book" },
    { count: "two", word: "books" },
    { count: "one", word: "planet" },
    { count: "three", word: "planets" },
    { count: "one", word: "robot" },
    { count: "four", word: "robots" },
  ],
  patternNote1: "واحد → اسم مفرد",
  patternNote2: "أكثر من واحد → غالبًا نضيف S.",
};

// الأشكال المدمجة الحرفية (Singular → Plural) كما في المصدر — للتوثيق والتحقق
export const REGULAR_JOINED_18 = [
  "book → books",
  "car → cars",
  "pen → pens",
  "student → students",
  "robot → robots",
  "window → windows",
  "planet → planets",
];
export const REGULAR_NEW_JOINED_18 = [
  "cat → cats",
  "dog → dogs",
  "chair → chairs",
  "table → tables",
  "phone → phones",
  "computer → computers",
  "river → rivers",
  "star → stars",
  "game → games",
  "friend → friends",
];

// -------------------- 3. متى نضيف ES بدل S؟ --------------------
export const ES_18 = {
  intro: "هناك كلمات لا يكفي معها إضافة S فقط.",
  intro2: "خصوصًا الكلمات التي تنتهي بأصوات مثل:",
  sounds: ["s", "sh", "ch", "x"],
  andSometimes: "وأحيانًا o",
  use: "في هذه الحالات نستخدم:",
  formula: "ES",
  examples: [
    { sing: "bus", plural: "buses" },
    { sing: "class", plural: "classes" },
    { sing: "dish", plural: "dishes" },
    { sing: "brush", plural: "brushes" },
    { sing: "watch", plural: "watches" },
    { sing: "box", plural: "boxes" },
    { sing: "fox", plural: "foxes" },
    { sing: "tomato", plural: "tomatoes" },
    { sing: "potato", plural: "potatoes" },
  ],
  whyTitle: "لماذا؟",
  why1: "لأن:",
  why2: "box + s",
  why3: "ستصبح كتابتها:",
  why4: "boxs ❌",
  why5: "وهذا غير صحيح.",
  why6: "لذلك:",
  why7: "box → boxes ✅",
  importantTitle: "أمثلة مهمة",
  important: [
    { sing: "watch", plural: "watches" },
    { sing: "dish", plural: "dishes" },
    { sing: "class", plural: "classes" },
    { sing: "bus", plural: "buses" },
    { sing: "brush", plural: "brushes" },
    { sing: "box", plural: "boxes" },
  ],
};

export const ES_JOINED_18 = [
  "bus → buses",
  "class → classes",
  "dish → dishes",
  "brush → brushes",
  "watch → watches",
  "box → boxes",
  "fox → foxes",
  "tomato → tomatoes",
  "potato → potatoes",
];

// مختبر S / ES / IES — لماذا اختيرت كل قاعدة
export const SESIES_LAB_18 = [
  {
    rule: "S",
    example: "book → books",
    why: "الغالب في الإنجليزية: نضيف S فقط.",
    color: "sky",
  },
  {
    rule: "ES",
    example: "box → boxes",
    why: "تنتهي بـ s / sh / ch / x (وأحيانًا o) ← نضيف ES حتى تبقى القراءة واضحة.",
    color: "amber",
  },
  {
    rule: "IES",
    example: "baby → babies",
    why: "حرف ساكن قبل y ← نحوّل y إلى ies.",
    color: "violet",
  },
] as const;

// -------------------- 4. الكلمات التي تنتهي بـ Y --------------------
export const Y_RULE_18 = {
  intro: "هنا يجب أن ننتبه.",
  intro2: "ليس كل Y يتصرف بنفس الطريقة.",
  intro3: "لدينا حالتان.",
  case1: {
    title: "الحالة الأولى: consonant + y",
    rule: "إذا كان قبل Y حرف ساكن Consonant:",
    action: "نحوّل:",
    formula: "y → ies",
    examples: [
      { sing: "baby", plural: "babies" },
      { sing: "city", plural: "cities" },
      { sing: "story", plural: "stories" },
      { sing: "family", plural: "families" },
      { sing: "country", plural: "countries" },
      { sing: "library", plural: "libraries" },
    ],
    howTitle: "كيف عرفنا؟",
    howWord: "baby",
    howBefore: "الحرف الذي قبل y هو:",
    howLetter: "b",
    howNote: "وهو حرف ساكن.",
    howSo: "إذن:",
    howResult: "baby → babies",
  },
  case2: {
    title: "الحالة الثانية: vowel + y",
    rule: "إذا كان قبل Y حرف علة:",
    vowels: ["a", "e", "i", "o", "u"],
    action: "نحتفظ بالـ Y ونضيف S فقط.",
    examples: [
      { sing: "boy", plural: "boys" },
      { sing: "toy", plural: "toys" },
      { sing: "day", plural: "days" },
      { sing: "key", plural: "keys" },
      { sing: "monkey", plural: "monkeys" },
    ],
  },
  compareTitle: "قارن!",
  compare: [
    {
      word: "baby",
      result: "babies",
      before: "b + y",
      note: "حرف ساكن قبل y",
      then: "إذن:",
      rule: "y → ies",
    },
    {
      word: "boy",
      result: "boys",
      before: "o + y",
      note: "حرف علة قبل y",
      then: "إذن:",
      rule: "y تبقى كما هي + s",
      result2: "boy → boys",
    },
  ],
  miniTitle: "IQ200 Mini Challenge",
  mini: [
    {
      question: "أي واحدة صحيحة؟",
      options: ["citys", "cities"],
      answer: 1,
      answerLabel: "الإجابة:",
      answerText: "cities ✅",
      why: "لأن: city → cities",
    },
    {
      question: "أي واحدة صحيحة؟",
      options: ["toys", "toies"],
      answer: 0,
      answerLabel: "الإجابة:",
      answerText: "toys ✅",
      why: "لأن: toy → toys",
    },
  ],
};

export const Y_CASE1_JOINED_18 = [
  "baby → babies",
  "city → cities",
  "story → stories",
  "family → families",
  "country → countries",
  "library → libraries",
];
export const Y_CASE2_JOINED_18 = ["boy → boys", "toy → toys", "day → days", "key → keys", "monkey → monkeys"];

// آلة قرار Y — الكلمة والحرف الذي قبل y
export const Y_MACHINE_18 = [
  { word: "baby", before: "b", vowel: false, plural: "babies" },
  { word: "city", before: "t", vowel: false, plural: "cities" },
  { word: "story", before: "r", vowel: false, plural: "stories" },
  { word: "boy", before: "o", vowel: true, plural: "boys" },
  { word: "toy", before: "o", vowel: true, plural: "toys" },
  { word: "day", before: "a", vowel: true, plural: "days" },
];

// -------------------- 5. بعض الكلمات التي تنتهي بـ F أو FE --------------------
export const FE_RULE_18 = {
  intro: "هناك بعض الكلمات التي تتحول فيها:",
  formula: "f / fe → ves",
  famousLabel: "أمثلة مشهورة:",
  famous: [
    { sing: "knife", plural: "knives" },
    { sing: "wife", plural: "wives" },
    { sing: "life", plural: "lives" },
    { sing: "leaf", plural: "leaves" },
    { sing: "wolf", plural: "wolves" },
    { sing: "shelf", plural: "shelves" },
    { sing: "half", plural: "halves" },
  ],
  warning: "لكن انتبه! ⚠️ هذه ليست قاعدة تنطبق على جميع الكلمات التي تنتهي بـ f أو fe.",
  forExample: "مثلًا:",
  exceptions: [
    { sing: "roof", plural: "roofs" },
    { sing: "chief", plural: "chiefs" },
    { sing: "safe", plural: "safes" },
  ],
  dontMemorize: "لذلك لا نحفظ:",
  dontFormula: "كل F تصبح VES",
  butMemorize: "بل نحفظ الكلمات الشائعة واحدة واحدة.",
};

// مختبر الحذر F / FE
export const FE_CAUTION_18 = {
  ves: [
    { sing: "knife", plural: "knives" },
    { sing: "wife", plural: "wives" },
    { sing: "life", plural: "lives" },
    { sing: "leaf", plural: "leaves" },
  ],
  s: [
    { sing: "roof", plural: "roofs" },
    { sing: "chief", plural: "chiefs" },
    { sing: "safe", plural: "safes" },
  ],
  alarm: "لا تحوّل كل f إلى v — الكلمة تحدد القاعدة.",
};

export const FE_FAMOUS_JOINED_18 = [
  "knife → knives",
  "wife → wives",
  "life → lives",
  "leaf → leaves",
  "wolf → wolves",
  "shelf → shelves",
  "half → halves",
];
export const FE_EXCEPTION_JOINED_18 = ["roof → roofs", "chief → chiefs", "safe → safes"];

// -------------------- 6. Irregular Plurals — الوحوش الحقيقية --------------------
export const IRREGULAR_INTRO_18 = {
  no1: "بعض الأسماء لا تتبع:",
  noList: ["s", "es", "y → ies"],
  no2: "بل تتغير الكلمة نفسها.",
  no3: "وهذه تسمى:",
  name: "Irregular Plurals",
  nameAr: "الجمع الشاذ.",
  importantLabel: "أهم الأسماء الشاذة",
};

export interface Monster18 {
  n: string;
  sing: string;
  plural: string;
  singAr: string;
  pluralAr: string;
  ex1?: string;
  ex2?: string;
  wrong?: string;
  wrongNote?: string;
  correct?: string;
  note?: string;
}

export const MONSTERS_18: Monster18[] = [
  {
    n: "①",
    sing: "man",
    plural: "men",
    singAr: "رجل",
    pluralAr: "رجال",
    ex1: "The man is tall.",
    ex2: "The men are tall.",
    note: "لاحظ: man → men",
  },
  {
    n: "②",
    sing: "woman",
    plural: "women",
    singAr: "امرأة",
    pluralAr: "نساء",
    ex1: "The woman is a doctor.",
    ex2: "The women are doctors.",
    note: "⚠️ انتبه للنطق أيضًا: woman تُنطق تقريبًا: وُمَن — women تُنطق تقريبًا: وِمِن",
  },
  {
    n: "③",
    sing: "child",
    plural: "children",
    singAr: "طفل",
    pluralAr: "أطفال",
    ex1: "The child is happy.",
    ex2: "The children are happy.",
    wrong: "childs",
    correct: "children",
    note: "هذه من أهم الكلمات التي يجب حفظها.",
  },
  {
    n: "④",
    sing: "person",
    plural: "people",
    singAr: "شخص",
    pluralAr: "أشخاص / ناس",
    ex1: "One person is waiting.",
    ex2: "Five people are waiting.",
    wrong: "persons",
    wrongNote: "كجمع عادي في المستوى الأساسي.",
    correct: "people",
  },
  {
    n: "⑤",
    sing: "tooth",
    plural: "teeth",
    singAr: "سن",
    pluralAr: "أسنان",
    ex1: "I have one tooth.",
    ex2: "I have many teeth.",
  },
  {
    n: "⑥",
    sing: "foot",
    plural: "feet",
    singAr: "قدم",
    pluralAr: "أقدام",
    ex1: "My foot is cold.",
    ex2: "My feet are cold.",
  },
  {
    n: "⑦",
    sing: "mouse",
    plural: "mice",
    singAr: "فأر",
    pluralAr: "فئران",
    ex1: "I see one mouse.",
    ex2: "I see two mice.",
  },
  {
    n: "⑧",
    sing: "goose",
    plural: "geese",
    singAr: "إوزة",
    pluralAr: "إوز",
  },
  {
    n: "⑨",
    sing: "ox",
    plural: "oxen",
    singAr: "ثور",
    pluralAr: "ثيران",
    note: "هذه أقل استخدامًا في الحياة اليومية، لكن من المفيد معرفتها.",
  },
];

// ⑩⑪ — نفس الشكل
export const SAME_FORM_18: Monster18[] = [
  {
    n: "⑩",
    sing: "sheep",
    plural: "sheep",
    singAr: "",
    pluralAr: "",
    note: "هنا شيء غريب!",
    ex1: "one sheep",
    ex2: "five sheep",
    wrong: "sheeps",
    wrongNote: "ولا نقول في المستوى الأساسي:",
  },
  {
    n: "⑪",
    sing: "fish",
    plural: "fish",
    singAr: "سمكة / سمك",
    pluralAr: "",
    note: "في الاستخدام الأساسي: fish = سمكة / سمك",
    ex1: "one fish",
    ex2: "five fish",
    wrong: "three fishs",
    wrongNote: "ولا نقول:",
  },
];

export const SAME_FORM_EXTRA_18 = {
  fishExample: "I can see three fish.",
  sheepExtra: [
    { count: "one", word: "sheep" },
    { count: "five", word: "sheep" },
    { count: "one", word: "fish" },
    { count: "two", word: "fish" },
  ],
};

export const SAME_FORM_EXTRA_JOINED_18 = ["one sheep", "five sheep", "one fish", "two fish", "five fish"];

// جدول الحفظ الذهبي
export const GOLDEN_TABLE_18 = {
  title: "جدول الحفظ الذهبي",
  head: "Singular → Plural",
  rows: [
    { sing: "man", plural: "men" },
    { sing: "woman", plural: "women" },
    { sing: "child", plural: "children" },
    { sing: "person", plural: "people" },
    { sing: "tooth", plural: "teeth" },
    { sing: "foot", plural: "feet" },
    { sing: "mouse", plural: "mice" },
    { sing: "goose", plural: "geese" },
    { sing: "ox", plural: "oxen" },
    { sing: "sheep", plural: "sheep" },
    { sing: "fish", plural: "fish" },
  ],
};

// -------------------- 7. احفظها كعائلات --------------------
export const FAMILIES_18 = {
  intro: "هذه طريقة IQ200 للحفظ.",
  insteadOf: "بدل أن تحفظ:",
  instead1: "child = طفل",
  instead2: "children = أطفال",
  memorize: "احفظ:",
  family: ["one child", "two children", "The child is...", "The children are..."],
  familyReveal: ["The child is happy.", "The children are happy."],
  result: "بهذه الطريقة ستتعلم الكلمة والجمع واتفاق الفعل في الوقت نفسه.",
};

// -------------------- 8. الجمع وعلاقته بـ IS / ARE --------------------
export const IS_ARE_18 = {
  intro: "هذه نقطة مهمة جدًا.",
  singularRule: "المفرد غالبًا:",
  singularVerb: "is",
  pluralRule: "الجمع:",
  pluralVerb: "are",
  exampleLabel: "مثال:",
  pairs: [
    { sing: "The boy is happy.", pl: "The boys are happy." },
    { sing: "The child is tired.", pl: "The children are tired." },
    { sing: "The woman is busy.", pl: "The women are busy." },
  ],
  noticeTitle: "لاحظ:",
  notices: [
    { en: "boy", ar: "مفرد" },
    { en: "is", ar: "مفرد" },
    { en: "boys", ar: "جمع" },
    { en: "are", ar: "جمع" },
  ],
  example2Label: "مثال آخر:",
  example3Label: "ومثال آخر:",
  errorTitle: "خطأ خطير",
  errorWrong: "The children is happy.",
  whyTitle: "لماذا؟",
  whyText: "children جمع.",
  so: "إذن:",
  errorCorrect: "The children are happy.",
};

// -------------------- 9. الجمع مع WAS / WERE --------------------
export const WAS_WERE_18 = {
  intro: "نفس الفكرة في الماضي.",
  singularRule: "المفرد:",
  singularVerb: "was",
  pluralRule: "الجمع:",
  pluralVerb: "were",
  exampleLabel: "مثال:",
  pairs: [
    { sing: "The child was tired.", pl: "The children were tired." },
    { sing: "The man was angry.", pl: "The men were angry." },
    { sing: "The woman was at home.", pl: "The women were at home." },
  ],
  quickRule: {
    title: "قاعدة سريعة",
    singular: "Singular:",
    singularVerbs: "is / was",
    plural: "Plural:",
    pluralVerbs: "are / were",
  },
};

// -------------------- 10. الجمع وعلاقته بـ Present Simple --------------------
export const PRESENT_18 = {
  intro: "وهنا نربط الدرس بكل ما تعلمناه سابقًا.",
  remember: "تذكر:",
  remember1: "في Present Simple:",
  rememberFormula1: "He / She / It → verb + s",
  but: "لكن الجمع:",
  rememberFormula2: "They → base verb",
  andApplies: "وهذا ينطبق على الأسماء أيضًا.",
  singular: {
    label: "مفرد:",
    sentence: "The boy plays football.",
    because: "لأن:",
    because1: "The boy = He",
    so: "إذن:",
    verb: "plays",
  },
  plural: {
    label: "جمع:",
    sentence: "The boys play football.",
    because: "لأن:",
    because1: "The boys = They",
    so: "إذن:",
    verb: "play",
    andNot: "وليس:",
    notVerb: "plays",
  },
  compareTitle: "قارن بعناية",
  compare: [
    { sing: "The girl works here.", pl: "The girls work here." },
    { sing: "The student studies English.", pl: "The students study English." },
    { sing: "The child plays outside.", pl: "The children play outside." },
  ],
  surpriseTitle: "لاحظ المفاجأة",
  surprise1: "children نفسها جمع شاذ.",
  surprise2: "لكن الفعل بعدها يتعامل معها كجمع عادي:",
  surprise3: "The children play.",
  andNot: "وليس:",
  surprise4: "The children plays.",
};

// -------------------- 11. أخطاء شائعة جدًا --------------------
export const COMMON_ERRORS_18: { n: string; label: string; wrong: string; correct: string; alt?: string; altLabel?: string }[] = [
  { n: "①", label: "الخطأ 1", wrong: "two book", correct: "two books" },
  { n: "②", label: "الخطأ 2", wrong: "a books", correct: "a book", alt: "books", altLabel: "أو:" },
  { n: "③", label: "الخطأ 3", wrong: "three childs", correct: "three children" },
  { n: "④", label: "الخطأ 4", wrong: "two womans", correct: "two women" },
  { n: "⑤", label: "الخطأ 5", wrong: "five tooths", correct: "five teeth" },
  { n: "⑥", label: "الخطأ 6", wrong: "The children is happy.", correct: "The children are happy." },
  { n: "⑦", label: "الخطأ 7", wrong: "The boys plays football.", correct: "The boys play football." },
  { n: "⑧", label: "الخطأ 8", wrong: "The men works here.", correct: "The men work here." },
];

// ============================================================
// التمارين 12–19 — الأسئلة والخيارات ومفاتيح الحل محفوظة كما في المصدر
// ============================================================

// -------------------- 12. Grammar Detective --------------------
export const DETECTIVE_18 = {
  intro1: "لديك الآن مهمة المحقق.",
  intro2: "كل جملة تحتوي على خطأ واحد.",
  intro3: "اكتشفه وأصلحه.",
  solutionLabel: "الحل",
  types: {
    plural: "خطأ في تكوين الجمع",
    verb: "خطأ في اتفاق الفعل",
    article: "خطأ في الأداة",
  },
  sentences: [
    { n: "①", wrong: "I have two book.", correct: "I have two books.", type: "plural" },
    { n: "②", wrong: "Three child are playing.", correct: "Three children are playing.", type: "plural" },
    { n: "③", wrong: "The womans are doctors.", correct: "The women are doctors.", type: "plural" },
    { n: "④", wrong: "The boys plays chess.", correct: "The boys play chess.", type: "verb" },
    { n: "⑤", wrong: "She has five tooths.", correct: "She has five teeth.", type: "plural" },
    { n: "⑥", wrong: "The men is outside.", correct: "The men are outside.", type: "verb" },
    { n: "⑦", wrong: "I can see two mouses.", correct: "I can see two mice.", type: "plural" },
    { n: "⑧", wrong: "There are three boxs.", correct: "There are three boxes.", type: "plural" },
  ],
};

// -------------------- 13. Challenge 1 — حوّل إلى جمع --------------------
export const CHALLENGE1_18: { n: string; word: string; answer: string; rule: string }[] = [
  { n: "①", word: "book", answer: "books", rule: "S" },
  { n: "②", word: "class", answer: "classes", rule: "ES" },
  { n: "③", word: "baby", answer: "babies", rule: "IES" },
  { n: "④", word: "toy", answer: "toys", rule: "S" },
  { n: "⑤", word: "knife", answer: "knives", rule: "F/FE → VES" },
  { n: "⑥", word: "child", answer: "children", rule: "IRREGULAR" },
  { n: "⑦", word: "woman", answer: "women", rule: "IRREGULAR" },
  { n: "⑧", word: "foot", answer: "feet", rule: "IRREGULAR" },
  { n: "⑨", word: "mouse", answer: "mice", rule: "IRREGULAR" },
  { n: "⑩", word: "sheep", answer: "sheep", rule: "NO CHANGE" },
];

export const CHALLENGE1_BANK_18 = [
  "books",
  "classes",
  "babies",
  "toys",
  "knives",
  "children",
  "women",
  "feet",
  "mice",
  "sheep",
];

// -------------------- 14. Challenge 2 — اختر الإجابة الصحيحة --------------------
export const CHALLENGE2_18: { n: string; stem: string; options: string[]; answer: number }[] = [
  { n: "①", stem: "one child / two ______", options: ["childs", "children", "childes"], answer: 1 },
  { n: "②", stem: "one woman / three ______", options: ["womans", "women", "womanes"], answer: 1 },
  { n: "③", stem: "one box / four ______", options: ["boxs", "boxes", "boxies"], answer: 1 },
  { n: "④", stem: "one city / two ______", options: ["citys", "cities", "cityes"], answer: 1 },
  { n: "⑤", stem: "one boy / three ______", options: ["boys", "boies", "boyes"], answer: 0 },
];

// -------------------- 15. Challenge 3 — is or are? --------------------
export const CHALLENGE3_18: { n: string; stem: string; answer: string }[] = [
  { n: "①", stem: "The child ___ happy.", answer: "is" },
  { n: "②", stem: "The children ___ happy.", answer: "are" },
  { n: "③", stem: "The man ___ tired.", answer: "is" },
  { n: "④", stem: "The men ___ tired.", answer: "are" },
  { n: "⑤", stem: "The women ___ busy.", answer: "are" },
  { n: "⑥", stem: "The woman ___ busy.", answer: "is" },
  { n: "⑦", stem: "The sheep ___ outside.", answer: "is" },
  { n: "⑧", stem: "The boys ___ ready.", answer: "are" },
];

// -------------------- 16. IQ200 Challenge --------------------
export const IQ200_18 = {
  intro1: "هنا لا أريد منك النظر إلى الكلمة فقط.",
  intro2: "انظر إلى معنى الجملة.",
  task: "صحح الجمل:",
  sentences: [
    { n: "①", wrong: "The children plays in the garden.", correct: "The children play in the garden." },
    { n: "②", wrong: "The child play in the garden.", correct: "The child plays in the garden." },
    { n: "③", wrong: "The men is very strong.", correct: "The men are very strong." },
    { n: "④", wrong: "The woman are doctors.", correct: "The woman is a doctor." },
    { n: "⑤", wrong: "Two mouse are under the table.", correct: "Two mice are under the table." },
    { n: "⑥", wrong: "A children is waiting outside.", correct: "A child is waiting outside." },
    { n: "⑦", wrong: "Three person are talking.", correct: "Three people are talking." },
    { n: "⑧", wrong: "The boys studies English.", correct: "The boys study English." },
  ],
};

// -------------------- 17. IQ200 — لماذا؟ --------------------
export const IQ200_WHY_18 = {
  sentence1: "The children play football.",
  question1: "لماذا play وليس plays؟",
  chain1: ["children = plural", "plural = they", "They play."],
  so: "إذن:",
  result1: "The children play.",
  sentence2: "The child plays football.",
  chain2: ["child = singular", "singular = he/she/it", "He plays."],
  result2: "The child plays.",
  fire: "هذه ليست مجرد قاعدة جمع.",
  connect: "أنت الآن تربط بين:",
  links: ["Singular → Plural", "Singular → verb + s", "Plural → base verb"],
};

// -------------------- 18. FINAL BOSS — تحدي المرحلة --------------------
export const FINAL_BOSS_18 = {
  readLabel: "اقرأ الفقرة:",
  passage:
    "Yesterday, a child walked into a park. He saw two mice near some trees. A woman was sitting on a bench, and three children were playing nearby. The children had two balls and the woman had a small box.",
  answerLabel: "الآن أجب:",
  targets: [
    { word: "child", kind: "Singular", rule: "Irregular" },
    { word: "mice", kind: "Plural", rule: "Irregular" },
    { word: "woman", kind: "Singular", rule: "Irregular" },
    { word: "children", kind: "Plural", rule: "Irregular" },
    { word: "balls", kind: "Plural", rule: "Regular" },
    { word: "box", kind: "Singular", rule: "Regular" },
  ],
  questions: [
    { n: "①", q: "ما جمع child؟", a: "child → children — جمع شاذ." },
    { n: "②", q: "ما جمع mouse؟", a: "mouse → mice — جمع شاذ." },
    { n: "③", q: "لماذا استخدمنا were مع children؟", a: "لأن children جمع، والجمع يأخذ were في الماضي." },
    { n: "④", q: "لماذا استخدمنا was مع woman؟", a: "لأن woman مفرد، والمفرد يأخذ was في الماضي." },
    { n: "⑤", q: "ما جمع ball؟", a: "ball → balls — جمع عادي (Noun + s)." },
    { n: "⑥", q: "ما جمع box؟", a: "box → boxes — تنتهي بـ x فنضيف ES." },
    { n: "⑦", q: "هل children كلمة جمع عادي أم شاذ؟", a: "children جمع شاذ (Irregular) — لا يُشكَّل بإضافة s." },
    {
      n: "⑧",
      q: "لماذا نقول: The children were playing. وليس: The children was playing.",
      a: "لأن children جمع ← were للجمع و was للمفرد.",
    },
  ],
};

// -------------------- 19. Mini Game — Singular or Plural? --------------------
export const MINI_GAME_18 = {
  instruction: "اكتب أمام كل كلمة:",
  sLabel: "S = Singular",
  pLabel: "P = Plural",
  words: [
    { n: "①", word: "child", kind: "S" },
    { n: "②", word: "children", kind: "P" },
    { n: "③", word: "woman", kind: "S" },
    { n: "④", word: "women", kind: "P" },
    { n: "⑤", word: "mouse", kind: "S" },
    { n: "⑥", word: "mice", kind: "P" },
    { n: "⑦", word: "book", kind: "S" },
    { n: "⑧", word: "books", kind: "P" },
    { n: "⑨", word: "sheep", kind: "S" },
    { n: "⑩", word: "men", kind: "P" },
    { n: "⑪", word: "person", kind: "S" },
    { n: "⑫", word: "people", kind: "P" },
  ],
  sheepNote: "sheep = نفس الشكل للمفرد والجمع — S أو P كلاهما مقبول!",
};

// ============================================================
// الخاتمة — الخلاصة + القاعدة + الخريطة
// ============================================================

// -------------------- خلاصة الدرس --------------------
export const SUMMARY_18 = {
  intro: "اليوم تعلمنا أن الجمع ليس قاعدة واحدة فقط.",
  items: [
    {
      n: "①",
      title: "الجمع العادي",
      examples: ["book → books", "car → cars"],
    },
    {
      n: "②",
      title: "إضافة ES",
      examples: ["box → boxes", "watch → watches", "dish → dishes"],
    },
    {
      n: "③",
      title: "Y → IES",
      examples: ["baby → babies", "city → cities"],
      but: "لكن:",
      butExamples: ["boy → boys", "toy → toys"],
    },
    {
      n: "④",
      title: "بعض F / FE → VES",
      examples: ["knife → knives", "life → lives", "leaf → leaves"],
      note: "مع وجود استثناءات.",
    },
    {
      n: "⑤",
      title: "الجمع الشاذ",
      examples: [
        "man → men",
        "woman → women",
        "child → children",
        "person → people",
        "tooth → teeth",
        "foot → feet",
        "mouse → mice",
        "goose → geese",
        "ox → oxen",
      ],
    },
    {
      n: "⑥",
      title: "كلمات لا تتغير",
      examples: ["sheep → sheep", "fish → fish"],
    },
  ],
};

// -------------------- 🧠 أهم قاعدة يجب أن تخرج بها اليوم --------------------
export const KEY_RULE_18 = {
  title: "أهم قاعدة يجب أن تخرج بها اليوم",
  dontThink: "لا تفكر:",
  dont: "الجمع = أضيف S.",
  think: "فكر:",
  correct: "أولًا أحدد نوع الكلمة.",
  then: "ثم:",
  regular: { q: "Regular?", a: "s / es / ies حسب القاعدة." },
  irregular: { q: "Irregular?", a: "أحفظ شكل الجمع." },
};

// -------------------- 🗺️ أين وصلنا في المنهج؟ --------------------
export const ROADMAP_18: { n: number; en: string; here?: boolean }[] = [
  { n: 1, en: "Sentence Structure" },
  { n: 2, en: "Pronouns" },
  { n: 3, en: "Verb to be" },
  { n: 4, en: "Nouns + Articles" },
  { n: 5, en: "Adjectives" },
  { n: 6, en: "Present Simple" },
  { n: 7, en: "Present Simple Negative & Questions" },
  { n: 8, en: "Present Simple Review" },
  { n: 9, en: "Present Continuous" },
  { n: 10, en: "Present Continuous Advanced" },
  { n: 11, en: "Present Simple vs Present Continuous" },
  { n: 12, en: "Past Simple" },
  { n: 13, en: "Past Simple Negative & Questions" },
  { n: 14, en: "Past Simple Wh Questions" },
  { n: 15, en: "Was / Were" },
  { n: 16, en: "Possessive Adjectives" },
  { n: 17, en: "Possessive Pronouns" },
  { n: 18, en: "Plural Nouns — أنت هنا", here: true },
];

export const ROADMAP_18_CLOSING =
  "والخطوة المنطقية التالية هي الدخول أعمق في **Possessive Nouns** نفسها، أي كيف نقول:\n\nAli's book\nSara's phone\nthe boy's bicycle\nthe boys' bicycles\nthe child's toy\nthe children's toys\n\nوهنا سنربط **الجمع + الملكية** معًا بطريقة مهمة جدًا، خصوصًا الفرق بين:\n\nboy's\nboys'\nchild's\nchildren's\n\nوهذه نقطة يقع فيها حتى كثير من المتعلمين المتقدمين.";

// ============================================================
// مختبرات الدرس — بيانات الأنظمة التفاعلية
// ============================================================

/** الآلة الرئيسية: Singular → Plural — ماذا تغيّر؟ */
export const TRANSFORM_MACHINE_18: {
  sing: string;
  plural: string;
  root: string;
  suffix: string;
  change: string;
  rule: string;
  reason: string;
}[] = [
  {
    sing: "book",
    plural: "books",
    root: "book",
    suffix: "s",
    change: "+ S",
    rule: "S",
    reason: "القاعدة الأساسية: Noun + s.",
  },
  {
    sing: "box",
    plural: "boxes",
    root: "box",
    suffix: "es",
    change: "+ ES",
    rule: "ES",
    reason: "تنتهي بـ x ← نضيف ES (boxs ❌).",
  },
  {
    sing: "baby",
    plural: "babies",
    root: "bab",
    suffix: "ies",
    change: "y → ies",
    rule: "IES",
    reason: "b حرف ساكن قبل y ← نحوّل y إلى ies.",
  },
  {
    sing: "knife",
    plural: "knives",
    root: "kni",
    suffix: "ves",
    change: "fe → ves",
    rule: "F/FE → VES",
    reason: "من الكلمات المشهورة التي تتحول فيها fe إلى ves.",
  },
  {
    sing: "child",
    plural: "children",
    root: "children",
    suffix: "",
    change: "تتغير الكلمة كلها",
    rule: "IRREGULAR",
    reason: "جمع شاذ — لا توجد قاعدة، نحفظ شكله.",
  },
  {
    sing: "sheep",
    plural: "sheep",
    root: "sheep",
    suffix: "",
    change: "لا تغيير",
    rule: "NO CHANGE",
    reason: "المفرد والجمع بنفس الشكل.",
  },
];

/** كاشف قاعدة الجمع */
export const RULE_DETECT_18: { word: string; rule: string; why: string }[] = [
  { word: "book", rule: "S", why: "Noun + s ← book + s = books." },
  { word: "box", rule: "ES", why: "تنتهي بـ x ← box + es = boxes." },
  { word: "baby", rule: "IES", why: "b حرف ساكن قبل y ← y → ies: babies." },
  { word: "boy", rule: "S", why: "o حرف علة قبل y ← y تبقى + s: boys." },
  { word: "knife", rule: "F/FE → VES", why: "من كلمات f/fe المشهورة: knife → knives." },
  { word: "child", rule: "IRREGULAR", why: "child → children — جمع شاذ." },
  { word: "sheep", rule: "NO CHANGE", why: "sheep = sheep — نفس الشكل للمفرد والجمع." },
  { word: "woman", rule: "IRREGULAR", why: "woman → women — جمع شاذ." },
  { word: "watch", rule: "ES", why: "تنتهي بـ ch ← watch + es = watches." },
  { word: "fish", rule: "NO CHANGE", why: "في الاستخدام الأساسي: fish = fish." },
];

export const RULE_DETECT_OPTIONS_18 = [
  "S",
  "ES",
  "IES",
  "F/FE → VES",
  "IRREGULAR",
  "NO CHANGE",
];

// ============================================================
// أنواع الكتل والشرائح
// ============================================================

export type Block18 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: "neutral" | "good" | "bad" | "focus" | "warn" }
  | { type: "mixed"; text: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "formulaStrip"; items: string[] }
  | { type: "mixedStrip"; items: string[] }
  | { type: "arrowChain"; items: string[] }
  | { type: "singPluralBoard" }
  | { type: "aAnBoard" }
  | { type: "regularBoard" }
  | { type: "ruleDetector" }
  | { type: "transformMachine" }
  | { type: "esBoard" }
  | { type: "sesiesLab" }
  | { type: "yBoard" }
  | { type: "yMachine" }
  | { type: "yMiniChallenge" }
  | { type: "feBoard" }
  | { type: "feCautionLab" }
  | { type: "monsterBoard" }
  | { type: "sameFormBoard" }
  | { type: "goldenTable" }
  | { type: "familyBoard" }
  | { type: "isAreBoard" }
  | { type: "wasWereBoard" }
  | { type: "presentSimpleBoard" }
  | { type: "errorsBoard" };

export type Exercise18 =
  | { type: "detective" }
  | { type: "challenge1" }
  | { type: "challenge2" }
  | { type: "challenge3" }
  | { type: "iq200" }
  | { type: "iq200why" }
  | { type: "finalBoss" }
  | { type: "miniGame" };

export type Slide18 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block18[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise18 }
  | { kind: "summary"; title: string }
  | { kind: "keyRule"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const NUMBER = "المفرد ← الجمع";
const RULES = "قواعد الجمع العادي";
const MONSTERS = "الوحوش: الجمع الشاذ";
const AGREEMENT = "العائلات واتفاق الفعل";
const HUNT = "مهمة المحقق";
const CHALLENGES = "التحديات والألعاب";
const END = "الخاتمة";

export const SLIDES: Slide18[] = [
  { kind: "cover", section: START, mascot: "🔢" },
  { kind: "objectives", section: START, mascot: "🎯" },

  // 1 — ما معنى Singular و Plural؟
  {
    kind: "lesson",
    section: NUMBER,
    mascot: "🧠",
    step: "1",
    title: "ما معنى Singular و Plural؟",
    blocks: [
      { type: "mixed", text: "Singular = مفرد" },
      { type: "text", text: "يعني شيء واحد فقط." },
      { type: "mixed", text: "Plural = جمع" },
      { type: "text", text: "يعني أكثر من شيء واحد." },
      { type: "singPluralBoard" },
      { type: "note", emoji: "⭐", text: "القاعدة الذهبية الأولى" },
      { type: "aAnBoard" },
    ],
  },

  // 2 — الجمع العادي Regular Plural
  {
    kind: "lesson",
    section: NUMBER,
    mascot: "🧠",
    step: "2",
    title: "الجمع العادي Regular Plural",
    lead: REGULAR_18.intro,
    blocks: [
      { type: "formulaStrip", items: [REGULAR_18.formula] },
      { type: "regularBoard" },
      { type: "note", emoji: "🚀", text: "أمثلة جديدة" },
      { type: "formulaStrip", items: REGULAR_18.newExamples.map((e) => `${e.sing} → ${e.plural}`) },
      { type: "note", emoji: "🎯", text: "جرب أن تلاحظ النمط" },
      { type: "arrowChain", items: REGULAR_18.pattern.map((p) => `${p.count} ${p.word}`) },
      { type: "mixed", text: "واحد → اسم مفرد" },
      { type: "mixed", text: "أكثر من واحد → غالبًا نضيف S." },
      { type: "transformMachine" },
    ],
  },

  // 3 — متى نضيف ES بدل S؟
  {
    kind: "lesson",
    section: RULES,
    mascot: "🧠",
    step: "3",
    title: "متى نضيف ES بدل S؟",
    lead: ES_18.intro,
    blocks: [
      { type: "text", text: ES_18.intro2 },
      { type: "formulaStrip", items: ES_18.sounds },
      { type: "mixed", text: "وأحيانًا o" },
      { type: "text", text: ES_18.use },
      { type: "formulaStrip", items: [ES_18.formula] },
      { type: "esBoard" },
      { type: "note", emoji: "🔍", text: "لماذا؟" },
      { type: "mixed", text: "لأن: box + s" },
      { type: "text", text: ES_18.why3 },
      { type: "english", en: "boxs ❌", tone: "bad" },
      { type: "text", text: ES_18.why5 },
      { type: "text", text: ES_18.why6 },
      { type: "english", en: "box → boxes ✅", tone: "good" },
      { type: "note", emoji: "⭐", text: "أمثلة مهمة" },
      { type: "formulaStrip", items: ES_18.important.map((e) => `${e.sing} → ${e.plural}`) },
      { type: "sesiesLab" },
    ],
  },

  // 4 — الكلمات التي تنتهي بـ Y
  {
    kind: "lesson",
    section: RULES,
    mascot: "🧠",
    step: "4",
    title: "الكلمات التي تنتهي بـ Y",
    lead: Y_RULE_18.intro,
    blocks: [
      { type: "text", text: Y_RULE_18.intro2 },
      { type: "text", text: Y_RULE_18.intro3 },
      { type: "yBoard" },
      { type: "note", emoji: "🧠", text: "قارن!" },
      { type: "yMachine" },
      { type: "yMiniChallenge" },
    ],
  },

  // 5 — بعض الكلمات التي تنتهي بـ F أو FE
  {
    kind: "lesson",
    section: RULES,
    mascot: "🧠",
    step: "5",
    title: "بعض الكلمات التي تنتهي بـ F أو FE",
    lead: FE_RULE_18.intro,
    blocks: [
      { type: "formulaStrip", items: [FE_RULE_18.formula] },
      { type: "text", text: FE_RULE_18.famousLabel },
      { type: "feBoard" },
      { type: "note", emoji: "⚠️", text: "لكن انتبه! هذه ليست قاعدة تنطبق على جميع الكلمات التي تنتهي بـ f أو fe." },
      { type: "text", text: FE_RULE_18.forExample },
      { type: "formulaStrip", items: FE_RULE_18.exceptions.map((e) => `${e.sing} → ${e.plural}`) },
      { type: "text", text: FE_RULE_18.dontMemorize },
      { type: "mixed", text: "«كل F تصبح VES»" },
      { type: "text", text: FE_RULE_18.butMemorize },
      { type: "feCautionLab" },
    ],
  },

  // 6 — الوحوش الحقيقية: Irregular Plurals
  {
    kind: "lesson",
    section: MONSTERS,
    mascot: "😈",
    step: "6",
    title: "الوحوش الحقيقية — Irregular Plurals",
    lead: "الآن نصل إلى الوحوش الحقيقية 😈",
    blocks: [
      { type: "text", text: IRREGULAR_INTRO_18.no1 },
      { type: "formulaStrip", items: IRREGULAR_INTRO_18.noList },
      { type: "text", text: IRREGULAR_INTRO_18.no2 },
      { type: "text", text: IRREGULAR_INTRO_18.no3 },
      { type: "english", en: "Irregular Plurals", tone: "focus", ar: "الجمع الشاذ" },
      { type: "note", emoji: "👑", text: "أهم الأسماء الشاذة" },
      { type: "monsterBoard" },
      { type: "sameFormBoard" },
      { type: "goldenTable" },
      { type: "ruleDetector" },
    ],
  },

  // 7 — احفظها كعائلات
  {
    kind: "lesson",
    section: AGREEMENT,
    mascot: "🔥",
    step: "7",
    title: "لا تحفظ الكلمات منفصلة... احفظها كعائلات",
    lead: FAMILIES_18.intro,
    blocks: [
      { type: "text", text: FAMILIES_18.insteadOf },
      { type: "mixed", text: "child = طفل" },
      { type: "mixed", text: "children = أطفال" },
      { type: "text", text: FAMILIES_18.memorize },
      { type: "familyBoard" },
      { type: "note", emoji: "🧠", text: FAMILIES_18.result },
    ],
  },

  // 8 — الجمع وعلاقته بـ IS / ARE
  {
    kind: "lesson",
    section: AGREEMENT,
    mascot: "🧠",
    step: "8",
    title: "الجمع وعلاقته بـ IS / ARE",
    lead: IS_ARE_18.intro,
    blocks: [
      { type: "mixed", text: "المفرد غالبًا: is" },
      { type: "mixed", text: "الجمع: are" },
      { type: "isAreBoard" },
      { type: "text", text: IS_ARE_18.noticeTitle },
      { type: "mixedStrip", items: IS_ARE_18.notices.map((n) => `${n.en} = ${n.ar}`) },
      { type: "note", emoji: "🚨", text: "خطأ خطير" },
      { type: "english", en: IS_ARE_18.errorWrong + " ❌", tone: "bad" },
      { type: "text", text: IS_ARE_18.whyTitle },
      { type: "mixed", text: "children جمع." },
      { type: "text", text: IS_ARE_18.so },
      { type: "english", en: IS_ARE_18.errorCorrect + " ✅", tone: "good" },
    ],
  },

  // 9 — الجمع مع WAS / WERE
  {
    kind: "lesson",
    section: AGREEMENT,
    mascot: "🧠",
    step: "9",
    title: "الجمع مع WAS / WERE",
    lead: WAS_WERE_18.intro,
    blocks: [
      { type: "mixed", text: "المفرد: was" },
      { type: "mixed", text: "الجمع: were" },
      { type: "wasWereBoard" },
      { type: "note", emoji: "⭐", text: "قاعدة سريعة" },
      { type: "mixedStrip", items: ["Singular: is / was", "Plural: are / were"] },
    ],
  },

  // 10 — الجمع وعلاقته بـ Present Simple
  {
    kind: "lesson",
    section: AGREEMENT,
    mascot: "🧠",
    step: "10",
    title: "الجمع وعلاقته بـ Present Simple",
    lead: PRESENT_18.intro,
    blocks: [
      { type: "text", text: PRESENT_18.remember },
      { type: "mixed", text: "في Present Simple:" },
      { type: "formulaStrip", items: [PRESENT_18.rememberFormula1, PRESENT_18.rememberFormula2] },
      { type: "text", text: PRESENT_18.andApplies },
      { type: "presentSimpleBoard" },
      { type: "note", emoji: "🔥", text: "قارن بعناية" },
      { type: "formulaStrip", items: PRESENT_18.compare.flatMap((c) => [c.sing + " ✅", c.pl + " ✅"]) },
      { type: "note", emoji: "🧠", text: "لاحظ المفاجأة" },
      { type: "text", text: PRESENT_18.surprise1 },
      { type: "text", text: PRESENT_18.surprise2 },
      { type: "english", en: PRESENT_18.surprise3 + " ✅", tone: "good" },
      { type: "text", text: PRESENT_18.andNot },
      { type: "english", en: PRESENT_18.surprise4 + " ❌", tone: "bad" },
    ],
  },

  // 11 — أخطاء شائعة جدًا
  {
    kind: "lesson",
    section: AGREEMENT,
    mascot: "🚨",
    step: "11",
    title: "أخطاء شائعة جدًا",
    blocks: [
      { type: "errorsBoard" },
      { type: "transformMachine" },
    ],
  },

  // 12 — Grammar Detective
  {
    kind: "ex",
    section: HUNT,
    mascot: "🕵️",
    badge: "12",
    title: "Grammar Detective",
    subtitle: "لديك الآن مهمة المحقق — كل جملة تحتوي على خطأ واحد. اكتشفه وأصلحه.",
    ex: { type: "detective" },
  },

  // 13 — Challenge 1
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🧩",
    badge: "13",
    title: "Challenge 1 — حوّل إلى جمع",
    subtitle: "حوّل الكلمات:",
    ex: { type: "challenge1" },
  },

  // 14 — Challenge 2
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🧩",
    badge: "14",
    title: "Challenge 2 — اختر الإجابة الصحيحة",
    subtitle: "اختر الإجابة الصحيحة:",
    ex: { type: "challenge2" },
  },

  // 15 — Challenge 3
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🧠",
    badge: "15",
    title: "Challenge 3 — is or are?",
    subtitle: "أكمل بـ is أو are:",
    ex: { type: "challenge3" },
  },

  // 16 — IQ200 Challenge
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🚀",
    badge: "16",
    title: "IQ200 Challenge",
    subtitle: "هنا لا أريد منك النظر إلى الكلمة فقط — انظر إلى معنى الجملة. صحح الجمل:",
    ex: { type: "iq200" },
  },

  // 17 — IQ200 — لماذا؟
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🧠",
    badge: "17",
    title: "IQ200 — لماذا؟",
    subtitle: "الهدف هو الفهم، وليس الحفظ:",
    ex: { type: "iq200why" },
  },

  // 18 — FINAL BOSS
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🏆",
    badge: "18",
    title: "FINAL BOSS — تحدي المرحلة",
    subtitle: "اقرأ الفقرة، ثم أجرِ التحقيق وأجب:",
    ex: { type: "finalBoss" },
  },

  // 19 — Mini Game
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🎮",
    badge: "19",
    title: "Mini Game — Singular or Plural?",
    subtitle: "لعبة سريعة: اكتب أمام كل كلمة S أو P:",
    ex: { type: "miniGame" },
  },

  { kind: "summary", section: END, mascot: "🧠", title: "خلاصة الدرس" },
  { kind: "keyRule", section: END, mascot: "⭐", title: "أهم قاعدة يجب أن تخرج بها اليوم" },
  { kind: "roadmap", section: END, mascot: "🗺️", title: "أين وصلنا في المنهج؟" },
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي — الدرس 18" },
  { kind: "closing", section: END, mascot: "🔢", title: "أحسنت!" },
];

// ============================================================
// SOURCE_FIDELITY_MARKERS_18 — فهرس كامل لكل عنصر في المصدر
// يُستخدم للتحقق الآلي من أن أي قسم/مثال/تمرين/مفتاح حل لم يُحذف.
// ============================================================
export const SOURCE_FIDELITY_MARKERS_18: string[] = [
  ...SOURCE_SECTIONS,
  LESSON_TITLE_18,
  LESSON_SUBTITLE_18,
  COVER_INTRO_18,
  ...COVER_LINKS_18,
  ...OBJECTIVES_18.flatMap((o) => [o.text, ...(o.items ?? [])]),
  SINGULAR_PLURAL_18.singular.eq,
  SINGULAR_PLURAL_18.singular.note,
  ...SINGULAR_PLURAL_18.singular.words.flatMap((w) => [w.en, w.ar]),
  SINGULAR_PLURAL_18.singular.example,
  SINGULAR_PLURAL_18.singular.exampleAr,
  SINGULAR_PLURAL_18.plural.eq,
  SINGULAR_PLURAL_18.plural.note,
  ...SINGULAR_PLURAL_18.plural.words.flatMap((w) => [w.en, w.ar]),
  SINGULAR_PLURAL_18.plural.example,
  SINGULAR_PLURAL_18.plural.exampleAr,
  A_AN_RULE_18.title,
  A_AN_RULE_18.rule,
  A_AN_RULE_18.use,
  ...A_AN_RULE_18.examples,
  A_AN_RULE_18.but,
  A_AN_RULE_18.but2,
  ...A_AN_RULE_18.checks.map((c) => c.en),
  REGULAR_18.intro,
  REGULAR_18.formula,
  ...REGULAR_18.examples.flatMap((e) => [e.sing, e.plural]),
  ...REGULAR_JOINED_18,
  REGULAR_18.newLabel,
  ...REGULAR_18.newExamples.flatMap((e) => [e.sing, e.plural]),
  ...REGULAR_NEW_JOINED_18,
  REGULAR_18.patternLabel,
  ...REGULAR_18.pattern.map((p) => `${p.count} ${p.word}`),
  REGULAR_18.patternNote1,
  REGULAR_18.patternNote2,
  ES_18.intro,
  ES_18.intro2,
  ...ES_18.sounds,
  ES_18.andSometimes,
  ES_18.use,
  ES_18.formula,
  ...ES_18.examples.flatMap((e) => [e.sing, e.plural]),
  ES_18.whyTitle,
  ES_18.why2,
  ES_18.why4,
  ES_18.why5,
  ES_18.why7,
  ES_18.importantTitle,
  ...ES_18.important.flatMap((e) => [e.sing, e.plural]),
  ...ES_JOINED_18,
  Y_RULE_18.intro,
  Y_RULE_18.intro2,
  Y_RULE_18.intro3,
  Y_RULE_18.case1.title,
  Y_RULE_18.case1.rule,
  Y_RULE_18.case1.formula,
  ...Y_RULE_18.case1.examples.flatMap((e) => [e.sing, e.plural]),
  Y_RULE_18.case1.howTitle,
  Y_RULE_18.case1.howWord,
  Y_RULE_18.case1.howLetter,
  Y_RULE_18.case1.howNote,
  Y_RULE_18.case1.howResult,
  Y_RULE_18.case2.title,
  Y_RULE_18.case2.rule,
  ...Y_RULE_18.case2.vowels,
  Y_RULE_18.case2.action,
  ...Y_RULE_18.case2.examples.flatMap((e) => [e.sing, e.plural]),
  Y_RULE_18.compareTitle,
  ...Y_RULE_18.compare.flatMap((c) => [c.word, c.result, c.before, c.note, c.rule]),
  Y_RULE_18.miniTitle,
  ...Y_RULE_18.mini.flatMap((m) => [m.question, ...m.options, m.answerText, m.why]),
  ...Y_CASE1_JOINED_18,
  ...Y_CASE2_JOINED_18,
  FE_RULE_18.intro,
  FE_RULE_18.formula,
  FE_RULE_18.famousLabel,
  ...FE_RULE_18.famous.flatMap((e) => [e.sing, e.plural]),
  FE_RULE_18.warning,
  FE_RULE_18.forExample,
  ...FE_RULE_18.exceptions.flatMap((e) => [e.sing, e.plural]),
  ...FE_FAMOUS_JOINED_18,
  ...FE_EXCEPTION_JOINED_18,
  FE_RULE_18.dontMemorize,
  FE_RULE_18.dontFormula,
  FE_RULE_18.butMemorize,
  IRREGULAR_INTRO_18.no1,
  ...IRREGULAR_INTRO_18.noList,
  IRREGULAR_INTRO_18.no2,
  IRREGULAR_INTRO_18.no3,
  IRREGULAR_INTRO_18.name,
  IRREGULAR_INTRO_18.nameAr,
  ...MONSTERS_18.flatMap((m) => [
    m.sing,
    m.plural,
    m.singAr,
    m.pluralAr,
    ...(m.ex1 ? [m.ex1] : []),
    ...(m.ex2 ? [m.ex2] : []),
    ...(m.wrong ? [m.wrong] : []),
    ...(m.correct ? [m.correct] : []),
    ...(m.note ? [m.note] : []),
  ]),
  ...SAME_FORM_18.flatMap((m) => [
    m.sing,
    m.plural,
    ...(m.ex1 ? [m.ex1] : []),
    ...(m.ex2 ? [m.ex2] : []),
    ...(m.wrong ? [m.wrong] : []),
  ]),
  SAME_FORM_EXTRA_18.fishExample,
  ...SAME_FORM_EXTRA_JOINED_18,
  GOLDEN_TABLE_18.head,
  ...GOLDEN_TABLE_18.rows.flatMap((r) => [r.sing, r.plural]),
  FAMILIES_18.intro,
  FAMILIES_18.instead1,
  FAMILIES_18.instead2,
  ...FAMILIES_18.family,
  ...FAMILIES_18.familyReveal,
  FAMILIES_18.result,
  IS_ARE_18.singularVerb,
  IS_ARE_18.pluralVerb,
  ...IS_ARE_18.pairs.flatMap((p) => [p.sing, p.pl]),
  ...IS_ARE_18.notices.flatMap((n) => [n.en, n.ar]),
  IS_ARE_18.errorWrong,
  IS_ARE_18.errorCorrect,
  WAS_WERE_18.singularVerb,
  WAS_WERE_18.pluralVerb,
  ...WAS_WERE_18.pairs.flatMap((p) => [p.sing, p.pl]),
  WAS_WERE_18.quickRule.singularVerbs,
  WAS_WERE_18.quickRule.pluralVerbs,
  PRESENT_18.rememberFormula1,
  PRESENT_18.rememberFormula2,
  PRESENT_18.singular.sentence,
  PRESENT_18.singular.because1,
  PRESENT_18.singular.verb,
  PRESENT_18.plural.sentence,
  PRESENT_18.plural.because1,
  PRESENT_18.plural.verb,
  PRESENT_18.plural.notVerb,
  ...PRESENT_18.compare.flatMap((c) => [c.sing, c.pl]),
  PRESENT_18.surprise1,
  PRESENT_18.surprise3,
  PRESENT_18.surprise4,
  ...COMMON_ERRORS_18.flatMap((e) => [e.wrong, e.correct, ...(e.alt ? [e.alt] : [])]),
  DETECTIVE_18.intro1,
  DETECTIVE_18.intro2,
  DETECTIVE_18.intro3,
  ...DETECTIVE_18.sentences.flatMap((s) => [s.wrong, s.correct]),
  ...CHALLENGE1_18.flatMap((c) => [c.word, c.answer]),
  ...CHALLENGE2_18.flatMap((c) => [c.stem, ...c.options]),
  ...CHALLENGE3_18.flatMap((c) => [c.stem, c.answer]),
  IQ200_18.intro1,
  IQ200_18.intro2,
  IQ200_18.task,
  ...IQ200_18.sentences.flatMap((s) => [s.wrong, s.correct]),
  IQ200_WHY_18.sentence1,
  IQ200_WHY_18.question1,
  ...IQ200_WHY_18.chain1,
  IQ200_WHY_18.result1,
  IQ200_WHY_18.sentence2,
  ...IQ200_WHY_18.chain2,
  IQ200_WHY_18.result2,
  IQ200_WHY_18.fire,
  IQ200_WHY_18.connect,
  ...IQ200_WHY_18.links,
  FINAL_BOSS_18.passage,
  ...FINAL_BOSS_18.targets.map((t) => t.word),
  ...FINAL_BOSS_18.questions.flatMap((q) => [q.q, q.a]),
  MINI_GAME_18.sLabel,
  MINI_GAME_18.pLabel,
  ...MINI_GAME_18.words.map((w) => w.word),
  SUMMARY_18.intro,
  ...SUMMARY_18.items.flatMap((i) => [i.title, ...i.examples, ...(i.butExamples ?? []), ...(i.note ? [i.note] : [])]),
  KEY_RULE_18.dont,
  KEY_RULE_18.correct,
  KEY_RULE_18.regular.q,
  KEY_RULE_18.regular.a,
  KEY_RULE_18.irregular.q,
  KEY_RULE_18.irregular.a,
  ...ROADMAP_18.map((r) => r.en),
  ROADMAP_18_CLOSING,
];

/** الأخطاء المقصودة في المصدر — تبقى كما هي للتدريب عليها. */
export const INTENTIONALLY_WRONG_18: string[] = [
  "a books ❌",
  "an apples ❌",
  "boxs ❌",
  "childs",
  "persons",
  "sheeps ❌",
  "three fishs ❌",
  "The children is happy.",
  "The children plays.",
  "two book",
  "a books",
  "three childs",
  "two womans",
  "five tooths",
  "The boys plays football.",
  "The men works here.",
  "I have two book.",
  "Three child are playing.",
  "The womans are doctors.",
  "The boys plays chess.",
  "She has five tooths.",
  "The men is outside.",
  "I can see two mouses.",
  "There are three boxs.",
  "childs",
  "childes",
  "womans",
  "womanes",
  "boxs",
  "boxies",
  "citys",
  "cityes",
  "toies",
  "boies",
  "boyes",
  "The children plays in the garden.",
  "The child play in the garden.",
  "The men is very strong.",
  "The woman are doctors.",
  "Two mouse are under the table.",
  "A children is waiting outside.",
  "Three person are talking.",
  "The boys studies English.",
];
