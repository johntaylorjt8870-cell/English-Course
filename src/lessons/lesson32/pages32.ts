// ============================================================
// الدرس 32 — سجل الصفحات (Page Registry)
//
// 120 صفحة قصيرة، كل صفحة = شاشة واحدة مريحة على سطح المكتب.
// المرجع البصري والبنائي: الدرس 1 والدرس 41 — بطاقة بيضاء واحدة،
// عنوان واضح، أمثلة بارزة، ثم تفاعل حقيقي واحد.
//
// قاعدتان لا يجوز خرقهما هنا:
//   1) كل قسم من أقسام المصدر (36 قسمًا + الغلاف + الأهداف + الملخص
//      + الخاتمة) تُقسَّم كتلُه إلى صفحات، ومجموع نطاقات الكتل = كل
//      كتل القسم مرة واحدة بالضبط. التدقيق الآلي يثبت ذلك من
//      sourceDeck32.deckBlocks32 (لا من أرقام مكتوبة هنا).
//   2) صفحة التفاعل (lab) لا تحمل نص المصدر؛ نص المصدر في صفحات
//      المصدر (src). لذلك لا يختلط «جرّب أولًا» بـ«اقرأ الحل».
// ============================================================

import { deckBlocks32 } from "./sourceDeck32";

/** مفتاح التفاعل المستخدم في الصفحة — يحدد المكوّن الذي يُرسم. */
export type LabKey32 =
  | "build" | "flip" | "have" | "stream" | "for" | "since" | "forsince" | "howlong"
  | "neg" | "questions" | "short" | "wh" | "evidence" | "lens" | "doors" | "speakers"
  | "another" | "still" | "keywords" | "cue" | "pairs" | "count" | "stative"
  | "rail24" | "rail25" | "rail26" | "detective" | "typed" | "bike" | "scene"
  | "fix" | "boss" | "adam" | "maya" | "golden" | "gears" | "present-gears" | "objectives";

export type Page32 = {
  /** معرّف الصفحة — يظهر في data-lesson-step */
  id: string;
  /** معرّف وحدة المصدر في ledger32 (cover · objectives · s1..s36 · summary · closing) */
  sec: string;
  /** مجموعة التنقل الجانبية */
  group: string;
  mascot: string;
  badge: string;
  title: string;
  lead?: string;
  tip?: string;
  /** نطاق كتل المصدر المعروضة في هذه الصفحة (ضمنا) */
  deck?: [number, number];
  /** التفاعل المعروض (صفحة تفاعل واحدة فقط) */
  lab?: LabKey32;
  /** شريحة البيانات للتفاعلات الطويلة (تقسم تمرينًا من ٨ بنود إلى صفحتين) */
  part?: [number, number];
  /** ملاحظة ختامية أسفل الصفحة (نص المنصة فقط) */
  cta?: "test";
};

type LabSpec = {
  key: LabKey32;
  badge: string;
  title: string;
  lead?: string;
  tip?: string;
  part?: [number, number];
};

type SrcSpec = { r: [number, number]; title: string; lead?: string; tip?: string };

type SecSpec = {
  sec: string;
  group: string;
  mascot: string;
  /** تفاعل أو أكثر — تظهر قبل صفحات المصدر */
  labs?: LabSpec[];
  /** صفحات نص المصدر */
  src: SrcSpec[];
};

/**
 * ترتيب المصدر كما هو في المنهج. لا يُعاد ترتيب الأقسام.
 * كل نطاق هنا مُشتق من كتل القسم الفعلية، ويُدقَّق آليًا.
 */
const SPEC: SecSpec[] = [
  {
    sec: "cover",
    group: "START",
    mascot: "🌊",
    src: [{ r: [0, 0], title: "الغلاف", lead: "الزمن الذي يربط نشاطًا ممتدًا بالحاضر." }],
  },
  {
    sec: "objectives",
    group: "START",
    mascot: "🎯",
    labs: [
      {
        key: "objectives",
        badge: "🎯 أهداف الدرس",
        title: "تسعة أهداف — علّم كل هدف بعد أن تتقنه",
        lead: "هذه الأهداف التسعة هي خريطة الدرس نفسها.",
        tip: "الهدف لا يُعلَّم بالقراءة وحدها: علّمه بعد أن تنجز تفاعل قسمه.",
      },
    ],
    src: [
      { r: [0, 7], title: "أهداف الدرس ①–⑤", lead: "من معنى الزمن إلى الفرق بين النتيجة والنشاط." },
      { r: [8, 15], title: "أهداف الدرس ⑥–⑨", lead: "النفي والأسئلة، الكلمات، المقارنة، وأسئلة IQ200." },
    ],
  },
  {
    sec: "s1",
    group: "FORM",
    mascot: "🧱",
    labs: [
      {
        key: "build",
        badge: "① الصيغة",
        title: "ابنِ الجملة: Subject + have/has + been + verb-ing",
        lead: "المس القطع بالترتيب الإنجليزي من اليسار إلى اليمين.",
        tip: "الترتيب ثابت: الفاعل ← have/has ← been ← verb-ing.",
      },
    ],
    src: [
      { r: [0, 5], title: "فكرة Present Perfect Continuous وصيغته", lead: "ما معنى Present Perfect Continuous؟ وما صيغته؟" },
      { r: [6, 10], title: "مثال: I have been studying", lead: "I have been studying — الفكرة ليست أنني درست فقط." },
    ],
  },
  {
    sec: "s2",
    group: "FORM",
    mascot: "🔍",
    labs: [
      {
        key: "flip",
        badge: "② الأجزاء",
        title: "اكشف دور كل قطعة: have + been + ing",
        lead: "أربع قطع، أربع وظائف.",
        tip: "been ليست زائدة: هي شكل V3 من be، وبها يدخل معنى الاستمرار إلى الصيغة.",
      },
    ],
    src: [
      { r: [0, 5], title: "دور have/has وbeen وV-ing", lead: "have/has تربط الحدث بالحاضر، وbeen شكل V3 من be." },
      { r: [6, 11], title: "تحليل الجملة: She has been reading", lead: "كل كلمة في الجملة لها سبب وجود." },
    ],
  },
  {
    sec: "s3",
    group: "FORM",
    mascot: "👥",
    labs: [
      {
        key: "have",
        badge: "③ الفاعل",
        title: "ضع كل فاعل في صندوقه: have أم has؟",
        lead: "نفس قاعدة Present Perfect تمامًا.",
        tip: "I / You / We / They ← have · He / She / It ← has.",
      },
    ],
    src: [
      { r: [0, 7], title: "متى نستخدم have أو has؟", lead: "الاختيار قرار الفاعل وحده." },
      { r: [8, 15], title: "سبعة ضمائر في جمل كاملة", lead: "كل ضمير مع جملة توضّح القاعدة." },
    ],
  },
  {
    sec: "s4",
    group: "FORM",
    mascot: "🌊",
    labs: [
      {
        key: "stream",
        badge: "④ الاستخدام الأول",
        title: "نشاط بدأ في الماضي وما زال مستمرًا",
        lead: "حرّك نقطة البداية والمدة وشاهد الجملة تتكوّن.",
        tip: "النشاط يبدأ في الماضي ويمتد إلى NOW، وقد يتوقف قبلها تاركًا أثره.",
      },
    ],
    src: [
      { r: [0, 5], title: "خط زمني لنشاط يمتد حتى الآن", lead: "I have been studying for three hours." },
      { r: [6, 11], title: "مثال: انتظار دام ثلاثين دقيقة", lead: "She has been waiting for thirty minutes." },
    ],
  },
  {
    sec: "s5",
    group: "TIME",
    mascot: "📏",
    labs: [
      {
        key: "for",
        badge: "⑤ for",
        title: "for = مدة — اختر المدة الصحيحة",
        lead: "المسطرة تقيس «كم استمر؟».",
        tip: "for + مدة: ten minutes · two hours · six months · a long time.",
      },
    ],
    src: [
      { r: [0, 6], title: "عبارات المدة مع for", lead: "ست عبارات تساعدك على التعبير عن المدة." },
      { r: [7, 11], title: "أمثلة for مع الترجمة", lead: "كل مثال مع ترجمته العربية." },
    ],
  },
  {
    sec: "s6",
    group: "TIME",
    mascot: "🚩",
    labs: [
      {
        key: "since",
        badge: "⑥ since",
        title: "since = نقطة البداية — اختر البداية الصحيحة",
        lead: "العلم يشير إلى لحظة البدء.",
        tip: "since + لحظة: Monday · 8:00 · January · 2024 · this morning.",
      },
    ],
    src: [
      { r: [0, 5], title: "نقاط البداية مع since", lead: "خمس عبارات تحدد نقطة البداية." },
      { r: [6, 10], title: "أمثلة since مع الترجمة", lead: "كل مثال مع ترجمته العربية." },
    ],
  },
  {
    sec: "s7",
    group: "TIME",
    mascot: "⚖️",
    labs: [
      {
        key: "forsince",
        badge: "⑦ القرار",
        title: "فرز سريع: for أم since؟",
        lead: "اسأل: هل هذه مسافة أم علامة على الطريق؟",
        tip: "مسافة ← for · علامة على الطريق ← since.",
      },
    ],
    src: [
      { r: [0, 4], title: "القاعدة: for للمدة وsince للبداية", lead: "for + مدة · since + بداية." },
      { r: [5, 11], title: "قارن جملتي for وsince", lead: "نفس الفعل، ونقطتان مختلفتان في الزمن." },
    ],
  },
  {
    sec: "s8",
    group: "TIME",
    mascot: "❓",
    labs: [
      {
        key: "howlong",
        badge: "⑧ How long",
        title: "ابنِ السؤال ثم اختر الجواب",
        lead: "How long = منذ متى؟ / كم من الوقت؟",
        tip: "How long → for أو since في الجواب.",
      },
    ],
    src: [
      { r: [0, 4], title: "اسأل عن المدة: How long?", lead: "How long have you been studying?" },
      { r: [5, 10], title: "إجابات How long: for أو since", lead: "I have been studying for two hours · since 6:00." },
    ],
  },
  {
    sec: "s9",
    group: "QFORM",
    mascot: "🚫",
    labs: [
      {
        key: "neg",
        badge: "⑨ النفي",
        title: "النفي: have/has + not + been + verb-ing",
        lead: "ضع not في موضعها الصحيح.",
        tip: "not تدخل بين have/has وbeen — لا قبلها ولا بعد been.",
      },
    ],
    src: [
      { r: [0, 4], title: "قاعدة النفي ومثالان", lead: "I haven't been sleeping well." },
      { r: [5, 9], title: "اختصارات النفي في أمثلة الجمل", lead: "have not → haven't · has not → hasn't." },
    ],
  },
  {
    sec: "s10",
    group: "QFORM",
    mascot: "❔",
    labs: [
      {
        key: "questions",
        badge: "⑩ الأسئلة",
        title: "السؤال: Have/Has + الفاعل + been + verb-ing",
        lead: "حرّك have/has إلى مقدمة الجملة.",
        tip: "في السؤال يتقدّم have/has على الفاعل، ويبقى been + verb-ing كما هو.",
      },
    ],
    src: [
      { r: [0, 4], title: "ترتيب الكلمات في السؤال", lead: "Have + subject + been + verb-ing?" },
      { r: [5, 9], title: "أمثلة على الأسئلة", lead: "كل سؤال مع ترجمته العربية." },
    ],
  },
  {
    sec: "s11",
    group: "QFORM",
    mascot: "✂️",
    labs: [
      {
        key: "short",
        badge: "⑪ الجواب القصير",
        title: "الإجابات القصيرة — انتبه للفخ",
        lead: "الجواب القصير يستخدم have/has، لا been.",
        tip: "الفخ الأشهر: Yes, I have been ❌ — الصحيح Yes, I have ✅.",
      },
    ],
    src: [
      { r: [0, 8], title: "أزواج Yes/No للإجابة القصيرة", lead: "قارن إجابتي Yes وNo لكل سؤال." },
      { r: [9, 17], title: "الفرق بين have وhave been في الإجابة", lead: "Yes, I have ✅ · Yes, I have been ❌." },
    ],
  },
  {
    sec: "s12",
    group: "QFORM",
    mascot: "🔎",
    labs: [
      {
        key: "wh",
        badge: "⑫ Wh Questions",
        title: "من الجواب إلى أداة السؤال",
        lead: "انظر إلى الجواب أولًا، ثم اسأل عنه.",
        tip: "المدة ← How long · المكان ← Where · السبب ← Why.",
      },
    ],
    src: [{ r: [0, 4], title: "خمسة أسئلة بأدوات Wh", lead: "كل سؤال مع ترجمته العربية." }],
  },
  {
    sec: "s13",
    group: "CONTRAST",
    mascot: "👣",
    labs: [
      {
        key: "evidence",
        badge: "⑬ الأثر",
        title: "اجمع الأدلة الآن… ثم اختر الجملة التي تفسّرها",
        lead: "الدليل المرئي هو الذي يحدد الزمن.",
        tip: "هنا يتعلم الطالب أن الزمن لا يشترط استمرار النشاط في هذه اللحظة.",
      },
    ],
    src: [
      { r: [0, 5], title: "الأثر الآن يكشف نشاطًا سابقًا", lead: "You are out of breath. You have been running." },
      { r: [6, 11], title: "مثال: أثر العمل في الحديقة", lead: "Her hands are dirty. She has been gardening." },
      { r: [12, 17], title: "مثال: المطر والأرض المبللة", lead: "The floor is wet. It has been raining." },
    ],
  },
  {
    sec: "s14",
    group: "CONTRAST",
    mascot: "🎨",
    labs: [
      {
        key: "lens",
        badge: "⑭ المقارنة الكبرى",
        title: "عدستان على الغرفة نفسها: النتيجة والنشاط",
        lead: "بدّل العدسة ثم أجب عن السؤالين.",
        tip: "هذا محور الدرس: الجملة نفسها تقريبًا، والفرق كله في زاوية النظر.",
      },
    ],
    src: [
      { r: [0, 5], title: "النتيجة أم النشاط؟ مثال الغرفة", lead: "I have painted the room · I have been painting the room." },
      { r: [6, 10], title: "معنى جملتي الطلاء", lead: "ربما انتهيت، وربما ما زلت أعمل." },
    ],
  },
  {
    sec: "s15",
    group: "CONTRAST",
    mascot: "🚪",
    labs: [
      {
        key: "doors",
        badge: "⑮ القرار",
        title: "بابان: النتيجة ← Present Perfect · النشاط ← PPC",
        lead: "اسأل نفسك قبل أن تختار الباب.",
        tip: "هل أهتم بما أُنجز؟ ← PP · هل أهتم بالنشاط أو المدة؟ ← PPC.",
      },
    ],
    src: [
      { r: [0, 4], title: "سؤالان قبل اختيار الزمن", lead: "ما الذي أهتم به الآن؟" },
      { r: [5, 9], title: "نتيجة تنظيف المطبخ", lead: "I have cleaned the kitchen." },
      { r: [10, 13], title: "نشاط تنظيف المطبخ", lead: "I have been cleaning the kitchen." },
    ],
  },
  {
    sec: "s16",
    group: "CONTRAST",
    mascot: "🗣️",
    labs: [
      {
        key: "speakers",
        badge: "⑯ IQ200",
        title: "شخصان يتحدثان… ما زاوية كل واحد؟",
        lead: "A: I have written five pages. B: I have been writing for three hours.",
        tip: "قد تكون النتيجة خمس صفحات في الحالتين؛ المختلف هو ما اختار المتكلم أن يُبرزه.",
      },
    ],
    src: [
      { r: [0, 4], title: "مثال: جملتان بزاويتين مختلفتين", lead: "نفس الفعل، وزاويتان مختلفتان." },
      { r: [5, 9], title: "النتيجة والكمية أم النشاط والمدة؟", lead: "النتيجة والكمية، أم النشاط والمدة." },
    ],
  },
  {
    sec: "s17",
    group: "CONTRAST",
    mascot: "🖼️",
    labs: [
      {
        key: "another",
        badge: "⑰ مثال آخر",
        title: "ثلاث لوحات… أم طوال بعد الظهر؟",
        lead: "العدد المكتمل أم المدة الممتدة؟",
        tip: "three pictures ← PP · all afternoon ← PPC.",
      },
    ],
    src: [{ r: [0, 7], title: "ثلاث لوحات أم الرسم طوال بعد الظهر؟", lead: "She has painted three pictures · She has been painting all afternoon." }],
  },
  {
    sec: "s18",
    group: "CONTRAST",
    mascot: "🏃",
    labs: [
      {
        key: "still",
        badge: "⑱ الدقة",
        title: "هل يعني دائمًا أن الفعل ما زال مستمرًا؟",
        lead: "حرّك الحالة: يركض الآن؟ أم توقف قبل دقيقة؟",
        tip: "الجملة لا تتغيّر… الذي يتغيّر هو الواقع.",
      },
    ],
    src: [{ r: [0, 6], title: "هل يستمر الفعل حتى لحظة الكلام؟", lead: "لا. وهذه نقطة متقدمة جدًا." }],
  },
  {
    sec: "s19",
    group: "WORDS",
    mascot: "🔑",
    labs: [
      {
        key: "keywords",
        badge: "⑲ الكلمات",
        title: "تسع كلمات شائعة — افتح كل كلمة",
        lead: "كل كلمة مع مثالها.",
        tip: "الكلمات إشارات لا قوانين؛ المعنى هو الحكم.",
      },
    ],
    src: [
      { r: [0, 9], title: "كلمات شائعة مع Present Perfect Continuous", lead: "for · since · all day · all morning · …" },
      { r: [10, 15], title: "الكلمات الشائعة داخل جمل", lead: "لاحظ كل كلمة داخل جملة كاملة." },
    ],
  },
  {
    sec: "s20",
    group: "WORDS",
    mascot: "⚠️",
    labs: [
      {
        key: "cue",
        badge: "⑳ الكلمة والسياق",
        title: "لا تعتمد على كلمة واحدة",
        lead: "الكلمة وحدها لا تحدد الزمن — المعنى يحدده.",
        tip: "today قد تأتي مع PP، وrecently قد تأتي مع PPC.",
      },
    ],
    src: [
      { r: [0, 6], title: "لماذا لا تكفي كلمة الوقت؟", lead: "وجود today أو recently لا يعني تلقائيًا PPC." },
      { r: [7, 13], title: "مثالان: today وall morning", lead: "I have studied three chapters today · I have been studying all morning." },
    ],
  },
  {
    sec: "s21",
    group: "WORDS",
    mascot: "🧩",
    labs: [
      {
        key: "pairs",
        badge: "㉑ الأزواج",
        title: "ثلاثة أزواج — الكتاب والجدار والآلة",
        lead: "في كل زوج: الجملتان صحيحتان، والتركيز مختلف.",
        tip: "الزوج نفسه، والزاوية مختلفة: النتيجة أم النشاط.",
      },
    ],
    src: [
      { r: [0, 6], title: "الكتاب: النتيجة أم النشاط؟", lead: "I have read the book · I have been reading the book." },
      { r: [7, 13], title: "مقارنة الجدار والآلة", lead: "الجدار، ثم الآلة." },
    ],
  },
  {
    sec: "s22",
    group: "WORDS",
    mascot: "🔢",
    labs: [
      {
        key: "count",
        badge: "㉒ العدد",
        title: "عدد مكتمل أم نشاط ومدة؟",
        lead: "five emails ← PP · all morning ← PPC.",
        tip: "عدد الأشياء المكتملة يسحب الجملة إلى Present Perfect.",
      },
    ],
    src: [{ r: [0, 6], title: "عدد مكتمل أم نشاط ممتد؟", lead: "I have written five emails · I have been writing emails all morning." }],
  },
  {
    sec: "s23",
    group: "WORDS",
    mascot: "🚧",
    labs: [
      {
        key: "stative",
        badge: "㉓ البوابة",
        title: "أفعال لا نستخدمها عادةً في Continuous",
        lead: "مرّر كل فعل من البوابة واختر صيغته الصحيحة.",
        tip: "know · believe · understand · want · need · remember · like · love · hate.",
      },
    ],
    src: [
      { r: [0, 11], title: "قائمة أفعال الحالة", lead: "تسعة أفعال تصف حالات لا أنشطة." },
      { r: [12, 19], title: "أمثلة على أفعال الحالة", lead: "I have known him for ten years ✅ · I have been knowing him ❌." },
    ],
  },
  {
    sec: "s24",
    group: "COMPARE",
    mascot: "🕰️",
    labs: [
      {
        key: "rail24",
        badge: "㉔ نقطة المرجع",
        title: "Past Continuous أم Present Perfect Continuous؟",
        lead: "حرّك نقطة المرجع من 8:00 إلى NOW.",
        tip: "نقطة داخل الماضي ← Past Continuous · امتداد إلى NOW ← PPC.",
      },
    ],
    src: [
      { r: [0, 6], title: "قارن الجملتين عند 8:00", lead: "I was studying at 8:00 · I have been studying since 8:00." },
      { r: [7, 12], title: "نقطة مرجعية أم امتداد إلى الآن؟", lead: "نقطة في الماضي مقابل امتداد نحو NOW." },
      { r: [13, 18], title: "المسار الزمني من الماضي إلى الآن", lead: "PAST X ──→ NOW · studying." },
    ],
  },
  {
    sec: "s25",
    group: "COMPARE",
    mascot: "📞",
    labs: [
      {
        key: "rail25",
        badge: "㉕ نقطة المرجع",
        title: "Past Perfect Continuous: قبل حدث ماضٍ آخر",
        lead: "نقطة المرجع الآن: مكالمة صديقي.",
        tip: "قبل حدث ماضٍ آخر ← had been · قبل الآن ← have/has been.",
      },
    ],
    src: [
      { r: [0, 6], title: "نشاط ممتد الآن أم قبل حدث ماضٍ؟", lead: "I have been studying for three hours · I had been studying when my friend called." },
      { r: [7, 12], title: "متى تقع نقطة المرجع؟", lead: "PPC ← قبل الآن · Past Perfect Continuous ← قبل حدث ماضٍ آخر." },
    ],
  },
  {
    sec: "s26",
    group: "COMPARE",
    mascot: "🗺️",
    labs: [
      {
        key: "rail26",
        badge: "㉖ الخريطة",
        title: "الخريطة الزمنية الكبرى — ثلاث نقاط مرجعية",
        lead: "ضع كل جملة في مكانها على الخريطة.",
        tip: "الفرق الوحيد بين الأزمنة الثلاثة هو موضع نقطة المرجع.",
      },
    ],
    src: [{ r: [0, 3], title: "ثلاث نقاط مرجعية على خريطة الزمن", lead: "ثلاث جمل وثلاث نقاط مرجعية." }],
  },
  {
    sec: "s27",
    group: "FIX",
    mascot: "🕵️",
    labs: [
      {
        key: "detective",
        part: [0, 4],
        badge: "㉗ المحقق ١/٢",
        title: "Grammar Detective — الملفات ①–④",
        lead: "المس الجزء الخاطئ ثم اختر الإصلاح.",
        tip: "ابدأ بالسؤال: ما الذي بعد been؟",
      },
      {
        key: "detective",
        part: [4, 8],
        badge: "㉗ المحقق ٢/٢",
        title: "Grammar Detective — الملفات ⑤–⑧",
        lead: "أكمل الملفات الأربعة الباقية.",
        tip: "الملف الثامن خاص: خمسة رسائل مكتملة ← have written.",
      },
    ],
    src: [
      { r: [0, 8], title: "ثماني جمل تحتاج إلى تصحيح", lead: "فكر أولًا… ثم راجع الحلول في الصفحة التالية." },
      { r: [9, 17], title: "حلول الجمل الثماني", lead: "كل خطأ مع تصحيحه." },
      { r: [18, 24], title: "لماذا نستخدم have written في المثال الثامن؟", lead: "خمسة رسائل = عدد مكتمل ← have written." },
    ],
  },
  {
    sec: "s28",
    group: "FIX",
    mascot: "🎯",
    labs: [
      {
        key: "typed",
        part: [0, 3],
        badge: "㉘ الاختيار ١/٢",
        title: "تحدي الاختيار — الأسئلة ①–③",
        lead: "اكتب الصيغة الأنسب لكل جملة ثم اضغط «تحقّق».",
        tip: "العدد أو الإنجاز ← Present Perfect · النشاط والمدة ← PPC.",
      },
      {
        key: "typed",
        part: [3, 6],
        badge: "㉘ الاختيار ٢/٢",
        title: "تحدي الاختيار — الأسئلة ④–⑥",
        lead: "أكمل الأسئلة الثلاثة الباقية.",
        tip: "since 9:00 نقطة بداية ← PPC · وخمس كعكات عدد مكتمل ← Present Perfect.",
      },
    ],
    src: [
      { r: [0, 12], title: "تحدي الصيغة: ست جمل", lead: "كل سؤال مع الفعل بين قوسين." },
      { r: [13, 19], title: "إجابات التحدي الست", lead: "have read · have been reading · has made …" },
      { r: [20, 23], title: "لماذا نختار Present Perfect؟", lead: "العدد أو الإنجاز ← Present Perfect." },
    ],
  },
  {
    sec: "s29",
    group: "FIX",
    mascot: "🚲",
    labs: [
      {
        key: "bike",
        badge: "㉙ IQ200",
        title: "نفس الفعل، زمن مختلف، معنى مختلف",
        lead: "I have repaired my bicycle · I have been repairing my bicycle.",
        tip: "السؤال ليس «أي زمن أصعب؟» بل «ما الذي أريد أن أُبرزه؟».",
      },
    ],
    src: [
      { r: [0, 8], title: "معنيان لإصلاح الدراجة", lead: "الدراجة أصبحت مُصلحة… أم كنت أعمل عليها." },
      { r: [9, 16], title: "اختر الزمن وفق المعنى", lead: "النتيجة؟ ← PP · النشاط أو المدة؟ ← PPC." },
    ],
  },
  {
    sec: "s30",
    group: "FIX",
    mascot: "🎬",
    labs: [
      {
        key: "scene",
        badge: "㉚ المشهد",
        title: "تحدي المعنى — فرشاة الطلاء والجدار",
        lead: "انظر إلى المشهد: أثر النشاط أم النتيجة؟",
        tip: "أثر النشاط (فرشاة، بقع) ← PPC · الجدار المكتمل ← PP.",
      },
    ],
    src: [{ r: [0, 8], title: "أثر الطلاء أم الجدار المكتمل؟", lead: "You have been painting · You have painted the wall." }],
  },
  {
    sec: "s31",
    group: "FIX",
    mascot: "🔧",
    labs: [
      {
        key: "fix",
        badge: "㉛ مستوى أعلى",
        title: "since و for — صحّح ثم اختر",
        lead: "الخطأ الشائع: ترجمة «منذ» إلى since دائمًا.",
        tip: "three hours = مدة ← for · 5:00 = نقطة بداية ← since.",
      },
    ],
    src: [
      { r: [0, 4], title: "صحّح استخدام since وfor", lead: "I have been studying since three hours ❌ ← for three hours ✅." },
      { r: [5, 8], title: "لماذا نستخدم for أو since؟", lead: "three hours مدة، وsince 5:00 نقطة بداية." },
    ],
  },
  {
    sec: "s32",
    group: "BOSS",
    mascot: "🐉",
    labs: [
      {
        key: "boss",
        part: [0, 4],
        badge: "㉜ الزعيم ١/٢",
        title: "Boss Challenge — الضربات ①–④",
        lead: "اختر الزمن الصحيح لكل جملة.",
        tip: "ابحث أولًا عن كلمة الزمن، ثم اسأل عن النتيجة أو النشاط.",
      },
      {
        key: "boss",
        part: [4, 8],
        badge: "㉜ الزعيم ٢/٢",
        title: "Boss Challenge — الضربات ⑤–⑧",
        lead: "أكمل الضربات الأربعة الباقية.",
        tip: "أربعة أزمنة للحاضر، وكل جملة لها دليل واحد أو أكثر.",
      },
    ],
    src: [
      { r: [0, 12], title: "ثماني جمل لاختيار الزمن المناسب", lead: "Present Simple · Present Continuous · Present Perfect · PPC." },
      { r: [13, 22], title: "حلول التحدي: ثماني جمل", lead: "كل جملة مع زمنها." },
    ],
  },
  {
    sec: "s33",
    group: "BOSS",
    mascot: "📖",
    labs: [
      {
        key: "adam",
        badge: "㉝ تحليل الفقرة",
        title: "Final IQ200 — فقرة Adam",
        lead: "المس كل عبارة فعلية واختر زمنها.",
        tip: "has studied (مدة وتجربة) · has built (عدد) · has been working (since January) · has been testing (نشاط متكرر).",
      },
    ],
    src: [
      { r: [0, 6], title: "تحليل فقرة Adam: الزمن ومعناه", lead: "Adam has studied robotics for three years." },
      { r: [7, 13], title: "تابع تحليل فقرة Adam", lead: "has built · has been working · has been testing." },
    ],
  },
  {
    sec: "s34",
    group: "BOSS",
    mascot: "🏁",
    labs: [
      {
        key: "maya",
        badge: "㉞ النهائي",
        title: "Final Boss — قصة Maya",
        lead: "اكتب كل فعل بالزمن الصحيح ثم تحقّق.",
        tip: "نشاط ممتد؟ عدد مكتمل؟ نتيجة؟ — ثلاثة أسئلة تحسم كل فراغ.",
      },
    ],
    src: [
      { r: [0, 6], title: "قصة Maya: أكمِل الفراغات", lead: "Maya is preparing for a science competition." },
      { r: [7, 12], title: "إجابات قصة Maya الخمس", lead: "has been studying · has read · has been working · has completed · has been working." },
      { r: [13, 17], title: "أسباب اختيار الأزمنة في قصة Maya", lead: "نشاط + مدة · عدد/إنجاز · نشاط ممتد · نتائج مكتملة · نشاط وسبب التعب." },
    ],
  },
  {
    sec: "s35",
    group: "END",
    mascot: "🥇",
    labs: [
      {
        key: "golden",
        badge: "㉟ القاعدة",
        title: "قاعدة الذهب — اقرأ الشكل أولًا",
        lead: "have/has + V3… أم have/has + been + V-ing؟",
        tip: "الشكل يخبرك بالنمط، والمعنى يخبرك بالسبب.",
      },
    ],
    src: [
      { r: [0, 4], title: "Present Perfect: النتيجة والإنجاز والتجربة", lead: "have/has + V3 ← النتيجة أو الإنجاز أو التجربة." },
      { r: [5, 9], title: "Present Perfect Continuous: النشاط والمدة والأثر", lead: "have/has + been + V-ing ← النشاط أو المدة أو الآثار." },
    ],
  },
  {
    sec: "s36",
    group: "END",
    mascot: "🗺️",
    labs: [
      {
        key: "gears",
        badge: "㊱ الخريطة",
        title: "أربعة تروس للحاضر — فعّل كل ترس",
        lead: "افتح كل ترس لترى جملة توضّح الفرق.",
        tip: "أصبحت عندك أربع درجات للحاضر: عادة · الآن · نتيجة · نشاط ممتد.",
      },
    ],
    src: [{ r: [0, 7], title: "خريطة أزمنة الحاضر الأربعة", lead: "Present Simple · Present Continuous · Present Perfect · PPC." }],
  },
  {
    sec: "summary",
    group: "END",
    mascot: "📋",
    labs: [
      {
        key: "present-gears",
        badge: "📋 الملخص",
        title: "منظومة الحاضر الأربع — المس كل ترس",
        lead: "الصيغة، الاستخدامات، الكلمات، والفرق الذهبي.",
        tip: "Present Perfect → النتيجة · Present Perfect Continuous → النشاط.",
      },
    ],
    src: [
      { r: [0, 6], title: "الملخص — الصيغة والاستخدامات", lead: "Subject + have/has + been + V-ing." },
      { r: [7, 13], title: "الملخص — الاستخدامات والكلمات", lead: "② النشاط الذي انتهى حديثًا · ③ التركيز على المدة." },
      { r: [14, 22], title: "الملخص — الكلمات والفرق الذهبي", lead: "لاحظ · lately · how long …" },
      { r: [23, 29], title: "الملخص — المثال النهائي وخاتمة الدرس", lead: "I have painted the room · I have been painting the room." },
    ],
  },
  {
    sec: "closing",
    group: "END",
    mascot: "🚀",
    src: [{ r: [0, 0], title: "الخطوة التالية", lead: "بعد مراجعة أزمنة الحاضر الأربعة، انتقل إلى زمن المستقبل." }],
  },
];

/** بناء الصفحات: تفاعل القسم أولًا، ثم صفحات نص المصدر بالترتيب. */
export const PAGES_32: Page32[] = SPEC.flatMap((s) => {
  const pages: Page32[] = [];
  (s.labs ?? []).forEach((lab, i) => {
    pages.push({
      id: `${s.sec}-lab${(s.labs?.length ?? 0) > 1 ? i + 1 : ""}`,
      sec: s.sec,
      group: s.group,
      mascot: s.mascot,
      badge: lab.badge,
      title: lab.title,
      lead: lab.lead,
      tip: lab.tip,
      lab: lab.key,
      part: lab.part,
      cta: s.sec === "closing" ? "test" : undefined,
    });
  });
  s.src.forEach((src, i) => {
    pages.push({
      id: `${s.sec}-src${i + 1}`,
      sec: s.sec,
      group: s.group,
      mascot: s.mascot,
      badge: s.sec === "cover" ? "بداية الدرس"
        : s.sec === "objectives" ? "أهداف الدرس"
          : s.sec === "summary" ? "خلاصة الدرس"
            : s.sec === "closing" ? "الخطوة التالية"
              : "أمثلة وقواعد",
      title: src.title,
      lead: src.lead,
      tip: src.tip,
      deck: src.r,
      cta: s.sec === "closing" ? "test" : undefined,
    });
  });
  return pages;
});

export const PAGE_COUNT_32 = PAGES_32.length;

/** الصفحة التي تحمل تفاعلًا معينًا (يستخدمه التدقيق واختبارات المتصفح). */
export function pageWithLab32(key: LabKey32): Page32 {
  const page = PAGES_32.find((p) => p.lab === key);
  if (!page) throw new Error(`No page carries lab ${key}`);
  return page;
}

/**
 * تغطية كل قسم: مجموع نطاقات صفحات المصدر يجب أن يساوي كل كتل القسم
 * مرة واحدة بالضبط. تُحسب من الكتل الفعلية لا من أرقام مكتوبة يدويًا.
 */
export function pagesCoverage32() {
  return SPEC.map((s) => {
    const total = deckBlocks32(s.sec).length;
    const covered = new Set<number>();
    let overlaps = 0;
    let lastEnd = -1;
    s.src.forEach((page) => {
      // قصّ النطاق على حجم القسم كما يفعل العرض تمامًا
      const from = Math.max(0, Math.min(page.r[0], total - 1));
      const to = Math.max(from, Math.min(page.r[1], total - 1));
      for (let i = from; i <= to; i += 1) {
        if (covered.has(i)) overlaps += 1;
        covered.add(i);
      }
      lastEnd = Math.max(lastEnd, to);
    });
    const order = s.src.every((p, i) => i === 0 || p.r[0] > s.src[i - 1].r[1]);
    return {
      sec: s.sec,
      blocks: total,
      covered: covered.size,
      missing: Array.from({ length: total }, (_, i) => i).filter((i) => !covered.has(i)),
      overlaps,
      inOrder: order && lastEnd === total - 1,
      srcPages: s.src.length,
      labPages: s.labs?.length ?? 0,
    };
  });
}
