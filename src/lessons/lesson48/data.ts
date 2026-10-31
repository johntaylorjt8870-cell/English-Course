/**
 * Lesson 48 — MODAL VERBS MASTER REVIEW
 * Student-facing teaching content only. Assessment solutions live in
 * `testKey48.ts`; practice solutions live in `practiceKey48.ts`.
 */
export type Tone48 =
  | "ability"
  | "possibility"
  | "necessity"
  | "prohibition"
  | "advice"
  | "desire"
  | "future"
  | "review";

export type Example48 = { en: string; ar: string; tag?: string; tone?: Tone48 };
export type Turn48 = { speaker: string; en: string; ar?: string };
export type CompareRow48 = { label: string; cells: readonly string[] };
export type Table48 = { head: readonly string[]; rows: readonly CompareRow48[]; note?: string };

export type SlideKind48 =
  | "cover"
  | "goals"
  | "cases"
  | "lesson"
  | "map"
  | "comparison"
  | "dialogue"
  | "practice"
  | "contrast"
  | "detective"
  | "decision"
  | "situations"
  | "dashboard"
  | "reading"
  | "readingQuestions"
  | "test"
  | "teacher"
  | "writing"
  | "summary"
  | "phase"
  | "roadmap";

export type Slide48 = {
  id: string;
  station: string;
  kind: SlideKind48;
  title: string;
  lead?: string;
  mascot?: string;
  tone?: Tone48;
  formula?: readonly string[];
  examples?: readonly Example48[];
  points?: readonly string[];
  note?: string;
  /** القاعدة الذهبية التي تُعرض في شريط داكن أسفل الشريحة */
  tip?: string;
  turns?: readonly Turn48[];
  table?: Table48;
  practiceSet?: string;
  labId?: string;
  dialogue?: string;
};

export const STATIONS_48 = [
  { id: "opening", title: "البداية" },
  { id: "core-rule", title: "القاعدة المشتركة" },
  { id: "ability", title: "القدرة والاستئذان" },
  { id: "possibility", title: "الاحتمال" },
  { id: "necessity", title: "الضرورة والإلزام" },
  { id: "prohibition", title: "المنع وعدم الضرورة" },
  { id: "advice", title: "النصيحة" },
  { id: "desire", title: "الرغبة والتفضيل" },
  { id: "future", title: "المستقبل" },
  { id: "decision", title: "خريطة القرار" },
  { id: "detective", title: "محقق القواعد" },
  { id: "dialogues", title: "الحوارات" },
  { id: "situations", title: "اختبار المواقف" },
  { id: "practice", title: "مختبر الإتقان" },
  { id: "reading", title: "القراءة الشاملة" },
  { id: "test", title: "الاختبار والمعلم" },
  { id: "writing", title: "مشروع الإتقان" },
  { id: "summary", title: "الخلاصة والإتمام" },
] as const;

export const GOALS_48 = [
  "التمييز بين الأفعال الناقصة ووظائفها الأساسية.",
  "اختيار الفعل المناسب للقدرة والاحتمال والضرورة والنصيحة.",
  "التمييز بين MUST وHAVE TO.",
  "فهم الفرق الدقيق بين MUSTN'T وDON'T HAVE TO وNEEDN'T.",
  "التمييز بين MAY وMIGHT وCOULD عند التعبير عن الاحتمال.",
  "استخدام CAN وCOULD وMAY في الاستئذان والطلبات.",
  "التعبير عن الرغبة والتفضيل باستخدام WOULD.",
  "تكوين الأسئلة والنفي مع الأفعال الناقصة.",
  "اكتشاف الأخطاء النحوية وتصحيحها مع تفسير السبب.",
  "استخدام عدة أفعال ناقصة في حوار واحد بصورة طبيعية.",
  "الاستعداد للانتقال إلى Modal Perfect في الدرس 49.",
] as const;

/* ============================================================
   المواقف السبعة في افتتاحية الدرس
   ============================================================ */

export const CASES_48 = [
  {
    n: "١",
    situation: "صديقك يسألك عن مساعدة.",
    en: "Can you help me?",
    ar: "هل تستطيع مساعدتي؟",
    modal: "CAN",
    meaning: "قدرة / طلب مباشر",
    tone: "ability" as Tone48,
    emoji: "🤝",
  },
  {
    n: "٢",
    situation: "السماء مليئة بالغيوم، فتتوقع احتمال المطر.",
    en: "It might rain.",
    ar: "ربما تمطر.",
    modal: "MIGHT",
    meaning: "احتمال غير مؤكد",
    tone: "possibility" as Tone48,
    emoji: "🌧️",
  },
  {
    n: "٣",
    situation: "المعلم يطلب تسليم المشروع غدًا.",
    en: "You must submit the project tomorrow.",
    ar: "يجب أن تسلّم المشروع غدًا.",
    modal: "MUST",
    meaning: "إلزام قوي",
    tone: "necessity" as Tone48,
    emoji: "📌",
  },
  {
    n: "٤",
    situation: "والدك ينصحك بالنوم مبكرًا.",
    en: "You should sleep early.",
    ar: "ينبغي أن تنام مبكرًا.",
    modal: "SHOULD",
    meaning: "نصيحة",
    tone: "advice" as Tone48,
    emoji: "🩺",
  },
  {
    n: "٥",
    situation: "صديقك يعرض عليك الذهاب إلى السينما.",
    en: "Would you like to go to the cinema?",
    ar: "هل تودّ الذهاب إلى السينما؟",
    modal: "WOULD",
    meaning: "عرض / رغبة",
    tone: "desire" as Tone48,
    emoji: "🎟️",
  },
  {
    n: "٦",
    situation: "شخص يخبرك أن دخول الغرفة ممنوع.",
    en: "You mustn't enter the room.",
    ar: "يُمنع أن تدخل الغرفة.",
    modal: "MUSTN'T",
    meaning: "منع",
    tone: "prohibition" as Tone48,
    emoji: "⛔",
  },
  {
    n: "٧",
    situation: "في يوم العطلة لا تحتاج إلى الزي الرسمي.",
    en: "You don't have to wear a uniform on your day off.",
    ar: "لست ملزمًا بارتداء الزي الرسمي في يوم العطلة.",
    modal: "DON'T HAVE TO",
    meaning: "عدم ضرورة",
    tone: "prohibition" as Tone48,
    emoji: "👕",
  },
] as const;

export const PHASE_RECAP_48 = [
  { n: "41", en: "BE / DO / HAVE", ar: "الأفعال المساعدة والرئيسية." },
  { n: "42", en: "CAN & COULD", ar: "القدرة والإمكانية والطلبات." },
  { n: "43", en: "MAY & MIGHT", ar: "الاحتمال والاستئذان." },
  { n: "44", en: "MUST & HAVE TO", ar: "الضرورة والإلزام." },
  { n: "45", en: "SHOULD & OUGHT TO", ar: "النصيحة والتوصيات." },
  { n: "46", en: "MUSTN'T / DON'T HAVE TO / NEEDN'T", ar: "المنع وعدم الضرورة." },
  { n: "47", en: "WOULD / WOULD LIKE / WOULD RATHER", ar: "الرغبات والتفضيلات." },
  { n: "48", en: "MODAL VERBS MASTER REVIEW", ar: "المراجعة الشاملة وإتقان المرحلة." },
] as const;

/* ============================================================
   خريطة المعاني الكبرى
   ============================================================ */

export type ModalCard48 = {
  id: string;
  modal: string;
  tone: Tone48;
  function: string;
  ar: string;
  formula: string;
  examples: readonly { en: string; ar: string }[];
  note?: string;
};

export const MODALS_48: readonly ModalCard48[] = [
  {
    id: "can",
    modal: "CAN",
    tone: "ability",
    function: "Ability · general possibility · permission",
    ar: "القدرة والإمكانية والاستئذان",
    formula: "CAN + V1",
    examples: [
      { en: "I can speak English.", ar: "أستطيع التحدث بالإنجليزية." },
      { en: "You can buy fresh bread at that shop.", ar: "يمكنك شراء الخبز الطازج من ذلك المتجر." },
      { en: "Can I use your phone?", ar: "هل يمكنني استخدام هاتفك؟" },
    ],
    note: "CAN لا تعني القدرة فقط؛ السياق يحدد إن كانت إمكانية أو استئذانًا.",
  },
  {
    id: "could",
    modal: "COULD",
    tone: "ability",
    function: "Past ability · polite request · possibility",
    ar: "القدرة العامة في الماضي والطلب المهذب والاحتمال",
    formula: "COULD + V1",
    examples: [
      { en: "I could swim when I was six.", ar: "كنت أستطيع السباحة وعمري ست سنوات." },
      { en: "Could you explain this question?", ar: "هل يمكنك شرح هذا السؤال؟" },
      { en: "It could rain later.", ar: "قد تمطر لاحقًا." },
    ],
  },
  {
    id: "may",
    modal: "MAY",
    tone: "possibility",
    function: "Possibility · formal permission",
    ar: "الاحتمال والاستئذان الرسمي",
    formula: "MAY + V1",
    examples: [
      { en: "It may rain tomorrow.", ar: "قد تمطر غدًا." },
      { en: "May I come in?", ar: "هل يمكنني الدخول؟" },
      { en: "You may not enter this room.", ar: "لا يُسمح لك بدخول هذه الغرفة." },
    ],
    note: "MAY NOT لها معنيان بحسب السياق: المنع أو احتمال عدم الحدوث.",
  },
  {
    id: "might",
    modal: "MIGHT",
    tone: "possibility",
    function: "Uncertain possibility · very formal permission",
    ar: "الاحتمال غير المؤكد",
    formula: "MIGHT + V1",
    examples: [
      { en: "She might come.", ar: "ربما تأتي." },
      { en: "It might be cold there.", ar: "ربما يكون الجو باردًا هناك." },
      { en: "Might I leave?", ar: "هل تسمح لي بالمغادرة؟ (رسمية جدًا)" },
    ],
  },
  {
    id: "must",
    modal: "MUST",
    tone: "necessity",
    function: "Strong obligation · strong deduction",
    ar: "الضرورة القوية والاستنتاج القوي",
    formula: "MUST + V1",
    examples: [
      { en: "You must wear a seat belt.", ar: "يجب أن ترتدي حزام الأمان." },
      { en: "I must finish this report today.", ar: "يجب أن أنهي هذا التقرير اليوم." },
    ],
  },
  {
    id: "have-to",
    modal: "HAVE TO",
    tone: "necessity",
    function: "Obligation from rules or circumstances",
    ar: "الالتزام الذي تفرضه القواعد أو الظروف",
    formula: "HAVE / HAS / HAD / WILL HAVE TO + V1",
    examples: [
      { en: "I have to wear a uniform at school.", ar: "يجب أن أرتدي زيًا موحدًا في المدرسة." },
      { en: "She has to work tomorrow.", ar: "يجب عليها العمل غدًا." },
      { en: "I had to leave early yesterday.", ar: "اضطررت إلى المغادرة مبكرًا أمس." },
    ],
    note: "HAVE TO ليس فعلًا ناقصًا خالصًا؛ يتغير بحسب الفاعل والزمن ويأخذ DO/DOES في السؤال والنفي.",
  },
  {
    id: "should",
    modal: "SHOULD",
    tone: "advice",
    function: "Advice · recommendation · expectation",
    ar: "النصيحة والتوصية",
    formula: "SHOULD + V1",
    examples: [
      { en: "You should drink more water.", ar: "ينبغي أن تشرب المزيد من الماء." },
      { en: "Should I call the doctor?", ar: "هل ينبغي أن أتصل بالطبيب؟" },
    ],
  },
  {
    id: "ought-to",
    modal: "OUGHT TO",
    tone: "advice",
    function: "Advice with a sense of duty",
    ar: "النصيحة ذات النبرة الأخلاقية",
    formula: "OUGHT TO + V1",
    examples: [
      { en: "You ought to respect your parents.", ar: "ينبغي أن تحترم والديك." },
      { en: "You ought not to ignore the warning.", ar: "ينبغي ألا تتجاهل التحذير." },
    ],
    note: "OUGHT هو الفعل الناقص الوحيد الذي يتبعه TO دائمًا.",
  },
  {
    id: "mustnt",
    modal: "MUSTN'T",
    tone: "prohibition",
    function: "Prohibition",
    ar: "المنع",
    formula: "MUSTN'T + V1",
    examples: [
      { en: "You mustn't touch the machine.", ar: "يُمنع أن تلمس الآلة." },
      { en: "You mustn't copy anyone's answers.", ar: "يُمنع نسخ إجابات أي شخص." },
    ],
  },
  {
    id: "dont-have-to",
    modal: "DON'T HAVE TO",
    tone: "prohibition",
    function: "No necessity",
    ar: "عدم الضرورة",
    formula: "DON'T / DOESN'T HAVE TO + V1",
    examples: [
      { en: "You don't have to come early.", ar: "ليس من الضروري أن تأتي مبكرًا." },
      { en: "She doesn't have to wear a uniform today.", ar: "ليس من الضروري أن ترتدي زيًا موحدًا اليوم." },
    ],
  },
  {
    id: "neednt",
    modal: "NEEDN'T",
    tone: "prohibition",
    function: "No need",
    ar: "عدم الحاجة",
    formula: "NEEDN'T + V1",
    examples: [
      { en: "You needn't bring any food.", ar: "لا حاجة إلى إحضار الطعام." },
      { en: "We needn't hurry.", ar: "لا داعي للاستعجال." },
    ],
  },
  {
    id: "would",
    modal: "WOULD",
    tone: "desire",
    function: "Wish · preference · polite request",
    ar: "الرغبة والتفضيل والطلبات المهذبة",
    formula: "WOULD + V1 / WOULD LIKE / WOULD RATHER",
    examples: [
      { en: "I'd like some coffee.", ar: "أود بعض القهوة." },
      { en: "I'd rather walk than drive.", ar: "أفضل المشي على القيادة." },
      { en: "Would you mind opening the window?", ar: "هل تمانع في فتح النافذة؟" },
    ],
  },
  {
    id: "will",
    modal: "WILL",
    tone: "future",
    function: "Future · quick decision · promise · prediction",
    ar: "المستقبل والقرار والوعد والتنبؤ",
    formula: "WILL + V1",
    examples: [
      { en: "I will travel tomorrow.", ar: "سأسافر غدًا." },
      { en: "The phone is ringing. I'll answer it.", ar: "الهاتف يرن. سأجيب." },
      { en: "I think our team will win.", ar: "أعتقد أن فريقنا سيفوز." },
    ],
  },
] as const;

/* ============================================================
   مختبر المقارنة — أثر تغيير الفعل على المعنى
   ============================================================ */

export type Contrast48 = {
  id: string;
  title: string;
  en: string;
  tone: Tone48;
  axis: string;
  sides: readonly {
    modal: string;
    sentence: string;
    ar: string;
    meaning: string;
    caution?: string;
  }[];
};

export const CONTRAST_48: readonly Contrast48[] = [
  {
    id: "mustnt-vs-dont",
    title: "المنع أم عدم الضرورة؟",
    en: "MUSTN'T vs DON'T HAVE TO",
    tone: "prohibition",
    axis: "هل الفعل ممنوع، أم غير مطلوب فقط؟",
    sides: [
      { modal: "MUSTN'T", sentence: "You mustn't go.", ar: "ممنوع أن تذهب.", meaning: "منع أو حظر." },
      {
        modal: "DON'T HAVE TO",
        sentence: "You don't have to go.",
        ar: "ليس من الضروري أن تذهب.",
        meaning: "يمكنك الذهاب، لكنك لست ملزمًا.",
      },
      { modal: "NEEDN'T", sentence: "You needn't go.", ar: "لا داعي لأن تذهب.", meaning: "عدم حاجة، قريب جدًا من DON'T HAVE TO." },
    ],
  },
  {
    id: "must-vs-should",
    title: "الإلزام أم النصيحة؟",
    en: "MUST vs SHOULD",
    tone: "advice",
    axis: "هل أنا أُلزم أم أنصح؟",
    sides: [
      { modal: "MUST", sentence: "You must study.", ar: "يجب أن تدرس.", meaning: "ضرورة أو إلزام قوي." },
      { modal: "SHOULD", sentence: "You should study.", ar: "ينبغي أن تدرس.", meaning: "نصيحة أو توصية؛ الفعل غير مفروض." },
    ],
  },
  {
    id: "may-vs-might",
    title: "درجة الاحتمال",
    en: "MAY vs MIGHT",
    tone: "possibility",
    axis: "كلاهما احتمال — لا نسب مئوية ثابتة.",
    sides: [
      { modal: "MAY", sentence: "It may rain.", ar: "قد تمطر.", meaning: "احتمال." },
      {
        modal: "MIGHT",
        sentence: "It might rain.",
        ar: "ربما تمطر.",
        meaning: "احتمال، وقد يكون أكثر تحفظًا أو ترددًا في بعض السياقات.",
        caution: "لا تُحوّل هذه الملاحظة إلى قاعدة مطلقة: MIGHT ليست دائمًا أضعف من MAY.",
      },
    ],
  },
  {
    id: "can-vs-could",
    title: "القدرة واللباقة",
    en: "CAN vs COULD",
    tone: "ability",
    axis: "الحاضر أم الماضي؟ وأي درجة من اللباقة؟",
    sides: [
      { modal: "CAN", sentence: "I can swim.", ar: "أستطيع السباحة.", meaning: "قدرة في الحاضر." },
      {
        modal: "COULD",
        sentence: "I could swim when I was six.",
        ar: "كنت أستطيع السباحة وعمري ست سنوات.",
        meaning: "قدرة عامة في الماضي.",
      },
      {
        modal: "COULD YOU…?",
        sentence: "Could you open the door, please?",
        ar: "هل يمكنك فتح الباب، من فضلك؟",
        meaning: "طلب أكثر تهذيبًا غالبًا من CAN YOU.",
      },
    ],
  },
  {
    id: "like-vs-rather",
    title: "الرغبة أم التفضيل؟",
    en: "WOULD LIKE vs WOULD RATHER",
    tone: "desire",
    axis: "هل أعبّر عن رغبة، أم أقارن بين خيارين؟",
    sides: [
      { modal: "WOULD LIKE", sentence: "I'd like to go.", ar: "أودّ الذهاب.", meaning: "رغبة، ولا يلزم وجود بديل." },
      {
        modal: "WOULD RATHER",
        sentence: "I'd rather go.",
        ar: "أفضّل الذهاب.",
        meaning: "تفضيل، وغالبًا يوجد خيار آخر صريح أو مفهوم.",
      },
      { modal: "WOULD RATHER NOT", sentence: "I'd rather not go.", ar: "أفضّل عدم الذهاب.", meaning: "تفضيل عدم القيام بالفعل." },
    ],
  },
  {
    id: "neednt-have",
    title: "تمهيد للدرس 49",
    en: "NEEDN'T HAVE + V3 vs DIDN'T NEED TO",
    tone: "prohibition",
    axis: "هل وقع الفعل فعلًا أم لا؟",
    sides: [
      {
        modal: "NEEDN'T HAVE + V3",
        sentence: "You needn't have bought so much food.",
        ar: "لم يكن هناك داعٍ لأن تشتري كل هذا الطعام، لكنك اشتريته بالفعل.",
        meaning: "الفعل وقع دون حاجة إليه.",
      },
      {
        modal: "DIDN'T NEED TO",
        sentence: "You didn't need to buy so much food.",
        ar: "لم تكن بحاجة إلى شراء كل هذا الطعام.",
        meaning: "الجملة وحدها لا تحدد هل تم الشراء أم لا؛ السياق يوضح ذلك.",
        caution: "التفصيل الكامل في الدرس 49 — Modal Perfect.",
      },
    ],
  },
] as const;

/* ============================================================
   الأخطاء الاثنا عشر
   ============================================================ */

export type Detective48 = {
  id: string;
  n: number;
  wrong: string;
  corrected: string;
  why: string;
  instruction: string;
  hint: string;
};

export const DETECTIVE_48: readonly Detective48[] = [
  {
    id: "d1",
    n: 1,
    wrong: "She cans speak French.",
    corrected: "She can speak French.",
    why: "لا نضيف s إلى الفعل الناقص مع He أو She أو It.",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح.",
    hint: "الفعل الناقص ثابت الصيغة مع كل الفاعلين.",
  },
  {
    id: "d2",
    n: 2,
    wrong: "He must to finish his homework.",
    corrected: "He must finish his homework.",
    why: "لا نضع TO بعد MUST؛ القاعدة: Modal + V1.",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح.",
    hint: "MUST يتبعها الفعل المجرد مباشرة.",
  },
  {
    id: "d3",
    n: 3,
    wrong: "Does she can swim?",
    corrected: "Can she swim?",
    why: "لا نستخدم DO/DOES مع الأفعال الناقصة؛ نقدّم الفعل الناقص على الفاعل.",
    instruction: "أعد كتابة السؤال كاملًا بعد التصحيح.",
    hint: "السؤال يبدأ بالفعل الناقص نفسه.",
  },
  {
    id: "d4",
    n: 4,
    wrong: "You mustn't come early. (والمقصود: ليس من الضروري أن تأتي مبكرًا.)",
    corrected: "You don't have to come early.",
    why: "المقصود عدم الضرورة وليس المنع؛ وMUSTN'T تعني المنع.",
    instruction: "أعد كتابة الجملة كاملة بالمعنى المقصود.",
    hint: "عدم الضرورة = DON'T HAVE TO أو NEEDN'T.",
  },
  {
    id: "d5",
    n: 5,
    wrong: "He don't have to work today.",
    corrected: "He doesn't have to work today.",
    why: "HAVE TO يأخذ DOESN'T مع He؛ لأنه ليس فعلًا ناقصًا خالصًا.",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح.",
    hint: "الفاعل He يقتضي DOESN'T.",
  },
  {
    id: "d6",
    n: 6,
    wrong: "It might rains tomorrow.",
    corrected: "It might rain tomorrow.",
    why: "بعد MIGHT نستخدم V1 دون s.",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح.",
    hint: "الفعل الناقص يحمل الزمن، والفعل الأساسي يبقى مجردًا.",
  },
  {
    id: "d7",
    n: 7,
    wrong: "You should to study harder.",
    corrected: "You should study harder.",
    why: "لا نضع TO بعد SHOULD.",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح.",
    hint: "SHOULD + V1.",
  },
  {
    id: "d8",
    n: 8,
    wrong: "I'd rather to stay home.",
    corrected: "I'd rather stay home.",
    why: "القاعدة: WOULD RATHER + V1 دون TO.",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح.",
    hint: "RATHER يتبعها الفعل المجرد.",
  },
  {
    id: "d9",
    n: 9,
    wrong: "Would you mind to help me?",
    corrected: "Would you mind helping me?",
    why: "بعد MIND نستخدم V-ing.",
    instruction: "أعد كتابة السؤال كاملًا بعد التصحيح.",
    hint: "MIND + V-ing.",
  },
  {
    id: "d10",
    n: 10,
    wrong: "She ought respect her parents.",
    corrected: "She ought to respect her parents.",
    why: "OUGHT تتبعها TO دائمًا؛ وهي الاستثناء الوحيد بين الأفعال الناقصة.",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح.",
    hint: "OUGHT TO + V1.",
  },
  {
    id: "d11",
    n: 11,
    wrong: "He has to studies every day.",
    corrected: "He has to study every day.",
    why: "بعد HAS TO نستخدم الفعل الأساسي دون s؛ الزمن والفاعل يظهران في HAS.",
    instruction: "أعد كتابة الجملة كاملة بعد التصحيح.",
    hint: "HAS تحمل الـ s، والفعل بعدها مجرد.",
  },
  {
    id: "d12",
    n: 12,
    wrong: "May I to come in?",
    corrected: "May I come in?",
    why: "لا نستخدم TO بعد MAY.",
    instruction: "أعد كتابة السؤال كاملًا بعد التصحيح.",
    hint: "MAY + subject + V1?",
  },
] as const;

/* ============================================================
   الحوارات الثلاثة
   ============================================================ */

export type Dialogue48 = {
  id: string;
  title: string;
  en: string;
  setting: string;
  tone: Tone48;
  turns: readonly Turn48[];
  analysis: readonly { modal: string; ar: string }[];
  labId: string;
  labPrompt: string;
  labOptions: readonly string[];
};

export const DIALOGUES_48: Readonly<Record<string, Dialogue48>> = {
  school: {
    id: "school",
    title: "At School",
    en: "Dialogue One — At School",
    setting: "مشروع صفّي وموعد تسليم",
    tone: "necessity",
    turns: [
      { speaker: "Teacher", en: "You must finish your project by Thursday.", ar: "يجب أن تنهي مشروعك بحلول الخميس." },
      { speaker: "Omar", en: "Must I submit it in person?", ar: "هل يجب أن أسلّمه شخصيًا؟" },
      { speaker: "Teacher", en: "No, you can send it by email.", ar: "لا، يمكنك إرساله بالبريد الإلكتروني." },
      { speaker: "Maya", en: "Could you explain the last question, please?", ar: "هل يمكنك شرح السؤال الأخير، من فضلك؟" },
      { speaker: "Teacher", en: "Of course. You should read the instructions carefully.", ar: "بالطبع. ينبغي أن تقرأ التعليمات بعناية." },
      { speaker: "Daniel", en: "May I work with Omar?", ar: "هل يمكنني العمل مع عمر؟" },
      { speaker: "Teacher", en: "Yes, you may.", ar: "نعم، يمكنك." },
      { speaker: "Omar", en: "We might need some extra time.", ar: "ربما نحتاج وقتًا إضافيًا." },
      {
        speaker: "Teacher",
        en: "You don't have to finish everything today, but you must complete it before Thursday.",
        ar: "ليس من الضروري أن تنهوا كل شيء اليوم، لكن يجب أن تُكملوه قبل الخميس.",
      },
    ],
    analysis: [
      { modal: "MUST", ar: "إلزام." },
      { modal: "CAN", ar: "إمكانية." },
      { modal: "COULD YOU", ar: "طلب مهذب." },
      { modal: "SHOULD", ar: "نصيحة." },
      { modal: "MAY I", ar: "استئذان." },
      { modal: "MIGHT", ar: "احتمال." },
      { modal: "DON'T HAVE TO", ar: "عدم ضرورة." },
    ],
    labId: "lab-school",
    labPrompt: "Teacher: “You don't have to finish everything today.” — ما معنى ذلك؟",
    labOptions: [
      "إنهاء كل شيء اليوم غير ممنوع، لكنه ليس ضروريًا.",
      "إنهاء كل شيء اليوم ممنوع تمامًا.",
      "يجب إنهاء كل شيء اليوم قبل الظهر.",
    ],
  },
  trip: {
    id: "trip",
    title: "Planning a Trip",
    en: "Dialogue Two — Planning a Trip",
    setting: "تخطيط رحلة إلى الجبال",
    tone: "desire",
    turns: [
      { speaker: "Maya", en: "Would you like to travel during the holiday?", ar: "هل تودّون السفر في العطلة؟" },
      { speaker: "Omar", en: "Yes, I'd love to! We could visit the mountains.", ar: "نعم، بكل سرور! يمكننا زيارة الجبال." },
      { speaker: "Daniel", en: "It might be cold there.", ar: "ربما يكون الجو باردًا هناك." },
      { speaker: "Maya", en: "We should take warm clothes.", ar: "ينبغي أن نأخذ ملابس دافئة." },
      { speaker: "Omar", en: "Do we have to book the hotel now?", ar: "هل يجب أن نحجز الفندق الآن؟" },
      {
        speaker: "Daniel",
        en: "Yes, we must book it soon because the rooms may be full.",
        ar: "نعم، يجب أن نحجزه قريبًا لأن الغرف قد تكون ممتلئة.",
      },
      { speaker: "Maya", en: "Would you rather travel by train or by car?", ar: "هل تفضّل السفر بالقطار أم بالسيارة؟" },
      { speaker: "Omar", en: "I'd rather travel by train.", ar: "أفضّل السفر بالقطار." },
      { speaker: "Daniel", en: "Great! Could you check the ticket prices?", ar: "رائع! هل يمكنك التحقق من أسعار التذاكر؟" },
      { speaker: "Omar", en: "Certainly.", ar: "بالتأكيد." },
    ],
    analysis: [
      { modal: "WOULD LIKE", ar: "رغبة." },
      { modal: "COULD", ar: "اقتراح أو إمكانية." },
      { modal: "MIGHT", ar: "احتمال." },
      { modal: "SHOULD", ar: "نصيحة." },
      { modal: "HAVE TO", ar: "ضرورة." },
      { modal: "MUST", ar: "ضرورة قوية." },
      { modal: "MAY", ar: "احتمال." },
      { modal: "WOULD RATHER", ar: "تفضيل." },
      { modal: "COULD YOU", ar: "طلب مهذب." },
    ],
    labId: "lab-trip",
    labPrompt: "Daniel: “The rooms may be full.” — ما وظيفة MAY هنا؟",
    labOptions: ["احتمال أن تكون الغرف ممتلئة.", "منع حجز الغرف.", "استئذان للحجز."],
  },
  home: {
    id: "home",
    title: "A Problem at Home",
    en: "Dialogue Three — A Problem at Home",
    setting: "واجب منزلي ونصيحة أم",
    tone: "advice",
    turns: [
      { speaker: "Mother", en: "You look tired. You should go to bed early.", ar: "تبدو متعبًا. ينبغي أن تنام مبكرًا." },
      { speaker: "Daniel", en: "I have to finish my homework first.", ar: "يجب أن أنهي واجبي أولًا." },
      { speaker: "Mother", en: "You don't have to finish the extra exercises tonight.", ar: "ليس من الضروري أن تنهي التمارين الإضافية الليلة." },
      { speaker: "Daniel", en: "Really? I thought I must finish all of them.", ar: "حقًا؟ ظننت أنه يجب أن أنهيها كلها." },
      {
        speaker: "Mother",
        en: "No, you mustn't copy anyone's answers, but you can finish the extra exercises tomorrow.",
        ar: "لا، يُمنع أن تنسخ إجابات أي شخص، لكن يمكنك إنهاء التمارين الإضافية غدًا.",
      },
      { speaker: "Daniel", en: "Could you help me with this difficult question?", ar: "هل يمكنك مساعدتي في هذا السؤال الصعب؟" },
      { speaker: "Mother", en: "Of course.", ar: "بالطبع." },
      { speaker: "Daniel", en: "Thanks! I'd like to understand the whole lesson.", ar: "شكرًا! أودّ أن أفهم الدرس كاملًا." },
      { speaker: "Mother", en: "That's a great attitude!", ar: "هذا موقف رائع!" },
    ],
    analysis: [
      { modal: "SHOULD", ar: "نصيحة." },
      { modal: "HAVE TO", ar: "ضرورة." },
      { modal: "DON'T HAVE TO", ar: "عدم ضرورة." },
      { modal: "MUST", ar: "اعتقاد بوجود إلزام." },
      { modal: "MUSTN'T", ar: "منع." },
      { modal: "CAN", ar: "إمكانية." },
      { modal: "COULD YOU", ar: "طلب مهذب." },
      { modal: "WOULD LIKE", ar: "رغبة." },
    ],
    labId: "lab-home",
    labPrompt: "“You mustn't copy anyone's answers.” — ما نوع هذا القول؟",
    labOptions: ["منع صريح.", "عدم ضرورة.", "نصيحة اختيارية."],
  },
} as const;

/* ============================================================
   خريطة القرار
   ============================================================ */

export type DecisionNode48 = {
  id: string;
  question: string;
  options: readonly string[];
  answer: string;
  modals: readonly string[];
  example: string;
  why: string;
  tone: Tone48;
};

export const DECISION_MAP_48: readonly DecisionNode48[] = [
  {
    id: "ability",
    question: "هل أتحدث عن قدرة؟",
    options: ["القدرة في الحاضر", "القدرة العامة في الماضي", "النجاح في فعل محدد في الماضي"],
    answer: "القدرة",
    modals: ["CAN", "COULD", "WAS / WERE ABLE TO"],
    example: "The door was locked, but I was able to open it.",
    why: "WAS/WERE ABLE TO تُستخدم للنجاح في إنجاز محدد؛ أما القدرة العامة في الماضي فتعبر عنها COULD بصورة طبيعية.",
    tone: "ability",
  },
  {
    id: "possibility",
    question: "هل أتحدث عن احتمال؟",
    options: ["احتمال بسيط", "احتمال مع تردد", "احتمال مع إمكانية"],
    answer: "الاحتمال",
    modals: ["MAY", "MIGHT", "COULD"],
    example: "She might be at home.",
    why: "لا نحفظ نسبًا مئوية ثابتة؛ الاختيار يعتمد على درجة تحفظ المتحدث والسياق.",
    tone: "possibility",
  },
  {
    id: "permission",
    question: "هل أطلب الإذن؟",
    options: ["استئذان عادي", "استئذان رسمي", "استئذان غير مباشر"],
    answer: "الاستئذان",
    modals: ["CAN I…?", "MAY I…?", "COULD I…?"],
    example: "May I borrow your pen, please?",
    why: "MAY غالبًا أكثر رسمية من CAN في الاستئذان.",
    tone: "ability",
  },
  {
    id: "necessity",
    question: "هل أتحدث عن ضرورة؟",
    options: ["إلزام أقوله بنفسي", "التزام تفرضه القواعد أو الظروف"],
    answer: "الضرورة",
    modals: ["MUST", "HAVE TO"],
    example: "I have to wear a uniform at school.",
    why: "MUST يغلب حين يقدّم المتحدث الإلزام بنفسه؛ وHAVE TO حين يأتي الإلزام من الخارج.",
    tone: "necessity",
  },
  {
    id: "advice",
    question: "هل أقدّم نصيحة؟",
    options: ["نصيحة عادية", "نصيحة بنبرة واجب أخلاقي"],
    answer: "النصيحة",
    modals: ["SHOULD", "OUGHT TO"],
    example: "You should rest.",
    why: "OUGHT TO تضيف نبرة الواجب أو المسؤولية الأخلاقية، والمعنى قريب من SHOULD.",
    tone: "advice",
  },
  {
    id: "prohibition",
    question: "هل أعبّر عن منع؟",
    options: ["الفعل ممنوع", "الفعل غير ضروري", "لا حاجة إلى الفعل"],
    answer: "المنع",
    modals: ["MUSTN'T"],
    example: "You mustn't take photographs.",
    why: "MUSTN'T منع صريح؛ ولا تعني عدم الضرورة.",
    tone: "prohibition",
  },
  {
    id: "nonecessity",
    question: "هل أعبّر عن عدم ضرورة؟",
    options: ["يمكنك فعله لكنك لست ملزمًا", "لا حاجة إليه"],
    answer: "عدم الضرورة",
    modals: ["DON'T HAVE TO", "NEEDN'T"],
    example: "You don't have to come early.",
    why: "كلتاهما تعبّر عن عدم الإلزام؛ NEEDN'T أقرب إلى «لا حاجة».",
    tone: "prohibition",
  },
  {
    id: "desire",
    question: "هل أعبّر عن رغبة أو تفضيل؟",
    options: ["رغبة في شيء أو فعل", "تفضيل بين خيارين"],
    answer: "الرغبة والتفضيل",
    modals: ["WOULD LIKE", "WOULD RATHER"],
    example: "I'd rather walk than drive.",
    why: "WOULD LIKE رغبة، وWOULD RATHER تفضيل يقارن بين خيارين.",
    tone: "desire",
  },
  {
    id: "polite",
    question: "هل أقدّم طلبًا مهذبًا؟",
    options: ["طلب مباشر مهذب", "سؤال عن الممانعة"],
    answer: "الطلب المهذب",
    modals: ["COULD YOU…?", "WOULD YOU…?", "WOULD YOU MIND…?"],
    example: "Would you mind opening the window?",
    why: "بعد MIND نستخدم V-ing، والجواب No, not at all يعني الموافقة.",
    tone: "desire",
  },
  {
    id: "future",
    question: "هل أتحدث عن المستقبل؟",
    options: ["قرار أو وعد أو تنبؤ", "افتراض أو تهذيب"],
    answer: "المستقبل",
    modals: ["WILL", "WOULD"],
    example: "I will help you.",
    why: "WILL للمستقبل والوعد والقرار؛ WOULD للافتراض والتهذيب.",
    tone: "future",
  },
] as const;

/* ============================================================
   الشرائح
   ============================================================ */

export const SLIDES_48: readonly Slide48[] = [
  {
    id: "cover",
    station: "opening",
    kind: "cover",
    mascot: "🎯",
    tone: "review",
    title: "المراجعة الشاملة للأفعال الناقصة",
    lead: "Understand the Situation → Identify the Meaning → Choose the Modal → Build the Sentence.",
  },
  {
    id: "goals",
    station: "opening",
    kind: "goals",
    mascot: "🎯",
    tone: "review",
    title: "ماذا تتقن بنهاية هذا الدرس؟",
    lead: "أحد عشر هدفًا تختبر ما بنيناه في الدروس 41–47، ثم تُغلق المرحلة الثانية بالكامل.",
  },
  {
    id: "seven-situations",
    station: "opening",
    kind: "cases",
    mascot: "🧭",
    tone: "review",
    title: "سبعة مواقف في يوم واحد",
    lead: "كل جملة تحتوي على فعل ناقص، لكن كل فعل يؤدي وظيفة مختلفة. اضغط كل موقف لتكشف وظيفته.",
  },
  {
    id: "phase2-recap",
    station: "opening",
    kind: "lesson",
    mascot: "🗂️",
    tone: "review",
    title: "من أين نبدأ المراجعة؟",
    lead: "في الدروس 41–47 تعلّمنا الأفعال المساعدة والأفعال الناقصة بالتفصيل؛ واليوم نجمعها كلها في خريطة واحدة.",
    points: [
      "هذا ليس درسًا لإعادة البداية، بل اختبار إتقان لما بنيناه خطوة بخطوة.",
      "لا تحفظ ترجمة كل فعل فقط؛ افهم الموقف، وحدد المعنى، ثم اختر التركيب.",
      "ستقابل الأفعال نفسها في مواقف جديدة، وستحتاج إلى التمييز بين معانٍ متقاربة جدًا.",
    ],
    note: "كل شريحة في هذا الدرس تخدم فكرة واحدة: المعنى أولًا، ثم التركيب.",
  },

  {
    id: "modal-map",
    station: "core-rule",
    kind: "map",
    mascot: "🗺️",
    tone: "review",
    title: "خريطة الوظائف الكبرى",
    lead: "اضغط أي فعل لترى وظيفته الأساسية وصيغته وأمثلته.",
  },
  {
    id: "core-rule",
    station: "core-rule",
    kind: "lesson",
    mascot: "🧠",
    tone: "review",
    title: "القاعدة المشتركة: Subject + Modal + V1",
    lead: "معظم الأفعال الناقصة تشترك في قاعدة نحوية واحدة: الفاعل + الفعل الناقص + الفعل الأساسي بصيغته الأولى.",
    formula: ["Subject + Modal + V1"],
    examples: [
      { en: "I can swim.", ar: "أستطيع السباحة." },
      { en: "She might come.", ar: "ربما تأتي." },
      { en: "He must study.", ar: "يجب عليه أن يدرس." },
      { en: "We should leave.", ar: "ينبغي أن نغادر." },
      { en: "They would help us.", ar: "سوف يساعدوننا، أو كانوا سيساعدوننا بحسب السياق." },
    ],
    tip: "الفعل الناقص يحمل الزمن والشخص، والفعل الأساسي يبقى مجردًا دائمًا.",
  },
  {
    id: "no-s-no-to",
    station: "core-rule",
    kind: "lesson",
    mascot: "🚫",
    tone: "review",
    title: "ثلاث قواعد ذهبية",
    lead: "ثلاثة أخطاء تتكرر مع كل الأفعال الناقصة تقريبًا — وهذا تصحيحها.",
    points: [
      "① لا نضيف s إلى الفعل الناقص مع He أو She أو It.",
      "② لا نضع TO بعد الأفعال الناقصة العادية.",
      "③ لا نستخدم DO أو DOES لتكوين السؤال مع الأفعال الناقصة.",
    ],
    examples: [
      { en: "He can swim. ✓ / He cans swim. ✗", ar: "CAN لا تأخذ s مع He." },
      { en: "She must study. ✓ / She must to study. ✗", ar: "MUST لا يتبعها TO." },
      { en: "Can he swim? ✓ / Does he can swim? ✗", ar: "نقدّم CAN على الفاعل، ولا نستعين بـ DOES." },
    ],
  },
  {
    id: "ought-to-exception",
    station: "core-rule",
    kind: "lesson",
    mascot: "🧷",
    tone: "review",
    title: "الاستثناءان: OUGHT TO وHAVE TO",
    lead: "قاعدة TO ليست مطلقة، وHAVE TO ليس فعلًا ناقصًا خالصًا من الناحية النحوية.",
    examples: [
      { en: "He ought to study.", ar: "ينبغي له أن يدرس — OUGHT TO يتضمن TO بطبيعته." },
      { en: "He has to study. / They have to study.", ar: "HAVE TO يتغير بحسب الفاعل." },
      { en: "I had to leave early yesterday.", ar: "في الماضي: HAD TO." },
      { en: "We will have to study harder.", ar: "في المستقبل: WILL HAVE TO." },
    ],
    table: {
      head: ["Subject", "Form"],
      rows: [
        { label: "I / You / We / They", cells: ["have to"] },
        { label: "He / She / It", cells: ["has to"] },
        { label: "Past", cells: ["had to"] },
        { label: "Future", cells: ["will have to"] },
      ],
      note: "لهذا نستخدم DO وDOES مع HAVE TO في السؤال والنفي.",
    },
    tip: "OUGHT TO استثناء في TO، وHAVE TO استثناء في التصريف. احفظهما كحالتين خاصتين.",
  },
  {
    id: "rule-check",
    station: "core-rule",
    kind: "practice",
    mascot: "✍️",
    tone: "review",
    title: "تحقّق من القاعدة المشتركة",
    lead: "أكمل أو صحّح، ثم اقرأ سبب الإجابة.",
    practiceSet: "rule",
  },

  {
    id: "can-ability",
    station: "ability",
    kind: "lesson",
    mascot: "💪",
    tone: "ability",
    title: "CAN — القدرة في الحاضر",
    lead: "نستخدم CAN للتعبير عن قدرة شخص على القيام بشيء في الحاضر.",
    formula: ["Subject + CAN + V1"],
    examples: [
      { en: "I can speak English.", ar: "أستطيع التحدث بالإنجليزية." },
      { en: "She can play the piano.", ar: "تستطيع العزف على البيانو." },
      { en: "They can solve difficult problems.", ar: "يستطيعون حل المسائل الصعبة." },
    ],
    note: "CAN تعبّر أيضًا عن الإمكانية العامة: You can buy fresh bread at that shop.",
  },
  {
    id: "could-past",
    station: "ability",
    kind: "lesson",
    mascot: "🕰️",
    tone: "ability",
    title: "COULD — القدرة العامة في الماضي",
    lead: "COULD تصف قدرة عامة كانت موجودة في الماضي.",
    examples: [
      { en: "I could swim when I was six.", ar: "كنت أستطيع السباحة وعمري ست سنوات." },
      { en: "My grandfather could speak three languages.", ar: "كان جدي يستطيع التحدث بثلاث لغات." },
    ],
    note: "لا تخلط بين قدرة عامة متكررة، وبين نجاح في فعل واحد محدد في الماضي.",
  },
  {
    id: "can-could-map",
    station: "ability",
    kind: "comparison",
    mascot: "⚖️",
    tone: "ability",
    title: "مقارنة بين CAN وCOULD",
    lead: "الفرق ليس في الزمن وحده؛ إنه أيضًا في درجة اللباقة.",
    table: {
      head: ["CAN", "COULD"],
      rows: [
        { label: "الزمن", cells: ["قدرة في الحاضر", "قدرة عامة في الماضي"] },
        { label: "الطلب", cells: ["طلب مباشر نسبيًا", "طلب أكثر تهذيبًا غالبًا"] },
        { label: "الاستئذان", cells: ["استئذان طبيعي", "طلب أو استئذان أكثر تهذيبًا بحسب السياق"] },
      ],
    },
    examples: [
      { en: "Could you open the door, please?", ar: "هل يمكنك فتح الباب، من فضلك؟" },
      { en: "Could you explain this question?", ar: "هل يمكنك شرح هذا السؤال؟" },
      { en: "Can I use your phone?", ar: "هل يمكنني استخدام هاتفك؟" },
    ],
  },
  {
    id: "was-able-to",
    station: "ability",
    kind: "lesson",
    mascot: "🔓",
    tone: "ability",
    title: "WAS / WERE ABLE TO — النجاح في فعل محدد",
    lead: "إذا أردنا التعبير عن النجاح في إنجاز فعل محدد في الماضي، فقد نستخدم WAS/WERE ABLE TO بدل COULD في الجمل المثبتة.",
    examples: [
      { en: "The door was locked, but I was able to open it.", ar: "كان الباب مغلقًا، لكنني تمكنت من فتحه." },
      { en: "I could swim when I was young.", ar: "كنت أستطيع السباحة عندما كنت صغيرًا — قدرة عامة." },
    ],
    note: "هذا فرق في المعنى والاستعمال والسياق، لا قاعدة مطلقة تمنع COULD في كل جملة ماضية.",
    tip: "قدرة عامة متكررة → COULD. نجاح في مرة محددة → WAS/WERE ABLE TO.",
  },
  {
    id: "ability-lab",
    station: "ability",
    kind: "practice",
    mascot: "🧪",
    tone: "ability",
    title: "مختبر القدرة والاستئذان",
    lead: "اختر الفعل الذي يحقق المعنى المطلوب في كل موقف.",
    practiceSet: "ability",
  },

  {
    id: "may-might",
    station: "possibility",
    kind: "lesson",
    mascot: "🌦️",
    tone: "possibility",
    title: "MAY وMIGHT — الاحتمال",
    lead: "نستخدم MAY وMIGHT عندما لا نكون متأكدين من حدوث شيء.",
    examples: [
      { en: "It may rain tomorrow.", ar: "قد تمطر غدًا." },
      { en: "She might be at home.", ar: "ربما تكون في المنزل." },
      { en: "We may visit our grandparents.", ar: "قد نزور أجدادنا." },
    ],
    note: "ليس صحيحًا أن MIGHT أضعف من MAY بصورة مطلقة؛ قد تكون أكثر تحفظًا أو ترددًا في بعض السياقات. لا تحفظ نسبًا مئوية ثابتة.",
    tip: "المعنى والسياق يحددان الدرجة، لا جدول أرقام محفوظ.",
  },
  {
    id: "may-permission",
    station: "possibility",
    kind: "lesson",
    mascot: "🚪",
    tone: "possibility",
    title: "MAY — الاستئذان الرسمي",
    lead: "غالبًا يكون MAY أكثر رسمية من CAN في الاستئذان.",
    examples: [
      { en: "May I come in?", ar: "هل يمكنني الدخول؟" },
      { en: "May I ask a question?", ar: "هل يمكنني طرح سؤال؟" },
      { en: "May I borrow your book?", ar: "هل يمكنني استعارة كتابك؟" },
    ],
    table: {
      head: ["", "Formality", "Typical use"],
      rows: [
        { label: "CAN I…?", cells: ["عادي", "استئذان يومي"] },
        { label: "MAY I…?", cells: ["رسمي", "الفصول والمواقف الرسمية"] },
        { label: "MIGHT I…?", cells: ["رسمي جدًا", "نادر في الحديث اليومي"] },
      ],
    },
  },
  {
    id: "may-not-two",
    station: "possibility",
    kind: "comparison",
    mascot: "🔍",
    tone: "possibility",
    title: "MAY NOT — معنيان بحسب السياق",
    lead: "الجملة نفسها قد تحمل منعًا أو احتمال عدم الحدوث؛ والسياق هو الحكم.",
    examples: [
      { en: "You may not enter this room.", ar: "قد تعني: لا يُسمح لك بدخول هذه الغرفة." },
      { en: "She may not come tomorrow.", ar: "قد تعني: ربما لن تأتي غدًا." },
    ],
    table: {
      head: ["Sentence", "Meaning"],
      rows: [
        { label: "It may rain.", cells: ["قد تمطر."] },
        { label: "It might rain.", cells: ["ربما تمطر."] },
        { label: "May I leave?", cells: ["هل يمكنني المغادرة؟"] },
        { label: "Might I leave?", cells: ["هل تسمح لي بالمغادرة؟ (رسمية جدًا)"] },
      ],
      note: "الفرق بين المعنيين ليس في الشكل، بل في من يتكلم وفي الموقف.",
    },
  },
  {
    id: "possibility-lab",
    station: "possibility",
    kind: "practice",
    mascot: "🧪",
    tone: "possibility",
    title: "مختبر الاحتمال والاستئذان",
    lead: "حدد الوظيفة قبل اختيار الفعل.",
    practiceSet: "possibility",
  },

  {
    id: "must-have-to",
    station: "necessity",
    kind: "lesson",
    mascot: "🚨",
    tone: "necessity",
    title: "MUST وHAVE TO — الضرورة والإلزام",
    lead: "كلاهما للتعبير عن الضرورة، لكن توجد فروق في التركيز والاستعمال.",
    examples: [
      { en: "You must wear a seat belt.", ar: "يجب أن ترتدي حزام الأمان — إلزام يقدّمه المتحدث أو قاعدة يراها مهمة." },
      { en: "I must finish this report today.", ar: "يجب أن أنهي هذا التقرير اليوم." },
      { en: "I have to wear a uniform at school.", ar: "يجب أن أرتدي زيًا موحدًا — التزام تفرضه الظروف أو القواعد الخارجية." },
      { en: "They have to follow the rules.", ar: "يجب عليهم اتباع القواعد." },
    ],
    note: "هذه فروق في التركيز والاستعمال، وليست حدودًا مطلقة؛ أحيانًا يكون الاثنان مقبولين.",
  },
  {
    id: "have-to-forms",
    station: "necessity",
    kind: "lesson",
    mascot: "🔧",
    tone: "necessity",
    title: "تصريف HAVE TO والسؤال والنفي",
    lead: "لأن HAVE TO ليس فعلًا ناقصًا خالصًا، فهو يتغير بحسب الفاعل والزمن، ويأخذ DO/DOES.",
    formula: ["HAS TO + V1", "HAD TO + V1", "WILL HAVE TO + V1", "DO / DOES … HAVE TO + V1?"],
    examples: [
      { en: "She has to work tomorrow.", ar: "يجب عليها العمل غدًا." },
      { en: "I had to leave early yesterday.", ar: "اضطررت إلى المغادرة مبكرًا أمس." },
      { en: "We will have to study harder.", ar: "سيتعين علينا الدراسة بجدية أكبر." },
      { en: "Do you have to work tomorrow?", ar: "هل يجب عليك العمل غدًا؟" },
      { en: "She doesn't have to come.", ar: "ليس من الضروري أن تأتي." },
    ],
    tip: "الزمن والفاعل يظهران في HAVE، والفعل الأساسي يبقى V1 دائمًا.",
  },
  {
    id: "necessity-lab",
    station: "necessity",
    kind: "practice",
    mascot: "🧪",
    tone: "necessity",
    title: "مختبر الضرورة",
    lead: "MUST أم HAVE TO أم صيغة أخرى؟ اقرأ السياق أولًا.",
    practiceSet: "necessity",
  },

  {
    id: "three-doors",
    station: "prohibition",
    kind: "comparison",
    mascot: "⛔",
    tone: "prohibition",
    title: "MUSTN'T vs DON'T HAVE TO vs NEEDN'T",
    lead: "هذه من أهم المقارنات في المنهج كله: المنع ليس هو عدم الضرورة.",
    table: {
      head: ["Sentence", "Meaning"],
      rows: [
        { label: "You mustn't go.", cells: ["ممنوع أن تذهب."] },
        { label: "You don't have to go.", cells: ["ليس من الضروري أن تذهب."] },
        { label: "You needn't go.", cells: ["لا داعي لأن تذهب."] },
      ],
      note: "DON'T HAVE TO وNEEDN'T متقاربتان في المعنى؛ الأولى تصف عدم الإلزام، والثانية تصف عدم الحاجة.",
    },
    examples: [
      { en: "You mustn't touch the machine.", ar: "يُمنع أن تلمس الآلة." },
      { en: "You mustn't use your phone during the exam.", ar: "يُمنع استخدام هاتفك أثناء الاختبار." },
      { en: "You don't have to come early.", ar: "ليس من الضروري أن تأتي مبكرًا؛ يمكنك ذلك لكنك لست ملزمًا." },
      { en: "You needn't bring any food.", ar: "لا حاجة إلى إحضار الطعام." },
    ],
    tip: "MUSTN'T = ممنوع. DON'T HAVE TO / NEEDN'T = غير مطلوب. لا تخلط بينهما أبدًا.",
  },
  {
    id: "neednt-have",
    station: "prohibition",
    kind: "comparison",
    mascot: "🧩",
    tone: "prohibition",
    title: "نقطة متقدمة: NEEDN'T HAVE + V3",
    lead: "سنحتاج هذا التركيب في الدرس 49، لكن من المفيد التعرف عليه الآن.",
    examples: [
      {
        en: "You needn't have bought so much food.",
        ar: "لم يكن هناك داعٍ لأن تشتري كل هذا الطعام، لكنك اشتريته بالفعل.",
      },
      {
        en: "You didn't need to buy so much food.",
        ar: "لم تكن بحاجة إلى شراء كل هذا الطعام؛ والجملة وحدها لا تحدد هل تم الشراء.",
      },
    ],
    note: "هذا تمهيد فقط. التفصيل الكامل في الدرس 49 — MODAL PERFECT.",
  },
  {
    id: "prohibition-lab",
    station: "prohibition",
    kind: "practice",
    mascot: "🧪",
    tone: "prohibition",
    title: "مختبر المنع وعدم الضرورة",
    lead: "قرار واحد فقط يفرق بين المنع وعدم الضرورة.",
    practiceSet: "prohibition",
  },

  {
    id: "should",
    station: "advice",
    kind: "lesson",
    mascot: "🩺",
    tone: "advice",
    title: "SHOULD — النصيحة والتوصية",
    lead: "نستخدم SHOULD لنصائح لا نُلزم بها المخاطب.",
    examples: [
      { en: "You should drink more water.", ar: "ينبغي أن تشرب المزيد من الماء." },
      { en: "You should study regularly.", ar: "ينبغي أن تدرس بانتظام." },
      { en: "She should talk to her teacher.", ar: "ينبغي أن تتحدث إلى معلمها." },
      { en: "You shouldn't stay up late.", ar: "ينبغي ألا تسهر." },
      { en: "Should I call the doctor?", ar: "هل ينبغي أن أتصل بالطبيب؟" },
    ],
  },
  {
    id: "ought-to",
    station: "advice",
    kind: "lesson",
    mascot: "⚖️",
    tone: "advice",
    title: "OUGHT TO — النبرة الأخلاقية",
    lead: "معناه قريب جدًا من SHOULD، ويظهر في النصائح التي تحمل واجبًا أو مسؤولية أخلاقية.",
    examples: [
      { en: "You ought to respect your parents.", ar: "ينبغي أن تحترم والديك." },
      { en: "We ought to protect the environment.", ar: "ينبغي أن نحمي البيئة." },
      { en: "You ought not to ignore the warning.", ar: "ينبغي ألا تتجاهل التحذير." },
      { en: "Ought we to leave now?", ar: "هل ينبغي أن نغادر الآن؟ (أقل شيوعًا في المحادثة)" },
    ],
    note: "الفرق غالبًا في النبرة والسياق؛ وكلتاهما صحيحة.",
  },
  {
    id: "should-vs-must",
    station: "advice",
    kind: "comparison",
    mascot: "🔬",
    tone: "advice",
    title: "SHOULD أم MUST؟",
    lead: "الإلزام ليس هو النصيحة.",
    examples: [
      { en: "You should help him.", ar: "ينبغي أن تساعده — نصيحة." },
      { en: "You ought to help him.", ar: "من الواجب أو المناسب أن تساعده — نبرة أخلاقية." },
      { en: "You must help him.", ar: "يجب أن تساعده — إلزام." },
    ],
    table: {
      head: ["", "SHOULD", "MUST"],
      rows: [
        { label: "القوة", cells: ["توصية", "إلزام قوي"] },
        { label: "النتيجة عند الترك", cells: ["فرصة ضائعة ونصيحة مُهمَلة", "مخالفة لقاعدة أو التزام"] },
        { label: "النفي", cells: ["shouldn't = ينبغي ألّا", "mustn't = ممنوع"] },
      ],
    },
  },
  {
    id: "advice-lab",
    station: "advice",
    kind: "practice",
    mascot: "🧪",
    tone: "advice",
    title: "مختبر النصيحة",
    lead: "نصيحة أم إلزام أم منع؟",
    practiceSet: "advice",
  },

  {
    id: "would-structures",
    station: "desire",
    kind: "lesson",
    mascot: "🎩",
    tone: "desire",
    title: "WOULD — سبعة تراكيب أساسية",
    lead: "في الدرس 47 تعلّمنا هذه التراكيب؛ وهذه مراجعتها السريعة قبل الاختبار.",
    formula: [
      "WOULD LIKE + NOUN",
      "WOULD LIKE + TO + V1",
      "WOULD RATHER + V1",
      "WOULD RATHER … THAN …",
      "WOULD YOU MIND + V-ing",
      "WOULD LIKE + PERSON + TO + V1",
      "WOULD RATHER + SUBJECT + PAST SIMPLE",
    ],
    examples: [
      { en: "I'd like some coffee.", ar: "أود بعض القهوة." },
      { en: "I'd like to travel abroad.", ar: "أود السفر إلى الخارج." },
      { en: "I'd rather stay home.", ar: "أفضل البقاء في المنزل." },
      { en: "I'd rather walk than drive.", ar: "أفضل المشي على القيادة." },
      { en: "Would you mind opening the window?", ar: "هل تمانع في فتح النافذة؟" },
      { en: "I'd like you to help me.", ar: "أود منك أن تساعدني." },
      { en: "I'd rather you stayed here.", ar: "أفضل أن تبقى هنا." },
    ],
    tip: "RATHER يتبعها V1، وMIND يتبعها V-ing، والتفضيل عن شخص آخر يأخذ الماضي البسيط.",
  },
  {
    id: "like-vs-rather",
    station: "desire",
    kind: "comparison",
    mascot: "🎟️",
    tone: "desire",
    title: "WOULD LIKE أم WOULD RATHER؟",
    lead: "الرغبة ليست هي التفضيل؛ والتفضيل غالبًا يقارن بين خيارين.",
    examples: [
      { en: "I'd like to go.", ar: "أود الذهاب — رغبة." },
      { en: "I'd rather go.", ar: "أفضل الذهاب — تفضيل." },
      { en: "I'd rather not go.", ar: "أفضل عدم الذهاب." },
      { en: "Would you mind opening the window? — No, not at all.", ar: "No هنا تعني: لا أمانع، أي أوافق." },
    ],
  },
  {
    id: "desire-lab",
    station: "desire",
    kind: "practice",
    mascot: "🧪",
    tone: "desire",
    title: "مختبر الرغبة والتفضيل",
    lead: "اختر التركيب الصحيح، أو صحّح الخطأ كاملًا.",
    practiceSet: "desire",
  },

  {
    id: "will",
    station: "future",
    kind: "lesson",
    mascot: "🔮",
    tone: "future",
    title: "WILL — المستقبل والقرار والوعد",
    lead: "درسنا WILL في الدرس 34، ونربطه اليوم ببقية الأفعال الناقصة.",
    examples: [
      { en: "I will travel tomorrow.", ar: "سأسافر غدًا." },
      { en: "The phone is ringing. I'll answer it.", ar: "الهاتف يرن. سأجيب — قرار سريع." },
      { en: "I will help you.", ar: "سأساعدك — وعد." },
      { en: "I think our team will win.", ar: "أعتقد أن فريقنا سيفوز — تنبؤ." },
      { en: "I won't forget.", ar: "لن أنسى — النفي." },
      { en: "Will you help me?", ar: "هل ستساعدني؟ — السؤال." },
    ],
  },
  {
    id: "will-vs-would",
    station: "future",
    kind: "comparison",
    mascot: "🪞",
    tone: "future",
    title: "WILL أم WOULD؟",
    lead: "WILL للمستقبل والوعد، وWOULD للافتراض والتهذيب.",
    examples: [
      { en: "I will help you.", ar: "سأساعدك." },
      { en: "I would help you if I had time.", ar: "كنت سأساعدك لو كان لدي وقت — افتراض." },
    ],
    table: {
      head: ["", "WILL", "WOULD"],
      rows: [
        { label: "الوظيفة", cells: ["مستقبل · قرار · وعد · تنبؤ", "افتراض · تهذيب · رغبة · تفضيل"] },
        { label: "الواقع", cells: ["متوقع أو معلن", "غير واقعي أو مؤدب"] },
        { label: "مثال", cells: ["I will call you.", "I would call you if I could."] },
      ],
      note: "قواعد الجمل الشرطية تُدرَس بصورة منظمة في دروس الشرط.",
    },
  },
  {
    id: "future-lab",
    station: "future",
    kind: "practice",
    mascot: "🧪",
    tone: "future",
    title: "مختبر المستقبل",
    lead: "WILL أم WOULD أم فعل آخر؟",
    practiceSet: "future",
  },

  {
    id: "decision-map",
    station: "decision",
    kind: "decision",
    mascot: "🧠",
    tone: "review",
    title: "Decision Map — كيف نختار الفعل المناسب؟",
    lead: "لا تبدأ بالبحث عن ترجمة كلمة واحدة؛ اسأل نفسك أولًا: ما المعنى الذي أريد التعبير عنه؟",
  },

  {
    id: "detective-a",
    station: "detective",
    kind: "detective",
    mascot: "🔍",
    tone: "review",
    title: "Grammar Detective — الأخطاء من ١ إلى ٦",
    lead: "اكتشف الخطأ، أعد كتابة الجملة، ثم اقرأ السبب.",
    practiceSet: "detective-a",
  },
  {
    id: "detective-b",
    station: "detective",
    kind: "detective",
    mascot: "🕵️",
    tone: "review",
    title: "Grammar Detective — الأخطاء من ٧ إلى ١٢",
    lead: "نصف الأخطاء هنا يخص TO، والنصف الآخر يخص المعنى.",
    practiceSet: "detective-b",
  },

  {
    id: "dialogue-school",
    station: "dialogues",
    kind: "dialogue",
    mascot: "🏫",
    tone: "necessity",
    title: "الحوار الأول: At School",
    lead: "سبعة وظائف مختلفة في حوار واحد قصير.",
    dialogue: "school",
  },
  {
    id: "dialogue-trip",
    station: "dialogues",
    kind: "dialogue",
    mascot: "🏔️",
    tone: "desire",
    title: "الحوار الثاني: Planning a Trip",
    lead: "رغبة، اقتراح، احتمال، نصيحة، ضرورة، وتفضيل في محادثة واحدة.",
    dialogue: "trip",
  },
  {
    id: "dialogue-home",
    station: "dialogues",
    kind: "dialogue",
    mascot: "🏠",
    tone: "advice",
    title: "الحوار الثالث: A Problem at Home",
    lead: "انتبه للفرق بين DON'T HAVE TO وMUSTN'T في الحوار نفسه.",
    dialogue: "home",
  },

  {
    id: "what-would-you-say",
    station: "situations",
    kind: "situations",
    mascot: "🧩",
    tone: "review",
    title: "What Would You Say? — عشرة مواقف",
    lead: "اقرأ الموقف، ثم اكتب الفعل أو التركيب الأنسب. التغذية الراجعة تشرح سبب قبول الإجابة.",
    practiceSet: "say",
  },

  {
    id: "practice-forms",
    station: "practice",
    kind: "practice",
    mascot: "🏋️",
    tone: "review",
    title: "تدريب الصيغ والتراكيب",
    lead: "أكمل كل جملة بالصيغة الصحيحة، أو أعد كتابة الجملة كاملة.",
    practiceSet: "forms",
  },
  {
    id: "contrast-lab",
    station: "practice",
    kind: "contrast",
    mascot: "⚖️",
    tone: "prohibition",
    title: "Meaning Contrast Lab — أثر تغيير الفعل",
    lead: "بدّل الفعل في الجملة نفسها، وشاهد كيف يتغير المعنى كله.",
  },
  {
    id: "mastery-dashboard",
    station: "practice",
    kind: "dashboard",
    mascot: "📊",
    tone: "review",
    title: "Mastery Dashboard — لوحة الإتقان",
    lead: "الأرقام هنا مبنية على إجاباتك الفعلية فقط، ولا تُختلق نسب إتقان.",
  },

  {
    id: "reading",
    station: "reading",
    kind: "reading",
    mascot: "📖",
    tone: "review",
    title: "The School Science Competition",
    lead: "A Team, A Challenge and Many Decisions.",
  },
  {
    id: "reading-questions",
    station: "reading",
    kind: "readingQuestions",
    mascot: "🧾",
    tone: "review",
    title: "أسئلة الفهم الخمسة عشر",
    lead: "أجب بنفسك أولًا، ثم قارن بالإجابة النموذجية.",
  },

  {
    id: "final-test",
    station: "test",
    kind: "test",
    mascot: "🏆",
    tone: "review",
    title: "Modal Verbs Master Examination",
    lead: "25 سؤالًا · 5 مستويات · لا تصحيح قبل التسليم.",
  },
  {
    id: "teacher",
    station: "test",
    kind: "teacher",
    mascot: "🧑‍🏫",
    tone: "review",
    title: "مساحة المعلم",
    lead: "مفتاح الأسئلة الخمسة والعشرين، البدائل المقبولة، وأسباب رفض الأخطاء الشائعة.",
  },

  {
    id: "writing",
    station: "writing",
    kind: "writing",
    mascot: "✍️",
    tone: "desire",
    title: "Writing & Speaking Mission — A Day Full of Decisions",
    lead: "اكتب قصة من 15 إلى 20 جملة تستخدم فيها خمس عشرة بنية مطلوبة.",
  },

  {
    id: "golden-summary",
    station: "summary",
    kind: "summary",
    mascot: "🧠",
    tone: "review",
    title: "الخلاصة الذهبية الكبرى",
    lead: "خريطة واحدة تجمع كل التركيبات، وخمس مقارنات لا تُنسى.",
  },
  {
    id: "phase-complete",
    station: "summary",
    kind: "phase",
    mascot: "🏅",
    tone: "review",
    title: "إنجاز المرحلة الثانية",
    lead: "Auxiliary & Modal Verbs — الدروس 41 إلى 48.",
  },
  {
    id: "course-progress",
    station: "summary",
    kind: "roadmap",
    mascot: "🎓",
    tone: "review",
    title: "المحطة القادمة: الدرس 49 — MODAL PERFECT",
    lead: "أُغلقت المرحلة الثانية بنجاح. نلتقي في Modal + HAVE + V3.",
  },
] as const;

export const LESSON_STEP_COUNT_48 = SLIDES_48.length;

/* ============================================================
   القراءة الشاملة
   ============================================================ */

export const READING_48 = [
  {
    en: "A group of students is preparing for a science competition.",
    ar: "مجموعة من الطلاب تستعد لمسابقة علمية.",
  },
  {
    en: "Maya can design excellent posters, and Omar can build simple electronic models.",
    ar: "تستطيع مايا تصميم ملصقات ممتازة، ويستطيع عمر بناء نماذج إلكترونية بسيطة.",
  },
  {
    en: "Daniel could help with the presentation because he has experience speaking in front of an audience.",
    ar: "كان دانيال يستطيع المساعدة في العرض التقديمي لأنه يملك خبرة في التحدث أمام جمهور.",
  },
  {
    en: "Their teacher tells them: “You must submit your project by Friday. You have to follow the competition rules, and you mustn't copy information without saying where it came from.”",
    ar: "يقول لهم معلمهم: «يجب أن تسلّموا مشروعكم بحلول الجمعة. عليكم اتباع قواعد المسابقة، ويُمنع أن تنسخوا معلومات دون ذكر مصدرها».",
  },
  {
    en: "Maya asks: “May we use pictures from educational websites?”",
    ar: "تسأل مايا: «هل يمكننا استخدام صور من مواقع تعليمية؟»",
  },
  {
    en: "The teacher replies: “Yes, you may, but you should check whether the pictures can be reused.”",
    ar: "يجيب المعلم: «نعم، يمكنكم ذلك، لكن ينبغي أن تتحققوا من إمكانية إعادة استخدام الصور».",
  },
  {
    en: "Omar looks at the project and says: “We might need more materials. Could we ask the school for help?”",
    ar: "ينظر عمر إلى المشروع ويقول: «ربما نحتاج مزيدًا من المواد. هل يمكننا طلب المساعدة من المدرسة؟»",
  },
  {
    en: "“That's a good idea,” says Daniel.",
    ar: "يقول دانيال: «هذه فكرة جيدة».",
  },
  {
    en: "Later, the team discusses how to divide the work. Maya says: “I'd like to prepare the posters. I'd rather work on the design than write the report.”",
    ar: "لاحقًا يناقش الفريق كيفية تقسيم العمل. تقول مايا: «أودّ إعداد الملصقات. أفضّل العمل على التصميم على كتابة التقرير».",
  },
  {
    en: "Omar replies: “I'd rather build the model. Would you like me to explain how it works during the presentation?”",
    ar: "يجيب عمر: «أفضّل بناء النموذج. هل تودّون أن أشرح كيف يعمل أثناء العرض التقديمي؟»",
  },
  {
    en: "Daniel smiles. “That would be great! But we should practise together before the competition.”",
    ar: "يبتسم دانيال: «سيكون ذلك رائعًا! لكن ينبغي أن نتدرّب معًا قبل المسابقة».",
  },
  {
    en: "The team decides to meet the next afternoon.",
    ar: "يقرر الفريق الاجتماع في ظهر اليوم التالي.",
  },
  {
    en: "They don't have to stay at school all evening, but they must finish their main tasks before Friday.",
    ar: "ليس من الضروري أن يبقوا في المدرسة طوال المساء، لكن يجب أن ينهوا مهامهم الرئيسية قبل الجمعة.",
  },
  {
    en: "At the end of the meeting, their teacher says: “You can achieve something excellent if you work together, respect the rules and use your abilities wisely.”",
    ar: "في نهاية الاجتماع يقول معلمهم: «يمكنكم تحقيق شيء ممتاز إذا عملتم معًا واحترمتم القواعد واستخدمتم قدراتكم بحكمة».",
  },
] as const;

export const READING_QUESTIONS_48 = [
  {
    q: "What can Maya do well?",
    answer: "She can design excellent posters.",
    ar: "تستطيع تصميم ملصقات ممتازة.",
  },
  {
    q: "What can Omar do?",
    answer: "He can build simple electronic models.",
    ar: "يستطيع بناء نماذج إلكترونية بسيطة.",
  },
  {
    q: "Why could Daniel help with the presentation?",
    answer: "Because he has experience speaking in front of an audience.",
    ar: "لأنه يملك خبرة في التحدث أمام جمهور.",
  },
  {
    q: "When must the students submit their project?",
    answer: "They must submit it by Friday.",
    ar: "بحلول يوم الجمعة.",
  },
  {
    q: "What mustn't the students do?",
    answer: "They mustn't copy information without saying where it came from.",
    ar: "يُمنع عليهم نسخ معلومات دون ذكر مصدرها.",
  },
  {
    q: "What does the teacher say about using pictures?",
    answer: "They may use them, but they should check whether the pictures can be reused.",
    ar: "يمكنهم استخدامها، لكن ينبغي أن يتحققوا من إمكانية إعادة استخدامها.",
  },
  {
    q: "What might the team need?",
    answer: "They might need more materials.",
    ar: "ربما يحتاجون مزيدًا من المواد.",
  },
  {
    q: "What does Omar suggest?",
    answer: "He suggests asking the school for help.",
    ar: "يقترح طلب المساعدة من المدرسة.",
  },
  {
    q: "What would Maya like to prepare?",
    answer: "She'd like to prepare the posters.",
    ar: "تودّ إعداد الملصقات.",
  },
  {
    q: "What would Omar rather build?",
    answer: "He'd rather build the model.",
    ar: "يفضّل بناء النموذج.",
  },
  {
    q: "What does Daniel think they should do before the competition?",
    answer: "He thinks they should practise together before the competition.",
    ar: "يرى أنهم ينبغي أن يتدرّبوا معًا قبل المسابقة.",
  },
  {
    q: "Do the students have to stay at school all evening?",
    answer: "No, they don't have to stay at school all evening.",
    ar: "لا، ليس من الضروري أن يبقوا طوال المساء.",
  },
  {
    q: "ما الفرق بين MUSTN'T وDON'T HAVE TO في النص؟",
    answer: "MUSTN'T تعني المنع، أما DON'T HAVE TO فتعني عدم الضرورة.",
    ar: "الأولى منع صريح، والثانية عدم إلزام.",
    lang: "ar" as const,
  },
  {
    q: "استخرج مثالًا على الاستئذان من النص.",
    answer: "May we use pictures from educational websites?",
    ar: "سؤال مايا للمعلم عن استخدام الصور.",
    lang: "ar" as const,
  },
  {
    q: "استخرج مثالًا على التفضيل من النص.",
    answer: "I'd rather work on the design than write the report.",
    ar: "تفضيل مايا بين التصميم وكتابة التقرير.",
    lang: "ar" as const,
  },
] as const;

/* ============================================================
   الملخص الذهبي
   ============================================================ */

export const SUMMARY_48 = [
  { tone: "ability" as Tone48, en: "CAN + V1", ar: "القدرة في الحاضر", ex: "I can swim.", icon: "💪" },
  { tone: "ability" as Tone48, en: "COULD + V1", ar: "القدرة العامة في الماضي", ex: "I could swim when I was six.", icon: "🕰️" },
  { tone: "possibility" as Tone48, en: "MAY / MIGHT / COULD + V1", ar: "الاحتمال", ex: "She might come.", icon: "🌦️" },
  { tone: "ability" as Tone48, en: "MAY I…? / CAN I…?", ar: "الاستئذان", ex: "May I come in?", icon: "🚪" },
  { tone: "desire" as Tone48, en: "COULD YOU…? / WOULD YOU…?", ar: "الطلب المهذب", ex: "Could you help me?", icon: "🤝" },
  { tone: "necessity" as Tone48, en: "MUST + V1", ar: "الضرورة", ex: "You must stop.", icon: "🚨" },
  { tone: "necessity" as Tone48, en: "HAVE TO + V1", ar: "الالتزام", ex: "I have to work.", icon: "🔧" },
  { tone: "advice" as Tone48, en: "SHOULD + V1", ar: "النصيحة", ex: "You should rest.", icon: "🩺" },
  { tone: "advice" as Tone48, en: "OUGHT TO + V1", ar: "النصيحة ذات النبرة الأخلاقية", ex: "You ought to help.", icon: "⚖️" },
  { tone: "prohibition" as Tone48, en: "MUSTN'T + V1", ar: "المنع", ex: "You mustn't enter.", icon: "⛔" },
  { tone: "prohibition" as Tone48, en: "DON'T HAVE TO + V1", ar: "عدم الضرورة", ex: "You don't have to come.", icon: "🟡" },
  { tone: "prohibition" as Tone48, en: "NEEDN'T + V1", ar: "عدم الحاجة", ex: "You needn't hurry.", icon: "🟢" },
  { tone: "desire" as Tone48, en: "WOULD LIKE + noun", ar: "الرغبة في شيء", ex: "I'd like some tea.", icon: "☕" },
  { tone: "desire" as Tone48, en: "WOULD LIKE + TO + V1", ar: "الرغبة في فعل", ex: "I'd like to learn English.", icon: "🚀" },
  { tone: "desire" as Tone48, en: "WOULD RATHER + V1", ar: "التفضيل", ex: "I'd rather stay home.", icon: "🎟️" },
  { tone: "desire" as Tone48, en: "WOULD RATHER + V1 + THAN + V1", ar: "المقارنة بين تفضيلين", ex: "I'd rather walk than drive.", icon: "⚖️" },
  { tone: "desire" as Tone48, en: "WOULD YOU MIND + V-ing", ar: "الطلب بصيغة الممانعة", ex: "Would you mind opening the window?", icon: "🪟" },
  { tone: "future" as Tone48, en: "WILL + V1", ar: "المستقبل", ex: "I will travel tomorrow.", icon: "🔮" },
] as const;

export const FIVE_COMPARISONS_48 = [
  { n: "①", en: "MUSTN'T ≠ DON'T HAVE TO", ar: "المنع لا يعني عدم الضرورة." },
  { n: "②", en: "MUST ≠ SHOULD", ar: "الإلزام ليس هو النصيحة." },
  { n: "③", en: "MAY / MIGHT ≠ MUST", ar: "الاحتمال ليس هو التأكد أو الاستنتاج القوي." },
  { n: "④", en: "WOULD LIKE ≠ WOULD RATHER", ar: "الرغبة ليست هي التفضيل." },
  { n: "⑤", en: "COULD YOU…? ≠ SHOULD YOU…?", ar: "الأولى طلب مهذب، والثانية سؤال عن النصيحة أو ما ينبغي فعله بحسب السياق." },
] as const;
