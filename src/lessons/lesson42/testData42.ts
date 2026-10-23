// أسئلة الاختبار النهائي (§40) كما وردت في المصدر، بلا أي إجابات أو شروح.
// مفتاح التصحيح التفصيلي في key42.ts ولا يُحمَّل إلا بعد التسليم أو عبر مساحة المعلم.

export type TestField42 = { key: string; label: string; placeholder?: string };

export type TestQuestion42 = {
  id: string;
  number: number;
  level: number;
  type: "mcq" | "complete" | "correct" | "function" | "dialogue";
  lines: string[];
  options?: string[];
  fields: TestField42[];
  rows?: number;
};

export type TestLevel42 = {
  level: number;
  title: string;
  context?: string[];
  questions: TestQuestion42[];
};

const field = (label: string, placeholder?: string, key = "answer"): TestField42 => ({ key, label, placeholder });

export const TEST_LEVELS_42: TestLevel42[] = [
  {
    level: 1,
    title: "المستوى الأول: اختر الإجابة الصحيحة",
    questions: [
      { id: "q1", number: 1, level: 1, type: "mcq", lines: ["She ______ speak English very well now."], options: ["can", "cans", "coulds"], fields: [field("إجابتك")] },
      { id: "q2", number: 2, level: 1, type: "mcq", lines: ["When I was five, I ______ ride a bicycle."], options: ["can", "could", "will can"], fields: [field("إجابتك")] },
      { id: "q3", number: 3, level: 1, type: "mcq", lines: ["______ you help me, please?"], options: ["Do can", "Could", "Does"], fields: [field("إجابتك")] },
      { id: "q4", number: 4, level: 1, type: "mcq", lines: ["I ______ swim when I was little, but I can swim now."], options: ["couldn't", "can't", "don't can"], fields: [field("إجابتك")] },
      { id: "q5", number: 5, level: 1, type: "mcq", lines: ["After more practice, I will ______ solve these problems."], options: ["can", "be able to", "could"], fields: [field("إجابتك")] },
    ],
  },
  {
    level: 2,
    title: "المستوى الثاني: أكمل الجمل",
    context: ["أكمل الفراغ بالصيغة الصحيحة. في السؤال 7 فراغان: الفعل الناقص ثم صيغة الفعل."],
    questions: [
      { id: "q6", number: 6, level: 2, type: "complete", lines: ["She ______ (can / not) drive a car."], fields: [field("إجابتك")] },
      {
        id: "q7",
        number: 7,
        level: 2,
        type: "complete",
        lines: ["______ you ______ (can / play) the piano?"],
        fields: [field("الفعل الناقص — الفراغ الأول", "Can", "modal"), field("صيغة الفعل — الفراغ الثاني", "play", "form")],
      },
      { id: "q8", number: 8, level: 2, type: "complete", lines: ["When my father was young, he ______ (can) run very fast."], fields: [field("إجابتك")] },
      { id: "q9", number: 9, level: 2, type: "complete", lines: ["The task was difficult, but we ______ (be able to) finish it yesterday."], fields: [field("إجابتك")] },
      { id: "q10", number: 10, level: 2, type: "complete", lines: ["Next year, I ______ (be able to) speak English more confidently."], fields: [field("إجابتك")] },
    ],
  },
  {
    level: 3,
    title: "المستوى الثالث: صحح الأخطاء",
    context: ["أعد كتابة الجملة كاملة بعد تصحيح الخطأ."],
    questions: [
      { id: "q11", number: 11, level: 3, type: "correct", lines: ["He cans swim very well."], fields: [field("الجملة الصحيحة")] },
      { id: "q12", number: 12, level: 3, type: "correct", lines: ["Do you can help me?"], fields: [field("الجملة الصحيحة")] },
      { id: "q13", number: 13, level: 3, type: "correct", lines: ["She could played the piano when she was young."], fields: [field("الجملة الصحيحة")] },
      { id: "q14", number: 14, level: 3, type: "correct", lines: ["I will can finish the project tomorrow."], fields: [field("الجملة الصحيحة")] },
      { id: "q15", number: 15, level: 3, type: "correct", lines: ["Could you to repeat the question?"], fields: [field("الجملة الصحيحة")] },
    ],
  },
  {
    level: 4,
    title: "المستوى الرابع: فهم المعنى",
    context: ["أجب بجملة قصيرة تشرح الوظيفة أو السبب."],
    questions: [
      { id: "q16", number: 16, level: 4, type: "function", lines: ["ما الفرق بين:", "I can swim.", "I could swim when I was six."], fields: [field("إجابتك")], rows: 2 },
      { id: "q17", number: 17, level: 4, type: "function", lines: ["ما وظيفة COULD في الجملة:", "Could you open the door, please?"], fields: [field("إجابتك")], rows: 2 },
      { id: "q18", number: 18, level: 4, type: "function", lines: ["ما وظيفة COULD في الجملة:", "It could rain tomorrow."], fields: [field("إجابتك")], rows: 2 },
      {
        id: "q19",
        number: 19,
        level: 4,
        type: "function",
        lines: ["لماذا نستخدم was able to غالبًا في الجملة التالية؟", "Although the problem was difficult, she was able to solve it."],
        fields: [field("إجابتك")],
        rows: 2,
      },
      {
        id: "q20",
        number: 20,
        level: 4,
        type: "function",
        lines: ["هل يمكن أن تعني Can you open the door؟ القدرة أو الطلب بحسب السياق؟ اشرح."],
        fields: [field("إجابتك")],
        rows: 3,
      },
    ],
  },
  {
    level: 5,
    title: "المستوى الخامس: Final IQ200 Boss",
    context: [
      "أكمل الحوار باستخدام التعبير المناسب.",
      "The School Technology Club",
      "Maya: ______ you design a simple robot?",
      "Omar: Yes, I can. But when I was younger, I ______ understand electronic circuits.",
      "Maya: Interesting! ______ you help me build a small robot, please?",
      "Omar: Of course. We ______ work together after school. That's one idea.",
      "Maya: Great! After a few months of practice, I think I ______ build more advanced robots.",
    ],
    questions: [
      { id: "q21", number: 21, level: 5, type: "dialogue", lines: ["Maya: ______ you design a simple robot?", "السؤال الأول عن القدرة الحالية."], fields: [field("التعبير المناسب")] },
      { id: "q22", number: 22, level: 5, type: "dialogue", lines: ["Omar: Yes, I can. But when I was younger, I ______ understand electronic circuits.", "عدم القدرة في الماضي."], fields: [field("التعبير المناسب")] },
      { id: "q23", number: 23, level: 5, type: "dialogue", lines: ["Maya: Interesting! ______ you help me build a small robot, please?", "طلب المساعدة بصورة مهذبة."], fields: [field("التعبير المناسب")] },
      { id: "q24", number: 24, level: 5, type: "dialogue", lines: ["Omar: Of course. We ______ work together after school. That's one idea.", "تقديم اقتراح."], fields: [field("التعبير المناسب")] },
      { id: "q25", number: 25, level: 5, type: "dialogue", lines: ["Maya: Great! After a few months of practice, I think I ______ build more advanced robots.", "التعبير عن قدرة مستقبلية."], fields: [field("التعبير المناسب")] },
    ],
  },
];

export const TEST_QUESTIONS_42: TestQuestion42[] = TEST_LEVELS_42.flatMap((level) => level.questions);

export type TestAnswers42 = Record<string, string>;

export function answerKey42(questionId: string, fieldKey: string): string {
  return `${questionId}:${fieldKey}`;
}

export function testComplete42(answers: TestAnswers42): boolean {
  return TEST_QUESTIONS_42.every((question) => question.fields.every((f) => Boolean(answers[answerKey42(question.id, f.key)]?.trim())));
}

export function answeredCount42(answers: TestAnswers42): number {
  return TEST_QUESTIONS_42.filter((question) => question.fields.every((f) => Boolean(answers[answerKey42(question.id, f.key)]?.trim()))).length;
}
