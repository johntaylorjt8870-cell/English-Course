// ============================================================
// Lesson 62 — Reporting Verbs: أفعال نقل الكلام المتقدمة
// المحتوى الكامل للمصدر المورّد: 21 قسمًا
// لا حذف ولا اختصار: كل قاعدة، كل جدول، كل مثال، كل ترجمة
// محفوظة كما وردت، مع تدقيق لغوي موثق في docs/lesson62-content-review.md
// ============================================================

export type Line62 = { en: string; ar: string };
export type ShiftPair62 = { direct: string; directAr: string; reported: string; reportedAr: string; note?: string };
export type ChangeKind62 = "verb" | "tense" | "pronoun" | "time" | "place" | "modal" | "form" | "prep";
export type Change62 = { from: string; to: string; kind: ChangeKind62; note?: string };

// ------------------------------------------------------------
// القسم الأول: المقدمة — من said/told/asked إلى Reporting Verbs
// ------------------------------------------------------------

export const OPENING62 = {
  bridge:
    `في الدرسين السابقين تعلمنا كيفية نقل الكلام من خلال:
- الدرس 60: نقل الجمل الخبرية (Reported Statements).
- الدرس 61: نقل الأسئلة والأوامر والطلبات (Reported Questions & Commands).
في هذا الدرس سننتقل إلى مستوى أكثر تقدمًا، وهو استخدام Reporting Verbs، أي أفعال نقل الكلام.`,
  daily:
    `بدلًا من الاعتماد دائمًا على: said = قال، told = أخبر، asked = سأل. سنستخدم أفعالًا أكثر دقة تصف طبيعة الكلام والموقف الذي حدث. مثلًا، هناك فرق بين شخص يعترف بخطئه، وشخص ينكر ارتكابه، وشخص يعد بفعل شيء، وشخص يرفض تنفيذ طلب.`,
  compare: [
    { direct: "He said that he had taken the money.", ar: "قال إنه أخذ المال.", note: "نقل محايد" },
    { direct: "He admitted taking the money.", ar: "اعترف بأنه أخذ المال.", note: "اعتراف" },
    { direct: "He denied taking the money.", ar: "أنكر أنه أخذ المال.", note: "إنكار" },
  ] as ShiftPair62[],
  goals: [
    "تعلم اختيار فعل النقل المناسب لكل موقف.",
    "معرفة التركيب الصحيح الذي يأتي بعد كل فعل.",
    "التمييز بين الأفعال المتشابهة في المعنى المختلفة في التركيب.",
    "تطبيق الأفعال في حوارات وقراءات وتدريبات واقعية.",
  ],
};

// ------------------------------------------------------------
// القسم الثاني: تعريف Reporting Verbs وقائمة الأفعال العشرين
// ------------------------------------------------------------

export const DEFINITION62 = {
  title: "ما المقصود بـ Reporting Verbs؟",
  definition: "Reporting Verbs هي الأفعال التي نستخدمها لنقل كلام شخص آخر، أو وصف ما قاله أو فعله بالكلام.",
  verbs: [
    { n: 1, en: "admit", ar: "يعترف" },
    { n: 2, en: "deny", ar: "ينكر" },
    { n: 3, en: "suggest", ar: "يقترح" },
    { n: 4, en: "recommend", ar: "يوصي / ينصح" },
    { n: 5, en: "promise", ar: "يعد" },
    { n: 6, en: "refuse", ar: "يرفض" },
    { n: 7, en: "offer", ar: "يعرض / يبادر إلى تقديم شيء" },
    { n: 8, en: "agree", ar: "يوافق" },
    { n: 9, en: "apologize", ar: "يعتذر" },
    { n: 10, en: "accuse", ar: "يتهم" },
    { n: 11, en: "warn", ar: "يحذر" },
    { n: 12, en: "remind", ar: "يذكر" },
    { n: 13, en: "encourage", ar: "يشجع" },
    { n: 14, en: "persuade", ar: "يقنع" },
    { n: 15, en: "insist", ar: "يصر" },
    { n: 16, en: "complain", ar: "يشتكي" },
    { n: 17, en: "explain", ar: "يشرح" },
    { n: 18, en: "announce", ar: "يعلن" },
    { n: 19, en: "claim", ar: "يدعي" },
    { n: 20, en: "threaten", ar: "يهدد" },
  ] as { n: number; en: string; ar: string }[],
  why: [
    { situation: "شخص اعترف بخطئه", said: "He said that he had made a mistake.", reported: "He admitted that he had made a mistake.", ar: "اعترف بأنه ارتكب خطأ." },
    { situation: "شخص أنكر التهمة", said: "He said that he didn't steal the money.", reported: "He denied that he had stolen the money.", ar: "أنكر أنه سرق المال." },
    { situation: "شخص وعد بالمساعدة", said: `He said, "I will help you."`, reported: "He promised to help me.", ar: "وعد بمساعدتي." },
    { situation: "شخص رفض المساعدة", said: `He said, "I won't help you."`, reported: "He refused to help me.", ar: "رفض مساعدتي." },
    { situation: "شخص حذرنا من الخطر", said: `She said, "Don't go outside."`, reported: "She warned us not to go outside.", ar: "حذرتنا من الخروج." },
  ],
};

// ------------------------------------------------------------
// القسم الثالث: التراكيب الستة الأساسية
// ------------------------------------------------------------

export const STRUCTURES62 = {
  intro: "قبل أن ندرس الأفعال واحدًا واحدًا، يجب أن نفهم التركيبات الأساسية. هناك ستة تراكيب مهمة سنستخدمها باستمرار.",
  structures: [
    {
      n: 1,
      name: "Verb + that + sentence",
      pattern: "فعل نقل الكلام + that + جملة كاملة",
      example: { en: "He admitted that he was wrong.", ar: "اعترف بأنه كان مخطئًا." },
      verbs: ["admit", "deny", "explain", "claim", "announce", "complain", "insist"],
      note: "يمكن أن نحذف that في بعض هذه التراكيب دون أن يتغير المعنى: He admitted he was wrong. لكن الاحتفاظ بـ that يساعد على وضوح الجملة، خصوصًا في الجمل الطويلة.",
    },
    {
      n: 2,
      name: "Verb + V-ing",
      pattern: "فعل نقل الكلام + الفعل المنتهي بـ ing",
      example: { en: "He admitted stealing the money.", ar: "اعترف بسرقة المال." },
      verbs: ["admit", "deny", "suggest", "recommend", "mention", "consider"],
      note: "لا نستخدم here to قبل stealing. مثال: She suggested going home. (اقترحت الذهاب إلى المنزل.)",
    },
    {
      n: 3,
      name: "Verb + to + infinitive",
      pattern: "فعل نقل الكلام + to + الفعل الأساسي",
      example: { en: "He promised to help me.", ar: "وعد بمساعدتي." },
      verbs: ["promise", "refuse", "offer", "agree", "decide", "threaten", "hope"],
      note: "مثال: She refused to answer. (رفضت الإجابة.)",
    },
    {
      n: 4,
      name: "Verb + object + to + infinitive",
      pattern: "فعل نقل الكلام + شخص + to + الفعل الأساسي",
      example: { en: "He advised me to study harder.", ar: "نصحني بالدراسة بجدية أكبر." },
      verbs: ["advise", "encourage", "persuade", "remind", "warn", "invite", "tell", "ask", "order"],
      note: "مثال: She encouraged him to continue. (شجعته على الاستمرار.)",
    },
    {
      n: 5,
      name: "Verb + object + that + sentence",
      pattern: "فعل نقل الكلام + الشخص الذي وُجّه إليه الكلام + that + جملة",
      example: { en: "She assured me that everything was fine.", ar: "طمأنتني بأن كل شيء كان على ما يرام." },
      verbs: ["assure", "inform", "convince"],
      note: "مثال: He informed us that the meeting had been cancelled. (أبلغنا بأن الاجتماع قد أُلغي.)",
    },
    {
      n: 6,
      name: "Verb + preposition + V-ing",
      pattern: "بعض أفعال نقل الكلام تحتاج إلى حرف جر قبل الفعل المنتهي بـ ing",
      examples: [
        { en: "He apologized for being late.", ar: "اعتذر عن التأخر.", pattern: "apologized + for + being" },
        { en: "She accused him of lying.", ar: "اتهمته بالكذب.", pattern: "accused + him + of + lying" },
      ],
      note: "وهذا التركيب مهم جدًا؛ لأن تغيير حرف الجر قد يؤدي إلى خطأ نحوي.",
    },
  ],
};

// ------------------------------------------------------------
// القسم الرابع: Admit و Deny
// ------------------------------------------------------------

export const ADMIT_DENY62 = {
  admit: {
    title: "Admit = يعترف",
    intro: "نستخدم admit عندما يعترف شخص بأنه فعل شيئًا، أو يعترف بأن معلومة معينة صحيحة. له تركيبان أساسيان.",
    struct1: {
      name: "Admit + V-ing",
      direct: `He said, "I broke the window."`,
      directAr: "قال: «أنا كسرت النافذة».",
      reported: "He admitted breaking the window.",
      reportedAr: "اعترف بكسر النافذة.",
      note: "بكسر = breaking. لا نقول: He admitted to break the window. لأن التركيب المطلوب هو: admit + V-ing",
    },
    struct2: {
      name: "Admit + that + sentence",
      example: { en: "He admitted that he had broken the window.", ar: "اعترف بأنه كسر النافذة." },
      note: "استخدمنا: that + he had broken — أي جملة كاملة.",
    },
    examples: [
      { en: "She admitted making a mistake.", ar: "اعترفت بارتكاب خطأ." },
      { en: "The boy admitted that he had lied.", ar: "اعترف الصبي بأنه كذب." },
      { en: "They admitted taking the documents.", ar: "اعترفوا بأخذ المستندات." },
      { en: "He admitted that he was responsible for the problem.", ar: "اعترف بأنه كان مسؤولًا عن المشكلة." },
    ],
  },
  deny: {
    title: "Deny = ينكر",
    intro: "نستخدم deny عندما ينكر شخص أنه فعل شيئًا، أو يرفض الاعتراف بصحة اتهام.",
    struct1: {
      name: "Deny + V-ing",
      direct: `He said, "I didn't steal the money."`,
      reported: "He denied stealing the money.",
      ar: "أنكر سرقة المال.",
    },
    struct2: {
      name: "Deny + that + sentence",
      example: { en: "He denied that he had stolen the money.", ar: "أنكر أنه سرق المال." },
    },
    examples: [
      { en: "She denied breaking the vase.", ar: "أنكرت كسر المزهرية." },
      { en: "He denied that he knew the answer.", ar: "أنكر أنه كان يعرف الإجابة." },
      { en: "The student denied cheating in the exam.", ar: "أنكر الطالب الغش في الامتحان." },
      { en: "They denied having any responsibility for the accident.", ar: "أنكروا أن تكون عليهم أي مسؤولية عن الحادث." },
    ],
    note: "يمكن أن نستخدم Having + V3 للتأكيد على أن الفعل حدث قبل الإنكار. مثل: He denied having taken the money. (أنكر أنه كان قد أخذ المال.)",
  },
  comparison: [
    { verb: "Admit", meaning: "اعتراف", example: "He admitted breaking the window.", ar: "اعترف بكسر النافذة." },
    { verb: "Deny", meaning: "إنكار", example: "He denied breaking the window.", ar: "أنكر كسر النافذة." },
  ],
};

// ------------------------------------------------------------
// القسم الخامس: Suggest و Recommend
// ------------------------------------------------------------

export const SUGGEST_RECOMMEND62 = {
  suggest: {
    title: "Suggest = يقترح",
    intro: "نستخدم suggest عندما يقدم شخص فكرة أو حلًا أو خطة.",
    struct1: {
      name: "Suggest + V-ing",
      examples: [
        { en: "She suggested going to the library.", ar: "اقترحت الذهاب إلى المكتبة." },
        { en: "He suggested studying together.", ar: "اقترح الدراسة معًا." },
        { en: "They suggested taking a taxi.", ar: "اقترحوا ركوب سيارة أجرة." },
      ],
    },
    struct2: {
      name: "Suggest + that + subject + should + verb",
      examples: [
        { en: "She suggested that we should go to the library.", ar: "اقترحت أن نذهب إلى المكتبة." },
        { en: "He suggested that I should study harder.", ar: "اقترح أن أدرس بجدية أكبر." },
      ],
      note: "يمكن حذف should في بعض التراكيب، خصوصًا في الإنجليزية الأمريكية: She suggested that we go to the library.",
    },
    struct3: {
      name: "Suggest + noun",
      examples: [
        { en: "He suggested a different plan.", ar: "اقترح خطة مختلفة." },
        { en: "She suggested a new idea.", ar: "اقترحت فكرة جديدة." },
      ],
    },
    error: {
      wrong: `She suggested me to study.`,
      note: "هذه صيغة غير صحيحة في الإنجليزية القياسية.",
      correct: ["She suggested studying.", "She suggested that I should study.", "She advised me to study."],
    },
  },
  recommend: {
    title: "Recommend = يوصي / ينصح",
    intro: "نستخدم recommend عندما يقدم شخص توصية أو ينصح باختيار شيء أو القيام بعمل معين.",
    struct1: {
      name: "Recommend + V-ing",
      examples: [
        { en: "The doctor recommended drinking more water.", ar: "أوصى الطبيب بشرب المزيد من الماء." },
        { en: "I recommend reading this book.", ar: "أوصي بقراءة هذا الكتاب." },
      ],
    },
    struct2: {
      name: "Recommend + that + subject + should + verb",
      examples: [
        { en: "The teacher recommended that we should revise the lesson.", ar: "أوصى المعلم بأن نراجع الدرس." },
        { en: "The doctor recommended that he should rest.", ar: "أوصى الطبيب بأن يستريح." },
      ],
      note: "يمكن أيضًا حذف should: The doctor recommended that he rest.",
    },
    struct3: {
      name: "Recommend + noun",
      examples: [
        { en: "I recommend this restaurant.", ar: "أوصي بهذا المطعم." },
        { en: "She recommended a good book.", ar: "أوصت بكتاب جيد." },
      ],
    },
    struct4: {
      name: "Recommend + object + to + person",
      example: { en: "I recommended this book to my friend.", ar: "أوصيت صديقي بهذا الكتاب." },
      note: "لاحظ الفرق: I recommended reading this book (أوصيت بقراءة) vs I recommended this book to my friend (أوصيت صديقي بهذا).",
    },
  },
  comparison: {
    suggest: { en: "He suggested visiting the museum.", ar: "اقترح زيارة المتحف.", meaning: "طرح الفكرة" },
    recommend: { en: "He recommended visiting the museum.", ar: "أوصى بزيارة المتحف.", meaning: "يرى أن الزيارة خيار جيد وينصح بها" },
  },
};

// ------------------------------------------------------------
// القسم السادس: Promise, Refuse, Offer
// ------------------------------------------------------------

export const PROMISE_REFUSE_OFFER62 = {
  promise: {
    title: "Promise = يعد",
    intro: "نستخدم promise عندما يتعهد شخص بفعل شيء في المستقبل.",
    struct1: {
      name: "Promise + to + infinitive",
      examples: [
        { en: "He promised to help me.", ar: "وعد بمساعدتي." },
        { en: "She promised to call her mother.", ar: "وعدت بالاتصال بأمها." },
        { en: "They promised to arrive early.", ar: "وعدوا بالوصول مبكرًا." },
      ],
    },
    struct2: {
      name: "Promise + that + sentence",
      examples: [
        { en: "He promised that he would help me.", ar: "وعد بأنه سيساعدني." },
        { en: "She promised that she would return soon.", ar: "وعدت بأنها ستعود قريبًا." },
      ],
      note: "لاحظ أن will يمكن أن تصبح would في الكلام المنقول.",
    },
    struct3: {
      name: "Promise + object + that",
      examples: [
        { en: "He promised me that he would be careful.", ar: "وعدني بأنه سيكون حذرًا." },
        { en: "She promised her parents that she would study hard.", ar: "وعدت والديها بأنها ستدرس بجد." },
      ],
    },
  },
  refuse: {
    title: "Refuse = يرفض",
    intro: "نستخدم refuse عندما يرفض شخص القيام بشيء أو قبول عرض.",
    struct1: {
      name: "Refuse + to + infinitive",
      examples: [
        { en: "He refused to answer the question.", ar: "رفض الإجابة عن السؤال." },
        { en: "She refused to help him.", ar: "رفضت مساعدته." },
        { en: "They refused to leave the building.", ar: "رفضوا مغادرة المبنى." },
      ],
    },
    reported: [
      { direct: `He said, "I won't apologize."`, reported: "He refused to apologize.", ar: "رفض الاعتذار." },
      { direct: `She said, "I won't give you my phone."`, reported: "She refused to give me her phone.", ar: "رفضت أن تعطيني هاتفها." },
    ],
  },
  offer: {
    title: "Offer = يعرض / يبادر إلى تقديم شيء",
    intro: "نستخدم offer عندما يعرض شخص المساعدة أو يقدم شيئًا طواعيةً.",
    struct1: {
      name: "Offer + to + infinitive",
      examples: [
        { en: "He offered to help me.", ar: "عرض مساعدتي." },
        { en: "She offered to carry the bags.", ar: "عرضت حمل الحقائب." },
        { en: "They offered to pay for dinner.", ar: "عرضوا دفع ثمن العشاء." },
      ],
    },
    struct2: {
      name: "Offer + object + noun",
      examples: [
        { en: "He offered me a cup of tea.", ar: "عرض عليّ كوبًا من الشاي." },
        { en: "She offered him some advice.", ar: "قدمت له بعض النصائح." },
      ],
    },
    comprehensive: {
      direct: `Tom said, "I'll help you with your homework."`,
      reported: "Tom offered to help me with my homework.",
      ar: "عرض توم مساعدتي في واجبي المنزلي.",
    },
  },
  comparison: [
    { verb: "Promise", en: "He promised to help me.", ar: "وعد بمساعدتي.", meaning: "تعهّد بفعل شيء" },
    { verb: "Offer", en: "He offered to help me.", ar: "عرض مساعدتي.", meaning: "عرض القيام بشيء" },
    { verb: "Refuse", en: "He refused to help me.", ar: "رفض مساعدتي.", meaning: "رفض القيام بشيء" },
  ],
};

// ------------------------------------------------------------
// القسم السابع: Agree, Decide, Threaten
// ------------------------------------------------------------

export const AGREE_DECIDE_THREATEN62 = {
  agree: {
    title: "Agree = يوافق",
    intro: "نستخدم agree عندما يوافق شخص على اقتراح أو قرار أو تنفيذ عمل.",
    structs: [
      { name: "Agree + to + infinitive", examples: [{ en: "He agreed to help us.", ar: "وافق على مساعدتنا." }, { en: "She agreed to join the team.", ar: "وافقت على الانضمام إلى الفريق." }] },
      { name: "Agree + that + sentence", examples: [{ en: "They agreed that the plan was useful.", ar: "اتفقوا على أن الخطة كانت مفيدة." }] },
      { name: "Agree + with + person", examples: [{ en: "I agree with you.", ar: "أنا أتفق معك." }] },
      { name: "Agree + on/about + topic", examples: [{ en: "We agreed on the date.", ar: "اتفقنا على الموعد." }, { en: "They agreed about the main problem.", ar: "اتفقوا بشأن المشكلة الرئيسية." }] },
    ],
  },
  decide: {
    title: "Decide = يقرر",
    intro: "نستخدم decide عندما يتخذ شخص قرارًا.",
    structs: [
      { name: "Decide + to + infinitive", examples: [{ en: "She decided to study medicine.", ar: "قررت دراسة الطب." }, { en: "He decided to leave early.", ar: "قرر المغادرة مبكرًا." }] },
      { name: "Decide + that + sentence", examples: [{ en: "They decided that they would travel the following week.", ar: "قرروا أنهم سيسافرون في الأسبوع التالي." }] },
      { name: "Decide + on + noun", examples: [{ en: "We decided on a new plan.", ar: "قررنا اختيار خطة جديدة." }] },
    ],
  },
  threaten: {
    title: "Threaten = يهدد",
    intro: "نستخدم threaten عندما يهدد شخص بفعل شيء سيئ أو ضار، أو يهدد بتنفيذ إجراء معين.",
    structs: [
      { name: "Threaten + to + infinitive", examples: [{ en: "He threatened to call the police.", ar: "هدد بالاتصال بالشرطة." }, { en: "She threatened to leave.", ar: "هددت بالمغادرة." }, { en: "The company threatened to cancel the contract.", ar: "هددت الشركة بإلغاء العقد." }] },
      { name: "Threaten + that + sentence", examples: [{ en: "He threatened that he would report the problem.", ar: "هدد بأنه سيبلغ عن المشكلة." }] },
    ],
    note: "غالبًا ما يأتي threaten في سياقات التهديد، بينما promise يأتي في سياقات التعهد الإيجابي أو الالتزام.",
  },
};

// ------------------------------------------------------------
// القسم الثامن: Advise, Encourage, Persuade
// ------------------------------------------------------------

export const ADVISE_ENCOURAGE_PERSUADE62 = {
  advise: {
    title: "Advise = ينصح",
    intro: "نستخدم advise عندما يقدم شخص نصيحة لشخص آخر.",
    struct1: {
      name: "Advise + object + to + infinitive",
      examples: [
        { en: "The doctor advised me to rest.", ar: "نصحني الطبيب بالراحة." },
        { en: "My teacher advised me to practise every day.", ar: "نصحني معلمي بالتدرب كل يوم." },
      ],
    },
    negative: {
      name: "Advise + object + not to + infinitive",
      examples: [
        { en: "The doctor advised him not to smoke.", ar: "نصحه الطبيب بألا يدخن." },
        { en: "My father advised me not to spend too much money.", ar: "نصحني أبي بألا أنفق الكثير من المال." },
      ],
    },
    struct2: {
      name: "Advise + V-ing",
      example: { en: "The doctor advised resting for a few days.", ar: "نصح الطبيب بالراحة لبضعة أيام." },
      note: "لاحظ الفرق: He advised me to rest (نصحني بالراحة) vs He advised resting (نصح بالراحة).",
    },
  },
  encourage: {
    title: "Encourage = يشجع",
    intro: "نستخدم encourage عندما يحاول شخص دفع شخص آخر إلى القيام بشيء إيجابي، أو يمنحه الثقة للاستمرار.",
    struct1: {
      name: "Encourage + object + to + infinitive",
      examples: [
        { en: "My parents encouraged me to study English.", ar: "شجعني والداي على دراسة الإنجليزية." },
        { en: "The teacher encouraged the students to ask questions.", ar: "شجع المعلم الطلاب على طرح الأسئلة." },
        { en: "The coach encouraged his team to keep trying.", ar: "شجع المدرب فريقه على مواصلة المحاولة." },
      ],
    },
  },
  persuade: {
    title: "Persuade = يقنع",
    intro: "نستخدم persuade عندما ينجح شخص في إقناع شخص آخر بفعل شيء.",
    struct1: {
      name: "Persuade + object + to + infinitive",
      examples: [
        { en: "She persuaded me to join the club.", ar: "أقنعتني بالانضمام إلى النادي." },
        { en: "He persuaded his father to buy a new computer.", ar: "أقنع والده بشراء حاسوب جديد." },
        { en: "They persuaded us to stay longer.", ar: "أقنعونا بالبقاء مدة أطول." },
      ],
    },
  },
  comparison: [
    { verb: "Advise", en: "My teacher advised me to study.", ar: "نصحني معلمي بالدراسة." },
    { verb: "Encourage", en: "My teacher encouraged me to study.", ar: "شجعني معلمي على الدراسة." },
    { verb: "Persuade", en: "My teacher persuaded me to study.", ar: "أقنعني معلمي بالدراسة." },
  ],
};

// ------------------------------------------------------------
// القسم التاسع: Warn, Remind, Invite
// ------------------------------------------------------------

export const WARN_REMIND_INVITE62 = {
  warn: {
    title: "Warn = يحذر",
    intro: "نستخدم warn عندما نحذر شخصًا من خطر أو من فعل شيء قد يسبب مشكلة.",
    struct1: {
      name: "Warn + object + not to + infinitive",
      examples: [
        { en: "The teacher warned us not to cheat.", ar: "حذرنا المعلم من الغش." },
        { en: "The police warned the driver not to speed.", ar: "حذرت الشرطة السائق من تجاوز السرعة." },
      ],
    },
    struct2: {
      name: "Warn + object + about + noun",
      examples: [
        { en: "She warned me about the danger.", ar: "حذرتني من الخطر." },
        { en: "The guide warned us about the storm.", ar: "حذرنا المرشد من العاصفة." },
      ],
    },
    struct3: {
      name: "Warn + object + that + sentence",
      examples: [{ en: "He warned us that the road was dangerous.", ar: "حذرنا من أن الطريق كان خطيرًا." }],
    },
  },
  remind: {
    title: "Remind = يذكر",
    intro: "نستخدم remind عندما نذكر شخصًا بشيء قد ينساه.",
    struct1: {
      name: "Remind + object + to + infinitive",
      examples: [
        { en: "She reminded me to call my mother.", ar: "ذكرتني بالاتصال بأمي." },
        { en: "The teacher reminded us to bring our books.", ar: "ذكرنا المعلم بإحضار كتبنا." },
      ],
    },
    struct2: {
      name: "Remind + object + not to + infinitive",
      examples: [{ en: "He reminded me not to forget the meeting.", ar: "ذكرني بألا أنسى الاجتماع." }],
    },
    struct3: {
      name: "Remind + object + that + sentence",
      examples: [{ en: "She reminded me that the meeting started at nine.", ar: "ذكرتني بأن الاجتماع يبدأ في التاسعة." }],
    },
    struct4: {
      name: "Remind + object + of + noun",
      examples: [{ en: "This song reminds me of my childhood.", ar: "تذكرني هذه الأغنية بطفولتي." }],
    },
  },
  invite: {
    title: "Invite = يدعو",
    intro: "نستخدم invite عندما يدعو شخص شخصًا آخر إلى مناسبة أو مكان أو نشاط.",
    struct1: {
      name: "Invite + object + to + infinitive",
      examples: [
        { en: "She invited me to join the party.", ar: "دعتني إلى الانضمام إلى الحفل." },
        { en: "He invited us to visit his house.", ar: "دعانا لزيارة منزله." },
      ],
    },
    struct2: {
      name: "Invite + object + to + noun",
      examples: [
        { en: "They invited me to the wedding.", ar: "دعوني إلى حفل الزفاف." },
        { en: "She invited her friends to dinner.", ar: "دعت أصدقاءها إلى العشاء." },
      ],
    },
  },
};

// ------------------------------------------------------------
// القسم العاشر: Apologize, Accuse, Complain
// ------------------------------------------------------------

export const APOLOGIZE_ACCUSE_COMPLAIN62 = {
  apologize: {
    title: "Apologize = يعتذر",
    intro: "نستخدم apologize عندما يعبر شخص عن أسفه بسبب خطأ أو تصرف.",
    struct1: {
      name: "Apologize + for + V-ing",
      examples: [
        { en: "He apologized for arriving late.", ar: "اعتذر عن الوصول متأخرًا." },
        { en: "She apologized for forgetting my birthday.", ar: "اعتذرت عن نسيان عيد ميلادي." },
      ],
      note: "بعد for نستخدم V-ing إذا جاء بعدها فعل.",
    },
    struct2: {
      name: "Apologize + to + person + for + V-ing",
      examples: [
        { en: "He apologized to me for breaking the glass.", ar: "اعتذر لي عن كسر الزجاج." },
        { en: "She apologized to her teacher for missing the lesson.", ar: "اعتذرت لمعلمتها عن تفويت الدرس." },
      ],
    },
    reported: {
      direct: `He said, "I'm sorry I broke your phone."`,
      reported: "He apologized for breaking my phone.",
      ar: "اعتذر عن كسر هاتفي.",
    },
  },
  accuse: {
    title: "Accuse = يتهم",
    intro: "نستخدم accuse عندما يتهم شخص شخصًا آخر بارتكاب خطأ أو فعل سيئ.",
    struct: {
      name: "Accuse + object + of + V-ing",
      examples: [
        { en: "She accused him of lying.", ar: "اتهمته بالكذب." },
        { en: "The teacher accused the student of cheating.", ar: "اتهم المعلم الطالب بالغش." },
        { en: "They accused the company of breaking the agreement.", ar: "اتهموا الشركة بخرق الاتفاق." },
      ],
      note: "انتبه إلى حرف الجر: accuse someone of doing something. لا نقول: accuse someone for doing something.",
    },
    reported: {
      direct: `She said to him, "You stole my bag."`,
      reported: "She accused him of stealing her bag.",
      ar: "اتهمته بسرقة حقيبتها.",
    },
  },
  complain: {
    title: "Complain = يشتكي",
    intro: "نستخدم complain عندما يعبر شخص عن عدم رضاه عن شيء.",
    struct1: {
      name: "Complain + that + sentence",
      examples: [
        { en: "He complained that the room was too cold.", ar: "اشتكى من أن الغرفة كانت شديدة البرودة." },
        { en: "She complained that the service was slow.", ar: "اشتكت من أن الخدمة كانت بطيئة." },
      ],
    },
    struct2: {
      name: "Complain + about + noun",
      examples: [
        { en: "They complained about the noise.", ar: "اشتكوا من الضوضاء." },
        { en: "He complained about the food.", ar: "اشتكى من الطعام." },
      ],
    },
    struct3: {
      name: "Complain + to + person + about + noun",
      examples: [{ en: "She complained to the manager about the service.", ar: "اشتكت إلى المدير من الخدمة." }],
    },
  },
};

// ------------------------------------------------------------
// القسم الحادي عشر: Explain, Announce, Claim
// ------------------------------------------------------------

export const EXPLAIN_ANNOUNCE_CLAIM62 = {
  explain: {
    title: "Explain = يشرح",
    intro: "نستخدم explain عندما يوضح شخص شيئًا أو يشرح سببًا أو طريقة.",
    struct1: {
      name: "Explain + that + sentence",
      examples: [
        { en: "The teacher explained that the answer was incorrect.", ar: "شرح المعلم أن الإجابة كانت غير صحيحة." },
        { en: "He explained that he had missed the bus.", ar: "شرح أنه فاته الحافلة." },
      ],
    },
    struct2: {
      name: "Explain + something + to + someone",
      examples: [
        { en: "She explained the problem to me.", ar: "شرحت لي المشكلة." },
        { en: "The teacher explained the rule to the students.", ar: "شرح المعلم القاعدة للطلاب." },
      ],
      note: "انتبه: لا تقل عادةً: He explained me the problem. الصحيح: He explained the problem to me.",
    },
  },
  announce: {
    title: "Announce = يعلن",
    intro: "نستخدم announce عندما يعلن شخص خبرًا أو قرارًا أو معلومة مهمة.",
    struct: {
      name: "Announce + that + sentence",
      examples: [
        { en: "The principal announced that the school would close early.", ar: "أعلن المدير أن المدرسة ستغلق مبكرًا." },
        { en: "The company announced that it had opened a new office.", ar: "أعلنت الشركة أنها افتتحت مكتبًا جديدًا." },
      ],
    },
    noun: {
      name: "Announce + noun",
      example: { en: "The school announced the results.", ar: "أعلنت المدرسة النتائج." },
    },
  },
  claim: {
    title: "Claim = يدّعي",
    intro: "نستخدم claim عندما يقول شخص إن شيئًا ما صحيح، خصوصًا عندما لا يكون مؤكدًا أو عندما يحتاج إلى إثبات.",
    struct1: {
      name: "Claim + that + sentence",
      examples: [
        { en: "He claimed that he had seen the accident.", ar: "ادعى أنه شاهد الحادث." },
        { en: "She claimed that she knew the answer.", ar: "ادعت أنها تعرف الإجابة." },
      ],
    },
    struct2: {
      name: "Claim + to + infinitive",
      examples: [
        { en: "He claims to know the truth.", ar: "يدعي أنه يعرف الحقيقة." },
        { en: "She claimed to have seen the thief.", ar: "ادعت أنها شاهدت اللص." },
      ],
      note: "to have seen = أن يكون قد شاهد. استخدمنا هذا التركيب للتعبير عن فعل سابق بالنسبة إلى فعل الادعاء.",
    },
  },
};

// ------------------------------------------------------------
// القسم الثاني عشر: Insist و Convince
// ------------------------------------------------------------

export const INSIST_CONVINCE62 = {
  insist: {
    title: "Insist = يصر",
    intro: "نستخدم insist عندما يتمسك شخص برأيه أو يصر على موقف أو طلب.",
    struct1: {
      name: "Insist + on + V-ing",
      examples: [
        { en: "He insisted on paying for dinner.", ar: "أصر على دفع ثمن العشاء." },
        { en: "She insisted on coming with us.", ar: "أصرت على المجيء معنا." },
      ],
    },
    struct2: {
      name: "Insist + that + sentence",
      examples: [
        { en: "He insisted that he was innocent.", ar: "أصر على أنه بريء." },
        { en: "She insisted that the answer was correct.", ar: "أصرت على أن الإجابة صحيحة." },
      ],
      note: "قد يأتي insist that مع صيغة الفعل الأساسية في سياقات معينة، خصوصًا عند الإصرار على أن يقوم شخص بعمل ما: He insisted that I stay. (أصر على أن أبقى.)",
    },
  },
  convince: {
    title: "Convince = يقنع",
    intro: "نستخدم convince عندما يجعل شخص شخصًا آخر يصدق شيئًا أو يقتنع بفكرة.",
    struct1: {
      name: "Convince + object + that + sentence",
      examples: [
        { en: "She convinced me that the plan was safe.", ar: "أقنعتني بأن الخطة آمنة." },
        { en: "He convinced his parents that he was responsible.", ar: "أقنع والديه بأنه شخص مسؤول." },
      ],
    },
    struct2: {
      name: "Convince + object + to + infinitive",
      examples: [
        { en: "She convinced me to join the team.", ar: "أقنعتني بالانضمام إلى الفريق." },
        { en: "He convinced his friend to apologize.", ar: "أقنع صديقه بالاعتذار." },
      ],
    },
  },
  comparison: {
    persuade: { pattern: "Persuade someone to do something", ar: "إقناع شخص بأن يفعل شيئًا" },
    convince: { pattern: "Convince someone that something is true", ar: "إقناع شخص بأن شيئًا ما صحيح" },
    overlap: [
      { en: "She persuaded me to leave.", ar: "أقنعتني بالمغادرة." },
      { en: "She convinced me to leave.", ar: "أقنعتني بالمغادرة." },
    ],
  },
};

// ------------------------------------------------------------
// القسم الثالث عشر: مقارنة التراكيب النحوية (الجدول الشامل)
// ------------------------------------------------------------

export const STRUCTURE_TABLE62 = {
  title: "مقارنة التراكيب النحوية — أهم ما تعلمناه",
  intro: "هذا القسم مهم جدًا؛ لأنه يجمع أهم ما تعلمناه في الدرس.",
  rows: [
    { verb: "admit", structure: "V-ing", example: "admitted lying", ar: "اعترف بالكذب" },
    { verb: "deny", structure: "V-ing", example: "denied stealing", ar: "أنكر السرقة" },
    { verb: "suggest", structure: "V-ing", example: "suggested leaving", ar: "اقترح المغادرة" },
    { verb: "recommend", structure: "V-ing", example: "recommended reading", ar: "أوصى بقراءة" },
    { verb: "promise", structure: "to + verb", example: "promised to help", ar: "وعد بالمساعدة" },
    { verb: "refuse", structure: "to + verb", example: "refused to answer", ar: "رفض الإجابة" },
    { verb: "offer", structure: "to + verb", example: "offered to help", ar: "عرض المساعدة" },
    { verb: "agree", structure: "to + verb", example: "agreed to join", ar: "وافق على الانضمام" },
    { verb: "advise", structure: "object + to", example: "advised me to rest", ar: "نصحني بالراحة" },
    { verb: "encourage", structure: "object + to", example: "encouraged me to try", ar: "شجعني على المحاولة" },
    { verb: "persuade", structure: "object + to", example: "persuaded him to stay", ar: "أقنعته بالبقاء" },
    { verb: "remind", structure: "object + to", example: "reminded me to call", ar: "ذكرني بالاتصال" },
    { verb: "warn", structure: "object + not to", example: "warned me not to go", ar: "حذرني من الذهاب" },
    { verb: "apologize", structure: "for + V-ing", example: "apologized for shouting", ar: "اعتذر عن الصراخ" },
    { verb: "accuse", structure: "object + of + V-ing", example: "accused him of lying", ar: "اتهمه بالكذب" },
    { verb: "insist", structure: "on + V-ing", example: "insisted on paying", ar: "أصر على الدفع" },
    { verb: "complain", structure: "about + noun", example: "complained about the noise", ar: "اشتكى من الضوضاء" },
  ],
  advice: "لا تحاول حفظ الجدول كله دفعة واحدة. الأفضل أن تحفظ الأفعال في مجموعات حسب التركيب، ثم تتدرب على استعمالها داخل الجمل.",
};

// ------------------------------------------------------------
// القسم الرابع عشر: التحويل من الكلام المباشر إلى Reporting Verbs
// ------------------------------------------------------------

export const CONVERSION62 = {
  title: "التحويل من الكلام المباشر إلى Reporting Verbs",
  intro: "سنطبق الآن طريقة عملية لتحويل الكلام المباشر إلى جملة تحتوي على فعل نقل أكثر دقة.",
  steps: [
    "نفهم معنى الكلام: هل هو اعتراف، وعد، رفض، اتهام، نصيحة...؟",
    "نختار Reporting Verb الأنسب.",
    "نستخدم التركيب الصحيح الذي يأتي بعد هذا الفعل.",
  ],
  examples: [
    {
      n: 1,
      title: "الاعتراف",
      direct: `He said, "I broke the computer."`,
      directAr: "قال: «أنا كسرت الحاسوب».",
      step1: "نفهم معنى الكلام: هو يعترف بفعل شيء.",
      step2: "نختار admit.",
      step3: "نستخدم admit + V-ing.",
      result: "He admitted breaking the computer.",
      resultAr: "اعترف بكسر الحاسوب.",
    },
    {
      n: 2,
      title: "الوعد",
      direct: `She said, "I will help you."`,
      step1: "نفهم أنها تتعهد بالمساعدة.",
      step2: "نختار promise.",
      step3: "نستخدم promise + to + infinitive.",
      result: "She promised to help me.",
      resultAr: "وعدت بمساعدتي.",
      alt: "She promised that she would help me.",
    },
    {
      n: 3,
      title: "الرفض",
      direct: `He said, "I won't answer the question."`,
      step1: "نفهم أنه يرفض الإجابة.",
      step2: "نختار refuse.",
      step3: "نستخدم refuse + to + infinitive.",
      result: "He refused to answer the question.",
      resultAr: "رفض الإجابة عن السؤال.",
    },
    {
      n: 4,
      title: "الاتهام",
      direct: `She said to him, "You lied to me."`,
      step1: "نفهم أنها تتهمه بالكذب.",
      step2: "نختار accuse.",
      step3: "نستخدم accuse + object + of + V-ing.",
      result: "She accused him of lying to her.",
      resultAr: "اتهمته بالكذب عليها.",
    },
    {
      n: 5,
      title: "النصيحة",
      direct: `The doctor said to me, "You should rest."`,
      step1: "نفهم أن الطبيب يقدم نصيحة.",
      step2: "نختار advise.",
      step3: "نستخدم advise + object + to + infinitive.",
      result: "The doctor advised me to rest.",
      resultAr: "نصحني الطبيب بالراحة.",
    },
  ],
};

// ------------------------------------------------------------
// القسم الخامس عشر: الأخطاء الشائعة العشرة وتصحيحها
// ------------------------------------------------------------

export const ERRORS62 = [
  {
    n: 1,
    title: "الخطأ الأول: admit + to + infinitive",
    wrong: "He admitted to steal the money.",
    right: "He admitted stealing the money.",
    why: "admit + V-ing. ملاحظة: admitted to breaking قد تكون صحيحة أيضًا في الإنجليزية، لأن to هنا حرف جر وليس علامة infinitive. لكن التركيب الذي نركز عليه في هذا الدرس هو admit + V-ing.",
  },
  {
    n: 2,
    title: "الخطأ الثاني: suggest + object + to",
    wrong: "She suggested me to go.",
    right: "She suggested going.",
    alt: "She suggested that I should go.",
    why: "suggest لا يتبع التركيب suggested + person + to في الإنجليزية القياسية.",
  },
  {
    n: 3,
    title: "الخطأ الثالث: promise + V-ing",
    wrong: "He promised helping me.",
    right: "He promised to help me.",
    why: "promise + to + infinitive.",
  },
  {
    n: 4,
    title: "الخطأ الرابع: refuse + V-ing",
    wrong: "She refused answering.",
    right: "She refused to answer.",
    why: "refuse + to + infinitive.",
  },
  {
    n: 5,
    title: "الخطأ الخامس: accuse + for",
    wrong: "He accused me for lying.",
    right: "He accused me of lying.",
    why: "accuse + object + of + V-ing.",
  },
  {
    n: 6,
    title: "الخطأ السادس: apologize + object + for",
    wrong: "She apologized me for being late.",
    right: "She apologized to me for being late.",
    why: "apologize to someone for something.",
  },
  {
    n: 7,
    title: "الخطأ السابع: explain + object (بدون to)",
    wrong: "He explained me the situation.",
    right: "He explained the situation to me.",
    why: "explain something to someone.",
  },
  {
    n: 8,
    title: "الخطأ الثامن: advise + to + object",
    wrong: "The teacher advised to me study harder.",
    right: "The teacher advised me to study harder.",
    why: "advise + object + to + infinitive.",
  },
  {
    n: 9,
    title: "الخطأ التاسع: remind + object + don't",
    wrong: "She reminded me don't forget the meeting.",
    right: "She reminded me not to forget the meeting.",
    why: "remind + object + not to + infinitive.",
  },
  {
    n: 10,
    title: "الخطأ العاشر: insist + to + infinitive",
    wrong: "He insisted to pay for dinner.",
    right: "He insisted on paying for dinner.",
    why: "insist on + V-ing.",
  },
];

// ------------------------------------------------------------
// القسم السادس عشر: حوار تطبيقي — A Problem at School
// ------------------------------------------------------------

export const DIALOGUE62 = {
  title: "A Problem at School — مشكلة في المدرسة",
  direct: [
    { who: "Teacher", en: "Adam, did you break the classroom window?", ar: "آدم، هل كسرت نافذة الفصل؟" },
    { who: "Adam", en: "Yes, I did. I am sorry. I didn't mean to do it.", ar: "نعم، فعلت ذلك. أنا آسف. لم أقصد فعل ذلك." },
    { who: "Teacher", en: "Why did you throw the ball inside the classroom?", ar: "لماذا رميت الكرة داخل الفصل؟" },
    { who: "Adam", en: "I thought it was safe.", ar: "اعتقدت أن ذلك آمن." },
    { who: "Teacher", en: "You must be more careful. I warned you not to play near the windows.", ar: "يجب أن تكون أكثر حذرًا. لقد حذرتك من اللعب بالقرب من النوافذ." },
    { who: "Adam", en: "I know. I promise I will be more careful.", ar: "أعرف ذلك. أعد بأن أكون أكثر حذرًا." },
    { who: "Teacher", en: "You should apologize to the school manager.", ar: "ينبغي أن تعتذر لمدير المدرسة." },
    { who: "Adam", en: "I agree. I will speak to him.", ar: "أوافق. سأتحدث معه." },
    { who: "Teacher", en: "Good. Don't repeat this mistake.", ar: "جيد. لا تكرر هذا الخطأ." },
  ],
  reported: [
    { en: "The teacher asked Adam whether he had broken the classroom window.", ar: "سأل المعلم آدم عما إذا كان قد كسر نافذة الفصل." },
    { en: "Adam admitted breaking it and apologized for doing so.", ar: "اعترف آدم بكسرها واعتذر عن ذلك." },
    { en: "He explained that he had not meant to do it.", ar: "وأوضح أنه لم يكن يقصد فعل ذلك." },
    { en: "The teacher asked why he had thrown the ball inside the classroom.", ar: "سأل المعلم لماذا رمى الكرة داخل الفصل." },
    { en: "Adam explained that he had thought it was safe.", ar: "وأوضح آدم أنه اعتقد أن ذلك آمن." },
    { en: "The teacher reminded him to be more careful and warned him not to play near the windows.", ar: "ذكّره المعلم بأن يكون أكثر حذرًا وحذّره من اللعب بالقرب من النوافذ." },
    { en: "Adam promised to be more careful.", ar: "وعد آدم بأن يكون أكثر حذرًا." },
    { en: "The teacher advised him to apologize to the school manager.", ar: "نصحه المعلم بأن يعتذر لمدير المدرسة." },
    { en: "Adam agreed to speak to him.", ar: "وافق آدم على التحدث إليه." },
    { en: "Finally, the teacher told him not to repeat the mistake.", ar: "وفي النهاية، طلب منه المعلم ألا يكرر الخطأ." },
  ],
  notes: [
    "asked whether = نقل سؤال تكون إجابته نعم أو لا.",
    "admitted breaking = اعتراف بفعل شيء.",
    "apologized for doing = اعتذار عن القيام بشيء.",
    "explained that = شرح معلومة.",
    "reminded him to = تذكير شخص بفعل شيء.",
    "warned him not to = تحذير شخص من فعل شيء.",
    "promised to = وعد بفعل شيء.",
    "advised him to = نصح شخصًا بفعل شيء.",
    "agreed to = وافق على فعل شيء.",
    "told him not to = طلب منه ألا يفعل شيئًا.",
  ],
};

// ------------------------------------------------------------
// القسم السابع عشر: قطعة قراءة — A Difficult Decision
// ------------------------------------------------------------

export const READING62 = {
  title: "A Difficult Decision",
  titleAr: "قرار صعب",
  paragraphs: [
    { en: "Last month, Sarah had a problem with a school project. She admitted making a mistake in the first version of her work.", ar: "في الشهر الماضي، واجهت سارة مشكلة في مشروع مدرسي. واعترفت بارتكاب خطأ في النسخة الأولى من عملها." },
    { en: "Her friend suggested working together to correct it. Sarah agreed to review the project, but she refused to copy another student's work.", ar: "اقترح صديقها أن يعملا معًا لتصحيح الخطأ. ووافقت سارة على مراجعة المشروع، لكنها رفضت نسخ عمل طالب آخر." },
    { en: "The teacher advised Sarah to organize her time better. He also encouraged her to ask questions whenever she needed help.", ar: "نصح المعلم سارة بتنظيم وقتها بصورة أفضل. كما شجعها على طرح الأسئلة كلما احتاجت إلى المساعدة." },
    { en: "Sarah apologized to her friend for not completing her part on time. Her friend accepted the apology and offered to help her.", ar: "اعتذرت سارة لصديقها عن عدم إكمال الجزء الخاص بها في الوقت المحدد. وقَبِل صديقها الاعتذار وعرض مساعدتها." },
    { en: "Before the final presentation, the teacher reminded the students to check their work carefully. He warned them not to use information from unreliable websites.", ar: "قبل العرض النهائي، ذكّر المعلم الطلاب بمراجعة أعمالهم بعناية. وحذرهم من استخدام معلومات من مواقع إلكترونية غير موثوقة." },
    { en: "Sarah promised to finish her work early. She later explained that the experience had taught her to be more responsible.", ar: "وعدت سارة بإنهاء عملها مبكرًا. وشرحت لاحقًا أن هذه التجربة علمتها أن تكون أكثر مسؤولية." },
  ],
  questions: [
    { q: "What problem did Sarah have?", qar: "ما المشكلة التي واجهتها سارة؟", a: "She had a problem with a school project.", aar: "واجهت مشكلة في مشروع مدرسي." },
    { q: "What did Sarah admit doing?", qar: "بماذا اعترفت سارة؟", a: "She admitted making a mistake in the first version of her work.", aar: "اعترفت بارتكاب خطأ في النسخة الأولى من عملها." },
    { q: "What did her friend suggest?", qar: "ماذا اقترح صديقها؟", a: "Her friend suggested working together to correct the project.", aar: "اقترح صديقها أن يعملا معًا لتصحيح المشروع." },
    { q: "What did Sarah refuse to do?", qar: "ماذا رفضت سارة أن تفعل؟", a: "She refused to copy another student's work.", aar: "رفضت نسخ عمل طالب آخر." },
    { q: "What did the teacher advise her to do?", qar: "بماذا نصحها المعلم؟", a: "The teacher advised her to organize her time better.", aar: "نصحها المعلم بتنظيم وقتها بصورة أفضل." },
    { q: "What did her friend offer to do?", qar: "ماذا عرض صديقها أن يفعل؟", a: "Her friend offered to help her.", aar: "عرض صديقها مساعدتها." },
    { q: "What did the teacher remind the students to do?", qar: "بماذا ذكّر المعلم الطلاب؟", a: "He reminded them to check their work carefully.", aar: "ذكّرهم بمراجعة أعمالهم بعناية." },
    { q: "What did Sarah promise to do?", qar: "بماذا وعدت سارة؟", a: "She promised to finish her work early.", aar: "وعدت بإنهاء عملها مبكرًا." },
  ],
};

// ------------------------------------------------------------
// القسم الثامن عشر: التدريبات الثماني المتدرجة
// ------------------------------------------------------------

export type PracticeItem62 = {
  prompt: string;
  hint?: string;
  options?: string[];
  answer: string;
  why: string;
  ar?: string;
  accept?: string[];
};

export type PracticeGroup62 = { id: string; title: string; instruction: string; items: PracticeItem62[] };

export const PRACTICES_62: PracticeGroup62[] = [
  {
    id: "p1",
    title: "التدريب الأول: أكمل بالفعل المناسب",
    instruction: "استخدم الأفعال التالية: admitted – denied – promised – refused – offered – suggested",
    items: [
      { prompt: "He ______ breaking the computer.", answer: "admitted", why: "اعترف بكسر الحاسوب → admitted + V-ing", ar: "اعترف بكسر الحاسوب." },
      { prompt: "She ______ to help me with my homework.", answer: "offered", why: "عرضت مساعدتي → offered + to", ar: "عرضت مساعدتي في واجبي المنزلي." },
      { prompt: "They ______ stealing the documents.", answer: "denied", why: "أنكروا السرقة → denied + V-ing", ar: "أنكروا سرقة المستندات." },
      { prompt: "He ______ to answer the question.", answer: "refused", why: "رفض الإجابة → refused + to", ar: "رفض الإجابة عن السؤال." },
      { prompt: "My friend ______ going to the cinema.", answer: "suggested", why: "اقترح الذهاب → suggested + V-ing", ar: "اقترح صديقي الذهاب إلى السينما." },
      { prompt: "She ______ that she would arrive early.", answer: "promised", why: "وعدت بأنها ستصل مبكرًا → promised + that", ar: "وعدت بأنها ستصل مبكرًا." },
    ],
  },
  {
    id: "p2",
    title: "التدريب الثاني: اختر التركيب الصحيح",
    instruction: "اختر الصيغة الصحيحة لإكمال الجملة، ثم تحقّق لتقرأ السبب.",
    items: [
      { prompt: "He admitted _____ the truth.", options: ["to hide", "hiding", "hide"], answer: "hiding", why: "لأن admit + V-ing." },
      { prompt: "She promised _____ me.", options: ["helping", "help", "to help"], answer: "to help", why: "لأن promise + to + infinitive." },
      { prompt: "The doctor advised me _____ more water.", options: ["to drink", "drinking", "drink"], answer: "to drink", why: "لأن advise + object + to + infinitive." },
      { prompt: "He accused his friend _____.", options: ["for lying", "of lying", "to lie"], answer: "of lying", why: "لأن accuse + object + of + V-ing." },
      { prompt: "They insisted _____ for the meal.", options: ["to pay", "on paying", "pay"], answer: "on paying", why: "لأن insist on + V-ing." },
      { prompt: "She refused _____ the question.", options: ["answering", "answer", "to answer"], answer: "to answer", why: "لأن refuse + to + infinitive." },
      { prompt: "The teacher reminded us _____ our books.", options: ["bring", "to bring", "bringing"], answer: "to bring", why: "لأن remind + object + to + infinitive." },
      { prompt: "He apologized _____ late.", options: ["for arriving", "to arrive", "of arriving"], answer: "for arriving", why: "لأن apologize for + V-ing." },
    ],
  },
  {
    id: "p3",
    title: "التدريب الثالث: حوّل الجمل إلى Reporting Verbs",
    instruction: "حوّل كل جملة مباشرة إلى جملة باستخدام فعل نقل مناسب.",
    items: [
      { prompt: `He said, "I stole the money."`, answer: "He admitted stealing the money.", why: "اعتراف → admitted + V-ing", ar: "اعترف بسرقة المال." },
      { prompt: `She said, "I will help you."`, answer: "She promised to help me.", why: "وعد → promised + to", ar: "وعدت بمساعدتي." },
      { prompt: `He said, "I won't answer."`, answer: "He refused to answer.", why: "رفض → refused + to", ar: "رفض الإجابة." },
      { prompt: `She said, "Let's visit the museum."`, answer: "She suggested visiting the museum.", why: "اقتراح → suggested + V-ing", ar: "اقترحت زيارة المتحف." },
      { prompt: `The doctor said to me, "You should exercise regularly."`, answer: "The doctor advised me to exercise regularly.", why: "نصيحة → advised + object + to", ar: "نصحني الطبيب بممارسة الرياضة بانتظام." },
      { prompt: `He said to her, "You are lying."`, answer: "He accused her of lying.", why: "اتهام → accused + object + of + V-ing", ar: "اتهمها بالكذب." },
      { prompt: `My friend said, "I'll carry your bag."`, answer: "My friend offered to carry my bag.", why: "عرض → offered + to", ar: "عرض صديقي حمل حقيبتي." },
      { prompt: `She said, "I didn't break the vase."`, answer: "She denied breaking the vase.", why: "إنكار → denied + V-ing", ar: "أنكرت كسر المزهرية." },
    ],
  },
  {
    id: "p4",
    title: "التدريب الرابع: صحح الأخطاء",
    instruction: "كل جملة تحمل خطأً واحدًا — اكتب الصيغة الصحيحة ثم تحقّق.",
    items: [
      { prompt: "He admitted to breaking the window.", answer: "He admitted breaking the window.", alt: "He admitted having broken the window.", why: "admit + V-ing. ملاحظة: admitted to breaking قد تكون صحيحة أيضًا لأن to هنا حرف جر.", hint: "التركيب الأساسي: admit + V-ing" },
      { prompt: "She promised helping me.", answer: "She promised to help me.", why: "promise + to + infinitive." },
      { prompt: "The teacher suggested us to study together.", answer: "The teacher suggested studying together.", alt: "The teacher suggested that we should study together.", why: "suggest لا يأتي بعده object + to." },
      { prompt: "He accused her for stealing his phone.", answer: "He accused her of stealing his phone.", why: "accuse + object + of + V-ing." },
      { prompt: "My father advised me studying harder.", answer: "My father advised me to study harder.", why: "advise + object + to + infinitive." },
      { prompt: "She apologized me for shouting.", answer: "She apologized to me for shouting.", why: "apologize to someone for something." },
      { prompt: "He insisted to pay for dinner.", answer: "He insisted on paying for dinner.", why: "insist on + V-ing." },
      { prompt: "The teacher explained me the rule.", answer: "The teacher explained the rule to me.", why: "explain something to someone." },
      { prompt: "She refused answering the question.", answer: "She refused to answer the question.", why: "refuse + to + infinitive." },
      { prompt: "He reminded me don't forget my homework.", answer: "He reminded me not to forget my homework.", why: "remind + object + not to + infinitive." },
    ],
  },
  {
    id: "p5",
    title: "التدريب الخامس: ترجم إلى الإنجليزية",
    instruction: "ترجم كل جملة ترجمة كاملة باستخدام Reporting Verbs.",
    items: [
      { prompt: "اعترف بأنه ارتكب خطأ.", answer: "He admitted making a mistake.", alt: "He admitted that he had made a mistake.", why: "admit + V-ing أو admit + that", ar: "اعترف بأنه ارتكب خطأ." },
      { prompt: "أنكر سرقة المال.", answer: "He denied stealing the money.", why: "deny + V-ing", ar: "أنكر سرقة المال." },
      { prompt: "وعد بمساعدتي.", answer: "He promised to help me.", why: "promise + to", ar: "وعد بمساعدتي." },
      { prompt: "رفض الإجابة عن السؤال.", answer: "He refused to answer the question.", why: "refuse + to", ar: "رفض الإجابة عن السؤال." },
      { prompt: "اقترحت الذهاب إلى المكتبة.", answer: "She suggested going to the library.", why: "suggest + V-ing", ar: "اقترحت الذهاب إلى المكتبة." },
      { prompt: "نصحني الطبيب بالراحة.", answer: "The doctor advised me to rest.", why: "advise + object + to", ar: "نصحني الطبيب بالراحة." },
      { prompt: "حذرنا المعلم من استخدام هواتفنا.", answer: "The teacher warned us not to use our phones.", why: "warn + object + not to", ar: "حذرنا المعلم من استخدام هواتفنا." },
      { prompt: "اعتذر عن التأخر.", answer: "He apologized for being late.", why: "apologize for + V-ing", ar: "اعتذر عن التأخر." },
      { prompt: "اتهمته بالكذب.", answer: "I accused him of lying.", why: "accuse + object + of + V-ing", ar: "اتهمته بالكذب." },
      { prompt: "ذكرتني أمي بإغلاق الباب.", answer: "My mother reminded me to close the door.", why: "remind + object + to", ar: "ذكرتني أمي بإغلاق الباب." },
    ],
  },
  {
    id: "p6",
    title: "التدريب السادس: اختر فعل النقل المناسب",
    instruction: "اختر الفعل الأنسب من بين الخيارات.",
    items: [
      { prompt: "The student ______ cheating in the exam.", options: ["admitted", "promised", "offered"], answer: "admitted", why: "لأن الطالب يعترف بالغش." },
      { prompt: "She ______ to carry my bags.", options: ["denied", "offered", "accused"], answer: "offered", why: "لأنها تعرض حمل الحقائب." },
      { prompt: "He ______ me to study harder.", options: ["persuaded", "apologized", "complained"], answer: "persuaded", why: "لأنها أقنعته بالدراسة." },
      { prompt: "The doctor ______ me not to eat too much sugar.", options: ["advised", "suggested", "denied"], answer: "advised", why: "لأن الطبيب يقدم نصيحة." },
      { prompt: "She ______ him of stealing the money.", options: ["reminded", "accused", "promised"], answer: "accused", why: "لأنها تتهمه بالسرقة." },
      { prompt: "He ______ for arriving late.", options: ["apologized", "encouraged", "threatened"], answer: "apologized", why: "لأنه يعتذر عن التأخر." },
      { prompt: "The teacher ______ us to bring our books.", options: ["reminded", "denied", "refused"], answer: "reminded", why: "لأن المعلم يذكّر الطلاب بإحضار الكتب." },
      { prompt: "They ______ on staying until the end.", options: ["insisted", "suggested", "offered"], answer: "insisted", why: "لأنهم أصروا على البقاء." },
    ],
  },
  {
    id: "p7",
    title: "التدريب السابع: أكمل الجمل باستخدام الكلمة بين القوسين",
    instruction: "أكمل كل جملة بالصيغة الصحيحة للكلمة بين القوسين.",
    items: [
      { prompt: "He admitted ______ (take) the book.", answer: "taking", why: "admit + V-ing", full: "He admitted taking the book." },
      { prompt: "She promised ______ (call) me.", answer: "to call", why: "promise + to", full: "She promised to call me." },
      { prompt: "They denied ______ (break) the window.", answer: "breaking", why: "deny + V-ing", full: "They denied breaking the window." },
      { prompt: "My father advised me ______ (save) money.", answer: "to save", why: "advise + object + to", full: "My father advised me to save money." },
      { prompt: "The teacher warned us ______ (not / run) in the corridor.", answer: "not to run", why: "warn + object + not to", full: "The teacher warned us not to run in the corridor." },
      { prompt: "She apologized ______ (forget) my birthday.", answer: "for forgetting", why: "apologize for + V-ing", full: "She apologized for forgetting my birthday." },
      { prompt: "He accused his brother ______ (lie).", answer: "of lying", why: "accuse + object + of + V-ing", full: "He accused his brother of lying." },
      { prompt: "They agreed ______ (join) the project.", answer: "to join", why: "agree + to", full: "They agreed to join the project." },
      { prompt: "My mother reminded me ______ (turn off) the lights.", answer: "to turn off", why: "remind + object + to", full: "My mother reminded me to turn off the lights." },
      { prompt: "She insisted ______ (pay) for lunch.", answer: "on paying", why: "insist on + V-ing", full: "She insisted on paying for lunch." },
    ],
  },
  {
    id: "p8",
    title: "التدريب الثامن: تحويل فقرة كاملة",
    instruction: "اقرأ النص المباشر التالي، ثم حوّله إلى الكلام المنقول باستخدام أكبر عدد ممكن من Reporting Verbs المناسبة.",
    items: [
      {
        prompt: `A student said to his teacher:

"I made a mistake in my homework. I am sorry. I will correct it tonight. Could you explain this rule to me? I suggest studying together tomorrow. Please remind me to bring my notebook. I promise I won't repeat the mistake."`,
        answer: "The student admitted making a mistake in his homework. He apologized for making the mistake and promised to correct it that night. He asked the teacher to explain that rule to him. He suggested studying together the following day. He also asked the teacher to remind him to bring his notebook. Finally, he promised not to repeat the mistake.",
        why: "admitted + V-ing, apologized for + V-ing, promised + to, asked + object + to, suggested + V-ing, asked + object + to, promised + not to",
        ar: "اعترف الطالب بارتكاب خطأ في واجبه المنزلي. واعتذر عن ارتكاب الخطأ ووعد بتصحيحه في تلك الليلة. وطلب من المعلم أن يشرح له تلك القاعدة. واقترح أن يدرسا معًا في اليوم التالي. كما طلب من المعلم أن يذكره بإحضار دفتره. وأخيرًا، وعد بألا يكرر الخطأ.",
      },
    ],
  },
];

export const PRACTICE_TOTALS_62 = PRACTICES_62.reduce((n, group) => n + group.items.length, 0);

// ------------------------------------------------------------
// القسم التاسع عشر: الاختبار النهائي الأصلي — 25 سؤالًا
// ------------------------------------------------------------

export type OriginalQuestion62 = {
  n: number;
  section: string;
  prompt: string;
  hint?: string;
  options?: string[];
  answer: string;
  why: string;
  ar?: string;
};

export const ORIGINAL_TEST_62: OriginalQuestion62[] = [
  // القسم الأول: اختر الإجابة الصحيحة (1–5)
  { n: 1, section: "اختر الإجابة الصحيحة", prompt: "He admitted _____ the money.", options: ["to steal", "stealing", "steal"], answer: "stealing", why: "لأن admit + V-ing." },
  { n: 2, section: "اختر الإجابة الصحيحة", prompt: "She promised _____ me.", options: ["helping", "help", "to help"], answer: "to help", why: "لأن promise + to + infinitive." },
  { n: 3, section: "اختر الإجابة الصحيحة", prompt: "The doctor advised him _____ more water.", options: ["drink", "to drink", "drinking"], answer: "to drink", why: "لأن advise + object + to + infinitive." },
  { n: 4, section: "اختر الإجابة الصحيحة", prompt: "He accused her _____ lying.", options: ["for", "of", "to"], answer: "of", why: "لأن accuse + object + of + V-ing." },
  { n: 5, section: "اختر الإجابة الصحيحة", prompt: "They insisted _____ at home.", options: ["on staying", "to stay", "stay"], answer: "on staying", why: "لأن insist on + V-ing." },
  // القسم الثاني: أكمل الجمل (6–10)
  { n: 6, section: "أكمل الجمل", prompt: "She refused ______ (answer) the question.", answer: "to answer", why: "refuse + to + infinitive.", ar: "رفضت الإجابة عن السؤال." },
  { n: 7, section: "أكمل الجمل", prompt: "He apologized for ______ (arrive) late.", answer: "arriving", why: "apologize for + V-ing.", ar: "اعتذر عن الوصول متأخرًا." },
  { n: 8, section: "أكمل الجمل", prompt: "My mother reminded me ______ (call) her.", answer: "to call", why: "remind + object + to + infinitive.", ar: "ذكرتني أمي بالاتصال بها." },
  { n: 9, section: "أكمل الجمل", prompt: "The teacher warned us ______ (not / cheat).", answer: "not to cheat", why: "warn + object + not to + infinitive.", ar: "حذرنا المعلم من الغش." },
  { n: 10, section: "أكمل الجمل", prompt: "She suggested ______ (visit) the museum.", answer: "visiting", why: "suggest + V-ing.", ar: "اقترحت زيارة المتحف." },
  // القسم الثالث: حوّل إلى Reporting Verbs (11–15)
  { n: 11, section: "حوّل إلى Reporting Verbs", prompt: `He said, "I broke the window."`, answer: "He admitted breaking the window.", why: "اعتراف → admitted + V-ing.", ar: "اعترف بكسر النافذة." },
  { n: 12, section: "حوّل إلى Reporting Verbs", prompt: `She said, "I will help you."`, answer: "She promised to help me.", why: "وعد → promised + to.", ar: "وعدت بمساعدتي." },
  { n: 13, section: "حوّل إلى Reporting Verbs", prompt: `He said, "I won't leave."`, answer: "He refused to leave.", why: "رفض → refused + to.", ar: "رفض المغادرة." },
  { n: 14, section: "حوّل إلى Reporting Verbs", prompt: `She said to him, "You stole my phone."`, answer: "She accused him of stealing her phone.", why: "اتهام → accused + object + of + V-ing.", ar: "اتهمته بسرقة هاتفها." },
  { n: 15, section: "حوّل إلى Reporting Verbs", prompt: `The doctor said to me, "You should rest."`, answer: "The doctor advised me to rest.", why: "نصيحة → advised + object + to.", ar: "نصحني الطبيب بالراحة." },
  // القسم الرابع: صحح الأخطاء (16–20)
  { n: 16, section: "صحح الأخطاء", prompt: "He admitted to steal the money.", answer: "He admitted stealing the money.", alt: "He admitted having stolen the money.", why: "admit + V-ing." },
  { n: 17, section: "صحح الأخطاء", prompt: "She suggested me to leave.", answer: "She suggested leaving.", alt: "She suggested that I should leave.", why: "suggest لا يتبعها object + to." },
  { n: 18, section: "صحح الأخطاء", prompt: "He apologized me for shouting.", answer: "He apologized to me for shouting.", why: "apologize to someone for something." },
  { n: 19, section: "صحح الأخطاء", prompt: "The teacher explained me the answer.", answer: "The teacher explained the answer to me.", why: "explain something to someone." },
  { n: 20, section: "صحح الأخطاء", prompt: "She refused helping him.", answer: "She refused to help him.", why: "refuse + to + infinitive." },
  // القسم الخامس: اختر الفعل الأنسب (21–25)
  { n: 21, section: "اختر الفعل الأنسب", prompt: "He ______ to carry my suitcase.", options: ["offered", "denied", "accused"], answer: "offered", why: "لأنه عرض حمل الحقيبة.", ar: "عرض حمل حقيبتي." },
  { n: 22, section: "اختر الفعل الأنسب", prompt: "She ______ me to join the club.", options: ["apologized", "persuaded", "complained"], answer: "persuaded", why: "لأنها أقنعته بالانضمام إلى النادي.", ar: "أقنعتني بالانضمام إلى النادي." },
  { n: 23, section: "اختر الفعل الأنسب", prompt: "The teacher ______ us to bring our books.", options: ["reminded", "denied", "threatened"], answer: "reminded", why: "لأن المعلم يذكّر الطلاب بإحضار الكتب.", ar: "ذكرنا المعلم بإحضار كتبنا." },
  { n: 24, section: "اختر الفعل الأنسب", prompt: "He ______ that he was innocent.", options: ["insisted", "invited", "apologized"], answer: "insisted", why: "لأنه أصر على أنه بريء.", ar: "أصر على أنه بريء." },
  { n: 25, section: "اختر الفعل الأنسب", prompt: "She ______ for forgetting the appointment.", options: ["accused", "apologized", "persuaded"], answer: "apologized", why: "لأنها اعتذرت عن نسيان الموعد.", ar: "اعتذرت عن نسيان الموعد." },
];

export const ORIGINAL_TEST_SECTIONS_62 = [...new Set(ORIGINAL_TEST_62.map((q) => q.section))];

// ------------------------------------------------------------
// القسم العشرون: مهمة الكتابة
// ------------------------------------------------------------

export const WRITING62 = {
  title: "Learning from a Mistake",
  titleAr: "التعلم من الخطأ",
  instruction: "اكتب فقرة من 10 إلى 15 جملة عن موقف أخطأت فيه ثم حاولت إصلاح الخطأ. استخدم في الفقرة عشرة أفعال على الأقل من أفعال الدرس.",
  requiredVerbs: ["admitted", "apologized", "promised", "advised", "encouraged", "suggested", "refused", "offered", "reminded", "explained"],
  model: [
    { en: "Last week, I made a mistake at school. I admitted making the mistake and apologized to my teacher.", ar: "في الأسبوع الماضي، ارتكبت خطأ في المدرسة. واعترفت بارتكاب الخطأ واعتذرت لمعلمي." },
    { en: "My teacher advised me to organize my time better. He encouraged me to practise more and offered to help me after class.", ar: "نصحني معلمي بتنظيم وقتي بصورة أفضل. وشجعني على التدرب أكثر وعرض مساعدتي بعد الحصة." },
    { en: "I promised to work harder. My friend suggested studying together, and I agreed to join him.", ar: "وعدت بأن أبذل جهدًا أكبر. واقترح صديقي أن ندرس معًا، ووافقت على الانضمام إليه." },
    { en: "At first, I refused to ask questions because I felt embarrassed. Later, my teacher reminded me that asking questions was important.", ar: "في البداية، رفضت طرح الأسئلة لأنني شعرت بالإحراج. وبعد ذلك، ذكرني معلمي بأن طرح الأسئلة أمر مهم." },
    { en: "I explained my problem to him, and he helped me understand the lesson.", ar: "شرحت له مشكلتي، وساعدني على فهم الدرس." },
    { en: "I learned that admitting mistakes and trying to correct them are important parts of learning.", ar: "تعلمت أن الاعتراف بالأخطاء ومحاولة تصحيحها جزءان مهمان من عملية التعلم." },
  ],
};

// ------------------------------------------------------------
// القسم الحادي والعشرون: مهمة التحدث
// ------------------------------------------------------------

export const SPEAKING62 = {
  instruction: "تخيل أن صديقك أخبرك بأنه ارتكب خطأ في مشروع مدرسي. أجب عن المواقف التالية باللغة الإنجليزية باستخدام Reporting Verbs.",
  situations: [
    { en: "He admitted forgetting the project deadline.", ar: "اعترف بأنه نسي موعد تسليم المشروع." },
    { en: "He apologized to the teacher for being late.", ar: "اعتذر للمعلم عن التأخر." },
    { en: "He promised to finish the project.", ar: "وعد بإنهاء المشروع." },
    { en: "His friend offered to help him.", ar: "عرض صديقه مساعدته." },
    { en: "The teacher advised him to organize his time.", ar: "نصحه المعلم بتنظيم وقته." },
    { en: "His classmate suggested working together.", ar: "اقترح زميله العمل معًا." },
    { en: "He refused to copy another student's work.", ar: "رفض نسخ عمل طالب آخر." },
  ],
  practice: "تدرب على نطق الجمل، ثم حاول أن تؤلف موقفًا مشابهًا من عندك.",
};

// ------------------------------------------------------------
// القسم الثاني والعشرون: الملخص الشامل
// ------------------------------------------------------------

export const SUMMARY62 = {
  title: "الملخص الشامل — أهم القواعد للدرس 62",
  groups: [
    {
      title: "أولًا: أفعال يأتي بعدها V-ing",
      items: [
        { pattern: "admit + V-ing", example: "He admitted lying.", ar: "اعترف بالكذب." },
        { pattern: "deny + V-ing", example: "He denied stealing.", ar: "أنكر السرقة." },
        { pattern: "suggest + V-ing", example: "She suggested leaving.", ar: "اقترحت المغادرة." },
        { pattern: "recommend + V-ing", example: "He recommended reading the book.", ar: "أوصى بقراءة الكتاب." },
      ],
    },
    {
      title: "ثانيًا: أفعال يأتي بعدها To + Infinitive",
      items: [
        { pattern: "promise + to + verb", example: "She promised to help.", ar: "وعدت بالمساعدة." },
        { pattern: "refuse + to + verb", example: "He refused to answer.", ar: "رفض الإجابة." },
        { pattern: "offer + to + verb", example: "He offered to drive.", ar: "عرض القيادة." },
        { pattern: "agree + to + verb", example: "They agreed to join.", ar: "وافقوا على الانضمام." },
        { pattern: "decide + to + verb", example: "She decided to leave.", ar: "قررت المغادرة." },
        { pattern: "threaten + to + verb", example: "He threatened to call the police.", ar: "هدد بالاتصال بالشرطة." },
      ],
    },
    {
      title: "ثالثًا: أفعال يأتي بعدها شخص ثم To + Infinitive",
      items: [
        { pattern: "advise + object + to + verb", example: "She advised me to study.", ar: "نصحتني بالدراسة." },
        { pattern: "encourage + object + to + verb", example: "They encouraged me to try.", ar: "شجعوني على المحاولة." },
        { pattern: "persuade + object + to + verb", example: "He persuaded him to stay.", ar: "أقنعته بالبقاء." },
        { pattern: "remind + object + to + verb", example: "She reminded me to call.", ar: "ذكرتني بالاتصال." },
        { pattern: "warn + object + not to + verb", example: "He warned me not to go.", ar: "حذرني من الذهاب." },
        { pattern: "invite + object + to + verb", example: "They invited me to join.", ar: "دعوني للانضمام." },
      ],
    },
    {
      title: "رابعًا: أفعال تحتاج إلى حرف جر",
      items: [
        { pattern: "apologize to someone for doing something", example: "He apologized for shouting.", ar: "اعتذر عن الصراخ." },
        { pattern: "accuse someone of doing something", example: "She accused him of lying.", ar: "اتهمته بالكذب." },
        { pattern: "insist on doing something", example: "He insisted on paying.", ar: "أصر على الدفع." },
        { pattern: "complain about something", example: "They complained about the noise.", ar: "اشتكوا من الضوضاء." },
      ],
    },
    {
      title: "خامسًا: أفعال مهمة يأتي بعدها That",
      items: [
        { pattern: "admit that...", example: "He admitted that he was wrong.", ar: "اعترف بأنه كان مخطئًا." },
        { pattern: "deny that...", example: "She denied that she took it.", ar: "أنكرت أنها أخذته." },
        { pattern: "explain that...", example: "He explained that he was busy.", ar: "شرح أنه كان مشغولًا." },
        { pattern: "claim that...", example: "They claimed that they knew.", ar: "ادّعوا أنهم يعرفون." },
        { pattern: "announce that...", example: "The school announced that it would close.", ar: "أعلنت المدرسة أنها ستغلق." },
        { pattern: "insist that...", example: "He insisted that he was innocent.", ar: "أصر على أنه بريء." },
      ],
    },
  ],
};