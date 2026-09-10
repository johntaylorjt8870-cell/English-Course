// ============================================================
// الدرس 6 — المضارع البسيط Present Simple
// ============================================================

export interface Verb6 {
  base: string;
  ar: string;
}

export const VERBS6: Verb6[] = [
  { base: "play", ar: "يلعب" },
  { base: "eat", ar: "يأكل" },
  { base: "read", ar: "يقرأ" },
  { base: "work", ar: "يعمل" },
  { base: "study", ar: "يدرس" },
  { base: "watch", ar: "يشاهد" },
  { base: "go", ar: "يذهب" },
  { base: "wash", ar: "يغسل" },
  { base: "fix", ar: "يصلح" },
  { base: "pass", ar: "ينجح / يمرّر" },
  { base: "try", ar: "يحاول" },
  { base: "fly", ar: "يطير" },
  { base: "run", ar: "يركض" },
  { base: "sleep", ar: "ينام" },
  { base: "drink", ar: "يشرب" },
  { base: "like", ar: "يحب" },
];

export type Rule = "s" | "es" | "ies";

/** قاعدة تصريف الغائب المفرد: s / es / ies */
export function conjS(v: string): { form: string; rule: Rule; why: string } {
  if (/[^aeiou]y$/.test(v)) {
    return { form: v.slice(0, -1) + "ies", rule: "ies", why: "ينتهي بـ حرف ساكن + y ← نحوّل y إلى ies" };
  }
  if (/(s|sh|ch|x|o)$/.test(v)) {
    return { form: v + "es", rule: "es", why: "ينتهي بـ s / sh / ch / x / o ← نضيف es" };
  }
  return { form: v + "s", rule: "s", why: "معظم الأفعال ← نضيف s فقط" };
}

export interface Subj6 {
  en: string;
  ar: string;
  third: boolean;
}

export const SUBJ6: Subj6[] = [
  { en: "I", ar: "أنا", third: false },
  { en: "You", ar: "أنت", third: false },
  { en: "We", ar: "نحن", third: false },
  { en: "They", ar: "هم", third: false },
  { en: "He", ar: "هو", third: true },
  { en: "She", ar: "هي", third: true },
  { en: "It", ar: "هو / هي لغير العاقل", third: true },
  { en: "Khalil", ar: "خليل", third: true },
  { en: "Sara", ar: "سارة", third: true },
  { en: "Mira", ar: "ميرا", third: true },
];

export function verbFor(v: string, third: boolean): string {
  return third ? conjS(v).form : v;
}

// -------------------- كلمات التكرار --------------------
export const ADVS: { en: string; ar: string; pct: number; ex: string; exAr: string }[] = [
  { en: "always", ar: "دائمًا", pct: 100, ex: "I always drink coffee.", exAr: "أنا دائمًا أشرب القهوة." },
  { en: "usually", ar: "عادةً", pct: 85, ex: "I usually wake up early.", exAr: "أنا عادةً أستيقظ باكرًا." },
  { en: "often", ar: "غالبًا", pct: 65, ex: "I often play football.", exAr: "أنا غالبًا ألعب كرة القدم." },
  { en: "sometimes", ar: "أحيانًا", pct: 45, ex: "I sometimes watch TV.", exAr: "أنا أحيانًا أشاهد التلفاز." },
  { en: "rarely", ar: "نادرًا", pct: 15, ex: "I rarely eat pizza.", exAr: "أنا نادرًا ما آكل البيتزا." },
  { en: "never", ar: "أبدًا", pct: 0, ex: "I never smoke.", exAr: "أنا لا أدخن أبدًا." },
];

export const EVERY_WORDS: { en: string; ar: string }[] = [
  { en: "every day", ar: "كل يوم" },
  { en: "every week", ar: "كل أسبوع" },
  { en: "every month", ar: "كل شهر" },
  { en: "every year", ar: "كل سنة" },
  { en: "every morning", ar: "كل صباح" },
  { en: "every evening", ar: "كل مساء" },
  { en: "on Mondays", ar: "أيام الاثنين" },
];

export const DAY_STEPS: { en: string; ar: string; time?: string }[] = [
  { en: "wake up", ar: "أستيقظ", time: "at 7:00" },
  { en: "eat breakfast", ar: "أتناول الفطور" },
  { en: "go to school", ar: "أذهب إلى المدرسة", time: "at 8:00" },
  { en: "study English", ar: "أدرس الإنجليزية" },
  { en: "play football", ar: "ألعب كرة القدم" },
  { en: "go home", ar: "أعود إلى المنزل", time: "at 3:00" },
  { en: "do my homework", ar: "أحل واجبي" },
  { en: "go to bed", ar: "أذهب إلى الفراش", time: "at 10:00" },
];

export const FACTS: { en: string; ar: string }[] = [
  { en: "The sun rises in the east.", ar: "الشمس تشرق من الشرق." },
  { en: "Water boils at 100°C.", ar: "الماء يغلي عند 100 درجة مئوية." },
  { en: "The Earth goes around the Sun.", ar: "الأرض تدور حول الشمس." },
  { en: "Cats like milk.", ar: "القطط تحب الحليب." },
];

// -------------------- بلوكات --------------------
export type Role6 = "s" | "v" | "adv" | "o";

export interface Part6 { text: string; role: Role6 }

export const ROLE6_AR: Record<Role6, string> = {
  s: "الفاعل",
  v: "الفعل",
  adv: "كلمة التكرار",
  o: "المفعول به",
};

export type Block6 =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "sentence"; parts: Part6[]; ar: string; note?: string; q?: boolean }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "day" }
  | { type: "ladder" }
  | { type: "everyWords" }
  | { type: "groups" }
  | { type: "ruleTabs" }
  | { type: "conj" }
  | { type: "pronounTabs" }
  | { type: "facts" }
  | { type: "vsNow" }
  | { type: "iqGroups" };

// -------------------- التمارين --------------------
export type Exercise6 =
  | { type: "choose"; items: { s: string; o: string; ar: string; opts: string[]; answer: number; third: boolean }[] }
  | { type: "conj"; items: { verb: string; subj: string; opts: string[]; answer: number }[] }
  | { type: "adv"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why: string }[] }
  | { type: "order"; items: { words: string[]; correct: string[]; ar: string }[] }
  | { type: "why"; items: { en: string; ar: string; answer: "habit" | "routine" | "fact" }[] };

export const WHY_AR: Record<"habit" | "routine" | "fact", string> = {
  habit: "عادة",
  routine: "روتين",
  fact: "حقيقة",
};

export type Slide6 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block6[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise6 }
  | { kind: "iq"; title: string }
  | { kind: "builder"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const A = "البداية";
const B = "الفكرة";
const C = "التصريف";
const D = "التكرار";
const E = "الاستخدام";
const F = "التمارين";
const G = "الخاتمة";

const P = (text: string, role: Role6): Part6 => ({ text, role });

export const SLIDES: Slide6[] = [
  { kind: "cover", section: A, mascot: "⏰" },
  { kind: "objectives", section: A, mascot: "🎯" },

  {
    kind: "lesson",
    section: B,
    mascot: "💡",
    step: "1",
    title: "ما هو Present Simple؟",
    lead: "نستخدمه عندما نتحدث عن شيء يحدث بشكل متكرر، أو كعادة، أو ضمن الروتين، أو كحقيقة عامة.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("play", "v"), P("football", "o")], ar: "أنا ألعب كرة القدم." },
      { type: "note", emoji: "⏳", text: "قد لا يعني أنني ألعب الآن — بل أنني ألعب كرة القدم بشكل عام أو كعادة." },
      { type: "list", items: ["يحدث بشكل متكرر.", "يحدث كعادة.", "يحدث ضمن الروتين اليومي.", "يكون حقيقة عامة.", "شيء يحدث عادةً وليس فقط الآن."] },
    ],
  },
  {
    kind: "lesson",
    section: B,
    mascot: "🌞",
    step: "2",
    title: "أهم فكرة: يوم الطالب كله Present Simple",
    lead: "هذه الأشياء تتكرر كل يوم — لذلك نستخدم المضارع البسيط. اضغط على أي خطوة:",
    blocks: [{ type: "day" }],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "🪜",
    step: "3",
    title: "كلمات تدل على Present Simple — سلّم التكرار",
    lead: "كلما نزلنا للأسفل يقلّ تكرار الفعل. اضغط على أي درجة:",
    blocks: [{ type: "ladder" }],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "📅",
    step: "4",
    title: "كلمات أخرى مهمة",
    blocks: [{ type: "everyWords" }, { type: "note", emoji: "⭐", text: "احفظ السلّم والكلمات معًا — فهي أسرع طريقة للتعرف على الزمن." }],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "💬",
    step: "5",
    title: "أمثلة على الكلمات الدالة",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("always", "adv"), P("drink", "v"), P("coffee", "o")], ar: "أنا دائمًا أشرب القهوة." },
      { type: "sentence", parts: [P("I", "s"), P("usually", "adv"), P("wake up", "v"), P("early", "o")], ar: "أنا عادةً أستيقظ باكرًا." },
      { type: "sentence", parts: [P("I", "s"), P("often", "adv"), P("play", "v"), P("football", "o")], ar: "أنا غالبًا ألعب كرة القدم." },
      { type: "sentence", parts: [P("I", "s"), P("sometimes", "adv"), P("watch", "v"), P("TV", "o")], ar: "أنا أحيانًا أشاهد التلفاز." },
      { type: "sentence", parts: [P("I", "s"), P("rarely", "adv"), P("eat", "v"), P("pizza", "o")], ar: "أنا نادرًا ما آكل البيتزا." },
      { type: "sentence", parts: [P("I", "s"), P("never", "adv"), P("smoke", "v")], ar: "أنا لا أدخن أبدًا." },
      { type: "sentence", parts: [P("I", "s"), P("study", "v"), P("English", "o"), P("every day", "adv")], ar: "أنا أدرس الإنجليزية كل يوم.", note: "every day غالبًا في نهاية الجملة" },
    ],
  },

  {
    kind: "lesson",
    section: C,
    mascot: "🏗️",
    step: "6",
    title: "كيف نكوّن الجملة؟",
    lead: "مثلما تعلمنا في الدرس الأول:",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("play", "v"), P("football", "o")], ar: "أنا ألعب كرة القدم.", note: "I = Subject · play = Verb · football = Object" },
      { type: "sentence", parts: [P("They", "s"), P("watch", "v"), P("TV", "o")], ar: "هم يشاهدون التلفاز.", note: "They = Subject · watch = Verb · TV = Object" },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "👥",
    step: "7",
    title: "المجموعتان — أهم قاعدة في الدرس",
    lead: "بدّل بين المجموعتين وراقب الفعل:",
    blocks: [{ type: "groups" }, { type: "note", emoji: "🚨", text: "قاعدة ذهبية: [[I / You / We / They → Verb]] أما [[He / She / It → Verb + s]]" }],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "🔤",
    step: "8",
    title: "لماذا نضيف s؟",
    lead: "لأن الإنجليزية تميّز الفاعل المفرد الغائب He / She / It في المضارع البسيط.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("work", "v")], ar: "أنا أعمل." },
      { type: "sentence", parts: [P("He", "s"), P("works", "v")], ar: "هو يعمل.", note: "work → works" },
      { type: "sentence", parts: [P("We", "s"), P("eat", "v")], ar: "نحن نأكل." },
      { type: "sentence", parts: [P("He", "s"), P("eats", "v")], ar: "هو يأكل.", note: "eat → eats" },
    ],
  },
  { kind: "lesson", section: C, mascot: "📖", step: "9", title: "أمثلة كثيرة حسب الضمير", lead: "اختر الضمير لترى جمله:", blocks: [{ type: "pronounTabs" }] },
  {
    kind: "lesson",
    section: C,
    mascot: "🧮",
    step: "10",
    title: "قواعد s / es / ies",
    lead: "ثلاث قواعد فقط — بدّل بينها:",
    blocks: [
      { type: "ruleTabs" },
      { type: "bad", en: "plaies", why: "قبل y حرف علة (a) ← نضيف s فقط: plays" },
      { type: "note", emoji: "🧠", text: "في هذه المرحلة أتقن الفكرة أولًا: مع [[He / She / It]] غالبًا نضيف [[s]] ثم تعلم قاعدتي [[es]] و [[ies]]." },
    ],
  },
  { kind: "lesson", section: C, mascot: "⚙️", step: "11", title: "آلة التصريف — جرّب أي فعل", lead: "اختر الفاعل والفعل وشاهد الصيغة الصحيحة مع سبب القاعدة.", blocks: [{ type: "conj" }] },

  {
    kind: "lesson",
    section: D,
    mascot: "📍",
    step: "12",
    title: "أين نضع always / usually / often؟",
    lead: "مع معظم الأفعال تأتي كلمة التكرار قبل الفعل الأساسي:",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("always", "adv"), P("play", "v"), P("football", "o")], ar: "أنا دائمًا ألعب كرة القدم." },
      { type: "sentence", parts: [P("She", "s"), P("usually", "adv"), P("studies", "v"), P("English", "o")], ar: "هي عادةً تدرس الإنجليزية." },
      { type: "sentence", parts: [P("He", "s"), P("often", "adv"), P("drinks", "v"), P("coffee", "o")], ar: "هو غالبًا يشرب القهوة." },
      { type: "sentence", parts: [P("They", "s"), P("sometimes", "adv"), P("watch", "v"), P("TV", "o")], ar: "هم أحيانًا يشاهدون التلفاز." },
      { type: "note", emoji: "📐", text: "الترتيب: [[Subject + Adverb + Verb]] مثل: [[I + always + play]]" },
    ],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "🚫",
    step: "13",
    title: "never = أبدًا",
    lead: "تعطي معنى النفي بنفسها:",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("never", "adv"), P("drink", "v"), P("coffee", "o")], ar: "أنا لا أشرب القهوة أبدًا." },
      { type: "sentence", parts: [P("She", "s"), P("never", "adv"), P("plays", "v"), P("football", "o")], ar: "هي لا تلعب كرة القدم أبدًا." },
      { type: "bad", en: "I don't never drink coffee.", why: "لا نضع not مع never أبدًا" },
    ],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "⚖️",
    step: "14",
    title: "الفرق بين usually و every day",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("usually", "adv"), P("play", "v"), P("football", "o")], ar: "أنا عادةً ألعب كرة القدم." },
      { type: "sentence", parts: [P("I", "s"), P("play", "v"), P("football", "o"), P("every day", "adv")], ar: "أنا ألعب كرة القدم كل يوم." },
      { type: "note", emoji: "💬", text: "يمكن الجمع: [[I usually play football every day.]] لكن في الكلام الطبيعي يكفي أحدهما حسب المعنى." },
    ],
  },

  {
    kind: "lesson",
    section: E,
    mascot: "🌍",
    step: "15",
    title: "Present Simple مع الحقائق",
    lead: "ليس فقط للعادات — بل للحقائق العامة أيضًا:",
    blocks: [{ type: "facts" }],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "🆚",
    step: "16",
    title: "لا تخلط: عادة أم الآن؟",
    blocks: [
      { type: "vsNow" },
      { type: "note", emoji: "⏭️", text: "سنعود لهذا الفرق عندما ندرس [[Present Continuous]] لاحقًا." },
    ],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "🚨",
    step: "17",
    title: "خطأ شائع جدًا",
    blocks: [
      { type: "bad", en: "He play football.", why: "He ← يجب إضافة s" },
      { type: "ok", en: "He plays football.", ar: "هو يلعب كرة القدم." },
      { type: "bad", en: "She play tennis.", why: "She ← يجب إضافة s" },
      { type: "ok", en: "She plays tennis.", ar: "هي تلعب التنس." },
      { type: "bad", en: "They plays football.", why: "They لا تأخذ s" },
      { type: "ok", en: "They play football.", ar: "هم يلعبون كرة القدم." },
    ],
  },
  { kind: "lesson", section: E, mascot: "🧠", step: "18", title: "قاعدة IQ200 — احفظها بهذه الطريقة", blocks: [{ type: "iqGroups" }] },

  // ---------------- التمارين ----------------
  {
    kind: "ex",
    section: F,
    mascot: "✏️",
    badge: "التمرين 1",
    title: "اختر الفعل الصحيح",
    subtitle: "تذكّر: من هي مجموعة الفاعل؟",
    ex: {
      type: "choose",
      items: [
        { s: "I", o: "football", ar: "أنا ألعب كرة القدم.", opts: ["play", "plays"], answer: 0, third: false },
        { s: "He", o: "football", ar: "هو يلعب كرة القدم.", opts: ["play", "plays"], answer: 1, third: true },
        { s: "They", o: "English", ar: "هم يدرسون الإنجليزية.", opts: ["study", "studies"], answer: 0, third: false },
        { s: "She", o: "English", ar: "هي تدرس الإنجليزية.", opts: ["study", "studies"], answer: 1, third: true },
        { s: "We", o: "TV", ar: "نحن نشاهد التلفاز.", opts: ["watch", "watches"], answer: 0, third: false },
        { s: "He", o: "TV", ar: "هو يشاهد التلفاز.", opts: ["watch", "watches"], answer: 1, third: true },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "🧮",
    badge: "التمرين 2",
    title: "أضف s أو es أو ies",
    subtitle: "اختر الصيغة الصحيحة للغائب المفرد",
    ex: {
      type: "conj",
      items: [
        { verb: "play", subj: "He", opts: ["plays", "playes", "plaies"], answer: 0 },
        { verb: "watch", subj: "She", opts: ["watches", "watchs", "watchies"], answer: 0 },
        { verb: "go", subj: "He", opts: ["goes", "gos", "goies"], answer: 0 },
        { verb: "study", subj: "She", opts: ["studies", "studys", "studes"], answer: 0 },
        { verb: "wash", subj: "He", opts: ["washes", "washs", "washies"], answer: 0 },
        { verb: "read", subj: "She", opts: ["reads", "reades", "readies"], answer: 0 },
        { verb: "fix", subj: "He", opts: ["fixes", "fixs", "fixies"], answer: 0 },
        { verb: "try", subj: "She", opts: ["tries", "trys", "triees"], answer: 0 },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "🪜",
    badge: "التمرين 3",
    title: "اختر كلمة التكرار المناسبة",
    subtitle: "فكّر في المعنى أولًا",
    ex: {
      type: "adv",
      items: [
        { stem: "I ___ brush my teeth in the morning.", ar: "كل صباح بدون استثناء", opts: ["always", "never"], answer: 0 },
        { stem: "I ___ go to school on school days.", ar: "في أيام المدرسة", opts: ["usually", "never"], answer: 0 },
        { stem: "I ___ eat pizza. I don't like it.", ar: "لا أحبها إطلاقًا", opts: ["often", "never"], answer: 1 },
        { stem: "I ___ play football with my friends.", ar: "من وقت لآخر", opts: ["sometimes", "never"], answer: 0 },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "🩹",
    badge: "التمرين 4",
    title: "صحّح الخطأ",
    subtitle: "كل جملة فيها خطأ واحد في الفعل",
    ex: {
      type: "fix",
      items: [
        { wrong: "He play football.", correct: "He plays football.", why: "He ← + s" },
        { wrong: "She study English.", correct: "She studies English.", why: "ساكن + y ← ies" },
        { wrong: "They plays tennis.", correct: "They play tennis.", why: "They بدون s" },
        { wrong: "I studies English.", correct: "I study English.", why: "I بدون s" },
        { wrong: "He watch TV.", correct: "He watches TV.", why: "ch ← + es" },
        { wrong: "We goes to school.", correct: "We go to school.", why: "We بدون s" },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "🔀",
    badge: "التمرين 5",
    title: "رتّب الجملة",
    subtitle: "انتبه لمكان كلمة التكرار: قبل الفعل",
    ex: {
      type: "order",
      items: [
        { words: ["always", "I", "study", "English"], correct: ["I", "always", "study", "English"], ar: "أنا دائمًا أدرس الإنجليزية." },
        { words: ["football", "He", "plays"], correct: ["He", "plays", "football"], ar: "هو يلعب كرة القدم." },
        { words: ["usually", "She", "wakes up", "early"], correct: ["She", "usually", "wakes up", "early"], ar: "هي عادةً تستيقظ باكرًا." },
        { words: ["TV", "They", "sometimes", "watch"], correct: ["They", "sometimes", "watch", "TV"], ar: "هم أحيانًا يشاهدون التلفاز." },
        { words: ["every day", "We", "English", "study"], correct: ["We", "study", "English", "every day"], ar: "نحن ندرس الإنجليزية كل يوم." },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "🕵️",
    badge: "التمرين 6",
    title: "حدّد سبب استخدام Present Simple",
    subtitle: "عادة Habit · روتين Routine · حقيقة Fact",
    ex: {
      type: "why",
      items: [
        { en: "I go to school every day.", ar: "أذهب إلى المدرسة كل يوم.", answer: "routine" },
        { en: "The sun rises in the east.", ar: "الشمس تشرق من الشرق.", answer: "fact" },
        { en: "She usually drinks coffee.", ar: "هي عادةً تشرب القهوة.", answer: "habit" },
        { en: "They play football on Fridays.", ar: "هم يلعبون كرة القدم أيام الجمعة.", answer: "habit" },
        { en: "Water boils at 100°C.", ar: "الماء يغلي عند 100 درجة.", answer: "fact" },
      ],
    },
  },

  { kind: "iq", section: F, mascot: "🏆", title: "تحدي IQ200" },
  { kind: "builder", section: F, mascot: "🎨", title: "تحدي إضافي: كوّن جملة عن نفسك" },

  { kind: "summary", section: G, mascot: "🧠", title: "ملخص الدرس 6" },
  { kind: "quiz", section: G, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: G, mascot: "⏭️", title: "الدرس القادم" },
];

export const IQ6: { wrong: string; correct: string; why: string }[] = [
  { wrong: "He usually play football.", correct: "He usually plays football.", why: "He ← الفعل + s، وكلمة التكرار قبل الفعل" },
  { wrong: "She always study English.", correct: "She always studies English.", why: "ساكن + y ← ies" },
  { wrong: "They sometimes plays basketball.", correct: "They sometimes play basketball.", why: "They ← الفعل بدون s" },
  { wrong: "I never goes to school late.", correct: "I never go to school late.", why: "I ← الفعل بدون s" },
  { wrong: "My brother often watch TV.", correct: "My brother often watches TV.", why: "My brother = He ← + es بعد ch" },
  { wrong: "We usually studies together.", correct: "We usually study together.", why: "We ← الفعل بدون s" },
];
