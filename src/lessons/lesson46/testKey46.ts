import { normalizeEnglish46 } from "./normalize46";
import { TEST_QUESTIONS_46, type TestQuestion46 } from "./testData46";

export type Solution46 = {
  id: string;
  model: string;
  why: string;
  choice?: string;
  patterns?: readonly RegExp[];
};
const c = (id: string, answer: string, model: string, why: string): Solution46 => ({ id, choice: answer, model, why });
const t = (id: string, model: string, why: string, ...patterns: RegExp[]): Solution46 => ({ id, model, why, patterns });

/** Loaded only after the student submits. Patterns are anchored and preserve polarity, tense and action. */
export const TEST_SOLUTIONS_46: readonly Solution46[] = [
  c("q1", "a", "mustn't", "الخطر والحظر يتطلبان المنع؛ عدم الإلزام لا يكفي."),
  c("q2", "b", "doesn't have to", "المدرسة توفر جهازًا؛ إحضاره ليس إلزاميًا وليس ممنوعًا."),
  c("q3", "a", "needn't", "لا داعي للقلق؛ يأتي الفعل المجرد مباشرة بعد needn't."),
  c("q4", "c", "doesn't have to", "مع he نستخدم doesn't have to وليس doesn't has أو don't."),
  c("q5", "b", "don't have to", "مجانية التذاكر تعني عدم الحاجة إلى الدفع، لا حظره."),
  t("q6", "mustn't / must not / You are not allowed to enter this room.", "المطلوب المنع؛ يأتي الفعل المجرد بعد mustn't، ويمكن التعبير عن المنع أيضًا بـ are not allowed to.", /^(?:must not(?: enter this room)?|you must not enter this room)$/, /^you are not allowed to enter this room$/),
  t("q7", "doesn't need to / doesn't have to / needn't", "كل هذه البدائل مناسبة لعدم الضرورة هنا؛ تختلف الصيغة النحوية.", /^(?:(?:does not need to|does not have to|need not)(?: bring her laptop(?: today)?)?|she (?:does not need to|does not have to|need not) bring her laptop(?: today)?)$/),
  t("q8", "didn't have to / didn't need to", "عدم الإلزام أو الحاجة في الماضي لا يحدد وحده وقوع العمل.", /^(?:did not (?:have|need) to(?: work(?: yesterday)?)?|we did not (?:have|need) to work(?: yesterday)?)$/),
  t("q9", "won't have to / won't need to", "في المستقبل نستخدم will not ثم have أو need بصورتها الأساسية.", /^(?:will not (?:have|need) to(?: attend the meeting(?: tomorrow)?)?|he will not (?:have|need) to attend the meeting(?: tomorrow)?)$/),
  t("q10", "needn't have bought", "الشراء وقع فعلًا ولم يكن ضروريًا؛ بعد have يأتي bought.", /^(?:need not have bought(?: another ticket)?|i need not have bought another ticket)$/, /^i bought another ticket (?:but|although) (?:i did not (?:need|have) to|i did not need one|it was not necessary)$/, /^i bought another ticket unnecessarily$/),
  t("q11", "You mustn't enter.", "لا نضع to بعد الفعل الناقص mustn't.", /^you must not enter$/, /^you (?:are not allowed|are forbidden) to enter$/),
  t("q12", "She doesn't have to come.", "بعد doesn't نستخدم have؛ وبدائل عدم الحاجة مقبولة هنا.", /^she (?:does not have to|does not need to|need not) come$/),
  t("q13", "He needn't worry.", "بعد needn't نستخدم الفعل المجرد؛ وتقبل صيغة الفعل العادي.", /^he (?:need not|does not need to|does not have to) worry$/),
  t("q14", "I needn't have gone there.", "التصريف الثالث من go هو gone؛ التركيب يفيد عادة وقوع الذهاب.", /^i need not have gone(?: there)?$/),
  t("q15", "We didn't need to pay.", "بعد didn't نستخدم need بصورتها الأساسية؛ didn't have to بديل مناسب.", /^we did not (?:need|have) to pay$/),
  c("q16", "b", "الأولى منع؛ الثانية عدم إلزام ولا تحدد الإذن وحدها.", "المنع مختلف عن عدم الإلزام، والجملة الثانية لا تحسم وحدها مسألة السماح."),
  c("q17", "b", "كلتاهما تعبّران عن عدم الحاجة مع اختلاف التركيب.", "الأولى تستخدم need فعلًا عاديًا مع do و to، والثانية تستخدم needn't فعلًا ناقصًا."),
  c("q18", "a", "اشتريت تذكرة، لكن شراءها لم يكن ضروريًا.", "needn't have + V3 تفيد عادة وقوع الفعل فعلًا رغم عدم الحاجة إليه."),
  c("q19", "b", "لا؛ عدم الحاجة وحده لا يحدد وقوع الشراء.", "قد يكون اشترى التذكرة أو لم يشترها؛ نحتاج إلى سياق إضافي."),
  c("q20", "a", "الأولى عدم ضرورة؛ الثانية حكم بأن الفعل لم يكن مناسبًا.", "قد يتداخل المعنيان حسب السياق، لكن عدم الضرورة ليس حكمًا تلقائيًا بسوء القرار."),
  t("q21", "mustn't / must not", "المتحف يمنع لمس المعروضات.", /^(?:must not(?: touch the exhibits)?|(?:you|students) must not touch the exhibits)$/),
  t("q22", "No, you don't. / don't have to / don't need to / needn't", "يوفر المتحف أوراقًا؛ إحضار الدفاتر غير ضروري، وNo, you don't إجابة مختصرة مناسبة للسؤال.", /^(?:no )?(?:you )?(?:do not have to|do not need to|need not)(?: bring (?:your )?notebooks)?$/, /^(?:do not|(?:no )?you do not)$/),
  t("q23", "needn't have", "اشترى عمر الدفتر فعلًا؛ الصيغة تنقل وقوع الفعل وعدم ضرورته.", /^(?:need not have(?: bought (?:it|the notebook|a notebook|your notebook))?|you need not have bought (?:it|the notebook|a notebook|your notebook))$/),
  t("q24", "won't have to / won't need to", "الحديث عن عدم الإلزام أو الحاجة في المستقبل.", /^(?:will not (?:have|need) to(?: pay(?: tomorrow)?)?|(?:no )?you will not (?:have|need) to pay(?: tomorrow)?)$/),
  t("q25", "needn't / don't need to / don't have to", "وجود وقت كافٍ يجعل الاستعجال غير ضروري، وليس ممنوعًا.", /^(?:(?:need not|do not need to|do not have to)(?: hurry(?: to buy tickets(?: today)?)?)?|we (?:need not|do not need to|do not have to) hurry(?: to buy tickets(?: today)?)?)$/),
] as const;

const byId = new Map(TEST_SOLUTIONS_46.map((solution) => [solution.id, solution]));
export function gradeQuestion46(question: TestQuestion46, rawAnswer: string): boolean {
  const solution = byId.get(question.id);
  if (!solution || !rawAnswer.trim()) return false;
  if (question.type === "choice") return rawAnswer.trim() === solution.choice;
  const answer = normalizeEnglish46(rawAnswer);
  return Boolean(solution.patterns?.some((pattern) => pattern.test(answer)));
}

export type GradedTestResult46 = {
  score: number;
  total: number;
  byQuestion: Record<string, boolean>;
  byLevel: Record<number, { score: number; total: number }>;
  solutions: Record<string, Solution46>;
};

export function gradeTest46(answers: Record<string, string>): GradedTestResult46 {
  const result: GradedTestResult46 = { score: 0, total: TEST_QUESTIONS_46.length, byQuestion: {}, byLevel: {}, solutions: {} };
  for (const question of TEST_QUESTIONS_46) {
    const correct = gradeQuestion46(question, answers[question.id] ?? "");
    result.byQuestion[question.id] = correct;
    const level = result.byLevel[question.level] ?? { score: 0, total: 0 };
    level.total += 1;
    if (correct) { level.score += 1; result.score += 1; }
    result.byLevel[question.level] = level;
    const solution = byId.get(question.id);
    if (solution) result.solutions[question.id] = solution;
  }
  return result;
}
