// ============================================================
// الدرس 3 — Verb to be: الإثبات + النفي + السؤال + الإجابات القصيرة
// ============================================================

export type Gender = "m" | "f" | "n"; // مذكّر / مؤنّث / غير عاقل

export interface Pronoun {
  en: string;
  ar: string;
  be: "am" | "is" | "are";
  gender: Gender;
  hint: string;
}

export const PRONOUNS: Pronoun[] = [
  { en: "I", ar: "أنا", be: "am", gender: "m", hint: "أتحدث عن نفسي" },
  { en: "He", ar: "هو", be: "is", gender: "m", hint: "ذكر واحد" },
  { en: "She", ar: "هي", be: "is", gender: "f", hint: "أنثى واحدة" },
  { en: "It", ar: "هو / هي (لغير العاقل)", be: "is", gender: "n", hint: "شيء أو حيوان مفرد" },
  { en: "You", ar: "أنت / أنتم", be: "are", gender: "m", hint: "المخاطَب" },
  { en: "We", ar: "نحن", be: "are", gender: "m", hint: "أنا + آخرون" },
  { en: "They", ar: "هم / هنّ", be: "are", gender: "m", hint: "أكثر من واحد" },
];

/** بدائل عربية لضمائر You في جوابين شائعين */
export const BE_AR: Record<string, { aff: (g: Gender) => string; neg: (g: Gender) => string }> = {
  I: {
    aff: () => "أنا",
    neg: () => "أنا",
  },
  He: { aff: () => "هو", neg: () => "هو" },
  She: { aff: () => "هي", neg: () => "هي" },
  It: { aff: () => "إنه", neg: () => "إنه" },
  You: { aff: () => "أنت", neg: () => "أنت" },
  We: { aff: () => "نحن", neg: () => "نحن" },
  They: { aff: () => "هم", neg: () => "هم" },
};

export const LAYSA: Record<string, string> = {
  I: "لست",
  He: "ليس",
  She: "ليست",
  It: "ليس",
  You: "لست",
  We: "لسنا",
  They: "ليسوا",
};

export const HAL: Record<string, string> = {
  I: "هل أنا",
  He: "هل هو",
  She: "هل هي",
  It: "هل هو",
  You: "هل أنت",
  We: "هل نحن",
  They: "هل هم",
};

// -------------------- الكلمات المساعدة --------------------
export interface Word {
  en: string;
  aff: (g: Gender) => string;
  neg: (g: Gender) => string;
  col: "sky" | "amber" | "violet";
}

const emotion = (m: string, f: string): Pick<Word, "aff" | "neg"> => ({
  aff: (g) => (g === "f" ? f : m),
  neg: (g) => (g === "f" ? f + "ةً" : m + "ًا"),
});

export const WORDS: Word[] = [
  { en: "happy", ...emotion("سعيد", "سعيدة"), col: "amber" },
  { en: "tired", ...emotion("متعب", "متعبة"), col: "violet" },
  { en: "ready", ...emotion("جاهز", "جاهزة"), col: "sky" },
  { en: "late", ...emotion("متأخر", "متأخرة"), col: "violet" },
  { en: "a student", aff: () => "طالب", neg: () => "طالبًا", col: "sky" },
  { en: "a teacher", aff: (g) => (g === "f" ? "معلّمة" : "معلّم"), neg: (g) => (g === "f" ? "معلّمةً" : "معلّمًا"), col: "sky" },
  { en: "tall", ...emotion("طويل", "طويلة"), col: "violet" },
  { en: "smart", ...emotion("ذكي", "ذكية"), col: "amber" },
  { en: "big", ...emotion("كبير", "كبيرة"), col: "violet" },
  { en: "small", ...emotion("صغير", "صغيرة"), col: "amber" },
  { en: "friends", aff: () => "أصدقاء", neg: () => "أصدقاء", col: "sky" },
  { en: "students", aff: () => "طلاب", neg: () => "طلاب", col: "sky" },
  { en: "fast", ...emotion("سريع", "سريعة"), col: "violet" },
];

// -------------------- الجدول الكبير --------------------
export interface TableRow {
  p: Pronoun;
  word: string; // القالب الثابت للجدول
}

// -------------------- أنواع الشرائح --------------------
export interface Jamla { s: string; b: string; rest: string; ar?: string }
export interface Trio { p: Pronoun; word: string }
export interface QAEx { p: Pronoun; word: string }

export type Exercise =
  | { type: "fill"; blanks: { before: string; after: string; blankBe: Pronoun["be"]; ar: string }[] }
  | { type: "negative"; items: { aff: Jamla; negBe: string; negAr: string }[] }
  | { type: "question"; items: { aff: Jamla; qBe: string; qRest: string; qAr: string }[] }
  | { type: "mcq"; items: { q: string; opts: string[]; answer: number }[] }
  | { type: "fix"; items: { wrong: string; correct: string }[] };

export type Slide = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "review"; title: string; lead?: string }
  | { kind: "affirm"; title: string; lead?: string; step?: string; examples: Jamla[] }
  | { kind: "negRule"; title: string; lead?: string }
  | { kind: "pronounGrid"; mode: "neg" | "q"; title: string }
  | { kind: "doWarning"; title: string }
  | { kind: "shortAnswer"; title: string; lead?: string; examples: QAEx[] }
  | { kind: "machine"; title: string; lead?: string }
  | { kind: "table"; title: string }
  | { kind: "smartDrill"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
  | { kind: "ex"; title: string; subtitle: string; badge: string; ex: Exercise }
);

// -------------------- أمثلة ثابتة --------------------
const j = (s: string, b: string, rest: string, ar: string): Jamla => ({ s, b, rest, ar });
const trio = (en: string, word: string): Trio => ({ p: PRONOUNS.find((p) => p.en === en)!, word });

export const JAMLA_EXAMPLES: Jamla[] = [
  j("I", "am", "a student", "أنا طالب."),
  j("She", "is", "happy", "هي سعيدة."),
  j("They", "are", "friends", "هم أصدقاء."),
];

export const MORE_AFF: Jamla[] = [
  j("I", "am", "tired", "أنا متعب."),
  j("He", "is", "tall", "هو طويل."),
  j("She", "is", "smart", "هي ذكية."),
  j("It", "is", "small", "إنه صغير."),
  j("We", "are", "ready", "نحن جاهزون."),
  j("You", "are", "late", "أنت متأخر."),
  j("They", "are", "happy", "هم سعداء."),
];

export const MACHINE_TRIOS: Trio[] = PRONOUNS.map((p, i) => trio(p.en, WORDS[i % WORDS.length].en));

export const SA_EXAMPLES: QAEx[] = PRONOUNS.map((p) => {
  const words: Record<string, string> = { I: "late", He: "happy", She: "a teacher", It: "big", You: "ready", We: "late", They: "students" };
  return { p, word: words[p.en] };
});

// -------------------- التمارين --------------------
export const EX1: Extract<Exercise, { type: "fill" }> = {
  type: "fill",
  blanks: [
    { before: "I", after: "happy.", blankBe: "am", ar: "أنا سعيد." },
    { before: "He", after: "a student.", blankBe: "is", ar: "هو طالب." },
    { before: "She", after: "tired.", blankBe: "is", ar: "هي متعبة." },
    { before: "It", after: "small.", blankBe: "is", ar: "إنه صغير." },
    { before: "You", after: "ready.", blankBe: "are", ar: "أنت جاهز." },
    { before: "We", after: "friends.", blankBe: "are", ar: "نحن أصدقاء." },
    { before: "They", after: "students.", blankBe: "are", ar: "هم طلاب." },
  ],
};

export const EX2: Extract<Exercise, { type: "negative" }> = {
  type: "negative",
  items: [
    { aff: j("I", "am", "happy", "أنا سعيد."), negBe: "am", negAr: "أنا لست سعيدًا." },
    { aff: j("He", "is", "tall", "هو طويل."), negBe: "is", negAr: "هو ليس طويلًا." },
    { aff: j("She", "is", "a teacher", "هي معلّمة."), negBe: "is", negAr: "هي ليست معلّمةً." },
    { aff: j("We", "are", "ready", "نحن جاهزون."), negBe: "are", negAr: "نحن لسنا جاهزين." },
    { aff: j("They", "are", "friends", "هم أصدقاء."), negBe: "are", negAr: "هم ليسوا أصدقاء." },
  ],
};

export const EX3: Extract<Exercise, { type: "question" }> = {
  type: "question",
  items: [
    { aff: j("He", "is", "happy", "هو سعيد."), qBe: "is", qRest: "he happy?", qAr: "هل هو سعيد؟" },
    { aff: j("She", "is", "a student", "هي طالبة."), qBe: "is", qRest: "she a student?", qAr: "هل هي طالبة؟" },
    { aff: j("They", "are", "ready", "هم جاهزون."), qBe: "are", qRest: "they ready?", qAr: "هل هم جاهزون؟" },
    { aff: j("You", "are", "tired", "أنت متعب."), qBe: "are", qRest: "you tired?", qAr: "هل أنت متعب؟" },
    { aff: j("We", "are", "late", "نحن متأخرون."), qBe: "are", qRest: "we late?", qAr: "هل نحن متأخرون؟" },
  ],
};

export const EX4: Extract<Exercise, { type: "mcq" }> = {
  type: "mcq",
  items: [
    { q: "Is he a student?", opts: ["Yes, he is.", "Yes, he are.", "Yes, he am."], answer: 0 },
    { q: "Are they happy?", opts: ["Yes, they is.", "Yes, they are.", "Yes, they am."], answer: 1 },
    { q: "Is she tired?", opts: ["No, she is not.", "No, she are not.", "No, she am not."], answer: 0 },
    { q: "Are you ready?", opts: ["Yes, I am.", "Yes, I are.", "Yes, you is."], answer: 0 },
  ],
};

export const EX5: Extract<Exercise, { type: "fix" }> = {
  type: "fix",
  items: [
    { wrong: "I is happy.", correct: "I am happy." },
    { wrong: "He are tired.", correct: "He is tired." },
    { wrong: "She not is happy.", correct: "She is not happy." },
    { wrong: "They is students.", correct: "They are students." },
    { wrong: "Are he ready?", correct: "Is he ready?" },
    { wrong: "Is they happy?", correct: "Are they happy?" },
    { wrong: "I am not a student. (حوّلها إلى سؤال)", correct: "Am I a student?" },
  ],
};

export const CHALLENGE: { clue: string; answer: string; p: Pronoun; word: string; ans: "yes" | "no" }[] = [
  { clue: "He is a teacher.", answer: "is not a teacher", p: PRONOUNS[1], word: "a teacher", ans: "yes" }, // Fill الأول، السؤال كامل
  { clue: "They are happy.", answer: "are not happy", p: PRONOUNS[6], word: "happy", ans: "no" },
  { clue: "I am tired.", answer: "am not tired", p: PRONOUNS[0], word: "tired", ans: "yes" },
];

// -------------------- الشرائح --------------------
const START = "البداية";
const AFF = "الإثبات";
const NEG = "النفي";
const QUE = "السؤال";
const ANS = "الإجابات";
const TOOLS = "تثبيت";
const PRACT = "التمارين";
const END = "الختام";

export const SLIDES: Slide[] = [
  { kind: "cover", section: START, mascot: "🔥" },
  { kind: "objectives", section: START, mascot: "🎯" },
  {
    kind: "review",
    section: AFF,
    mascot: "🔁",
    title: "مراجعة سريعة",
    lead: "تذكرنا في الدرس السابق القاعدة الذهبية، واليوم سنستخدمها بثلاث طرق: الإثبات، النفي، السؤال.",
  },
  {
    kind: "affirm",
    section: AFF,
    mascot: "✅",
    step: "2",
    title: "① الجملة المثبتة",
    lead: "الجملة المثبتة تخبرنا أن شيئًا صحيح أو موجود.",
    examples: JAMLA_EXAMPLES,
  },
  {
    kind: "affirm",
    section: AFF,
    mascot: "🗂️",
    step: "3",
    title: "أمثلة إضافية",
    examples: MORE_AFF,
  },
  {
    kind: "negRule",
    section: NEG,
    mascot: "🚫",
    title: "② الآن نبدأ بالنفي",
    lead: "عندما نريد أن نقول «لست / ليس / ليست / لسنا / ليسوا» نضع not بعد am / is / are — قاعدة سهلة جدًا.",
  },
  { kind: "pronounGrid", mode: "neg", section: NEG, mascot: "🔄", title: "حوّل الجملة إلى النفي مع كل ضمير" },
  {
    kind: "pronounGrid",
    mode: "q",
    section: QUE,
    mascot: "❓",
    title: "③ الآن نبدأ بالأسئلة",
  },
  { kind: "doWarning", section: QUE, mascot: "⚠️", title: "لا نستخدم do / does هنا" },
  {
    kind: "shortAnswer",
    section: ANS,
    mascot: "🗣️",
    title: "④ الإجابات القصيرة",
    lead: "لا نحتاج دائمًا إلى إجابة طويلة — إجابة قصيرة تكفي.",
    examples: SA_EXAMPLES,
  },
  {
    kind: "machine",
    section: TOOLS,
    mascot: "⚙️",
    title: "آلة التحويل — اختر وراقب!",
    lead: "اختر الضمير والكلمة، ثم بدّل بين الإثبات والنفي والسؤال لتشاهد الجملة تتحول أمامك.",
  },
  { kind: "table", section: TOOLS, mascot: "📋", title: "الجدول المهم — يلخّص الدرس كله" },
  { kind: "smartDrill", section: TOOLS, mascot: "🧠", title: "تدريب ذكي — ثلاث خطوات" },
  { kind: "summary", section: END, mascot: "🧠", title: "ملخص الدرس 3" },
  {
    kind: "ex",
    section: PRACT,
    mascot: "✏️",
    badge: "التمرين 1",
    title: "اختر am / is / are",
    subtitle: "أكمل كل جملة بالكلمة الصحيحة",
    ex: EX1,
  },
  {
    kind: "ex",
    section: PRACT,
    mascot: "🚫",
    badge: "التمرين 2",
    title: "حوّل إلى النفي",
    subtitle: "اكتب الجملة المنفية بنفسك ثم اكشف الحل (١٥ ثانية من التفكير تكفي)",
    ex: EX2,
  },
  {
    kind: "ex",
    section: PRACT,
    mascot: "❓",
    badge: "التمرين 3",
    title: "حوّل إلى سؤال",
    subtitle: "قلب الترتيب: الفعل قبل الفاعل",
    ex: EX3,
  },
  {
    kind: "ex",
    section: PRACT,
    mascot: "🗣️",
    badge: "التمرين 4",
    title: "اختر الإجابة الصحيحة",
    subtitle: "اختبر إجابتك القصيرة",
    ex: EX4,
  },
  {
    kind: "ex",
    section: PRACT,
    mascot: "🩹",
    badge: "التمرين 5",
    title: "صحّح الخطأ",
    subtitle: "اضغط «الحل» لفتح الجملة الصحيحة",
    ex: EX5,
  },
  { kind: "quiz", section: END, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: END, mascot: "🏆", title: "قاعدة اليوم" },
];
