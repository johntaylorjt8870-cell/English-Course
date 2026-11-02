/**
 * Student-facing prompts only. Solutions live in `testKey52.ts` and are
 * imported dynamically only after submission.
 */
export type TestLevel52 = 1 | 2 | 3 | 4 | 5;

export type TestQuestion52 = {
  id: string;
  number: number;
  level: TestLevel52;
  type: "choice" | "text";
  prompt: string;
  contextAr?: string;
  placeholder?: string;
  options?: readonly { id: string; text: string; lang: "en" | "ar" }[];
};

const en = (values: readonly string[]) =>
  values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "en" as const }));

export const TEST_LEVELS_52 = [
  {
    level: 1,
    title: "اختر الإجابة الصحيحة",
    en: "MULTIPLE CHOICE",
    instruction: "اقرأ الجملة كاملة، ثم اختر الصيغة الصحيحة.",
    count: 8,
  },
  {
    level: 2,
    title: "أكمل الجمل",
    en: "COMPLETE",
    instruction: "اكتب الفعل بين القوسين بالصورة الصحيحة، والجملة كاملة.",
    count: 5,
  },
  {
    level: 3,
    title: "صحح الأخطاء",
    en: "CORRECT THE ERRORS",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح مع الحفاظ على المعنى المقصود.",
    count: 5,
  },
  {
    level: 4,
    title: "حدد نوع الشرط",
    en: "IDENTIFY THE TYPE",
    instruction: "اكتب Zero Conditional أو First Conditional حسب الحالة.",
    count: 3,
  },
  {
    level: 5,
    title: "ترجم إلى الإنجليزية",
    en: "TRANSLATE",
    instruction: "اكتب الترجمة الإنجليزية؛ يُقبل البديل الصحيح الذي يحافظ على المعنى والتركيب.",
    count: 4,
  },
] as const;

export const TEST_QUESTIONS_52: readonly TestQuestion52[] = [
  /* ---------- القسم الأول: 8 اختيار من متعدد ---------- */
  {
    id: "q1",
    number: 1,
    level: 1,
    type: "choice",
    prompt: "If she _____ hard, she will succeed.",
    options: en(["work", "works", "will work", "worked"]),
  },
  {
    id: "q2",
    number: 2,
    level: 1,
    type: "choice",
    prompt: "If I see him, I _____ him the news.",
    options: en(["tell", "told", "will tell", "telling"]),
  },
  {
    id: "q3",
    number: 3,
    level: 1,
    type: "choice",
    prompt: "If they don't leave now, they _____ late.",
    options: en(["are", "were", "will be", "be"]),
  },
  {
    id: "q4",
    number: 4,
    level: 1,
    type: "choice",
    prompt: "What will you do if you _____ the competition?",
    options: en(["win", "will win", "won", "winning"]),
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    type: "choice",
    prompt: "If he doesn't _____, he will miss the bus.",
    options: en(["hurries", "hurry", "hurried", "hurrying"]),
  },
  {
    id: "q6",
    number: 6,
    level: 1,
    type: "choice",
    prompt: "Unless you study, you _____ pass.",
    options: en(["will", "won't", "are", "can to"]),
  },
  {
    id: "q7",
    number: 7,
    level: 1,
    type: "choice",
    prompt: "When she _____ home, she will call me.",
    options: en(["will arrive", "arrived", "arrives", "arriving"]),
  },
  {
    id: "q8",
    number: 8,
    level: 1,
    type: "choice",
    prompt: "If you feel tired, you _____ take a rest.",
    options: en(["should", "should to", "will should", "are"]),
  },

  /* ---------- القسم الثاني: 5 إكمال ---------- */
  {
    id: "q9",
    number: 9,
    level: 2,
    type: "text",
    prompt: "If he (not study), he (fail) the test.",
    contextAr: "اكتب الجملة كاملة بعد تصريف الفعلين.",
    placeholder: "If he ..., he ... the test.",
  },
  {
    id: "q10",
    number: 10,
    level: 2,
    type: "text",
    prompt: "If we (have) enough time, we (visit) the museum.",
    contextAr: "اكتب الجملة كاملة بعد تصريف الفعلين.",
    placeholder: "If we ..., we ... the museum.",
  },
  {
    id: "q11",
    number: 11,
    level: 2,
    type: "text",
    prompt: "If she (practice) every day, she (improve).",
    contextAr: "اكتب الجملة كاملة بعد تصريف الفعلين.",
    placeholder: "If she ..., she ...",
  },
  {
    id: "q12",
    number: 12,
    level: 2,
    type: "text",
    prompt: "If it (not stop) raining, we (not go) outside.",
    contextAr: "اكتب الجملة كاملة بعد تصريف الفعلين، مع نفي الشرط والنتيجة.",
    placeholder: "If it ..., we ... outside.",
  },
  {
    id: "q13",
    number: 13,
    level: 2,
    type: "text",
    prompt: "If you (need) anything, (call) me.",
    contextAr: "اكتب الجملة كاملة، ولاحظ أن النتيجة أمر.",
    placeholder: "If you ..., ... me.",
  },

  /* ---------- القسم الثالث: 5 تصحيح ---------- */
  {
    id: "q14",
    number: 14,
    level: 3,
    type: "text",
    prompt: "If she will come, I will talk to her.",
    contextAr: "صحح الخطأ مع الحفاظ على المعنى.",
    placeholder: "Write the full corrected sentence…",
  },
  {
    id: "q15",
    number: 15,
    level: 3,
    type: "text",
    prompt: "If he don't work, he won't earn money.",
    contextAr: "صحح الخطأ مع الحفاظ على المعنى.",
    placeholder: "Write the full corrected sentence…",
  },
  {
    id: "q16",
    number: 16,
    level: 3,
    type: "text",
    prompt: "If I will finish early, I will help you.",
    contextAr: "صحح الخطأ مع الحفاظ على المعنى.",
    placeholder: "Write the full corrected sentence…",
  },
  {
    id: "q17",
    number: 17,
    level: 3,
    type: "text",
    prompt: "Unless you don't listen, you will understand.",
    contextAr: "صحح الخطأ مع الحفاظ على المعنى المقصود.",
    placeholder: "Write the full corrected sentence…",
  },
  {
    id: "q18",
    number: 18,
    level: 3,
    type: "text",
    prompt: "When they will arrive, we will begin.",
    contextAr: "صحح الخطأ مع الحفاظ على المعنى.",
    placeholder: "Write the full corrected sentence…",
  },

  /* ---------- القسم الرابع: 3 تحديد النوع ---------- */
  {
    id: "q19",
    number: 19,
    level: 4,
    type: "choice",
    prompt: "If you don't water plants, they die.",
    contextAr: "حدد نوع الشرط.",
    options: en(["Zero Conditional", "First Conditional"]),
  },
  {
    id: "q20",
    number: 20,
    level: 4,
    type: "choice",
    prompt: "If I have enough money next month, I will travel.",
    contextAr: "حدد نوع الشرط.",
    options: en(["Zero Conditional", "First Conditional"]),
  },
  {
    id: "q21",
    number: 21,
    level: 4,
    type: "choice",
    prompt: "If you freeze water, it becomes ice.",
    contextAr: "حدد نوع الشرط.",
    options: en(["Zero Conditional", "First Conditional"]),
  },

  /* ---------- القسم الخامس: 4 ترجمة ---------- */
  {
    id: "q22",
    number: 22,
    level: 5,
    type: "text",
    prompt: "إذا درست بجد، فسوف تحقق هدفك.",
    contextAr: "ترجم إلى الإنجليزية.",
    placeholder: "If you study hard, ...",
  },
  {
    id: "q23",
    number: 23,
    level: 5,
    type: "text",
    prompt: "ماذا ستفعل إذا فقدت هاتفك؟",
    contextAr: "ترجم إلى الإنجليزية.",
    placeholder: "What will you do if ...?",
  },
  {
    id: "q24",
    number: 24,
    level: 5,
    type: "text",
    prompt: "إذا لم يصل في الوقت المحدد، فلن ننتظره.",
    contextAr: "ترجم إلى الإنجليزية.",
    placeholder: "If he ... on time, we ...",
  },
  {
    id: "q25",
    number: 25,
    level: 5,
    type: "text",
    prompt: "ما لم تتدرب، فلن تتحسن.",
    contextAr: "ترجم إلى الإنجليزية.",
    placeholder: "Unless you ..., you ...",
  },
] as const;

export const TEST_QUESTION_COUNT_52 = TEST_QUESTIONS_52.length;

const isTextAnswer = (value: string) => value.trim().length > 0;

export function answeredCount52(answers: Record<string, string>): number {
  return TEST_QUESTIONS_52.filter((question) => isTextAnswer(answers[question.id] ?? "")).length;
}

export function testComplete52(answers: Record<string, string>): boolean {
  return TEST_QUESTIONS_52.every((question) => isTextAnswer(answers[question.id] ?? ""));
}
