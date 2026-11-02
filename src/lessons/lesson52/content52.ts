// ============================================================
// الدرس 52 — FIRST CONDITIONAL · محتوى القراءة والحوار والمهام
// ============================================================

export type DialogueLine52 = { speaker: string; en: string; ar: string };
export type ReadingParagraph52 = { en: string; ar: string };
export type Question52 = { q: string; a: string; ar?: string };

/** محادثة المصدر: Planning for the Weekend — ثمانية أدوار كاملة */
export const DIALOGUE_52: DialogueLine52[] = [
  { speaker: "Adam", en: "What will you do this weekend?", ar: "ماذا ستفعل في عطلة نهاية الأسبوع؟" },
  { speaker: "Lina", en: "If the weather is good, I will go to the beach.", ar: "إذا كان الطقس جيدًا، فسأذهب إلى الشاطئ." },
  { speaker: "Adam", en: "That sounds great! Will you go alone?", ar: "هذا يبدو رائعًا! هل ستذهبين وحدك؟" },
  { speaker: "Lina", en: "No. If my friends are free, they will come with me.", ar: "لا. إذا كان أصدقائي متفرغين، فسيأتون معي." },
  { speaker: "Adam", en: "What will you do if it rains?", ar: "ماذا ستفعلين إذا أمطرت السماء؟" },
  { speaker: "Lina", en: "If it rains, we will stay at home and watch a movie.", ar: "إذا أمطرت، فسنظل في المنزل ونشاهد فيلمًا." },
  { speaker: "Adam", en: "And if you don't find a good movie?", ar: "وماذا إذا لم تجدي فيلمًا جيدًا؟" },
  { speaker: "Lina", en: "We can play board games instead.", ar: "يمكننا لعب ألعاب الطاولة بدلًا من ذلك." },
  { speaker: "Adam", en: "Good idea! If I finish my work early, I might join you.", ar: "فكرة جيدة! إذا أنهيت عملي مبكرًا، فقد أنضم إليكم." },
  { speaker: "Lina", en: "Great! If you come, bring some snacks.", ar: "رائع! إذا أتيت، فأحضر بعض الوجبات الخفيفة." },
];

export const DIALOGUE_QUESTIONS_52: Question52[] = [
  { q: "Where will Lina go if the weather is good?", a: "She will go to the beach." },
  { q: "What will Lina do if it rains?", a: "They will stay at home and watch a movie." },
  {
    q: "What will Lina and her friends do if they don't find a good movie?",
    a: "They can play board games.",
  },
  { q: "When might Adam join them?", a: "He might join them if he finishes his work early." },
  { q: "What should Adam bring if he comes?", a: "He should bring some snacks." },
];

/** قطعة القراءة: Preparing for the School Competition — ست فقرات كاملة */
export const READING_52: ReadingParagraph52[] = [
  {
    en: "Our school will organize a science competition next month. Many students want to participate because the winners will receive special prizes.",
    ar: "ستنظم مدرستنا مسابقة علمية في الشهر القادم. يرغب العديد من الطلاب في المشاركة؛ لأن الفائزين سيحصلون على جوائز خاصة.",
  },
  {
    en: "Sara wants to join the competition. If she has enough time, she will prepare a science project about renewable energy. If she needs help, she will ask her science teacher.",
    ar: "تريد سارة الانضمام إلى المسابقة. إذا كان لديها وقت كافٍ، فستُعد مشروعًا علميًا عن الطاقة المتجددة. وإذا احتاجت إلى مساعدة، فستطلب المساعدة من معلم العلوم.",
  },
  {
    en: "Her friend Omar also wants to participate. If he finishes his project early, he will help Sara with her presentation.",
    ar: "يريد صديقها عمر المشاركة أيضًا. إذا أنهى مشروعه مبكرًا، فسيساعد سارة في إعداد عرضها التقديمي.",
  },
  {
    en: "The students know that they will succeed only if they work hard and prepare carefully. If they don't practice their presentations, they may feel nervous during the competition.",
    ar: "يعرف الطلاب أنهم سينجحون فقط إذا عملوا بجد واستعدوا بعناية. وإذا لم يتدربوا على عروضهم التقديمية، فقد يشعرون بالتوتر أثناء المسابقة.",
  },
  {
    en: "The teacher has given them some advice. If they have any questions, they should ask before the competition. If they follow the instructions, they will have a better chance of doing well.",
    ar: "قدم لهم المعلم بعض النصائح. إذا كانت لديهم أي أسئلة، فعليهم أن يسألوا قبل المسابقة. وإذا اتبعوا التعليمات، فستكون لديهم فرصة أفضل لتحقيق أداء جيد.",
  },
  {
    en: 'Sara is excited. She says, "If we work together, we can create something wonderful!"',
    ar: "سارة متحمسة. وتقول: «إذا عملنا معًا، فيمكننا أن ننجز شيئًا رائعًا!».",
  },
];

export const READING_TRANSLATION_52: { en: string; ar: string }[] = READING_52.map((paragraph) => ({
  en: paragraph.en,
  ar: paragraph.ar,
}));

export const READING_QUESTIONS_52: Question52[] = [
  { q: "When will the school organize the science competition?", a: "The school will organize it next month." },
  {
    q: "What will Sara prepare if she has enough time?",
    a: "She will prepare a science project about renewable energy.",
  },
  { q: "Who will Sara ask if she needs help?", a: "She will ask her science teacher." },
  {
    q: "What will Omar do if he finishes his project early?",
    a: "He will help Sara with her presentation.",
  },
  {
    q: "What may happen if the students don't practice?",
    a: "They may feel nervous during the competition.",
  },
  { q: "What should the students do if they have questions?", a: "They should ask before the competition." },
  { q: "What can the students achieve if they work together?", a: "They can create something wonderful." },
];

/** صيد لغوي من قطعة القراءة — إجابات مقبولة بعد المحاولة */
export const READING_HUNT_52: {
  prompt: string;
  hint: string;
  accept: string[];
  model: string;
  why: string;
}[] = [
  {
    prompt: "أي جملة في النص تعبّر عن احتمال باستخدام may؟",
    hint: "ابحث في الفقرة الرابعة عن may.",
    accept: [
      "if they don't practice their presentations, they may feel nervous during the competition",
      "if they do not practice their presentations, they may feel nervous during the competition",
    ],
    model: "If they don't practice their presentations, they may feel nervous during the competition.",
    why: "may + V1 في النتيجة تعبّر عن احتمال حدوث التوتر، وليس يقينًا.",
  },
  {
    prompt: "أي جملة في النص تقدّم نصيحة باستخدام should؟",
    hint: "ابحث في الفقرة الخامسة.",
    accept: [
      "if they have any questions, they should ask before the competition",
      "if they have questions, they should ask before the competition",
    ],
    model: "If they have any questions, they should ask before the competition.",
    why: "should + V1 في النتيجة تعبّر عن نصيحة، وهي الصيغة التي استخدمها المعلم.",
  },
  {
    prompt: "أي جملة في النص تستخدم can في النتيجة؟",
    hint: "اقرأ كلام سارة في النهاية.",
    accept: [
      "if we work together, we can create something wonderful",
      "if we work together we can create something wonderful",
    ],
    model: "If we work together, we can create something wonderful!",
    why: "can + V1 تعبّر عن إمكانية وقدرة، وهي من الأفعال الناقصة المسموحة في نتيجة الشرط الأول.",
  },
  {
    prompt: "ما الشرط في الجملة: If she has enough time, she will prepare a science project?",
    hint: "الشرط هو الجزء الذي يبدأ بـIf.",
    accept: ["if she has enough time", "she has enough time"],
    model: "If she has enough time",
    why: "الجزء بعد If هو الشرط، ويأتي في المضارع البسيط has مع الفاعل she.",
  },
  {
    prompt: "ما النتيجة في الجملة: If he finishes his project early, he will help Sara?",
    hint: "النتيجة هي الجزء الذي يحتوي will.",
    accept: ["he will help sara with her presentation", "he will help sara", "he will help sara with the presentation"],
    model: "He will help Sara with her presentation.",
    why: "النتيجة تستخدم will + V1، وهي هنا will help.",
  },
];

/** Writing Task */
export const WRITING_52 = {
  title: "My Plans for the Future",
  instructions: [
    "اكتب فقرة من 8 إلى 12 جملة باللغة الإنجليزية.",
    "استخدم First Conditional في خمس جمل على الأقل.",
    "اكتب عن خططك المستقبلية ونتائجها المحتملة.",
    "استخدم will أو can أو may أو might أو should أو الأمر في النتائج.",
  ],
  ideas: [
    "ماذا ستفعل إذا نجحت في امتحاناتك؟",
    "ماذا ستفعل إذا حصلت على وقت فراغ؟",
    "ماذا ستفعل إذا زرت بلدًا جديدًا؟",
    "ماذا ستفعل إذا واجهت مشكلة؟",
    "ماذا ستفعل إذا حصلت على فرصة جديدة؟",
  ],
  starters: ["If I pass all my exams, I will...", "If I have enough free time, I will..."],
  model: `My Plans for the Future

I have many plans for the future. If I pass all my exams, I will celebrate with my family. If I get good grades, I will continue working hard. If I have enough money, I will travel to another country. If I visit a new country, I will learn about its culture. If I face a difficult problem, I will try to solve it calmly. If I work hard every day, I can achieve many of my dreams. I will also try to help other people.`,
};

/** Speaking Task */
export const SPEAKING_52 = {
  title: "Future Possibilities — تحدث عن المواقف المستقبلية",
  instructions: [
    "تخيّل أنك تتحدث مع صديق عن المواقف المستقبلية.",
    "أجب بصوت مرتفع بجمل كاملة، لا بكلمات منفردة.",
    "استخدم If + Present Simple ثم will/can/may/might/should/الأمر.",
  ],
  questions: [
    "What will you do if you have a free day tomorrow?",
    "What will you do if you lose your phone?",
    "What will you do if your best friend needs help?",
    "What will happen if people stop protecting the environment?",
    "What will you do if you travel to another country?",
    "What will you do if you fail an important exam?",
    "What will you do if you become famous?",
  ],
  example: {
    q: "What will you do if you have a free day tomorrow?",
    a: "If I have a free day tomorrow, I will visit my grandparents.",
  },
  starters: [
    "If I have a free day tomorrow, I will...",
    "If I lose my phone, I will...",
    "If my best friend needs help, I will...",
    "If people stop protecting the environment, ... will happen.",
    "If I travel to another country, I will...",
    "If I fail an important exam, I will...",
    "If I become famous, I will...",
  ],
};

/** الملخص النهائي — اثنتا عشرة نقطة من المصدر */
export const SUMMARY_52: string[] = [
  "القاعدة الأساسية: If + Present Simple, will + V1.",
  "نستخدم First Conditional للتحدث عن الاحتمالات الواقعية في المستقبل.",
  "لا نستخدم will عادةً بعد If في هذا التركيب.",
  "نضيف s أو es مع he وshe وit في المضارع البسيط.",
  "بعد don't وdoesn't نستخدم الفعل الأساسي V1.",
  "يمكن استخدام won't للنفي في النتيجة.",
  "يمكن استخدام can وmay وmight وshould وmust في النتيجة حسب المعنى.",
  "يمكن استخدام فعل الأمر في نتيجة الشرط.",
  "Unless تعني If ... not، ولا نحتاج عادةً إلى إضافة don't بعدها.",
  "نستخدم المضارع البسيط بعد When وAs soon as وBefore وAfter وUntil عند الحديث عن المستقبل.",
  "Zero Conditional للحقائق والعادات العامة.",
  "First Conditional للاحتمالات المستقبلية الواقعية.",
];

export const GOLDEN_SENTENCES_52 = [
  { en: "If I study, I will pass the exam.", ar: "إذا درست، فسأنجح في الامتحان." },
  { en: "If she doesn't hurry, she will miss the bus.", ar: "إذا لم تسرع، فستفوتها الحافلة." },
  { en: "If you need help, call me.", ar: "إذا احتجت إلى مساعدة، فاتصل بي." },
  { en: "Unless you practice, you won't improve.", ar: "ما لم تتدرب، فلن تتحسن." },
  { en: "When I arrive, I will call you.", ar: "عندما أصل، سأتصل بك." },
];

export const SELF_CHECK_52 = [
  "أستطيع كتابة جملة شرط أول بالقاعدة If + Present Simple, will + V1.",
  "أعرف أن will لا تأتي عادةً بعد If.",
  "أضيف s أو es مع he/she/it في جملة الشرط.",
  "أستخدم doesn't + V1 في نفي الشرط.",
  "أكوّن سؤالًا بـWhat will ... if ...?",
  "أستخدم can وmay وmight وshould وmust في النتيجة.",
  "أستخدم الأمر في نتيجة الشرط.",
  "أفرّق بين Zero Conditional وFirst Conditional.",
  "أعيد صياغة If not باستخدام Unless.",
  "أستخدم When وAs soon as وBefore وAfter وUntil بالمضارع البسيط.",
  "أفرّق بين If وWhen في درجة التوقع.",
  "أصحح الأخطاء الشائعة في الشرط الأول.",
];

/** الأخطاء الستة — تُستخدم في شريحتي الأخطاء وفي كاشف الأخطاء */
export const ERRORS_52: { bad: string; ok: string; why: string }[] = [
  { bad: "If I will see him, I will tell him.", ok: "If I see him, I will tell him.", why: "نستخدم المضارع البسيط في جملة الشرط، لا will." },
  { bad: "If she study, she will pass.", ok: "If she studies, she will pass.", why: "الفاعل she يحتاج إلى s في المضارع البسيط." },
  { bad: "If he doesn't studies, he will fail.", ok: "If he doesn't study, he will fail.", why: "بعد doesn't نستخدم V1." },
  { bad: "If I studied tomorrow, I will pass.", ok: "If I study tomorrow, I will pass.", why: "في الشرط الأول نستخدم المضارع البسيط، لا الماضي." },
  { bad: "If you study, you will can pass.", ok: "If you study, you can pass.", why: "لا نجمع will مع can بهذه الطريقة." },
  { bad: "When she will arrive, I will call you.", ok: "When she arrives, I will call you.", why: "نستخدم المضارع البسيط بعد when." },
];

export const PROGRESS_52 = {
  lesson: 52,
  total: 120,
  completed: 52,
  remaining: 68,
  percent: "43.3%",
  previous: [
    { n: 49, title: "Modal Perfect" },
    { n: 50, title: "Deduction & Speculation" },
    { n: 51, title: "Zero Conditional" },
    { n: 52, title: "First Conditional — اكتمل" },
  ],
  next: {
    n: 53,
    title: "SECOND CONDITIONAL",
    intro: "If I had a million dollars, I would buy a big house.",
    introAr: "لو كان لدي مليون دولار، لاشتريت منزلًا كبيرًا.",
    compare: [
      { label: "First Conditional", en: "If I have money, I will buy a car.", ar: "إذا كان لدي مال، فسأشتري سيارة." },
      { label: "Second Conditional", en: "If I had money, I would buy a car.", ar: "لو كان لدي مال، لاشتريت سيارة." },
    ],
    focus: "سنتعلم لماذا استخدمنا had وwould، وكيف نكوّن النفي والأسئلة، والفرق الدقيق بين الشرط الأول والثاني.",
  },
};
