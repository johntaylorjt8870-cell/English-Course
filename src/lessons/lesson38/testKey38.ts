import { TEST_SOLUTIONS_38 } from "./solutionsData38";

/* ============================================================
   مفتاح التصحيح — يُحمَّل ديناميكيًا بعد إرسال الاختبار فقط.
   لا تستورده واجهة الطالب في المسار الأولي، ولا تعرضه قبل التسليم.
   ============================================================ */

export type GradeResult38 = {
  n: number;
  isCorrect: boolean;
  statusLabel: string;
  modelAnswer: string;
  acceptedSummary: string;
  explanation: string;
  userAnswer: string;
};

export type TestGrade38 = {
  total: number;
  correctCount: number;
  percentage: number;
  results: Record<number, GradeResult38>;
};

/** إجابات مقبولة للأسئلة المغلقة، مع الحفاظ على صيغة المصدر أولًا. */
const ACCEPTED_38: Record<number, string[]> = {
  1: ["B", "have", "B. have"],
  2: ["C", "written", "C. written"],
  3: ["C", "will", "C. Will"],
  4: ["B", "completed", "B. completed"],
  5: ["C", "learned", "C. learned"],
  6: ["will have finished", "i will have finished", "i will have finished my homework"],
  7: ["will have saved", "she will have saved", "she will have saved enough money"],
  8: [
    "won't have completed",
    "will not have completed",
    "they won't have completed",
    "they will not have completed",
    "they won't have completed the bridge",
  ],
  9: ["will he have arrived", "will he have arrived by noon"],
  10: ["will have prepared", "we will have prepared", "we will have prepared our notebooks"],
  11: [
    "i will have finished the project",
    "i will have finished the project.",
    "i'll have finished the project",
    "i will have finished",
  ],
  12: ["she will have written the report", "she'll have written the report", "she will have written"],
  13: [
    "they won't have gone home",
    "they will not have gone home",
    "they won't have gone home.",
    "they will not have gone home.",
  ],
  14: ["will he have arrived by friday", "will he have arrived by friday?"],
  15: [
    "by the time you arrive, i will have finished",
    "by the time you arrive, i will have finished.",
    "by the time you arrive i will have finished",
  ],
  21: ["will have completed", "maya will have completed", "maya will have completed the main design"],
  22: ["will have installed", "daniel will have installed", "daniel will have installed the sensors"],
  23: ["will be testing", "the team will be testing", "the team will be testing the system"],
  24: ["will have finished", "we will have finished", "we will have finished everything"],
  25: [
    "how many experiments will you have completed by then",
    "how many experiments will you have completed by then?",
    "how many experiments will you have completed",
  ],
};

function normalize38(value: string) {
  return value
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[.,!?;:]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function acceptedFor38(n: number, normalized: string) {
  const list = (ACCEPTED_38[n] ?? []).map(normalize38);
  if (list.includes(normalized)) return true;
  // اقبل إضافة/حذف علامة استفهام أو "by noon" إذا كانت الصيغة الأساسية مطابقة.
  const withoutTrailing = normalized.replace(/\s+(by (noon|friday|then))$/, "");
  return list.some((candidate) => candidate === withoutTrailing);
}

/** معايير دلالية للأسئلة المفتوحة 16–20؛ تُراجع يدويًا أيضًا. */
function openAnswerMeetsRubric38(n: number, raw: string) {
  const text = raw.toLowerCase();
  if (text.trim().length < 12) return false;
  const has = (...words: string[]) => words.some((word) => text.includes(word));
  switch (n) {
    case 16:
      return (
        has("future simple", "simple", "المستقبل البسيط", "حدث", "سيقع") &&
        has("future perfect", "perfect", "المستقبل التام", "اكتمال", "مكتمل", "بحلول")
      );
    case 17:
      return (
        has("at 8", "at 8:00", "جار", "مستمر", "continuous", "will be studying") &&
        has("by 8", "by 8:00", "اكتمال", "مكتمل", "perfect", "finished")
      );
    case 18:
      return has("لا", "no ", "not ", "ليس") && has("قبل", "بحلول", "لا يتجاوز", "exactly", "before");
    case 19:
      return has("نعم", "yes") && has("by") && has("will finish", "will complete", "will have");
    case 20:
      return has("present simple", "المضارع البسيط", "مضارع") && has("by the time", "زمنية", "مستقبل");
    default:
      return false;
  }
}

export function gradeTest38(answers: Record<number, string>): TestGrade38 {
  const results: Record<number, GradeResult38> = {};
  let correctCount = 0;
  for (const solution of TEST_SOLUTIONS_38) {
    const raw = answers[solution.n] ?? "";
    const normalized = normalize38(raw);
    const isOpen = solution.judgment === "open-model";
    const isCorrect = isOpen ? openAnswerMeetsRubric38(solution.n, raw) : acceptedFor38(solution.n, normalized);
    if (isCorrect) correctCount += 1;
    results[solution.n] = {
      n: solution.n,
      isCorrect,
      statusLabel: isCorrect
        ? "صحيح"
        : isOpen
          ? "يحتاج مراجعة — قارن بنموذج الإجابة"
          : "يحتاج تصحيحًا",
      modelAnswer: solution.answer,
      acceptedSummary: isOpen
        ? "سؤال مفتوح: تُقبل أي صياغة تحقق معيار المعنى. راجع النموذج والبدائل."
        : (solution.alternatives?.length ? "بدائل مقبولة: " + solution.alternatives.join(" · ") : "الجواب أعلاه هو الصيغة المطلوبة."),
      explanation: solution.explanation,
      userAnswer: raw,
    };
  }
  return {
    total: TEST_SOLUTIONS_38.length,
    correctCount,
    percentage: Math.round((correctCount / TEST_SOLUTIONS_38.length) * 100),
    results,
  };
}

/** للاستخدام في الاختبارات فقط: يثبت أن المفتاح غير مستورد في مسار الطالب الأولي. */
export const TEST_KEY_MARKER_38 = "platform-authored-teacher-addition";
