import { SOURCE_SECTIONS_35 } from "./ledger35";

const testSource = SOURCE_SECTIONS_35.find((section) => section.id === "s34")!;
const unit = (exact: string) => {
  const index = testSource.units.indexOf(exact);
  if (index < 0) throw new Error(`Lesson 35 test source line is missing: ${exact}`);
  return index;
};
const after = (exact: string, count: number) => testSource.units.slice(unit(exact) + 1, unit(exact) + 1 + count);
const questionLines = (...lines: string[]) => lines;

export type TestQuestion35 =
  | {
      n: number;
      type: "single";
      promptLines: string[];
      options: string[];
      answer: number;
      correctText: string;
      why: string;
      sourceSupplied: true;
      sourceUnits: number[];
    }
  | {
      n: number;
      type: "typed" | "repair";
      promptLines: string[];
      accept: string[];
      answer: string;
      why: string;
      sourceSupplied: true;
      sourceUnits: number[];
    }
  | {
      n: number;
      type: "write";
      promptLines: string[];
      modelAnswers: string[];
      answer: string;
      why: string;
      sourceSupplied: true;
      sourceUnits: number[];
    };

export type TestLevel35 = {
  id: string;
  title: string;
  range: string;
  instruction?: string;
  titleSourceUnit: number;
  instructionSourceUnit?: number;
  questions: TestQuestion35[];
};

const single = (
  n: number,
  prompt: string,
  options: string[],
  answer: number,
  correctText: string,
  why: string,
): TestQuestion35 => ({
  n,
  type: "single",
  promptLines: questionLines(prompt),
  options,
  answer,
  correctText,
  why,
  sourceSupplied: true,
  sourceUnits: [unit(prompt), ...options.map((_, index) => unit(prompt) + 1 + index)],
});
const typed = (
  n: number,
  promptLines: string[],
  answer: string,
  accept: string[],
  why: string,
  type: "typed" | "repair" = "typed",
): TestQuestion35 => ({ n, type, promptLines, answer, accept, why, sourceSupplied: true, sourceUnits: promptLines.map(unit) });
const write = (n: number, prompt: string, modelAnswers: string[], why: string): TestQuestion35 => ({
  n,
  type: "write",
  promptLines: questionLines(prompt),
  modelAnswers,
  answer: modelAnswers[0],
  why,
  sourceSupplied: true,
  sourceUnits: [unit(prompt)],
});

export const TEST_LEVELS_35: TestLevel35[] = [
  {
    id: "level-1",
    title: testSource.units[2],
    titleSourceUnit: 2,
    range: "الأسئلة 1–5",
    questions: [
      single(1, testSource.units[3], after(testSource.units[3], 3), 1, "B. is", "الفاعل She مفرد، لذلك نستخدم is.") ,
      single(2, testSource.units[7], after(testSource.units[7], 3), 2, "C. start", "بعد going to يأتي الفعل الأساسي V1: start.") ,
      single(3, testSource.units[11], after(testSource.units[11], 3), 1, "B. Are", "سؤال BE GOING TO يبدأ بـ Am/Is/Are قبل الفاعل: Are you going to…?") ,
      single(4, testSource.units[15], after(testSource.units[15], 3), 0, "A. accept", "بعد going to نستخدم V1: accept.") ,
      single(5, testSource.units[19], after(testSource.units[19], 3), 1, "B. be", "عند وصف حالة مستقبلية نستخدم going to + be، لأن be هي V1.") ,
    ],
  },
  {
    id: "level-2",
    title: testSource.units[23],
    titleSourceUnit: 23,
    range: "الأسئلة 6–10",
    questions: [
      typed(6, [testSource.units[24]], "are going to visit", ["are going to visit"], "We planned the visit yesterday, so this is a prior plan: are going to + visit.") ,
      typed(7, [testSource.units[25]], "is going to fall", ["is going to fall"], "The cyclist is visible evidence for a likely future event: is going to + fall.") ,
      typed(8, [testSource.units[26]], "am not going to buy", ["am not going to buy", "'m not going to buy", "’m not going to buy"], "The speaker has already decided, so use the negative of a prior intention: am not going to buy.") ,
      typed(9, [testSource.units[27]], "Is she going to take", ["Is she going to take"], "Move is before she for a Yes/No question; take stays in V1.") ,
      typed(10, [testSource.units[28]], "are going to organize", ["are going to organize"], "Preparations have already started, so this is a prior plan: are going to organize.") ,
    ],
  },
  {
    id: "level-3",
    title: testSource.units[29],
    titleSourceUnit: 29,
    range: "الأسئلة 11–15",
    questions: [
      typed(11, [testSource.units[30], testSource.units[31]], "will", ["will", "'ll"], "The ringing phone is a new event; the speaker decides now: will.") ,
      typed(12, [testSource.units[32]], "is going to", ["is going to"], "The visible sky is evidence for a prediction: is going to.") ,
      typed(13, [testSource.units[33]], "will", ["will", "'ll"], "A promise is a typical use of will.") ,
      typed(14, [testSource.units[34]], "are going to", ["are going to"], "The tickets are already booked, so the trip is a prior plan: are going to.") ,
      typed(15, [testSource.units[35]], "will", ["will", "'ll"], "I think introduces an opinion or general prediction, typically expressed with will.") ,
    ],
  },
  {
    id: "level-4",
    title: testSource.units[36],
    titleSourceUnit: 36,
    range: "الأسئلة 16–20",
    instruction: testSource.units[37],
    instructionSourceUnit: 37,
    questions: [
      typed(16, [testSource.units[38]], "She is going to study medicine.", ["She is going to study medicine"], "She takes is; the main verb after going to remains in V1.", "repair"),
      typed(17, [testSource.units[39]], "They are going to build a house.", ["They are going to build a house"], "They takes are; the main verb build remains in V1.", "repair"),
      typed(18, [testSource.units[40]], "Is he going to buy a new laptop?", ["Is he going to buy a new laptop"], "Move is before he, then use the base verb buy.", "repair"),
      typed(19, [testSource.units[41]], "I am going to be a scientist.", ["I am going to be a scientist"], "After going to, use the base form be—not am.", "repair"),
      typed(20, [testSource.units[42]], "Is she going to travel tomorrow?", ["Is she going to travel tomorrow"], "Do/does is not used; move is before she to form the question.", "repair"),
    ],
  },
  {
    id: "level-5",
    title: testSource.units[43],
    titleSourceUnit: 43,
    range: "الأسئلة 21–25",
    instruction: testSource.units[44],
    instructionSourceUnit: 44,
    questions: [
      write(21, testSource.units[45], ["I am going to start learning German next month.", "I'm going to start learning German next month."], "This was a decision made a week earlier, so use BE GOING TO for the prior plan. The same meaning can be expressed with the full or contracted form."),
      write(22, testSource.units[46], ["The child is going to fall.", "That child is going to fall!", "He's going to fall!"], "A child approaching a high edge is present evidence for a prediction, so BE GOING TO is a suitable typical choice. Other accurate descriptions of the child are possible."),
      write(23, testSource.units[47], ["I'll help you.", "I will help you."], "The decision to help is made now in response to the situation, so WILL is the typical choice."),
      write(24, testSource.units[48], ["What are you going to do during the summer holiday?", "What are you going to do during the summer vacation?"], "This asks about the listener’s prior intention or plan; keep the required opening What are you going to…?"),
      write(25, testSource.units[49], ["I think education will change a lot in the future.", "I think education will change significantly in the future."], "This is framed as a belief or general prediction, so WILL is a suitable typical choice."),
    ],
  },
];

export const TEST_35: TestQuestion35[] = TEST_LEVELS_35.flatMap((level) => level.questions);
export const TEST_35_COUNT = TEST_35.length;

export function normalizeAnswer35(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.,!?؟:;()]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ");
}

export function isAnswered35(question: TestQuestion35, value: unknown): boolean {
  if (question.type === "single") return typeof value === "number" && value >= 0;
  return typeof value === "string" && value.trim().length > 0;
}

export function gradeObjective35(question: TestQuestion35, value: unknown): boolean | null {
  if (question.type === "write") return null;
  if (question.type === "single") return value === question.answer;
  if (typeof value !== "string") return false;
  const normalized = normalizeAnswer35(value);
  return question.accept.some((acceptable) => normalizeAnswer35(acceptable) === normalized);
}

export function answerText35(question: TestQuestion35): string {
  return question.type === "single" ? question.correctText : question.answer;
}

export type TestSolution35 = {
  n: number;
  prompt: string;
  answer: string;
  explanation: string;
  sourceStatus: "teacher-authored";
};
export const TEST_SOLUTIONS_35: TestSolution35[] = TEST_35.map((question) => ({
  n: question.n,
  prompt: question.promptLines.join(" "),
  answer: question.type === "write" ? question.modelAnswers.join(" / ") : answerText35(question),
  explanation: question.why,
  sourceStatus: "teacher-authored",
}));

export const TEST_LEVEL_COUNT_35 = TEST_LEVELS_35.length;
