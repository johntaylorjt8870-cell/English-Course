/**
 * Lesson 49 — MODAL PERFECT
 * Student-facing teaching content only. Assessment solutions live in
 * `testKey49.ts`; practice solutions live in `practiceKey49.ts`.
 */
export type Tone49 =
  | "deduction"
  | "possibility"
  | "regret"
  | "opportunity"
  | "unnecessary"
  | "hypothetical"
  | "impossible"
  | "review";

export type Example49 = { en: string; ar: string; tag?: string; tone?: Tone49 };
export type Table49 = {
  head: readonly string[];
  rows: readonly { label: string; cells: readonly string[] }[];
  note?: string;
};

export type SlideKind49 =
  | "cover"
  | "goals"
  | "stage"
  | "timeline"
  | "lesson"
  | "comparison"
  | "v3"
  | "evidence"
  | "detector"
  | "map"
  | "contrast"
  | "detective"
  | "dialogue"
  | "reading"
  | "readingQuestions"
  | "readingChallenge"
  | "practice"
  | "test"
  | "teacher"
  | "writing"
  | "dashboard"
  | "summary"
  | "phase"
  | "roadmap";

export type Slide49 = {
  id: string;
  station: string;
  kind: SlideKind49;
  title: string;
  lead?: string;
  mascot?: string;
  tone?: Tone49;
  formula?: readonly string[];
  formulaGlosses?: readonly string[];
  examples?: readonly Example49[];
  points?: readonly string[];
  note?: string;
  tip?: string;
  table?: Table49;
  practiceSet?: string;
  dialogue?: string;
};

export const STATIONS_49 = [
  { id: "opening", title: "البداية" },
  { id: "core-rule", title: "القاعدة الأساسية" },
  { id: "present-past", title: "الحاضر مقابل الماضي" },
  { id: "must-have", title: "MUST HAVE" },
  { id: "may-might", title: "MAY / MIGHT HAVE" },
  { id: "could-have", title: "COULD HAVE" },
  { id: "couldnt-have", title: "COULDN'T HAVE" },
  { id: "should-have", title: "SHOULD (N'T) HAVE" },
  { id: "ought-to", title: "OUGHT TO HAVE" },
  { id: "neednt-have", title: "NEEDN'T HAVE" },
  { id: "would-have", title: "WOULD HAVE" },
  { id: "past-perfect", title: "Modal Perfect وPast Perfect" },
  { id: "negative-questions", title: "النفي والسؤال" },
  { id: "meaning-map", title: "خريطة المعاني" },
  { id: "mistakes", title: "الأخطاء الشائعة" },
  { id: "dialogue", title: "الحوار" },
  { id: "reading", title: "القراءة" },
  { id: "practice", title: "التدريبات" },
  { id: "test", title: "الاختبار النهائي" },
  { id: "teacher", title: "مساحة المعلم" },
  { id: "writing", title: "الكتابة والتحدث" },
  { id: "summary", title: "الملخص والتقدم" },
] as const;

export const GOALS_49 = [
  "التمييز بين Modal + V1 للحديث عن الحاضر أو المستقبل، وModal + HAVE + V3 للحديث عن الماضي.",
  "إتقان الصيغة MODAL + HAVE + V3 دون HAS أو HAD بعد الفعل الناقص.",
  "اختيار التصريف الثالث V3 الصحيح بعد HAVE، وتجنّب V1 وV2.",
  "الاستنتاج القوي عن الماضي باستخدام MUST HAVE + V3 اعتمادًا على دليل.",
  "التعبير عن الاحتمال في الماضي باستخدام MAY HAVE وMIGHT HAVE دون نسب مئوية مخترعة.",
  "التمييز بين استعمالي COULD HAVE: احتمال في الماضي، وفرصة كانت متاحة ولم تُستغل.",
  "الاستنتاج بأن شيئًا لم يكن ممكنًا باستخدام COULDN'T HAVE + V3.",
  "التعبير عن الندم والنصيحة المتأخرة باستخدام SHOULD HAVE وSHOULDN'T HAVE وOUGHT TO HAVE.",
  "التمييز بين NEEDN'T HAVE + V3 وDIDN'T NEED TO + V1.",
  "فهم WOULD HAVE + V3 كنتيجة افتراضية لم تحدث، وربطها بالدرس 54 دون توسّع.",
  "التمييز بين Modal Perfect وPast Perfect، وتكوين النفي والسؤال والإجابات القصيرة.",
  "كشف الأخطاء الشائعة وتصحيحها مع تفسير السبب، ثم استخدام التراكيب في الكتابة والتحدث.",
] as const;

/* ============================================================
   المدخل: مراجعة الأفعال الناقصة والوظائف الست
   ============================================================ */

export const MODALS_REVIEW_49 = [
  { modal: "MUST", ar: "يجب / لا بد أن", sentence: "She must study." },
  { modal: "SHOULD", ar: "ينبغي / من الأفضل أن", sentence: "You should rest." },
  { modal: "COULD", ar: "استطاع / يمكن أن", sentence: "He could swim." },
  { modal: "MAY", ar: "قد / ربما", sentence: "It may rain." },
  { modal: "MIGHT", ar: "ربما", sentence: "They might come." },
  { modal: "WOULD", ar: "كان سيـ / أودّ", sentence: "I would help." },
] as const;

export const SIX_FUNCTIONS_49 = [
  {
    id: "deduction",
    glyph: "◆",
    tone: "deduction" as Tone49,
    title: "استنتاج قوي عن الماضي",
    en: "He must have forgotten.",
    ar: "لا بد أنه نسي.",
  },
  {
    id: "possibility",
    glyph: "◌",
    tone: "possibility" as Tone49,
    title: "احتمال في الماضي",
    en: "She might have left.",
    ar: "ربما غادرت.",
  },
  {
    id: "regret",
    glyph: "↩",
    tone: "regret" as Tone49,
    title: "الندم والانتقاد",
    en: "You should have studied.",
    ar: "كان ينبغي أن تدرس.",
  },
  {
    id: "opportunity",
    glyph: "⤫",
    tone: "opportunity" as Tone49,
    title: "فرصة ضائعة",
    en: "We could have won.",
    ar: "كان بإمكاننا الفوز.",
  },
  {
    id: "unnecessary",
    glyph: "⌁",
    tone: "unnecessary" as Tone49,
    title: "فعل لم يكن ضروريًا",
    en: "You needn't have bought it.",
    ar: "لم يكن من الضروري أن تشتريه.",
  },
  {
    id: "hypothetical",
    glyph: "⇢",
    tone: "hypothetical" as Tone49,
    title: "نتيجة افتراضية لم تحدث",
    en: "I would have helped you.",
    ar: "كنت سأساعدك لو عرفت.",
  },
] as const;

export const TIMELINE_ITEMS_49 = [
  {
    id: "t1",
    present: { en: "She might come.", ar: "ربما تأتي." },
    past: { en: "She might have come.", ar: "ربما تكون قد جاءت." },
    verdict: "أضافت HAVE + V3 البُعد الزمني الماضي: الاحتمال الآن متعلق بحدوث الفعل في الماضي.",
    tone: "possibility" as Tone49,
  },
  {
    id: "t2",
    present: { en: "He must study.", ar: "يجب عليه أن يدرس." },
    past: { en: "He must have studied.", ar: "لا بد أنه درس." },
    verdict: "MUST وحدها إلزام في الحاضر، أما MUST HAVE + V3 فاستنتاج قوي عن الماضي — المعنى تغيّر كليًا.",
    tone: "deduction" as Tone49,
  },
  {
    id: "t3",
    present: { en: "She might leave.", ar: "ربما تغادر." },
    past: { en: "She might have left.", ar: "ربما غادرت." },
    verdict: "نفس الفعل الناقص، لكن HAVE + V3 نقلت الجملة من احتمال في الحاضر أو المستقبل إلى احتمال في الماضي.",
    tone: "possibility" as Tone49,
  },
  {
    id: "t4",
    present: { en: "You should apologize.", ar: "ينبغي أن تعتذر." },
    past: { en: "You should have apologized.", ar: "كان ينبغي أن تعتذر." },
    verdict: "SHOULD + V1 نصيحة الآن، وSHOULD HAVE + V3 ندم أو لوم لأن الفعل لم يحدث في الماضي.",
    tone: "regret" as Tone49,
  },
  {
    id: "t5",
    present: { en: "They could win.", ar: "يمكنهم الفوز." },
    past: { en: "They could have won.", ar: "كان بإمكانهم الفوز / ربما فازوا، حسب السياق." },
    verdict: "COULD HAVE تحتمل احتمالًا في الماضي أو فرصة ضائعة؛ السياق وحده يحدد أيهما.",
    tone: "opportunity" as Tone49,
  },
  {
    id: "t6",
    present: { en: "He must go.", ar: "يجب عليه أن يذهب." },
    past: { en: "He must have gone.", ar: "لا بد أنه ذهب." },
    verdict: "الإلزام ليس هو الاستنتاج. ترتيب الكلمات بعد MUST يحدد الوظيفة: V1 للإلزام، HAVE + V3 للاستنتاج.",
    tone: "deduction" as Tone49,
  },
] as const;

/* ============================================================
   القاعدة الأساسية
   ============================================================ */

export const V1_V2_V3_49 = [
  { v1: "go", v2: "went", v3: "gone" },
  { v1: "eat", v2: "ate", v3: "eaten" },
  { v1: "see", v2: "saw", v3: "seen" },
  { v1: "write", v2: "wrote", v3: "written" },
  { v1: "forget", v2: "forgot", v3: "forgotten" },
  { v1: "do", v2: "did", v3: "done" },
  { v1: "take", v2: "took", v3: "taken" },
  { v1: "finish", v2: "finished", v3: "finished" },
  { v1: "study", v2: "studied", v3: "studied" },
  { v1: "leave", v2: "left", v3: "left" },
] as const;

export const RULE_PARTS_49 = [
  { tag: "01 · MODAL", title: "الفعل الناقص", body: "يحدد موقف المتحدث: استنتاج، احتمال، ندم، نصيحة، فرصة، أو نتيجة افتراضية.", example: "must · might · should · could" },
  { tag: "02 · HAVE", title: "HAVE بصيغتها الأساسية", body: "بعد الفعل الناقص نستخدم HAVE دائمًا، وليس HAS أو HAD، حتى مع He وShe وIt.", example: "have" },
  { tag: "03 · V3", title: "التصريف الثالث", body: "بعد HAVE يأتي الفعل في تصريفه الثالث، وليس الأول ولا الثاني.", example: "gone · eaten · seen" },
] as const;

export const MUST_HAVE_EVIDENCE_49 = [
  {
    id: "e1",
    clue: "The ground is wet this morning.",
    clueAr: "الأرض مبللة هذا الصباح.",
    options: [
      { id: "must", label: "It must have rained.", note: "استنتاج قوي من دليل مباشر" },
      { id: "might", label: "It might have rained.", note: "احتمال أضعف" },
      { id: "couldnt", label: "It couldn't have rained.", note: "استنتاج بالنفي" },
    ],
    correct: "must",
    why: "الأرض المبللة دليل واضح، ونعرف أن المطر يجعل الأرض مبللة؛ لذلك نستنتج بدرجة قوية: It must have rained. لا نقطع قطعية مطلقة، لكنها أعلى درجات الاستنتاج في هذا التركيب.",
    strength: 3,
    tone: "deduction" as Tone49,
  },
  {
    id: "e2",
    clue: "Ali is very tired today.",
    clueAr: "علي متعب جدًا اليوم.",
    options: [
      { id: "must", label: "He must have worked all night.", note: "استنتاج قوي" },
      { id: "might", label: "He might have worked all night.", note: "احتمال مفتوح" },
      { id: "couldnt", label: "He couldn't have worked all night.", note: "استنتاج بأنه مستحيل" },
    ],
    correct: "must",
    why: "التعب الشديد مؤشر قوي على السهر أو العمل الطويل، وليس دليلًا قاطعًا؛ ومع ذلك MUST HAVE هي الاستنتاج القوي المناسب، وMIGHT HAVE تبقى احتمالًا أضعف إذا أردنا التحفّظ.",
    strength: 3,
    tone: "deduction" as Tone49,
  },
  {
    id: "e3",
    clue: "The door is open, and nobody is inside.",
    clueAr: "الباب مفتوح، ولا أحد في الداخل.",
    options: [
      { id: "must", label: "Someone must have forgotten to close it.", note: "استنتاج قوي" },
      { id: "might", label: "Someone might have forgotten to close it.", note: "احتمال" },
      { id: "couldnt", label: "Someone couldn't have opened it.", note: "استنتاج مستحيل" },
    ],
    correct: "must",
    why: "الباب المفتوح مع خلو المكان يدفعنا إلى استنتاج قوي أن أحدًا نسيه مفتوحًا. لو كان هناك تفسير آخر واضح لاخترنا MIGHT HAVE، لكن الدليل هنا يرجّح MUST HAVE.",
    strength: 3,
    tone: "deduction" as Tone49,
  },
  {
    id: "e4",
    clue: "Her car is still in the garage, and the lights are off.",
    clueAr: "سيارتها ما زالت في المرآب، والأنوار مطفأة.",
    options: [
      { id: "must", label: "She must have gone out.", note: "استنتاج قوي" },
      { id: "might", label: "She might have gone out.", note: "احتمال" },
      { id: "couldnt", label: "She couldn't have gone out.", note: "استنتاج بالنفي" },
    ],
    correct: "couldnt",
    why: "وجود السيارة في المرآب والأنوار مطفأة يجعل خروجها بالسيارة غير ممكن؛ لذلك COULDN'T HAVE هي الأنسب. هذا استنتاج سلبي قوي عن الماضي، وليس مجرد احتمال.",
    strength: 3,
    tone: "impossible" as Tone49,
  },
  {
    id: "e5",
    clue: "The phone is ringing, but Sara is in the shower.",
    clueAr: "الهاتف يرن، لكن سارة في الحمام.",
    options: [
      { id: "must", label: "She must have answered it.", note: "استنتاج قوي" },
      { id: "might", label: "She might have answered it.", note: "احتمال" },
      { id: "couldnt", label: "She couldn't have answered it.", note: "استنتاج بأنه غير ممكن" },
    ],
    correct: "couldnt",
    why: "وجودها في الحمام في لحظة الرنين يجعل إجابتها غير ممكنة. لاحظ أن COULDN'T HAVE هنا ليست نفيًا لفعل مؤكد، بل استنتاج قوي باستحالة حدوثه.",
    strength: 3,
    tone: "impossible" as Tone49,
  },
] as const;

/* ============================================================
   خريطة المعاني — عشرة تراكيب
   ============================================================ */

export type MeaningCard49 = {
  id: string;
  form: string;
  tone: Tone49;
  glyph: string;
  arName: string;
  fn: string;
  arMeaning: string;
  exampleEn: string;
  exampleAr: string;
  clue: string;
  difference: string;
};

export const MEANINGS_49: readonly MeaningCard49[] = [
  {
    id: "must",
    form: "MUST HAVE + V3",
    tone: "deduction",
    glyph: "◆",
    arName: "استنتاج قوي",
    fn: "STRONG DEDUCTION ABOUT THE PAST",
    arMeaning: "لا بد أنه… / من المؤكد على الأرجح أنه…",
    exampleEn: "The ground is wet. It must have rained.",
    exampleAr: "الأرض مبللة. لا بد أن المطر قد هطل.",
    clue: "دليل مرئي أو معلومة قوية تجعل الحدث التفسير الأرجح.",
    difference: "أقوى من MIGHT HAVE، وأضعف من القطع المطلق. تختلف عن MUST + V1 التي تعني الإلزام.",
  },
  {
    id: "may",
    form: "MAY HAVE + V3",
    tone: "possibility",
    glyph: "◌",
    arName: "احتمال في الماضي",
    fn: "POSSIBILITY IN THE PAST",
    arMeaning: "ربما / قد يكون…",
    exampleEn: "She may have missed the bus.",
    exampleAr: "ربما فاتتها الحافلة.",
    clue: "المتحدث لا يعرف الحقيقة ويطرح احتمالًا.",
    difference: "قريبة جدًا من MIGHT HAVE. MIGHT قد تُظهر تحفظًا أكبر في بعض السياقات، لكن لا قاعدة قطعية ولا نسب ثابتة.",
  },
  {
    id: "might",
    form: "MIGHT HAVE + V3",
    tone: "possibility",
    glyph: "◌",
    arName: "احتمال في الماضي",
    fn: "POSSIBILITY IN THE PAST",
    arMeaning: "ربما…",
    exampleEn: "I might have left my phone at school.",
    exampleAr: "ربما تركت هاتفي في المدرسة.",
    clue: "احتمال غير مؤكد، وغالبًا دون دليل حاسم.",
    difference: "لا تعني أن الحدث وقع. قد تكون أكثر تحفظًا من MAY HAVE في بعض السياقات، دون نسبة مئوية.",
  },
  {
    id: "could",
    form: "COULD HAVE + V3",
    tone: "opportunity",
    glyph: "⤫",
    arName: "احتمال أو فرصة ضائعة",
    fn: "PAST POSSIBILITY / UNUSED OPPORTUNITY",
    arMeaning: "كان بإمكانه… / ربما…",
    exampleEn: "I could have won the race, but I stopped running.",
    exampleAr: "كان بإمكاني الفوز بالسباق، لكنني توقفت عن الجري.",
    clue: "السياق يحدد: تفسير محتمل، أم قدرة كانت متاحة ولم تُستغل.",
    difference: "COULD HAVE = كانت لديك إمكانية. SHOULD HAVE = كان ينبغي أن تفعل. قد يحمل COULD HAVE نبرة عتاب عند وضوح الفرصة الضائعة.",
  },
  {
    id: "couldnt",
    form: "COULDN'T HAVE + V3",
    tone: "impossible",
    glyph: "✕",
    arName: "استنتاج بأنه غير ممكن",
    fn: "NEGATIVE DEDUCTION ABOUT THE PAST",
    arMeaning: "لا يمكن أنه… / لم يكن ممكنًا أن…",
    exampleEn: "He couldn't have stolen the money. He was abroad.",
    exampleAr: "لا يمكن أنه سرق المال. لقد كان خارج البلاد.",
    clue: "دليل يمنع حدوث الفعل أصلًا.",
    difference: "تختلف عن COULDN'T DO التي تعني عدم القدرة في الماضي. هنا نتحدث عن استنتاج يخص حدثًا ماضيًا محتملًا.",
  },
  {
    id: "should",
    form: "SHOULD HAVE + V3",
    tone: "regret",
    glyph: "↩",
    arName: "ندم / نصيحة لم تُنفّذ",
    fn: "REGRET / UNFULFILLED ADVICE",
    arMeaning: "كان ينبغي أن…",
    exampleEn: "You should have studied harder.",
    exampleAr: "كان ينبغي أن تدرس بجدية أكبر.",
    clue: "الفعل لم يحدث، والمتحدث يعتقد أنه كان الأفضل.",
    difference: "تختلف عن SHOULD + V1 التي تنصح بشأن الحاضر أو المستقبل.",
  },
  {
    id: "shouldnt",
    form: "SHOULDN'T HAVE + V3",
    tone: "regret",
    glyph: "↩",
    arName: "انتقاد فعل وقع",
    fn: "CRITICISM OF AN ACTION THAT HAPPENED",
    arMeaning: "لم يكن ينبغي أن…",
    exampleEn: "I shouldn't have eaten so much.",
    exampleAr: "لم يكن ينبغي أن آكل كل هذه الكمية.",
    clue: "الفعل وقع بالفعل، والمتحدث يندم عليه.",
    difference: "عكس SHOULD HAVE في اتجاه الحدث: الأولى تُقرّ بوقوع الفعل، والثانية تفترض عدم وقوعه.",
  },
  {
    id: "ought",
    form: "OUGHT TO HAVE + V3",
    tone: "regret",
    glyph: "↩",
    arName: "واجب أو نصيحة لم تتحقق",
    fn: "UNFULFILLED DUTY / ADVICE",
    arMeaning: "كان ينبغي أن…",
    exampleEn: "He ought to have apologized.",
    exampleAr: "كان ينبغي أن يعتذر.",
    clue: "واجب أخلاقي أو نصيحة لم تُنفّذ.",
    difference: "المعنى قريب جدًا من SHOULD HAVE، لكن SHOULD أكثر شيوعًا في المحادثات اليومية.",
  },
  {
    id: "neednt",
    form: "NEEDN'T HAVE + V3",
    tone: "unnecessary",
    glyph: "⌁",
    arName: "فعل وقع دون ضرورة",
    fn: "UNNECESSARY ACTION THAT HAPPENED",
    arMeaning: "لم يكن من الضروري أن… / ما كان عليك أن…",
    exampleEn: "You needn't have bought bread. We already had plenty.",
    exampleAr: "لم يكن عليك شراء الخبز. كان لدينا الكثير بالفعل.",
    clue: "الفعل حدث بالفعل، ثم اتضح أنه لم يكن ضروريًا.",
    difference: "DIDN'T NEED TO + V1 لا تؤكد وحدها أن الفعل حدث. NEEDN'T HAVE تؤكد وقوعه في المعنى المقصود.",
  },
  {
    id: "would",
    form: "WOULD HAVE + V3",
    tone: "hypothetical",
    glyph: "⇢",
    arName: "نتيجة افتراضية لم تحدث",
    fn: "HYPOTHETICAL PAST RESULT",
    arMeaning: "كان سيـ…",
    exampleEn: "I would have helped you if I had known.",
    exampleAr: "كنت سأساعدك لو كنت قد عرفت.",
    clue: "شرط في الماضي لم يتحقق، فلم تحدث النتيجة.",
    difference: "تمهيد للشرط الثالث في الدرس 54. لا تخلطها بـ WOULD + V1 للافتراض في الحاضر.",
  },
] as const;

export const CONTRASTS_49 = [
  {
    id: "must-vs-might",
    title: "MUST HAVE مقابل MIGHT HAVE",
    en: "MUST HAVE / MIGHT HAVE",
    axis: "درجة قوة الاستنتاج",
    tone: "deduction" as Tone49,
    sides: [
      {
        modal: "MUST HAVE",
        sentence: "He must have forgotten.",
        ar: "لا بد أنه نسي.",
        meaning: "استنتاج قوي مبني على مؤشرات.",
        caution: "قوية لكنها ليست يقينًا رياضيًا.",
      },
      {
        modal: "MIGHT HAVE",
        sentence: "He might have forgotten.",
        ar: "ربما نسي.",
        meaning: "احتمال مطروح دون تأكيد قوي.",
        caution: "لا تحوّل التحفظ إلى نسبة مئوية ثابتة.",
      },
    ],
  },
  {
    id: "could-vs-should",
    title: "COULD HAVE مقابل SHOULD HAVE",
    en: "COULD HAVE / SHOULD HAVE",
    axis: "إمكانية أم واجب؟",
    tone: "opportunity" as Tone49,
    sides: [
      {
        modal: "COULD HAVE",
        sentence: "You could have called me.",
        ar: "كان بإمكانك الاتصال بي.",
        meaning: "كانت لديك إمكانية أو فرصة.",
        caution: "قد تحمل عتابًا عندما تكون الفرصة واضحة، لكنها ليست واجبًا.",
      },
      {
        modal: "SHOULD HAVE",
        sentence: "You should have called me.",
        ar: "كان ينبغي أن تتصل بي.",
        meaning: "كان من المفترض أن تفعل ذلك.",
        caution: "اللوم هنا أخلاقي/نصحي، لا مجرد إمكانية.",
      },
    ],
  },
  {
    id: "should-vs-shouldnt",
    title: "SHOULD HAVE مقابل SHOULDN'T HAVE",
    en: "SHOULD HAVE / SHOULDN'T HAVE",
    axis: "لم يحدث أم حدث خطأ؟",
    tone: "regret" as Tone49,
    sides: [
      {
        modal: "SHOULD HAVE",
        sentence: "You should have called.",
        ar: "لم تتصل، وكان ينبغي أن تتصل.",
        meaning: "الفعل لم يحدث، وكان الأفضل حدوثه.",
        caution: "لا تقل إنه اتصل؛ النفي الضمني جزء من المعنى.",
      },
      {
        modal: "SHOULDN'T HAVE",
        sentence: "You shouldn't have called.",
        ar: "اتصلت، لكن لم يكن ينبغي أن تتصل.",
        meaning: "الفعل وقع بالفعل، والمتحدث يرى أنه كان خطأ.",
        caution: "NOT هنا ليست تفصيلًا صغيرًا؛ إنها تقلب الحدث.",
      },
    ],
  },
  {
    id: "neednt-vs-didnt",
    title: "NEEDN'T HAVE مقابل DIDN'T NEED TO",
    en: "NEEDN'T HAVE / DIDN'T NEED TO",
    axis: "هل وقع الفعل؟",
    tone: "unnecessary" as Tone49,
    sides: [
      {
        modal: "NEEDN'T HAVE",
        sentence: "I needn't have taken a taxi.",
        ar: "لم يكن من الضروري أن أستقل سيارة أجرة.",
        meaning: "المعنى المقصود: استقللت سيارة أجرة، لكنني لم أكن بحاجة إليها.",
        caution: "الفعل وقع بالفعل.",
      },
      {
        modal: "DIDN'T NEED TO",
        sentence: "I didn't need to take a taxi.",
        ar: "لم أكن بحاجة إلى استقلال سيارة أجرة.",
        meaning: "لم تكن هناك حاجة، والجملة وحدها لا تحدد هل استقللت السيارة أم لا.",
        caution: "السياق وحده يحسم وقوع الفعل.",
      },
    ],
  },
  {
    id: "modal-vs-past-perfect",
    title: "MODAL PERFECT مقابل PAST PERFECT",
    en: "MODAL + HAVE + V3 / HAD + V3",
    axis: "موقف المتحدث أم ترتيب الأحداث؟",
    tone: "review" as Tone49,
    sides: [
      {
        modal: "MODAL + HAVE + V3",
        sentence: "She might have left.",
        ar: "ربما تكون قد غادرت.",
        meaning: "موقف المتحدث من حدث ماضٍ: احتمال، استنتاج، ندم…",
        caution: "لا تحدد بالضرورة ترتيب حدثين.",
      },
      {
        modal: "HAD + V3",
        sentence: "She had left before I arrived.",
        ar: "كانت قد غادرت قبل أن أصل.",
        meaning: "حدث وقع قبل حدث آخر في الماضي.",
        caution: "ترتيب الأحداث هو الوظيفة الأساسية.",
      },
    ],
  },
  {
    id: "must-have-vs-must",
    title: "MUST HAVE مقابل MUST",
    en: "MUST HAVE + V3 / MUST + V1",
    axis: "استنتاج أم إلزام؟",
    tone: "deduction" as Tone49,
    sides: [
      {
        modal: "MUST HAVE",
        sentence: "He must have gone.",
        ar: "لا بد أنه ذهب.",
        meaning: "استنتاج قوي عن الماضي.",
        caution: "لا تعني أنه ملزم بالذهاب.",
      },
      {
        modal: "MUST",
        sentence: "He must go.",
        ar: "يجب عليه أن يذهب.",
        meaning: "إلزام في الحاضر.",
        caution: "لا تتحدث عن الماضي أصلًا.",
      },
    ],
  },
] as const;

/* ============================================================
   الأخطاء الستة
   ============================================================ */

export const ERRORS_49 = [
  {
    n: "①",
    title: "HAS بدل HAVE",
    bad: "He must has left.",
    good: "He must have left.",
    why: "بعد الأفعال الناقصة يأتي HAVE بصيغتها الأساسية دائمًا، حتى مع He وShe وIt.",
    tone: "deduction" as Tone49,
  },
  {
    n: "②",
    title: "HAD بدل HAVE",
    bad: "She might had forgotten.",
    good: "She might have forgotten.",
    why: "MIGHT يتبعها HAVE لا HAD. HAD تخصّ Past Perfect أو الزمن الماضي العادي.",
    tone: "possibility" as Tone49,
  },
  {
    n: "③",
    title: "V2 بدل V3",
    bad: "You should have went.",
    good: "You should have gone.",
    why: "بعد HAVE نستخدم التصريف الثالث: go – went – gone. went هي V2 وليست V3.",
    tone: "regret" as Tone49,
  },
  {
    n: "④",
    title: "SHOULD HAVE مقابل SHOULD",
    bad: "You should study yesterday. (للماضي)",
    good: "You should have studied yesterday.",
    why: "SHOULD + V1 نصيحة عن الحاضر أو المستقبل. للحديث عن الماضي نحتاج SHOULD HAVE + V3.",
    tone: "regret" as Tone49,
  },
  {
    n: "⑤",
    title: "NEEDN'T HAVE مقابل DIDN'T NEED TO",
    bad: "I needn't have bought it = لم أكن بحاجة إليه فقط.",
    good: "I needn't have bought it = اشتريته، لكنه لم يكن ضروريًا.",
    why: "NEEDN'T HAVE تفيد أن الفعل وقع بالفعل. DIDN'T NEED TO لا تحسم وحدها هل وقع الفعل.",
    tone: "unnecessary" as Tone49,
  },
  {
    n: "⑥",
    title: "MUST HAVE ليست إلزامًا",
    good: "You must have finished the work. = لا بد أنك أنهيت العمل.",
    bad: "You must finish the work. = يجب عليك إنهاء العمل.",
    why: "MUST HAVE استنتاج عن الماضي، وMUST إلزام في الحاضر. الخلط بينهما يغيّر الرسالة تمامًا.",
    tone: "deduction" as Tone49,
  },
] as const;

export const PAST_PERFECT_ROWS_49 = [
  { label: "التركيب", cells: ["HAD + V3", "MODAL + HAVE + V3"] },
  { label: "الوظيفة", cells: ["ترتيب حدثين في الماضي", "موقف المتحدث من حدث ماضٍ"] },
  { label: "المثال", cells: ["He had forgotten.", "He might have forgotten."] },
  { label: "المعنى", cells: ["كان قد نسي.", "ربما نسي."] },
  { label: "السؤال", cells: ["Had he forgotten?", "Might he have forgotten?"] },
] as const;

export const NEGATION_EXAMPLES_49 = [
  { en: "She might not have understood.", ar: "ربما لم تفهم.", tone: "possibility" as Tone49 },
  { en: "He may not have received the message.", ar: "قد لا يكون قد استلم الرسالة.", tone: "possibility" as Tone49 },
  { en: "You should not have shouted.", ar: "لم يكن ينبغي لك أن تصرخ.", tone: "regret" as Tone49 },
  { en: "They could not have known.", ar: "لم يكن ممكنًا أن يعرفوا.", tone: "impossible" as Tone49 },
  { en: "I would not have agreed.", ar: "ما كنت لأوافق.", tone: "hypothetical" as Tone49 },
] as const;

export const QUESTION_EXAMPLES_49 = [
  { en: "Could he have forgotten?", ar: "هل من الممكن أنه نسي؟" },
  { en: "Might she have taken the wrong train?", ar: "هل من المحتمل أنها استقلت القطار الخطأ؟" },
  { en: "Should I have called you?", ar: "هل كان ينبغي أن أتصل بك؟" },
  { en: "Would they have helped us?", ar: "هل كانوا سيساعدوننا؟" },
] as const;

export const SHORT_ANSWERS_49 = [
  { q: "Could he have forgotten?", yes: "Yes, he could have.", no: "No, he couldn't have." },
  { q: "Should I have told him?", yes: "Yes, you should have.", no: "No, you shouldn't have." },
] as const;

/* ============================================================
   الحوار
   ============================================================ */

export type Dialogue49 = {
  title: string;
  setting: string;
  tone: Tone49;
  turns: readonly { speaker: string; en: string; ar: string; fn?: string }[];
  analysis: readonly { modal: string; ar: string; fn: string }[];
  labId: string;
  labPrompt: string;
};

export const DIALOGUE_49: Dialogue49 = {
  title: "WHAT HAPPENED YESTERDAY?",
  setting: "Adam وMaya ينتظران Daniel في موعد جماعي، ويحاولان تفسير تأخره.",
  tone: "possibility",
  turns: [
    { speaker: "Adam", en: "Where is Daniel? He was supposed to be here an hour ago.", ar: "أين دانيال؟ كان من المفترض أن يكون هنا منذ ساعة." },
    { speaker: "Maya", en: "He might have missed the bus.", ar: "ربما فاتته الحافلة.", fn: "احتمال في الماضي" },
    { speaker: "Adam", en: "He must have left home late.", ar: "لا بد أنه غادر المنزل متأخرًا.", fn: "استنتاج قوي" },
    { speaker: "Maya", en: "Maybe. But he could have taken a taxi.", ar: "ربما. لكنه كان يستطيع أن يستقل سيارة أجرة.", fn: "فرصة كانت متاحة" },
    { speaker: "Adam", en: "He should have called us.", ar: "كان ينبغي أن يتصل بنا.", fn: "لوم ونصيحة متأخرة" },
    { speaker: "Maya", en: "Yes, he shouldn't have left us waiting without a message.", ar: "نعم، لم يكن ينبغي أن يتركنا ننتظر دون رسالة.", fn: "انتقاد فعل وقع" },
    { speaker: "Adam", en: "Perhaps his phone battery died.", ar: "ربما نفدت بطارية هاتفه.", fn: "احتمال" },
    { speaker: "Maya", en: "That could have happened. Let's wait a little longer.", ar: "هذا احتمال وارد. دعنا ننتظر قليلًا.", fn: "احتمال في الماضي" },
    { speaker: "Daniel", en: "Sorry I'm late! I must have left my phone at home this morning.", ar: "آسف على التأخير! لا بد أنني تركت هاتفي في المنزل هذا الصباح.", fn: "استنتاج قوي" },
    { speaker: "Maya", en: "So we needn't have worried so much.", ar: "إذن لم يكن من الضروري أن نقلق كل هذا القلق.", fn: "عدم ضرورة" },
    { speaker: "Adam", en: "You should have borrowed a phone and messaged us.", ar: "كان ينبغي أن تستعير هاتفًا وترسل لنا رسالة.", fn: "لوم ونصيحة متأخرة" },
    { speaker: "Daniel", en: "I couldn't have known that the bus would break down.", ar: "لم يكن ممكنًا أن أعرف أن الحافلة ستتعطل.", fn: "استنتاج بأنه غير ممكن" },
    { speaker: "Daniel", en: "I would have called you if I had found another phone.", ar: "كنت سأتصل بك لو وجدت هاتفًا آخر.", fn: "نتيجة افتراضية" },
    { speaker: "Maya", en: "You ought to have told us before you left home.", ar: "كان ينبغي عليك أن تخبرنا قبل أن تغادر المنزل.", fn: "واجب لم يتحقق" },
  ],
  analysis: [
    { modal: "might have missed", ar: "احتمال في الماضي", fn: "POSSIBILITY" },
    { modal: "must have left", ar: "استنتاج قوي", fn: "DEDUCTION" },
    { modal: "could have taken", ar: "فرصة أو إمكانية كانت متاحة", fn: "OPPORTUNITY" },
    { modal: "should have called", ar: "كان ينبغي أن يتصل", fn: "REGRET / CRITICISM" },
    { modal: "needn't have worried", ar: "فعل وقع دون ضرورة", fn: "UNNECESSARY" },
    { modal: "would have called", ar: "نتيجة افتراضية لم تحدث", fn: "HYPOTHETICAL" },
  ],
  labId: "dialogue",
  labPrompt: "حدد وظيفة كل تركيب في الحوار، ثم أجب عن أسئلة الفهم.",
};

/* ============================================================
   القراءة: The Missing Project
   ============================================================ */

export const READING_49 = [
  {
    en: "Yesterday, Sarah couldn't find her science project. She had worked on it for two weeks, and she was very worried.",
    ar: "أمس، لم تستطع سارة العثور على مشروع العلوم الخاص بها. كانت قد عملت عليه لمدة أسبوعين، وكانت قلقة جدًا.",
  },
  {
    en: "She thought she might have left it in the school library. Her brother said that she could have forgotten it in the classroom.",
    ar: "اعتقدت أنها ربما تركته في مكتبة المدرسة. وقال أخوها إنها ربما نسيته في الفصل.",
  },
  {
    en: "Their mother looked at the kitchen table and said, \"You must have taken it out of your bag when you came home.\"",
    ar: "نظرت والدتهما إلى طاولة المطبخ وقالت: «لا بد أنك أخرجته من حقيبتك عندما عدت إلى المنزل».",
  },
  {
    en: "Sarah suddenly remembered that she had shown the project to her friend Emma. She might have left it at Emma's house.",
    ar: "تذكرت سارة فجأة أنها عرضت المشروع على صديقتها إيما. وربما تركته في منزل إيما.",
  },
  {
    en: "Sarah called Emma immediately. Emma answered, \"Yes! Your project is here. You must have forgotten it when you visited me.\"",
    ar: "اتصلت سارة بإيما فورًا. أجابت إيما: «نعم! مشروعك هنا. لا بد أنك نسيته عندما زرتني».",
  },
  {
    en: "Sarah felt relieved. She said, \"I should have checked with you earlier. I needn't have worried so much!\"",
    ar: "شعرت سارة بالارتياح وقالت: «كان ينبغي أن أتأكد منك في وقت أبكر. لم يكن من الضروري أن أقلق بهذا القدر!»",
  },
] as const;

export const READING_QUESTIONS_49 = [
  {
    q: "Where did Sarah think she might have left her project?",
    answer: "She thought she might have left it in the school library.",
    ar: "اعتقدت أنها ربما تركته في مكتبة المدرسة.",
  },
  {
    q: "What did her brother think she could have done?",
    answer: "He thought she could have forgotten it in the classroom.",
    ar: "ظن أنها ربما نسيته في الفصل.",
  },
  {
    q: "What did her mother conclude?",
    answer: "Her mother concluded that Sarah must have taken it out of her bag.",
    ar: "استنتجت والدتها أنها لا بد أن تكون قد أخرجته من حقيبتها.",
  },
  {
    q: "Where had Sarah shown the project?",
    answer: "She had shown the project to her friend Emma.",
    ar: "عرضت المشروع على صديقتها إيما.",
  },
  {
    q: "What did Emma say Sarah must have done?",
    answer: "Emma said Sarah must have forgotten it at her house.",
    ar: "قالت إيما إن سارة لا بد أنها نسيته في منزلها.",
  },
  {
    q: "Why did Sarah say she needn't have worried?",
    answer: "Because she eventually discovered where the project was.",
    ar: "لأنها اكتشفت في النهاية مكان المشروع، فلم يكن القلق ضروريًا.",
  },
] as const;

export type Challenge49 = {
  id: string;
  q: string;
  options: readonly string[];
  correct: number;
  why: string;
};

export const READING_CHALLENGE_49: readonly Challenge49[] = [
  {
    id: "c1",
    q: "ما الحدث الذي سبق قلق سارة، واستُخدم معه HAD + V3؟",
    options: [
      "أنها عملت على المشروع أسبوعين قبل أن تفقده.",
      "أنها اتصلت بإيما قبل أن تفقده.",
      "أنها أخرجت المشروع من حقيبتها في المطبخ.",
    ],
    correct: 0,
    why: "«She had worked on it for two weeks» تسبق فقدان المشروع؛ لذلك استُخدم Past Perfect لترتيب الأحداث.",
  },
  {
    id: "c2",
    q: "أي جملة تحمل أقوى استنتاج في النص؟",
    options: [
      "She might have left it at Emma's house.",
      "You must have taken it out of your bag.",
      "She could have forgotten it in the classroom.",
    ],
    correct: 1,
    why: "MUST HAVE + V3 هي أقوى استنتاج. أما MIGHT/COULD HAVE فهما احتمالان.",
  },
  {
    id: "c3",
    q: "لماذا لم يكن اكتشاف مكان المشروع عند إيما متوقعًا من البداية؟",
    options: [
      "لأن سارة لم تزر إيما أبدًا.",
      "لأن سارة نسيت أنها عرضت المشروع على إيما، ولم تتذكر إلا لاحقًا.",
      "لأن إيما كانت خارج البلاد.",
    ],
    correct: 1,
    why: "النص يقول إنها تذكرت فجأة أنها عرضت المشروع على إيما؛ فالدليل لم يكن حاضرًا في ذهنها في البداية.",
  },
  {
    id: "c4",
    q: "ما وظيفة SHOULD HAVE في آخر جملة لسارة؟",
    options: [
      "احتمال في الماضي.",
      "ندم على أنها لم تتأكد مبكرًا.",
      "استنتاج بأنها كانت تعرف مكان المشروع.",
    ],
    correct: 1,
    why: "«I should have checked with you earlier» ندم على فعل لم يحدث: كان ينبغي أن تتأكد مبكرًا.",
  },
  {
    id: "c5",
    q: "ماذا يعبّر NEEDN'T HAVE في «I needn't have worried so much»؟",
    options: [
      "أنها لم تقلق أبدًا.",
      "أنها قلقت بالفعل، لكن القلق لم يكن ضروريًا.",
      "أنها كانت ممنوعة من القلق.",
    ],
    correct: 1,
    why: "NEEDN'T HAVE تفيد أن الفعل وقع (قلقت) لكنه لم يكن ضروريًا. لو قيل didn't need to worry لكانت الجملة وحدها لا تحسم وقوع القلق.",
  },
] as const;

/* ============================================================
   الخلاصة والمقارنات والتقدم
   ============================================================ */

export const SUMMARY_49 = [
  { tone: "deduction" as Tone49, form: "MUST HAVE + V3", ar: "استنتاج قوي عن الماضي", ex: "He must have forgotten.", glyph: "◆" },
  { tone: "possibility" as Tone49, form: "MAY HAVE + V3", ar: "احتمال في الماضي", ex: "She may have left early.", glyph: "◌" },
  { tone: "possibility" as Tone49, form: "MIGHT HAVE + V3", ar: "احتمال في الماضي", ex: "She might have left early.", glyph: "◌" },
  { tone: "opportunity" as Tone49, form: "COULD HAVE + V3", ar: "احتمال أو فرصة ضائعة", ex: "I could have won.", glyph: "⤫" },
  { tone: "impossible" as Tone49, form: "COULDN'T HAVE + V3", ar: "استنتاج بأنه غير ممكن", ex: "He couldn't have known.", glyph: "✕" },
  { tone: "regret" as Tone49, form: "SHOULD HAVE + V3", ar: "شيء كان ينبغي فعله ولم يحدث", ex: "You should have studied.", glyph: "↩" },
  { tone: "regret" as Tone49, form: "SHOULDN'T HAVE + V3", ar: "فعل حدث ولم يكن ينبغي", ex: "I shouldn't have said that.", glyph: "↩" },
  { tone: "regret" as Tone49, form: "OUGHT TO HAVE + V3", ar: "نصيحة أو واجب لم يتحقق", ex: "You ought to have apologized.", glyph: "↩" },
  { tone: "unnecessary" as Tone49, form: "NEEDN'T HAVE + V3", ar: "فعل حدث دون ضرورة", ex: "You needn't have bought it.", glyph: "⌁" },
  { tone: "hypothetical" as Tone49, form: "WOULD HAVE + V3", ar: "نتيجة افتراضية في الماضي", ex: "I would have helped you.", glyph: "⇢" },
] as const;

export const SIX_COMPARISONS_49 = [
  { n: "①", en: "MUST HAVE ≠ MIGHT HAVE", ar: "استنتاج قوي ليس احتمالًا." },
  { n: "②", en: "COULD HAVE ≠ SHOULD HAVE", ar: "إمكانية كانت متاحة ليست واجبًا." },
  { n: "③", en: "SHOULD HAVE ≠ SHOULDN'T HAVE", ar: "الأولى: لم يحدث. الثانية: حدث خطأ." },
  { n: "④", en: "NEEDN'T HAVE ≠ DIDN'T NEED TO", ar: "الأولى تؤكد وقوع الفعل، والثانية لا تحسم." },
  { n: "⑤", en: "MODAL + HAVE + V3 ≠ HAD + V3", ar: "موقف المتحدث ليس ترتيب الأحداث." },
  { n: "⑥", en: "MUST HAVE ≠ MUST", ar: "استنتاج عن الماضي ليس إلزامًا في الحاضر." },
] as const;

export const PHASE_THREE_49 = [
  { n: "01", en: "PHASE 03", ar: "بداية المرحلة الثالثة: القواعد المتوسطة والمتقدمة." },
  { n: "02", en: "MODAL PERFECT", ar: "أول دروس التحليل الماضي: الاستنتاج والاحتمال والندم." },
  { n: "03", en: "NEXT 50", ar: "DEDUCTION & SPECULATION عن الحاضر والماضي." },
  { n: "04", en: "THEN 54", ar: "Third Conditional سيُبنى على WOULD HAVE + V3." },
] as const;

/* ============================================================
   الشرائح
   ============================================================ */

export const SLIDES_49: readonly Slide49[] = [
  {
    id: "cover",
    station: "opening",
    kind: "cover",
    mascot: "🗂️",
    tone: "review",
    title: "الأفعال الناقصة مع HAVE + V3",
    lead: "من الحاضر إلى الماضي: استنتاج، احتمال، ندم، فرص ضائعة، ونتائج افتراضية.",
  },
  {
    id: "goals",
    station: "opening",
    kind: "goals",
    mascot: "🎯",
    tone: "review",
    title: "ماذا تتقن بنهاية الدرس؟",
    lead: "اثنا عشر هدفًا تحوّل معرفتك بالأفعال الناقصة إلى قدرة على تحليل الماضي.",
  },
  {
    id: "stage-three",
    station: "opening",
    kind: "stage",
    mascot: "🚪",
    tone: "review",
    title: "بداية المرحلة الثالثة",
    lead: "الدرس 49 من 120 — تبدأ المرحلة الثالثة: القواعد المتوسطة والمتقدمة.",
  },
  {
    id: "timeline-lab",
    station: "opening",
    kind: "timeline",
    mascot: "🕰️",
    tone: "possibility",
    title: "Modal Perfect Timeline",
    lead: "لكل زوج جملة: حدد أي معنى يتعلق بالحاضر/المستقبل وأي معنى يتعلق بالماضي.",
  },
  {
    id: "six-functions",
    station: "opening",
    kind: "lesson",
    mascot: "🧭",
    tone: "review",
    title: "وظائف Modal Perfect الست",
    lead: "التركيب واحد، لكن الوظيفة تتغير بحسب الفعل الناقص والسياق. هذه هي الوظائف التي سنبنيها محطة بعد محطة.",
    examples: [
      { en: "He must have forgotten.", ar: "لا بد أنه نسي.", tag: "DEDUCTION", tone: "deduction" },
      { en: "She might have left.", ar: "ربما غادرت.", tag: "POSSIBILITY", tone: "possibility" },
      { en: "You should have studied.", ar: "كان ينبغي أن تدرس.", tag: "REGRET", tone: "regret" },
      { en: "We could have won.", ar: "كان بإمكاننا الفوز.", tag: "MISSED OPPORTUNITY", tone: "opportunity" },
      { en: "You needn't have bought it.", ar: "لم يكن من الضروري أن تشتريه.", tag: "UNNECESSARY", tone: "unnecessary" },
      { en: "I would have helped you.", ar: "كنت سأساعدك لو عرفت.", tag: "HYPOTHETICAL", tone: "hypothetical" },
    ],
    note: "Modal Perfect لا يعني بالضرورة أن الحدث وقع. She might have called لا تثبت أنها اتصلت، بل تجعل الاتصال احتمالًا واردًا.",
    tip: "اسأل أولًا: ما وظيفة المتحدث؟ استنتاج، احتمال، ندم، فرصة، عدم ضرورة، أم نتيجة افتراضية؟",
  },
  {
    id: "core-formula",
    station: "core-rule",
    kind: "lesson",
    mascot: "🧩",
    tone: "review",
    title: "القاعدة الأساسية: Modal + HAVE + V3",
    lead: "ثلاثة أجزاء فقط، لكن كل جزء يحمل وظيفة. لاحظ أن HAVE هنا بصيغتها الأساسية دائمًا.",
    formula: ["MODAL + HAVE + V3", "must have forgotten", "might have arrived", "could have won", "should have studied", "would have helped"],
    formulaGlosses: ["الصيغة الأساسية", "لا بد أنه نسي", "قد يكون وصل", "كان بإمكانه الفوز", "كان ينبغي أن يدرس", "كان سيساعد"],
    examples: [
      { en: "He must have left.", ar: "لا بد أنه غادر.", tone: "deduction" },
      { en: "She might have forgotten.", ar: "ربما نسيت.", tone: "possibility" },
      { en: "They could have arrived.", ar: "ربما وصلوا / كان بإمكانهم الوصول.", tone: "opportunity" },
      { en: "You should have studied.", ar: "كان ينبغي أن تدرس.", tone: "regret" },
    ],
    points: [
      "① الفعل الناقص يحدد موقف المتحدث ووظيفته.",
      "② HAVE تأتي بصيغتها الأساسية بعد الفعل الناقص، ولا تصبح HAS أو HAD.",
      "③ الفعل بعد HAVE يكون في التصريف الثالث V3.",
    ],
    tip: "Modal + HAVE + V3 — لا HAS، لا HAD، ولا V2.",
  },
  {
    id: "have-not-has",
    station: "core-rule",
    kind: "lesson",
    mascot: "🔒",
    tone: "deduction",
    title: "HAVE دائمًا — حتى مع He وShe وIt",
    lead: "الفعل الناقص لا يحمل علامة الشخص، لذلك يبقى HAVE مجردًا. هذا سبب بنيوي، لا استثناء يُحفظ.",
    examples: [
      { en: "He must have left. ✓", ar: "لا بد أنه غادر.", tone: "deduction" },
      { en: "He must has left. ✗", ar: "خطأ: HAS بعد MUST.", tone: "deduction" },
      { en: "She might have forgotten. ✓", ar: "ربما نسيت.", tone: "possibility" },
      { en: "She might had forgotten. ✗", ar: "خطأ: HAD بعد MIGHT.", tone: "possibility" },
    ],
    points: [
      "بعد MUST وMIGHT وCOULD وSHOULD نستخدم HAVE، لأن الفعل الناقص يتبع بالفعل الأساسي V1، وHAVE هي V1.",
      "لا نستخدم HAS حتى لو كان الفاعل He أو She أو It.",
      "لا نستخدم HAD بعد الفعل الناقص؛ HAD تنتمي إلى Past Perfect أو الماضي العادي.",
    ],
    note: "الخطأ He must has left ليس خطأ في الزمن فقط؛ إنه خطأ في تركيب الفعل الناقص نفسه.",
  },
  {
    id: "v3-table",
    station: "core-rule",
    kind: "lesson",
    mascot: "📚",
    tone: "review",
    title: "V1 – V2 – V3: الأفعال التي نحتاجها",
    lead: "بعد HAVE نحتاج العمود الثالث. احفظ الأفعال في جدولها، لا منفردة.",
    table: {
      head: ["V1", "V2", "V3"],
      rows: V1_V2_V3_49.map((verb) => ({ label: verb.v1, cells: [verb.v2, verb.v3] })),
      note: "finish وstudy وleave أفعال منتظمة أو متساوية التصريف؛ لا تفترض أن كل فعل يختلف في V2 وV3.",
    },
    examples: [
      { en: "might have gone ✓ / might have went ✗", ar: "V3 من go هو gone.", tone: "possibility" },
      { en: "should have eaten ✓ / should have ate ✗", ar: "V3 من eat هو eaten.", tone: "regret" },
      { en: "could have seen ✓ / could have saw ✗", ar: "V3 من see هو seen.", tone: "opportunity" },
    ],
    tip: "سؤال سريع قبل الكتابة: هل كتبت V3 بعد HAVE؟",
  },
  {
    id: "v3-workshop",
    station: "core-rule",
    kind: "v3",
    mascot: "🛠️",
    tone: "review",
    title: "V3 Workshop",
    lead: "اختر التصريف الثالث الصحيح في كل جملة، ثم اقرأ سبب القبول أو الرفض.",
  },
  {
    id: "common-errors",
    station: "core-rule",
    kind: "lesson",
    mascot: "⚠️",
    tone: "regret",
    title: "ثلاثة أخطاء تبدأ من هنا",
    lead: "قبل أن ننتقل إلى المعاني، ثبّت الشكل. هذه الأخطاء الثلاثة ستظهر في الاختبار والتدريبات.",
    examples: [
      { en: "might have went ✗ → might have gone ✓", ar: "بعد HAVE نستخدم V3 لا V2.", tone: "possibility" },
      { en: "should have ate ✗ → should have eaten ✓", ar: "ate هي V2، وeaten هي V3.", tone: "regret" },
      { en: "could have saw ✗ → could have seen ✓", ar: "saw هي V2، وseen هي V3.", tone: "opportunity" },
    ],
    note: "الخطأ في التصريف يفسد الجملة حتى لو كان الفعل الناقص صحيحًا. لا تكتب Modal صحيحًا ثم V2 خاطئًا.",
  },
  {
    id: "present-past",
    station: "present-past",
    kind: "comparison",
    mascot: "⚖️",
    tone: "review",
    title: "Modal + V1 مقابل Modal + HAVE + V3",
    lead: "هذا الفرق هو أساس الدرس كله. الفعل الناقص نفسه قد يحمل معنى مختلفًا عندما نضيف HAVE + V3.",
    table: {
      head: ["Modal + V1", "Modal + HAVE + V3"],
      rows: [
        { label: "MUST", cells: ["He must study. = يجب عليه أن يدرس.", "He must have studied. = لا بد أنه درس."] },
        { label: "MIGHT", cells: ["She might leave. = ربما تغادر.", "She might have left. = ربما غادرت."] },
        { label: "SHOULD", cells: ["You should apologize. = ينبغي أن تعتذر.", "You should have apologized. = كان ينبغي أن تعتذر."] },
        { label: "COULD", cells: ["They could win. = يمكنهم الفوز.", "They could have won. = كان بإمكانهم الفوز / ربما فازوا."] },
      ],
      note: "المعنى يعتمد على الفعل الناقص والسياق، وليس على HAVE وحدها.",
    },
    points: [
      "Modal + V1 يتحدث عن الحاضر أو المستقبل أو عن إلزام/نصيحة/قدرة عامة.",
      "Modal + HAVE + V3 يتحدث عن موقف المتحدث من حدث ماضي.",
      "COULD HAVE قد تعني احتمالًا في الماضي أو فرصة لم تُستغل؛ السياق يحدد.",
    ],
    note: "Modal Perfect لا يعني بالضرورة أن الحدث حدث فعلًا. She might have called لا تثبت الاتصال، أما She must have called فاستنتاج قوي دون دليل قاطع بالضرورة.",
  },
  {
    id: "detector-lab",
    station: "present-past",
    kind: "detector",
    mascot: "🔎",
    tone: "review",
    title: "Meaning Detector",
    lead: "اقرأ الجملة وحدد وظيفتها: استنتاج، احتمال، ندم، فرصة ضائعة، عدم ضرورة، أو نتيجة افتراضية.",
  },
  {
    id: "must-have",
    station: "must-have",
    kind: "lesson",
    mascot: "◆",
    tone: "deduction",
    title: "MUST HAVE + V3 — استنتاج قوي عن الماضي",
    lead: "نستخدمه عندما نعتقد بدرجة قوية أن شيئًا حدث في الماضي اعتمادًا على دليل أو علامات أو معلومات.",
    formula: ["SUBJECT + MUST HAVE + V3"],
    examples: [
      { en: "The ground is wet. It must have rained.", ar: "الأرض مبللة. لا بد أن المطر قد هطل.", tone: "deduction" },
      { en: "Ali is very tired. He must have worked all night.", ar: "علي متعب جدًا. لا بد أنه عمل طوال الليل.", tone: "deduction" },
      { en: "The door is open. Someone must have forgotten to close it.", ar: "الباب مفتوح. لا بد أن أحدًا نسي إغلاقه.", tone: "deduction" },
      { en: "She speaks French perfectly. She must have lived in France.", ar: "تتحدث الفرنسية بإتقان. لا بد أنها عاشت في فرنسا.", tone: "deduction" },
    ],
    points: [
      "المعنى: لا بد أنه فعل… / من المؤكد على الأرجح أنه…",
      "كيف نستنتج؟ نرى دليلًا، نعرف ما يترتب عليه عادة، ثم نستنتج الحدث الأرجح.",
      "المثال الأول: رأينا الأرض مبللة + نعرف أن المطر يبلل الأرض = It must have rained.",
      "MUST HAVE استنتاج قوي، لا دليل قاطع مطلق ولا نسبة 100% مخترعة.",
    ],
    tip: "الدليل أولًا، ثم الاستنتاج. لا تبدأ بـ MUST HAVE لمجرد أنك تظن.",
  },
  {
    id: "must-evidence",
    station: "must-have",
    kind: "evidence",
    mascot: "🧾",
    tone: "deduction",
    title: "Evidence Investigation — قوة الاستنتاج",
    lead: "اقرأ الدليل، ثم اختر: MUST HAVE أم MIGHT HAVE أم COULDN'T HAVE؟ ثم اقرأ سبب قوة الاستنتاج.",
  },
  {
    id: "must-vs-must-have",
    station: "must-have",
    kind: "comparison",
    mascot: "⚖️",
    tone: "deduction",
    title: "MUST للإلزام مقابل MUST HAVE للاستنتاج",
    lead: "هذا الفرق من أكثر الفروق التي تُخطئ فيها حتى المتعلم المتقدم.",
    table: {
      head: ["MUST + V1", "MUST HAVE + V3"],
      rows: [
        { label: "الوظيفة", cells: ["إلزام في الحاضر", "استنتاج قوي عن الماضي"] },
        { label: "المثال", cells: ["You must finish your homework.", "You must have finished your homework."] },
        { label: "المعنى", cells: ["يجب عليك إنهاء واجبك.", "لا بد أنك أنهيت واجبك."] },
        { label: "المتحدث", cells: ["يفرض أو يذكر واجبًا", "يستنتج من دليل"] },
      ],
    },
    examples: [
      { en: "He must go.", ar: "يجب عليه أن يذهب.", tone: "deduction" },
      { en: "He must have gone.", ar: "لا بد أنه ذهب.", tone: "deduction" },
    ],
    note: "إذا كان المعنى إلزامًا، فـ HAVE + V3 ليست مجرد إضافة زمنية؛ إنها تغيّر نوع الكلام من واجب إلى استنتاج.",
  },
  {
    id: "may-have",
    station: "may-might",
    kind: "lesson",
    mascot: "◌",
    tone: "possibility",
    title: "MAY HAVE وMIGHT HAVE — احتمال في الماضي",
    lead: "نستخدمهما عندما نعتقد أن شيئًا ربما حدث في الماضي، لكننا لسنا متأكدين.",
    formula: ["SUBJECT + MAY / MIGHT HAVE + V3"],
    examples: [
      { en: "She may have missed the bus.", ar: "ربما فاتتها الحافلة.", tone: "possibility" },
      { en: "He might have forgotten my birthday.", ar: "ربما نسي عيد ميلادي.", tone: "possibility" },
      { en: "They may have taken the wrong road.", ar: "ربما سلكوا الطريق الخطأ.", tone: "possibility" },
      { en: "I might have left my phone at school.", ar: "ربما تركت هاتفي في المدرسة.", tone: "possibility" },
    ],
    points: [
      "المتحدث لا يعرف الحقيقة؛ لذلك يطرح احتمالًا.",
      "لا تثبت الجملة أن الحدث وقع.",
      "MAY HAVE وMIGHT HAVE كلتاهما للتعبير عن الاحتمال في الماضي.",
    ],
    note: "لا تحفظ نسبًا مئوية. MAY ليست 70% وMIGHT ليست 30% دائمًا؛ الفرق في التحفظ والسياق، وليس في جدول أرقام.",
  },
  {
    id: "may-might-compare",
    station: "may-might",
    kind: "comparison",
    mascot: "⚖️",
    tone: "possibility",
    title: "هل هناك فرق بين MAY HAVE وMIGHT HAVE؟",
    lead: "أحيانًا يُستخدم MIGHT لإظهار قدر أكبر من التحفظ أو عدم التأكد، لكن هذا ليس قاعدة ثابتة في كل المواقف.",
    examples: [
      { en: "She may have left early.", ar: "ربما غادرت مبكرًا.", tone: "possibility" },
      { en: "She might have left early.", ar: "ربما غادرت مبكرًا.", tone: "possibility" },
    ],
    table: {
      head: ["", "MUST HAVE", "MIGHT HAVE"],
      rows: [
        { label: "القوة", cells: ["استنتاج قوي", "احتمال غير مؤكد"] },
        { label: "الدليل", cells: ["مؤشرات أو معلومات قوية", "قد لا يوجد دليل حاسم"] },
        { label: "المثال", cells: ["He must have forgotten.", "He might have forgotten."] },
      ],
      note: "كلتاهما لا تثبت وقوع الحدث بدرجة مطلقة؛ الفرق في موقف المتحدث وقوة الاستنتاج.",
    },
    note: "تذكّر: MUST HAVE = استنتاج قوي. MAY/MIGHT HAVE = احتمال. لا تحوّل هذا الفرق إلى نسب مئوية.",
  },
  {
    id: "could-have",
    station: "could-have",
    kind: "lesson",
    mascot: "⤫",
    tone: "opportunity",
    title: "COULD HAVE + V3 — استعمالان يجب فصلهما",
    lead: "هذا التركيب له استعمالان مهمان، ويجب ألا نخلط بينهما.",
    formula: ["SUBJECT + COULD HAVE + V3"],
    examples: [
      { en: "The noise could have come from the kitchen.", ar: "ربما كان الصوت قادمًا من المطبخ.", tag: "POSSIBILITY", tone: "possibility" },
      { en: "He could have taken the earlier train.", ar: "ربما استقل القطار السابق.", tag: "POSSIBILITY", tone: "possibility" },
      { en: "I could have won the race, but I stopped running.", ar: "كان بإمكاني الفوز بالسباق، لكنني توقفت عن الجري.", tag: "UNUSED OPPORTUNITY", tone: "opportunity" },
      { en: "You could have told me the truth.", ar: "كان بإمكانك إخباري بالحقيقة.", tag: "UNUSED OPPORTUNITY", tone: "opportunity" },
      { en: "We could have saved more money.", ar: "كان بإمكاننا توفير المزيد من المال.", tag: "UNUSED OPPORTUNITY", tone: "opportunity" },
      { en: "She could have become a doctor.", ar: "كان بإمكانها أن تصبح طبيبة.", tag: "UNUSED OPPORTUNITY", tone: "opportunity" },
    ],
    points: [
      "الاستعمال الأول: احتمال حدوث شيء في الماضي — نطرح تفسيرًا ممكنًا.",
      "الاستعمال الثاني: فرصة أو قدرة كانت متاحة ولم تُستغل.",
      "في الاستعمال الثاني: كانت لدي القدرة أو الفرصة، لم أستغلها، والنتيجة لم تحدث.",
      "السياق هو الذي يحدد أي الاستعمالين تقصد.",
    ],
    tip: "Could have told me the truth غالبًا نبرة عتاب؛ لأن الفرصة كانت موجودة ولم تُستغل.",
  },
  {
    id: "could-vs-should",
    station: "could-have",
    kind: "comparison",
    mascot: "⚖️",
    tone: "opportunity",
    title: "COULD HAVE مقابل SHOULD HAVE",
    lead: "الفرق بين «كان بإمكانك» و«كان ينبغي عليك».",
    examples: [
      { en: "You could have called me.", ar: "كان بإمكانك الاتصال بي — كانت لديك إمكانية.", tone: "opportunity" },
      { en: "You should have called me.", ar: "كان ينبغي أن تتصل بي — كان من المفترض أن تفعل.", tone: "regret" },
    ],
    table: {
      head: ["", "COULD HAVE", "SHOULD HAVE"],
      rows: [
        { label: "الوظيفة", cells: ["إمكانية أو فرصة كانت متاحة", "واجب أو نصيحة لم تُنفّذ"] },
        { label: "اللوم", cells: ["قد يوجد عتاب إذا كانت الفرصة واضحة", "لوم أخلاقي/نصحي مباشر"] },
        { label: "المثال", cells: ["You could have called me.", "You should have called me."] },
      ],
      note: "السياق قد يغيّر النبرة، لكن لا تخلط بين الإمكانية والواجب.",
    },
  },
  {
    id: "couldnt-have",
    station: "couldnt-have",
    kind: "lesson",
    mascot: "✕",
    tone: "impossible",
    title: "COULDN'T HAVE + V3 — استنتاج بأنه غير ممكن",
    lead: "نستخدمه للتعبير عن اعتقاد قوي بأن شيئًا لم يكن ممكنًا أن يحدث، أو أن شخصًا لم يكن قادرًا على فعله في الظروف المذكورة.",
    formula: ["SUBJECT + COULDN'T HAVE + V3"],
    examples: [
      { en: "He couldn't have stolen the money. He was abroad.", ar: "لا يمكن أنه سرق المال. لقد كان خارج البلاد.", tone: "impossible" },
      { en: "She couldn't have known about the surprise.", ar: "لا يمكن أنها كانت تعرف بالمفاجأة.", tone: "impossible" },
      { en: "They couldn't have finished the project in one hour.", ar: "لم يكن من الممكن أن يكونوا قد أنهوا المشروع في ساعة واحدة.", tone: "impossible" },
    ],
    points: [
      "وجود الشخص خارج البلاد دليل قوي ضد إمكانية السرقة.",
      "الجملة استنتاج سلبي قوي، وليست مجرد احتمال.",
      "تُستخدم COULDN'T HAVE وCAN'T HAVE للاستنتاج السلبي عن الماضي؛ لا تستخدم MUSTN'T HAVE كبديل طبيعي.",
    ],
    note: "لا تخلط بين He couldn't do it (لم يستطع) وHe couldn't have done it (لا يمكن أنه فعله / لم يكن ممكنًا في الظروف المذكورة).",
  },
  {
    id: "couldnt-vs-couldnt-do",
    station: "couldnt-have",
    kind: "comparison",
    mascot: "⚖️",
    tone: "impossible",
    title: "COULDN'T DO مقابل COULDN'T HAVE DONE",
    lead: "الفرق في نوع الكلام: قدرة في الماضي أم استنتاج عن حدث ماضٍ؟",
    examples: [
      { en: "He couldn't do it.", ar: "لم يستطع فعل ذلك.", tone: "impossible" },
      { en: "He couldn't have done it.", ar: "لا يمكن أنه فعله / لم يكن ممكنًا في الظروف المذكورة.", tone: "impossible" },
      { en: "He could have done it.", ar: "كان بإمكانه فعل ذلك.", tone: "opportunity" },
    ],
    table: {
      head: ["", "COULDN'T DO", "COULDN'T HAVE DONE"],
      rows: [
        { label: "الوظيفة", cells: ["عدم القدرة في الماضي", "استنتاج بأن الفعل غير ممكن"] },
        { label: "التركيز", cells: ["القدرة نفسها", "حدوث الفعل في ظروف معينة"] },
        { label: "المثال", cells: ["I couldn't swim when I was five.", "He couldn't have seen us from there."] },
      ],
      note: "قد يبدو الفرق دقيقًا، لكنه يغيّر ما تقوله عن الشخص والحدث.",
    },
  },
  {
    id: "should-have",
    station: "should-have",
    kind: "lesson",
    mascot: "↩",
    tone: "regret",
    title: "SHOULD HAVE + V3 — الندم والنصيحة المتأخرة",
    lead: "نستخدمه عندما نعتقد أن شخصًا كان ينبغي أن يفعل شيئًا في الماضي، لكنه لم يفعله.",
    formula: ["SUBJECT + SHOULD HAVE + V3"],
    examples: [
      { en: "You should have studied harder.", ar: "كان ينبغي أن تدرس بجدية أكبر.", tone: "regret" },
      { en: "I should have listened to my parents.", ar: "كان ينبغي أن أستمع إلى والديّ.", tone: "regret" },
      { en: "He should have arrived earlier.", ar: "كان ينبغي أن يصل مبكرًا.", tone: "regret" },
      { en: "We should have booked the tickets yesterday.", ar: "كان ينبغي أن نحجز التذاكر أمس.", tone: "regret" },
    ],
    points: [
      "المعنى: كان ينبغي أن… / كان من الأفضل أن… / كان يجب أن…",
      "كثيرًا ما يظهر في النصائح والعتاب والندم.",
      "في المثال الأول: لم تدرس بجدية كافية، والآن ننتقد ذلك أو نندم عليه.",
    ],
    tip: "SHOULD HAVE + V3 = الفعل لم يحدث، وكان الأفضل حدوثه.",
  },
  {
    id: "shouldnt-have",
    station: "should-have",
    kind: "lesson",
    mascot: "🚫",
    tone: "regret",
    title: "SHOULDN'T HAVE + V3 — فعل وقع وكان خطأ",
    lead: "نستخدمه عندما حدث الفعل بالفعل، لكننا نعتقد أنه كان خطأ أو لم يكن ينبغي أن يحدث.",
    formula: ["SUBJECT + SHOULDN'T HAVE + V3"],
    examples: [
      { en: "You shouldn't have said that.", ar: "لم يكن ينبغي أن تقول ذلك.", tone: "regret" },
      { en: "I shouldn't have eaten so much.", ar: "لم يكن ينبغي أن آكل كل هذه الكمية.", tone: "regret" },
      { en: "They shouldn't have ignored the warning.", ar: "لم يكن ينبغي لهم تجاهل التحذير.", tone: "regret" },
    ],
    points: [
      "أنت قلت ذلك بالفعل، لكنني أرى أن قولك كان خطأ.",
      "المتحدث أكل بالفعل، لكنه نادم على ذلك.",
      "لقد تجاهلوا التحذير بالفعل، والمتحدث ينتقد تصرفهم.",
    ],
    note: "انتبه: تغيير NOT يغيّر المعنى تمامًا. You should have called ≠ You shouldn't have called.",
  },
  {
    id: "should-shouldnt-compare",
    station: "should-have",
    kind: "comparison",
    mascot: "⚖️",
    tone: "regret",
    title: "مقارنة دقيقة جدًا: SHOULD HAVE / SHOULDN'T HAVE",
    lead: "جملتان متشابهتان، وحدثان متعاكسان.",
    examples: [
      { en: "You should have called.", ar: "لم تتصل، وكان ينبغي أن تتصل.", tone: "regret" },
      { en: "You shouldn't have called.", ar: "اتصلت، لكن لم يكن ينبغي أن تتصل.", tone: "regret" },
    ],
    table: {
      head: ["الجملة", "هل وقع الفعل؟", "المعنى"],
      rows: [
        { label: "You should have called.", cells: ["لا", "كان ينبغي أن تتصل."] },
        { label: "You shouldn't have called.", cells: ["نعم", "لم يكن ينبغي أن تتصل."] },
      ],
      note: "هذه ليست فرقًا في درجة اللوم فقط؛ إنها فرق في وقوع الفعل نفسه.",
    },
  },
  {
    id: "ought-to-have",
    station: "ought-to",
    kind: "lesson",
    mascot: "📜",
    tone: "regret",
    title: "OUGHT TO HAVE + V3 — واجب لم يتحقق",
    lead: "قريب جدًا من SHOULD HAVE، مع نبرة واجب أخلاقي أو نصيحة لم تُنفّذ.",
    formula: ["SUBJECT + OUGHT TO HAVE + V3"],
    examples: [
      { en: "You ought to have told me.", ar: "كان ينبغي أن تخبرني.", tone: "regret" },
      { en: "He ought to have apologized.", ar: "كان ينبغي أن يعتذر.", tone: "regret" },
      { en: "We ought to have helped them.", ar: "كان ينبغي أن نساعدهم.", tone: "regret" },
    ],
    points: [
      "المعنى متقارب جدًا من SHOULD HAVE في معظم الاستعمالات اليومية.",
      "SHOULD أكثر شيوعًا في المحادثات اليومية.",
      "OUGHT TO قد تبدو أكثر رسمية أو أقل شيوعًا في بعض السياقات.",
    ],
    note: "OUGHT تتبعها TO دائمًا، حتى في Modal Perfect: OUGHT TO HAVE + V3.",
  },
  {
    id: "ought-vs-should",
    station: "ought-to",
    kind: "comparison",
    mascot: "⚖️",
    tone: "regret",
    title: "OUGHT TO HAVE مقابل SHOULD HAVE",
    lead: "المعنى واحد تقريبًا؛ الفرق في الشيوع والنبرة لا في القاعدة.",
    examples: [
      { en: "You should have studied.", ar: "كان ينبغي أن تدرس.", tone: "regret" },
      { en: "You ought to have studied.", ar: "كان ينبغي أن تدرس.", tone: "regret" },
    ],
    table: {
      head: ["", "SHOULD HAVE", "OUGHT TO HAVE"],
      rows: [
        { label: "الشيوع", cells: ["أكثر شيوعًا في المحادثة", "أقل شيوعًا/أكثر رسمية أحيانًا"] },
        { label: "التركيب", cells: ["SHOULD + HAVE + V3", "OUGHT + TO HAVE + V3"] },
        { label: "المعنى", cells: ["نصيحة/ندم", "واجب/نصيحة لم تتحقق"] },
      ],
      note: "لا توجد قاعدة تمنع أحدهما في سياق صحيح؛ الاختيار أسلوبي في كثير من الأحيان.",
    },
  },
  {
    id: "neednt-have",
    station: "neednt-have",
    kind: "lesson",
    mascot: "⌁",
    tone: "unnecessary",
    title: "NEEDN'T HAVE + V3 — حدث دون ضرورة",
    lead: "هذا من أهم الأجزاء التي تحتاج إلى تركيز: الفعل وقع بالفعل، ثم اكتشفنا أنه لم يكن ضروريًا.",
    formula: ["SUBJECT + NEEDN'T HAVE + V3"],
    examples: [
      { en: "You needn't have bought bread. We already had plenty.", ar: "لم يكن عليك شراء الخبز. كان لدينا الكثير بالفعل.", tone: "unnecessary" },
      { en: "I needn't have hurried. The train was delayed.", ar: "لم يكن من الضروري أن أستعجل. فقد تأخر القطار.", tone: "unnecessary" },
      { en: "She needn't have cooked dinner. We had already eaten.", ar: "لم يكن من الضروري أن تطبخ العشاء. كنا قد تناولنا الطعام بالفعل.", tone: "unnecessary" },
    ],
    points: [
      "① الشخص اشترى الخبز / استعجل / طبخ بالفعل.",
      "② لم تكن هناك حاجة لذلك.",
      "③ إذن الفعل حدث، لكنه لم يكن ضروريًا.",
    ],
    tip: "NEEDN'T HAVE + V3 = «فعلته، ثم اتضح أنه لم يكن لازمًا».",
  },
  {
    id: "neednt-vs-didnt",
    station: "neednt-have",
    kind: "comparison",
    mascot: "⚖️",
    tone: "unnecessary",
    title: "NEEDN'T HAVE مقابل DIDN'T NEED TO",
    lead: "المقارنة الأساسية: هل وقع الفعل أم لا؟",
    table: {
      head: ["", "NEEDN'T HAVE + V3", "DIDN'T NEED TO + V1"],
      rows: [
        { label: "الفعل", cells: ["وقع بالفعل", "الجملة وحدها لا تحسم"] },
        { label: "المعنى", cells: ["فعلته، لكنه لم يكن ضروريًا", "لم تكن هناك حاجة إلى فعله"] },
        { label: "المثال", cells: ["I needn't have taken a taxi.", "I didn't need to take a taxi."] },
        { label: "السياق", cells: ["استقللت التاكسي فعلًا", "قد تكون استقللته أو لا"] },
      ],
      note: "لا تخلط بينهما: NEEDN'T HAVE تؤكد وقوع الفعل في المعنى المقصود، بينما DIDN'T NEED TO لا تؤكده ولا تنفيه.",
    },
    examples: [
      { en: "I needn't have cooked. = طبخت، لكن لم تكن هناك حاجة لذلك.", ar: "الفعل وقع.", tone: "unnecessary" },
      { en: "I didn't need to cook. = لم تكن هناك حاجة إلى الطبخ، ولا تحدد الجملة هل طبخت.", ar: "الفعل غير محسوم.", tone: "unnecessary" },
    ],
  },
  {
    id: "would-have",
    station: "would-have",
    kind: "lesson",
    mascot: "⇢",
    tone: "hypothetical",
    title: "WOULD HAVE + V3 — نتيجة افتراضية في الماضي",
    lead: "نتحدث عن نتيجة كان من الممكن أن تحدث في الماضي لو تحقق شرط معين، لكنه لم يتحقق.",
    formula: ["SUBJECT + WOULD HAVE + V3"],
    examples: [
      { en: "I would have helped you if I had known.", ar: "كنت سأساعدك لو كنت قد عرفت.", tone: "hypothetical" },
      { en: "She would have passed the exam if she had studied harder.", ar: "كانت ستنجح في الامتحان لو درست بجدية أكبر.", tone: "hypothetical" },
      { en: "We would have arrived earlier if we had left sooner.", ar: "لكنا وصلنا مبكرًا لو غادرنا في وقت أبكر.", tone: "hypothetical" },
    ],
    points: [
      "المعنى: لم أكن أعرف، لذلك لم أساعدك، ولو عرفت لساعدتك.",
      "الشرط في الماضي عادةً يظهر مع HAD + V3: if I had known.",
      "هذا التركيب يمهد للشرط الثالث Third Conditional في الدرس 54.",
    ],
    note: "لا نوسّع هنا في قواعد الشرط الثالث؛ يكفي أن تفهم أن WOULD HAVE يعبر عن نتيجة افتراضية لم تحدث في الماضي.",
    tip: "WOULD HAVE + V3 = نتيجة افتراضية لم تحدث. الشرط الثالث سيُفصّل في الدرس 54.",
  },
  {
    id: "past-perfect",
    station: "past-perfect",
    kind: "lesson",
    mascot: "🧱",
    tone: "review",
    title: "Past Perfect: HAD + V3",
    lead: "قبل المقارنة، ثبّت وظيفة Past Perfect: ترتيب حدثين في الماضي.",
    formula: ["SUBJECT + HAD + V3"],
    examples: [
      { en: "She had left before I arrived.", ar: "كانت قد غادرت قبل أن أصل.", tone: "review" },
      { en: "He had forgotten his keys before he left.", ar: "كان قد نسي مفاتيحه قبل أن يغادر.", tone: "review" },
    ],
    points: [
      "لدينا حدثان: هي غادرت، وأنا وصلت.",
      "المغادرة حدثت أولًا، لذلك استخدمنا Past Perfect.",
      "Past Perfect يصف ترتيب الأحداث، لا موقف المتحدث منها.",
    ],
  },
  {
    id: "modal-vs-past-perfect",
    station: "past-perfect",
    kind: "comparison",
    mascot: "⚖️",
    tone: "review",
    title: "Modal Perfect مقابل Past Perfect",
    lead: "التركيبان يحتويان HAVE/HAD + V3، وقد يختلطان على المتعلم. الوظيفة هي الفيصل.",
    table: {
      head: ["Past Perfect", "Modal Perfect"],
      rows: PAST_PERFECT_ROWS_49.map((row) => ({ label: row.label, cells: row.cells })),
      note: "HAD + V3 يصف ترتيب الأحداث. MODAL + HAVE + V3 يعبّر عن موقف المتحدث من حدث ماضٍ.",
    },
    examples: [
      { en: "He had forgotten. / He might have forgotten.", ar: "كان قد نسي. / ربما نسي.", tone: "review" },
      { en: "She had gone. / She must have gone.", ar: "كانت قد ذهبت. / لا بد أنها ذهبت.", tone: "review" },
      { en: "They had finished. / They should have finished.", ar: "كانوا قد انتهوا. / كان ينبغي أن يكونوا قد انتهوا.", tone: "review" },
    ],
  },
  {
    id: "negation",
    station: "negative-questions",
    kind: "lesson",
    mascot: "➖",
    tone: "review",
    title: "النفي: MODAL + NOT + HAVE + V3",
    lead: "نضع NOT بعد الفعل الناقص وقبل HAVE. المعنى يتحدد بحسب الفعل الناقص نفسه.",
    formula: ["MODAL + NOT + HAVE + V3"],
    examples: [
      { en: "She might not have understood.", ar: "ربما لم تفهم.", tone: "possibility" },
      { en: "He may not have received the message.", ar: "قد لا يكون قد استلم الرسالة.", tone: "possibility" },
      { en: "You should not have shouted.", ar: "لم يكن ينبغي لك أن تصرخ.", tone: "regret" },
      { en: "They could not have known.", ar: "لم يكن ممكنًا أن يعرفوا.", tone: "impossible" },
      { en: "I would not have agreed.", ar: "ما كنت لأوافق.", tone: "hypothetical" },
    ],
    points: [
      "should not = shouldn't",
      "could not = couldn't",
      "would not = wouldn't",
      "might not = mightn't (أقل شيوعًا في كثير من أنواع الإنجليزية)",
      "must not = mustn't — لكن انتبه إلى المعنى والسياق",
    ],
    note: "لا تستخدم MUSTN'T HAVE كبديلك الطبيعي المعتاد للاستنتاج السلبي في الماضي. استخدم CAN'T HAVE أو COULDN'T HAVE: He can't have stolen it. / He couldn't have stolen it.",
    tip: "النفي ≠ الاستنتاج السلبي ≠ المنع. فرّق بينها بالسياق.",
  },
  {
    id: "questions",
    station: "negative-questions",
    kind: "lesson",
    mascot: "❓",
    tone: "review",
    title: "السؤال والإجابات القصيرة",
    lead: "نضع الفعل الناقص في البداية، ثم الفاعل، ثم HAVE + V3.",
    formula: ["MODAL + SUBJECT + HAVE + V3?"],
    examples: [
      { en: "Could he have forgotten?", ar: "هل من الممكن أنه نسي؟" },
      { en: "Might she have taken the wrong train?", ar: "هل من المحتمل أنها استقلت القطار الخطأ؟" },
      { en: "Should I have called you?", ar: "هل كان ينبغي أن أتصل بك؟" },
      { en: "Would they have helped us?", ar: "هل كانوا سيساعدوننا؟" },
    ],
    points: [
      "Could he have forgotten? — Yes, he could have. / No, he couldn't have.",
      "Should I have told him? — Yes, you should have. / No, you shouldn't have.",
      "لا نكرر التصريف الثالث في الإجابة القصيرة؛ نكرر الفعل الناقص ونستخدم HAVE.",
      "الإجابة القصيرة النموذجية تكفي: Yes, he could have. ولا حاجة لتكرار V3.",
    ],
    tip: "السؤال يبدأ بالفعل الناقص، والإجابة القصيرة تنتهي بـ HAVE دون V3.",
  },
  {
    id: "meaning-map",
    station: "meaning-map",
    kind: "map",
    mascot: "🗺️",
    tone: "review",
    title: "خريطة المعاني الأساسية",
    lead: "اضغط أي تركيب لترى وظيفته ومعناه العربي ومثاله ودليله السياقي والفرق بينه وبين أقرب تركيب مشابه.",
  },
  {
    id: "meaning-contrast",
    station: "meaning-map",
    kind: "contrast",
    mascot: "⚖️",
    tone: "review",
    title: "Contrast Lab — ست مقارنات حاسمة",
    lead: "بدّل التركيب داخل كل بطاقة، وشاهد كيف يتغير المعنى كله.",
  },
  {
    id: "errors-wall",
    station: "mistakes",
    kind: "lesson",
    mascot: "⚠️",
    tone: "regret",
    title: "الأخطاء الشائعة الستة",
    lead: "هذه الأخطاء تتكرر كثيرًا حتى عند المتعلمين الذين يعرفون الصيغة. اقرأ الخطأ، ثم التصحيح، ثم السبب.",
    points: [
      "① HAS بدل HAVE — بعد الفعل الناقص نستخدم HAVE.",
      "② HAD بدل HAVE — HAD لا تتبع الفعل الناقص هنا.",
      "③ V2 بدل V3 — بعد HAVE نستخدم التصريف الثالث.",
      "④ SHOULD مقابل SHOULD HAVE — الماضي يحتاج HAVE + V3.",
      "⑤ NEEDN'T HAVE مقابل DIDN'T NEED TO — الأولى تؤكد وقوع الفعل.",
      "⑥ MUST HAVE للاستنتاج مقابل MUST للإلزام.",
    ],
    note: "لن تكتفي بالقراءة: في المحطة التالية ستصلح هذه الأخطاء بنفسك وتقرأ تغذية راجعة تشرح سبب كل تصحيح.",
  },
  {
    id: "grammar-detective",
    station: "mistakes",
    kind: "detective",
    mascot: "🕵️",
    tone: "regret",
    title: "Grammar Detective — التدقيق في الأخطاء الستة",
    lead: "أعد كتابة الجملة كاملة بعد التصحيح. يُقبل البديل الصحيح إذا حافظ على المعنى.",
    practiceSet: "detective",
  },
  {
    id: "dialogue",
    station: "dialogue",
    kind: "dialogue",
    mascot: "💬",
    tone: "possibility",
    title: "WHAT HAPPENED YESTERDAY?",
    lead: "حوار كامل بين Adam وMaya: استنتاج، احتمال، فرصة، ولوم. اقرأ الترجمة عند الحاجة، ثم حلّل الوظائف.",
    dialogue: "main",
  },
  {
    id: "reading",
    station: "reading",
    kind: "reading",
    mascot: "📖",
    tone: "review",
    title: "The Missing Project",
    lead: "اقرأ القطعة بهدوء، ثم حاول تحديد وظيفة كل تركيب من تراكيب الماضي قبل فتح الترجمة.",
  },
  {
    id: "reading-questions",
    station: "reading",
    kind: "readingQuestions",
    mascot: "🧾",
    tone: "review",
    title: "أسئلة الفهم الستة",
    lead: "أجب بنفسك أولًا، ثم قارن بالإجابة النموذجية عند الطلب.",
  },
  {
    id: "reading-challenge",
    station: "reading",
    kind: "readingChallenge",
    mascot: "🔍",
    tone: "deduction",
    title: "Reading Challenge — الأدلة والاستنتاج",
    lead: "اختبر فهم الأحداث، وتحديد الأدلة، واستنتاج سبب فقدان المشروع، ووظيفة كل تركيب من تراكيب الماضي داخل النص.",
  },
  {
    id: "practice-1",
    station: "practice",
    kind: "practice",
    mascot: "✍️",
    tone: "review",
    title: "التدريب الأول: أكمل باستخدام HAVE + V3",
    lead: "استخدم الفعل بين القوسين مع التركيب المطلوب. عشرة بنود كاملة.",
    practiceSet: "complete",
  },
  {
    id: "practice-2",
    station: "practice",
    kind: "practice",
    mascot: "🎯",
    tone: "review",
    title: "التدريب الثاني: اختر التركيب المناسب",
    lead: "خمس جمل، وثلاثة خيارات لكل جملة. اقرأ السبب بعد التحقق.",
    practiceSet: "choose",
  },
  {
    id: "practice-3",
    station: "practice",
    kind: "practice",
    mascot: "🔧",
    tone: "review",
    title: "التدريب الثالث: صحح ثمانية أخطاء",
    lead: "أعد كتابة كل جملة كاملة بعد التصحيح، مع الحفاظ على المعنى.",
    practiceSet: "correct",
  },
  {
    id: "practice-4",
    station: "practice",
    kind: "practice",
    mascot: "🌍",
    tone: "review",
    title: "التدريب الرابع: ترجم ثماني جمل",
    lead: "اكتب الترجمة الإنجليزية. يُقبل البديل الصحيح الذي يحافظ على المعنى والتركيب.",
    practiceSet: "translate",
  },
  {
    id: "final-test",
    station: "test",
    kind: "test",
    mascot: "🏆",
    tone: "review",
    title: "اختبار الدرس النهائي",
    lead: "25 سؤالًا بالضبط · 10 اختيار · 5 إكمال · 5 تصحيح · 5 ترجمة. لا تصحيح قبل التسليم.",
  },
  {
    id: "teacher",
    station: "teacher",
    kind: "teacher",
    mascot: "🧑‍🏫",
    tone: "review",
    title: "مساحة المعلم",
    lead: "مفتاح الأسئلة الخمسة والعشرين، البدائل المقبولة، وأسباب رفض الأخطاء الشائعة — بعد التسليم فقط.",
  },
  {
    id: "writing",
    station: "writing",
    kind: "writing",
    mascot: "✍️",
    tone: "regret",
    title: "A Day Full of Mistakes",
    lead: "ثماني إلى عشر جمل، تستخدم فيها ستة تراكيب من تراكيب الماضي على الأقل. ثم مهمة تحدث من دقيقة إلى دقيقتين.",
  },
  {
    id: "mastery-dashboard",
    station: "summary",
    kind: "dashboard",
    mascot: "📊",
    tone: "review",
    title: "Mastery Dashboard — أرقام حقيقية",
    lead: "كل رقم هنا مبني على إجابات فحصتها فعليًا أو اختبار سلّمته. لا نسب إتقان مخترعة.",
  },
  {
    id: "golden-summary",
    station: "summary",
    kind: "summary",
    mascot: "🧠",
    tone: "review",
    title: "الملخص النهائي: عشرة تراكيب وست مقارنات",
    lead: "خريطة واحدة تجمع ما بنيناه اليوم، وأهم الفروق التي لا تُنسى.",
  },
  {
    id: "stage-progress",
    station: "summary",
    kind: "phase",
    mascot: "🚪",
    tone: "review",
    title: "المرحلة الثالثة بدأت",
    lead: "الدرس 49 من 120 — 40.83% من المنهج، و71 درسًا متبقيًا.",
  },
  {
    id: "course-progress",
    station: "summary",
    kind: "roadmap",
    mascot: "🎓",
    tone: "review",
    title: "المحطة القادمة: الدرس 50 — DEDUCTION & SPECULATION",
    lead: "سنتعلم كيف نستنتج أن شيئًا يحدث الآن أو حدث في الماضي، وكيف نختار بين MUST وMIGHT وCAN'T.",
  },
] as const;

export const LESSON_STEP_COUNT_49 = SLIDES_49.length;
