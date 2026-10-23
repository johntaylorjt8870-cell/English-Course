// أسئلة الاختبار النهائي (§33) كما وردت في المصدر، بلا أي إجابات أو شروح.
// مفتاح التصحيح التفصيلي في key43.ts ولا يُحمَّل إلا بعد التسليم أو عبر مساحة المعلم.

export type TestField43 = { key: string; label: string; placeholder?: string };

export type TestQuestion43 = {
  id: string;
  number: number;
  level: number;
  type: "mcq" | "complete" | "correct" | "function" | "dialogue";
  lines: string[];
  options?: string[];
  fields: TestField43[];
  rows?: number;
};

export type TestLevel43 = {
  level: number;
  title: string;
  context?: string[];
  questions: TestQuestion43[];
};

const field = (label: string, placeholder?: string, key = "answer"): TestField43 => ({ key, label, placeholder });

/** المقدمة الواردة في §33 — تُعرض في مساحة الاختبار كعنوان وسياق. */
export const EXAM_INTRO_43 = ["25 سؤالًا — خمسة مستويات — اختبار شامل", "حاول حل الاختبار دون الرجوع إلى الشرح."];

export const TEST_LEVELS_43: TestLevel43[] = [
  {
    level: 1,
    title: "المستوى الأول: Multiple Choice",
    questions: [
      { id: "q1", number: 1, level: 1, type: "mcq", lines: ["She ______ come tomorrow."], options: ["A. may", "B. mays", "C. may to"], fields: [field("إجابتك")] },
      { id: "q2", number: 2, level: 1, type: "mcq", lines: ["He might ______ late."], options: ["A. arrives", "B. arrive", "C. arriving"], fields: [field("إجابتك")] },
      { id: "q3", number: 3, level: 1, type: "mcq", lines: ["______ I use your pen, please?"], options: ["A. May", "B. Do may", "C. Does"], fields: [field("إجابتك")] },
      { id: "q4", number: 4, level: 1, type: "mcq", lines: ["They may not ______ the answer."], options: ["A. knows", "B. know", "C. knowing"], fields: [field("إجابتك")] },
      { id: "q5", number: 5, level: 1, type: "mcq", lines: ["She may have ______ the bus."], options: ["A. miss", "B. missing", "C. missed"], fields: [field("إجابتك")] },
    ],
  },
  {
    level: 2,
    title: "المستوى الثاني: Complete the Sentences",
    context: ["أكمل الفراغ بالصيغة الصحيحة. في السؤالين 9 و10 ثلاثة فراغا: الفعل الناقص ثم HAVE ثم V3."],
    questions: [
      { id: "q6", number: 6, level: 2, type: "complete", lines: ["It ______ (may / rain) tomorrow."], fields: [field("إجابتك")] },
      { id: "q7", number: 7, level: 2, type: "complete", lines: ["He ______ (might / be) tired."], fields: [field("إجابتك")] },
      { id: "q8", number: 8, level: 2, type: "complete", lines: ["They ______ (may / not / come) today."], fields: [field("إجابتك")] },
      {
        id: "q9",
        number: 9,
        level: 2,
        type: "complete",
        lines: ["She ______ (might / have / forget) the meeting."],
        fields: [field("الفعل الناقص", "might", "modal"), field("HAVE", "have", "have"), field("V3", "forgotten", "v3")],
      },
      {
        id: "q10",
        number: 10,
        level: 2,
        type: "complete",
        lines: ["We ______ (may / have / make) a mistake."],
        fields: [field("الفعل الناقص", "may", "modal"), field("HAVE", "have", "have"), field("V3", "made", "v3")],
      },
    ],
  },
  {
    level: 3,
    title: "المستوى الثالث: Correct the Mistakes",
    context: ["أعد كتابة الجملة كاملة بعد تصحيح الخطأ."],
    questions: [
      { id: "q11", number: 11, level: 3, type: "correct", lines: ["She mays be at home."], fields: [field("الجملة الصحيحة")] },
      { id: "q12", number: 12, level: 3, type: "correct", lines: ["He might comes tomorrow."], fields: [field("الجملة الصحيحة")] },
      { id: "q13", number: 13, level: 3, type: "correct", lines: ["They may to visit us."], fields: [field("الجملة الصحيحة")] },
      { id: "q14", number: 14, level: 3, type: "correct", lines: ["She may have went home."], fields: [field("الجملة الصحيحة")] },
      { id: "q15", number: 15, level: 3, type: "correct", lines: ["Maybe he tired."], fields: [field("الجملة الصحيحة")] },
    ],
  },
  {
    level: 4,
    title: "المستوى الرابع: Understand the Meaning",
    context: ["أجب بجملة قصيرة تشرح الوظيفة أو الفرق أو السبب."],
    questions: [
      { id: "q16", number: 16, level: 4, type: "function", lines: ["ما الفرق بين:", "She is at home.", "She may be at home."], fields: [field("إجابتك")], rows: 3 },
      { id: "q17", number: 17, level: 4, type: "function", lines: ["هل تعني MIGHT دائمًا أن الاحتمال أضعف من MAY؟ اشرح."], fields: [field("إجابتك")], rows: 3 },
      { id: "q18", number: 18, level: 4, type: "function", lines: ["ما الفرق بين:", "Maybe she is tired.", "She may be tired."], fields: [field("إجابتك")], rows: 3 },
      { id: "q19", number: 19, level: 4, type: "function", lines: ["ما معنى:", "He might have forgotten the appointment."], fields: [field("إجابتك")], rows: 2 },
      { id: "q20", number: 20, level: 4, type: "function", lines: ["ما وظيفة MAY في الجملة:", "May I ask a question?"], fields: [field("إجابتك")], rows: 2 },
    ],
  },
  {
    level: 5,
    title: "المستوى الخامس: Final IQ200 Boss",
    context: [
      "أكمل الحوار باستخدام التعبير المناسب.",
      "The Missing Homework",
      "Maya: Where is Omar? He isn't here yet.",
      "Daniel: He ______ be at the library.",
      "Maya: Or he ______ have missed the bus.",
      "Daniel: That's possible.",
      "Teacher: ______ I ask everyone to take their seats, please?",
      "Maya: Of course.",
      "Daniel: Omar ______ not arrive on time.",
      "Teacher: That's all right. ______ he has a good reason.",
    ],
    questions: [
      { id: "q21", number: 21, level: 5, type: "dialogue", lines: ["احتمال في الحاضر باستخدام MAY."], fields: [field("التعبير المناسب")] },
      { id: "q22", number: 22, level: 5, type: "dialogue", lines: ["احتمال يتعلق بالماضي باستخدام MIGHT HAVE."], fields: [field("التعبير المناسب")] },
      { id: "q23", number: 23, level: 5, type: "dialogue", lines: ["طلب مهذب باستخدام MAY."], fields: [field("التعبير المناسب")] },
      { id: "q24", number: 24, level: 5, type: "dialogue", lines: ["احتمال عدم حدوث شيء باستخدام MAY."], fields: [field("التعبير المناسب")] },
      { id: "q25", number: 25, level: 5, type: "dialogue", lines: ["استخدم MAYBE بوصفها كلمة مستقلة."], fields: [field("التعبير المناسب")] },
    ],
  },
];

export const TEST_QUESTIONS_43: TestQuestion43[] = TEST_LEVELS_43.flatMap((level) => level.questions);

export type TestAnswers43 = Record<string, string>;

export function fieldKey43(questionId: string, fieldKey: string): string {
  return `${questionId}:${fieldKey}`;
}

export function testComplete43(answers: TestAnswers43): boolean {
  return TEST_QUESTIONS_43.every((question) => question.fields.every((f) => Boolean(answers[fieldKey43(question.id, f.key)]?.trim())));
}

export function answeredCount43(answers: TestAnswers43): number {
  return TEST_QUESTIONS_43.filter((question) => question.fields.every((f) => Boolean(answers[fieldKey43(question.id, f.key)]?.trim()))).length;
}
