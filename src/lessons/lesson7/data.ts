// ============================================================
// الدرس 7 — Present Simple: النفي والسؤال والإجابات القصيرة
// Do / Does + اختفاء الـ s
// ============================================================

export interface Verb7 {
  base: string;
  s: string;
  ar: string;
}

export const VERBS7: Verb7[] = [
  { base: "play", s: "plays", ar: "يلعب" },
  { base: "study", s: "studies", ar: "يدرس" },
  { base: "watch", s: "watches", ar: "يشاهد" },
  { base: "go", s: "goes", ar: "يذهب" },
  { base: "like", s: "likes", ar: "يحب" },
  { base: "work", s: "works", ar: "يعمل" },
  { base: "eat", s: "eats", ar: "يأكل" },
  { base: "fix", s: "fixes", ar: "يصلح" },
  { base: "need", s: "needs", ar: "يحتاج" },
  { base: "live", s: "lives", ar: "يعيش" },
];

export interface Subj7 {
  en: string;
  ar: string;
  third: boolean;
}

export const SUBJ7: Subj7[] = [
  { en: "I", ar: "أنا", third: false },
  { en: "You", ar: "أنت", third: false },
  { en: "We", ar: "نحن", third: false },
  { en: "They", ar: "هم", third: false },
  { en: "He", ar: "هو", third: true },
  { en: "She", ar: "هي", third: true },
  { en: "It", ar: "هو / هي لغير العاقل", third: true },
  { en: "Khalil", ar: "خليل", third: true },
  { en: "Sara", ar: "سارة", third: true },
  { en: "Adam", ar: "آدم", third: true },
];

export const auxFor = (third: boolean) => (third ? "does" : "do");
export const negFor = (third: boolean) => (third ? "doesn't" : "don't");

export function arVerb7(ar: string, subj: string): string {
  const stem = ar.slice(1);
  const FEM = ["She", "Sara", "Mia", "Mira"];
  if (subj === "I") return `أ${stem}`;
  if (subj === "You") return `ت${stem}`;
  if (subj === "We") return `ن${stem}`;
  if (subj === "They") return `${ar}ون`;
  if (FEM.includes(subj)) return `ت${stem}`;
  return ar;
}

// -------------------- بلوكات --------------------
export type Role7 = "s" | "v" | "aux" | "nt" | "o" | "adv";

export interface Part7 {
  text: string;
  role: Role7;
}

export const ROLE7_AR: Record<Role7, string> = {
  s: "الفاعل",
  v: "الفعل",
  aux: "الفعل المساعد",
  nt: "النفي",
  o: "المفعول به",
  adv: "كلمة التكرار",
};

export type Block7 =
  | { type: "text"; text: string }
  | { type: "sentence"; parts: Part7[]; ar: string; note?: string; q?: boolean }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "groupsDo" }
  | { type: "vanish" }
  | { type: "chains" }
  | { type: "beVsDo" }
  | { type: "compareTwo" }
  | { type: "advTable" }
  | { type: "mapTable" }
  | { type: "modelCard" };

// -------------------- التمارين --------------------
export type Exercise7 =
  | { type: "auxPick"; items: { before: string; after: string; ar: string; opts: [string, string]; answer: number }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why: string }[] }
  | { type: "transform"; mode: "neg" | "q"; items: { s: string; v: string; vs: string; o: string; ar: string; third: boolean }[] }
  | { type: "choose"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "classify"; items: { en: string; ar: string; answer: "aff" | "neg" | "q" }[] };

export const CLS_AR: Record<"aff" | "neg" | "q", string> = {
  aff: "مثبتة",
  neg: "منفية",
  q: "سؤال",
};

export type Slide7 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block7[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise7 }
  | { kind: "iq"; title: string }
  | { kind: "challenge"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "closing"; title: string }
);

const A = "البداية";
const B = "المراجعة";
const C = "المساعدان";
const D = "النفي";
const E = "السؤال";
const F = "الإجابات";
const G = "المقارنة";
const H = "التمارين";
const I = "الخاتمة";

const P = (text: string, role: Role7): Part7 => ({ text, role });

export const SLIDES: Slide7[] = [
  { kind: "cover", section: A, mascot: "🎭" },
  { kind: "objectives", section: A, mascot: "🎯" },

  {
    kind: "lesson",
    section: B,
    mascot: "🔁",
    step: "1",
    title: "مراجعة سريعة جدًا",
    lead: "في الدرس السابق تعلمنا الإثبات — اليوم نتعلم النفي والسؤال.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("play", "v"), P("football", "o")], ar: "أنا ألعب كرة القدم." },
      { type: "sentence", parts: [P("He", "s"), P("plays", "v"), P("football", "o")], ar: "هو يلعب كرة القدم." },
      { type: "text", text: "لكن الآن نريد أن نقول: أنا لا ألعب · هو لا يلعب · هل هو يلعب؟ — وهنا تدخل [[do / does]]." },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "🦸",
    step: "2",
    title: "ما هو Do و Does؟",
    lead: "أفعال مساعدة نستخدمها في المضارع البسيط لتكوين النفي والسؤال.",
    blocks: [
      { type: "note", emoji: "📖", text: "[[Auxiliary Verbs]] = أفعال مساعدة — تساعد الفعل الرئيسي في النفي والسؤال." },
      { type: "groupsDo" },
      { type: "note", emoji: "⭐", text: "القاعدة الذهبية: [[I / You / We / They ← do]] و [[He / She / It ← does]] — احفظها مثلما حفظنا [[am / is / are]]." },
    ],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "🚫",
    step: "3",
    title: "النفي في Present Simple",
    lead: "نستخدم do not أو does not — وغالبًا الاختصار.",
    blocks: [
      { type: "sentence", parts: [P("don't", "nt")], ar: "= do not" },
      { type: "sentence", parts: [P("doesn't", "nt")], ar: "= does not" },
      { type: "sentence", parts: [P("I", "s"), P("don't", "nt"), P("play", "v"), P("football", "o")], ar: "أنا لا ألعب كرة القدم." },
      { type: "sentence", parts: [P("They", "s"), P("don't", "nt"), P("study", "v"), P("English", "o")], ar: "هم لا يدرسون الإنجليزية." },
      { type: "sentence", parts: [P("We", "s"), P("don't", "nt"), P("watch", "v"), P("TV", "o")], ar: "نحن لا نشاهد التلفاز." },
      { type: "sentence", parts: [P("You", "s"), P("don't", "nt"), P("like", "v"), P("coffee", "o")], ar: "أنت لا تحب القهوة." },
      { type: "note", emoji: "📐", text: "التركيب: [[Subject + don't + Verb]]" },
    ],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "🔥",
    step: "4",
    title: "النفي مع He / She / It — أهم قاعدة اليوم",
    lead: "نستخدم doesn't — وراقب ماذا يحدث للفعل!",
    blocks: [
      { type: "sentence", parts: [P("He", "s"), P("doesn't", "nt"), P("play", "v"), P("football", "o")], ar: "هو لا يلعب كرة القدم.", note: "play وليس plays!" },
      { type: "sentence", parts: [P("She", "s"), P("doesn't", "nt"), P("study", "v"), P("English", "o")], ar: "هي لا تدرس الإنجليزية.", note: "study وليس studies!" },
      { type: "sentence", parts: [P("He", "s"), P("doesn't", "nt"), P("watch", "v"), P("TV", "o")], ar: "هو لا يشاهد التلفاز.", note: "watch وليس watches!" },
      { type: "bad", en: "He doesn't plays football.", why: "does موجودة — لا s ثانية!" },
      { type: "ok", en: "He doesn't play football.", ar: "هو لا يلعب كرة القدم." },
      { type: "note", emoji: "🚨", text: "الـ [[s]] انتقلت إلى [[does]] — لذلك الفعل يعود لشكله الأساسي." },
    ],
    tip: "إذا رأيت doesn't فانسَ الـ s على الفعل — فهي موجودة داخل doesn't.",
  },
  {
    kind: "lesson",
    section: D,
    mascot: "🔬",
    step: "5",
    title: "ماذا يحدث مع does؟",
    lead: "فكّر فيها هكذا — ثم جرّب الآلة بنفسك:",
    blocks: [
      { type: "sentence", parts: [P("He", "s"), P("plays", "v")], ar: "هو يلعب." },
      { type: "text", text: "عندما نستخدم does تصبح: [[He does play]] — الـ s أصبحت ضمن does." },
      { type: "vanish" },
      { type: "note", emoji: "🧠", text: "طريقة ذكية للحفظ: [[does + play]] [[does + study]] [[does + watch]] [[does + go]] — أبدًا ليس [[does + plays]]." },
    ],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "⛓️",
    step: "6",
    title: "لاحظ السلسلة — مهمة جدًا",
    blocks: [{ type: "chains" }],
  },

  {
    kind: "lesson",
    section: E,
    mascot: "❓",
    step: "7",
    title: "السؤال مع I / You / We / They",
    lead: "نستخدم Do في البداية:",
    blocks: [
      { type: "sentence", parts: [P("Do", "aux"), P("you", "s"), P("play", "v"), P("football", "o")], ar: "هل تلعب كرة القدم؟", q: true },
      { type: "sentence", parts: [P("Do", "aux"), P("they", "s"), P("study", "v"), P("English", "o")], ar: "هل هم يدرسون الإنجليزية؟", q: true },
      { type: "sentence", parts: [P("Do", "aux"), P("we", "s"), P("watch", "v"), P("TV", "o")], ar: "هل نشاهد التلفاز؟", q: true },
      { type: "sentence", parts: [P("Do", "aux"), P("I", "s"), P("work", "v"), P("here", "o")], ar: "هل أعمل هنا؟", q: true },
      { type: "note", emoji: "📐", text: "التركيب: [[Do + Subject + Verb?]]" },
    ],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "❓",
    step: "8",
    title: "السؤال مع He / She / It",
    lead: "نستخدم Does — والفعل أساسي!",
    blocks: [
      { type: "sentence", parts: [P("Does", "aux"), P("he", "s"), P("play", "v"), P("football", "o")], ar: "هل هو يلعب كرة القدم؟", q: true },
      { type: "sentence", parts: [P("Does", "aux"), P("she", "s"), P("study", "v"), P("English", "o")], ar: "هل هي تدرس الإنجليزية؟", q: true },
      { type: "sentence", parts: [P("Does", "aux"), P("he", "s"), P("watch", "v"), P("TV", "o")], ar: "هل هو يشاهد التلفاز؟", q: true },
      { type: "bad", en: "Does he plays football?", why: "Does + الفعل الأساسي" },
      { type: "ok", en: "Does he play football?", ar: "هل هو يلعب كرة القدم؟" },
      { type: "note", emoji: "📐", text: "التركيب: [[Does + Subject + Verb?]]" },
    ],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "🧠",
    step: "9",
    title: "النموذج الذي يجب حفظه",
    lead: "إذا أتقن الطالب هذا النموذج ففهمه ممتاز:",
    blocks: [{ type: "modelCard" }],
  },

  {
    kind: "lesson",
    section: F,
    mascot: "🗣️",
    step: "10",
    title: "الإجابات القصيرة مع Do",
    blocks: [
      { type: "sentence", parts: [P("Do", "aux"), P("you", "s"), P("play", "v"), P("football", "o")], ar: "هل تلعب كرة القدم؟", q: true },
      { type: "ok", en: "Yes, I do.", ar: "نعم." },
      { type: "ok", en: "No, I don't.", ar: "لا." },
      { type: "sentence", parts: [P("Do", "aux"), P("they", "s"), P("study", "v"), P("English", "o")], ar: "هل هم يدرسون الإنجليزية؟", q: true },
      { type: "ok", en: "Yes, they do.", ar: "نعم." },
      { type: "ok", en: "No, they don't.", ar: "لا." },
    ],
  },
  {
    kind: "lesson",
    section: F,
    mascot: "🗣️",
    step: "11",
    title: "الإجابات القصيرة مع Does",
    blocks: [
      { type: "sentence", parts: [P("Does", "aux"), P("he", "s"), P("play", "v"), P("football", "o")], ar: "هل هو يلعب كرة القدم؟", q: true },
      { type: "ok", en: "Yes, he does.", ar: "نعم." },
      { type: "ok", en: "No, he doesn't.", ar: "لا." },
      { type: "sentence", parts: [P("Does", "aux"), P("she", "s"), P("study", "v"), P("English", "o")], ar: "هل هي تدرس الإنجليزية؟", q: true },
      { type: "ok", en: "Yes, she does.", ar: "نعم." },
      { type: "ok", en: "No, she doesn't.", ar: "لا." },
      { type: "bad", en: "Yes, he plays.", why: "الإجابة القصيرة تستخدم does وليس الفعل" },
    ],
  },

  {
    kind: "lesson",
    section: G,
    mascot: "⚖️",
    step: "12",
    title: "الفرق بين Verb to be و Present Simple",
    lead: "نقطة يخلط بينها كثير من الطلاب:",
    blocks: [{ type: "beVsDo" }],
  },
  {
    kind: "lesson",
    section: G,
    mascot: "🪜",
    step: "13",
    title: "مقارنة شاملة + مكان كلمات التكرار",
    blocks: [
      { type: "compareTwo" },
      { type: "advTable" },
      { type: "bad", en: "He doesn't never play football.", why: "نفي مزدوج! doesn't + never لا يجتمعان" },
      { type: "ok", en: "He never plays football.", ar: "هو لا يلعب كرة القدم أبدًا." },
    ],
    tip: "never وحدها تكفي للنفي — لا تضف doesn't معها.",
  },
  {
    kind: "lesson",
    section: G,
    mascot: "🗺️",
    step: "14",
    title: "الخريطة الكاملة",
    blocks: [{ type: "mapTable" }],
  },

  // ---------------- التمارين ----------------
  {
    kind: "ex", section: H, mascot: "✏️", badge: "التمرين 1", title: "اختر do أو does", subtitle: "انظر إلى الفاعل أولًا",
    ex: { type: "auxPick", items: [
      { before: "___", after: "you play football?", ar: "هل تلعب كرة القدم؟", opts: ["Do", "Does"], answer: 0 },
      { before: "___", after: "he study English?", ar: "هل هو يدرس الإنجليزية؟", opts: ["Do", "Does"], answer: 1 },
      { before: "___", after: "they watch TV?", ar: "هل هم يشاهدون التلفاز؟", opts: ["Do", "Does"], answer: 0 },
      { before: "___", after: "she like pizza?", ar: "هل هي تحب البيتزا؟", opts: ["Do", "Does"], answer: 1 },
      { before: "___", after: "we need help?", ar: "هل نحتاج مساعدة؟", opts: ["Do", "Does"], answer: 0 },
      { before: "___", after: "it work?", ar: "هل هو يعمل؟", opts: ["Do", "Does"], answer: 1 },
    ] },
  },
  {
    kind: "ex", section: H, mascot: "🚫", badge: "التمرين 2", title: "اختر don't أو doesn't", subtitle: "النفي الصحيح لكل فاعل",
    ex: { type: "auxPick", items: [
      { before: "I", after: "like coffee.", ar: "أنا لا أحب القهوة.", opts: ["don't", "doesn't"], answer: 0 },
      { before: "He", after: "like coffee.", ar: "هو لا يحب القهوة.", opts: ["don't", "doesn't"], answer: 1 },
      { before: "They", after: "play tennis.", ar: "هم لا يلعبون التنس.", opts: ["don't", "doesn't"], answer: 0 },
      { before: "She", after: "play tennis.", ar: "هي لا تلعب التنس.", opts: ["don't", "doesn't"], answer: 1 },
      { before: "We", after: "watch TV.", ar: "نحن لا نشاهد التلفاز.", opts: ["don't", "doesn't"], answer: 0 },
      { before: "It", after: "work.", ar: "هو لا يعمل.", opts: ["don't", "doesn't"], answer: 1 },
    ] },
  },
  {
    kind: "ex", section: H, mascot: "🩹", badge: "التمرين 3", title: "صحح الخطأ", subtitle: "خطأ واحد في كل جملة",
    ex: { type: "fix", items: [
      { wrong: "He doesn't plays football.", correct: "He doesn't play football.", why: "بعد doesn't الفعل أساسي" },
      { wrong: "Does she studies English?", correct: "Does she study English?", why: "بعد Does الفعل أساسي" },
      { wrong: "They doesn't play football.", correct: "They don't play football.", why: "مع They نستخدم don't" },
      { wrong: "Do he like coffee?", correct: "Does he like coffee?", why: "مع He نستخدم Does" },
      { wrong: "She don't watch TV.", correct: "She doesn't watch TV.", why: "مع She نستخدم doesn't" },
      { wrong: "Does they work here?", correct: "Do they work here?", why: "مع They نستخدم Do" },
    ] },
  },
  {
    kind: "ex", section: H, mascot: "🔄", badge: "التمرين 4", title: "حوّل إلى النفي", subtitle: "اضغط الزر وشاهد الـ s تختفي",
    ex: { type: "transform", mode: "neg", items: [
      { s: "I", v: "play", vs: "play", o: "football", ar: "أنا لا ألعب كرة القدم.", third: false },
      { s: "He", v: "play", vs: "plays", o: "football", ar: "هو لا يلعب كرة القدم.", third: true },
      { s: "She", v: "study", vs: "studies", o: "English", ar: "هي لا تدرس الإنجليزية.", third: true },
      { s: "They", v: "watch", vs: "watch", o: "TV", ar: "هم لا يشاهدون التلفاز.", third: false },
      { s: "He", v: "go", vs: "goes", o: "to school", ar: "هو لا يذهب إلى المدرسة.", third: true },
    ] },
  },
  {
    kind: "ex", section: H, mascot: "❓", badge: "التمرين 5", title: "حوّل إلى سؤال", subtitle: "اقلب وراقب الفعل",
    ex: { type: "transform", mode: "q", items: [
      { s: "You", v: "play", vs: "play", o: "football", ar: "هل تلعب كرة القدم؟", third: false },
      { s: "He", v: "play", vs: "plays", o: "football", ar: "هل هو يلعب كرة القدم؟", third: true },
      { s: "They", v: "study", vs: "study", o: "English", ar: "هل هم يدرسون الإنجليزية؟", third: false },
      { s: "She", v: "watch", vs: "watches", o: "TV", ar: "هل هي تشاهد التلفاز؟", third: true },
      { s: "He", v: "go", vs: "goes", o: "to school", ar: "هل هو يذهب إلى المدرسة؟", third: true },
    ] },
  },
  {
    kind: "ex", section: H, mascot: "🏅", badge: "التمرين 6", title: "اختر الإجابة الصحيحة", subtitle: "إجابات قصيرة فقط",
    ex: { type: "choose", items: [
      { stem: "Do you play football?", ar: "هل تلعب كرة القدم؟", opts: ["Yes, I do.", "Yes, I does.", "Yes, I play."], answer: 0 },
      { stem: "Does he study English?", ar: "هل هو يدرس الإنجليزية؟", opts: ["Yes, he do.", "Yes, he does.", "Yes, he studies."], answer: 1 },
      { stem: "Do they watch TV?", ar: "هل هم يشاهدون التلفاز؟", opts: ["No, they don't.", "No, they doesn't.", "No, they aren't."], answer: 0 },
      { stem: "Does she like pizza?", ar: "هل هي تحب البيتزا؟", opts: ["No, she don't.", "No, she doesn't.", "No, she isn't."], answer: 1 },
    ] },
  },
  {
    kind: "ex", section: H, mascot: "🧩", badge: "التمرين 7", title: "حدد نوع الجملة", subtitle: "مثبتة أم منفية أم سؤال؟",
    ex: { type: "classify", items: [
      { en: "He plays football.", ar: "هو يلعب كرة القدم.", answer: "aff" },
      { en: "He doesn't play football.", ar: "هو لا يلعب كرة القدم.", answer: "neg" },
      { en: "Does he play football?", ar: "هل هو يلعب كرة القدم؟", answer: "q" },
      { en: "They don't study English.", ar: "هم لا يدرسون الإنجليزية.", answer: "neg" },
      { en: "Do they study English?", ar: "هل هم يدرسون الإنجليزية؟", answer: "q" },
      { en: "She studies English.", ar: "هي تدرس الإنجليزية.", answer: "aff" },
    ] },
  },

  { kind: "iq", section: H, mascot: "🏆", title: "التحدي النهائي IQ200" },
  { kind: "challenge", section: H, mascot: "🔥", title: "تحدٍ أصعب — صحح وفسّر" },
  { kind: "quiz", section: I, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "summary", section: I, mascot: "🧠", title: "ملخص الدرس 7" },
  { kind: "closing", section: I, mascot: "🚀", title: "الدرس القادم" },
];

export const IQ7: { s: string; v: string; vs: string; o: string; ar: string; third: boolean; short: string; shortAr: string }[] = [
  { s: "He", v: "play", vs: "plays", o: "football", ar: "كرة القدم", third: true, short: "Yes, he does.", shortAr: "نعم." },
  { s: "She", v: "study", vs: "studies", o: "English", ar: "الإنجليزية", third: true, short: "No, she doesn't.", shortAr: "لا." },
  { s: "They", v: "watch", vs: "watch", o: "TV", ar: "التلفاز", third: false, short: "Yes, they do.", shortAr: "نعم." },
  { s: "I", v: "play", vs: "play", o: "football", ar: "كرة القدم", third: false, short: "No, I don't.", shortAr: "لا." },
];

export const HARD7: { wrong: string; correct: string; why: string }[] = [
  { wrong: "He doesn't plays football.", correct: "He doesn't play football.", why: "الـ s موجودة في doesn't — الفعل أساسي." },
  { wrong: "Does she studies English?", correct: "Does she study English?", why: "الـ s موجودة في Does — الفعل أساسي." },
  { wrong: "She don't like pizza.", correct: "She doesn't like pizza.", why: "مع She نستخدم doesn't وليس don't." },
  { wrong: "Does he goes to school every day?", correct: "Does he go to school every day?", why: "بعد Does نستخدم go وليس goes." },
  { wrong: "They doesn't watch TV.", correct: "They don't watch TV.", why: "مع They نستخدم don't وليس doesn't." },
  { wrong: "Do she usually play tennis?", correct: "Does she usually play tennis?", why: "مع She نبدأ السؤال بـ Does." },
];
