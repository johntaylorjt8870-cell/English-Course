/**
 * Lesson 50 — DEDUCTION & SPECULATION
 * Student-facing teaching content only. Assessment solutions live in
 * `testKey50.ts`; practice solutions live in `practiceKey50.ts`.
 */
export type Tone50 =
  | "strong"
  | "possible"
  | "negative"
  | "past"
  | "ongoing"
  | "review";

export type Example50 = { en: string; ar: string; tag?: string; tone?: Tone50 };
export type Table50 = {
  head: readonly string[];
  rows: readonly { label: string; cells: readonly string[] }[];
  note?: string;
};

export type SlideKind50 =
  | "cover"
  | "goals"
  | "intro"
  | "concept"
  | "certaintyLab"
  | "lesson"
  | "comparison"
  | "cases"
  | "lensLab"
  | "couldLab"
  | "decision"
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

export type Slide50 = {
  id: string;
  station: string;
  kind: SlideKind50;
  title: string;
  lead?: string;
  mascot?: string;
  tone?: Tone50;
  formula?: readonly string[];
  formulaGlosses?: readonly string[];
  examples?: readonly Example50[];
  points?: readonly string[];
  note?: string;
  tip?: string;
  table?: Table50;
  practiceSet?: string;
  dialogue?: string;
};

export const STATIONS_50 = [
  { id: "opening", title: "البداية" },
  { id: "certainty", title: "مقياس الثقة" },
  { id: "must-now", title: "MUST الآن" },
  { id: "maybe-now", title: "الاحتمال الآن" },
  { id: "cant-now", title: "النفي القوي الآن" },
  { id: "cases-now", title: "حالات من الواقع" },
  { id: "past", title: "الاستنتاج عن الماضي" },
  { id: "lens", title: "عدستا الزمن" },
  { id: "ongoing", title: "المستمر" },
  { id: "could", title: "وجوه COULD" },
  { id: "decision", title: "صانع القرار" },
  { id: "mistakes", title: "الأخطاء" },
  { id: "dialogue", title: "الحوار" },
  { id: "reading", title: "القراءة" },
  { id: "practice", title: "التدريبات" },
  { id: "writing", title: "الكتابة والتحدث" },
  { id: "review", title: "المراجعة الذكية" },
  { id: "final-test", title: "الاختبار النهائي" },
  { id: "teacher", title: "مساحة المعلم" },
  { id: "progress", title: "الإتقان والتقدم" },
] as const;

export const GOALS_50 = [
  "التمييز بين الاستنتاج المبني على الأدلة والتخمين غير المؤكد.",
  "استخدام MUST للاستنتاج القوي عن الحاضر، مع صفة أو اسم أو مكان أو فعل مستمر.",
  "التعبير عن الاحتمال في الحاضر والمستقبل باستخدام MAY وMIGHT وCOULD.",
  "استخدام CAN'T للاستنتاج السلبي القوي، وعدم استبدالها بـMUSTN'T.",
  "الاستنتاج عن الماضي باستخدام MUST HAVE + V3 من دليل تراه الآن.",
  "التعبير عن احتمال في الماضي باستخدام MAY HAVE وMIGHT HAVE وCOULD HAVE.",
  "نفي حدث في الماضي بقوة باستخدام CAN'T HAVE وCOULDN'T HAVE.",
  "التمييز بين حدث ماضٍ ونشاط كان مستمرًا: MUST HAVE + V3 مقابل MUST HAVE BEEN + V-ing.",
  "تحديد معنى COULD وCOULD HAVE من السياق: قدرة، أو احتمال، أو فرصة لم تُستغل.",
  "اختيار التركيب الصحيح بثلاث خطوات: الزمن، ثم درجة التأكد، ثم الاستمرار.",
] as const;

/* ============================================================
   المدخل: غرفة الأدلة ودرجات التأكد
   ============================================================ */

export const ROOM_CLUES_50 = [
  { en: "Someone must be in the room.", ar: "لا بد أن هناك شخصًا في الغرفة.", fn: "استنتاج قوي من أدلة", tone: "strong" as Tone50 },
  { en: "Someone might be opening the window.", ar: "ربما هناك شخص يفتح النافذة.", fn: "احتمال لنشاط يحدث الآن", tone: "possible" as Tone50 },
  { en: "The window can't be locked.", ar: "لا يمكن أن تكون النافذة مقفلة.", fn: "استنتاج سلبي قوي", tone: "negative" as Tone50 },
] as const;

export const CERTAINTY_LEVELS_50 = [
  {
    id: "must",
    glyph: "●",
    tone: "strong" as Tone50,
    form: "MUST",
    ar: "استنتاج قوي — لا بد أن ذلك صحيح",
    gauge: "مرتفع جدًا",
    ex: "He must be at home.",
    exAr: "لا بد أنه في المنزل.",
  },
  {
    id: "might",
    glyph: "◐",
    tone: "possible" as Tone50,
    form: "MAY / MIGHT / COULD",
    ar: "احتمال غير محسوم — ربما يكون صحيحًا",
    gauge: "مفتوح",
    ex: "He might be at home.",
    exAr: "ربما يكون في المنزل.",
  },
  {
    id: "cant",
    glyph: "✕",
    tone: "negative" as Tone50,
    form: "CAN'T",
    ar: "نفي قوي — لا يمكن أن يكون صحيحًا",
    gauge: "منفي بقوة",
    ex: "He can't be at home.",
    exAr: "لا يمكن أن يكون في المنزل.",
  },
] as const;

export type CertaintyCase50 = {
  id: string;
  sceneEn: string;
  sceneAr: string;
  ask: string;
  options: readonly { id: string; en: string; note: string }[];
  correct: string;
  why: string;
  tone: Tone50;
};

export const CERTAINTY_CASES_50: readonly CertaintyCase50[] = [
  {
    id: "cc1",
    sceneEn: "You hear a noise in the kitchen. Your brother's shoes are by the door, and you can smell his favourite food cooking.",
    sceneAr: "تسمع صوتًا في المطبخ، وحذاء أخيك عند الباب، ورائحة طعامه المفضل تُطبخ.",
    ask: "أي استنتاج يناسب قوة الأدلة؟",
    options: [
      { id: "must", en: "My brother must be in the kitchen.", note: "استنتاج قوي" },
      { id: "might", en: "My brother might be in the kitchen.", note: "احتمال متحفظ" },
      { id: "cant", en: "My brother can't be in the kitchen.", note: "نفي قوي" },
    ],
    correct: "must",
    why: "ثلاثة أدلة مجتمعة (الصوت والحذاء والرائحة) تجعل الاستنتاج قويًا، فنستخدم MUST. الاحتمال بـMIGHT أضعف من الأدلة، ونفيها بـCAN'T يناقضها.",
    tone: "strong",
  },
  {
    id: "cc2",
    sceneEn: "The house is silent. Your brother sometimes visits a friend on Friday, and sometimes he stays in his room.",
    sceneAr: "المنزل صامت. أخوك يزور صديقًا أحيانًا يوم الجمعة، ويبقى في غرفته أحيانًا أخرى.",
    ask: "كيف تعبّر عن احتمال وجوده في غرفته دون تأكيد؟",
    options: [
      { id: "must", en: "He must be in his room.", note: "استنتاج قوي" },
      { id: "might", en: "He might be in his room.", note: "احتمال" },
      { id: "cant", en: "He can't be in his room.", note: "نفي قوي" },
    ],
    correct: "might",
    why: "لا توجد أدلة حاسمة: الخياران واردان. لذلك نطرح احتمالًا بـMIGHT (وتقبل MAY وCOULD في سياق مشابه)، ولا ندّعي تأكدًا بـMUST.",
    tone: "possible",
  },
  {
    id: "cc3",
    sceneEn: "You are talking to your brother on the phone. He is telling you about the match he is watching at the stadium now.",
    sceneAr: "أنت تتحدث مع أخيك في الهاتف الآن، وهو يصف لك المباراة التي يشاهدها في الملعب.",
    ask: "ماذا تستنتج عن وجوده في المنزل الآن؟",
    options: [
      { id: "must", en: "He must be at home.", note: "استنتاج قوي" },
      { id: "might", en: "He might be at home.", note: "احتمال" },
      { id: "cant", en: "He can't be at home.", note: "نفي قوي" },
    ],
    correct: "cant",
    why: "الأدلة ضد الفكرة: هو في الملعب الآن. لذلك CAN'T تعبّر عن استنتاج سلبي قوي، وليست MUSTN'T التي تفيد المنع.",
    tone: "negative",
  },
  {
    id: "cc4",
    sceneEn: "Dark clouds are gathering, but the weather app says the chance of rain tonight is small.",
    sceneAr: "غيوم داكنة تتجمع، لكن تطبيق الطقس يقول إن احتمال المطر الليلة صغير.",
    ask: "كيف تعبّر عن احتمال المطر الليلة؟",
    options: [
      { id: "must", en: "It must rain tonight.", note: "تأكد قوي" },
      { id: "may", en: "It may rain tonight.", note: "احتمال مستقبلي" },
      { id: "cant", en: "It can't rain tonight.", note: "نفي قوي" },
    ],
    correct: "may",
    why: "المطر احتمال مستقبلي غير مؤكد، فنستخدم MAY (أو MIGHT). MUST تدّعي تأكدًا لا تملكه الأدلة، وCAN'T تنفي احتمالًا ما زال واردًا.",
    tone: "possible",
  },
] as const;

/* ============================================================
   حالتان للمقارنة: أحمد الغائب، والصديق حامل الكتب
   ============================================================ */

export const AHMAD_ROWS_50 = [
  { en: "He must be sick.", ar: "لا بد أنه مريض.", tone: "strong" as Tone50 },
  { en: "He may be sick.", ar: "قد يكون مريضًا.", tone: "possible" as Tone50 },
  { en: "He might be sick.", ar: "ربما يكون مريضًا.", tone: "possible" as Tone50 },
  { en: "He could be sick.", ar: "من المحتمل أن يكون مريضًا.", tone: "possible" as Tone50 },
  { en: "He can't be sick.", ar: "لا يمكن أن يكون مريضًا.", tone: "negative" as Tone50 },
] as const;

export const BOOKS_ROWS_50 = [
  { en: "He must be studying for an exam.", ar: "لا بد أنه يدرس استعدادًا لامتحان.", tone: "strong" as Tone50 },
  { en: "He might be going to the library.", ar: "ربما يكون ذاهبًا إلى المكتبة.", tone: "possible" as Tone50 },
  { en: "He could be preparing a school project.", ar: "قد يكون يستعد لمشروع مدرسي.", tone: "possible" as Tone50 },
  { en: "He can't be going home yet; his classes haven't finished.", ar: "لا يمكن أن يكون ذاهبًا إلى المنزل بعد؛ فحصصه لم تنتهِ.", tone: "negative" as Tone50 },
] as const;

export const CASE_TASKS_50: readonly CertaintyCase50[] = [
  {
    id: "ah1",
    sceneEn: "Ahmed is absent from school today.",
    sceneAr: "أحمد غائب عن المدرسة اليوم، وأنت تحاول تفسير السبب.",
    ask: "عبّر عن استنتاج قوي بأنه مريض.",
    options: [
      { id: "must", en: "He must be sick.", note: "أدلة قوية" },
      { id: "might", en: "He might be sick.", note: "احتمال" },
      { id: "cant", en: "He can't be sick.", note: "نفي المرض" },
    ],
    correct: "must",
    why: "MUST تعني أن لديك أدلة قوية ترجّح المرض. MIGHT تطرح احتمالًا فقط، وCAN'T تنفي المرض.",
    tone: "strong",
  },
  {
    id: "ah2",
    sceneEn: "Ahmed is absent, but you know nothing about the reason.",
    sceneAr: "أحمد غائب، ولا تعرف شيئًا عن السبب.",
    ask: "اطرح المرض گاحتمال فقط.",
    options: [
      { id: "must", en: "He must be sick.", note: "استنتاج قوي" },
      { id: "may", en: "He may be sick.", note: "احتمال وارد" },
      { id: "cant", en: "He can't be sick.", note: "استبعاد قوي" },
    ],
    correct: "may",
    why: "دون أدلة، المرض احتمال واحد من احتمالات كثيرة. MAY وMIGHT وCOULD تطرح الاحتمال دون تأكيد، أما MUST فتدّعي أدلة لا تملكها.",
    tone: "possible",
  },
  {
    id: "bk1",
    sceneEn: "You see your friend carrying many books, and his classes haven't finished yet.",
    sceneAr: "ترى صديقك يحمل كتبًا كثيرة، وحصصه لم تنتهِ بعد.",
    ask: "استبعد بقوة أنه ذاهب إلى المنزل الآن.",
    options: [
      { id: "might", en: "He might be going home.", note: "احتمال" },
      { id: "must", en: "He must be going home.", note: "استنتاج قوي" },
      { id: "cant", en: "He can't be going home yet.", note: "نفي قوي" },
    ],
    correct: "cant",
    why: "حصصه لم تنتهِ: هذا دليل قوي ضد ذهابه إلى المنزل، فنستخدم CAN'T BE + V-ing لنشاط يُتصوَّر حدوثه الآن.",
    tone: "negative",
  },
  {
    id: "bk2",
    sceneEn: "Your friend is carrying many books towards the library building.",
    sceneAr: "صديقك يحمل كتبًا كثيرة متجهًا نحو مبنى المكتبة.",
    ask: "اطرح احتمالًا لأنه ذاهب إلى المكتبة.",
    options: [
      { id: "might", en: "He might be going to the library.", note: "احتمال لنشاط مستمر" },
      { id: "cant", en: "He can't be going to the library.", note: "نفي قوي" },
      { id: "mustnt", en: "He mustn't go to the library.", note: "منع" },
    ],
    correct: "might",
    why: "اتجاهه والكتب يوحيان بالمكتبة دون يقين: MIGHT BE + V-ing احتمال لنشاط جارٍ الآن. أما MUSTN'T فتعني المنع، وهي وظيفة مختلفة تمامًا.",
    tone: "possible",
  },
] as const;

/* ============================================================
   عدستا الزمن: الحاضر مقابل الماضي
   ============================================================ */

export const LENS_PAIRS_50 = [
  { id: "l1", now: { en: "He must be tired.", ar: "لا بد أنه متعب الآن." }, past: { en: "He must have been tired.", ar: "لا بد أنه كان متعبًا." }, tone: "strong" as Tone50 },
  { id: "l2", now: { en: "She must be at home.", ar: "لا بد أنها في المنزل الآن." }, past: { en: "She must have been at home.", ar: "لا بد أنها كانت في المنزل." }, tone: "strong" as Tone50 },
  { id: "l3", now: { en: "They may be busy.", ar: "قد يكونون مشغولين الآن." }, past: { en: "They may have been busy.", ar: "ربما كانوا مشغولين." }, tone: "possible" as Tone50 },
  { id: "l4", now: { en: "He might know.", ar: "ربما يعرف الآن." }, past: { en: "He might have known.", ar: "ربما كان يعرف." }, tone: "possible" as Tone50 },
  { id: "l5", now: { en: "She could be sick.", ar: "قد تكون مريضة الآن." }, past: { en: "She could have been sick.", ar: "ربما كانت مريضة." }, tone: "possible" as Tone50 },
  { id: "l6", now: { en: "He can't be serious.", ar: "لا يمكن أن يكون جادًا الآن." }, past: { en: "He can't have been serious.", ar: "لا يمكن أنه كان جادًا." }, tone: "negative" as Tone50 },
  { id: "l7", now: { en: "They can't be at school.", ar: "لا يمكن أن يكونوا في المدرسة الآن." }, past: { en: "They can't have been at school.", ar: "لا يمكن أنهم كانوا في المدرسة." }, tone: "negative" as Tone50 },
] as const;

/* ============================================================
   وجوه COULD الأربعة
   ============================================================ */

export const COULD_USES_50 = [
  { id: "ability", n: "①", title: "القدرة في الماضي", en: "I could swim when I was six.", ar: "كنت أستطيع السباحة عندما كنت في السادسة.", cue: "دليل السياق: زمن ماضٍ صريح (when I was six) ومهارة مكتسبة.", tone: "past" as Tone50 },
  { id: "present-possibility", n: "②", title: "الاحتمال الآن", en: "He could be at home.", ar: "ربما يكون في المنزل.", cue: "دليل السياق: BE + مكان، وحديث عن مكانه الآن.", tone: "possible" as Tone50 },
  { id: "past-possibility", n: "③", title: "الاحتمال في الماضي", en: "He could have taken the wrong bus.", ar: "ربما استقل الحافلة الخطأ.", cue: "دليل السياق: HAVE + V3، ومحاولة تفسير ما حدث.", tone: "possible" as Tone50 },
  { id: "missed-opportunity", n: "④", title: "فرصة لم تُستغل", en: "You could have won the race.", ar: "كان بإمكانك الفوز بالسباق، لكنك لم تفعل.", cue: "دليل السياق: النتيجة معروفة ولم تحدث؛ الجملة تتحدث عن إمكانية ضاعت.", tone: "negative" as Tone50 },
] as const;

export const COULD_LAB_50 = [
  { id: "cl1", en: "He could swim when he was five.", correct: "ability", why: "when he was five زمن ماضٍ، والسباحة مهارة: COULD هنا قدرة ماضية." },
  { id: "cl2", en: "He could be at home now.", correct: "present-possibility", why: "now وBE + مكان: نتحدث عن احتمال مكانه في الحاضر." },
  { id: "cl3", en: "The noise could have come from outside.", correct: "past-possibility", why: "HAVE + V3 وتفسير لصوت سُمع في الماضي: احتمال في الماضي." },
  { id: "cl4", en: "She could have won, but she gave up.", correct: "missed-opportunity", why: "but she gave up يثبت أن الفوز لم يحدث: كانت فرصة متاحة وضاعت." },
  { id: "cl5", en: "This could be the answer.", correct: "present-possibility", why: "نطرح تفسيرًا ممكنًا الآن: قد تكون هذه هي الإجابة، دون تأكيد." },
  { id: "cl6", en: "He could have taken the wrong bus; that is why he is late.", correct: "past-possibility", why: "نفسّر تأخرًا حدث فعلًا باحتمال في الماضي، والنتيجة (أي حافلة ركب) غير مؤكدة بعد." },
] as const;

/* ============================================================
   الأخطاء الشائعة الستة
   ============================================================ */

export const ERRORS_50 = [
  {
    n: "①",
    title: "MUSTN'T بدل CAN'T في النفي الاستنتاجي",
    bad: "He mustn't be at home. ✗ (بمعنى: لا يمكن أن يكون في المنزل)",
    good: "He can't be at home. ✓",
    why: "MUSTN'T غالبًا للمنع وعدم السماح، أما نفي الاستنتاج فيكون بـCAN'T: لا يمكن أن يكون ذلك صحيحًا.",
    tone: "negative" as Tone50,
  },
  {
    n: "②",
    title: "نسيان HAVE عند الاستنتاج عن الماضي",
    bad: "She must be forgotten. ✗",
    good: "She must have forgotten. ✓",
    why: "الحدث في الماضي، فنحتاج HAVE + V3 بعد الفعل الناقص. MUST BE وحدها تتحدث عن الحاضر.",
    tone: "past" as Tone50,
  },
  {
    n: "③",
    title: "V2 بدل V3 بعد HAVE",
    bad: "He might have went. ✗",
    good: "He might have gone. ✓",
    why: "بعد HAVE يأتي التصريف الثالث دائمًا: go – went – gone. went هي V2 ولا تصلح هنا.",
    tone: "past" as Tone50,
  },
  {
    n: "④",
    title: "الخلط بين MUST الاستنتاجية وHAVE TO الإلزامية",
    bad: "He must be tired. ≠ يجب عليه أن يكون متعبًا",
    good: "He must be tired. = لا بد أنه متعب (استنتاج) · He has to work. = يجب عليه أن يعمل (إلزام)",
    why: "MUST BE + صفة استنتاج عن حالته، أما الإلزام الخارجي فيُعبَّر عنه بـHAVE TO + V1.",
    tone: "strong" as Tone50,
  },
  {
    n: "⑤",
    title: "الخلط بين MIGHT BE وMIGHT HAVE BEEN",
    bad: "She might be sick yesterday. ✗",
    good: "She might be sick. = ربما تكون مريضة الآن · She might have been sick. = ربما كانت مريضة",
    why: "HAVE BEEN تنقل الاحتمال إلى الماضي. اختر الصيغة بحسب الزمن الذي تتحدث عنه.",
    tone: "possible" as Tone50,
  },
  {
    n: "⑥",
    title: "COULD HAVE: فرصة ضائعة أم احتمال؟",
    bad: "She could have won. (ترجمة واحدة دائمًا) ✗",
    good: "She could have won, but she gave up. = كان بإمكانها الفوز · She could have won; nobody knows the final result. = ربما فازت",
    why: "السياق وحده يحدد المعنى: إذا كانت النتيجة معروفة ولم تحدث فهي فرصة ضائعة، وإذا كانت غير معروفة فهي احتمال.",
    tone: "possible" as Tone50,
  },
] as const;

/* ============================================================
   الحوار: What Must Have Happened?
   ============================================================ */

export type Dialogue50 = {
  title: string;
  setting: string;
  tone: Tone50;
  turns: readonly { speaker: string; en: string; ar: string; fn?: string }[];
  analysis: readonly { modal: string; ar: string; fn: string }[];
  labId: string;
  labPrompt: string;
};

export const DIALOGUE_50: Dialogue50 = {
  title: "WHAT MUST HAVE HAPPENED?",
  setting: "Omar وLiam يتحدثان عن غياب معلمهما، ويستنتجان أسبابًا محتملة وقوية.",
  tone: "strong",
  turns: [
    { speaker: "Omar", en: "Have you seen Mr. James today?", ar: "هل رأيت السيد جيمس اليوم؟" },
    { speaker: "Liam", en: "No, he isn't in the classroom.", ar: "لا، إنه ليس في الفصل." },
    { speaker: "Omar", en: "He must be busy.", ar: "لا بد أنه مشغول.", fn: "استنتاج عن الحاضر" },
    { speaker: "Liam", en: "He might be attending a meeting.", ar: "ربما يحضر اجتماعًا.", fn: "احتمال لنشاط مستمر الآن" },
    { speaker: "Omar", en: "That makes sense. He told us yesterday that he had an important meeting.", ar: "هذا منطقي. لقد أخبرنا أمس أن لديه اجتماعًا مهمًا." },
    { speaker: "Liam", en: "He must have gone to the main office.", ar: "لا بد أنه ذهب إلى المكتب الرئيسي.", fn: "استنتاج عن الماضي" },
    { speaker: "Omar", en: "Or he could have forgotten that he had a class.", ar: "أو ربما نسي أن لديه حصة.", fn: "احتمال عن الماضي" },
    { speaker: "Liam", en: "He can't have forgotten. He always checks his schedule.", ar: "لا يمكن أنه نسي. فهو يراجع جدوله دائمًا.", fn: "استنتاج سلبي عن الماضي" },
    { speaker: "Omar", en: "You're right. He must have had an urgent meeting.", ar: "أنت محق. لا بد أن لديه اجتماعًا طارئًا.", fn: "استنتاج عن حالة في الماضي" },
  ],
  analysis: [
    { modal: "must be busy", ar: "استنتاج عن الحاضر", fn: "PRESENT DEDUCTION" },
    { modal: "might be attending", ar: "احتمال لنشاط مستمر الآن", fn: "PRESENT POSSIBILITY · -ING" },
    { modal: "must have gone", ar: "استنتاج عن الماضي", fn: "PAST DEDUCTION" },
    { modal: "could have forgotten", ar: "احتمال عن الماضي", fn: "PAST POSSIBILITY" },
    { modal: "can't have forgotten", ar: "استنتاج سلبي عن الماضي", fn: "PAST NEGATIVE DEDUCTION" },
    { modal: "must have had", ar: "استنتاج عن حالة أو حدث في الماضي", fn: "PAST DEDUCTION" },
  ],
  labId: "dialogue",
  labPrompt: "حدد وظيفة كل تركيب ملوّن في الحوار.",
};

/* ============================================================
   القراءة: The Strange Noise
   ============================================================ */

export const READING_50 = [
  {
    en: "Last night, Daniel was studying in his bedroom when he heard a strange noise downstairs.",
    ar: "في الليلة الماضية، كان دانيال يدرس في غرفة نومه عندما سمع صوتًا غريبًا في الطابق السفلي.",
  },
  {
    en: "He thought someone might be moving furniture. The noise was very loud, so he decided that someone must be in the living room.",
    ar: "اعتقد أن شخصًا ربما كان يحرك الأثاث. كان الصوت مرتفعًا جدًا، لذلك قرر أن هناك شخصًا لا بد أنه موجود في غرفة المعيشة.",
  },
  {
    en: "He went downstairs carefully, but nobody was there.",
    ar: "نزل بحذر، لكنه لم يجد أحدًا.",
  },
  {
    en: "The kitchen window was open. Daniel thought the wind could have moved something on the table.",
    ar: "كانت نافذة المطبخ مفتوحة. اعتقد دانيال أن الرياح ربما حركت شيئًا على الطاولة.",
  },
  {
    en: "Then he noticed that the back door was slightly open. Someone might have forgotten to close it.",
    ar: "ثم لاحظ أن الباب الخلفي كان مفتوحًا قليلًا. ربما نسي أحدهم إغلاقه.",
  },
  {
    en: "Daniel checked the house and found his cat sitting near the door.",
    ar: "تفقد دانيال المنزل ووجد قطته جالسة بالقرب من الباب.",
  },
  {
    en: "He laughed and said, \"The cat must have knocked something over!\"",
    ar: "ضحك وقال: «لا بد أن القطة أسقطت شيئًا!»",
  },
  {
    en: "His sister came into the room and said, \"You must have been frightened!\"",
    ar: "دخلت أخته الغرفة وقالت: «لا بد أنك شعرت بالخوف!»",
  },
  {
    en: "Daniel replied, \"I was! But the cat can't have planned all this!\"",
    ar: "أجاب دانيال: «بالتأكيد! لكن لا يمكن أن تكون القطة قد خططت لكل هذا!»",
  },
] as const;

export const READING_QUESTIONS_50 = [
  { q: "What was Daniel doing when he heard the noise?", answer: "He was studying in his bedroom.", ar: "كان يدرس في غرفة نومه." },
  { q: "What did he think someone might be doing?", answer: "He thought someone might be moving furniture.", ar: "اعتقد أن شخصًا ربما كان يحرك الأثاث." },
  { q: "Why did he think someone must be in the living room?", answer: "Because the noise was very loud.", ar: "لأن الصوت كان مرتفعًا جدًا." },
  { q: "What could have moved something on the table?", answer: "The wind could have moved something on the table.", ar: "ربما حركت الرياح شيئًا على الطاولة." },
  { q: "What might someone have forgotten to do?", answer: "Someone might have forgotten to close the back door.", ar: "ربما نسي أحدهم إغلاق الباب الخلفي." },
  { q: "What must the cat have done?", answer: "The cat must have knocked something over.", ar: "لا بد أن القطة أسقطت شيئًا." },
  { q: "What does \"can't have planned\" express?", answer: "It expresses a strong negative deduction about the past.", ar: "تعبّر عن استنتاج سلبي قوي عن الماضي." },
] as const;

export type Hunt50 = {
  id: string;
  q: string;
  options: readonly string[];
  correct: number;
  why: string;
};

export const READING_HUNT_50: readonly Hunt50[] = [
  {
    id: "h1",
    q: "في بداية القصة قال دانيال: «someone might be moving furniture». ماذا تصف الصيغة؟",
    options: ["احتمال لنشاط يحدث في تلك اللحظة", "استنتاج قوي عن الماضي", "قدرة ماضية"],
    correct: 0,
    why: "MIGHT BE + V-ing احتمال لنشاط مستمر في لحظة الكلام داخل القصة: ربما كان أحدهم يحرك الأثاث.",
  },
  {
    id: "h2",
    q: "ما الدليل الذي جعل دانيال يستخدم MUST في «someone must be in the living room»؟",
    options: ["ارتفاع الصوت الشديد", "رؤية القطة عند الباب", "النافذة المفتوحة"],
    correct: 0,
    why: "الصوت المرتفع جدًا دفعه إلى استنتاج قوي بوجود شخص في غرفة المعيشة.",
  },
  {
    id: "h3",
    q: "«the wind could have moved something» — لماذا COULD HAVE وليست COULD؟",
    options: ["لأنه يتحدث عن القدرة على الحركة", "لأنه يفسّر شيئًا ربما حدث في الماضي", "لأنه يتحدث عن المستقبل"],
    correct: 1,
    why: "الحدث المفسَّر (تحريك شيء على الطاولة) سابق للحظة التفكير: COULD HAVE + V3 احتمال في الماضي.",
  },
  {
    id: "h4",
    q: "قالت الأخت: «You must have been frightened». لماذا ظهرت BEEN هنا؟",
    options: ["لأن التصريف الثالث من BE هو BEEN، والاستنتاج عن حالته في الماضي", "لأن BEEN تُستخدم مع المستقبل دائمًا", "لأنها تصف نشاطًا مستمرًا بـV-ing"],
    correct: 0,
    why: "بعد HAVE نحتاج V3، والتصريف الثالث من BE هو BEEN: لا بد أنك كنت خائفًا في ذلك الوقت.",
  },
  {
    id: "h5",
    q: "ماذا يعبّر «the cat can't have planned all this»؟",
    options: ["منع القطة من التخطيط", "احتمال أن القطة خططت", "استنتاج سلبي قوي بأن التخطيط لم يحدث"],
    correct: 2,
    why: "CAN'T HAVE + V3 استنتاج قوي بأن شيئًا لم يحدث في الماضي أو كان مستحيلًا.",
  },
] as const;

/* ============================================================
   المراجعة الذكية
   ============================================================ */

export const SUMMARY_TABLE_50: Table50 = {
  head: ["المعنى", "الحاضر", "الماضي"],
  rows: [
    { label: "استنتاج قوي مثبت", cells: ["MUST + V1 / BE", "MUST HAVE + V3"] },
    { label: "احتمال", cells: ["MAY / MIGHT / COULD + V1", "MAY / MIGHT / COULD HAVE + V3"] },
    { label: "استنتاج سلبي قوي", cells: ["CAN'T + V1 / BE", "CAN'T HAVE + V3"] },
    { label: "نشاط مستمر", cells: ["MUST BE + V-ing", "MUST HAVE BEEN + V-ing"] },
    { label: "احتمال لنشاط مستمر", cells: ["MIGHT BE + V-ing", "MIGHT HAVE BEEN + V-ing"] },
    { label: "استحالة نشاط", cells: ["CAN'T BE + V-ing", "CAN'T HAVE BEEN + V-ing"] },
  ],
  note: "الجدول يجمع تراكيب الدرسين 49 و50: اختر الزمن أولًا، ثم درجة التأكد، ثم انظر إلى الاستمرار.",
};

export const FIVE_SENTENCES_50 = [
  { n: "①", en: "He must be sleeping.", ar: "لا بد أنه نائم الآن.", fn: "استنتاج قوي · نشاط الآن" },
  { n: "②", en: "He must have slept.", ar: "لا بد أنه نام.", fn: "استنتاج قوي · حدث ماضٍ" },
  { n: "③", en: "He must have been sleeping.", ar: "لا بد أنه كان نائمًا في ذلك الوقت.", fn: "استنتاج قوي · نشاط مستمر في الماضي" },
  { n: "④", en: "He might be sleeping.", ar: "ربما يكون نائمًا الآن.", fn: "احتمال · نشاط الآن" },
  { n: "⑤", en: "He might have been sleeping.", ar: "ربما كان نائمًا في ذلك الوقت.", fn: "احتمال · نشاط مستمر في الماضي" },
] as const;

export const SUMMARY_POINTS_50 = [
  "الفرق بين الاستنتاج المبني على الأدلة والتخمين.",
  "درجات التأكد: MUST للقوة، وMAY وMIGHT وCOULD للاحتمال، وCAN'T للنفي القوي.",
  "الاستنتاج القوي عن الحاضر باستخدام MUST.",
  "الاحتمال في الحاضر باستخدام MAY وMIGHT وCOULD.",
  "الاستنتاج السلبي في الحاضر باستخدام CAN'T.",
  "الاستنتاج عن الماضي باستخدام MUST HAVE + V3.",
  "الاحتمال عن الماضي باستخدام MAY HAVE وMIGHT HAVE وCOULD HAVE.",
  "الاستنتاج السلبي عن الماضي باستخدام CAN'T HAVE + V3.",
  "نشاط مستمر الآن: MUST BE + V-ing.",
  "نشاط مستمر في الماضي: MUST HAVE BEEN + V-ing.",
  "الفرق بين الاستنتاج والقدرة والاحتمال بحسب السياق.",
] as const;

/* ============================================================
   الشرائح
   ============================================================ */

export const SLIDES_50: readonly Slide50[] = [
  {
    id: "cover",
    station: "opening",
    kind: "cover",
    title: "عدسة الاستنتاج: DEDUCTION & SPECULATION",
    lead: "في الدرس 49 تعلّمت MODAL + HAVE + V3 للحديث عن الماضي. اليوم نوسّع العدسة: كيف تستنتج ما يحدث الآن، وكيف تخمّن ما حدث في الماضي، وكيف تختار درجة تأكدك بدقة؟",
    mascot: "🔎",
    tone: "review",
  },
  {
    id: "goals",
    station: "opening",
    kind: "goals",
    title: "أهداف الدرس",
    lead: "بنهاية هذا الدرس ستقرأ الأدلة كمحقق لغوي: تلتقط الدليل، وتحدد الزمن، وتضبط درجة ثقتك، ثم تبني التركيب الصحيح.",
    mascot: "🎯",
    tone: "review",
  },
  {
    id: "intro-room",
    station: "opening",
    kind: "intro",
    title: "كيف نفكر بالإنجليزية؟ غرفة الأدلة",
    lead: "تخيّل أنك دخلت غرفة فرأيت النافذة مفتوحة، والستائر تتحرك، والهواء باردًا. أنت لا تصف ما تراه فقط؛ بل تستخدم الأدلة للوصول إلى استنتاجات.",
    mascot: "🪟",
    tone: "strong",
    points: [
      "في الدرس 49 تعلّمت MUST HAVE وMIGHT HAVE وMAY HAVE وCOULD HAVE وCAN'T HAVE للاحتمالات والاستنتاجات عن الماضي.",
      "اليوم نضمّ إليها استنتاجات الحاضر في نظام واحد كامل.",
      "ثلاث جمل تلخّص قلب الدرس: درجة التأكد تتغير، والتركيب يتغير معها.",
    ],
    note: "قاعدة الدرس الذهبية: الدليل أولًا، ثم التركيب. لا تختر الفعل الناقص قبل أن تسأل نفسك: ما دليلي؟",
    tip: "لاحظ أن الجمل الثلاث تتحدث عن الحاضر. الفرق كله في درجة ثقة المتحدث.",
  },
  {
    id: "ded-vs-spec",
    station: "opening",
    kind: "concept",
    title: "استنتاج أم تخمين؟ DEDUCTION vs SPECULATION",
    lead: "كلمتان تبدوان متقاربتين، لكن الفرق بينهما هو مفتاح الدرس كله: هل لديك أدلة؟",
    mascot: "⚖️",
    tone: "review",
    examples: [
      { en: "Deduction", ar: "الاستنتاج: حكم تبنيه على أدلة تراها أو تعرفها.", tag: "EVIDENCE", tone: "strong" },
      { en: "Speculation", ar: "التخمين أو التكهن: طرح احتمال عن شيء لا تعرفه يقينًا.", tag: "POSSIBILITY", tone: "possible" },
    ],
    points: [
      "الاستنتاج القوي يميل إلى MUST، والنفي القوي إلى CAN'T.",
      "التخمين غير المؤكد يميل إلى MAY وMIGHT وCOULD.",
      "كلما قويت الأدلة، قويت صيغة كلامك؛ وكلما ضعفت، احتجت إلى تحفّظ.",
    ],
    note: "لا توجد جملة «صحيحة دائمًا» بمعزل عن الأدلة. المتحدث الجيد يطابق قوة كلامه مع قوة دليله.",
  },
  {
    id: "certainty-scale",
    station: "certainty",
    kind: "lesson",
    title: "درجات التأكد: من اليقين إلى الاستحالة",
    lead: "عندما تسمع صوتًا في المطبخ، قد تكون متأكدًا بدرجة كبيرة أن أخاك هناك، وقد يكون مجرد احتمال، وقد تعتقد أن وجوده مستحيل. اللغة تعطيك أداة لكل درجة.",
    mascot: "📊",
    tone: "strong",
    formula: ["MUST · تأكد قوي ✓", "MAY / MIGHT / COULD · احتمال", "CAN'T · استحالة أو نفي قوي ✓"],
    examples: [
      { en: "He must be at home.", ar: "لا بد أنه في المنزل.", tag: "STRONG", tone: "strong" },
      { en: "He might be at home.", ar: "ربما يكون في المنزل.", tag: "POSSIBLE", tone: "possible" },
      { en: "He can't be at home.", ar: "لا يمكن أن يكون في المنزل.", tag: "NEGATIVE", tone: "negative" },
    ],
    note: "قد تُذكر أرقام تقريبية مثل 90–95% لـMUST للتوضيح فقط. هذه ليست قياسات ثابتة في اللغة؛ الكلمات تُظهر ثقتك، ولا تحسب احتمالًا رياضيًا.",
    tip: "الجمل الثلاث عن الحاضر، ودرجة التأكد وحدها هي التي تغيّرت.",
  },
  {
    id: "certainty-lab",
    station: "certainty",
    kind: "certaintyLab",
    title: "مقياس الثقة: اختر بقدر دليلك",
    lead: "في كل مشهد اقرأ الأدلة أولًا، ثم اختر الاستنتاج الذي يطابق قوتها. التفسير سيخبرك لماذا ناسبت درجةٌ ما ولم تناسب أخرى.",
    mascot: "🧭",
    tone: "possible",
  },
  {
    id: "must-be",
    station: "must-now",
    kind: "lesson",
    title: "الاستنتاج القوي الآن: MUST BE",
    lead: "نستخدم MUST BE عندما تملك أدلة تجعلك تعتقد بقوة أن شيئًا صحيح الآن: مع صفة، أو اسم، أو مكان.",
    mascot: "🔴",
    tone: "strong",
    formula: ["MUST + BE + adjective", "MUST + BE + noun", "MUST + BE + place"],
    formulaGlosses: ["لا بد أنها متعبة", "لا بد أنه طبيب", "لا بد أنهم في المدرسة"],
    examples: [
      { en: "She must be tired.", ar: "لا بد أنها متعبة. عملت طوال اليوم وتبدو عليها علامات التعب.", tag: "ADJECTIVE", tone: "strong" },
      { en: "He must be hungry.", ar: "لا بد أنه جائع.", tag: "ADJECTIVE", tone: "strong" },
      { en: "They must be happy.", ar: "لا بد أنهم سعداء.", tag: "ADJECTIVE", tone: "strong" },
      { en: "He must be a doctor.", ar: "لا بد أنه طبيب.", tag: "NOUN", tone: "strong" },
      { en: "She must be the new teacher.", ar: "لا بد أنها المعلمة الجديدة.", tag: "NOUN", tone: "strong" },
      { en: "They must be at school.", ar: "لا بد أنهم في المدرسة.", tag: "PLACE", tone: "strong" },
      { en: "Your keys must be in your bag.", ar: "لا بد أن مفاتيحك في حقيبتك.", tag: "PLACE", tone: "strong" },
    ],
    note: "MUST هنا لا تعني «يجب». إنها استنتاج: لا بد أن هذا صحيح بناءً على ما أراه.",
  },
  {
    id: "must-action",
    station: "must-now",
    kind: "lesson",
    title: "MUST BE + V-ing وMUST + فعل",
    lead: "إذا كان الاستنتاج عن نشاط يحدث الآن نضيف V-ing بعد BE. ومع الأفعال العادية يأتي الفعل الأساسي مباشرة بعد MUST.",
    mascot: "🏃",
    tone: "strong",
    formula: ["MUST + BE + V-ing", "MUST + V1"],
    formulaGlosses: ["نشاط مستمر الآن", "فعل عادي بصيغته الأساسية"],
    examples: [
      { en: "He must be sleeping.", ar: "لا بد أنه نائم الآن.", tag: "-ING", tone: "ongoing" },
      { en: "She must be studying.", ar: "لا بد أنها تدرس الآن.", tag: "-ING", tone: "ongoing" },
      { en: "They must be waiting for us.", ar: "لا بد أنهم ينتظروننا.", tag: "-ING", tone: "ongoing" },
      { en: "He must know the answer.", ar: "لا بد أنه يعرف الإجابة.", tag: "V1", tone: "strong" },
      { en: "She must understand the problem.", ar: "لا بد أنها تفهم المشكلة.", tag: "V1", tone: "strong" },
      { en: "They must live nearby.", ar: "لا بد أنهم يسكنون بالقرب من هنا.", tag: "V1", tone: "strong" },
      { en: "He must knows. ✗ / He must know. ✓", ar: "لا نضيف S إلى الفعل بعد MUST، حتى مع He وShe وIt.", tag: "CAREFUL", tone: "negative" },
    ],
    note: "الفعل بعد MUST يكون دائمًا في صورته الأساسية V1. لذلك نقول She must study ولا نقول She must studies.",
  },
  {
    id: "maybe-forms",
    station: "maybe-now",
    kind: "lesson",
    title: "الاحتمال الآن وغدًا: MAY / MIGHT / COULD + V1",
    lead: "عندما لا تكون متأكدًا، اطرح الاحتمال ولا تحسمه. الصيغة واحدة: الفعل الناقص ثم الفعل الأساسي.",
    mascot: "🌥️",
    tone: "possible",
    formula: ["MAY + V1", "MIGHT + V1", "COULD + V1 / BE"],
    examples: [
      { en: "She may know the answer.", ar: "قد تعرف الإجابة. لا نعرف بالتأكيد.", tone: "possible" },
      { en: "He might come later.", ar: "ربما يأتي لاحقًا.", tone: "possible" },
      { en: "They could be busy.", ar: "ربما يكونون مشغولين.", tone: "possible" },
      { en: "It may rain tonight.", ar: "قد تمطر الليلة. احتمال مستقبلي.", tone: "possible" },
      { en: "I might visit my grandmother tomorrow.", ar: "ربما أزور جدتي غدًا. احتمال مستقبلي أيضًا.", tone: "possible" },
    ],
    note: "هذه التراكيب تصف موقفك من المعلومة، وليست وعدًا ولا حقيقة مؤكدة.",
  },
  {
    id: "maybe-nuance",
    station: "maybe-now",
    kind: "comparison",
    title: "هل MAY وMIGHT وCOULD متساوية؟",
    lead: "في الاحتمال تتقارب المعاني كثيرًا، لكن الاستعمال والنبرة يختلفان قليلًا. لا توجد حدود حسابية صارمة بينها.",
    mascot: "🎛️",
    tone: "possible",
    points: [
      "MAY: احتمال وارد يُطرح بثقة نسبية.",
      "MIGHT: احتمال أيضًا، وقد يوحي أحيانًا بتحفّظ أكبر أو ثقة أقل.",
      "COULD: طرح احتمال أو تفسير ممكن من بين تفسيرات.",
    ],
    examples: [
      { en: "She may be at home.", ar: "قد تكون في المنزل.", tag: "MAY", tone: "possible" },
      { en: "She might be at home.", ar: "ربما تكون في المنزل.", tag: "MIGHT", tone: "possible" },
      { en: "This could be the answer.", ar: "قد تكون هذه هي الإجابة.", tag: "COULD", tone: "possible" },
      { en: "He could swim when he was five.", ar: "كان يستطيع السباحة عندما كان في الخامسة. هنا COULD قدرة ماضية، لا احتمال.", tag: "ABILITY", tone: "past" },
      { en: "He could be at home.", ar: "ربما يكون في المنزل. هنا COULD احتمال حالي.", tag: "POSSIBILITY", tone: "possible" },
    ],
    note: "السياق هو الذي يحدد معنى COULD. لا تترجمها ترجمة واحدة ثابتة.",
  },
  {
    id: "cant-now",
    station: "cant-now",
    kind: "lesson",
    title: "النفي القوي الآن: CAN'T + V1 / BE",
    lead: "عندما تعتقد بقوة أن شيئًا غير صحيح أو مستحيل الآن، استخدم CAN'T. الدليل ضد الفكرة، لا معها.",
    mascot: "🚫",
    tone: "negative",
    formula: ["CAN'T + V1", "CAN'T + BE + adjective / noun / place / V-ing"],
    examples: [
      { en: "He can't be at home. I can see him at school.", ar: "لا يمكن أن يكون في المنزل. أستطيع رؤيته في المدرسة.", tone: "negative" },
      { en: "She can't be serious!", ar: "لا يمكن أن تكون جادة!", tone: "negative" },
      { en: "They can't know the answer. They weren't in the lesson.", ar: "لا يمكن أنهم يعرفون الإجابة. لم يكونوا في الدرس.", tone: "negative" },
      { en: "He can't be sleeping. I can hear him talking.", ar: "لا يمكن أن يكون نائمًا. أستطيع سماعه يتحدث.", tone: "negative" },
      { en: "That can't be true.", ar: "لا يمكن أن يكون ذلك صحيحًا.", tone: "negative" },
    ],
  },
  {
    id: "cant-vs-mustnt",
    station: "cant-now",
    kind: "comparison",
    title: "فرق حاسم: CAN'T أم MUSTN'T؟",
    lead: "هذا من أشهر أخطاء الاستنتاج. كلمة واحدة للنفي الاستنتاجي، وكلمة أخرى للمنع.",
    mascot: "🔀",
    tone: "negative",
    points: [
      "CAN'T: أستنتج أن شيئًا غير ممكن أو غير صحيح.",
      "MUSTN'T: أمنع فعلًا أو أقول إنه غير مسموح.",
      "إذا أردت معنى «لا يمكن أن يكون»، فاختر CAN'T دائمًا.",
    ],
    examples: [
      { en: "He can't be the manager. He's only a student.", ar: "لا يمكن أن يكون المدير؛ فهو مجرد طالب.", tag: "DEDUCTION", tone: "negative" },
      { en: "You mustn't enter this room.", ar: "يُمنع أن تدخل هذه الغرفة.", tag: "PROHIBITION", tone: "past" },
      { en: "He can't be at work.", ar: "لا يمكن أن يكون في العمل.", tag: "DEDUCTION", tone: "negative" },
      { en: "You mustn't go to work today.", ar: "يجب ألا تذهب إلى العمل اليوم.", tag: "PROHIBITION", tone: "past" },
    ],
    note: "لا تستخدم MUSTN'T بدل CAN'T عندما تريد نفي استنتاج.",
  },
  {
    id: "ahmad-case",
    station: "cases-now",
    kind: "cases",
    title: "حالة واحدة، خمس درجات: أحمد الغائب",
    lead: "صديقك أحمد لم يحضر إلى المدرسة. الموقف نفسه يمكن التعبير عنه بخمس درجات مختلفة. جرّب اختيار الدرجة المطلوبة، ثم قارنها بالجدول الكامل.",
    mascot: "🏫",
    tone: "strong",
    practiceSet: "ahmad",
  },
  {
    id: "books-case",
    station: "cases-now",
    kind: "cases",
    title: "حالة ثانية: الصديق حامل الكتب",
    lead: "ترى صديقك يحمل كتبًا كثيرة. هذه الجمل لا تصف حقائق مؤكدة، بل استنتاجات واحتمالات بناءً على الموقف.",
    mascot: "📚",
    tone: "possible",
    practiceSet: "books",
  },
  {
    id: "must-have",
    station: "past",
    kind: "lesson",
    title: "استنتاج قوي عن الماضي: MUST HAVE + V3",
    lead: "هنا نعود إلى أداة الدرس 49 داخل نظام كامل: نتيجة تراها الآن، فتستنتج بقوة حدثًا وقع في الماضي.",
    mascot: "🌧️",
    tone: "past",
    formula: ["MUST + HAVE + V3"],
    formulaGlosses: ["لا بد أن الحدث وقع في الماضي"],
    examples: [
      { en: "The streets are wet. It must have rained last night.", ar: "الشوارع مبللة. لا بد أن المطر هطل الليلة الماضية.", tone: "past" },
      { en: "She passed the exam. She must have studied hard.", ar: "نجحت في الامتحان. لا بد أنها درست بجد.", tone: "past" },
      { en: "The cake is gone. Someone must have eaten it.", ar: "الكعكة اختفت. لا بد أن أحدًا أكلها.", tone: "past" },
      { en: "He knows all the details. He must have read the report.", ar: "يعرف كل التفاصيل. لا بد أنه قرأ التقرير.", tone: "past" },
    ],
    points: [
      "الدليل حاضر: الأرضية مبللة الآن.",
      "الحدث المستنتَج ماضٍ: هطول المطر.",
      "نفسّر نتيجة حاضرة بحدث سابق، وهذا هو قلب الاستنتاج عن الماضي.",
    ],
    note: "اسأل نفسك دائمًا: ما النتيجة التي أراها الآن؟ وما الحدث الماضي الذي يفسّرها؟",
  },
  {
    id: "may-have",
    station: "past",
    kind: "lesson",
    title: "احتمال في الماضي: MAY / MIGHT / COULD HAVE + V3",
    lead: "عندما تتحدث عن شيء ربما حدث في الماضي دون تأكيد، استخدم هذه التراكيب. درجة التأكد أضعف من MUST HAVE.",
    mascot: "📞",
    tone: "possible",
    formula: ["MAY + HAVE + V3", "MIGHT + HAVE + V3", "COULD + HAVE + V3"],
    examples: [
      { en: "She may have forgotten her appointment.", ar: "ربما نسيت موعدها.", tag: "MAY HAVE", tone: "possible" },
      { en: "He might have taken my bag by mistake.", ar: "ربما أخذ حقيبتي عن طريق الخطأ.", tag: "MIGHT HAVE", tone: "possible" },
      { en: "The noise could have come from outside.", ar: "ربما كان الصوت قادمًا من الخارج.", tag: "COULD HAVE", tone: "possible" },
      { en: "He must have been busy.", ar: "صديقك لم يرد على هاتفك: لا بد أنه كان مشغولًا.", tag: "STRONG", tone: "strong" },
      { en: "He may have been busy. / He might have been busy. / He could have been busy.", ar: "ربما كان مشغولًا. الصيغ الثلاث تطرح احتمالًا بنبرات متقاربة.", tag: "POSSIBLE", tone: "possible" },
    ],
    note: "الجمل كلها عن الماضي، لكن درجة التأكد والنبرة تختلف من MUST HAVE القوية إلى الاحتمالات المفتوحة.",
  },
  {
    id: "cant-have",
    station: "past",
    kind: "lesson",
    title: "لم يحدث: CAN'T HAVE وCOULDN'T HAVE + V3",
    lead: "عندما تعتقد بقوة أن حدثًا لم يحدث في الماضي أو كان مستحيلًا، استخدم CAN'T HAVE + V3، وتُستخدم COULDN'T HAVE بالمعنى القريب نفسه في كثير من السياقات.",
    mascot: "🔐",
    tone: "negative",
    formula: ["CAN'T + HAVE + V3", "COULDN'T + HAVE + V3"],
    examples: [
      { en: "He can't have stolen the car. He was with me all evening.", ar: "لا يمكن أنه سرق السيارة. لقد كان معي طوال المساء.", tone: "negative" },
      { en: "She can't have finished the book in ten minutes.", ar: "لا يمكن أنها أنهت الكتاب في عشر دقائق.", tone: "negative" },
      { en: "They can't have forgotten the meeting. I reminded them twice.", ar: "لا يمكن أنهم نسوا الاجتماع. لقد ذكّرتهم مرتين.", tone: "negative" },
      { en: "He couldn't have known about the plan.", ar: "لا يمكن أنه كان يعرف بالخطة.", tag: "COULDN'T HAVE", tone: "negative" },
      { en: "She couldn't have seen us from that distance.", ar: "لم يكن من الممكن أن ترانا من تلك المسافة.", tag: "COULDN'T HAVE", tone: "negative" },
    ],
    note: "في كثير من سياقات الاستنتاج تتقارب CAN'T HAVE وCOULDN'T HAVE. قد يتأثر الاختيار بنوع الإنجليزية والسياق والزمن الذي يتخيله المتحدث.",
  },
  {
    id: "lens-table",
    station: "lens",
    kind: "comparison",
    title: "أهم مقارنة: الحاضر مقابل الماضي",
    lead: "ضع عدسة «الآن» وعدسة «الماضي» جنبًا إلى جنب. المعنى واحد، لكن HAVE + BEEN تنقل الحكم إلى الماضي.",
    mascot: "👓",
    tone: "past",
    formula: ["MUST + BE · الآن ✓", "MUST + HAVE + BEEN · في الماضي ✓"],
    table: {
      head: ["", "الاستنتاج في الحاضر", "الاستنتاج في الماضي"],
      rows: [
        { label: "①", cells: ["He must be tired.", "He must have been tired."] },
        { label: "②", cells: ["She must be at home.", "She must have been at home."] },
        { label: "③", cells: ["They may be busy.", "They may have been busy."] },
        { label: "④", cells: ["He might know.", "He might have known."] },
        { label: "⑤", cells: ["She could be sick.", "She could have been sick."] },
        { label: "⑥", cells: ["He can't be serious.", "He can't have been serious."] },
        { label: "⑦", cells: ["They can't be at school.", "They can't have been at school."] },
      ],
      note: "She must be happy تعني أنها سعيدة الآن، أما She must have been happy فتعني أنها كانت سعيدة في ذلك الوقت.",
    },
    examples: [
      { en: "He might be sleeping.", ar: "ربما يكون نائمًا الآن.", tag: "NOW", tone: "ongoing" },
      { en: "He might have been sleeping.", ar: "ربما كان نائمًا في ذلك الوقت.", tag: "PAST", tone: "past" },
    ],
  },
  {
    id: "lens-lab",
    station: "lens",
    kind: "lensLab",
    title: "عدستا الزمن: بدّل العدسة بنفسك",
    lead: "لكل زوج اختر عدسة «الآن» أو عدسة «الماضي». لاحظ كيف تظهر HAVE BEEN في عدسة الماضي، وكيف يتغير زمن الحكم دون أن تتغير درجته.",
    mascot: "🔭",
    tone: "past",
  },
  {
    id: "been-alert",
    station: "lens",
    kind: "lesson",
    title: "انتبه إلى BEEN",
    lead: "التصريف الثالث من BE هو BEEN. بعد HAVE نحتاجه دائمًا عندما يكون الفعل الأصلي هو BE.",
    mascot: "⚠️",
    tone: "past",
    formula: ["must have been ✓", "might have been ✓", "can't have been ✓"],
    examples: [
      { en: "must have be ✗", ar: "خطأ: BE بصيغتها الأساسية بعد HAVE.", tag: "WRONG", tone: "negative" },
      { en: "might have was ✗", ar: "خطأ: WAS هي صيغة ماضٍ بسيط، وليست التصريف الثالث.", tag: "WRONG", tone: "negative" },
      { en: "can't have being ✗", ar: "خطأ: BEING ليست التصريف الثالث.", tag: "WRONG", tone: "negative" },
      { en: "She must have been happy.", ar: "لا بد أنها كانت سعيدة في ذلك الوقت.", tag: "RIGHT", tone: "strong" },
    ],
    note: "تذكر السلسلة: BE في الحاضر تصبح HAVE BEEN في استنتاج الماضي.",
  },
  {
    id: "ongoing-past",
    station: "ongoing",
    kind: "lesson",
    title: "نشاط كان مستمرًا: MUST HAVE BEEN + V-ing",
    lead: "أحيانًا لا نستنتج حدثًا وقع فقط، بل نشاطًا كان مستمرًا في لحظة معينة في الماضي.",
    mascot: "⏳",
    tone: "ongoing",
    formula: ["MUST + HAVE BEEN + V-ing", "MIGHT + HAVE BEEN + V-ing", "CAN'T + HAVE BEEN + V-ing"],
    examples: [
      { en: "He must have been sleeping when I called.", ar: "لا بد أنه كان نائمًا عندما اتصلت. النوم كان مستمرًا وقت الاتصال.", tone: "ongoing" },
      { en: "She might have been studying at the library.", ar: "ربما كانت تدرس في المكتبة.", tone: "ongoing" },
      { en: "They could have been waiting for us.", ar: "ربما كانوا ينتظروننا.", tone: "ongoing" },
      { en: "He can't have been driving at that time.", ar: "لا يمكن أنه كان يقود السيارة في ذلك الوقت.", tone: "negative" },
    ],
  },
  {
    id: "done-vs-doing",
    station: "ongoing",
    kind: "comparison",
    title: "حدثٌ وقع أم نشاطٌ مستمر؟ HAVE + V3 أم HAVE BEEN + V-ing",
    lead: "الفرق دقيق ومهم: هل تركز على وقوع الحدث، أم على استمراره في لحظة ماضية محددة؟",
    mascot: "🎞️",
    tone: "ongoing",
    points: [
      "MUST HAVE + V3: أستنتج أن حدثًا وقع في الماضي.",
      "MUST HAVE BEEN + V-ing: أستنتج أن نشاطًا كان جاريًا في لحظة معينة.",
      "وجود لحظة مرجعية مثل when I called يرجّح صيغة الاستمرار.",
    ],
    examples: [
      { en: "He must have worked all night.", ar: "لا بد أنه عمل طوال الليل. أستنتج أنه عمل.", tag: "EVENT", tone: "past" },
      { en: "He must have been working when I called.", ar: "لا بد أنه كان يعمل عندما اتصلت. أركّز على استمرار العمل في لحظة الاتصال.", tag: "ONGOING", tone: "ongoing" },
    ],
  },
  {
    id: "continuous-lens",
    station: "ongoing",
    kind: "lesson",
    title: "المستمر الآن وفي الماضي: ربط الزمنين",
    lead: "تعلمت سابقًا Present Continuous وPast Continuous. الآن نربطهما بالاستنتاج في لوحة واحدة.",
    mascot: "📺",
    tone: "ongoing",
    formula: ["MUST BE + V-ing · الآن ✓", "MUST HAVE BEEN + V-ing · في الماضي ✓"],
    examples: [
      { en: "The lights are on. They must be watching TV.", ar: "الأضواء مضاءة. لا بد أنهم يشاهدون التلفاز.", tag: "NOW", tone: "ongoing" },
      { en: "She might be talking to her teacher.", ar: "ربما تتحدث مع معلمتها.", tag: "NOW", tone: "possible" },
      { en: "He can't be sleeping. His music is very loud.", ar: "لا يمكن أن يكون نائمًا. الموسيقى التي يشغلها مرتفعة جدًا.", tag: "NOW", tone: "negative" },
      { en: "The road was blocked. They must have been repairing it.", ar: "كان الطريق مغلقًا. لا بد أنهم كانوا يصلحونه.", tag: "PAST", tone: "past" },
      { en: "She might have been waiting outside.", ar: "ربما كانت تنتظر في الخارج.", tag: "PAST", tone: "possible" },
      { en: "He can't have been sleeping. I saw him working.", ar: "لا يمكن أنه كان نائمًا. لقد رأيته يعمل.", tag: "PAST", tone: "negative" },
    ],
  },
  {
    id: "could-four",
    station: "could",
    kind: "lesson",
    title: "وجوه COULD الأربعة",
    lead: "كلمة COULD قد تسبب الالتباس لأنها تحمل أكثر من وظيفة. ادرس الوجوه الأربعة، ثم حدد المعنى من السياق في المختبر التالي.",
    mascot: "🎭",
    tone: "possible",
    note: "COULD ليست لها ترجمة واحدة ثابتة. يجب أن تفهم المعنى من السياق دائمًا.",
  },
  {
    id: "could-lab",
    station: "could",
    kind: "couldLab",
    title: "مختبر COULD: حدد المعنى من السياق",
    lead: "لكل جملة اختر وظيفة COULD أو COULD HAVE المناسبة. ابحث عن دليل السياق قبل الحكم.",
    mascot: "🧪",
    tone: "possible",
  },
  {
    id: "decision-steps",
    station: "decision",
    kind: "lesson",
    title: "كيف نختار التركيب الصحيح؟ ثلاث خطوات",
    lead: "لا تختر عشوائيًا. اتبع طريقة اتخاذ القرار نفسها في كل جملة استنتاج أو احتمال.",
    mascot: "🗺️",
    tone: "review",
    points: [
      "الخطوة الأولى — الزمن: حاضر (MUST BE / MIGHT BE / CAN'T BE) أم ماضٍ (MUST HAVE BEEN / MIGHT HAVE BEEN / CAN'T HAVE BEEN)؟",
      "الخطوة الثانية — درجة التأكد: دليل قوي مع الفكرة (MUST)، أم احتمال (MAY / MIGHT / COULD)، أم دليل قوي ضدها (CAN'T)؟",
      "الخطوة الثالثة — الاستمرار: حدث أو حالة (V1 أو HAVE + V3)، أم نشاط مستمر الآن (BE + V-ing)، أم نشاط مستمر في الماضي (HAVE BEEN + V-ing)؟",
    ],
    note: "ثلاثة أسئلة قصيرة تمنع معظم الأخطاء. ستتدرب عليها الآن في صانع القرار.",
  },
  {
    id: "decision-lab",
    station: "decision",
    kind: "decision",
    title: "صانع القرار: ابنِ التركيب خطوة خطوة",
    lead: "أجب عن الأسئلة الثلاثة بالترتيب، وسيظهر لك التركيب المناسب مع مثال. غيّر إجابة واحدة ولاحظ كيف يتغير التركيب.",
    mascot: "🕹️",
    tone: "review",
  },
  {
    id: "bag-case",
    station: "decision",
    kind: "comparison",
    title: "مثال شامل: حقيبة في الفصل",
    lead: "وجدت حقيبة صديقك في الفصل، لكنه غير موجود. الموقف نفسه ينتج أربع جمل مختلفة بحسب الزمن ودرجة التأكد.",
    mascot: "🎒",
    tone: "past",
    examples: [
      { en: "He might have forgotten his bag.", ar: "ربما نسي حقيبته. احتمال عن الماضي.", tone: "possible" },
      { en: "He must have left in a hurry.", ar: "لا بد أنه خرج مسرعًا. استنتاج قوي عن الماضي.", tone: "strong" },
      { en: "He might be in the library now.", ar: "ربما يكون في المكتبة الآن. احتمال عن الحاضر.", tone: "possible" },
      { en: "He can't have taken his bag with him.", ar: "لا يمكن أن يكون قد أخذ حقيبته معه. نفي قوي عن الماضي.", tone: "negative" },
    ],
    note: "كل جملة لها معنى مختلف رغم وصفها الموقف نفسه. الفارق هو قراراتك الثلاثة: الزمن، ودرجة التأكد، والاستمرار.",
  },
  {
    id: "errors-wall",
    station: "mistakes",
    kind: "errors",
    title: "ستة أخطاء شائعة في الاستنتاج والتخمين",
    lead: "ادرس الخطأ والتصحيح والسبب معًا. فهم السبب يحميك من تكرار الخطأ بصور جديدة.",
    mascot: "🧱",
    tone: "negative",
  },
  {
    id: "error-detective",
    station: "mistakes",
    kind: "detective",
    title: "محقق الأخطاء: طبّق بنفسك",
    lead: "الآن دورك. في كل بطاقة اختر أو اكتب التصحيح الكامل، وسيصلك تفسير فوري.",
    mascot: "🕵️",
    tone: "negative",
    practiceSet: "detective",
  },
  {
    id: "dialogue",
    station: "dialogue",
    kind: "dialogue",
    title: "حوار تطبيقي: ?What Must Have Happened",
    lead: "صديقان يناقشان سبب غياب المعلم. اقرأ الحوار، ولاحظ كيف تتحرك الجمل بين الحاضر والماضي وبين درجات التأكد.",
    mascot: "💬",
    tone: "strong",
    dialogue: DIALOGUE_50.title,
  },
  {
    id: "reading",
    station: "reading",
    kind: "reading",
    title: "قطعة القراءة: The Strange Noise",
    lead: "قصة قصيرة عن صوت غريب في الليل. اقرأ الإنجليزية أولًا، ثم أظهر الترجمة العربية عند الحاجة فقط.",
    mascot: "🌙",
    tone: "possible",
    dialogue: "The Strange Noise",
  },
  {
    id: "reading-questions",
    station: "reading",
    kind: "readingQuestions",
    title: "أسئلة الفهم السبعة",
    lead: "اكتب إجابتك بالإنجليزية أولًا، ثم افتح النموذج للمقارنة. لا تعتمد على الترجمة قبل المحاولة.",
    mascot: "❓",
    tone: "possible",
  },
  {
    id: "reading-hunt",
    station: "reading",
    kind: "readingHunt",
    title: "صيد التراكيب: عد إلى القصة",
    lead: "أسئلة تحليلية قصيرة عن التراكيب نفسها داخل القصة. اختر، ثم تحقق من التفسير.",
    mascot: "🐱",
    tone: "strong",
  },
  {
    id: "practice-1",
    station: "practice",
    kind: "practice",
    title: "التدريب الأول: اختر الكلمة المناسبة",
    lead: "ستة مواقف قصيرة. اقرأ الدليل في الجملة نفسها قبل الاختيار.",
    mascot: "☝️",
    tone: "strong",
    practiceSet: "choose",
  },
  {
    id: "practice-2",
    station: "practice",
    kind: "practice",
    title: "التدريب الثاني: أكمل بالتركيب المناسب",
    lead: "استخدم الفعل بين القوسين. انتبه: هل تحتاج BE، أم V3، أم V-ing؟",
    mascot: "✏️",
    tone: "ongoing",
    practiceSet: "complete",
  },
  {
    id: "practice-3",
    station: "practice",
    kind: "practice",
    title: "التدريب الثالث: حدد الزمن والمعنى",
    lead: "لكل جملة حدد: هل هي عن الحاضر أم الماضي؟ وهل هي استنتاج قوي، أم احتمال، أم نفي قوي؟",
    mascot: "🏷️",
    tone: "review",
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
    lead: "ترجم المعنى كاملًا: الزمن، ودرجة التأكد، والاستمرار. يُقبل البديل الصحيح الذي يحافظ على المعنى.",
    mascot: "🌍",
    tone: "possible",
    practiceSet: "translate",
  },
  {
    id: "writing",
    station: "writing",
    kind: "writing",
    title: "مهمة الكتابة والتحدث: ?What Might Have Happened",
    lead: "وصلت إلى المدرسة فوجدت الفصل فارغًا والكتب على الأرض والنافذة مفتوحة وحقيبة مفقودة والمعلم غائبًا. فسّر ما حدث بالاستنتاج والاحتمال.",
    mascot: "✍️",
    tone: "possible",
  },
  {
    id: "golden-review",
    station: "review",
    kind: "review",
    title: "المراجعة الذكية: جدول الحفظ وخمس جمل",
    lead: "قبل الاختبار النهائي، ثبت الخريطة كاملة في ذهنك: جدول التراكيب، ثم خمس جمل إذا فهمتها فقد فهمت قلب الدرس.",
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
    tone: "strong",
  },
  {
    id: "next-lesson",
    station: "progress",
    kind: "roadmap",
    title: "الدرس القادم — 51: ZERO CONDITIONAL",
    lead: "الدرس 50 مكتمل. استعد للشرط الصفري: الحقائق العامة والنتائج الثابتة.",
    mascot: "➡️",
    tone: "review",
  },
];

export const LESSON_STEP_COUNT_50 = SLIDES_50.length;
