// ============================================================
// الدرس 12 — الماضي البسيط Past Simple
// المصدر الكامل محفوظ حرفيًا — لا تلخيص ولا إعادة صياغة
// العنوان: 📘 الدرس 12: الماضي البسيط Past Simple
// ============================================================

// -------------------- الضمائر --------------------
export const SUBJ12: string[] = ["I", "You", "He", "She", "It", "We", "They"];

// -------------------- الكلمات الدالة على الماضي (③) --------------------
export const PAST_SIGNALS: { en: string; ar: string }[] = [
  { en: "yesterday", ar: "أمس" },
  { en: "yesterday morning", ar: "صباح أمس" },
  { en: "yesterday afternoon", ar: "بعد ظهر أمس" },
  { en: "yesterday evening", ar: "مساء أمس" },
  { en: "last night", ar: "الليلة الماضية" },
  { en: "last week", ar: "الأسبوع الماضي" },
  { en: "last month", ar: "الشهر الماضي" },
  { en: "last year", ar: "السنة الماضية" },
  { en: "last summer", ar: "الصيف الماضي" },
  { en: "last Friday", ar: "الجمعة الماضية" },
  { en: "two days ago", ar: "منذ يومين" },
  { en: "three weeks ago", ar: "منذ ثلاثة أسابيع" },
  { en: "a year ago", ar: "منذ سنة" },
  { en: "in 2020", ar: "في عام 2020" },
  { en: "when I was young", ar: "عندما كنت صغيرًا" },
];

// -------------------- ago (④) --------------------
export const AGO_PHRASES: { en: string; ar: string }[] = [
  { en: "two days ago", ar: "منذ يومين" },
  { en: "three hours ago", ar: "منذ ثلاث ساعات" },
  { en: "five years ago", ar: "منذ خمس سنوات" },
];

// -------------------- قواعد إضافة -ed (⑩–⑭) --------------------
export type EdRuleKey = "add" | "add-d" | "y2i" | "vowel-y" | "double";

export interface EdVerb {
  base: string;
  past: string;
  ar?: string;
}

export const ED_RULES: Record<
  EdRuleKey,
  { name: string; ar: string; verbs: EdVerb[] }
> = {
  // الحالة 1: معظم الأفعال — نضيف ed
  add: {
    name: "+ ed",
    ar: "معظم الأفعال — نضيف ed",
    verbs: [
      { base: "work", past: "worked", ar: "يعمل" },
      { base: "clean", past: "cleaned", ar: "ينظف" },
      { base: "jump", past: "jumped", ar: "يقفز" },
      { base: "visit", past: "visited", ar: "يزور" },
      { base: "paint", past: "painted", ar: "يرسم / يطلي" },
    ],
  },
  // الفعل المنتهي بـ e — نضيف d فقط
  "add-d": {
    name: "+ d",
    ar: "الفعل ينتهي أصلًا بـ e — نضيف d فقط",
    verbs: [
      { base: "live", past: "lived", ar: "يعيش" },
      { base: "love", past: "loved", ar: "يحب" },
      { base: "move", past: "moved", ar: "ينتقل / يتحرك" },
      { base: "dance", past: "danced", ar: "يرقص" },
      { base: "close", past: "closed", ar: "يغلق" },
    ],
  },
  // حرف ساكن + y — نحوّل y إلى i ثم نضيف ed
  y2i: {
    name: "y → ied",
    ar: "حرف ساكن + y — نحوّل y إلى i ثم نضيف ed",
    verbs: [
      { base: "study", past: "studied", ar: "يدرس" },
      { base: "carry", past: "carried", ar: "يحمل" },
      { base: "try", past: "tried", ar: "يحاول" },
      { base: "cry", past: "cried", ar: "يبكي" },
      { base: "hurry", past: "hurried", ar: "يهرع / يسرع" },
    ],
  },
  // حرف متحرك + y — نبقي y ونضيف ed
  "vowel-y": {
    name: "keep y + ed",
    ar: "قبل y حرف متحرك (a / e / i / o / u) — نبقي y ونضيف ed",
    verbs: [
      { base: "play", past: "played", ar: "يلعب" },
      { base: "enjoy", past: "enjoyed", ar: "يستمتع" },
      { base: "stay", past: "stayed", ar: "يبقى" },
    ],
  },
  // بعض الأفعال القصيرة — نضاعف الحرف الأخير ثم نضيف ed
  double: {
    name: "double + ed",
    ar: "بعض الأفعال القصيرة — نضاعف الحرف الأخير ثم نضيف ed",
    verbs: [
      { base: "stop", past: "stopped", ar: "يتوقف" },
      { base: "plan", past: "planned", ar: "يخطط" },
    ],
  },
};

// أفعال القسم ⑦ المنتظمة الأساسية
export const REGULAR_BASIC: EdVerb[] = [
  { base: "play", past: "played" },
  { base: "clean", past: "cleaned" },
  { base: "watch", past: "watched" },
  { base: "visit", past: "visited" },
  { base: "open", past: "opened" },
  { base: "help", past: "helped" },
];

// آلة -ed التفاعلية (تجمع كل القواعد)
export const ED_MACHINE: { rule: EdRuleKey; base: string; past: string; ar: string }[] = [
  { rule: "add", base: "work", past: "worked", ar: "يعمل" },
  { rule: "add", base: "clean", past: "cleaned", ar: "ينظف" },
  { rule: "add", base: "jump", past: "jumped", ar: "يقفز" },
  { rule: "add", base: "visit", past: "visited", ar: "يزور" },
  { rule: "add", base: "paint", past: "painted", ar: "يرسم / يطلي" },
  { rule: "add", base: "watch", past: "watched", ar: "يشاهد" },
  { rule: "add", base: "open", past: "opened", ar: "يفتح" },
  { rule: "add", base: "help", past: "helped", ar: "يساعد" },
  { rule: "add-d", base: "live", past: "lived", ar: "يعيش" },
  { rule: "add-d", base: "love", past: "loved", ar: "يحب" },
  { rule: "add-d", base: "move", past: "moved", ar: "ينتقل" },
  { rule: "add-d", base: "dance", past: "danced", ar: "يرقص" },
  { rule: "add-d", base: "close", past: "closed", ar: "يغلق" },
  { rule: "y2i", base: "study", past: "studied", ar: "يدرس" },
  { rule: "y2i", base: "carry", past: "carried", ar: "يحمل" },
  { rule: "y2i", base: "try", past: "tried", ar: "يحاول" },
  { rule: "y2i", base: "cry", past: "cried", ar: "يبكي" },
  { rule: "y2i", base: "hurry", past: "hurried", ar: "يهرع" },
  { rule: "vowel-y", base: "play", past: "played", ar: "يلعب" },
  { rule: "vowel-y", base: "enjoy", past: "enjoyed", ar: "يستمتع" },
  { rule: "vowel-y", base: "stay", past: "stayed", ar: "يبقى" },
  { rule: "double", base: "stop", past: "stopped", ar: "يتوقف" },
  { rule: "double", base: "plan", past: "planned", ar: "يخطط" },
];

// -------------------- الأفعال غير المنتظمة (⑮–⑯) --------------------
export const IRREG_FLIP: { base: string; past: string }[] = [
  { base: "go", past: "went" },
  { base: "eat", past: "ate" },
  { base: "see", past: "saw" },
  { base: "come", past: "came" },
  { base: "take", past: "took" },
  { base: "give", past: "gave" },
  { base: "write", past: "wrote" },
  { base: "drink", past: "drank" },
  { base: "begin", past: "began" },
  { base: "find", past: "found" },
];

export interface IrregVerb {
  base: string;
  past: string;
  arBase: string;
  arPast: string;
}

export const IRREG_TABLE: IrregVerb[] = [
  { base: "go", past: "went", arBase: "يذهب", arPast: "ذهب" },
  { base: "come", past: "came", arBase: "يأتي", arPast: "أتى" },
  { base: "see", past: "saw", arBase: "يرى", arPast: "رأى" },
  { base: "eat", past: "ate", arBase: "يأكل", arPast: "أكل" },
  { base: "drink", past: "drank", arBase: "يشرب", arPast: "شرب" },
  { base: "take", past: "took", arBase: "يأخذ", arPast: "أخذ" },
  { base: "give", past: "gave", arBase: "يعطي", arPast: "أعطى" },
  { base: "get", past: "got", arBase: "يحصل على", arPast: "حصل على" },
  { base: "make", past: "made", arBase: "يصنع", arPast: "صنع" },
  { base: "have", past: "had", arBase: "يملك / لديه", arPast: "كان لديه" },
  { base: "do", past: "did", arBase: "يفعل", arPast: "فعل" },
  { base: "find", past: "found", arBase: "يجد", arPast: "وجد" },
  { base: "buy", past: "bought", arBase: "يشتري", arPast: "اشترى" },
  { base: "bring", past: "brought", arBase: "يحضر", arPast: "أحضر" },
  { base: "think", past: "thought", arBase: "يفكر", arPast: "فكّر" },
  { base: "know", past: "knew", arBase: "يعرف", arPast: "عرف" },
  { base: "write", past: "wrote", arBase: "يكتب", arPast: "كتب" },
  { base: "read", past: "read", arBase: "يقرأ", arPast: "قرأ" },
  { base: "speak", past: "spoke", arBase: "يتحدث", arPast: "تحدث" },
  { base: "run", past: "ran", arBase: "يركض", arPast: "ركض" },
];

// -------------------- بلوكات --------------------
export type Role12 = "s" | "v" | "o" | "adv" | "be" | "nt" | "aux";

export interface Part12 {
  text: string;
  role: Role12;
}

export const ROLE12_AR: Record<Role12, string> = {
  s: "الفاعل",
  v: "الفعل الماضي",
  o: "المفعول به",
  adv: "ظرف الزمان",
  be: "am / is / are",
  nt: "النفي",
  aux: "المساعد",
};

export type Block12 =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "sentence"; parts: Part12[]; ar?: string; note?: string; q?: boolean }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "coreIdea" }
  | { type: "chessCompare" }
  | { type: "signalWall" }
  | { type: "agoMachine" }
  | { type: "lastAgo" }
  | { type: "typeSplit" }
  | { type: "edBasic" }
  | { type: "edPairs"; rule: EdRuleKey }
  | { type: "edMachine" }
  | { type: "subjectGrid" }
  | { type: "playsCompare" }
  | { type: "irregFlip" }
  | { type: "irregTable" }
  | { type: "readTrick" }
  | { type: "timeline" };

export type Exercise12 =
  | { type: "transform"; items: { base: string; answer: string }[] }
  | { type: "classify"; items: { word: string; kind: "regular" | "irregular" }[] }
  | { type: "fill"; items: { stem: string; hint: string; answer: string; ar?: string }[] }
  | { type: "choose"; items: { stem: string; ar?: string; opts: string[]; answer: number; why: string }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why: string }[] }
  | { type: "why"; items: Why12Item[] }
  | { type: "iq"; items: IQ12Item[] }
  | { type: "pairs"; items: Pair12Item[]; lead?: string }
  | { type: "storyFill" }
  | { type: "teacher" };

export interface Why12Item {
  en1: string;
  en2: string;
  q: string;
  a: string;
}

export type IQ12Item =
  | { kind: "mcq"; q: string; opts: string[]; answer: number; why: string }
  | { kind: "correct"; q: string; wrong: string; correct: string; why: string }
  | { kind: "text"; q: string; a: string };

export interface Pair12Item {
  present: string;
  past: string;
  a: string;
}

export type Slide12 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block12[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise12 }
  | { kind: "detective"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "keyRule"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const A = "البداية";
const B = "الفكرة الأساسية";
const C = "الكلمات الدالة";
const D = "الأفعال المنتظمة";
const E = "الأفعال غير المنتظمة";
const F = "أخطاء وخط زمني";
const G = "التمارين";
const H = "التحديات";
const I = "الخاتمة";

const P = (text: string, role: Role12): Part12 => ({ text, role });

export const SLIDES: Slide12[] = [
  { kind: "cover", section: A, mascot: "📘" },
  { kind: "objectives", section: A, mascot: "🎯" },

  // ① ما هو Past Simple؟
  {
    kind: "lesson",
    section: B,
    mascot: "📘",
    step: "①",
    title: "ما هو Past Simple؟",
    lead: "Past Simple = الماضي البسيط — نستخدمه عندما نتحدث عن شيء حدث في الماضي وانتهى.",
    blocks: [
      { type: "text", text: "نستخدمه عندما نتحدث عن شيء: حدث في الماضي وانتهى." },
      { type: "coreIdea" },
      { type: "sentence", parts: [P("I", "s"), P("visited", "v"), P("the museum", "o"), P("yesterday", "adv")], ar: "أنا زرت المتحف أمس.", note: "الزيارة انتهت" },
      { type: "sentence", parts: [P("Maya", "s"), P("watched", "v"), P("a documentary", "o"), P("last night", "adv")], ar: "مايا شاهدت فيلمًا وثائقيًا الليلة الماضية.", note: "المشاهدة انتهت" },
      { type: "sentence", parts: [P("We", "s"), P("traveled", "v"), P("to Spain", "o"), P("last summer", "adv")], ar: "سافرنا إلى إسبانيا الصيف الماضي.", note: "الرحلة انتهت" },
      { type: "note", emoji: "⭐", text: "الفكرة الأساسية: حدث في الماضي + انتهى ===== [[Past Simple]]" },
    ],
  },

  // ② أهم فكرة في الدرس
  {
    kind: "lesson",
    section: B,
    mascot: "🧠",
    step: "②",
    title: "أهم فكرة في الدرس",
    lead: "قارن بين الحاضر والماضي بنفس الفعل:",
    blocks: [
      { type: "chessCompare" },
      { type: "sentence", parts: [P("I", "s"), P("play", "v"), P("chess", "o")], ar: "أنا ألعب الشطرنج.", note: "هذه عادة أو شيء أفعله بشكل عام — Present Simple" },
      { type: "sentence", parts: [P("I", "s"), P("played", "v"), P("chess", "o"), P("yesterday", "adv")], ar: "أنا لعبت الشطرنج أمس.", note: "حدث في الماضي وانتهى — Past Simple" },
      { type: "note", emoji: "💡", text: "إذن: [[play]] → حاضر — [[played]] → ماضي" },
    ],
  },

  // ③ كيف أعرف أن الجملة تتحدث عن الماضي؟
  {
    kind: "lesson",
    section: C,
    mascot: "🔑",
    step: "③",
    title: "كيف أعرف أن الجملة تتحدث عن الماضي؟",
    lead: "هناك كلمات تساعدنا كثيرًا. أهمها:",
    blocks: [
      { type: "signalWall" },
      { type: "sentence", parts: [P("We", "s"), P("visited", "v"), P("the zoo", "o"), P("yesterday", "adv")], note: "مثال" },
      { type: "sentence", parts: [P("She", "s"), P("called", "v"), P("me", "o"), P("last night", "adv")], note: "مثال" },
      { type: "sentence", parts: [P("They", "s"), P("moved", "v"), P("here", "adv"), P("two years ago", "adv")], note: "مثال" },
    ],
  },

  // ④ كلمة ago مهمة جدًا
  {
    kind: "lesson",
    section: C,
    mascot: "⭐",
    step: "④",
    title: "كلمة ago مهمة جدًا",
    lead: "ago تعني: منذ — لكنها تأتي بعد المدة.",
    blocks: [
      { type: "agoMachine" },
      { type: "sentence", parts: [P("I", "s"), P("met", "v"), P("him", "o"), P("two days ago", "adv")], ar: "قابلته منذ يومين." },
      { type: "sentence", parts: [P("She", "s"), P("moved", "v"), P("here", "adv"), P("three years ago", "adv")], ar: "انتقلت إلى هنا منذ ثلاث سنوات." },
      { type: "bad", en: "ago two days", why: "❌ المدة تأتي أولًا ثم كلمة ago" },
      { type: "ok", en: "two days ago", ar: "✅ الترتيب الصحيح" },
    ],
  },

  // ⑤ last و ago
  {
    kind: "lesson",
    section: C,
    mascot: "🔁",
    step: "⑤",
    title: "last و ago",
    lead: "قارن — كلاهما يشيران إلى الماضي:",
    blocks: [
      { type: "lastAgo" },
      { type: "sentence", parts: [P("I", "s"), P("visited", "v"), P("my cousin", "o"), P("last week", "adv")], ar: "زرت ابن عمي الأسبوع الماضي." },
      { type: "sentence", parts: [P("I", "s"), P("visited", "v"), P("my cousin", "o"), P("two weeks ago", "adv")], ar: "زرت ابن عمي منذ أسبوعين." },
      { type: "note", emoji: "💡", text: "كلاهما يشيران إلى الماضي." },
    ],
  },

  // ⑥ كيف نصنع الماضي؟
  {
    kind: "lesson",
    section: D,
    mascot: "🧩",
    step: "⑥",
    title: "كيف نصنع الماضي؟",
    lead: "لدينا نوعان أساسيان من الأفعال — سنبدأ بالمنتظمة.",
    blocks: [
      { type: "typeSplit" },
      { type: "text", text: "① Regular Verbs — الأفعال المنتظمة — ② Irregular Verbs — الأفعال غير المنتظمة. سنبدأ بالمنتظمة." },
    ],
  },

  // ⑦ Regular Verbs
  {
    kind: "lesson",
    section: D,
    mascot: "🟢",
    step: "⑦",
    title: "Regular Verbs — الأفعال المنتظمة",
    lead: "الأفعال المنتظمة غالبًا نضيف لها: -ed",
    blocks: [
      { type: "edBasic" },
      { type: "sentence", parts: [P("Lina", "s"), P("visited", "v"), P("the science museum", "o"), P("yesterday", "adv")], ar: "لينا زارت متحف العلوم أمس." },
      { type: "sentence", parts: [P("The boys", "s"), P("played", "v"), P("volleyball", "o"), P("last Saturday", "adv")], ar: "الأولاد لعبوا الكرة الطائرة السبت الماضي." },
    ],
  },

  // ⑧ شيء جميل جدًا في Past Simple
  {
    kind: "lesson",
    section: D,
    mascot: "🧠",
    step: "⑧",
    title: "شيء جميل جدًا في Past Simple",
    lead: "الجميع يستخدم نفس شكل الماضي!",
    blocks: [
      { type: "text", text: "تذكر أننا في Present Simple قلنا: I play. You play. We play. They play. لكن: He plays. She plays. It plays. أي أن He / She / It تحتاج غالبًا s." },
      { type: "subjectGrid" },
      { type: "note", emoji: "⭐", text: "الجميع يستخدم نفس شكل الماضي!" },
      { type: "bad", en: "He playeds", why: "❌ لا وجود لهذه الكلمة" },
      { type: "bad", en: "She playedss", why: "❌ لا وجود لهذه الكلمة" },
      { type: "ok", en: "They played", ar: "ليست خطأ — هذه صحيحة ✅" },
      { type: "note", emoji: "📌", text: "القاعدة: [[Subject + past verb]] مع جميع الضمائر." },
    ],
  },

  // ⑨ مقارنة مهمة جدًا
  {
    kind: "lesson",
    section: D,
    mascot: "⚖️",
    step: "⑨",
    title: "مقارنة مهمة جدًا",
    lead: "نفس الفعل ونفس الشخص — الفرق هو الزمن:",
    blocks: [
      { type: "playsCompare" },
      { type: "sentence", parts: [P("He", "s"), P("plays", "v"), P("football", "o"), P("every Saturday", "adv")], ar: "هو يلعب كرة القدم كل يوم سبت.", note: "Present Simple — لاحظ: plays" },
      { type: "sentence", parts: [P("He", "s"), P("played", "v"), P("football", "o"), P("last Saturday", "adv")], ar: "هو لعب كرة القدم السبت الماضي.", note: "Past Simple — لاحظ: played" },
      { type: "bad", en: "He playeds football last Saturday.", why: "وليس playeds ❌" },
      { type: "note", emoji: "⭐", text: "الماضي لا يحتاج s مع He / She / It." },
    ],
  },

  // ⑩ قواعد إضافة -ed — الحالة 1
  {
    kind: "lesson",
    section: D,
    mascot: "✏️",
    step: "⑩",
    title: "قواعد إضافة -ed بالتفصيل — الحالة 1: معظم الأفعال",
    lead: "ليست كل الأفعال بسيطة تمامًا. هناك قواعد للكتابة.",
    blocks: [
      { type: "text", text: "الحالة 1: معظم الأفعال — نضيف ed." },
      { type: "edPairs", rule: "add" },
      { type: "sentence", parts: [P("Nora", "s"), P("painted", "v"), P("her room", "o"), P("last weekend", "adv")], note: "مثال" },
    ],
  },

  // ⑪ الفعل المنتهي بـ e
  {
    kind: "lesson",
    section: D,
    mascot: "🔤",
    step: "⑪",
    title: "الفعل المنتهي بـ e",
    lead: "إذا كان الفعل ينتهي أصلًا بـ e: نضيف d فقط.",
    blocks: [
      { type: "edPairs", rule: "add-d" },
      { type: "sentence", parts: [P("We", "s"), P("lived", "v"), P("there", "adv"), P("for two years", "adv")], ar: "عشنا هناك لمدة سنتين." },
      { type: "bad", en: "liveed", why: "لا نقول liveed ❌" },
      { type: "ok", en: "lived", ar: "بل: lived ✅" },
    ],
  },

  // ⑫ الفعل المنتهي بـ consonant + y
  {
    kind: "lesson",
    section: D,
    mascot: "🔡",
    step: "⑫",
    title: "الفعل المنتهي بـ consonant + y",
    lead: "إذا انتهى الفعل بـ: حرف ساكن + y — نحوّل y → i ثم نضيف ed.",
    blocks: [
      { type: "edPairs", rule: "y2i" },
      { type: "sentence", parts: [P("Sara", "s"), P("studied", "v"), P("English", "o"), P("yesterday", "adv")], ar: "سارة درست الإنجليزية أمس." },
      { type: "sentence", parts: [P("The boy", "s"), P("tried", "v"), P("to open the door", "o")], ar: "الولد حاول فتح الباب." },
    ],
  },

  // ⑬ لكن انتبه إلى y
  {
    kind: "lesson",
    section: D,
    mascot: "🔥",
    step: "⑬",
    title: "لكن انتبه إلى y",
    lead: "إذا كان قبل y حرف متحرك: a / e / i / o / u — نبقي y ونضيف ed.",
    blocks: [
      { type: "edPairs", rule: "vowel-y" },
      { type: "sentence", parts: [P("We", "s"), P("enjoyed", "v"), P("the concert", "o")], ar: "استمتعنا بالحفل." },
      { type: "note", emoji: "💡", text: "إذن: [[study → studied]] لكن: [[play → played]] — لماذا؟ لأن: study = consonant + y، play = vowel + y." },
    ],
  },

  // ⑭ مضاعفة الحرف الأخير
  {
    kind: "lesson",
    section: D,
    mascot: "🔁",
    step: "⑭",
    title: "بعض الأفعال القصيرة تضاعف الحرف الأخير",
    lead: "في بعض الأفعال القصيرة، نضاعف الحرف الأخير ثم نضيف ed.",
    blocks: [
      { type: "edPairs", rule: "double" },
      { type: "sentence", parts: [P("The bus", "s"), P("stopped", "v"), P("near the school", "adv")], ar: "الحافلة توقفت قرب المدرسة." },
      { type: "sentence", parts: [P("We", "s"), P("planned", "v"), P("a surprise party", "o")], ar: "خططنا لحفلة مفاجئة." },
      { type: "edMachine" },
      { type: "note", emoji: "🧠", text: "سنعود لهذه القاعدة بتفصيل أكبر لاحقًا، لكن من المهم أن تبدأ بالتعرف عليها الآن." },
    ],
  },

  // ⑮ Irregular Verbs
  {
    kind: "lesson",
    section: E,
    mascot: "🟠",
    step: "⑮",
    title: "Irregular Verbs — الأفعال غير المنتظمة",
    lead: 'هنا لا نستطيع أن نقول: "أضيف ed وخلاص." بعض الأفعال تغير شكلها بالكامل.',
    blocks: [
      { type: "irregFlip" },
      { type: "text", text: "go → went — eat → ate — see → saw — come → came — take → took — give → gave — write → wrote — drink → drank — begin → began — find → found" },
      { type: "sentence", parts: [P("I", "s"), P("went", "v"), P("to the library", "o"), P("yesterday", "adv")], ar: "ذهبت إلى المكتبة أمس." },
      { type: "bad", en: "I goed", why: "لا نقول I goed ❌" },
      { type: "ok", en: "I went", ar: "بل: I went ✅" },
    ],
  },

  // ⑯ مجموعة مهمة جدًا
  {
    kind: "lesson",
    section: E,
    mascot: "📚",
    step: "⑯",
    title: "مجموعة مهمة جدًا من الأفعال",
    lead: "احفظ هذه المجموعة تدريجيًا — اضغط على أي بطاقة لتكشف الماضي:",
    blocks: [{ type: "irregTable" }],
  },

  // ⑰ انتبه إلى read
  {
    kind: "lesson",
    section: E,
    mascot: "👀",
    step: "⑰",
    title: "انتبه إلى read",
    lead: "هذه من الأفعال الخادعة — الكتابة نفسها، لكن النطق مختلف.",
    blocks: [
      { type: "readTrick" },
      { type: "text", text: "Present: read = ريد — Past: read = رِد" },
      { type: "sentence", parts: [P("I", "s"), P("read", "v"), P("books", "o"), P("every week", "adv")], ar: "أنا أقرأ الكتب كل أسبوع.", note: "Present Simple" },
      { type: "sentence", parts: [P("I", "s"), P("read", "v"), P("a great book", "o"), P("yesterday", "adv")], ar: "قرأت كتابًا رائعًا أمس.", note: "Past Simple" },
      { type: "note", emoji: "👀", text: "الكتابة نفسها، لكن النطق مختلف." },
    ],
  },

  // ⑱ الماضي لا يحتاج am / is / are
  {
    kind: "lesson",
    section: F,
    mascot: "🚫",
    step: "⑱",
    title: "الماضي لا يحتاج am / is / are مع الفعل العادي",
    lead: "خطأ شائع — تجنّبه:",
    blocks: [
      { type: "bad", en: "I am visited my grandmother yesterday.", why: "خطأ شائع ❌" },
      { type: "ok", en: "I visited my grandmother yesterday.", ar: "الصحيح ✅" },
      { type: "text", text: "لماذا؟ لأن: visited هو فعل الماضي نفسه. لا نحتاج: am." },
      { type: "ok", en: "She watched a movie.", ar: "مثال صحيح" },
      { type: "bad", en: "She is watched a movie.", why: "وليس ❌" },
      { type: "ok", en: "They traveled last month.", ar: "مثال صحيح" },
      { type: "bad", en: "They are traveled last month.", why: "وليس ❌" },
    ],
  },

  // ⑲ لا نستخدم Present Continuous للماضي المنتهي
  {
    kind: "lesson",
    section: F,
    mascot: "🎬",
    step: "⑲",
    title: "لا نستخدم Present Continuous للماضي المنتهي",
    lead: "كلمة yesterday تدل على الماضي — فلا نستخدم زمن الحاضر المستمر.",
    blocks: [
      { type: "bad", en: "I am visiting the museum yesterday.", why: "❌ لدينا yesterday وهذا يدل على الماضي" },
      { type: "ok", en: "I visited the museum yesterday.", ar: "الصحيح ✅" },
      { type: "note", emoji: "⭐", text: "تذكر: now → غالبًا Present Continuous — yesterday → Past Simple" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("studying", "v"), P("now", "adv")], ar: "أنا أدرس الآن.", note: "Present Continuous" },
      { type: "sentence", parts: [P("I", "s"), P("studied", "v"), P("yesterday", "adv")], ar: "أنا درست أمس.", note: "Past Simple" },
    ],
  },

  // ⑳ خط زمني
  {
    kind: "lesson",
    section: F,
    mascot: "🕒",
    step: "⑳",
    title: "خط زمني",
    lead: "تخيل الزمن هكذا — إذا حدث الفعل في الماضي وانتهى، نستخدم Past Simple.",
    blocks: [
      { type: "timeline" },
      { type: "note", emoji: "🎬", text: "Yesterday → [[I watched a movie.]] — أما الآن: Now → [[I am watching a movie.]] — نفس الفكرة، لكن الزمن مختلف." },
    ],
  },

  // ---------------- التمارين ----------------
  // المستوى 1
  {
    kind: "ex",
    section: G,
    mascot: "✏️",
    badge: "المستوى 1",
    title: "حوّل إلى الماضي",
    subtitle: "حوّل الأفعال التالية إلى Past Simple",
    ex: {
      type: "transform",
      items: [
        { base: "play", answer: "played" },
        { base: "clean", answer: "cleaned" },
        { base: "visit", answer: "visited" },
        { base: "watch", answer: "watched" },
        { base: "help", answer: "helped" },
        { base: "open", answer: "opened" },
        { base: "dance", answer: "danced" },
        { base: "live", answer: "lived" },
        { base: "study", answer: "studied" },
        { base: "carry", answer: "carried" },
      ],
    },
  },

  // المستوى 2
  {
    kind: "ex",
    section: G,
    mascot: "🗂️",
    badge: "المستوى 2",
    title: "Regular أم Irregular؟",
    subtitle: "صنّف الأفعال — اكتب: Regular أو Irregular",
    ex: {
      type: "classify",
      items: [
        { word: "played", kind: "regular" },
        { word: "went", kind: "irregular" },
        { word: "cleaned", kind: "regular" },
        { word: "saw", kind: "irregular" },
        { word: "visited", kind: "regular" },
        { word: "ate", kind: "irregular" },
        { word: "opened", kind: "regular" },
        { word: "bought", kind: "irregular" },
        { word: "watched", kind: "regular" },
        { word: "wrote", kind: "irregular" },
      ],
    },
  },

  // المستوى 3
  {
    kind: "ex",
    section: G,
    mascot: "✍️",
    badge: "المستوى 3",
    title: "أكمل الجملة",
    subtitle: "ضع الفعل في الماضي",
    ex: {
      type: "fill",
      items: [
        { stem: "Yesterday, Lina _______ a strange bird.", hint: "see", answer: "saw", ar: "Yesterday → أمس" },
        { stem: "Omar _______ his room last Saturday.", hint: "clean", answer: "cleaned", ar: "last Saturday → السبت الماضي" },
        { stem: "We _______ pizza last night.", hint: "eat", answer: "ate", ar: "last night → الليلة الماضية" },
        { stem: "My parents _______ to the beach last summer.", hint: "travel", answer: "traveled", ar: "last summer → الصيف الماضي" },
        { stem: "Sara _______ a letter yesterday.", hint: "write", answer: "wrote", ar: "yesterday → أمس" },
        { stem: "The children _______ in the park two hours ago.", hint: "play", answer: "played", ar: "two hours ago → منذ ساعتين" },
        { stem: "I _______ my keys under the sofa.", hint: "find", answer: "found" },
        { stem: "He _______ a new backpack last week.", hint: "buy", answer: "bought", ar: "last week → الأسبوع الماضي" },
      ],
    },
  },

  // المستوى 4
  {
    kind: "ex",
    section: G,
    mascot: "🔘",
    badge: "المستوى 4",
    title: "اختر الصحيح",
    subtitle: "اختر الشكل الصحيح للفعل في Past Simple",
    ex: {
      type: "choose",
      items: [
        { stem: "He _______ to the mountains last weekend.", opts: ["go", "goes", "went"], answer: 2, why: "go فعل غير منتظم → went — last weekend ماضٍ." },
        { stem: "They _______ a new game yesterday.", opts: ["played", "plays", "play"], answer: 0, why: "yesterday ماضٍ → played، والماضي لا يأخذ s." },
        { stem: "She _______ breakfast at 8:00 yesterday.", opts: ["eat", "ate", "eats"], answer: 1, why: "eat غير منتظم → ate." },
        { stem: "We _______ the museum last month.", opts: ["visited", "visit", "visits"], answer: 0, why: "last month ماضٍ → visited." },
        { stem: "Ali _______ a beautiful picture.", opts: ["draw", "draws", "drew"], answer: 2, why: "draw غير منتظم → drew." },
      ],
    },
  },

  // المستوى 5
  {
    kind: "ex",
    section: G,
    mascot: "🩹",
    badge: "المستوى 5",
    title: "اكتشف الخطأ",
    subtitle: "صحح الجمل التالية",
    ex: {
      type: "fix",
      items: [
        { wrong: "He goed to the market yesterday.", correct: "He went to the market yesterday.", why: "go فعل غير منتظم → went وليس goed." },
        { wrong: "Sara buyed a new notebook.", correct: "Sara bought a new notebook.", why: "buy فعل غير منتظم → bought وليس buyed." },
        { wrong: "They plays football last Friday.", correct: "They played football last Friday.", why: "الفعل الماضي لا يأخذ s → played." },
        { wrong: "I am visited my uncle yesterday.", correct: "I visited my uncle yesterday.", why: "الفعل الماضي لا يحتاج am → visited وحدها." },
        { wrong: "She studyed for the exam.", correct: "She studied for the exam.", why: "consonant + y: y → i ثم ed → studied." },
        { wrong: "We eated lunch at noon.", correct: "We ate lunch at noon.", why: "eat فعل غير منتظم → ate وليس eated." },
        { wrong: "My brother writed a story.", correct: "My brother wrote a story.", why: "write فعل غير منتظم → wrote وليس writed." },
        { wrong: "He watcheds a movie last night.", correct: "He watched a movie last night.", why: "الفعل الماضي لا يأخذ s → watched." },
      ],
    },
  },

  // المستوى 6
  {
    kind: "ex",
    section: G,
    mascot: "🧠",
    badge: "المستوى 6",
    title: "لماذا؟",
    subtitle: "لا أريد الإجابة فقط — أريد السبب.",
    ex: {
      type: "why",
      items: [
        {
          en1: "He plays tennis every weekend.",
          en2: "He played tennis last weekend.",
          q: "لماذا تغير: plays → played؟",
          a: "الجملة الأولى Present Simple مع every weekend (عادة متكررة) ومع He يأخذ الفعل s: plays. الجملة الثانية Past Simple مع last weekend (حدث وقع وانتهى) فنستخدم صيغة الماضي: played، والفعل الماضي لا يأخذ s.",
        },
        {
          en1: "She studies English every day.",
          en2: "She studied English yesterday.",
          q: "لماذا: studies → studied؟",
          a: "every day عادة → Present Simple، ومع She: studies (consonant + y في الحاضر). yesterday حدث ماضٍ منتهٍ → Past Simple، وstudy تنتهي بـ consonant + y فتتحول y إلى i ثم نضيف ed: studied.",
        },
        {
          en1: "They go to school every day.",
          en2: "They went to school yesterday.",
          q: "لماذا لم نقل: goed؟",
          a: "لأن go فعل غير منتظم (Irregular) يغيّر شكله بالكامل في الماضي: go → went. قاعدة ed لا تنطبق عليه، لذلك لا نقول goed.",
        },
      ],
    },
  },

  // المستوى 7
  {
    kind: "ex",
    section: G,
    mascot: "🔥",
    badge: "المستوى 7",
    title: "Present أم Past؟",
    subtitle: "اختر الزمن الصحيح من الكلمة الدالة",
    ex: {
      type: "choose",
      items: [
        { stem: "I _______ my grandmother every Friday.", opts: ["visit", "visited"], answer: 0, why: "every Friday عادة متكررة → Present Simple: visit." },
        { stem: "I _______ my grandmother last Friday.", opts: ["visit", "visited"], answer: 1, why: "last Friday ماضٍ منتهٍ → Past Simple: visited." },
        { stem: "He _______ football every afternoon.", opts: ["plays", "played"], answer: 0, why: "every afternoon عادة → plays (مع He)." },
        { stem: "He _______ football yesterday afternoon.", opts: ["plays", "played"], answer: 1, why: "yesterday afternoon ماضٍ → played." },
        { stem: "We _______ to the museum last month.", opts: ["go", "went"], answer: 1, why: "last month ماضٍ وgo غير منتظم → went." },
        { stem: "We usually _______ to the museum in summer.", opts: ["go", "went"], answer: 0, why: "usually عادة → Present Simple: go." },
      ],
    },
  },

  // المستوى 8 — IQ200
  {
    kind: "ex",
    section: H,
    mascot: "🔥🔥",
    badge: "المستوى 8 · IQ200",
    title: "IQ200",
    subtitle: "ستة تحديات — فكّر في الزمن أولًا",
    ex: {
      type: "iq",
      items: [
        {
          kind: "mcq",
          q: "السؤال 1 — أي جملة صحيحة؟",
          opts: ["① He played football yesterday.", "② He plays football yesterday.", "③ He play football yesterday.", "④ He is played football yesterday."],
          answer: 0,
          why: "yesterday ماضٍ → played بدون s وبدون am/is/are. الصحيحة: He played football yesterday.",
        },
        {
          kind: "correct",
          q: "السؤال 2 — صحح:",
          wrong: "She studyed all night.",
          correct: "She studied all night.",
          why: "study تنتهي بـ consonant + y → y إلى i ثم ed: studied.",
        },
        {
          kind: "correct",
          q: "السؤال 3 — صحح:",
          wrong: "They goed to the cinema last Saturday.",
          correct: "They went to the cinema last Saturday.",
          why: "go فعل غير منتظم → went، ولا نضيف له ed.",
        },
        {
          kind: "mcq",
          q: "السؤال 4 — أي واحدة مختلفة؟ ولماذا؟",
          opts: [
            "① I visited my aunt yesterday.",
            "② I watched a movie last night.",
            "③ I am watching a movie now.",
            "④ I cleaned my room yesterday.",
          ],
          answer: 2,
          why: "③ مختلفة لأنها Present Continuous تصف حدثًا يحدث الآن (now)، بينما البقية أحداث ماضية انتهت (yesterday / last night).",
        },
        {
          kind: "mcq",
          q: "السؤال 5 — اختر: [[My father _______ a new phone two weeks ago.]]",
          opts: ["① buys", "② bought", "③ buy", "④ is buying"],
          answer: 1,
          why: "two weeks ago يدل على الماضي، وbuy فعل غير منتظم → bought.",
        },
        {
          kind: "text",
          q: "السؤال 6 — أكمل: Yesterday, I _______ to the park, _______ my friend, and _______ home before sunset. الأفعال: go / meet / come — حوّلها إلى Past Simple.",
          a: "Yesterday, I went to the park, met my friend, and came home before sunset. — go → went، meet → met، come → came (ثلاثتها أفعال غير منتظمة).",
        },
      ],
    },
  },

  // المستوى 9 — Grammar Detective
  { kind: "detective", section: H, mascot: "🕵️", title: "المستوى 9 — Grammar Detective" },

  // المستوى 10 — تحدي الزمنين
  {
    kind: "ex",
    section: H,
    mascot: "🏆",
    badge: "المستوى 10",
    title: "تحدي الزمنين",
    subtitle: "لكل زوج، اشرح الفرق — اسأل نفسك: ما الذي تغير؟ الفعل فقط؟ أم الزمن والمعنى أيضًا؟",
    ex: {
      type: "pairs",
      lead: "اسأل نفسك: ما الذي تغير؟ الفعل فقط؟ أم الزمن والمعنى أيضًا؟",
      items: [
        {
          present: "I visit my cousin every month.",
          past: "I visited my cousin last month.",
          a: "الأولى Present Simple مع every month (عادة متكررة) → visit. الثانية Past Simple مع last month (حدث وقع وانتهى الشهر الماضي) → visited. تغيّر شكل الفعل والزمن والمعنى.",
        },
        {
          present: "She studies French every evening.",
          past: "She studied French yesterday evening.",
          a: "every evening عادة → Present Simple: studies. yesterday evening حدث ماضٍ انتهى → Past Simple: study تنتهي بـ consonant + y → studied.",
        },
        {
          present: "They play in the garden.",
          past: "They played in the garden yesterday.",
          a: "الأولى تصف عادة/حالة عامة في الحاضر → play. الثانية مع yesterday حدث ماضٍ انتهى → played بإضافة ed.",
        },
      ],
    },
  },

  // المستوى 11 — IQ200 النهائي
  {
    kind: "ex",
    section: H,
    mascot: "🔥🔥",
    badge: "المستوى 11 · IQ200 النهائي",
    title: "IQ200 النهائي — أكمل القصة",
    subtitle: "حوّل كل فعل إلى Past Simple — لا تستخدم الفعل كما هو.",
    ex: { type: "storyFill" },
  },

  // تحدي الأستاذ
  {
    kind: "ex",
    section: H,
    mascot: "👑",
    badge: "تحدي الأستاذ — IQ200+",
    title: "اكتب قصة قصيرة",
    subtitle: 'اكتب قصة قصيرة من 8 جمل عن "يوم مميز في الماضي".',
    ex: { type: "teacher" },
  },

  // ملخص
  { kind: "summary", section: I, mascot: "🧠", title: "ملخص الدرس — Past Simple" },
  { kind: "keyRule", section: I, mascot: "⭐", title: "أهم قاعدة في الدرس" },
  { kind: "quiz", section: I, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: I, mascot: "🎓", title: "الخاتمة" },
];

// ============================================================
// محتوى ثابت إضافي
// ============================================================

// المستوى 9 — Grammar Detective
export const GRAMMAR_DETECTIVE_PASSAGE =
  "Last Saturday, Daniel woke up early. He made breakfast for his family and then rode his bicycle to the lake. He met two friends there. They played a game near the water and took some photos. Later, Daniel went home and wrote about his adventure in his notebook.";

export const GRAMMAR_DETECTIVE_Q: { q: string; a: string }[] = [
  { q: "① استخرج جميع أفعال الماضي.", a: "woke · made · rode · met · played · took · went · wrote" },
  { q: "② الأفعال المنتظمة.", a: "played — فعل منتظم وحيد (play + ed)." },
  { q: "③ الأفعال غير المنتظمة.", a: "woke · made · rode · met · took · went · wrote — كلها تغيّرت دون ed." },
  { q: "④ كلمة تدل على الماضي.", a: "Last Saturday — وكذلك Later تدل على الترتيب في الماضي." },
  { q: "⑤ ما الفعل الماضي من wake؟", a: "woke" },
  { q: "⑥ ما الفعل الماضي من make؟", a: "made" },
  { q: "⑦ ما الفعل الماضي من ride؟", a: "rode" },
  { q: "⑧ ما الفعل الماضي من meet؟", a: "met" },
  { q: "⑨ ما الفعل الماضي من take؟", a: "took" },
  { q: "⑩ ما الفعل الماضي من write؟", a: "wrote" },
];

// المستوى 11 — قصة Mia
export const MIA_STORY = {
  withBlanks:
    "Yesterday, Mia _______ up early. She _______ breakfast, _______ her backpack, and _______ to school. At school, she _______ her best friend. They _______ together during the break. After school, Mia _______ home and _______ a book.",
  blanks: [
    { base: "wake", past: "woke" },
    { base: "eat", past: "ate" },
    { base: "pack", past: "packed" },
    { base: "walk", past: "walked" },
    { base: "meet", past: "met" },
    { base: "talk", past: "talked" },
    { base: "go", past: "went" },
    { base: "read", past: "read" },
  ],
  full:
    "Yesterday, Mia woke up early. She ate breakfast, packed her backpack, and walked to school. At school, she met her best friend. They talked together during the break. After school, Mia went home and read a book.",
};

// تحدي الأستاذ
export const TEACHER_CHALLENGE = {
  conditions: [
    "① استخدم yesterday أو last week أو ago.",
    "② استخدم 4 أفعال Regular على الأقل.",
    "③ استخدم 4 أفعال Irregular على الأقل.",
    "④ لا تستخدم أمثلة الدرس نفسها.",
    "⑤ اجعل الأحداث مرتبة زمنيًا.",
  ],
  sequence: ["First...", "Then...", "After that...", "Later...", "Finally..."],
  model: [
    "Last week, I visited a small town with my family.",
    "We traveled there by train.",
    "My father bought our tickets in the morning.",
    "We met a kind guide near the station.",
    "He showed us an old museum.",
    "We ate lunch in a small café.",
    "After that, I found a beautiful old coin in the market.",
    "Later, we walked beside the river.",
    "We took many photos there.",
    "Finally, we went home before sunset, and I really enjoyed that special day.",
  ],
  modelNote:
    "نموذج مقترح للترتيب فقط — لا تنسخه. أفعال Regular: visited · traveled · showed · walked · enjoyed. أفعال Irregular: bought · met · ate · found · took · went.",
};

// ملخص الدرس
export const SUMMARY12 = {
  signals: [
    "yesterday",
    "last night",
    "last week",
    "last month",
    "last year",
    "two days ago",
    "three years ago",
    "in 2020",
  ],
  regular: [
    { base: "play", past: "played" },
    { base: "watch", past: "watched" },
    { base: "clean", past: "cleaned" },
  ],
  endE: [
    { base: "live", past: "lived" },
    { base: "dance", past: "danced" },
  ],
  consonantY: [
    { base: "study", past: "studied" },
    { base: "try", past: "tried" },
  ],
  vowelY: [
    { base: "play", past: "played" },
    { base: "enjoy", past: "enjoyed" },
  ],
  irregular: [
    { base: "go", past: "went" },
    { base: "eat", past: "ate" },
    { base: "see", past: "saw" },
    { base: "take", past: "took" },
    { base: "write", past: "wrote" },
    { base: "buy", past: "bought" },
    { base: "make", past: "made" },
  ],
};

// أهم قاعدة + قاعدة IQ200
export const KEY_RULE = {
  present: ["He plays.", "She watches.", "He studies."],
  past: ["He played.", "She watched.", "He studied."],
  ok: "He played.",
  bad: "He playeds.",
  iq: [
    { signal: "every day", tense: "غالبًا Present Simple" },
    { signal: "now", tense: "غالبًا Present Continuous" },
    { signal: "yesterday", tense: "Past Simple" },
    { signal: "last week", tense: "Past Simple" },
    { signal: "two days ago", tense: "Past Simple" },
  ],
  question: 'ثم اسأل: "هل الحدث انتهى؟" إذا كان نعم: 🔥 Past Simple',
  nextLesson:
    "في الدرس 13 سنبني فوق هذا مباشرةً ونأخذ الجزء المهم جدًا: النفي في Past Simple باستخدام did / didn't، ولماذا يعود الفعل بعد did وdidn't إلى شكله الأساسي، ثم الأسئلة والإجابات القصيرة.",
};
