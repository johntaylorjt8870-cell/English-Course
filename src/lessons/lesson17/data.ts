// ============================================================
// الدرس 17 — Possessive Pronouns — ضمائر الملكية
// المصدر الكامل محفوظ حرفيًا — لا تلخيص ولا إعادة صياغة ولا حذف أقسام.
// العنوان: الدرس 17: Possessive Pronouns — ضمائر الملكية
//
// ملاحظة اتجاه: كل وحدة إنجليزية داخل هذا الملف نص خام يُعرض دائمًا
// داخل عازل LTR (dir="ltr") — ولا يُقسَّم إلى كلمات منفصلة أبدًا.
// ============================================================

// -------------------- الفهارس والعناوين (تحقق تغطية المصدر) --------------------
export const SOURCE_SECTIONS: string[] = [
  "🎯 أهداف الدرس",
  "🧠 1. تذكير سريع من الدرس 16",
  "🚀 2. ما المشكلة التي سنحلها اليوم؟",
  "⭐ 3. ما هو Possessive Pronoun؟",
  "🟦 4. الخريطة الأساسية",
  "🧠 5. الفرق الأساسي",
  "🟢 6. MY → MINE",
  "🔵 7. YOUR → YOURS",
  "🟣 8. HIS → HIS",
  "🟡 9. HER → HERS",
  "🟠 10. OUR → OURS",
  "🔴 11. THEIR → THEIRS",
  "⭐ 12. لاحظ شيئاً مهماً جداً",
  "🧠 13. مقارنة كاملة",
  "🚨 14. خطأ مشهور جداً",
  "🚨 15. خطأ آخر",
  "🚨 16. خطأ آخر",
  "🧠 17. حركة التحويل السحرية",
  "🔥 18. مثال IQ200",
  "🧠 19. ثلاثة أنظمة للملكية",
  "🟦 20. مثال كامل",
  "🧠 21. متى نستخدم Possessive Pronouns كثيراً؟",
  "⭐ 22. السؤال المهم: Whose?",
  "🧠 23. الإجابة على Whose",
  "🟢 24. مثال حواري",
  "🧠 25. الفرق بين MY و MINE",
  "🔵 26. YOUR و YOURS",
  "🟣 27. HER و HERS",
  "🟠 28. OUR و OURS",
  "🔴 29. THEIR و THEIRS",
  "🚨 30. خطأ شديد الشيوع",
  "🧠 31. مقارنة ثلاثية مهمة",
  "🧠 32. his حالة خاصة",
  "🟡 33. ماذا عن IT؟",
  "🧩 34. الملكية مع الجمع",
  "⭐ 35. الملكية لا تعتمد على عدد الأشياء",
  "✏️ 36. تمارين المستوى الأول",
  "✏️ 37. المستوى الثاني",
  "✏️ 38. المستوى الثالث",
  "✏️ 39. المستوى الرابع — صحح الأخطاء",
  "🧠 40. المستوى الخامس — Whose?",
  "🔥 41. المستوى السادس — التحويل",
  "🕵️ 42. Grammar Detective",
  "🚀 43. IQ200 Challenge",
  "🔥 44. IQ200 Challenge 2",
  "🏆 45. التحدي النهائي",
  "🧠 الخلاصة الكبرى",
  "⭐ قاعدة IQ200",
  "🚨 أهم 5 أخطاء ممنوعة",
  "🗺️ خريطة المنهج بعد الدرس 17",
];

/** عدد أقسام المصدر المرقّمة (1–45) — يُستخدم في التحقق الآلي. */
export const SOURCE_NUMBERED_COUNT = 45;

// -------------------- مقدمة الغلاف (حرفية من المصدر) --------------------
export const COVER_PLAN_17 =
  "هلا منوصل للجزء الثاني من منظومة الملكية. بالدرس 16 تعلمنا أن my / your / his / her / its / our / their تأتي قبل الاسم. اليوم سنبني فوقها مباشرة ونتعلم متى نستطيع حذف الاسم واستخدام mine / yours / his / hers / ours / theirs وحدها.";

export const LESSON_TITLE_17 = "الدرس 17: Possessive Pronouns — ضمائر الملكية";
export const LAB_NAME_17 = "OWNERSHIP TRANSFORMATION LAB";
export const LAB_MOTTO_17 = "الدرس 16 علّمك: من يملك؟ — الدرس 17 يعلّمك: هل أستطيع حذف الاسم؟";

// -------------------- 🎯 أهداف الدرس --------------------
export const OBJECTIVES_17: { n: string; text: string; items?: string[]; itemsEn?: boolean }[] = [
  { n: "①", text: "فهم معنى Possessive Pronouns." },
  {
    n: "②",
    text: "معرفة الفرق بين:",
    items: ["my و mine", "your و yours", "her و hers", "our و ours", "their و theirs"],
  },
  { n: "③", text: "معرفة أن Possessive Pronoun لا يأتي بعده اسم." },
  { n: "④", text: "تحويل الجمل من Possessive Adjective إلى Possessive Pronoun." },
  { n: "⑤", text: "استخدام ضمائر الملكية في المحادثة." },
  {
    n: "⑥",
    text: "معرفة الفرق بين:",
    items: ["This is my book.", "This book is mine."],
    itemsEn: true,
  },
  { n: "⑦", text: "اكتشاف الأخطاء الشائعة." },
  { n: "⑧", text: "استخدام الملكية مع المفرد والجمع." },
];

// -------------------- 1. تذكير سريع من الدرس 16 --------------------
export const RECAP_17 = {
  learned: "تعلمنا:",
  lines: ["I → my", "You → your", "He → his", "She → her", "It → its", "We → our", "They → their"],
  ruleWas: "وكانت القاعدة:",
  rule: "Possessive Adjective + Noun",
  example: "مثلاً:",
  examples: ["my phone", "her bag", "his bicycle", "our house", "their classroom"],
};

// -------------------- 2. ما المشكلة التي سنحلها اليوم؟ --------------------
export const PROBLEM_17 = {
  imagine: "تخيل أن شخصاً سأل:",
  question: "Is this your backpack?",
  canAnswer: "يمكن أن تجيب:",
  longAnswer: "Yes, it is my backpack.",
  correctNote: "الجملة صحيحة.",
  butWeRepeat: "لكننا نكرر كلمة:",
  repeatedWord: "backpack",
  naturalWay: "وهناك طريقة أكثر طبيعية:",
  shortAnswer: "Yes, it is mine.",
  andHere: "وهنا تظهر:",
  revealed: "Possessive Pronouns",
};

// -------------------- 3. ما هو Possessive Pronoun؟ --------------------
export const DEFINITION_17 = {
  meaning: "Possessive Pronoun = ضمير ملكية.",
  replaces: "وهو يحل محل:",
  replaced: "Possessive Adjective + Noun",
  exampleLead: "مثلاً:",
  example: "my book",
  canReplace: "يمكن استبدالها بـ:",
  replacement: "mine",
  so: "إذن:",
  before: "This is my book.",
  becomes: "تصبح:",
  after: "This book is mine.",
  meaningAr: "المعنى:",
  meaningText: "هذا كتابي.",
};

// -------------------- 4. الخريطة الأساسية --------------------
export const CORE_MAP_17: { pronoun: string; adj: string; pron: string; note?: string }[] = [
  { pronoun: "I", adj: "my", pron: "mine" },
  { pronoun: "You", adj: "your", pron: "yours" },
  { pronoun: "He", adj: "his", pron: "his" },
  { pronoun: "She", adj: "her", pron: "hers" },
  {
    pronoun: "It",
    adj: "its",
    pron: "—",
    note: "لا نستخدم له عادةً ضمير ملكية مستقل في الإنجليزية الأساسية",
  },
  { pronoun: "We", adj: "our", pron: "ours" },
  { pronoun: "They", adj: "their", pron: "theirs" },
];

export const MUST_MEMORIZE_17 = {
  title: "أهم مجموعة للحفظ الآن:",
  lines: ["my → mine", "your → yours", "his → his", "her → hers", "our → ours", "their → theirs"],
};

// -------------------- 5. الفرق الأساسي + القاعدة الذهبية --------------------
export const BASIC_DIFFERENCE_17 = {
  adjective: {
    label: "Possessive Adjective",
    rule: "يأتي بعدها اسم:",
    examples: ["my book", "your car", "his phone", "her bag", "our house", "their school"],
  },
  pronoun: {
    label: "Possessive Pronoun",
    rule: "يأتي بدون اسم بعده:",
    examples: ["mine", "yours", "his", "hers", "ours", "theirs"],
  },
  golden: {
    title: "القاعدة الذهبية",
    withNoun: { rule: "إذا جاء الاسم بعدها:", use: "استخدم:", words: "my / your / his / her / our / their" },
    withoutNoun: {
      rule: "إذا لم يأت الاسم بعدها:",
      use: "استخدم:",
      words: "mine / yours / his / hers / ours / theirs",
    },
  },
};

// -------------------- 6. MY → MINE --------------------
export const MY_MINE_17 = {
  first: { en: "This is my notebook.", ar: "هذا دفتري." },
  canSay: "يمكننا أن نقول:",
  transformed: { en: "This notebook is mine.", ar: "هذا الدفتر لي / هذا دفتري." },
  notice: "لاحظ:",
  noticeAdj: "my notebook",
  but: "لكن:",
  noticePron: "mine",
  weDontSay: "لا نقول:",
  wrong: "This is mine notebook.",
  correctLabel: "الصحيح:",
  correct1: "This is my notebook.",
  correct2: "This notebook is mine.",
};

// -------------------- 7. YOUR → YOURS --------------------
export const YOUR_YOURS_17 = {
  pairs: [
    { before: "This is your jacket.", after: "This jacket is yours.", ar: "هذه سترتك." },
    { before: "This is your seat.", after: "This seat is yours." },
    { before: "That is your idea.", after: "That idea is yours." },
  ],
  becomes: "تصبح:",
};

// -------------------- 8. HIS → HIS --------------------
export const HIS_HIS_17 = {
  intro: "هنا لدينا حالة مميزة.",
  adjective: "Possessive Adjective:",
  adjectiveWord: "his",
  pronoun: "Possessive Pronoun:",
  pronounWord: "his",
  sameShape: "نفس الشكل.",
  example: "مثلاً:",
  pairs: [{ before: "This is his laptop.", after: "This laptop is his." }],
  sameWord: "نفس كلمة:",
  sameWordValue: "his",
  note: "لكن موقعها يخبرنا بوظيفتها.",
};

// -------------------- 9. HER → HERS --------------------
export const HER_HERS_17 = {
  pairs: [
    { before: "This is her camera.", after: "This camera is hers." },
    { before: "That is her bicycle.", after: "That bicycle is hers." },
    { before: "This is her notebook.", after: "This notebook is hers." },
  ],
  notice: "لاحظ:",
  noticeAdj: "her + noun",
  but: "لكن:",
  noticePron: "hers وحدها.",
};

// -------------------- 10. OUR → OURS --------------------
export const OUR_OURS_17 = {
  pairs: [
    { before: "This is our classroom.", after: "This classroom is ours." },
    { before: "This is our project.", after: "This project is ours." },
    { before: "That is our table.", after: "That table is ours." },
  ],
};

// -------------------- 11. THEIR → THEIRS --------------------
export const THEIR_THEIRS_17 = {
  pairs: [
    { before: "This is their house.", after: "This house is theirs." },
    { before: "These are their books.", after: "These books are theirs." },
    { before: "That is their car.", after: "That car is theirs." },
  ],
};

// -------------------- 12. لاحظ شيئاً مهماً جداً --------------------
export const NUMBER_NOTE_17 = {
  rule: "ضمير الملكية لا يتغير حسب عدد الأشياء.",
  example: "مثلاً:",
  mine: { singular: "This book is mine.", plural: "These books are mine.", same: "نفس:", value: "mine" },
  theirs: { singular: "This car is theirs.", plural: "These cars are theirs.", same: "نفس:", value: "theirs" },
  fire: "الملكية مرتبطة بالمالك، وليس بعدد الأشياء.",
};

// -------------------- 13. مقارنة كاملة --------------------
export const FULL_COMPARISON_17 = {
  head: ["صاحب الشيء", "قبل الاسم", "بدون الاسم"],
  rows: [
    { owner: "I", adj: "my", pron: "mine" },
    { owner: "You", adj: "your", pron: "yours" },
    { owner: "He", adj: "his", pron: "his" },
    { owner: "She", adj: "her", pron: "hers" },
    { owner: "We", adj: "our", pron: "ours" },
    { owner: "They", adj: "their", pron: "theirs" },
  ],
  example: "مثلاً:",
  examples: [
    "my book → mine",
    "your phone → yours",
    "his jacket → his",
    "her bag → hers",
    "our house → ours",
    "their car → theirs",
  ],
};

// -------------------- 14. خطأ مشهور جداً --------------------
export const FAMOUS_ERROR_17 = {
  dontSay: "لا تقل:",
  wrong: "This is mine book.",
  why: "لماذا؟",
  because: "لأن:",
  reasonWord: "mine",
  reason: "لا يأتي قبل اسم.",
  correctLabel: "الصحيح:",
  correct1: "This is my book.",
  correct2: "This book is mine.",
};

// -------------------- 15. خطأ آخر --------------------
export const ERROR_15_17 = {
  dontSay: "لا تقل:",
  wrong: "This is hers bag.",
  correctLabel: "الصحيح:",
  correct1: "This is her bag.",
  correct2: "This bag is hers.",
};

// -------------------- 16. خطأ آخر --------------------
export const ERROR_16_17 = {
  dontSay: "لا تقل:",
  wrong: "That is theirs house.",
  correctLabel: "الصحيح:",
  correct1: "That is their house.",
  correct2: "That house is theirs.",
};

// -------------------- 17. حركة التحويل السحرية --------------------
export const MAGIC_MOVE_17 = {
  steps: [
    { ar: "خذ:", en: "my + noun" },
    { ar: "واحذف الاسم:", en: "my book" },
    { ar: "ثم حوّل:", en: "my → mine" },
    { ar: "فتصبح:", en: "mine" },
  ],
  example: "مثال:",
  examples: [
    "my bicycle → mine",
    "your camera → yours",
    "her jacket → hers",
    "our classroom → ours",
    "their project → theirs",
  ],
};

// -------------------- 18. مثال IQ200 --------------------
export const IQ200_EXAMPLE_17 = {
  weHave: "لدينا:",
  start: "This is Sara's notebook.",
  fromLesson16: "نعرف من الدرس 16:",
  chainFrom16: "Sara → she → her",
  so: "إذن:",
  step2: "This is her notebook.",
  thenRemove: "ثم إذا حذفنا notebook:",
  step3: "This notebook is hers.",
  watchChain: "لاحظ السلسلة:",
  chain: ["Sara's notebook", "her notebook", "hers"],
  fire: "ثلاث طرق مختلفة للتعبير عن نفس الملكية.",
};

// -------------------- 19. ثلاثة أنظمة للملكية --------------------
export const THREE_SYSTEMS_17 = {
  weHaveNow: "لدينا الآن:",
  systems: [
    { n: "النظام الأول", kind: "اسم + 's", en: "Sara's book", ar: "كتاب سارة." },
    { n: "النظام الثاني", kind: "Possessive Adjective", en: "her book", ar: "كتابها." },
    { n: "النظام الثالث", kind: "Possessive Pronoun", en: "The book is hers.", ar: "الكتاب لها / الكتاب كتابها." },
  ],
};

// -------------------- 20. مثال كامل --------------------
export const FULL_EXAMPLE_17 = {
  intro: "هذا هاتف Omar.",
  canSay: "يمكن أن نقول:",
  ways: ["Omar's phone.", "His phone.", "The phone is his."],
  notice: "لاحظ:",
  notes: ["Omar's = ملكية باسم", "His = قبل الاسم", "His = بعد حذف الاسم"],
};

// -------------------- 21. متى نستخدم Possessive Pronouns كثيراً؟ --------------------
export const USAGE_17 = {
  when: "خصوصاً عندما يكون الشيء معروفاً من السياق.",
  example: "مثلاً:",
  dialogue: [
    { speaker: "A", en: "Whose phone is this?", ar: "لمن هذا الهاتف؟" },
    { speaker: "B", en: "It's mine.", ar: "إنه لي." },
    { speaker: "A", en: "Is this Sara's bag?" },
    { speaker: "B", en: "No, it's hers.", ar: "لا، إنها لها." },
    { speaker: "A", en: "Are these your books?" },
    { speaker: "B", en: "Yes, they're mine.", ar: "نعم، إنها لي." },
  ],
};

// -------------------- 22. السؤال المهم: Whose? --------------------
export const WHOSE_17 = {
  newWord: "كلمة جديدة مهمة:",
  word: "Whose = لِمَن؟",
  use: "نستخدمها للسؤال عن الملكية.",
  example: "مثلاً:",
  examples: [
    { en: "Whose book is this?", ar: "لمن هذا الكتاب؟" },
    { en: "Whose jacket is that?", ar: "لمن تلك السترة؟" },
    { en: "Whose phone is this?", ar: "لمن هذا الهاتف؟" },
  ],
};

// -------------------- 23. الإجابة على Whose --------------------
export const WHOSE_ANSWER_17 = {
  items: [
    { q: "Whose book is this?", withNoun: "It's my book.", pronoun: "It's mine." },
    { q: "Whose bag is this?", withNoun: "It's her bag.", pronoun: "It's hers." },
    { q: "Whose car is that?", withNoun: "It's their car.", pronoun: "It's theirs." },
  ],
  or: "أو:",
  canSay: "يمكن أن نقول:",
  fire: "هذا الاستخدام يجعل الفرق بين النوعين واضحاً جداً.",
};

// -------------------- 24. مثال حواري --------------------
export const DIALOGUE_24 = [
  { speaker: "A", en: "Whose notebook is this?" },
  { speaker: "B", en: "It's mine." },
  { speaker: "A", en: "Is that your backpack?" },
  { speaker: "B", en: "No, it's his." },
  { speaker: "A", en: "Whose jacket is this?" },
  { speaker: "B", en: "It's hers." },
  { speaker: "A", en: "Are these your books?" },
  { speaker: "B", en: "Yes, they're ours." },
];

// -------------------- 25–29. الأزواج: صفة ملكية ↔ ضمير ملكية --------------------
export interface PairBoard {
  adj: string;
  adjRule: string;
  adjExamples: string[];
  but: string;
  pron: string;
  pronRule: string;
  pronExamples: string[];
  memorize?: string[];
}

export const PAIR_MY_17: PairBoard = {
  adj: "MY",
  adjRule: "يحتاج اسماً بعده.",
  adjExamples: ["my book", "my phone", "my house"],
  but: "",
  pron: "MINE",
  pronRule: "لا يحتاج اسماً بعده.",
  pronExamples: ["The book is mine.", "The phone is mine.", "The house is mine."],
  memorize: ["MY + NOUN", "MINE = وحدها"],
};

export const PAIR_YOUR_17: PairBoard = {
  adj: "YOUR",
  adjRule: "YOUR + NOUN",
  adjExamples: ["your car", "your bag", "your idea"],
  but: "لكن:",
  pron: "YOURS",
  pronRule: "YOURS = وحدها",
  pronExamples: ["The car is yours.", "The bag is yours.", "The idea is yours."],
};

export const PAIR_HER_17: PairBoard = {
  adj: "HER",
  adjRule: "HER + NOUN",
  adjExamples: ["her book", "her room", "her bicycle"],
  but: "لكن:",
  pron: "HERS",
  pronRule: "HERS = وحدها",
  pronExamples: ["The book is hers.", "The room is hers.", "The bicycle is hers."],
};

export const PAIR_OUR_17: PairBoard = {
  adj: "OUR",
  adjRule: "OUR + NOUN",
  adjExamples: ["our team", "our house", "our project"],
  but: "لكن:",
  pron: "OURS",
  pronRule: "OURS = وحدها",
  pronExamples: ["The team is ours.", "The house is ours.", "The project is ours."],
};

export const PAIR_THEIR_17: PairBoard = {
  adj: "THEIR",
  adjRule: "THEIR + NOUN",
  adjExamples: ["their school", "their car", "their books"],
  but: "لكن:",
  pron: "THEIRS",
  pronRule: "THEIRS = وحدها",
  pronExamples: ["The school is theirs.", "The car is theirs.", "The books are theirs."],
};

export const MY_MINE_IMPORTANCE_17 = "هذا من أهم أجزاء الدرس.";
export const MEMORIZE_25 = "احفظ:";

// -------------------- 30. خطأ شديد الشيوع --------------------
export const CONFUSING_TRIO_17 = {
  watch: "انتبه إلى:",
  words: ["your", "you're", "yours"],
  threeDifferent: "ثلاث كلمات مختلفة.",
  rows: [
    { word: "your", meaning: "ملكية", example: "your book" },
    { word: "you're", meaning: "you are", example: "You're happy." },
    { word: "yours", meaning: "ضمير ملكية", example: "The book is yours." },
  ],
  sameIdea: "ونفس الفكرة:",
  trio: [
    { word: "their", meaning: "ملكية" },
    { word: "they're", meaning: "they are" },
    { word: "theirs", meaning: "ضمير ملكية" },
  ],
  example: "مثلاً:",
  examples: ["Their car is new.", "They're happy.", "The car is theirs."],
  fire: "لا تخلط بينها.",
};

// -------------------- 31. مقارنة ثلاثية مهمة --------------------
export const TRIPLE_COMPARE_17 = [
  { word: "their", en: "Their house is large.", ar: "منزلهم كبير." },
  { word: "they're", en: "They're at home.", ar: "هم في المنزل." },
  { word: "theirs", en: "The house is theirs.", ar: "المنزل لهم." },
];

// -------------------- 32. his حالة خاصة --------------------
export const HIS_SPECIAL_17 = {
  notice: "لاحظ:",
  sentences: ["His car is fast.", "The car is his."],
  sameWord: "الكلمة نفسها:",
  sameWordValue: "his",
  butRole: "لكن الوظيفة مختلفة.",
  inLabel: "في:",
  adj: { context: "His car", role: "هي Possessive Adjective." },
  pron: { context: "The car is his", role: "هي Possessive Pronoun." },
};

// -------------------- 33. ماذا عن IT؟ --------------------
export const ABOUT_IT_17 = {
  basic: "في المستوى الأساسي سنستخدم:",
  its: "its",
  beforeNoun: "قبل الاسم:",
  robot: { en: "The robot moved its arm.", ar: "الروبوت حرّك ذراعه." },
  but: "لكن لا نحتاج حالياً إلى حفظ صيغة منفصلة مثل:",
  formula: "its + noun → ???",
  because:
    "لأن الإنجليزية لا تستخدم عادةً ضمير ملكية مستقل شائع لـ it في نفس نمط mine/yours/hers.",
  prevent: "وهذا يمنع الطالب من اختراع كلمة غير صحيحة مثل:",
  invented: "its' ❌",
};

// -------------------- 34. الملكية مع الجمع --------------------
export const PLURAL_34 = {
  look: "انظر:",
  withNoun: ["This is my book.", "These are my books."],
  butRemove: "لكن إذا حذفنا الاسم:",
  withoutNoun: ["This book is mine.", "These books are mine."],
  notice: "لاحظ أن:",
  noticeWord: "mine",
  noticeEnd: "لم تتغير.",
  example: "مثال:",
  exampleBefore: "These are their bicycles.",
  exampleAfter: "These bicycles are theirs.",
  exampleNote: "theirs لا تتغير.",
};

// -------------------- 35. الملكية لا تعتمد على عدد الأشياء --------------------
export const NUMBER_INDEPENDENT_35 = [
  {
    singular: { have: "I have one book.", result: "The book is mine." },
    plural: { have: "I have five books.", result: "The books are mine." },
    same: "نفس:",
    value: "mine",
  },
  {
    singular: { have: "They have one car.", result: "The car is theirs." },
    plural: { have: "They have three cars.", result: "The cars are theirs." },
    same: "نفس:",
    value: "theirs",
  },
];

// ============================================================
// التمارين 36–45 — الأسئلة والخيارات ومفاتيح الحل محفوظة كما في المصدر
// ============================================================

// -------------------- 36. تمارين المستوى الأول --------------------
export interface ChooseItem17 {
  n: string;
  stem: string;
  options: string[];
  answer: number;
  solved: string;
}

export const LEVEL1_17: ChooseItem17[] = [
  { n: "①", stem: "This is my / mine book.", options: ["my", "mine"], answer: 0, solved: "This is my book." },
  { n: "②", stem: "This book is my / mine.", options: ["my", "mine"], answer: 1, solved: "This book is mine." },
  { n: "③", stem: "That is her / hers bag.", options: ["her", "hers"], answer: 0, solved: "That is her bag." },
  { n: "④", stem: "That bag is her / hers.", options: ["her", "hers"], answer: 1, solved: "That bag is hers." },
  { n: "⑤", stem: "This is their / theirs house.", options: ["their", "theirs"], answer: 0, solved: "This is their house." },
  { n: "⑥", stem: "This house is their / theirs.", options: ["their", "theirs"], answer: 1, solved: "This house is theirs." },
];

// -------------------- 37. المستوى الثاني — حوّل --------------------
export interface TransformItem17 {
  n: string;
  from: string;
  answer: string;
}

export const LEVEL2_17: TransformItem17[] = [
  { n: "①", from: "my phone", answer: "mine" },
  { n: "②", from: "your bag", answer: "yours" },
  { n: "③", from: "his car", answer: "his" },
  { n: "④", from: "her bicycle", answer: "hers" },
  { n: "⑤", from: "our classroom", answer: "ours" },
  { n: "⑥", from: "their project", answer: "theirs" },
];

export const LEVEL2_17_BANK = ["mine", "yours", "his", "hers", "ours", "theirs"];
export const LEVEL2_17_INSTRUCTION = "حوّل:";

// -------------------- 38. المستوى الثالث — أكمل --------------------
export const LEVEL3_17: ChooseItem17[] = [
  { n: "①", stem: "This is ______ book.", options: ["my", "mine"], answer: 0, solved: "This is my book." },
  { n: "②", stem: "This book is ______.", options: ["my", "mine"], answer: 1, solved: "This book is mine." },
  { n: "③", stem: "That is ______ jacket.", options: ["her", "hers"], answer: 0, solved: "That is her jacket." },
  { n: "④", stem: "That jacket is ______.", options: ["her", "hers"], answer: 1, solved: "That jacket is hers." },
  { n: "⑤", stem: "These are ______ books.", options: ["their", "theirs"], answer: 0, solved: "These are their books." },
  { n: "⑥", stem: "These books are ______.", options: ["their", "theirs"], answer: 1, solved: "These books are theirs." },
];
export const LEVEL3_17_INSTRUCTION = "أكمل:";

// -------------------- 39. المستوى الرابع — صحح الأخطاء --------------------
export interface ErrorFix17 {
  n: string;
  wrong: string;
  correct: string;
}

export const LEVEL4_17: ErrorFix17[] = [
  { n: "①", wrong: "This is mine backpack.", correct: "This is my backpack." },
  { n: "②", wrong: "The backpack is my.", correct: "The backpack is mine." },
  { n: "③", wrong: "This is hers notebook.", correct: "This is her notebook." },
  { n: "④", wrong: "The notebook is her.", correct: "The notebook is hers." },
  { n: "⑤", wrong: "This is theirs house.", correct: "This is their house." },
  { n: "⑥", wrong: "The house is their.", correct: "The house is theirs." },
];
export const LEVEL4_17_ANSWER_LABEL = "✅ الحل";

// -------------------- 40. المستوى الخامس — Whose? --------------------
export interface WhoseItem17 {
  n: string;
  q: string;
  clue: string;
  blank: string;
  answer: string;
}

export const LEVEL5_17: WhoseItem17[] = [
  { n: "①", q: "Whose phone is this?", clue: "It belongs to me.", blank: "It's ______.", answer: "mine" },
  { n: "②", q: "Whose bicycle is this?", clue: "It belongs to Omar.", blank: "It's ______.", answer: "his" },
  { n: "③", q: "Whose jacket is this?", clue: "It belongs to Sara.", blank: "It's ______.", answer: "hers" },
  { n: "④", q: "Whose house is this?", clue: "It belongs to us.", blank: "It's ______.", answer: "ours" },
  { n: "⑤", q: "Whose books are these?", clue: "They belong to the students.", blank: "They're ______.", answer: "theirs" },
];
export const LEVEL5_17_INSTRUCTION = "أجب باستخدام Possessive Pronoun.";
export const LEVEL5_17_BANK = ["mine", "his", "hers", "ours", "theirs"];

// -------------------- 41. المستوى السادس — التحويل --------------------
export interface SentenceTransform17 {
  n: string;
  from: string;
  to: string;
  answer: string;
}

export const LEVEL6_17: SentenceTransform17[] = [
  { n: "①", from: "This is my camera.", to: "This camera is ______.", answer: "mine" },
  { n: "②", from: "This is her notebook.", to: "This notebook is ______.", answer: "hers" },
  { n: "③", from: "This is our project.", to: "This project is ______.", answer: "ours" },
  { n: "④", from: "These are their bicycles.", to: "These bicycles are ______.", answer: "theirs" },
  { n: "⑤", from: "This is your seat.", to: "This seat is ______.", answer: "yours" },
];
export const LEVEL6_17_INSTRUCTION = "حوّل الجمل دون تغيير المعنى.";

// -------------------- 42. Grammar Detective --------------------
export const DETECTIVE_PASSAGE_17: string[] = [
  "Emma brought her camera to the competition. Liam brought his camera too. Their cameras were on the table. Emma looked at one camera and asked, \"Is this yours?\"",
  "Liam answered, \"No, mine is next to your bag.\"",
  "Emma picked up the other camera and said, \"Oh! This one is hers.\"",
];

export const DETECTIVE_READ_17 = "اقرأ:";
export const DETECTIVE_EXTRACT_17 = "ثم استخرج:";

export interface DetectiveTarget17 {
  n: string;
  word: string;
  followedByNoun: boolean;
  context: string;
  role: string;
}

export const DETECTIVE_TARGETS_17: DetectiveTarget17[] = [
  { n: "①", word: "her", followedByNoun: true, context: "her camera", role: "Possessive Adjective" },
  { n: "②", word: "his", followedByNoun: true, context: "his camera", role: "Possessive Adjective" },
  { n: "③", word: "their", followedByNoun: true, context: "Their cameras", role: "Possessive Adjective" },
  { n: "④", word: "yours", followedByNoun: false, context: "Is this yours?", role: "Possessive Pronoun" },
  { n: "⑤", word: "mine", followedByNoun: false, context: "mine is next to your bag", role: "Possessive Pronoun" },
  { n: "⑥", word: "hers", followedByNoun: false, context: "This one is hers.", role: "Possessive Pronoun" },
];

export const DETECTIVE_ASK_17 = "ولكل واحدة اسأل:";
export const DETECTIVE_QUESTIONS_17 = ["هل بعدها اسم؟", "أم أنها واقفة وحدها؟"];
export const DETECTIVE_SKILL_17 = "هذه هي المهارة الأساسية في الدرس.";

// -------------------- 43. IQ200 Challenge --------------------
export const IQ200_CHALLENGE_17 = {
  weHave: "لدينا:",
  sentence: "This is Alex's laptop.",
  task: "حوّلها إلى ثلاث طرق:",
  tasks: [
    { n: "①", ar: "باستخدام Possessive Adjective.", answer: "This is his laptop." },
    { n: "②", ar: "باستخدام Possessive Pronoun.", answer: "This laptop is his." },
    { n: "③", ar: "باستخدام سؤال Whose.", answer: "Whose laptop is this?" },
  ],
  answerLabel: "الإجابة:",
};

// -------------------- 44. IQ200 Challenge 2 --------------------
export const IQ200_CHALLENGE2_17 = {
  inFrontOfYou: "أمامك:",
  given: [
    "Sara has a red bicycle.",
    "Omar has a blue bicycle.",
    "Lina and Maya have two green bicycles.",
  ],
  step1: "اكتب جملة لكل واحد باستخدام:",
  step1Words: ["her", "his", "their"],
  step2: "ثم اكتب جملة أخرى باستخدام:",
  step2Words: ["hers", "his", "theirs"],
  exampleLabel: "مثلاً:",
  example: ["Sara's bicycle is red.", "Her bicycle is red.", "The bicycle is hers."],
  andSoOn: "وهكذا.",
  model: [
    { owner: "Sara", adj: "Her bicycle is red.", pron: "The bicycle is hers." },
    { owner: "Omar", adj: "His bicycle is blue.", pron: "The bicycle is his." },
    { owner: "Lina and Maya", adj: "Their bicycles are green.", pron: "The bicycles are theirs." },
  ],
};

// -------------------- 45. التحدي النهائي --------------------
export const FINAL_CHALLENGE_17 = {
  task: "اكتب حواراً من 10 أسطر بين طالبين.",
  mustUse: "يجب أن تستخدم فيه:",
  words: ["my", "mine", "your", "yours", "his", "her", "hers", "our", "ours", "their"],
  orLabel: "أو:",
  alt: "theirs",
  whoseRequirement: "ويجب أن يحتوي الحوار على سؤالين باستخدام:",
  whoseWord: "Whose...?",
  exampleLabel: "مثلاً:",
  example: "Whose notebook is this?",
  note: "لكن اصنع حواراً جديداً من عندك ولا تنسخ المثال.",
};

// ============================================================
// الخاتمة — الخلاصة الكبرى + قاعدة IQ200 + الأخطاء + الخريطة
// ============================================================

// -------------------- الخلاصة الكبرى --------------------
export const GRAND_SUMMARY_17 = {
  beforeNoun: {
    title: "قبل الاسم:",
    words: ["my", "your", "his", "her", "our", "their"],
    exampleLabel: "مثال:",
    examples: ["my book", "her phone", "their house"],
  },
  withoutNoun: {
    title: "بدون اسم بعدها:",
    words: ["mine", "yours", "his", "hers", "ours", "theirs"],
    exampleLabel: "مثال:",
    examples: ["The book is mine.", "The phone is hers.", "The house is theirs."],
  },
};

// -------------------- ⭐ قاعدة IQ200 --------------------
export const IQ200_RULE_17 = {
  memorize: "احفظها بهذه المعادلة:",
  formula: "Possessive Adjective + Noun",
  example: "my book",
  thenRemove: "ثم نحذف الاسم:",
  conversion: "my → mine",
  therefore: "إذن:",
  result: "my book → mine",
  sameThing: "نفس الشيء:",
  pairs: ["your bag → yours", "her phone → hers", "our house → ours", "their car → theirs"],
};

// -------------------- 🚨 أهم 5 أخطاء ممنوعة --------------------
export const FIVE_FORBIDDEN_17: { n: number; wrong: string; correct: string }[] = [
  { n: 1, wrong: "This is mine book.", correct: "This is my book." },
  { n: 2, wrong: "This book is my.", correct: "This book is mine." },
  { n: 3, wrong: "This is hers bag.", correct: "This is her bag." },
  { n: 4, wrong: "This is theirs car.", correct: "This is their car." },
  { n: 5, wrong: "They're house is big.", correct: "Their house is big." },
];

// -------------------- 🗺️ خريطة المنهج بعد الدرس 17 --------------------
export const ROADMAP_17: { n: number; en: string; ar: string; here?: boolean }[] = [
  { n: 1, en: "Sentence Structure", ar: "تكوين الجملة" },
  { n: 2, en: "Pronouns + Verb to be", ar: "الضمائر و Verb to be" },
  { n: 3, en: "Verb to be — النفي والأسئلة", ar: "النفي والأسئلة" },
  { n: 4, en: "Nouns + Articles", ar: "الأسماء وأدوات التعريف" },
  { n: 5, en: "Adjectives", ar: "الصفات" },
  { n: 6, en: "Present Simple — مثبت", ar: "المضارع البسيط — مثبت" },
  { n: 7, en: "Present Simple — نفي وأسئلة", ar: "النفي والأسئلة" },
  { n: 8, en: "Present Simple — مراجعة", ar: "مراجعة" },
  { n: 9, en: "Present Continuous", ar: "المضارع المستمر" },
  { n: 10, en: "Present Continuous — الاستخدام المتقدم", ar: "الاستخدام المتقدم" },
  { n: 11, en: "Present Simple vs Present Continuous", ar: "المقارنة" },
  { n: 12, en: "Past Simple — مثبت", ar: "الماضي البسيط — مثبت" },
  { n: 13, en: "Past Simple — did / didn't", ar: "did / didn't" },
  { n: 14, en: "Past Simple — Wh Questions", ar: "أسئلة Wh" },
  { n: 15, en: "Past Simple of Verb to be — was / were", ar: "was / were" },
  { n: 16, en: "Possessive Adjectives", ar: "صفات الملكية" },
  { n: 17, en: "Possessive Pronouns — نحن هنا", ar: "ضمائر الملكية", here: true },
];

export const ROADMAP_17_CLOSING =
  "وبهذا أصبحت **منظومة الملكية الأساسية كاملة**: my/your/his/her/our/their + mine/yours/his/hers/ours/theirs.\n\nوالخطوة التالية سنبدأ فيها بتقوية منظومة **الأسماء والجمع، بما فيها الجمع الشاذ Irregular Plurals**، ثم نربطها بالملكية وملكية الأسماء مثل:\n\nchild → children\nthe child → the child's\nthe children → the children's\n\nحتى يكون الطالب قادراً لاحقاً على التعامل مع الجمل المركبة بدون فجوات.";

// ============================================================
// مختبر التحويل — بيانات الأنظمة التفاعلية
// ============================================================

/** الآلة الرئيسية: Possessive Adjective + Noun → حذف الاسم → Possessive Pronoun */
export const TRANSFORM_LAB_17: { adj: string; noun: string; pron: string }[] = [
  { adj: "my", noun: "book", pron: "mine" },
  { adj: "your", noun: "bag", pron: "yours" },
  { adj: "his", noun: "jacket", pron: "his" },
  { adj: "her", noun: "phone", pron: "hers" },
  { adj: "our", noun: "house", pron: "ours" },
  { adj: "their", noun: "car", pron: "theirs" },
];

/** مختبر حذف الاسم — كل الأمثلة الواردة في المصدر */
export const NOUN_REMOVAL_SET_17: { adj: string; noun: string; pron: string }[] = [
  { adj: "my", noun: "notebook", pron: "mine" },
  { adj: "my", noun: "bicycle", pron: "mine" },
  { adj: "your", noun: "jacket", pron: "yours" },
  { adj: "your", noun: "seat", pron: "yours" },
  { adj: "your", noun: "idea", pron: "yours" },
  { adj: "your", noun: "camera", pron: "yours" },
  { adj: "his", noun: "laptop", pron: "his" },
  { adj: "his", noun: "jacket", pron: "his" },
  { adj: "her", noun: "camera", pron: "hers" },
  { adj: "her", noun: "bicycle", pron: "hers" },
  { adj: "her", noun: "notebook", pron: "hers" },
  { adj: "her", noun: "jacket", pron: "hers" },
  { adj: "our", noun: "classroom", pron: "ours" },
  { adj: "our", noun: "project", pron: "ours" },
  { adj: "our", noun: "table", pron: "ours" },
  { adj: "their", noun: "house", pron: "theirs" },
  { adj: "their", noun: "books", pron: "theirs" },
  { adj: "their", noun: "car", pron: "theirs" },
  { adj: "their", noun: "project", pron: "theirs" },
];

/** بطاقات قبل / بعد */
export const BEFORE_AFTER_17: { before: string; after: string }[] = [
  { before: "my book", after: "mine" },
  { before: "your car", after: "yours" },
  { before: "his jacket", after: "his" },
  { before: "her bag", after: "hers" },
  { before: "our house", after: "ours" },
  { before: "their school", after: "theirs" },
];
export const BEFORE_AFTER_BANK_17 = ["mine", "yours", "his", "hers", "ours", "theirs"];
export const BEFORE_AFTER_LEFT_LABEL = "Possessive Adjective + Noun";
export const BEFORE_AFTER_RIGHT_LABEL = "Possessive Pronoun";

/** إنذار MY مقابل MINE */
export const MY_MINE_ALARM_17: { sentence: string; ok: boolean; why: string }[] = [
  { sentence: "This is mine book.", ok: false, why: "mine لا يأتي قبل اسم — هذا خطأ مشهور جداً." },
  { sentence: "This is my book.", ok: true, why: "my + Noun ← قبل الاسم نستخدم my." },
  { sentence: "This book is mine.", ok: true, why: "mine وحدها ← بدون اسم بعدها." },
  { sentence: "This book is my.", ok: false, why: "my تحتاج اسماً بعدها — الصحيح: This book is mine." },
];

/** كاشف your / you're / yours و their / they're / theirs */
export interface DetectorSet17 {
  label: string;
  options: string[];
  sourceLines: string[];
  cases: { blank: string; answer: string; why: string }[];
}

export const DETECTOR_SETS_17: Record<"your" | "their", DetectorSet17> = {
  your: {
    label: "YOUR / YOU'RE / YOURS",
    options: ["your", "you're", "yours"],
    sourceLines: ["your book", "You're happy.", "The book is yours."],
    cases: [
      { blank: "This is ______ book.", answer: "your", why: "your = ملكية ← بعدها اسم." },
      { blank: "______ happy.", answer: "you're", why: "you're = you are ← ليست ملكية." },
      { blank: "The book is ______.", answer: "yours", why: "yours = ضمير ملكية ← وحدها بدون اسم." },
    ],
  },
  their: {
    label: "THEIR / THEY'RE / THEIRS",
    options: ["their", "they're", "theirs"],
    sourceLines: ["Their car is new.", "They're happy.", "The car is theirs."],
    cases: [
      { blank: "______ car is new.", answer: "their", why: "their = ملكية ← بعدها اسم." },
      { blank: "______ happy.", answer: "they're", why: "they're = they are ← ليست ملكية." },
      { blank: "The car is ______.", answer: "theirs", why: "theirs = ضمير ملكية ← وحدها بدون اسم." },
    ],
  },
};

/** آلة الدور المزدوج لـ his */
export const HIS_DOUBLE_ROLE_17 = [
  {
    sentence: "His car is fast.",
    chunk: "His car",
    role: "Possessive Adjective",
    nounAfter: true,
    why: "بعدها اسم (car) ← صفة ملكية.",
  },
  {
    sentence: "The car is his.",
    chunk: "his",
    role: "Possessive Pronoun",
    nounAfter: false,
    why: "واقفة وحدها بدون اسم بعدها ← ضمير ملكية.",
  },
];
export const HIS_DOUBLE_QUESTION_17 = "هل بعدها اسم؟";

/** تحقيق Whose? */
export const WHOSE_LAB_17: { q: string; answer: string; options: string[]; correct: number }[] = [
  { q: "Whose phone is this?", answer: "It's mine.", options: ["mine", "his", "hers", "theirs"], correct: 0 },
  { q: "Whose bag is this?", answer: "It's hers.", options: ["mine", "his", "hers", "theirs"], correct: 2 },
  { q: "Whose car is that?", answer: "It's theirs.", options: ["mine", "his", "hers", "theirs"], correct: 3 },
];

/** خريطة الأنظمة الثلاثة */
export const OWNERSHIP_MAP_17: { owner: string; chain: string[] }[] = [
  { owner: "Sara", chain: ["Sara's book", "her book", "the book is hers"] },
  { owner: "Omar", chain: ["Omar's phone", "his phone", "the phone is his"] },
];

/** فخ العدد — ضمير الملكية لا يتغير */
export const NUMBER_TRAP_17: { singular: string; plural: string; constant: string }[] = [
  { singular: "This book is mine.", plural: "These books are mine.", constant: "mine" },
  { singular: "This car is theirs.", plural: "These cars are theirs.", constant: "theirs" },
  { singular: "The book is mine.", plural: "The books are mine.", constant: "mine" },
  { singular: "The car is theirs.", plural: "The cars are theirs.", constant: "theirs" },
];

// ============================================================
// أنواع الكتل والشرائح
// ============================================================

export type Block17 =
  | { type: "text"; text: string }
  | { type: "english"; en: string; ar?: string; tone?: "neutral" | "good" | "bad" | "focus" | "warn" }
  | { type: "mixed"; text: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "formulaStrip"; items: string[] }
  | { type: "mixedStrip"; items: string[] }
  | { type: "arrowChain"; items: string[] }
  | { type: "recapBoard" }
  | { type: "coreMapBoard" }
  | { type: "mustMemorize" }
  | { type: "basicDifferenceBoard" }
  | { type: "transformMachine" }
  | { type: "nounRemovalLab" }
  | { type: "beforeAfterCards" }
  | { type: "magicMove" }
  | { type: "adjPronPairs"; pairs: { before: string; after: string; ar?: string }[] }
  | { type: "pairBoard"; board: PairBoard }
  | { type: "sentenceCompare"; a: string; b: string }
  | { type: "myMineAlarm" }
  | { type: "detector"; group: "your" | "their" }
  | { type: "hisDoubleRole" }
  | { type: "trioChips"; items: string[] }
  | { type: "trioTable"; rows: { word: string; meaning: string; example?: string }[] }
  | { type: "tripleCompare" }
  | { type: "comparisonTable" }
  | { type: "numberTrap" }
  | { type: "counterBoard" }
  | { type: "threeSystems" }
  | { type: "threeSystemMap" }
  | { type: "threeWayBoard" }
  | { type: "whoseLab" }
  | { type: "whoseAnswerBoard" }
  | { type: "dialogue"; lines: { speaker: string; en: string; ar?: string }[] }
  | { type: "itsBoard" };

export type Exercise17 =
  | { type: "level1" }
  | { type: "level2" }
  | { type: "level3" }
  | { type: "level4" }
  | { type: "level5" }
  | { type: "level6" }
  | { type: "detective" }
  | { type: "iq200" }
  | { type: "iq200b" }
  | { type: "finalChallenge" };

export type Slide17 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step: string; title: string; lead?: string; blocks: Block17[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise17 }
  | { kind: "summary"; title: string }
  | { kind: "iq200Rule"; title: string }
  | { kind: "fiveErrors"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const BRIDGE = "من الدرس 16 إلى 17";
const MAP = "الخريطة والفرق الأساسي";
const TRANSFORM = "آلة التحويل — كل ضمير";
const FIXED = "قواعد لا تتغير";
const SYSTEMS = "أنظمة الملكية الثلاثة";
const TALK = "الاستخدام والسؤال Whose";
const PAIRS = "الأزواج: صفة ↔ ضمير";
const TRAPS = "الفخاخ والأخطاء";
const COUNT = "الملكية والعدد";
const PRACTICE = "التمارين والتحديات";
const END = "الخاتمة";

export const SLIDES: Slide17[] = [
  { kind: "cover", section: START, mascot: "🔬" },
  { kind: "objectives", section: START, mascot: "🎯" },

  // 1 — تذكير سريع من الدرس 16
  {
    kind: "lesson",
    section: BRIDGE,
    mascot: "🧠",
    step: "1",
    title: "تذكير سريع من الدرس 16",
    lead: "تعلمنا:",
    blocks: [
      { type: "recapBoard" },
      { type: "text", text: "وكانت القاعدة:" },
      { type: "english", en: "Possessive Adjective + Noun", tone: "focus" },
      { type: "text", text: "مثلاً:" },
      { type: "formulaStrip", items: RECAP_17.examples },
    ],
  },

  // 2 — ما المشكلة التي سنحلها اليوم؟
  {
    kind: "lesson",
    section: BRIDGE,
    mascot: "🚀",
    step: "2",
    title: "ما المشكلة التي سنحلها اليوم؟",
    blocks: [
      { type: "text", text: "تخيل أن شخصاً سأل:" },
      { type: "english", en: "Is this your backpack?", tone: "focus" },
      { type: "text", text: "يمكن أن تجيب:" },
      { type: "english", en: "Yes, it is my backpack." },
      { type: "text", text: "الجملة صحيحة." },
      { type: "text", text: "لكننا نكرر كلمة:" },
      { type: "english", en: "backpack", tone: "warn" },
      { type: "text", text: "وهناك طريقة أكثر طبيعية:" },
      { type: "english", en: "Yes, it is mine.", tone: "good" },
      { type: "text", text: "وهنا تظهر:" },
      { type: "note", emoji: "⭐", text: "Possessive Pronouns" },
    ],
  },

  // 3 — ما هو Possessive Pronoun؟
  {
    kind: "lesson",
    section: BRIDGE,
    mascot: "⭐",
    step: "3",
    title: "ما هو Possessive Pronoun؟",
    lead: "Possessive Pronoun = ضمير ملكية.",
    blocks: [
      { type: "mixed", text: "Possessive Pronoun = ضمير ملكية." },
      { type: "text", text: "وهو يحل محل:" },
      { type: "english", en: "Possessive Adjective + Noun", tone: "focus" },
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "my book" },
      { type: "text", text: "يمكن استبدالها بـ:" },
      { type: "english", en: "mine", tone: "good" },
      { type: "text", text: "إذن:" },
      { type: "english", en: "This is my book." },
      { type: "text", text: "تصبح:" },
      { type: "english", en: "This book is mine.", tone: "good" },
      { type: "text", text: "المعنى: هذا كتابي." },
      { type: "sentenceCompare", a: "This is my book.", b: "This book is mine." },
    ],
  },

  // 4 — الخريطة الأساسية
  {
    kind: "lesson",
    section: MAP,
    mascot: "🟦",
    step: "4",
    title: "الخريطة الأساسية",
    lead: "لدينا:",
    blocks: [{ type: "coreMapBoard" }, { type: "mustMemorize" }],
  },

  // 5 — الفرق الأساسي
  {
    kind: "lesson",
    section: MAP,
    mascot: "🧠",
    step: "5",
    title: "الفرق الأساسي",
    blocks: [{ type: "basicDifferenceBoard" }],
  },

  // 6 — MY → MINE
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "🟢",
    step: "6",
    title: "MY → MINE",
    lead: "لدينا:",
    blocks: [
      { type: "english", en: MY_MINE_17.first.en, ar: MY_MINE_17.first.ar },
      { type: "text", text: "يمكننا أن نقول:" },
      { type: "english", en: MY_MINE_17.transformed.en, ar: MY_MINE_17.transformed.ar, tone: "good" },
      { type: "text", text: "لاحظ:" },
      { type: "english", en: MY_MINE_17.noticeAdj },
      { type: "text", text: "لكن:" },
      { type: "english", en: MY_MINE_17.noticePron, tone: "focus" },
      { type: "text", text: "لا نقول:" },
      { type: "english", en: "This is mine notebook. ❌", tone: "bad" },
      { type: "text", text: "الصحيح:" },
      { type: "english", en: "This is my notebook. ✅", tone: "good" },
      { type: "text", text: "أو:" },
      { type: "english", en: "This notebook is mine. ✅", tone: "good" },
      { type: "myMineAlarm" },
    ],
  },

  // 7 — YOUR → YOURS
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "🔵",
    step: "7",
    title: "YOUR → YOURS",
    blocks: [{ type: "adjPronPairs", pairs: YOUR_YOURS_17.pairs }],
  },

  // 8 — HIS → HIS
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "🟣",
    step: "8",
    title: "HIS → HIS",
    lead: "هنا لدينا حالة مميزة.",
    blocks: [
      { type: "mixed", text: "Possessive Adjective: his" },
      { type: "mixed", text: "Possessive Pronoun: his" },
      { type: "text", text: "نفس الشكل." },
      { type: "text", text: "مثلاً:" },
      { type: "adjPronPairs", pairs: HIS_HIS_17.pairs },
      { type: "text", text: "نفس كلمة:" },
      { type: "english", en: "his", tone: "focus" },
      { type: "text", text: "لكن موقعها يخبرنا بوظيفتها." },
      { type: "hisDoubleRole" },
    ],
  },

  // 9 — HER → HERS
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "🟡",
    step: "9",
    title: "HER → HERS",
    blocks: [
      { type: "adjPronPairs", pairs: HER_HERS_17.pairs },
      { type: "text", text: "لاحظ:" },
      { type: "english", en: "her + noun" },
      { type: "text", text: "لكن:" },
      { type: "mixed", text: "hers وحدها." },
    ],
  },

  // 10 — OUR → OURS
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "🟠",
    step: "10",
    title: "OUR → OURS",
    blocks: [{ type: "adjPronPairs", pairs: OUR_OURS_17.pairs }],
  },

  // 11 — THEIR → THEIRS
  {
    kind: "lesson",
    section: TRANSFORM,
    mascot: "🔴",
    step: "11",
    title: "THEIR → THEIRS",
    blocks: [{ type: "adjPronPairs", pairs: THEIR_THEIRS_17.pairs }],
  },

  // 12 — لاحظ شيئاً مهماً جداً
  {
    kind: "lesson",
    section: FIXED,
    mascot: "⭐",
    step: "12",
    title: "لاحظ شيئاً مهماً جداً",
    lead: "ضمير الملكية لا يتغير حسب عدد الأشياء.",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "This book is mine." },
      { type: "english", en: "These books are mine." },
      { type: "text", text: "نفس:" },
      { type: "english", en: "mine", tone: "focus" },
      { type: "english", en: "This car is theirs." },
      { type: "english", en: "These cars are theirs." },
      { type: "text", text: "نفس:" },
      { type: "english", en: "theirs", tone: "focus" },
      { type: "note", emoji: "🔥", text: "الملكية مرتبطة بالمالك، وليس بعدد الأشياء." },
      { type: "numberTrap" },
    ],
  },

  // 13 — مقارنة كاملة
  {
    kind: "lesson",
    section: FIXED,
    mascot: "🧠",
    step: "13",
    title: "مقارنة كاملة",
    blocks: [
      { type: "comparisonTable" },
      { type: "text", text: "مثلاً:" },
      { type: "formulaStrip", items: FULL_COMPARISON_17.examples },
      { type: "beforeAfterCards" },
    ],
  },

  // 14 — خطأ مشهور جداً
  {
    kind: "lesson",
    section: FIXED,
    mascot: "🚨",
    step: "14",
    title: "خطأ مشهور جداً",
    lead: "لا تقل:",
    blocks: [
      { type: "english", en: "This is mine book. ❌", tone: "bad" },
      { type: "text", text: "لماذا؟" },
      { type: "mixed", text: "لأن: mine لا يأتي قبل اسم." },
      { type: "text", text: "الصحيح:" },
      { type: "english", en: "This is my book. ✅", tone: "good" },
      { type: "text", text: "أو:" },
      { type: "english", en: "This book is mine. ✅", tone: "good" },
    ],
  },

  // 15 — خطأ آخر
  {
    kind: "lesson",
    section: FIXED,
    mascot: "🚨",
    step: "15",
    title: "خطأ آخر",
    lead: "لا تقل:",
    blocks: [
      { type: "english", en: "This is hers bag. ❌", tone: "bad" },
      { type: "text", text: "الصحيح:" },
      { type: "english", en: "This is her bag. ✅", tone: "good" },
      { type: "text", text: "أو:" },
      { type: "english", en: "This bag is hers. ✅", tone: "good" },
    ],
  },

  // 16 — خطأ آخر
  {
    kind: "lesson",
    section: FIXED,
    mascot: "🚨",
    step: "16",
    title: "خطأ آخر",
    lead: "لا تقل:",
    blocks: [
      { type: "english", en: "That is theirs house. ❌", tone: "bad" },
      { type: "text", text: "الصحيح:" },
      { type: "english", en: "That is their house. ✅", tone: "good" },
      { type: "text", text: "أو:" },
      { type: "english", en: "That house is theirs. ✅", tone: "good" },
    ],
  },

  // 17 — حركة التحويل السحرية
  {
    kind: "lesson",
    section: FIXED,
    mascot: "🧠",
    step: "17",
    title: "حركة التحويل السحرية",
    blocks: [
      { type: "magicMove" },
      { type: "text", text: "مثال:" },
      { type: "formulaStrip", items: MAGIC_MOVE_17.examples },
      { type: "transformMachine" },
      { type: "nounRemovalLab" },
    ],
  },

  // 18 — مثال IQ200
  {
    kind: "lesson",
    section: SYSTEMS,
    mascot: "🔥",
    step: "18",
    title: "مثال IQ200",
    lead: "لدينا:",
    blocks: [
      { type: "english", en: "This is Sara's notebook.", tone: "focus" },
      { type: "text", text: "نعرف من الدرس 16:" },
      { type: "english", en: "Sara → she → her" },
      { type: "text", text: "إذن:" },
      { type: "english", en: "This is her notebook." },
      { type: "text", text: "ثم إذا حذفنا notebook:" },
      { type: "english", en: "This notebook is hers.", tone: "good" },
      { type: "text", text: "لاحظ السلسلة:" },
      { type: "arrowChain", items: IQ200_EXAMPLE_17.chain },
      { type: "note", emoji: "🔥", text: "ثلاث طرق مختلفة للتعبير عن نفس الملكية." },
    ],
  },

  // 19 — ثلاثة أنظمة للملكية
  {
    kind: "lesson",
    section: SYSTEMS,
    mascot: "🧠",
    step: "19",
    title: "ثلاثة أنظمة للملكية",
    lead: "لدينا الآن:",
    blocks: [{ type: "threeSystems" }, { type: "threeSystemMap" }],
  },

  // 20 — مثال كامل
  {
    kind: "lesson",
    section: SYSTEMS,
    mascot: "🟦",
    step: "20",
    title: "مثال كامل",
    lead: "هذا هاتف Omar.",
    blocks: [
      { type: "text", text: "يمكن أن نقول:" },
      { type: "english", en: "Omar's phone." },
      { type: "english", en: "His phone." },
      { type: "english", en: "The phone is his." },
      { type: "text", text: "لاحظ:" },
      { type: "threeWayBoard" },
    ],
  },

  // 21 — متى نستخدم Possessive Pronouns كثيراً؟
  {
    kind: "lesson",
    section: TALK,
    mascot: "🧠",
    step: "21",
    title: "متى نستخدم Possessive Pronouns كثيراً؟",
    lead: "خصوصاً عندما يكون الشيء معروفاً من السياق.",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "dialogue", lines: USAGE_17.dialogue },
    ],
  },

  // 22 — السؤال المهم: Whose?
  {
    kind: "lesson",
    section: TALK,
    mascot: "⭐",
    step: "22",
    title: "السؤال المهم: Whose?",
    lead: "كلمة جديدة مهمة:",
    blocks: [
      { type: "english", en: "Whose = لِمَن؟", tone: "focus" },
      { type: "text", text: "نستخدمها للسؤال عن الملكية." },
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "Whose book is this?", ar: "لمن هذا الكتاب؟" },
      { type: "english", en: "Whose jacket is that?", ar: "لمن تلك السترة؟" },
      { type: "english", en: "Whose phone is this?", ar: "لمن هذا الهاتف؟" },
      { type: "whoseLab" },
    ],
  },

  // 23 — الإجابة على Whose
  {
    kind: "lesson",
    section: TALK,
    mascot: "🧠",
    step: "23",
    title: "الإجابة على Whose",
    lead: "يمكن أن نقول:",
    blocks: [
      { type: "whoseAnswerBoard" },
      { type: "note", emoji: "🔥", text: WHOSE_ANSWER_17.fire },
    ],
  },

  // 24 — مثال حواري
  {
    kind: "lesson",
    section: TALK,
    mascot: "🟢",
    step: "24",
    title: "مثال حواري",
    blocks: [{ type: "dialogue", lines: DIALOGUE_24 }],
  },

  // 25 — الفرق بين MY و MINE
  {
    kind: "lesson",
    section: PAIRS,
    mascot: "🧠",
    step: "25",
    title: "الفرق بين MY و MINE",
    lead: "هذا من أهم أجزاء الدرس.",
    blocks: [
      { type: "pairBoard", board: PAIR_MY_17 },
      { type: "text", text: "احفظ:" },
      { type: "mixedStrip", items: ["MY + NOUN", "MINE = وحدها"] },
      { type: "sentenceCompare", a: "This is my book.", b: "This book is mine." },
    ],
  },

  // 26 — YOUR و YOURS
  {
    kind: "lesson",
    section: PAIRS,
    mascot: "🔵",
    step: "26",
    title: "YOUR و YOURS",
    blocks: [{ type: "pairBoard", board: PAIR_YOUR_17 }],
  },

  // 27 — HER و HERS
  {
    kind: "lesson",
    section: PAIRS,
    mascot: "🟣",
    step: "27",
    title: "HER و HERS",
    blocks: [{ type: "pairBoard", board: PAIR_HER_17 }],
  },

  // 28 — OUR و OURS
  {
    kind: "lesson",
    section: PAIRS,
    mascot: "🟠",
    step: "28",
    title: "OUR و OURS",
    blocks: [{ type: "pairBoard", board: PAIR_OUR_17 }],
  },

  // 29 — THEIR و THEIRS
  {
    kind: "lesson",
    section: PAIRS,
    mascot: "🔴",
    step: "29",
    title: "THEIR و THEIRS",
    blocks: [{ type: "pairBoard", board: PAIR_THEIR_17 }],
  },

  // 30 — خطأ شديد الشيوع
  {
    kind: "lesson",
    section: TRAPS,
    mascot: "🚨",
    step: "30",
    title: "خطأ شديد الشيوع",
    lead: "انتبه إلى:",
    blocks: [
      { type: "trioChips", items: CONFUSING_TRIO_17.words },
      { type: "text", text: "ثلاث كلمات مختلفة." },
      { type: "trioTable", rows: CONFUSING_TRIO_17.rows },
      { type: "text", text: "ونفس الفكرة:" },
      { type: "trioTable", rows: CONFUSING_TRIO_17.trio },
      { type: "text", text: "مثلاً:" },
      { type: "english", en: "Their car is new." },
      { type: "english", en: "They're happy." },
      { type: "english", en: "The car is theirs." },
      { type: "note", emoji: "🔥", text: "لا تخلط بينها." },
      { type: "detector", group: "your" },
      { type: "detector", group: "their" },
    ],
  },

  // 31 — مقارنة ثلاثية مهمة
  {
    kind: "lesson",
    section: TRAPS,
    mascot: "🧠",
    step: "31",
    title: "مقارنة ثلاثية مهمة",
    blocks: [{ type: "tripleCompare" }],
  },

  // 32 — his حالة خاصة
  {
    kind: "lesson",
    section: TRAPS,
    mascot: "🧠",
    step: "32",
    title: "his حالة خاصة",
    lead: "لاحظ:",
    blocks: [
      { type: "english", en: "His car is fast." },
      { type: "english", en: "The car is his." },
      { type: "mixed", text: "الكلمة نفسها: his لكن الوظيفة مختلفة." },
      { type: "mixed", text: "في: His car هي Possessive Adjective." },
      { type: "mixed", text: "في: The car is his هي Possessive Pronoun." },
      { type: "hisDoubleRole" },
    ],
  },

  // 33 — ماذا عن IT؟
  {
    kind: "lesson",
    section: TRAPS,
    mascot: "🟡",
    step: "33",
    title: "ماذا عن IT؟",
    lead: "في المستوى الأساسي سنستخدم:",
    blocks: [
      { type: "english", en: "its", tone: "focus" },
      { type: "text", text: "قبل الاسم:" },
      { type: "english", en: "The robot moved its arm.", ar: "الروبوت حرّك ذراعه." },
      { type: "text", text: "لكن لا نحتاج حالياً إلى حفظ صيغة منفصلة مثل:" },
      { type: "english", en: "its + noun → ???" },
      { type: "mixed", text: ABOUT_IT_17.because },
      { type: "text", text: "وهذا يمنع الطالب من اختراع كلمة غير صحيحة مثل:" },
      { type: "english", en: "its' ❌", tone: "bad" },
      { type: "itsBoard" },
    ],
  },

  // 34 — الملكية مع الجمع
  {
    kind: "lesson",
    section: COUNT,
    mascot: "🧩",
    step: "34",
    title: "الملكية مع الجمع",
    lead: "انظر:",
    blocks: [
      { type: "english", en: "This is my book." },
      { type: "english", en: "These are my books." },
      { type: "text", text: "لكن إذا حذفنا الاسم:" },
      { type: "english", en: "This book is mine.", tone: "good" },
      { type: "english", en: "These books are mine.", tone: "good" },
      { type: "mixed", text: "لاحظ أن: mine لم تتغير." },
      { type: "text", text: "مثال:" },
      { type: "english", en: "These are their bicycles." },
      { type: "english", en: "These bicycles are theirs.", tone: "good" },
      { type: "mixed", text: "theirs لا تتغير." },
      { type: "numberTrap" },
    ],
  },

  // 35 — الملكية لا تعتمد على عدد الأشياء
  {
    kind: "lesson",
    section: COUNT,
    mascot: "⭐",
    step: "35",
    title: "الملكية لا تعتمد على عدد الأشياء",
    blocks: [
      { type: "english", en: "I have one book." },
      { type: "english", en: "The book is mine.", tone: "good" },
      { type: "english", en: "I have five books." },
      { type: "english", en: "The books are mine.", tone: "good" },
      { type: "text", text: "نفس:" },
      { type: "english", en: "mine", tone: "focus" },
      { type: "english", en: "They have one car." },
      { type: "english", en: "The car is theirs.", tone: "good" },
      { type: "english", en: "They have three cars." },
      { type: "english", en: "The cars are theirs.", tone: "good" },
      { type: "text", text: "نفس:" },
      { type: "english", en: "theirs", tone: "focus" },
      { type: "counterBoard" },
    ],
  },

  // 36 — تمارين المستوى الأول
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "36",
    title: "تمارين المستوى الأول",
    subtitle: "اختر الصحيح:",
    ex: { type: "level1" },
  },

  // 37 — المستوى الثاني
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "37",
    title: "المستوى الثاني",
    subtitle: "حوّل:",
    ex: { type: "level2" },
  },

  // 38 — المستوى الثالث
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "38",
    title: "المستوى الثالث",
    subtitle: "أكمل:",
    ex: { type: "level3" },
  },

  // 39 — المستوى الرابع — صحح الأخطاء
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "✏️",
    badge: "39",
    title: "المستوى الرابع — صحح الأخطاء",
    subtitle: "صحّح كل جملة، ثم اكشف الحل:",
    ex: { type: "level4" },
  },

  // 40 — المستوى الخامس — Whose?
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🧠",
    badge: "40",
    title: "المستوى الخامس — Whose?",
    subtitle: "أجب باستخدام Possessive Pronoun.",
    ex: { type: "level5" },
  },

  // 41 — المستوى السادس — التحويل
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    badge: "41",
    title: "المستوى السادس — التحويل",
    subtitle: "حوّل الجمل دون تغيير المعنى.",
    ex: { type: "level6" },
  },

  // 42 — Grammar Detective
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🕵️",
    badge: "42",
    title: "Grammar Detective",
    subtitle: "اقرأ ثم استخرج: her · his · their · yours · mine · hers",
    ex: { type: "detective" },
  },

  // 43 — IQ200 Challenge
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🚀",
    badge: "43",
    title: "IQ200 Challenge",
    subtitle: "حوّلها إلى ثلاث طرق:",
    ex: { type: "iq200" },
  },

  // 44 — IQ200 Challenge 2
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🔥",
    badge: "44",
    title: "IQ200 Challenge 2",
    subtitle: "اكتب جملة لكل شخص بصفتين: صفة ملكية ثم ضمير ملكية.",
    ex: { type: "iq200b" },
  },

  // 45 — التحدي النهائي
  {
    kind: "ex",
    section: PRACTICE,
    mascot: "🏆",
    badge: "45",
    title: "التحدي النهائي",
    subtitle: "اكتب حواراً من 10 أسطر بين طالبين.",
    ex: { type: "finalChallenge" },
  },

  { kind: "summary", section: END, mascot: "🧠", title: "الخلاصة الكبرى" },
  { kind: "iq200Rule", section: END, mascot: "⭐", title: "قاعدة IQ200" },
  { kind: "fiveErrors", section: END, mascot: "🚨", title: "أهم 5 أخطاء ممنوعة" },
  { kind: "roadmap", section: END, mascot: "🗺️", title: "خريطة المنهج بعد الدرس 17" },
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي — الدرس 17" },
  { kind: "closing", section: END, mascot: "🔬", title: "أحسنت!" },
];

// ============================================================
// SOURCE_FIDELITY_MARKERS_17 — فهرس كامل لكل عنصر في المصدر
// يُستخدم للتحقق الآلي من أن أي قسم/مثال/تمرين/مفتاح حل لم يُحذف.
// ============================================================
export const SOURCE_FIDELITY_MARKERS_17: string[] = [
  ...SOURCE_SECTIONS,
  COVER_PLAN_17,
  LESSON_TITLE_17,
  ...OBJECTIVES_17.flatMap((o) => [o.text, ...(o.items ?? [])]),
  ...RECAP_17.lines,
  RECAP_17.rule,
  ...RECAP_17.examples,
  PROBLEM_17.question,
  PROBLEM_17.longAnswer,
  PROBLEM_17.shortAnswer,
  PROBLEM_17.repeatedWord,
  DEFINITION_17.meaning,
  DEFINITION_17.replaced,
  DEFINITION_17.example,
  DEFINITION_17.replacement,
  DEFINITION_17.before,
  DEFINITION_17.after,
  ...CORE_MAP_17.flatMap((r) => [r.pronoun, r.adj, r.pron, ...(r.note ? [r.note] : [])]),
  ...MUST_MEMORIZE_17.lines,
  ...BASIC_DIFFERENCE_17.adjective.examples,
  ...BASIC_DIFFERENCE_17.pronoun.examples,
  BASIC_DIFFERENCE_17.golden.withNoun.words,
  BASIC_DIFFERENCE_17.golden.withoutNoun.words,
  MY_MINE_17.first.en,
  MY_MINE_17.transformed.en,
  MY_MINE_17.wrong,
  MY_MINE_17.correct1,
  MY_MINE_17.correct2,
  ...YOUR_YOURS_17.pairs.flatMap((p) => [p.before, p.after]),
  HIS_HIS_17.adjectiveWord,
  HIS_HIS_17.pronounWord,
  ...HIS_HIS_17.pairs.flatMap((p) => [p.before, p.after]),
  ...HER_HERS_17.pairs.flatMap((p) => [p.before, p.after]),
  ...OUR_OURS_17.pairs.flatMap((p) => [p.before, p.after]),
  ...THEIR_THEIRS_17.pairs.flatMap((p) => [p.before, p.after]),
  NUMBER_NOTE_17.rule,
  NUMBER_NOTE_17.mine.singular,
  NUMBER_NOTE_17.mine.plural,
  NUMBER_NOTE_17.theirs.singular,
  NUMBER_NOTE_17.theirs.plural,
  NUMBER_NOTE_17.fire,
  ...FULL_COMPARISON_17.head,
  ...FULL_COMPARISON_17.rows.flatMap((r) => [r.owner, r.adj, r.pron]),
  ...FULL_COMPARISON_17.examples,
  FAMOUS_ERROR_17.wrong,
  FAMOUS_ERROR_17.correct1,
  FAMOUS_ERROR_17.correct2,
  ERROR_15_17.wrong,
  ERROR_15_17.correct1,
  ERROR_15_17.correct2,
  ERROR_16_17.wrong,
  ERROR_16_17.correct1,
  ERROR_16_17.correct2,
  ...MAGIC_MOVE_17.steps.flatMap((s) => s.en),
  ...MAGIC_MOVE_17.examples,
  IQ200_EXAMPLE_17.start,
  IQ200_EXAMPLE_17.chainFrom16,
  IQ200_EXAMPLE_17.step2,
  IQ200_EXAMPLE_17.step3,
  ...IQ200_EXAMPLE_17.chain,
  IQ200_EXAMPLE_17.fire,
  ...THREE_SYSTEMS_17.systems.flatMap((s) => [s.n, s.kind, s.en, s.ar]),
  FULL_EXAMPLE_17.intro,
  ...FULL_EXAMPLE_17.ways,
  ...FULL_EXAMPLE_17.notes,
  USAGE_17.when,
  ...USAGE_17.dialogue.flatMap((l) => [l.en, ...(l.ar ? [l.ar] : [])]),
  WHOSE_17.word,
  WHOSE_17.use,
  ...WHOSE_17.examples.flatMap((e) => [e.en, e.ar]),
  ...WHOSE_ANSWER_17.items.flatMap((i) => [i.q, i.withNoun, i.pronoun]),
  WHOSE_ANSWER_17.fire,
  ...DIALOGUE_24.map((l) => l.en),
  PAIR_MY_17.adjRule,
  PAIR_MY_17.pronRule,
  ...PAIR_MY_17.adjExamples,
  ...PAIR_MY_17.pronExamples,
  ...PAIR_MY_17.memorize!,
  ...PAIR_YOUR_17.adjExamples,
  ...PAIR_YOUR_17.pronExamples,
  ...PAIR_HER_17.adjExamples,
  ...PAIR_HER_17.pronExamples,
  ...PAIR_OUR_17.adjExamples,
  ...PAIR_OUR_17.pronExamples,
  ...PAIR_THEIR_17.adjExamples,
  ...PAIR_THEIR_17.pronExamples,
  ...CONFUSING_TRIO_17.words,
  ...CONFUSING_TRIO_17.rows.flatMap((r) => [r.word, r.meaning, r.example]),
  ...CONFUSING_TRIO_17.trio.flatMap((r) => [r.word, r.meaning]),
  ...CONFUSING_TRIO_17.examples,
  CONFUSING_TRIO_17.fire,
  ...TRIPLE_COMPARE_17.flatMap((t) => [t.word, t.en, t.ar]),
  ...HIS_SPECIAL_17.sentences,
  HIS_SPECIAL_17.sameWordValue,
  HIS_SPECIAL_17.adj.context,
  HIS_SPECIAL_17.adj.role,
  HIS_SPECIAL_17.pron.context,
  HIS_SPECIAL_17.pron.role,
  ABOUT_IT_17.its,
  ABOUT_IT_17.robot.en,
  ABOUT_IT_17.robot.ar,
  ABOUT_IT_17.formula,
  ABOUT_IT_17.because,
  ABOUT_IT_17.invented,
  ...PLURAL_34.withNoun,
  ...PLURAL_34.withoutNoun,
  PLURAL_34.noticeWord,
  PLURAL_34.exampleBefore,
  PLURAL_34.exampleAfter,
  PLURAL_34.exampleNote,
  ...NUMBER_INDEPENDENT_35.flatMap((x) => [
    x.singular.have,
    x.singular.result,
    x.plural.have,
    x.plural.result,
    x.value,
  ]),
  ...LEVEL1_17.flatMap((x) => [x.stem, ...x.options, x.solved]),
  ...LEVEL2_17.flatMap((x) => [x.from, x.answer]),
  ...LEVEL2_17_BANK,
  ...LEVEL3_17.flatMap((x) => [x.stem, ...x.options, x.solved]),
  ...LEVEL4_17.flatMap((x) => [x.wrong, x.correct]),
  ...LEVEL5_17.flatMap((x) => [x.q, x.clue, x.blank, x.answer]),
  ...LEVEL6_17.flatMap((x) => [x.from, x.to, x.answer]),
  ...DETECTIVE_PASSAGE_17,
  ...DETECTIVE_TARGETS_17.flatMap((t) => [t.word, t.context, t.role]),
  ...DETECTIVE_QUESTIONS_17,
  DETECTIVE_SKILL_17,
  IQ200_CHALLENGE_17.sentence,
  ...IQ200_CHALLENGE_17.tasks.flatMap((t) => [t.ar, t.answer]),
  ...IQ200_CHALLENGE2_17.given,
  ...IQ200_CHALLENGE2_17.step1Words,
  ...IQ200_CHALLENGE2_17.step2Words,
  ...IQ200_CHALLENGE2_17.example,
  ...IQ200_CHALLENGE2_17.model.flatMap((m) => [m.owner, m.adj, m.pron]),
  FINAL_CHALLENGE_17.task,
  ...FINAL_CHALLENGE_17.words,
  FINAL_CHALLENGE_17.alt,
  FINAL_CHALLENGE_17.whoseWord,
  FINAL_CHALLENGE_17.example,
  FINAL_CHALLENGE_17.note,
  ...GRAND_SUMMARY_17.beforeNoun.words,
  ...GRAND_SUMMARY_17.beforeNoun.examples,
  ...GRAND_SUMMARY_17.withoutNoun.words,
  ...GRAND_SUMMARY_17.withoutNoun.examples,
  IQ200_RULE_17.formula,
  IQ200_RULE_17.example,
  IQ200_RULE_17.conversion,
  IQ200_RULE_17.result,
  ...IQ200_RULE_17.pairs,
  ...FIVE_FORBIDDEN_17.flatMap((e) => [e.wrong, e.correct]),
  ...ROADMAP_17.map((r) => r.en),
  ROADMAP_17_CLOSING,
];

/** الأخطاء المقصودة في المصدر — تبقى كما هي للتدريب عليها. */
export const INTENTIONALLY_WRONG_17: string[] = [
  "This is mine notebook. ❌",
  "This is mine book. ❌",
  "This is hers bag. ❌",
  "That is theirs house. ❌",
  "This is mine backpack.",
  "The backpack is my.",
  "This is hers notebook.",
  "The notebook is her.",
  "This is theirs house.",
  "The house is their.",
  "This is theirs car.",
  "This book is my.",
  "They're house is big.",
  "its' ❌",
];
