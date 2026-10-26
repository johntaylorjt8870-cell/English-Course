import { sourceSection37 } from "./ledger37";

export type TestQuestionType37 = "multiple-choice" | "fill" | "repair" | "explain" | "open";
export type TestQuestion37 = {
  n: number;
  type: TestQuestionType37;
  promptLines: string[];
  promptUnitIndexes: number[];
  options?: { label: string; text: string; sourceUnitIndex: number }[];
  /** وسم ㉑…㉕ في المستوى الخامس (اسم الفعل المطلوب إكماله) */
  marker?: { text: string; sourceUnitIndex: number };
  /** وسم حقل الإجابة عندما يختلف عن وسم النوع (مثل «أكمل سؤال الصديقة») */
  fieldLabel?: string;
};
export type TestLevel37 = {
  id: string;
  title: string;
  titleUnitIndex: number;
  instruction?: string;
  instructionUnitIndex?: number;
  questions: TestQuestion37[];
  /** سطور تكمل الفقرة تُعرض بعد أسئلة المستوى الخامس كما وردت */
  trailing?: { text: string; sourceUnitIndex: number }[];
};

const testSource = sourceSection37("s34");
if (!testSource) throw new Error("Lesson 37 formal test source section is missing.");
const testUnits = testSource.units;

/**
 * خريطة وحدات §34: كل سطر مصدري يُستهلك مرة واحدة بالضبط.
 * (لا نفرض ترتيب الاستهلاك لأن أسئلة المستوى الخامس تسير مع سطور الفقرة،
 * لكننا نفرض عدم التكرار وتغطية كل الأسطر — يتحقق منها تدقيق الدرس.)
 */
const usedTestUnits37 = new Set<number>();
function sourceUnit37(text: string): number {
  const index = testUnits.indexOf(text);
  if (index < 0) throw new Error(`Lesson 37 test source unit is missing: ${text}`);
  if (usedTestUnits37.has(index)) throw new Error(`Lesson 37 test source unit used twice: ${text}`);
  usedTestUnits37.add(index);
  return index;
}
const line37 = (text: string) => ({ text, sourceUnitIndex: sourceUnit37(text) });

export const TEST_INTRO_37 = [line37(testUnits[0]), line37(testUnits[1])];

type RawQuestion37 = {
  n: number;
  type: TestQuestionType37;
  promptLines: string[];
  options?: string[];
  marker?: string;
  fieldLabel?: string;
};
type RawLevel37 = {
  id: string;
  title: string;
  instruction?: string;
  questions: RawQuestion37[];
  trailing?: string[];
};

const rawLevels37: RawLevel37[] = [
  {
    id: "level-1",
    title: "المستوى الأول: اختر الإجابة الصحيحة",
    questions: [
      { n: 1, type: "multiple-choice", promptLines: ["① At 7:00 tomorrow, I will ______ studying."], options: ["A. am", "B. be", "C. being"] },
      { n: 2, type: "multiple-choice", promptLines: ["② She will be ______ dinner at 6:00."], options: ["A. prepare", "B. prepared", "C. preparing"] },
      { n: 3, type: "multiple-choice", promptLines: ["③ ______ they be waiting for us?"], options: ["A. Do", "B. Are", "C. Will"] },
      { n: 4, type: "multiple-choice", promptLines: ["④ He won't be ______ tomorrow morning."], options: ["A. work", "B. working", "C. worked"] },
      { n: 5, type: "multiple-choice", promptLines: ["⑤ This time next week, we ______ be travelling."], options: ["A. will", "B. are", "C. have"] },
    ],
  },
  {
    id: "level-2",
    title: "المستوى الثاني: أكمل الجمل",
    questions: [
      { n: 6, type: "fill", promptLines: ["⑥ At midnight, the children ______ (sleep)."] },
      { n: 7, type: "fill", promptLines: ["⑦ This time tomorrow, I ______ (take) my exam."] },
      { n: 8, type: "fill", promptLines: ["⑧ When you arrive, we ______ (prepare) dinner."] },
      { n: 9, type: "fill", promptLines: ["⑨ She ______ (not / work) at 5:00 tomorrow."] },
      { n: 10, type: "fill", promptLines: ["⑩ ______ they ______ (wait) for us at the station?"] },
    ],
  },
  {
    id: "level-3",
    title: "المستوى الثالث: صحح الأخطاء",
    questions: [
      { n: 11, type: "repair", promptLines: ["⑪ I will studying tomorrow morning."] },
      { n: 12, type: "repair", promptLines: ["⑫ She will is preparing lunch."] },
      { n: 13, type: "repair", promptLines: ["⑬ They won't be play football."] },
      { n: 14, type: "repair", promptLines: ["⑭ When he will arrive, I will be sleeping."] },
      { n: 15, type: "repair", promptLines: ["⑮ What will you doing at 8:00 tomorrow?"] },
    ],
  },
  {
    id: "level-4",
    title: "المستوى الرابع: فهم المعنى",
    questions: [
      {
        n: 16,
        type: "explain",
        promptLines: ["⑯ ما الفرق بين:", "I will study tomorrow.", "I will be studying at 8:00 tomorrow."],
      },
      {
        n: 17,
        type: "explain",
        promptLines: ["⑰ لماذا نستخدم Future Continuous في:", "This time next week, we will be flying to Paris."],
      },
      {
        n: 18,
        type: "explain",
        promptLines: ["⑱ هل نستخدم will بعد when الزمنية في الجملة التالية؟", "When you arrive, I will be waiting."],
      },
      {
        n: 19,
        type: "open",
        promptLines: ["⑲ هل يمكن استخدام Future Continuous دون ذكر ساعة محددة؟ أعطِ مثالًا."],
      },
      {
        n: 20,
        type: "explain",
        promptLines: ["⑳ ما الفرق بين:", "Will you use the computer tonight?", "Will you be using the computer tonight?"],
      },
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
        marker: "㉑ attend",
        promptLines: ["Tomorrow is going to be a busy day for Maya.", "At 8:00, she ______ (attend) an online English lesson."],
      },
      { n: 22, type: "fill", marker: "㉒ work", promptLines: ["At 10:00, she ______ (work) on her science project."] },
      { n: 23, type: "fill", marker: "㉓ prepare", promptLines: ["When her brother arrives, she ______ (prepare) lunch."] },
      {
        n: 24,
        type: "fill",
        marker: "㉔ review",
        promptLines: ["In the afternoon, she is going to visit her grandmother because they arranged the visit yesterday.", "At 7:00 in the evening, she ______ (review) her notes."],
      },
      {
        n: 25,
        type: "fill",
        marker: "㉕ أكمل سؤال الصديقة.",
        fieldLabel: "أكمل سؤال الصديقة",
        promptLines: ["Her friend asks:", "\"What ______ you ______ (do) at 8:00?\""],
      },
    ],
    trailing: ["Maya replies:", "\"I'll be watching a documentary.\"", "الأسئلة:"],
  },
];

export const TEST_LEVELS_37: TestLevel37[] = rawLevels37.map((level) => {
  const titleUnitIndex = sourceUnit37(level.title);
  const instructionUnitIndex = level.instruction ? sourceUnit37(level.instruction) : undefined;
  const questions: TestQuestion37[] = level.questions.map((question) => {
    const promptUnitIndexes = question.promptLines.map((prompt) => sourceUnit37(prompt));
    const options = question.options?.map((option) => ({ label: option.split(".")[0].trim(), text: option, sourceUnitIndex: sourceUnit37(option) }));
    const marker = question.marker ? { text: question.marker, sourceUnitIndex: sourceUnit37(question.marker) } : undefined;
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
    trailing: level.trailing?.map((text) => line37(text)),
  };
});

export const TEST_37: TestQuestion37[] = TEST_LEVELS_37.flatMap((level) => level.questions);
export const TEST_COUNT_37 = TEST_37.length;
export const TEST_LEVEL_COUNT_37 = TEST_LEVELS_37.length;

/** كل سطر مصدري في §34 مستهلك مرة واحدة — يُتحقق منه في تدقيق الدرس. */
export const TEST_SOURCE_UNIT_INDEXES_37 = [...usedTestUnits37].sort((a, b) => a - b);
export const TEST_SOURCE_UNIT_TOTAL_37 = testUnits.length;
export { testUnits as TEST_SOURCE_UNITS_37 };
