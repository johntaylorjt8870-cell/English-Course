import { normalizeEnglish52 } from "./normalize52";
import { TEST_QUESTIONS_52, type TestQuestion52 } from "./testData52";

export type Solution52 = {
  id: string;
  model: string;
  why: string;
  choice?: string;
  patterns?: readonly RegExp[];
  alternatives?: string;
  rejected?: string;
};

const c = (id: string, answer: string, model: string, why: string, alternatives?: string, rejected?: string): Solution52 => ({
  id,
  choice: answer,
  model,
  why,
  alternatives,
  rejected,
});

const t = (
  id: string,
  model: string,
  why: string,
  patterns: readonly RegExp[],
  alternatives?: string,
  rejected?: string,
): Solution52 => ({ id, model, why, patterns, alternatives, rejected });

const dont = "(?:don't|do not)";
const doesnt = "(?:doesn't|does not)";
const wont = "(?:won't|will not)";

/**
 * Loaded only after the student submits.
 *
 * Grading is meaning-aware but grammatical: contracted and full negatives are
 * both accepted, British/American spellings of practice/practise are accepted,
 * and word-order variants are accepted only when the condition, result and
 * conjugation stay correct. Ungrammatical forms (will after if, s after
 * doesn't, will + modal, double negative after unless) are rejected.
 */
export const TEST_SOLUTIONS_52: readonly Solution52[] = [
  /* ---------- القسم الأول ---------- */
  c(
    "q1",
    "b",
    "works",
    "الفاعل she مفرد غائب، فيأخذ الفعل s في المضارع البسيط: If she works hard, she will succeed.",
    "works — الفعل مع she",
    "work ينقصه s مع she، وwill work خطأ لأن will لا تأتي بعد if في الشرط الأول.",
  ),
  c(
    "q2",
    "c",
    "will tell",
    "النتيجة مستقبلية، فتأخذ will + V1: I will tell him the news.",
    "will tell — النتيجة المستقبلية",
    "tell مضارع بسيط لا يعبّر عن النتيجة المستقبلية هنا، وtold ماضٍ.",
  ),
  c(
    "q3",
    "c",
    "will be",
    "النتيجة هي أنهم سيكونون متأخرين: they will be late.",
    "will be — نتيجة مستقبلية",
    "are لا تعبّر عن النتيجة المستقبلية المرتبطة بالشرط، وwere ماضٍ.",
  ),
  c(
    "q4",
    "a",
    "win",
    "بعد if نستخدم المضارع البسيط حتى لو كان المعنى مستقبلًا: if you win the competition.",
    "win — المضارع البسيط بعد if",
    "will win خطأ لأن will لا تأتي بعد if، وwon ماضٍ.",
  ),
  c(
    "q5",
    "b",
    "hurry",
    "بعد doesn't نستخدم الفعل الأساسي V1: If he doesn't hurry.",
    "hurry — V1 بعد doesn't",
    "hurries خطأ لأن s لا تأتي بعد doesn't، وhurried ماضٍ.",
  ),
  c(
    "q6",
    "b",
    "won't",
    "unless تعني «ما لم»، فالمعنى: لن تنجح إن لم تدرس ⇒ you won't pass.",
    "won't — نفي النتيجة",
    "will يعكس المعنى، وcan to غير نحوية.",
  ),
  c(
    "q7",
    "c",
    "arrives",
    "نستخدم المضارع البسيط بعد when عند الحديث عن المستقبل: When she arrives home.",
    "arrives — مضارع بسيط بعد when",
    "will arrive خطأ لأن will لا تأتي بعد when في هذا التركيب، وarrived ماضٍ.",
  ),
  c(
    "q8",
    "a",
    "should",
    "يمكن استخدام should في النتيجة لتقديم نصيحة: you should take a rest.",
    "should — نصيحة",
    "should to غير نحوية، وwill should خطأ لأنه يجمع will مع فعل ناقص.",
  ),

  /* ---------- القسم الثاني ---------- */
  t(
    "q9",
    "If he doesn't study, he will fail the test.",
    "النفي مع he يكون doesn't، وبعدها V1 study، والنتيجة will fail.",
    [new RegExp(`^if he ${doesnt} study he will fail the test$`)],
    "If he doesn't study, he will fail the test. (أو does not study)",
    "If he don't study… (don't مع he) · If he doesn't studies… (s بعد doesn't) · he will fails…",
  ),
  t(
    "q10",
    "If we have enough time, we will visit the museum.",
    "have مضارع بسيط مع we، والنتيجة will visit.",
    [/^if we have enough time we will visit the museum$/],
    "If we have enough time, we will visit the museum.",
    "If we has enough time… (has مع we) · If we will have… (will بعد if)",
  ),
  t(
    "q11",
    "If she practices every day, she will improve.",
    "practices مع she في المضارع البسيط، وwill improve نتيجة مستقبلية.",
    [/^if she practi(?:c|s)es every day she will improve$/],
    "If she practices / practises every day, she will improve.",
    "If she practice every day… (ينقصه s) · she will improves… (s بعد will)",
  ),
  t(
    "q12",
    "If it doesn't stop raining, we won't go outside.",
    "النفي في الشرط باستخدام doesn't، والنفي في النتيجة باستخدام won't.",
    [new RegExp(`^if it ${doesnt} stop raining we ${wont} go outside$`)],
    "If it doesn't stop raining, we won't go outside. (أو does not / will not)",
    "If it don't stop… (don't مع it) · If it doesn't stops… · we don't go outside (نفي النتيجة خطأ)",
  ),
  t(
    "q13",
    "If you need anything, call me.",
    "يمكن استخدام الأمر في نتيجة الشرط الأول: call me.",
    [/^if you need anything (?:please )?call me$/],
    "If you need anything, call me.",
    "If you will need… (will بعد if) · If you need anything, you call me? (ليس أمرًا واضحًا)",
  ),

  /* ---------- القسم الثالث ---------- */
  t(
    "q14",
    "If she comes, I will talk to her.",
    "لا نستخدم will بعد if؛ جملة الشرط في المضارع البسيط: she comes.",
    [/^if she comes i will talk to her$/],
    "If she comes, I will talk to her.",
    "If she will come… (will داخل الشرط) · If she come… (ينقصه s)",
  ),
  t(
    "q15",
    "If he doesn't work, he won't earn money.",
    "نستخدم doesn't مع he، وبعدها الفعل الأساسي work، والنتيجة won't earn.",
    [new RegExp(`^if he ${doesnt} work he ${wont} earn money$`)],
    "If he doesn't work, he won't earn money. (أو does not / will not)",
    "If he don't work… · If he doesn't works… · he will not earns…",
  ),
  t(
    "q16",
    "If I finish early, I will help you.",
    "نستخدم المضارع البسيط بعد if، والنتيجة will help.",
    [/^if i finish early i will help you$/],
    "If I finish early, I will help you.",
    "If I will finish… (will بعد if) · If I finished… (ماضٍ لا يناسب الشرط الأول)",
  ),
  t(
    "q17",
    "Unless you listen, you won't understand.",
    "unless تحمل معنى النفي، فلا نضيف don't بعدها، والنتيجة won't understand.",
    [new RegExp(`^unless you listen you ${wont} understand$`)],
    "Unless you listen, you won't understand. (أو will not understand)",
    "Unless you don't listen… (نفي مزدوج) · Unless you listens… (s بعد unless مع you)",
  ),
  t(
    "q18",
    "When they arrive, we will begin.",
    "نستخدم المضارع البسيط بعد when: they arrive، والنتيجة will begin.",
    [/^when they arrive we will (?:begin|start)$/],
    "When they arrive, we will begin. (أو we will start)",
    "When they will arrive… (will بعد when) · When they arrives… (s مع they)",
  ),

  /* ---------- القسم الرابع ---------- */
  c(
    "q19",
    "a",
    "Zero Conditional",
    "الجملة تتحدث عن حقيقة عامة: عدم سقي النباتات يؤدي إلى موتها، والمضارع البسيط في الطرفين.",
    "Zero Conditional — حقيقة عامة",
    "First Conditional غير صحيح لأن الجملة ليست عن احتمال مستقبلي محدد.",
  ),
  c(
    "q20",
    "b",
    "First Conditional",
    "الجملة تتحدث عن احتمال مستقبلي محدد (next month) مع نتيجة will travel.",
    "First Conditional — احتمال مستقبلي",
    "Zero Conditional غير صحيح لأن الزمن مستقبلي محدد والنتيجة will travel.",
  ),
  c(
    "q21",
    "a",
    "Zero Conditional",
    "الجملة حقيقة علمية عامة: تجميد الماء يحوّله إلى ثلج، والمضارع البسيط في الطرفين.",
    "Zero Conditional — حقيقة علمية",
    "First Conditional غير صحيح لأن الجملة ليست عن احتمال مستقبلي محدد.",
  ),

  /* ---------- القسم الخامس ---------- */
  t(
    "q22",
    "If you study hard, you will achieve your goal.",
    "شرط بالمضارع البسيط study، ونتيجة will achieve. ويُقبل الجمع goals.",
    [/^if you study hard you will achieve your (?:goal|goals)$/],
    "If you study hard, you will achieve your goal / your goals.",
    "If you will study… (will بعد if) · If you study hard, you achieve your goal (نتيجة بلا will)",
  ),
  t(
    "q23",
    "What will you do if you lose your phone?",
    "سؤال What will you do، ثم if + Present Simple: if you lose your phone.",
    [/^what will you do if you lose your (?:phone|mobile phone)$/],
    "What will you do if you lose your phone? / your mobile phone?",
    "What you will do… (ترتيب السؤال خطأ) · if you will lose… (will بعد if)",
  ),
  t(
    "q24",
    "If he doesn't arrive on time, we won't wait for him.",
    "نفي الشرط بـdoesn't arrive (أو doesn't come)، ونفي النتيجة بـwon't wait.",
    [new RegExp(`^if he ${doesnt} (?:arrive|come) on time we ${wont} wait for him$`)],
    "If he doesn't arrive / come on time, we won't wait for him.",
    "If he don't arrive… · we don't wait for him (نفي النتيجة خطأ) · doesn't arrives…",
  ),
  t(
    "q25",
    "Unless you practice, you won't improve.",
    "unless + Present Simple، والنتيجة منفية بـwon't improve. وتُقبل practise.",
    [new RegExp(`^unless you practi(?:c|s)e you ${wont} improve$`)],
    "Unless you practice / practise, you won't improve.",
    "Unless you don't practice… (نفي مزدوج) · Unless you practices… (s مع you)",
  ),
] as const;

const byId = new Map(TEST_SOLUTIONS_52.map((solution) => [solution.id, solution]));

export function gradeQuestion52(question: TestQuestion52, rawAnswer: string): boolean {
  const solution = byId.get(question.id);
  if (!solution || !rawAnswer.trim()) return false;
  if (question.type === "choice") return rawAnswer.trim() === solution.choice;
  const answer = normalizeEnglish52(rawAnswer);
  return Boolean(solution.patterns?.some((pattern) => pattern.test(answer)));
}

export type GradedTestResult52 = {
  score: number;
  total: number;
  byQuestion: Record<string, boolean>;
  byLevel: Record<number, { score: number; total: number }>;
  solutions: Record<string, Solution52>;
};

export function gradeTest52(answers: Record<string, string>): GradedTestResult52 {
  const result: GradedTestResult52 = {
    score: 0,
    total: TEST_QUESTIONS_52.length,
    byQuestion: {},
    byLevel: {},
    solutions: {},
  };
  for (const question of TEST_QUESTIONS_52) {
    const correct = gradeQuestion52(question, answers[question.id] ?? "");
    result.byQuestion[question.id] = correct;
    const level = result.byLevel[question.level] ?? { score: 0, total: 0 };
    level.total += 1;
    if (correct) {
      level.score += 1;
      result.score += 1;
    }
    result.byLevel[question.level] = level;
    const solution = byId.get(question.id);
    if (solution) result.solutions[question.id] = solution;
  }
  return result;
}
