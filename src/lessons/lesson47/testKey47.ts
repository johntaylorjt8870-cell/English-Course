import { normalizeEnglish47 } from "./normalize47";
import { TEST_QUESTIONS_47, type TestQuestion47 } from "./testData47";

export type Solution47 = {
  id: string;
  model: string;
  why: string;
  choice?: string;
  patterns?: readonly RegExp[];
};
const c = (id: string, answer: string, model: string, why: string): Solution47 => ({ id, choice: answer, model, why });
const t = (id: string, model: string, why: string, ...patterns: RegExp[]): Solution47 => ({ id, model, why, patterns });

const wouldLike = "i(?:'d| would) like";
const wouldRather = "i(?:'d| would) rather";

/** Loaded only after the student submits. Patterns are anchored and preserve meaning. */
export const TEST_SOLUTIONS_47: readonly Solution47[] = [
  c("q1", "b", "to have", "الرغبة في فعل تحتاج WOULD LIKE + TO + V1؛ الفعل بعد WOULD مباشرة هو LIKE."),
  c("q2", "a", "stay", "WOULD RATHER + V1 دون TO ودون ing."),
  c("q3", "c", "opening", "بعد MIND في الطلب المهذب نستخدم V-ing."),
  c("q4", "b", "to join", "WOULD LIKE + TO + V1؛ وجود TO ضروري قبل الفعل."),
  c("q5", "a", "would", "WOULD فعل ناقص ثابت، لا يأخذ s ولا نستعين بـ does."),
  t("q6", "walk", "بعد WOULD RATHER يأتي الفعل المجرد walk، حتى مع وجود THAN.", /^(?:walk(?: than take the bus)?|i(?:'d| would) rather walk than take the bus)$/),
  t("q7", "to learn", "الرغبة في فعل: WOULD LIKE + TO + V1.", /^to learn(?: french)?$/, /^she(?:'d| would) like to learn french$/),
  t("q8", "waiting", "بعد MIND نستخدم V-ing: waiting.", /^waiting(?: a moment)?$/, /^would you mind waiting a moment$/),
  t("q9", "go", "النفي WOULD RATHER NOT + V1، والفعل بعد not مجرد.", /^go(?: out tonight)?$/, /^we(?:'d| would) rather not go out tonight$/),
  t("q10", "stayed", "اختلاف الفاعلين يقتضي WOULD RATHER + SUBJECT + PAST SIMPLE، وهنا stayed.", /^(?:stayed|you stayed here)$/, new RegExp(`^${wouldRather} you stayed here$`)),
  t("q11", "I'd like some water.", "لا نضع TO بين WOULD وLIKE؛ والصيغة الكاملة I would like some water صحيحة أيضًا.", new RegExp(`^${wouldLike} some water$`)),
  t("q12", "She'd like a new book.", "WOULD لا يأخذ s، والفعل بعده LIKE مجرد.", /^she(?:'d| would) like a new book$/),
  t("q13", "I'd rather stay home.", "WOULD RATHER + V1 دون TO.", new RegExp(`^${wouldRather} stay home$`)),
  t("q14", "Would you mind helping me?", "بعد MIND نستخدم V-ing لا TO.", /^would you mind helping me$/),
  t("q15", "I'd like you to help me.", "في WOULD LIKE + person + to + V1 نحتاج TO قبل الفعل.", new RegExp(`^${wouldLike} you to help me$`)),
  c("q16", "a", "كلتاهما رغبة، لكن WOULD LIKE ألطف في الطلبات؛ وWANT ليست خاطئة.", "اللباقة مسألة درجة وموقف، لا صواب وخطأ مطلق."),
  c("q17", "a", "WOULD LIKE رغبة، وWOULD RATHER تفضيل، وغالبًا يوجد بديل.", "التفضيل يقارن بين خيارين، والرغبة لا تحتاج بديلًا."),
  c("q18", "a", "القاعدة WOULD RATHER + V1 دون TO.", "لا نضيف TO بعد RATHER في هذا التركيب."),
  c("q19", "a", "المعنى: أفضّل أن تبقى هنا؛ والماضي هنا صيغة تفضيل لا زمن حدث.", "صيغة الماضي بعد فاعل مختلف تعبّر عن تفضيل في الحاضر أو المستقبل."),
  c("q20", "a", "NO تعني عدم الممانعة، أي الموافقة على تنفيذ الطلب.", "السؤال عن الممانعة يقلب دلالة نعم/لا مقارنة بسؤال الرغبة."),
  t("q21", "Would", "الدعوة تبدأ بـ Would you like to…?", /^(?:would(?: you like to visit the museum tomorrow)?)$/),
  t("q22", "go", "بعد WOULD RATHER يأتي الفعل المجرد go.", /^(?:go|(?:i(?:'d| would) )?rather go in the morning|i(?:'d| would) rather go in the morning)$/),
  t("q23", "to book", "WOULD LIKE + person + TO + V1؛ الشخص هنا me، وبعده to book.", /^(?:to book|(?:you )?(?:me )?to book(?: the tickets)?|would you like me to book the tickets)$/),
  t("q24", "checking", "بعد MIND نستخدم V-ing: checking.", /^(?:checking(?: the opening hours(?: too)?)?|would you mind checking the opening hours(?: too)?)$/),
  t("q25", "joined", "اختلاف الفاعلين (I / Daniel) يقتضي الماضي البسيط joined.", /^(?:joined|daniel joined(?: us)?(?: as well)?|i(?:'d| would) rather daniel joined(?: us)?(?: as well)?)$/),
] as const;

const byId = new Map(TEST_SOLUTIONS_47.map((solution) => [solution.id, solution]));

export function gradeQuestion47(question: TestQuestion47, rawAnswer: string): boolean {
  const solution = byId.get(question.id);
  if (!solution || !rawAnswer.trim()) return false;
  if (question.type === "choice") return rawAnswer.trim() === solution.choice;
  const answer = normalizeEnglish47(rawAnswer);
  return Boolean(solution.patterns?.some((pattern) => pattern.test(answer)));
}

export type GradedTestResult47 = {
  score: number;
  total: number;
  byQuestion: Record<string, boolean>;
  byLevel: Record<number, { score: number; total: number }>;
  solutions: Record<string, Solution47>;
};

export function gradeTest47(answers: Record<string, string>): GradedTestResult47 {
  const result: GradedTestResult47 = { score: 0, total: TEST_QUESTIONS_47.length, byQuestion: {}, byLevel: {}, solutions: {} };
  for (const question of TEST_QUESTIONS_47) {
    const correct = gradeQuestion47(question, answers[question.id] ?? "");
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
