// ============================================================
// Lesson 35 — Future Plans Master Test (§34) — exactly 25 questions,
// five supplied levels. The source supplies the questions but no answer
// key; every answer and explanation below is platform/teacher-derived
// from the lesson's own grammar rules (§2–§32) and the question context.
//
// Scoring contract:
//   • 20 objective items are graded automatically (with accepted variants);
//   • 5 production items are checked against a transparent structural
//     pattern, and always receive a model answer for human comparison.
//   No answer, hint, or model is rendered before submission.
// ============================================================

export type TestLevel35 = {
  id: string;
  title: string;
  range: string;
  instruction?: string;
  questions: TestQuestion35[];
};

export type TestSingle35 = {
  n: number;
  type: "single";
  promptLines: string[];
  options: string[];
  answer: number;
  correctText: string;
  why: string;
  concept: string;
  trap: string;
  alternatives?: string[];
};

export type TestTyped35 = {
  n: number;
  type: "typed" | "repair";
  promptLines: string[];
  accept: string[];
  answer: string;
  why: string;
  concept: string;
  trap: string;
  alternatives?: string[];
};

export type TestWrite35 = {
  n: number;
  type: "write";
  promptLines: string[];
  modelAnswers: string[];
  answer: string;
  why: string;
  concept: string;
  trap: string;
  patterns: RegExp[];
  alternatives?: string[];
};

export type TestQuestion35 = TestSingle35 | TestTyped35 | TestWrite35;

export const TEST_INTRO_35 = [
  "يتكون الاختبار من 25 سؤالًا، موزعة على خمسة مستويات.",
  "حاول الإجابة عن جميع الأسئلة قبل فتح الحلول.",
];

export const TEST_LEVELS_35: TestLevel35[] = [
  {
    id: "level-1",
    title: "المستوى الأول: اختر الإجابة الصحيحة",
    range: "الأسئلة 1–5",
    questions: [
      {
        n: 1,
        type: "single",
        promptLines: ["① She ______ going to learn coding."],
        options: ["am", "is", "are"],
        answer: 1,
        correctText: "B. is",
        why: "الفاعل She مفرد غائب، لذلك نستخدم is: She is going to learn coding.",
        concept: "اختيار المساعد am / is / are",
        trap: "اختيار are لأن الطالب يرى going to ولا ينظر إلى الفاعل.",
      },
      {
        n: 2,
        type: "single",
        promptLines: ["② They are going to ______ a new project."],
        options: ["starting", "started", "start"],
        answer: 2,
        correctText: "C. start",
        why: "بعد going to يأتي الفعل الأساسي V1 دائمًا، وليس V-ing أو V2.",
        concept: "V1 بعد going to",
        trap: "starting تبدو طبيعية بعد are، لكن going to تحتاج الفعل الأساسي.",
      },
      {
        n: 3,
        type: "single",
        promptLines: ["③ ______ you going to attend the meeting?"],
        options: ["Do", "Are", "Will"],
        answer: 1,
        correctText: "B. Are",
        why: "سؤال BE GOING TO يبدأ بالمساعد Are قبل you: Are you going to attend…? ولا نستخدم Do أو Will مع going to.",
        concept: "ترتيب سؤال Yes/No",
        trap: "Do you going to…? خطأ شائع؛ وWill you going to…? يجمع صيغتين.",
      },
      {
        n: 4,
        type: "single",
        promptLines: ["④ He isn't going to ______ the invitation."],
        options: ["accept", "accepts", "accepted"],
        answer: 0,
        correctText: "A. accept",
        why: "بعد going to نستخدم V1: accept، حتى مع He وحتى في النفي.",
        concept: "V1 بعد going to في النفي",
        trap: "accepts لأن الفاعل He؛ لكن s تُضاف في المضارع البسيط لا بعد going to.",
      },
      {
        n: 5,
        type: "single",
        promptLines: ["⑤ I'm going to ______ ready early."],
        options: ["am", "be", "being"],
        answer: 1,
        correctText: "B. be",
        why: "لوصف حالة مستقبلية نستخدم going to + be. الفعل الأساسي هو be، ولا نكرر am.",
        concept: "going to + be",
        trap: "am لأن الجملة تبدو كأنها تحتاج مساعدًا ثانيًا.",
      },
    ],
  },
  {
    id: "level-2",
    title: "المستوى الثاني: أكمل الجمل",
    range: "الأسئلة 6–10",
    instruction: "أكمل الجمل بالصيغة المناسبة. يمكن كتابة الجزء الناقص فقط أو الجملة كاملة.",
    questions: [
      {
        n: 6,
        type: "typed",
        promptLines: ["⑥ We ______ (visit) the botanical garden next Sunday. We planned it yesterday."],
        accept: ["are going to visit", "we are going to visit", "we're going to visit", "are going to visit the botanical garden"],
        answer: "are going to visit",
        why: "الخطة اتُّخذت أمس (We planned it yesterday)، أي نية سابقة. الفاعل We يأخذ are، والفعل visit يبقى V1.",
        concept: "خطة سابقة",
        trap: "استخدام will لأن الجملة عن المستقبل؛ الزمن وحده لا يحدد الصيغة.",
        alternatives: ["are going to visit", "We are going to visit", "We're going to visit"],
      },
      {
        n: 7,
        type: "typed",
        promptLines: ["⑦ Look at that cyclist! He ______ (fall)!"],
        accept: ["is going to fall", "he is going to fall", "he's going to fall"],
        answer: "is going to fall",
        why: "الدرّاج مرئي أمامنا الآن؛ التوقع مبني على دليل حاضر. He يأخذ is + going to + fall.",
        concept: "توقع مبني على دليل",
        trap: "will fall مقبولة نحويًا لكنها لا تبرز الدليل الحاضر الذي يطلبه الموقف.",
        alternatives: ["is going to fall", "He is going to fall", "He's going to fall"],
      },
      {
        n: 8,
        type: "typed",
        promptLines: ["⑧ I ______ (not / buy) a new phone this month. I've already decided."],
        accept: ["am not going to buy", "'m not going to buy", "i'm not going to buy", "i am not going to buy"],
        answer: "am not going to buy",
        why: "المتحدث قال I've already decided، فهي نية سابقة منفية: am not going to buy. لا نستخدم don't.",
        concept: "نفي النية السابقة",
        trap: "don't buy (مضارع بسيط) أو won't buy (وعد/قرار) — كلاهما يغيّر المعنى.",
        alternatives: ["am not going to buy", "I'm not going to buy"],
      },
      {
        n: 9,
        type: "typed",
        promptLines: ["⑨ ______ she ______ (take) a language course next summer?"],
        accept: ["is she going to take", "is she going to take a language course next summer"],
        answer: "Is she going to take",
        why: "سؤال Yes/No: نضع is قبل she، ثم going to + take (V1).",
        concept: "سؤال Yes/No",
        trap: "Does she going to take? — لا do/does مع going to.",
        alternatives: ["Is she going to take", "Is she going to take a language course next summer?"],
      },
      {
        n: 10,
        type: "typed",
        promptLines: ["⑩ They ______ (organize) a charity event. The preparations have already started."],
        accept: ["are going to organize", "they are going to organize", "they're going to organize"],
        answer: "are going to organize",
        why: "التحضيرات بدأت بالفعل، فهي خطة قائمة: are going to organize. الفعل organize يبقى V1.",
        concept: "خطة بدأت تحضيراتها",
        trap: "will organize تفيد قرارًا/إعلانًا ولا تبرز أن الترتيبات بدأت.",
        alternatives: ["are going to organize", "They are going to organize", "They're going to organize"],
      },
    ],
  },
  {
    id: "level-3",
    title: "المستوى الثالث: WILL أم GOING TO؟",
    range: "الأسئلة 11–15",
    instruction: "اختر الصيغة الأنسب بحسب الموقف. اكتب will أو is going to أو are going to.",
    questions: [
      {
        n: 11,
        type: "typed",
        promptLines: ["⑪ A: The phone is ringing!", "B: I ______ answer it."],
        accept: ["will", "'ll", "i will", "i'll"],
        answer: "will",
        why: "الحدث (رنين الهاتف) ظهر الآن، والقرار يُتخذ في لحظة الكلام؛ لذلك will (أو 'll) هو الأنسب.",
        concept: "قرار لحظي",
        trap: "am going to answer — تفيد أن القرار كان مسبقًا، وهذا يخالف الموقف.",
        alternatives: ["will", "'ll", "I will", "I'll"],
      },
      {
        n: 12,
        type: "typed",
        promptLines: ["⑫ Look at the sky! It ______ snow."],
        accept: ["is going to", "'s going to"],
        answer: "is going to",
        why: "Look at the sky دليل حاضر، لذلك توقع بـ is going to + snow.",
        concept: "توقع من دليل حاضر",
        trap: "will snow مقبولة كتوقع عام، لكن الموقف يبرز الدليل المرئي.",
        alternatives: ["is going to", "'s going to"],
      },
      {
        n: 13,
        type: "typed",
        promptLines: ["⑬ I promise I ______ help you."],
        accept: ["will", "'ll", "i will", "i'll"],
        answer: "will",
        why: "I promise تصريح وعد، والوعد من الاستخدامات النموذجية لـ will.",
        concept: "وعد",
        trap: "am going to help — تصف نية، لكنها لا تحمل قوة الوعد نفسه.",
        alternatives: ["will", "'ll", "I will", "I'll"],
      },
      {
        n: 14,
        type: "typed",
        promptLines: ["⑭ We have already booked the tickets. We ______ travel next Friday."],
        accept: ["are going to", "'re going to"],
        answer: "are going to",
        why: "حجز التذاكر دليل على ترتيب مسبق؛ لذلك are going to travel.",
        concept: "ترتيب/خطة سابقة",
        trap: "will travel — يمكن استخدامها للإعلان، لكن الموقف يبرز ترتيبًا قائمًا.",
        alternatives: ["are going to", "'re going to"],
      },
      {
        n: 15,
        type: "typed",
        promptLines: ["⑮ I think the new invention ______ change people's lives."],
        accept: ["will", "'ll"],
        answer: "will",
        why: "I think يقدّم اعتقادًا/توقعًا عامًا، وهو الاستخدام النموذجي لـ will.",
        concept: "توقع/اعتقاد",
        trap: "is going to change — ممكنة في سياق فيه دليل، لكن العبارة هنا رأي.",
        alternatives: ["will", "'ll"],
      },
    ],
  },
  {
    id: "level-4",
    title: "المستوى الرابع: Grammar Detective",
    range: "الأسئلة 16–20",
    instruction: "صحح الأخطاء. اكتب الجملة كاملة بعد التصحيح.",
    questions: [
      {
        n: 16,
        type: "repair",
        promptLines: ["⑯ She are going to study medicine."],
        accept: ["she is going to study medicine", "she's going to study medicine"],
        answer: "She is going to study medicine.",
        why: "She مفرد غائب، لذلك is لا are.",
        concept: "تطابق المساعد مع الفاعل",
        trap: "تصحيح going to بدل تصحيح are.",
      },
      {
        n: 17,
        type: "repair",
        promptLines: ["⑰ They going to build a house."],
        accept: ["they are going to build a house", "they're going to build a house"],
        answer: "They are going to build a house.",
        why: "الجملة تفتقد المساعد are: They are going to build a house.",
        concept: "المساعد المفقود",
        trap: "إضافة do أو will بدل are.",
      },
      {
        n: 18,
        type: "repair",
        promptLines: ["⑱ Is he going to buys a new laptop?"],
        accept: ["is he going to buy a new laptop", "is he going to buy a new laptop?"],
        answer: "Is he going to buy a new laptop?",
        why: "بعد going to نستخدم V1: buy، لا buys. ترتيب السؤال صحيح.",
        concept: "V1 بعد going to",
        trap: "تغيير Is إلى Does بدل تصحيح buys.",
      },
      {
        n: 19,
        type: "repair",
        promptLines: ["⑲ I am going to am a scientist."],
        accept: ["i am going to be a scientist", "i'm going to be a scientist"],
        answer: "I am going to be a scientist.",
        why: "الفعل بعد going to هو be (V1)، ولا نكرر am.",
        concept: "going to + be",
        trap: "حذف going to بالكامل.",
      },
      {
        n: 20,
        type: "repair",
        promptLines: ["⑳ Does she going to travel tomorrow?"],
        accept: ["is she going to travel tomorrow", "is she going to travel tomorrow?"],
        answer: "Is she going to travel tomorrow?",
        why: "لا نستخدم does مع going to؛ ننقل is قبل she: Is she going to travel…?",
        concept: "سؤال Yes/No",
        trap: "إبقاء Does وتغيير going إلى go.",
      },
    ],
  },
  {
    id: "level-5",
    title: "المستوى الخامس: IQ200",
    range: "الأسئلة 21–25",
    instruction: "اكتب جملة إنجليزية مناسبة لكل موقف.",
    questions: [
      {
        n: 21,
        type: "write",
        promptLines: ["㉑ قررت منذ أسبوع أن تبدأ تعلم اللغة الألمانية الشهر القادم."],
        modelAnswers: ["I'm going to start learning German next month.", "I am going to learn German next month."],
        answer: "I'm going to start learning German next month.",
        why: "قرار اتُّخذ منذ أسبوع ← نية سابقة ← be going to. next month تعبير زمني مناسب.",
        concept: "خطة سابقة",
        trap: "I will learn German next month — ممكنة كإعلان، لكن الموقف يؤكد القرار السابق.",
        patterns: [/going to/i, /german/i, /next month/i],
        alternatives: ["I'm going to learn German next month.", "Next month I'm going to start a German course."],
      },
      {
        n: 22,
        type: "write",
        promptLines: ["㉒ ترى طفلًا يقترب من حافة مرتفعة، وتتوقع أنه سيسقط."],
        modelAnswers: ["The child is going to fall.", "That child is going to fall!"],
        answer: "The child is going to fall.",
        why: "دليل مرئي الآن (طفل قرب حافة) ← توقع بـ be going to.",
        concept: "توقع مبني على دليل",
        trap: "The child will fall — توقع عام لا يبرز الدليل الحاضر.",
        patterns: [/going to/i, /fall/i],
        alternatives: ["He's going to fall!", "That child is going to fall."],
      },
      {
        n: 23,
        type: "write",
        promptLines: ["㉓ صديقك يحتاج إلى المساعدة، وقررت الآن مساعدته."],
        modelAnswers: ["I'll help you.", "I will help you."],
        answer: "I'll help you.",
        why: "قرار اتُّخذ الآن استجابةً للطلب ← will (أو 'll).",
        concept: "قرار لحظي",
        trap: "I'm going to help you — قد تفيد نية سابقة، وهذا يخالف «قررت الآن».",
        patterns: [/\b(i'?ll|i will)\b/i, /help/i],
        alternatives: ["I'll help you with that.", "Don't worry, I'll help you."],
      },
      {
        n: 24,
        type: "write",
        promptLines: ["㉔ تريد أن تسأل صديقك: ماذا تنوي أن تفعل خلال العطلة الصيفية؟"],
        modelAnswers: ["What are you going to do during the summer holiday?", "What are you going to do in the summer vacation?"],
        answer: "What are you going to do during the summer holiday?",
        why: "سؤال Wh عن نية: What + are + you + going to + do…؟",
        concept: "سؤال Wh عن خطة",
        trap: "What will you do…? يسأل عن قرار/توقع لا عن نية قائمة.",
        patterns: [/what are you going to/i, /(summer|holiday|vacation)/i],
        alternatives: ["What are you going to do this summer?", "What are you going to do in the summer holiday?"],
      },
      {
        n: 25,
        type: "write",
        promptLines: ["㉕ تريد أن تقول إنك تعتقد أن التعليم سيتغير كثيرًا في المستقبل."],
        modelAnswers: ["I think education will change a lot in the future.", "I think education will change significantly in the future."],
        answer: "I think education will change a lot in the future.",
        why: "I think + توقع عام ← will. in the future تعبير زمني مناسب.",
        concept: "توقع/اعتقاد",
        trap: "Education is going to change — ممكنة مع دليل، لكن الموقف رأي.",
        patterns: [/think/i, /will/i, /(education|school|learning)/i],
        alternatives: ["I believe education will change a lot in the future."],
      },
    ],
  },
];

export const TEST_35: TestQuestion35[] = TEST_LEVELS_35.flatMap((level) => level.questions);
export const TEST_35_COUNT = TEST_35.length;
export const TEST_LEVEL_COUNT_35 = TEST_LEVELS_35.length;

export function normalizeAnswer35(value: string) {
  return value
    .replace(/[\u200e\u200f\u202a-\u202e]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[.,!?؟:;()]/g, "")
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, " ");
}

export function isAnswered35(question: TestQuestion35, value: unknown): boolean {
  if (question.type === "single") return typeof value === "number" && value >= 0;
  return typeof value === "string" && value.trim().length > 0;
}

export function gradeObjective35(question: TestQuestion35, value: unknown): boolean | null {
  if (question.type === "write") return null;
  if (question.type === "single") return value === question.answer;
  if (typeof value !== "string") return false;
  const normalized = normalizeAnswer35(value);
  return question.accept.some((acceptable) => normalizeAnswer35(acceptable) === normalized);
}

/** Structural self-check for the five production items (never a hidden "single right answer"). */
export type ProductionGrade35 = "verified" | "review" | "empty";

export function gradeProduction35(question: TestWrite35, value: unknown): ProductionGrade35 {
  if (typeof value !== "string" || !value.trim()) return "empty";
  return question.patterns.every((pattern) => pattern.test(value)) ? "verified" : "review";
}

export function answerText35(question: TestQuestion35): string {
  return question.type === "single" ? question.correctText : question.answer;
}

export type TestSolution35 = {
  n: number;
  level: string;
  prompt: string;
  answer: string;
  alternatives: string[];
  explanation: string;
  concept: string;
  trap: string;
  sourceStatus: "platform-derived";
};

export const TEST_SOLUTIONS_35: TestSolution35[] = TEST_LEVELS_35.flatMap((level) =>
  level.questions.map((question) => ({
    n: question.n,
    level: level.title,
    prompt: question.promptLines.join(" "),
    answer: question.type === "write" ? question.modelAnswers.join(" / ") : question.type === "single" ? question.correctText : question.answer,
    alternatives: question.alternatives ?? [],
    explanation: question.why,
    concept: question.concept,
    trap: question.trap,
    sourceStatus: "platform-derived" as const,
  })),
);

export function levelOf35(n: number) {
  return TEST_LEVELS_35.find((level) => level.questions.some((question) => question.n === n));
}
