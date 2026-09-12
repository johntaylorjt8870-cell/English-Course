// ============================================================
// الدرس 10 — الماضي البسيط Past Simple
// ============================================================

export type WasForm = "was" | "were";

export interface Subj10 {
  en: string;
  ar: string;
  was: WasForm;
}

export const SUBJ10: Subj10[] = [
  { en: "I", ar: "أنا", was: "was" },
  { en: "You", ar: "أنت", was: "were" },
  { en: "We", ar: "نحن", was: "were" },
  { en: "They", ar: "هم", was: "were" },
  { en: "He", ar: "هو", was: "was" },
  { en: "She", ar: "هي", was: "was" },
  { en: "It", ar: "هو / هي لغير العاقل", was: "was" },
  { en: "Khalil", ar: "خليل", was: "was" },
  { en: "Sara", ar: "سارة", was: "was" },
  { en: "Omar", ar: "عمر", was: "was" },
];

export type PastRule = "add-ed" | "add-d" | "y-ied" | "double";
export type VerbKind = "regular" | "irregular";

export interface Verb10 {
  base: string;
  past: string;
  kind: VerbKind;
  rule?: PastRule;
  ar: string;
}

export const VERBS10: Verb10[] = [
  // منتظمة — أضف ed
  { base: "play", past: "played", kind: "regular", rule: "add-ed", ar: "لعب" },
  { base: "watch", past: "watched", kind: "regular", rule: "add-ed", ar: "شاهد" },
  { base: "cook", past: "cooked", kind: "regular", rule: "add-ed", ar: "طبخ" },
  { base: "visit", past: "visited", kind: "regular", rule: "add-ed", ar: "زار" },
  { base: "work", past: "worked", kind: "regular", rule: "add-ed", ar: "عمل" },
  { base: "help", past: "helped", kind: "regular", rule: "add-ed", ar: "ساعد" },
  { base: "open", past: "opened", kind: "regular", rule: "add-ed", ar: "فتح" },
  { base: "want", past: "wanted", kind: "regular", rule: "add-ed", ar: "أراد" },
  // منتظمة — ينتهي بـ e → نضيف d فقط
  { base: "live", past: "lived", kind: "regular", rule: "add-d", ar: "عاش / سكن" },
  { base: "like", past: "liked", kind: "regular", rule: "add-d", ar: "أحب" },
  { base: "close", past: "closed", kind: "regular", rule: "add-d", ar: "أغلق" },
  { base: "smile", past: "smiled", kind: "regular", rule: "add-d", ar: "ابتسم" },
  { base: "dance", past: "danced", kind: "regular", rule: "add-d", ar: "رقص" },
  // منتظمة — ساكن + y → ied
  { base: "study", past: "studied", kind: "regular", rule: "y-ied", ar: "درس" },
  { base: "carry", past: "carried", kind: "regular", rule: "y-ied", ar: "حمل" },
  { base: "try", past: "tried", kind: "regular", rule: "y-ied", ar: "حاول" },
  { base: "cry", past: "cried", kind: "regular", rule: "y-ied", ar: "بكى" },
  // منتظمة — مضاعفة الحرف الأخير
  { base: "stop", past: "stopped", kind: "regular", rule: "double", ar: "توقف" },
  { base: "plan", past: "planned", kind: "regular", rule: "double", ar: "خطط" },
  { base: "drop", past: "dropped", kind: "regular", rule: "double", ar: "أسقط" },
  // شاذة — الأكثر شيوعًا
  { base: "go", past: "went", kind: "irregular", ar: "ذهب" },
  { base: "eat", past: "ate", kind: "irregular", ar: "أكل" },
  { base: "see", past: "saw", kind: "irregular", ar: "رأى" },
  { base: "have", past: "had", kind: "irregular", ar: "امتلك / تناول" },
  { base: "do", past: "did", kind: "irregular", ar: "فعل" },
  { base: "make", past: "made", kind: "irregular", ar: "صنع" },
  { base: "take", past: "took", kind: "irregular", ar: "أخذ" },
  { base: "come", past: "came", kind: "irregular", ar: "جاء" },
  { base: "write", past: "wrote", kind: "irregular", ar: "كتب" },
  { base: "buy", past: "bought", kind: "irregular", ar: "اشترى" },
  { base: "read", past: "read", kind: "irregular", ar: "قرأ" },
  { base: "speak", past: "spoke", kind: "irregular", ar: "تحدث" },
  { base: "drink", past: "drank", kind: "irregular", ar: "شرب" },
  { base: "sleep", past: "slept", kind: "irregular", ar: "نام" },
  { base: "feel", past: "felt", kind: "irregular", ar: "شعر" },
  { base: "find", past: "found", kind: "irregular", ar: "وجد" },
];

export function pastOf(base: string): string {
  return VERBS10.find((v) => v.base === base)?.past ?? base + "ed";
}

// -------------------- كلمات الماضي --------------------
export const PAST_WORDS: { en: string; ar: string }[] = [
  { en: "yesterday", ar: "أمس" },
  { en: "last night", ar: "الليلة الماضية" },
  { en: "last week", ar: "الأسبوع الماضي" },
  { en: "last month", ar: "الشهر الماضي" },
  { en: "last year", ar: "السنة الماضية" },
  { en: "two days ago", ar: "قبل يومين" },
  { en: "a week ago", ar: "قبل أسبوع" },
  { en: "in 2019", ar: "في عام 2019" },
  { en: "when I was a child", ar: "عندما كنت طفلًا" },
  { en: "then", ar: "حينها / بعد ذلك" },
];

// -------------------- مَشاهد «حدث وانتهى» --------------------
export const PAST_SCENES: { subj: string; base: string; o?: string; ar: string; emoji: string }[] = [
  { subj: "I", base: "visit", o: "my grandmother yesterday", ar: "زرت جدتي أمس.", emoji: "👵" },
  { subj: "She", base: "cook", o: "dinner last night", ar: "هي طبخت العشاء الليلة الماضية.", emoji: "🍲" },
  { subj: "They", base: "play", o: "football last week", ar: "هم لعبوا كرة القدم الأسبوع الماضي.", emoji: "⚽" },
  { subj: "He", base: "watch", o: "a movie two days ago", ar: "هو شاهد فيلمًا قبل يومين.", emoji: "🎬" },
  { subj: "We", base: "study", o: "English last year", ar: "نحن درسنا الإنجليزية السنة الماضية.", emoji: "📖" },
  { subj: "You", base: "buy", o: "a new phone yesterday", ar: "أنت اشتريت هاتفًا جديدًا أمس.", emoji: "📱" },
  { subj: "Sara", base: "go", o: "to Paris last month", ar: "سارة ذهبت إلى باريس الشهر الماضي.", emoji: "🗼" },
  { subj: "He", base: "eat", o: "pizza last night", ar: "هو أكل بيتزا الليلة الماضية.", emoji: "🍕" },
];

// -------------------- بلوكات --------------------
export type Role10 = "s" | "be" | "v" | "aux" | "nt" | "o" | "adv";

export interface Part10 {
  text: string;
  role: Role10;
}

export const ROLE10_AR: Record<Role10, string> = {
  s: "الفاعل",
  be: "was / were",
  v: "الفعل ماضي",
  aux: "الفعل المساعد",
  nt: "النفي",
  o: "المفعول به",
  adv: "ظرف زمان",
};

export type Block10 =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "sentence"; parts: Part10[]; ar: string; note?: string; q?: boolean }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "wasTabs" }
  | { type: "wasMnemonic" }
  | { type: "pastTabs" }
  | { type: "irregularGrid" }
  | { type: "pastScenes" }
  | { type: "signalWords" }
  | { type: "vsPresent" }
  | { type: "didTransform" }
  | { type: "shortAnswers" };

export type Exercise10 =
  | { type: "choose"; items: { s: string; v: string; o?: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "wasChoose"; items: { s: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "past"; items: { verb: string; opts: string[]; answer: number }[] }
  | { type: "signal"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why: string }[] }
  | { type: "order"; items: { words: string[]; correct: string[]; ar: string; q?: boolean }[] }
  | { type: "usage"; items: { en: string; ar: string; answer: "past" | "present" }[] };

export const USAGE10_AR: Record<"past" | "present", string> = {
  past: "ماضٍ انتهى",
  present: "عادة / حاضر",
};

export type Slide10 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block10[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise10 }
  | { kind: "iq"; title: string }
  | { kind: "builder"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const A = "البداية";
const B = "الفكرة";
const C = "التكوين";
const D = "القواعد";
const E = "الماضي";
const F = "النفي والسؤال";
const G = "التمارين";
const H = "الخاتمة";

const P = (text: string, role: Role10): Part10 => ({ text, role });

export const SLIDES: Slide10[] = [
  { kind: "cover", section: A, mascot: "🕰️" },
  { kind: "objectives", section: A, mascot: "🎯" },

  {
    kind: "lesson",
    section: B,
    mascot: "💡",
    step: "1",
    title: "ما هو Past Simple؟",
    lead: "نستخدمه عندما نتحدث عن شيء حدث وانتهى في الماضي — ليس الآن وليس كعادة مستمرة.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("played", "v"), P("football", "o"), P("yesterday", "adv")], ar: "أنا لعبت كرة القدم أمس." },
      { type: "note", emoji: "⏳", text: "الفعل حدث في وقت محدد وانتهى — نعرف متى حدث." },
      { type: "list", items: ["حدث واحد انتهى في الماضي.", "عادة قديمة لم تعد تحدث.", "سلسلة أحداث حدثت بالتتابع.", "حقيقة تاريخية أو قصة قصيرة."] },
      { type: "text", text: "الماضي البسيط هو أكثر زمن نستخدمه لسرد ما حدث: ماذا فعلنا أمس، وأين ذهبنا الأسبوع الماضي، وماذا أكلنا الليلة الماضية." },
    ],
  },
  {
    kind: "lesson",
    section: B,
    mascot: "🧩",
    step: "2",
    title: "متى نستخدمه؟ أربع حالات أساسية",
    lead: "كل استخدام له طعم الماضي — وليس طعم العادة الحالية.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("visited", "v"), P("my uncle", "o"), P("last week", "adv")], ar: "زرت عمّي الأسبوع الماضي.", note: "حدث واحد انتهى" },
      { type: "sentence", parts: [P("She", "s"), P("lived", "v"), P("in Aleppo", "o"), P("when she was a child", "adv")], ar: "هي عاشت في حلب عندما كانت طفلة.", note: "عادة قديمة" },
      { type: "sentence", parts: [P("We", "s"), P("woke up", "v"), P("then ate breakfast", "o")], ar: "استيقظنا ثم تناولنا الفطور.", note: "سلسلة أحداث" },
      { type: "sentence", parts: [P("The phone", "s"), P("rang", "v"), P("suddenly", "adv")], ar: "رنّ الهاتف فجأة.", note: "حدث قصير قطع حدثًا آخر" },
      { type: "note", emoji: "📐", text: "التركيب الأساسي: [[Subject + Verb (past) + ...]] — مثال: [[I played · She went · They visited]]" },
    ],
  },
  {
    kind: "lesson",
    section: B,
    mascot: "🪞",
    step: "3",
    title: "الماضي مع Verb to be: was / were",
    lead: "عندما لا يوجد فعل حركة — نستخدم was أو were كفعل الكينونة في الماضي.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("was", "be"), P("tired", "o"), P("yesterday", "adv")], ar: "كنت متعبًا أمس." },
      { type: "sentence", parts: [P("They", "s"), P("were", "be"), P("happy", "o"), P("last night", "adv")], ar: "كانوا سعداء الليلة الماضية." },
      { type: "sentence", parts: [P("She", "s"), P("was", "be"), P("at home", "o"), P("in the morning", "adv")], ar: "كانت في المنزل صباحًا." },
      { type: "note", emoji: "📖", text: "[[was]] للمفرد [[I / He / She / It]] — و [[were]] للجمع والمخاطب [[You / We / They]]" },
      { type: "wasTabs" },
    ],
  },
  {
    kind: "lesson",
    section: B,
    mascot: "🧠",
    step: "4",
    title: "احفظ was / were بهذه الطريقة",
    blocks: [{ type: "wasMnemonic" }],
  },

  {
    kind: "lesson",
    section: C,
    mascot: "✏️",
    step: "5",
    title: "الأفعال المنتظمة: كيف نكوّن الماضي؟",
    lead: "معظم الأفعال منتظمة — نضيف ed بصيغ مختلفة حسب نهاية الفعل.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("played", "v"), P("chess", "o"), P("yesterday", "adv")], ar: "لعبت الشطرنج أمس." },
      { type: "sentence", parts: [P("He", "s"), P("watched", "v"), P("TV", "o"), P("last night", "adv")], ar: "شاهد التلفاز الليلة الماضية." },
      { type: "note", emoji: "📌", text: "القاعدة العامة: [[play → played]] · [[watch → watched]] · [[visit → visited]]" },
      { type: "pastTabs" },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "🅰️",
    step: "6",
    title: "تفصيل القواعد الأربع",
    lead: "كل قاعدة لها منطق صوتي وكتابي — احفظها مرة واحدة وتطبقها دائمًا:",
    blocks: [
      { type: "list", items: ["ينتهي بحرف عادي ← نضيف ed: play → played · watch → watched."] },
      { type: "sentence", parts: [P("They", "s"), P("played", "v"), P("football", "o")], ar: "لعبوا كرة القدم." },
      { type: "list", items: ["ينتهي بـ e ← نضيف d فقط: live → lived · like → liked · close → closed."] },
      { type: "sentence", parts: [P("She", "s"), P("lived", "v"), P("in Damascus", "o")], ar: "سكنت في دمشق." },
      { type: "list", items: ["حرف ساكن + y ← نحذف y ونضع ied: study → studied · cry → cried · carry → carried."] },
      { type: "sentence", parts: [P("He", "s"), P("studied", "v"), P("English", "o"), P("last year", "adv")], ar: "درس الإنجليزية السنة الماضية." },
      { type: "note", emoji: "⚠️", text: "لكن: [[play → played]] (قبل y حرف علة a) — لا نحذف y. وكذلك [[enjoy → enjoyed]]." },
      { type: "list", items: ["مقطع واحد + ساكن بعد علة ← نضاعف الحرف الأخير: stop → stopped · plan → planned · drop → dropped."] },
      { type: "sentence", parts: [P("He", "s"), P("stopped", "v"), P("the car", "o")], ar: "أوقف السيارة." },
      { type: "bad", en: "He stoped the car.", why: "ننسى مضاعفة الحرف p — الصحيح: stopped" },
    ],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "⚡",
    step: "7",
    title: "الأفعال الشاذة: لا قاعدة — حفظ",
    lead: "حوالي ثلث الأفعال الأكثر استخدامًا شاذة — شكلها يتغير تمامًا في الماضي. لا تضيف ed.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("went", "v"), P("to school", "o"), P("yesterday", "adv")], ar: "ذهبت إلى المدرسة أمس." },
      { type: "sentence", parts: [P("She", "s"), P("ate", "v"), P("pizza", "o"), P("last night", "adv")], ar: "أكلت بيتزا الليلة الماضية." },
      { type: "sentence", parts: [P("They", "s"), P("saw", "v"), P("a movie", "o"), P("two days ago", "adv")], ar: "شاهدوا فيلمًا قبل يومين." },
      { type: "note", emoji: "🧠", text: "[[go → went]] · [[eat → ate]] · [[see → saw]] · [[have → had]] · [[do → did]] · [[make → made]] · [[take → took]] · [[come → came]]" },
      { type: "irregularGrid" },
      { type: "note", emoji: "📌", text: "انتبه: [[read]] تُكتب نفسها في الماضي لكن تُلفظ [[red]] — المعنى يتغير بالسياق والزمن المذكور." },
    ],
  },
  { kind: "lesson", section: D, mascot: "🗂️", step: "8", title: "جرّب القواعد بنفسك", blocks: [{ type: "pastTabs" }] },
  { kind: "lesson", section: D, mascot: "📚", step: "9", title: "بطاقات الحفظ السريع", blocks: [{ type: "irregularGrid" }] },

  {
    kind: "lesson",
    section: E,
    mascot: "👀",
    step: "10",
    title: "كلمات دالة على الماضي",
    lead: "هذه الكلمات تخبرنا أن الفعل حدث وانتهى — وليس الآن:",
    blocks: [{ type: "signalWords" }],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "📸",
    step: "11",
    title: "ماذا حدث أمس؟ اضغط لترى المشهد",
    lead: "تخيّل أنك تتصفح ألبوم صور الأسبوع الماضي:",
    blocks: [{ type: "pastScenes" }],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "⚖️",
    step: "12",
    title: "Past Simple أم Present Simple؟",
    lead: "لا تخلط بينهما — الآن vs انتهى:",
    blocks: [
      { type: "vsPresent" },
      { type: "note", emoji: "💬", text: "[[every day / usually / always]] ← عادة ← [[Present Simple]] · [[yesterday / last week / two days ago]] ← انتهى ← [[Past Simple]]" },
    ],
  },

  {
    kind: "lesson",
    section: F,
    mascot: "🚫",
    step: "13",
    title: "النفي في الماضي: Subject + didn't + Verb (base)",
    lead: "نستخدم didn't مع كل الفاعلين — والفعل يعود لشكله الأساسي بدون أي تغيير.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("didn't", "aux"), P("play", "v"), P("football", "o"), P("yesterday", "adv")], ar: "لم ألعب كرة القدم أمس." },
      { type: "sentence", parts: [P("She", "s"), P("didn't", "aux"), P("eat", "v"), P("pizza", "o"), P("last night", "adv")], ar: "هي لم تأكل بيتزا الليلة الماضية.", note: "eat وليس ate!" },
      { type: "sentence", parts: [P("They", "s"), P("didn't", "aux"), P("watch", "v"), P("TV", "o")], ar: "هم لم يشاهدوا التلفاز." },
      { type: "note", emoji: "📐", text: "التركيب: [[Subject + didn't + Verb (base)]] — مثال: [[I didn't go · She didn't play · They didn't visit]]" },
      { type: "bad", en: "He didn't went to school.", why: "بعد didn't الفعل يعود أساسي: go" },
      { type: "ok", en: "He didn't go to school.", ar: "لم يذهب إلى المدرسة." },
      { type: "didTransform" },
    ],
  },
  {
    kind: "lesson",
    section: F,
    mascot: "❓",
    step: "14",
    title: "السؤال في الماضي: Did + Subject + Verb (base)؟",
    lead: "نضع Did في البداية — ونعيد الفعل لشكله الأساسي:",
    blocks: [
      { type: "sentence", parts: [P("Did", "aux"), P("you", "s"), P("play", "v"), P("football", "o"), P("yesterday", "adv")], ar: "هل لعبت كرة القدم أمس؟", q: true },
      { type: "sentence", parts: [P("Did", "aux"), P("she", "s"), P("eat", "v"), P("pizza", "o")], ar: "هل أكلت بيتزا؟", q: true },
      { type: "note", emoji: "🚨", text: "القاعدة الذهبية: [[Did]] تحمل الماضي — لذلك الفعل بعده دائمًا أساسي: [[Did you go? · Did she see? · Did they play?]]" },
      { type: "bad", en: "Did she played football?", why: "بعد Did لا نضع ed أبدًا" },
      { type: "ok", en: "Did she play football?", ar: "هل لعبت كرة القدم؟" },
    ],
  },
  {
    kind: "lesson",
    section: F,
    mascot: "🔀",
    step: "15",
    title: "النفي والسؤال مع was / were",
    lead: "مع فعل الكينونة لا نستخدم didn't / Did — بل not وقلب was/were:",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("was", "be"), P("not", "nt"), P("tired", "o")], ar: "لم أكن متعبًا." },
      { type: "sentence", parts: [P("They", "s"), P("were", "be"), P("not", "nt"), P("at home", "o")], ar: "لم يكونوا في المنزل." },
      { type: "note", emoji: "✂️", text: "اختصار: [[was not = wasn't]] · [[were not = weren't]]" },
      { type: "sentence", parts: [P("Was", "be"), P("he", "s"), P("tired", "o")], ar: "هل كان متعبًا؟", q: true },
      { type: "sentence", parts: [P("Were", "be"), P("they", "s"), P("happy", "o")], ar: "هل كانوا سعداء؟", q: true },
      { type: "sentence", parts: [P("Was", "be"), P("she", "s"), P("at school", "o"), P("yesterday", "adv")], ar: "هل كانت في المدرسة أمس؟", q: true },
      { type: "bad", en: "Did he was tired?", why: "مع was/were لا نستخدم Did أبدًا" },
      { type: "ok", en: "Was he tired?", ar: "هل كان متعبًا؟" },
    ],
  },
  {
    kind: "lesson",
    section: F,
    mascot: "✅",
    step: "16",
    title: "الإجابات القصيرة",
    blocks: [{ type: "shortAnswers" }],
  },
  {
    kind: "lesson",
    section: F,
    mascot: "🚨",
    step: "17",
    title: "أخطاء شائعة جدًا",
    blocks: [
      { type: "bad", en: "I play football yesterday.", why: "نحتاج ماضي: played" },
      { type: "ok", en: "I played football yesterday.", ar: "لعبت كرة القدم أمس." },
      { type: "bad", en: "She didn't played football.", why: "بعد didn't الفعل أساسي: play" },
      { type: "ok", en: "She didn't play football.", ar: "هي لم تلعب كرة القدم." },
      { type: "bad", en: "Did you went to school?", why: "بعد Did الفعل أساسي: go" },
      { type: "ok", en: "Did you go to school?", ar: "هل ذهبت إلى المدرسة؟" },
      { type: "bad", en: "They was happy.", why: "مع They نستخدم were وليس was" },
      { type: "ok", en: "They were happy.", ar: "كانوا سعداء." },
      { type: "bad", en: "He did not ate pizza.", why: "بعد did الفعل أساسي: eat" },
      { type: "ok", en: "He didn't eat pizza.", ar: "لم يأكل بيتزا." },
      { type: "bad", en: "Where you went yesterday?", why: "سؤال في الماضي يحتاج Did: Where did you go?" },
      { type: "ok", en: "Where did you go yesterday?", ar: "أين ذهبت أمس؟" },
    ],
  },

  // ---------------- التمارين ----------------
  {
    kind: "ex",
    section: G,
    mascot: "✏️",
    badge: "التمرين 1",
    title: "اختر was أو were",
    subtitle: "تذكّر: المفرد was والجمع were",
    ex: {
      type: "wasChoose",
      items: [
        { s: "I", ar: "أنا كنت متعبًا أمس.", opts: ["was", "were"], answer: 0 },
        { s: "They", ar: "هم كانوا في المنزل أمس.", opts: ["was", "were"], answer: 1 },
        { s: "She", ar: "هي كانت سعيدة الليلة الماضية.", opts: ["was", "were"], answer: 0 },
        { s: "We", ar: "نحن كنا مشغولين أمس.", opts: ["was", "were"], answer: 1 },
        { s: "He", ar: "هو كان في المدرسة أمس.", opts: ["was", "were"], answer: 0 },
        { s: "You", ar: "أنت كنت متأخرًا أمس.", opts: ["was", "were"], answer: 1 },
      ],
    },
  },
  {
    kind: "ex",
    section: G,
    mascot: "🧮",
    badge: "التمرين 2",
    title: "اختر صيغة الماضي الصحيحة",
    subtitle: "انتبه للقاعدة: منتظم أم شاذ؟",
    ex: {
      type: "past",
      items: [
        { verb: "play", opts: ["played", "plaied", "playd"], answer: 0 },
        { verb: "study", opts: ["studied", "studyed", "studys"], answer: 0 },
        { verb: "go", opts: ["goed", "went", "goes"], answer: 1 },
        { verb: "live", opts: ["lived", "livied", "liveed"], answer: 0 },
        { verb: "stop", opts: ["stoped", "stopped", "stoppped"], answer: 1 },
        { verb: "eat", opts: ["eated", "ate", "eaten"], answer: 1 },
        { verb: "have", opts: ["haved", "had", "has"], answer: 1 },
        { verb: "try", opts: ["tryed", "tried", "trys"], answer: 1 },
      ],
    },
  },
  {
    kind: "ex",
    section: G,
    mascot: "👀",
    badge: "التمرين 3",
    title: "اختر كلمة الماضي المناسبة",
    subtitle: "فكّر في السياق",
    ex: {
      type: "signal",
      items: [
        { stem: "I visited my friend ___.", ar: "أمس", opts: ["yesterday", "tomorrow"], answer: 0 },
        { stem: "She was happy ___.", ar: "الليلة الماضية", opts: ["last night", "next night"], answer: 0 },
        { stem: "They played football ___ ago.", ar: "قبل يومين", opts: ["two days", "every day"], answer: 0 },
        { stem: "He lived in Paris ___ 2019.", ar: "في عام 2019", opts: ["in", "on"], answer: 0 },
      ],
    },
  },
  {
    kind: "ex",
    section: G,
    mascot: "🩹",
    badge: "التمرين 4",
    title: "صحّح الخطأ",
    subtitle: "كل جملة فيها خطأ واحد",
    ex: {
      type: "fix",
      items: [
        { wrong: "I play football yesterday.", correct: "I played football yesterday.", why: "يجب استخدام الماضي: played" },
        { wrong: "She didn't went to school.", correct: "She didn't go to school.", why: "بعد didn't الفعل أساسي: go" },
        { wrong: "They was happy last night.", correct: "They were happy last night.", why: "مع They ← were" },
        { wrong: "He eated pizza last night.", correct: "He ate pizza last night.", why: "eat شاذ: ate" },
        { wrong: "Did you played football?", correct: "Did you play football?", why: "بعد Did الفعل أساسي" },
        { wrong: "Where you went yesterday?", correct: "Where did you go yesterday?", why: "سؤال ماضي يحتاج Did" },
      ],
    },
  },
  {
    kind: "ex",
    section: G,
    mascot: "🔀",
    badge: "التمرين 5",
    title: "رتّب الجملة",
    subtitle: "انتبه لترتيب الفاعل والفعل والظرف",
    ex: {
      type: "order",
      items: [
        { words: ["played", "I", "football", "yesterday"], correct: ["I", "played", "football", "yesterday"], ar: "لعبت كرة القدم أمس." },
        { words: ["was", "She", "tired", "yesterday"], correct: ["She", "was", "tired", "yesterday"], ar: "كانت متعبة أمس." },
        { words: ["didn't", "He", "go", "to school"], correct: ["He", "didn't", "go", "to school"], ar: "لم يذهب إلى المدرسة." },
        { words: ["Did", "you", "see", "him"], correct: ["Did", "you", "see", "him"], ar: "هل رأيته؟", q: true },
        { words: ["happy", "They", "were", "last night"], correct: ["They", "were", "happy", "last night"], ar: "كانوا سعداء الليلة الماضية." },
      ],
    },
  },
  {
    kind: "ex",
    section: G,
    mascot: "🕵️",
    badge: "التمرين 6",
    title: "ماضٍ أم حاضر؟",
    subtitle: "حدّد نوع الجملة",
    ex: {
      type: "usage",
      items: [
        { en: "I played football yesterday.", ar: "لعبت كرة القدم أمس.", answer: "past" },
        { en: "She usually drinks coffee.", ar: "هي عادةً تشرب القهوة.", answer: "present" },
        { en: "They visited Paris last year.", ar: "زاروا باريس السنة الماضية.", answer: "past" },
        { en: "He plays football every Friday.", ar: "هو يلعب كرة القدم كل جمعة.", answer: "present" },
        { en: "We were tired last night.", ar: "كنا متعبين الليلة الماضية.", answer: "past" },
      ],
    },
  },
  {
    kind: "ex",
    section: G,
    mascot: "📝",
    badge: "التمرين 7",
    title: "اختر الفعل الصحيح في الماضي",
    subtitle: "منتظم أو شاذ",
    ex: {
      type: "choose",
      items: [
        { s: "I", v: "___", o: "a movie yesterday", ar: "شاهدت فيلمًا أمس.", opts: ["watched", "watch", "watched"], answer: 0 },
        { s: "She", v: "___", o: "pizza last night", ar: "أكلت بيتزا الليلة الماضية.", opts: ["ate", "eated", "eats"], answer: 0 },
        { s: "They", v: "___", o: "in London in 2020", ar: "عاشوا في لندن عام 2020.", opts: ["lived", "live", "living"], answer: 0 },
        { s: "He", v: "___", o: "to Paris last week", ar: "ذهب إلى باريس الأسبوع الماضي.", opts: ["went", "goed", "go"], answer: 0 },
        { s: "We", v: "___", o: "very happy yesterday", ar: "كنا سعداء جدًا أمس.", opts: ["were", "was", "are"], answer: 0 },
        { s: "You", v: "___", o: "English last year", ar: "درست الإنجليزية السنة الماضية.", opts: ["studied", "studyed", "studies"], answer: 0 },
      ],
    },
  },

  { kind: "iq", section: G, mascot: "🏆", title: "تحدي IQ200" },
  { kind: "builder", section: G, mascot: "🎨", title: "تحدي إضافي: احكِ ماذا فعلت أمس" },

  { kind: "summary", section: H, mascot: "🧠", title: "ملخص الدرس 10" },
  { kind: "quiz", section: H, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: H, mascot: "⏭️", title: "الدرس القادم" },
];

export const IQ10: { wrong: string; correct: string; why: string }[] = [
  { wrong: "I was play football yesterday.", correct: "I played football yesterday.", why: "مع الفعل العادي نستخدم الماضي played وليس was + play" },
  { wrong: "She didn't ate pizza.", correct: "She didn't eat pizza.", why: "بعد didn't الفعل يعود أساسي: eat" },
  { wrong: "They was at home last night.", correct: "They were at home last night.", why: "مع They ← were" },
  { wrong: "Did he went to school yesterday?", correct: "Did he go to school yesterday?", why: "بعد Did الفعل أساسي: go" },
  { wrong: "He eated pasta.", correct: "He ate pasta.", why: "eat شاذ: ate وليس eated" },
  { wrong: "We didn't was tired.", correct: "We weren't tired. / We didn't feel tired.", why: "مع was/were نستخدم wasn't/weren't وليس didn't was" },
];

