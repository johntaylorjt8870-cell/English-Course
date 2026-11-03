/** Load only on submission. Static client assets and this public repository are not secret. */
import { TEST_QUESTIONS_53 } from "./testData53";

export type Solution53 = { id: string; model: string; why: string; choice?: string; patterns?: readonly RegExp[] };
const c = (n: number, choice: string, model: string, why: string): Solution53 => ({ id: `q${n}`, choice, model, why });
const t = (n: number, model: string, why: string, ...patterns: RegExp[]): Solution53 => ({ id: `q${n}`, model, why, patterns });

// Input normalization expands the common contractions before checking anchored patterns.
export function normalize53(value: string): string {
  return value.toLowerCase().replace(/[’‘]/g, "'")
    .replace(/\b(i|you|he|she|we|they)'d\b/g, "$1 would")
    .replace(/\bwouldn't\b/g, "would not").replace(/\bdidn't\b/g, "did not")
    .replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export const TEST_SOLUTIONS_53: readonly Solution53[] = [
  c(1, "b", "were", "نفضل were مع I في الشرط الافتراضي."),
  c(2, "c", "would learn", "النتيجة تستخدم would + V1."),
  c(3, "b", "worked", "تستخدم جملة الشرط الماضي البسيط."),
  c(4, "b", "would", "النصيحة: If I were you, I would..."),
  c(5, "b", "would visit", "الزيارة نتيجة افتراضية."),
  c(6, "c", "won", "بعد if نستخدم الماضي البسيط هنا."),
  c(7, "a", "could", "تعبّر could عن القدرة الافتراضية."),
  c(8, "b", "were", "were هي الصيغة الافتراضية المفضلة للفعل be."),
  t(9, "If I had a plane, I would travel around the world.", "had ماضي have، وwould travel نتيجة افتراضية.", /^if i had a plane i would travel (?:around|round) the world$/, /^i would travel (?:around|round) the world if i had a plane$/),
  t(10, "If she knew his number, she would call him.", "knew ماضي know، وwould call نتيجة افتراضية.", /^if she knew his number she would call him$/, /^she would call him if she knew his number$/),
  t(11, "If they didn't live so far away, we would visit them.", "بعد didn't نستخدم الفعل الأساسي، والنتيجة would visit.", /^if they did not live so far away we would visit them$/, /^we would visit them if they did not live so far away$/),
  t(12, "If I were you, I wouldn't accept that offer.", "نفضل were في النصيحة الافتراضية؛ was مستعملة غير رسميًا. نستخدم wouldn't لنفي النتيجة.", /^if i (?:were|was) you i would not accept that offer$/, /^i would not accept that offer if i (?:were|was) you$/),
  t(13, "If he spoke English fluently, he would find a better job.", "spoke ماضي speak والنتيجة would find.", /^if he spoke english fluently he would find a better job$/, /^he would find a better job if he spoke english fluently$/),
  t(14, "If I had more money, I would buy a car.", "نستخدم الماضي بعد if في الشرط الثاني.", /^if i had more money i would buy a car$/, /^i would buy a car if i had more money$/),
  t(15, "If she studied harder, she would pass the exam.", "تحتاج النتيجة الافتراضية إلى would.", /^if she studied harder she would pass the exam$/, /^she would pass the exam if she studied harder$/),
  t(16, "If he didn't work, he would have more free time.", "بعد didn't نستخدم work لا worked.", /^if he did not work he would have more free time$/, /^he would have more free time if he did not work$/),
  t(17, "If I were you, I would talk to the teacher.", "نفضل were في النصيحة الافتراضية؛ was مستعملة غير رسميًا. نستخدم would في النتيجة.", /^if i (?:were|was) you i would talk to the teacher$/, /^i would talk to the teacher if i (?:were|was) you$/),
  t(18, "She would buy a house if she had enough money.", "بعد would نستخدم buy دون s.", /^she would buy a house if she had enough money$/, /^if she had enough money she would buy a house$/),
  t(19, "Zero Conditional", "حقيقة علمية عامة.", /^zero(?: conditional)?$/),
  t(20, "Second Conditional", "حالة افتراضية.", /^second(?: conditional)?$/),
  t(21, "First Conditional", "احتمال مستقبلي واقعي.", /^first(?: conditional)?$/),
  t(22, "If I were you, I would study harder.", "تستخدم If I were you لتقديم النصيحة؛ was مستخدمة أيضًا في الحديث غير الرسمي.", /^if i (?:were|was) you i would study harder$/, /^i would study harder if i (?:were|was) you$/),
  t(23, "What would you do if you found a bag full of money?", "سؤال افتراضي: would + الفعل الأساسي وfound في الشرط.", /^what would you do if you found a bag (?:full of|filled with) money$/),
  t(24, "If she spoke Spanish, she could work in Spain.", "spoke في الشرط وcould للقدرة الافتراضية.", /^if she spoke spanish she could work in spain$/, /^she could work in spain if she spoke spanish$/),
  t(25, "If we didn't have an exam tomorrow, we would sleep late.", "didn't + V1 في الشرط وwould + V1 في النتيجة.", /^if we did not have an? (?:exam|test) tomorrow we would sleep late$/, /^we would sleep late if we did not have an? (?:exam|test) tomorrow$/),
];

export function gradeTest53(answers: Record<string, string>) {
  const results = TEST_QUESTIONS_53.map((question, index) => {
    const solution = TEST_SOLUTIONS_53[index];
    const answer = answers[question.id] ?? "";
    const correct = solution.choice !== undefined
      ? answer.trim().toLowerCase() === solution.choice
      : Boolean(answer.trim()) && Boolean(solution.patterns?.some((pattern) => pattern.test(normalize53(answer))));
    return { question, answer, correct, solution, needsReview: question.type === "text" && Boolean(answer.trim()) && !correct, reviewed: false };
  });
  return { score: results.filter((item) => item.correct).length, total: results.length, results };
}
