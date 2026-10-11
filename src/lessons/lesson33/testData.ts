// ============================================================
// testData33 — الاختبار النهائي للدرس 33 (من قسم المصدر ⑳)
// Present Tenses Master Test — 25 سؤالًا في خمسة مستويات:
//   ① اختيار الزمن (1–5) ② لغز الوقت (6–10) ③ صيد الأخطاء (11–15)
//   ④ اختيار المعنى (16–20) ⑤ التحدي النهائي — فقرة Mia (21–25)
// البيانات محايدة: لا تكشف الإجابة الصحيحة للمتعلم قبل الإرسال.
// مفاتيح الحلول غير منصوصة في المصدر ← مشتقة وفق قواعد الدرس.
// ============================================================

export type Q33 =
  | { type: "typed"; ar: string; before: string; after: string; verb: string; accept: string[]; why: string }
  | { type: "spot"; ar: string; segments: string[]; bad: number; fix: string; why: string }
  | { type: "single"; ar: string; options: string[]; answer: number; why: string }
  | { type: "match"; ar: string; pairs: { left: string; right: string }[]; why: string };

export const TEST_33_TITLE = "🏆 الاختبار النهائي — Present Tenses Master Test";
export const TEST_33_MIN = 20;
export const TEST_33_MAX = 30;

export type TestLevel33 = {
  id: string;
  n: string;
  name: string;
  cls: string;
  range: string;
  blurb: string;
  questions: Q33[];
};

export const TEST_LEVELS_33: TestLevel33[] = [
  {
    id: "a",
    n: "المستوى الأول",
    name: "اختيار الزمن",
    cls: "bg-emerald-600",
    range: "الأسئلة 1–5",
    blurb: "اكتب صيغة الفعل بين القوسين في الزمن الأنسب.",
    questions: [
      { type: "typed", ar: "My father usually ______ at 6:00.", before: "My father usually", after: "at 6:00.", verb: "wake up", accept: ["wakes up"], why: "usually ← عادة ← البسيط، والمفرد الغائب يأخذ s." },
      { type: "typed", ar: "Listen! The baby ______.", before: "Listen! The baby", after: ".", verb: "sleep", accept: ["is sleeping"], why: "Listen! ← صوت/مشهد جارٍ ← المستمر." },
      { type: "typed", ar: "We ______ our grandmother twice this year.", before: "We", after: "our grandmother twice this year.", verb: "visit", accept: ["have visited"], why: "twice this year ← عدد زيارات حتى الآن ← خبرة ← التام." },
      { type: "typed", ar: "Ahmed ______ the car since noon.", before: "Ahmed", after: "the car since noon.", verb: "repair", accept: ["has been repairing"], why: "since noon ← نشاط ممتد ← التام المستمر." },
      { type: "typed", ar: "The earth ______ around the sun.", before: "The earth", after: "around the sun.", verb: "move", accept: ["moves"], why: "حقيقة علمية ثابتة ← البسيط + s." },
    ],
  },
  {
    id: "b",
    n: "المستوى الثاني",
    name: "لغز الوقت",
    cls: "bg-amber-600",
    range: "الأسئلة 6–10",
    blurb: "اقرأ التلميح الزمني بعناية ثم اكتب الصيغة الصحيحة.",
    questions: [
      { type: "typed", ar: "I ______ my book yet.", before: "I", after: "my book yet.", verb: "not finish", accept: ["haven't finished", "have not finished"], why: "yet مع النفي ← التام البسيط المنفي." },
      { type: "typed", ar: "They ______ right now.", before: "They", after: "right now.", verb: "laugh", accept: ["are laughing"], why: "right now ← الآن ← المستمر." },
      { type: "typed", ar: "She ______ German for four months.", before: "She", after: "German for four months.", verb: "study", accept: ["has been studying"], why: "for four months ← نشاط ممتد ← التام المستمر." },
      { type: "typed", ar: "My uncle ______ this shop since 2015.", before: "My uncle", after: "this shop since 2015.", verb: "own", accept: ["has owned"], why: "own فعل حالة ← التام البسيط مع since، لا مستمر له." },
      { type: "typed", ar: "The scientists ______ six experiments so far.", before: "The scientists", after: "six experiments so far.", verb: "complete", accept: ["have completed"], why: "ستة تجارب so far ← حصيلة مكتملة ← التام." },
    ],
  },
  {
    id: "c",
    n: "المستوى الثالث",
    name: "صيد الأخطاء",
    cls: "bg-rose-600",
    range: "الأسئلة 11–15",
    blurb: "المس الكلمة الخاطئة في كل جملة (خطأ واحد فقط).",
    questions: [
      { type: "spot", ar: "Does he works daily?", segments: ["Does", "he", "works", "daily?"], bad: 2, fix: "work", why: "بعد Does يعود الفعل إلى V1: work." },
      { type: "spot", ar: "She has been cook since morning.", segments: ["She", "has", "been", "cook", "since", "morning."], bad: 3, fix: "cooking", why: "has been تحتاج V-ing: cooking." },
      { type: "spot", ar: "I am knowing the answer.", segments: ["I", "am", "knowing", "the", "answer."], bad: 1, fix: "know", why: "know فعل حالة ← البسيط: I know (تُحذف am معها knowing)." },
      { type: "spot", ar: "They has already arrived.", segments: ["They", "has", "already", "arrived."], bad: 1, fix: "have", why: "They جمع ← have لا has." },
      { type: "spot", ar: "He has been repair the car for two hours.", segments: ["He", "has", "been", "repair", "the", "car", "for", "two", "hours."], bad: 3, fix: "repairing", why: "has been تحتاج V-ing: repairing." },
    ],
  },
  {
    id: "d",
    n: "المستوى الرابع",
    name: "اختيار المعنى",
    cls: "bg-sky-600",
    range: "الأسئلة 16–20",
    blurb: "أي زمن يحمل المعنى المطلوب بالضبط؟",
    questions: [
      { type: "single", ar: "أريد التأكيد على عادة يومية ثابتة:", options: ["Present Perfect Continuous", "Present Continuous", "Present Perfect", "Present Simple"], answer: 3, why: "العادة الثابتة ← البسيط." },
      { type: "single", ar: "أريد وصف نشاط يحدث في هذه اللحظة بالضبط:", options: ["Present Perfect Continuous", "Present Simple", "Present Continuous", "Present Perfect"], answer: 2, why: "المشهد الحالي ← المستمر." },
      { type: "single", ar: "أريد إبراز إنجاز مكتمل بعدد (خمسة أعمال):", options: ["Present Simple", "Present Perfect", "Present Continuous", "Present Perfect Continuous"], answer: 1, why: "العدد المكتمل ← التام." },
      { type: "single", ar: "أريد إبراز نشاط استمر ساعتين وما زال:", options: ["Present Perfect", "Present Continuous", "Present Simple", "Present Perfect Continuous"], answer: 3, why: "النشاط الممتد حتى الآن ← التام المستمر." },
      { type: "single", ar: "«أعيش هنا منذ ثماني سنوات وما زلت» — الصيغة الأدق للتعبير:", options: ["I have lived here for eight years. فقط هي الصحيحة.", "I have been living here for eight years. فقط هي الصحيحة.", "كلتا الصيغتين صحيحة — والفرق في زاوية التركيز.", "لا تصح أيٌّ منهما هنا."], answer: 2, why: "live يقبل الصيغتين للمدة نفسها (المصدر ⑩/⑮) — فرق تعبير لا فرق صحة." },
    ],
  },
  {
    id: "e",
    n: "المستوى الخامس",
    name: "التحدي النهائي — فقرة Mia",
    cls: "bg-violet-600",
    range: "الأسئلة 21–25",
    blurb: "أكمل فقرة Mia بالأزمنة المناسبة.",
    questions: [
      { type: "typed", ar: "Mia usually ______ after school.", before: "Mia usually", after: "after school.", verb: "practice", accept: ["practices"], why: "usually ← عادة ← البسيط + s." },
      { type: "typed", ar: "This week, she ______ for a regional competition.", before: "This week, she", after: "for a regional competition.", verb: "prepare", accept: ["is preparing"], why: "this week ← نشاط هذه الفترة ← المستمر." },
      { type: "typed", ar: "She ______ three awards so far.", before: "She", after: "three awards so far.", verb: "win", accept: ["has won"], why: "ثلاث جوائز so far ← حصيلة ← التام." },
      { type: "typed", ar: "She ______ with her coach since January.", before: "She", after: "with her coach since January.", verb: "train", accept: ["has been training"], why: "since January ← نشاط ممتد ← التام المستمر." },
      {
        type: "match",
        ar: "وصّل كل فعل بصيغته الصحيحة: Today, she ______ (rehearse) with her team, and she ______ (know) that hard work pays off.",
        pairs: [
          { left: "rehearse", right: "is rehearsing" },
          { left: "know", right: "knows" },
        ],
        why: "Today = نشاط جارٍ الآن ← المستمر (is rehearsing)؛ و know فعل حالة ← البسيط (knows) — لا تقبل المستمر.",
      },
    ],
  },
];

export const TEST_33: Q33[] = TEST_LEVELS_33.flatMap((l) => l.questions);
export const TEST_33_COUNT = TEST_33.length; // 25

/* ---------- التقييم (يُستعمل بعد الإرسال فقط) ---------- */
export function normalizeTestAnswer33(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.,!?؟]/g, "")
    .replace(/['’]/g, "'")
    .replace(/\s+/g, " ");
}

export function isAnswered33(q: Q33, v: unknown): boolean {
  if (q.type === "typed") return typeof v === "string" && v.trim().length > 0;
  if (q.type === "match") return Array.isArray(v) && v.length === q.pairs.length && v.every((x) => typeof x === "string" && x.length > 0);
  return typeof v === "number" && v >= 0;
}

export function gradeOne33(q: Q33, v: unknown): boolean {
  if (q.type === "typed") {
    if (typeof v !== "string") return false;
    return q.accept.some((a) => normalizeTestAnswer33(a) === normalizeTestAnswer33(v));
  }
  if (q.type === "spot") return v === q.bad;
  if (q.type === "match") {
    if (!Array.isArray(v) || v.length !== q.pairs.length) return false;
    return q.pairs.every((p, pi) => (v as string[])[pi] === p.right);
  }
  return v === q.answer;
}

export function answerText33(q: Q33): string {
  if (q.type === "typed") return `${q.accept[0]}`;
  if (q.type === "spot") {
    const fixed = [...q.segments];
    fixed[q.bad] = q.fix;
    return `${fixed.join(" ")} (الخطأ: ${q.segments[q.bad]} ← الصواب: ${q.fix})`;
  }
  if (q.type === "match") return q.pairs.map((p) => `${p.left} → ${p.right}`).join(" · ");
  return q.options[q.answer];
}
