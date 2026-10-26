export type Practice44 = {
  id: string;
  section: number;
  number: number;
  prompt: string;
  options: string[];
  sourceAnswer: string;
  accepted: string[];
  parts: string[];
};

export const PRACTICE_44: Practice44[] = [
  // Exercise 1 (Section 28) — MUST vs HAVE TO
  {
    id: "p28-1",
    section: 28,
    number: 1,
    prompt: "I ______ improve my English. I really want to become fluent.",
    options: ["A. must", "B. has to"],
    sourceAnswer: "A — must",
    accepted: ["A", "must", "A. must"],
    parts: ["اختيار من متعدد"],
  },
  {
    id: "p28-2",
    section: 28,
    number: 2,
    prompt: "She ______ wear a uniform because it's a school rule.",
    options: ["A. have to", "B. has to"],
    sourceAnswer: "B — has to",
    accepted: ["B", "has to", "B. has to"],
    parts: ["اختيار من متعدد"],
  },
  {
    id: "p28-3",
    section: 28,
    number: 3,
    prompt: "We ______ protect the environment.",
    options: ["A. must", "B. musts"],
    sourceAnswer: "A — must",
    accepted: ["A", "must", "A. must"],
    parts: ["اختيار من متعدد"],
  },
  {
    id: "p28-4",
    section: 28,
    number: 4,
    prompt: "My father ______ leave early because his meeting starts at seven.",
    options: ["A. has to", "B. have to"],
    sourceAnswer: "A — has to",
    accepted: ["A", "has to", "A. has to"],
    parts: ["اختيار من متعدد"],
  },
  {
    id: "p28-5",
    section: 28,
    number: 5,
    prompt: "Students ______ follow the safety instructions.",
    options: ["A. must", "B. musts"],
    sourceAnswer: "A — must",
    accepted: ["A", "must", "A. must"],
    parts: ["اختيار من متعدد"],
  },

  // Exercise 2 (Section 29) — MUSTN'T vs DON'T HAVE TO
  {
    id: "p29-1",
    section: 29,
    number: 1,
    prompt: "يُمنع عليك لمس هذا الجهاز. You ______ touch this machine.",
    options: [],
    sourceAnswer: "mustn't",
    accepted: [
      "mustn't",
      "must not",
      "mustnt",
      "mustn't touch",
      "must not touch",
      "you mustn't touch this machine",
      "you must not touch this machine",
    ],
    parts: ["إكمال"],
  },
  {
    id: "p29-2",
    section: 29,
    number: 2,
    prompt: "لست مضطرًا إلى الحضور غدًا. You ______ come tomorrow.",
    options: [],
    sourceAnswer: "don't have to",
    accepted: [
      "don't have to",
      "do not have to",
      "dont have to",
      "don't have to come",
      "do not have to come",
      "you don't have to come tomorrow",
      "you do not have to come tomorrow",
    ],
    parts: ["إكمال"],
  },
  {
    id: "p29-3",
    section: 29,
    number: 3,
    prompt: "يُمنع على الطلاب الغش. Students ______ cheat.",
    options: [],
    sourceAnswer: "mustn't",
    accepted: [
      "mustn't",
      "must not",
      "mustnt",
      "mustn't cheat",
      "must not cheat",
      "students mustn't cheat",
      "students must not cheat",
    ],
    parts: ["إكمال"],
  },
  {
    id: "p29-4",
    section: 29,
    number: 4,
    prompt: "ليس علينا دفع ثمن التذاكر؛ إنها مجانية. We ______ pay for the tickets.",
    options: [],
    sourceAnswer: "don't have to",
    accepted: [
      "don't have to",
      "do not have to",
      "dont have to",
      "don't have to pay",
      "do not have to pay",
      "we don't have to pay for the tickets",
      "we do not have to pay for the tickets",
    ],
    parts: ["إكمال"],
  },
  {
    id: "p29-5",
    section: 29,
    number: 5,
    prompt: "لا يُسمح لك باستخدام الهاتف أثناء الامتحان. You ______ use your phone during the exam.",
    options: [],
    sourceAnswer: "mustn't",
    accepted: [
      "mustn't",
      "must not",
      "mustnt",
      "mustn't use",
      "must not use",
      "you mustn't use your phone during the exam",
      "you must not use your phone during the exam",
    ],
    parts: ["إكمال"],
  },

  // Exercise 3 (Section 30) — Past & Future
  {
    id: "p30-1",
    section: 30,
    number: 1,
    prompt: "Yesterday, I ______ (have to) wake up early.",
    options: [],
    sourceAnswer: "had to",
    accepted: [
      "had to",
      "had to wake up",
      "yesterday i had to wake up early",
      "i had to wake up early",
    ],
    parts: ["إكمال"],
  },
  {
    id: "p30-2",
    section: 30,
    number: 2,
    prompt: "She ______ (not / have to) work last weekend.",
    options: [],
    sourceAnswer: "didn't have to",
    accepted: [
      "didn't have to",
      "did not have to",
      "didnt have to",
      "didn't have to work",
      "did not have to work",
      "she didn't have to work last weekend",
      "she did not have to work last weekend",
    ],
    parts: ["إكمال"],
  },
  {
    id: "p30-3",
    section: 30,
    number: 3,
    prompt: "______ you ______ (have to) finish the project yesterday?",
    options: [],
    sourceAnswer: "Did you have to",
    accepted: [
      "did you have to",
      "did / have to",
      "did , have to",
      "did - have to",
      "did ... have to",
      "did you have to finish",
      "did you have to finish the project yesterday",
    ],
    parts: ["إكمال"],
  },
  {
    id: "p30-4",
    section: 30,
    number: 4,
    prompt: "Tomorrow, we ______ (have to) leave at six.",
    options: [],
    sourceAnswer: "will have to",
    accepted: [
      "will have to",
      "'ll have to",
      "we'll have to",
      "will have to leave",
      "tomorrow we will have to leave at six",
      "tomorrow we'll have to leave at six",
    ],
    parts: ["إكمال"],
  },
  {
    id: "p30-5",
    section: 30,
    number: 5,
    prompt: "They ______ (not / have to) bring their books next week.",
    options: [],
    sourceAnswer: "won't have to",
    accepted: [
      "won't have to",
      "will not have to",
      "wont have to",
      "won't have to bring",
      "will not have to bring",
      "they won't have to bring their books next week",
      "they will not have to bring their books next week",
    ],
    parts: ["إكمال"],
  },

  // Exercise 4 (Section 31) — Transform to Questions
  {
    id: "p31-1",
    section: 31,
    number: 1,
    prompt: "She has to study tonight.",
    options: [],
    sourceAnswer: "Does she have to study tonight?",
    accepted: ["does she have to study tonight"],
    parts: ["تحويل إلى سؤال"],
  },
  {
    id: "p31-2",
    section: 31,
    number: 2,
    prompt: "They have to arrive early.",
    options: [],
    sourceAnswer: "Do they have to arrive early?",
    accepted: ["do they have to arrive early"],
    parts: ["تحويل إلى سؤال"],
  },
  {
    id: "p31-3",
    section: 31,
    number: 3,
    prompt: "Omar had to finish the report yesterday.",
    options: [],
    sourceAnswer: "Did Omar have to finish the report yesterday?",
    accepted: ["did omar have to finish the report yesterday"],
    parts: ["تحويل إلى سؤال"],
  },
  {
    id: "p31-4",
    section: 31,
    number: 4,
    prompt: "We will have to buy new equipment.",
    options: [],
    sourceAnswer: "Will we have to buy new equipment?",
    accepted: ["will we have to buy new equipment"],
    parts: ["تحويل إلى سؤال"],
  },
  {
    id: "p31-5",
    section: 31,
    number: 5,
    prompt: "You must follow the rules.",
    options: [],
    sourceAnswer: "Must you follow the rules? (أو: Do you have to follow the rules?)",
    accepted: ["must you follow the rules", "do you have to follow the rules"],
    parts: ["تحويل إلى سؤال"],
  },

  // Exercise 5 (Section 32) — Transform to Negative
  {
    id: "p32-1",
    section: 32,
    number: 1,
    prompt: "She has to work tomorrow. — المطلوب: ليس من الضروري.",
    options: [],
    sourceAnswer: "She doesn't have to work tomorrow.",
    accepted: [
      "she doesn't have to work tomorrow",
      "she does not have to work tomorrow",
      "she doesnt have to work tomorrow",
      "doesn't have to",
      "does not have to",
    ],
    parts: ["تحويل إلى نفي"],
  },
  {
    id: "p32-2",
    section: 32,
    number: 2,
    prompt: "They had to pay yesterday. — المطلوب: لم يكن الدفع ضروريًا.",
    options: [],
    sourceAnswer: "They didn't have to pay yesterday.",
    accepted: [
      "they didn't have to pay yesterday",
      "they did not have to pay yesterday",
      "they didnt have to pay yesterday",
      "didn't have to",
      "did not have to",
    ],
    parts: ["تحويل إلى نفي"],
  },
  {
    id: "p32-3",
    section: 32,
    number: 3,
    prompt: "We will have to arrive early. — المطلوب: لن يكون الوصول المبكر ضروريًا.",
    options: [],
    sourceAnswer: "We won't have to arrive early.",
    accepted: [
      "we won't have to arrive early",
      "we will not have to arrive early",
      "we wont have to arrive early",
      "won't have to",
      "will not have to",
    ],
    parts: ["تحويل إلى نفي"],
  },
  {
    id: "p32-4",
    section: 32,
    number: 4,
    prompt: "You must enter this room. — المطلوب: الدخول ممنوع.",
    options: [],
    sourceAnswer: "You mustn't enter this room.",
    accepted: [
      "you mustn't enter this room",
      "you must not enter this room",
      "you mustnt enter this room",
      "mustn't",
      "must not",
    ],
    parts: ["تحويل إلى نفي"],
  },
  {
    id: "p32-5",
    section: 32,
    number: 5,
    prompt: "Students have to bring their books. — المطلوب: إحضار الكتب غير ضروري.",
    options: [],
    sourceAnswer: "Students don't have to bring their books.",
    accepted: [
      "students don't have to bring their books",
      "students do not have to bring their books",
      "students dont have to bring their books",
      "don't have to",
      "do not have to",
    ],
    parts: ["تحويل إلى نفي"],
  },
];

export function practices44(section: number): Practice44[] {
  return PRACTICE_44.filter((p) => p.section === section);
}

export function normalizeEnglish44(raw: string): string {
  return raw
    .replace(/[’‘`]/g, "'")
    .replace(/\s*[/,;-]\s*/g, " / ")
    .replace(/[.?!؟،]+$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function checkPracticeAnswer44(item: Practice44, raw: string): boolean {
  const clean = normalizeEnglish44(raw);
  if (!clean) return false;
  if (clean === normalizeEnglish44(item.sourceAnswer)) return true;
  if (item.options.length > 0) {
    const letter = item.sourceAnswer.trim()[0]?.toLowerCase() ?? "";
    const pickedLetter = clean[0] ?? "";
    if (
      pickedLetter === letter &&
      (clean.length === 1 || clean.startsWith(`${letter}.`) || clean.startsWith(`${letter} —`))
    ) {
      return true;
    }
  }
  return item.accepted.some((acc) => normalizeEnglish44(acc) === clean);
}
