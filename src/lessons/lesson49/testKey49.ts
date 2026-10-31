import { normalizeEnglish49 } from "./normalize49";
import { TEST_QUESTIONS_49, type TestQuestion49 } from "./testData49";

export type Solution49 = {
  id: string;
  model: string;
  why: string;
  choice?: string;
  patterns?: readonly RegExp[];
  alternatives?: string;
  rejected?: string;
};

const c = (id: string, answer: string, model: string, why: string, alternatives?: string, rejected?: string): Solution49 => ({
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
): Solution49 => ({ id, model, why, patterns, alternatives, rejected });

/**
 * Loaded only after the student submits.
 *
 * Two keys differ from the supplied answer sheet on purpose (documented in
 * docs/lesson49-coverage.md): items 3 and 4 already contain `have` after the
 * blank, so choosing `should have` / `needn't have` would produce
 * `should have have told` / `needn't have have bought`. The blank therefore
 * takes `should` / `needn't`; the modal-perfect meaning of both items is kept.
 */
export const TEST_SOLUTIONS_49: readonly Solution49[] = [
  /* ---------- القسم الأول ---------- */
  c(
    "q1",
    "a",
    "must",
    "التعب الشديد دليل قوي؛ MUST HAVE + V3 هي الاستنتاج القوي عن الماضي. أما SHOULD فتعني «كان ينبغي»، وNEEDN'T تعني عدم الضرورة.",
    "must / has to في سياق مشابه غير مقبولين هنا",
    "should have (نصيحة) وneedn't have (عدم ضرورة) تغيّران وظيفة الجملة",
  ),
  c(
    "q2",
    "a",
    "might",
    "المتحدث غير متأكد (but I'm not sure)؛ لذلك MIGHT HAVE + V3 للاحتمال في الماضي.",
    "may have / could have مقبولتان في سياق احتمال مشابه",
    "mustn't have ليست البديل الطبيعي للاستنتاج السلبي، وshould have نصيحة",
  ),
  c(
    "q3",
    "a",
    "should",
    "الفراغ يتبعه already have، فنحتاج SHOULD وحدها: You should have told me. اختيار should have ينتج should have have told وهو خطأ. (هذا تصحيح موثّق لمفتاح الإجابة الأصلي.)",
    "ought to + have told me مقبولة لغويًا في سياق مشابه",
    "should have / must have تنتجان تكرار have وتغيّران التركيب",
  ),
  c(
    "q4",
    "a",
    "needn't",
    "الفراغ يتبعه have bought، فنحتاج NEEDN'T وحدها: I needn't have bought. والمعنى أن الشراء حدث دون ضرورة. اختيار needn't have ينتج needn't have have bought. (هذا تصحيح موثّق لمفتاح الإجابة الأصلي.)",
    "need not + have bought صحيحة كذلك",
    "needn't have يكرر have، وmust have استنتاج لا عدم ضرورة",
  ),
  c("q5", "c", "seen", "بعد COULDN'T HAVE نستخدم V3 من see وهو seen، وليس saw (V2) أو see (V1).", "seen / have seen", "saw وsee خطأ في التصريف"),
  c("q6", "b", "taken", "بعد MIGHT HAVE نستخدم V3 من take وهو taken.", "taken / have taken", "take (V1) وtook (V2) مرفوضتان"),
  c("q7", "a", "spoken", "بعد SHOULDN'T HAVE نستخدم V3 من speak وهو spoken.", "spoken / have spoken", "speak وspoke مرفوضتان"),
  c(
    "q8",
    "b",
    "had known",
    "الشرط في الماضي يحتاج HAD + V3: if I had known. ثم WOULD HAVE + V3 في النتيجة.",
    "if I'd known تقبل كتابةً",
    "know وhave known لا تكوّنان الشرط الماضي",
  ),
  c("q9", "b", "He must have left.", "MUST HAVE + V3 استنتاج قوي عن الماضي. MIGHT HAVE احتمال، وSHOULD LEAVE نصيحة في الحاضر.", "He must have left.", "A احتمال وC نصيحة"),
  c(
    "q10",
    "b",
    "I needn't have bought it.",
    "NEEDN'T HAVE + V3 تعني أن الفعل وقع بالفعل، لكنه لم يكن ضروريًا. أما DIDN'T NEED TO فلا تحسم وحدها وقوع الفعل.",
    "I needn't have bought it.",
    "A لا تؤكد وقوع الشراء، وC تعني أنه كان ينبغي الشراء ولم يحدث",
  ),

  /* ---------- القسم الثاني ---------- */
  t("q11", "gone", "بعد HAVE نستخدم V3 من go وهو gone، وليس went.", [/^gone$/, /^have gone$/, /^she must have gone home$/], "gone / She must have gone home.", "went خطأ في التصريف"),
  t("q12", "called", "بعد HAVE نستخدم V3 من call وهو called.", [/^called$/, /^have called$/, /^you should have called me$/], "called / You should have called me.", "call خطأ في التصريف"),
  t("q13", "forgotten", "V3 من forget هو forgotten، وليس forgot.", [/^forgotten$/, /^have forgotten$/, /^they might have forgotten the keys$/], "forgotten / They might have forgotten the keys.", "forgot خطأ في التصريف"),
  t("q14", "won", "V3 من win هو won، وليس win.", [/^won$/, /^have won$/, /^he could have won the competition$/], "won / He could have won the competition.", "win خطأ في التصريف"),
  t("q15", "eaten", "V3 من eat هو eaten، وليس ate.", [/^eaten$/, /^have eaten$/, /^i shouldn't have eaten so much$/], "eaten / I shouldn't have eaten so much.", "ate خطأ في التصريف"),

  /* ---------- القسم الثالث ---------- */
  t("q16", "She must have arrived.", "بعد MUST نستخدم HAVE لا HAS؛ ثم V3 من arrive: arrived.", [/^she must have arrived$/], "She must have arrived.", "She must has arrived. / She must have arrive."),
  t("q17", "He might have forgotten.", "بعد MIGHT نستخدم HAVE لا HAD؛ ثم V3 من forget: forgotten.", [/^he might have forgotten$/], "He might have forgotten.", "He might had forgotten. / He might have forgot."),
  t("q18", "You should have gone to school.", "V3 من go هو gone، وليس went.", [/^you should have gone to school$/], "You should have gone to school.", "You should have went to school."),
  t("q19", "They could have seen us.", "V3 من see هو seen، وليس saw.", [/^they could have seen us$/], "They could have seen us.", "They could have saw us."),
  t(
    "q20",
    "I needn't have taken a taxi.",
    "V3 من take هو taken، وليس took.",
    [/^i needn't have taken a taxi$/, /^i need not have taken a taxi$/],
    "I needn't have taken a taxi. / I need not have taken a taxi.",
    "I needn't have took a taxi.",
  ),

  /* ---------- القسم الرابع ---------- */
  t(
    "q21",
    "She must have arrived early.",
    "لا بد أنها = MUST HAVE + V3؛ وصلت = arrived؛ مبكرًا = early.",
    [/^she must have arrived early$/],
    "She must have arrived early.",
    "She must has arrived early. / She must have arrived early yesterday (يضيف معنى غير موجود).",
  ),
  t(
    "q22",
    "He might not have understood the question.",
    "ربما لم = MIGHT NOT HAVE + V3؛ يفهم = understood؛ السؤال = the question. MAY NOT HAVE بديل صحيح في هذا السياق.",
    [
      /^he (?:might|may) not have understood the question$/,
      /^he mightn't have understood the question$/,
      /^he (?:might|may) not have understood (?:the )?question$/,
    ],
    "He might not have understood the question. / He may not have understood the question.",
    "He must not have understood... (استنتاج سلبي غير طبيعي هنا)؛ He might not understood... (ناقص HAVE)",
  ),
  t(
    "q23",
    "They should have helped us.",
    "كان ينبغي عليهم = SHOULD HAVE (أو OUGHT TO HAVE) + V3؛ يساعدونا = helped us.",
    [/^they (?:should|ought to) have helped us$/],
    "They should have helped us. / They ought to have helped us.",
    "They should helped us. / They should have help us.",
  ),
  t(
    "q24",
    "You shouldn't have bought that phone.",
    "لم يكن ينبغي لك = SHOULDN'T HAVE + V3؛ تشتري = bought؛ ذلك الهاتف = that phone.",
    [/^you (?:shouldn't|should not) have bought that phone$/],
    "You shouldn't have bought that phone. / You should not have bought that phone.",
    "You should have bought that phone. (يغيّر النفي والندم)",
  ),
  t(
    "q25",
    "I would have gone with you if you had told me.",
    "كنت سأذهب = WOULD HAVE + gone؛ معك = with you؛ لو كنت أخبرتني = if you had told me (أو if you'd told me).",
    [/^(?:i would|i'd) have gone with you if (?:you had|you'd) told me$/],
    "I would have gone with you if you had told me. / I'd have gone with you if you'd told me.",
    "I would go with you... (لا يعبّر عن نتيجة ماضية افتراضية)؛ I would have went... (V2 بدل V3)",
  ),
] as const;

const byId = new Map(TEST_SOLUTIONS_49.map((solution) => [solution.id, solution]));

export function gradeQuestion49(question: TestQuestion49, rawAnswer: string): boolean {
  const solution = byId.get(question.id);
  if (!solution || !rawAnswer.trim()) return false;
  if (question.type === "choice") return rawAnswer.trim() === solution.choice;
  const answer = normalizeEnglish49(rawAnswer);
  return Boolean(solution.patterns?.some((pattern) => pattern.test(answer)));
}

export type GradedTestResult49 = {
  score: number;
  total: number;
  byQuestion: Record<string, boolean>;
  byLevel: Record<number, { score: number; total: number }>;
  solutions: Record<string, Solution49>;
};

export function gradeTest49(answers: Record<string, string>): GradedTestResult49 {
  const result: GradedTestResult49 = { score: 0, total: TEST_QUESTIONS_49.length, byQuestion: {}, byLevel: {}, solutions: {} };
  for (const question of TEST_QUESTIONS_49) {
    const correct = gradeQuestion49(question, answers[question.id] ?? "");
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
