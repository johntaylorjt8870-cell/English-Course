import { sourceSection39 } from "./ledger39";

// ============================================================
// Lesson 39 — الاختبار الرسمي (Master Test) من نص المصدر §35
//
// القاعدة: كل سطر من أسطر §35 يُستهلك مرة واحدة بالضبط هنا (لا تكرار ولا حذف)،
// ولا يحمل هذا الملف أي مفتاح إجابة — الحلول في solutionsData39.ts المنفصل.
// ============================================================

export type TestQuestionType39 = "multiple-choice" | "fill" | "repair" | "explain" | "open";
export type TestQuestion39 = {
  n: number;
  type: TestQuestionType39;
  promptLines: string[];
  promptUnitIndexes: number[];
  options?: { label: string; text: string; sourceUnitIndex: number }[];
  marker?: { text: string; sourceUnitIndex: number };
  fieldLabel?: string;
};
export type TestLevel39 = {
  id: string;
  title: string;
  titleUnitIndex: number;
  instruction?: string;
  instructionUnitIndex?: number;
  questions: TestQuestion39[];
  trailing?: { text: string; sourceUnitIndex: number }[];
};

const testSource = sourceSection39("s35");
if (!testSource) throw new Error("Lesson 39 formal test source section is missing.");
const testUnits = testSource.units;

const usedTestUnits39 = new Set<number>();
/**
 * يخصص سطرًا مصدريًا واحدًا لكل ظهور. نص §35 يعيد بعض الأسطر حرفيًا
 * (خيارات Q1 وQ4 متطابقة: A. be · B. been · C. being)، ولذلك يُؤخذ أول
 * ظهور غير مستهلك بدل أول تطابق — فيبقى التتبّع واحدًا لواحد وبترتيب المصدر.
 */
function sourceUnit39(text: string): number {
  const index = testUnits.findIndex((unit, position) => unit === text && !usedTestUnits39.has(position));
  if (index < 0) throw new Error(`Lesson 39 test source unit is missing or already consumed: ${text}`);
  usedTestUnits39.add(index);
  return index;
}
const line39 = (text: string) => ({ text, sourceUnitIndex: sourceUnit39(text) });

export const TEST_INTRO_39 = [line39(testUnits[0]), line39(testUnits[1])];

type RawQuestion39 = {
  n: number;
  type: TestQuestionType39;
  promptLines: string[];
  options?: string[];
  marker?: string;
  fieldLabel?: string;
};
type RawLevel39 = {
  id: string;
  title: string;
  instruction?: string;
  questions: RawQuestion39[];
  trailing?: string[];
};

const rawLevels39: RawLevel39[] = [
  {
    id: "level-1",
    title: "المستوى الأول: اختر الإجابة الصحيحة",
    questions: [
      { n: 1, type: "multiple-choice", promptLines: ["① By 8:00, I will have ______ studying for three hours."], options: ["A. be", "B. been", "C. being"] },
      { n: 2, type: "multiple-choice", promptLines: ["② She will have been ______ for five hours by noon."], options: ["A. work", "B. worked", "C. working"] },
      { n: 3, type: "multiple-choice", promptLines: ["③ ______ they have been travelling for ten hours by midnight?"], options: ["A. Do", "B. Are", "C. Will"] },
      { n: 4, type: "multiple-choice", promptLines: ["④ He won't have been ______ for long."], options: ["A. wait", "B. waited", "C. waiting"] },
      { n: 5, type: "multiple-choice", promptLines: ["⑤ By next year, we will have been ______ English for two years."], options: ["A. learn", "B. learning", "C. learned"] },
    ],
  },
  {
    id: "level-2",
    title: "المستوى الثاني: أكمل الجمل",
    questions: [
      { n: 6, type: "fill", promptLines: ["⑥ By 9:00, I ______ (study) for four hours."] },
      { n: 7, type: "fill", promptLines: ["⑦ By next June, she ______ (work) here for five years."] },
      { n: 8, type: "fill", promptLines: ["⑧ They ______ (not / travel) for long when we meet them."] },
      { n: 9, type: "fill", promptLines: ["⑨ ______ he ______ (wait) for an hour by noon?"] },
      { n: 10, type: "fill", promptLines: ["⑩ By the time the teacher arrives, we ______ (prepare) for the exam for two hours."] },
    ],
  },
  {
    id: "level-3",
    title: "المستوى الثالث: صحح الأخطاء",
    questions: [
      { n: 11, type: "repair", promptLines: ["⑪ I will have being studying for three hours."] },
      { n: 12, type: "repair", promptLines: ["⑫ She will has been working here for five years."] },
      { n: 13, type: "repair", promptLines: ["⑬ They won't have been travel for long."] },
      { n: 14, type: "repair", promptLines: ["⑭ Will he have be waiting for an hour?"] },
      { n: 15, type: "repair", promptLines: ["⑮ By the time you will arrive, I will have been studying."] },
    ],
  },
  {
    id: "level-4",
    title: "المستوى الرابع: فهم المعنى",
    questions: [
      {
        n: 16,
        type: "explain",
        promptLines: ["⑯ ما الفرق بين:", "I will have finished the report by 8:00.", "I will have been working on the report for three hours by 8:00."],
      },
      { n: 17, type: "explain", promptLines: ["⑰ هل Future Perfect Continuous يعني بالضرورة أن النشاط سيستمر بعد النقطة المستقبلية؟"] },
      { n: 18, type: "open", promptLines: ["⑱ هل يمكن استخدام Future Perfect مع for؟ أعطِ مثالًا."], fieldLabel: "اكتب جوابك ومثالك" },
      { n: 19, type: "explain", promptLines: ["⑲ لماذا نستخدم Present Simple بعد by the time في الجملة الزمنية المستقبلية؟"] },
      { n: 20, type: "explain", promptLines: ["⑳ لماذا لا نستخدم عادةً Future Perfect Continuous مع know عندما تعني المعرفة؟"] },
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
        marker: "㉑ work",
        promptLines: [
          "Next month, our school will celebrate the anniversary of its science club.",
          "By then, the students ______ (work) on their projects for six months.",
        ],
      },
      { n: 22, type: "fill", marker: "㉒ complete", promptLines: ["Maya ______ (complete) three experiments by the end of the month."] },
      { n: 23, type: "fill", marker: "㉓ present", promptLines: ["At 10:00 on the celebration day, Daniel ______ (present) his new invention."] },
      {
        n: 24,
        type: "fill",
        marker: "㉔ prepare",
        promptLines: ["By the time the visitors arrive, the teachers ______ (prepare) the exhibition for several hours."],
      },
      {
        n: 25,
        type: "fill",
        marker: "㉕ أكمل سؤال المدير.",
        fieldLabel: "أكمل سؤال المدير",
        promptLines: ["The principal asks:", "\"How long ______ you ______ (develop) these projects by next month?\""],
      },
    ],
    trailing: ["الأسئلة:"],
  },
];

export const TEST_LEVELS_39: TestLevel39[] = rawLevels39.map((level) => {
  const titleUnitIndex = sourceUnit39(level.title);
  const instructionUnitIndex = level.instruction ? sourceUnit39(level.instruction) : undefined;
  const questions: TestQuestion39[] = level.questions.map((question) => {
    const promptUnitIndexes = question.promptLines.map((prompt) => sourceUnit39(prompt));
    const options = question.options?.map((option) => ({
      label: option.split(".")[0].trim(),
      text: option,
      sourceUnitIndex: sourceUnit39(option),
    }));
    const marker = question.marker ? { text: question.marker, sourceUnitIndex: sourceUnit39(question.marker) } : undefined;
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
    trailing: level.trailing?.map((text) => line39(text)),
  };
});

export const TEST_39: TestQuestion39[] = TEST_LEVELS_39.flatMap((level) => level.questions);
export const TEST_COUNT_39 = TEST_39.length;
export const TEST_LEVEL_COUNT_39 = TEST_LEVELS_39.length;

export const TEST_SOURCE_UNIT_INDEXES_39 = [...usedTestUnits39].sort((a, b) => a - b);
export const TEST_SOURCE_UNIT_TOTAL_39 = testUnits.length;
export { testUnits as TEST_SOURCE_UNITS_39 };
