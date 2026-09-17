// ============================================================
// الدرس 15 — Past Simple of Verb to be — was / were
// المصدر الكامل محفوظ حرفيًا — لا تلخيص ولا إعادة صياغة
// العنوان: الدرس 15: Past Simple of Verb to be — was / were
//
// ملاحظة اتجاه: كل وحدة إنجليزية داخل هذا الملف نص خام يُعرض دائمًا
// داخل عازل LTR (dir="ltr") — ولا يُقسَّم إلى كلمات منفصلة أبدًا.
// الصيغ الأساسية محفوظة بترتيبها الإنجليزي الصحيح:
//   I / He / She / It → was
//   You / We / They → were
//   Subject + was/were + ...
//   Subject + was/were + not
//   Was/Were + Subject + ...?
//   Did + Subject + Base Verb?
//   Was/Were + Subject + ...?
// ============================================================

// -------------------- الفهارس والعناوين (تحقق تغطية المصدر) --------------------
export const SOURCE_SECTIONS: string[] = [
  "🎯 أهداف الدرس",
  "🧠 1. أول سؤال: ما هو الماضي من am / is / are؟",
  "⭐ 2. القاعدة الأساسية",
  "🟦 3. أمثلة بسيطة",
  "🧠 4. ما معنى WAS / WERE؟",
  "🕰️ 5. خط الزمن",
  "🟢 6. متى نستخدم WAS / WERE؟",
  "😊 7. حالة أو شعور في الماضي",
  "🎨 8. صفة في الماضي",
  "📍 9. مكان في الماضي",
  "🧑‍🏫 10. هوية أو مهنة في الماضي",
  "🔥 11. WAS / WERE + Adjective",
  "🧠 12. WAS / WERE + Noun",
  "📍 13. WAS / WERE + Place",
  "🚨 14. الفرق بين WAS/WERE والفعل العادي",
  "🔥 15. لا نستخدم DID مع WAS / WERE",
  "🟦 16. السؤال باستخدام WAS / WERE",
  "⭐ 17. قاعدة السؤال",
  "🟢 18. الإجابات القصيرة",
  "🟥 19. النفي",
  "🧠 20. لا نستخدم DID هنا",
  "⚡ 21. مقارنة النظامين",
  "🧩 22. مقارنة Present و Past",
  "🕰️ 23. كلمات تدل على الماضي",
  "🧠 24. When I was young",
  "🔵 25. أسئلة Wh مع WAS / WERE",
  "🚨 26. الفرق بين سؤال DID وسؤال WAS/WERE",
  "🔥 27. مقارنة عبقرية",
  "🧠 28. What مع WAS/WERE",
  "✏️ 29. تمارين المستوى الأول",
  "✏️ 30. المستوى الثاني",
  "✏️ 31. المستوى الثالث",
  "✏️ 32. المستوى الرابع",
  "🧠 33. المستوى الخامس — صحح الأخطاء",
  "🔥 34. المستوى السادس — هل نستخدم DID أم WAS/WERE؟",
  "🕵️ 35. Grammar Detective",
  "🚀 36. IQ200 Challenge",
  "🧠 37. IQ200 — اختر النظام الصحيح",
  "🏆 38. التحدي النهائي",
  "🧠 ملخص الدرس 15",
  "🗺️ خريطة المنهج الآن",
];

// -------------------- أدوار الكلمات --------------------
export type Role15 =
  | "subject"
  | "was"
  | "were"
  | "adj"
  | "noun"
  | "place"
  | "verb"
  | "did"
  | "not"
  | "wh";

export interface Part15 {
  text: string;
  role: Role15;
}

export const ROLE15_AR: Record<Role15, string> = {
  subject: "الفاعل",
  was: "was",
  were: "were",
  adj: "صفة",
  noun: "اسم",
  place: "مكان",
  verb: "فعل عادي",
  did: "did",
  not: "النفي",
  wh: "أداة سؤال",
};

const P = (text: string, role: Role15): Part15 => ({ text, role });

// -------------------- الصيغ --------------------
export type FormulaKey15 =
  | "wasAff"
  | "wereAff"
  | "wasWereNeg"
  | "wasWereQ"
  | "wasQ"
  | "wereQ"
  | "ordinaryAff"
  | "ordinaryNeg"
  | "ordinaryQ"
  | "didQ"
  | "wasWereWh";

export interface Formula15 {
  key: FormulaKey15;
  label: string;
  tokens: { text: string; label?: string }[];
  source: string;
}

export const FORMULAS_15: Formula15[] = [
  {
    key: "wasAff",
    label: "مثبت — was",
    source: "I / He / She / It + was",
    tokens: [
      { text: "I / He / She / It", label: "الفاعل" },
      { text: "+" },
      { text: "was", label: "was" },
    ],
  },
  {
    key: "wereAff",
    label: "مثبت — were",
    source: "You / We / They + were",
    tokens: [
      { text: "You / We / They", label: "الفاعل" },
      { text: "+" },
      { text: "were", label: "were" },
    ],
  },
  {
    key: "wasWereNeg",
    label: "نفي",
    source: "Subject + was/were + not",
    tokens: [
      { text: "Subject", label: "الفاعل" },
      { text: "+" },
      { text: "was/were", label: "was/were" },
      { text: "+" },
      { text: "not", label: "النفي" },
    ],
  },
  {
    key: "wasWereQ",
    label: "سؤال",
    source: "Was/Were + Subject + ...?",
    tokens: [
      { text: "Was/Were", label: "was/were" },
      { text: "+" },
      { text: "Subject", label: "الفاعل" },
      { text: "+" },
      { text: "...", label: "بقية الجملة" },
      { text: "?" },
    ],
  },
  {
    key: "wasQ",
    label: "سؤال was",
    source: "Was + I / He / She / It ...?",
    tokens: [
      { text: "Was", label: "was" },
      { text: "+" },
      { text: "I / He / She / It", label: "الفاعل" },
      { text: "?" },
    ],
  },
  {
    key: "wereQ",
    label: "سؤال were",
    source: "Were + You / We / They ...?",
    tokens: [
      { text: "Were", label: "were" },
      { text: "+" },
      { text: "You / We / They", label: "الفاعل" },
      { text: "?" },
    ],
  },
  {
    key: "ordinaryAff",
    label: "فعل عادي مثبت",
    source: "Subject + Past Verb",
    tokens: [
      { text: "Subject", label: "الفاعل" },
      { text: "+" },
      { text: "Past Verb", label: "فعل ماضي" },
    ],
  },
  {
    key: "ordinaryNeg",
    label: "فعل عادي نفي",
    source: "Subject + didn't + Base Verb",
    tokens: [
      { text: "Subject", label: "الفاعل" },
      { text: "+" },
      { text: "didn't", label: "didn't" },
      { text: "+" },
      { text: "Base Verb", label: "الفعل الأساسي" },
    ],
  },
  {
    key: "ordinaryQ",
    label: "فعل عادي سؤال",
    source: "Did + Subject + Base Verb?",
    tokens: [
      { text: "Did", label: "did" },
      { text: "+" },
      { text: "Subject", label: "الفاعل" },
      { text: "+" },
      { text: "Base Verb", label: "الفعل الأساسي" },
      { text: "?" },
    ],
  },
  {
    key: "wasWereWh",
    label: "Wh مع was/were",
    source: "Wh-word + was/were + Subject + ...?",
    tokens: [
      { text: "Wh-word", label: "أداة السؤال" },
      { text: "+" },
      { text: "was/were", label: "was/were" },
      { text: "+" },
      { text: "Subject", label: "الفاعل" },
      { text: "?" },
    ],
  },
];

export const FORMULA_STRINGS_15: Record<FormulaKey15, string> = {
  wasAff: "I / He / She / It + was",
  wereAff: "You / We / They + were",
  wasWereNeg: "Subject + was/were + not",
  wasWereQ: "Was/Were + Subject + ...?",
  wasQ: "Was + I / He / She / It ...?",
  wereQ: "Were + You / We / They ...?",
  ordinaryAff: "Subject + Past Verb",
  ordinaryNeg: "Subject + didn't + Base Verb",
  ordinaryQ: "Did + Subject + Base Verb?",
  didQ: "Did + Subject + Base Verb?",
  wasWereWh: "Wh-word + was/were + Subject + ...?",
};

// -------------------- 🎯 أهداف الدرس --------------------
export const OBJECTIVES_15: { n: string; text: string }[] = [
  { n: "①", text: "معنى was و were." },
  { n: "②", text: "متى نستخدم was ومتى نستخدم were." },
  { n: "③", text: "كيف نبني الجملة المثبتة." },
  { n: "④", text: "كيف نبني النفي." },
  { n: "⑤", text: "كيف نبني السؤال." },
  { n: "⑥", text: "كيف نجيب بإجابات قصيرة." },
  { n: "⑦", text: "لماذا لا نستخدم did مع was / were." },
  { n: "⑧", text: "كيف نستخدم was / were مع الصفات والأسماء والأماكن." },
  { n: "⑨", text: "كيف نفرّق بين: He played. و He was tired." },
];

// -------------------- 1. الماضي من am / is / are --------------------
export const PAST_OF_BE = {
  present: [
    { en: "I → am", ar: "أنا" },
    { en: "He → is", ar: "هو" },
    { en: "She → is", ar: "هي" },
    { en: "It → is", ar: "غير عاقل مفرد" },
    { en: "You → are", ar: "أنت / أنتم" },
    { en: "We → are", ar: "نحن" },
    { en: "They → are", ar: "هم" },
  ],
  past: ["WAS", "WERE"],
};

// -------------------- 2. القاعدة الأساسية --------------------
export const CORE_RULE_15 = {
  wasGroup: "I / He / She / It → WAS",
  wereGroup: "You / We / They → WERE",
  wasPronouns: ["I", "He", "She", "It"],
  werePronouns: ["You", "We", "They"],
  wasForm: "was",
  wereForm: "were",
  mapping: [
    { pronoun: "I", form: "was" },
    { pronoun: "He", form: "was" },
    { pronoun: "She", form: "was" },
    { pronoun: "It", form: "was" },
    { pronoun: "You", form: "were" },
    { pronoun: "We", form: "were" },
    { pronoun: "They", form: "were" },
  ] as { pronoun: string; form: "was" | "were" }[],
};

// -------------------- 3. أمثلة بسيطة --------------------
export const SIMPLE_EXAMPLES_15 = [
  { en: "I was tired.", ar: "كنت متعباً." },
  { en: "He was happy.", ar: "كان سعيداً." },
  { en: "She was busy.", ar: "كانت مشغولة." },
  { en: "It was cold.", ar: "كان الجو بارداً." },
  { en: "You were late.", ar: "كنت متأخراً." },
  { en: "We were ready.", ar: "كنا مستعدين." },
  { en: "They were excited.", ar: "كانوا متحمسين." },
];

// -------------------- 4. ما معنى WAS / WERE --------------------
export const MEANING_EXAMPLES_15 = [
  { present: "I am happy.", presentAr: "أنا سعيد.", past: "I was happy.", pastAr: "كنت سعيداً." },
  { present: "He is tired.", presentAr: "هو متعب.", past: "He was tired.", pastAr: "كان متعباً." },
  { present: "They are ready.", presentAr: "هم مستعدون.", past: "They were ready.", pastAr: "كانوا مستعدين." },
];
export const MEANING_RULE_15 = {
  present: "am / is / are → الحاضر",
  past: "was / were → الماضي",
};

// -------------------- 5. خط الزمن --------------------
export const TIMELINE_15 = {
  label: "PAST ← الماضي | NOW ← الحاضر",
  presentPast: [
    { now: "She is happy.", past: "She was happy." },
    { now: "They are tired.", past: "They were tired." },
  ],
};

// -------------------- 6. متى نستخدم --------------------
export const USAGE_15: { n: string; ar: string; en: string }[] = [
  { n: "①", ar: "حالة في الماضي.", en: "state in the past" },
  { n: "②", ar: "شعوراً في الماضي.", en: "feeling in the past" },
  { n: "③", ar: "صفة في الماضي.", en: "adjective in the past" },
  { n: "④", ar: "مكاناً في الماضي.", en: "place in the past" },
  { n: "⑤", ar: "هوية أو مهنة في الماضي.", en: "identity / job in the past" },
  { n: "⑥", ar: "عمراً في الماضي.", en: "age in the past" },
];

// -------------------- 7. حالة أو شعور --------------------
export const FEELING_EXAMPLES_15 = [
  { en: "I was nervous before the exam.", ar: "كنت متوتراً قبل الامتحان." },
  { en: "Mia was excited about the trip.", ar: "كانت ميا متحمسة للرحلة." },
  { en: "The students were tired after the competition.", ar: "كان الطلاب متعبين بعد المسابقة." },
];

// -------------------- 8. صفة في الماضي --------------------
export const ADJ_EXAMPLES_15 = [
  { en: "The sky was dark.", ar: "كانت السماء مظلمة." },
  { en: "The water was cold.", ar: "كان الماء بارداً." },
  { en: "The rooms were clean.", ar: "كانت الغرف نظيفة." },
  { en: "The machine was noisy.", ar: "كانت الآلة صاخبة." },
];

// -------------------- 9. مكان في الماضي --------------------
export const PLACE_EXAMPLES_15 = [
  { en: "I was at home.", ar: "كنت في المنزل." },
  { en: "She was at the library.", ar: "كانت في المكتبة." },
  { en: "They were at the stadium.", ar: "كانوا في الملعب." },
  { en: "We were in the kitchen.", ar: "كنا في المطبخ." },
];

// -------------------- 10. هوية أو مهنة --------------------
export const IDENTITY_EXAMPLES_15 = [
  { en: "He was a student.", ar: "كان طالباً.", note: "نحتاج a لأن student اسم مفرد معدود." },
  { en: "She was a teacher.", ar: "كانت معلمة.", note: "" },
  { en: "They were engineers.", ar: "كانوا مهندسين.", note: "لا نضع a لأن engineers جمع." },
];
export const IDENTITY_NOTE_15 = {
  singular: "He was a student. نحتاج a لأن student اسم مفرد معدود.",
  plural: "They were engineers. لا نضع a لأن engineers جمع.",
};

// -------------------- 11. WAS / WERE + Adjective --------------------
export const ADJ_FORMULA_15 = {
  presentFormula: "Subject + am/is/are + Adjective",
  pastFormula: "Subject + was/were + Adjective",
  pairs: [
    { present: "He is nervous.", past: "He was nervous." },
    { present: "She is happy.", past: "She was happy." },
    { present: "They are tired.", past: "They were tired." },
    { present: "The room is quiet.", past: "The room was quiet." },
  ],
};

// -------------------- 12. WAS / WERE + Noun --------------------
export const NOUN_FORMULA_15 = {
  pairs: [
    { present: "He is a doctor.", past: "He was a doctor." },
    { present: "She is an artist.", past: "She was an artist." },
    { present: "They are students.", past: "They were students." },
  ],
};

// -------------------- 13. WAS / WERE + Place --------------------
export const PLACE_FORMULA_15 = {
  pairs: [
    { present: "He is at school.", past: "He was at school." },
    { present: "They are in the garden.", past: "They were in the garden." },
  ],
};

// -------------------- 14. الفرق بين WAS/WERE والفعل العادي --------------------
export const DIFF_ORDINARY_VS_BE_15 = [
  {
    ordinary: "He played football.",
    ordinaryNote: "played = فعل",
    be: "He was tired.",
    beNote: "was = Verb to be و tired = Adjective",
  },
  {
    ordinary: "She visited the museum.",
    ordinaryNote: "حدث فعل.",
    be: "She was happy.",
    beNote: "نحن نصف حالتها.",
  },
  {
    ordinary: "They explored the cave.",
    ordinaryAr: "هم استكشفوا الكهف.",
    be: "They were tired.",
    beAr: "كانوا متعبين.",
    note1: "الجملة الأولى = فعل حدث.",
    note2: "الجملة الثانية = حالة.",
  },
];

// -------------------- 15. لا نستخدم DID مع WAS / WERE --------------------
export const DID_NOT_WITH_BE_15 = {
  wrong: [
    { en: "Did he be tired?", correct: "Was he tired?", mark: "❌ vs ✅" },
    { en: "Did they be happy?", correct: "Were they happy?", mark: "❌ vs ✅" },
  ],
  reason: "لأن was / were تعمل بنفسها كفعل، ويمكنها تكوين السؤال والنفي دون did.",
  examples: [
    { wrong: "Did he be tired? ❌", right: "Was he tired? ✅" },
    { wrong: "Did they be happy? ❌", right: "Were they happy? ✅" },
  ],
};

// -------------------- 16. السؤال باستخدام WAS / WERE --------------------
export const QUESTION_FORMATION_15 = {
  rule: "Was/Were + Subject + ...?",
  examples: [
    { aff: "She was tired.", q: "Was she tired?" },
    { aff: "They were late.", q: "Were they late?" },
    { aff: "He was at home.", q: "Was he at home?" },
    { aff: "You were nervous.", q: "Were you nervous?" },
  ],
};

// -------------------- 17. قاعدة السؤال --------------------
export const QUESTION_RULE_15 = {
  wasRule: "WAS + I / He / She / It",
  wereRule: "WERE + You / We / They",
  examples: ["Was he happy?", "Were they happy?"],
};

// -------------------- 18. الإجابات القصيرة --------------------
export const SHORT_ANSWERS_15 = [
  { q: "Was he tired?", yes: "Yes, he was.", no: "No, he wasn't." },
  { q: "Was she at home?", yes: "Yes, she was.", no: "No, she wasn't." },
  { q: "Were they ready?", yes: "Yes, they were.", no: "No, they weren't." },
  { q: "Were you busy?", yes: "Yes, I was.", no: "No, I wasn't.", note: "Were you...? الإجابة Yes, I was. وليس Yes, I were. ❌" },
];
export const SHORT_ANSWER_TRAP_15 = {
  q: "Were you...?",
  correct: "Yes, I was.",
  wrong: "Yes, I were. ❌",
};

// -------------------- 19. النفي --------------------
export const NEGATION_15 = {
  rule: "Subject + was/were + not",
  short: ["was not = wasn't", "were not = weren't"],
  examples: [
    { aff: "I was tired.", neg: "I wasn't tired." },
    { aff: "He was nervous.", neg: "He wasn't nervous." },
    { aff: "She was at school.", neg: "She wasn't at school." },
    { aff: "They were ready.", neg: "They weren't ready." },
    { aff: "We were late.", neg: "We weren't late." },
  ],
};

// -------------------- 20. لا نستخدم DID هنا --------------------
export const DID_MISUSE_15 = {
  wrongExamples: [
    { wrong: "He didn't was tired. ❌", right: "He wasn't tired. ✅" },
    { wrong: "They didn't were ready. ❌", right: "They weren't ready. ✅" },
  ],
  contrast: {
    ordinary: ["He played.", "He didn't play.", "Did he play?"],
    be: ["He was tired.", "He wasn't tired.", "Was he tired?"],
  },
};

// -------------------- 21. مقارنة النظامين --------------------
export const COMPARISON_SYSTEMS_15 = {
  ordinary: {
    label: "فعل عادي",
    sentences: ["She visited the farm.", "She didn't visit the farm.", "Did she visit the farm?"],
  },
  be: {
    label: "Verb to be",
    sentences: ["She was at the farm.", "She wasn't at the farm.", "Was she at the farm?"],
  },
};

// -------------------- 22. مقارنة Present و Past --------------------
export const PRESENT_PAST_15 = [
  { present: "I am happy.", past: "I was happy." },
  { present: "She is busy.", past: "She was busy." },
  { present: "They are excited.", past: "They were excited." },
  { present: "We are at home.", past: "We were at home." },
];

// -------------------- 23. كلمات تدل على الماضي --------------------
export const TIME_WORDS_15 = ["yesterday", "last night", "last week", "last month", "last year", "two days ago", "three years ago", "when I was young"];
export const TIME_EXAMPLES_15 = [
  { en: "I was at the beach yesterday.", ar: "كنت على الشاطئ أمس." },
  { en: "They were very tired last night.", ar: "كانوا متعبين جداً الليلة الماضية." },
  { en: "She was in London last year.", ar: "كانت في لندن العام الماضي." },
];

// -------------------- 24. When I was young --------------------
export const WHEN_YOUNG_15 = {
  phrase: "When I was young",
  ar: "عندما كنت صغيراً",
  example: { en: "When I was young, I was very curious.", ar: "عندما كنت صغيراً، كنت فضولياً جداً.", note: "لاحظ أن لدينا was مرتين." },
};

// -------------------- 25. أسئلة Wh مع WAS / WERE --------------------
export const WH_WITH_BE_15 = [
  { en: "Where was she?", ar: "أين كانت؟" },
  { en: "Where were they?", ar: "أين كانوا؟" },
  { en: "Why was he angry?", ar: "لماذا كان غاضباً؟" },
  { en: "Why were they late?", ar: "لماذا كانوا متأخرين؟" },
  { en: "When was the meeting?", ar: "متى كان الاجتماع؟" },
];

// -------------------- 26. الفرق بين سؤال DID وسؤال WAS/WERE --------------------
export const DID_VS_WAS_15 = {
  didExample: { q: "Where did he go?", ar: "أين ذهب؟", note: "go = فعل عادي → did" },
  wasExample: { q: "Where was he?", ar: "أين كان؟", note: "was = Verb to be → لا نستخدم did" },
};

// -------------------- 27. مقارنة عبقرية --------------------
export const GENIUS_COMPARISON_15 = {
  go: { sentence: "He went to the laboratory.", question: "Where did he go?", rule: "go → did" },
  be: { sentence: "He was in the laboratory.", question: "Where was he?", rule: "be → was/were" },
};

// -------------------- 28. What مع WAS/WERE --------------------
export const WHAT_WITH_BE_15 = [
  { en: "What was the problem?", ar: "ما المشكلة؟" },
  { en: "What was the weather like?", ar: "كيف كان الطقس؟" },
  { en: "What were the results?", ar: "ما النتائج؟" },
];
export const WHAT_NOTE_15 = "What + was/were";

// -------------------- 29. تمارين المستوى الأول --------------------
export const LEVEL1_15 = [
  { n: "①", stem: "I was / were tired.", options: ["was", "were"], answer: "was", en: "I was tired." },
  { n: "②", stem: "They was / were excited.", options: ["was", "were"], answer: "were", en: "They were excited." },
  { n: "③", stem: "She was / were at school.", options: ["was", "were"], answer: "was", en: "She was at school." },
  { n: "④", stem: "We was / were ready.", options: ["was", "were"], answer: "were", en: "We were ready." },
  { n: "⑤", stem: "He was / were nervous.", options: ["was", "were"], answer: "was", en: "He was nervous." },
];

// -------------------- 30. المستوى الثاني --------------------
export const LEVEL2_15 = [
  { n: "①", sentence: "I was hungry.", answer: "I wasn't hungry." },
  { n: "②", sentence: "She was at home.", answer: "She wasn't at home." },
  { n: "③", sentence: "They were tired.", answer: "They weren't tired." },
  { n: "④", sentence: "We were late.", answer: "We weren't late." },
  { n: "⑤", sentence: "He was nervous.", answer: "He wasn't nervous." },
];

// -------------------- 31. المستوى الثالث --------------------
export const LEVEL3_15 = [
  { n: "①", sentence: "She was happy.", answer: "Was she happy?" },
  { n: "②", sentence: "They were at the park.", answer: "Were they at the park?" },
  { n: "③", sentence: "He was tired.", answer: "Was he tired?" },
  { n: "④", sentence: "We were ready.", answer: "Were we ready?" },
  { n: "⑤", sentence: "You were nervous.", answer: "Were you nervous?" },
];

// -------------------- 32. المستوى الرابع --------------------
export const LEVEL4_15 = [
  { n: "①", stem: "Was / Did he tired?", options: ["Was", "Did"], answer: "Was", why: "tired = adjective → Verb to be → WAS" },
  { n: "②", stem: "Were / Did they happy?", options: ["Were", "Did"], answer: "Were", why: "happy = adjective → Verb to be → WERE" },
  { n: "③", stem: "Was / Did she at home?", options: ["Was", "Did"], answer: "Was", why: "at home = place → Verb to be → WAS" },
  { n: "④", stem: "Was / Did he visit the castle?", options: ["Was", "Did"], answer: "Did", why: "visit = ordinary verb → DID" },
  { n: "⑤", stem: "Were / Did they visit the castle?", options: ["Were", "Did"], answer: "Did", why: "visit = ordinary verb → DID" },
];
export const LEVEL4_NOTE_15 = "هنا لا تعتمد على الحفظ فقط. اسأل نفسك: هل الجملة فيها Verb to be؟ أم فيها فعل عادي؟";

// -------------------- 33. المستوى الخامس — صحح الأخطاء --------------------
export const LEVEL5_15 = [
  { n: "①", wrong: "He were tired.", correct: "He was tired." },
  { n: "②", wrong: "They was happy.", correct: "They were happy." },
  { n: "③", wrong: "Did she was at home?", correct: "Was she at home?" },
  { n: "④", wrong: "He didn't was nervous.", correct: "He wasn't nervous." },
  { n: "⑤", wrong: "Were they visit the castle?", correct: "Did they visit the castle?", note: "لاحظ أن الجملة الخامسة صحيحة باستخدام did لأن visit = فعل عادي." },
];

// الأمثلة الخاطئة المقصودة مع علامة ❌ — يجب أن تبقى كما هي للتدريس
export const INTENTIONALLY_WRONG_15 = [
  "Did he be tired? ❌",
  "Did they be happy? ❌",
  "He didn't was tired. ❌",
  "They didn't were ready. ❌",
  "Were they visit the castle? ❌",
  "He were tired.",
  "They was happy.",
  "Did she was at home?",
  "He didn't was nervous.",
  "Were they visit the castle?",
  "Yes, I were. ❌",
];

// -------------------- 34. المستوى السادس — DID أم WAS/WERE --------------------
export const LEVEL6_15 = [
  { n: "①", stem: "______ she tired yesterday?", answer: "Was", options: ["Was", "Did"] },
  { n: "②", stem: "______ she visit the museum yesterday?", answer: "Did", options: ["Was", "Did"] },
  { n: "③", stem: "______ they at home last night?", answer: "Were", options: ["Were", "Did"] },
  { n: "④", stem: "______ they watch the movie?", answer: "Did", options: ["Were", "Did"] },
  { n: "⑤", stem: "______ he nervous before the exam?", answer: "Was", options: ["Was", "Did"] },
];

// -------------------- 35. Grammar Detective --------------------
export const DETECTIVE_PASSAGE_15 =
  "Last Saturday, Leo was at a robotics competition. He was nervous at first, but his teammates were confident. The competition was difficult. Their robot was slow during the first round, but they were ready to improve it. After some changes, the robot worked much better.";

export const DETECTIVE_Q_15 = [
  { n: "①", q: "Where was Leo?", answer: "He was at a robotics competition.", hint: "at a robotics competition" },
  { n: "②", q: "How was Leo at first?", answer: "He was nervous at first.", hint: "nervous" },
  { n: "③", q: "Were his teammates nervous?", answer: "No, they weren't. They were confident.", hint: "confident" },
  { n: "④", q: "Was the competition easy?", answer: "No, it wasn't. It was difficult.", hint: "difficult" },
  { n: "⑤", q: "Was their robot fast during the first round?", answer: "No, it wasn't. It was slow.", hint: "slow" },
  { n: "⑥", q: "Were they ready to improve it?", answer: "Yes, they were.", hint: "ready" },
  { n: "⑦", q: "Did the robot work better later?", answer: "Yes, it did. It worked much better.", note: "لاحظ السؤال الأخير: Did the robot work better? لأن work = فعل عادي." },
];

// -------------------- 36. IQ200 Challenge --------------------
export const IQ200_15 = {
  sentence: "The explorers were exhausted after the journey.",
  tasks: [
    { label: "① النفي.", answer: "The explorers weren't exhausted after the journey." },
    { label: "② سؤال Yes/No.", answer: "Were the explorers exhausted after the journey?" },
    { label: "③ إجابة بـ Yes.", answer: "Yes, they were." },
    { label: "④ إجابة بـ No.", answer: "No, they weren't." },
    { label: "⑤ سؤال Why.", answer: "Why were the explorers exhausted?" },
  ],
};

// -------------------- 37. IQ200 — اختر النظام الصحيح --------------------
export const IQ200_SYSTEM_15 = {
  question: "أي جملة صحيحة؟",
  options: [
    { n: "①", en: "Did he be tired?", correct: false },
    { n: "②", en: "Was he tired?", correct: true },
    { n: "③", en: "He didn't was tired.", correct: false },
    { n: "④", en: "He wasn't tired.", correct: true },
  ],
  correctAnswers: ["② Was he tired?", "④ He wasn't tired."],
  reason: "tired = adjective و Verb to be هو was",
};

// -------------------- 38. التحدي النهائي --------------------
export const FINAL_CHALLENGE_15 = {
  instruction: "اكتب فقرة من 8 جمل عن مكان زرته في الماضي.",
  requirements: [
    "✅ was مرتين على الأقل.",
    "✅ were مرتين على الأقل.",
    "✅ جملتين منفيتين.",
    "✅ سؤالين.",
    "✅ سؤال Wh واحد على الأقل.",
    "مثلاً لا تبدأ بالقصة السابقة؛ اصنع قصة جديدة تماماً.",
  ],
  vocab: ["crowded", "quiet", "beautiful", "strange", "exciting", "dark", "empty", "interesting"],
  note: "حاول استخدام مفردات مثل:",
};

// -------------------- ملخص الدرس 15 --------------------
export const SUMMARY_15 = {
  affirmative: {
    was: "I / He / She / It + was",
    were: "You / We / They + were",
  },
  negative: {
    was: "was + not = wasn't",
    were: "were + not = weren't",
  },
  question: {
    was: "Was + I/he/she/it...?",
    were: "Were + you/we/they...?",
  },
  short: [
    "Yes, he was.",
    "No, he wasn't.",
    "Yes, they were.",
    "No, they weren't.",
  ],
  golden: {
    ordinary: ["Did + Base Verb", "Did she go?", "Did he see?", "Did they play?"],
    be: ["Was / Were", "Was she tired?", "Were they happy?"],
    warning: "🚨 لا نستخدم did مع was/were.",
  },
};

// -------------------- خريطة المنهج --------------------
export const ROADMAP_15: { n: number; en: string; ar?: string; here?: boolean }[] = [
  { n: 1, en: "Sentence Structure", ar: "تكوين الجملة" },
  { n: 2, en: "Pronouns + Verb to be", ar: "الضمائر و Verb to be" },
  { n: 3, en: "Verb to be — النفي والأسئلة", ar: "النفي والأسئلة" },
  { n: 4, en: "Nouns + Articles", ar: "الأسماء وأدوات التعريف" },
  { n: 5, en: "Adjectives", ar: "الصفات" },
  { n: 6, en: "Present Simple — مثبت", ar: "المضارع البسيط مثبت" },
  { n: 7, en: "Present Simple — نفي وأسئلة", ar: "النفي والأسئلة" },
  { n: 8, en: "Present Simple — مراجعة شاملة", ar: "مراجعة شاملة" },
  { n: 9, en: "Present Continuous", ar: "المضارع المستمر" },
  { n: 10, en: "Present Continuous — الاستخدام المتقدم", ar: "الاستخدام المتقدم" },
  { n: 11, en: "Present Simple vs Present Continuous", ar: "البسيط مقابل المستمر" },
  { n: 12, en: "Past Simple — مثبت", ar: "الماضي البسيط مثبت" },
  { n: 13, en: "Past Simple — did / didn't", ar: "النفي والأسئلة" },
  { n: 14, en: "Past Simple — Wh Questions", ar: "أسئلة Wh" },
  { n: 15, en: "Past Simple of Verb to be — was / were", ar: "was / were", here: true },
];

export const ROADMAP_15_NEXT =
  "وبعد تثبيت هذا الجزء، سنقدر نبدأ بإدخال **الملكية** بشكل قوي، مع الحفاظ على الخطة التي اتفقنا عليها للجمع العادي والشاذ والـ Auxiliary Verbs وعدم تخطي أي أساس مهم.";

export const COVER_PLAN_15 = [
  "① الماضي من am / is / are → was / were",
  "② القاعدة الأساسية: I/He/She/It → was / You/We/They → were",
  "③ أمثلة بسيطة مع الترجمة",
  "④ الفرق بين الفعل العادي و Verb to be",
  "⑤ النفي: wasn't / weren't والسؤال: Was/Were + Subject",
  "⑥ التحذير الذهبي: Did لا يدخل نظام was/were",
  "⑦ مقارنة النظامين و Wh Questions مع was/were",
  "⑧ التمارين الستة + Grammar Detective + IQ200 + التحدي النهائي",
];

// ============================================================
// أنواع الكتل والتمارين والشرائح
// ============================================================
export type Block15 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: "neutral" | "good" | "bad" | "focus" | "warn" }
  | { type: "list"; items: string[] }
  | { type: "formula"; key: FormulaKey15 }
  | { type: "sentence"; en: string; ar?: string; note?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "wasWereBoard" }
  | { type: "commandCenter" }
  | { type: "didGate" }
  | { type: "transformationMachine" }
  | { type: "didNotAllowed" }
  | { type: "timeMachine" }
  | { type: "detector" }
  | { type: "whLab" }
  | { type: "whBoard" }
  | { type: "timeline" }
  | { type: "usageGrid" }
  | { type: "comparisonSystems" }
  | { type: "presentPastComparison" }
  | { type: "timeWords" }
  | { type: "whenYoung" }
  | { type: "didVsWas" }
  | { type: "geniusComparison" }
  | { type: "whatExamples" };

export type Exercise15 =
  | { type: "level1" }
  | { type: "level2" }
  | { type: "level3" }
  | { type: "level4" }
  | { type: "level5" }
  | { type: "level6" }
  | { type: "detective" }
  | { type: "iq200a" }
  | { type: "iq200b" }
  | { type: "finalChallenge" };

export type Slide15 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block15[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise15 }
  | { kind: "summary"; title: string }
  | { kind: "keyRule"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const CORE = "الأساس — was / were";
const USAGE = "الاستخدامات";
const SYSTEMS = "النظامان — الفعل العادي مقابل Verb to be";
const QUESTIONS = "الأسئلة والإجابات";
const WH = "Wh Questions مع was/were";
const PRACTICE = "التمارين والتحديات";
const END = "الخاتمة";

export const SLIDES: Slide15[] = [
  { kind: "cover", section: START, mascot: "🟠" },
  { kind: "objectives", section: START, mascot: "🎯" },

  // 1
  {
    kind: "lesson",
    section: CORE,
    mascot: "🧠",
    step: "1",
    title: "أول سؤال: ما هو الماضي من am / is / are؟",
    lead: "أنت تعلمت سابقاً الحاضر، والآن سنرى الماضي.",
    blocks: [
      { type: "text", text: "أنت تعلمت سابقاً:" },
      { type: "english", en: "I → am" },
      { type: "english", en: "He → is" },
      { type: "english", en: "She → is" },
      { type: "english", en: "It → is" },
      { type: "english", en: "You → are" },
      { type: "english", en: "We → are" },
      { type: "english", en: "They → are" },
      { type: "text", text: "لكن عندما نتحدث عن الماضي، تتغير هذه الكلمات." },
      { type: "text", text: "لدينا فقط كلمتان:" },
      { type: "english", en: "WAS", tone: "focus" },
      { type: "english", en: "WERE", tone: "focus" },
      { type: "wasWereBoard" },
    ],
  },

  // 2
  {
    kind: "lesson",
    section: CORE,
    mascot: "⭐",
    step: "2",
    title: "القاعدة الأساسية",
    lead: "احفظها بهذه الصورة:",
    blocks: [
      { type: "english", en: "I → was" },
      { type: "english", en: "He → was" },
      { type: "english", en: "She → was" },
      { type: "english", en: "It → was" },
      { type: "english", en: "You → were" },
      { type: "english", en: "We → were" },
      { type: "english", en: "They → were" },
      { type: "text", text: "احفظها بهذه الصورة:" },
      { type: "english", en: "I / He / She / It → WAS", tone: "focus" },
      { type: "english", en: "You / We / They → WERE", tone: "focus" },
      { type: "note", emoji: "🔥", text: "هذه هي القاعدة الأساسية للدرس كله." },
      { type: "commandCenter" },
      { type: "formula", key: "wasAff" },
      { type: "formula", key: "wereAff" },
    ],
  },

  // 3
  {
    kind: "lesson",
    section: CORE,
    mascot: "🟦",
    step: "3",
    title: "أمثلة بسيطة",
    blocks: [
      { type: "english", en: "I was tired.", ar: "كنت متعباً." },
      { type: "english", en: "He was happy.", ar: "كان سعيداً." },
      { type: "english", en: "She was busy.", ar: "كانت مشغولة." },
      { type: "english", en: "It was cold.", ar: "كان الجو بارداً." },
      { type: "english", en: "You were late.", ar: "كنت متأخراً." },
      { type: "english", en: "We were ready.", ar: "كنا مستعدين." },
      { type: "english", en: "They were excited.", ar: "كانوا متحمسين." },
      { type: "transformationMachine" },
    ],
  },

  // 4
  {
    kind: "lesson",
    section: CORE,
    mascot: "🧠",
    step: "4",
    title: "ما معنى WAS / WERE؟",
    lead: "في كثير من الجمل لا نترجم was / were ككلمة مستقلة حرفياً.",
    blocks: [
      { type: "english", en: "I am happy.", ar: "أنا سعيد." },
      { type: "text", text: "في الماضي:" },
      { type: "english", en: "I was happy.", ar: "كنت سعيداً." },
      { type: "english", en: "He is tired.", ar: "هو متعب." },
      { type: "text", text: "في الماضي:" },
      { type: "english", en: "He was tired.", ar: "كان متعباً." },
      { type: "english", en: "They are ready.", ar: "هم مستعدون." },
      { type: "text", text: "في الماضي:" },
      { type: "english", en: "They were ready.", ar: "كانوا مستعدين." },
      { type: "text", text: "إذن:" },
      { type: "english", en: "am / is / are → الحاضر", tone: "focus" },
      { type: "english", en: "was / were → الماضي", tone: "focus" },
      { type: "timeMachine" },
    ],
  },

  // 5
  {
    kind: "lesson",
    section: CORE,
    mascot: "🕰️",
    step: "5",
    title: "خط الزمن",
    blocks: [
      { type: "text", text: "تذكر:" },
      { type: "english", en: "PAST ← الماضي | NOW ← الحاضر" },
      { type: "text", text: "في الحاضر:" },
      { type: "english", en: "She is happy." },
      { type: "text", text: "في الماضي:" },
      { type: "english", en: "She was happy." },
      { type: "text", text: "في الحاضر:" },
      { type: "english", en: "They are tired." },
      { type: "text", text: "في الماضي:" },
      { type: "english", en: "They were tired." },
      { type: "timeline" },
    ],
  },

  // 6
  {
    kind: "lesson",
    section: USAGE,
    mascot: "🟢",
    step: "6",
    title: "متى نستخدم WAS / WERE؟",
    lead: "نستخدمهما عندما نصف:",
    blocks: [
      { type: "usageGrid" },
      { type: "text", text: "① حالة في الماضي." },
      { type: "text", text: "② شعوراً في الماضي." },
      { type: "text", text: "③ صفة في الماضي." },
      { type: "text", text: "④ مكاناً في الماضي." },
      { type: "text", text: "⑤ هوية أو مهنة في الماضي." },
      { type: "text", text: "⑥ عمراً في الماضي." },
    ],
  },

  // 7
  {
    kind: "lesson",
    section: USAGE,
    mascot: "😊",
    step: "7",
    title: "حالة أو شعور في الماضي",
    blocks: [
      { type: "english", en: "I was nervous before the exam.", ar: "كنت متوتراً قبل الامتحان." },
      { type: "english", en: "Mia was excited about the trip.", ar: "كانت ميا متحمسة للرحلة." },
      { type: "english", en: "The students were tired after the competition.", ar: "كان الطلاب متعبين بعد المسابقة." },
    ],
  },

  // 8
  {
    kind: "lesson",
    section: USAGE,
    mascot: "🎨",
    step: "8",
    title: "صفة في الماضي",
    blocks: [
      { type: "english", en: "The sky was dark.", ar: "كانت السماء مظلمة." },
      { type: "english", en: "The water was cold.", ar: "كان الماء بارداً." },
      { type: "english", en: "The rooms were clean.", ar: "كانت الغرف نظيفة." },
      { type: "english", en: "The machine was noisy.", ar: "كانت الآلة صاخبة." },
    ],
  },

  // 9
  {
    kind: "lesson",
    section: USAGE,
    mascot: "📍",
    step: "9",
    title: "مكان في الماضي",
    lead: "هنا نقطة مهمة جداً.",
    blocks: [
      { type: "text", text: "was / were يمكن أن تعني أن شخصاً أو شيئاً كان موجوداً في مكان معين." },
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "I was at home.", ar: "كنت في المنزل." },
      { type: "english", en: "She was at the library.", ar: "كانت في المكتبة." },
      { type: "english", en: "They were at the stadium.", ar: "كانوا في الملعب." },
      { type: "english", en: "We were in the kitchen.", ar: "كنا في المطبخ." },
      { type: "formula", key: "wasWereNeg" },
    ],
  },

  // 10
  {
    kind: "lesson",
    section: USAGE,
    mascot: "🧑‍🏫",
    step: "10",
    title: "هوية أو مهنة في الماضي",
    lead: "يمكننا أيضاً استخدام was / were + noun",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "He was a student.", ar: "كان طالباً." },
      { type: "english", en: "She was a teacher.", ar: "كانت معلمة." },
      { type: "english", en: "They were engineers.", ar: "كانوا مهندسين." },
      { type: "text", text: "لاحظ:" },
      { type: "english", en: "He was a student." },
      { type: "text", text: "نحتاج a لأن student اسم مفرد معدود." },
      { type: "text", text: "لكن:" },
      { type: "english", en: "They were engineers." },
      { type: "text", text: "لا نضع a لأن engineers جمع." },
    ],
  },

  // 11
  {
    kind: "lesson",
    section: USAGE,
    mascot: "🔥",
    step: "11",
    title: "WAS / WERE + Adjective",
    lead: "تذكر الدرس 5:",
    blocks: [
      { type: "english", en: "Subject + am/is/are + Adjective" },
      { type: "text", text: "الآن نحولها للماضي:" },
      { type: "english", en: "Subject + was/were + Adjective", tone: "focus" },
      { type: "text", text: "مثال:" },
      { type: "english", en: "He is nervous." },
      { type: "english", en: "He was nervous." },
      { type: "english", en: "She is happy." },
      { type: "english", en: "She was happy." },
      { type: "english", en: "They are tired." },
      { type: "english", en: "They were tired." },
      { type: "english", en: "The room is quiet." },
      { type: "english", en: "The room was quiet." },
      { type: "timeMachine" },
    ],
  },

  // 12
  {
    kind: "lesson",
    section: USAGE,
    mascot: "🧠",
    step: "12",
    title: "WAS / WERE + Noun",
    blocks: [
      { type: "text", text: "الحاضر:" },
      { type: "english", en: "He is a doctor." },
      { type: "text", text: "الماضي:" },
      { type: "english", en: "He was a doctor." },
      { type: "text", text: "الحاضر:" },
      { type: "english", en: "She is an artist." },
      { type: "text", text: "الماضي:" },
      { type: "english", en: "She was an artist." },
      { type: "text", text: "الحاضر:" },
      { type: "english", en: "They are students." },
      { type: "text", text: "الماضي:" },
      { type: "english", en: "They were students." },
    ],
  },

  // 13
  {
    kind: "lesson",
    section: USAGE,
    mascot: "📍",
    step: "13",
    title: "WAS / WERE + Place",
    blocks: [
      { type: "text", text: "الحاضر:" },
      { type: "english", en: "He is at school." },
      { type: "text", text: "الماضي:" },
      { type: "english", en: "He was at school." },
      { type: "text", text: "الحاضر:" },
      { type: "english", en: "They are in the garden." },
      { type: "text", text: "الماضي:" },
      { type: "english", en: "They were in the garden." },
    ],
  },

  // 14
  {
    kind: "lesson",
    section: SYSTEMS,
    mascot: "🚨",
    step: "14",
    title: "الفرق بين WAS/WERE والفعل العادي",
    lead: "هذه نقطة مهمة جداً.",
    blocks: [
      { type: "text", text: "انظر:" },
      { type: "english", en: "He played football." },
      { type: "text", text: "هنا:" },
      { type: "english", en: "played = فعل" },
      { type: "text", text: "لكن:" },
      { type: "english", en: "He was tired." },
      { type: "text", text: "هنا:" },
      { type: "english", en: "was = Verb to be" },
      { type: "text", text: "و:" },
      { type: "english", en: "tired = Adjective" },
      { type: "text", text: "مثال آخر:" },
      { type: "english", en: "She visited the museum." },
      { type: "text", text: "حدث فعل." },
      { type: "text", text: "لكن:" },
      { type: "english", en: "She was happy." },
      { type: "text", text: "نحن نصف حالتها." },
      { type: "text", text: "قارن:" },
      { type: "english", en: "They explored the cave.", ar: "هم استكشفوا الكهف." },
      { type: "english", en: "They were tired.", ar: "كانوا متعبين." },
      { type: "text", text: "الجملة الأولى = فعل حدث." },
      { type: "text", text: "الجملة الثانية = حالة." },
      { type: "detector" },
    ],
  },

  // 15
  {
    kind: "lesson",
    section: SYSTEMS,
    mascot: "🔥",
    step: "15",
    title: "لا نستخدم DID مع WAS / WERE",
    lead: "هذه من أهم قواعد الدرس.",
    blocks: [
      { type: "text", text: "لا نقول:" },
      { type: "english", en: "Did he be tired? ❌", tone: "bad" },
      { type: "text", text: "نقول:" },
      { type: "english", en: "Was he tired? ✅", tone: "good" },
      { type: "text", text: "لا نقول:" },
      { type: "english", en: "Did they be happy? ❌", tone: "bad" },
      { type: "text", text: "نقول:" },
      { type: "english", en: "Were they happy? ✅", tone: "good" },
      { type: "text", text: "لماذا؟" },
      { type: "text", text: "لأن:" },
      { type: "english", en: "was / were", tone: "focus" },
      { type: "text", text: "تعمل بنفسها كفعل، ويمكنها تكوين السؤال والنفي دون did." },
      { type: "didNotAllowed" },
      { type: "didGate" },
    ],
  },

  // 16
  {
    kind: "lesson",
    section: QUESTIONS,
    mascot: "🟦",
    step: "16",
    title: "السؤال باستخدام WAS / WERE",
    lead: "القاعدة:",
    blocks: [
      { type: "english", en: "Was/Were + Subject + ...?", tone: "focus" },
      { type: "text", text: "نقوم بتبديل مكان الفعل والفاعل." },
      { type: "text", text: "الجملة:" },
      { type: "english", en: "She was tired." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Was she tired?" },
      { type: "text", text: "الجملة:" },
      { type: "english", en: "They were late." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Were they late?" },
      { type: "text", text: "الجملة:" },
      { type: "english", en: "He was at home." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Was he at home?" },
      { type: "text", text: "الجملة:" },
      { type: "english", en: "You were nervous." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Were you nervous?" },
      { type: "formula", key: "wasWereQ" },
    ],
  },

  // 17
  {
    kind: "lesson",
    section: QUESTIONS,
    mascot: "⭐",
    step: "17",
    title: "قاعدة السؤال",
    blocks: [
      { type: "english", en: "WAS + I / He / She / It", tone: "focus" },
      { type: "english", en: "WERE + You / We / They", tone: "focus" },
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "Was he happy?" },
      { type: "english", en: "Were they happy?" },
      { type: "formula", key: "wasQ" },
      { type: "formula", key: "wereQ" },
    ],
  },

  // 18
  {
    kind: "lesson",
    section: QUESTIONS,
    mascot: "🟢",
    step: "18",
    title: "الإجابات القصيرة",
    blocks: [
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Was he tired?" },
      { type: "text", text: "نقول:" },
      { type: "english", en: "Yes, he was." },
      { type: "english", en: "No, he wasn't." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Was she at home?" },
      { type: "english", en: "Yes, she was." },
      { type: "english", en: "No, she wasn't." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Were they ready?" },
      { type: "english", en: "Yes, they were." },
      { type: "english", en: "No, they weren't." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Were you busy?" },
      { type: "english", en: "Yes, I was." },
      { type: "english", en: "No, I wasn't." },
      { type: "note", emoji: "🔥", text: "انتبه إلى: Were you...? الإجابة Yes, I was. وليس Yes, I were. ❌" },
    ],
  },

  // 19
  {
    kind: "lesson",
    section: QUESTIONS,
    mascot: "🟥",
    step: "19",
    title: "النفي",
    blocks: [
      { type: "english", en: "Subject + was/were + not", tone: "focus" },
      { type: "text", text: "الاختصارات:" },
      { type: "english", en: "was not = wasn't" },
      { type: "english", en: "were not = weren't" },
      { type: "english", en: "I was tired." },
      { type: "english", en: "I wasn't tired." },
      { type: "english", en: "He was nervous." },
      { type: "english", en: "He wasn't nervous." },
      { type: "english", en: "She was at school." },
      { type: "english", en: "She wasn't at school." },
      { type: "english", en: "They were ready." },
      { type: "english", en: "They weren't ready." },
      { type: "english", en: "We were late." },
      { type: "english", en: "We weren't late." },
      { type: "transformationMachine" },
    ],
  },

  // 20
  {
    kind: "lesson",
    section: SYSTEMS,
    mascot: "🧠",
    step: "20",
    title: "لا نستخدم DID هنا",
    blocks: [
      { type: "text", text: "لا تقل:" },
      { type: "english", en: "He didn't was tired. ❌", tone: "bad" },
      { type: "text", text: "الصحيح:" },
      { type: "english", en: "He wasn't tired. ✅", tone: "good" },
      { type: "text", text: "ولا:" },
      { type: "english", en: "They didn't were ready. ❌", tone: "bad" },
      { type: "text", text: "الصحيح:" },
      { type: "english", en: "They weren't ready. ✅", tone: "good" },
      { type: "note", emoji: "🔥", text: "تذكر:" },
      { type: "text", text: "الأفعال العادية:" },
      { type: "english", en: "He played." },
      { type: "english", en: "He didn't play." },
      { type: "english", en: "Did he play?" },
      { type: "text", text: "أما Verb to be:" },
      { type: "english", en: "He was tired." },
      { type: "english", en: "He wasn't tired." },
      { type: "english", en: "Was he tired?" },
      { type: "comparisonSystems" },
      { type: "didNotAllowed" },
    ],
  },

  // 21
  {
    kind: "lesson",
    section: SYSTEMS,
    mascot: "⚡",
    step: "21",
    title: "مقارنة النظامين",
    blocks: [
      { type: "text", text: "فعل عادي" },
      { type: "english", en: "She visited the farm." },
      { type: "english", en: "She didn't visit the farm." },
      { type: "english", en: "Did she visit the farm?" },
      { type: "text", text: "Verb to be" },
      { type: "english", en: "She was at the farm." },
      { type: "english", en: "She wasn't at the farm." },
      { type: "english", en: "Was she at the farm?" },
      { type: "text", text: "هذا الفرق مهم جداً." },
      { type: "comparisonSystems" },
    ],
  },

  // 22
  {
    kind: "lesson",
    section: SYSTEMS,
    mascot: "🧩",
    step: "22",
    title: "مقارنة Present و Past",
    blocks: [
      { type: "text", text: "Present" },
      { type: "english", en: "I am happy." },
      { type: "text", text: "Past" },
      { type: "english", en: "I was happy." },
      { type: "text", text: "Present" },
      { type: "english", en: "She is busy." },
      { type: "text", text: "Past" },
      { type: "english", en: "She was busy." },
      { type: "text", text: "Present" },
      { type: "english", en: "They are excited." },
      { type: "text", text: "Past" },
      { type: "english", en: "They were excited." },
      { type: "text", text: "Present" },
      { type: "english", en: "We are at home." },
      { type: "text", text: "Past" },
      { type: "english", en: "We were at home." },
      { type: "presentPastComparison" },
    ],
  },

  // 23
  {
    kind: "lesson",
    section: CORE,
    mascot: "🕰️",
    step: "23",
    title: "كلمات تدل على الماضي",
    lead: "يمكن أن تأتي was / were مع كلمات الزمن التي تعلمناها في Past Simple:",
    blocks: [
      { type: "timeWords" },
      { type: "english", en: "yesterday" },
      { type: "english", en: "last night" },
      { type: "english", en: "last week" },
      { type: "english", en: "last month" },
      { type: "english", en: "last year" },
      { type: "english", en: "two days ago" },
      { type: "english", en: "three years ago" },
      { type: "english", en: "when I was young" },
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "I was at the beach yesterday.", ar: "كنت على الشاطئ أمس." },
      { type: "english", en: "They were very tired last night.", ar: "كانوا متعبين جداً الليلة الماضية." },
      { type: "english", en: "She was in London last year.", ar: "كانت في لندن العام الماضي." },
    ],
  },

  // 24
  {
    kind: "lesson",
    section: CORE,
    mascot: "🧠",
    step: "24",
    title: "When I was young",
    blocks: [
      { type: "text", text: "تعبير مهم جداً:" },
      { type: "english", en: "When I was young", ar: "عندما كنت صغيراً" },
      { type: "text", text: "مثال:" },
      { type: "english", en: "When I was young, I was very curious.", ar: "عندما كنت صغيراً، كنت فضولياً جداً." },
      { type: "text", text: "لاحظ أن لدينا:" },
      { type: "english", en: "was", tone: "focus" },
      { type: "text", text: "مرتين." },
      { type: "whenYoung" },
    ],
  },

  // 25
  {
    kind: "lesson",
    section: WH,
    mascot: "🔵",
    step: "25",
    title: "أسئلة Wh مع WAS / WERE",
    lead: "يمكننا أيضاً استخدام Where / When / Why / Who / What لكن التركيب مختلف عن did.",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "Where was she?", ar: "أين كانت؟" },
      { type: "english", en: "Where were they?", ar: "أين كانوا؟" },
      { type: "english", en: "Why was he angry?", ar: "لماذا كان غاضباً؟" },
      { type: "english", en: "Why were they late?", ar: "لماذا كانوا متأخرين؟" },
      { type: "english", en: "When was the meeting?", ar: "متى كان الاجتماع؟" },
      { type: "whLab" },
      { type: "whBoard" },
      { type: "formula", key: "wasWereWh" },
    ],
  },

  // 26
  {
    kind: "lesson",
    section: WH,
    mascot: "🚨",
    step: "26",
    title: "الفرق بين سؤال DID وسؤال WAS/WERE",
    blocks: [
      { type: "text", text: "انظر:" },
      { type: "english", en: "Where did he go?", ar: "أين ذهب؟" },
      { type: "text", text: "هنا لدينا فعل:" },
      { type: "english", en: "go", tone: "focus" },
      { type: "text", text: "لذلك نستخدم did." },
      { type: "text", text: "لكن:" },
      { type: "english", en: "Where was he?", ar: "أين كان؟" },
      { type: "text", text: "هنا لدينا Verb to be:" },
      { type: "english", en: "was", tone: "focus" },
      { type: "text", text: "لذلك لا نستخدم did." },
      { type: "didVsWas" },
    ],
  },

  // 27
  {
    kind: "lesson",
    section: WH,
    mascot: "🔥",
    step: "27",
    title: "مقارنة عبقرية",
    blocks: [
      { type: "text", text: "الجملة:" },
      { type: "english", en: "He went to the laboratory." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Where did he go?" },
      { type: "text", text: "لكن:" },
      { type: "english", en: "He was in the laboratory." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Where was he?" },
      { type: "text", text: "لاحظ الفرق:" },
      { type: "english", en: "go → did", tone: "focus" },
      { type: "english", en: "be → was/were", tone: "focus" },
      { type: "geniusComparison" },
    ],
  },

  // 28
  {
    kind: "lesson",
    section: WH,
    mascot: "🧠",
    step: "28",
    title: "What مع WAS/WERE",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "What was the problem?", ar: "ما المشكلة؟" },
      { type: "english", en: "What was the weather like?", ar: "كيف كان الطقس؟" },
      { type: "english", en: "What were the results?", ar: "ما النتائج؟" },
      { type: "text", text: "لاحظ:" },
      { type: "english", en: "What + was/were", tone: "focus" },
      { type: "whatExamples" },
    ],
  },

  // 29
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "✏️ 29. تمارين المستوى الأول",
    title: "تمارين المستوى الأول",
    subtitle: "اختر: was / were",
    ex: { type: "level1" },
  },
  // 30
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "✏️ 30. المستوى الثاني",
    title: "المستوى الثاني",
    subtitle: "حوّل إلى النفي:",
    ex: { type: "level2" },
  },
  // 31
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "✏️ 31. المستوى الثالث",
    title: "المستوى الثالث",
    subtitle: "حوّل إلى سؤال:",
    ex: { type: "level3" },
  },
  // 32
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "✏️ 32. المستوى الرابع",
    title: "المستوى الرابع",
    subtitle: "اختر الكلمة الصحيحة: Was/Were vs Did",
    ex: { type: "level4" },
  },
  // 33
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧠",
    badge: "🧠 33. المستوى الخامس — صحح الأخطاء",
    title: "المستوى الخامس — صحح الأخطاء",
    subtitle: "صحح الأخطاء التالية:",
    ex: { type: "level5" },
  },
  // 34
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    badge: "🔥 34. المستوى السادس — هل نستخدم DID أم WAS/WERE؟",
    title: "المستوى السادس — DID أم WAS/WERE؟",
    subtitle: "أكمل: هل نستخدم DID أم WAS/WERE؟",
    ex: { type: "level6" },
  },
  // 35
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🕵️",
    badge: "🕵️ 35. Grammar Detective",
    title: "Grammar Detective",
    subtitle: "اقرأ ثم أجب عن الأسئلة السبعة.",
    ex: { type: "detective" },
  },
  // 36
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🚀",
    badge: "🚀 36. IQ200 Challenge",
    title: "IQ200 Challenge",
    subtitle: "حوّل الجملة إلى خمسة أشكال.",
    ex: { type: "iq200a" },
  },
  // 37
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧠",
    badge: "🧠 37. IQ200 — اختر النظام الصحيح",
    title: "IQ200 — اختر النظام الصحيح",
    subtitle: "أي جملة صحيحة؟",
    ex: { type: "iq200b" },
  },
  // 38
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🏆",
    badge: "🏆 38. التحدي النهائي",
    title: "التحدي النهائي",
    subtitle: "اكتب فقرة من 8 جمل عن مكان زرته في الماضي.",
    ex: { type: "finalChallenge" },
  },

  { kind: "summary", section: END, mascot: "🧠", title: "ملخص الدرس 15" },
  { kind: "keyRule", section: END, mascot: "🔥", title: "القاعدة الذهبية" },
  { kind: "roadmap", section: END, mascot: "🗺️", title: "مكاننا في المنهج" },
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: END, mascot: "🎓", title: "الخاتمة" },
];

// -------------------- الجملة الكاملة للمصدر تبقى متاحة للتحقق الآلي --------------------
export const SOURCE_FIDELITY_MARKERS_15 = [
  ...SOURCE_SECTIONS,
  ...OBJECTIVES_15.map((x) => x.text),
  ...PAST_OF_BE.present.map((x) => x.en),
  ...PAST_OF_BE.past,
  CORE_RULE_15.wasGroup,
  CORE_RULE_15.wereGroup,
  ...SIMPLE_EXAMPLES_15.flatMap((x) => [x.en, x.ar]),
  ...MEANING_EXAMPLES_15.flatMap((x) => [x.present, x.presentAr, x.past, x.pastAr]),
  MEANING_RULE_15.present,
  MEANING_RULE_15.past,
  ...TIMELINE_15.presentPast.flatMap((x) => [x.now, x.past]),
  ...USAGE_15.map((x) => x.ar),
  ...FEELING_EXAMPLES_15.flatMap((x) => [x.en, x.ar]),
  ...ADJ_EXAMPLES_15.flatMap((x) => [x.en, x.ar]),
  ...PLACE_EXAMPLES_15.flatMap((x) => [x.en, x.ar]),
  ...IDENTITY_EXAMPLES_15.flatMap((x) => [x.en, x.ar]),
  IDENTITY_NOTE_15.singular,
  IDENTITY_NOTE_15.plural,
  ADJ_FORMULA_15.presentFormula,
  ADJ_FORMULA_15.pastFormula,
  ...ADJ_FORMULA_15.pairs.flatMap((x) => [x.present, x.past]),
  ...NOUN_FORMULA_15.pairs.flatMap((x) => [x.present, x.past]),
  ...PLACE_FORMULA_15.pairs.flatMap((x) => [x.present, x.past]),
  ...DIFF_ORDINARY_VS_BE_15.flatMap((x) => [x.ordinary, x.be]),
  ...DID_NOT_WITH_BE_15.examples.flatMap((x) => [x.wrong, x.right]),
  DID_NOT_WITH_BE_15.reason,
  QUESTION_FORMATION_15.rule,
  ...QUESTION_FORMATION_15.examples.flatMap((x) => [x.aff, x.q]),
  QUESTION_RULE_15.wasRule,
  QUESTION_RULE_15.wereRule,
  ...QUESTION_RULE_15.examples,
  ...SHORT_ANSWERS_15.flatMap((x) => [x.q, x.yes, x.no]),
  SHORT_ANSWER_TRAP_15.q,
  SHORT_ANSWER_TRAP_15.correct,
  SHORT_ANSWER_TRAP_15.wrong,
  NEGATION_15.rule,
  ...NEGATION_15.short,
  ...NEGATION_15.examples.flatMap((x) => [x.aff, x.neg]),
  ...DID_MISUSE_15.wrongExamples.flatMap((x) => [x.wrong, x.right]),
  ...DID_MISUSE_15.contrast.ordinary,
  ...DID_MISUSE_15.contrast.be,
  ...COMPARISON_SYSTEMS_15.ordinary.sentences,
  ...COMPARISON_SYSTEMS_15.be.sentences,
  ...PRESENT_PAST_15.flatMap((x) => [x.present, x.past]),
  ...TIME_WORDS_15,
  ...TIME_EXAMPLES_15.flatMap((x) => [x.en, x.ar]),
  WHEN_YOUNG_15.phrase,
  WHEN_YOUNG_15.ar,
  WHEN_YOUNG_15.example.en,
  WHEN_YOUNG_15.example.ar,
  WHEN_YOUNG_15.example.note,
  ...WH_WITH_BE_15.flatMap((x) => [x.en, x.ar]),
  DID_VS_WAS_15.didExample.q,
  DID_VS_WAS_15.didExample.ar,
  DID_VS_WAS_15.didExample.note,
  DID_VS_WAS_15.wasExample.q,
  DID_VS_WAS_15.wasExample.ar,
  DID_VS_WAS_15.wasExample.note,
  GENIUS_COMPARISON_15.go.sentence,
  GENIUS_COMPARISON_15.go.question,
  GENIUS_COMPARISON_15.go.rule,
  GENIUS_COMPARISON_15.be.sentence,
  GENIUS_COMPARISON_15.be.question,
  GENIUS_COMPARISON_15.be.rule,
  ...WHAT_WITH_BE_15.flatMap((x) => [x.en, x.ar]),
  WHAT_NOTE_15,
  ...LEVEL1_15.flatMap((x) => [x.stem, x.answer, x.en]),
  ...LEVEL2_15.flatMap((x) => [x.sentence, x.answer]),
  ...LEVEL3_15.flatMap((x) => [x.sentence, x.answer]),
  ...LEVEL4_15.flatMap((x) => [x.stem, x.answer, x.why]),
  LEVEL4_NOTE_15,
  ...LEVEL5_15.flatMap((x) => [x.wrong, x.correct]),
  ...LEVEL6_15.flatMap((x) => [x.stem, x.answer]),
  DETECTIVE_PASSAGE_15,
  ...DETECTIVE_Q_15.flatMap((x) => [x.q, x.answer]),
  IQ200_15.sentence,
  ...IQ200_15.tasks.map((x) => x.answer),
  ...IQ200_SYSTEM_15.options.map((x) => x.en),
  ...IQ200_SYSTEM_15.correctAnswers,
  IQ200_SYSTEM_15.reason,
  FINAL_CHALLENGE_15.instruction,
  ...FINAL_CHALLENGE_15.requirements,
  ...FINAL_CHALLENGE_15.vocab,
  SUMMARY_15.affirmative.was,
  SUMMARY_15.affirmative.were,
  SUMMARY_15.negative.was,
  SUMMARY_15.negative.were,
  SUMMARY_15.question.was,
  SUMMARY_15.question.were,
  ...SUMMARY_15.short,
  ...SUMMARY_15.golden.ordinary,
  ...SUMMARY_15.golden.be,
  SUMMARY_15.golden.warning,
  ...ROADMAP_15.map((x) => x.en),
  ROADMAP_15_NEXT,
  ...INTENTIONALLY_WRONG_15,
];
