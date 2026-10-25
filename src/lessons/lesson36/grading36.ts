import { normalize36 } from "./kit36";

/** Shape of one platform-authored answer-key entry (kept type-only, no key data). */
export type TestSolution36 = {
  n: number;
  level: 1 | 2 | 3 | 4 | 5;
  answer: string;
  explanation: string;
  alternatives?: string[];
  judgment: "most-natural" | "grammatical-repair" | "contextual" | "open-model";
  sourceStatus: "teacher-authored";
  correctOption?: number;
  acceptableOptions?: number[];
  accepts?: string[];
};

export type GradeStatus36 = "correct" | "acceptable" | "review" | "open";

export type QuestionGrade36 = {
  n: number;
  status: GradeStatus36;
  answer: string;
  explanation: string;
  alternatives?: string[];
};

export type Grade36 = {
  perQuestion: QuestionGrade36[];
  correct: number[];
  acceptable: number[];
  review: number[];
  open: number[];
  score: number;
  maxScore: number;
};

function typedAnswerMatches(value: string, accepted: string[] | undefined) {
  if (!accepted?.length) return false;
  const normalized = normalize36(value);
  return accepted.some((candidate) => normalize36(candidate) === normalized);
}

/**
 * Grade only what the lesson can decide objectively: the five choice items and
 * the ten typed items. Meaning questions and the open Boss level keep their
 * model answers and are never marked wrong for wording.
 */
export function gradeTest36(answers: Record<number, string>, solutions: TestSolution36[]): Grade36 {
  const perQuestion: QuestionGrade36[] = [];
  const correct: number[] = [];
  const acceptable: number[] = [];
  const review: number[] = [];
  const open: number[] = [];
  let score = 0;

  for (const solution of solutions) {
    const raw = (answers[solution.n] ?? "").trim();
    const base = {
      n: solution.n,
      answer: solution.answer,
      explanation: solution.explanation,
      alternatives: solution.alternatives,
    };
    if (solution.level === 1) {
      const picked = raw === "" ? -1 : Number(raw);
      if (picked === solution.correctOption) {
        perQuestion.push({ ...base, status: "correct" });
        correct.push(solution.n);
        score += 1;
      } else if (solution.acceptableOptions?.includes(picked)) {
        perQuestion.push({ ...base, status: "acceptable" });
        acceptable.push(solution.n);
        score += 0.5;
      } else {
        perQuestion.push({ ...base, status: "review" });
        review.push(solution.n);
      }
      continue;
    }
    if (solution.level === 2 || solution.level === 3) {
      if (typedAnswerMatches(raw, solution.accepts)) {
        perQuestion.push({ ...base, status: "correct" });
        correct.push(solution.n);
        score += 1;
      } else {
        perQuestion.push({ ...base, status: "review" });
        review.push(solution.n);
      }
      continue;
    }
    perQuestion.push({ ...base, status: "open" });
    open.push(solution.n);
  }

  return {
    perQuestion,
    correct,
    acceptable,
    review,
    open,
    score,
    maxScore: 15,
  };
}

export function formatScore36(score: number) {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}
