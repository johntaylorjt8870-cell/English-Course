/**
 * Student-facing prompts only. Solutions live in `testKey51.ts` and are
 * imported dynamically only after submission.
 */
export type TestLevel51 = 1 | 2 | 3 | 4;

export type TestQuestion51 = {
  id: string;
  number: number;
  level: TestLevel51;
  type: "choice" | "text";
  prompt: string;
  contextAr?: string;
  placeholder?: string;
  options?: readonly { id: string; text: string; lang: "en" | "ar" }[];
};

const en = (values: readonly string[]) =>
  values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "en" as const }));

export const TEST_LEVELS_51 = [
  {
    level: 1,
    title: "اختر الإجابة الصحيحة",
    en: "MULTIPLE CHOICE",
    instruction: "اقرأ الجملة كاملًا، ثم اختر التصريف أو الصيغة الصحيحة.",
  },
  {
    level: 2,
    title: "أكمل الجمل",
    en: "COMPLETE",
    instruction: "اكتب الفعل بين القوسين بالشكل الصحيح، أو الكلمة الناقصة.",
  },
  {
    level: 3,
    title: "صحح الأخطاء",
    en: "CORRECT THE ERRORS",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح مع الحفاظ على المعنى المقصود.",
  },
  {
    level: 4,
    title: "ترجم إلى الإنجليزية",
    en: "TRANSLATE",
    instruction: "اكتب الترجمة الإنجليزية؛ يُقبل البديل الصحيح الذي يحافظ على المعنى والتركيب.",
  },
] as const;

export const TEST_QUESTIONS_51: readonly TestQuestion51[] = [
  /* ---------- المجموعة الأولى: 10 اختيار من متعدد ---------- */
  {
    id: "q1",
    number: 1,
    level: 1,
    type: "choice",
    prompt: "If you heat ice, it ________.",
    options: en(["melt", "melts", "melted"]),
  },
  {
    id: "q2",
    number: 2,
    level: 1,
    type: "choice",
    prompt: "If he ________ too much sugar, he feels sick.",
    options: en(["eat", "eats", "eating"]),
  },
  {
    id: "q3",
    number: 3,
    level: 1,
    type: "choice",
    prompt: "If plants don't get enough water, they ________.",
    options: en(["die", "dies", "will died"]),
  },
  {
    id: "q4",
    number: 4,
    level: 1,
    type: "choice",
    prompt: "If she ________ late, she misses the bus.",
    options: en(["wake up", "wakes up", "waking up"]),
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    type: "choice",
    prompt: "If you mix red and white, you ________ pink.",
    options: en(["get", "gets", "getting"]),
  },
  {
    id: "q6",
    number: 6,
    level: 1,
    type: "choice",
    prompt: "If my phone battery is empty, my phone ________ working.",
    options: en(["stop", "stops", "stopping"]),
  },
  {
    id: "q7",
    number: 7,
    level: 1,
    type: "choice",
    prompt: "If people don't exercise, they ________ less fit.",
    options: en(["becomes", "becoming", "become"]),
  },
  {
    id: "q8",
    number: 8,
    level: 1,
    type: "choice",
    prompt: "If he doesn't ________ breakfast, he gets hungry.",
    options: en(["eats", "eat", "eating"]),
  },
  {
    id: "q9",
    number: 9,
    level: 1,
    type: "choice",
    prompt: "Which sentence is Zero Conditional?",
    options: en(["If it rains tomorrow, I will stay home.", "If you heat water, it boils.", "If I studied, I would pass."]),
  },
  {
    id: "q10",
    number: 10,
    level: 1,
    type: "choice",
    prompt: "Which sentence describes a repeated personal habit?",
    options: en(["If I feel stressed, I listen to music.", "If I feel stressed tomorrow, I will call you.", "If I felt stressed, I would leave."]),
  },

  /* ---------- المجموعة الثانية: 5 إكمال ---------- */
  {
    id: "q11",
    number: 11,
    level: 2,
    type: "text",
    prompt: "If water ________ (reach) 100°C at standard atmospheric pressure, it boils.",
    contextAr: "اكتب الفعل بالشكل الصحيح، أو الجملة كاملة.",
  },
  {
    id: "q12",
    number: 12,
    level: 2,
    type: "text",
    prompt: "If he ________ (not / study), he doesn't understand the lesson.",
    contextAr: "صغ النفي بالشكل الصحيح، أو اكتب الجملة كاملة.",
  },
  {
    id: "q13",
    number: 13,
    level: 2,
    type: "text",
    prompt: "If you ________ (press) this button, the machine starts.",
    contextAr: "اكتب الفعل بالشكل الصحيح، أو الجملة كاملة.",
  },
  {
    id: "q14",
    number: 14,
    level: 2,
    type: "text",
    prompt: "If my sister ________ (feel) sick, she stays at home.",
    contextAr: "انتبه إلى الفاعل، أو اكتب الجملة كاملة.",
  },
  {
    id: "q15",
    number: 15,
    level: 2,
    type: "text",
    prompt: "If people ________ (not / drink) enough water, they become dehydrated.",
    contextAr: "صغ النفي بالشكل الصحيح، أو اكتب الجملة كاملة.",
  },

  /* ---------- المجموعة الثالثة: 5 تصحيحات ---------- */
  { id: "q16", number: 16, level: 3, type: "text", prompt: "If he eat too much, he feels sick." },
  { id: "q17", number: 17, level: 3, type: "text", prompt: "If she doesn't studies, she fails." },
  {
    id: "q18",
    number: 18,
    level: 3,
    type: "text",
    prompt: "If you will heat ice, it melts.",
    contextAr: "المقصود: حقيقة عامة بالشرط الصفري.",
  },
  { id: "q19", number: 19, level: 3, type: "text", prompt: "If plants doesn't get sunlight, they grow poorly." },
  { id: "q20", number: 20, level: 3, type: "text", prompt: "If my father feel tired, he takes a rest." },

  /* ---------- المجموعة الرابعة: 5 ترجمات ---------- */
  { id: "q21", number: 21, level: 4, type: "text", prompt: "إذا تجمد الماء، فإنه يتحول إلى ثلج.", placeholder: "If water freezes…" },
  { id: "q22", number: 22, level: 4, type: "text", prompt: "إذا لم أشرب القهوة صباحًا، أشعر بالنعاس.", placeholder: "If I don't drink coffee…" },
  { id: "q23", number: 23, level: 4, type: "text", prompt: "إذا لم يشحن هاتفه، تنفد البطارية.", placeholder: "If he doesn't charge his phone…" },
  { id: "q24", number: 24, level: 4, type: "text", prompt: "ماذا يحدث إذا لم يحصل الإنسان على نوم كافٍ؟", placeholder: "What happens if…?" },
  { id: "q25", number: 25, level: 4, type: "text", prompt: "إذا شعرت أختي بالتوتر، تستمع إلى الموسيقى.", placeholder: "If my sister feels stressed…" },
] as const;

export const TEST_QUESTION_COUNT_51 = TEST_QUESTIONS_51.length;

export function answeredCount51(answers: Record<string, string>): number {
  return TEST_QUESTIONS_51.filter((q) => Boolean(answers[q.id]?.trim())).length;
}

export function testComplete51(answers: Record<string, string>): boolean {
  return answeredCount51(answers) === TEST_QUESTION_COUNT_51;
}
