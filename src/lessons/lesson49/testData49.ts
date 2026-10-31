/**
 * Student-facing prompts only. Solutions live in `testKey49.ts` and are
 * imported dynamically only after submission.
 */
export type TestLevel49 = 1 | 2 | 3 | 4;

export type TestQuestion49 = {
  id: string;
  number: number;
  level: TestLevel49;
  type: "choice" | "text";
  prompt: string;
  contextAr?: string;
  placeholder?: string;
  options?: readonly { id: string; text: string; lang: "en" | "ar" }[];
};

const en = (values: readonly string[]) =>
  values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "en" as const }));

export const TEST_LEVELS_49 = [
  {
    level: 1,
    title: "اختر الإجابة الصحيحة",
    en: "MULTIPLE CHOICE",
    instruction: "حدد الوظيفة والمعنى أولًا، ثم اختر الصيغة الصحيحة.",
  },
  {
    level: 2,
    title: "أكمل الجمل",
    en: "COMPLETE",
    instruction: "اكتب التصريف الثالث، أو الصيغة كاملة، أو الجملة كاملة.",
  },
  {
    level: 3,
    title: "صحح الأخطاء",
    en: "CORRECT THE ERRORS",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح مع الحفاظ على المعنى.",
  },
  {
    level: 4,
    title: "ترجم إلى الإنجليزية",
    en: "TRANSLATE",
    instruction: "اكتب الترجمة الإنجليزية؛ يُقبل البديل الصحيح الذي يحافظ على المعنى والتركيب.",
  },
] as const;

export const TEST_QUESTIONS_49: readonly TestQuestion49[] = [
  /* ---------- القسم الأول: 10 اختيار من متعدد ---------- */
  {
    id: "q1",
    number: 1,
    level: 1,
    type: "choice",
    prompt: "He looks exhausted. He ______ have worked all night.",
    options: en(["must", "should", "needn't"]),
  },
  {
    id: "q2",
    number: 2,
    level: 1,
    type: "choice",
    prompt: "She ______ have forgotten my birthday, but I'm not sure.",
    options: en(["might", "mustn't", "should"]),
  },
  {
    id: "q3",
    number: 3,
    level: 1,
    type: "choice",
    prompt: "You ______ have told me about the problem yesterday.",
    contextAr: "انتبه: الفراغ يتبعه have، فاختر الصيغة التي تكوّن جملة صحيحة.",
    options: en(["should", "should have", "must have"]),
  },
  {
    id: "q4",
    number: 4,
    level: 1,
    type: "choice",
    prompt: "I ______ have bought a new laptop. My old one was working perfectly.",
    contextAr: "الشراء حدث بالفعل، لكنه لم يكن ضروريًا. انتبه إلى have بعد الفراغ.",
    options: en(["needn't", "needn't have", "must have"]),
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    type: "choice",
    prompt: "He couldn't have ______ the message.",
    options: en(["saw", "see", "seen"]),
  },
  {
    id: "q6",
    number: 6,
    level: 1,
    type: "choice",
    prompt: "They might have ______ the wrong train.",
    options: en(["take", "taken", "took"]),
  },
  {
    id: "q7",
    number: 7,
    level: 1,
    type: "choice",
    prompt: "You shouldn't have ______ to her like that.",
    options: en(["spoken", "speak", "spoke"]),
  },
  {
    id: "q8",
    number: 8,
    level: 1,
    type: "choice",
    prompt: "I would have helped you if I ______.",
    options: en(["know", "had known", "have known"]),
  },
  {
    id: "q9",
    number: 9,
    level: 1,
    type: "choice",
    prompt: "Which sentence expresses a strong deduction about the past?",
    options: en(["He might have left.", "He must have left.", "He should leave."]),
  },
  {
    id: "q10",
    number: 10,
    level: 1,
    type: "choice",
    prompt: "Which sentence means that an action happened but was unnecessary?",
    options: en(["I didn't need to buy it.", "I needn't have bought it.", "I should have bought it."]),
  },

  /* ---------- القسم الثاني: 5 إكمال ---------- */
  {
    id: "q11",
    number: 11,
    level: 2,
    type: "text",
    prompt: "She must have ________ (go) home.",
    contextAr: "اكتب V3 من go، أو الجملة كاملة.",
  },
  {
    id: "q12",
    number: 12,
    level: 2,
    type: "text",
    prompt: "You should have ________ (call) me.",
    contextAr: "اكتب V3 من call، أو الجملة كاملة.",
  },
  {
    id: "q13",
    number: 13,
    level: 2,
    type: "text",
    prompt: "They might have ________ (forget) the keys.",
    contextAr: "اكتب V3 من forget، أو الجملة كاملة.",
  },
  {
    id: "q14",
    number: 14,
    level: 2,
    type: "text",
    prompt: "He could have ________ (win) the competition.",
    contextAr: "اكتب V3 من win، أو الجملة كاملة.",
  },
  {
    id: "q15",
    number: 15,
    level: 2,
    type: "text",
    prompt: "I shouldn't have ________ (eat) so much.",
    contextAr: "اكتب V3 من eat، أو الجملة كاملة.",
  },

  /* ---------- القسم الثالث: 5 تصحيحات ---------- */
  { id: "q16", number: 16, level: 3, type: "text", prompt: "She must has arrived." },
  { id: "q17", number: 17, level: 3, type: "text", prompt: "He might had forgotten." },
  { id: "q18", number: 18, level: 3, type: "text", prompt: "You should have went to school." },
  { id: "q19", number: 19, level: 3, type: "text", prompt: "They could have saw us." },
  { id: "q20", number: 20, level: 3, type: "text", prompt: "I needn't have took a taxi." },

  /* ---------- القسم الرابع: 5 ترجمات ---------- */
  { id: "q21", number: 21, level: 4, type: "text", prompt: "لا بد أنها وصلت مبكرًا.", placeholder: "She must have…" },
  { id: "q22", number: 22, level: 4, type: "text", prompt: "ربما لم يفهم السؤال.", placeholder: "He might not have…" },
  { id: "q23", number: 23, level: 4, type: "text", prompt: "كان ينبغي عليهم أن يساعدونا.", placeholder: "They should have…" },
  { id: "q24", number: 24, level: 4, type: "text", prompt: "لم يكن ينبغي لك أن تشتري ذلك الهاتف.", placeholder: "You shouldn't have…" },
  { id: "q25", number: 25, level: 4, type: "text", prompt: "كنت سأذهب معك لو كنت قد أخبرتني.", placeholder: "I would have gone…" },
] as const;

export const TEST_QUESTION_COUNT_49 = TEST_QUESTIONS_49.length;

export function answeredCount49(answers: Record<string, string>): number {
  return TEST_QUESTIONS_49.filter((q) => Boolean(answers[q.id]?.trim())).length;
}

export function testComplete49(answers: Record<string, string>): boolean {
  return answeredCount49(answers) === TEST_QUESTION_COUNT_49;
}
