// Never statically import this module in student code. Loaded only after submission.
import { TEST_SOLUTIONS_39 } from "./solutionsData39";
const accepted: Record<number, string[]> = {
  1: ["B", "been", "B. been"],
  2: ["C", "working", "C. working"],
  3: ["C", "will", "C. Will"],
  4: ["C", "waiting", "C. waiting"],
  5: ["B", "learning", "B. learning"],
  6: ["will have been studying", "will have studied"],
  7: ["will have been working", "will have worked"],
  8: [
    "won't have been travelling",
    "will not have been travelling",
    "won't have travelled",
    "will not have travelled",
  ],
  9: ["Will he have been waiting", "Will he have waited"],
  10: ["will have been preparing", "will have prepared"],
  21: ["will have been working", "will have worked"],
  22: ["will have completed"],
  23: ["will be presenting", "will present", "will have presented"],
  24: ["will have been preparing", "will have prepared"],
  25: ["will you have been developing", "will you have developed"],
};
export const normalize39 = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\b(i|she|he|we|they|you)'ll\b/g, "$1 will")
    .replace(/\bwon't\b/g, "will not")
    .replace(/travelling/g, "traveling")
    .replace(/[.,!?;:"“”]/g, "")
    .replace(/\s+/g, " ")
    .trim();
export function gradeTest39(answers: Record<number, string>) {
  const results = TEST_SOLUTIONS_39.map((s) => {
    const value = normalize39(answers[s.n] || "");
    const exact = [s.answer, ...(accepted[s.n] || [])].some(
      (a) => normalize39(a) === value,
    );
    // Free conceptual explanations require human review; do not grade arbitrary keywords.
    const review = s.level === 4 && !exact;
    return {
      ...s,
      userAnswer: answers[s.n] || "",
      status: exact
        ? ("correct" as const)
        : review
          ? ("review" as const)
          : ("incorrect" as const),
    };
  });
  return {
    results,
    correct: results.filter((r) => r.status === "correct").length,
    review: results.filter((r) => r.status === "review").length,
    total: 25,
  };
}
export type Grade39 = ReturnType<typeof gradeTest39>;
