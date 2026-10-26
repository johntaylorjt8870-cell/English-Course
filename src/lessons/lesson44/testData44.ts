// Lesson 44 Final Master Test — Questions & Prompts ONLY (Zero Answer Keys or Hints).
export interface TestQuestion44 {
  id: string;
  number: number;
  lines: string[];
  options: string[];
  fields: string[];
}

export interface TestLevel44 {
  level: number;
  title: string;
  context: string[];
  questions: TestQuestion44[];
}

export const TEST_LEVELS_44: TestLevel44[] = [
  {
    "level": 1,
    "title": "المستوى الأول: Multiple Choice",
    "context": [],
    "questions": [
      { "id": "q1", "number": 1, "lines": ["She ______ finish her homework today."], "options": ["A. musts", "B. must", "C. must to"], "fields": ["إجابتك"] },
      { "id": "q2", "number": 2, "lines": ["He ______ wear a uniform at school."], "options": ["A. have to", "B. has to", "C. musts"], "fields": ["إجابتك"] },
      { "id": "q3", "number": 3, "lines": ["______ she have to leave early?"], "options": ["A. Do", "B. Does", "C. Has"], "fields": ["إجابتك"] },
      { "id": "q4", "number": 4, "lines": ["I ______ wake up early yesterday."], "options": ["A. had to", "B. musted", "C. has to"], "fields": ["إجابتك"] },
      { "id": "q5", "number": 5, "lines": ["We will ______ buy new equipment next month."], "options": ["A. has to", "B. had to", "C. have to"], "fields": ["إجابتك"] }
    ]
  },
  {
    "level": 2,
    "title": "المستوى الثاني: Complete the Sentences",
    "context": [],
    "questions": [
      { "id": "q6", "number": 6, "lines": ["You ______ (must / not) touch this dangerous wire. المطلوب: المنع."], "options": [], "fields": ["إجابتك"] },
      { "id": "q7", "number": 7, "lines": ["She ______ (not / have to) come tomorrow. المطلوب: عدم الضرورة."], "options": [], "fields": ["إجابتك"] },
      { "id": "q8", "number": 8, "lines": ["We ______ (have to) finish the project yesterday."], "options": [], "fields": ["إجابتك"] },
      { "id": "q9", "number": 9, "lines": ["______ you ______ (have to) pay for the tickets last week?"], "options": [], "fields": ["الفعل المساعد", "الصيغة"] },
      { "id": "q10", "number": 10, "lines": ["They ______ (not / have to) work next Friday. استخدم المستقبل."], "options": [], "fields": ["إجابتك"] }
    ]
  },
  {
    "level": 3,
    "title": "المستوى الثالث: Correct the Mistakes",
    "context": [],
    "questions": [
      { "id": "q11", "number": 11, "lines": ["He musts study harder."], "options": [], "fields": ["الجملة الصحيحة"] },
      { "id": "q12", "number": 12, "lines": ["She have to wear a uniform."], "options": [], "fields": ["الجملة الصحيحة"] },
      { "id": "q13", "number": 13, "lines": ["Does he has to leave now?"], "options": [], "fields": ["السؤال الصحيح"] },
      { "id": "q14", "number": 14, "lines": ["I didn't had to work yesterday."], "options": [], "fields": ["الجملة الصحيحة"] },
      { "id": "q15", "number": 15, "lines": ["She will has to finish the project."], "options": [], "fields": ["الجملة الصحيحة"] }
    ]
  },
  {
    "level": 4,
    "title": "المستوى الرابع: Understand the Meaning",
    "context": [],
    "questions": [
      { "id": "q16", "number": 16, "lines": ["ما الفرق بين:", "You mustn't enter.", "You don't have to enter."], "options": [], "fields": ["شرحك للفرق في المعنى"] },
      { "id": "q17", "number": 17, "lines": ["لماذا نستخدم HAD TO للتعبير عن ضرورة ماضية؟"], "options": [], "fields": ["إجابتك التفسيرية"] },
      { "id": "q18", "number": 18, "lines": ["هل يمكن استخدام MUST وHAVE TO في القوانين والتعليمات؟ اشرح."], "options": [], "fields": ["إجابتك مع الشرح"] },
      { "id": "q19", "number": 19, "lines": ["ما الفرق بين:", "I must improve my English.", "I have to study tonight because I have an exam tomorrow."], "options": [], "fields": ["شرحك للفرق"] },
      { "id": "q20", "number": 20, "lines": ["هل تعني الجملة التالية أن المتحدث لم يُنهِ التقرير؟", "I didn't have to finish the report yesterday.", "اشرح إجابتك."], "options": [], "fields": ["الحكم مع التعليل"] }
    ]
  },
  {
    "level": 5,
    "title": "المستوى الخامس: Final IQ200 Boss",
    "context": [
      "أكمل الحوار باستخدام الصيغة المناسبة.",
      "The School Trip",
      "Teacher: Tomorrow, everyone __(21)__ arrive at school by seven. It's a school requirement.",
      "Maya: __(22)__ we have to bring our lunch?",
      "Teacher: No, you __(23)__. The school will provide lunch.",
      "Omar: Can we use our phones during the trip?",
      "Teacher: No. You __(24)__ use them during the guided tour.",
      "Daniel: Last year, we __(25)__ bring our own food, but this year everything is provided!"
    ],
    "questions": [
      { "id": "q21", "number": 21, "lines": ["Teacher: Tomorrow, everyone ______ arrive at school by seven.", "التزام حالي باستخدام HAVE TO."], "options": [], "fields": ["الفراغ 21"] },
      { "id": "q22", "number": 22, "lines": ["Maya: ______ we have to bring our lunch?", "سؤال باستخدام HAVE TO."], "options": [], "fields": ["الفراغ 22"] },
      { "id": "q23", "number": 23, "lines": ["Teacher: No, you ______. The school will provide lunch.", "عدم الضرورة."], "options": [], "fields": ["الفراغ 23"] },
      { "id": "q24", "number": 24, "lines": ["Teacher: No. You ______ use them during the guided tour.", "المنع باستخدام MUSTN'T."], "options": [], "fields": ["الفراغ 24"] },
      { "id": "q25", "number": 25, "lines": ["Daniel: Last year, we ______ bring our own food!", "ضرورة في الماضي."], "options": [], "fields": ["الفراغ 25"] }
    ]
  }
];

export const TEST_QUESTIONS_44 = TEST_LEVELS_44.flatMap((level) => level.questions);
export const TEST_QUESTION_COUNT_44 = TEST_QUESTIONS_44.length;
export const TEST_LEVEL_COUNT_44 = TEST_LEVELS_44.length;
export type TestAnswers44 = Record<string, string>;

export function isQuestionAnswered44(id: string, fieldsCount: number, answers: TestAnswers44): boolean {
  for (let i = 0; i < fieldsCount; i++) {
    if (!answers[`${id}-${i}`]?.trim()) return false;
  }
  return true;
}

export function testComplete44(answers: TestAnswers44): boolean {
  return TEST_QUESTIONS_44.every((q) => isQuestionAnswered44(q.id, q.fields.length, answers));
}
