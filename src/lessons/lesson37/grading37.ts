import type { TestQuestion37 } from "./testData37";
import { TEST_SOLUTIONS_37 } from "./solutionsData37";

export type GradeRecord37 = { n: number; correct: boolean; answer: string; feedback: string };
export type TestGrade37 = { score: number; total: number; records: GradeRecord37[] };

const normalize37 = (value: string) => value
  .toLowerCase()
  .replace(/[’‘]/g, "'")
  .replace(/[^a-z0-9\u0600-\u06ff]+/g, " ")
  .replace(/\s+/g, " ")
  .trim();
const includesAny = (text: string, terms: string[]) => terms.some((term) => text.includes(normalize37(term)));
const hasFutureContinuous = (text: string) => /\b(?:will|\w+'ll)\s+be\s+\w+ing\b/.test(text) || /\b(?:س|سوف)\w+\s+.*(?:يكون|تكون|سنكون|سيكون)/.test(text);
const hasExample = (text: string) => /\b(?:will|\w+'ll)\s+be\s+\w+ing\b/.test(text);

function accepts37(question: TestQuestion37, raw: string): boolean {
  const answer = normalize37(raw);
  if (!answer) return false;
  if (question.type === "multiple-choice") {
    const expectedLetter = TEST_SOLUTIONS_37[question.n - 1].answer.slice(0, 1).toLowerCase();
    return answer === expectedLetter || answer.startsWith(`${expectedLetter} `) || answer.includes(` ${expectedLetter} `);
  }
  const exact = (options: string[]) => options.some((option) => answer === normalize37(option));
  switch (question.n) {
    case 6: return exact(["will be sleeping", "they will be sleeping", "they'll be sleeping"]);
    case 7: return exact(["will be taking", "i will be taking", "i'll be taking"]);
    case 8: return exact(["will be preparing", "we will be preparing", "we'll be preparing"]);
    case 9: return ["won't be working", "will not be working", "she won't be working", "she will not be working"].some((variant) => answer.includes(normalize37(variant)));
    case 10: return exact(["will they be waiting", "will they be waiting for us at the station"]);
    case 11: return exact(["i will be studying tomorrow morning", "i will be studying in the morning tomorrow"]);
    case 12: return exact(["she will be preparing lunch", "she will prepare lunch"]);
    case 13: return exact(["they won't be playing football", "they will not be playing football"]);
    case 14: return exact(["when he arrives i will be sleeping", "when he arrives i will sleep"]);
    case 15: return exact(["what will you be doing at 8 00 tomorrow", "what will you be doing at 8 tomorrow"]);
    case 16: {
      const eventFocus = includesAny(answer, ["حدث", "event", "action", "general", "مستقبلي", "will study"]);
      const ongoingFocus = includesAny(answer, ["جاري", "مستمر", "ongoing", "in progress", "at 8", "عند الثامنة", "will be studying"]);
      return eventFocus && ongoingFocus;
    }
    case 17:
      return (includesAny(answer, ["نشاط", "activity", "ongoing", "in progress", "جار", "مستمر", "نصف", "describe"]) &&
        includesAny(answer, ["مستقبل", "future", "this time", "هذا الوقت", "flying", "السفر"])) ||
        (answer.includes("will be flying") && includesAny(answer, ["future", "مستقبل", "نشاط", "activity", "journey", "رحلة"]));
    case 18: {
      const saysNo = /\bno\b/.test(answer) || includesAny(answer, ["لا", "كلا"]);
      const presentSimple = includesAny(answer, ["present simple", "المضارع البسيط", "فعل مجرد", "arrive"]);
      return saysNo && presentSimple;
    }
    case 19:
      return (includesAny(answer, ["yes", "نعم", "يمكن"]) && hasExample(answer) &&
        includesAny(answer, ["weekend", "all afternoon", "tomorrow", "week", "طوال", "غد", "الأسبوع", "العمال", "سأكون", "will be"]));
    case 20: {
      const simpleFocus = includesAny(answer, ["قرار", "استعداد", "طلب", "decision", "readiness", "asking for a decision"]);
      const continuousFocus = includesAny(answer, ["برنامج", "خطة", "متوقع", "availability", "available", "schedule", "routine", "نشاط متوقع"]);
      return simpleFocus && continuousFocus;
    }
    case 21: return exact(["will be attending", "she will be attending", "she'll be attending"]);
    case 22: return exact(["will be working", "she will be working", "she'll be working"]);
    case 23: return exact(["will be preparing", "she will be preparing", "she'll be preparing"]);
    case 24: return exact(["will be reviewing", "she will be reviewing", "she'll be reviewing"]);
    case 25:
      return exact(["what will you be doing at 8 00", "what will you be doing at 8", "what will you do at 8 00", "what will you do at 8"]);
    default: return false;
  }
}

export function gradeLesson37(questions: TestQuestion37[], answers: Record<number, string>): TestGrade37 {
  const records = questions.map((question) => {
    const solution = TEST_SOLUTIONS_37[question.n - 1];
    const raw = answers[question.n] ?? "";
    return {
      n: question.n,
      correct: accepts37(question, raw),
      answer: solution.answer,
      feedback: solution.explanation,
    };
  });
  return { score: records.filter((record) => record.correct).length, total: records.length, records };
}
