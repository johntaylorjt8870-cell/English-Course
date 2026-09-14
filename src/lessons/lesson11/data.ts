// ============================================================
// الدرس 11 — Present Simple vs Present Continuous
// المصدر الكامل محفوظ حرفيًا — لا تلخيص ولا إعادة صياغة
// العنوان: Present Simple vs Present Continuous — IQ200 كيف تختار الزمن الصحيح من المعنى
// ============================================================

export type BeForm = "am" | "is" | "are";

export interface Subj11 {
  en: string;
  ar: string;
  be: BeForm;
}

export const SUBJ11: Subj11[] = [
  { en: "I", ar: "أنا", be: "am" },
  { en: "You", ar: "أنت", be: "are" },
  { en: "We", ar: "نحن", be: "are" },
  { en: "They", ar: "هم", be: "are" },
  { en: "He", ar: "هو", be: "is" },
  { en: "She", ar: "هي", be: "is" },
  { en: "It", ar: "هو / هي لغير العاقل", be: "is" },
  { en: "Nora", ar: "نورا", be: "is" },
  { en: "Lara", ar: "لارا", be: "is" },
  { en: "Adam", ar: "آدم", be: "is" },
];

export type IngRule = "add" | "drop-e" | "double";

export interface Verb11 {
  base: string;
  simple3: string;
  ing: string;
  rule: IngRule;
  ar: string;
}

export const VERBS11: Verb11[] = [
  { base: "walk", simple3: "walks", ing: "walking", rule: "add", ar: "يمشي" },
  { base: "work", simple3: "works", ing: "working", rule: "add", ar: "يعمل" },
  { base: "cook", simple3: "cooks", ing: "cooking", rule: "add", ar: "يطبخ" },
  { base: "repair", simple3: "repairs", ing: "repairing", rule: "add", ar: "يصلح" },
  { base: "chase", simple3: "chases", ing: "chasing", rule: "drop-e", ar: "يطارد" },
  { base: "have", simple3: "has", ing: "having", rule: "drop-e", ar: "يمتلك / يتناول" },
  { base: "live", simple3: "lives", ing: "living", rule: "drop-e", ar: "يعيش" },
  { base: "visit", simple3: "visits", ing: "visiting", rule: "add", ar: "يزور" },
  { base: "eat", simple3: "eats", ing: "eating", rule: "add", ar: "يأكل" },
  { base: "organize", simple3: "organizes", ing: "organizing", rule: "drop-e", ar: "يرتب" },
  { base: "take", simple3: "takes", ing: "taking", rule: "drop-e", ar: "يأخذ" },
  { base: "change", simple3: "changes", ing: "changing", rule: "drop-e", ar: "يتغير" },
  { base: "learn", simple3: "learns", ing: "learning", rule: "add", ar: "يتعلم" },
  { base: "read", simple3: "reads", ing: "reading", rule: "add", ar: "يقرأ" },
  { base: "clean", simple3: "cleans", ing: "cleaning", rule: "add", ar: "ينظف" },
  { base: "wait", simple3: "waits", ing: "waiting", rule: "add", ar: "ينتظر" },
  { base: "draw", simple3: "draws", ing: "drawing", rule: "add", ar: "يرسم" },
  { base: "practice", simple3: "practices", ing: "practicing", rule: "drop-e", ar: "يتدرب" },
  { base: "cry", simple3: "cries", ing: "crying", rule: "add", ar: "يبكي" },
  { base: "play", simple3: "plays", ing: "playing", rule: "add", ar: "يلعب" },
  { base: "check", simple3: "checks", ing: "checking", rule: "add", ar: "يفحص" },
  { base: "move", simple3: "moves", ing: "moving", rule: "drop-e", ar: "يتحرك" },
  { base: "drink", simple3: "drinks", ing: "drinking", rule: "add", ar: "يشرب" },
  { base: "do", simple3: "does", ing: "doing", rule: "add", ar: "يفعل" },
  { base: "watch", simple3: "watches", ing: "watching", rule: "add", ar: "يشاهد" },
  { base: "study", simple3: "studies", ing: "studying", rule: "add", ar: "يدرس" },
  { base: "prepare", simple3: "prepares", ing: "preparing", rule: "drop-e", ar: "يُعد" },
  { base: "paint", simple3: "paints", ing: "painting", rule: "add", ar: "يرسم لوحة" },
];

export function ingOf(base: string): string {
  return VERBS11.find((v) => v.base === base)?.ing ?? base + "ing";
}
export function simple3Of(base: string): string {
  return VERBS11.find((v) => v.base === base)?.simple3 ?? base + "s";
}

// -------------------- كلمات Simple --------------------
export const SIMPLE_SIGNALS: { en: string; ar: string }[] = [
  { en: "always", ar: "دائمًا" },
  { en: "usually", ar: "عادةً" },
  { en: "often", ar: "غالبًا" },
  { en: "sometimes", ar: "أحيانًا" },
  { en: "rarely", ar: "نادرًا" },
  { en: "never", ar: "أبدًا" },
  { en: "every day", ar: "كل يوم" },
  { en: "every week", ar: "كل أسبوع" },
  { en: "every month", ar: "كل شهر" },
  { en: "every year", ar: "كل سنة" },
  { en: "on Mondays", ar: "أيام الاثنين" },
  { en: "once a week", ar: "مرة في الأسبوع" },
  { en: "twice a month", ar: "مرتين في الشهر" },
  { en: "three times a year", ar: "ثلاث مرات في السنة" },
];

// -------------------- كلمات Continuous --------------------
export const CONT_SIGNALS: { en: string; ar: string }[] = [
  { en: "now", ar: "الآن" },
  { en: "right now", ar: "الآن تمامًا" },
  { en: "at the moment", ar: "في هذه اللحظة" },
  { en: "currently", ar: "حاليًا" },
  { en: "today", ar: "اليوم" },
  { en: "this week", ar: "هذا الأسبوع" },
  { en: "this month", ar: "هذا الشهر" },
  { en: "this year", ar: "هذا العام" },
  { en: "these days", ar: "هذه الأيام" },
  { en: "Look!", ar: "انظر!" },
  { en: "Listen!", ar: "استمع!" },
];

// -------------------- الأفعال الحالة --------------------
export const STATIVE_VERBS: { en: string; ar: string }[] = [
  { en: "know", ar: "يعرف" },
  { en: "understand", ar: "يفهم" },
  { en: "believe", ar: "يعتقد" },
  { en: "want", ar: "يريد" },
  { en: "need", ar: "يحتاج" },
  { en: "like", ar: "يحب" },
  { en: "love", ar: "يحب" },
  { en: "hate", ar: "يكره" },
  { en: "remember", ar: "يتذكر" },
];

// -------------------- بلوكات --------------------
export type Role11 = "s" | "be" | "v" | "o" | "adv" | "nt" | "aux";

export interface Part11 {
  text: string;
  role: Role11;
}

export const ROLE11_AR: Record<Role11, string> = {
  s: "الفاعل",
  be: "am / is / are",
  v: "الفعل",
  o: "المفعول به",
  adv: "الظرف",
  nt: "النفي",
  aux: "المساعد",
};

export type Block11 =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "sentence"; parts: Part11[]; ar: string; note?: string; q?: boolean }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "bigMap" }
  | { type: "compareCook" }
  | { type: "magicQuestion" }
  | { type: "nowWithoutNow" }
  | { type: "simpleWithoutEveryDay" }
  | { type: "signalSimple" }
  | { type: "signalContinuous" }
  | { type: "temporaryCompare" }
  | { type: "livingCompare" }
  | { type: "theseDays" }
  | { type: "frequencyPlace" }
  | { type: "beVsDo" }
  | { type: "mentalTable" }
  | { type: "dangerousError" }
  | { type: "stativeGrid" }
  | { type: "thinkCompare" }
  | { type: "haveCompare" };

export type Exercise11 =
  | { type: "chooseTense"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "chooseForm"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "fill"; items: { stem: string; ar: string; hint: string; answer: string }[] }
  | { type: "negTransform"; items: { aff: string; neg: string }[] }
  | { type: "qTransform"; items: { aff: string; q: string }[] }
  | { type: "tenseExplain"; items: { en: string; ar: string; opts: string[]; answer: number; explain: string }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why: string }[] }
  | { type: "iq"; items: IQ11Item[] }
  | { type: "detective" }
  | { type: "transformChallenge" }
  | { type: "finalDetective" }
  | { type: "comprehensive" };

export type IQ11Item =
  | { kind: "mcq"; q: string; opts: string[]; answer: number; why: string }
  | { kind: "text"; q: string; a: string }
  | { kind: "correct"; q: string; wrong: string; correct: string; why: string };

export type Slide11 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block11[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise11 }
  | { kind: "detective"; title: string }
  | { kind: "challenge"; title: string }
  | { kind: "finalChallenge"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const A = "البداية";
const B = "الخريطة الذهنية";
const C = "البناء الكامل";
const D = "المقارنة الذهبية";
const E = "العلامات والسياق";
const F = "الفروق الدقيقة";
const G = "قواعد مهمة";
const H = "التمارين";
const I = "التحديات";
const J = "الخاتمة";

const P = (text: string, role: Role11): Part11 => ({ text, role });

export const SLIDES: Slide11[] = [
  { kind: "cover", section: A, mascot: "📘" },
  { kind: "objectives", section: A, mascot: "🎯" },

  {
    kind: "lesson",
    section: B,
    mascot: "🗺️",
    step: "①",
    title: "أولًا: الخريطة الكبيرة",
    lead: "قبل التفاصيل، احفظ هذه الصورة الذهنية:",
    blocks: [
      { type: "bigMap" },
      { type: "sentence", parts: [P("Nora", "s"), P("walks", "v"), P("to school", "o"), P("every day", "adv")], ar: "نورا تمشي إلى المدرسة كل يوم.", note: "روتين → Present Simple" },
      { type: "sentence", parts: [P("Nora", "s"), P("is", "be"), P("walking", "v"), P("to school", "o"), P("now", "adv")], ar: "نورا تمشي إلى المدرسة الآن.", note: "يحدث الآن → Present Continuous" },
      { type: "note", emoji: "🧠", text: "[[Present Simple]] ↓ [[عادة · روتين · حقيقة · شيء متكرر · شيء مستقر]] — [[Present Continuous]] ↓ [[يحدث الآن · يحدث هذه الفترة · شيء مؤقت · شيء يتغير حاليًا]]" },
    ],
  },

  {
    kind: "lesson",
    section: C,
    mascot: "🧱",
    step: "②",
    title: "Present Simple — البناء الكامل",
    lead: "الجملة المثبتة، النفي، والسؤال — احفظها كاملة:",
    blocks: [
      { type: "text", text: "الجملة المثبتة مع I / You / We / They نستخدم الفعل الأساسي. مع He / She / It نضيف s / es / ies." },
      { type: "sentence", parts: [P("I", "s"), P("work", "v")], ar: "أنا أعمل." },
      { type: "sentence", parts: [P("You", "s"), P("work", "v")], ar: "أنت تعمل." },
      { type: "sentence", parts: [P("We", "s"), P("work", "v")], ar: "نحن نعمل." },
      { type: "sentence", parts: [P("They", "s"), P("work", "v")], ar: "هم يعملون." },
      { type: "sentence", parts: [P("He", "s"), P("works", "v")], ar: "هو يعمل." },
      { type: "sentence", parts: [P("She", "s"), P("works", "v")], ar: "هي تعمل." },
      { type: "sentence", parts: [P("It", "s"), P("works", "v")], ar: "هو / هي لغير العاقل يعمل." },
      { type: "text", text: "النفي: I / You / We / They: don't + base verb — He / She / It: doesn't + base verb" },
      { type: "sentence", parts: [P("I", "s"), P("don't", "nt"), P("work", "v")], ar: "أنا لا أعمل." },
      { type: "sentence", parts: [P("They", "s"), P("don't", "nt"), P("work", "v")], ar: "هم لا يعملون." },
      { type: "sentence", parts: [P("He", "s"), P("doesn't", "nt"), P("work", "v")], ar: "هو لا يعمل." },
      { type: "sentence", parts: [P("She", "s"), P("doesn't", "nt"), P("work", "v")], ar: "هي لا تعمل." },
      { type: "note", emoji: "⭐", text: "انتبه: بعد [[doesn't]] نعود إلى الفعل الأساسي. [[doesn't works ❌]] → [[doesn't work ✅]]" },
      { type: "ok", en: "He doesn't work.", ar: "صحيح ✅" },
      { type: "bad", en: "He doesn't works.", why: "بعد doesn't الفعل أساسي" },
      { type: "text", text: "السؤال: Do + I / You / We / They + base verb? — Does + He / She / It + base verb?" },
      { type: "sentence", parts: [P("Do", "aux"), P("you", "s"), P("work", "v")], ar: "هل تعمل؟", q: true },
      { type: "sentence", parts: [P("Do", "aux"), P("they", "s"), P("work", "v")], ar: "هل يعملون؟", q: true },
      { type: "sentence", parts: [P("Does", "aux"), P("he", "s"), P("work", "v")], ar: "هل يعمل؟", q: true },
      { type: "sentence", parts: [P("Does", "aux"), P("she", "s"), P("work", "v")], ar: "هل تعمل؟", q: true },
    ],
  },

  {
    kind: "lesson",
    section: C,
    mascot: "🎬",
    step: "③",
    title: "Present Continuous — البناء الكامل",
    lead: "Subject + am/is/are + verb-ing",
    blocks: [
      { type: "text", text: "الجملة المثبتة:" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("working", "v")], ar: "أنا أعمل الآن." },
      { type: "sentence", parts: [P("He", "s"), P("is", "be"), P("working", "v")], ar: "هو يعمل الآن." },
      { type: "sentence", parts: [P("She", "s"), P("is", "be"), P("working", "v")], ar: "هي تعمل الآن." },
      { type: "sentence", parts: [P("We", "s"), P("are", "be"), P("working", "v")], ar: "نحن نعمل الآن." },
      { type: "sentence", parts: [P("They", "s"), P("are", "be"), P("working", "v")], ar: "هم يعملون الآن." },
      { type: "text", text: "النفي: Subject + am/is/are + not + verb-ing" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("not", "nt"), P("working", "v")], ar: "أنا لا أعمل." },
      { type: "sentence", parts: [P("He", "s"), P("isn't", "be"), P("working", "v")], ar: "هو لا يعمل." },
      { type: "sentence", parts: [P("They", "s"), P("aren't", "be"), P("working", "v")], ar: "هم لا يعملون." },
      { type: "text", text: "السؤال: Am/Is/Are + subject + verb-ing؟" },
      { type: "sentence", parts: [P("Am", "be"), P("I", "s"), P("working", "v")], ar: "هل أعمل؟", q: true },
      { type: "sentence", parts: [P("Is", "be"), P("he", "s"), P("working", "v")], ar: "هل هو يعمل؟", q: true },
      { type: "sentence", parts: [P("Are", "be"), P("they", "s"), P("working", "v")], ar: "هل هم يعملون؟", q: true },
    ],
  },

  {
    kind: "lesson",
    section: D,
    mascot: "⭐",
    step: "④",
    title: "المقارنة الذهبية",
    lead: "لنأخذ فعلًا واحدًا فقط: cook",
    blocks: [
      { type: "compareCook" },
      { type: "sentence", parts: [P("Lara", "s"), P("cooks", "v"), P("dinner", "o"), P("every evening", "adv")], ar: "لَارا تطبخ العشاء كل مساء.", note: "روتين → Present Simple" },
      { type: "sentence", parts: [P("Lara", "s"), P("is", "be"), P("cooking", "v"), P("dinner", "o"), P("now", "adv")], ar: "لَارا تطبخ العشاء الآن.", note: "يحدث الآن → Present Continuous" },
      { type: "note", emoji: "💡", text: "[[cooks]] → عادة — [[is cooking]] → الآن" },
    ],
  },

  {
    kind: "lesson",
    section: D,
    mascot: "🧠",
    step: "⑤",
    title: "السؤال السحري",
    lead: "عندما ترى جملة ولا تعرف الزمن، اسأل نفسك: هل أتكلم عن شيء يحدث عادة، أم شيء يحدث الآن؟",
    blocks: [
      { type: "magicQuestion" },
      { type: "sentence", parts: [P("My uncle", "s"), P("repairs", "v"), P("bicycles", "o")], ar: "عمي يصلح الدراجات (بشكل عام).", note: "Present Simple" },
      { type: "text", text: "هل هو يصلح دراجة الآن؟ ليس بالضرورة. الجملة تعني أنه يعمل في إصلاح الدراجات أو يقوم بذلك بشكل عام." },
      { type: "sentence", parts: [P("My uncle", "s"), P("is", "be"), P("repairing", "v"), P("my bicycle", "o")], ar: "عمي يصلح دراجتي الآن.", note: "Present Continuous" },
    ],
  },

  {
    kind: "lesson",
    section: E,
    mascot: "👀",
    step: "⑥",
    title: "ليس كل شيء يحدث الآن يحتاج كلمة now",
    blocks: [
      { type: "nowWithoutNow" },
      { type: "sentence", parts: [P("Look!", "adv"), P("The dog", "s"), P("is", "be"), P("chasing", "v"), P("the ball", "o")], ar: "انظر! الكلب يطارد الكرة.", note: "واضح أنه يحدث الآن" },
      { type: "sentence", parts: [P("The dog", "s"), P("is", "be"), P("chasing", "v"), P("the ball", "o")], ar: "الكلب يطارد الكرة.", note: "بدون now — السياق واضح" },
      { type: "note", emoji: "⭐", text: "غياب [[now]] لا يعني أن الجملة ليست [[Present Continuous]]." },
    ],
  },

  {
    kind: "lesson",
    section: E,
    mascot: "🌍",
    step: "⑦",
    title: "وليس كل Present Simple يحتاج every day",
    blocks: [
      { type: "simpleWithoutEveryDay" },
      { type: "sentence", parts: [P("Birds", "s"), P("have", "v"), P("feathers", "o")], ar: "الطيور لديها ريش.", note: "حقيقة عامة" },
      { type: "text", text: "لا يوجد every day لكن الزمن هو Present Simple." },
      { type: "sentence", parts: [P("Water", "s"), P("freezes", "v"), P("at 0°C", "adv")], ar: "الماء يتجمد عند درجة 0 مئوية.", note: "حقيقة → Present Simple" },
    ],
  },

  {
    kind: "lesson",
    section: E,
    mascot: "🔁",
    step: "⑧",
    title: "العادات والعلامات الدالة",
    lead: "كلمات قوية مع Present Simple:",
    blocks: [
      { type: "signalSimple" },
      { type: "sentence", parts: [P("Jana", "s"), P("often", "adv"), P("visits", "v"), P("the art museum", "o")], ar: "جانا غالبًا تزور متحف الفن." },
      { type: "sentence", parts: [P("My cousins", "s"), P("never", "adv"), P("eat", "v"), P("breakfast late", "o")], ar: "أبناء عمي لا يتناولون الفطور متأخرًا أبدًا." },
      { type: "sentence", parts: [P("The train", "s"), P("leaves", "v"), P("at 7:30", "adv"), P("every morning", "adv")], ar: "القطار يغادر الساعة 7:30 كل صباح." },
    ],
  },

  {
    kind: "lesson",
    section: E,
    mascot: "⏰",
    step: "⑨",
    title: "كلمات قوية مع Present Continuous",
    blocks: [
      { type: "signalContinuous" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("organizing", "v"), P("my desk", "o"), P("at the moment", "adv")], ar: "أنا أرتب مكتبي في هذه اللحظة." },
      { type: "sentence", parts: [P("My sister", "s"), P("is", "be"), P("taking", "v"), P("extra English classes", "o"), P("this month", "adv")], ar: "أختي تأخذ حصص إنجليزية إضافية هذا الشهر." },
      { type: "sentence", parts: [P("Prices", "s"), P("are", "be"), P("changing", "v"), P("these days", "adv")], ar: "الأسعار تتغير هذه الأيام." },
    ],
  },

  {
    kind: "lesson",
    section: F,
    mascot: "⚖️",
    step: "⑩",
    title: "الفرق بين عادة مؤقتة ووضع مستقر",
    blocks: [
      { type: "temporaryCompare" },
      { type: "sentence", parts: [P("Adam", "s"), P("works", "v"), P("at a bakery", "o")], ar: "هذا عمله — وضع عام ومستقر.", note: "Simple → عام" },
      { type: "sentence", parts: [P("Adam", "s"), P("is", "be"), P("working", "v"), P("at a bakery", "o"), P("this summer", "adv")], ar: "هو يعمل في المخبز هذا الصيف — قد يكون مؤقتًا.", note: "Continuous → مؤقت" },
      { type: "note", emoji: "⭐", text: "[[Simple]] → الوضع العام — [[Continuous]] → الوضع المؤقت" },
    ],
  },

  {
    kind: "lesson",
    section: F,
    mascot: "🔥",
    step: "⑪",
    title: "مثال أقوى",
    blocks: [
      { type: "livingCompare" },
      { type: "sentence", parts: [P("My sister", "s"), P("lives", "v"), P("in London", "o")], ar: "هذا وضع مستقر.", note: "Simple" },
      { type: "sentence", parts: [P("My sister", "s"), P("is", "be"), P("living", "v"), P("with her friend", "o"), P("this month", "adv")], ar: "هذا وضع مؤقت — تقيم مع صديقتها هذا الشهر.", note: "Continuous — المعنى تغير" },
    ],
  },

  {
    kind: "lesson",
    section: F,
    mascot: "📅",
    step: "⑫",
    title: "\"هذه الأيام\" ليست بالضرورة \"هذه الثانية\"",
    blocks: [
      { type: "theseDays" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("learning", "v"), P("Spanish", "o"), P("these days", "adv")], ar: "أنا أتعلم الإسبانية هذه الأيام." },
      { type: "text", text: "هل أنا أتعلم الإسبانية في كل ثانية؟ طبعًا لا. قد أدرس ساعة واحدة يوميًا. لكن التعلم هو نشاط يحدث خلال هذه الفترة. لذلك: Present Continuous." },
    ],
  },

  {
    kind: "lesson",
    section: G,
    mascot: "📍",
    step: "⑬",
    title: "مكان كلمات التكرار",
    blocks: [
      { type: "frequencyPlace" },
      { type: "text", text: "مع الأفعال العادية:" },
      { type: "sentence", parts: [P("I", "s"), P("usually", "adv"), P("read", "v"), P("before bed", "o")], ar: "أنا عادةً أقرأ قبل النوم." },
      { type: "sentence", parts: [P("She", "s"), P("often", "adv"), P("visits", "v"), P("her aunt", "o")], ar: "هي غالبًا تزور عمتها." },
      { type: "sentence", parts: [P("They", "s"), P("sometimes", "adv"), P("play", "v"), P("chess", "o")], ar: "هم أحيانًا يلعبون الشطرنج." },
      { type: "sentence", parts: [P("He", "s"), P("never", "adv"), P("eats", "v"), P("spicy food", "o")], ar: "هو لا يأكل الطعام الحار أبدًا." },
      { type: "text", text: "لاحظ: usually / often / sometimes / never تأتي غالبًا قبل الفعل الرئيسي. لكن مع verb to be:" },
      { type: "sentence", parts: [P("She", "s"), P("is", "be"), P("usually", "adv"), P("quiet", "o")], ar: "هي عادةً هادئة." },
      { type: "sentence", parts: [P("They", "s"), P("are", "be"), P("often", "adv"), P("late", "o")], ar: "هم غالبًا متأخرون." },
      { type: "sentence", parts: [P("He", "s"), P("is", "be"), P("never", "adv"), P("rude", "o")], ar: "هو ليس وقحًا أبدًا." },
      { type: "note", emoji: "⭐", text: "هذا فرق مهم: مع [[be]] تأتي كلمة التكرار بعد [[am/is/are]]." },
    ],
  },

  {
    kind: "lesson",
    section: G,
    mascot: "🎭",
    step: "⑭",
    title: "لا تخلط بين \"be\" و\"do\"",
    blocks: [
      { type: "beVsDo" },
      { type: "text", text: "لدينا نوعان مختلفان من الأسئلة:" },
      { type: "sentence", parts: [P("Does", "aux"), P("he", "s"), P("play", "v"), P("tennis", "o")], ar: "هل يلعب التنس؟ — Present Simple مع فعل عادي", q: true },
      { type: "sentence", parts: [P("Is", "be"), P("he", "s"), P("playing", "v"), P("tennis", "o")], ar: "هل يلعب التنس الآن؟ — Present Continuous", q: true },
      { type: "bad", en: "Does he playing tennis?", why: "لا نقول Does + playing ❌" },
      { type: "bad", en: "Is he play tennis?", why: "لا نقول Is + play ❌" },
      { type: "ok", en: "Does he play tennis?", ar: "الصحيح ✅ — Present Simple" },
      { type: "ok", en: "Is he playing tennis?", ar: "الصحيح ✅ — Present Continuous" },
    ],
  },

  {
    kind: "lesson",
    section: G,
    mascot: "🧩",
    step: "⑮",
    title: "مقارنة كاملة في جدول ذهني",
    blocks: [
      { type: "mentalTable" },
      { type: "text", text: "Present Simple:" },
      { type: "sentence", parts: [P("He", "s"), P("plays", "v")], ar: "هو يلعب." },
      { type: "sentence", parts: [P("He", "s"), P("doesn't", "nt"), P("play", "v")], ar: "هو لا يلعب." },
      { type: "sentence", parts: [P("Does", "aux"), P("he", "s"), P("play", "v")], ar: "هل يلعب؟", q: true },
      { type: "sentence", parts: [P("Yes,", "adv"), P("he", "s"), P("does", "aux")], ar: "نعم." },
      { type: "text", text: "Present Continuous:" },
      { type: "sentence", parts: [P("He", "s"), P("is", "be"), P("playing", "v")], ar: "هو يلعب الآن." },
      { type: "sentence", parts: [P("He", "s"), P("isn't", "be"), P("playing", "v")], ar: "هو لا يلعب الآن." },
      { type: "sentence", parts: [P("Is", "be"), P("he", "s"), P("playing", "v")], ar: "هل يلعب الآن؟", q: true },
      { type: "sentence", parts: [P("Yes,", "adv"), P("he", "s"), P("is", "be")], ar: "نعم." },
      { type: "note", emoji: "⭐", text: "لاحظ الفرق: [[does]] → Present Simple — [[is]] → Present Continuous" },
    ],
  },

  {
    kind: "lesson",
    section: G,
    mascot: "🚨",
    step: "⑯",
    title: "خطأ خطير جدًا",
    blocks: [
      { type: "dangerousError" },
      { type: "bad", en: "He is plays football.", why: "خلطنا النظامين — is + plays ❌" },
      { type: "text", text: "لماذا؟ لأننا خلطنا النظامين." },
      { type: "ok", en: "He plays football.", ar: "إما هذه ✅" },
      { type: "ok", en: "He is playing football.", ar: "أو هذه ✅" },
      { type: "bad", en: "is + plays", why: "لا نخلط ❌" },
      { type: "bad", en: "does + playing", why: "لا نخلط ❌" },
    ],
  },

  {
    kind: "lesson",
    section: G,
    mascot: "⚠️",
    step: "⑰",
    title: "الأفعال التي تحتاج انتباهًا",
    blocks: [
      { type: "stativeGrid" },
      { type: "text", text: "بعض الأفعال تعبّر عن حالة أو معرفة أو شعور، وغالبًا نستخدمها مع Present Simple بدل Continuous. مثل: know = يعرف — understand = يفهم — believe = يعتقد — want = يريد — need = يحتاج — like = يحب — love = يحب — hate = يكره — remember = يتذكر" },
      { type: "ok", en: "I know the answer.", ar: "أنا أعرف الإجابة ✅" },
      { type: "bad", en: "I am knowing the answer.", why: "لا نستخدم know مع Continuous ❌" },
      { type: "ok", en: "She likes this song.", ar: "هي تحب هذه الأغنية ✅" },
      { type: "bad", en: "She is liking this song.", why: "like فعل حالة ❌" },
      { type: "ok", en: "We understand the rule.", ar: "نحن نفهم القاعدة ✅" },
      { type: "bad", en: "We are understanding the rule.", why: "understand فعل حالة ❌" },
      { type: "note", emoji: "🧠", text: "لا تحفظ القائمة كلها الآن كأنها قوانين منفصلة؛ سنعود إليها لاحقًا بتوسع." },
    ],
  },

  {
    kind: "lesson",
    section: G,
    mascot: "🧠",
    step: "⑱",
    title: "لكن بعض الأفعال يمكن أن يتغير معناها",
    blocks: [
      { type: "thinkCompare" },
      { type: "sentence", parts: [P("I", "s"), P("think", "v"), P("this movie is great", "o")], ar: "أنا أعتقد أن هذا الفيلم رائع.", note: "think هنا = رأي" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("thinking", "v"), P("about my future", "o")], ar: "أنا أفكر في مستقبلي.", note: "thinking هنا = عملية تفكير تحدث حاليًا" },
      { type: "note", emoji: "💡", text: "إذن لا نحفظ: [[think = Simple دائمًا]] بل نفهم المعنى." },
    ],
  },

  {
    kind: "lesson",
    section: G,
    mascot: "💡",
    step: "⑲",
    title: "مثال آخر ذكي جدًا",
    blocks: [
      { type: "haveCompare" },
      { type: "sentence", parts: [P("I", "s"), P("have", "v"), P("a car", "o")], ar: "لدي سيارة.", note: "have = امتلاك → Present Simple" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("having", "v"), P("lunch", "o")], ar: "أنا أتناول الغداء.", note: "have = نشاط → Continuous" },
      { type: "note", emoji: "🧠", text: "هذه أمثلة متقدمة جدًا، وسنحتاجها عندما نتوسع في الأزمنة." },
    ],
  },

  // ---------------- التمارين ----------------
  {
    kind: "ex",
    section: H,
    mascot: "✏️",
    badge: "المستوى 1",
    title: "اختر الزمن",
    subtitle: "Present Simple أم Present Continuous؟",
    ex: {
      type: "chooseTense",
      items: [
        { stem: "Every morning, Salma _______ her bicycle.", ar: "كل صباح — عادة", opts: ["checks", "is checking"], answer: 0 },
        { stem: "Look! Salma _______ her bicycle.", ar: "انظر! الآن", opts: ["checks", "is checking"], answer: 1 },
        { stem: "My parents _______ in a quiet neighborhood.", ar: "حقيقة / وضع مستقر", opts: ["live", "are living"], answer: 0 },
        { stem: "This month, my parents _______ in a hotel.", ar: "هذا الشهر — مؤقت", opts: ["live", "are living"], answer: 1 },
        { stem: "The Earth _______ around the Sun.", ar: "حقيقة عامة", opts: ["moves", "is moving"], answer: 0 },
        { stem: "Listen! Someone _______ the piano.", ar: "استمع! الآن", opts: ["plays", "is playing"], answer: 1 },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "📝",
    badge: "المستوى 2",
    title: "اختر الشكل الصحيح",
    subtitle: "انتبه للفاعل والإشارة الزمنية",
    ex: {
      type: "chooseForm",
      items: [
        { stem: "He _______ coffee every morning.", ar: "كل صباح — عادة", opts: ["drink", "drinks", "is drinking"], answer: 1 },
        { stem: "He _______ coffee right now.", ar: "الآن تمامًا", opts: ["drinks", "is drinking", "drink"], answer: 1 },
        { stem: "They _______ their homework every evening.", ar: "كل مساء", opts: ["do", "does", "are doing"], answer: 0 },
        { stem: "They _______ their homework at the moment.", ar: "في هذه اللحظة", opts: ["do", "does", "are doing"], answer: 2 },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "✍️",
    badge: "المستوى 3",
    title: "أكمل الجملة",
    subtitle: "استخدم الفعل بين قوسين",
    ex: {
      type: "fill",
      items: [
        { stem: "I _______ _______ a new book now.", ar: "الآن", hint: "read", answer: "am reading" },
        { stem: "My brother usually _______ his room on Fridays.", ar: "عادةً أيام الجمعة", hint: "clean", answer: "cleans" },
        { stem: "We _______ _______ for the bus at the moment.", ar: "في هذه اللحظة", hint: "wait", answer: "are waiting" },
        { stem: "Sara often _______ pictures of animals.", ar: "غالبًا", hint: "draw", answer: "draws" },
        { stem: "They _______ _______ for a competition this week.", ar: "هذا الأسبوع — مؤقت", hint: "practice", answer: "are practicing" },
        { stem: "The baby _______ every night.", ar: "كل ليلة — عادة", hint: "cry", answer: "cries" },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "🚫",
    badge: "المستوى 4",
    title: "حوّل إلى النفي",
    subtitle: "Present Simple → don't/doesn't — Continuous → am/is/are + not",
    ex: {
      type: "negTransform",
      items: [
        { aff: "He plays the drums every evening.", neg: "He doesn't play the drums every evening." },
        { aff: "She is painting a landscape.", neg: "She isn't painting a landscape. / She is not painting a landscape." },
        { aff: "They visit the museum every month.", neg: "They don't visit the museum every month." },
        { aff: "We are preparing dinner.", neg: "We aren't preparing dinner. / We are not preparing dinner." },
        { aff: "Omar watches documentaries on Fridays.", neg: "Omar doesn't watch documentaries on Fridays." },
        { aff: "The students are working quietly.", neg: "The students aren't working quietly." },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "❓",
    badge: "المستوى 5",
    title: "حوّل إلى سؤال",
    subtitle: "Present Simple → Do/Does — Continuous → Am/Is/Are",
    ex: {
      type: "qTransform",
      items: [
        { aff: "She studies French.", q: "Does she study French?" },
        { aff: "They are studying French.", q: "Are they studying French?" },
        { aff: "He repairs computers.", q: "Does he repair computers?" },
        { aff: "He is repairing a computer.", q: "Is he repairing a computer?" },
        { aff: "Your sister watches movies.", q: "Does your sister watch movies?" },
        { aff: "Your sister is watching a movie.", q: "Is your sister watching a movie?" },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "🔥",
    badge: "المستوى 6",
    title: "السؤال الأصعب — اختر ثم اشرح السبب",
    subtitle: "المعنى هو الحكم",
    ex: {
      type: "tenseExplain",
      items: [
        { en: "My uncle _______ in a hospital. ① works ② is working — المعنى: هذا هو عمله.", ar: "هذا هو عمله — وضع مستقر", opts: ["works", "is working"], answer: 0, explain: "وضع مستقر/عمل دائم → Present Simple: works" },
        { en: "My uncle _______ from home this week. ① works ② is working — المعنى: وضع مؤقت.", ar: "وضع مؤقت هذا الأسبوع", opts: ["works", "is working"], answer: 1, explain: "وضع مؤقت this week → Present Continuous: is working" },
        { en: "Lina _______ her grandmother every Friday.", ar: "كل جمعة — عادة", opts: ["visits", "is visiting"], answer: 0, explain: "every Friday عادة متكررة → Simple: visits" },
        { en: "Lina _______ her grandmother now.", ar: "الآن", opts: ["visits", "is visiting"], answer: 1, explain: "now يحدث الآن → Continuous: is visiting" },
        { en: "We _______ English this year.", ar: "هذا العام — فترة حالية", opts: ["learn", "are learning"], answer: 1, explain: "this year فترة حالية/مؤقتة → are learning" },
        { en: "We _______ English at school every year.", ar: "كل سنة في المدرسة — عادة", opts: ["learn", "are learning"], answer: 0, explain: "every year عادة متكررة → learn" },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "🩹",
    badge: "المستوى 7",
    title: "اكتشف الخطأ المركب",
    subtitle: "صحح كل جملة واشرح السبب",
    ex: {
      type: "fix",
      items: [
        { wrong: "He is plays tennis now.", correct: "He is playing tennis now. / He plays tennis now.", why: "خلط النظامين — is + plays ❌ → is playing ✅ أو plays ✅" },
        { wrong: "She doesn't studying today.", correct: "She isn't studying today. / She doesn't study today.", why: "doesn't + studying ❌ — نحتاج isn't studying أو doesn't study" },
        { wrong: "Does they usually walk home?", correct: "Do they usually walk home?", why: "they جمع → Do وليس Does" },
        { wrong: "I am usually drink tea in the morning.", correct: "I usually drink tea in the morning.", why: "usually مع Simple — لا نقول am usually drink" },
        { wrong: "My brother is knowing the answer.", correct: "My brother knows the answer.", why: "know فعل حالة لا يُستخدم مع Continuous" },
        { wrong: "Look! The children run in the garden.", correct: "Look! The children are running in the garden.", why: "Look! يدل على الآن → are running" },
        { wrong: "They are visit their grandparents every Sunday.", correct: "They visit their grandparents every Sunday.", why: "every Sunday عادة → Simple visit وليس are visit" },
        { wrong: "Does she working this week?", correct: "Is she working this week?", why: "مع Continuous نستخدم Is وليس Does" },
      ],
    },
  },
  {
    kind: "ex",
    section: I,
    mascot: "🔥",
    badge: "المستوى 8 · IQ200",
    title: "تحدي IQ200",
    subtitle: "8 تحديات متقدمة",
    ex: {
      type: "iq",
      items: [
        { kind: "mcq", q: "My brother usually _______ glasses, but today he _______ contact lenses. ① wears / is wearing ② is wearing / wears ③ wears / wears", opts: ["① wears / is wearing — عادة vs اليوم مؤقت", "② is wearing / wears", "③ wears / wears"], answer: 0, why: "usually → Simple wears، today مؤقت → is wearing" },
        { kind: "mcq", q: "Sarah _______ with us this month. ① stays ② is staying — لماذا؟", opts: ["② is staying — this month وضع مؤقت", "① stays — عادة"], answer: 0, why: "this month يدل على وضع مؤقت → is staying" },
        { kind: "mcq", q: "أي جملة تصف عادة؟ ① I am checking my email now. ② I check my email every morning.", opts: ["② I check my email every morning. — عادة", "① I am checking my email now. — الآن"], answer: 0, why: "every morning عادة → Simple" },
        { kind: "mcq", q: "أي جملة تصف وضعًا مؤقتًا؟ ① Daniel works in a restaurant. ② Daniel is working in a restaurant this summer.", opts: ["② Daniel is working in a restaurant this summer. — مؤقت this summer", "① Daniel works in a restaurant. — وضع مستقر"], answer: 0, why: "this summer مؤقت → is working" },
        { kind: "correct", q: "صحح: Why does he running so fast?", wrong: "Why does he running so fast?", correct: "Why is he running so fast?", why: "مع Continuous: Is + subject + verb-ing، لا Does + verb-ing" },
        { kind: "correct", q: "صحح: She doesn't usually goes to the gym.", wrong: "She doesn't usually goes to the gym.", correct: "She doesn't usually go to the gym.", why: "بعد doesn't الفعل أساسي دائمًا — go وليس goes" },
        { kind: "text", q: "صحح: They are usually watching TV after dinner. إذا كان المقصود عادة متكررة، ما الجملة الأفضل؟", a: "They usually watch TV after dinner. — عادة متكررة → Present Simple، usually قبل الفعل، بدون are" },
        { kind: "mcq", q: "اختر: I _______ what you mean. ① understand ② am understanding — ولماذا؟", opts: ["① understand — understand فعل حالة لا يُستخدم مع Continuous", "② am understanding"], answer: 0, why: "understand من أفعال الفهم/الحالة → Simple" },
      ],
    },
  },

  { kind: "detective", section: I, mascot: "🕵️", title: "المستوى 9 — Grammar Detective" },

  {
    kind: "ex",
    section: I,
    mascot: "🏆",
    badge: "المستوى 10",
    title: "تحدي التحويل الكامل",
    subtitle: "من جملة واحدة ← أربع صيغ — انتبه للفرق بين does و is",
    ex: { type: "transformChallenge", items: [] },
  },

  {
    kind: "ex",
    section: I,
    mascot: "👑",
    badge: "المستوى 11 · IQ200 النهائي",
    title: "IQ200 النهائي — حلل الموقف",
    subtitle: "اقرأ الموقف ثم أجب بدون تخمين",
    ex: { type: "finalDetective", items: [] },
  },

  {
    kind: "ex",
    section: J,
    mascot: "🧪",
    badge: "الاختبار الشامل",
    title: "الاختبار الشامل للدرس 11",
    subtitle: "بدون النظر إلى القواعد، حاول الحل",
    ex: { type: "comprehensive", items: [] },
  },

  { kind: "summary", section: J, mascot: "🧠", title: "ملخص الدرس الكامل" },
  { kind: "quiz", section: J, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: J, mascot: "🎓", title: "الخاتمة" },
];

export const GRAMMAR_DETECTIVE_PASSAGE =
  "Emma usually spends her weekends at home, but this weekend she is visiting her cousins. She often helps her grandmother in the garden, but today she is helping her uncle repair an old bicycle. Her cousins usually play video games after lunch, but right now they are preparing a picnic.";

export const GRAMMAR_DETECTIVE_Q: { q: string; a: string }[] = [
  { q: "استخرج جميع أفعال Present Simple.", a: "spends · helps · play (usually spends · often helps · usually play)" },
  { q: "استخرج جميع أفعال Present Continuous.", a: "is visiting · is helping · are preparing" },
  { q: "لماذا spends تأخذ s؟", a: "لأن الفاعل Emma = She — الغائب المفرد يأخذ s/es/ies." },
  { q: "لماذا is visiting؟", a: "لأن this weekend وضع مؤقت/يحدث الآن → Present Continuous." },
  { q: "ما العبارة التي تدل على العادة؟", a: "usually · often · usually — تدل على العادة/التكرار" },
  { q: "ما العبارة التي تدل على الوقت الحالي؟", a: "this weekend · today · right now — تدل على الآن/المؤقت" },
  { q: "لماذا نقول they are preparing؟", a: "لأن الفاعل They جمع → are + verb-ing، والحدث يحدث الآن (right now)." },
  { q: "لماذا لا نقول they prepare إذا كان النشاط يحدث الآن؟", a: "لأن they prepare = Present Simple (عادة)، لكن الحدث يحدث الآن → نحتاج Continuous are preparing." },
  { q: "اشرح الفرق بين usually play و are preparing", a: "usually play = عادة متكررة → Simple (play بدون are). are preparing = يحدث الآن (right now) → Continuous." },
];

export const FINAL_CHALLENGE_TOM = {
  base: "Tom usually rides his bike to school.",
  steps: [
    { label: "الجملة الأساسية (عادة)", en: "Tom usually rides his bike to school.", ar: "عادة — Present Simple" },
    { label: "حوّلها إلى الآن", en: "Tom is riding his bike to school now.", ar: "الآن — Present Continuous" },
    { label: "النفي", en: "Tom isn't riding his bike to school now.", ar: "النفي: isn't + verb-ing" },
    { label: "السؤال", en: "Is Tom riding his bike to school now?", ar: "السؤال: Is + subject + verb-ing?" },
    { label: "Yes", en: "Yes, he is.", ar: "نعم — نستخدم is" },
    { label: "No", en: "No, he isn't.", ar: "لا — isn't" },
    { label: "انتبه", en: "Does he ride? vs Is he riding?", ar: "does للـ Simple — is للـ Continuous" },
  ],
};

export const FINAL_IQ_PASSAGE =
  "Alex normally studies at the library. This week, however, he is studying at home because the library is closed. He usually drinks juice while he studies, but today he is drinking hot chocolate. His sister often helps him with difficult exercises, and she is helping him right now.";

export const FINAL_IQ_Q: { q: string; a: string }[] = [
  { q: "لماذا studies؟", a: "لأن normally عادة + He → studies + s — Present Simple." },
  { q: "لماذا is studying؟", a: "لأن This week وضع مؤقت — Present Continuous." },
  { q: "لماذا drinks؟", a: "لأن usually عادة + He → drinks — Simple." },
  { q: "لماذا is drinking؟", a: "لأن today الآن/مؤقت → is drinking — Continuous." },
  { q: "لماذا helps؟", a: "لأن often عادة + She → helps — Simple." },
  { q: "لماذا is helping؟", a: "لأن right now الآن → is helping — Continuous." },
  { q: "استخرج الكلمات التي تشير إلى العادة.", a: "normally · usually · often" },
  { q: "استخرج الكلمات التي تشير إلى الوضع الحالي.", a: "This week · today · right now" },
  { q: "أي جملة تصف وضعًا مؤقتًا؟", a: "He is studying at home this week. / He is drinking hot chocolate today. / She is helping him right now." },
  { q: "أي جملة تصف عادة؟", a: "Alex normally studies at the library. / He usually drinks juice. / His sister often helps him." },
];

export const COMPREHENSIVE = {
  A: [
    { en: "The chef _______ a new recipe every week. ① creates ② is creating", opts: ["creates", "is creating"], answer: 0, ar: "كل أسبوع — عادة" },
    { en: "The chef _______ a new recipe right now. ① creates ② is creating", opts: ["creates", "is creating"], answer: 1, ar: "الآن تمامًا" },
    { en: "My friends _______ football on Saturdays. ① play ② are playing", opts: ["play", "are playing"], answer: 0, ar: "أيام السبت — عادة" },
    { en: "My friends _______ football at the moment. ① play ② are playing", opts: ["play", "are playing"], answer: 1, ar: "في هذه اللحظة" },
    { en: "I _______ the answer. ① know ② am knowing", opts: ["know", "am knowing"], answer: 0, ar: "فعل حالة" },
  ],
  B: [
    { wrong: "He doesn't plays tennis.", correct: "He doesn't play tennis.", why: "بعد doesn't الفعل أساسي" },
    { wrong: "Are she reading?", correct: "Is she reading?", why: "she مفرد → Is" },
    { wrong: "Does he working today?", correct: "Is he working today?", why: "مع Continuous نستخدم Is وليس Does" },
    { wrong: "We are usually eat dinner at 8.", correct: "We usually eat dinner at 8.", why: "usually مع Simple وليس are ... eat" },
    { wrong: "She is makeing a cake.", correct: "She is making a cake.", why: "make → making (احذف e)" },
  ],
  C: [
    { word: "usually", hint: "اكتب جملة عادة" },
    { word: "now", hint: "اكتب جملة الآن" },
    { word: "this week", hint: "اكتب جملة مؤقتة هذا الأسبوع" },
    { word: "never", hint: "اكتب جملة نفي عادة" },
    { word: "at the moment", hint: "اكتب جملة في هذه اللحظة" },
  ],
  D: {
    instruction: "اكتب جملتين عن نفس الشخص: الجملة الأولى: شيء يفعله عادة. الجملة الثانية: شيء يفعله الآن. ثم اشرح بالعربية لماذا استخدمت Present Simple في الأولى وPresent Continuous في الثانية.",
    example: "My sister usually reads before bed. / My sister is reading a novel now. — الأولى عادة مع usually → Simple. الثانية الآن مع now → Continuous.",
  },
};

export const SUMMARY = {
  simpleUses: ["العادات", "الروتين", "الحقائق", "الأشياء المتكررة", "الحالات المستقرة"],
  simpleForm: {
    pos: "I / You / We / They + base verb — He / She / It + s/es/ies",
    neg: "don't / doesn't + base verb",
    q: "Do / Does + subject + base verb?",
  },
  contUses: ["شيء يحدث الآن", "شيء يحدث هذه الفترة", "شيء مؤقت", "شيء يتغير حاليًا"],
  contForm: {
    pos: "Subject + am/is/are + verb-ing",
    neg: "am/is/are + not + verb-ing",
    q: "Am/Is/Are + subject + verb-ing?",
  },
  golden: "لا تبدأ بالسؤال: أي كلمة موجودة في الجملة؟ ابدأ بالسؤال: ما معنى الجملة؟ هل هو: عادة؟ → Present Simple — روتين؟ → Present Simple — حقيقة؟ → Present Simple — شيء مستقر؟ → Present Simple — يحدث الآن؟ → Present Continuous — يحدث هذه الفترة؟ → Present Continuous — مؤقت؟ → Present Continuous",
  next: "وإذا أتقنت هذا الفرق، فأنت أصبحت جاهزًا للخطوة التالية: النفي والأسئلة في الزمنين معًا بطريقة متقدمة، ثم الانتقال تدريجيًا إلى الماضي البسيط Past Simple دون أي قفزة مفاجئة.",
};
