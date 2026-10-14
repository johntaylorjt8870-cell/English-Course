import { sourceSection40 } from "./data";

// ============================================================
// Lesson 40 — بيانات أسئلة الاختبار النهائي الشامل (من نص المصدر §25)
//
// ضمانات العزل الصارم:
//   • كل سطر من أسطر القسم المصدري s25 (65 سطرًا) يُربط هنا مرة واحدة بالضبط وبترتيب المصدر.
//   • لا يحتوي هذا الملف على أي إجابات صحيحة أو مفاتيح تصحيح أو شروح حلول.
//   • تُحفظ الحلول ومفاتيح التصحيح في ملف الحلول المنفصل وتُحمّل بعد التسليم فقط.
// ============================================================

export type TestOption40 = {
  value: "A" | "B" | "C";
  lineIndex: number;
  text: string;
};

export type TestQuestion40 = {
  id: string;
  number: number;
  marker: string;
  level: 1 | 2 | 3 | 4 | 5;
  kind: "mcq" | "fill" | "correct" | "meaning" | "story-blank";
  promptLines: readonly { lineIndex: number; text: string }[];
  options?: readonly TestOption40[];
  placeholder?: string;
  storyVerbHint?: string;
};

export type TestLevelBlock40 = {
  level: 1 | 2 | 3 | 4 | 5;
  titleLine: { lineIndex: number; text: string };
  introLines?: readonly { lineIndex: number; text: string }[];
  questions: readonly TestQuestion40[];
};

const s25 = sourceSection40("s25");
const s25Units = s25.units;
const consumedUnits40 = new Set<number>();

function takeUnit40(expectedText: string): { lineIndex: number; text: string } {
  const index = s25Units.findIndex((u, pos) => u === expectedText && !consumedUnits40.has(pos));
  if (index < 0) {
    throw new Error(`Lesson 40 test unit missing or already consumed: ${expectedText}`);
  }
  consumedUnits40.add(index);
  return { lineIndex: index, text: expectedText };
}

export const TEST_HEADER_LINES_40 = [
  takeUnit40("يتكون الاختبار من 25 سؤالًا موزعة على خمسة مستويات."),
  takeUnit40(
    "التعليمات: حاول حل جميع الأسئلة قبل مراجعة مساحة المعلم. في الأسئلة التي تسمح بأكثر من إجابة، اختر الصيغة الأكثر ملاءمة للسياق وفسّر اختيارك.",
  ),
] as const;

export const TEST_LEVELS_40: readonly TestLevelBlock40[] = [
  {
    level: 1,
    titleLine: takeUnit40("المستوى الأول: اختر الإجابة الصحيحة"),
    questions: [
      {
        id: "q1",
        number: 1,
        marker: "①",
        level: 1,
        kind: "mcq",
        promptLines: [takeUnit40("① A: I'm cold."), takeUnit40("B: I ______ close the window.")],
        options: [
          { value: "A", ...takeUnit40("A. will") },
          { value: "B", ...takeUnit40("B. am going to") },
          { value: "C", ...takeUnit40("C. will have been") },
        ],
      },
      {
        id: "q2",
        number: 2,
        marker: "②",
        level: 1,
        kind: "mcq",
        promptLines: [takeUnit40("② We decided last week. We ______ start a new school magazine.")],
        options: [
          { value: "A", ...takeUnit40("A. will") },
          { value: "B", ...takeUnit40("B. are going to") },
          { value: "C", ...takeUnit40("C. will have") },
        ],
      },
      {
        id: "q3",
        number: 3,
        marker: "③",
        level: 1,
        kind: "mcq",
        promptLines: [takeUnit40("③ At 8:00 tomorrow, I ______ for my exam.")],
        options: [
          { value: "A", ...takeUnit40("A. will be studying") },
          { value: "B", ...takeUnit40("B. will have studied") },
          { value: "C", ...takeUnit40("C. will have been studied") },
        ],
      },
      {
        id: "q4",
        number: 4,
        marker: "④",
        level: 1,
        kind: "mcq",
        promptLines: [takeUnit40("④ By Friday, she ______ the project.")],
        options: [
          { value: "A", ...takeUnit40("A. will be completing") },
          { value: "B", ...takeUnit40("B. will have completed") },
          { value: "C", ...takeUnit40("C. will have been complete") },
        ],
      },
      {
        id: "q5",
        number: 5,
        marker: "⑤",
        level: 1,
        kind: "mcq",
        promptLines: [takeUnit40("⑤ By next year, they ______ here for ten years.")],
        options: [
          { value: "A", ...takeUnit40("A. will have been working") },
          { value: "B", ...takeUnit40("B. will be worked") },
          { value: "C", ...takeUnit40("C. will have working") },
        ],
      },
    ],
  },
  {
    level: 2,
    titleLine: takeUnit40("المستوى الثاني: أكمل الجمل"),
    questions: [
      {
        id: "q6",
        number: 6,
        marker: "⑥",
        level: 2,
        kind: "fill",
        promptLines: [takeUnit40("⑥ I promise I ______ (return) your book tomorrow.")],
        placeholder: "اكتب صيغة الفعل (return)...",
      },
      {
        id: "q7",
        number: 7,
        marker: "⑦",
        level: 2,
        kind: "fill",
        promptLines: [takeUnit40("⑦ Look at those dark clouds! It ______ (rain).")],
        placeholder: "اكتب صيغة الفعل (rain)...",
      },
      {
        id: "q8",
        number: 8,
        marker: "⑧",
        level: 2,
        kind: "fill",
        promptLines: [takeUnit40("⑧ This time next week, we ______ (travel) around Europe.")],
        placeholder: "اكتب صيغة الفعل (travel)...",
      },
      {
        id: "q9",
        number: 9,
        marker: "⑨",
        level: 2,
        kind: "fill",
        promptLines: [takeUnit40("⑨ By 10:00, I ______ (finish) my homework.")],
        placeholder: "اكتب صيغة الفعل (finish)...",
      },
      {
        id: "q10",
        number: 10,
        marker: "⑩",
        level: 2,
        kind: "fill",
        promptLines: [takeUnit40("⑩ By 10:00, I ______ (study) for four hours.")],
        placeholder: "اكتب صيغة الفعل (study)...",
      },
    ],
  },
  {
    level: 3,
    titleLine: takeUnit40("المستوى الثالث: صحح الأخطاء"),
    questions: [
      {
        id: "q11",
        number: 11,
        marker: "⑪",
        level: 3,
        kind: "correct",
        promptLines: [takeUnit40("⑪ She will going to buy a new computer.")],
        placeholder: "اكتب الجملة بعد التصحيح...",
      },
      {
        id: "q12",
        number: 12,
        marker: "⑫",
        level: 3,
        kind: "correct",
        promptLines: [takeUnit40("⑫ They will be play football at 6:00.")],
        placeholder: "اكتب الجملة بعد التصحيح...",
      },
      {
        id: "q13",
        number: 13,
        marker: "⑬",
        level: 3,
        kind: "correct",
        promptLines: [takeUnit40("⑬ He will have wrote the report by Friday.")],
        placeholder: "اكتب الجملة بعد التصحيح...",
      },
      {
        id: "q14",
        number: 14,
        marker: "⑭",
        level: 3,
        kind: "correct",
        promptLines: [takeUnit40("⑭ We will have being working for five hours.")],
        placeholder: "اكتب الجملة بعد التصحيح...",
      },
      {
        id: "q15",
        number: 15,
        marker: "⑮",
        level: 3,
        kind: "correct",
        promptLines: [takeUnit40("⑮ By the time you will arrive, I will have finished.")],
        placeholder: "اكتب الجملة بعد التصحيح...",
      },
    ],
  },
  {
    level: 4,
    titleLine: takeUnit40("المستوى الرابع: فهم المعنى"),
    questions: [
      {
        id: "q16",
        number: 16,
        marker: "⑯",
        level: 4,
        kind: "meaning",
        promptLines: [
          takeUnit40("⑯ ما الفرق بين:"),
          takeUnit40("I will study tomorrow."),
          takeUnit40("I'm going to study tomorrow."),
        ],
        placeholder: "اشرح الفرق في المعنى والتركيز بين الجملتين...",
      },
      {
        id: "q17",
        number: 17,
        marker: "⑰",
        level: 4,
        kind: "meaning",
        promptLines: [
          takeUnit40("⑰ ما الفرق بين:"),
          takeUnit40("At 8:00, I will be working."),
          takeUnit40("By 8:00, I will have finished working."),
        ],
        placeholder: "اشرح الفرق بين النشاط الجاري عند الثامنة والاكتمال بحلول الثامنة...",
      },
      {
        id: "q18",
        number: 18,
        marker: "⑱",
        level: 4,
        kind: "meaning",
        promptLines: [
          takeUnit40("⑱ ما الفرق بين:"),
          takeUnit40("By Friday, I will have written five articles."),
          takeUnit40("By Friday, I will have been writing articles for two weeks."),
        ],
        placeholder: "اشرح الفرق بين التركيز على النتيجة/العدد والتركيز على المدة...",
      },
      {
        id: "q19",
        number: 19,
        marker: "⑲",
        level: 4,
        kind: "meaning",
        promptLines: [takeUnit40("⑲ هل وجود by يعني أننا يجب أن نستخدم Future Perfect دائمًا؟")],
        placeholder: "أجب بـ نعم/لا مع التوضيح أو المثال...",
      },
      {
        id: "q20",
        number: 20,
        marker: "⑳",
        level: 4,
        kind: "meaning",
        promptLines: [takeUnit40("⑳ لماذا لا نستخدم عادةً will بعد when عندما تبدأ جملة زمنية مستقبلية؟")],
        placeholder: "اشرح قاعدة الجملة الزمنية المستقبلية...",
      },
    ],
  },
  {
    level: 5,
    titleLine: takeUnit40("المستوى الخامس: Final IQ200 Boss"),
    introLines: [
      takeUnit40("أكمل القصة باستخدام الصيغة المستقبلية الأنسب."),
      takeUnit40("The Big School Project"),
      takeUnit40("Our school is preparing for a technology exhibition next month."),
    ],
    questions: [
      {
        id: "q21",
        number: 21,
        marker: "㉑",
        level: 5,
        kind: "story-blank",
        storyVerbHint: "build",
        promptLines: [
          takeUnit40("We decided last week that we ______ (build) a smart recycling machine."),
          takeUnit40("Maya notices that one of the sensors isn't working."),
          takeUnit40("Daniel says:"),
        ],
        placeholder: "㉑ صيغة الفعل (build)...",
      },
      {
        id: "q22",
        number: 22,
        marker: "㉒",
        level: 5,
        kind: "story-blank",
        storyVerbHint: "fix",
        promptLines: [takeUnit40("\"Don't worry. I ______ (fix) it.\"")],
        placeholder: "㉒ صيغة الفعل (fix)...",
      },
      {
        id: "q23",
        number: 23,
        marker: "㉓",
        level: 5,
        kind: "story-blank",
        storyVerbHint: "test",
        promptLines: [takeUnit40("At 4:00 tomorrow, the students ______ (test) the machine.")],
        placeholder: "㉓ صيغة الفعل (test)...",
      },
      {
        id: "q24",
        number: 24,
        marker: "㉔",
        level: 5,
        kind: "story-blank",
        storyVerbHint: "complete",
        promptLines: [takeUnit40("By Friday, they ______ (complete) all the experiments.")],
        placeholder: "㉔ صيغة الفعل (complete)...",
      },
      {
        id: "q25",
        number: 25,
        marker: "㉕",
        level: 5,
        kind: "story-blank",
        storyVerbHint: "work",
        promptLines: [
          takeUnit40("By the time the exhibition begins, they ______ (work) on the project for three months."),
          takeUnit40("الأسئلة:"),
          takeUnit40("㉑ build"),
          takeUnit40("㉒ fix"),
          takeUnit40("㉓ test"),
          takeUnit40("㉔ complete"),
          takeUnit40("㉕ work"),
        ],
        placeholder: "㉕ صيغة الفعل (work)...",
      },
    ],
  },
] as const;

export const TEST_QUESTIONS_40: readonly TestQuestion40[] = TEST_LEVELS_40.flatMap((l) => l.questions);
export const TEST_QUESTION_COUNT_40 = TEST_QUESTIONS_40.length;
export const TEST_SOURCE_UNIT_INDEXES_40 = [...consumedUnits40].sort((a, b) => a - b);
export const TEST_SOURCE_UNIT_TOTAL_40 = s25Units.length;
