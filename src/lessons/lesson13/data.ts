// ============================================================
// الدرس 13 — Past Simple — النفي والأسئلة والإجابات القصيرة
// المصدر الكامل محفوظ حرفيًا — لا تلخيص ولا إعادة صياغة ولا حذف ولا إعادة ترتيب
// العنوان: 🇬🇧 الدرس 13: Past Simple — النفي والأسئلة والإجابات القصيرة
//
// ملاحظة اتجاه: كل وحدة إنجليزية داخل هذا الملف نص خام يُعرض دائمًا
// داخل عازل LTR (dir="ltr") — ولا يُقسَّم إلى كلمات منفصلة أبدًا.
// الصيغ الأربع الأساسية محفوظة بترتيبها الإنجليزي الصحيح:
//   Subject + Past Verb
//   Subject + didn't + Base Verb
//   Did + Subject + Base Verb?
//   Wh-word + did + Subject + Base Verb?
// ============================================================

// -------------------- الفهارس والعناوين (تحقق تغطية المصدر) --------------------
export const SOURCE_SECTIONS: string[] = [
  "🎯 أهداف الدرس",
  "🧠 1. تذكير سريع جداً من الدرس السابق",
  "🦸 2. ما هو DID؟",
  "🚨 3. القاعدة الذهبية",
  "🟥 4. النفي في Past Simple",
  "🧩 5. أمثلة مع جميع الضمائر",
  "🔥 6. لماذا لا نستخدم الماضي بعد DID؟",
  "🧠 7. حركة الماضي",
  "🟦 8. تكوين السؤال",
  "🎯 9. أمثلة إضافية جديدة",
  "🟢 10. الإجابات القصيرة",
  "⚠️ 11. انتبه إلى هذه النقطة",
  "🟣 12. الفرق بين السؤال والإجابة",
  "🧠 13. مقارنة مهمة جداً مع Present Simple",
  "🔥 14. النفي: Present مقابل Past",
  "🧠 15. نقطة عبقرية",
  "🟨 16. أسئلة Wh في الماضي",
  "🧠 17. تركيب السؤال الكامل",
  "⚠️ 18. خطأ خطير جداً",
  "🚨 19. خطأ آخر مهم: لا نخلط DID مع Verb to be",
  "🧠 20. DID كفعل أساسي",
  '🎮 21. لعبة "صائد الأخطاء"',
  "✏️ 22. تمارين المستوى الأول",
  "✏️ 23. المستوى الثاني",
  "✏️ 24. المستوى الثالث",
  "✏️ 25. المستوى الرابع — أكمل",
  "🧠 26. المستوى الخامس — حوّل الجملة ثلاث مرات",
  "🔥 27. المستوى السادس — IQ200",
  "🧩 28. IQ200 — اكتشف النظام",
  "🕵️ 29. Grammar Detective",
  "🏆 30. التحدي النهائي",
  "🧠 ملخص الدرس",
  "⭐ القاعدة الذهبية للدرس 13",
  "🚀 خريطة الدروس حتى الآن",
];

// -------------------- أدوار الكلمات (شرائح LTR) --------------------
export type Role13 =
  | "s"
  | "vpast"
  | "base"
  | "aux"
  | "nt"
  | "o"
  | "adv"
  | "wh"
  | "be"
  | "beNeg";

export interface Part13 {
  text: string;
  role: Role13;
}

export const ROLE13_AR: Record<Role13, string> = {
  s: "الفاعل",
  vpast: "الفعل الماضي",
  base: "الفعل الأساسي",
  aux: "did — فعل مساعد",
  nt: "didn't — النفي",
  o: "المفعول به",
  adv: "الظرف / الزمن",
  wh: "أداة السؤال",
  be: "was / were",
  beNeg: "النفي wasn't",
};

const P = (text: string, role: Role13): Part13 => ({ text, role });

// -------------------- الصيغ الأربع (ترتيب إنجليزي دقيق) --------------------
export type FormulaKey = "aff" | "neg" | "negFull" | "q" | "wh";

export interface FormulaToken {
  t: string;
  label?: string;
}
export interface FormulaRow {
  key: FormulaKey;
  tokens: FormulaToken[];
}

export const FORMULAS: FormulaRow[] = [
  {
    key: "aff",
    tokens: [{ t: "Subject", label: "الفاعل" }, { t: "+" }, { t: "Past Verb", label: "الفعل الماضي" }],
  },
  {
    key: "negFull",
    tokens: [
      { t: "Subject", label: "الفاعل" },
      { t: "+" },
      { t: "did not", label: "النفي الكامل" },
      { t: "+" },
      { t: "base verb", label: "الفعل الأساسي" },
    ],
  },
  {
    key: "neg",
    tokens: [
      { t: "Subject", label: "الفاعل" },
      { t: "+" },
      { t: "didn't", label: "النفي" },
      { t: "+" },
      { t: "Base Verb", label: "الفعل الأساسي" },
    ],
  },
  {
    key: "q",
    tokens: [
      { t: "Did", label: "المساعد" },
      { t: "+" },
      { t: "Subject", label: "الفاعل" },
      { t: "+" },
      { t: "Base Verb", label: "الفعل الأساسي" },
      { t: "?" },
    ],
  },
  {
    key: "wh",
    tokens: [
      { t: "Wh-word", label: "أداة السؤال" },
      { t: "+" },
      { t: "did", label: "المساعد" },
      { t: "+" },
      { t: "Subject", label: "الفاعل" },
      { t: "+" },
      { t: "Base Verb", label: "الفعل الأساسي" },
      { t: "?" },
    ],
  },
];

// النص الحرفي للصيغ — يُستخدم في التحقق الآلي من الترتيب الإنجليزي
export const FORMULA_STRINGS: Record<FormulaKey, string> = {
  aff: "Subject + Past Verb",
  negFull: "Subject + did not + base verb",
  neg: "Subject + didn't + base verb",
  q: "Did + Subject + Base Verb?",
  wh: "Wh-word + did + Subject + Base Verb?",
};

// ============================================================
// البيانات المرجعية للتفاعليات (كلها من نص المصدر)
// ============================================================

// ① تذكير سريع — الأمثلة المثبتة
export const RECAP_SENTENCES: { parts: Part13[]; ar?: string }[] = [
  { parts: [P("I", "s"), P("visited", "vpast"), P("the aquarium", "o"), P("yesterday", "adv")], ar: "زرت الأكواريوم أمس." },
  { parts: [P("She", "s"), P("opened", "vpast"), P("the window", "o")], ar: "هي فتحت النافذة." },
  { parts: [P("They", "s"), P("found", "vpast"), P("a treasure", "o")], ar: "هم وجدوا كنزًا." },
  { parts: [P("He", "s"), P("bought", "vpast"), P("a new notebook", "o")], ar: "هو اشترى دفترًا جديدًا." },
];

export const RECAP_VERBS: string[] = ["visited", "opened", "found", "bought"];

export const RECAP_QUESTIONS_AR: string[] = [
  "أنا لم أزر...",
  "هي لم تفتح...",
  "هم لم يجدوا...",
  "هل زار...؟",
  "هل فتحت...؟",
  "هل وجدوا...؟",
];

// ② ما هو DID؟ — جميع الضمائر
export const DID_PRONOUNS: { en: string; ar: string }[] = [
  { en: "I", ar: "أنا" },
  { en: "You", ar: "أنت" },
  { en: "He", ar: "هو" },
  { en: "She", ar: "هي" },
  { en: "It", ar: "لغير العاقل" },
  { en: "We", ar: "نحن" },
  { en: "They", ar: "هم" },
];

// ③ القاعدة الذهبية
export const GOLDEN = {
  aff: [P("She", "s"), P("went", "vpast"), P("to the library", "o")],
  q: [P("Did", "aux"), P("she", "s"), P("go", "base"), P("to the library", "o")],
  change: { from: "went", to: "go" },
};

// ④ النفي
export const NEG_EXAMPLE = {
  aff: [P("I", "s"), P("visited", "vpast"), P("the castle", "o")],
  neg: [P("I", "s"), P("didn't", "nt"), P("visit", "base"), P("the castle", "o")],
};

// ⑤ أمثلة مع جميع الضمائر — (مثبت → منفي)
export const PRONOUN_NEG: { pronoun: string; ar: string; aff: Part13[]; neg: Part13[] }[] = [
  {
    pronoun: "I",
    ar: "أنا",
    aff: [P("I", "s"), P("watched", "vpast"), P("the documentary", "o")],
    neg: [P("I", "s"), P("didn't", "nt"), P("watch", "base"), P("the documentary", "o")],
  },
  {
    pronoun: "You",
    ar: "أنت",
    aff: [P("You", "s"), P("cleaned", "vpast"), P("the room", "o")],
    neg: [P("You", "s"), P("didn't", "nt"), P("clean", "base"), P("the room", "o")],
  },
  {
    pronoun: "He",
    ar: "هو",
    aff: [P("He", "s"), P("found", "vpast"), P("the key", "o")],
    neg: [P("He", "s"), P("didn't", "nt"), P("find", "base"), P("the key", "o")],
  },
  {
    pronoun: "She",
    ar: "هي",
    aff: [P("She", "s"), P("bought", "vpast"), P("a camera", "o")],
    neg: [P("She", "s"), P("didn't", "nt"), P("buy", "base"), P("a camera", "o")],
  },
  {
    pronoun: "It",
    ar: "لغير العاقل",
    aff: [P("It", "s"), P("stopped", "vpast"), P("suddenly", "adv")],
    neg: [P("It", "s"), P("didn't", "nt"), P("stop", "base"), P("suddenly", "adv")],
  },
  {
    pronoun: "We",
    ar: "نحن",
    aff: [P("We", "s"), P("explored", "vpast"), P("the cave", "o")],
    neg: [P("We", "s"), P("didn't", "nt"), P("explore", "base"), P("the cave", "o")],
  },
  {
    pronoun: "They",
    ar: "هم",
    aff: [P("They", "s"), P("discovered", "vpast"), P("an old map", "o")],
    neg: [P("They", "s"), P("didn't", "nt"), P("discover", "base"), P("an old map", "o")],
  },
];

// ⑥ لماذا لا نستخدم الماضي بعد DID؟
export const TWO_MARKERS = {
  aff: [P("He", "s"), P("went", "vpast")],
  neg: [P("He", "s"), P("didn't", "nt"), P("go", "base")],
};

// ⑦ حركة الماضي (كرة PAST)
export const PAST_BALL = {
  aff: [P("She", "s"), P("went", "vpast")],
  q: [P("Did", "aux"), P("she", "s"), P("go", "base")],
};

// ⑧ تكوين السؤال
export const Q_BUILDER: { aff: Part13[]; q: Part13[]; ar: string }[] = [
  {
    aff: [P("You", "s"), P("visited", "vpast"), P("the museum", "o")],
    q: [P("Did", "aux"), P("you", "s"), P("visit", "base"), P("the museum", "o")],
    ar: "هل زرت المتحف؟",
  },
  {
    aff: [P("She", "s"), P("opened", "vpast"), P("the box", "o")],
    q: [P("Did", "aux"), P("she", "s"), P("open", "base"), P("the box", "o")],
    ar: "هل فتحت الصندوق؟",
  },
  {
    aff: [P("They", "s"), P("found", "vpast"), P("the hidden door", "o")],
    q: [P("Did", "aux"), P("they", "s"), P("find", "base"), P("the hidden door", "o")],
    ar: "هل وجدوا الباب المخفي؟",
  },
  {
    aff: [P("He", "s"), P("bought", "vpast"), P("a telescope", "o")],
    q: [P("Did", "aux"), P("he", "s"), P("buy", "base"), P("a telescope", "o")],
    ar: "هل اشترى تلسكوبًا؟",
  },
];

// ⑨ أمثلة إضافية جديدة
export const EXTRA_QUESTIONS: { en: string; ar: string }[] = [
  { en: "Did Maya solve the puzzle?", ar: "هل حلت مايا اللغز؟" },
  { en: "Did Omar repair the robot?", ar: "هل أصلح عمر الروبوت؟" },
  { en: "Did the students finish the experiment?", ar: "هل أنهى الطلاب التجربة؟" },
  { en: "Did your brother catch the ball?", ar: "هل أمسك أخوك الكرة؟" },
  { en: "Did the bird fly away?", ar: "هل طار الطائر بعيداً؟" },
  { en: "Did they build the model?", ar: "هل بنوا النموذج؟" },
];

// ⑩ الإجابات القصيرة
export const SHORT_ANSWERS: { q: string; yes: string; no: string; ar?: string }[] = [
  { q: "Did you finish your homework?", yes: "Yes, I did.", no: "No, I didn't." },
  { q: "Did he arrive early?", yes: "Yes, he did.", no: "No, he didn't." },
  { q: "Did she call you?", yes: "Yes, she did.", no: "No, she didn't." },
  { q: "Did they win the game?", yes: "Yes, they did.", no: "No, they didn't." },
  { q: "Did Lina find the answer?", yes: "Yes, she did.", no: "No, she didn't." },
];

// ⑪ انتبه إلى هذه النقطة
export const SHORT_ANSWER_TRAP = {
  bad: "Yes, she went.",
  ok: "Yes, she did.",
  full: "Yes, she went to the library.",
};

// ⑫ الفرق بين السؤال والإجابة
export const Q_ANSWER_DIFF = {
  q: "Did Ali open the door?",
  short: "Yes, he did.",
  full: "Yes, he opened the door.",
};

// ⑬ مقارنة مع Present Simple — السؤال
export const PRESENT_PAST_Q: { present: string; past: string; arPresent?: string; arPast?: string }[] = [
  { present: "Do you play chess?", past: "Did you play chess?" },
  { present: "Does he play chess?", past: "Did he play chess?" },
  {
    present: "Do you visit your grandmother?",
    arPresent: "هل تزور جدتك؟",
    past: "Did you visit your grandmother?",
    arPast: "هل زرت جدتك؟",
  },
  {
    present: "Does she study French?",
    arPresent: "هل تدرس الفرنسية؟",
    past: "Did she study French?",
    arPast: "هل درست الفرنسية؟",
  },
];

// ⑭ النفي: Present مقابل Past
export const PRESENT_PAST_NEG: { present: string; arPresent: string; past: string; arPast: string }[] = [
  {
    present: "I don't play tennis.",
    arPresent: "أنا لا ألعب التنس.",
    past: "I didn't play tennis.",
    arPast: "أنا لم ألعب التنس.",
  },
  {
    present: "He doesn't watch documentaries.",
    arPresent: "هو لا يشاهد الأفلام الوثائقية.",
    past: "He didn't watch documentaries.",
    arPast: "هو لم يشاهد الأفلام الوثائقية.",
  },
];

// ⑮ نقطة عبقرية
export const GENIUS_LADDER = {
  present: ["He plays.", "He doesn't play.", "Does he play?"],
  past: ["He played.", "He didn't play.", "Did he play?"],
};

// ⑯ أسئلة Wh
export const WH_MEANINGS: { en: string; ar: string }[] = [
  { en: "What", ar: "ماذا" },
  { en: "Where", ar: "أين" },
  { en: "When", ar: "متى" },
  { en: "Why", ar: "لماذا" },
  { en: "Who", ar: "من" },
  { en: "How", ar: "كيف" },
];

export const WH_GROUPS: { word: string; ar: string; items: { en: string; ar: string }[] }[] = [
  {
    word: "What",
    ar: "ماذا",
    items: [
      { en: "What did you find?", ar: "ماذا وجدت؟" },
      { en: "What did she buy?", ar: "ماذا اشترت؟" },
      { en: "What did they discover?", ar: "ماذا اكتشفوا؟" },
    ],
  },
  {
    word: "Where",
    ar: "أين",
    items: [
      { en: "Where did he go?", ar: "أين ذهب؟" },
      { en: "Where did they stay?", ar: "أين أقاموا؟" },
    ],
  },
  {
    word: "When",
    ar: "متى",
    items: [
      { en: "When did she arrive?", ar: "متى وصلت؟" },
      { en: "When did you start the project?", ar: "متى بدأت المشروع؟" },
    ],
  },
  {
    word: "Why",
    ar: "لماذا",
    items: [
      { en: "Why did he leave?", ar: "لماذا غادر؟" },
      { en: "Why did they stop?", ar: "لماذا توقفوا؟" },
    ],
  },
  {
    word: "How",
    ar: "كيف",
    items: [
      { en: "How did you solve the problem?", ar: "كيف حللت المشكلة؟" },
      { en: "How did she learn English?", ar: "كيف تعلمت الإنجليزية؟" },
    ],
  },
];

// ⑰ تركيب السؤال الكامل
export const WH_FROM_SENTENCE = {
  base: "She found a strange box in the attic yesterday.",
  items: [
    { word: "What", q: "What did she find?", ar: "ماذا وجدت؟" },
    { word: "Where", q: "Where did she find the box?", ar: "أين وجدت الصندوق؟" },
    { word: "When", q: "When did she find it?", ar: "متى وجدته؟" },
  ],
};

// ⑱ خطأ خطير جداً
export const DANGER_PAIRS: { bad: string; ok: string }[] = [
  { bad: "What did she found?", ok: "What did she find?" },
  { bad: "Where did they went?", ok: "Where did they go?" },
  { bad: "Why did he left?", ok: "Why did he leave?" },
  { bad: "Did you saw the comet?", ok: "Did you see the comet?" },
];

// ⑲ لا نخلط DID مع Verb to be
export const BE_VS_DID = {
  badSystem: ["Did he be tired?", "Did he tired?"],
  okSystem: ["Was he tired?"],
  example: "He was nervous.",
  q: "Was he nervous?",
  neg: "He wasn't nervous.",
};

// ⑳ DID كفعل أساسي
export const TWO_JOBS = {
  main: { en: "I did my homework yesterday.", note: "هنا: [[did]] = أنجزت / فعلت — وليس مجرد أداة للسؤال." },
  aux: { en: "Did you do your homework?", note: "هنا: [[Did]] = فعل مساعد — و [[do]] = الفعل الأساسي." },
};

// ㉑ لعبة صائد الأخطاء
export const ERROR_HUNTER: { n: string; wrong: string; correct: string }[] = [
  { n: "①", wrong: "Did Sara went to the market?", correct: "Did Sara go to the market?" },
  { n: "②", wrong: "He didn't bought the tickets.", correct: "He didn't buy the tickets." },
  { n: "③", wrong: "Did they watched the movie?", correct: "Did they watch the movie?" },
  { n: "④", wrong: "She didn't saw the message.", correct: "She didn't see the message." },
  { n: "⑤", wrong: "Did you finished the project?", correct: "Did you finish the project?" },
];

// ㉒ المستوى الأول — حوّل إلى النفي
export const LEVEL1_NEG: { aff: string; neg: string }[] = [
  { aff: "I visited the science center.", neg: "I didn't visit the science center." },
  { aff: "She opened the drawer.", neg: "She didn't open the drawer." },
  { aff: "They found the missing notebook.", neg: "They didn't find the missing notebook." },
  { aff: "He ate the sandwich.", neg: "He didn't eat the sandwich." },
  { aff: "We saw a strange light.", neg: "We didn't see a strange light." },
];

// ㉓ المستوى الثاني — حوّل إلى سؤال
export const LEVEL2_Q: { aff: string; q: string }[] = [
  { aff: "You finished the experiment.", q: "Did you finish the experiment?" },
  { aff: "She bought a new backpack.", q: "Did she buy a new backpack?" },
  { aff: "They visited the lighthouse.", q: "Did they visit the lighthouse?" },
  { aff: "He wrote a story.", q: "Did he write a story?" },
  { aff: "You met the new teacher.", q: "Did you meet the new teacher?" },
];

// ㉔ المستوى الثالث — اختر الصحيح
export const LEVEL3_CHOOSE: { source: string; stem: string; opts: string[]; answer: number; why: string }[] = [
  {
    source: "Did he go / went to school?",
    stem: "Did he _______ to school?",
    opts: ["go", "went"],
    answer: 0,
    why: "بعد [[Did]] نستخدم الفعل الأساسي: [[go]] وليس [[went]].",
  },
  {
    source: "She didn't see / saw the bird.",
    stem: "She didn't _______ the bird.",
    opts: ["see", "saw"],
    answer: 0,
    why: "بعد [[didn't]] يعود الفعل إلى شكله الأساسي: [[see]] وليس [[saw]].",
  },
  {
    source: "Did they find / found the key?",
    stem: "Did they _______ the key?",
    opts: ["find", "found"],
    answer: 0,
    why: "[[Did + subject + base verb]] → [[find]] وليس [[found]].",
  },
  {
    source: "We didn't eat / ate breakfast.",
    stem: "We didn't _______ breakfast.",
    opts: ["eat", "ate"],
    answer: 0,
    why: "[[didn't]] تحمل الماضي، فالفعل يبقى أساسيًا: [[eat]] وليس [[ate]].",
  },
  {
    source: "Did Sara write / wrote the email?",
    stem: "Did Sara _______ the email?",
    opts: ["write", "wrote"],
    answer: 0,
    why: "بعد [[Did]] نستخدم [[write]] — الماضي موجود في [[Did]].",
  },
];

// ㉕ المستوى الرابع — أكمل
export const LEVEL4_FILL: { stem: string; hint: string; answer: string; why: string }[] = [
  { stem: "I ________ visit the castle yesterday.", hint: "didn't / don't", answer: "didn't", why: "[[yesterday]] ماضٍ → [[didn't]] وليس [[don't]]." },
  { stem: "________ you see the rainbow?", hint: "Did / Do", answer: "Did", why: "سؤال في الماضي → [[Did]] وليس [[Do]]." },
  { stem: "He didn't ________ the answer.", hint: "know / knew", answer: "know", why: "بعد [[didn't]] الفعل الأساسي: [[know]] وليس [[knew]]." },
  { stem: "Did she ________ the door?", hint: "close / closed", answer: "close", why: "بعد [[Did]] الفعل الأساسي: [[close]] وليس [[closed]]." },
  { stem: "They ________ not finish the race.", hint: "did / do", answer: "did", why: "الماضي: [[did not]] = [[didn't]] → [[They did not finish the race.]]" },
];

// ㉖ المستوى الخامس — حوّل الجملة ثلاث مرات
export const TRIPLE_TRANSFORM = {
  sentence: "Liam discovered an old photograph.",
  items: [
    { label: "① مثبتة", en: "Liam discovered an old photograph." },
    { label: "② منفية", en: "Liam didn't discover an old photograph." },
    { label: "③ سؤال", en: "Did Liam discover an old photograph?" },
  ],
};

// ㉗ المستوى السادس — IQ200
export const IQ200_TASK = {
  given: "She went to the observatory last night.",
  tasks: [
    "① سؤال Yes/No",
    "② إجابة قصيرة بـ Yes",
    "③ إجابة قصيرة بـ No",
    "④ سؤال باستخدام Where",
    "⑤ سؤال باستخدام When",
  ],
  note: "فكر بالقاعدة، وليس بالحفظ.",
  // إضافة توضيحية (ليست جزءًا من نص المصدر) — نموذج للتحقق فقط
  model: [
    { label: "① سؤال Yes/No", en: "Did she go to the observatory last night?" },
    { label: "② إجابة قصيرة بـ Yes", en: "Yes, she did." },
    { label: "③ إجابة قصيرة بـ No", en: "No, she didn't." },
    { label: "④ سؤال باستخدام Where", en: "Where did she go?" },
    { label: "⑤ سؤال باستخدام When", en: "When did she go to the observatory?" },
  ],
  modelNote: "نموذج مقترح مبني على قاعدة الدرس نفسها — إضافة توضيحية وليست من نص المصدر.",
};

// ㉘ IQ200 — اكتشف النظام
export const PATTERN_SETS: string[][] = [
  ["He played.", "Did he play?", "He didn't play."],
  ["She wrote.", "Did she write?", "She didn't write."],
  ["They found.", "Did they find?", "They didn't find."],
];

export const PATTERN = {
  question: "ما الشيء المشترك بين جميع الجمل التي تحتوي على [[DID]] أو [[DIDN'T]]؟",
  answer: "الفعل الرئيسي يعود دائماً إلى [[Base Form]].",
  bases: ["play", "write", "find"],
  bad: ["Did he played? ❌", "Did she wrote? ❌", "Did they found? ❌"],
};

// ㉙ Grammar Detective
export const DETECTIVE_PASSAGE =
  'Yesterday, Noah visited an old railway station. He didn\'t take his camera because he forgot it at home. He saw an unusual machine near the platform. He didn\'t understand what it was.\nLater, he called his sister.\nShe asked:\n"Did you take a picture?"\nNoah answered:\n"No, I didn\'t."';

export const DETECTIVE_Q: { q: string; a: string; src: string }[] = [
  { q: "① Did Noah visit the railway station?", a: "Yes, he did.", src: "النص: Yesterday, Noah visited an old railway station." },
  { q: "② Did he take his camera?", a: "No, he didn't.", src: "النص: He didn't take his camera because he forgot it at home." },
  { q: "③ What did he see?", a: "He saw an unusual machine near the platform.", src: "النص: He saw an unusual machine near the platform." },
  { q: "④ Did he understand the machine?", a: "No, he didn't.", src: "النص: He didn't understand what it was." },
  { q: "⑤ Did he call his sister?", a: "Yes, he did.", src: "النص: Later, he called his sister." },
  { q: "⑥ Did his sister ask a question?", a: "Yes, she did.", src: 'النص: She asked: "Did you take a picture?"' },
];

export const DETECTIVE_NOTE =
  "إجابات مستخرجة من النص نفسه — ليست قائمة إجابات مقدَّمة في المصدر.";

// ㉚ التحدي النهائي
export const FINAL_CHALLENGE = {
  instruction: "اكتب قصة قصيرة من 8 جمل عن يوم حدث في الماضي.",
  conditions: [
    "✅ 3 جمل مثبتة في Past Simple",
    "✅ 2 جمل منفية باستخدام didn't",
    "✅ 2 أسئلة باستخدام Did",
    "✅ إجابة قصيرة واحدة على الأقل:",
  ],
  shortForms: ["Yes, ... did.", "No, ... didn't."],
  note: "وحاول استخدام أفعال مختلفة، مثل:",
  verbs: ["discover", "find", "build", "meet", "take", "bring", "write", "see", "buy", "leave"],
  // إضافة توضيحية (ليست جزءًا من نص المصدر) — نموذج للتحقق فقط
  model: [
    "Last summer, my friends and I discovered an old wooden box in the garden.",
    "We found a small map inside it.",
    "My friend Adam built a wooden frame for the map.",
    "We didn't open the box again that day.",
    "I didn't tell my little brother about it.",
    "Did you find anything inside the box?",
    "Did your friends help you with the map?",
    "Yes, they did.",
  ],
  modelNote: "نموذج مقترح مبني على شروط التحدي نفسها — إضافة توضيحية وليست من نص المصدر.",
};

// ============================================================
// أنواع الكتل والتمارين والشرائح
// ============================================================

export type Block13 =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "english"; en: string; ar?: string; tone?: "neutral" | "good" | "bad" | "equiv" | "change" }
  | { type: "chips"; items: string[]; tone?: "past" | "base" | "violet" }
  | { type: "sentence"; parts: Part13[]; ar?: string; note?: string; q?: boolean }
  | { type: "rawFormula"; text: string }
  | { type: "formula"; key: FormulaKey }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "cards"; items: { emoji?: string; ar: string; en?: string; label?: string }[] }
  | { type: "formulaBoard" }
  | { type: "didHero" }
  | { type: "goldenMachine" }
  | { type: "negMachine" }
  | { type: "pronounGallery" }
  | { type: "twoPastMarkers" }
  | { type: "pastBall" }
  | { type: "questionBuilder" }
  | { type: "extraQuestions" }
  | { type: "shortAnswerTrainer" }
  | { type: "presentPastToggle"; mode: "question" | "negative" }
  | { type: "geniusLadder" }
  | { type: "whMeanings" }
  | { type: "whGrid" }
  | { type: "whFromSentence" }
  | { type: "dangerBoard" }
  | { type: "beVsDidBoard" }
  | { type: "twoJobsOfDid" };

export type Exercise13 =
  | { type: "negTransform"; items: { aff: string; neg: string }[] }
  | { type: "qTransform"; items: { aff: string; q: string }[] }
  | { type: "choose"; items: { source: string; stem: string; opts: string[]; answer: number; why: string }[] }
  | { type: "fill"; items: { stem: string; hint: string; answer: string; why: string }[] }
  | { type: "triple" }
  | { type: "iq200" }
  | { type: "pattern" }
  | { type: "errorHunter" }
  | { type: "detective" }
  | { type: "finalChallenge" };

export type Slide13 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block13[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise13 }
  | { kind: "summary"; title: string }
  | { kind: "keyRule"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const A = "البداية";
const B = "تذكير و DID";
const C = "النفي";
const D = "تكوين السؤال";
const E = "الإجابات القصيرة";
const F = "مقارنات مهمة";
const G = "أسئلة Wh";
const H = "أخطاء خطيرة";
const I2 = "DID كفعل أساسي";
const J2 = "اللعبة والتمارين";
const K2 = "تحديات IQ200";
const L2 = "المحقق والتحدي النهائي";
const M2 = "الخاتمة";

export const SLIDES: Slide13[] = [
  { kind: "cover", section: A, mascot: "📘" },
  { kind: "objectives", section: A, mascot: "🎯" },

  // ① تذكير سريع جداً من الدرس السابق
  {
    kind: "lesson",
    section: B,
    mascot: "🧠",
    step: "1",
    title: "تذكير سريع جداً من الدرس السابق",
    lead: "في الجملة المثبتة في [[Past Simple]]:",
    blocks: [
      { type: "formula", key: "aff" },
      { type: "text", text: "مثلاً:" },
      { type: "sentence", parts: [P("I", "s"), P("visited", "vpast"), P("the aquarium", "o"), P("yesterday", "adv")], ar: "زرت الأكواريوم أمس." },
      { type: "sentence", parts: [P("She", "s"), P("opened", "vpast"), P("the window", "o")], ar: "هي فتحت النافذة." },
      { type: "sentence", parts: [P("They", "s"), P("found", "vpast"), P("a treasure", "o")], ar: "هم وجدوا كنزًا." },
      { type: "sentence", parts: [P("He", "s"), P("bought", "vpast"), P("a new notebook", "o")], ar: "هو اشترى دفترًا جديدًا." },
      { type: "text", text: "لاحظ:" },
      { type: "chips", items: ["visited", "opened", "found", "bought"], tone: "past" },
      { type: "text", text: "الفعل نفسه هو الذي يحمل معنى الماضي." },
      { type: "text", text: "لكن اليوم لدينا مشكلة جديدة:" },
      { type: "text", text: "كيف نقول:" },
      { type: "list", items: ["أنا لم أزر...", "هي لم تفتح...", "هم لم يجدوا...", "هل زار...؟", "هل فتحت...؟", "هل وجدوا...؟"] },
      { type: "text", text: "هنا يظهر البطل الجديد:" },
      { type: "note", emoji: "⭐", text: "[[DID]]" },
    ],
  },

  // ② ما هو DID؟
  {
    kind: "lesson",
    section: B,
    mascot: "🦸",
    step: "2",
    title: "ما هو DID؟",
    lead: "[[did]] هو فعل مساعد [[Auxiliary Verb]].",
    blocks: [
      { type: "text", text: "نستخدمه عندما نريد أن نبني:" },
      {
        type: "cards",
        items: [
          { emoji: "🟥", ar: "النفي في [[Past Simple]]" },
          { emoji: "🟦", ar: "السؤال في [[Past Simple]]" },
        ],
      },
      { type: "text", text: "والشيء الرائع: ⭐ [[did]] يُستخدم مع جميع الضمائر." },
      { type: "didHero" },
      { type: "text", text: "لا يوجد: [[does]] للمفرد في الماضي." },
      { type: "text", text: "ولا يوجد: [[do]] للجمع في الماضي." },
      { type: "text", text: "في [[Past Simple]]:" },
      { type: "note", emoji: "⭐", text: "الجميع يأخذ [[DID]]." },
    ],
  },

  // ③ القاعدة الذهبية
  {
    kind: "lesson",
    section: B,
    mascot: "🚨",
    step: "3",
    title: "القاعدة الذهبية",
    lead: "انتبه جيداً لهذه القاعدة.",
    blocks: [
      { type: "text", text: "في الجملة المثبتة:" },
      { type: "sentence", parts: [P("She", "s"), P("went", "vpast"), P("to the library", "o")], ar: "هي ذهبت إلى المكتبة." },
      { type: "text", text: "الفعل [[went]] هو الماضي من [[go]]." },
      { type: "text", text: "لكن عندما نستخدم [[did]]:" },
      { type: "sentence", parts: [P("Did", "aux"), P("she", "s"), P("go", "base"), P("to the library", "o")], q: true, ar: "هل ذهبت إلى المكتبة؟" },
      { type: "text", text: "لاحظ ماذا حدث:" },
      { type: "chips", items: ["went → go"], tone: "base" },
      { type: "text", text: "لماذا؟" },
      { type: "text", text: "لأن [[did]] أصبح هو الذي يحمل علامة الماضي." },
      { type: "goldenMachine" },
      { type: "text", text: "وكأننا نقول:" },
      { type: "sentence", parts: [P("She", "s"), P("went", "vpast")] },
      { type: "text", text: "ثم عندما دخل [[DID]]:" },
      { type: "sentence", parts: [P("Did", "aux"), P("she", "s"), P("go", "base")], q: true },
      { type: "text", text: "الماضي انتقل من الفعل الرئيسي إلى الفعل المساعد." },
      { type: "note", emoji: "🔥", text: "هذه واحدة من أهم أفكار درس اليوم." },
      { type: "note", emoji: "⭐", text: "قاعدة [[IQ200]] — احفظها بهذه الطريقة:" },
      { type: "text", text: "في الجملة المثبتة:" },
      { type: "text", text: "[[PAST]] موجود على الفعل." },
      { type: "english", en: "She went." },
      { type: "text", text: "عندما يظهر [[DID]]:" },
      { type: "text", text: "[[PAST]] ينتقل إلى [[DID]]." },
      { type: "english", en: "Did she go?" },
      { type: "text", text: "لذلك:" },
      { type: "bad", en: "Did + past verb", why: "❌" },
      { type: "ok", en: "Did + base verb", ar: "✅" },
    ],
  },

  // ④ النفي في Past Simple
  {
    kind: "lesson",
    section: C,
    mascot: "🟥",
    step: "4",
    title: "النفي في Past Simple",
    lead: "لعمل النفي نستخدم:",
    blocks: [
      { type: "formula", key: "negFull" },
      { type: "text", text: "والاختصار:" },
      { type: "english", en: "did not = didn't", tone: "equiv" },
      { type: "text", text: "إذن:" },
      { type: "formula", key: "neg" },
      { type: "text", text: "مثال:" },
      { type: "sentence", parts: [P("I", "s"), P("visited", "vpast"), P("the castle", "o")], note: "قبل النفي" },
      { type: "text", text: "تصبح:" },
      { type: "sentence", parts: [P("I", "s"), P("didn't", "nt"), P("visit", "base"), P("the castle", "o")], note: "بعد النفي" },
      { type: "negMachine" },
      { type: "text", text: "لاحظ:" },
      { type: "chips", items: ["visited → visit"], tone: "base" },
      { type: "text", text: "وليس:" },
      { type: "bad", en: "I didn't visited.", why: "❌" },
    ],
  },

  // ⑤ أمثلة مع جميع الضمائر
  {
    kind: "lesson",
    section: C,
    mascot: "🧩",
    step: "5",
    title: "أمثلة مع جميع الضمائر",
    lead: "اضغط على أي ضمير لتشاهد: مثبت → منفي.",
    blocks: [
      { type: "pronounGallery" },
      { type: "note", emoji: "⭐", text: "لاحظ شيئاً مهماً جداً:" },
      { type: "text", text: "الفعل بعد [[didn't]] دائماً يرجع إلى شكله الأساسي." },
    ],
  },

  // ⑥ لماذا لا نستخدم الماضي بعد DID؟
  {
    kind: "lesson",
    section: C,
    mascot: "🔥",
    step: "6",
    title: "لماذا لا نستخدم الماضي بعد DID؟",
    lead: "لأننا لا نحتاج علامتين للماضي.",
    blocks: [
      { type: "text", text: "مثلاً:" },
      { type: "sentence", parts: [P("He", "s"), P("went", "vpast")] },
      { type: "text", text: "هنا:" },
      { type: "text", text: "[[went]] = الماضي" },
      { type: "text", text: "لكن:" },
      { type: "sentence", parts: [P("He", "s"), P("didn't", "nt"), P("go", "base")] },
      { type: "text", text: "هنا:" },
      { type: "text", text: "[[did]] = الماضي" },
      { type: "text", text: "[[go]] = الفعل الأساسي" },
      { type: "text", text: "لذلك:" },
      { type: "bad", en: "He didn't went.", why: "❌" },
      { type: "text", text: "فيها علامتا ماضٍ." },
      { type: "text", text: "والصحيح:" },
      { type: "ok", en: "He didn't go.", ar: "✅" },
      { type: "twoPastMarkers" },
    ],
  },

  // ⑦ حركة الماضي
  {
    kind: "lesson",
    section: C,
    mascot: "🧠",
    step: "7",
    title: "حركة الماضي",
    lead: "تخيل أن كلمة [[PAST]] مثل كرة ⚽.",
    blocks: [
      { type: "text", text: "في الجملة المثبتة:" },
      { type: "sentence", parts: [P("She", "s"), P("went", "vpast")] },
      { type: "text", text: "الكرة موجودة على:" },
      { type: "english", en: "went", tone: "change" },
      { type: "text", text: "عندما يأتي [[DID]]:" },
      { type: "rawFormula", text: "She → did → go" },
      { type: "text", text: "الكرة انتقلت إلى:" },
      { type: "english", en: "did", tone: "change" },
      { type: "text", text: "لذلك:" },
      { type: "sentence", parts: [P("Did", "aux"), P("she", "s"), P("go", "base")], q: true },
      { type: "text", text: "وليس:" },
      { type: "bad", en: "Did she went?", why: "❌" },
      { type: "pastBall" },
      { type: "note", emoji: "🔥", text: "احفظ:" },
      { type: "text", text: "[[DID]] يأخذ الماضي معه، ويترك الفعل الأساسي." },
    ],
  },

  // ⑧ تكوين السؤال
  {
    kind: "lesson",
    section: D,
    mascot: "🟦",
    step: "8",
    title: "تكوين السؤال",
    lead: "لإنشاء سؤال في [[Past Simple]]:",
    blocks: [
      { type: "formula", key: "q" },
      { type: "text", text: "مثال:" },
      { type: "sentence", parts: [P("You", "s"), P("visited", "vpast"), P("the museum", "o")] },
      { type: "text", text: "السؤال:" },
      { type: "sentence", parts: [P("Did", "aux"), P("you", "s"), P("visit", "base"), P("the museum", "o")], q: true },
      { type: "text", text: "مثال:" },
      { type: "sentence", parts: [P("She", "s"), P("opened", "vpast"), P("the box", "o")] },
      { type: "text", text: "السؤال:" },
      { type: "sentence", parts: [P("Did", "aux"), P("she", "s"), P("open", "base"), P("the box", "o")], q: true },
      { type: "text", text: "مثال:" },
      { type: "sentence", parts: [P("They", "s"), P("found", "vpast"), P("the hidden door", "o")] },
      { type: "text", text: "السؤال:" },
      { type: "sentence", parts: [P("Did", "aux"), P("they", "s"), P("find", "base"), P("the hidden door", "o")], q: true },
      { type: "text", text: "مثال:" },
      { type: "sentence", parts: [P("He", "s"), P("bought", "vpast"), P("a telescope", "o")] },
      { type: "text", text: "السؤال:" },
      { type: "sentence", parts: [P("Did", "aux"), P("he", "s"), P("buy", "base"), P("a telescope", "o")], q: true },
      { type: "questionBuilder" },
      { type: "text", text: "لاحظ:" },
      { type: "chips", items: ["bought → buy"], tone: "base" },
      { type: "text", text: "لأن بعد [[DID]] نستخدم [[Base Verb]]." },
    ],
  },

  // ⑨ أمثلة إضافية جديدة
  {
    kind: "lesson",
    section: D,
    mascot: "🎯",
    step: "9",
    title: "أمثلة إضافية جديدة",
    lead: "ستة أسئلة جديدة — اضغط أي سؤال لتكبير عرضه.",
    blocks: [{ type: "extraQuestions" }],
  },

  // ⑩ الإجابات القصيرة
  {
    kind: "lesson",
    section: E,
    mascot: "🟢",
    step: "10",
    title: "الإجابات القصيرة",
    lead: "عندما يسأل شخص:",
    blocks: [
      { type: "english", en: "Did you finish your homework?" },
      { type: "text", text: "لدينا إجابتان أساسيتان:" },
      { type: "ok", en: "Yes, I did." },
      { type: "text", text: "أو:" },
      { type: "ok", en: "No, I didn't." },
      { type: "text", text: "إذا كان السؤال:" },
      { type: "shortAnswerTrainer" },
      { type: "note", emoji: "⭐", text: "قاعدة الإجابة القصيرة" },
      { type: "text", text: "السؤال:" },
      { type: "rawFormula", text: "Did + subject...?" },
      { type: "text", text: "الإجابة:" },
      { type: "rawFormula", text: "Yes, subject + did." },
      { type: "text", text: "أو:" },
      { type: "rawFormula", text: "No, subject + didn't." },
      { type: "text", text: "مثال:" },
      { type: "english", en: "Did Lina find the answer?" },
      { type: "ok", en: "Yes, she did." },
      { type: "ok", en: "No, she didn't." },
    ],
  },

  // ⑪ انتبه إلى هذه النقطة
  {
    kind: "lesson",
    section: E,
    mascot: "⚠️",
    step: "11",
    title: "انتبه إلى هذه النقطة",
    lead: "لا نقول:",
    blocks: [
      { type: "bad", en: "Yes, she went.", why: "❌" },
      { type: "text", text: "إذا كان المطلوب [[Short Answer]]." },
      { type: "text", text: "نقول:" },
      { type: "ok", en: "Yes, she did.", ar: "✅" },
      { type: "text", text: "لكن يمكن طبعاً إعطاء إجابة كاملة:" },
      { type: "ok", en: "Yes, she went to the library.", ar: "✅" },
    ],
  },

  // ⑫ الفرق بين السؤال والإجابة
  {
    kind: "lesson",
    section: E,
    mascot: "🟣",
    step: "12",
    title: "الفرق بين السؤال والإجابة",
    lead: "السؤال:",
    blocks: [
      { type: "english", en: "Did Ali open the door?" },
      { type: "text", text: "الإجابة القصيرة:" },
      { type: "ok", en: "Yes, he did." },
      { type: "text", text: "الإجابة الكاملة:" },
      { type: "ok", en: "Yes, he opened the door." },
      { type: "text", text: "لاحظ:" },
      { type: "text", text: "بعد [[DID]] في السؤال:" },
      { type: "chips", items: ["open"], tone: "base" },
      { type: "text", text: "لكن في الجملة المثبتة الكاملة:" },
      { type: "chips", items: ["opened"], tone: "past" },
    ],
  },

  // ⑬ مقارنة مهمة جداً مع Present Simple
  {
    kind: "lesson",
    section: F,
    mascot: "🧠",
    step: "13",
    title: "مقارنة مهمة جداً مع Present Simple",
    lead: "أنت تعلمت سابقاً:",
    blocks: [
      { type: "text", text: "[[Present Simple]]:" },
      { type: "english", en: "Do you play chess?" },
      { type: "english", en: "Does he play chess?" },
      { type: "text", text: "[[Past Simple]]:" },
      { type: "english", en: "Did you play chess?" },
      { type: "english", en: "Did he play chess?" },
      { type: "text", text: "لاحظ:" },
      { type: "text", text: "[[Present]]:" },
      { type: "english", en: "Do / Does" },
      { type: "text", text: "[[Past]]:" },
      { type: "english", en: "Did" },
      { type: "text", text: "المقارنة" },
      { type: "presentPastToggle", mode: "question" },
    ],
  },

  // ⑭ النفي: Present مقابل Past
  {
    kind: "lesson",
    section: F,
    mascot: "🔥",
    step: "14",
    title: "النفي: Present مقابل Past",
    lead: "[[Present]]:",
    blocks: [
      { type: "english", en: "I don't play tennis.", ar: "أنا لا ألعب التنس." },
      { type: "text", text: "[[Past]]:" },
      { type: "english", en: "I didn't play tennis.", ar: "أنا لم ألعب التنس." },
      { type: "text", text: "[[Present]]:" },
      { type: "english", en: "He doesn't watch documentaries.", ar: "هو لا يشاهد الأفلام الوثائقية." },
      { type: "text", text: "[[Past]]:" },
      { type: "english", en: "He didn't watch documentaries.", ar: "هو لم يشاهد الأفلام الوثائقية." },
      { type: "presentPastToggle", mode: "negative" },
      { type: "text", text: "لاحظ:" },
      { type: "text", text: "[[Present]]:" },
      { type: "english", en: "doesn't + base verb", tone: "equiv" },
      { type: "text", text: "[[Past]]:" },
      { type: "english", en: "didn't + base verb", tone: "equiv" },
    ],
  },

  // ⑮ نقطة عبقرية
  {
    kind: "lesson",
    section: F,
    mascot: "🧠",
    step: "15",
    title: "نقطة عبقرية",
    lead: "قارن:",
    blocks: [
      { type: "geniusLadder" },
      { type: "text", text: "لاحظ كيف اختفت [[s]] واختفى شكل الماضي." },
      { type: "text", text: "لماذا؟" },
      { type: "text", text: "لأن:" },
      { type: "english", en: "does / doesn't" },
      { type: "text", text: "أخذت مسؤولية القاعدة في المضارع." },
      { type: "text", text: "و:" },
      { type: "english", en: "did / didn't" },
      { type: "text", text: "أخذت مسؤولية الماضي." },
      { type: "note", emoji: "🔥", text: "لذلك بعد [[do]] / [[does]] / [[did]]:" },
      { type: "text", text: "الفعل يرجع إلى [[Base Form]]." },
    ],
  },

  // ⑯ أسئلة Wh في الماضي
  {
    kind: "lesson",
    section: G,
    mascot: "🟨",
    step: "16",
    title: "أسئلة Wh في الماضي",
    lead: "الآن نرفع المستوى.",
    blocks: [
      { type: "text", text: "نعرف:" },
      { type: "whMeanings" },
      { type: "text", text: "يمكن استخدامها مع [[DID]]." },
      { type: "text", text: "التركيب:" },
      { type: "formula", key: "wh" },
      { type: "english", en: "Wh-word + did + subject + base verb?", tone: "equiv" },
      { type: "whGrid" },
    ],
  },

  // ⑰ تركيب السؤال الكامل
  {
    kind: "lesson",
    section: G,
    mascot: "🧠",
    step: "17",
    title: "تركيب السؤال الكامل",
    lead: "مثلاً:",
    blocks: [
      { type: "english", en: "She found a strange box in the attic yesterday." },
      { type: "text", text: "يمكننا أن نسأل:" },
      { type: "whFromSentence" },
      { type: "note", emoji: "🔥", text: "لاحظ أن كل الأسئلة تستخدم:" },
      { type: "english", en: "did + subject + base verb", tone: "equiv" },
    ],
  },

  // ⑱ خطأ خطير جداً
  {
    kind: "lesson",
    section: H,
    mascot: "⚠️",
    step: "18",
    title: "خطأ خطير جداً",
    lead: "أربعة أخطاء شهيرة — اضغط على الخطأ لتكشف الصواب.",
    blocks: [
      { type: "dangerBoard" },
      { type: "bad", en: "What did she found?" },
      { type: "text", text: "الصحيح:" },
      { type: "ok", en: "What did she find?" },
      { type: "bad", en: "Where did they went?" },
      { type: "text", text: "الصحيح:" },
      { type: "ok", en: "Where did they go?" },
      { type: "bad", en: "Why did he left?" },
      { type: "text", text: "الصحيح:" },
      { type: "ok", en: "Why did he leave?" },
      { type: "bad", en: "Did you saw the comet?" },
      { type: "text", text: "الصحيح:" },
      { type: "ok", en: "Did you see the comet?" },
    ],
  },

  // ⑲ خطأ آخر مهم: لا نخلط DID مع Verb to be
  {
    kind: "lesson",
    section: H,
    mascot: "🚨",
    step: "19",
    title: "خطأ آخر مهم: لا نخلط DID مع Verb to be",
    lead: "تذكر الدروس السابقة:",
    blocks: [
      { type: "english", en: "am / is / are" },
      { type: "text", text: "وفي الماضي:" },
      { type: "english", en: "was / were" },
      { type: "text", text: "لذلك لا نقول:" },
      { type: "bad", en: "Did he be tired?", why: "❌" },
      { type: "text", text: "إذا كان لدينا [[Verb to be]] في الماضي:" },
      { type: "ok", en: "Was he tired?", ar: "✅" },
      { type: "text", text: "وليس:" },
      { type: "bad", en: "Did he tired?", why: "❌" },
      { type: "text", text: "مثال:" },
      { type: "english", en: "He was nervous." },
      { type: "text", text: "السؤال:" },
      { type: "english", en: "Was he nervous?" },
      { type: "text", text: "النفي:" },
      { type: "english", en: "He wasn't nervous." },
      { type: "text", text: "سنخصص لاحقاً جزءاً كاملاً لـ:" },
      { type: "english", en: "was / were" },
      { type: "text", text: "لذلك لا نريد خلط النظامين." },
      { type: "beVsDidBoard" },
    ],
  },

  // ⑳ DID كفعل أساسي
  {
    kind: "lesson",
    section: I2,
    mascot: "🧠",
    step: "20",
    title: "DID كفعل أساسي",
    lead: "هنا لدينا شيء مهم جداً للطلاب المتقدمين.",
    blocks: [
      { type: "text", text: "أحياناً [[did]] لا يكون فعلاً مساعداً." },
      { type: "text", text: "بل يكون الفعل الأساسي نفسه." },
      { type: "text", text: "مثلاً:" },
      {
        type: "sentence",
        parts: [P("I", "s"), P("did", "vpast"), P("my homework", "o"), P("yesterday", "adv")],
        note: "هنا: did = أنجزت / فعلت — وليس مجرد أداة للسؤال.",
      },
      { type: "text", text: "لكن:" },
      {
        type: "sentence",
        parts: [P("Did", "aux"), P("you", "s"), P("do", "base"), P("your homework", "o")],
        q: true,
        note: "هنا: Did = فعل مساعد — do = الفعل الأساسي",
      },
      { type: "note", emoji: "🔥", text: "لاحظ:" },
      { type: "twoJobsOfDid" },
      { type: "text", text: "الماضي في:" },
      { type: "english", en: "did" },
      { type: "text", text: "والفعل الأساسي:" },
      { type: "english", en: "do" },
    ],
  },

  // ㉑ لعبة صائد الأخطاء
  {
    kind: "ex",
    section: J2,
    mascot: "🎮",
    badge: '🎮 21. لعبة "صائد الأخطاء"',
    title: "صائد الأخطاء",
    subtitle: "حدد الخطأ وأصلحه. فكر قبل رؤية الحل.",
    ex: { type: "errorHunter" },
  },

  // ㉒ تمارين المستوى الأول
  {
    kind: "ex",
    section: J2,
    mascot: "✏️",
    badge: "✏️ 22. تمارين المستوى الأول",
    title: "حوّل إلى النفي",
    subtitle: "حوّل إلى النفي:",
    ex: { type: "negTransform", items: LEVEL1_NEG },
  },

  // ㉓ المستوى الثاني
  {
    kind: "ex",
    section: J2,
    mascot: "✏️",
    badge: "✏️ 23. المستوى الثاني",
    title: "حوّل إلى سؤال",
    subtitle: "حوّل إلى سؤال:",
    ex: { type: "qTransform", items: LEVEL2_Q },
  },

  // ㉔ المستوى الثالث
  {
    kind: "ex",
    section: J2,
    mascot: "✏️",
    badge: "✏️ 24. المستوى الثالث",
    title: "اختر الصحيح",
    subtitle: "اختر الصحيح:",
    ex: { type: "choose", items: LEVEL3_CHOOSE },
  },

  // ㉕ المستوى الرابع — أكمل
  {
    kind: "ex",
    section: J2,
    mascot: "✏️",
    badge: "✏️ 25. المستوى الرابع — أكمل",
    title: "أكمل",
    subtitle: "أكمل:",
    ex: { type: "fill", items: LEVEL4_FILL },
  },

  // ㉖ المستوى الخامس — حوّل الجملة ثلاث مرات
  {
    kind: "ex",
    section: K2,
    mascot: "🧠",
    badge: "🧠 26. المستوى الخامس — حوّل الجملة ثلاث مرات",
    title: "حوّل الجملة ثلاث مرات",
    subtitle: "حوّلها إلى: مثبتة · منفية · سؤال",
    ex: { type: "triple" },
  },

  // ㉗ المستوى السادس — IQ200
  {
    kind: "ex",
    section: K2,
    mascot: "🔥",
    badge: "🔥 27. المستوى السادس — IQ200",
    title: "IQ200",
    subtitle: "فكر بالقاعدة، وليس بالحفظ.",
    ex: { type: "iq200" },
  },

  // ㉘ IQ200 — اكتشف النظام
  {
    kind: "ex",
    section: K2,
    mascot: "🧩",
    badge: "🧩 28. IQ200 — اكتشف النظام",
    title: "اكتشف النظام",
    subtitle: "انظر إلى هذه المجموعة ثم أجب.",
    ex: { type: "pattern" },
  },

  // ㉙ Grammar Detective
  {
    kind: "ex",
    section: L2,
    mascot: "🕵️",
    badge: "🕵️ 29. Grammar Detective",
    title: "Grammar Detective",
    subtitle: "اقرأ الفقرة ثم أجب.",
    ex: { type: "detective" },
  },

  // ㉚ التحدي النهائي
  {
    kind: "ex",
    section: L2,
    mascot: "🏆",
    badge: "🏆 30. التحدي النهائي",
    title: "التحدي النهائي",
    subtitle: "اكتب قصة قصيرة من 8 جمل عن يوم حدث في الماضي.",
    ex: { type: "finalChallenge" },
  },

  // الخاتمة
  { kind: "summary", section: M2, mascot: "🧠", title: "ملخص الدرس" },
  { kind: "keyRule", section: M2, mascot: "⭐", title: "القاعدة الذهبية للدرس 13" },
  { kind: "roadmap", section: M2, mascot: "🚀", title: "خريطة الدروس حتى الآن" },
  { kind: "quiz", section: M2, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: M2, mascot: "🎓", title: "الخاتمة" },
];

// ============================================================
// محتوى ثابت إضافي (من نص المصدر)
// ============================================================

// ㉑ قاعدة اللعبة المشتركة
export const ERROR_HUNTER_RULE = {
  lead: "🔥 القاعدة المشتركة بينها كلها:",
  formula: "DID / DIDN'T + BASE VERB",
};

// ㉙ ملاحظة المحقق
export const DETECTIVE_LEAD = "اقرأ الفقرة:";

// ㉚ التحدي النهائي — العنوان
export const FINAL_CHALLENGE_TITLE = "اكتب قصة قصيرة من 8 جمل عن يوم حدث في الماضي.";

// -------------------- 🎯 أهداف الدرس --------------------
export const OBJECTIVES_13: {
  n: string;
  ar: string;
  items?: { label?: string; en?: string; bad?: boolean }[];
}[] = [
  { n: "①", ar: "تحويل الجملة في الماضي إلى النفي." },
  { n: "②", ar: "تكوين سؤال في [[Past Simple]]." },
  { n: "③", ar: "الإجابة بـ [[Yes]] / [[No]]." },
  { n: "④", ar: "استخدام [[did]] / [[didn't]] مع جميع الضمائر." },
  {
    n: "⑤",
    ar: "فهم لماذا نقول:",
    items: [{ en: "She went." }, { label: "لكن:" }, { en: "Did she go?" }, { en: "She didn't go." }],
  },
  {
    n: "⑥",
    ar: "عدم الوقوع في الخطأ:",
    items: [
      { en: "Did she went?", bad: true },
      { en: "She didn't went.", bad: true },
    ],
  },
  { n: "⑦", ar: "التمييز بين [[did]] كفعل مساعد و [[did]] كفعل أساسي." },
];

// -------------------- ملخص الدرس --------------------
export const SUMMARY_13: { label: string; formula: string; examples: string[]; tone: string }[] = [
  {
    label: "Past Simple مثبت",
    formula: "Subject + Past Verb",
    examples: ["She found the key."],
    tone: "aff",
  },
  {
    label: "Past Simple نفي",
    formula: "Subject + didn't + Base Verb",
    examples: ["She didn't find the key."],
    tone: "neg",
  },
  {
    label: "Past Simple سؤال",
    formula: "Did + Subject + Base Verb?",
    examples: ["Did she find the key?"],
    tone: "q",
  },
  {
    label: "Short Answer",
    formula: "Yes, subject + did. / No, subject + didn't.",
    examples: ["Yes, she did.", "No, she didn't."],
    tone: "short",
  },
  {
    label: "Wh Question",
    formula: "Wh-word + did + Subject + Base Verb?",
    examples: ["Where did she go?", "Why did he leave?", "What did they find?"],
    tone: "wh",
  },
];

// -------------------- القاعدة الذهبية للدرس 13 --------------------
export const KEY_RULE_13 = {
  text: "DID = الماضي، والفعل بعده يرجع إلى الأساس.",
  pairs: [
    { ok: "Did + go", bad: "Did + went" },
    { ok: "Didn't + see", bad: "Didn't + saw" },
    { ok: "Did + write", bad: "Did + wrote" },
    { ok: "Didn't + buy", bad: "Didn't + bought" },
  ],
};

// -------------------- خريطة الدروس حتى الآن --------------------
export const ROADMAP_13: { n: number; en: string; here?: boolean }[] = [
  { n: 1, en: "Sentence Structure" },
  { n: 2, en: "Pronouns + Verb to be" },
  { n: 3, en: "Verb to be — النفي والأسئلة" },
  { n: 4, en: "Nouns + a / an / the" },
  { n: 5, en: "Adjectives" },
  { n: 6, en: "Present Simple — مثبت" },
  { n: 7, en: "Present Simple — نفي وأسئلة" },
  { n: 8, en: "Present Simple — مراجعة شاملة" },
  { n: 9, en: "Present Continuous — الأساس" },
  { n: 10, en: "Present Continuous — الاستخدام المتقدم" },
  { n: 11, en: "Present Simple vs Present Continuous" },
  { n: 12, en: "Past Simple — الجملة المثبتة" },
  { n: 13, en: "Past Simple — did / didn't والأسئلة", here: true },
];

export const ROADMAP_13_NEXT =
  "والخطوة التالية المنطقية ستكون التوسع في **Past Simple Questions + Wh Questions + تطبيق شامل** ثم الانتقال إلى **was / were**، وبعد تثبيت ذلك نبدأ مجموعة **الملكية: my / your / his / her / our / their ثم mine / yours / his / hers / ours / theirs**.";

// -------------------- الغلاف: خطة الدرس --------------------
export const COVER_PLAN_13: string[] = [
  "① تذكير سريع من الدرس السابق.",
  "② ما هو DID؟",
  "③ القاعدة الذهبية — الماضي ينتقل إلى DID.",
  "④ النفي: Subject + didn't + Base Verb.",
  "⑤ أمثلة مع جميع الضمائر.",
  "⑥ لماذا لا نستخدم الماضي بعد DID؟",
  "⑦ حركة الماضي — كرة PAST.",
  "⑧ تكوين السؤال: Did + Subject + Base Verb?",
  "⑨ أمثلة إضافية جديدة.",
  "⑩ الإجابات القصيرة Yes / No.",
  "⑪ انتبه إلى هذه النقطة.",
  "⑫ الفرق بين السؤال والإجابة.",
  "⑬ مقارنة مهمة جداً مع Present Simple.",
  "⑭ النفي: Present مقابل Past.",
  "⑮ نقطة عبقرية: الفعل يرجع إلى Base Form.",
  "⑯ أسئلة Wh في الماضي.",
  "⑰ تركيب السؤال الكامل.",
  "⑱ خطأ خطير جداً.",
  "⑲ لا نخلط DID مع Verb to be.",
  "⑳ DID كفعل أساسي.",
  "🎮 صائد الأخطاء + ستة مستويات من التمارين.",
  "🕵️ Grammar Detective + التحدي النهائي.",
];
