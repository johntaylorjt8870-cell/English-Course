// ============================================================
// الدرس 20 — Demonstratives
// المصدر المورّد هو المرجع الحرفي: لا اختصار ولا إعادة صياغة ولا حذف.
// كل وحدة إنجليزية ستُعرض داخل عازل LTR في Lesson20.tsx.
// ============================================================

// -------------------- فهرس المصدر الكامل (41 قسماً) --------------------
export const SOURCE_SECTIONS: string[] = [
  "أهداف الدرس",
  "الفكرة الأساسية",
  "النظام السحري",
  "احفظها بهذه الطريقة",
  "مثال بسيط جدًا",
  "الجدول الأساسي",
  "This",
  "That",
  "These",
  "Those",
  "الآن لدينا النظام كاملًا",
  "العلاقة مع درس الجمع",
  "ماذا عن الأشياء غير العاقلة؟",
  "This/That + اسم",
  "This/That كضمير",
  "الأسئلة",
  "الإجابات القصيرة",
  "IQ200 Connection",
  "This + Possessive Adjective",
  "This + Possessive Noun",
  "This vs These",
  "That vs Those",
  "لا تحفظها منفصلة!",
  "كيف تختار الكلمة؟",
  "مثال IQ200",
  "هل \"بعيد\" يعني فقط المسافة؟",
  "This يمكن أن تشير إلى الوقت أيضًا",
  "النفي",
  "الأسئلة مع الملكية",
  "Grammar Detective",
  "Challenge 1 — اختر الكلمة",
  "Challenge 2 — أكمل بـ is أو are",
  "IQ200 Challenge",
  "IQ200 Challenge 2",
  "FINAL BOSS",
  "لعبة السرعة",
  "الاختبار الذهبي",
  "تحدي بناء الجمل",
  "الخلاصة",
  "المستوى الذي وصلنا إليه",
  "خريطة المنهج",
];

export const SOURCE_NUMBERED_COUNT = 41;

export const LESSON_TITLE_20 = "الدرس 20: Demonstratives";
export const LESSON_SUBTITLE_20 = "This / That / These / Those";
export const LESSON_ARABIC_TITLE_20 = "أسماء الإشارة: هذا، هذه، هؤلاء، أولئك";
export const LAB_NAME_20 = "DEMONSTRATIVE CONTROL CENTER";
export const LAB_MOTTO_20 = "Singular or Plural? Near or Far? → choose the demonstrative.";
export const COVER_INTRO_20 =
  "هذا الدرس يبدو بسيطًا في البداية، لكننا سنبنيه بطريقة تجعلك قادرًا على استخدامه مع **المفرد والجمع، القريب والبعيد، الأسئلة، النفي، الملكية، وVerb to be**.";

// -------------------- أهداف الدرس --------------------
export const OBJECTIVES_20 = [
  { n: "①", text: "فهم الفرق بين This وThat." },
  { n: "②", text: "فهم الفرق بين These وThose." },
  { n: "③", text: "معرفة العلاقة بين:", items: ["مفرد ↔ جمع", "قريب ↔ بعيد"] },
  { n: "④", text: "استخدام This / That / These / Those مع الأسماء." },
  { n: "⑤", text: "استخدامهم مع is / are." },
  { n: "⑥", text: "تكوين الأسئلة والإجابات." },
  { n: "⑦", text: "ربطهم بصفات الملكية وPossessive Nouns." },
  { n: "⑧", text: "تجنب الأخطاء الشائعة." },
  { n: "⑨", text: "استخدامهم في مواقف حقيقية." },
] as const;

// -------------------- 1. الفكرة الأساسية --------------------
export const CORE_IDEA_20 = {
  intro: "لدينا سؤالان في ذهننا:",
  firstLabel: "السؤال الأول:",
  firstQuestion: "هل الشيء واحد أم أكثر من واحد؟",
  singular: "Singular = واحد",
  plural: "Plural = أكثر من واحد",
  secondLabel: "السؤال الثاني:",
  secondQuestion: "هل الشيء قريب أم بعيد؟",
  near: "Near = قريب",
  far: "Far = بعيد",
  result: "عندما ندمج السؤالين نحصل على النظام كاملًا.",
};

// -------------------- النظام السحري / الحفظ / الأمثلة --------------------
export const MAGIC_SYSTEM_20 = [
  { word: "This", ar: "مفرد + قريب", number: "Singular", distance: "Near", color: "emerald" },
  { word: "That", ar: "مفرد + بعيد", number: "Singular", distance: "Far", color: "sky" },
  { word: "These", ar: "جمع + قريب", number: "Plural", distance: "Near", color: "amber" },
  { word: "Those", ar: "جمع + بعيد", number: "Plural", distance: "Far", color: "rose" },
] as const;

export const MEMORY_20 = [
  { word: "This", ar: "واحد قريب" },
  { word: "That", ar: "واحد بعيد" },
  { word: "These", ar: "عدة أشياء قريبة" },
  { word: "Those", ar: "عدة أشياء بعيدة" },
] as const;

export const SIMPLE_EXAMPLES_20 = [
  { lead: "إذا كان كتاب واحد بجانبك:", en: "This book.", ar: "هذا الكتاب." },
  { lead: "إذا كان كتاب واحد بعيدًا عنك:", en: "That book.", ar: "ذلك الكتاب." },
  { lead: "إذا كان لديك عدة كتب بجانبك:", en: "These books.", ar: "هذه الكتب." },
  { lead: "إذا كانت عدة كتب بعيدة:", en: "Those books.", ar: "تلك الكتب." },
] as const;

export const BASIC_TABLE_20 = [
  { word: "This", formula: "Singular + Near" },
  { word: "That", formula: "Singular + Far" },
  { word: "These", formula: "Plural + Near" },
  { word: "Those", formula: "Plural + Far" },
] as const;

// -------------------- 2. This --------------------
export const THIS_20 = {
  means: "This تعني:",
  translation: "هذا / هذه",
  when: "عندما يكون الشيء:",
  conditions: ["① مفردًا", "② قريبًا"],
  examplesLabel: "أمثلة:",
  examples: [
    { en: "This book is interesting.", ar: "هذا الكتاب ممتع." },
    { en: "This phone is new.", ar: "هذا الهاتف جديد." },
    { en: "This chair is comfortable.", ar: "هذا الكرسي مريح." },
    { en: "This apple is red.", ar: "هذه التفاحة حمراء." },
  ],
  notice: "لاحظ:",
  nouns: ["book = مفرد", "phone = مفرد", "chair = مفرد", "apple = مفرد"],
  therefore: "إذن:",
  answer: "This",
  errorTitle: "خطأ شائع",
  wrong: "This books ❌",
  why: "لماذا؟",
  whyText: "لأن books جمع.",
  correctLabel: "الصحيح:",
  correct: "These books. ✅",
};

// -------------------- 3. That --------------------
export const THAT_20 = {
  means: "That تعني:",
  translation: "ذلك / تلك",
  forText: "لشيء:",
  formula: "مفرد + بعيد.",
  examplesLabel: "أمثلة:",
  examples: [
    { en: "That house is beautiful.", ar: "ذلك المنزل جميل." },
    { en: "That mountain is high.", ar: "ذلك الجبل مرتفع." },
    { en: "That bird is small.", ar: "ذلك الطائر صغير." },
    { en: "That car is expensive.", ar: "تلك السيارة غالية." },
  ],
  notice: "لاحظ:",
  nouns: ["house", "mountain", "bird", "car"],
  note: "كلها مفرد.",
  because: "ولأنها بعيدة:",
  answer: "That.",
};

// -------------------- 4. These --------------------
export const THESE_20 = {
  use: "These تستخدم مع:",
  formula: "جمع + قريب.",
  examplesLabel: "أمثلة:",
  examples: [
    { en: "These books are heavy.", ar: "هذه الكتب ثقيلة." },
    { en: "These shoes are new.", ar: "هذه الأحذية جديدة." },
    { en: "These apples are fresh.", ar: "هذه التفاحات طازجة." },
    { en: "These students are ready.", ar: "هؤلاء الطلاب جاهزون." },
  ],
  notice: "لاحظ العلاقة:",
  singular: "This book is...",
  but: "لكن:",
  plural: "These books are...",
  transformLead: "عندما يتحول المفرد إلى جمع، يتغير أيضًا:",
  transforms: ["This → These", "is → are"],
};

// -------------------- 5. Those --------------------
export const THOSE_20 = {
  use: "Those تستخدم مع:",
  formula: "جمع + بعيد.",
  examplesLabel: "أمثلة:",
  examples: [
    { en: "Those buildings are tall.", ar: "تلك المباني مرتفعة." },
    { en: "Those birds are beautiful.", ar: "تلك الطيور جميلة." },
    { en: "Those cars are fast.", ar: "تلك السيارات سريعة." },
    { en: "Those students are waiting outside.", ar: "أولئك الطلاب ينتظرون في الخارج." },
  ],
};

export const COMPLETE_SYSTEM_20 = [
  "This book is new.",
  "That book is new.",
  "These books are new.",
  "Those books are new.",
] as const;

export const BE_CONNECTIONS_20 = ["This → is", "That → is", "These → are", "Those → are"] as const;

// -------------------- 6. العلاقة مع درس الجمع --------------------
export const PLURAL_CONNECTION_20 = {
  intro: "هذا هو السبب الذي جعلنا ندرس Plural Nouns قبل هذا الدرس.",
  look: "انظر:",
  rows: [
    { transform: "book → books", singular: "This book.", plural: "These books." },
    { transform: "car → cars", singular: "That car.", plural: "Those cars." },
    { transform: "child → children", singular: "This child.", plural: "These children." },
    { transform: "woman → women", singular: "That woman.", plural: "Those women." },
    { transform: "man → men", singular: "This man.", plural: "These men." },
  ],
  closing: "الآن أنت لا تتعلم قاعدة منفصلة.",
  closing2: "أنت تربط الدروس معًا.",
};

// -------------------- 7–15: الأشخاص، الاسم، الضمير، الأسئلة --------------------
export const PEOPLE_20 = {
  intro: "This وThat يمكن استخدامهما مع الأشياء.",
  but: "لكن يمكن أيضًا استخدامهما في الحديث عن الأشخاص.",
  exampleLabel: "مثال:",
  singular: [
    { en: "This is Ali.", ar: "هذا علي." },
    { en: "That is Sara.", ar: "تلك سارة." },
  ],
  pluralLead: "ومع الجمع:",
  plural: [
    { en: "These are my friends.", ar: "هؤلاء أصدقائي." },
    { en: "Those are my teachers.", ar: "أولئك معلميّ." },
  ],
};

export const NOUN_FORM_20 = {
  lead: "عندما يأتي بعدها اسم:",
  examples: ["This book", "That car", "These students", "Those buildings"],
  formulaLabel: "التركيب:",
  formula: "Demonstrative + Noun",
};

export const PRONOUN_FORM_20 = {
  intro: "أحيانًا لا نحتاج إلى ذكر الاسم.",
  exampleLabel: "مثال:",
  singular: [
    { q: "What is this?", arQ: "ما هذا؟", a: "It's a camera.", arA: "إنها كاميرا." },
    { q: "What is that?", arQ: "ما ذلك؟", a: "It's a robot.", arA: "إنه روبوت." },
  ],
  pluralLead: "ومع الجمع:",
  plural: [
    { q: "What are these?", arQ: "ما هذه؟", a: "They are keys.", arA: "إنها مفاتيح." },
    { q: "What are those?", arQ: "ما تلك؟", a: "They are birds.", arA: "إنها طيور." },
  ],
  ruleTitle: "قاعدة مهمة",
  singularRule: ["What is this?", "What is that?"],
  pluralRule: ["What are these?", "What are those?"],
};

export const QUESTIONS_20 = {
  intro: "الآن سنبني الأسئلة.",
  forms: [
    { ar: "مفرد قريب", en: "What is this?" },
    { ar: "مفرد بعيد", en: "What is that?" },
    { ar: "جمع قريب", en: "What are these?" },
    { ar: "جمع بعيد", en: "What are those?" },
  ],
  examplesLabel: "أمثلة",
  examples: [
    { q: "What is this?", a: "It's a laptop." },
    { q: "What is that?", a: "It's a telescope." },
    { q: "What are these?", a: "They are pencils." },
    { q: "What are those?", a: "They are bicycles." },
  ],
};

export const SHORT_ANSWERS_20 = {
  pairs: [
    { q: "What is this?", a: "It's a book." },
    { q: "What is that?", a: "It's a camera." },
    { q: "What are these?", a: "They're books." },
    { q: "What are those?", a: "They're cameras." },
  ],
  notice: "لاحظ:",
  connections: ["This / That", "→ It", "These / Those", "→ They"],
};

// -------------------- IQ200 + الملكية --------------------
export const IQ200_CONNECTION_20 = {
  sentence: "This book is mine.",
  here: "هنا:",
  parts: [
    { en: "This", ar: "اسم إشارة" },
    { en: "book", ar: "اسم" },
    { en: "is", ar: "Verb to be" },
    { en: "mine", ar: "Possessive Pronoun" },
  ],
  closing: "وهكذا تستطيع دمج عدة دروس في جملة واحدة.",
};

export const POSSESSIVE_ADJECTIVE_20 = [
  { en: "This is my notebook.", ar: "هذا دفتري." },
  { en: "That is her bicycle.", ar: "تلك دراجتها." },
  { en: "These are our books.", ar: "هذه كتبنا." },
  { en: "Those are their bags.", ar: "تلك حقائبهم." },
] as const;

export const POSSESSIVE_NOUN_20 = {
  lead: "وهنا نستخدم ما تعلمناه في الدرس 19.",
  examples: [
    { en: "This is Ali's notebook.", ar: "هذا دفتر علي." },
    { en: "That is Sara's bicycle.", ar: "تلك دراجة سارة." },
    { en: "These are the boys' shoes.", ar: "هذه أحذية الأولاد." },
    { en: "Those are the children's toys.", ar: "تلك ألعاب الأطفال." },
  ],
  closing: "لاحظ كم درسًا اجتمع هنا!",
};

// -------------------- المقارنات واختيار الكلمة --------------------
export const THIS_THESE_20 = {
  intro: "هذا أحد أكثر الأخطاء شيوعًا.",
  rule1: "This = واحد",
  rule2: "These = أكثر من واحد",
  pairs: [
    ["This apple. ✅", "These apples. ✅"],
    ["This car. ✅", "These cars. ✅"],
    ["This child. ✅", "These children. ✅"],
  ],
  wrong: ["This children ❌", "These child ❌"],
};

export const THAT_THOSE_20 = {
  rule1: "That = مفرد بعيد",
  rule2: "Those = جمع بعيد",
  pairs: [
    ["That dog. ✅", "Those dogs. ✅"],
    ["That woman. ✅", "Those women. ✅"],
    ["That child. ✅", "Those children. ✅"],
  ],
};

export const TWO_QUESTION_ENGINE_20 = {
  lead: "اسأل نفسك سؤالين.",
  q1: "السؤال الأول:",
  q1Text: "واحد أم أكثر؟",
  q1Answers: ["واحد → This / That", "أكثر → These / Those"],
  q2: "السؤال الثاني:",
  q2Text: "قريب أم بعيد؟",
  q2Answers: ["قريب → This / These", "بعيد → That / Those"],
};

export const IQ200_EXAMPLE_20 = [
  {
    story: "لديك تفاحة واحدة في يدك.",
    checks: ["واحد؟", "نعم.", "قريب؟", "نعم.", "إذن:"],
    answer: "This apple.",
  },
  {
    story: "لديك ثلاث تفاحات في يدك.",
    checks: ["أكثر من واحد؟", "نعم.", "قريبة؟", "نعم.", "إذن:"],
    answer: "These apples.",
  },
  {
    story: "ترى سيارة واحدة في الشارع البعيد.",
    checks: ["واحد؟", "نعم.", "بعيدة؟", "نعم.", "إذن:"],
    answer: "That car.",
  },
  {
    story: "ترى خمس سيارات في موقف بعيد.",
    checks: ["جمع؟", "نعم.", "بعيدة؟", "نعم.", "إذن:"],
    answer: "Those cars.",
  },
] as const;

// -------------------- البعد والسياق والزمن والنفي وWhose --------------------
export const CONTEXT_DISTANCE_20 = {
  intro: "ليس بالضرورة.",
  text: "That / Those يمكن أن تستخدم أيضًا عندما يكون الشيء بعيدًا في الحديث أو السياق، وليس فقط المسافة الفيزيائية.",
  exampleLabel: "مثلًا:",
  example: "That idea is interesting.",
  translation: "تلك الفكرة مثيرة للاهتمام.",
  note: "قد لا تكون هناك \"فكرة\" موجودة أمامك فيزيائيًا.",
  therefore: "لذلك لا تجعل القاعدة:",
  wrongRule: "That = شيء على بعد 50 مترًا.",
  but: "بل:",
  correctRule: "That = مفرد يُشار إليه باعتباره بعيدًا عن المتكلم في المكان أو السياق.",
};

export const TIME_CONNECTION_20 = {
  lead: "مثل:",
  pairs: [
    { en: "This week", ar: "هذا الأسبوع." },
    { en: "This month", ar: "هذا الشهر." },
    { en: "This year", ar: "هذا العام." },
    { en: "That day", ar: "ذلك اليوم." },
    { en: "That night", ar: "تلك الليلة." },
  ],
  closing: "وسنتوسع في استخدام هذه الكلمات مع الزمن والسياق لاحقًا.",
};

export const NEGATIVE_20 = {
  lead: "يمكننا استخدام Verb to be كما تعلمنا سابقًا.",
  examples: [
    { en: "This is not my bag.", ar: "هذه ليست حقيبتي." },
    { en: "That isn't my car.", ar: "تلك ليست سيارتي." },
    { en: "These aren't my shoes.", ar: "هذه ليست أحذيتي." },
    { en: "Those aren't our books.", ar: "تلك ليست كتبنا." },
  ],
  notice: "لاحظ:",
  connections: ["This / That → is", "These / Those → are"],
};

export const WHOSE_20 = {
  questions: ["Whose is this?", "Whose is that?", "Whose are these?", "Whose are those?"],
  meanings: ["لمن هذا؟", "لمن ذلك؟", "لمن هذه؟", "لمن تلك؟"],
  examplesLabel: "أمثلة:",
  examples: [
    { q: "Whose is this?", a: "It's mine." },
    { q: "Whose is that?", a: "It's Omar's." },
    { q: "Whose are these?", a: "They're hers." },
    { q: "Whose are those?", a: "They're the students' books." },
  ],
  closing: "هنا اجتمعت:",
  connections: ["Demonstratives", "Whose", "Possessive Pronouns", "Possessive Nouns"],
};

// -------------------- Grammar Detective --------------------
export const GRAMMAR_DETECTIVE_20 = {
  intro: "صحح الأخطاء:",
  solutionLabel: "الحل",
  sentences: [
    { n: "①", wrong: "This books are new.", correct: "These books are new." },
    { n: "②", wrong: "These book is expensive.", correct: "This book is expensive." },
    { n: "③", wrong: "That cars are fast.", correct: "Those cars are fast." },
    { n: "④", wrong: "Those car is red ❌", correct: "That car is red." },
    { n: "⑤", wrong: "This are my shoes ❌", correct: "These are my shoes." },
    { n: "⑥", wrong: "Those is a beautiful building.", correct: "That is a beautiful building." },
    { n: "⑦", wrong: "These is my notebook.", correct: "This is my notebook." },
    { n: "⑧", wrong: "That are my friends ❌", correct: "Those are my friends." },
  ],
};

// -------------------- Challenge 1 / Challenge 2 --------------------
export const CHALLENGE1_20 = {
  questions: [
    { n: "①", stem: "___ apple is in my hand.", options: ["This", "These"], answer: 0 },
    { n: "②", stem: "___ apples are in my bag.", options: ["This", "These"], answer: 1 },
    { n: "③", stem: "___ building is very tall.", options: ["That", "Those"], answer: 0 },
    { n: "④", stem: "___ buildings are very tall.", options: ["That", "Those"], answer: 1 },
    { n: "⑤", stem: "___ child is my brother.", options: ["This", "These"], answer: 0 },
    { n: "⑥", stem: "___ children are my cousins.", options: ["That", "Those"], answer: 1 },
  ],
} as const;

export const CHALLENGE2_20 = {
  questions: [
    { n: "①", stem: "This ___ my phone.", answer: "is" },
    { n: "②", stem: "That ___ your backpack.", answer: "is" },
    { n: "③", stem: "These ___ my books.", answer: "are" },
    { n: "④", stem: "Those ___ your shoes.", answer: "are" },
    { n: "⑤", stem: "This ___ Sara's notebook.", answer: "is" },
    { n: "⑥", stem: "These ___ the children's toys.", answer: "are" },
    { n: "⑦", stem: "That ___ the teacher's desk.", answer: "is" },
    { n: "⑧", stem: "Those ___ the students' bags.", answer: "are" },
  ],
} as const;

// -------------------- IQ200 Challenge --------------------
export const IQ200_CHALLENGE_20 = {
  intro: "أعطيتك المعلومات التالية:",
  given: [
    "يوجد قلم واحد بجانبك.",
    "يوجد كتاب واحد بعيد عنك.",
    "يوجد ثلاثة أقلام بجانبك.",
    "يوجد أربعة كتب بعيدة عنك.",
  ],
  task: "اكتب الجمل الأربع:",
  items: [
    { n: "①", blank: "__________ pen.", answer: "This pen." },
    { n: "②", blank: "__________ book.", answer: "That book." },
    { n: "③", blank: "__________ pens.", answer: "These pens." },
    { n: "④", blank: "__________ books.", answer: "Those books." },
  ],
};

export const IQ200_CHALLENGE2_20 = {
  lead: "صحح الجمل دون تغيير معناها:",
  sentences: [
    { n: "①", wrong: "This children are playing.", correct: "These children are playing." },
    { n: "②", wrong: "Those woman are doctors.", correct: "Those women are doctors." },
    { n: "③", wrong: "These child is my brother.", correct: "This child is my brother." },
    { n: "④", wrong: "That men are teachers.", correct: "Those men are teachers." },
    { n: "⑤", wrong: "This are the boys' bags.", correct: "These are the boys' bags." },
    { n: "⑥", wrong: "Those is the children's room.", correct: "That is the children's room." },
  ],
};

// -------------------- FINAL BOSS --------------------
export const FINAL_BOSS_20 = {
  readLabel: "اقرأ الحوار:",
  dialogue: [
    { speaker: "Maya", en: "What is this?" },
    { speaker: "Noah", en: "It's my new camera." },
    { speaker: "Maya", en: "And what is that?" },
    { speaker: "Noah", en: "That's my brother's telescope." },
    { speaker: "Maya", en: "What are these?" },
    { speaker: "Noah", en: "These are our notebooks." },
    { speaker: "Maya", en: "And what are those?" },
    { speaker: "Noah", en: "Those are the children's bicycles." },
  ],
  task: "الآن أجب:",
  questions: [
    { n: "①", q: "لماذا استخدم Noah:", focus: "this", after: "في السؤال الأول؟", a: "لأن الكاميرا شيء واحد قريب من المتكلم." },
    { n: "②", q: "لماذا استخدم:", focus: "that", after: "في السؤال الثاني؟", a: "لأن التلسكوب شيء واحد بعيد عن المتكلم." },
    { n: "③", q: "لماذا استخدم:", focus: "these", after: "مع notebooks؟", a: "لأن notebooks جمع قريب." },
    { n: "④", q: "لماذا استخدم:", focus: "those", after: "مع bicycles؟", a: "لأن bicycles جمع بعيد." },
    { n: "⑤", q: "ما الفرق بين:", focusLines: ["my new camera", "و", "my brother's telescope؟"], a: "my صفة ملكية، أما my brother's فهي ملكية اسم." },
    { n: "⑥", q: "ما نوع الملكية في:", focus: "my", a: "Possessive Adjective." },
    { n: "⑦", q: "ما نوع الملكية في:", focus: "my brother's", a: "Possessive Noun." },
    { n: "⑧", q: "لماذا قلنا:", focusLines: ["children's bicycles", "ولم نقل:", "childrens' bicycles؟"], a: "لأن children جمع شاذ لا ينتهي بـ s، ولذلك نضيف 's: children's." },
  ],
};

// -------------------- لعبة السرعة / الاختبار الذهبي / بناء الجمل --------------------
export const SPEED_GAME_20 = {
  intro: "لديك أربع خانات:",
  zones: [
    { id: "this", emoji: "🟢", ar: "قريب + مفرد", answer: "This" },
    { id: "that", emoji: "🔵", ar: "بعيد + مفرد", answer: "That" },
    { id: "these", emoji: "🟡", ar: "قريب + جمع", answer: "These" },
    { id: "those", emoji: "🔴", ar: "بعيد + جمع", answer: "Those" },
  ],
  task: "ضع الكلمات في مكانها:",
  words: ["This", "That", "These", "Those"],
};

export const GOLDEN_TEST_20 = {
  intro: "لا تنظر إلى الجدول الآن.",
  task: "أكمل من الذاكرة:",
  rules: [
    { stem: "Singular + Near = ______", answer: "This" },
    { stem: "Singular + Far = ______", answer: "That" },
    { stem: "Plural + Near = ______", answer: "These" },
    { stem: "Plural + Far = ______", answer: "Those" },
  ],
  then: "ثم أكمل:",
  verbs: [
    { stem: "This ___", answer: "is" },
    { stem: "That ___", answer: "is" },
    { stem: "These ___", answer: "are" },
    { stem: "Those ___", answer: "are" },
  ],
};

export const SENTENCE_BUILDER_20 = {
  task: "كوّن جملة صحيحة باستخدام كل مجموعة:",
  groups: [
    { n: "①", tokens: ["This", "book", "interesting"], answer: "This book is interesting." },
    { n: "②", tokens: ["That", "mountain", "high"], answer: "That mountain is high." },
    { n: "③", tokens: ["These", "children", "happy"], answer: "These children are happy." },
    { n: "④", tokens: ["Those", "cars", "expensive"], answer: "Those cars are expensive." },
    { n: "⑤", tokens: ["This", "Sara's", "notebook"], answer: "This is Sara's notebook." },
    { n: "⑥", tokens: ["Those", "the children's", "toys"], answer: "Those are the children's toys." },
  ],
};

// -------------------- الخلاصة / المستوى / الخريطة --------------------
export const SUMMARY_20 = {
  intro: "لدينا أربع كلمات فقط، لكنها مبنية على محورين:",
  axis1: "المحور الأول: العدد",
  singular: "Singular = واحد",
  plural: "Plural = أكثر من واحد",
  axis2: "المحور الثاني: المسافة",
  near: "Near = قريب",
  far: "Far = بعيد",
  system: [
    "Singular + Near → This",
    "Singular + Far → That",
    "Plural + Near → These",
    "Plural + Far → Those",
  ],
  ruleTitle: "القاعدة النهائية",
  rule: ["This + singular noun", "That + singular noun", "These + plural noun", "Those + plural noun"],
  beLead: "ومع Verb to be:",
  be: ["This is...", "That is...", "These are...", "Those are..."],
};

export const LEVEL_REACHED_20 = {
  intro: "أصبح بإمكانك الآن بناء جمل تجمع عدة مفاهيم:",
  sentences: [
    "This is my brother's new computer.",
    "These are the children's books.",
    "That is Sara's old bicycle.",
    "Those are our new shoes.",
  ],
  notice: "لاحظ أن هذه الجمل ليست قاعدة واحدة؛ بل تجمع ما تعلمناه في:",
  topics: [
    "Pronouns",
    "Verb to be",
    "Nouns",
    "Adjectives",
    "Plural Nouns",
    "Possessive Adjectives",
    "Possessive Pronouns",
    "Possessive Nouns",
    "Demonstratives",
  ],
  closing: "وهذا بالضبط ما نريده: **كل درس جديد يركب فوق الدروس السابقة بدل أن يبقى منفصلًا عنها.**",
};

export const ROADMAP_20: { n: string; en: string; here?: boolean }[] = [
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
  { n: "⑳", en: "Demonstratives — This / That / These / Those", here: true },
];

export const ROADMAP_CLOSING_20 =
  "الدرس 20 أغلقنا فيه نظام أسماء الإشارة الأساسي بالكامل، وبالدرس التالي ننتقل إلى مفهوم جديد دون إعادة ما سبق.";

// ============================================================
// أنواع العرض
// ============================================================
export type Tone20 = "neutral" | "good" | "bad" | "focus" | "warn";

export type Block20 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: Tone20 }
  | { type: "mixed"; text: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "formulaStrip"; items: string[] }
  | { type: "coreIdea" }
  | { type: "magicSystem" }
  | { type: "memoryCards" }
  | { type: "nearFarScene" }
  | { type: "basicTable" }
  | { type: "thisRadar" }
  | { type: "theseMachine" }
  | { type: "beMachine" }
  | { type: "pluralBridge" }
  | { type: "peopleBoard" }
  | { type: "nounPronounBoard" }
  | { type: "questionBuilder"; mode: "pronoun" | "questions" }
  | { type: "answerBridge" }
  | { type: "iqConnection" }
  | { type: "possAdjLab" }
  | { type: "possNounLab" }
  | { type: "thisTheseComparator" }
  | { type: "thatThoseComparator" }
  | { type: "fourZoneMap" }
  | { type: "decisionEngine" }
  | { type: "iqDecisionCards" }
  | { type: "contextLab" }
  | { type: "timeLab" }
  | { type: "negativeMachine" }
  | { type: "whoseLab" };

export type Exercise20 =
  | { type: "detective" }
  | { type: "challenge1" }
  | { type: "challenge2" }
  | { type: "iq200" }
  | { type: "iq200b" }
  | { type: "finalBoss" }
  | { type: "speed" }
  | { type: "golden" }
  | { type: "builder" };

export type Slide20 = { section: string; mascot: string; sourceIndex?: number } & (
  | { kind: "cover"; title: string }
  | { kind: "objectives"; title: string }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block20[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle?: string; ex: Exercise20 }
  | { kind: "summary"; title: string }
  | { kind: "reached"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const SYSTEM = "نظام الإشارة";
const FORMS = "الأشكال الأربعة";
const CONNECTIONS = "الربط الذكي";
const DECIDE = "محرك الاختيار";
const CONTEXT = "المسافة والسياق";
const PRACTICE = "المحقق والتحديات";
const FINAL = "التحديات النهائية";
const END = "الخاتمة";

// ============================================================
// تسلسل الشرائح — مصدر 1→41 بالترتيب، ثم الاختبار والخاتمة
// ============================================================
export const SLIDES: Slide20[] = [
  { kind: "cover", section: START, mascot: "🛰️", title: LESSON_TITLE_20 },

  // 1. أهداف الدرس
  { kind: "objectives", section: START, mascot: "🎯", sourceIndex: 0, title: "أهداف الدرس" },

  // 2. الفكرة الأساسية
  {
    kind: "lesson",
    section: SYSTEM,
    mascot: "🧠",
    sourceIndex: 1,
    step: "1",
    title: "الفكرة الأساسية",
    blocks: [{ type: "coreIdea" }],
  },

  // 3. النظام السحري
  {
    kind: "lesson",
    section: SYSTEM,
    mascot: "⭐",
    sourceIndex: 2,
    step: "2",
    title: "النظام السحري",
    blocks: [{ type: "magicSystem" }],
  },

  // 4. احفظها بهذه الطريقة
  {
    kind: "lesson",
    section: SYSTEM,
    mascot: "🧠",
    sourceIndex: 3,
    step: "3",
    title: "احفظها بهذه الطريقة",
    blocks: [{ type: "memoryCards" }],
  },

  // 5. مثال بسيط جدًا
  {
    kind: "lesson",
    section: SYSTEM,
    mascot: "🎯",
    sourceIndex: 4,
    step: "4",
    title: "مثال بسيط جدًا",
    blocks: [{ type: "nearFarScene" }],
  },

  // 6. الجدول الأساسي
  {
    kind: "lesson",
    section: SYSTEM,
    mascot: "🔥",
    sourceIndex: 5,
    step: "5",
    title: "الجدول الأساسي",
    blocks: [{ type: "basicTable" }],
  },

  // 7. This
  {
    kind: "lesson",
    section: FORMS,
    mascot: "🟢",
    sourceIndex: 6,
    step: "6",
    title: "This",
    blocks: [
      { type: "text", text: THIS_20.means },
      { type: "mixed", text: THIS_20.translation },
      { type: "text", text: THIS_20.when },
      { type: "mixed", text: THIS_20.conditions.join("\n") },
      { type: "text", text: THIS_20.examplesLabel },
      ...THIS_20.examples.map((x) => ({ type: "english" as const, en: x.en, ar: x.ar })),
      { type: "text", text: THIS_20.notice },
      { type: "formulaStrip", items: [...THIS_20.nouns] },
      { type: "text", text: THIS_20.therefore },
      { type: "english", en: THIS_20.answer, tone: "focus" },
      { type: "note", emoji: "🚨", text: THIS_20.errorTitle },
      { type: "english", en: THIS_20.wrong, tone: "bad" },
      { type: "text", text: THIS_20.why },
      { type: "mixed", text: THIS_20.whyText },
      { type: "text", text: THIS_20.correctLabel },
      { type: "english", en: THIS_20.correct, tone: "good" },
      { type: "thisRadar" },
    ],
  },

  // 8. That
  {
    kind: "lesson",
    section: FORMS,
    mascot: "🔵",
    sourceIndex: 7,
    step: "7",
    title: "That",
    blocks: [
      { type: "text", text: THAT_20.means },
      { type: "mixed", text: THAT_20.translation },
      { type: "text", text: THAT_20.forText },
      { type: "mixed", text: THAT_20.formula },
      { type: "text", text: THAT_20.examplesLabel },
      ...THAT_20.examples.map((x) => ({ type: "english" as const, en: x.en, ar: x.ar })),
      { type: "text", text: THAT_20.notice },
      { type: "formulaStrip", items: [...THAT_20.nouns] },
      { type: "mixed", text: THAT_20.note },
      { type: "text", text: THAT_20.because },
      { type: "english", en: THAT_20.answer, tone: "focus" },
    ],
  },

  // 9. These
  {
    kind: "lesson",
    section: FORMS,
    mascot: "🟡",
    sourceIndex: 8,
    step: "8",
    title: "These",
    blocks: [
      { type: "text", text: THESE_20.use },
      { type: "mixed", text: THESE_20.formula },
      { type: "text", text: THESE_20.examplesLabel },
      ...THESE_20.examples.map((x) => ({ type: "english" as const, en: x.en, ar: x.ar })),
      { type: "text", text: THESE_20.notice },
      { type: "english", en: THESE_20.singular },
      { type: "text", text: THESE_20.but },
      { type: "english", en: THESE_20.plural },
      { type: "note", emoji: "🔥", text: THESE_20.transformLead },
      { type: "formulaStrip", items: [...THESE_20.transforms] },
      { type: "theseMachine" },
    ],
  },

  // 10. Those
  {
    kind: "lesson",
    section: FORMS,
    mascot: "🔴",
    sourceIndex: 9,
    step: "9",
    title: "Those",
    blocks: [
      { type: "text", text: THOSE_20.use },
      { type: "mixed", text: THOSE_20.formula },
      { type: "text", text: THOSE_20.examplesLabel },
      ...THOSE_20.examples.map((x) => ({ type: "english" as const, en: x.en, ar: x.ar })),
    ],
  },

  // 11. الآن لدينا النظام كاملًا
  {
    kind: "lesson",
    section: FORMS,
    mascot: "🔥",
    sourceIndex: 10,
    step: "10",
    title: "الآن لدينا النظام كاملًا",
    blocks: [
      { type: "formulaStrip", items: [...COMPLETE_SYSTEM_20] },
      { type: "text", text: "لاحظ:" },
      { type: "beMachine" },
    ],
  },

  // 12. العلاقة مع درس الجمع
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🔁",
    sourceIndex: 11,
    step: "11",
    title: "العلاقة مع درس الجمع",
    blocks: [{ type: "pluralBridge" }],
  },

  // 13. ماذا عن الأشياء غير العاقلة؟
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "👥",
    sourceIndex: 12,
    step: "12",
    title: "ماذا عن الأشياء غير العاقلة؟",
    blocks: [{ type: "peopleBoard" }],
  },

  // 14. This/That + اسم
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🏷️",
    sourceIndex: 13,
    step: "13",
    title: "This/That + اسم",
    blocks: [{ type: "nounPronounBoard" }],
  },

  // 15. This/That كضمير
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "💬",
    sourceIndex: 14,
    step: "14",
    title: "This/That كضمير",
    blocks: [
      { type: "text", text: PRONOUN_FORM_20.intro },
      { type: "text", text: PRONOUN_FORM_20.exampleLabel },
      { type: "questionBuilder", mode: "pronoun" },
    ],
  },

  // 16. الأسئلة
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "❓",
    sourceIndex: 15,
    step: "15",
    title: "الأسئلة",
    blocks: [{ type: "questionBuilder", mode: "questions" }],
  },

  // 17. الإجابات القصيرة
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🌉",
    sourceIndex: 16,
    step: "16",
    title: "الإجابات القصيرة",
    blocks: [{ type: "answerBridge" }],
  },

  // 18. IQ200 Connection
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🔥",
    sourceIndex: 17,
    step: "17",
    title: "IQ200 Connection",
    blocks: [{ type: "iqConnection" }],
  },

  // 19. This + Possessive Adjective
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🔗",
    sourceIndex: 18,
    step: "18",
    title: "This + Possessive Adjective",
    blocks: [{ type: "possAdjLab" }],
  },

  // 20. This + Possessive Noun
  {
    kind: "lesson",
    section: CONNECTIONS,
    mascot: "🔗",
    sourceIndex: 19,
    step: "19",
    title: "This + Possessive Noun",
    blocks: [{ type: "possNounLab" }],
  },

  // 21. This vs These
  {
    kind: "lesson",
    section: DECIDE,
    mascot: "⚖️",
    sourceIndex: 20,
    step: "20",
    title: "This vs These",
    blocks: [{ type: "thisTheseComparator" }],
  },

  // 22. That vs Those
  {
    kind: "lesson",
    section: DECIDE,
    mascot: "⚖️",
    sourceIndex: 21,
    step: "21",
    title: "That vs Those",
    blocks: [{ type: "thatThoseComparator" }],
  },

  // 23. لا تحفظها منفصلة!
  {
    kind: "lesson",
    section: DECIDE,
    mascot: "🗺️",
    sourceIndex: 22,
    step: "22",
    title: "لا تحفظها منفصلة!",
    blocks: [
      { type: "text", text: "استخدم هذه الخريطة:" },
      { type: "fourZoneMap" },
      { type: "note", emoji: "🔥", text: "إذا حفظت هذا الجدول، فقد فهمت 80% من الدرس." },
    ],
  },

  // 24. كيف تختار الكلمة؟
  {
    kind: "lesson",
    section: DECIDE,
    mascot: "🧭",
    sourceIndex: 23,
    step: "23",
    title: "كيف تختار الكلمة؟",
    blocks: [{ type: "decisionEngine" }],
  },

  // 25. مثال IQ200
  {
    kind: "lesson",
    section: DECIDE,
    mascot: "🚀",
    sourceIndex: 24,
    step: "24",
    title: "مثال IQ200",
    blocks: [{ type: "iqDecisionCards" }],
  },

  // 26. هل "بعيد" يعني فقط المسافة؟
  {
    kind: "lesson",
    section: CONTEXT,
    mascot: "🛰️",
    sourceIndex: 25,
    step: "25",
    title: "هل \"بعيد\" يعني فقط المسافة؟",
    blocks: [{ type: "contextLab" }],
  },

  // 27. This يمكن أن تشير إلى الوقت أيضًا
  {
    kind: "lesson",
    section: CONTEXT,
    mascot: "🕰️",
    sourceIndex: 26,
    step: "26",
    title: "This يمكن أن تشير إلى الوقت أيضًا",
    blocks: [{ type: "timeLab" }],
  },

  // 28. النفي
  {
    kind: "lesson",
    section: CONTEXT,
    mascot: "🚫",
    sourceIndex: 27,
    step: "27",
    title: "النفي",
    blocks: [{ type: "negativeMachine" }],
  },

  // 29. الأسئلة مع الملكية
  {
    kind: "lesson",
    section: CONTEXT,
    mascot: "🕵️",
    sourceIndex: 28,
    step: "28",
    title: "الأسئلة مع الملكية",
    blocks: [{ type: "whoseLab" }],
  },

  // 30. Grammar Detective
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🕵️",
    sourceIndex: 29,
    badge: "29",
    title: "Grammar Detective",
    subtitle: GRAMMAR_DETECTIVE_20.intro,
    ex: { type: "detective" },
  },

  // 31. Challenge 1
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧩",
    sourceIndex: 30,
    badge: "30",
    title: "Challenge 1 — اختر الكلمة",
    ex: { type: "challenge1" },
  },

  // 32. Challenge 2
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧩",
    sourceIndex: 31,
    badge: "31",
    title: "Challenge 2 — أكمل بـ is أو are",
    ex: { type: "challenge2" },
  },

  // 33. IQ200 Challenge
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🚀",
    sourceIndex: 32,
    badge: "32",
    title: "IQ200 Challenge",
    ex: { type: "iq200" },
  },

  // 34. IQ200 Challenge 2
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    sourceIndex: 33,
    badge: "33",
    title: "IQ200 Challenge 2",
    ex: { type: "iq200b" },
  },

  // 35. FINAL BOSS
  {
    kind: "ex",
    section: FINAL,
    mascot: "🏆",
    sourceIndex: 34,
    badge: "34",
    title: "FINAL BOSS",
    ex: { type: "finalBoss" },
  },

  // 36. لعبة السرعة
  {
    kind: "ex",
    section: FINAL,
    mascot: "🎮",
    sourceIndex: 35,
    badge: "35",
    title: "لعبة السرعة",
    ex: { type: "speed" },
  },

  // 37. الاختبار الذهبي
  {
    kind: "ex",
    section: FINAL,
    mascot: "🧠",
    sourceIndex: 36,
    badge: "36",
    title: "الاختبار الذهبي",
    ex: { type: "golden" },
  },

  // 38. تحدي بناء الجمل
  {
    kind: "ex",
    section: FINAL,
    mascot: "🏗️",
    sourceIndex: 37,
    badge: "37",
    title: "تحدي بناء الجمل",
    ex: { type: "builder" },
  },

  // 39. الخلاصة
  { kind: "summary", section: END, mascot: "🧠", sourceIndex: 38, title: "الخلاصة" },

  // 40. المستوى الذي وصلنا إليه
  { kind: "reached", section: END, mascot: "🔥", sourceIndex: 39, title: "المستوى الذي وصلنا إليه" },

  // 41. خريطة المنهج
  { kind: "roadmap", section: END, mascot: "🗺️", sourceIndex: 40, title: "خريطة المنهج" },

  // الاختبار النهائي المشترك
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي — الدرس 20" },
  { kind: "closing", section: END, mascot: "🏆", title: "أحسنت!" },
];

// ============================================================
// SOURCE_FIDELITY_MARKERS_20 — فهرس مباشر للمادة المصدرية.
// ============================================================
export const SOURCE_FIDELITY_MARKERS_20: string[] = [
  ...SOURCE_SECTIONS,
  LESSON_TITLE_20,
  LESSON_SUBTITLE_20,
  LESSON_ARABIC_TITLE_20,
  COVER_INTRO_20,
  ...OBJECTIVES_20.flatMap((x) => [x.text, ...("items" in x ? x.items : [])]),
  CORE_IDEA_20.intro,
  CORE_IDEA_20.firstQuestion,
  CORE_IDEA_20.singular,
  CORE_IDEA_20.plural,
  CORE_IDEA_20.secondQuestion,
  CORE_IDEA_20.near,
  CORE_IDEA_20.far,
  CORE_IDEA_20.result,
  ...MAGIC_SYSTEM_20.flatMap((x) => [x.word, x.ar]),
  ...MEMORY_20.flatMap((x) => [x.word, x.ar]),
  ...SIMPLE_EXAMPLES_20.flatMap((x) => [x.lead, x.en, x.ar]),
  ...BASIC_TABLE_20.flatMap((x) => [x.word, x.formula]),
  ...THIS_20.examples.flatMap((x) => [x.en, x.ar]),
  ...THIS_20.nouns,
  THIS_20.wrong,
  THIS_20.correct,
  ...THAT_20.examples.flatMap((x) => [x.en, x.ar]),
  ...THAT_20.nouns,
  THAT_20.answer,
  ...THESE_20.examples.flatMap((x) => [x.en, x.ar]),
  THESE_20.singular,
  THESE_20.plural,
  ...THESE_20.transforms,
  ...THOSE_20.examples.flatMap((x) => [x.en, x.ar]),
  ...COMPLETE_SYSTEM_20,
  ...BE_CONNECTIONS_20,
  PLURAL_CONNECTION_20.intro,
  ...PLURAL_CONNECTION_20.rows.flatMap((x) => [x.transform, x.singular, x.plural]),
  PLURAL_CONNECTION_20.closing,
  PLURAL_CONNECTION_20.closing2,
  ...PEOPLE_20.singular.flatMap((x) => [x.en, x.ar]),
  ...PEOPLE_20.plural.flatMap((x) => [x.en, x.ar]),
  ...NOUN_FORM_20.examples,
  NOUN_FORM_20.formula,
  ...PRONOUN_FORM_20.singular.flatMap((x) => [x.q, x.a, x.arQ, x.arA]),
  ...PRONOUN_FORM_20.plural.flatMap((x) => [x.q, x.a, x.arQ, x.arA]),
  ...QUESTIONS_20.forms.flatMap((x) => [x.ar, x.en]),
  ...QUESTIONS_20.examples.flatMap((x) => [x.q, x.a]),
  ...SHORT_ANSWERS_20.pairs.flatMap((x) => [x.q, x.a]),
  ...SHORT_ANSWERS_20.connections,
  IQ200_CONNECTION_20.sentence,
  ...IQ200_CONNECTION_20.parts.flatMap((x) => [x.en, x.ar]),
  ...POSSESSIVE_ADJECTIVE_20.flatMap((x) => [x.en, x.ar]),
  ...POSSESSIVE_NOUN_20.examples.flatMap((x) => [x.en, x.ar]),
  ...THIS_THESE_20.pairs.flat(),
  ...THIS_THESE_20.wrong,
  ...THAT_THOSE_20.pairs.flat(),
  ...TWO_QUESTION_ENGINE_20.q1Answers,
  ...TWO_QUESTION_ENGINE_20.q2Answers,
  ...IQ200_EXAMPLE_20.flatMap((x) => [x.story, ...x.checks, x.answer]),
  CONTEXT_DISTANCE_20.text,
  CONTEXT_DISTANCE_20.example,
  CONTEXT_DISTANCE_20.wrongRule,
  CONTEXT_DISTANCE_20.correctRule,
  ...TIME_CONNECTION_20.pairs.flatMap((x) => [x.en, x.ar]),
  ...NEGATIVE_20.examples.flatMap((x) => [x.en, x.ar]),
  ...NEGATIVE_20.connections,
  ...WHOSE_20.questions,
  ...WHOSE_20.examples.flatMap((x) => [x.q, x.a]),
  ...WHOSE_20.connections,
  ...GRAMMAR_DETECTIVE_20.sentences.flatMap((x) => [x.wrong, x.correct]),
  ...CHALLENGE1_20.questions.flatMap((x) => [x.stem, ...x.options]),
  ...CHALLENGE2_20.questions.map((x) => x.stem),
  ...IQ200_CHALLENGE_20.given,
  ...IQ200_CHALLENGE_20.items.flatMap((x) => [x.blank, x.answer]),
  ...IQ200_CHALLENGE2_20.sentences.flatMap((x) => [x.wrong, x.correct]),
  ...FINAL_BOSS_20.dialogue.map((x) => `${x.speaker}: ${x.en}`),
  ...FINAL_BOSS_20.questions.flatMap((x) => [x.q, ...(x.focus ? [x.focus] : []), ...(x.focusLines ?? []), ...(x.after ? [x.after] : [])]),
  ...SPEED_GAME_20.zones.flatMap((x) => [x.ar, x.answer]),
  ...GOLDEN_TEST_20.rules.flatMap((x) => [x.stem, x.answer]),
  ...GOLDEN_TEST_20.verbs.flatMap((x) => [x.stem, x.answer]),
  ...SENTENCE_BUILDER_20.groups.flatMap((x) => [...x.tokens, x.answer]),
  SUMMARY_20.intro,
  SUMMARY_20.axis1,
  SUMMARY_20.singular,
  SUMMARY_20.plural,
  SUMMARY_20.axis2,
  SUMMARY_20.near,
  SUMMARY_20.far,
  ...SUMMARY_20.system,
  ...SUMMARY_20.rule,
  ...SUMMARY_20.be,
  ...LEVEL_REACHED_20.sentences,
  ...LEVEL_REACHED_20.topics,
  LEVEL_REACHED_20.closing,
  ...ROADMAP_20.map((x) => x.en),
  ROADMAP_CLOSING_20,
];

/** الأخطاء المقصودة في المصدر — تبقى مواد كشف/تصحيح ولا تُستبدل بصمت. */
export const INTENTIONALLY_WRONG_20: string[] = [
  "This books ❌",
  "This children ❌",
  "These child ❌",
  "Those car is red ❌",
  "This are my shoes ❌",
  "That are my friends ❌",
  "This books are new.",
  "These book is expensive.",
  "That cars are fast.",
  "Those car is red.",
  "This are my shoes.",
  "Those is a beautiful building.",
  "These is my notebook.",
  "That are my friends.",
  "This children are playing.",
  "Those woman are doctors.",
  "These child is my brother.",
  "That men are teachers.",
  "This are the boys' bags.",
  "Those is the children's room.",
];
