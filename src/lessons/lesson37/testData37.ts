import { sourceSection37 } from "./ledger37";

export type TestQuestionType37 = "multiple-choice" | "fill" | "repair" | "explain" | "open";
export type TestQuestion37 = {
  n: number;
  type: TestQuestionType37;
  promptLines: string[];
  promptUnitIndexes: number[];
  options?: { label: string; text: string; sourceUnitIndex: number }[];
  /** وسم ㉑…㉕ في المستوى الخامس (اسم الفعل المطلوب إكماله) */
  marker?: { text: string; sourceUnitIndex: number };
  /** وسم حقل الإجابة عندما يختلف عن وسم النوع (مثل «أكمل سؤال الصديقة») */
  fieldLabel?: string;
};
export type TestLevel37 = {
  id: string;
  title: string;
  titleUnitIndex: number;
  instruction?: string;
  instructionUnitIndex?: number;
  questions: TestQuestion37[];
  /** سطور تكمل الفقرة تُعرض بعد أسئلة المستوى الخامس كما وردت */
  trailing?: { text: string; sourceUnitIndex: number }[];
};

const testSource = sourceSection37("s34");
if (!testSource) throw new Error("Lesson 37 formal test source section is missing.");
const testUnits = testSource.units;

/**
 * خريطة وحدات §34: كل سطر مصدري يُستهلك مرة واحدة بالضبط.
 * (لا نفرض ترتيب الاستهلاك لأن أسئلة المستوى الخامس تسير مع سطور الفقرة،
 * لكننا نفرض عدم التكرار وتغطية كل الأسطر — يتحقق منها تدقيق الدرس.)
 */
const usedTestUnits37 = new Set<number>();
function sourceUnit37(text: string): number {
  const index = testUnits.indexOf(text);
  if (index < 0) throw new Error(`Lesson 37 test source unit is missing: ${text}`);
  if (usedTestUnits37.has(index)) throw new Error(`Lesson 37 test source unit used twice: ${text}`);
  usedTestUnits37.add(index);
  return index;
}
const line37 = (text: string) => ({ text, sourceUnitIndex: sourceUnit37(text) });

export const TEST_INTRO_37 = [line37(testUnits[0]), line37(testUnits[1])];

type RawQuestion37 = {
  n: number;
  type: TestQuestionType37;
  promptLines: string[];
  options?: string[];
  marker?: string;
  fieldLabel?: string;
};
type RawLevel37 = {
  id: string;
  title: string;
  instruction?: string;
  questions: RawQuestion37[];
  trailing?: string[];
};

const rawLevels37: RawLevel37[] = [
  {
    id: "level-1",
    title: "المستوى الأول: اختر الإجابة الصحيحة",
    questions: [
      { n: 1, type: "multiple-choice", promptLines: ["① At 7:00 tomorrow, I will ______ studying."], options: ["A. am", "B. be", "C. being"] },
      { n: 2, type: "multiple-choice", promptLines: ["② She will be ______ dinner at 6:00."], options: ["A. prepare", "B. prepared", "C. preparing"] },
      { n: 3, type: "multiple-choice", promptLines: ["③ ______ they be waiting for us?"], options: ["A. Do", "B. Are", "C. Will"] },
      { n: 4, type: "multiple-choice", promptLines: ["④ He won't be ______ tomorrow morning."], options: ["A. work", "B. working", "C. worked"] },
      { n: 5, type: "multiple-choice", promptLines: ["⑤ This time next week, we ______ be travelling."], options: ["A. will", "B. are", "C. have"] },
    ],
  },
  {
    id: "level-2",
    title: "المستوى الثاني: أكمل الجمل",
    questions: [
      { n: 6, type: "fill", promptLines: ["⑥ At midnight, the children ______ (sleep)."] },
      { n: 7, type: "fill", promptLines: ["⑦ This time tomorrow, I ______ (take) my exam."] },
      { n: 8, type: "fill", promptLines: ["⑧ When you arrive, we ______ (prepare) dinner."] },
      { n: 9, type: "fill", promptLines: ["⑨ She ______ (not / work) at 5:00 tomorrow."] },
      { n: 10, type: "fill", promptLines: ["⑩ ______ they ______ (wait) for us at the station?"] },
    ],
  },
  {
    id: "level-3",
    title: "المستوى الثالث: صحح الأخطاء",
    questions: [
      { n: 11, type: "repair", promptLines: ["⑪ I will studying tomorrow morning."] },
      { n: 12, type: "repair", promptLines: ["⑫ She will is preparing lunch."] },
      { n: 13, type: "repair", promptLines: ["⑬ They won't be play football."] },
      { n: 14, type: "repair", promptLines: ["⑭ When he will arrive, I will be sleeping."] },
      { n: 15, type: "repair", promptLines: ["⑮ What will you doing at 8:00 tomorrow?"] },
    ],
  },
  {
    id: "level-4",
    title: "المستوى الرابع: فهم المعنى",
    questions: [
      {
        n: 16,
        type: "explain",
        promptLines: ["⑯ ما الفرق بين:", "I will study tomorrow.", "I will be studying at 8:00 tomorrow."],
      },
      {
        n: 17,
        type: "explain",
        promptLines: ["⑰ لماذا نستخدم Future Continuous في:", "This time next week, we will be flying to Paris."],
      },
      {
        n: 18,
        type: "explain",
        promptLines: ["⑱ هل نستخدم will بعد when الزمنية في الجملة التالية؟", "When you arrive, I will be waiting."],
      },
      {
        n: 19,
        type: "open",
        promptLines: ["⑲ هل يمكن استخدام Future Continuous دون ذكر ساعة محددة؟ أعطِ مثالًا."],
      },
      {
        n: 20,
        type: "explain",
        promptLines: ["⑳ ما الفرق بين:", "Will you use the computer tonight?", "Will you be using the computer tonight?"],
      },
    ],
  },
  {
    id: "level-5",
    title: "المستوى الخامس: Final IQ200 Boss",
    instruction: "أكمل الفقرة:",
    questions: [
      {
        n: 21,
        type: "fill",
        marker: "㉑ attend",
        promptLines: ["Tomorrow is going to be a busy day for Maya.", "At 8:00, she ______ (attend) an online English lesson."],
      },
      { n: 22, type: "fill", marker: "㉒ work", promptLines: ["At 10:00, she ______ (work) on her science project."] },
      { n: 23, type: "fill", marker: "㉓ prepare", promptLines: ["When her brother arrives, she ______ (prepare) lunch."] },
      {
        n: 24,
        type: "fill",
        marker: "㉔ review",
        promptLines: ["In the afternoon, she is going to visit her grandmother because they arranged the visit yesterday.", "At 7:00 in the evening, she ______ (review) her notes."],
      },
      {
        n: 25,
        type: "fill",
        marker: "㉕ أكمل سؤال الصديقة.",
        fieldLabel: "أكمل سؤال الصديقة",
        promptLines: ["Her friend asks:", "\"What ______ you ______ (do) at 8:00?\""],
      },
    ],
    trailing: ["Maya replies:", "\"I'll be watching a documentary.\"", "الأسئلة:"],
  },
];

export const TEST_LEVELS_37: TestLevel37[] = rawLevels37.map((level) => {
  const titleUnitIndex = sourceUnit37(level.title);
  const instructionUnitIndex = level.instruction ? sourceUnit37(level.instruction) : undefined;
  const questions: TestQuestion37[] = level.questions.map((question) => {
    const promptUnitIndexes = question.promptLines.map((prompt) => sourceUnit37(prompt));
    const options = question.options?.map((option) => ({ label: option.split(".")[0].trim(), text: option, sourceUnitIndex: sourceUnit37(option) }));
    const marker = question.marker ? { text: question.marker, sourceUnitIndex: sourceUnit37(question.marker) } : undefined;
    return {
      n: question.n,
      type: question.type,
      promptLines: question.promptLines,
      promptUnitIndexes,
      options,
      marker,
      fieldLabel: question.fieldLabel,
    };
  });
  return {
    id: level.id,
    title: level.title,
    titleUnitIndex,
    instruction: level.instruction,
    instructionUnitIndex,
    questions,
    trailing: level.trailing?.map((text) => line37(text)),
  };
});

export const TEST_37: TestQuestion37[] = TEST_LEVELS_37.flatMap((level) => level.questions);
export const TEST_COUNT_37 = TEST_37.length;
export const TEST_LEVEL_COUNT_37 = TEST_LEVELS_37.length;

/** كل سطر مصدري في §34 مستهلك مرة واحدة — يُتحقق منه في تدقيق الدرس. */
export const TEST_SOURCE_UNIT_INDEXES_37 = [...usedTestUnits37].sort((a, b) => a - b);
export const TEST_SOURCE_UNIT_TOTAL_37 = testUnits.length;
export { testUnits as TEST_SOURCE_UNITS_37 };

/* ============================================================
   Equivalence-Aware Post-Submission Grading Engine (Q1–Q25)
   يُستخدم فقط بعد ضغط زر «إرسال الاختبار» (submitted === true)
   ============================================================ */

export type QuestionGrade37 = {
  n: number;
  isCorrect: boolean;
  statusLabel: string;
  modelAnswer: string;
  acceptedSummary: string;
  /** شرح عربي واضح لسبب الإجابة */
  explanation: string;
  /** الجملة/الصيغة الإنجليزية النموذجية تُعرض في سطر LTR مستقل */
  example?: string;
};

export type TestGradeSummary37 = {
  total: number;
  correctCount: number;
  percentage: number;
  results: Record<number, QuestionGrade37>;
};

function normEn(value: string): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[\u2018\u2019`]/g, "'")
    .replace(/[\u201c\u201d"]/g, "")
    .replace(/\bwill\s+not\b/g, "won't")
    .replace(/\bi'll\b/g, "i will")
    .replace(/\bshe'll\b/g, "she will")
    .replace(/\bhe'll\b/g, "he will")
    .replace(/\bwe'll\b/g, "we will")
    .replace(/\bthey'll\b/g, "they will")
    .replace(/\byou'll\b/g, "you will")
    .replace(/[.,!?;:/\\—–-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normAr(value: string): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[ً-ٟ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

type Spec37 = {
  modelAnswer: string;
  acceptedSummary: string;
  explanation: string;
  example?: string;
  check: (raw: string) => boolean;
};

const QUESTION_SPECS_37: Record<number, Spec37> = {
  1: {
    modelAnswer: "B. be",
    acceptedSummary: "B · be",
    explanation: "بعد will يأتي الشكل الأساسي be ثم الفعل مع ing، ولا نستخدم am ولا being في هذا الموضع.",
    example: "At 7:00 tomorrow, I will be studying.",
    check: (raw) => ["b", "be", "b be"].includes(normEn(raw)),
  },
  2: {
    modelAnswer: "C. preparing",
    acceptedSummary: "C · preparing (حذف e الصامتة من prepare)",
    explanation: "بعد will be يأتي الفعل بصيغة ing، وتُحذف e الصامتة من prepare فتصبح preparing.",
    example: "She will be preparing dinner at 6:00.",
    check: (raw) => ["c", "preparing", "c preparing"].includes(normEn(raw)),
  },
  3: {
    modelAnswer: "C. Will",
    acceptedSummary: "C · Will",
    explanation: "يبدأ سؤال نعم/لا في المستقبل المستمر بـ will قبل الفاعل، ثم be والفعل مع ing.",
    example: "Will they be waiting for us?",
    check: (raw) => ["c", "will", "c will"].includes(normEn(raw)),
  },
  4: {
    modelAnswer: "B. working",
    acceptedSummary: "B · working",
    explanation: "في النفي يأتي الفعل بصيغة ing بعد won't be، فلا نختار work ولا worked.",
    example: "He won't be working tomorrow morning.",
    check: (raw) => ["b", "working", "b working"].includes(normEn(raw)),
  },
  5: {
    modelAnswer: "A. will",
    acceptedSummary: "A · will",
    explanation: "وجود be travelling بعد الفراغ يكتمل بـ will فقط، فتكون الصيغة will be travelling.",
    example: "This time next week, we will be travelling.",
    check: (raw) => ["a", "will", "a will"].includes(normEn(raw)),
  },
  6: {
    modelAnswer: "will be sleeping",
    acceptedSummary: "will be sleeping · 'll be sleeping · الجملة كاملة",
    explanation: "منتصف الليل لحظة مستقبلية محددة، والنشاط الجاري فيها يُصاغ بـ will be والفعل مع ing.",
    example: "At midnight, the children will be sleeping.",
    check: (raw) => normEn(raw).includes("will be sleeping"),
  },
  7: {
    modelAnswer: "will be taking",
    acceptedSummary: "will be taking · 'll be taking",
    explanation: "في مثل هذا الوقت غدًا ننظر إلى الامتحان كنشاط جارٍ، فالصيغة هي will be taking مع حذف e من take.",
    example: "This time tomorrow, I will be taking my exam.",
    check: (raw) => normEn(raw).includes("will be taking"),
  },
  8: {
    modelAnswer: "will be preparing",
    acceptedSummary: "will be preparing · 'll be preparing · will prepare (تركيز مختلف)",
    explanation: "جملة when الزمنية تأخذ المضارع البسيط arrive، والجملة الرئيسية تصف تحضير العشاء الجاري عند الوصول.",
    example: "When you arrive, we will be preparing dinner.",
    check: (raw) => ["will be preparing", "will prepare", "are going to prepare"].some((value) => normEn(raw).includes(value)),
  },
  9: {
    modelAnswer: "won't be working",
    acceptedSummary: "won't be working · will not be working",
    explanation: "النفي يُبنى بـ will not أو won't، ثم be، ثم الفعل مع ing. لا نستخدم doesn't ولا won't work.",
    example: "She won't be working at 5:00 tomorrow.",
    check: (raw) => normEn(raw).includes("won't be working"),
  },
  10: {
    modelAnswer: "Will … be waiting",
    acceptedSummary: "Will · be waiting · Will they be waiting for us at the station?",
    explanation: "سؤال نعم/لا يضع will قبل الفاعل they، ثم be waiting، وينتهي بعلامة استفهام.",
    example: "Will they be waiting for us at the station?",
    check: (raw) => {
      const c = normEn(raw);
      return c === "will be waiting" || c.includes("will they be waiting") || (c.includes("will") && c.includes("be waiting"));
    },
  },
  11: {
    modelAnswer: "I will be studying tomorrow morning.",
    acceptedSummary: "I will be studying tomorrow morning. · أو تصحيح مختصر: will study",
    explanation: "الخطأ هو غياب be بعد will. التصحيح يضيف be ويُبقي الفعل بصيغة ing، أو يعيد الجملة إلى Future Simple سليمة.",
    example: "I will be studying tomorrow morning.",
    check: (raw) => ["will be studying", "will study"].some((value) => normEn(raw).includes(value)),
  },
  12: {
    modelAnswer: "She will be preparing lunch.",
    acceptedSummary: "She will be preparing lunch. · 'll be preparing",
    explanation: "بعد will لا يأتي is؛ المطلوب الشكل الأساسي be دائمًا مهما كان الفاعل.",
    example: "She will be preparing lunch.",
    check: (raw) => {
      const c = normEn(raw);
      return (c.includes("will be preparing") || c === "be preparing" || c === "be") && !c.includes("will is");
    },
  },
  13: {
    modelAnswer: "They won't be playing football.",
    acceptedSummary: "They won't be playing football. · will not be playing · won't play",
    explanation: "بعد be يجب أن يأتي الفعل بصيغة ing، فتصبح play ← playing.",
    example: "They won't be playing football.",
    check: (raw) => {
      const c = normEn(raw);
      return c.includes("won't be playing") || c.includes("won't play") || c === "playing" || c === "be playing";
    },
  },
  14: {
    modelAnswer: "When he arrives, I will be sleeping.",
    acceptedSummary: "When he arrives… · arrives",
    explanation: "جملة when الزمنية المستقبلية تأخذ المضارع البسيط مع إضافة s للفاعل المفرد، ولا تأخذ will.",
    example: "When he arrives, I will be sleeping.",
    check: (raw) => {
      const c = normEn(raw);
      return (c.includes("when he arrives") || c === "arrives" || c === "he arrives") && !c.includes("when he will");
    },
  },
  15: {
    modelAnswer: "What will you be doing at 8:00 tomorrow?",
    acceptedSummary: "will you be doing · be doing · السؤال كاملًا",
    explanation: "سؤال Wh يحتاج be بين الفاعل you والفعل doing: أداة الاستفهام ثم will ثم الفاعل ثم be ثم الفعل مع ing.",
    example: "What will you be doing at 8:00 tomorrow?",
    check: (raw) => {
      const c = normEn(raw);
      return c.includes("will you be doing") || c === "be doing" || c === "will be doing";
    },
  },
  16: {
    modelAnswer: "الأولى تحدث عن حدث مستقبلي عام، والثانية تصف نشاطًا جاريًا عند الساعة الثامنة.",
    acceptedSummary: "أي صياغة تفرّق بين حدث مستقبلي عام ونشاط جارٍ عند لحظة محددة.",
    explanation: "Future Simple يقدّم الحدث كحقيقة مستقبلية، وFuture Continuous يضع الكاميرا داخل الثامنة ليصف الدراسة الجارية حينها.",
    example: "I will study tomorrow. / I will be studying at 8:00 tomorrow.",
    check: (raw) => {
      const ar = normAr(raw);
      const en = normEn(raw);
      return (
        /(مستمر|جار|لحظه|8|كاميرا|اثناء|وقت محدد)/.test(ar) ||
        /(حدث|عام|بسيط|حقيقه)/.test(ar) ||
        /(in progress|ongoing|continuous|moment|general|simple|event)/.test(en)
      );
    },
  },
  17: {
    modelAnswer: "لأن التعبير this time next week يحدد لحظة سيجري فيها الطيران كنشاط مستمر.",
    acceptedSummary: "أي صياغة تذكر أن الطيران سيكون نشاطًا جاريًا في تلك اللحظة.",
    explanation: "العبارة الزمنية تفتح نافذة في الأسبوع القادم، والصيغة المستمرة تصوّرنا داخل الرحلة في منتصفها.",
    example: "This time next week, we will be flying to Paris.",
    check: (raw) => {
      const ar = normAr(raw);
      const en = normEn(raw);
      return (
        /(مستمر|جار|لحظه|هذا الوقت|الاسبوع القادم|طيران|رحله|اثناء)/.test(ar) ||
        /(in progress|ongoing|this time|moment|flying|middle)/.test(en)
      );
    },
  },
  18: {
    modelAnswer: "لا؛ نستخدم المضارع البسيط arrive بعد when الزمنية، ويبقى will في الجملة الرئيسية.",
    acceptedSummary: "لا · المضارع البسيط بعد when · will في الجملة الرئيسية",
    explanation: "القاعدة: جملة when الزمنية المستقبلية تأخذ Present Simple، ولا تأخذ will إلا في السؤال المباشر أو السؤال غير المباشر.",
    example: "When you arrive, I will be waiting.",
    check: (raw) => {
      const ar = normAr(raw);
      const en = normEn(raw);
      return (
        /(لا|مضارع|بسيط|زمنيه|بدون will|لا نستخدم)/.test(ar) ||
        /\b(no|present simple|time clause|do not use will|don't use will)\b/.test(en)
      );
    },
  },
  19: {
    modelAnswer: "نعم؛ يكفي وجود حدث متقاطع أو فترة مستقبلية أو سؤال مهذب عن الخطة دون ساعة رقمية.",
    acceptedSummary: "نعم + مثال صحيح بصيغة will be + V-ing دون ساعة.",
    explanation: "لا يشترط الزمن المستمر ذكر الساعة؛ فحدث مثل When you call me أو فترة مثل all weekend تكفي لتصوّر النشاط الجاري.",
    example: "When you call me tonight, I will be studying.",
    check: (raw) => {
      const ar = normAr(raw);
      const en = normEn(raw);
      return /\b(will|won't)\s+(?:\w+\s+)?be\s+[a-z]+ing\b/.test(en) || /(نعم|يمكن|حدث اخر|when|سؤال مهذب|فتره)/.test(ar);
    },
  },
  20: {
    modelAnswer: "الأولى سؤال مباشر عن القرار أو طلب، والثانية سؤال مهذب عن الخطة أو الجدول دون إلحاح.",
    acceptedSummary: "الأولى قرار/طلب · الثانية خطة/سؤال مهذب.",
    explanation: "صيغة will you be + V-ing تُستخدم للسؤال اللطيف عن برنامج المخاطب قبل طلب شيء منه، وهي أشيع في هذا الموقف من السؤال المباشر.",
    example: "Will you be using the computer tonight?",
    check: (raw) => {
      const ar = normAr(raw);
      const en = normEn(raw);
      return /(مهذب|لطيف|ادب|خطه|خطط|جدول|طلب|قرار|مباشر)/.test(ar) || /(polite|plan|schedule|request|decision|direct)/.test(en);
    },
  },
  21: {
    modelAnswer: "will be attending",
    acceptedSummary: "will be attending · 'll be attending",
    explanation: "الساعة الثامنة صباحًا نقطة محددة في جدول مايا، والحضور سيكون جاريًا فيها.",
    example: "At 8:00, she will be attending an online English lesson.",
    check: (raw) => normEn(raw).includes("will be attending"),
  },
  22: {
    modelAnswer: "will be working",
    acceptedSummary: "will be working · 'll be working",
    explanation: "عند العاشرة ستكون مايا في منتصف العمل على مشروع العلوم، لا في بدايته ولا في نهايته.",
    example: "At 10:00, she will be working on her science project.",
    check: (raw) => normEn(raw).includes("will be working"),
  },
  23: {
    modelAnswer: "will be preparing",
    acceptedSummary: "will be preparing · 'll be preparing · will prepare (تركيز مختلف)",
    explanation: "جملة when brother arrives تأخذ المضارع البسيط، وتحضير الغداء نشاط جارٍ عند لحظة الوصول.",
    example: "When her brother arrives, she will be preparing lunch.",
    check: (raw) => ["will be preparing", "will prepare", "is going to prepare"].some((value) => normEn(raw).includes(value)),
  },
  24: {
    modelAnswer: "will be reviewing",
    acceptedSummary: "will be reviewing · 'll be reviewing",
    explanation: "السابعة مساءً لحظة محددة، ومراجعة الملاحظات ستكون جارية فيها.",
    example: "At 7:00 in the evening, she will be reviewing her notes.",
    check: (raw) => normEn(raw).includes("will be reviewing"),
  },
  25: {
    modelAnswer: "will … be doing",
    acceptedSummary: "will · be doing · What will you be doing at 8:00?",
    explanation: "سؤال الصديقة يبدأ بأداة الاستفهام What ثم will ثم الفاعل you ثم be ثم doing، وتؤكده إجابة مايا.",
    example: "What will you be doing at 8:00?",
    check: (raw) => {
      const c = normEn(raw);
      return c === "will be doing" || c.includes("will you be doing") || (c.includes("will") && c.includes("be doing"));
    },
  },
};

export function gradeQuestion37(question: TestQuestion37, rawAnswer: string): QuestionGrade37 {
  const spec = QUESTION_SPECS_37[question.n];
  const isCorrect = spec ? spec.check(rawAnswer) : false;
  return {
    n: question.n,
    isCorrect,
    statusLabel: isCorrect ? "إجابة صحيحة / مكافئة معتمدة" : "راجع الإجابة النموذجية والسبب",
    modelAnswer: spec?.modelAnswer ?? "",
    acceptedSummary: spec?.acceptedSummary ?? "",
    explanation: spec?.explanation ?? "",
    example: spec?.example,
  };
}

export function gradeTest37(answers: Record<number, string>): TestGradeSummary37 {
  const results: Record<number, QuestionGrade37> = {};
  let correctCount = 0;
  for (const question of TEST_37) {
    const grade = gradeQuestion37(question, answers[question.n] ?? "");
    results[question.n] = grade;
    if (grade.isCorrect) correctCount += 1;
  }
  const total = TEST_COUNT_37;
  const percentage = Math.round((correctCount / total) * 100);
  return { total, correctCount, percentage, results };
}
