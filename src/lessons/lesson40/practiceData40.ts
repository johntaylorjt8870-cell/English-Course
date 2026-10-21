// ============================================================
// Lesson 40 — بيانات الأنشطة التفاعلية والتدريبات الموجهة
//
// يفصل هذا الملف بوضوح بين:
//   • نصوص المصدر وأسئلته ومفاتيحه (`origin: "source"`).
//   • إضافات المنصة التفاعلية والترجمات المساندة (`origin: "platform"`).
// ============================================================

export type ChoiceItem40 = {
  id: string;
  prompt: string;
  lines?: readonly string[];
  choices: readonly { value: string; label: string }[];
  accepted: readonly string[];
  feedback: string;
  nuance?: string;
  origin: "source" | "platform";
};

/** §1 — أهداف الدرس العشرة كما وردت في المصدر حرفيًا. */
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

/** §2 — الخريطة الكبرى: الأسئلة الستة التي تقود إلى الزمن المناسب. */
export const DECISION_MAP_QUESTIONS_40 = [
  {
    id: "q1",
    order: "السؤال الأول",
    question: "هل أتخذ القرار الآن؟",
    example: "The phone is ringing. I'll answer it.",
    translation: "الهاتف يرن. سأجيب عليه.",
    typicalForm: "WILL",
    category: "قرار لحظي (Spontaneous Decision)",
    guidance: "استخدام نموذجي لـ WILL عندما ينشأ القرار في لحظة الكلام استجابةً لموقف طارئ.",
  },
  {
    id: "q2",
    order: "السؤال الثاني",
    question: "هل أتحدث عن نية أو خطة موجودة مسبقًا؟",
    example: "I'm going to join a programming course next month.",
    translation: "أنوي الالتحاق بدورة برمجة الشهر القادم.",
    typicalForm: "BE GOING TO",
    category: "نية أو خطة مسبقة (Prior Intention / Plan)",
    guidance: "استخدام نموذجي لـ BE GOING TO عندما يكون القرار قد اتُّخذ قبل لحظة الكلام.",
  },
  {
    id: "q3",
    order: "السؤال الثالث",
    question: "هل أصف نشاطًا سيكون جاريًا عند لحظة مستقبلية؟",
    example: "At 8:00 tomorrow, I'll be studying.",
    translation: "غدًا عند الثامنة، سأكون أدرس.",
    typicalForm: "Future Continuous",
    category: "نشاط جارٍ في لحظة مستقبلية (Activity in Progress)",
    guidance: "نختار Future Continuous (will be + V-ing) عندما نضع الكاميرا داخل لحظة أو فترة مستقبلية.",
  },
  {
    id: "q4",
    order: "السؤال الرابع",
    question: "هل أركز على إنجاز سيكون مكتملًا بحلول نقطة مستقبلية؟",
    example: "By 9:00, I'll have finished my homework.",
    translation: "بحلول التاسعة، سأكون قد أنهيت واجبي.",
    typicalForm: "Future Perfect",
    category: "إنجاز مكتمل بحلول نقطة مرجعية (Completed Result)",
    guidance: "نختار Future Perfect (will have + V3) لإبراز اكتمال النتيجة قبل أو بحلول النقطة المستقبلية.",
  },
  {
    id: "q5",
    order: "السؤال الخامس",
    question: "هل أركز على مدة نشاط ممتدة حتى نقطة مستقبلية؟",
    example: "By 9:00, I'll have been studying for three hours.",
    translation: "بحلول التاسعة، سأكون قد أمضيت ثلاث ساعات في الدراسة.",
    typicalForm: "Future Perfect Continuous",
    category: "مدة نشاط ممتدة حتى نقطة مرجعية (Duration up to Reference Point)",
    guidance: "نختار Future Perfect Continuous (will have been + V-ing) عندما نقيس كم استمر النشاط حتى تلك النقطة.",
  },
  {
    id: "q6",
    order: "السؤال السادس",
    question: "هل أقدم وعدًا أو توقعًا عامًا أو عرض مساعدة؟",
    example: "I promise I'll help you.",
    translation: "أعدك بأنني سأساعدك.",
    typicalForm: "WILL",
    category: "وعد / عرض مساعدة / توقع عام (Promise, Offer, Prediction)",
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
    feedback: "قرار اتُّخذ لحظة سماع الرنين، فالصيغة النموذجية هي WILL (I'll answer it).",
    origin: "source",
  },
  {
    id: "dm-2",
    prompt: "تريد إبراز أن الواجب سيكون مكتملًا قبل أو عند الساعة التاسعة — أي صيغة تختار؟",
    lines: ["By 9:00, I'll have finished my homework."],
    choices: [
      { value: "fp", label: "Future Perfect — will have + V3" },
      { value: "fpc", label: "Future Perfect Continuous — will have been + V-ing" },
    ],
    accepted: ["fp"],
    feedback: "السؤال الرابع يركّز على الإنجاز المكتمل بحلول نقطة مستقبلية: Future Perfect.",
    origin: "source",
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
    feedback: "السؤال الخامس يركّز على مدة النشاط الممتدة حتى نقطة مستقبلية: Future Perfect Continuous.",
    origin: "source",
  },
  {
    id: "dm-4",
    prompt: "هل تمثّل الأسئلة الستة قواعد آلية معلّقة بكلمة دالة واحدة، أم استخدامات نموذجية تقودك بحسب المعنى؟",
    choices: [
      { value: "typical", label: "استخدامات نموذجية تقود المتحدث بحسب المعنى الذي يريد إبرازه في السياق" },
      { value: "mechanical", label: "قواعد آلية مطلقة تفرض زمنًا واحدًا بمجرد رؤية كلمة واحدة" },
    ],
    accepted: ["typical"],
    feedback: "يسمّي المصدر هذه الخيارات «الصيغة النموذجية» ويؤكد في §1 و§11 و§22 أن المعنى والسياق هما الأساس.",
    origin: "platform",
  },
];

/** §3 — الجدول الذهبي الشامل: تثبيت الصيغ الخمس الرئيسية وعلاقتها بالمحطات الست. */
export const GOLDEN_TABLE_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "gt-1",
    prompt: "لماذا يعرض الجدول الذهبي في §3 خمس صيغ رئيسية بينما ذكر الغلاف ست محطات في الدروس 34–39؟",
    choices: [
      { value: "l36", label: "لأن الدرس 36 كان محطة مقارنة بين WILL وBE GOING TO، فتبقى الصيغ النحوية الرئيسية خمسًا" },
      { value: "dropped", label: "لأن إحدى الصيغ حُذفت من اللغة الإنجليزية" },
    ],
    accepted: ["l36"],
    feedback: "نص المصدر §3: «لاحظ أننا نراجع خمس صيغ رئيسية، لأن الدرس 36 كان مخصصًا للمقارنة بين الصيغتين الأوليين.»",
    origin: "source",
  },
  {
    id: "gt-2",
    prompt: "أي صيغة في الجدول الذهبي تركيبها الأساسي will be + V-ing؟",
    choices: [
      { value: "fc", label: "Future Continuous — نشاط جارٍ في وقت مستقبلي" },
      { value: "fp", label: "Future Perfect — إنجاز مكتمل بحلول وقت مستقبلي" },
    ],
    accepted: ["fc"],
    feedback: "Future Continuous = will be + V-ing، ويبرز نشاطًا جاريًا في وقت مستقبلي.",
    origin: "source",
  },
  {
    id: "gt-3",
    prompt: "أي صيغة في الجدول الذهبي تبرز «نية أو خطة، توقع مبني على دليل»؟",
    choices: [
      { value: "going", label: "BE GOING TO — am/is/are going to + V1" },
      { value: "fpc", label: "Future Perfect Continuous — will have been + V-ing" },
    ],
    accepted: ["going"],
    feedback: "BE GOING TO تركيبها am/is/are going to + V1 وتبرز النية أو الخطة المسبقة أو التوقع المبني على دليل حاضر.",
    origin: "source",
  },
];

/** §4 — حدث واحد، خمس زوايا مختلفة باستخدام الفعل study. */
export const STUDY_PERSPECTIVES_40 = [
  {
    id: "p1",
    num: "①",
    form: "Future Simple — WILL",
    structure: "Subject + will + V1",
    sentence: "I will study tonight.",
    arabic: "سأدرس الليلة.",
    emphasis: "نخبر المستمع عن فعل مستقبلي، وقد تكون الجملة قرارًا اتُّخذ الآن بحسب السياق.",
  },
  {
    id: "p2",
    num: "②",
    form: "BE GOING TO",
    structure: "Subject + am/is/are going to + V1",
    sentence: "I'm going to study tonight.",
    arabic: "أنوي الدراسة الليلة.",
    emphasis: "نبرز وجود نية أو خطة مسبقة.",
  },
  {
    id: "p3",
    num: "③",
    form: "Future Continuous",
    structure: "Subject + will be + V-ing",
    sentence: "At 8:00 tonight, I will be studying.",
    arabic: "الليلة عند الثامنة، سأكون أدرس.",
    emphasis: "نبرز النشاط الجاري عند الثامنة.",
  },
  {
    id: "p4",
    num: "④",
    form: "Future Perfect",
    structure: "Subject + will have + V3",
    sentence: "By 10:00 tonight, I will have finished studying.",
    arabic: "بحلول العاشرة الليلة، سأكون قد انتهيت من الدراسة.",
    emphasis: "نبرز اكتمال النشاط.",
  },
  {
    id: "p5",
    num: "⑤",
    form: "Future Perfect Continuous",
    structure: "Subject + will have been + V-ing",
    sentence: "By 10:00 tonight, I will have been studying for four hours.",
    arabic: "بحلول العاشرة الليلة، سأكون قد أمضيت أربع ساعات في الدراسة.",
    emphasis: "نبرز مدة النشاط.",
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
    feedback: "At 8:00 tonight, I will be studying تبرز النشاط الجاري عند الثامنة.",
    origin: "source",
  },
  {
    id: "sp-2",
    prompt: "ما الاكتشاف المهم الذي يعلّمه القسم §4 من مقارنة الجمل الخمس؟",
    choices: [
      { value: "focus", label: "لا يكفي أن تعرف متى يحدث الفعل؛ يجب أن تعرف ما الذي تريد إبرازه بشأنه" },
      { value: "same", label: "جميع الجمل الخمس تقدم المعلومة نفسها تمامًا بلا أي فرق" },
    ],
    accepted: ["focus"],
    feedback: "الاكتشاف المهم في §4: كل الجمل تتحدث عن الدراسة في المستقبل، لكنها لا تقدم المعلومة نفسها.",
    origin: "source",
  },
];

/** §5 — الجولة الأولى: WILL أم BE GOING TO؟ */
export const WILL_VS_GOING_TO_SCENARIOS_40: readonly ChoiceItem40[] = [
  {
    id: "wg-1",
    prompt: "الموقف الأول: أنت تجلس مع صديقك، وفجأة يسقط كتابه — ماذا تقول؟",
    choices: [
      { value: "will", label: "I'll pick it up." },
      { value: "going", label: "I'm going to pick it up (كخطة مسبقة منذ أمس)." },
    ],
    accepted: ["will"],
    feedback: "قرار لحظي أو عرض مساعدة في لحظة سقوط الكتاب: I'll pick it up.",
    origin: "source",
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
    nuance: "تذكير متقدم: I will learn مقبولة نحويًا كإعلان مستقبلي عام، لكن BE GOING TO هي الصيغة النموذجية لإبراز النية المسبقة.",
    origin: "source",
  },
  {
    id: "wg-3",
    prompt: "الموقف الثالث: تتحدث عن توقع عام لمستقبل المدن مع I think — ما الصيغة النموذجية في المصدر؟",
    choices: [
      { value: "will", label: "I think cities will become greener." },
      { value: "going", label: "I think cities are going to become greener." },
    ],
    accepted: ["will", "going"],
    feedback: "مثال المصدر النموذجي للتوقع العام: I think cities will become greener.",
    nuance: "كلا الاختيارين مقبول نحويًا؛ يشير التذكير المتقدم في §5 و§22 إلى أن will وgoing to قد تتداخلان في التوقعات.",
    origin: "source",
  },
  {
    id: "wg-4",
    prompt: "الموقف الرابع: ترى طفلًا يحمل صندوقًا ثقيلًا، والصندوق يكاد يسقط أمام عينيك الآن — أي صيغة تبرز الدليل الحاضر؟",
    choices: [
      { value: "going", label: "He's going to drop that box!" },
      { value: "fp", label: "He will have dropped that box!" },
    ],
    accepted: ["going"],
    feedback: "توقع نبرز فيه دليلًا حاضرًا مرئيًا الآن: He's going to drop that box!",
    origin: "source",
  },
];

/** §6 — الجولة الثانية: متى نستخدم Future Continuous؟ */
export const FUTURE_CONTINUOUS_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "fc-1",
    prompt: "لديك درس عبر الإنترنت غدًا من 6:00 حتى 7:30، ويسألك صديقك: Can I call you at 6:30? — لماذا نجيب بـ Future Continuous؟",
    lines: ["I'm afraid I'll be attending an online lesson at that time."],
    choices: [
      { value: "in-progress", label: "لأننا نركز على النشاط الذي سيكون جاريًا عند السادسة والنصف، لا على بدايته أو نهايته" },
      { value: "completed", label: "لأن الدرس سيكون قد انتهى قبل السادسة والنصف" },
    ],
    accepted: ["in-progress"],
    feedback: "الساعة 6:30 تقع داخل فترة الدرس (6:00–7:30)، فنصف النشاط الجاري في تلك اللحظة.",
    origin: "source",
  },
  {
    id: "fc-2",
    prompt: "ما الوظيفة التواصلية الطبيعية للسؤال: Will you be using your laptop tonight?",
    lines: ["Will you be using your laptop tonight?"],
    choices: [
      { value: "polite", label: "الاستفسار اللطيف عن برنامج شخص أو مدى توفر الحاسوب الليلة" },
      { value: "past", label: "السؤال عن حدث انتهى في الماضي" },
    ],
    accepted: ["polite"],
    feedback: "يوضح المصدر أن هذا السؤال يُستخدم بصورة طبيعية للاستفسار عن برنامج شخص أو مدى توفر الحاسوب.",
    origin: "source",
  },
];

/** §7 — الجولة الثالثة: متى نستخدم Future Perfect؟ */
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
    origin: "source",
  },
  {
    id: "fp-2",
    prompt: "في جملة: By the time the guests arrive, we'll have prepared everything. — متى يكتمل التجهيز؟",
    lines: ["By the time the guests arrive, we'll have prepared everything."],
    choices: [
      { value: "before-arrival", label: "بحلول لحظة وصول الضيوف يكون التجهيز قد اكتمل" },
      { value: "after-arrival", label: "يبدأ التجهيز بعد مغادرة الضيوف" },
    ],
    accepted: ["before-arrival"],
    feedback: "By the time the guests arrive تحدد النقطة المرجعية التي يكون كل شيء قد جُهّز بحلولها.",
    origin: "source",
  },
];

/** §8 — الجولة الرابعة: متى نستخدم Future Perfect Continuous؟ */
export const FUTURE_PERFECT_CONTINUOUS_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "fpc-1",
    prompt: "بدأت سارة التدريب الساعة 2:00، وننظر إلى مدة تدريبها عند الساعة 6:00 — ما الجملة المطابقة لحساب المصدر؟",
    choices: [
      { value: "four", label: "By 6:00, Sara will have been training for four hours." },
      { value: "two", label: "By 6:00, Sara will have been training for two hours." },
    ],
    accepted: ["four"],
    feedback: "من الثانية إلى السادسة = أربع ساعات: By 6:00, Sara will have been training for four hours.",
    origin: "source",
  },
  {
    id: "fpc-2",
    prompt: "ما السؤال الأساسي الذي يجيب عنه Future Perfect Continuous في §8؟",
    choices: [
      { value: "how-long", label: "How long will the activity have been continuing by that future point?" },
      { value: "what-completed", label: "What will have been completed by that future point?" },
    ],
    accepted: ["how-long"],
    feedback: "السؤال الأساسي لـ Future Perfect Continuous هو قياس مدة استمرار النشاط حتى النقطة المستقبلية (How long...?).",
    origin: "source",
  },
];

/** §9 — المقارنة الثلاثية لمشروع آدم (4:00–8:00). */
export const ADAM_TIMELINE_POINTS_40 = [
  {
    id: "in-progress-6",
    clock: "At 6:00",
    tense: "Future Continuous",
    formula: "will be + V-ing",
    questionAr: "ماذا سيكون آدم يفعل عند السادسة؟",
    sentence: "At 6:00, Adam will be working on his project.",
    translation: "عند السادسة، سيكون آدم يعمل على مشروعه.",
    focus: "التركيز: النشاط الجاري.",
    windowInfo: "الساعة 6:00 تقع في منتصف فترة العمل (4:00 → 8:00).",
  },
  {
    id: "completed-8",
    clock: "By 8:00 (النتيجة)",
    tense: "Future Perfect",
    formula: "will have + V3",
    questionAr: "هل سيكون المشروع قد اكتمل بحلول الثامنة؟",
    sentence: "By 8:00, Adam will have completed his project.",
    translation: "بحلول الثامنة، سيكون آدم قد أكمل مشروعه.",
    focus: "التركيز: الإنجاز المكتمل.",
    windowInfo: "عند الساعة 8:00 ننظر إلى اكتمال المشروع كنتيجة منجزة.",
  },
  {
    id: "duration-8",
    clock: "By 8:00 (المدة: 4 ساعات)",
    tense: "Future Perfect Continuous",
    formula: "will have been + V-ing",
    questionAr: "كم ساعة سيكون آدم قد أمضى في العمل بحلول الثامنة؟",
    sentence: "By 8:00, Adam will have been working on his project for four hours.",
    translation: "بحلول الثامنة، سيكون آدم قد أمضى أربع ساعات في العمل على مشروعه.",
    focus: "التركيز: مدة النشاط.",
    windowInfo: "من 4:00 إلى 8:00 = 4 ساعات ممتدة حتى نقطة المرجع.",
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
    origin: "source",
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
    origin: "source",
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
    origin: "source",
  },
];

/** §10 — اختبار الفهم العميق: هل Future Perfect Continuous يعني عدم اكتمال العمل؟ */
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
    feedback: "نص المصدر §10: «هذه الجملة لا تخبرنا وحدها هل سأتوقف عند الثامنة أم سأستمر بعدها. إنها تبرز المدة.»",
    origin: "source",
  },
  {
    id: "du-2",
    prompt: "ما الفرق الحقيقي بين Future Perfect وFuture Perfect Continuous كما يقرّره §10؟",
    choices: [
      { value: "focus", label: "Future Perfect = التركيز على الإنجاز أو النتيجة · Future Perfect Continuous = التركيز على المدة أو امتداد النشاط" },
      { value: "shortcut", label: "Future Perfect = انتهى · Future Perfect Continuous = لم ينتهِ" },
    ],
    accepted: ["focus"],
    feedback: "يرفض المصدر صراحةً اختصار «انتهى / لم ينتهِ»، ويثبّت أن الفرق هو زاوية التركيز: الإنجاز أو النتيجة مقابل المدة أو الامتداد.",
    origin: "source",
  },
];

/** §11 — الكلمات الزمنية: إشارات تساعدك، لكنها لا تقرر بدلًا منك. */
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
    feedback: "الأولى تقدم حدث الإنهاء المستقبلي مع موعد نهائي، والثانية تبرز الاكتمال من منظور النقطة المستقبلية (يوم الجمعة).",
    origin: "source",
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
    origin: "source",
  },
];

/** §12 — قاعدة الجمل الزمنية المستقبلية. */
export const TIME_CLAUSE_CONJUNCTIONS_40 = ["when", "before", "after", "as soon as", "until", "by the time"] as const;

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
    explanation: "بعد By the time نستخدم Present Simple (arrive)، وفي الجملة الرئيسية نقيس مدة الانتظار (for an hour).",
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
    origin: "source",
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
    feedback: "نص المصدر §12: «هنا When أداة سؤال مباشر، وليست بداية جملة زمنية تابعة.»",
    origin: "source",
  },
];

/** §13 — الفرق بين WHEN وBY THE TIME. */
export const WHEN_VS_BY_THE_TIME_PERSPECTIVES_40 = [
  {
    id: "wbt-1",
    connector: "When you arrive",
    tense: "Future Continuous",
    sentence: "When you arrive, I'll be cooking.",
    arabic: "عندما تصل، سأكون أطبخ.",
    focus: "التركيز على نشاط سيكون جاريًا وقت وصولك.",
  },
  {
    id: "wbt-2",
    connector: "By the time you arrive",
    tense: "Future Perfect",
    sentence: "By the time you arrive, I'll have cooked dinner.",
    arabic: "بحلول وصولك، سأكون قد أعددت العشاء.",
    focus: "التركيز على اكتمال إعداد العشاء.",
  },
  {
    id: "wbt-3",
    connector: "By the time you arrive + for two hours",
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
    origin: "source",
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
    origin: "source",
  },
];

/** §14 — FOR vs SINCE وأفعال الحالة في منظومة المستقبل. */
export const FOR_SINCE_SORT_40 = [
  { id: "fs-1", phrase: "for two hours", kind: "for" as const, meaning: "مدة زمنية (لمدة ساعتين)" },
  { id: "fs-2", phrase: "for five years", kind: "for" as const, meaning: "مدة زمنية (لمدة خمس سنوات)" },
  { id: "fs-3", phrase: "since 8:00", kind: "since" as const, meaning: "نقطة بداية (منذ الساعة الثامنة)" },
  { id: "fs-4", phrase: "since 2022", kind: "since" as const, meaning: "نقطة بداية (منذ عام 2022)" },
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
    feedback: "لأن know فعل حالة (stative verb) عندما يعني المعرفة، فنستخدم معه Future Perfect (will have known) لا الصيغة المستمرة.",
    origin: "source",
  },
  {
    id: "fss-2",
    prompt: "هل يعني وجود for مع المدة أننا ممنوعون من استخدام Future Perfect؟",
    choices: [
      { value: "no", label: "لا — يمكن استخدام for مع Future Perfect أيضًا، خصوصًا مع أفعال مثل live وwork وknow" },
      { value: "yes", label: "نعم — for لا تأتي إلا مع Future Perfect Continuous" },
    ],
    accepted: ["no"],
    feedback: "نص المصدر §14: «يمكن أيضًا استخدام for مع Future Perfect، خصوصًا مع أفعال مثل live وwork وknow.»",
    origin: "source",
  },
];

/** §15 — مختبر البناء: لا تخلط بين التركيبات. */
export const FORMULA_BUILDER_TARGETS_40 = [
  {
    id: "fb-will",
    tense: "Future Simple",
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
    reason: "بعد will have يأتي التصريف الثالث (V3): written، وليس الماضي البسيط wrote.",
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

/** §16 — الحوار الشامل الأول: The Science Competition. */
export const DIALOGUE1_LINES_40 = [
  {
    id: "d1-1",
    speaker: "Maya",
    en: "Our science competition is next Saturday. Are we ready?",
    ar: "مسابقتنا العلمية يوم السبت القادم. هل نحن مستعدون؟",
    tense: "Present Simple (جدول/موعد)",
    analysis: "تمهيد للموقف وتحديد موعد المسابقة.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d1-2",
    speaker: "Daniel",
    en: "Almost. We're going to finish the main structure tomorrow.",
    ar: "تقريبًا. ننوي إنهاء الهيكل الرئيسي غدًا.",
    tense: "BE GOING TO — We're going to finish...",
    analysis: "خطة موجودة مسبقًا.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d1-3",
    speaker: "Maya",
    en: "Oh no! One of the sensors isn't working.",
    ar: "أوه لا! أحد الحساسات لا يعمل.",
    tense: "Present Continuous (مشكلة حاضرة)",
    analysis: "ظهور مشكلة مفاجئة الآن تستدعي قرارًا لحظيًا.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d1-4",
    speaker: "Daniel",
    en: "Don't worry. I'll check it.",
    ar: "لا تقلقي. سأفحصه.",
    tense: "Future Simple (WILL) — I'll check it.",
    analysis: "قرار لحظي أو عرض مساعدة.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d1-5",
    speaker: "Maya",
    en: "Do you think our robot will impress the judges?",
    ar: "هل تعتقد أن روبوتنا سيبهر لجنة التحكيم؟",
    tense: "Future Simple (WILL) — Will impress...",
    analysis: "توقع بشأن المستقبل.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d1-6",
    speaker: "Daniel",
    en: "I think it will.",
    ar: "أعتقد أنه سيفعل ذلك.",
    tense: "Future Simple (إجابة مختصرة للتوقع)",
    analysis: "تأكيد التوقع باستخدام will.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d1-7",
    speaker: "Maya",
    en: "What will you be doing at 4:00 tomorrow?",
    ar: "ماذا ستكون تفعل عند الرابعة غدًا؟",
    tense: "Future Continuous (سؤال)",
    analysis: "سؤال عن نشاط سيكون جاريًا عند لحظة محددة (4:00 tomorrow).",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d1-8",
    speaker: "Daniel",
    en: "I'll be testing the navigation system.",
    ar: "سأكون أختبر نظام الملاحة.",
    tense: "Future Continuous — I'll be testing...",
    analysis: "نشاط سيكون جاريًا عند الرابعة.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d1-9",
    speaker: "Maya",
    en: "Will we have completed everything by Friday?",
    ar: "هل سنكون قد أكملنا كل شيء بحلول الجمعة؟",
    tense: "Future Perfect (سؤال)",
    analysis: "سؤال عن اكتمال العمل بحلول نقطة مستقبلية (by Friday).",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d1-10",
    speaker: "Daniel",
    en: "Yes. By Friday evening, we'll have finished all the tests.",
    ar: "نعم. بحلول مساء الجمعة، سنكون قد أنهينا جميع الاختبارات.",
    tense: "Future Perfect — We'll have finished...",
    analysis: "إنجاز مكتمل بحلول مساء الجمعة.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d1-11",
    speaker: "Maya",
    en: "Excellent! By then, we'll have been working on this project for three months.",
    ar: "ممتاز! بحلول ذلك الوقت، سنكون قد أمضينا ثلاثة أشهر في العمل على هذا المشروع.",
    tense: "Future Perfect Continuous — We'll have been working...",
    analysis: "مدة نشاط ممتدة حتى نقطة مستقبلية.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
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
    feedback: "تحليل المصدر: I'll check it = قرار لحظي أو عرض مساعدة.",
    origin: "source",
  },
  {
    id: "d1c-2",
    prompt: "كم صيغة مستقبلية رئيسية اجتمعت في حوار المسابقة العلمية وفق اكتشاف IQ200؟",
    choices: [
      { value: "five", label: "خمس صيغ مستقبلية، وكل صيغة أضافت معلومة مختلفة" },
      { value: "two", label: "صيغتان فقط" },
    ],
    accepted: ["five"],
    feedback: "اكتشاف IQ200 في §16: استخدمنا خمس صيغ مستقبلية داخل حوار واحد، وكل صيغة أضافت معلومة مختلفة.",
    origin: "source",
  },
];

/** §17 — الحوار الشامل الثاني: A Family Trip. */
export const DIALOGUE2_LINES_40 = [
  {
    id: "d2-1",
    speaker: "Father",
    en: "We're going to leave early tomorrow. I've already prepared the route.",
    ar: "سنغادر مبكرًا غدًا. لقد جهزت المسار بالفعل.",
    tense: "BE GOING TO (خطة مسبقة)",
    analysis: "① We're going to leave = خطة مسبقة (بدليل تجهيز المسار مسبقًا).",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d2-2",
    speaker: "Mother",
    en: "Look at those dark clouds! It's going to rain.",
    ar: "انظر إلى تلك الغيوم الداكنة! إنها ستمطر.",
    tense: "BE GOING TO (توقع مبني على دليل)",
    analysis: "② It's going to rain = توقع مبني على دليل حاضر (الغيوم الداكنة).",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d2-3",
    speaker: "Father",
    en: "Then I'll put the raincoats in the car.",
    ar: "إذن سأضع معاطف المطر في السيارة.",
    tense: "Future Simple (WILL)",
    analysis: "③ I'll put the raincoats in the car = قرار لحظي استجابةً لتوقع المطر.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d2-4",
    speaker: "Daughter",
    en: "What will we be doing at noon?",
    ar: "ماذا سنكون نفعل عند الظهر؟",
    tense: "Future Continuous (سؤال)",
    analysis: "سؤال عن النشاط الجاري عند لحظة الظهر.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d2-5",
    speaker: "Father",
    en: "We'll be driving through the mountains.",
    ar: "سنكون نقود عبر الجبال.",
    tense: "Future Continuous",
    analysis: "④ We'll be driving = نشاط جارٍ في لحظة مستقبلية (عند الظهر).",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d2-6",
    speaker: "Son",
    en: "Will we have reached the hotel by 6:00?",
    ar: "هل سنكون قد وصلنا إلى الفندق بحلول السادسة؟",
    tense: "Future Perfect (سؤال)",
    analysis: "⑤ Will we have reached? = سؤال عن إنجاز مكتمل بحلول وقت مستقبلي.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
  },
  {
    id: "d2-7",
    speaker: "Father",
    en: "Yes, we will.",
    ar: "نعم، سنفعل.",
    tense: "Short Answer (Will)",
    analysis: "إجابة قصيرة قياسية باستخدام will.",
    origin: "platform" as const,
    analysisOrigin: "platform" as const,
  },
  {
    id: "d2-8",
    speaker: "Mother",
    en: "And by the time we arrive, we'll have been travelling for eight hours.",
    ar: "وبحلول وقت وصولنا، سنكون قد أمضينا ثماني ساعات في السفر.",
    tense: "Future Perfect Continuous",
    analysis: "⑥ We'll have been travelling = مدة نشاط ممتدة حتى نقطة مستقبلية.",
    origin: "platform" as const,
    analysisOrigin: "source" as const,
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
    feedback: "① خطة مسبقة (I've already prepared the route).",
    origin: "source",
  },
  {
    id: "d2-q2",
    prompt: "② صنّف الاستخدام في: It's going to rain.",
    choices: [
      { value: "evidence", label: "توقع مبني على دليل حاضر." },
      { value: "duration", label: "مدة نشاط ممتدة حتى نقطة مستقبلية." },
    ],
    accepted: ["evidence"],
    feedback: "② توقع مبني على دليل حاضر (Look at those dark clouds!).",
    origin: "source",
  },
  {
    id: "d2-q3",
    prompt: "③ صنّف الاستخدام في: I'll put the raincoats in the car.",
    choices: [
      { value: "instant", label: "قرار لحظي." },
      { value: "plan", label: "خطة مسبقة." },
    ],
    accepted: ["instant"],
    feedback: "③ قرار لحظي اتُّخذ فور سماع ملاحظة الغيوم.",
    origin: "source",
  },
  {
    id: "d2-q4",
    prompt: "④ صنّف الاستخدام في: We'll be driving.",
    choices: [
      { value: "in-progress", label: "نشاط جارٍ في لحظة مستقبلية." },
      { value: "completed", label: "سؤال عن إنجاز مكتمل بحلول وقت مستقبلي." },
    ],
    accepted: ["in-progress"],
    feedback: "④ نشاط جارٍ في لحظة مستقبلية (عند الظهر).",
    origin: "source",
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
    origin: "source",
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
    origin: "source",
  },
];

/** §18 — مختبر المواقف: اختر الزمن دون كلمات دالة واضحة. */
export const SITUATION_LAB_ITEMS_40: readonly ChoiceItem40[] = [
  {
    id: "sit-1",
    prompt: "الموقف الأول: تجلس مع صديقك، ويخبرك فجأة أنه لا يفهم مسألة رياضية — ماذا تقول؟",
    choices: [
      { value: "will", label: "I'll explain it to you." },
      { value: "fpc", label: "I'll have been explaining it to you." },
    ],
    accepted: ["will"],
    feedback: "لأنك تعرض المساعدة الآن (قرار لحظي / عرض مساعدة).",
    origin: "source",
  },
  {
    id: "sit-2",
    prompt: "الموقف الثاني: اشتريت أدوات الرسم، وسجلت في دورة تبدأ قريبًا — ماذا تقول؟",
    choices: [
      { value: "going", label: "I'm going to learn digital drawing." },
      { value: "fc", label: "I'll be learning digital drawing at 5:00 yesterday." },
    ],
    accepted: ["going"],
    feedback: "لأن لديك نية مسبقة وخطة اتخذت خطواتها الفعلية.",
    origin: "source",
  },
  {
    id: "sit-3",
    prompt: "الموقف الثالث: صديقك يريد الاتصال بك أثناء موعد امتحانك — ماذا تقول؟",
    choices: [
      { value: "fc", label: "I'll be taking an exam then." },
      { value: "will", label: "I'll take an exam now." },
    ],
    accepted: ["fc"],
    feedback: "لأنك تصف نشاطًا سيكون جاريًا في ذلك الوقت.",
    origin: "source",
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
    origin: "source",
  },
  {
    id: "sit-5",
    prompt: "الموقف الخامس: بدأت العمل على مشروع طويل، وتريد وصف المدة التي ستكون قد أمضيتها فيه عند نهاية الشهر — ماذا تقول؟",
    choices: [
      { value: "fpc", label: "By the end of the month, I'll have been working on it for six months." },
      { value: "going", label: "I'm going to work on it for six months." },
    ],
    accepted: ["fpc"],
    feedback: "لأنك تبرز مدة النشاط الممتدة حتى نهاية الشهر.",
    origin: "source",
  },
];

/** §19 — التدريب الأول: اختر الصيغة الأنسب (6 بنود). */
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

/** §20 — التدريب الثاني: أكمل الصيغة المناسبة (8 بنود). */
export const FILL20_ITEMS_40 = [
  {
    n: 1,
    prompt: "① I promise I ______ (help) you.",
    answer: "will help",
    accepted: ["will help", "'ll help", "I'll help"],
    why: "وعد (I promise) ← Future Simple: will help.",
  },
  {
    n: 2,
    prompt: "② We bought the tickets yesterday. We ______ (visit) the museum next week.",
    answer: "are going to visit",
    accepted: ["are going to visit", "'re going to visit", "we're going to visit", "are visiting", "will visit"],
    why: "خطة مسبقة: شراء التذاكر أمس يوفّر يقينًا سياقيًا يدعم وجود الخطة المسبقة، والصيغة المستهدفة ضمن الصيغ الخمس هي are going to visit (مع التمييز بين الصيغة النحوية للخطة واليقين المستمد من السياق).",
  },
  {
    n: 3,
    prompt: "③ This time tomorrow, she ______ (travel) to another city.",
    answer: "will be travelling",
    accepted: ["will be travelling", "will be traveling", "'ll be travelling", "'ll be traveling"],
    why: "نشاط جارٍ في لحظة مستقبلية (This time tomorrow) ← Future Continuous: will be travelling.",
  },
  {
    n: 4,
    prompt: "④ By noon, I ______ (finish) all my exercises.",
    answer: "will have finished",
    accepted: ["will have finished", "'ll have finished"],
    why: "إنجاز مكتمل بحلول الظهر (By noon + all my exercises) ← Future Perfect: will have finished.",
  },
  {
    n: 5,
    prompt: "⑤ By noon, I ______ (study) for four hours.",
    answer: "will have been studying",
    accepted: ["will have been studying", "'ll have been studying"],
    why: "مدة نشاط ممتدة حتى الظهر (By noon + for four hours) ← Future Perfect Continuous: will have been studying.",
  },
  {
    n: 6,
    prompt: "⑥ When you arrive, we ______ (prepare) dinner.",
    answer: "will be preparing",
    accepted: ["will be preparing", "'ll be preparing", "will prepare", "'ll prepare"],
    why: "تحضير جارٍ عند الوصول (When you arrive) ← Future Continuous: will be preparing.",
  },
  {
    n: 7,
    prompt: "⑦ By the time you arrive, we ______ (prepare) dinner.",
    answer: "will have prepared",
    accepted: ["will have prepared", "'ll have prepared"],
    why: "تحضير مكتمل بحلول الوصول (By the time you arrive دون مدة) ← Future Perfect: will have prepared.",
  },
  {
    n: 8,
    prompt: "⑧ By the time you arrive, we ______ (work) for three hours.",
    answer: "will have been working",
    accepted: ["will have been working", "'ll have been working", "will have worked", "'ll have worked"],
    why: "مدة العمل حتى الوصول (By the time you arrive + for three hours) ← Future Perfect Continuous: will have been working.",
  },
] as const;

/** §21 — Grammar Detective: التحدي الشامل (10 بنود). */
export const DETECTIVE21_ITEMS_40 = [
  {
    n: 1,
    prompt: "She will going to study tonight.",
    answer: "She is going to study tonight. / She will study tonight.",
    why: "لا نخلط بين will وgoing to في جملة واحدة؛ إما She is going to study tonight (خطة) أو She will study tonight (حدث/قرار مستقبلي).",
  },
  {
    n: 2,
    prompt: "I will be write the report at 8:00.",
    answer: "I will be writing the report at 8:00.",
    why: "في Future Continuous يأتي بعد will be الفعل مضافًا إليه ing (writing لا write).",
  },
  {
    n: 3,
    prompt: "He will have wrote the letter by Friday.",
    answer: "He will have written the letter by Friday.",
    why: "في Future Perfect نستخدم التصريف الثالث (V3: written) بعد will have، وليس الماضي البسيط wrote.",
  },
  {
    n: 4,
    prompt: "They will have being working for three hours.",
    answer: "They will have been working for three hours.",
    why: "الجزء الثابت بعد will have في Future Perfect Continuous هو been (التصريف الثالث من be) وليس being.",
  },
  {
    n: 5,
    prompt: "Does she going to travel tomorrow?",
    answer: "Is she going to travel tomorrow?",
    why: "صيغة BE GOING TO تُبنى مع فعل الكينونة (am/is/are)، لذا نسأل بـ Is she going to...? لا بـ Does.",
  },
  {
    n: 6,
    prompt: "Will you be studying at 9:00? Yes, I am.",
    answer: "Will you be studying at 9:00? Yes, I will.",
    why: "السؤال يبدأ بالفعل المساعد Will، فتكون الإجابة القصيرة الصحيحة Yes, I will. وليس Yes, I am.",
  },
  {
    n: 7,
    prompt: "By the time he will arrive, we will have finished.",
    answer: "By the time he arrives, we will have finished.",
    why: "في الجملة الزمنية المستقبلية بعد by the time نستخدم Present Simple (he arrives) ولا نستخدم will.",
  },
  {
    n: 8,
    prompt: "She will has completed the project.",
    answer: "She will have completed the project.",
    why: "بعد will يأتي الفعل المجرد have مع جميع الضمائر بما فيها She، ولا نستخدم has بعد will.",
  },
  {
    n: 9,
    prompt: "How long will they have be travelling by midnight?",
    answer: "How long will they have been travelling by midnight?",
    why: "في سؤال المدة مع Future Perfect Continuous نحتاج إلى been بعد have: How long will they have been travelling...?",
  },
  {
    n: 10,
    prompt: "I will have been knowing him for ten years by next June.",
    answer: "I will have known him for ten years by next June.",
    why: "الفعل know (بمعنى المعرفة) فعل حالة لا يُستخدم عادةً في الصيغة المستمرة، فنستخدم Future Perfect: will have known.",
  },
] as const;

/** §22 — تحدي IQ200: متى تكون أكثر من إجابة صحيحة؟ */
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
    feedback: "يؤكد §22 أن الجملتين صحيحتان، وأن الاختيار بينهما مسألة تركيز (حدث مستقبلي مع موعد نهائي مقابل اكتمال بحلول نقطة مستقبلية).",
    origin: "source",
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
    feedback: "القاعدة المتقدمة في §22: لا تفترض أن هناك دائمًا إجابة واحدة صحيحة فقط عندما لا يقيّد السياق الاختيار.",
    origin: "source",
  },
];

/** §23 — Reading Challenge: Building the Future Learning Centre. */
export const READING23_STATIONS_40 = [
  {
    id: "st-plan",
    label: "الخطة المعتمدة (Next Month)",
    quote: "The school has already approved the plan, and construction is going to begin next month.",
    tense: "BE GOING TO",
    meaning: "خطة معتمدة مسبقًا لبدء البناء الشهر القادم، وإنشاء ركن قراءة ومختبر علوم ومنطقة تعلم رقمي.",
  },
  {
    id: "st-backup",
    label: "المشكلة العاجلة (Right Now)",
    quote: "Don't worry. I'll check the backup copy.",
    tense: "Future Simple — WILL",
    meaning: "قرار لحظي وعرض مساعدة من آدم فور ملاحظة دانيال أن الملف الرئيسي لا يفتح.",
  },
  {
    id: "st-next-month",
    label: "في مثل هذا الوقت الشهر القادم",
    quote: "We'll be organizing the books and preparing the computers.",
    tense: "Future Continuous",
    meaning: "نشاط سيكون جاريًا في تلك الفترة المستقبلية (تنظيم الكتب وتجهيز الحواسيب).",
  },
  {
    id: "st-end-month",
    label: "بحلول نهاية الشهر القادم",
    quote: "By the end of next month, we'll have installed all the equipment.",
    tense: "Future Perfect",
    meaning: "إنجاز سيكون مكتملًا بحلول نهاية الشهر القادم (تركيب جميع المعدات).",
  },
  {
    id: "st-opening",
    label: "بحلول افتتاح المركز (6 أشهر)",
    quote: "And by the time the centre opens, we'll have been working on this project for six months!",
    tense: "Future Perfect Continuous",
    meaning: "مدة العمل الممتدة (ستة أشهر) حتى لحظة افتتاح المركز (opens بـ Present Simple بعد by the time).",
  },
  {
    id: "st-inspire",
    label: "توقع المعلم للمستقبل",
    quote: "I'm sure the new centre will inspire many students.",
    tense: "Future Simple — WILL",
    meaning: "توقع أو اعتقاد عام بشأن أثر المركز الجديد في الطلاب.",
  },
] as const;

export const READING23_QUESTIONS_40 = [
  "① What is the school preparing?",
  "② When is construction going to begin?",
  "③ What are the students going to create?",
  "④ Why does Adam say, \"I'll check the backup copy\"?",
  "⑤ What will they be doing at this time next month?",
  "⑥ What will they have installed by the end of next month?",
  "⑦ How long will they have been working on the project by the time the centre opens?",
  "⑧ Which sentence expresses a prediction?",
] as const;

export const READING23_ANSWERS_40 = [
  "① A new learning centre.",
  "② Next month.",
  "③ A reading corner, a science laboratory, and a digital learning area.",
  "④ Because he notices a problem and offers to check the backup copy.",
  "⑤ They will be organizing books and preparing computers.",
  "⑥ All the equipment.",
  "⑦ For six months.",
  "⑧ I'm sure the new centre will inspire many students.",
] as const;

/** §24 — التحليل النحوي الكامل للقصة. */
export const STORY_ANALYSIS24_ITEMS_40 = [
  {
    id: "sa-1",
    sentence: "Construction is going to begin next month.",
    tense: "BE GOING TO",
    reason: "خطة موجودة مسبقًا.",
    detail: "المدرسة اعتمدت الخطة بالفعل (has already approved the plan)، فالبدء الشهر القادم خطة مقررة سلفًا.",
  },
  {
    id: "sa-2",
    sentence: "I'll check the backup copy.",
    tense: "Future Simple — WILL",
    reason: "قرار لحظي أو عرض مساعدة.",
    detail: "ردّ فعل فوري من آدم بعد أن لاحظ دانيال أن الملف الرئيسي لا يفتح.",
  },
  {
    id: "sa-3",
    sentence: "We'll be organizing the books.",
    tense: "Future Continuous",
    reason: "نشاط سيكون جاريًا خلال فترة مستقبلية.",
    detail: "إجابة عن سؤال المعلم: What will you be doing at this time next month?",
  },
  {
    id: "sa-4",
    sentence: "We'll have installed all the equipment.",
    tense: "Future Perfect",
    reason: "إنجاز سيكون مكتملًا بحلول نهاية الشهر.",
    detail: "تبرز اكتمال تركيب المعدات قبل أو عند نهاية الشهر القادم (By the end of next month).",
  },
  {
    id: "sa-5",
    sentence: "We'll have been working on this project for six months.",
    tense: "Future Perfect Continuous",
    reason: "مدة نشاط ممتدة حتى افتتاح المركز.",
    detail: "تقيس مدة الأشهر الستة الممتدة حتى لحظة الافتتاح (by the time the centre opens).",
  },
  {
    id: "sa-6",
    sentence: "The new centre will inspire many students.",
    tense: "Future Simple — WILL",
    reason: "توقع أو اعتقاد بشأن المستقبل.",
    detail: "جاءت بعد عبارة اليقين والاعتقاد I'm sure للتعبير عن توقع مستقبلي.",
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
    feedback: "تحليل المصدر §24: We'll have installed all the equipment = إنجاز سيكون مكتملًا بحلول نهاية الشهر.",
    origin: "source",
  },
  {
    id: "saq-2",
    prompt: "ما السؤال التحليلي الذي يوصي به «الدرس المستفاد» في §24 عند قراءة أي نص إنجليزي؟",
    choices: [
      { value: "why", label: "لماذا اختار الكاتب هذا الزمن تحديدًا؟ (وليس الاكتفاء بتحديد اسم الزمن)" },
      { value: "name-only", label: "الاكتفاء بحفظ اسم الزمن دون النظر إلى المعنى" },
    ],
    accepted: ["why"],
    feedback: "نص المصدر §24: «عندما تقرأ نصًا إنجليزيًا، لا تكتفِ بتحديد اسم الزمن. اسأل: لماذا اختار الكاتب هذا الزمن تحديدًا؟»",
    origin: "source",
  },
];

/** §27 — مهمة الإنتاج اللغوي الكبرى (Writing Mission). */
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

/** §28 — الملخص الذهبي النهائي لمنظومة المستقبل. */
export const GOLDEN_SUMMARY28_CARDS_40 = [
  {
    id: "sum-1",
    order: "①",
    title: "Future Simple — WILL",
    formula: "Subject + will + V1",
    uses: "قرار لحظي، وعد، عرض مساعدة، توقع أو اعتقاد.",
    example: "I'll help you.",
  },
  {
    id: "sum-2",
    order: "②",
    title: "BE GOING TO",
    formula: "Subject + am/is/are + going to + V1",
    uses: "خطة أو نية مسبقة، وتوقع نبرز فيه دليلًا حاضرًا.",
    example: "I'm going to start a new course next month.",
  },
  {
    id: "sum-3",
    order: "③",
    title: "Future Continuous",
    formula: "Subject + will + be + V-ing",
    uses: "نشاط سيكون جاريًا في لحظة أو فترة مستقبلية.",
    example: "At 8:00 tomorrow, I'll be studying.",
  },
  {
    id: "sum-4",
    order: "④",
    title: "Future Perfect",
    formula: "Subject + will + have + V3",
    uses: "إنجاز سيكون مكتملًا بحلول نقطة مستقبلية.",
    example: "By 9:00, I'll have finished my homework.",
  },
  {
    id: "sum-5",
    order: "⑤",
    title: "Future Perfect Continuous",
    formula: "Subject + will + have + been + V-ing",
    uses: "مدة نشاط ممتدة حتى نقطة مستقبلية.",
    example: "By 9:00, I'll have been studying for three hours.",
  },
] as const;

export const GOLDEN_SUMMARY28_QUIZ_40: readonly ChoiceItem40[] = [
  {
    id: "gs-1",
    prompt: "ما القاعدة الذهبية الكبرى في ختام §28 عند اختيار زمن المستقبل؟",
    choices: [
      { value: "meaning", label: "لا تختَر الزمن اعتمادًا على tomorrow أو next week أو by فقط؛ اسأل نفسك عن المعنى الذي تريد التعبير عنه" },
      { value: "keywords", label: "اختر الزمن فور رؤية أول كلمة زمنية في الجملة دون قراءة بقية السياق" },
    ],
    accepted: ["meaning"],
    feedback: "القاعدة الذهبية الكبرى: اسأل نفسك هل تريد التعبير عن قرار، أم خطة، أم توقع، أم نشاط جارٍ، أم إنجاز مكتمل، أم مدة نشاط ممتدة.",
    origin: "source",
  },
  {
    id: "gs-2",
    prompt: "صِل المثال بصيغته في الملخص الذهبي: By 9:00, I'll have finished my homework.",
    choices: [
      { value: "fp", label: "④ Future Perfect — Subject + will + have + V3" },
      { value: "fpc", label: "⑤ Future Perfect Continuous — Subject + will + have + been + V-ing" },
    ],
    accepted: ["fp"],
    feedback: "I'll have finished my homework مثال Future Perfect لإبراز الإنجاز المكتمل بحلول التاسعة.",
    origin: "source",
  },
];

/** §29 — خريطة تقدم المنهج بعد الدرس 40 (15 محطة مكتملة في 3 منظومات + المحطة القادمة المخططة). */
export const CURRICULUM_SYSTEMS_40 = [
  {
    id: "present",
    title: "منظومة الحاضر",
    en: "Present System (①–④)",
    stations: [
      { num: "①", name: "Present Simple", pattern: "Subject + V1 / V1+s", note: "العادات والحقائق والجداول الثابتة (ومع الجمل الزمنية المستقبلية)" },
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
      { num: "⑩", name: "BE GOING TO", lesson: 35, pattern: "Subject + am/is/are going to + V1", note: "خطة/نية مسبقة، وتوقع مبني على دليل حاضر" },
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
  status: "implemented-route" as const,
  primaryAuxiliaries: "BE — DO — HAVE",
  modalAuxiliaries: "CAN — COULD — MAY — MIGHT — MUST — SHOULD — WOULD.",
  previewQuestions: [
    "Do you study English?",
    "Are you studying English?",
    "Have you studied English?",
    "Can you speak English?",
  ],
  note: "نص المعاينة محفوظ من المصدر. يتضمن الإصدار الحالي من المستودع درسًا 41 ومسارًا مسجلًا له؛ يُفتح عبر رابط الدرس التالي ولا يُضاف إلى هذه المعاينة أي شرح غير وارد في المصدر.",
} as const;
