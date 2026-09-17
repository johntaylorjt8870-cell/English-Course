// ============================================================
// الدرس 19 — Possessive Nouns — ملكية الأسماء
// المصدر الكامل محفوظ حرفيًا — لا تلخيص ولا إعادة صياغة ولا حذف أقسام.
// العنوان: الدرس 19: Possessive Nouns — ملكية الأسماء: 's و s' و الجمع الشاذ
//
// ملاحظة اتجاه: كل وحدة إنجليزية داخل هذا الملف نص خام يُعرض دائمًا
// داخل عازل LTR (dir="ltr") — ولا يُقسَّم إلى كلمات منفصلة أبدًا.
// ============================================================

// -------------------- الفهارس والعناوين (تحقق تغطية المصدر) --------------------
export const SOURCE_SECTIONS: string[] = [
  "🎯 أهداف الدرس",
  "🧠 1. ما معنى Possessive Noun؟",
  "🧠 2. كيف نفكر في 's؟",
  "🧠 3. الاسم المفرد + 's",
  "🧠 4. ماذا لو كان عندنا أكثر من شخص؟",
  "🧠 5. لا تنظر إلى العلامة فقط!",
  "🧠 6. ماذا يحدث مع الجمع الشاذ؟",
  "🧠 7. الرجل والرجال",
  "🧠 8. المرأة والنساء",
  "🧠 9. الشخص والأشخاص",
  "🧠 10. الأسنان والقدم",
  "🎮 نظام القواعد الكامل",
  "🧠 11. الملكية لا تعني دائمًا \"امتلاك\"",
  "🧠 12. Possessive Noun vs Possessive Adjective",
  "🧠 13. النظام الثلاثي للملكية",
  "🚨 14. انتبه: apostrophe ليست جمعًا!",
  "🕵️ Grammar Detective",
  "🧩 Challenge 1 — اختر الصحيح",
  "🧩 Challenge 2 — حوّل إلى Possessive",
  "🚀 IQ200 Challenge",
  "🧠 IQ200 — لغز المعنى",
  "🏆 FINAL BOSS",
  "🎯 اختبار السرعة",
  "🧠 الخلاصة الكبرى",
  "🔥 قاعدة IQ200 النهائية",
  "🗺️ خريطة المنهج حتى الآن",
];

/** عدد أقسام المصدر المرقّمة (1–14) — يُستخدم في التحقق الآلي. */
export const SOURCE_NUMBERED_COUNT = 14;

// -------------------- العنوان والغلاف (حرفي من المصدر) --------------------
export const LESSON_TITLE_19 = "الدرس 19: Possessive Nouns";
export const LESSON_SUBTITLE_19 = "ملكية الأسماء: 's و s' و الجمع الشاذ";
export const LAB_NAME_19 = "POSSESSION LAB — THE APOSTROPHE DETECTIVE";
export const LAB_MOTTO_19 =
  "APOSTROPHE = أداة صغيرة وقوية — عدّ المالكين أولًا، ثم ضع العلامة في مكانها.";

export const COVER_19 = {
  recall16: {
    label: "في الدرس 16 تعلمنا:",
    lines: ["my book", "her phone", "their house"],
  },
  recall17: {
    label: "وفي الدرس 17 تعلمنا:",
    lines: ["The book is mine.", "The phone is hers.", "The house is theirs."],
  },
  today: "اليوم سنضيف نظامًا ثالثًا مهمًا جدًا:",
  example: "Ali's book",
  meaning: "أي:",
  meaningAr: "كتاب علي",
  and: "وسنتعلم كيف نميز بين:",
  words: ["boy's", "boys'", "child's", "children's"],
  ending: "وهنا يبدأ مستوى جديد من الدقة في اللغة الإنجليزية. 🧠🔥",
};

// -------------------- تدفق المختبر --------------------
export const LAB_FLOW_19 = [
  "count the owners",
  "ends in s?",
  "place the apostrophe",
  "POSSESSIVE NOUN",
];

// -------------------- 🎯 أهداف الدرس --------------------
export const OBJECTIVES_19: { n: string; text: string }[] = [
  { n: "①", text: "التعبير عن ملكية شخص أو حيوان أو شيء." },
  { n: "②", text: "استخدام 's مع الاسم المفرد." },
  { n: "③", text: "استخدام s' مع الاسم الجمع المنتهي بـ s." },
  { n: "④", text: "التعامل مع الجمع الشاذ مثل children وmen وwomen." },
  { n: "⑤", text: "التمييز بين: the boy's bag و the boys' bags" },
  { n: "⑥", text: "فهم الفرق بين: James's book و the students' books" },
  { n: "⑦", text: "ربط ملكية الأسماء بضمائر الملكية التي تعلمناها سابقًا." },
];

// -------------------- 1. ما معنى Possessive Noun؟ --------------------
export const S1_DEFINITION_19 = {
  term: "Possessive Noun",
  means: "يعني:",
  meansAr: "اسم يدل على أن شيئًا يخص شخصًا أو حيوانًا أو مجموعة.",
  exampleLabel: "مثال:",
  example: "Ali's book",
  meaningLabel: "معناها:",
  meaningAr: "كتاب علي.",
  thatIs: "أي:",
  belongs: "The book belongs to Ali.",
  belongsAr: "الكتاب يخص علي.",
};

export const S1_BASIC_RULE_19 = {
  title: "القاعدة الأساسية",
  ifText: "إذا أردنا أن نقول:",
  sayAr: "كتاب علي",
  weSay: "نقول:",
  correct: "Ali's book",
  notText: "وليس:",
  wrong: "Ali book ❌",
  examplesLabel: "مثال:",
  examples: [
    { en: "Sara's phone", ar: "هاتف سارة." },
    { en: "Omar's bicycle", ar: "دراجة عمر." },
    { en: "Lina's notebook", ar: "دفتر لينا." },
    { en: "The dog's tail", ar: "ذيل الكلب." },
    { en: "The teacher's desk", ar: "مكتب المعلم." },
  ],
};

// -------------------- 2. كيف نفكر في 's؟ --------------------
export const S2_THINKING_19 = {
  intro: "لا تحفظها كعلامة غريبة.",
  think: "فكر فيها هكذا:",
  pairs: [
    { poss: "Ali's book", of: "the book of Ali", ar: "كتاب علي." },
    { poss: "Sara's camera", of: "the camera of Sara", ar: "كاميرا سارة." },
    { poss: "The dog's tail", of: "the tail of the dog", ar: "ذيل الكلب." },
  ],
};

export const S2_IQ200_19 = {
  title: "طريقة IQ200",
  when: "عندما ترى:",
  mark: "'s",
  ask: "اسأل:",
  question: "«لِمَن هذا الشيء؟»",
  exampleLabel: "مثال:",
  example: "Maya's backpack",
  askAgain: "اسأل:",
  questionAr: "لمن الحقيبة؟",
  answer: "Maya.",
  then: "إذن:",
  result: "Maya's backpack.",
};

// -------------------- 3. الاسم المفرد + 's --------------------
export const S3_SINGULAR_19 = {
  intro: "هذه أسهل قاعدة في الدرس.",
  formula: "Singular Noun + 's",
  exampleLabel: "مثال:",
  examples: [
    { sing: "boy", poss: "boy's" },
    { sing: "girl", poss: "girl's" },
    { sing: "teacher", poss: "teacher's" },
    { sing: "doctor", poss: "doctor's" },
    { sing: "cat", poss: "cat's" },
    { sing: "dog", poss: "dog's" },
    { sing: "student", poss: "student's" },
  ],
  sentencesLabel: "أمثلة",
  sentences: [
    { en: "The boy's bicycle is blue.", ar: "دراجة الصبي زرقاء." },
    { en: "The girl's jacket is warm.", ar: "سترة الفتاة دافئة." },
    { en: "The teacher's computer is new.", ar: "حاسوب المعلم جديد." },
    { en: "The cat's eyes are green.", ar: "عينا القطة خضراوان." },
  ],
  warning: {
    title: "انتبه",
    text: "الاسم المفرد يأخذ: 's حتى لو كان الاسم منتهيًا بحرف s في بعض الأسماء.",
    commonLabel: "مثال شائع:",
    example: "James's book",
    exampleAr: "كتاب James.",
    someStyles: "وفي بعض الأساليب الكتابية قد ترى:",
    alt: "James' book",
    but: "لكن في المستوى الأساسي سنستخدم:",
    final: "James's book",
  },
};

// -------------------- 4. ماذا لو كان عندنا أكثر من شخص؟ --------------------
export const S4_MULTI_19 = {
  intro: "هنا نصل إلى الجزء المهم جدًا.",
  if: "إذا كان الاسم جمعًا وينتهي أصلًا بـ s:",
  wePlace: "نضع فقط:",
  mark: "'",
  after: "بعد الـ s.",
  exampleLabel: "مثال:",
  example: "boy → boys",
  wantLabel: "إذا أردنا ملكية الأولاد:",
  result: "boys'",
  compare: {
    title: "قارن",
    a: { en: "The boy's bag.", ar: "حقيبة الولد." },
    b: { en: "The boys' bags.", ar: "حقائب الأولاد." },
    notice: "لاحظ الفرق!",
    aDef: "boy's = ولد واحد يملك شيئًا.",
    bDef: "boys' = أكثر من ولد يملكون شيئًا.",
  },
  fire: {
    title: "مثال مهم جدًا",
    a: { en: "The girl's bicycle.", ar: "دراجة فتاة واحدة." },
    b: { en: "The girls' bicycles.", ar: "دراجات عدة فتيات." },
  },
};

// مقارنة حرفية على مستوى الحروف: boy's مقابل boys'
export const BOYS_WORDS_19 = {
  one: { letters: ["b", "o", "y"], mark: "'s", full: "boy's" },
  many: { letters: ["b", "o", "y", "s"], mark: "'", full: "boys'" },
};

// -------------------- 5. لا تنظر إلى العلامة فقط! --------------------
export const S5_NUMBER_19 = {
  intro1: "لا تنظر إلى العلامة فقط!",
  intro2: "انظر إلى عدد المالكين.",
  exampleLabel: "مثال:",
  a: { en: "The student's book.", ar: "كتاب طالب واحد." },
  b: { en: "The students' books.", ar: "كتب عدة طلاب." },
  anotherLabel: "مثال آخر:",
  c: { en: "The teacher's room.", ar: "غرفة معلم واحد." },
  d: { en: "The teachers' room.", ar: "غرفة المعلمين." },
  error: {
    title: "الخطأ الشائع",
    wrong: "The students's books ❌",
    why: "لماذا خطأ؟",
    because: "لأن:",
    note: "students جمع وينتهي بـ s.",
    so: "إذن لا نضيف:",
    no: "'s",
    but: "بل نضيف: ' فقط.",
    correctLabel: "الصحيح:",
    correct: "The students' books. ✅",
  },
};

// كاشف العدد — الأنماط الثلاثة
export const NUMBER_DETECT_19 = [
  {
    label: "ONE OWNER",
    ar: "مالك واحد",
    emoji: "👦",
    example: "boy",
    result: "boy's",
  },
  {
    label: "MORE THAN ONE + plural ends in S",
    ar: "أكثر من مالك + الجمع ينتهي بـ S",
    emoji: "👦👦",
    example: "boys",
    result: "boys'",
  },
  {
    label: "IRREGULAR PLURAL",
    ar: "جمع شاذ",
    emoji: "🧒🧒",
    example: "children",
    result: "children's",
  },
] as const;

// -------------------- 6. ماذا يحدث مع الجمع الشاذ؟ --------------------
export const S6_IRREGULAR_19 = {
  intro: "وهنا يأتي الربط المباشر مع الدرس 18.",
  remember: "تذكر:",
  families: ["child → children", "man → men", "woman → women", "person → people"],
  explain: "هذه الكلمات جمعها لا ينتهي بـ s. لذلك عندما نريد الملكية نستخدم: 's",
  child: {
    star: "child",
    singularLabel: "مفرد:",
    singular: "child",
    possessiveLabel: "ملكية:",
    possessive: "child's",
    exampleLabel: "مثال:",
    example: "The child's toy.",
    exampleAr: "لعبة الطفل.",
    pluralLabel: "الجمع:",
    plural: "children",
    possessive2: "children's",
    example2: "The children's toys.",
    example2Ar: "ألعاب الأطفال.",
  },
  compare: {
    title: "قارن بعناية",
    a: { en: "The child's toy.", ar: "لعبة طفل واحد." },
    b: { en: "The children's toys.", ar: "ألعاب عدة أطفال." },
  },
  keyPoint: {
    title: "هذه من أهم نقاط الدرس",
    notice: "لاحظ:",
    words: ["child", "children", "child's", "children's"],
    dont: "لا تقل:",
    wrong: "childrens' ❌",
    correct: "children's ✅",
    why: "لماذا؟",
    reason: "لأن children أصلًا لا تنتهي بـ s.",
  },
};

// -------------------- 7/8/9 — العائلات الشاذة --------------------
export const IRREGULAR_FAMILIES_19: Record<
  "man" | "woman" | "person" | "tooth",
  {
    sing: string;
    plural: string;
    singPoss: string;
    plPoss: string;
    singEx: string;
    singExAr: string;
    plEx: string;
    plExAr: string;
    emoji: string;
  }
> = {
  man: {
    sing: "man",
    plural: "men",
    singPoss: "man's",
    plPoss: "men's",
    singEx: "The man's jacket.",
    singExAr: "سترة الرجل.",
    plEx: "The men's jackets.",
    plExAr: "سترات الرجال.",
    emoji: "👨",
  },
  woman: {
    sing: "woman",
    plural: "women",
    singPoss: "woman's",
    plPoss: "women's",
    singEx: "The woman's bag.",
    singExAr: "حقيبة المرأة.",
    plEx: "The women's bags.",
    plExAr: "حقائب النساء.",
    emoji: "👩",
  },
  person: {
    sing: "person",
    plural: "people",
    singPoss: "person's",
    plPoss: "people's",
    singEx: "The person's name.",
    singExAr: "اسم الشخص.",
    plEx: "The people's opinions.",
    plExAr: "آراء الناس.",
    emoji: "🧍",
  },
  tooth: {
    sing: "tooth",
    plural: "teeth",
    singPoss: "tooth's",
    plPoss: "teeth's",
    singEx: "The tooth's shape.",
    singExAr: "شكل السن.",
    plEx: "The teeth's condition.",
    plExAr: "حالة الأسنان.",
    emoji: "🦷",
  },
};

// -------------------- 10. الأسنان والقدم --------------------
export const S10_TEETH_FEET_19 = {
  toothPair: "tooth → teeth",
  toothNote:
    "وفي الكلام الطبيعي توجد تراكيب أخرى أكثر شيوعًا، لكن الهدف هنا أن ترى كيف تعمل قاعدة الملكية.",
  footPair: "foot → feet",
  footSing: { en: "The man's foot.", ar: "قدم الرجل." },
  footPl: { en: "The men's feet.", ar: "أقدام الرجال." },
};

// -------------------- 🎮 نظام القواعد الكامل --------------------
export const RULE_SYSTEM_19 = {
  intro: "لدينا الآن ثلاث حالات رئيسية.",
  cases: [
    {
      n: "①",
      title: "اسم مفرد:",
      word: "Ali",
      poss: "Ali's",
      exampleLabel: "مثال:",
      example: "Ali's book",
    },
    {
      n: "②",
      title: "اسم جمع ينتهي بـ s:",
      word: "students",
      poss: "students'",
      exampleLabel: "مثال:",
      example: "students' books",
    },
    {
      n: "③",
      title: "جمع شاذ لا ينتهي بـ s:",
      word: "children",
      poss: "children's",
      exampleLabel: "مثال:",
      example: "children's toys",
    },
  ],
};

export const GOLDEN_TABLE_19 = {
  title: "احفظ هذا الجدول",
  singularHead: "Singular → Possessive",
  singular: [
    { sing: "boy", poss: "boy's" },
    { sing: "girl", poss: "girl's" },
    { sing: "student", poss: "student's" },
    { sing: "teacher", poss: "teacher's" },
    { sing: "child", poss: "child's" },
    { sing: "man", poss: "man's" },
    { sing: "woman", poss: "woman's" },
  ],
  pluralHead: "Plural → Possessive",
  plural: [
    { sing: "boys", poss: "boys'" },
    { sing: "girls", poss: "girls'" },
    { sing: "students", poss: "students'" },
    { sing: "teachers", poss: "teachers'" },
    { sing: "children", poss: "children's" },
    { sing: "men", poss: "men's" },
    { sing: "women", poss: "women's" },
    { sing: "people", poss: "people's" },
  ],
};

// آلة apostrophe — الأنماط الثلاثة (Singular / Plural ending in S / Irregular plural)
export const APOSTROPHE_MACHINE_19 = [
  {
    mode: "Singular",
    ar: "مفرد",
    add: "'s",
    examples: [
      { word: "boy", result: "boy's" },
      { word: "girl", result: "girl's" },
      { word: "student", result: "student's" },
      { word: "teacher", result: "teacher's" },
    ],
  },
  {
    mode: "Plural ending in S",
    ar: "جمع ينتهي بـ S",
    add: "'",
    examples: [
      { word: "boys", result: "boys'" },
      { word: "girls", result: "girls'" },
      { word: "students", result: "students'" },
      { word: "teachers", result: "teachers'" },
    ],
  },
  {
    mode: "Irregular plural",
    ar: "جمع شاذ",
    add: "'s",
    examples: [
      { word: "children", result: "children's" },
      { word: "men", result: "men's" },
      { word: "women", result: "women's" },
      { word: "people", result: "people's" },
    ],
  },
] as const;

// -------------------- 11. الملكية لا تعني دائمًا "امتلاك" --------------------
export const S11_NOT_OWNING_19 = {
  intro: "هذه نقطة مهمة.",
  explain: "Possessive لا تعني فقط أن شخصًا \"يمتلك\" شيئًا ماديًا.",
  exampleLabel: "مثال:",
  examples: [
    { en: "the school's name", ar: "اسم المدرسة." },
    { en: "the city's center", ar: "وسط المدينة." },
    { en: "the company's website", ar: "موقع الشركة." },
    { en: "the dog's name", ar: "اسم الكلب." },
  ],
  relation: "العلاقة قد تكون:",
  kinds: ["ملكية", "ارتباط", "جزء من شيء", "أو علاقة بين شيئين."],
};

// -------------------- 12. Possessive Noun vs Possessive Adjective --------------------
export const S12_VS_ADJ_19 = {
  intro: "الآن أصبح لدينا نظامان متشابهان.",
  exampleLabel: "مثال:",
  a: "Ali's book",
  b: "His book",
  bothMean: "كلاهما يعني: كتاب علي. لكن التركيب مختلف.",
  aTitle: "Ali's book",
  aBreakdown: [
    { word: "Ali", role: "اسم المالك." },
    { word: "'s", role: "علامة الملكية." },
    { word: "book", role: "الشيء." },
  ],
  bTitle: "His book",
  bBreakdown: [
    { word: "His", role: "صفة ملكية." },
    { word: "book", role: "الشيء." },
  ],
  full: {
    title: "مثال كامل",
    this: "هذا:",
    start: "Sara's laptop.",
    canConvert: "يمكن تحويله إلى:",
    middle: "Her laptop.",
    andComplete: "ويمكن أن نكمل:",
    end: "The laptop is hers.",
    notice: "لاحظ أننا أصبح لدينا ثلاثة طرق:",
    ways: ["Sara's laptop.", "Her laptop.", "The laptop is hers."],
  },
};

// -------------------- 13. النظام الثلاثي للملكية --------------------
export const S13_THREE_SYSTEMS_19 = {
  intro: "احفظ هذه الثلاثة معًا:",
  systems: [
    { n: "①", label: "Possessive Noun", en: "Omar's phone.", ar: "هاتف عمر." },
    { n: "②", label: "Possessive Adjective", en: "His phone.", ar: "هاتفه." },
    { n: "③", label: "Possessive Pronoun", en: "The phone is his.", ar: "الهاتف له." },
  ],
  another: {
    label: "مثال آخر:",
    lines: ["Maya's notebook.", "Her notebook.", "The notebook is hers."],
  },
  plural: {
    label: "ومثال جمع:",
    lines: ["The students' classroom.", "Their classroom.", "The classroom is theirs."],
  },
};

// آلة النظم الثلاثة — سلاسل التحويل الكاملة
export const THREE_SYSTEM_MACHINE_19 = [
  { name: "Sara", noun: "Sara's laptop", adj: "Her laptop", pron: "The laptop is hers." },
  { name: "Omar", noun: "Omar's phone", adj: "His phone", pron: "The phone is his." },
  { name: "Maya", noun: "Maya's notebook", adj: "Her notebook", pron: "The notebook is hers." },
  { name: "The students", noun: "The students' classroom", adj: "Their classroom", pron: "The classroom is theirs." },
] as const;

// -------------------- 14. انتبه: apostrophe ليست جمعًا! --------------------
export const S14_NOT_PLURAL_19 = {
  intro: "هذه نقطة مهمة جدًا.",
  rule: "لا نضع ' لمجرد أن الكلمة جمع.",
  booksLine: "books = كتب",
  not: "وليس:",
  wrong: "book's ❌",
  means: "book's تعني:",
  meansAr: "ملكية كتاب واحد.",
  exampleLabel: "مثال:",
  example: "The book's cover.",
  exampleAr: "غلاف الكتاب.",
  but: "لكن:",
  but2: "The books are interesting.",
  but2Ar: "الكتب ممتعة.",
  notice: "لاحظ:",
  notice1: "books = جمع.",
  notice2: "book's = ملكية مفرد.",
  magic: {
    title: "الفرق السحري",
    a: { en: "books", ar: "= كتب" },
    b: { en: "book's", ar: "= للكتاب / ملكية كتاب واحد" },
    c: { en: "books'", ar: "= للكتب / ملكية عدة كتب" },
  },
  super: {
    title: "مثال خارق",
    weHave: "لدينا:",
    one: "one boy",
    two: "two boys",
    now: "الآن:",
    a: { en: "one boy's bicycle", ar: "دراجة ولد واحد." },
    b: { en: "two boys' bicycles", ar: "دراجتا ولدين / دراجات الولدين." },
    notice: "لاحظ:",
    words: ["boy's", "boys'"],
    diff: "الفرق حرف واحد فقط!",
    butMeaning: "لكن المعنى تغير بالكامل.",
  },
};

// ثلاثية books / book's / books'
export const APOSTROPHE_PLURAL_19 = [
  { en: "books", ar: "= كتب", kind: "PLURAL", emoji: "📚📚", note: "جمع — بدون أي علامة." },
  { en: "book's", ar: "= للكتاب / ملكية كتاب واحد", kind: "POSSESSIVE SINGULAR", emoji: "📖", note: "ملكية كتاب واحد — مثل The book's cover." },
  { en: "books'", ar: "= للكتب / ملكية عدة كتب", kind: "POSSESSIVE PLURAL", emoji: "📚📚", note: "ملكية عدة كتب — مثل the books' covers." },
] as const;

// ============================================================
// التمارين — الأسئلة والخيارات ومفاتيح الحل محفوظة كما في المصدر
// ============================================================

// -------------------- Grammar Detective --------------------
export const DETECTIVE_19 = {
  intro: "اكتشف الخطأ في كل جملة:",
  inspect: "افحص: عدد المالكين + مكان العلامة.",
  solutionLabel: "الحل",
  sentences: [
    { n: "①", wrong: "The childs toy is broken.", correct: "The child's toy is broken.", owners: "one", mark: "'s" },
    { n: "②", wrong: "The childrens toys are outside.", correct: "The children's toys are outside.", owners: "many", mark: "'s" },
    { n: "③", wrong: "The boys's room is large.", correct: "The boys' room is large.", owners: "many", mark: "'" },
    { n: "④", wrong: "The girls bag is red.", correct: "The girl's bag is red.", owners: "one", mark: "'s" },
    { n: "⑤", wrong: "The students's books are on the desk.", correct: "The students' books are on the desk.", owners: "many", mark: "'" },
    { n: "⑥", wrong: "I like the dogs' tail.", correct: "I like the dog's tail.", owners: "one", mark: "'s", note: "لأن المقصود كلب واحد." },
    { n: "⑦", wrong: "The woman bag is expensive.", correct: "The woman's bag is expensive.", owners: "one", mark: "'s" },
    { n: "⑧", wrong: "The mens shoes are black.", correct: "The men's shoes are black.", owners: "many", mark: "'s" },
  ],
};

// -------------------- Challenge 1 — اختر الصحيح --------------------
export const CHALLENGE1_19 = {
  intro: "اختر الصحيح:",
  answerLabel: "الإجابة:",
  questions: [
    {
      n: "①",
      context: "إذا كان لدينا ولد واحد:",
      options: ["the boy's bike", "the boys bike", "the boys' bike"],
      answer: 0,
    },
    {
      n: "②",
      context: "إذا كان لدينا عدة أولاد:",
      options: ["the boy's bikes", "the boys' bikes", "the boys's bikes"],
      answer: 1,
    },
    {
      n: "③",
      context: "طفل واحد:",
      options: ["the child's toy", "the childrens' toy", "the child toy"],
      answer: 0,
    },
    {
      n: "④",
      context: "عدة أطفال:",
      options: ["the childs' toys", "the children's toys", "the childrens toys"],
      answer: 1,
    },
  ],
};

// -------------------- Challenge 2 — حوّل إلى Possessive --------------------
export const CHALLENGE2_19 = {
  intro: "حوّل:",
  items: [
    { n: "①", of: "the book of Ali", answer: "Ali's book" },
    { n: "②", of: "the bicycle of Sara", answer: "Sara's bicycle" },
    { n: "③", of: "the toys of the children", answer: "the children's toys" },
    { n: "④", of: "the house of the men", answer: "the men's house" },
    { n: "⑤", of: "the bags of the students", answer: "the students' bags" },
    { n: "⑥", of: "the car of the woman", answer: "the woman's car" },
  ],
};

// -------------------- IQ200 Challenge --------------------
export const IQ200_CHALLENGE_19 = {
  intro: "حدد عدد المالكين ثم اكتب الملكية الصحيحة.",
  steps: [
    "1. How many owners?",
    "2. Does the plural end in s?",
    "3. Select the apostrophe pattern.",
  ],
  items: [
    { n: "①", count: "one teacher", word: "teacher", owners: "one", endsInS: null, pattern: "'s", answer: "teacher's" },
    { n: "②", count: "many teachers", word: "teachers", owners: "many", endsInS: true, pattern: "s'", answer: "teachers'" },
    { n: "③", count: "one child", word: "child", owners: "one", endsInS: null, pattern: "'s", answer: "child's" },
    { n: "④", count: "many children", word: "children", owners: "many", endsInS: false, pattern: "'s", answer: "children's" },
    { n: "⑤", count: "one man", word: "man", owners: "one", endsInS: null, pattern: "'s", answer: "man's" },
    { n: "⑥", count: "many men", word: "men", owners: "many", endsInS: false, pattern: "'s", answer: "men's" },
    { n: "⑦", count: "one girl", word: "girl", owners: "one", endsInS: null, pattern: "'s", answer: "girl's" },
    { n: "⑧", count: "many girls", word: "girls", owners: "many", endsInS: true, pattern: "s'", answer: "girls'" },
  ],
};

// -------------------- IQ200 — لغز المعنى --------------------
export const IQ200_MEANING_19 = {
  intro: "انظر إلى الجملتين:",
  a: "The boy's shoes are dirty.",
  b: "The boys' shoes are dirty.",
  question: "هل هما نفس الشيء؟",
  no: "لا. ❌",
  first: "الأولى:",
  firstWord: "The boy's",
  firstMean: "ولد واحد.",
  second: "الثانية:",
  secondWord: "The boys'",
  secondMean: "عدة أولاد.",
  andNow: "والآن:",
  c: "The child's toys.",
  d: "The children's toys.",
  first2: "الأولى:",
  first2Mean: "طفل واحد.",
  second2: "الثانية:",
  second2Mean: "عدة أطفال.",
  fire: "هذه الفروق الصغيرة هي التي تجعل الإنجليزية دقيقة جدًا.",
};

// -------------------- FINAL BOSS --------------------
export const FINAL_BOSS_19 = {
  readLabel: "اقرأ:",
  passage:
    "Liam has a small dog. The dog's name is Rocket. Liam also has two sisters. The girls' room is next to Liam's room. Their mother keeps the children's toys in a large box.",
  highlights: ["The dog's name", "the girls'", "Liam's room", "the girls' room", "the children's toys"],
  answerLabel: "أجب:",
  questions: [
    {
      n: "①",
      q: "لمن يعود: The dog's name",
      a: "يعود إلى الكلب (Rocket) — dog مفرد، لذلك العلامة 's.",
    },
    {
      n: "②",
      q: "كم عدد الأشخاص الذين يشير إليهم: the girls'",
      a: "اثنتان — أختا Liam.",
    },
    {
      n: "③",
      q: "لماذا استخدمنا: Liam's room",
      a: "لأن Liam شخص واحد (مفرد) ← 's.",
    },
    {
      n: "④",
      q: "لماذا استخدمنا: girls' room وليس: girl's room؟",
      a: "لأن المقصود أكثر من فتاة (أختان)، والجمع ينتهي بـ s ← نضع ' فقط.",
    },
    {
      n: "⑤",
      q: "لماذا نقول: children's toys",
      a: "لأن children جمع شاذ لا ينتهي بـ s ← 's.",
    },
    {
      n: "⑥",
      q: "ما الفرق بين: child's و children's؟",
      a: "child's = طفل واحد، children's = عدة أطفال — علامة واحدة تغيّر المعنى.",
    },
    {
      n: "⑦",
      q: "حوّل: Liam's room إلى Possessive Adjective.",
      a: "His room. (Liam ← He ← His)",
    },
  ],
};

// -------------------- اختبار السرعة --------------------
export const SPEED_TEST_19 = {
  intro: "صحح دون تفكير طويل:",
  sentences: [
    { n: "①", en: "The boy's are playing.", ok: false, correct: "The boys are playing.", why: "boy's ملكية مفرد وليست جمعًا." },
    { n: "②", en: "The boys' are playing.", ok: false, correct: "The boys are playing.", why: "boys' ملكية جمع وليست جمعًا." },
    { n: "③", en: "The boys' bags are heavy.", ok: true },
    { n: "④", en: "The childrens' books are new.", ok: false, correct: "The children's books are new.", why: "children جمع شاذ ← children's وليس childrens'." },
    { n: "⑤", en: "The children's books are new.", ok: true },
    { n: "⑥", en: "My sister's phone is broken.", ok: true },
    { n: "⑦", en: "My sisters' phones are broken.", ok: true },
  ],
  notice: "لاحظ أن:",
  note1: { en: "My sister's", ar: "قد تعني أختًا واحدة." },
  note2Lead: "أما:",
  note2: { en: "My sisters'", ar: "فتعني عدة أخوات." },
};

// ============================================================
// الخاتمة — الخلاصة + القاعدة + الخريطة
// ============================================================

// -------------------- الخلاصة الكبرى --------------------
export const SUMMARY_19 = {
  intro: "لدينا الآن:",
  groups: [
    {
      n: "①",
      title: "مفرد + 's",
      examples: ["boy → boy's", "girl → girl's", "child → child's", "man → man's", "woman → woman's"],
    },
    {
      n: "②",
      title: "جمع ينتهي بـ s + '",
      examples: ["boys → boys'", "girls → girls'", "students → students'", "teachers → teachers'"],
    },
    {
      n: "③",
      title: "جمع شاذ + 's",
      examples: ["children → children's", "men → men's", "women → women's", "people → people's"],
    },
  ],
};

// -------------------- قاعدة IQ200 النهائية --------------------
export const FINAL_RULE_19 = {
  title: "قاعدة IQ200 النهائية",
  lead: "قبل أن تضع apostrophe، اسأل سؤالين:",
  q1: "① كم عدد المالكين؟",
  q1b: "واحد أم أكثر من واحد؟",
  q2: "② هل صيغة الجمع تنتهي بـ s؟",
  ifText: "إذا كان:",
  mapping: [
    { cond: "مفرد", mark: "'s" },
    { cond: "جمع ينتهي بـ s", mark: "s'" },
    { cond: "جمع شاذ لا ينتهي بـ s", mark: "'s" },
  ],
};

// -------------------- خريطة المنهج حتى الآن --------------------
export const ROADMAP_19: { n: number; en: string; here?: boolean; fire?: boolean }[] = [
  { n: 1, en: "Sentence Structure" },
  { n: 2, en: "Pronouns" },
  { n: 3, en: "Verb to be" },
  { n: 4, en: "Nouns + Articles" },
  { n: 5, en: "Adjectives" },
  { n: 6, en: "Present Simple" },
  { n: 7, en: "Present Simple — Negative & Questions" },
  { n: 8, en: "Present Simple Review" },
  { n: 9, en: "Present Continuous" },
  { n: 10, en: "Present Continuous Advanced" },
  { n: 11, en: "Present Simple vs Present Continuous" },
  { n: 12, en: "Past Simple" },
  { n: 13, en: "Past Simple — Negative & Questions" },
  { n: 14, en: "Past Simple — Wh Questions" },
  { n: 15, en: "Was / Were" },
  { n: 16, en: "Possessive Adjectives" },
  { n: 17, en: "Possessive Pronouns" },
  { n: 18, en: "Plural Nouns" },
  { n: 19, en: "Possessive Nouns — 's / s' / Irregular Plurals", here: true, fire: true },
];

export const ROADMAP_19_CLOSING = "والآن أصبح عندنا **منظومة الملكية كاملة**:";

export const OWNERSHIP_SYSTEM_19: [string, string, string][] = [
  ["Sara's book", "Her book", "The book is hers."],
  ["The students' classroom", "Their classroom", "The classroom is theirs."],
  ["The child's toy", "His/Her toy", "The toy is his/hers."],
  ["The children's toys", "Their toys", "The toys are theirs."],
];

export const NEXT_STEP_19 =
  "🚀 **الخطوة التالية المنطقية في التسلسل ستكون درسًا جديدًا يبني على هذه الأساسات، وليس إعادة لها.**";

// ============================================================
// مختبرات الدرس — بيانات الأنظمة التفاعلية
// ============================================================

/** A) OWNER DETECTOR — لمن هذا الشيء؟ */
export const OWNER_DETECT_19 = [
  { phrase: "Maya's backpack", owner: "Maya", thing: "backpack" },
  { phrase: "Ali's book", owner: "Ali", thing: "book" },
  { phrase: "Sara's camera", owner: "Sara", thing: "camera" },
  { phrase: "The dog's tail", owner: "The dog", thing: "tail" },
  { phrase: "The boy's bag", owner: "The boy", thing: "bag" },
] as const;

/** E) CHILD / CHILDREN FAMILY */
export const CHILD_FAMILY_19 = {
  branches: [
    { word: "child", label: "مفرد", poss: "child's", example: "The child's toy." },
    { word: "children", label: "جمع (شاذ)", poss: "children's", example: "The children's toys." },
  ],
  dont: "لا تقل:",
  wrong: "childrens'",
  correct: "children's",
  why: "لماذا؟ لأن children أصلًا لا تنتهي بـ s.",
} as const;

// ============================================================
// أنواع الكتل والشرائح
// ============================================================

export type Block19 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: "neutral" | "good" | "bad" | "focus" | "warn" }
  | { type: "mixed"; text: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "formulaStrip"; items: string[] }
  | { type: "mixedStrip"; items: string[] }
  | { type: "arrowChain"; items: string[] }
  | { type: "ofPairs" }
  | { type: "ownerDetector" }
  | { type: "singularBoard" }
  | { type: "boysComparator" }
  | { type: "numberDetector" }
  | { type: "childFamily" }
  | { type: "irregularFamily"; which: "man" | "woman" | "person" | "tooth" }
  | { type: "ruleCases" }
  | { type: "goldenTable" }
  | { type: "apostropheMachine" }
  | { type: "breakdown"; which: "noun" | "adj" }
  | { type: "threeSystemsBoard" }
  | { type: "threeSystemMachine" }
  | { type: "apostropheVsPlural" };

export type Exercise19 =
  | { type: "detective" }
  | { type: "challenge1" }
  | { type: "challenge2" }
  | { type: "iq200" }
  | { type: "meaningPuzzle" }
  | { type: "finalBoss" }
  | { type: "speedTest" };

export type Slide19 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block19[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise19 }
  | { kind: "summary"; title: string }
  | { kind: "finalRule"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const BASICS = "أساسيات الملكية";
const RULES = "القواعد الثلاث";
const IRREGULAR = "الجمع الشاذ";
const CONNECT = "الربط بالنظم السابقة";
const TRAP = "فخّ apostrophe";
const HUNT = "مهمة المحقق";
const CHALLENGES = "التحديات وIQ200";
const FINAL = "الامتحان الأخير";
const END = "الخاتمة";

export const SLIDES: Slide19[] = [
  { kind: "cover", section: START, mascot: "🕵️" },
  { kind: "objectives", section: START, mascot: "🎯" },

  // 1 — ما معنى Possessive Noun؟
  {
    kind: "lesson",
    section: BASICS,
    mascot: "🧠",
    step: "1",
    title: "ما معنى Possessive Noun؟",
    blocks: [
      { type: "english", en: S1_DEFINITION_19.term, tone: "focus", ar: `${S1_DEFINITION_19.means} ${S1_DEFINITION_19.meansAr}` },
      { type: "text", text: S1_DEFINITION_19.exampleLabel },
      { type: "english", en: S1_DEFINITION_19.example, ar: `${S1_DEFINITION_19.meaningLabel} ${S1_DEFINITION_19.meaningAr}` },
      { type: "text", text: S1_DEFINITION_19.thatIs },
      { type: "english", en: S1_DEFINITION_19.belongs, ar: S1_DEFINITION_19.belongsAr },
      { type: "note", emoji: "⭐", text: S1_BASIC_RULE_19.title },
      { type: "text", text: S1_BASIC_RULE_19.ifText },
      { type: "mixed", text: S1_BASIC_RULE_19.sayAr },
      { type: "text", text: S1_BASIC_RULE_19.weSay },
      { type: "english", en: S1_BASIC_RULE_19.correct, tone: "good" },
      { type: "text", text: S1_BASIC_RULE_19.notText },
      { type: "english", en: S1_BASIC_RULE_19.wrong, tone: "bad" },
      { type: "text", text: S1_BASIC_RULE_19.examplesLabel },
      ...S1_BASIC_RULE_19.examples.map((e) => ({ type: "english" as const, en: e.en, ar: e.ar })),
    ],
  },

  // 2 — كيف نفكر في 's؟
  {
    kind: "lesson",
    section: BASICS,
    mascot: "🧠",
    step: "2",
    title: "كيف نفكر في 's؟",
    blocks: [
      { type: "text", text: S2_THINKING_19.intro },
      { type: "text", text: S2_THINKING_19.think },
      { type: "ofPairs" },
      { type: "note", emoji: "🔥", text: S2_IQ200_19.title },
      { type: "text", text: S2_IQ200_19.when },
      { type: "english", en: S2_IQ200_19.mark, tone: "focus" },
      { type: "text", text: S2_IQ200_19.ask },
      { type: "mixed", text: S2_IQ200_19.question },
      { type: "text", text: S2_IQ200_19.exampleLabel },
      { type: "english", en: S2_IQ200_19.example },
      { type: "text", text: S2_IQ200_19.askAgain },
      { type: "text", text: S2_IQ200_19.questionAr },
      { type: "english", en: S2_IQ200_19.answer },
      { type: "text", text: S2_IQ200_19.then },
      { type: "english", en: S2_IQ200_19.result, tone: "good" },
      { type: "ownerDetector" },
    ],
  },

  // 3 — الاسم المفرد + 's
  {
    kind: "lesson",
    section: RULES,
    mascot: "🧠",
    step: "3",
    title: "الاسم المفرد + 's",
    lead: S3_SINGULAR_19.intro,
    blocks: [
      { type: "formulaStrip", items: [S3_SINGULAR_19.formula] },
      { type: "text", text: S3_SINGULAR_19.exampleLabel },
      { type: "singularBoard" },
      { type: "note", emoji: "✍️", text: S3_SINGULAR_19.sentencesLabel },
      ...S3_SINGULAR_19.sentences.map((s) => ({ type: "english" as const, en: s.en, ar: s.ar })),
      { type: "note", emoji: "🎯", text: S3_SINGULAR_19.warning.title },
      { type: "mixed", text: S3_SINGULAR_19.warning.text },
      { type: "text", text: S3_SINGULAR_19.warning.commonLabel },
      { type: "english", en: S3_SINGULAR_19.warning.example, tone: "good", ar: S3_SINGULAR_19.warning.exampleAr },
      { type: "text", text: S3_SINGULAR_19.warning.someStyles },
      { type: "english", en: S3_SINGULAR_19.warning.alt },
      { type: "text", text: S3_SINGULAR_19.warning.but },
      { type: "english", en: S3_SINGULAR_19.warning.final, tone: "good" },
    ],
  },

  // 4 — ماذا لو كان عندنا أكثر من شخص؟
  {
    kind: "lesson",
    section: RULES,
    mascot: "🧠",
    step: "4",
    title: "ماذا لو كان عندنا أكثر من شخص؟",
    lead: S4_MULTI_19.intro,
    blocks: [
      { type: "text", text: S4_MULTI_19.if },
      { type: "text", text: S4_MULTI_19.wePlace },
      { type: "english", en: S4_MULTI_19.mark, tone: "focus" },
      { type: "text", text: S4_MULTI_19.after },
      { type: "text", text: S4_MULTI_19.exampleLabel },
      { type: "formulaStrip", items: [S4_MULTI_19.example] },
      { type: "text", text: S4_MULTI_19.wantLabel },
      { type: "english", en: S4_MULTI_19.result, tone: "good" },
      { type: "note", emoji: "⭐", text: S4_MULTI_19.compare.title },
      { type: "english", en: S4_MULTI_19.compare.a.en, ar: S4_MULTI_19.compare.a.ar },
      { type: "english", en: S4_MULTI_19.compare.b.en, ar: S4_MULTI_19.compare.b.ar },
      { type: "text", text: S4_MULTI_19.compare.notice },
      { type: "mixed", text: S4_MULTI_19.compare.aDef },
      { type: "mixed", text: S4_MULTI_19.compare.bDef },
      { type: "note", emoji: "🔥", text: S4_MULTI_19.fire.title },
      { type: "english", en: S4_MULTI_19.fire.a.en, ar: S4_MULTI_19.fire.a.ar },
      { type: "english", en: S4_MULTI_19.fire.b.en, ar: S4_MULTI_19.fire.b.ar },
      { type: "boysComparator" },
    ],
  },

  // 5 — لا تنظر إلى العلامة فقط!
  {
    kind: "lesson",
    section: RULES,
    mascot: "🧠",
    step: "5",
    title: "لا تنظر إلى العلامة فقط!",
    lead: S5_NUMBER_19.intro2,
    blocks: [
      { type: "text", text: S5_NUMBER_19.exampleLabel },
      { type: "english", en: S5_NUMBER_19.a.en, ar: S5_NUMBER_19.a.ar },
      { type: "english", en: S5_NUMBER_19.b.en, ar: S5_NUMBER_19.b.ar },
      { type: "text", text: S5_NUMBER_19.anotherLabel },
      { type: "english", en: S5_NUMBER_19.c.en, ar: S5_NUMBER_19.c.ar },
      { type: "english", en: S5_NUMBER_19.d.en, ar: S5_NUMBER_19.d.ar },
      { type: "note", emoji: "🚨", text: S5_NUMBER_19.error.title },
      { type: "english", en: S5_NUMBER_19.error.wrong, tone: "bad" },
      { type: "text", text: S5_NUMBER_19.error.why },
      { type: "text", text: S5_NUMBER_19.error.because },
      { type: "mixed", text: S5_NUMBER_19.error.note },
      { type: "text", text: S5_NUMBER_19.error.so },
      { type: "formulaStrip", items: [S5_NUMBER_19.error.no] },
      { type: "mixed", text: S5_NUMBER_19.error.but },
      { type: "text", text: S5_NUMBER_19.error.correctLabel },
      { type: "english", en: S5_NUMBER_19.error.correct, tone: "good" },
      { type: "numberDetector" },
    ],
  },

  // 6 — ماذا يحدث مع الجمع الشاذ؟
  {
    kind: "lesson",
    section: IRREGULAR,
    mascot: "🧠",
    step: "6",
    title: "ماذا يحدث مع الجمع الشاذ؟",
    lead: S6_IRREGULAR_19.intro,
    blocks: [
      { type: "text", text: S6_IRREGULAR_19.remember },
      { type: "formulaStrip", items: S6_IRREGULAR_19.families },
      { type: "mixed", text: S6_IRREGULAR_19.explain },
      { type: "note", emoji: "⭐", text: S6_IRREGULAR_19.child.star },
      { type: "text", text: S6_IRREGULAR_19.child.singularLabel },
      { type: "english", en: S6_IRREGULAR_19.child.singular },
      { type: "text", text: S6_IRREGULAR_19.child.possessiveLabel },
      { type: "english", en: S6_IRREGULAR_19.child.possessive, tone: "good" },
      { type: "text", text: S6_IRREGULAR_19.child.exampleLabel },
      { type: "english", en: S6_IRREGULAR_19.child.example, ar: S6_IRREGULAR_19.child.exampleAr },
      { type: "text", text: S6_IRREGULAR_19.child.pluralLabel },
      { type: "english", en: S6_IRREGULAR_19.child.plural },
      { type: "text", text: S6_IRREGULAR_19.child.possessiveLabel },
      { type: "english", en: S6_IRREGULAR_19.child.possessive2, tone: "good" },
      { type: "text", text: S6_IRREGULAR_19.child.exampleLabel },
      { type: "english", en: S6_IRREGULAR_19.child.example2, ar: S6_IRREGULAR_19.child.example2Ar },
      { type: "note", emoji: "🔥", text: S6_IRREGULAR_19.compare.title },
      { type: "english", en: S6_IRREGULAR_19.compare.a.en, ar: S6_IRREGULAR_19.compare.a.ar },
      { type: "english", en: S6_IRREGULAR_19.compare.b.en, ar: S6_IRREGULAR_19.compare.b.ar },
      { type: "note", emoji: "🧠", text: S6_IRREGULAR_19.keyPoint.title },
      { type: "text", text: S6_IRREGULAR_19.keyPoint.notice },
      { type: "formulaStrip", items: S6_IRREGULAR_19.keyPoint.words },
      { type: "text", text: S6_IRREGULAR_19.keyPoint.dont },
      { type: "english", en: S6_IRREGULAR_19.keyPoint.wrong, tone: "bad" },
      { type: "text", text: "الصحيح:" },
      { type: "english", en: S6_IRREGULAR_19.keyPoint.correct, tone: "good" },
      { type: "text", text: S6_IRREGULAR_19.keyPoint.why },
      { type: "text", text: S6_IRREGULAR_19.keyPoint.reason },
      { type: "childFamily" },
    ],
  },

  // 7 — الرجل والرجال
  {
    kind: "lesson",
    section: IRREGULAR,
    mascot: "🧠",
    step: "7",
    title: "الرجل والرجال",
    blocks: [
      { type: "formulaStrip", items: ["man → men"] },
      { type: "text", text: "مفرد:" },
      { type: "english", en: "The man's jacket.", ar: "سترة الرجل." },
      { type: "text", text: "جمع:" },
      { type: "english", en: "The men's jackets.", ar: "سترات الرجال." },
      { type: "irregularFamily", which: "man" },
    ],
  },

  // 8 — المرأة والنساء
  {
    kind: "lesson",
    section: IRREGULAR,
    mascot: "🧠",
    step: "8",
    title: "المرأة والنساء",
    blocks: [
      { type: "formulaStrip", items: ["woman → women"] },
      { type: "text", text: "مفرد:" },
      { type: "english", en: "The woman's bag.", ar: "حقيبة المرأة." },
      { type: "text", text: "جمع:" },
      { type: "english", en: "The women's bags.", ar: "حقائب النساء." },
      { type: "irregularFamily", which: "woman" },
    ],
  },

  // 9 — الشخص والأشخاص
  {
    kind: "lesson",
    section: IRREGULAR,
    mascot: "🧠",
    step: "9",
    title: "الشخص والأشخاص",
    blocks: [
      { type: "formulaStrip", items: ["person → people"] },
      { type: "text", text: "مفرد:" },
      { type: "english", en: "The person's name.", ar: "اسم الشخص." },
      { type: "text", text: "جمع:" },
      { type: "english", en: "The people's opinions.", ar: "آراء الناس." },
      { type: "irregularFamily", which: "person" },
    ],
  },

  // 10 — الأسنان والقدم
  {
    kind: "lesson",
    section: IRREGULAR,
    mascot: "🧠",
    step: "10",
    title: "الأسنان والقدم",
    blocks: [
      { type: "formulaStrip", items: [S10_TEETH_FEET_19.toothPair] },
      { type: "english", en: "The tooth's shape.", ar: "شكل السن." },
      { type: "english", en: "The teeth's condition.", ar: "حالة الأسنان." },
      { type: "note", emoji: "📝", text: S10_TEETH_FEET_19.toothNote },
      { type: "formulaStrip", items: [S10_TEETH_FEET_19.footPair] },
      { type: "english", en: S10_TEETH_FEET_19.footSing.en, ar: S10_TEETH_FEET_19.footSing.ar },
      { type: "english", en: S10_TEETH_FEET_19.footPl.en, ar: S10_TEETH_FEET_19.footPl.ar },
      { type: "irregularFamily", which: "tooth" },
    ],
  },

  // نظام القواعد الكامل (بين القسم 10 والقسم 11 في المصدر)
  {
    kind: "lesson",
    section: RULES,
    mascot: "🎮",
    step: "★",
    title: "نظام القواعد الكامل",
    lead: RULE_SYSTEM_19.intro,
    blocks: [
      { type: "ruleCases" },
      { type: "note", emoji: "🏆", text: GOLDEN_TABLE_19.title },
      { type: "goldenTable" },
      { type: "apostropheMachine" },
    ],
  },

  // 11 — الملكية لا تعني دائمًا "امتلاك"
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "🧠",
    step: "11",
    title: "الملكية لا تعني دائمًا \"امتلاك\"",
    blocks: [
      { type: "text", text: S11_NOT_OWNING_19.intro },
      { type: "mixed", text: S11_NOT_OWNING_19.explain },
      { type: "text", text: S11_NOT_OWNING_19.exampleLabel },
      ...S11_NOT_OWNING_19.examples.map((e) => ({ type: "english" as const, en: e.en, ar: e.ar })),
      { type: "text", text: S11_NOT_OWNING_19.relation },
      { type: "mixedStrip", items: S11_NOT_OWNING_19.kinds },
    ],
  },

  // 12 — Possessive Noun vs Possessive Adjective
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "🧠",
    step: "12",
    title: "Possessive Noun vs Possessive Adjective",
    blocks: [
      { type: "text", text: S12_VS_ADJ_19.intro },
      { type: "text", text: S12_VS_ADJ_19.exampleLabel },
      { type: "english", en: S12_VS_ADJ_19.a, tone: "focus" },
      { type: "english", en: S12_VS_ADJ_19.b, tone: "focus" },
      { type: "mixed", text: S12_VS_ADJ_19.bothMean },
      { type: "breakdown", which: "noun" },
      { type: "breakdown", which: "adj" },
      { type: "note", emoji: "🔥", text: S12_VS_ADJ_19.full.title },
      { type: "text", text: S12_VS_ADJ_19.full.this },
      { type: "english", en: S12_VS_ADJ_19.full.start },
      { type: "text", text: S12_VS_ADJ_19.full.canConvert },
      { type: "english", en: S12_VS_ADJ_19.full.middle },
      { type: "text", text: S12_VS_ADJ_19.full.andComplete },
      { type: "english", en: S12_VS_ADJ_19.full.end },
      { type: "text", text: S12_VS_ADJ_19.full.notice },
      { type: "arrowChain", items: S12_VS_ADJ_19.full.ways },
    ],
  },

  // 13 — النظام الثلاثي للملكية
  {
    kind: "lesson",
    section: CONNECT,
    mascot: "🧠",
    step: "13",
    title: "النظام الثلاثي للملكية",
    lead: S13_THREE_SYSTEMS_19.intro,
    blocks: [
      { type: "threeSystemsBoard" },
      { type: "text", text: S13_THREE_SYSTEMS_19.another.label },
      { type: "arrowChain", items: S13_THREE_SYSTEMS_19.another.lines },
      { type: "text", text: S13_THREE_SYSTEMS_19.plural.label },
      { type: "arrowChain", items: S13_THREE_SYSTEMS_19.plural.lines },
      { type: "threeSystemMachine" },
    ],
  },

  // 14 — انتبه: apostrophe ليست جمعًا!
  {
    kind: "lesson",
    section: TRAP,
    mascot: "🚨",
    step: "14",
    title: "انتبه: apostrophe ليست جمعًا!",
    lead: S14_NOT_PLURAL_19.intro,
    blocks: [
      { type: "mixed", text: S14_NOT_PLURAL_19.rule },
      { type: "mixed", text: S14_NOT_PLURAL_19.booksLine },
      { type: "text", text: S14_NOT_PLURAL_19.not },
      { type: "english", en: S14_NOT_PLURAL_19.wrong, tone: "bad" },
      { type: "mixed", text: S14_NOT_PLURAL_19.means },
      { type: "text", text: S14_NOT_PLURAL_19.meansAr },
      { type: "text", text: S14_NOT_PLURAL_19.exampleLabel },
      { type: "english", en: S14_NOT_PLURAL_19.example, ar: S14_NOT_PLURAL_19.exampleAr },
      { type: "text", text: S14_NOT_PLURAL_19.but },
      { type: "english", en: S14_NOT_PLURAL_19.but2, ar: S14_NOT_PLURAL_19.but2Ar },
      { type: "text", text: S14_NOT_PLURAL_19.notice },
      { type: "mixed", text: S14_NOT_PLURAL_19.notice1 },
      { type: "mixed", text: S14_NOT_PLURAL_19.notice2 },
      { type: "note", emoji: "🔥", text: S14_NOT_PLURAL_19.magic.title },
      { type: "mixed", text: `${S14_NOT_PLURAL_19.magic.a.en} ${S14_NOT_PLURAL_19.magic.a.ar}` },
      { type: "mixed", text: `${S14_NOT_PLURAL_19.magic.b.en} ${S14_NOT_PLURAL_19.magic.b.ar}` },
      { type: "mixed", text: `${S14_NOT_PLURAL_19.magic.c.en} ${S14_NOT_PLURAL_19.magic.c.ar}` },
      { type: "note", emoji: "🧠", text: S14_NOT_PLURAL_19.super.title },
      { type: "text", text: S14_NOT_PLURAL_19.super.weHave },
      { type: "formulaStrip", items: [S14_NOT_PLURAL_19.super.one, S14_NOT_PLURAL_19.super.two] },
      { type: "text", text: S14_NOT_PLURAL_19.super.now },
      { type: "english", en: S14_NOT_PLURAL_19.super.a.en, ar: S14_NOT_PLURAL_19.super.a.ar },
      { type: "english", en: S14_NOT_PLURAL_19.super.b.en, ar: S14_NOT_PLURAL_19.super.b.ar },
      { type: "text", text: S14_NOT_PLURAL_19.super.notice },
      { type: "formulaStrip", items: S14_NOT_PLURAL_19.super.words },
      { type: "text", text: S14_NOT_PLURAL_19.super.diff },
      { type: "text", text: S14_NOT_PLURAL_19.super.butMeaning },
      { type: "apostropheVsPlural" },
    ],
  },

  // Grammar Detective
  {
    kind: "ex",
    section: HUNT,
    mascot: "🕵️",
    badge: "16",
    title: "Grammar Detective",
    subtitle: DETECTIVE_19.intro,
    ex: { type: "detective" },
  },

  // Challenge 1
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🧩",
    badge: "17",
    title: "Challenge 1 — اختر الصحيح",
    subtitle: "اختر الإجابة الصحيحة:",
    ex: { type: "challenge1" },
  },

  // Challenge 2
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🧩",
    badge: "18",
    title: "Challenge 2 — حوّل إلى Possessive",
    subtitle: "حوّل:",
    ex: { type: "challenge2" },
  },

  // IQ200 Challenge
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🚀",
    badge: "19",
    title: "IQ200 Challenge",
    subtitle: "حدد عدد المالكين ثم اكتب الملكية الصحيحة.",
    ex: { type: "iq200" },
  },

  // IQ200 — لغز المعنى
  {
    kind: "ex",
    section: CHALLENGES,
    mascot: "🧠",
    badge: "20",
    title: "IQ200 — لغز المعنى",
    subtitle: "انظر إلى الجملتين:",
    ex: { type: "meaningPuzzle" },
  },

  // FINAL BOSS
  {
    kind: "ex",
    section: FINAL,
    mascot: "🏆",
    badge: "21",
    title: "FINAL BOSS",
    subtitle: "اقرأ الفقرة، ثم أجب:",
    ex: { type: "finalBoss" },
  },

  // اختبار السرعة
  {
    kind: "ex",
    section: FINAL,
    mascot: "⚡",
    badge: "22",
    title: "اختبار السرعة",
    subtitle: "صحح دون تفكير طويل:",
    ex: { type: "speedTest" },
  },

  { kind: "summary", section: END, mascot: "🧠", title: "الخلاصة الكبرى" },
  { kind: "finalRule", section: END, mascot: "🔥", title: "قاعدة IQ200 النهائية" },
  { kind: "roadmap", section: END, mascot: "🗺️", title: "خريطة المنهج حتى الآن" },
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي — الدرس 19" },
  { kind: "closing", section: END, mascot: "🕵️", title: "أحسنت!" },
];

// ============================================================
// SOURCE_FIDELITY_MARKERS_19 — فهرس كامل لكل عنصر في المصدر
// يُستخدم للتحقق الآلي من أن أي قسم/مثال/تمرين/مفتاح حل لم يُحذف.
// ============================================================
export const SOURCE_FIDELITY_MARKERS_19: string[] = [
  ...SOURCE_SECTIONS,
  LESSON_TITLE_19,
  LESSON_SUBTITLE_19,
  ...COVER_19.recall16.lines,
  ...COVER_19.recall17.lines,
  COVER_19.example,
  COVER_19.meaningAr,
  ...COVER_19.words,
  ...OBJECTIVES_19.map((o) => o.text),
  S1_DEFINITION_19.term,
  S1_DEFINITION_19.meansAr,
  S1_DEFINITION_19.example,
  S1_DEFINITION_19.meaningAr,
  S1_DEFINITION_19.belongs,
  S1_DEFINITION_19.belongsAr,
  S1_BASIC_RULE_19.sayAr,
  S1_BASIC_RULE_19.correct,
  S1_BASIC_RULE_19.wrong,
  ...S1_BASIC_RULE_19.examples.flatMap((e) => [e.en, e.ar]),
  ...S2_THINKING_19.pairs.flatMap((p) => [p.poss, p.of, p.ar]),
  S2_IQ200_19.mark,
  S2_IQ200_19.question,
  S2_IQ200_19.example,
  S2_IQ200_19.questionAr,
  S2_IQ200_19.answer,
  S2_IQ200_19.result,
  S3_SINGULAR_19.formula,
  ...S3_SINGULAR_19.examples.flatMap((e) => [e.sing, e.poss]),
  ...S3_SINGULAR_19.sentences.flatMap((s) => [s.en, s.ar]),
  S3_SINGULAR_19.warning.example,
  S3_SINGULAR_19.warning.exampleAr,
  S3_SINGULAR_19.warning.alt,
  S3_SINGULAR_19.warning.final,
  S4_MULTI_19.example,
  S4_MULTI_19.result,
  S4_MULTI_19.compare.a.en,
  S4_MULTI_19.compare.a.ar,
  S4_MULTI_19.compare.b.en,
  S4_MULTI_19.compare.b.ar,
  S4_MULTI_19.compare.aDef,
  S4_MULTI_19.compare.bDef,
  S4_MULTI_19.fire.a.en,
  S4_MULTI_19.fire.a.ar,
  S4_MULTI_19.fire.b.en,
  S4_MULTI_19.fire.b.ar,
  S5_NUMBER_19.a.en,
  S5_NUMBER_19.a.ar,
  S5_NUMBER_19.b.en,
  S5_NUMBER_19.b.ar,
  S5_NUMBER_19.c.en,
  S5_NUMBER_19.c.ar,
  S5_NUMBER_19.d.en,
  S5_NUMBER_19.d.ar,
  S5_NUMBER_19.error.wrong,
  S5_NUMBER_19.error.note,
  S5_NUMBER_19.error.correct,
  ...S6_IRREGULAR_19.families,
  S6_IRREGULAR_19.explain,
  S6_IRREGULAR_19.child.singular,
  S6_IRREGULAR_19.child.possessive,
  S6_IRREGULAR_19.child.example,
  S6_IRREGULAR_19.child.exampleAr,
  S6_IRREGULAR_19.child.plural,
  S6_IRREGULAR_19.child.possessive2,
  S6_IRREGULAR_19.child.example2,
  S6_IRREGULAR_19.child.example2Ar,
  S6_IRREGULAR_19.compare.a.en,
  S6_IRREGULAR_19.compare.a.ar,
  S6_IRREGULAR_19.compare.b.en,
  S6_IRREGULAR_19.compare.b.ar,
  ...S6_IRREGULAR_19.keyPoint.words,
  S6_IRREGULAR_19.keyPoint.wrong,
  S6_IRREGULAR_19.keyPoint.correct,
  S6_IRREGULAR_19.keyPoint.reason,
  ...Object.values(IRREGULAR_FAMILIES_19).flatMap((f) => [
    f.sing,
    f.plural,
    f.singPoss,
    f.plPoss,
    f.singEx,
    f.singExAr,
    f.plEx,
    f.plExAr,
  ]),
  S10_TEETH_FEET_19.toothPair,
  "The tooth's shape.",
  "شكل السن.",
  "The teeth's condition.",
  "حالة الأسنان.",
  S10_TEETH_FEET_19.toothNote,
  S10_TEETH_FEET_19.footPair,
  S10_TEETH_FEET_19.footSing.en,
  S10_TEETH_FEET_19.footSing.ar,
  S10_TEETH_FEET_19.footPl.en,
  S10_TEETH_FEET_19.footPl.ar,
  ...RULE_SYSTEM_19.cases.flatMap((c) => [c.title, c.word, c.poss, c.example]),
  GOLDEN_TABLE_19.singularHead,
  ...GOLDEN_TABLE_19.singular.flatMap((r) => [r.sing, r.poss]),
  GOLDEN_TABLE_19.pluralHead,
  ...GOLDEN_TABLE_19.plural.flatMap((r) => [r.sing, r.poss]),
  ...APOSTROPHE_MACHINE_19.flatMap((m) => [m.mode, m.add, ...m.examples.flatMap((e) => [e.word, e.result])]),
  S11_NOT_OWNING_19.explain,
  ...S11_NOT_OWNING_19.examples.flatMap((e) => [e.en, e.ar]),
  ...S11_NOT_OWNING_19.kinds,
  S12_VS_ADJ_19.a,
  S12_VS_ADJ_19.b,
  S12_VS_ADJ_19.bothMean,
  ...S12_VS_ADJ_19.aBreakdown.flatMap((b) => [b.word, b.role]),
  ...S12_VS_ADJ_19.bBreakdown.flatMap((b) => [b.word, b.role]),
  S12_VS_ADJ_19.full.start,
  S12_VS_ADJ_19.full.middle,
  S12_VS_ADJ_19.full.end,
  ...S12_VS_ADJ_19.full.ways,
  ...S13_THREE_SYSTEMS_19.systems.flatMap((s) => [s.label, s.en, s.ar]),
  ...S13_THREE_SYSTEMS_19.another.lines,
  ...S13_THREE_SYSTEMS_19.plural.lines,
  ...THREE_SYSTEM_MACHINE_19.flatMap((m) => [m.noun, m.adj, m.pron]),
  S14_NOT_PLURAL_19.rule,
  S14_NOT_PLURAL_19.wrong,
  S14_NOT_PLURAL_19.meansAr,
  S14_NOT_PLURAL_19.example,
  S14_NOT_PLURAL_19.exampleAr,
  S14_NOT_PLURAL_19.but2,
  S14_NOT_PLURAL_19.but2Ar,
  S14_NOT_PLURAL_19.notice1,
  S14_NOT_PLURAL_19.notice2,
  ...APOSTROPHE_PLURAL_19.flatMap((s) => [s.en, s.ar]),
  S14_NOT_PLURAL_19.super.one,
  S14_NOT_PLURAL_19.super.two,
  S14_NOT_PLURAL_19.super.a.en,
  S14_NOT_PLURAL_19.super.a.ar,
  S14_NOT_PLURAL_19.super.b.en,
  S14_NOT_PLURAL_19.super.b.ar,
  ...S14_NOT_PLURAL_19.super.words,
  S14_NOT_PLURAL_19.super.diff,
  S14_NOT_PLURAL_19.super.butMeaning,
  DETECTIVE_19.intro,
  ...DETECTIVE_19.sentences.flatMap((s) => [s.wrong, s.correct, ...(s.note ? [s.note] : [])]),
  CHALLENGE1_19.intro,
  ...CHALLENGE1_19.questions.flatMap((q) => [q.context, ...q.options]),
  CHALLENGE2_19.intro,
  ...CHALLENGE2_19.items.flatMap((it) => [it.of, it.answer]),
  IQ200_CHALLENGE_19.intro,
  ...IQ200_CHALLENGE_19.items.flatMap((it) => [it.count, it.word, it.answer]),
  IQ200_MEANING_19.a,
  IQ200_MEANING_19.b,
  IQ200_MEANING_19.no,
  IQ200_MEANING_19.firstWord,
  IQ200_MEANING_19.firstMean,
  IQ200_MEANING_19.secondWord,
  IQ200_MEANING_19.secondMean,
  IQ200_MEANING_19.c,
  IQ200_MEANING_19.d,
  IQ200_MEANING_19.first2Mean,
  IQ200_MEANING_19.second2Mean,
  IQ200_MEANING_19.fire,
  FINAL_BOSS_19.passage,
  ...FINAL_BOSS_19.questions.flatMap((q) => [q.q, q.a]),
  SPEED_TEST_19.intro,
  ...SPEED_TEST_19.sentences.flatMap((s) => [s.en, ...(s.correct ? [s.correct] : [])]),
  SPEED_TEST_19.note1.en,
  SPEED_TEST_19.note1.ar,
  SPEED_TEST_19.note2.en,
  SPEED_TEST_19.note2.ar,
  ...SUMMARY_19.groups.flatMap((g) => [g.title, ...g.examples]),
  FINAL_RULE_19.lead,
  FINAL_RULE_19.q1,
  FINAL_RULE_19.q1b,
  FINAL_RULE_19.q2,
  FINAL_RULE_19.ifText,
  ...FINAL_RULE_19.mapping.flatMap((m) => [m.cond, m.mark]),
  ...ROADMAP_19.map((r) => r.en),
  ROADMAP_19_CLOSING,
  ...OWNERSHIP_SYSTEM_19.flat(),
  NEXT_STEP_19,
];

/** الأخطاء المقصودة في المصدر — تبقى كما هي للتدريب عليها. */
export const INTENTIONALLY_WRONG_19: string[] = [
  "Ali book ❌",
  "The students's books ❌",
  "childrens' ❌",
  "book's ❌",
  "The childs toy is broken.",
  "The childrens toys are outside.",
  "The boys's room is large.",
  "The girls bag is red.",
  "The students's books are on the desk.",
  "I like the dogs' tail.",
  "The woman bag is expensive.",
  "The mens shoes are black.",
  "the boys bike",
  "the boys's bikes",
  "the childrens' toy",
  "the child toy",
  "the childs' toys",
  "the childrens toys",
  "The boy's are playing.",
  "The boys' are playing.",
  "The childrens' books are new.",
];
