// ============================================================
// الدرس 9 — المضارع المستمر Present Continuous
// ============================================================

export type BeForm = "am" | "is" | "are";

export interface Subj9 {
  en: string;
  ar: string;
  be: BeForm;
}

export const SUBJ9: Subj9[] = [
  { en: "I", ar: "أنا", be: "am" },
  { en: "You", ar: "أنت", be: "are" },
  { en: "We", ar: "نحن", be: "are" },
  { en: "They", ar: "هم", be: "are" },
  { en: "He", ar: "هو", be: "is" },
  { en: "She", ar: "هي", be: "is" },
  { en: "It", ar: "هو / هي لغير العاقل", be: "is" },
  { en: "Khalil", ar: "خليل", be: "is" },
  { en: "Sara", ar: "سارة", be: "is" },
  { en: "Mira", ar: "ميرا", be: "is" },
];

export type IngRule = "add" | "drop-e" | "double";

export interface Verb9 {
  base: string;
  ing: string;
  rule: IngRule;
  ar: string;
}

export const VERBS9: Verb9[] = [
  // أضف ing فقط
  { base: "play", ing: "playing", rule: "add", ar: "يلعب" },
  { base: "watch", ing: "watching", rule: "add", ar: "يشاهد" },
  { base: "read", ing: "reading", rule: "add", ar: "يقرأ" },
  { base: "go", ing: "going", rule: "add", ar: "يذهب" },
  { base: "cook", ing: "cooking", rule: "add", ar: "يطبخ" },
  { base: "wash", ing: "washing", rule: "add", ar: "يغسل" },
  { base: "sing", ing: "singing", rule: "add", ar: "يغنّي" },
  { base: "study", ing: "studying", rule: "add", ar: "يدرس" },
  // احذف e ثم أضف ing
  { base: "write", ing: "writing", rule: "drop-e", ar: "يكتب" },
  { base: "make", ing: "making", rule: "drop-e", ar: "يصنع" },
  { base: "dance", ing: "dancing", rule: "drop-e", ar: "يرقص" },
  { base: "ride", ing: "riding", rule: "drop-e", ar: "يركب" },
  { base: "smile", ing: "smiling", rule: "drop-e", ar: "يبتسم" },
  { base: "drive", ing: "driving", rule: "drop-e", ar: "يقود" },
  // ضاعف الحرف الأخير ثم أضف ing
  { base: "run", ing: "running", rule: "double", ar: "يركض" },
  { base: "sit", ing: "sitting", rule: "double", ar: "يجلس" },
  { base: "swim", ing: "swimming", rule: "double", ar: "يسبح" },
  { base: "stop", ing: "stopping", rule: "double", ar: "يتوقف" },
  { base: "jog", ing: "jogging", rule: "double", ar: "يهرول" },
  { base: "plan", ing: "planning", rule: "double", ar: "يخطط" },
];

export function ingOf(base: string): string {
  return VERBS9.find((v) => v.base === base)?.ing ?? base + "ing";
}

// -------------------- كلمات الآن --------------------
export const NOW_WORDS: { en: string; ar: string }[] = [
  { en: "now", ar: "الآن" },
  { en: "right now", ar: "في هذه اللحظة" },
  { en: "at the moment", ar: "في الوقت الحالي" },
  { en: "currently", ar: "حاليًا" },
  { en: "Look!", ar: "انظر!" },
  { en: "Listen!", ar: "استمع!" },
];

// -------------------- مَشاهد «يحدث الآن» --------------------
export const NOW_SCENES: { subj: string; base: string; o?: string; ar: string; emoji: string }[] = [
  { subj: "I", base: "write", o: "an email", ar: "أنا أكتب رسالة إلكترونية الآن.", emoji: "✉️" },
  { subj: "She", base: "cook", o: "dinner", ar: "هي تطبخ العشاء الآن.", emoji: "🍲" },
  { subj: "They", base: "play", o: "football", ar: "هم يلعبون كرة القدم الآن.", emoji: "⚽" },
  { subj: "He", base: "swim", o: "in the pool", ar: "هو يسبح في المسبح الآن.", emoji: "🏊" },
  { subj: "We", base: "watch", o: "a movie", ar: "نحن نشاهد فيلمًا الآن.", emoji: "🎬" },
  { subj: "You", base: "study", o: "English", ar: "أنت تدرس الإنجليزية الآن.", emoji: "📖" },
  { subj: "It", base: "run", ar: "إنه يركض الآن (الكلب).", emoji: "🐕" },
  { subj: "Sara", base: "sing", ar: "سارة تغنّي الآن.", emoji: "🎤" },
];

// -------------------- بلوكات --------------------
export type Role9 = "s" | "be" | "v" | "o";

export interface Part9 { text: string; role: Role9 }

export const ROLE9_AR: Record<Role9, string> = {
  s: "الفاعل",
  be: "فعل الكينونة",
  v: "الفعل + ing",
  o: "المفعول به",
};

export type Block9 =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "sentence"; parts: Part9[]; ar: string; note?: string; q?: boolean }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; why?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "beTabs" }
  | { type: "beMnemonic" }
  | { type: "ingTabs" }
  | { type: "nowScene" }
  | { type: "signalWords" }
  | { type: "vsSimple" }
  | { type: "shortAnswers" };

// -------------------- التمارين --------------------
export type Exercise9 =
  | { type: "choose"; items: { s: string; v: string; o?: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "ing"; items: { verb: string; opts: string[]; answer: number }[] }
  | { type: "signal"; items: { stem: string; ar: string; opts: string[]; answer: number }[] }
  | { type: "fix"; items: { wrong: string; correct: string; why: string }[] }
  | { type: "order"; items: { words: string[]; correct: string[]; ar: string }[] }
  | { type: "usage"; items: { en: string; ar: string; answer: "now" | "habit" }[] };

export const USAGE_AR: Record<"now" | "habit", string> = {
  now: "يحدث الآن",
  habit: "عادة متكررة",
};

export type Slide9 = { section: string; mascot: string } & (
  | { kind: "cover" }
  | { kind: "objectives" }
  | { kind: "lesson"; step?: string; title: string; lead?: string; blocks: Block9[]; tip?: string }
  | { kind: "ex"; badge: string; title: string; subtitle: string; ex: Exercise9 }
  | { kind: "iq"; title: string }
  | { kind: "builder"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "closing"; title: string }
);

const A = "البداية";
const B = "الفكرة";
const C = "قاعدة ing";
const D = "الآن";
const E = "النفي والسؤال";
const F = "التمارين";
const G = "الخاتمة";

const P = (text: string, role: Role9): Part9 => ({ text, role });

export const SLIDES: Slide9[] = [
  { kind: "cover", section: A, mascot: "🎬" },
  { kind: "objectives", section: A, mascot: "🎯" },

  {
    kind: "lesson",
    section: B,
    mascot: "💡",
    step: "1",
    title: "ما هو Present Continuous؟",
    lead: "نستخدمه عندما نتحدث عن شيء يحدث الآن، في هذه اللحظة بالذات — وليس كعادة.",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("playing", "v"), P("football", "o")], ar: "أنا ألعب كرة القدم الآن." },
      { type: "note", emoji: "⏳", text: "الفعل يحدث بينما نتكلم — في هذه اللحظة بالضبط، وليس بشكل عام." },
      { type: "list", items: ["يحدث الآن، في هذه اللحظة.", "لم ينتهِ بعد — ما زال مستمرًا.", "غالبًا نراه أو نلاحظه وهو يحدث."] },
    ],
  },
  {
    kind: "lesson",
    section: B,
    mascot: "🧩",
    step: "2",
    title: "التكوين: Subject + am/is/are + verb-ing",
    lead: "ثلاثة أجزاء دائمًا: الفاعل، ثم فعل الكينونة المناسب، ثم الفعل بصيغة ing.",
    blocks: [
      { type: "sentence", parts: [P("She", "s"), P("is", "be"), P("cooking", "v"), P("dinner", "o")], ar: "هي تطبخ العشاء الآن." },
      { type: "sentence", parts: [P("They", "s"), P("are", "be"), P("watching", "v"), P("TV", "o")], ar: "هم يشاهدون التلفاز الآن." },
      { type: "note", emoji: "📐", text: "الترتيب: [[Subject + am/is/are + Verb-ing]]" },
    ],
  },
  {
    kind: "lesson",
    section: B,
    mascot: "🔑",
    step: "3",
    title: "أي be نستخدم مع كل فاعل؟",
    lead: "اضغط على أي فاعل لترى فعل الكينونة المناسب له مع أمثلة:",
    blocks: [{ type: "beTabs" }],
  },
  {
    kind: "lesson",
    section: B,
    mascot: "🧠",
    step: "4",
    title: "احفظها بهذه الطريقة",
    blocks: [{ type: "beMnemonic" }],
  },

  {
    kind: "lesson",
    section: C,
    mascot: "✏️",
    step: "5",
    title: "قاعدة 1: أضف ing فقط",
    lead: "معظم الأفعال — نضيف ing مباشرة إلى نهاية الفعل:",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("reading", "v"), P("a book", "o")], ar: "أنا أقرأ كتابًا الآن." },
      { type: "note", emoji: "📌", text: "play → playing · watch → watching · read → reading · go → going" },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "🪄",
    step: "6",
    title: "قاعدة 2: احذف e ثم أضف ing",
    lead: "إذا انتهى الفعل بحرف e صامت — نحذفه أولًا:",
    blocks: [
      { type: "sentence", parts: [P("He", "s"), P("is", "be"), P("writing", "v"), P("a letter", "o")], ar: "هو يكتب رسالة الآن." },
      { type: "note", emoji: "📌", text: "write → writing · make → making · dance → dancing · ride → riding" },
      { type: "bad", en: "He is writeing a letter.", why: "لا ننسَ حذف e قبل إضافة ing" },
    ],
  },
  {
    kind: "lesson",
    section: C,
    mascot: "🎲",
    step: "7",
    title: "قاعدة 3: ضاعف الحرف الأخير ثم أضف ing",
    lead: "إذا انتهى الفعل بـ حرف ساكن واحد بعد حرف علة واحد، في مقطع واحد — نضاعف الحرف الأخير:",
    blocks: [
      { type: "sentence", parts: [P("They", "s"), P("are", "be"), P("running", "v"), P("fast", "o")], ar: "هم يركضون بسرعة الآن." },
      { type: "note", emoji: "📌", text: "run → running · sit → sitting · swim → swimming · stop → stopping" },
      { type: "bad", en: "They are runing fast.", why: "ننسى مضاعفة الحرف n — الصحيح: running" },
    ],
  },
  { kind: "lesson", section: C, mascot: "🗂️", step: "8", title: "جرّب القواعد الثلاث بنفسك", blocks: [{ type: "ingTabs" }] },

  {
    kind: "lesson",
    section: D,
    mascot: "👀",
    step: "9",
    title: "كلمات دالة على «الآن»",
    lead: "هذه الكلمات تخبرنا أن الفعل يحدث في هذه اللحظة بالذات:",
    blocks: [{ type: "signalWords" }],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "📸",
    step: "10",
    title: "ماذا يحدث الآن؟ اضغط لترى المشهد",
    lead: "تخيّل أنك تنظر إلى كل شخص وهو يفعل شيئًا في هذه اللحظة:",
    blocks: [{ type: "nowScene" }],
  },
  {
    kind: "lesson",
    section: D,
    mascot: "⚖️",
    step: "11",
    title: "Present Simple أم Present Continuous؟",
    lead: "لا تخلط بينهما — كل واحد له استخدام مختلف تمامًا:",
    blocks: [
      { type: "vsSimple" },
      { type: "note", emoji: "💬", text: "[[usually / every day]] ← عادة ← [[Present Simple]] · [[now / right now / Look!]] ← الآن ← [[Present Continuous]]" },
    ],
  },

  {
    kind: "lesson",
    section: E,
    mascot: "🚫",
    step: "12",
    title: "النفي: Subject + am/is/are + not + verb-ing",
    lead: "نضيف not مباشرة بعد فعل الكينونة:",
    blocks: [
      { type: "sentence", parts: [P("I", "s"), P("am", "be"), P("not", "o"), P("sleeping", "v")], ar: "أنا لا أنام الآن." },
      { type: "sentence", parts: [P("She", "s"), P("is", "be"), P("not", "o"), P("studying", "v")], ar: "هي لا تدرس الآن." },
      { type: "note", emoji: "✂️", text: "اختصار: [[is not = isn't]] · [[are not = aren't]] (لا يوجد اختصار شائع لـ am not)" },
    ],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "❓",
    step: "13",
    title: "السؤال: Am/Is/Are + Subject + verb-ing؟",
    lead: "نقلب فعل الكينونة إلى بداية الجملة:",
    blocks: [
      { type: "sentence", parts: [P("Is", "be"), P("he", "s"), P("sleeping", "v")], ar: "هل هو نائم الآن؟", q: true },
      { type: "sentence", parts: [P("Are", "be"), P("they", "s"), P("playing", "v")], ar: "هل هم يلعبون الآن؟", q: true },
      { type: "bad", en: "Does she studying now?", why: "لا نستخدم do/does أبدًا مع Present Continuous" },
    ],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "✅",
    step: "14",
    title: "الإجابات القصيرة",
    blocks: [{ type: "shortAnswers" }],
  },
  {
    kind: "lesson",
    section: E,
    mascot: "🚨",
    step: "15",
    title: "أخطاء شائعة جدًا",
    blocks: [
      { type: "bad", en: "She cooking dinner.", why: "ناقص فعل الكينونة is" },
      { type: "ok", en: "She is cooking dinner.", ar: "هي تطبخ العشاء الآن." },
      { type: "bad", en: "I is playing football.", why: "مع I نستخدم am وليس is" },
      { type: "ok", en: "I am playing football.", ar: "أنا ألعب كرة القدم الآن." },
      { type: "bad", en: "They is watching TV.", why: "مع They نستخدم are وليس is" },
      { type: "ok", en: "They are watching TV.", ar: "هم يشاهدون التلفاز الآن." },
    ],
  },

  // ---------------- التمارين ----------------
  {
    kind: "ex",
    section: F,
    mascot: "✏️",
    badge: "التمرين 1",
    title: "اختر فعل الكينونة الصحيح",
    subtitle: "تذكّر: من هو الفاعل؟",
    ex: {
      type: "choose",
      items: [
        { s: "I", v: "playing", o: "football", ar: "أنا ألعب كرة القدم الآن.", opts: ["am", "is", "are"], answer: 0 },
        { s: "He", v: "reading", o: "a book", ar: "هو يقرأ كتابًا الآن.", opts: ["am", "is", "are"], answer: 1 },
        { s: "They", v: "swimming", ar: "هم يسبحون الآن.", opts: ["am", "is", "are"], answer: 2 },
        { s: "She", v: "cooking", o: "lunch", ar: "هي تطبخ الغداء الآن.", opts: ["am", "is", "are"], answer: 1 },
        { s: "We", v: "studying", o: "English", ar: "نحن ندرس الإنجليزية الآن.", opts: ["am", "is", "are"], answer: 2 },
        { s: "You", v: "writing", o: "an email", ar: "أنت تكتب رسالة الآن.", opts: ["am", "is", "are"], answer: 2 },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "🧮",
    badge: "التمرين 2",
    title: "اختر صيغة ing الصحيحة",
    subtitle: "انتبه للقاعدة: أضف · احذف e · ضاعف الحرف",
    ex: {
      type: "ing",
      items: [
        { verb: "play", opts: ["playing", "playeing", "plaing"], answer: 0 },
        { verb: "write", opts: ["writeing", "writting", "writing"], answer: 2 },
        { verb: "run", opts: ["runing", "running", "runeing"], answer: 1 },
        { verb: "make", opts: ["makeing", "making", "makking"], answer: 1 },
        { verb: "swim", opts: ["swiming", "swimming", "swimeing"], answer: 1 },
        { verb: "study", opts: ["studing", "studyeing", "studying"], answer: 2 },
        { verb: "sit", opts: ["siting", "sitting", "siteing"], answer: 1 },
        { verb: "dance", opts: ["danceing", "dancing", "dancining"], answer: 1 },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "👀",
    badge: "التمرين 3",
    title: "اختر كلمة الآن المناسبة",
    subtitle: "فكّر في السياق",
    ex: {
      type: "signal",
      items: [
        { stem: "___! The baby is crying.", ar: "تنبيه صوتي — استمع!", opts: ["Listen", "Usually"], answer: 0 },
        { stem: "I am busy ___.", ar: "في الوقت الحالي", opts: ["at the moment", "every day"], answer: 0 },
        { stem: "___! A cat is on the roof.", ar: "تنبيه بصري — انظر!", opts: ["Look", "Often"], answer: 0 },
        { stem: "She is sleeping ___.", ar: "في هذه اللحظة", opts: ["right now", "always"], answer: 0 },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "🩹",
    badge: "التمرين 4",
    title: "صحّح الخطأ",
    subtitle: "كل جملة فيها خطأ واحد",
    ex: {
      type: "fix",
      items: [
        { wrong: "She cooking now.", correct: "She is cooking now.", why: "ناقص is" },
        { wrong: "I is reading a book.", correct: "I am reading a book.", why: "مع I ← am" },
        { wrong: "They is playing football.", correct: "They are playing football.", why: "مع They ← are" },
        { wrong: "He is writeing a letter.", correct: "He is writing a letter.", why: "احذف e ← writing" },
        { wrong: "We are runing fast.", correct: "We are running fast.", why: "ضاعف الحرف ← running" },
        { wrong: "Does she studying now?", correct: "Is she studying now?", why: "لا نستخدم does مع Present Continuous" },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "🔀",
    badge: "التمرين 5",
    title: "رتّب الجملة",
    subtitle: "انتبه لمكان فعل الكينونة",
    ex: {
      type: "order",
      items: [
        { words: ["playing", "is", "He", "football"], correct: ["He", "is", "playing", "football"], ar: "هو يلعب كرة القدم الآن." },
        { words: ["studying", "are", "English", "They"], correct: ["They", "are", "studying", "English"], ar: "هم يدرسون الإنجليزية الآن." },
        { words: ["am", "I", "not", "sleeping"], correct: ["I", "am", "not", "sleeping"], ar: "أنا لا أنام الآن." },
        { words: ["she", "Is", "cooking"], correct: ["Is", "she", "cooking"], ar: "هل هي تطبخ الآن؟" },
        { words: ["running", "dog", "The", "is"], correct: ["The", "dog", "is", "running"], ar: "الكلب يركض الآن." },
      ],
    },
  },
  {
    kind: "ex",
    section: F,
    mascot: "🕵️",
    badge: "التمرين 6",
    title: "الآن أم عادة؟",
    subtitle: "حدّد نوع الجملة",
    ex: {
      type: "usage",
      items: [
        { en: "I am eating breakfast now.", ar: "أنا أتناول الفطور الآن.", answer: "now" },
        { en: "She usually drinks coffee.", ar: "هي عادةً تشرب القهوة.", answer: "habit" },
        { en: "Look! He is running.", ar: "انظر! هو يركض.", answer: "now" },
        { en: "They play football every Friday.", ar: "هم يلعبون كرة القدم كل جمعة.", answer: "habit" },
        { en: "We are studying at the moment.", ar: "نحن ندرس في الوقت الحالي.", answer: "now" },
      ],
    },
  },

  { kind: "iq", section: F, mascot: "🏆", title: "تحدي IQ200" },
  { kind: "builder", section: F, mascot: "🎨", title: "تحدي إضافي: ماذا تفعل الآن؟" },

  { kind: "summary", section: G, mascot: "🧠", title: "ملخص الدرس 9" },
  { kind: "quiz", section: G, mascot: "📝", title: "الاختبار النهائي" },
  { kind: "closing", section: G, mascot: "⏭️", title: "الدرس القادم" },
];

export const IQ9: { wrong: string; correct: string; why: string }[] = [
  { wrong: "I is watching a movie.", correct: "I am watching a movie.", why: "مع I ← am دائمًا" },
  { wrong: "She writeing a letter.", correct: "She is writing a letter.", why: "ناقص is + احذف e قبل ing" },
  { wrong: "They am playing chess.", correct: "They are playing chess.", why: "مع They ← are" },
  { wrong: "He is siting on the chair.", correct: "He is sitting on the chair.", why: "ضاعف الحرف t ← sitting" },
  { wrong: "Does he swimming now?", correct: "Is he swimming now?", why: "لا نستخدم does مع Present Continuous" },
  { wrong: "We not are studying.", correct: "We are not studying.", why: "not تأتي بعد are وليس قبلها" },
];
