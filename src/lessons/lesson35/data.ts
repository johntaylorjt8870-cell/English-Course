import { SOURCE_SECTIONS_35 } from "./ledger35";

export const LESSON_TITLE_35 = "الدرس 35: BE GOING TO — الخطط والنوايا والتوقعات المستقبلية";
export const LESSON_SUBTITLE_35 = "Future Plans, Intentions & Predictions";
export const LESSON_LEVEL_35 = "المستوى: تأسيسي متقدم — IQ200 🚀";
export const STUDIO_AR_35 = "استوديو المستقبل";

export type StageId35 = "A" | "B" | "C" | "D" | "E";

export type Stage35 = {
  id: StageId35;
  ar: string;
  en: string;
  icon: string;
  /** One-sentence purpose of the stage — shown in the studio map. */
  aim: string;
  tone: "mint" | "plan" | "predict" | "sun" | "sky";
};

/** Five learning stages; they organize but never delete source content. */
export const STAGES_35: Stage35[] = [
  {
    id: "A",
    ar: "اكتشف المعنى",
    en: "DISCOVER THE MEANING",
    icon: "🌱",
    aim: "لماذا توجد BE GOING TO إلى جانب WILL، وما فكرة النية السابقة؟",
    tone: "mint",
  },
  {
    id: "B",
    ar: "ابنِ الجملة",
    en: "BUILD THE SENTENCE",
    icon: "🌿",
    aim: "الإثبات، الاختصارات، الخطط، الحوار، والتوقع المبني على دليل.",
    tone: "plan",
  },
  {
    id: "C",
    ar: "حوّل واسأل",
    en: "TRANSFORM & ASK",
    icon: "🌼",
    aim: "النفي، الأسئلة، WH، WHO، الزمن، BE، وTHERE IS/ARE.",
    tone: "sky",
  },
  {
    id: "D",
    ar: "تدرّب وحلّل",
    en: "PRACTISE & REASON",
    icon: "🪴",
    aim: "التحقيق النحوي، التدريبات الأربعة، والقراءة الكاملة.",
    tone: "predict",
  },
  {
    id: "E",
    ar: "أثبت الإتقان",
    en: "DEMONSTRATE MASTERY",
    icon: "🌻",
    aim: "الاختبار النهائي، مهمة الكتابة، الملخص الذهبي، وخريطة المنهج.",
    tone: "sun",
  },
];

export type Step35 = {
  id: string;
  stage: StageId35;
  /** Ledger section ids that this step presents (one or more when a section is split). */
  sources: string[];
  title: string;
  lead?: string;
};

/**
 * 61 short, single-purpose steps. Source sections may be split across steps;
 * no step merges two unrelated teaching purposes.
 */
export const SLIDES_35: Step35[] = [
  // ---------------------------------------------------------- STAGE A
  {
    id: "cover",
    stage: "A",
    sources: ["cover"],
    title: "مرحبًا بك في استوديو المستقبل",
    lead: "هنا لا نحفظ صيغة؛ نزرع نيّة، ونلاحظ دليلًا، ثم نختار الصيغة التي تعبّر عن المعنى بدقة.",
  },
  {
    id: "bridge",
    stage: "A",
    sources: ["cover"],
    title: "من WILL إلى BE GOING TO",
    lead: "في الدرس 34 استخدمنا WILL في خمس وظائف. اليوم نضيف أداة ثانية، لا بديلًا عنها.",
  },
  {
    id: "objectives-a",
    stage: "A",
    sources: ["s1"],
    title: "أهداف الدرس · الجزء الأول",
    lead: "خمسة أهداف تصف ما ستستطيع فعله بالصيغة نفسها.",
  },
  {
    id: "objectives-b",
    stage: "A",
    sources: ["s1"],
    title: "أهداف الدرس · الجزء الثاني",
    lead: "خمسة أهداف تنقلك من الصيغة إلى الاختيار الواعي بينها وبين WILL.",
  },
  {
    id: "meaning",
    stage: "A",
    sources: ["s2"],
    title: "ما معنى BE GOING TO؟",
    lead: "قرار اتُّخذ قبل لحظة السؤال يترك أثرًا في شكل الجملة.",
  },
  {
    id: "intention",
    stage: "A",
    sources: ["s2"],
    title: "الفكرة الأولى: نية موجودة مسبقًا",
    lead: "هذا هو الاستخدام الأول، وليس الاستخدام الوحيد.",
  },
  {
    id: "structure",
    stage: "A",
    sources: ["s3"],
    title: "الصيغة الأساسية قطعة قطعة",
    lead: "أربعة أجزاء فقط: فاعل، مساعد، going to، وفعل أساسي.",
  },
  {
    id: "auxiliary",
    stage: "A",
    sources: ["s4"],
    title: "اختيار AM / IS / ARE",
    lead: "المساعد يتغير مع الفاعل؛ الفعل الأساسي لا يتغير.",
  },
  {
    id: "auxiliary-examples",
    stage: "A",
    sources: ["s4"],
    title: "سبعة فواعل، سبع جمل",
    lead: "المساعد فقط يتغير. الفعل الأساسي after going to يبقى كما هو.",
  },
  {
    id: "v1",
    stage: "A",
    sources: ["s5"],
    title: "القاعدة الذهبية: بعد going to يأتي V1",
    lead: "خطأ واحد شائع يفسد الجملة: تصريف الفعل بعد going to.",
  },

  // ---------------------------------------------------------- STAGE B
  {
    id: "affirmative",
    stage: "B",
    sources: ["s6"],
    title: "الجملة المثبتة — Affirmative",
    lead: "Subject + am/is/are + going to + V1 + Rest.",
  },
  {
    id: "affirmative-examples",
    stage: "B",
    sources: ["s6"],
    title: "خمس جمل مثبتة من الحياة اليومية",
    lead: "لاحظ أن every example يصف خطة أو نية، لا قرارًا لحظيًا.",
  },
  {
    id: "contractions",
    stage: "B",
    sources: ["s7"],
    title: "الاختصارات في المحادثة",
    lead: "الاختصار لا يغيّر المعنى؛ يغيّر الإيقاع فقط.",
  },
  {
    id: "gonna",
    stage: "B",
    sources: ["s7"],
    title: "gonna: مسموعة، لكنها ليست الصيغة القياسية",
    lead: "نفهمها في المحادثة، ونكتب going to في الاختبار.",
  },
  {
    id: "plans",
    stage: "B",
    sources: ["s8"],
    title: "الاستخدام الأول: الخطط والنوايا",
    lead: "ليلى أعدّت أدواتها وسجّلت اسمها قبل أن تتحدث.",
  },
  {
    id: "plans-more",
    stage: "B",
    sources: ["s8"],
    title: "أربع خطط أخرى",
    lead: "كل جملة هنا خطة موجودة قبل لحظة الكلام.",
  },
  {
    id: "guarantee",
    stage: "B",
    sources: ["s9"],
    title: "هل يجب أن تكون الخطة مؤكدة 100%؟",
    lead: "لا. النية لا تعني ضمانًا مطلقًا، ولا تحتاج تفصيلًا بالدقيقة.",
  },
  {
    id: "dialogue-1",
    stage: "B",
    sources: ["s10"],
    title: "حوار: Weekend Plans · البداية",
    lead: "نورا تسأل عن خطة، وآدم يجيب عن خطة موجودة مسبقًا.",
  },
  {
    id: "dialogue-2",
    stage: "B",
    sources: ["s10"],
    title: "حوار: Weekend Plans · النهاية",
    lead: "سؤال عن الاستمرار، ونفي قصير، ثم خطة الأحد.",
  },
  {
    id: "dialogue-analysis",
    stage: "B",
    sources: ["s10"],
    title: "لماذا كل جملة في الحوار بـ going to؟",
    lead: "أربع جمل، ووظيفة واحدة: الحديث عن خطة أو ترتيب.",
  },
  {
    id: "evidence-intro",
    stage: "B",
    sources: ["s11"],
    title: "الاستخدام الثاني: دليل حاضر",
    lead: "غيوم سوداء الآن ← توقع معقول بعد قليل.",
  },
  {
    id: "evidence-cards",
    stage: "B",
    sources: ["s12"],
    title: "أربعة أدلة، أربعة توقعات",
    lead: "الكأس، السماء، الفريق، والباب: كل توقع له دليل مرئي.",
  },
  {
    id: "evidence-practice",
    stage: "B",
    sources: ["s12"],
    title: "تدرّب: ماذا يقول الدليل؟",
    lead: "اختر الجملة التي تشرح ما نراه الآن، لا ما نتمناه.",
  },
  {
    id: "will-not-wrong",
    stage: "B",
    sources: ["s13"],
    title: "هل التوقع بـ WILL خطأ؟",
    lead: "لا. الفرق في ما يبرزه المتحدث، وليس في صحة الصيغة.",
  },

  // ---------------------------------------------------------- STAGE C
  {
    id: "negative",
    stage: "C",
    sources: ["s14"],
    title: "النفي — Negative Form",
    lead: "not بعد am / is / are، وبعدها going to + V1.",
  },
  {
    id: "negative-short",
    stage: "C",
    sources: ["s14"],
    title: "اختصارات النفي و I'm not",
    lead: "isn't و aren't، ومع I نستخدم I'm not.",
  },
  {
    id: "negative-errors",
    stage: "C",
    sources: ["s15"],
    title: "أخطاء النفي الشائعة",
    lead: "لا do ولا does في نفي BE GOING TO.",
  },
  {
    id: "yesno",
    stage: "C",
    sources: ["s16"],
    title: "تكوين سؤال Yes/No",
    lead: "انقل am / is / are إلى قبل الفاعل.",
  },
  {
    id: "short-answers",
    stage: "C",
    sources: ["s17"],
    title: "الإجابات القصيرة",
    lead: "أعد المساعد نفسه، لا will.",
  },
  {
    id: "question-intent",
    stage: "C",
    sources: ["s18"],
    title: "Will you…? أم Are you going to…?",
    lead: "سؤالان صحيحان، لكنهما يطلبان معلومتين مختلفتين.",
  },
  {
    id: "wh",
    stage: "C",
    sources: ["s19"],
    title: "أسئلة Wh مع BE GOING TO",
    lead: "كلمة الاستفهام أولًا، ثم المساعد، ثم الفاعل.",
  },
  {
    id: "who",
    stage: "C",
    sources: ["s20"],
    title: "WHO فاعلًا أو مفعولًا",
    lead: "موقع Who يحدد من يقوم بالفعل ومن يستقبله.",
  },
  {
    id: "time",
    stage: "C",
    sources: ["s21"],
    title: "الكلمات الزمنية الشائعة",
    lead: "تسع تعبيرات زمنية، لكن الزمن وحده لا يفرض الصيغة.",
  },
  {
    id: "going-to-be",
    stage: "C",
    sources: ["s22"],
    title: "GOING TO + BE",
    lead: "لوصف حالة مستقبلية، الفعل الأساسي نفسه هو be.",
  },
  {
    id: "there",
    stage: "C",
    sources: ["s23"],
    title: "THERE IS / THERE ARE في المستقبل",
    lead: "وجود شيء مستقبلًا: there is going to be / there are going to be.",
  },
  {
    id: "compare-table",
    stage: "C",
    sources: ["s24"],
    title: "WILL مقابل BE GOING TO",
    lead: "جدول استخدامات نموذجية، لا حدود صارمة.",
  },
  {
    id: "bakery",
    stage: "C",
    sources: ["s25"],
    title: "مختبر المواقف: المخبز",
    lead: "نفس الفعل go، لكن توقيت القرار مختلف.",
  },
  {
    id: "opinion-evidence",
    stage: "C",
    sources: ["s26"],
    title: "مختبر التوقعات: رأي أم دليل؟",
    lead: "مستقبل السيارات رأي، وكوب العصير دليل.",
  },
  {
    id: "movement",
    stage: "C",
    sources: ["s27"],
    title: "ليست كل جملة فيها going to مستقبلًا",
    lead: "الحركة إلى مكان شيء، والنية لفعل شيء آخر.",
  },
  {
    id: "movement-practice",
    stage: "C",
    sources: ["s27"],
    title: "حركة أم نية؟ صنّف بنفسك",
    lead: "أربع جمل متشابهة الشكل، ومعناها مختلف.",
  },

  // ---------------------------------------------------------- STAGE D
  {
    id: "detective-1",
    stage: "D",
    sources: ["s28"],
    title: "Grammar Detective · الجمل 1–4",
    lead: "صحّح الخطأ، ثم قارن بمفتاح المصدر.",
  },
  {
    id: "detective-2",
    stage: "D",
    sources: ["s28"],
    title: "Grammar Detective · الجمل 5–8",
    lead: "أربعة أخطاء أخرى، وكلها في البنية نفسها.",
  },
  {
    id: "aux-1",
    stage: "D",
    sources: ["s29"],
    title: "تدريب AM / IS / ARE · 1–4",
    lead: "اختر المساعد المناسب للفاعل.",
  },
  {
    id: "aux-2",
    stage: "D",
    sources: ["s29"],
    title: "تدريب AM / IS / ARE · 5–8",
    lead: "لاحظ الفاعل المفرد والجمع قبل الاختيار.",
  },
  {
    id: "transform-1",
    stage: "D",
    sources: ["s30"],
    title: "تحويل إلى GOING TO · 1–3",
    lead: "اكتب الصيغة كاملة، بما فيها المساعد والنفي والسؤال.",
  },
  {
    id: "transform-2",
    stage: "D",
    sources: ["s30"],
    title: "تحويل إلى GOING TO · 4–6",
    lead: "ثلاثة أنواع: مثبت، منفي، وسؤال.",
  },
  {
    id: "scenarios-1",
    stage: "D",
    sources: ["s31"],
    title: "WILL أم GOING TO؟ · المواقف 1–4",
    lead: "اختر الصيغة الأنسب ثم اقرأ تعليل المصدر.",
  },
  {
    id: "scenarios-2",
    stage: "D",
    sources: ["s31"],
    title: "WILL أم GOING TO؟ · المواقف 5–8",
    lead: "تحذير، وعد، وخطة اتُّخذ قرارها مسبقًا.",
  },
  {
    id: "both-forms",
    stage: "D",
    sources: ["s32"],
    title: "IQ200: عندما تصلح الصيغتان",
    lead: "القرار يعتمد على المعنى الذي تريد إبرازه، لا على الزمن وحده.",
  },
  {
    id: "reading-1",
    stage: "D",
    sources: ["s33"],
    title: "Reading: A Big Plan for the School · 1",
    lead: "اقرأ الفقرة الأولى بهدوء. لا تقفز إلى الأسئلة.",
  },
  {
    id: "reading-2",
    stage: "D",
    sources: ["s33"],
    title: "Reading: A Big Plan for the School · 2",
    lead: "العاصفة تقترب، والقرار يتغير داخل الحوار.",
  },
  {
    id: "comprehension-1",
    stage: "D",
    sources: ["s33"],
    title: "أسئلة الفهم 1–4",
    lead: "أجب بكلماتك، ثم اكشف مفتاح المصدر.",
  },
  {
    id: "comprehension-2",
    stage: "D",
    sources: ["s33"],
    title: "أسئلة الفهم 5–7",
    lead: "آخر ثلاثة أسئلة: الدليل، القرار، وسؤال المعلم.",
  },
  {
    id: "reading-analysis",
    stage: "D",
    sources: ["s33"],
    title: "التحليل النحوي للقراءة",
    lead: "لماذا each صيغة؟ خمسة أسطر من المصدر.",
  },

  // ---------------------------------------------------------- STAGE E
  {
    id: "test-bridge",
    stage: "E",
    sources: ["s34"],
    title: "الاختبار النهائي — 25 سؤالًا وخمسة مستويات",
    lead: "تعرّف على شكل الاختبار قبل أن تبدأ. لا تظهر أي إجابة قبل التسليم.",
  },
  {
    id: "boss-brief",
    stage: "E",
    sources: ["s36"],
    title: "Final Boss: مهمة الإنتاج اللغوي",
    lead: "فقرة من 12 إلى 15 جملة، بثمانية متطلبات محددة.",
  },
  {
    id: "boss-writing",
    stage: "E",
    sources: ["s36"],
    title: "مساحة الكتابة والنموذج الإرشادي",
    lead: "اكتب فقرتك، وسيساعدك المقياس على فحص المتطلبات — دون أن يكتب عنك.",
  },
  {
    id: "summary-forms",
    stage: "E",
    sources: ["s37"],
    title: "الملخص الذهبي · الصيغ",
    lead: "أربع صيغ أساسية في بطاقة واحدة.",
  },
  {
    id: "summary-uses",
    stage: "E",
    sources: ["s37"],
    title: "الملخص الذهبي · الاستخدامان والمقارنة",
    lead: "خطة مسبقة أو دليل حاضر؛ ثم مقارنة WILL وBE GOING TO.",
  },
  {
    id: "curriculum",
    stage: "E",
    sources: ["s38"],
    title: "خريطة تقدم المنهج",
    lead: "أين يقف الدرس 35 في منظومة الأزمنة؟",
  },
  {
    id: "closing",
    stage: "E",
    sources: ["s38"],
    title: "المحطة القادمة والقاعدة الأهم",
    lead: "الدرس 36 يجمع الصيغتين في مواقف حقيقية.",
  },
];

export const SLIDE_COUNT_35 = SLIDES_35.length;
export const STAGE_STEPS_35: Record<StageId35, Step35[]> = {
  A: SLIDES_35.filter((step) => step.stage === "A"),
  B: SLIDES_35.filter((step) => step.stage === "B"),
  C: SLIDES_35.filter((step) => step.stage === "C"),
  D: SLIDES_35.filter((step) => step.stage === "D"),
  E: SLIDES_35.filter((step) => step.stage === "E"),
};

export function stepIndex35(id: string) {
  return SLIDES_35.findIndex((step) => step.id === id);
}

export function stageOf35(id: string): StageId35 {
  return SLIDES_35.find((step) => step.id === id)?.stage ?? "A";
}

export function sourceSection35(id: string) {
  return SOURCE_SECTIONS_35.find((section) => section.id === id);
}

export const SOURCE_SECTION_COUNT_35 = SOURCE_SECTIONS_35.length;
