// ============================================================
// الدرس 57 — Passive Voice: Foundations
// «مختبر تحويل الجملة» / THE VOICE SHIFT LAB
//
// محتوى الطالب التعليمي فقط. لا مفاتيح اختبار هنا:
//   • أسئلة الاختبار النهائي التفاعلي (15) في test57.ts
//   • بقية أسئلة الاختبار الأصلي (10) في practiceData57.ts كتدريبات
//   • مفتاح المعلم في TeacherArea57.tsx
//
// الهوية: مسار الجملة (Rail) بلونين — المعلوم والمجهول — مع نقل
// المفعول به من نهاية الجملة إلى بدايتها. الألوان أدوار ثابتة:
//   ذهبي = من قام بالفعل (Agent) · كحلي = الفعل · وردي = المفعول به (Receiver)
// ============================================================

export type Example57 = { en: string; ar: string; note?: string };

/** أهداف الدرس — صياغة تعليمية قابلة للقياس. */
export const GOALS_57: string[] = [
  "أفرّق بين Active Voice وPassive Voice، وأشرح أيّهما يتركّز على من قام بالفعل وأيّهما على المفعول به.",
  "أحلّل الجملة إلى Subject وVerb وObject قبل أي تحويل، وأحدّد إن كان الفعل متعديًا أم لازمًا.",
  "أطبّق القاعدة Object + be + V3 في Present Simple Passive، وأختار am / is / are حسب الفاعل الجديد.",
  "أستخدم التصريف الثالث V3 للأفعال المنتظمة وغير المنتظمة، وأتجنّب V1 وV2 بعد be.",
  "أذكر الفاعل الأصلي بـ by + ضمير مفعول به، وأحذفه عندما لا يعرفه القارئ أو لا يهمّه.",
  "أكوّن النفي والسؤال والجواب القصير وأسئلة Wh في المبني للمجهول.",
  "أشرح سبب اختيار Passive في سياق معيّن، وأدرك أن Active ليس دائمًا «خطأً» ولا Passive دائمًا «أفضل».",
];

/* ============================================================
   ① المقدمة — من الذي قام بالفعل؟
   ============================================================ */

export type FocusMode57 = {
  id: "agent" | "receiver";
  question: string;
  answerEn: string;
  answerAr: string;
  sentence: Example57;
  explanation: string;
};

export const FOCUS_MODES_57: FocusMode57[] = [
  {
    id: "agent",
    question: "من الذي قام بالفعل؟",
    answerEn: "Ali",
    answerAr: "علي",
    sentence: { en: "Ali cleans the room.", ar: "علي ينظف الغرفة." },
    explanation:
      "الجملة تبدأ بالفاعل وتنتهي بالمفعول به، فالبؤرة على الشخص الذي قام بالفعل. هذا هو Active Voice — المبني للمعلوم.",
  },
  {
    id: "receiver",
    question: "على ماذا وقع الفعل؟",
    answerEn: "the room",
    answerAr: "الغرفة",
    sentence: { en: "The room is cleaned by Ali.", ar: "الغرفة يتم تنظيفها بواسطة علي." },
    explanation:
      "المعنى الأساسي لم يتغيّر، لكن البؤرة انتقلت إلى الغرفة. هذا هو Passive Voice — المبني للمجهول.",
  },
];

export const INTRO_NOTE_57 =
  "المبني للمجهول لا يعني دائمًا أننا لا نعرف من قام بالفعل. أحيانًا نعرفه تمامًا لكننا نختار عدم التركيز عليه.";

/* ============================================================
   ② Active Voice — التحليل والأمثلة
   ============================================================ */

export const ACTIVE_FORMULA_57 = ["SUBJECT", "VERB", "OBJECT"] as const;

export const ACTIVE_ANALYSIS_57 = {
  en: "The teacher explains the lesson.",
  ar: "المعلم يشرح الدرس.",
  subject: "The teacher",
  subjectAr: "المعلم",
  verb: "explains",
  verbAr: "يشرح",
  object: "the lesson",
  objectAr: "الدرس",
};

export type Analysis57 = {
  en: string;
  ar: string;
  subject: string;
  verb: string;
  object: string;
  note?: string;
};

export const ACTIVE_EXAMPLES_57: Analysis57[] = [
  {
    en: "The boy broke the window.",
    ar: "كسر الولد النافذة.",
    subject: "The boy",
    verb: "broke",
    object: "the window",
  },
  {
    en: "My mother cooks dinner.",
    ar: "أمي تطبخ العشاء.",
    subject: "My mother",
    verb: "cooks",
    object: "dinner",
  },
  {
    en: "The company produces cars.",
    ar: "الشركة تنتج السيارات.",
    subject: "The company",
    verb: "produces",
    object: "cars",
  },
  {
    en: "Someone stole my bag.",
    ar: "سرق شخص ما حقيبتي.",
    subject: "Someone",
    verb: "stole",
    object: "my bag",
    note: "كلمة Someone فاعل حقيقي، لكنها غامضة — ومن هنا جاءت الحاجة إلى المبني للمجهول أحيانًا.",
  },
];

/* ============================================================
   ③ Passive Voice — التعريف والحركة
   ============================================================ */

export const PASSIVE_DEFINITION_57 =
  "في Passive Voice نأخذ المفعول به من الجملة الأصلية ونضعه في بداية الجملة الجديدة، ثم نضع be المناسب، ثم V3، ثم (اختياريًا) by + الفاعل الأصلي.";

export type PassiveAnalysis57 = {
  active: Example57;
  passive: Example57;
  moved: string;
  be: string;
  v3: string;
  agent: string;
  why: string;
};

export const PASSIVE_EXAMPLES_57: PassiveAnalysis57[] = [
  {
    active: { en: "The teacher explains the lesson.", ar: "المعلم يشرح الدرس." },
    passive: { en: "The lesson is explained by the teacher.", ar: "الدرس يتم شرحه بواسطة المعلم." },
    moved: "the lesson → The lesson",
    be: "is",
    v3: "explained",
    agent: "the teacher",
    why: "the lesson هو المفعول به في الأصل، فانتقل إلى أول الجملة، وexplains تحوّل إلى is explained.",
  },
  {
    active: { en: "The chef prepares the food.", ar: "الطاهي يحضّر الطعام." },
    passive: { en: "The food is prepared by the chef.", ar: "الطعام يتم تحضيره بواسطة الطاهي." },
    moved: "the food → The food",
    be: "is",
    v3: "prepared",
    agent: "the chef",
    why: "the food مفرد، لذلك is؛ وprepare فعل منتظم فتصريفه الثالث prepared.",
  },
  {
    active: { en: "The students clean the classroom.", ar: "الطلاب ينظفون الفصل." },
    passive: { en: "The classroom is cleaned by the students.", ar: "الفصل يتم تنظيفه بواسطة الطلاب." },
    moved: "the classroom → The classroom",
    be: "is",
    v3: "cleaned",
    agent: "the students",
    why: "the classroom مفرد ⇒ is، والفاعل الأصلي جمع لكنه لا يؤثر في be لأنه جاء بعد by.",
  },
];

/* ============================================================
   ④ القاعدة الأساسية
   ============================================================ */

export const FORMULA_57 = ["OBJECT", "be", "V3"] as const;

export const FORMULA_PARTS_57 = [
  {
    part: "Object",
    ar: "المفعول به",
    body: "المفعول به في الجملة الأصلية ينتقل إلى بداية جملة المبني للمجهول.",
    exampleEn: "Sara writes a letter. → A letter …",
    exampleAr: "سارة تكتب رسالة. ← نبدأ بـ A letter.",
  },
  {
    part: "be",
    ar: "فعل be المناسب",
    body: "نستخدم فعل be بصيغته المناسبة حسب الزمن والفاعل الجديد. في هذا الدرس: am / is / are فقط.",
    exampleEn: "A letter is …",
    exampleAr: "نختار be حسب المفعول الذي أصبح فاعلًا.",
  },
  {
    part: "V3",
    ar: "التصريف الثالث",
    body: "بعد be نضع التصريف الثالث للفعل. لا نستخدم V1 ولا V2 بعده.",
    exampleEn: "A letter is written.",
    exampleAr: "تُكتب رسالة.",
  },
] as const;

export const BE_FORMS_57 = ["am", "is", "are", "was", "were", "be", "been", "being"];

export const V3_SHOWCASE_57 = [
  { v1: "write", v2: "wrote", v3: "written", passive: "A letter is written.", ar: "تُكتب رسالة." },
  { v1: "clean", v2: "cleaned", v3: "cleaned", passive: "The room is cleaned.", ar: "يتم تنظيف الغرفة." },
  { v1: "make", v2: "made", v3: "made", passive: "The cake is made.", ar: "تُصنع الكعكة." },
];

export const V3_WARNING_57 =
  "بعد be في المبني للمجهول نستخدم V3 دائمًا: لا V1 مثل write، ولا V2 مثل wrote. الخطأ الشائع «is wrote» سببه الخلط بين التصريف الثاني والثالث.";

/* ============================================================
   ⑤ أسباب استخدام المبني للمجهول
   ============================================================ */

export type Reason57 = {
  id: string;
  title: string;
  body: string;
  items: { en: string; ar: string }[];
};

export const REASONS_57: Reason57[] = [
  {
    id: "unknown",
    title: "① عندما لا نعرف من قام بالفعل",
    body: "لا نستطيع ذكر الفاعل لأنه مجهول لنا، فنركّز على ما حدث للشيء نفسه.",
    items: [
      { en: "My phone was stolen.", ar: "سُرق هاتفي." },
      { en: "The window was broken.", ar: "كُسرت النافذة." },
      { en: "My car was damaged.", ar: "تضررت سيارتي." },
    ],
  },
  {
    id: "unimportant",
    title: "② عندما يكون الفاعل غير مهم",
    body: "المعلومة المهمة هي الشيء نفسه أو انتشاره، لا هوية الأشخاص الذين يقومون بالفعل.",
    items: [
      { en: "English is spoken in many countries.", ar: "تُتحدث الإنجليزية في دول كثيرة." },
      { en: "These products are sold worldwide.", ar: "تُباع هذه المنتجات في جميع أنحاء العالم." },
    ],
  },
  {
    id: "result",
    title: "③ عندما نريد التركيز على النتيجة",
    body: "نريد أن نخبر المستمع بما صار إليه الشيء، لا بمن قام بالعمل.",
    items: [
      { en: "The road was repaired last week.", ar: "تم إصلاح الطريق الأسبوع الماضي." },
      { en: "The documents were delivered yesterday.", ar: "تم تسليم المستندات أمس." },
    ],
  },
  {
    id: "formal",
    title: "④ في اللغة الرسمية والعلمية",
    body: "المبني للمجهول شائع في التقارير العلمية والأخبار والتعليمات والتقارير الرسمية ووصف العمليات والإجراءات.",
    items: [
      { en: "The experiment was conducted carefully.", ar: "أُجريت التجربة بعناية." },
      { en: "The results are analyzed by researchers.", ar: "تُحلَّل النتائج بواسطة الباحثين." },
      { en: "The samples are stored in special containers.", ar: "تُحفظ العينات في حاويات خاصة." },
    ],
  },
  {
    id: "avoid",
    title: "⑤ عندما نريد تجنّب ذكر الفاعل",
    body: "قد نستخدم المبني للمجهول لنركّز على الخطأ نفسه بدل تحديد الشخص المسؤول.",
    items: [{ en: "A mistake was made.", ar: "تم ارتكاب خطأ." }],
  },
];

export const REASONS_PLATFORM_NOTE_57 =
  "أكثر أمثلة هذا القسم في الماضي (was stolen / were delivered)؛ المبدأ واحد في كل الأزمنة. درس اليوم يطبّق المبدأ على Present Simple، والأزمنة الأخرى تأتي في الدرس القادم — لذلك لا تغيّر صيغة المثال، بل افهم الفكرة.";

/* ============================================================
   ⑥ خطوات التحويل الخمس
   ============================================================ */

export const STEPS_57 = [
  { n: 1, text: "حدّد الفاعل Subject في الجملة الأصلية.", tag: "SUBJECT" },
  { n: 2, text: "حدّد المفعول به Object.", tag: "OBJECT" },
  { n: 3, text: "انقل المفعول به إلى بداية الجملة الجديدة.", tag: "MOVE" },
  { n: 4, text: "اختر فعل be المناسب للزمن والفاعل الجديد.", tag: "BE" },
  { n: 5, text: "حوّل الفعل الأساسي إلى V3، ويمكن إضافة by + الفاعل الأصلي عند الحاجة.", tag: "V3 + BY" },
];

export const STEP_DEMO_57 = {
  active: { en: "The manager checks the reports.", ar: "المدير يفحص التقارير." },
  subject: "The manager",
  object: "the reports",
  tense: "Present Simple",
  newSubjectNote: "The reports جمع ⇒ are",
  final: { en: "The reports are checked by the manager.", ar: "يتم فحص التقارير بواسطة المدير." },
  breakdown: ["The reports", "are", "checked", "by the manager."],
};

/* ============================================================
   ⑦ Present Simple Passive
   ============================================================ */

export const PRESENT_FORMULAS_57 = {
  active: "Subject + V1 / V1+s + Object",
  passive: "Object + am / is / are + V3",
};

export const PRESENT_RECAP_57 = [
  "المضارع البسيط في المبني للمعلوم: V1 مع I / You / We / They، وV1 + s أو es مع He / She / It.",
  "في المبني للمجهول لا نستخدم الفعل الأصلي بهذه الطريقة، بل نستخدم am / is / are + V3.",
  "اختيار be يعتمد على المفعول به الذي أصبح في بداية الجملة، لا على الفاعل الأصلي.",
];

export const BE_TABLE_57 = [
  { subject: "I", be: "am", ar: "أنا" },
  { subject: "He", be: "is", ar: "هو" },
  { subject: "She", be: "is", ar: "هي" },
  { subject: "It", be: "is", ar: "هو / هي لغير العاقل" },
  { subject: "اسم مفرد", be: "is", ar: "مثل: The room · The car" },
  { subject: "You", be: "are", ar: "أنت / أنتم" },
  { subject: "We", be: "are", ar: "نحن" },
  { subject: "They", be: "are", ar: "هم" },
  { subject: "أسماء الجمع", be: "are", ar: "مثل: The rooms · Computers" },
];

export type PresentPassiveExample57 = {
  active: string;
  activeAr: string;
  passive: string;
  passiveAr: string;
  be: string;
  why: string;
};

export const PRESENT_PASSIVE_EXAMPLES_57: PresentPassiveExample57[] = [
  {
    active: "Ali cleans the room.",
    activeAr: "علي ينظف الغرفة.",
    passive: "The room is cleaned by Ali.",
    passiveAr: "الغرفة يتم تنظيفها بواسطة علي.",
    be: "is",
    why: "لأن The room مفرد.",
  },
  {
    active: "The workers build houses.",
    activeAr: "العمال يبنون منازل.",
    passive: "Houses are built by the workers.",
    passiveAr: "المنازل تُبنى بواسطة العمال.",
    be: "are",
    why: "لأن Houses جمع.",
  },
  {
    active: "My mother prepares breakfast.",
    activeAr: "أمي تحضّر الإفطار.",
    passive: "Breakfast is prepared by my mother.",
    passiveAr: "يتم تحضير الإفطار بواسطة أمي.",
    be: "is",
    why: "لأن Breakfast اسم مفرد غير معدود في هذا الاستخدام.",
  },
  {
    active: "The students use computers.",
    activeAr: "الطلاب يستخدمون الحواسيب.",
    passive: "Computers are used by the students.",
    passiveAr: "تُستخدم الحواسيب بواسطة الطلاب.",
    be: "are",
    why: "لأن Computers جمع.",
  },
  {
    active: "The company produces smartphones.",
    activeAr: "الشركة تنتج الهواتف الذكية.",
    passive: "Smartphones are produced by the company.",
    passiveAr: "تُنتج الهواتف الذكية بواسطة الشركة.",
    be: "are",
    why: "لأن Smartphones جمع.",
  },
];

/* ============================================================
   ⑧ V3 — منتظمة وغير منتظمة
   ============================================================ */

export type VerbRow57 = { v1: string; v2: string; v3: string; ar: string };

export const REGULAR_VERBS_57: VerbRow57[] = [
  { v1: "clean", v2: "cleaned", v3: "cleaned", ar: "ينظّف" },
  { v1: "open", v2: "opened", v3: "opened", ar: "يفتح" },
  { v1: "close", v2: "closed", v3: "closed", ar: "يغلق" },
  { v1: "wash", v2: "washed", v3: "washed", ar: "يغسل" },
  { v1: "help", v2: "helped", v3: "helped", ar: "يساعد" },
  { v1: "watch", v2: "watched", v3: "watched", ar: "يشاهد" },
  { v1: "repair", v2: "repaired", v3: "repaired", ar: "يصلح" },
  { v1: "paint", v2: "painted", v3: "painted", ar: "يدهن" },
  { v1: "finish", v2: "finished", v3: "finished", ar: "ينتهي من" },
  { v1: "invite", v2: "invited", v3: "invited", ar: "يدعو" },
];

export const REGULAR_EXAMPLES_57: Example57[] = [
  { en: "The room is cleaned every day.", ar: "تُنظف الغرفة كل يوم." },
  { en: "The door is opened every morning.", ar: "يُفتح الباب كل صباح." },
  { en: "The cars are repaired here.", ar: "تُصلح السيارات هنا." },
];

export const IRREGULAR_VERBS_57: VerbRow57[] = [
  { v1: "write", v2: "wrote", v3: "written", ar: "يكتب" },
  { v1: "make", v2: "made", v3: "made", ar: "يصنع" },
  { v1: "build", v2: "built", v3: "built", ar: "يبني" },
  { v1: "buy", v2: "bought", v3: "bought", ar: "يشتري" },
  { v1: "sell", v2: "sold", v3: "sold", ar: "يبيع" },
  { v1: "take", v2: "took", v3: "taken", ar: "يأخذ" },
  { v1: "give", v2: "gave", v3: "given", ar: "يعطي" },
  { v1: "see", v2: "saw", v3: "seen", ar: "يرى" },
  { v1: "eat", v2: "ate", v3: "eaten", ar: "يأكل" },
  { v1: "speak", v2: "spoke", v3: "spoken", ar: "يتحدث" },
  { v1: "do", v2: "did", v3: "done", ar: "يفعل" },
  { v1: "choose", v2: "chose", v3: "chosen", ar: "يختار" },
  { v1: "break", v2: "broke", v3: "broken", ar: "يكسر" },
  { v1: "drive", v2: "drove", v3: "driven", ar: "يقود" },
];

export const IRREGULAR_EXAMPLES_57: Example57[] = [
  { en: "English is spoken here.", ar: "تُتحدث الإنجليزية هنا." },
  { en: "These houses are built from stone.", ar: "تُبنى هذه المنازل من الحجر." },
  { en: "The letters are written by hand.", ar: "تُكتب الرسائل باليد." },
];

export const V3_ADVICE_57 =
  "عندما تتعلم فعلًا جديدًا، لا تحفظ V1 فقط. احفظ V1 وV2 وV3 معًا، لأنك تحتاج V3 كثيرًا في المبني للمجهول وفي الأزمنة التامة.";

/* ============================================================
   ⑨ by + Agent
   ============================================================ */

export const BY_INTRO_57 = {
  active: { en: "Shakespeare wrote Hamlet.", ar: "كتب شكسبير مسرحية هاملت." },
  passive: { en: "Hamlet was written by Shakespeare.", ar: "كُتبت مسرحية هاملت بواسطة شكسبير." },
  withoutAgent: { en: "Hamlet is studied in many schools.", ar: "تُدرّس مسرحية هاملت في مدارس كثيرة." },
  note: "لم نذكر من يدرسها؛ لأن ذلك ليس مهمًا في الجملة. ذكر الفاعل اختياري، وليس شرطًا في المبني للمجهول.",
};

export const BY_DROP_57 = [
  {
    n: "①",
    title: "عندما لا نعرفه",
    en: "My bicycle was stolen.",
    ar: "سُرقت دراجتي.",
    why: "لا نعرف من سرقها، فلا يمكن ذكره.",
  },
  {
    n: "②",
    title: "عندما يكون واضحًا من السياق",
    en: "The criminal was arrested.",
    ar: "قُبض على المجرم.",
    why: "من الطبيعي أن يكون القبض على يد الشرطة، فالذكر تحصيل حاصل.",
  },
  {
    n: "③",
    title: "عندما لا يكون مهمًا",
    en: "The roads are cleaned every morning.",
    ar: "تُنظف الطرق كل صباح.",
    why: "المهم أن الطرق تُنظف، لا هوية من ينظفها.",
  },
  {
    n: "④",
    title: "عندما يكون التركيز على النتيجة أو الشيء نفسه",
    en: "The project was completed.",
    ar: "اكتمل المشروع.",
    why: "الخبر هو اكتمال المشروع، لا شخص من أكمله.",
  },
];

export const BY_KEEP_57 = [
  {
    en: "The Mona Lisa was painted by Leonardo da Vinci.",
    ar: "رسم ليوناردو دا فينشي لوحة الموناليزا.",
    why: "هوية الرسام معلومة مهمة، ولا يمكن حذفها دون خسارة معنى.",
  },
  {
    en: "The book was written by a famous author.",
    ar: "كُتب الكتاب بواسطة مؤلف مشهور.",
    why: "وصف الفاعل (مؤلف مشهور) يحمل معلومة يريدها المتكلم.",
  },
  {
    en: "The building was designed by a young architect.",
    ar: "صُمم المبنى بواسطة مهندس معماري شاب.",
    why: "ذكر المهندس ووصفه يضيفان قيمة، لذلك نُبقي by.",
  },
];

/* ============================================================
   ⑩ الأفعال المتعدية واللازمة
   ============================================================ */

export const TRANSITIVE_RULE_57 =
  "الأفعال المتعدية Transitive Verbs هي التي يمكن أن تأخذ مفعولًا به مباشرًا، وغالبًا يمكن بناء Passive Voice منها. أما الأفعال اللازمة Intransitive Verbs فلا تأخذ مفعولًا به مباشرًا، ولذلك لا تُحوّل عادةً إلى المبني للمجهول.";

export const INTRANSITIVE_VERBS_57 = [
  { v: "arrive", ar: "يصل" },
  { v: "sleep", ar: "ينام" },
  { v: "happen", ar: "يحدث" },
  { v: "die", ar: "يموت" },
  { v: "laugh", ar: "يضحك" },
  { v: "go", ar: "يذهب" },
];

export const INTRANSITIVE_EXAMPLES_57: Example57[] = [
  { en: "The train arrives at 8.", ar: "يصل القطار الساعة الثامنة." },
  { en: "The accident happened yesterday.", ar: "وقع الحادث أمس." },
  { en: "The child laughed.", ar: "ضحك الطفل." },
];

export const TRANSITIVE_PAIR_57 = {
  can: {
    en: "The boy opened the door.",
    ar: "الولد فتح الباب.",
    passive: "The door was opened by the boy.",
    passiveAr: "فُتح الباب بواسطة الولد.",
  },
  cannot: {
    en: "The boy slept.",
    ar: "الولد نام.",
    why: "لا يمكن تحويلها إلى Passive بالطريقة المعتادة؛ فلا يوجد مفعول به.",
  },
};

export const TRANSITIVE_NOTE_57 =
  "لا تقل إن الفعل «لا يأخذ مفعولًا به أبدًا»: بعض الأفعال اللازمة تصبح متعدية في معنى آخر (مثل run a company). الحكم دائمًا على استخدام الفعل في الجملة التي أمامك، لا على الفعل في المطلق.";

/* ============================================================
   ⑪ الضمائر بعد by
   ============================================================ */

export const PRONOUNS_57 = [
  { subject: "I", object: "me", ar: "أنا ← ـني" },
  { subject: "He", object: "him", ar: "هو ← ـه" },
  { subject: "She", object: "her", ar: "هي ← ـها" },
  { subject: "We", object: "us", ar: "نحن ← ـنا" },
  { subject: "They", object: "them", ar: "هم ← ـهم" },
  { subject: "You", object: "you", ar: "أنت ← أنت" },
  { subject: "It", object: "it", ar: "هو/هي ← ـه" },
];

export const PRONOUN_EXAMPLES_57 = [
  {
    active: "I write the letters.",
    activeAr: "أنا أكتب الرسائل.",
    passive: "The letters are written by me.",
    passiveAr: "تُكتب الرسائل بواسطتي.",
    note: "I أصبح me.",
  },
  {
    active: "She cleans the room.",
    activeAr: "هي تنظف الغرفة.",
    passive: "The room is cleaned by her.",
    passiveAr: "تُنظف الغرفة بواسطتها.",
    note: "She أصبح her.",
  },
  {
    active: "They build the houses.",
    activeAr: "هم يبنون المنازل.",
    passive: "The houses are built by them.",
    passiveAr: "تُبنى المنازل بواسطتهم.",
    note: "They أصبح them.",
  },
  {
    active: "We prepare the food.",
    activeAr: "نحن نحضّر الطعام.",
    passive: "The food is prepared by us.",
    passiveAr: "يُحضّر الطعام بواسطتنا.",
    note: "We أصبح us.",
  },
];

export const PRONOUN_WHY_57 =
  "لأن by يأتي بعده ضمير مفعول به، وليس ضمير فاعل. وإذا لم يكن ذكر الفاعل مهمًا، نحذف by + الضمير كله: The food is prepared.";

/* ============================================================
   ⑫ المفرد والجمع
   ============================================================ */

export const SINGULAR_PLURAL_57 = {
  singular: {
    active: "The teacher corrects the answer.",
    activeAr: "المعلم يصحح الإجابة.",
    passive: "The answer is corrected by the teacher.",
    passiveAr: "الإجابة تُصحح بواسطة المعلم.",
    why: "السبب: The answer مفرد.",
  },
  plural: {
    active: "The teacher corrects the answers.",
    activeAr: "المعلم يصحح الإجابات.",
    passive: "The answers are corrected by the teacher.",
    passiveAr: "الإجابات تُصحح بواسطة المعلم.",
    why: "السبب: The answers جمع.",
  },
  note:
    "الفعل الأساسي في الحالتين صار corrected، لكن فعل be اختلف: is corrected ثم are corrected. المفعول به الذي انتقل إلى بداية الجملة هو الذي يحدد اختيار am / is / are.",
};

/* ============================================================
   ⑬ النفي
   ============================================================ */

export const NEGATIVE_FORMULA_57 = "Subject + am / is / are + not + V3";

export const NEGATIVE_EXAMPLES_57 = [
  { en: "The room is not cleaned every day.", ar: "الغرفة لا يتم تنظيفها كل يوم." },
  { en: "These products are not made in England.", ar: "هذه المنتجات لا تُصنع في إنجلترا." },
  { en: "The letters are not delivered on Sundays.", ar: "لا يتم تسليم الرسائل أيام الأحد." },
  { en: "This computer is not used by the manager.", ar: "هذا الحاسوب لا يُستخدم بواسطة المدير." },
];

export const NEGATIVE_CONTRACTIONS_57 = [
  { en: "The door isn't locked.", ar: "الباب ليس مغلقًا بالمفتاح.", short: "is not = isn't" },
  { en: "The documents aren't signed.", ar: "المستندات غير موقّعة.", short: "are not = aren't" },
];

export const NEGATIVE_NOTE_57 =
  "النفي يأتي بعد فعل be وقبل V3. الخطأ: The room not is cleaned. الصحيح: The room is not cleaned.";

/* ============================================================
   ⑭ الأسئلة والجواب القصير
   ============================================================ */

export const QUESTION_FORMULA_57 = "Am / Is / Are + Subject + V3 ?";

export const QUESTION_EXAMPLES_57 = [
  { en: "Is English spoken in your country?", ar: "هل تُتحدث الإنجليزية في بلدك؟" },
  { en: "Are these cars made in Japan?", ar: "هل تُصنع هذه السيارات في اليابان؟" },
  { en: "Is the room cleaned every day?", ar: "هل تُنظف الغرفة كل يوم؟" },
  { en: "Are the documents checked carefully?", ar: "هل تُفحص المستندات بعناية؟" },
];

export const SHORT_ANSWERS_57 = [
  {
    q: "Is this book written in English?",
    qAr: "هل هذا الكتاب مكتوب باللغة الإنجليزية؟",
    yes: "Yes, it is.",
    no: "No, it isn't.",
  },
  {
    q: "Are these products sold online?",
    qAr: "هل تُباع هذه المنتجات عبر الإنترنت؟",
    yes: "Yes, they are.",
    no: "No, they aren't.",
  },
];

export const WH_QUESTIONS_57 = [
  { en: "Where is this product made?", ar: "أين يُصنع هذا المنتج؟" },
  { en: "How is this machine used?", ar: "كيف تُستخدم هذه الآلة؟" },
  { en: "When are the rooms cleaned?", ar: "متى تُنظف الغرف؟" },
  { en: "Why is English taught in schools?", ar: "لماذا تُدرّس الإنجليزية في المدارس؟" },
];

export const QUESTION_NOTE_57 =
  "في السؤال ينتقل be إلى أول الجملة، ويبقى V3 في مكانه بعد الفاعل. في الجواب القصير نستخدم الضمير المناسب، ولا نعيد الجملة كلها.";

/* ============================================================
   ⑮ المقارنة
   ============================================================ */

export const COMPARE_PAIRS_57 = [
  { active: "The chef cooks the meal.", passive: "The meal is cooked by the chef.", focus: "الأول: الطاهي · الثاني: الوجبة" },
  { active: "The police arrest the thief.", passive: "The thief is arrested by the police.", focus: "الأول: الشرطة · الثاني: اللص" },
  { active: "People speak English here.", passive: "English is spoken here.", focus: "الثاني بلا فاعل: انتشار اللغة" },
  { active: "The company makes computers.", passive: "Computers are made by the company.", focus: "الأول: الشركة · الثاني: الحواسيب" },
  { active: "The students clean the classroom.", passive: "The classroom is cleaned by the students.", focus: "الأول: الطلاب · الثاني: الفصل" },
  { active: "My father washes the car.", passive: "The car is washed by my father.", focus: "الأول: أبي · الثاني: السيارة" },
];

export const TRANSLATION_STYLES_57 = [
  { style: "يتم", example: "The car is washed every week.", ar: "يتم غسل السيارة كل أسبوع." },
  { style: "يُـ / تُـ", example: "The car is washed every week.", ar: "تُغسل السيارة كل أسبوع." },
  { style: "جرى", example: "The experiment was conducted carefully.", ar: "جرى إجراء التجربة بعناية." },
  { style: "تم", example: "The documents were delivered yesterday.", ar: "تم تسليم المستندات أمس." },
];

export const TRANSLATION_NOTE_57 =
  "الترجمة ليست دائمًا حرفية. كل الصيغ الأربع (يتم / يُـ / جرى / تم) تصف حدثًا في العربية، لكن اختيار الصيغة يتبع السياق وأسلوب النص، لا قاعدة آلية. ولا تترجم «by» دائمًا بـ«بواسطة»: أحيانًا تكون الترجمة الطبيعية «تُغسل السيارة بأبي» أو تُحذف تمامًا.";

/* ============================================================
   ⑯ الأخطاء الشائعة
   ============================================================ */

export type Error57 = {
  id: string;
  title: string;
  wrong: string;
  right: string;
  why: string;
  segments?: string[];
  badIndex?: number;
};

export const COMMON_ERRORS_57: Error57[] = [
  {
    id: "missing-be",
    title: "الخطأ الأول: نسيان فعل be",
    wrong: "The room cleaned every day.",
    right: "The room is cleaned every day.",
    why: "نحتاج إلى فعل be في المبني للمجهول. بدونه تصبح الجملة ناقصة.",
    segments: ["The room", "cleaned", "every day."],
    badIndex: 1,
  },
  {
    id: "v2",
    title: "الخطأ الثاني: استخدام V2 بدل V3",
    wrong: "The letter is wrote by Sara.",
    right: "The letter is written by Sara.",
    why: "write ← wrote ← written. بعد is نستخدم V3.",
    segments: ["The letter", "is", "wrote", "by Sara."],
    badIndex: 2,
  },
  {
    id: "plural-be",
    title: "الخطأ الثالث: اختيار is مع الجمع",
    wrong: "The books is sold here.",
    right: "The books are sold here.",
    why: "Books جمع، لذلك are.",
    segments: ["The books", "is", "sold", "here."],
    badIndex: 1,
  },
  {
    id: "order",
    title: "الخطأ الرابع: وضع الفاعل قبل المفعول به",
    wrong: "The teacher is explained by the lesson.",
    right: "The lesson is explained by the teacher.",
    why: "الدرس هو الذي وقع عليه فعل الشرح. المفعول به يأتي أولًا في المبني للمجهول.",
    segments: ["The teacher", "is explained", "by the lesson."],
    badIndex: 0,
  },
  {
    id: "pronoun",
    title: "الخطأ الخامس: استخدام ضمير الفاعل بعد by",
    wrong: "The room is cleaned by she.",
    right: "The room is cleaned by her.",
    why: "بعد by نستخدم ضمير المفعول به: her لا she.",
    segments: ["The room", "is cleaned", "by she."],
    badIndex: 2,
  },
  {
    id: "intransitive",
    title: "الخطأ السادس: محاولة تحويل فعل لا يأخذ مفعولًا به",
    wrong: "The accident is happened yesterday.",
    right: "The accident happened yesterday.",
    why: "الفعل happen لا يأخذ مفعولًا به مباشرًا في هذا الاستخدام، لذلك لا نحوله إلى Passive.",
    segments: ["The accident", "is happened", "yesterday."],
    badIndex: 1,
  },
];

/* ============================================================
   ⑰ الحوار التطبيقي — At the School
   ============================================================ */

export const DIALOGUE_57 = [
  {
    who: "Teacher",
    en: "Good morning, everyone. Is the classroom cleaned every day?",
    ar: "صباح الخير جميعًا. هل يتم تنظيف الفصل كل يوم؟",
  },
  {
    who: "Student",
    en: "Yes, it is cleaned every afternoon.",
    ar: "نعم، يتم تنظيفه كل بعد ظهر.",
  },
  {
    who: "Teacher",
    en: "Are the desks arranged before the lessons?",
    ar: "هل يتم ترتيب المقاعد قبل الدروس؟",
  },
  {
    who: "Student",
    en: "Yes, they are arranged by the school staff.",
    ar: "نعم، يتم ترتيبها بواسطة موظفي المدرسة.",
  },
  {
    who: "Teacher",
    en: "Is English taught in this school?",
    ar: "هل تُدرّس الإنجليزية في هذه المدرسة؟",
  },
  {
    who: "Student",
    en: "Yes, English is taught by qualified teachers.",
    ar: "نعم، تُدرّس الإنجليزية بواسطة معلمين مؤهلين.",
  },
  {
    who: "Teacher",
    en: "Are computers used in your lessons?",
    ar: "هل تُستخدم الحواسيب في دروسكم؟",
  },
  {
    who: "Student",
    en: "Yes, they are used in many lessons.",
    ar: "نعم، تُستخدم في دروس كثيرة.",
  },
  {
    who: "Teacher",
    en: "Excellent. And are the homework assignments checked regularly?",
    ar: "ممتاز. وهل يتم تصحيح الواجبات بانتظام؟",
  },
  {
    who: "Student",
    en: "Yes, they are checked by our teachers.",
    ar: "نعم، يتم تصحيحها بواسطة معلمينا.",
  },
];

export const DIALOGUE_QA_57 = [
  { q: "Is the classroom cleaned every day?", a: "Yes, it is.", why: "الجواب القصير يستخدم it لأن classroom مفرد." },
  { q: "When is the classroom cleaned?", a: "Every afternoon.", why: "الطالب ذكر الوقت في جملته: every afternoon." },
  { q: "Who arranges the desks?", a: "The school staff.", why: "by the school staff تحدّد الفاعل الأصلي." },
  { q: "Is English taught at the school?", a: "Yes, it is.", why: "السؤال عن الإنجليزية (مفرد غير معدود) ⇒ it." },
  { q: "Are computers used in the lessons?", a: "Yes, they are.", why: "computers جمع ⇒ they are." },
  { q: "Who checks the homework assignments?", a: "The teachers.", why: "by our teachers تحدّد من يصحّح الواجبات." },
];

/* ============================================================
   ⑱ قطعة القراءة — How Products Are Made
   ============================================================ */

export const READING_TITLE_57 = "How Products Are Made";

export const READING_57 = [
  "Many products are made in factories around the world. Every day, thousands of items are produced, checked, packed, and delivered to customers.",
  "First, raw materials are collected and transported to factories. Then, the materials are used to make different products. Machines are operated by trained workers, and the products are checked carefully before they are packed.",
  "In some factories, computers are used to control the production process. This helps companies work faster and reduce mistakes.",
  "After the products are completed, they are placed in boxes. The boxes are labeled and transported to shops. Finally, the products are sold to customers.",
  "Not every product is made in the same way. Some products are made by hand, while others are produced by large machines.",
  "The manufacturing process is important because good products must be made carefully and safely.",
];

export const READING_AR_57 = [
  "تُصنع منتجات كثيرة في مصانع حول العالم. كل يوم، تُنتج آلاف القطع وتُفحص وتُعبأ وتُسلّم إلى العملاء.",
  "أولًا، تُجمع المواد الخام وتُنقل إلى المصانع. ثم تُستخدم المواد لصنع منتجات مختلفة. تُشغّل الآلات عمال مدربون، وتُفحص المنتجات بعناية قبل تعبئتها.",
  "في بعض المصانع تُستخدم الحواسيب للسيطرة على عملية الإنتاج. هذا يساعد الشركات على العمل بشكل أسرع وتقليل الأخطاء.",
  "بعد إكمال المنتجات، تُوضع في صناديق. تُوضع الملصقات على الصناديق وتُنقل إلى المتاجر. أخيرًا، تُباع المنتجات للعملاء.",
  "ليست كل المنتجات مصنوعة بالطريقة نفسها. بعض المنتجات تُصنع يدويًا، بينما تُنتج أخرى بواسطة آلات كبيرة.",
  "عملية التصنيع مهمة لأن المنتجات الجيدة يجب أن تُصنع بعناية وبأمان.",
];

export const VOCABULARY_57 = [
  { en: "products", ar: "منتجات" },
  { en: "factories", ar: "مصانع" },
  { en: "items", ar: "سلع أو قطع" },
  { en: "produced", ar: "تُنتج" },
  { en: "checked", ar: "تُفحص" },
  { en: "packed", ar: "تُعبأ" },
  { en: "delivered", ar: "تُسلّم" },
  { en: "raw materials", ar: "مواد خام" },
  { en: "transported", ar: "تُنقل" },
  { en: "operated", ar: "تُشغّل" },
  { en: "trained workers", ar: "عمال مدربون" },
  { en: "production process", ar: "عملية الإنتاج" },
  { en: "reduce mistakes", ar: "يقلل الأخطاء" },
  { en: "labeled", ar: "توضع عليها ملصقات" },
  { en: "manufacturing", ar: "التصنيع" },
  { en: "safely", ar: "بأمان" },
];

export const READING_QA_57 = [
  { q: "Where are many products made?", a: "They are made in factories around the world." },
  { q: "What happens to raw materials first?", a: "They are collected and transported to factories." },
  { q: "Who operates the machines?", a: "The machines are operated by trained workers." },
  {
    q: "Why are computers used in some factories?",
    a: "They are used to control the production process and help companies work faster and reduce mistakes.",
  },
  { q: "What happens after the products are completed?", a: "They are placed in boxes, labeled, and transported to shops." },
  {
    q: "Are all products made in the same way?",
    a: "No. Some products are made by hand, while others are produced by machines.",
  },
  {
    q: "Give two examples of Passive Voice from the passage.",
    a: "Raw materials are collected. · The products are checked carefully. · Computers are used. · The products are sold to customers.",
    why: "كل مثال من هذه الأمثلة تركيب Object + be + V3، وقد حُذف الفاعل الأصلي لأنه غير مهم أو غير معروف.",
  },
];

/* ============================================================
   ⑲ الملخص النهائي
   ============================================================ */

export const SUMMARY_57 = [
  {
    n: "أولًا",
    title: "Active Voice",
    formula: "Subject + Verb + Object",
    example: "The teacher explains the lesson.",
    ar: "المعلم يشرح الدرس.",
  },
  {
    n: "ثانيًا",
    title: "Passive Voice",
    formula: "Object + be + V3",
    example: "The lesson is explained by the teacher.",
    ar: "الدرس يتم شرحه بواسطة المعلم.",
  },
  {
    n: "ثالثًا",
    title: "Present Simple Passive",
    formula: "am / is / are + V3",
    example: "The room is cleaned. · The books are sold.",
    ar: "الغرفة تُنظف. · الكتب تُباع.",
  },
  {
    n: "رابعًا",
    title: "النفي",
    formula: "am / is / are + not + V3",
    example: "The room isn't cleaned.",
    ar: "الغرفة لا يتم تنظيفها.",
  },
  {
    n: "خامسًا",
    title: "السؤال",
    formula: "Am / Is / Are + Subject + V3?",
    example: "Is English spoken here?",
    ar: "هل تُتحدث الإنجليزية هنا؟",
  },
  {
    n: "سادسًا",
    title: "ذكر الفاعل الأصلي",
    formula: "by + object pronoun أو اسم",
    example: "The book is written by Sara.",
    ar: "الكتاب مكتوب بواسطة سارة.",
  },
  {
    n: "سابعًا",
    title: "ليست كل الجمل قابلة للتحويل",
    formula: "Transitive ✓ · Intransitive ✗",
    example: "The door was opened. ✓ · The baby sleeps. ✗",
    ar: "يجب أن يكون الفعل مستخدمًا مع مفعول به مباشر يمكن نقله إلى بداية الجملة.",
  },
];

/* ============================================================
   ⑳ مقياس التقييم (من المصدر) — 25 سؤالًا
   ============================================================ */

export const RATING_ROWS_57 = [
  { range: "23–25", label: "ممتاز جدًا", tone: "elite" },
  { range: "20–22", label: "ممتاز", tone: "great" },
  { range: "17–19", label: "جيد جدًا", tone: "good" },
  { range: "14–16", label: "جيد", tone: "ok" },
  { range: "10–13", label: "تحتاج إلى مراجعة", tone: "review" },
  { range: "أقل من 10", label: "أعد دراسة القاعدة والتطبيقات", tone: "restart" },
];

export const RATING_ADVICE_57 =
  "إذا أخطأت في اختيار is أو are، فراجع المفعول به الذي انتقل إلى بداية الجملة. وإذا أخطأت في V3، فراجع تصريفات الأفعال غير المنتظمة.";

/* ============================================================
   ㉑ مهمة الكتابة
   ============================================================ */

export const WRITING_TASK_57 = {
  title: "How Things Are Made and Used",
  titleAr: "كيف تُصنع الأشياء وتُستخدم؟",
  words: "100 – 130 كلمة",
  intro:
    "اكتب فقرة إنجليزية عن مصنع أو مدرسة أو مستشفى أو شركة، واستخدم المبني للمجهول في Present Simple.",
  requirements: [
    "خمس جمل على الأقل في Passive Voice.",
    "مثالان باستخدام by + الفاعل.",
    "مثالان لا تذكر فيهما الفاعل الأصلي.",
    "جملة منفية واحدة على الأقل.",
    "سؤال واحد باستخدام Passive Voice.",
  ],
  starterEn:
    "Many useful products are made in factories around the world. Raw materials are collected and used to produce different items. The products are checked carefully before they are sold.",
  starterAr:
    "تُصنع منتجات مفيدة كثيرة في مصانع حول العالم. تُجمع المواد الخام وتُستخدم لإنتاج سلع مختلفة. تُفحص المنتجات بعناية قبل بيعها.",
  checklist: [
    { id: "five", label: "خمس جمل Passive على الأقل" },
    { id: "by", label: "مثالان بـ by + Agent" },
    { id: "noAgent", label: "مثالان بلا فاعل أصلي" },
    { id: "negative", label: "جملة منفية واحدة" },
    { id: "question", label: "سؤال بـ Passive" },
  ],
};

/* ============================================================
   ㉒ مهمة التحدث
   ============================================================ */

export const SPEAKING_TASK_57 = {
  intro:
    "تحدّث باللغة الإنجليزية عن الأشياء التي تُصنع أو تُستخدم في حياتك اليومية. أجب عن الأسئلة التالية بجمل كاملة، وحاول أن تستخدم Passive Voice في كل إجابة.",
  questions: [
    "Is English taught in your school?",
    "Are computers used in your classes?",
    "How is food prepared in your home?",
    "Where are smartphones made?",
    "Are books read regularly by students?",
    "What products are made in your country?",
    "How are roads repaired?",
  ],
  example: {
    q: "Are computers used in your classes?",
    a: "Yes, computers are used in some of our classes.",
    ar: "نعم، تُستخدم الحواسيب في بعض دروسنا.",
  },
  tips: [
    "ابدأ بالجواب القصير (Yes, it is. / No, they aren't.) ثم أضف تفصيلًا.",
    "انتبه إلى be: it is · they are · English is.",
    "استخدم by فقط عندما تكون هوية الفاعل مهمة.",
  ],
};
