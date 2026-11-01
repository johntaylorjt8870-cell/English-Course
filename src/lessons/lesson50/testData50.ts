/**
 * Student-facing prompts only. Solutions live in `testKey50.ts` and are
 * imported dynamically only after submission.
 */
export type TestLevel50 = 1 | 2 | 3 | 4;

export type TestQuestion50 = {
  id: string;
  number: number;
  level: TestLevel50;
  type: "choice" | "text";
  prompt: string;
  contextAr?: string;
  placeholder?: string;
  options?: readonly { id: string; text: string; lang: "en" | "ar" }[];
};

const en = (values: readonly string[]) =>
  values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "en" as const }));

export const TEST_LEVELS_50 = [
  {
    level: 1,
    title: "اختر الإجابة الصحيحة",
    en: "MULTIPLE CHOICE",
    instruction: "اقرأ دليل الجملة أولًا، ثم اختر درجة التأكد والزمن الصحيحين.",
  },
  {
    level: 2,
    title: "أكمل الجمل",
    en: "COMPLETE",
    instruction: "اكتب الكلمة أو التركيب الناقص، أو الجملة كاملة.",
  },
  {
    level: 3,
    title: "صحح الخطأ",
    en: "CORRECT THE ERRORS",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح مع الحفاظ على المعنى المقصود.",
  },
  {
    level: 4,
    title: "ترجم إلى الإنجليزية",
    en: "TRANSLATE",
    instruction: "اكتب الترجمة الإنجليزية؛ يُقبل البديل الصحيح الذي يحافظ على الزمن ودرجة التأكد.",
  },
] as const;

export const TEST_QUESTIONS_50: readonly TestQuestion50[] = [
  /* ---------- المجموعة الأولى: 10 اختيار من متعدد ---------- */
  {
    id: "q1",
    number: 1,
    level: 1,
    type: "choice",
    prompt: "She has been working for twelve hours. She ________ be exhausted.",
    options: en(["must", "can't", "might have"]),
  },
  {
    id: "q2",
    number: 2,
    level: 1,
    type: "choice",
    prompt: "He ________ be at home. I can see him in the office.",
    options: en(["must", "can't", "might"]),
  },
  {
    id: "q3",
    number: 3,
    level: 1,
    type: "choice",
    prompt: "They ________ have forgotten the appointment. They wrote it in their diaries.",
    options: en(["must", "can't", "should"]),
  },
  {
    id: "q4",
    number: 4,
    level: 1,
    type: "choice",
    prompt: "The streets are wet. It ________ have rained last night.",
    options: en(["must", "must be", "can't be"]),
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    type: "choice",
    prompt: "She ________ be studying now. Her bedroom light is on.",
    options: en(["must", "must have", "must have been"]),
  },
  {
    id: "q6",
    number: 6,
    level: 1,
    type: "choice",
    prompt: "He ________ have been sleeping when I called.",
    options: en(["might", "might be", "might have"]),
  },
  {
    id: "q7",
    number: 7,
    level: 1,
    type: "choice",
    prompt: "You ________ be serious! That's impossible!",
    options: en(["can't", "must", "must have"]),
  },
  {
    id: "q8",
    number: 8,
    level: 1,
    type: "choice",
    prompt: "They ________ be waiting outside. I'm not certain.",
    options: en(["might", "must have", "can't have"]),
  },
  {
    id: "q9",
    number: 9,
    level: 1,
    type: "choice",
    prompt: "He ________ have stolen the money. He was with me all evening.",
    options: en(["must", "can't", "should"]),
  },
  {
    id: "q10",
    number: 10,
    level: 1,
    type: "choice",
    prompt: "She ________ know the answer. She's an expert.",
    options: en(["must", "must have", "can't have"]),
  },

  /* ---------- المجموعة الثانية: 5 إكمال ---------- */
  {
    id: "q11",
    number: 11,
    level: 2,
    type: "text",
    prompt: "He must ________ (be) very tired.",
    contextAr: "اكتب الكلمة الناقصة، أو الجملة كاملة.",
  },
  {
    id: "q12",
    number: 12,
    level: 2,
    type: "text",
    prompt: "They might have ________ (take) the wrong road.",
    contextAr: "اكتب التصريف الثالث، أو الجملة كاملة.",
  },
  {
    id: "q13",
    number: 13,
    level: 2,
    type: "text",
    prompt: "She can't ________ (be) serious.",
    contextAr: "اكتب الكلمة الناقصة، أو الجملة كاملة.",
  },
  {
    id: "q14",
    number: 14,
    level: 2,
    type: "text",
    prompt: "He must have been ________ (work) all night.",
    contextAr: "نشاط كان مستمرًا في الماضي.",
  },
  {
    id: "q15",
    number: 15,
    level: 2,
    type: "text",
    prompt: "The children could be ________ (play) outside.",
    contextAr: "نشاط يُتصوَّر حدوثه الآن.",
  },

  /* ---------- المجموعة الثالثة: 5 تصحيحات ---------- */
  { id: "q16", number: 16, level: 3, type: "text", prompt: "She must has left." },
  { id: "q17", number: 17, level: 3, type: "text", prompt: "He can't be went to school.", contextAr: "صحح الجملة محافظًا على معنى النفي القوي." },
  { id: "q18", number: 18, level: 3, type: "text", prompt: "They might have saw us." },
  { id: "q19", number: 19, level: 3, type: "text", prompt: "He must have been sleep." },
  { id: "q20", number: 20, level: 3, type: "text", prompt: "She mustn't be the manager. She's only a student.", contextAr: "المقصود: لا يمكن أن تكون المديرة." },

  /* ---------- المجموعة الرابعة: 5 ترجمات ---------- */
  { id: "q21", number: 21, level: 4, type: "text", prompt: "لا بد أنهم في المنزل الآن.", placeholder: "They must…" },
  { id: "q22", number: 22, level: 4, type: "text", prompt: "ربما نسيت هاتفها في السيارة.", placeholder: "She might have…" },
  { id: "q23", number: 23, level: 4, type: "text", prompt: "لا يمكن أنه كان يقود السيارة في ذلك الوقت.", placeholder: "He can't have been…" },
  { id: "q24", number: 24, level: 4, type: "text", prompt: "ربما تكون تتحدث مع والدتها الآن.", placeholder: "She might be…" },
  { id: "q25", number: 25, level: 4, type: "text", prompt: "لا بد أنه كان يدرس عندما اتصلت به.", placeholder: "He must have been…" },
] as const;

export const TEST_QUESTION_COUNT_50 = TEST_QUESTIONS_50.length;

export function answeredCount50(answers: Record<string, string>): number {
  return TEST_QUESTIONS_50.filter((q) => Boolean(answers[q.id]?.trim())).length;
}

export function testComplete50(answers: Record<string, string>): boolean {
  return answeredCount50(answers) === TEST_QUESTION_COUNT_50;
}
