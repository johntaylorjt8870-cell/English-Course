import { normalizeEnglish48 } from "./normalize48";
import { TEST_QUESTIONS_48, type TestQuestion48 } from "./testData48";

export type Solution48 = {
  id: string;
  model: string;
  why: string;
  choice?: string;
  patterns?: readonly RegExp[];
  alternatives?: string;
  rejected?: string;
};

const c = (id: string, answer: string, model: string, why: string, alternatives?: string, rejected?: string): Solution48 => ({
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
): Solution48 => ({ id, model, why, patterns, alternatives, rejected });

const negativeNecessity = /^(?:need not|needn't|do not have to|don't have to|do not need to|don't need to)$/;

/** Loaded only after the student submits. */
export const TEST_SOLUTIONS_48: readonly Solution48[] = [
  /* ---------- المستوى الأول ---------- */
  c("q1", "b", "can", "CAN لا تتغير مع الفاعل، ولا نضيف s إلى الفعل الناقص مع She.", "can", "cans / can to"),
  c("q2", "a", "might", "الجملة تعبّر عن احتمال غير مؤكد، وMIGHT مناسبة هنا.", "may / could مقبولتان في سياق مشابه، أما في هذا السؤال فالمطلوب MIGHT", "mustn't (منع) وhas to (ضرورة) تغيّران المعنى"),
  c("q3", "b", "must", "MUST يتبعها الفعل الأساسي دون TO، وهي تناسب الإلزام هنا.", "have to مقبولة في سياق مشابه", "should to / must to خطأ في التركيب"),
  c("q4", "b", "mustn't", "السياق يوضح أن استخدام الهاتف ممنوع؛ وMUSTN'T هي المنع.", undefined, "don't have to / needn't تعنيان عدم الضرورة، وهذا يغيّر المعنى"),
  c("q5", "b", "don't have to", "إحضار الطعام غير ضروري وليس ممنوعًا، فالصيغة هي DON'T HAVE TO.", "needn't صحيحة في المعنى نفسه", "mustn't تعني المنع، وهي خطأ دلالي هنا"),
  c("q6", "a", "should", "الجملة تقدم نصيحة، وSHOULD + V1.", undefined, "should to / shoulds خطأ في التركيب"),
  c("q7", "b", "May", "المتحدث يطلب الإذن، وMAY هي الصيغة الرسمية المهذبة.", "Can / Could مقبولتان في سياق مشابه", "Must / Have لا تُستخدمان لطلب الإذن بهذه الصيغة"),
  c("q8", "c", "stay", "WOULD RATHER + V1 دون TO ودون ing.", undefined, "staying / to stay خطأ في التركيب"),
  c("q9", "a", "closing", "بعد MIND في الطلب المهذب نستخدم V-ing.", undefined, "to close / close خطأ في التركيب"),
  c("q10", "b", "has", "HAVE TO تتحول إلى HAS TO مع He؛ ومن ثم لا نضيف s إلى الفعل بعدها.", undefined, "have خطأ في التصريف، وmust has تركيب مختلط"),

  /* ---------- المستوى الثاني ---------- */
  t(
    "q11",
    "could",
    "القدرة العامة في الماضي تُعبَّر عنها بـ COULD + V1.",
    [/^could$/, /^i could swim very well$/, /^when i was young i could swim very well$/],
    "could swim / I could swim very well.",
    "can لم تُطلب هنا لأن السياق ماضٍ",
  ),
  t(
    "q12",
    "may / might / could",
    "كلها تعبّر عن الاحتمال، مع اختلافات دقيقة في السياق؛ ولا تُحفظ نسب مئوية ثابتة.",
    [
      /^(?:may|might|could)$/,
      /^she (?:may|might|could) be at home$/,
      /^she (?:may|might|could) be at home but i(?:'m| am) not certain$/,
    ],
    "may / might / could",
    "must تعني يقينًا أو إلزامًا، وهي خطأ دلالي هنا",
  ),
  t(
    "q13",
    "must / have to",
    "كلاهما مناسب للتعبير عن الضرورة؛ الفرق في مصدر الإلزام وتركيز المتحدث.",
    [/^(?:must|have to)$/, /^we (?:must|have to) finish this task today$/],
    "must / have to",
    "should نصيحة لا ضرورة، وmustn't منع",
  ),
  t(
    "q14",
    "needn't / don't have to",
    "كلتاهما تعبّر عن عدم الضرورة أو عدم الحاجة.",
    [negativeNecessity, /^you (?:need not|needn't|do not have to|don't have to) hurry$/],
    "needn't / don't have to / don't need to",
    "mustn't منع، وهي خطأ دلالي هنا",
  ),
  t(
    "q15",
    "to learn",
    "القاعدة: WOULD LIKE + TO + V1، فالفعل بعد LIKE يحتاج TO.",
    [/^to learn(?: another language)?$/, /^i'd like to learn another language$/, /^i would like to learn another language$/],
    "I'd like to learn another language.",
    "learn / learning خطأ في التركيب",
  ),

  /* ---------- المستوى الثالث ---------- */
  t("q16", "He must study harder.", "لا نضع TO بعد MUST؛ القاعدة: MUST + V1.", [/^he must study harder$/], undefined, "He must to study harder."),
  t("q17", "Can she drive?", "نقدّم CAN على الفاعل، ولا نستخدم DOES مع الأفعال الناقصة.", [/^can she drive$/], undefined, "Does she can drive?"),
  t(
    "q18",
    "You don't have to come early.",
    "المقصود عدم الضرورة لا المنع، وNEEDN'T بديل صحيح.",
    [/^you (?:do not have to|don't have to) come early$/, /^you (?:need not|needn't) come early$/],
    "You don't have to come early. / You needn't come early.",
    "You mustn't come early. تحمل معنى المنع",
  ),
  t(
    "q19",
    "I'd rather travel by train.",
    "WOULD RATHER + V1 دون TO، ويمكن كتابة I would rather.",
    [/^(?:i'd|i would) rather travel by train$/],
    "I would rather travel by train.",
    "I'd rather to travel… خطأ في التركيب",
  ),
  t(
    "q20",
    "Would you mind waiting here?",
    "بعد MIND نستخدم V-ing لا TO.",
    [/^would you mind waiting here$/],
    undefined,
    "Would you mind to wait here?",
  ),

  /* ---------- المستوى الرابع ---------- */
  c(
    "q21",
    "a",
    "الأولى منع، والثانية عدم ضرورة: يمكنك المغادرة لكنك لست ملزمًا.",
    "MUSTN'T منع صريح، وDON'T HAVE TO عدم إلزام؛ الخلط بينهما يغيّر المعنى تمامًا.",
  ),
  c("q22", "a", "الأولى قدرة في الحاضر، والثانية قدرة عامة في الماضي.", "CAN للحاضر وCOULD للقدرة العامة في الماضي."),
  c("q23", "a", "الأولى نصيحة أو توصية، والثانية ضرورة أو إلزام قوي.", "SHOULD لا تُلزم، وMUST تُلزم."),
  c(
    "q24",
    "a",
    "لأن HAVE TO يتغير مع الفاعل، فيصبح HAS TO مع He.",
    "HAVE TO ليس فعلًا ناقصًا خالصًا؛ ومن هنا تظهر الـ s على HAS لا على الفعل الأساسي.",
  ),

  /* ---------- المستوى الخامس ---------- */
  t(
    "q25",
    "May, may, have to, should, Could, needn't, would",
    "الحوار يجمع الاستئذان (MAY I) والموافقة (you may) والضرورة (HAVE TO) والنصيحة (SHOULD) والطلب المهذب (COULD YOU) وعدم الحاجة (NEEDN'T) والرغبة (WOULD LIKE).",
    [],
    "التفسير التفصيلي للفراغات السبعة في مساحة المعلم.",
    "أي تركيب يخلط بين المنع وعدم الضرورة، أو يضع TO بعد فعل ناقص، يُرفض",
  ),
] as const;

const byId = new Map(TEST_SOLUTIONS_48.map((solution) => [solution.id, solution]));

/** البدائل المقبولة لكل فراغ في الحوار (مطبَّعة بنفس دالة التطبيع). */
export const DIALOGUE_ACCEPTED_48: readonly (readonly string[])[] = [
  ["may", "could", "can"],
  ["may", "can"],
  ["have to", "must"],
  ["should", "ought to", "could"],
  ["could", "would"],
  ["needn't", "need not", "don't have to", "do not have to", "don't need to", "do not need to"],
  ["would", "'d", "i'd"],
];

const MODAL_SCAN_48 =
  /\b(may|might|could|can|must|have to|has to|should|ought to|needn't|need not|don't have to|do not have to|don't need to|do not need to|would|will|mustn't|must not)\b/g;

function chunkMatches(chunk: string, index: number): boolean {
  return DIALOGUE_ACCEPTED_48[index].some((accepted) => chunk === accepted);
}

/**
 * The dialogue question accepts the seven modals in order, separated by commas
 * or new lines, or typed inside the complete dialogue. Each blank is checked
 * against its own accepted set so a correct modal in the wrong blank fails.
 */
export function gradeDialogue48(raw: string): boolean {
  if (!raw.trim()) return false;
  const rawChunks = raw.split(/[,;\n،]+/).map((chunk) => normalizeEnglish48(chunk)).filter(Boolean);
  if (rawChunks.length === 7 && rawChunks.every((chunk, i) => chunkMatches(chunk, i))) return true;

  const text = normalizeEnglish48(raw);
  const found = [...text.matchAll(MODAL_SCAN_48)].map((match) => match[1]);
  if (found.length < 7) return false;
  for (let start = 0; start <= found.length - 7; start++) {
    const candidate = found.slice(start, start + 7);
    if (candidate.every((token, i) => chunkMatches(token, i))) return true;
  }
  return false;
}

export function gradeQuestion48(question: TestQuestion48, rawAnswer: string): boolean {
  const solution = byId.get(question.id);
  if (!solution || !rawAnswer.trim()) return false;
  if (question.id === "q25") return gradeDialogue48(rawAnswer);
  if (question.type === "choice") return rawAnswer.trim() === solution.choice;
  const answer = normalizeEnglish48(rawAnswer);
  return Boolean(solution.patterns?.some((pattern) => pattern.test(answer)));
}

export type GradedTestResult48 = {
  score: number;
  total: number;
  byQuestion: Record<string, boolean>;
  byLevel: Record<number, { score: number; total: number }>;
  solutions: Record<string, Solution48>;
};

export function gradeTest48(answers: Record<string, string>): GradedTestResult48 {
  const result: GradedTestResult48 = { score: 0, total: TEST_QUESTIONS_48.length, byQuestion: {}, byLevel: {}, solutions: {} };
  for (const question of TEST_QUESTIONS_48) {
    const correct = gradeQuestion48(question, answers[question.id] ?? "");
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
