// ============================================================
// الدرس 8 — مراجعة شاملة للمضارع البسيط (IQ200)
// ============================================================

export type Role8 = "s" | "v" | "aux" | "nt" | "o" | "adv";

export interface Part8 {
  text: string;
  role: Role8;
}

export const ROLE8_AR: Record<Role8, string> = {
  s: "الفاعل",
  v: "الفعل",
  aux: "الفعل المساعد",
  nt: "النفي",
  o: "باقي الجملة",
  adv: "كلمة التكرار",
};

export const P = (text: string, role: Role8): Part8 => ({ text, role });

// -------------------- المحتوى --------------------
export const USES: { emoji: string; en: string; ar: string; desc: string; sents: { parts: Part8[]; ar: string; mark?: string }[] }[] = [
  {
    emoji: "🔁",
    en: "Habit",
    ar: "عادة",
    desc: "شيء نفعله بشكل متكرر — ليس بالضرورة الآن.",
    sents: [
      { parts: [P("Maya", "s"), P("reads", "v"), P("before bed", "o")], ar: "مايا تقرأ قبل النوم." },
      { parts: [P("Omar", "s"), P("feeds", "v"), P("his parrot", "o"), P("every morning", "adv")], ar: "عمر يطعم ببغاءه كل صباح.", mark: "every morning ← علامة قوية على العادة" },
    ],
  },
  {
    emoji: "🌞",
    en: "Routine",
    ar: "روتين",
    desc: "شيء يتكرر ضمن حياتنا اليومية.",
    sents: [
      { parts: [P("Lina", "s"), P("catches", "v"), P("the bus", "o"), P("at 7:15", "adv")], ar: "لينا تستقل الحافلة الساعة 7:15." },
      { parts: [P("My brother", "s"), P("brushes", "v"), P("his teeth", "o"), P("after breakfast", "adv")], ar: "أخي ينظف أسنانه بعد الإفطار." },
    ],
  },
  {
    emoji: "🌍",
    en: "General Fact",
    ar: "حقيقة عامة",
    desc: "شيء صحيح بشكل عام.",
    sents: [
      { parts: [P("Penguins", "s"), P("live", "v"), P("in cold regions", "o")], ar: "البطاريق تعيش في المناطق الباردة." },
      { parts: [P("A triangle", "s"), P("has", "v"), P("three sides", "o")], ar: "المثلث له ثلاثة أضلاع." },
      { parts: [P("Plants", "s"), P("need", "v"), P("water", "o")], ar: "النباتات تحتاج إلى الماء." },
    ],
  },
  {
    emoji: "🔂",
    en: "Repeated Action",
    ar: "شيء يتكرر",
    desc: "فعل يحدث على فترات منتظمة.",
    sents: [
      { parts: [P("Nora", "s"), P("visits", "v"), P("her grandmother", "o"), P("on Saturdays", "adv")], ar: "نورا تزور جدتها أيام السبت.", mark: "on Saturdays ← شيء متكرر" },
    ],
  },
];

export const SIGNALS: { en: string; ar: string; freq?: boolean }[] = [
  { en: "always", ar: "دائمًا", freq: true },
  { en: "usually", ar: "عادةً", freq: true },
  { en: "often", ar: "غالبًا", freq: true },
  { en: "sometimes", ar: "أحيانًا", freq: true },
  { en: "rarely", ar: "نادرًا", freq: true },
  { en: "never", ar: "أبدًا", freq: true },
  { en: "every day", ar: "كل يوم" },
  { en: "every week", ar: "كل أسبوع" },
  { en: "every month", ar: "كل شهر" },
  { en: "every year", ar: "كل سنة" },
  { en: "every morning", ar: "كل صباح" },
  { en: "every evening", ar: "كل مساء" },
  { en: "on Fridays", ar: "أيام الجمعة" },
  { en: "once a week", ar: "مرة في الأسبوع" },
  { en: "twice a month", ar: "مرتين في الشهر" },
  { en: "three times a year", ar: "ثلاث مرات في السنة" },
];

export const LADDER: { en: string; ar: string; pct: number; ex: string; exAr: string }[] = [
  { en: "always", ar: "دائمًا", pct: 100, ex: "I always check my backpack.", exAr: "أنا دائمًا أتفقد حقيبتي." },
  { en: "usually", ar: "عادةً", pct: 85, ex: "Tariq usually walks to school.", exAr: "طارق عادةً يمشي إلى المدرسة." },
  { en: "often", ar: "غالبًا", pct: 65, ex: "They often play board games.", exAr: "هم غالبًا يلعبون ألعاب الطاولة." },
  { en: "sometimes", ar: "أحيانًا", pct: 45, ex: "We sometimes eat dinner outside.", exAr: "نحن أحيانًا نتناول العشاء خارج المنزل." },
  { en: "rarely", ar: "نادرًا", pct: 15, ex: "I rarely check my backpack.", exAr: "أنا نادرًا ما أتفقد حقيبتي." },
  { en: "never", ar: "أبدًا", pct: 0, ex: "I never forget my homework.", exAr: "أنا لا أنسى واجبي أبدًا." },
];

export const CONJ_TABS: { id: "s" | "es" | "ies"; title: string; rows: [string, string][]; note: string; ex: { en: string; ar: string } }[] = [
  {
    id: "s",
    title: "معظم الأفعال ← نضيف S",
    rows: [
      ["jump", "jumps"],
      ["clean", "cleans"],
      ["draw", "draws"],
      ["sing", "sings"],
      ["help", "helps"],
    ],
    note: "نضيف s فقط",
    ex: { en: "The little boy draws cartoons.", ar: "الولد الصغير يرسم الرسوم الكرتونية." },
  },
  {
    id: "es",
    title: "ينتهي بـ s / sh / ch / x / o ← نضيف ES",
    rows: [
      ["wash", "washes"],
      ["teach", "teaches"],
      ["mix", "mixes"],
      ["pass", "passes"],
      ["go", "goes"],
    ],
    note: "The chef mixes · Sami goes",
    ex: { en: "Sami goes to the library after lunch.", ar: "سامي يذهب إلى المكتبة بعد الغداء." },
  },
  {
    id: "ies",
    title: "حرف ساكن + y ← نحذف y ونضع ies",
    rows: [
      ["carry", "carries"],
      ["study", "studies"],
      ["cry", "cries"],
      ["hurry", "hurries"],
    ],
    note: "لكن: play → plays لأن قبل y حرف متحرك",
    ex: { en: "The baby cries at night.", ar: "الطفل يبكي في الليل." },
  },
];

export const VOWEL_Y: [string, string][] = [
  ["play", "plays"],
  ["enjoy", "enjoys"],
  ["stay", "stays"],
];

// -------------------- بلوكات --------------------
export type Block8 =
  | { type: "text"; text: string }
  | { type: "sentence"; parts: Part8[]; ar: string; note?: string; q?: boolean }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "uses" }
  | { type: "signals" }
  | { type: "ladder" }
  | { type: "groups" }
  | { type: "conjTabs" }
  | { type: "vowelY" }
  | { type: "travelS" }
  | { type: "chain"; rows: { a: string; b: string; c: string }[] }
  | { type: "advPlace" }
  | { type: "everyTrap" }
  | { type: "goldenRule" };

// -------------------- التمارين --------------------
export type Ex8 =
  | { type: "choose"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "conj"; items: { before: string; after: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "doDoes"; items: { rest: string; ar: string; answer: number }[] }
  | { type: "dont"; items: { s: string; rest: string; ar: string; answer: number }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why: string }[] }
  | { type: "chainT"; items: { aff: string; affAr: string; neg: string; q: string; yes: string; no: string }[] }
  | { type: "adv"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "iq"; items: IQItem[] }
  | { type: "detective" }
  | { type: "tf"; items: { en: string; ok: boolean; why: string }[] };

export type IQItem =
  | { kind: "mcq"; q: string; opts: string[]; answer: number; why: string }
  | { kind: "explain"; q: string; verdict: string; why: string }
  | { kind: "order"; words: string[]; correct: string[]; ar: string }
  | { kind: "spot"; q: string; answer: string; why: string };

export const DETECTIVE_TEXT = "Every morning, Leo wakes up early. He usually feeds his hamster before breakfast. His sister doesn't feed the hamster because she doesn't like animals. They often walk to school together. On rainy days, Leo takes the bus.";

export const DETECTIVE_Q: { q: string; a: string }[] = [
  { q: "استخرج 5 أفعال Present Simple.", a: "wakes up · feeds · doesn't feed · doesn't like · walk · takes (اختر أي 5)" },
  { q: "لماذا نقول wakes وليس wake؟", a: "لأن الفاعل Leo = He — الغائب المفرد يأخذ s." },
  { q: "لماذا نقول feeds وليس feed؟", a: "لأن الفاعل He — الغائب المفرد يأخذ s." },
  { q: "لماذا نقول doesn't feed وليس doesn't feeds؟", a: "لأن doesn't تحمل الـ s بداخلها — الفعل بعدها أساسي." },
  { q: "ما الكلمة الدالة على التكرار في الجملة الأولى؟", a: "Every morning — كل صباح." },
  { q: "ما الكلمة الدالة على التكرار في الجملة الثانية؟", a: "usually — عادةً." },
  { q: "ما العبارة التي تعني «في الأيام الممطرة»؟", a: "On rainy days." },
  { q: "هل walk تحتاج s؟ لماذا؟", a: "لا — لأن الفاعل They من المجموعة الأولى." },
];

export type Slide8 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block8[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Ex8 }
  | { kind: "challenge"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const A = "البداية";
const B = "المراجعة";
const C = "الفخاخ";
const D = "المستويات";
const E = "الخاتمة";

export const SLIDES: Slide8[] = [
  { kind: "cover", section: A, mascot: "🧠" },
  { kind: "objectives", section: A, mascot: "🎯" },

  { kind: "lesson", section: B, mascot: "❓", step: "1", title: "متى نستخدم Present Simple؟", lead: "أربع حالات — اضغط على كل بطاقة:", blocks: [{ type: "uses" }] },
  {
    kind: "lesson", section: B, mascot: "📻", step: "2", title: "الكلمات الدالة", lead: "احفظ معناها — والأهم أن تفهم ماذا تخبرك:",
    blocks: [
      { type: "signals" },
      { type: "sentence", parts: [P("Tariq", "s"), P("usually", "adv"), P("walks", "v"), P("to school", "o")], ar: "طارق عادةً يمشي إلى المدرسة." },
      { type: "sentence", parts: [P("The museum", "s"), P("opens", "v"), P("every Sunday", "adv")], ar: "المتحف يفتح كل يوم أحد." },
    ],
  },
  { kind: "lesson", section: B, mascot: "🪜", step: "3", title: "سلّم التكرار", lead: "من الأعلى إلى الأسفل يقلّ تكرار الفعل — اضغط على أي درجة:", blocks: [{ type: "ladder" }] },
  { kind: "lesson", section: B, mascot: "⚖️", step: "4", title: "القاعدة الذهبية مع الفاعل", lead: "بدّل بين المجموعتين:", blocks: [{ type: "groups" }] },
  {
    kind: "lesson", section: B, mascot: "🧮", step: "5", title: "متى s ومتى es ومتى ies؟", lead: "ثلاثة أزرار — أتقنها كلها:",
    blocks: [{ type: "conjTabs" }, { type: "vowelY" }, { type: "note", emoji: "⭐", text: "تذكر: [[I / You / We / They → base verb]] أما [[He / She / It → s / es / ies]]" }],
  },

  {
    kind: "lesson", section: C, mascot: "🪤", step: "6", title: "الفخ الكبير: does و doesn't", lead: "هنا يبدأ الاختبار الحقيقي:",
    blocks: [
      { type: "sentence", parts: [P("She", "s"), P("cooks", "v"), P("dinner", "o")], ar: "هي تطبخ العشاء. (مثبتة)" },
      { type: "sentence", parts: [P("Does", "aux"), P("she", "s"), P("cook", "v"), P("dinner", "o")], ar: "هل تطبخ العشاء؟", note: "cooks أصبحت cook!", q: true },
      { type: "note", emoji: "⭐", text: "قاعدة IQ: عندما تظهر [[does]] أو [[doesn't]] لا نضع [[s]] على الفعل الرئيسي." },
      { type: "ok", en: "Does he drive carefully?", ar: "هل يقود بحذر؟" },
      { type: "bad", en: "Does he drives carefully?", why: "الفعل بعد does أساسي" },
      { type: "ok", en: "He doesn't drive carefully.", ar: "هو لا يقود بحذر." },
      { type: "bad", en: "He doesn't drives carefully.", why: "الفعل بعد doesn't أساسي" },
    ],
  },
  { kind: "lesson", section: C, mascot: "✨", step: "7", title: "فكّر فيها كأن الـ S انتقلت", lead: "طريقة ذكية جدًا لتذكر القاعدة — حرّك المفتاح:", blocks: [{ type: "travelS" }] },
  {
    kind: "lesson", section: C, mascot: "🚫", step: "8", title: "النفي — القاعدة الكاملة", blocks: [
      { type: "sentence", parts: [P("I", "s"), P("don't", "nt"), P("collect", "v"), P("stamps", "o")], ar: "أنا لا أجمع الطوابع." },
      { type: "sentence", parts: [P("They", "s"), P("don't", "nt"), P("swim", "v"), P("in winter", "o")], ar: "هم لا يسبحون في الشتاء." },
      { type: "sentence", parts: [P("He", "s"), P("doesn't", "nt"), P("collect", "v"), P("stamps", "o")], ar: "هو لا يجمع الطوابع." },
      { type: "sentence", parts: [P("She", "s"), P("doesn't", "nt"), P("swim", "v"), P("in winter", "o")], ar: "هي لا تسبح في الشتاء." },
      { type: "note", emoji: "📌", text: "[[doesn't + base verb]] دائمًا." },
    ],
  },
  {
    kind: "lesson", section: C, mascot: "❓", step: "9", title: "السؤال والإجابات القصيرة", blocks: [
      { type: "sentence", parts: [P("Do", "aux"), P("you", "s"), P("collect", "v"), P("coins", "o")], ar: "هل تجمع العملات؟", q: true },
      { type: "sentence", parts: [P("Does", "aux"), P("she", "s"), P("collect", "v"), P("coins", "o")], ar: "هل تجمع العملات؟", q: true },
      { type: "sentence", parts: [P("Does", "aux"), P("he", "s"), P("practice", "v"), P("karate", "o")], ar: "هل يتدرب على الكاراتيه؟", q: true },
      { type: "ok", en: "Yes, he does. / No, he doesn't.", ar: "السؤال بـ Does ← الجواب بـ does." },
      { type: "ok", en: "Yes, they do. / No, they don't.", ar: "السؤال بـ Do ← الجواب بـ do." },
    ],
  },
  { kind: "lesson", section: C, mascot: "📍", step: "10", title: "مكان كلمات التكرار", lead: "القاعدة + الاستثناء المهم مع Verb to be:", blocks: [{ type: "advPlace" }] },
  { kind: "lesson", section: C, mascot: "⚠️", step: "11", title: "every day أم everyday؟", lead: "فخ مشهور جدًا — قارن بنفسك:", blocks: [{ type: "everyTrap" }] },

  // ---------------- المستويات ----------------
  {
    kind: "ex", section: D, mascot: "✏️", badge: "المستوى 1 · سهل", title: "اختر الإجابة الصحيحة", subtitle: "انظر إلى الفاعل أولًا",
    ex: { type: "choose", items: [
      { stem: "My cousin usually ___ cartoons after dinner.", ar: "ابن عمي...", opts: ["watch", "watches", "watching"], answer: 1 },
      { stem: "We ___ basketball on Fridays.", ar: "نحن...", opts: ["plays", "play", "playing"], answer: 1 },
      { stem: "The owl ___ at night.", ar: "البومة...", opts: ["hunt", "hunts", "hunting"], answer: 1 },
      { stem: "I ___ my room every Saturday.", ar: "أنا...", opts: ["clean", "cleans", "cleaning"], answer: 0 },
      { stem: "Sara often ___ stories to her little sister.", ar: "سارة...", opts: ["read", "reads", "reading"], answer: 1 },
    ] },
  },
  {
    kind: "ex", section: D, mascot: "🧮", badge: "المستوى 2 · s / es / ies", title: "حوّل الفعل إلى الشكل الصحيح", subtitle: "أي قاعدة تنطبق؟",
    ex: { type: "conj", items: [
      { before: "He", after: "his bicycle every weekend.", ar: "fix", opts: ["fixes", "fixs", "fixies"], answer: 0 },
      { before: "Lina", after: "to school at 8:00.", ar: "go", opts: ["goes", "gos", "goies"], answer: 0 },
      { before: "My uncle", after: "delicious bread.", ar: "bake", opts: ["bakes", "baks", "bakies"], answer: 0 },
      { before: "The bird", after: "over the lake.", ar: "fly", opts: ["flies", "flys", "flyes"], answer: 0 },
      { before: "Adam", after: "his little brother.", ar: "carry", opts: ["carries", "carrys", "carryes"], answer: 0 },
      { before: "The teacher", after: "English.", ar: "teach", opts: ["teaches", "teach", "teachs"], answer: 0 },
      { before: "My sister", after: "tennis.", ar: "play", opts: ["plays", "plaies", "playes"], answer: 0 },
      { before: "The dog", after: "when it sees strangers.", ar: "cry", opts: ["cries", "crys", "cryes"], answer: 0 },
    ] },
  },
  {
    kind: "ex", section: D, mascot: "❓", badge: "المستوى 3 · Do أم Does؟", title: "اختر الفعل المساعد", subtitle: "من الفاعل؟",
    ex: { type: "doDoes", items: [
      { rest: "you enjoy science?", ar: "هل تستمتع بالعلوم؟", answer: 0 },
      { rest: "your father drive to work?", ar: "هل يقود والدك إلى العمل؟", answer: 1 },
      { rest: "they visit their cousins often?", ar: "هل يزورون أبناء عمهم غالبًا؟", answer: 0 },
      { rest: "Lina speak Spanish?", ar: "هل تتحدث لينا الإسبانية؟", answer: 1 },
      { rest: "we need a ticket?", ar: "هل نحتاج تذكرة؟", answer: 0 },
      { rest: "the cat sleep during the day?", ar: "هل تنام القطة نهارًا؟", answer: 1 },
    ] },
  },
  {
    kind: "ex", section: D, mascot: "🚫", badge: "المستوى 4 · don't أم doesn't؟", title: "أكمل النفي", subtitle: "اختر الأداة الصحيحة",
    ex: { type: "dont", items: [
      { s: "I", rest: "eat mushrooms.", ar: "أنا لا آكل الفطر.", answer: 0 },
      { s: "He", rest: "like loud music.", ar: "هو لا يحب الموسيقى الصاخبة.", answer: 1 },
      { s: "They", rest: "live near the airport.", ar: "هم لا يعيشون قرب المطار.", answer: 0 },
      { s: "My sister", rest: "drink coffee.", ar: "أختي لا تشرب القهوة.", answer: 1 },
      { s: "We", rest: "watch television in the morning.", ar: "نحن لا نشاهد التلفاز صباحًا.", answer: 0 },
      { s: "The parrot", rest: "fly very far.", ar: "الببغاء لا يطير بعيدًا.", answer: 1 },
    ] },
  },
  {
    kind: "ex", section: D, mascot: "🩹", badge: "المستوى 5 · صحح الخطأ", title: "اكتشف الخطأ الواحد وصححه", subtitle: "اضغط «الحل» بعد أن تفكر",
    ex: { type: "fix", items: [
      { wrong: "He play chess every Tuesday.", correct: "He plays chess every Tuesday.", why: "He ← + s" },
      { wrong: "They studies English after lunch.", correct: "They study English after lunch.", why: "They ← بدون s" },
      { wrong: "Does Maya likes strawberries?", correct: "Does Maya like strawberries?", why: "بعد Does الفعل أساسي" },
      { wrong: "She doesn't watches horror movies.", correct: "She doesn't watch horror movies.", why: "بعد doesn't الفعل أساسي" },
      { wrong: "My parents goes shopping on Sundays.", correct: "My parents go shopping on Sundays.", why: "parents جمع ← بدون s" },
      { wrong: "Does your brothers play football?", correct: "Do your brothers play football?", why: "brothers جمع ← Do" },
      { wrong: "The baby cry every night.", correct: "The baby cries every night.", why: "ساكن + y ← ies" },
      { wrong: "I doesn't understand this question.", correct: "I don't understand this question.", why: "مع I نستخدم don't" },
    ] },
  },
  {
    kind: "ex", section: D, mascot: "🔄", badge: "المستوى 6 · حوّل الجملة", title: "من جملة واحدة ← أربع صيغ", subtitle: "اكشف كل خطوة بعد أن تجرب",
    ex: { type: "chainT", items: [
      { aff: "Nadia visits the aquarium every month.", affAr: "نادية تزور الحوض المائي كل شهر.", neg: "Nadia doesn't visit the aquarium every month.", q: "Does Nadia visit the aquarium every month?", yes: "Yes, she does.", no: "No, she doesn't." },
      { aff: "The boys practice basketball after school.", affAr: "الأولاد يتدربون على السلة بعد المدرسة.", neg: "The boys don't practice basketball after school.", q: "Do the boys practice basketball after school?", yes: "Yes, they do.", no: "No, they don't." },
    ] },
  },
  {
    kind: "ex", section: D, mascot: "🪜", badge: "المستوى 7 · الكلمات الدالة", title: "اختر الكلمة الأنسب", subtitle: "فكّر في المعنى",
    ex: { type: "adv", items: [
      { stem: "I ___ brush my teeth before bed.", ar: "عادة ثابتة", opts: ["always", "never"], answer: 0 },
      { stem: "My grandfather ___ uses a computer. He finds it difficult.", ar: "يجد صعوبة", opts: ["rarely", "always"], answer: 0 },
      { stem: "We ___ have a family picnic on Saturdays.", ar: "تقليد أسبوعي", opts: ["usually", "never"], answer: 0 },
      { stem: "Sara ___ forgets her keys. She is very careful.", ar: "حذرة جدًا", opts: ["never", "often"], answer: 0 },
      { stem: "Tom ___ visits the swimming pool because he loves swimming.", ar: "يحب السباحة", opts: ["often", "rarely"], answer: 0 },
    ] },
  },
  {
    kind: "ex", section: D, mascot: "🔥", badge: "المستوى 8 · IQ200", title: "فكّر — لا تحفظ", subtitle: "8 أسئلة تعتمد على الفهم",
    ex: { type: "iq", items: [
      { kind: "mcq", q: "أي جملة صحيحة؟ ولماذا؟", opts: ["Does he plays the violin?", "Does he play the violin?", "Do he play the violin?"], answer: 1, why: "مع He نستخدم Does + الفعل الأساسي بدون s." },
      { kind: "mcq", q: "اختر الجملة الصحيحة:", opts: ["She doesn't studies at night.", "She don't study at night.", "She doesn't study at night.", "She doesn't studies at nights."], answer: 2, why: "She ← doesn't + الفعل الأساسي." },
      { kind: "explain", q: "طالب قال: سؤال «He watches documentaries every weekend» هو «Does he watches documentaries every weekend?» — هل كلامه صحيح؟ أين ذهب حرف s؟", verdict: "خطأ", why: "الصحيح: Does he watch...؟ — الـ s انتقلت من watches إلى Does، فعاد الفعل أساسيًا." },
      { kind: "mcq", q: "أي جملة مختلفة عن البقية؟", opts: ["Omar usually rides his bike.", "Omar rides his bike every morning.", "Omar is riding his bike now.", "Omar often rides his bike."], answer: 2, why: "الثالثة Present Continuous (يحدث الآن) — البقية Present Simple." },
      { kind: "order", words: ["usually", "the", "library", "visits", "she"], correct: ["she", "usually", "visits", "the", "library"], ar: "هي عادةً تزور المكتبة." },
      { kind: "order", words: ["doesn't", "vegetables", "eat", "Karim", "usually"], correct: ["Karim", "doesn't", "usually", "eat", "vegetables"], ar: "كريم عادةً لا يأكل الخضار." },
      { kind: "spot", q: "اكتشف الخطأ الخفي: My sister doesn't usually goes to bed late.", answer: "goes ← go", why: "بعد doesn't الفعل أساسي دائمًا — حتى مع وجود usually." },
      { kind: "mcq", q: "أي واحدة صحيحة؟", opts: ["He never doesn't eat breakfast.", "He doesn't never eat breakfast.", "He never eats breakfast.", "He doesn't eats breakfast never."], answer: 2, why: "never وحدها تكفي للنفي — ولا تجتمع مع doesn't." },
    ] },
  },
  {
    kind: "ex", section: D, mascot: "🕵️", badge: "المستوى 9 · Detective", title: "محقق لغوي — اقرأ وأجب", subtitle: "فقرة قصيرة + 8 أسئلة",
    ex: { type: "detective" },
  },
  {
    kind: "ex", section: D, mascot: "⚖️", badge: "المستوى 10 · النهائي", title: "صح أم خطأ؟ مع السبب", subtitle: "10 جمل — اشرح كل خطأ",
    ex: { type: "tf", items: [
      { en: "Sarah usually carries her notebook.", ok: true, why: "صحيحة: ساكن + y ← ies." },
      { en: "Does your uncle drives a truck?", ok: false, why: "بعد Does الفعل أساسي: drive." },
      { en: "We don't visits that restaurant.", ok: false, why: "بعد don't الفعل أساسي: visit." },
      { en: "The moon moves around the Earth.", ok: true, why: "صحيحة: حقيقة عامة + s." },
      { en: "My friends often play volleyball.", ok: true, why: "صحيحة: جمع ← فعل أساسي، وكلمة التكرار قبل الفعل." },
      { en: "He doesn't usually forget his keys.", ok: true, why: "صحيحة: doesn't + usually + فعل أساسي." },
      { en: "Does Lina studies every evening?", ok: false, why: "بعد Does الفعل أساسي: study." },
      { en: "I rarely drink soda.", ok: true, why: "صحيحة: I + rarely + فعل أساسي." },
      { en: "The children doesn't like loud noises.", ok: false, why: "children جمع ← don't." },
      { en: "My brother watches documentaries every Sunday.", ok: true, why: "صحيحة: مفرد + watches." },
    ] },
  },

  { kind: "challenge", section: D, mascot: "🏆", title: "تحدي الأستاذ — IQ200+" },
  { kind: "summary", section: E, mascot: "🧠", title: "ملخص الدرس" },
  { kind: "quiz", section: E, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: E, mascot: "⏭️", title: "الدرس القادم" },
];
