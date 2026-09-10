// ============================================================
// الدرس 1 — تكوين الجملة الإنجليزية (Sentence Structure)
// ============================================================

export type Role = "S" | "V" | "O";
export type Token = { text: string; role?: Role };
export type Sentence = { tokens: Token[]; ar: string };

export const ROLE_INFO: Record<Role, { en: string; ar: string; q: string; emoji: string }> = {
  S: { en: "Subject", ar: "الفاعل", q: "من يقوم بالفعل؟", emoji: "🧑" },
  V: { en: "Verb", ar: "الفعل", q: "ماذا يفعل؟", emoji: "⚡" },
  O: { en: "Object", ar: "المفعول به", q: "على ماذا وقع الفعل؟", emoji: "🎯" },
};

/** كتابة سريعة للجمل: "The_boy:S runs:V" — الشرطة السفلية = مسافة، الكلمة بدون دور تبقى محايدة */
export function sent(spec: string, ar: string): Sentence {
  const tokens: Token[] = spec.split(" ").map((w) => {
    const [text, role] = w.split(":");
    return { text: text.replace(/_/g, " "), role: role as Role | undefined };
  });
  return { tokens, ar };
}

export type Block =
  | { type: "text"; text: string }
  | { type: "term"; en: string; ar: string; desc?: string; role?: Role }
  | { type: "roles"; roles: Role[]; withQ?: boolean }
  | { type: "formula"; roles: Role[]; example?: string[]; big?: boolean }
  | { type: "plain"; en: string; ar: string }
  | { type: "sentence"; s: Sentence; hide?: boolean }
  | { type: "qa"; sentence: string; q: string; a: string; role: Role }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; ar?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "patterns" }
  | { type: "steps" }
  | { type: "build"; rows: { s: string; v: string; o: string; ar: string }[] };

export type Exercise =
  | { type: "tag"; roles: Role[]; items: Sentence[] }
  | { type: "order"; items: { scrambled: string[]; correct: string[]; ar: string }[] }
  | {
      type: "compose";
      items: { s: string; sAr: string; v: string; vAr: string; objects: { en: string; ar: string }[] }[];
    };

export type Slide = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step: number; title: string; lead?: string; blocks: Block[]; tip?: string }
  | { kind: "builder"; title: string }
  | { kind: "pronouns"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "exercise"; title: string; subtitle: string; badge: string; ex: Exercise }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

// -------------------- ورشة بناء الجمل --------------------
export type Conj = "I" | "You" | "He" | "She" | "We" | "They";

export const BUILDER = {
  subjects: [
    { en: "I", ar: "أنا", conj: "I" as Conj },
    { en: "You", ar: "أنت", conj: "You" as Conj },
    { en: "He", ar: "هو", conj: "He" as Conj },
    { en: "She", ar: "هي", conj: "She" as Conj },
    { en: "We", ar: "نحن", conj: "We" as Conj },
    { en: "They", ar: "هم", conj: "They" as Conj },
    { en: "Khalil", ar: "خليل", conj: "He" as Conj },
    { en: "Sara", ar: "سارة", conj: "She" as Conj },
  ],
  verbs: [
    { base: "eat", s: "eats", ar: { I: "آكل", You: "تأكل", He: "يأكل", She: "تأكل", We: "نأكل", They: "يأكلون" } },
    { base: "drink", s: "drinks", ar: { I: "أشرب", You: "تشرب", He: "يشرب", She: "تشرب", We: "نشرب", They: "يشربون" } },
    { base: "read", s: "reads", ar: { I: "أقرأ", You: "تقرأ", He: "يقرأ", She: "تقرأ", We: "نقرأ", They: "يقرؤون" } },
    { base: "play", s: "plays", ar: { I: "ألعب", You: "تلعب", He: "يلعب", She: "تلعب", We: "نلعب", They: "يلعبون" } },
    { base: "watch", s: "watches", ar: { I: "أشاهد", You: "تشاهد", He: "يشاهد", She: "تشاهد", We: "نشاهد", They: "يشاهدون" } },
    { base: "study", s: "studies", ar: { I: "أدرس", You: "تدرس", He: "يدرس", She: "تدرس", We: "ندرس", They: "يدرسون" } },
    { base: "open", s: "opens", ar: { I: "أفتح", You: "تفتح", He: "يفتح", She: "تفتح", We: "نفتح", They: "يفتحون" } },
    { base: "like", s: "likes", ar: { I: "أحب", You: "تحب", He: "يحب", She: "تحب", We: "نحب", They: "يحبون" } },
  ],
  objects: [
    { en: "apples", ar: "التفاح" },
    { en: "water", ar: "الماء" },
    { en: "a book", ar: "كتابًا" },
    { en: "books", ar: "الكتب" },
    { en: "football", ar: "كرة القدم" },
    { en: "TV", ar: "التلفاز" },
    { en: "English", ar: "الإنجليزية" },
    { en: "the door", ar: "الباب" },
    { en: "milk", ar: "الحليب" },
  ],
};

export const PRONOUNS_PREVIEW = [
  { en: "I", ar: "أنا", emoji: "🙋" },
  { en: "You", ar: "أنت / أنتم", emoji: "👉" },
  { en: "He", ar: "هو", emoji: "👦" },
  { en: "She", ar: "هي", emoji: "👧" },
  { en: "It", ar: "هو / هي لغير العاقل", emoji: "📦" },
  { en: "We", ar: "نحن", emoji: "👨‍👩‍👧" },
  { en: "They", ar: "هم / هنّ", emoji: "👥" },
];

// -------------------- الشرائح --------------------
const START = "البداية";
const EXPLAIN = "الشرح";
const WRAP = "الخلاصة";
const PRACTICE = "التمارين";
const END = "الختام";

export const SLIDES: Slide[] = [
  { kind: "cover", section: START, mascot: "🧱" },
  { kind: "objectives", section: START, mascot: "🎯" },

  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "💬",
    step: 1,
    title: "ما هي الجملة؟",
    lead: "الجملة هي مجموعة كلمات تعطي معنى كاملًا.",
    blocks: [
      { type: "term", en: "Sentence", ar: "جملة" },
      { type: "plain", en: "I eat.", ar: "أنا آكل." },
      { type: "note", emoji: "✅", text: "هذه جملة صحيحة لأن معناها كامل." },
      { type: "plain", en: "Khalil plays football.", ar: "خليل يلعب كرة القدم." },
    ],
  },
  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "📏",
    step: 2,
    title: "أهم قاعدة في اللغة الإنجليزية",
    lead: "في العربية نستطيع أحيانًا تغيير ترتيب الكلمات، لكن في الإنجليزية ترتيب الكلمات مهم جدًا.",
    blocks: [
      { type: "text", text: "أبسط شكل للجملة الإنجليزية هو:" },
      { type: "formula", roles: ["S", "V"] },
      { type: "sentence", s: sent("I:S eat:V", "أنا آكل.") },
      { type: "sentence", s: sent("Khalil:S runs:V", "خليل يركض.") },
      { type: "sentence", s: sent("Sara:S sleeps:V", "سارة تنام.") },
    ],
    tip: "ابدأ دائمًا بالفاعل، ثم الفعل — هذا هو الترتيب الطبيعي في الإنجليزية.",
  },
  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "🧑",
    step: 3,
    title: "ما هو الـ Subject؟",
    lead: "اسأل دائمًا: من الذي يقوم بالفعل؟",
    blocks: [
      { type: "term", en: "Subject", ar: "الفاعل", role: "S", desc: "الشخص أو الشيء الذي يقوم بالفعل." },
      { type: "qa", sentence: "Khalil plays football.", q: "من الذي يلعب؟", a: "Khalil", role: "S" },
      { type: "qa", sentence: "The boy runs.", q: "من الذي يركض؟", a: "The boy", role: "S" },
      { type: "qa", sentence: "The cat sleeps.", q: "من الذي ينام؟", a: "The cat", role: "S" },
    ],
  },
  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "⚡",
    step: 4,
    title: "ما هو الـ Verb؟",
    lead: "اسأل دائمًا: ماذا يفعل الفاعل؟",
    blocks: [
      { type: "term", en: "Verb", ar: "الفعل", role: "V", desc: "الشيء الذي يقوم به الفاعل." },
      { type: "sentence", s: sent("Khalil:S plays:V football", "خليل يلعب كرة القدم.") },
      { type: "sentence", s: sent("The_boy:S runs:V", "الولد يركض.") },
      { type: "sentence", s: sent("Sara:S reads:V a_book", "سارة تقرأ كتابًا.") },
      { type: "roles", roles: ["S", "V"], withQ: true },
    ],
  },
  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "🎯",
    step: 5,
    title: "إضافة المفعول به Object",
    lead: "أحيانًا لا تتوقف الجملة عند الفاعل والفعل، بل نضيف شيئًا وقع عليه الفعل.",
    blocks: [
      { type: "term", en: "Object", ar: "المفعول به", role: "O" },
      { type: "sentence", s: sent("Khalil:S eats:V an_apple:O", "خليل يأكل تفاحة.") },
      { type: "qa", sentence: "Khalil eats an apple.", q: "من يأكل؟", a: "Khalil", role: "S" },
      { type: "qa", sentence: "Khalil eats an apple.", q: "ماذا يأكل؟", a: "an apple", role: "O" },
      { type: "formula", roles: ["S", "V", "O"], example: ["Khalil", "eats", "an apple"] },
    ],
  },
  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "🏗️",
    step: 6,
    title: "الشكل الأساسي للجملة",
    lead: "احفظ هذه القاعدة جيدًا:",
    blocks: [
      { type: "formula", roles: ["S", "V", "O"], big: true },
      { type: "sentence", s: sent("I:S eat:V apples:O", "أنا آكل التفاح.") },
      { type: "sentence", s: sent("She:S reads:V books:O", "هي تقرأ الكتب.") },
      { type: "sentence", s: sent("They:S play:V football:O", "هم يلعبون كرة القدم.") },
    ],
    tip: "فاعل + فعل + مفعول به — ثلاث قطع تُبنى بها معظم الجمل البسيطة.",
  },
  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "🔍",
    step: 7,
    title: "أمثلة إضافية",
    lead: "اقرأ كل جملة وحاول تحديد أجزائها قبل أن تكشفها:",
    blocks: [
      { type: "sentence", hide: true, s: sent("I:S drink:V water:O", "أنا أشرب الماء.") },
      { type: "sentence", hide: true, s: sent("Mahmoud:S watches:V TV:O", "محمود يشاهد التلفاز.") },
      { type: "sentence", hide: true, s: sent("The_girl:S opens:V the_door:O", "البنت تفتح الباب.") },
      { type: "sentence", hide: true, s: sent("We:S study:V English:O", "نحن ندرس الإنجليزية.") },
    ],
  },
  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "⚠️",
    step: 8,
    title: "انتبه! ليس في كل جملة Object",
    lead: "هذه نقطة مهمة جدًا: أحيانًا تكون الجملة فاعلًا وفعلًا فقط.",
    blocks: [
      { type: "sentence", s: sent("I:S sleep:V", "أنا أنام.") },
      { type: "bad", en: "I sleep something.", ar: "لا يوجد مفعول به هنا، لأننا لا نقول هذا." },
      { type: "text", text: "إذن ليس شرطًا أن تحتوي كل جملة على مفعول به. لدينا نمطان:" },
      { type: "patterns" },
    ],
  },
  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "🛠️",
    step: 9,
    title: "كيف أبني جملة بنفسي؟",
    lead: "استخدم هذه الخطوات الثلاث:",
    blocks: [
      { type: "steps" },
      {
        type: "build",
        rows: [
          { s: "I", v: "eat", o: "apples", ar: "أنا آكل التفاح." },
          { s: "She", v: "reads", o: "books", ar: "هي تقرأ الكتب." },
          { s: "They", v: "play", o: "football", ar: "هم يلعبون كرة القدم." },
        ],
      },
    ],
  },
  { kind: "builder", section: EXPLAIN, mascot: "🧩", title: "ورشة بناء الجمل — جرّب بنفسك!" },
  { kind: "pronouns", section: EXPLAIN, mascot: "🙋", title: "أهم الضمائر التي سنحتاجها لاحقًا" },
  {
    kind: "lesson",
    section: EXPLAIN,
    mascot: "⭐",
    step: 11,
    title: "قاعدة مهمة جدًا",
    lead: "في الإنجليزية لا نستطيع عادةً أن نحذف الفاعل.",
    blocks: [
      { type: "bad", en: "Eat apples.", ar: "إذا كنا نقصد: أنا آكل التفاح." },
      { type: "text", text: "يجب أن نذكر الفاعل:" },
      { type: "ok", en: "I eat apples.", ar: "أنا آكل التفاح." },
      { type: "note", emoji: "🧭", text: "من أهم ما ستتعلمه: الجملة الإنجليزية تحتاج إلى ترتيب واضح." },
      { type: "formula", roles: ["S", "V", "O"], example: ["I", "eat", "apples"] },
    ],
  },

  { kind: "summary", section: WRAP, mascot: "🧠", title: "ملخص الدرس" },

  {
    kind: "exercise",
    section: PRACTICE,
    mascot: "✏️",
    badge: "التمرين 1",
    title: "حدّد الـ Subject والـ Verb",
    subtitle: "اضغط على كل كلمة لاختيار دورها، ثم اضغط «تحقق»",
    ex: {
      type: "tag",
      roles: ["S", "V"],
      items: [
        sent("I:S read:V", "أنا أقرأ."),
        sent("Sara:S runs:V", "سارة تركض."),
        sent("They:S swim:V", "هم يسبحون."),
        sent("The_boy:S eats:V", "الولد يأكل."),
        sent("We:S study:V", "نحن ندرس."),
      ],
    },
  },
  {
    kind: "exercise",
    section: PRACTICE,
    mascot: "🧩",
    badge: "التمرين 2",
    title: "حدّد أجزاء الجملة",
    subtitle: "Subject · Verb · Object — اضغط على الكلمة لتغيير دورها",
    ex: {
      type: "tag",
      roles: ["S", "V", "O"],
      items: [
        sent("I:S drink:V water:O", "أنا أشرب الماء."),
        sent("Khalil:S plays:V football:O", "خليل يلعب كرة القدم."),
        sent("She:S reads:V a_book:O", "هي تقرأ كتابًا."),
        sent("They:S watch:V TV:O", "هم يشاهدون التلفاز."),
        sent("The_cat:S drinks:V milk:O", "القطة تشرب الحليب."),
      ],
    },
  },
  {
    kind: "exercise",
    section: PRACTICE,
    mascot: "🔀",
    badge: "التمرين 3",
    title: "رتّب الكلمات",
    subtitle: "اضغط على الكلمات بالترتيب الصحيح لتكوين جملة",
    ex: {
      type: "order",
      items: [
        { scrambled: ["eat", "I", "apples"], correct: ["I", "eat", "apples"], ar: "أنا آكل التفاح." },
        { scrambled: ["football", "play", "They"], correct: ["They", "play", "football"], ar: "هم يلعبون كرة القدم." },
        { scrambled: ["reads", "Sara", "books"], correct: ["Sara", "reads", "books"], ar: "سارة تقرأ الكتب." },
        { scrambled: ["water", "drink", "We"], correct: ["We", "drink", "water"], ar: "نحن نشرب الماء." },
        { scrambled: ["TV", "watches", "Khalil"], correct: ["Khalil", "watches", "TV"], ar: "خليل يشاهد التلفاز." },
      ],
    },
  },
  {
    kind: "exercise",
    section: PRACTICE,
    mascot: "🎨",
    badge: "التمرين 4",
    title: "كوّن جملة",
    subtitle: "أكمل كل جملة بمفعول به مناسب",
    ex: {
      type: "compose",
      items: [
        {
          s: "I",
          sAr: "أنا",
          v: "eat",
          vAr: "آكل",
          objects: [
            { en: "apples", ar: "التفاح" },
            { en: "bread", ar: "الخبز" },
            { en: "rice", ar: "الأرز" },
            { en: "an apple", ar: "تفاحة" },
          ],
        },
        {
          s: "She",
          sAr: "هي",
          v: "reads",
          vAr: "تقرأ",
          objects: [
            { en: "books", ar: "الكتب" },
            { en: "a book", ar: "كتابًا" },
            { en: "a story", ar: "قصة" },
            { en: "a letter", ar: "رسالة" },
          ],
        },
        {
          s: "They",
          sAr: "هم",
          v: "play",
          vAr: "يلعبون",
          objects: [
            { en: "football", ar: "كرة القدم" },
            { en: "tennis", ar: "التنس" },
            { en: "games", ar: "الألعاب" },
            { en: "basketball", ar: "كرة السلة" },
          ],
        },
        {
          s: "We",
          sAr: "نحن",
          v: "study",
          vAr: "ندرس",
          objects: [
            { en: "English", ar: "الإنجليزية" },
            { en: "math", ar: "الرياضيات" },
            { en: "science", ar: "العلوم" },
            { en: "history", ar: "التاريخ" },
          ],
        },
        {
          s: "He",
          sAr: "هو",
          v: "drinks",
          vAr: "يشرب",
          objects: [
            { en: "water", ar: "الماء" },
            { en: "milk", ar: "الحليب" },
            { en: "tea", ar: "الشاي" },
            { en: "juice", ar: "العصير" },
          ],
        },
      ],
    },
  },

  { kind: "closing", section: END, mascot: "🏆", title: "قاعدة اليوم" },
];
