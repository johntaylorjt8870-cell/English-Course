// Source-derived §40 prompts only. Intentionally has no ledger, practice, or solutions imports.
export const TEST_LEVELS_42 = [
  {
    "level": 1,
    "title": "المستوى الأول: اختر الإجابة الصحيحة",
    "context": [],
    "questions": [
      { "id": "q1", "number": 1, "lines": ["She ______ speak English very well now."], "options": ["A. can", "B. cans", "C. coulds"], "fields": ["إجابتك"] },
      { "id": "q2", "number": 2, "lines": ["When I was five, I ______ ride a bicycle."], "options": ["A. can", "B. could", "C. will can"], "fields": ["إجابتك"] },
      { "id": "q3", "number": 3, "lines": ["______ you help me, please?"], "options": ["A. Do can", "B. Could", "C. Does"], "fields": ["إجابتك"] },
      { "id": "q4", "number": 4, "lines": ["I ______ swim when I was little, but I can swim now."], "options": ["A. couldn't", "B. can't", "C. don't can"], "fields": ["إجابتك"] },
      { "id": "q5", "number": 5, "lines": ["After more practice, I will ______ solve these problems."], "options": ["A. can", "B. be able to", "C. could"], "fields": ["إجابتك"] }
    ]
  },
  {
    "level": 2,
    "title": "المستوى الثاني: أكمل الجمل",
    "context": [],
    "questions": [
      { "id": "q6", "number": 6, "lines": ["She ______ (can / not) drive a car."], "options": [], "fields": ["إجابتك"] },
      { "id": "q7", "number": 7, "lines": ["______ you ______ (can / play) the piano?"], "options": [], "fields": ["الفعل الناقص", "الفعل الرئيسي"] },
      { "id": "q8", "number": 8, "lines": ["When my father was young, he ______ (can) run very fast."], "options": [], "fields": ["إجابتك"] },
      { "id": "q9", "number": 9, "lines": ["The task was difficult, but we ______ (be able to) finish it yesterday."], "options": [], "fields": ["إجابتك"] },
      { "id": "q10", "number": 10, "lines": ["Next year, I ______ (be able to) speak English more confidently."], "options": [], "fields": ["إجابتك"] }
    ]
  },
  {
    "level": 3,
    "title": "المستوى الثالث: صحح الأخطاء",
    "context": [],
    "questions": [
      { "id": "q11", "number": 11, "lines": ["He cans swim very well."], "options": [], "fields": ["إجابتك"] },
      { "id": "q12", "number": 12, "lines": ["Do you can help me?"], "options": [], "fields": ["إجابتك"] },
      { "id": "q13", "number": 13, "lines": ["She could played the piano when she was young."], "options": [], "fields": ["إجابتك"] },
      { "id": "q14", "number": 14, "lines": ["I will can finish the project tomorrow."], "options": [], "fields": ["إجابتك"] },
      { "id": "q15", "number": 15, "lines": ["Could you to repeat the question?"], "options": [], "fields": ["إجابتك"] }
    ]
  },
  {
    "level": 4,
    "title": "المستوى الرابع: فهم المعنى",
    "context": [],
    "questions": [
      { "id": "q16", "number": 16, "lines": ["ما الفرق بين:", "I can swim.", "I could swim when I was six."], "options": [], "fields": ["إجابتك"] },
      { "id": "q17", "number": 17, "lines": ["ما وظيفة COULD في الجملة:", "Could you open the door, please?"], "options": [], "fields": ["إجابتك"] },
      { "id": "q18", "number": 18, "lines": ["ما وظيفة COULD في الجملة:", "It could rain tomorrow."], "options": [], "fields": ["إجابتك"] },
      { "id": "q19", "number": 19, "lines": ["لماذا نستخدم was able to غالبًا في الجملة التالية؟", "Although the problem was difficult, she was able to solve it."], "options": [], "fields": ["إجابتك"] },
      { "id": "q20", "number": 20, "lines": ["هل يمكن أن تعني Can you open the door؟ القدرة أو الطلب بحسب السياق؟ اشرح."], "options": [], "fields": ["إجابتك"] }
    ]
  },
  {
    "level": 5,
    "title": "المستوى الخامس: Final IQ200 Boss",
    "context": [
      "أكمل الحوار باستخدام التعبير المناسب.",
      "The School Technology Club",
      "Maya: ______ you design a simple robot?",
      "Omar: Yes, I can. But when I was younger, I ______ understand electronic circuits.",
      "Maya: Interesting! ______ you help me build a small robot, please?",
      "Omar: Of course. We ______ work together after school. That's one idea.",
      "Maya: Great! After a few months of practice, I think I ______ build more advanced robots."
    ],
    "questions": [
      { "id": "q21", "number": 21, "lines": ["الفراغ الأول: السؤال الأول عن القدرة الحالية."], "options": [], "fields": ["إجابتك"] },
      { "id": "q22", "number": 22, "lines": ["الفراغ الثاني: عدم القدرة في الماضي."], "options": [], "fields": ["إجابتك"] },
      { "id": "q23", "number": 23, "lines": ["الفراغ الثالث: طلب المساعدة بصورة مهذبة."], "options": [], "fields": ["إجابتك"] },
      { "id": "q24", "number": 24, "lines": ["الفراغ الرابع: تقديم اقتراح."], "options": [], "fields": ["إجابتك"] },
      { "id": "q25", "number": 25, "lines": ["الفراغ الخامس: التعبير عن قدرة مستقبلية."], "options": [], "fields": ["إجابتك"] }
    ]
  }
];
export const TEST_QUESTIONS_42 = TEST_LEVELS_42.flatMap(level => level.questions);
export const TEST_QUESTION_COUNT_42 = TEST_QUESTIONS_42.length;
export const TEST_LEVEL_COUNT_42 = TEST_LEVELS_42.length;
export type TestAnswers42 = Record<string,string>;
export function testComplete42(answers:TestAnswers42) { return TEST_QUESTIONS_42.every(q=>q.fields.every((_,i)=>Boolean(answers[`${q.id}-${i}`]?.trim()))); }
