// Source-derived §33 prompts only. Intentionally has no ledger, practice, or solutions imports.
export const TEST_LEVELS_43 = [
  {
    "level": 1,
    "title": "المستوى الأول: Multiple Choice",
    "context": [],
    "questions": [
      { "id": "q1", "number": 1, "lines": ["She ______ come tomorrow."], "options": ["A. may", "B. mays", "C. may to"], "fields": ["إجابتك"] },
      { "id": "q2", "number": 2, "lines": ["He might ______ late."], "options": ["A. arrives", "B. arrive", "C. arriving"], "fields": ["إجابتك"] },
      { "id": "q3", "number": 3, "lines": ["______ I use your pen, please?"], "options": ["A. May", "B. Do may", "C. Does"], "fields": ["إجابتك"] },
      { "id": "q4", "number": 4, "lines": ["They may not ______ the answer."], "options": ["A. knows", "B. know", "C. knowing"], "fields": ["إجابتك"] },
      { "id": "q5", "number": 5, "lines": ["She may have ______ the bus."], "options": ["A. miss", "B. missing", "C. missed"], "fields": ["إجابتك"] }
    ]
  },
  {
    "level": 2,
    "title": "المستوى الثاني: Complete the Sentences",
    "context": [],
    "questions": [
      { "id": "q6", "number": 6, "lines": ["It ______ (may / rain) tomorrow."], "options": [], "fields": ["إجابتك"] },
      { "id": "q7", "number": 7, "lines": ["He ______ (might / be) tired."], "options": [], "fields": ["إجابتك"] },
      { "id": "q8", "number": 8, "lines": ["They ______ (may / not / come) today."], "options": [], "fields": ["إجابتك"] },
      { "id": "q9", "number": 9, "lines": ["She ______ (might / have / forget) the meeting."], "options": [], "fields": ["الفعل الناقص", "HAVE", "V3"] },
      { "id": "q10", "number": 10, "lines": ["We ______ (may / have / make) a mistake."], "options": [], "fields": ["الفعل الناقص", "HAVE", "V3"] }
    ]
  },
  {
    "level": 3,
    "title": "المستوى الثالث: Correct the Mistakes",
    "context": [],
    "questions": [
      { "id": "q11", "number": 11, "lines": ["She mays be at home."], "options": [], "fields": ["إجابتك"] },
      { "id": "q12", "number": 12, "lines": ["He might comes tomorrow."], "options": [], "fields": ["إجابتك"] },
      { "id": "q13", "number": 13, "lines": ["They may to visit us."], "options": [], "fields": ["إجابتك"] },
      { "id": "q14", "number": 14, "lines": ["She may have went home."], "options": [], "fields": ["إجابتك"] },
      { "id": "q15", "number": 15, "lines": ["Maybe he tired."], "options": [], "fields": ["إجابتك"] }
    ]
  },
  {
    "level": 4,
    "title": "المستوى الرابع: Understand the Meaning",
    "context": [],
    "questions": [
      { "id": "q16", "number": 16, "lines": ["ما الفرق بين:", "She is at home.", "She may be at home."], "options": [], "fields": ["إجابتك"] },
      { "id": "q17", "number": 17, "lines": ["هل تعني MIGHT دائمًا أن الاحتمال أضعف من MAY؟ اشرح."], "options": [], "fields": ["إجابتك"] },
      { "id": "q18", "number": 18, "lines": ["ما الفرق بين:", "Maybe she is tired.", "She may be tired."], "options": [], "fields": ["إجابتك"] },
      { "id": "q19", "number": 19, "lines": ["ما معنى:", "He might have forgotten the appointment."], "options": [], "fields": ["إجابتك"] },
      { "id": "q20", "number": 20, "lines": ["ما وظيفة MAY في الجملة:", "May I ask a question?"], "options": [], "fields": ["إجابتك"] }
    ]
  },
  {
    "level": 5,
    "title": "المستوى الخامس: Final IQ200 Boss",
    "context": [
      "أكمل الحوار باستخدام التعبير المناسب.",
      "The Missing Homework",
      "Maya: Where is Omar? He isn't here yet.",
      "Daniel: He ______ be at the library.",
      "Maya: Or he ______ have missed the bus.",
      "Daniel: That's possible.",
      "Teacher: ______ I ask everyone to take their seats, please?",
      "Maya: Of course.",
      "Daniel: Omar ______ not arrive on time.",
      "Teacher: That's all right. ______ he has a good reason."
    ],
    "questions": [
      { "id": "q21", "number": 21, "lines": ["احتمال في الحاضر باستخدام MAY."], "options": [], "fields": ["إجابتك"] },
      { "id": "q22", "number": 22, "lines": ["احتمال يتعلق بالماضي باستخدام MIGHT HAVE."], "options": [], "fields": ["إجابتك"] },
      { "id": "q23", "number": 23, "lines": ["طلب مهذب باستخدام MAY."], "options": [], "fields": ["إجابتك"] },
      { "id": "q24", "number": 24, "lines": ["احتمال عدم حدوث شيء باستخدام MAY."], "options": [], "fields": ["إجابتك"] },
      { "id": "q25", "number": 25, "lines": ["استخدم MAYBE بوصفها كلمة مستقلة."], "options": [], "fields": ["إجابتك"] }
    ]
  }
];
export const TEST_QUESTIONS_43 = TEST_LEVELS_43.flatMap(level => level.questions);
export const TEST_QUESTION_COUNT_43 = TEST_QUESTIONS_43.length;
export const TEST_LEVEL_COUNT_43 = TEST_LEVELS_43.length;
export type TestAnswers43 = Record<string,string>;
export function testComplete43(answers:TestAnswers43) { return TEST_QUESTIONS_43.every(q=>q.fields.every((_,i)=>Boolean(answers[`${q.id}-${i}`]?.trim()))); }
