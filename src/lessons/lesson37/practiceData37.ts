// ============================================================
// Lesson 37 — بيانات الأنشطة التفاعلية
//
// المصدر: أمثلة الدرس 37 وحلوله المورّدة. كل نشاط هنا مبنيّ على أمثلة
// المصدر نفسها، والحلول التي يوردها المصدر تظهر بعد المحاولة بصيغة
// «مفتاح المصدر»؛ أما التفاسير الإضافية فهي من إعداد المنصة وتُوسَم كذلك.
// ============================================================

export type Choice37 = { value: string; label: string };
export type ChoiceItem37 = {
  id: string;
  prompt: string;
  lines?: string[];
  choices: Choice37[];
  accepted: string[];
  feedback: string;
  nuance?: string;
};

const FORM_CHOICES: Choice37[] = [
  { value: "future-simple", label: "Future Simple — will + V1" },
  { value: "going-to", label: "BE GOING TO" },
  { value: "future-continuous", label: "Future Continuous — will be + V-ing" },
];

/** §2 — مختبر اللحظة المستقبلية: ثلاث لحظات على الخط الزمني. */
export const TIMELINE_MOMENTS_37 = [
  {
    id: "six",
    clock: "6:00",
    label: "بداية الدراسة",
    sentence: "The study session starts at 6:00.",
    arabic: "تبدأ جلسة الدراسة عند السادسة.",
    isOngoing: false,
    note: "هذه لحظة حدوث/بداية، لا لحظة نشاط جارٍ.",
  },
  {
    id: "seven",
    clock: "7:00",
    label: "أثناء الدراسة",
    sentence: "At 7:00 tomorrow, I will be studying.",
    arabic: "غدًا عند السابعة، سأكون أدرس.",
    isOngoing: true,
    note: "هنا الكاميرا داخل النشاط نفسه: الدراسة جارية عند السابعة.",
  },
  {
    id: "nine",
    clock: "9:00",
    label: "نهاية الدراسة",
    sentence: "The study session ends at 9:00.",
    arabic: "تنتهي جلسة الدراسة عند التاسعة.",
    isOngoing: false,
    note: "هذه لحظة نهاية، لا لحظة نشاط جارٍ.",
  },
] as const;

/** §6 — أي جملة تصف النشاط الجاري في اللحظة المذكورة؟ */
export const MOMENT_ITEMS_37: ChoiceItem37[] = [
  {
    id: "exam-10",
    prompt: "غدًا عند الساعة العاشرة صباحًا سيكون الطالب في أثناء تقديم الامتحان. أي جملة تصف ذلك؟",
    choices: [
      { value: "a", label: "I will take my exam at 10:00 tomorrow morning." },
      { value: "b", label: "At 10:00 tomorrow morning, I will be taking my exam." },
    ],
    accepted: ["b"],
    feedback: "الجملة (B) تصف ما سيكون جاريًا عند الساعة العاشرة، لا موعد بدء الامتحان أو نهايته.",
    nuance: "الجملة (A) صحيحة نحويًا، لكنها تخبر بحدوث الفعل لا بجريانه عند تلك اللحظة.",
  },
  {
    id: "midnight-children",
    prompt: "عند منتصف الليل سيكون الأطفال نائمين. اختر الصيغة التي تصف الحالة الجارية.",
    choices: [
      { value: "a", label: "At midnight, the children will be sleeping." },
      { value: "b", label: "At midnight, the children will sleep." },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر: At midnight, the children will be sleeping. — نشاط جارٍ عند نقطة مستقبلية محددة.",
  },
  {
    id: "istanbul",
    prompt: "في مثل هذا الوقت غدًا سنكون في أثناء السفر بالطائرة إلى إسطنبول.",
    choices: [
      { value: "a", label: "This time tomorrow, we will fly to Istanbul." },
      { value: "b", label: "This time tomorrow, we will be flying to Istanbul." },
    ],
    accepted: ["b"],
    feedback: "«في مثل هذا الوقت غدًا» نقطة مستقبلية ننظر خلالها إلى نشاط جارٍ؛ لذلك Future Continuous.",
  },
  {
    id: "brother-training",
    prompt: "الجمعة القادمة عند الخامسة سيكون أخي في أثناء التدريب مع فريقه.",
    lines: ["my brother / train / with his team"],
    choices: [
      { value: "a", label: "At 5:00 next Friday, my brother will be training with his team." },
      { value: "b", label: "At 5:00 next Friday, my brother trains with his team." },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر نفسه: At 5:00 next Friday, my brother will be training with his team.",
    nuance: "الجملة (B) تصف عادة، لا لحظة مستقبلية محددة.",
  },
  {
    id: "happening-question",
    prompt: "أي سؤال يسأل عمّا سيكون جاريًا في لحظة مستقبلية؟",
    choices: [
      { value: "a", label: "What will happen at that moment?" },
      { value: "b", label: "What will be happening at that moment?" },
    ],
    accepted: ["b"],
    feedback: "القاعدة الذهنية في المصدر: What will be happening at that moment? — سؤال عن نشاط جارٍ داخل المستقبل.",
  },
];

/** §7 — كاميرا على الخط الزمني: مواضع الكاميرا الثلاثة. */
export const CAMERA_POSITIONS_37 = [
  {
    id: "past",
    label: "الماضي",
    time: "Yesterday at 8:00",
    sentence: "I was studying.",
    arabic: "أمس عند الثامنة، كنت أدرس.",
    form: "Past Continuous",
    note: "الكاميرا تصوّر نشاطًا كان جاريًا في الماضي.",
  },
  {
    id: "now",
    label: "الحاضر",
    time: "Now",
    sentence: "I am studying.",
    arabic: "الآن أنا أدرس.",
    form: "Present Continuous",
    note: "الكاميرا تصوّر نشاطًا جاريًا في هذه اللحظة.",
  },
  {
    id: "future",
    label: "المستقبل",
    time: "Tomorrow at 8:00",
    sentence: "I will be studying.",
    arabic: "غدًا عند الثامنة، سأكون أدرس.",
    form: "Future Continuous",
    note: "الكاميرا نُقلت إلى المستقبل لتصوير النشاط الذي سيكون جاريًا هناك.",
  },
] as const;

/** §8 — التعبيرات الزمنية: أي تعبير يناسب المشهد؟ */
export const TIME_EXPRESSION_ITEMS_37: ChoiceItem37[] = [
  {
    id: "beach",
    prompt: "مشهد: أسترخي على الشاطئ في الأسبوع القادم في مثل هذا الوقت. اختر التعبير الزمني الأنسب من المصدر.",
    choices: [
      { value: "a", label: "this time next week" },
      { value: "b", label: "from 6:00 to 9:00" },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر: This time next week, I'll be relaxing on the beach.",
  },
  {
    id: "workshop",
    prompt: "مشهد: ورشة عمل غدًا عند الثالثة. اختر التعبير الزمني الأنسب.",
    choices: [
      { value: "a", label: "at 3:00 tomorrow" },
      { value: "b", label: "when you arrive" },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر: At 3:00 tomorrow, she will be attending a workshop.",
  },
  {
    id: "tomorrow-alone",
    prompt: "هل تعبير tomorrow وحده يكفي لاختيار Future Continuous؟",
    choices: [
      { value: "yes", label: "نعم، وجود tomorrow يفرض Future Continuous." },
      { value: "no", label: "لا، المعنى والسياق هما اللذان يحددان الزمن." },
    ],
    accepted: ["no"],
    feedback: "المصدر: «وجود tomorrow وحدها لا تفرض استخدام Future Continuous. كما تعلمنا سابقًا، المعنى هو الذي يحدد الزمن.»",
  },
  {
    id: "waiting-arrival",
    prompt: "مشهد: أنت تنتظر عند وصول شخص. أي تعبير من قائمة المصدر يربط الحدثين؟",
    choices: [
      { value: "a", label: "when you arrive" },
      { value: "b", label: "all afternoon tomorrow" },
    ],
    accepted: ["a"],
    feedback: "«when you arrive» من تعبيرات المصدر، وهي جملة زمنية تُوصَل بـ Present Simple ثم Future Continuous.",
  },
];

/** §9 و§10 و§27 — مختبر المعنى: اختر الزمن بحسب ما يقدّمه المتحدث. */
export const MEANING_LAB_37: Record<string, ChoiceItem37[]> = {
  s09: [
    {
      id: "study-generic",
      prompt: "متحدث يخبر المستمع ببساطة أن الدراسة ستحدث غدًا، دون تصوير لحظة جارية.",
      lines: ["I will study tomorrow."],
      choices: [
        { value: "future-simple", label: "Future Simple" },
        { value: "future-continuous", label: "Future Continuous" },
      ],
      accepted: ["future-simple"],
      feedback: "المصدر: Future Simple يخبر بأن الدراسة ستحدث في المستقبل.",
      nuance: "المصدر يوضّح أيضًا أن هذه الجملة لا تعني بالضرورة أن الدراسة ستنتهي، وأن جملة Future Continuous لا تخبرنا بموعد البداية والنهاية.",
    },
    {
      id: "study-7",
      prompt: "متحدث يصف ما سيكون جاريًا عند الساعة السابعة غدًا.",
      lines: ["I will be studying at 7:00 tomorrow."],
      choices: [
        { value: "future-simple", label: "Future Simple" },
        { value: "future-continuous", label: "Future Continuous" },
      ],
      accepted: ["future-continuous"],
      feedback: "المصدر: نصف النشاط الذي سيكون جاريًا في لحظة مستقبلية.",
    },
    {
      id: "cook-generic",
      prompt: "متحدث يتحدث عن فعل مستقبلي: ستعد العشاء.",
      lines: ["She will cook dinner."],
      choices: [
        { value: "future-simple", label: "Future Simple" },
        { value: "future-continuous", label: "Future Continuous" },
      ],
      accepted: ["future-simple"],
      feedback: "المصدر: نحن نتحدث عن فعل مستقبلي بلا تصوير لحظة جارية.",
    },
    {
      id: "cook-6",
      prompt: "متحدث يصف ما ستكون جاريًا عليه عند الساعة السادسة.",
      lines: ["She will be cooking dinner at 6:00."],
      choices: [
        { value: "future-simple", label: "Future Simple" },
        { value: "future-continuous", label: "Future Continuous" },
      ],
      accepted: ["future-continuous"],
      feedback: "المصدر: نحن نصف ما سيكون جاريًا عند الساعة السادسة.",
    },
  ],
  s10: [
    {
      id: "travel-1",
      prompt: "جملة تخبر المستمع بحدث مستقبلي فقط: سأسافر غدًا.",
      lines: ["① I will travel tomorrow."],
      choices: FORM_CHOICES,
      accepted: ["future-simple"],
      feedback: "①: نخبر المستمع بحدث مستقبلي.",
    },
    {
      id: "travel-2",
      prompt: "جملة تبرز خطة أو نية مسبقة: أنوي السفر غدًا.",
      lines: ["② I am going to travel tomorrow."],
      choices: FORM_CHOICES,
      accepted: ["going-to"],
      feedback: "②: نبرز خطة أو نية مسبقة.",
    },
    {
      id: "travel-3",
      prompt: "جملة تبرز النشاط الجاري في لحظة مستقبلية: في مثل هذا الوقت غدًا سأكون في أثناء السفر.",
      lines: ["③ I will be travelling at this time tomorrow."],
      choices: FORM_CHOICES,
      accepted: ["future-continuous"],
      feedback: "③: نبرز النشاط الجاري في لحظة مستقبلية.",
      nuance: "المصدر: الجمل الثلاث قد تتحدث عن الرحلة نفسها، لكن طريقة تقديم الحدث مختلفة — وهذا جوهر فهم الأزمنة.",
    },
  ],
  s27: [
    {
      id: "project-1",
      prompt: "قد يكون قرارًا أو إخبارًا عن فعل مستقبلي يتعلق بمشروعك العلمي.",
      lines: ["① I'll work on the project tomorrow."],
      choices: FORM_CHOICES,
      accepted: ["future-simple"],
      feedback: "①: قرار أو إخبار عن فعل مستقبلي.",
    },
    {
      id: "project-2",
      prompt: "نبرز خطة مسبقة للعمل على المشروع.",
      lines: ["② I'm going to work on the project tomorrow."],
      choices: FORM_CHOICES,
      accepted: ["going-to"],
      feedback: "②: نبرز خطة مسبقة.",
    },
    {
      id: "project-3",
      prompt: "نبرز النشاط الجاري في لحظة مستقبلية محددة عند السابعة.",
      lines: ["③ I'll be working on the project at 7:00 tomorrow."],
      choices: FORM_CHOICES,
      accepted: ["future-continuous"],
      feedback: "③: نبرز النشاط الجاري في تلك اللحظة المستقبلية.",
      nuance: "قاعدة المصدر: اسأل نفسك هل أقدّمه كقرار، أم كخطة، أم أتخيل لحظة مستقبلية وأصف النشاط الجاري خلالها؟",
    },
  ],
};

/** §11 — حدث مستقبلي آخر يقع أثناء نشاط مستمر. */
export const TWO_EVENTS_ITEMS_37: ChoiceItem37[] = [
  {
    id: "mother",
    prompt: "والدتك تعود عند الخامسة، وأنت تعمل على مشروعك من الرابعة حتى السادسة. ما الذي يحدث أثناء ماذا؟",
    lines: ["When my mother arrives, I will be working on my project."],
    choices: [
      { value: "a", label: "الوصول يحدث أثناء استمرار العمل على المشروع." },
      { value: "b", label: "العمل على المشروع يحدث أثناء الوصول." },
    ],
    accepted: ["a"],
    feedback: "المصدر: لدينا حدثان — وصول والدتك، واستمرار العمل على المشروع. الوصول يحدث أثناء استمرار العمل.",
  },
  {
    id: "call",
    prompt: "عندما تتصل بي الليلة سأكون في أثناء الدراسة. اختر الصيغة الصحيحة لليلة القادمة.",
    lines: ["When you call me tonight, I ______."],
    choices: [
      { value: "a", label: "study" },
      { value: "b", label: "will be studying" },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: When you call me tonight, I will be studying.",
  },
  {
    id: "guests",
    prompt: "عندما يصل الضيوف سنكون نعدّ العشاء. اختر الصيغة الصحيحة.",
    lines: ["When the guests arrive, we ______ dinner."],
    choices: [
      { value: "a", label: "prepare" },
      { value: "b", label: "will be preparing" },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: When the guests arrive, we will be preparing dinner.",
  },
  {
    id: "event-pair",
    prompt: "في جملة «When my mother arrives, I will be working on my project» — أي جزء يمثل الحدث القصير؟",
    choices: [
      { value: "a", label: "When my mother arrives" },
      { value: "b", label: "I will be working on my project" },
    ],
    accepted: ["a"],
    feedback: "الجزء الذي يبدأ بـ when يمثل الحدث الذي يقع، والجملة الرئيسية تصف النشاط المستمر الذي يكون جاريًا عند وقوعه.",
  },
];

/** §12 — جملة زمنية أم سؤال مباشر؟ */
export const WHEN_ITEMS_37: ChoiceItem37[] = [
  {
    id: "direct-question",
    prompt: "صنّف: When will you arrive?",
    choices: [
      { value: "time", label: "جملة زمنية ← Present Simple" },
      { value: "question", label: "سؤال مباشر ← will صحيحة" },
    ],
    accepted: ["question"],
    feedback: "المصدر: هنا When أداة سؤال مباشر، ولذلك استخدام will صحيح.",
  },
  {
    id: "time-clause",
    prompt: "صنّف: When you arrive, I'll call you.",
    choices: [
      { value: "time", label: "جملة زمنية ← Present Simple" },
      { value: "question", label: "سؤال مباشر ← will صحيحة" },
    ],
    accepted: ["time"],
    feedback: "المصدر: هنا When تبدأ جملة زمنية، فنستخدم Present Simple.",
    nuance: "المثال الخطأ في المصدر: When you will arrive, I will be studying. ❌ — والصحيح: When you arrive, I will be studying. ✅",
  },
  {
    id: "lesson-starts",
    prompt: "أكمل: When the lesson ______, I will be taking notes.",
    choices: [
      { value: "a", label: "starts" },
      { value: "b", label: "will start" },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر: When the lesson starts, I will be taking notes. — الجملة الزمنية بـ Present Simple والمعنى مستقبلي.",
  },
  {
    id: "embedded-question",
    prompt: "صنّف (حالة متقدمة): I don't know when you will arrive.",
    choices: [
      { value: "time", label: "جملة زمنية ← Present Simple" },
      { value: "question", label: "سؤال غير مباشر داخل جملة ← will صحيحة" },
    ],
    accepted: ["question"],
    feedback: "هنا العبارة سؤال غير مباشر (embedded question) وليست جملة زمنية؛ لذلك يبقى will صحيحًا: I don't know when you will arrive.",
    nuance: "إضافة من المنصة: قاعدة المصدر تخصّ الجملة الزمنية (When you arrive, …). أما السؤال غير المباشر «when you will arrive» فيبقى فيه will صحيحًا، مثل: Tell me when you will arrive.",
  },
];

/** §13 — while: ترتيب الفعلين بين الجملتين. */
export const WHILE_ITEMS_37: ChoiceItem37[] = [
  {
    id: "presentation",
    prompt: "أكمل جملة while الأولى من المصدر: While you ______ tomorrow evening, I will be preparing the presentation.",
    choices: [
      { value: "a", label: "are studying" },
      { value: "b", label: "will be studying" },
    ],
    accepted: ["a"],
    feedback: "المصدر يستخدم Present Continuous في جملة while للإشارة إلى نشاط مستقبلي، مع Future Continuous في الجملة الرئيسية.",
    nuance: "في السياق نفسه يمكن أن تأتي جملة while بصيغة Present Simple كذلك؛ الفهم يعتمد على وظيفة الجملة لا على ترجمة كل فعل حرفيًا.",
  },
  {
    id: "teachers",
    prompt: "أكمل: While the students are taking the exam, the teachers ______ the next activity.",
    choices: [
      { value: "a", label: "will be preparing" },
      { value: "b", label: "prepare" },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر: While the students are taking the exam, the teachers will be preparing the next activity.",
  },
  {
    id: "while-meaning",
    prompt: "ما معنى while في المصدر؟",
    choices: [
      { value: "a", label: "بينما / أثناء" },
      { value: "b", label: "قبل / بعد" },
    ],
    accepted: ["a"],
    feedback: "المصدر: While تعني بينما / أثناء، ويمكن استخدامها لربط نشاطين.",
  },
];

/** §14 — حوار Tomorrow's Schedule: تحليل سطرًا بسطر. */
export const DIALOGUE_LINES_37 = [
  { id: "d1", speaker: "Lena", en: "Can I call you tomorrow at 9:00?", ar: "هل يمكنني الاتصال بك غدًا عند التاسعة؟", analysis: "سؤال عن موعد مستقبلي محدد، مقدّمة للحوار.", form: "سؤال زمني مستقبلي" },
  { id: "d2", speaker: "Omar", en: "I'm afraid I'll be attending an online class at that time.", ar: "أخشى أنني سأكون أحضر درسًا عبر الإنترنت في ذلك الوقت.", analysis: "نشاط سيكون جاريًا عند التاسعة.", form: "Future Continuous" },
  { id: "d3", speaker: "Lena", en: "What about 11:00?", ar: "ماذا عن الحادية عشرة؟", analysis: "اقتراح موعد بديل.", form: "قِصَر التعبير عن اقتراح" },
  { id: "d4", speaker: "Omar", en: "I'll be working on my science project until noon.", ar: "سأكون أعمل على مشروع العلوم حتى الظهر.", analysis: "نشاط مستمر خلال فترة مستقبلية.", form: "Future Continuous" },
  { id: "d5", speaker: "Lena", en: "Will you be studying all morning?", ar: "هل ستكون تدرس طوال الصباح؟", analysis: "سؤال عن نشاط سيكون جاريًا.", form: "Yes/No question + be + V-ing" },
  { id: "d6", speaker: "Omar", en: "Almost! But I'll be free after lunch.", ar: "تقريبًا! لكنني سأكون متفرغًا بعد الغداء.", analysis: "إجابة + إخبار عن وقت التفرّغ (Future Simple مع صفة).", form: "Future Simple" },
  { id: "d7", speaker: "Lena", en: "Great. I'll call you at 2:00.", ar: "رائع. سأتصل بك عند الثانية.", analysis: "قرار أو ترتيب للتواصل في وقت مستقبلي.", form: "Future Simple" },
] as const;

/** §15 — مجريات متوقعة ضمن برنامج. */
export const ROUTINE_ITEMS_37: ChoiceItem37[] = [
  {
    id: "office-lunch",
    prompt: "لا تتصل بالمكتب عند الواحدة. اختر الصيغة التي تصف النشاط المتوقع ضمن سير الأمور المعتاد.",
    lines: ["Everyone ______ lunch at 1:00."],
    choices: [
      { value: "a", label: "will have" },
      { value: "b", label: "will be having" },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: Don't call the office at 1:00. Everyone will be having lunch.",
    nuance: "هنا have تعني «يتناول» لا «يملك»، فالصيغة المستمرة مناسبة تمامًا.",
  },
  {
    id: "final-test",
    prompt: "في مثل هذا الوقت الاثنين القادم سيكون صفنا في أثناء الاختبار النهائي.",
    lines: ["This time next Monday, our class ______ the final test."],
    choices: [
      { value: "a", label: "will be taking" },
      { value: "b", label: "takes" },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر: This time next Monday, our class will be taking the final test.",
  },
  {
    id: "workers",
    prompt: "سيكون العمال يعملون على إصلاح الطريق طوال عطلة نهاية الأسبوع.",
    lines: ["The workers ______ the road throughout the weekend."],
    choices: [
      { value: "a", label: "will be repairing" },
      { value: "b", label: "will repair" },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر: The workers will be repairing the road throughout the weekend.",
    nuance: "المصدر: في هذه الأمثلة لا نركز على قرار لحظي، بل نصف النشاط المتوقع خلال وقت أو فترة مستقبلية.",
  },
];

/** §16 و§17 — السؤال المهذب والفرق بين WILL YOU و WILL YOU BE + V-ing. */
export const POLITE_ITEMS_37: ChoiceItem37[] = [
  {
    id: "computer",
    prompt: "تريد معرفة ما إذا كان الحاسوب سيكون متاحًا لك الليلة. اختر السؤال الأنسب لذلك.",
    choices: [
      { value: "a", label: "Will you use the computer tonight?" },
      { value: "b", label: "Will you be using the computer tonight?" },
    ],
    accepted: ["b"],
    feedback: "المصدر: هنا نسأل عن نشاط متوقع ضمن برنامج الشخص، وربما نريد معرفة ما إذا كان الحاسوب سيكون متاحًا لنا.",
    nuance: "الصيغة (A) قد تكون سؤالًا عن قرار الشخص أو استعداده للاستخدام، لا عن متاح الحاسوب.",
  },
  {
    id: "supermarket",
    prompt: "تريد أن يعرف صديقك أنك تسأل عن برنامجه لأنه قد يشتري شيئًا لك أثناء ذهابه.",
    choices: [
      { value: "a", label: "Will you go to the supermarket later?" },
      { value: "b", label: "Will you be going to the supermarket later?" },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: Will you be going to the supermarket later? — السؤال عن البرنامج المتوقع.",
  },
  {
    id: "drive",
    prompt: "تريد أن تسأل عن برنامج صديقك في الذهاب بالسيارة إلى المدرسة قبل أن تطلب مرافقته.",
    choices: [
      { value: "a", label: "Will you drive me to school?" },
      { value: "b", label: "Will you be driving to school tomorrow?" },
    ],
    accepted: ["b"],
    feedback: "المصدر: نسأل عما سيكون ضمن برنامج الشخص. قد نريد أن نطلب منه مرافقتنا، لكننا لم نطلب ذلك بعد.",
    nuance: "الصيغة (A) تُستخدم كطلب أو سؤال عن الاستعداد، لا كسؤال عن البرنامج.",
  },
  {
    id: "staying-home",
    prompt: "أي سؤال يركز على البرنامج أو الوضع المتوقع للمخاطب هذا المساء؟",
    choices: [
      { value: "a", label: "Will you stay at home this evening?" },
      { value: "b", label: "Will you be staying at home this evening?" },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: Will you be staying at home this evening? — السؤال يركز على البرنامج أو الوضع المتوقع.",
  },
];

/** §18 و§19 — بناء النفي وتشخيص الأخطاء الشائعة. */
export const NEGATIVE_BUILD_37 = [
  { id: "midnight", n: 1, base: "I will be studying at midnight.", negative: "I won't be studying at midnight.", alt: "I will not be studying at midnight.", arabic: "لن أكون أدرس عند منتصف الليل." },
  { id: "morning", n: 2, base: "She will be working tomorrow morning.", negative: "She won't be working tomorrow morning.", alt: "She will not be working tomorrow morning.", arabic: "لن تكون تعمل صباح الغد." },
  { id: "weekend", n: 3, base: "They will be travelling this weekend.", negative: "They won't be travelling this weekend.", alt: "They will not be travelling this weekend.", arabic: "لن يكونوا مسافرين في عطلة نهاية الأسبوع هذه." },
  { id: "lab", n: 4, base: "We will be using the laboratory at 4:00.", negative: "We won't be using the laboratory at 4:00.", alt: "We will not be using the laboratory at 4:00.", arabic: "لن نكون نستخدم المختبر عند الرابعة." },
] as const;

export const NEGATIVE_ERROR_ITEMS_37: ChoiceItem37[] = [
  {
    id: "neg-1",
    prompt: "أي صيغة النفي الصحيحة للجملة I will be studying.?",
    lines: ["I won't studying. ❌", "I won't be studying. ✅"],
    choices: [
      { value: "a", label: "I won't studying." },
      { value: "b", label: "I won't be studying." },
    ],
    accepted: ["b"],
    feedback: "لا تحذف be بعد won't: won't + be + V-ing.",
  },
  {
    id: "neg-2",
    prompt: "ما الخطأ في She doesn't will be working.؟",
    choices: [
      { value: "a", label: "دخل الفعل المساعد does على will، والصحيح She won't be working." },
      { value: "b", label: "لا يوجد خطأ، الجملة صحيحة." },
    ],
    accepted: ["a"],
    feedback: "المصدر: She doesn't will be working. ❌ — والصحيح: She won't be working. ✅",
    nuance: "النفي في هذا الزمن يقع على will نفسها، فلا حاجة إلى do/does.",
  },
  {
    id: "neg-3",
    prompt: "ما الخطأ في They will not are playing.؟",
    lines: ["They will not are playing. ❌", "They will not be playing. ✅"],
    choices: [
      { value: "a", label: "استُخدم are بعد will not، والصحيح be." },
      { value: "b", label: "يجب حذف not." },
    ],
    accepted: ["a"],
    feedback: "المصدر: لا تستبدل be بـ am أو is أو are بعد will.",
  },
  {
    id: "neg-4",
    prompt: "أكمل: He won't be ______.",
    choices: [
      { value: "a", label: "study" },
      { value: "b", label: "studying" },
    ],
    accepted: ["b"],
    feedback: "المصدر: He won't be study. ❌ — والصحيح: He won't be studying. ✅ الصيغة بعد be هي V-ing.",
  },
];

/** §20 و§21 — بناء السؤال والإجابة القصيرة. */
export const YESNO_BUILD_37 = [
  { id: "she-8", n: 1, base: "She will be studying at 8:00.", question: "Will she be studying at 8:00?" },
  { id: "you-tomorrow", n: 2, base: "You will be working tomorrow.", question: "Will you be working tomorrow?" },
  { id: "he-midnight", n: 3, base: "He will be sleeping at midnight.", question: "Will he be sleeping at midnight?" },
  { id: "them-waiting", n: 4, base: "They will be waiting for us.", question: "Will they be waiting for us?" },
  { id: "students-10", n: 5, base: "The students will be taking the exam at 10:00.", question: "Will the students be taking the exam at 10:00?" },
] as const;

export const SHORT_ANSWER_ITEMS_37: ChoiceItem37[] = [
  {
    id: "sa-1",
    prompt: "Will you be studying tonight? — أي إجابة قصيرة صحيحة (نعم)؟",
    choices: [
      { value: "a", label: "Yes, I will." },
      { value: "b", label: "Yes, I will be studying." },
    ],
    accepted: ["a"],
    feedback: "المصدر: الإجابة القصيرة تستخدم will أو won't، ولا نكرر be + V-ing في الإجابة القصيرة المعتادة.",
  },
  {
    id: "sa-2",
    prompt: "Will she be working tomorrow? — أي إجابة قصيرة صحيحة (لا)؟",
    choices: [
      { value: "a", label: "No, she won't." },
      { value: "b", label: "No, she doesn't." },
    ],
    accepted: ["a"],
    feedback: "نفي الإجابة القصيرة في هذا الزمن يكون بـ won't.",
  },
  {
    id: "sa-3",
    prompt: "Will they be waiting?",
    choices: [
      { value: "a", label: "Yes, they will." },
      { value: "b", label: "Yes, they are." },
    ],
    accepted: ["a"],
    feedback: "المصدر: Yes, they will. / No, they won't.",
  },
];

/** §22 و§23 — أسئلة Wh ووظيفة who. */
export const WH_BUILD_37 = [
  { id: "what-afternoon", n: 1, prompt: "ماذا ستكون تفعل غدًا بعد الظهر؟", question: "What will you be doing tomorrow afternoon?" },
  { id: "where-staying", n: 2, prompt: "أين سيكونون يقيمون الأسبوع القادم؟", question: "Where will they be staying next week?" },
  { id: "when-working", n: 3, prompt: "متى ستكون تعمل؟", question: "When will she be working?" },
  { id: "why-alone", n: 4, prompt: "لماذا سيكون مسافرًا بمفرده؟", question: "Why will he be travelling alone?" },
  { id: "who-meeting", n: 5, prompt: "من ستقابل غدًا؟", question: "Who will you be meeting tomorrow?" },
  { id: "how-long", n: 6, prompt: "كم من الوقت سيقيمون؟", question: "How long will they be staying?" },
] as const;

export const WHO_ROLE_ITEMS_37: ChoiceItem37[] = [
  {
    id: "who-subject",
    prompt: "في: Who will be leading the team? — ما وظيفة Who؟",
    choices: [
      { value: "subject", label: "Who هي الفاعل" },
      { value: "object", label: "Who هي المفعول به" },
    ],
    accepted: ["subject"],
    feedback: "المصدر: هنا Who هي الفاعل، لذلك يأتي بعدها will be + V-ing مباشرة دون فاعل آخر.",
  },
  {
    id: "who-object",
    prompt: "في: Who will you be meeting? — ما وظيفة Who؟",
    choices: [
      { value: "subject", label: "Who هي الفاعل" },
      { value: "object", label: "Who هي المفعول به" },
    ],
    accepted: ["object"],
    feedback: "المصدر: هنا You هو الفاعل، وWho تشير إلى الشخص الذي ستقابله؛ لذلك يختلف ترتيب الكلمات.",
  },
  {
    id: "who-order",
    prompt: "أكمل الترتيب الصحيح للفاعل Who:",
    lines: ["Who ______ the team?"],
    choices: [
      { value: "a", label: "will be leading" },
      { value: "b", label: "will you be leading" },
    ],
    accepted: ["a"],
    feedback: "عندما تكون Who هي الفاعل: Who + will + be + V-ing؟",
  },
];

/** §24 — قواعد إضافة ing (نصوص المصدر + تدريب إضافي معلَّم). */
export const ING_ITEMS_37 = [
  { base: "work", answer: "working", rule: "نضيف ing مباشرة" },
  { base: "read", answer: "reading", rule: "نضيف ing مباشرة" },
  { base: "play", answer: "playing", rule: "نضيف ing مباشرة" },
  { base: "study", answer: "studying", rule: "نضيف ing مباشرة" },
  { base: "write", answer: "writing", rule: "نحذف e الصامتة" },
  { base: "make", answer: "making", rule: "نحذف e الصامتة" },
  { base: "dance", answer: "dancing", rule: "نحذف e الصامتة" },
  { base: "run", answer: "running", rule: "نضاعف الحرف الأخير" },
  { base: "sit", answer: "sitting", rule: "نضاعف الحرف الأخير" },
  { base: "swim", answer: "swimming", rule: "نضاعف الحرف الأخير" },
  { base: "lie", answer: "lying", rule: "ie ← ying" },
  { base: "die", answer: "dying", rule: "ie ← ying" },
  { base: "travel", answer: "travelling", rule: "مضاعفة في الكتابة البريطانية (كما في أمثلة الدرس)" },
  { base: "visit", answer: "visiting", rule: "لا مضاعفة: المقطع الأخير غير مُشدَّد" },
  { base: "begin", answer: "beginning", rule: "مضاعفة: المقطع الأخير مُشدَّد وينتهي CVC" },
  { base: "open", answer: "opening", rule: "لا مضاعفة: المقطع الأخير غير مُشدَّد" },
] as const;

/** §25 — أفعال الحالة مع Future Continuous. */
export const STATE_VERB_ITEMS_37: ChoiceItem37[] = [
  {
    id: "know",
    prompt: "بمعنى الحالة (امتلاك معرفة): اختر الجملة الصحيحة.",
    lines: ["I ______ the answer tomorrow."],
    choices: [
      { value: "a", label: "I will know the answer tomorrow." },
      { value: "b", label: "I will be knowing the answer tomorrow." },
    ],
    accepted: ["a"],
    feedback: "المصدر: I will know the answer tomorrow. ✅ — وI will be knowing the answer tomorrow. ❌ في الاستعمال المعتاد.",
  },
  {
    id: "own",
    prompt: "بمعنى الملكية: اختر الجملة الصحيحة.",
    lines: ["She ______ the house next year."],
    choices: [
      { value: "a", label: "She will own the house next year." },
      { value: "b", label: "She will be owning the house next year." },
    ],
    accepted: ["a"],
    feedback: "المصدر: She will own the house next year. ✅ — وShe will be owning the house next year. ❌ في الاستعمال المعتاد.",
  },
  {
    id: "think",
    prompt: "بمعنى نشاط التفكير (لا امتلاك رأي): اختر الجملة الصحيحة.",
    lines: ["I ______ about your suggestion tonight."],
    choices: [
      { value: "a", label: "I will be thinking about your suggestion tonight." },
      { value: "b", label: "I will think about your suggestion tonight." },
    ],
    accepted: ["a"],
    feedback: "المصدر: I will be thinking about your suggestion tonight. — هنا think تصف نشاط التفكير، لا مجرد امتلاك رأي.",
    nuance: "الصيغة (B) صحيحة نحويًا كذلك، لكن صيغة المصدر تصوّر التفكير كنشاط جارٍ في تلك الليلة.",
  },
  {
    id: "having-lunch",
    prompt: "الفعل have في «يتناول الغداء» — أي صيغة صحيحة (كما في مثال §15)؟",
    lines: ["Everyone ______ lunch at 1:00."],
    choices: [
      { value: "a", label: "will be having" },
      { value: "b", label: "will be owning" },
    ],
    accepted: ["a"],
    feedback: "have بمعنى يتناول فعل نشاط، لذا تصح الصيغة المستمرة: Everyone will be having lunch. أما own بمعنى يملك فتبقى حالة.",
    nuance: "إضافة من المنصة: الحكم يعتمد على المعنى في السياق، لا على الفعل وحده.",
  },
];

/** §26 — اختيار الزمن المستمر بحسب النقطة المرجعية. */
export const CONTINUOUS_SELECT_37: ChoiceItem37[] = [
  {
    id: "now",
    prompt: "نشاط جارٍ الآن. اختر الزمن الذي تصفه: I am reading now.",
    choices: [
      { value: "present", label: "Present Continuous — am/is/are + V-ing (الحاضر)" },
      { value: "past", label: "Past Continuous — was/were + V-ing (لحظة في الماضي)" },
      { value: "future", label: "Future Continuous — will be + V-ing (لحظة في المستقبل)" },
    ],
    accepted: ["present"],
    feedback: "النقطة المرجعية هنا هي الحاضر.",
  },
  {
    id: "yesterday",
    prompt: "أي زمن نستخدم لوصف نشاط كان جاريًا عند الثامنة أمس؟",
    lines: ["I was reading at 8:00 yesterday."],
    choices: [
      { value: "present", label: "Present Continuous" },
      { value: "past", label: "Past Continuous" },
      { value: "future", label: "Future Continuous" },
    ],
    accepted: ["past"],
    feedback: "النقطة المرجعية لحظة في الماضي.",
  },
  {
    id: "tomorrow",
    prompt: "أي زمن نستخدم لوصف نشاط سيكون جاريًا عند الثامنة غدًا؟",
    lines: ["I will be reading at 8:00 tomorrow."],
    choices: [
      { value: "present", label: "Present Continuous" },
      { value: "past", label: "Past Continuous" },
      { value: "future", label: "Future Continuous" },
    ],
    accepted: ["future"],
    feedback: "النقطة المرجعية لحظة في المستقبل.",
    nuance: "الفكرة المشتركة بين الأزمنة الثلاثة: نشاط جارٍ عند نقطة زمنية معينة، والاختلاف في موقع تلك النقطة على الخط الزمني.",
  },
];

/** §28 — التدريب التأسيسي: ستة أسئلة مع حلول المصدر. */
export const EXERCISE28_ITEMS_37 = [
  { n: 1, prompt: "① At 9:00 tomorrow, I will ______ studying.", options: ["A. am", "B. be", "C. being"], answer: "B", answerText: "be" },
  { n: 2, prompt: "② She will be ______ dinner at 6:00.", options: ["A. cook", "B. cooked", "C. cooking"], answer: "C", answerText: "cooking" },
  { n: 3, prompt: "③ They ______ be working tomorrow morning.", options: ["A. will", "B. are", "C. did"], answer: "A", answerText: "will" },
  { n: 4, prompt: "④ Will he ______ sleeping at midnight?", options: ["A. is", "B. be", "C. being"], answer: "B", answerText: "be" },
  { n: 5, prompt: "⑤ We won't be ______ the laboratory tomorrow.", options: ["A. use", "B. used", "C. using"], answer: "C", answerText: "using" },
  { n: 6, prompt: "⑥ This time next week, she ______ be travelling.", options: ["A. will", "B. does", "C. is"], answer: "A", answerText: "will" },
] as const;

/** §29 — تدريب التحويلات: النفي والسؤال (حلول المصدر). */
export const TRANSFORM29_ITEMS_37 = [
  { n: 1, base: "① He will be working tomorrow afternoon.", negative: "He won't be working tomorrow afternoon.", question: "Will he be working tomorrow afternoon?" },
  { n: 2, base: "② They will be travelling next Friday.", negative: "They won't be travelling next Friday.", question: "Will they be travelling next Friday?" },
  { n: 3, base: "③ We will be preparing dinner at 6:00.", negative: "We won't be preparing dinner at 6:00.", question: "Will we be preparing dinner at 6:00?" },
  { n: 4, base: "④ Sara will be studying at midnight.", negative: "Sara won't be studying at midnight.", question: "Will Sara be studying at midnight?" },
  { n: 5, base: "⑤ The children will be playing in the garden.", negative: "The children won't be playing in the garden.", question: "Will the children be playing in the garden?" },
] as const;

/** §30 — Grammar Detective: الأخطاء العشرة وتصحيحات المصدر. */
export const DETECTIVE30_ITEMS_37 = [
  { n: 1, prompt: "I will studying at 7:00 tomorrow.", answer: "I will be studying at 7:00 tomorrow.", why: "ينقص be بعد will قبل الصيغة المستمرة." },
  { n: 2, prompt: "She will is working next week.", answer: "She will be working next week.", why: "بعد will يأتي be لا is." },
  { n: 3, prompt: "They won't be play football.", answer: "They won't be playing football.", why: "بعد be يأتي الفعل بصيغة V-ing لا V1." },
  { n: 4, prompt: "Will he be study tonight?", answer: "Will he be studying tonight?", why: "الخطأ في صيغة الفعل بعد be." },
  { n: 5, prompt: "We will be watches a film at 9:00.", answer: "We will be watching a film at 9:00.", why: "لا تُصرَّف watches بعد be؛ الصيغة هي V-ing." },
  { n: 6, prompt: "When you will arrive, I will be waiting.", answer: "When you arrive, I will be waiting.", why: "الجملة الزمنية بـ when تأخذ Present Simple لا will." },
  { n: 7, prompt: "Does she will be working tomorrow?", answer: "Will she be working tomorrow?", why: "السؤال يُبنى بنقل will قبل الفاعل، بلا does." },
  { n: 8, prompt: "He will be knowing the answer soon.", answer: "He will know the answer soon.", why: "know فعل حالة بمعنى المعرفة، فلا يُستخدم عادةً في الصيغة المستمرة." },
  { n: 9, prompt: "I won't being sleeping at midnight.", answer: "I won't be sleeping at midnight.", why: "بعد won't يأتي be لا being." },
  { n: 10, prompt: "What will you doing at this time tomorrow?", answer: "What will you be doing at this time tomorrow?", why: "سؤال Wh يحتاج be قبل V-ing." },
] as const;

/** §31 — IQ200: ثمانية مواقف مع مفتاح المصدر. */
export const IQ200_ITEMS_37 = [
  { n: 1, lines: ["① A: Someone is calling you!", "B: I ______ answer the phone."], answer: "will", answerText: "will", why: "قرار لحظي." },
  { n: 2, lines: ["② We decided yesterday. We ______ visit the science museum next week."], answer: "going-to", answerText: "are going to", why: "خطة مسبقة." },
  { n: 3, lines: ["③ At 8:00 tomorrow, I ______ study for my exam."], answer: "future-continuous", answerText: "will be studying", why: "نشاط سيكون جاريًا عند الثامنة." },
  { n: 4, lines: ["④ Look at those clouds! It ______ rain."], answer: "going-to", answerText: "is going to", why: "توقع نبرز فيه دليلًا حاضرًا." },
  { n: 5, lines: ["⑤ I promise I ______ return your book."], answer: "will", answerText: "will", why: "وعد." },
  { n: 6, lines: ["⑥ When you arrive tomorrow, we ______ prepare dinner."], answer: "future-continuous", answerText: "will be preparing", why: "نشاط سيكون جاريًا عند وصول الشخص." },
  { n: 7, lines: ["⑦ This time next month, they ______ travel around Europe."], answer: "future-continuous", answerText: "will be travelling", why: "نشاط جارٍ في لحظة مستقبلية." },
  { n: 8, lines: ["⑧ I think technology ______ change our lives dramatically."], answer: "will", answerText: "will", why: "توقع أو اعتقاد." },
] as const;

/** §32 — أسئلة فهم نص A Busy Saturday (ثمانية أسئلة). */
export const READING32_QUESTIONS_37 = [
  "① What will Daniel be doing at 8:00?",
  "② Where will he be at 9:30?",
  "③ Why shouldn't Adam call him at 10:00?",
  "④ What will Daniel be doing at noon?",
  "⑤ What is Daniel going to do in the afternoon?",
  "⑥ Why is be going to suitable for the visit?",
  "⑦ What will he be doing at 7:00?",
  "⑧ Why does his sister ask whether he will be using the computer?",
] as const;

/** إضافة من المنصة: تحليل صيغ المستقبل في نص القراءة (لا يُخفي النص). */
export const READING32_ANALYSIS_37 = [
  { line: "Next Saturday will be a very busy day for Daniel.", form: "Future Simple (will + be)", why: "إخبار وتوقع عام عن يوم مزدحم؛ لا يوجد نشاط جارٍ عند لحظة محددة." },
  { line: "At 8:00 in the morning, he will be having breakfast with his family.", form: "Future Continuous", why: "نشاط سيكون جاريًا عند لحظة مستقبلية محددة (8:00)." },
  { line: "At 9:30, he will be attending a robotics workshop.", form: "Future Continuous", why: "وصف نشاط جارٍ عند نقطة محددة، لا موعد بداية الورشة." },
  { line: "\"Don't call me at 10:00. I'll be learning how to program a small robot.\"", form: "Future Continuous (سلبًا لمطلوب الاتصال)", why: "سبب الطلب: النشاط سيكون جاريًا في تلك اللحظة." },
  { line: "\"What will you be doing at noon?\"", form: "Wh-question + Future Continuous", why: "سؤال عن نشاط متوقع في لحظة مستقبلية." },
  { line: "\"I'll be travelling back home.\"", form: "Future Continuous", why: "نشاط جارٍ خلال فترة السفر في ذلك الوقت." },
  { line: "In the afternoon, Daniel is going to visit his grandparents.", form: "BE GOING TO", why: "ترتيب مسبق: He arranged the visit earlier this week." },
  { line: "At 7:00 in the evening, he will be preparing his school presentation.", form: "Future Continuous", why: "نشاط جارٍ عند السابعة مساءً." },
  { line: "\"Will you be using the computer at 8:00?\"", form: "Yes/No question + Future Continuous", why: "سؤال عن برنامج متوقع، والهدف معرفة توفّر الحاسوب." },
  { line: "\"Yes, I will. But you can use it after 9:00.\"", form: "إجابة قصيرة + Present Simple", why: "الإجابة القصيرة تستخدم will وحدها، ثم معلومة عن إمكانية الاستخدام لاحقًا." },
] as const;

/** §33 — التحدي المتقدم: هل الزمنان صحيحان؟ */
export const ADVANCED33_ITEMS_37: ChoiceItem37[] = [
  {
    id: "work-pair",
    prompt: "قارن: I will work tomorrow. / I will be working tomorrow.",
    choices: [
      { value: "both", label: "الجملتان صحيحتان، والفرق في التركيز." },
      { value: "only-first", label: "الأولى فقط صحيحة." },
      { value: "only-second", label: "الثانية فقط صحيحة." },
    ],
    accepted: ["both"],
    feedback: "المصدر: نعم، الجملتان صحيحتان. الأولى تخبرنا أن العمل سيحدث غدًا، والثانية تصوّر العمل بوصفه نشاطًا جاريًا خلال الغد.",
    nuance: "الجملة الثانية قد تُستخدم أيضًا عند الحديث عن برنامج الشخص المتوقع.",
  },
  {
    id: "travel-pair",
    prompt: "قارن: Will you travel next week? / Will you be travelling next week?",
    choices: [
      { value: "both", label: "كلتاهما صحيحتان." },
      { value: "only-first", label: "الأولى فقط صحيحة." },
      { value: "only-second", label: "الثانية فقط صحيحة." },
    ],
    accepted: ["both"],
    feedback: "المصدر: كلتاهما صحيحتان، لكن الثانية قد تبدو أكثر طبيعية عندما نستفسر عن برنامج الشخص لا عندما نطلب منه اتخاذ قرار.",
  },
  {
    id: "no-clock",
    prompt: "هل يحتاج Future Continuous دائمًا إلى ساعة محددة مثل 8:00؟",
    choices: [
      { value: "yes", label: "نعم، لا بد من ساعة محددة." },
      { value: "no", label: "لا، يمكن استخدامه لنشاط جارٍ خلال فترة مستقبلية أو ضمن برنامج متوقع." },
    ],
    accepted: ["no"],
    feedback: "المصدر: Future Continuous لا يحتاج دائمًا إلى ساعة محددة مثل 8:00 أو 9:00؛ يمكن استخدامه أيضًا للحديث عن نشاط جارٍ خلال فترة مستقبلية أو ضمن برنامج متوقع.",
    nuance: "وقد رأينا في §15: The workers will be repairing the road throughout the weekend.",
  },
];

/** §36 — مهمة الكتابة: الشروط الثمانية ونموذج المصدر. */
export const WRITING36_CRITERIA_37 = [
  "① خمس جمل باستخدام Future Continuous.",
  "② جملتين باستخدام WILL.",
  "③ جملتين باستخدام BE GOING TO.",
  "④ جملة منفية باستخدام won't be + V-ing.",
  "⑤ سؤالًا يبدأ بـ Will you be...?",
  "⑥ سؤالًا يبدأ بـ What will you be...?",
  "⑦ جملة تحتوي على when مع Future Continuous.",
  "⑧ ثلاثة تعبيرات زمنية مختلفة على الأقل.",
] as const;

export const WRITING36_MODEL_37 = [
  "Tomorrow will be a busy day for me.",
  "At 8:00, I will be attending my English class. At 10:00, I will be working on a new project.",
  "In the afternoon, I'm going to visit my cousin because we arranged the visit yesterday.",
  "When my father arrives, I will be preparing dinner.",
  "I won't be using my phone during my study time.",
] as const;

/** §1 — الأهداف العشرة (تُستخدم في قائمة المراجعة الذاتية للخطوة الأولى). */
export const OBJECTIVES_37 = [
  "① فهم المعنى الحقيقي للمستقبل المستمر.",
  "② تكوين الجملة باستخدام will be + V-ing.",
  "③ وصف نشاط سيكون جاريًا عند وقت معين في المستقبل.",
  "④ التعبير عن حدث مستمر أثناء وقوع حدث مستقبلي آخر.",
  "⑤ استخدام Future Continuous للحديث عن مجريات متوقعة ضمن برنامج أو ترتيب مستقبلي.",
  "⑥ تكوين الإثبات والنفي والسؤال والإجابات القصيرة.",
  "⑦ طرح أسئلة باستخدام What وWhere وWhen وWho.",
  "⑧ التمييز بين Future Simple وFuture Continuous.",
  "⑨ المقارنة بين Present Continuous وPast Continuous وFuture Continuous.",
  "⑩ اكتشاف الأخطاء الشائعة وحل اختبار شامل من 25 سؤالًا.",
] as const;
