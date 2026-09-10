// ============================================================
// الدرس 4 — الأسماء وأدوات التعريف: Nouns + a / an / the
// ============================================================

export type Art = "a" | "an" | "the";
export type Cat = "person" | "place" | "animal" | "thing";
export type Kind = "noun" | "adj" | "verb";

export const CAT_INFO: Record<Cat, { ar: string; emoji: string; solid: string; soft: string; border: string; text: string }> = {
  person: { ar: "شخص", emoji: "👤", solid: "bg-violet-500", soft: "bg-violet-50", border: "border-violet-300", text: "text-violet-700" },
  place: { ar: "مكان", emoji: "🏫", solid: "bg-sky-500", soft: "bg-sky-50", border: "border-sky-300", text: "text-sky-700" },
  animal: { ar: "حيوان", emoji: "🐱", solid: "bg-orange-500", soft: "bg-orange-50", border: "border-orange-300", text: "text-orange-700" },
  thing: { ar: "شيء", emoji: "📚", solid: "bg-emerald-500", soft: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700" },
};

export const ART_INFO: Record<Art, { ar: string; solid: string; soft: string; border: string; text: string; desc: string; emoji: string }> = {
  a: { ar: "قبل اسم مفرد يبدأ بصوت ساكن", solid: "bg-violet-500", soft: "bg-violet-50", border: "border-violet-300", text: "text-violet-700", desc: "واحد غير محدد", emoji: "🟣" },
  an: { ar: "قبل اسم مفرد يبدأ بصوت علة", solid: "bg-sky-500", soft: "bg-sky-50", border: "border-sky-300", text: "text-sky-700", desc: "واحد غير محدد", emoji: "🔵" },
  the: { ar: "لشيء محدد ومعروف", solid: "bg-amber-500", soft: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", desc: "المحدد الذي نعرفه", emoji: "🟡" },
};

export const VOWELS = ["a", "e", "i", "o", "u"];

/** يكتشف أداة التنكير المناسبة حسب صوت بداية الكلمة */
export function pickAn(word: string): "a" | "an" {
  const w = word.trim().toLowerCase();
  return VOWELS.includes(w[0] ?? "") ? "an" : "a";
}

// -------------------- قوائم الكلمات --------------------
export interface NounW {
  en: string;
  ar: string;
  cat: Cat;
  vowel: boolean;
  plural: string;
  pluralAr: string;
}

export const NOUNS: NounW[] = [
  { en: "teacher", ar: "معلّم", cat: "person", vowel: false, plural: "teachers", pluralAr: "معلّمون" },
  { en: "student", ar: "طالب", cat: "person", vowel: false, plural: "students", pluralAr: "طلاب" },
  { en: "boy", ar: "ولد", cat: "person", vowel: false, plural: "boys", pluralAr: "أولاد" },
  { en: "girl", ar: "بنت", cat: "person", vowel: false, plural: "girls", pluralAr: "بنات" },
  { en: "engineer", ar: "مهندس", cat: "person", vowel: true, plural: "engineers", pluralAr: "مهندسون" },
  { en: "actor", ar: "ممثل", cat: "person", vowel: true, plural: "actors", pluralAr: "ممثلون" },
  { en: "school", ar: "مدرسة", cat: "place", vowel: false, plural: "schools", pluralAr: "مدارس" },
  { en: "house", ar: "منزل", cat: "place", vowel: false, plural: "houses", pluralAr: "منازل" },
  { en: "city", ar: "مدينة", cat: "place", vowel: false, plural: "cities", pluralAr: "مدن" },
  { en: "room", ar: "غرفة", cat: "place", vowel: false, plural: "rooms", pluralAr: "غرف" },
  { en: "cat", ar: "قطة", cat: "animal", vowel: false, plural: "cats", pluralAr: "قطط" },
  { en: "dog", ar: "كلب", cat: "animal", vowel: false, plural: "dogs", pluralAr: "كلاب" },
  { en: "bird", ar: "طائر", cat: "animal", vowel: false, plural: "birds", pluralAr: "طيور" },
  { en: "book", ar: "كتاب", cat: "thing", vowel: false, plural: "books", pluralAr: "كتب" },
  { en: "pen", ar: "قلم", cat: "thing", vowel: false, plural: "pens", pluralAr: "أقلام" },
  { en: "car", ar: "سيارة", cat: "thing", vowel: false, plural: "cars", pluralAr: "سيارات" },
  { en: "table", ar: "طاولة", cat: "thing", vowel: false, plural: "tables", pluralAr: "طاولات" },
  { en: "apple", ar: "تفاحة", cat: "thing", vowel: true, plural: "apples", pluralAr: "تفاحات" },
  { en: "egg", ar: "بيضة", cat: "thing", vowel: true, plural: "eggs", pluralAr: "بيضات" },
  { en: "orange", ar: "برتقالة", cat: "thing", vowel: true, plural: "oranges", pluralAr: "برتقالات" },
];

export const NOT_NOUNS: { en: string; ar: string; kind: "adj" | "verb"; kindAr: string }[] = [
  { en: "happy", ar: "سعيد", kind: "adj", kindAr: "صفة" },
  { en: "tall", ar: "طويل", kind: "adj", kindAr: "صفة" },
  { en: "smart", ar: "ذكي", kind: "adj", kindAr: "صفة" },
  { en: "run", ar: "يركض", kind: "verb", kindAr: "فعل" },
  { en: "read", ar: "يقرأ", kind: "verb", kindAr: "فعل" },
  { en: "eat", ar: "يأكل", kind: "verb", kindAr: "فعل" },
];

export const PRONOUN_BE: { en: string; ar: string; be: "am" | "is" | "are"; plural: boolean }[] = [
  { en: "I", ar: "أنا", be: "am", plural: false },
  { en: "He", ar: "هو", be: "is", plural: false },
  { en: "She", ar: "هي", be: "is", plural: false },
  { en: "It", ar: "هو / هي (لغير العاقل)", be: "is", plural: false },
  { en: "You", ar: "أنت / أنتم", be: "are", plural: false },
  { en: "We", ar: "نحن", be: "are", plural: true },
  { en: "They", ar: "هم / هنّ", be: "are", plural: true },
];

// -------------------- بلوكات المحتوى --------------------
export type Block =
  | { type: "text"; text: string }
  | { type: "term"; en: string; ar: string; desc?: string }
  | { type: "art"; a: Art; examples?: string[] }
  | { type: "artsRow"; arts: Art[] }
  | { type: "wordList"; words: { en: string; ar: string; cat?: Cat }[]; note?: string }
  | { type: "nounChips" }
  | { type: "pluralToggle" }
  | { type: "compare"; pairs: { right: string; wrong: string; ar?: string }[] }
  | { type: "verdict"; ok: boolean; en: string; ar?: string; why?: string }
  | { type: "sentence"; en: string; ar: string; parts?: Part[]; note?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "aThenThe"; noun: string; ar: string; adj: string; adjAr: string }
  | { type: "vowelLab" }
  | { type: "machine" }
  | { type: "pieces" }
  | { type: "steps"; rows: { s: string; be: string; nounEn: string; nounAr: string }[] };

export interface Part { text: string; role: "s" | "be" | "art" | "noun" | "adj" }

// -------------------- التمارين --------------------
export type Exercise =
  | { type: "nounSort"; items: { en: string; ar: string; isNoun: boolean; kindAr: string }[] }
  | { type: "aAn"; items: { word: string; ar: string; vowel: boolean }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why?: string }[] }
  | { type: "best"; items: { q: string; opts: string[]; answer: number }[] }
  | { type: "aThe"; items: { story: string; ar: string; opts: [string, string][]; answer: number }[] }
  | { type: "build"; items: { s: string; sAr: string; be: string; noun: string; nounAr: string; vowel: boolean }[] };

// -------------------- الشرائح --------------------
export type Slide = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "cats"; title: string; lead?: string }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block[]; tip?: string }
  | { kind: "table"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise }
  | { kind: "challenge"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const START = "البداية";
const NOUN_S = "الاسم";
const ART = "الأدوات";
const THE = "أداة التعريف";
const LINK = "الربط";
const TOOL = "الورشة";
const PRACT = "التمارين";
const END = "الخاتمة";

export const SLIDES: Slide[] = [
  { kind: "cover", section: START, mascot: "🔤" },
  { kind: "objectives", section: START, mascot: "🎯" },

  // ---------------- الاسم ----------------
  {
    kind: "lesson",
    section: NOUN_S,
    mascot: "📦",
    step: "1",
    title: "ما هو الـ Noun؟",
    lead: "الـ Noun هو اسم شخص أو مكان أو شيء أو حيوان أو فكرة.",
    blocks: [
      { type: "term", en: "Noun", ar: "اسم", desc: "كلمة تدل على شخص أو مكان أو شيء أو حيوان أو فكرة." },
      { type: "wordList", note: "كل هذه الكلمات Nouns:", words: [
        { en: "Khalil", ar: "خليل (شخص)" },
        { en: "teacher", ar: "معلّم" },
        { en: "school", ar: "مدرسة" },
        { en: "book", ar: "كتاب" },
        { en: "car", ar: "سيارة" },
        { en: "cat", ar: "قطة" },
        { en: "water", ar: "ماء" },
        { en: "friend", ar: "صديق" },
      ] },
    ],
  },
  { kind: "cats", section: NOUN_S, mascot: "🗂️", title: "أنواع الأسماء بشكل مبسّط" },

  // ---------------- مفرد وجمع ----------------
  {
    kind: "lesson",
    section: NOUN_S,
    mascot: "🔢",
    step: "3",
    title: "مفرد وجمع",
    lead: "هذه نقطة أساسية جدًا — اضغط على المفتاح لتبديل الكلمة بين المفرد والجمع.",
    blocks: [{ type: "pluralToggle" }],
  },

  // ---------------- a ----------------
  {
    kind: "lesson",
    section: ART,
    mascot: "🟣",
    step: "4",
    title: "الآن: ما هي a؟",
    lead: "a هي أداة نستخدمها غالبًا قبل اسم مفرد قابل للعد.",
    blocks: [
      { type: "art", a: "a", examples: ["book", "car", "student", "teacher", "cat"] },
      { type: "text", text: "أي: [[a + اسم مفرد]]" },
    ],
  },
  {
    kind: "lesson",
    section: ART,
    mascot: "❓",
    step: "5",
    title: "لماذا نقول a student؟",
    lead: "لأن student اسم مفرد، لذلك نحتاج a قبله.",
    blocks: [
      { type: "verdict", ok: false, en: "I am student.", ar: "خطأ — لا نقول هذا", why: "student اسم مفرد بدون أداة" },
      { type: "verdict", ok: true, en: "I am a student.", ar: "أنا طالب." },
      { type: "sentence", en: "He is a teacher.", ar: "هو معلّم.", parts: [
        { text: "He", role: "s" }, { text: "is", role: "be" }, { text: "a", role: "art" }, { text: "teacher", role: "noun" },
      ] },
      { type: "sentence", en: "She is a doctor.", ar: "هي طبيبة.", parts: [
        { text: "She", role: "s" }, { text: "is", role: "be" }, { text: "a", role: "art" }, { text: "doctor", role: "noun" },
      ] },
      { type: "sentence", en: "It is a cat.", ar: "إنها قطة.", parts: [
        { text: "It", role: "s" }, { text: "is", role: "be" }, { text: "a", role: "art" }, { text: "cat", role: "noun" },
      ] },
    ],
    tip: "بعد Verb to be، الاسم المفرد يحتاج a أو an.",
  },

  // ---------------- an ----------------
  {
    kind: "lesson",
    section: ART,
    mascot: "🔵",
    step: "6",
    title: "متى نستخدم an؟",
    lead: "قاعدة بسيطة جدًا: نستخدم an بدل a عندما تبدأ الكلمة بصوت حرف علة.",
    blocks: [
      { type: "note", emoji: "🎵", text: "حروف العلة: [[a · e · i · o · u]]" },
      { type: "art", a: "an", examples: ["apple", "egg", "orange", "engineer", "actor"] },
      { type: "vowelLab" },
    ],
  },
  {
    kind: "lesson",
    section: ART,
    mascot: "⚖️",
    step: "7",
    title: "قارن a و an",
    lead: "لاحظ الفرق — الصحيح دائمًا يعتمد على صوت بداية الكلمة:",
    blocks: [
      { type: "compare", pairs: [
        { right: "a book", wrong: "an book" },
        { right: "a car", wrong: "an car" },
        { right: "an apple", wrong: "a apple" },
        { right: "an egg", wrong: "a egg" },
        { right: "an engineer", wrong: "a engineer" },
      ] },
      { type: "note", emoji: "⭐", text: "قاعدة ذهبية: [[a]] و [[an]] كلاهما للاسم المفرد — والفرق بينهما يعتمد على الصوت في بداية الكلمة، لا على معنى «واحد» فقط." },
    ],
  },
  {
    kind: "lesson",
    section: ART,
    mascot: "🚫",
    step: "8",
    title: "انتبه! a / an لا يأتيان مع الجمع",
    lead: "لأن a و an للمفرد فقط.",
    blocks: [
      { type: "verdict", ok: false, en: "a books / an books", ar: "خطأ — books جمع" },
      { type: "verdict", ok: true, en: "a book / books", ar: "الاثنان صحيحان" },
      { type: "verdict", ok: false, en: "a students", ar: "خطأ" },
      { type: "verdict", ok: true, en: "a student / students", ar: "الاثنان صحيحان" },
    ],
  },

  // ---------------- the ----------------
  {
    kind: "lesson",
    section: THE,
    mascot: "🟡",
    step: "9",
    title: "ماذا عن the؟",
    lead: "the من أهم الكلمات في اللغة الإنجليزية — نستخدمها عندما نتحدث عن شيء محدد ومعروف.",
    blocks: [
      { type: "sentence", en: "I have a book.", ar: "لدي كتاب. (أذكره لأول مرة)", parts: [
        { text: "I", role: "s" }, { text: "have", role: "be" }, { text: "a", role: "art" }, { text: "book", role: "noun" },
      ], note: "أول مرة ← a" },
      { type: "sentence", en: "The book is blue.", ar: "الكتاب أزرق. (أعرف أي كتاب أقصد)", parts: [
        { text: "The", role: "art" }, { text: "book", role: "noun" }, { text: "is", role: "be" }, { text: "blue", role: "adj" },
      ], note: "أصبح معروفًا ← the" },
    ],
    tip: "أول ذكر ← a / an · ثم عند الحديث عنه مرة أخرى ← the",
  },
  {
    kind: "lesson",
    section: THE,
    mascot: "🖊️",
    step: "10",
    title: "مثال بسيط جدًا",
    lead: "تخيّل أنني دخلت الصف ومعي قلم.",
    blocks: [
      { type: "sentence", en: "I have a pen.", ar: "لدي قلم. — لم أحدد أي قلم", parts: [
        { text: "I", role: "s" }, { text: "have", role: "be" }, { text: "a", role: "art" }, { text: "pen", role: "noun" },
      ] },
      { type: "text", text: "ثم أضع القلم على الطاولة وأقول:" },
      { type: "sentence", en: "The pen is black.", ar: "القلم أسود.", parts: [
        { text: "The", role: "art" }, { text: "pen", role: "noun" }, { text: "is", role: "be" }, { text: "black", role: "adj" },
      ], note: "لأننا أصبحنا نعرف أي قلم نتحدث عنه" },
    ],
  },
  {
    kind: "lesson",
    section: THE,
    mascot: "🐕",
    step: "11",
    title: "a ثم the",
    lead: "هذه فكرة مهمة جدًا — اضغط على الأسهم لمشاهدة القصة.",
    blocks: [
      { type: "aThenThe", noun: "dog", ar: "كلب", adj: "big", adjAr: "كبير" },
      { type: "aThenThe", noun: "car", ar: "سيارة", adj: "red", adjAr: "أحمر" },
    ],
  },
  {
    kind: "lesson",
    section: THE,
    mascot: "📚",
    step: "13",
    title: "هل the للمفرد فقط؟",
    lead: "لا — يمكن أن نستخدم the مع المفرد والجمع.",
    blocks: [
      { type: "sentence", en: "The book is new.", ar: "الكتاب جديد. (مفرد)", parts: [
        { text: "The", role: "art" }, { text: "book", role: "noun" }, { text: "is", role: "be" }, { text: "new", role: "adj" },
      ] },
      { type: "sentence", en: "The books are new.", ar: "الكتب جديدة. (جمع)", parts: [
        { text: "The", role: "art" }, { text: "books", role: "noun" }, { text: "are", role: "be" }, { text: "new", role: "adj" },
      ] },
      { type: "note", emoji: "✅", text: "إذن [[the book]] و [[the books]] كلاهما صحيح." },
    ],
  },
  {
    kind: "lesson",
    section: THE,
    mascot: "🔍",
    step: "14",
    title: "الفرق بين a و the",
    lead: "شوف الفرق بنفسك:",
    blocks: [
      { type: "sentence", en: "I see a boy.", ar: "أنا أرى ولدًا. — ولد غير محدد", parts: [
        { text: "I", role: "s" }, { text: "see", role: "be" }, { text: "a", role: "art" }, { text: "boy", role: "noun" },
      ] },
      { type: "sentence", en: "I see the boy.", ar: "أنا أرى الولد. — ولد محدد ومعروف", parts: [
        { text: "I", role: "s" }, { text: "see", role: "be" }, { text: "the", role: "art" }, { text: "boy", role: "noun" },
      ] },
      { type: "note", emoji: "🧠", text: "فكّر فيها بهذه الطريقة: [[a / an]] = واحد لكن غير محدد · [[the]] = هذا الشيء المحدد الذي نعرفه." },
    ],
  },

  // ---------------- الربط ----------------
  {
    kind: "lesson",
    section: LINK,
    mascot: "🔗",
    step: "15",
    title: "الآن نربط الدرس مع Verb to be",
    lead: "تذكر القاعدة الذهبية من الدرس 2، ثم أضف الاسم:",
    blocks: [
      { type: "steps", rows: [
        { s: "I", be: "am", nounEn: "a student", nounAr: "طالب" },
        { s: "He", be: "is", nounEn: "a teacher", nounAr: "معلّم" },
        { s: "She", be: "is", nounEn: "a doctor", nounAr: "طبيبة" },
        { s: "It", be: "is", nounEn: "a cat", nounAr: "قطة" },
      ] },
      { type: "sentence", en: "He is an engineer.", ar: "هو مهندس.", parts: [
        { text: "He", role: "s" }, { text: "is", role: "be" }, { text: "an", role: "art" }, { text: "engineer", role: "noun" },
      ], note: "لماذا an؟ لأن engineer تبدأ بصوت علة" },
      { type: "sentence", en: "She is an actress.", ar: "هي ممثلة.", parts: [
        { text: "She", role: "s" }, { text: "is", role: "be" }, { text: "an", role: "art" }, { text: "actress", role: "noun" },
      ] },
    ],
  },
  {
    kind: "lesson",
    section: LINK,
    mascot: "🚫",
    step: "17",
    title: "النفي",
    lead: "نستخدم ما تعلمناه في الدرس 3 — نضيف not فقط:",
    blocks: [
      { type: "sentence", en: "I am a student.", ar: "أنا طالب." },
      { type: "sentence", en: "I am not a student.", ar: "أنا لست طالبًا.", parts: [
        { text: "I", role: "s" }, { text: "am", role: "be" }, { text: "not", role: "adj" }, { text: "a", role: "art" }, { text: "student", role: "noun" },
      ] },
      { type: "sentence", en: "He is not a teacher.", ar: "هو ليس معلّمًا." },
      { type: "sentence", en: "She is not an engineer.", ar: "هي ليست مهندسة." },
    ],
    tip: "النفي لا يغيّر الأداة — نضيف not بعد Verb to be فقط.",
  },
  {
    kind: "lesson",
    section: LINK,
    mascot: "❓",
    step: "18",
    title: "السؤال",
    lead: "ونقلب الترتيب كما في الدرس 3:",
    blocks: [
      { type: "sentence", en: "Is she a student?", ar: "هل هي طالبة؟", parts: [
        { text: "Is", role: "be" }, { text: "she", role: "s" }, { text: "a", role: "art" }, { text: "student", role: "noun" },
      ] },
      { type: "sentence", en: "Is he a teacher?", ar: "هل هو معلّم؟", parts: [
        { text: "Is", role: "be" }, { text: "he", role: "s" }, { text: "a", role: "art" }, { text: "teacher", role: "noun" },
      ] },
      { type: "sentence", en: "Are they students?", ar: "هل هم طلاب؟", parts: [
        { text: "Are", role: "be" }, { text: "they", role: "s" }, { text: "students", role: "noun" },
      ], note: "جمع ← بدون a / an" },
    ],
  },
  {
    kind: "lesson",
    section: LINK,
    mascot: "🚨",
    step: "19",
    title: "خطأ شائع جدًا",
    lead: "الطالب قد يقول:",
    blocks: [
      { type: "verdict", ok: false, en: "He is teacher.", why: "teacher اسم مفرد يحتاج a" },
      { type: "verdict", ok: true, en: "He is a teacher.", ar: "هو معلّم." },
      { type: "verdict", ok: false, en: "She is doctor." },
      { type: "verdict", ok: true, en: "She is a doctor.", ar: "هي طبيبة." },
      { type: "verdict", ok: false, en: "I am student." },
      { type: "verdict", ok: true, en: "I am a student.", ar: "أنا طالب." },
    ],
  },
  {
    kind: "lesson",
    section: LINK,
    mascot: "🎨",
    step: "20",
    title: "لكن انتبه! ليس كل اسم يحتاج a أو an",
    lead: "الصفات لا تأخذ a / an:",
    blocks: [
      { type: "sentence", en: "I am happy.", ar: "أنا سعيد.", parts: [
        { text: "I", role: "s" }, { text: "am", role: "be" }, { text: "happy", role: "adj" },
      ], note: "happy صفة وليست Noun" },
      { type: "verdict", ok: false, en: "I am a happy.", why: "happy صفة" },
      { type: "verdict", ok: true, en: "He is tall.", ar: "هو طويل." },
      { type: "verdict", ok: false, en: "He is a tall.", why: "tall صفة" },
      { type: "note", emoji: "📚", text: "سنأخذ [[Adjectives]] (الصفات) لاحقًا بالتفصيل." },
    ],
  },
  {
    kind: "lesson",
    section: LINK,
    mascot: "🧩",
    step: "21",
    title: "الآن نبدأ نربط كل شيء",
    lead: "لدينا: Subject · Verb to be · Article · Noun",
    blocks: [
      { type: "sentence", en: "Khalil is a student.", ar: "خليل طالب.", parts: [
        { text: "Khalil", role: "s" }, { text: "is", role: "be" }, { text: "a", role: "art" }, { text: "student", role: "noun" },
      ], note: "Khalil = Subject · is = Verb to be · a = Article · student = Noun" },
      { type: "sentence", en: "Sara is an engineer.", ar: "سارة مهندسة.", parts: [
        { text: "Sara", role: "s" }, { text: "is", role: "be" }, { text: "an", role: "art" }, { text: "engineer", role: "noun" },
      ], note: "Sara = Subject · is = Verb to be · an = Article · engineer = Noun" },
      { type: "pieces" },
    ],
  },

  // ---------------- الورشة ----------------
  { kind: "lesson", section: TOOL, mascot: "⚙️", step: "22", title: "آلة الأدوات — ابنِ الجملة بنفسك", lead: "اختر الفاعل والاسم، وشاهد الأداة الصحيحة تُختار تلقائيًا (a أو an)، مع النفي والسؤال.", blocks: [{ type: "machine" }] },
  { kind: "table", section: TOOL, mascot: "📋", title: "جدول الدرس كله" },

  // ---------------- التمارين ----------------
  {
    kind: "ex",
    section: PRACT,
    mascot: "🔍",
    badge: "التمرين 1",
    title: "هل الكلمة Noun؟",
    subtitle: "اضغط Noun أو Not Noun",
    ex: {
      type: "nounSort",
      items: [
        { en: "teacher", ar: "معلّم", isNoun: true, kindAr: "اسم" },
        { en: "happy", ar: "سعيد", isNoun: false, kindAr: "صفة" },
        { en: "book", ar: "كتاب", isNoun: true, kindAr: "اسم" },
        { en: "run", ar: "يركض", isNoun: false, kindAr: "فعل" },
        { en: "school", ar: "مدرسة", isNoun: true, kindAr: "اسم" },
        { en: "car", ar: "سيارة", isNoun: true, kindAr: "اسم" },
        { en: "tall", ar: "طويل", isNoun: false, kindAr: "صفة" },
        { en: "student", ar: "طالب", isNoun: true, kindAr: "اسم" },
      ],
    },
  },
  {
    kind: "ex",
    section: PRACT,
    mascot: "🟣",
    badge: "التمرين 2",
    title: "اختر a أو an",
    subtitle: "استمع لصوت بداية الكلمة في ذهنك ثم اختر",
    ex: {
      type: "aAn",
      items: [
        { word: "apple", ar: "تفاحة", vowel: true },
        { word: "book", ar: "كتاب", vowel: false },
        { word: "engineer", ar: "مهندس", vowel: true },
        { word: "car", ar: "سيارة", vowel: false },
        { word: "orange", ar: "برتقالة", vowel: true },
        { word: "student", ar: "طالب", vowel: false },
        { word: "egg", ar: "بيضة", vowel: true },
        { word: "teacher", ar: "معلّم", vowel: false },
      ],
    },
  },
  {
    kind: "ex",
    section: PRACT,
    mascot: "🩹",
    badge: "التمرين 3",
    title: "صحّح الخطأ",
    subtitle: "اضغط «الحل» لرؤية الجملة الصحيحة",
    ex: {
      type: "fix",
      items: [
        { wrong: "I am student.", correct: "I am a student.", why: "student مفرد ← يحتاج a" },
        { wrong: "She is doctor.", correct: "She is a doctor.", why: "doctor مفرد ← يحتاج a" },
        { wrong: "He is an teacher.", correct: "He is a teacher.", why: "teacher تبدأ بصوت ساكن ← a" },
        { wrong: "It is a apple.", correct: "It is an apple.", why: "apple تبدأ بصوت علة ← an" },
        { wrong: "They are a students.", correct: "They are students.", why: "جمع ← بدون a" },
      ],
    },
  },
  {
    kind: "ex",
    section: PRACT,
    mascot: "🏅",
    badge: "التمرين 4",
    title: "اختر الجملة الصحيحة",
    subtitle: "ثلاثة خيارات — واحد فقط صحيح",
    ex: {
      type: "best",
      items: [
        { q: "①", opts: ["He is teacher.", "He is a teacher.", "He a teacher."], answer: 1 },
        { q: "②", opts: ["She is an engineer.", "She is a engineer.", "She an engineer."], answer: 0 },
        { q: "③", opts: ["I am a student.", "I am student.", "I a student."], answer: 0 },
      ],
    },
  },
  {
    kind: "ex",
    section: PRACT,
    mascot: "🟡",
    badge: "التمرين 5",
    title: "a أم the؟",
    subtitle: "اقرأ الموقف ثم اختر الزوج الصحيح",
    ex: {
      type: "aThe",
      items: [
        {
          story: "I see ___ dog.  ثم أتحدث عن نفس الكلب:  ___ dog is big.",
          ar: "أرى كلبًا (أول مرة) ← ثم الكلب (معروف)",
          opts: [["a", "a"], ["a", "the"], ["the", "a"]],
          answer: 1,
        },
        {
          story: "She has ___ car.  ___ car is red.",
          ar: "لديها سيارة (أول مرة) ← السيارة حمراء (معروفة)",
          opts: [["a", "The"], ["the", "A"], ["an", "The"]],
          answer: 0,
        },
      ],
    },
  },
  {
    kind: "ex",
    section: PRACT,
    mascot: "🏗️",
    badge: "التمرين 6",
    title: "كوّن جملة",
    subtitle: "اختر الأداة الصحيحة لتكملة الجملة",
    ex: {
      type: "build",
      items: [
        { s: "I", sAr: "أنا", be: "am", noun: "student", nounAr: "طالب", vowel: false },
        { s: "He", sAr: "هو", be: "is", noun: "teacher", nounAr: "معلّم", vowel: false },
        { s: "She", sAr: "هي", be: "is", noun: "engineer", nounAr: "مهندسة", vowel: true },
        { s: "It", sAr: "غير عاقل", be: "is", noun: "cat", nounAr: "قطة", vowel: false },
        { s: "They", sAr: "هم", be: "are", noun: "students", nounAr: "طلاب", vowel: false },
      ],
    },
  },
  { kind: "challenge", section: PRACT, mascot: "🔥", title: "التحدي النهائي · IQ200" },

  // ---------------- الخاتمة ----------------
  { kind: "summary", section: END, mascot: "🧠", title: "ملخص الدرس 4" },
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: END, mascot: "🏆", title: "قاعدة اليوم" },
];

// -------------------- التحدي --------------------
export const CHALLENGE_ITEMS: { be: string; s: string; noun: string; nounAr: string; vowel: boolean; art: "a" | "an" | null }[] = [
  { be: "is", s: "Sara", noun: "doctor", nounAr: "طبيبة", vowel: false, art: "a" },
  { be: "is", s: "Khalil", noun: "engineer", nounAr: "مهندس", vowel: true, art: "an" },
  { be: "am", s: "I", noun: "student", nounAr: "طالب", vowel: false, art: "a" },
  { be: "are", s: "They", noun: "students", nounAr: "طلاب", vowel: false, art: null },
  { be: "is", s: "He", noun: "teacher", nounAr: "معلّم", vowel: false, art: "a" },
];

export const LABEL_ITEMS: { text: string; role: "s" | "be" | "art" | "noun" }[] = [
  { text: "She", role: "s" },
  { text: "is", role: "be" },
  { text: "not", role: "be" },
  { text: "an", role: "art" },
  { text: "engineer", role: "noun" },
];
