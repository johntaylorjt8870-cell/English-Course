export type TestQuestionType45 = "choice" | "text";
export type TestInputMode45 = "en" | "bilingual";

export function normalizeEn45(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[’‘ʼ`]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type TestQuestion45 = {
  id: string;
  number: number;
  level: 1 | 2 | 3 | 4 | 5;
  type: TestQuestionType45;
  prompt: string;
  hintAr?: string;
  options?: readonly string[];
  inputMode?: TestInputMode45;
};

export type TestLevelMeta45 = {
  level: 1 | 2 | 3 | 4 | 5;
  titleAr: string;
  titleEn: string;
  instructionAr: string;
  badgeTone: "sky" | "violet" | "orange" | "emerald" | "rose";
};

export const TEST_LEVELS_45: readonly TestLevelMeta45[] = [
  {
    level: 1,
    titleAr: "المستوى الأول: اختر الإجابة الصحيحة",
    titleEn: "Level 1 · Multiple Choice",
    instructionAr: "اختر التكملة الصحيحة نحويًا ومعنويًا في كل جملة.",
    badgeTone: "sky",
  },
  {
    level: 2,
    titleAr: "المستوى الثاني: أكمل الجمل بالشكل الصحيح",
    titleEn: "Level 2 · Complete the Sentences",
    instructionAr: "أكمل الفراغ بالصيغة المناسبة وفق الإرشاد بين القوسين (تُقبل تكملة الفراغ أو كتابة الجملة كاملة).",
    badgeTone: "violet",
  },
  {
    level: 3,
    titleAr: "المستوى الثالث: صحّح الأخطاء",
    titleEn: "Level 3 · Correct the Mistakes",
    instructionAr: "أعد كتابة كل جملة إنجليزية كاملةً بعد تصحيح الخطأ النحوي فيها.",
    badgeTone: "orange",
  },
  {
    level: 4,
    titleAr: "المستوى الرابع: افهم المعنى وفسّر الفرق",
    titleEn: "Level 4 · Understand the Meaning",
    instructionAr: "اشرح المعنى أو الفرق باختصار ووضوح (تُقبل الإجابة بالعربية أو بالإنجليزية).",
    badgeTone: "emerald",
  },
  {
    level: 5,
    titleAr: "المستوى الخامس: التحدي الشامل",
    titleEn: "Level 5 · Master Context Challenge",
    instructionAr: "أكمل حوار المراجعة المتكامل بالصيغة الصحيحة وفق الوظيفة المحددة بين القوسين.",
    badgeTone: "rose",
  },
] as const;

export const TEST_QUESTIONS_45: readonly TestQuestion45[] = [
  // المستوى الأول — اختر الإجابة الصحيحة (1–5)
  {
    id: "q1",
    number: 1,
    level: 1,
    type: "choice",
    prompt: "She ___ study harder.",
    options: ["shoulds", "should", "should to"],
  },
  {
    id: "q2",
    number: 2,
    level: 1,
    type: "choice",
    prompt: "You ought ___ respect others.",
    options: ["to", "for", "at"],
  },
  {
    id: "q3",
    number: 3,
    level: 1,
    type: "choice",
    prompt: "___ I call the teacher?",
    options: ["Do should", "Should", "Does"],
  },
  {
    id: "q4",
    number: 4,
    level: 1,
    type: "choice",
    prompt: "He shouldn't ___ so late.",
    options: ["sleeps", "sleeping", "sleep"],
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    type: "choice",
    prompt: "You'd better ___ now.",
    options: ["leave", "to leave", "leaving"],
  },

  // المستوى الثاني — أكمل الجمل بالشكل الصحيح (6–10)
  {
    id: "q6",
    number: 6,
    level: 2,
    type: "text",
    inputMode: "en",
    prompt: "You ___ waste water. (should / not)",
    hintAr: "نفي النصيحة",
  },
  {
    id: "q7",
    number: 7,
    level: 2,
    type: "text",
    inputMode: "en",
    prompt: "She ___ to apologise to her friend. (ought)",
    hintAr: "لاحظ وجود to بعد الفراغ",
  },
  {
    id: "q8",
    number: 8,
    level: 2,
    type: "text",
    inputMode: "en",
    prompt: "We ___ have left earlier yesterday, but we didn't. (should)",
    hintAr: "لاحظ وجود have left بعد الفراغ",
  },
  {
    id: "q9",
    number: 9,
    level: 2,
    type: "text",
    inputMode: "en",
    prompt: "He ___ have eaten so much yesterday. (should / not)",
    hintAr: "فعل وقع في الماضي وكان الأفضل تجنبه",
  },
  {
    id: "q10",
    number: 10,
    level: 2,
    type: "text",
    inputMode: "en",
    prompt: "The package ___ arrive tomorrow. (reasonable expectation)",
    hintAr: "توقع منطقي معقول",
  },

  // المستوى الثالث — صحّح الأخطاء (11–15)
  {
    id: "q11",
    number: 11,
    level: 3,
    type: "text",
    inputMode: "en",
    prompt: "She shoulds study more.",
    hintAr: "أعد كتابة الجملة كاملة بعد التصحيح",
  },
  {
    id: "q12",
    number: 12,
    level: 3,
    type: "text",
    inputMode: "en",
    prompt: "You ought study harder.",
    hintAr: "أعد كتابة الجملة كاملة بعد التصحيح",
  },
  {
    id: "q13",
    number: 13,
    level: 3,
    type: "text",
    inputMode: "en",
    prompt: "Do I should leave now?",
    hintAr: "أعد كتابة السؤال كاملًا بعد التصحيح",
  },
  {
    id: "q14",
    number: 14,
    level: 3,
    type: "text",
    inputMode: "en",
    prompt: "He should have went home earlier.",
    hintAr: "أعد كتابة الجملة كاملة بعد التصحيح",
  },
  {
    id: "q15",
    number: 15,
    level: 3,
    type: "text",
    inputMode: "en",
    prompt: "You had better to take an umbrella.",
    hintAr: "أعد كتابة الجملة كاملة بعد التصحيح",
  },

  // المستوى الرابع — افهم المعنى وفسّر الفرق (16–20)
  {
    id: "q16",
    number: 16,
    level: 4,
    type: "text",
    inputMode: "bilingual",
    prompt: "You should study. vs You must study.",
    hintAr: "اشرح الفرق في المعنى بين الجملتين باختصار",
  },
  {
    id: "q17",
    number: 17,
    level: 4,
    type: "text",
    inputMode: "bilingual",
    prompt: "You shouldn't enter. vs You mustn't enter.",
    hintAr: "اشرح الفرق بين النفيين باختصار",
  },
  {
    id: "q18",
    number: 18,
    level: 4,
    type: "text",
    inputMode: "bilingual",
    prompt: "I should have listened to my teacher.",
    hintAr: "ما المعنى الشعوري والزمني الذي تعبّر عنه هذه الجملة؟",
  },
  {
    id: "q19",
    number: 19,
    level: 4,
    type: "text",
    inputMode: "bilingual",
    prompt: "The results should be ready tomorrow.",
    hintAr: "ما وظيفة SHOULD في هذه الجملة؟",
  },
  {
    id: "q20",
    number: 20,
    level: 4,
    type: "text",
    inputMode: "bilingual",
    prompt: "HAD BETTER vs SHOULD",
    hintAr: "بمَ يختلف HAD BETTER عن SHOULD في القوة والمعنى؟",
  },

  // المستوى الخامس — التحدي الشامل (21–25)
  {
    id: "q21",
    number: 21,
    level: 5,
    type: "text",
    inputMode: "en",
    prompt: "Maya: What ___ I do? (ask for advice)",
    hintAr: "طلب النصيحة",
  },
  {
    id: "q22",
    number: 22,
    level: 5,
    type: "text",
    inputMode: "en",
    prompt: "Omar: You ___ revise the most important topics first. (give advice)",
    hintAr: "تقديم نصيحة مناسبة",
  },
  {
    id: "q23",
    number: 23,
    level: 5,
    type: "text",
    inputMode: "en",
    prompt: "You ___ have started earlier. (past action that was better)",
    hintAr: "فعل ماضٍ كان الأفضل القيام به",
  },
  {
    id: "q24",
    number: 24,
    level: 5,
    type: "text",
    inputMode: "en",
    prompt: "You ___ have stayed up so late. (past action to avoid)",
    hintAr: "فعل ماضٍ كان الأفضل تجنبه",
  },
  {
    id: "q25",
    number: 25,
    level: 5,
    type: "text",
    inputMode: "en",
    prompt: "It ___ be manageable if we've prepared well. (expectation)",
    hintAr: "توقع معقول بناءً على الاستعداد",
  },
] as const;

export const TEST_QUESTION_COUNT_45 = TEST_QUESTIONS_45.length;

export function isQuestionAnswered45(answers: Record<string, string>, id: string): boolean {
  return Boolean(answers[id]?.trim());
}

export function answeredCount45(answers: Record<string, string>): number {
  let count = 0;
  for (const q of TEST_QUESTIONS_45) {
    if (isQuestionAnswered45(answers, q.id)) count += 1;
  }
  return count;
}

export function testComplete45(answers: Record<string, string>): boolean {
  return answeredCount45(answers) === TEST_QUESTION_COUNT_45;
}

export function firstUnansweredId45(answers: Record<string, string>): string | null {
  for (const q of TEST_QUESTIONS_45) {
    if (!isQuestionAnswered45(answers, q.id)) return q.id;
  }
  return null;
}
