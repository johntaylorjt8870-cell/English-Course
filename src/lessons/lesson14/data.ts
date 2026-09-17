// ============================================================
// الدرس 14 — Past Simple — Wh Questions والتطبيق الشامل
// المصدر الكامل محفوظ في ترتيب أقسامه وأمثلته وتمارينه.
// لا تُعدّل نصوص الأمثلة الخاطئة؛ فهي جزء مقصود من مادة التصحيح.
// ============================================================

export const SOURCE_SECTIONS: string[] = [
  "🎯 أهداف الدرس",
  "🧠 1. قبل أن نبدأ: ماذا أصبحنا نعرف؟",
  "🟦 2. ما هي Wh Questions؟",
  "⭐ 3. القاعدة الأساسية",
  "🟢 4. What — ماذا؟",
  "🟣 5. Where — أين؟",
  "🟡 6. When — متى؟",
  "🔴 7. Why — لماذا؟",
  "🟠 8. How — كيف؟",
  "🔵 9. Who — من؟",
  "🧠 10. قاعدة ترتيب السؤال",
  "🧩 11. السؤال الذكي",
  "🚨 12. انتبه إلى الفرق",
  "🧠 13. السؤال المباشر مقابل الإجابة",
  "⭐ 14. لا تكرر did في الإجابة",
  "🔥 15. السؤال والنفي والجملة المثبتة",
  "🧠 16. جدول التحكم",
  "⚡ 17. الأفعال الشاذة لا تختفي!",
  "🧠 18. لماذا هذا مهم؟",
  "🎮 19. لعبة تحويل الزمن",
  "✏️ 20. تمارين المستوى الأول",
  "✏️ 21. المستوى الثاني",
  "✏️ 22. المستوى الثالث",
  "✅ الحل",
  "🔥 23. المستوى الرابع — ابنِ الأسئلة",
  "🕵️ 24. Grammar Detective",
  "🚀 25. IQ200 Challenge",
  "🧠 26. تحدي أصعب",
  "🎭 27. Mini Conversation",
  "🏆 28. التحدي النهائي",
  "🧠 خلاصة الدرس 14",
  "🔥 القاعدة الذهبية",
  "📚 مكاننا في المنهج",
];

export type Role14 =
  | "subject"
  | "past"
  | "base"
  | "did"
  | "wh"
  | "object"
  | "place"
  | "time"
  | "reason"
  | "method";

export interface Part14 {
  text: string;
  role: Role14;
}

export const ROLE14_AR: Record<Role14, string> = {
  subject: "الفاعل",
  past: "الفعل الماضي",
  base: "الفعل الأساسي",
  did: "أداة الماضي",
  wh: "أداة السؤال",
  object: "المفعول به / الشيء",
  place: "المكان",
  time: "الزمن",
  reason: "السبب",
  method: "الطريقة",
};

const P = (text: string, role: Role14): Part14 => ({ text, role });

export type FormulaKey14 = "affirmative" | "negative" | "yesNo" | "wh";

export interface Formula14 {
  key: FormulaKey14;
  label: string;
  tokens: { text: string; label?: string }[];
  source: string;
}

export const FORMULAS_14: Formula14[] = [
  {
    key: "affirmative",
    label: "مثبت",
    source: "Subject + Past Verb",
    tokens: [
      { text: "Subject", label: "الفاعل" },
      { text: "+" },
      { text: "Past Verb", label: "الفعل الماضي" },
    ],
  },
  {
    key: "negative",
    label: "نفي",
    source: "Subject + didn't + Base Verb",
    tokens: [
      { text: "Subject", label: "الفاعل" },
      { text: "+" },
      { text: "didn't", label: "النفي" },
      { text: "+" },
      { text: "Base Verb", label: "الفعل الأساسي" },
    ],
  },
  {
    key: "yesNo",
    label: "سؤال Yes/No",
    source: "Did + Subject + Base Verb?",
    tokens: [
      { text: "Did", label: "أداة الماضي" },
      { text: "+" },
      { text: "Subject", label: "الفاعل" },
      { text: "+" },
      { text: "Base Verb", label: "الفعل الأساسي" },
      { text: "?" },
    ],
  },
  {
    key: "wh",
    label: "سؤال Wh",
    source: "Wh-word + did + Subject + Base Verb?",
    tokens: [
      { text: "Wh-word", label: "أداة السؤال" },
      { text: "+" },
      { text: "did", label: "أداة الماضي" },
      { text: "+" },
      { text: "Subject", label: "الفاعل" },
      { text: "+" },
      { text: "Base Verb", label: "الفعل الأساسي" },
      { text: "?" },
    ],
  },
];

export const FORMULA_STRINGS_14: Record<FormulaKey14, string> = {
  affirmative: "Subject + Past Verb",
  negative: "Subject + didn't + Base Verb",
  yesNo: "Did + Subject + Base Verb?",
  wh: "Wh-word + did + Subject + Base Verb?",
};

// -------------------- أهداف الدرس --------------------
export const OBJECTIVES_14: { n: string; text: string }[] = [
  { n: "①", text: "تكوين أسئلة الماضي باستخدام What / Where / When / Why / Who / How." },
  { n: "②", text: "معرفة مكان did في السؤال." },
  { n: "③", text: "معرفة متى نستخدم Base Verb بعد did." },
  { n: "④", text: "الإجابة عن أسئلة الماضي بإجابة قصيرة أو كاملة." },
  { n: "⑤", text: "التفريق بين سؤال Yes/No وسؤال Wh." },
  { n: "⑥", text: "اكتشاف الأخطاء وتصحيحها." },
  { n: "⑦", text: "استخدام Past Simple في حوار وقصة حقيقية." },
];

// -------------------- ① قبل أن نبدأ --------------------
export const RECAP_14 = {
  affirmative: { en: "Maya visited the aquarium.", ar: "زارت مايا الأكواريوم." },
  negative: { en: "Maya didn't visit the aquarium.", ar: "مايا لم تزر الأكواريوم." },
  yesNo: { en: "Did Maya visit the aquarium?", ar: "هل زارت مايا الأكواريوم؟" },
  wh: { en: "Where did Maya go?", ar: "أين ذهبت مايا؟" },
  whMeaning: "أين ذهبت مايا؟",
};

// -------------------- ②–⑨ أدوات Wh وأمثلتها --------------------
export const WH_MEANINGS_14: {
  word: string;
  ar: string;
  function: string;
  examples: { en: string; ar: string }[];
}[] = [
  {
    word: "What",
    ar: "ماذا / ما",
    function: "thing/information",
    examples: [
      { en: "What did she buy?", ar: "ماذا اشترت؟" },
      { en: "What did they find?", ar: "ماذا وجدوا؟" },
      { en: "What did Omar write?", ar: "ماذا كتب عمر؟" },
    ],
  },
  {
    word: "Where",
    ar: "أين",
    function: "place",
    examples: [
      { en: "Where did Nora go?", ar: "أين ذهبت نورا؟" },
      { en: "Where did they stay?", ar: "أين أقاموا؟" },
      { en: "Where did he find the notebook?", ar: "أين وجد الدفتر؟" },
    ],
  },
  {
    word: "When",
    ar: "متى",
    function: "time",
    examples: [
      { en: "When did Lina arrive?", ar: "متى وصلت لينا؟" },
      { en: "When did they start the competition?", ar: "متى بدأوا المسابقة؟" },
      { en: "When did he leave the house?", ar: "متى غادر المنزل؟" },
    ],
  },
  {
    word: "Why",
    ar: "لماذا",
    function: "reason",
    examples: [
      { en: "Why did he leave early?", ar: "لماذا غادر مبكراً؟" },
      { en: "Why did they stop the experiment?", ar: "لماذا أوقفوا التجربة؟" },
    ],
  },
  {
    word: "Who",
    ar: "من",
    function: "person",
    examples: [{ en: "Who did Sara meet?", ar: "من قابلت سارة؟" }],
  },
  {
    word: "How",
    ar: "كيف",
    function: "method",
    examples: [
      { en: "How did she solve the puzzle?", ar: "كيف حلت اللغز؟" },
      { en: "How did they cross the river?", ar: "كيف عبروا النهر؟" },
    ],
  },
];

export const WHAT_EXAMPLES_14 = [
  { sentence: "She bought a telescope.", question: "What did she buy?", arSentence: "اشترت تلسكوباً.", arQuestion: "ماذا اشترت؟", change: "bought → buy" },
  { sentence: "They found a strange object.", question: "What did they find?", arSentence: "وجدوا شيئاً غريباً.", arQuestion: "ماذا وجدوا؟", change: "found → find" },
  { sentence: "Omar wrote a poem.", question: "What did Omar write?", arSentence: "كتب عمر قصيدة.", arQuestion: "ماذا كتب عمر؟", change: "wrote → write" },
];

export const WHERE_EXAMPLES_14 = [
  { sentence: "Nora went to the library.", question: "Where did Nora go?", arSentence: "ذهبت نورا إلى المكتبة.", arQuestion: "أين ذهبت نورا؟" },
  { sentence: "They stayed in a small village.", question: "Where did they stay?", arSentence: "أقاموا في قرية صغيرة.", arQuestion: "أين أقاموا؟" },
  { sentence: "He found the notebook under the desk.", question: "Where did he find the notebook?", arSentence: "وجد الدفتر تحت المكتب.", arQuestion: "أين وجد الدفتر؟" },
];

export const WHEN_EXAMPLES_14 = [
  { sentence: "Lina arrived at 8:00.", question: "When did Lina arrive?", arSentence: "وصلت لينا الساعة 8:00.", arQuestion: "متى وصلت لينا؟" },
  { sentence: "They started the competition last Saturday.", question: "When did they start the competition?", arSentence: "بدأوا المسابقة السبت الماضي.", arQuestion: "متى بدأوا المسابقة؟" },
  { sentence: "He left the house early in the morning.", question: "When did he leave the house?", arSentence: "غادر المنزل مبكراً في الصباح.", arQuestion: "متى غادر المنزل؟" },
];

export const WHY_EXAMPLES_14 = [
  { sentence: "He left early because he was tired.", question: "Why did he leave early?", arSentence: "غادر مبكراً لأنه كان متعباً.", arQuestion: "لماذا غادر مبكراً؟" },
  { sentence: "They stopped the experiment because the machine became hot.", question: "Why did they stop the experiment?", arSentence: "أوقفوا التجربة لأن الآلة أصبحت ساخنة.", arQuestion: "لماذا أوقفوا التجربة؟" },
];

export const HOW_EXAMPLES_14 = [
  { sentence: "She solved the puzzle quickly.", question: "How did she solve the puzzle?", arSentence: "حلت اللغز بسرعة.", arQuestion: "كيف حلت اللغز؟" },
  { sentence: "They crossed the river by boat.", question: "How did they cross the river?", arSentence: "عبروا النهر بالقارب.", arQuestion: "كيف عبروا النهر؟" },
];

export const WHO_EXAMPLE_14 = {
  sentence: "Sara met Omar.",
  question: "Who did Sara meet?",
  arSentence: "قابلت سارة عمر.",
  arQuestion: "من قابلت سارة؟",
  order: "Who + did + Sara + meet",
};

// -------------------- ⑩–⑫ ترتيب السؤال و Who --------------------
export const DANIEL_SENTENCE_14 = {
  sentence: "Daniel found a mysterious key in the garden yesterday.",
  parts: [
    { en: "Daniel", ar: "من قام بالفعل", role: "subject" },
    { en: "found", ar: "الفعل", role: "past" },
    { en: "a mysterious key", ar: "ماذا وجد", role: "object" },
    { en: "in the garden", ar: "أين", role: "place" },
    { en: "yesterday", ar: "متى", role: "time" },
  ],
  questions: [
    { en: "Who found a mysterious key?", ar: "من وجد مفتاحاً غامضاً؟", answer: "Daniel.", kind: "subject" },
    { en: "What did Daniel find?", ar: "ماذا وجد دانيال؟", answer: "A mysterious key.", kind: "object" },
    { en: "Where did Daniel find the key?", ar: "أين وجد دانيال المفتاح؟", answer: "In the garden.", kind: "place" },
    { en: "When did Daniel find the key?", ar: "متى وجد دانيال المفتاح؟", answer: "Yesterday.", kind: "time" },
  ],
};

export const EMMA_SENTENCE_14 = {
  sentence: "Emma visited the science museum last Friday.",
  questions: [
    { en: "Who visited the science museum?", ar: "من زار متحف العلوم؟", answer: "Emma." },
    { en: "Where did Emma go?", ar: "أين ذهبت إيما؟", answer: "To the science museum." },
    { en: "When did Emma go?", ar: "متى ذهبت إيما؟", answer: "Last Friday." },
  ],
};

export const WHO_CONTRAST_14 = {
  subject: {
    question: "Who visited the science museum?",
    arQuestion: "من قام بالفعل؟",
    explanation: "Who = Subject",
    rule: "لا نحتاج did.",
  },
  object: {
    question: "Who did Emma visit?",
    arQuestion: "من قابلت إيما؟",
    explanation: "Who = Object",
    rule: "نستخدم did.",
  },
};

// -------------------- ⑬–⑱ الإجابات والصيغ --------------------
export const ANSWER_COMPARISONS_14 = [
  { question: "Where did Noah travel?", short: "To Canada.", full: "Noah traveled to Canada." },
  { question: "What did Sara buy?", short: "A new laptop.", full: "Sara bought a new laptop." },
  { question: "When did they arrive?", short: "At noon.", full: "They arrived at noon." },
];

export const NO_REPEAT_14 = {
  question: "Where did she go?",
  wrong: "She did go to the park.",
  correct: "She went to the park.",
  ar: "في الإجابة العادية: هي ذهبت إلى الحديقة.",
  why: "لأن did كان أداة للسؤال فقط. أما في الجملة المثبتة، يعود الماضي إلى الفعل: go → went",
};

export const FOUR_WAYS_14 = {
  affirmative: "He discovered a hidden room.",
  negative: "He didn't discover a hidden room.",
  yesNo: "Did he discover a hidden room?",
  what: "What did he discover?",
  where: "Where did he discover the room?",
};

export const CONTROL_TABLE_14 = [
  { label: "مثبت", formula: "Subject + Past Verb", example: "She wrote a letter." },
  { label: "نفي", formula: "Subject + didn't + Base Verb", example: "She didn't write a letter." },
  { label: "سؤال Yes/No", formula: "Did + Subject + Base Verb?", example: "Did she write a letter?" },
  { label: "سؤال Wh", formula: "Wh + did + Subject + Base Verb?", example: "What did she write?" },
];

export const IRREGULAR_CONTROL_14 = {
  take: [
    { label: "في الجملة المثبتة", en: "He took the map." },
    { label: "عند النفي", en: "He didn't take the map." },
    { label: "السؤال", en: "Did he take the map?" },
    { label: "Wh", en: "What did he take?" },
  ],
  takeChange: "take → took",
  see: [
    { label: "المثبت", en: "She saw the bird." },
    { label: "النفي", en: "She didn't see the bird." },
    { label: "السؤال", en: "Did she see the bird?" },
    { label: "Wh", en: "What did she see?" },
  ],
  seeChange: "see → saw",
};

export const WHY_IMPORTANT_14 = {
  thought: "الفعل شاذ، إذن يجب أن أستخدم شكله الماضي دائماً.",
  correction: "وهذا خطأ.",
  rule: "استخدم Past Form عندما لا يوجد Auxiliary يحمل الماضي.",
  didRule: "إذا كان لدينا: did فالفعل الرئيسي يعود إلى Base Form.",
};

// -------------------- ⑲ لعبة تحويل الزمن --------------------
export const CONVERSION_GAME_14 = [
  {
    word: "GO",
    forms: ["She went.", "She didn't go.", "Did she go?", "Where did she go?"],
    labels: ["الجملة المثبتة", "النفي", "السؤال", "Wh"],
  },
  {
    word: "WRITE",
    forms: ["She wrote.", "She didn't write.", "Did she write?", "What did she write?"],
    labels: ["الجملة المثبتة", "النفي", "السؤال", "Wh"],
  },
  {
    word: "BUY",
    forms: ["He bought.", "He didn't buy.", "Did he buy?", "What did he buy?"],
    labels: ["الجملة المثبتة", "النفي", "السؤال", "Wh"],
  },
];

// -------------------- ⑳–㉓ التمارين --------------------
export const LEVEL1_14 = [
  { n: "①", stem: "Where did they ______?", options: "go / went", answer: "go" },
  { n: "②", stem: "What did she ______?", options: "buy / bought", answer: "buy" },
  { n: "③", stem: "When did he ______?", options: "arrive / arrived", answer: "arrive" },
  { n: "④", stem: "Why did they ______?", options: "leave / left", answer: "leave" },
  { n: "⑤", stem: "What did Omar ______?", options: "write / wrote", answer: "write" },
];

export const LEVEL2_14 = [
  { n: "①", sentence: "Sara visited the castle yesterday.", wh: "Where", answer: "Where did Sara go?" },
  { n: "②", sentence: "Adam bought a camera.", wh: "What", answer: "What did Adam buy?" },
  { n: "③", sentence: "They arrived at 7:30.", wh: "When", answer: "When did they arrive?" },
  { n: "④", sentence: "Lina left early because she was tired.", wh: "Why", answer: "Why did Lina leave early?" },
  { n: "⑤", sentence: "The students solved the puzzle together.", wh: "How", answer: "How did the students solve the puzzle?" },
];

export const LEVEL3_14 = [
  { n: "①", wrong: "Where did he went?", correct: "Where did he go?" },
  { n: "②", wrong: "What did she bought?", correct: "What did she buy?" },
  { n: "③", wrong: "Why did they left?", correct: "Why did they leave?" },
  { n: "④", wrong: "When did you arrived?", correct: "When did you arrive?" },
  { n: "⑤", wrong: "How did he solved the problem?", correct: "How did he solve the problem?" },
];

export const LEVEL4_14 = {
  sentence: "Leo discovered an old map inside a wooden box yesterday.",
  prompts: [
    { n: "①", ar: "سؤال عن الشخص.", answer: "Who discovered an old map?" },
    { n: "②", ar: "سؤال عن الشيء.", answer: "What did Leo discover?" },
    { n: "③", ar: "سؤال عن المكان.", answer: "Where did Leo discover the map?" },
    { n: "④", ar: "سؤال عن الزمن.", answer: "When did Leo discover the map?" },
  ],
  lead: "كوّن:",
  answerLead: "الحل الممكن:",
};

// -------------------- ㉔ Grammar Detective --------------------
export const DETECTIVE_PASSAGE_14 =
  "Last Sunday, Maya traveled to a small coastal town with her family. They arrived in the morning and explored the old harbor. Maya took several photographs because she loved the colorful boats. Later, the family ate lunch at a small restaurant. In the afternoon, they visited an old lighthouse. They returned home after sunset.";

export const DETECTIVE_Q_14 = [
  { n: "①", q: "Where did Maya travel?", answer: "To a small coastal town." },
  { n: "②", q: "When did they arrive?", answer: "In the morning." },
  { n: "③", q: "What did Maya take?", answer: "Several photographs." },
  { n: "④", q: "Why did Maya take photographs?", answer: "Because she loved the colorful boats." },
  { n: "⑤", q: "What did the family eat?", answer: "Lunch." },
  { n: "⑥", q: "What did they visit in the afternoon?", answer: "An old lighthouse." },
  { n: "⑦", q: "When did they return home?", answer: "After sunset." },
];

// -------------------- ㉕ IQ200 Challenge --------------------
export const IQ200_14 = {
  sentence: "The young scientist discovered a strange signal near the mountain three days ago.",
  instruction: "أريد منك استخراج أكبر عدد ممكن من الأسئلة الصحيحة.",
  examples: ["Who...?", "What...?", "Where...?", "When...?", "How...?"],
  warning: "ليس المطلوب فقط أن يكون السؤال مفهوماً.",
  requirement: "بل يجب أن يكون تركيبه النحوي صحيحاً.",
  reminder: "did + Base Verb",
  modelQuestions: [
    { en: "Who discovered a strange signal near the mountain three days ago?", note: "Who فاعل — لا نحتاج did." },
    { en: "What did the young scientist discover?", note: "What عن الشيء." },
    { en: "Where did the young scientist discover the signal?", note: "Where عن المكان." },
    { en: "When did the young scientist discover the signal?", note: "When عن الزمن." },
    { en: "How did the young scientist discover the signal?", note: "How عن الطريقة، ويحتاج جواب الطريقة من سياق إضافي." },
  ],
};

// -------------------- ㉖ تحدي أصعب --------------------
export const HARD_CHALLENGE_14 = {
  sentence: "The explorers found an ancient door behind the waterfall last night.",
  tasks: [
    "① سؤال Yes/No",
    "② سؤال What",
    "③ سؤال Where",
    "④ سؤال When",
    "⑤ سؤال Who",
  ],
  answers: [
    { q: "Did the explorers find an ancient door behind the waterfall last night?", answer: "Yes, the explorers found an ancient door behind the waterfall last night." },
    { q: "What did the explorers find?", answer: "They found an ancient door." },
    { q: "Where did the explorers find the door?", answer: "They found it behind the waterfall." },
    { q: "When did the explorers find the door?", answer: "They found it last night." },
    { q: "Who found an ancient door behind the waterfall last night?", answer: "The explorers found it." },
  ],
};

// -------------------- ㉗ Mini Conversation --------------------
export const MINI_CONVERSATION_14 = [
  { speaker: "A", en: "What did you do last weekend?" },
  { speaker: "B", en: "I visited an old castle." },
  { speaker: "A", en: "Where did you find it?" },
  { speaker: "B", en: "Near the mountains." },
  { speaker: "A", en: "Who did you go with?" },
  { speaker: "B", en: "I went with my cousins." },
  { speaker: "A", en: "When did you return?" },
  { speaker: "B", en: "We returned late in the evening." },
];

// -------------------- ㉘ التحدي النهائي --------------------
export const FINAL_CHALLENGE_14 = {
  instruction: "اكتب قصة قصيرة من 10 جمل عن مغامرة حدثت في الماضي.",
  requirements: [
    "✅ 4 أفعال شاذة على الأقل.",
    "✅ 2 جمل منفية باستخدام didn't.",
    "✅ سؤالين باستخدام Did.",
    "✅ 3 أسئلة Wh.",
  ],
  lead: "واستخدم أفعالاً مختلفة مثل:",
  verbs: ["go", "see", "find", "take", "meet", "bring", "build", "write", "leave", "discover"],
};

// -------------------- الخلاصة والقاعدة الذهبية والمنهج --------------------
export const SUMMARY_14 = {
  title: "أهم تركيب في الدرس:",
  formula: "Wh + did + Subject + Base Verb?",
  examples: [
    "What did she buy?",
    "Where did he go?",
    "When did they arrive?",
    "Why did she leave?",
    "How did you solve it?",
    "Who did he meet?",
  ],
};

export const GOLDEN_RULE_14 = {
  lead: "إذا رأيت:",
  word: "DID",
  question: "اسأل نفسك فوراً:",
  answer: "أين الفعل؟",
  result: "بعد DID يأتي Base Verb.",
  pairs: [
    { ok: "Did he go?", bad: "Did he went?" },
    { ok: "Did she see?", bad: "Did she saw?" },
    { ok: "Did they write?", bad: "Did they wrote?" },
  ],
};

export const ROADMAP_14: { n: number; en: string; here?: boolean }[] = [
  { n: 1, en: "Sentence Structure" },
  { n: 2, en: "Pronouns + Verb to be" },
  { n: 3, en: "Verb to be — النفي والأسئلة" },
  { n: 4, en: "Nouns + Articles" },
  { n: 5, en: "Adjectives" },
  { n: 6, en: "Present Simple — مثبت" },
  { n: 7, en: "Present Simple — نفي وأسئلة" },
  { n: 8, en: "Present Simple — مراجعة" },
  { n: 9, en: "Present Continuous — الأساس" },
  { n: 10, en: "Present Continuous — الاستخدام المتقدم" },
  { n: 11, en: "Present Simple vs Present Continuous" },
  { n: 12, en: "Past Simple — مثبت" },
  { n: 13, en: "Past Simple — did / didn't" },
  { n: 14, en: "Past Simple — Wh Questions + تطبيق شامل", here: true },
];

export const ROADMAP_14_NEXT =
  "التالي منطقياً: الدرس 15 = Past Simple مع was / were، وبعده نبدأ بإدخال مجموعة الملكية في الوقت المناسب ضمن تسلسل القواعد، مع تخصيص درس مستقل لاحقاً للـ Auxiliary Verbs بشكل شامل ومنظم.";

export const COVER_PLAN_14 = [
  "① تذكير من الدرسين 12 و13.",
  "② أدوات Wh الست: What / Where / When / Why / Who / How.",
  "③ Wh-word + did + Subject + Base Verb?",
  "④ أمثلة What / Where / When / Why / How.",
  "⑤ Who كفاعل مقابل Who كمفعول به.",
  "⑥ السؤال الذكي من جملة واحدة.",
  "⑦ الإجابة القصيرة والكاملة وجدول التحكم.",
  "⑧ لعبة تحويل الزمن والأفعال الشاذة.",
  "⑨ المستويات الأربعة وGrammar Detective وIQ200.",
  "⑩ الحوار والتحدي النهائي وخريطة الدروس.",
];

// ============================================================
// أنواع الكتل والتمارين والشرائح
// ============================================================
export type Block14 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: "neutral" | "good" | "bad" | "focus" }
  | { type: "list"; items: string[] }
  | { type: "formula"; key: FormulaKey14 }
  | { type: "sentence"; en: string; ar?: string; parts?: Part14[]; q?: boolean; note?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "recap" }
  | { type: "whMeanings" }
  | { type: "whExamples"; word: string }
  | { type: "whoCard" }
  | { type: "danielBuilder" }
  | { type: "emmaQuestions" }
  | { type: "whoContrast" }
  | { type: "answerComparison" }
  | { type: "noRepeat" }
  | { type: "fourWays" }
  | { type: "controlTable" }
  | { type: "irregularControl" }
  | { type: "whyImportant" }
  | { type: "conversionGame" }
  | { type: "conversation" };

export type Exercise14 =
  | { type: "level1" }
  | { type: "level2" }
  | { type: "level3" }
  | { type: "level4" }
  | { type: "detective" }
  | { type: "iq200" }
  | { type: "hard" }
  | { type: "conversation" }
  | { type: "finalChallenge" };

export type Slide14 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block14[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise14 }
  | { kind: "summary"; title: string }
  | { kind: "keyRule"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const FOUNDATION = "الأساس والصيغ";
const WH = "Wh Questions";
const APPLICATION = "التطبيق الشامل";
const CLOSING = "الخاتمة";

export const SLIDES: Slide14[] = [
  { kind: "cover", section: START, mascot: "🧭" },
  { kind: "objectives", section: START, mascot: "🎯" },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "🧠",
    step: "1",
    title: "قبل أن نبدأ: ماذا أصبحنا نعرف؟",
    lead: "في الدرس 12 تعلمنا الجملة المثبتة:",
    blocks: [
      { type: "english", en: RECAP_14.affirmative.en, ar: RECAP_14.affirmative.ar },
      { type: "text", text: "وفي الدرس 13 تعلمنا:" },
      { type: "text", text: "النفي:" },
      { type: "english", en: RECAP_14.negative.en, ar: RECAP_14.negative.ar },
      { type: "text", text: "السؤال:" },
      { type: "english", en: RECAP_14.yesNo.en, ar: RECAP_14.yesNo.ar },
      { type: "text", text: "واليوم سنأخذ السؤال إلى مستوى أعلى." },
      { type: "text", text: "بدلاً من أن نسأل:" },
      { type: "english", en: RECAP_14.yesNo.en },
      { type: "text", text: "يمكننا أن نسأل:" },
      { type: "english", en: RECAP_14.wh.en, ar: RECAP_14.wh.ar },
      { type: "text", text: "أين ذهبت مايا؟" },
      { type: "note", emoji: "⭐", text: "وهنا نحتاج إلى: [[Wh Questions]]" },
    ],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "🟦",
    step: "2",
    title: "ما هي Wh Questions؟",
    lead: "هي الأسئلة التي لا تكون إجابتها:",
    blocks: [
      { type: "english", en: "Yes / No" },
      { type: "text", text: "بل تحتاج إلى معلومة." },
      { type: "text", text: "أهمها:" },
      { type: "whMeanings" },
    ],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "⭐",
    step: "3",
    title: "القاعدة الأساسية",
    lead: "في أغلب أسئلة Wh مع Past Simple:",
    blocks: [
      { type: "formula", key: "wh" },
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "Where did Ali go?" },
      { type: "text", text: "Where = أين" },
      { type: "text", text: "did = أداة الماضي" },
      { type: "text", text: "Ali = الفاعل" },
      { type: "text", text: "go = الفعل الأساسي" },
      { type: "note", emoji: "🚨", text: "انتبه!" },
      { type: "text", text: "لا نقول:" },
      { type: "english", en: "Where did Ali went?", tone: "bad" },
      { type: "text", text: "بل:" },
      { type: "english", en: "Where did Ali go?", tone: "good" },
      { type: "text", text: "لأن:" },
      { type: "english", en: "did + Base Verb", tone: "focus" },
    ],
  },

  {
    kind: "lesson",
    section: WH,
    mascot: "🟢",
    step: "4",
    title: "What — ماذا؟",
    lead: "نستخدم What عندما نسأل عن شيء أو معلومة.",
    blocks: [
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHAT_EXAMPLES_14[0].sentence, ar: WHAT_EXAMPLES_14[0].arSentence },
      { type: "english", en: WHAT_EXAMPLES_14[0].question, ar: WHAT_EXAMPLES_14[0].arQuestion },
      { type: "text", text: "لاحظ:" },
      { type: "english", en: WHAT_EXAMPLES_14[0].change, tone: "focus" },
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHAT_EXAMPLES_14[1].sentence, ar: WHAT_EXAMPLES_14[1].arSentence },
      { type: "english", en: WHAT_EXAMPLES_14[1].question, ar: WHAT_EXAMPLES_14[1].arQuestion },
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHAT_EXAMPLES_14[2].sentence, ar: WHAT_EXAMPLES_14[2].arSentence },
      { type: "english", en: WHAT_EXAMPLES_14[2].question, ar: WHAT_EXAMPLES_14[2].arQuestion },
      { type: "whExamples", word: "What" },
    ],
  },

  {
    kind: "lesson",
    section: WH,
    mascot: "🟣",
    step: "5",
    title: "Where — أين؟",
    lead: "نستخدم Where للسؤال عن المكان.",
    blocks: [
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHERE_EXAMPLES_14[0].sentence, ar: WHERE_EXAMPLES_14[0].arSentence },
      { type: "english", en: WHERE_EXAMPLES_14[0].question, ar: WHERE_EXAMPLES_14[0].arQuestion },
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHERE_EXAMPLES_14[1].sentence, ar: WHERE_EXAMPLES_14[1].arSentence },
      { type: "english", en: WHERE_EXAMPLES_14[1].question, ar: WHERE_EXAMPLES_14[1].arQuestion },
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHERE_EXAMPLES_14[2].sentence, ar: WHERE_EXAMPLES_14[2].arSentence },
      { type: "english", en: WHERE_EXAMPLES_14[2].question, ar: WHERE_EXAMPLES_14[2].arQuestion },
      { type: "whExamples", word: "Where" },
    ],
  },

  {
    kind: "lesson",
    section: WH,
    mascot: "🟡",
    step: "6",
    title: "When — متى؟",
    lead: "نستخدم When للسؤال عن الوقت.",
    blocks: [
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHEN_EXAMPLES_14[0].sentence, ar: WHEN_EXAMPLES_14[0].arSentence },
      { type: "english", en: WHEN_EXAMPLES_14[0].question, ar: WHEN_EXAMPLES_14[0].arQuestion },
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHEN_EXAMPLES_14[1].sentence, ar: WHEN_EXAMPLES_14[1].arSentence },
      { type: "english", en: WHEN_EXAMPLES_14[1].question, ar: WHEN_EXAMPLES_14[1].arQuestion },
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHEN_EXAMPLES_14[2].sentence, ar: WHEN_EXAMPLES_14[2].arSentence },
      { type: "english", en: WHEN_EXAMPLES_14[2].question, ar: WHEN_EXAMPLES_14[2].arQuestion },
      { type: "whExamples", word: "When" },
    ],
  },

  {
    kind: "lesson",
    section: WH,
    mascot: "🔴",
    step: "7",
    title: "Why — لماذا؟",
    lead: "Why تسأل عن السبب.",
    blocks: [
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHY_EXAMPLES_14[0].sentence, ar: WHY_EXAMPLES_14[0].arSentence },
      { type: "english", en: WHY_EXAMPLES_14[0].question, ar: WHY_EXAMPLES_14[0].arQuestion },
      { type: "text", text: "مثال:" },
      { type: "sentence", en: WHY_EXAMPLES_14[1].sentence, ar: WHY_EXAMPLES_14[1].arSentence },
      { type: "english", en: WHY_EXAMPLES_14[1].question, ar: WHY_EXAMPLES_14[1].arQuestion },
      { type: "whExamples", word: "Why" },
    ],
  },

  {
    kind: "lesson",
    section: WH,
    mascot: "🟠",
    step: "8",
    title: "How — كيف؟",
    lead: "How تسأل عن الطريقة أو الكيفية.",
    blocks: [
      { type: "text", text: "مثال:" },
      { type: "sentence", en: HOW_EXAMPLES_14[0].sentence, ar: HOW_EXAMPLES_14[0].arSentence },
      { type: "english", en: HOW_EXAMPLES_14[0].question, ar: HOW_EXAMPLES_14[0].arQuestion },
      { type: "text", text: "مثال:" },
      { type: "sentence", en: HOW_EXAMPLES_14[1].sentence, ar: HOW_EXAMPLES_14[1].arSentence },
      { type: "english", en: HOW_EXAMPLES_14[1].question, ar: HOW_EXAMPLES_14[1].arQuestion },
      { type: "whExamples", word: "How" },
    ],
  },

  {
    kind: "lesson",
    section: WH,
    mascot: "🔵",
    step: "9",
    title: "Who — من؟",
    lead: "هنا لدينا نقطة مهمة جداً.",
    blocks: [
      { type: "text", text: "Who يمكن أن يكون:" },
      { type: "text", text: "فاعل Subject" },
      { type: "text", text: "أو" },
      { type: "text", text: "مفعول به Object" },
      { type: "text", text: "وفي البداية سنأخذ الشكل الأبسط." },
      { type: "text", text: "مثلاً:" },
      { type: "sentence", en: WHO_EXAMPLE_14.sentence, ar: WHO_EXAMPLE_14.arSentence },
      { type: "english", en: WHO_EXAMPLE_14.question, ar: WHO_EXAMPLE_14.arQuestion },
      { type: "text", text: "لاحظ:" },
      { type: "english", en: WHO_EXAMPLE_14.order, tone: "focus" },
      { type: "whoCard" },
    ],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "🧠",
    step: "10",
    title: "قاعدة ترتيب السؤال",
    lead: "خذ الجملة:",
    blocks: [
      { type: "english", en: DANIEL_SENTENCE_14.sentence },
      { type: "text", text: "لدينا:" },
      { type: "text", text: "Daniel = من قام بالفعل" },
      { type: "text", text: "found = الفعل" },
      { type: "text", text: "a mysterious key = ماذا وجد" },
      { type: "text", text: "in the garden = أين" },
      { type: "text", text: "yesterday = متى" },
      { type: "danielBuilder" },
      { type: "text", text: "يمكننا صناعة عدة أسئلة:" },
      ...DANIEL_SENTENCE_14.questions.map((q) => ({ type: "english", en: q.en, ar: q.ar } as Block14)),
      { type: "note", emoji: "🔥", text: "جملة واحدة يمكن أن تعطينا عدة أسئلة مختلفة." },
    ],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "🧩",
    step: "11",
    title: "السؤال الذكي",
    lead: "إذا أعطيتك:",
    blocks: [
      { type: "english", en: EMMA_SENTENCE_14.sentence },
      { type: "text", text: "فيمكننا أن نسأل:" },
      { type: "emmaQuestions" },
    ],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "🚨",
    step: "12",
    title: "انتبه إلى الفرق",
    lead: "هناك فرق مهم:",
    blocks: [
      { type: "english", en: WHO_CONTRAST_14.subject.question },
      { type: "text", text: "و:" },
      { type: "english", en: WHO_CONTRAST_14.object.question },
      { type: "text", text: "الأول يسأل:" },
      { type: "text", text: "من قام بالفعل؟" },
      { type: "text", text: "الثاني يسأل:" },
      { type: "text", text: "من قابلت إيما؟" },
      { type: "whoContrast" },
      { type: "text", text: "في الأول:" },
      { type: "text", text: "Who = Subject" },
      { type: "text", text: "لذلك لا نحتاج did." },
      { type: "text", text: "في الثاني:" },
      { type: "text", text: "Who = Object" },
      { type: "text", text: "لذلك نستخدم did." },
      { type: "note", emoji: "⭐", text: "هذه نقطة متقدمة جداً، وسنرجع لها لاحقاً عندما ندرس بنية الأسئلة بشكل أعمق." },
    ],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "🧠",
    step: "13",
    title: "السؤال المباشر مقابل الإجابة",
    lead: "السؤال والإجابة القصيرة أو الكاملة:",
    blocks: [{ type: "answerComparison" }],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "⭐",
    step: "14",
    title: "لا تكرر did في الإجابة",
    lead: "السؤال:",
    blocks: [
      { type: "english", en: NO_REPEAT_14.question },
      { type: "text", text: "لا نقول:" },
      { type: "english", en: NO_REPEAT_14.wrong, tone: "bad" },
      { type: "text", text: "في الإجابة العادية:" },
      { type: "english", en: NO_REPEAT_14.correct, tone: "good" },
      { type: "text", text: "لماذا؟" },
      { type: "text", text: "لأن did كان أداة للسؤال فقط." },
      { type: "text", text: "أما في الجملة المثبتة، يعود الماضي إلى الفعل:" },
      { type: "english", en: "go → went", tone: "focus" },
      { type: "noRepeat" },
    ],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "🔥",
    step: "15",
    title: "السؤال والنفي والجملة المثبتة",
    lead: "لنأخذ:",
    blocks: [
      { type: "english", en: FOUR_WAYS_14.affirmative },
      { type: "text", text: "مثبت:" },
      { type: "english", en: FOUR_WAYS_14.affirmative },
      { type: "text", text: "نفي:" },
      { type: "english", en: FOUR_WAYS_14.negative },
      { type: "text", text: "سؤال Yes/No:" },
      { type: "english", en: FOUR_WAYS_14.yesNo },
      { type: "text", text: "سؤال What:" },
      { type: "english", en: FOUR_WAYS_14.what },
      { type: "text", text: "سؤال Where:" },
      { type: "english", en: FOUR_WAYS_14.where },
      { type: "note", emoji: "🔥", text: "لاحظ كيف يتغير التركيب حسب نوع السؤال." },
      { type: "fourWays" },
    ],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "🧠",
    step: "16",
    title: "جدول التحكم",
    lead: "احفظ هذا النظام:",
    blocks: [{ type: "controlTable" }],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "⚡",
    step: "17",
    title: "الأفعال الشاذة لا تختفي!",
    lead: "هذه نقطة مهمة جداً.",
    blocks: [
      { type: "text", text: "في الجملة المثبتة:" },
      { type: "english", en: "He took the map." },
      { type: "text", text: "عند النفي:" },
      { type: "english", en: "He didn't take the map." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Did he take the map?" },
      { type: "text", text: "Wh:" },
      { type: "english", en: "What did he take?" },
      { type: "text", text: "لاحظ:" },
      { type: "english", en: "take → took", tone: "focus" },
      { type: "text", text: "لكن بعد did:" },
      { type: "english", en: "take", tone: "focus" },
      { type: "text", text: "نفس الشيء:" },
      { type: "irregularControl" },
    ],
  },

  {
    kind: "lesson",
    section: FOUNDATION,
    mascot: "🧠",
    step: "18",
    title: "لماذا هذا مهم؟",
    lead: "لأن الطالب قد يفكر:",
    blocks: [
      { type: "text", text: "الفعل شاذ، إذن يجب أن أستخدم شكله الماضي دائماً." },
      { type: "text", text: "وهذا خطأ." },
      { type: "text", text: "القاعدة ليست:" },
      { type: "text", text: "استخدم الماضي دائماً." },
      { type: "text", text: "بل:" },
      { type: "note", emoji: "⭐", text: "استخدم Past Form عندما لا يوجد Auxiliary يحمل الماضي." },
      { type: "text", text: "إذا كان لدينا:" },
      { type: "english", en: "did" },
      { type: "text", text: "فالفعل الرئيسي يعود إلى Base Form." },
      { type: "whyImportant" },
    ],
  },

  {
    kind: "lesson",
    section: APPLICATION,
    mascot: "🎮",
    step: "19",
    title: "لعبة تحويل الزمن",
    lead: "🔥 هذه اللعبة ستجعل القاعدة تلقائية عند الطالب.",
    blocks: [
      { type: "text", text: "الكلمة: GO" },
      { type: "conversionGame" },
      { type: "text", text: "الكلمة: WRITE" },
      { type: "text", text: "الكلمة: BUY" },
    ],
  },

  { kind: "ex", section: APPLICATION, mascot: "✏️", badge: "✏️ 20. تمارين المستوى الأول", title: "تمارين المستوى الأول", subtitle: "أكمل السؤال:", ex: { type: "level1" } },
  { kind: "ex", section: APPLICATION, mascot: "✏️", badge: "✏️ 21. المستوى الثاني", title: "المستوى الثاني", subtitle: "حوّل الجملة إلى سؤال باستخدام الكلمة الموجودة بين القوسين.", ex: { type: "level2" } },
  { kind: "ex", section: APPLICATION, mascot: "✏️", badge: "✏️ 22. المستوى الثالث", title: "المستوى الثالث", subtitle: "صحح الأخطاء:", ex: { type: "level3" } },
  { kind: "ex", section: APPLICATION, mascot: "🔥", badge: "🔥 23. المستوى الرابع — ابنِ الأسئلة", title: "المستوى الرابع — ابنِ الأسئلة", subtitle: "كوّن الأسئلة من الجملة.", ex: { type: "level4" } },
  { kind: "ex", section: APPLICATION, mascot: "🕵️", badge: "🕵️ 24. Grammar Detective", title: "Grammar Detective", subtitle: "اقرأ الفقرة ثم استخرج المعلومات.", ex: { type: "detective" } },
  { kind: "ex", section: APPLICATION, mascot: "🚀", badge: "🚀 25. IQ200 Challenge", title: "IQ200 Challenge", subtitle: "استخرج أكبر عدد ممكن من الأسئلة الصحيحة.", ex: { type: "iq200" } },
  { kind: "ex", section: APPLICATION, mascot: "🧠", badge: "🧠 26. تحدي أصعب", title: "تحدي أصعب", subtitle: "حوّل الجملة ثم اكتب إجابة كاملة لكل سؤال.", ex: { type: "hard" } },
  { kind: "ex", section: APPLICATION, mascot: "🎭", badge: "🎭 27. Mini Conversation", title: "Mini Conversation", subtitle: "لاحظ أن الحوار كله يعتمد على Past Simple.", ex: { type: "conversation" } },
  { kind: "ex", section: APPLICATION, mascot: "🏆", badge: "🏆 28. التحدي النهائي", title: "التحدي النهائي", subtitle: "اكتب قصة قصيرة من 10 جمل عن مغامرة حدثت في الماضي.", ex: { type: "finalChallenge" } },

  { kind: "summary", section: CLOSING, mascot: "🧠", title: "خلاصة الدرس 14" },
  { kind: "keyRule", section: CLOSING, mascot: "🔥", title: "القاعدة الذهبية" },
  { kind: "roadmap", section: CLOSING, mascot: "📚", title: "مكاننا في المنهج" },
  { kind: "quiz", section: CLOSING, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: CLOSING, mascot: "🎓", title: "الخاتمة" },
];

// الجملة الكاملة للمصدر تبقى متاحة للتحقق الآلي من عدم إسقاط أي قسم.
export const SOURCE_FIDELITY_MARKERS_14 = [
  ...SOURCE_SECTIONS,
  ...OBJECTIVES_14.map((x) => x.text),
  RECAP_14.affirmative.en,
  RECAP_14.negative.en,
  RECAP_14.yesNo.en,
  RECAP_14.wh.en,
  "What = ماذا / ما",
  "Where = أين",
  "When = متى",
  "Why = لماذا",
  "Who = من",
  "How = كيف",
  ...WHAT_EXAMPLES_14.flatMap((x) => [x.sentence, x.question, x.arSentence, x.arQuestion]),
  ...WHERE_EXAMPLES_14.flatMap((x) => [x.sentence, x.question, x.arSentence, x.arQuestion]),
  ...WHEN_EXAMPLES_14.flatMap((x) => [x.sentence, x.question, x.arSentence, x.arQuestion]),
  ...WHY_EXAMPLES_14.flatMap((x) => [x.sentence, x.question, x.arSentence, x.arQuestion]),
  ...HOW_EXAMPLES_14.flatMap((x) => [x.sentence, x.question, x.arSentence, x.arQuestion]),
  WHO_EXAMPLE_14.sentence,
  WHO_EXAMPLE_14.question,
  DANIEL_SENTENCE_14.sentence,
  ...DANIEL_SENTENCE_14.questions.flatMap((x) => [x.en, x.ar, x.answer]),
  EMMA_SENTENCE_14.sentence,
  ...EMMA_SENTENCE_14.questions.flatMap((x) => [x.en, x.ar, x.answer]),
  WHO_CONTRAST_14.subject.question,
  WHO_CONTRAST_14.object.question,
  ...ANSWER_COMPARISONS_14.flatMap((x) => [x.question, x.short, x.full]),
  NO_REPEAT_14.question,
  NO_REPEAT_14.wrong,
  NO_REPEAT_14.correct,
  ...Object.values(FOUR_WAYS_14),
  ...CONTROL_TABLE_14.flatMap((x) => [x.formula, x.example]),
  ...IRREGULAR_CONTROL_14.take.map((x) => x.en),
  ...IRREGULAR_CONTROL_14.see.map((x) => x.en),
  ...CONVERSION_GAME_14.flatMap((x) => [x.word, ...x.forms]),
  ...LEVEL1_14.flatMap((x) => [x.stem, x.options, x.answer]),
  ...LEVEL2_14.flatMap((x) => [x.sentence, `(${x.wh})`, x.answer]),
  ...LEVEL3_14.flatMap((x) => [x.wrong, x.correct]),
  LEVEL4_14.sentence,
  ...LEVEL4_14.prompts.flatMap((x) => [x.ar, x.answer]),
  DETECTIVE_PASSAGE_14,
  ...DETECTIVE_Q_14.flatMap((x) => [x.q, x.answer]),
  IQ200_14.sentence,
  ...IQ200_14.examples,
  ...IQ200_14.modelQuestions.map((x) => x.en),
  HARD_CHALLENGE_14.sentence,
  ...HARD_CHALLENGE_14.tasks,
  ...HARD_CHALLENGE_14.answers.flatMap((x) => [x.q, x.answer]),
  ...MINI_CONVERSATION_14.map((x) => `${x.speaker}: ${x.en}`),
  FINAL_CHALLENGE_14.instruction,
  ...FINAL_CHALLENGE_14.requirements,
  ...FINAL_CHALLENGE_14.verbs,
  SUMMARY_14.formula,
  ...SUMMARY_14.examples,
  ...GOLDEN_RULE_14.pairs.flatMap((x) => [x.ok, x.bad]),
  ...ROADMAP_14.map((x) => x.en),
  ROADMAP_14_NEXT,
];
