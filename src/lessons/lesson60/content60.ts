// ============================================================
// Lesson 60 — Reported Speech: Statements
// الكلام المنقول — الجمل الخبرية
//
// المحتوى الكامل للمصدر المورّد: 17 قسمًا و39 موضوعًا مرقّمًا.
// لا حذف ولا اختصار: كل قاعدة، كل جدول، كل مثال، كل ترجمة
// محفوظة كما وردت، مع تدقيق لغوي موثّق في source-ledger.md:
//   • ترقيم «مفتاح إجابة الاختبار» في المصدر يبدأ من 35؛
//     أُبقي رقم الموضوع (35) وأُعيد ترقيم بنود المفتاح 1–25
//     لتطابق أسئلة الاختبار الأصلي الخمسة والعشرين.
//   • الموضوعات 30–34 غير مرقّمة حرفيًا في المصدر؛ تُعرض هنا
//     بوصفها: 30 التدريبات · 31–34 أقسام الاختبار الأربعة.
// ============================================================

export type Line60 = { en: string; ar: string };

export type ChangeKind60 = "verb" | "tense" | "pronoun" | "time" | "place" | "modal" | "form";

/** تغيير واحد حدث أثناء نقل الكلام: from → to مع تصنيفه */
export type Change60 = { from: string; to: string; kind: ChangeKind60; note?: string };

/** زوج «مباشر → منقول» مع ترجمتيه والتغييرات التي طرأت */
export type ShiftPair60 = {
  direct: string;
  directAr: string;
  reported: string;
  reportedAr: string;
  changes?: Change60[];
  note?: string;
};

// ------------------------------------------------------------
// الافتتاحية — الجسر من الدروس السابقة + الأهداف السبعة
// ------------------------------------------------------------

export const OPENING60 = {
  bridge:
    "في الدروس السابقة تعلمنا الأزمنة المختلفة، والأفعال الناقصة، والمبني للمجهول، وكيفية تكوين الجمل باستخدام هذه التراكيب. أما اليوم فسنبدأ موضوعًا جديدًا ومهمًا جدًا في اللغة الإنجليزية، وهو Reported Speech — الكلام المنقول.",
  daily:
    "نحن في حياتنا اليومية ننقل كلام الآخرين باستمرار. قد يقول صديقك شيئًا، ثم تذهب إلى شخص آخر وتخبره بما قاله صديقك. في هذه الحالة، لن تحتاج دائمًا إلى تكرار الكلمات نفسها حرفيًا، بل يمكنك نقل المعنى بأسلوبك. وهذا بالضبط ما سنتعلمه في هذا الدرس.",
  goals: [
    { n: 1, text: "فهم الفرق بين Direct Speech وReported Speech." },
    { n: 2, text: "تعلم استخدام said وtold." },
    { n: 3, text: "فهم قاعدة Backshift، أي رجوع الزمن خطوة إلى الماضي عند نقل الكلام." },
    { n: 4, text: "تعلم تغيير الضمائر حسب المتحدث والمستمع." },
    { n: 5, text: "تعلم تغيير كلمات الزمان والمكان." },
    { n: 6, text: "تحويل الجمل الخبرية من الكلام المباشر إلى الكلام المنقول." },
    { n: 7, text: "التعامل مع الحالات التي لا نحتاج فيها إلى تغيير الزمن." },
  ],
};

// ------------------------------------------------------------
// القسم الأول · الموضوعان 1–2: Direct Speech وReported Speech
// ------------------------------------------------------------

export const DIRECT_60 = {
  n: 1,
  title: "Direct Speech — الكلام المباشر",
  definition: "الكلام المباشر هو أن ننقل كلام الشخص كما قاله تمامًا، دون تغيير كلماته.",
  quoteRule: 'نضع كلام الشخص بين علامتي اقتباس " ".',
  examples: [
    { en: 'Ahmed said, "I am tired."', ar: "قال أحمد: «أنا متعب».", echo: "I am tired.", echoAr: "أنا متعب." },
    { en: 'Sara said, "I like English."', ar: "قالت سارة: «أنا أحب الإنجليزية».", echo: "I like English.", echoAr: "أنا أحب الإنجليزية." },
    { en: 'Ali said, "I live in Istanbul."', ar: "قال علي: «أنا أعيش في إسطنبول».", echo: "I live in Istanbul.", echoAr: "أنا أعيش في إسطنبول." },
  ],
  close: "في جميع هذه الأمثلة نقلنا الكلام الأصلي حرفيًا. هذا يسمى Direct Speech.",
};

export const REPORTED_60 = {
  n: 2,
  title: "Reported Speech — الكلام المنقول",
  definition: "الكلام المنقول هو أن ننقل معنى كلام الشخص دون الالتزام بالكلمات نفسها.",
  pairs: [
    {
      direct: 'Ahmed said, "I am tired."',
      directAr: "قال أحمد: «أنا متعب».",
      reported: "Ahmed said that he was tired.",
      reportedAr: "قال أحمد إنه كان متعبًا.",
      changes: [
        { from: "I", to: "he", kind: "pronoun" },
        { from: "am", to: "was", kind: "tense" },
        { from: '"…"', to: "بلا علامتي اقتباس", kind: "form" },
        { from: "—", to: "that", kind: "form" },
      ] as Change60[],
    },
    {
      direct: 'Sara said, "I like English."',
      directAr: "قالت سارة: «أنا أحب الإنجليزية».",
      reported: "Sara said that she liked English.",
      reportedAr: "قالت سارة إنها تحب الإنجليزية.",
      changes: [
        { from: "I", to: "she", kind: "pronoun" },
        { from: "like", to: "liked", kind: "tense" },
      ] as Change60[],
    },
    {
      direct: 'Ali said, "I live in Istanbul."',
      directAr: "قال علي: «أنا أعيش في إسطنبول».",
      reported: "Ali said that he lived in Istanbul.",
      reportedAr: "قال علي إنه يعيش في إسطنبول.",
      changes: [
        { from: "I", to: "he", kind: "pronoun" },
        { from: "live", to: "lived", kind: "tense" },
      ] as Change60[],
    },
  ] as ShiftPair60[],
  compare: [
    { direct: 'Ahmed said, "I am happy."', reported: "Ahmed said that he was happy." },
    { direct: 'Sara said, "I like tea."', reported: "Sara said that she liked tea." },
    { direct: 'Ali said, "I work here."', reported: "Ali said that he worked there." },
  ],
  arabicNote:
    "ملاحظة مهمة: الترجمة العربية لا تحتاج دائمًا إلى إظهار التغيير الزمني بنفس الطريقة الإنجليزية؛ لذلك ركّز على التركيب الإنجليزي عند التحويل.",
};

// ------------------------------------------------------------
// القسم الثاني · الموضوعان 3–4: SAID وTOLD
// ------------------------------------------------------------

export const SAID_60 = {
  n: 3,
  title: "استخدام SAID",
  rule: "الفعل said هو التصريف الماضي من say. نستخدمه عندما ننقل كلام شخص دون ضرورة ذكر الشخص الذي وُجّه إليه الكلام.",
  structure: "Subject + said + (that) + Reported Speech",
  examples: [
    {
      direct: 'Ali said, "I am busy."',
      directAr: "قال علي: «أنا مشغول».",
      reported: "Ali said that he was busy.",
      reportedAr: "قال علي إنه مشغول.",
    },
    {
      direct: 'Mona said, "I study English."',
      directAr: "قالت منى: «أنا أدرس الإنجليزية».",
      reported: "Mona said that she studied English.",
      reportedAr: "قالت منى إنها تدرس الإنجليزية.",
    },
    {
      direct: 'The teacher said, "The lesson is easy."',
      directAr: "قال المعلم: «الدرس سهل».",
      reported: "The teacher said that the lesson was easy.",
      reportedAr: "قال المعلم إن الدرس سهل.",
    },
    {
      direct: 'They said, "We are ready."',
      directAr: "قالوا: «نحن مستعدون».",
      reported: "They said that they were ready.",
      reportedAr: "قالوا إنهم مستعدون.",
    },
  ] as ShiftPair60[],
  thatNote: {
    title: "هل يمكن حذف THAT؟",
    lead: "نعم. الجملتان صحيحتان:",
    both: ["Ali said that he was busy.", "Ali said he was busy."],
    meaning: "المعنى واحد تقريبًا. كلمة that اختيارية في كثير من الجمل الخبرية المنقولة.",
    clarity: "لكن وجودها قد يجعل الجملة أوضح، خصوصًا في الجمل الطويلة.",
  },
};

export const TOLD_60 = {
  n: 4,
  title: "استخدام TOLD",
  rule: "الفعل told هو التصريف الماضي من tell. نستخدمه عادةً عندما نذكر الشخص الذي وُجّه إليه الكلام.",
  structure: "Subject + told + Person + (that) + Reported Speech",
  examples: [
    {
      direct: 'Ahmed said to me, "I am tired."',
      directAr: "قال أحمد لي: «أنا متعب».",
      reported: "Ahmed told me that he was tired.",
      reportedAr: "أخبرني أحمد بأنه متعب.",
    },
    {
      direct: 'Sara said to her mother, "I need some money."',
      directAr: "قالت سارة لوالدتها: «أحتاج إلى بعض المال».",
      reported: "Sara told her mother that she needed some money.",
      reportedAr: "أخبرت سارة والدتها بأنها تحتاج إلى بعض المال.",
    },
    {
      direct: 'The teacher said to the students, "You are doing well."',
      directAr: "قال المعلم للطلاب: «أنتم تؤدون أداءً جيدًا».",
      reported: "The teacher told the students that they were doing well.",
      reportedAr: "أخبر المعلم الطلاب بأنهم يؤدون أداءً جيدًا.",
    },
    {
      direct: 'My father said to me, "You are responsible."',
      directAr: "قال أبي لي: «أنت شخص مسؤول».",
      reported: "My father told me that I was responsible.",
      reportedAr: "أخبرني أبي بأنني شخص مسؤول.",
    },
  ] as ShiftPair60[],
  contrast: {
    title: "الفرق بين SAID وTOLD",
    ok1: { en: "He said that he was tired.", ar: "قال إنه كان متعبًا." },
    wrong1: "He said me that he was tired.",
    wrong1Note: "لأن said لا يأتي بعده الشخص مباشرةً بهذه الطريقة.",
    ok2: { en: "He told me that he was tired.", ar: "أخبرني بأنه كان متعبًا." },
    wrong2: "He told that he was tired.",
    wrong2Note: "لأن told تحتاج عادةً إلى ذكر الشخص الذي تلقى الكلام.",
  },
  compareRows: [
    { verb: "said", form: "He said that he was tired." },
    { verb: "said to", form: "He said to me that he was tired." },
    { verb: "told", form: "He told me that he was tired." },
  ],
  memory: ["said + الكلام", "told + الشخص + الكلام"],
};

// ------------------------------------------------------------
// القسم الثالث · الموضوع 5: فكرة رجوع الزمن
// ------------------------------------------------------------

export const BACKSHIFT_INTRO_60 = {
  n: 5,
  title: "ما المقصود برجوع الزمن؟",
  lead: "هذه من أهم قواعد Reported Speech. عندما ننقل كلامًا قيل في الماضي باستخدام said أو told، فإننا غالبًا نرجع بالزمن خطوة إلى الماضي.",
  term: "Backshift",
  termAr: "أي انتقال الزمن خطوة إلى الخلف.",
  example: {
    direct: 'He said, "I am happy."',
    directAr: "هو قال: «أنا سعيد».",
    reported: "He said that he was happy.",
    reportedAr: "قال إنه كان سعيدًا.",
    changes: [{ from: "am", to: "was", kind: "tense", note: "من المضارع البسيط إلى الماضي البسيط" }] as Change60[],
  } as ShiftPair60,
  why: "لماذا يحدث ذلك؟ لأن الشخص قال الجملة في الماضي، ونحن الآن ننقل كلامه، ولذلك تتغير الأزمنة غالبًا لتتناسب مع فعل النقل الماضي said أو told.",
  caution: "لكن انتبه: هذا التغيير ليس إلزاميًا في جميع الحالات، وسنتعلم الاستثناءات لاحقًا.",
};

// ------------------------------------------------------------
// القسم الثالث · الموضوعات 6–11: تحويلات الأزمنة الستة
// ------------------------------------------------------------

export type TenseLesson60 = {
  id: string;
  n: number;
  title: string;
  en: string;
  ruleFrom: string;
  ruleTo: string;
  examples: ShiftPair60[];
  note?: string;
};

export const TENSE_LESSONS_60: TenseLesson60[] = [
  {
    id: "ps-past",
    n: 6,
    title: "تحويل المضارع البسيط إلى الماضي البسيط",
    en: "Present Simple → Past Simple",
    ruleFrom: "am / is → was · are → were · V1 → V2",
    ruleTo: "Past Simple",
    examples: [
      {
        direct: 'Ali said, "I work every day."',
        directAr: "قال علي: «أنا أعمل كل يوم».",
        reported: "Ali said that he worked every day.",
        reportedAr: "قال علي إنه كان يعمل كل يوم.",
        changes: [{ from: "work", to: "worked", kind: "tense" }],
      },
      {
        direct: 'Sara said, "I like music."',
        directAr: "قالت سارة: «أنا أحب الموسيقى».",
        reported: "Sara said that she liked music.",
        reportedAr: "قالت سارة إنها تحب الموسيقى.",
        changes: [{ from: "like", to: "liked", kind: "tense" }],
      },
      {
        direct: 'They said, "We live in Turkey."',
        directAr: "قالوا: «نحن نعيش في تركيا».",
        reported: "They said that they lived in Turkey.",
        reportedAr: "قالوا إنهم يعيشون في تركيا.",
        changes: [{ from: "live", to: "lived", kind: "tense" }],
      },
      {
        direct: 'He said, "I am a teacher."',
        directAr: "قال: «أنا معلم».",
        reported: "He said that he was a teacher.",
        reportedAr: "قال إنه كان معلمًا.",
        changes: [{ from: "am", to: "was", kind: "tense" }],
      },
      {
        direct: 'They said, "We are happy."',
        directAr: "قالوا: «نحن سعداء».",
        reported: "They said that they were happy.",
        reportedAr: "قالوا إنهم سعداء.",
        changes: [{ from: "are", to: "were", kind: "tense" }],
      },
    ],
  },
  {
    id: "pc-pastc",
    n: 7,
    title: "تحويل المضارع المستمر إلى الماضي المستمر",
    en: "Present Continuous → Past Continuous",
    ruleFrom: "am / is / are + V-ing",
    ruleTo: "was / were + V-ing",
    examples: [
      {
        direct: 'He said, "I am studying English."',
        directAr: "قال: «أنا أدرس الإنجليزية».",
        reported: "He said that he was studying English.",
        reportedAr: "قال إنه كان يدرس الإنجليزية.",
        changes: [{ from: "am studying", to: "was studying", kind: "tense" }],
      },
      {
        direct: 'Sara said, "I am cooking dinner."',
        directAr: "قالت سارة: «أنا أُعد العشاء».",
        reported: "Sara said that she was cooking dinner.",
        reportedAr: "قالت سارة إنها كانت تُعد العشاء.",
        changes: [{ from: "am cooking", to: "was cooking", kind: "tense" }],
      },
      {
        direct: 'They said, "We are watching TV."',
        directAr: "قالوا: «نحن نشاهد التلفاز».",
        reported: "They said that they were watching TV.",
        reportedAr: "قالوا إنهم كانوا يشاهدون التلفاز.",
        changes: [{ from: "are watching", to: "were watching", kind: "tense" }],
      },
      {
        direct: 'The children said, "We are playing outside."',
        directAr: "قال الأطفال: «نحن نلعب في الخارج».",
        reported: "The children said that they were playing outside.",
        reportedAr: "قال الأطفال إنهم كانوا يلعبون في الخارج.",
        changes: [{ from: "are playing", to: "were playing", kind: "tense" }],
      },
    ],
  },
  {
    id: "pp-pastp",
    n: 8,
    title: "تحويل المضارع التام إلى الماضي التام",
    en: "Present Perfect → Past Perfect",
    ruleFrom: "has / have + V3",
    ruleTo: "had + V3",
    examples: [
      {
        direct: 'Ali said, "I have finished my homework."',
        directAr: "قال علي: «لقد أنهيت واجبي».",
        reported: "Ali said that he had finished his homework.",
        reportedAr: "قال علي إنه كان قد أنهى واجبه.",
        changes: [{ from: "have finished", to: "had finished", kind: "tense" }],
      },
      {
        direct: 'Sara said, "I have visited Ankara."',
        directAr: "قالت سارة: «لقد زرت أنقرة».",
        reported: "Sara said that she had visited Ankara.",
        reportedAr: "قالت سارة إنها زارت أنقرة.",
        changes: [{ from: "have visited", to: "had visited", kind: "tense" }],
      },
      {
        direct: 'They said, "We have completed the project."',
        directAr: "قالوا: «لقد أكملنا المشروع».",
        reported: "They said that they had completed the project.",
        reportedAr: "قالوا إنهم كانوا قد أكملوا المشروع.",
        changes: [{ from: "have completed", to: "had completed", kind: "tense" }],
      },
      {
        direct: 'He said, "I have lost my keys."',
        directAr: "قال: «لقد فقدت مفاتيحي».",
        reported: "He said that he had lost his keys.",
        reportedAr: "قال إنه فقد مفاتيحه.",
        changes: [{ from: "have lost", to: "had lost", kind: "tense" }],
      },
    ],
  },
  {
    id: "past-pastp",
    n: 9,
    title: "تحويل الماضي البسيط إلى الماضي التام",
    en: "Past Simple → Past Perfect",
    ruleFrom: "V2",
    ruleTo: "had + V3",
    examples: [
      {
        direct: 'He said, "I bought a new phone."',
        directAr: "قال: «اشتريت هاتفًا جديدًا».",
        reported: "He said that he had bought a new phone.",
        reportedAr: "قال إنه اشترى هاتفًا جديدًا.",
        changes: [{ from: "bought", to: "had bought", kind: "tense" }],
      },
      {
        direct: 'Sara said, "I visited my grandmother."',
        directAr: "قالت سارة: «زرت جدتي».",
        reported: "Sara said that she had visited her grandmother.",
        reportedAr: "قالت سارة إنها زارت جدتها.",
        changes: [{ from: "visited", to: "had visited", kind: "tense" }],
      },
      {
        direct: 'They said, "We saw the accident."',
        directAr: "قالوا: «رأينا الحادث».",
        reported: "They said that they had seen the accident.",
        reportedAr: "قالوا إنهم رأوا الحادث.",
        changes: [{ from: "saw", to: "had seen", kind: "tense" }],
      },
      {
        direct: 'Ali said, "I wrote a letter."',
        directAr: "قال علي: «كتبت رسالة».",
        reported: "Ali said that he had written a letter.",
        reportedAr: "قال علي إنه كتب رسالة.",
        changes: [{ from: "wrote", to: "had written", kind: "tense" }],
      },
    ],
    note: "ملاحظة: عندما يصبح الزمن Past Perfect، فإنه لا يرجع إلى زمن أقدم مرة أخرى في هذه القاعدة الأساسية.",
  },
  {
    id: "pastc-pastpc",
    n: 10,
    title: "تحويل الماضي المستمر إلى الماضي التام المستمر",
    en: "Past Continuous → Past Perfect Continuous",
    ruleFrom: "was / were + V-ing",
    ruleTo: "had been + V-ing",
    examples: [
      {
        direct: 'He said, "I was working."',
        directAr: "قال: «كنت أعمل».",
        reported: "He said that he had been working.",
        reportedAr: "قال إنه كان يعمل.",
        changes: [{ from: "was working", to: "had been working", kind: "tense" }],
      },
      {
        direct: 'They said, "We were waiting for the bus."',
        directAr: "قالوا: «كنا ننتظر الحافلة».",
        reported: "They said that they had been waiting for the bus.",
        reportedAr: "قالوا إنهم كانوا ينتظرون الحافلة.",
        changes: [{ from: "were waiting", to: "had been waiting", kind: "tense" }],
      },
      {
        direct: 'Sara said, "I was studying all night."',
        directAr: "قالت سارة: «كنت أدرس طوال الليل».",
        reported: "Sara said that she had been studying all night.",
        reportedAr: "قالت سارة إنها كانت تدرس طوال الليل.",
        changes: [{ from: "was studying", to: "had been studying", kind: "tense" }],
      },
    ],
  },
  {
    id: "will-would",
    n: 11,
    title: "تحويل المستقبل البسيط WILL إلى WOULD",
    en: "Future Simple → Would",
    ruleFrom: "will + V1",
    ruleTo: "would + V1",
    examples: [
      {
        direct: 'He said, "I will help you."',
        directAr: "قال: «سأساعدك».",
        reported: "He said that he would help me.",
        reportedAr: "قال إنه سيساعدني.",
        changes: [
          { from: "will", to: "would", kind: "modal" },
          { from: "you", to: "me", kind: "pronoun", note: "المخاطَب هو أنا، راوي الجملة" },
        ],
      },
      {
        direct: 'Sara said, "I will travel tomorrow."',
        directAr: "قالت سارة: «سأسافر غدًا».",
        reported: "Sara said that she would travel the following day.",
        reportedAr: "قالت سارة إنها ستسافر في اليوم التالي.",
        changes: [
          { from: "will", to: "would", kind: "modal" },
          { from: "tomorrow", to: "the following day", kind: "time" },
        ],
      },
      {
        direct: 'They said, "We will finish the work."',
        directAr: "قالوا: «سننهي العمل».",
        reported: "They said that they would finish the work.",
        reportedAr: "قالوا إنهم سينهون العمل.",
        changes: [{ from: "will", to: "would", kind: "modal" }],
      },
      {
        direct: 'The teacher said, "I will explain the lesson."',
        directAr: "قال المعلم: «سأشرح الدرس».",
        reported: "The teacher said that he would explain the lesson.",
        reportedAr: "قال المعلم إنه سيشرح الدرس.",
        changes: [{ from: "will", to: "would", kind: "modal" }],
      },
    ],
  },
];

// ------------------------------------------------------------
// القسم الرابع · الموضوع 12: جدول Backshift الشامل
// ------------------------------------------------------------

export const BACKSHIFT_TABLE_60 = {
  n: 12,
  title: "جدول Backshift الشامل",
  lead: "هذا الجدول مهم جدًا، ومن الأفضل حفظه جيدًا.",
  rows: [
    { from: "Present Simple", to: "Past Simple" },
    { from: "Present Continuous", to: "Past Continuous" },
    { from: "Present Perfect", to: "Past Perfect" },
    { from: "Present Perfect Continuous", to: "Past Perfect Continuous" },
    { from: "Past Simple", to: "Past Perfect" },
    { from: "Past Continuous", to: "Past Perfect Continuous" },
    { from: "Past Perfect", to: "Past Perfect", note: "يبقى كما هو" },
    { from: "Past Perfect Continuous", to: "Past Perfect Continuous", note: "يبقى كما هو" },
    { from: "will", to: "would" },
    { from: "can", to: "could" },
    { from: "may", to: "might" },
    { from: "must", to: "had to", note: "غالبًا عند التعبير عن الالتزام" },
  ],
  shorthand: [
    "am → was",
    "is → was",
    "are → were",
    "do / does → did",
    "V1 → V2",
    "am doing → was doing",
    "have done → had done",
    "has written → had written",
    "did → had done",
    "was doing → had been doing",
    "will → would",
    "can → could",
    "may → might",
  ],
  mustWarning: {
    title: "تنبيه مهم بشأن MUST",
    lead: "عندما تعبر must عن الالتزام أو الضرورة، تتحول غالبًا إلى had to.",
    obligation: {
      direct: 'He said, "I must leave early."',
      directAr: "قال: «يجب أن أغادر مبكرًا».",
      reported: "He said that he had to leave early.",
      reportedAr: "قال إنه كان مضطرًا إلى المغادرة مبكرًا.",
    } as ShiftPair60,
    deductionLead: "لكن إذا كانت must تعبر عن استنتاج قوي، فقد تبقى كما هي في الكلام المنقول.",
    deduction: {
      direct: 'He said, "She must be tired."',
      directAr: "قال: «لا بد أنها متعبة».",
      reported: "He said that she must be tired.",
      reportedAr: "قال إنها لا بد أن تكون متعبة.",
    } as ShiftPair60,
  },
};

// ------------------------------------------------------------
// القسم الخامس · الموضوع 13: تغيير الضمائر
// ------------------------------------------------------------

export const PRONOUNS_60 = {
  n: 13,
  title: "لماذا تتغير الضمائر؟",
  lead: "عندما ننقل كلام شخص آخر، يجب أن نغير الضمائر بحسب المتحدث ومن نتحدث عنه.",
  anchor: {
    direct: 'Ahmed said, "I am tired."',
    directAr: "قال أحمد: «أنا متعب».",
    reported: "Ahmed said that he was tired.",
    reportedAr: "قال أحمد إنه كان متعبًا.",
    note: "المتحدث الأصلي هو Ahmed، إذًا الضمير I يشير إلى Ahmed، وعندما ننقل كلامه تتغير I إلى he.",
  },
  table: [
    { direct: "I", reported: "he / she" },
    { direct: "We", reported: "they" },
    { direct: "You", reported: "I / he / she / we / they", note: "بحسب السياق" },
    { direct: "My", reported: "his / her" },
    { direct: "Our", reported: "their" },
    { direct: "Your", reported: "my / his / her / our / their", note: "بحسب السياق" },
    { direct: "Me", reported: "him / her" },
    { direct: "Us", reported: "them" },
  ],
  warning: "لا تحفظ هذا الجدول باعتباره تحويلًا آليًا ثابتًا؛ لأن الضمير يعتمد على الشخص الذي يتحدث والشخص الذي يسمع الكلام.",
  examples: [
    {
      direct: 'Ali said, "I love my family."',
      directAr: "قال علي: «أنا أحب عائلتي».",
      reported: "Ali said that he loved his family.",
      reportedAr: "قال علي إنه يحب عائلته.",
      changes: [
        { from: "I", to: "he", kind: "pronoun" },
        { from: "my", to: "his", kind: "pronoun" },
      ],
    },
    {
      direct: 'Mona said, "I am doing my homework."',
      directAr: "قالت منى: «أنا أؤدي واجبي».",
      reported: "Mona said that she was doing her homework.",
      reportedAr: "قالت منى إنها كانت تؤدي واجبها.",
      changes: [
        { from: "I", to: "she", kind: "pronoun" },
        { from: "my", to: "her", kind: "pronoun" },
      ],
    },
    {
      direct: 'The boys said, "We are ready."',
      directAr: "قال الأولاد: «نحن مستعدون».",
      reported: "The boys said that they were ready.",
      reportedAr: "قال الأولاد إنهم مستعدون.",
      changes: [{ from: "We", to: "they", kind: "pronoun" }],
    },
    {
      direct: 'My father said to me, "You are a good student."',
      directAr: "قال أبي لي: «أنت طالب جيد».",
      reported: "My father told me that I was a good student.",
      reportedAr: "أخبرني أبي بأنني طالب جيد.",
      changes: [{ from: "You", to: "I", kind: "pronoun", note: "لأن الأب كان يتحدث معي، وعندما أنقل الكلام عن نفسي أستخدم I." }],
    },
    {
      direct: 'Sara said to Ali, "You are my best friend."',
      directAr: "قالت سارة لعلي: «أنت أفضل أصدقائي».",
      reported: "Sara told Ali that he was her best friend.",
      reportedAr: "أخبرت سارة عليًا بأنه أفضل أصدقائها.",
      changes: [
        { from: "You", to: "he", kind: "pronoun", note: "لأن المخاطَب هو علي." },
        { from: "my", to: "her", kind: "pronoun", note: "المتحدثة سارة." },
      ],
    },
  ] as ShiftPair60[],
};

// ------------------------------------------------------------
// القسم السادس · الموضوع 14: كلمات الزمان والمكان
// ------------------------------------------------------------

export const TIME_PLACE_60 = {
  n: 14,
  title: "Time and Place Expressions",
  lead: "عندما ننقل الكلام بعد مرور وقت أو من مكان مختلف، قد نحتاج إلى تغيير كلمات الزمان والمكان.",
  scenario:
    'لنفترض أن شخصًا قال اليوم: "I will come tomorrow." إذا نقلنا كلامه في اليوم التالي، فلا يمكننا دائمًا الاحتفاظ بكلمة tomorrow؛ لأن المقصود الزمني قد تغير. لذلك نغيرها بحسب وقت النقل.',
  timeRows: [
    { direct: "now", reported: "then" },
    { direct: "today", reported: "that day" },
    { direct: "tonight", reported: "that night" },
    { direct: "yesterday", reported: "the previous day / the day before" },
    { direct: "tomorrow", reported: "the following day / the next day" },
    { direct: "last night", reported: "the previous night" },
    { direct: "last week", reported: "the previous week" },
    { direct: "last month", reported: "the previous month" },
    { direct: "next week", reported: "the following week" },
    { direct: "next month", reported: "the following month" },
    { direct: "two days ago", reported: "two days before" },
    { direct: "a year ago", reported: "a year before" },
    { direct: "this morning", reported: "that morning" },
  ],
  timeExamples: [
    {
      direct: 'Ali said, "I am busy now."',
      directAr: "قال علي: «أنا مشغول الآن».",
      reported: "Ali said that he was busy then.",
      reportedAr: "قال علي إنه كان مشغولًا حينها.",
      changes: [{ from: "now", to: "then", kind: "time" }],
    },
    {
      direct: 'Sara said, "I will travel tomorrow."',
      directAr: "قالت سارة: «سأسافر غدًا».",
      reported: "Sara said that she would travel the following day.",
      reportedAr: "قالت سارة إنها ستسافر في اليوم التالي.",
      changes: [{ from: "tomorrow", to: "the following day", kind: "time" }],
    },
    {
      direct: 'He said, "I visited Ankara yesterday."',
      directAr: "قال: «زرت أنقرة أمس».",
      reported: "He said that he had visited Ankara the previous day.",
      reportedAr: "قال إنه زار أنقرة في اليوم السابق.",
      changes: [{ from: "yesterday", to: "the previous day", kind: "time" }],
    },
    {
      direct: 'They said, "We bought this house last year."',
      directAr: "قالوا: «اشترينا هذا المنزل العام الماضي».",
      reported: "They said that they had bought that house the previous year.",
      reportedAr: "قالوا إنهم اشتروا ذلك المنزل في العام السابق.",
      changes: [
        { from: "this", to: "that", kind: "place" },
        { from: "last year", to: "the previous year", kind: "time" },
      ],
    },
  ] as ShiftPair60[],
  placeRows: [
    { direct: "here", reported: "there" },
    { direct: "this", reported: "that" },
    { direct: "these", reported: "those" },
    { direct: "come", reported: "go", note: "غالبًا بحسب اتجاه النقل" },
    { direct: "bring", reported: "take", note: "غالبًا بحسب اتجاه النقل" },
  ],
  placeExamples: [
    {
      direct: 'He said, "I live here."',
      directAr: "قال: «أنا أعيش هنا».",
      reported: "He said that he lived there.",
      reportedAr: "قال إنه يعيش هناك.",
      changes: [{ from: "here", to: "there", kind: "place" }],
    },
    {
      direct: 'Sara said, "I like this book."',
      directAr: "قالت سارة: «أحب هذا الكتاب».",
      reported: "Sara said that she liked that book.",
      reportedAr: "قالت سارة إنها تحب ذلك الكتاب.",
      changes: [{ from: "this", to: "that", kind: "place" }],
    },
    {
      direct: 'They said, "We bought these bags."',
      directAr: "قالوا: «اشترينا هذه الحقائب».",
      reported: "They said that they had bought those bags.",
      reportedAr: "قالوا إنهم اشتروا تلك الحقائب.",
      changes: [{ from: "these", to: "those", kind: "place" }],
    },
  ] as ShiftPair60[],
  note: "ملاحظة مهمة: هذه التغييرات ليست آلية في كل سياق. إذا كان المكان أو الزمان لم يتغير، فقد نحتفظ بالكلمة الأصلية. المهم أن نحافظ على المعنى الحقيقي.",
};

// ------------------------------------------------------------
// القسم السابع · الموضوع 15: الأفعال الناقصة في الكلام المنقول
// ------------------------------------------------------------

export const MODALS_60 = {
  n: 15,
  title: "تحويل Modal Verbs في الكلام المنقول",
  lead: "في الدروس السابقة تعلمنا الأفعال الناقصة، والآن سنرى كيف تتغير عند نقل الكلام.",
  rows: [
    { direct: "can", reported: "could" },
    { direct: "may", reported: "might" },
    { direct: "will", reported: "would" },
    { direct: "shall", reported: "should / would", note: "بحسب السياق" },
    { direct: "must", reported: "had to", note: "غالبًا للالتزام" },
    { direct: "could", reported: "could", note: "تبقى كما هي" },
    { direct: "should", reported: "should", note: "تبقى كما هي" },
    { direct: "would", reported: "would", note: "تبقى كما هي" },
    { direct: "might", reported: "might", note: "تبقى كما هي" },
    { direct: "ought to", reported: "ought to", note: "تبقى كما هي" },
  ],
  examples: [
    {
      direct: 'He said, "I can swim."',
      directAr: "قال: «أستطيع السباحة».",
      reported: "He said that he could swim.",
      reportedAr: "قال إنه يستطيع السباحة.",
      changes: [{ from: "can", to: "could", kind: "modal" }],
    },
    {
      direct: 'Sara said, "I may come later."',
      directAr: "قالت سارة: «قد آتي لاحقًا».",
      reported: "Sara said that she might come later.",
      reportedAr: "قالت سارة إنها قد تأتي لاحقًا.",
      changes: [{ from: "may", to: "might", kind: "modal" }],
    },
    {
      direct: 'Ali said, "I must study."',
      directAr: "قال علي: «يجب أن أدرس».",
      reported: "Ali said that he had to study.",
      reportedAr: "قال علي إنه كان عليه أن يدرس.",
      changes: [{ from: "must", to: "had to", kind: "modal", note: "التزام" }],
    },
    {
      direct: 'The teacher said, "You should revise your lessons."',
      directAr: "قال المعلم: «ينبغي أن تراجعوا دروسكم».",
      reported: "The teacher said that we should revise our lessons.",
      reportedAr: "قال المعلم إنه ينبغي لنا مراجعة دروسنا.",
      changes: [
        { from: "should", to: "should", kind: "modal", note: "لاحظ أن should بقيت كما هي." },
        { from: "You", to: "we", kind: "pronoun", note: "الراوي هنا أحد الطلاب، لذلك تحوّلت you إلى we." },
        { from: "your", to: "our", kind: "pronoun" },
      ],
    },
    {
      direct: 'He said, "I could help you."',
      directAr: "قال: «كان بإمكاني مساعدتك».",
      reported: "He said that he could help me.",
      reportedAr: "قال إنه كان بإمكانه مساعدتي.",
      changes: [
        { from: "could", to: "could", kind: "modal", note: "لاحظ أن could بقيت كما هي." },
        { from: "you", to: "me", kind: "pronoun", note: "المخاطَب هو الراوي نفسه." },
      ],
    },
  ] as ShiftPair60[],
};

// ------------------------------------------------------------
// القسم الثامن · الموضوعات 16–18: متى لا نغير الزمن؟
// ------------------------------------------------------------

export const EXCEPTIONS_60 = {
  facts: {
    n: 16,
    title: "الحقائق العامة والثوابت العلمية",
    lead: "إذا كانت الجملة تتحدث عن حقيقة عامة أو حقيقة علمية ثابتة، فيمكننا إبقاء الزمن كما هو.",
    anchor: {
      direct: 'The teacher said, "The Earth revolves around the Sun."',
      directAr: "قال المعلم: «تدور الأرض حول الشمس».",
      reported: "The teacher said that the Earth revolves around the Sun.",
      reportedAr: "قال المعلم إن الأرض تدور حول الشمس.",
      changes: [{ from: "revolves", to: "revolves", kind: "tense", note: "أبقينا revolves ولم نحولها إلى revolved، لأن دوران الأرض حول الشمس حقيقة علمية ثابتة." }],
    } as ShiftPair60,
    examples: [
      {
        direct: 'The teacher said, "Water boils at 100°C at standard atmospheric pressure."',
        directAr: "قال المعلم: «يغلي الماء عند 100 درجة مئوية تحت الضغط الجوي القياسي».",
        reported: "The teacher said that water boils at 100°C at standard atmospheric pressure.",
        reportedAr: "قال المعلم إن الماء يغلي عند 100 درجة مئوية تحت الضغط الجوي القياسي.",
      },
      {
        direct: 'My father said, "The Earth is round."',
        directAr: "قال أبي: «الأرض كروية».",
        reported: "My father said that the Earth is round.",
        reportedAr: "قال أبي إن الأرض كروية.",
      },
      {
        direct: 'The science teacher said, "Plants need sunlight."',
        directAr: "قال معلم العلوم: «النباتات تحتاج إلى ضوء الشمس».",
        reported: "The science teacher said that plants need sunlight.",
        reportedAr: "قال معلم العلوم إن النباتات تحتاج إلى ضوء الشمس.",
      },
    ] as ShiftPair60[],
  },
  stillTrue: {
    n: 17,
    title: "إذا كان الكلام لا يزال صحيحًا",
    lead: "إذا كان الكلام لا يزال صحيحًا وقت نقله، فقد نبقي الزمن في المضارع، خاصةً في المحادثة اليومية.",
    anchor: {
      direct: 'Sara said, "I live in Ankara."',
      directAr: "قالت سارة: «أنا أعيش في أنقرة».",
      condition: "إذا كانت سارة ما زالت تعيش في أنقرة:",
      reported: "Sara said that she lives in Ankara.",
      reportedAr: "قالت سارة إنها تعيش في أنقرة.",
      also: "Sara said that she lived in Ankara.",
      choiceNote:
        "والاختيار هنا يعتمد على ما إذا كنت تريد إبراز استمرار الحقيقة حاليًا أم نقل الكلام وفق قاعدة الرجوع التقليدية.",
    },
    second: {
      direct: 'Ali said, "I work at a hospital."',
      directAr: "قال علي: «أنا أعمل في مستشفى».",
      reported: "Ali said that he works at a hospital.",
      reportedAr: "قال علي إنه يعمل في مستشفى.",
      note: "إذا كان لا يزال يعمل هناك.",
    },
  },
  presentVerb: {
    n: 18,
    title: "إذا كان فعل النقل في المضارع",
    lead: "إذا استخدمنا says أو tells بدل said أو told، فلا نحتاج عادةً إلى إرجاع الزمن.",
    examples: [
      {
        direct: 'Sara says, "I am tired."',
        directAr: "تقول سارة: «أنا متعب».",
        reported: "Sara says that she is tired.",
        reportedAr: "تقول سارة إنها متعبة.",
      },
      {
        direct: 'Ali says, "I like football."',
        directAr: "يقول علي: «أنا أحب كرة القدم».",
        reported: "Ali says that he likes football.",
        reportedAr: "يقول علي إنه يحب كرة القدم.",
      },
    ] as ShiftPair60[],
    contrast: "says → لا يفرض عادةً Backshift. said → غالبًا يؤدي إلى Backshift.",
  },
};

// ------------------------------------------------------------
// القسم التاسع · الموضوع 19: خطوات تحويل الجملة + التطبيق الكامل
// ------------------------------------------------------------

export const STEPS_60 = {
  n: 19,
  title: "الطريقة المنظمة للتحويل",
  lead: "عندما تواجه أي جملة خبرية في Direct Speech، اتبع الخطوات التالية:",
  steps: [
    "حدد فعل النقل: said أو told.",
    "حدد المتحدث الأصلي.",
    "حدد الضمائر التي تشير إلى المتحدث أو المستمع.",
    "حدد زمن الجملة داخل علامتي الاقتباس.",
    "إذا كان فعل النقل في الماضي، طبّق Backshift غالبًا.",
    "غيّر كلمات الزمان والمكان إذا تغير السياق.",
    "أزل علامتي الاقتباس.",
    "استخدم that إذا أردت، ويمكن حذفها في كثير من الجمل الخبرية.",
  ],
  worked: {
    direct: 'Ahmed said to me, "I am studying English here today."',
    directAr: "قال أحمد لي: «أنا أدرس الإنجليزية هنا اليوم».",
    stages: [
      { label: "الخطوة ① · فعل النقل", value: "said to me", becomes: "told me", note: "يمكننا تحويله إلى told me." },
      { label: "الخطوة ② · المتحدث", value: "Ahmed", becomes: "Ahmed", note: "المتحدث الأصلي هو أحمد." },
      { label: "الخطوة ③ · الضمائر", value: "I", becomes: "he", note: "I تشير إلى أحمد." },
      { label: "الخطوة ④ · الزمن", value: "am studying", becomes: "was studying", note: "Present Continuous → Past Continuous." },
      { label: "الخطوة ⑤ · المكان", value: "here", becomes: "there", note: "تغيّر المكان." },
      { label: "الخطوة ⑥ · الزمان", value: "today", becomes: "that day", note: "تغيّر اليوم." },
    ],
    result: "Ahmed told me that he was studying English there that day.",
    resultAr: "أخبرني أحمد بأنه كان يدرس الإنجليزية هناك في ذلك اليوم.",
    summary: ["said to → told", "I → he", "am studying → was studying", "here → there", "today → that day"],
    closing: "لاحظ أننا غيّرنا خمسة عناصر. هذه هي الطريقة التي نريدك أن تتقنها.",
  },
};

// ------------------------------------------------------------
// القسم العاشر · الموضوع 20: عشرة أمثلة متنوعة محلولة
// ------------------------------------------------------------

export const SOLVED_60 = [
  { label: "المثال الأول", tense: "Present Simple", direct: 'Mona said, "I drink coffee every morning."', reported: "Mona said that she drank coffee every morning.", ar: "قالت منى إنها تشرب القهوة كل صباح." },
  { label: "المثال الثاني", tense: "Present Continuous", direct: 'Ali said, "I am watching a film."', reported: "Ali said that he was watching a film.", ar: "قال علي إنه كان يشاهد فيلمًا." },
  { label: "المثال الثالث", tense: "Present Perfect", direct: 'Sara said, "I have finished the book."', reported: "Sara said that she had finished the book.", ar: "قالت سارة إنها أنهت الكتاب." },
  { label: "المثال الرابع", tense: "Past Simple", direct: 'Omar said, "I bought a new bicycle."', reported: "Omar said that he had bought a new bicycle.", ar: "قال عمر إنه اشترى دراجة جديدة." },
  { label: "المثال الخامس", tense: "Past Continuous", direct: 'They said, "We were waiting outside."', reported: "They said that they had been waiting outside.", ar: "قالوا إنهم كانوا ينتظرون في الخارج." },
  { label: "المثال السادس", tense: "Future Simple", direct: 'My brother said, "I will call you."', reported: "My brother said that he would call me.", ar: "قال أخي إنه سيتصل بي." },
  { label: "المثال السابع", tense: "CAN", direct: 'She said, "I can speak French."', reported: "She said that she could speak French.", ar: "قالت إنها تستطيع التحدث بالفرنسية." },
  { label: "المثال الثامن", tense: "MAY", direct: 'He said, "I may visit you."', reported: "He said that he might visit me.", ar: "قال إنه قد يزورني." },
  { label: "المثال التاسع", tense: "MUST", direct: 'The doctor said, "You must rest."', reported: "The doctor told me that I had to rest.", ar: "أخبرني الطبيب بأنه يجب عليّ أن أرتاح." },
  { label: "المثال العاشر", tense: "حقيقة علمية", direct: 'The teacher said, "The Sun rises in the east."', reported: "The teacher said that the Sun rises in the east.", ar: "قال المعلم إن الشمس تشرق من الشرق." },
];

// ------------------------------------------------------------
// القسم الحادي عشر · الموضوعات 21–27: الأخطاء السبعة
// ------------------------------------------------------------

export type Error60 = {
  n: number;
  title: string;
  wrong: string;
  right: string;
  rightAlt?: string;
  why: string;
  note?: string;
};

export const ERRORS_60: Error60[] = [
  {
    n: 21,
    title: "الخطأ الأول: نسيان تغيير الضمير",
    wrong: "Ali said that I was tired.",
    right: "Ali said that he was tired.",
    why: "إذا كان علي هو المتحدث وكان يقصد نفسه، فالضمير I يجب أن تصبح he.",
    note: "المقصود أن عليًا يتحدث عن نفسه.",
  },
  {
    n: 22,
    title: "الخطأ الثاني: استخدام said مع الشخص مباشرةً",
    wrong: "He said me that he was busy.",
    right: "He told me that he was busy.",
    rightAlt: "He said to me that he was busy.",
    why: "said لا يأتي بعدها الشخص مباشرةً؛ نستخدم told + الشخص أو said to + الشخص.",
  },
  {
    n: 23,
    title: "الخطأ الثالث: نسيان رجوع الزمن",
    wrong: "He said that he is happy.",
    right: "He said that he was happy.",
    why: 'في القاعدة التقليدية، am في كلام مثل "I am happy" تتحول إلى was. لكن إذا كان لا يزال سعيدًا، فقد يبقى المضارع مناسبًا في سياق معين.',
  },
  {
    n: 24,
    title: "الخطأ الرابع: تحويل Past Perfect مرة أخرى",
    wrong: 'He said, "I had finished the work."',
    right: "He said that he had finished the work.",
    why: "لا نغيّر had finished إلى زمن أقدم؛ الماضي التام يبقى ماضيًا تامًا.",
    note: "هنا الجملة الأصلية صحيحة، والخطأ هو محاولة إرجاع الزمن مرة أخرى.",
  },
  {
    n: 25,
    title: "الخطأ الخامس: نسيان تغيير كلمات الزمان",
    wrong: "She said that she would come tomorrow.",
    right: "She said that she would come the following day.",
    why: 'لا نحتفظ بـ tomorrow من جملة "I will come tomorrow" إذا كان يوم النقل مختلفًا عن يوم الكلام الأصلي.',
  },
  {
    n: 26,
    title: "الخطأ السادس: تغيير الحقيقة العلمية دون داعٍ",
    wrong: "The teacher said that water froze at 0°C.",
    right: "The teacher said that water freezes at 0°C.",
    why: 'جملة "Water freezes at 0°C" حقيقة عامة؛ الأفضل إبقاء الزمن كما هو.',
  },
  {
    n: 27,
    title: "الخطأ السابع: الخلط بين SAID وTOLD",
    wrong: "She told that she was tired.",
    right: "She said that she was tired.",
    rightAlt: "She told me that she was tired.",
    why: "told تحتاج إلى شخص بعدها؛ إن لم نذكر الشخص نستخدم said.",
  },
];

// ------------------------------------------------------------
// القسم الثاني عشر · الموضوع 28: الحوار التطبيقي
// ------------------------------------------------------------

export const DIALOGUE_60 = {
  n: 28,
  title: "At School — في المدرسة",
  turns: [
    { who: "Mona", en: "What did Ahmed say about the exam?", ar: "ماذا قال أحمد عن الامتحان؟" },
    { who: "Sara", en: 'He said, "I am preparing for it."', ar: "قال: «أنا أستعد له»." },
    { who: "Mona", en: "Did he say anything about the questions?", ar: "هل قال شيئًا عن الأسئلة؟" },
    { who: "Sara", en: 'Yes. He said, "The questions are difficult."', ar: "نعم. قال: «الأسئلة صعبة»." },
    { who: "Mona", en: "What did the teacher say?", ar: "ماذا قال المعلم؟" },
    { who: "Sara", en: 'She told us, "You must revise all the lessons."', ar: "أخبرتنا: «يجب عليكم مراجعة جميع الدروس»." },
    { who: "Mona", en: "Did Ahmed say when he would finish?", ar: "هل قال أحمد متى سينتهي؟" },
    { who: "Sara", en: 'Yes. He said, "I will finish tonight."', ar: "نعم. قال: «سأنتهي الليلة»." },
  ],
  reportedTitle: "الآن انقلي الحوار باستخدام Reported Speech",
  reportedIntro: "Sara explained:",
  reported: [
    { en: "Ahmed said that he was preparing for the exam.", ar: "قال أحمد إنه كان يستعد للامتحان." },
    { en: "He also said that the questions were difficult.", ar: "وقال أيضًا إن الأسئلة كانت صعبة." },
    { en: "The teacher told us that we had to revise all the lessons.", ar: "وأخبرنا المعلم أنه كان علينا مراجعة جميع الدروس." },
    { en: "Ahmed said that he would finish that night.", ar: "وقال أحمد إنه سينتهي في تلك الليلة." },
  ] as Line60[],
  qa: [
    { q: "What was Ahmed preparing for?", a: "He was preparing for the exam.", ar: "كان يستعد للامتحان." },
    { q: "What did Ahmed say about the questions?", a: "He said that the questions were difficult.", ar: "قال إن الأسئلة كانت صعبة." },
    { q: "What did the teacher tell the students?", a: "She told them that they had to revise all the lessons.", ar: "أخبرتهم أنه كان عليهم مراجعة جميع الدروس." },
    { q: "When did Ahmed say he would finish?", a: "He said that he would finish that night.", ar: "قال إنه سينتهي في تلك الليلة." },
  ],
};

// ------------------------------------------------------------
// القسم الثالث عشر · الموضوع 29: قطعة القراءة
// ------------------------------------------------------------

export const READING_60 = {
  n: 29,
  title: "A Conversation About a School Project",
  titleAr: "محادثة حول مشروع مدرسي",
  paragraphs: [
    "Last Monday, our teacher announced a new school project. She said that all students had to participate. She explained that the project would help us improve our research skills.",
    "Ahmed said that he was interested in science and that he wanted to work on an environmental topic.",
    "Sara told the teacher that she had already collected some information about recycling.",
    "The teacher said that students could work in small groups. She also explained that each group would present its project the following week.",
    "At the end of the lesson, Omar said that he would prepare the presentation, while his friends would collect pictures and information.",
  ],
  translation: [
    "في يوم الاثنين الماضي، أعلنت معلمتنا عن مشروع مدرسي جديد. وقالت إن جميع الطلاب يجب أن يشاركوا. وشرحت أن المشروع سيساعدنا على تحسين مهارات البحث لدينا.",
    "قال أحمد إنه مهتم بالعلوم وإنه يريد العمل على موضوع بيئي.",
    "وأخبرت سارة المعلمة بأنها جمعت بالفعل بعض المعلومات عن إعادة التدوير.",
    "وقالت المعلمة إن الطلاب يستطيعون العمل في مجموعات صغيرة. كما شرحت أن كل مجموعة ستقدم مشروعها في الأسبوع التالي.",
    "وفي نهاية الدرس، قال عمر إنه سيُعد العرض التقديمي، بينما سيجمع أصدقاؤه الصور والمعلومات.",
  ],
  gloss: [
    { en: "announced", ar: "أعلنت" },
    { en: "participate", ar: "يشاركوا" },
    { en: "research skills", ar: "مهارات البحث" },
    { en: "environmental topic", ar: "موضوع بيئي" },
    { en: "recycling", ar: "إعادة التدوير" },
    { en: "the following week", ar: "الأسبوع التالي" },
    { en: "presentation", ar: "العرض التقديمي" },
  ],
  qa: [
    { q: "When did the teacher announce the project?", a: "She announced it last Monday.", ar: "أعلنته يوم الاثنين الماضي." },
    { q: "What did the teacher say about participation?", a: "She said that all students had to participate.", ar: "قالت إن جميع الطلاب يجب أن يشاركوا." },
    { q: "What was Ahmed interested in?", a: "He was interested in science.", ar: "كان مهتمًا بالعلوم." },
    { q: "What had Sara collected?", a: "She had collected information about recycling.", ar: "كانت قد جمعت معلومات عن إعادة التدوير." },
    { q: "How could students work?", a: "They could work in small groups.", ar: "كان بإمكانهم العمل في مجموعات صغيرة." },
    { q: "When would each group present its project?", a: "They would present it the following week.", ar: "كانوا سيقدمونه في الأسبوع التالي." },
    { q: "What would Omar prepare?", a: "He would prepare the presentation.", ar: "كان سيُعد العرض التقديمي." },
    { q: "What would his friends collect?", a: "They would collect pictures and information.", ar: "كانوا سيجمعون الصور والمعلومات." },
  ],
};

// ------------------------------------------------------------
// القسم السادس عشر · الموضوع 36: مهمة الكتابة — والموضوع 37: مهمة التحدث
// ------------------------------------------------------------

export const WRITING_60 = {
  n: 36,
  title: "What My Friend Told Me",
  titleAr: "مهمة الكتابة: ماذا أخبرني صديقي",
  instruction: "اكتب فقرة باللغة الإنجليزية بعنوان «What My Friend Told Me — ماذا أخبرني صديقي»: اكتب من 8 إلى 12 جملة تنقل فيها ما قاله لك صديقك عن حياته ودراسته وخططه.",
  structures: [
    "said that",
    "told me that",
    "Present Simple → Past Simple",
    "Present Continuous → Past Continuous",
    "Present Perfect → Past Perfect",
    "will → would",
    "can → could",
    "tomorrow → the following day",
  ],
  model: [
    "What My Friend Told Me",
    "Yesterday, my friend Ahmed told me that he was very busy. He said that he studied English every evening. He also told me that he was preparing for an important exam.",
    "He said that he had finished two books and that he would read another book the following week.",
    "He told me that he could understand English better than before. He also said that he would visit his grandparents the following day.",
    "I was happy because he told me that he was making good progress.",
  ],
  modelAr: [
    "ماذا أخبرني صديقي",
    "أمس أخبرني صديقي أحمد بأنه مشغول جدًا. وقال إنه يدرس الإنجليزية كل مساء. كما أخبرني بأنه كان يستعد لامتحان مهم.",
    "وقال إنه أنهى كتابين وإنه سيقرأ كتابًا آخر في الأسبوع التالي.",
    "وأخبرني بأنه يستطيع فهم الإنجليزية بصورة أفضل من السابق. وقال أيضًا إنه سيزور جديه في اليوم التالي.",
    "كنت سعيدًا لأنه أخبرني بأنه يحقق تقدمًا جيدًا.",
  ],
};

export const SPEAKING_60 = {
  n: 37,
  title: "مهمة التحدث",
  prompt: "What did your friend tell you yesterday?",
  promptAr: "ماذا أخبرك صديقك أمس؟",
  intro: "تخيل أن معلمك سألك هذا السؤال، وأجب باستخدام الكلام المنقول. يمكنك استخدام هذا النموذج:",
  model: [
    { en: "My friend told me that he was tired.", ar: "أخبرني صديقي بأنه كان متعبًا." },
    { en: "He said that he had a lot of homework.", ar: "قال إن لديه الكثير من الواجبات." },
    { en: "He also told me that he would study in the evening.", ar: "وأخبرني أيضًا بأنه سيدرس في المساء." },
    { en: "He said that he could finish everything before bedtime.", ar: "قال إنه يستطيع إنهاء كل شيء قبل موعد النوم." },
  ] as Line60[],
  extraTitle: "تدريب إضافي",
  extra: "تحدث عن ثلاثة أشخاص مختلفين: صديقك، وأحد أفراد عائلتك، ومعلمك. انقل جملة واحدة على الأقل قالها كل شخص، واستخدم said وtold بصورة صحيحة.",
};

// ------------------------------------------------------------
// القسم السابع عشر · الموضوع 38: الملخص النهائي
// ------------------------------------------------------------

export const SUMMARY_60 = {
  n: 38,
  title: "القواعد التي يجب أن تتقنها",
  groups: [
    {
      title: "أولًا: الفرق بين الكلام المباشر والمنقول",
      lines: [
        { en: 'He said, "I am tired."', ar: "Direct Speech" },
        { en: "He said that he was tired.", ar: "Reported Speech" },
      ],
    },
    {
      title: "ثانيًا: الفرق بين SAID وTOLD",
      lines: [
        { en: "said + that + الجملة", ar: "بدون ذكر الشخص" },
        { en: "told + الشخص + that + الجملة", ar: "مع ذكر من تلقّى الكلام" },
      ],
    },
    {
      title: "ثالثًا: تحويل الأزمنة",
      chips: [
        "Present Simple → Past Simple",
        "Present Continuous → Past Continuous",
        "Present Perfect → Past Perfect",
        "Past Simple → Past Perfect",
        "Past Continuous → Past Perfect Continuous",
        "will → would",
        "can → could",
        "may → might",
        "must → had to غالبًا عند التعبير عن الالتزام.",
      ],
    },
    {
      title: "رابعًا: تغيير الضمائر",
      chips: ["I → he / she", "we → they", "my → his / her", "our → their", "you → يتغير بحسب الشخص المقصود."],
    },
    {
      title: "خامسًا: تغيير الزمان والمكان",
      chips: [
        "now → then",
        "today → that day",
        "yesterday → the previous day",
        "tomorrow → the following day",
        "here → there",
        "this → that",
        "these → those",
        "next week → the following week.",
      ],
    },
    {
      title: "سادسًا: متى لا نغير الزمن؟",
      lines: [
        { en: "①", ar: "عندما يكون فعل النقل في المضارع، مثل says." },
        { en: "②", ar: "عندما تكون الجملة حقيقة علمية أو حقيقة عامة ثابتة." },
        { en: "③", ar: "عندما يكون الكلام لا يزال صحيحًا، ويمكن أن نبقي الزمن في المضارع بحسب السياق." },
      ],
    },
  ],
};

// ------------------------------------------------------------
// القسم السابع عشر · الموضوع 39: اختبار الفهم السريع
// ------------------------------------------------------------

export const QUICK_CHECK_60 = {
  n: 39,
  title: "اختبار الفهم السريع",
  lead: "قبل الانتقال إلى الدرس القادم، حاول أن تجيب عن هذه الأسئلة ذهنيًا، ثم اكشف الإجابة لتتأكد.",
  items: [
    { q: "ما الفرق بين Direct Speech وReported Speech؟", a: "الكلام المباشر ينقل كلام الشخص كما قاله تمامًا بين علامتي اقتباس، والكلام المنقول ينقل المعنى دون الالتزام بالكلمات نفسها." },
    { q: "لماذا نقول said that ولا نقول said me that؟", a: "لأن said لا يأتي بعده الشخص مباشرةً؛ نقول said that أو said to me that." },
    { q: "ما الفرق بين said وtold؟", a: "said + that + الجملة، أما told فتأتي told + الشخص + that + الجملة." },
    { q: "إلى ماذا يتحول Present Simple؟", a: "Past Simple." },
    { q: "إلى ماذا يتحول Present Perfect؟", a: "Past Perfect." },
    { q: "إلى ماذا يتحول will؟", a: "would." },
    { q: "إلى ماذا يتحول can؟", a: "could." },
    { q: 'لماذا تتحول I إلى he في جملة Ahmed said, "I am tired"؟', a: "لأن I تشير إلى المتحدث الأصلي أحمد، وعندما ننقل كلامه نستخدم he." },
    { q: "إلى ماذا تتحول tomorrow؟", a: "the following day / the next day." },
    { q: "متى يمكننا إبقاء الزمن دون تغيير؟", a: "عندما يكون فعل النقل في المضارع مثل says، أو عندما تكون الجملة حقيقة علمية ثابتة، أو عندما يكون الكلام لا يزال صحيحًا." },
  ],
  closing: "إذا استطعت الإجابة عن هذه الأسئلة وتطبيق القواعد في التدريبات، فقد أصبحت مستعدًا للانتقال إلى الجزء التالي من Reported Speech.",
};
