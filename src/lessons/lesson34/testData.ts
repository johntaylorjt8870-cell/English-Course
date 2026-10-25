// ============================================================
// testData34 — الاختبار النهائي للدرس 34 (من قسم المصدر ㉞)
// Future Simple Master Test — 25 سؤالًا في خمسة مستويات:
//   ① البناء الصحيح (1–5) ② أكمل الجمل (6–10) ③ حدد الاستخدام (11–15)
//   ④ صحح الأخطاء (16–20) ⑤ IQ200 — اكتب جملتك (21–25)
// البيانات محايدة: لا تكشف الإجابة الصحيحة للمتعلم قبل الإرسال.
// المستوى الخامس كتابة حرّة ⇒ الإجابات الممكنة مقترحة للتصحيح
// الآلي، ومفتاحها الكامل في منطقة المعلم (تقويم بشري).
// ============================================================

export type Q34 =
  | { type: "single"; ar: string; options: string[]; answer: number; why: string }
  | { type: "typed"; ar: string; before: string; after: string; verb: string; accept: string[]; why: string }
  | { type: "spot"; ar: string; segments: string[]; bad: number; fix: string; drop?: number; why: string }
  | { type: "write"; ar: string; hint: string; accept: string[]; why: string };

export const TEST_34_TITLE = "🏆 الاختبار النهائي — Future Simple Master Test";
export const TEST_34_MIN = 20;
export const TEST_34_MAX = 30;

export type TestLevel34 = {
  id: string;
  n: string;
  name: string;
  cls: string;
  range: string;
  blurb: string;
  /** أسطر التمهيد كما وردت في المصدر تحت عنوان المستوى */
  intro?: string[];
  questions: Q34[];
};

export const TEST_LEVELS_34: TestLevel34[] = [
  {
    id: "a",
    n: "المستوى الأول",
    name: "البناء الصحيح",
  intro: ["اختر الإجابة المناسبة."],
    cls: "bg-teal-600",
    range: "الأسئلة 1–5",
    blurb: "اختر الإجابة المناسبة.",
    questions: [
      {
        type: "single",
        ar: "① He will ______ the instructions carefully.",
        options: ["reads", "read", "reading"],
        answer: 1,
        why: "بعد will يأتي الشكل الأساسي للفعل V1 دائمًا: read.",
      },
      {
        type: "single",
        ar: "② We ______ be late.",
        options: ["won't", "doesn't", "aren't will"],
        answer: 0,
        why: "النفي من will هو will not = won't، والفعل بعده يبقى be.",
      },
      {
        type: "single",
        ar: "③ ______ Sara join the competition?",
        options: ["Does will", "Will", "Is will"],
        answer: 1,
        why: "السؤال: Will + Subject + V1 — ولا نضيف do/does إلى will.",
      },
      {
        type: "single",
        ar: "④ They will ______ happy.",
        options: ["are", "being", "be"],
        answer: 2,
        why: "بعد will نستخدم الشكل الأساسي be، لا am/is/are.",
      },
      {
        type: "single",
        ar: "⑤ I ______ you tomorrow.",
        options: ["will call", "will calling", "will called"],
        answer: 0,
        why: "will + V1 — لا نضع ing ولا تصريفًا ماضيًا بعد will.",
      },
    ],
  },
  {
    id: "b",
    n: "المستوى الثاني",
    name: "أكمل الجمل",
    cls: "bg-sky-600",
    range: "الأسئلة 6–10",
    blurb: "اكتب الصيغة الصحيحة بين القوسين.",
    questions: [
      {
        type: "typed",
        ar: "⑥ I think the exam ______ easy. (be)",
        before: "I think the exam",
        after: "easy.",
        verb: "be",
        accept: ["will be", "'ll be"],
        why: "توقع مستقبلي ⇒ will + be.",
      },
      {
        type: "typed",
        ar: "⑦ Don't worry. I ______ you. (help)",
        before: "Don't worry. I",
        after: "you.",
        verb: "help",
        accept: ["'ll help", "will help"],
        why: "وعد في المحادثة ⇒ 'll = will (اختصاره) مع V1.",
      },
      {
        type: "typed",
        ar: "⑧ She ______ anyone your secret. (not / tell)",
        before: "She",
        after: "anyone your secret.",
        verb: "not / tell",
        accept: ["won't tell", "will not tell"],
        why: "النفي ⇒ won't + V1، ولا نحتاج do/does.",
      },
      {
        type: "write",
        ar: "⑨ أكمل السؤال: ______ they ______ early? (arrive)",
        hint: "Will + Subject + V1",
        accept: ["will they arrive", "will they arrive early"],
        why: "السؤال ⇒ Will + Subject + V1: Will they arrive early?",
      },
      {
        type: "typed",
        ar: "⑩ We ______ the same mistake again. (not / make)",
        before: "We",
        after: "the same mistake again.",
        verb: "not / make",
        accept: ["won't make", "will not make"],
        why: "النفي ⇒ won't make، والفعل يبقى make.",
      },
    ],
  },
  {
    id: "c",
    n: "المستوى الثالث",
    name: "حدد الاستخدام",
  intro: ["حدد وظيفة will في كل جملة:", "قرار لحظي — وعد — توقع — عرض مساعدة — رفض أو عدم استعداد."],
    cls: "bg-emerald-600",
    range: "الأسئلة 11–15",
    blurb: "حدد وظيفة will في كل جملة.",
    questions: [
      {
        type: "single",
        ar: "⑪ I'll carry your suitcase.",
        options: ["قرار لحظي", "وعد", "توقع", "عرض مساعدة", "رفض أو عدم استعداد"],
        answer: 3,
        why: "عرض المساعدة ⇒ I'll + الفعل.",
      },
      {
        type: "single",
        ar: "⑫ I promise I'll return the money.",
        options: ["قرار لحظي", "وعد", "توقع", "عرض مساعدة", "رفض أو عدم استعداد"],
        answer: 1,
        why: "I promise ← وعد مُعلَن.",
      },
      {
        type: "single",
        ar: "⑬ I think electric cars will become more common.",
        options: ["قرار لحظي", "وعد", "توقع", "عرض مساعدة", "رفض أو عدم استعداد"],
        answer: 2,
        why: "I think + رأي عن مستقبل ⇒ توقع.",
      },
      {
        type: "single",
        ar: "⑭ The computer won't start, although I've tried several times.",
        options: ["قرار لحظي", "وعد", "توقع", "عرض مساعدة", "رفض أو عدم استعداد"],
        answer: 4,
        why: "won't هنا عدم استعداد/عدم استجابة للآلة رغم المحاولة.",
      },
      {
        type: "single",
        ar: "⑮ Someone is knocking. I'll check the door.",
        options: ["قرار لحظي", "وعد", "توقع", "عرض مساعدة", "رفض أو عدم استعداد"],
        answer: 0,
        why: "حدث لحظي (طرق الباب) ← قرار اتخذته الآن.",
      },
    ],
  },
  {
    id: "d",
    n: "المستوى الرابع",
    name: "صحح الأخطاء",
    cls: "bg-rose-600",
    range: "الأسئلة 16–20",
    blurb: "المس الكلمة الخاطئة في كل جملة (خطأ واحد فقط).",
    questions: [
      {
        type: "spot",
        ar: "⑯ He will studies harder.",
        segments: ["He", "will", "studies", "harder."],
        bad: 2,
        fix: "study",
        why: "بعد will يعود الفعل إلى V1: study.",
      },
      {
        type: "spot",
        ar: "⑰ Will she comes tomorrow?",
        segments: ["Will", "she", "comes", "tomorrow?"],
        bad: 2,
        fix: "come",
        why: "بعد Will نستخدم V1: come.",
      },
      {
        type: "spot",
        ar: "⑱ I won't to forget.",
        segments: ["I", "won't", "to", "forget."],
        bad: 2,
        fix: "",
        why: "لا to بين will والفعل: I won't forget.",
      },
      {
        type: "spot",
        ar: "⑲ They will are successful.",
        segments: ["They", "will", "are", "successful."],
        bad: 2,
        fix: "be",
        why: "بعد will نستخدم be لا are.",
      },
      {
        type: "spot",
        ar: "⑳ Does your father will help us?",
        segments: ["Does", "your", "father", "will", "help", "us?"],
        bad: 0,
        fix: "Will",
        drop: 3,
        why: "السؤال بـ Will وحدها: Will your father help us?",
      },
    ],
  },
  {
    id: "e",
    n: "المستوى الخامس",
    name: "IQ200",
  intro: ["اقرأ الموقف، ثم اكتب جملة مناسبة باستخدام will."],
    cls: "bg-violet-600",
    range: "الأسئلة 21–25",
    blurb: "اقرأ الموقف، ثم اكتب جملة مناسبة باستخدام will.",
    questions: [
      {
        type: "write",
        ar: "㉑ صديقك عطشان، وقررت الآن إحضار الماء له.",
        hint: "قرار لحظي — I'll + V1",
        accept: ["i'll get you some water", "i'll bring you some water", "i'll get you water", "i'll bring you water"],
        why: "قرار اتخذته الآن استجابةً للموقف ⇒ will في صيغتها المختصرة.",
      },
      {
        type: "write",
        ar: "㉒ تريد أن تعد معلمك بأنك لن تتأخر مجددًا.",
        hint: "وعد منفي — won't + V1",
        accept: [
          "i promise i won't be late again",
          "i won't be late again",
          "i promise i will not be late again",
          "i promise i won't be late anymore",
        ],
        why: "وعد بالنفي ⇒ won't + be + …",
      },
      {
        type: "write",
        ar: "㉓ تريد أن تعبّر عن توقعك بأن التكنولوجيا ستغيّر طريقة تعلمنا.",
        hint: "توقع — I think … will + V1",
        accept: [
          "i think technology will change the way we learn",
          "technology will change the way we learn",
          "i think technology will change how we learn",
        ],
        why: "توقع ⇒ I think + … will + V1.",
      },
      {
        type: "write",
        ar: "㉔ تريد أن تسأل صديقك إن كان سيشارك في المسابقة.",
        hint: "سؤال — Will + Subject + V1?",
        accept: [
          "will you take part in the competition",
          "will you join the competition",
          "will you participate in the competition",
          "will you enter the competition",
        ],
        why: "السؤال ⇒ Will + you + V1 …?",
      },
      {
        type: "write",
        ar: "㉕ تريد أن تسأل: متى ستبدأ الرحلة؟",
        hint: "Wh-word + will + Subject + V1?",
        accept: ["when will the trip start", "when will the trip begin", "when will the journey start", "when will the journey begin"],
        why: "سؤال Wh ⇒ When + will + Subject + V1?",
      },
    ],
  },
];

export const TEST_34: Q34[] = TEST_LEVELS_34.flatMap((l) => l.questions);
export const TEST_34_COUNT = TEST_34.length; // 25

/* ---------- التقييم (يُستعمل بعد الإرسال فقط) ---------- */
export function normalizeTestAnswer34(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.,!?؟]/g, "")
    .replace(/['’]/g, "'")
    .replace(/\s+/g, " ");
}

export function isAnswered34(q: Q34, v: unknown): boolean {
  if (q.type === "write") return typeof v === "string" && v.trim().length > 0;
  if (q.type === "typed") return typeof v === "string" && v.trim().length > 0;
  return typeof v === "number" && v >= 0;
}

export function gradeOne34(q: Q34, v: unknown): boolean {
  if (q.type === "typed" || q.type === "write") {
    if (typeof v !== "string") return false;
    return q.accept.some((a) => normalizeTestAnswer34(a) === normalizeTestAnswer34(v));
  }
  if (q.type === "spot") return v === q.bad;
  return v === q.answer;
}

/** أسئلة المستوى الخامس كتابة حرّة ⇒ التصحيح النهائي للمعلم */
export function isHumanGraded34(q: Q34): boolean {
  return q.type === "write";
}

export function answerText34(q: Q34): string {
  if (q.type === "typed") return q.accept[0];
  if (q.type === "write") return q.accept[0];
  if (q.type === "spot") {
    const fixed = q.segments
      .map((s, i) => (i === q.bad ? q.fix : i === q.drop ? "" : s))
      .filter((s) => s.length > 0);
    return `${fixed.join(" ")} (الخطأ: ${q.segments[q.bad] || "—"} ← الصواب: ${q.fix || "حذف الكلمة"})`;
  }
  return q.options[q.answer];
}
