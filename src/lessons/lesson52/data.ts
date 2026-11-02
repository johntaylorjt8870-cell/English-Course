// ============================================================
// الدرس 52 — FIRST CONDITIONAL · الشرط الأول
// بيانات المحتوى والشرائح — نفس بنية بيانات الدرس الأول (Slide/Block)
// ============================================================

import { EXERCISES_52, type Exercise52, type LabId52 } from "./practiceData52";

export type Tone52 = "C" | "R" | "M";

export type Block52 =
  | { type: "text"; text: string }
  | { type: "term"; en: string; ar: string; desc?: string }
  | { type: "plain"; en: string; ar: string }
  | { type: "ok"; en: string; ar?: string }
  | { type: "bad"; en: string; ar?: string }
  | { type: "note"; emoji: string; text: string }
  | { type: "core" }
  | { type: "coreModal" }
  | { type: "formula"; parts: { text: string; ar?: string; tone: Tone52 }[] }
  | { type: "pair"; condition: { en: string; ar: string }; result: { en: string; ar: string }; label?: string }
  | { type: "examples"; title?: string; items: { en: string; ar: string }[] }
  | { type: "analysis"; parts: { tag: string; tone: Tone52; en: string; ar: string }[]; note?: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "bullets"; items: string[]; ordered?: boolean }
  | {
      type: "compare";
      zero: { en: string; ar: string; note: string };
      first: { en: string; ar: string; note: string };
    }
  | { type: "steps"; items: { n: string; title: string; text: string; tone: Tone52 }[] };

export type Slide52 = { id: string; station: string; mascot: string; rail?: string } & (
  | { kind: "cover" }
  | { kind: "goals" }
  | {
      kind: "lesson";
      step?: number;
      title: string;
      lead?: string;
      blocks: Block52[];
      tip?: string;
    }
  | { kind: "lab"; lab: LabId52; title: string; lead?: string; badge?: string }
  | { kind: "dialogue"; title: string; lead?: string }
  | { kind: "dialogueQuestions"; title: string }
  | { kind: "readingText"; title: string; lead?: string }
  | { kind: "readingTranslation"; title: string }
  | { kind: "readingQuestions"; title: string }
  | { kind: "readingHunt"; title: string }
  | { kind: "exercise"; exercise: Exercise52 }
  | { kind: "solutions"; part: 1 | 2; title: string }
  | { kind: "writing"; title: string }
  | { kind: "speaking"; title: string }
  | { kind: "summary"; title: string }
  | { kind: "review"; title: string }
  | { kind: "selfCheck"; title: string }
  | { kind: "quiz"; title: string }
  | { kind: "teacher"; title: string }
  | { kind: "dashboard"; title: string }
  | { kind: "progress"; title: string }
  | { kind: "roadmap"; title: string }
  | { kind: "closing"; title: string }
);

export const GOALS_52 = [
  "فهم معنى First Conditional والمواقف التي نستخدمه فيها.",
  "تطبيق القاعدة الأساسية: If + Present Simple, will + V1.",
  "تصريف الفعل في جملة الشرط مع جميع الضمائر.",
  "النفي في جملة الشرط وجملة النتيجة والجزأين معًا.",
  "تكوين الأسئلة باستخدام What وWhere وWho وWill.",
  "استخدام can وmay وmight وshould وmust في النتيجة.",
  "استخدام فعل الأمر في نتيجة الشرط.",
  "التمييز بين Zero Conditional وFirst Conditional.",
  "استخدام Unless بدل If ... not، والروابط الزمنية When وAs soon as وBefore وAfter وUntil.",
  "تصحيح الأخطاء الشائعة وإنتاج جمل شرط أول سليمة.",
];

export const STATIONS_52 = [
  { id: "opening", title: "البداية" },
  { id: "rule", title: "القاعدة الأساسية" },
  { id: "build", title: "بناء الجملة" },
  { id: "order", title: "الترتيب والترقيم" },
  { id: "negative", title: "النفي" },
  { id: "questions", title: "الأسئلة" },
  { id: "modals", title: "الأفعال الناقصة" },
  { id: "imperative", title: "الأمر" },
  { id: "zero-first", title: "الشرط الصفري والأول" },
  { id: "unless", title: "UNLESS" },
  { id: "time", title: "الروابط الزمنية" },
  { id: "mistakes", title: "الأخطاء الشائعة" },
  { id: "dialogue", title: "المحادثة" },
  { id: "reading", title: "القراءة" },
  { id: "practice", title: "التدريبات" },
  { id: "writing", title: "الكتابة والتحدث" },
  { id: "review", title: "الملخص والمراجعة" },
  { id: "test", title: "الاختبار النهائي" },
  { id: "teacher", title: "مساحة المعلم" },
  { id: "progress", title: "التقدم والدرس القادم" },
  { id: "closing", title: "الختام" },
];

const PRACTICE_MASCOTS = ["✏️", "🔘", "🛠️", "⚖️", "🔁", "🌍"];
const PRACTICE_RAILS = [
  "أكمل الفعل",
  "اختر الإجابة",
  "صحح الأخطاء",
  "Zero أم First",
  "أعد صياغة Unless",
  "الترجمة",
];

export const SLIDES_52: Slide52[] = [
  /* ---------------------------- البداية ---------------------------- */
  { id: "cover", station: "opening", mascot: "🌤️", kind: "cover", rail: "غلاف الدرس" },
  { id: "goals", station: "opening", mascot: "🎯", kind: "goals", rail: "أهداف الدرس" },
  {
    id: "intro",
    station: "opening",
    mascot: "🔗",
    rail: "من الدرس 51 إلى 52",
    kind: "lesson",
    step: 1,
    title: "من الشرط الصفري إلى الشرط الأول",
    lead: "في الدرس السابق درسنا الحقائق العامة. اليوم ننتقل إلى المستقبل.",
    blocks: [
      {
        type: "text",
        text: "تذكّر: [[Zero Conditional]] — الشرط الصفري — يعبّر عن الحقائق العامة والقواعد والأشياء التي تحدث عادةً عند تحقق شرط معين.",
      },
      {
        type: "examples",
        title: "مراجعة سريعة من الدرس 51",
        items: [
          { en: "If you heat ice, it melts.", ar: "إذا سخّنت الثلج، فإنه يذوب." },
          { en: "If I drink coffee at night, I can't sleep.", ar: "إذا شربت القهوة ليلًا، لا أستطيع النوم." },
        ],
      },
      {
        type: "note",
        emoji: "🌤️",
        text: "اليوم نتحدث عن شيء مختلف: احتمال حقيقي في المستقبل، ونتيجة تعتمد على تحقق الشرط.",
      },
      {
        type: "pair",
        condition: { en: "If it rains", ar: "إذا أمطرت السماء" },
        result: { en: "I will stay at home.", ar: "سأبقى في المنزل." },
      },
      {
        type: "text",
        text: "سنبدأ من الفكرة الأساسية، ثم القاعدة، ثم النفي والأسئلة والروابط، وبعد ذلك التدريبات والاختبار.",
      },
    ],
  },
  {
    id: "definition",
    station: "opening",
    mascot: "💡",
    rail: "ما هو الشرط الأول؟",
    kind: "lesson",
    step: 2,
    title: "ما هو First Conditional؟",
    lead: "الشرط الأول تركيب من أهم تراكيب اللغة الإنجليزية.",
    blocks: [
      { type: "term", en: "First Conditional", ar: "الشرط الأول", desc: "شرط واقعي محتمل في المستقبل، ونتيجة تعتمد على تحققه." },
      { type: "text", text: "نستخدمه للتحدث عن:" },
      {
        type: "bullets",
        items: [
          "شيء محتمل الحدوث في المستقبل.",
          "نتيجة مستقبلية تعتمد على تحقق شرط معين.",
          "تحذير أو وعد أو تهديد أو قرار مرتبط بشرط.",
          "موقف نعتقد أن حدوثه ممكن وواقعي.",
        ],
      },
      {
        type: "note",
        emoji: "🎯",
        text: "الشرط الأول لا يتحدث عن الخيال، بل عن احتمال واقعي يمكن أن يحدث فعلًا.",
      },
    ],
  },
  {
    id: "first-example",
    station: "opening",
    mascot: "🔍",
    rail: "مثالنا الأول",
    kind: "lesson",
    step: 3,
    title: "مثالنا الأول",
    lead: "تأمل: If it rains, I will stay at home.",
    blocks: [
      {
        type: "analysis",
        parts: [
          { tag: "① الشرط · CONDITION", tone: "C", en: "If it rains", ar: "إذا أمطرت السماء." },
          { tag: "② النتيجة · RESULT", tone: "R", en: "I will stay at home", ar: "سأبقى في المنزل." },
        ],
      },
      {
        type: "text",
        text: "لا نعرف هل ستمطر السماء أم لا، لكننا نتحدث عن احتمال حقيقي في المستقبل. إذا تحقق الشرط، فستحدث النتيجة التي ذكرناها.",
      },
      { type: "note", emoji: "🔗", text: "الفكرة المهمة: النتيجة المستقبلية مرتبطة بتحقق الشرط." },
    ],
    tip: "ابحث دائمًا عن جزأين: ماذا يجب أن يتحقق؟ وماذا سيحدث بعد ذلك؟",
  },
  {
    id: "cond-lab",
    station: "opening",
    mascot: "🎛️",
    rail: "حدد الشرط والنتيجة",
    kind: "lab",
    lab: "condResult",
    badge: "تفاعل 1",
    title: "حدد الشرط والنتيجة",
    lead: "اضغط على كل جزء لتحديد وظيفته، ثم اضغط «تحقق».",
  },

  /* ---------------------------- القاعدة ---------------------------- */
  {
    id: "core-rule",
    station: "rule",
    mascot: "📐",
    rail: "القاعدة الأساسية",
    kind: "lesson",
    step: 4,
    title: "القاعدة الأساسية",
    lead: "احفظ هذه القاعدة جيدًا:",
    blocks: [
      { type: "core" },
      { type: "text", text: "أي: [[If]] + المضارع البسيط، ثم [[will]] + الفعل في صورته الأساسية." },
      {
        type: "examples",
        title: "أمثلة",
        items: [
          { en: "If I study, I will pass the exam.", ar: "إذا درست، فسأنجح في الامتحان." },
          { en: "If she comes early, we will start the meeting.", ar: "إذا حضرت مبكرًا، فسنبدأ الاجتماع." },
          { en: "If they invite me, I will go to the party.", ar: "إذا دعوني، فسأذهب إلى الحفلة." },
          { en: "If you work hard, you will achieve your goals.", ar: "إذا عملت بجد، فستحقق أهدافك." },
        ],
      },
      { type: "note", emoji: "🧠", text: "الجزء بعد [[If]] مضارع بسيط، والنتيجة [[will + V1]]." },
    ],
    tip: "احفظ الصيغة كوحدة واحدة: IF + PRESENT SIMPLE, WILL + V1.",
  },
  {
    id: "will-trap",
    station: "rule",
    mascot: "⚠️",
    rail: "لا will بعد If",
    kind: "lesson",
    step: 5,
    title: "لا تضع will بعد If",
    lead: "هذه أكثر نقطة يخطئ فيها الطلاب.",
    blocks: [
      { type: "bad", en: "If I will study, I will pass.", ar: "خطأ شائع." },
      { type: "ok", en: "If I study, I will pass.", ar: "الصيغة الصحيحة." },
      {
        type: "text",
        text: "لماذا؟ لأن الإنجليزية تستخدم المضارع البسيط في جملة الشرط، حتى لو كان المعنى متعلقًا بالمستقبل.",
      },
      {
        type: "note",
        emoji: "⏳",
        text: "المعنى مستقبلي، لكن الصيغة بعد [[If]] تبقى مضارعًا بسيطًا. سنعود إلى هذه النقطة أكثر من مرة.",
      },
    ],
    tip: "If I study, I will pass — وليس If I will study.",
  },
  {
    id: "structure",
    station: "build",
    mascot: "🧱",
    rail: "كيف نكوّن الجملة؟",
    kind: "lesson",
    step: 6,
    title: "كيف نكوّن جملة الشرط الأول؟",
    lead: "لنأخذ الجملة: If he studies hard, he will succeed.",
    blocks: [
      {
        type: "analysis",
        parts: [
          { tag: "IF", tone: "C", en: "If", ar: "أداة الشرط." },
          { tag: "CONDITION", tone: "C", en: "he studies", ar: "الشرط بالمضارع البسيط." },
          { tag: "RESULT", tone: "R", en: "he will succeed", ar: "النتيجة باستخدام will." },
        ],
      },
      { type: "text", text: "لاحظ أن الفعل [[studies]] أخذ [[s]] لأن الفاعل هو [[he]]." },
      {
        type: "examples",
        title: "أمثلة إضافية",
        items: [
          { en: "If he works, he will earn money.", ar: "إذا عمل، فسوف يكسب المال." },
          { en: "If she practices, she will improve.", ar: "إذا تدربت، فسوف تتحسن." },
          { en: "If the bus arrives late, we will take a taxi.", ar: "إذا وصلت الحافلة متأخرة، فسنستقل سيارة أجرة." },
          { en: "If my father agrees, I will buy a new laptop.", ar: "إذا وافق والدي، فسأشتري حاسوبًا محمولًا جديدًا." },
        ],
      },
    ],
  },
  {
    id: "conjugation",
    station: "build",
    mascot: "🔤",
    rail: "تصريف الفعل",
    kind: "lesson",
    step: 7,
    title: "تصريف الفعل في جملة الشرط",
    lead: "نستخدم المضارع البسيط بقواعده المعتادة.",
    blocks: [
      {
        type: "table",
        head: ["الفاعل", "الصيغة", "مثال"],
        rows: [
          ["I / You / We / They", "V1", "If I feel tired, I will rest."],
          ["He / She / It", "V1 + s/es", "If she feels tired, she will rest."],
        ],
      },
      {
        type: "examples",
        title: "قارن",
        items: [
          { en: "If I feel tired, I will rest.", ar: "إذا شعرت بالتعب، سأرتاح." },
          { en: "If she feels tired, she will rest.", ar: "إذا شعرت بالتعب، فسترتاح." },
          { en: "If they arrive early, we will begin.", ar: "إذا وصلوا مبكرًا، سنبدأ." },
          { en: "If he arrives early, we will begin.", ar: "إذا وصل مبكرًا، سنبدأ." },
        ],
      },
      {
        type: "note",
        emoji: "✍️",
        text: "لا تنسَ إضافة [[s]] أو [[es]] عندما يحتاج الفعل إليها مع [[he]] أو [[she]] أو [[it]].",
      },
    ],
  },
  {
    id: "verb-lab",
    station: "build",
    mascot: "🔬",
    rail: "ورشة التصريف",
    kind: "lab",
    lab: "verbForm",
    badge: "تفاعل 2",
    title: "ورشة التصريف",
    lead: "اكتب الفعل بالصيغة الصحيحة، ثم اضغط «تحقق».",
  },

  /* ---------------------------- الترتيب ---------------------------- */
  {
    id: "order-rule",
    station: "order",
    mascot: "🔀",
    rail: "الترتيب والفاصلة",
    kind: "lesson",
    step: 8,
    title: "هل يجب أن تأتي جملة If في البداية؟",
    lead: "لا. يمكن وضع جملة الشرط في البداية أو في النهاية، والمعنى الأساسي يبقى نفسه.",
    blocks: [
      { type: "plain", en: "If I have enough money, I will buy a car.", ar: "إذا كان لدي مال كافٍ، فسأشتري سيارة." },
      { type: "plain", en: "I will buy a car if I have enough money.", ar: "سأشتري سيارة إذا كان لدي مال كافٍ." },
      {
        type: "bullets",
        items: [
          "إذا بدأت الجملة بجملة If، نضع فاصلة بين الشرط والنتيجة.",
          "إذا جاءت جملة If في النهاية، فلا نحتاج عادةً إلى فاصلة.",
        ],
      },
      {
        type: "examples",
        title: "أمثلة",
        items: [
          { en: "If you call me, I will answer. / I will answer if you call me.", ar: "إذا اتصلت بي، سأجيب. / سأجيب إذا اتصلت بي." },
          { en: "If she passes the test, she will celebrate. / She will celebrate if she passes the test.", ar: "إذا نجحت في الاختبار، فستحتفل. / ستحتفل إذا نجحت." },
          { en: "If we miss the train, we will take a bus. / We will take a bus if we miss the train.", ar: "إذا فاتنا القطار، فسنأخذ حافلة. / سنأخذ حافلة إذا فاتنا القطار." },
        ],
      },
      { type: "note", emoji: "📝", text: "المعنى واحد تقريبًا، والاختلاف في ترتيب أجزاء الجملة وعلامة الترقيم." },
    ],
  },
  {
    id: "order-lab",
    station: "order",
    mascot: "🧩",
    rail: "إعادة بناء الجملة",
    kind: "lab",
    lab: "order",
    badge: "تفاعل 3",
    title: "إعادة بناء الجملة",
    lead: "اضغط على الكلمات بالترتيب الصحيح. انتبه للفاصلة بعد الشرط.",
  },

  /* ---------------------------- النفي ---------------------------- */
  {
    id: "neg-condition",
    station: "negative",
    mascot: "🚫",
    rail: "نفي الشرط",
    kind: "lesson",
    step: 9,
    title: "النفي في جملة الشرط",
    lead: "نستخدم don't أو doesn't حسب الفاعل.",
    blocks: [
      {
        type: "formula",
        parts: [
          { text: "IF", tone: "C" },
          { text: "SUBJECT", tone: "C" },
          { text: "DON'T / DOESN'T", tone: "M" },
          { text: "V1", tone: "C" },
        ],
      },
      {
        type: "examples",
        items: [
          { en: "If I don't study, I will fail the exam.", ar: "إذا لم أدرس، فسوف أرسب في الامتحان." },
          { en: "If she doesn't hurry, she will miss the bus.", ar: "إذا لم تسرع، فستفوتها الحافلة." },
          { en: "If they don't leave now, they will arrive late.", ar: "إذا لم يغادروا الآن، فسيصلون متأخرين." },
        ],
      },
      {
        type: "note",
        emoji: "⚠️",
        text: "نقول [[If she doesn't study]] ولا نقول [[If she doesn't studies]]؛ لأن الفعل بعد [[doesn't]] يعود إلى [[V1]].",
      },
    ],
  },
  {
    id: "neg-result",
    station: "negative",
    mascot: "⛔",
    rail: "نفي النتيجة",
    kind: "lesson",
    step: 10,
    title: "النفي في النتيجة",
    lead: "نستخدم will not + V1 أو الاختصار won't + V1.",
    blocks: [
      {
        type: "formula",
        parts: [
          { text: "WILL NOT / WON'T", tone: "R" },
          { text: "V1", tone: "R" },
        ],
      },
      {
        type: "examples",
        items: [
          { en: "If it rains, we won't play football.", ar: "إذا أمطرت السماء، فلن نلعب كرة القدم." },
          { en: "If you don't apologize, I won't forgive you.", ar: "إذا لم تعتذر، فلن أسامحك." },
          { en: "If he arrives late, the teacher won't let him enter.", ar: "إذا وصل متأخرًا، فلن يسمح له المعلم بالدخول." },
        ],
      },
    ],
  },
  {
    id: "neg-both",
    station: "negative",
    mascot: "🔂",
    rail: "النفي في الجزأين",
    kind: "lesson",
    step: 11,
    title: "النفي في الجزأين معًا",
    lead: "يمكن استخدام النفي في جملة الشرط أو في جملة النتيجة أو في الجزأين معًا.",
    blocks: [
      {
        type: "examples",
        items: [
          { en: "If you don't practice, you won't improve.", ar: "إذا لم تتدرب، فلن تتحسن." },
          { en: "If she doesn't sleep well, she won't feel energetic.", ar: "إذا لم تنم جيدًا، فلن تشعر بالنشاط." },
        ],
      },
      { type: "text", text: "في المثالين السابقين: الشرط منفي بـ[[don't]] أو [[doesn't]]، والنتيجة منفية بـ[[won't]]." },
      { type: "note", emoji: "🎯", text: "حدد موضع النفي أولًا: هل ننفي الشرط، أم النتيجة، أم كليهما؟" },
    ],
  },
  {
    id: "neg-lab",
    station: "negative",
    mascot: "🧪",
    rail: "باني النفي",
    kind: "lab",
    lab: "negation",
    badge: "تفاعل 4",
    title: "باني النفي",
    lead: "اختر صيغة النفي الصحيحة في كل جملة، ثم اضغط «تحقق».",
  },

  /* ---------------------------- الأسئلة ---------------------------- */
  {
    id: "question-forms",
    station: "questions",
    mascot: "❓",
    rail: "صيغ الأسئلة",
    kind: "lesson",
    step: 12,
    title: "تكوين الأسئلة باستخدام First Conditional",
    lead: "نسأل عن ما سيحدث إذا تحقق شرط معين.",
    blocks: [
      {
        type: "formula",
        parts: [
          { text: "WHAT", tone: "M" },
          { text: "WILL", tone: "R" },
          { text: "SUBJECT", tone: "C" },
          { text: "V1", tone: "R" },
          { text: "IF + PRESENT SIMPLE", tone: "C" },
        ],
      },
      {
        type: "examples",
        title: "أمثلة",
        items: [
          { en: "What will you do if you fail the exam?", ar: "ماذا ستفعل إذا رسبت في الامتحان؟" },
          { en: "What will she do if he refuses?", ar: "ماذا ستفعل إذا رفض؟" },
          { en: "Where will you go if you have a holiday?", ar: "إلى أين ستذهب إذا حصلت على إجازة؟" },
          { en: "Who will you call if you need help?", ar: "من ستتصل به إذا احتجت إلى المساعدة؟" },
        ],
      },
      { type: "text", text: "لاحظ ترتيب السؤال: [[What + will + subject + V1 + if + Present Simple?]]" },
      { type: "plain", en: "What will happen if we don't protect the environment?", ar: "ماذا سيحدث إذا لم نحافظ على البيئة؟" },
    ],
  },
  {
    id: "yes-no",
    station: "questions",
    mascot: "✅",
    rail: "أسئلة Will",
    kind: "lesson",
    step: 13,
    title: "أسئلة تبدأ بـWill",
    lead: "نسأل عن نتيجة محتملة، ويكون الجواب بـYes/No.",
    blocks: [
      {
        type: "examples",
        items: [
          { en: "Will you help me if I ask you?", ar: "هل ستساعدني إذا طلبت منك ذلك؟" },
          { en: "Will she come if we invite her?", ar: "هل ستحضر إذا دعوناها؟" },
          { en: "Will they stay if it rains?", ar: "هل سيبقون إذا أمطرت السماء؟" },
        ],
      },
      {
        type: "examples",
        title: "الإجابة القصيرة",
        items: [
          { en: "Yes, I will. / No, I won't.", ar: "نعم، سأفعل. / لا، لن أفعل." },
          { en: "Yes, she will. / No, she won't.", ar: "نعم، ستفعل. / لا، لن تفعل." },
        ],
      },
      { type: "note", emoji: "🔁", text: "السؤال يبدأ بـ[[Will]] ثم الفاعل ثم [[V1]]، وجملة [[if]] تبقى في المضارع البسيط." },
    ],
  },
  {
    id: "question-order-lab",
    station: "questions",
    mascot: "🔤",
    rail: "ترتيب السؤال",
    kind: "lab",
    lab: "questionOrder",
    badge: "تفاعل 5",
    title: "ترتيب كلمات السؤال",
    lead: "اضغط على الكلمات بالترتيب الصحيح لتكوين سؤال شرط أول.",
  },

  /* ---------------------------- الأفعال الناقصة ---------------------------- */
  {
    id: "modal-can",
    station: "modals",
    mascot: "💪",
    rail: "CAN",
    kind: "lesson",
    step: 14,
    title: "الأفعال الناقصة في النتيجة — CAN",
    lead: "النتيجة في الشرط الأول لا يجب أن تحتوي دائمًا على will.",
    blocks: [
      { type: "text", text: "يمكن استخدام أفعال ناقصة أخرى حسب المعنى. نبدأ بـ[[can]] للقدرة أو الإمكانية." },
      {
        type: "examples",
        items: [
          { en: "If you finish your homework, you can watch TV.", ar: "إذا أنهيت واجبك، يمكنك مشاهدة التلفاز." },
          { en: "If we leave early, we can catch the train.", ar: "إذا غادرنا مبكرًا، يمكننا اللحاق بالقطار." },
          { en: "If you save enough money, you can buy a new phone.", ar: "إذا ادخرت مالًا كافيًا، يمكنك شراء هاتف جديد." },
        ],
      },
      { type: "note", emoji: "💡", text: "[[can + V1]] تعبّر عن إمكانية حقيقية في النتيجة." },
    ],
  },
  {
    id: "modal-may",
    station: "modals",
    mascot: "🎲",
    rail: "MAY وMIGHT",
    kind: "lesson",
    step: 15,
    title: "MAY و MIGHT — الاحتمال",
    lead: "نستخدم may أو might للتعبير عن احتمال حدوث النتيجة.",
    blocks: [
      {
        type: "examples",
        items: [
          { en: "If it rains, we may cancel the trip.", ar: "إذا أمطرت السماء، فقد نلغي الرحلة." },
          { en: "If she studies hard, she might get a scholarship.", ar: "إذا درست بجد، فقد تحصل على منحة دراسية." },
        ],
      },
      {
        type: "text",
        text: "الفرق بين [[may]] و[[might]] يرتبط بدرجة الاحتمال والسياق، لكن كليهما يمكن أن يعبّر عن احتمال.",
      },
      { type: "note", emoji: "🌦️", text: "الاحتمال ليس يقينًا: may/might + V1 في النتيجة." },
    ],
  },
  {
    id: "modal-should",
    station: "modals",
    mascot: "🧭",
    rail: "SHOULD وMUST",
    kind: "lesson",
    step: 16,
    title: "SHOULD و MUST — النصيحة والضرورة",
    lead: "لكل فعل ناقص معنى مختلف في النتيجة.",
    blocks: [
      {
        type: "examples",
        title: "SHOULD — نصيحة",
        items: [
          { en: "If you feel sick, you should see a doctor.", ar: "إذا شعرت بالمرض، فمن الأفضل أن تزور طبيبًا." },
          { en: "If he wants to improve, he should practice every day.", ar: "إذا أراد أن يتحسن، فعليه أن يتدرب كل يوم." },
        ],
      },
      {
        type: "examples",
        title: "MUST — ضرورة أو إلزام",
        items: [
          { en: "If you enter the laboratory, you must wear safety glasses.", ar: "إذا دخلت المختبر، فيجب أن ترتدي نظارات السلامة." },
          { en: "If you drive, you must wear your seat belt.", ar: "إذا قدت السيارة، فيجب أن ترتدي حزام الأمان." },
        ],
      },
      {
        type: "table",
        head: ["الفعل", "المعنى", "مثال في النتيجة"],
        rows: [
          ["can", "قدرة / إمكانية", "you can watch TV"],
          ["may / might", "احتمال", "we may cancel the trip"],
          ["should", "نصيحة", "you should see a doctor"],
          ["must", "ضرورة / إلزام", "you must wear safety glasses"],
        ],
      },
    ],
  },
  {
    id: "modal-formula",
    station: "modals",
    mascot: "📐",
    rail: "صيغة الفعل الناقص",
    kind: "lesson",
    step: 17,
    title: "شكل الشرط الأول مع الفعل الناقص",
    lead: "يمكن أن يكون شكل الشرط الأول:",
    blocks: [
      { type: "coreModal" },
      { type: "text", text: "تذكّر أن الفعل بعد [[can]] و[[may]] و[[might]] و[[should]] و[[must]] يكون في صورته الأساسية [[V1]]." },
      { type: "note", emoji: "🚫", text: "لا نقول [[will can]] ولا [[must to]]؛ الفعل الناقص لا يُجمع مع will بهذه الطريقة." },
    ],
  },
  {
    id: "modal-lab",
    station: "modals",
    mascot: "⚙️",
    rail: "مختبر النتائج",
    kind: "lab",
    lab: "modal",
    badge: "تفاعل 6",
    title: "مختبر النتائج",
    lead: "اختر الفعل الناقص المناسب لمعنى النتيجة، ثم اضغط «تحقق».",
  },
  {
    id: "outcome-lab",
    station: "modals",
    mascot: "🌤️",
    rail: "المواقف المستقبلية",
    kind: "lab",
    lab: "outcome",
    badge: "تفاعل 7",
    title: "مختبر المواقف المستقبلية",
    lead: "اختر النتيجة المنطقية لكل موقف مستقبلي، ثم اضغط «تحقق».",
  },

  /* ---------------------------- الأمر ---------------------------- */
  {
    id: "imperative",
    station: "imperative",
    mascot: "📣",
    rail: "الأمر في النتيجة",
    kind: "lesson",
    step: 18,
    title: "استخدام الأمر في نتيجة الشرط",
    lead: "يمكن أن تأتي النتيجة على شكل أمر بدلًا من will.",
    blocks: [
      {
        type: "examples",
        items: [
          { en: "If you see Ahmed, tell him to call me.", ar: "إذا رأيت أحمد، فأخبره أن يتصل بي." },
          { en: "If you feel tired, take a break.", ar: "إذا شعرت بالتعب، فخذ استراحة." },
          { en: "If you need anything, let me know.", ar: "إذا احتجت إلى أي شيء، فأخبرني." },
          { en: "If the phone rings, answer it.", ar: "إذا رن الهاتف، فأجب عنه." },
        ],
      },
      {
        type: "text",
        text: "هنا لا نستخدم [[will]] لأننا نعطي تعليمات أو أوامر مرتبطة بتحقق الشرط.",
      },
      { type: "note", emoji: "✅", text: "الشرط يبقى مضارعًا بسيطًا، والنتيجة فعل أمر." },
    ],
  },

  /* ---------------------------- Zero vs First ---------------------------- */
  {
    id: "zero-first-table",
    station: "zero-first",
    mascot: "⚖️",
    rail: "جدول المقارنة",
    kind: "lesson",
    step: 19,
    title: "الفرق بين Zero Conditional وFirst Conditional",
    lead: "هذا من أهم أجزاء الدرس؛ لأننا تعلمنا الشرط الصفري أمس ونستخدم الأول اليوم.",
    blocks: [
      {
        type: "table",
        head: ["المقارنة", "Zero Conditional", "First Conditional"],
        rows: [
          ["الاستخدام", "حقائق وقواعد عامة", "احتمالات مستقبلية حقيقية"],
          ["الشرط", "Present Simple", "Present Simple"],
          ["النتيجة", "Present Simple", "will + V1 غالبًا"],
          ["الفكرة", "يحدث عادةً", "قد يحدث مستقبلًا"],
        ],
      },
      { type: "text", text: "الخلاصة: [[Zero Conditional]] = حقيقة أو نتيجة معتادة. [[First Conditional]] = شرط واقعي محتمل ونتيجة مستقبلية." },
    ],
    tip: "الزمن وحده ليس كافيًا للتصنيف؛ يجب أن تفهم المعنى.",
  },
  {
    id: "zero-first-pairs",
    station: "zero-first",
    mascot: "🔍",
    rail: "ثلاث مقارنات",
    kind: "lesson",
    step: 20,
    title: "ثلاث مقارنات تطبيقية",
    lead: "لاحظ كيف يتغير المعنى بين الصيغتين.",
    blocks: [
      {
        type: "compare",
        zero: {
          en: "If you heat ice, it melts.",
          ar: "إذا سخّنت الثلج، فإنه يذوب.",
          note: "حقيقة علمية عامة.",
        },
        first: {
          en: "If you put the ice in the sun, it will melt.",
          ar: "إذا وضعت الثلج تحت الشمس، فسوف يذوب.",
          note: "موقف محدد ونتيجة مستقبلية متوقعة.",
        },
      },
      {
        type: "compare",
        zero: {
          en: "If I drink coffee at night, I can't sleep.",
          ar: "إذا شربت القهوة ليلًا، لا أستطيع النوم.",
          note: "شيء يحدث عادةً.",
        },
        first: {
          en: "If I drink coffee tonight, I won't sleep well.",
          ar: "إذا شربت القهوة الليلة، فلن أنام جيدًا.",
          note: "ليلة محددة في المستقبل.",
        },
      },
      {
        type: "compare",
        zero: {
          en: "If people don't eat, they get hungry.",
          ar: "إذا لم يأكل الناس، فإنهم يشعرون بالجوع.",
          note: "حقيقة عامة.",
        },
        first: {
          en: "If you don't eat breakfast tomorrow, you will feel hungry.",
          ar: "إذا لم تتناول الإفطار غدًا، فستشعر بالجوع.",
          note: "توقع متعلق بوقت محدد في المستقبل.",
        },
      },
    ],
  },
  {
    id: "zero-first-lab",
    station: "zero-first",
    mascot: "🎚️",
    rail: "Zero أم First؟",
    kind: "lab",
    lab: "zeroFirst",
    badge: "تفاعل 8",
    title: "Zero أم First؟",
    lead: "صنّف كل جملة حسب معناها، ثم اضغط «تحقق».",
  },

  /* ---------------------------- Unless ---------------------------- */
  {
    id: "unless-rule",
    station: "unless",
    mascot: "🔁",
    rail: "معنى Unless",
    kind: "lesson",
    step: 21,
    title: "استخدام UNLESS بدل IF NOT",
    lead: "كلمة unless تعني: إلا إذا، أو ما لم.",
    blocks: [
      { type: "term", en: "unless", ar: "إلا إذا / ما لم", desc: "تؤدي معنى قريبًا من If ... not." },
      {
        type: "pair",
        label: "المعنى نفسه",
        condition: { en: "If you don't hurry,", ar: "إذا لم تسرع،" },
        result: { en: "you will miss the bus.", ar: "فسوف تفوتك الحافلة." },
      },
      {
        type: "examples",
        items: [
          { en: "Unless you hurry, you will miss the bus.", ar: "ما لم تسرع، فسوف تفوتك الحافلة." },
          { en: "If you don't study, you won't pass. = Unless you study, you won't pass.", ar: "إذا لم تدرس، فلن تنجح. = ما لم تدرس، فلن تنجح." },
          { en: "I won't go out if it doesn't stop raining. = I won't go out unless it stops raining.", ar: "لن أخرج إذا لم يتوقف المطر. = لن أخرج ما لم يتوقف المطر." },
        ],
      },
      { type: "note", emoji: "🧠", text: "[[Unless]] تحمل معنى النفي أصلًا، لذلك لا نضيف [[don't]] عادةً بعدها." },
    ],
  },
  {
    id: "unless-error",
    station: "unless",
    mascot: "⚠️",
    rail: "خطأ شائع مع Unless",
    kind: "lesson",
    step: 22,
    title: "انتبه: لا نضيف نفيًا بعد Unless",
    lead: "Unless منفية أصلًا.",
    blocks: [
      { type: "bad", en: "Unless you don't study, you will fail.", ar: "خطأ: نفي مزدوج." },
      { type: "ok", en: "Unless you study, you will fail.", ar: "الصيغة الصحيحة." },
      { type: "text", text: "المعنى: إذا لم تدرس، فسوف ترسب. لذلك لا نستخدم [[don't]] مع [[unless]] في هذا التركيب." },
      {
        type: "examples",
        title: "صورتان للمعنى نفسه",
        items: [
          { en: "If she doesn't hurry, she will miss the bus.", ar: "إذا لم تسرع، فستفوتها الحافلة." },
          { en: "Unless she hurries, she will miss the bus.", ar: "ما لم تسرع، فستفوتها الحافلة." },
        ],
      },
    ],
  },
  {
    id: "unless-lab",
    station: "unless",
    mascot: "✍️",
    rail: "أعد صياغة Unless",
    kind: "lab",
    lab: "unless",
    badge: "تفاعل 9",
    title: "أعد الصياغة باستخدام Unless",
    lead: "اكتب الجملة كاملة، ثم اضغط «تحقق».",
  },

  /* ---------------------------- الروابط الزمنية ---------------------------- */
  {
    id: "time-linkers",
    station: "time",
    mascot: "⏰",
    rail: "When وAs soon as…",
    kind: "lesson",
    step: 23,
    title: "روابط أخرى بدل If",
    lead: "توجد روابط أخرى يمكن أن تأتي في جمل الشرط.",
    blocks: [
      {
        type: "table",
        head: ["الرابط", "المعنى", "مثال"],
        rows: [
          ["When", "عندما", "When I arrive, I will call you."],
          ["As soon as", "بمجرد أن", "As soon as she finishes work, she will come home."],
          ["Before", "قبل أن", "Before you leave, I will give you the keys."],
          ["After", "بعد أن", "After he arrives, we will start dinner."],
          ["Until", "حتى", "I will wait until you come back."],
        ],
      },
      {
        type: "text",
        text: "عندما نتحدث عن المستقبل باستخدام هذه الروابط الزمنية، نستخدم المضارع البسيط في الجملة التابعة، وليس [[will]] عادةً.",
      },
      {
        type: "examples",
        items: [
          { en: "When I arrive, I will call you.", ar: "عندما أصل، سأتصل بك." },
          { en: "As soon as she finishes work, she will come home.", ar: "بمجرد أن تنتهي من العمل، ستعود إلى المنزل." },
          { en: "Before you leave, I will give you the keys.", ar: "قبل أن تغادر، سأعطيك المفاتيح." },
          { en: "After he arrives, we will start dinner.", ar: "بعد أن يصل، سنبدأ العشاء." },
          { en: "I will wait until you come back.", ar: "سأنتظر حتى تعود." },
        ],
      },
      {
        type: "note",
        emoji: "⚠️",
        text: "نقول [[When I arrive, I will call you]] ولا نقول [[When I will arrive, I will call you]]؛ القاعدة تشبه If.",
      },
    ],
  },
  {
    id: "if-vs-when",
    station: "time",
    mascot: "🕰️",
    rail: "IF أم WHEN؟",
    kind: "lesson",
    step: 24,
    title: "الفرق بين IF وWHEN",
    lead: "رغم أن كليهما قد يأتي في جمل مستقبلية، فالمعنى مختلف.",
    blocks: [
      {
        type: "compare",
        zero: {
          en: "If he comes, I will talk to him.",
          ar: "إذا جاء، فسأتحدث معه.",
          note: "IF = إذا — قد يأتي وقد لا يأتي؛ الحدوث غير مؤكد.",
        },
        first: {
          en: "When he comes, I will talk to him.",
          ar: "عندما يأتي، سأتحدث معه.",
          note: "WHEN = عندما — المتكلم يتعامل مع مجيئه كأمر متوقع.",
        },
      },
      {
        type: "examples",
        title: "قارن",
        items: [
          { en: "If I see her, I will tell her.", ar: "إذا رأيتها، فسأخبرها." },
          { en: "When I see her, I will tell her.", ar: "عندما أراها، فسأخبرها." },
        ],
      },
      { type: "note", emoji: "🎯", text: "الاختلاف في درجة توقع حدوث الموقف، لا في صيغة الفعل." },
    ],
  },
  {
    id: "if-when-lab",
    station: "time",
    mascot: "🎚️",
    rail: "IF أم WHEN؟ — تفاعل",
    kind: "lab",
    lab: "ifWhen",
    badge: "تفاعل 10",
    title: "اختر IF أو WHEN",
    lead: "اقرأ السياق، ثم اختر الكلمة الأنسب للتركيز المطلوب.",
  },

  /* ---------------------------- الأخطاء ---------------------------- */
  {
    id: "errors-1",
    station: "mistakes",
    mascot: "🚨",
    rail: "الأخطاء 1–3",
    kind: "lesson",
    step: 25,
    title: "الأخطاء الشائعة (1–3)",
    lead: "اقرأ كل خطأ بعناية، ثم قارنه بالصيغة الصحيحة.",
    blocks: [
      {
        type: "bad",
        en: "If I will see him, I will tell him.",
        ar: "الخطأ: will بعد If.",
      },
      { type: "ok", en: "If I see him, I will tell him.", ar: "السبب: نستخدم المضارع البسيط في جملة الشرط." },
      { type: "bad", en: "If she study, she will pass.", ar: "الخطأ: نسيان s مع she." },
      { type: "ok", en: "If she studies, she will pass.", ar: "السبب: الفاعل she يحتاج إلى s في المضارع البسيط." },
      { type: "bad", en: "If he doesn't studies, he will fail.", ar: "الخطأ: إضافة s بعد doesn't." },
      { type: "ok", en: "If he doesn't study, he will fail.", ar: "السبب: بعد doesn't نستخدم V1." },
    ],
  },
  {
    id: "errors-2",
    station: "mistakes",
    mascot: "🚨",
    rail: "الأخطاء 4–6",
    kind: "lesson",
    step: 26,
    title: "الأخطاء الشائعة (4–6)",
    lead: "ثلاثة أخطاء أخرى يجب ألا تقع فيها.",
    blocks: [
      { type: "bad", en: "If I studied tomorrow, I will pass.", ar: "الخطأ: استخدام V2 بعد If." },
      { type: "ok", en: "If I study tomorrow, I will pass.", ar: "السبب: في الشرط الأول نستخدم المضارع البسيط." },
      { type: "bad", en: "If you study, you will can pass.", ar: "الخطأ: will مع فعل ناقص." },
      { type: "ok", en: "If you study, you can pass.", ar: "الصيغة الصحيحة: can + V1." },
      { type: "bad", en: "When she will arrive, I will call you.", ar: "الخطأ: will في جملة when." },
      { type: "ok", en: "When she arrives, I will call you.", ar: "السبب: المضارع البسيط بعد when." },
    ],
  },
  {
    id: "error-lab",
    station: "mistakes",
    mascot: "🕵️",
    rail: "كاشف الأخطاء",
    kind: "lab",
    lab: "error",
    badge: "تفاعل 11",
    title: "كاشف الأخطاء",
    lead: "أعد كتابة كل جملة بعد تصحيحها، ثم اضغط «تحقق».",
  },

  /* ---------------------------- الحوار ---------------------------- */
  {
    id: "dialogue",
    station: "dialogue",
    mascot: "💬",
    rail: "Planning for the Weekend",
    kind: "dialogue",
    title: "محادثة تطبيقية: Planning for the Weekend",
    lead: "لاحظ كيف يستخدم المتحدثان الشرط الأول في الحديث عن المستقبل.",
  },
  {
    id: "dialogue-questions",
    station: "dialogue",
    mascot: "❓",
    rail: "أسئلة المحادثة",
    kind: "dialogueQuestions",
    title: "أسئلة على المحادثة",
  },

  /* ---------------------------- القراءة ---------------------------- */
  {
    id: "reading-text",
    station: "reading",
    mascot: "📖",
    rail: "Preparing for the Competition",
    kind: "readingText",
    title: "قطعة قراءة: Preparing for the School Competition",
    lead: "اقرأ القطعة بتركيز، ولاحظ كل جملة شرط أول.",
  },
  {
    id: "reading-translation",
    station: "reading",
    mascot: "🌍",
    rail: "الترجمة العربية",
    kind: "readingTranslation",
    title: "الترجمة العربية للقطعة",
  },
  {
    id: "reading-questions",
    station: "reading",
    mascot: "🧠",
    rail: "أسئلة الفهم",
    kind: "readingQuestions",
    title: "أسئلة الفهم",
  },
  {
    id: "reading-hunt",
    station: "reading",
    mascot: "🔎",
    rail: "صيد التراكيب",
    kind: "readingHunt",
    title: "صيد التراكيب من النص",
  },

  /* ---------------------------- التدريبات ---------------------------- */
  ...EXERCISES_52.map((exercise, index) => ({
    id: `practice-${index + 1}`,
    station: "practice",
    mascot: PRACTICE_MASCOTS[index],
    rail: PRACTICE_RAILS[index],
    kind: "exercise" as const,
    exercise,
  })),
  {
    id: "solutions-1",
    station: "practice",
    mascot: "💡",
    rail: "إجابات 1–3",
    kind: "solutions",
    part: 1,
    title: "إجابات التدريبات 1–3 مع التوضيح",
  },
  {
    id: "solutions-2",
    station: "practice",
    mascot: "💡",
    rail: "إجابات 4–6",
    kind: "solutions",
    part: 2,
    title: "إجابات التدريبات 4–6 مع التوضيح",
  },

  /* ---------------------------- الكتابة والتحدث ---------------------------- */
  { id: "writing", station: "writing", mascot: "✍️", rail: "Writing Task", kind: "writing", title: "مهمة الكتابة: My Plans for the Future" },
  { id: "speaking", station: "writing", mascot: "🗣️", rail: "Speaking Task", kind: "speaking", title: "مهمة التحدث: Future Possibilities" },

  /* ---------------------------- المراجعة ---------------------------- */
  { id: "summary", station: "review", mascot: "🧠", rail: "الملخص النهائي", kind: "summary", title: "الملخص النهائي للدرس 52" },
  { id: "review", station: "review", mascot: "⭐", rail: "المراجعة الذهبية", kind: "review", title: "المراجعة الذهبية" },
  { id: "self-check", station: "review", mascot: "✅", rail: "اختبر نفسك", kind: "selfCheck", title: "هل أتقنت الدرس؟" },

  /* ---------------------------- الاختبار ---------------------------- */
  { id: "final-test", station: "test", mascot: "📝", rail: "25 سؤالًا", kind: "quiz", title: "الاختبار النهائي" },

  /* ---------------------------- المعلم والتقدم ---------------------------- */
  { id: "teacher", station: "teacher", mascot: "🔐", rail: "دليل المعلم", kind: "teacher", title: "مساحة المعلم" },
  { id: "dashboard", station: "progress", mascot: "📊", rail: "لوحة الإنجاز", kind: "dashboard", title: "لوحة تقدمك الحقيقية" },
  { id: "progress", station: "progress", mascot: "🏁", rail: "52 من 120", kind: "progress", title: "تقدمنا في المنهج" },
  { id: "roadmap", station: "progress", mascot: "➡️", rail: "الدرس 53", kind: "roadmap", title: "الدرس القادم: 53 — SECOND CONDITIONAL" },
  { id: "closing", station: "closing", mascot: "🏆", rail: "الختام", kind: "closing", title: "إتمام الدرس" },
];

export const LESSON_STEP_COUNT_52 = SLIDES_52.length;

export const SLIDE_TITLES_52: Record<string, string> = Object.fromEntries(
  SLIDES_52.map((slide) => [slide.id, slide.rail ?? ("title" in slide ? slide.title : "الدرس 52")]),
);

export const FINAL_TEST_STEP_52 = SLIDES_52.findIndex((slide) => slide.kind === "quiz");
export const TEACHER_STEP_52 = SLIDES_52.findIndex((slide) => slide.kind === "teacher");
