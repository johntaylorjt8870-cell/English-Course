import { normalizeEnglish50 } from "./normalize50";
import { TEST_QUESTIONS_50, type TestQuestion50 } from "./testData50";

export type Solution50 = {
  id: string;
  model: string;
  why: string;
  choice?: string;
  patterns?: readonly RegExp[];
  alternatives?: string;
  rejected?: string;
};

const c = (id: string, answer: string, model: string, why: string, alternatives?: string, rejected?: string): Solution50 => ({
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
): Solution50 => ({ id, model, why, patterns, alternatives, rejected });

const cant = "(?:can't|cannot|can not)";

/**
 * Loaded only after the student submits.
 *
 * Question 17 deliberately accepts both corrected readings: a past
 * deduction ("can't have gone") and a present ongoing deduction
 * ("can't be going"), because both fix the error while keeping the strong
 * negative meaning. Translations accept modal synonyms that preserve the
 * same certainty and time (may / might / could for possibility, can't /
 * couldn't for the past negative deduction).
 */
export const TEST_SOLUTIONS_50: readonly Solution50[] = [
  /* ---------- المجموعة الأولى ---------- */
  c(
    "q1",
    "a",
    "must",
    "عمل اثنتي عشرة ساعة دليل قوي على الإنهاك الآن: She must be exhausted. الفراغ يتبعه be، فالصيغة might have لا تصلح تركيبيًا هنا.",
    "must — استنتاج قوي عن الحاضر",
    "can't تنفي الإنهاك عكس الدليل، وmight have be تركيب خاطئ",
  ),
  c(
    "q2",
    "b",
    "can't",
    "المتحدث يراه في المكتب الآن، فوجوده في المنزل مستبعد بقوة: He can't be at home.",
    "can't — نفي قوي عن الحاضر",
    "must تدّعي العكس، وmight تعبّر عن شك لا يناسب دليل الرؤية المباشرة",
  ),
  c(
    "q3",
    "b",
    "can't",
    "كتابة الموعد في مفكراتهم دليل قوي ضد النسيان في سياق السؤال: They can't have forgotten the appointment.",
    "can't have forgotten — نفي قوي عن الماضي",
    "must have forgotten تعكس الدليل، وshould have forgotten لا تعني الاستنتاج المقصود",
  ),
  c(
    "q4",
    "a",
    "must",
    "الشوارع المبللة الآن نتيجة نميل بقوة إلى تفسيرها بمطر الليلة الماضية: It must have rained. الفراغ يتبعه have مباشرة.",
    "must have rained — استنتاج قوي عن الماضي",
    "must be have وcan't be have تركيبان خاطئان بعد الفراغ، وcan't تناقض الدليل",
  ),
  c(
    "q5",
    "a",
    "must",
    "الحكم عن نشاط يحدث الآن: She must be studying now. قد توجد تفسيرات أخرى لضوء الغرفة، لكن الفراغ قبل be studying يتطلب الفعل الناقص وحده.",
    "must be studying now — نشاط مستمر الآن",
    "must have be studying وmust have been be studying تركيبان خاطئان",
  ),
  c(
    "q6",
    "a",
    "might",
    "احتمال عن نشاط كان مستمرًا وقت الاتصال: He might have been sleeping. الفراغ يتبعه have been، فيكفي الفعل الناقص وحده.",
    "might have been sleeping — احتمال مستمر في الماضي",
    "might be have وmight have have تركيبان خاطئان",
  ),
  c(
    "q7",
    "a",
    "can't",
    "«That is impossible» تجعل الحكم استنتاجًا سلبيًا قويًا عن الحاضر: You can't be serious!",
    "can't be serious — نفي قوي الآن",
    "must تعكس المعنى، وmust have be تركيب خاطئ",
  ),
  c(
    "q8",
    "a",
    "might",
    "«I'm not certain» تصرّح بعدم التأكد: They might be waiting outside. احتمال لنشاط مستمر الآن، والفراغ قبل be يتطلب الفعل الناقص وحده.",
    "might be waiting — احتمال الآن (وتقبل may / could في سياق مكافئ)",
    "must have be وcan't have be تركيبان خاطئان، والنفي القوي يناقض عدم التأكد",
  ),
  c(
    "q9",
    "b",
    "can't",
    "وجوده مع المتحدث طوال المساء دليل قوي ضد السرقة: He can't have stolen the money (وتعبر couldn't have عن المعنى القريب نفسه).",
    "can't have stolen — نفي قوي عن الماضي",
    "must تعكس الدليل، وshould have stolen نصيحة أو ندم لا استنتاج",
  ),
  c(
    "q10",
    "a",
    "must",
    "خبرتها تجعل معرفتها بالإجابة استنتاجًا قويًا عن الحاضر: She must know the answer. الفعل بعد MUST بصيغته الأساسية.",
    "must know — استنتاج قوي الآن",
    "must have know وcan't have know خطآن في التصريف، والنفي يناقض الخبرة",
  ),

  /* ---------- المجموعة الثانية ---------- */
  t("q11", "be", "بعد MUST يأتي BE لأن tired صفة: He must be very tired.", [/^be$/, /^must be$/, /^he must be very tired$/], "be / He must be very tired.", "been أو is بعد must"),
  t("q12", "taken", "بعد HAVE نستخدم V3 من take وهو taken.", [/^taken$/, /^have taken$/, /^they might have taken the wrong road$/], "taken / They might have taken the wrong road.", "take (V1) وtook (V2)"),
  t("q13", "be", "serious صفة تحتاج BE بعد CAN'T: She can't be serious.", [/^be$/, /^can't be$/, /^cannot be$/, /^she can't be serious$/, /^she cannot be serious$/, /^she can not be serious$/], "be / She can't be serious.", "been أو is بعد can't"),
  t("q14", "working", "بعد HAVE BEEN يأتي V-ing لعمل كان مستمرًا: working.", [/^working$/, /^been working$/, /^he must have been working all night$/], "working / He must have been working all night.", "work أو worked بعد been"),
  t("q15", "playing", "بعد COULD BE يأتي V-ing لنشاط مستمر الآن: playing.", [/^playing$/, /^be playing$/, /^the children could be playing outside$/], "playing / The children could be playing outside.", "play أو played بعد be"),

  /* ---------- المجموعة الثالثة ---------- */
  t("q16", "She must have left.", "بعد MUST نستخدم HAVE لا HAS، ثم V3 من leave وهو left.", [/^she must have left$/], "She must have left.", "She must has left. / She must have leave."),
  t(
    "q17",
    "He can't have gone to school.",
    "went هي V2 ولا تلي BE هنا. التصحيح بحسب الزمن: عن الماضي can't have gone، وعن نشاط الآن can't be going. الصيغتان مقبولتان لأنهما تحافظان على النفي القوي وتصححان التركيب.",
    [
      new RegExp(`^he ${cant} have gone to school$`),
      new RegExp(`^he ${cant} be going to school$`),
    ],
    "He can't have gone to school. (ماضٍ) / He can't be going to school. (نشاط الآن)",
    "He can't be went to school. / He can't gone to school.",
  ),
  t("q18", "They might have seen us.", "بعد HAVE نستخدم V3 من see وهو seen، مع الحفاظ على MIGHT نفسها.", [/^they might have seen us$/], "They might have seen us.", "They might have saw us. — وتغيير الفعل الناقص يغيّر الجملة المطلوب تصحيحها."),
  t("q19", "He must have been sleeping.", "بعد HAVE BEEN يأتي V-ing: sleeping، وليس الفعل الأساسي sleep.", [/^he must have been sleeping$/], "He must have been sleeping.", "He must have been sleep. / He must have been slept."),
  t(
    "q20",
    "She can't be the manager. She's only a student.",
    "المقصود استنتاج «لا يمكن أن تكون المديرة» لا منعٌ، لذلك CAN'T بدل MUSTN'T.",
    [
      new RegExp(`^she ${cant} be the manager$`),
      new RegExp(`^she ${cant} be the manager she's only a student$`),
      new RegExp(`^she ${cant} be the manager she is only a student$`),
    ],
    "She can't be the manager. — مع الجملة الثانية أو دونها",
    "She mustn't be the manager. (تعني المنع لا الاستنتاج)",
  ),

  /* ---------- المجموعة الرابعة ---------- */
  t(
    "q21",
    "They must be at home now.",
    "لا بد = MUST، وفي المنزل مكان يحتاج BE، وnow للحاضر. تقبل صياغة be home بالمعنى نفسه.",
    [/^they must be at home now$/, /^they must be home now$/],
    "They must be at home now. / They must be home now.",
    "They must be at home (تحذف «الآن»)؛ They must have been at home now (زمن خاطئ)",
  ),
  t(
    "q22",
    "She might have left her phone in the car.",
    "ربما + حدث ماضٍ = MIGHT HAVE + V3. «نسيت هاتفها في السيارة» تُترجم طبيعيًا بـleft، وتُقبل forgotten بالمعنى نفسه، كما تُقبل MAY وCOULD گاحتمال بالدرجة نفسها.",
    [/^she (?:might|may|could) have (?:left|forgotten) her phone in the car$/],
    "She might / may / could have left (أو forgotten) her phone in the car.",
    "She might left her phone… (ناقص HAVE)؛ She must have left… (يقوّي الحكم فوق «ربما»)",
  ),
  t(
    "q23",
    "He can't have been driving at that time.",
    "نفي قوي عن نشاط كان مستمرًا = CAN'T HAVE BEEN + V-ing، وتُقبل COULDN'T HAVE بالمعنى القريب نفسه. كلمة the car اختيارية لأن driving وحدها تؤدي المعنى.",
    [
      new RegExp(`^he (?:${cant}|couldn't|could not) have been driving(?: the car)? at that time$`),
      new RegExp(`^he (?:${cant}|couldn't|could not) have been driving(?: the car)? at that moment$`),
    ],
    "He can't / couldn't have been driving (the car) at that time.",
    "He can't be driving at that time (حاضر لا ماضٍ)؛ He can't have drove… (V2 بدل V3)",
  ),
  t(
    "q24",
    "She might be talking to her mother now.",
    "احتمال لنشاط مستمر الآن = MIGHT BE + V-ing، وتُقبل MAY وCOULD، كما تُقبل speaking بمعنى التحدث نفسه.",
    [/^she (?:might|may|could) be (?:talking|speaking) to her mother now$/, /^she (?:might|may|could) be (?:talking|speaking) with her mother now$/],
    "She might / may / could be talking to her mother now.",
    "She might talk to her mother now (لا يعبّر عن الاستمرار المطلوب)؛ حذف now يحذف جزءًا من المعنى",
  ),
  t(
    "q25",
    "He must have been studying when I called him.",
    "استنتاج قوي عن دراسة كانت مستمرة وقت الاتصال = MUST HAVE BEEN + V-ing. تُقبل phoned مرادفًا، وhim مطابقة لـ«اتصلت به» (وتُقبل الجملة دونها لأن called وحدها مكتملة).",
    [/^he must have been studying when i (?:called|phoned) him$/, /^he must have been studying when i (?:called|phoned)$/],
    "He must have been studying when I called (him).",
    "He must be studying when I called him (خلط زمنين)؛ He must have studied… (حدث منتهٍ، لا دراسة مستمرة وقت الاتصال)",
  ),
] as const;

const byId = new Map(TEST_SOLUTIONS_50.map((solution) => [solution.id, solution]));

export function gradeQuestion50(question: TestQuestion50, rawAnswer: string): boolean {
  const solution = byId.get(question.id);
  if (!solution || !rawAnswer.trim()) return false;
  if (question.type === "choice") return rawAnswer.trim() === solution.choice;
  const answer = normalizeEnglish50(rawAnswer);
  return Boolean(solution.patterns?.some((pattern) => pattern.test(answer)));
}

export type GradedTestResult50 = {
  score: number;
  total: number;
  byQuestion: Record<string, boolean>;
  byLevel: Record<number, { score: number; total: number }>;
  solutions: Record<string, Solution50>;
};

export function gradeTest50(answers: Record<string, string>): GradedTestResult50 {
  const result: GradedTestResult50 = { score: 0, total: TEST_QUESTIONS_50.length, byQuestion: {}, byLevel: {}, solutions: {} };
  for (const question of TEST_QUESTIONS_50) {
    const correct = gradeQuestion50(question, answers[question.id] ?? "");
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
