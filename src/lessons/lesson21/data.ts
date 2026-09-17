// ============================================================
// الدرس 21 — There is / There are
// المصدر المورّد هو المرجع الحرفي: لا اختصار ولا إعادة صياغة ولا حذف.
// كل وحدة إنجليزية ستُعرض داخل عازل LTR في Lesson21.tsx.
// ============================================================

// -------------------- فهرس المصدر الكامل (48 قسماً) --------------------
export const SOURCE_SECTIONS: string[] = [
  "أهداف الدرس",
  "ما معنى There is / There are؟",
  "لماذا نحتاج هذه القاعدة؟",
  "الفرق في طريقة التفكير",
  "There is + اسم مفرد",
  "انتبه إلى A / AN",
  "There are + الجمع",
  "هنا نستخدم كل ما تعلمناه عن الجمع",
  "There is + المكان",
  "There are + المكان",
  "تركيب الجملة",
  "النفي",
  "الاختصارات",
  "الأسئلة",
  "Short Answers",
  "خطأ مهم",
  "There is vs It is",
  "There is vs This is",
  "Some مع There are",
  "Any مع النفي والأسئلة",
  "Some مع المفرد؟",
  "الأرقام",
  "الكميات الكبيرة",
  "الأماكن الكبيرة",
  "وصف مشهد",
  "سؤال وجواب داخل وصف المكان",
  "IQ200: وصف ثم تحقيق",
  "There is + غير المعدود",
  "There is مع a/an وsome",
  "ترتيب الجملة",
  "ربطه بدرس الصفات",
  "ربطه بملكية الأسماء",
  "ربطه بـ This / That / These / Those",
  "الفرق في مثال واحد",
  "أخطاء شائعة جدًا",
  "Grammar Detective",
  "الحل",
  "Challenge 1 — أكمل",
  "Challenge 2 — اختر",
  "Challenge 3 — حوّل إلى النفي",
  "Challenge 4 — حوّل إلى سؤال",
  "IQ200 Challenge",
  "IQ200 Challenge 2",
  "FINAL BOSS",
  "الخلاصة الذهبية",
  "الخريطة العقلية",
  "الربط مع ما تعلمناه",
  "خريطة المنهج",
];

export const SOURCE_NUMBERED_COUNT = 48;

export const LESSON_TITLE_21 = "الدرس 21: There is / There are";
export const LESSON_SUBTITLE_21 = "There is / There are";
export const LESSON_ARABIC_TITLE_21 = "يوجد / توجد — وصف وجود الأشياء والأشخاص";
export const LAB_NAME_21 = "SCENE DETECTIVE LAB";
export const LAB_MOTTO_21 =
  "ONE or MORE? WHAT exists? WHERE is it? IS / ARE? → affirmative → negative → question → answer.";
export const COVER_INTRO_21 =
  "هذا الدرس مهم جدًا لأنك ستستخدمه باستمرار عندما تريد وصف:";
export const COVER_INTRO_LIST_21 = [
  "غرفة",
  "منزل",
  "مدينة",
  "مدرسة",
  "حديقة",
  "شارع",
  "صورة",
  "مكان",
  "أو أي مشهد أمامك.",
];
export const COVER_FROM_21 = {
  label: "سننتقل من:",
  en: "This is a book.",
  ar: "هذا كتاب.",
};
export const COVER_TO_21 = {
  label: "إلى:",
  en: "There is a book on the table.",
  ar: "يوجد كتاب على الطاولة.",
};
export const COVER_NOTE_21 = "والفرق بين الجملتين مهم جدًا.";

// -------------------- أهداف الدرس --------------------
export const OBJECTIVES_21 = [
  { n: "①", text: "فهم معنى There is وThere are." },
  { n: "②", text: "معرفة متى نستخدم is ومتى نستخدم are." },
  { n: "③", text: "استخدامهما مع المفرد والجمع." },
  { n: "④", text: "استخدامهما مع الأماكن." },
  { n: "⑤", text: "تكوين الجمل المثبتة." },
  { n: "⑥", text: "تكوين الجمل المنفية." },
  { n: "⑦", text: "تكوين الأسئلة." },
  { n: "⑧", text: "استخدام Some وAny مع There is / There are." },
  { n: "⑨", text: "استخدام أرقام وكميات مختلفة." },
  { n: "⑩", text: "استخدام There is / There are مع أسماء الجمع الشاذة." },
  { n: "⑪", text: "التمييز بين:", items: ["There is...", "It is...", "This is..."] },
  { n: "⑫", text: "وصف صورة أو غرفة أو مكان كامل." },
  { n: "⑬", text: "اكتشاف الأخطاء الشائعة." },
  { n: "⑭", text: "بناء جمل مركبة بمستوى IQ200." },
] as const;

// -------------------- 1. ما معنى There is / There are؟ --------------------
export const MEANING_21 = {
  simple: "بشكل بسيط جدًا:",
  isLine: { en: "There is", ar: "= يوجد / توجد لشيء مفرد." },
  areLine: { en: "There are", ar: "= يوجد / توجد لأكثر من شيء." },
  exampleLabel: "مثال:",
  exampleIs: { en: "There is a book.", ar: "يوجد كتاب." },
  exampleAre: { en: "There are two books.", ar: "يوجد كتابان / يوجد كتابان." },
  goldenTitle: "⭐ القاعدة الذهبية",
  singularLabel: "مفرد:",
  singular: "There is + Singular Noun",
  pluralLabel: "جمع:",
  plural: "There are + Plural Noun",
};

// -------------------- 2. لماذا نحتاج هذه القاعدة؟ --------------------
export const WHY_21 = {
  compare: "قارن:",
  first: { en: "This is a book.", ar: "هذا كتاب." },
  withLabel: "مع:",
  second: { en: "There is a book on the table.", ar: "يوجد كتاب على الطاولة." },
  firstSentence: "الجملة الأولى:",
  firstForm: "This is...",
  firstMeaning: "تُشير إلى شيء محدد.",
  secondSentence: "الجملة الثانية:",
  secondForm: "There is...",
  secondMeaning: "تخبرنا أن شيئًا موجود في مكان ما.",
};

// -------------------- 3. الفرق في طريقة التفكير --------------------
export const THINKING_21 = {
  title: "🔥 الفرق في طريقة التفكير",
  pointing: { en: "This is a book.", ar: "أنا أشير إلى الكتاب." },
  existence: {
    en: "There is a book on the table.",
    ar: "أنا أخبرك أن هناك كتابًا موجودًا على الطاولة.",
  },
};

// -------------------- 4. There is + اسم مفرد --------------------
export const SINGULAR_EXAMPLES_21 = {
  examplesLabel: "أمثلة:",
  examples: [
    { en: "There is a cat in the garden.", ar: "يوجد قط في الحديقة." },
    { en: "There is a computer on the desk.", ar: "يوجد حاسوب على المكتب." },
    { en: "There is a tree near the house.", ar: "توجد شجرة قرب المنزل." },
    { en: "There is an apple in the basket.", ar: "توجد تفاحة في السلة." },
    { en: "There is a strange noise outside.", ar: "يوجد صوت غريب في الخارج." },
  ],
};

// -------------------- 5. انتبه إلى A / AN --------------------
export const AN_21 = {
  title: "⭐ انتبه إلى A / AN",
  lead: "لأن الاسم مفرد ومعدود، يمكن أن نستخدم:",
  a: "a",
  or: "أو",
  an: "an",
  exampleLabel: "مثال:",
  words: [
    { word: "dog", article: "a", en: "There is a dog." },
    { word: "bird", article: "a", en: "There is a bird." },
    { word: "orange", article: "an", en: "There is an orange." },
    { word: "umbrella", article: "an", en: "There is an umbrella." },
  ],
  dontSay: "ولا نقول:",
  wrong: ["There is dog. ❌", "There is apple. ❌"],
  correctLabel: "الصحيح:",
  fixed: ["There is a dog. ✅", "There is an apple. ✅"],
};

// -------------------- 6. There are + الجمع --------------------
export const PLURAL_EXAMPLES_21 = {
  lead: "عندما يكون الاسم جمعًا:",
  formula: "There are + plural noun",
  examplesLabel: "أمثلة:",
  examples: [
    { en: "There are two cats in the garden.", ar: "يوجد قطان في الحديقة." },
    { en: "There are five books on the shelf.", ar: "توجد خمسة كتب على الرف." },
    { en: "There are three windows in the room.", ar: "توجد ثلاث نوافذ في الغرفة." },
    { en: "There are many students in the classroom.", ar: "يوجد العديد من الطلاب في الصف." },
  ],
  compareTitle: "🔥 قارن",
  compare: [
    { en: "There is a book.", ar: "يوجد كتاب واحد." },
    { en: "There are three books.", ar: "توجد ثلاثة كتب." },
    { en: "There is a child in the room.", ar: "يوجد طفل في الغرفة." },
    { en: "There are three children in the room.", ar: "يوجد ثلاثة أطفال في الغرفة." },
  ],
};

// -------------------- 7. هنا نستخدم كل ما تعلمناه عن الجمع --------------------
export const IRREGULAR_21 = {
  remember: "تذكر:",
  pairs: [
    "child → children",
    "woman → women",
    "man → men",
    "person → people",
    "mouse → mice",
  ],
  now: "والآن:",
  rows: [
    {
      is: "There is one child in the park.",
      isAr: "يوجد طفل واحد في الحديقة.",
      but: "لكن:",
      are: "There are three children in the park.",
      areAr: "يوجد ثلاثة أطفال في الحديقة.",
    },
    {
      is: "There is one woman outside.",
      isAr: "توجد امرأة واحدة في الخارج.",
      are: "There are two women outside.",
      areAr: "توجد امرأتان في الخارج.",
    },
    {
      is: "There is one mouse under the table.",
      isAr: "يوجد فأر واحد تحت الطاولة.",
      are: "There are four mice under the table.",
      areAr: "توجد أربعة فئران تحت الطاولة.",
    },
  ],
  closing: "🔥 لاحظ كيف أصبح درس 18 ضروريًا لفهم درس 21.",
};

// -------------------- 8. There is + المكان --------------------
export const PLACE_21 = {
  lead: "يمكن أن نضيف عبارة مكان.",
  like: "مثل:",
  preps: [
    { en: "in", ar: "في" },
    { en: "on", ar: "على" },
    { en: "under", ar: "تحت" },
    { en: "near", ar: "قرب" },
    { en: "behind", ar: "خلف" },
    { en: "in front of", ar: "أمام" },
    { en: "next to", ar: "بجانب" },
    { en: "between", ar: "بين" },
  ],
  examplesLabel: "أمثلة:",
  examples: [
    { en: "There is a lamp on the table.", ar: "يوجد مصباح على الطاولة." },
    { en: "There is a bag under the chair.", ar: "توجد حقيبة تحت الكرسي." },
    { en: "There is a bicycle near the door.", ar: "توجد دراجة قرب الباب." },
    { en: "There is a cat behind the sofa.", ar: "يوجد قط خلف الأريكة." },
    { en: "There is a picture above the bed.", ar: "توجد صورة فوق السرير." },
  ],
};

// -------------------- 9. There are + المكان --------------------
export const PLURAL_PLACE_21 = {
  lead: "نفس الفكرة مع الجمع:",
  examples: [
    { en: "There are books on the desk.", ar: "توجد كتب على المكتب." },
    { en: "There are shoes under the bed.", ar: "توجد أحذية تحت السرير." },
    { en: "There are trees behind the house.", ar: "توجد أشجار خلف المنزل." },
    { en: "There are two chairs next to the window.", ar: "يوجد كرسيان بجانب النافذة." },
  ],
};

// -------------------- 10. تركيب الجملة --------------------
export const CONSTRUCTION_21 = {
  lead: "يمكننا التفكير في الجملة هكذا:",
  singular: "There is + thing + place",
  plural: "There are + things + place",
  exampleLabel: "مثال:",
  examples: ["There is a robot in the laboratory.", "There are three robots in the laboratory."],
};

// -------------------- 11. النفي --------------------
export const NEGATIVE_21 = {
  lead: "الآن سنستخدم ما تعلمناه عن Verb to be.",
  full: ["There is not...", "There are not..."],
  singularLabel: "المفرد",
  singularFull: { en: "There is not a computer here.", ar: "لا يوجد حاسوب هنا." },
  canShort: "يمكن اختصارها:",
  singularShort: { en: "There isn't a computer here." },
  pluralLabel: "الجمع",
  pluralFull: { en: "There are not any computers here.", ar: "لا توجد أي حواسيب هنا." },
  shortLabel: "الاختصار:",
  pluralShort: { en: "There aren't any computers here." },
};

// -------------------- 12. الاختصارات --------------------
export const CONTRACTIONS_21 = {
  title: "⭐ الاختصارات",
  pairs: ["There is not → There isn't", "There are not → There aren't"],
  examplesLabel: "أمثلة",
  examples: [
    { en: "There isn't a car outside.", ar: "لا توجد سيارة في الخارج." },
    { en: "There isn't a teacher in the room.", ar: "لا يوجد معلم في الغرفة." },
    { en: "There aren't any students here.", ar: "لا يوجد أي طلاب هنا." },
    { en: "There aren't any chairs in the room.", ar: "لا توجد أي كراسٍ في الغرفة." },
  ],
};

// -------------------- 13. الأسئلة --------------------
export const QUESTIONS_21 = {
  want: "نريد الآن أن نسأل:",
  ask: "هل يوجد...؟",
  place: "نضع:",
  isForm: { en: "Is there...?", ar: "للمفرد." },
  areForm: { en: "Are there...?", ar: "للجمع." },
  singularLabel: "مفرد",
  singular: [
    { en: "Is there a bathroom upstairs?", ar: "هل يوجد حمام في الطابق العلوي؟" },
    { en: "Is there a computer on the desk?", ar: "هل يوجد حاسوب على المكتب؟" },
  ],
  pluralLabel: "جمع",
  plural: [
    { en: "Are there any books here?", ar: "هل توجد أي كتب هنا؟" },
    { en: "Are there two windows in the room?", ar: "هل توجد نافذتان في الغرفة؟" },
  ],
  ruleTitle: "⭐ القاعدة",
  rule: ["There is... ↓ Is there...?", "There are... ↓ Are there...?"],
};

// -------------------- 14. Short Answers --------------------
export const SHORT_ANSWERS_21 = {
  use: "نستخدم:",
  forms: ["Yes, there is.", "No, there isn't."],
  singularLabel: "للمفرد:",
  singularQ: { en: "Is there a problem?", yes: "Yes, there is.", no: "No, there isn't." },
  pluralLabel: "للجمع:",
  pluralQ: { en: "Are there any students?", yes: "Yes, there are.", no: "No, there aren't." },
};

// -------------------- 15. خطأ مهم --------------------
export const IMPORTANT_MISTAKE_21 = {
  title: "🚨 خطأ مهم",
  questionLabel: "السؤال:",
  question: "Is there a book?",
  dontLabel: "لا تجب:",
  wrong: "Yes, it is. ❌",
  correctLabel: "الصحيح:",
  correct: "Yes, there is. ✅",
  because: "لأن السؤال عن وجود شيء باستخدام There is.",
};

// -------------------- 16. There is vs It is --------------------
export const IS_VS_IT_21 = {
  important: "هذه نقطة مهمة جدًا.",
  thereIs: { word: "There is", meaning: "نتحدث عن وجود شيء." },
  exampleIs: { en: "There is a cat in the garden.", ar: "يوجد قط في الحديقة." },
  itIs: { word: "It is", meaning: "نتحدث عن شيء محدد أو نصفه." },
  exampleIt: { en: "It is black.", ar: "إنه أسود." },
  sequenceTitle: "🔥 لاحظ التسلسل:",
  sequence: ["أولًا نخبرك أن الشيء موجود.", "ثم نستطيع استخدام It للإشارة إليه."],
};

// -------------------- 17. There is vs This is --------------------
export const THIS_VS_THERE_21 = {
  compare: "قارن:",
  pairs: [
    {
      thisIs: { en: "This is a laptop.", ar: "هذا حاسوب محمول." },
      thereIs: { en: "There is a laptop on the table.", ar: "يوجد حاسوب محمول على الطاولة." },
    },
    {
      thisIs: { en: "This is my laptop.", ar: "هذا حاسوبي المحمول." },
      thereIs: { en: "There is a laptop in my room.", ar: "يوجد حاسوب محمول في غرفتي." },
    },
  ],
  ideaTitle: "الفكرة:",
  idea: [
    { en: "This is...", ar: "= هذا الشيء هو..." },
    { en: "There is...", ar: "= يوجد شيء..." },
  ],
};

// -------------------- 18. Some مع There are --------------------
export const SOME_21 = {
  lead: "عندما لا نحدد عددًا دقيقًا، يمكن أن نستخدم:",
  some: { en: "some", ar: "= بعض / عدد من" },
  exampleLabel: "مثال:",
  examples: [
    { en: "There are some books on the table.", ar: "توجد بعض الكتب على الطاولة." },
    { en: "There are some students outside.", ar: "يوجد بعض الطلاب في الخارج." },
    { en: "There are some apples in the basket.", ar: "توجد بعض التفاحات في السلة." },
  ],
};

// -------------------- 19. Any مع النفي والأسئلة --------------------
export const ANY_21 = {
  lead: "غالبًا نستخدم:",
  any: "any",
  context: "في الأسئلة والنفي مع الجمع.",
  examples: [
    { en: "Are there any books?", ar: "هل توجد أي كتب؟" },
    { en: "Are there any students outside?", ar: "هل يوجد أي طلاب في الخارج؟" },
    { en: "There aren't any books.", ar: "لا توجد أي كتب." },
    { en: "There aren't any students outside.", ar: "لا يوجد أي طلاب في الخارج." },
  ],
  systemTitle: "⭐ نظام مهم جدًا",
  system: [
    { label: "إثبات:", en: "There are some books." },
    { label: "نفي:", en: "There aren't any books." },
    { label: "سؤال:", en: "Are there any books?" },
  ],
};

// -------------------- 20. Some مع المفرد؟ --------------------
export const SOME_SINGULAR_21 = {
  lead: "في هذا المستوى سنستخدم some غالبًا مع الجمع المعدود:",
  someWords: ["some books", "some students", "some apples", "some chairs"],
  butLabel: "أما المفرد المعدود فعادةً نستخدم:",
  aAn: "a / an",
  examples: ["There is a book.", "There is an apple."],
};

// -------------------- 21. الأرقام --------------------
export const NUMBERS_21 = {
  lead: "يمكننا استخدام أي عدد مناسب.",
  numbers: [
    { n: "one", en: "There is one chair." },
    { n: "two", en: "There are two chairs." },
    { n: "seven", en: "There are seven chairs." },
    { n: "twenty", en: "There are twenty chairs." },
  ],
  warning: "لكن انتبه:",
  wrong: "There is two chairs. ❌",
  because: "لأن two = جمع.",
  correctLabel: "الصحيح:",
  correct: "There are two chairs. ✅",
};

// -------------------- 22. الكميات الكبيرة --------------------
export const BIG_QUANTITIES_21 = {
  examples: [
    { en: "There are many students here.", ar: "يوجد العديد من الطلاب هنا." },
    { en: "There are a lot of cars outside.", ar: "يوجد الكثير من السيارات في الخارج." },
    { en: "There are several trees in the park.", ar: "توجد عدة أشجار في الحديقة." },
  ],
  later: "وسنتوسع لاحقًا في:",
  words: ["many", "much", "a lot of", "few", "little"],
  because: "لأنها ستصبح جزءًا من درس Quantifiers.",
};

// -------------------- 23. الأماكن الكبيرة --------------------
export const BIG_PLACES_21 = {
  lead: "يمكن استخدام There is / There are لوصف مكان كامل.",
  exampleLabel: "مثال:",
  sentences: [
    "There is a large window in my bedroom.",
    "There is a desk near the window.",
    "There are two chairs beside the desk.",
    "There are some books on the shelf.",
    "There is a small lamp on the desk.",
    "There are pictures on the wall.",
  ],
  notice: "🔥 لاحظ أننا نستطيع بناء وصف كامل باستخدام القاعدة.",
};

// -------------------- 24. وصف مشهد --------------------
export const SCENE_21 = {
  imagine: "تخيل غرفة:",
  items: [
    { emoji: "🛏️", ar: "سرير", en: "There is a bed in the room." },
    { emoji: "🪑", ar: "كرسيان", en: "There are two chairs." },
    { emoji: "💡", ar: "مصباح", en: "There is a lamp next to the bed." },
    { emoji: "📚", ar: "خمسة كتب", en: "There are five books on the desk." },
    { emoji: "🖼️", ar: "ثلاث صور", en: "There are three pictures on the wall." },
  ],
  nowDescribe: "والآن نصفها:",
};

// -------------------- 25. سؤال وجواب داخل وصف المكان --------------------
export const SCENE_QA_21 = {
  pairs: [
    { q: "Is there a desk in the room?", a: "Yes, there is." },
    { q: "Is there a television?", a: "No, there isn't." },
    { q: "Are there any books?", a: "Yes, there are." },
    { q: "Are there any computers?", a: "No, there aren't." },
  ],
};

// -------------------- 26. IQ200: وصف ثم تحقيق --------------------
export const INVESTIGATION_21 = {
  title: "🔥 IQ200: وصف ثم تحقيق",
  roomLabel: "لدينا الغرفة التالية:",
  scene: [
    "There is a desk near the window.",
    "There are two chairs beside the desk.",
    "There is a laptop on the desk.",
    "There are three books next to the laptop.",
    "There is a lamp behind the laptop.",
    "There aren't any pictures on the wall.",
  ],
  askLabel: "الآن اسأل نفسك:",
  questions: [
    "Is there a desk?",
    "Are there two chairs?",
    "Is there a laptop?",
    "Are there four books?",
    "Is there a lamp?",
    "Are there any pictures?",
  ],
  answersLabel: "الإجابات:",
  answers: [
    "Yes, there is.",
    "Yes, there are.",
    "Yes, there is.",
    "No, there aren't.",
    "Yes, there is.",
    "No, there aren't.",
  ],
};

// -------------------- 27. There is + غير المعدود --------------------
export const UNCOUNTABLE_21 = {
  advanced: "هنا نصل إلى نقطة متقدمة قليلًا.",
  lead: "بعض الأسماء لا نعدها عادةً كأشياء منفصلة، مثل:",
  words: ["water", "milk", "rice", "money", "information"],
  canSay: "يمكن أن نقول:",
  examples: [
    { en: "There is some water in the bottle.", ar: "يوجد بعض الماء في الزجاجة." },
    { en: "There is some milk in the fridge.", ar: "يوجد بعض الحليب في الثلاجة." },
  ],
  dontSay: "ولا نقول في الاستخدام الأساسي:",
  wrong: "There are some water. ❌",
  because: "لأن water غير معدود.",
  later: "سنأخذ Countable / Uncountable بشكل مستقل وبعمق لاحقًا، لذلك لا نريد تحميل هذا الدرس كل التفاصيل الآن.",
  but: "لكن يجب أن تعرف الفكرة الأساسية.",
};

// -------------------- 28. There is مع a/an وsome --------------------
export const A_AN_SOME_21 = {
  compare: "قارن:",
  examples: [
    { en: "There is a bottle.", ar: "يوجد زجاجة." },
    { en: "There is some water.", ar: "يوجد بعض الماء." },
    { en: "There are three bottles.", ar: "توجد ثلاث زجاجات." },
    { en: "There are some bottles.", ar: "توجد بعض الزجاجات." },
  ],
};

// -------------------- 29. ترتيب الجملة --------------------
export const ORDER_21 = {
  formulaLead: "التركيب الأساسي:",
  formula: "There + is/are + noun + place",
  exampleLabel: "مثال:",
  examples: ["There is a book on the table.", "There are two books on the table."],
  details: "ويمكن أن نضيف تفاصيل:",
  detail: { en: "There is a small blue book on the wooden table.", ar: "يوجد كتاب أزرق صغير على الطاولة الخشبية." },
  hereTitle: "🔥 هنا نستخدم:",
  parts: ["There is", "Article", "Adjective", "Noun", "Place"],
};

// -------------------- 30. ربطه بدرس الصفات --------------------
export const ADJECTIVE_LINK_21 = {
  learned: "تعلمنا:",
  learnedWords: ["a small house", "a beautiful garden", "an old computer"],
  now: "والآن:",
  examples: [
    "There is a small house near the river.",
    "There is a beautiful garden behind the house.",
    "There is an old computer on the desk.",
  ],
};

// -------------------- 31. ربطه بملكية الأسماء --------------------
export const POSSESSION_LINK_21 = {
  learned: "تعلمنا:",
  learnedWords: ["Ali's bag", "Sara's phone", "the children's toys"],
  now: "والآن:",
  examples: [
    "There is Ali's bag on the chair.",
    "There is Sara's phone on the desk.",
    "There are the children's toys in the box.",
  ],
  note: "لكن في الاستخدام الطبيعي قد نعيد صياغة بعض الجمل حسب السياق؛ المهم الآن أن تفهم أن There is / are يمكن أن تدخل ضمن جمل تحتوي على الملكية.",
};

// -------------------- 32. ربطه بـ This / That / These / Those --------------------
export const DEMONSTRATIVE_LINK_21 = {
  strong: "هذه نقطة قوية جدًا.",
  nearBook: "هناك كتاب على الطاولة.",
  canSay: "يمكن أن نقول:",
  nearBookEn: "There is a book on the table.",
  pointTo: "وعندما نشير إليه:",
  thisIsTheBook: { en: "This is the book.", ar: "هذا هو الكتاب." },
  farBooks: "هناك كتب على الطاولة:",
  farBooksEn: "There are some books on the table.",
  pointToThem: "وعندما نشير إليها:",
  theseAreTheBooks: { en: "These are the books.", ar: "هذه هي الكتب." },
  far: "بعيدًا:",
  thatIs: "That is the book.",
  thoseAre: "Those are the books.",
  thereforeTitle: "🔥 إذن:",
  therefore: [
    { en: "There is / are", ar: "يخبرنا عن وجود الشيء." },
    { en: "This / That / These / Those", ar: "تشير إلى الشيء." },
  ],
};

// -------------------- 33. الفرق في مثال واحد --------------------
export const SCENE_CHAIN_21 = {
  chain: [
    {
      en: "There is a red car outside.",
      ar: "يوجد سيارة حمراء في الخارج.",
      role: "وجود",
      roleEn: "Existence",
    },
    {
      en: "This is the red car.",
      ar: "هذه هي السيارة الحمراء.",
      role: "تحديد",
      roleEn: "Identification",
    },
    {
      en: "It is very expensive.",
      ar: "إنها غالية جدًا.",
      role: "وصف",
      roleEn: "Description",
    },
    {
      en: "The car is Sara's.",
      ar: "السيارة لسارة.",
      role: "ملكية",
      roleEn: "Possession",
    },
  ],
  closing: "🔥 هذه سلسلة كاملة من الدروس السابقة داخل مشهد واحد.",
};

// -------------------- 34. أخطاء شائعة جدًا --------------------
export const COMMON_ERRORS_21 = {
  title: "🚨 أخطاء شائعة جدًا",
  errors: [
    { n: "1", label: "الخطأ 1", wrong: "There are a book. ❌", correct: "There is a book. ✅" },
    { n: "2", label: "الخطأ 2", wrong: "There is two books. ❌", correct: "There are two books. ✅" },
    { n: "3", label: "الخطأ 3", wrong: "There is many students. ❌", correct: "There are many students. ✅" },
    { n: "4", label: "الخطأ 4", wrong: "Is there two chairs? ❌", correct: "Are there two chairs? ✅" },
    { n: "5", label: "الخطأ 5", wrong: "Are there a computer? ❌", correct: "Is there a computer? ✅" },
    {
      n: "6",
      label: "الخطأ 6",
      wrong: "Yes, it is.",
      wrongNote: "كإجابة عن:",
      wrongQ: "Is there a book?",
      wrongMark: "❌",
      correct: "Yes, there is. ✅",
    },
    {
      n: "7",
      label: "الخطأ 7",
      wrong: "There are a water bottle. ❌",
      correctNote: "إذا كان المقصود زجاجة واحدة:",
      correct: "There is a water bottle. ✅",
    },
  ],
};

// -------------------- 35. Grammar Detective --------------------
export const GRAMMAR_DETECTIVE_21 = {
  intro: "صحح الجمل:",
  sentences: [
    { n: "①", wrong: "There are a cat under the table.", correct: "There is a cat under the table." },
    { n: "②", wrong: "There is three students outside.", correct: "There are three students outside." },
    { n: "③", wrong: "There are a computer on the desk.", correct: "There is a computer on the desk." },
    { n: "④", wrong: "Is there two windows?", correct: "Are there two windows?" },
    { n: "⑤", wrong: "Are there a teacher in the classroom?", correct: "Is there a teacher in the classroom?" },
    { n: "⑥", wrong: "There is many books on the shelf.", correct: "There are many books on the shelf." },
    { n: "⑦", wrong: "There isn't any chairs here.", correct: "There aren't any chairs here." },
    { n: "⑧", wrong: "There aren't a chair in the room.", correct: "There isn't a chair in the room." },
    { n: "⑨", wrong: "Yes, it is.", wrongNote: "جواب عن", wrongQ: "Is there a problem?", correct: "Yes, there is." },
    { n: "⑩", wrong: "There is two children in the garden.", correct: "There are two children in the garden." },
  ],
};

// -------------------- 36. الحل --------------------
export const SOLUTIONS_21 = [
  "There is a cat under the table.",
  "There are three students outside.",
  "There is a computer on the desk.",
  "Are there two windows?",
  "Is there a teacher in the classroom?",
  "There are many books on the shelf.",
  "There aren't any chairs here.",
  "There isn't a chair in the room.",
  "Yes, there is.",
  "There are two children in the garden.",
];

// -------------------- 37. Challenge 1 — أكمل --------------------
export const CHALLENGE1_21 = {
  intro: "استخدم:",
  words: ["There is", "There are"],
  options: ["There is", "There are"],
  questions: [
    { n: "①", stem: "______ a book on the desk.", answer: 0 },
    { n: "②", stem: "______ three pencils in the bag.", answer: 1 },
    { n: "③", stem: "______ a strange sound outside.", answer: 0 },
    { n: "④", stem: "______ five students in the room.", answer: 1 },
    { n: "⑤", stem: "______ a dog near the door.", answer: 0 },
    { n: "⑥", stem: "______ two bicycles in the garage.", answer: 1 },
    { n: "⑦", stem: "______ a child in the garden.", answer: 0 },
    { n: "⑧", stem: "______ four children in the garden.", answer: 1 },
  ],
};

// -------------------- 38. Challenge 2 — اختر --------------------
export const CHALLENGE2_21 = {
  questions: [
    { n: "①", stem: "______ a computer on the table.", a: "There is", b: "There are", answer: 0 },
    { n: "②", stem: "______ two computers on the table.", a: "There is", b: "There are", answer: 1 },
    { n: "③", stem: "______ a child in the park.", a: "There is", b: "There are", answer: 0 },
    { n: "④", stem: "______ three children in the park.", a: "There is", b: "There are", answer: 1 },
  ],
};

// -------------------- 39. Challenge 3 — حوّل إلى النفي --------------------
export const CHALLENGE3_21 = {
  intro: "حوّل إلى النفي",
  sentences: [
    {
      n: "①",
      source: "There is a dog outside.",
      answers: ["There isn't a dog outside.", "There is not a dog outside."],
    },
    {
      n: "②",
      source: "There are some books on the desk.",
      answers: ["There aren't any books on the desk.", "There are not any books on the desk."],
    },
    {
      n: "③",
      source: "There is a computer in the room.",
      answers: ["There isn't a computer in the room.", "There is not a computer in the room."],
    },
    {
      n: "④",
      source: "There are three chairs here.",
      answers: ["There aren't three chairs here.", "There are not three chairs here."],
    },
  ],
};

// -------------------- 40. Challenge 4 — حوّل إلى سؤال --------------------
export const CHALLENGE4_21 = {
  intro: "حوّل إلى سؤال",
  sentences: [
    { n: "①", source: "There is a restaurant nearby.", answers: ["Is there a restaurant nearby?"] },
    { n: "②", source: "There are two bathrooms upstairs.", answers: ["Are there two bathrooms upstairs?"] },
    { n: "③", source: "There is a problem.", answers: ["Is there a problem?"] },
    {
      n: "④",
      source: "There are some students outside.",
      answers: ["Are there any students outside?", "Are there some students outside?"],
    },
  ],
};

// -------------------- 41. IQ200 Challenge --------------------
export const IQ200_CHALLENGE_21 = {
  dontMemorize: "لا تحفظ.",
  logic: "حل بالمنطق.",
  givenLabel: "لدينا:",
  given: [
    { en: "one child", singular: true },
    { en: "three children", singular: false },
    { en: "one woman", singular: true },
    { en: "four women", singular: false },
    { en: "one mouse", singular: true },
    { en: "five mice", singular: false },
  ],
  task1: "اكتب ست جمل باستخدام:",
  useWords: ["There is", "There are"],
  task2: "ثم حوّل ثلاثًا منها إلى أسئلة.",
  task3: "ثم حوّل ثلاثًا منها إلى نفي.",
};

// -------------------- 42. IQ200 Challenge 2 (المطبخ) --------------------
export const KITCHEN_21 = {
  placeLabel: "أعطيتك هذا المكان:",
  scene: [
    "There is a large table in the kitchen.",
    "There are four chairs around the table.",
    "There is a bowl on the table.",
    "There are some apples in the bowl.",
    "There is a refrigerator next to the wall.",
    "There aren't any pictures on the wall.",
  ],
  answerLabel: "الآن أجب:",
  questions: [
    "Is there a table?",
    "Are there four chairs?",
    "Is there a bowl?",
    "Are there any apples?",
    "Is there a refrigerator?",
    "Are there any pictures?",
  ],
  answers: [
    "Yes, there is.",
    "Yes, there are.",
    "Yes, there is.",
    "Yes, there are.",
    "Yes, there is.",
    "No, there aren't.",
  ],
  newQuestions: "ثم اكتب سؤالين جديدين من عندك عن المطبخ.",
};

// -------------------- 43. FINAL BOSS --------------------
export const FINAL_BOSS_21 = {
  intro: "أنت الآن داخل غرفة غامضة. 🕵️",
  infoLabel: "المعلومات:",
  clues: [
    "يوجد مكتب بجانب النافذة.",
    "يوجد حاسوب على المكتب.",
    "توجد ثلاثة كتب بجانب الحاسوب.",
    "توجد حقيبة تحت المكتب.",
    "يوجد طفل في الغرفة.",
    "يوجد طفلان آخران خارج الغرفة.",
    "لا توجد صور على الجدار.",
    "توجد ساعة فوق الباب.",
  ],
  taskLead: "اكتب فقرة إنجليزية من 8 جمل باستخدام:",
  useWords: ["There is", "There are"],
  tryLabel: "وحاول أن تستخدم على الأقل:",
  requirements: [
    { n: "①", text: "a / an", english: true },
    { n: "②", text: "some", english: true },
    { n: "③", text: "not / aren't", english: true },
    { n: "④", text: "مكانين مختلفين", english: false },
    { n: "⑤", text: "صفة واحدة على الأقل", english: false },
    { n: "⑥", text: "اسمًا جمعًا شاذًا واحدًا على الأقل.", english: false },
  ],
};

// -------------------- 44. الخلاصة الذهبية --------------------
export const GOLDEN_SUMMARY_21 = {
  ifLabel: "إذا كان عندك:",
  rows: [
    { ar: "شيء واحد:", en: "There is..." },
    { ar: "أكثر من شيء:", en: "There are..." },
  ],
  negLabel: "نفي:",
  negatives: ["There isn't...", "There aren't..."],
  qLabel: "سؤال:",
  questions: ["Is there...?", "Are there...?"],
  aLabel: "إجابة:",
  answers: ["Yes, there is.", "No, there isn't.", "Yes, there are.", "No, there aren't."],
};

// -------------------- 45. الخريطة العقلية --------------------
export const MINDMAP_21 = [
  { label: "Singular", answer: "There is" },
  { label: "Plural", answer: "There are" },
  { label: "Singular Negative", answer: "There isn't" },
  { label: "Plural Negative", answer: "There aren't" },
  { label: "Singular Question", answer: "Is there...?" },
  { label: "Plural Question", answer: "Are there...?" },
];

// -------------------- 46. الربط مع ما تعلمناه --------------------
export const FINAL_SYSTEM_21 = {
  intro: "الآن نستطيع بناء جملة ضخمة منطقية:",
  sentence: "There are two small children in the beautiful garden near Sara's house.",
  breakLabel: "تفكيكها:",
  parts: [
    { en: "There are", ar: "يوجد" },
    { en: "two", ar: "اثنان" },
    { en: "small", ar: "صفة" },
    { en: "children", ar: "جمع شاذ" },
    { en: "in the beautiful garden", ar: "مكان + صفة" },
    { en: "near Sara's house", ar: "ملكية" },
  ],
  closing1: "🔥 هذه ليست قاعدة واحدة.",
  closing2: "هذه اللغة التي بدأنا ببنائها منذ الدرس الأول وهي الآن بدأت تتجمع كمنظومة واحدة.",
};

// -------------------- 47. خريطة المنهج --------------------
export const ROADMAP_21: { n: string; en: string; here?: boolean }[] = [
  { n: "①", en: "Sentence Structure" },
  { n: "②", en: "Pronouns" },
  { n: "③", en: "Verb to be" },
  { n: "④", en: "Nouns + Articles" },
  { n: "⑤", en: "Adjectives" },
  { n: "⑥", en: "Present Simple" },
  { n: "⑦", en: "Present Simple — Negative & Questions" },
  { n: "⑧", en: "Present Simple Review" },
  { n: "⑨", en: "Present Continuous" },
  { n: "⑩", en: "Present Continuous Advanced" },
  { n: "⑪", en: "Present Simple vs Present Continuous" },
  { n: "⑫", en: "Past Simple" },
  { n: "⑬", en: "Past Simple — Negative & Questions" },
  { n: "⑭", en: "Past Simple — Wh Questions" },
  { n: "⑮", en: "Was / Were" },
  { n: "⑯", en: "Possessive Adjectives" },
  { n: "⑰", en: "Possessive Pronouns" },
  { n: "⑱", en: "Plural Nouns" },
  { n: "⑲", en: "Possessive Nouns" },
  { n: "⑳", en: "Demonstratives — This / That / These / Those" },
  { n: "㉑", en: "There is / There are", here: true },
];

export const ROADMAP_CLOSING_21 =
  "الدرس القادم سيبني على هذا الأساس، وسنبدأ بتوسيع قدرة الطالب على وصف الأشياء والكميات بدل الاكتفاء بجملة بسيطة واحدة.";

// ============================================================
// أنواع العرض
// ============================================================
export type Tone21 = "neutral" | "good" | "bad" | "focus" | "warn";

export type Block21 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: Tone21 }
  | { type: "mixed"; text: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "formulaStrip"; items: string[] }
  | { type: "existenceDetector" }
  | { type: "meaningBoard" }
  | { type: "whyRule" }
  | { type: "thinkingBoard" }
  | { type: "singularExamples" }
  | { type: "aanDetector" }
  | { type: "pluralExamples" }
  | { type: "irregularPanel" }
  | { type: "locationLab" }
  | { type: "pluralLocation" }
  | { type: "constructionMachine" }
  | { type: "negativeTransformer" }
  | { type: "contractions" }
  | { type: "questionMachine" }
  | { type: "shortAnswerBridge" }
  | { type: "mistakeSpot" }
  | { type: "isVsItIs" }
  | { type: "thisVsThere" }
  | { type: "somePlural" }
  | { type: "anySystem" }
  | { type: "someSingular" }
  | { type: "quantityLab" }
  | { type: "bigQuantities" }
  | { type: "roomBuilder" }
  | { type: "sceneDescription" }
  | { type: "sceneQA" }
  | { type: "investigation" }
  | { type: "uncountableIntro" }
  | { type: "anSomeCompare" }
  | { type: "orderBoard" }
  | { type: "adjectiveLink" }
  | { type: "possessionLink" }
  | { type: "demonstrativeLink" }
  | { type: "sceneChain" }
  | { type: "errorDetector" };

export type Exercise21 =
  | { type: "detective" }
  | { type: "solutions" }
  | { type: "challenge1" }
  | { type: "challenge2" }
  | { type: "challenge3" }
  | { type: "challenge4" }
  | { type: "iq200" }
  | { type: "iq200b" }
  | { type: "finalBoss" };

export type Slide21 = { section: string; mascot: string; sourceIndex?: number } & (
  | { kind: "cover"; title: string }
  | { kind: "objectives"; title: string }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block21[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle?: string; ex: Exercise21 }
  | { kind: "summary"; title: string }
  | { kind: "mindmap"; title: string }
  | { kind: "reached"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const DETECTOR = "الكاشف الأساسي";
const NUMBER = "مفرد أم جمع؟";
const PLACES = "الأماكن والتركيب";
const TRANSFORM = "النفي والسؤال";
const IDENTITIES = "هويات الجملة";
const SCENES = "المسح والوصف";
const ADVANCED = "المستوى المتقدم";
const CONNECTIONS = "الربط بمنظومة الدروس";
const PRACTICE = "المحقق والتحديات";
const FINAL = "التحديات النهائية";
const END = "الخاتمة";

// ============================================================
// تسلسل الشرائح — مصدر 1→48 بالترتيب، ثم الاختبار والخاتمة
// ============================================================
export const SLIDES: Slide21[] = [
  { kind: "cover", section: START, mascot: "🕵️", title: LESSON_TITLE_21 },

  // 1. أهداف الدرس
  { kind: "objectives", section: START, mascot: "🎯", sourceIndex: 0, title: "أهداف الدرس" },

  // 2. ما معنى There is / There are؟
  {
    kind: "lesson",
    section: DETECTOR,
    mascot: "🧠",
    sourceIndex: 1,
    step: "1",
    title: "ما معنى There is / There are؟",
    lead: "بشكل بسيط جدًا:",
    blocks: [
      { type: "meaningBoard" },
      { type: "existenceDetector" },
    ],
  },

  // 3. لماذا نحتاج هذه القاعدة؟
  {
    kind: "lesson",
    section: DETECTOR,
    mascot: "🔍",
    sourceIndex: 2,
    step: "2",
    title: "لماذا نحتاج هذه القاعدة؟",
    blocks: [{ type: "whyRule" }],
  },

  // 4. الفرق في طريقة التفكير
  {
    kind: "lesson",
    section: DETECTOR,
    mascot: "🔥",
    sourceIndex: 3,
    step: "3",
    title: "الفرق في طريقة التفكير",
    blocks: [{ type: "thinkingBoard" }],
  },

  // 5. There is + اسم مفرد
  {
    kind: "lesson",
    section: DETECTOR,
    mascot: "🐱",
    sourceIndex: 4,
    step: "4",
    title: "There is + اسم مفرد",
    blocks: [{ type: "singularExamples" }],
  },

  // 6. انتبه إلى A / AN
  {
    kind: "lesson",
    section: NUMBER,
    mascot: "⭐",
    sourceIndex: 5,
    step: "5",
    title: "انتبه إلى A / AN",
    blocks: [{ type: "aanDetector" }],
  },

  // 7. There are + الجمع
  {
    kind: "lesson",
    section: NUMBER,
    mascot: "🔢",
    sourceIndex: 6,
    step: "6",
    title: "There are + الجمع",
    blocks: [{ type: "pluralExamples" }],
  },

  // 8. هنا نستخدم كل ما تعلمناه عن الجمع
  {
    kind: "lesson",
    section: NUMBER,
    mascot: "🔁",
    sourceIndex: 7,
    step: "7",
    title: "هنا نستخدم كل ما تعلمناه عن الجمع",
    blocks: [{ type: "irregularPanel" }],
  },

  // 9. There is + المكان
  {
    kind: "lesson",
    section: PLACES,
    mascot: "📍",
    sourceIndex: 8,
    step: "8",
    title: "There is + المكان",
    blocks: [{ type: "locationLab" }],
  },

  // 10. There are + المكان
  {
    kind: "lesson",
    section: PLACES,
    mascot: "📍",
    sourceIndex: 9,
    step: "9",
    title: "There are + المكان",
    blocks: [{ type: "pluralLocation" }],
  },

  // 11. تركيب الجملة
  {
    kind: "lesson",
    section: PLACES,
    mascot: "⚙️",
    sourceIndex: 10,
    step: "10",
    title: "تركيب الجملة",
    blocks: [{ type: "constructionMachine" }],
  },

  // 12. النفي
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "🚫",
    sourceIndex: 11,
    step: "11",
    title: "النفي",
    blocks: [{ type: "negativeTransformer" }],
  },

  // 13. الاختصارات
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "✂️",
    sourceIndex: 12,
    step: "12",
    title: "الاختصارات",
    blocks: [{ type: "contractions" }],
  },

  // 14. الأسئلة
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "❓",
    sourceIndex: 13,
    step: "13",
    title: "الأسئلة",
    blocks: [{ type: "questionMachine" }],
  },

  // 15. Short Answers
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "🌉",
    sourceIndex: 14,
    step: "14",
    title: "Short Answers",
    blocks: [{ type: "shortAnswerBridge" }],
  },

  // 16. خطأ مهم
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "🚨",
    sourceIndex: 15,
    step: "15",
    title: "خطأ مهم",
    blocks: [{ type: "mistakeSpot" }],
  },

  // 17. There is vs It is
  {
    kind: "lesson",
    section: IDENTITIES,
    mascot: "⚖️",
    sourceIndex: 16,
    step: "16",
    title: "There is vs It is",
    blocks: [{ type: "isVsItIs" }],
  },

  // 18. There is vs This is
  {
    kind: "lesson",
    section: IDENTITIES,
    mascot: "⚖️",
    sourceIndex: 17,
    step: "17",
    title: "There is vs This is",
    blocks: [{ type: "thisVsThere" }],
  },

  // 19. Some مع There are
  {
    kind: "lesson",
    section: IDENTITIES,
    mascot: "📦",
    sourceIndex: 18,
    step: "18",
    title: "Some مع There are",
    blocks: [{ type: "somePlural" }],
  },

  // 20. Any مع النفي والأسئلة
  {
    kind: "lesson",
    section: IDENTITIES,
    mascot: "🌀",
    sourceIndex: 19,
    step: "19",
    title: "Any مع النفي والأسئلة",
    blocks: [{ type: "anySystem" }],
  },

  // 21. Some مع المفرد؟
  {
    kind: "lesson",
    section: IDENTITIES,
    mascot: "📦",
    sourceIndex: 20,
    step: "20",
    title: "Some مع المفرد؟",
    blocks: [{ type: "someSingular" }],
  },

  // 22. الأرقام
  {
    kind: "lesson",
    section: SCENES,
    mascot: "🔢",
    sourceIndex: 21,
    step: "21",
    title: "الأرقام",
    blocks: [{ type: "quantityLab" }],
  },

  // 23. الكميات الكبيرة
  {
    kind: "lesson",
    section: SCENES,
    mascot: "📈",
    sourceIndex: 22,
    step: "22",
    title: "الكميات الكبيرة",
    blocks: [{ type: "bigQuantities" }],
  },

  // 24. الأماكن الكبيرة
  {
    kind: "lesson",
    section: SCENES,
    mascot: "🏠",
    sourceIndex: 23,
    step: "23",
    title: "الأماكن الكبيرة",
    blocks: [{ type: "roomBuilder" }],
  },

  // 25. وصف مشهد
  {
    kind: "lesson",
    section: SCENES,
    mascot: "🎨",
    sourceIndex: 24,
    step: "24",
    title: "وصف مشهد",
    blocks: [{ type: "sceneDescription" }],
  },

  // 26. سؤال وجواب داخل وصف المكان
  {
    kind: "lesson",
    section: SCENES,
    mascot: "💬",
    sourceIndex: 25,
    step: "25",
    title: "سؤال وجواب داخل وصف المكان",
    blocks: [{ type: "sceneQA" }],
  },

  // 27. IQ200: وصف ثم تحقيق
  {
    kind: "lesson",
    section: SCENES,
    mascot: "🔦",
    sourceIndex: 26,
    step: "26",
    title: "IQ200: وصف ثم تحقيق",
    blocks: [{ type: "investigation" }],
  },

  // 28. There is + غير المعدود
  {
    kind: "lesson",
    section: ADVANCED,
    mascot: "💧",
    sourceIndex: 27,
    step: "27",
    title: "There is + غير المعدود",
    blocks: [{ type: "uncountableIntro" }],
  },

  // 29. There is مع a/an وsome
  {
    kind: "lesson",
    section: ADVANCED,
    mascot: "⚗️",
    sourceIndex: 28,
    step: "28",
    title: "There is مع a/an وsome",
    blocks: [{ type: "anSomeCompare" }],
  },

  // 30. ترتيب الجملة
  {
    kind: "lesson",
    section: ADVANCED,
    mascot: "🧱",
    sourceIndex: 29,
    step: "29",
    title: "ترتيب الجملة",
    blocks: [{ type: "orderBoard" }],
  },

  // 31. ربطه بدرس الصفات
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🎨",
    sourceIndex: 30,
    step: "30",
    title: "ربطه بدرس الصفات",
    blocks: [{ type: "adjectiveLink" }],
  },

  // 32. ربطه بملكية الأسماء
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🔗",
    sourceIndex: 31,
    step: "31",
    title: "ربطه بملكية الأسماء",
    blocks: [{ type: "possessionLink" }],
  },

  // 33. ربطه بـ This / That / These / Those
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🛰️",
    sourceIndex: 32,
    step: "32",
    title: "ربطه بـ This / That / These / Those",
    blocks: [{ type: "demonstrativeLink" }],
  },

  // 34. الفرق في مثال واحد
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🚗",
    sourceIndex: 33,
    step: "33",
    title: "الفرق في مثال واحد",
    blocks: [{ type: "sceneChain" }],
  },

  // 35. أخطاء شائعة جدًا
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🚨",
    sourceIndex: 34,
    step: "34",
    title: "أخطاء شائعة جدًا",
    blocks: [{ type: "errorDetector" }],
  },

  // 36. Grammar Detective
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🕵️",
    sourceIndex: 35,
    badge: "35",
    title: "Grammar Detective",
    subtitle: GRAMMAR_DETECTIVE_21.intro,
    ex: { type: "detective" },
  },

  // 37. الحل
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🎯",
    sourceIndex: 36,
    badge: "36",
    title: "الحل",
    ex: { type: "solutions" },
  },

  // 38. Challenge 1
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧩",
    sourceIndex: 37,
    badge: "37",
    title: "Challenge 1 — أكمل",
    ex: { type: "challenge1" },
  },

  // 39. Challenge 2
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧩",
    sourceIndex: 38,
    badge: "38",
    title: "Challenge 2 — اختر",
    ex: { type: "challenge2" },
  },

  // 40. Challenge 3
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧩",
    sourceIndex: 39,
    badge: "39",
    title: "Challenge 3 — حوّل إلى النفي",
    ex: { type: "challenge3" },
  },

  // 41. Challenge 4
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧩",
    sourceIndex: 40,
    badge: "40",
    title: "Challenge 4 — حوّل إلى سؤال",
    ex: { type: "challenge4" },
  },

  // 42. IQ200 Challenge
  {
    kind: "ex",
    section: FINAL,
    mascot: "🚀",
    sourceIndex: 41,
    badge: "41",
    title: "IQ200 Challenge",
    ex: { type: "iq200" },
  },

  // 43. IQ200 Challenge 2
  {
    kind: "ex",
    section: FINAL,
    mascot: "🍎",
    sourceIndex: 42,
    badge: "42",
    title: "IQ200 Challenge 2",
    ex: { type: "iq200b" },
  },

  // 44. FINAL BOSS
  {
    kind: "ex",
    section: FINAL,
    mascot: "🏆",
    sourceIndex: 43,
    badge: "43",
    title: "FINAL BOSS",
    ex: { type: "finalBoss" },
  },

  // 45. الخلاصة الذهبية
  { kind: "summary", section: END, mascot: "🧠", sourceIndex: 44, title: "الخلاصة الذهبية" },

  // 46. الخريطة العقلية
  { kind: "mindmap", section: END, mascot: "🗺️", sourceIndex: 45, title: "الخريطة العقلية" },

  // 47. الربط مع ما تعلمناه
  { kind: "reached", section: END, mascot: "🔥", sourceIndex: 46, title: "الربط مع ما تعلمناه" },

  // 48. خريطة المنهج
  { kind: "roadmap", section: END, mascot: "🗺️", sourceIndex: 47, title: "خريطة المنهج" },

  // الاختبار النهائي المشترك
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي — الدرس 21" },
  { kind: "closing", section: END, mascot: "🏆", title: "أحسنت!" },
];

// ============================================================
// SOURCE_FIDELITY_MARKERS_21 — فهرس مباشر للمادة المصدرية.
// ============================================================
export const SOURCE_FIDELITY_MARKERS_21: string[] = [
  ...SOURCE_SECTIONS,
  LESSON_TITLE_21,
  LESSON_SUBTITLE_21,
  LESSON_ARABIC_TITLE_21,
  COVER_INTRO_21,
  ...COVER_INTRO_LIST_21,
  COVER_FROM_21.en,
  COVER_FROM_21.ar,
  COVER_TO_21.en,
  COVER_TO_21.ar,
  COVER_NOTE_21,
  ...OBJECTIVES_21.flatMap((x) => [x.text, ...("items" in x ? x.items : [])]),
  MEANING_21.isLine.en,
  MEANING_21.isLine.ar,
  MEANING_21.areLine.en,
  MEANING_21.areLine.ar,
  MEANING_21.exampleIs.en,
  MEANING_21.exampleIs.ar,
  MEANING_21.exampleAre.en,
  MEANING_21.exampleAre.ar,
  MEANING_21.singular,
  MEANING_21.plural,
  WHY_21.first.en,
  WHY_21.first.ar,
  WHY_21.second.en,
  WHY_21.second.ar,
  WHY_21.firstMeaning,
  WHY_21.secondMeaning,
  THINKING_21.pointing.en,
  THINKING_21.pointing.ar,
  THINKING_21.existence.en,
  THINKING_21.existence.ar,
  ...SINGULAR_EXAMPLES_21.examples.flatMap((x) => [x.en, x.ar]),
  ...AN_21.words.flatMap((x) => [x.en]),
  ...AN_21.wrong,
  ...AN_21.fixed,
  PLURAL_EXAMPLES_21.formula,
  ...PLURAL_EXAMPLES_21.examples.flatMap((x) => [x.en, x.ar]),
  ...PLURAL_EXAMPLES_21.compare.flatMap((x) => [x.en, x.ar]),
  ...IRREGULAR_21.pairs,
  ...IRREGULAR_21.rows.flatMap((x) => [x.is, x.isAr, x.are, x.areAr]),
  IRREGULAR_21.closing,
  ...PLACE_21.preps.flatMap((x) => [x.en, x.ar]),
  ...PLACE_21.examples.flatMap((x) => [x.en, x.ar]),
  ...PLURAL_PLACE_21.examples.flatMap((x) => [x.en, x.ar]),
  CONSTRUCTION_21.singular,
  CONSTRUCTION_21.plural,
  ...CONSTRUCTION_21.examples,
  ...NEGATIVE_21.full,
  NEGATIVE_21.singularFull.en,
  NEGATIVE_21.singularFull.ar,
  NEGATIVE_21.singularShort.en,
  NEGATIVE_21.pluralFull.en,
  NEGATIVE_21.pluralFull.ar,
  NEGATIVE_21.pluralShort.en,
  ...CONTRACTIONS_21.pairs,
  ...CONTRACTIONS_21.examples.flatMap((x) => [x.en, x.ar]),
  QUESTIONS_21.isForm.en,
  QUESTIONS_21.areForm.en,
  ...QUESTIONS_21.singular.flatMap((x) => [x.en, x.ar]),
  ...QUESTIONS_21.plural.flatMap((x) => [x.en, x.ar]),
  ...QUESTIONS_21.rule,
  ...SHORT_ANSWERS_21.forms,
  SHORT_ANSWERS_21.singularQ.en,
  SHORT_ANSWERS_21.singularQ.yes,
  SHORT_ANSWERS_21.singularQ.no,
  SHORT_ANSWERS_21.pluralQ.en,
  SHORT_ANSWERS_21.pluralQ.yes,
  SHORT_ANSWERS_21.pluralQ.no,
  IMPORTANT_MISTAKE_21.question,
  IMPORTANT_MISTAKE_21.wrong,
  IMPORTANT_MISTAKE_21.correct,
  IMPORTANT_MISTAKE_21.because,
  IS_VS_IT_21.thereIs.word,
  IS_VS_IT_21.thereIs.meaning,
  IS_VS_IT_21.exampleIs.en,
  IS_VS_IT_21.exampleIs.ar,
  IS_VS_IT_21.itIs.word,
  IS_VS_IT_21.itIs.meaning,
  IS_VS_IT_21.exampleIt.en,
  IS_VS_IT_21.exampleIt.ar,
  ...IS_VS_IT_21.sequence,
  ...THIS_VS_THERE_21.pairs.flatMap((x) => [x.thisIs.en, x.thisIs.ar, x.thereIs.en, x.thereIs.ar]),
  ...THIS_VS_THERE_21.idea.flatMap((x) => [x.en, x.ar]),
  SOME_21.examples.flatMap((x) => [x.en, x.ar]),
  ...ANY_21.examples.flatMap((x) => [x.en, x.ar]),
  ...ANY_21.system.map((x) => x.en),
  ...SOME_SINGULAR_21.someWords,
  ...SOME_SINGULAR_21.examples,
  ...NUMBERS_21.numbers.map((x) => x.en),
  NUMBERS_21.wrong,
  NUMBERS_21.correct,
  ...BIG_QUANTITIES_21.examples.flatMap((x) => [x.en, x.ar]),
  ...BIG_QUANTITIES_21.words,
  ...BIG_PLACES_21.sentences,
  BIG_PLACES_21.notice,
  ...SCENE_21.items.flatMap((x) => [x.ar, x.en]),
  ...SCENE_QA_21.pairs.flatMap((x) => [x.q, x.a]),
  ...INVESTIGATION_21.scene,
  ...INVESTIGATION_21.questions,
  ...INVESTIGATION_21.answers,
  ...UNCOUNTABLE_21.words,
  ...UNCOUNTABLE_21.examples.flatMap((x) => [x.en, x.ar]),
  UNCOUNTABLE_21.wrong,
  UNCOUNTABLE_21.because,
  ...A_AN_SOME_21.examples.flatMap((x) => [x.en, x.ar]),
  ORDER_21.formula,
  ...ORDER_21.examples,
  ORDER_21.detail.en,
  ORDER_21.detail.ar,
  ...ORDER_21.parts,
  ...ADJECTIVE_LINK_21.learnedWords,
  ...ADJECTIVE_LINK_21.examples,
  ...POSSESSION_LINK_21.learnedWords,
  ...POSSESSION_LINK_21.examples,
  POSSESSION_LINK_21.note,
  DEMONSTRATIVE_LINK_21.nearBookEn,
  DEMONSTRATIVE_LINK_21.thisIsTheBook.en,
  DEMONSTRATIVE_LINK_21.thisIsTheBook.ar,
  DEMONSTRATIVE_LINK_21.farBooksEn,
  DEMONSTRATIVE_LINK_21.theseAreTheBooks.en,
  DEMONSTRATIVE_LINK_21.theseAreTheBooks.ar,
  DEMONSTRATIVE_LINK_21.thatIs,
  DEMONSTRATIVE_LINK_21.thoseAre,
  ...DEMONSTRATIVE_LINK_21.therefore.flatMap((x) => [x.en, x.ar]),
  ...SCENE_CHAIN_21.chain.flatMap((x) => [x.en, x.ar, x.role]),
  SCENE_CHAIN_21.closing,
  ...COMMON_ERRORS_21.errors.flatMap((x) => [x.wrong, x.correct]),
  ...GRAMMAR_DETECTIVE_21.sentences.flatMap((x) => [x.wrong, x.correct]),
  ...SOLUTIONS_21,
  ...CHALLENGE1_21.questions.map((x) => x.stem),
  ...CHALLENGE2_21.questions.flatMap((x) => [x.stem, x.a, x.b]),
  ...CHALLENGE3_21.sentences.flatMap((x) => [x.source, ...x.answers]),
  ...CHALLENGE4_21.sentences.flatMap((x) => [x.source, ...x.answers]),
  ...IQ200_CHALLENGE_21.given.map((x) => x.en),
  ...KITCHEN_21.scene,
  ...KITCHEN_21.questions,
  ...KITCHEN_21.answers,
  KITCHEN_21.newQuestions,
  ...FINAL_BOSS_21.clues,
  ...FINAL_BOSS_21.requirements.map((x) => x.text),
  ...GOLDEN_SUMMARY_21.rows.flatMap((x) => [x.ar, x.en]),
  ...GOLDEN_SUMMARY_21.negatives,
  ...GOLDEN_SUMMARY_21.questions,
  ...GOLDEN_SUMMARY_21.answers,
  ...MINDMAP_21.flatMap((x) => [x.label, x.answer]),
  FINAL_SYSTEM_21.sentence,
  ...FINAL_SYSTEM_21.parts.flatMap((x) => [x.en, x.ar]),
  FINAL_SYSTEM_21.closing1,
  FINAL_SYSTEM_21.closing2,
  ...ROADMAP_21.map((x) => x.en),
  ROADMAP_CLOSING_21,
];

/** الأخطاء المقصودة في المصدر — تبقى مواد كشف/تصحيح ولا تُستبدل بصمت. */
export const INTENTIONALLY_WRONG_21: string[] = [
  "There is dog. ❌",
  "There is apple. ❌",
  "There are a book. ❌",
  "There is two books. ❌",
  "There is many students. ❌",
  "Is there two chairs? ❌",
  "Are there a computer? ❌",
  "Yes, it is.",
  "There are a water bottle. ❌",
  "There is two chairs. ❌",
  "There are some water. ❌",
  "There are a cat under the table.",
  "There is three students outside.",
  "There are a computer on the desk.",
  "Is there two windows?",
  "Are there a teacher in the classroom?",
  "There is many books on the shelf.",
  "There isn't any chairs here.",
  "There aren't a chair in the room.",
  "There is two children in the garden.",
];
