// ============================================================
// solutionsData34 — الحلول التفصيلية للاختبار النهائي (25 سؤالًا)
// المصدر ㉟/㊱ يعِد بعرض «الحلول التفصيلية» دون سرد المفتاح نصًا،
// لذا هذه الإجابات مشتقة وفق قواعد الدرس نفسها وموسومة بذلك في
// الواجهة. تُستعمل فقط في منطقة الحلول (بعد الإرسال) ومنطقة المعلم.
//
// لكل سؤال: الإجابة الصحيحة + السبب + البنية النحوية. أسئلة
// المستوى الخامس كتابة حرّة: نموذج + بدائل مقبولة + ملاحظة معلم.
// ============================================================

export type Solution34 = {
  n: number;
  level: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  answer: string;
  why: string;
  structure: string;
  model?: string;
  alternatives?: string[];
  teacherNote?: string;
};

export const DETAILED_TEST_SOLUTIONS_34: Solution34[] = [
  // ---------- المستوى الأول: البناء الصحيح ----------
  {
    n: 1,
    level: 1,
    prompt: "He will ______ the instructions carefully. (read)",
    answer: "read",
    why: "بعد will يأتي الفعل بصيغته الأساسية V1 دائمًا. reads فيها s، و reading فيها ing، وكلتاهما غير مسموحتين بعد will.",
    structure: "He + will + read (V1) + the instructions carefully.",
  },
  {
    n: 2,
    level: 1,
    prompt: "We ______ be late. (not / be)",
    answer: "won't",
    why: "نفي will هو will not = won't، ويبقى be بعدها بصيغته الأساسية. لا نستخدم doesn't، و aren't will خطأ لأن are لا تجتمع مع will.",
    structure: "We + won't (will not) + be + late.",
  },
  {
    n: 3,
    level: 1,
    prompt: "______ Sara join the competition?",
    answer: "Will",
    why: "السؤال في Future Simple يبدأ بـ Will قبل الفاعل، ولا نضيف do/does إلى will. لذلك Does will و Is will خطأ.",
    structure: "Will + Sara (subject) + join (V1) + the competition?",
  },
  {
    n: 4,
    level: 1,
    prompt: "They will ______ happy.",
    answer: "be",
    why: "بعد will نستخدم الشكل الأساسي be، لا am/is/are ولا being. الصيغة will be ثابتة مع جميع الضمائر.",
    structure: "They + will + be (base form) + happy.",
  },
  {
    n: 5,
    level: 1,
    prompt: "I ______ you tomorrow.",
    answer: "will call",
    why: "البناء الصحيح will + V1. will calling خطأ لأن ing ليست V1، و will called خطأ لأن called تصريف ماضٍ.",
    structure: "I + will + call (V1) + you + tomorrow.",
  },

  // ---------- المستوى الثاني: أكمل الجمل ----------
  {
    n: 6,
    level: 2,
    prompt: "I think the exam ______ easy. (be)",
    answer: "will be",
    why: "توقع مستقبلي: I think + will + be. الاختصار 'll be مقبول أيضًا في المحادثة، والاختبار يقبل الصيغتين.",
    structure: "I think + the exam + will be + easy.",
    alternatives: ["'ll be"],
    teacherNote: "اقبل will be و 'll be — الفرق اختصار كتابي لا قاعدة جديدة.",
  },
  {
    n: 7,
    level: 2,
    prompt: "Don't worry. I ______ you. (help)",
    answer: "will help",
    why: "وعد في المحادثة: 'll هي اختصار will، ويأتي بعدها الفعل الأساسي help.",
    structure: "I + will ('ll) + help (V1) + you.",
    alternatives: ["'ll help"],
  },
  {
    n: 8,
    level: 2,
    prompt: "She ______ anyone your secret. (not / tell)",
    answer: "won't tell",
    why: "النفي: won't (will not) + tell (V1). لا نستخدم doesn't، ولا نضيف s إلى الفعل بعد will.",
    structure: "She + won't (will not) + tell (V1) + anyone + your secret.",
    alternatives: ["will not tell"],
  },
  {
    n: 9,
    level: 2,
    prompt: "______ they ______ early? (arrive)",
    answer: "Will they arrive?",
    why: "السؤال: Will + Subject + V1. كلمة early اختيارية، ووجودها لا يغيّر البناء. لا نضيف do/does ولا نُصرّف arrive.",
    structure: "Will + they (subject) + arrive (V1) + early?",
    model: "Will they arrive early?",
    alternatives: ["Will they arrive?"],
    teacherNote: "اقبل الصيغتين؛ الهدف هو ترتيب Will + Subject + V1، لا حفظ كلمة early.",
  },
  {
    n: 10,
    level: 2,
    prompt: "We ______ the same mistake again. (not / make)",
    answer: "won't make",
    why: "النفي won't + V1، والفعل make يبقى مجردًا. لا نستخدم don't/doesn't مع will.",
    structure: "We + won't (will not) + make (V1) + the same mistake again.",
    alternatives: ["will not make"],
  },

  // ---------- المستوى الثالث: حدد الاستخدام ----------
  {
    n: 11,
    level: 3,
    prompt: "I'll carry your suitcase.",
    answer: "عرض مساعدة (Offer)",
    why: "المتحدث يعرض القيام بشيء لشخص آخر الآن. هذه وظيفة العرض، لا الوعد ولا التوقع.",
    structure: "I + will ('ll) + carry (V1) + your suitcase.",
  },
  {
    n: 12,
    level: 3,
    prompt: "I promise I'll return the money.",
    answer: "وعد (Promise)",
    why: "كلمة I promise تُعلن الوعد صراحةً، و will هنا تثبّت الالتزام المستقبلي.",
    structure: "I promise + I + will ('ll) + return (V1) + the money.",
  },
  {
    n: 13,
    level: 3,
    prompt: "I think electric cars will become more common.",
    answer: "توقع (Prediction)",
    why: "I think + رأي عن المستقبل = توقع. المتحدث لا يَعِد ولا يعرض مساعدة، بل يتوقع نتيجة.",
    structure: "I think + electric cars + will + become (V1) + more common.",
  },
  {
    n: 14,
    level: 3,
    prompt: "The computer won't start, although I've tried several times.",
    answer: "رفض أو عدم استعداد (Refusal)",
    why: "won't هنا لا تعني المستقبل البسيط العادي فقط، بل عدم استجابة الجهاز رغم المحاولات. هذا امتداد دلالي لوظيفة الرفض/عدم الاستعداد.",
    structure: "The computer + won't + start (V1) + although + I've tried several times.",
  },
  {
    n: 15,
    level: 3,
    prompt: "Someone is knocking. I'll check the door.",
    answer: "قرار لحظي (Decision)",
    why: "طرق الباب حدث الآن، فالقرار اتُّخذ في لحظة الكلام. هذا هو الاستخدام الكلاسيكي لـ will في القرار الفوري.",
    structure: "I + will ('ll) + check (V1) + the door.",
  },

  // ---------- المستوى الرابع: صحح الأخطاء ----------
  {
    n: 16,
    level: 4,
    prompt: "He will studies harder.",
    answer: "studies ← study",
    why: "وجود will يمنع إضافة s إلى الفعل. نُعيد الفعل إلى V1: study.",
    structure: "He + will + study (V1) + harder.",
  },
  {
    n: 17,
    level: 4,
    prompt: "Will she comes tomorrow?",
    answer: "comes ← come",
    why: "بعد Will في السؤال يأتي الفعل بصيغته الأساسية، بلا s ولا ed.",
    structure: "Will + she + come (V1) + tomorrow?",
  },
  {
    n: 18,
    level: 4,
    prompt: "I won't to forget.",
    answer: "I won't forget. (الخطأ: to ← الصواب: حذف الكلمة)",
    why: "لا تُوضع to بين will/won't والفعل. الصواب: I won't forget. الحذف هو التصحيح، وليس استبدال to بكلمة أخرى.",
    structure: "I + won't + forget (V1).",
  },
  {
    n: 19,
    level: 4,
    prompt: "They will are successful.",
    answer: "are ← be",
    why: "will لا يتبعها am/is/are. نستخدم be الأساسية: will be.",
    structure: "They + will + be (base) + successful.",
  },
  {
    n: 20,
    level: 4,
    prompt: "Does your father will help us?",
    answer: "Does → Will + حذف will الثانية",
    why: "السؤال بـ will لا يحتاج do/does. نبدأ بـ Will ونحذف will المكررة: Will your father help us?",
    structure: "Will + your father (subject) + help (V1) + us?",
  },

  // ---------- المستوى الخامس: IQ200 ----------
  {
    n: 21,
    level: 5,
    prompt: "صديقك عطشان، وقررت الآن إحضار الماء له.",
    answer: "I'll get you some water.",
    why: "قرار لحظي استجابةً لموقف حاضر ⇒ will. الاختصار I'll طبيعي في المحادثة، والفعل get يبقى V1.",
    structure: "I + will ('ll) + get (V1) + you + some water.",
    model: "I'll get you some water.",
    alternatives: [
      "I'll bring you some water.",
      "I'll get you water.",
      "I'll bring you water.",
      "I will get you some water.",
    ],
    teacherNote: "اقبل أي صيغة تحقق وظيفة القرار اللحظي: will/I'll + فعل إحضار + water. لا تشترط some.",
  },
  {
    n: 22,
    level: 5,
    prompt: "تريد أن تعد معلمك بأنك لن تتأخر مجددًا.",
    answer: "I promise I won't be late again.",
    why: "وعد منفي: I promise + won't + be + … . won't = will not، ولا نضيف to أو don't.",
    structure: "I promise + I + won't (will not) + be (V1) + late again.",
    model: "I promise I won't be late again.",
    alternatives: [
      "I won't be late again.",
      "I promise I will not be late again.",
      "I promise I won't be late anymore.",
    ],
    teacherNote: "تكفي جملة won't be late again حتى دون I promise، لأن الموقف نفسه يحدد وظيفة الوعد.",
  },
  {
    n: 23,
    level: 5,
    prompt: "تريد أن تعبّر عن توقعك بأن التكنولوجيا ستغيّر طريقة تعلمنا.",
    answer: "I think technology will change the way we learn.",
    why: "توقع ⇒ I think + will + V1. change هنا فعل أساسي، والاسم technology مفرد ⇒ will لا يتغير.",
    structure: "I think + technology + will + change (V1) + the way we learn.",
    model: "I think technology will change the way we learn.",
    alternatives: ["Technology will change the way we learn.", "I think technology will change how we learn."],
    teacherNote: "اقبل الجملة دون I think؛ المطلوب وظيفة التوقع + will + V1 + change.",
  },
  {
    n: 24,
    level: 5,
    prompt: "تريد أن تسأل صديقك إن كان سيشارك في المسابقة.",
    answer: "Will you take part in the competition?",
    why: "سؤال ⇒ Will + Subject + V1. take part in تعبير مركب بمعنى «يشارك»، والفعل الأساسي take يبقى V1.",
    structure: "Will + you (subject) + take part (V1) + in the competition?",
    model: "Will you take part in the competition?",
    alternatives: [
      "Will you join the competition?",
      "Will you participate in the competition?",
      "Will you enter the competition?",
    ],
    teacherNote: "كل البدائل صحيحة إذا حافظت على ترتيب Will + you + V1. لا تقبل Does/Are في البداية.",
  },
  {
    n: 25,
    level: 5,
    prompt: "تريد أن تسأل: متى ستبدأ الرحلة؟",
    answer: "When will the trip start?",
    why: "سؤال Wh ⇒ When + will + Subject + V1. لا نضيف does، والفعل start يبقى أساسيًا.",
    structure: "When + will + the trip (subject) + start (V1)?",
    model: "When will the trip start?",
    alternatives: ["When will the trip begin?", "When will the journey start?", "When will the journey begin?"],
    teacherNote: "اقبل start/begin و trip/journey ما دام الترتيب When + will + subject + V1 محفوظًا.",
  },
];

export const SOLUTION_LEVELS_34: { n: number; title: string; range: string; items: Solution34[] }[] = [
  { n: 1, title: "البناء الصحيح", range: "الأسئلة 1–5", items: DETAILED_TEST_SOLUTIONS_34.slice(0, 5) },
  { n: 2, title: "أكمل الجمل", range: "الأسئلة 6–10", items: DETAILED_TEST_SOLUTIONS_34.slice(5, 10) },
  { n: 3, title: "حدد الاستخدام", range: "الأسئلة 11–15", items: DETAILED_TEST_SOLUTIONS_34.slice(10, 15) },
  { n: 4, title: "صحح الأخطاء", range: "الأسئلة 16–20", items: DETAILED_TEST_SOLUTIONS_34.slice(15, 20) },
  { n: 5, title: "IQ200 — كتابة حرّة", range: "الأسئلة 21–25", items: DETAILED_TEST_SOLUTIONS_34.slice(20, 25) },
];

if (DETAILED_TEST_SOLUTIONS_34.length !== 25) {
  throw new Error(`Lesson 34 detailed solutions must contain 25 entries, got ${DETAILED_TEST_SOLUTIONS_34.length}`);
}

if (SOLUTION_LEVELS_34.some((level) => level.items.length !== 5)) {
  throw new Error("Lesson 34 detailed solutions must be grouped into five levels of five questions each");
}
