/**
 * Lesson 51 — ZERO CONDITIONAL
 * "THE LAW OF CAUSE & EFFECT — مختبر السبب والنتيجة"
 * Student-facing teaching content only. Assessment solutions live in
 * `testKey51.ts`; practice solutions live in `practiceKey51.ts`.
 */
export type Tone51 =
  | "law"
  | "habit"
  | "negative"
  | "future"
  | "modal"
  | "review";

export type Example51 = { en: string; ar: string; tag?: string; tone?: Tone51 };
export type Table51 = {
  head: readonly string[];
  rows: readonly { label: string; cells: readonly string[] }[];
  note?: string;
};

export type SlideKind51 =
  | "cover"
  | "goals"
  | "intro"
  | "concept"
  | "causeLab"
  | "lesson"
  | "comparison"
  | "verbLab"
  | "factLab"
  | "negLab"
  | "orderLab"
  | "whenLab"
  | "modalLab"
  | "errors"
  | "detective"
  | "dialogue"
  | "reading"
  | "readingQuestions"
  | "readingHunt"
  | "practice"
  | "test"
  | "teacher"
  | "writing"
  | "review"
  | "dashboard"
  | "progress"
  | "roadmap";

export type Slide51 = {
  id: string;
  station: string;
  kind: SlideKind51;
  title: string;
  lead?: string;
  mascot?: string;
  tone?: Tone51;
  formula?: readonly string[];
  formulaGlosses?: readonly string[];
  examples?: readonly Example51[];
  points?: readonly string[];
  note?: string;
  tip?: string;
  table?: Table51;
  practiceSet?: string;
  dialogue?: string;
};

export const STATIONS_51 = [
  { id: "opening", title: "البداية" },
  { id: "meaning", title: "معنى الشرط" },
  { id: "definition", title: "ما هو Zero Conditional" },
  { id: "formula", title: "القاعدة والتصريف" },
  { id: "science", title: "الحقائق العلمية" },
  { id: "rules", title: "القواعد العامة" },
  { id: "habits", title: "العادات المتكررة" },
  { id: "negative", title: "النفي" },
  { id: "questions", title: "الأسئلة" },
  { id: "order", title: "ترتيب الجملة" },
  { id: "if-when", title: "IF وWHEN" },
  { id: "modals", title: "الأفعال الناقصة" },
  { id: "zero-first", title: "Zero وFirst" },
  { id: "mistakes", title: "الأخطاء الشائعة" },
  { id: "dialogue", title: "الحوار" },
  { id: "reading", title: "القراءة" },
  { id: "practice", title: "التدريبات" },
  { id: "writing", title: "الكتابة والتحدث" },
  { id: "review", title: "الملخص والمراجعة" },
  { id: "final-test", title: "الاختبار النهائي" },
  { id: "teacher", title: "مساحة المعلم" },
  { id: "progress", title: "التقدم والدرس القادم" },
] as const;

export const GOALS_51 = [
  "فهم معنى الشرط IF وعلاقة الشرط Condition بالنتيجة Result.",
  "تعريف Zero Conditional واستخداماته: الحقائق والقواعد والعادات والنتائج المتكررة.",
  "إتقان القاعدة الأساسية: IF + PRESENT SIMPLE, PRESENT SIMPLE.",
  "تصريف الأفعال مع جميع الضمائر، وإضافة S / ES مع He / She / It في جزأي الجملة.",
  "استخدام DON'T وDOESN'T لنفي الشرط أو النتيجة أو كليهما، مع V1 بعدهما.",
  "تكوين الأسئلة باستخدام What happens if...? وWhat do you do if...?",
  "ترتيب جملة IF أولًا أو آخرًا مع قاعدة الفاصلة.",
  "التمييز بين IF وWHEN في التركيز والمعنى.",
  "استخدام CAN وMUST وSHOULD وMAY وMIGHT في جزء النتيجة عندما يقتضي المعنى ذلك.",
  "التمييز الدقيق بين Zero Conditional وFirst Conditional، مع مقارنة تمهيدية للشرط الثاني والثالث.",
] as const;

/* ============================================================
   المدخل: معنى الشرط — Condition → Result
   ============================================================ */

export const INTRO_PAIR_51 = {
  condition: { en: "If you study", ar: "إذا درست" },
  result: { en: "You learn.", ar: "فإنك تتعلم." },
  full: { en: "If you study, you learn.", ar: "إذا درست، فإنك تتعلم." },
} as const;

export const INTRO_CASES_51 = [
  {
    id: "ic1",
    en: "If you heat water to 100°C at standard atmospheric pressure, it boils.",
    ar: "إذا سخّنت الماء إلى 100 درجة مئوية عند الضغط الجوي القياسي، فإنه يغلي.",
    fn: "هذه حقيقة علمية.",
    tone: "law" as Tone51,
  },
  {
    id: "ic2",
    en: "If I drink coffee at night, I can't sleep easily.",
    ar: "إذا شربت القهوة ليلًا، لا أستطيع النوم بسهولة.",
    fn: "هذه عادة أو نتيجة تتكرر.",
    tone: "habit" as Tone51,
  },
  {
    id: "ic3",
    en: "If people don't eat, they get hungry.",
    ar: "إذا لم يأكل الناس، فإنهم يشعرون بالجوع.",
    fn: "هذه حقيقة عامة.",
    tone: "law" as Tone51,
  },
] as const;

/* ============================================================
   الاستخدامات الخمسة
   ============================================================ */

export const USES_51 = [
  { n: "①", title: "الحقائق العلمية", ex: "If water freezes, it turns into ice.", exAr: "إذا تجمد الماء، فإنه يتحول إلى ثلج." },
  { n: "②", title: "الحقائق الطبيعية", ex: "If the sun sets, it gets dark.", exAr: "إذا غربت الشمس، يحل الظلام." },
  { n: "③", title: "القواعد العامة", ex: "If you don't follow the rules, you get a warning.", exAr: "إذا لم تتبع القواعد، تحصل على تحذير." },
  { n: "④", title: "النتائج المتكررة دائمًا", ex: "If you freeze water, it turns into ice.", exAr: "إذا جمّدت الماء، فإنه يتحول إلى ثلج." },
  { n: "⑤", title: "العادات والسلوكيات المتكررة", ex: "If I feel tired, I take a break.", exAr: "إذا شعرت بالتعب، آخذ استراحة." },
] as const;

/* ============================================================
   التصريف مع الضمائر
   ============================================================ */

export const CONJUGATION_ROWS_51: Table51 = {
  head: ["الفاعل", "الشرط (IF + فعل)", "النتيجة (فعل)", "قاعدة التصريف"],
  rows: [
    { label: "I", cells: ["If I drink coffee", "I feel energetic", "الفعل الأساسي V1"] },
    { label: "You", cells: ["If you heat ice", "it melts", "الفعل الأساسي V1"] },
    { label: "We / They", cells: ["If they exercise", "they feel better", "الفعل الأساسي V1"] },
    { label: "He", cells: ["If he eats too much", "he feels sick", "نضيف S / ES"] },
    { label: "She", cells: ["If she studies regularly", "she improves", "نضيف S / ES"] },
    { label: "It", cells: ["If water reaches 100°C", "it boils", "نضيف S / ES"] },
  ],
  note: "انتبه: الفعل في جزء IF أيضًا يتبع قواعد المضارع البسيط نفسها. بعد DOESN'T يعود الفعل إلى صورته الأساسية V1.",
};

export const CONJUGATION_ALERTS_51 = [
  { bad: "If he heat water, it boils. ✗", good: "If he heats water, it boils. ✓", why: "الفاعل HE يطلب إضافة S إلى الفعل في جزء الشرط نفسه." },
  { bad: "If she study, she learns. ✗", good: "If she studies, she learns. ✓", why: "الفاعل SHE يطلب إضافة S، في الشرط والنتيجة معًا." },
  { bad: "If he doesn't studies, he fails. ✗", good: "If he doesn't study, he fails. ✓", why: "بعد DOESN'T نستخدم الفعل الأساسي V1 دون S." },
] as const;

export const WILL_NOTE_51 = {
  zero: { en: "If you heat ice, it melts.", ar: "هذه هي الصيغة المعتادة للحقيقة العامة." },
  first: { en: "If you heat ice, it will melt.", ar: "قد تكون صحيحة في سياق توقع نتيجة محددة، لكنها ليست الصيغة النموذجية للشرط الصفري." },
} as const;

/* ============================================================
   الحقائق العلمية الستة
   ============================================================ */

export const SCIENCE_FACTS_51 = [
  {
    id: "sf1",
    en: "If you heat water to 100°C at standard atmospheric pressure, it boils.",
    ar: "إذا سخّنت الماء إلى 100 درجة مئوية عند الضغط الجوي القياسي، فإنه يغلي.",
    label: "الماء",
    tone: "law" as Tone51,
  },
  {
    id: "sf2",
    en: "If ice gets warm enough, it melts.",
    ar: "إذا أصبح الثلج دافئًا بما يكفي، فإنه يذوب.",
    label: "الثلج",
    tone: "law" as Tone51,
  },
  {
    id: "sf3",
    en: "If plants don't receive enough sunlight, they grow poorly.",
    ar: "إذا لم تحصل النباتات على ضوء شمس كافٍ، فإن نموها يكون ضعيفًا.",
    label: "النباتات",
    tone: "law" as Tone51,
  },
  {
    id: "sf4",
    en: "If you drop an object, it falls.",
    ar: "إذا أسقطت جسمًا، فإنه يسقط.",
    label: "الجاذبية",
    tone: "law" as Tone51,
  },
  {
    id: "sf5",
    en: "If metal gets hot, it expands.",
    ar: "إذا ارتفعت حرارة المعدن، فإنه يتمدد.",
    label: "الحرارة",
    tone: "law" as Tone51,
  },
  {
    id: "sf6",
    en: "If light passes through a prism, it separates into different colours.",
    ar: "إذا مر الضوء عبر منشور زجاجي، فإنه ينفصل إلى ألوان مختلفة.",
    label: "الضوء",
    tone: "law" as Tone51,
  },
] as const;

export const PRESSURE_NOTE_51 =
  "دقة علمية: درجة غليان الماء ليست ثابتة في كل الظروف؛ الرقم 100°C صحيح عند الضغط الجوي القياسي، وتنخفض درجة الغليان مع انخفاض الضغط مثل المرتفعات الجبلية.";

/* ============================================================
   مختبر السبب والنتيجة — Condition → Result Lab
   ============================================================ */

export type CauseCase51 = {
  id: string;
  condition: string;
  conditionAr: string;
  options: readonly { id: string; en: string; note: string }[];
  correct: string;
  why: string;
  tone: Tone51;
};

export const CAUSE_CASES_51: readonly CauseCase51[] = [
  {
    id: "cc1",
    condition: "If you heat ice…",
    conditionAr: "إذا سخّنت الثلج…",
    options: [
      { id: "melts", en: "…it melts.", note: "نتيجة ثابتة" },
      { id: "will-melt", en: "…it will melt tomorrow.", note: "نتيجة مستقبلية محددة" },
      { id: "melted", en: "…it melted.", note: "زمن ماضٍ" },
    ],
    correct: "melts",
    why: "سخّان الثلج يقود إلى نتيجة عامة تتكرر دائمًا: it melts. الصيغة النموذجية للشرط الصفري هي المضارع البسيط في الطرفين، دون WILL ودون ماضٍ.",
    tone: "law",
  },
  {
    id: "cc2",
    condition: "If plants don't get water…",
    conditionAr: "إذا لم تحصل النباتات على الماء…",
    options: [
      { id: "die", en: "…they die.", note: "نتيجة عامة" },
      { id: "dies", en: "…they dies.", note: "تصريف خاطئ مع They" },
      { id: "will-died", en: "…they will died.", note: "تركيب خاطئ" },
    ],
    correct: "die",
    why: "الفاعل THEY جمع، فيأتي الفعل الأساسي دون S: they die. أما they dies فتصريف خاطئ، وthey will died تركيب غير صحيح (will يتبعه V1).",
    tone: "law",
  },
  {
    id: "cc3",
    condition: "If my brother feels tired…",
    conditionAr: "إذا شعر أخي بالتعب…",
    options: [
      { id: "naps", en: "…he takes a nap.", note: "عادة متكررة مع He" },
      { id: "nap", en: "…he take a nap.", note: "ينقصه S" },
      { id: "took", en: "…he took a nap.", note: "ماضٍ دون سبب" },
    ],
    correct: "naps",
    why: "الفاعل HE يطلب إضافة S في الطرفين: If he feels tired, he takes a nap. هذه عادة متكررة، فنستخدم المضارع البسيط لا الماضي.",
    tone: "habit",
  },
  {
    id: "cc4",
    condition: "If you press this button…",
    conditionAr: "إذا ضغطت هذا الزر…",
    options: [
      { id: "starts", en: "…the machine starts.", note: "نتيجة ثابتة" },
      { id: "start", en: "…the machine start.", note: "ينقصه S مع المفرد" },
      { id: "starting", en: "…the machine starting.", note: "غير مكتمل" },
    ],
    correct: "starts",
    why: "الفاعل THE MACHINE مفرد، فيأخذ الفعل S: the machine starts. النتيجة ثابتة كلما تحقق الشرط.",
    tone: "law",
  },
];

/* ============================================================
   القواعد والنتائج العامة
   ============================================================ */

export const RULES_CASES_51 = [
  { en: "If you don't follow the rules, you get a warning.", ar: "إذا لم تتبع القواعد، تحصل على تحذير." },
  { en: "If students arrive late, they miss the beginning of the lesson.", ar: "إذا وصل الطلاب متأخرين، يفوتهم بداية الدرس." },
  { en: "If you don't charge your phone, its battery runs out.", ar: "إذا لم تشحن هاتفك، تنفد بطاريته." },
  { en: "If you don't save your work, you lose your changes when the computer shuts down.", ar: "إذا لم تحفظ عملك، تفقد التعديلات عندما ينطفئ الحاسوب." },
  { en: "If people drive too fast, they increase the risk of accidents.", ar: "إذا قاد الناس بسرعة كبيرة، فإنهم يزيدون خطر الحوادث." },
] as const;

/* ============================================================
   العادات والسلوكيات المتكررة
   ============================================================ */

export const HABIT_CASES_51 = [
  { en: "If I wake up early, I feel more productive.", ar: "إذا استيقظت مبكرًا، أشعر أنني أكثر إنتاجية." },
  { en: "If my brother gets bored, he plays video games.", ar: "إذا شعر أخي بالملل، يلعب ألعاب الفيديو." },
  { en: "If I have free time, I read a book.", ar: "إذا كان لدي وقت فراغ، أقرأ كتابًا." },
  { en: "If she feels stressed, she listens to music.", ar: "إذا شعرت بالتوتر، تستمع إلى الموسيقى." },
  { en: "If we visit our grandparents, we usually eat together.", ar: "إذا زرنا أجدادنا، فإننا نتناول الطعام معًا عادةً." },
] as const;

export const FACT_VS_HABIT_51 = {
  fact: {
    en: "If you heat ice, it melts.",
    ar: "إذا سخّنت الثلج، فإنه يذوب.",
    fn: "حقيقة طبيعية: النتيجة واحدة دائمًا.",
    tone: "law" as Tone51,
  },
  habit: {
    en: "If I feel tired, I drink some water and rest.",
    ar: "إذا شعرت بالتعب، أشرب بعض الماء وأرتاح.",
    fn: "عادة شخصية: نتيجة تتكرر مع صاحبها.",
    tone: "habit" as Tone51,
  },
} as const;

/* ============================================================
   النفي
   ============================================================ */

export type NegCase51 = {
  id: string;
  prompt: string;
  promptAr: string;
  options: readonly string[];
  correct: string;
  why: string;
};

export const NEG_CASES_51: readonly NegCase51[] = [
  {
    id: "nb1",
    prompt: "If you … water plants, they die. (not)",
    promptAr: "ابنِ نفي الشرط: إذا لم تسقِ النباتات، فإنها تموت.",
    options: ["don't water", "doesn't water", "not water"],
    correct: "don't water",
    why: "الفاعل YOU يستخدم DON'T + V1 (water). أما DOESN'T فللهي/الشيء، وnot water تركيب ناقص بلا فعل مساعد.",
  },
  {
    id: "nb2",
    prompt: "If he … enough, he feels tired. (not sleep)",
    promptAr: "ابنِ نفي الشرط مع He.",
    options: ["doesn't sleep", "don't sleep", "doesn't sleeps"],
    correct: "doesn't sleep",
    why: "مع He نستخدم DOESN'T ثم الفعل الأساسي sleep دون S: If he doesn't sleep enough, he feels tired.",
  },
  {
    id: "nb3",
    prompt: "If I drink coffee late, I … well. (not sleep)",
    promptAr: "ابنِ نفي النتيجة.",
    options: ["don't sleep", "doesn't sleep", "not sleep"],
    correct: "don't sleep",
    why: "نفي النتيجة يتبع قواعد المضارع البسيط نفسها: الفاعل I يستخدم DON'T + V1: I don't sleep well.",
  },
  {
    id: "nb4",
    prompt: "If she eats too quickly, she … her food. (not enjoy)",
    promptAr: "ابنِ نفي النتيجة مع She.",
    options: ["doesn't enjoy", "don't enjoy", "doesn't enjoys"],
    correct: "doesn't enjoy",
    why: "الفاعل SHE يطلب DOESN'T + V1: she doesn't enjoy her food. وenjoy لا تأخذ S بعد DOESN'T.",
  },
  {
    id: "nb5",
    prompt: "If you …, you … . (not practise / not improve)",
    promptAr: "انفِ الشرط والنتيجة معًا.",
    options: ["don't practise / don't improve", "doesn't practise / doesn't improve", "not practise / not improve"],
    correct: "don't practise / don't improve",
    why: "الطرفان مع YOU ينفيان بـDON'T + V1: If you don't practise, you don't improve. النفي في الشرط والنتيجة يتبع الفاعل في كل طرف.",
  },
  {
    id: "nb6",
    prompt: "If he … his laptop, it … for long. (not charge / not work)",
    promptAr: "انفِ الطرفين مع He وIt.",
    options: ["doesn't charge / doesn't work", "don't charge / don't work", "doesn't charges / doesn't works"],
    correct: "doesn't charge / doesn't work",
    why: "مع He وIt نستخدم DOESN'T + V1 في الطرفين: If he doesn't charge his laptop, it doesn't work for long.",
  },
] as const;

/* ============================================================
   الأسئلة
   ============================================================ */

export const QUESTION_FORMS_51 = [
  {
    id: "result",
    title: "سؤال عن النتيجة",
    q: "What happens if you heat ice?",
    qAr: "ماذا يحدث إذا سخّنت الثلج؟",
    a: "It melts.",
    aAr: "إنه يذوب.",
    note: "What happens if…? تسأل عن النتيجة العامة، والإجابة تبدأ بالنتيجة مباشرة.",
    tone: "law" as Tone51,
  },
  {
    id: "habit",
    title: "سؤال عن عادة شخص",
    q: "What do you do if you feel tired?",
    qAr: "ماذا تفعل إذا شعرت بالتعب؟",
    a: "I take a short break.",
    aAr: "آخذ استراحة قصيرة.",
    note: "What do you do if…? تسأل عن عادة أو رد فعل شخصي، وتستخدم DOES مع الغائب: What does your brother do if he gets angry?",
    tone: "habit" as Tone51,
  },
] as const;

export const QUESTION_CASES_51 = [
  {
    id: "q1",
    q: "What happens if people don't drink enough water?",
    qAr: "ماذا يحدث إذا لم يشرب الناس كمية كافية من الماء؟",
    a: "They become dehydrated.",
    aAr: "يصابون بالجفاف.",
    form: "What happens if…?",
  },
  {
    id: "q2",
    q: "What does your brother do if he gets angry?",
    qAr: "ماذا يفعل أخوك إذا غضب؟",
    a: "He usually goes for a walk.",
    aAr: "عادةً يذهب للمشي.",
    form: "What does … do if…?",
  },
] as const;

/* ============================================================
   ترتيب الجملة والفاصلة
   ============================================================ */

export const ORDER_PAIRS_51 = [
  {
    id: "o1",
    first: { en: "If you heat ice, it melts.", ar: "إذا سخّنت الثلج، فإنه يذوب.", note: "الشرط أولًا → نضع فاصلة." },
    second: { en: "Ice melts if you heat it.", ar: "يذوب الثلج إذا سخّنته.", note: "النتيجة أولًا → لا نحتاج فاصلة عادةً." },
  },
  {
    id: "o2",
    first: { en: "If I feel sick, I stay at home.", ar: "إذا شعرت بالمرض، أبقى في المنزل.", note: "فاصلة بعد جملة الشرط." },
    second: { en: "I stay at home if I feel sick.", ar: "أبقى في المنزل إذا شعرت بالمرض.", note: "لا فاصلة عند البدء بالنتيجة." },
  },
  {
    id: "o3",
    first: { en: "If you don't water the flowers, they die.", ar: "إذا لم تسقِ الأزهار، فإنها تموت.", note: "الشرط المنفي أولًا مع فاصلة." },
    second: { en: "Flowers die if you don't water them.", ar: "تموت الأزهار إذا لم تسقها.", note: "المعنى لا يتغير بتغير الترتيب." },
  },
] as const;

export type OrderTask51 = {
  id: string;
  words: readonly string[];
  correct: string;
  alternative?: string;
  why: string;
};

export const ORDER_TASKS_51: readonly OrderTask51[] = [
  {
    id: "or1",
    words: ["melts.", "it", "heat ice,", "If you"],
    correct: "If you heat ice, it melts.",
    why: "جملة IF أولًا: تبدأ بـIf + المضارع البسيط، ثم فاصلة، ثم النتيجة بالمضارع البسيط.",
  },
  {
    id: "or2",
    words: ["if", "The machine starts", "this button.", "you press"],
    correct: "The machine starts if you press this button.",
    alternative: "If you press this button, the machine starts.",
    why: "يمكن أن تبدأ الجملة بالنتيجة ثم IF دون فاصلة، أو بجملة IF ثم فاصلة ثم النتيجة. الترتيبان يحملان المعنى نفسه.",
  },
  {
    id: "or3",
    words: ["get hungry.", "they", "If people don't eat,"],
    correct: "If people don't eat, they get hungry.",
    why: "الشرط المنفي أولًا، فاصلة، ثم النتيجة. انتبه إلى DON'T + V1 (eat) مع PEOPLE.",
  },
  {
    id: "or4",
    words: ["if", "Flowers die", "water them.", "you don't"],
    correct: "Flowers die if you don't water them.",
    why: "النتيجة أولًا بلا فاصلة، ثم IF مع الشرط المنفي: don't + V1.",
  },
] as const;

/* ============================================================
   IF وWHEN
   ============================================================ */

export type WhenCase51 = {
  id: string;
  scene: string;
  sceneAr: string;
  options: readonly { id: string; en: string; note: string }[];
  correct: string;
  why: string;
};

export const WHEN_CASES_51: readonly WhenCase51[] = [
  {
    id: "wc1",
    scene: "تحدث عن عادة ليلية متكررة: شرب القهوة يؤثر في نومك كل مرة.",
    sceneAr: "التركيز على تكرار الحالة نفسها كل ليلة.",
    options: [
      { id: "if", en: "If I drink coffee at night, I can't sleep.", note: "التركيز على الشرط" },
      { id: "when", en: "When I drink coffee at night, I can't sleep.", note: "التركيز على التوقيت المتوقع" },
    ],
    correct: "when",
    why: "الحدث متوقع ومتكرر كل ليلة، وWHEN تركّز على التوقيت المتوقع للتكرار. وIF تبقى صحيحة أيضًا لكنها تركّز على الشرط نفسه. لاحظ أن الجملتين مقبولتان هنا، والفارق في التركيز لا في القواعد.",
  },
  {
    id: "wc2",
    scene: "تشرح قاعدة علمية عامة عن الماء عند درجة حرارة محددة.",
    sceneAr: "الوصول إلى 100 درجة حدث متوقع داخل القاعدة العلمية.",
    options: [
      { id: "if", en: "If water reaches 100°C at standard atmospheric pressure, it boils.", note: "التركيز على الشرط" },
      { id: "when", en: "When water reaches 100°C at standard atmospheric pressure, it boils.", note: "التركيز على اللحظة المتوقعة" },
    ],
    correct: "when",
    why: "الوصول إلى درجة الغليان متوقّع ومتكرر داخل الحقيقة العلمية، فWHEN تُظهر اللحظة التي يحدث فيها الغليان. وIF تصلح أيضًا حين نريد إبراز الشرط.",
  },
  {
    id: "wc3",
    scene: "الشرط غير مضمون: قد تضغط الزر أو لا تضغطه.",
    sceneAr: "الضغط على الزر احتمال لا يقين، والنتيجة تتبعه إن حدث.",
    options: [
      { id: "if", en: "If you press this button, the computer starts.", note: "شرط غير مضمون" },
      { id: "when", en: "When you press this button, the computer starts.", note: "يوحي بأن الضغط متوقع" },
    ],
    correct: "if",
    why: "الضغط ليس مؤكدًا، فIF تعبّر عن الاحتمال العام. WHEN توحي بأن الحدث متوقع أو متكرر، وليست كل جملة IF يمكن استبدالها بها دون تغيير في المعنى.",
  },
] as const;

/* ============================================================
   الأفعال الناقصة في النتيجة
   ============================================================ */

export const MODAL_USES_51 = [
  {
    id: "can",
    modal: "CAN",
    title: "القدرة أو الإمكانية",
    en: "If you practise every day, you can improve quickly.",
    ar: "إذا تدربت كل يوم، يمكنك أن تتحسن بسرعة.",
    extra: { en: "If you heat ice, you can turn it into water.", ar: "إذا سخّنت الثلج، يمكنك تحويله إلى ماء." },
    tone: "modal" as Tone51,
  },
  {
    id: "must",
    modal: "MUST",
    title: "الإلزام",
    en: "If you enter the laboratory, you must wear safety glasses.",
    ar: "إذا دخلت المختبر، يجب أن ترتدي نظارات السلامة.",
    tone: "modal" as Tone51,
  },
  {
    id: "should",
    modal: "SHOULD",
    title: "النصيحة",
    en: "If you feel sick, you should rest.",
    ar: "إذا شعرت بالمرض، ينبغي أن ترتاح.",
    tone: "modal" as Tone51,
  },
  {
    id: "may",
    modal: "MAY / MIGHT",
    title: "احتمال",
    en: "If the temperature drops below freezing, the roads may become icy.",
    ar: "إذا انخفضت درجة الحرارة إلى ما دون التجمد، فقد تصبح الطرق جليدية.",
    tone: "modal" as Tone51,
  },
] as const;

export type ModalCase51 = {
  id: string;
  prompt: string;
  promptAr: string;
  options: readonly string[];
  correct: string;
  why: string;
};

export const MODAL_CASES_51: readonly ModalCase51[] = [
  {
    id: "mc1",
    prompt: "If you enter the laboratory, you … wear safety glasses.",
    promptAr: "السياق: قاعدة إلزامية في المختبر.",
    options: ["must", "may", "can"],
    correct: "must",
    why: "قاعدة السلامة إلزام: MUST تعني «يجب». MAY احتمال، وCAN قدرة أو إمكانية، ولا تؤديان معنى الإلزام.",
  },
  {
    id: "mc2",
    prompt: "If you feel sick, you … rest.",
    promptAr: "السياق: نصيحة لطيفة لصديق.",
    options: ["must", "should", "might"],
    correct: "should",
    why: "SHOULD هي فعل النصيحة: «ينبغي أن ترتاح». MUST أقوى من المطلوب، وMIGHT احتمال لا نصيحة.",
  },
  {
    id: "mc3",
    prompt: "If you practise every day, you … improve quickly.",
    promptAr: "السياق: إمكانية التحسن متاحة لك.",
    options: ["can", "must", "should"],
    correct: "can",
    why: "CAN تعبر عن القدرة أو الإمكانية: «يمكنك أن تتحسن». الإلزام والنصيحة لا يناسبان سياق القدرة هنا.",
  },
  {
    id: "mc4",
    prompt: "If the temperature drops below freezing, the roads … become icy.",
    promptAr: "السياق: احتمال وارد غير مؤكد.",
    options: ["must", "may", "should"],
    correct: "may",
    why: "MAY (أو MIGHT) تعبر عن احتمال: «قد تصبح الطرق جليدية». MUST تدّعي تأكدًا لا تملكه النتيجة، وSHOULD نصيحة لا تناسب.",
  },
] as const;

/* ============================================================
   Zero مقابل First — وأربعة مواقف
   ============================================================ */

export const ZERO_VS_FIRST_51: Table51 = {
  head: ["", "ZERO CONDITIONAL", "FIRST CONDITIONAL"],
  rows: [
    { label: "التركيب", cells: ["IF + PRESENT SIMPLE, PRESENT SIMPLE", "IF + PRESENT SIMPLE, WILL + V1"] },
    { label: "المعنى", cells: ["حقيقة عامة أو عادة أو نتيجة متكررة", "احتمال حقيقي في المستقبل"] },
    { label: "مثال", cells: ["If you heat ice, it melts.", "If it rains tomorrow, I will stay home."] },
    { label: "الترجمة", cells: ["إذا سخّنت الثلج، فإنه يذوب.", "إذا أمطرت غدًا، فسأبقى في المنزل."] },
  ],
  note: "WILL لا تأتي في جزء IF في الشرط الأول العادي: If it rains tomorrow… ✓ وليس If it will rain tomorrow… ✗",
};

export const ZERO_FIRST_PAIRS_51 = [
  {
    id: "zf1",
    zero: { en: "If I drink coffee at night, I don't sleep well.", ar: "إذا شربت القهوة ليلًا، لا أنام جيدًا." },
    first: { en: "If I drink coffee tonight, I won't sleep well.", ar: "إذا شربت القهوة الليلة، فلن أنام جيدًا." },
    zeroFn: "عادة متكررة",
    firstFn: "احتمال مستقبلي محدد",
  },
  {
    id: "zf2",
    zero: { en: "If people don't eat, they get hungry.", ar: "إذا لم يأكل الناس، يشعرون بالجوع." },
    first: { en: "If you don't eat breakfast tomorrow, you will feel hungry at school.", ar: "إذا لم تتناول الإفطار غدًا، ستشعر بالجوع في المدرسة." },
    zeroFn: "حقيقة عامة",
    firstFn: "توقع لحدث محدد في المستقبل",
  },
  {
    id: "zf3",
    zero: { en: "If you don't charge your phone, its battery runs out.", ar: "إذا لم تشحن هاتفك، تنفد بطاريته." },
    first: { en: "If you don't charge your phone tonight, its battery will run out tomorrow.", ar: "إذا لم تشحن هاتفك الليلة، فستنتهي بطاريته غدًا." },
    zeroFn: "نتيجة عامة",
    firstFn: "توقع مستقبلي بزمن محدد",
  },
] as const;

export const FOUR_CASES_51 = [
  {
    n: "①",
    label: "حقيقة عامة — ZERO CONDITIONAL",
    en: "If people don't drink water, they become dehydrated.",
    ar: "إذا لم يشرب الناس الماء، يصابون بالجفاف.",
    tone: "law" as Tone51,
  },
  {
    n: "②",
    label: "احتمال مستقبلي — FIRST CONDITIONAL",
    en: "If you don't drink enough water today, you will feel tired.",
    ar: "إذا لم تشرب كمية كافية من الماء اليوم، ستشعر بالتعب.",
    tone: "future" as Tone51,
  },
  {
    n: "③",
    label: "موقف افتراضي — SECOND CONDITIONAL",
    en: "If I lived near the beach, I would swim every day.",
    ar: "لو كنت أعيش بالقرب من الشاطئ، لسبحت كل يوم.",
    tone: "modal" as Tone51,
  },
  {
    n: "④",
    label: "موقف افتراضي في الماضي — THIRD CONDITIONAL",
    en: "If I had studied harder, I would have passed the exam.",
    ar: "لو كنت قد درست بجدية أكبر، لكنت نجحت في الامتحان.",
    tone: "negative" as Tone51,
  },
] as const;

/* ============================================================
   الأخطاء الشائعة الستة
   ============================================================ */

export const ERRORS_51 = [
  {
    n: "①",
    title: "استخدام WILL في الحقيقة العامة",
    bad: "If you heat ice, it will melt. ✗ (باعتبارها الصيغة المطلوبة للشرط الصفري)",
    good: "If you heat ice, it melts. ✓",
    why: "الجملة الأولى ليست خطأ نحويًا في كل سياق؛ قد تعبّر عن توقع نتيجة مستقبلية. لكن الصيغة النموذجية للحقيقة العامة هي المضارع البسيط في الطرفين.",
    tone: "law" as Tone51,
  },
  {
    n: "②",
    title: "نسيان S مع He / She / It",
    bad: "If he eat too much, he feels sick. ✗",
    good: "If he eats too much, he feels sick. ✓",
    why: "الفاعل المفرد الغائب يأخذ S / ES في جزأي الشرط والنتيجة.",
    tone: "habit" as Tone51,
  },
  {
    n: "③",
    title: "وضع S بعد DOESN'T",
    bad: "If she doesn't eats, she gets hungry. ✗",
    good: "If she doesn't eat, she gets hungry. ✓",
    why: "بعد DOESN'T نستخدم الفعل الأساسي V1 دون أي إضافة.",
    tone: "negative" as Tone51,
  },
  {
    n: "④",
    title: "استخدام الماضي دون سبب",
    bad: "If you heated ice, it melts. ✗ (إذا كنت تقصد حقيقة عامة)",
    good: "If you heat ice, it melts. ✓",
    why: "الحقيقة العامة تُقال بالمضارع البسيط؛ الماضي يغيّر المعنى إلى شرط غير واقعي أو حدث محدد.",
    tone: "law" as Tone51,
  },
  {
    n: "⑤",
    title: "نسيان الفاصلة",
    bad: "If you heat ice it melts. ✗",
    good: "If you heat ice, it melts. ✓",
    why: "عندما تبدأ الجملة بجزء IF، ضع فاصلة بعده. أما عند البدء بالنتيجة فلا نحتاج فاصلة عادةً.",
    tone: "law" as Tone51,
  },
  {
    n: "⑥",
    title: "الخلط بين العادة والحدث المستقبلي",
    bad: "If I wake up late, I miss the bus. = عادة أو نتيجة متكررة.",
    good: "If I wake up late tomorrow, I will miss the bus. = توقع مستقبلي محدد.",
    why: "الكلمة tomorrow تنقل الجملة من الشرط الصفري إلى الشرط الأول: عادة عامة مقابل حدث مستقبلي محدد.",
    tone: "future" as Tone51,
  },
] as const;

/* ============================================================
   الحوار: Healthy Habits
   ============================================================ */

export type Dialogue51 = {
  title: string;
  setting: string;
  tone: Tone51;
  turns: readonly { speaker: string; en: string; ar: string; fn?: string }[];
  analysis: readonly { form: string; ar: string; fn: string }[];
  labId: string;
  labPrompt: string;
};

export const DIALOGUE_51: Dialogue51 = {
  title: "HEALTHY HABITS",
  setting: "Adam وSara يتحدثان عن العادات الصحية، وكيف تؤدي العادات إلى نتائج ثابتة.",
  tone: "habit",
  turns: [
    { speaker: "Adam", en: "What happens if you don't get enough sleep?", ar: "ماذا يحدث إذا لم تحصل على نوم كافٍ؟", fn: "سؤال عن النتيجة" },
    { speaker: "Sara", en: "If I don't sleep well, I feel tired all day.", ar: "إذا لم أنم جيدًا، أشعر بالتعب طوال اليوم.", fn: "عادة متكررة" },
    { speaker: "Adam", en: "What do you do if you feel tired?", ar: "ماذا تفعلين إذا شعرت بالتعب؟", fn: "سؤال عن عادة" },
    { speaker: "Sara", en: "I usually take a short break. If I drink too much coffee, I don't sleep well at night.", ar: "عادةً آخذ استراحة قصيرة. إذا شربت الكثير من القهوة، لا أنام جيدًا في الليل.", fn: "نتيجة متكررة" },
    { speaker: "Adam", en: "That's interesting. What happens if you exercise regularly?", ar: "هذا مثير للاهتمام. ماذا يحدث إذا مارست الرياضة بانتظام؟", fn: "سؤال عن النتيجة" },
    { speaker: "Sara", en: "If I exercise regularly, I feel healthier and more energetic.", ar: "إذا مارست الرياضة بانتظام، أشعر بصحة أفضل وبطاقة أكبر.", fn: "نتيجة عامة" },
    { speaker: "Adam", en: "And what happens if people don't drink enough water?", ar: "وماذا يحدث إذا لم يشرب الناس كمية كافية من الماء؟", fn: "سؤال عن حقيقة عامة" },
    { speaker: "Sara", en: "They become dehydrated, and they may feel dizzy.", ar: "يصابون بالجفاف، وقد يشعرون بالدوار.", fn: "حقيقة عامة عن الجسم" },
  ],
  analysis: [
    { form: "If I don't sleep well, I feel tired.", ar: "عادة متكررة", fn: "REPEATED HABIT" },
    { form: "If I drink too much coffee, I don't sleep well.", ar: "نتيجة متكررة", fn: "REPEATED RESULT" },
    { form: "If I exercise regularly, I feel healthier.", ar: "نتيجة عامة", fn: "GENERAL RESULT" },
    { form: "If people don't drink enough water, they become dehydrated.", ar: "حقيقة عامة عن الجسم", fn: "GENERAL FACT" },
  ],
  labId: "dialogue",
  labPrompt: "حدد وظيفة كل جملة شرطية في الحوار.",
};

/* ============================================================
   القراءة: The Science Club Experiment
   ============================================================ */

export const READING_51 = [
  {
    en: "Last week, our school science club conducted a simple experiment.",
    ar: "في الأسبوع الماضي، أجرى نادي العلوم في مدرستنا تجربة بسيطة.",
  },
  {
    en: "The students wanted to understand what happens when different materials are heated.",
    ar: "أراد الطلاب فهم ما يحدث عندما يتم تسخين مواد مختلفة.",
  },
  {
    en: "First, they placed a small piece of ice in a glass container. When ice gets warm, it melts and turns into water.",
    ar: "أولًا، وضعوا قطعة صغيرة من الثلج في وعاء زجاجي. عندما يصبح الثلج دافئًا، فإنه يذوب ويتحول إلى ماء.",
  },
  {
    en: "Then they placed a metal spoon near a heater. They noticed that metal gets hot when it absorbs heat.",
    ar: "ثم وضعوا ملعقة معدنية بالقرب من جهاز تسخين. ولاحظوا أن المعدن يسخن عندما يمتص الحرارة.",
  },
  {
    en: "Their teacher explained that if water reaches 100°C at standard atmospheric pressure, it boils.",
    ar: "شرح المعلم أن الماء يغلي عندما تصل حرارته إلى 100 درجة مئوية عند الضغط الجوي القياسي.",
  },
  {
    en: "The students also discussed plants. They learned that if plants don't receive enough water and sunlight, they don't grow properly.",
    ar: "ناقش الطلاب النباتات أيضًا. وتعلموا أنه إذا لم تحصل النباتات على كمية كافية من الماء وضوء الشمس، فإنها لا تنمو بصورة صحيحة.",
  },
  {
    en: "At the end of the experiment, the teacher asked: \"What happens if you don't follow safety instructions in a laboratory?\"",
    ar: "في نهاية التجربة، سأل المعلم: «ماذا يحدث إذا لم تتبع تعليمات السلامة في المختبر؟»",
  },
  {
    en: "One student answered: \"If we don't follow safety instructions, accidents happen.\"",
    ar: "أجاب أحد الطلاب: «إذا لم نتبع تعليمات السلامة، تحدث الحوادث.»",
  },
  {
    en: "The teacher smiled and said: \"Exactly. If you work carefully, you reduce the risk of accidents.\"",
    ar: "ابتسم المعلم وقال: «بالضبط. إذا عملتم بحذر، فإنكم تقللون خطر وقوع الحوادث.»",
  },
  {
    en: "The students enjoyed the experiment because they learned that science explains many things that happen around us every day.",
    ar: "استمتع الطلاب بالتجربة لأنهم تعلموا أن العلوم تفسر أشياء كثيرة تحدث حولنا كل يوم.",
  },
] as const;

export const READING_QUESTIONS_51 = [
  { q: "What did the science club conduct last week?", answer: "They conducted a simple experiment.", ar: "أجرى تجربة بسيطة." },
  { q: "What happens when ice gets warm?", answer: "It melts and turns into water.", ar: "يذوب ويتحول إلى ماء." },
  { q: "What happens when metal absorbs heat?", answer: "It gets hot.", ar: "يسخن." },
  { q: "At what temperature does water boil at standard atmospheric pressure?", answer: "At 100°C.", ar: "عند 100 درجة مئوية." },
  { q: "What happens if plants don't receive enough water and sunlight?", answer: "They don't grow properly.", ar: "لا تنمو بصورة صحيحة." },
  { q: "What happens if students don't follow safety instructions?", answer: "Accidents happen.", ar: "تحدث الحوادث." },
  { q: "Why did the students enjoy the experiment?", answer: "Because they learned that science explains many things that happen around us every day.", ar: "لأنهم تعلموا أن العلوم تفسر أشياء كثيرة تحدث حولنا كل يوم." },
] as const;

export type Hunt51 = {
  id: string;
  q: string;
  options: readonly string[];
  correct: number;
  why: string;
};

export const READING_HUNT_51: readonly Hunt51[] = [
  {
    id: "h1",
    q: "في القصة وردت: «When ice gets warm, it melts». لماذا استُخدمت WHEN هنا؟",
    options: ["لأن انصهار الثلج متوقع ومتكرر كلما صار دافئًا", "لأن انصهار الثلج غير مؤكد", "لأن WHEN تُستخدم فقط مع الماضي"],
    correct: 0,
    why: "الحدث متوقع ومتكرر داخل حقيقة علمية، فWHEN تركز على اللحظة التي يحدث فيها الانتقال. وIF تصلح أيضًا حين نريد إبراز الشرط.",
  },
  {
    id: "h2",
    q: "«if water reaches 100°C at standard atmospheric pressure, it boils» — لماذا المضارع البسيط في الطرفين؟",
    options: ["لأننا نتحدث عن حقيقة علمية عامة", "لأننا نتحدث عن حدث وقع أمس", "لأن will مطلوبة في كل جملة if"],
    correct: 0,
    why: "الشرط الصفري للحقائق العامة يستخدم Present Simple في جزأي الشرط والنتيجة.",
  },
  {
    id: "h3",
    q: "«if plants don't receive enough water…, they don't grow properly» — ماذا نلاحظ عن النفي؟",
    options: ["النفي في الشرط والنتيجة معًا بـdon't + V1", "النفي بـdoesn't مع they", "النفي بـnot بعد الفعل"],
    correct: 0,
    why: "الفاعل THEY في الطرفين، فالنفي بـdon't + الفعل الأساسي receive وgrow.",
  },
  {
    id: "h4",
    q: "قال المعلم: «If you work carefully, you reduce the risk». أي نوع من الجمل هذه؟",
    options: ["Zero Conditional: نتيجة عامة عند تحقق شرط", "First Conditional: توقع لغد", "Third Conditional: ماضٍ لم يحدث"],
    correct: 0,
    why: "العمل بحذر يقلل الخطر نتيجة عامة متكررة، والتركيب مضارع في الطرفين دون WILL: شرط صفري.",
  },
  {
    id: "h5",
    q: "«accidents happen» — ماذا يحدث إذا وُضعت الجملة هكذا: «If we don't follow safety instructions, accidents happen»؟",
    options: ["جملة IF أولًا فنضع فاصلة بعدها", "لا نضع فاصلة أبدًا", "نضع فاصلة قبل accidents فقط"],
    correct: 0,
    why: "قاعدة الفاصلة: إذا بدأت الجملة بجزء IF نضع فاصلة بعد جملة الشرط قبل النتيجة.",
  },
] as const;

/* ============================================================
   المراجعة الذكية
   ============================================================ */

export const SUMMARY_TABLE_51: Table51 = {
  head: ["الوظيفة", "التركيب", "مثال"],
  rows: [
    { label: "القاعدة الأساسية", cells: ["IF + PRESENT SIMPLE, PRESENT SIMPLE", "If you heat ice, it melts."] },
    { label: "النفي في الشرط", cells: ["IF + DON'T / DOESN'T + V1, PRESENT SIMPLE", "If you don't water plants, they die."] },
    { label: "النفي في النتيجة", cells: ["IF + PRESENT SIMPLE, DON'T / DOESN'T + V1", "If I drink coffee late, I don't sleep well."] },
    { label: "السؤال عن النتيجة", cells: ["WHAT HAPPENS IF…?", "What happens if you heat ice?"] },
    { label: "السؤال عن العادة", cells: ["WHAT DO / DOES … DO IF…?", "What do you do if you feel tired?"] },
    { label: "الأفعال الناقصة في النتيجة", cells: ["IF + PRESENT SIMPLE, CAN / MUST / SHOULD / MAY / MIGHT + V1", "If you feel sick, you should rest."] },
    { label: "مقابل الشرط الأول", cells: ["WILL + V1 في النتيجة = First Conditional", "If it rains tomorrow, I will stay home."] },
  ],
  note: "اسأل نفسك دائمًا: هل أتحدث عن حقيقة عامة أو عادة متكررة؟ إذا كانت الإجابة نعم، فالشرط الصفري غالبًا هو الاختيار المناسب.",
};

export const FIVE_SENTENCES_51 = [
  { n: "①", en: "If you heat ice, it melts.", ar: "إذا سخّنت الثلج، فإنه يذوب.", fn: "حقيقة عامة · القاعدة الأساسية" },
  { n: "②", en: "If he doesn't study, he fails.", ar: "إذا لم يدرس، يرسب.", fn: "نفي بـDOESN'T + V1" },
  { n: "③", en: "What happens if you heat ice?", ar: "ماذا يحدث إذا سخّنت الثلج؟", fn: "سؤال عن النتيجة" },
  { n: "④", en: "Ice melts if you heat it.", ar: "يذوب الثلج إذا سخّنته.", fn: "النتيجة أولًا بلا فاصلة" },
  { n: "⑤", en: "If it rains tomorrow, I will stay home.", ar: "إذا أمطرت غدًا، فسأبقى في المنزل.", fn: "First Conditional للمقارنة" },
] as const;

export const SUMMARY_POINTS_51 = [
  "معنى الشرط IF وعلاقة الشرط Condition بالنتيجة Result.",
  "تعريف Zero Conditional: الحقائق العلمية والطبيعية والقواعد والعادات والنتائج المتكررة.",
  "القاعدة الأساسية: IF + PRESENT SIMPLE, PRESENT SIMPLE.",
  "تصريف الأفعال: S / ES مع He / She / It في جزأي الجملة.",
  "بعد DOESN'T وDON'T يعود الفعل إلى V1.",
  "النفي في الشرط أو النتيجة أو كليهما.",
  "الأسئلة: What happens if…? وWhat do you do if…?",
  "ترتيب الجملة وقاعدة الفاصلة عند البدء بـIF.",
  "الفرق بين IF وWHEN في التركيز.",
  "الأفعال الناقصة CAN وMUST وSHOULD وMAY وMIGHT في النتيجة.",
  "الفرق بين Zero Conditional وFirst Conditional، ونظرة تمهيدية على Second وThird.",
] as const;

/* ============================================================
   الشرائح
   ============================================================ */

export const SLIDES_51: readonly Slide51[] = [
  {
    id: "cover",
    station: "opening",
    kind: "cover",
    title: "مختبر السبب والنتيجة: ZERO CONDITIONAL",
    lead: "الشرط الصفري — الحقائق العامة والنتائج الثابتة. كيف نتحدث عن الحقائق العلمية، والقواعد العامة، والعادات، والنتائج التي تحدث دائمًا؟",
    mascot: "⚗️",
    tone: "law",
  },
  {
    id: "goals",
    station: "opening",
    kind: "goals",
    title: "أهداف الدرس",
    lead: "بنهاية هذا الدرس ستبني جملة السبب والنتيجة بثقة: شرط بالمضارع البسيط، ونتيجة بالمضارع البسيط، مع النفي والأسئلة والمقارنات.",
    mascot: "🎯",
    tone: "review",
  },
  {
    id: "intro-condition",
    station: "meaning",
    kind: "intro",
    title: "ما معنى الشرط؟ IF = إذا",
    lead: "في اللغة الإنجليزية نستخدم كلمة IF كثيرًا لربط شرط بنتيجة. تخيّل الجملة: If you study, you learn. لدينا هنا جزآن: الشرط والنتيجة.",
    mascot: "🔗",
    tone: "law",
    points: [
      "① الشرط (Condition): If you study — إذا درست.",
      "② النتيجة (Result): You learn — فإنك تتعلم.",
      "الفكرة الأساسية: إذا تحقق الشرط، تحدث نتيجة معينة.",
    ],
    note: "لكن هل جميع الشروط متشابهة؟ بالطبع لا. هناك شروط لمرة واحدة في المستقبل، وشروط لحقائق ثابتة تتكرر دائمًا.",
    tip: "انتبه إلى الفاصلة بعد جملة الشرط: If you study, you learn.",
  },
  {
    id: "three-cases",
    station: "meaning",
    kind: "concept",
    title: "ثلاث جمل، وفكرة واحدة",
    lead: "هذه الجمل الثلاث تتحدث عن علاقة ثابتة أو متكررة بين الشرط والنتيجة — وهنا نستخدم ZERO CONDITIONAL.",
    mascot: "🧪",
    tone: "law",
    examples: [
      { en: INTRO_CASES_51[0].en, ar: `${INTRO_CASES_51[0].ar} — ${INTRO_CASES_51[0].fn}`, tag: "SCIENCE", tone: "law" },
      { en: INTRO_CASES_51[1].en, ar: `${INTRO_CASES_51[1].ar} — ${INTRO_CASES_51[1].fn}`, tag: "HABIT", tone: "habit" },
      { en: INTRO_CASES_51[2].en, ar: `${INTRO_CASES_51[2].ar} — ${INTRO_CASES_51[2].fn}`, tag: "GENERAL", tone: "law" },
    ],
    points: [
      "الجملة الأولى حقيقة علمية ثابتة.",
      "الجملة الثانية عادة أو نتيجة تتكرر.",
      "الجملة الثالثة حقيقة عامة عن الناس.",
    ],
    note: "الرابط المشترك: كل جملة تصف علاقة ثابتة أو متكررة، وليست حدثًا واحدًا في المستقبل.",
  },
  {
    id: "definition",
    station: "definition",
    kind: "lesson",
    title: "ما هو ZERO CONDITIONAL؟",
    lead: "الشرط الصفري تركيب نستخدمه للتحدث عن الحقائق والقواعد والعادات والنتائج التي تحدث دائمًا أو غالبًا عند تحقق شرط معين.",
    mascot: "📖",
    tone: "law",
    formula: ["ZERO CONDITIONAL = شرط ونتيجة عامة أو متكررة"],
    examples: [
      { en: "If you freeze water, it turns into ice.", ar: "إذا جمّدت الماء، فإنه يتحول إلى ثلج. ليس توقعًا لحدث واحد، بل حقيقة عامة.", tone: "law" },
      { en: "If people exercise regularly, they become stronger.", ar: "إذا مارس الناس الرياضة بانتظام، يصبحون أقوى. نتيجة عامة، لا موقف شخص محدد.", tone: "habit" },
    ],
    points: [
      "عندما يتحقق الشرط، تحدث النتيجة بصورة عامة أو متكررة.",
      "لسنا بحاجة إلى وقت محدد أو كلمة مثل tomorrow.",
      "المعنى هو المعيار: حقيقة عامة أو عادة متكررة ⇐ شرط صفري.",
    ],
  },
  {
    id: "five-uses",
    station: "definition",
    kind: "lesson",
    title: "الاستخدامات الخمسة للشرط الصفري",
    lead: "من المختبر إلى الحياة اليومية: خمس مواقف نستخدم فيها Zero Conditional.",
    mascot: "🖐️",
    tone: "review",
    points: USES_51.map((use) => `${use.title}: ${use.ex} — ${use.exAr}`),
    note: "كل استخدام يضيف معنى مختلفًا لكن التركيب واحد: IF + PRESENT SIMPLE, PRESENT SIMPLE.",
  },
  {
    id: "core-rule",
    station: "formula",
    kind: "lesson",
    title: "القاعدة الأساسية للشرط الصفري",
    lead: "الصيغة التي تحملها معك إلى كل جملة: مضارع بسيط في الشرط، ومضارع بسيط في النتيجة.",
    mascot: "⚙️",
    tone: "law",
    formula: ["IF + PRESENT SIMPLE", "PRESENT SIMPLE"],
    formulaGlosses: ["الجزء الأول: الشرط", "الجزء الثاني: النتيجة"],
    examples: [
      { en: "If you heat ice, it melts.", ar: "إذا سخّنت الثلج، فإنه يذوب.", tag: "CONDITION → RESULT", tone: "law" },
      { en: "If you mix blue and yellow, you get green.", ar: "إذا مزجت الأزرق والأصفر، تحصل على الأخضر.", tone: "law" },
      { en: "If the sun sets, it gets dark.", ar: "إذا غربت الشمس، يحل الظلام.", tone: "law" },
      { en: "If plants don't get water, they die.", ar: "إذا لم تحصل النباتات على الماء، فإنها تموت.", tone: "negative" },
      { en: "If you press this button, the machine starts.", ar: "إذا ضغطت هذا الزر، يبدأ الجهاز بالعمل.", tone: "law" },
      { en: "If people eat too much, they gain weight.", ar: "إذا أكل الناس أكثر من اللازم، يزداد وزنهم.", tone: "law" },
    ],
    note: "لماذا المضارع البسيط في الطرفين؟ لأننا نتحدث عن حقيقة عامة، وليس عن حدث محدد في الماضي أو المستقبل.",
    tip: "تذكّر: If you heat ice → الشرط. It melts → النتيجة. الفاصلة بينهما.",
  },
  {
    id: "conjugation",
    station: "formula",
    kind: "lesson",
    title: "تصريف الأفعال مع جميع الضمائر",
    lead: "المضارع البسيط يتغير مع الفاعل — والفعل في جزء IF يتبع القاعدة نفسها تمامًا.",
    mascot: "🧬",
    tone: "habit",
    table: CONJUGATION_ROWS_51,
    points: [
      "مع I / You / We / They نستخدم الفعل الأساسي V1.",
      "مع He / She / It نضيف غالبًا S أو ES للفعل — في الشرط والنتيجة معًا.",
    ],
    note: "If I drink coffee, I feel energetic. · If they exercise, they feel better. · If he eats too much, he feels sick.",
  },
  {
    id: "s-alerts",
    station: "formula",
    kind: "comparison",
    title: "انتبه إلى S / ES وV1 بعد DOESN'T",
    lead: "ثلاثة أخطاء شائعة في التصريف، وتصحيحها. قارن كل زوج ولاحظ موقع S.",
    mascot: "🔬",
    tone: "negative",
    examples: CONJUGATION_ALERTS_51.map((alert) => ({
      en: `${alert.bad} → ${alert.good}`,
      ar: alert.why,
      tag: "FIX",
      tone: "negative" as Tone51,
    })),
    points: [
      "S تُضاف مع He / She / It في المضارع البسيط المثبت.",
      "بعد DOESN'T يعود الفعل إلى V1 دون S.",
      "بعد DOESN'T نستخدم الفعل الأساسي V1 دائمًا.",
    ],
  },
  {
    id: "verb-lab",
    station: "formula",
    kind: "verbLab",
    title: "مختبر التصريف: اختر الشكل الصحيح للفعل",
    lead: "ست جمل تحتاج إلى تصريف دقيق. ركّز على الفاعل في كل مرة: هل هو مفرد غائب يحتاج S / ES أم جمع يبقى على حاله؟",
    mascot: "🧫",
    tone: "habit",
  },
  {
    id: "will-note",
    station: "formula",
    kind: "comparison",
    title: "ملاحظة مهمة: لا تضع WILL في الشرط الصفري العادي",
    lead: "الجملتان ليستا متساويتين في الاستخدام. الفرق في المعنى، لا في القواعد المطلقة.",
    mascot: "🚦",
    tone: "future",
    examples: [
      { en: WILL_NOTE_51.zero.en, ar: WILL_NOTE_51.zero.ar, tag: "ZERO · النموذجية", tone: "law" },
      { en: WILL_NOTE_51.first.en, ar: WILL_NOTE_51.first.ar, tag: "FIRST · توقع مستقبلي", tone: "future" },
    ],
    points: [
      "الجملة بـWILL قد تكون صحيحة في سياق توقع نتيجة مستقبلية محددة.",
      "لكنها ليست الصيغة النموذجية للحقيقة العامة في الشرط الصفري.",
    ],
    note: "سنقارن بين الشرط الصفري والشرط الأول بالتفصيل قريبًا، وسندرس First Conditional في الدرس 52.",
  },
  {
    id: "science-facts",
    station: "science",
    kind: "lesson",
    title: "الاستخدام الأول: الحقائق العلمية والطبيعية",
    lead: "نستخدم Zero Conditional عندما نتحدث عن حقائق علمية أو طبيعية ثابتة. لاحظ المضارع البسيط في كل جملة.",
    mascot: "🌡️",
    tone: "law",
    examples: SCIENCE_FACTS_51.map((fact) => ({ en: fact.en, ar: fact.ar, tag: fact.label, tone: fact.tone })),
    note: PRESSURE_NOTE_51,
    tip: "لاحظ أننا نستخدم المضارع البسيط لأننا نتحدث عن حقائق عامة، لا عن تجربة واحدة.",
  },
  {
    id: "science-lab",
    station: "science",
    kind: "causeLab",
    title: "مختبر السبب والنتيجة: اختر النتيجة الصحيحة",
    lead: "في كل بطاقة اقرأ الشرط أولًا، ثم اختر النتيجة التي تكمل العلاقة الصحيحة. بعد التحقق تظهر لك الصيغة كاملة مع التفسير.",
    mascot: "⚗️",
    tone: "law",
  },
  {
    id: "rules-general",
    station: "rules",
    kind: "lesson",
    title: "الاستخدام الثاني: القواعد والنتائج العامة",
    lead: "لا يقتصر الشرط الصفري على العلوم والطبيعة؛ نستخدمه للنتائج التي تحدث في مواقف عامة من حياتنا.",
    mascot: "📏",
    tone: "review",
    examples: RULES_CASES_51.map((rule) => ({ en: rule.en, ar: rule.ar, tone: "review" as Tone51 })),
    points: [
      "هذه أمثلة على نتائج عامة، وليست بالضرورة قوانين طبيعية.",
      "كل مرة يتحقق فيها الشرط، تتكرر النتيجة نفسها.",
    ],
  },
  {
    id: "habits",
    station: "habits",
    kind: "lesson",
    title: "الاستخدام الثالث: العادات والسلوكيات المتكررة",
    lead: "نستخدم Zero Conditional للتحدث عن شيء يحدث عادة عندما يتحقق شرط معين — خاصة مع I وMy والضمائر الشخصية.",
    mascot: "🔁",
    tone: "habit",
    examples: HABIT_CASES_51.map((habit) => ({ en: habit.en, ar: habit.ar, tone: "habit" as Tone51 })),
    note: "هذا يصف عادة أو نتيجة تتكرر، لا حدثًا واحدًا في زمن محدد.",
  },
  {
    id: "fact-vs-habit",
    station: "habits",
    kind: "comparison",
    title: "الفرق بين الحقيقة والعادة",
    lead: "كلاهما يستخدم Zero Conditional، لكن الأول قانون عام، والثاني سلوك شخصي متكرر.",
    mascot: "⚖️",
    tone: "habit",
    examples: [
      { en: FACT_VS_HABIT_51.fact.en, ar: `${FACT_VS_HABIT_51.fact.ar} — ${FACT_VS_HABIT_51.fact.fn}`, tag: "FACT", tone: "law" },
      { en: FACT_VS_HABIT_51.habit.en, ar: `${FACT_VS_HABIT_51.habit.ar} — ${FACT_VS_HABIT_51.habit.fn}`, tag: "HABIT", tone: "habit" },
    ],
    points: [
      "الحقيقة: النتيجة واحدة لكل من يتحقق منه الشرط.",
      "العادة: النتيجة متكررة مع صاحبها أو جماعة معينة.",
    ],
  },
  {
    id: "fact-lab",
    station: "habits",
    kind: "factLab",
    title: "حقيقة عامة أم حدث مستقبلي؟",
    lead: "لكل جملتين حدد أيهما حقيقة عامة (Zero) وأيهما احتمال مستقبلي محدد (First). الكلمات المحددة للزمن هي المفتاح.",
    mascot: "🔮",
    tone: "future",
  },
  {
    id: "negative-condition",
    station: "negative",
    kind: "lesson",
    title: "النفي في Zero Conditional — الشرط",
    lead: "يمكن أن يكون الشرط منفيًا، أو تكون النتيجة منفية، أو كلاهما. نستخدم قواعد النفي في Present Simple نفسها.",
    mascot: "🚫",
    tone: "negative",
    formula: ["IF + DON'T / DOESN'T + V1", "PRESENT SIMPLE"],
    formulaGlosses: ["نفي الشرط", "النتيجة مثبتة"],
    examples: [
      { en: "If you don't water plants, they die.", ar: "إذا لم تسقِ النباتات، فإنها تموت.", tone: "negative" },
      { en: "If he doesn't sleep enough, he feels tired.", ar: "إذا لم ينم بما يكفي، يشعر بالتعب.", tone: "negative" },
      { en: "If people don't exercise, they become less fit.", ar: "إذا لم يمارس الناس الرياضة، يصبحون أقل لياقة.", tone: "negative" },
    ],
    note: "تذكر: بعد DOESN'T نستخدم الفعل الأساسي V1 — If he doesn't study, he fails. ✓",
  },
  {
    id: "negative-result",
    station: "negative",
    kind: "lesson",
    title: "النفي في النتيجة والطرفين معًا",
    lead: "النتيجة تنفي بنفس القاعدة: DON'T / DOESN'T + V1. ويمكن أن ينفي الطرفان في جملة واحدة.",
    mascot: "➖",
    tone: "negative",
    formula: ["IF + PRESENT SIMPLE", "DON'T / DOESN'T + V1", "IF + DON'T / DOESN'T + V1", "DON'T / DOESN'T + V1"],
    formulaGlosses: ["شرط مثبت", "نتيجة منفية", "شرط منفي", "نتيجة منفية"],
    examples: [
      { en: "If I drink coffee late, I don't sleep well.", ar: "إذا شربت القهوة متأخرًا، لا أنام جيدًا.", tag: "RESULT ✗", tone: "negative" },
      { en: "If she eats too quickly, she doesn't enjoy her food.", ar: "إذا أكلت بسرعة كبيرة، لا تستمتع بطعامها.", tag: "RESULT ✗", tone: "negative" },
      { en: "If you don't practise, you don't improve.", ar: "إذا لم تتدرب، فلن تتحسن.", tag: "BOTH ✗", tone: "negative" },
      { en: "If he doesn't charge his laptop, it doesn't work for long.", ar: "إذا لم يشحن حاسوبه المحمول، فلن يعمل لمدة طويلة.", tag: "BOTH ✗", tone: "negative" },
    ],
    note: "If he doesn't studies, he fails. ✗ — بعد DOESN'T يأتي V1 دائمًا: If he doesn't study, he fails. ✓",
  },
  {
    id: "neg-lab",
    station: "negative",
    kind: "negLab",
    title: "باني الجمل المنفية",
    lead: "ابنِ النفي الصحيح: اختر DON'T أو DOESN'T المناسبة للفاعل، ثم تأكد أن الفعل يعود إلى V1.",
    mascot: "🧱",
    tone: "negative",
  },
  {
    id: "questions-forms",
    station: "questions",
    kind: "lesson",
    title: "السؤال باستخدام Zero Conditional",
    lead: "لدينا طريقتان شائعتان: سؤال عن النتيجة، وسؤال عن عادة شخص. لاحظ أن السؤال يستخدم DO أو DOES وفقًا للفاعل.",
    mascot: "❓",
    tone: "review",
    examples: QUESTION_FORMS_51.map((form) => ({
      en: `${form.q} → ${form.a}`,
      ar: `${form.qAr} ← ${form.aAr} — ${form.note}`,
      tag: form.title,
      tone: form.tone,
    })),
    points: [
      "What happens if you heat ice? — What happens if people don't drink enough water?",
      "What do you do if you feel tired? — What does your brother do if he gets angry?",
      "الإجابة تبدأ بالنتيجة مباشرة: It melts. / I take a short break.",
    ],
    note: QUESTION_CASES_51.map((item) => `${item.form} ${item.q} → ${item.a}`).join(" · "),
  },
  {
    id: "order-rule",
    station: "order",
    kind: "comparison",
    title: "هل يجب أن نبدأ بـIF؟ لا.",
    lead: "يمكنك وضع جملة IF في البداية أو في النهاية دون تغيير المعنى الأساسي — لكن قاعدة الفاصلة تتغير.",
    mascot: "🔀",
    tone: "law",
    points: [
      "إذا بدأت الجملة بـIF، ضع فاصلة بعد جملة الشرط.",
      "إذا بدأت بالنتيجة ثم جاءت IF، فلا تحتاج عادةً إلى فاصلة.",
      "المعنى لا يتغير بتغير الترتيب.",
    ],
    note: "If you heat ice, it melts. ↔ Ice melts if you heat it.",
  },
  {
    id: "order-lab",
    station: "order",
    kind: "orderLab",
    title: "مختبر إعادة البناء: رتب الجملة",
    lead: "اضغط على الكلمات بالترتيب الصحيح لتبني الجملة. لاحظ موقع IF والفاصلة في كل مرة.",
    mascot: "🧩",
    tone: "law",
  },
  {
    id: "if-when",
    station: "if-when",
    kind: "comparison",
    title: "هل يمكن استخدام WHEN بدل IF؟",
    lead: "نعم، في بعض الجمل، خاصة عندما نتحدث عن شيء يحدث بانتظام أو نراه نتيجة متوقعة. لكن التركيز يختلف.",
    mascot: "🕐",
    tone: "future",
    examples: [
      { en: "If I drink coffee at night, I can't sleep.", ar: "إذا شربت القهوة ليلًا، لا أستطيع النوم. — IF تركز على الشرط أو الاحتمال العام.", tag: "IF", tone: "habit" },
      { en: "When I drink coffee at night, I can't sleep.", ar: "عندما أشرب القهوة ليلًا، لا أستطيع النوم. — WHEN تركز على الوقت أو التكرار المتوقع.", tag: "WHEN", tone: "future" },
      { en: "When water reaches 100°C at standard atmospheric pressure, it boils.", ar: "عندما تصل حرارة الماء إلى 100 درجة مئوية عند الضغط الجوي القياسي، فإنه يغلي.", tag: "WHEN", tone: "law" },
      { en: "If you press this button, the computer starts.", ar: "إذا ضغطت هذا الزر، يبدأ الحاسوب. — الشرط غير مضمون، فIF أنسب.", tag: "IF", tone: "law" },
    ],
    points: [
      "WHEN = عندما · IF = إذا.",
      "WHEN توحي بأن الحدث متوقع أو متكرر.",
      "ليست كل جملة IF يمكن استبدالها بـWHEN دون تغيير المعنى؛ أحيانًا يكون الشرط غير مضمون.",
    ],
  },
  {
    id: "when-lab",
    station: "if-when",
    kind: "whenLab",
    title: "IF أم WHEN؟ قرّر من السياق",
    lead: "اقرأ الموقف أولًا: هل الشرط مضمون ومتوقع (WHEN) أم عام أو غير مضمون (IF)؟ اختر ثم اقرأ التفسير.",
    mascot: "🕰️",
    tone: "future",
  },
  {
    id: "modals",
    station: "modals",
    kind: "lesson",
    title: "CAN وMUST وSHOULD وMAY / MIGHT في النتيجة",
    lead: "يمكن استخدام أفعال ناقصة في جزء النتيجة عندما نريد إضافة القدرة أو الإلزام أو النصيحة أو الاحتمال. التركيب الأساسي يبقى حاضرًا في جملة الشرط.",
    mascot: "🎛️",
    tone: "modal",
    formula: ["IF + PRESENT SIMPLE", "CAN / MUST / SHOULD / MAY / MIGHT + V1"],
    formulaGlosses: ["الشرط يبقى مضارعًا بسيطًا", "الفعل الناقص يضيف معنى إلى النتيجة"],
    examples: MODAL_USES_51.map((use) => {
      const extra = "extra" in use ? use.extra : undefined;
      return {
        en: extra ? `${use.en} · ${extra.en}` : use.en,
        ar: `${use.title}: ${use.ar}${extra ? ` · ${extra.ar}` : ""}`,
        tag: use.modal,
        tone: use.tone,
      };
    }),
    note: "لا نخلط بين هذه التراكيب وبين تركيب الشرط الأول أو الثاني: جملة IF تبقى بالمضارع البسيط، والفعل الناقص يغيّر معنى النتيجة وحسب.",
  },
  {
    id: "modal-lab",
    station: "modals",
    kind: "modalLab",
    title: "مختبر النتائج: اختر الفعل الناقص المناسب",
    lead: "لكل موقف اختر الفعل الناقص الذي يحمل المعنى المطلوب في النتيجة: قدرة، إلزام، نصيحة، أو احتمال.",
    mascot: "🎚️",
    tone: "modal",
  },
  {
    id: "zero-vs-first",
    station: "zero-first",
    kind: "comparison",
    title: "الفرق بين ZERO CONDITIONAL وFIRST CONDITIONAL",
    lead: "كلا التركيبين يستخدم IF، لكن المعنى مختلف: حقيقة عامة مقابل احتمال حقيقي في المستقبل.",
    mascot: "🌗",
    tone: "future",
    table: ZERO_VS_FIRST_51,
    examples: [
      { en: "If you heat ice, it melts.", ar: "حقيقة عامة: النتيجة ثابتة دائمًا.", tag: "ZERO", tone: "law" },
      { en: "If it rains tomorrow, I will stay home.", ar: "موقف مستقبلي محدد: tomorrow تنقلنا إلى الشرط الأول.", tag: "FIRST", tone: "future" },
    ],
    points: [
      "Zero: IF + PRESENT SIMPLE, PRESENT SIMPLE — للحقائق العامة والعادات والنتائج المتكررة.",
      "First: IF + PRESENT SIMPLE, WILL + V1 — لاحتمال حقيقي أو ممكن في المستقبل.",
    ],
    note: "خطأ شائع: If it will rain tomorrow… ✗ — WILL لا تأتي في جزء IF في الشرط الأول العادي. الصواب: If it rains tomorrow, I will stay home. ✓",
  },
  {
    id: "zero-first-pairs",
    station: "zero-first",
    kind: "comparison",
    title: "ثلاث مقارنات: عادة عامة مقابل توقع مستقبلي",
    lead: "لاحظ كيف تغيّر كلمات الزمن (tonight / tomorrow) والنتيجة (will) نوع الجملة كلها.",
    mascot: "🔎",
    tone: "future",
    examples: ZERO_FIRST_PAIRS_51.flatMap((pair) => [
      { en: pair.zero.en, ar: `${pair.zero.ar} — ${pair.zeroFn}`, tag: "ZERO", tone: "law" as Tone51 },
      { en: pair.first.en, ar: `${pair.first.ar} — ${pair.firstFn}`, tag: "FIRST", tone: "future" as Tone51 },
    ]),
    note: "If it rains, the ground gets wet. ✓ — شرط صفري بمضارع في الطرفين، دون WILL.",
  },
  {
    id: "four-cases",
    station: "zero-first",
    kind: "comparison",
    title: "مقارنة موسعة: أربعة مواقف مختلفة",
    lead: "الموضوع واحد — شرب الماء — لكن نوع الشرط يتغير بين أربعة أنواع. نحن اليوم نركز على الشرط الصفري، ومن المفيد أن تعرف أن IF لها أنواع متعددة.",
    mascot: "🪐",
    tone: "review",
    examples: FOUR_CASES_51.map((item) => ({
      en: item.en,
      ar: `${item.ar} — ${item.label}`,
      tag: item.n,
      tone: item.tone,
    })),
    points: [
      "الشرط الثاني (Second): موقف افتراضي غير حقيقي أو غير قائم الآن.",
      "الشرط الثالث (Third): ماضٍ لم يحدث كما نتمنى.",
      "سندرس الشرط الثاني والثالث في الدروس القادمة.",
    ],
  },
  {
    id: "errors-wall",
    station: "mistakes",
    kind: "errors",
    title: "ستة أخطاء شائعة في Zero Conditional",
    lead: "ادرس الخطأ والتصحيح والسبب معًا. فهم السبب يحميك من تكرار الخطأ بصور جديدة.",
    mascot: "🧱",
    tone: "negative",
  },
  {
    id: "error-detective",
    station: "mistakes",
    kind: "detective",
    title: "كاشف الأخطاء: طبّق بنفسك",
    lead: "الآن دورك. في كل بطاقة اكتشف الخطأ واكتب التصحيح الكامل، وسيصلك تفسير فوري بعد المحاولة.",
    mascot: "🕵️",
    tone: "negative",
    practiceSet: "detective",
  },
  {
    id: "dialogue",
    station: "dialogue",
    kind: "dialogue",
    title: "حوار تطبيقي: Healthy Habits",
    lead: "Adam وSara يتحدثان عن العادات الصحية. اقرأ الحوار، ولاحظ كيف يربط كل شرط نتيجته المتكررة.",
    mascot: "💬",
    tone: "habit",
    dialogue: DIALOGUE_51.title,
  },
  {
    id: "reading",
    station: "reading",
    kind: "reading",
    title: "قطعة القراءة: The Science Club Experiment",
    lead: "تجربة نادي العلوم: اقرأ الإنجليزية أولًا، ثم أظهر الترجمة العربية عند الحاجة فقط.",
    mascot: "🔭",
    tone: "law",
    dialogue: "The Science Club Experiment",
  },
  {
    id: "reading-questions",
    station: "reading",
    kind: "readingQuestions",
    title: "أسئلة الفهم السبعة",
    lead: "اكتب إجابتك بالإنجليزية أولًا، ثم افتح النموذج للمقارنة. لا تعتمد على الترجمة قبل المحاولة.",
    mascot: "❓",
    tone: "review",
  },
  {
    id: "reading-hunt",
    station: "reading",
    kind: "readingHunt",
    title: "صيد التراكيب: عد إلى التجربة",
    lead: "أسئلة تحليلية قصيرة عن التراكيب نفسها داخل النص. اختر، ثم تحقق من التفسير.",
    mascot: "🧭",
    tone: "law",
  },
  {
    id: "practice-1",
    station: "practice",
    kind: "practice",
    title: "التدريب الأول: أكمل الفعل بالشكل الصحيح",
    lead: "ضع الفعل بين القوسين في Present Simple. انتبه إلى الفاعل: هل يحتاج S / ES أم لا؟",
    mascot: "✏️",
    tone: "law",
    practiceSet: "complete",
  },
  {
    id: "practice-2",
    station: "practice",
    kind: "practice",
    title: "التدريب الثاني: اختر الإجابة الصحيحة",
    lead: "ستة مواقف قصيرة. اقرأ الجملة كاملًا قبل الاختيار.",
    mascot: "☝️",
    tone: "habit",
    practiceSet: "choose",
  },
  {
    id: "practice-3",
    station: "practice",
    kind: "practice",
    title: "التدريب الثالث: Zero أم First؟",
    lead: "حدد نوع كل جملة: هل هي حقيقة عامة (Zero Conditional) أم احتمال مستقبلي (First Conditional)؟",
    mascot: "🏷️",
    tone: "future",
    practiceSet: "classify",
  },
  {
    id: "practice-4",
    station: "practice",
    kind: "practice",
    title: "التدريب الرابع: صحح الأخطاء",
    lead: "أعد كتابة كل جملة كاملة بعد التصحيح. خطأ واحد في كل جملة ينتظرك.",
    mascot: "🔧",
    tone: "negative",
    practiceSet: "correct",
  },
  {
    id: "practice-5",
    station: "practice",
    kind: "practice",
    title: "التدريب الخامس: ترجم إلى الإنجليزية",
    lead: "ترجم المعنى كاملًا: الشرط والنتيجة والتصريف. يُقبل البديل الصحيح الذي يحافظ على المعنى والتركيب.",
    mascot: "🌍",
    tone: "modal",
    practiceSet: "translate",
  },
  {
    id: "writing",
    station: "writing",
    kind: "writing",
    title: "مهمة الكتابة والتحدث",
    lead: "اكتب فقرة بعنوان My Everyday Habits and General Facts، ثم تحضّر حديثًا قصيرًا بعنوان What Happens If...?",
    mascot: "✍️",
    tone: "habit",
  },
  {
    id: "golden-review",
    station: "review",
    kind: "review",
    title: "الملخص والمراجعة الذكية",
    lead: "قبل الاختبار، ثبت الخريطة كاملة: القاعدة، والاستخدامات، والنفي، والأسئلة، والمقارنة مع الشرط الأول.",
    mascot: "🧠",
    tone: "review",
  },
  {
    id: "final-test",
    station: "final-test",
    kind: "test",
    title: "الاختبار النهائي الشامل — 25 سؤالًا",
    lead: "اختبار الدرس كاملًا: حل بنفسك أولًا. لن تظهر أي إجابة أو تفسير قبل التسليم النهائي.",
    mascot: "🏁",
    tone: "review",
  },
  {
    id: "teacher",
    station: "teacher",
    kind: "teacher",
    title: "مساحة المعلم",
    lead: "دليل تصحيح كامل مع البدائل المقبولة والملاحظات البيداغوجية. يُفتح بعد تسليم الاختبار فقط.",
    mascot: "🔑",
    tone: "review",
  },
  {
    id: "mastery-dashboard",
    station: "progress",
    kind: "dashboard",
    title: "لوحة إتقانك",
    lead: "ملخص صادق لما أنجزته في هذا الدرس فعلًا: المختبرات، والتدريبات، والكتابة، والاختبار النهائي.",
    mascot: "📈",
    tone: "review",
  },
  {
    id: "lesson-progress",
    station: "progress",
    kind: "progress",
    title: "ملخص الدرس والقاعدة الذهبية",
    lead: "ما تعلمته اليوم في إحدى عشرة نقطة، ثم قاعدة ذهبية واحدة تحملها معك إلى كل جملة قادمة.",
    mascot: "🏅",
    tone: "law",
  },
  {
    id: "next-lesson",
    station: "progress",
    kind: "roadmap",
    title: "الدرس القادم — 52: FIRST CONDITIONAL",
    lead: "الدرس 51 مكتمل. استعد للشرط الأول: الاحتمالات الحقيقية في المستقبل.",
    mascot: "➡️",
    tone: "review",
  },
];

export const LESSON_STEP_COUNT_51 = SLIDES_51.length;
