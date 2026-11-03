// ============================================================
// الدرس 54 — ㉒ مفتاح إجابة الاختبار النهائي (25 سؤالًا)
// يُحمّل عند التسليم فقط (import ديناميكي من TestArea54).
// المستودع عام: هذا فصل عرض لا ادّعاء أمني.
// ============================================================
import { TEST_QUESTIONS_54 } from "./testData54";

export type Solution54 = { id: string; model: string; why: string; choice?: string; patterns?: readonly RegExp[] };

const c = (n: number, choice: string, model: string, why: string): Solution54 => ({ id: `q${n}`, choice, model, why });
const t = (n: number, model: string, why: string, ...patterns: RegExp[]): Solution54 => ({ id: `q${n}`, model, why, patterns });

// صيغ النفي الشائعة بعد التطبيع: hadn't / had not / hadnt / hadn t
const HAD_NOT = "(?:had not|hadnt|hadn t)";
const WOULD_NOT = "(?:would not|wouldnt|wouldn t)";

export function normalize54(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bcan't\b/g, "can not")
    .replace(/\b([a-z]+)n't\b/g, "$1 not")
    .replace(/\b(i|you|he|she|we|they|it)'d\b/g, "$1 would")
    .replace(/\b(i|you|he|she|we|they|it)'ve\b/g, "$1 have")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const TEST_SOLUTIONS_54: readonly Solution54[] = [
  c(1, "c", "C. would have passed.", "السبب: النتيجة في الشرط الثالث تكون would have + V3."),
  c(2, "b", "B. had woken up.", "السبب: جملة الشرط تستخدم Past Perfect."),
  c(3, "a", "A. would have gone.", "السبب: النتيجة افتراضية في الماضي."),
  c(4, "b", "B. wouldn't have waited.", "السبب: نستخدم النفي wouldn't have + V3."),
  c(5, "c", "C. had lost.", "السبب: نستخدم had + V3 في جملة الشرط."),
  c(6, "c", "C. would have bought.", "السبب: هذا هو تركيب النتيجة في الشرط الثالث."),
  c(7, "b", "B. might have.", "السبب: الجملة تحتوي على won، وهو V3، ولذلك نحتاج إلى might have."),
  c(8, "b", "B. would have.", "السبب: التركيب الصحيح هو would have helped."),

  t(9, "If he had studied harder, he would have got better grades.", "had studied في جملة الشرط، وwould have got في النتيجة.",
    /^if he had studied harder he would have (?:got|gotten|received) better grades$/,
    /^he would have (?:got|gotten|received) better grades if he had studied harder$/),
  t(10, "If we had left earlier, we wouldn't have missed the train.", "نفي النتيجة يكون بـ wouldn't have + V3.",
    new RegExp(`^if we had left earlier we ${WOULD_NOT} have missed the train$`),
    new RegExp(`^we ${WOULD_NOT} have missed the train if we had left earlier$`)),
  t(11, "If she had known about the meeting, she would have attended it.", "known هو V3 من know، والنتيجة would have attended.",
    /^if she had known about the meeting she would have attended it$/,
    /^she would have attended it if she had known about the meeting$/),
  t(12, "If I had had more money, I would have bought that laptop.", "had had = had المساعدة + V3 من الفعل have.",
    /^if i had had more money i would have bought that laptop$/,
    /^i would have bought that laptop if i had had more money$/),
  t(13, "If they hadn't invited us, we wouldn't have come to the party.", "نفي الجزأين: hadn't في الشرط وwouldn't have في النتيجة.",
    new RegExp(`^if they ${HAD_NOT} invited us we ${WOULD_NOT} have come to the party$`),
    new RegExp(`^we ${WOULD_NOT} have come to the party if they ${HAD_NOT} invited us$`)),
  t(14, "If I had studied, I would have passed.", "السبب: لا نستخدم would في جملة If.",
    /^if i had studied i would have passed$/,
    /^i would have passed if i had studied$/),
  t(15, "If she had taken the bus, she would have arrived earlier.", "السبب: taken هو التصريف الثالث من take.",
    /^if she had taken the bus she would have arrived earlier$/,
    /^she would have arrived earlier if she had taken the bus$/),
  t(16, "If he hadn't forgotten his wallet, he would have paid.", "السبب: forgotten هو التصريف الثالث من forget.",
    new RegExp(`^if he ${HAD_NOT} forgotten his wallet he would have paid$`),
    new RegExp(`^he would have paid if he ${HAD_NOT} forgotten his wallet$`)),
  t(17, "If they had arrived earlier, they would have seen us.", "السبب: نستخدم would have في النتيجة.",
    /^if they had arrived earlier they would have seen us$/,
    /^they would have seen us if they had arrived earlier$/),
  t(18, "What would you have done if you had lost your phone?", "السبب: بعد would نستخدم have + V3 في السؤال عن نتيجة افتراضية في الماضي.",
    /^what would you have done if you had lost your phone$/),
  t(19, "Second Conditional.", "السبب: If + Past Simple, would + V1.",
    /^second(?: conditional)?$/),
  t(20, "Third Conditional.", "السبب: If + Past Perfect, would have + V3.",
    /^third(?: conditional)?$/),
  t(21, "First Conditional.", "السبب: If + Present Simple, will + V1.",
    /^first(?: conditional)?$/),
  t(22, "If I had woken up early, I would have arrived on time.", "had woken up في الشرط، وwould have arrived في النتيجة.",
    /^if i had (?:woken|waked|wakened) up (?:early|earlier) i would have arrived on time$/,
    /^i would have arrived on time if i had (?:woken|waked|wakened) up (?:early|earlier)$/),
  t(23, "If we hadn't forgotten the tickets, we would have entered the cinema.", "نفي الشرط بـ hadn't + V3، والنتيجة would have entered.",
    new RegExp(`^if we ${HAD_NOT} forgotten the tickets we would have entered the cinema$`),
    new RegExp(`^we would have entered the cinema if we ${HAD_NOT} forgotten the tickets$`)),
  t(24, "What would you have done if you had failed the exam?", "سؤال افتراضي عن الماضي: would have + V3 مع Past Perfect في الشرط.",
    /^what would you have done if you had failed (?:the )?(?:exam|test)$/),
  t(25, "If he had told me the truth, I might have helped him.", "might have يعبر عن احتمال افتراضي في الماضي.",
    /^if he had told me the truth i might have helped him$/,
    /^i might have helped him if he had told me the truth$/),
];

export function gradeTest54(answers: Record<string, string>) {
  const results = TEST_QUESTIONS_54.map((question, index) => {
    const solution = TEST_SOLUTIONS_54[index];
    const answer = answers[question.id] ?? "";
    const correct = solution.choice !== undefined
      ? answer.trim().toLowerCase() === solution.choice
      : Boolean(answer.trim()) && Boolean(solution.patterns?.some((pattern) => pattern.test(normalize54(answer))));
    return { question, answer, correct, solution, needsReview: question.type === "text" && Boolean(answer.trim()) && !correct, reviewed: false };
  });
  return { score: results.filter((item) => item.correct).length, total: results.length, results };
}
