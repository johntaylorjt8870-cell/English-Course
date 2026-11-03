/** Student-facing final-test prompts. The answer key is kept in testKey53.ts. */
export type TestQuestion53 = {
  id: string;
  number: number;
  level: 1 | 2 | 3 | 4 | 5;
  type: "choice" | "text";
  prompt: string;
  options?: readonly { id: string; text: string; lang: "en" }[];
};

const choices = (items: readonly string[]) => items.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "en" as const }));
const choice = (number: number, prompt: string, options: string[]): TestQuestion53 => ({ id: `q${number}`, number, level: 1, type: "choice", prompt, options: choices(options) });
const text = (number: number, level: 2 | 3 | 4 | 5, prompt: string): TestQuestion53 => ({ id: `q${number}`, number, level, type: "text", prompt });

export const TEST_LEVELS_53 = [
  { level: 1, title: "اختر الإجابة الصحيحة", instruction: "اختر إجابة واحدة.", count: 8 },
  { level: 2, title: "أكمل الجمل", instruction: "اكتب الجملة كاملة بعد إكمال الفعلين.", count: 5 },
  { level: 3, title: "صحح الأخطاء", instruction: "اكتب الجملة كاملة بعد التصحيح.", count: 5 },
  { level: 4, title: "حدد نوع الشرط", instruction: "اكتب Zero Conditional أو First Conditional أو Second Conditional.", count: 3 },
  { level: 5, title: "الترجمة", instruction: "ترجم الجملة كاملة إلى الإنجليزية.", count: 4 },
] as const;

export const TEST_QUESTIONS_53: readonly TestQuestion53[] = [
  choice(1, "If I _____ rich, I would buy a big house.", ["am", "were", "will be", "be"]),
  choice(2, "If she had more time, she _____ a new language.", ["learns", "will learn", "would learn", "learned"]),
  choice(3, "If he _____ harder, he would succeed.", ["works", "worked", "will work", "working"]),
  choice(4, "If I were you, I _____ apologize.", ["will", "would", "am", "have"]),
  choice(5, "If they lived near us, we _____ them often.", ["visit", "would visit", "will visit", "visited"]),
  choice(6, "What would you do if you _____ a million dollars?", ["win", "will win", "won", "winning"]),
  choice(7, "If she spoke French, she _____ work in Paris.", ["could", "will can", "can to", "is"]),
  choice(8, "If he _____ here, he would help us.", ["is", "were", "will be", "be"]),
  text(9, 2, "If I (have) a plane, I (travel) around the world."),
  text(10, 2, "If she (know) his number, she (call) him."),
  text(11, 2, "If they (not live) so far away, we (visit) them."),
  text(12, 2, "If I (be) you, I (not accept) that offer."),
  text(13, 2, "If he (speak) English fluently, he (find) a better job."),
  text(14, 3, "If I will have more money, I would buy a car."),
  text(15, 3, "If she studied harder, she will pass the exam."),
  text(16, 3, "If he didn't worked, he would have more free time."),
  text(17, 3, "If I was you, I will talk to the teacher."),
  text(18, 3, "She would buys a house if she had enough money."),
  text(19, 4, "If water reaches 100°C at sea level, it boils."),
  text(20, 4, "If I had a car, I would drive to work."),
  text(21, 4, "If it rains tomorrow, we will stay at home."),
  text(22, 5, "لو كنت مكانك، لدرست بجد أكثر."),
  text(23, 5, "ماذا كنت ستفعل لو وجدت حقيبة مليئة بالمال؟"),
  text(24, 5, "لو كانت تتحدث الإسبانية، لاستطاعت العمل في إسبانيا."),
  text(25, 5, "لو لم يكن لدينا امتحان غدًا، لنمنا حتى وقت متأخر."),
];
