// ============================================================
// Lesson 39 — بيانات الأنشطة التفاعلية
// المصدر: أمثلة الدرس 39 وحلوله المورّدة.
// كل بند موسوم بأصله:
//   origin: "source"            — نص أو مفتاح من المصدر المورّد.
//   origin: "platform"          — شرح/مشتق من إعداد المنصة (لا يغيّر نص المصدر).
// ============================================================

export type Choice39 = { value: string; label: string };
export type ChoiceItem39 = {
  id: string;
  prompt: string;
  lines?: string[];
  choices: Choice39[];
  accepted: string[];
  feedback: string;
  nuance?: string;
  origin?: "source" | "platform";
};

export const OBJECTIVES_39 = [
  "① فهم المعنى الحقيقي للمستقبل التام المستمر.",
  "② تكوين الجمل باستخدام will have been + V-ing.",
  "③ التعبير عن مدة نشاط بدأت قبل نقطة مستقبلية وستكون ممتدة حتى تلك النقطة.",
  "④ استخدام for وsince بصورة صحيحة.",
  "⑤ استخدام by وby the time مع المستقبل التام المستمر.",
  "⑥ تكوين الجمل المثبتة والمنفية والاستفهامية.",
  "⑦ طرح أسئلة باستخدام How long.",
  "⑧ التمييز بين Future Perfect وFuture Perfect Continuous.",
  "⑨ المقارنة بين Present Perfect Continuous وPast Perfect Continuous وFuture Perfect Continuous.",
  "⑩ حل تدريبات متدرجة واختبار نهائي من 25 سؤالًا.",
] as const;

/** نقاط الخط الزمني في §2 كما وردت: NOW · 4:00 · 5:00 · 6:00 · 7:00 · 8:00. */
export const TIMELINE_MOMENTS_39 = [
  {
    id: "now",
    clock: "NOW",
    label: "لحظة الكلام",
    role: "observation" as const,
    sentence: "Samer starts studying at 4:00 and plans to continue until 8:00.",
    arabic: "بدأ سامر دراسة اللغة الإنجليزية الساعة الرابعة عصرًا، ويخطط للاستمرار حتى الثامنة مساءً.",
    durationText: "لا نقيس مدة عند لحظة الكلام.",
  },
  {
    id: "start-4",
    clock: "4:00",
    label: "بداية الدراسة",
    role: "start" as const,
    sentence: "Samer starts studying English at 4:00.",
    arabic: "عند الرابعة تبدأ الدراسة — هذه نقطة البداية التي نحسب منها المدة.",
    durationText: "0 ساعات حتى الآن.",
  },
  {
    id: "h-5",
    clock: "5:00",
    label: "استمرار الدراسة",
    role: "ongoing" as const,
    sentence: "Samer is still studying at 5:00.",
    arabic: "النشاط ممتد داخل الفترة، ولم نصل بعد إلى نقطة القياس.",
    durationText: "4:00 → 5:00 = ساعة واحدة.",
  },
  {
    id: "h-6",
    clock: "6:00",
    label: "استمرار الدراسة",
    role: "ongoing" as const,
    sentence: "Samer is still studying at 6:00.",
    arabic: "النشاط ممتد داخل الفترة، ولم نصل بعد إلى نقطة القياس.",
    durationText: "4:00 → 6:00 = ساعتان.",
  },
  {
    id: "h-7",
    clock: "7:00",
    label: "استمرار الدراسة",
    role: "ongoing" as const,
    sentence: "Samer is still studying at 7:00.",
    arabic: "النشاط ممتد داخل الفترة، ولم نصل بعد إلى نقطة القياس.",
    durationText: "4:00 → 7:00 = 3 ساعات.",
  },
  {
    id: "ref-8",
    clock: "8:00",
    label: "نقطة المرجع المستقبلية",
    role: "reference" as const,
    sentence: "By 8:00, Samer will have been studying English for four hours.",
    arabic: "بحلول الساعة الثامنة، سيكون سامر قد أمضى أربع ساعات في دراسة الإنجليزية.",
    durationText: "4:00 → 8:00 = 4 ساعات.",
  },
] as const;

/** عناصر المشهد الثلاثة في §2 — تُعرض مع الخط الزمني. */
export const TIMELINE_ELEMENTS_39 = [
  "① بدأ النشاط قبل النقطة المستقبلية.",
  "② امتد النشاط خلال فترة زمنية.",
  "③ ننظر إلى مدة النشاط من نقطة مستقبلية محددة.",
] as const;

export const FIRST_USE_ITEMS_39: ChoiceItem39[] = [
  {
    id: "june-english",
    prompt: "بحلول حزيران القادم سأكون قد أمضيت سنتين في تعلم الإنجليزية. أي جملة تعبّر عن ذلك؟",
    choices: [
      { value: "a", label: "By next June, I will have been learning English for two years." },
      { value: "b", label: "By next June, I will learn English for two years." },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر: By next June, I will have been learning English for two years.",
    nuance: "الجملة (B) تتحدث عن وقوع التعلم في المستقبل، لا عن مدة ممتدة حتى حزيران القادم.",
    origin: "source",
  },
  {
    id: "cooking-6",
    prompt: "بحلول السادسة ستكون قد أمضت ثلاث ساعات في الطبخ.",
    choices: [
      { value: "a", label: "At 6:00, she cooks for three hours." },
      { value: "b", label: "By 6:00, she will have been cooking for three hours." },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: By 6:00, she will have been cooking for three hours.",
    origin: "source",
  },
  {
    id: "library-month",
    prompt: "بحلول نهاية هذا الشهر سيكونون قد أمضوا سنة في بناء المكتبة الجديدة.",
    choices: [
      { value: "a", label: "By the end of this month, they will have been building the new library for a year." },
      { value: "b", label: "By the end of this month, they will build the new library for a year." },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر نفسه: مدة البناء ممتدة حتى نهاية الشهر.",
    origin: "source",
  },
  {
    id: "midnight-travel",
    prompt: "بحلول منتصف الليل سنكون قد أمضينا اثنتي عشرة ساعة في السفر.",
    choices: [
      { value: "a", label: "By midnight, we will travel for twelve hours." },
      { value: "b", label: "By midnight, we will have been travelling for twelve hours." },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: By midnight, we will have been travelling for twelve hours.",
    origin: "source",
  },
  {
    id: "golden-question",
    prompt: "السؤال الذهبي: «عندما تصل إلى النقطة المستقبلية، كم ستكون مدة النشاط حتى تلك اللحظة؟» — إذا كان هذا هو التركيز، فأي زمن يناسب غالبًا؟",
    choices: [
      { value: "a", label: "Future Perfect Continuous" },
      { value: "b", label: "Future Simple" },
    ],
    accepted: ["a"],
    feedback: "المصدر: إذا كان التركيز على هذه المدة، فغالبًا سيكون Future Perfect Continuous مناسبًا.",
    nuance: "«غالبًا» كلمة المصدر: المعنى والسياق هما الحاسمان، لا الكلمة الدالة وحدها.",
    origin: "source",
  },
];

export const CONTINUATION_ITEMS_39: ChoiceItem39[] = [
  {
    id: "must-continue",
    prompt: "By 8:00, I will have been studying for four hours. هل تعني الجملة أن الدراسة ستتوقف عند الثامنة؟",
    choices: [
      { value: "a", label: "لا. الجملة وحدها لا تخبرنا هل سأتوقف عند الثامنة أم سأتابع الدراسة." },
      { value: "b", label: "نعم. المستقبل التام المستمر يعني دائمًا التوقف عند نقطة المرجع." },
    ],
    accepted: ["a"],
    feedback: "المصدر: قد أتوقف عند الثامنة، وقد أستمر حتى التاسعة. المهم أن المدة عند نقطة المرجع ستكون أربع ساعات.",
    origin: "source",
  },
  {
    id: "what-it-highlights",
    prompt: "إذن ماذا يبرز Future Perfect Continuous؟",
    choices: [
      { value: "a", label: "يضمن استمرار النشاط إلى ما بعد النقطة المستقبلية." },
      { value: "b", label: "يبرز المدة الممتدة حتى تلك النقطة." },
    ],
    accepted: ["b"],
    feedback: "المصدر: Future Perfect Continuous لا يضمن استمرار النشاط إلى ما بعد النقطة المستقبلية، بل يبرز المدة الممتدة حتى تلك النقطة.",
    origin: "source",
  },
];

export const FOR_ITEMS_39: ChoiceItem39[] = [
  {
    id: "for-meaning",
    prompt: "أي تعبير يعبّر عن مدة زمنية؟",
    choices: [
      { value: "a", label: "for two hours = لمدة ساعتين." },
      { value: "b", label: "since 8:00 = منذ الساعة الثامنة." },
    ],
    accepted: ["a"],
    feedback: "القاعدة: for + مدة زمنية.",
    origin: "source",
  },
  {
    id: "for-blank",
    prompt: "By 10:00, I will have been studying ______ two hours.",
    choices: [
      { value: "a", label: "since" },
      { value: "b", label: "for" },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: By 10:00, I will have been studying for two hours.",
    origin: "source",
  },
  {
    id: "for-five-years",
    prompt: "ما معنى for five years؟",
    choices: [
      { value: "a", label: "لمدة خمس سنوات." },
      { value: "b", label: "منذ خمس سنوات بالضبط كنقطة بداية محددة." },
    ],
    accepted: ["a"],
    feedback: "قائمة المصدر: for five years = لمدة خمس سنوات.",
    nuance: "since تحدد نقطة البداية (since 2021)، أما for فتحدد طول المدة.",
    origin: "source",
  },
];

export const SINCE_ITEMS_39: ChoiceItem39[] = [
  {
    id: "since-meaning",
    prompt: "Since تعني:",
    choices: [
      { value: "a", label: "منذ نقطة زمنية محددة." },
      { value: "b", label: "لمدة زمنية." },
    ],
    accepted: ["a"],
    feedback: "المصدر: Since تعني منذ نقطة زمنية محددة.",
    origin: "source",
  },
  {
    id: "since-start",
    prompt: "أي تعبير يدل على نقطة بداية؟",
    choices: [
      { value: "a", label: "for three days" },
      { value: "b", label: "since Monday" },
    ],
    accepted: ["b"],
    feedback: "قائمة المصدر: since Monday = منذ الاثنين.",
    origin: "source",
  },
  {
    id: "since-logic",
    prompt: "By next September, he will have been studying at this school since 2024. هل نقطة البداية منطقية بالنسبة إلى نقطة المرجع المستقبلية؟",
    choices: [
      { value: "a", label: "نعم؛ 2024 نقطة بداية سابقة لأيلول القادم، فالمدة تُقاس منها." },
      { value: "b", label: "لا؛ since لا تصلح أبدًا مع نقطة مرجع مستقبلية." },
    ],
    accepted: ["a"],
    feedback: "المصدر: عند استخدام since يجب أن يكون زمن البداية منطقيًا بالنسبة إلى نقطة المرجع المستقبلية.",
    origin: "source",
  },
  {
    id: "since-vs-for-reading",
    prompt: "By noon, I will have been working since 7:00. ما الذي تخبرنا به الجملة عن المدة؟",
    choices: [
      { value: "a", label: "تخبرنا بنقطة البداية (7:00)؛ والمدة تُفهم من السياق (خمس ساعات حتى الظهر)." },
      { value: "b", label: "تخبرنا بمدة صريحة مقدارها سبع ساعات." },
    ],
    accepted: ["a"],
    feedback: "since 7:00 تحدد نقطة البداية فقط. لقول المدة صراحةً نستخدم for: By noon, I will have been working for five hours.",
    nuance: "ملاحظة منصة: الجمع بين by + since صحيح لكنه أقل شيوعًا؛ الأكثر وضوحًا ذكر المدة بـ for أو ذكر البداية وحدها.",
    origin: "platform",
  },
];

/** بنود فرز §10: كل تعبير يُصنَّف مدة (for) أو نقطة بداية (since). */
export const FOR_SINCE_SORT_39 = [
  { id: "five-years", text: "for five years", kind: "for" as const, arabic: "لمدة خمس سنوات" },
  { id: "since-2021", text: "since 2021", kind: "since" as const, arabic: "منذ عام 2021" },
  { id: "two-hours", text: "for two hours", kind: "for" as const, arabic: "لمدة ساعتين" },
  { id: "since-6", text: "since 6:00", kind: "since" as const, arabic: "منذ الساعة السادسة" },
  { id: "three-months", text: "for three months", kind: "for" as const, arabic: "لمدة ثلاثة أشهر" },
  { id: "since-january", text: "since January", kind: "since" as const, arabic: "منذ كانون الثاني" },
  { id: "ten-minutes", text: "for ten minutes", kind: "for" as const, arabic: "لمدة عشر دقائق" },
  { id: "since-930", text: "since 9:30", kind: "since" as const, arabic: "منذ الساعة 9:30" },
] as const;

export const FOR_SINCE_QUESTIONS_39: ChoiceItem39[] = [
  {
    id: "for-answers",
    prompt: "FOR تجيب عن السؤال:",
    choices: [
      { value: "a", label: "How long? — كم المدة؟" },
      { value: "b", label: "Since when? — منذ متى؟" },
    ],
    accepted: ["a"],
    feedback: "المصدر: FOR تجيب عن How long? كم المدة؟",
    origin: "source",
  },
  {
    id: "since-answers",
    prompt: "SINCE تجيب عن السؤال:",
    choices: [
      { value: "a", label: "How long? — كم المدة؟" },
      { value: "b", label: "Since when? — منذ متى؟" },
    ],
    accepted: ["b"],
    feedback: "المصدر: SINCE تجيب عن Since when? منذ متى؟",
    origin: "source",
  },
  {
    id: "pair-compare",
    prompt: "قارن: I will have been studying for three hours. / I will have been studying since 5:00.",
    choices: [
      { value: "a", label: "الأولى تذكر طول المدة، والثانية تذكر نقطة البداية." },
      { value: "b", label: "الجملتان تذكران المدة نفسها بالطريقة نفسها." },
    ],
    accepted: ["a"],
    feedback: "المصدر: سأكون قد أمضيت ثلاث ساعات في الدراسة / سأكون قد أمضيت وقتًا في الدراسة منذ الساعة الخامسة.",
    nuance: "ملاحظة منصة: في الجملة الثانية نقطة المرجع المستقبلية تُفهم من السياق؛ ولتوضيحها نضيفها: By 8:00, I will have been studying since 5:00 (= for three hours).",
    origin: "source",
  },
];

/** حالات مختبر حساب المدة §11 — الحساب معروض ومتفق مع جمل المصدر. */
export const DURATION_CASES_39 = [
  {
    id: "ahmad",
    title: "المثال الأول — أحمد والدراسة",
    unit: "hours" as const,
    unitLabel: "ساعات",
    englishUnit: "hours",
    points: [
      { value: 3, label: "3:00" },
      { value: 7, label: "7:00" },
    ],
    startValue: 3,
    referenceValue: 7,
    duration: 4,
    durationWord: "four hours",
    calc: "7 - 3 = 4 ساعات.",
    sourceCalc: "7 - 3 = 4 ساعات.",
    sentence: "By 7:00, Ahmad will have been studying for four hours.",
    context: "بدأ أحمد الدراسة الساعة الثالثة. سننظر إلى مدة دراسته عند الساعة السابعة.",
  },
  {
    id: "layla",
    title: "المثال الثاني — ليلى والعمل",
    unit: "hours" as const,
    unitLabel: "ساعات",
    englishUnit: "hours",
    points: [
      { value: 8, label: "8:00 a.m." },
      { value: 14, label: "2:00 p.m." },
    ],
    startValue: 8,
    referenceValue: 14,
    duration: 6,
    durationWord: "six hours",
    calc: "من الثامنة صباحًا إلى الثانية ظهرًا = 6 ساعات.",
    sourceCalc: "من الثامنة إلى الثانية = 6 ساعات.",
    sentence: "By 2:00 p.m., Layla will have been working for six hours.",
    context: "بدأت ليلى العمل الساعة الثامنة صباحًا. سننظر إلى مدة عملها عند الثانية ظهرًا.",
  },
  {
    id: "project",
    title: "المثال الثالث — مشروع المدرسة",
    unit: "months" as const,
    unitLabel: "أشهر",
    englishUnit: "months",
    points: [
      { value: 1, label: "January" },
      { value: 7, label: "July" },
    ],
    startValue: 1,
    referenceValue: 7,
    duration: 6,
    durationWord: "six months",
    calc: "من كانون الثاني إلى تموز = 6 أشهر.",
    sourceCalc: "من كانون الثاني إلى تموز = 6 أشهر.",
    sentence: "By July, the students will have been working on the project for six months.",
    context: "بدأ مشروع المدرسة في كانون الثاني. وسننظر إلى مدة العمل عليه في تموز.",
  },
] as const;

export const BY_ITEMS_39: ChoiceItem39[] = [
  {
    id: "by-meaning",
    prompt: "تذكر من الدرس 38 أن by تعني:",
    choices: [
      { value: "a", label: "بحلول / في موعد لا يتجاوز." },
      { value: "b", label: "بعد النقطة المذكورة بوقت طويل." },
    ],
    accepted: ["a"],
    feedback: "المصدر: by تعني بحلول / في موعد لا يتجاوز.",
    origin: "source",
  },
  {
    id: "by-finished",
    prompt: "By 8:00, I will have finished the report. ما الذي نبرزه هنا؟",
    choices: [
      { value: "a", label: "اكتمال الإنجاز." },
      { value: "b", label: "مدة النشاط." },
    ],
    accepted: ["a"],
    feedback: "المصدر: هنا نركز على اكتمال الإنجاز.",
    origin: "source",
  },
  {
    id: "by-working",
    prompt: "By 8:00, I will have been working on the report for three hours. ما الذي نبرزه هنا؟",
    choices: [
      { value: "a", label: "اكتمال الإنجاز." },
      { value: "b", label: "مدة النشاط." },
    ],
    accepted: ["b"],
    feedback: "المصدر: هنا نركز على مدة النشاط.",
    origin: "source",
  },
  {
    id: "by-alone",
    prompt: "هل تحدّد كلمة by الزمن وحدها؟",
    choices: [
      { value: "a", label: "لا؛ يجب أن نفهم ما الذي نريد إبرازه: الإنجاز أم المدة." },
      { value: "b", label: "نعم؛ by تفرض Future Perfect Continuous دائمًا." },
    ],
    accepted: ["a"],
    feedback: "المصدر: إذن كلمة by لا تحدد الزمن وحدها.",
    origin: "source",
  },
];

export const BY_THE_TIME_ITEMS_39: ChoiceItem39[] = [
  {
    id: "you-arrive",
    prompt: "By the time you arrive, I will have been studying for two hours. ما النقطة التي نقيس عندها مدة الدراسة؟",
    lines: ["By the time you arrive, I will have been studying for two hours."],
    choices: [
      { value: "a", label: "وصولك (you arrive)." },
      { value: "b", label: "لحظة بداية الدراسة." },
    ],
    accepted: ["a"],
    feedback: "المصدر: ① الدراسة بدأت قبل وصولك. ② وصولك هو النقطة التي نقيس عندها مدة الدراسة.",
    origin: "source",
  },
  {
    id: "teacher-arrives",
    prompt: "By the time the teacher arrives, the students will have been waiting for thirty minutes. كم تبلغ المدة المقاسة؟",
    lines: ["By the time the teacher arrives, the students will have been waiting for thirty minutes."],
    choices: [
      { value: "a", label: "ثلاثون دقيقة عند وصول المعلم." },
      { value: "b", label: "ثلاثون دقيقة بعد مغادرة المعلم." },
    ],
    accepted: ["a"],
    feedback: "المصدر: بحلول وقت وصول المعلم، سيكون الطلاب قد أمضوا ثلاثين دقيقة في الانتظار.",
    origin: "source",
  },
  {
    id: "concert-begins",
    prompt: "By the time the concert begins, we will have been standing in line for an hour. أي حدث هو نقطة المرجع؟",
    lines: ["By the time the concert begins, we will have been standing in line for an hour."],
    choices: [
      { value: "a", label: "بدء الحفل (the concert begins)." },
      { value: "b", label: "نهاية الحفل." },
    ],
    accepted: ["a"],
    feedback: "المصدر: بحلول وقت بدء الحفل، سنكون قد أمضينا ساعة في الوقوف ضمن الطابور.",
    origin: "source",
  },
  {
    id: "two-events",
    prompt: "في هذه الأمثلة لدينا حدثان. ما العلاقة بينهما؟",
    choices: [
      { value: "a", label: "النشاط يبدأ قبل الحدث الثاني، والحدث الثاني هو نقطة قياس المدة." },
      { value: "b", label: "الحدثان يقعان في اللحظة نفسها دائمًا." },
    ],
    accepted: ["a"],
    feedback: "المصدر: الدراسة بدأت قبل وصولك، ووصولك هو النقطة التي نقيس عندها المدة.",
    origin: "source",
  },
];

export const TIME_CLAUSE_ITEMS_39: ChoiceItem39[] = [
  {
    id: "correct-arrive",
    prompt: "احكم على الجملة: By the time you arrive, I will have been studying for two hours.",
    lines: ["By the time you arrive, I will have been studying for two hours."],
    choices: [
      { value: "a", label: "صحيحة — الجملة الزمنية بـ Present Simple." },
      { value: "b", label: "خاطئة — يلزم will في الجملة الزمنية." },
    ],
    accepted: ["a"],
    feedback: "المصدر: By the time you arrive, I will have been studying for two hours. ✅",
    origin: "source",
  },
  {
    id: "wrong-will",
    prompt: "احكم على الجملة: By the time you will arrive, I will have been studying for two hours.",
    lines: ["By the time you will arrive, I will have been studying for two hours."],
    choices: [
      { value: "a", label: "صحيحة — will تؤكد المستقبل." },
      { value: "b", label: "خاطئة — لا نستخدم will بعد by the time الزمنية." },
    ],
    accepted: ["b"],
    feedback: "المصدر: ❌ ثم الصحيح: By the time you arrive, I will have been studying for two hours. ✅",
    origin: "source",
  },
  {
    id: "comes",
    prompt: "By the time she comes, we will have been waiting for an hour. ما صيغة الفعل في الجملة الزمنية؟",
    lines: ["By the time she comes, we will have been waiting for an hour."],
    choices: [
      { value: "a", label: "Present Simple (comes)." },
      { value: "b", label: "Future Simple (will come)." },
    ],
    accepted: ["a"],
    feedback: "التركيب: By the time + Subject + Present Simple, Subject + will have been + V-ing.",
    origin: "source",
  },
  {
    id: "past-narrative",
    prompt: "ملاحظة منصة — احكم على الجملة الماضية: By the time he arrived, I had been waiting for an hour.",
    lines: ["By the time he arrived, I had been waiting for an hour."],
    choices: [
      { value: "a", label: "صحيحة؛ القاعدة السابقة تخص الجملة الزمنية المستقبلية، وهذه سردٌ ماضٍ بـ Past Perfect Continuous." },
      { value: "b", label: "خاطئة؛ لأن الجملة الزمنية بعد by the time تحتاج Present Simple في كل الأزمنة." },
    ],
    accepted: ["a"],
    feedback: "قاعدة الدرس تخص التركيب المستقبلي: By the time + Present Simple, … will have been + V-ing. أما في السرد الماضي فتُستخدم الصيغ الماضية.",
    nuance: "إضافة من المنصة لتوضيح مجال القاعدة، وليست نصًا من المصدر.",
    origin: "platform",
  },
];

/** حوار §15 — The Long Study Day: ثمانية أدوار بترجمتها المصدرية وتحليلها. */
/**
 * حوار §15 (The Long Study Day): الأسطر الإنجليزية والترجمة العربية كلها من المصدر،
 * والتحليل الموسوم بـ analysisOrigin: "platform" إضافة من المنصة للأسطر التي لم يحللها
 * المصدر (المصدر حلّل ثلاثة تراكيب فقط).
 */
export const DIALOGUE_LINES_39 = [
  {
    id: "d1",
    speaker: "Maya",
    en: "What time did you start studying today?",
    ar: "مايا: متى بدأت الدراسة اليوم؟",
    form: "did you start",
    analysis: "سؤال عن نقطة البداية في الماضي — ومنها تُحسب المدة.",
    origin: "source" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d2",
    speaker: "Daniel",
    en: "I started at 3:00.",
    ar: "دانيال: بدأت عند الثالثة.",
    form: "started at 3:00",
    analysis: "نقطة البداية: الثالثة.",
    origin: "source" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d3",
    speaker: "Maya",
    en: "And when are you going to stop?",
    ar: "مايا: ومتى تنوي التوقف؟",
    form: "are you going to stop",
    analysis: "سؤال عن خطة مستقبلية بصيغة be going to (الدرس 35).",
    origin: "source" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d4",
    speaker: "Daniel",
    en: "At 8:00.",
    ar: "دانيال: عند الثامنة.",
    form: "—",
    analysis: "نقطة المرجع المستقبلية: الثامنة. من 3:00 إلى 8:00 = خمس ساعات.",
    origin: "source" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d5",
    speaker: "Maya",
    en: "Wow! By 8:00, you will have been studying for five hours!",
    ar: "مايا: رائع! بحلول الثامنة، ستكون قد أمضيت خمس ساعات في الدراسة!",
    form: "will have been studying",
    analysis: "will have been studying = التركيز على مدة الدراسة.",
    origin: "source" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d6",
    speaker: "Daniel",
    en: "Exactly. I'm preparing for my science competition.",
    ar: "دانيال: بالضبط. أنا أستعد لمسابقة العلوم.",
    form: "am preparing",
    analysis: "Present Continuous: نشاط جارٍ الآن.",
    origin: "source" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d7",
    speaker: "Maya",
    en: "Will you have finished all the exercises by then?",
    ar: "مايا: هل ستكون قد أنهيت جميع التمارين بحلول ذلك الوقت؟",
    form: "Will you have finished",
    analysis: "will have finished = التركيز على اكتمال التمارين.",
    origin: "source" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d8",
    speaker: "Daniel",
    en: "I hope so. But even if I haven't finished everything, I'll have been working very hard.",
    ar: "دانيال: آمل ذلك. لكن حتى لو لم أكن قد أنهيت كل شيء، فسأكون قد عملت بجد كبير.",
    form: "will have been working",
    analysis: "will have been working = التركيز على الجهد والنشاط الممتد.",
    origin: "source" as const,
    analysisOrigin: "source" as const,
  },
] as const;

/** سؤال فهم على الحوار — يفرّق الزمنين داخل الحوار نفسه (إضافة منصة). */
export const DIALOGUE_CHECK_39: ChoiceItem39[] = [
  {
    id: "same-dialogue",
    prompt: "لماذا استُخدم Future Perfect وFuture Perfect Continuous في الحوار نفسه؟",
    choices: [
      { value: "a", label: "لأن كل زمن يبرز معنى مختلفًا: المدة في will have been studying، واكتمال التمارين في will have finished." },
      { value: "b", label: "لأن أحد الشكلين خطأ في السياق." },
    ],
    accepted: ["a"],
    feedback: "المصدر: لاحظ كيف استخدمنا Future Perfect وFuture Perfect Continuous في الحوار نفسه، لأن كل زمن يبرز معنى مختلفًا.",
    origin: "source",
  },
  {
    id: "five-hours",
    prompt: "تحقّق من حساب المدة في الحوار: بدأ دانيال عند 3:00 ويتوقف عند 8:00.",
    choices: [
      { value: "a", label: "خمس ساعات — وهذا ما قالته مايا." },
      { value: "b", label: "ثلاث ساعات." },
    ],
    accepted: ["a"],
    feedback: "8:00 − 3:00 = 5 ساعات، فتطابق حساب مايا: you will have been studying for five hours.",
    origin: "platform",
  },
];

export const FP_VS_FPC_ITEMS_39: ChoiceItem39[] = [
  {
    id: "how-many-articles",
    prompt: "كم مقالًا ستكون قد كتبت؟",
    choices: [
      { value: "a", label: "Future Perfect" },
      { value: "b", label: "Future Perfect Continuous" },
    ],
    accepted: ["a"],
    feedback: "المقارنة الذهبية في المصدر: العدد المكتمل → Future Perfect. مثال: By Friday, I will have written five articles.",
    origin: "source",
  },
  {
    id: "how-many-hours-writing",
    prompt: "كم ساعة ستكون قد أمضيت في الكتابة؟",
    choices: [
      { value: "a", label: "Future Perfect" },
      { value: "b", label: "Future Perfect Continuous" },
    ],
    accepted: ["b"],
    feedback: "المقارنة الذهبية: المدة → Future Perfect Continuous. مثال: By Friday, I will have been writing articles for two weeks.",
    origin: "source",
  },
  {
    id: "project-complete",
    prompt: "هل سيكون المشروع قد اكتمل؟",
    choices: [
      { value: "a", label: "Future Perfect" },
      { value: "b", label: "Future Perfect Continuous" },
    ],
    accepted: ["a"],
    feedback: "السؤال عن اكتمال النتيجة → Future Perfect.",
    origin: "source",
  },
  {
    id: "since-when-project",
    prompt: "منذ متى ستكون تعمل على المشروع؟",
    choices: [
      { value: "a", label: "Future Perfect" },
      { value: "b", label: "Future Perfect Continuous" },
    ],
    accepted: ["b"],
    feedback: "السؤال عن امتداد النشاط → Future Perfect Continuous.",
    origin: "source",
  },
  {
    id: "typical-focus",
    prompt: "ما التركيز النموذجي لكل زمن؟",
    choices: [
      { value: "a", label: "Future Perfect: الإنجاز أو النتيجة المكتملة بحلول نقطة مستقبلية. Future Perfect Continuous: مدة النشاط الممتدة حتى نقطة مستقبلية." },
      { value: "b", label: "Future Perfect: مدة النشاط. Future Perfect Continuous: الإنجاز المكتمل." },
    ],
    accepted: ["a"],
    feedback: "المصدر: Subject + will have + V3 للإنجاز، وSubject + will have been + V-ing للمدة.",
    nuance: "«النموذجي» كلمة المصدر: السياق والمعنى يحددان الاختيار، ولا توجد كلمة دالة تفرض الزمن آليًا.",
    origin: "source",
  },
];

export const PAIRED_EXAMPLES_39: ChoiceItem39[] = [
  {
    id: "reading-pair",
    prompt: "المثال الأول: القراءة — أي الجملتين تركّز على المدة؟",
    lines: ["By Sunday, she will have read three books.", "By Sunday, she will have been reading for ten hours."],
    choices: [
      { value: "a", label: "By Sunday, she will have been reading for ten hours." },
      { value: "b", label: "By Sunday, she will have read three books." },
    ],
    accepted: ["a"],
    feedback: "الأولى تركّز على مدة القراءة (عشر ساعات)، والثانية على عدد الكتب المكتملة (ثلاثة كتب).",
    origin: "source",
  },
  {
    id: "building-pair",
    prompt: "المثال الثاني: البناء — أي الجملتين تركّز على الإنجاز المكتمل؟",
    lines: [
      "By next year, they will have built the bridge.",
      "By next year, they will have been building the bridge for three years.",
    ],
    choices: [
      { value: "a", label: "By next year, they will have been building the bridge for three years." },
      { value: "b", label: "By next year, they will have built the bridge." },
    ],
    accepted: ["b"],
    feedback: "الثانية تركّز على اكتمال الجسر، والأولى على مدة البناء (ثلاث سنوات).",
    origin: "source",
  },
  {
    id: "learning-pair",
    prompt: "المثال الثالث: التعلم — أي الجملتين تركّز على المدة؟",
    lines: [
      "By June, I will have completed the English course.",
      "By June, I will have been learning English for two years.",
    ],
    choices: [
      { value: "a", label: "By June, I will have been learning English for two years." },
      { value: "b", label: "By June, I will have completed the English course." },
    ],
    accepted: ["a"],
    feedback: "الأولى مدة التعلم (سنتان)، والثانية إكمال الدورة — إنجاز مكتمل.",
    origin: "source",
  },
];

export const FINISHED_ITEMS_39: ChoiceItem39[] = [
  {
    id: "does-it-mean-unfinished",
    prompt: "By 8:00, I will have been studying for four hours. هل يعني أن العمل لم ينتهِ؟",
    choices: [
      { value: "a", label: "ليس بالضرورة — الجملة وحدها لا تخبرنا هل سأتوقف عند الثامنة أو سأستمر بعدها." },
      { value: "b", label: "نعم، دائمًا يعني أن العمل مستمر بعدها." },
    ],
    accepted: ["a"],
    feedback: "المصدر: ليس بالضرورة. هذه نقطة متقدمة جدًا.",
    origin: "source",
  },
  {
    id: "finished-studying",
    prompt: "By 8:00, I will have finished studying. على ماذا تركّز؟",
    choices: [
      { value: "a", label: "على أن الدراسة ستكون قد انتهت بحلول الثامنة." },
      { value: "b", label: "على مدة الدراسة قبل الثامنة." },
    ],
    accepted: ["a"],
    feedback: "المصدر: تركز على أن الدراسة ستكون قد انتهت بحلول الثامنة.",
    origin: "source",
  },
  {
    id: "real-difference",
    prompt: "إذن ما الفرق الأساسي بين الزمنين؟",
    choices: [
      { value: "a", label: "Future Perfect = انتهى، وFuture Perfect Continuous = لم ينتهِ." },
      {
        value: "b",
        label: "Future Perfect يبرز الإنجاز أو النتيجة، وFuture Perfect Continuous يبرز مدة النشاط أو امتداده.",
      },
    ],
    accepted: ["b"],
    feedback: "المصدر: الفرق ليس ببساطة «انتهى / لم ينتهِ»، بل الفرق الأساسي هو ما يبرزه كل زمن.",
    nuance: "لا تُدرَّس القاعدة المبسّطة الخاطئة: المستقبل التام = توقف النشاط، والمستقبل التام المستمر = لم يتوقف.",
    origin: "source",
  },
];

export const NEGATIVE_BUILD_39 = [
  {
    id: "neg-1",
    n: 1,
    base: "By 6:00, I will have been studying for three hours.",
    arabic: "حوّل الجملة إلى النفي كما في مثال المصدر.",
    negative: "By 6:00, I won't have been studying for three hours.",
    arabicAnswer: "بحلول السادسة، لن أكون قد أمضيت ثلاث ساعات في الدراسة.",
  },
  {
    id: "neg-2",
    n: 2,
    base: "She will have been working here for a full year by December.",
    arabic: "حوّل الجملة إلى النفي كما في مثال المصدر.",
    negative: "She won't have been working here for a full year by December.",
    arabicAnswer: "بحلول كانون الأول، لن تكون قد أمضت سنة كاملة في العمل هنا.",
  },
  {
    id: "neg-3",
    n: 3,
    base: "They will have been waiting for long when we arrive.",
    arabic: "حوّل الجملة إلى النفي كما في مثال المصدر.",
    negative: "They won't have been waiting for long when we arrive.",
    arabicAnswer: "لن يكونوا قد أمضوا وقتًا طويلًا في الانتظار عندما نصل.",
  },
] as const;

export const NEGATION_MEANING_ITEMS_39: ChoiceItem39[] = [
  {
    id: "not-duration",
    prompt: "By 8:00, I won't have been studying for four hours. ماذا يعني النفي هنا؟",
    choices: [
      { value: "a", label: "أن مدة دراستي عند الثامنة لن تكون قد بلغت أربع ساعات." },
      { value: "b", label: "أنني لن أدرس إطلاقًا." },
    ],
    accepted: ["a"],
    feedback: "المصدر: هذا لا يعني بالضرورة أنني لن أدرس، بل يعني أن المدة لن تبلغ أربع ساعات.",
    origin: "source",
  },
  {
    id: "three-hours",
    prompt: "ربما بدأت عند الخامسة. كم تبلغ مدة الدراسة عند الثامنة؟",
    choices: [
      { value: "a", label: "أربع ساعات." },
      { value: "b", label: "ثلاث ساعات فقط." },
    ],
    accepted: ["b"],
    feedback: "من 5:00 إلى 8:00 = ثلاث ساعات، كما في نص المصدر.",
    origin: "source",
  },
];

export const YESNO_BUILD_39 = [
  {
    id: "yesno-1",
    n: 1,
    base: "You will have been studying for three hours by 8:00.",
    arabic: "حوّل الجملة إلى سؤال نعم/لا كما في مثال المصدر.",
    question: "Will you have been studying for three hours by 8:00?",
    arabicAnswer: "هل ستكون قد أمضيت ثلاث ساعات في الدراسة بحلول الثامنة؟",
  },
  {
    id: "yesno-2",
    n: 2,
    base: "She will have been working here for five years by next June.",
    arabic: "حوّل الجملة إلى سؤال نعم/لا كما في مثال المصدر.",
    question: "Will she have been working here for five years by next June?",
    arabicAnswer: "هل ستكون قد أمضت خمس سنوات في العمل هنا بحلول حزيران القادم؟",
  },
  {
    id: "yesno-3",
    n: 3,
    base: "They will have been travelling for ten hours by midnight.",
    arabic: "حوّل الجملة إلى سؤال نعم/لا كما في مثال المصدر.",
    question: "Will they have been travelling for ten hours by midnight?",
    arabicAnswer: "هل سيكونون قد أمضوا عشر ساعات في السفر بحلول منتصف الليل؟",
  },
] as const;

export const SHORT_ANSWER_ITEMS_39: ChoiceItem39[] = [
  {
    id: "short-you",
    prompt: "Will you have been studying for three hours by 8:00? — أي إجابة قصيرة صحيحة؟",
    lines: ["Will you have been studying for three hours by 8:00?"],
    choices: [
      { value: "a", label: "Yes, I will." },
      { value: "b", label: "Yes, I will have been studying." },
    ],
    accepted: ["a"],
    feedback: "المصدر: Yes, I will. / No, I won't.",
    origin: "source",
  },
  {
    id: "short-she",
    prompt: "Will she have been working here for five years by June? — أي إجابة قصيرة صحيحة؟",
    lines: ["Will she have been working here for five years by June?"],
    choices: [
      { value: "a", label: "Yes, she will have been." },
      { value: "b", label: "Yes, she will." },
    ],
    accepted: ["b"],
    feedback: "المصدر: Yes, she will. / No, she won't.",
    origin: "source",
  },
  {
    id: "short-negative",
    prompt: "أي نفي قصير صحيح لسؤال المستقبل التام المستمر؟",
    choices: [
      { value: "a", label: "No, I won't have been." },
      { value: "b", label: "No, I won't." },
    ],
    accepted: ["b"],
    feedback: "المصدر: الإجابة القصيرة تستخدم will أو won't فقط.",
    origin: "source",
  },
  {
    id: "short-rule",
    prompt: "لماذا لا نكرر بقية التركيب في الإجابة القصيرة؟",
    choices: [
      { value: "a", label: "لأن الإجابة القصيرة المعتادة تستخدم will أو won't فقط، دون تكرار have been + V-ing." },
      { value: "b", label: "لأن have been ممنوعة بعد will في كل المواضع." },
    ],
    accepted: ["a"],
    feedback: "المصدر: لا نكرر have been + V-ing في الإجابة القصيرة المعتادة.",
    nuance: "have been جزء ثابت من التركيب في الجملة الكاملة؛ الاقتصار يخص الإجابة القصيرة فقط.",
    origin: "source",
  },
];

export const HOWLONG_BUILD_39 = [
  {
    id: "howlong-1",
    n: 1,
    base: "You will have been studying by 8:00.",
    arabic: "اسأل عن المدة باستخدام How long كما في مثال المصدر.",
    question: "How long will you have been studying by 8:00?",
    arabicAnswer: "كم ستكون قد أمضيت من الوقت في الدراسة بحلول الثامنة؟",
    answerLine: "I will have been studying for four hours.",
  },
  {
    id: "howlong-2",
    n: 2,
    base: "She will have been working here by next year.",
    arabic: "اسأل عن المدة باستخدام How long كما في مثال المصدر.",
    question: "How long will she have been working here by next year?",
    arabicAnswer: "كم ستكون قد أمضيت من الوقت في العمل هنا بحلول العام القادم؟",
    answerLine: "She will have been working here for six years.",
  },
  {
    id: "howlong-3",
    n: 3,
    base: "They will have been travelling by midnight.",
    arabic: "اسأل عن المدة باستخدام How long كما في مثال المصدر.",
    question: "How long will they have been travelling by midnight?",
    arabicAnswer: "كم ستكون مدة سفرهم بحلول منتصف الليل؟",
    answerLine: "They will have been travelling for twelve hours.",
  },
] as const;

export const WH_ITEMS_39: ChoiceItem39[] = [
  {
    id: "what",
    prompt: "What will you have been doing for three hours by noon? — عمّ يسأل هذا السؤال؟",
    lines: ["What will you have been doing for three hours by noon?"],
    choices: [
      { value: "a", label: "عن النشاط الذي ستكون قد أمضيت ثلاث ساعات في القيام به." },
      { value: "b", label: "عن مكان النشاط." },
    ],
    accepted: ["a"],
    feedback: "ترجمة المصدر: ما النشاط الذي ستكون قد أمضيت ثلاث ساعات في القيام به بحلول الظهر؟",
    origin: "source",
  },
  {
    id: "where",
    prompt: "Where will they have been working for a year by next June? — عمّ يسأل؟",
    lines: ["Where will they have been working for a year by next June?"],
    choices: [
      { value: "a", label: "عن المدة." },
      { value: "b", label: "عن المكان الذي سيكونون قد أمضوا سنة في العمل فيه." },
    ],
    accepted: ["b"],
    feedback: "ترجمة المصدر: أين سيكونون قد أمضوا سنة في العمل بحلول حزيران القادم؟",
    origin: "source",
  },
  {
    id: "why",
    prompt: "Why will she have been waiting for so long? — عمّ يسأل؟",
    lines: ["Why will she have been waiting for so long?"],
    choices: [
      { value: "a", label: "عن سبب طول مدة الانتظار." },
      { value: "b", label: "عن وقت بداية الانتظار." },
    ],
    accepted: ["a"],
    feedback: "ترجمة المصدر: لماذا ستكون قد أمضت كل ذلك الوقت في الانتظار؟",
    origin: "source",
  },
  {
    id: "how-long-most",
    prompt: "أي أداة سؤال تبقى الأكثر ارتباطًا بهذا الزمن؟",
    choices: [
      { value: "a", label: "How long — لأنها تسأل مباشرة عن المدة." },
      { value: "b", label: "What — لأنها تسأل عن النشاط." },
    ],
    accepted: ["a"],
    feedback: "المصدر: لكن How long تبقى الأكثر ارتباطًا بهذا الزمن لأنها تسأل مباشرة عن المدة.",
    origin: "source",
  },
];

export const PERFECT_CONTINUOUS_ITEMS_39: ChoiceItem39[] = [
  {
    id: "ppc-form",
    prompt: "ما صيغة Present Perfect Continuous؟",
    choices: [
      { value: "a", label: "have/has been + V-ing" },
      { value: "b", label: "had been + V-ing" },
      { value: "c", label: "will have been + V-ing" },
    ],
    accepted: ["a"],
    feedback: "الجدول الذهبي: have/has been + V-ing — مثال المصدر: I have been working for three hours.",
    origin: "source",
  },
  {
    id: "pastpc-form",
    prompt: "ما صيغة Past Perfect Continuous؟",
    choices: [
      { value: "a", label: "have/has been + V-ing" },
      { value: "b", label: "had been + V-ing" },
      { value: "c", label: "will have been + V-ing" },
    ],
    accepted: ["b"],
    feedback: "الجدول الذهبي: had been + V-ing — مثال المصدر: I had been working for three hours before my friend arrived.",
    origin: "source",
  },
  {
    id: "fpc-form",
    prompt: "ما صيغة Future Perfect Continuous؟",
    choices: [
      { value: "a", label: "have/has been + V-ing" },
      { value: "b", label: "had been + V-ing" },
      { value: "c", label: "will have been + V-ing" },
    ],
    accepted: ["c"],
    feedback: "الجدول الذهبي: will have been + V-ing — مثال المصدر: By 8:00, I will have been working for three hours.",
    origin: "source",
  },
  {
    id: "ppc-reference",
    prompt: "I have been working for three hours. — أين نقطة المرجع؟",
    lines: ["I have been working for three hours."],
    choices: [
      { value: "a", label: "الحاضر — وما زال النشاط مرتبطًا به." },
      { value: "b", label: "نقطة ماضية." },
      { value: "c", label: "نقطة مستقبلية." },
    ],
    accepted: ["a"],
    feedback: "المصدر: لقد أمضيت ثلاث ساعات في العمل، وما زال النشاط مرتبطًا بالحاضر.",
    origin: "source",
  },
  {
    id: "pastpc-reference",
    prompt: "I had been working for three hours before my friend arrived. — أين نقطة المرجع؟",
    lines: ["I had been working for three hours before my friend arrived."],
    choices: [
      { value: "a", label: "الحاضر." },
      { value: "b", label: "نقطة ماضية — قبل وصول الصديق." },
      { value: "c", label: "نقطة مستقبلية." },
    ],
    accepted: ["b"],
    feedback: "المصدر: كنت قد أمضيت ثلاث ساعات في العمل قبل وصول صديقي.",
    origin: "source",
  },
  {
    id: "fpc-reference",
    prompt: "By 8:00, I will have been working for three hours. — أين نقطة المرجع؟",
    lines: ["By 8:00, I will have been working for three hours."],
    choices: [
      { value: "a", label: "الحاضر." },
      { value: "b", label: "نقطة ماضية." },
      { value: "c", label: "نقطة مستقبلية — الساعة الثامنة." },
    ],
    accepted: ["c"],
    feedback: "المصدر: بحلول الثامنة، سأكون قد أمضيت ثلاث ساعات في العمل.",
    nuance: "الفكرة المشتركة بين الأزمنة الثلاثة: التركيز على مدة النشاط. والاختلاف: النقطة الزمنية التي نقيس عندها تلك المدة.",
    origin: "source",
  },
];

/** أفعال الحالة الستة المذكورة في §26. */
/**
 * أفعال الحالة الستة الواردة في §26. المصدر قدّم مثالًا واحدًا صريحًا (know)،
 * وأزواج الجمل الأخرى من إعداد المنصة على النمط نفسه — وتُعرض موسومة بذلك في المختبر.
 */
export const STATIVE_VERBS_39 = [
  {
    verb: "know",
    arabic: "يعرف",
    good: "By next year, I will have known her for ten years.",
    bad: "By next year, I will have been knowing her for ten years.",
    origin: "source" as const,
  },
  {
    verb: "believe",
    arabic: "يعتقد",
    good: "By June, she will have believed the story for months.",
    bad: "By June, she will have been believing the story for months.",
    origin: "platform" as const,
  },
  {
    verb: "understand",
    arabic: "يفهم",
    good: "By Friday, they will have understood the lesson for a week.",
    bad: "By Friday, they will have been understanding the lesson for a week.",
    origin: "platform" as const,
  },
  {
    verb: "want",
    arabic: "يريد",
    good: "By tomorrow, he will have wanted this bike for a year.",
    bad: "By tomorrow, he will have been wanting this bike for a year.",
    origin: "platform" as const,
  },
  {
    verb: "need",
    arabic: "يحتاج",
    good: "By 8:00, we will have needed help for two hours.",
    bad: "By 8:00, we will have been needing help for two hours.",
    origin: "platform" as const,
  },
  {
    verb: "own",
    arabic: "يمتلك",
    good: "By 2030, I will have owned this house for ten years.",
    bad: "By 2030, I will have been owning this house for ten years.",
    origin: "platform" as const,
  },
] as const;

export const STATIVE_ITEMS_39: ChoiceItem39[] = [
  {
    id: "know-ten-years",
    prompt: "أي الجملتين هي الاستعمال المعتاد؟",
    lines: [
      "By next year, I will have known her for ten years.",
      "By next year, I will have been knowing her for ten years.",
    ],
    choices: [
      { value: "a", label: "By next year, I will have known her for ten years. ✅" },
      { value: "b", label: "By next year, I will have been knowing her for ten years." },
    ],
    accepted: ["a"],
    feedback: "المصدر يوسم الثانية بـ ❌ في الاستعمال المعتاد؛ know فعل حالة عندما تعني المعرفة.",
    origin: "source",
  },
  {
    id: "own-house",
    prompt: "أي الجملتين هي الاستعمال المعتاد؟",
    lines: [
      "By June, she will have owned the house for five years.",
      "By June, she will have been owning the house for five years.",
    ],
    choices: [
      { value: "a", label: "By June, she will have been owning the house for five years." },
      { value: "b", label: "By June, she will have owned the house for five years. ✅" },
    ],
    accepted: ["b"],
    feedback: "المصدر يوسم الصيغة المستمرة بـ ❌ في الاستعمال المعتاد؛ own فعل حالة.",
    origin: "source",
  },
  {
    id: "live-both",
    prompt: "By next year, I will have lived here for ten years. / By next year, I will have been living here for ten years.",
    lines: [
      "By next year, I will have lived here for ten years.",
      "By next year, I will have been living here for ten years.",
    ],
    choices: [
      { value: "a", label: "كلتا الجملتين صحيحتان، والثانية تبرز الاستمرار والمدة بصورة أوضح." },
      { value: "b", label: "الثانية فقط صحيحة لأن live يمنع Future Perfect." },
    ],
    accepted: ["a"],
    feedback: "المصدر: لكن بعض الأفعال مثل live وwork قد تسمح باستخدام الزمنين بحسب المعنى والتركيز.",
    origin: "source",
  },
];

export const ERROR_ITEMS_39: ChoiceItem39[] = [
  {
    id: "err-has",
    prompt: "① She will has been studying. — اختر التصحيح.",
    lines: ["She will has been studying."],
    choices: [
      { value: "a", label: "She will have been studying." },
      { value: "b", label: "She will has been study." },
    ],
    accepted: ["a"],
    feedback: "will يتبعها الفعل الأساسي have، وليس has — حتى مع He وShe وIt.",
    nuance: "نوع الخطأ: will has been.",
    origin: "source",
  },
  {
    id: "err-being",
    prompt: "② I will have being working. — اختر التصحيح.",
    lines: ["I will have being working."],
    choices: [
      { value: "a", label: "I will have being work." },
      { value: "b", label: "I will have been working." },
    ],
    accepted: ["b"],
    feedback: "الجزء الثابت هو been (التصريف الثالث من be)، لا being.",
    nuance: "نوع الخطأ: will have being.",
    origin: "source",
  },
  {
    id: "err-base",
    prompt: "③ They will have been work for three hours. — اختر التصحيح.",
    lines: ["They will have been work for three hours."],
    choices: [
      { value: "a", label: "They will have been working for three hours." },
      { value: "b", label: "They will have been worked for three hours." },
    ],
    accepted: ["a"],
    feedback: "بعد been يأتي الفعل مع ing: working.",
    nuance: "نوع الخطأ: will have been work.",
    origin: "source",
  },
  {
    id: "err-wont-has",
    prompt: "④ He won't has been waiting. — اختر التصحيح.",
    lines: ["He won't has been waiting."],
    choices: [
      { value: "a", label: "He won't has been wait." },
      { value: "b", label: "He won't have been waiting." },
    ],
    accepted: ["b"],
    feedback: "بعد won't يأتي have، ثم been، ثم V-ing.",
    nuance: "نوع الخطأ: won't has been.",
    origin: "source",
  },
  {
    id: "err-question-being",
    prompt: "⑤ Will she have being studying? — اختر التصحيح.",
    lines: ["Will she have being studying?"],
    choices: [
      { value: "a", label: "Will she have been studying?" },
      { value: "b", label: "Will she has been studying?" },
    ],
    accepted: ["a"],
    feedback: "في السؤال أيضًا: Will + Subject + have + been + V-ing?",
    nuance: "نوع الخطأ: Will she have being studying?",
    origin: "source",
  },
  {
    id: "err-time-clause",
    prompt: "⑥ By the time you will arrive, I will have been waiting. — اختر التصحيح.",
    lines: ["By the time you will arrive, I will have been waiting."],
    choices: [
      { value: "a", label: "By the time you will arriving, I will have been waiting." },
      { value: "b", label: "By the time you arrive, I will have been waiting." },
    ],
    accepted: ["b"],
    feedback: "الجملة الزمنية المستقبلية بعد by the time تستخدم Present Simple.",
    nuance: "نوع الخطأ: will داخل الجملة الزمنية.",
    origin: "source",
  },
  {
    id: "err-stative",
    prompt: "⑦ I will have been knowing him for ten years. — اختر التصحيح.",
    lines: ["I will have been knowing him for ten years."],
    choices: [
      { value: "a", label: "I will have known him for ten years." },
      { value: "b", label: "I will have being known him for ten years." },
    ],
    accepted: ["a"],
    feedback: "know فعل حالة في هذا المعنى، فنستخدم Future Perfect: will have known.",
    nuance: "نوع الخطأ: فعل حالة في صيغة مستمرة.",
    origin: "source",
  },
];

/** حوار §28 — The Marathon Training: عشرة أدوار. الترجمة إضافة منصة (لا ترجمة مصدرية لهذا الحوار). */
/**
 * حوار §28 (The Marathon Training): النص الإنجليزي من المصدر، لكن المصدر لم يقدّم ترجمة
 * عربية لهذا الحوار، فكل ترجمة موسومة بـ origin: "platform". والتحليل الموسوم بـ
 * analysisOrigin: "source" مأخوذ من فقرة «التحليل» في المصدر، وسطر الملخص الأخير صياغة
 * منصية لخلاصة المصدر (لاحظ كيف جمع الحوار بين الأزمنة الثلاثة).
 */
export const DIALOGUE2_LINES_39 = [
  {
    id: "m1",
    speaker: "Adam",
    en: "When did you start training for the marathon?",
    ar: "آدم: متى بدأت التدريب على الماراثون؟",
    form: "did you start",
    analysis: "سؤال عن نقطة البداية في الماضي — ومنها تُحسب المدة.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "m2",
    speaker: "Omar",
    en: "I started three months ago.",
    ar: "عمر: بدأت قبل ثلاثة أشهر.",
    form: "started … ago",
    analysis: "نقطة البداية: قبل ثلاثة أشهر من لحظة الكلام.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "m3",
    speaker: "Adam",
    en: "And when is the race?",
    ar: "آدم: ومتى السباق؟",
    form: "is the race",
    analysis: "Present Simple لسؤال عن موعد مجدول.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "m4",
    speaker: "Omar",
    en: "Next month.",
    ar: "عمر: الشهر القادم.",
    form: "—",
    analysis: "نقطة المرجع المستقبلية: بداية السباق. ثلاثة أشهر مضت + شهر قادم = أربعة أشهر.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "m5",
    speaker: "Adam",
    en: "So by the time the race begins, you will have been training for four months!",
    ar: "آدم: إذن بحلول وقت بدء السباق، ستكون قد أمضيت أربعة أشهر في التدريب!",
    form: "will have been training",
    analysis: "will have been training = مدة التدريب الممتدة حتى بداية السباق.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "m6",
    speaker: "Omar",
    en: "Exactly.",
    ar: "عمر: بالضبط.",
    form: "—",
    analysis: "تأكيد الحساب: المدة أربع أشهر عند نقطة المرجع.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "m7",
    speaker: "Adam",
    en: "Will you have completed all your training sessions by then?",
    ar: "آدم: هل ستكون قد أكملت جميع جلسات التدريب بحلول ذلك الوقت؟",
    form: "Will you have completed",
    analysis: "will have completed = اكتمال جميع الجلسات التدريبية.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "m8",
    speaker: "Omar",
    en: "I hope so. I'll have finished the final session two days before the race.",
    ar: "عمر: آمل ذلك. سأكون قد أنهيت الجلسة الأخيرة قبل السباق بيومين.",
    form: "will have finished",
    analysis: "will have finished = إنجاز مكتمل قبل السباق.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "m9",
    speaker: "Adam",
    en: "That's impressive. I'm sure you'll do well.",
    ar: "آدم: هذا مذهل. أنا واثق أنك ستبلي بلاءً حسنًا.",
    form: "will do well",
    analysis: "will do well = توقع بشأن الأداء المستقبلي.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "m10",
    speaker: "ملخص الحوار",
    en: "The dialogue mixes: Future Perfect Continuous · Future Perfect · Future Simple.",
    ar: "يجمع الحوار بين: المستقبل التام المستمر والمستقبل التام والمستقبل البسيط.",
    form: "—",
    analysis: "لاحظ كيف جمع الحوار بين الأزمنة الثلاثة، وكل زمن أدى وظيفة مختلفة.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
] as const;

export const DIALOGUE2_CHECK_39: ChoiceItem39[] = [
  {
    id: "four-months",
    prompt: "تحقّق من حساب المدة: بدأ عمر التدريب قبل ثلاثة أشهر، والسباق الشهر القادم.",
    choices: [
      { value: "a", label: "أربعة أشهر عند بدء السباق — وهذا ما قاله آدم." },
      { value: "b", label: "ثلاثة أشهر فقط." },
    ],
    accepted: ["a"],
    feedback: "3 أشهر مضت + شهر حتى السباق = 4 أشهر: you will have been training for four months.",
    origin: "platform",
  },
  {
    id: "three-tenses",
    prompt: "أي الأزمنة لم يُستخدم في الحوار؟",
    choices: [
      { value: "a", label: "Future Perfect Continuous" },
      { value: "b", label: "Future Perfect" },
      { value: "c", label: "Past Perfect Continuous" },
      { value: "d", label: "Future Simple" },
    ],
    accepted: ["c"],
    feedback: "المصدر: جمع الحوار بين Future Perfect Continuous وFuture Perfect وFuture Simple، وكل زمن أدى وظيفة مختلفة.",
    nuance: "will have been training للمدة، will have completed / will have finished للإنجاز، will do well للتوقع.",
    origin: "source",
  },
  {
    id: "by-the-time-clause",
    prompt: "في جملة by the time the race begins — ما صيغة الفعل داخل الجملة الزمنية؟",
    lines: ["So by the time the race begins, you will have been training for four months!"],
    choices: [
      { value: "a", label: "Present Simple — begins." },
      { value: "b", label: "Future Simple — will begin." },
    ],
    accepted: ["a"],
    feedback: "التركيب: By the time + Subject + Present Simple, Subject + will have been + V-ing.",
    origin: "source",
  },
];

// ------------------------------------------------------------
// التدريبات المورّدة §29–§32 ومفاتيحها المصدرية
// ------------------------------------------------------------

export const EXERCISE29_ITEMS_39 = [
  { n: 1, prompt: "① By 8:00, I will have ______ studying for three hours.", options: ["A. be", "B. been", "C. being"], answer: "B", answerText: "been" },
  { n: 2, prompt: "② She will have been ______ for five hours by noon.", options: ["A. work", "B. worked", "C. working"], answer: "C", answerText: "working" },
  { n: 3, prompt: "③ They ______ have been travelling for ten hours by midnight.", options: ["A. will", "B. are", "C. did"], answer: "A", answerText: "will" },
  { n: 4, prompt: "④ Will he have ______ waiting for an hour?", options: ["A. be", "B. been", "C. being"], answer: "B", answerText: "been" },
  { n: 5, prompt: "⑤ We won't have been ______ here for long.", options: ["A. live", "B. lived", "C. living"], answer: "C", answerText: "living" },
  { n: 6, prompt: "⑥ By next year, she will have been ______ English for three years.", options: ["A. learn", "B. learning", "C. learned"], answer: "B", answerText: "learning" },
] as const;

export const FILL30_ITEMS_39 = [
  { n: 1, prompt: "① By 9:00, I ______ (study) for four hours.", answer: "will have been studying" },
  { n: 2, prompt: "② By next month, she ______ (work) here for two years.", answer: "will have been working" },
  { n: 3, prompt: "③ They ______ (travel) for twelve hours by midnight.", answer: "will have been travelling" },
  { n: 4, prompt: "④ We ______ (not / wait) for long when you arrive.", answer: "won't have been waiting" },
  { n: 5, prompt: "⑤ ______ you ______ (learn) English for three years by next June?", answer: "Will you have been learning" },
  { n: 6, prompt: "⑥ By the time the teacher arrives, the students ______ (prepare) for the exam for an hour.", answer: "will have been preparing" },
] as const;

export const TENSE31_ITEMS_39 = [
  { n: 1, prompt: "① By Friday, I ______ (write) five articles.", answer: "future-perfect", answerText: "will have written", why: "عدد المقالات المكتملة." },
  { n: 2, prompt: "② By Friday, I ______ (write) articles for two weeks.", answer: "future-perfect-continuous", answerText: "will have been writing", why: "مدة نشاط الكتابة." },
  { n: 3, prompt: "③ By next year, they ______ (build) the bridge.", answer: "future-perfect", answerText: "will have built", why: "اكتمال الجسر." },
  { n: 4, prompt: "④ By next year, they ______ (build) the bridge for three years.", answer: "future-perfect-continuous", answerText: "will have been building", why: "مدة البناء." },
  { n: 5, prompt: "⑤ By June, she ______ (read) ten books.", answer: "future-perfect", answerText: "will have read", why: "عدد الكتب المكتملة." },
  { n: 6, prompt: "⑥ By June, she ______ (read) for six months.", answer: "future-perfect-continuous", answerText: "will have been reading", why: "مدة القراءة." },
  { n: 7, prompt: "⑦ By 8:00, I ______ (finish) my homework.", answer: "future-perfect", answerText: "will have finished", why: "إنجاز مكتمل." },
  { n: 8, prompt: "⑧ By 8:00, I ______ (study) for four hours.", answer: "future-perfect-continuous", answerText: "will have been studying", why: "مدة الدراسة." },
] as const;

export const DETECTIVE32_ITEMS_39 = [
  { n: 1, prompt: "I will have being studying for three hours.", answer: "I will have been studying for three hours.", why: "been لا being: الجزء الثابت هو التصريف الثالث من be." },
  { n: 2, prompt: "She will has been working here for five years.", answer: "She will have been working here for five years.", why: "بعد will يأتي have لا has، حتى مع She." },
  { n: 3, prompt: "They won't have been travel for long.", answer: "They won't have been travelling for long.", why: "بعد been يأتي الفعل مع ing: travelling." },
  { n: 4, prompt: "Will he have be waiting for an hour?", answer: "Will he have been waiting for an hour?", why: "be خطأ؛ المطلوب been." },
  { n: 5, prompt: "By the time you will arrive, I will have been studying.", answer: "By the time you arrive, I will have been studying.", why: "الجملة الزمنية المستقبلية بعد by the time تستخدم Present Simple." },
  { n: 6, prompt: "We will have been know each other for ten years.", answer: "We will have known each other for ten years.", why: "know فعل حالة، فنستخدم Future Perfect." },
  { n: 7, prompt: "He will have been worked for six hours.", answer: "He will have been working for six hours.", why: "بعد been يأتي V-ing لا V3 في الصيغة المستمرة." },
  { n: 8, prompt: "How long will she has been learning English?", answer: "How long will she have been learning English?", why: "في السؤال أيضًا have لا has." },
  { n: 9, prompt: "I won't have being sleeping for long.", answer: "I won't have been sleeping for long.", why: "بعد won't يأتي have been، ثم V-ing." },
  { n: 10, prompt: "By next year, they will have been build the bridge for three years.", answer: "By next year, they will have been building the bridge for three years.", why: "build صيغة أساسية؛ المطلوب building بعد been." },
] as const;

export const IQ33_ITEMS_39: ChoiceItem39[] = [
  {
    id: "work-both",
    prompt: "By next year, I will have worked here for ten years. / By next year, I will have been working here for ten years. هل الجملتان صحيحتان؟",
    lines: [
      "By next year, I will have worked here for ten years.",
      "By next year, I will have been working here for ten years.",
    ],
    choices: [
      { value: "yes", label: "نعم. الأولى تنظر إلى المدة بوصفها فترة ستكون قد اكتملت، والثانية تبرز امتداد النشاط حتى تلك النقطة." },
      { value: "no", label: "لا. وجود for يفرض Future Perfect Continuous دائمًا." },
    ],
    accepted: ["yes"],
    feedback: "المصدر: نعم. إذن وجود for لا يفرض Future Perfect Continuous دائمًا.",
    origin: "source",
  },
  {
    id: "live-both",
    prompt: "By June, she will have lived here for five years. / By June, she will have been living here for five years.",
    lines: ["By June, she will have lived here for five years.", "By June, she will have been living here for five years."],
    choices: [
      { value: "yes", label: "كلتا الجملتين صحيحتان." },
      { value: "no", label: "الثانية فقط صحيحة." },
    ],
    accepted: ["yes"],
    feedback: "المصدر: كلتا الجملتين صحيحتان.",
    nuance: "live وwork من الأفعال التي تسمح بالزمنين بحسب المعنى والتركيز (§26).",
    origin: "source",
  },
  {
    id: "advanced-rule",
    prompt: "ما القاعدة المتقدمة في هذا القسم؟",
    choices: [
      { value: "a", label: "لا تجعل الكلمات الدالة تتحكم بك بصورة آلية؛ الزمن طريقة للتعبير عن مدة نشاط ممتدة حتى نقطة مستقبلية." },
      { value: "b", label: "كل جملة فيها for تتطلب will have been + V-ing." },
    ],
    accepted: ["a"],
    feedback: "المصدر: Future Perfect Continuous ليس مجرد for + will have been + V-ing، بل هو طريقة للتعبير عن مدة نشاط ممتدة حتى نقطة مستقبلية.",
    origin: "source",
  },
];

// ------------------------------------------------------------
// §34 Reading Challenge — The Long Journey
// ------------------------------------------------------------

export const READING34_QUESTIONS_39 = [
  "① What time does the family plan to leave?",
  "② What time do they plan to arrive?",
  "③ How long will they have been travelling by noon?",
  "④ What will they have reached by 11:00?",
  "⑤ How long will they have been travelling by the time they arrive at the hotel?",
  "⑥ Which sentence uses Future Perfect?",
  "⑦ Which sentence uses Future Perfect Continuous?",
] as const;

/** نقاط رحلة العائلة — تُظهر أن حساب المصدر (6 ساعات / 12 ساعة) متفق مع الجدول. */
export const READING34_JOURNEY_39 = [
  { clock: "6:00 a.m.", label: "الانطلاق", detail: "They plan to leave at 6:00 in the morning.", hours: 0 },
  { clock: "11:00", label: "الوصول إلى الجبال", detail: "Yes, we will have reached the mountains by 11:00.", hours: 5 },
  { clock: "noon", label: "ست ساعات من السفر", detail: "By noon, we will have been travelling for six hours.", hours: 6 },
  { clock: "6:00 p.m.", label: "الوصول إلى الوجهة", detail: "They plan to arrive at their destination at 6:00 in the evening.", hours: 12 },
] as const;

/** تحليل الصيغ في النص — إضافة من المنصة (المصدر لم يقدّم تحليلًا لهذا النص). */
export const READING34_ANALYSIS_39 = [
  { line: "\"How long will we have been travelling by noon?\"", form: "How long will … have been travelling", why: "سؤال المدة عند نقطة مرجع مستقبلية (الظهر)." },
  { line: "\"By noon, we will have been travelling for six hours.\"", form: "will have been travelling", why: "Future Perfect Continuous: 6:00 صباحًا → الظهر = ست ساعات." },
  { line: "\"Will we have reached the mountains by then?\"", form: "Will we have reached", why: "سؤال Future Perfect عن اكتمال الوصول." },
  { line: "\"Yes, we will have reached the mountains by 11:00.\"", form: "will have reached", why: "Future Perfect: إنجاز مكتمل بحلول 11:00." },
  { line: "\"By the time we arrive at our hotel, we will have been travelling for twelve hours.\"", form: "will have been travelling", why: "Future Perfect Continuous مع جملة زمنية بـ Present Simple (arrive): 6:00 صباحًا → 6:00 مساءً = اثنتا عشرة ساعة." },
  { line: "They know it will be a long day, but they are excited about the adventure.", form: "will be", why: "Future Simple: توقع بشأن اليوم." },
] as const;

export const READING34_CHECK_39: ChoiceItem39[] = [
  {
    id: "six-hours",
    prompt: "تحقّق من الحساب: الانطلاق 6:00 صباحًا، والسؤال عن الظهر (noon).",
    choices: [
      { value: "a", label: "ست ساعات — كما في جواب الأب." },
      { value: "b", label: "اثنتا عشرة ساعة." },
    ],
    accepted: ["a"],
    feedback: "من 6:00 صباحًا إلى 12:00 ظهرًا = 6 ساعات: By noon, we will have been travelling for six hours.",
    origin: "platform",
  },
  {
    id: "twelve-hours",
    prompt: "تحقّق من الحساب: الانطلاق 6:00 صباحًا، والوصول 6:00 مساءً.",
    choices: [
      { value: "a", label: "ست ساعات." },
      { value: "b", label: "اثنتا عشرة ساعة — كما في جملة الأب الأخيرة." },
    ],
    accepted: ["b"],
    feedback: "من 6:00 صباحًا إلى 6:00 مساءً = 12 ساعة: we will have been travelling for twelve hours.",
    origin: "platform",
  },
  {
    id: "two-fpc-sentences",
    prompt: "السؤال ⑦ يطلب جملة Future Perfect Continuous. كم جملة بهذه الصيغة في النص؟",
    choices: [
      { value: "a", label: "جملتان: جملة الظهر (ست ساعات) وجملة الوصول إلى الفندق (اثنتا عشرة ساعة). مفتاح المصدر يذكر الأولى." },
      { value: "b", label: "جملة واحدة فقط هي جملة الظهر." },
    ],
    accepted: ["a"],
    feedback: "مفتاح المصدر للسؤال ⑦ هو: By noon, we will have been travelling for six hours. وجملة By the time we arrive at our hotel, we will have been travelling for twelve hours. مثال صحيح آخر على الصيغة نفسها.",
    nuance: "ملاحظة فيدلية من المنصة: المصدر لم يقدّم قائمة كاملة بجمل الصيغة، فلا يُعدّ ذكر جملة واحدة خطأً، لكن النص يتضمن جملتين.",
    origin: "platform",
  },
];

// ------------------------------------------------------------
// §37 Writing Mission · §38 الملخص · §39 خريطة المنهج
// ------------------------------------------------------------

export const WRITING37_CRITERIA_39 = [
  "① خمس جمل باستخدام Future Perfect Continuous.",
  "② جملتين باستخدام Future Perfect.",
  "③ جملتين باستخدام Future Continuous.",
  "④ جملة واحدة باستخدام Future Simple.",
  "⑤ جملة منفية باستخدام won't have been + V-ing.",
  "⑥ سؤالًا يبدأ بـ How long will you have been...?",
  "⑦ جملة تحتوي على by the time.",
  "⑧ ثلاثة تعبيرات زمنية مختلفة على الأقل.",
] as const;

export const WRITING37_MODEL_39 = [
  "By next year, I will have been learning English for several years.",
  "I will have completed many important lessons, and I will have improved my speaking skills.",
  "At this time next year, I will be working on a new educational project.",
  "By the time the school year ends, I will have been studying regularly for many months.",
  "I think these experiences will help me become more confident.",
] as const;

/** شروط النموذج الإرشادي — أي صيغة يمثلها كل سطر (إضافة منصة لدعم التقييم الذاتي). */
export const WRITING37_MODEL_FORMS_39 = [
  "Future Perfect Continuous",
  "Future Perfect (جملتان في سطر واحد)",
  "Future Continuous",
  "by the time + Present Simple مع Future Perfect Continuous",
  "Future Simple",
] as const;

export const SUMMARY_MATCH_39: ChoiceItem39[] = [
  {
    id: "sum-formula",
    prompt: "الصيغة:",
    choices: [
      { value: "a", label: "Subject + will + have + been + V-ing" },
      { value: "b", label: "Subject + will + has + been + V-ing" },
    ],
    accepted: ["a"],
    feedback: "مثال الملخص: By 8:00, I will have been studying for three hours.",
    origin: "source",
  },
  {
    id: "sum-negative",
    prompt: "النفي:",
    choices: [
      { value: "a", label: "Subject + won't + has been + V-ing" },
      { value: "b", label: "Subject + won't + have + been + V-ing" },
    ],
    accepted: ["b"],
    feedback: "مثال الملخص: She won't have been working here for a full year by June.",
    origin: "source",
  },
  {
    id: "sum-question",
    prompt: "السؤال:",
    choices: [
      { value: "a", label: "Will + Subject + have + been + V-ing?" },
      { value: "b", label: "Does + Subject + have been + V-ing?" },
    ],
    accepted: ["a"],
    feedback: "مثال الملخص: Will you have been studying for three hours by 8:00?",
    origin: "source",
  },
  {
    id: "sum-short",
    prompt: "الإجابة القصيرة:",
    choices: [
      { value: "a", label: "Yes, I will have been." },
      { value: "b", label: "Yes, I will. / No, I won't." },
    ],
    accepted: ["b"],
    feedback: "الملخص الذهبي: الإجابة القصيرة تستخدم will أو won't فقط.",
    origin: "source",
  },
  {
    id: "sum-howlong",
    prompt: "السؤال عن المدة:",
    choices: [
      { value: "a", label: "How long + will + Subject + have + been + V-ing?" },
      { value: "b", label: "How long + Subject + will + have been + V-ing?" },
    ],
    accepted: ["a"],
    feedback: "مثال الملخص: How long will you have been learning English by next year?",
    origin: "source",
  },
  {
    id: "sum-golden-fp",
    prompt: "المقارنة الذهبية — أي مثال يمثّل Future Perfect؟",
    choices: [
      { value: "a", label: "By Friday, I will have written five articles." },
      { value: "b", label: "By Friday, I will have been writing articles for two weeks." },
    ],
    accepted: ["a"],
    feedback: "التركيز على عدد المقالات المكتملة.",
    origin: "source",
  },
  {
    id: "sum-golden-fpc",
    prompt: "المقارنة الذهبية — أي مثال يمثّل Future Perfect Continuous؟",
    choices: [
      { value: "a", label: "By Friday, I will have written five articles." },
      { value: "b", label: "By Friday, I will have been writing articles for two weeks." },
    ],
    accepted: ["b"],
    feedback: "التركيز على مدة نشاط الكتابة.",
    origin: "source",
  },
];

/** أهم الاستخدامات الثلاثة كما وردت في الملخص §38. */
export const SUMMARY_USES_39 = [
  "① التعبير عن مدة نشاط ممتدة حتى نقطة مستقبلية.",
  "② قياس مدة نشاط عند وقوع حدث مستقبلي آخر.",
  "③ إبراز الاستمرار أو المدة بدل التركيز على الإنجاز المكتمل.",
] as const;

/** خريطة المنهج §39 — الصيغ الست المكتملة مع دروسها المنفَّذة في المستودع. */
export const CURRICULUM_MAP_39 = [
  { id: "will", order: "①", form: "Future Simple — WILL", lesson: 34, expression: "الحدث المستقبلي", pattern: "Subject + will + V1", status: "complete" as const },
  { id: "going-to", order: "②", form: "BE GOING TO", lesson: 35, expression: "الخطة والنية", pattern: "Subject + am/is/are going to + V1", status: "complete" as const },
  { id: "will-vs-going", order: "③", form: "WILL vs BE GOING TO", lesson: 36, expression: "القرار اللحظي", pattern: "will للقرار اللحظي · be going to للخطة المسبقة", status: "complete" as const },
  { id: "future-continuous", order: "④", form: "Future Continuous", lesson: 37, expression: "النشاط الجاري في لحظة مستقبلية", pattern: "Subject + will be + V-ing", status: "complete" as const },
  { id: "future-perfect", order: "⑤", form: "Future Perfect", lesson: 38, expression: "الإنجاز المكتمل بحلول نقطة مستقبلية", pattern: "Subject + will have + V3", status: "complete" as const },
  { id: "future-perfect-continuous", order: "⑥", form: "Future Perfect Continuous", lesson: 39, expression: "مدة النشاط الممتدة حتى نقطة مستقبلية", pattern: "Subject + will have been + V-ing", status: "complete" as const },
] as const;

/** المحطة القادمة كما وردت في §39 — مخططة فقط، وغير منفَّذة في هذا الإصدار. */
export const NEXT_LESSON_39 = {
  label: "الدرس 40: Future Tenses Master Review — المراجعة الشاملة لأزمنة المستقبل.",
  status: "planned-not-implemented" as const,
  note: "مخطَّط في نص المصدر. لم يُنفَّذ الدرس 40 في هذا الإصدار، ولا رابط له في التنقل حتى يُنشأ فعليًا.",
} as const;
