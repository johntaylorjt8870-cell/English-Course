import { sectionLines33 } from "./ledger33";
import { TENSES_33 } from "./design33";

// ============================================================
// أسئلة اختبار الدرس 33 — Present Tenses Master Test (§20)
// النص حرفي من المادة: كل بند يُقرأ من سجل المصدر مباشرة.
// لا توجد هنا أي إجابة أو شرح أو مفتاح — التصحيح في key33.ts
// ولا يُحمَّل إلا عند التسليم أو عبر مساحة المعلم.
// ولا تحمل الحقول أي placeholder يكشف الإجابة: الـ placeholder جزء من DOM الطالب.
// ============================================================

const s20 = sectionLines33("s20");

export const TEST_INTRO_33 = [s20[0], s20[1]];

export type TestField33 = { key: string; label: string; placeholder?: string; rows?: number };
export type TestOption33 = { id: string; text: string };

export type TestQuestion33 = {
  id: string;
  number: number;
  level: number;
  type: "complete" | "correct" | "meaning" | "verdict" | "boss";
  /** أسطر السؤال كما وردت في المادة */
  lines: string[];
  options?: TestOption33[];
  fields: TestField33[];
};

export type TestLevel33 = {
  level: number;
  /** عنوان المستوى كما ورد في المادة */
  title: string;
  context?: string[];
  questions: TestQuestion33[];
};

const blank = (label: string, placeholder?: string, key = "answer", rows?: number): TestField33 => ({ key, label, placeholder, rows });

const TENSE_OPTIONS_33: TestOption33[] = TENSES_33.map((tense) => ({ id: tense.id, text: tense.en }));

// فقرة Mia (المستوى الخامس) — تُقتطع من نص المادة حرفيًا.
const MIA_33 = {
  head: s20[29],
  lines: [s20[30], s20[31], s20[32]],
  questionsHead: s20[33],
};

function miaFragment(start: string, end: string): string {
  const full = MIA_33.lines.join(" ");
  const from = full.indexOf(start);
  const to = full.indexOf(end, from);
  if (from < 0 || to < 0) throw new Error(`Mia fragment not found: ${start}`);
  return full.slice(from, to + end.length);
}

export const TEST_LEVELS_33: TestLevel33[] = [
  {
    level: 1,
    title: s20[2],
    context: ["أكمل الفراغ بالصيغة الصحيحة للفعل بين القوسين."],
    questions: [3, 4, 5, 6, 7].map((lineIndex, i) => ({
      id: `q${i + 1}`,
      number: i + 1,
      level: 1,
      type: "complete" as const,
      lines: [(s20[lineIndex])],
      fields: [blank("إجابتك")],
    })),
  },
  {
    level: 2,
    title: s20[8],
    context: ["صرّف الفعل بين القوسين. في السؤال 7 فراغان: الفعل المساعد ثم صيغة الفعل."],
    questions: [
      { id: "q6", number: 6, level: 2, type: "complete" as const, lines: [(s20[9])], fields: [blank("إجابتك")] },
      {
        id: "q7",
        number: 7,
        level: 2,
        type: "complete" as const,
        lines: [(s20[10])],
        fields: [blank("الفعل المساعد — الفراغ الأول", undefined, "aux"), blank("صيغة الفعل — الفراغ الثاني", undefined, "form")],
      },
      { id: "q8", number: 8, level: 2, type: "complete" as const, lines: [(s20[11])], fields: [blank("إجابتك")] },
      { id: "q9", number: 9, level: 2, type: "complete" as const, lines: [(s20[12])], fields: [blank("إجابتك")] },
      { id: "q10", number: 10, level: 2, type: "complete" as const, lines: [(s20[13])], fields: [blank("إجابتك")] },
    ],
  },
  {
    level: 3,
    title: s20[14],
    context: ["أعد كتابة الجملة كاملة بعد تصحيح الخطأ."],
    questions: [15, 16, 17, 18, 19].map((lineIndex, i) => ({
      id: `q${11 + i}`,
      number: 11 + i,
      level: 3,
      type: "correct" as const,
      lines: [(s20[lineIndex])],
      fields: [blank("الجملة الصحيحة")],
    })),
  },
  {
    level: 4,
    title: s20[20],
    context: ["اختر الزمن المناسب، ثم أجب عن السؤال 20 بحكمٍ وشرحٍ للتركيز."],
    questions: [
      { id: "q16", number: 16, level: 4, type: "meaning" as const, lines: [(s20[21])], options: TENSE_OPTIONS_33, fields: [blank("إجابتك")] },
      { id: "q17", number: 17, level: 4, type: "meaning" as const, lines: [(s20[22])], options: TENSE_OPTIONS_33, fields: [blank("إجابتك")] },
      { id: "q18", number: 18, level: 4, type: "meaning" as const, lines: [(s20[23])], options: TENSE_OPTIONS_33, fields: [blank("إجابتك")] },
      { id: "q19", number: 19, level: 4, type: "meaning" as const, lines: [(s20[24])], options: TENSE_OPTIONS_33, fields: [blank("إجابتك")] },
      {
        id: "q20",
        number: 20,
        level: 4,
        type: "verdict" as const,
        lines: [(s20[25]), s20[26], s20[27]],
        options: [
          { id: "both", text: "نعم، كلتاهما صحيحتان" },
          { id: "first", text: "لا، الأولى فقط صحيحة" },
          { id: "second", text: "لا، الثانية فقط صحيحة" },
        ],
        fields: [
          blank("الحكم على الجملتين", undefined, "verdict"),
          blank("ما الذي تُبرزه الصيغة الأولى؟", undefined, "focusA", 2),
          blank("ما الذي تُبرزه الصيغة الثانية؟", undefined, "focusB", 2),
        ],
      },
    ],
  },
  {
    level: 5,
    title: s20[28],
    context: [MIA_33.head, ...MIA_33.lines, MIA_33.questionsHead],
    questions: [
      {
        id: "q21",
        number: 21,
        level: 5,
        type: "boss" as const,
        lines: [s20[34], miaFragment("She usually", "after school.")],
        fields: [blank("إجابتك")],
      },
      {
        id: "q22",
        number: 22,
        level: 5,
        type: "boss" as const,
        lines: [s20[35], miaFragment("This month, she", "international competition.")],
        fields: [blank("إجابتك")],
      },
      {
        id: "q23",
        number: 23,
        level: 5,
        type: "boss" as const,
        lines: [s20[36], miaFragment("She ______ (win)", "competitions so far,")],
        fields: [blank("إجابتك")],
      },
      {
        id: "q24",
        number: 24,
        level: 5,
        type: "boss" as const,
        lines: [s20[37], miaFragment("and she ______ (train)", "event since July.")],
        fields: [blank("إجابتك")],
      },
      {
        id: "q25",
        number: 25,
        level: 5,
        type: "boss" as const,
        lines: [s20[38], miaFragment("Today, she", "for eight years.")],
        fields: [
          blank("صيغة rehearse", undefined, "rehearse"),
          blank("صيغة know", undefined, "know"),
          blank("تفسير اختلاف الزمنين", undefined, "why", 3),
        ],
      },
    ],
  },
];

/** قائمة الأسئلة الـ25 مسطّحة — الاسم المعتمد في تدقيق تغطية الاختبارات. */
export const TEST_33: TestQuestion33[] = TEST_LEVELS_33.flatMap((level) => level.questions);
export const TEST_QUESTIONS_33 = TEST_33;

export const MIA_PARAGRAPH_33 = MIA_33;

export type TestAnswers33 = Record<string, string>;

export function answerKey33(questionId: string, fieldKey: string) {
  return `${questionId}-${fieldKey}`;
}

export function testComplete33(answers: TestAnswers33): boolean {
  return TEST_QUESTIONS_33.every((question) => question.fields.every((f) => Boolean(answers[answerKey33(question.id, f.key)]?.trim())));
}

export function answeredCount33(answers: TestAnswers33): number {
  return TEST_QUESTIONS_33.filter((question) => question.fields.every((f) => Boolean(answers[answerKey33(question.id, f.key)]?.trim()))).length;
}
