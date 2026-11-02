import { normalizeEnglish51 } from "./normalize51";
import { TEST_QUESTIONS_51, type TestQuestion51 } from "./testData51";

export type Solution51 = {
  id: string;
  model: string;
  why: string;
  choice?: string;
  patterns?: readonly RegExp[];
  alternatives?: string;
  rejected?: string;
};

const c = (id: string, answer: string, model: string, why: string, alternatives?: string, rejected?: string): Solution51 => ({
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
): Solution51 => ({ id, model, why, patterns, alternatives, rejected });

const dont = "(?:don't|do not)";
const doesnt = "(?:doesn't|does not)";

/**
 * Loaded only after the student submits.
 *
 * Question 18 accepts both corrected readings: the zero-conditional
 * general-truth form ("If you heat ice, it melts.") and the grammatical
 * first-conditional form ("If you heat ice, it will melt."), because both
 * remove the ungrammatical WILL from the if-clause while keeping the
 * cause-and-effect meaning; the explanation states which one is the
 * zero-conditional model. Translations accept word-order changes and verb
 * synonyms that preserve the same condition, result and conjugation.
 */
export const TEST_SOLUTIONS_51: readonly Solution51[] = [
  /* ---------- المجموعة الأولى ---------- */
  c(
    "q1",
    "b",
    "melts",
    "الفاعل IT مفرد، فيأخذ الفعل S: If you heat ice, it melts. هذه حقيقة عامة، فالمضارع البسيط في الطرفين.",
    "melts — الفعل مع IT",
    "melt ينقصه S مع المفرد، وmelted ماضٍ لا يناسب الحقيقة العامة",
  ),
  c(
    "q2",
    "b",
    "eats",
    "الفاعل HE مفرد غائب، فيأخذ الفعل S في جزء الشرط نفسه: If he eats too much sugar.",
    "eats — الفعل مع HE",
    "eat ينقصه S، وeating وحدها لا تصلح فعلًا رئيسيًا هنا",
  ),
  c(
    "q3",
    "a",
    "die",
    "الفاعل PLANTS جمع، ولذلك نستخدم الفعل الأساسي دون S: they die. أما will died فتركيب خاطئ (will يتبعها V1).",
    "die — الفعل مع THEY",
    "dies تُضاف مع المفرد لا الجمع، وwill died تركيب غير صحيح",
  ),
  c(
    "q4",
    "b",
    "wakes up",
    "الفاعل SHE مفرد غائب، فيأخذ الفعل S: she wakes up.",
    "wakes up — الفعل مع SHE",
    "wake up ينقصه S مع المفرد، وwaking up وحدها لا تصلح فعلًا رئيسيًا",
  ),
  c(
    "q5",
    "a",
    "get",
    "الفاعل YOU، فنستخدم الفعل الأساسي دون S: you get pink.",
    "get — الفعل مع YOU",
    "gets تُضاف مع الغائب المفرد لا مع YOU، وgetting وحدها غير مكتملة",
  ),
  c(
    "q6",
    "b",
    "stops",
    "الفاعل MY PHONE مفرد، فيأخذ الفعل S (مع مضاعفة P): stops working.",
    "stops — الفعل مع MY PHONE",
    "stop ينقصه S مع المفرد، وstopping وحدها غير مكتملة",
  ),
  c(
    "q7",
    "c",
    "become",
    "الفاعل PEOPLE جمع، ولذلك نستخدم الفعل الأساسي دون S: they become less fit.",
    "become — الفعل مع THEY",
    "becomes تُضاف مع المفرد لا الجمع، وbecoming وحدها غير مكتملة",
  ),
  c(
    "q8",
    "b",
    "eat",
    "بعد DOESN'T نستخدم الفعل الأساسي V1: If he doesn't eat breakfast.",
    "eat — V1 بعد DOESN'T",
    "eats تأخذ S بعد doesn't وهذا خطأ شائع، وeating لا تأتي بعد doesn't",
  ),
  c(
    "q9",
    "b",
    "If you heat water, it boils.",
    "الجملة الثانية حقيقة عامة بالمضارع البسيط في الطرفين: شرط صفري. الأولى شرط أول (tomorrow وwill)، والثالثة شرط ثانٍ افتراضي (studied وwould).",
    "If you heat water, it boils. — Zero Conditional",
    "الخيار A شرط أول، والخيار C شرط ثانٍ افتراضي",
  ),
  c(
    "q10",
    "a",
    "If I feel stressed, I listen to music.",
    "الجملة الأولى عادة شخصية متكررة بالمضارع البسيط في الطرفين. الثانية شرط أول (tomorrow وwill)، والثالثة شرط ثانٍ افتراضي.",
    "If I feel stressed, I listen to music. — عادة متكررة",
    "الخيار B توقع مستقبلي، والخيار C موقف افتراضي غير حقيقي",
  ),

  /* ---------- المجموعة الثانية ---------- */
  t(
    "q11",
    "reaches",
    "الفاعل WATER مفرد (It)، فيأخذ الفعل S: If water reaches 100°C… it boils.",
    [/^reaches$/, /^it reaches$/, /^water reaches$/, /^if water reaches 100°?c at standard atmospheric pressure it boils$/],
    "reaches / If water reaches 100°C at standard atmospheric pressure, it boils.",
    "reach ينقصه S مع المفرد، وreached ماضٍ",
  ),
  t(
    "q12",
    "doesn't study",
    "النفي مع HE بـdoesn't ثم V1 (study) دون S.",
    [new RegExp(`^${doesnt} study$`), /^he (?:doesn't|does not) study$/, /^if he (?:doesn't|does not) study he (?:doesn't|does not) understand the lesson$/],
    "doesn't study / If he doesn't study, he doesn't understand the lesson.",
    "doesn't studies (S بعد doesn't) وdon't study (مع He) وnot study (ناقص الفعل المساعد)",
  ),
  t(
    "q13",
    "press",
    "مع YOU يبقى الفعل الأساسي كما هو: If you press this button.",
    [/^press$/, /^you press$/, /^if you press this button the machine starts$/],
    "press / If you press this button, the machine starts.",
    "presses (S مع YOU) وwill press (لا will في الشرط الصفري العادي)",
  ),
  t(
    "q14",
    "feels",
    "الفاعل MY SISTER مفرد غائب، فيأخذ الفعل S: she feels.",
    [/^feels$/, /^she feels$/, /^my sister feels$/, /^if my sister feels sick she stays at home$/],
    "feels / If my sister feels sick, she stays at home.",
    "feel ينقصه S مع المفرد الغائب",
  ),
  t(
    "q15",
    "don't drink",
    "النفي مع PEOPLE (جمع = they) بـdon't ثم V1: don't drink.",
    [new RegExp(`^${dont} drink$`), /^they (?:don't|do not) drink$/, /^if people (?:don't|do not) drink enough water they become dehydrated$/],
    "don't drink / If people don't drink enough water, they become dehydrated.",
    "doesn't drink (مع الجمع) وdrinks (S بعد don't)",
  ),

  /* ---------- المجموعة الثالثة ---------- */
  t(
    "q16",
    "If he eats too much, he feels sick.",
    "مع HE يأخذ الفعل S في جزء الشرط: eats.",
    [/^if he eats too much he feels sick$/],
    "If he eats too much, he feels sick.",
    "If he eat too much… (ينقصه S) · If he eats too much, he feel sick. (ينقصه S في النتيجة)",
  ),
  t(
    "q17",
    "If she doesn't study, she fails.",
    "بعد DOESN'T يعود الفعل إلى V1: study دون S.",
    [new RegExp(`^if she ${doesnt} study she fails$`)],
    "If she doesn't / does not study, she fails.",
    "If she doesn't studies… (S بعد doesn't)",
  ),
  t(
    "q18",
    "If you heat ice, it melts.",
    "الخطأ هو WILL داخل جزء IF. التصحيح النموذجي للحقيقة العامة: If you heat ice, it melts. ونقبل أيضًا If you heat ice, it will melt. لأنها تصحح الخطأ النحوي نفسه وتبقى صحيحة في سياق توقع مستقبلي — لكن الأولى هي صيغة الشرط الصفري المطلوبة.",
    [/^if you heat ice it melts$/, /^if you heat ice it will melt$/],
    "If you heat ice, it melts. (النموذج) · If you heat ice, it will melt. (تصحيح مقبول في سياق مستقبلي)",
    "If you will heat ice… (will داخل الشرط) · If you heated ice, it melts. (خلط زمنين)",
  ),
  t(
    "q19",
    "If plants don't get sunlight, they grow poorly.",
    "مع PLANTS جمع يكون النفي بـdon't ثم V1: don't get.",
    [new RegExp(`^if plants ${dont} get sunlight they grow poorly$`), new RegExp(`^if plants ${dont} get (?:enough )?sunlight they grow poorly$`)],
    "If plants don't / do not get sunlight, they grow poorly.",
    "If plants doesn't get… (doesn't مع الجمع)",
  ),
  t(
    "q20",
    "If my father feels tired, he takes a rest.",
    "الفاعل MY FATHER مفرد غائب، فيأخذ الفعل S في الطرفين: feels وtakes.",
    [/^if my father feels tired he takes (?:a|the|his) rest$/, /^if my father feels tired he has (?:a|the|his) rest$/],
    "If my father feels tired, he takes a rest. (وتُقبل has a rest بالمعنى نفسه)",
    "If my father feel tired… (ينقصه S) · If my father feels tired, he take a rest. (ينقصه S في النتيجة)",
  ),

  /* ---------- المجموعة الرابعة ---------- */
  t(
    "q21",
    "If water freezes, it turns into ice.",
    "شرط ونتيجة بالمضارع البسيط في الطرفين. تُقبل turns to وbecomes بالمعنى نفسه.",
    [/^if water freezes it turns (?:in)?to ice$/, /^if water freezes it becomes ice$/],
    "If water freezes, it turns into ice. / it turns to ice. / it becomes ice.",
    "If water will freeze… (will داخل الشرط) · If water freezes, it turned into ice. (النتيجة ليست مضارعًا)",
  ),
  t(
    "q22",
    "If I don't drink coffee in the morning, I feel sleepy.",
    "نفي الشرط مع I بـdon't + V1، والنتيجة بالمضارع البسيط. وتُقبل have بدل drink لأن «أشرب القهوة» تُعبَّر عنها بالفعلين.",
    [new RegExp(`^if i ${dont} (?:drink|have) coffee (?:in the )?morning i feel sleepy$`), new RegExp(`^if i ${dont} (?:drink|have) coffee (?:in the )?morning i feel (?:sleepy|drowsy)$`)],
    "If I don't drink (أو have) coffee in the morning, I feel sleepy.",
    "If I doesn't drink… (doesn't مع I) · If I don't drink coffee in the morning, I will feel sleepy. (will تغيّرها إلى شرط أول)",
  ),
  t(
    "q23",
    "If he doesn't charge his phone, its battery runs out.",
    "نفي الشرط مع He بـdoesn't + V1، والنتيجة مع ITS BATTERY مفرد فيأخذ runs. وتُقبل the battery بدل its battery.",
    [new RegExp(`^if he ${doesnt} charge his phone (?:its|the) battery runs out$`), new RegExp(`^if he ${doesnt} charge (?:his|the) phone (?:its|the) battery runs out$`)],
    "If he doesn't charge his phone, its / the battery runs out.",
    "If he don't charge… (don't مع He) · If he doesn't charge his phone, its battery will run out. (will تغيّرها إلى شرط أول)",
  ),
  t(
    "q24",
    "What happens if a person doesn't get enough sleep?",
    "سؤال عن النتيجة: What happens if…? والنفي مع A PERSON مفرد بـdoesn't + V1. وتُقبل صيغة someone وpeople مع التصريف الصحيح.",
    [new RegExp(`^what happens if (?:a person|someone|somebody) ${doesnt} get enough sleep$`), new RegExp(`^what happens if (?:people|we|you) ${dont} get enough sleep$`)],
    "What happens if a person / someone doesn't get enough sleep? · What happens if people don't get enough sleep?",
    "What happen if… (ينقصه s) · What happens if a person doesn't gets… (gets بعد doesn't)",
  ),
  t(
    "q25",
    "If my sister feels stressed, she listens to music.",
    "الفاعل MY SISTER مفرد غائب، فيأخذ الفعل S في الطرفين: feels وlistens.",
    [/^if my sister feels stressed she listens to (?:the )?music$/, /^if my sister feels stressed she listens to music$/],
    "If my sister feels stressed, she listens to (the) music.",
    "If my sister feel stressed… (ينقصه S) · If my sister feels stressed, she listen to music. (ينقصه S في النتيجة)",
  ),
] as const;

const byId = new Map(TEST_SOLUTIONS_51.map((solution) => [solution.id, solution]));

export function gradeQuestion51(question: TestQuestion51, rawAnswer: string): boolean {
  const solution = byId.get(question.id);
  if (!solution || !rawAnswer.trim()) return false;
  if (question.type === "choice") return rawAnswer.trim() === solution.choice;
  const answer = normalizeEnglish51(rawAnswer);
  return Boolean(solution.patterns?.some((pattern) => pattern.test(answer)));
}

export type GradedTestResult51 = {
  score: number;
  total: number;
  byQuestion: Record<string, boolean>;
  byLevel: Record<number, { score: number; total: number }>;
  solutions: Record<string, Solution51>;
};

export function gradeTest51(answers: Record<string, string>): GradedTestResult51 {
  const result: GradedTestResult51 = { score: 0, total: TEST_QUESTIONS_51.length, byQuestion: {}, byLevel: {}, solutions: {} };
  for (const question of TEST_QUESTIONS_51) {
    const correct = gradeQuestion51(question, answers[question.id] ?? "");
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
