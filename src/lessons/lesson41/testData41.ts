// أسئلة الاختبار النهائي (§36) كما وردت في المصدر، بلا أي إجابات أو شروح.
// مفتاح التصحيح التفصيلي في key41.ts ولا يُحمَّل إلا بعد التسليم أو عبر مساحة المعلم.

export type TestField41 = { key: string; label: string; placeholder?: string };

export type TestQuestion41 = {
  id: string;
  number: number;
  level: number;
  type: "mcq" | "complete" | "correct" | "function" | "dialogue";
  lines: string[];
  options?: string[];
  fields: TestField41[];
  rows?: number;
};

export type TestLevel41 = {
  level: number;
  title: string;
  context?: string[];
  questions: TestQuestion41[];
};

const field = (label: string, placeholder?: string, key = "answer"): TestField41 => ({ key, label, placeholder });

export const TEST_LEVELS_41: TestLevel41[] = [
  {
    level: 1,
    title: "المستوى الأول: Multiple Choice",
    questions: [
      { id: "q1", number: 1, level: 1, type: "mcq", lines: ["______ she speak English?"], options: ["Do", "Does", "Is"], fields: [field("إجابتك")] },
      { id: "q2", number: 2, level: 1, type: "mcq", lines: ["______ they studying now?"], options: ["Do", "Are", "Have"], fields: [field("إجابتك")] },
      { id: "q3", number: 3, level: 1, type: "mcq", lines: ["______ you completed your homework?"], options: ["Have", "Do", "Are"], fields: [field("إجابتك")] },
      { id: "q4", number: 4, level: 1, type: "mcq", lines: ["______ he visit the museum yesterday?"], options: ["Does", "Did", "Was"], fields: [field("إجابتك")] },
      { id: "q5", number: 5, level: 1, type: "mcq", lines: ["______ she ready for the exam?"], options: ["Does", "Is", "Has"], fields: [field("إجابتك")] },
    ],
  },
  {
    level: 2,
    title: "المستوى الثاني: Complete the Sentences",
    context: ["أكمل الفراغ بالصيغة الصحيحة. في السؤال 8 فراغان: الفعل المساعد ثم صيغة الفعل."],
    questions: [
      { id: "q6", number: 6, level: 2, type: "complete", lines: ["She ______ (not / like) coffee."], fields: [field("إجابتك", "doesn't like")] },
      { id: "q7", number: 7, level: 2, type: "complete", lines: ["They ______ (not / finish) the project yet."], fields: [field("إجابتك", "haven't finished")] },
      {
        id: "q8",
        number: 8,
        level: 2,
        type: "complete",
        lines: ["______ you ______ (watch) television at 8:00 yesterday?"],
        fields: [field("الفعل المساعد — الفراغ الأول", "Were", "aux"), field("صيغة الفعل — الفراغ الثاني", "watching", "form")],
      },
      { id: "q9", number: 9, level: 2, type: "complete", lines: ["He ______ (not / have) a bicycle."], fields: [field("إجابتك", "doesn't have")] },
      { id: "q10", number: 10, level: 2, type: "complete", lines: ["By Friday, we ______ (complete) the report. استخدم Future Perfect."], fields: [field("إجابتك", "will have completed")] },
    ],
  },
  {
    level: 3,
    title: "المستوى الثالث: Correct the Mistakes",
    context: ["أعد كتابة الجملة كاملة بعد تصحيح الخطأ."],
    questions: [
      { id: "q11", number: 11, level: 3, type: "correct", lines: ["Does she studies English?"], fields: [field("الجملة الصحيحة")] },
      { id: "q12", number: 12, level: 3, type: "correct", lines: ["Did he went home?"], fields: [field("الجملة الصحيحة")] },
      { id: "q13", number: 13, level: 3, type: "correct", lines: ["Do you are ready?"], fields: [field("الجملة الصحيحة")] },
      { id: "q14", number: 14, level: 3, type: "correct", lines: ["She has finish the assignment."], fields: [field("الجملة الصحيحة")] },
      { id: "q15", number: 15, level: 3, type: "correct", lines: ["They will have being working for three hours by noon."], fields: [field("الجملة الصحيحة")] },
    ],
  },
  {
    level: 4,
    title: "المستوى الرابع: Understand the Function",
    context: ["أجب بجملة قصيرة تشرح الوظيفة أو السبب."],
    questions: [
      { id: "q16", number: 16, level: 4, type: "function", lines: ["ما وظيفة have في الجملة:", "I have a laptop."], fields: [field("إجابتك")], rows: 2 },
      { id: "q17", number: 17, level: 4, type: "function", lines: ["ما وظيفة have في الجملة:", "I have bought a laptop."], fields: [field("إجابتك")], rows: 2 },
      { id: "q18", number: 18, level: 4, type: "function", lines: ["لماذا نقول:", "Does she work?", "ولا نقول:", "Does she works?"], fields: [field("إجابتك")], rows: 2 },
      { id: "q19", number: 19, level: 4, type: "function", lines: ["ما الفرق بين:", "I understand you.", "I do understand you!"], fields: [field("إجابتك")], rows: 2 },
      { id: "q20", number: 20, level: 4, type: "function", lines: ["لماذا نقول:", "Has she been studying?", "ولا نقول:", "Does she has been studying?"], fields: [field("إجابتك")], rows: 2 },
    ],
  },
  {
    level: 5,
    title: "المستوى الخامس: Final IQ200 Boss",
    context: [
      "أكمل الحوار بالفعل المساعد الصحيح.",
      "The Project Meeting",
      "Maya: ______ you enjoy science?",
      "Omar: Yes, I do.",
      "Maya: ______ you working on a new project now?",
      "Omar: Yes. I am preparing a robot.",
      "Maya: ______ you finished the design yet?",
      "Omar: Not yet.",
      "Maya: ______ you test the robot yesterday?",
      "Omar: Yes, I did.",
      "Maya: ______ you have completed everything by Friday?",
      "Omar: I hope so!",
    ],
    questions: [
      { id: "q21", number: 21, level: 5, type: "dialogue", lines: ["السؤال الأول: ______ you enjoy science?"], fields: [field("الفعل المساعد")] },
      { id: "q22", number: 22, level: 5, type: "dialogue", lines: ["السؤال الثاني: ______ you working on a new project now?"], fields: [field("الفعل المساعد")] },
      { id: "q23", number: 23, level: 5, type: "dialogue", lines: ["السؤال الثالث: ______ you finished the design yet?"], fields: [field("الفعل المساعد")] },
      { id: "q24", number: 24, level: 5, type: "dialogue", lines: ["السؤال الرابع: ______ you test the robot yesterday?"], fields: [field("الفعل المساعد")] },
      { id: "q25", number: 25, level: 5, type: "dialogue", lines: ["السؤال الخامس: ______ you have completed everything by Friday?"], fields: [field("الفعل المساعد")] },
    ],
  },
];

export const TEST_QUESTIONS_41: TestQuestion41[] = TEST_LEVELS_41.flatMap((level) => level.questions);

export type TestAnswers41 = Record<string, string>;

export function answerKey41(questionId: string, fieldKey: string) {
  return `${questionId}-${fieldKey}`;
}

export function testComplete41(answers: TestAnswers41): boolean {
  return TEST_QUESTIONS_41.every((question) =>
    question.fields.every((f) => Boolean(answers[answerKey41(question.id, f.key)]?.trim())),
  );
}

export function answeredCount41(answers: TestAnswers41): number {
  return TEST_QUESTIONS_41.filter((question) =>
    question.fields.every((f) => Boolean(answers[answerKey41(question.id, f.key)]?.trim())),
  ).length;
}
