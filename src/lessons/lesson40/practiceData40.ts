// ============================================================
// Lesson 40 — بيانات المختبرات التفاعلية والتدريبات التكوينية
// خالية تمامًا من مصطلحات التوثيق التحريري في واجهة الطالب.
// ============================================================

export type TenseChannel40 = "will" | "going" | "fc" | "fp" | "fpc";

export type ChoiceItem40 = {
  id: string;
  prompt: string;
  lines?: readonly string[];
  choices: readonly { value: string; label: string }[];
  accepted: readonly string[];
  feedback: string;
  nuance?: string;
};

export const OBJECTIVES_40 = [
  "① اختيار صيغة المستقبل المناسبة دون الاعتماد الآلي على الكلمات الدالة.",
  "② التمييز بين القرار اللحظي والخطة المسبقة.",
  "③ التعبير عن التوقعات والوعود والعروض.",
  "④ وصف نشاط سيكون جاريًا في لحظة مستقبلية.",
  "⑤ وصف إنجاز سيكون مكتملًا بحلول نقطة مستقبلية.",
  "⑥ التعبير عن مدة نشاط ممتدة حتى نقطة مستقبلية.",
  "⑦ التمييز بين Future Perfect وFuture Perfect Continuous.",
  "⑧ استخدام الجمل الزمنية المستقبلية بصورة صحيحة.",
  "⑨ تحليل النصوص التي تحتوي على عدة أزمنة مستقبلية.",
  "⑩ كتابة فقرة مترابطة تجمع جميع الصيغ التي تعلمناها.",
] as const;

export const DECISION_MAP_QUESTIONS_40 = [
  {
    id: "q1",
    order: "السؤال الأول",
    question: "هل أتخذ القرار الآن؟",
    example: "The phone is ringing. I'll answer it.",
    translation: "الهاتف يرن. سأجيب عليه.",
    typicalForm: "WILL",
    channel: "will" as TenseChannel40,
    category: "قرار لحظي في لحظة الكلام",
    guidance: "استخدام نموذجي لـ WILL عندما ينشأ القرار فورًا استجابةً لموقف طارئ أثناء الحديث.",
  },
  {
    id: "q2",
    order: "السؤال الثاني",
    question: "هل أتحدث عن نية أو خطة موجودة مسبقًا؟",
    example: "I'm going to join a programming course next month.",
    translation: "أنوي الالتحاق بدورة برمجة الشهر القادم.",
    typicalForm: "BE GOING TO",
    channel: "going" as TenseChannel40,
    category: "نية أو خطة مقررة سلفًا",
    guidance: "استخدام نموذجي لـ BE GOING TO عندما يكون القرار قد اتُّخذ قبل لحظة الكلام.",
  },
  {
    id: "q3",
    order: "السؤال الثالث",
    question: "هل أصف نشاطًا سيكون جاريًا عند لحظة مستقبلية؟",
    example: "At 8:00 tomorrow, I'll be studying.",
    translation: "غدًا عند الثامنة، سأكون أدرس.",
    typicalForm: "Future Continuous",
    channel: "fc" as TenseChannel40,
    category: "نشاط جارٍ داخل نافذة مستقبلية",
    guidance: "نختار Future Continuous (will be + V-ing) عندما نضع العدسة داخل لحظة أو فترة مستقبلية.",
  },
  {
    id: "q4",
    order: "السؤال الرابع",
    question: "هل أركز على إنجاز سيكون مكتملًا بحلول نقطة مستقبلية؟",
    example: "By 9:00, I'll have finished my homework.",
    translation: "بحلول التاسعة، سأكون قد أنهيت واجبي.",
    typicalForm: "Future Perfect",
    channel: "fp" as TenseChannel40,
    category: "إنجاز مكتمل بحلول نقطة مرجعية",
    guidance: "نختار Future Perfect (will have + V3) لإبراز اكتمال النتيجة قبل أو عند النقطة المستقبلية.",
  },
  {
    id: "q5",
    order: "السؤال الخامس",
    question: "هل أركز على مدة نشاط ممتدة حتى نقطة مستقبلية؟",
    example: "By 9:00, I'll have been studying for three hours.",
    translation: "بحلول التاسعة، سأكون قد أمضيت ثلاث ساعات في الدراسة.",
    typicalForm: "Future Perfect Continuous",
    channel: "fpc" as TenseChannel40,
    category: "مدة نشاط ممتدة حتى نقطة مرجعية",
    guidance: "نختار Future Perfect Continuous (will have been + V-ing) عندما نقيس كم استمر النشاط حتى تلك النقطة.",
  },
  {
    id: "q6",
    order: "السؤال السادس",
    question: "هل أقدم وعدًا أو توقعًا عامًا أو عرض مساعدة؟",
    example: "I promise I'll help you.",
    translation: "أعدك بأنني سأساعدك.",
    typicalForm: "WILL",
    channel: "will" as TenseChannel40,
    category: "وعد أو عرض مساعدة أو توقع عام",
    guidance: "استخدام نموذجي لـ WILL في الوعود والعروض والتوقعات المبنية على الرأي أو الاعتقاد.",
  },
] as const;

export const DECISION_MAP_QUIZ_40: readonly ChoiceItem40[] = [
  {
    id: "dm-1",
    prompt: "الهاتف يرن الآن وتقرر الإجابة في اللحظة نفسها — أي سؤال من الخريطة الكبرى يقودك إلى الصيغة؟",
    lines: ["The phone is ringing. I'll answer it."],
    choices: [
      { value: "q1", label: "السؤال الأول: هل أتخذ القرار الآن؟ → WILL" },
      { value: "q2", label: "السؤال الثاني: هل أتحدث عن نية أو خطة موجودة مسبقًا؟ → BE GOING TO" },
    ],
    accepted: ["q1"],
    feedback: "قرار اتُّخذ لحظة سماع الرنين، فالصيغة النموذجية هي WILL في جملة I'll answer it.",
  },
  {
    id: "dm-2",
    prompt: "تريد إبراز أن الواجب سيكون مكتملًا بحلول الساعة التاسعة — أي صيغة تختار؟",
    lines: ["By 9:00, I'll have finished my homework."],
    choices: [
      { value: "fp", label: "Future Perfect — will have + V3" },
      { value: "fpc", label: "Future Perfect Continuous — will have been + V-ing" },
    ],
    accepted: ["fp"],
    feedback: "السؤال الرابع يركّز على الإنجاز المكتمل بحلول نقطة مستقبلية عبر صيغة Future Perfect.",
  },
  {
    id: "dm-3",
    prompt: "تريد إبراز أنك ستكون قد أمضيت ثلاث ساعات في الدراسة بحلول التاسعة — أي صيغة تختار؟",
    lines: ["By 9:00, I'll have been studying for three hours."],
    choices: [
      { value: "fpc", label: "Future Perfect Continuous — will have been + V-ing" },
      { value: "fc", label: "Future Continuous — will be + V-ing" },
    ],
    accepted: ["fpc"],
    feedback: "السؤال الخامس يركّز على مدة النشاط الممتدة حتى نقطة مستقبلية عبر صيغة Future Perfect Continuous.",
  },
  {
    id: "dm-4",
    prompt: "تريد طمأنة زميلك بوعد صريح بالمساعدة — أي سؤال يقودك إلى الصيغة النموذجية؟",
    lines: ["I promise I'll help you."],
    choices: [
      { value: "q6", label: "السؤال السادس: هل أقدم وعدًا أو توقعًا عامًا أو عرض مساعدة؟ → WILL" },
      { value: "q3", label: "السؤال الثالث: هل أصف نشاطًا سيكون جاريًا عند لحظة مستقبلية؟ → Future Continuous" },
    ],
    accepted: ["q6"],
    feedback: "الوعد الصريح مع I promise يندرج تحت السؤال السادس ويُصاغ نموذجيًا بـ WILL.",
  },
];

export const GOLDEN_TABLE_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "gt-1",
    prompt: "لماذا يضم الجدول الذهبي خمس صيغ رئيسية بينما درسنا ست محطات في الدروس 34–39؟",
    choices: [
      { value: "l36", label: "لأن الدرس 36 كان مخصصًا للمقارنة بين WILL وBE GOING TO، فتبقى الصيغ الرئيسية خمسًا" },
      { value: "dropped", label: "لأن إحدى الصيغ لم تعد مستخدمة في الإنجليزية المعاصرة" },
    ],
    accepted: ["l36"],
    feedback: "الدرس 36 خُصص للمقارنة بين الصيغتين الأوليين، لذلك تبقى البنى النحوية الرئيسية خمسًا.",
  },
  {
    id: "gt-2",
    prompt: "أي صيغة في الجدول الذهبي تركيبها الأساسي will be + V-ing؟",
    choices: [
      { value: "fc", label: "Future Continuous — نشاط جارٍ في وقت مستقبلي" },
      { value: "fp", label: "Future Perfect — إنجاز مكتمل بحلول وقت مستقبلي" },
    ],
    accepted: ["fc"],
    feedback: "Future Continuous يُبنى من will be + V-ing ويصف نشاطًا جاريًا في وقت مستقبلي.",
  },
  {
    id: "gt-3",
    prompt: "أي صيغة في الجدول الذهبي تبرز «نية أو خطة، توقع مبني على دليل»؟",
    choices: [
      { value: "going", label: "BE GOING TO — am/is/are going to + V1" },
      { value: "fpc", label: "Future Perfect Continuous — will have been + V-ing" },
    ],
    accepted: ["going"],
    feedback: "BE GOING TO تُبنى من am/is/are going to + V1 وتبرز النية أو الخطة المسبقة أو التوقع المبني على دليل حاضر.",
  },
];

export const STUDY_PERSPECTIVES_40 = [
  {
    id: "p1",
    num: "①",
    channel: "will" as TenseChannel40,
    form: "Future Simple — WILL",
    structure: "Subject + will + V1",
    sentence: "I will study tonight.",
    arabic: "سأدرس الليلة.",
    emphasis: "نخبر المستمع عن فعل مستقبلي، وقد تكون الجملة قرارًا اتُّخذ الآن بحسب السياق.",
  },
  {
    id: "p2",
    num: "②",
    channel: "going" as TenseChannel40,
    form: "BE GOING TO",
    structure: "Subject + am/is/are going to + V1",
    sentence: "I'm going to study tonight.",
    arabic: "أنوي الدراسة الليلة.",
    emphasis: "نبرز وجود نية أو خطة مسبقة.",
  },
  {
    id: "p3",
    num: "③",
    channel: "fc" as TenseChannel40,
    form: "Future Continuous",
    structure: "Subject + will be + V-ing",
    sentence: "At 8:00 tonight, I will be studying.",
    arabic: "الليلة عند الثامنة، سأكون أدرس.",
    emphasis: "نبرز النشاط الجاري عند الثامنة.",
  },
  {
    id: "p4",
    num: "④",
    channel: "fp" as TenseChannel40,
    form: "Future Perfect",
    structure: "Subject + will have + V3",
    sentence: "By 10:00 tonight, I will have finished studying.",
    arabic: "بحلول العاشرة الليلة، سأكون قد انتهيت من الدراسة.",
    emphasis: "نبرز اكتمال النشاط.",
  },
  {
    id: "p5",
    num: "⑤",
    channel: "fpc" as TenseChannel40,
    form: "Future Perfect Continuous",
    structure: "Subject + will have been + V-ing",
    sentence: "By 10:00 tonight, I will have been studying for four hours.",
    arabic: "بحلول العاشرة الليلة، سأكون قد أمضيت أربع ساعات في الدراسة.",
    emphasis: "نبرز مدة النشاط.",
  },
] as const;

export const PREPARE_PERSPECTIVES_40 = [
  {
    id: "prep-1",
    num: "①",
    channel: "will" as TenseChannel40,
    form: "Future Simple — WILL",
    structure: "Subject + will + V1",
    sentence: "I will prepare the presentation tonight.",
    arabic: "سأجهز العرض الليلة.",
    emphasis: "إخبار عن فعل مستقبلي أو قرار يُتخذ الآن لتجهيز العرض.",
  },
  {
    id: "prep-2",
    num: "②",
    channel: "going" as TenseChannel40,
    form: "BE GOING TO",
    structure: "Subject + am/is/are going to + V1",
    sentence: "I'm going to prepare the presentation tonight.",
    arabic: "أنوي تجهيز العرض الليلة.",
    emphasis: "إبراز أن نية التجهيز وخطته مقررتان مسبقًا.",
  },
  {
    id: "prep-3",
    num: "③",
    channel: "fc" as TenseChannel40,
    form: "Future Continuous",
    structure: "Subject + will be + V-ing",
    sentence: "At 8:00 tonight, I will be preparing the presentation.",
    arabic: "عند الثامنة الليلة، سأكون أجهز العرض.",
    emphasis: "تصوير عملية التجهيز جاريةً عند الساعة الثامنة.",
  },
  {
    id: "prep-4",
    num: "④",
    channel: "fp" as TenseChannel40,
    form: "Future Perfect",
    structure: "Subject + will have + V3",
    sentence: "By 10:00 tonight, I will have prepared the presentation.",
    arabic: "بحلول العاشرة الليلة، سأكون قد جهزت العرض.",
    emphasis: "إبراز أن العرض سيكون جاهزًا ومكتملًا بحلول العاشرة.",
  },
  {
    id: "prep-5",
    num: "⑤",
    channel: "fpc" as TenseChannel40,
    form: "Future Perfect Continuous",
    structure: "Subject + will have been + V-ing",
    sentence: "By 10:00 tonight, I will have been preparing the presentation for three hours.",
    arabic: "بحلول العاشرة الليلة، سأكون قد أمضيت ثلاث ساعات في تجهيز العرض.",
    emphasis: "إبراز طول مدة العمل الممتدة حتى العاشرة.",
  },
] as const;

export const STUDY_PERSPECTIVES_QUIZ_40: readonly ChoiceItem40[] = [
  {
    id: "sp-1",
    prompt: "أي جملة من الزوايا الخمس تبرز أن الدراسة ستكون جارية في لحظة محددة (8:00)؟",
    choices: [
      { value: "p3", label: "At 8:00 tonight, I will be studying." },
      { value: "p4", label: "By 10:00 tonight, I will have finished studying." },
    ],
    accepted: ["p3"],
    feedback: "At 8:00 tonight, I will be studying تضع التركيز على النشاط الجاري عند الثامنة.",
  },
  {
    id: "sp-2",
    prompt: "ما القاعدة الجوهرية التي نستخلصها من مقارنة الجمل الخمس للفعل study؟",
    choices: [
      { value: "focus", label: "لا يكفي أن تعرف متى يحدث الفعل؛ يجب أن تعرف ما الذي تريد إبرازه بشأنه" },
      { value: "same", label: "جميع الجمل الخمس تقدم المعلومة نفسها تمامًا بلا أي فرق" },
    ],
    accepted: ["focus"],
    feedback: "كل الجمل تتحدث عن الدراسة في المستقبل، لكنها تختلف في الزاوية التي تبرزها للمستمع.",
  },
];

export const WILL_VS_GOING_TO_SCENARIOS_40: readonly ChoiceItem40[] = [
  {
    id: "wg-1",
    prompt: "الموقف الأول: تجلس مع صديقك، وفجأة يسقط كتابه — ماذا تقول؟",
    choices: [
      { value: "will", label: "I'll pick it up." },
      { value: "going", label: "I'm going to pick it up (كخطة مسبقة منذ أمس)." },
    ],
    accepted: ["will"],
    feedback: "قرار لحظي أو عرض مساعدة في لحظة سقوط الكتاب: I'll pick it up.",
  },
  {
    id: "wg-2",
    prompt: "الموقف الثاني: قررت منذ أسبوع أن تبدأ تعلم العزف على الغيتار — أي صيغة تبرز هذه الخطة المسبقة؟",
    choices: [
      { value: "going", label: "I'm going to learn to play the guitar." },
      { value: "will", label: "I'll learn to play the guitar (كقرار لحظي مفاجئ)." },
    ],
    accepted: ["going"],
    feedback: "خطة مسبقة اتُّخذ قرارها منذ أسبوع: I'm going to learn to play the guitar.",
    nuance: "ملاحظة دلالية: I will learn مقبولة نحويًا كإعلان مستقبلي عام، لكن BE GOING TO هي الصيغة النموذجية لإبراز النية المسبقة.",
  },
  {
    id: "wg-3",
    prompt: "الموقف الثالث: تتحدث عن توقع عام لمستقبل المدن مع I think — ماذا تلاحظ؟",
    choices: [
      { value: "will", label: "I think cities will become greener. (الصيغة النموذجية للتوقع العام)" },
      { value: "going", label: "I think cities are going to become greener. (صحيحة أيضًا عند تداخل التوقعات)" },
    ],
    accepted: ["will", "going"],
    feedback: "I think cities will become greener هي الصيغة النموذجية للتوقع العام.",
    nuance: "كلا الاختيارين سليم نحويًا؛ إذ قد تتداخل will وgoing to في التوقعات، والفروق تصف الاستخدامات النموذجية لا حدودًا مطلقة.",
  },
  {
    id: "wg-4",
    prompt: "الموقف الرابع: ترى طفلًا يحمل صندوقًا ثقيلًا، والصندوق يكاد يسقط أمامك الآن — أي صيغة تبرز الدليل الحاضر؟",
    choices: [
      { value: "going", label: "He's going to drop that box!" },
      { value: "fp", label: "He will have dropped that box!" },
    ],
    accepted: ["going"],
    feedback: "توقع نبرز فيه دليلًا حاضرًا مرئيًا الآن: He's going to drop that box!",
  },
];

export const FUTURE_CONTINUOUS_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "fc-1",
    prompt: "لديك درس عبر الإنترنت غدًا من 6:00 حتى 7:30، ويسألك صديقك: Can I call you at 6:30? — لماذا نجيب بـ Future Continuous؟",
    lines: ["I'm afraid I'll be attending an online lesson at that time."],
    choices: [
      { value: "in-progress", label: "لأننا نركز على النشاط الجاري عند السادسة والنصف، لا على بداية الدرس أو نهايته" },
      { value: "completed", label: "لأن الدرس سيكون قد انتهى قبل السادسة والنصف" },
    ],
    accepted: ["in-progress"],
    feedback: "الساعة 6:30 تقع داخل فترة الدرس (6:00–7:30)، فنصف النشاط الجاري في تلك اللحظة.",
  },
  {
    id: "fc-2",
    prompt: "ما الوظيفة التواصلية الطبيعية للسؤال: Will you be using your laptop tonight?",
    lines: ["Will you be using your laptop tonight?"],
    choices: [
      { value: "polite", label: "الاستفسار الطبيعي والمهذب عن برنامج شخص أو مدى توفر الحاسوب الليلة" },
      { value: "past", label: "السؤال عن حدث انتهى في الماضي" },
    ],
    accepted: ["polite"],
    feedback: "يُستخدم هذا السؤال بصورة طبيعية للاستفسار عن برنامج شخص أو مدى توفر الحاسوب دون إلحاح.",
  },
];

export const FUTURE_PERFECT_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "fp-1",
    prompt: "موعد تسليم المشروع يوم الجمعة، وأنت تتوقع إنهاءه يوم الأربعاء — ماذا تبرز جملة: By Friday, I will have completed the project.؟",
    lines: ["By Friday, I will have completed the project."],
    choices: [
      { value: "completed-by", label: "اكتمال المشروع قبل أو بحلول النقطة المستقبلية (يوم الجمعة)" },
      { value: "duration", label: "عدد الساعات التي استغرقها المشروع دون إشارة إلى اكتماله" },
    ],
    accepted: ["completed-by"],
    feedback: "Future Perfect يبرز اكتمال الحدث بالنسبة إلى نقطة مستقبلية، وليس مجرد وقوعه في المستقبل.",
  },
  {
    id: "fp-2",
    prompt: "في جملة: By the time the guests arrive, we'll have prepared everything. — متى يكتمل التجهيز؟",
    lines: ["By the time the guests arrive, we'll have prepared everything."],
    choices: [
      { value: "before-arrival", label: "بحلول لحظة وصول الضيوف يكون كل شيء قد جُهّز واكتمل" },
      { value: "after-arrival", label: "يبدأ التجهيز بعد مغادرة الضيوف" },
    ],
    accepted: ["before-arrival"],
    feedback: "By the time the guests arrive تحدد النقطة المرجعية التي يكون كل شيء قد اكتمل بحلولها.",
  },
];

export const FUTURE_PERFECT_CONTINUOUS_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "fpc-1",
    prompt: "بدأت سارة التدريب الساعة 2:00، وننظر إلى مدة تدريبها عند الساعة 6:00 — ما الجملة الصحيحة؟",
    choices: [
      { value: "four", label: "By 6:00, Sara will have been training for four hours." },
      { value: "two", label: "By 6:00, Sara will have been training for two hours." },
    ],
    accepted: ["four"],
    feedback: "من الثانية إلى السادسة = أربع ساعات: By 6:00, Sara will have been training for four hours.",
  },
  {
    id: "fpc-2",
    prompt: "ما السؤال الأساسي الذي يجيب عنه Future Perfect Continuous؟",
    choices: [
      { value: "how-long", label: "How long will the activity have been continuing by that future point?" },
      { value: "what-completed", label: "What will have been completed by that future point?" },
    ],
    accepted: ["how-long"],
    feedback: "السؤال الأساسي لـ Future Perfect Continuous هو قياس مدة استمرار النشاط حتى النقطة المستقبلية.",
  },
];

export const ADAM_TIMELINE_POINTS_40 = [
  {
    id: "in-progress-6",
    clock: "At 6:00",
    channel: "fc" as TenseChannel40,
    tense: "Future Continuous",
    formula: "will be + V-ing",
    questionAr: "ماذا سيكون آدم يفعل عند السادسة؟",
    sentence: "At 6:00, Adam will be working on his project.",
    translation: "عند السادسة، سيكون آدم يعمل على مشروعه.",
    focus: "التركيز: النشاط الجاري.",
    windowInfo: "الساعة 6:00 تقع في منتصف فترة العمل (4:00 → 8:00).",
    barStartPct: 0,
    barWidthPct: 50,
  },
  {
    id: "completed-8",
    clock: "By 8:00 (النتيجة)",
    channel: "fp" as TenseChannel40,
    tense: "Future Perfect",
    formula: "will have + V3",
    questionAr: "هل سيكون المشروع قد اكتمل بحلول الثامنة؟",
    sentence: "By 8:00, Adam will have completed his project.",
    translation: "بحلول الثامنة، سيكون آدم قد أكمل مشروعه.",
    focus: "التركيز: الإنجاز المكتمل.",
    windowInfo: "عند الساعة 8:00 ننظر إلى اكتمال المشروع كنتيجة منجزة.",
    barStartPct: 92,
    barWidthPct: 8,
  },
  {
    id: "duration-8",
    clock: "By 8:00 (المدة: 4 ساعات)",
    channel: "fpc" as TenseChannel40,
    tense: "Future Perfect Continuous",
    formula: "will have been + V-ing",
    questionAr: "كم ساعة سيكون آدم قد أمضى في العمل بحلول الثامنة؟",
    sentence: "By 8:00, Adam will have been working on his project for four hours.",
    translation: "بحلول الثامنة، سيكون آدم قد أمضى أربع ساعات في العمل على مشروعه.",
    focus: "التركيز: مدة النشاط.",
    windowInfo: "من 4:00 إلى 8:00 = 4 ساعات ممتدة حتى نقطة المرجع.",
    barStartPct: 0,
    barWidthPct: 100,
  },
] as const;

export const ADAM_COMPARISON_QUIZ_40: readonly ChoiceItem40[] = [
  {
    id: "adam-1",
    prompt: "يعمل آدم من 4:00 إلى 8:00 — إذا سألنا: «ماذا سيكون آدم يفعل عند السادسة؟» فما الجملة المناسبة؟",
    choices: [
      { value: "fc", label: "At 6:00, Adam will be working on his project." },
      { value: "fp", label: "At 6:00, Adam will have completed his project." },
    ],
    accepted: ["fc"],
    feedback: "عند السادسة ما يزال المشروع جاريًا، فنستخدم Future Continuous.",
  },
  {
    id: "adam-2",
    prompt: "إذا أردنا إبراز أن المشروع سيكون منجزًا بحلول الثامنة، فما الصيغة الأنسب؟",
    choices: [
      { value: "fp", label: "By 8:00, Adam will have completed his project. (Future Perfect)" },
      { value: "fc", label: "By 8:00, Adam will be working on his project. (Future Continuous)" },
    ],
    accepted: ["fp"],
    feedback: "Future Perfect يبرز الإنجاز المكتمل بحلول الثامنة.",
  },
  {
    id: "adam-3",
    prompt: "إذا أردنا إبراز مدة الساعات الأربع (من 4:00 إلى 8:00) بحلول الثامنة، فما الصيغة الأنسب؟",
    choices: [
      { value: "fpc", label: "By 8:00, Adam will have been working on his project for four hours. (Future Perfect Continuous)" },
      { value: "fp", label: "By 8:00, Adam will have completed his project. (Future Perfect)" },
    ],
    accepted: ["fpc"],
    feedback: "Future Perfect Continuous يبرز مدة النشاط الممتدة (for four hours) حتى الثامنة.",
  },
];

export const DEEP_UNDERSTANDING_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "du-1",
    prompt: "هل تعني جملة By 8:00, I will have been studying for four hours. بالضرورة أن المتحدث لن يتوقف عند الثامنة؟",
    lines: ["By 8:00, I will have been studying for four hours."],
    choices: [
      { value: "no", label: "لا — الجملة تبرز المدة (4 ساعات) ولا تخبرنا وحدها هل سيتوقف عند الثامنة أم سيستمر بعدها" },
      { value: "yes", label: "نعم — تعني حتمًا أن الدراسة لم تنتهِ وستستمر بعد الثامنة" },
    ],
    accepted: ["no"],
    feedback: "هذه الجملة لا تخبرنا وحدها هل سيتوقف المتحدث عند الثامنة أم سيستمر بعدها؛ إنها تبرز طول المدة.",
  },
  {
    id: "du-2",
    prompt: "ما المعيار الدقيق للفرق بين Future Perfect وFuture Perfect Continuous؟",
    choices: [
      { value: "focus", label: "Future Perfect = التركيز على الإنجاز أو النتيجة · Future Perfect Continuous = التركيز على المدة أو امتداد النشاط" },
      { value: "shortcut", label: "Future Perfect = انتهى · Future Perfect Continuous = لم ينتهِ" },
    ],
    accepted: ["focus"],
    feedback: "الاختصار الشائع «انتهى / لم ينتهِ» غير دقيق؛ الفرق الحقيقي هو زاوية التركيز بين النتيجة المكتملة وامتداد المدة.",
  },
];

export const SIGNAL_WORDS_LIST_40 = [
  "tomorrow",
  "next week",
  "at 8:00",
  "this time tomorrow",
  "by Friday",
  "by the time",
  "for three hours",
  "since Monday",
] as const;

export const SIGNAL_WORDS_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "sw-1",
    prompt: "انظر إلى الجملتين مع by Friday — أيتهما صحيحة نحويًا؟",
    lines: ["I will finish the report by Friday.", "I will have finished the report by Friday."],
    choices: [
      { value: "both", label: "كلتا الجملتين صحيحتان، مع اختلاف في التركيز" },
      { value: "only-fp", label: "الثانية فقط؛ لأن وجود by يمنع استخدام will finish" },
    ],
    accepted: ["both"],
    feedback: "الأولى تقدم حدث الإنهاء المستقبلي مع موعد نهائي، والثانية تبرز الاكتمال من منظور النقطة المستقبلية.",
  },
  {
    id: "sw-2",
    prompt: "انظر إلى الجملتين مع for ten years — أيتهما صحيحة نحويًا؟",
    lines: ["By next year, I'll have worked here for ten years.", "By next year, I'll have been working here for ten years."],
    choices: [
      { value: "both", label: "كلتا الجملتين صحيحتان، مع اختلاف في التركيز" },
      { value: "only-fpc", label: "الثانية فقط؛ لأن وجود for يفرض Future Perfect Continuous دائمًا" },
    ],
    accepted: ["both"],
    feedback: "كلتا الجملتين صحيحتان: الأولى تنظر إلى السنوات العشر كفترة مكتملة بحلول العام القادم، والثانية تبرز امتداد النشاط.",
  },
];

export const TIME_CLAUSE_CONJUNCTIONS_40 = [
  "when",
  "before",
  "after",
  "as soon as",
  "until",
  "by the time",
] as const;

export const TIME_CLAUSE_EXPLORER_CASES_40 = [
  {
    id: "tc-call",
    clauseType: "جملة زمنية مستقبلية + Future Simple",
    english: "When you arrive, I'll call you.",
    arabic: "عندما تصل، سأتصل بك.",
    timeClauseVerb: "arrive (Present Simple)",
    mainClauseVerb: "I'll call (Future Simple)",
    explanation: "بدأنا الجملة الزمنية بـ When فاستخدمنا Present Simple (arrive)، ووضعنا will في الجملة الرئيسية فقط.",
  },
  {
    id: "tc-study",
    clauseType: "جملة زمنية مستقبلية + Future Continuous",
    english: "When you arrive, I'll be studying.",
    arabic: "عندما تصل، سأكون أدرس.",
    timeClauseVerb: "arrive (Present Simple)",
    mainClauseVerb: "I'll be studying (Future Continuous)",
    explanation: "وصولك هو اللحظة المرجعية (Present Simple)، والدراسة نشاط سيكون جاريًا عندها.",
  },
  {
    id: "tc-finish",
    clauseType: "جملة زمنية مستقبلية + Future Perfect",
    english: "By the time you arrive, I'll have finished.",
    arabic: "بحلول وصولك، سأكون قد انتهيت.",
    timeClauseVerb: "arrive (Present Simple)",
    mainClauseVerb: "I'll have finished (Future Perfect)",
    explanation: "بعد By the time نستخدم Present Simple (arrive)، وفي الجملة الرئيسية نبرز الاكتمال بـ Future Perfect.",
  },
  {
    id: "tc-wait",
    clauseType: "جملة زمنية مستقبلية + Future Perfect Continuous",
    english: "By the time you arrive, I'll have been waiting for an hour.",
    arabic: "بحلول وصولك، سأكون قد أمضيت ساعة في الانتظار.",
    timeClauseVerb: "arrive (Present Simple)",
    mainClauseVerb: "I'll have been waiting (Future Perfect Continuous)",
    explanation: "بعد By the time نستخدم Present Simple (arrive)، وفي الجملة الرئيسية نقيس مدة الانتظار.",
  },
  {
    id: "tc-question",
    clauseType: "سؤال مباشر بـ When (ليس جملة زمنية تابعة)",
    english: "When will you arrive? ✅",
    arabic: "متى ستصل؟",
    timeClauseVerb: "— (لا توجد جملة تابعة)",
    mainClauseVerb: "will you arrive (سؤال مباشر)",
    explanation: "هنا When أداة سؤال مباشر وليست بداية جملة زمنية تابعة، لذلك نستخدم will بصورة صحيحة.",
  },
] as const;

export const TIME_CLAUSE_QUIZ_40: readonly ChoiceItem40[] = [
  {
    id: "tcq-1",
    prompt: "أي الجملتين صحيحة للتعبير عن «عندما تصل، سأتصل بك»؟",
    choices: [
      { value: "right", label: "When you arrive, I'll call you. ✅" },
      { value: "wrong", label: "When you will arrive, I'll call you. ❌" },
    ],
    accepted: ["right"],
    feedback: "في الجملة الزمنية المستقبلية بعد when نستخدم Present Simple (arrive) ولا نستخدم will.",
  },
  {
    id: "tcq-2",
    prompt: "لماذا نقول When will you arrive? ✅ باستخدام will هنا؟",
    lines: ["When will you arrive? ✅"],
    choices: [
      { value: "direct-q", label: "لأن When هنا أداة سؤال مباشر، وليست بداية جملة زمنية تابعة" },
      { value: "past", label: "لأن الجملة تتحدث عن الماضي" },
    ],
    accepted: ["direct-q"],
    feedback: "هنا When أداة استفهام مباشر وليست أداة ربط لجملة زمنية تابعة.",
  },
  {
    id: "tcq-3",
    prompt: "أي تكملة صحيحة للجملة الزمنية: As soon as the teacher ______, we will begin the presentation.؟",
    choices: [
      { value: "arrives", label: "arrives (Present Simple)" },
      { value: "will-arrive", label: "will arrive" },
    ],
    accepted: ["arrives"],
    feedback: "بعد as soon as في الجملة الزمنية المستقبلية نستخدم المضارع البسيط arrives مع الفاعل المفرد.",
  },
];

export const WHEN_VS_BY_THE_TIME_PERSPECTIVES_40 = [
  {
    id: "wbt-1",
    connector: "When you arrive",
    channel: "fc" as TenseChannel40,
    tense: "Future Continuous",
    sentence: "When you arrive, I'll be cooking.",
    arabic: "عندما تصل، سأكون أطبخ.",
    focus: "التركيز على نشاط سيكون جاريًا وقت وصولك.",
  },
  {
    id: "wbt-2",
    connector: "By the time you arrive",
    channel: "fp" as TenseChannel40,
    tense: "Future Perfect",
    sentence: "By the time you arrive, I'll have cooked dinner.",
    arabic: "بحلول وصولك، سأكون قد أعددت العشاء.",
    focus: "التركيز على اكتمال إعداد العشاء.",
  },
  {
    id: "wbt-3",
    connector: "By the time you arrive + for two hours",
    channel: "fpc" as TenseChannel40,
    tense: "Future Perfect Continuous",
    sentence: "By the time you arrive, I'll have been cooking for two hours.",
    arabic: "بحلول وصولك، سأكون قد أمضيت ساعتين في الطبخ.",
    focus: "التركيز على المدة.",
  },
] as const;

export const WHEN_VS_BY_THE_TIME_QUIZ_40: readonly ChoiceItem40[] = [
  {
    id: "wbtq-1",
    prompt: "الحدث المرجعي هو وصولك (you arrive) — أي جملة تعني أن العشاء سيكون جاهزًا ومكتملًا بحلول وصولك؟",
    choices: [
      { value: "fp", label: "By the time you arrive, I'll have cooked dinner." },
      { value: "fc", label: "When you arrive, I'll be cooking." },
    ],
    accepted: ["fp"],
    feedback: "By the time you arrive, I'll have cooked dinner تركز على اكتمال إعداد العشاء بحلول الوصول.",
  },
  {
    id: "wbtq-2",
    prompt: "أي جملة تعني أنك ستدخل المطبخ وتجد الطبخ جاريًا في تلك اللحظة؟",
    choices: [
      { value: "fc", label: "When you arrive, I'll be cooking." },
      { value: "fpc", label: "By the time you arrive, I'll have been cooking for two hours." },
    ],
    accepted: ["fc"],
    feedback: "When you arrive, I'll be cooking تركز على نشاط سيكون جاريًا وقت وصولك.",
  },
];

export const FOR_SINCE_SORT_40 = [
  { id: "fs-1", phrase: "two hours", fullPhrase: "for two hours", kind: "for" as const, meaning: "مدة زمنية محسوبة (لمدة ساعتين)" },
  { id: "fs-2", phrase: "five years", fullPhrase: "for five years", kind: "for" as const, meaning: "مدة زمنية محسوبة (لمدة خمس سنوات)" },
  { id: "fs-3", phrase: "8:00", fullPhrase: "since 8:00", kind: "since" as const, meaning: "نقطة بداية زمنية (منذ الساعة الثامنة)" },
  { id: "fs-4", phrase: "2022", fullPhrase: "since 2022", kind: "since" as const, meaning: "نقطة بداية زمنية (منذ عام 2022)" },
  { id: "fs-5", phrase: "four hours", fullPhrase: "for four hours", kind: "for" as const, meaning: "مدة زمنية محسوبة (لمدة أربع ساعات)" },
  { id: "fs-6", phrase: "2023", fullPhrase: "since 2023", kind: "since" as const, meaning: "نقطة بداية زمنية (منذ عام 2023)" },
] as const;

export const FOR_SINCE_STATIVE_QUIZ_40: readonly ChoiceItem40[] = [
  {
    id: "fss-1",
    prompt: "نريد التعبير عن معرفة شخص لمدة عشر سنوات بحلول العام القادم — أي الجملتين صحيحة؟",
    choices: [
      { value: "fp", label: "By next year, I'll have known her for ten years. ✅" },
      { value: "fpc", label: "I'll have been knowing her for ten years. ❌" },
    ],
    accepted: ["fp"],
    feedback: "لأن know فعل حالة عندما يعني المعرفة، نستخدم معه Future Perfect (will have known) ولا نستخدم الصيغة المستمرة.",
  },
  {
    id: "fss-2",
    prompt: "هل يعني وجود for مع المدة أننا ممنوعون من استخدام Future Perfect؟",
    choices: [
      { value: "no", label: "لا — يمكن استخدام for مع Future Perfect أيضًا، خصوصًا مع أفعال مثل live وwork وknow" },
      { value: "yes", label: "نعم — for لا تأتي إلا مع Future Perfect Continuous" },
    ],
    accepted: ["no"],
    feedback: "يمكن استخدام for مع Future Perfect أيضًا، ولا سيما مع أفعال مثل live وwork وknow.",
  },
];

export const FORMULA_BUILDER_TARGETS_40 = [
  {
    id: "fb-will",
    tense: "Future Simple — WILL",
    formula: "will + V1",
    tokens: ["will", "write"] as const,
    distractors: ["writing", "wrote", "be"] as const,
    correctExample: "will write",
    wrongExample: "will writing ❌",
    reason: "بعد will في Future Simple يأتي الفعل في التصريف الأول المجرد (V1): will write.",
  },
  {
    id: "fb-going",
    tense: "BE GOING TO",
    formula: "am/is/are going to + V1",
    tokens: ["going to", "write"] as const,
    distractors: ["writing", "wrote", "been"] as const,
    correctExample: "going to write",
    wrongExample: "going to writing ❌",
    reason: "بعد going to يأتي الفعل الأساسي المجرد (V1): going to write لا going to writing.",
  },
  {
    id: "fb-fc",
    tense: "Future Continuous",
    formula: "will be + V-ing",
    tokens: ["will", "be", "writing"] as const,
    distractors: ["write", "written", "been"] as const,
    correctExample: "will be writing",
    wrongExample: "will be write ❌",
    reason: "بعد will be يأتي الفعل مضافًا إليه ing (V-ing): will be writing.",
  },
  {
    id: "fb-fp",
    tense: "Future Perfect",
    formula: "will have + V3",
    tokens: ["will", "have", "written"] as const,
    distractors: ["wrote", "writing", "has"] as const,
    correctExample: "will have written",
    wrongExample: "will have wrote ❌",
    reason: "بعد will have يأتي التصريف الثالث القياسي أو غير القياسي (V3: written)، وليس الماضي البسيط wrote.",
  },
  {
    id: "fb-fpc",
    tense: "Future Perfect Continuous",
    formula: "will have been + V-ing",
    tokens: ["will", "have", "been", "writing"] as const,
    distractors: ["wrote", "being", "has"] as const,
    correctExample: "will have been writing",
    wrongExample: "will have been wrote ❌",
    reason: "بعد will have been يأتي الفعل مع ing (V-ing): will have been writing.",
  },
] as const;

export const FORMULA_ERROR_PAIRS_40 = [
  { wrong: "will writing ❌", right: "will write ✅", rule: "Future Simple: will + V1" },
  { wrong: "will be write ❌", right: "will be writing ✅", rule: "Future Continuous: will be + V-ing" },
  { wrong: "will have wrote ❌", right: "will have written ✅", rule: "Future Perfect: will have + V3" },
  { wrong: "will have been wrote ❌", right: "will have been writing ✅", rule: "Future Perfect Continuous: will have been + V-ing" },
  { wrong: "going to writing ❌", right: "going to write ✅", rule: "BE GOING TO: am/is/are going to + V1" },
] as const;

export const DIALOGUE1_LINES_40 = [
  {
    id: "d1-1",
    speaker: "Maya",
    en: "Our science competition is next Saturday. Are we ready?",
    ar: "مسابقتنا العلمية يوم السبت القادم. هل نحن مستعدون؟",
    tense: "Present Simple (موعد المسابقة)",
    analysis: "تمهيد للموقف وتحديد موعد المسابقة.",
  },
  {
    id: "d1-2",
    speaker: "Daniel",
    en: "Almost. We're going to finish the main structure tomorrow.",
    ar: "تقريبًا. ننوي إنهاء الهيكل الرئيسي غدًا.",
    tense: "BE GOING TO — We're going to finish...",
    analysis: "خطة موجودة مسبقًا.",
  },
  {
    id: "d1-3",
    speaker: "Maya",
    en: "Oh no! One of the sensors isn't working.",
    ar: "أوه لا! أحد الحساسات لا يعمل.",
    tense: "Present Continuous (مشكلة حاضرة)",
    analysis: "ظهور مشكلة مفاجئة الآن تستدعي قرارًا لحظيًا.",
  },
  {
    id: "d1-4",
    speaker: "Daniel",
    en: "Don't worry. I'll check it.",
    ar: "لا تقلقي. سأفحصه.",
    tense: "Future Simple (WILL) — I'll check it.",
    analysis: "قرار لحظي أو عرض مساعدة.",
  },
  {
    id: "d1-5",
    speaker: "Maya",
    en: "Do you think our robot will impress the judges?",
    ar: "هل تعتقد أن روبوتنا سيبهر لجنة التحكيم؟",
    tense: "Future Simple (WILL) — Will impress...",
    analysis: "توقع بشأن المستقبل.",
  },
  {
    id: "d1-6",
    speaker: "Daniel",
    en: "I think it will.",
    ar: "أعتقد أنه سيفعل ذلك.",
    tense: "Future Simple (تأكيد التوقع)",
    analysis: "تأكيد التوقع باستخدام will.",
  },
  {
    id: "d1-7",
    speaker: "Maya",
    en: "What will you be doing at 4:00 tomorrow?",
    ar: "ماذا ستكون تفعل عند الرابعة غدًا؟",
    tense: "Future Continuous (سؤال)",
    analysis: "سؤال عن نشاط سيكون جاريًا عند لحظة محددة (4:00 tomorrow).",
  },
  {
    id: "d1-8",
    speaker: "Daniel",
    en: "I'll be testing the navigation system.",
    ar: "سأكون أختبر نظام الملاحة.",
    tense: "Future Continuous — I'll be testing...",
    analysis: "نشاط سيكون جاريًا عند الرابعة.",
  },
  {
    id: "d1-9",
    speaker: "Maya",
    en: "Will we have completed everything by Friday?",
    ar: "هل سنكون قد أكملنا كل شيء بحلول الجمعة؟",
    tense: "Future Perfect (سؤال)",
    analysis: "سؤال عن اكتمال العمل بحلول نقطة مستقبلية (by Friday).",
  },
  {
    id: "d1-10",
    speaker: "Daniel",
    en: "Yes. By Friday evening, we'll have finished all the tests.",
    ar: "نعم. بحلول مساء الجمعة، سنكون قد أنهينا جميع الاختبارات.",
    tense: "Future Perfect — We'll have finished...",
    analysis: "إنجاز مكتمل بحلول مساء الجمعة.",
  },
  {
    id: "d1-11",
    speaker: "Maya",
    en: "Excellent! By then, we'll have been working on this project for three months.",
    ar: "ممتاز! بحلول ذلك الوقت، سنكون قد أمضينا ثلاثة أشهر في العمل على هذا المشروع.",
    tense: "Future Perfect Continuous — We'll have been working...",
    analysis: "مدة نشاط ممتدة حتى نقطة مستقبلية.",
  },
] as const;

export const DIALOGUE1_CHECK_40: readonly ChoiceItem40[] = [
  {
    id: "d1c-1",
    prompt: "لماذا قال دانيال I'll check it بدل I'm going to check it عندما تعطّل الحساس؟",
    choices: [
      { value: "spontaneous", label: "لأنه قرار لحظي أو عرض مساعدة فور اكتشاف المشكلة" },
      { value: "three-months", label: "لأنه يقيس مدة ثلاثة أشهر" },
    ],
    accepted: ["spontaneous"],
    feedback: "I'll check it تعبّر عن قرار لحظي أو عرض مساعدة استجابةً للعطل المفاجئ.",
  },
  {
    id: "d1c-2",
    prompt: "كم صيغة مستقبلية رئيسية اجتمعت في حوار مسابقة العلوم؟",
    choices: [
      { value: "five", label: "خمس صيغ مستقبلية، وكل صيغة أضافت معلومة مختلفة" },
      { value: "two", label: "صيغتان فقط" },
    ],
    accepted: ["five"],
    feedback: "اجتمعت الصيغ المستقبلية الخمس داخل حوار واحد، وكل صيغة أضافت معلومة مختلفة دون زخرفة.",
  },
];

export const DIALOGUE2_LINES_40 = [
  {
    id: "d2-1",
    speaker: "Father",
    en: "We're going to leave early tomorrow. I've already prepared the route.",
    ar: "سنغادر مبكرًا غدًا. لقد جهزت المسار بالفعل.",
    tense: "BE GOING TO (خطة مسبقة)",
  },
  {
    id: "d2-2",
    speaker: "Mother",
    en: "Look at those dark clouds! It's going to rain.",
    ar: "انظر إلى تلك الغيوم الداكنة! إنها ستمطر.",
    tense: "BE GOING TO (دليل حاضر)",
  },
  {
    id: "d2-3",
    speaker: "Father",
    en: "Then I'll put the raincoats in the car.",
    ar: "إذن سأضع معاطف المطر في السيارة.",
    tense: "Future Simple — WILL",
  },
  {
    id: "d2-4",
    speaker: "Daughter",
    en: "What will we be doing at noon?",
    ar: "ماذا سنكون نفعل عند الظهر؟",
    tense: "Future Continuous (سؤال)",
  },
  {
    id: "d2-5",
    speaker: "Father",
    en: "We'll be driving through the mountains.",
    ar: "سنكون نقود عبر الجبال.",
    tense: "Future Continuous",
  },
  {
    id: "d2-6",
    speaker: "Son",
    en: "Will we have reached the hotel by 6:00?",
    ar: "هل سنكون قد وصلنا إلى الفندق بحلول السادسة؟",
    tense: "Future Perfect (سؤال)",
  },
  {
    id: "d2-7",
    speaker: "Father",
    en: "Yes, we will.",
    ar: "نعم، سنفعل.",
    tense: "إجابة قصيرة بـ will",
  },
  {
    id: "d2-8",
    speaker: "Mother",
    en: "And by the time we arrive, we'll have been travelling for eight hours.",
    ar: "وبحلول وقت وصولنا، سنكون قد أمضينا ثماني ساعات في السفر.",
    tense: "Future Perfect Continuous",
  },
] as const;

export const DIALOGUE2_CHALLENGE_40: readonly ChoiceItem40[] = [
  {
    id: "d2-q1",
    prompt: "① صنّف الاستخدام في: We're going to leave.",
    choices: [
      { value: "plan", label: "خطة مسبقة." },
      { value: "instant", label: "قرار لحظي." },
    ],
    accepted: ["plan"],
    feedback: "① خطة مسبقة بدليل تجهيز المسار سلفًا (I've already prepared the route).",
  },
  {
    id: "d2-q2",
    prompt: "② صنّف الاستخدام في: It's going to rain.",
    choices: [
      { value: "evidence", label: "توقع مبني على دليل حاضر." },
      { value: "duration", label: "مدة نشاط ممتدة حتى نقطة مستقبلية." },
    ],
    accepted: ["evidence"],
    feedback: "② توقع مبني على دليل حاضر مرئي الآن (Look at those dark clouds!).",
  },
  {
    id: "d2-q3",
    prompt: "③ صنّف الاستخدام في: I'll put the raincoats in the car.",
    choices: [
      { value: "instant", label: "قرار لحظي." },
      { value: "plan", label: "خطة مسبقة." },
    ],
    accepted: ["instant"],
    feedback: "③ قرار لحظي اتُّخذ فور سماع ملاحظة الغيوم الداكنة.",
  },
  {
    id: "d2-q4",
    prompt: "④ صنّف الاستخدام في: We'll be driving.",
    choices: [
      { value: "in-progress", label: "نشاط جارٍ في لحظة مستقبلية." },
      { value: "completed-q", label: "سؤال عن إنجاز مكتمل بحلول وقت مستقبلي." },
    ],
    accepted: ["in-progress"],
    feedback: "④ نشاط جارٍ في لحظة مستقبلية (عند الظهر).",
  },
  {
    id: "d2-q5",
    prompt: "⑤ صنّف الاستخدام في: Will we have reached?",
    choices: [
      { value: "completed-q", label: "سؤال عن إنجاز مكتمل بحلول وقت مستقبلي." },
      { value: "instant", label: "قرار لحظي." },
    ],
    accepted: ["completed-q"],
    feedback: "⑤ سؤال عن إنجاز مكتمل بحلول وقت مستقبلي (by 6:00).",
  },
  {
    id: "d2-q6",
    prompt: "⑥ صنّف الاستخدام في: We'll have been travelling.",
    choices: [
      { value: "duration", label: "مدة نشاط ممتدة حتى نقطة مستقبلية." },
      { value: "evidence", label: "توقع مبني على دليل حاضر." },
    ],
    accepted: ["duration"],
    feedback: "⑥ مدة نشاط ممتدة حتى نقطة مستقبلية (for eight hours).",
  },
];

export const SITUATION_LAB_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "sit-1",
    prompt: "الموقف الأول: تجلس مع صديقك، ويخبرك فجأة أنه لا يفهم مسألة رياضية — ماذا تقول؟",
    choices: [
      { value: "will", label: "I'll explain it to you." },
      { value: "fpc", label: "I'll have been explaining it to you." },
    ],
    accepted: ["will"],
    feedback: "لأنك تعرض المساعدة الآن في اللحظة نفسها.",
  },
  {
    id: "sit-2",
    prompt: "الموقف الثاني: اشتريت أدوات الرسم، وسجلت في دورة تبدأ قريبًا — ماذا تقول؟",
    choices: [
      { value: "going", label: "I'm going to learn digital drawing." },
      { value: "fc", label: "I'll be learning digital drawing yesterday." },
    ],
    accepted: ["going"],
    feedback: "لأن لديك نية مسبقة وخطة اتخذت خطواتها الفعلية.",
  },
  {
    id: "sit-3",
    prompt: "الموقف الثالث: صديقك يريد الاتصال بك أثناء موعد امتحانك — ماذا تقول؟",
    choices: [
      { value: "fc", label: "I'll be taking an exam then." },
      { value: "will", label: "I'll have been taking an exam now." },
    ],
    accepted: ["fc"],
    feedback: "لأنك تصف نشاطًا سيكون جاريًا في ذلك الوقت.",
  },
  {
    id: "sit-4",
    prompt: "الموقف الرابع: تريد إخبار معلمك أن المشروع سيكون جاهزًا قبل موعد التسليم — ماذا تقول؟",
    choices: [
      { value: "fp", label: "I'll have completed it by the deadline." },
      { value: "fc", label: "I'll be completing it after the deadline." },
    ],
    accepted: ["fp"],
    feedback: "لأنك تبرز الإنجاز المكتمل بحلول الموعد النهائي.",
  },
  {
    id: "sit-5",
    prompt: "الموقف الخامس: بدأت العمل على مشروع طويل، وتريد وصف المدة التي ستكون قد أمضيتها فيه عند نهاية الشهر — ماذا تقول؟",
    choices: [
      { value: "fpc", label: "By the end of the month, I'll have been working on it for six months." },
      { value: "going", label: "I'm going to work on it yesterday." },
    ],
    accepted: ["fpc"],
    feedback: "لأنك تبرز مدة النشاط الممتدة حتى نهاية الشهر.",
  },
];

export const EXERCISE19_ITEMS_40 = [
  {
    n: 1,
    prompt: "① A: The doorbell is ringing! · B: I ______ open the door.",
    options: [
      { label: "A", text: "A. will" },
      { label: "B", text: "B. am going to" },
      { label: "C", text: "C. will have been" },
    ],
    answer: "A",
    answerText: "will",
    why: "قرار لحظي عند سماع الجرس.",
  },
  {
    n: 2,
    prompt: "② We decided yesterday. We ______ organize a school event.",
    options: [
      { label: "A", text: "A. will" },
      { label: "B", text: "B. are going to" },
      { label: "C", text: "C. will have" },
    ],
    answer: "B",
    answerText: "are going to",
    why: "خطة مسبقة اتُّخذ قرارها أمس (We decided yesterday).",
  },
  {
    n: 3,
    prompt: "③ At 9:00 tomorrow, I ______ my English lesson.",
    options: [
      { label: "A", text: "A. will be attending" },
      { label: "B", text: "B. will have attended" },
      { label: "C", text: "C. will have been attending for" },
    ],
    answer: "A",
    answerText: "will be attending",
    why: "نشاط جارٍ عند التاسعة غدًا (At 9:00 tomorrow).",
  },
  {
    n: 4,
    prompt: "④ By Friday, she ______ the report.",
    options: [
      { label: "A", text: "A. will be writing" },
      { label: "B", text: "B. will have completed" },
      { label: "C", text: "C. will have been completing for" },
    ],
    answer: "B",
    answerText: "will have completed",
    why: "إنجاز مكتمل بحلول الجمعة (By Friday).",
  },
  {
    n: 5,
    prompt: "⑤ By next June, they ______ here for five years.",
    options: [
      { label: "A", text: "A. will have been working" },
      { label: "B", text: "B. will work yesterday" },
      { label: "C", text: "C. will be worked" },
    ],
    answer: "A",
    answerText: "will have been working",
    why: "مدة عمل ممتدة حتى نقطة مستقبلية (By next June + for five years).",
  },
  {
    n: 6,
    prompt: "⑥ Look at that cyclist! He ______ fall!",
    options: [
      { label: "A", text: "A. will have" },
      { label: "B", text: "B. is going to" },
      { label: "C", text: "C. will have been" },
    ],
    answer: "B",
    answerText: "is going to",
    why: "توقع نبرز فيه دليلًا حاضرًا مرئيًا الآن (Look at that cyclist!).",
  },
] as const;

export const FILL20_ITEMS_40 = [
  {
    n: 1,
    prompt: "① I promise I ______ (help) you.",
    answer: "will help",
    accepted: ["will help", "i will help", "i promise i will help you"],
    why: "وعد صريح مع I promise ← Future Simple: will help.",
  },
  {
    n: 2,
    prompt: "② We bought the tickets yesterday. We ______ (visit) the museum next week.",
    answer: "are going to visit",
    accepted: [
      "are going to visit",
      "we are going to visit",
      "are visiting",
      "will visit",
      "we are going to visit the museum next week",
    ],
    why: "خطة مسبقة يدعمها شراء التذاكر أمس ← الصيغة النموذجية هنا are going to visit.",
  },
  {
    n: 3,
    prompt: "③ This time tomorrow, she ______ (travel) to another city.",
    answer: "will be travelling",
    accepted: [
      "will be travelling",
      "she will be travelling",
      "this time tomorrow, she will be travelling to another city",
    ],
    why: "نشاط جارٍ في لحظة مستقبلية (This time tomorrow) ← Future Continuous: will be travelling.",
  },
  {
    n: 4,
    prompt: "④ By noon, I ______ (finish) all my exercises.",
    answer: "will have finished",
    accepted: [
      "will have finished",
      "i will have finished",
      "by noon, i will have finished all my exercises",
    ],
    why: "إنجاز مكتمل بحلول الظهر ← Future Perfect: will have finished.",
  },
  {
    n: 5,
    prompt: "⑤ By noon, I ______ (study) for four hours.",
    answer: "will have been studying",
    accepted: [
      "will have been studying",
      "i will have been studying",
      "will have studied",
      "by noon, i will have been studying for four hours",
    ],
    why: "مدة نشاط ممتدة حتى الظهر (for four hours) ← Future Perfect Continuous: will have been studying.",
  },
  {
    n: 6,
    prompt: "⑥ When you arrive, we ______ (prepare) dinner.",
    answer: "will be preparing",
    accepted: [
      "will be preparing",
      "we will be preparing",
      "will prepare",
      "when you arrive, we will be preparing dinner",
    ],
    why: "تحضير جارٍ وقت الوصول (When you arrive) ← Future Continuous: will be preparing.",
  },
  {
    n: 7,
    prompt: "⑦ By the time you arrive, we ______ (prepare) dinner.",
    answer: "will have prepared",
    accepted: [
      "will have prepared",
      "we will have prepared",
      "by the time you arrive, we will have prepared dinner",
    ],
    why: "تحضير مكتمل بحلول الوصول (By the time you arrive) ← Future Perfect: will have prepared.",
  },
  {
    n: 8,
    prompt: "⑧ By the time you arrive, we ______ (work) for three hours.",
    answer: "will have been working",
    accepted: [
      "will have been working",
      "we will have been working",
      "will have worked",
      "by the time you arrive, we will have been working for three hours",
    ],
    why: "مدة العمل الممتدة حتى الوصول (for three hours) ← Future Perfect Continuous: will have been working.",
  },
] as const;

export const DETECTIVE21_ITEMS_40 = [
  {
    n: 1,
    prompt: "① She will going to study tonight.",
    answer: "She is going to study tonight. / She will study tonight.",
    accepted: [
      "she is going to study tonight",
      "she will study tonight",
      "is going to study",
      "will study",
    ],
    why: "لا نخلط بين will وgoing to في جملة واحدة؛ إما She is going to study tonight أو She will study tonight.",
  },
  {
    n: 2,
    prompt: "② I will be write the report at 8:00.",
    answer: "I will be writing the report at 8:00.",
    accepted: [
      "i will be writing the report at 8:00",
      "will be writing",
    ],
    why: "في Future Continuous يأتي بعد will be الفعل مضافًا إليه ing: writing لا write.",
  },
  {
    n: 3,
    prompt: "③ He will have wrote the letter by Friday.",
    answer: "He will have written the letter by Friday.",
    accepted: [
      "he will have written the letter by Friday",
      "will have written",
    ],
    why: "في Future Perfect نستخدم التصريف الثالث (written) بعد will have، وليس الماضي البسيط wrote.",
  },
  {
    n: 4,
    prompt: "④ They will have being working for three hours.",
    answer: "They will have been working for three hours.",
    accepted: [
      "they will have been working for three hours",
      "will have been working",
    ],
    why: "الركن الثابت بعد will have في Future Perfect Continuous هو been وليس being.",
  },
  {
    n: 5,
    prompt: "⑤ Does she going to travel tomorrow?",
    answer: "Is she going to travel tomorrow?",
    accepted: [
      "is she going to travel tomorrow",
      "is she going to travel",
    ],
    why: "صيغة BE GOING TO تُبنى مع فعل الكينونة (am/is/are)، لذا نسأل بـ Is she going to...?",
  },
  {
    n: 6,
    prompt: "⑥ Will you be studying at 9:00? Yes, I am.",
    answer: "Will you be studying at 9:00? Yes, I will.",
    accepted: [
      "will you be studying at 9:00? yes, i will",
      "yes, i will",
      "yes i will",
    ],
    why: "السؤال يبدأ بالفعل المساعد Will، فتكون الإجابة القصيرة الصحيحة Yes, I will.",
  },
  {
    n: 7,
    prompt: "⑦ By the time he will arrive, we will have finished.",
    answer: "By the time he arrives, we will have finished.",
    accepted: [
      "by the time he arrives, we will have finished",
      "by the time he arrives we will have finished",
      "he arrives",
    ],
    why: "في الجملة الزمنية المستقبلية بعد by the time نستخدم Present Simple (he arrives) ولا نستخدم will.",
  },
  {
    n: 8,
    prompt: "⑧ She will has completed the project.",
    answer: "She will have completed the project.",
    accepted: [
      "she will have completed the project",
      "will have completed",
    ],
    why: "بعد will يأتي الفعل المجرد have مع جميع الضمائر بما فيها She.",
  },
  {
    n: 9,
    prompt: "⑨ How long will they have be travelling by midnight?",
    answer: "How long will they have been travelling by midnight?",
    accepted: [
      "how long will they have been travelling by midnight",
      "will they have been travelling",
    ],
    why: "في سؤال المدة مع Future Perfect Continuous نحتاج إلى been بعد have.",
  },
  {
    n: 10,
    prompt: "⑩ I will have been knowing him for ten years by next June.",
    answer: "I will have known him for ten years by next June.",
    accepted: [
      "i will have known him for ten years by next june",
      "will have known",
    ],
    why: "الفعل know بمعنى المعرفة فعل حالة لا يُستخدم عادةً في الصيغة المستمرة، فنستخدم will have known.",
  },
] as const;

export const IQ22_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "iq22-1",
    prompt: "في الجملة المفتوحة: I ______ finish the report by Friday. — أي اختيار يمثّل الحكم النحوي الدقيق؟",
    lines: ["I will finish the report by Friday.", "I will have finished the report by Friday."],
    choices: [
      { value: "both", label: "الجملتان صحيحتان: الأولى تقدم حدث الإنهاء مع موعد نهائي، والثانية تبرز اكتمال التقرير من منظور الجمعة" },
      { value: "one", label: "إجابة واحدة فقط صحيحة والأخرى خطأ نحوي" },
    ],
    accepted: ["both"],
    feedback: "الجملتان صحيحتان؛ الاختيار بينهما مسألة تركيز بين وقوع الإنهاء قبل الموعد وإبراز الاكتمال عند النقطة المستقبلية.",
  },
  {
    id: "iq22-2",
    prompt: "قارن بين: I think she will enjoy the trip. و I think she's going to enjoy the trip. — ما القاعدة المتقدمة هنا؟",
    lines: ["I think she will enjoy the trip.", "I think she's going to enjoy the trip."],
    choices: [
      { value: "both", label: "كلتاهما صحيحتان في سياقات مناسبة؛ في اللغة الحقيقية قد يكون الاختيار مسألة تركيز أو أسلوب" },
      { value: "ban", label: "I think تمنع استخدام going to منعًا مطلقًا" },
    ],
    accepted: ["both"],
    feedback: "عندما لا يقيّد السياق الاختيار، قد تكون أكثر من صيغة صحيحة بحسب الأسلوب وزاوية الإبراز.",
  },
];

export const READING23_STATIONS_40 = [
  {
    id: "st-plan",
    channel: "going" as TenseChannel40,
    label: "الخطة المعتمدة (Next Month)",
    quote: "The school has already approved the plan, and construction is going to begin next month.",
    tense: "BE GOING TO",
    meaning: "خطة معتمدة مسبقًا لبدء البناء الشهر القادم، وإنشاء ركن قراءة ومختبر علوم ومنطقة تعلم رقمي.",
  },
  {
    id: "st-backup",
    channel: "will" as TenseChannel40,
    label: "المشكلة العاجلة (Right Now)",
    quote: "Don't worry. I'll check the backup copy.",
    tense: "Future Simple — WILL",
    meaning: "قرار لحظي وعرض مساعدة من آدم فور ملاحظة دانيال أن الملف الرئيسي لا يفتح.",
  },
  {
    id: "st-next-month",
    channel: "fc" as TenseChannel40,
    label: "في مثل هذا الوقت الشهر القادم",
    quote: "We'll be organizing the books and preparing the computers.",
    tense: "Future Continuous",
    meaning: "نشاط سيكون جاريًا في تلك الفترة المستقبلية (تنظيم الكتب وتجهيز الحواسيب).",
  },
  {
    id: "st-end-month",
    channel: "fp" as TenseChannel40,
    label: "بحلول نهاية الشهر القادم",
    quote: "By the end of next month, we'll have installed all the equipment.",
    tense: "Future Perfect",
    meaning: "إنجاز سيكون مكتملًا بحلول نهاية الشهر القادم (تركيب جميع المعدات).",
  },
  {
    id: "st-opening",
    channel: "fpc" as TenseChannel40,
    label: "بحلول افتتاح المركز (6 أشهر)",
    quote: "And by the time the centre opens, we'll have been working on this project for six months!",
    tense: "Future Perfect Continuous",
    meaning: "مدة العمل الممتدة (ستة أشهر) حتى لحظة افتتاح المركز (opens بـ Present Simple بعد by the time).",
  },
  {
    id: "st-inspire",
    channel: "will" as TenseChannel40,
    label: "توقع المعلم للمستقبل",
    quote: "I'm sure the new centre will inspire many students.",
    tense: "Future Simple — WILL",
    meaning: "توقع أو اعتقاد عام بشأن أثر المركز الجديد في الطلاب.",
  },
] as const;

export const READING23_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "r23-1",
    prompt: "① What is the school preparing?",
    choices: [
      { value: "centre", label: "A new learning centre." },
      { value: "stadium", label: "A sports stadium outside the city." },
    ],
    accepted: ["centre"],
    feedback: "تجهز المدرسة مركز تعلم جديدًا: A new learning centre.",
  },
  {
    id: "r23-2",
    prompt: "② When is construction going to begin?",
    choices: [
      { value: "next-month", label: "Next month." },
      { value: "last-week", label: "Last week." },
    ],
    accepted: ["next-month"],
    feedback: "يبدأ البناء الشهر القادم وفق الخطة المعتمدة: Next month.",
  },
  {
    id: "r23-3",
    prompt: "③ What are the students going to create?",
    choices: [
      { value: "three-areas", label: "A reading corner, a science laboratory, and a digital learning area." },
      { value: "cafeteria", label: "Only a school cafeteria." },
    ],
    accepted: ["three-areas"],
    feedback: "سينشئ الطلاب ركن قراءة ومختبر علوم صغيرًا ومنطقة تعلم رقمي.",
  },
  {
    id: "r23-4",
    prompt: "④ Why does Adam say, \"I'll check the backup copy\"?",
    choices: [
      { value: "offer", label: "Because he notices a problem and offers to check the backup copy." },
      { value: "six-months", label: "Because six months have already passed." },
    ],
    accepted: ["offer"],
    feedback: "لأنه لاحظ مشكلة عدم فتح الملف الرئيسي فعرض فحص النسخة الاحتياطية فورًا.",
  },
  {
    id: "r23-5",
    prompt: "⑤ What will they be doing at this time next month?",
    choices: [
      { value: "organizing", label: "They will be organizing books and preparing computers." },
      { value: "closing", label: "They will be closing the school." },
    ],
    accepted: ["organizing"],
    feedback: "في مثل هذا الوقت الشهر القادم سيكونون ينظمون الكتب ويجهزون الحواسيب.",
  },
  {
    id: "r23-6",
    prompt: "⑥ What will they have installed by the end of next month?",
    choices: [
      { value: "equipment", label: "All the equipment." },
      { value: "nothing", label: "Nothing at all." },
    ],
    accepted: ["equipment"],
    feedback: "بحلول نهاية الشهر القادم سيكونون قد ركبوا جميع المعدات: All the equipment.",
  },
  {
    id: "r23-7",
    prompt: "⑦ How long will they have been working on the project by the time the centre opens?",
    choices: [
      { value: "six-months", label: "For six months." },
      { value: "two-days", label: "For two days." },
    ],
    accepted: ["six-months"],
    feedback: "بحلول افتتاح المركز سيكونون قد عملوا على المشروع لمدة ستة أشهر: For six months.",
  },
  {
    id: "r23-8",
    prompt: "⑧ Which sentence expresses a prediction?",
    choices: [
      { value: "inspire", label: "I'm sure the new centre will inspire many students." },
      { value: "wont-open", label: "Oh no! The main file won't open." },
    ],
    accepted: ["inspire"],
    feedback: "جملة المعلم I'm sure the new centre will inspire many students تعبّر عن توقع للمستقبل.",
  },
];

export const STORY_ANALYSIS24_ITEMS_40 = [
  {
    id: "sa-1",
    channel: "going" as TenseChannel40,
    sentence: "Construction is going to begin next month.",
    tense: "BE GOING TO",
    reason: "خطة موجودة مسبقًا.",
    detail: "المدرسة اعتمدت الخطة بالفعل، فالبدء الشهر القادم خطة مقررة سلفًا.",
  },
  {
    id: "sa-2",
    channel: "will" as TenseChannel40,
    sentence: "I'll check the backup copy.",
    tense: "Future Simple — WILL",
    reason: "قرار لحظي أو عرض مساعدة.",
    detail: "ردّ فعل فوري من آدم بعد أن لاحظ دانيال أن الملف الرئيسي لا يفتح.",
  },
  {
    id: "sa-3",
    channel: "fc" as TenseChannel40,
    sentence: "We'll be organizing the books.",
    tense: "Future Continuous",
    reason: "نشاط سيكون جاريًا خلال فترة مستقبلية.",
    detail: "إجابة عن سؤال المعلم: What will you be doing at this time next month?",
  },
  {
    id: "sa-4",
    channel: "fp" as TenseChannel40,
    sentence: "We'll have installed all the equipment.",
    tense: "Future Perfect",
    reason: "إنجاز سيكون مكتملًا بحلول نهاية الشهر.",
    detail: "تبرز اكتمال تركيب المعدات بحلول نهاية الشهر القادم.",
  },
  {
    id: "sa-5",
    channel: "fpc" as TenseChannel40,
    sentence: "We'll have been working on this project for six months.",
    tense: "Future Perfect Continuous",
    reason: "مدة نشاط ممتدة حتى افتتاح المركز.",
    detail: "تقيس مدة الأشهر الستة الممتدة حتى لحظة الافتتاح (by the time the centre opens).",
  },
  {
    id: "sa-6",
    channel: "will" as TenseChannel40,
    sentence: "The new centre will inspire many students.",
    tense: "Future Simple — WILL",
    reason: "توقع أو اعتقاد بشأن المستقبل.",
    detail: "جاءت بعد عبارة اليقين I'm sure للتعبير عن توقع مستقبلي.",
  },
] as const;

export const STORY_ANALYSIS24_QUIZ_40: readonly ChoiceItem40[] = [
  {
    id: "saq-1",
    prompt: "لماذا اختار الكاتب We'll have installed all the equipment بدل We'll be installing عند الحديث عن نهاية الشهر القادم؟",
    choices: [
      { value: "completed", label: "لأنه يريد إبراز أن تركيب المعدات سيكون إنجازًا مكتملًا بحلول نهاية الشهر" },
      { value: "instant", label: "لأنه قرار لحظي اتُّخذ في اللحظة نفسها" },
    ],
    accepted: ["completed"],
    feedback: "We'll have installed all the equipment تبرز إنجازًا سيكون مكتملًا بحلول نهاية الشهر.",
  },
  {
    id: "saq-2",
    prompt: "ما السؤال التحليلي الذي يوصي به الدرس المستفاد عند قراءة أي نص إنجليزي؟",
    choices: [
      { value: "why", label: "لماذا اختار الكاتب هذا الزمن تحديدًا؟ (وليس الاكتفاء بتحديد اسم الزمن)" },
      { value: "name-only", label: "الاكتفاء بحفظ اسم الزمن دون النظر إلى المعنى" },
    ],
    accepted: ["why"],
    feedback: "السؤال عن سبب اختيار الكاتب للزمن يرفع مستوى الفهم التحليلي للنصوص بصورة كبيرة.",
  },
];

export const WRITING27_CRITERIA_40 = [
  "① جملتين باستخدام WILL للتعبير عن قرار أو وعد أو توقع.",
  "② جملتين باستخدام BE GOING TO للتعبير عن خطط مسبقة.",
  "③ ثلاث جمل باستخدام Future Continuous.",
  "④ ثلاث جمل باستخدام Future Perfect.",
  "⑤ ثلاث جمل باستخدام Future Perfect Continuous.",
  "⑥ جملة منفية واحدة على الأقل.",
  "⑦ سؤال يبدأ بـ Will you be...?",
  "⑧ سؤال يبدأ بـ How long will you have been...?",
  "⑨ جملة تحتوي على by the time.",
  "⑩ أربعة تعبيرات زمنية مختلفة على الأقل.",
] as const;

export const WRITING27_MODEL_40 = [
  "Next year, I'm going to improve my English and learn several new skills.",
  "I've already prepared a study plan, and I'm going to follow it carefully.",
  "At this time next month, I'll be working on a new project.",
  "By the end of the year, I'll have completed several important courses.",
  "By next October, I'll have been learning English regularly for a long time.",
  "I think these experiences will help me become more confident.",
] as const;

export const WRITING27_MODEL_FORMS_40 = [
  "BE GOING TO — خطة مسبقة للعام القادم (I'm going to improve...)",
  "BE GOING TO — نية مبنية على خطة معدة مسبقًا (I'm going to follow it...)",
  "Future Continuous — نشاط جارٍ في مثل هذا الوقت الشهر القادم (I'll be working...)",
  "Future Perfect — إنجاز مكتمل بحلول نهاية العام (I'll have completed...)",
  "Future Perfect Continuous — مدة تعلم ممتدة بحلول تشرين الأول القادم (I'll have been learning...)",
  "Future Simple (WILL) — توقع عام مع I think (will help me...)",
] as const;

export const GOLDEN_SUMMARY28_CARDS_40 = [
  {
    id: "sum-1",
    order: "①",
    channel: "will" as TenseChannel40,
    title: "Future Simple — WILL",
    formula: "Subject + will + V1",
    uses: "قرار لحظي، وعد، عرض مساعدة، توقع أو اعتقاد.",
    example: "I'll help you.",
  },
  {
    id: "sum-2",
    order: "②",
    channel: "going" as TenseChannel40,
    title: "BE GOING TO",
    formula: "Subject + am/is/are + going to + V1",
    uses: "خطة أو نية مسبقة، وتوقع نبرز فيه دليلًا حاضرًا.",
    example: "I'm going to start a new course next month.",
  },
  {
    id: "sum-3",
    order: "③",
    channel: "fc" as TenseChannel40,
    title: "Future Continuous",
    formula: "Subject + will + be + V-ing",
    uses: "نشاط سيكون جاريًا في لحظة أو فترة مستقبلية.",
    example: "At 8:00 tomorrow, I'll be studying.",
  },
  {
    id: "sum-4",
    order: "④",
    channel: "fp" as TenseChannel40,
    title: "Future Perfect",
    formula: "Subject + will + have + V3",
    uses: "إنجاز سيكون مكتملًا بحلول نقطة مستقبلية.",
    example: "By 9:00, I'll have finished my homework.",
  },
  {
    id: "sum-5",
    order: "⑤",
    channel: "fpc" as TenseChannel40,
    title: "Future Perfect Continuous",
    formula: "Subject + will + have + been + V-ing",
    uses: "مدة نشاط ممتدة حتى نقطة مستقبلية.",
    example: "By 9:00, I'll have been studying for three hours.",
  },
] as const;

export const GOLDEN_SUMMARY28_QUIZ_40: readonly ChoiceItem40[] = [
  {
    id: "gs-1",
    prompt: "ما القاعدة الذهبية الكبرى عند اختيار زمن المستقبل؟",
    choices: [
      { value: "meaning", label: "لا تختَر الزمن اعتمادًا على tomorrow أو next week أو by فقط؛ اسأل نفسك عن المعنى الذي تريد التعبير عنه" },
      { value: "keywords", label: "اختر الزمن فور رؤية أول كلمة زمنية في الجملة دون قراءة بقية السياق" },
    ],
    accepted: ["meaning"],
    feedback: "القاعدة الذهبية الكبرى: اسأل نفسك هل تريد التعبير عن قرار، أم خطة، أم توقع، أم نشاط جارٍ، أم إنجاز مكتمل، أم مدة نشاط ممتدة.",
  },
  {
    id: "gs-2",
    prompt: "صِل المثال بصيغته في الملخص الذهبي: By 9:00, I'll have finished my homework.",
    choices: [
      { value: "fp", label: "④ Future Perfect — Subject + will + have + V3" },
      { value: "fpc", label: "⑤ Future Perfect Continuous — Subject + will + have + been + V-ing" },
    ],
    accepted: ["fp"],
    feedback: "I'll have finished my homework يبرز الإنجاز المكتمل بحلول التاسعة بصيغة Future Perfect.",
  },
];

export const CURRICULUM_SYSTEMS_40 = [
  {
    id: "present",
    title: "منظومة الحاضر",
    en: "Present System (①–④)",
    stations: [
      { num: "①", name: "Present Simple", pattern: "Subject + V1 / V1+s", note: "العادات والحقائق والجداول الثابتة والجمل الزمنية المستقبلية" },
      { num: "②", name: "Present Continuous", pattern: "Subject + am/is/are + V-ing", note: "النشاط الجاري الآن والترتيبات القريبة" },
      { num: "③", name: "Present Perfect", pattern: "Subject + have/has + V3", note: "جسر الماضي بالحاضر والنتيجة الحاضرة" },
      { num: "④", name: "Present Perfect Continuous", pattern: "Subject + have/has + been + V-ing", note: "مدة النشاط الممتدة حتى الحاضر" },
    ],
  },
  {
    id: "past",
    title: "منظومة الماضي",
    en: "Past System (⑤–⑧)",
    stations: [
      { num: "⑤", name: "Past Simple", pattern: "Subject + V2", note: "حدث مكتمل في وقت محدد في الماضي" },
      { num: "⑥", name: "Past Continuous", pattern: "Subject + was/were + V-ing", note: "نشاط كان جاريًا عند نقطة أو حدث في الماضي" },
      { num: "⑦", name: "Past Perfect", pattern: "Subject + had + V3", note: "الحدث الأسبق قبل نقطة ماضية أخرى" },
      { num: "⑧", name: "Past Perfect Continuous", pattern: "Subject + had + been + V-ing", note: "مدة نشاط استمر قبل نقطة ماضية" },
    ],
  },
  {
    id: "future",
    title: "منظومة المستقبل",
    en: "Future System (⑨–⑮ · الدروس 34–40 مكتملة)",
    stations: [
      { num: "⑨", name: "Future Simple — WILL", lesson: 34, pattern: "Subject + will + V1", note: "قرار لحظي، وعد، عرض، توقع عام" },
      { num: "⑩", name: "BE GOING TO", lesson: 35, pattern: "Subject + am/is/are going to + V1", note: "خطة أو نية مسبقة، وتوقع مبني على دليل حاضر" },
      { num: "⑪", name: "WILL vs BE GOING TO", lesson: 36, pattern: "will مقابل am/is/are going to", note: "محطة المقارنة بين القرار اللحظي والخطة والتوقعات" },
      { num: "⑫", name: "Future Continuous", lesson: 37, pattern: "Subject + will be + V-ing", note: "نشاط سيكون جاريًا في لحظة مستقبلية" },
      { num: "⑬", name: "Future Perfect", lesson: 38, pattern: "Subject + will have + V3", note: "إنجاز سيكون مكتملًا بحلول نقطة مستقبلية" },
      { num: "⑭", name: "Future Perfect Continuous", lesson: 39, pattern: "Subject + will have been + V-ing", note: "مدة نشاط ممتدة حتى نقطة مستقبلية" },
      { num: "⑮", name: "Future Tenses Master Review — الدرس 40 مكتمل", lesson: 40, pattern: "منظومة المستقبل الكاملة (5 صيغ رئيسية)", note: "التحكم في اختيار الصيغة بحسب المعنى والسياق" },
    ],
  },
] as const;

export const NEXT_LESSON_40 = {
  label: "الدرس 41: Master Auxiliary Verbs — الإتقان الشامل للأفعال المساعدة",
  href: "#/lesson/41",
  primaryAuxiliaries: "BE — DO — HAVE",
  modalAuxiliaries: "CAN — COULD — MAY — MIGHT — MUST — SHOULD — WOULD.",
  previewQuestions: [
    { q: "Do you study English?", aux: "DO", role: "يساعد الفعل الأساسي في المضارع البسيط لتكوين السؤال" },
    { q: "Are you studying English?", aux: "BE (Are)", role: "يرتبط بصيغة الاستمرار (V-ing)" },
    { q: "Have you studied English?", aux: "HAVE", role: "يرتبط بصيغة التام والتصريف الثالث (V3)" },
    { q: "Can you speak English?", aux: "CAN", role: "فعل ناقص يعبّر عن القدرة ويليه الفعل المجرد (V1)" },
  ],
} as const;
