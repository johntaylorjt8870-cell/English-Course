import { sourceSection36 } from "./ledger36";

export type TestQuestionType36 = "multiple-choice" | "fill" | "repair" | "explain" | "open";
export type TestQuestion36 = {
  n: number;
  type: TestQuestionType36;
  promptLines: string[];
  promptUnitIndexes: number[];
  options?: { label: string; text: string; sourceUnitIndex: number }[];
};
export type TestLevel36 = {
  id: string;
  title: string;
  titleUnitIndex: number;
  instruction?: string;
  instructionUnitIndex?: number;
  questions: TestQuestion36[];
};

const testSource = sourceSection36("s22");
if (!testSource) throw new Error("Lesson 36 formal test source section is missing.");
const testUnits = testSource.units;
let sourceCursor36 = 0;
function sourceUnit36(text: string): number {
  const index = testUnits.indexOf(text, sourceCursor36);
  if (index < 0) throw new Error(`Lesson 36 test source unit is missing or out of order: ${text}`);
  sourceCursor36 = index + 1;
  return index;
}

export const TEST_INTRO_36 = [testUnits[0], testUnits[1]].map((text) => ({ text, sourceUnitIndex: sourceUnit36(text) }));

type RawLevel36 = {
  id: string;
  title: string;
  questions: { n: number; type: TestQuestionType36; promptLines: string[]; options?: string[] }[];
};
const rawLevels: RawLevel36[] = [
  {
    id: "level-1",
    title: "المستوى الأول: اختيار الصيغة",
    questions: [
      { n: 1, type: "multiple-choice", promptLines: ["① A: I'm thirsty.", "B: I ______ get you some water."], options: ["A. will", "B. am going to"] },
      { n: 2, type: "multiple-choice", promptLines: ["② We have already bought the tickets. We ______ visit the museum on Friday."], options: ["A. will", "B. are going to"] },
      { n: 3, type: "multiple-choice", promptLines: ["③ Look at those clouds! It ______ rain."], options: ["A. will", "B. is going to"] },
      { n: 4, type: "multiple-choice", promptLines: ["④ I promise I ______ forget your birthday."], options: ["A. won't", "B. am not going to"] },
      { n: 5, type: "multiple-choice", promptLines: ["⑤ I think technology ______ change education."], options: ["A. will", "B. is going to"] },
    ],
  },
  {
    id: "level-2",
    title: "المستوى الثاني: أكمل الجمل",
    questions: [
      { n: 6, type: "fill", promptLines: ["⑥ We decided last week. We ______ (build) a small greenhouse."] },
      { n: 7, type: "fill", promptLines: ["⑦ A: The phone is ringing!", "B: I ______ (answer) it."] },
      { n: 8, type: "fill", promptLines: ["⑧ Look! That cyclist ______ (hit) the barrier!"] },
      { n: 9, type: "fill", promptLines: ["⑨ I promise I ______ (return) your book tomorrow."] },
      { n: 10, type: "fill", promptLines: ["⑩ I believe our team ______ (perform) well."] },
    ],
  },
  {
    id: "level-3",
    title: "المستوى الثالث: تصحيح الأخطاء",
    questions: [
      { n: 11, type: "repair", promptLines: ["⑪ She will going to travel."] },
      { n: 12, type: "repair", promptLines: ["⑫ They are going to studied tonight."] },
      { n: 13, type: "repair", promptLines: ["⑬ Does he going to join us?"] },
      { n: 14, type: "repair", promptLines: ["⑭ I won't to forget."] },
      { n: 15, type: "repair", promptLines: ["⑮ Will she going to help?"] },
    ],
  },
  {
    id: "level-4",
    title: "المستوى الرابع: فهم المعنى",
    questions: [
      { n: 16, type: "explain", promptLines: ["⑯ ما الفرق بين:", "I'll buy a new laptop.", "I'm going to buy a new laptop."] },
      { n: 17, type: "explain", promptLines: ["⑰ لماذا تكون going to طبيعية جدًا في الجملة التالية؟", "Look! The child is going to fall!"] },
      { n: 18, type: "explain", promptLines: ["⑱ هل الجملتان صحيحتان؟", "I think she will enjoy the trip.", "I think she's going to enjoy the trip."] },
      { n: 19, type: "explain", promptLines: ["⑲ لماذا نستخدم will بصورة طبيعية في الوعود؟"] },
      { n: 20, type: "explain", promptLines: ["⑳ هل وجود tomorrow يعني أننا يجب أن نستخدم will دائمًا؟ فسّر."] },
    ],
  },
  {
    id: "level-5",
    title: "المستوى الخامس: Final IQ200 Boss",
    questions: [
      { n: 21, type: "open", promptLines: ["㉑ صديقك يحتاج إلى المساعدة، فتقرر الآن مساعدته."] },
      { n: 22, type: "open", promptLines: ["㉒ قررت منذ أسبوع البدء بدورة لتعلم التصميم الشهر القادم."] },
      { n: 23, type: "open", promptLines: ["㉓ ترى غيومًا سوداء ورياحًا قوية، وتتوقع هطول المطر."] },
      { n: 24, type: "open", promptLines: ["㉔ تريد أن تعد صديقك بأنك لن تنسى إحضار كتابه."] },
      { n: 25, type: "open", promptLines: ["㉕ تريد التعبير عن اعتقادك بأن الروبوتات ستصبح أكثر انتشارًا في المستقبل."] },
    ],
  },
];

export const TEST_LEVELS_36: TestLevel36[] = rawLevels.map((level) => {
  const titleUnitIndex = sourceUnit36(level.title);
  const instruction = level.id === "level-5" ? "اكتب جملة مناسبة لكل موقف." : undefined;
  const instructionUnitIndex = instruction ? sourceUnit36(instruction) : undefined;
  const questions: TestQuestion36[] = level.questions.map((question) => {
    const promptUnitIndexes = question.promptLines.map(sourceUnit36);
    const options = question.options?.map((text) => ({ label: text.slice(0, 2), text, sourceUnitIndex: sourceUnit36(text) }));
    return { ...question, promptUnitIndexes, options };
  });
  return { ...level, titleUnitIndex, instruction, instructionUnitIndex, questions };
});

export const TEST_36 = TEST_LEVELS_36.flatMap((level) => level.questions);
export const TEST_COUNT_36 = TEST_36.length;
export const TEST_LEVEL_COUNT_36 = TEST_LEVELS_36.length;

if (sourceCursor36 !== testUnits.length) {
  throw new Error(`Lesson 36 Master Test source mapping left ${testUnits.length - sourceCursor36} unassigned source units.`);
}
