// ============================================================
// محتوى الدرس 2 — الضمائر و Verb to be
// كل شريحة (slide) لها نوع (kind) يحدد طريقة عرضها
// ============================================================

export type Example = { en: string; ar: string; note?: string };

export type Pronoun = {
  en: string;
  ar: string;
  be: "am" | "is" | "are";
  emoji: string;
  hint: string;
};

export type Slide =
  | { kind: "cover" }
  | { kind: "objectives" }
  | {
      kind: "content";
      emoji: string;
      badge: string;
      title: string;
      intro?: string;
      blocks: ContentBlock[];
    }
  | { kind: "pronounGrid"; emoji: string; badge: string; title: string }
  | { kind: "verbTable"; emoji: string; badge: string; title: string }
  | { kind: "exercise"; ex: Exercise }
  | { kind: "quiz" }
  | { kind: "summary" };

export type ContentBlock =
  | { type: "para"; text: string }
  | { type: "example"; ex: Example }
  | { type: "right"; text: string }
  | { type: "wrong"; text: string }
  | { type: "rule"; text: string }
  | { type: "map"; pairs: { from: string; to: string }[] }
  | { type: "callout"; emoji: string; text: string };

// -------------------- الضمائر --------------------
export const PRONOUNS: Pronoun[] = [
  { en: "I", ar: "أنا", be: "am", emoji: "🙋", hint: "عندما أتحدث عن نفسي" },
  { en: "You", ar: "أنت / أنتم", be: "are", emoji: "👉", hint: "عندما أخاطب شخصًا أو أكثر" },
  { en: "He", ar: "هو", be: "is", emoji: "👦", hint: "ذكر واحد" },
  { en: "She", ar: "هي", be: "is", emoji: "👧", hint: "أنثى واحدة" },
  { en: "It", ar: "لغير العاقل", be: "is", emoji: "📦", hint: "شيء أو حيوان مفرد" },
  { en: "We", ar: "نحن", be: "are", emoji: "👨‍👩‍👧", hint: "أنا + آخرون" },
  { en: "They", ar: "هم / هنّ", be: "are", emoji: "👥", hint: "أكثر من شخص أو شيء" },
];

// -------------------- التمارين --------------------
export type Exercise =
  | {
      type: "mc";
      badge: string;
      emoji: string;
      title: string;
      subtitle: string;
      questions: { prompt: string; sub: string; options: string[]; answer: number }[];
    }
  | {
      type: "fill";
      badge: string;
      emoji: string;
      title: string;
      subtitle: string;
      options: string[];
      questions: { before: string; after: string; answer: string; ar: string }[];
    }
  | {
      type: "fix";
      badge: string;
      emoji: string;
      title: string;
      subtitle: string;
      questions: { wrong: string; correct: string }[];
    }
  | {
      type: "transform";
      badge: string;
      emoji: string;
      title: string;
      subtitle: string;
      questions: { given: string; answer: string; hint: string }[];
    };

export const EXERCISES: Exercise[] = [
  {
    type: "mc",
    badge: "التمرين 1",
    emoji: "🎯",
    title: "اختر الضمير الصحيح",
    subtitle: "استبدل الاسم بالضمير المناسب",
    questions: [
      { prompt: "Khalil is a student.", sub: "Khalil =", options: ["He", "She", "They"], answer: 0 },
      { prompt: "Sara is happy.", sub: "Sara =", options: ["He", "She", "It"], answer: 1 },
      { prompt: "Khalil and Adam are friends.", sub: "Khalil and Adam =", options: ["He", "We", "They"], answer: 2 },
      { prompt: "Sara and I are students.", sub: "Sara and I =", options: ["They", "We", "She"], answer: 1 },
      { prompt: "The book is new.", sub: "The book =", options: ["It", "He", "They"], answer: 0 },
    ],
  },
  {
    type: "fill",
    badge: "التمرين 2",
    emoji: "🧩",
    title: "اختر am أو is أو are",
    subtitle: "أكمل كل جملة بالكلمة الصحيحة",
    options: ["am", "is", "are"],
    questions: [
      { before: "I", after: "happy.", answer: "am", ar: "أنا سعيد." },
      { before: "He", after: "a teacher.", answer: "is", ar: "هو معلّم." },
      { before: "She", after: "tired.", answer: "is", ar: "هي متعبة." },
      { before: "We", after: "students.", answer: "are", ar: "نحن طلاب." },
      { before: "They", after: "friends.", answer: "are", ar: "هم أصدقاء." },
      { before: "You", after: "ready.", answer: "are", ar: "أنت جاهز." },
      { before: "It", after: "small.", answer: "is", ar: "إنه صغير." },
    ],
  },
  {
    type: "fix",
    badge: "التمرين 3",
    emoji: "🩹",
    title: "صحّح الخطأ",
    subtitle: "اضغط لإظهار الجملة الصحيحة",
    questions: [
      { wrong: "I is happy.", correct: "I am happy." },
      { wrong: "He are a student.", correct: "He is a student." },
      { wrong: "They is students.", correct: "They are students." },
      { wrong: "She am tired.", correct: "She is tired." },
      { wrong: "We is friends.", correct: "We are friends." },
    ],
  },
  {
    type: "fill",
    badge: "التمرين 4",
    emoji: "✏️",
    title: "أكمل الجملة",
    subtitle: "ضع am / is / are في الفراغ",
    options: ["am", "is", "are"],
    questions: [
      { before: "I", after: "a student.", answer: "am", ar: "أنا طالب." },
      { before: "Khalil", after: "happy.", answer: "is", ar: "خليل سعيد." },
      { before: "Sara", after: "a teacher.", answer: "is", ar: "سارة معلّمة." },
      { before: "We", after: "friends.", answer: "are", ar: "نحن أصدقاء." },
      { before: "They", after: "ready.", answer: "are", ar: "هم جاهزون." },
      { before: "The car", after: "fast.", answer: "is", ar: "السيارة سريعة." },
      { before: "You", after: "smart.", answer: "are", ar: "أنت ذكي." },
    ],
  },
  {
    type: "transform",
    badge: "التحدّي",
    emoji: "🔥",
    title: "حوّل الاسم إلى الضمير المناسب",
    subtitle: "فكّر جيدًا ثم اكشف الإجابة",
    questions: [
      { given: "Mahmoud is a student.", answer: "He is a student.", hint: "محمود = ذكر مفرد" },
      { given: "Mia is happy.", answer: "She is happy.", hint: "ميا = أنثى مفرد" },
      { given: "Mahmoud and Khalil are friends.", answer: "They are friends.", hint: "شخصان" },
      { given: "Mia and I are students.", answer: "We are students.", hint: "أنا + شخص آخر" },
      { given: "The dog is small.", answer: "It is small.", hint: "حيوان مفرد" },
    ],
  },
];

// -------------------- الشرائح --------------------
export const SLIDES: Slide[] = [
  { kind: "cover" },
  { kind: "objectives" },
  {
    kind: "content",
    emoji: "🔁",
    badge: "مراجعة سريعة",
    title: "تذكّر من الدرس السابق",
    intro: "الجملة الإنجليزية غالبًا تكون على هذا الترتيب:",
    blocks: [
      { type: "callout", emoji: "🧱", text: "Subject + Verb + Object" },
      { type: "example", ex: { en: "Khalil plays football.", ar: "خليل يلعب كرة القدم." } },
      {
        type: "map",
        pairs: [
          { from: "Khalil", to: "Subject (الفاعل)" },
          { from: "plays", to: "Verb (الفعل)" },
          { from: "football", to: "Object (المفعول)" },
        ],
      },
      { type: "para", text: "لكن اليوم سنكتشف شيئًا مهمًا: ليس دائمًا يكون الـ Verb فعلًا حركيًا مثل:" },
      {
        type: "map",
        pairs: [
          { from: "eat", to: "يأكل" },
          { from: "play", to: "يلعب" },
          { from: "read", to: "يقرأ" },
          { from: "run", to: "يركض" },
        ],
      },
      { type: "para", text: "أحيانًا نستخدم فعلًا خاصًا يُسمّى Verb to be." },
    ],
  },
  {
    kind: "content",
    emoji: "❓",
    badge: "المفهوم",
    title: "ما هو Verb to be؟",
    intro: "معناه تقريبًا «يكون»، لكن في العربية غالبًا لا نترجمه بشكل مباشر.",
    blocks: [
      { type: "example", ex: { en: "I am a student.", ar: "أنا طالب.", note: "am من Verb to be" } },
      { type: "example", ex: { en: "She is happy.", ar: "هي سعيدة.", note: "is من Verb to be" } },
      { type: "example", ex: { en: "They are students.", ar: "هم طلاب.", note: "are من Verb to be" } },
      { type: "callout", emoji: "🔑", text: "إذن لدينا ثلاث كلمات أساسية: am · is · are" },
    ],
  },
  {
    kind: "content",
    emoji: "🪄",
    badge: "الضمائر",
    title: "ما هي الضمائر؟ (Pronouns)",
    intro: "الضمير كلمة نستخدمها بدل اسم الشخص أو الشيء حتى لا نكرّره.",
    blocks: [
      { type: "para", text: "بدل أن نقول:" },
      { type: "example", ex: { en: "Khalil is a student. Khalil is smart. Khalil is happy.", ar: "خليل طالب. خليل ذكي. خليل سعيد." } },
      { type: "para", text: "يمكننا أن نقول:" },
      { type: "example", ex: { en: "Khalil is a student. He is smart. He is happy.", ar: "خليل طالب. هو ذكي. هو سعيد." } },
      { type: "callout", emoji: "✨", text: "استبدلنا Khalil بـ He — وهذا هو عمل الضمير." },
    ],
  },
  { kind: "pronounGrid", emoji: "🎴", badge: "القائمة", title: "الضمائر الأساسية السبعة" },
  {
    kind: "content",
    emoji: "🙋",
    badge: "ضمير · 1",
    title: "I = أنا",
    intro: "نستخدم I عندما نتحدث عن أنفسنا.",
    blocks: [
      { type: "example", ex: { en: "I am a student.", ar: "أنا طالب." } },
      { type: "example", ex: { en: "I am happy.", ar: "أنا سعيد." } },
      { type: "example", ex: { en: "I play football.", ar: "أنا ألعب كرة القدم." } },
      { type: "right", text: "I  ← تُكتب دائمًا بحرف كبير" },
      { type: "wrong", text: "i  ← خطأ شائع" },
    ],
  },
  {
    kind: "content",
    emoji: "👉",
    badge: "ضمير · 2",
    title: "You = أنت / أنتم",
    intro: "نستخدم You عند مخاطبة شخص واحد أو أكثر.",
    blocks: [
      { type: "example", ex: { en: "You are a student.", ar: "أنت طالب.", note: "لشخص واحد" } },
      { type: "example", ex: { en: "You are students.", ar: "أنتم طلاب.", note: "لأكثر من شخص" } },
      { type: "callout", emoji: "💡", text: "نفهم المقصود (مفرد أم جمع) من سياق الجملة." },
    ],
  },
  {
    kind: "content",
    emoji: "👦",
    badge: "ضمير · 3",
    title: "He = هو",
    intro: "نستخدم He عندما نتحدث عن ذكر واحد.",
    blocks: [
      { type: "example", ex: { en: "Khalil is a student.  →  He is a student.", ar: "خليل طالب. ← هو طالب." } },
      { type: "example", ex: { en: "Adam is happy.  →  He is happy.", ar: "آدم سعيد. ← هو سعيد." } },
      {
        type: "map",
        pairs: [
          { from: "Khalil", to: "He" },
          { from: "Adam", to: "He" },
          { from: "Mahmoud", to: "He" },
          { from: "The boy", to: "He" },
        ],
      },
    ],
  },
  {
    kind: "content",
    emoji: "👧",
    badge: "ضمير · 4",
    title: "She = هي",
    intro: "نستخدم She عندما نتحدث عن أنثى واحدة.",
    blocks: [
      { type: "example", ex: { en: "Sara is a student.  →  She is a student.", ar: "سارة طالبة. ← هي طالبة." } },
      { type: "example", ex: { en: "Mia is happy.  →  She is happy.", ar: "ميا سعيدة. ← هي سعيدة." } },
      {
        type: "map",
        pairs: [
          { from: "Sara", to: "She" },
          { from: "Mia", to: "She" },
          { from: "The girl", to: "She" },
        ],
      },
    ],
  },
  {
    kind: "content",
    emoji: "📦",
    badge: "ضمير · 5",
    title: "It = لغير العاقل",
    intro: "نستخدمها مع الأشياء والحيوانات المفردة عندما لا نتحدث عنها كذكر أو أنثى.",
    blocks: [
      { type: "example", ex: { en: "The book is new.  →  It is new.", ar: "الكتاب جديد. ← إنه جديد." } },
      { type: "example", ex: { en: "The car is fast.  →  It is fast.", ar: "السيارة سريعة. ← إنها سريعة." } },
      { type: "example", ex: { en: "The cat is small.  →  It is small.", ar: "القطة صغيرة. ← إنها صغيرة." } },
      { type: "callout", emoji: "🐾", text: "It = شيء أو حيوان مفرد عندما لا نستخدم he أو she." },
    ],
  },
  {
    kind: "content",
    emoji: "👨‍👩‍👧",
    badge: "ضمير · 6",
    title: "We = نحن",
    intro: "نستخدم We عندما نتحدث عن أنفسنا مع شخص أو أشخاص آخرين.",
    blocks: [
      { type: "example", ex: { en: "Khalil and I are students.  →  We are students.", ar: "خليل وأنا طلاب. ← نحن طلاب." } },
      { type: "example", ex: { en: "My friend and I are happy.  →  We are happy.", ar: "صديقي وأنا سعيدان. ← نحن سعداء." } },
      { type: "callout", emoji: "➕", text: "I + شخص آخر  =  غالبًا We" },
    ],
  },
  {
    kind: "content",
    emoji: "👥",
    badge: "ضمير · 7",
    title: "They = هم / هنّ",
    intro: "نستخدم They عندما نتحدث عن أكثر من شخص أو أكثر من شيء.",
    blocks: [
      { type: "example", ex: { en: "Khalil and Adam are students.  →  They are students.", ar: "خليل وآدم طلاب. ← هم طلاب." } },
      { type: "example", ex: { en: "Sara and Mia are happy.  →  They are happy.", ar: "سارة وميا سعيدتان. ← هنّ سعيدات." } },
      { type: "example", ex: { en: "The books are new.  →  They are new.", ar: "الكتب جديدة. ← إنها جديدة." } },
      { type: "callout", emoji: "🔢", text: "شخص واحد ← He / She   |   أكثر من شخص ← They" },
    ],
  },
  { kind: "verbTable", emoji: "🧠", badge: "الأهم", title: "Verb to be مع الضمائر" },
  {
    kind: "content",
    emoji: "⭐",
    badge: "القاعدة الذهبية",
    title: "لكل كلمة ضمائرها",
    intro: "ثلاث كلمات فقط: am · is · are — ولكل واحدة ضمائر محددة.",
    blocks: [
      { type: "right", text: "I am ✅" },
      { type: "wrong", text: "I is ❌   ·   I are ❌" },
      { type: "right", text: "He is ✅   ·   She is ✅   ·   It is ✅" },
      { type: "wrong", text: "He are ❌   ·   She am ❌" },
      { type: "right", text: "You are ✅   ·   We are ✅   ·   They are ✅" },
      { type: "wrong", text: "You is ❌   ·   We is ❌   ·   They is ❌" },
    ],
  },
  {
    kind: "content",
    emoji: "🤔",
    badge: "لماذا؟",
    title: "لماذا نحتاج Verb to be؟",
    intro: "في العربية نقول «أنا طالب» بدون فعل، لكن الإنجليزية تحتاج Verb to be.",
    blocks: [
      { type: "wrong", text: "I a student. ❌   ·   He happy. ❌   ·   She tall. ❌" },
      { type: "right", text: "I am a student. ✅   ·   He is happy. ✅   ·   She is tall. ✅" },
      { type: "callout", emoji: "🏗️", text: "Verb to be أساس مهم جدًا في تكوين هذا النوع من الجمل." },
    ],
  },
  {
    kind: "content",
    emoji: "1️⃣",
    badge: "أمثلة",
    title: "جمل باستخدام am",
    intro: "جميعها تبدأ بـ I am",
    blocks: [
      { type: "example", ex: { en: "I am a student.", ar: "أنا طالب." } },
      { type: "example", ex: { en: "I am happy.", ar: "أنا سعيد." } },
      { type: "example", ex: { en: "I am tired.", ar: "أنا متعب." } },
      { type: "example", ex: { en: "I am ready.", ar: "أنا جاهز." } },
    ],
  },
  {
    kind: "content",
    emoji: "2️⃣",
    badge: "أمثلة",
    title: "جمل باستخدام is",
    intro: "مع He / She / It",
    blocks: [
      { type: "example", ex: { en: "He is a teacher.", ar: "هو معلّم." } },
      { type: "example", ex: { en: "She is a student.", ar: "هي طالبة." } },
      { type: "example", ex: { en: "She is beautiful.", ar: "هي جميلة." } },
      { type: "example", ex: { en: "It is small.", ar: "إنه صغير." } },
    ],
  },
  {
    kind: "content",
    emoji: "3️⃣",
    badge: "أمثلة",
    title: "جمل باستخدام are",
    intro: "مع You / We / They",
    blocks: [
      { type: "example", ex: { en: "You are a student.", ar: "أنت طالب." } },
      { type: "example", ex: { en: "We are friends.", ar: "نحن أصدقاء." } },
      { type: "example", ex: { en: "They are students.", ar: "هم طلاب." } },
      { type: "example", ex: { en: "They are ready.", ar: "هم جاهزون." } },
    ],
  },
  {
    kind: "content",
    emoji: "🔍",
    badge: "انتبه",
    title: "لاحظ كيف يتغيّر Verb to be",
    intro: "نفس المعنى تقريبًا، لكن الكلمة تتغيّر حسب الضمير:",
    blocks: [
      { type: "example", ex: { en: "I am a student.", ar: "أنا طالب." } },
      { type: "example", ex: { en: "He is a student.", ar: "هو طالب." } },
      { type: "example", ex: { en: "They are students.", ar: "هم طلاب." } },
      {
        type: "map",
        pairs: [
          { from: "I", to: "am" },
          { from: "He", to: "is" },
          { from: "They", to: "are" },
        ],
      },
      { type: "callout", emoji: "🏗️", text: "على هذا الأساس سنبني قواعد كثيرة لاحقًا." },
    ],
  },
  {
    kind: "content",
    emoji: "🔄",
    badge: "مهارة",
    title: "كيف أحوّل الاسم إلى ضمير؟",
    intro: "قاعدة بسيطة حسب النوع والعدد:",
    blocks: [
      { type: "example", ex: { en: "Khalil is happy.  →  He is happy.", ar: "ذكر مفرد ← He" } },
      { type: "example", ex: { en: "Sara is happy.  →  She is happy.", ar: "أنثى مفرد ← She" } },
      { type: "example", ex: { en: "Khalil and Adam are happy.  →  They are happy.", ar: "شخصان ← They" } },
      { type: "example", ex: { en: "Sara and I are students.  →  We are students.", ar: "أنا + آخر ← We" } },
      { type: "example", ex: { en: "The book is new.  →  It is new.", ar: "شيء مفرد ← It" } },
    ],
  },
  {
    kind: "content",
    emoji: "🧩",
    badge: "حيلة ذكية",
    title: "طريقة سهلة لحفظ الضمائر",
    intro: "قسّمها إلى ثلاث مجموعات:",
    blocks: [
      { type: "callout", emoji: "①", text: "الشخص الأول:  I = أنا  ·  We = نحن" },
      { type: "callout", emoji: "②", text: "الشخص الثاني:  You = أنت / أنتم" },
      { type: "callout", emoji: "③", text: "الشخص الثالث:  He · She · It · They" },
      { type: "para", text: "هذا التقسيم مهم جدًا لأننا سنستخدمه لاحقًا عند دراسة الأزمنة." },
    ],
  },
  {
    kind: "content",
    emoji: "🔥",
    badge: "سرّ للمستقبل",
    title: "هذه ليست كلمات فحسب… بل نمط!",
    intro: "احفظ النمط، لا الكلمات فقط:",
    blocks: [
      { type: "right", text: "I  →  am" },
      { type: "right", text: "He / She / It  →  is   (المفرد الغائب)" },
      { type: "right", text: "You / We / They  →  are" },
      { type: "callout", emoji: "🔮", text: "هذا النمط سيظهر معنا مرة أخرى في قواعد كثيرة قادمة." },
    ],
  },
  { kind: "exercise", ex: EXERCISES[0] },
  { kind: "exercise", ex: EXERCISES[1] },
  { kind: "exercise", ex: EXERCISES[2] },
  { kind: "exercise", ex: EXERCISES[3] },
  { kind: "exercise", ex: EXERCISES[4] },
  { kind: "quiz" },
  { kind: "summary" },
];
