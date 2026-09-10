// ============================================================
// الدرس 5 — الصفات وتكوين الجملة الوصفية (Adjectives + Verb to be)
// ============================================================

export type Role = "s" | "be" | "not" | "art" | "adj" | "noun";

export const ROLE_AR: Record<Role, string> = {
  s: "الفاعل",
  be: "Verb to be",
  not: "النفي",
  art: "الأداة",
  adj: "الصفة",
  noun: "الاسم",
};

export interface Adj {
  en: string;
  ar: string;
  opp?: string;
  oppAr?: string;
  /** صيغة المؤنث العربية عند الحاجة */
  f?: string;
  /** صيغة الجمع العربية */
  p?: string;
}

/** قاموس الصفات الأساسي */
export const ADJS: Adj[] = [
  { en: "big", ar: "كبير", f: "كبيرة", p: "كبار", opp: "small", oppAr: "صغير" },
  { en: "small", ar: "صغير", f: "صغيرة", p: "صغار", opp: "big", oppAr: "كبير" },
  { en: "tall", ar: "طويل", f: "طويلة", p: "طوال", opp: "short", oppAr: "قصير" },
  { en: "short", ar: "قصير", f: "قصيرة", p: "قصار", opp: "tall", oppAr: "طويل" },
  { en: "old", ar: "كبير بالعمر", f: "كبيرة بالعمر", p: "كبار بالعمر", opp: "young", oppAr: "صغير بالعمر" },
  { en: "young", ar: "صغير بالعمر", f: "صغيرة بالعمر", p: "صغار", opp: "old", oppAr: "كبير بالعمر" },
  { en: "happy", ar: "سعيد", f: "سعيدة", p: "سعداء", opp: "sad", oppAr: "حزين" },
  { en: "sad", ar: "حزين", f: "حزينة", p: "حزانى", opp: "happy", oppAr: "سعيد" },
  { en: "good", ar: "جيد", f: "جيدة", p: "جيدون", opp: "bad", oppAr: "سيئ" },
  { en: "bad", ar: "سيئ", f: "سيئة", p: "سيئون", opp: "good", oppAr: "جيد" },
  { en: "fast", ar: "سريع", f: "سريعة", p: "سريعون", opp: "slow", oppAr: "بطيء" },
  { en: "slow", ar: "بطيء", f: "بطيئة", p: "بطيئون", opp: "fast", oppAr: "سريع" },
  { en: "hot", ar: "حار", f: "حارة", p: "حارون", opp: "cold", oppAr: "بارد" },
  { en: "cold", ar: "بارد", f: "باردة", p: "باردون", opp: "hot", oppAr: "حار" },
  { en: "easy", ar: "سهل", f: "سهلة", p: "سهلة", opp: "difficult", oppAr: "صعب" },
  { en: "difficult", ar: "صعب", f: "صعبة", p: "صعبة", opp: "easy", oppAr: "سهل" },
  { en: "strong", ar: "قوي", f: "قوية", p: "أقوياء", opp: "weak", oppAr: "ضعيف" },
  { en: "weak", ar: "ضعيف", f: "ضعيفة", p: "ضعفاء", opp: "strong", oppAr: "قوي" },
  { en: "beautiful", ar: "جميل", f: "جميلة", p: "جميلات", opp: "ugly", oppAr: "قبيح" },
  { en: "ugly", ar: "قبيح", f: "قبيحة", p: "قبيحون", opp: "beautiful", oppAr: "جميل" },
  { en: "smart", ar: "ذكي", f: "ذكية", p: "أذكياء" },
  { en: "tired", ar: "متعب", f: "متعبة", p: "متعبون" },
  { en: "hungry", ar: "جائع", f: "جائعة", p: "جائعون" },
  { en: "thirsty", ar: "عطشان", f: "عطشى", p: "عطشى" },
  { en: "ready", ar: "جاهز", f: "جاهزة", p: "جاهزون" },
  { en: "busy", ar: "مشغول", f: "مشغولة", p: "مشغولون" },
  { en: "kind", ar: "لطيف", f: "لطيفة", p: "لطفاء" },
  { en: "red", ar: "أحمر", f: "حمراء", p: "حمراء" },
];

/** أزواج المتضادات للحفظ */
export const OPPOSITES: { a: Adj; b: Adj }[] = [
  ["big", "small"],
  ["tall", "short"],
  ["happy", "sad"],
  ["good", "bad"],
  ["fast", "slow"],
  ["hot", "cold"],
  ["easy", "difficult"],
  ["strong", "weak"],
  ["young", "old"],
].map(([x, y]) => ({ a: ADJS.find((z) => z.en === x)!, b: ADJS.find((z) => z.en === y)! }));

export interface Subj {
  en: string;
  ar: string;
  be: "am" | "is" | "are";
  g: "m" | "f" | "n";
  plural: boolean;
}

export const SUBJECTS: Subj[] = [
  { en: "I", ar: "أنا", be: "am", g: "m", plural: false },
  { en: "He", ar: "هو", be: "is", g: "m", plural: false },
  { en: "She", ar: "هي", be: "is", g: "f", plural: false },
  { en: "It", ar: "إنه", be: "is", g: "n", plural: false },
  { en: "You", ar: "أنت", be: "are", g: "m", plural: false },
  { en: "We", ar: "نحن", be: "are", g: "m", plural: true },
  { en: "They", ar: "هم", be: "are", g: "m", plural: true },
  { en: "Khalil", ar: "خليل", be: "is", g: "m", plural: false },
  { en: "Sara", ar: "سارة", be: "is", g: "f", plural: false },
  { en: "Liam", ar: "ليام", be: "is", g: "m", plural: false },
  { en: "Adam", ar: "آدم", be: "is", g: "m", plural: false },
  { en: "Mia", ar: "ميا", be: "is", g: "f", plural: false },
  { en: "Mira", ar: "ميرا", be: "is", g: "f", plural: false },
  { en: "Mahmoud", ar: "محمود", be: "is", g: "m", plural: false },
];

/** يختار الصيغة العربية الصحيحة للصفة حسب الفاعل */
export function adjAr(a: Adj, s: Subj): string {
  if (s.plural) return a.p ?? a.ar;
  if (s.g === "f") return a.f ?? a.ar;
  return a.ar;
}

export const NEG_AR: Record<string, string> = {
  I: "لست",
  He: "ليس",
  She: "ليست",
  It: "ليس",
  You: "لست",
  We: "لسنا",
  They: "ليسوا",
  Khalil: "ليس",
  Sara: "ليست",
  Liam: "ليس",
  Mia: "ليست",
};

export function capBe(be: string) {
  return be.charAt(0).toUpperCase() + be.slice(1);
}

// -------------------- بلوكات --------------------
export interface Part { text: string; role: Role }

export type Block =
  | { type: "text"; text: string }
  | { type: "term"; en: string; ar: string; desc?: string }
  | { type: "adjCloud" }
  | { type: "askHow"; items: { en: string; q: string; adj: string; ar: string }[] }
  | { type: "nounVsAdj" }
  | { type: "formula"; roles: Role[]; example?: string[]; big?: boolean }
  | { type: "sentence"; en: string; ar: string; parts?: Part[]; note?: string }
  | { type: "ok"; en: string; ar?: string; why?: string }
  | { type: "bad"; en: string; ar?: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "twoPatterns" }
  | { type: "pluralAdj" }
  | { type: "opposites" }
  | { type: "adjBank" }
  | { type: "machine" }
  | { type: "shortAns" }
  | { type: "progress" };

// -------------------- التمارين --------------------
export type Exercise =
  | { type: "sortNA"; items: { en: string; ar: string; isAdj: boolean }[] }
  | { type: "choose"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "beFill"; items: { s: string; adj: string; ar: string; be: "am" | "is" | "are" }[] }
  | { type: "transform"; mode: "neg" | "q"; items: { s: string; be: string; adj: string; ar: string }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why: string }[] }
  | { type: "order"; items: { words: string[]; correct: string[]; ar: string }[] }
  | { type: "analyze"; items: { parts: Part[]; ar: string }[] };

export type Slide = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise }
  | { kind: "iq"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const S_START = "البداية";
const S_WHAT = "ما هي الصفة";
const S_USE = "الاستخدام";
const S_ORDER = "الترتيب";
const S_FORMS = "النفي والسؤال";
const S_BANK = "قاموس الصفات";
const S_TOOL = "الورشة";
const S_EX = "التمارين";
const S_END = "الخاتمة";

const p = (text: string, role: Role): Part => ({ text, role });

export const SLIDES: Slide[] = [
  { kind: "cover", section: S_START, mascot: "🎨" },
  { kind: "objectives", section: S_START, mascot: "🎯" },

  {
    kind: "lesson",
    section: S_WHAT,
    mascot: "🖌️",
    step: "1",
    title: "ما هي الـ Adjective؟",
    lead: "الصفة هي كلمة تخبرنا كيف يكون الشخص أو الشيء.",
    blocks: [
      { type: "term", en: "Adjective", ar: "صفة", desc: "كلمة تصف شخصًا أو شيئًا: كيف هو؟" },
      { type: "adjCloud" },
    ],
  },
  {
    kind: "lesson",
    section: S_WHAT,
    mascot: "❓",
    step: "2",
    title: "كيف أعرف أن الكلمة صفة؟",
    lead: "اسأل نفسك: «كيف هو الشخص أو الشيء؟»",
    blocks: [
      {
        type: "askHow",
        items: [
          { en: "Khalil is tall.", q: "كيف هو خليل؟", adj: "tall", ar: "طويل" },
          { en: "The car is fast.", q: "كيف هي السيارة؟", adj: "fast", ar: "سريعة" },
          { en: "Sara is happy.", q: "كيف هي سارة؟", adj: "happy", ar: "سعيدة" },
        ],
      },
      { type: "note", emoji: "🧠", text: "إذا كان الجواب يصف الشخص أو الشيء ← الكلمة [[Adjective]]." },
    ],
  },
  {
    kind: "lesson",
    section: S_WHAT,
    mascot: "⚖️",
    step: "3",
    title: "الفرق بين Noun و Adjective",
    lead: "اضغط على أي كلمة لتصنيفها بنفسك:",
    blocks: [
      { type: "nounVsAdj" },
      { type: "note", emoji: "💡", text: "اسم شخص أو شيء أو مكان أو حيوان ← [[Noun]] · كلمة تصف شخصًا أو شيئًا ← [[Adjective]]" },
      {
        type: "sentence",
        en: "The boy is tall.",
        ar: "الولد طويل.",
        parts: [p("The", "art"), p("boy", "noun"), p("is", "be"), p("tall", "adj")],
        note: "boy = شخص ← Noun · tall = يصف الولد ← Adjective",
      },
    ],
  },

  {
    kind: "lesson",
    section: S_USE,
    mascot: "🏗️",
    step: "4",
    title: "أين تأتي الصفة في الجملة؟",
    lead: "في هذا الدرس نركّز على تركيب مهم جدًا:",
    blocks: [
      { type: "formula", roles: ["s", "be", "adj"], big: true },
      { type: "sentence", en: "I am happy.", ar: "أنا سعيد.", parts: [p("I", "s"), p("am", "be"), p("happy", "adj")] },
      { type: "sentence", en: "He is tall.", ar: "هو طويل.", parts: [p("He", "s"), p("is", "be"), p("tall", "adj")] },
      { type: "sentence", en: "They are happy.", ar: "هم سعداء.", parts: [p("They", "s"), p("are", "be"), p("happy", "adj")] },
      { type: "note", emoji: "⭐", text: "القاعدة الذهبية: [[Subject + am/is/are + Adjective]]" },
      { type: "bad", en: "She smart is.", why: "ترتيب خاطئ" },
      { type: "bad", en: "She is a smart.", why: "smart صفة ولا تأخذ a" },
      { type: "ok", en: "She is smart.", ar: "هي ذكية." },
    ],
  },
  {
    kind: "lesson",
    section: S_USE,
    mascot: "🚫",
    step: "5",
    title: "لماذا لا نستخدم a قبل الصفة؟",
    lead: "لأن الصفة ليست اسمًا — الأداة a تأتي مع الأسماء.",
    blocks: [
      { type: "ok", en: "He is tall.", ar: "هو طويل." },
      { type: "bad", en: "He is a tall.", why: "tall صفة وليست اسمًا" },
      { type: "text", text: "لكن إذا كان بعد الصفة اسم، فالأمر يختلف:" },
      {
        type: "sentence",
        en: "He is a tall boy.",
        ar: "هو ولد طويل.",
        parts: [p("He", "s"), p("is", "be"), p("a", "art"), p("tall", "adj"), p("boy", "noun")],
        note: "a + tall + boy — لأن boy اسم",
      },
    ],
    tip: "الأداة a / an تخصّ الاسم، وليس الصفة.",
  },
  {
    kind: "lesson",
    section: S_USE,
    mascot: "🔍",
    step: "6",
    title: "قارن بين الجملتين",
    blocks: [
      {
        type: "sentence",
        en: "He is tall.",
        ar: "هو طويل.",
        parts: [p("He", "s"), p("is", "be"), p("tall", "adj")],
        note: "صفة فقط — بدون اسم",
      },
      {
        type: "sentence",
        en: "He is a tall boy.",
        ar: "هو ولد طويل.",
        parts: [p("He", "s"), p("is", "be"), p("a", "art"), p("tall", "adj"), p("boy", "noun")],
        note: "صفة + اسم — لذلك نحتاج a",
      },
    ],
  },
  {
    kind: "lesson",
    section: S_USE,
    mascot: "📚",
    step: "7",
    title: "أمثلة أساسية جدًا",
    lead: "اضغط على أي ضمير لترى أمثلته:",
    blocks: [{ type: "machine" }],
  },
  {
    kind: "lesson",
    section: S_USE,
    mascot: "🔢",
    step: "8",
    title: "الصفات لا تتغير مع الجمع",
    lead: "في الإنجليزية الصفة لا تأخذ s أبدًا — جرّب المفتاح:",
    blocks: [
      { type: "pluralAdj" },
      { type: "bad", en: "The boys are talls.", why: "الصفة لا تأخذ s" },
      { type: "ok", en: "The boys are tall.", ar: "الأولاد طويلون." },
    ],
  },

  {
    kind: "lesson",
    section: S_FORMS,
    mascot: "🚫",
    step: "9",
    title: "النفي مع الصفات",
    lead: "تذكّر الدرس 3: نضع not بعد Verb to be.",
    blocks: [
      {
        type: "sentence",
        en: "He is not tall.",
        ar: "هو ليس طويلًا.",
        parts: [p("He", "s"), p("is", "be"), p("not", "not"), p("tall", "adj")],
      },
      {
        type: "sentence",
        en: "She is not happy.",
        ar: "هي ليست سعيدة.",
        parts: [p("She", "s"), p("is", "be"), p("not", "not"), p("happy", "adj")],
      },
      {
        type: "sentence",
        en: "They are not ready.",
        ar: "هم ليسوا جاهزين.",
        parts: [p("They", "s"), p("are", "be"), p("not", "not"), p("ready", "adj")],
      },
      { type: "formula", roles: ["s", "be", "not", "adj"] },
    ],
  },
  {
    kind: "lesson",
    section: S_FORMS,
    mascot: "❓",
    step: "10",
    title: "السؤال مع الصفات",
    lead: "نقلب الترتيب: Verb to be قبل الفاعل.",
    blocks: [
      { type: "formula", roles: ["be", "s", "adj"] },
      { type: "sentence", en: "Is he tall?", ar: "هل هو طويل؟", parts: [p("Is", "be"), p("he", "s"), p("tall", "adj")] },
      { type: "sentence", en: "Is she happy?", ar: "هل هي سعيدة؟", parts: [p("Is", "be"), p("she", "s"), p("happy", "adj")] },
      { type: "sentence", en: "Are they ready?", ar: "هل هم جاهزون؟", parts: [p("Are", "be"), p("they", "s"), p("ready", "adj")] },
    ],
  },
  {
    kind: "lesson",
    section: S_FORMS,
    mascot: "🗣️",
    step: "11",
    title: "الإجابات القصيرة",
    lead: "اضغط على أي سؤال لترى إجابتيه:",
    blocks: [
      { type: "shortAns" },
      { type: "note", emoji: "⭐", text: "لاحظ مرة أخرى: السؤال [[Are you tired?]] ← الإجابة عن نفسي [[Yes, I am.]]" },
    ],
  },

  {
    kind: "lesson",
    section: S_BANK,
    mascot: "🗃️",
    step: "12",
    title: "أهم الصفات التي نحتاجها في البداية",
    lead: "قاموس صغير — اضغط على أي صفة لسماع معناها ومثال عليها:",
    blocks: [{ type: "adjBank" }],
  },
  {
    kind: "lesson",
    section: S_BANK,
    mascot: "↔️",
    step: "13",
    title: "عكس الصفات",
    lead: "طريقة ممتازة للحفظ: احفظها كأزواج متضادة.",
    blocks: [{ type: "opposites" }],
  },

  {
    kind: "lesson",
    section: S_ORDER,
    mascot: "🧩",
    step: "14",
    title: "الآن نربط كل ما تعلمناه",
    lead: "شوف كيف بدأت أجزاء اللغة تتجمع:",
    blocks: [
      {
        type: "sentence",
        en: "Khalil is a smart student.",
        ar: "خليل طالب ذكي.",
        parts: [p("Khalil", "s"), p("is", "be"), p("a", "art"), p("smart", "adj"), p("student", "noun")],
      },
      {
        type: "sentence",
        en: "The car is fast.",
        ar: "السيارة سريعة.",
        parts: [p("The", "art"), p("car", "noun"), p("is", "be"), p("fast", "adj")],
      },
      {
        type: "sentence",
        en: "They are happy students.",
        ar: "هم طلاب سعداء.",
        parts: [p("They", "s"), p("are", "be"), p("happy", "adj"), p("students", "noun")],
      },
    ],
  },
  {
    kind: "lesson",
    section: S_ORDER,
    mascot: "🔥",
    step: "15",
    title: "ترتيب الكلمات مهم جدًا",
    lead: "عندما تأتي الصفة قبل الاسم:",
    blocks: [
      { type: "formula", roles: ["art", "adj", "noun"], example: ["a", "big", "house"], big: true },
      { type: "ok", en: "a big house", ar: "منزل كبير" },
      { type: "bad", en: "a house big" },
      { type: "ok", en: "a beautiful girl", ar: "فتاة جميلة" },
      { type: "bad", en: "a girl beautiful" },
      { type: "ok", en: "a fast car", ar: "سيارة سريعة" },
      { type: "bad", en: "a car fast" },
    ],
    tip: "في العربية الصفة بعد الاسم، وفي الإنجليزية قبله — هنا يقع أكثر الخطأ.",
  },
  {
    kind: "lesson",
    section: S_ORDER,
    mascot: "🔀",
    step: "16",
    title: "لاحظ الفرق بين التركيبين",
    lead: "نفس الصفة، لكن مكانها يتغيّر:",
    blocks: [{ type: "twoPatterns" }],
  },
  {
    kind: "lesson",
    section: S_ORDER,
    mascot: "⚠️",
    step: "17",
    title: "لا تخلط بين Noun و Adjective",
    blocks: [
      { type: "sentence", en: "He is a teacher.", ar: "هو معلّم.", parts: [p("He", "s"), p("is", "be"), p("a", "art"), p("teacher", "noun")], note: "teacher = Noun" },
      { type: "sentence", en: "He is smart.", ar: "هو ذكي.", parts: [p("He", "s"), p("is", "be"), p("smart", "adj")], note: "smart = Adjective" },
      { type: "sentence", en: "She is a doctor.", ar: "هي طبيبة.", parts: [p("She", "s"), p("is", "be"), p("a", "art"), p("doctor", "noun")], note: "doctor = Noun" },
      { type: "sentence", en: "She is beautiful.", ar: "هي جميلة.", parts: [p("She", "s"), p("is", "be"), p("beautiful", "adj")], note: "beautiful = Adjective" },
      { type: "sentence", en: "He is a tall teacher.", ar: "هو معلّم طويل.", parts: [p("He", "s"), p("is", "be"), p("a", "art"), p("tall", "adj"), p("teacher", "noun")], note: "الاثنان معًا" },
    ],
  },

  { kind: "lesson", section: S_TOOL, mascot: "⚙️", step: "18", title: "ورشة الجملة الوصفية", lead: "اختر الفاعل والصفة، وبدّل بين الإثبات والنفي والسؤال.", blocks: [{ type: "machine" }] },

  // ---------------- التمارين ----------------
  {
    kind: "ex",
    section: S_EX,
    mascot: "⚖️",
    badge: "التمرين 1",
    title: "هل الكلمة Noun أم Adjective؟",
    subtitle: "صنّف كل كلمة",
    ex: {
      type: "sortNA",
      items: [
        { en: "teacher", ar: "معلّم", isAdj: false },
        { en: "tall", ar: "طويل", isAdj: true },
        { en: "car", ar: "سيارة", isAdj: false },
        { en: "beautiful", ar: "جميل", isAdj: true },
        { en: "student", ar: "طالب", isAdj: false },
        { en: "happy", ar: "سعيد", isAdj: true },
        { en: "school", ar: "مدرسة", isAdj: false },
        { en: "fast", ar: "سريع", isAdj: true },
        { en: "book", ar: "كتاب", isAdj: false },
        { en: "smart", ar: "ذكي", isAdj: true },
      ],
    },
  },
  {
    kind: "ex",
    section: S_EX,
    mascot: "🏅",
    badge: "التمرين 2",
    title: "اختر الكلمة الصحيحة",
    subtitle: "انتبه: الصفة لا تأخذ a",
    ex: {
      type: "choose",
      items: [
        { stem: "He is ___.", ar: "هو طويل.", opts: ["tall", "a tall", "tall is"], answer: 0 },
        { stem: "She is ___.", ar: "هي سعيدة.", opts: ["happy", "a happy", "happy is"], answer: 0 },
        { stem: "The car is ___.", ar: "السيارة سريعة.", opts: ["fast", "a fast", "fast is"], answer: 0 },
      ],
    },
  },
  {
    kind: "ex",
    section: S_EX,
    mascot: "🧩",
    badge: "التمرين 3",
    title: "أكمل بـ am / is / are",
    subtitle: "تذكّر جدول الدرس 2",
    ex: {
      type: "beFill",
      items: [
        { s: "I", adj: "happy", ar: "أنا سعيد.", be: "am" },
        { s: "He", adj: "tall", ar: "هو طويل.", be: "is" },
        { s: "Mira", adj: "beautiful", ar: "ميرا جميلة.", be: "is" },
        { s: "It", adj: "small", ar: "إنه صغير.", be: "is" },
        { s: "We", adj: "ready", ar: "نحن جاهزون.", be: "are" },
        { s: "They", adj: "tired", ar: "هم متعبون.", be: "are" },
        { s: "You", adj: "smart", ar: "أنت ذكي.", be: "are" },
      ],
    },
  },
  {
    kind: "ex",
    section: S_EX,
    mascot: "🚫",
    badge: "التمرين 4",
    title: "حوّل إلى النفي",
    subtitle: "اضغط الزر لإضافة not في مكانها الصحيح",
    ex: {
      type: "transform",
      mode: "neg",
      items: [
        { s: "Mahmoud", be: "is", adj: "tall", ar: "محمود ليس طويلًا." },
        { s: "She", be: "is", adj: "happy", ar: "هي ليست سعيدة." },
        { s: "They", be: "are", adj: "ready", ar: "هم ليسوا جاهزين." },
        { s: "We", be: "are", adj: "tired", ar: "نحن لسنا متعبين." },
        { s: "It", be: "is", adj: "big", ar: "إنه ليس كبيرًا." },
      ],
    },
  },
  {
    kind: "ex",
    section: S_EX,
    mascot: "❓",
    badge: "التمرين 5",
    title: "حوّل إلى سؤال",
    subtitle: "اقلب مكان الفاعل والفعل",
    ex: {
      type: "transform",
      mode: "q",
      items: [
        { s: "He", be: "is", adj: "tall", ar: "هل هو طويل؟" },
        { s: "She", be: "is", adj: "happy", ar: "هل هي سعيدة؟" },
        { s: "They", be: "are", adj: "tired", ar: "هل هم متعبون؟" },
        { s: "You", be: "are", adj: "ready", ar: "هل أنت جاهز؟" },
        { s: "It", be: "is", adj: "small", ar: "هل هو صغير؟" },
      ],
    },
  },
  {
    kind: "ex",
    section: S_EX,
    mascot: "🩹",
    badge: "التمرين 6",
    title: "صحّح الخطأ",
    subtitle: "كل جملة فيها خطأ واحد",
    ex: {
      type: "fix",
      items: [
        { wrong: "He is a tall.", correct: "He is tall.", why: "tall صفة ← بدون a" },
        { wrong: "She happy is.", correct: "She is happy.", why: "الترتيب: Subject + is + Adjective" },
        { wrong: "They are talls.", correct: "They are tall.", why: "الصفة لا تأخذ s" },
        { wrong: "He is smart student.", correct: "He is a smart student.", why: "student اسم مفرد ← يحتاج a" },
        { wrong: "She is a beautiful.", correct: "She is beautiful.", why: "beautiful صفة ← بدون a" },
      ],
    },
  },
  {
    kind: "ex",
    section: S_EX,
    mascot: "🔀",
    badge: "التمرين 7",
    title: "التحدي: رتّب الكلمات",
    subtitle: "اضغط الكلمات بالترتيب الصحيح",
    ex: {
      type: "order",
      items: [
        { words: ["is", "Khalil", "smart"], correct: ["Khalil", "is", "smart"], ar: "خليل ذكي." },
        { words: ["happy", "She", "is"], correct: ["She", "is", "happy"], ar: "هي سعيدة." },
        { words: ["are", "They", "tired"], correct: ["They", "are", "tired"], ar: "هم متعبون." },
        { words: ["car", "fast", "The", "is"], correct: ["The", "car", "is", "fast"], ar: "السيارة سريعة." },
        { words: ["student", "a", "He", "is", "smart"], correct: ["He", "is", "a", "smart", "student"], ar: "هو طالب ذكي." },
      ],
    },
  },
  {
    kind: "ex",
    section: S_EX,
    mascot: "🔬",
    badge: "التمرين 8",
    title: "حلّل الجملة",
    subtitle: "اضغط على كل كلمة لتحديد دورها",
    ex: {
      type: "analyze",
      items: [
        { parts: [p("He", "s"), p("is", "be"), p("a", "art"), p("smart", "adj"), p("student", "noun")], ar: "هو طالب ذكي." },
        { parts: [p("She", "s"), p("is", "be"), p("beautiful", "adj")], ar: "هي جميلة." },
        { parts: [p("The", "art"), p("car", "noun"), p("is", "be"), p("fast", "adj")], ar: "السيارة سريعة." },
        { parts: [p("They", "s"), p("are", "be"), p("happy", "adj"), p("students", "noun")], ar: "هم طلاب سعداء." },
        { parts: [p("I", "s"), p("am", "be"), p("tired", "adj")], ar: "أنا متعب." },
      ],
    },
  },

  { kind: "iq", section: S_EX, mascot: "🏆", title: "تحدي IQ200" },
  { kind: "summary", section: S_END, mascot: "🧠", title: "ملخص الدرس 5" },
  { kind: "quiz", section: S_END, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: S_END, mascot: "🚀", title: "أين وصلنا الآن؟" },
];

export const JOURNEY = [
  { n: 1, en: "Sentence", ar: "الجملة" },
  { n: 2, en: "Subject", ar: "الفاعل" },
  { n: 3, en: "Verb", ar: "الفعل" },
  { n: 4, en: "Object", ar: "المفعول به" },
  { n: 5, en: "Pronouns", ar: "الضمائر" },
  { n: 6, en: "Verb to be", ar: "am / is / are" },
  { n: 7, en: "Nouns", ar: "الأسماء" },
  { n: 8, en: "Articles", ar: "a / an / the" },
  { n: 9, en: "Adjectives", ar: "الصفات" },
];

export const NA_WORDS: { en: string; ar: string; isAdj: boolean }[] = [
  { en: "student", ar: "طالب", isAdj: false },
  { en: "smart", ar: "ذكي", isAdj: true },
  { en: "teacher", ar: "معلّم", isAdj: false },
  { en: "tall", ar: "طويل", isAdj: true },
  { en: "car", ar: "سيارة", isAdj: false },
  { en: "fast", ar: "سريع", isAdj: true },
];
