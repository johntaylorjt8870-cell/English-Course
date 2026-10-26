import type { TestQuestion37 } from "./testData37";

/* ============================================================
   محرّك التصحيح (بلا إجابات)
   هذا الملف يحمل منطق المقارنة فقط: لا نموذج إجابة ولا شرح ولا مفتاح.
   المفتاح كله في `solutionsData37.ts`، ولا يُحمَّل إلا بعد التسليم أو
   دخول المعلم عبر dynamic import في `TestArea37`.
   ============================================================ */

export type AnswerSpec37 = {
  modelAnswer: string;
  acceptedSummary: string;
  explanation: string;
  example?: string;
  check: (raw: string) => boolean;
};

export type QuestionGrade37 = {
  n: number;
  isCorrect: boolean;
  /** ok = مطابقة معتمدة، equivalent = صيغة مكافئة صحيحة، review = تحتاج مراجعة، open = مفتوحة تقييم بالمعنى */
  status: "ok" | "equivalent" | "review" | "open";
  statusLabel: string;
  modelAnswer: string;
  acceptedSummary: string;
  /** شرح عربي واضح لسبب الإجابة */
  explanation: string;
  /** الجملة/الصيغة الإنجليزية النموذجية تُعرض في سطر LTR مستقل */
  example?: string;
  /** true للأسئلة المفتوحة التي تُقيَّم بالمعنى لا بمطابقة نصية */
  meaningBased: boolean;
};

export type TestGradeSummary37 = {
  total: number;
  correctCount: number;
  percentage: number;
  /** عدد الأسئلة المفتوحة التي تحتاج مراجعة بشرية/ذاتية */
  meaningBasedCount: number;
  results: Record<number, QuestionGrade37>;
};

export function normEn37(value: string): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[\u2018\u2019`]/g, "'")
    .replace(/[\u201c\u201d"]/g, "")
    .replace(/\bwill\s+not\b/g, "won't")
    .replace(/\bi'll\b/g, "i will")
    .replace(/\bshe'll\b/g, "she will")
    .replace(/\bhe'll\b/g, "he will")
    .replace(/\bwe'll\b/g, "we will")
    .replace(/\bthey'll\b/g, "they will")
    .replace(/\byou'll\b/g, "you will")
    .replace(/[.,!?;:/\\—–-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normAr37(value: string): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[ً-ٟ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** الأسئلة التي تُقيَّم بالمعنى: المستوى الرابع (16–20). */
export const MEANING_BASED_37 = new Set([16, 17, 18, 19, 20]);

export function gradeQuestion37(
  question: TestQuestion37,
  rawAnswer: string,
  specs: Record<number, AnswerSpec37>,
): QuestionGrade37 {
  const spec = specs[question.n];
  const isCorrect = spec ? spec.check(rawAnswer) : false;
  const meaningBased = MEANING_BASED_37.has(question.n);
  const status: QuestionGrade37["status"] = isCorrect
    ? question.options
      ? "ok"
      : meaningBased
        ? "open"
        : "equivalent"
    : "review";
  const statusLabel = isCorrect
    ? meaningBased
      ? "إجابة مقبولة بالمعنى — قارن بالنموذج"
      : question.options
        ? "إجابة صحيحة"
        : "إجابة صحيحة / صيغة مكافئة معتمدة"
    : meaningBased
      ? "تحتاج مراجعة المعنى — اقرأ النموذج"
      : "راجع الإجابة النموذجية والسبب";
  return {
    n: question.n,
    isCorrect,
    status,
    statusLabel,
    modelAnswer: spec?.modelAnswer ?? "",
    acceptedSummary: spec?.acceptedSummary ?? "",
    explanation: spec?.explanation ?? "",
    example: spec?.example,
    meaningBased,
  };
}

export function gradeTest37(
  questions: readonly TestQuestion37[],
  answers: Record<number, string>,
  specs: Record<number, AnswerSpec37>,
): TestGradeSummary37 {
  const results: Record<number, QuestionGrade37> = {};
  let correctCount = 0;
  let meaningBasedCount = 0;
  for (const question of questions) {
    const grade = gradeQuestion37(question, answers[question.n] ?? "", specs);
    results[question.n] = grade;
    if (grade.isCorrect) correctCount += 1;
    if (grade.meaningBased) meaningBasedCount += 1;
  }
  const total = questions.length;
  const percentage = total ? Math.round((correctCount / total) * 100) : 0;
  return { total, correctCount, percentage, meaningBasedCount, results };
}

export function formatScore37(summary: TestGradeSummary37): string {
  return `${summary.correctCount} / ${summary.total}`;
}
