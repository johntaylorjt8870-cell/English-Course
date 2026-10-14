import { sourceSection38 } from "./ledger38";

export type TestQuestionType38 = "multiple-choice" | "fill" | "repair" | "explain" | "open";
export type TestQuestion38 = {
  n: number;
  type: TestQuestionType38;
  promptLines: string[];
  promptUnitIndexes: number[];
  options?: { label: string; text: string; sourceUnitIndex: number }[];
  marker?: { text: string; sourceUnitIndex: number };
  fieldLabel?: string;
};
export type TestLevel38 = {
  id: string;
  title: string;
  titleUnitIndex: number;
  instruction?: string;
  instructionUnitIndex?: number;
  questions: TestQuestion38[];
  trailing?: { text: string; sourceUnitIndex: number }[];
};

const testSource = sourceSection38("s33");
if (!testSource) throw new Error("Lesson 38 formal test source section is missing.");
const testUnits = testSource.units;

const usedTestUnits38 = new Set<number>();
function sourceUnit38(text: string): number {
  const index = testUnits.indexOf(text);
  if (index < 0) throw new Error(`Lesson 38 test source unit is missing: ${text}`);
  if (usedTestUnits38.has(index)) throw new Error(`Lesson 38 test source unit used twice: ${text}`);
  usedTestUnits38.add(index);
  return index;
}
const line38 = (text: string) => ({ text, sourceUnitIndex: sourceUnit38(text) });

export const TEST_INTRO_38 = [line38(testUnits[0]), line38(testUnits[1])];

type RawQuestion38 = {
  n: number;
  type: TestQuestionType38;
  promptLines: string[];
  options?: string[];
  marker?: string;
  fieldLabel?: string;
};
type RawLevel38 = {
  id: string;
  title: string;
  instruction?: string;
  questions: RawQuestion38[];
  trailing?: string[];
};

const rawLevels38: RawLevel38[] = [
  {
    id: "level-1",
    title: "المستوى الأول: اختر الإجابة الصحيحة",
    questions: [
      { n: 1, type: "multiple-choice", promptLines: ["① By tomorrow, I will ______ finished."], options: ["A. has", "B. have", "C. having"] },
      { n: 2, type: "multiple-choice", promptLines: ["② She will have ______ the report by Friday."], options: ["A. write", "B. wrote", "C. written"] },
      { n: 3, type: "multiple-choice", promptLines: ["③ ______ they have arrived by noon?"], options: ["A. Do", "B. Are", "C. Will"] },
      { n: 4, type: "multiple-choice", promptLines: ["④ He won't have ______ the work by Monday."], options: ["A. complete", "B. completed", "C. completing"] },
      { n: 5, type: "multiple-choice", promptLines: ["⑤ By the end of the year, we will have ______ ten lessons."], options: ["A. learn", "B. learning", "C. learned"] },
    ],
  },
  {
    id: "level-2",
    title: "المستوى الثاني: أكمل الجمل",
    questions: [
      { n: 6, type: "fill", promptLines: ["⑥ By 8:00, I ______ (finish) my homework."] },
      { n: 7, type: "fill", promptLines: ["⑦ By next summer, she ______ (save) enough money."] },
      { n: 8, type: "fill", promptLines: ["⑧ They ______ (not / complete) the bridge by Friday."] },
      { n: 9, type: "fill", promptLines: ["⑨ ______ he ______ (arrive) by noon?"] },
      { n: 10, type: "fill", promptLines: ["⑩ By the time the lesson starts, we ______ (prepare) our notebooks."] },
    ],
  },
  {
    id: "level-3",
    title: "المستوى الثالث: صحح الأخطاء",
    questions: [
      { n: 11, type: "repair", promptLines: ["⑪ I will have finish the project."] },
      { n: 12, type: "repair", promptLines: ["⑫ She will has written the report."] },
      { n: 13, type: "repair", promptLines: ["⑬ They won't have went home."] },
      { n: 14, type: "repair", promptLines: ["⑭ Will he has arrived by Friday?"] },
      { n: 15, type: "repair", promptLines: ["⑮ By the time you will arrive, I will have finished."] },
    ],
  },
  {
    id: "level-4",
    title: "المستوى الرابع: فهم المعنى",
    questions: [
      {
        n: 16,
        type: "explain",
        promptLines: ["⑯ ما الفرق بين:", "I will finish the report tomorrow.", "I will have finished the report by tomorrow evening."],
      },
      {
        n: 17,
        type: "explain",
        promptLines: ["⑰ ما الفرق بين:", "At 8:00, I will be studying.", "By 8:00, I will have finished studying."],
      },
      { n: 18, type: "explain", promptLines: ["⑱ هل by تعني أن الحدث يجب أن ينتهي في اللحظة المحددة تمامًا؟"] },
      { n: 19, type: "open", promptLines: ["⑲ هل يمكن استخدام Future Simple مع by؟ أعطِ مثالًا."] },
      { n: 20, type: "explain", promptLines: ["⑳ لماذا نستخدم Present Simple بعد by the time في الجملة الزمنية المستقبلية؟"] },
    ],
  },
  {
    id: "level-5",
    title: "المستوى الخامس: Final IQ200 Boss",
    instruction: "أكمل الفقرة:",
    questions: [
      {
        n: 21,
        type: "fill",
        marker: "㉑ complete",
        promptLines: ["Next Friday is the deadline for our school project.", "By Wednesday, Maya ______ (complete) the main design."],
      },
      { n: 22, type: "fill", marker: "㉒ install", promptLines: ["By Thursday morning, Daniel ______ (install) the sensors."] },
      { n: 23, type: "fill", marker: "㉓ test", promptLines: ["At 3:00 on Thursday, the team ______ (test) the system."] },
      {
        n: 24,
        type: "fill",
        marker: "㉔ finish",
        promptLines: ["By the time the teacher arrives on Friday, we ______ (finish) everything."],
      },
      {
        n: 25,
        type: "fill",
        marker: "㉕ أكمل سؤال المعلم.",
        fieldLabel: "أكمل سؤال المعلم",
        promptLines: ["Our teacher asks:", "\"How many experiments ______ you ______ (complete) by then?\""],
      },
    ],
    trailing: ["الأسئلة:"],
  },
];

export const TEST_LEVELS_38: TestLevel38[] = rawLevels38.map((level) => {
  const titleUnitIndex = sourceUnit38(level.title);
  const instructionUnitIndex = level.instruction ? sourceUnit38(level.instruction) : undefined;
  const questions: TestQuestion38[] = level.questions.map((question) => {
    const promptUnitIndexes = question.promptLines.map((prompt) => sourceUnit38(prompt));
    const options = question.options?.map((option) => ({ label: option.split(".")[0].trim(), text: option, sourceUnitIndex: sourceUnit38(option) }));
    const marker = question.marker ? { text: question.marker, sourceUnitIndex: sourceUnit38(question.marker) } : undefined;
    return {
      n: question.n,
      type: question.type,
      promptLines: question.promptLines,
      promptUnitIndexes,
      options,
      marker,
      fieldLabel: question.fieldLabel,
    };
  });
  return {
    id: level.id,
    title: level.title,
    titleUnitIndex,
    instruction: level.instruction,
    instructionUnitIndex,
    questions,
    trailing: level.trailing?.map((text) => line38(text)),
  };
});

export const TEST_38: TestQuestion38[] = TEST_LEVELS_38.flatMap((level) => level.questions);
export const TEST_COUNT_38 = TEST_38.length;
export const TEST_LEVEL_COUNT_38 = TEST_LEVELS_38.length;

export const TEST_SOURCE_UNIT_INDEXES_38 = [...usedTestUnits38].sort((a, b) => a - b);
export const TEST_SOURCE_UNIT_TOTAL_38 = testUnits.length;
export { testUnits as TEST_SOURCE_UNITS_38 };
