// ============================================================
// الدرس 10 — Present Continuous — الاستخدامات المتقدمة والتحكم الكامل
// المصدر الكامل محفوظ حرفيًا — لا تلخيص ولا إعادة صياغة
// ============================================================

export type BeForm = "am" | "is" | "are";

export interface Subj10 {
  en: string;
  ar: string;
  be: BeForm;
}

export const SUBJ10: Subj10[] = [
  { en: "I", ar: "أنا", be: "am" },
  { en: "You", ar: "أنت", be: "are" },
  { en: "We", ar: "نحن", be: "are" },
  { en: "They", ar: "هم", be: "are" },
  { en: "He", ar: "هو", be: "is" },
  { en: "She", ar: "هي", be: "is" },
  { en: "It", ar: "هو / هي لغير العاقل", be: "is" },
  { en: "Mila", ar: "ميلا", be: "is" },
  { en: "Sara", ar: "سارة", be: "is" },
  { en: "Omar", ar: "عمر", be: "is" },
];

export type IngRule = "add" | "drop-e" | "double";

export interface Verb10 {
  base: string;
  ing: string;
  rule: IngRule;
  ar: string;
}

export const VERBS10: Verb10[] = [
  // أضف ing فقط
  { base: "play", ing: "playing", rule: "add", ar: "يلعب" },
  { base: "watch", ing: "watching", rule: "add", ar: "يشاهد" },
  { base: "read", ing: "reading", rule: "add", ar: "يقرأ" },
  { base: "talk", ing: "talking", rule: "add", ar: "يتحدث" },
  { base: "clean", ing: "cleaning", rule: "add", ar: "ينظف" },
  { base: "jump", ing: "jumping", rule: "add", ar: "يقفز" },
  { base: "visit", ing: "visiting", rule: "add", ar: "يزور" },
  { base: "draw", ing: "drawing", rule: "add", ar: "يرسم" },
  { base: "open", ing: "opening", rule: "add", ar: "يفتح" },
  { base: "stay", ing: "staying", rule: "add", ar: "يقيم" },
  { base: "work", ing: "working", rule: "add", ar: "يعمل" },
  { base: "live", ing: "living", rule: "add", ar: "يعيش" },
  { base: "prepare", ing: "preparing", rule: "drop-e", ar: "يُعد" },
  { base: "learn", ing: "learning", rule: "add", ar: "يتعلم" },
  // احذف e ثم أضف ing
  { base: "write", ing: "writing", rule: "drop-e", ar: "يكتب" },
  { base: "make", ing: "making", rule: "drop-e", ar: "يصنع" },
  { base: "dance", ing: "dancing", rule: "drop-e", ar: "يرقص" },
  { base: "drive", ing: "driving", rule: "drop-e", ar: "يقود" },
  { base: "close", ing: "closing", rule: "drop-e", ar: "يغلق" },
  { base: "take", ing: "taking", rule: "drop-e", ar: "يأخذ" },
  // ضاعف الحرف الأخير
  { base: "run", ing: "running", rule: "double", ar: "يركض" },
  { base: "sit", ing: "sitting", rule: "double", ar: "يجلس" },
  { base: "swim", ing: "swimming", rule: "double", ar: "يسبح" },
  { base: "stop", ing: "stopping", rule: "double", ar: "يتوقف" },
  { base: "get", ing: "getting", rule: "double", ar: "يحصل" },
  { base: "knock", ing: "knocking", rule: "add", ar: "يطرق" },
  // حالات خاصة
  { base: "see", ing: "seeing", rule: "add", ar: "يرى" },
  { base: "agree", ing: "agreeing", rule: "add", ar: "يوافق" },
  { base: "hear", ing: "hearing", rule: "add", ar: "يسمع" },
  { base: "spend", ing: "spending", rule: "add", ar: "يقضي" },
  { base: "study", ing: "studying", rule: "add", ar: "يدرس" },
];

export function ingOf(base: string): string {
  return VERBS10.find((v) => v.base === base)?.ing ?? base + "ing";
}

// -------------------- كلمات Present Continuous المتقدمة --------------------
export const ADV_SIGNALS: { en: string; ar: string }[] = [
  { en: "now", ar: "الآن" },
  { en: "right now", ar: "الآن تمامًا" },
  { en: "at the moment", ar: "في هذه اللحظة" },
  { en: "currently", ar: "حاليًا" },
  { en: "today", ar: "اليوم" },
  { en: "this week", ar: "هذا الأسبوع" },
  { en: "this month", ar: "هذا الشهر" },
  { en: "this year", ar: "هذه السنة" },
  { en: "these days", ar: "هذه الأيام" },
  { en: "Look!", ar: "انظر!" },
  { en: "Listen!", ar: "اسمع!" },
];

// -------------------- الأفعال الحالة (Stative) --------------------
export const STATIVE_VERBS: { en: string; ar: string }[] = [
  { en: "know", ar: "يعرف" },
  { en: "like", ar: "يحب" },
  { en: "love", ar: "يحب" },
  { en: "hate", ar: "يكره" },
  { en: "understand", ar: "يفهم" },
  { en: "want", ar: "يريد" },
  { en: "need", ar: "يحتاج" },
  { en: "believe", ar: "يعتقد" },
  { en: "remember", ar: "يتذكر" },
];

// -------------------- مشاهد متقدمة --------------------
export const ADV_SCENES: { subj: string; base: string; o?: string; ar: string; emoji: string }[] = [
  { subj: "Mila", base: "open", o: "the window", ar: "ميلا تفتح النافذة الآن.", emoji: "🪟" },
  { subj: "I", base: "read", o: "a book this week", ar: "أنا أقرأ كتابًا ممتعًا جدًا هذا الأسبوع.", emoji: "📖" },
  { subj: "Sara", base: "learn", o: "Japanese this year", ar: "سارة تتعلم اليابانية هذا العام.", emoji: "🇯🇵" },
  { subj: "He", base: "stay", o: "in Alexandria this week", ar: "هو يقيم في الإسكندرية هذا الأسبوع.", emoji: "🏖️" },
];

// -------------------- بلوكات --------------------
export type Role10 = "s" | "be" | "v" | "o" | "adv" | "nt" | "aux";

export interface Part10 {
  text: string;
  role: Role10;
}

export const ROLE10_AR: Record<Role10, string> = {
  s: "الفاعل",
  be: "am / is / are",
  v: "الفعل + ing",
  o: "المفعول به",
  adv: "الظرف",
  nt: "النفي",
  aux: "المساعد",
};

export type Block10 =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "sentence"; parts: Part10[]; ar: string; note?: string; q?: boolean }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "beTabs" }
  | { type: "beMnemonic" }
  | { type: "ingTabs" }
  | { type: "ingTrap" }
  | { type: "signalWords" }
  | { type: "placeWords" }
  | { type: "temporaryCompare" }
  | { type: "vsSimpleAdvanced" }
  | { type: "stativeGrid" }
  | { type: "thinkCompare" }
  | { type: "whQuestions" }
  | { type: "shortAnswers" }
  | { type: "periodNowCompare" };

export type Exercise10 =
  | { type: "chooseTense"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "amIsAreFill"; items: { stem: string; ar: string; verb: string; opts: string[]; answer: number }[] }
  | { type: "negTransform"; items: { aff: string; neg: string }[] }
  | { type: "qTransform"; items: { aff: string; q: string }[] }
  | { type: "whChoose"; items: { q: string; a: string; opts: string[]; answer: number }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why: string }[] }
  | { type: "tenseChooseExplain"; items: { en: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "iq"; items: IQ10Item[] }
  | { type: "detective" }
  | { type: "order"; items: { words: string[]; correct: string[]; ar: string; q?: boolean }[] };

export type IQ10Item =
  | { kind: "mcq"; q: string; opts: string[]; answer: number; why: string }
  | { kind: "text"; q: string; a: string }
  | { kind: "order"; words: string[]; correct: string[]; ar: string };

export type Slide10 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block10[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise10 }
  | { kind: "challenge"; title: string }
  | { kind: "detective"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const A = "البداية";
const B = "الاستخدامات";
const C = "الفروق الدقيقة";
const D = "الكلمات الدالة";
const E = "النفي والسؤال";
const F = "القواعد";
const G = "الحالات الخاصة";
const H = "التمارين";
const I = "التحديات";
const J = "الخاتمة";

const P = (text: string, role: Role10): Part10 => ({ text, role });

export const SLIDES: Slide10[] = [
  { kind: "cover", section: A, mascot: "📘" },
  { kind: "objectives", section: A, mascot: "🎯" },

  {
    kind: "lesson",
    section: B,
    mascot: "💡",
    step: "1",
    title: "الاستخدام الأول: شيء يحدث الآن",
    lead: "هذا هو الاستخدام الأساسي الذي تعلمناه — حدث تراه أمامك يحدث في هذه اللحظة.",
    blocks: [
      { type: "sentence", parts: [P("Mila", "s"), P("is", "be"), P("opening", "v"), P("the window", "o")], ar: "ميلا تفتح النافذة الآن." },
      { type: "sentence", parts: [P("The children", "s"), P("are", "be"), P("drawing", "v"), P("dinosaurs", "o")], ar: "الأطفال يرسمون الديناصورات الآن." },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("talking", "v"), P("to my teacher", "o")], ar: "أنا أتحدث مع معلمي الآن." },
      { type: "note", emoji: "🧠", text: "اسأل: [[هل أستطيع أن أتخيل الحدث يحدث أمامي الآن؟]] إذا نعم، فـ [[Present Continuous]] احتمال قوي جدًا." },
    ],
  },
  {
    kind: "lesson",
    section: B,
    mascot: "📅",
    step: "2",
    title: "الاستخدام الثاني: شيء يحدث هذه الفترة",
    lead: "وهنا تبدأ الصعوبة الحقيقية — Present Continuous لا يعني دائمًا \"في هذه الثانية\".",
    blocks: [
      { type: "text", text: "يمكن أن نستخدمه لشيء يحدث خلال هذه الفترة، حتى لو لم يكن يحدث في اللحظة التي نتكلم فيها." },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("reading", "v"), P("a very interesting book", "o"), P("this week", "adv")], ar: "أنا أقرأ كتابًا ممتعًا جدًا هذا الأسبوع." },
      { type: "note", emoji: "📌", text: "ليس من الضروري أن تكون ممسكًا بالكتاب في هذه اللحظة. المعنى: [[هذه الأيام أنا مشغول بقراءة هذا الكتاب.]]" },
      { type: "sentence", parts: [P("Sara", "s"), P("is", "be"), P("learning", "v"), P("Japanese", "o"), P("this year", "adv")], ar: "سارة تتعلم اليابانية هذا العام." },
      { type: "note", emoji: "📌", text: "هي ليست بالضرورة تدرس اليابانية في هذه اللحظة. لكنها تمر حاليًا بفترة تعلم اللغة اليابانية." },
      { type: "note", emoji: "⭐", text: "إذن: [[Present Continuous]] يمكن أن يعني: [[\"يحدث الآن\"]] أو: [[\"يحدث خلال هذه الفترة الحالية\"]]" },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "⚖️",
    step: "3",
    title: "الفرق بين الآن وهذه الفترة",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("eating", "v"), P("lunch", "o"), P("now", "adv")], ar: "أنا أتناول الغداء الآن.", note: "يحدث في هذه اللحظة" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("taking", "v"), P("a photography course", "o"), P("this month", "adv")], ar: "أنا آخذ دورة تصوير هذا الشهر.", note: "خلال هذه الفترة" },
      { type: "note", emoji: "🧠", text: "هذه نقطة IQ مهمة: [[Present Continuous]] لا يعني دائمًا: [[\"في هذه الثانية\"]] بل يمكن أن يعني: [[\"هذه الأيام / هذه الفترة / حاليًا\"]]." },
      { type: "periodNowCompare" },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "⏳",
    step: "4",
    title: "استخدام مهم: شيء مؤقت",
    lead: "Present Continuous يستخدم أيضًا للأشياء المؤقتة — قارن مع العادة المستقرة:",
    blocks: [
      { type: "sentence", parts: [P("Nabil", "s"), P("usually lives", "v"), P("in Cairo", "o")], ar: "نبيل يعيش عادةً في القاهرة،" },
      { type: "sentence", parts: [P("he", "s"), P("is", "be"), P("staying", "v"), P("in Alexandria", "o"), P("this week", "adv")], ar: "لكنه يقيم في الإسكندرية هذا الأسبوع." },
      {
        type: "note",
        emoji: "🔍",
        text: "[[usually lives]] → عادة · [[is staying]] → وضع مؤقت حاليًا — وهذا مثال ممتاز على الفرق بين الزمنين.",
      },
      { type: "sentence", parts: [P("My aunt", "s"), P("works", "v"), P("in a hospital", "o")], ar: "عمتي تعمل في مستشفى،" },
      { type: "sentence", parts: [P("she", "s"), P("is", "be"), P("working", "v"), P("from home", "o"), P("this week", "adv")], ar: "لكنها تعمل من المنزل هذا الأسبوع." },
      { type: "note", emoji: "🔍", text: "[[work]] → حقيقة / وضع عام · [[is working]] → وضع مؤقت هذه الفترة" },
      { type: "temporaryCompare" },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "🆚",
    step: "5",
    title: "Present Simple vs Present Continuous",
    lead: "هذه أهم مقارنة في الدرس — احفظها كقاعدة ذهبية:",
    blocks: [
      { type: "vsSimpleAdvanced" },
      { type: "sentence", parts: [P("Omar", "s"), P("rides", "v"), P("his bicycle", "o"), P("to school", "adv"), P("every day", "adv")], ar: "عمر يركب دراجته إلى المدرسة كل يوم.", note: "روتين" },
      { type: "sentence", parts: [P("Omar", "s"), P("is", "be"), P("riding", "v"), P("the bus", "o"), P("this week", "adv")], ar: "عمر يركب الحافلة هذا الأسبوع.", note: "وضع مؤقت" },
      { type: "note", emoji: "💡", text: "[[Present Simple]]: عادة / روتين / حقيقة / شيء متكرر / شيء مستقر · [[Present Continuous]]: شيء يحدث الآن / شيء يحدث هذه الفترة / شيء مؤقت" },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "🧠",
    step: "6",
    title: "مثال ذكي جدًا 🧠",
    blocks: [
      { type: "sentence", parts: [P("My brother", "s"), P("plays", "v"), P("the piano", "o")], ar: "أخي يعزف البيانو.", note: "معلومة عامة" },
      { type: "text", text: "يعني: أخي يعزف البيانو. هذه معلومة عامة عن أخيك." },
      { type: "sentence", parts: [P("My brother", "s"), P("is", "be"), P("playing", "v"), P("the piano", "o")], ar: "أخي يعزف البيانو الآن.", note: "يحدث الآن" },
      { type: "note", emoji: "🔥", text: "لاحظ أن تغييرًا صغيرًا جدًا غيّر معنى الجملة. [[plays]] → عادة / قدرة / نشاط عام · [[is playing]] → يحدث الآن" },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "🚨",
    step: "7",
    title: "لا تعتمد على كلمة واحدة فقط!",
    lead: "هذه مهارة مهمة جدًا — الكلمة الدالة تساعدك، لكنها ليست دائمًا كافية. اقرأ المعنى كاملًا.",
    blocks: [
      { type: "sentence", parts: [P("Today", "adv"), P("is", "be"), P("Monday", "o")], ar: "اليوم يوم الاثنين." },
      { type: "note", emoji: "⚠️", text: "هذه ليست [[Present Continuous]] أصلًا — رغم وجود [[today]]." },
      { type: "sentence", parts: [P("I", "s"), P("study", "v"), P("English", "o"), P("every day", "adv")], ar: "أنا أدرس الإنجليزية كل يوم.", note: "Present Simple" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("studying", "v"), P("English", "o"), P("today", "adv")], ar: "أنا أدرس الإنجليزية اليوم.", note: "Present Continuous — نشاط خلال اليوم الحالي" },
      { type: "note", emoji: "⭐", text: "القاعدة: [[الكلمة الدالة تساعدك، لكنها ليست دائمًا كافية. اقرأ المعنى كاملًا.]]" },
    ],
  },

  {
    kind: "lesson",
    section: D,
    mascot: "🔑",
    step: "8",
    title: "كلمات مهمة مع Present Continuous",
    blocks: [
      { type: "signalWords" },
      { type: "sentence", parts: [P("We", "s"), P("are", "be"), P("preparing", "v"), P("for the competition", "o"), P("this week", "adv")], ar: "نحن نستعد للمسابقة هذا الأسبوع." },
      { type: "sentence", parts: [P("My cousin", "s"), P("is", "be"), P("staying", "v"), P("with us", "o"), P("these days", "adv")], ar: "ابن عمي يقيم معنا هذه الأيام." },
    ],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "📍",
    step: "9",
    title: "مكان الكلمات داخل الجملة",
    blocks: [
      { type: "placeWords" },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("doing", "v"), P("my homework", "o"), P("now", "adv")], ar: "أنا أحل واجبي الآن.", note: "غالبًا في النهاية" },
      { type: "sentence", parts: [P("Now", "adv"), P("I", "s"), P("am", "be"), P("doing", "v"), P("my homework", "o")], ar: "الآن أنا أحل واجبي.", note: "يمكن في البداية — كلاهما ممكن" },
      { type: "sentence", parts: [P("She", "s"), P("is", "be"), P("currently", "adv"), P("working", "v"), P("on a project", "o")], ar: "هي تعمل حاليًا على مشروع." },
      { type: "sentence", parts: [P("They", "s"), P("are", "be"), P("practicing", "v"), P("for the show", "o"), P("this week", "adv")], ar: "هم يتدربون للعرض هذا الأسبوع." },
      { type: "sentence", parts: [P("He", "s"), P("is", "be"), P("spending", "v"), P("more time", "o"), P("with his family", "o"), P("these days", "adv")], ar: "هو يقضي وقتًا أطول مع عائلته هذه الأيام." },
    ],
  },

  {
    kind: "lesson",
    section: E,
    mascot: "🚫",
    step: "10",
    title: "النفي بالتفصيل",
    lead: "القاعدة: Subject + am/is/are + not + verb-ing",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("not", "nt"), P("sleeping", "v")], ar: "أنا لا أنام." },
      { type: "sentence", parts: [P("He", "s"), P("is", "be"), P("not", "nt"), P("studying", "v")], ar: "هو لا يدرس." },
      { type: "sentence", parts: [P("She", "s"), P("is", "be"), P("not", "nt"), P("driving", "v")], ar: "هي لا تقود." },
      { type: "sentence", parts: [P("We", "s"), P("are", "be"), P("not", "nt"), P("joking", "v")], ar: "نحن لا نمزح." },
      { type: "sentence", parts: [P("They", "s"), P("are", "be"), P("not", "nt"), P("waiting", "v")], ar: "هم لا ينتظرون." },
      { type: "note", emoji: "✂️", text: "الاختصارات: [[is not → isn't]] · [[are not → aren't]] · [[I am not → I'm not]]" },
      { type: "sentence", parts: [P("She", "s"), P("isn't", "be"), P("watching", "v"), P("television", "o")], ar: "هي لا تشاهد التلفاز." },
      { type: "sentence", parts: [P("They", "s"), P("aren't", "be"), P("playing", "v"), P("outside", "o")], ar: "هم لا يلعبون في الخارج." },
      { type: "sentence", parts: [P("I'm", "s"), P("not", "nt"), P("using", "v"), P("my phone", "o")], ar: "أنا لا أستخدم هاتفي." },
      { type: "note", emoji: "⭐", text: "لاحظ: لا نستخدم [[don't / doesn't]] هنا. نقول: [[He isn't running. ✅]] وليس: [[He doesn't running. ❌]]" },
    ],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "❓",
    step: "11",
    title: "السؤال بالتفصيل",
    lead: "نأخذ am / is / are ونضعها في البداية — نقلب:",
    blocks: [
      { type: "sentence", parts: [P("She", "s"), P("is", "be"), P("reading", "v")], ar: "هي تقرأ." },
      { type: "sentence", parts: [P("Is", "be"), P("she", "s"), P("reading", "v")], ar: "هل هي تقرأ؟", q: true },
      { type: "sentence", parts: [P("They", "s"), P("are", "be"), P("working", "v")], ar: "هم يعملون." },
      { type: "sentence", parts: [P("Are", "be"), P("they", "s"), P("working", "v")], ar: "هل هم يعملون؟", q: true },
      { type: "sentence", parts: [P("You", "s"), P("are", "be"), P("listening", "v")], ar: "أنت تستمع." },
      { type: "sentence", parts: [P("Are", "be"), P("you", "s"), P("listening", "v")], ar: "هل تستمع؟", q: true },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("disturbing", "v"), P("you", "o")], ar: "أنا أزعجك." },
      { type: "sentence", parts: [P("Am", "be"), P("I", "s"), P("disturbing", "v"), P("you", "o")], ar: "هل أزعجك؟", q: true },
      { type: "note", emoji: "⭐", text: "لا نستخدم [[Do]] أو [[Does]] مع [[Present Continuous]]. نقول: [[Is he sleeping? ✅]] وليس: [[Does he sleeping? ❌]]" },
    ],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "🔍",
    step: "12",
    title: "سؤال Yes / No وسؤال Wh-",
    blocks: [
      { type: "whQuestions" },
      { type: "sentence", parts: [P("What", "aux"), P("is", "be"), P("she", "s"), P("studying", "v")], ar: "ماذا تدرس؟" },
      { type: "sentence", parts: [P("Where", "aux"), P("is", "be"), P("he", "s"), P("going", "v")], ar: "إلى أين يذهب؟" },
      { type: "sentence", parts: [P("Why", "aux"), P("are", "be"), P("they", "s"), P("laughing", "v")], ar: "لماذا يضحكون؟" },
      { type: "sentence", parts: [P("Who", "aux"), P("is", "be"), P("calling", "v"), P("you", "o")], ar: "من يتصل بك؟" },
      { type: "sentence", parts: [P("What", "aux"), P("are", "be"), P("you", "s"), P("doing", "v")], ar: "ماذا تفعل؟" },
      { type: "note", emoji: "⭐", text: "القاعدة: [[Wh-word + am/is/are + subject + verb-ing?]]" },
      { type: "sentence", parts: [P("What", "aux"), P("are", "be"), P("you", "s"), P("reading", "v")], ar: "ماذا تقرأ؟", q: true },
      { type: "sentence", parts: [P("Where", "aux"), P("is", "be"), P("Ali", "s"), P("going", "v")], ar: "إلى أين يذهب علي؟", q: true },
      { type: "sentence", parts: [P("Why", "aux"), P("is", "be"), P("the baby", "s"), P("crying", "v")], ar: "لماذا يبكي الطفل؟", q: true },
      { type: "sentence", parts: [P("Who", "aux"), P("is", "be"), P("knocking", "v")], ar: "من يطرق الباب؟", q: true },
    ],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "💬",
    step: "13",
    title: "كيف نجيب؟",
    blocks: [
      { type: "sentence", parts: [P("What", "aux"), P("are", "be"), P("you", "s"), P("doing", "v")], ar: "ماذا تفعل؟", q: true },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("drawing", "v"), P("a map", "o")], ar: "أنا أرسم خريطة." },
      { type: "sentence", parts: [P("Where", "aux"), P("is", "be"), P("she", "s"), P("going", "v")], ar: "إلى أين تذهب؟", q: true },
      { type: "sentence", parts: [P("She", "s"), P("is", "be"), P("going", "v"), P("to the market", "o")], ar: "هي ذاهبة إلى السوق." },
      { type: "sentence", parts: [P("Why", "aux"), P("are", "be"), P("they", "s"), P("running", "v")], ar: "لماذا يركضون؟", q: true },
      { type: "sentence", parts: [P("They", "s"), P("are", "be"), P("running", "v"), P("because", "adv"), P("they are late", "o")], ar: "هم يركضون لأنهم متأخرون." },
      { type: "sentence", parts: [P("What", "aux"), P("is", "be"), P("he", "s"), P("making", "v")], ar: "ماذا يصنع؟", q: true },
      { type: "sentence", parts: [P("He", "s"), P("is", "be"), P("making", "v"), P("a model airplane", "o")], ar: "هو يصنع نموذج طائرة." },
      { type: "note", emoji: "💡", text: "لاحظ أن السؤال لا يحتاج دائمًا إلى [[Yes]] أو [[No]]." },
    ],
  },

  {
    kind: "lesson",
    section: F,
    mascot: "✍️",
    step: "14",
    title: "قواعد -ing بالتفصيل 🔍",
    lead: "الآن سنرتب قواعد الكتابة — ثلاث قواعد أساسية:",
    blocks: [
      { type: "note", emoji: "1️⃣", text: "[[القاعدة 1: معظم الأفعال]] — نضيف [[ing]]:" },
      { type: "sentence", parts: [P("read", "v"), P("→", "o"), P("reading", "v")], ar: "read → reading" },
      { type: "list", items: ["read → reading", "jump → jumping", "clean → cleaning", "visit → visiting", "talk → talking"] },
      { type: "note", emoji: "2️⃣", text: "[[القاعدة 2: الفعل المنتهي بـ e]] — غالبًا نحذف [[e]]:" },
      { type: "list", items: ["make → making", "write → writing", "drive → driving", "dance → dancing", "close → closing"] },
      { type: "bad", en: "makeing", why: "نحذف e: making ✅" },
      { type: "bad", en: "writeing", why: "نحذف e: writing ✅" },
      { type: "bad", en: "driveing", why: "نحذف e: driving ✅" },
      { type: "note", emoji: "3️⃣", text: "[[القاعدة 3: بعض الأفعال القصيرة]] — نضاعف الحرف الأخير:" },
      { type: "list", items: ["run → running", "sit → sitting", "swim → swimming", "get → getting", "stop → stopping"] },
      { type: "sentence", parts: [P("The bus", "s"), P("is", "be"), P("stopping", "v")], ar: "الحافلة تتوقف." },
      { type: "ingTabs" },
    ],
  },
  {
    kind: "lesson",
    section: F,
    mascot: "⚠️",
    step: "15",
    title: "فخ مهم جدًا: ليس كل فعل ينتهي بـ e",
    blocks: [
      { type: "text", text: "هناك أفعال لا نحذف منها [[e]] بالطريقة البسيطة التي تعلمناها." },
      { type: "sentence", parts: [P("see", "v"), P("→", "o"), P("seeing", "v")], ar: "see → seeing" },
      { type: "sentence", parts: [P("agree", "v"), P("→", "o"), P("agreeing", "v")], ar: "agree → agreeing" },
      { type: "bad", en: "seing", why: "الصحيح: seeing ✅" },
      { type: "note", emoji: "📌", text: "هنا لا نقول: [[seing ❌]] بل: [[seeing ✅]] — سنعود لهذه التفاصيل أكثر عندما ندرس [[spelling]] بشكل مستقل." },
      { type: "ingTrap" },
    ],
  },
  {
    kind: "lesson",
    section: G,
    mascot: "🚫",
    step: "16",
    title: "الأفعال التي لا نستخدمها عادةً مع Continuous",
    lead: "هذه نقطة متقدمة جدًا — هناك أفعال تعبّر عن المعرفة، المشاعر، الرأي، الامتلاك، الفهم — وغالبًا لا نستخدمها مع Present Continuous في الإنجليزية الأساسية.",
    blocks: [
      { type: "stativeGrid" },
      { type: "sentence", parts: [P("I", "s"), P("know", "v"), P("the answer", "o")], ar: "أنا أعرف الإجابة." },
      { type: "ok", en: "I know the answer.", ar: "صحيح ✅" },
      { type: "bad", en: "I am knowing the answer.", why: "لا نستخدم know مع Continuous" },
      { type: "sentence", parts: [P("She", "s"), P("likes", "v"), P("chocolate", "o")], ar: "هي تحب الشوكولا." },
      { type: "ok", en: "She likes chocolate.", ar: "صحيح ✅" },
      { type: "bad", en: "She is liking chocolate.", why: "like من أفعال المشاعر" },
      { type: "sentence", parts: [P("We", "s"), P("understand", "v"), P("the lesson", "o")], ar: "نحن نفهم الدرس." },
      { type: "ok", en: "We understand the lesson.", ar: "صحيح ✅" },
      { type: "bad", en: "We are understanding the lesson.", why: "understand من أفعال الفهم" },
      { type: "note", emoji: "🧠", text: "هذه قاعدة متقدمة، فلا تقلق إذا كانت جديدة. سنوسعها لاحقًا." },
    ],
  },
  {
    kind: "lesson",
    section: G,
    mascot: "❤️",
    step: "17",
    title: "انتبه إلى كلمة \"love\"",
    blocks: [
      { type: "text", text: "في الإنجليزية اليومية الحديثة قد تسمع أحيانًا استخدامات مختلفة حسب السياق." },
      { type: "sentence", parts: [P("I", "s"), P("love", "v"), P("music", "o")], ar: "أنا أحب الموسيقى." },
      { type: "ok", en: "I love music.", ar: "أفضل — شعور عام ✅" },
      { type: "bad", en: "I am loving music.", why: "عندما نتحدث عن شعور عام نستخدم Simple وليس Continuous" },
      { type: "note", emoji: "📌", text: "لكن في منهجنا الأساسي: [[I love music.]] أفضل من [[I am loving music.]] عندما نتحدث عن شعور عام." },
    ],
  },
  {
    kind: "lesson",
    section: G,
    mascot: "🧩",
    step: "18",
    title: "مقارنة عبقرية 🧠🔥",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("think", "v"), P("you are right", "o")], ar: "أنا أعتقد أنك على حق." },
      { type: "note", emoji: "💡", text: "هنا [[think]] = رأي." },
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("thinking", "v"), P("about the problem", "o")], ar: "أنا أفكر في المشكلة." },
      { type: "note", emoji: "💡", text: "هنا [[thinking]] = عملية تحدث الآن." },
      { type: "thinkCompare" },
      { type: "note", emoji: "🧠", text: "إذن نفس الفعل يمكن أن يتغير استخدامه حسب المعنى. هذه نقطة متقدمة جدًا." },
    ],
  },

  // ---------------- تمارين المستويات 1-9 ----------------
  {
    kind: "ex",
    section: H,
    mascot: "✏️",
    badge: "المستوى 1",
    title: "اختر الزمن الصحيح",
    subtitle: "Present Simple أم Present Continuous؟",
    ex: {
      type: "chooseTense",
      items: [
        { stem: "Every morning, Hana _______ her plants.", ar: "عادة كل صباح", opts: ["waters", "is watering"], answer: 0 },
        { stem: "Look! Hana _______ the flowers.", ar: "انظر! الآن", opts: ["waters", "is watering"], answer: 1 },
        { stem: "My family _______ in a small apartment.", ar: "حقيقة / وضع مستقر", opts: ["lives", "is living"], answer: 0 },
        { stem: "We _______ in a hotel this week because our house is being repaired.", ar: "وضع مؤقت هذا الأسبوع", opts: ["stay", "are staying"], answer: 1 },
        { stem: "Karim usually _______ the train.", ar: "عادةً", opts: ["takes", "is taking"], answer: 0 },
        { stem: "Today, Karim _______ the bus.", ar: "اليوم — مؤقت", opts: ["takes", "is taking"], answer: 1 },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "📝",
    badge: "المستوى 2",
    title: "أكمل — استخدم am / is / are + الفعل المناسب",
    subtitle: "اختر الشكل الصحيح",
    ex: {
      type: "amIsAreFill",
      items: [
        { stem: "The students _______ _______ for the exam this week.", ar: "يستعدون للامتحان هذا الأسبوع", verb: "prepare", opts: ["are preparing", "is preparing", "am preparing"], answer: 0 },
        { stem: "My uncle _______ _______ a new language these days.", ar: "يتعلم لغة جديدة هذه الأيام", verb: "learn", opts: ["is learning", "are learning", "am learning"], answer: 0 },
        { stem: "I _______ _______ a strange noise.", ar: "أسمع ضوضاء غريبة (الآن)", verb: "hear", opts: ["am hearing", "is hearing", "hear"], answer: 2 },
        { stem: "Look! The horse _______ _______ toward the gate.", ar: "انظر! الحصان يركض", verb: "run", opts: ["is running", "are running", "runs"], answer: 0 },
        { stem: "We _______ _______ a science project this month.", ar: "نقوم بمشروع علمي هذا الشهر", verb: "make", opts: ["are making", "is making", "makes"], answer: 0 },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "🚫",
    badge: "المستوى 3",
    title: "النفي — حوّل إلى النفي",
    subtitle: "استخدم am/is/are + not",
    ex: {
      type: "negTransform",
      items: [
        { aff: "Maya is using the tablet.", neg: "Maya isn't using the tablet. / Maya is not using the tablet." },
        { aff: "The boys are shouting.", neg: "The boys aren't shouting." },
        { aff: "I am waiting for the answer.", neg: "I'm not waiting for the answer." },
        { aff: "Dad is cooking dinner.", neg: "Dad isn't cooking dinner." },
        { aff: "We are staying here this week.", neg: "We aren't staying here this week." },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "❓",
    badge: "المستوى 4",
    title: "الأسئلة — حوّل إلى سؤال",
    subtitle: "اقلـب am/is/are",
    ex: {
      type: "qTransform",
      items: [
        { aff: "She is preparing lunch.", q: "Is she preparing lunch?" },
        { aff: "They are building a treehouse.", q: "Are they building a treehouse?" },
        { aff: "He is fixing the bicycle.", q: "Is he fixing the bicycle?" },
        { aff: "You are watching the news.", q: "Are you watching the news?" },
        { aff: "The children are playing in the garden.", q: "Are the children playing in the garden?" },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "🔍",
    badge: "المستوى 5",
    title: "Wh Questions — اختر الكلمة المناسبة",
    subtitle: "What / Where / Why / Who",
    ex: {
      type: "whChoose",
      items: [
        { q: "_______ are you carrying? — I am carrying a box.", a: "What", opts: ["What", "Where", "Why", "Who"], answer: 0 },
        { q: "_______ is your brother going? — He is going to the library.", a: "Where", opts: ["What", "Where", "Why", "Who"], answer: 1 },
        { q: "_______ are they laughing? — Because the movie is funny.", a: "Why", opts: ["What", "Where", "Why", "Who"], answer: 2 },
        { q: "_______ is calling me? — Your sister is calling you.", a: "Who", opts: ["What", "Where", "Why", "Who"], answer: 3 },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "🩹",
    badge: "المستوى 6",
    title: "صحح الخطأ",
    subtitle: "كل جملة فيها خطأ — اكتشفه",
    ex: {
      type: "fix",
      items: [
        { wrong: "She is writeing a message.", correct: "She is writing a message.", why: "احذف e: write → writing" },
        { wrong: "They are runing in the street.", correct: "They are running in the street.", why: "ضاعف n: run → running" },
        { wrong: "Does he working today?", correct: "Is he working today?", why: "مع Continuous نستخدم Is وليس Does" },
        { wrong: "He doesn't sleeping now.", correct: "He isn't sleeping now.", why: "النفي: isn't sleeping وليس doesn't sleeping" },
        { wrong: "I am know the answer.", correct: "I know the answer.", why: "know من الأفعال الحالة — لا نستخدمه مع Continuous" },
        { wrong: "We are usually eat dinner at seven.", correct: "We usually eat dinner at seven.", why: "usually مع Present Simple وليس are ... eat" },
        { wrong: "She is liveing with her aunt this month.", correct: "She is living with her aunt this month.", why: "live → living (احذف e)" },
        { wrong: "What you are doing?", correct: "What are you doing?", why: "ترتيب سؤال Wh: What are you ...?" },
      ],
    },
  },
  {
    kind: "ex",
    section: H,
    mascot: "🧠",
    badge: "المستوى 7",
    title: "Present Simple أم Continuous؟ — اختر ثم اشرح السبب",
    subtitle: "المعنى هو الحكم",
    ex: {
      type: "tenseChooseExplain",
      items: [
        { en: "My brother _______ basketball every Wednesday. ① plays ② is playing", ar: "عادة كل أربعاء", opts: ["plays", "is playing"], answer: 0 },
        { en: "My brother _______ basketball right now. ① plays ② is playing", ar: "الآن", opts: ["plays", "is playing"], answer: 1 },
        { en: "We _______ English this year. ① study ② are studying", ar: "هذه السنة — فترة حالية", opts: ["study", "are studying"], answer: 1 },
        { en: "She _______ three languages. ① speaks ② is speaking", ar: "حقيقة / قدرة عامة", opts: ["speaks", "is speaking"], answer: 0 },
        { en: "Listen! Someone _______ at the door. ① knocks ② is knocking", ar: "اسمع! الآن", opts: ["knocks", "is knocking"], answer: 1 },
        { en: "My parents _______ to the mountains every summer. ① travel ② are traveling", ar: "عادة كل صيف", opts: ["travel", "are traveling"], answer: 0 },
        { en: "This month, my parents _______ around Europe. ① travel ② are traveling", ar: "هذا الشهر — مؤقت", opts: ["travel", "are traveling"], answer: 1 },
      ],
    },
  },
  {
    kind: "ex",
    section: I,
    mascot: "🔥",
    badge: "المستوى 8",
    title: "IQ200",
    subtitle: "8 تحديات متقدمة — فكّر قبل أن تجيب",
    ex: {
      type: "iq",
      items: [
        {
          kind: "mcq",
          q: "أي جملة صحيحة؟ ① I am knowing the answer. ② I know the answer. ولماذا؟",
          opts: ["② I know the answer. — know فعل حالة لا يُستخدم مع Continuous", "① I am knowing the answer."],
          answer: 0,
          why: "know من أفعال المعرفة/الحالة — نستخدم Simple.",
        },
        {
          kind: "mcq",
          q: "My sister usually _______ glasses, but today she _______ contact lenses. ① wears / is wearing ② is wearing / wears ③ wears / wears",
          opts: ["① wears / is wearing — عادة vs اليوم مؤقت", "② is wearing / wears", "③ wears / wears"],
          answer: 0,
          why: "usually → Simple، today → Continuous (مؤقت).",
        },
        {
          kind: "text",
          q: "أين الخطأ؟ They are usually playing football after school. إذا كنا نتحدث عن عادة متكررة، ما الجملة الأفضل؟",
          a: "الصحيح: They usually play football after school. — usually مع Simple وليس are ...ing",
        },
        {
          kind: "text",
          q: "قارن: I live with my parents. / I am living with my parents this month. هل المعنى متطابق؟ اشرح الفرق.",
          a: "لا — الأولى: وضع مستقر/دائم (Simple). الثانية: وضع مؤقت هذا الشهر (Continuous).",
        },
        { kind: "order", words: ["currently", "is", "a", "book", "reading", "Sara"], correct: ["Sara", "is", "currently", "reading", "a", "book"], ar: "سارة تقرأ كتابًا حاليًا." },
        { kind: "order", words: ["not", "are", "why", "you", "listening"], correct: ["Why", "are", "you", "not", "listening"], ar: "لماذا لا تستمع؟" },
        {
          kind: "mcq",
          q: "صحح: What does he doing now? هل نحتاج Does أم Is؟",
          opts: ["What is he doing now? — نحتاج Is مع ing", "What does he doing now؟ صحيح", "What does he do now؟ للماضي"],
          answer: 0,
          why: "مع Continuous: Is + subject + verb-ing، لا Does + verb-ing.",
        },
        {
          kind: "mcq",
          q: "اختر الصحيح: ① She doesn't watching TV. ② She isn't watching TV. ③ She don't watching TV. ④ She not is watching TV.",
          opts: ["② She isn't watching TV. — النفي: isn't + verb-ing", "① She doesn't watching TV.", "③ She don't watching TV.", "④ She not is watching TV."],
          answer: 0,
          why: "النفي في Continuous: am/is/are + not + ing، وليس doesn't.",
        },
      ],
    },
  },
  { kind: "detective", section: I, mascot: "🕵️", title: "المستوى 9 — Grammar Detective" },
  { kind: "challenge", section: I, mascot: "🏆", title: "التحدي النهائي — IQ200+" },

  { kind: "summary", section: J, mascot: "🧠", title: "ملخص الدرس" },
  { kind: "quiz", section: J, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: J, mascot: "🎓", title: "الخاتمة" },
];

export const GRAMMAR_DETECTIVE_PASSAGE =
  "David normally works in an office, but this month he is working from home. He usually drives to work, but today he is taking the train. His daughter is studying for her exams this week, so she isn't watching much television.";

export const GRAMMAR_DETECTIVE_Q: { q: string; a: string }[] = [
  { q: "استخرج كل أفعال Present Simple.", a: "works · drives" },
  { q: "استخرج كل أفعال Present Continuous.", a: "is working · is taking · is studying · isn't watching (is not watching)" },
  { q: "لماذا works؟", a: "لأنه عادة/روتين مع normally (He → works + s)." },
  { q: "لماذا is working؟", a: "لأنه وضع مؤقت هذا الشهر (this month → Continuous)." },
  { q: "لماذا drives؟", a: "عادة مع usually (He → drives)." },
  { q: "لماذا is taking؟", a: "اليوم مؤقت (today → is taking)." },
  { q: "ما العبارة التي تدل على فترة مؤقتة؟", a: "this month · this week (و today كمؤقت)" },
  { q: "ما العبارة التي تدل على اليوم الحالي؟", a: "today" },
  { q: "لماذا isn't watching وليس doesn't watching؟", a: "لأن النفي في Continuous: isn't + verb-ing وليس doesn't + verb-ing." },
];

export const FINAL_CHALLENGE = {
  intro: "اكتب قصة قصيرة من 8 جمل عن يوم غير عادي لشخصية اسمها Alex.",
  conditions: [
    "استخدم 3 جمل Present Simple.",
    "استخدم 4 جمل Present Continuous.",
    "استخدم جملة واحدة منفية.",
    "استخدم سؤالًا واحدًا.",
    "استخدم: usually · now · this week",
    "استخدم فعلًا ينتهي بـ e وتحوّله إلى ing.",
    "استخدم فعلًا يتضاعف فيه الحرف الأخير.",
    "لا تستخدم أي مثال من هذا الدرس.",
  ],
  bonus: "اكتب جملتين عن نفس الشخص: الجملة الأولى تصف حياته المعتادة. الجملة الثانية تصف شيئًا مؤقتًا يحدث هذه الفترة. يجب أن يكون الفرق بين الزمنين واضحًا جدًا.",
};

export const IQ_SUMMARY = [
  "Present Continuous لا يعني فقط \"الآن\".",
  "له استخدامات مهمة: ① شيء يحدث الآن. ② شيء يحدث هذه الفترة. ③ شيء مؤقت.",
  "التركيب: Subject + am/is/are + verb-ing — I → am · He / She / It → is · You / We / They → are",
  "النفي: am/is/are + not + verb-ing — is not → isn't · are not → aren't · I am not → I'm not",
  "السؤال: Am/Is/Are + subject + verb-ing? — Is she reading? · Are they working?",
  "أسئلة Wh: What / Where / Why / Who + am/is/are + subject + verb-ing?",
  "Present Simple: عادة / روتين / حقيقة / شيء مستقر.",
  "Present Continuous: الآن / هذه الفترة / شيء مؤقت.",
];

export const FINAL_IQ_RULE = "لا تسأل نفسك فقط: \"هل توجد كلمة now؟\" بل اسأل: \"هل أتحدث عن شيء معتاد ومستقر، أم عن شيء يحدث الآن أو مؤقتًا؟\" إذا كان مستقرًا ومتكررًا: → Present Simple — إذا كان مؤقتًا أو يحدث حاليًا: → Present Continuous — وهنا تبدأ فعليًا بالانتقال من حفظ قواعد الإنجليزية إلى فهم طريقة عملها.";
