// ============================================================
// Lesson 59 — Advanced Passive with Modals and Advanced Structures
// المحتوى الكامل للمصدر المورّد، موزّعًا على الأقسام الأحد عشر
// (33 موضوعًا مرقّمًا). لا حذف ولا اختصار: كل قاعدة، كل مثال،
// كل ترجمة، النفي والسؤال، وفروق المعنى محفوظة كما وردت.
// ============================================================

export type Pair59 = {
  active: string;
  activeAr: string;
  passive: string;
  passiveAr: string;
  why?: string;
};

export type Line59 = { en: string; ar: string };

export type Usage59 = {
  label: string;
  note: string;
  examples: Line59[];
};

export type ModalLesson59 = {
  id: string;
  /** رقم الموضوع في المصدر */
  n: number;
  modal: string;
  formula: string;
  arName: string;
  use: string;
  usages?: Usage59[];
  pairs: Pair59[];
  negative: { formula: string; note?: string; examples: Line59[] };
  question: { formula: string; note?: string; examples: Line59[] };
  compare?: { title: string; rows: Line59[]; note?: string };
  warning?: string;
};

export const OPENING59 = {
  bridge:
    "في الدرس 57 تعلّمنا أساسيات المبني للمجهول، وفي الدرس 58 تعلّمنا استخدامه عبر الأزمنة المختلفة. أما في هذا الدرس فسنتعلّم كيف نستخدم المبني للمجهول مع الأفعال الناقصة Modal Verbs، وكيف نضيف تراكيب متقدمة تغيّر المعنى بدقة.",
  modals: [
    { en: "can", ar: "يستطيع" },
    { en: "could", ar: "استطاع / يمكن" },
    { en: "must", ar: "يجب" },
    { en: "should", ar: "ينبغي" },
    { en: "may", ar: "قد / ربما" },
    { en: "might", ar: "قد / ربما" },
    { en: "have to", ar: "يجب أن" },
    { en: "ought to", ar: "ينبغي أن" },
  ],
  advanced: [
    "must have been done",
    "should have been completed",
    "can be used",
    "needs to be repaired",
    "is expected to be announced",
  ],
  goal:
    "أن تستطيع استخدام المبني للمجهول مع الأفعال الناقصة، وأن تفهم الفرق بين الواجب والاحتمال والنصيحة والقدرة عندما تكون الجملة مبنية للمجهول.",
};

export const BASIC_RULE_59 = {
  formula: "Modal Verb + be + V3",
  ar: "الفعل الناقص + be + التصريف الثالث للفعل الأساسي.",
  stableBe:
    "لاحظ أن كلمة be لا تتغيّر بعد الأفعال الناقصة: تبقى be دائمًا، ولا تتحوّل أبدًا إلى is أو are أو was أو were.",
  correct: ["can be done", "must be completed", "should be checked", "may be used", "might be needed", "could be repaired"],
  wrong: ["can is done", "must was completed", "should are checked"],
  why:
    "لأن الأفعال الناقصة مثل can وmust وshould يأتي بعدها الفعل في صورته الأساسية، ولذلك نستخدم be وليس is أو are أو was أو were إطلاقًا.",
  pairs: [
    {
      active: "They can repair the car.",
      activeAr: "يستطيعون إصلاح السيارة.",
      passive: "The car can be repaired.",
      passiveAr: "يمكن إصلاح السيارة.",
    },
    {
      active: "Students must finish the homework.",
      activeAr: "يجب على الطلاب إنهاء الواجب.",
      passive: "The homework must be finished.",
      passiveAr: "يجب إنهاء الواجب.",
    },
    {
      active: "You should check the documents.",
      activeAr: "ينبغي أن تفحص الوثائق.",
      passive: "The documents should be checked.",
      passiveAr: "ينبغي فحص الوثائق.",
    },
    {
      active: "People may use this room.",
      activeAr: "قد يستخدم الناس هذه الغرفة.",
      passive: "This room may be used.",
      passiveAr: "قد تُستخدم هذه الغرفة.",
    },
  ] as Pair59[],
  note:
    "في الجمل السابقة نقلنا المفعول به إلى بداية الجملة، ثم استخدمنا: Modal + be + V3.",
};

// الأقسام 2–6: CAN · COULD · MUST · SHOULD · MAY / MIGHT
export const MODAL_LESSONS_59: ModalLesson59[] = [
  {
    id: "can",
    n: 2,
    modal: "CAN",
    arName: "القدرة والإمكانية والسماح",
    formula: "can + be + V3",
    use: "نستخدم هذا التركيب للتعبير عن القدرة أو الإمكانية أو السماح.",
    usages: [
      {
        label: "الاستخدام الأول: القدرة والإمكانية",
        note: "شيء يمكن القيام به لأن هناك قدرة أو وسيلة تسمح بذلك.",
        examples: [
          { en: "This problem can be solved.", ar: "يمكن حل هذه المشكلة." },
          { en: "These machines can be operated.", ar: "يمكن تشغيل هذه الآلات." },
        ],
      },
      {
        label: "الاستخدام الثاني: إمكانية حدوث شيء",
        note: "إمكانية عامة متاحة في الواقع، لا قدرة شخص بعينه.",
        examples: [
          { en: "English can be learned through practice.", ar: "يمكن تعلّم الإنجليزية من خلال الممارسة." },
          { en: "This mistake can be avoided.", ar: "يمكن تجنّب هذا الخطأ." },
          { en: "The information can be found online.", ar: "يمكن العثور على المعلومات عبر الإنترنت." },
        ],
      },
      {
        label: "الاستخدام الثالث: السماح",
        note: "إذن مسموح به، وغالبًا يظهر الفاعل القديم بعد by.",
        examples: [
          { en: "Visitors can use this entrance.", ar: "يمكن للزوار استخدام هذا المدخل." },
          { en: "This entrance can be used by visitors.", ar: "يمكن استخدام هذا المدخل بواسطة الزوار." },
        ],
      },
    ],
    pairs: [
      {
        active: "They can solve this problem.",
        activeAr: "يستطيعون حل هذه المشكلة.",
        passive: "This problem can be solved.",
        passiveAr: "يمكن حل هذه المشكلة.",
        why: "المفعول به this problem صار مبتدأ الجملة، وبقي can كما هو ثم be + solved.",
      },
      {
        active: "Workers can operate these machines.",
        activeAr: "يستطيع العمال تشغيل هذه الآلات.",
        passive: "These machines can be operated.",
        passiveAr: "يمكن تشغيل هذه الآلات.",
        why: "operate → operated؛ الأفعال المنتظمة تأخذ ed.",
      },
    ],
    negative: {
      formula: "cannot + be + V3 / can't + be + V3",
      examples: [
        { en: "This problem cannot be solved easily.", ar: "لا يمكن حل هذه المشكلة بسهولة." },
        { en: "The machine can't be used without electricity.", ar: "لا يمكن استخدام الآلة دون كهرباء." },
      ],
    },
    question: {
      formula: "Can + Subject + be + V3?",
      examples: [
        { en: "Can this computer be repaired?", ar: "هل يمكن إصلاح هذا الحاسوب؟" },
        { en: "Can these documents be copied?", ar: "هل يمكن نسخ هذه الوثائق؟" },
      ],
    },
  },
  {
    id: "could",
    n: 3,
    modal: "COULD",
    arName: "القدرة الماضية والاحتمال",
    formula: "could + be + V3",
    use: "نستخدم could للتعبير عن القدرة أو الإمكانية أو الاحتمال، بحسب السياق.",
    pairs: [
      {
        active: "They could finish the project.",
        activeAr: "كان بإمكانهم إنهاء المشروع.",
        passive: "The project could be finished.",
        passiveAr: "كان من الممكن إنهاء المشروع.",
      },
      {
        active: "Someone could repair the machine.",
        activeAr: "يمكن لشخص ما إصلاح الآلة.",
        passive: "The machine could be repaired.",
        passiveAr: "يمكن إصلاح الآلة.",
      },
      {
        active: "People could use this building for different purposes.",
        activeAr: "يمكن للناس استخدام هذا المبنى لأغراض مختلفة.",
        passive: "This building could be used for different purposes.",
        passiveAr: "يمكن استخدام هذا المبنى لأغراض مختلفة.",
      },
    ],
    negative: {
      formula: "could not + be + V3",
      examples: [
        { en: "The problem couldn't be solved.", ar: "لم يكن من الممكن حل المشكلة." },
        { en: "The door could not be opened.", ar: "لم يكن بالإمكان فتح الباب." },
      ],
    },
    question: {
      formula: "Could + Subject + be + V3?",
      examples: [
        { en: "Could the problem be solved?", ar: "هل كان من الممكن حل المشكلة؟" },
        { en: "Could this building be used as a library?", ar: "هل يمكن استخدام هذا المبنى كمكتبة؟" },
      ],
    },
    compare: {
      title: "الفرق بين CAN وCOULD",
      rows: [
        { en: "Can be repaired:", ar: "يمكن إصلاحه." },
        { en: "Could be repaired:", ar: "كان من الممكن إصلاحه، أو ربما يمكن إصلاحه في ظروف معينة." },
      ],
      note: "السياق هو الذي يحدّد المعنى الدقيق.",
    },
  },
  {
    id: "must",
    n: 4,
    modal: "MUST",
    arName: "الضرورة والإلزام",
    formula: "must + be + V3",
    use: "نستخدم must عندما نريد التعبير عن ضرورة قوية أو إلزام.",
    pairs: [
      {
        active: "Students must obey the rules.",
        activeAr: "يجب على الطلاب الالتزام بالقواعد.",
        passive: "The rules must be obeyed.",
        passiveAr: "يجب الالتزام بالقواعد.",
      },
      {
        active: "You must complete the form.",
        activeAr: "يجب عليك إكمال النموذج.",
        passive: "The form must be completed.",
        passiveAr: "يجب إكمال النموذج.",
      },
      {
        active: "People must protect the environment.",
        activeAr: "يجب على الناس حماية البيئة.",
        passive: "The environment must be protected.",
        passiveAr: "يجب حماية البيئة.",
      },
      {
        active: "The manager must sign these documents.",
        activeAr: "يجب على المدير توقيع هذه الوثائق.",
        passive: "These documents must be signed by the manager.",
        passiveAr: "يجب توقيع هذه الوثائق بواسطة المدير.",
        why: "ذُكر الفاعل الأصلي، فظهر بعد by؛ وحُذف من موضعه الأول.",
      },
    ],
    negative: {
      formula: "must not + be + V3 / mustn't + be + V3",
      note: "النفي هنا يعني المنع، لا مجرد عدم الضرورة.",
      examples: [
        { en: "The rules must not be ignored.", ar: "يجب ألّا يتم تجاهل القواعد." },
        { en: "This medicine mustn't be used without medical advice.", ar: "يجب عدم استخدام هذا الدواء دون استشارة طبية." },
      ],
    },
    question: {
      formula: "Must + Subject + be + V3?",
      examples: [
        { en: "Must the report be submitted today?", ar: "هل يجب تسليم التقرير اليوم؟" },
        { en: "Must these rules be followed?", ar: "هل يجب اتباع هذه القواعد؟" },
      ],
    },
    warning:
      "The door must be closed. = يجب أن يكون الباب مغلقًا. / The door must not be opened. = يجب عدم فتح الباب. الجملة الثانية تعبّر عن المنع، وليس مجرد عدم الضرورة.",
  },
  {
    id: "should",
    n: 5,
    modal: "SHOULD",
    arName: "النصيحة والتوصية",
    formula: "should + be + V3",
    use: "نستخدم should للتعبير عن النصيحة أو الشيء الذي من الأفضل القيام به.",
    pairs: [
      {
        active: "You should read this book.",
        activeAr: "ينبغي أن تقرأ هذا الكتاب.",
        passive: "This book should be read.",
        passiveAr: "ينبغي قراءة هذا الكتاب.",
      },
      {
        active: "The teacher should check the answers.",
        activeAr: "ينبغي للمعلم أن يفحص الإجابات.",
        passive: "The answers should be checked by the teacher.",
        passiveAr: "ينبغي فحص الإجابات بواسطة المعلم.",
      },
      {
        active: "People should recycle plastic.",
        activeAr: "ينبغي للناس إعادة تدوير البلاستيك.",
        passive: "Plastic should be recycled.",
        passiveAr: "ينبغي إعادة تدوير البلاستيك.",
      },
      {
        active: "You should repair the computer.",
        activeAr: "ينبغي أن تصلح الحاسوب.",
        passive: "The computer should be repaired.",
        passiveAr: "ينبغي إصلاح الحاسوب.",
      },
    ],
    negative: {
      formula: "should not + be + V3 / shouldn't + be + V3",
      examples: [
        { en: "The rules shouldn't be broken.", ar: "ينبغي ألّا تُخرق القواعد." },
        { en: "The information should not be shared.", ar: "ينبغي عدم مشاركة المعلومات." },
      ],
    },
    question: {
      formula: "Should + Subject + be + V3?",
      examples: [
        { en: "Should the room be cleaned today?", ar: "هل ينبغي تنظيف الغرفة اليوم؟" },
        { en: "Should these problems be discussed?", ar: "هل ينبغي مناقشة هذه المشكلات؟" },
      ],
    },
  },
  {
    id: "may-might",
    n: 6,
    modal: "MAY / MIGHT",
    arName: "الاحتمال",
    formula: "may + be + V3 / might + be + V3",
    use: "نستخدمهما للتعبير عن الاحتمال.",
    usages: [
      {
        label: "أمثلة مع MAY",
        note: "احتمال قائم، وقد يُستخدم may أيضًا للاستئذان الرسمي في السؤال.",
        examples: [
          { en: "The meeting may be cancelled.", ar: "قد يتم إلغاء الاجتماع." },
          { en: "The results may be announced tomorrow.", ar: "قد يتم الإعلان عن النتائج غدًا." },
          { en: "This medicine may be used for certain conditions.", ar: "قد يُستخدم هذا الدواء لحالات معينة." },
        ],
      },
      {
        label: "أمثلة مع MIGHT",
        note: "احتمال أضعف أو أكثر تحفظًا في كثير من السياقات.",
        examples: [
          { en: "The flight might be delayed.", ar: "قد تتأخر الرحلة." },
          {
            en: "The documents might be lost.",
            ar: "قد تكون الوثائق قد ضاعت، بحسب السياق.",
          },
          { en: "The problem might be solved soon.", ar: "قد تُحل المشكلة قريبًا." },
        ],
      },
    ],
    pairs: [],
    negative: {
      formula: "may not + be + V3 / might not + be + V3",
      examples: [
        { en: "The meeting may not be cancelled.", ar: "قد لا يتم إلغاء الاجتماع." },
        { en: "The results might not be announced today.", ar: "قد لا يتم الإعلان عن النتائج اليوم." },
      ],
    },
    question: {
      formula: "May + Subject + be + V3? / Might + Subject + be + V3?",
      examples: [
        { en: "May this room be used for the meeting?", ar: "هل يجوز استخدام هذه الغرفة للاجتماع؟" },
        { en: "Might the project be delayed?", ar: "هل من المحتمل أن يتأخر المشروع؟" },
      ],
    },
    compare: {
      title: "الفرق بين MAY وMIGHT",
      rows: [
        { en: "May be repaired:", ar: "قد يتم إصلاحه." },
        { en: "Might be repaired:", ar: "ربما يتم إصلاحه." },
      ],
      note:
        "كلاهما قد يعبّر عن الاحتمال، وفي كثير من السياقات يمكن استخدامهما بمعنى متقارب، لكن might قد يعطي إحساسًا باحتمال أكثر تحفظًا أو أقل تأكيدًا.",
    },
  },
];

// القسم الثاني: HAVE TO · OUGHT TO
export const OBLIGATION_59 = [
  {
    id: "have-to",
    n: 7,
    modal: "HAVE TO",
    arName: "يجب أن — التزام خارجي",
    formula: "have to / has to + be + V3",
    intro:
      "هذا التركيب مهم؛ لأن have to ليس فعلًا ناقصًا بسيطًا مثل can وmust، بل يحتاج إلى be في صيغة المصدر بعده.",
    pairs: [
      {
        active: "Students have to wear uniforms.",
        activeAr: "يجب على الطلاب ارتداء الزي المدرسي.",
        passive: "Uniforms have to be worn by students.",
        passiveAr: "يجب ارتداء الزي المدرسي بواسطة الطلاب.",
        why: "wear فعل شاذ: wear → worn.",
      },
      {
        active: "The worker has to repair the machine.",
        activeAr: "يجب على العامل إصلاح الآلة.",
        passive: "The machine has to be repaired by the worker.",
        passiveAr: "يجب إصلاح الآلة بواسطة العامل.",
        why: "المبتدأ الجديد machine مفرد، لذلك has to.",
      },
      {
        active: "They have to clean the building.",
        activeAr: "يجب عليهم تنظيف المبنى.",
        passive: "The building has to be cleaned.",
        passiveAr: "يجب تنظيف المبنى.",
        why: "building مفرد ⇒ has to، ثم be + cleaned.",
      },
    ],
    agreement: {
      title: "كيف نختار HAVE TO أو HAS TO؟",
      note: "نختار بحسب المبتدأ الجديد، لا بحسب الفاعل القديم.",
      rows: [
        { en: "The machine has to be repaired.", ar: "الآلة مفرد، لذلك has to." },
        { en: "The machines have to be repaired.", ar: "الآلات جمع، لذلك have to." },
      ],
    },
    negative: {
      formula: "don't / doesn't have to + be + V3",
      note: "انتبه: don't have to تعني عدم الضرورة، ولا تعني المنع.",
      examples: [
        { en: "The report doesn't have to be submitted today.", ar: "ليس من الضروري تسليم التقرير اليوم." },
        { en: "These documents don't have to be signed.", ar: "ليس من الضروري توقيع هذه الوثائق." },
      ],
    },
    question: {
      formula: "Do / Does + Subject + have to + be + V3?",
      examples: [
        { en: "Does the machine have to be repaired?", ar: "هل يجب إصلاح الآلة؟" },
        { en: "Do these forms have to be completed?", ar: "هل يجب إكمال هذه النماذج؟" },
      ],
    },
  },
  {
    id: "ought-to",
    n: 8,
    modal: "OUGHT TO",
    arName: "النصيحة والواجب الأخلاقي",
    formula: "ought to + be + V3",
    intro: "نستخدمه للتعبير عن النصيحة أو الواجب الأخلاقي، وهو قريب من should.",
    pairs: [
      {
        active: "People ought to respect the law.",
        activeAr: "ينبغي للناس احترام القانون.",
        passive: "The law ought to be respected.",
        passiveAr: "ينبغي احترام القانون.",
      },
      {
        active: "You ought to protect your personal information.",
        activeAr: "ينبغي أن تحمي معلوماتك الشخصية.",
        passive: "Your personal information ought to be protected.",
        passiveAr: "ينبغي حماية معلوماتك الشخصية.",
      },
      {
        active: "The school ought to improve its facilities.",
        activeAr: "ينبغي للمدرسة تحسين مرافقها.",
        passive: "The school's facilities ought to be improved.",
        passiveAr: "ينبغي تحسين مرافق المدرسة.",
      },
    ],
    negative: {
      formula: "ought not to + be + V3",
      examples: [{ en: "The rules ought not to be ignored.", ar: "ينبغي ألّا يتم تجاهل القواعد." }],
    },
    question: {
      formula: "Ought + Subject + to be + V3?",
      note:
        "هذا السؤال صحيح نحويًا، لكنه رسمي وأقل شيوعًا. الأكثر شيوعًا: Should the problem be discussed? = هل ينبغي مناقشة المشكلة؟",
      examples: [{ en: "Ought the problem to be discussed?", ar: "هل ينبغي مناقشة المشكلة؟" }],
    },
    warning:
      "لاحظ ترتيب السؤال: Ought + الفاعل + to be + V3. كلمة to تبقى بعد الفاعل، ولا تُحذف.",
  },
];

// القسم الثالث: Modal Perfect Passive
export const PERFECT_RULE_59 = {
  formula: "Modal + have been + V3",
  present: { form: "should be done", ar: "ينبغي أن يُنجز.", label: "Present or Future Passive" },
  past: { form: "should have been done", ar: "كان ينبغي أن يُنجز.", label: "Past Modal Passive" },
  why:
    "كلمة have تنقل التركيب إلى معنى متعلّق بالماضي، وكلمة been ضرورية لتكوين المبني للمجهول.",
  bridge:
    "في الدروس السابقة تعلّمنا أن Modal + be + V3 يُستخدم للحديث عن الإمكانية أو الضرورة أو النصيحة أو الاحتمال في الحاضر أو المستقبل. أما عندما نريد الحديث عن شيء كان من الممكن أن يحدث أو كان ينبغي أن يحدث أو ربما حدث في الماضي، فنستخدم Modal + have been + V3.",
};

export type PerfectLesson59 = {
  id: string;
  n: number;
  modal: string;
  formula: string;
  arName: string;
  use: string;
  pairs?: Pair59[];
  lines?: Line59[];
  negative: { formula: string; note?: string; examples: Line59[] };
  question?: { formula: string; note?: string; examples: Line59[] };
  contrast?: { title: string; rows: { en: string; ar: string; note?: string; tag?: string }[]; note?: string };
};

export const PERFECT_LESSONS_59: PerfectLesson59[] = [
  {
    id: "should-have-been",
    n: 10,
    modal: "SHOULD HAVE BEEN",
    formula: "should have been + V3",
    arName: "نصيحة أو توقّع عن الماضي",
    use: "نستخدمه للتعبير عن شيء كان ينبغي أن يحدث في الماضي، لكنه ربما لم يحدث.",
    pairs: [
      {
        active: "They should have repaired the road.",
        activeAr: "كان ينبغي عليهم إصلاح الطريق.",
        passive: "The road should have been repaired.",
        passiveAr: "كان ينبغي إصلاح الطريق.",
      },
      {
        active: "The manager should have signed the documents.",
        activeAr: "كان ينبغي للمدير أن يوقّع الوثائق.",
        passive: "The documents should have been signed by the manager.",
        passiveAr: "كان ينبغي توقيع الوثائق بواسطة المدير.",
      },
      {
        active: "You should have sent the email yesterday.",
        activeAr: "كان ينبغي أن ترسل البريد الإلكتروني أمس.",
        passive: "The email should have been sent yesterday.",
        passiveAr: "كان ينبغي إرسال البريد الإلكتروني أمس.",
      },
      {
        active: "They should have informed the students.",
        activeAr: "كان ينبغي عليهم إبلاغ الطلاب.",
        passive: "The students should have been informed.",
        passiveAr: "كان ينبغي إبلاغ الطلاب.",
      },
    ],
    negative: {
      formula: "should not have been + V3",
      examples: [
        { en: "The information shouldn't have been shared.", ar: "لم يكن ينبغي مشاركة المعلومات." },
        { en: "The door should not have been opened.", ar: "لم يكن ينبغي فتح الباب." },
      ],
    },
    question: {
      formula: "Should + Subject + have been + V3?",
      examples: [
        { en: "Should the report have been submitted yesterday?", ar: "هل كان ينبغي تسليم التقرير أمس؟" },
      ],
    },
    contrast: {
      title: "فرق مهم",
      rows: [
        { en: "The report should be submitted.", ar: "ينبغي تسليم التقرير.", note: "الحاضر أو المستقبل", tag: "NOW / FUTURE" },
        {
          en: "The report should have been submitted.",
          ar: "كان ينبغي أن يكون التقرير قد سُلّم.",
          note: "الماضي",
          tag: "PAST",
        },
      ],
    },
  },
  {
    id: "could-have-been",
    n: 11,
    modal: "COULD HAVE BEEN",
    formula: "could have been + V3",
    arName: "إمكانية ماضية لم تُستثمر",
    use: "نستخدمه للتعبير عن شيء كان من الممكن حدوثه في الماضي، لكنه لم يحدث بالضرورة.",
    pairs: [
      {
        active: "They could have repaired the machine.",
        activeAr: "كان بإمكانهم إصلاح الآلة.",
        passive: "The machine could have been repaired.",
        passiveAr: "كان من الممكن إصلاح الآلة.",
      },
      {
        active: "Someone could have prevented the accident.",
        activeAr: "كان بإمكان شخص ما منع الحادث.",
        passive: "The accident could have been prevented.",
        passiveAr: "كان من الممكن منع الحادث.",
      },
      {
        active: "They could have finished the work earlier.",
        activeAr: "كان بإمكانهم إنهاء العمل في وقت أبكر.",
        passive: "The work could have been finished earlier.",
        passiveAr: "كان من الممكن إنهاء العمل في وقت أبكر.",
      },
      {
        active: "The teacher could have explained the lesson differently.",
        activeAr: "كان بإمكان المعلم شرح الدرس بطريقة مختلفة.",
        passive: "The lesson could have been explained differently.",
        passiveAr: "كان من الممكن شرح الدرس بطريقة مختلفة.",
      },
    ],
    negative: {
      formula: "could not have been + V3",
      examples: [
        { en: "The accident couldn't have been prevented.", ar: "لم يكن من الممكن منع الحادث." },
        { en: "The problem could not have been solved without help.", ar: "لم يكن من الممكن حل المشكلة دون مساعدة." },
      ],
    },
    question: {
      formula: "Could + Subject + have been + V3?",
      examples: [
        { en: "Could the machine have been repaired?", ar: "هل كان من الممكن إصلاح الآلة؟" },
        { en: "Could the mistake have been avoided?", ar: "هل كان من الممكن تجنّب الخطأ؟" },
      ],
    },
  },
  {
    id: "must-have-been",
    n: 12,
    modal: "MUST HAVE BEEN",
    formula: "must have been + V3",
    arName: "استنتاج قوي عن الماضي",
    use:
      "نستخدم must have been عندما نستنتج بقوة أن شيئًا ما حدث في الماضي. أي أننا لسنا بالضرورة نعطي أمرًا، بل نستنتج أن الفعل وقع.",
    lines: [
      { en: "The documents must have been stolen.", ar: "لا بد أن الوثائق قد سُرقت." },
      { en: "The window must have been broken during the storm.", ar: "لا بد أن النافذة قد كُسرت أثناء العاصفة." },
      { en: "The email must have been sent yesterday.", ar: "لا بد أن البريد الإلكتروني أُرسل أمس." },
      { en: "The building must have been damaged by the earthquake.", ar: "لا بد أن المبنى تضرر بسبب الزلزال." },
    ],
    negative: {
      formula: "can't have been + V3 (الأكثر طبيعية)",
      note:
        "يمكن أن يُستخدم must not have been + V3 للاستنتاج المنفي في بعض السياقات، لكن في الإنجليزية الطبيعية كثيرًا ما نستخدم can't have been للتعبير عن استحالة وقوع الحدث.",
      examples: [
        { en: "The documents can't have been sent yesterday.", ar: "من المستحيل أن تكون الوثائق قد أُرسلت أمس." },
      ],
    },
    question: {
      formula: "Must + Subject + have been + V3?",
      note:
        "هذا السؤال صحيح، لكنه أقل شيوعًا من صياغات أخرى. والأكثر طبيعية: Do you think the documents must have been lost? = هل تعتقد أن الوثائق لا بد أنها ضاعت؟",
      examples: [{ en: "Must the documents have been lost?", ar: "هل لا بد أن الوثائق قد ضاعت؟" }],
    },
    contrast: {
      title: "الفرق بين MUST BE وMUST HAVE BEEN",
      rows: [
        {
          en: "The door must be locked.",
          ar: "يجب أن يكون الباب مقفلًا.",
          note: "ضرورة أو حالة مطلوبة الآن",
          tag: "OBLIGATION",
        },
        {
          en: "The door must have been locked.",
          ar: "لا بد أن الباب كان قد أُقفل.",
          note: "استنتاج أن الباب كان مقفلًا في الماضي",
          tag: "DEDUCTION",
        },
      ],
      note: "الأولى تعطي حكمًا/طلبًا، والثانية تعطي استنتاجًا. تغيير الصيغة يغيّر نوع المعنى بالكامل.",
    },
  },
  {
    id: "may-have-been",
    n: 13,
    modal: "MAY HAVE BEEN / MIGHT HAVE BEEN",
    formula: "may have been + V3 / might have been + V3",
    arName: "احتمال عن الماضي",
    use: "نستخدمهما للتعبير عن احتمال وقوع شيء في الماضي.",
    lines: [
      { en: "The meeting may have been cancelled.", ar: "ربما تم إلغاء الاجتماع." },
      { en: "The package might have been delivered yesterday.", ar: "ربما تم تسليم الطرد أمس." },
      { en: "The files may have been deleted accidentally.", ar: "ربما حُذفت الملفات عن طريق الخطأ." },
      { en: "The road might have been damaged by the rain.", ar: "ربما تضرر الطريق بسبب المطر." },
    ],
    negative: {
      formula: "may not have been + V3 / might not have been + V3",
      examples: [
        { en: "The message may not have been received.", ar: "ربما لم يتم استلام الرسالة." },
        { en: "The documents might not have been signed.", ar: "ربما لم يتم توقيع الوثائق." },
      ],
    },
    question: {
      formula: "May + Subject + have been + V3? / Might + Subject + have been + V3?",
      examples: [
        { en: "May the package have been delivered already?", ar: "هل من المحتمل أن يكون الطرد قد سُلّم بالفعل؟" },
        { en: "Might the files have been deleted?", ar: "هل من المحتمل أن الملفات قد حُذفت؟" },
      ],
    },
  },
];

// القسم الرابع: Advanced Structures
export type AdvancedLesson59 = {
  id: string;
  n: number;
  title: string;
  formula: string;
  arName: string;
  intro?: string;
  lines?: Line59[];
  pairs?: Pair59[];
  contrast?: { title: string; rows: { en: string; ar: string; note?: string; tag?: string }[]; note?: string };
  negative?: { formula: string; examples: Line59[] };
  question?: { formula: string; examples: Line59[] };
  note?: string;
};

export const ADVANCED_59: AdvancedLesson59[] = [
  {
    id: "needs-to-be",
    n: 14,
    title: "NEEDS TO BE + V3",
    formula: "need / needs to be + V3",
    arName: "شيء يحتاج إلى أن يُفعل",
    intro: "نستخدم هذا التركيب عندما نريد القول إن شيئًا يحتاج إلى أن يُفعل.",
    lines: [
      { en: "The car needs to be repaired.", ar: "السيارة تحتاج إلى أن تُصلح." },
      { en: "The room needs to be cleaned.", ar: "الغرفة تحتاج إلى أن تُنظف." },
      { en: "These documents need to be signed.", ar: "هذه الوثائق تحتاج إلى أن تُوقَّع." },
      { en: "The problem needs to be discussed.", ar: "المشكلة تحتاج إلى أن تُناقش." },
    ],
    contrast: {
      title: "الفرق بين NEEDS TO BE وNEEDS REPAIRING",
      rows: [
        {
          en: "The car needs to be repaired.",
          ar: "السيارة تحتاج إلى أن تُصلح.",
          note: "مبني للمجهول صريح: to be + V3",
          tag: "PASSIVE",
        },
        {
          en: "The car needs repairing.",
          ar: "السيارة تحتاج إلى إصلاح.",
          note: "صيغة gerund بعد need، والمعنى متقارب",
          tag: "GERUND",
        },
      ],
      note:
        "كلاهما صحيح، والمعنى متقارب. في هذا الدرس نركّز على الصيغة الأولى لأنها أوضح في تكوين المبني للمجهول.",
    },
    negative: {
      formula: "doesn't / don't need to be + V3",
      examples: [{ en: "The car doesn't need to be repaired.", ar: "السيارة لا تحتاج إلى أن تُصلح." }],
    },
    question: {
      formula: "Does / Do + Subject + need to be + V3?",
      examples: [{ en: "Does the car need to be repaired?", ar: "هل تحتاج السيارة إلى إصلاح؟" }],
    },
    note: "انتبه لمطابقة الفعل: مفرد ⇒ needs، جمع ⇒ need. ثم to be + V3 دائمًا.",
  },
  {
    id: "supposed-to-be",
    n: 15,
    title: "BE SUPPOSED TO BE + V3",
    formula: "am / is / are + supposed to be + V3",
    arName: "من المفترض / وفق ترتيب أو قاعدة",
    intro:
      "نستخدم هذا التركيب للتعبير عن شيء من المفترض أو المتوقع أو المطلوب أن يحدث وفق ترتيب أو قاعدة.",
    lines: [
      { en: "Students are supposed to be examined at the end of the course.", ar: "من المفترض أن يُختبر الطلاب في نهاية الدورة." },
      { en: "The report is supposed to be submitted today.", ar: "من المفترض أن يُسلَّم التقرير اليوم." },
      { en: "The building is supposed to be completed next year.", ar: "من المفترض أن يكتمل المبنى العام القادم." },
      { en: "These rules are supposed to be followed by everyone.", ar: "من المفترض أن يتبع الجميع هذه القواعد." },
    ],
    negative: {
      formula: "am / is / are + not + supposed to be + V3",
      examples: [{ en: "The report isn't supposed to be published today.", ar: "ليس من المفترض نشر التقرير اليوم." }],
    },
    question: {
      formula: "Is / Are + Subject + supposed to be + V3?",
      examples: [{ en: "Is the report supposed to be published today?", ar: "هل من المفترض نشر التقرير اليوم؟" }],
    },
    note: "الجزء المتغيّر هو am / is / are فقط؛ supposed to be + V3 يبقى ثابتًا.",
  },
  {
    id: "expected-to-be",
    n: 16,
    title: "BE EXPECTED TO BE + V3",
    formula: "am / is / are + expected to be + V3",
    arName: "من المتوقع حدوثه",
    intro: "نستخدم هذا التركيب عندما نتحدث عن شيء متوقع حدوثه.",
    lines: [
      { en: "The new hospital is expected to be opened next year.", ar: "من المتوقع افتتاح المستشفى الجديد العام القادم." },
      { en: "The results are expected to be announced tomorrow.", ar: "من المتوقع الإعلان عن النتائج غدًا." },
      { en: "The prices are expected to be reduced soon.", ar: "من المتوقع تخفيض الأسعار قريبًا." },
      { en: "The new system is expected to be introduced next month.", ar: "من المتوقع تطبيق النظام الجديد الشهر القادم." },
    ],
    contrast: {
      title: "الفرق بين WILL BE وIS EXPECTED TO BE",
      rows: [
        {
          en: "The hospital will be opened next year.",
          ar: "سيتم افتتاح المستشفى العام القادم.",
          note: "تأكيد مستقبلي مباشر",
          tag: "WILL BE",
        },
        {
          en: "The hospital is expected to be opened next year.",
          ar: "من المتوقع افتتاح المستشفى العام القادم.",
          note: "توقّع، لا تأكيد",
          tag: "EXPECTED",
        },
      ],
      note: "الجملة الثانية تركّز على التوقع، وليس على تأكيد حدوث الأمر.",
    },
  },
];

// 17 — Causative: have / get something done
export const CAUSATIVE_59 = {
  n: 17,
  title: "HAVE / GET SOMETHING DONE",
  formula: "Subject + have / get + object + V3",
  ar: "هذا تركيب مهم جدًا في اللغة الإنجليزية، ويُسمّى أحيانًا Causative. نستخدمه عندما نطلب من شخص آخر أن يقوم بعمل ما لنا، أو عندما نجعل خدمة معينة تُنفَّذ لنا.",
  lines: [
    { en: "I had my car repaired.", ar: "جعلت سيارتي تُصلح، أي أخذتها إلى شخص ليصلحها." },
    { en: "She had her hair cut.", ar: "قصّت شعرها لدى شخص آخر." },
    { en: "We are having our house painted.", ar: "نجعل منزلنا يُطلى حاليًا." },
    { en: "He will have his computer fixed.", ar: "سيجعل حاسوبه يُصلح." },
    { en: "They got their windows cleaned.", ar: "جعلوا نوافذهم تُنظف." },
  ],
  contrast: {
    title: "الفرق بين المبني للمجهول العادي وهذا التركيب",
    rows: [
      { en: "The car was repaired.", ar: "أُصلحت السيارة.", note: "لا نعرف من رتّب الإصلاح", tag: "PASSIVE" },
      {
        en: "I had the car repaired.",
        ar: "جعلت السيارة تُصلح، أي رتّبت لإصلاحها بواسطة شخص آخر.",
        note: "صاحب الجملة هو من رتّب الخدمة",
        tag: "CAUSATIVE",
      },
    ],
    note: "في الجملة الثانية نحن نركّز على أن صاحب الجملة رتّب تنفيذ الخدمة.",
  },
  extra: [
    { en: "I need to have my phone repaired.", ar: "أحتاج إلى إصلاح هاتفي لدى فني." },
    { en: "She is going to get her documents translated.", ar: "سوف تجعل وثائقها تُترجم." },
    { en: "We had the kitchen renovated last year.", ar: "جعلنا المطبخ يُجدَّد العام الماضي." },
  ] as Line59[],
  note: "الترتيب ثابت: have / get + المفعول به + V3. لا تضع to بين have والمفعول به.",
};

// 18 — جدول القواعد الأساسية (15 صفًا كما ورد في المصدر)
export const RULE_TABLE_59: { meaning: string; form: string; example: string }[] = [
  { meaning: "القدرة", form: "can be + V3", example: "It can be done." },
  { meaning: "إمكانية في الماضي أو احتمال", form: "could be + V3", example: "It could be repaired." },
  { meaning: "الضرورة", form: "must be + V3", example: "It must be finished." },
  { meaning: "النصيحة", form: "should be + V3", example: "It should be checked." },
  { meaning: "الاحتمال", form: "may be + V3", example: "It may be delayed." },
  { meaning: "احتمال أقل تأكيدًا", form: "might be + V3", example: "It might be cancelled." },
  { meaning: "الواجب", form: "have to be + V3", example: "It has to be done." },
  { meaning: "النصيحة", form: "ought to be + V3", example: "It ought to be changed." },
  { meaning: "نصيحة عن الماضي", form: "should have been + V3", example: "It should have been done." },
  { meaning: "إمكانية في الماضي", form: "could have been + V3", example: "It could have been repaired." },
  { meaning: "استنتاج عن الماضي", form: "must have been + V3", example: "It must have been stolen." },
  { meaning: "احتمال في الماضي", form: "may have been + V3", example: "It may have been lost." },
  { meaning: "حاجة إلى إجراء", form: "needs to be + V3", example: "It needs to be cleaned." },
  { meaning: "شيء متوقع أو مفترض", form: "is supposed to be + V3", example: "It is supposed to be done." },
  { meaning: "شيء متوقع حدوثه", form: "is expected to be + V3", example: "It is expected to be completed." },
];

// 19 — The report ... (7 فروق متتالية على الجملة نفسها)
export const REPORT_LADDER_59 = [
  { en: "The report must be completed.", ar: "يجب إكمال التقرير.", label: "ضرورة", tone: "obligation" },
  { en: "The report should be completed.", ar: "ينبغي إكمال التقرير.", label: "نصيحة أو توصية", tone: "advice" },
  { en: "The report can be completed.", ar: "يمكن إكمال التقرير.", label: "إمكانية", tone: "ability" },
  { en: "The report may be completed.", ar: "قد يتم إكمال التقرير.", label: "احتمال", tone: "possibility" },
  {
    en: "The report should have been completed.",
    ar: "كان ينبغي أن يكون التقرير قد أُكمل.",
    label: "نصيحة أو توقع يتعلّق بالماضي",
    tone: "past-advice",
  },
  {
    en: "The report must have been completed.",
    ar: "لا بد أن التقرير قد أُكمل.",
    label: "استنتاج قوي عن الماضي",
    tone: "deduction",
  },
  {
    en: "The report might have been completed.",
    ar: "ربما تم إكمال التقرير.",
    label: "احتمال متعلّق بالماضي",
    tone: "past-possibility",
  },
] as const;

// 20 — خطوات التحويل المتقدم
export const TRANSFORM_STEPS_59 = [
  "حدّد الفاعل.",
  "حدّد الفعل الناقص.",
  "حدّد الفعل الأساسي.",
  "حدّد المفعول به.",
  "انقل المفعول به إلى بداية الجملة.",
  "احتفظ بالفعل الناقص كما هو.",
  "أضف be أو have been بحسب التركيب.",
  "استخدم التصريف الثالث V3 للفعل الأساسي.",
];

export const TRANSFORM_DEMOS_59 = [
  {
    id: "can",
    active: "The teacher can explain the lesson.",
    activeAr: "المعلم يستطيع شرح الدرس.",
    subject: "The teacher",
    modal: "can",
    base: "explain",
    object: "the lesson",
    stages: [
      { label: "نبدأ بالمفعول به", value: "The lesson …" },
      { label: "نضيف can", value: "The lesson can …" },
      { label: "نضيف be", value: "The lesson can be …" },
      { label: "نضيف V3 من explain", value: "The lesson can be explained by the teacher." },
    ],
    passive: "The lesson can be explained by the teacher.",
    passiveAr: "يمكن شرح الدرس بواسطة المعلم.",
    why: "explain فعل منتظم ⇒ explained. can يبقى كما هو، ثم be بلا تغيير.",
  },
  {
    id: "should-have",
    active: "They should have repaired the road.",
    activeAr: "كان ينبغي عليهم إصلاح الطريق.",
    subject: "They",
    modal: "should",
    base: "repair",
    object: "the road",
    stages: [
      { label: "المفعول به يصبح المبتدأ", value: "The road …" },
      { label: "نثبّت should", value: "The road should …" },
      { label: "التركيب الماضي: have been", value: "The road should have been …" },
      { label: "V3 من repair", value: "The road should have been repaired." },
    ],
    passive: "The road should have been repaired.",
    passiveAr: "كان ينبغي إصلاح الطريق.",
    why: "وجود should عن الماضي يفرض have been، لا be فقط.",
  },
  {
    id: "must-have",
    active: "Someone must have stolen the money.",
    activeAr: "لا بد أن شخصًا ما قد سرق المال.",
    subject: "Someone",
    modal: "must",
    base: "steal",
    object: "the money",
    stages: [
      { label: "المفعول به يصبح المبتدأ", value: "The money …" },
      { label: "نثبّت must", value: "The money must …" },
      { label: "استنتاج عن الماضي: have been", value: "The money must have been …" },
      { label: "V3 من steal", value: "The money must have been stolen." },
    ],
    passive: "The money must have been stolen.",
    passiveAr: "لا بد أن المال قد سُرق.",
    why: "steal فعل شاذ: steal → stole → stolen. الفاعل المجهول Someone يُحذف عادةً.",
  },
];

// 21–27 — الأخطاء السبعة
export const ERRORS_59 = [
  {
    n: 21,
    title: "استخدام is بعد Modal",
    wrong: "The work can is completed.",
    right: "The work can be completed.",
    why: "بعد can نستخدم be مباشرة.",
    tag: "BE",
  },
  {
    n: 22,
    title: "نسيان be",
    wrong: "The rules must followed.",
    right: "The rules must be followed.",
    why: "نحتاج إلى be بين must وV3.",
    tag: "BE",
  },
  {
    n: 23,
    title: "استخدام المصدر بدل التصريف الثالث",
    wrong: "The car should be repair.",
    right: "The car should be repaired.",
    why: "بعد be في المبني للمجهول نستخدم V3.",
    tag: "V3",
  },
  {
    n: 24,
    title: "نسيان been في الماضي",
    wrong: "The report should have completed.",
    right: "The report should have been completed.",
    why: "صيغة Modal Perfect Passive هي: Modal + have been + V3.",
    tag: "HAVE BEEN",
  },
  {
    n: 25,
    title: "الخلط بين MUST BE وMUST HAVE BEEN",
    wrong: "The door must be locked. (يقصد: لا بد أنه أُقفل)",
    right: "The door must have been locked.",
    why: "الأولى تعبّر عن ضرورة أو حالة مطلوبة، والثانية استنتاج عن الماضي.",
    tag: "MEANING",
  },
  {
    n: 26,
    title: "الخلط بين DON'T HAVE TO وMUSTN'T",
    wrong: "The report mustn't be submitted today. (يقصد: ليس ضروريًا)",
    right: "The report doesn't have to be submitted today.",
    why: "الأولى تعني عدم وجود ضرورة، والثانية تعني المنع. استخدام mustn't هنا يقلب المعنى.",
    tag: "MEANING",
  },
  {
    n: 27,
    title: "الخلط بين SHOULD BE وSHOULD HAVE BEEN",
    wrong: "The problem should be solved. (يقصد: كان ينبغي حلّها)",
    right: "The problem should have been solved.",
    why: "الأولى تتعلّق بالحاضر أو المستقبل، والثانية تتعلّق بالماضي.",
    tag: "TIME",
  },
];

// 28 — الحوار
export const DIALOGUE_59 = [
  { who: "Manager", en: "Has the report been completed?", ar: "هل تم إكمال التقرير؟" },
  { who: "Assistant", en: "Not yet. It still needs to be checked.", ar: "ليس بعد. ما زال يحتاج إلى المراجعة." },
  { who: "Manager", en: "It should be submitted by tomorrow.", ar: "ينبغي تسليمه بحلول الغد." },
  { who: "Assistant", en: "Can the missing information be added today?", ar: "هل يمكن إضافة المعلومات الناقصة اليوم؟" },
  { who: "Manager", en: "Yes, but all the figures must be checked first.", ar: "نعم، ولكن يجب التحقق من جميع الأرقام أولًا." },
  { who: "Assistant", en: "Some documents might have been lost.", ar: "ربما فُقدت بعض الوثائق." },
  { who: "Manager", en: "They must have been moved to another office.", ar: "لا بد أنها نُقلت إلى مكتب آخر." },
  { who: "Assistant", en: "Should the final version be printed today?", ar: "هل ينبغي طباعة النسخة النهائية اليوم؟" },
  { who: "Manager", en: "Yes. It is expected to be presented at tomorrow's meeting.", ar: "نعم. من المتوقع عرضها في اجتماع الغد." },
];

export const DIALOGUE_QA_59 = [
  { q: "Has the report been completed?", a: "No, it hasn't been completed yet.", ar: "لا، لم يتم إكماله بعد." },
  { q: "What does the report still need?", a: "It needs to be checked.", ar: "يحتاج إلى المراجعة." },
  { q: "When should the report be submitted?", a: "It should be submitted by tomorrow.", ar: "ينبغي تسليمه بحلول الغد." },
  { q: "What must be checked first?", a: "All the figures must be checked first.", ar: "يجب التحقق من جميع الأرقام أولًا." },
  { q: "What might have happened to some documents?", a: "They might have been lost.", ar: "ربما فُقدت." },
  { q: "Where must the documents have been moved?", a: "They must have been moved to another office.", ar: "لا بد أنها نُقلت إلى مكتب آخر." },
  {
    q: "When is the final version expected to be presented?",
    a: "It is expected to be presented at tomorrow's meeting.",
    ar: "من المتوقع عرضها في اجتماع الغد.",
  },
];

// 29 — قطعة القراءة
export const READING_59 = {
  title: "Modern Technology and Safety",
  titleAr: "التكنولوجيا الحديثة والسلامة",
  paragraphs: [
    "Modern technology is used in many areas of life. Computers can be used to control machines, and important information must be protected from unauthorized access.",
    "In large factories, safety rules should be followed by all workers. Dangerous machines must be checked regularly, and damaged equipment needs to be repaired immediately.",
    "Sometimes, mistakes could have been prevented if the instructions had been followed carefully. Important warnings should never be ignored.",
    "New safety systems are expected to be introduced in many factories next year. These systems may be controlled automatically, and possible problems can be detected before serious damage occurs.",
    "In the past, many accidents might have been caused by old equipment. Today, better systems can be installed to reduce these risks.",
  ],
  translation: [
    "تُستخدم التكنولوجيا الحديثة في مجالات كثيرة من الحياة. ويمكن استخدام الحواسيب للتحكم في الآلات، ويجب حماية المعلومات المهمة من الوصول غير المصرّح به.",
    "في المصانع الكبيرة، ينبغي أن يتبع جميع العمال قواعد السلامة. ويجب فحص الآلات الخطيرة بانتظام، كما تحتاج المعدات التالفة إلى الإصلاح فورًا.",
    "في بعض الأحيان، كان من الممكن منع الأخطاء لو تم اتباع التعليمات بعناية. ويجب ألا يتم تجاهل التحذيرات المهمة مطلقًا.",
    "من المتوقع إدخال أنظمة سلامة جديدة في كثير من المصانع العام القادم. وقد يتم التحكم في هذه الأنظمة تلقائيًا، ويمكن اكتشاف المشكلات المحتملة قبل حدوث أضرار خطيرة.",
    "في الماضي، ربما تسببت المعدات القديمة في كثير من الحوادث. أما اليوم، فيمكن تركيب أنظمة أفضل لتقليل هذه المخاطر.",
  ],
  gloss: [
    { en: "unauthorized access", ar: "الوصول غير المصرّح به" },
    { en: "damaged equipment", ar: "المعدات التالفة" },
    { en: "detected", ar: "اكتشاف / رصد" },
    { en: "occur", ar: "يحدث / يقع" },
  ],
  qa: [
    { q: "What can computers be used for?", a: "They can be used to control machines.", ar: "يمكن استخدامها للتحكم في الآلات." },
    { q: "What must be protected?", a: "Important information must be protected.", ar: "يجب حماية المعلومات المهمة." },
    { q: "Who should follow safety rules?", a: "All workers should follow safety rules.", ar: "ينبغي لجميع العمال اتباع قواعد السلامة." },
    {
      q: "What needs to be repaired immediately?",
      a: "Damaged equipment needs to be repaired immediately.",
      ar: "تحتاج المعدات التالفة إلى الإصلاح فورًا.",
    },
    {
      q: "How could some mistakes have been prevented?",
      a: "They could have been prevented if the instructions had been followed carefully.",
      ar: "كان من الممكن منعها لو تم اتباع التعليمات بعناية.",
    },
    {
      q: "When are new safety systems expected to be introduced?",
      a: "They are expected to be introduced next year.",
      ar: "من المتوقع إدخالها العام القادم.",
    },
    {
      q: "What can be detected before serious damage occurs?",
      a: "Possible problems can be detected.",
      ar: "يمكن اكتشاف المشكلات المحتملة.",
    },
    {
      q: "What might have caused many accidents in the past?",
      a: "Old equipment might have caused many accidents.",
      ar: "ربما تسببت المعدات القديمة في كثير من الحوادث.",
    },
  ],
};

// 31 — مهمة الكتابة
export const WRITING_59 = {
  title: "Rules for a Safe School",
  titleAr: "قواعد المدرسة الآمنة",
  instruction:
    "اكتب فقرة باللغة الإنجليزية من 10 إلى 12 جملة بعنوان Rules for a Safe School — قواعد المدرسة الآمنة، واستخدم فيها التراكيب الستة التالية.",
  structures: ["must be + V3", "should be + V3", "can be + V3", "must not be + V3", "needs to be + V3", "should have been + V3"],
  model: [
    "The school must be kept clean.",
    "All classrooms should be checked every morning.",
    "Dangerous objects must not be brought into the school.",
    "Students should be treated fairly.",
    "School equipment can be used by all students.",
    "Broken desks need to be repaired immediately.",
    "Safety instructions must be followed by everyone.",
    "The school gates should be closed after classes.",
    "Some old machines should have been replaced last year.",
    "The school environment must be protected.",
  ],
  modelAr: [
    "يجب الحفاظ على نظافة المدرسة.",
    "ينبغي فحص جميع الفصول كل صباح.",
    "يجب عدم إحضار الأشياء الخطيرة إلى المدرسة.",
    "ينبغي معاملة الطلاب بعدل.",
    "يمكن لجميع الطلاب استخدام معدات المدرسة.",
    "تحتاج المقاعد المكسورة إلى الإصلاح فورًا.",
    "يجب على الجميع اتباع تعليمات السلامة.",
    "ينبغي إغلاق بوابات المدرسة بعد انتهاء الدروس.",
    "كان ينبغي استبدال بعض الآلات القديمة العام الماضي.",
    "يجب حماية البيئة المدرسية.",
  ],
};

// 32 — مهمة التحدث
export const SPEAKING_59 = {
  intro:
    "تخيّل أنك مسؤول عن إدارة مصنع، وعليك أن تشرح للعمال قواعد السلامة. استخدم الجمل التالية وتدرّب على نطقها، ثم كوّن خمس جمل جديدة من عندك مستخدمًا أفعالًا ناقصة مختلفة.",
  lines: [
    { en: "All machines must be checked regularly.", ar: "يجب فحص جميع الآلات بانتظام." },
    { en: "Safety instructions must be followed.", ar: "يجب اتباع تعليمات السلامة." },
    { en: "Damaged equipment should be repaired immediately.", ar: "ينبغي إصلاح المعدات التالفة فورًا." },
    { en: "Dangerous areas must not be entered without permission.", ar: "يجب عدم دخول المناطق الخطيرة دون إذن." },
    { en: "Protective equipment should be worn by all workers.", ar: "ينبغي أن يرتدي جميع العمال معدات الوقاية." },
    { en: "New safety systems are expected to be installed soon.", ar: "من المتوقع تركيب أنظمة سلامة جديدة قريبًا." },
    { en: "Some accidents could have been prevented.", ar: "كان من الممكن منع بعض الحوادث." },
  ],
  task: "حاول بعد ذلك تكوين خمس جمل جديدة من عندك، مستخدمًا أفعالًا ناقصة مختلفة.",
};

// 33 — الملخص النهائي
export const SUMMARY_59 = {
  present: ["can + be + V3", "could + be + V3", "must + be + V3", "should + be + V3", "may + be + V3", "might + be + V3", "have to + be + V3", "ought to + be + V3"],
  past: ["should have been + V3", "could have been + V3", "must have been + V3", "may have been + V3", "might have been + V3"],
  advanced: ["needs to be + V3", "is supposed to be + V3", "is expected to be + V3", "have / get + object + V3"],
  differences: [
    { en: "must be done", ar: "يجب أن يُنجز." },
    { en: "must have been done", ar: "لا بد أنه أُنجز." },
    { en: "should be done", ar: "ينبغي أن يُنجز." },
    { en: "should have been done", ar: "كان ينبغي أن يُنجز." },
    { en: "can be done", ar: "يمكن إنجازه." },
    { en: "could have been done", ar: "كان من الممكن إنجازه." },
    { en: "may be done", ar: "قد يُنجز." },
    { en: "may have been done", ar: "ربما تم إنجازه." },
  ],
  golden: {
    present: "Modal + be + V3",
    past: "Modal + have been + V3",
    last: "لا تنسَ أن الفعل الأساسي يبقى دائمًا في التصريف الثالث.",
  },
};

// ------------------------------------------------------------
// المصطلحات التي تُعرَّض في مختبر المعنى (V3 الشاذة والمطابقة)
// ------------------------------------------------------------
export const V3_LEDGER_59: { base: string; v3: string; note?: string }[] = [
  { base: "repair", v3: "repaired" },
  { base: "complete", v3: "completed" },
  { base: "check", v3: "checked" },
  { base: "use", v3: "used" },
  { base: "need", v3: "needed" },
  { base: "solve", v3: "solved" },
  { base: "cancel", v3: "cancelled" },
  { base: "announce", v3: "announced" },
  { base: "sign", v3: "signed" },
  { base: "follow", v3: "followed" },
  { base: "improve", v3: "improved" },
  { base: "obey", v3: "obeyed" },
  { base: "respect", v3: "respected" },
  { base: "protect", v3: "protected" },
  { base: "recycle", v3: "recycled" },
  { base: "operate", v3: "operated" },
  { base: "open", v3: "opened" },
  { base: "print", v3: "printed" },
  { base: "add", v3: "added" },
  { base: "provide", v3: "provided" },
  { base: "send", v3: "sent", note: "شاذ" },
  { base: "steal", v3: "stolen", note: "شاذ" },
  { base: "break", v3: "broken", note: "شاذ" },
  { base: "wear", v3: "worn", note: "شاذ" },
  { base: "write", v3: "written", note: "شاذ" },
  { base: "make", v3: "made", note: "شاذ" },
  { base: "build", v3: "built", note: "شاذ" },
  { base: "cut", v3: "cut", note: "شاذ — لا يتغيّر" },
  { base: "buy", v3: "bought", note: "شاذ" },
];
