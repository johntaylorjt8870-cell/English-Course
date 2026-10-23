// مفتاح التصحيح التفصيلي للاختبار النهائي (§41) — لا يُحمَّل أثناء التعلّم.
// يُستورد فقط عند التسليم (لحساب النتيجة) أو من خلال مساحة المعلم المحمية.
// عمود `source` هو نص السبب كما ورد حرفيًا في §41، وعمود `reason` شرح المنصة
// للوظيفة النحوية المختبَرة.
import { TEST_QUESTIONS_42, answerKey42, type TestAnswers42 } from "./testData42";

export type KeyEntry42 = {
  id: string;
  number: number;
  level: number;
  /** الوظيفة النحوية التي يختبرها السؤال */
  function: string;
  /** الإجابة المعروضة في الحلول */
  answer: string;
  /** إجابات بديلة مقبولة لكل حقل (الحقل الأول هو المعيار) */
  accept?: string[];
  /** مجموعات كلمات مفتاحية للأسئلة التفسيرية: كل مجموعة تحتاج مطابقة واحدة على الأقل */
  keywords?: string[][];
  /** نص السبب كما ورد في §41 */
  source: string;
  /** شرح المنصة */
  reason: string;
};

export const SOLUTIONS_42: KeyEntry42[] = [
  // ---------- المستوى الأول: اختر الإجابة الصحيحة ----------
  {
    id: "q1",
    number: 1,
    level: 1,
    function: "القدرة الحالية مع CAN · ثبات الفعل الناقص مع جميع الضمائر",
    answer: "can",
    source: "التعبير عن القدرة الحالية.",
    reason:
      "الفاعل She + now يدلان على قدرة في الحاضر، فنستخدم CAN. ولا وجود لصيغتَي cans وcoulds؛ الفعل الناقص ثابت لا يأخذ s ولا يُجمَع، والفعل الرئيسي speak يبقى V1.",
  },
  {
    id: "q2",
    number: 2,
    level: 1,
    function: "القدرة العامة في الماضي مع COULD",
    answer: "could",
    source: "قدرة عامة في الماضي.",
    reason:
      "When I was five ظرف ماضٍ يحدد مهارة عامة كان يمتلكها المتحدث، وهي وظيفة COULD الأولى. can تشير إلى الحاضر، وwill can تركيب غير صحيح لأن فعلان ناقصان لا يجتمعان.",
  },
  {
    id: "q3",
    number: 3,
    level: 1,
    function: "الطلب المهذب بـ Could you...? · بناء السؤال بلا do-support",
    answer: "Could",
    source: "طلب مهذب.",
    reason:
      "please تكشف أن الجملة طلب مهذب لا سؤال عن قدرة ماضية، والصيغة الطبيعية هي Could you help me? وCAN فعل ناقص يبني السؤال بنفسه، لذلك Do can وDoes غير صحيحين.",
  },
  {
    id: "q4",
    number: 4,
    level: 1,
    function: "النفي في الماضي couldn't · التقابل مع but I can",
    answer: "couldn't",
    source: "عدم القدرة في الماضي.",
    reason:
      "when I was little ماضٍ، وbut I can swim now يقابله بإثبات في الحاضر، فالخانة الأولى نفي ماضٍ: couldn't. والنفي لا يُبنى بـ don't can لأن الأفعال الناقصة تُنفى بـ not عليها مباشرة.",
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    function: "القدرة المستقبلية will be able to",
    answer: "be able to",
    source: "بعد will نستخدم be able to للتعبير عن القدرة المستقبلية.",
    reason:
      "After more practice مستقبل، ولا يمكن أن يتبع will فعل ناقص آخر مثل can أو could. التركيبة الوحيدة الصحيحة هي will + be able to + V1.",
  },

  // ---------- المستوى الثاني: أكمل الجمل ----------
  {
    id: "q6",
    number: 6,
    level: 2,
    function: "النفي can't / cannot + V1",
    answer: "can't",
    accept: ["cannot", "can not", "she can't drive a car", "she cannot drive a car"],
    source: "can't. — She can't drive a car.",
    reason:
      "(can / not) تعني نفي CAN، والصيغة can't أو cannot كلمة واحدة. بعدها drive بصيغة V1 بلا s وبلا to.",
  },
  {
    id: "q7",
    number: 7,
    level: 2,
    function: "بناء السؤال: CAN/COULD + Subject + V1",
    answer: "Can / play",
    accept: ["could/play", "could / play", "can/play", "Can you play the piano?"],
    source: "Can you play. — Can you play the piano?",
    reason:
      "السؤال يُبنى بنقل الفعل الناقص قبل الفاعل: Can you play the piano? والفعل play يبقى V1. Could you play…? صحيحة لغويًا لكنها تُفهم عادةً طلبًا أو قدرة ماضية، والمفتاح المصدرى هو Can.",
  },
  {
    id: "q8",
    number: 8,
    level: 2,
    function: "COULD للقدرة العامة في الماضي",
    answer: "could",
    accept: ["he could run very fast"],
    source: "could. — When my father was young, he could run very fast.",
    reason:
      "When my father was young ظرف ماضٍ يصف مهارة عامة مستمرة في تلك الفترة، فتُستخدم COULD. run تبقى V1 لأن الزمن محمول على الفعل الناقص.",
  },
  {
    id: "q9",
    number: 9,
    level: 2,
    function: "was/were able to للنجاح في موقف ماضٍ محدد",
    answer: "were able to",
    accept: ["we were able to finish it yesterday", "were able to finish it", "were able to finish it yesterday", "managed to", "managed to finish it"],
    source: "were able to. — The task was difficult, but we were able to finish it yesterday. السبب: نجاح في موقف ماضٍ محدد.",
    reason:
      "The task was difficult + yesterday يحددان حدثًا واحدًا نجح فيه الفاعل، لا مهارة عامة. لذلك تُفضَّل were able to (أو managed to) لإبراز النجاح. مع we نستخدم were.",
  },
  {
    id: "q10",
    number: 10,
    level: 2,
    function: "القدرة المستقبلية will be able to + V1",
    answer: "will be able to",
    accept: ["i will be able to speak english more confidently", "will be able"],
    source: "will be able to. — Next year, I will be able to speak English more confidently.",
    reason:
      "Next year مستقبل، والقدرة المستقبلية تُبنى بـ will be able to + V1. لا نقول will can لأن can لا تُصرَّف كفعل عادي ولا تأتي مباشرة بعد will.",
  },

  // ---------- المستوى الثالث: صحح الأخطاء ----------
  {
    id: "q11",
    number: 11,
    level: 3,
    function: "لا يوجد cans — ثبات الفعل الناقص",
    answer: "He can swim very well.",
    accept: ["he can swim very well"],
    source: "He can swim very well.",
    reason: "CAN ثابتة مع جميع الضمائر، فلا تُضاف إليها s. الصيغة cans غير موجودة في الإنجليزية.",
  },
  {
    id: "q12",
    number: 12,
    level: 3,
    function: "بناء السؤال بلا do-support",
    answer: "Can you help me?",
    accept: ["can you help me"],
    source: "Can you help me?",
    reason: "CAN فعل مساعد يبني السؤال بنفسه بالانتقال قبل الفاعل. إضافة do تكرّر مساعدًا موجودًا أصلًا.",
  },
  {
    id: "q13",
    number: 13,
    level: 3,
    function: "COULD + V1 لا V2",
    answer: "She could play the piano when she was young.",
    accept: ["she could play the piano when she was young"],
    source: "She could play the piano when she was young.",
    reason: "COULD تحمل علامة الماضي، فيبقى الفعل الرئيسي V1: play لا played.",
  },
  {
    id: "q14",
    number: 14,
    level: 3,
    function: "will be able to بدل will can",
    answer: "I will be able to finish the project tomorrow.",
    accept: ["i will be able to finish the project tomorrow"],
    source: "I will be able to finish the project tomorrow.",
    reason: "لا يجتمع فعلان ناقصان في سلسلة واحدة. القدرة المستقبلية تُبنى بـ will be able to + V1.",
  },
  {
    id: "q15",
    number: 15,
    level: 3,
    function: "لا to بعد COULD",
    answer: "Could you repeat the question?",
    accept: ["could you repeat the question"],
    source: "Could you repeat the question?",
    reason: "بعد CAN وCOULD يأتي V1 مباشرة دون to. القاعدة الذهبية الأولى في §3.",
  },

  // ---------- المستوى الرابع: فهم المعنى ----------
  {
    id: "q16",
    number: 16,
    level: 4,
    function: "التمييز بين القدرة الحالية والقدرة العامة في الماضي",
    answer: "الأولى تعبّر عن قدرة حالية، والثانية عن قدرة عامة في الماضي.",
    keywords: [["حالي", "الحاضر", "الآن", "present", "حالية"], ["ماضي", "الماضي", "past"]],
    source: "الأولى تعبّر عن قدرة حالية، والثانية عن قدرة عامة في الماضي.",
    reason:
      "I can swim قدرة يملكها المتحدث الآن؛ I could swim when I was six قدرة عامة كانت موجودة في فترة ماضية. الفرق زمني لا في نوع القدرة.",
  },
  {
    id: "q17",
    number: 17,
    level: 4,
    function: "COULD للطلب المهذب في الحاضر",
    answer: "طلب مهذب.",
    keywords: [["طلب", "request", "مهذب", "polite"]],
    source: "طلب مهذب.",
    reason:
      "please وافتتاح الجملة بـ Could you…? يجعلانها طلبًا مهذبًا في الحاضر، لا سؤالًا عن قدرة ماضية. COULD هنا تقلّل مباشرة السؤال.",
  },
  {
    id: "q18",
    number: 18,
    level: 4,
    function: "COULD للاحتمال المستقبلي",
    answer: "احتمال مستقبلي.",
    keywords: [["احتمال", "الإمكانية", "possibility", "probability", "محتمل"]],
    source: "احتمال مستقبلي.",
    reason:
      "tomorrow تمنع قراءة الماضي، ولا يوجد فاعل يطلب إذنًا، فالوظيفة احتمال: الأمر ممكن لكن غير مؤكد. وهذه الفكرة تتوسع في الدرس 43 مع MAY وMIGHT.",
  },
  {
    id: "q19",
    number: 19,
    level: 4,
    function: "was able to لإبراز النجاح في موقف ماضٍ محدد",
    answer: "لأن الجملة تبرز نجاحها في حل مشكلة محددة في الماضي، وليس مجرد امتلاك قدرة عامة.",
    keywords: [["نجاح", "تمكن", "managed", "success", "نجح"], ["محدد", "موقف", "specific", "مشكلة", "واحد"]],
    source: "لأن الجملة تبرز نجاحها في حل مشكلة محددة في الماضي، وليس مجرد امتلاك قدرة عامة.",
    reason:
      "Although the problem was difficult تمهّد لصعوبة حدث واحد، فالتعبير المناسب للنجاح في هذا الحدث هو was able to. ولو كانت الجملة عن مهارة عامة لكانت could هي الطبيعي.",
  },
  {
    id: "q20",
    number: 20,
    level: 4,
    function: "المعنى يحدده السياق: قدرة أم طلب",
    answer: "نعم. قد يكون السؤال عن القدرة إذا كنا نريد معرفة ما إذا كان الشخص يستطيع فتح الباب، وقد يكون طلبًا إذا كنا نريده أن يفتح الباب لنا. السياق هو الذي يحدد المعنى.",
    keywords: [["نعم", "yes", "يمكن"], ["سياق", "context", "الموقف"], ["قدرة", "طلب", "ability", "request"]],
    source:
      "نعم. قد يكون السؤال عن القدرة إذا كنا نريد معرفة ما إذا كان الشخص يستطيع فتح الباب، وقد يكون طلبًا إذا كنا نريده أن يفتح الباب لنا. السياق هو الذي يحدد المعنى.",
    reason:
      "الجملة نفسها تحمل قراءتين: باب ثقيل يجعلها سؤالًا عن القدرة، وطلب مباشر يجعلها طلبًا. لا توجد علامة شكلية تميّزهما؛ الموقف هو العلامة.",
  },

  // ---------- المستوى الخامس: Final IQ200 Boss ----------
  {
    id: "q21",
    number: 21,
    level: 5,
    function: "سؤال عن القدرة الحالية",
    answer: "Can",
    accept: ["can"],
    source: "Can. — Can you design a simple robot?",
    reason:
      "مايا تسأل عن قدرة عمر الحالية، والجواب Yes, I can يثبت أن السؤال بـ CAN. Can you design a simple robot?",
  },
  {
    id: "q22",
    number: 22,
    level: 5,
    function: "عدم القدرة في الماضي couldn't",
    answer: "couldn't",
    accept: ["could not"],
    source: "couldn't. — But when I was younger, I couldn't understand electronic circuits.",
    reason:
      "But when I was younger تحوّل الكلام إلى الماضي، والجملة تنفي الفهم في تلك الفترة، فنستخدم couldn't + V1.",
  },
  {
    id: "q23",
    number: 23,
    level: 5,
    function: "طلب المساعدة بصورة مهذبة Could you...?",
    answer: "Could",
    accept: ["could"],
    source: "Could. — Could you help me build a small robot, please?",
    reason:
      "please تكشف أن الجملة طلب مهذب لا سؤال عن قدرة، والجواب Of course يطابق طلبًا. Could you help me build a small robot, please?",
  },
  {
    id: "q24",
    number: 24,
    level: 5,
    function: "تقديم اقتراح We could...",
    answer: "could",
    accept: ["we could work together after school"],
    source: "could. — We could work together after school.",
    reason:
      "عبارة That's one idea تؤكد أن عمر يطرح فكرة، وطرح الأفكار يتم بـ We could…. COULD هنا اقتراح حاضر/مستقبلي لا ماضٍ.",
  },
  {
    id: "q25",
    number: 25,
    level: 5,
    function: "القدرة المستقبلية will be able to",
    answer: "will be able to",
    accept: ["i think i will be able to build more advanced robots", "will be able"],
    source: "will be able to. — I think I will be able to build more advanced robots.",
    reason:
      "After a few months of practice مستقبل، والقدرة المستقبلية تُبنى بـ will be able to + V1، لأن I think تستبعد الفعل الناقص can في هذا الموضع.",
  },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.،,!?؟;؛:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywordHit(answer: string, groups: string[][]): boolean {
  const value = normalize(answer);
  return groups.every((group) => group.some((word) => value.includes(normalize(word))));
}

export type Graded42 = KeyEntry42 & { correct: boolean; response: string };

export function grade42(answers: TestAnswers42): { results: Graded42[]; score: number; total: number } {
  const results = SOLUTIONS_42.map((entry) => {
    const question = TEST_QUESTIONS_42.find((q) => q.id === entry.id)!;
    const responses = question.fields.map((f) => answers[answerKey42(question.id, f.key)] ?? "");
    const response = responses.join(" / ").trim();
    let correct = false;
    if (entry.keywords) {
      correct = responses.length === 1 && keywordHit(responses[0], entry.keywords);
    } else if (responses.length > 1) {
      const pair = responses.map((value) => normalize(value)).join("/");
      const pool = [entry.answer, ...(entry.accept ?? [])].map((value) => normalize(value).replace(/\s*\/\s*/g, "/"));
      correct = pool.includes(pair);
    } else {
      const value = normalize(responses[0]);
      const pool = [entry.answer, ...(entry.accept ?? [])].map(normalize);
      correct = Boolean(value) && pool.includes(value);
    }
    return { ...entry, correct, response };
  });
  return { results, score: results.filter((r) => r.correct).length, total: SOLUTIONS_42.length };
}
