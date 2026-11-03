// ============================================================
// الدرس 54 — ㉑ الاختبار النهائي: 25 سؤالًا في خمسة أقسام
// بيانات الطالب فقط؛ مفتاح الإجابات في testKey54.ts ويُحمّل عند التسليم.
// ============================================================

export type TestQuestion54 = {
  id: string;
  number: number;
  level: 1 | 2 | 3 | 4 | 5;
  type: "choice" | "text";
  prompt: string;
  options?: readonly { id: string; text: string; lang: "en" }[];
};

const choices = (items: readonly string[]) =>
  items.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "en" as const }));

export const TEST_LEVELS_54 = [
  { level: 1, title: "القسم الأول: اختر الإجابة الصحيحة (1–8)", instruction: "اختر إجابة واحدة.", count: 8 },
  { level: 2, title: "القسم الثاني: أكمل الجمل (9–13)", instruction: "اكتب الجملة كاملة بعد إكمال الفعلين.", count: 5 },
  { level: 3, title: "القسم الثالث: صحح الأخطاء (14–18)", instruction: "اكتب الجملة كاملة بعد التصحيح.", count: 5 },
  { level: 4, title: "القسم الرابع: حدد نوع الشرط (19–21)", instruction: "اكتب Zero Conditional أو First Conditional أو Second Conditional أو Third Conditional.", count: 3 },
  { level: 5, title: "القسم الخامس: الترجمة (22–25)", instruction: "ترجم إلى الإنجليزية.", count: 4 },
] as const;

export const TEST_QUESTIONS_54: readonly TestQuestion54[] = [
  {
    id: "q1", number: 1, level: 1, type: "choice",
    prompt: "If I had studied harder, I _____ the exam.",
    options: choices(["would pass", "will pass", "would have passed", "passed"]),
  },
  {
    id: "q2", number: 2, level: 1, type: "choice",
    prompt: "If she _____ earlier, she would have caught the bus.",
    options: choices(["woke up", "had woken up", "would wake up", "wakes up"]),
  },
  {
    id: "q3", number: 3, level: 1, type: "choice",
    prompt: "If they had invited me, I _____ to the party.",
    options: choices(["would have gone", "will go", "would go", "went"]),
  },
  {
    id: "q4", number: 4, level: 1, type: "choice",
    prompt: "If he hadn't forgotten his keys, he _____ outside.",
    options: choices(["wouldn't wait", "wouldn't have waited", "won't wait", "doesn't wait"]),
  },
  {
    id: "q5", number: 5, level: 1, type: "choice",
    prompt: "What would you have done if you _____ your passport?",
    options: choices(["lose", "lost", "had lost", "will lose"]),
  },
  {
    id: "q6", number: 6, level: 1, type: "choice",
    prompt: "If we had had more money, we _____ a bigger house.",
    options: choices(["would buy", "will buy", "would have bought", "bought"]),
  },
  {
    id: "q7", number: 7, level: 1, type: "choice",
    prompt: "If she had practiced more, she _____ won the competition.",
    options: choices(["can", "might have", "will", "is"]),
  },
  {
    id: "q8", number: 8, level: 1, type: "choice",
    prompt: "If I had known, I _____ helped you.",
    options: choices(["will have", "would have", "would", "had"]),
  },
  { id: "q9", number: 9, level: 2, type: "text", prompt: "If he (study) harder, he (get) better grades." },
  { id: "q10", number: 10, level: 2, type: "text", prompt: "If we (leave) earlier, we (not miss) the train." },
  { id: "q11", number: 11, level: 2, type: "text", prompt: "If she (know) about the meeting, she (attend) it." },
  { id: "q12", number: 12, level: 2, type: "text", prompt: "If I (have) more money, I (buy) that laptop." },
  { id: "q13", number: 13, level: 2, type: "text", prompt: "If they (not invite) us, we (not come) to the party." },
  { id: "q14", number: 14, level: 3, type: "text", prompt: "If I would have studied, I would have passed." },
  { id: "q15", number: 15, level: 3, type: "text", prompt: "If she had took the bus, she would have arrived earlier." },
  { id: "q16", number: 16, level: 3, type: "text", prompt: "If he hadn't forgot his wallet, he would have paid." },
  { id: "q17", number: 17, level: 3, type: "text", prompt: "If they had arrived earlier, they will have seen us." },
  { id: "q18", number: 18, level: 3, type: "text", prompt: "What would you did if you had lost your phone?" },
  { id: "q19", number: 19, level: 4, type: "text", prompt: "If I had a car, I would drive to work." },
  { id: "q20", number: 20, level: 4, type: "text", prompt: "If I had had a car, I would have driven to work." },
  { id: "q21", number: 21, level: 4, type: "text", prompt: "If I have a car tomorrow, I will drive to work." },
  { id: "q22", number: 22, level: 5, type: "text", prompt: "لو كنت قد استيقظت مبكرًا، لكنت قد وصلت في الوقت المحدد." },
  { id: "q23", number: 23, level: 5, type: "text", prompt: "لو لم ننسَ التذاكر، لكنا قد دخلنا السينما." },
  { id: "q24", number: 24, level: 5, type: "text", prompt: "ماذا كنت ستفعل لو كنت قد فشلت في الامتحان؟" },
  { id: "q25", number: 25, level: 5, type: "text", prompt: "لو كان قد أخبرني بالحقيقة، فربما كنت قد ساعدته." },
];
