// ============================================================
// الدرس 16 — Possessive Adjectives — صفات الملكية
// المصدر الكامل محفوظ حرفيًا — لا تلخيص ولا إعادة صياغة
// العنوان: الدرس 16: Possessive Adjectives — صفات الملكية
//
// ملاحظة اتجاه: كل وحدة إنجليزية داخل هذا الملف نص خام يُعرض دائمًا
// داخل عازل LTR (dir="ltr") — ولا يُقسَّم إلى كلمات منفصلة أبدًا.
// ============================================================

// -------------------- الفهارس والعناوين (تحقق تغطية المصدر) --------------------
export const SOURCE_SECTIONS: string[] = [
  "🎯 أهداف الدرس",
  "🧠 1. ما معنى الملكية؟",
  "⭐ 2. ما هي Possessive Adjectives؟",
  "🧩 3. الخريطة الأساسية",
  "🟦 4. I → MY",
  "🟢 5. YOU → YOUR",
  "🔵 6. HE → HIS",
  "🟣 7. SHE → HER",
  "🟡 8. IT → ITS",
  "🟠 9. WE → OUR",
  "🔴 10. THEY → THEIR",
  "⭐ 11. القاعدة الذهبية",
  "🧠 12. لماذا نسميها Adjectives؟",
  "🧩 13. اربطها بالضمائر التي تعلمناها",
  "🔥 14. انتبه: الملكية تتبع صاحب الشيء",
  "🧠 15. مثال ذكي جداً",
  "🚨 16. مثال مهم جداً",
  "🧠 17. قاعدة IQ200",
  "🟦 18. صفات الملكية مع المفرد",
  "⭐ 19. صفات الملكية لا تتغير حسب عدد الأشياء",
  "🧠 20. الفرق الذي سنبني عليه الدرس القادم",
  "🚨 21. لا تخلط HIS",
  "🟣 22. الملكية مع الأسماء",
  "🧠 23. مقارنة مهمة",
  "🔥 24. وهنا يأتي موضوع الجمع الشاذ",
  "🧠 25. الملكية مع أفراد العائلة",
  "🎮 26. لعبة من صاحب الشيء؟",
  "✏️ 27. تمارين المستوى الأول",
  "✏️ 28. المستوى الثاني",
  "✏️ 29. المستوى الثالث",
  "✏️ 30. المستوى الرابع — صحح الخطأ",
  "🧠 31. المستوى الخامس — تحليل",
  "🔥 32. المستوى السادس — الملكية مع أكثر من شخص",
  "🕵️ 33. Grammar Detective",
  "🚀 34. IQ200 Challenge",
  "🧠 35. تحدي أصعب",
  "🎭 36. Mini Conversation",
  "🏆 37. التحدي النهائي",
  "🧠 ملخص الدرس",
  "⭐ القاعدة الذهبية",
  "🚨 ثلاثة أشياء لا تنساها",
  "🔥 قاعدة IQ200 الأخيرة",
  "🗺️ خريطة المنهج بعد الدرس 16",
  "🔜 الخطوة التالية",
];

// -------------------- الأهداف --------------------
export const OBJECTIVES_16: string[] = [
  "فهم معنى الملكية في الإنجليزية.",
  "استخدام: my / your / his / her / its / our / their",
  "ربط كل واحدة بالضمير الصحيح.",
  "وضع صفة الملكية في مكانها الصحيح.",
  "معرفة أن الاسم يأتي بعدها.",
  "التفريق بين: my book و: mine",
  "فهم الفرق بين: his = له و: her = لها و: their = لهم / لهن",
  "تجنب أخطاء شائعة جداً مثل: I book ❌  She bag ❌  They house ❌",
];

// -------------------- الخريطة الأساسية --------------------
export const CORE_MAP: { pronoun: string; possessive: string }[] = [
  { pronoun: "I", possessive: "my" },
  { pronoun: "You", possessive: "your" },
  { pronoun: "He", possessive: "his" },
  { pronoun: "She", possessive: "her" },
  { pronoun: "It", possessive: "its" },
  { pronoun: "We", possessive: "our" },
  { pronoun: "They", possessive: "their" },
];

// -------------------- جميع صفات الملكية --------------------
export const ALL_POSSESSIVES: { word: string; meaning: string }[] = [
  { word: "my", meaning: "ـي / لي" },
  { word: "your", meaning: "ـك / لك" },
  { word: "his", meaning: "ـه / له" },
  { word: "her", meaning: "ـها / لها" },
  { word: "its", meaning: "ـه / ـها لغير العاقل" },
  { word: "our", meaning: "ـنا / لنا" },
  { word: "their", meaning: "ـهم / لَهم / لهن" },
];

// -------------------- صيغ ذهبية --------------------
export const GOLDEN_FORMULAS: string[] = [
  "my book",
  "your phone",
  "his car",
  "her bag",
  "its tail",
  "our house",
  "their school",
];

// -------------------- أخطاء شائعة --------------------
export const COMMON_ERRORS: string[] = [
  "I book ❌",
  "She bag ❌",
  "They house ❌",
];

// -------------------- أخطاء صيغة --------------------
export const FORM_ERRORS: string[] = [
  "mys books ❌",
  "hers cars ❌",
  "theirs houses ❌",
];

// -------------------- Section 1 examples --------------------
export const SECTION1_EXAMPLES = {
  intro: "الملكية تعني أن شيئاً يخص شخصاً أو شيئاً آخر.",
  ahmed: "Ahmed's book",
  his: "His book",
  hisExplain: "تعني أن الكتاب يخصه.",
  saraBicycle: "Sara has a bicycle.",
  saraAr: "سارة لديها دراجة.",
  herBicycle: "Her bicycle is blue.",
  herBicycleAr: "دراجتها زرقاء.",
  herMeaning: "Her = لها / خاص بها.",
  omarPhone: "Omar has a phone.",
  hisPhone: "His phone is new.",
  hisPhoneAr: "هاتفه جديد.",
};

// -------------------- Section 4 I → MY --------------------
export const I_MY_EXAMPLES: { en: string; ar: string }[] = [
  { en: "my house", ar: "منزلي" },
  { en: "my school", ar: "مدرستي" },
  { en: "my friend", ar: "صديقي" },
  { en: "my phone", ar: "هاتفي" },
  { en: "my room", ar: "غرفتي" },
  { en: "my teacher", ar: "معلمي / معلمتي" },
];

// -------------------- Section 5 YOU → YOUR --------------------
export const YOU_YOUR_EXAMPLES: { en: string; ar: string }[] = [
  { en: "your book", ar: "كتابك" },
  { en: "your bag", ar: "حقيبتك" },
  { en: "your room", ar: "غرفتك" },
  { en: "your family", ar: "عائلتك" },
  { en: "your idea", ar: "فكرتك" },
];

// -------------------- Section 6 HE → HIS --------------------
export const HE_HIS_EXAMPLES: { en: string; ar: string }[] = [
  { en: "his car", ar: "سيارته" },
  { en: "his brother", ar: "أخوه" },
  { en: "his jacket", ar: "سترته" },
  { en: "his computer", ar: "حاسوبه" },
  { en: "his room", ar: "غرفته" },
];

// -------------------- Section 7 SHE → HER --------------------
export const SHE_HER_EXAMPLES: { en: string; ar: string }[] = [
  { en: "her bag", ar: "حقيبتها" },
  { en: "her sister", ar: "أختها" },
  { en: "her notebook", ar: "دفترها" },
  { en: "her bicycle", ar: "دراجتها" },
  { en: "her idea", ar: "فكرتها" },
];

// -------------------- Section 8 IT → ITS --------------------
export const ITS_EXAMPLES = {
  robotBattery: { en: "The robot has a battery.", ar: "" },
  robotBatterySmall: { en: "Its battery is small.", ar: "بطاريته صغيرة." },
  dogTail: { en: "The dog moved its tail.", ar: "حرّك الكلب ذيله." },
  itsNote: "its = ملكية تعود إلى dog.",
  itsVsIts: {
    its: "its = ملكية",
    itsContracted: "it's = اختصار لـ it is",
    robotLost: { en: "The robot lost its battery.", ar: "الروبوت فقد بطاريته." },
    itsSmall: { en: "It's small.", ar: "إنه صغير." },
    here: "هنا: it's = it is",
    oneLetter: "حرف واحد إضافي غيّر المعنى.",
  },
};

// -------------------- Section 9 WE → OUR --------------------
export const WE_OUR_EXAMPLES: { en: string; ar: string }[] = [
  { en: "our school", ar: "مدرستنا" },
  { en: "our teacher", ar: "معلمنا" },
  { en: "our team", ar: "فريقنا" },
  { en: "our project", ar: "مشروعنا" },
  { en: "our country", ar: "بلدنا" },
];

// -------------------- Section 10 THEY → THEIR --------------------
export const THEY_THEIR_EXAMPLES: { en: string; ar: string }[] = [
  { en: "their house", ar: "منزلهم" },
  { en: "their teacher", ar: "معلمهم" },
  { en: "their children", ar: "أطفالهم" },
  { en: "their project", ar: "مشروعهم" },
  { en: "their books", ar: "كتبهم" },
];

// -------------------- Section 13 connecting pronouns --------------------
export const CONNECTING_PRONOUNS = [
  { pronoun: "I am a student.", sentence: "My book is new.", ar: "كتابي جديد." },
  { pronoun: "He is a student.", sentence: "His book is new.", ar: "كتابه جديد." },
  { pronoun: "She is a student.", sentence: "Her book is new.", ar: "كتابها جديد." },
  { pronoun: "They are students.", sentence: "Their book is new.", ar: "كتابهم جديد." },
];

// -------------------- Section 14 ownership tracking --------------------
export const OWNERSHIP_TRACKING = {
  omar: {
    chain: ["Omar", "He", "his"],
    examples: ["Omar's bicycle", "His bicycle"],
  },
  sara: {
    chain: ["Sara", "She", "her"],
    examples: ["Sara's bicycle", "Her bicycle"],
  },
  both: {
    chain: ["Omar and Sara", "They", "their"],
    examples: ["Their bicycle"],
  },
  rule: "إذن لا تنظر إلى الشيء المملوك. انظر إلى: صاحب الشيء.",
};

// -------------------- Section 15 smart example --------------------
export const SMART_EXAMPLE_15 = {
  omarHasSister: "Omar has a sister.",
  herNameIsLina: "Her name is Lina.",
  whyHer: "لماذا استخدمنا: Her وليس: His؟",
  becauseSister: "لأننا نتحدث عن: sister وهي أنثى.",
  butWait: "لكن انتبه!",
  hisSister: "Omar has a sister.",
  hisSisterIs: "His sister is Lina.",
  hisBecause: "فهنا: His لأن أخت لينا هي أخت عمر.",
  rule: "صفات الملكية تتبع صاحب الملكية، وليس جنس الشيء المملوك.",
};

// -------------------- Section 16 important example --------------------
export const IMPORTANT_EXAMPLE_16 = {
  saraBrother: "Sara has a brother.",
  herBrother: "Her brother is 10.",
  weUseHer: "نستخدم: Her لأن Sara هي صاحبة الأخ.",
  notHis: "وليس: His brother ❌ حتى لو كان brother ذكراً.",
  rule: "القاعدة: Sara → her",
};

// -------------------- Section 17 IQ200 rule --------------------
export const IQ200_DOG = {
  question: "لا تسأل: هل الشيء ولد أم بنت؟ اسأل: لمن يعود الشيء؟",
  saraDog: "Sara has a dog.",
  dogSmall: "The dog is small.",
  itsName: "Its name is Max.",
  itsBecause: "هنا: its لأن الاسم يعود إلى dog.",
  butHer: "لكن:",
  saraLoves: "Sara loves her dog.",
  herBecause: "هنا: her لأن dog ملك Sara.",
  rule: "نفس الكلب، لكن الملكية مختلفة حسب صاحبها.",
};

// -------------------- Section 18 singular forms --------------------
export const SINGULAR_FORMS: { singular: string; plural: string }[] = [
  { singular: "my book", plural: "my books" },
  { singular: "his car", plural: "his cars" },
  { singular: "her bag", plural: "her bags" },
  { singular: "our house", plural: "our houses" },
  { singular: "their friend", plural: "their friends" },
];

// -------------------- Section 20 mine bridge --------------------
export const MINE_BRIDGE: { adj: string; noun: string; pronoun: string; ar: string }[] = [
  { adj: "my", noun: "my book", pronoun: "The book is mine.", ar: "هذا الكتاب لي." },
  { adj: "your", noun: "your bag", pronoun: "The bag is yours.", ar: "" },
  { adj: "her", noun: "her jacket", pronoun: "The jacket is hers.", ar: "" },
  { adj: "our", noun: "our house", pronoun: "The house is ours.", ar: "" },
  { adj: "their", noun: "their car", pronoun: "The car is theirs.", ar: "" },
];

// -------------------- Section 22 noun possession --------------------
export const NOUN_POSSESSION: { withApostrophe: string; ar: string }[] = [
  { withApostrophe: "Ali's book", ar: "كتاب علي." },
  { withApostrophe: "Sara's phone", ar: "هاتف سارة." },
  { withApostrophe: "The teacher's desk", ar: "مكتب المعلم." },
  { withApostrophe: "The dog's tail", ar: "ذيل الكلب." },
];

export const NOUN_TO_ADJ: { from: string; to: string }[] = [
  { from: "Ali's book", to: "His book" },
  { from: "Sara's phone", to: "Her phone" },
];

// -------------------- Section 23 comparison --------------------
export const COMPARISON_23 = [
  { namePoss: "Ahmed's car", adjPoss: "His car", meaning: "سيارة أحمد." },
  { namePoss: "Sara's notebook", adjPoss: "Her notebook", meaning: "" },
  { namePoss: "The students' classroom", adjPoss: "Their classroom", meaning: "" },
];

// -------------------- Section 24 irregular plurals --------------------
export const IRREGULAR_PLURALS = {
  childToChildren: "child → children",
  childToy: "the child → the child's toy",
  childToyAr: "الطفل → لعبة الطفل",
  childrenToys: "the children → the children's toys",
  childrenToysAr: "الأطفال → ألعاب الأطفال",
  note: "وسندرس هذه القاعدة بشكل مستقل مع: 's و: s' والجمع العادي والجمع الشاذ. يعني موضوع Irregular Plurals مرتبط بالخطة ولن يتم تجاهله.",
};

// -------------------- Section 25 family --------------------
export const FAMILY_25: { en: string; ar: string }[] = [
  { en: "my mother", ar: "أمي" },
  { en: "my father", ar: "أبي" },
  { en: "my brother", ar: "أخي" },
  { en: "my sister", ar: "أختي" },
  { en: "your parents", ar: "والداك" },
  { en: "his uncle", ar: "عمه" },
  { en: "her aunt", ar: "عمتها / خالتها" },
  { en: "our family", ar: "عائلتنا" },
  { en: "their children", ar: "أطفالهم" },
];

// -------------------- Section 26 game --------------------
export const GAME_26 = [
  { sentence: "Maya has a notebook.", chain: ["Maya", "She", "her"], result: "her notebook" },
  { sentence: "Adam has a bicycle.", chain: ["Adam", "He", "his"], result: "his bicycle" },
  { sentence: "Lina and Omar have a dog.", chain: ["They", "their"], result: "their dog" },
  { sentence: "I have a computer.", chain: ["I", "my"], result: "my computer" },
  { sentence: "We have a classroom.", chain: ["We", "our"], result: "our classroom" },
];

// -------------------- Level 1 Exercise (27) --------------------
export interface ChoiceItem {
  stem: string;
  blank: string;
  options: string[];
  answer: number;
}

export const LEVEL1_16: ChoiceItem[] = [
  { stem: "I have a pencil.", blank: "This is ______ pencil.", options: ["my", "his"], answer: 0 },
  { stem: "Sara has a bag.", blank: "This is ______ bag.", options: ["her", "their"], answer: 0 },
  { stem: "Omar has a bicycle.", blank: "This is ______ bicycle.", options: ["his", "our"], answer: 0 },
  { stem: "We have a classroom.", blank: "This is ______ classroom.", options: ["our", "your"], answer: 0 },
  { stem: "They have a house.", blank: "This is ______ house.", options: ["their", "her"], answer: 0 },
];

// -------------------- Level 2 Exercise (28) --------------------
export const LEVEL2_16 = CORE_MAP.map((m) => ({ pronoun: m.pronoun, answer: m.possessive }));

// -------------------- Level 3 Exercise (29) --------------------
export interface FillItem {
  sentence1: string;
  sentence2: string;
  blank: string;
  answer: string;
}

export const LEVEL3_16: FillItem[] = [
  { sentence1: "Ali has a phone.", sentence2: "______ phone is new.", blank: "His", answer: "His" },
  { sentence1: "Sara has a cat.", sentence2: "______ cat is white.", blank: "Her", answer: "Her" },
  { sentence1: "We have a teacher.", sentence2: "______ teacher is kind.", blank: "Our", answer: "Our" },
  { sentence1: "They have bicycles.", sentence2: "______ bicycles are fast.", blank: "Their", answer: "Their" },
  { sentence1: "I have a room.", sentence2: "______ room is small.", blank: "My", answer: "My" },
  { sentence1: "The bird has wings.", sentence2: "______ wings are strong.", blank: "Its", answer: "Its" },
];

// -------------------- Level 4 Exercise (30) --------------------
export interface ErrorItem {
  wrong: string;
  correct: string;
  owner: string;
  explanation: string;
}

export const LEVEL4_16: ErrorItem[] = [
  { wrong: "I have a dog. His dog is friendly.", correct: "I have a dog. My dog is friendly.", owner: "I", explanation: "صاحب الكلب أنا (I) → my" },
  { wrong: "Sara has a book. His book is interesting.", correct: "Sara has a book. Her book is interesting.", owner: "Sara", explanation: "صاحب الكتاب سارة (She) → her" },
  { wrong: "They have a house. Our house is large.", correct: "They have a house. Their house is large.", owner: "They", explanation: "صاحب المنزل هم (They) → their" },
  { wrong: "We have a car. Their car is old.", correct: "We have a car. Our car is old.", owner: "We", explanation: "صاحب السيارة نحن (We) → our" },
  { wrong: "Omar has a sister. Her sister is young.", correct: "Omar has a sister. His sister is young.", owner: "Omar", explanation: "صاحب الأخت عمر (He) → his" },
];

// -------------------- Level 5 Exercise (31) --------------------
export const SENTENCE_ANALYSIS_31 = {
  sentence: "Their new robot is powerful.",
  parts: [
    { word: "Their", role: "Possessive Adjective" },
    { word: "new", role: "Adjective" },
    { word: "robot", role: "Noun" },
    { word: "powerful", role: "Adjective" },
  ],
  note: "نحن هنا نراجع أكثر من درس في جملة واحدة.",
};

// -------------------- Level 6 Exercise (32) --------------------
export interface MultiOwnerItem {
  sentence1: string;
  sentence2: string;
  blank: string;
  answer: string;
  chain: string;
}

export const LEVEL6_16: MultiOwnerItem[] = [
  { sentence1: "Ali and Omar have a project.", sentence2: "______ project is difficult.", blank: "Their", answer: "Their", chain: "Ali and Omar → They → their" },
  { sentence1: "Sara and Lina have a room.", sentence2: "______ room is clean.", blank: "Their", answer: "Their", chain: "Sara and Lina → They → their" },
  { sentence1: "My brother and I have a team.", sentence2: "______ team is strong.", blank: "Our", answer: "Our", chain: "My brother and I → We → our" },
  { sentence1: "The students have books.", sentence2: "______ books are on the table.", blank: "Their", answer: "Their", chain: "The students → They → their" },
];

// -------------------- Grammar Detective (33) --------------------
export const DETECTIVE_PASSAGE_16 = "Daniel has a small robot. His robot can move its arms. Daniel's sister has a colorful tablet. Her tablet is on the desk. Daniel and his sister have a project. Their project is about space.";

export const DETECTIVE_QUESTIONS_16 = [
  { q: "صفة الملكية الخاصة بـ Daniel.", answer: "His", explanation: "Daniel → He → his" },
  { q: "صفة الملكية الخاصة بـ Daniel's sister.", answer: "Her", explanation: "Daniel's sister → She → her" },
  { q: "صفة الملكية الخاصة بالروبوت.", answer: "its", explanation: "الروبوت → It → its" },
  { q: "صفة الملكية الخاصة بـ Daniel and his sister.", answer: "Their", explanation: "Daniel and his sister → They → their" },
  { q: "لماذا استخدمنا its مع robot؟", answer: "لأن الروبوت غير عاقل → It → its", explanation: "الروبوت شيء غير عاقل، لذلك نستخدم its." },
];

// -------------------- IQ200 (34) --------------------
export const IQ200_16 = {
  sentence: "Mia gave her brother his backpack.",
  twoOwners: "لدينا ملكيتان مختلفتان: her و his",
  questions: [
    "من صاحب: backpack؟",
    "ومن صاحب: brother؟",
  ],
  think: "فكر جيداً.",
  answer: {
    her: "her brother = أخو Mia",
    his: "his backpack = حقيبة الأخ",
  },
  rule: "إذن كل صفة ملكية تتبع الشخص الذي يملك الشيء.",
};

// -------------------- Harder Challenge (35) --------------------
export const HARDER_35 = {
  passage: "Liam visited Sara's house with his parents. Her brother showed them his new computer. Their dog was sleeping near its bed.",
  possessives: [
    { word: "his", owner: "Liam", context: "with his parents" },
    { word: "her", owner: "Sara", context: "Her brother" },
    { word: "his", owner: "Sara's brother (her brother)", context: "his new computer" },
    { word: "their", owner: "Liam + Sara's brother (them)", context: "Their dog" },
    { word: "its", owner: "the dog", context: "its bed" },
  ],
};

// -------------------- Mini Conversation (36) --------------------
export const MINI_CONVO_16 = [
  { speaker: "A", en: "Is this your notebook?" },
  { speaker: "B", en: "Yes, it is my notebook." },
  { speaker: "A", en: "Is that your sister's bag?" },
  { speaker: "B", en: "Yes, it is her bag." },
  { speaker: "A", en: "And is this Omar's camera?" },
  { speaker: "B", en: "Yes, it is his camera." },
  { speaker: "A", en: "What about that classroom?" },
  { speaker: "B", en: "It is our classroom." },
  { speaker: "A", en: "And those bicycles?" },
  { speaker: "B", en: "They are their bicycles." },
];

// -------------------- Final Challenge (37) --------------------
export const FINAL_CHALLENGE_37 = {
  task: "اكتب فقرة من 8 جمل عن عائلة أو فريق خيالي.",
  requirements: [
    "✅ my مرة واحدة على الأقل.",
    "✅ your مرة واحدة.",
    "✅ his مرة واحدة.",
    "✅ her مرة واحدة.",
    "✅ its مرة واحدة.",
    "✅ our مرة واحدة.",
    "✅ their مرة واحدة.",
    "ولا تستخدم نفس الاسم في كل الجمل.",
  ],
};

// -------------------- Summary --------------------
export const SUMMARY_16 = {
  coreMap: CORE_MAP,
  goldenFormulas: GOLDEN_FORMULAS,
  threeThings: [
    {
      n: 1,
      rule: "صفة الملكية تأتي قبل الاسم.",
      good: "my book ✅",
      bad: "my ❌",
    },
    {
      n: 2,
      rule: "صفة الملكية تعتمد على صاحب الشيء.",
      good: "Sara → her / Omar → his / They → their",
      bad: "",
    },
    {
      n: 3,
      rule: "لا تخلط: its = ملكية  |  it's = it is",
      good: "The cat is cleaning its paws.\nIt's hungry.",
      bad: "",
    },
  ],
  iq200final: "عندما ترى: my / your / his / her / its / our / their — لا تسأل فقط: ماذا تعني؟ بل اسأل: من هو صاحب الشيء؟ وما الاسم الذي بعدها؟",
  iq200examples: [
    "Sara + her + book",
    "Omar + his + bike",
    "They + their + house",
    "We + our + project",
  ],
};

// -------------------- Roadmap --------------------
export const ROADMAP_16 = [
  { n: 1, en: "Sentence Structure", ar: "تكوين الجملة" },
  { n: 2, en: "Pronouns + Verb to be", ar: "الضمائر و Verb to be" },
  { n: 3, en: "Verb to be — Negation & Questions", ar: "النفي والأسئلة" },
  { n: 4, en: "Nouns + Articles", ar: "الأسماء وأدوات التعريف" },
  { n: 5, en: "Adjectives", ar: "الصفات" },
  { n: 6, en: "Present Simple — Affirmative", ar: "المضارع البسيط مثبت" },
  { n: 7, en: "Present Simple — Negative & Questions", ar: "النفي والأسئلة" },
  { n: 8, en: "Present Simple — Review", ar: "مراجعة" },
  { n: 9, en: "Present Continuous", ar: "المضارع المستمر" },
  { n: 10, en: "Present Continuous — Advanced", ar: "الاستخدام المتقدم" },
  { n: 11, en: "Present Simple vs Present Continuous", ar: "المقارنة" },
  { n: 12, en: "Past Simple — Affirmative", ar: "الماضي البسيط مثبت" },
  { n: 13, en: "Past Simple — did / didn't", ar: "النفي والأسئلة" },
  { n: 14, en: "Past Simple — Wh Questions", ar: "أسئلة Wh" },
  { n: 15, en: "Past Simple of Verb to be — was / were", ar: "was / were" },
  { n: 16, en: "Possessive Adjectives — my / your / his / her / its / our / their", ar: "صفات الملكية", here: true },
];

export const ROADMAP_16_NEXT = "**الدرس 17: Possessive Pronouns — mine / yours / his / hers / ours / theirs**\n\nوهناك سنعمل مقارنة قوية جداً:\n\nmy book → mine\nyour bag → yours\nhis phone → his\nher jacket → hers\nour house → ours\ntheir car → theirs\n\nوبعدها نبدأ بدمج الملكية مع الجمع العادي والشاذ وملكية الأسماء، حتى تتشكل عند الطالب منظومة الملكية كاملة بدل حفظ قواعد منفصلة.";

export const COVER_PLAN_16 = "هلا وصلنا لواحدة من أهم القطع في بناء الجملة الإنجليزية: الملكية. والأهم أننا لن نحفظ my / your / his كقائمة فقط. سنفهم أولاً: ما معنى الملكية؟ أين تأتي؟ وما الفرق بين my و mine؟ لأن هذا سيجعل درس 17 أسهل بكثير.";

// -------------------- Types --------------------
export type Block16 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: "neutral" | "good" | "bad" | "focus" | "warn" }
  | { type: "list"; items: string[] }
  | { type: "note"; emoji: string; text: string }
  | { type: "coreMapBoard" }
  | { type: "ownershipRadar" }
  | { type: "possessiveList" }
  | { type: "exampleGrid"; items: { en: string; ar: string }[] }
  | { type: "itsAlarm" }
  | { type: "singularPluralBoard" }
  | { type: "mineBridge" }
  | { type: "nounPossessionBoard" }
  | { type: "comparisonBoard" }
  | { type: "irregularBoard" }
  | { type: "familyBoard" }
  | { type: "gameBoard" }
  | { type: "ownershipFlow"; items: string[] }
  | { type: "formulaStrip"; items: string[] }
  | { type: "errorStrip"; items: string[] }
  | { type: "dogExperiment" };

export type Exercise16 =
  | { type: "level1" }
  | { type: "level2" }
  | { type: "level3" }
  | { type: "level4" }
  | { type: "level5" }
  | { type: "level6" }
  | { type: "detective" }
  | { type: "iq200" }
  | { type: "harder" }
  | { type: "conversation" }
  | { type: "finalChallenge" };

export type Slide16 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block16[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise16 }
  | { kind: "summary"; title: string }
  | { kind: "keyRule"; title: string }
  | { kind: "threeRules"; title: string }
  | { kind: "iq200Final"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const CORE = "الأساس — الملكية";
const EACH = "كل ضمير وصفته";
const RULES = "القواعد الأساسية";
const CONCEPTS = "مفاهيم متقدمة";
const NOUNS = "الملكية مع الأسماء";
const PRACTICE = "التمارين والتحديات";
const END = "الخاتمة";

export const SLIDES: Slide16[] = [
  { kind: "cover", section: START, mascot: "🏠" },
  { kind: "objectives", section: START, mascot: "🎯" },

  // 1 — ما معنى الملكية؟
  {
    kind: "lesson",
    section: CORE,
    mascot: "🧠",
    step: "1",
    title: "ما معنى الملكية؟",
    lead: "الملكية تعني أن شيئاً يخص شخصاً أو شيئاً آخر.",
    blocks: [
      { type: "text", text: "مثلاً: هذا كتاب أحمد. نريد أن نقول بالإنجليزية:" },
      { type: "english", en: "Ahmed's book.", tone: "focus" },
      { type: "text", text: "أو:" },
      { type: "english", en: "His book.", tone: "focus" },
      { type: "text", text: "كلمة: his تعني أن الكتاب يخصه." },
      { type: "text", text: "مثال:" },
      { type: "english", en: "Sara has a bicycle.", ar: "سارة لديها دراجة." },
      { type: "text", text: "نقول:" },
      { type: "english", en: "Her bicycle is blue.", ar: "دراجتها زرقاء." },
      { type: "english", en: "Her = لها / خاص بها.", tone: "focus" },
      { type: "text", text: "مثال:" },
      { type: "english", en: "Omar has a phone." },
      { type: "text", text: "نقول:" },
      { type: "english", en: "His phone is new.", ar: "هاتفه جديد." },
      { type: "ownershipRadar" },
    ],
  },

  // 2 — ما هي Possessive Adjectives؟
  {
    kind: "lesson",
    section: CORE,
    mascot: "⭐",
    step: "2",
    title: "ما هي Possessive Adjectives؟",
    lead: "Possessive Adjectives = صفات الملكية.",
    blocks: [
      { type: "text", text: "وهي كلمات تخبرنا:" },
      { type: "english", en: '"لمن هذا الشيء؟"', tone: "focus" },
      { type: "text", text: "لدينا:" },
      { type: "possessiveList" },
    ],
  },

  // 3 — الخريطة الأساسية
  {
    kind: "lesson",
    section: CORE,
    mascot: "🧩",
    step: "3",
    title: "الخريطة الأساسية",
    lead: "احفظ العلاقة:",
    blocks: [
      { type: "coreMapBoard" },
      { type: "english", en: "I → my" },
      { type: "english", en: "You → your" },
      { type: "english", en: "He → his" },
      { type: "english", en: "She → her" },
      { type: "english", en: "It → its" },
      { type: "english", en: "We → our" },
      { type: "english", en: "They → their" },
      { type: "note", emoji: "🔥", text: "هذه العلاقة مهمة جداً." },
    ],
  },

  // 4 — I → MY
  {
    kind: "lesson",
    section: EACH,
    mascot: "🟦",
    step: "4",
    title: "I → MY",
    lead: "I = أنا — my = ـي / لي",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "I have a book.", ar: "لدي كتاب." },
      { type: "text", text: "نقول:" },
      { type: "english", en: "This is my book.", ar: "هذا كتابي." },
      { type: "text", text: "أمثلة:" },
      { type: "exampleGrid", items: I_MY_EXAMPLES },
    ],
  },

  // 5 — YOU → YOUR
  {
    kind: "lesson",
    section: EACH,
    mascot: "🟢",
    step: "5",
    title: "YOU → YOUR",
    lead: "You = أنت / أنتم — your = ـك / ـكم",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "You have a bicycle." },
      { type: "text", text: "نقول:" },
      { type: "english", en: "This is your bicycle.", ar: "هذه دراجتك." },
      { type: "text", text: "أمثلة:" },
      { type: "exampleGrid", items: YOU_YOUR_EXAMPLES },
    ],
  },

  // 6 — HE → HIS
  {
    kind: "lesson",
    section: EACH,
    mascot: "🔵",
    step: "6",
    title: "HE → HIS",
    lead: "He = هو — his = ـه / له",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "He has a camera." },
      { type: "english", en: "His camera is expensive.", ar: "كاميرته غالية." },
      { type: "text", text: "أمثلة:" },
      { type: "exampleGrid", items: HE_HIS_EXAMPLES },
    ],
  },

  // 7 — SHE → HER
  {
    kind: "lesson",
    section: EACH,
    mascot: "🟣",
    step: "7",
    title: "SHE → HER",
    lead: "She = هي — her = ـها / لها",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "She has a guitar." },
      { type: "english", en: "Her guitar is beautiful.", ar: "غيتارها جميل." },
      { type: "text", text: "أمثلة:" },
      { type: "exampleGrid", items: SHE_HER_EXAMPLES },
    ],
  },

  // 8 — IT → ITS
  {
    kind: "lesson",
    section: EACH,
    mascot: "🟡",
    step: "8",
    title: "IT → ITS",
    lead: "It نستخدمه عادةً لغير العاقل.",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "The robot has a battery." },
      { type: "english", en: "Its battery is small.", ar: "بطاريته صغيرة." },
      { type: "english", en: "The dog moved its tail.", ar: "حرّك الكلب ذيله." },
      { type: "text", text: "هنا: its = ملكية تعود إلى dog." },
      { type: "note", emoji: "🚨", text: "انتبه جداً — هناك فرق بين: its و: it's" },
      { type: "itsAlarm" },
    ],
  },

  // 9 — WE → OUR
  {
    kind: "lesson",
    section: EACH,
    mascot: "🟠",
    step: "9",
    title: "WE → OUR",
    lead: "We = نحن — our = ـنا / لنا",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "We have a house." },
      { type: "english", en: "Our house is large.", ar: "منزلنا كبير." },
      { type: "text", text: "أمثلة:" },
      { type: "exampleGrid", items: WE_OUR_EXAMPLES },
    ],
  },

  // 10 — THEY → THEIR
  {
    kind: "lesson",
    section: EACH,
    mascot: "🔴",
    step: "10",
    title: "THEY → THEIR",
    lead: "They = هم / هن — their = ـهم / ـهن",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "They have a car." },
      { type: "english", en: "Their car is fast.", ar: "سيارتهم سريعة." },
      { type: "text", text: "أمثلة:" },
      { type: "exampleGrid", items: THEY_THEIR_EXAMPLES },
    ],
  },

  // 11 — القاعدة الذهبية
  {
    kind: "lesson",
    section: RULES,
    mascot: "⭐",
    step: "11",
    title: "القاعدة الذهبية",
    lead: "صفات الملكية تأتي قبل الاسم.",
    blocks: [
      { type: "english", en: "Possessive Adjective + Noun", tone: "focus" },
      { type: "text", text: "مثلاً:" },
      { type: "formulaStrip", items: GOLDEN_FORMULAS },
      { type: "note", emoji: "🚨", text: "لا نقول: my ❌ إذا كنا نريد بعدها اسم. نقول: my book ✅" },
      { type: "note", emoji: "🚨", text: 'ولا نقول: her ❌ إذا كنا نريد أن نقول "حقيبتها". نقول: her bag ✅' },
      { type: "errorStrip", items: COMMON_ERRORS },
    ],
  },

  // 12 — لماذا نسميها Adjectives؟
  {
    kind: "lesson",
    section: RULES,
    mascot: "🧠",
    step: "12",
    title: "لماذا نسميها Adjectives؟",
    lead: "لأنها تأتي قبل الاسم وتحدد صاحب الشيء.",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "my book", tone: "focus" },
      { type: "text", text: "my تحدد أي كتاب. book = الاسم." },
      { type: "text", text: "مثلما تعلمنا سابقاً:" },
      { type: "english", en: "a big house" },
      { type: "text", text: "big تصف house." },
      { type: "text", text: "والآن:" },
      { type: "english", en: "my house" },
      { type: "text", text: "my تحدد صاحب house." },
    ],
  },

  // 13 — اربطها بالضمائر
  {
    kind: "lesson",
    section: RULES,
    mascot: "🧩",
    step: "13",
    title: "اربطها بالضمائر التي تعلمناها",
    lead: "تذكر:",
    blocks: [
      ...CONNECTING_PRONOUNS.flatMap((item) => [
        { type: "english" as const, en: item.pronoun },
        { type: "text" as const, text: "إذا أردنا أن نقول:" },
        { type: "english" as const, en: item.sentence, ar: item.ar },
        { type: "english" as const, en: `نستخدم: ${item.sentence.split(" ")[0]}`, tone: "focus" as const },
      ]),
    ],
  },

  // 14 — الملكية تتبع صاحب الشيء
  {
    kind: "lesson",
    section: RULES,
    mascot: "🔥",
    step: "14",
    title: "انتبه: الملكية تتبع صاحب الشيء",
    lead: "هذه نقطة مهمة جداً.",
    blocks: [
      { type: "text", text: "إذا كان الشيء ملكاً لـ Omar:" },
      { type: "ownershipFlow", items: ["Omar", "He", "his"] },
      { type: "english", en: "Omar's bicycle" },
      { type: "english", en: "His bicycle" },
      { type: "text", text: "إذا كان الشيء ملكاً لـ Sara:" },
      { type: "ownershipFlow", items: ["Sara", "She", "her"] },
      { type: "english", en: "Sara's bicycle" },
      { type: "english", en: "Her bicycle" },
      { type: "text", text: "إذا كان الشيء ملكاً لـ Omar and Sara:" },
      { type: "ownershipFlow", items: ["Omar and Sara", "They", "their"] },
      { type: "english", en: "Their bicycle" },
      { type: "note", emoji: "⭐", text: OWNERSHIP_TRACKING.rule },
    ],
  },

  // 15 — مثال ذكي جداً
  {
    kind: "lesson",
    section: CONCEPTS,
    mascot: "🧠",
    step: "15",
    title: "مثال ذكي جداً",
    blocks: [
      { type: "english", en: SMART_EXAMPLE_15.omarHasSister },
      { type: "english", en: SMART_EXAMPLE_15.herNameIsLina },
      { type: "text", text: SMART_EXAMPLE_15.whyHer },
      { type: "text", text: SMART_EXAMPLE_15.becauseSister },
      { type: "text", text: SMART_EXAMPLE_15.butWait },
      { type: "text", text: "إذا قلنا:" },
      { type: "english", en: SMART_EXAMPLE_15.hisSister },
      { type: "english", en: SMART_EXAMPLE_15.hisSisterIs },
      { type: "text", text: SMART_EXAMPLE_15.hisBecause },
      { type: "note", emoji: "🔥", text: SMART_EXAMPLE_15.rule },
    ],
  },

  // 16 — مثال مهم جداً
  {
    kind: "lesson",
    section: CONCEPTS,
    mascot: "🚨",
    step: "16",
    title: "مثال مهم جداً",
    blocks: [
      { type: "english", en: IMPORTANT_EXAMPLE_16.saraBrother },
      { type: "english", en: IMPORTANT_EXAMPLE_16.herBrother },
      { type: "text", text: IMPORTANT_EXAMPLE_16.weUseHer },
      { type: "text", text: IMPORTANT_EXAMPLE_16.notHis },
      { type: "english", en: "His brother ❌", tone: "bad" },
      { type: "text", text: "حتى لو كان brother ذكراً." },
      { type: "note", emoji: "🔥", text: IMPORTANT_EXAMPLE_16.rule },
    ],
  },

  // 17 — قاعدة IQ200
  {
    kind: "lesson",
    section: CONCEPTS,
    mascot: "🧠",
    step: "17",
    title: "قاعدة IQ200",
    lead: "لا تسأل: هل الشيء ولد أم بنت؟ اسأل: لمن يعود الشيء؟",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: IQ200_DOG.saraDog },
      { type: "english", en: IQ200_DOG.dogSmall },
      { type: "english", en: IQ200_DOG.itsName },
      { type: "text", text: "هنا: its لأن الاسم يعود إلى dog." },
      { type: "text", text: "لكن:" },
      { type: "english", en: IQ200_DOG.saraLoves },
      { type: "text", text: "هنا: her لأن dog ملك Sara." },
      { type: "dogExperiment" },
      { type: "note", emoji: "🔥", text: IQ200_DOG.rule },
    ],
  },

  // 18 — صفات الملكية مع المفرد
  {
    kind: "lesson",
    section: CONCEPTS,
    mascot: "🟦",
    step: "18",
    title: "صفات الملكية مع المفرد",
    blocks: [
      { type: "english", en: "my book" },
      { type: "english", en: "my books" },
      { type: "text", text: "لاحظ: my لا تتغير." },
      { type: "english", en: "his car" },
      { type: "english", en: "his cars" },
      { type: "english", en: "her bag" },
      { type: "english", en: "her bags" },
      { type: "english", en: "our house" },
      { type: "english", en: "our houses" },
      { type: "english", en: "their friend" },
      { type: "english", en: "their friends" },
      { type: "singularPluralBoard" },
    ],
  },

  // 19 — صفات الملكية لا تتغير
  {
    kind: "lesson",
    section: CONCEPTS,
    mascot: "⭐",
    step: "19",
    title: "صفات الملكية لا تتغير حسب عدد الأشياء",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "my book" },
      { type: "english", en: "my books" },
      { type: "text", text: "ليس:" },
      { type: "english", en: "mys books ❌", tone: "bad" },
      { type: "english", en: "her car" },
      { type: "english", en: "her cars" },
      { type: "text", text: "ليس:" },
      { type: "english", en: "hers cars ❌", tone: "bad" },
      { type: "english", en: "their house" },
      { type: "english", en: "their houses" },
      { type: "text", text: "ليس:" },
      { type: "english", en: "theirs houses ❌", tone: "bad" },
      { type: "text", text: "وهنا نصل إلى نقطة مهمة جداً لدرس 17." },
      { type: "errorStrip", items: FORM_ERRORS },
    ],
  },

  // 20 — الفرق الذي سنبني عليه
  {
    kind: "lesson",
    section: CONCEPTS,
    mascot: "🧠",
    step: "20",
    title: "الفرق الذي سنبني عليه الدرس القادم",
    lead: "قارن:",
    blocks: [
      { type: "english", en: "This is my book.", ar: "هذا كتابي." },
      { type: "text", text: "لكن:" },
      { type: "english", en: "This book is mine.", ar: "هذا الكتاب لي." },
      { type: "text", text: "الأولى:" },
      { type: "english", en: "my + noun", tone: "focus" },
      { type: "english", en: "my book" },
      { type: "text", text: "الثانية:" },
      { type: "english", en: "mine", tone: "focus" },
      { type: "text", text: "ولا يأتي بعدها الاسم." },
      { type: "text", text: "نفس الفكرة:" },
      { type: "mineBridge" },
      { type: "note", emoji: "🔥", text: "هذه ستكون بالتفصيل في الدرس 17." },
    ],
  },

  // 21 — لا تخلط HIS
  {
    kind: "lesson",
    section: CONCEPTS,
    mascot: "🚨",
    step: "21",
    title: "لا تخلط HIS",
    lead: "his حالة مميزة.",
    blocks: [
      { type: "text", text: "نقول:" },
      { type: "english", en: "his book" },
      { type: "text", text: "والضمير الملكي أيضاً:" },
      { type: "english", en: "The book is his." },
      { type: "text", text: "إذن:" },
      { type: "english", en: "his + noun" },
      { type: "text", text: "أو:" },
      { type: "english", en: "his وحدها" },
      { type: "text", text: "لكن هذا استثناء سنثبته أكثر في الدرس القادم." },
    ],
  },

  // 22 — الملكية مع الأسماء
  {
    kind: "lesson",
    section: NOUNS,
    mascot: "🟣",
    step: "22",
    title: "الملكية مع الأسماء",
    lead: "يمكننا أيضاً التعبير عن الملكية بطريقة أخرى باستخدام: 's",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "Ali's book", ar: "كتاب علي." },
      { type: "english", en: "Sara's phone", ar: "هاتف سارة." },
      { type: "english", en: "The teacher's desk", ar: "مكتب المعلم." },
      { type: "english", en: "The dog's tail", ar: "ذيل الكلب." },
      { type: "text", text: "وبعدها يمكننا تحويلها إلى Possessive Adjective عندما يكون الشخص معروفاً:" },
      { type: "english", en: "Ali's book" },
      { type: "english", en: "→ His book" },
      { type: "english", en: "Sara's phone" },
      { type: "english", en: "→ Her phone" },
      { type: "nounPossessionBoard" },
    ],
  },

  // 23 — مقارنة مهمة
  {
    kind: "lesson",
    section: NOUNS,
    mascot: "🧠",
    step: "23",
    title: "مقارنة مهمة",
    blocks: [
      { type: "english", en: "Ahmed's car" },
      { type: "english", en: "His car" },
      { type: "text", text: "كلاهما يعني: سيارة أحمد." },
      { type: "text", text: "لكن:" },
      { type: "english", en: "Ahmed's", tone: "focus" },
      { type: "text", text: "اسم + 's" },
      { type: "english", en: "His", tone: "focus" },
      { type: "text", text: "ضمير ملكية قبل الاسم." },
      { type: "comparisonBoard" },
      { type: "text", text: "لاحظ: students' = ملكية مرتبطة بالاسم. their = صفة ملكية مرتبطة بالضمير." },
      { type: "text", text: "سنتوسع في ملكية الأسماء لاحقاً، خصوصاً مع الجمع والشكل الشاذ." },
    ],
  },

  // 24 — الجمع الشاذ
  {
    kind: "lesson",
    section: NOUNS,
    mascot: "🔥",
    step: "24",
    title: "وهنا يأتي موضوع الجمع الشاذ الذي سألت عنه",
    lead: "لن ننساه.",
    blocks: [
      { type: "text", text: "لدينا مثلاً:" },
      { type: "english", en: "child → children" },
      { type: "text", text: "إذا أردنا الملكية:" },
      { type: "english", en: "the child → the child's toy" },
      { type: "english", en: "الطفل → لعبة الطفل", ar: "" },
      { type: "text", text: "لكن:" },
      { type: "english", en: "the children → the children's toys" },
      { type: "english", en: "الأطفال → ألعاب الأطفال", ar: "" },
      { type: "irregularBoard" },
      { type: "note", emoji: "🔥", text: IRREGULAR_PLURALS.note },
    ],
  },

  // 25 — الملكية مع أفراد العائلة
  {
    kind: "lesson",
    section: PRACTICE,
    mascot: "🧠",
    step: "25",
    title: "الملكية مع أفراد العائلة",
    lead: "هذه طريقة ممتازة للتدريب.",
    blocks: [
      { type: "familyBoard" },
    ],
  },

  // 26 — لعبة من صاحب الشيء؟
  {
    kind: "lesson",
    section: PRACTICE,
    mascot: "🎮",
    step: "26",
    title: 'لعبة "من صاحب الشيء؟"',
    blocks: [
      { type: "gameBoard" },
    ],
  },

  // 27 — المستوى الأول
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "27",
    title: "تمارين المستوى الأول",
    subtitle: "اختر صفة الملكية الصحيحة:",
    ex: { type: "level1" },
  },

  // 28 — المستوى الثاني
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "28",
    title: "المستوى الثاني",
    subtitle: "صل الضمير بصفة الملكية:",
    ex: { type: "level2" },
  },

  // 29 — المستوى الثالث
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "29",
    title: "المستوى الثالث",
    subtitle: "أكمل:",
    ex: { type: "level3" },
  },

  // 30 — المستوى الرابع
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "30",
    title: "المستوى الرابع — صحح الخطأ",
    subtitle: "فكر: من هو صاحب الشيء؟",
    ex: { type: "level4" },
  },

  // 31 — المستوى الخامس
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧠",
    badge: "31",
    title: "المستوى الخامس — تحليل",
    subtitle: "حلل الجملة:",
    ex: { type: "level5" },
  },

  // 32 — المستوى السادس
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    badge: "32",
    title: "المستوى السادس — الملكية مع أكثر من شخص",
    subtitle: "أكمل:",
    ex: { type: "level6" },
  },

  // 33 — Grammar Detective
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🕵️",
    badge: "33",
    title: "Grammar Detective",
    subtitle: "اقرأ واستخرج:",
    ex: { type: "detective" },
  },

  // 34 — IQ200
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🚀",
    badge: "34",
    title: "IQ200 Challenge",
    subtitle: "انظر إلى الجملة:",
    ex: { type: "iq200" },
  },

  // 35 — تحدي أصعب
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧠",
    badge: "35",
    title: "تحدي أصعب",
    subtitle: "اقرأ وحاول تحديد كل صفات الملكية:",
    ex: { type: "harder" },
  },

  // 36 — Mini Conversation
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🎭",
    badge: "36",
    title: "Mini Conversation",
    subtitle: "حوار قصير عن الملكية:",
    ex: { type: "conversation" },
  },

  // 37 — التحدي النهائي
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🏆",
    badge: "37",
    title: "التحدي النهائي",
    subtitle: FINAL_CHALLENGE_37.task,
    ex: { type: "finalChallenge" },
  },

  // ملخص
  { kind: "summary", section: END, mascot: "🧠", title: "ملخص الدرس" },

  // القاعدة الذهبية
  { kind: "keyRule", section: END, mascot: "⭐", title: "القاعدة الذهبية" },

  // ثلاثة أشياء
  { kind: "threeRules", section: END, mascot: "🚨", title: "ثلاثة أشياء لا تنساها" },

  // IQ200 الأخيرة
  { kind: "iq200Final", section: END, mascot: "🔥", title: "قاعدة IQ200 الأخيرة" },

  // Roadmap
  { kind: "roadmap", section: END, mascot: "🗺️", title: "مكاننا في المنهج" },

  // Final Quiz
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي — الدرس 16" },

  // Closing
  { kind: "closing", section: END, mascot: "🏠", title: "أحسنت!" },
];
