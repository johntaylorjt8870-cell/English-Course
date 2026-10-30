/** Lesson 47: student-facing teaching content. Test solutions live in testKey47. */
export type Tone47 = "wish" | "prefer" | "request" | "neutral";
export type Example47 = { en: string; ar: string; tag?: string; tone?: Tone47 };
export type Turn47 = { speaker: string; en: string; ar?: string };
export type CompareRow47 = { label: string; cells: readonly string[] };
export type Table47 = { head: readonly string[]; rows: readonly CompareRow47[]; note?: string };
export type SlideKind47 =
  | "cover"
  | "goals"
  | "lanes"
  | "lesson"
  | "comparison"
  | "dialogue"
  | "practice"
  | "wordOrder"
  | "reading"
  | "readingQuestions"
  | "test"
  | "teacher"
  | "writing"
  | "summary"
  | "roadmap";

export type Slide47 = {
  id: string;
  station: string;
  kind: SlideKind47;
  title: string;
  lead?: string;
  mascot?: string;
  tone?: Tone47;
  formula?: readonly string[];
  examples?: readonly Example47[];
  points?: readonly string[];
  note?: string;
  /** قاعدة ذهبية تُعرض في شريط داكن أسفل الشريحة */
  tip?: string;
  turns?: readonly Turn47[];
  practiceSet?: string;
  labId?: string;
  table?: Table47;
};

export const STATIONS_47 = [
  { id: "opening", title: "فنّ الاختيار" },
  { id: "would-core", title: "أساسيات WOULD" },
  { id: "would-like", title: "الرغبات: WOULD LIKE" },
  { id: "would-rather", title: "التفضيلات: WOULD RATHER" },
  { id: "rather-subject", title: "الفاعلان والماضي" },
  { id: "polite-requests", title: "الطلبات المهذبة" },
  { id: "modal-compare", title: "خريطة الأفعال" },
  { id: "dialogs", title: "مواقف حياتية" },
  { id: "detective", title: "محقق القواعد" },
  { id: "practice", title: "التدريب المتدرج" },
  { id: "reading", title: "القراءة والفهم" },
  { id: "test", title: "الاختبار والمعلم" },
  { id: "writing", title: "مهمة الكتابة" },
  { id: "summary", title: "الملخص الذهبي" },
  { id: "progress", title: "خريطة التقدم" },
] as const;

/**
 * البطاقات الثلاث التي تُقدَّم في الغلاف: الرغبة، التفضيل، الطلب المهذب.
 * اللون والرمز ثابتان في الدرس كله — كما في نظام الأدوار في الدرس الأول.
 */
export const LANES_47 = [
  {
    id: "wish",
    tone: "wish" as const,
    n: "01",
    phrase: "WOULD LIKE",
    formula: "would like + noun / to + V1",
    ar: "أودّ / أرغب في",
    question: "ماذا أريد؟",
    emoji: "☕",
    example: "I'd like some orange juice, please.",
    exampleAr: "أود بعض عصير البرتقال، من فضلك.",
  },
  {
    id: "prefer",
    tone: "prefer" as const,
    n: "02",
    phrase: "WOULD RATHER",
    formula: "would rather + V1 (+ than + V1)",
    ar: "أفضّل",
    question: "أيّ الخيارين أختار؟",
    emoji: "⚖️",
    example: "I'd rather sit outside.",
    exampleAr: "أفضّل الجلوس في الخارج.",
  },
  {
    id: "request",
    tone: "request" as const,
    n: "03",
    phrase: "WOULD YOU MIND",
    formula: "Would you mind + V-ing?",
    ar: "هل تمانع في...؟",
    question: "كيف أطلب بلطف؟",
    emoji: "🤝",
    example: "Would you mind opening the window, please?",
    exampleAr: "هل تمانع في فتح النافذة، من فضلك؟",
  },
] as const;

export const GOALS_47 = [
  "فهم WOULD بوصفها فعلًا مساعدًا ناقصًا ثابت الصيغة.",
  "استخدام WOULD LIKE للتعبير عن الرغبة، والتمييز بينها وبين WANT.",
  "استخدام WOULD LIKE + noun و WOULD LIKE + to + V1 بدقة.",
  "تكوين الأسئلة بـ WOULD YOU LIKE...? والإجابة عنها بعروض ودعوات.",
  "استخدام WOULD LIKE + person + to + V1 للرغبة في فعل شخص آخر.",
  "استخدام WOULD RATHER + V1 للتعبير عن التفضيل دون TO.",
  "المقارنة بين خيارين بـ WOULD RATHER ... THAN ...",
  "التعبير عن تفضيل عدم القيام بفعل بـ WOULD RATHER NOT.",
  "التمييز بين فاعل واحد وفاعلين في WOULD RATHER.",
  "فهم WOULD RATHER + subject + past simple للتفضيل في الحاضر والمستقبل.",
  "استخدام WOULD YOU MIND + V-ing في الطلبات المهذبة.",
  "فهم أن NO في جواب WOULD YOU MIND تعني عدم الممانعة والموافقة.",
  "المقارنة بين WOULD وCOULD وSHOULD بحسب الوظيفة والسياق.",
  "تصحيح الأخطاء الشائعة في الرغبات والتفضيلات والطلبات.",
  "تطبيق القواعد في حوارات واقعية واختبار شامل من 25 سؤالًا.",
] as const;

export const SLIDES_47: readonly Slide47[] = [
  /* ------------------------------------------------------------
     المدخل
     ------------------------------------------------------------ */
  {
    id: "cover",
    station: "opening",
    kind: "cover",
    mascot: "🎟️",
    title: "فنّ الاختيار واللباقة",
    lead: "ثلاث بطاقات صغيرة تفتح لك المطعم والصفّ والسفر: أعبّر عمّا أريد، وأختار ما أفضل، وأطلب بلطف. هذه هي لغة الرغبات والتفضيلات في الإنجليزية.",
  },
  {
    id: "goals",
    station: "opening",
    kind: "goals",
    mascot: "🎯",
    title: "ما الذي ستتقنه في هذه الرحلة؟",
    lead: "خمس عشرة محطة تبدأ من WOULD وتنتهي باختبار من خمسة مستويات. هذه أهدافك واحدة واحدة.",
  },
  {
    id: "three-lanes",
    station: "opening",
    kind: "lanes",
    mascot: "🧭",
    title: "ثلاث بطاقات، وثلاث وظائف مختلفة",
    lead: "اختر بطاقة لتقرأ وظيفتها وصيغتها ومثالها. اللون نفسه سيرافقك حتى آخر شريحة، فتعرف نوع الجملة من لونها قبل أن تقرأها.",
    examples: [
      { en: "I'd like some orange juice, please.", ar: "أود بعض عصير البرتقال، من فضلك.", tag: "DESIRE", tone: "wish" },
      { en: "I'd rather sit outside.", ar: "أفضّل الجلوس في الخارج.", tag: "PREFERENCE", tone: "prefer" },
      { en: "Would you mind opening the window, please?", ar: "هل تمانع في فتح النافذة، من فضلك؟", tag: "POLITE REQUEST", tone: "request" },
    ],
    note: "لاحظ أن WOULD وحدها تخدم الوظائف الثلاث؛ لكن كل تركيب يتبعها يغيّر الرسالة: LIKE للرغبة، RATHER للتفضيل، وMIND للطلب المهذب.",
  },

  /* ------------------------------------------------------------
     أساسيات WOULD
     ------------------------------------------------------------ */
  {
    id: "would-meaning",
    station: "would-core",
    kind: "lesson",
    mascot: "🧠",
    title: "WOULD: ما هذا الفعل؟",
    lead: "WOULD فعل مساعد ناقص (Modal Auxiliary Verb)، من عائلة CAN وCOULD وMAY وMIGHT وMUST وSHOULD. ترتبط بـ WILL تاريخيًا، لكنها لا تعبّر دائمًا عن الماضي.",
    formula: ["Subject + would + V1"],
    points: [
      "الرغبة: I'd like a cup of tea.",
      "التفضيل: I'd rather stay home.",
      "الطلبات المهذبة: Would you mind waiting?",
      "المواقف الافتراضية: I would travel more if I had time.",
      "بعض العادات الماضية: When I was a child, I would play outside.",
      "المستقبل من منظور نقطة زمنية ماضية: She said she would come.",
    ],
    examples: [
      { en: "I would help you.", ar: "كنتُ سأساعدك — بحسب السياق.", tone: "neutral" },
      { en: "She would agree.", ar: "كانت ستوافق — بحسب السياق.", tone: "neutral" },
      { en: "We would choose the first option.", ar: "كنّا سنختار الخيار الأول — بحسب السياق.", tone: "neutral" },
    ],
    note: "سنركز اليوم على الرغبات والتفضيلات والطلبات المهذبة، ثم نعود إلى الاستخدامات الأخرى في الجمل الشرطية والتراكيب المتقدمة. المعنى الكامل يتحدد دائمًا من الجملة والموقف.",
  },
  {
    id: "would-rule",
    station: "would-core",
    kind: "lesson",
    mascot: "⚙️",
    title: "القاعدة الذهبية: ثابت لا يتغيّر",
    lead: "WOULD فعل ناقص؛ لذلك لا يأخذ s، ولا يتغير مع الضمائر، ويأتي بعده الفعل في صورته الأساسية V1، ولا نستعين بـ DO أو DOES لتكوين السؤال أو النفي.",
    formula: [
      "He would help. ✓ / He woulds help. ✗",
      "He would to help. ✗ / Would he help? ✓",
      "Does he would help? ✗ / He wouldn't help. ✓",
    ],
    points: [
      "لا يتغير مع الفاعل: I / you / he / she / it / we / they + would.",
      "لا نضيف s إلى WOULD في أي حالة.",
      "يأتي بعده الفعل المجرد V1 مباشرة، دون to.",
      "السؤال يبدأ بـ WOULD، والنفي بـ WOULDN'T، دون DO أو DOES.",
    ],
    examples: [
      { en: "He would help.", ar: "سيساعد — ولو غيّرنا الفاعل بقيت WOULD كما هي.", tone: "neutral" },
      { en: "Would he help?", ar: "هل سيساعد؟ — السؤال بتقديم WOULD فقط.", tone: "neutral" },
      { en: "He wouldn't help.", ar: "لن يساعد — النفي بـ wouldn't دون doesn't.", tone: "neutral" },
    ],
    note: "مع جميع الضمائر: I would · you would · he would · she would · it would · we would · they would. لا صيغة مثل woulds في الإنجليزية.",
  },
  {
    id: "would-contractions",
    station: "would-core",
    kind: "lesson",
    mascot: "✂️",
    title: "الاختصارات: I'd · you'd · wouldn't",
    lead: "في المحادثة والكتابة غير الرسمية نختصر WOULD بكثرة. الاختصار لا يغيّر المعنى، لكنه يحتاج عينًا منتبهة؛ لأن I'd قد تعني شيئين.",
    table: {
      head: ["الصيغة الكاملة", "الاختصار", "مثال"],
      rows: [
        { label: "I would", cells: ["I'd", "I'd like some tea."] },
        { label: "You would", cells: ["You'd", "You'd enjoy the film."] },
        { label: "He would", cells: ["He'd", "He'd rather walk."] },
        { label: "She would", cells: ["She'd", "She'd like a new book."] },
        { label: "It would", cells: ["It'd", "It'd be better tomorrow."] },
        { label: "We would", cells: ["We'd", "We'd love to come."] },
        { label: "They would", cells: ["They'd", "They'd rather stay home."] },
        { label: "Would not", cells: ["Wouldn't", "We wouldn't choose that option."] },
      ],
      note: "الاختصار في الفم أسرع، لكن الكتابة الكاملة أوضح في المواقف الرسمية.",
    },
    examples: [
      { en: "I'd like some tea. → I would like some tea.", ar: "هنا I'd = I would؛ بعدها فعل مجرد LIKE.", tone: "wish" },
      { en: "I'd finished my homework before dinner.", ar: "هنا I'd = I had؛ بعدها التصريف الثالث finished.", tone: "neutral" },
    ],
    note: "القاعدة العملية: انظر إلى الفعل بعد I'd. إن كان مجردًا فالأصل WOULD، وإن كان تصريفًا ثالثًا فالأصل HAD. والسياق يحسم الباقي.",
    tip: "I'd = I would أو I had؛ الشكل واحد، والتركيب هو الذي يفضح الأصل.",
  },
  {
    id: "contractions-check",
    station: "would-core",
    kind: "practice",
    mascot: "🔍",
    title: "اختبر الاختصار: WOULD أم HAD؟",
    lead: "أربعة اختصارات فقط. اقرأ الفعل الذي يلي I'd أو she'd ثم اختر الأصل الصحيح.",
    practiceSet: "contractions",
  },

  /* ------------------------------------------------------------
     WOULD LIKE
     ------------------------------------------------------------ */
  {
    id: "like-meaning",
    station: "would-like",
    kind: "comparison",
    mascot: "☕",
    tone: "wish",
    title: "WOULD LIKE: أودّ... بأدب",
    lead: "نستخدم WOULD LIKE للتعبير عن الرغبة بطريقة مهذبة. الجملة صحيحة مع WANT أيضًا، لكن WOULD LIKE تجعل الطلب ألطف، خصوصًا مع الغرباء وفي المواقف الخدمية.",
    formula: ["Subject + would like + noun", "Subject + would like + to + V1"],
    table: {
      head: ["WANT — رغبة مباشرة", "WOULD LIKE — رغبة مهذبة"],
      rows: [
        { label: "اسم", cells: ["I want a sandwich.", "I'd like a sandwich, please."] },
        { label: "اسم", cells: ["She wants a new book.", "She'd like a new book."] },
        { label: "فعل", cells: ["We want to leave.", "We'd like to leave."] },
      ],
      note: "WANT ليست كلمة خاطئة ولا وقحة. الاختيار بينهما يتعلق بدرجة اللباقة والموقف، لا بصحة القاعدة.",
    },
    examples: [
      { en: "I would like some water. / I'd like some water.", ar: "أود بعض الماء.", tone: "wish" },
      { en: "I want some water.", ar: "أريد بعض الماء — جملة صحيحة ومباشرة.", tone: "neutral" },
    ],
    note: "في المنزل قد تقول I want some juice بنبرة طبيعية، وفي المطعم تختار I'd like some juice, please. كلتاهما صحيحة، والمقام يحدد الأنسب.",
  },
  {
    id: "like-noun",
    station: "would-like",
    kind: "lesson",
    mascot: "🥤",
    tone: "wish",
    title: "WOULD LIKE + اسم: عندما نرغب في شيء",
    formula: ["Subject + would like + noun"],
    points: [
      "I'd like a cup of tea. — أود كوبًا من الشاي.",
      "She'd like a new notebook. — تود دفترًا جديدًا.",
      "We'd like two tickets. — نود تذكرتين.",
      "They'd like some information. — يودون بعض المعلومات.",
    ],
    examples: [
      { en: "I'd like a sandwich.", ar: "أودّ شطيرة.", tag: "NOUN", tone: "wish" },
      { en: "We'd like two tickets, please.", ar: "نودّ تذكرتين، من فضلك.", tag: "NOUN", tone: "wish" },
      { en: "They'd like some information.", ar: "يودّون بعض المعلومات.", tag: "NOUN", tone: "wish" },
    ],
    note: "التحليل: I = الفاعل، would = الفعل المساعد، like = الفعل الأساسي، a sandwich = الشيء المرغوب فيه. لا نضع فعلًا مجردًا بعد LIKE دون to: I'd like have a sandwich ✗، والصواب I'd like a sandwich ✓ أو I'd like to have a sandwich ✓.",
  },
  {
    id: "like-to",
    station: "would-like",
    kind: "lesson",
    mascot: "🚀",
    tone: "wish",
    title: "WOULD LIKE + TO + V1: عندما نرغب في فعل",
    lead: "إذا كانت الرغبة متعلقة بفعل تقوم به أنت أو غيرك، احتجت إلى TO قبل الفعل.",
    formula: ["Subject + would like + to + V1"],
    examples: [
      { en: "I'd like to learn Spanish.", ar: "أودّ تعلّم الإسبانية.", tone: "wish" },
      { en: "She'd like to visit London.", ar: "تودّ زيارة لندن.", tone: "wish" },
      { en: "We'd like to join the competition.", ar: "نودّ الانضمام إلى المسابقة.", tone: "wish" },
      { en: "He'd like to become an engineer.", ar: "يودّ أن يصبح مهندسًا.", tone: "wish" },
    ],
    note: "قارن: I'd like some tea (اسم) مقابل I'd like to drink some tea (فعل). المعنى متقارب، والتركيب هو الفرق.",
  },
  {
    id: "why-to",
    station: "would-like",
    kind: "lesson",
    mascot: "🔬",
    tone: "wish",
    title: "لماذا نضع TO بعد WOULD LIKE؟",
    lead: "قد يبدو التركيب مخالفًا لقاعدة WOULD + V1، لكنه ليس كذلك. لنفكّك الجملة قطعة قطعة.",
    formula: ["I + would + like + to study"],
    points: [
      "الفعل الذي يأتي مباشرة بعد WOULD هو LIKE، وهو بصيغة V1.",
      "أما TO STUDY فهو تركيب تابع للفعل LIKE، لا لـ WOULD.",
      "لذلك القاعدتان صحيحتان معًا: WOULD + V1، و WOULD LIKE + TO + V1.",
    ],
    examples: [
      { en: "I would like to study English.", ar: "أودّ دراسة الإنجليزية — التركيب صحيح تمامًا.", tone: "wish" },
      { en: "I would to like a sandwich. ✗ / I would like a sandwich. ✓", ar: "لا نضع to بين WOULD وLIKE.", tone: "wish" },
      { en: "I would like study English. ✗ / I would like to study English. ✓", ar: "بعد LIKE + فعل نحتاج to.", tone: "wish" },
    ],
    note: "الخطأ يقع في مكانين مختلفين: إضافة to بعد WOULD، أو حذفها بعد LIKE + فعل. انظر إلى موضع الفعل لا إلى شكل الجملة كله.",
  },
  {
    id: "like-negative",
    station: "would-like",
    kind: "lesson",
    mascot: "🚫",
    tone: "wish",
    title: "النفي: WOULDN'T LIKE",
    formula: ["Subject + wouldn't like + noun", "Subject + wouldn't like + to + V1"],
    examples: [
      { en: "I wouldn't like that.", ar: "لن أرغب في ذلك.", tone: "wish" },
      { en: "She wouldn't like to miss the trip.", ar: "لن ترغب في تفويت الرحلة.", tone: "wish" },
      { en: "We wouldn't like to arrive late.", ar: "لا نودّ الوصول متأخرين.", tone: "wish" },
    ],
    points: [
      "المثال الحواري: Omar: Would you like to work outside in the rain? — Maya: No, I wouldn't like that!",
      "عند رفض عرض مباشر، إجابة No, thank you أو I'd rather not, thanks ألطف وأكثر طبيعية من I wouldn't like that.",
    ],
    note: "النفي لا يغيّر قاعدة ما بعد LIKE: اسم، أو to + V1. ولا نستخدم don't like في هذا التركيب؛ لأن DON'T LIKE تعبّر عن عدم الإعجاب بصفة ثابتة، لا عن رفض رغبة الآن.",
  },
  {
    id: "like-questions",
    station: "would-like",
    kind: "lesson",
    mascot: "❓",
    tone: "wish",
    title: "السؤال: WOULD YOU LIKE...?",
    formula: ["Would + subject + like + noun?", "Would + subject + like + to + V1?"],
    examples: [
      { en: "Would you like some tea?", ar: "هل تودّ بعض الشاي؟", tag: "NOUN", tone: "wish" },
      { en: "Would she like a new book?", ar: "هل تودّ كتابًا جديدًا؟", tag: "NOUN", tone: "wish" },
      { en: "Would they like more information?", ar: "هل يودّون المزيد من المعلومات؟", tag: "NOUN", tone: "wish" },
      { en: "Would you like to join us?", ar: "هل تودّ الانضمام إلينا؟", tag: "TO + V1", tone: "wish" },
      { en: "Would she like to participate?", ar: "هل تودّ المشاركة؟", tag: "TO + V1", tone: "wish" },
      { en: "Would they like to visit the museum?", ar: "هل يودّون زيارة المتحف؟", tag: "TO + V1", tone: "wish" },
    ],
    note: "السؤال يبدأ بـ WOULD ثم الفاعل، ولا نستخدم Do/Does: Do you would like...? ✗. والمعنى هنا عرض أو دعوة أو استفسار عن الرغبة، لا مجرد سؤال معلوماتي.",
  },
  {
    id: "like-answers",
    station: "would-like",
    kind: "lesson",
    mascot: "💬",
    tone: "wish",
    title: "كيف نجيب؟ العروض والدعوات",
    lead: "هذا التركيب من أكثر تراكيب التواصل المهذب فائدة: عرض شيء، دعوة إلى نشاط، اقتراح مشترك، أو عرض مساعدة.",
    points: [
      "عرض: Would you like some water? — Yes, please. / No, thank you.",
      "إجابة عن عرض شيء: Yes, I'd love some.",
      "دعوة: Would you like to join us? — Yes, I'd love to!",
      "اعتذار مهذب: I'd love to, but I can't today.",
      "اقتراح نشاط: Would you like to watch a film?",
      "عرض مساعدة: Would you like me to help you?",
    ],
    examples: [
      { en: "Would you like some tea?", ar: "هل تودّ بعض الشاي؟", tag: "OFFER", tone: "wish" },
      { en: "Would you like to come to my birthday party?", ar: "هل تودّ الحضور إلى حفلة عيد ميلادي؟", tag: "INVITATION", tone: "wish" },
      { en: "Would you like me to help you?", ar: "هل تودّ أن أساعدك؟", tag: "OFFER TO HELP", tone: "wish" },
    ],
    note: "I'd love to تعني I would love to join you، وغالبًا نحذف الجزء المتكرر لأن السياق يوضحه. وهي إجابة حماسية مناسبة، لا صيغة واجبة.",
  },
  {
    id: "like-person",
    station: "would-like",
    kind: "lesson",
    mascot: "🧠",
    tone: "wish",
    title: "WOULD LIKE + شخص + TO + V1",
    lead: "أحيانًا لا تكون الرغبة في فعل تقوم به أنت، بل في أن يقوم به شخص آخر. هنا يدخل الاسم أو الضمير قبل TO.",
    formula: ["Subject + would like + person + to + V1"],
    examples: [
      { en: "I'd like you to help me.", ar: "أودّ منك أن تساعدني.", tone: "wish" },
      { en: "She'd like Omar to join the team.", ar: "تودّ أن ينضم عمر إلى الفريق.", tone: "wish" },
      { en: "We'd like the teacher to explain the question again.", ar: "نودّ أن يشرح المعلم السؤال مرة أخرى.", tone: "wish" },
      { en: "Would you like me to open the window?", ar: "هل تودّ أن أفتح النافذة؟", tone: "wish" },
      { en: "Would you like us to wait?", ar: "هل تودّ أن ننتظر؟", tone: "wish" },
    ],
    note: "الخطأ الشائع: I'd like you help me ✗. الصواب I'd like you to help me ✓؛ لأن TO تفصل الشخص عن الفعل الذي نريده منه.",
  },

  /* ------------------------------------------------------------
     WOULD RATHER
     ------------------------------------------------------------ */
  {
    id: "rather-meaning",
    station: "would-rather",
    kind: "lesson",
    mascot: "⚖️",
    tone: "prefer",
    title: "WOULD RATHER: أفضّل",
    lead: "نستخدم WOULD RATHER عندما نريد التعبير عن تفضيل شيء أو فعل على شيء آخر. غالبًا يوجد خيار آخر صريح أو مفهوم من السياق.",
    formula: ["Subject + would rather + V1"],
    examples: [
      { en: "I'd rather stay home.", ar: "أفضّل البقاء في المنزل.", tone: "prefer" },
      { en: "She'd rather read a book.", ar: "تفضّل قراءة كتاب.", tone: "prefer" },
      { en: "We'd rather walk.", ar: "نفضّل المشي.", tone: "prefer" },
      { en: "He'd rather study at home.", ar: "يفضّل الدراسة في المنزل.", tone: "prefer" },
      { en: "They'd rather leave early.", ar: "يفضّلون المغادرة مبكرًا.", tone: "prefer" },
    ],
    note: "لاحظ أن الفعل بعد RATHER مجرّد: stay، read، walk، study، leave. ولا نستخدم TO في هذا التركيب.",
  },
  {
    id: "rather-rule",
    station: "would-rather",
    kind: "lesson",
    mascot: "⚙️",
    tone: "prefer",
    title: "قاعدة WOULD RATHER الذهبية",
    lead: "WOULD RATHER + V1، دون TO ودون ing ودون تصريف ماضٍ عندما يكون الفاعل واحدًا.",
    formula: ["I'd rather stay. ✓ / I'd rather to stay. ✗", "I'd rather staying. ✗ / I'd rather stayed. ✗"],
    points: [
      "صحيح: I'd rather walk than drive.",
      "صحيح: She'd rather read than watch television.",
      "صحيح: We'd rather stay home than go out.",
      "الفعل بعد RATHER لا يتغير مع الضمير: I'd rather, she'd rather, they'd rather.",
    ],
    examples: [
      { en: "She'd rather read than watch television.", ar: "تفضّل القراءة على مشاهدة التلفاز.", tone: "prefer" },
      { en: "We'd rather stay home than go out.", ar: "نفضّل البقاء في المنزل على الخروج.", tone: "prefer" },
    ],
    note: "إذا رأيت TO بعد RATHER أو ing بعدها، فالتركيب يحتاج تصحيحًا. الاستثناء الوحيد في هذا الدرس هو وجود فاعل مختلف بعد RATHER، وسنراه بعد قليل.",
  },
  {
    id: "like-vs-rather",
    station: "would-rather",
    kind: "comparison",
    mascot: "⚔️",
    tone: "prefer",
    title: "WOULD LIKE أم WOULD RATHER؟",
    lead: "الاثنان مهذبان، لكن الرسالة مختلفة: WOULD LIKE تتحدث عن رغبة، وWOULD RATHER تتحدث عن اختيار بين بديلين.",
    formula: ["I'd like to drink tea. / I'd rather drink tea."],
    table: {
      head: ["WOULD LIKE", "WOULD RATHER"],
      rows: [
        { label: "الوظيفة", cells: ["رغبة", "تفضيل بين خيارين"] },
        { label: "الصيغة", cells: ["would like + noun / to + V1", "would rather + V1"] },
        { label: "مثال", cells: ["I'd like to drink tea.", "I'd rather drink tea."] },
        { label: "في الحوار", cells: ["Would you like some coffee?", "I'd rather have tea, thanks."] },
      ],
      note: "في المثال الأخير التفضيل واضح: الشاي بدل القهوة. ولو لم يكن هناك بديل مذكور، فقد يظل WOULD RATHER مفهومًا لأن السياق يفترض بديلًا.",
    },
    examples: [
      { en: "Would you like some coffee?", ar: "هل تودّ بعض القهوة؟", tone: "wish" },
      { en: "I'd rather have tea, thanks.", ar: "أفضّل الشاي، شكرًا.", tone: "prefer" },
    ],
    note: "لا نستخدم WOULD RATHER + to + V1 أبدًا في هذا المعنى، ولا نستخدم WOULD LIKE + V1 مباشرة.",
    practiceSet: "like-vs-rather",
  },
  {
    id: "rather-than",
    station: "would-rather",
    kind: "lesson",
    mascot: "🔬",
    tone: "prefer",
    title: "المقارنة بين خيارين: RATHER ... THAN ...",
    lead: "إذا أردت ذكر الخيارين في الجملة نفسها، استخدم THAN بين الفعلين المجردين.",
    formula: ["Subject + would rather + V1 + than + V1"],
    examples: [
      { en: "I'd rather walk than take the bus.", ar: "أفضّل المشي على ركوب الحافلة.", tone: "prefer" },
      { en: "She'd rather read than watch television.", ar: "تفضّل القراءة على مشاهدة التلفاز.", tone: "prefer" },
      { en: "We'd rather stay home than go out.", ar: "نفضّل البقاء في المنزل على الخروج.", tone: "prefer" },
    ],
    points: [
      "I = الفاعل، would rather = تركيب التفضيل، walk = الخيار المفضل.",
      "than = أداة المقارنة، drive = الخيار الآخر.",
      "الفعلان بعد RATHER وTHAN مجردان: walk ... drive، لا to walk ولا walking.",
    ],
    note: "خطأ شائع: I'd rather to walk than drive ✗. الصواب: I'd rather walk than drive ✓. ويمكن أن يأتي الخيار الثاني باسم: I'd rather walk than take a taxi.",
  },
  {
    id: "rather-real",
    station: "would-rather",
    kind: "lesson",
    mascot: "🎯",
    tone: "prefer",
    title: "تفضيلات واقعية، لا أوامر",
    lead: "هذه الجمل تعبّر عن اختيارات شخصية. لا أحد يُلزمك بها، ولا هي نصيحة أخلاقية.",
    examples: [
      { en: "I'd rather study in the morning than late at night.", ar: "أفضّل الدراسة صباحًا على الدراسة في وقت متأخر من الليل.", tone: "prefer" },
      { en: "She'd rather travel by train than fly.", ar: "تفضّل السفر بالقطار على السفر بالطائرة.", tone: "prefer" },
      { en: "We'd rather save money than spend it unnecessarily.", ar: "نفضّل ادخار المال على إنفاقه دون حاجة.", tone: "prefer" },
      { en: "They'd rather play outside than stay indoors.", ar: "يفضّلون اللعب في الخارج على البقاء في الداخل.", tone: "prefer" },
    ],
    points: [
      "هل تعبّر هذه الجمل عن إلزام؟ لا.",
      "هل تخبرنا أن الخيار الآخر ممنوع؟ لا؛ إنه فقط أقل تفضيلًا عند المتحدث.",
      "هل يمكن أن تتغير؟ نعم؛ التفضيل شخصي وقابل للتغير بحسب اليوم والظرف.",
    ],
    note: "للتعبير عن الإلزام نستخدم MUST أو HAVE TO، وللنصيحة SHOULD. أما WOULD RATHER فمكانها الاختيار الشخصي.",
  },
  {
    id: "rather-negative",
    station: "would-rather",
    kind: "lesson",
    mascot: "🚫",
    tone: "prefer",
    title: "أفضّل ألّا: WOULD RATHER NOT",
    formula: ["Subject + would rather not + V1"],
    examples: [
      { en: "I'd rather not go out tonight.", ar: "أفضّل ألّا أخرج الليلة.", tone: "prefer" },
      { en: "She'd rather not discuss the problem now.", ar: "تفضّل ألّا تناقش المشكلة الآن.", tone: "prefer" },
      { en: "We'd rather not wait any longer.", ar: "نفضّل ألّا ننتظر أكثر.", tone: "prefer" },
    ],
    points: [
      "النفي القياسي: would rather not + V1.",
      "خطأ شائع: I'd wouldn't rather go ✗ — لا نجمع اختصارين متضاربين.",
      "في الأسئلة المنفية قد تسمع Wouldn't you rather...? وهي سؤال سلبي صحيح، لكنها ليست طريقة النفي العادية في الإخبار.",
    ],
    note: "للتعبير المهذب عن رفض عرض: I'd rather not, thanks. هذه صيغة طبيعية وقليلة الحدة، وأفضل من رفض مباشر.",
  },
  {
    id: "rather-questions",
    station: "would-rather",
    kind: "lesson",
    mascot: "❓",
    tone: "prefer",
    title: "السؤال: WOULD YOU RATHER...?",
    formula: ["Would + subject + rather + V1?", "Would + subject + rather + V1 + or + V1?"],
    examples: [
      { en: "Would you rather stay home?", ar: "هل تفضّل البقاء في المنزل؟", tone: "prefer" },
      { en: "Would she rather leave now?", ar: "هل تفضّل المغادرة الآن؟", tone: "prefer" },
      { en: "Would they rather study together?", ar: "هل يفضّلون الدراسة معًا؟", tone: "prefer" },
      { en: "Would you rather drink tea or coffee?", ar: "هل تفضّل شرب الشاي أم القهوة؟", tone: "prefer" },
      { en: "Would you rather travel by train or by plane?", ar: "هل تفضّل السفر بالقطار أم بالطائرة؟", tone: "prefer" },
    ],
    note: "الإجابة الطبيعية: I'd rather drink tea. / I'd rather travel by train. وإذا لم يكن هناك تفضيل واضح يمكن أن تقول Either is fine with me.",
  },

  /* ------------------------------------------------------------
     فاعلان + الماضي
     ------------------------------------------------------------ */
  {
    id: "rather-subjects",
    station: "rather-subject",
    kind: "comparison",
    mascot: "👥",
    tone: "prefer",
    title: "فاعل واحد أم فاعلان؟",
    lead: "القاعدة تتغير عندما يكون الشخص الذي يفضّل غير الشخص الذي سيُنفّذ الفعل.",
    table: {
      head: ["فاعل واحد", "فاعلان مختلفان"],
      rows: [
        { label: "الصيغة", cells: ["would rather + V1", "would rather + subject + past simple"] },
        { label: "المثال", cells: ["I'd rather stay home.", "I'd rather you stayed home."] },
        { label: "المعنى", cells: ["أفضّل أن أبقى أنا.", "أفضّل أن تبقى أنت."] },
        { label: "الفاعل", cells: ["I = الذي يفضّل = الذي سيبقى.", "I = صاحب التفضيل، you = الذي نريده أن يبقى."] },
      ],
      note: "الماضي هنا ليس زمنًا، بل صيغة تفضيل مهذبة. لا تترجم stayed إلى «بقيتَ في الماضي».",
    },
    formula: ["I'd rather stay home. / I'd rather you stayed home."],
    examples: [
      { en: "She'd rather leave now.", ar: "تفضّل أن تغادر الآن — فاعل واحد.", tone: "prefer" },
      { en: "She'd rather Omar left now.", ar: "تفضّل أن يغادر عمر الآن — فاعلان.", tone: "prefer" },
      { en: "We'd rather he didn't come late.", ar: "نفضّل ألّا يأتي متأخرًا — نفي مع فاعل مختلف.", tone: "prefer" },
    ],
    note: "خطأ شائع: I'd rather you stay here ✗ في هذا المعنى، والصواب I'd rather you stayed here ✓. أما I'd rather stay here ✓ فصحيحة؛ لأن الفاعل واحد.",
  },
  {
    id: "rather-past",
    station: "rather-subject",
    kind: "lesson",
    mascot: "🕰️",
    tone: "prefer",
    title: "لماذا الماضي هنا لا يعني الماضي؟",
    lead: "تخيّل أن مايا تريد من عمر أن يبدأ الدراسة الآن. تقول: I'd rather Omar studied now — استخدمنا STUDIED رغم أن التفضيل عن الحاضر!",
    formula: ["Subject 1 + would rather + Subject 2 + Past Simple"],
    points: [
      "عندما يختلف فاعل التفضيل عن فاعل الفعل المفضّل، نستخدم غالبًا صيغة الماضي البسيط.",
      "صيغة الماضي هنا تعبّر عن تفضيل أو موقف غير مباشر يتعلق بالحاضر أو المستقبل.",
      "لا تعني بالضرورة أن الحدث وقع في الماضي؛ الكلمة now موجودة في الجملة نفسها.",
      "فكرة مشابهة سنراها في الجمل الشرطية في الدرس 53.",
    ],
    examples: [
      { en: "I'd rather you stayed here.", ar: "أفضّل أن تبقى هنا — تفضيل عن الحاضر، لا خبر عن الماضي.", tone: "prefer" },
      { en: "She'd rather we left early.", ar: "تفضّل أن نغادر مبكرًا.", tone: "prefer" },
      { en: "I'd rather Omar studied now.", ar: "أفضّل أن يدرس عمر الآن.", tone: "prefer" },
      { en: "We'd rather he didn't come late.", ar: "نفضّل ألّا يأتي متأخرًا — النفي بـ didn't مع الفاعل المختلف.", tone: "prefer" },
    ],
    note: "السياق هو الحكم: now وtomorrow وtoday تُبقي المعنى في الحاضر أو المستقبل رغم صيغة الماضي. ولا نقول I'd rather you stay هنا في هذا التركيب القياسي.",
    tip: "فاعل واحد → V1. فاعلان → ماضٍ بسيط. والشكل الماضي لا يسافر بك إلى الماضي.",
  },

  /* ------------------------------------------------------------
     WOULD YOU MIND
     ------------------------------------------------------------ */
  {
    id: "mind-form",
    station: "polite-requests",
    kind: "lesson",
    mascot: "🤝",
    tone: "request",
    title: "WOULD YOU MIND + V-ing؟",
    lead: "أرقى صيغة طلب في هذا الدرس. السؤال ليس عن القدرة، بل عن الممانعة: هل يضايقك أن تفعل هذا من أجلي؟",
    formula: ["Would you mind + V-ing?"],
    examples: [
      { en: "Would you mind closing the door?", ar: "هل تمانع في إغلاق الباب؟", tone: "request" },
      { en: "Would you mind helping me?", ar: "هل تمانع في مساعدتي؟", tone: "request" },
      { en: "Would you mind waiting a moment?", ar: "هل تمانع في الانتظار لحظة؟", tone: "request" },
      { en: "Would you mind explaining the question again?", ar: "هل تمانع في شرح السؤال مرة أخرى؟", tone: "request" },
    ],
    points: [
      "بعد MIND في هذا التركيب نستخدم V-ing دائمًا.",
      "صحيح: Would you mind opening the window?",
      "خطأ: Would you mind to open the window?",
      "MIND هنا فعل، وليس الفعل الناقص، ولذلك يتبع قواعد الفعل العادي مع ing.",
    ],
    note: "لا تخلط بين Would you mind + V-ing (طلب) وDo you mind if I...? (استئذان). الأولى تطلب من الآخر فعلًا، والثانية تطلب الإذن لنفسك.",
  },
  {
    id: "mind-answers",
    station: "polite-requests",
    kind: "lesson",
    mascot: "🔬",
    tone: "request",
    title: "لماذا NO تعني موافقة؟",
    lead: "هذه أجمل التفاصيل في الدرس. السؤال الحرفي: هل تمانع؟ فإذا قلتَ No فأنت تقول: لا أمانع — أي نعم، سأفعل.",
    points: [
      "No, not at all. — لا، لا أمانع إطلاقًا. (موافقة)",
      "Of course not. — بالطبع لا أمانع. (موافقة)",
      "Certainly. — بالتأكيد. (موافقة)",
      "Sure. / No problem. — بكل سرور. (موافقة غير رسمية)",
      "I'm sorry, but I can't right now. — اعتذار مهذب عند عدم القدرة.",
    ],
    examples: [
      { en: "Would you mind opening the window?", ar: "هل تمانع في فتح النافذة؟", tone: "request" },
      { en: "No, not at all.", ar: "لا، لا أمانع إطلاقًا — أي سأفتحها.", tone: "request" },
      { en: "Would you like some tea? — Yes, please.", ar: "هنا YES تعني قبول العرض؛ السياق مختلف.", tone: "wish" },
    ],
    note: "لا تخلط بين السؤالين: YES مناسبة لـ Would you like...?، وNO مناسبة لـ Would you mind...? لأن السؤال عن الممانعة لا عن الرغبة. إذا أردت الرفض بلطف فاشرح السبب: I'm sorry, but I can't right now.",
    practiceSet: "mind-answers",
  },
  {
    id: "request-ladder",
    station: "polite-requests",
    kind: "comparison",
    mascot: "🪜",
    tone: "request",
    title: "سلّم الطلب: من الأمر إلى أرقى صيغة",
    lead: "كل الدرجات صحيحة نحويًا، لكن كل درجة تحمل مقدارًا مختلفًا من اللباقة والمسافة الاجتماعية.",
    table: {
      head: ["الصيغة", "الدرجة", "مثال"],
      rows: [
        { label: "الأمر", cells: ["مباشر", "Open the window."] },
        { label: "CAN YOU", cells: ["طلب مهذب بسيط", "Can you open the window?"] },
        { label: "COULD YOU", cells: ["أكثر لباقة", "Could you open the window, please?"] },
        { label: "WOULD YOU MIND", cells: ["أرقى صيغة", "Would you mind opening the window, please?"] },
      ],
      note: "الأمر ليس وقحًا في كل سياق؛ بين الأصدقاء قد يكون طبيعيًا. لكن في المطعم أو الصف أو مع الغرباء، اختر درجة أعلى.",
    },
    examples: [
      { en: "Open the window.", ar: "افتح النافذة — أمر مباشر.", tone: "neutral" },
      { en: "Could you open the window, please?", ar: "هل يمكنك فتح النافذة، من فضلك؟", tone: "request" },
      { en: "Would you mind opening the window, please?", ar: "هل تمانع في فتح النافذة، من فضلك؟", tone: "request" },
    ],
    note: "كلمة please لا تحوّل الأمر إلى سؤال، لكنها تلطّف النبرة. واللباقة الحقيقية تأتي من اختيار الصيغة المناسبة للموقف.",
  },

  /* ------------------------------------------------------------
     خريطة الأفعال
     ------------------------------------------------------------ */
  {
    id: "modal-map",
    station: "modal-compare",
    kind: "comparison",
    mascot: "🧭",
    tone: "neutral",
    title: "خريطة الأفعال: وظيفة قبل شكل",
    lead: "لا نختار الفعل المساعد لأن الجملة تبدو أجمل، بل بحسب المعنى الذي نريد التعبير عنه. هذه الخريطة تلخّص الفروق.",
    table: {
      head: ["التعبير", "الوظيفة", "مثال"],
      rows: [
        { label: "Could you...?", cells: ["طلب مهذب", "Could you help me?"] },
        { label: "Would you...?", cells: ["طلب مهذب أو سؤال عن الاستعداد", "Would you help me?"] },
        { label: "Should I...?", cells: ["طلب نصيحة", "Should I help him?"] },
        { label: "Would you like...?", cells: ["عرض أو دعوة أو سؤال عن الرغبة", "Would you like some tea?"] },
        { label: "Would you rather...?", cells: ["سؤال عن التفضيل", "Would you rather walk or drive?"] },
        { label: "Would you mind...?", cells: ["طلب مهذب بصيغة السؤال عن الممانعة", "Would you mind waiting?"] },
      ],
      note: "اكتشاف مهم: بعض الجمل صحيحة نحويًا بأكثر من فعل مساعد، لكن المعنى يختلف. الدقة هنا في اختيار الوظيفة، لا في تجميل الجملة.",
    },
    examples: [
      { en: "Could you help me?", ar: "هل يمكنك مساعدتي؟ — طلب مهذب.", tone: "request" },
      { en: "Would you help me?", ar: "هل تتفضل بمساعدتي؟ — طلب أو سؤال عن الاستعداد بحسب السياق.", tone: "request" },
      { en: "Should I help him?", ar: "هل ينبغي أن أساعده؟ — طلب نصيحة.", tone: "neutral" },
    ],
    note: "لاحظ أن WOULD وCOULD قد تلتقيان في الطلب المهذب، لكن SHOULD تخرج من الطلب إلى النصيحة، وWOULD LIKE تخرج إلى الرغبة.",
    practiceSet: "modal-map",
  },

  /* ------------------------------------------------------------
     الحوارات
     ------------------------------------------------------------ */
  {
    id: "restaurant-lab",
    station: "dialogs",
    kind: "dialogue",
    mascot: "🎭",
    tone: "wish",
    title: "الحوار الأول: في المطعم",
    lead: "اقرأ الحوار، ويمكنك إظهار الترجمة العربية سطرًا بسطر. بعدها اختبر فهمك للموقف.",
    labId: "lab-restaurant",
    turns: [
      { speaker: "Waiter", en: "Good evening! Would you like a table by the window?", ar: "مساء الخير! هل تودّان طاولة قرب النافذة؟" },
      { speaker: "Maya", en: "Yes, please. We'd love that.", ar: "نعم، من فضلك. يسعدنا ذلك." },
      { speaker: "Waiter", en: "What would you like to drink?", ar: "ماذا تودّان أن تشربا؟" },
      { speaker: "Omar", en: "I'd like some orange juice, please.", ar: "أودّ بعض عصير البرتقال، من فضلك." },
      { speaker: "Maya", en: "I'd rather have water.", ar: "أفضّل الماء." },
      { speaker: "Waiter", en: "Certainly. Would you like to order now?", ar: "بالتأكيد. هل تودّان الطلب الآن؟" },
      { speaker: "Omar", en: "Yes. I'd like a chicken sandwich.", ar: "نعم. أودّ شطيرة دجاج." },
      { speaker: "Maya", en: "I'd rather have a salad.", ar: "أفضّل السلطة." },
      { speaker: "Waiter", en: "Of course. Anything else?", ar: "بالطبع. أي شيء آخر؟" },
      { speaker: "Maya", en: "Would you mind bringing us some extra napkins?", ar: "هل تمانع في إحضار بعض المناديل الإضافية لنا؟" },
      { speaker: "Waiter", en: "Not at all!", ar: "لا أمانع إطلاقًا!" },
    ],
    points: [
      "Would you like a table...? = عرض مهذب.",
      "I'd like... = رغبة.",
      "I'd rather... = تفضيل.",
      "Would you mind bringing...? = طلب مهذب.",
    ],
    note: "تحليل سريع: أربع وظائف مهذبة في محادثة واحدة، ولكل واحدة صيغتها الخاصة.",
  },
  {
    id: "weekend-lab",
    station: "dialogs",
    kind: "dialogue",
    mascot: "🎬",
    tone: "prefer",
    title: "الحوار الثاني: تخطيط عطلة نهاية الأسبوع",
    lead: "دعوة، وقبول حماسي، وتفضيل، وسؤال عن خيارين، وعرض خدمة. خمس وظائف في حوار واحد قصير.",
    labId: "lab-weekend",
    turns: [
      { speaker: "Daniel", en: "Would you like to go to the cinema on Saturday?", ar: "هل تودّ الذهاب إلى السينما يوم السبت؟" },
      { speaker: "Omar", en: "I'd love to, but I'd rather go in the afternoon.", ar: "يسعدني ذلك، لكنني أفضّل الذهاب بعد الظهر." },
      { speaker: "Daniel", en: "Why?", ar: "لماذا؟" },
      { speaker: "Omar", en: "I have to finish my homework in the morning.", ar: "عليّ إنهاء واجبي في الصباح." },
      { speaker: "Daniel", en: "That's fine. Would you rather watch an adventure film or a comedy?", ar: "لا مشكلة. هل تفضّل فيلم مغامرات أم كوميديا؟" },
      { speaker: "Omar", en: "I'd rather watch a comedy.", ar: "أفضّل مشاهدة كوميديا." },
      { speaker: "Daniel", en: "Great! Would you like me to book the tickets?", ar: "رائع! هل تودّ أن أحجز التذاكر؟" },
      { speaker: "Omar", en: "Yes, please. That would be great!", ar: "نعم، من فضلك. سيكون ذلك رائعًا!" },
    ],
    note: "لاحظ الفرق بين I'd love to (قبول الدعوة) وI'd rather go (اختيار وقت أو نوع)، وبين Would you like me to book (عرض خدمة) وWould you like to go (دعوة).",
  },
  {
    id: "classroom-lab",
    station: "dialogs",
    kind: "dialogue",
    mascot: "🏫",
    tone: "request",
    title: "الحوار الثالث: صفّ مهذب",
    lead: "في الصف، اللباقة ليست ترفًا: هي التي تجعل الطلب مقبولًا والمساعدة ممكنة.",
    labId: "lab-classroom",
    turns: [
      { speaker: "Teacher", en: "Would anyone like to present first?", ar: "هل يودّ أحد أن يقدّم أولًا؟" },
      { speaker: "Maya", en: "I'd like to present first, please.", ar: "أودّ أن أقدّم أولًا، من فضلك." },
      { speaker: "Teacher", en: "Excellent. Would you like Omar to help you?", ar: "ممتاز. هل تودّين أن يساعدك عمر؟" },
      { speaker: "Maya", en: "Yes, please.", ar: "نعم، من فضلك." },
      { speaker: "Omar", en: "Would you mind giving me a minute to prepare?", ar: "هل تمانع في منحي دقيقة لأستعد؟" },
      { speaker: "Teacher", en: "Not at all. Take your time.", ar: "لا أمانع إطلاقًا. خذ وقتك." },
      { speaker: "Daniel", en: "I'd rather present after Maya and Omar.", ar: "أفضّل أن أقدّم بعد مايا وعمر." },
      { speaker: "Teacher", en: "That's fine.", ar: "لا مشكلة." },
    ],
    points: [
      "Would anyone like...? = سؤال مهذب عن الرغبة.",
      "I'd like to present = رغبة في فعل.",
      "Would you like Omar to help...? = رغبة في أن يقوم شخص آخر بفعل.",
      "Would you mind giving...? = طلب مهذب.",
    ],
    note: "تحليل سريع: الرغبة قد تخصّ المتكلم أو غيره، والتفضيل يوازن بين بديلين، والطلب المهذب يترك للآخر حرية الرفض.",
  },

  /* ------------------------------------------------------------
     محقق القواعد
     ------------------------------------------------------------ */
  {
    id: "detective-a",
    station: "detective",
    kind: "practice",
    mascot: "🕵️",
    title: "محقق القواعد · الملف الأول",
    lead: "صحّح الجملة كاملة، محافظًا على المعنى المقصود. لا تكتفِ بتغيير كلمة واحدة إن كان التركيب كله يحتاج إعادة.",
    practiceSet: "detective-a",
  },
  {
    id: "detective-b",
    station: "detective",
    kind: "practice",
    mascot: "🔍",
    title: "محقق القواعد · الملف الثاني",
    lead: "في الملف الثاني خطأ معنوي أيضًا: الفاعلان يحتاجان ماضيًا، والاختصاران لا يجتمعان، والطلب المهذب يحتاج ing.",
    practiceSet: "detective-b",
  },

  /* ------------------------------------------------------------
     التدريب المتدرج
     ------------------------------------------------------------ */
  {
    id: "build-question",
    station: "practice",
    kind: "wordOrder",
    mascot: "🧩",
    title: "ابنِ السؤال المهذب",
    lead: "رتّب البطاقات لتكوين السؤال الصحيح. لا تعتمد على أول ما يبدو مألوفًا؛ ابدأ بالفعل المساعد المناسب.",
  },
  {
    id: "practice-like",
    station: "practice",
    kind: "practice",
    mascot: "✏️",
    title: "١ · WOULD LIKE + TO + V1",
    lead: "أكمل بالصيغة الصحيحة. يمكنك كتابة العبارة الناقصة أو الجملة كاملة.",
    practiceSet: "p31",
  },
  {
    id: "practice-rather",
    station: "practice",
    kind: "practice",
    mascot: "⚖️",
    title: "٢ · WOULD RATHER + V1",
    lead: "انتبه: لا TO هنا، ولا ing. اكتب الفعل المجرد.",
    practiceSet: "p32",
  },
  {
    id: "practice-questions",
    station: "practice",
    kind: "practice",
    mascot: "❓",
    title: "٣ · كوّن السؤال",
    lead: "حوّل الجملة الإخبارية إلى سؤال مهذب. اكتب السؤال كاملًا بعلامة استفهام أو دونها.",
    practiceSet: "p33",
  },
  {
    id: "practice-mind",
    station: "practice",
    kind: "practice",
    mascot: "🤝",
    title: "٤ · WOULD YOU MIND + V-ing",
    lead: "أكمل بالفعل بصيغة ing. تُقبل الجملة الكاملة أيضًا.",
    practiceSet: "p34",
  },
  {
    id: "practice-function",
    station: "practice",
    kind: "practice",
    mascot: "🎯",
    title: "٥ · حدّد الوظيفة",
    lead: "رغبة؟ تفضيل؟ طلب مهذب؟ عرض أو دعوة؟ اختر الوظيفة لا الشكل فقط.",
    practiceSet: "p35",
  },

  /* ------------------------------------------------------------
     القراءة
     ------------------------------------------------------------ */
  {
    id: "reading",
    station: "reading",
    kind: "reading",
    mascot: "📖",
    title: "The Perfect Weekend Plan",
    lead: "قصة قصيرة تجمع الرغبات والتفضيلات والطلبات المهذبة في خطة واحدة. بعدها عشرة أسئلة فهم.",
  },
  {
    id: "reading-questions",
    station: "reading",
    kind: "readingQuestions",
    mascot: "🔎",
    title: "بعد القراءة: عشر عدسات للفهم",
    lead: "اكتب إجابتك، ثم قارنها بالنموذج عند الحاجة. النموذج إرشادي، وليست الإجابة الوحيدة الممكنة.",
  },

  /* ------------------------------------------------------------
     الاختبار والمعلم
     ------------------------------------------------------------ */
  {
    id: "final-test",
    station: "test",
    kind: "test",
    mascot: "🏁",
    title: "الاختبار النهائي: WOULD Master Challenge",
    lead: "خمسة مستويات، في كل مستوى خمسة أسئلة. أجب عن الجميع ثم سلّم؛ لا تظهر الحلول أو النتيجة قبل التسليم.",
  },
  {
    id: "teacher",
    station: "test",
    kind: "teacher",
    mascot: "🧑‍🏫",
    title: "مساحة المعلم",
    lead: "بعد تسليم الاختبار، افتح دليل التصحيح المفصل ببوابة المعلم المعتادة. لن يُحمّل مفتاح الاختبار قبل التسليم.",
  },

  /* ------------------------------------------------------------
     الكتابة والملخص والتقدم
     ------------------------------------------------------------ */
  {
    id: "writing",
    station: "writing",
    kind: "writing",
    mascot: "📝",
    title: "مهمة الكتابة: My Perfect Weekend",
    lead: "اكتب من 12 إلى 15 جملة عن عطلة نهاية الأسبوع المثالية، مع تسع صيغ مطلوبة ومؤشر إرشادي يتابعها معك.",
  },
  {
    id: "golden-summary",
    station: "summary",
    kind: "summary",
    mascot: "🧠",
    title: "الملخص الذهبي",
    lead: "عشر بطاقات تجمع القواعد كلها. إن نسيت شيئًا، عد إلى هنا قبل الاختبار.",
  },
  {
    id: "course-progress",
    station: "progress",
    kind: "roadmap",
    mascot: "🎓",
    title: "أتممت فنّ الاختيار... والرحلة مستمرة",
    lead: "أتممنا الدرس 47 من أصل 120 درسًا؛ بقي 73 درسًا، والدرس القادم مراجعة شاملة للأفعال الناقصة.",
  },
] as const;

export const LESSON_STEP_COUNT_47 = SLIDES_47.length;

export const READING_47 = [
  {
    en: "Maya, Omar and Daniel are planning a weekend activity. Maya would like to visit a science museum because she enjoys learning new things.",
    ar: "تخطط مايا وعمر ودانيال لنشاط في عطلة نهاية الأسبوع. تودّ مايا زيارة متحف للعلوم لأنها تستمتع بتعلّم أشياء جديدة.",
  },
  {
    en: "Omar would rather go to the cinema. He thinks a comedy would be a relaxing choice after a busy school week.",
    ar: "يفضّل عمر الذهاب إلى السينما؛ فهو يرى أن فيلمًا كوميديًا سيكون اختيارًا مريحًا بعد أسبوع دراسي مزدحم.",
  },
  {
    en: "Daniel has another idea. “I'd rather spend the afternoon outdoors than stay inside,” he says.",
    ar: "لدى دانيال فكرة أخرى. يقول: «أفضّل قضاء فترة الظهيرة في الخارج على البقاء في الداخل».",
  },
  {
    en: "Maya smiles. “Would you like to visit the science museum in the morning and go to the park afterwards?”",
    ar: "تبتسم مايا: «هل تودّان زيارة متحف العلوم في الصباح ثم الذهاب إلى الحديقة بعد ذلك؟»",
  },
  {
    en: "Omar thinks for a moment. “That sounds good. I'd like to watch a film in the evening, though.”",
    ar: "يفكر عمر لحظة ثم يقول: «يبدو ذلك جيدًا. لكنني أودّ مشاهدة فيلم في المساء».",
  },
  {
    en: "Daniel agrees. “Great! Would you like me to check the museum's opening hours?” “Yes, please,” Maya replies.",
    ar: "يوافق دانيال: «رائع! هل تودّان أن أتحقق من ساعات عمل المتحف؟» فتجيب مايا: «نعم، من فضلك».",
  },
  {
    en: "Later, they call the museum. “Would you mind telling us when the guided tour begins?” Maya asks politely.",
    ar: "لاحقًا يتصلون بالمتحف. تسأل مايا بلطف: «هل تمانعون في إخبارنا متى تبدأ الجولة المرشدة؟»",
  },
  {
    en: "The receptionist answers: “Not at all. It begins at ten o'clock.”",
    ar: "تجيب موظفة الاستقبال: «لا أمانع إطلاقًا. تبدأ في الساعة العاشرة».",
  },
  {
    en: "By the end of the conversation, the three friends have created a plan that respects everyone's preferences.",
    ar: "بنهاية المحادثة، أنشأ الأصدقاء الثلاثة خطة تحترم تفضيلات الجميع.",
  },
] as const;

export const READING_QUESTIONS_47 = [
  { q: "What would Maya like to do?", answer: "She would like to visit a science museum.", ar: "تودّ زيارة متحف للعلوم." },
  { q: "Why would Omar rather go to the cinema?", answer: "Because he thinks a comedy would be a relaxing choice after a busy school week.", ar: "لأنه يرى أن الكوميديا اختيار مريح بعد أسبوع دراسي مزدحم." },
  { q: "What would Daniel rather do?", answer: "He'd rather spend the afternoon outdoors.", ar: "يفضّل قضاء فترة الظهيرة في الخارج." },
  { q: "What does Maya suggest?", answer: "Visiting the museum in the morning and going to the park afterwards.", ar: "زيارة المتحف صباحًا ثم الذهاب إلى الحديقة." },
  { q: "What would Omar like to do in the evening?", answer: "He'd like to watch a film.", ar: "يودّ مشاهدة فيلم." },
  { q: "What does Daniel offer to check?", answer: "The museum's opening hours.", ar: "ساعات عمل المتحف." },
  { q: "What polite expression does Maya use when calling the museum?", answer: "Would you mind telling us when the guided tour begins?", ar: "استخدمت Would you mind telling us...?" },
  { q: "What does ‘Not at all’ mean in the receptionist's reply?", answer: "It means the receptionist doesn't mind answering — she agrees to help.", ar: "تعني أنها لا تمانع الإجابة، أي توافق على المساعدة." },
  { q: "Find an example of WOULD RATHER ... THAN ...", answer: "I'd rather spend the afternoon outdoors than stay inside.", ar: "مثال على المقارنة بين خيارين." },
  { q: "What is the main idea of the story?", answer: "Good communication helps people express their wishes and find a plan that respects everyone's preferences.", ar: "التواصل الجيد يساعد الناس على التعبير عن رغباتهم وإيجاد خطة تحترم تفضيلات الجميع." },
] as const;

/** ترتيب الكلمات: ثلاث مهام لبناء سؤال مهذب. */
export const WORD_ORDER_47 = [
  {
    id: "wo-like",
    prompt: "كوّن سؤال دعوة مهذبًا باستخدام WOULD YOU LIKE.",
    answer: ["Would", "you", "like", "to", "join", "us", "?"],
    shuffled: ["join", "you", "?", "Would", "us", "to", "like"],
    hint: "ابدأ بالفعل المساعد، ثم الفاعل، ثم like، ثم to + V1.",
  },
  {
    id: "wo-rather",
    prompt: "كوّن سؤالًا عن التفضيل بين القطار والطائرة.",
    answer: ["Would", "you", "rather", "travel", "by", "train", "or", "by", "plane", "?"],
    shuffled: ["travel", "rather", "plane", "you", "by", "or", "Would", "train", "by", "?"],
    hint: "بعد rather يأتي الفعل المجرد travel، ثم خياران يفصلهما or.",
  },
  {
    id: "wo-mind",
    prompt: "كوّن طلبًا مهذبًا لفتح النافذة باستخدام WOULD YOU MIND.",
    answer: ["Would", "you", "mind", "opening", "the", "window", "?"],
    shuffled: ["window", "mind", "Would", "the", "opening", "you", "?"],
    hint: "بعد mind نستخدم الفعل بصيغة ing.",
  },
] as const;
