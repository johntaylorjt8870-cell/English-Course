// ============================================================
// الدرس 52 — بيانات المختبرات التفاعلية والتدريبات الستة
// كل الإجابات مخفية في الواجهة حتى يختار الطالب أو يكتب إجابته.
// ============================================================

export type LabId52 =
  | "condResult"
  | "verbForm"
  | "order"
  | "negation"
  | "error"
  | "zeroFirst"
  | "unless"
  | "questionOrder"
  | "modal"
  | "ifWhen"
  | "outcome";

export type CondResultItem = {
  id: string;
  clauses: { text: string; role: "C" | "R" }[];
  why: string;
};

export const COND_RESULT_52: CondResultItem[] = [
  {
    id: "cr1",
    clauses: [
      { text: "If it rains,", role: "C" },
      { text: "I will stay at home.", role: "R" },
    ],
    why: "الجزء الذي يبدأ بـIf ويحمل المضارع البسيط rains هو الشرط، والجزء الذي يحمل will stay هو النتيجة.",
  },
  {
    id: "cr2",
    clauses: [
      { text: "If she doesn't hurry,", role: "C" },
      { text: "she will miss the bus.", role: "R" },
    ],
    why: "نفي الشرط بـdoesn't hurry، والنتيجة will miss. لاحظ عودة الفعل إلى V1 بعد doesn't.",
  },
  {
    id: "cr3",
    clauses: [
      { text: "I will buy a car", role: "R" },
      { text: "if I have enough money.", role: "C" },
    ],
    why: "جملة If جاءت في النهاية، لكنها تبقى شرطًا. النتيجة I will buy a car لا تحتاج فاصلة قبل if في هذا الترتيب.",
  },
  {
    id: "cr4",
    clauses: [
      { text: "If you need help,", role: "C" },
      { text: "call me.", role: "R" },
    ],
    why: "النتيجة هنا أمر call me وليست will. الأمر مسموح تمامًا في نتيجة الشرط الأول.",
  },
];

export type VerbFormItem = {
  id: string;
  before: string;
  after: string;
  accept: string[];
  model: string;
  why: string;
};

export const VERB_FORM_52: VerbFormItem[] = [
  {
    id: "vf1",
    before: "If she",
    after: "tired, she will rest.",
    accept: ["feels"],
    model: "feels",
    why: "الفاعل she مفرد غائب، فيأخذ الفعل s: feels.",
  },
  {
    id: "vf2",
    before: "If they",
    after: "early, we will begin.",
    accept: ["arrive"],
    model: "arrive",
    why: "الفاعل they جمع، فيبقى الفعل في صورته الأساسية arrive.",
  },
  {
    id: "vf3",
    before: "If he",
    after: "hard, he will earn money.",
    accept: ["works"],
    model: "works",
    why: "الفاعل he مفرد غائب، فيأخذ الفعل s: works.",
  },
  {
    id: "vf4",
    before: "If my father",
    after: ", I will buy a new laptop.",
    accept: ["agrees"],
    model: "agrees",
    why: "my father مفرد غائب، فالفعل agrees.",
  },
  {
    id: "vf5",
    before: "If the bus",
    after: "late, we will take a taxi.",
    accept: ["arrives"],
    model: "arrives",
    why: "the bus مفرد غائب، فالفعل arrives.",
  },
  {
    id: "vf6",
    before: "If I",
    after: "enough money, I will buy a car.",
    accept: ["have"],
    model: "have",
    why: "مع I نستخدم have، وهي المضارع البسيط بلا s.",
  },
];

export type OrderTask52 = {
  id: string;
  scrambled: string[];
  correct: string[];
  ar: string;
  why: string;
};

export const ORDER_52: OrderTask52[] = [
  {
    id: "ord1",
    scrambled: ["will", "If", "stay", "it", "I", "rains,", "at home."],
    correct: ["If", "it", "rains,", "I", "will", "stay", "at home."],
    ar: "إذا أمطرت، سأبقى في المنزل.",
    why: "بدأنا بجملة If فوضعنا فاصلة بعد الشرط، ثم النتيجة will + V1.",
  },
  {
    id: "ord2",
    scrambled: ["answer.", "you", "I", "If", "call", "will", "me,"],
    correct: ["If", "you", "call", "me,", "I", "will", "answer."],
    ar: "إذا اتصلت بي، سأجيب.",
    why: "الشرط If you call me في المضارع البسيط، والنتيجة I will answer.",
  },
  {
    id: "ord3",
    scrambled: ["if", "I", "answer", "you", "call", "will", "me."],
    correct: ["I", "will", "answer", "if", "you", "call", "me."],
    ar: "سأجيب إذا اتصلت بي.",
    why: "جملة If في النهاية: لا فاصلة، والمعنى نفسه.",
  },
  {
    id: "ord4",
    scrambled: ["the test,", "she", "If", "passes", "celebrate.", "will", "she"],
    correct: ["If", "she", "passes", "the test,", "she", "will", "celebrate."],
    ar: "إذا نجحت في الاختبار، فستحتفل.",
    why: "passes مع she، والنتيجة will celebrate.",
  },
];

export type QuestionOrderTask52 = {
  id: string;
  scrambled: string[];
  correct: string[];
  ar: string;
  why: string;
};

export const QUESTION_ORDER_52: QuestionOrderTask52[] = [
  {
    id: "qo1",
    scrambled: ["you", "What", "if", "do", "fail", "will", "you", "the exam?"],
    correct: ["What", "will", "you", "do", "if", "you", "fail", "the exam?"],
    ar: "ماذا ستفعل إذا رسبت في الامتحان؟",
    why: "الترتيب: What + will + subject + V1 + if + Present Simple.",
  },
  {
    id: "qo2",
    scrambled: ["go", "if", "you", "Where", "you", "have", "will", "a holiday?"],
    correct: ["Where", "will", "you", "go", "if", "you", "have", "a holiday?"],
    ar: "إلى أين ستذهب إذا حصلت على إجازة؟",
    why: "Where في البداية، ثم will you go، ثم جملة if بالمضارع البسيط.",
  },
  {
    id: "qo3",
    scrambled: ["call", "if", "Who", "need", "will", "you", "help?", "you"],
    correct: ["Who", "will", "you", "call", "if", "you", "need", "help?"],
    ar: "من ستتصل به إذا احتجت إلى المساعدة؟",
    why: "Who + will + you + call، ثم if you need help.",
  },
  {
    id: "qo4",
    scrambled: ["if", "happen", "What", "protect", "we", "will", "don't", "the environment?"],
    correct: ["What", "will", "happen", "if", "we", "don't", "protect", "the environment?"],
    ar: "ماذا سيحدث إذا لم نحافظ على البيئة؟",
    why: "What will happen ثابتة، ثم if + Present Simple منفي بـdon't.",
  },
];

export type NegationItem52 = {
  id: string;
  before: string;
  after: string;
  options: string[];
  answer: number;
  why: string;
};

export const NEGATION_52: NegationItem52[] = [
  {
    id: "neg1",
    before: "If she",
    after: ", she will miss the bus.",
    options: ["doesn't hurry", "don't hurry", "won't hurry"],
    answer: 0,
    why: "الفاعل she يأخذ doesn't، وبعدها V1: doesn't hurry.",
  },
  {
    id: "neg2",
    before: "If I",
    after: ", I will fail the exam.",
    options: ["doesn't study", "don't study", "won't study"],
    answer: 1,
    why: "مع I نستخدم don't + V1 في الشرط: don't study.",
  },
  {
    id: "neg3",
    before: "If they",
    after: " now, they will arrive late.",
    options: ["doesn't leave", "don't leave", "won't leave"],
    answer: 1,
    why: "مع they نستخدم don't leave. ولا نستخدم won't في جزء الشرط.",
  },
  {
    id: "neg4",
    before: "If it rains, we",
    after: " football.",
    options: ["don't play", "doesn't play", "won't play"],
    answer: 2,
    why: "النفي هنا في النتيجة، فيكون won't + V1: won't play.",
  },
  {
    id: "neg5",
    before: "If you don't apologize, I",
    after: " you.",
    options: ["won't forgive", "don't forgive", "doesn't forgive"],
    answer: 0,
    why: "النتيجة منفية بـwon't، والشرط منفي أصلًا بـdon't.",
  },
  {
    id: "neg6",
    before: "If she doesn't sleep well, she",
    after: " energetic.",
    options: ["won't feel", "doesn't feel", "don't feel"],
    answer: 0,
    why: "نفي النتيجة مع she يكون won't feel، وليس doesn't feel.",
  },
];

export type ErrorItem52 = {
  id: string;
  wrong: string;
  accept: string[];
  model: string;
  why: string;
};

export const ERROR_52: ErrorItem52[] = [
  {
    id: "err1",
    wrong: "If I will see him, I will tell him.",
    accept: ["if i see him i will tell him"],
    model: "If I see him, I will tell him.",
    why: "لا نستخدم will بعد If؛ جملة الشرط في المضارع البسيط.",
  },
  {
    id: "err2",
    wrong: "If she study, she will pass.",
    accept: ["if she studies she will pass"],
    model: "If she studies, she will pass.",
    why: "الفاعل she يحتاج إلى s: studies.",
  },
  {
    id: "err3",
    wrong: "If he doesn't studies, he will fail.",
    accept: ["if he doesn't study he will fail", "if he does not study he will fail"],
    model: "If he doesn't study, he will fail.",
    why: "بعد doesn't نستخدم الفعل الأساسي V1: study وليس studies.",
  },
  {
    id: "err4",
    wrong: "If I studied tomorrow, I will pass.",
    accept: ["if i study tomorrow i will pass"],
    model: "If I study tomorrow, I will pass.",
    why: "الشرط الأول يستخدم المضارع البسيط، لا الماضي studied.",
  },
  {
    id: "err5",
    wrong: "If you study, you will can pass.",
    accept: ["if you study you can pass", "if you study you will pass"],
    model: "If you study, you can pass.",
    why: "لا نجمع will مع can؛ نستخدم أحدهما: can pass أو will pass.",
  },
  {
    id: "err6",
    wrong: "When she will arrive, I will call you.",
    accept: ["when she arrives i will call you"],
    model: "When she arrives, I will call you.",
    why: "بعد when نستخدم المضارع البسيط، لا will.",
  },
];

export type ZeroFirstItem52 = {
  id: string;
  sentence: string;
  answer: "Zero" | "First";
  why: string;
};

export const ZERO_FIRST_52: ZeroFirstItem52[] = [
  {
    id: "zf1",
    sentence: "If you heat water to 100°C at sea level, it boils.",
    answer: "Zero",
    why: "حقيقة علمية عامة في المضارع البسيط في الطرفين ⇒ Zero Conditional.",
  },
  {
    id: "zf2",
    sentence: "If I see Ahmed tomorrow, I will give him your message.",
    answer: "First",
    why: "حدث محدد في المستقبل (tomorrow) مع نتيجة will ⇒ First Conditional.",
  },
  {
    id: "zf3",
    sentence: "If people don't drink water, they become thirsty.",
    answer: "Zero",
    why: "نتيجة عامة معتادة، والمضارع البسيط في الطرفين ⇒ Zero Conditional.",
  },
  {
    id: "zf4",
    sentence: "If she studies tonight, she will finish her homework.",
    answer: "First",
    why: "ليلة محددة (tonight) ونتيجة مستقبلية will finish ⇒ First Conditional.",
  },
  {
    id: "zf5",
    sentence: "If you mix blue and yellow, you get green.",
    answer: "Zero",
    why: "قاعدة عامة ثابتة، والنتيجة get بالمضارع البسيط ⇒ Zero Conditional.",
  },
  {
    id: "zf6",
    sentence: "If we miss the bus, we will take a taxi.",
    answer: "First",
    why: "احتمال مستقبلي واقعي ونتيجة will take ⇒ First Conditional.",
  },
];

export type UnlessItem52 = {
  id: string;
  ifNot: string;
  accept: string[];
  model: string;
  why: string;
};

export const UNLESS_52: UnlessItem52[] = [
  {
    id: "un1",
    ifNot: "If you don't study, you will fail.",
    accept: ["unless you study you will fail"],
    model: "Unless you study, you will fail.",
    why: "unless = if ... not، لذا حذفنا don't وأبقينا study.",
  },
  {
    id: "un2",
    ifNot: "If she doesn't hurry, she will miss the bus.",
    accept: ["unless she hurries she will miss the bus"],
    model: "Unless she hurries, she will miss the bus.",
    why: "نحذف doesn't ونضيف s إلى الفعل مع she: hurries.",
  },
  {
    id: "un3",
    ifNot: "If they don't leave now, they will be late.",
    accept: ["unless they leave now they will be late"],
    model: "Unless they leave now, they will be late.",
    why: "مع they يبقى الفعل leave بعد حذف don't.",
  },
  {
    id: "un4",
    ifNot: "If he doesn't apologize, I won't forgive him.",
    accept: ["unless he apologizes i won't forgive him", "unless he apologizes i will not forgive him"],
    model: "Unless he apologizes, I won't forgive him.",
    why: "apologizes مع he، والنتيجة المنفية تبقى won't forgive.",
  },
  {
    id: "un5",
    ifNot: "If we don't save money, we won't buy a new car.",
    accept: ["unless we save money we won't buy a new car", "unless we save money we will not buy a new car"],
    model: "Unless we save money, we won't buy a new car.",
    why: "unless we save money تحمل معنى if we don't save money، والنتيجة لم تتغير.",
  },
];

export type ModalItem52 = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  why: string;
};

export const MODAL_52: ModalItem52[] = [
  {
    id: "mod1",
    prompt: "If you finish your homework, you ____ watch TV.",
    options: ["can", "will can", "must to"],
    answer: 0,
    why: "can + V1 تعبّر عن الإمكانية، ولا نجمعها مع will.",
  },
  {
    id: "mod2",
    prompt: "If she studies hard, she ____ get a scholarship.",
    options: ["should", "might", "must"],
    answer: 1,
    why: "المنحة احتمال وليست يقينًا؛ might تعبّر عن احتمال حدوث النتيجة.",
  },
  {
    id: "mod3",
    prompt: "If you feel sick, you ____ see a doctor.",
    options: ["should", "might", "can to"],
    answer: 0,
    why: "should تقدّم نصيحة مناسبة للمرض.",
  },
  {
    id: "mod4",
    prompt: "If you enter the laboratory, you ____ wear safety glasses.",
    options: ["might", "should", "must"],
    answer: 2,
    why: "الضرورة والإلزام في المختبر يعبّر عنها must.",
  },
];

export type IfWhenItem52 = {
  id: string;
  context: string;
  sentence: string;
  answer: "IF" | "WHEN";
  why: string;
};

export const IF_WHEN_52: IfWhenItem52[] = [
  {
    id: "iw1",
    context: "قد يأتي وقد لا يأتي — نحن نتحدث عن شرط غير مؤكد.",
    sentence: "____ he comes, I will talk to him.",
    answer: "IF",
    why: "معنى «إذا جاء» غير المؤكد يحتاج IF، لأن الحدوث مشروط.",
  },
  {
    id: "iw2",
    context: "المتكلم يعتبر مجيئه أمرًا متوقعًا ويتحدث عن توقيته.",
    sentence: "____ he comes, I will talk to him.",
    answer: "WHEN",
    why: "«عندما يأتي» تعبّر عن توقيت متوقع، لذلك WHEN.",
  },
  {
    id: "iw3",
    context: "التحدث عن وقت محدد متوقع: «عندما أصل، سأتصل بك».",
    sentence: "____ I arrive, I will call you.",
    answer: "WHEN",
    why: "الوصول متوقع والمقصود التوقيت، فيكون WHEN مع المضارع البسيط.",
  },
];

export type OutcomeItem52 = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  why: string;
};

export const OUTCOME_52: OutcomeItem52[] = [
  {
    id: "out1",
    prompt: "If you don't charge your phone,",
    options: ["it will run out of battery.", "it will charge quickly.", "it won't need power."],
    answer: 0,
    why: "عدم الشحن يؤدي إلى نفاد البطارية: will run out of battery.",
  },
  {
    id: "out2",
    prompt: "If we leave now,",
    options: ["we will miss the train for sure.", "we will catch the train.", "we won't travel at all."],
    answer: 1,
    why: "المغادرة الآن تجعل اللحاق بالقطار نتيجة منطقية محتملة.",
  },
  {
    id: "out3",
    prompt: "If she doesn't apologize,",
    options: ["I will thank her.", "she will be happy.", "I won't forgive her."],
    answer: 2,
    why: "عدم الاعتذار يؤدي إلى عدم المسامحة: won't forgive.",
  },
  {
    id: "out4",
    prompt: "If he studies every day,",
    options: ["he will forget everything.", "he will improve.", "he won't take the exam."],
    answer: 1,
    why: "المذاكرة اليومية تؤدي إلى التحسن: will improve.",
  },
];

/* ============================================================
   التدريبات الستة كاملة — النصوص والإجابات والتوضيحات
   ============================================================ */

export type GapItem52 = {
  id: string;
  /** المصدر (الفعل الأساسي) الذي يصرّفه الطالب في الفراغين. */
  cue: string;
  before: string;
  mid: string;
  after: string;
  accepts: string[][];
  model: string[];
  why: string;
};

export type ChoiceItem52 = {
  id: string;
  sentence: string;
  options: string[];
  answer: number;
  why: string;
};

export type CorrectItem52 = {
  id: string;
  wrong: string;
  accepts: string[];
  model: string;
  why: string;
};

export type ClassifyItem52 = {
  id: string;
  sentence: string;
  answer: "Zero" | "First";
  why: string;
};

export type UnlessExerciseItem52 = {
  id: string;
  ifNot: string;
  accepts: string[];
  model: string;
  why: string;
};

export type TranslateItem52 = {
  id: string;
  ar: string;
  accepts: string[];
  model: string;
  why: string;
};

export type Exercise52 =
  | {
      type: "gap";
      badge: string;
      title: string;
      subtitle: string;
      instruction: string;
      items: GapItem52[];
    }
  | {
      type: "choice";
      badge: string;
      title: string;
      subtitle: string;
      instruction: string;
      items: ChoiceItem52[];
    }
  | {
      type: "correct";
      badge: string;
      title: string;
      subtitle: string;
      instruction: string;
      items: CorrectItem52[];
    }
  | {
      type: "classify";
      badge: string;
      title: string;
      subtitle: string;
      instruction: string;
      items: ClassifyItem52[];
    }
  | {
      type: "unless";
      badge: string;
      title: string;
      subtitle: string;
      instruction: string;
      items: UnlessExerciseItem52[];
    }
  | {
      type: "translate";
      badge: string;
      title: string;
      subtitle: string;
      instruction: string;
      items: TranslateItem52[];
    };

export const EX_GAP_52: Extract<Exercise52, { type: "gap" }> = {
  type: "gap",
  badge: "التدريب الأول",
  title: "ضع الفعل بين القوسين في الصورة الصحيحة",
  subtitle: "استخدم المضارع البسيط أو will + V1 حسب موقع الفعل في الجملة.",
  instruction: "اكتب الفعلين في الفراغين، ثم اضغط «تحقق».",
  items: [
    {
      id: "g1",
      cue: "study",
      before: "If she",
      mid: ", she",
      after: " the exam.",
      accepts: [["studies"], ["will pass"]],
      model: ["studies", "will pass"],
      why: "studies مضارع بسيط مع she، وwill pass نتيجة مستقبلية.",
    },
    {
      id: "g2",
      cue: "rain",
      before: "If it",
      mid: ", we",
      after: " at home.",
      accepts: [["rains"], ["will stay"]],
      model: ["rains", "will stay"],
      why: "rains مع it، وwill stay نتيجة مستقبلية.",
    },
    {
      id: "g3",
      cue: "not hurry",
      before: "If he",
      mid: ", he",
      after: " the bus.",
      accepts: [["doesn't hurry", "does not hurry"], ["will miss"]],
      model: ["doesn't hurry", "will miss"],
      why: "نفي المضارع البسيط مع he هو doesn't hurry، ثم will miss.",
    },
    {
      id: "g4",
      cue: "invite",
      before: "If they",
      mid: " me, I",
      after: " the party.",
      accepts: [["invite"], ["will attend"]],
      model: ["invite", "will attend"],
      why: "invite مع they، وwill attend نتيجة مستقبلية.",
    },
    {
      id: "g5",
      cue: "finish",
      before: "If my brother",
      mid: " early, he",
      after: " me.",
      accepts: [["finishes"], ["will help"]],
      model: ["finishes", "will help"],
      why: "finishes نضيف es لأن الفاعل مفرد غائب، وwill help نتيجة مستقبلية.",
    },
    {
      id: "g6",
      cue: "not sleep",
      before: "If you",
      mid: " well, you",
      after: " tired.",
      accepts: [["don't sleep", "do not sleep"], ["will feel"]],
      model: ["don't sleep", "will feel"],
      why: "don't sleep نفي مع you، وwill feel نتيجة مستقبلية.",
    },
    {
      id: "g7",
      cue: "explain",
      before: "If the teacher",
      mid: " the lesson again, we",
      after: " it.",
      accepts: [["explains"], ["will understand"]],
      model: ["explains", "will understand"],
      why: "explains نضيف s لأن الفاعل مفرد، وwill understand نتيجة مستقبلية.",
    },
    {
      id: "g8",
      cue: "have",
      before: "If I",
      mid: " enough money, I",
      after: " a new computer.",
      accepts: [["have"], ["will buy"]],
      model: ["have", "will buy"],
      why: "have هي المضارع البسيط مع I، وwill buy نتيجة مستقبلية.",
    },
    {
      id: "g9",
      cue: "not practice",
      before: "If she",
      mid: ", she",
      after: ".",
      accepts: [["doesn't practice", "does not practice"], ["won't improve", "will not improve"]],
      model: ["doesn't practice", "won't improve"],
      why: "doesn't practice نفي الشرط، وwon't improve نفي النتيجة.",
    },
    {
      id: "g10",
      cue: "leave",
      before: "If we",
      mid: " now, we",
      after: " on time.",
      accepts: [["leave"], ["will arrive"]],
      model: ["leave", "will arrive"],
      why: "leave مع we، وwill arrive نتيجة مستقبلية.",
    },
  ],
};

export const EX_CHOICE_52: Extract<Exercise52, { type: "choice" }> = {
  type: "choice",
  badge: "التدريب الثاني",
  title: "اختر الإجابة الصحيحة",
  subtitle: "اختر الصيغة الصحيحة لكل جملة، ثم اضغط «تحقق».",
  instruction: "الإجابة الصحيحة لا تظهر قبل اختيارك.",
  items: [
    {
      id: "c1",
      sentence: "If he studies hard, he ____ the exam.",
      options: ["passes", "will pass", "passed"],
      answer: 1,
      why: "النتيجة مستقبلية، فتأخذ will + V1: will pass.",
    },
    {
      id: "c2",
      sentence: "If I ____ her, I will tell her.",
      options: ["will see", "saw", "see"],
      answer: 2,
      why: "بعد If نستخدم المضارع البسيط: see، لا will see ولا saw.",
    },
    {
      id: "c3",
      sentence: "If she doesn't hurry, she ____ the train.",
      options: ["will miss", "misses", "missed"],
      answer: 0,
      why: "النتيجة مترتبة على الشرط ومستقبلية: will miss.",
    },
    {
      id: "c4",
      sentence: "If it rains tomorrow, we ____ at home.",
      options: ["stayed", "will stay", "stay"],
      answer: 1,
      why: "will stay نتيجة مستقبلية مرتبطة بشرط محتمل.",
    },
    {
      id: "c5",
      sentence: "If you need help, you ____ ask me.",
      options: ["can", "will can", "could to"],
      answer: 0,
      why: "can + V1 تعبّر عن الإمكانية، ولا تُجمع مع will.",
    },
    {
      id: "c6",
      sentence: "Unless you study, you ____ pass the exam.",
      options: ["won't", "will", "are"],
      answer: 0,
      why: "unless تعني «ما لم»، فالجملة تعني أنك لن تنجح إن لم تدرس: won't.",
    },
    {
      id: "c7",
      sentence: "When he ____, we will start.",
      options: ["will arrive", "arrives", "arrived"],
      answer: 1,
      why: "بعد when نستخدم المضارع البسيط: arrives.",
    },
    {
      id: "c8",
      sentence: "If they ____ early, they will find good seats.",
      options: ["arrive", "will arrive", "arrived"],
      answer: 0,
      why: "arrive مع they في المضارع البسيط بعد If.",
    },
  ],
};

export const EX_CORRECT_52: Extract<Exercise52, { type: "correct" }> = {
  type: "correct",
  badge: "التدريب الثالث",
  title: "صحح الأخطاء",
  subtitle: "في كل جملة خطأ واحد على الأقل. أعد كتابتها بصورة صحيحة.",
  instruction: "اكتب الجملة كاملة بعد التصحيح، ثم اضغط «تحقق».",
  items: [
    {
      id: "co1",
      wrong: "If I will have time, I will visit you.",
      accepts: ["if i have time i will visit you"],
      model: "If I have time, I will visit you.",
      why: "لا نستخدم will بعد If؛ جملة الشرط في المضارع البسيط.",
    },
    {
      id: "co2",
      wrong: "If she don't study, she will fail.",
      accepts: ["if she doesn't study she will fail", "if she does not study she will fail"],
      model: "If she doesn't study, she will fail.",
      why: "مع she نستخدم doesn't، وبعدها V1.",
    },
    {
      id: "co3",
      wrong: "If he doesn't works hard, he won't succeed.",
      accepts: ["if he doesn't work hard he won't succeed", "if he does not work hard he will not succeed"],
      model: "If he doesn't work hard, he won't succeed.",
      why: "بعد doesn't نستخدم work وليس works.",
    },
    {
      id: "co4",
      wrong: "If it will rain, we will cancel the game.",
      accepts: ["if it rains we will cancel the game"],
      model: "If it rains, we will cancel the game.",
      why: "نستخدم المضارع البسيط بعد If: rains.",
    },
    {
      id: "co5",
      wrong: "If you will need help, call me.",
      accepts: ["if you need help call me"],
      model: "If you need help, call me.",
      why: "المضارع البسيط بعد If، والنتيجة أمر: call me.",
    },
    {
      id: "co6",
      wrong: "Unless you don't hurry, you will be late.",
      accepts: ["unless you hurry you will be late"],
      model: "Unless you hurry, you will be late.",
      why: "unless تحمل معنى النفي، فلا نضيف don't معها في هذا التركيب.",
    },
    {
      id: "co7",
      wrong: "When she will arrive, we will eat dinner.",
      accepts: ["when she arrives we will eat dinner"],
      model: "When she arrives, we will eat dinner.",
      why: "نستخدم المضارع البسيط بعد when: arrives.",
    },
    {
      id: "co8",
      wrong: "If they practices every day, they will improve.",
      accepts: ["if they practice every day they will improve"],
      model: "If they practice every day, they will improve.",
      why: "مع they نستخدم practice دون s.",
    },
  ],
};

export const EX_CLASSIFY_52: Extract<Exercise52, { type: "classify" }> = {
  type: "classify",
  badge: "التدريب الرابع",
  title: "حدد نوع الشرط",
  subtitle: "اختر Zero Conditional أو First Conditional لكل جملة.",
  instruction: "اعتمد على المعنى لا على الزمن وحده: حقيقة عامة أم احتمال مستقبلي؟",
  items: [
    {
      id: "cl1",
      sentence: "If you heat water to 100°C at sea level, it boils.",
      answer: "Zero",
      why: "حقيقة علمية عامة، والمضارع البسيط في الطرفين.",
    },
    {
      id: "cl2",
      sentence: "If I see Ahmed tomorrow, I will give him your message.",
      answer: "First",
      why: "حدث مستقبلي محدد ونتيجة will give.",
    },
    {
      id: "cl3",
      sentence: "If people don't drink water, they become thirsty.",
      answer: "Zero",
      why: "نتيجة عامة معتادة للمضارع البسيط.",
    },
    {
      id: "cl4",
      sentence: "If she studies tonight, she will finish her homework.",
      answer: "First",
      why: "ليلة محددة في المستقبل ونتيجة will finish.",
    },
    {
      id: "cl5",
      sentence: "If you mix blue and yellow, you get green.",
      answer: "Zero",
      why: "قاعدة عامة ثابتة، والنتيجة get.",
    },
    {
      id: "cl6",
      sentence: "If we miss the bus, we will take a taxi.",
      answer: "First",
      why: "احتمال مستقبلي واقعي ونتيجة will take.",
    },
    {
      id: "cl7",
      sentence: "If I eat too much, I feel uncomfortable.",
      answer: "Zero",
      why: "نتيجة متكررة عامة في المضارع البسيط.",
    },
    {
      id: "cl8",
      sentence: "If he calls me later, I will answer.",
      answer: "First",
      why: "حدث مستقبلي (later) ونتيجة will answer.",
    },
  ],
};

export const EX_UNLESS_52: Extract<Exercise52, { type: "unless" }> = {
  type: "unless",
  badge: "التدريب الخامس",
  title: "أعد صياغة الجمل باستخدام Unless",
  subtitle: "حافظ على المعنى قدر الإمكان.",
  instruction: "اكتب الجملة كاملة باستخدام Unless، ثم اضغط «تحقق».",
  items: [
    {
      id: "u1",
      ifNot: "If you don't study, you will fail.",
      accepts: ["unless you study you will fail"],
      model: "Unless you study, you will fail.",
      why: "unless + you study = if you don't study.",
    },
    {
      id: "u2",
      ifNot: "If she doesn't hurry, she will miss the bus.",
      accepts: ["unless she hurries she will miss the bus"],
      model: "Unless she hurries, she will miss the bus.",
      why: "hurries مع she بعد حذف doesn't.",
    },
    {
      id: "u3",
      ifNot: "If they don't leave now, they will be late.",
      accepts: ["unless they leave now they will be late"],
      model: "Unless they leave now, they will be late.",
      why: "leave مع they في المضارع البسيط.",
    },
    {
      id: "u4",
      ifNot: "If he doesn't apologize, I won't forgive him.",
      accepts: ["unless he apologizes i won't forgive him", "unless he apologizes i will not forgive him"],
      model: "Unless he apologizes, I won't forgive him.",
      why: "apologizes مع he، والنتيجة تبقى منفية.",
    },
    {
      id: "u5",
      ifNot: "If we don't save money, we won't buy a new car.",
      accepts: ["unless we save money we won't buy a new car", "unless we save money we will not buy a new car"],
      model: "Unless we save money, we won't buy a new car.",
      why: "unless we save money تحمل معنى if we don't save money.",
    },
  ],
};

export const EX_TRANSLATE_52: Extract<Exercise52, { type: "translate" }> = {
  type: "translate",
  badge: "التدريب السادس",
  title: "ترجم إلى الإنجليزية",
  subtitle: "اكتب الترجمة الإنجليزية كاملة، ثم اضغط «تحقق».",
  instruction: "يُقبل اختلاف طفيف في الصياغة إذا حافظ على المعنى والتركيب.",
  items: [
    {
      id: "tr1",
      ar: "إذا درست بجد، فسوف تنجح.",
      accepts: ["if you study hard you will pass", "if you study hard you will succeed"],
      model: "If you study hard, you will pass.",
      why: "شرط بالمضارع البسيط study، ونتيجة will pass.",
    },
    {
      id: "tr2",
      ar: "إذا لم تسرع، فستفوتك الحافلة.",
      accepts: ["if you don't hurry you will miss the bus", "if you do not hurry you will miss the bus"],
      model: "If you don't hurry, you will miss the bus.",
      why: "نفي الشرط بـdon't hurry، والنتيجة will miss.",
    },
    {
      id: "tr3",
      ar: "إذا أمطرت غدًا، فلن نذهب إلى الحديقة.",
      accepts: [
        "if it rains tomorrow we won't go to the park",
        "if it rains tomorrow we will not go to the park",
        "if it rains tomorrow we won't go to the garden",
      ],
      model: "If it rains tomorrow, we won't go to the park.",
      why: "rains بعد If، وwon't go نفي النتيجة.",
    },
    {
      id: "tr4",
      ar: "ماذا ستفعل إذا لم يأتِ صديقك؟",
      accepts: [
        "what will you do if your friend doesn't come",
        "what will you do if your friend does not come",
      ],
      model: "What will you do if your friend doesn't come?",
      why: "سؤال What will you do، ثم if your friend doesn't come.",
    },
    {
      id: "tr5",
      ar: "إذا احتجت إلى المساعدة، يمكنك الاتصال بي.",
      accepts: ["if you need help you can call me", "if you need help you can contact me"],
      model: "If you need help, you can call me.",
      why: "can + V1 تعبّر عن الإمكانية في النتيجة.",
    },
    {
      id: "tr6",
      ar: "إذا رأيت المعلم، فأخبره أنني أبحث عنه.",
      accepts: [
        "if you see the teacher tell him that i am looking for him",
        "if you see the teacher tell him i am looking for him",
        "if you see the teacher tell him that i'm looking for him",
      ],
      model: "If you see the teacher, tell him that I am looking for him.",
      why: "النتيجة أمر tell him، وفيها جملة that I am looking for him.",
    },
    {
      id: "tr7",
      ar: "ما لم تعمل بجد، فلن تحقق هدفك.",
      accepts: [
        "unless you work hard you won't achieve your goal",
        "unless you work hard you will not achieve your goal",
        "unless you work hard you won't achieve your goals",
      ],
      model: "Unless you work hard, you won't achieve your goal.",
      why: "unless + present simple، والنتيجة منفية بـwon't.",
    },
    {
      id: "tr8",
      ar: "عندما أصل إلى المنزل، سأتصل بك.",
      accepts: ["when i arrive home i will call you", "when i arrive at home i will call you", "when i get home i will call you"],
      model: "When I arrive home, I will call you.",
      why: "بعد when نستخدم المضارع البسيط arrive، والنتيجة will call.",
    },
  ],
};

export const EXERCISES_52: Exercise52[] = [
  EX_GAP_52,
  EX_CHOICE_52,
  EX_CORRECT_52,
  EX_CLASSIFY_52,
  EX_UNLESS_52,
  EX_TRANSLATE_52,
];

export const EXERCISE_ITEM_COUNT_52 = EXERCISES_52.reduce((sum, exercise) => sum + exercise.items.length, 0);
export const LAB_COUNT_52 = 11;
