import { matchesAcceptedAnswer40 } from "./kit40";
import { SOLUTIONS_40 } from "./solutionsData40";

export type ItemEvaluationStatus40 = "correct" | "incorrect" | "review" | "empty";

export interface GradedQuestion40 {
  id: string;
  number: number;
  status: ItemEvaluationStatus40;
  submittedValue: string;
  modelAnswer: string;
  conciseReason: string;
}

export interface GradeSummary40 {
  autoCorrect: number;
  autoTotal: number;
  reviewSubmitted: number;
  reviewTotal: number;
  emptyCount: number;
  byQuestionId: Readonly<Record<string, GradedQuestion40>>;
}

export function gradeTest40(answers: Readonly<Record<string, string>>): GradeSummary40 {
  let autoCorrect = 0;
  let autoTotal = 0;
  let reviewSubmitted = 0;
  let reviewTotal = 0;
  let emptyCount = 0;
  const byQuestionId: Record<string, GradedQuestion40> = {};

  for (const sol of SOLUTIONS_40) {
    const raw = (answers[sol.id] ?? "").trim();
    if (sol.gradingMode === "review") {
      reviewTotal += 1;
      const status: ItemEvaluationStatus40 = raw ? "review" : "empty";
      if (raw) reviewSubmitted += 1;
      else emptyCount += 1;
      byQuestionId[sol.id] = {
        id: sol.id,
        number: sol.number,
        status,
        submittedValue: raw,
        modelAnswer: sol.sourceAnswer,
        conciseReason: sol.sourceReason,
      };
    } else {
      autoTotal += 1;
      let status: ItemEvaluationStatus40;
      if (!raw) {
        status = "empty";
        emptyCount += 1;
      } else if (matchesAcceptedAnswer40(raw, sol.acceptedNormalized)) {
        status = "correct";
        autoCorrect += 1;
      } else {
        status = "incorrect";
      }
      byQuestionId[sol.id] = {
        id: sol.id,
        number: sol.number,
        status,
        submittedValue: raw,
        modelAnswer: sol.sourceAnswer,
        conciseReason: sol.sourceReason,
      };
    }
  }

  return Object.freeze({
    autoCorrect,
    autoTotal,
    reviewSubmitted,
    reviewTotal,
    emptyCount,
    byQuestionId: Object.freeze(byQuestionId),
  });
}
