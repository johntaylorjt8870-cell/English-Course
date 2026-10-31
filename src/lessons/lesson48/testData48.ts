/**
 * Student-facing prompts only. Solutions live in `testKey48.ts` and are
 * imported dynamically only after submission.
 */
export type TestLevel48 = 1 | 2 | 3 | 4 | 5;

export type TestQuestion48 = {
  id: string;
  number: number;
  level: TestLevel48;
  type: "choice" | "text";
  prompt: string;
  contextAr?: string;
  placeholder?: string;
  options?: readonly { id: string; text: string; lang: "en" | "ar" }[];
};

const en = (values: readonly string[]) => values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "en" as const }));
const ar = (values: readonly string[]) => values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "ar" as const }));

export const TEST_LEVELS_48 = [
  { level: 1, title: "اختر الإجابة الصحيحة", en: "MULTIPLE CHOICE", instruction: "حدد الوظيفة المطلوبة أولًا، ثم اختر الصيغة الصحيحة." },
  { level: 2, title: "أكمل الجمل", en: "COMPLETE", instruction: "اكتب الكلمة أو العبارة الناقصة، أو الجملة كاملة." },
  { level: 3, title: "صحح الخطأ", en: "CORRECT THE ERROR", instruction: "أعد كتابة الجملة كاملة بعد التصحيح مع الحفاظ على المعنى." },
  { level: 4, title: "افهم الفرق", en: "UNDERSTAND THE DIFFERENCE", instruction: "اختر التفسير الذي يحافظ على المعنى، لا الكلمات وحدها." },
  { level: 5, title: "تحدي بناء الحوار", en: "BUILD THE DIALOGUE", instruction: "أكمل الفراغات السبعة، ثم اكتب الأفعال بالترتيب مفصولة بفواصل." },
] as const;

export const TEST_QUESTIONS_48: readonly TestQuestion48[] = [
  /* ---------- المستوى الأول: 10 أسئلة اختيار ---------- */
  { id: "q1", number: 1, level: 1, type: "choice", prompt: "She ______ speak three languages.", options: en(["cans", "can", "can to"]) },
  { id: "q2", number: 2, level: 1, type: "choice", prompt: "It ______ rain tomorrow, but I'm not sure.", options: en(["might", "mustn't", "has to"]) },
  { id: "q3", number: 3, level: 1, type: "choice", prompt: "You ______ wear a seat belt in the car.", options: en(["should to", "must", "must to"]) },
  {
    id: "q4",
    number: 4,
    level: 1,
    type: "choice",
    prompt: "You ______ use your phone during the examination. It is forbidden.",
    options: en(["don't have to", "mustn't", "needn't"]),
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    type: "choice",
    prompt: "You ______ bring food. We have already prepared everything.",
    options: en(["mustn't", "don't have to", "should"]),
  },
  { id: "q6", number: 6, level: 1, type: "choice", prompt: "You ______ see a doctor if you feel worse.", options: en(["should", "should to", "shoulds"]) },
  { id: "q7", number: 7, level: 1, type: "choice", prompt: "______ I borrow your pen, please?", options: en(["Must", "May", "Have"]) },
  { id: "q8", number: 8, level: 1, type: "choice", prompt: "I'd rather ______ at home tonight.", options: en(["staying", "to stay", "stay"]) },
  { id: "q9", number: 9, level: 1, type: "choice", prompt: "Would you mind ______ the door?", options: en(["closing", "to close", "close"]) },
  { id: "q10", number: 10, level: 1, type: "choice", prompt: "He ______ to work every Saturday.", options: en(["have", "has", "must has"]) },

  /* ---------- المستوى الثاني: 5 أسئلة إكمال ---------- */
  {
    id: "q11",
    number: 11,
    level: 2,
    type: "text",
    prompt: "When I was young, I ______ swim very well.",
    contextAr: "(قدرة عامة في الماضي)",
  },
  {
    id: "q12",
    number: 12,
    level: 2,
    type: "text",
    prompt: "She ______ be at home, but I'm not certain.",
    contextAr: "(احتمال — تقبل أكثر من صيغة صحيحة)",
  },
  {
    id: "q13",
    number: 13,
    level: 2,
    type: "text",
    prompt: "We ______ finish this task today because the deadline is tomorrow.",
    contextAr: "(ضرورة — تقبل أكثر من صيغة صحيحة)",
  },
  {
    id: "q14",
    number: 14,
    level: 2,
    type: "text",
    prompt: "You ______ hurry. We have plenty of time.",
    contextAr: "(عدم ضرورة — تقبل أكثر من صيغة صحيحة)",
  },
  {
    id: "q15",
    number: 15,
    level: 2,
    type: "text",
    prompt: "I'd like ______ (learn) another language.",
    contextAr: "اكتب الصيغة الصحيحة للفعل بين القوسين.",
  },

  /* ---------- المستوى الثالث: 5 تصحيحات ---------- */
  { id: "q16", number: 16, level: 3, type: "text", prompt: "He must to study harder." },
  { id: "q17", number: 17, level: 3, type: "text", prompt: "Does she can drive?" },
  {
    id: "q18",
    number: 18,
    level: 3,
    type: "text",
    prompt: "You mustn't come early.",
    contextAr: "والمقصود: ليس من الضروري أن تأتي مبكرًا.",
  },
  { id: "q19", number: 19, level: 3, type: "text", prompt: "I'd rather to travel by train." },
  { id: "q20", number: 20, level: 3, type: "text", prompt: "Would you mind to wait here?" },

  /* ---------- المستوى الرابع: 4 أسئلة فهم الفرق ---------- */
  {
    id: "q21",
    number: 21,
    level: 4,
    type: "choice",
    prompt: "You mustn't leave. / You don't have to leave.",
    contextAr: "ما الفرق بين الجملتين؟",
    options: ar([
      "الأولى منع، والثانية عدم ضرورة: يمكنك المغادرة لكنك لست ملزمًا.",
      "كلتاهما تعبّران عن المنع.",
      "الأولى نصيحة، والثانية إلزام قوي.",
    ]),
  },
  {
    id: "q22",
    number: 22,
    level: 4,
    type: "choice",
    prompt: "I can swim. / I could swim when I was six.",
    contextAr: "ما الفرق بين الجملتين؟",
    options: ar([
      "الأولى قدرة في الحاضر، والثانية قدرة عامة في الماضي.",
      "كلتاهما تعبّران عن قدرة في الحاضر.",
      "الثانية طلب مهذب لشخص آخر.",
    ]),
  },
  {
    id: "q23",
    number: 23,
    level: 4,
    type: "choice",
    prompt: "You should study. / You must study.",
    contextAr: "ما الفرق بين الجملتين؟",
    options: ar([
      "الأولى نصيحة أو توصية، والثانية ضرورة أو إلزام قوي.",
      "كلتاهما نصيحة اختيارية.",
      "الأولى منع، والثانية احتمال.",
    ]),
  },
  {
    id: "q24",
    number: 24,
    level: 4,
    type: "choice",
    prompt: "He has to work. / He have to work.",
    contextAr: "لماذا الجملة الأولى صحيحة والثانية خاطئة؟",
    options: ar([
      "لأن HAVE TO يتغير مع الفاعل، فيصبح HAS TO مع He.",
      "لأن HAS TO تستخدم مع جميع الفاعلين.",
      "لأن HAVE TO لا تُستخدم في المضارع أصلًا.",
    ]),
  },

  /* ---------- المستوى الخامس: سؤال حوار واحد ---------- */
  {
    id: "q25",
    number: 25,
    level: 5,
    type: "text",
    prompt:
      "Maya: (1) ______ I come in?  ·  Teacher: Of course, you (2) ______.  ·  Maya: I (3) ______ finish my project today, but I don't know how to start.  ·  Teacher: You (4) ______ divide it into smaller tasks.  ·  Maya: (5) ______ you help me with the first part, please?  ·  Teacher: Certainly. You (6) ______ worry. We can work together.  ·  Maya: Thank you! I (7) ______ like to learn how to do it myself next time.",
    contextAr: "اكتب الأفعال السبعة بالترتيب مفصولة بفواصل، مثل: may, may, …",
    placeholder: "may, may, …",
  },
] as const;

export const TEST_QUESTION_COUNT_48 = TEST_QUESTIONS_48.length;

export function answeredCount48(answers: Record<string, string>): number {
  return TEST_QUESTIONS_48.filter((q) => Boolean(answers[q.id]?.trim())).length;
}

export function testComplete48(answers: Record<string, string>): boolean {
  return answeredCount48(answers) === TEST_QUESTION_COUNT_48;
}

export const DIALOGUE_BLANK_COUNT_48 = 7;
